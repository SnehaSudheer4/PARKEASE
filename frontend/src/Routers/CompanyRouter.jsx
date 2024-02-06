import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CompanyAddsecurityPage from '../Pages/Company/CompanyAddsecurityPage';
import CompanyHomePage from '../Pages/Company/CompanyHomePage';
import CompanyLoginPage from '../Pages/Company/CompanyLoginPage';
import CompanySecuritylistPage from '../Pages/Company/CompanySecuritylistPage';
import CompanySlot from '../Pages/Company/CompanySlot';
import EditSlot from '../Pages/Company/EditSlot';
// import Slot from '../Components/Company/Slots/Slot';

const CompanyRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/AddSecurity" element={<CompanyAddsecurityPage />} />
        {/* <Route path='/Companynav' element={<CompanyNav/>}/> */}
        <Route path="/Companyhome" element={<CompanyHomePage />} />
        <Route path="/Companylogin" element={<CompanyLoginPage />} />
        <Route path="/securityview" element={<CompanySecuritylistPage />} />
        <Route path="/AddSlots" element={<CompanySlot />} />
        <Route path="/Slots" element={<EditSlot />} />
      </Routes>
    </div>
  );
};

export default CompanyRouter;
