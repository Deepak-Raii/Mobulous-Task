import { StyleSheet, Text, View } from 'react-native';
import React, { Profiler } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Reels from '../../screens/Reels';
import Profile from '../../screens/Profile';
import Splash from '../../screens/Splash';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Reels" component={Reels} />
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
