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
        <Text style={styles.headText}>About Us</Text>
        <View></View>
      </View>

      <ScrollView style={styles.textPart}>
        <Text style={styles.text}>
          The "Tour Guide" app was brought to life through the combined efforts
          of a passionate and dedicated team. Sourabh Haldar, serving as the
          Lead Developer (App+ML), brought his expertise to the forefront,
          shaping the app's technical foundation. Aditya Shukla, a skilled ML
          Developer, contributed his knowledge in machine learning to enhance
          the app's capabilities. Meanwhile, the team benefited from the
          analytical and research skills of Akansha Sureka and Anooksha Dhawas,
          who took on the roles of Analysts and Researchers.
        </Text>

        <Text style={styles.text}>
          The motivation to develop the "Tour Guide" app stems from a deep love
          for their country's heritage and culture. Over two years ago, Aditya
          and Sourabh first conceived the idea for this app, driven by their
          shared passion. However, it wasn't until an opportunity presented
          itself during the development of a final year project that the idea
          began to take shape. Joining forces with two fellow batch colleagues,
          the team set out to transform their vision into a reality.
        </Text>

        <Text style={styles.text}>
          The core motivation behind "Tour Guide" is to make travel easier,
          safer, and more enjoyable for people. The team aspires to allow
          travelers to bask in the rich heritage and cultural glory of their
          nation. The vision is to enhance the overall travel experience,
          offering users the chance to explore their true cultural identity and
          history. Looking ahead, the team has ambitious plans to deploy this
          app more widely in the future, ensuring that their mission to make
          travel more enriching and accessible continues to flourish.
        </Text>
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
