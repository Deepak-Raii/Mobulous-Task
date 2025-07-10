import React, { useRef, useState, useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
  Text,
  Animated,
  Easing,
  Image,
} from 'react-native';
import Video from 'react-native-video';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const { height: screenHeight, width } = Dimensions.get('screen');

const Reels = ({ route }) => {
  const navigation = useNavigation();
  const { videoData, index } = route.params;
  const [currentIndex, setCurrentIndex] = useState(index);
  const [muted, setMuted] = useState(true);
  const [likedVideos, setLikedVideos] = useState({});
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  const [videosData, setVideosData] = useState(
    videoData.map(video => ({
      ...video,
      likes: Math.floor(Math.random() * 10000) + 1000,
      comments: Math.floor(Math.random() * 500) + 50,
    })),
  );

  useEffect(() => {
    if (flatListRef.current && index !== undefined) {
      setTimeout(() => {
        flatListRef.current.scrollToIndex({ index, animated: false });
      }, 100);
    }
  }, [index]);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index;
      setCurrentIndex(newIndex);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
    waitForInteraction: true,
  }).current;

  const handleLike = videoId => {
    const isLiked = !likedVideos[videoId];
    setLikedVideos(prev => ({ ...prev, [videoId]: isLiked }));

    setVideosData(prev =>
      prev.map(video =>
        video.id === videoId
          ? { ...video, likes: isLiked ? video.likes + 1 : video.likes - 1 }
          : video,
      ),
    );

    scaleAnim.setValue(0);
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 800,
      easing: Easing.elastic(2),
      useNativeDriver: true,
    }).start();
  };

  const formatCount = count => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    }
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  };

  const renderItem = ({ item, index: itemIndex }) => {
    const isLiked = likedVideos[item.id];
    const isCurrent = currentIndex === itemIndex;

    return (
      <View style={styles.itemContainer}>
        {isCurrent ? (
          <TouchableOpacity activeOpacity={1} style={styles.videoContainer}>
            <Video
              source={{ uri: item.uri }}
              style={styles.video}
              resizeMode="cover"
              repeat
              muted={muted}
              paused={!isCurrent}
              bufferConfig={{
                minBufferMs: 15000,
                maxBufferMs: 30000,
                bufferForPlaybackMs: 2500,
                bufferForPlaybackAfterRebufferMs: 5000,
              }}
            />

            <View style={styles.rightSidebar}>
              <TouchableOpacity
                style={styles.sidebarButton}
                onPress={() => handleLike(item.id)}
              >
                <MaterialIcons
                  name={isLiked ? 'favorite' : 'favorite-border'}
                  size={35}
                  color={isLiked ? '#ff3040' : '#fff'}
                />
                <Text style={styles.sidebarText}>
                  {formatCount(item.likes)}
                </Text>
              </TouchableOpacity>

              <View style={styles.musicBox}>
                <MaterialIcons name="music-note" size={18} color="#fff" />
                <Text style={styles.musicText}>Original Audio</Text>
              </View>
            </View>

            <View style={styles.bottomBar}>
              <View style={styles.userInfo}>
                <Image
                  source={{ uri: `https://i.pravatar.cc/100?u=${item.id}` }}
                  style={styles.avatar}
                />
                <Text style={styles.username}>
                  @{item?.author?.toLowerCase().replace(/\s/g, '')}
                </Text>
              </View>
              <Text style={styles.caption}>
                {item.caption || 'Check out this awesome reel! #fun'}
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.videoPlaceholder} />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back" size={30} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.muteButton}
        onPress={() => setMuted(!muted)}
      >
        <MaterialIcons
          name={muted ? 'volume-off' : 'volume-up'}
          size={25}
          color="#fff"
        />
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        data={videosData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        snapToInterval={screenHeight}
        snapToAlignment="start"
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        initialScrollIndex={index}
        getItemLayout={(data, idx) => ({
          length: screenHeight,
          offset: screenHeight * idx,
          index: idx,
        })}
        windowSize={3}
        maxToRenderPerBatch={1}
        updateCellsBatchingPeriod={100}
        removeClippedSubviews={true}
        initialNumToRender={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  itemContainer: {
    width,
    height: screenHeight-20,
  },
  videoContainer: {
    flex: 1,
    position: 'relative',
  },
  videoPlaceholder: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  rightSidebar: {
    position: 'absolute',
    right: 10,
    bottom: 80,
    alignItems: 'center',
  },
  sidebarButton: {
    marginBottom: 20,
    alignItems: 'center',
  },
  sidebarText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 30,
    left: 15,
    right: 100,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: 10,
  },
  username: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  caption: {
    color: '#fff',
    fontSize: 14,
  },
  musicBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  musicText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 5,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 15,
    zIndex: 1,
  },
  muteButton: {
    position: 'absolute',
    top: 20,
    right: 15,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 5,
    borderRadius: 20,
  },
});

export default Reels;
