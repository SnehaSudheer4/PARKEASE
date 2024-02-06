
import { securityInstance } from '../Axios/Securityinstances';

export const securityLogin = async (Values) => {
    console.log(Values,"******");
  return  securityInstance.post('/securitylogin', {...Values});
};

export const getSecurityUserList = async (companyName) => {
  try {
    const response = await securityInstance.get(`/Securityuserlist/${companyName}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSlotsForSecurity=async(companyName)=>{
  try {
    const response = await securityInstance.get(`/securityslot/${companyName}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const addUserReservation = async (addData) => {
  try {
    console.log('sending reservation data', addData);
    const response = await securityInstance.post('/addReservedetails', addData);
    console.log('Response from server:', response.data);
    return response.data; 
  } catch (error) {
    console.error('Error sending reservation data:', error.message);
    throw error; 
  }
};

export const searchUser= async(query)=>{
  try {
    const response = await securityInstance.post('/usersearch',{query:query})
    return response.data;
  } catch (error) {
    console.log('error fetching suggestions:', error);
    return [];
    
  }
}


export const checkInUser = async (userId) => {
  try {
    const response = await securityInstance.post(`/checkin/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const checkOutUser = async (userId) => {
  try {
    const response = await securityInstance.post(`/checkout/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const securityHeader=()=>{
  return securityInstance.get('/securityheader')
}