import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MapboxGL from '@rnmapbox/maps';
import Geolocation from 'react-native-geolocation-service';
import MyModal from '../MyModal';
import HospitalCard from './HospitalCard';
import {useLocation} from '../../LocationContext';

const HospitalScreen = () => {
  const accessToken =
    'sk.eyJ1IjoiamlueDExIiwiYSI6ImNsbjBrOGM2MjFqZTYybW56MmNyb2JvMjIifQ.kV3GY1hwZClmKRobFRCv5Q';

  MapboxGL.setTelemetryEnabled(false);
  MapboxGL.setWellKnownTileServer('Mapbox');

  const {uLat, uLong} = useLocation();

  const [userLat, setUserLat] = useState(uLat);
  const [userLong, setUserLong] = useState(uLong);
  const [limit, setLimit] = useState(10);

  const [places, setPlaces] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState('');

  // Api for nearby places or POI
  const radiusKm = 10;
  console.log(userLat, userLong);
  const earthRadiusKm = 6371; // Approximate radius of the Earth in kilometers
  const latDelta = (radiusKm / earthRadiusKm) * (180 / Math.PI);
  const lonDelta =
    (radiusKm / (earthRadiusKm * Math.cos((Math.PI / 180) * userLat))) *
    (180 / Math.PI);

  const bbox = [
    userLong - lonDelta,
    userLat - latDelta,
    userLong + lonDelta,
    userLat + latDelta,
  ].join(',');

  const apiUrl =
    'https://api.mapbox.com/search/searchbox/v1/category/health_services';

  const queryParams = new URLSearchParams({
    access_token: accessToken,
    language: 'en',
    limit: limit,
    proximity: `${userLong}, ${userLat}`, // Replace with your desired latitude and longitude
    bbox: bbox,
  });

  const apiUrlWithParams = `${apiUrl}?${queryParams}`;

  useEffect(() => {
    handleNearbyPlaces();
  }, []);

  const handleNearbyPlaces = () => {
    fetch(apiUrlWithParams)
      .then(response => response.json())
      .then(data => {
        const features = data.features;

        // Map the fetched data to an array of places
        const placesArray = features.map(feature => {
          const properties = feature.properties;
          const geometry = feature.geometry;

          const placeLat = geometry.coordinates[1];
          const placeLong = geometry.coordinates[0];

          const distance = calculateDistance(
            userLat,
            userLong,
            placeLat,
            placeLong,
          );

          return {
            name: properties.name,
            address: properties.address,
            type: properties.type,
            latitude: geometry.coordinates[1],
            longitude: geometry.coordinates[0],
            distance: distance,
          };
        });

        // Update the state with the places data
        setPlaces(placesArray);
      })
      .catch(error => {
        // Handle errors
        console.error(error);
      });
  };

  // Calculate distance

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371; // Radius of the Earth in kilometers

    // Convert latitude and longitude from degrees to radians
    const lat1Rad = (lat1 * Math.PI) / 180;
    const lon1Rad = (lon1 * Math.PI) / 180;
    const lat2Rad = (lat2 * Math.PI) / 180;
    const lon2Rad = (lon2 * Math.PI) / 180;

    // Haversine formula
    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1Rad) *
        Math.cos(lat2Rad) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Calculate the distance in kilometers
    const distance = earthRadius * c * 1.60934;

    const newDis = distance.toFixed(2);

    return newDis;
  }

  useEffect(() => {
    if (limit > 25) {
      setOpenModal(true);
      setModalText('Search limit exceeded, the limit is 25');
    }
  }, [limit]);

  return (
    <SafeAreaView>
      <View style={styles.topHead}>
        <TextInput
          placeholder="10"
          placeholderTextColor={'#A970FF'}
          keyboardType="numeric"
          onChangeText={text => setLimit(text)}
          maxLength={2}
          style={styles.inputTop}
        />
        <Text style={styles.topHeadText}>hospitals near me</Text>
        <TouchableOpacity onPress={handleNearbyPlaces}>
          <FontAwesome6
            name={'arrows-rotate'}
            size={20}
            color="#1f2e3c"
            marginLeft={15}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        {places.map((hospital, index) => (
          <HospitalCard key={index} hospital={hospital} />
        ))}
      </ScrollView>

      <MyModal prop1={openModal} prop2={setOpenModal} prop3={modalText} />
    </SafeAreaView>
  );
};

export default HospitalScreen;

const styles = StyleSheet.create({
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
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginHorizontal: 4,
  },
  scroll: {
    marginBottom: 100,
  },
});
