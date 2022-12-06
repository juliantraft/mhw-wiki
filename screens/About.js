import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, Image } from 'react-native';
import axios from 'axios';

const About = () => {

    const [data, setData] = useState('');
    const username = 'juliantraft';
    const token = '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';

    useEffect(() => {
        async function fetchData() {
            const request = await axios
            .get('https://api.github.com/users/'+username,
            {headers: {'Authorization': "Bearer "+token}})
            .then((res) => setData(res.data))
            .catch((err) => Alert.alert("Gagal,", err));

            return request;
        }
        fetchData();
    })

    if(data.name == undefined) {
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
        <View style={styles.aboutScreenContainer}>
            <View style={styles.aboutContainer}>
                <Text style={styles.txt}>
                    Contact me!
                </Text>
                <Image
                    style={styles.headerImage}
                    source={{uri: data.avatar_url}}
                />
                <Text style={styles.txt}>
                    {
                        data.login + '\n' +
                        data.name  + '\n' +
                        data.email  + '\n' +
                        data.company
                    }
                </Text>
            </View>      
        </View>
    )
};

export default About;

const styles = StyleSheet.create({
    aboutScreenContainer: {
        flex: 1,
        padding: 25,
        backgroundColor: '#14181c',
        alignItems: 'center'
    },
    aboutContainer: {
        flex: 1,
        paddingVertical: 20,
        borderWidth:1,
        borderColor: "#000000",
        borderRadius: 10,
        backgroundColor: '#434649',
        width: '100%'
    },
    txt: {
        color: '#ffffff',
        textAlign: 'center',
        lineHeight: 25,
    },
    headerImage: {
        margin: 25,
        height: 120,
        width: 120,
        borderRadius: 100,
        alignSelf: 'center'
    }
})
// token: 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