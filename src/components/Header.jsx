import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../constants/color';

const Header = () => (
  <View style={styles.container}>
    <MaterialIcon name="account-circle" size={80} color={Colors.secondary} />
    
    <View style={styles.rightItem}>
      <Text style={styles.name}>Deepak Rai</Text>
      <Text style={styles.bio}>React Native Developer | Noida</Text>
    </View>
    
    <TouchableOpacity style={styles.notificationIcon}>
      <MaterialIcon name="notifications" size={24} color={Colors.secondary} />
      <View style={styles.badge}>
        <Text style={styles.badgeText}>1</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor:Colors.primary
  },
  rightItem: {
    flex: 1,
    marginLeft: 5,
    justifyContent: 'center',
  },
  name: { 
    fontSize: 18, 
    fontWeight: 'bold',
    color: Colors.text
  },
  bio: { 
    fontSize: 14, 
    color: Colors.grey,
    marginTop: 3
  },
  notificationIcon: {
    padding: 8,
    position: 'relative'
  },
  badge: {
    position: 'absolute',
    right: 5,
    top: 5,
    backgroundColor: Colors.error,
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center'
  },
  badgeText: {
    color: Colors.primary,
    fontSize: 10,
    fontWeight: 'bold'
  }
});

export default Header;