#!/usr/bin/env python3
"""Verify the real Nginx-served portfolio and its referenced static assets."""
import argparse
from html.parser import HTMLParser
import time
from urllib.error import HTTPError, URLError
from urllib.parse import urljoin, urlparse
from urllib.request import urlopen


class Assets(HTMLParser):
    def __init__(self):
        super().__init__()
        self.paths = set()

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if tag in ("script", "img") and attrs.get("src"):
            self.paths.add(attrs["src"])
        if tag == "link" and attrs.get("rel") in ("stylesheet", "icon", "preload"):
            if attrs.get("href"):
                self.paths.add(attrs["href"])


def fetch(url):
    for attempt in range(8):
        try:
            with urlopen(url, timeout=15) as response:
                return response.read(), response.headers
        except URLError:
            if attempt == 7:
                raise
            time.sleep(1)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base-url", default="http://127.0.0.1:81")
    args = parser.parse_args()
    base = args.base_url.rstrip("/") + "/"
    html, headers = fetch(base)
    for marker in (b"Umar Khan", b"Checker", b"</html>"):
        if marker not in html:
            raise RuntimeError(f"Portfolio content missing: {marker!r}")
    for name, value in (("X-Content-Type-Options", "nosniff"), ("X-Frame-Options", "DENY")):
        if headers.get(name) != value:
            raise RuntimeError(f"Missing expected header {name}: {value}")
    if b"ok" not in fetch(urljoin(base, "healthz"))[0]:
        raise RuntimeError("Nginx health endpoint failed")
    assets = Assets()
    assets.feed(html.decode("utf-8"))
    if not any("/_next/" in p for p in assets.paths):
        raise RuntimeError("Expected the portfolio's Next.js assets in the export")
    checked = 0
    for path in sorted(assets.paths | {"/UmarKhanResume.pdf", "/robots.txt", "/sitemap.xml"}):
        if urlparse(path).scheme or path.startswith("//"):
            continue
        data, _ = fetch(urljoin(base, path))
        if not data:
            raise RuntimeError(f"Empty static asset: {path}")
        checked += 1
        print(f"OK {path} ({len(data)} bytes)")
    try:
        urlopen(urljoin(base, "assignment-page-that-does-not-exist"), timeout=15)
    except HTTPError as exc:
        if exc.code != 404:
            raise
    else:
        raise RuntimeError("Unknown routes should return 404")
    print(f"PASS: portfolio, headers, health endpoint, 404 and {checked} static assets")


if __name__ == "__main__":
    main()
