import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import ImgBackground from "../../assets/images/Skinsense_function_background.png";
import styles from "../../../assets/style/Profile.style";
import Icons from "react-native-vector-icons/AntDesign";
import IconEye from "react-native-vector-icons/Entypo";
import IconsLogin from "react-native-vector-icons/MaterialCommunityIcons";
import LogoUser from "../../assets/images/Man.png";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Keybroad from "../../components/common/Keybroad";
import { Dropdown } from "react-native-element-dropdown";
import { EditPatientServices } from "../../api/patientServices";
import { getUserByMail } from "../../utils/checkUser";
import { _storeData, _retrieveData } from "../../utils/AsyncStoreService";
// import { launchImageLibrary } from "react-native-image-picker";
// import * as ImagePicker from "react-native-image-picker";i
const EditProfile = ({ navigation }) => {
  // const patient = sessionStorage.getItem('Patient');
  // const data = JSON.parse(patient);
  // const [name, setname] = useState(data.name);
  // const [Email, setEmail] = useState(sessionStorage.getItem('emailLogin'));
  // const [Address, setAddress] = useState(data.address);
  // const [selectedData, setSelectedData] = useState("select date");
  // const [validationMsg, setValidation] = useState("");
  // const [Phone, setPhone] = useState(data.phone);
  // const [Dob, setDob] = useState(data.dob)
  const [name, setname] = useState("Trung Tin");
  const [Email, setEmail] = useState("tntrngtrung@gmail.com");
  const [Address, setAddress] = useState("Rach Gia, Viet Nam");
  const [selectedData, setSelectedData] = useState("select date");
  const [validationMsg, setValidation] = useState("");
  const [Phone, setPhone] = useState("");
  const [Dob, setDob] = useState("24/03/2001");
  const [Checkname, setCheckname] = useState(true);
  const [CheckEmail, setCheckEmail] = useState(true);
  const [CheckAddress, setCheckAddress] = useState(true);

  const [CheckDob, setCheckDob] = useState(true);
  const [isCheckMale, setCheckMale] = useState(true);
  const [isCheckFemale, setCheckFemale] = useState(false);
  const [isCheckAnother, setCheckAnother] = useState(false);
  const [Gender, setGender] = useState("Male");
  const [showGender, setShowGender] = useState(false);
  const onPressMale = () => {
    setCheckMale(true);
    setCheckFemale(false);
    setCheckAnother(false);
    setShowGender(false);
    setGender("Male");
  };
  const onPressFemale = () => {
    setCheckMale(false);
    setCheckFemale(true);
    setCheckAnother(false);
    setShowGender(false);
    setGender("Female");
  };
  const onPressAnther = () => {
    setCheckMale(false);
    setCheckFemale(false);
    setCheckAnother(true);
    setShowGender(false);
    setGender("Another");
  };
  const validationAll = () => {
    const msg = {};
    let formData = {
      dob: Dob,
      phone: Phone,
      name: name,
      email: Email,

      address: Address,
      date: selectedData,
    };

    let regexEmail = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    let regDob = new RegExp(
      /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
    );
    if (formData.Address === "") {
      msg.Address = "Address cannot be empty!";
      setCheckAddress(false);
    } else {
      setCheckAddress(true);
    }
    // name
    if (
      formData.name === "" ||
      formData.name.length < 3 ||
      formData.name.length > 16
    ) {
      if (formData.name === "") {
        msg.name = "name cannot be empty!";
      } else {
        msg.name = " name should be 3-16 characters";
      }
      setCheckname(false);
    } else {
      setCheckname(true);
    }
    // Email
    if (!regexEmail.test(formData.email || formData.email === "")) {
      if (formData.email === "") {
        msg.email = "Email cannot be empty!";
      } else {
        msg.email = "Invalid email";
      }
      setCheckEmail(false);
    } else {
      setCheckEmail(true);
    }

    if (formData.dob === "" || !regDob.test(formData.dob)) {
      if (formData.dob === "") {
        msg.dob = "Day of birth cannot be empty!";
      } else {
        msg.dob = "Invalid date of birth";
      }
      setCheckDob(false);
    } else {
      setCheckDob(true);
    }

    // Address
    if (formData.address === "") {
      msg.Address = "Address cannot be empty!";
      setCheckAddress(false);
    } else {
      setCheckAddress(true);
    }
    setValidation(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const CheckGender = () => {
    setShowGender(true);
  };
  const ChangAvatar = () => {
    // var options = {
    //   title: "Select Avatar",
    //   storageOptions: {
    //     skipBackup: true,
    //     path: "images",
    //   },
    // };
    // ImagePicker.launchImageLibrary(options, (response) => {
    //   // Same code as in above section!
    //   let source = { uri: response.data };

    //   if (response.data) {
    //     if (clickedPage == "report") {
    //       this.props.addressActions.addImage({ res: response.data });
    //     } else {
    //       this.props.accountActions.addImage({ res: response.data });
    //     }
    //   }
    // });
  };
  // useEffect(() => {

  // });
  const OnSubmit = async () => {
    const isValid = validationAll();
    if (!isValid) return;
    navigation.navigate("ChangeAnEmail");
    //   // const patient = sessionStorage.getItem('Patient');
    //   const patient = _retrieveData('Patient');
    //   const data = JSON.parse(patient);
    //   const newInfoPatient = {
    //     Address:Address,
    //     Name: name,
    //     Dob: Dob,
    //     AccountID: data.accountID
    //   };

    //   await EditPatientServices(data.accountID,newInfoPatient);
    //   //const patientNew = await getUserByMail(sessionStorage.getItem('emailLogin'));
    //   const patientNew = await getUserByMail(_retrieveData('emailLogin'));

    //   //sessionStorage.setItem('Patient',JSON.stringify(patientNew));
    //   _storeData('Patient',JSON.stringify(patientNew));
    //   return;
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={ImgBackground}
        style={{ height: "100%", width: "100%" }}
        resizeMode="stretch"
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <Icons name="arrowleft" size={35} style={styles.IconLeft} />
        </TouchableOpacity>

        <View style={styles.Header_Detail}>
          <Text style={styles.Text_Detail}>Edit Profile</Text>
        </View>

        <View style={styles.Body}>
          <Keybroad>
            <ScrollView style={styles.scrollView}>
              {/* Change your avatar */}
              <View style={styles.Edit_Width}>
                <TouchableOpacity
                  style={styles.EditFlex}
                  onPress={() => ChangAvatar()}
                >
                  <Text style={styles.Edit_txt}>Change your avatar</Text>
                  <Image
                    source={LogoUser}
                    style={styles.ImageUserProfile}
                    resizeMode="stretch"
                  ></Image>
                </TouchableOpacity>
              </View>
              {/* Your Name */}
              <View style={styles.Edit_Width}>
                <View style={styles.EditFlex}>
                  <Text style={styles.Edit_txt}>Name</Text>
                  <TextInput
                    style={styles.Form_input}
                    onChangeText={(text) => setname(text)}
                    value={name}
                  />
                </View>
                {!Checkname ? (
                  <Text style={styles.TextError}>{validationMsg.name}</Text>
                ) : (
                  ""
                )}
              </View>
              {/* PAssword */}
              <View style={styles.Edit_Width}>
                <TouchableOpacity
                  style={styles.EditFlex}
                  onPress={() => {
                    navigation.navigate("ChangNewPass");
                  }}
                >
                  <Text style={styles.Edit_txt}>Password</Text>
                  <View style={styles.button_Pass}>
                    <Text style={styles.Txt_Pass}>Reset - password</Text>
                  </View>
                </TouchableOpacity>
              </View>
              {/* Email */}
              <View style={styles.Edit_Width}>
                <View style={styles.EditFlex}>
                  <Text style={styles.Edit_txt}>Email</Text>
                  <TextInput
                    style={styles.Form_input}
                    onChangeText={(text) => setEmail(text)}
                    value={Email}
                    // editable={false}
                  />
                </View>
                {!CheckEmail ? (
                  <Text style={styles.TextError}>{validationMsg.email}</Text>
                ) : (
                  ""
                )}
              </View>
              {/* Address */}
              <View style={styles.Edit_Width}>
                <View style={styles.EditFlex}>
                  <Text style={styles.Edit_txt}>Address</Text>
                  <TextInput
                    style={styles.Form_input}
                    onChangeText={(text) => setAddress(text)}
                    value={Address}
                  />
                </View>
                {!CheckAddress ? (
                  <Text style={styles.TextError}>{validationMsg.address}</Text>
                ) : (
                  ""
                )}
              </View>

              {/* dob */}
              <View style={styles.Edit_Width}>
                <View style={styles.EditFlex}>
                  <Text style={styles.Edit_txt}>Day of birth</Text>
                  <TextInput
                    style={styles.Form_input}
                    onChangeText={(text) => setDob(text)}
                    value={Dob}
                  />
                </View>
                {!CheckDob ? (
                  <Text style={styles.TextError}>{validationMsg.dob}</Text>
                ) : (
                  ""
                )}
              </View>
              {/* gender */}
              <View style={styles.Edit_Width}>
                <TouchableOpacity
                  style={styles.EditFlex}
                  onPress={() => CheckGender()}
                >
                  <Text style={styles.Edit_txt}>Sex</Text>
                  <Text style={styles.Form_input}> {Gender}</Text>
                </TouchableOpacity>

                {showGender ? (
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
                ) : (
                  ""
                )}
              </View>
              <View style={styles.Button_center}>
                <TouchableOpacity
                  style={styles.Button_Save}
                  onPress={() => OnSubmit()}
                >
                  <Text style={styles.Txt_Save}>Save</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Keybroad>
        </View>
      </ImageBackground>
    </View>
  );
};

export default EditProfile;
