import React from 'react';
import { View, ImageBackground, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import StartImg from '../../assets/StartImg2.png';
import bgImg from '../../assets/bgImg.jpeg';

const StartGameScreen = ({ navigation }) => {
    const handleStartNewGame = () => {
    //   navigation.navigate('QuestForge', { newGame: true });
    navigation.navigate('CreateCharacter');
    };
  
    const handleLoadGame = () => {
      navigation.navigate('LoadGame');
    };
  
    return (
      <ImageBackground 
      source={bgImg}
      style={{flex: 1, justifyContent: 'center', alignItems: 'center', opacity: 0.9}}
      >
        <Text style={styles.title}>Start a New Game</Text>
        <Image
          style={styles.startimg}
          source={StartImg}
        />
        <TouchableOpacity style={styles.button} onPress={handleStartNewGame} >
        <Text style={styles.buttonText}>Create New Character</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLoadGame} >
        <Text style={styles.buttonText}>Load Existing Character</Text>
      </TouchableOpacity>
      </ImageBackground>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: 'gold',
    fontWeight: 'bold',
  },
  startimg: {
    width: 400,
    height: 500,
    borderRadius: 20,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'gold',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    width: '70%',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StartGameScreen;
