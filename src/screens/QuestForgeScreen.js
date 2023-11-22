import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios'; // Assuming axios is used for API calls

const QuestForgeScreen = ({ route, navigation }) => {
    const { character } = route.params;
    const [story, setStory] = useState('');
    const [options, setOptions] = useState([]);

    // Fetch initial story and options
    useEffect(() => {
        fetchInitialStory(character);
    }, [character]);

    const fetchInitialStory = async (characterData, storyId) => {
        try {
            // Replace this URL with your API endpoint
            const response = await axios.post(`http://localhost:19007/api/stories/${storyId}`, { character: characterData });
            setStory(response.data.story);
            setOptions(response.data.options);
        } catch (error) {
            console.error('Error fetching story:', error);
            setStory('An unexpected error occurred in your adventure...');
        }
    };

    const handleOptionSelect = async (selectedOption) => {
        try {
            // Construct the request payload. This structure depends on your backend/API expectation.
            const payload = {
                character: character, // Assuming 'character' is available in your component's scope
                selectedOption: selectedOption
            };
    
            // Replace this URL with your API endpoint
            const response = await axios.post('/:storyId/continue', payload);
    
            // Assuming the response contains the next part of the story and new options
            const updatedStory = response.data.updatedStory;
            const newOptions = response.data.newOptions;
    
            // Update state with the new story segment and options
            setStory(prevStory => prevStory + '\n\n' + updatedStory);
            setOptions(newOptions);
        } catch (error) {
            console.error('Error processing option:', error);
            // Handle the error (e.g., show an alert or a message to the user)
        }
    };
    

    return (
        <ScrollView contentContainerStyle={styles.container}>
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
    // Additional styles
});

export default QuestForgeScreen;
