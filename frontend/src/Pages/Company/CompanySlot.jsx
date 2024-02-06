import React from 'react';

// import CompanyHomePage from './CompanyHomePage';
import CompanyNav from '../../Components/Company/CompanyNav/CompanyNav';
import ManageSlots from '../../Components/Company/Slots/ManageSlot';

const CompanySlot = () => {
  return (
    <div>
     <CompanyNav/><br/>
      <ManageSlots/>
    </div>
  );
};

export default CompanySlot;
