// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import './CompanyNav.css';
// import {  Logincompany, Logoutcompany, selectCompany } from '../../../Features/setCompany';
// import { companyHeader } from '../../../service/Companyapi';

// const CompanyNav = () => {
//   const dispatch = useDispatch();
//   const company = useSelector(selectCompany);
//   const navigate = useNavigate();

//   const handleNavigation = (path) => {
//     navigate(path);
//   };

//   useEffect(() => {
//     companyHeader()
//       .then((res) => {
//         dispatch(Logincompany(res.data.company));
//       })
//       .catch((error) => {
//         console.log('Error fetching company data', error);
//       });
//   }, [dispatch]);

//   const handleLogout = () => {
//     navigate('/');
//     dispatch(Logoutcompany(null));

//   };

//   return (
//     <div className="company-nav">
//       <ul>
//         <li>
//           <button onClick={() => handleNavigation('/company/Companyhome')} className="button-elements">
//             SECURITY LIST
//           </button>
//         </li>
//         <li>
//           <button onClick={() => handleNavigation('/company/AddSecurity')} className="button-elements">
//             ADD SECURITY
//           </button>
//         </li>
//         <li>
//           <button onClick={() => handleNavigation('/company/AddSlots')} className="button-elements">
//             ADD-SLOTS
//           </button>
//         </li>
//         <li>
//         <button onClick={() => handleNavigation('/company/Slots')} className="button-elements">
//             SLOTS
//           </button>
//         </li>
//         {company && (
//           <li className="user-info">
//             <i className="fas fa-user"></i>
//             <p className="user-email">{company.email}</p>
//           </li>
//         )}
//         <li>
//           <button onClick={handleLogout} className="logout-company">
//             LOGOUT
//           </button>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default CompanyNav;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './CompanyNav.css';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { companyHeader } from '../../../service/Companyapi';
import { Logincompany, Logoutcompany, selectCompany,} from '../../../Features/setCompany';

const CompanyNav = () => {
  const dispatch = useDispatch();
  const company = useSelector(selectCompany);
  const navigate = useNavigate();
  const [showPopover, setShowPopover] = useState(false);
  const [showNavItems, setShowNavItems] = useState(false);

  useEffect(() => {
    companyHeader()
      .then((res) => {
        dispatch(Logincompany(res.data.company));
      })
      .catch((error) => {
        console.log('Error fetching company data', error);
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
    dispatch(Logoutcompany(null));
  };

  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  const toggleNavItems = () => {
    setShowNavItems(!showNavItems);
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Company Email</Popover.Header>
      <Popover.Body>{company && company.email}</Popover.Body>
    </Popover>
  );

  return (
    <nav className="navbar navbar-dark bg-dark">
      <span className="navbar-brand">COMPANY--PARKEASE</span>
      <div className="nav-icon" onClick={toggleNavItems}>
        <i className="fas fa-bars" style={{ marginLeft: '10px' }}></i>
      </div>
      <ul className={`navbar-nav ${showNavItems ? 'show' : ''}`}>
        <li className="nav-item">
          <Button
            variant="link"
            className="nav-link"
            onClick={() => handleNavigation('/company/Companyhome')}>
            SECURITY LIST
          </Button>
        </li>
        <li className="nav-item">
          <Button
            variant="link"
            className="nav-link"
            onClick={() => handleNavigation('/company/AddSecurity')}>
            ADD SECURITY
          </Button>
        </li>
        <li className="nav-item">
          <Button
            variant="link"
            className="nav-link"
            onClick={() => handleNavigation('/company/AddSlots')}>
            ADD-SLOTS
          </Button>
        </li>
        <li className="nav-item">
          <Button
            variant="link"
            className="nav-link"
            onClick={() => handleNavigation('/company/Slots')}>
            SLOTS
          </Button>
        </li>
        {company && (
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

export default CompanyNav;
