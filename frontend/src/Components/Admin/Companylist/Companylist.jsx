import React, { useEffect, useState } from 'react';
import {  getAdminCompanyList } from '../../../service/Adminapi';
// import AdminNav from '../AdminNavbar/AdminNav';
import './companylist.css';

const Companylist = () => {
    const [companyList, setCompanyList] = useState([]);
  const fetchCompanyList = async () => {
    try {
      const response = await getAdminCompanyList();
      const companies = response.companies || [];
      setCompanyList(companies);
    } catch (error) {
      console.error('Error fetching user list:', error.message);
    }
  };

  useEffect(() => {
    fetchCompanyList();
  }, []);

  // const handleBlockCompany = async (companyId) => {
  //   try {
  //     await blockCompany(companyId);
  //     fetchCompanyList();
  //   } catch (error) {
  //     console.error('Error blocking user:', error.message);
  //   }
  // };

  // const handleUnblockCompany = async (companyId) => {
  //   try {
  //     await unblockCompany(companyId);
  //     fetchCompanyList();
  //   } catch (error) {
  //     console.error('Error unblocking user:', error.message);
  //   }
  // };
  return (
    <div>
      
      <div className='cs'>
      <div className='company-container'>
        <h2>Company List</h2>
     
      <table border={1} className='table table-striped'>
        <thead>  
          <tr>
            <th>No</th>
            <th>Email</th>
            <th>Username</th>
            <th>place</th>
            <th>phone</th>
            {/* <th>Action</th> */}
          
          </tr>
        </thead>
        <tbody>
          {companyList.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.email}</td>
              <td>{user.companyName}</td>
              <td>{user.place}</td>
              <td>{user.phone}</td>
              <td>
              {/* <button onClick={() => handleBlockCompany(user._id)} disabled={user.isBlocked} className='btn btn-sm btn-danger ms-2'>
                  Block
                </button>
                <button onClick={() => handleUnblockCompany(user._id)} disabled={!user.isBlocked}  className='btn btn-sm btn-primary ms-2'>
                  Unblock
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </div>
  );
}

export default Companylist;
