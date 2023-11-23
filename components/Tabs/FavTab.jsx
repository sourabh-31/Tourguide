import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import React from 'react';

const {width, height} = Dimensions.get('window');

const FavTab = () => {
  const openPhoneApp1 = phoneNumber => {
    const tel = `tel:${phoneNumber}`;
    Linking.openURL(tel);
  };

  const openPhoneApp2 = phoneNumber => {
    const tel = `tel:${phoneNumber}`;
    Linking.openURL(tel);
  };

  const openPhoneApp3 = phoneNumber => {
    const tel = `tel:${phoneNumber}`;
    Linking.openURL(tel);
  };

  const openPhoneApp4 = phoneNumber => {
    const tel = `tel:${phoneNumber}`;
    Linking.openURL(tel);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topHead}>
        <Text style={styles.headText}>Emergency contacts</Text>
      </View>

      <View style={styles.part2Card}>
        <TouchableOpacity
          style={styles.part2Btn}
          onPress={() => openPhoneApp1('1363')}>
          <FontAwesome6
            name={'phone'}
            size={35}
            color={'#fff'}
            style={styles.iconBtn}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.part2LocationName}>Tourism govt. of India</Text>
          <View style={styles.part2SubPart}>
            <FontAwesome6 name={'phone'} size={14} color={'#a970ff'} />
            <Text style={styles.part2LocationCity}>1363</Text>
          </View>
        </View>
      </View>

      <View style={styles.part2Card}>
        <TouchableOpacity
          style={styles.part2Btn}
          onPress={() => openPhoneApp2('112')}>
          <FontAwesome6
            name={'phone'}
            size={35}
            color={'#fff'}
            style={styles.iconBtn}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.part2LocationName}>Emergency Response India</Text>
          <View style={styles.part2SubPart}>
            <FontAwesome6 name={'phone'} size={14} color={'#a970ff'} />
            <Text style={styles.part2LocationCity}>112</Text>
          </View>
        </View>
      </View>

      <View style={styles.part2Card}>
        <TouchableOpacity
          style={styles.part2Btn}
          onPress={() => openPhoneApp3('1091')}>
          <FontAwesome6
            name={'phone'}
            size={35}
            color={'#fff'}
            style={styles.iconBtn}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.part2LocationName}>Woman Helpline</Text>
          <View style={styles.part2SubPart}>
            <FontAwesome6 name={'phone'} size={14} color={'#a970ff'} />
            <Text style={styles.part2LocationCity}>1091</Text>
          </View>
        </View>
      </View>

      <View style={styles.part2Card}>
        <TouchableOpacity
          style={styles.part2Btn}
          onPress={() => openPhoneApp4('108')}>
          <FontAwesome6
            name={'phone'}
            size={35}
            color={'#fff'}
            style={styles.iconBtn}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.part2LocationName}>Disaster Management</Text>
          <View style={styles.part2SubPart}>
            <FontAwesome6 name={'phone'} size={14} color={'#a970ff'} />
            <Text style={styles.part2LocationCity}>108</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FavTab;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: '#fff',
  },
  topHead: {
    // marginTop: 25,
    backgroundColor: '#0c1c2c',
    paddingVertical: 15,
    marginBottom: 20,
  },
  headText: {
    fontSize: 19,
    fontFamily: 'Montserrat-Medium',
    color: '#fff',
    alignSelf: 'center',
    marginTop: -2,
  },
  part2Card: {
    marginTop: 25,
    width: '90%',
    // marginLeft: 12,
    // marginRight: 5,
    borderRadius: 10,
    paddingVertical: 20,
    backgroundColor: '#fff',
    elevation: 5,
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },
  part2SubPart: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  part2Btn: {
    backgroundColor: '#0c1c2c',
    width: 70,
    height: 70,
    justifyContent: 'center',
    borderRadius: 50,
    marginLeft: 20,
  },
  iconBtn: {
    alignSelf: 'center',
  },
  part2LocationName: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: '#0c1c2c',
    width: 200,
  },
  part2LocationCity: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: '#a970ff',
  },
});
