import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import {ImageAssets} from '../../assets/images/ImagesAssets';

const TeamHistory = () => {
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
        <Text style={styles.headText}>Our Team</Text>
        <View></View>
      </View>

      <ScrollView style={styles.textPart}>
        <View style={styles.userCard}>
          <Image source={ImageAssets.sourabh} style={styles.avatar} />
          <View style={styles.userSubPart}>
            <Text style={styles.userName}>Sourabh Haldar</Text>
            <Text style={styles.userRole}>Developer</Text>
          </View>
        </View>

        <View style={styles.userCard}>
          <Image source={ImageAssets.aditya} style={styles.avatar} />
          <View style={styles.userSubPart}>
            <Text style={styles.userName}>Aditya Shukla</Text>
            <Text style={styles.userRole}>Developer</Text>
          </View>
        </View>

        <View style={styles.userCard}>
          <Image source={ImageAssets.akansha} style={styles.avatar} />
          <View style={styles.userSubPart}>
            <Text style={styles.userName}>Akanksha Sureka</Text>
            <Text style={styles.userRole}>Analyst</Text>
          </View>
        </View>

        <View style={styles.userCard}>
          <Image source={ImageAssets.anooksha} style={styles.avatar} />
          <View style={styles.userSubPart}>
            <Text style={styles.userName}>Anooksha Dhawas</Text>
            <Text style={styles.userRole}>Analyst</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TeamHistory;

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
    marginBottom: 25,
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
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginLeft: 20,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  userName: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
  },
  userRole: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#a970ff',
  },
});
