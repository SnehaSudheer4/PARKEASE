import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { securitySignUp } from '../../../service/Companyapi';
import { useSelector } from 'react-redux';
import { selectCompany } from '../../../Features/setCompany';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
    phone: Yup.string()
    .required('Phone number is required')
    .matches(/^\d{10,11}$/, 'Enter a valid phone number'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
    companyName: Yup.string().required('Company name is required'),
});

const AddSecurity = () => {
  const navigate = useNavigate();
  const loggedInUser = useSelector(selectCompany)

  const formik = useFormik({
    initialValues: {
      companyName:loggedInUser?.companyName,
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (securityData,{resetForm}) => {
      try {
        await securitySignUp(securityData);
        console.log('Security registered successfully');
        resetForm()
        navigate('/company/Companyhome');
      } catch (error) {
        console.error('Error registering security:', error.message);
      }
    },
  });

  useEffect(() => {
    return () => {
      
    };
  }, []); 

  return (
    <div>
    
    <div className="register-page">
      <div className="form">
        <div className="register">
          <form onSubmit={formik.handleSubmit}>
            <div className="register-header">
              <h1>Add Security</h1>
            </div>

            <div className="form-group">
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
            </div>
            <div className="form-group">
                <label>Company name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formik.values.companyName}
                  placeholder="Enter the company name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled
                />
                {formik.touched.companyName&& formik.errors.companyName && (
                  <div className="error-message">
                    {formik.errors.companyName}
                  </div>
                )}
              </div>
            <div className="form-group">
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
            </div>

            <div className="form-group">
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
            </div>

            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword" 
              value={formik.values.confirmPassword} 
              placeholder="Enter your password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
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

export default AddSecurity;
