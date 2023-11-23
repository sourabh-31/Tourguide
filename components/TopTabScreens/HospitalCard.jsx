import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import {useLocation} from '../../LocationContext';

const HospitalCard = props => {
  const navigation = useNavigation();

  const {setDLat, setDLong} = useLocation();

  const navigateToExplore = () => {
    setDLong(props.hospital.longitude);
    setDLat(props.hospital.latitude);
    navigation.navigate('ExploreTab');
  };

  return (
    <View style={styles.part2Card}>
      <TouchableOpacity style={styles.part2Btn} onPress={navigateToExplore}>
        <FontAwesome6
          name={'hospital'}
          size={35}
          color={'#fff'}
          style={styles.iconBtn}
        />
      </TouchableOpacity>
      <View>
        <Text style={styles.part2LocationName}>{props.hospital.name}</Text>
        <View style={styles.part2SubPart}>
          <FontAwesome6 name={'location-dot'} size={14} color={'#a970ff'} />
          <Text style={styles.part2LocationCity}>
            {props.hospital.distance} Km
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HospitalCard;

const styles = StyleSheet.create({
  part2Card: {
    marginTop: 10,
    marginBottom: 10,
    width: '90%',
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
