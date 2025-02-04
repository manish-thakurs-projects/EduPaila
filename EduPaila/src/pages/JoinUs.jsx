import './joinUs.css';
import { Button } from 'flowbite-react';
import Logo from '../components/logo';
import { FaWhatsapp } from 'react-icons/fa';

export default function JoinUs() {
  return (
    <div className="joinUs-container">
      <div className="joinUs-wrapper">
        <div className="joinUs-left">
          <Logo />
          <h1 className="joinUs-heading">Affordable Education for Everyone</h1>
          <p className="joinUs-description">
            Traditional education is often expensive and inaccessible, leaving countless learners behind. At EduPaila, we’re changing this by providing high-quality, expert-curated courses for just <strong>Rs. 245</strong> after a <strong>50% discount</strong>.
          </p>
          <p className="joinUs-highlight">
            No hidden fees. No overpriced tuition. Just the education you deserve at a price you can afford.
          </p>
          <p className="joinUs-tagline">
            Prefer to chat with us? Message us on WhatsApp now!
          </p>
          <a
            href="https://wa.me/9779801996736"
            target="_blank"
            rel="noopener noreferrer"
            className='wa-btn'
          >
            <Button color='green' className="joinUs-btn">
              <FaWhatsapp className="mr-2" size={20} />
              Message Us on WhatsApp
            </Button>
          </a>
        </div>

        <div className="joinUs-right">
          <form
            action="https://api.web3forms.com/submit"
            method="POST"
            className="joinUs-form"
          >
            <input 
              type="hidden" 
              name="access_key" 
              value="2d69e1be-9ae1-48d3-a2c5-57634909b076" 
            />
            <h2 className="form-heading">
Or Fill This Form
            </h2>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Your Phone Number</label>
              <input
  type="tel"
  id="email"
  name="email"
  placeholder="Enter your phone number"
  pattern="^[+]?[0-9]{10,15}$"
  required
/>

            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                defaultValue="Contact me using WhatsApp"
                placeholder="You can edit this message"
                required
              ></textarea>
            </div>
            <Button type="submit" color='blue'
             className="form-btn">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
