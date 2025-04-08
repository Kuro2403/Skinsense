import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import ImgBackground from "../../assets/images/Skinsense_function_background.png";
import styles from "../../../assets/style/Profile.style";
import Icons from "react-native-vector-icons/AntDesign";
import IconsLogin from "react-native-vector-icons/MaterialCommunityIcons";
import LogoUser from "../../assets/images/Man.png";
import SexGender from "../../assets/images/Sex.png";
import ImgAddress from "../../assets/images/Placeholder.png";
import UserProfile from "../../assets/images/UserProfile.png";
import CalendarProfile from "../../assets/images/CalendarProfile.png";
import ImgPhone from "../../assets/images/Phone_call.png";
import { _storeData, _retrieveData } from "../../utils/AsyncStoreService";

const Profile = ({ navigation }) => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Address, setAddress] = useState("");
  const [Dob, setDob] = useState("");
  const [Sex, setSex] = useState("");
  const [avtProfile, setAvtProfile] = useState('');

  useEffect(() => {
    getPatient();
  });
  const getPatient = async () => {
    const patient = await _retrieveData('Patient');
    const data = JSON.parse(patient);
    setName(data.name);
    setEmail(data.account.mail);
    setPhone(data.phone);
    setAddress(data.address);
    setDob(data.dob);
    setSex(data.account.gender);
    setAvtProfile(data.account.avatar);
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
            navigation.navigate("Home");
          }}
        >
          <Icons name="arrowleft" size={35} style={styles.IconLeft} />
        </TouchableOpacity>

        <View style={styles.Header_Detail}>
          <Text style={styles.Text_Detail}>Profile</Text>
        </View>
        <View style={styles.Account_Header}>
          <View>
            <Image
              key={avtProfile}
              source={{ uri: avtProfile ? avtProfile : null }}
              style={styles.ImageUser}
              resizeMode="stretch"
            ></Image>
          </View>
          <View style={styles.Txt_Button_edit}>
            {/* <Text style={styles.Txt_Email}> {Name}</Text>
            <Text style={styles.Txt_Email}> {Email}</Text>
            <Text style={styles.Txt_Email}> {Phone}</Text>
            <Text style={styles.Txt_Email}> {Address}</Text>
            <Text style={styles.Txt_Email}> {Dob}</Text>
             */}
            <Text style={styles.Txt_Email}> {Email}</Text>

            <TouchableOpacity
              style={styles.Button_edit}
              onPress={() => {
                navigation.navigate("EditProfile");
              }}
            >
              <Text style={styles.Txt_Edit}> Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.Body}>
          <ScrollView style={styles.scrollView}>
            {/* Profile user*/}
            <View style={styles.contents}>
              {/* name */}
              <View style={styles.UserProfile}>
                <View style={styles.UserProfile_img}>
                  <Image
                    source={UserProfile}
                    style={styles.ImageUser}
                    resizeMode="stretch"
                  />
                  <Text style={styles.Text_User}>Name</Text>
                </View>
                <Text style={styles.Text_User}>{Name}</Text>
              </View>
              {/* address */}
              <View style={styles.UserProfile}>
                <View style={styles.UserProfile_img}>
                  <Image
                    source={ImgAddress}
                    style={styles.ImageUser}
                    resizeMode="stretch"
                  />
                  <Text style={styles.Text_User}>Address</Text>
                </View>
                <Text style={styles.Text_User}>{Address}</Text>
              </View>
              {/* Calendar */}
              <View style={styles.UserProfile}>
                <View style={styles.UserProfile_img}>
                  <Image
                    source={CalendarProfile}
                    style={styles.ImageUser}
                    resizeMode="stretch"
                  />
                  <Text style={styles.Text_User}>Date of birth</Text>
                </View>
                <Text style={styles.Text_User}>{Dob}</Text>
              </View>
              {/* gender */}
              <View style={styles.UserProfile}>
                <View style={styles.UserProfile_img}>
                  <Image
                    source={SexGender}
                    style={styles.ImageUser}
                    resizeMode="stretch"
                  />
                  <Text style={styles.Text_User}>Sex</Text>
                </View>
                <Text style={styles.Text_User}>{Sex}</Text>
              </View>
              {/* phone */}
              <View style={styles.UserProfile}>
                <View style={styles.UserProfile_img}>
                  <Image
                    source={ImgPhone}
                    style={styles.ImageUser}
                    resizeMode="stretch"
                  />
                  <Text style={styles.Text_User}>Phone</Text>
                </View>
                <Text style={styles.Text_User}>{Phone}</Text>
              </View>
            </View>

            {/* Services */}
            <View style={styles.contents}>
              <Text style={styles.Header_Txt}>Services</Text>
              <View style={styles.Table_of_contents}>
                <TouchableOpacity style={styles.contents_Title} onPress={() => {
                  navigation.navigate("Appointment");
                }}>
                  <Text style={styles.Text_contents}> Appointment</Text>
                  <Icons name="right" size={35} />
                </TouchableOpacity>
                <View style={styles.brick} />
                <View style={styles.contents_Title_2}>
                  <Text style={styles.Text_contents}> Scan AI</Text>
                  <Icons name="right" size={35} />
                </View>
              </View>
            </View>
            {/* Report */}
            <View style={styles.contents}>
              <Text style={styles.Header_Txt}>Report</Text>
              <View style={styles.Table_of_contents}>
                <View style={styles.contents_Title}>
                  <Text style={styles.Text_contents}> Medical report</Text>
                  <Icons name="right" size={35} />
                </View>
                <View style={styles.brick} />
                <View style={styles.contents_Title_2}>
                  <Text style={styles.Text_contents}> Invoice</Text>
                  <Icons name="right" size={35} />
                </View>
                <View style={styles.brick} />
                <View style={styles.contents_Title_2}>
                  <Text style={styles.Text_contents}> Appointment list</Text>
                  <Icons name="right" size={35} />
                </View>
              </View>
            </View>
            {/* Settings */}
            <View style={styles.contents}>
              <Text style={styles.Header_Txt}>Settings</Text>
              <View style={styles.Table_of_contents}>
                <View style={styles.contents_Title}>
                  <Text style={styles.Text_contents}> Contact</Text>
                  <Icons name="right" size={35} />
                </View>
                <View style={styles.brick} />
                <View style={styles.contents_Title_2}>
                  <Text style={styles.Text_contents}> Ask a questions</Text>
                  <Icons name="right" size={35} />
                </View>
              </View>
            </View>
            {/* Policy */}
            <View style={styles.contents}>
              <Text style={styles.Header_Txt}>Policy</Text>
              <View style={styles.Table_of_contents}>
                <View style={styles.contents_Title}>
                  <Text style={styles.Text_contents}> FAQ</Text>
                  <Icons name="right" size={35} />
                </View>
                <View style={styles.brick} />
                <View style={styles.contents_Title_2}>
                  <Text style={styles.Text_contents}> Privacy policy</Text>
                  <Icons name="right" size={35} />
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.Logout}
              onPress={() => {
                navigation.navigate("ScreenWelcome");
              }}
            >
              <IconsLogin
                name="logout"
                size={50}
                style={styles.Button_logout}
              />
              <Text style={styles.Text_logout}>Logout</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Profile;
