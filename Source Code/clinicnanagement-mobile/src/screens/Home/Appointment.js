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
import styles from "../../../assets/style/Appointment.style";
import Icons from "react-native-vector-icons/AntDesign";
import ImgAdd from "../../assets/images/Add.png";
const Appoiment = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={ImgBackground}
        style={{ height: "100%", width: "100%" }}
        resizeMode="stretch"
      >
        <View style={styles.Header}>
          <Text style={styles.Text}>List Of Appointment</Text>
        </View>
        <View style={[styles.Body, styles.bodyCenter]}>
          {/* buttonCreate */}
          <TouchableOpacity
            style={styles.Medical_Create}
            onPress={() => {
              navigation.navigate("CreateAppoiment");
            }}
          >
            <View style={styles.Medical_Create_Text}>
              <Text style={styles.Medical_Create_Txt}>Make an appointment</Text>
              <Image source={ImgAdd} style={styles.ImgAdd}></Image>
            </View>
          </TouchableOpacity>
          <ScrollView style={styles.scrollView}>
            {/* list appointment */}
            <View style={styles.Medical}>
              <View style={styles.text_Medical_header}>
                <Text style={styles.txt_Medical_Title}>Medicine</Text>
                <Text style={styles.txt_Medical_id}>id: #4672</Text>
              </View>
              <View style={styles.text_Medical}>
                <View>
                  <Text>Assigned</Text>
                  <Text style={styles.txt_Medical}>Tinne</Text>
                </View>
                <View style={styles.txt_Medical_content}>
                  <Text>Invoice date</Text>
                  <Text style={styles.txt_Medical}>26 july, 2023</Text>
                </View>
              </View>
              <View style={styles.Notification_Medical}>
                <View style={styles.MedicalComplete}>
                  <Text style={styles.Medical_Txt_button}>Cancel</Text>
                </View>

              </View>
            </View>
           
            <View style={styles.MedicalEnd}></View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Appoiment;
