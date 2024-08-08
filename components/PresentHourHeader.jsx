import { Link, Stack } from 'expo-router';
import { Image, Text, View, StyleSheet, Button, ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

export default function PresentHourHeader({date, timeInit, timeEnd, deg, prec, sunMin, windSp}) {
  return (
    <ImageBackground
        source={require('@/assets/images/headerBg.png')}
        style={styles.imgBg}
      > 
        <View style={styles.headerContainer}>
          <Text style={styles.mainTitle}>W e a t h e r  T o d a y</Text>
          <Text style={styles.weatherDescriptionH2}>{date}</Text>
          <Text style={styles.weatherDescriptionH2Mb}>{timeInit} - {timeEnd}</Text>
          <View style={styles.horizontalFlex}>
            <View style={styles.verticalFlexMr}>
              <Text style={styles.degrees}>{deg}&deg;C</Text>
              <Image
                source={require('@/assets/images/cloudy.png')}
                style={styles.image}
              />
            </View>
            <View style={styles.verticalFlex}>
              <Text style={styles.weatherDescription}>Precipitation: {prec}mm</Text>
              <Text style={styles.weatherDescription}>Sun minutes: {sunMin}</Text>
              <Text style={styles.weatherDescription}>Wind speed: {windSp}km/h</Text>
            </View>
          </View>
        </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 6
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
  }
});
