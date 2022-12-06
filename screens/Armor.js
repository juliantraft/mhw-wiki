import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Alert, Pressable, Button, TextInput } from 'react-native';
import axios from 'axios';

import { createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

const fetchArmor = async(id) => {
    const armorItem = await axios.get('https://mhw-db.com/armor/'+id);
    return armorItem.data;
}

const ArmorStack = () => {
    return(
        <Stack.Navigator initialRouteName='Armor'>
            <Stack.Screen name='Selector' component={Armor}/>
            <Stack.Screen name='Detail' component={Detail}/>
        </Stack.Navigator>
    )
}

const Armor = ({navigation}) => {

    const [dataA, setDataA] = useState('');
    const [idA, setIdA] = useState(1);
    const [input, setInput] = useState(1);

    const next = () => {
        if(idA != 1688) {
            const nextId = idA + 1;
            setIdA(nextId);
        }  
    }

    const prev = () => {
        if(idA != 1) {
            const prevId = idA - 1;
            setIdA(prevId);
        }  
    }

    const inputHandler = (inputNum) => {
        setInput(inputNum);
    }

    const inputSetter = () => {
        const newId = parseInt(input);
        if( !(isNaN(newId)) && (newId > 0) && (newId < 1689) ) {
            setIdA(newId);
        } else {
            Alert.alert("Error","Invalid id");
        }
    }

    const ImgMale = () => {
        if(dataA.assets == null) {
            return(<Image style={styles.headerImage} source={require('../assets/noimage.png')}/>);
        } else {
            return(<Image style={styles.headerImage} source={{uri: dataA.assets.imageMale}}/>);
        }
    };

    const ImgFemale = () => {
        if(dataA.assets == null) {
            return(<Image style={styles.headerImage} source={require('../assets/noimage.png')}/>);
        } else {
            return(<Image style={styles.headerImage} source={{uri: dataA.assets.imageFemale}}/>);
        }  
    };

    useEffect( () => {
        fetchArmor(idA).then((res) => setDataA(res));
    },[idA])

    if(dataA.name == undefined) {
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
                return navigation.navigate('Detail', {paramKey: idA});}}>
                <View style={styles.armorContainer}>

                    <View style={styles.rowContainer}>
                        <View style={styles.imageMaleContainer}>
                            <Text style={styles.txt}>Male</Text>
                            <ImgMale/>
                        </View>
                        <View style={styles.imageFemaleContainer}>
                            <Text style={styles.txt}>Female</Text>
                            <ImgFemale/>
                        </View>
                    </View>
                    
                    <Text style={styles.txtName}>{dataA.name}</Text>
                    <Text style={styles.txt}>id: {dataA.id}</Text>
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

    const [dataAD, setDataAD] = useState('');

    useEffect( () => {
        fetchArmor(route.params.paramKey).then((res) => setDataAD(res));
    },[])

    const ImgMale = () => {
        if(dataAD.assets == null) {
            return(<Image style={styles.headerImage} source={require('../assets/noimage.png')}/>);
        } else {
            return(<Image style={styles.headerImage} source={{uri: dataAD.assets.imageMale}}/>);
        }
    };

    const ImgFemale = () => {
        if(dataAD.assets == null) {
            return(<Image style={styles.headerImage} source={require('../assets/noimage.png')}/>);
        } else {
            return(<Image style={styles.headerImage} source={{uri: dataAD.assets.imageFemale}}/>);
        }  
    };
    
    if(dataAD.name == undefined) {
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
        <View style={styles.detailScreenContainer}>
            <Text style={styles.txtNameD}>{dataAD.name}</Text>
            
            <View style={styles.detailContainer}>
                <View style={styles.rowContainer}>
                    <View style={styles.imageMaleContainer}>
                        <Text style={styles.txt}>Male</Text>
                        <ImgMale/>
                    </View>
                    <View style={styles.imageFemaleContainer}>
                        <Text style={styles.txt}>Female</Text>
                        <ImgFemale/>
                    </View>
                </View>

                <Text style={styles.txtD}>
                    {
                        'Type: ' + dataAD.type + 
                        '\nRank: ' + dataAD.rank +
                        '\nRarity: ' + dataAD.rarity +
                        '\n\nDefense Stats' +
                        '\n      Base: ' + dataAD.defense.base +
                        '\n      Max: ' + dataAD.defense.max +
                        '\n      Augmented: ' + dataAD.defense.augmented
                    }
                </Text> 
            </View>
        </View>
    )
}

export default ArmorStack;

const styles = StyleSheet.create({
    listContainer:{
        padding: 25,
        backgroundColor: '#14181c',
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