import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createSlot, updateSlot } from '../../../service/Companyapi';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { selectCompany } from '../../../Features/setCompany';
import './slot.css';

const ManageSlot = ({ slotToEdit }) => {
  const [formattedSlotData, setFormattedSlotData] = useState(null);
  const loggedInCompany = useSelector(selectCompany);

  const formik = useFormik({
    initialValues: {
      email: loggedInCompany?.email || '',
      place: loggedInCompany?.place || '',
      companyName: loggedInCompany?.companyName || '',
      twoWheelerFree: '',
      fourWheelerFree: '',
      ...slotToEdit,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      place: Yup.string().required('Place is required'),
      companyName: Yup.string().required('Company name is required'),
      twoWheelerFree: Yup.number()
        .required('Number of 2 wheeler slots is required')
        .min(0, 'Number of slots must be at least 0'),
      fourWheelerFree: Yup.number()
        .required('Number of 4 wheeler slots is required')
        .min(0, 'Number of slots must be at least 0'),
    }),
    onSubmit: async (slotData) => {
      console.log('Slot Details:', slotData);
      setFormattedSlotData(slotData);
      try {
        if (slotToEdit) {
          await updateSlot(slotToEdit._id, slotData);
          console.log('Slot updated successfully');
        } else {
          await createSlot(slotData);
          console.log('Slots successfully added');
        }
      } catch (error) {
        console.error('Error in processing data:', error.message);
      }
    },
  });

  return (
    <div className="add-slot-container">
      <h2>{slotToEdit ? 'Edit Slot' : 'Add Slot'} Form</h2>
      <form className="add-slot-form" onSubmit={formik.handleSubmit}>
        <div className="form-group">
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
          </label>
        </div>
        <div className="form-group">
          <label>
            Place:
            <input
              type="text"
              name="place"
              value={formik.values.place}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Name:
            <input
              type="text"
              name="companyName"
              value={formik.values.companyName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Number of 2 Wheeler Slots:
            <input
              type="number"
              name="twoWheelerFree"
              value={formik.values.twoWheelerFree}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.twoWheelerFree && formik.errors.twoWheelerFree && (
              <div className="error">{formik.errors.twoWheelerFree}</div>
            )}
          </label>
        </div>
        <div className="form-group">
          <label>
            Number of 4 Wheeler Slots:
            <input
              type="number"
              name="fourWheelerFree"
              value={formik.values.fourWheelerFree}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.fourWheelerFree &&
              formik.errors.fourWheelerFree && (
                <div className="error">{formik.errors.fourWheelerFree}</div>
              )}
          </label>
        </div>
        <div>
          <button type="submit" className="button-add-slot">
            {slotToEdit ? 'Update Slot' : 'Add Slot'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManageSlot;
