import React, { useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Animated,
  Image,
  useWindowDimensions,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../constants/color';

const AboutInfo = ({ scrollY, headerHeight, tabHeight }) => {
  const { height } = useWindowDimensions();

  const scrollYInternal = scrollY || useRef(new Animated.Value(0)).current;

  const fadeAnim1 = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const fadeAnim3 = useRef(new Animated.Value(0)).current;
  const fadeAnim4 = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.stagger(200, [
      Animated.timing(fadeAnim1, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim2, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim3, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim4, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleAction = async url => {
    try {
      
        await Linking.openURL(url);
      
    } catch (error) {
      console.log('Error opening URL:', error);
    }
  };

  const contactItems = [
    {
      icon: 'mail',
      text: 'deepakraii9696@gmail.com',
      url: 'mailto:deepakraii9696@gmail.com',
    },
    {
      icon: 'link',
      text: 'linkedin.com/in/deepak-raii',
      url: 'https://www.linkedin.com/in/deepak-raii/',
    },
  ];

  const featureItems = [
    'Features 1',
    'Features 2',
    'Features 3',
    'Features 4',
    'Features 5',
  ];

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          {
            paddingTop: headerHeight + tabHeight,
            paddingBottom: 40,
          },
        ]}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollYInternal } } }],
          { useNativeDriver: true },
        )}
      >
        <Animated.View style={[styles.developerCard, { opacity: fadeAnim1 }]}>
          <Image
            source={{ uri: 'https://avatars.githubusercontent.com/u/488' }}
            style={styles.avatar}
          />
          <Text style={styles.developerName}>Deepak Rai</Text>
          <Text style={styles.developerTitle}>React Native Developer</Text>
          <Text style={styles.developerBio}>
            Passionate about creating beautiful, performant mobile experiences
            with over 2 years of experience.
          </Text>
          <View style={styles.skillContainer}>
            {[
              'React Native',
              'JavaScript',
              'Node JS',
              'React JS',
              'Mongo DB',
            ].map((skill, index) => (
              <View key={skill} style={styles.skillPill}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        <Animated.View style={[styles.card, { opacity: fadeAnim2 }]}>
          <Text style={styles.cardTitle}>About The App</Text>
          <Text style={styles.cardText}>
            Our mission is to provide seamless, intuitive solutions that enhance
            your daily workflow. With over 1 million satisfied users worldwide,
            we're committed to excellence in every update.
          </Text>
        </Animated.View>

        <Animated.View style={[styles.card, { opacity: fadeAnim3 }]}>
          <Text style={styles.cardTitle}>Key Features</Text>
          {featureItems.map((item, index) => (
            <View key={index} style={styles.featureItem}>
              <MaterialIcon name="check" size={18} color="#4CAF50" />
              <Text style={styles.featureText}>{item}</Text>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[styles.card, { opacity: fadeAnim4 }]}>
          <Text style={styles.cardTitle}>Connect With Me</Text>
          {contactItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.contactItem}
              onPress={() => handleAction(item.url)}
              activeOpacity={0.7}
            >
              <MaterialIcon
                name={item.icon}
                size={22}
                color="#3182CE"
                style={styles.contactIcon}
              />
              <Text style={styles.contactText}>{item.text}</Text>
              <MaterialIcon name="forward" size={18} color="#CBD5E0" />
            </TouchableOpacity>
          ))}
        </Animated.View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Version 0.0.1</Text>
          <Text style={styles.footerText}>
            © 2025 Designed & Developed by Deepak Rai
          </Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
  developerCard: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
    elevation: 3,
    marginTop: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  developerName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 4,
  },
  developerTitle: {
    fontSize: 16,
    color: Colors.grey,
    marginBottom: 12,
  },
  developerBio: {
    fontSize: 14,
    color: Colors.grey,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 16,
  },
  skillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 8,
  },
  skillPill: {
    backgroundColor: '#EBF8FF',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
  },
  skillText: {
    color: '#3182CE',
    fontSize: 12,
    fontWeight: '600',
  },
  card: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 16,
  },
  cardText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#4A5568',
    marginBottom: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 15,
    color: '#4A5568',
    marginLeft: 12,
    flex: 1,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
  },
  contactIcon: {
    marginRight: 12,
  },
  contactText: {
    flex: 1,
    fontSize: 15,
    color: '#4A5568',
  },
  footer: {
    marginTop: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: '#A0AEC0',
    marginBottom: 4,
  },
});

export default AboutInfo;
