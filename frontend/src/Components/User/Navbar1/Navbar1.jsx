
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Navbar1.css';
import { login, logout, selectUser } from '../../../Features/setUser';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import { userHeader } from '../../../service/Userapi';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const Navbar1 = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [showPopover, setShowPopover] = useState(false);
  const [showNavItems, setShowNavItems] = useState(false); 
  useEffect(() => {
    userHeader()
      .then((res) => {
        dispatch(login(res.data.user));
      })
      .catch((error) => {
        console.log('Error fetching user data', error);
      });
  }, [dispatch]);

  const handleLogout = () => {
    navigate('/UserHome');
    dispatch(logout());
  };
  
  const handleClick = () => {
    navigate('/viewuser');
  };

  const handleMap = () => {
    navigate('/Map');
  };

  const handleHome = () => {
    navigate('/UserSearch');
  };

  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  const toggleNavItems = () => {
    setShowNavItems(!showNavItems); 
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">User Email</Popover.Header>
      <Popover.Body>{user && user.email}</Popover.Body>
    </Popover>
  );

  return (
    <nav className="navbar navbar-dark bg-dark">
      <span className="navbar-brand">PARKEASE</span>
      <div className="nav-icon" onClick={toggleNavItems}> 
        <i className="fas fa-bars" style={{ marginLeft: '10px' }}></i> {/* Adjusted left margin */}
      </div>
      <ul className={`navbar-nav ${showNavItems ? 'show' : ''}`}> 
        <li className="nav-item">
          <Button variant="link" className="nav-link" onClick={handleHome}>
            HOME
          </Button>
        </li>
        <li className="nav-item">
          <Button variant="link" className="nav-link" onClick={handleClick}>
            RESERVATIONS
          </Button>
        </li>
        <li className="nav-item">
          <Button variant="link" className="nav-link" onClick={handleMap}>
            LOCATION
          </Button>
        </li>
        <li className="nav-item">
          <Button variant="link" className="nav-link" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"  style={{color:'red'}}></i>
            <span style={{color:'red'}}>Logout</span>
          </Button>
        </li>
        <li className="nav-item">
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            show={showPopover}
            overlay={popover}
            rootClose
            onHide={() => setShowPopover(false)}>
            <Button
              variant="link"
              className="nav-link"
              onClick={togglePopover}>
              <i className="fas fa-user" style={{color:'blue'}} ></i>
              <span style={{color:'blue'}} >PROFILE</span>
            </Button>
          </OverlayTrigger>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar1;
