import { useState } from 'react';
import { View, Text, FlatList, ImageBackground, TouchableOpacity, Image } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { icons } from '../constants';
import { Video, ResizeMode } from 'expo-av';
import WebView from 'react-native-webview';

const zoomIn = {
  0: {
    scale: 0.9
  },
  1: {
    scale: 1.1,
  }
}

const zoomOut = {
  0: {
    scale: 1.1
  },
  1: {
    scale: 0.9,
  }
}

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false)

  return (
    <Animatable.View
      className="mr-3 ml-3"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        // <Video
        //   source={{ uri: `${item.video}.mp4` }}
        //   className="bg-white/10 mt-3 rounded-[35px] w-52 h-72"
        //   resizeMode={ResizeMode.CONTAIN}
        //   useNativeControls
        //   shouldPlay
        //   onPlaybackStatusUpdate={(status) => {
        //     if (status.didJustFinish) {
        //       setPlay(false);
        //     }
        //   }}
        // />
        <WebView 
          source={{ uri: item.video }}
          className="bg-white/10 mt-3 rounded-[35px] w-52 h-72"
          allowsInlineMediaPlayback
        />
            ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => {
            setPlay(true)
            console.log("Video url: " +item.video);
          }}
        >
          <ImageBackground 
            source= {{ uri: item.thumbnail}}
            className="shadow-black/40 shadow-lg my-5 rounded-[35px] w-52 h-72 overflow-hidden"
            resizeMode='cover'
          />

          <Image 
            source={icons.play}
            className="absolute w-12 h-12"
            resizeMode='contain'
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  )
}

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[1]);

  function viewableItemsChanged({ viewableItems }) {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key)
    }
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem 
          activeItem={activeItem}
          item={item}
        />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70
      }}
      contentOffset={{ x: 170 }}
      horizontal
    />
  )
}

export default Trending