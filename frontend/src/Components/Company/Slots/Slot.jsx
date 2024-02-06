import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCompany } from '../../../Features/setCompany';
import {
  getCompanySlot,
  deleteSlot,
  updateSlot,
} from '../../../service/Companyapi';
import './slot.css';

const CompanySlots = () => {
  const [slots, setSlots] = useState([]);
  const [editableSlot, setEditableSlot] = useState(null);
  const loggedInUser = useSelector(selectCompany);

  const fetchCompanySlots = async () => {
    try {
      if (loggedInUser) {
        const slotsData = await getCompanySlot(loggedInUser.email);
        setSlots(slotsData);
      }
    } catch (error) {
      console.error('Error fetching company slots:', error);
    }
  };
  useEffect(() => {
    fetchCompanySlots();
  }, [loggedInUser]);
  const handleEditSlot = (slot) => {
    setEditableSlot(slot);
  };
  const handleCancelEdit = () => {
    setEditableSlot(null);
  };

  const handleUpdateSlot = async (slotId, updatedSlotData) => {
    try {
      await updateSlot(slotId, updatedSlotData);
      console.log('Slot updated successfully');
      fetchCompanySlots();
      setEditableSlot(null);
    } catch (error) {
      console.error('Error updating slot:', error);
    }
  };

  const handleDeleteSlot = async (slotId) => {
    try {
      await deleteSlot(slotId);
      console.log('Slot deleted successfully');
      fetchCompanySlots();
    } catch (error) {
      console.error('Error deleting slot:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const updatedSlotData = {
      twoWheeler: {
        free: parseInt(formData.get('twoWheelerFree'), 10),
      },
      fourWheeler: {
        free: parseInt(formData.get('fourWheelerFree'), 10),
      },
    };
    handleUpdateSlot(editableSlot._id, updatedSlotData);
  };

  return (
    <div>
      <h2>Company Slots</h2>
      <div className="company-slots-container">
        {slots.map((slot, index) => (
          <div key={index} className="slot-item">
            {editableSlot && editableSlot._id === slot._id ? (
              <form onSubmit={handleSubmit}>
                <p>Company Name: {slot.companyName}</p>
                <p>Place: {slot.place}</p>
                <div className="form-group">
                  <label>
                    Two-Wheeler Free:
                    <input
                      type="number"
                      name="twoWheelerFree"
                      defaultValue={slot.twoWheeler.free}
                    />
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    Four-Wheeler Free:
                    <input
                      type="number"
                      name="fourWheelerFree"
                      defaultValue={slot.fourWheeler.free}
                    />
                  </label>
                </div>
                <div className="slot-buttons">
                  <button type="submit" className="update-button">
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="cancel-button">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <p>Company Name: {slot.companyName}</p>
                <p>Place: {slot.place}</p>
                <p>Two-Wheeler Free: {slot.twoWheeler.free}</p>
                <p>Four-Wheeler Free: {slot.fourWheeler.free}</p>
                <div className="slot-buttons">
                  <button
                    onClick={() => handleEditSlot(slot)}
                    className="edit-button">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteSlot(slot._id)}
                    className="delete-button">
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanySlots;
