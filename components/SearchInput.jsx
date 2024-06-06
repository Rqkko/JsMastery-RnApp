import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { router, usePathname } from 'expo-router'

import { icons } from '../constants'

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || '')

  return (
    <View className="flex-row items-center space-x-4 border-2 focus:border-secondary bg-black-100 px-4 border-black-200 rounded-2xl w-full h-16">
      <TextInput 
        className="flex-1 mt-0.5 font-pregular text-base text-white"
        value={query}
        placeholder="Search for a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert('Missing query', 'Please input something to search results across database');
          }

          console.log("Searching: " + pathname);

          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image 
          source={icons.search}
          className="w-5 h-5"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  )
}

export default SearchInput