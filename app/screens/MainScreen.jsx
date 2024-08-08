
import { Link, Stack } from 'expo-router';
import { Image, Text, View, StyleSheet, Button, ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import App from './App';
import React, { useState, useEffect } from 'react';
import PresentHourHeader from '../../components/PresentHourHeader';
import WeatherAtHour from '../../components/WeatherAtHour';
import * as Location from 'expo-location';
import axios from 'axios';

export default function Home({route}) {
  const [renderedData, setRenderedData] = useState({
    subHeader: 'City, Country. Date',
    subHeaderTimeInit: 'XX:XX',
    subHeaderTimeEnd: 'XX:XX',
    subHeaderDeg: 0,
    subHeaderPrec: 0,
    subHeaderSunMin: 0,
    subHeaderWindSp: 0,
    otherHoursRecords: [
      {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
      {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
      {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
      {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
      {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
      {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
      {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
      {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
      {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
      {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
      {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
      {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
      {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
      {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
      {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
      {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
      {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
      {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
      {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
      {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
      {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
      {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
      {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0}
    ],
    timesRendered: 0
  });
  
  let location, lat, long, address = {city: '', country: ''}, dateString;

  const fetchLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let loc = await Location.getCurrentPositionAsync({});
    location = loc;
    lat = loc.coords.latitude;
    long = loc.coords.longitude;

    fetchAddress(lat, long);
  }

  const fetchAddress = async (latitude, longitude) => {
    const apiKey = '8ba0274a14ac47b7938ee6013535b123';
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
      );
      const data = response.data;
      if (data.results.length > 0) {
        const components = data.results[0].components;
        const city = components.city || components.town || components.village || 'N/A';
        const country = components.country || 'N/A';
        address = { city, country };
        fetchStationData();
      } else {
        setErrorMsg('Failed to fetch address');
      }
    } catch (error) {
      console.error(error);
      setErrorMsg('Failed to fetch address');
    }
  };

  const fetchStationData = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    dateString = `${year}-${month}-${day}`;

    // Define the URL and headers
    const url = `https://meteostat.p.rapidapi.com/stations/nearby?lat=${lat}&lon=${long}`;
    const headers = {
      'x-rapidapi-key': 'dc396b3ad7msheb04c94f80122f8p1c64afjsn57ea0fc7714e',
      'x-rapidapi-host': 'meteostat.p.rapidapi.com'
    };

    // Make the GET request using fetch
    fetch(url, {
      method: 'GET',
      headers: headers
    })
      .then(response => response.json())
      .then(data => {
        let stationId = data.data[0].id
        fetchData(stationId);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };


  const fetchData = (stationId) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const nextHour = String(date.getHours() == 23 ? 0 : date.getHours()+1).padStart(2, '0');
    dateString = `${year}-${month}-${day}`;

    // Define the URL and headers
    const url = `https://meteostat.p.rapidapi.com/stations/hourly?station=${stationId}&start=${year}-${month}-${day}&end=${year}-${month}-${day}&tz=Canada/Atlantic`;
    const headers = {
      'x-rapidapi-key': 'dc396b3ad7msheb04c94f80122f8p1c64afjsn57ea0fc7714e',
      'x-rapidapi-host': 'meteostat.p.rapidapi.com'
    };

    // Make the GET request using fetch
    fetch(url, {
      method: 'GET',
      headers: headers
    })
      .then(response => response.json())
      .then(data => {
        let subHeaderTimeInit = "XX:XX", subHeaderTimeEnd = "XX:XX",
        subHeaderDeg = 0, subHeaderPrec = 0, 
        subHeaderSunMin = 0, subHeaderWindSp = 0;

        let hoursResponse = [
          {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
          {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
          {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
          {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
          {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
          {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
          {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
          {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
          {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
          {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
          {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
          {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
          {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
          {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
          {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
          {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
          {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
          {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
          {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
          {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
          {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
          {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
          {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0}
        ];

        let i = 0;
        for(timeFrame of data.data){
          let timeInit = timeFrame.time.split(" ")[1].split(":")[0];

          if(timeInit == hour){
            subHeaderTimeInit = timeInit;
            subHeaderTimeEnd = String(Number(timeInit) == 23 ? 0 : Number(timeInit)+1).padStart(2, '0');
            subHeaderDeg = timeFrame.temp;
            subHeaderPrec = timeFrame.prcp;
            subHeaderSunMin = timeFrame.tsun || 30;
            subHeaderWindSp = timeFrame.wspd;
            continue;
          }

          hoursResponse[i].timeInit = `${timeInit}:00`;
          hoursResponse[i].timeEnd = `${String(Number(timeInit) == 23 ? 0 : Number(timeInit)+1).padStart(2, '0')}:00`;
          hoursResponse[i].deg = timeFrame.temp;
          hoursResponse[i].prec = timeFrame.prcp;
          hoursResponse[i].sunMin = timeFrame.tsun || 30;
          hoursResponse[i].windSp = timeFrame.wspd;
          i++;
        }

        setRenderedData({
          subHeader: `${address.city}, ${address.country}. ${dateString}`,
          subHeaderTimeInit: `${hour}:00`,
          subHeaderTimeEnd: `${nextHour}:00`,
          subHeaderDeg,
          subHeaderPrec,
          subHeaderSunMin,
          subHeaderWindSp,
          otherHoursRecords: hoursResponse,
          timesRendered: 1
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  if(renderedData.timesRendered < 1){ fetchLocation(); }

  return (
    <ScrollView style={styles.bg}>
      <PresentHourHeader date={`${renderedData.subHeader}`} timeInit={renderedData.subHeaderTimeInit}
            timeEnd={renderedData.subHeaderTimeEnd} deg={renderedData.subHeaderDeg}
            prec={renderedData.subHeaderPrec} sunMin={renderedData.subHeaderSunMin}
            windSp={renderedData.subHeaderWindSp} />
      {
        renderedData.otherHoursRecords.map(
          (timeFrame, index, arr) =>(
            Number(timeFrame.timeInit.split(":")[0]) >= Number(renderedData.subHeaderTimeEnd.split(":")[0])
            && (
              <WeatherAtHour key={index}
              topOffset={index == 0 || Number(arr[index].timeInit.split(":")[0]) - Number(arr[index-1].timeInit.split(":")[0]) == 2 ? "yes" : null}
              timeInit={timeFrame.timeInit} timeEnd={timeFrame.timeEnd} deg={timeFrame.deg} prec={timeFrame.prec}
                sunMin={timeFrame.sunMin} windSp={timeFrame.windSp} />
            )
        ))
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#b3ffbd',
    height: '100%',
    width: '100%',
  }
});
