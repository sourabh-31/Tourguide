import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React from 'react';

const MyModal = props => {
  const closeModal = () => {
    props.prop2(false);
  };

  return (
    <Modal visible={props.prop1} animationType="fade" transparent={true}>
      <View style={styles.modalView}>
        <View style={styles.insideView}>
          <View style={styles.flexView}>
            <Text style={styles.modalText}>{props.prop3}</Text>
            <TouchableOpacity onPress={closeModal}>
              <Text style={{color: '#c0e863', fontFamily: 'Montserrat-Bold'}}>
                Ok
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MyModal;

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  insideView: {
    backgroundColor: 'darkgray',
    padding: 15,
    width: '90%',
    height: '15%',
    borderRadius: 10,
    // elevation: 10,
  },
  flexView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    gap: 15,
  },
  modalText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    color: '#fff',
  },
});
