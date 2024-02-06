import React, { useEffect, useState } from 'react';
import {checkInUser,checkOutUser,getSecurityUserList,} from '../../../service/Securityapi';
import Confirmation from './Confirmation';
import { useSelector } from 'react-redux';
import { selectSecurity } from '../../../Features/setSecurity';

const SecurityUserList = () => {
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const loggedInSecurity=useSelector(selectSecurity)

  const fetchSecurityUserList = async (companyName) => {
    try {
      const securityToken = localStorage.getItem('securitytoken');
      console.log('securityToken', securityToken,companyName);
      const response = await getSecurityUserList(companyName);
      console.log(response, '88888888');
      const security = response.data || [];
      setUserList(security);
    } catch (error) {
      console.error('Error fetching user list:', error.message);
    }
  };

  // useEffect(() => {
  //   fetchSecurityUserList(loggedInSecurity.companyName);
  // }, [loggedInSecurity]);
  useEffect(() => {
    if (loggedInSecurity && loggedInSecurity.companyName) {
      fetchSecurityUserList(loggedInSecurity.companyName);
    }
  }, [loggedInSecurity]);
  
  
  const handleCheckInUser = async (userId) => {
    try {
      await checkInUser(userId);
      fetchSecurityUserList(loggedInSecurity.companyName);
    } catch (error) {
      console.error('Error checking in user:', error.message);
    }
  };

  const handleCheckOutUser = (userId, userName, vehicleNumber, vehicleType) => {
    setSelectedUser({ userId, userName, vehicleNumber, vehicleType });
    setShowModal(true);
  };

  const confirmCheckOut = async () => {
    if (selectedUser) {
      try {
        await checkOutUser(selectedUser.userId);
        setUserList((prevUsers) =>
          prevUsers.filter((user) => user._id !== selectedUser.userId)
        );
      } catch (error) {
        console.error('Error checking out user:', error.message);
      }
    }
    setShowModal(false);
  };

  return (
    <div>
      <div className="us">
        <div className="user-container">
          <h2>User List</h2>
          <table border={1} className="table table-striped">
            <thead>
              <tr>
                <th>No</th>
                <th>Username</th>
                <th>phone</th>
                <th>Vehicle no</th>
                <th>Vehicle type</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userList &&
                userList.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.phone}</td>
                    <td>{user.vehicleNumber}</td>
                    <td>{user.vehicleType}</td>
                    <td>{user.arrivingTime}</td>
                    <td>
                      <button
                        onClick={() => handleCheckInUser(user._id)}
                        disabled={user.isCheckedIn}
                        className={`btn btn-sm btn-success ms-2 ${ user.isCheckedIn ? 'dull-color' : '' }`}>
                        Check-In
                      </button>
                      <button
                        onClick={() =>
                          handleCheckOutUser(
                            user._id,
                            user.name,
                            user.vehicleNumber,
                            user.vehicleType
                          )
                        }
                        disabled={!user.isCheckedIn}
                        className={`btn btn-sm btn-warning ms-2 ${!user.isCheckedIn ? 'dull-color' : ''}`}>
                        Check-Out
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedUser && (
        <Confirmation
          show={showModal}
          onHide={() => setShowModal(false)}
          onConfirm={confirmCheckOut}
          userName={selectedUser.userName}
          vehicleNumber={selectedUser.vehicleNumber}
          vehicleType={selectedUser.vehicleType}
        />
      )}
    </div>
  );
};

export default SecurityUserList;
