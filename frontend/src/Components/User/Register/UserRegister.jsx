import React from 'react';
// import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Register.css';
import { userRegister,  } from '../../../service/Userapi';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Name is required')
    .min(4, 'Username must be at least 4 characters')
    .max(15, 'Username cannot be more than 15 characters'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^\d{10,11}$/, 'Enter a valid phone number'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9].*[0-9].*[0-9].*[0-9])/,
      'Password must contain at least one special character and at least four numbers'
    )
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
});

const UserRegister = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await userRegister(values);
        console.log('User registered successfully');
        navigate('/UserLogin');
      } catch (error) {
        console.error('Error registering user:', error.message);
      }
    },
  });

  return (
    <div>
      <div className="register-page">
        <div className="form">
          <div className="register">
            <form onSubmit={formik.handleSubmit}>
              <div className="register-header">
                <h1>Register</h1>
              </div>

              <label>Name</label>
              <input
                type="text"
                name="username"
                value={formik.values.username}
                placeholder="enter your name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.username && formik.errors.username && (
                <div className="error-message">{formik.errors.username}</div>
              )}
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                placeholder="enter the email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="error-message">{formik.errors.email}</div>
              )}
              <label>Contact No</label>
              <input
                type="text"
                name="phone"
                value={formik.values.phone}
                placeholder="enter your phone number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="error-message">{formik.errors.phone}</div>
              )}
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formik.values.password}
                placeholder="enter your password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="error-message">{formik.errors.password}</div>
              )}
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                placeholder="enter your password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <br />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <div className="error-message">
                    {formik.errors.confirmPassword}
                  </div>
                )}
              <button className="btn-register" type="submit">
                Register
              </button>
              {/* <p>
                Do you have an account? <Link to="/UserLogin">Login</Link>
              </p> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
