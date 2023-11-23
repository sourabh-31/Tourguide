import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import Loading from '../utils/Loading';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useLocation} from '../../LocationContext';

const CamTab = () => {
  const isFocused = useIsFocused();
  const [isGranted, setIsGranted] = useState(null);
  const device = useCameraDevice('back');

  const camera = useRef(null);

  const navigation = useNavigation();

  const {setImageData} = useLocation();

  useEffect(() => {
    checkPermission();

    if (isFocused == false) {
      setIsGranted('denied');
    } else {
      setIsGranted('granted');
    }
  }, [isFocused]);

  console.log(isFocused);

  const checkPermission = async () => {
    const cameraPermission = await Camera.requestCameraPermission();
    if (cameraPermission === 'granted') {
      setIsGranted('granted');
    } else {
      setIsGranted('denied');
    }
  };

  if (device == null) return <Loading />;

  const takePicture = async () => {
    const photo = await camera.current.takePhoto();
    setImageData(photo.path);
    console.log(photo.path);
    navigation.navigate('CloudVisionTab');
  };

  return (
    <View style={styles.container}>
      {isGranted === 'granted' ? (
        <Camera
          ref={camera}
          style={styles.camera}
          device={device}
          isActive={isFocused}
          photo
        />
      ) : isGranted === 'denied' ? (
        <Text>
          Camera access denied. Please enable camera access in your settings.
        </Text>
      ) : (
        <Loading /> // Display a loading component or placeholder
      )}
      <TouchableOpacity style={styles.btn} onPress={() => takePicture()}>
        <View style={styles.innerCircle}></View>
      </TouchableOpacity>
    </View>
  );
};

export default CamTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  btn: {
    width: 65,
    height: 65,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'center',
    bottom: 120,
  },
  innerCircle: {
    width: 55,
    height: 55,
    borderRadius: 40,
    backgroundColor: '#AB8DD9',
  },
});
