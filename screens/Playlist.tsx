

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, SafeAreaView, Animated } from 'react-native';
import axios from 'axios';
import { Text } from '../components/Themed';;
import { CompositeNavigationProp, DarkTheme } from '@react-navigation/native';
import { formatDescription, formatFollowers } from '../utils/functions';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';
import ItemTrack from '../components/ItemTrack';
import { RouteProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

interface ParamsPlaylist {
    limit: number,
    offset: number,
    total: number,
}


interface Playlist {
    description: string,
    followers: {
        total: number
    }

}



const Playlist = ({ route, navigation }: any) => {


    const [defaultrequest] = useState(`https://afternoon-waters-49321.herokuapp.com/v1/playlists/${route.params.playlistId}`);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [load, setLoad] = useState<boolean>(false);
    const [playlist, setPlaylist] = useState<Playlist>()
    const [playlistParams, setPlaylistParams] = useState<ParamsPlaylist>({
        limit: 0,
        offset: 0,
        total: 0,
    });

    const [playlistTracks, setPlaylistTracks] = useState<string[]>()


    useEffect(() => {
        (async () => {
            await getPlaylist();
            Animated.timing(
                fadeAnim,
                {
                    useNativeDriver: true,
                    toValue: 1,
                    duration: 300,
                }
            ).start();

        })();
    }, [fadeAnim])




    const getPlaylist = async () => {
        await setLoad(false);
        await axios.get(defaultrequest)
            .then(async (response) => {
                await setPlaylist(response.data);
                await setPlaylistParams({
                    limit: response.data.tracks.limit,
                    offset: response.data.tracks.offset,
                    total: response.data.tracks.total,
                })
                await setPlaylistTracks(response.data.tracks.items);
            })
            .catch((error) => {

            })
            .then(async () => {
                await setLoad(true);
            });
    }


    const getPlayslistTracks = async () => {
        if (playlistParams.limit + playlistParams.offset < playlistParams.total) {

            let limit = playlistParams.limit;
            let offset = playlistParams.offset + 100;
            let prepareRequest = defaultrequest + `/tracks?offset=${offset}&limit=${limit}`;

            await axios.get(prepareRequest)
                .then(async (response) => {
                    await setPlaylistTracks(playlistTracks => [...playlistTracks, ...response.data.items]);
                    let playlistParamsTmp = playlistParams;
                    playlistParamsTmp.offset = offset;
                    await setPlaylistParams(playlistParamsTmp);
                })
                .catch((error) => {

                })
                .then(async () => {
                });

        } else {
        }



    }


    const keyExtractor = useCallback((item, index) => String(index), []);
    const _renderMyList = useCallback(

        ({ item, index }) => (
            <>
                <ItemTrack item={item} index={index} />
            </>
        ), []);


    return (
        <SafeAreaView style={styles.container}>
            <>

                <View
                    style={{
                        height: 175,
                        width: "100%",
                        borderBottomWidth: 2,
                        borderColor: "#c0392b"
                    }}
                >
                    <LinearGradient style={{
                        position: "absolute",

                        height: "100%",
                        width: "100%",

                    }}
                        colors={['#000', '#c0392b66']}
                    />

                    <TouchableOpacity
                        onPress={
                            () => {
                                navigation.goBack();
                            }
                        }

                        style={{
                            marginLeft: 10,
                            marginTop: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start'
                        }}
                    >
                        <Entypo name="chevron-left" size={24} color="#c0392b" />
                        <Text
                            style={{

                                fontSize: 15,

                                color: "#c0392b",

                            }}
                        >
                            retour
                        </Text>
                    </TouchableOpacity>


                    <View
                        style={{
                            flexDirection: "row",
                            backgroundColor: 'transparent',
                            padding: 20,
                            height: 100,

                        }}
                    >
                        <View
                            style={{
                                flexBasis: 100,
                                flexGrow: 0,
                                flexShrink: 0,


                            }}
                        >
                            <Image
                                source={{ uri: route.params.imageUri }}
                                style={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: 3,

                                }}
                            />

                        </View>

                        <View
                            style={{
                                flexGrow: 1,
                                flexShrink: 1,
                                flexBasis: "auto",
                                paddingHorizontal: 10,
                                height: 100,
                            }}
                        >
                            <Text lightColor="#eee" >
                                {route.params.name}
                            </Text>
                            <Text lightColor="#ccc" >
                                playlist by {route.params.owner}
                            </Text>

                            {load && playlist &&
                                <Animated.View
                                    style={{
                                        opacity: fadeAnim,
                                        height: 65,
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    <Text lightColor="#eee"
                                        style={{
                                            fontSize: 12
                                        }}
                                    >{formatDescription(playlist.description)}
                                    </Text>

                                    <Text
                                        style={{
                                            fontSize: 12, fontWeight: "bold",
                                        }}
                                        lightColor="#eee" >{formatFollowers(playlist.followers.total)}
                                    </Text>
                                </Animated.View>
                            }
                        </View>
                    </View>
                </View>


                {playlistTracks &&
                    <>
                        <Animated.FlatList
                            style={{

                                opacity: fadeAnim,
                            }}
                            showsVerticalScrollIndicator={false}
                            data={playlistTracks}
                            numColumns={1}
                            renderItem={_renderMyList}
                            keyExtractor={keyExtractor}
                            onEndReachedThreshold={0.5}
                            onEndReached={
                                async () => {
                                    await getPlayslistTracks();
                                }
                            }
                        />
                    </>

                }
            </>


        </SafeAreaView >
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DarkTheme.colors.background
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});

export default Playlist;