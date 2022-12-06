import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { createStackNavigator} from "@react-navigation/stack";

import WeaponStack from './Weapons';
import ArmorStack from './Armor';
import ListTest from './ListTest';

const Stack = createStackNavigator();

const HomeStack = () => {
    return(
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name='MHW Wiki' component={Home}/>
            <Stack.Screen name='Weapons' component={WeaponStack}/>
            <Stack.Screen name='Armor' component={ArmorStack}/>
            <Stack.Screen name='List' component={ListTest}/>
        </Stack.Navigator>
    )
};

const Home = ({navigation}) => {
    return(
        <View style={styles.homeContainer}>
            <Image
                style={styles.headerImage}
                source={require('../assets/logo.png')}
            />
            <View style={styles.buttonList}>
                <Button
                title="Weapons Selector"
                color="#434649"
                onPress={() => navigation.navigate("Weapons")}
                />
            </View>
            <View style={styles.buttonList}>
                <Button
                title="Armor Selector"
                color="#434649"
                onPress={() => navigation.navigate("Armor")}
                />
            </View>
            {
            /*<View style={styles.buttonList}>
                <Button
                title="test"
                color="#434649"
                onPress={() => navigation.navigate("List")}
                />
            </View>*/
            }
            
            
        </View>

    )
};

export default HomeStack;

const styles = StyleSheet.create({
    homeContainer: {
        padding: 25,
        backgroundColor: '#14181c',
        height: '100%'
    },
    txt: {
        padding: 5,
        alignSelf: 'center'
    },
    headerImage: {
        marginVertical: 25,
        alignSelf: 'center',
        height: '30%',
        width: '100%'
    },
    buttonList: {
        padding:10
    }
})