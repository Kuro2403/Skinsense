import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import imgForgot from "../../assets/images/Background_forgotpassword.png";
import Icons from "react-native-vector-icons/AntDesign";
import styles from "../../../assets/style/Auth.style";
import Keybroad from "../../components/common/Keybroad";
import { _storeData, _retrieveData } from "../../utils/AsyncStoreService";
const ChangeAnEmail = ({ navigation }) => {
  const [NumberOne, setNumberOne] = useState("");
  const [NumberTwo, setNumberTwo] = useState("");
  const [NumberThree, setNumberThree] = useState("");
  const [NumberFour, setNumberFour] = useState("");
  const OnSubmit = () => {
    const Verify = NumberOne + NumberTwo + NumberThree + NumberFour;
    navigation.navigate("Profile");
    // if(Verify === _retrieveData('codeForgot')){
    //   navigation.navigate("ResetPass");
    // }else{
    //   alert("Invalid code");
    // }
  };
  return (
    <Keybroad>
      <View style={styles.container}>
        <ImageBackground
          source={imgForgot}
          style={{ height: "100%", width: "100%" }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Icons name="arrowleft" size={35} style={styles.IconLeft} />
          </TouchableOpacity>

          <View style={{ alignItems: "center" }}>
            <Text style={styles.TextForgot}>Email verification</Text>
          </View>
          <View style={[styles.Body, styles.BodyForgot]}>
            <View style={styles.Text_Header}>
              <Text style={styles.Text_Tittle}>Get your code</Text>
              <Text style={[styles.Text_ver, { marginTop: 10 }]}>
                After you have checked your email, get the code that
              </Text>
              <Text style={styles.Text_ver}>has been sent to your mailbox to enter below, then</Text>
              <Text style={styles.Text_ver}>click VERIFY to be able to confirm the information</Text>
              <Text style={styles.Text_ver}>successfully.</Text>
            </View>
            <View style={styles.Form_Verification}>
              <TextInput
                maxLength={1}
                onChangeText={(value) => setNumberOne(value)}
                value={NumberOne}
                textAlign="center"
                keyboardType="numeric"
                style={styles.Input_Verification}
              />
              <TextInput
                maxLength={1}
                onChangeText={(value) => setNumberTwo(value)}
                value={NumberTwo}
                textAlign="center"
                keyboardType="numeric"
                style={styles.Input_Verification}
              />
              <TextInput
                maxLength={1}
                onChangeText={(value) => setNumberThree(value)}
                value={NumberThree}
                textAlign="center"
                keyboardType="numeric"
                style={styles.Input_Verification}
              />
              <TextInput
                maxLength={1}
                onChangeText={(value) => setNumberFour(value)}
                value={NumberFour}
                textAlign="center"
                keyboardType="numeric"
                style={styles.Input_Verification}
              />
            </View>
            {/* button */}
            <TouchableOpacity
              onPress={() => {
                OnSubmit();
              }}
              style={[styles.Button_Form, { marginTop: 30 }]}
            >
              <Text style={styles.Text_Button}>Verify and proceed</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </Keybroad>
  );
};

export default ChangeAnEmail;
