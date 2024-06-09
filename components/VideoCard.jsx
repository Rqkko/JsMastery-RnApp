import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { icons } from '../constants'
import WebView from 'react-native-webview';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { bookmark, getCurrentUser, unbookmark, updateUser } from '../lib/appwrite';
import { useGlobalContext } from '../context/GlobalProvider';

const VideoCard = ({ vid: { $id, title, thumbnail, video, creator: { username, avatar }, usersBookmarked } }) => {
  const [play, setPlay] = useState(false);
  const { user, setUser } = useGlobalContext();
  const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
    if (user.bookmarkedVideos.some(video => video.$id === $id)) {
      setIsBookmarked(true);
    }
  }, [])
  

  async function handleMenuSelect(value) {
    try {
      if (value=="bookmark") {
        if (!isBookmarked) {
          await bookmark(user, $id);
          await updateUser(setUser);
          setIsBookmarked(true);
          Alert.alert("Video Bookmarked!");
        } else {
          const removedVideo = await unbookmark(user, $id);
          await updateUser(setUser);
          setIsBookmarked(false);
          Alert.alert(`${removedVideo.title} is now unbookmarked!`);
        }

      } else if (value=="delete") {
        Alert.alert("Deleting", "Deleting this video")

      } else {
        throw Error("Invalid Option");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }

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
        
        <Menu onSelect={handleMenuSelect}>
          <MenuTrigger>
            <Image
                source={icons.menu}
                className="w-5 h-5"
                resizeMode='contain'
                />
          </MenuTrigger>

          <MenuOptions
            optionsContainerStyle={{ backgroundColor: "#1E1E2D", marginTop: 30, width:"30%" }}
          >
            <MenuOption value={"bookmark"}>
              <View className="flex-row items-center">
                <Image 
                  source={icons.bookmark}
                  className="mr-2 ml-1 w-5 h-5"
                  resizeMode='contain'
                />
                {isBookmarked
                  ? <Text className="mr-2 font-pregular text-gray-100">UnBookmark</Text>
                  : <Text className="mr-2 font-pregular text-gray-100">Bookmark</Text>}
                
              </View>
            </MenuOption>
            <MenuOption value={"delete"}>
              <View className="flex-row items-center">
                <Image 
                  source={icons.eyeHide}
                  className="mr-2 ml-1 w-5 h-5"
                  resizeMode='contain'
                />
                <Text className="mr-2 font-pregular text-gray-100">Delete</Text>
              </View>
            </MenuOption>
          </MenuOptions>
        </Menu>
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

const styles = StyleSheet.create({
  menuView: {
    alignItems: "center"
  },

  menuText: {
    color: "#CDCDE0"
  }
})

export default VideoCard