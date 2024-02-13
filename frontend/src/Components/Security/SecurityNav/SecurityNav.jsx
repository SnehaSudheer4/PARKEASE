// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// // import './CompanyNav.css';
// import { useNavigate } from 'react-router-dom';
// import {loginSecurity,logoutSecurity,selectSecurity,} from '../../../Features/setSecurity';
// import { securityHeader } from '../../../service/Securityapi';

// const SecurityNav = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const security = useSelector(selectSecurity);
//   const handleNavigation = (path) => {
//     navigate(path);
//   };

 
// useEffect(() => {
//   securityHeader()
//     .then((res) => {
//       dispatch(loginSecurity(res.data.security)); 
//     })
//     .catch((error) => {
//       console.log('Error fetching user data', error);
//     });
// }, [dispatch]);


//   const handleLogout = () => {
//     navigate('/');
//     dispatch(logoutSecurity(null));
    
//   };

//   return (
//     <div className="company-nav">
//       <ul>
//         <li>
//           <button onClick={() => handleNavigation('/security/SecurityForm')} className="button-elements">
//             Form
//           </button>
//         </li>
//         <li>
//           <button onClick={() => handleNavigation('/security/SecurityUserlist')} className="button-elements">
//             Userlist
//           </button>
//         </li>
//         <li>
//           <button onClick={() => handleNavigation('/security/Securityslot')} className="button-elements">
//             View Slot
//           </button>
//         </li>

//         {security && (
//           <li className="user-info">
//             <i className="fas fa-user"></i>
//             <p className="user-email">{security.email}</p>
//           </li>
//         )}
//         <li>
//           <button onClick={handleLogout} className="logout-company">
//             Logout
//           </button>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default SecurityNav;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Securitynav.css';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { securityHeader } from '../../../service/Securityapi';
import { loginSecurity, logoutSecurity, selectSecurity } from '../../../Features/setSecurity';

const SecurityNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const security = useSelector(selectSecurity);
  const [showPopover, setShowPopover] = useState(false);
  const [showNavItems, setShowNavItems] = useState(false);

  useEffect(() => {
    securityHeader()
      .then((res) => {
        dispatch(loginSecurity(res.data.security)); 
      })
      .catch((error) => {
        console.log('Error fetching user data', error);
      });
  }, [dispatch]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest('.navbar')) {
        setShowNavItems(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setShowNavItems(false);
  };

  const handleLogout = () => {
    navigate('/');
    dispatch(logoutSecurity(null));
  };

  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  const toggleNavItems = () => {
    setShowNavItems(!showNavItems);
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Security Email</Popover.Header>
      <Popover.Body>{security && security.email}</Popover.Body>
    </Popover>
  );

  return (
    <nav className="navbar navbar-dark bg-dark">
      <span className="navbar-brand">SECURITY--PARKEASE</span>
      <div className="nav-icon" onClick={toggleNavItems}>
        <i className="fas fa-bars" style={{ marginLeft: '10px' }}></i>
      </div>
      <ul className={`navbar-nav ${showNavItems ? 'show' : ''}`}>
        <li className="nav-item">
          <Button
            variant="link"
            className="nav-link"
            onClick={() => handleNavigation('/security/SecurityForm')}>
            SECURITY FORM
          </Button>
        </li>
        <li className="nav-item">
          <Button
            variant="link"
            className="nav-link"
            onClick={() => handleNavigation('/security/SecurityUserlist')}>
            SECURITY USERLIST
          </Button>
        </li>
        <li className="nav-item">
          <Button
            variant="link"
            className="nav-link"
            onClick={() => handleNavigation('/security/Securityslot')}>
            SECURITY SLOT
          </Button>
        </li>
        {security && (
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
                <i className="fas fa-user" style={{color:'blue'}}></i>
                <span style={{color:'blue'}}>PROFILE</span>
              </Button>
            </OverlayTrigger>
          </li>
        )}
        <li className="nav-item">
          <Button variant="link" className="nav-link" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt" style={{color:'red'}}></i>
            <span style={{color:'red'}}>Logout</span>
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default SecurityNav;
