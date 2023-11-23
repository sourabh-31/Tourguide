import React, {useEffect, useState} from 'react';
import {Easing, LogBox} from 'react-native';
import 'react-native-gesture-handler';
import LandPage from './components/LandPage';
import LandPage2 from './components/LandPage2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import LandPage3 from './components/LandPage3';
import Login from './components/Login';
import Forgot from './components/Forgot';
import NumberLogin from './components/NumberLogin';
import Number from './components/Number';
import BottomTab from './components/Tabs/BottomTab';

const Stack = createStackNavigator();

const config = {
  animation: 'timing',
  config: {
    duration: 0,
    easing: Easing.linear,
  },
};

const closeConfig = {
  animation: 'timing',
  config: {
    duration: 0,
    easing: Easing.linear,
  },
};

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs();

function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('isFirstLaunch').then(value => {
      if (value === null) {
        // First launch
        AsyncStorage.setItem('isFirstLaunch', 'false');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === true) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LandPage"
          screenOptions={{
            gestureEnabled: true,
            transitionSpec: {
              open: config,
              close: closeConfig,
            },
            gestureDirection: 'vertical',
            cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
          }}>
          <Stack.Screen
            name="LandPage"
            component={LandPage}
            options={{
              headerShown: false,
            }}></Stack.Screen>
          <Stack.Screen
            name="LandPage2"
            component={LandPage2}
            options={{
              headerShown: false,
              gestureDirection: 'horizontal',
            }}
          />
          <Stack.Screen
            name="LandPage3"
            component={LandPage3}
            options={{
              headerShown: false,
              gestureDirection: 'horizontal',
            }}
          />
          <Stack.Screen
            name="NumberLogin"
            component={NumberLogin}
            options={{
              headerShown: false,
              gestureDirection: 'horizontal',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer independent="true">
      <Stack.Navigator
        initialRouteName="LandPage"
        screenOptions={{
          gestureEnabled: true,
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          gestureDirection: 'vertical',
          cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
        }}>
        <Stack.Screen
          name="NumberLogin"
          component={NumberLogin}
          options={{
            headerShown: false,
            gestureDirection: 'horizontal',
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            gestureDirection: 'horizontal',
          }}
        />
        <Stack.Screen
          name="Forgot"
          component={Forgot}
          options={{
            headerShown: false,
            gestureDirection: 'horizontal',
          }}
        />
        <Stack.Screen
          name="Number"
          component={Number}
          options={{
            headerShown: false,
            gestureDirection: 'horizontal',
          }}
        />
        <Stack.Screen
          name="Tab"
          component={BottomTab}
          options={{
            headerShown: false,
            gestureDirection: 'horizontal',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
