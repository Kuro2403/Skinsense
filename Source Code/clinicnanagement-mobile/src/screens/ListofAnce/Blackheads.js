import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import ImgBackground from "../../assets/images/Skinsense_function_background.png";
import styles from "../../../assets/style/Invoice.style";
import Icons from "react-native-vector-icons/AntDesign";

const Blackheads = ({ navigation }) => {
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

      <View style={styles.Header}>
        <Text style={styles.Text}>Appointment</Text>
      </View>

       <View style={[styles.Body]}>
        <View style={{justifyContent:"center", alignItems:"center", marginTop:10}}>
          <View style={{justifyContent:"center",  alignItems:"center" , backgroundColor:"black" , width:200, height:60, borderRadius:20}}>
            <Text style={{color:"white", fontSize:17}}>Review Appointment</Text>
          </View>
          <View >

          </View>
        </View>
      </View> 
      

    </ImageBackground>
  </View>
  );
};

export default Blackheads;
