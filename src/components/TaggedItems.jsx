import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const itemSize = width / 3;

const taggedData = [
  {
    id: '1',
    type: 'photo',
    uri: 'https://picsum.photos/400/400',
    likes: '1.2k',
  },
  {
    id: '2',
    type: 'video',
    uri: 'https://example.com/video1.mp4',
    views: '24.5k',
  },
  {
    id: '3',
    type: 'photo',
    uri: 'https://picsum.photos/401/401',
    likes: '856',
  },
  {
    id: '4',
    type: 'photo',
    uri: 'https://picsum.photos/402/402',
    likes: '3.1k',
  },
  {
    id: '5',
    type: 'video',
    uri: 'https://example.com/video2.mp4',
    views: '12.7k',
  },
  {
    id: '6',
    type: 'photo',
    uri: 'https://picsum.photos/403/403',
    likes: '2.4k',
  },
  {
    id: '7',
    type: 'photo',
    uri: 'https://picsum.photos/404/404',
    likes: '1.8k',
  },
  {
    id: '8',
    type: 'video',
    uri: 'https://example.com/video3.mp4',
    views: '8.9k',
  },
  {
    id: '9',
    type: 'photo',
    uri: 'https://picsum.photos/405/405',
    likes: '5.6k',
  },
];

const TaggedItems = ({ scrollY, headerHeight, tabHeight }) => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('TaggedPost', { item })}
      activeOpacity={0.8}
    >
      {item.type === 'video' ? (
        <View style={styles.videoContainer}>
          <Image
            source={{ uri: 'https://picsum.photos/400/400' }}
            style={styles.thumbnail}
          />
          <View style={styles.videoOverlay}>
            <MaterialIcons name="play-circle-outline" size={20} color="white" />
          </View>
          <Text style={styles.videoViews}>{item.views} views</Text>
        </View>
      ) : (
        <Image source={{ uri: item.uri }} style={styles.image} />
      )}

      {item.type === 'photo' && (
        <View style={styles.likesContainer}>
          <MaterialIcons name="favorite" size={14} color="white" />
          <Text style={styles.likesCount}>{item.likes}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: headerHeight + tabHeight }]}>
      <FlatList
        data={taggedData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default TaggedItems;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listContent: {
    paddingBottom: 50,
  },
  item: {
    width: itemSize,
    height: itemSize,
    borderWidth: 0.5,
    borderColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  videoContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  videoViews: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
  likesContainer: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesCount: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
});
