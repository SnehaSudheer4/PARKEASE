import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import Home from '../Components/User/Home/Home';
import MainHome from '../Components/MainHome';
import UserLoginPage from '../Pages/User/UserLoginPage';
import UserRegisterPage from '../Pages/User/UserRegisterPage';
import UserSearchpage from '../Pages/User/UserSearchpage';
import UserPopupPage from '../Pages/User/UserPopupPage';
import UserReservePage from '../Pages/User/UserReservePage';
// import PaymentForm from '../Components/User/Payment/Payment';
import UserView from '../Pages/User/UserView';
import Payment from '../Components/User/Payment/Payment';
import MapPage from '../Pages/User/MapPage';
import PaymentRedirect from '../Components/User/Reservation/PaymentRedirect';

function UserRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/UserHome" element={<Home />} />
        <Route path="/UserLogin" element={<UserLoginPage />} />
        <Route path="/UserRegister" element={<UserRegisterPage />} />
        <Route path="/UserSearch" element={<UserSearchpage />} />
        {/* <Route path='/UserNav' element={<Navbar1/>}/> */}
        <Route path="/popup" element={<UserPopupPage />} />
        <Route path="/Reserve" element={<UserReservePage />} />
        <Route path='/Payment' element={<Payment/>}/>
        <Route path='/viewuser' element={<UserView/>}/>
        <Route path='/Map' element={<MapPage/>}/>
        <Route path='/paymentresdirect' element={<PaymentRedirect/>}/>
      </Routes>
    </div>
  );
}

export default UserRouter;
