import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="xlarge" color="#AB8DD9" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -50,
  },
});

export default Loading;
