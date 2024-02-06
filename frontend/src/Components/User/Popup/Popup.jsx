import React from 'react';
import './Popup.css';

const Popup = ({ onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <span className="close-icon" onClick={onClose}>
          &times;
        </span>
        <h2>How It Works</h2><br/>
        <ol>
          <li>Find your car park! Sign up and check our presence at hotels, restaurants, airport...</li>
          <li>Book! Select date and time, check availability, see prices...</li>
          <li>And park! Upon arrival, just show your reservation in the car park.</li><br/><br/><br/>
          <img src="https://www.animatedimages.org/data/media/67/animated-car-image-0021.gif" border="0" alt = "park here" />
        </ol>
      </div>
    </div>
  );
};

export default Popup;
