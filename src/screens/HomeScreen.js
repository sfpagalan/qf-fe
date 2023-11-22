import React from 'react';
import { View, ImageBackground, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import HomeImg from '../../assets/HomeImg.png';
import bgImg from '../../assets/bgImg.jpeg';

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground 
      source={bgImg}
      style={{flex: 1, justifyContent: 'center', alignItems: 'center', opacity: 0.9}}
    >
      <Text style={styles.title}>Welcome to QuestForge</Text>
      <Image
          style={styles.homeimg}
          source={HomeImg}
        />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('StartGame')} >
        <Text style={styles.buttonText}>Start Game</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoadGame')} >
        <Text style={styles.buttonText}>Load Game</Text>
      </TouchableOpacity>   */}
      {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')} >
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('About')} >
        <Text style={styles.buttonText}>About</Text>
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
    fontSize: 30,
    marginBottom: 10,
    color: 'gold',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'gold',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    width: '50%',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  homeimg: {
    width: 400,
    height: 500,
    borderRadius: 20,
    marginBottom: 10,
  },
});

export default HomeScreen;
