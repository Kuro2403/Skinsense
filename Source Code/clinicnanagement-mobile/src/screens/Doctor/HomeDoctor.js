import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";

import React, { useState,useEffect } from "react";
import styles from "../../../assets/style/Home.style";
import LogoUser from "../../assets/images/Man.png";
import ImgBackground from "../../assets/images/Skinsense_Home_screen1.png";
import ImgPatient from "../../assets/images/Patient.png";
import ImgService from "../../assets/images/To-do-list.png";
import ImgInvoice from "../../assets/images/Invoice.png";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { _retrieveData } from "../../utils/AsyncStoreService";

const HomeDoctor = ({navigation}) => {

  // const [namePatient, setNamePatient] = useState('');
 
  // useEffect(() => {
  //   const patient = _retrieveData('Patient');
  //   const data = JSON.parse(patient);
  //   setNamePatient(data.name);
  // });
 
  const [selected, setSelected] = useState("");

  return (
    <ScrollView bounces={false}>
    <ImageBackground
      source={ImgBackground}
      style={{ height: "70%", width: "100%" }}
      resizeMode="stretch"
    >
      <View style={styles.container}>
        <View style={styles.UserHeader}>
          <View style={styles.UserLogo}>
            <Image
              source={LogoUser}
              style={styles.ImageUser}
              resizeMode="stretch"
            ></Image>
          </View>
          <View style={styles.TextUser}>
            <Text style={styles.TextName}>HELLO!</Text>
            <View style={styles.TextUserName}>
              <Text style={styles.TextName}>WELCOME, </Text>
              {/* <Text style={[styles.UserName, styles.TextName]}>{namePatient}</Text> */}
            </View>
          </View>
        </View>
        <View style={styles.UserBodyDoctor}>
          <View style={styles.service}>
            <View style={styles.ServiceText}>
              <Text style={styles.textService}>Your service</Text>
            </View>
            {/* service */}
            <View style={styles.serviceList}>
              <TouchableOpacity
                style={styles.serviceCommon}
                onPress={() => {
                  navigation.navigate("AppointmentDoctor");
                }}
              >
                <Image
                  source={ImgService}
                  style={{ height: 50, width: 50 }}
                ></Image>
                <Text style={styles.serviceCommonText}>Appointment list</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.serviceCommon}
                onPress={() => {
                  navigation.navigate("ExaminedDoctor");
                }}
              >
                <Image
                  source={ImgPatient}
                  style={{ height: 50, width: 50 }}
                ></Image>
                <Text style={styles.serviceCommonText}>The patients</Text>
                <Text style={styles.serviceCommonText}>examined</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.serviceCommon}
                onPress={() => {
               
                }}
              >
                <Image
                  source={ImgInvoice}
                  style={{ height: 50, width: 50 }}
                ></Image>
                <Text style={styles.serviceCommonText}>Coming soon</Text>
              </TouchableOpacity>
            </View>
            
          </View>
          <View style={styles.service}>
           
          </View>
         
          {/* schedule */}
          <View style={styles.schedule}>
            <Text style={styles.scheduleText}>Your schedule</Text>
            <View>
              <Calendar
                style={styles.Calendar}
                markedDates={{
                "2023-08-15": {
                    selected: true,
                    disableTouchEvent: true,
                  },
                }}
                theme={{
                  calendarBackground: "#F5F5F5",
                  textSectionTitleColor: "black",
                  arrowColor: "black",
                  textDisabledColor: "gray",
                  textMonthFontSize: 20,
                  textMonthFontWeight: "bold",
                  textDayFontWeight: "bold",
                }}
              />
            </View>
          </View>


        
        </View>
      </View>
    </ImageBackground>
  </ScrollView>
  )
}

export default HomeDoctor