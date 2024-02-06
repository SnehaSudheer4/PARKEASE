


import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addUserReservation } from '../../../service/Securityapi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SecurityNav from '../SecurityNav/SecurityNav';
import { useLocation } from 'react-router-dom';
import './securityform.css'
import { useSelector } from 'react-redux';
import { selectSecurity } from '../../../Features/setSecurity';

const SecurityForm = () => {
  const [reservationError, setReservationError] = useState(null);
  const location = useLocation();
  const securityUser = useSelector(selectSecurity);

  const companyNameFromSearch = location.state?.companyName || '';


  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      date: new Date(),
      vehicleNumber: '',
      vehicleType: '',
      companyName:  securityUser?.companyName || companyNameFromSearch,
      arrivingTime: '', 
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      phone: Yup.string().required('Phone is required'),
      date: Yup.date().required('Date is required'),
      vehicleNumber: Yup.string()
        .required('Vehicle number is required')
        .matches(/^[a-zA-Z0-9]*$/, 'Invalid format'),
        companyName: Yup.string().required('Company name is required'),
      arrivingTime: Yup.string() 
        .required('Arriving time is required'),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Combine selected date with the time from the arrivingTime field
        const dateTimeString = `${formik.values.date.toISOString().slice(0, 10)}T${formik.values.arrivingTime}`;
    
        // Parse the combined string into a JavaScript Date object
        const formattedArrivingTime = new Date(dateTimeString);
    
        // Check if the formattedArrivingTime is valid
        if (isNaN(formattedArrivingTime)) {
          throw new Error('Invalid arriving time');
        }
    
        const formattedValues = {
          ...values,
          arrivingTime: formattedArrivingTime,
        };
    
        await addUserReservation(formattedValues);
        toast.success('Reservation successfully saved');
        setSubmitting(false);
      } catch (error) {
        setReservationError(error.message);
        toast.error('Error saving reservation');
        setSubmitting(false);
      }
    },
  });

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
    <SecurityNav/><br/><br/>
    <div className="reservation-container">
      <h2>Reservation Form</h2>
      <form className="reservation-form" onSubmit={formik.handleSubmit}>
      <div>
          <label>
            Company Name:
            <input
              type="text"
              name="companyName"
              value={formik.values.companyName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            
            />
            {formik.touched.companyName && formik.errors.companyName && (
              <div className="error">{formik.errors.companyName}</div>
            )}
          </label>
        </div>
       
        <div>
          <label>
            Arriving Time:
            <input
              type="time"
              name="arrivingTime"
              value={formik.values.arrivingTime}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.arrivingTime && formik.errors.arrivingTime && (
              <div className="error">{formik.errors.arrivingTime}</div>
            )}
          </label>
        </div>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="error">{formik.errors.name}</div>
            )}
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="text"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error">{formik.errors.email}</div>
            )}
          </label>
        </div>
        <div>
          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="error">{formik.errors.phone}</div>
            )}
          </label>
        </div>
        
        <div>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={formatDate(formik.values.date)}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.date && formik.errors.date && (
              <div className="error">{formik.errors.date}</div>
            )}
          </label>
        </div>
        <div>
          <label>
            Vehicle number:
            <input
              type="text"
              name="vehicleNumber"
              value={formik.values.vehicleNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.vehicleNumber && formik.errors.vehicleNumber && (
              <div className="error">{formik.errors.vehicleNumber}</div>
            )}
          </label>
        </div>
        <div>
          <label>
            Vehicle Type:
            <select
              name="vehicleType"
              value={formik.values.vehicleType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}>
              <option value="">Select Vehicle Type</option>
              <option value="Two Wheeler">Two Wheeler</option>
              <option value="Four Wheeler">Four Wheeler</option>
            </select>
            {formik.touched.vehicleType && formik.errors.vehicleType && (
              <div className="error">{formik.errors.vehicleType}</div>
            )}
          </label>
        </div>
        <button type="submit" disabled={formik.isSubmitting} className='reserve-submit'>
          Submit
        </button>
      </form>
      {reservationError && <div>{reservationError}</div>}
      <ToastContainer />
    </div>
    </div>
  );
};

export default SecurityForm;
