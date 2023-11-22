import React, { useEffect, useState } from 'react';
import { continueStory, fetchInitialStory } from '../api/Api';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios'; // Assuming axios is used for API calls

const QuestForgeScreen = ({ route, navigation }) => {
    const { storyCharacter, storyId } = route.params;
    const [character, setCharacter] = useState(null);
    const [story, setStory] = useState('');
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    const fetchCharacter = async () => {
        setLoading(true);
        setError(null);
        try {
            const characterId = '655dba84803455322745f7af';
            const response = await axios.get(`http://localhost:3002/api/characters/${characterId}`);
            setCharacter(response.data);
        } catch (error) {
            console.error('Error fetching character:', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCharacter();
    }, []);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error loading character</Text>;
    }

    // Fetch initial story and options
    useEffect(() => {
        fetchInitialStory(storyId, storyCharacter)
            .then(({ initialStory, initialOptions }) => {
                setStory(initialStory);
                setOptions(initialOptions);
            })
            .catch(error => {
                console.error('Error fetching initial story:', error);
                setStory('An unexpected error occurred in your adventure...');
            });
    }, [storyId, storyCharacter]);

    // const fetchInitialStory = async (characterData, storyId) => {
    //     try {
    //         // Replace this URL with your API endpoint
    //         const response = await axios.post(`http://localhost:19007/api/stories/${storyId}`, { character: characterData });
    //         setStory(response.data.story);
    //         setOptions(response.data.options);
    //     } catch (error) {
    //         console.error('Error fetching story:', error);
    //         setStory('An unexpected error occurred in your adventure...');
    //     }
    // };

    const handleOptionSelect = async (selectedOption) => {
        try {
            // Make a POST request to continue the story
            const { updatedStory, newOptions } = await continueStory(storyId, character, selectedOption);

            // Update state with the new story segment and options
            setStory(prevStory => prevStory + '\n\n' + updatedStory);
            setOptions(newOptions);
        } catch (error) {
            console.error('Error processing option:', error);
            // Handle the error (e.g., show an alert or a message to the user)
        }
    };
    
    return (
        <View contentContainerStyle={styles.container}>
            <Text style={styles.header}>Character Name: {character.name}</Text>
            <Text style={styles.paragraph}>Character ID: {character._id}</Text>
            <Text style={styles.storyText}>{story}</Text>
            {options.map((option, index) => (
                <TouchableOpacity 
                    key={index} 
                    style={styles.optionButton} 
                    onPress={() => handleOptionSelect(option)}
                >
                    <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
            ))}
        </View>
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
