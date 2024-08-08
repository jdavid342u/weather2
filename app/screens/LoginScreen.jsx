// app/screens/LoginScreen.tsx
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { addUser, getUsers, clearUsers } from '@/storage';
//import styles from '@/styles';

export default function LoginScreen({navigation}) {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    if(!username || !password){
      alert("Username and password must be filled. Please revise and try again.");
      return;
    }

    const savedUsers = await getUsers();
    for(user of savedUsers){
      if(user.username == username && user.password == password){
        navigation.navigate('App', {username, email: user.email});
        return;
      }
    }

    alert("Authentication failed. Please revise the provided information and try again.");
  };

  return (
    <ImageBackground source={require("@/assets/images/bg.jpg")} style={styles.image}> 
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          label="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          autoCapitalize="none"
          placeholder='Username'
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
        <Button title="Login" onPress={handleLogin} style={styles.button} />
        
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Or Register Now</Text>
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