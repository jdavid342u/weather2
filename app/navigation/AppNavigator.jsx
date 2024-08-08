// app/navigation/AppNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from '../screens/MainScreen';
import LocationsScreen from '../screens/LocationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function AppNavigator({route}) {
  if(route){
    const {username, email} = route.params;
  }

  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Main') {
            iconName = 'home';
          } else if (route.name === 'Locations') {
            iconName = 'search';
          } else if (route.name === 'Profile') {
            iconName = 'settings';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarLabel: () => null, // This removes the label
      })}
    >
      <Tab.Screen name="Main" component={MainScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Locations" component={LocationsScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}
