import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import ImgBackground from "../../assets/images/Skinsense_function_background.png";
import Icons from "react-native-vector-icons/AntDesign";
import styles from "../../../assets/style/Appointment.style";
const DetailAppointment = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={ImgBackground}
        style={{ height: "100%", width: "100%" }}
        resizeMode="stretch"
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Appointment");
          }}
        >
          <Icons name="arrowleft" size={35} style={styles.IconLeft} />
        </TouchableOpacity>

        <View style={styles.Header_Detail}>
          <Text style={styles.Text_Detail}>Appointment ID: #4672</Text>
        </View>

        <View style={styles.Body}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.Text_Header}>
              <Text style={styles.txt_Medical_Header_Title}>
                Treatment date
              </Text>
              <Text style={styles.txt_Medical_id}>
                26 july 11 am to 12:30 pm
              </Text>
            </View>
            <View style={styles.Body_Total_Body}>
              <Text style={styles.txt_Medical_Header_Title}>
                Treatment name
              </Text>
              <Text style={styles.txt_Medical_Header_Title}>Total</Text>
              <Text style={styles.txt_Medical_Header_Title}>Duration</Text>
            </View>
            <View style={styles.Body_Total_Body}>
              <Text style={styles.txt_Medical_id}>Foundation Fundamentals</Text>
              <Text style={styles.txt_Medical_id}>x1</Text>
              <Text style={styles.txt_Medical_id}>30 minute</Text>
            </View>
            <View style={styles.Body_Total_Body}>
              <Text style={styles.txt_Medical_id}>Acne scar treatment</Text>
              <Text style={styles.txt_Medical_id}>x2</Text>
              <Text style={styles.txt_Medical_id}>60 minute</Text>
            </View>
            <View style={styles.Body_Total_Body}>
              <Text style={styles.txt_Medical_Header_Title}>Note</Text>
            </View>
            <Text style={styles.txt_Medical_id}>
              Acne affects up to 50 million Americans yearly, making it the most
              common skin condition in the United States. Whether you are young,
              old, male, or female, you are likely to experience acne at some
              point in your life, whether it is just the occasional pimple or
              chronic acne.
            </Text>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default DetailAppointment;
