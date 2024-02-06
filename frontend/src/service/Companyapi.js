import { companyInstance } from "../Axios/Companyinstance";

export const securitySignUp= async(securityData)=>{
    try {
       console.log('sending security data:',securityData);
       await companyInstance.post('/securityRegister',securityData) 
    } catch (error) {
        throw error;
    }
}

// export const companyLogin=async(companyData)=>{
//     try {
//   const response= await companyInstance.post('/companyLogin',companyData)
//   console.log('Response:', response);
//   return response.data;
//     } catch (error) {
//         throw error;
//     }
// }
export const companyLogin=(values)=>{
  console.log('*****',values);
  return companyInstance.post('/companylogin',{...values})
}

// export const getSecurityList = async () => {
//     try {
//    const response= await companyInstance.get('/securitylist')
//    return response.data
//     } catch (error) {
//       throw error;
//     }
//   };

export const getSecurityList = async (companyName) => {
  try {
    const response = await companyInstance.get(`/securitylist/${companyName}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching security list:', error);
  }
};

  export const createSlot = async (slotData) => {
    try {
      const response = await companyInstance.post('/createSlot', slotData);
      return response.data;
    } catch (error) {
      console.error('Error creating slot:', error);
      throw error; 
    }
  };
  
  // export const getSlots = async () => {
  //   try {
  //     const response = await companyInstance.get(`/getSlots`);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error fetching slots:', error);
  //     throw error; 
  //   }
  // };
  
  export const updateSlot = async (slotId, updatedSlotData) => {
    try {
      const response = await companyInstance.put(`/slots/${slotId}`, updatedSlotData);
      return response.data;
    } catch (error) {
      console.error('Error updating slot:', error);
      throw error; 
    }
  };
  
  export const deleteSlot = async (slotId) => {
    try {
      const response = await companyInstance.delete(`/deleteSlot/${slotId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting slot:', error);
      throw error;
    }
  };
  
  export const getCompanySlot = async (userEmail) => {
    try {
      const response = await companyInstance(`/slots/${userEmail}`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching reservations:', error);
    }
  };
  
  
  export const companyHeader=()=>{
    return companyInstance.get('/companyheader')
  }