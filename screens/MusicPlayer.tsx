

import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '../components/Themed';
import window from '../constants/Layout';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPlayerState } from '../redux/actions/playerAction';


import { Audio } from 'expo-av';

interface MusicTime {
    currentTime: number,
    endTime: number,
}

const MusicPlayer = ({ playerState, fetchPlayerState }: any) => {

    const [playbackObject, setPlaybackObject] = useState(null);
    const [musicUri, setMusicUri] = useState<string>();
    const [musicTime, setMusicTime] = useState<MusicTime>();
    const [clearTime, setClearTime] = useState<boolean>(false);
    const [load, setLoad] = useState<boolean>(false);



    useEffect(() => {
        (async () => {
            if (playbackObject === null) {
                await setPlaybackObject(new Audio.Sound());
            } else {
                if (playerState.isPlaying === true) {
                    try {
                        if (musicUri !== playerState.musicUri) {
                            await setClearTime(null);
                            await playbackObject.unloadAsync();
                        } else {
                            await setMusicUri(playerState.musicUri);
                        }
                        await playbackObject.loadAsync(
                            { uri: playerState.musicUri },
                            { shouldPlay: true }
                        );
                    } catch (e) {
                    }
                }
            }
            setLoad(true);
        })();


        const intervalId = !clearTime && setInterval(() => {
            getCurrentTime();
        }, 100);

        return () => {
            clearInterval(intervalId)
        }

    }, [playerState.musicUri, clearTime]);




    const getCurrentTime = async () => {

        if (playbackObject) {
            let statuts = await playbackObject.getStatusAsync();
            await setMusicTime({
                currentTime: statuts.positionMillis,
                endTime: statuts.durationMillis
            });

            if (statuts.positionMillis >= (statuts.durationMillis - 200) && statuts.positionMillis > 1000) {

                let statusTmp = playerState;
                statusTmp.isPlaying = false;
                try {
                    await setLoad(false);
                    await fetchPlayerState(statusTmp);
                    await setMusicTime(null);
                    await setClearTime(true);
                    await playbackObject.unloadAsync()
                    await setLoad(true);
                } catch (e) {

                }
            }
        }
    }


    const handleAudioPlayPause = async () => {
        if (playerState.isPlaying) {

            await playbackObject.pauseAsync();

            let statusTmp = playerState;
            statusTmp.isPlaying = false;

            try {
                await setLoad(false);
                await fetchPlayerState(statusTmp);
                await setLoad(true);
            } catch (e) {
            }
        } else if (!playerState.isPlaying) {

            if (!clearTime) {
                await playbackObject.playAsync();
            } else {
                await playbackObject.loadAsync(
                    { uri: playerState.musicUri },
                    { shouldPlay: true }
                );
                await setClearTime(null);
            }


            let statusTmp = playerState;
            statusTmp.isPlaying = true;
            try {
                await setLoad(false);
                await fetchPlayerState(statusTmp);
                await setLoad(true);
            } catch (e) {

            }

        };
    };


    if ((playerState.isPlaying !== true && playerState.isPlaying !== false) || (!load)) { return (<></>) }
    else {

        return (
            <>
                {musicTime && musicTime.currentTime > 100 &&
                    <View
                        style={[styles.progressBar,
                        {
                            width: (window.window.width / musicTime.endTime) * musicTime.currentTime,
                        }]}
                    />
                }

                <BlurView
                    intensity={40}
                    style={styles.blur}
                >
                    <View style={styles.flexImage}  >
                        <Image
                            source={{ uri: playerState.imageUri }}
                            style={styles.imageDimensions}
                        />
                    </View>
                    <View
                        style={styles.textMainGroup}
                    >
                        <Text style={styles.fontName}>  {playerState.name}</Text>
                        <Text style={styles.fontName2}>  {playerState.owner} {playerState.isPlaying}</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.textSecondGroup}
                        onPress={handleAudioPlayPause}
                    >
                        <Ionicons
                            name={playerState.isPlaying ? 'pause' : 'play'}
                            onPress={handleAudioPlayPause}
                            style={styles.icon}

                        />
                    </TouchableOpacity>
                </BlurView>
            </>
        )
    }
};






const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        marginBottom: -50,
        padding: 10,
    },
    icon: {
        color: "#fff",
        fontSize: 40,
    },
    progressBar: {
        backgroundColor: "#c0392b",
        bottom: 140,
        position: "absolute",
        height: 5,
    },
    blur: {
        position: "absolute",
        height: 60,
        borderTopWidth: 1,
        borderColor: "#c0392b",
        width: "100%",
        bottom: 80,
        backgroundColor: "#00000066",
        zIndex: 200,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: "row"
    },
    flexImage: {
        flexBasis: 60,
        flexGrow: 0,
        flexShrink: 0,
    },
    imageDimensions: {
        width: 40,
        height: 40,
        borderRadius: 5,
    },
    fontName: {
        fontSize: 11, color: "#fff", marginBottom: 4,
    },
    fontName2: {
        fontSize: 12, color: "#ccc"
    },
    textMainGroup: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: "auto",
        marginTop: 4
    },
    textSecondGroup: {
        flexBasis: 60,
        flexGrow: 0,
        flexShrink: 0,
    }


});


const mapStateToProps = (state: any) => {
    return {
        playerState: state.player.statuts,
    }
};

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    fetchPlayerState: fetchPlayerState
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer)
