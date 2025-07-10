import { Animated, StyleSheet, View } from 'react-native';
import React, { useRef } from 'react';
import Header from '../components/Header';
import TabSection from '../components/TabSection';

const HEADER_HEIGHT = 80;
const TAB_HEIGHT = 50;

const Profile = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.header,
          { transform: [{ translateY: headerTranslateY }] },
        ]}
      >
        <Header />
      </Animated.View>
      
      <TabSection 
        scrollY={scrollY} 
        headerHeight={HEADER_HEIGHT}
        tabHeight={TAB_HEIGHT}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    height: HEADER_HEIGHT,
    backgroundColor: 'white',
  },
});