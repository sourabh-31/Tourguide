import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AccountTab from './AccountTab';
import AccountCard from './AccountCard';
import TeamCard from './TeamCard';
import TeamHistory from './TeamHistory';

const Stack = createStackNavigator();

const AccountStack = () => {
  return (
    <Stack.Navigator initialRouteName="AccountTab">
      <Stack.Screen
        name="AccountTab"
        component={AccountTab}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AccountCard"
        component={AccountCard}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TeamHistory"
        component={TeamHistory}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TeamCard"
        component={TeamCard}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AccountStack;
