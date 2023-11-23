import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {ImageAssets} from '../assets/images/ImagesAssets';

const {width, height} = Dimensions.get('screen');

const LandPage3 = ({navigation}) => {
  const navigateToPage2 = () => {
    navigation.navigate('LandPage2');
  };

  const navigateToLogin = () => {
    navigation.navigate('NumberLogin');
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ImageBackground
          source={ImageAssets.image3}
          resizeMode="cover"
          style={styles.image}>
          <LinearGradient
            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
            style={styles.overlay}
          />
          <Text style={styles.text}>Welcome to the TourGuide</Text>
          <Text style={styles.subText}>
            Your gateway to exploring the India's Beauty with just a scan
          </Text>
          <TouchableOpacity style={styles.buttonSkip} onPress={navigateToPage2}>
            <Text style={styles.btnText}>Prev</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
            <Text style={styles.btnText}>Get Started</Text>
          </TouchableOpacity>
          <View style={styles.dots}>
            <FontAwesome6 name={'circle'} solid size={14} color="#fff" />
            <FontAwesome6 name={'circle'} solid size={14} color="#fff" />
            <FontAwesome6 name={'circle'} solid size={14} color="#baff66" />
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default LandPage3;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    fontSize: 42,
    fontFamily: 'Montserrat-Medium',
    color: '#fff',
    position: 'absolute',
    bottom: '45%',
    width: 250,
    marginLeft: 30,
    letterSpacing: 1,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  subText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: '#fff',
    position: 'absolute',
    bottom: '38%',
    width: '85%',
    marginLeft: 35,
  },
  buttonSkip: {
    backgroundColor: '#CAE8D5',
    width: '23%',
    padding: 11,
    alignItems: 'center',
    borderRadius: 20,
    position: 'absolute',
    top: '4%',
    right: '8%',
  },
  button: {
    backgroundColor: '#baff66',
    width: 120,
    padding: 11,
    alignItems: 'center',
    borderRadius: 20,
    position: 'absolute',
    bottom: '14%',
    right: '10%',
  },
  btnText: {
    color: '#000',
    fontSize: 15,
    fontFamily: 'Montserrat-Medium',
  },
  dots: {
    flexDirection: 'row',
    gap: 15,
    position: 'absolute',
    bottom: '15%',
    left: '10%',
  },
});
