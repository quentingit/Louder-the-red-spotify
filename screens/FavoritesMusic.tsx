

import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Animated } from 'react-native';
import { Text } from '../components/Themed';
import { DarkTheme } from '@react-navigation/native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ItemTrack from '../components/ItemTrack';


const FavoritesMusic = (props) => {

    const [favoritesMusic, setFavoritesMusic] = useState<boolean>(false);

    const { playerLikes } = props;
    useEffect(() => {
        (async () => {
            if (playerLikes) {
                await setFavoritesMusic(playerLikes)
            }
        })();
    }, [playerLikes])


    const keyExtractor = useCallback((item, index) => String(index), []);
    const _renderMyList = useCallback(

        ({ item, index }) => (
            <>
                <ItemTrack item={item} index={index} />
            </>
        ), []);


    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Favorites</Text>

            {!favoritesMusic[0] ?
                <Text
                    style={{
                        color: '#fff',
                        textAlign: "center",
                    }}
                >
                    empty list
                </Text>
                :

                <Animated.FlatList
                    showsVerticalScrollIndicator={false}
                    data={favoritesMusic}
                    numColumns={1}
                    renderItem={_renderMyList}
                    keyExtractor={keyExtractor}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                    }}
                />
            }
        </SafeAreaView >
    );
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        margin: 10,
        backgroundColor: DarkTheme.colors.background
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: "#FFF",
        marginBottom: 10,
        textAlign: "center",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});

const mapStateToProps = state => {
    return {
        playerLikes: state.player.likes,
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesMusic)

