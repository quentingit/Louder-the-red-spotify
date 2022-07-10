

import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';

import window from '../constants/Layout';
import { DarkTheme, useNavigation } from '@react-navigation/native';



const ItemPlaylist = ({ item }) => {


    const navigation = useNavigation();


    return (

        <TouchableOpacity

            onPress={() => {

                navigation.navigate("Playlist", {
                    playlistId: item.id,
                    imageUri: item.images[0].url,
                    name: item.name,
                    owner: item.owner.display_name,
                })

            }}
            style={styles.imageDimensions}

        >

            <Image
                source={{ uri: item.images[0].url }}
                style={styles.image}
            />

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 10,
        backgroundColor: DarkTheme.colors.background
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: "#FFF",
        marginBottom: 10,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '100%',
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 3,
    },
    imageDimensions: {
        width: window.window.width / 2 - 20,
        height: window.window.width / 2 - 20,
        margin: 5,
    }
});


export default ItemPlaylist;