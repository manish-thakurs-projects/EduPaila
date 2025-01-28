import { Link } from 'react-router-dom';
import Logo from '../components/logo';

export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center py-10">
      <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-xl">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
       
        <div className="text-lg text-gray-600 flex flex-col gap-6 text-center">
          <p className="leading-relaxed animate__animated animate__fadeIn animate__delay-1.5s">
            Welcome to EduPaila! EduPaila is dedicated to providing high-quality education and resources to help students prepare for the <strong>Institute of Engineering (IOE)</strong> entrance exams and <strong>National Examination Board (NEB)</strong> courses. We aim to make preparation easier and more affordable for students eager to pursue higher education.
          </p>
          <p className="leading-relaxed animate__animated animate__fadeIn animate__delay-2s">
            Our platform offers expertly curated courses, study materials, and practice tests that are specifically designed to help you succeed in the competitive entrance exams. Whether you are preparing for the IOE entrance or need help with your NEB courses, EduPaila provides you with all the tools you need to excel.
          </p>
          <p className="leading-relaxed animate__animated animate__fadeIn animate__delay-2.5s">
            At EduPaila, we believe that every student deserves a fair chance at success. That's why we strive to offer affordable, accessible, and effective study resources to help you achieve your academic goals. Join EduPaila today and take the first step toward a bright future in higher education!
          </p>
        </div>
        
        <div className="px-12 py-3 flex justify-center mt-8 rounded-full transform hover:scale-110 transition duration-300">
          <Link to="/joinus">
            <button color='blue'>
            
              Start Your Journey with EduPaila
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
