import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import LinearGradient from 'react-native-linear-gradient';
import OtpModal from './OtpModal';

const {width, height} = Dimensions.get('screen');

const Number = ({navigation}) => {
  const [otpModal, setOtpModal] = useState(false);
  const [phone, setPhone] = useState('');
  const [confirm, setConfirm] = useState(null);

  const navigateToNumberLogin = () => {
    navigation.navigate('NumberLogin');
  };

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        navigation.replace('Tab');
      }
    });

    return unsubscribe;
  }, []);

  const handlePhone = async () => {
    const phoneNumber = '+91' + phone;
    console.log(phoneNumber);
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber, true);
    setConfirm(confirmation);
    setOtpModal(true);
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
        <Text style={styles.part1Head}>Sign in with phone number</Text>
        <Text style={styles.part2Head}>Enter your phone number</Text>
      </View>
      <View style={styles.part2}>
        <View style={styles.subPart}>
          <View style={styles.inputPart}>
            <Text style={styles.inputPartText}>Phone number</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={text => setPhone(text)}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handlePhone}>
          <Text style={styles.btnText}>Continue</Text>
        </TouchableOpacity>
        <OtpModal prop1={otpModal} prop2={setOtpModal} prop3={confirm} />
      </View>
    </SafeAreaView>
  );
};

export default Number;

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
    width: 270,
    fontFamily: 'Montserrat-Medium',
    position: 'absolute',
    bottom: '25%',
    left: '7%',
  },
  part2Head: {
    color: '#c0c8cc',
    fontFamily: 'Montserrat-Light',
    position: 'absolute',
    bottom: '12%',
    left: '7.3%',
  },
  part2: {
    flex: 0.75,
    backgroundColor: '#fff',
  },
  subPart: {
    marginTop: 50,
  },
  inputPart: {
    //    borderWidth: 1,
    //    borderColor: 'red',
    width: '85%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  inputPartText: {
    marginLeft: 7,
    color: 'gray',
    backgroundColor: '#fff',
    width: 110,
    textAlign: 'center',
    zIndex: 2,
    fontFamily: 'Montserrat-Medium',
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
    fontFamily: 'Montserrat-Medium',
  },
  button: {
    width: '85%',
    backgroundColor: '#c0e863',
    padding: 12,
    alignItems: 'center',
    borderRadius: 7,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
  },
  btnText: {
    color: '#000',
    fontSize: 15,
    fontFamily: 'Montserrat-Medium',
  },
});
