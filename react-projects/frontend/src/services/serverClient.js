import axios from 'axios';

const serverClient = axios.create({
  baseURL: 'http://localhost:3000/api', 
});

export default serverClient;