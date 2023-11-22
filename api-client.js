// Back end Call
// CRUD
// api-client.js
// api-client.js
import axios from 'axios';

export const apiClient = {
  async read() {
    try {
      const response = await axios.get('http://localhost:3000/process.env.REACT_APP_NOTES_URL');
      return response.data;
    } catch (err) {
      throw err;
    }
  },

  async post(URL, data) {
    try {
      const response = await axios.post(URL, data);
      return response.data;
    } catch (err) {
      throw err;
    }
  },

  // ... update and remove methods
};
