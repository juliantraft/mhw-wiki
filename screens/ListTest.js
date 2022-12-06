import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Alert, Pressable, Button, FlatList , TextInput } from 'react-native';
import axios from 'axios';

const fetchWeapon = async(id) => {
    const weaponItem = await axios.get('https://mhw-db.com/weapons/'+id);
    return weaponItem.data;
}

const arrId = [{"id":1},{"id":2},{"id":3}]



const ListTest = () => {

    const WeaponItem = (props) => {
        const [dataX, setDataX] = useState('');
    
        useEffect( () => {
            fetchWeapon(props.passId).then((res) => setDataX(res));
        },[props.passId]);
    
        if(dataX.name == undefined) {
            return(<Text styles={styles.txtD}>Loading</Text>);
        }
    
        return(
            <Text styles={styles.txtD}>{dataX.name}</Text>
        );
    }

    return(
        <View style={styles.listContainer}>
            <FlatList
                data = {arrId}
                renderItem = {(itemData) => <WeaponItem passId={itemData.item.id}/>}
            />
        </View>
    );
}

export default ListTest;

const styles = StyleSheet.create({
    listContainer:{
        padding: 25,
        alignItems: 'center'
    },
    armorContainer: {
        paddingVertical: 20,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#434649'
    },
    rowContainer : {
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
    },
    imageMaleContainer : {
        alignItems: 'center',
    },
    imageFemaleContainer : {
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
        //color: '#ffffff'
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
        height: 140,
        width: 140
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