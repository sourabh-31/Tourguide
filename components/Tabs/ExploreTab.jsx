import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MapboxGL from '@rnmapbox/maps';
import MapboxPlacesAutocomplete from 'react-native-mapbox-places-autocomplete';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import {useLocation} from '../../LocationContext';

MapboxGL.setAccessToken(
  'sk.eyJ1IjoiamlueDExIiwiYSI6ImNsbjBrOGM2MjFqZTYybW56MmNyb2JvMjIifQ.kV3GY1hwZClmKRobFRCv5Q',
);
// MapboxGL.setConnected(true);
MapboxGL.setTelemetryEnabled(false);
MapboxGL.setWellKnownTileServer('Mapbox');

const ExploreTab = () => {
  const navigation = useNavigation();

  const accessToken =
    'sk.eyJ1IjoiamlueDExIiwiYSI6ImNsbjBrOGM2MjFqZTYybW56MmNyb2JvMjIifQ.kV3GY1hwZClmKRobFRCv5Q';

  const [LocationData, setLocationData] = useState(null);

  const {uLat, uLong, dLat, dLong} = useLocation();

  const [mLat, setMLat] = useState(uLat);
  const [mLong, setMLong] = useState(uLong);

  const [origin, setOrigin] = useState(null);

  const [coordinates, setCoordinates] = useState({lng: 0, lat: 0});

  const mapRef = useRef(null);

  const [routeDirections, setRouteDirections] = useState(null);

  const [locationArea, setLocationArea] = useState(false);

  const [zoomLevel, setZoomLevel] = useState(0);

  useEffect(() => {
    // This code will run whenever 'origin' changes.
    console.log('Origin:', origin);
  }, [origin]);

  useEffect(() => {
    newLocationCoordinate();
    setRouteDirections(null);
  }, [dLat, dLong]);

  useEffect(() => {
    resetMarker();
  }, []);

  const newLocationCoordinate = () => {
    setMLat(dLat);
    setMLong(dLong);

    const distance = calculateDistance(uLat, uLong, mLat, mLong);

    const zoomLevel = calculateZoomLevel(distance);

    if (mapRef.current) {
      mapRef.current.setCamera({
        centerCoordinate: [dLong, dLat],
        animationDuration: 600,
        zoomLevel: zoomLevel,
      });
    }
  };

  // Movable Marker

  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coordinates.lat}&lon=${coordinates.lng}`;

  const onMarkerDrag = event => {
    const {geometry} = event;
    const {coordinates} = geometry;
    const [longitude, latitude] = coordinates;
    setMLong(longitude);
    setMLat(latitude);
    setCoordinates({lng: longitude, lat: latitude});

    setRouteDirections(null);

    mapRef.current.setCamera({
      centerCoordinate: [longitude, latitude],
      animationDuration: 600,
    });
  };

  const onMarkerDragEnd = () => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setLocationData(data);
        setLocationArea(true);
        console.log(data.display_name);
      })
      .catch(error => console.log(`Error fetching data`));
  };

  // Calculate distance

  function calculateDistance(userLat, userLong, placeLat, placeLong) {
    // Convert latitude and longitude from degrees to radians
    const deg2rad = angle => angle * (Math.PI / 180);
    const radUserLat = deg2rad(userLat);
    const radUserLong = deg2rad(userLong);
    const radPlaceLat = deg2rad(placeLat);
    const radPlaceLong = deg2rad(placeLong);

    // Radius of the Earth in kilometers (mean value)
    const earthRadius = 6371;

    // Haversine formula
    const dLat = radPlaceLat - radUserLat;
    const dLong = radPlaceLong - radUserLong;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(radUserLat) *
        Math.cos(radPlaceLat) *
        Math.sin(dLong / 2) *
        Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Calculate the distance
    const distance = earthRadius * c;

    return distance;
  }

  // Calculate an appropriate zoom level based on the distance

  function calculateZoomLevel(distance) {
    const maxZoom = 10;
    let zoomLevel = maxZoom - distance / 70;

    if (zoomLevel > 9.8) {
      zoomLevel = 12;
    }
    return Math.max(zoomLevel, 3);
  }

  // Route Feature

  function makeRouterFeature(coordinates) {
    let routerFeature = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: coordinates,
          },
        },
      ],
    };
    return routerFeature;
  }

  async function createRouterLine() {
    const profile = 'mapbox/driving';
    const startCoords = `${uLong},${uLat}`;
    const endCoords = `${mLong},${mLat}`;
    const geometries = 'geojson';

    const url = `https://api.mapbox.com/directions/v5/${profile}/${startCoords};${endCoords}?alternatives=true&geometries=${geometries}&steps=true&banner_instructions=true&overview=full&voice_instructions=true&access_token=${accessToken}`;

    try {
      let response = await fetch(url);
      let json = await response.json();
      // const data = json.routes.map(data => {
      //   console.log(data);
      // });

      let coordinates = json['routes'][0]['geometry']['coordinates'];
      if (coordinates.length) {
        const routerFeature = makeRouterFeature([...coordinates]);
        setRouteDirections(routerFeature);
      }
    } catch (error) {
      console.error(error);
    }
  }

  //Recenter Map
  const recenterMapToUserLocation = () => {
    if (mapRef.current) {
      mapRef.current.setCamera({
        centerCoordinate: [uLong, uLat],
        animationDuration: 600,
      });
    }
  };

  //Get directions button function

  const getDirections = () => {
    // setMLat(latitude);
    // setMLong(longitude);
    createRouterLine();
    const distance = calculateDistance(uLat, uLong, mLat, mLong);

    const zoomLevel = calculateZoomLevel(distance);

    mapRef.current.setCamera({
      animationDuration: 600,
      zoomLevel: zoomLevel,
    });
  };

  // Location area

  const hideLocationArea = () => {
    setLocationArea(false);
  };

  //Reset marker

  const resetMarker = () => {
    setMLat(uLat);
    setMLong(uLong);

    if (mapRef.current) {
      mapRef.current.setCamera({
        centerCoordinate: [uLong, uLat],
        animationDuration: 600,
        zoomLevel: 15,
      });
    }
    setRouteDirections(null);
  };

  //Handle nearby places

  const handleNearbyPlaces = () => {
    navigation.navigate('NearbyPlaces');
  };

  return (
    <View style={styles.container}>
      <MapboxGL.MapView
        style={styles.map}
        zoomEnabled={true}
        scaleBarEnabled={false}
        styleURL="mapbox://styles/mapbox/streets-v12"
        rotateEnabled={true}>
        <MapboxGL.Camera
          ref={mapRef}
          zoomLevel={15}
          centerCoordinate={[uLong, uLat]}
          pitch={10}
          animationMode={'flyTo'}
          animationDuration={6000}
        />

        {routeDirections && (
          <MapboxGL.ShapeSource id="line1" shape={routeDirections}>
            <MapboxGL.LineLayer
              id="routerLine01"
              style={{
                lineColor: '#ab00ff',
                lineWidth: 4,
              }}
            />
          </MapboxGL.ShapeSource>
        )}

        <MapboxGL.PointAnnotation
          id="marker"
          coordinate={[uLong, uLat]}
          //   onSelected={onMarkerPress}
        >
          <View />
        </MapboxGL.PointAnnotation>

        <MapboxGL.PointAnnotation
          id="marker2"
          coordinate={[mLong, mLat]}
          draggable={true}
          onDrag={onMarkerDrag}
          onDragEnd={onMarkerDragEnd}>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 50,
              backgroundColor: '#ab00ff',
            }}
          />
        </MapboxGL.PointAnnotation>
      </MapboxGL.MapView>
      {/* <View style={styles.coordinates}>
        <Text>
          Longitude: {coordinates.lng.toFixed(6)}
          Latitude: {coordinates.lat.toFixed(6)}
        </Text>
      </View> */}
      {/* <TextInput
        placeholder="Search"
        placeholderTextColor="#000"
        style={styles.input}
        value={LocationData?.display_name}
      /> */}

      <TouchableOpacity style={styles.directionBtn} onPress={getDirections}>
        <Text style={styles.directionText}>Get Directions</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.nearbyBtn} onPress={handleNearbyPlaces}>
        <FontAwesome6 name={'shop'} size={20} color={'#0c1c2c'} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.centerBtn}
        onPress={recenterMapToUserLocation}>
        <FontAwesome6
          name={'location-crosshairs'}
          size={20}
          color={'#0c1c2c'}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.resetBtn} onPress={resetMarker}>
        <FontAwesome6 name={'xmark'} size={20} color={'#fff'} />
      </TouchableOpacity>

      {locationArea && (
        <View style={styles.locationArea}>
          <Text style={styles.locationInput} numberOfLines={2}>
            {LocationData?.display_name}
          </Text>
          <TouchableOpacity style={styles.crossIcon} onPress={hideLocationArea}>
            <FontAwesome6
              name={'circle-xmark'}
              solid
              size={16}
              color={'#0c1c2c'}
            />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.autocompleteContainer}>
        <MapboxPlacesAutocomplete
          id="origin"
          placeholder="Search here"
          accessToken="pk.eyJ1IjoiamlueDExIiwiYSI6ImNsbjBmYjIxazBteTEyamxrZ29xcnB2dG0ifQ.mXDIZ8SNJRMpzemScz_FxQ"
          onPlaceSelect={data => {
            setOrigin(data.geometry.coordinates);
            setMLong(data.geometry.coordinates[0]);
            setMLat(data.geometry.coordinates[1]);

            const distance = calculateDistance(
              uLat,
              uLong,
              data.geometry.coordinates[1],
              data.geometry.coordinates[0],
            );
            console.log(distance);

            const zoomLevel = calculateZoomLevel(distance);

            setZoomLevel(zoomLevel);

            mapRef.current.setCamera({
              centerCoordinate: [
                data.geometry.coordinates[0],
                data.geometry.coordinates[1],
              ],
              animationDuration: 600,
              zoomLevel: zoomLevel,
            });
            // console.log(origin);
            // setDestination(null);
          }}
          onClearInput={({id}) => {
            id === 'origin' && setOrigin(null);
          }}
          countryId="in"
          containerStyle={{
            backgroundColor: '#fff',
            fontFamily: 'Montserrat-Medium',
            fontSize: 20,
          }}
          inputStyle={{
            backgroundColor: '#fff',
            height: 35,
            marginTop: 5,
            fontFamily: 'Montserrat-Medium',
          }}
        />
      </View>
    </View>
  );
};

