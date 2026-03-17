import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      const userData = JSON.parse(await AsyncStorage.getItem('userProfile'));
      if (userData) {
        setName(userData.name);
        setEmail(userData.email);
        setProfileImage(userData.profileImage);
      }
    };

    loadUserData();
  }, []);

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.uri);
    }
  };

  const handleSave = async () => {
    const userProfile = { name, email, profileImage };
    await AsyncStorage.setItem('userProfile', JSON.stringify(userProfile));
    alert('Profile saved!');
  };

  return (
    <View style={styles.container}>
      <Button title="Upload Profile Photo" onPress={handleImagePicker} />
      {profileImage && <Image source={{ uri: profileImage }} style={styles.image} />}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Save Changes" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
});

export default UserProfileScreen;