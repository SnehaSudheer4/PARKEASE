// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { securityLogin } from '../../../service/Securityapi';
// import { useDispatch } from 'react-redux';
// import {  setSecurityDetails } from '../../../Features/setSecurity';
// import { useNavigate } from 'react-router-dom';

// const validationSchema = Yup.object().shape({
//   email: Yup.string()
//     .email('Invalid email format')
//     .required('Email is required'),
//   password: Yup.string().required('Password is required'),
// });

// const SecurityLogin = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (securityData) => {
//       try {
//         const { data } = await securityLogin(securityData);
//         console.log('Security login successful', data);
//         if (data.status) {
         
          
//           localStorage.setItem('securitytoken', data.token);
//           dispatch(setSecurityDetails(data.security));
//           navigate('/security/Securityuserlist');
//         }
//       } catch (error) {
//         console.error('Error logging in as a security:', error.message);
//       }
//     },
//   });
  

//   return (
//     <div className="login-top">
//       <div>
//         <form className="form-main" onSubmit={formik.handleSubmit}>
//           <div>
//             <h2>SECURITY LOGIN</h2>
//             <label>Email</label>
//             <input
//               type="text"
//               name="email"
//               placeholder="enter email"
//               value={formik.values.email}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//             />

//             {formik.touched.email && formik.errors.email && (
//               <div className="error-message">{formik.errors.email}</div>
//             )}
//           </div>
//           <div>
//             <label>Password</label>
//             <input
//               type="password"
//               name="password"
//               placeholder="enter password"
//               value={formik.values.password}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//             />
//             {formik.touched.password && formik.errors.password && (
//               <div className="error-message">{formik.errors.password}</div>
//             )}
//           </div>
//           <br />
//           <button className="btn-login" type="submit">
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SecurityLogin;

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { securityLogin } from '../../../service/Securityapi';
import { useDispatch } from 'react-redux';
import { loginSecurity, setSecurityDetails } from '../../../Features/setSecurity';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const SecurityLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (securityData) => {
      try {
        const { data } = await securityLogin(securityData);
        console.log('Security login successful', data);
        if (data.status) {
          dispatch(loginSecurity(data)); // Dispatch action to update redux state with security details
          dispatch(setSecurityDetails(data)); // Dispatch action to update redux state with security details
          localStorage.setItem('securitytoken', data.token);
          navigate('/security/Securityuserlist');
        }
      } catch (error) {
        console.error('Error logging in as a security:', error.message);
      }
    },
  });
  
  return (
    <div className="login-top">
      <div>
        <form className="form-main" onSubmit={formik.handleSubmit}>
          <div>
            <h2>SECURITY LOGIN</h2>
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.touched.email && formik.errors.email && (
              <div className="error-message">{formik.errors.email}</div>
            )}
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="error-message">{formik.errors.password}</div>
            )}
          </div>
          <br />
          <button className="btn-login" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SecurityLogin;

