import React from 'react';
// import { Link } from 'react-router-dom';
import './Admin.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { adminLogin } from '../../../service/Adminapi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAdminDetails } from '../../../Features/setAdmin';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (adminData) => {
      try {
        const { data } = await adminLogin(adminData);

        console.log(data, '!!!!!!');
        if (data.status) {
          dispatch(setAdminDetails(adminData));
          localStorage.setItem('adminToken', data.token);
          
          navigate('/admin/Adminuserlist');
        }
      } catch (error) {
        console.error('Login failed:', error.message);
      }
    },
  });

  return (
    <div className="admin-login-top">
      <div>
        <form className="admin-form-main" onSubmit={formik.handleSubmit}>
          <div>
            <h2>ADMIN LOGIN</h2>
            <label>Email</label>
            <input
              type="string"
              name="email"
              placeholder="enter email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="admin-error-message">{formik.errors.email}</div>
            )}
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="enter password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="admin-error-message">
                {formik.errors.password}
              </div>
            )}
          </div>
          <br />
          <button className="admin-btn-login" type="submit">
            Login
          </button>
          {/* <p>
            Don't have an account? <Link to="/AdminRegister"> Register </Link> 
          </p> */}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
