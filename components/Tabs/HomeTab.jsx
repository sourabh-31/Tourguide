import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import HomePart1Card from './HomePart1Card';
import HomePart2Card from './HomePart2Card';
import {useNavigation} from '@react-navigation/native';
import Loading from '../utils/Loading';
import {useLocation} from '../../LocationContext';
import Search from '../utils/Search';

const {width, height} = Dimensions.get('screen');

const HomeTab = () => {
  const locationData = {
    tajMahal: {
      id: 1,
      name: 'Taj Mahal',
      city: 'Agra',
      link: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGFqJTIwbWFoYWx8ZW58MHx8MHx8fDA%3D',
      xid: 'W375257537',
    },
    hawaMahal: {
      id: 2,
      name: 'Hawa Mahal',
      city: 'Jaipur',
      link: 'https://images.unsplash.com/photo-1617516202907-ff75846e6667?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aGF3YSUyMG1haGFsfGVufDB8fDB8fHww',
      xid: 'N542886858',
    },
    ajantaCaves: {
      id: 3,
      name: 'Ajanta Caves',
      city: 'Aurangabad',
      link: 'https://plus.unsplash.com/premium_photo-1697729588485-6c238cf3ab2f?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGFqYW50YSUyMGFuZCUyMGVsbG9yYSUyMGNhdmVzfGVufDB8fDB8fHww',
      xid: 'W115567314',
    },
    lotusTemple: {
      id: 4,
      name: 'Lotus Temple',
      city: 'Delhi',
      link: 'https://media.istockphoto.com/id/486867874/photo/lotus-temple-new-delhi-india-cngltrv1109.jpg?s=612x612&w=0&k=20&c=zSGS3TbyQ6suiRrMwZGJDWkjvz_uAtZdrgTP6LM-qEE=',
      xid: 'W44827278',
    },
    amerFort: {
      id: 5,
      name: 'Amber Fort',
      city: 'Jaipur',
      link: 'https://images.unsplash.com/photo-1592385692039-e8ff4c6b7a66?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGFtZXIlMjBmb3J0fGVufDB8fDB8fHww',
      xid: 'N2598753117',
    },
    mysorePalace: {
      id: 6,
      name: 'Mysore Palace',
      city: 'Mysuru',
      link: 'https://media.istockphoto.com/id/172124032/photo/mysore-palace-at-dusk.jpg?s=612x612&w=0&k=20&c=paO74C_dVsY14IbK0RNqs0TD-lSteQy-AW5CnQFEb_4=',
      xid: 'W656323590',
    },
    bulandDarwaza: {
      id: 7,
      name: 'Buland Darwaza',
      city: 'Agra',
      link: 'https://media.istockphoto.com/id/610049474/photo/buland-darwaza.jpg?s=612x612&w=0&k=20&c=GCBy9km2s8mPU7hp5B-tdrh3wRAYG8yZG06GNErxjV4=',
      xid: 'N655321807',
    },
    gateway: {
      id: 8,
      name: 'Gateway of India',
      city: 'Mumbai',
      link: 'https://media.istockphoto.com/id/1307189136/photo/gateway-of-india-mumbai-maharashtra-monument-landmark-famous-place-magnificent-view-without.jpg?s=612x612&w=0&k=20&c=gGzzkXY5bAVbRbokzrjvkt7Ve-Z3yzSVN04NaMqyBB8=',
      xid: 'W28845634',
    },
    redFort: {
      id: 9,
      name: 'Red Fort',
      city: 'Delhi',
      link: 'https://media.istockphoto.com/id/530741074/photo/red-fort-lal-qila-with-indian-flag-delhi-india.jpg?s=612x612&w=0&k=20&c=7BTI-dgQNPPTq2yARrwIBf2yIqO4PUPX1EJY5ITIyoM=',
      xid: 'W264863907',
    },
    goldenTemple: {
      id: 10,
      name: 'Golden Temple',
      city: 'Amritsar',
      link: 'https://media.istockphoto.com/id/478673422/photo/golden-temple-amritsar.jpg?s=612x612&w=0&k=20&c=LvdukkiiqHZmQxOTjf9UPGHcWldxaFLIZc8k2FEFxfM=',
      xid: 'W705233057',
    },
  };

  const navigation = useNavigation();

  const {uLat, uLong} = useLocation();

  const [nearbyPlaces, setNearbyPlaces] = useState([]);

  const setDescription = () => {
    navigation.navigate('DescriptionTab');
  };

  const setMorePlaces = () => {
    navigation.navigate('MorePlacesTab');
  };

  //Nearby places by opentripmap

  useEffect(() => {
    handlePlacesApi();
  }, []);

  const url = `https://opentripmap-places-v1.p.rapidapi.com/en/places/radius?radius=50000&lon=${uLong}&lat=${uLat}&kinds=interesting_places&limit=16`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '94114b1626mshef9550b1b65d345p1a7e27jsnca8e2fafb28c',
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
          .filter(place => place.name !== ''); // Filter out locations with no names
        setNearbyPlaces(placesData);
      } else {
        console.error(
          `Failed to fetch nearby from the API. Status: ${response.status}`,
        );
        const errorData = await response.text(); // Get the error message from the response
        console.error(errorData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {nearbyPlaces.length === 0 ? (
        <Loading />
      ) : (
        <>
          <Search />
          <ScrollView
            style={styles.scroll}
            showsVerticalScrollIndicator={false}>
            <View style={styles.part1}>
              <Text style={styles.part1HeadText}>Best places in India</Text>
            </View>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {Object.keys(locationData).map(locationId => (
                <HomePart1Card
                  key={locationData[locationId].id}
                  location={locationData[locationId]}
                  setDescription={setDescription}
                />
              ))}
            </ScrollView>

            <View style={styles.part2Whole}>
              <View style={styles.part2}>
                <Text style={styles.part2HeadText}>Places near me</Text>
              </View>
              <TouchableOpacity
                style={styles.refreshBtn}
                onPress={handlePlacesApi}>
                <FontAwesome6
                  name={'arrows-rotate'}
                  size={25}
                  color="#a970ff"
                />
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {nearbyPlaces.map((feature, index) => (
                <HomePart2Card
                  key={index}
                  feature={feature}
                  setMorePlaces={setMorePlaces}
                />
              ))}
            </ScrollView>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

export default HomeTab;

const styles = StyleSheet.create({
  container: {
    height,
    width,
  },
  scroll: {
    marginBottom: 60,
  },
  // background: {
  //   justifyContent: 'flex-end',
  // },
  // topTab: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-evenly',
  //   paddingHorizontal: 15,
  //   paddingVertical: 30,
  //   // borderWidth: 2,
  //   // borderColor: 'red',
  //   borderBottomLeftRadius: 3,
  //   borderBottomRightRadius: 3,
  // },
  // searchContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // searchIcon: {
  //   marginRight: -30,
  //   marginLeft: 15,
  //   zIndex: 4,
  //   color: 'gray',
  // },
  // input: {
  //   flex: 0.92,
  //   height: 45,
  //   borderWidth: 1,
  //   borderColor: 'lightgray',
  //   paddingHorizontal: 38,
  //   borderRadius: 25,
  //   color: '#000',
  //   fontFamily: 'Montserrat-Medium',
  //   alignSelf: 'center',
  //   backgroundColor: '#fff',
  //   elevation: 5,
  // },
  // heartIcon: {
  //   color: '#a970ff',
  // },
  part1: {
    marginTop: 30,
    marginLeft: 15,
    backgroundColor: '#0c1c2c',
    width: 230,
    paddingVertical: 10,
    borderRadius: 25,
  },
  part1HeadText: {
    fontSize: 19,
    fontFamily: 'Montserrat-Medium',
    color: '#fff',
    alignSelf: 'center',
    marginTop: -2,
  },
  part2Whole: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  part2: {
    marginTop: 25,
    marginLeft: 15,
    backgroundColor: '#0c1c2c',
    width: 190,
    paddingVertical: 10,
    borderRadius: 25,
  },
  part2HeadText: {
    fontSize: 19,
    fontFamily: 'Montserrat-Medium',
    color: '#fff',
    alignSelf: 'center',
    marginTop: -2,
  },
  refreshBtn: {
    marginRight: 25,
    marginTop: 25,
  },
});
