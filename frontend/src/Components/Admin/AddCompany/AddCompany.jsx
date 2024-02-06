import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { companySignUp } from '../../../service/Adminapi';
// import AdminNav from '../AdminNavbar/AdminNav';

const validationSchema = Yup.object().shape({
  companyName: Yup.string()
    .required('Company name is required')
    .min(4, 'Company name must be at least 4 characters')
    .max(50, 'Company name cannot be more than 50 characters'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^\d{10,11}$/, 'Enter a valid phone number'),
  place: Yup.string()
    .required('Place is required')
    .max(50, 'Place cannot be more than 50 characters'),
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

const AddCompany = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      companyName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      place: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (companyData) => {
      try {
        await companySignUp(companyData);
        console.log('Company registered successfully');
        navigate('/admin/Admincompanylist');
      } catch (error) {
        console.error('Error registering company:', error.message);
      }
    },
  });
  useEffect(() => {
    return () => {
      
    };
  }, []); 
  return (
    <div>
        {/* <AdminNav/><br/><br/> */}
      <div className="register-page">
        <div className="form">
          <div className="register">
            <form onSubmit={formik.handleSubmit}>
              <div className="register-header">
                <h1>Add Company</h1>
              </div>
              <label>Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formik.values.companyName}
                placeholder="Enter company name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.companyName && formik.errors.companyName && (
                <div className="error-message">{formik.errors.companyName}</div>
              )}

              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                placeholder="Enter the email"
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
                placeholder="Enter your phone number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="error-message">{formik.errors.phone}</div>
              )}

              <label>Place</label>
              <input
                type="text"
                name="place"
                value={formik.values.place}
                placeholder="Enter the place"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.place && formik.errors.place && (
                <div className="error-message">{formik.errors.place}</div>
              )}

              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formik.values.password}
                placeholder="Enter your password"
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
                placeholder="Enter your password"
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCompany;
