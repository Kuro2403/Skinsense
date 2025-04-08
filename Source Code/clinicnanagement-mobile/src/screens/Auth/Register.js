import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Icons from "react-native-vector-icons/AntDesign";
import IconEye from "react-native-vector-icons/Entypo";
import styles from "../../../assets/style/Auth.style";
import ImgRegister from "../../assets/images/Background_register.png";
import Keybroad from "../../components/common/Keybroad";

const Register = ({ navigation }) => {
  const [Address, setAddress] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Password, setPassword] = useState("");
  const [RePassword, setRePassword] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [showRePassword, setShowRePassword] = useState("");
  const [validationMsg, setValidation] = useState("");
  const [username, setUsername] = useState("");
  const [CheckUsername, setCheckUsername] = useState(true);
  const [Dob, setDob] = useState("");
  const [CheckAddress, setCheckAddress] = useState(true);
  const [CheckEmail, setCheckEmail] = useState(true);
  const [CheckPhone, setCheckPhone] = useState(true);
  const [CheckDob, setCheckDob] = useState(true);
  const [CheckPassword, setCheckPassword] = useState(true);
  const [CheckRePassword, setCheckRePassword] = useState(true);
  const [isCheckMale, setCheckMale] = useState(true);
  const [isCheckFemale, setCheckFemale] = useState(false);
  const [isCheckAnother, setCheckAnother] = useState(false);
  const [Gender, setGender] = useState("Male");

  const onPressMale = () => {
    setCheckMale(true);
    setCheckFemale(false);
    setCheckAnother(false);
    setGender("Male");
  };
  const onPressFemale = () => {
    setCheckMale(false);
    setCheckFemale(true);
    setCheckAnother(false);
    setGender("Female");
  };
  const onPressAnther = () => {
    setCheckMale(false);
    setCheckFemale(false);
    setCheckAnother(true);
    setGender("Another");
  };

  const validationAll = () => {
    const msg = {};
    let formData = {
      Address: Address,
      email: Email,
      phone: Phone,
      username: username,
      dob: Dob,
      Password: Password,
      RePassword: RePassword,
      Gender: Gender,
    };

    let regexEmail = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    let regPass = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);

    let regPhone = new RegExp(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/);
    let regDob = new RegExp(
      /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
    );
    // Address
    if (formData.Address === "") {
      msg.Address = "Address cannot be empty!";
      setCheckAddress(false);
    } else {
      setCheckAddress(true);
    }

    // Username
    if (
      formData.username === "" ||
      formData.username.length < 4 ||
      formData.username.length > 15
    ) {
      if (formData.username === "") {
        msg.username = "UserName cannot be empty!";
      } else {
        msg.username =
          "UserName must be between 5 and 15 characters, and only contain letter, numbers, and underscores!";
      }
      setCheckUsername(false);
    } else {
      setCheckUsername(true);
    }
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
    // Phone
    if (formData.phone === "" || !regPhone.test(formData.phone)) {
      if (formData.phone === "") {
        msg.phone = "Phone number cannot be empty!";
      } else {
        msg.phone = "Phone number is invalid! ";
      }
      setCheckPhone(false);
    } else {
      setCheckPhone(true);
    }

    if (formData.dob === "" || !regDob.test(formData.dob)) {
      if (formData.dob === "") {
        msg.dob = "Day of birth cannot be empty!";
      } else {
        msg.dob = "date of birth DD/MM/YEAR";
      }
      setCheckDob(false);
    } else {
      setCheckDob(true);
    }
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
  const OnSubmit = () => {
    // const isValid = validationAll();
    // if (!isValid) return;
    navigation.navigate("RegisterVerifi");
    // const newPatientInfo = {
    //   Address: Address,
    //   email: Email,
    //   phone: Phone,
    //   dob: Dob,
    //   Password: Password,
    //   RePassword: RePassword,
    //   Name: Name,
    //   Gender : Gender
    // };
    // const objectString = JSON.stringify(newPatientInfo);
    // //sessionStorage.setItem('newPatientInfo', objectString);
    // _storeData("newPatientInfo", objectString);
    // const dataCode = await RegisterServices(newPatientInfo.email);
    // //sessionStorage.setItem('codeVerifi', dataCode);
    // _storeData("codeVerifi", dataCode);
  };
  return (
    <ImageBackground
      source={ImgRegister}
      style={{ height: "100%", width: "100%" }}
      resizeMode="stretch"
    >
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ScreenWelcome");
          }}
        >
          <Icons name="arrowleft" size={35} style={styles.IconLeft} />
        </TouchableOpacity>
        <Text style={styles.TextHeader}>Register</Text>
        <View style={[styles.Body, styles.BodyRegister]}>
          <Keybroad>
            <ScrollView>
              <View style={styles.UserForm}>
                {/* Form */}
                <View style={styles.Form}>
                  {/* Email */}
                  <View style={styles.Form_Group}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                      style={styles.Form_input}
                      onChangeText={(value) => setEmail(value)}
                      placeholder="Enter your email"
                    />
                    {!CheckEmail ? (
                      <Text style={styles.TextError}>
                        {validationMsg.email}
                      </Text>
                    ) : (
                      ""
                    )}
                  </View>
                  {/* User Name */}
                  <View style={styles.Form_Group}>
                    <Text style={styles.label}>Username</Text>
                    <TextInput
                      style={styles.Form_input}
                      onChangeText={(value) => setUsername(value)}
                      placeholder="Enter your username"
                    />
                    {!CheckUsername ? (
                      <Text style={styles.TextError}>
                        {validationMsg.username}
                      </Text>
                    ) : (
                      ""
                    )}
                  </View>
                  {/* Pass */}
                  <View style={styles.Form_Group}>
                    <Text style={styles.label}>Password</Text>
                    <View style={[styles.Form_input, styles.Form_Pass]}>
                      <TextInput
                        style={styles.InputTextForm}
                        onChangeText={(value) => setPassword(value)}
                        placeholder="Enter your password"
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
                      <TextInput
                        style={styles.InputTextForm}
                        onChangeText={(value) => setRePassword(value)}
                        placeholder="Enter your password"
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
                  {/* Address */}
                  <View style={styles.Form_Group}>
                    <Text style={styles.label}>Address</Text>
                    <TextInput
                      style={styles.Form_input}
                      placeholder="Enter your address"
                      onChangeText={(value) => setAddress(value)}
                    />
                    {!CheckAddress ? (
                      <Text style={styles.TextError}>
                        {validationMsg.Address}
                      </Text>
                    ) : (
                      ""
                    )}
                  </View>
                  {/* phone */}
                  <View style={styles.Form_Group}>
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput
                      style={styles.Form_input}
                      placeholder="Enter your Phone"
                      onChangeText={(value) => setPhone(value)}
                      keyboardType="numeric"
                    />
                    {!CheckPhone ? (
                      <Text style={styles.TextError}>
                        {validationMsg.phone}
                      </Text>
                    ) : (
                      ""
                    )}
                  </View>
                  {/* dob */}
                  <View style={styles.Form_Group}>
                    <Text style={styles.label}>Day of birth</Text>
                    <TextInput
                      style={styles.Form_input}
                      onChangeText={(value) => setDob(value)}
                      placeholder="Day / Month / Year"
                    />
                    {!CheckDob ? (
                      <Text style={styles.TextError}>{validationMsg.dob}</Text>
                    ) : (
                      ""
                    )}
                  </View>

                  {/* Gender */}
                  <View style={styles.Form_Group}>
                    <Text style={styles.label}>Gender</Text>
                    <View style={styles.checkboxGender}>
                      <TouchableOpacity
                        style={styles.checkMale}
                        onPress={() => onPressMale()}
                      >
                        <View style={styles.Outter}>
                          {isCheckMale ? <View style={styles.inner} /> : ""}
                        </View>
                        <View>
                          <Text style={styles.textGender}>Male</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.checkMale}
                        onPress={() => onPressFemale()}
                      >
                        <View style={styles.Outter}>
                          {isCheckFemale ? <View style={styles.inner} /> : ""}
                        </View>
                        <View>
                          <Text style={styles.textGender}>Female</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.checkMale}
                        onPress={() => onPressAnther()}
                      >
                        <View style={styles.Outter}>
                          {isCheckAnother ? <View style={styles.inner} /> : ""}
                        </View>
                        <View>
                          <Text style={styles.textGender}>Another</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {/* button */}
                  <TouchableOpacity
                    style={styles.Button_Form}
                    onPress={() => OnSubmit()}
                  >
                    <Text style={styles.Text_Button}>Create an account</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[styles.Bottom, styles.BottomRegister]}>
                <Text style={styles.TextBottom}>Already have an account? </Text>
                <TouchableOpacity
                  style={{ height: 50, justifyContent: "center" }}
                  onPress={() => {
                    navigation.navigate("Login");
                  }}
                >
                  <Text style={[styles.TextBottom, styles.TextBottomSign]}>
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Keybroad>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Register;
