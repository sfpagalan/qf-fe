import React from 'react';
import { ScrollView, ImageBackground, Text, StyleSheet } from 'react-native';
import AboutDeveloper from '../components/AboutDeveloper';
import bgImg from '../../assets/bgImg.jpeg';

const currentTeamMembers = [
  {
    name: 'Sydney Mae Pagalan',
    githubLink: 'https://github.com/sfpagalan',
    linkedinLink: 'https://www.linkedin.com/in/sfpagalan/',
    bio: [
      'Navy Vet & Medical Assistant - Software Developer', 
      'Worked at Kaiser Permanente as an MA and served 6 years in the US Navy.',
      'I am deeply passionate about the intersection of the medical field and technology, as well as my love for gaming.',
    ],
  },
  {
    name: 'Samaad Turner',
    githubLink: 'https://github.com/SamaadTurner',
    linkedinLink: 'https://www.linkedin.com/in/samaad-turner/',
    bio: [
      'Recent graduate looking to get a job doing software engineering.',
      'Background in frontend/backend and mobile development with college and bootcamp experience.'
    ],
  },
  {
    name: 'Joshua Shea',
    githubLink: 'https://github.com/jshea44',
    linkedinLink: 'https://www.linkedin.com/in/joshshea44/',
    bio: [
      'Worked as a Security Forces Member in the United States Air Force.',
      'Now wanting to learn the ins and outs of software development.'
    ],
  },
];

const originalTeamMembers = [
  {
    name: 'Anthony Cunningham',
    githubLink: 'https://github.com/jshea44',
    linkedinLink: 'https://www.linkedin.com/in/joshshea44/',
    bio: [
      'Worked as an infantryman in the US Army. Transitioned to cannabis technician and currently pursuing software engineering.',
      'Working towards gaining knowledge in software development.'
    ],  },
  {
    name: 'Chester Lee Coloma',
    githubLink: 'https://github.com/jshea44',
    linkedinLink: 'https://www.linkedin.com/in/joshshea44/',
    bio: [
      'Full-stack Software Developer && Mechanical Engineer',
      'Looking for my first software job.',
      'Complete project from plan to deployment.',
    ],  },
];

const AboutScreen = () => {
  return (
    <ImageBackground 
    source={bgImg}
    style={{flex: 1, justifyContent: 'center', alignItems: 'center', opacity: 0.9}}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.title}>About QuestForge</Text>
        <Text style={styles.subtitle}>Current Team</Text>
        {currentTeamMembers.map((developer, index) => (
          <AboutDeveloper key={index} developer={developer} />
        ))}
        <Text style={styles.subtitle}>Original Team</Text>
        {originalTeamMembers.map((developer, index) => (
          <AboutDeveloper key={index} developer={developer} />
        ))}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: 'gold',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    color: 'gold',
  },
});

export default AboutScreen;
