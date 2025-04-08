import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";

import React, { useState } from "react";
import Icons from "react-native-vector-icons/AntDesign";
import IconEye from "react-native-vector-icons/Entypo";
import styles from "../../../assets/style/Auth.style";
import ImgLogin from "../../assets/images/Background_login.png";
import Keybroad from "../../components/common/Keybroad";
import axios from "../../api/axios";
import { getUserByMail } from "../../utils/checkUser";
import { _storeData, _retrieveData } from "../../utils/AsyncStoreService";

const Login = ({ navigation }) => {
  //js
  const [Username, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [showPassword, setshowPassword] = useState("");
  const ValidationAll = () => {
    if (Username.length === 0 || Password.length === 0) {
      alert("Email or Password not empty");
      return false;
    }
    return true;
  };

  const Submit = async (e) => {
    const isValid = ValidationAll();
    if (!isValid) return;   
    await axios.post('/Logins/Login', {
      "email": Username,
      "password": Password
    })
      .then(async function (response) {

        if (response.success === true) {
          await _storeData('jwtToken', response.data);
          const patient = await getUserByMail(Username);
          _storeData('emailLogin', Username);
          _storeData('Patient', JSON.stringify(patient));
          console.log(await _retrieveData('Patient'));
          setUserName('');
          setPassword('');
          navigation.navigate("MyTabs");   
        } else {
          alert("Invalid Email or Password");
        }
      })
      .catch(function (error) {
        console.log(error);
      });


  };

  return (
    <Keybroad>
      <View style={styles.container}>
        <ImageBackground
          source={ImgLogin}
          style={{ height: "100%", width: "100%" }}
          resizeMode="stretch"
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ScreenWelcome");
            }}
          >
            <Icons name="arrowleft" size={35} style={styles.IconLeft} />
          </TouchableOpacity>

          <Text style={styles.TextLogin}>Login</Text>
          <View style={[styles.Body, styles.BodyLogin]}>
            <View style={styles.Text_Body}>
              <Text style={styles.Text_Welcome}>Welcome back!</Text>
              <Text style={styles.Text}>
                Hello there, sign in to continute!
              </Text>
            </View>
            <View style={styles.User}>
              <View style={styles.Form_Group}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  maxLength={35}
                  onChangeText={(text) => setUserName(text)}
                  value={Username}
                  placeholder="Enter your email"
                  style={styles.Form_input}
                />
              </View>
              <View style={styles.Form_Group}>
                <Text style={styles.label}>Password</Text>
                <View style={[styles.Form_input, styles.Form_Pass]}>
                  <TextInput
                    style={styles.InputTextForm}
                    maxLength={30}
                    onChangeText={(text) => setPassword(text)}
                    placeholder="Enter your password"
                    secureTextEntry={showPassword ? false : true}
                  />
                  <TouchableOpacity
                    style={{ padding: 10 }}
                    onPress={() => setshowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <IconEye
                        name="eye"
                        size={25}
                        color="black"
                        style={{ right: 0 }}
                      />
                    ) : (
                      <IconEye
                        name="eye-with-line"
                        size={25}
                        color="black"
                        style={{ right: 0 }}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ForgotPass");
                  }}
                >
                  <Text style={styles.Text_forget}>Forgot password?</Text>
                </TouchableOpacity>
                <View>
                  <TouchableOpacity onPress={Submit} style={styles.Button_Form}>
                    <Text style={styles.Text_Button}>Sign in</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={[styles.Bottom, styles.BottomLogin]}>
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
          </View>
        </ImageBackground>
      </View>
    </Keybroad>
  );
};

export default Login;
