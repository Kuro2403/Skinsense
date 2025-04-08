import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import ImgBackground from "../../assets/images/Skinsense_function_background.png";
import styles from "../../../assets/style/Medical.style";
import Icons from "react-native-vector-icons/AntDesign";
import { GetAllMedicalReportsServices } from "../../api/medicalServices";
import { _storeData, _retrieveData } from "../../utils/AsyncStoreService";

const Medical = ({ navigation }) => {
  // const [dataInvoice, setDataInvoice] = useState([]);
  // const [dataInvoice_, setDataInvoice_] = useState([

  // ]);
  // useEffect(() => {
  //   const getInvoice = async () => {
  //     const data = await GetAllMedicalReportsServices();
  //     const patient = _retrieveData('Patient');
  //     const data_ = JSON.parse(patient);
  //     const dataFilter = data.filter(i => i.patientID === data_.patientID);
  //     setDataInvoice_(dataFilter);
  //   };
  //   getInvoice();
  // });
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
          <Text style={styles.Text}>Medical record</Text>
        </View>

        <View style={[styles.Body]}>
          <ScrollView style={styles.scrollView}>
          <View style={styles.medical}>

              <View style={styles.text_medical_header}>
                <Text style={styles.txt_medical_Title}>Prescription:</Text>
                <Text style={styles.txt_medical_id}>id: 2</Text>
              </View>
              <View style={styles.text_medical}>
                <View>
                  <Text>Assigned</Text>
                  <Text style={styles.txt_medical}>Dr. Water Ellis</Text>
                </View>
                <View style={styles.txt_medical_content}>
                  <Text>Diagnosis</Text>
                  <Text style={styles.txt_medical}>Atopic Dermatitis</Text>
                </View>
              </View>

              <View style={styles.Notification_medical}>
                 <View style={styles.medicalComplete}>
                  <View>
                    <Text>Date</Text>
                    <Text style={styles.txt_medical}>26/ 04/ 2023</Text>
                  </View>
                </View> 

                <TouchableOpacity
                  style={styles.button_medical}
                  onPress={() => {
                    navigation.navigate("DetailMedical");
                  }}
                >
                  <Icons name="arrowright" size={20} />
                </TouchableOpacity>
              </View>
            </View>

          </ScrollView> 
        

        </View> 

      
        {/* <View
          style={[
            styles.Body,
            { justifyContent: "center", alignItems: "center" },
          ]}
        >
          <Text style={styles.txt_medical_id}>Currently we do not receive your <Text style={styles.txt_medical}>medical record</Text></Text>
          <Text style={styles.txt_medical_id}>information, please contact your doctor directly </Text>
          <Text style={styles.txt_medical_id}>for support</Text>
        </View> */}
      </ImageBackground>
    </View>
  );
};

export default Medical;
