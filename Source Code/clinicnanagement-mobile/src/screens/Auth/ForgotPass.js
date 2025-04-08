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
import IconsFontisto from "react-native-vector-icons/Fontisto";
import styles from "../../../assets/style/Auth.style";
import Keybroad from "../../components/common/Keybroad";
import { ForgotPasswordServices } from "../../api/emailServices";
import { _storeData,_retrieveData } from "../../utils/AsyncStoreService";

const ForgotPass = ({ navigation }) => {
  const [Email, setEmail] = useState("");
  const [validationMsg, setValidation] = useState("");
  const [CheckEmail, setCheckEmail] = useState(true);

  const validationAll = () => {
    const msg = {};
    let formData = {
      email: Email,
    
    };

    let regexEmail = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
   
    // Email
    if (!regexEmail.test(formData.email || formData.email === "")) {
      if (formData.email === "") {
        msg.email = "Email cannot be empty!";
      } else {
        msg.email = "Please enter you email in the format abc@def.xyz!";
      }
      setCheckEmail(false);
    } else {
      setCheckEmail(true);
    }
   
    

    setValidation(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };
  const OnSubmit = async() => {
    const isValid = validationAll();
    if (!isValid) return;
    const response =  await ForgotPasswordServices(Email);
    await _storeData('emailForgot',Email);
    await _storeData('codeForgot',response+'');
    navigation.navigate("Verification");
  };
  return (
    <Keybroad>
      <ImageBackground
        source={imgForgot}
        resizeMode="stretch"
        style={{ height: "100%", width: "100%" }}
      >
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Icons name="arrowleft" size={35} style={styles.IconLeft} />
          </TouchableOpacity>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.TextForgot}>Forgot password</Text>
          </View>
          <View style={[styles.Body, styles.BodyForgot]}>
            <View style={styles.Text_Header}>
              <Text style={styles.Text_Tittle}>Mail Address Here</Text>
              <Text style={[styles.Text, { marginTop: 10 }]}>
                Enter the email address associated{" "}
              </Text>
              <Text style={styles.Text}>with your account</Text>
            </View>

            <View style={styles.UserForm}>
              {/* Form */}
              <View style={styles.Form}>
                {/* Email */}
                <View style={styles.Form_Group}>
                  <Text style={styles.label}>Email</Text>
                  <View style={[styles.Form_input, styles.Form_Pass]}>
                    <IconsFontisto name="email" size={20} />
                    <TextInput
                      style={styles.Text_Email}
                      autoCapitalize="none"
                      onChangeText={(value) => setEmail(value)}
                    />
                  </View>
                  {!CheckEmail ? (
                    <Text style={styles.TextError}>{validationMsg.email}</Text>
                  ) : (
                    ""
                  )}
                </View>

                {/* button */}
                <TouchableOpacity
                  onPress={() => OnSubmit()}
                  style={styles.Button_Form}
                >
                  <Text style={styles.Text_Button}>Recover password</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </Keybroad>
  );
};

export default ForgotPass;
