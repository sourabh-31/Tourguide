import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  ImageBackground,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ImageAssets} from '../../assets/images/ImagesAssets';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useLocation} from '../../LocationContext';
import {useNavigation} from '@react-navigation/native';

const Search = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const [monument, setMonument] = useState([]);
  const [historic, setHistoric] = useState([]);
  const [cultural, setCultural] = useState([]);
  const [palaces, setPalaces] = useState([]);
  const [historicArchitecture, setHistoricArchitecture] = useState([]);
  const [religion, setReligion] = useState([]);
  const [architecture, setArchitecture] = useState([]);

  const arrays = [
    monument,
    historic,
    cultural,
    palaces,
    historicArchitecture,
    religion,
    architecture,
  ];
  const combinedArray = [];

  for (const array of arrays) {
    for (const item of array) {
      if (!combinedArray.some(existingItem => existingItem.xid === item.xid)) {
        combinedArray.push(item);
      }
    }
  }

  const handleInputChange = text => {
    setQuery(text);

    const filteredPlaces = combinedArray.filter(place =>
      place.name.toLowerCase().includes(text.toLowerCase()),
    );
    setSuggestions(filteredPlaces);
  };

  const {setXid} = useLocation();

  const navigation = useNavigation();

  // Navigate to descriptionTab
  const handleItemPress = xid => {
    navigation.navigate('DescriptionTab');
    setQuery('');
    setXid(xid);
  };

  // Places in india

  useEffect(() => {
    fetchMonumentsData();
    fetchHistoricData();
    fetchCulturalData();
    fetchPalacesData();
    fetchHistoricArchitectureData();
    fetchReligionData();
    fetchArchitectureData();
  }, []);

  // Monuments

  const urlMonument =
    'https://opentripmap-places-v1.p.rapidapi.com/en/places/bbox?lon_max=97.4025614766&lat_min=7.96553477623&lon_min=68.1766451354&lat_max=35.4940095078&kinds=monuments&rate=3';
  const optionsMonument = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '5aae18bfabmsha12810430d930dep1f7f9ajsn5ce9cb13bee5',
      'X-RapidAPI-Host': 'opentripmap-places-v1.p.rapidapi.com',
    },
  };

  const fetchMonumentsData = async () => {
    try {
      const response = await fetch(urlMonument, optionsMonument);
      if (response.ok) {
        const data = await response.json();
        const monumentPlacesData = data.features
          .map(({properties, geometry}) => ({
            name: properties.name,
            coordinates: geometry.coordinates,
            xid: properties.xid,
          }))
          .filter((place, index, self) => {
            // Filter out locations with no names and deduplicate by name
            return (
              place.name !== '' &&
              index === self.findIndex(p => p.name === place.name)
            );
          });

        setMonument(monumentPlacesData);
      } else {
        console.error('Failed to fetch monument from the API.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Historic

  const urlHistoric =
    'https://opentripmap-places-v1.p.rapidapi.com/en/places/bbox?lon_max=97.4025614766&lat_min=7.96553477623&lon_min=68.1766451354&lat_max=35.4940095078&kinds=historic&rate=3';
  const optionsHistoric = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '5aae18bfabmsha12810430d930dep1f7f9ajsn5ce9cb13bee5',
      'X-RapidAPI-Host': 'opentripmap-places-v1.p.rapidapi.com',
    },
  };

  const fetchHistoricData = async () => {
    try {
      const response = await fetch(urlHistoric, optionsHistoric);
      if (response.ok) {
        const data = await response.json();
        const historicPlacesData = data.features
          .map(({properties, geometry}) => ({
            name: properties.name,
            coordinates: geometry.coordinates,
            xid: properties.xid,
          }))
          .filter((place, index, self) => {
            return (
              place.name !== '' &&
              index === self.findIndex(p => p.name === place.name)
            );
          });

        setHistoric(historicPlacesData);
      } else {
        console.error('Failed to fetch historic from the API.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Cultural

  const urlCultural =
    'https://opentripmap-places-v1.p.rapidapi.com/en/places/bbox?lon_max=97.4025614766&lat_min=7.96553477623&lon_min=68.1766451354&lat_max=35.4940095078&kinds=cultural&rate=3';
  const optionsCultural = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '5aae18bfabmsha12810430d930dep1f7f9ajsn5ce9cb13bee5',
      'X-RapidAPI-Host': 'opentripmap-places-v1.p.rapidapi.com',
    },
  };

  const fetchCulturalData = async () => {
    try {
      const response = await fetch(urlCultural, optionsCultural);
      if (response.ok) {
        const data = await response.json();
        const culturalPlacesData = data.features
          .map(({properties, geometry}) => ({
            name: properties.name,
            coordinates: geometry.coordinates,
            xid: properties.xid,
          }))
          .filter((place, index, self) => {
            return (
              place.name !== '' &&
              index === self.findIndex(p => p.name === place.name)
            );
          });

        setCultural(culturalPlacesData);
      } else {
        console.error('Failed to fetch cultural from the API.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Palaces

  const urlPalaces =
    'https://opentripmap-places-v1.p.rapidapi.com/en/places/bbox?lon_max=97.4025614766&lat_min=7.96553477623&lon_min=68.1766451354&lat_max=35.4940095078&kinds=palaces&rate=3';
  const optionsPalaces = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '5aae18bfabmsha12810430d930dep1f7f9ajsn5ce9cb13bee5',
      'X-RapidAPI-Host': 'opentripmap-places-v1.p.rapidapi.com',
    },
  };

  const fetchPalacesData = async () => {
    try {
      const response = await fetch(urlPalaces, optionsPalaces);
      if (response.ok) {
        const data = await response.json();
        const palacesData = data.features
          .map(({properties, geometry}) => ({
            name: properties.name,
            coordinates: geometry.coordinates,
            xid: properties.xid,
          }))
          .filter((place, index, self) => {
            return (
              place.name !== '' &&
              index === self.findIndex(p => p.name === place.name)
            );
          });

        setPalaces(palacesData);
      } else {
        console.error('Failed to fetch Palaces from the API.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Historic Architecture

  const urlHistoricArchitecture =
    'https://opentripmap-places-v1.p.rapidapi.com/en/places/bbox?lon_max=97.4025614766&lat_min=7.96553477623&lon_min=68.1766451354&lat_max=35.4940095078&kinds=historic_architecture&rate=3';
  const optionsHistoricArchitecture = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '5aae18bfabmsha12810430d930dep1f7f9ajsn5ce9cb13bee5',
      'X-RapidAPI-Host': 'opentripmap-places-v1.p.rapidapi.com',
    },
  };

  const fetchHistoricArchitectureData = async () => {
    try {
      const response = await fetch(
        urlHistoricArchitecture,
        optionsHistoricArchitecture,
      );
      if (response.ok) {
        const data = await response.json();
        const historic_architectureData = data.features
          .map(({properties, geometry}) => ({
            name: properties.name,
            coordinates: geometry.coordinates,
            xid: properties.xid,
          }))
          .filter((place, index, self) => {
            return (
              place.name !== '' &&
              index === self.findIndex(p => p.name === place.name)
            );
          });

        setHistoricArchitecture(historic_architectureData);
      } else {
        console.error('Failed to fetch Historic from the API.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Religion

  const urlReligion =
    'https://opentripmap-places-v1.p.rapidapi.com/en/places/bbox?lon_max=97.4025614766&lat_min=7.96553477623&lon_min=68.1766451354&lat_max=35.4940095078&kinds=religion&rate=3';
  const optionsReligion = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '5aae18bfabmsha12810430d930dep1f7f9ajsn5ce9cb13bee5',
      'X-RapidAPI-Host': 'opentripmap-places-v1.p.rapidapi.com',
    },
  };

  const fetchReligionData = async () => {
    try {
      const response = await fetch(urlReligion, optionsReligion);
      if (response.ok) {
        const data = await response.json();
        const religionData = data.features
          .map(({properties, geometry}) => ({
            name: properties.name,
            coordinates: geometry.coordinates,
            xid: properties.xid,
          }))
          .filter((place, index, self) => {
            return (
              place.name !== '' &&
              index === self.findIndex(p => p.name === place.name)
            );
          });
        setReligion(religionData);
      } else {
        console.error('Failed to fetch Religion from the API.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Architecture Data

  const urlArchitecture =
    'https://opentripmap-places-v1.p.rapidapi.com/en/places/bbox?lon_max=97.4025614766&lat_min=7.96553477623&lon_min=68.1766451354&lat_max=35.4940095078&kinds=architecture&rate=3';
  const optionsArchitecture = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '5aae18bfabmsha12810430d930dep1f7f9ajsn5ce9cb13bee5',
      'X-RapidAPI-Host': 'opentripmap-places-v1.p.rapidapi.com',
    },
  };

  const fetchArchitectureData = async () => {
    try {
      const response = await fetch(urlArchitecture, optionsArchitecture);
      if (response.ok) {
        const data = await response.json();
        const architectureData = data.features
          .map(({properties, geometry}) => ({
            name: properties.name,
            coordinates: geometry.coordinates,
            xid: properties.xid,
          }))
          .filter((place, index, self) => {
            return (
              place.name !== '' &&
              index === self.findIndex(p => p.name === place.name)
            );
          });

        setArchitecture(architectureData);
      } else {
        console.error('Failed to fetch Architecture from the API.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ImageBackground
      source={ImageAssets.city}
      style={styles.background}
      resizeMode="cover">
      <View style={styles.topTab}>
        <View style={styles.searchContainer}>
          <FontAwesome6
            name={'magnifying-glass'}
            size={18}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search here"
            placeholderTextColor="gray"
            style={styles.input}
            value={query}
            onChangeText={handleInputChange}
          />
        </View>
        <FontAwesome6 name={'heart'} solid size={27} style={styles.heartIcon} />
      </View>
      {query !== '' && (
        <FlatList
          data={suggestions}
          renderItem={({item}) => (
            <Pressable
              style={styles.item}
              onPress={() => handleItemPress(item.xid)}>
              <FontAwesome6 name={'location-dot'} size={15} color={'#a970ff'} />
              <Text style={styles.itemText}>{item.name}</Text>
            </Pressable>
          )}
          keyExtractor={item => item.xid}
          style={styles.container}
          keyboardShouldPersistTaps="always"
        />
      )}
    </ImageBackground>
  );
};

export default Search;

const styles = StyleSheet.create({
  background: {
    justifyContent: 'flex-end',
  },
  topTab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 15,
    paddingVertical: 30,
    // borderWidth: 2,
    // borderColor: 'red',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    marginRight: -30,
    marginLeft: 15,
    zIndex: 4,
    color: 'gray',
  },
  input: {
    flex: 0.92,
    height: 45,
    borderWidth: 1,
    borderColor: 'lightgray',
    paddingHorizontal: 38,
    borderRadius: 25,
    color: '#000',
    fontFamily: 'Montserrat-Medium',
    alignSelf: 'center',
    backgroundColor: '#fff',
    elevation: 5,
  },
  heartIcon: {
    color: '#a970ff',
  },
  container: {
    backgroundColor: '#fff',
    // padding: 10,
    // borderWidth: 1,
    // borderColor: 'gray',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    zIndex: 2,
    elevation: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    maxHeight: 365,
  },
  item: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  itemText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: '#0c1c2c',
  },
});
