import axios from 'axios';

const API_BASE_URL = 'https://restcountries.com/v3.1';

const ApiService = {
  fetchCountries: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/all`);
      return response.data;
    } catch (error) {
      console.error('Error fetching countries:', error);
      throw error; // You may want to handle errors in a more sophisticated way
    }
  },
};

export default ApiService;
