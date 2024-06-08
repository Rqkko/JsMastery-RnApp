import { View, Text, FlatList, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import SearchInput from '../../components/SearchInput'
import SearchBookmark from '../../components/SearchBookmark'
import useAppwrite from '../../lib/useAppwrite'
import { getBookmarkedPosts, getPostWithId } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
import EmptyState from '../../components/EmptyState'
import VideoCard from '../../components/VideoCard'

const Bookmark = () => {
  const { user } = useGlobalContext();
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getBookmarkedPosts(user);
  }, [])

  async function getBookmarkedPosts(user) {
    try {
      let tempPosts = []
      for (let i = 0; i < user.bookmarkedVideos.length; i++) {
        console.log(`i: ${i}, postId: ${user.bookmarkedVideos[i].$id}`);
        const tempPost = await getPostWithId(user.bookmarkedVideos[i].$id)
        console.log("TMP POST: " + tempPost.$id);
        tempPosts.push(tempPost)
      }
      console.log(tempPosts);

      setPosts(tempPosts);

    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }

  async function onRefresh() {
    await getBookmarkedPosts(user);
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="my-6 px-4"> 
        <Text className="mb-8 font-psemibold text-2xl text-white">
          Bookmarked Videos
        </Text>

        <SearchBookmark />

        <FlatList 
          data={posts}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <VideoCard 
              vid = {item}
            /> 
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title="No Videos Found"
              subtitle="Be the first one to upload a video"
            />
          )}
          refreshControl= {
            <RefreshControl
              // refreshing={}
              onRefresh={onRefresh}
            />
          }
        />
      </View>
    </SafeAreaView>
  )
}

export default Bookmark