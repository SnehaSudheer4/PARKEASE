import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { companyLogin } from '../../../service/Companyapi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Logincompany, setCompanyDetails } from '../../../Features/setCompany';

// import { Companylogin} from '../../../Features/setCompany';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const CompanyLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,

  //   onSubmit: async (companyData) => {
  //     try {
  //       const { data } = await companyLogin(companyData);
  //       console.log(data, '!!!!!!');
  //       if (data.status) {
  //         dispatch(Logincompany(data.company));
  //         dispatch(setCompanyDetails(data.company));
  //         localStorage.setItem('companyToken', data.token);
  //         navigate('/company/securityview');
  //       }
  //     } catch (error) {
  //       console.log('login failed', error.message);
  //     }
  //   },
  // });
  onSubmit: async (companyData) => {
    try {
      const { data } = await companyLogin(companyData);
      console.log(data, '!!!!!!');
      if (data.status) {
       
        dispatch(Logincompany(data.company)); // Assuming the entire company data is returned
        localStorage.setItem('companyToken', data.token);
        navigate('/company/securityview');
      }
    } catch (error) {
      console.log('login failed', error.message);
    }
  },
});


  return (
    <div className="login-top">
      <div>
        <form className="form-main" onSubmit={formik.handleSubmit}>
          <div>
            <h2>COMPANY LOGIN</h2>
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
        </form>
      </div>
    </div>
  );
};

export default CompanyLogin;
