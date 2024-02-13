import React, { useState, useEffect } from 'react';
import { getSlotsForSecurity } from '../../../service/Securityapi';
import { useSelector } from 'react-redux';
import { selectSecurity } from '../../../Features/setSecurity';
import './viewslot.css';

  const ViewSlot = () => {
  const [slots, setSlots] = useState([]);
  const logginedSecurity = useSelector(selectSecurity);

  const fetchData = async () => {
    try {
      if (!logginedSecurity || !logginedSecurity.companyName) {
        return;
      }
      const data = await getSlotsForSecurity(logginedSecurity.companyName);
      setSlots(data);
    } catch (error) {
      console.error('Error fetching slots:', error);
    }
  };

  useEffect(() => {
    fetchData(logginedSecurity.companyName);
  }, [logginedSecurity]);

  return (
    <div className="view-slot">
      <h2>Slots</h2>
      <table>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Email</th>
            <th>Place</th>
            <th>Two Wheeler</th>
            <th>Four Wheeler</th>
          </tr>
        </thead>
        <tbody>
          {slots.map((slot) => (
            <tr key={slot._id}>
              <td>{slot && slot.companyName}</td>
              <td>{slot && slot.email}</td>
              <td>{slot && slot.place}</td>
              <td>
                {slot && slot.twoWheeler && slot.twoWheeler.booked} /{' '}
                {slot && slot.twoWheeler && slot.twoWheeler.free}
              </td>
              <td>
                {slot && slot.fourWheeler && slot.fourWheeler.booked} /{' '}
                {slot && slot.fourWheeler && slot.fourWheeler.free}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewSlot;
