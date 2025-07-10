import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const Header = () => (
  <View style={styles.container}>
    <MaterialIcon name="account-circle" size={80} color="#000" />
    <View style={styles.rightItem}>
      <Text style={styles.name}>Deepak Rai</Text>
      <Text style={styles.bio}>React Native Developer | Noida</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  name: { fontSize: 18, fontWeight: 'bold' },
  bio: { fontSize: 14, color: 'gray' },
});

export default Header;
