// components/WeatherCard.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import styles from '../styles';

interface WeatherCardProps {
  location: string;
  temperature: string;
  condition: string;
  maxTemp: string;
  minTemp: string;
  windSpeed: string;
  sunrise: string;
  sunset: string;
  humidity: string;
  forecast: { time: string, temperature: string, condition: string }[];
}

const weatherIcons: { [key: string]: any } = {
  sunny: require('../assets/images/sun.png'),
  cloudy: require('../assets/images/cloudy.png'),
  fog: require('../assets/images/rain.png'),
  // Add more conditions and icons as needed
};

export default function WeatherCard({
  location,
  temperature,
  condition,
  maxTemp,
  minTemp,
  windSpeed,
  sunrise,
  sunset,
  humidity,
  forecast
}: WeatherCardProps) {
  return (
    <View style={localStyles.card}>
      <Text style={localStyles.date}>Monday, 5 July 2021</Text>
      <View style={localStyles.header}>
        <Text style={localStyles.location}>{location}</Text>
        <Image source={weatherIcons[condition]} style={localStyles.icon} />
      </View>
      <Text style={localStyles.temperature}>{temperature}°</Text>
      <Text style={localStyles.condition}>{condition}</Text>
      <View style={localStyles.tempContainer}>
        <Text style={localStyles.tempDetail}>max {maxTemp}°</Text>
        <Text style={localStyles.tempDetail}>min {minTemp}°</Text>
      </View>
      <View style={localStyles.forecastContainer}>
        {forecast.map((item, index) => (
          <View key={index} style={localStyles.forecastItem}>
            <Text style={localStyles.forecastTime}>{item.time}</Text>
            <Image source={weatherIcons[item.condition]} style={localStyles.forecastIcon} />
            <Text style={localStyles.forecastTemp}>{item.temperature}°</Text>
          </View>
        ))}
      </View>
      <View style={localStyles.detailsContainer}>
        <Text style={localStyles.detail}>wind speed {windSpeed}</Text>
        <Text style={localStyles.detail}>sunrise {sunrise}</Text>
        <Text style={localStyles.detail}>sunset {sunset}</Text>
        <Text style={localStyles.detail}>humidity {humidity}</Text>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    padding: 20,
    margin: 10,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    width: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  date: {
    fontSize: 16,
    color: '#999',
    alignSelf: 'flex-start',
  },
  location: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  icon: {
    width: 50,
    height: 50,
  },
  temperature: {
    fontSize: 64,
    color: '#333',
    marginVertical: 10,
  },
  condition: {
    fontSize: 24,
    color: '#333',
    textTransform: 'capitalize',
  },
  tempContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
    marginVertical: 10,
  },
  tempDetail: {
    fontSize: 18,
    color: '#666',
  },
  forecastContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },
  forecastItem: {
    alignItems: 'center',
  },
  forecastTime: {
    fontSize: 14,
    color: '#666',
  },
  forecastIcon: {
    width: 30,
    height: 30,
    marginVertical: 5,
  },
  forecastTemp: {
    fontSize: 16,
    color: '#333',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  detail: {
    fontSize: 14,
    color: '#666',
  },
});
