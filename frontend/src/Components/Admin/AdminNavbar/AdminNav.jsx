import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import './AdminNav.css';
import { adminHeader } from '../../../service/Adminapi';
import { useDispatch, useSelector } from 'react-redux';
import { LoginAdmin, LogoutAdmin, selectAdmin } from '../../../Features/setAdmin';

const AdminNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = useSelector(selectAdmin);
  const [showPopover, setShowPopover] = useState(false);
  const [showNavItems, setShowNavItems] = useState(false);

  useEffect(() => {
    adminHeader()
      .then((res) => {
        dispatch(LoginAdmin(res.data));
      })
      .catch((error) => {
        console.error('Error fetching admin data:', error);
      });
  }, [dispatch]);

  const handleLogout = () => {
    navigate('/admin/AdminLogin');
    dispatch(LogoutAdmin(null));
  };

  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  const toggleNavItems = () => {
    setShowNavItems(!showNavItems);
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Admin Email</Popover.Header>
      <Popover.Body>{admin && admin.email}</Popover.Body>
    </Popover>
  );

  return (
    <nav className="navbar navbar-dark bg-dark">
      <span className="navbar-brand">ADMIN PANEL</span>
      <div className="nav-icon" onClick={toggleNavItems}>
        <i className="fas fa-bars" style={{ marginLeft: '10px' }}></i>
      </div>
      <ul className={`navbar-nav ${showNavItems ? 'show' : ''}`}>
        <li className="nav-item">
          <Link to="/admin/Adminuserlist" className="nav-link">
            USER LIST
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/AddCompany" className="nav-link">
            ADD COMPANY
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/Admincompanylist" className="nav-link">
            COMPANY LIST
          </Link>
        </li>
        <li className="nav-item">
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            show={showPopover}
            overlay={popover}
            rootClose
            onHide={() => setShowPopover(false)}>
            <Button variant="link" className="nav-link" onClick={togglePopover}>
            <i className="fas fa-user" style={{color:'blue'}} ></i>
              <span style={{color:'blue'}} >PROFILE</span>
            </Button>
          </OverlayTrigger>
        </li>
        <li className="nav-item">
          <Button variant="link" className="nav-link" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"  style={{color:'red'}}></i>
            <span style={{color:'red'}}>Logout</span>
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
