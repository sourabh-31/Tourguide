import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import LinearGradient from 'react-native-linear-gradient';
import {ImageAssets} from '../assets/images/ImagesAssets';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {CommonActions} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import {useLocation} from '../LocationContext';

const {width, height} = Dimensions.get('screen');

const NumberLogin = ({navigation}) => {
  GoogleSignin.configure({
    webClientId:
      '781939602015-n4jbcqbqagm9ok3a48qcdjtat7e2i3i3.apps.googleusercontent.com',
  });

  const navigateToNumber = () => {
    navigation.navigate('Number');
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const {setULat, setULong} = useLocation();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Tab'}],
          }),
        );
      }
    });

    return unsubscribe;
  }, []);

  const handleGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    requestLocationPermission();
    getLocation();
  });

  // Requesting user permission
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Tourist App Location Permission',
          message:
            'Tourist App needs access to your Location ' +
            'so you can get seamless experience.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('You can use the Location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  //Getting user current location
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setULat(position.coords.latitude);
        setULong(position.coords.longitude);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.part1}>
        <ImageBackground
          source={ImageAssets.bg}
          resizeMode="cover"
          style={styles.image}>
          <LinearGradient
            colors={['rgba(31, 46, 60, 1)', 'rgba(12, 28, 44, 0.5)']}
            style={styles.gradient}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 2}}
          />

          <View style={styles.headPart}>
            <Text style={styles.headText}>Welcome to TourGuide</Text>
            <Image source={ImageAssets.sparkle} style={styles.icon} />
          </View>

          <Text style={styles.part1Head}>
            Let's upgrade your travel experience
          </Text>
          <Text style={styles.part2Head}>
            Changing the way people travel by providing an interactive engaging
            and personalized guide
          </Text>
        </ImageBackground>
      </View>
      <View style={styles.part2}>
        <View style={styles.buttonPart}>
          <TouchableOpacity
            style={styles.buttonNumber}
            onPress={navigateToNumber}>
            <FontAwesome6 name={'mobile-screen'} size={21} color="#000" />
            <Text style={styles.btnText}>Continue with number</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
            <FontAwesome6 name={'envelope'} size={21} color="#000" />
            <Text style={styles.btnText}>Continue with email</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.linePart}>
          <View style={styles.line} />
          <Text style={styles.lineText}>Or login with</Text>
        </View>
        <View style={styles.sclPart}>
          <TouchableOpacity style={styles.sclBtn} onPress={handleGoogle}>
            <Image source={ImageAssets.google} style={styles.icon} />
            <Text style={styles.sclBtnText}>Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NumberLogin;

const styles = StyleSheet.create({
  container: {
    height,
    width,
  },
  image: {
    flex: 1,
    width: '100%',
  },
  part1: {
    flex: 0.55,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  headPart: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  headText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    letterSpacing: 1,
  },
  part1Head: {
    color: '#fff',
    width: '90%',
    fontSize: 32,
    fontFamily: 'Montserrat-Bold',
    position: 'absolute',
    bottom: '30%',
    left: '5%',
  },
  part2Head: {
    color: '#c0c8cc',
    width: '90%',
    fontFamily: 'Montserrat-Light',
    position: 'absolute',
    bottom: '10%',
    left: '5%',
  },
  part2: {
    flex: 0.75,
    backgroundColor: '#fff',
  },
  buttonPart: {
    marginTop: 40,
    gap: 25,
  },
  buttonNumber: {
    width: '85%',
    backgroundColor: '#CAE8D5',
    padding: 12,
    alignItems: 'center',
    borderRadius: 7,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  button: {
    width: '85%',
    backgroundColor: '#c0e863',
    padding: 12,
    alignItems: 'center',
    borderRadius: 7,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  btnText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
  },
  linePart: {
    marginTop: 60,
  },
  line: {
    width: '85%',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 1,
    backgroundColor: 'lightgray',
  },
  lineText: {
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '30%',
    color: '#000',
    marginTop: -10,
    zIndex: 2,
    backgroundColor: '#fff',
    fontFamily: 'Montserrat-Medium',
  },
  sclPart: {
    alignItems: 'center',
    marginTop: '7%',
  },
  sclBtn: {
    width: '80%',
    padding: 12,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'lightgray',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  sclBtnText: {
    color: '#000',
    fontFamily: 'Montserrat-Regular',
  },
  icon: {
    height: 15,
    width: 15,
  },
});
