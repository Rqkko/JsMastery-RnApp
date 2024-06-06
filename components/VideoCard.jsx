import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
import WebView from 'react-native-webview';

const VideoCard = ({ video: { title, thumbnail, video, creator: { username, avatar } }}) => {
  const [play, setPlay] = useState(false);

  return (
    <View className="flex-col items-center mb-14 px-4">
      <View className="flex-row items-start gap-3">
        <View className="flex-row flex-1 justify-center items-center">
          <View className="justify-center items-center border-secondary p-0.5 border rounded-lg w-[46px] h-[46px] aasds">
            <Image 
              source={{ uri: avatar }} 
              className="rounded-lg w-full h-full"
              resizeMode='cover'
            />
          </View>

          <View className="flex-1 justify-center gap-y-1 ml-3">
            <Text 
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {title}
            </Text>

            <Text
              className="text-=xs text-gray-100"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
        
        <View className="pt-2">
          <Image 
            source={icons.menu}
            className="w-5 h-5"
            resizeMode='contain'
          />
        </View>
      </View>

      {play ? (
        <>
        <WebView 
          source={{ uri: video }}
          className="mt-3 rounded-xl w-full h-60"
          allowsInlineMediaPlayback
        />
        <Text className="text-white">{`Playing: ${video}`}</Text>
        </>
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center mt-3 rounded-xl w-full h-60"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <Image 
            source = {{ uri: thumbnail }}
            className="mt-3 rounded-xl w-full h-full"
            resizeMode="cover"
          />
          <Image 
            source={icons.play}
            className="absolute w-12 h-12"
            resizeMode='contain'
          />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default VideoCard