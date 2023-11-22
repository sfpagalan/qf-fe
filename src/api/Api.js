import axios from 'axios';

// const API_URL = 'https://questforgebackend-itdm.onrender.com';
// const API_URL = process.env.API_URL;
const API_URL = 'http://localhost:3002';

export const createCharacter = async (characterData) => {
  try {
    const response = await axios.post(`${API_URL}/characters`, characterData);
    return response.data._id; // Assuming the ID is in response.data._id
  } catch (error) {
    console.error('Error creating character:', error);
    throw error;
  }
};


export const fetchCharacter = async (characterId) => {
    try {
        const response = await axios.get(`${API_URL}/character/:characterId`, characterId);
        return response.data;
    } catch (error) {
        console.error('Error fetching character:', error);
        throw error;
    }
};
