import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

const OtpModal = props => {
  const [code, setCode] = useState('');

  const closeModal = () => {
    props.prop2(false);
  };

  const confirmCode = async () => {
    try {
      await props.prop3.confirm(code);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal visible={props.prop1} animationType="slide" transparent={true}>
      <View style={styles.modalView}>
        <View style={styles.insideView}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter Otp"
              value={code}
              onChangeText={text => setCode(text)}
              style={styles.input}
            />
            <TouchableOpacity onPress={confirmCode} style={styles.button}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomPart}>
            <Text style={styles.bottomText}>Didn't recieved otp?</Text>
            <TouchableOpacity onPress={closeModal}>
              <Text style={[styles.bottomText, styles.bottomTextLink]}>
                Try again
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default OtpModal;

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  insideView: {
    backgroundColor: '#fff',
    padding: 15,
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // borderWidth: 1,
    // borderColor: '#000',
    elevation: 20,
  },
  inputContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 55,
  },
  input: {
    width: '80%',
    color: 'black',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderWidth: 1,
    borderColor: 'lightgray',
    fontFamily: 'Montserrat-Medium',
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#c0e863',
    width: '40%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
  },
  bottomPart: {
    marginBottom: 20,
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    marginTop: 10,
  },
  bottomText: {
    fontFamily: 'Montserrat-Medium',
    color: '#000',
  },
  bottomTextLink: {
    color: '#86ad41',
  },
});
