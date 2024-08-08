import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = '@users_key';

export const saveUsers = async (users) => {
  try {
    const jsonValue = JSON.stringify(users);
    await AsyncStorage.setItem(USERS_KEY, jsonValue);
  } catch (e) {
    console.error("Error saving users: ", e);
  }
};

export const getUsers = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(USERS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Error getting users: ", e);
  }
};

export const addUser = async (user) => {
  try {
    const users = await getUsers();
    users.push(user);
    await saveUsers(users);
  } catch (e) {
    console.error("Error adding user: ", e);
  }
};

export const clearUsers = async () => {
  try {
    await AsyncStorage.removeItem(USERS_KEY);
  } catch (e) {
    console.error("Error clearing users: ", e);
  }
};