import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'

const Home = () => {
  return (
    <SafeAreaView className="bg-primary">
      <FlatList 
        data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Text className="text-3xl text-white">{item.id}</Text>
        )}
        ListHeaderComponent={() => (
          <View className="space-y-6 my-6 px-4">
            <View className="flex-row justify-between items-start mb-6">
              <View>
                <Text className="font-pmedium text-gray-100 text-sm">
                  Welcome Back
                </Text>
                <Text className="font-psemibold text-2xl text-white">
                  JSMastery
                </Text>
              </View>
              
              <View className="mt-1.5">
                <Image 
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />

            <View className="flex-1 pt-5 pb-8 w-full">
              <Text className="mb-3 font-pregular text-gray-100 text-lg">
                Latest Videos
              </Text>

              <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }] ?? []} />
            </View>
          </View>
        )}
      />

      <StatusBar backgroundColor="#161622" style='light' />
    </SafeAreaView>
  )
}

export default Home