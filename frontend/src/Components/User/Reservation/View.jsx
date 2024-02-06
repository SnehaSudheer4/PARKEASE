import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../Features/setUser';
import { getUserReservations } from '../../../service/Userapi';
import './view.css';

const View = () => {
  const [userReservations, setUserReservations] = useState([]);
  const loggedInUser = useSelector(selectUser);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        if (loggedInUser) {
          const reservations = await getUserReservations(loggedInUser.email);
          setUserReservations(reservations);
        }
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };
    fetchReservations();
  }, [loggedInUser]);

  return (
    <div className="view-container">
      <h2>Your Reservations</h2>
      <table className="view-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Vehicle Number</th>
            <th>Vehicle Type</th>
            <th>Arriving Time</th>
            <th>Checked In</th>
          </tr>
        </thead>
        <tbody>
          {userReservations.map((reservation) => (
            <tr key={reservation._id}>
              <td>{reservation.name}</td>
              <td>{reservation.companyName}</td>
              <td>{reservation.email}</td>
              <td>{reservation.phone}</td>
              <td>{reservation.date}</td>
              <td>{reservation.vehicleNumber}</td>
              <td>{reservation.vehicleType}</td>
              <td>{reservation.arrivingTime}</td>
              <td>{reservation.isCheckedIn ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default View;
