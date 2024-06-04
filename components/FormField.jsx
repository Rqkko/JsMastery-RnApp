import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

import { icons } from '../constants'

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="font-pmedium text-base text-gray-100">{title}</Text>

      <View className="flex-row items-center border-2 focus:border-secondary bg-black-100 px-4 border-black-200 rounded-2xl w-full h-16">
        <TextInput 
          className="flex-1 font-psemibold text-base text-white"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          autoCapitalize="none"
        />

        {/* Conditional rendering block with && instead of ? and : */}
        {title === "Password" && (
          <TouchableOpacity onPress={() => {
            setShowPassword(!showPassword)
          }}>
            <Image 
              source={!showPassword ? icons.eye : icons.eyeHide} 
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField