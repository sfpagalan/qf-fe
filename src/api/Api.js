import axios from 'axios';

const API_URL = 'http://localhost:3002/api';

export const createCharacter = async (characterData) => {
    try {
      const response = await axios.post(`${API_URL}/characters`, characterData);
      return response.data;
    } catch (error) {
      console.error('Error creating character:', error);
      throw error;
    }
  };
