import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ImageAssets} from '../../assets/images/ImagesAssets';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {useLocation} from '../../LocationContext';
import Loading from '../utils/Loading';

const {width, height} = Dimensions.get('screen');

const DescriptionTab = () => {
  const navigation = useNavigation();

  const navigateToHomeScreen = () => {
    navigation.navigate('HomeTab');
  };

  const {xid} = useLocation();

  const [fetchData, setFetchedData] = useState(null);

  const url = `https://opentripmap-places-v1.p.rapidapi.com/en/places/xid/${xid}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '5aae18bfabmsha12810430d930dep1f7f9ajsn5ce9cb13bee5',
      'X-RapidAPI-Host': 'opentripmap-places-v1.p.rapidapi.com',
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        setFetchedData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Call the async function directly
  }, [xid]);

  const {setDLat, setDLong} = useLocation();

  const navigateToExplore = () => {
    setDLong(fetchData.point.lon);
    setDLat(fetchData.point.lat);
    navigation.navigate('Explore');
    // console.log(fetchData.point.lon);
    // console.log(fetchData.point.lat);
  };

  return (
    <SafeAreaView style={styles.container}>
      {!fetchData ? (
        <Loading />
      ) : (
        <>
          <View style={styles.part1}>
            <ImageBackground
              source={
                fetchData.preview.source
                  ? {uri: fetchData.preview.source}
                  : ImageAssets.bg
              }
              style={styles.background}
              resizeMode="cover">
              <LinearGradient
                colors={['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.7)']}
                style={styles.gradient}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
              />
              <View style={styles.part1Content}>
                <TouchableOpacity
                  style={styles.arrowBtn}
                  onPress={navigateToHomeScreen}>
                  <FontAwesome6 name={'arrow-left'} size={20} color={'#fff'} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.heartBtn}>
                  <FontAwesome6
                    name={'heart'}
                    solid
                    size={20}
                    color={'#0c1c2c'}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.part1Text}>
                <Text style={styles.part1Maintext}>
                  {fetchData.name ? fetchData.name : 'Place in India'}
                </Text>
                <View style={styles.part1SubPart}>
                  <FontAwesome6
                    name={'location-dot'}
                    size={16}
                    color={'#fff'}
                  />
                  <Text style={styles.part1SubText}>
                    {fetchData.address.state_district
                      ? fetchData.address.state_district
                      : 'India'}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.knowBtn}
                  onPress={navigateToExplore}>
                  <Text style={styles.btnText}>Get Direction</Text>
                  <FontAwesome6 name={'arrow-right'} size={12} color={'#fff'} />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>

          <View style={styles.part2}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.part2Head}>
                {fetchData.name ? fetchData.name : 'Place in India'}
              </Text>
              <Text style={styles.part2Content}>
                {fetchData.wikipedia_extracts.text
                  ? fetchData.wikipedia_extracts.text
                  : 'It is a tourist place in India.'}
              </Text>
            </ScrollView>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default DescriptionTab;

const styles = StyleSheet.create({
  container: {
    width,
    height,
  },
  background: {
    flex: 1,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  part1: {
    flex: 0.35,
  },
  part2: {
    backgroundColor: '#fff',
    flex: 0.65,
  },
  part1Content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  arrowBtn: {
    backgroundColor: '#0c1c2c',
    marginLeft: 10,
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  heartBtn: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 10,
    marginTop: 20,
  },
  part1Text: {
    marginLeft: 40,
    position: 'relative',
    top: 25,
    width: '90%',
    gap: 3,
  },
  part1Maintext: {
    color: '#fff',
    fontSize: 30,
    fontFamily: 'Montserrat-Bold',
    width: '90%',
  },
  part1SubPart: {
    flexDirection: 'row',
    gap: 7,
    alignItems: 'center',
  },
  part1SubText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
  },
  knowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#0c1c2c',
    width: '30%',
    alignSelf: 'flex-end',
    marginTop: 30,
    paddingVertical: 2,
  },
  btnText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Bold',
    color: '#fff',
    marginLeft: 5,
  },
  part2Head: {
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
    backgroundColor: '#a970ff',
    color: '#fff',
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 20,
    marginTop: 25,
    marginLeft: 12,
  },
  part2Content: {
    color: '#000',
    width: '90%',
    fontSize: 15,
    fontFamily: 'Montserrat-Medium',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 150,
  },
});
