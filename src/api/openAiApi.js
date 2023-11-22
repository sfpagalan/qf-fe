import axios from 'axios';

const OPEN_AI_URL = process.env.OPENAI_URL;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openAiApi = {
  generateStory: async (characterData, storyPrompt) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    };

    const data = {
      prompt: storyPrompt,
      max_tokens: 200, // Adjust based on your requirement
      // Add other parameters as needed
    };

    try {
      const response = await axios.post(OPEN_AI_URL, data, { headers });
      return response.data.choices[0].text.trim(); // Extracting the story text
    } catch (error) {
      console.error('Error in generating story with OpenAI:', error);
      throw error; // Rethrow the error for handling in the calling component
    }
  },

  generateOptions: async (storySegment) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    };

    const data = {
      prompt: `Given the following story segment:\n\n"${storySegment}"\n\nGenerate three unique choices for the next part of the story:`,
      max_tokens: 100, // Adjust as needed
      n: 1,
      stop: ["\n"]
    };

    try {
      const response = await axios.post(OPEN_AI_URL, data, { headers });
      const choicesText = response.data.choices[0].text.trim();
      return choicesText.split('\n').map(choice => choice.trim()).filter(choice => choice);
    } catch (error) {
      console.error('Error in generating options with OpenAI:', error);
      throw error;
    }
  }
};

export default openAiApi;
