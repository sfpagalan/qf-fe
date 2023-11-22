import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import joshImage from '../../assets/josh.png';
import samaadImage from '../../assets/samaad.png';
import sydneyImage from '../../assets/sydney.png';
import anthonyImage from '../../assets/anthony.png';
import chesterImage from '../../assets/chester.png';

const imageMap = {
  'Sydney Mae Pagalan': sydneyImage,
  'Samaad Turner': samaadImage,
  'Joshua Shea': joshImage,
  'Anthony Cunningham': anthonyImage,
  'Chester Lee Coloma': chesterImage,
};

const AboutDeveloper = ({ developer }) => {
  return (
    <View style={styles.container}>
      <Image source={imageMap[developer.name]} style={styles.image} />
      <Text style={styles.name}>{developer.name}</Text>
      {developer.bio.map((line, index) => (
        <Text key={index} style={styles.bio}>{line}</Text>
      ))}
      <TouchableOpacity onPress={() => Linking.openURL(developer.linkedinLink)}>
        <Text style={styles.link}>LinkedIn</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'gold',
  },
  bio: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 5,
    color: 'gold',
  },
  link: {
    color: 'gold',
    textDecorationLine: 'none',
  },
});

export default AboutDeveloper;
