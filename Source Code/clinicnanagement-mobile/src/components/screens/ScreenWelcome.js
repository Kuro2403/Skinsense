import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import styles from "../../assets/style/Welcome.style";
import ImgWelcome from "../../assets/images/Android_welcome.png";
import ImgLogo from "../../assets/images/Logo_App_Clinic_1.png";
const ScreenWelcome = ({ navigation }) => {
  return (
    <ImageBackground
      source={ImgWelcome}
      style={{ height: "100%", width: "100%" }}
      resizeMode="stretch"
    >
      <SafeAreaView>
        <View style={styles.Header}>
          <Text style={styles.TextHeader}>Welcome</Text>
          <Text style={styles.Text}>Manage skin examination schedule</Text>
          <Text style={styles.HeaderText}>seamlessly & intuitively</Text>
        </View>
        <View style={styles.Body}>
          <View style={styles.ImgBody}>
            <Image source={ImgLogo} style={styles.Img} />
          </View>
          <View style={styles.ButtonBody}>
            <TouchableOpacity
              style={styles.ButtonSign}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text style={styles.TextSignIn}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ButtonCreate}
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              <Text style={styles.TextCreate}>Create an account</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.Bottom}>
          <Text style={styles.TextBottom}>Don't have an account? </Text>
          <TouchableOpacity
            style={{ height: 50, justifyContent: "center" }}
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            <Text style={[styles.TextBottom, styles.TextBottomSign]}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ScreenWelcome;
