import React from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Redirect, router } from 'expo-router';

import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/home" />

  return (
    <SafeAreaView className="bg-primary p-[15px] h-full">
      <ScrollView contentContainerStyle={{ height: '100%'}}>
        <View className="justify-center items-center px-4 w-full min-h-[55vh]">
          <Image 
            source = {images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />

          <Image 
            source={images.cards}
            className="w-full max-w-[380px] h-[300px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="font-bold text-3xl text-center text-white">Discover Endless Possibilities with{'  '}<Text className="text-secondary-200">Aora</Text></Text>
          </View>

          {/* Line below Aora text */}
          <Image 
            source={images.path}
            className="right-3 bottom-2.5 absolute w-[136px] h-[15px]"
            resizeMode="contain"
          />
        </View>
        
        <Text className="mt-7 font-pregular text-center text-gray-100 text-sm">Where creativity meets innovation: embark on a journey of limitless exploration with Aora</Text>

        <CustomButton 
          title="Continue with Email"
          handlePress={() => router.push('/sign-in')}
          containerStyles="w-full mt-7"
        />
      </ScrollView>

      <StatusBar backgroundColor="#161622" style='light' />
    </SafeAreaView>
  );
}
