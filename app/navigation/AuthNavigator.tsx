// app/navigation/AuthNavigator.tsx
import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import AppNavigator from './AppNavigator';
import { AuthContext } from '../context/AuthContext';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createStackNavigator();

export default function AuthNavigator() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="App" component={AppNavigator} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      {/* {isAuthenticated ? (
        <Stack.Screen name="App" component={AppNavigator} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )} */}
      
    </Stack.Navigator>
  );
}
