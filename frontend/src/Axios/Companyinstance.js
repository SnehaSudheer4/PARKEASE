import axios from 'axios';

const companyInstance= axios.create({
    baseURL:'http://localhost:8000/company',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('companyToken')}`,
      },
})

export {companyInstance};