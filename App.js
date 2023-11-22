import 'react-native-get-random-values';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { ThemeProvider } from './src/utils/ThemeContext';
import HomeScreen from './src/screens/HomeScreen';
import StartGameScreen from './src/screens/StartGameScreen';
// import LoadGameScreen from './src/screens/LoadGameScreen';
// import SettingsScreen from './src/screens/SettingsScreen';
import AboutScreen from './src/screens/AboutScreen';
import QuestForgeScreen from './src/screens/QuestForgeScreen';
import CreateCharacterScreen from './src/screens/CreateCharacterScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="QuestForge" component={QuestForgeScreen} />
          <Stack.Screen name="StartGame" component={StartGameScreen} />
          {/* <Stack.Screen name="LoadGame" component={LoadGameScreen} /> */}
          {/* <Stack.Screen name="Settings" component={SettingsScreen} /> */}
          <Stack.Screen name="About" component={AboutScreen} />
          <Stack.Screen name="CreateCharacter" component={CreateCharacterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;