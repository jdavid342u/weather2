// app/screens/LoginScreen.tsx
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { addUser, getUsers, clearUsers } from '@/storage';
//import styles from '@/styles';

export default function RegisterScreen({navigation}) {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [password2, setPassword2] = useState(null);
  //const { login } = useContext(AuthContext);
  const onRegisterClicked = async () => {
    if(!username || !email || !password || !password2){
      alert("Please fill all the fields and try again.");
      return;
    }else if(password != password2){
      alert("Passwords don't match. Please revise and try again.");
      return;
    }

    const newUser = { username, email, password };
    await addUser(newUser);
    setUsername(null);
    setEmail(null);
    setPassword(null);
    setPassword2(null);
    alert("User created successfully. You can now login.");
    navigation.navigate('Login');
  }

  return (
    <ImageBackground source={require("@/assets/images/bg.jpg")} style={styles.image}> 
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          label="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          autoCapitalize="none"
          placeholder='Username'
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
          placeholder='Email'
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          autoCapitalize="none"
          placeholder='Password'
        />
        <TextInput
          label="ConfirmPassword"
          value={password2}
          onChangeText={setPassword2}
          secureTextEntry
          style={styles.input}
          autoCapitalize="none"
          placeholder='Confirm Password'
        />
        <Button title="Register" onPress={onRegisterClicked} style={styles.button} />
        
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20,
    width: '80%'
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 36,
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