import React from 'react';
import Userlist from '../../Components/Admin/Userlist/Userlist';
import AdminNav from '../../Components/Admin/AdminNavbar/AdminNav';

const AdminUserlistPage = () => {
  return (
    <div>
        <AdminNav/>
      <Userlist/>
    </div>
  );
}

export default AdminUserlistPage;
