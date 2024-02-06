import React, { useState, useEffect } from 'react';
import {blockUser,getAdminUserList,unblockUser} from '../../../service/Adminapi';
import './userlist.css';

const Userlist = () => {
  const [userList, setUserList] = useState([]);

  const fetchUserList = async () => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      console.log('Admin Token:', adminToken);
      localStorage.setItem('adminToken', adminToken);
      const response = await getAdminUserList();
      console.log(response, '88888888');
      const users = response.data || [];
      setUserList(users);
    } catch (error) {
      console.error('Error fetching user list:', error.message);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  const handleBlockUser = async (userId) => {
    try {
      await blockUser(userId);
      fetchUserList();
    } catch (error) {
      console.error('Error blocking user:', error.message);
    }
  };

  const handleUnblockUser = async (userId) => {
    try {
      await unblockUser(userId);
      fetchUserList();
    } catch (error) {
      console.error('Error unblocking user:', error.message);
    }
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
                <th>Email</th>
                <th>Username</th>
                <th>phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.email}</td>
                  <td>{user.username}</td>
                  <td>{user.phoneNumber}</td>
                  <td>
                    <button
                      onClick={() => handleBlockUser(user._id)}
                      disabled={user.isBlocked}
                      className="btn btn-sm btn-danger ms-2">
                      Block
                    </button>
                    <button
                      onClick={() => handleUnblockUser(user._id)}
                      disabled={!user.isBlocked}
                      className="btn btn-sm btn-primary ms-2">
                      Unblock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Userlist;
