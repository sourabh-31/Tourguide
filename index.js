/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {LocationProvider} from './LocationContext';

const RootComponent = () => {
  return (
    <LocationProvider>
      <App />
    </LocationProvider>
  );
};

AppRegistry.registerComponent(appName, () => RootComponent);
