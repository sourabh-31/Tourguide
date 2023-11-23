import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import NearbyTopTab from './NearbyTopTab';

const {width, height} = Dimensions.get('window');

const NearbyPlaces = () => {
  const navigation = useNavigation();

  //Navigate to map page
  const handleMapNavigation = () => {
    navigation.navigate('ExploreTab');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heading}>
        <TouchableOpacity onPress={handleMapNavigation}>
          <FontAwesome6
            name={'arrow-left'}
            size={20}
            color="#1f2e3c"
            marginLeft={10}
          />
        </TouchableOpacity>
        <Text style={styles.headText}>Places near me</Text>
        <View></View>
      </View>

      <NearbyTopTab />
      {/* <ScrollView>
        <TouchableOpacity style={styles.testBtn} onPress={handleNearbyPlaces}>
          <Text>Test</Text>
        </TouchableOpacity>
      </ScrollView> */}
    </SafeAreaView>
  );
};

export default NearbyPlaces;

const styles = StyleSheet.create({
  container: {
    width,
    height,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    elevation: 10,
  },
  headText: {
    fontSize: 20,
    fontFamily: 'Montserrat-Medium',
    color: '#000',
    marginRight: 20,
  },
});
