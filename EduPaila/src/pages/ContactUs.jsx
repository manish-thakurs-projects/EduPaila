import { Button } from 'flowbite-react';
import React from 'react';
import { IoMdMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import Logo from '../components/logo';

const ContactUs = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-slate-300 sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-4 text-gray-600 text-lg sm:text-xl">
            We'd love to hear from you! Reach out to us for any inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="dark:bg-slate-900 bg-slate-300 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold dark:text-white text-gray-800 mb-6">
              Contact Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
              <FaPhoneAlt className='text-blue-500 text-2xl' />
                <div>
                  <p className="text-gray-800 dark:text-slate-300 font-medium">Phone</p>
                  <p className="text-gray-600 dark:text-slate-300">+977 9801996736</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
              <IoMdMail className='text-blue-500 text-2xl' />
                <div>
                  <p className="text-gray-800 dark:text-slate-300 font-medium">Email</p>
                  <p className="text-gray-600 dark:text-slate-300">edupaila.np@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center  min-h-[200px] sm:min-h-[300px] md:min-h-[400px] animate-pulse">
  <Logo size="w-40" />
</div>



          </div>

          <div className="bg-white dark:bg-slate-900 p-8 flex flex-col justify-center items-center rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold dark:text-slate-300 text-gray-800 mb-6">
              Send Us a Message
            </h2>
            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              className="joinUs-form space-y-4"
            >
              <input type="hidden" name="access_key" value="2d69e1be-9ae1-48d3-a2c5-57634909b076" />
              
              <div>
                <label htmlFor="name" className="block dark:text-slate-300 text-gray-700 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full mt-1 p-3 border dark:text-slate-300 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block dark:text-slate-300 text-gray-700 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full mt-1 p-3 border dark:text-slate-300 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Email"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block dark:text-slate-300 text-gray-700 font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="w-full mt-1 p-3 border dark:text-slate-300 outline-none rounded-lg focus:outline-none "
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>

              <Button
                type="submit"
                pill
                color='green'
                outline
                className='w-full'
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
