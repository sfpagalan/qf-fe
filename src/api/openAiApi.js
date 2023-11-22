import axios from 'axios';

const OPENAI_URL = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const generateRequestBody = (userChoice) => {
  let requestBody = {
    roll: false,
    userChoice: null,
  };

  if (userChoice) {
    const keywords = ['help', 'rest', 'heal', 'aid', 'recover'];

    if (keywords.some((keyword) => userChoice.includes(keyword))) {
      requestBody.roll = true;
    } else {
      requestBody.userChoice = userChoice;
    }
  }

  return requestBody;
};

const openAiApi = {
    generateStorySegment: async (user, userChoice, scene, roll, setLoading) => {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      };
  
      if (!user || !user.name || !user.age || !user.race || !user.characterClass || !user.gender) {
        throw new Error('Incomplete character data');
      }
  
    //   setLoading(true);
      try {
        // Create the request body using generateRequestBody
        const requestBody = generateRequestBody(userChoice);
  
        const data = {
          messages: [
            {
              role: 'user',
              content: `An adventurer named ${user.name}, a ${user.age}-year-old ${user.race} ${user.characterClass}, in a previous scene of ${scene}. After this scene, the character named ${user.name} picks: ${userChoice}. Your response will be in a JSON object with the following properties. First, user object with properties name, age, race, characterClass. Second, string named 'scene' that explains what happens next in 2 or 3 sentences referencing ${userChoice}. Third, array named 'options' that generates 4 options/elements in 4 words or less where each option is an action that the user can choose next.`,
            },
            {
              role: 'user',
              content: `Your response will be in a JSON object with the following properties. First, user object with properties ${user.name}, ${user.age}, ${user.race}, and ${user.characterClass}. Second, string named 'deathScene' that explains how the user dies based on ${user.name}'s actions: ${userChoice}. This deathScene will be at most 2 sentences that will kill the character. Reference scene: ${scene} on how to build the death scene. Third, string named 'roll' with value ${roll}`,
            },
          ],
          model: 'gpt-3.5-turbo',
          ...requestBody,
        };

        console.log('Request URL:', OPENAI_URL);

        const response = await axios.post(OPENAI_URL, data, { headers });
        const jsonResponse = response.data.choices[0].text.trim();
        return JSON.parse(jsonResponse); // Parse the JSON response
      } catch (error) {
        console.error('Error in generating story segment with OpenAI:', error);
        throw error;
      } finally {
        // setLoading(false);
      }
    },
  };
  
    export default openAiApi;