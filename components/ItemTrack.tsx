

import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text } from './Themed';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPlayerLike, fetchPlayerState, fetchPlayerUnlike, fetchPlayerCurrent } from '../redux/actions/playerAction';
import { Ionicons } from '@expo/vector-icons';


const ItemTrack = (props) => {

    const [heart, setHeart] = useState(false);
    const [current, setCurrent] = useState(false);
    const { playerLikes, playerCurrent, fetchPlayerLike, fetchPlayerCurrent, fetchPlayerUnlike, fetchPlayerState } = props;

    const { item, index } = props;

    useEffect(() => {
        (async () => {
            await loadHeart();
            await loadCurrent();
        })();
    }, [playerLikes, playerCurrent]);



    const loadCurrent = async () => {
        if (playerCurrent) {
            if (JSON.stringify(playerCurrent) === JSON.stringify(item)) {
                await setCurrent(true);
            } else {
                await setCurrent(false);
            }

        }
    }


    const loadHeart = async () => {

        if (playerLikes[0]) {
            const response = playerLikes.find(elem => elem === item);
            if (response !== undefined) {
                await setHeart(true);
            } else {
                await setHeart(false);

            }
        }
    }

    const handleLike = async () => {
        try {
            if (!heart) {
                await fetchPlayerLike(item);
            } else {
                await fetchPlayerUnlike(item);

            }
        } catch (e) {
        }
    }



    const handleStartMusic = async () => {
        let statusTmp = {
            isPlaying: true,
            name: item.track.name,
            owner: item.track.artists[0].name,
            imageUri: item.track.album.images[2].url,
            musicUri: item.track.preview_url,
        }

        try {

            await fetchPlayerState(statusTmp);
            await fetchPlayerCurrent(item);

        } catch (e) {

        }


    };



    return (

        <TouchableOpacity


            style={{

                width: "100%",
                margin: 10,
                padding: 10,
                flexDirection: "row"


            }}>

            <View
                style={{
                    flexBasis: 60,
                    flexGrow: 0,
                    flexShrink: 0,
                }}
            >

                {item.track && item.track.album !== undefined &&

                    <Image
                        source={{ uri: item.track.album.images[2].url }}
                        style={{
                            width: 60,
                            height: 60,
                            borderRadius: 3,
                        }}
                    />
                }

            </View>
            <View
                style={{
                    flexGrow: 1,
                    flexShrink: 1,
                    flexBasis: "auto",
                    padding: 10,
                }}
            >
                {item.track.preview_url ?
                    <>
                        <TouchableOpacity
                            onPress={handleStartMusic}
                        >
                            <Text style={{
                                color: current ? "#e74c3c" : "#fff"

                            }} >  {item.track.name}</Text>
                            <Text style={{
                                color: current ? "#c0392b" : "#fff"
                            }}>  {item.track.artists[0].name}</Text>
                        </TouchableOpacity>
                    </>
                    :
                    <>
                        <Text style={{ color: "#666" }}>  {item.track.name}</Text>
                        <Text style={{ color: "#666" }}> {item.track.artists[0].name}</Text>
                    </>
                }
            </View>
            <View
                style={{
                    flexBasis: 60,
                    flexGrow: 0,
                    flexShrink: 0,


                }}
            >
                <Ionicons
                    name={"ios-heart"}
                    onPress={handleLike}
                    style={
                        {
                            color: heart ? "#c0392b" : "#444",
                            fontSize: 30,
                        }
                    }
                />
            </View>


        </TouchableOpacity >
    )
}



const mapStateToProps = state => {
    return {
        playerState: state.player.statuts,
        playerLikes: state.player.likes,
        playerCurrent: state.player.current
    }
};



const mapDispatchToProps = dispatch => bindActionCreators({
    fetchPlayerState: fetchPlayerState,
    fetchPlayerLike: fetchPlayerLike,
    fetchPlayerUnlike: fetchPlayerUnlike,
    fetchPlayerCurrent: fetchPlayerCurrent,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(ItemTrack)