import { View, Text, FlatList, RefreshControl } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import SearchInput from '../../components/SearchInput'
import SearchBookmark from '../../components/SearchBookmark'

const Bookmark = () => {
  const posts = [ { $id: 1 }, { $id: 2 }, { $id: 3 }, { $id: 4 }, ];

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
            <Text className="text-4xl text-white">
              {item.$id}
            </Text>
          // <>
          //   <VideoCard 
          //     video = {item}
          //   /> 
          // </>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title="No Videos Found"
              subtitle="Be the first one to upload a video"
            />
          )}
          // refreshControl= {
          //   <RefreshControl
          //     refreshing={refreshing}
          //     onRefresh={onRefresh}
          //   />
          // }
        />
      </View>
    </SafeAreaView>
  )
}

export default Bookmark