import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalProvider'

const Home = () => {
  // Rename "data" to "posts"
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);
  const [refreshing, setRefreshing] = useState(false);
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  const onRefresh = async () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList 
      data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <>
            <VideoCard 
              vid = {item}
            /> 
          </>
        )}
        ListHeaderComponent={() => (
          <View className="space-y-6 my-6 px-4">
            <View className="flex-row justify-between items-start mb-6">
              <View>
                <Text className="font-pmedium text-gray-100 text-sm">
                  Welcome Back,
                </Text>
                <Text className="font-psemibold text-2xl text-white">
                  {user?.username}
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

            <View className="pt-4 pb-2 w-full">
              <Text className="mb-3 font-pregular text-gray-100 text-lg">
                Latest Videos
              </Text>

              <Trending posts={latestPosts ?? []} />

            </View>

          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first one to upload a video"
          />
        )}
        refreshControl= {
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />}
      />

      <StatusBar backgroundColor="#161622" style='light' />
    </SafeAreaView>
  )
}

export default Home