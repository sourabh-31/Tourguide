import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import {useLocation} from '../../LocationContext';

const HomePart2Card = props => {
  const navigateToMorePlaces = () => {
    props.setMorePlaces();
  };

  const navigation = useNavigation();

  const {setDLat, setDLong} = useLocation();

  const navigateToExplore = () => {
    setDLong(props.feature.coordinates[0]);
    setDLat(props.feature.coordinates[1]);
    navigation.navigate('Explore');
  };

  return (
    <View style={styles.part2Card}>
      <TouchableOpacity style={styles.part2Btn} onPress={navigateToExplore}>
        <FontAwesome6
          name={'location-dot'}
          size={35}
          color={'#fff'}
          style={styles.iconBtn}
        />
      </TouchableOpacity>
      <View>
        <Text style={styles.part2LocationName}>{props.feature.name}</Text>
        <View style={styles.part2SubPart}>
          <FontAwesome6 name={'location-dot'} size={14} color={'#a970ff'} />
          <Text style={styles.part2LocationCity}>
            {(props.feature.dist / 1000).toFixed(4)} Km
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.knowBtn} onPress={navigateToMorePlaces}>
        <Text style={styles.btnText}>See more</Text>
        <FontAwesome6 name={'arrow-right'} size={12} color={'#fff'} />
      </TouchableOpacity>
    </View>
  );
};

export default HomePart2Card;

const styles = StyleSheet.create({
  part2Card: {
    marginTop: 25,
    marginBottom: 90,
    width: 330,
    marginLeft: 12,
    marginRight: 5,
    borderRadius: 10,
    paddingVertical: 20,
    backgroundColor: '#fff',
    elevation: 5,
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
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
  knowBtn: {
    position: 'absolute',
    right: 0,
    bottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#0c1c2c',
    width: '30%',
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  btnText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Bold',
    color: '#fff',
    marginLeft: 5,
  },
});
