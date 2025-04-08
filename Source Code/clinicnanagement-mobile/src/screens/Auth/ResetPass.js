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
import IconSimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import styles from "../../../assets/style/Auth.style";
import IconEye from "react-native-vector-icons/Entypo";
import Keybroad from "../../components/common/Keybroad";
import { EditAccountServices } from "../../api/accountServices";
import { Login } from "../../api/authServices";
import { getAccountByMail } from "../../utils/checkUser";
import { _retrieveData, _storeData } from "../../utils/AsyncStoreService";

const ResetPass = ({ navigation }) => {
  //Js
  const [Password, setPassword] = useState("");
  const [RePassword, setRePassword] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [showRePassword, setShowRePassword] = useState("");
  const [validationMsg, setValidation] = useState("");
  const [CheckPassword, setCheckPassword] = useState(true);
  const [CheckRePassword, setCheckRePassword] = useState(true);

  const validationAll = () => {
    const msg = {};
    let formData = {

      Password: Password,
      RePassword: RePassword,
    };


    let regPass = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);
    // Username
    // Password
    if (formData.Password === "" || !regPass.test(formData.Password)) {
      if (formData.Password === "") {
        msg.Password = "Password cannot be empty!";
      } else {
        msg.Password =
          "Must contain minimum 8 characters, at least one uppercase letter, one lowercase letter, one number ";
      }
      setCheckPassword(false);
    } else {
      setCheckPassword(true);
    }
    // Re_Password
    if (
      formData.RePassword === "" ||
      !formData.RePassword.match(formData.Password)
    ) {
      if (formData.RePassword === "") {
        msg.RePassword = "Password cannot be empty!";
      } else {
        msg.RePassword = "Your Passwords do not match";
      }
      setCheckRePassword(false);
    } else {
      setCheckRePassword(true);
    }

    setValidation(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };
  const OnSubmit = async () => {
    const isValid = validationAll();
    if (!isValid) return;
    const account_ = await getAccountByMail(await _retrieveData('emailForgot'));
    const infoUpdateUser = {
      password: Password,
      mail:account_.mail,
      avatar:account_.avatar,
      gender:account_.gender,
      roleID:account_.roleID
    }
    await EditAccountServices(account_.accountID,infoUpdateUser);
    navigation.navigate("Login");
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
            <Text style={styles.TextForgot}>Reset password</Text>
          </View>
          <View style={[styles.Body, styles.BodyForgot]}>
            <View style={styles.Text_Header}>
              <Text style={styles.Text_Tittle}>Enter new password</Text>
              <Text style={[styles.Text, { marginTop: 10 }]}>
                Your new password must be different
              </Text>
              <Text style={styles.Text}>from previously used password</Text>
            </View>
            <View style={styles.UserForm}>
              {/* Form */}
              <View style={styles.Form}>
                {/* Pass */}
                <View style={styles.Form_Group}>
                  <Text style={styles.label}>Password</Text>
                  <View style={[styles.Form_input, styles.Form_Pass]}>
                    <IconSimpleLineIcons name="lock" size={20} />
                    <TextInput
                      style={styles.Text_ResetPass}
                      onChangeText={(value) => setPassword(value)}
                      secureTextEntry={showPassword ? false : true}
                    />
                    {/* Icon */}
                    <TouchableOpacity
                      style={{ padding: 10 }}
                      onPress={() => setShowPassword(!showPassword)}
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
                  {!CheckPassword ? (
                    <Text style={styles.TextError}>
                      {validationMsg.Password}
                    </Text>
                  ) : (
                    ""
                  )}
                </View>

                {/* Re-Pass */}
                <View style={styles.Form_Group}>
                  <Text style={styles.label}>Re - Password</Text>
                  <View style={[styles.Form_input, styles.Form_Pass]}>
                    <IconSimpleLineIcons name="lock" size={20} />
                    <TextInput
                      style={styles.Text_ResetPass}
                      onChangeText={(value) => setRePassword(value)}
                      secureTextEntry={showRePassword ? false : true}
                    />
                    {/* Icon */}
                    <TouchableOpacity
                      style={{ padding: 10 }}
                      onPress={() => setShowRePassword(!showRePassword)}
                    >
                      {showRePassword ? (
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
                  {!CheckRePassword ? (
                    <Text style={styles.TextError}>
                      {validationMsg.RePassword}
                    </Text>
                  ) : (
                    ""
                  )}
                </View>

                {/* button */}
                <TouchableOpacity
                  onPress={() => OnSubmit()}
                  style={styles.Button_Form}
                >
                  <Text style={styles.Text_Button}>Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </Keybroad>
  );
};

export default ResetPass;
