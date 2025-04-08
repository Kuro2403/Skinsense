import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import styles from "../../../assets/style/CameraApp.style";
import Icon from "react-native-vector-icons/Entypo";
import Icons from "react-native-vector-icons/AntDesign";
const CameraApp = ({ navigation }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const CamRef = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (CamRef) {
      try {
        const data = await CamRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (e) {
        console(e);
      }
    }
  };

  const SaveImage = async () => {
    if (image) {
      try {
        await MediaLibrary.createAssetAsync(image);
        alert("Picture save");
        setImage(null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (hasCameraPermission === false) {
    return <Text> No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      {!image ? (
        <Camera
          style={styles.camera}
          type={type}
          flashMode={flash}
          ref={CamRef}
        >
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}
      <View>
        {image ? (
          <View style={styles.Button_Check_Re}>
            <TouchableOpacity
              style={styles.Button}
              onPress={() => setImage(null)}
            >
              <Icon name="retweet" size={28} color={"#f1f1f1"} />
              <Text style={styles.Text}>Re-take</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Button} onPress={SaveImage}>
              <Icon name="check" size={28} color={"#f1f1f1"} />
              <Text style={styles.Text}>Save</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.Button_Camera_Center}>
            {/* retweet */}
            <TouchableOpacity
              style={styles.Button}
              onPress={() =>
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                )
              }
            >
              <Icon name="retweet" size={28} color={"#f1f1f1"} />
            </TouchableOpacity>
            {/* Picture */}
            <TouchableOpacity style={styles.Button_cam} onPress={takePicture}>
              <Icon name="camera" size={40} color={"#000"} />
            </TouchableOpacity>
            {/* flash */}
            <TouchableOpacity
              style={styles.Button}
              onPress={() =>
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                )
              }
            >
              <Icon
                name="flash"
                size={28}
                color={
                  flash === Camera.Constants.FlashMode.off ? "gray" : "#f1f1f1"
                }
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default CameraApp;
