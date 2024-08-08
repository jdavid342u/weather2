
import { Link, Stack } from 'expo-router';
import { Image, Text, View, StyleSheet, Button, ImageBackground, ScrollView, Platform, TextInput, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import FindWeatherHeader from '@/components/FindWeatherHeader';
import WeatherAtHour from '@/components/WeatherAtHour';
import * as Location from 'expo-location';
import axios from 'axios';
import CountryPicker from 'react-native-country-picker-modal';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function LocationsScreen({route}) {
  const [loading, setLoading] = useState(false);
  const [renderedData, setRenderedData] = useState({
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
      {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
      {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0}
    ]
  });
  const [country, setCountry] = useState(null);
  const [countryCode, setCountryCode] = useState(null);
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [datePicked, setDatePicked] = useState(new Date());
  const [show, setShow] = useState(false);

  const onSelect = (selectedCountry) => {
    setCountry(selectedCountry);
    setCountryCode(selectedCountry.cca2);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || datePicked;
    setShow(Platform.OS === 'ios');
    setDatePicked(currentDate);
  };

  const showDatePicker = () => {
    setShow(true);
  };
  
  let location, lat, long, address = {city: '', country: ''}, dateString;

  const onFetch = async () => {
    if(!datePicked || !country || !city || !street || city.trim() == '' || street.trim() == ''){
      alert('Please fill out all the fields to make a successful query.\nInformation needs to be properly provided for Date, Country, City and Street.');
      return;
    }
    
    const apiKey = '8ba0274a14ac47b7938ee6013535b123';
    try {
      setLoading(true);
      let query = `${street.trim().replaceAll(" ", "+").replaceAll("#", "%23")},+${city.trim().replaceAll(" ", "+").replaceAll("#", "%23")},+${country.name.trim().replaceAll(" ", "+").replaceAll("#", "%23")}`
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${apiKey}&language=en&pretty=1`
      );
      const data = response.data;
      if (data.results.length > 0) {
        lat = data.results[0].geometry.lat;
        long = data.results[0].geometry.lng;
        fetchStationData();
      } else {
        setLoading(false);
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert('Something went wrong. Please try again.');
    }
  }

  const fetchStationData = () => {
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
        setLoading(false);
        alert('Something went wrong. Please try again.');
      });
  };


  const fetchData = (stationId) => {
    const year = datePicked.getFullYear();
    const month = String(datePicked.getMonth() + 1).padStart(2, '0');
    const day = String(datePicked.getDate()).padStart(2, '0');
    const hour = String(datePicked.getHours()).padStart(2, '0');
    const nextHour = String(datePicked.getHours() == 23 ? 0 : datePicked.getHours()+1).padStart(2, '0');
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
          {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0},
          {timeInit: 'XX:XX', timeEnd: 'XX:XX', deg: 0, prec: 0, sunMin: 0, windSp: 0}
        ];

        let i = 0;
        for(timeFrame of data.data){
          let timeInit = timeFrame.time.split(" ")[1].split(":")[0];
          hoursResponse[i].timeInit = `${timeInit}:00`;
          hoursResponse[i].timeEnd = `${String(Number(timeInit) == 23 ? 0 : Number(timeInit)+1).padStart(2, '0')}:00`;
          hoursResponse[i].deg = timeFrame.temp;
          hoursResponse[i].prec = timeFrame.prcp;
          hoursResponse[i].sunMin = timeFrame.tsun || 30;
          hoursResponse[i].windSp = timeFrame.wspd;
          i++;
        }

        setRenderedData({
          otherHoursRecords: hoursResponse,
          timesRendered: 1
        });

        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
      });
  };

  return (
    <ScrollView style={styles.bg}>
      <ImageBackground
        source={require('../../assets/images/headerBg.png')}
        style={styles.imgBg}
      > 
        <View style={styles.headerContainer}>
          <Text style={styles.mainTitle}>W e a t h e r  F i n d e r</Text>

          <View style={styles.container}>
            <Button onPress={showDatePicker} title="Pick Date" />
            {show && (
              <DateTimePicker
                value={datePicked}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onChange}
              />
            )}
            <View style={styles.dateContainer}>
              <Text style={styles.weatherDescriptionH2}>Selected Date: {datePicked.toDateString()}</Text>
            </View>
            <View style={styles.horizontalFlex}>
              <Text style={styles.weatherDescriptionH2}>Select country:  </Text>
              <CountryPicker
                countryCode={countryCode}
                withFilter
                withFlag
                withCountryNameButton
                withAlphaFilter
                withCallingCode
                withEmoji
                onSelect={onSelect}
                visible
              />
            </View>            
            <View style={styles.horizontalFlex}>
              <TextInput
                style={styles.input}
                placeholder="City..."
                value={city}
                onChangeText={setCity}
              />
              <TextInput
                style={styles.input}
                placeholder="Street..."
                value={street}
                onChangeText={setStreet}
              />
            </View>
            <Button onPress={onFetch} title="Fetch" />
          </View>
        </View>
    </ImageBackground>



      {
        loading ? (
          <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
          </View>
        ) : (!renderedData.otherHoursRecords[0].timeInit.includes("X") && (
          renderedData.otherHoursRecords.map(
            (timeFrame, index, arr) =>(
              <WeatherAtHour key={index}
                topOffset={index == 0 ? "yes" : null}
                timeInit={timeFrame.timeInit} timeEnd={timeFrame.timeEnd} deg={timeFrame.deg} prec={timeFrame.prec}
                sunMin={timeFrame.sunMin} windSp={timeFrame.windSp} />
          ))
        ))
        
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    width: '42%',
    backgroundColor: '#fff',
    margin: 15
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    width: '100%',
    padding: 25,
    marginBottom: 20
  },
  countryDetails: {
    marginTop: 20,
    alignItems: 'center',
  },
  countryText: {
    fontSize: 16,
    marginVertical: 4,
  },
  imgBg: {
    width: '100%',
    paddingBottom: 42,
    paddingTop: 42
  },
  frameFirstImgBg: {
    width: '100%',
    marginTop: -69,
    zIndex: -1,
    paddingTop: 69,
    paddingBottom: 28
  },
  frameImgBg: {
    width: '100%',
    paddingBottom: 28
  },
  bg: {
    flex: 1,
    backgroundColor: '#b3ffbd',
    height: '100%',
    width: '100%',
  },
  image: {
    width: 90,
    height: 90,
  },
  frameImage: {
    width: 50,
    height: 50,
  },
  mainTitle:{
    fontSize: 30,
    fontFamily: 'sans-serif-condensed',
    marginBottom: 20
  },
  weatherDescription:{
    color: '#000',
    fontSize: 15,
    fontFamily: 'sans-serif-light',
  },
  frameWeatherDescription:{
    color: '#000',
    fontSize: 13,
    fontFamily: 'sans-serif-light',
  },
  weatherDescriptionMb:{
    color: '#000',
    fontSize: 15,
    fontFamily: 'sans-serif-light',
    marginBottom: 22
  },

  weatherDescriptionH2:{
    color: '#000',
    fontSize: 15,
    fontFamily: 'sans-serif-medium',
    alignSelf: 'center'
  },
  weatherDescriptionH2Mb:{
    color: '#000',
    fontSize: 15,
    fontFamily: 'sans-serif-medium',
    marginBottom: 22
  },

  frameWeatherDescriptionMb:{
    color: '#000',
    fontSize: 13,
    fontFamily: 'sans-serif-light',
    marginBottom: 10
  },
  headerContainer:{
    paddingTop: 25,
    paddingBottom: 25,
    //backgroundColor: '#c4fffe',
    width: '100%',
    alignItems: 'center',
  },
  frameFirstHeaderContainer:{
    paddingTop: 16,
    paddingBottom: 16,
    //backgroundColor: '#c4fffe',
    width: '100%',
    alignItems: 'center',
  },
  frameHeaderContainer:{
    paddingTop: 16,
    paddingBottom: 16,
    //backgroundColor: '#c4fffe',
    width: '100%',
    alignItems: 'center',
  },
  horizontalFlex: {
    display: 'flex',
    flexDirection: 'row'
  },
  verticalFlex:{
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    verticalAlign: 'center',
    //backgroundColor: '#000333',
    //width: '45%',
  },
  verticalFlexMr:{
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    verticalAlign: 'center',
    //backgroundColor: '#000333',
    //width: '45%',
    marginRight: 22
  },
  degrees:{
    fontSize: 20,
    fontFamily: 'sans-serif-medium'
  },
  frameDegrees:{
    fontSize: 16,
    fontFamily: 'sans-serif-medium'
  },
  dateContainer: {
    marginTop: 15,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dateText: {
    fontSize: 18,
    color: '#333',
  },
  datePicker: {
    width: 320,
    height: 260,
    display: Platform.OS === 'ios' ? 'flex' : 'none',
  },
});
