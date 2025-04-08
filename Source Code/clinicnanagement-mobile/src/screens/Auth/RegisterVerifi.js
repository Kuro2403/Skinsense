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
import { CreateAccountServices } from "../../api/accountServices";
import { getIdUserByMail } from "../../utils/checkUser";
import { CreatePatientServices } from "../../api/patientServices";
import { Login } from "../../api/authServices";
import { _storeData, _retrieveData } from "../../utils/AsyncStoreService";
const RegisterVerifi = ({ navigation }) => {
  const [NumberOne, setNumberOne] = useState("");
  const [NumberTwo, setNumberTwo] = useState("");
  const [NumberThree,setNumberThree] =useState("");
  const [NumberFour,setNumberFour] = useState("");
  
  const OnSubmit = async () => {
    const Verify = NumberOne+ NumberTwo+NumberThree+NumberFour
  
   alert(Verify)
    // if (Verify === _retrieveData('codeVerifi')) {
    //   const dataAccountPatient = JSON.parse(_retrieveData('newPatientInfo'));
    //   const accountPatient = {
    //     Password: dataAccountPatient.Password,
    //     Mail: dataAccountPatient.email,
    //     RoleID: '3'
    //   };
    //   await CreateAccountServices(accountPatient);
    //   const newUserObject = {
    //     Mail: dataAccountPatient.email,
    //     Password: dataAccountPatient.Password
    //   };
    //   const response = await Login(newUserObject);
    //   //sessionStorage.setItem('jwtToken', response.data);
    //   _storeData('jwtToken', response.data);
    //   const idAccountPatient = await getIdUserByMail(dataAccountPatient.email);
    //   const infoPatient = {
    //     accountID: idAccountPatient,
    //     name: dataAccountPatient.Name,
    //     address: dataAccountPatient.Address,
    //     phone: dataAccountPatient.phone,
    //     dob: dataAccountPatient.dob
    //   };
    //   await CreatePatientServices(infoPatient);
    //   navigation.navigate("Login");
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
              navigation.navigate("Register");
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
              <Text
                style={[
                  styles.Text,
                  styles.TextVerification,
                  { marginTop: 10 },
                ]}
              >
                After you have checked your email, get the code that has been
                sent to your mailbox to enter below, then click VERIFY to be
                able to confirm the information successfully.
              </Text>
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

export default RegisterVerifi;
