import axios from 'axios';

const adminInstance= axios.create({
    baseURL:'http://localhost:8000/admin',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
    },
  
})

export {adminInstance};