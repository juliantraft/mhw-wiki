import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Alert, Pressable, Button, TextInput } from 'react-native';
import axios from 'axios';

import { createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

const fetchWeapon = async(id) => {
    const weaponItem = await axios.get('https://mhw-db.com/weapons/'+id);
    return weaponItem.data;
}

const WeaponStack = () => {
    return(
        <Stack.Navigator initialRouteName='Armor'>
            <Stack.Screen name='Selector' component={Weapons}/>
            <Stack.Screen name='Detail' component={Detail}/>
        </Stack.Navigator>
    )
}

const Weapons = ({navigation}) => {

    const [dataW, setDataW] = useState('');
    const [idW, setIdW] = useState(1);
    const [input, setInput] = useState(1);

    const next = () => {
        if(idW != 1306) {
            const nextId = idW + 1;
            setIdW(nextId);
        }  
    }

    const prev = () => {
        if(idW != 1) {
            const prevId = idW - 1;
            setIdW(prevId);
        }  
    }

    const inputHandler = (inputNum) => {
        setInput(inputNum);
    }

    const inputSetter = () => {
        const newId = parseInt(input);
        if( !(isNaN(newId)) && (newId > 0) && (newId < 1307) ) {
            setIdW(newId);
        } else {
            Alert.alert("Error","Invalid id");
        }
    }

    const Img = () => {
        if(dataW.assets == null) {
            return(<Image style={styles.headerImage} source={require('../assets/noimage.png')}/>);
        } else {
            return(<Image style={styles.headerImage} source={{uri: dataW.assets.image}}/>);
        }
    };

    useEffect( () => {
        fetchWeapon(idW).then((res) => setDataW(res));
    },[idW]);


    if(dataW.name == undefined) {
        return(
            <View style={{flex: 1,backgroundColor: '#14181c', alignItems: 'center', justifyContent: 'center'}}>
                <Image style={styles.headerImage} source={require('../assets/loading.png')}/>
                <Text style={{color: '#ffffff', marginTop: 25}}>
                    Loading...
                </Text>
            </View>
        );
    }

    return(
        <View style={styles.listContainer}>
            <Pressable onPress={() => {
                return navigation.navigate('Detail', {paramKey: idW});}}>
                <View style={styles.armorContainer}>

                    <Img/>
                    
                    <Text style={styles.txtName}>{dataW.name}</Text>
                    <Text style={styles.txt}>id: {dataW.id}</Text>
                </View>  
            </Pressable>

            <View style={styles.rowContainer}>
                <View style={styles.buttonContainer}>
                    <Button
                    title="<<<"
                    color='#434649'
                    onPress={() => prev()}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                    title=">>>"
                    color='#434649'
                    onPress={() => next()}
                    /> 
                </View>
                
            </View>

            <TextInput
                style={styles.idInput}
                placeholder="Enter id"
                placeholderTextColor='#8a8c8e' 
                onChangeText={inputHandler}
            />
            <Button
                title="Go"
                color='#434649'
                onPress={() => inputSetter()}
            /> 
        </View>
    )
};

const Detail = ({route}) => {

    const [dataWD, setDataWD] = useState('');

    useEffect( () => {
        fetchWeapon(route.params.paramKey).then((res) => setDataWD(res));
    },[]);

    if(dataWD.name == undefined) {
        return(
            <View style={{flex: 1,backgroundColor: '#14181c', alignItems: 'center', justifyContent: 'center'}}>
                <Image style={styles.headerImage} source={require('../assets/loading.png')}/>
                <Text style={{color: '#ffffff', marginTop: 25}}>
                    Loading...
                </Text>
            </View>
        );
    }

    const Img = () => {
        if(dataWD.assets == null) {
            return(<Image style={styles.headerImage} source={require('../assets/noimage.png')}/>);
        } else {
            return(<Image style={styles.headerImage} source={{uri: dataWD.assets.image}}/>);
        }
    };

    const Crafting = () => {
        if(dataWD.crafting == undefined) {
            return(<Text style={styles.txtD}>Loading...</Text>);
        }
        if(dataWD.crafting.craftable == true) {
            return(
                <Text style={styles.txtD}>
                {
                    'Crafting Materials\n' +
                    'Item: ' + dataWD.crafting.craftingMaterials[0].item.name + '\n' +
                    'Quantity: ' + dataWD.crafting.craftingMaterials[0].quantity
                }
                </Text>
            );
        } else {
            return(<Text style={styles.txtD}>Not Craftable</Text>);
        }
    }
    
    return(
        <View style={styles.detailScreenContainer}>
            <Text style={styles.txtNameD}>{dataWD.name}</Text>
            
            <View style={styles.detailContainer}>
                <Img/>
                <Text style={styles.txtD}>
                    {
                        'Type: ' + dataWD.type + 
                        '\nRarity: ' + dataWD.rarity +
                        '\nDamage Type: ' + dataWD.damageType +
                        '\n\nAttack Stats' +
                        '\n      Display: ' + dataWD.attack.display +
                        '\n      Raw: ' + dataWD.attack.raw
                    }
                </Text>
                <Crafting/>
            </View>
        </View>
    )
}



export default WeaponStack;

const styles = StyleSheet.create({
    listContainer:{
        flex: 1,
        padding: 25,
        backgroundColor: '#14181c',
        alignItems: 'center'
    },
    armorContainer: {
        paddingVertical: 20,
        paddingHorizontal: 60,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#434649'
    },
    rowContainer : {
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
    },
    imageContainer : {
        alignItems: 'center',
    },
    buttonContainer: {
        padding: 10,
        paddingTop: 25
    },
    detailScreenContainer: {
        flex: 1,
        padding: 25,
        backgroundColor: '#14181c',
    },
    detailContainer: {
        flex: 1,
        paddingVertical: 20,
        borderWidth:1,
        borderColor: "#000000",
        borderRadius: 10,
        backgroundColor: '#434649'
    },
    txt: {
        paddingVertical: 5,
        alignSelf: 'center',
        color: '#ffffff'
    },
    txtD: {
        marginVertical: 5,
        paddingLeft: 25,
        color: '#ffffff'
    },
    txtName: {
        color: '#ffffff',
        fontSize: 20,
        alignSelf: 'center',
        margin: 10,
        borderWidth: 1,
        borderColor: '#434649'
    },
    txtNameD: {
        color: '#ffffff',
        fontSize: 20,
        alignSelf: 'center',
        margin: 10,
        borderWidth: 1,
        borderColor: '#14181c'
    },
    headerImage: {
        height: 150,
        width: 150,
        alignSelf: 'center'
    },
    idInput: {
        marginTop: 20,
        padding: 10,
        marginBottom: 20,
        color: '#ffffff',
        borderWidth: 1,
        borderColor: '#ffffff',
        borderRadius: 10
    }
});