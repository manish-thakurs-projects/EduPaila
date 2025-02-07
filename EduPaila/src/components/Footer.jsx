import { Footer } from "flowbite-react";
import Logo from "./logo";
import { FaYoutube } from "react-icons/fa";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function FooterCom() {
  const currentYear = new Date().getFullYear();

  return (
    <Footer container className="border-t-8 border-blue-500 bg-gray-900 text-white py-10">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Logo />
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 text-sm">
            <div>
              <Footer.Title title="About Us" className="text-lg font-semibold text-white" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Our Story
                </Footer.Link>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Careers
                </Footer.Link>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Contact Us
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title="Resources" className="text-lg font-semibold text-white" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Blog
                </Footer.Link>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Help Center
                </Footer.Link>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Tutorials
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title="Legal" className="text-lg font-semibold text-white" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </Footer.Link>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Terms of Service
                </Footer.Link>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Disclaimer
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-400">&copy; {currentYear} EduPaila. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a
              href="https://www.facebook.com/edupaila.np"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-600"
            >
              <FaFacebookF size={24} className="hover:scale-110 transition-transform duration-150" />
            </a>
            <a
              href="https://x.com/EdupailaNp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-black"
            >
              <FaXTwitter size={24} className="hover:scale-110 transition-transform duration-150" />
            </a>
            <a
              href="https://youtube.com/@edupaila"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-700"
            >
              <FaYoutube size={24} className="hover:scale-110 transition-transform duration-150" />
            </a>
            <a
              href="https://Instagram.com/edupaila"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500"
            >
              <FaInstagram size={24} className="hover:scale-110 transition-transform duration-150" />
            </a>
          
          </div>
        </div>
      </div>
    </Footer>
  );
}
