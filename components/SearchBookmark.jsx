import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'

import { icons } from '../constants'

const SearchBookmark = () => {
  const [query, setQuery] = useState("")

  return (
    <View className="flex-row items-center space-x-4 border-2 focus:border-secondary bg-black-100 mb-8 px-4 border-black-200 rounded-2xl w-full h-16">
      <TextInput 
        className="flex-1 mt-0.5 font-pregular text-base text-white"
        value={query}
        placeholder="Search for your bookmarked videos"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          
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

export default SearchBookmark