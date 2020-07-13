import { faXing } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className="text-center footer bg-dark fixed-bottom d-flex align-items-center justify-content-around flex-wrap">
      <div><small>Copyright &copy; 2020</small></div>
      <div>e&nbsp;
      <FontAwesomeIcon icon={faXing} className="mt-1" size="lg" />
      &nbsp;treme</div>
      
    </div>
  );
};

export default Footer;
