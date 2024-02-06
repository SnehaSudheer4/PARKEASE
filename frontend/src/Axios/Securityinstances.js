import axios from 'axios';

const securityInstance = axios.create({
  baseURL: 'http://localhost:8000/security',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('securitytoken')}`,
  },
});

export { securityInstance };
