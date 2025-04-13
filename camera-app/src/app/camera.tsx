import { Link, Stack, router } from 'expo-router';
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    Pressable,
    Image,
    Button,
} from 'react-native';
import {
    useCameraPermissions,
    CameraView,
    CameraType,
    CameraCapturedPicture,
} from 'expo-camera';
import { useEffect, useState, useRef } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import path from 'path';
import * as FileSystem from 'expo-file-system';
import { Video } from 'expo-av';
import { manipulateAsync } from 'expo-image-manipulator';

export default function CameraScreen() {
    const [permission, requestPermission] = useCameraPermissions();

    const [facing, setFacing] = useState<CameraType>('back');
    const camera = useRef<CameraView>(null);
    const [picture, setPicture] = useState<CameraCapturedPicture>();
    const [isRecording, setIsRecording] = useState(false);
    const [video, setVideo] = useState<string>();

    useEffect(() => {
        if (permission && !permission.granted && permission.canAskAgain) {
            requestPermission();
        }
    }, [permission]);

    const toggleCameraFacing = () => {
        setFacing((current) => (current === 'back' ? 'front' : 'back'));
    };

    const onPress = () => {
        if (isRecording) {
            camera.current?.stopRecording();
        } else {
            takePicture();
        }
    };

    const takePicture = async () => {
        console.log('Checking camera reference...');
        if (!camera.current) {
            console.log('Camera reference is null');
            return;
        }

        console.log('Checking permissions...');
        if (!permission?.granted) {
            console.log('Camera permission not granted');
            return;
        }

        console.log('Attempting to take picture...');
        try {
            const res = await camera.current.takePictureAsync();
            console.log('Picture taken:', res);
            setPicture(res);
        } catch (error) {
            console.log('Error taking picture:', error);
        }
    };

    const startRecording = async () => {
        setIsRecording(true);
        const res = await camera.current?.recordAsync({ maxDuration: 60 });
        console.log(res);
        setVideo(res?.uri);
        setIsRecording(false);
    };

    const saveFile = async (uri: string) => {
        // save file
        const filename = path.parse(uri).base;

        await FileSystem.copyAsync({
            from: uri,
            to: FileSystem.documentDirectory + filename,
        });

        setPicture(undefined);
        setVideo(undefined);
        router.back();
    };

    if (!permission?.granted) {
        return <ActivityIndicator />;
    }

    if (picture || video) {
        return (
            <View style={{ flex: 1 }}>
                {picture && (
                    <Image
                        source={{ uri: picture.uri }}
                        style={{ width: '100%', flex: 1 }}
                    />
                )}

                {video && (
                    <Video
                        source={{ uri: video }}
                        style={{ width: '100%', flex: 1 }}
                        shouldPlay
                        isLooping
                    />
                )}

                {picture && (
                    <View style={{ padding: 10 }}>
                        <Button
                            title="Crop"
                            onPress={async () => {
                                // Implement cropping logic here
                                console.log('Cropping image...');
                                try {
                                    const croppedImage = await manipulateAsync(
                                        picture.uri,
                                        [{ crop: { originX: 0, originY: 0, width: 200, height: 200 } }],
                                        { compress: 1, format: 'jpeg' }
                                    );
                                    setPicture({ ...picture, uri: croppedImage.uri });
                                } catch (error) {
                                    console.error('Error cropping image:', error);
                                }
                            }}
                        />
                    </View>
                )}

                <View style={{ padding: 10 }}>
                    <SafeAreaView edges={['bottom']}>
                        <Button
                            title="Save"
                            onPress={() => saveFile(picture?.uri ?? video ?? '')}
                        />
                    </SafeAreaView>
                </View>
                <MaterialIcons
                    onPress={() => {
                        setPicture(undefined);
                        setVideo(undefined);
                    }}
                    name="close"
                    size={35}
                    color="white"
                    style={{ position: 'absolute', top: 50, left: 20 }}
                />
            </View>
        );
    }

    return (
        <View>
            <CameraView
                ref={camera}
                mode="picture"
                style={styles.camera}
                acing={facing}
            >
                <View style={styles.footer}>
                    <View />
                    <Pressable
                        style={[
                            styles.recordButton,
                            { backgroundColor: isRecording ? 'crimson' : 'white' },
                        ]}
                        onPress={onPress}
                        onLongPress={startRecording}
                    />
                    <MaterialIcons
                        name="flip-camera-ios"
                        size={24}
                        color={'white'}
                        onPress={toggleCameraFacing}
                    />
                </View>
            </CameraView>

            <MaterialIcons
                name="close"
                color={'white'}
                style={styles.close}
                size={30}
                onPress={() => router.back()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    camera: {
        width: '100%',
        height: '100%',
    },
    footer: {
        marginTop: 'auto',
        padding: 20,
        paddingBottom: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#00000099',
    },
    close: {
        position: 'absolute',
        top: 50,
        left: 20,
    },
    recordButton: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'white',
    },
});
