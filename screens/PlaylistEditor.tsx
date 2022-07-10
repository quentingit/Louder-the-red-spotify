

import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Text } from '../components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import ItemPlaylist from '../components/ItemPlaylist';



export interface Params {
    timestamp: string,
    offset: number,
    limit: number
}

const PlaylistEditor = () => {

    const [load, setLoad] = useState<boolean>(false);
    const [playlists, setPlaylists] = useState<string[]>([])
    const [params, setParams] = useState<Params>({
        timestamp: new Date().toISOString(),
        offset: 0,
        limit: 20
    })
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        (async () => {
            await getPlaylists();
        })();
    }, [])


    const getPlaylists = async () => {
        await setLoad(false);
        let request = `https://afternoon-waters-49321.herokuapp.com/v1/browse/featured-playlists?timestamp=${params.timestamp}&offset=${params.offset}&limit=${params.limit}`;
        await axios.get(request)
            .then(async (response) => {
                await setPlaylists(response.data.playlists.items);
            })
            .catch((error) => {
                setError(true);
            })
            .then(async () => {
                await setLoad(true);
            });
    }


    const keyExtractor = useCallback((item, index) => String(index), []);

    const _renderMyList = useCallback(

        ({ item, index }) => (
            <ItemPlaylist item={item} index={index} />
        ), []);


    const _refreshMyList = async () => {
        await getPlaylists();
    }



    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Editor's Pick</Text>
            {error &&
                <Text> can't get api</Text>
            }

            {!load ?
                <ActivityIndicator style={styles.separator} size="large" color="#c0392b" />
                :
                <>
                    {playlists &&
                        <FlatList
                            style={styles.flex}
                            showsVerticalScrollIndicator={false}
                            data={playlists}
                            numColumns={2}
                            renderItem={_renderMyList}
                            keyExtractor={keyExtractor}
                            onEndReachedThreshold={0.5}
                            onEndReached={() => { }}
                            refreshControl={
                                <RefreshControl
                                    refreshing={isRefreshing}
                                    onRefresh={_refreshMyList}
                                />
                            }

                        />

                    }


                </>
            }

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        marginBottom: -50,
        padding: 10,
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
    flex: {
        flex: 1,
    }
});


export default PlaylistEditor; 