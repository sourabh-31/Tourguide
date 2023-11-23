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

const LandPage2 = ({navigation}) => {
  const navigateToPage1 = () => {
    navigation.navigate('LandPage');
  };

  const navigateToPage3 = () => {
    navigation.navigate('LandPage3');
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ImageBackground
          source={ImageAssets.image2}
          resizeMode="cover"
          style={styles.image}>
          <LinearGradient
            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']}
            style={styles.overlay}
          />
          <Text style={styles.text}>Find your Favourite place</Text>
          <Text style={styles.subText}>
            Explore and discover amazing destinations around India
          </Text>
          <TouchableOpacity style={styles.buttonSkip} onPress={navigateToPage1}>
            <Text style={styles.btnText}>Prev</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={navigateToPage3}>
            <Text style={styles.btnText}>Next</Text>
          </TouchableOpacity>
          <View style={styles.dots}>
            <FontAwesome6 name={'circle'} solid size={14} color="#fff" />
            <FontAwesome6 name={'circle'} solid size={14} color="#baff66" />
            <FontAwesome6 name={'circle'} solid size={14} color="#fff" />
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default LandPage2;

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
    // borderWidth: 1,
    // borderColor: 'red',
    marginLeft: 30,
    letterSpacing: 1,
  },
  subText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: '#fff',
    position: 'absolute',
    bottom: '37%',
    width: '85%',
    marginLeft: 32,
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
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    fontWeight: '500',
  },
  dots: {
    flexDirection: 'row',
    gap: 15,
    position: 'absolute',
    bottom: '15%',
    left: '10%',
  },
});
