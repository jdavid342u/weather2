// app/index.tsx
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './navigation/AuthNavigator';

export default function Index() {
  return (
    <AuthProvider>
        <AuthNavigator />
    </AuthProvider>
  );
}
