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
  const { data: posts, refetch } = useAppwrite(getBookmarks = () => getBookmarkedPosts(user));
  const [refreshing, setRefreshing] = useState(false);

  async function onRefresh() {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
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
              isBookmarkPage
              refetch= {refetch}
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
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
      </View>
    </SafeAreaView>
  )
}

export default Bookmark