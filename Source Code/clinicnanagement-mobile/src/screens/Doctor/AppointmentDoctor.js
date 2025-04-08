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

const AppointmentDoctor = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={ImgBackground}
        style={{ height: "100%", width: "100%" }}
        resizeMode="stretch"
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("HomeDoctor");
          }}
        >
          <Icons name="arrowleft" size={35} style={styles.IconLeft} />
        </TouchableOpacity>

        <View style={styles.Header}>
          <Text style={styles.Text}>List Of Appointment </Text>
        </View>

        <View style={[styles.Body]}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.Invoice}>
              <View style={styles.text_invoice_header}>
                <Text style={styles.txt_invoice_Title}>Nguyen Van A</Text>
                <Text style={styles.txt_invoice_id}>id: #4672</Text>
              </View>
              <View style={styles.text_invoice_doctor}>
                <View>
                  <Text>Date</Text>
                  <Text style={styles.txt_invoice}>26/04/2023</Text>
                </View>
                <View style={styles.txt_invoice_content}>
                  <Text>Time</Text>
                  <Text style={styles.txt_invoice}> 8:20 am</Text>
                </View>
                
              </View>
            </View>
            <View style={styles.Invoice}>
              <View style={styles.text_invoice_header}>
                <Text style={styles.txt_invoice_Title}>Nguyen Van B</Text>
                <Text style={styles.txt_invoice_id}>id: #4672</Text>
              </View>
              <View style={styles.text_invoice_doctor}>
                <View>
                  <Text>Date</Text>
                  <Text style={styles.txt_invoice}>26/04/2023</Text>
                </View>
                <View style={styles.txt_invoice_content}>
                  <Text>Time</Text>
                  <Text style={styles.txt_invoice}> 9:20 am</Text>
                </View>
               
              </View>
            </View><View style={styles.Invoice}>
            <View style={styles.text_invoice_header}>
              <Text style={styles.txt_invoice_Title}>Nguyen Van C</Text>
              <Text style={styles.txt_invoice_id}>id: #4672</Text>
            </View>
            <View style={styles.text_invoice_doctor}>
              <View>
              <Text>Date</Text>
                  <Text style={styles.txt_invoice}>26/04/2023</Text>
              </View>
              <View style={styles.txt_invoice_content}>
              <Text>Time</Text>
                  <Text style={styles.txt_invoice}> 10:20 am</Text>
              </View>
             
            </View>
           
          </View>
          </ScrollView>
        </View>

        {/* chua cho hoa don */}
        {/* <View
        style={[
          styles.Body,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text >Currently we do not receive your  <Text style={styles.txt_invoice}>invoice</Text></Text>
        <Text >information, please contact your doctor directly</Text>
        <Text >for support</Text>
      </View> */}
      </ImageBackground>
    </View>
  );
};

export default AppointmentDoctor;
