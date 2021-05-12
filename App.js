import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';


export default function Upload() {
    const [avatar, setAvatar] = useState();

    async function imagePickerCall() {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

            if (status !== 'granted') {
                alert("Nós Precisamos dessa permissão.")
                return;
            }
        }

        const data = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images
        });

        if (data.cancelled) {
            return;
        }
        if (!data.uri) {
            return;
        }
        setAvatar(data);

    }

    async function imagePickerCamera() {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA);

            if (status !== 'granted') {
                alert("Nós Precisamos dessa permissão.")
                return;
            }
        }

        const data = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images
        });


        if (data.cancelled) {
            return;
        }
        if (!data.uri) {
            return;
        }
        setAvatar(data);

    }

    async function UploadImage() {

        const data = new FormData();

        data.append("avatar", {
            uri: avatar.uri,
            type: avatar.type,
        });

        await axios.post("https://192.168.0.4:3000/avatar", data)
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: 'https://i2.wp.com/santacasasaude.com.br/wp-content/uploads/2018/07/Santa-Casa-SJC.gif?fit=730%2C457&ssl=1' }} style={styles.logo} />
            <Image source={{ uri: avatar ? avatar.uri : 'https://i.stack.imgur.com/y9DpT.jpg' }} style={styles.imageAvatar} />

            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={imagePickerCall}>
                    <Text style={styles.buttonText}>
                        <Icon name="photo" size={40} color={"#fff"} />
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={imagePickerCamera}>
                    <Text style={styles.buttonText}>
                        <Icon name="camera-alt" size={40} color={"#fff"} />
                    </Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={styles.uploadButton} onPress={UploadImage}>
                    <Text style={styles.buttonText}>
                        <Icon name="file-upload" size={40} color={"#fff"} />
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttons: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "center"
    },
    button: {
        width: 80,
        height: 80,
        margin: 20,
        borderRadius: 150,
        backgroundColor: '#0678BF',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    uploadButton: {
        marginTop: 50,
        width: 180,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#0678BF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff'
    },
    imageAvatar: {
        marginTop: 50,
        width: 300,
        height: 200,
    },
    logo: {
        width: 300,
        height: 100,
    }
})