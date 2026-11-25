# Course website demonstration

Use branch `ENSF519.02` at https://github.com/Umar5426/my-portfolio/tree/ENSF519.02.

## Start the course version locally

From an existing checkout with no uncommitted changes:

```sh
git fetch origin
git switch ENSF519.02
git pull --ff-only origin ENSF519.02
cd my_portfolio
npm ci
npm run dev
```

Open the Local URL printed by Next.js (normally http://localhost:3000). A new checkout can instead start with `git clone --branch ENSF519.02 --single-branch https://github.com/Umar5426/my-portfolio.git`.

## Suggested recording, about three minutes

The supplied email and Dropbox instructions require a website recording but do not explicitly require narration. Narration is optional. Keep the address bar visible so the distinct routes can be seen.
1. Start at Home. Show the existing design and switch the theme.
2. Click Work to open `/projects`. Search for `Python`, clear the search and select Research, then return to All.
3. Save a project, select Saved projects, then refresh to show that the selection persists. Clear the filters.
4. Open a project detail page. Expand a workflow stage, refresh the page to show direct-route access, then return to All projects.
5. Open Experience. Switch between Industry and Leadership & projects. Expand a role and a technical capability. Show the résumé download if desired.
6. Open Contact. Submit the empty form to show validation. Enter demonstration details and a message of at least 20 characters. Prepare the email, review it and copy it. Preparing or copying a draft does not send it; opening an email app is optional for the recording.
7. Narrow the browser window and use the mobile menu to return Home. Finish by showing the GitHub course branch.

## Submission

- Add the actual screen recording to the course branch and link it near the top of the README. Keep the filename descriptive, for example `Umar_Khan_Portfolio_Demo.mp4` or `.mov`.
- Submit the course-branch GitHub link and attach the recording to the D2L Dropbox titled **Github Repo Link**.
- Click **Submit** and verify the confirmation. The reopened deadline shown in the supplied screenshot is **November 25, 2026 at 11:59 p.m.**

Do not record the older production site unless its pages match this branch. The original homepage remains the visual starting point, and the new routes supply separate pages and functional interactions for the demonstration.
