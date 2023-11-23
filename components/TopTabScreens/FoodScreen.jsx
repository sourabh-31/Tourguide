import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import RestaurantCard from './RestaurantCard';
import MyModal from '../MyModal';
import {useLocation} from '../../LocationContext';

const FoodScreen = () => {
  const {uLat, uLong} = useLocation();

  const [radius, setRadius] = useState(10);

  const [nearbyPlaces, setNearbyPlaces] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState('');

  // Nearby restaurants api

  useEffect(() => {
    handleNearbyRestaurants();
  }, []);

  const url = `https://opentripmap-places-v1.p.rapidapi.com/en/places/radius?radius=${
    radius * 1000
  }&lon=${uLong}&lat=${uLat}&kinds=restaurants`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '94114b1626mshef9550b1b65d345p1a7e27jsnca8e2fafb28c',
      'X-RapidAPI-Host': 'opentripmap-places-v1.p.rapidapi.com',
    },
  };

  const handleNearbyRestaurants = async () => {
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
          .filter((place, index, self) => {
            return (
              place.name !== '' &&
              index === self.findIndex(p => p.name === place.name)
            );
          });

        setNearbyPlaces(placesData);
      } else {
        console.error('Failed to fetch Palaces from the API.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topHead}>
        <TextInput
          placeholder="10"
          placeholderTextColor={'#A970FF'}
          keyboardType="numeric"
          maxLength={2}
          onChangeText={text => setRadius(text)}
          style={styles.inputTop}
        />
        <Text style={styles.topHeadText}>km radius</Text>
        <TouchableOpacity onPress={handleNearbyRestaurants}>
          <FontAwesome6
            name={'arrows-rotate'}
            size={20}
            color="#1f2e3c"
            marginLeft={15}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        {nearbyPlaces.map((feature, index) => (
          <RestaurantCard key={index} feature={feature} />
        ))}
      </ScrollView>

      <MyModal prop1={openModal} prop2={setOpenModal} prop3={modalText} />
    </SafeAreaView>
  );
};

export default FoodScreen;

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
  },
  scroll: {
    marginBottom: 100,
  },
});
