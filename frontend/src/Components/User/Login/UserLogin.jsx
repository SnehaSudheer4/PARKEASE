import React from 'react';
import './Login.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { userLogin } from '../../../service/Userapi';
import { useDispatch } from 'react-redux';
import { login, setUserDetails } from '../../../Features/setUser';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const UserLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate('');
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (userData) => {
      try {
        userLogin(userData)
          .then((response) => {
            console.log(response, '@@@@');
            dispatch(login(userData));
            dispatch(setUserDetails(userData));
            localStorage.setItem('userToken', response.data.token);
            navigate('/UserSearch');
            toast.success()
          })
          .catch((error) => {
            console.error('Error logging in:', error.message);
          });
      } catch (error) {
        console.error('Error logging in:', error.message);
      }
    },
  });

  return (
    <div className="login-top">
      <div>
        <form className="form-main" onSubmit={formik.handleSubmit}>
          <div>
            <h2>LOGIN</h2>
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
              <div className="error-message">{formik.errors.email}</div>
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
              <div className="error-message">{formik.errors.password}</div>
            )}
          </div>
          <br />
          <button className="btn-login" type="submit">
            Login
          </button>
          {/* <p>
            Don't you have an account? <Link to="/UserRegister"> Register </Link>
          </p> */}
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
