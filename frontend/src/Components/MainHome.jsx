// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Mainhome.css'

// const MainHome = () => {
//   return (

//     <div className="main-home-container">
//       <div className="card-container">
//         <Link to='/admin/AdminLogin' className="card">
//           <img className="card-img-top" src="https://static.vecteezy.com/system/resources/thumbnails/006/017/842/small_2x/customer-service-icon-user-with-laptop-computer-and-headphone-illustration-free-vector.jpg" alt="Admin" />
//           <div className="card-body">
//             <h5 className="card-title">ADMIN</h5>
//             {/* <p className="card-text">Click to log in as an admin.</p> */}
//           </div>
//         </Link>
//       </div>

//       <div className="card-container">
//         <Link to='/Userhome' className="card" >
//           <img className="card-img-top" src="https://img.freepik.com/premium-vector/reserve-parking-space-curbside-pickup-abstract-concept-vector-illustration_107173-20370.jpg" alt="Company" />
//           <div className="card-body">
//             <h5 className="card-title">USER</h5>

//           </div>
//         </Link>
//       </div>

//       <div className="card-container">
//         <Link to='/company/Companylogin' className="card" >
//           <img className="card-img-top" src="https://st4.depositphotos.com/1007566/20396/v/450/depositphotos_203968326-stock-illustration-hotel-building-service.jpg" alt="Company" />
//           <div className="card-body">
//             <h5 className="card-title">COMPANY</h5>
//             {/* <p className="card-text">Click to log in as a company.</p> */}
//           </div>
//         </Link>
//       </div>

//       <div className="card-container">
//         <Link to='/security/Securitylogin' className="card" >
//           <img className="card-img-top" src="https://img.freepik.com/free-vector/parking-lot-security-attendant-standing-gate-arm-with-stop-sign-checking-vehicles_74855-14131.jpg" alt="Company" />
//           <div className="card-body">
//             <h5 className="card-title">SECURITY</h5>
//             {/* <p className="card-text">Click to log in as a Security.</p> */}
//           </div>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default MainHome;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Mainhome.css';

const MainHome = () => {
  const navigate = useNavigate('');

  const handleAdminClick = () => {
    navigate('/admin/AdminLogin');
  };
  const handleUserClick = () => {
    navigate('/Userhome');
  };
  const handleCompanyClick = () => {
    navigate('/company/Companylogin');
  };
  const handleSecurityClick = () => {
    navigate('/security/Securitylogin');
  };

  return (
    <div className="body-main">
      <div className="container-main">
        <h1 className="main-h1">PARKEASE</h1>
        <div>
          <button className="btn-main" onClick={handleAdminClick}>
            Admin
          </button>
          <br />
          <button className="btn-main" onClick={handleUserClick}>
            User
          </button>
          <br />
          <button className="btn-main" onClick={handleCompanyClick}>
            Company
          </button>
          <br />
          <button className="btn-main" onClick={handleSecurityClick}>
            Security
          </button>
          <br />
        </div>
        {/* <div><br/>
<img src="https://www.animatedimages.org/data/media/67/animated-car-image-0497.gif" border="0" alt = "park here" style={{background: 'null'}}/>
</div> */}
      </div>
    </div>
  );
};

export default MainHome;
