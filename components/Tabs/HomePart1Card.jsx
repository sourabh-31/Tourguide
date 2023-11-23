import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useLocation} from '../../LocationContext';

const HomePart1Card = props => {
  const {xid, setXid} = useLocation();

  const navigateToDescription = () => {
    setXid(props.location.xid);
    // console.log(xid);
    props.setDescription();
  };

  return (
    <View style={styles.part1Card}>
      <Image source={{uri: props.location.link}} style={styles.img} />
      <View style={styles.locationMainPart}>
        <Text style={styles.locationName}>{props.location.name}</Text>
        <View style={styles.locationPart}>
          <FontAwesome6 name={'location-dot'} size={14} color={'#a970ff'} />
          <Text style={styles.locationCity}>{props.location.city}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={navigateToDescription} style={styles.knowBtn}>
        <Text style={styles.btnText}>Know more</Text>
        <FontAwesome6 name={'arrow-right'} size={12} color={'#fff'} />
      </TouchableOpacity>
    </View>
  );
};

export default HomePart1Card;

const styles = StyleSheet.create({
  part1Card: {
    marginTop: 25,
    width: 330,
    height: 250,
    marginLeft: 12,
    marginRight: 5,
    borderRadius: 5,
    paddingBottom: 25,
    backgroundColor: '#fff',
    elevation: 5,
    marginBottom: 20,
  },
  img: {
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'center',
    width: '92%',
    height: '70%',
  },
  locationMainPart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  locationName: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: '#0c1c2c',
    marginLeft: 15,
  },

  locationPart: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    gap: 3,
  },
  locationCity: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: '#a970ff',
  },
  knowBtn: {
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
