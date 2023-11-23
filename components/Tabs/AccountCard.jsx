import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';

const AccountCard = () => {
  const navigation = useNavigation();

  const navigateToAccountTab = () => {
    navigation.navigate('AccountTab');
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainHead}>
        <TouchableOpacity
          onPress={navigateToAccountTab}
          style={styles.arrowBtn}>
          <FontAwesome6 name={'arrow-left'} size={20} color={'#0c1c2c'} />
        </TouchableOpacity>
        <Text style={styles.headText}>About Us</Text>
        <View></View>
      </View>

      <ScrollView style={styles.textPart}>
        <Text style={styles.text}>
          In response to the dynamic and ever evolving tourism landscape, we
          proudly present "Tour Guide," our mobile application designed to
          redefine the way travelers experience monuments. Through the
          innovative use of image recognition technology, "Tour Guide" swiftly
          identifies nearby monuments, addressing the increasing demand for
          immersive and informative travel experiences. More than mere
          identification, our application offers engaging narratives, delving
          into the historical and cultural context of these remarkable
          landmarks, fostering a deeper connection between travelers and the
          sites they explore.
        </Text>

        <Text style={styles.text}>
          However, our commitment extends beyond the narrative. Recognizing the
          practical aspects of travel, "Tour Guide" provides essential
          location-based information, from dining options to nearby
          accommodations and attractions, effectively eliminating the need for
          time-consuming online searches or inquiries for directions. At the
          core of our mission is user-friendliness, ensuring that individuals
          with varying levels of technological proficiency can navigate "Tour
          Guide" with ease.
        </Text>

        <Text style={styles.text}>
          But there's more: our commitment to traveler safety is exemplified
          through our SOS page, featuring one-click access to authorities. In
          critical situations, users can swiftly call for assistance, enhancing
          not only the travel experience but also the peace of mind of our "Tour
          Guide" users.
        </Text>

        <Text style={styles.text}>
          We believe that the "Tour Guide" app has the potential to transform
          how tourists engage with monuments, enriching their educational and
          practical travel experiences. Our app embodies the intersection of
          state-of-the-art technology and the timeless allure of cultural
          exploration, poised to shape the future of monument-based tourism in
          an era where immersive and informative travel experiences are highly
          sought after.
        </Text>
      </ScrollView>
    </View>
  );
};

export default AccountCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    elevation: 5,
    marginBottom: 15,
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
  textPart: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 60,
  },
  text: {
    color: '#000',
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    marginTop: 10,
  },
});
