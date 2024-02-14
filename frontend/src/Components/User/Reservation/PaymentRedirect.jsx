import React, { useState } from 'react';
import './redirect.css';
import { useNavigate } from 'react-router-dom';

const PaymentRedirect = () => {
  const [isClosed, setIsClosed] = useState(false);
  const navigate= useNavigate()
  const handleClose = () => {
    setIsClosed(true);
     navigate('/UserSearch')
  
  };

  return (
    <div>
      {!isClosed && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-button" onClick={handleClose}>
              Close
            </button>
            <h5>Thank you for choosing  parkese payment.Your reservation is successfully saved.</h5>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentRedirect;
