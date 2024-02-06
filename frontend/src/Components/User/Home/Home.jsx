import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Popup from '../Popup/Popup';

const Home = () => {
  const navigate = useNavigate();
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleLoginClick = () => {
    navigate('/UserLogin');
  };

  const handleRegisterClick = () => {
    navigate('/UserRegister');
  };

  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <div>
      <nav
        className="navbar navbar-light bg-light"
        style={{ padding: '20px', fontSize: '18px' }}>
        PARKEASE
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <button className="button-popup" onClick={openPopup}>
              How It Works ?
            </button>
          </li>
        </ul>
      </nav>
      <div className="body-home">
        <div className="transparent-box">
          <div className="container">
            <h1 className="container-h1">
              WELCOME TO PARKEASE <br />
              <img
                src="https://www.animatedimages.org/data/media/67/animated-car-image-0369.gif"
                border="0"
                alt="park here"
              />
            </h1>
            <div>
              <button className="button-user" onClick={handleLoginClick}>
                Login
              </button>
              <button className="button-user" onClick={handleRegisterClick}>
                Register
              </button>
              <br />
              <br />
            </div>
          </div>
          {isPopupVisible && <Popup onClose={closePopup} />}
        </div>
      </div>
    </div>
  );
};

export default Home;
