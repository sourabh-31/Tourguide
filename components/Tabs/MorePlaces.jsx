import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import React, {useState, useEffect} from 'react';
import MorePlacesCard from './MorePlacesCard';
import {useNavigation} from '@react-navigation/native';
import Loading from '../utils/Loading';
import {useLocation} from '../../LocationContext';
import MyModal from '../MyModal';

const {width, height} = Dimensions.get('screen');

const MorePlaces = () => {
  const navigation = useNavigation();

  const [nearbyPlaces, setNearbyPlaces] = useState([]);

  const [radius, setRadius] = useState(10);

  const {uLat, uLong} = useLocation();

  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState('');

  const navigateToHomeScreen = () => {
    navigation.navigate('HomeTab');
  };

  //Nearby places by opentripmap

  useEffect(() => {
    handlePlacesApi();
  }, []);

  const url = `https://opentripmap-places-v1.p.rapidapi.com/en/places/radius?radius=${
    radius * 1000
  }&lon=${uLong}&lat=${uLat}&kinds=interesting_places&rate=3`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '5aae18bfabmsha12810430d930dep1f7f9ajsn5ce9cb13bee5',
      'X-RapidAPI-Host': 'opentripmap-places-v1.p.rapidapi.com',
    },
  };

  const handlePlacesApi = async () => {
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        const placesData = data.features
          .map(({properties, geometry}) => ({
            name: properties.name,
            coordinates: geometry.coordinates,
            dist: properties.dist,
          }))
          .filter(place => place.name !== '');
        setNearbyPlaces(placesData);
      } else {
        console.error('Failed to fetch data from the API.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Modal for radius limit

  useEffect(() => {
    if (radius > 200) {
      setOpenModal(true);
      setModalText('Radius limit exceeded, the limit is 200 km');
    }
  }, [radius]);

  return (
    <SafeAreaView style={styles.container}>
      {nearbyPlaces.length === 0 ? (
        <Loading />
      ) : (
        <>
          <View style={styles.mainHead}>
            <TouchableOpacity
              onPress={navigateToHomeScreen}
              style={styles.arrowBtn}>
              <FontAwesome6 name={'arrow-left'} size={20} color={'#0c1c2c'} />
            </TouchableOpacity>
            <Text style={styles.headText}>Places near me</Text>
            <View></View>
          </View>

          <View style={styles.topHead}>
            <TextInput
              placeholder="10"
              placeholderTextColor={'#A970FF'}
              keyboardType="numeric"
              maxLength={3}
              onChangeText={text => setRadius(text)}
              style={styles.inputTop}
            />
            <Text style={styles.topHeadText}>km radius</Text>
            <TouchableOpacity onPress={handlePlacesApi}>
              <FontAwesome6
                name={'arrows-rotate'}
                size={20}
                color="#a970ff"
                marginLeft={15}
              />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scroll}>
            {nearbyPlaces.map((feature, index) => (
              <MorePlacesCard key={index} feature={feature} />
            ))}
          </ScrollView>
        </>
      )}
      <MyModal prop1={openModal} prop2={setOpenModal} prop3={modalText} />
    </SafeAreaView>
  );
};

export default MorePlaces;

const styles = StyleSheet.create({
  container: {
    width,
    height,
  },
  mainHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
  },
  arrowBtn: {
    marginLeft: 10,
  },
  headText: {
    fontSize: 20,
    fontFamily: 'Montserrat-Medium',
    color: '#000',
    marginRight: 20,
  },
  topHead: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgray',
    paddingHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  topHeadText: {
    color: '#000',
    fontSize: 17,
    fontFamily: 'Montserrat-Medium',
  },
  inputTop: {
    color: '#A970FF',
    fontFamily: 'Montserrat-Medium',
    fontSize: 17,
    height: 40,
    width: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  scroll: {
    marginBottom: '38%',
  },
});
