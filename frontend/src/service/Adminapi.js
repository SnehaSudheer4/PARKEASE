import { adminInstance } from '../Axios/Admininstances';


export const getAdminUserList = async () => {
  try {
    const response = await adminInstance.get('/userlist');
    return response.data; 
  } catch (error) {
    throw error;
  }
};


export const blockUser = async (userId) => {
  try {
    await adminInstance.put(`/block/${userId}`);
  } catch (error) {
    throw error;
  }
};

export const unblockUser = async (userId) => {
  try {
    await adminInstance.put(`/unblock/${userId}`);
  } catch (error) {
    throw error;
  }
};

export const companySignUp = async (companyData) => {
  try {
    console.log('Sending company data:', companyData);
    await adminInstance.post('/companyRegister', companyData);
  } catch (error) {
  
  }
};

export const getAdminCompanyList = async () => {
  try {
   const response= await adminInstance.get('/companylist');
   return response.data; 
  } catch (error) {
    throw error;
  }
};

export const blockCompany = async (companyId) => {
  try {
    await adminInstance.put(`/block/${companyId}`);
  } catch (error) {
    throw error;
  }
};

export const unblockCompany = async (companyId) => {
  try {
    await adminInstance.put(`/unblock/${companyId}`);
  } catch (error) {
    throw error;
  }
};

export const adminLogin = (values) =>{
  console.log(values,'@@@')
  return adminInstance.post('/adminlogin',{...values})
}

export const adminHeader=()=>{
  return adminInstance.get('/adminheader')
}