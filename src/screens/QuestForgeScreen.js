import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import openAiApi from '../api/openAiApi';
import axios from 'axios';

const QuestForgeScreen = ({ route, navigation }) => {
    const { characterId } = route.params;
    const [character, setCharacter] = useState(null);
    const [scene, setScene] = useState('');
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('Character ID:', characterId);
        const fetchCharacter = async () => {
            if (!characterId) {
                console.error('Character ID is undefined');
                return;
              }
          try {
            const response = await axios.get(`http://localhost:3002/api/characters/${characterId}`);
            setCharacter(response.data);
            // After successfully fetching the character, generate the initial story
            await generateInitialStory(response.data);
          } catch (err) {
            console.error('Error fetching character:', err);
            setError(err);
          } finally {
            setLoading(false);
          }
        };
    
        fetchCharacter();
      }, [characterId]);

    const generateInitialStory = async (character) => {
        if (!character || !character.name) {
            console.error('Character data is not available');
            return;
        }
    };

    useEffect(() => {
        if (character) {
            const initialScene = '';
            const initialChoice = '';
            generateStorySegment(character, initialChoice, initialScene);
        }
    }, [character]);
  
  const generateStorySegment = async (user, userChoice, currentScene) => {
    if (!user || !user.name || !user.age || !user.race || !user.characterClass, !user.gender) {
        throw new Error('Incomplete character data');
    }
    setLoading(true);
    try {
      const storySegment = await openAiApi.generateStorySegment(user, userChoice, currentScene);
      setScene(storySegment.scene);
      setOptions(storySegment.options);
    } catch (error) {
      console.error('Error generating story segment:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = async (option) => {
    try {
      const storySegment = await openAiApi.generateStorySegment(character, option, scene, roll, setLoading);
      setScene(storySegment.scene);
      setOptions(storySegment.options);
    } catch (error) {
      console.error('Error generating story segment:', error);
      setError(error);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.storyText}>{scene}</Text>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.optionButton}
          onPress={() => handleOptionSelect(option)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    storyText: {
        fontSize: 16,
        marginBottom: 20,
    },
    optionButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    optionText: {
        color: 'white',
        textAlign: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    paragraph: {
        fontSize: 16,
    },});



export default QuestForgeScreen;
