import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import {useLocation} from '../../LocationContext';
import axios from 'axios';
import ImgToBase64 from 'react-native-image-base64';
import Loading from '../utils/Loading';
import Tts from 'react-native-tts';

const {width, height} = Dimensions.get('window');

const CloudVisionTab = () => {
  const {imageData} = useLocation();

  const [landmark, setLandMark] = useState('');

  const [story, setStory] = useState('');

  const [isSpeaking, setIsSpeaking] = useState(false);

  const navigation = useNavigation();

  const navigateToCamTab = () => {
    navigation.navigate('CamTab');
  };

  useEffect(() => {
    toBase64();
  }, []);

  const toBase64 = () => {
    ImgToBase64.getBase64String(`file://${imageData}`)
      .then(base64String => analyzeImage(base64String))
      .catch(err => console.log(err));
  };

  const toggleTTS = () => {
    if (isSpeaking) {
      // If TTS is currently speaking, stop it
      Tts.stop();
      setIsSpeaking(false);
    } else {
      // If TTS is not speaking, start speaking the story
      Tts.speak(story, {
        androidParams: {
          KEY_PARAM_PAN: -1,
          KEY_PARAM_VOLUME: 1,
        },
      });
      setIsSpeaking(true);
    }
  };

  const analyzeImage = async base64String => {
    try {
      const apiKey = 'AIzaSyCEgzrGBZJYyQNz7xaZJqvnMxSNcuiOZ8k';
      const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

      // Create a request object
      const requestData = {
        requests: [
          {
            image: {
              content: base64String,
            },
            features: [
              {
                type: 'LANDMARK_DETECTION',
              },
            ],
          },
        ],
      };

      const apiResponse = await axios.post(apiUrl, requestData);

      // Check the response status code and process the response as needed
      if (apiResponse.status === 200) {
        const responseJSON = apiResponse.data;

        // Access the landmarkAnnotations from the response
        const landmarkAnnotations =
          responseJSON.responses[0].landmarkAnnotations;

        if (landmarkAnnotations && landmarkAnnotations.length > 0) {
          // Extract the description (name) of the landmark
          const landmarkName = landmarkAnnotations[0].description;
          setLandMark(landmarkName);
        } else {
          console.log('No landmark found in the response');
          setLandMark('Not recognized');
        }
      } else {
        console.error(`Error analyzing the image: ${apiResponse.statusText}`);
      }
    } catch (error) {
      // Handle any potential errors
      console.error(error);
    }
  };

  //Open-AI

  const apiKey = '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'; // Replace with your actual OpenAI API key

  const generateStory = async () => {
    setStory('');
    if (!apiKey) {
      console.error('OpenAI API key is missing.');
      return;
    }

    const prompt = `Generate a story about the monument ${landmark}. This monument is a symbol of history, culture, and human achievement. Once upon a time, in a land of rich heritage, the ${landmark} stood tall, witnessing the passage of time.`;

    // Make a request to the OpenAI GPT-3 API using axios
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/davinci/completions',
        {
          prompt,
          max_tokens: 500, // Adjust the length for a longer story
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const generatedStory = response.data.choices[0].text;

      setStory(generatedStory);
    } catch (error) {
      console.error('Error generating the story:', error);
      setStory('An error occurred while generating the story.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {landmark === '' ? (
        <Loading />
      ) : (
        <>
          <View style={styles.imagePart}>
            <ImageBackground
              source={{uri: 'file://' + imageData}}
              style={styles.backgroundImage}>
              <LinearGradient
                colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.2)']}
                style={styles.gradient}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 0}}
              />
              <View style={styles.icon}>
                <TouchableOpacity
                  style={styles.arrowBtn}
                  onPress={navigateToCamTab}>
                  <FontAwesome6 name={'arrow-left'} size={20} color={'#fff'} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.speakerBtn} onPress={toggleTTS}>
                  <FontAwesome6
                    name={'volume-high'}
                    size={18}
                    color={'#0c1c2c'}
                  />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>

          <View style={styles.textPart}>
            <View style={styles.texHead}>
              <Text style={styles.textPartHead}>
                {landmark ? landmark : 'Place in India'}
              </Text>

              <TouchableOpacity
                style={styles.refreshBtn}
                onPress={generateStory}>
                <FontAwesome6 name={'arrows-rotate'} size={20} color={'#fff'} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.descriptionPart}>
              {story === '' ? (
                <ActivityIndicator
                  size="xlarge"
                  color="#AB8DD9"
                  style={styles.loader}
                />
              ) : (
                <Text style={styles.descriptionText}>{story ? story : ''}</Text>
              )}
            </ScrollView>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default CloudVisionTab;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: '#fff',
  },
  imagePart: {
    flex: 0.3,
  },
  textPart: {
    flex: 0.7,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  arrowBtn: {
    backgroundColor: '#0c1c2c',
    marginLeft: 10,
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textPartHead: {
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
    backgroundColor: '#a970ff',
    color: '#fff',
    // alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 20,
    marginLeft: 12,
  },
  texHead: {
    flexDirection: 'row',
    marginTop: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  speakerBtn: {
    backgroundColor: '#fff',
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  refreshBtn: {
    backgroundColor: '#0c1c2c',
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  descriptionPart: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 60,
  },
  descriptionText: {
    color: '#000',
    fontSize: 15,
    fontFamily: 'Montserrat-Medium',
  },
  loader: {
    marginTop: 100,
  },
});
