import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {ImageAssets} from '../assets/images/ImagesAssets';

const {width, height} = Dimensions.get('screen');

const LandPage = ({navigation}) => {
  const navigateToPage2 = () => {
    navigation.navigate('LandPage2');
  };

  const navigateToNumberLogin = () => {
    navigation.navigate('NumberLogin');
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ImageBackground
          source={ImageAssets.image1}
          resizeMode="cover"
          style={styles.image}>
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 1)']}
            style={styles.overlay}
          />
          <Text style={styles.text}>
            Explore the Beauty of the India with us
          </Text>
          <Text style={styles.subText}>
            If you like to travel, this is your place! Here you can travel
            without hassle and enjoy it
          </Text>
          <TouchableOpacity
            style={styles.buttonSkip}
            onPress={navigateToNumberLogin}>
            <Text style={styles.btnText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={navigateToPage2}>
            <Text style={styles.btnText}>Next</Text>
          </TouchableOpacity>
          <View style={styles.dots}>
            <FontAwesome6 name={'circle'} solid size={14} color="#baff66" />
            <FontAwesome6 name={'circle'} solid size={14} color="#fff" />
            <FontAwesome6 name={'circle'} solid size={14} color="#fff" />
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default LandPage;

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
    width: 270,
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
    bottom: '37%',
    width: '85%',
    marginLeft: 34,
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
    width: '23%',
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
    fontWeight: '500',
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
