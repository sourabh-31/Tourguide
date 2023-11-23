import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('screen');

const Forgot = ({navigation}) => {
  const navigateToLogin = () => {
    navigation.navigate('Login');
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
        <TouchableOpacity onPress={navigateToLogin}>
          <FontAwesome6
            name={'arrow-left-long'}
            size={24}
            color="#c0c8cc"
            marginLeft={22}
            marginTop={20}
          />
        </TouchableOpacity>
        <Text style={styles.part1Head}>Forgot Password</Text>
        <Text style={styles.part2Head}>
          Enter your email account to reset password
        </Text>
      </View>
      <View style={styles.part2}>
        <View style={styles.subPart}>
          <View style={styles.inputPart}>
            <Text style={styles.inputPartText}>Email</Text>
            <TextInput style={styles.input} />
          </View>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.btnText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Forgot;

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
    left: '5.3%',
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
    width: 50,
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
    fontWeight: '600',
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
