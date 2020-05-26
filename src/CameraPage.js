import {Camera} from 'expo-camera';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {Ionicons,FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

const CameraPage = () => {
    const [permission, setPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [cameraRef,setCameraRef] = useState(null);

    useEffect(
        () => {
            (async () => {
                const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
                if(status!=="granted"){
                    alert("Sorry, we need your permission to access camera roll")
                }
                const camera = await Permissions.askAsync(Permissions.CAMERA);
                setPermission(camera.status === 'granted');
                })();
        }
    );

    if (permission === null) {
        return <View/>;
    }

    if (permission === false) {
        return <Text>No access to camera </Text>;
    }

    const handleCameraType = () => {
        setType(
            type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    };

    const pickPicture = async() => {
        try{
            return await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All
            });
        }
        catch(e){
            console.log(e)
        }
    };

    const takePicture = async () => {
        if (cameraRef) {
            let photo = await cameraRef.takePictureAsync();
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} type={type} ref={ref=>setCameraRef(ref)}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                        justifyContent: "space-between",
                    }}>
                    <TouchableOpacity
                        style={{
                            flex: 0.1,
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                            backgroundColor:'transparent'
                        }}
                        onPress={()=>pickPicture()}>

                        <Ionicons
                            name="ios-photos"
                            style={{ color: "#fff", fontSize: 30}}
                            />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            flex: 0.1,
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                            backgroundColor:'transparent'
                        }}
                        onPress={()=>takePicture()}
                    >
                    <FontAwesome
                        name="camera"
                        style={{ color: "#fff", fontSize: 30}}
                    />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            flex: 0.1,
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                            backgroundColor:'transparent'
                        }}
                        onPress={()=>handleCameraType()}>
                        <MaterialCommunityIcons
                            name="camera-switch"
                            style={{ color: "#fff", fontSize: 40}}
                        />
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    )
};

export  default CameraPage;

