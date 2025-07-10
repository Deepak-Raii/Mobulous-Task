import React, { useState, useRef } from 'react';
import { View, useWindowDimensions, Animated } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';

import PostGrid from './PostGrid';
import VideoList from './VideoList';
import TaggedItems from './TaggedItems';
import AboutInfo from './AboutInfo';
import Colors from '../constants/color';

const TabSection = ({
  scrollY = new Animated.Value(0),
  headerHeight = 80,
  tabHeight = 50,
}) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'posts', title: 'Posts' },
    { key: 'videos', title: 'Videos' },
    { key: 'tagged', title: 'Tagged' },
    { key: 'about', title: 'About' },
  ]);

  const tabBarScrollY = useRef(new Animated.Value(0)).current;

  scrollY.addListener(({ value }) => {
    tabBarScrollY.setValue(value);
  });

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'posts':
        return (
          <PostGrid
            scrollY={scrollY}
            headerHeight={headerHeight}
            tabHeight={tabHeight}
          />
        );
      case 'videos':
        return (
          <VideoList
            scrollY={scrollY}
            headerHeight={headerHeight}
            tabHeight={tabHeight}
          />
        );
      case 'tagged':
        return (
          <TaggedItems
            scrollY={scrollY}
            headerHeight={headerHeight}
            tabHeight={tabHeight}
          />
        );
      case 'about':
        return (
          <AboutInfo
            scrollY={scrollY}
            headerHeight={headerHeight}
            tabHeight={tabHeight}
          />
        );
      default:
        return null;
    }
  };

  const renderTabBar = props => {
    const translateY = tabBarScrollY.interpolate({
      inputRange: [0, headerHeight],
      outputRange: [0, -headerHeight],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={{
          transform: [{ translateY }],
          zIndex: 10,
          position: 'absolute',
          top: headerHeight,
          left: 0,
          right: 0,
        }}
      >
        <TabBar
          {...props}
          style={{
            backgroundColor: Colors.primary,
            height: tabHeight,
          }}
          activeColor={Colors.secondary}
          inactiveColor={Colors.grey}
          indicatorStyle={{ backgroundColor: Colors.secondary }}
        />
      </Animated.View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

export default TabSection;
