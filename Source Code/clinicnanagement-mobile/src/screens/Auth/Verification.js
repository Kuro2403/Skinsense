import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React ,{useState} from "react";
import imgForgot from "../../assets/images/Background_forgotpassword.png";
import Icons from "react-native-vector-icons/AntDesign";
import styles from "../../../assets/style/Auth.style";
import Keybroad from "../../components/common/Keybroad";
import { _storeData,_retrieveData } from "../../utils/AsyncStoreService";
const Verification = ({ navigation }) => {
  const [NumberOne, setNumberOne] = useState("");
  const [NumberTwo, setNumberTwo] = useState("");
  const [NumberThree,setNumberThree] =useState("");
  const [NumberFour,setNumberFour] = useState("");

  const OnSubmit =async () => {
    const Verify = NumberOne+ NumberTwo+NumberThree+NumberFour;
    const codeVeri = await _retrieveData('codeForgot');
    if(Verify === codeVeri){
      navigation.navigate("ResetPass");
    }else{
      alert("Invalid code");
    }
    
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
              <Text style={[styles.Text, { marginTop: 10 }]}>
                Please enter the 4 digit code that send
              </Text>
              <Text style={styles.Text}>to your email address</Text>
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

export default Verification;
