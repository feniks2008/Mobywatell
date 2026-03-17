import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateInput = () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please enter both email and password');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (validateInput()) {
      try {
        // Here, you would usually send a request to your authentication API
        // For the purpose of this example, let's assume the login is always successful
        const userData = { email }; // Replace this with actual user data
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        Alert.alert('Login Successful', 'Welcome!');
      } catch (error) {
        Alert.alert('Login Failed', 'An error occurred during login');
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});

export default LoginScreen;
