import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

import { icons } from '../constants'

const SearchInput = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View className="flex-row items-center space-x-4 border-2 focus:border-secondary bg-black-100 px-4 border-black-200 rounded-2xl w-full h-16">
      <TextInput 
        className="flex-1 mt-0.5 font-pregular text-base text-white"
        value={value}
        placeholder="Search for a video topic"
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        secureTextEntry={title === "Password" && !showPassword}
        autoCapitalize="none"
      />

      <TouchableOpacity>
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