import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {ImageAssets} from '../../assets/images/ImagesAssets';
import {useLocation} from '../../LocationContext';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const AccountTab = () => {
  const navigation = useNavigation();

  const {uLong, uLat} = useLocation();

  const [locationData, setLocationData] = useState(null);

  const handleSignOut = () => {
    auth().signOut();
    GoogleSignin.signOut().then(() => {
      navigation.replace('NumberLogin');
    });
  };

  const handleAccountCard = () => {
    navigation.navigate('AccountCard');
  };

  const handleTeamHistory = () => {
    navigation.navigate('TeamHistory');
  };

  const handleTeamCard = () => {
    navigation.navigate('TeamCard');
  };

  //User Location

  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${uLat}&lon=${uLong}`;

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setLocationData(data.address.state_district);
      })
      .catch(error => console.log(`Error fetching data`));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topPart}>
        <Image source={ImageAssets.avatar} style={styles.avatar} />
        <Text style={styles.userData}>
          {auth().currentUser.phoneNumber
            ? `${auth().currentUser.phoneNumber}`
            : `${auth().currentUser.email}`}
        </Text>
      </View>
      <View style={styles.locationPart}>
        <FontAwesome6 name={'location-dot'} size={16} color={'#a970ff'} />
        <Text style={styles.locationText}>Nagpur</Text>
      </View>

      <Pressable
        style={[styles.subContainer, styles.aboutUs]}
        onPress={handleAccountCard}>
        <FontAwesome6 name={'pen-to-square'} size={18} color={'#a970ff'} />
        <Text style={styles.subContainerText}>About us</Text>
      </Pressable>

      <Pressable style={styles.subContainer} onPress={handleTeamHistory}>
        <FontAwesome6 name={'user'} solid size={18} color={'#a970ff'} />
        <Text style={styles.subContainerText}>Team history</Text>
      </Pressable>

      <Pressable style={styles.subContainer} onPress={handleTeamCard}>
        <FontAwesome6 name={'users'} solid size={18} color={'#a970ff'} />
        <Text style={styles.subContainerText}>Our Team</Text>
      </Pressable>

      <Pressable style={styles.subContainer} onPress={handleSignOut}>
        <FontAwesome6 name={'right-from-bracket'} size={18} color={'#a970ff'} />
        <Text style={styles.subContainerText}>Sign Out</Text>
      </Pressable>
      {/* <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default AccountTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // button: {
  //   backgroundColor: '#0782F9',
  //   width: '60%',
  //   padding: 15,
  //   borderRadius: 10,
  //   alignItems: 'center',
  //   marginTop: 40,
  // },
  // buttonText: {
  //   color: 'white',
  //   fontWeight: '700',
  //   fontSize: 16,
  // },
  userData: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: 5,
  },
  topPart: {
    marginTop: 50,
    gap: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: 'lightgray',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#a970ff',
    alignSelf: 'center',
  },
  locationPart: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 70,
    alignSelf: 'center',
  },
  locationText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    color: '#a970ff',
  },
  subContainerText: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
  },
  subContainer: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 48,
    gap: 15,
  },
});
