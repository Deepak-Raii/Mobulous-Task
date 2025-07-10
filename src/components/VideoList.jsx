import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video';
import Colors from '../constants/color';

const { width } = Dimensions.get('window');
const itemSize = width / 3;

const videoData = [
  { id: '1', uri: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: '2', uri: 'https://www.w3schools.com/html/movie.mp4' },
  { id: '3', uri: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: '4', uri: 'https://www.w3schools.com/html/movie.mp4' },
  { id: '5', uri: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: '6', uri: 'https://www.w3schools.com/html/movie.mp4' },
];

const VideoList = ({ scrollY, headerHeight, tabHeight }) => {
  const navigation = useNavigation();

  const handlePress = (index) => {
    navigation.navigate('Reels', { index, videoData });
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <TouchableWithoutFeedback onPress={() => handlePress(index)}>
        <View style={styles.touchOverlay} />
      </TouchableWithoutFeedback>

      <Video
        source={{ uri: item.uri }}
        style={styles.thumbnail}
        resizeMode="stretch"
        muted
        paused
        repeat
      />
      <MaterialIcons
        name="play-circle-outline"
        size={26}
        color={Colors.primary}
        style={styles.playIcon}
      />
    </View>
  );

  return (
    <FlatList
      data={videoData}
      numColumns={3}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      style={{ paddingTop: headerHeight + tabHeight, backgroundColor:Colors.background }}
    />
  );
};

export default VideoList;

const styles = StyleSheet.create({
  item: {
    width: itemSize,
    height: itemSize,
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  playIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  touchOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
});
