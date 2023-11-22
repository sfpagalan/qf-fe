import axios from 'axios';

// const API_URL = 'https://questforgebackend-itdm.onrender.com/api';
const API_URL = process.env.API_URL = API_URL;

export const createCharacter = async (characterData) => {
    try {
      const response = await axios.post(`${API_URL}/characters`, characterData);
      const characterId = response.data._id;
      return characterId;
    } catch (error) {
      console.error('Error creating character:', error);
      throw error;
    }
};

export const fetchCharacter = async (characterId) => {
    try {
        const response = await axios.get(`${API_URL}/characters/${characterId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching character:', error);
        throw error;
    }
};

//   export const continueStory = async (storyId, character, selectedOption) => {
//     try {
//         // Construct the request payload
//         const payload = {
//             character: character,
//             selectedOption: selectedOption,
//         };

//         // Make a POST request to the backend API endpoint
//         const response = await axios.post(`${API_URL}/story/${storyId}/continue`, payload);

//         // Assuming the response contains the next part of the story and new options
//         const updatedStory = response.data.updatedStory;
//         const newOptions = response.data.newOptions;

//         return { updatedStory, newOptions };
//     } catch (error) {
//         console.error('Error continuing the story:', error);
//         throw error;
//     }
// };

// export const fetchInitialStory = async (storyId, characterData) => {
//     try {
//         // Construct the request payload
//         const payload = {
//             character: characterData,
//         };

//         // Make a POST request to the backend API endpoint with the storyId
//         const response = await axios.post(`${API_URL}/stories/${characterObjectId}`, payload);

//         // Assuming the response contains the initial story and options
//         const initialStory = response.data.story;
//         const initialOptions = response.data.options;

//         return { initialStory, initialOptions };
//     } catch (error) {
//         console.error('Error fetching initial story:', error);
//         throw error;
//     }
// };

