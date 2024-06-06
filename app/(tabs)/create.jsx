import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ResizeMode, Video } from 'expo-av'
import * as DocumentPicker from 'expo-document-picker'
import * as ImagePicker from 'expo-image-picker'

import FormField from '../../components/FormField'
import { icons } from '../../constants'
import CustomButton from '../../components/CustomButton'
import { createVideo } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
import { router } from 'expo-router'

const Create = () => {
  const { user } = useGlobalContext();

  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    video: null,
    thumbnail: null,
    prompt: ''
  })

  const openPicker = async (selectType) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4,3],
      quality: 1,
    })

    if (!result.canceled) {
      if (selectType==='image') {
        setForm({ ...form, thumbnail: result.assets[0] })
      }

      if (selectType==='video') {
        setForm({ ...form, video: result.assets[0] })
      }
    }
  }

  const submit = async () => {
    if (!form.prompt || !form.title || !form.thumbnail || !form.video) {
      return Alert.alert('Please fill in all the fields')
    }

    setUploading(true);

    try {
      await createVideo({
        ...form, userId: user.$id
      });

      Alert.alert('Success', 'Post uploaded successfully')
      router.push('/home');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setForm({
        title: '',
        video: null,
        thumbnail: null,
        prompt: ''
      })

      setUploading(false);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="my-6 px-4">
        <Text className="font-psemibold text-2xl text-white">
          Upload Video
        </Text>

        <FormField 
          title="Video Title"
          value = {form.title}
          placeholder="Give your video a catchy title..."
          handleChangeText={(e) => setForm({...form, title: e})}
          otherStyles="mt-10"
        />

        <View className="space-y-2 mt-7">
          <Text className="font-pmedium text-base text-gray-100">
            Upload Video
          </Text>

          <TouchableOpacity onPress={() => openPicker('video')}>
            {form.video ? (
              <Video 
                source={{ uri: form.video.uri }}
                className="rounded-2xl w-full h-64"
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="justify-center items-center bg-black-100 px-4 rounded-2xl w-full h-40">
                <View className="justify-center items-center border-dash border-secondary-100 border w-14 h-14">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-1/2 h1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="space-y-2 mt-7">
          <Text className="font-pmedium text-base text-gray-100">
            Thumbnail Image
          </Text>

          <TouchableOpacity onPress={() => openPicker('image')}>
              {form.thumbnail ? (
                <Image
                  source={{ uri: form.thumbnail.uri }}
                  resizeMode='cover'
                  className="rounded-2xl w-full h-64"
                />
              ) : (
                <View className="flex-row justify-center items-center space-x-2 border-2 bg-black-100 px-4 border-black-200 rounded-2xl w-full h-16">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-5 h5"
                  />

                  <Text className="font-pmedium text-gray-100 text-sm">
                    Choose a file
                  </Text>
                </View>
              )}
            </TouchableOpacity>
        </View>

        <FormField 
          title="AI Prompt"
          value = {form.prompt}
          placeholder="The prompt you used to create this video"
          handleChangeText={(e) => setForm({...form, prompt: e})}
          otherStyles="mt-7"
        />

        <CustomButton 
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create