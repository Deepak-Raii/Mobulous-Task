import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  RefreshControl,
  Animated,
  Easing,
} from 'react-native';
import Video from 'react-native-video';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const PostGrid = ({ scrollY, headerHeight, tabHeight }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const [likedPosts, setLikedPosts] = useState({});
  const heartAnimations = useRef({}).current;

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        'https://picsum.photos/v2/list?page=1&limit=20',
      );
      const data = await response.json();

      const enrichedPosts = data.map((item, index) => ({
        id: item.id,
        type: index % 5 === 0 ? 'video' : 'image',
        uri:
          index % 5 === 0
            ? 'https://www.w3schools.com/html/mov_bbb.mp4'
            : item.download_url,
        author: item.author,
        likes: Math.floor(Math.random() * 1000) + 100,
        comments: Math.floor(Math.random() * 200),
        caption: 'A beautiful moment captured from nature 📸',
      }));

      setPosts(enrichedPosts);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchPosts();
  };

  const handleLike = postId => {
    const isLiked = !likedPosts[postId];
    setLikedPosts(prev => ({ ...prev, [postId]: isLiked }));

    if (!heartAnimations[postId]) {
      heartAnimations[postId] = new Animated.Value(0);
    }

    heartAnimations[postId].setValue(0);
    Animated.sequence([
      Animated.timing(heartAnimations[postId], {
        toValue: 1,
        duration: 800,
        easing: Easing.elastic(2),
        useNativeDriver: true,
      }),
      Animated.delay(300),
      Animated.timing(heartAnimations[postId], {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleDoubleTap = postId => {
    if (!likedPosts[postId]) {
      handleLike(postId);
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    const visibleVideo = viewableItems.find(item => item.item.type === 'video');
    setCurrentPlaying(visibleVideo?.item.id || null);
  }).current;

  const renderItem = ({ item }) => {
    const isLiked = likedPosts[item.id];
    let lastTap = 0;

    const handlePress = () => {
      const now = Date.now();
      if (now - lastTap < 300) {
        handleDoubleTap(item.id);
      }
      lastTap = now;
    };

    return (
      <View style={[styles.postContainer, ]}>
        <View style={styles.postHeader}>
          <View style={styles.userInfo}>
            <Image
              source={{ uri: `https://i.pravatar.cc/100?u=${item.id}` }}
              style={styles.avatar}
            />
            <Text style={styles.username}>{item.author}</Text>
          </View>
          <TouchableOpacity>
            <MaterialIcons name="more-vert" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity activeOpacity={1} onPress={handlePress}>
          {item.type === 'video' ? (
            <View style={styles.videoContainer}>
              <Video
                source={{ uri: item.uri }}
                style={styles.media}
                muted
                repeat
                resizeMode="cover"
                paused={currentPlaying !== item.id}
              />
              <MaterialIcons
                name="play-circle-outline"
                size={48}
                color="#fff"
                style={styles.playIcon}
              />
            </View>
          ) : (
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.uri }} style={styles.media} />
              {isLiked && (
                <Animated.View
                  style={[
                    styles.heartOverlay,
                    {
                      opacity: heartAnimations[item.id]?.interpolate({
                        inputRange: [0, 0.1, 1],
                        outputRange: [0, 1, 0],
                      }),
                      transform: [
                        {
                          scale: heartAnimations[item.id]?.interpolate({
                            inputRange: [0, 0.5, 1],
                            outputRange: [0.8, 1.2, 1],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <MaterialIcons
                    name={'favorite'}
                    size={100}
                    color={'#ff3040'}
                  />
                </Animated.View>
              )}
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.actionRow}>
          <View style={styles.leftActions}>
            <TouchableOpacity onPress={() => handleLike(item.id)}>
              <MaterialIcons
                name={isLiked ? 'favorite' : 'favorite-border'}
                size={28}
                color={isLiked ? '#ff3040' : '#333'}
                style={styles.actionIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionIcon}>
              <MaterialIcons
                name="chat-bubble-outline"
                size={26}
                color="#333"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionIcon}>
              <MaterialIcons name="send" size={26} color="#333" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <MaterialIcons name="bookmark-border" size={26} color="#333" />
          </TouchableOpacity>
        </View>

        <View style={styles.postFooter}>
          <Text style={styles.likesCount}>
            {item.likes + (isLiked ? 1 : 0)} likes
          </Text>
          <Text style={styles.caption}>
            <Text style={styles.username}>{item.author} </Text>
            {item.caption}
          </Text>
          <TouchableOpacity>
            <Text style={styles.commentsText}>
              View all {item.comments} comments
            </Text>
          </TouchableOpacity>
          <Text style={styles.postTime}>2 HOURS AGO</Text>
        </View>
      </View>
    );
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <Animated.FlatList
      data={posts}
      style={{ paddingTop: headerHeight + tabHeight }}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      initialNumToRender={3}
      maxToRenderPerBatch={5}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true },
      )}
    />
  );
};

const styles = StyleSheet.create({
  postContainer: {
    width: windowWidth,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  username: {
    fontWeight: '600',
    fontSize: 14,
  },
  media: {
    width: '100%',
    height: windowWidth,
    backgroundColor: '#f0f0f0',
  },
  videoContainer: {
    position: 'relative',
  },
  imageContainer: {
    position: 'relative',
  },
  playIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -24,
    marginTop: -24,
  },
  heartOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    marginRight: 16,
  },
  postFooter: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  likesCount: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 4,
  },
  caption: {
    fontSize: 14,
    marginBottom: 4,
  },
  commentsText: {
    color: '#888',
    fontSize: 14,
    marginBottom: 4,
  },
  postTime: {
    color: '#888',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PostGrid;
