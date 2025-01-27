import React from 'react';
import { Link } from 'react-router-dom';
import Logoimg from '../assets/logo.png'; // Importing the logo image

const Logo = ({ size = "w-24" }) => {
  return (
    <div className={`logo ${size}`}>
      <Link to="/">
        <img src={Logoimg} alt="Logo" className={`logo-img ${size}`} />
      </Link>
    </div>
  );
};

export default Logo;
