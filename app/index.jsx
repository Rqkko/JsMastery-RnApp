import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function App() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="font-pblack text-3xl">Aora!</Text>
      <StatusBar style="auto" />
      <Link href='home' style={{ color: 'blue' }}>Go to Profile</Link>
    </View>
  );
}
