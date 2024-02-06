import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCompany } from '../../../Features/setCompany';
import { getSecurityList } from '../../../service/Companyapi';

const SecurityList = () => {
  const [security, setSecurity] = useState([]);
  const loggedInCompany = useSelector(selectCompany);

  const fetchSecurityList = async (companyName) => {
    try {
      const response = await getSecurityList(companyName);
      const securities = response.securities || [];
      setSecurity(securities);
    } catch (error) {
      console.error('Error fetching security list:', error.message);
    }
  };

  useEffect(() => {
    if (loggedInCompany && loggedInCompany.companyName) {
      fetchSecurityList(loggedInCompany.companyName);
    }
  }, [loggedInCompany]);
  

  return (
    <div>
      <div className="cs">
        <div className="container">
          <h2>Security List</h2>
          <table border={1} className="table table-striped">
            <thead>
              <tr>
                <th>No</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {security.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SecurityList;
