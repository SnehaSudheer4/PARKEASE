import React from 'react';
import { Route, Routes } from 'react-router-dom';


// import AdminNav from '../Components/Admin/AdminNavbar/AdminNav';
// import AdminHome from '../Components/Admin/AdminHome/AdminHome';

import 'bootstrap/dist/css/bootstrap.min.css';

import AdminLoginPage from '../Pages/Admin/AdminLoginPage';
import AdminUserlistPage from '../Pages/Admin/AdminUserlistPage';
import AdminAddcompanyPage from '../Pages/Admin/AdminAddcompanyPage';
import AdminCompanyList from '../Pages/Admin/AdminCompanyList';


const AdminRouter = () => {
  return (
   <div>
    <Routes>
    <Route path='/AdminLogin' element= {<AdminLoginPage/>}/>
    <Route path='/Adminuserlist' element= {<AdminUserlistPage/>}/>
    {/* <Route path='/AdminNav' element= {<AdminNav/>}/> */}
    {/* <Route path='/AdminHome' element= {<AdminHome/>}/> */}
    <Route path='/AddCompany' element= {<AdminAddcompanyPage/>}/>
    <Route path='/Admincompanylist' element= {<AdminCompanyList/>}/>
    </Routes>
    </div>
  );
}

export default AdminRouter;
