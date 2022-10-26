import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import {StatusBar, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PredictScreen from './src/screens/PredictScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Entypo from 'react-native-vector-icons/Entypo';
import ResultScreen from './src/screens/ResultScreen';
import UserResult from './src/screens/UserResult';

const welcomeStack = createNativeStackNavigator();
const tab = createBottomTabNavigator();

const welcomeNavigator = () => {
  return (
    <welcomeStack.Navigator>
      <welcomeStack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <welcomeStack.Screen
        name="HomeScreen"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <welcomeStack.Screen
        name="UserResult"
        component={UserResult}
        options={{headerShown: false}}
      />
      <welcomeStack.Screen
        name="ResultScreen"
        component={ResultScreen}
        options={{headerShown: false}}
      />
    </welcomeStack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: '#1A2980'},
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#26D0CE',
        tabBarLabelStyle: {fontSize: 18},
      }}>
      <tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => {
            return <AntDesign name="home" color={color} size={size} />;
          },
        }}
      />
      <tab.Screen
        name="Predict"
        component={PredictScreen}
        options={{
          tabBarIcon: ({color, size}) => {
            return <Entypo name="awareness-ribbon" color={color} size={size} />;
          },
        }}
      />
      <tab.Screen
        name="Result"
        component={ResultScreen}
        options={{
          tabBarIcon: ({color, size}) => {
            return <Entypo name="bar-graph" color={color} size={size} />;
          },
        }}
      />
    </tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#26D0CE" />
      <View style={{flex: 1}}>{welcomeNavigator()}</View>
    </NavigationContainer>
  );
};

export default App;