export default ExploreTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coordinates: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    bottom: 80,
    left: 10,
    padding: 10,
    margin: 0,
    fontSize: 11,
    lineHeight: 18,
    borderRadius: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // input: {
  //   width: '90%',
  //   height: 50,
  //   position: 'absolute',
  //   marginTop: 80,
  //   borderRadius: 30,
  //   alignSelf: 'center',
  //   paddingHorizontal: 20,
  //   backgroundColor: '#fff',
  //   color: '#000',
  // },
  autocompleteContainer: {
    width: '90%',
    height: 50,
    position: 'absolute',
    marginTop: 20,
    borderRadius: 25,
    alignSelf: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: '#000',
    elevation: 10,
  },
  nearbyBtn: {
    width: 50,
    height: 50,
    borderRadius: 50,
    position: 'absolute',
    bottom: 80,
    right: 80,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  centerBtn: {
    width: 50,
    height: 50,
    borderRadius: 50,
    position: 'absolute',
    bottom: 80,
    right: 140,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  resetBtn: {
    width: 50,
    height: 50,
    borderRadius: 50,
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#0c1c2c',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    // borderWidth: 2,
    // borderColor: '#1f2e3c',
  },
  directionBtn: {
    backgroundColor: '#0c1c2c',
    position: 'absolute',
    bottom: 80,
    left: 10,
    width: '40%',
    borderRadius: 25,
    paddingVertical: 14,
    elevation: 5,
  },
  directionText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
  },
  locationInput: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 35,
    backgroundColor: '#fff',
    color: '#000',
    elevation: 10,
    zIndex: 6,
    fontFamily: 'Montserrat-Medium',
  },
  locationArea: {
    zIndex: 6,
    width: '90%',
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  crossIcon: {
    marginLeft: -30,
    zIndex: 6,
  },
});
