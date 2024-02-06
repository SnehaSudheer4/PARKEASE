import React from 'react';
import SecurityUserList from '../../Components/Security/SecurityUserList/SecurityUserList';
import SecurityNav from '../../Components/Security/SecurityNav/SecurityNav';

const SecurityUserListpage = () => {
  return (
    <div>
      <SecurityNav/>
     <SecurityUserList/> 
    </div>
  );
}

export default SecurityUserListpage;
