// import { companyInstance } from '../Axios/Companyinstance';
import { userInstance } from '../Axios/Userinstances';

export const userSignUp = async (values) => {
  try {
    await userInstance.post('/signup', { ...values });
  } catch (error) {
    console.error('Error signing up:', error.message);
    throw error;
  }
};

export const userLogin =  (values) => {
  console.log(values,'!!!!!');
  return userInstance.post('/login',{...values})
};

export const handleSearch = async (query) => {
  try {
   const response= await userInstance.post('/search', { query: query });
   return response.data;
  } catch (error) {
    console.log('error fetching suggestions:', error);
    return [];
  }
};


export const createReservation =async(ReserveData)=>{
  try {
    console.log('sending reservation data',ReserveData);
    await userInstance.post('/Reservedetails',ReserveData)
  } catch (error) {
    throw error;
  }
}

export const userHeader = () => {
  return userInstance.get('/userheader');
};


export const createPayment=(amount,companyName,Name)=>{
  return userInstance.post('/payment',{amount,companyName,Name})
}

export const getUserReservations = async (userEmail) => {
  try {
    const response = await userInstance(`/reservations/${userEmail}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching reservations:', error);
  }
};

