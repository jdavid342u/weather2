import { Link, Stack } from 'expo-router';
import { Image, Text, View, StyleSheet, Button, ImageBackground, ScrollView, TextInput, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import CountryPicker from 'react-native-country-picker-modal';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function FindWeatherHeader({onFetch}) {
  const [country, setCountry] = useState(null);
  //country.name
  const [countryCode, setCountryCode] = useState('US'); // Default country code
  const [text, setText] = useState('');
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

  return (
    <ImageBackground
        source={require('../assets/images/headerBg.png')}
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
                value={text}
                onChangeText={setText}
              />
              <TextInput
                style={styles.input}
                placeholder="Street..."
                value={text}
                onChangeText={setText}
              />
            </View>
            <Button onPress={onFetch(dateToFetch = 'x')} title="Fetch" />
          </View>
        </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
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
