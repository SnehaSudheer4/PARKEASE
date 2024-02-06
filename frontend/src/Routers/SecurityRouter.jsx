import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SecurityForm from '../Components/Security/SecurityForm/SecurityForm';
import SecurityLoginPage from '../Pages/Security/SecurityLoginPage';
import SecurityUserListpage from '../Pages/Security/SecurityUserListpage';
import SecuritySlot from '../Pages/Security/SecuritySlot';
// import SecurityHomePage from '../Pages/Security/SecurityHomePage';

const SecurityRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/Securitylogin" element={<SecurityLoginPage />} />
        <Route path="/SecurityForm" element={<SecurityForm />} />
        <Route path="/Securityuserlist" element={<SecurityUserListpage />} />
        <Route path='/Securityslot' element={<SecuritySlot/>}/>
      </Routes>
    </div>
  );
};

export default SecurityRouter;
