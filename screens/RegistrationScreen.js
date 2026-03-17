import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegistrationScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');

    const handleRegistration = async () => {
        // Basic validation
        if (!firstName || !lastName || !email || !password || !confirmPassword || !dateOfBirth) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match.');
            return;
        }
        // Save to AsyncStorage
        try {
            const userData = { firstName, lastName, email, dateOfBirth };
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
            Alert.alert('Success', 'Registration successful!');
        } catch (error) {
            Alert.alert('Error', 'Failed to save data.');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="First Name" onChangeText={setFirstName} value={firstName} />
            <TextInput style={styles.input} placeholder="Last Name" onChangeText={setLastName} value={lastName} />
            <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} value={email} />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={setPassword} value={password} />
            <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry onChangeText={setConfirmPassword} value={confirmPassword} />
            <TextInput style={styles.input} placeholder="Date of Birth" onChangeText={setDateOfBirth} value={dateOfBirth} />
            <Button title="Register" onPress={handleRegistration} />
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
        paddingHorizontal: 10,
    },
});

export default RegistrationScreen;