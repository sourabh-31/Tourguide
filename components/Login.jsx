import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {ImageAssets} from '../assets/images/ImagesAssets';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {CommonActions} from '@react-navigation/native';
import MyModal from './MyModal';

const {width, height} = Dimensions.get('screen');

const Login = ({navigation}) => {
  GoogleSignin.configure({
    webClientId:
      '781939602015-n4jbcqbqagm9ok3a48qcdjtat7e2i3i3.apps.googleusercontent.com',
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState('');

  const navigateToNumberLogin = () => {
    navigation.navigate('NumberLogin');
  };

  const navigateToForgot = () => {
    navigation.navigate('Forgot');
  };

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

  const handleSignUp = () => {
    try {
      if (email.length > 0 && password.length > 0) {
        auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            console.log('User created and signed in');
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              // console.log('That email address is already in use!');
              setModalText(
                'That email address is already in use! Please login to continue!',
              );
              setOpenModal(true);
            }

            if (error.code === 'auth/invalid-email') {
              setModalText('The email address is invalid!');
              setOpenModal(true);
            }
          });
      } else {
        setModalText('Fill Out Details!');
        setOpenModal(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = () => {
    try {
      if (email.length > 0 && password.length > 0) {
        auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            console.log('Logged in user successfully');
          })
          .catch(error => {
            if (error.code === 'auth/invalid-login') {
              setModalText('Invalid login credentials!');
              setOpenModal(true);
            }
          });
      } else {
        setModalText('Fill Out Details!');
        setOpenModal(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.part1}>
        <LinearGradient
          colors={['#000', '#1f2e3c', '#0c1c2c']}
          style={styles.gradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 2}}
        />
        <TouchableOpacity onPress={navigateToNumberLogin}>
          <FontAwesome6
            name={'arrow-left-long'}
            size={24}
            color="#c0c8cc"
            marginLeft={22}
            marginTop={20}
          />
        </TouchableOpacity>
        <Text style={styles.part1Head}>Sign in to your account</Text>
        <Text style={styles.part2Head}>Sign in to your account</Text>
      </View>
      <View style={styles.part2}>
        <View style={styles.subPart}>
          <View style={styles.inputPart}>
            <Text style={styles.inputPartText}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>
          <View style={styles.inputPart}>
            <Text style={styles.inputPartTextPassword}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry
            />
          </View>
          <TouchableOpacity onPress={navigateToForgot}>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={{marginTop: 40, gap: 22}}>
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.btnText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.RegBtn]}
            onPress={handleLogin}>
            <Text style={styles.btnText}>Login</Text>
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
        <MyModal prop1={openModal} prop2={setOpenModal} prop3={modalText} />
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    height,
    width,
  },
  part1: {
    flex: 0.25,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  part1Head: {
    color: '#fff',
    fontSize: 32,
    width: 230,
    fontFamily: 'Montserrat-Medium',
    position: 'absolute',
    bottom: '25%',
    left: '5%',
  },
  part2Head: {
    color: '#c0c8cc',
    fontFamily: 'Montserrat-Light',
    position: 'absolute',
    bottom: '12%',
    left: '5%',
  },
  part2: {
    flex: 0.75,
    backgroundColor: '#fff',
  },
  subPart: {
    marginTop: 25,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: 'lightgray',
    paddingHorizontal: 15,
    borderRadius: 7,
    marginTop: -7,
    marginBottom: 20,
    color: '#000',
    fontWeight: '600',
  },
  inputPart: {
    width: '85%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  inputPartText: {
    marginLeft: 7,
    color: 'gray',
    backgroundColor: '#fff',
    width: 50,
    textAlign: 'center',
    zIndex: 2,
    fontFamily: 'Montserrat-Medium',
  },
  inputPartTextPassword: {
    marginLeft: 7,
    color: 'gray',
    backgroundColor: '#fff',
    width: 75,
    textAlign: 'center',
    zIndex: 2,
    fontFamily: 'Montserrat-Medium',
  },
  forgot: {
    position: 'absolute',
    bottom: '0%',
    right: '8%',
    marginBottom: -15,
    color: '#86ad41',
    fontFamily: 'Montserrat-Bold',
  },
  button: {
    width: '85%',
    backgroundColor: '#CAE8D5',
    padding: 12,
    alignItems: 'center',
    borderRadius: 7,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  RegBtn: {
    // backgroundColor: '#CAE8D5',
    backgroundColor: '#c0e863',
  },
  btnText: {
    color: '#000',
    fontSize: 15,
    fontFamily: 'Montserrat-Medium',
  },
  linePart: {
    marginTop: 36,
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
    gap: 20,
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
