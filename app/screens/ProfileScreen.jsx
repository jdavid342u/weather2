// app/screens/LoginScreen.tsx
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { addUser, getUsers, clearUsers } from '@/storage';
//import styles from '@/styles';

export default function ProfileScreen({route}) {
  if(route){
    console.log("route");
    //const {username, email} = route.params;
  }

  return (
    <ImageBackground source={require("@/assets/images/bg.jpg")} style={styles.image}> 
      <View style={styles.container}>
        <Text style={styles.title}>My  Profile</Text>
        <Image source={require('@/assets/images/person.png')} style={styles.profilepic}/>
        <Text style={styles.subTitle}>{`Username:`}</Text>
        <Text style={styles.subTitle}>{"someguy"}</Text>
        <Text style={styles.subTitle}>{`Email:`}</Text>
        <Text style={styles.subTitle}>{"someguy@gmail.com"}</Text>
        <Text style={styles.subTitle}>{`Password:`}</Text>
        <Text style={styles.subTitle}>{'*********'}</Text>
        
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  profilepic:{
    height:150,
    width:150,
    alignSelf: 'center'
  },
  container: {
    justifyContent: 'center',
    padding: 20,
    width: '80%'
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#fff'
  },
  subTitle: {
    fontSize: 26,
    fontWeight: 'semibold',
    textAlign: 'center',
    color: '#fff'
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#fff',
    height: 42,
    fontSize: 20,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  button: {
    marginTop: 10,
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
    color: '#c2fbff',
    fontSize: 16
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});