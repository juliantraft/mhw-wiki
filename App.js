import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeStack from './screens/Home';

import About from './screens/About';

const BottomTab = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator>
        <BottomTab.Screen name="Home" component={HomeStack}
          options={{tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size}/>
        ),}}/>

        <BottomTab.Screen name="About" component={About}
          options={{tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="information" color={color} size={size}/>
        ),}}/>
      </BottomTab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
