import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { createCharacter } from '../api/Api';
import bgImg from '../../assets/bgImg.jpeg';
// import { v4 as uuidv4 } from 'uuid';

const testData = {
    name: 'TestName',
    age: '25',
    gender: 'Male',
    race: 'Human',
    characterClass: 'Barbarian'
  };

const CreateCharacterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [race, setRace] = useState('Human');
  const [characterClass, setCharacterClass] = useState('Barbarian');

    // Add the debugMode state
    const [debugMode, setDebugMode] = useState(false);

    // The useEffect hook for auto-filling the form
    useEffect(() => {
      if (debugMode) {
        setName(testData.name);
        setAge(testData.age);
        setGender(testData.gender);
        setRace(testData.race);
        setCharacterClass(testData.characterClass);
      }
    }, [debugMode]);

  const ageLimits = {
    Human: 100,
    Elf: 750,
    Aasimar: 160,
    Halflings: 150,
    Dragonborn: 80,
    Fairy: 5000,
    Siren: 500,
    Kitsune: 1000,
    Djinn: 5000,
    Angel: 5000,
    Demon: 5000,
    Vampire: 5000,
    Summoner: 100,
    Tiefling: 150,
    Warforged: Infinity,
    Rakshasa: 5000,
    Elemental: 5000
  };

  const getAgeLimit = (selectedRace) => {
    return ageLimits[selectedRace] || ageLimits['Human']; 
  };

  const [ageLimit, setAgeLimit] = useState(getAgeLimit(race));

  const handleRaceChange = (selectedRace) => {
    setRace(selectedRace);
    const newAgeLimit = getAgeLimit(selectedRace);
    setAgeLimit(newAgeLimit);
    if (parseInt(age, 10) > newAgeLimit) {
      setAge('');
    }
  };

  const classes = ['Barbarian', 'Mage', 'Archmage', 'Warrior', 'Archer'];

  const handleCreateCharacter = async () => {
    if (!name.trim() || !age) {
      alert("Please fill in all character details.");
      return;
    }
  
    const newCharacter = {
        // id: uuidv4(),
        name: name,
        age: age,
        race: race,
        characterClass: characterClass,
        gender: gender,
      };
  
      try {
        const characterId = await createCharacter(newCharacter);
        if (characterId) {
          navigation.navigate('QuestForge', { characterId: characterId });
        } else {
          console.error('Character ID not received');
          alert('Failed to create character');
        }
      } catch (error) {
        console.error('Error creating character:', error);
        alert('Failed to create character');
      }
  };

  return (
    <ImageBackground 
      source={bgImg}
      style={styles.background}
    > 
      <TouchableOpacity
        style={styles.button}
        onPress={() => setDebugMode(!debugMode)}
      >
        <Text style={styles.buttonText}>Toggle Debug Mode</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Type your character name"
        value={name}
        onChangeText={setName}
      />

      <RNPickerSelect
        style={pickerSelectStyles}
        placeholder={{ label: 'Select Age', value: '' }}
        onValueChange={setAge}
        items={[...Array(ageLimit + 1).keys()].map(ageNumber => ({ label: ageNumber.toString(), value: ageNumber }))}
      />
      <RNPickerSelect
        style={pickerSelectStyles}
        placeholder={{ label: 'Select Gender', value: '' }}
        onValueChange={(itemValue) => setGender(itemValue)}
        items={[
          { label: 'Male', value: 'Male' },
          { label: 'Female', value: 'Female' },
          { label: 'Shapeshifter', value: 'Shapeshifter' },
          { label: 'Elfritch', value: 'Elfritch' },
          { label: 'Primordial', value: 'Primordial' },
          { label: 'Numinous', value: 'Numinous' },
          { label: 'Transcendent', value: 'Transcendent' },
        ]}
      />
      <RNPickerSelect
        style={pickerSelectStyles}
        placeholder={{ label: 'Select Race', value: '' }}
        onValueChange={handleRaceChange}
        items={[
          { label: 'Human', value: 'Human' },
          { label: 'Elf', value: 'Elf' },
          { label: 'Aasimar', value: 'Aasimar' },
          { label: 'Halflings', value: 'Halflings' },
          { label: 'Dragonborn', value: 'Dragonborn' },
          { label: 'Fairy', value: 'Fairy' },
        ]}
      />
      <RNPickerSelect
        style={pickerSelectStyles}
        placeholder={{ label: 'Select Class', value: '' }}
        onValueChange={(itemValue) => setCharacterClass(itemValue)}
        items={classes.map(cls => ({ label: cls, value: cls }))}
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateCharacter}>
        <Text style={styles.buttonText}>Create Character</Text>
      </TouchableOpacity>    
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000',
    },
    input: {
      height: 50,
      borderColor: 'gold',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 15,
      paddingHorizontal: 15,
      fontSize: 16,
      color: 'gold',
      backgroundColor: '#000',
    },
    button: {
      backgroundColor: 'gold',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 15,
    },
    buttonText: {
      color: '#000',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  
  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      height: 50,
      borderColor: 'gold',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 15,
      paddingHorizontal: 15,
      fontSize: 16,
      backgroundColor: '#000',
      color: 'gold',
    },
    inputAndroid: {
      height: 50,
      borderColor: 'gold',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 15,
      paddingHorizontal: 15,
      fontSize: 16,
      backgroundColor: '#000',
      color : 'gold',
    },
  });
  
  export default CreateCharacterScreen;
  
