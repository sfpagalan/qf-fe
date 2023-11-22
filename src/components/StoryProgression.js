import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
// import PropTypes from 'prop-types';

const StoryProgression = ({ initialStory }) => {
  const [story, setStory] = useState(initialStory);
  const [choices, setChoices] = useState([]);
  const [currentSegment, setCurrentSegment] = useState(0);

  // Function to generate choices
  const generateChoices = async (storySegment) => {
    const prompt = `Given the following story segment:\n\n"${storySegment}"\n\nGenerate three unique choices for the reader to decide what happens next:`;
    try {
      const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
        prompt,
        max_tokens: 100,
        n: 1,
        stop: ["\n"],
        temperature: 0.7
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        }
      });

      if (response.data.choices && response.data.choices.length > 0) {
        const choicesText = response.data.choices[0].text.trim();
        const generatedChoices = choicesText.split('\n').map(choice => choice.trim()).filter(choice => choice);
        if (generatedChoices.length > 0) {
          return generatedChoices;
        } else {
          throw new Error("No choices were generated");
        }
      } else {
        throw new Error("Invalid response structure from OpenAI");
      }
    } catch (error) {
      console.error('Error when generating choices with OpenAI:', error);
      return ['An enigma prevents choice...'];
    }
  };

//   useEffect(() => {
//     const fetchInitialChoices = async () => {
//       if (initialStory.length > 0) {
//         const initialChoices = await generateChoices(initialStory[0]);
//         setChoices(initialChoices);
//       }
//     };
//     fetchInitialChoices();
//   }, [initialStory]);

  // Function to fetch the next story segment
  const fetchNextStorySegment = async (userChoice) => {
    const prompt = `Given that the character's last action was '${userChoice}', what would be a compelling continuation of their story?`;

    const data = {
      prompt,
      max_tokens: 150
    };

    try {
      const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        }
      });

      
      const newStorySegment = response.data.choices[0].text.trim();
      setStory((prevStory) => [...prevStory, newStorySegment]);
      setCurrentSegment((prevSegment) => prevSegment + 1);
  
      const newChoices = await generateChoices(newStorySegment);
      setChoices(newChoices);
    } catch (error) {
      console.error('The plot thickens, yet an error has emerged: ', error);
    }
  };

  // Function to handle choice selection
  const handleChoiceSelection = (choice) => {
    fetchNextStorySegment(choice);
  };

  // useEffect to fetch initial choices
  useEffect(() => {
    const fetchInitialChoices = async () => {
      if (initialStory.length > 0) {
        const initialChoices = await generateChoices(initialStory[0]);
        setChoices(initialChoices);
      }
    };
    fetchInitialChoices();
  }, [initialStory]);

  return (
    <View style={styles.container}>
      {story.map((segment, index) => (
        <Text key={index} style={styles.segment}>{segment}</Text>
      ))}
      {currentSegment === story.length - 1 && choices.length > 0 && (
        <View style={styles.choicesContainer}>
          {choices.map((choice, index) => (
            <TouchableOpacity key={index} style={styles.choiceButton} onPress={() => handleChoiceSelection(choice)}>
              <Text style={styles.choiceText}>{choice}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

// StoryProgression.propTypes = {
//   initialStory: PropTypes.array.isRequired
// };

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  segment: {
    fontSize: 16,
    marginBottom: 10,
  },
  choicesContainer: {
    marginTop: 20,
  },
  choiceButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  choiceText: {
    color: 'white',
    textAlign: 'center',
  },
  // Add additional styles as needed
});

export default StoryProgression;
