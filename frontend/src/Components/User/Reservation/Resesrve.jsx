import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Reserve.css';
import { createReservation } from '../../../service/Userapi';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useSelector } from 'react-redux';
import { selectUser } from '../../../Features/setUser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Reserve = () => {
  const [reservationError, setReservationError] = useState(null);
  const loggedInUser = useSelector(selectUser);
  const location = useLocation();
  const companyNameFromSearch = location.state?.companyName || '';
  const navigate = useNavigate('');

  const vehicleTypes = ['Two Wheeler', 'Four Wheeler'];

  const formik = useFormik({
    initialValues: {
      name: loggedInUser?.username,
      email: loggedInUser?.email || '',
      phone: loggedInUser?.phoneNumber,
      date: new Date(),
      vehicleNumber: '',
      vehicleType: '',
      companyName: companyNameFromSearch,
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
      // vehicleType: Yup.string().required('Vehicle type is required'),
      arrivingTime: Yup.string()
        // .required(new Date(), 'Arriving time must be after the current time')
        .required('Arriving time is required'),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      try {
        const dateTimeString = `${formik.values.date
          .toISOString()
          .slice(0, 10)}T${formik.values.arrivingTime}`;
        const formattedArrivingTime = new Date(dateTimeString);
        if (isNaN(formattedArrivingTime)) {
          throw new Error('Invalid arriving time');
        }
        const reservationData = {
          ...values,
          arrivingTime: formattedArrivingTime,
          vehicleType: values.vehicleType.toLowerCase(),
        };
        await createReservation(reservationData);
        toast.success('Reservation successfully saved');
        setSubmitting(false);
        navigate('/Payment');
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
            Name:
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled
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
              disabled
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
              disabled
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="error">{formik.errors.phone}</div>
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
            Date:
            <input
              type="date"
              name="date"
              value={formatDate(formik.values.date)}
              onChange={(e) =>
                formik.setFieldValue('date', new Date(e.target.value))
              }
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
              {vehicleTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {formik.touched.vehicleType && formik.errors.vehicleType && (
              <div className="error">{formik.errors.vehicleType}</div>
            )}
          </label>
        </div>
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="submit-form">
          Submit
        </button>
      </form>
      {reservationError && <div>{reservationError}</div>}

      <ToastContainer />
    </div>
  );
};

export default Reserve;
