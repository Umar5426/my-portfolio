import React, {useState} from 'react'
import Image from "next/image";
import { assets } from '@/assets/assets';

const Contact = () => {

  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "ec2eb402-e9ef-412e-9ec1-deeea82068ca");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div
      id="contact"
      className="w-full px-[12%] py-10 scroll-mt-20 bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: "url('/footer-bg-color.png')" }}
    >

        <h4 className="text-center text-lg mb-2">Connect with Me</h4>
        <h2 className="text-center text-5xl">Get in Touch</h2>

        <p className='text-center max-w-2xl mx-auto mt-5 mb-12'>
            I'd love to hear from you! Whether you have a question, want to collaborate on a project, or just want 
            to say hi, feel free to reach out to me.
        </p>
      
      <form onSubmit={onSubmit} className='max-w-2xl mx-auto'>
        <div className='grid gap-6 mt-10 mb-8' style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
          <input type='text' placeholder='Enter your name' required className='flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white' name='name'/>
          <input type='text' placeholder='Enter your email' required className='flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white' name='email'/>
        </div>
        <textarea rows='6' placeholder='Enter your message' required className='w-full p-4 outlne-none border-[0.5px] border-gray-400 rounded-md bg-white mb-6' name='message'></textarea>
        <button type='submit' className='py-3 px-8 w-max flex items-center justify-between gap-2 bg-black/80
        text-white rounded-full mx-auto hover:bg-black duration-500 cursor-pointer'
        >Submit Now
          <Image src={assets.right_arrow_white} alt="Send Icon" className='w-4' />
        </button>

        <p className='mt-4'>{result}</p>
      </form>
    </div>
  )
}

export default Contact