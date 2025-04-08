import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import ImgBackground from "../../assets/images/Skinsense_function_background.png";
import styles from "../../../assets/style/Appointment.style";
import { Calendar, LocaleConfig } from "react-native-calendars";
import Icons from "react-native-vector-icons/AntDesign";
import ImgFundamentals from "../../assets/images/Frame_7.png";
import ImgFundamentalsClick from "../../assets/images/Frame_7_click.png";
import { Dropdown } from "react-native-element-dropdown";
const DataDoctor = [
  {
    NameDoctor: "khang",
    id: "1",
    image: "https://familydoctor.org/wp-content/uploads/2018/02/41808433_l.jpg",
  },
  {
    NameDoctor: "tin",
    id: "2",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*",
  },
  {
    NameDoctor: "Hung",
    id: "3",
    image:
      "https://www.mvphealthcare.com/-/media/project/mvp/healthcare/hero-images/1-6-2-2-findadoctor.png?h=550&iar=0&w=393&rev=aad8c1c5f21d401091ed0f36f9da02a3&hash=D363D50C795676D5E9447F6FFB2D1E3C",
  },
  {
    NameDoctor:"Kha",
    id:"4",
    image:"data:image/jpeg;base64,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"
  },
  {
    NameDoctor:"Hieu",
    id:"5",
    image:"data:image/jpeg;base64,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"
  }
];
const data = [
  { label: "8:30 am", value: "1" },
  { label: "9:00 am", value: "2" },
  { label: "10:00 am", value: "3" },
  { label: "10:30 am", value: "4" },
  { label: "11:00 am", value: "5" },
  { label: "11:30 am", value: "6" },
  { label: "2:30 pm", value: "7" },
  { label: "12:45 pm", value: "8" },
];
const CreateAppoiment = ({ navigation }) => {
  const [selected, setSelected] = useState("");
  const [ServiceDrop, setServiceDrop] = useState("");
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [HideClick, setHideClick] = useState(true);
  const [isButton7, setIsButton7] = useState(false);
  const [isButton72, setIsButton72] = useState(false);
  const [isButton74, setIsButton74] = useState(false);
  const [isButton8, setIsButton8] = useState(false);
  const [isButton82, setIsButton82] = useState(false);
  const [isButton84, setIsButton84] = useState(false);
  const [isButton9, setIsButton9] = useState(false);
  const [isButton92, setIsButton92] = useState(false);
  const [isButton94, setIsButton94] = useState(false);
  const [isButton10, setIsButton10] = useState(false);
  const [isButton102, setIsButton102] = useState(false);
  const [isButton104, setIsButton104] = useState(false);
  const [isButton1, setIsButton1] = useState(false);
  const [isButton12, setIsButton12] = useState(false);
  const [isButton14, setIsButton14] = useState(false);
  const [isButton2, setIsButton2] = useState(false);
  const [isButton22, setIsButton22] = useState(false);
  const [isButton24, setIsButton24] = useState(false);
  const [isButton3, setIsButton3] = useState(false);
  const [isButton32, setIsButton32] = useState(false);
  const [isButton34, setIsButton34] = useState(false);
  const [isButton4, setIsButton4] = useState(false);
  const [isButton42, setIsButton42] = useState(false);
  const [isButton44, setIsButton44] = useState(false);
  const [isTime,  setTime] =useState("");
  const ClickButton7 = () => {
    setIsButton7(true);
    setIsButton72(false);
    setIsButton74(false);
    setIsButton8(false);
    setIsButton82(false);
    setIsButton84(false);
    setIsButton9(false);
    setIsButton92(false);
    setIsButton94(false);
    setIsButton10(false);
    setIsButton102(false);
    setIsButton104(false);
    setIsButton1(false);
    setIsButton12(false);
    setIsButton14(false);
    setIsButton2(false);
    setIsButton22(false);
    setIsButton24(false);
    setIsButton3(false);
    setIsButton32(false);
    setIsButton34(false);
    setIsButton4(false);
    setIsButton42(false);
    setIsButton44(false);
  };

  const ClickButton72 = () => {
    setIsButton7(false);
    setIsButton72(true);
    setIsButton74(false);
    setIsButton8(false);
    setIsButton82(false);
    setIsButton84(false);
    setIsButton9(false);
    setIsButton92(false);
    setIsButton94(false);
    setIsButton10(false);
    setIsButton102(false);
    setIsButton104(false);
    setIsButton1(false);
    setIsButton12(false);
    setIsButton14(false);
    setIsButton2(false);
    setIsButton22(false);
    setIsButton24(false);
    setIsButton3(false);
    setIsButton32(false);
    setIsButton34(false);
    setIsButton4(false);
    setIsButton42(false);
    setIsButton44(false);
  };
  const ClickButton74 = () => {
    setIsButton7(false);
    setIsButton72(false);
    setIsButton74(true);
    setIsButton8(false);
    setIsButton82(false);
    setIsButton84(false);
    setIsButton9(false);
    setIsButton92(false);
    setIsButton94(false);
    setIsButton10(false);
    setIsButton102(false);
    setIsButton104(false);
    setIsButton1(false);
    setIsButton12(false);
    setIsButton14(false);
    setIsButton2(false);
    setIsButton22(false);
    setIsButton24(false);
    setIsButton3(false);
    setIsButton32(false);
    setIsButton34(false);
    setIsButton4(false);
    setIsButton42(false);
    setIsButton44(false);
  };
  const ClickButton8 = () => {
    setIsButton7(false);
    setIsButton72(false);
    setIsButton74(false);
    setIsButton8(true);
    setIsButton82(false);
    setIsButton84(false);
    setIsButton9(false);
    setIsButton92(false);
    setIsButton94(false);
    setIsButton10(false);
    setIsButton102(false);
    setIsButton104(false);
    setIsButton1(false);
    setIsButton12(false);
    setIsButton14(false);
    setIsButton2(false);
    setIsButton22(false);
    setIsButton24(false);
    setIsButton3(false);
    setIsButton32(false);
    setIsButton34(false);
    setIsButton4(false);
    setIsButton42(false);
    setIsButton44(false);
  };

  const ClickButton82 = () => {
    setIsButton7(false);
    setIsButton72(false);
    setIsButton74(false);
    setIsButton8(false);
    setIsButton82(true);
    setIsButton84(false);
    setIsButton9(false);
    setIsButton92(false);
    setIsButton94(false);
    setIsButton10(false);
    setIsButton102(false);
    setIsButton104(false);
    setIsButton1(false);
    setIsButton12(false);
    setIsButton14(false);
    setIsButton2(false);
    setIsButton22(false);
    setIsButton24(false);
    setIsButton3(false);
    setIsButton32(false);
    setIsButton34(false);
    setIsButton4(false);
    setIsButton42(false);
    setIsButton44(false);
  };
  const ClickButton84 = () => {
    setIsButton7(false);
    setIsButton72(false);
    setIsButton74(false);
    setIsButton8(false);
    setIsButton82(false);
    setIsButton84(true);
    setIsButton9(false);
    setIsButton92(false);
    setIsButton94(false);
    setIsButton10(false);
    setIsButton102(false);
    setIsButton104(false);
    setIsButton1(false);
    setIsButton12(false);
    setIsButton14(false);
    setIsButton2(false);
    setIsButton22(false);
    setIsButton24(false);
    setIsButton3(false);
    setIsButton32(false);
    setIsButton34(false);
    setIsButton4(false);
    setIsButton42(false);
    setIsButton44(false);
  };
  const ClickButton9 = () => {
    setIsButton7(false);
    setIsButton72(false);
    setIsButton74(false);
    setIsButton8(false);
    setIsButton82(false);
    setIsButton84(false);
    setIsButton9(true);
    setIsButton92(false);
    setIsButton94(false);
    setIsButton10(false);
    setIsButton102(false);
    setIsButton104(false);
    setIsButton1(false);
    setIsButton12(false);
    setIsButton14(false);
    setIsButton2(false);
    setIsButton22(false);
    setIsButton24(false);
    setIsButton3(false);
    setIsButton32(false);
    setIsButton34(false);
    setIsButton4(false);
    setIsButton42(false);
    setIsButton44(false);
  };

  const ClickButton92 = () => {
    setIsButton7(false);
    setIsButton72(false);
    setIsButton74(false);
    setIsButton8(false);
    setIsButton82(false);
    setIsButton84(false);
    setIsButton9(false);
    setIsButton92(true);
    setIsButton94(false);
    setIsButton10(false);
    setIsButton102(false);
    setIsButton104(false);
    setIsButton1(false);
    setIsButton12(false);
    setIsButton14(false);
    setIsButton2(false);
    setIsButton22(false);
    setIsButton24(false);
    setIsButton3(false);
    setIsButton32(false);
    setIsButton34(false);
    setIsButton4(false);
    setIsButton42(false);
    setIsButton44(false);
  };
  const ClickButton94 = () => {
    setIsButton7(false);
    setIsButton72(false);
    setIsButton74(false);
    setIsButton8(false);
    setIsButton82(false);
    setIsButton84(false);
    setIsButton9(false);
    setIsButton92(false);
    setIsButton94(true);
    setIsButton10(false);
    setIsButton102(false);
    setIsButton104(false);
    setIsButton1(false);
    setIsButton12(false);
    setIsButton14(false);
    setIsButton2(false);
    setIsButton22(false);
    setIsButton24(false);
    setIsButton3(false);
    setIsButton32(false);
    setIsButton34(false);
    setIsButton4(false);
    setIsButton42(false);
    setIsButton44(false);
  };
  const ClickButton10 = () => {
    setIsButton7(false);
    setIsButton72(false);
    setIsButton74(false);
    setIsButton8(false);
    setIsButton82(false);
    setIsButton84(false);
    setIsButton9(false);
    setIsButton92(false);
    setIsButton94(false);
    setIsButton10(true);
    setIsButton102(false);
    setIsButton104(false);
    setIsButton1(false);
    setIsButton12(false);
    setIsButton14(false);
    setIsButton2(false);
    setIsButton22(false);
    setIsButton24(false);
    setIsButton3(false);
    setIsButton32(false);
    setIsButton34(false);
    setIsButton4(false);
    setIsButton42(false);
    setIsButton44(false);
  };
  const ClickButton102 = () => {
    setIsButton7(false);
    setIsButton72(false);
    setIsButton74(false);
    setIsButton8(false);
    setIsButton82(false);
    setIsButton84(false);
    setIsButton9(false);
    setIsButton92(false);
    setIsButton94(false);
    setIsButton10(false);
    setIsButton102(true);
    setIsButton104(false);
    setIsButton1(false);
    setIsButton12(false);
    setIsButton14(false);
    setIsButton2(false);
    setIsButton22(false);
    setIsButton24(false);
    setIsButton3(false);
    setIsButton32(false);
    setIsButton34(false);
    setIsButton4(false);
    setIsButton42(false);
    setIsButton44(false);
  };
  const ClickButton104 = () => {
    setIsButton7(false);
    setIsButton72(false);
    setIsButton74(false);
    setIsButton8(false);
    setIsButton82(false);
    setIsButton84(false);
    setIsButton9(false);
    setIsButton92(false);
    setIsButton94(false);
    setIsButton10(false);
    setIsButton102(false);
    setIsButton104(true);
    setIsButton1(false);
    setIsButton12(false);
    setIsButton14(false);
    setIsButton2(false);
    setIsButton22(false);
    setIsButton24(false);
    setIsButton3(false);
    setIsButton32(false);
    setIsButton34(false);
    setIsButton4(false);
    setIsButton42(false);
    setIsButton44(false);
  };
  const ClickButton1 = () => {
    setIsButton7(false);
    setIsButton72(false);
    setIsButton74(false);
    setIsButton8(false);
    setIsButton82(false);
    setIsButton84(false);
    setIsButton9(false);
    setIsButton92(false);
    setIsButton94(false);
    setIsButton10(false);
    setIsButton102(false);
    setIsButton104(false);
    setIsButton1(true);
    setIsButton12(false);
    setIsButton14(false);
    setIsButton2(false);
    setIsButton22(false);
    setIsButton24(false);
    setIsButton3(false);
    setIsButton32(false);
    setIsButton34(false);
    setIsButton4(false);
    setIsButton42(false);
    setIsButton44(false);
  };
  const ClickButton12 = () => {
    setIsButton7(false);
    setIsButton72(false);
    setIsButton74(false);
    setIsButton8(false);
    setIsButton82(false);
    setIsButton84(false);
    setIsButton9(false);
    setIsButton92(false);
    setIsButton94(false);
    setIsButton10(false);
    setIsButton102(false);
    setIsButton104(false);
    setIsButton1(false);
    setIsButton12(true);
    setIsButton14(false);
    setIsButton2(false);
    setIsButton22(false);
    setIsButton24(false);
    setIsButton3(false);
    setIsButton32(false);
    setIsButton34(false);
    setIsButton4(false);
    setIsButton42(false);
    setIsButton44(false);
  };
  const ClickButton14 = () => {
    setIsButton7(false);
    setIsButton72(false);
    setIsButton74(false);
    setIsButton8(false);
    setIsButton82(false);
    setIsButton84(false);
    setIsButton9(false);
    setIsButton92(false);
    setIsButton94(false);
    setIsButton10(false);
    setIsButton102(false);
    setIsButton104(false);
    setIsButton1(false);
    setIsButton12(false);
    setIsButton14(true);
    setIsButton2(false);
    setIsButton22(false);
    setIsButton24(false);
    setIsButton3(false);
    setIsButton32(false);
    setIsButton34(false);
    setIsButton4(false);
    setIsButton42(false);
    setIsButton44(false);
  };
  const ClickButton2 = () => {
    setIsButton7(false);
    setIsButton72(false);
    setIsButton74(false);
    setIsButton8(false);
    setIsButton82(false);
    setIsButton84(false);
    setIsButton9(false);
    setIsButton92(false);
    setIsButton94(false);
    setIsButton10(false);
    setIsButton102(false);
    setIsButton104(false);
    setIsButton1(false);
    setIsButton12(false);
    setIsButton14(false);
    setIsButton2(true);
    setIsButton22(false);
    setIsButton24(false);
    setIsButton3(false);
    setIsButton32(false);
    setIsButton34(false);
    setIsButton4(false);
    setIsButton42(false);
    setIsButton44(false);
  };
  const ClickButton22 = () => {
    setIsButton7(false);
    setIsButton72(false);
    setIsButton74(false);
    setIsButton8(false);
    setIsButton82(false);
    setIsButton84(false);
    setIsButton9(false);
    setIsButton92(false);
    setIsButton94(false);
    setIsButton10(false);
    setIsButton102(false);
    setIsButton104(false);
    setIsButton1(false);
    setIsButton12(false);
    setIsButton14(false);
    setIsButton2(false);
    setIsButton22(true);
    setIsButton24(false);
    setIsButton3(false);
    setIsButton32(false);
    setIsButton34(false);
    setIsButton4(false);
    setIsButton42(false);
    setIsButton44(false);
  };
  const ClickButton24 = () => {
    setIsButton7(false);
    setIsButton72(false);
    setIsButton74(false);
    setIsButton8(false);
    setIsButton82(false);
    setIsButton84(false);
    setIsButton9(false);
    setIsButton92(false);
    setIsButton94(false);
    setIsButton10(false);
    setIsButton102(false);
    setIsButton104(false);
    setIsButton1(false);
    setIsButton12(false);
    setIsButton14(false);
    setIsButton2(false);
    setIsButton22(false);
    setIsButton24(true);
    setIsButton3(false);
    setIsButton32(false);
    setIsButton34(false);
    setIsButton4(false);
    setIsButton42(false);
    setIsButton44(false);
  };
  const ClickButton3 = () => {
    setIsButton7(false);
    setIsButton72(false);
    setIsButton74(false);
    setIsButton8(false);
    setIsButton82(false);
    setIsButton84(false);
    setIsButton9(false);
    setIsButton92(false);
    setIsButton94(false);
    setIsButton10(false);
    setIsButton102(false);
    setIsButton104(false);
    setIsButton1(false);
    setIsButton12(false);
    setIsButton14(false);
    setIsButton2(false);
    setIsButton22(false);
    setIsButton24(false);
    setIsButton3(true);
    setIsButton32(false);
    setIsButton34(false);
    setIsButton4(false);
    setIsButton42(false);
    setIsButton44(false);
  };
  const ClickButton32 = () => {
    setIsButton7(false);
    setIsButton72(false);
    setIsButton74(false);
    setIsButton8(false);
    setIsButton82(false);
    setIsButton84(false);
    setIsButton9(false);
    setIsButton92(false);
    setIsButton94(false);
    setIsButton10(false);
    setIsButton102(false);
    setIsButton104(false);
    setIsButton1(false);
    setIsButton12(false);
    setIsButton14(false);
    setIsButton2(false);
    setIsButton22(false);
    setIsButton24(false);
    setIsButton3(false);
    setIsButton32(true);
    setIsButton34(false);
    setIsButton4(false);
    setIsButton42(false);
    setIsButton44(false);
  };
  const ClickButton34 = () => {
    setIsButton7(false);
    setIsButton72(false);
    setIsButton74(false);
    setIsButton8(false);
    setIsButton82(false);
    setIsButton84(false);
    setIsButton9(false);
    setIsButton92(false);
    setIsButton94(false);
    setIsButton10(false);
    setIsButton102(false);
    setIsButton104(false);
    setIsButton1(false);
    setIsButton12(false);
    setIsButton14(false);
    setIsButton2(false);
    setIsButton22(false);
    setIsButton24(false);
    setIsButton3(false);
    setIsButton32(false);
    setIsButton34(true);
    setIsButton4(false);
    setIsButton42(false);
    setIsButton44(false);
  };
  const ClickButton4 = () => {
    setIsButton7(false);
    setIsButton72(false);
    setIsButton74(false);
    setIsButton8(false);
    setIsButton82(false);
    setIsButton84(false);
    setIsButton9(false);
    setIsButton92(false);
    setIsButton94(false);
    setIsButton10(false);
    setIsButton102(false);
    setIsButton104(false);
    setIsButton1(false);
    setIsButton12(false);
    setIsButton14(false);
    setIsButton2(false);
    setIsButton22(false);
    setIsButton24(false);
    setIsButton3(false);
    setIsButton32(false);
    setIsButton34(false);
    setIsButton4(true);
    setIsButton42(false);
    setIsButton44(false);
  };
  const ClickButton42 = () => {
    setIsButton7(false);
    setIsButton72(false);
    setIsButton74(false);
    setIsButton8(false);
    setIsButton82(false);
    setIsButton84(false);
    setIsButton9(false);
    setIsButton92(false);
    setIsButton94(false);
    setIsButton10(false);
    setIsButton102(false);
    setIsButton104(false);
    setIsButton1(false);
    setIsButton12(false);
    setIsButton14(false);
    setIsButton2(false);
    setIsButton22(false);
    setIsButton24(false);
    setIsButton3(false);
    setIsButton32(false);
    setIsButton34(false);
    setIsButton4(false);
    setIsButton42(true);
    setIsButton44(false);
  };
  const ClickButton44 = () => {
    setIsButton7(false);
    setIsButton72(false);
    setIsButton74(false);
    setIsButton8(false);
    setIsButton82(false);
    setIsButton84(false);
    setIsButton9(false);
    setIsButton92(false);
    setIsButton94(false);
    setIsButton10(false);
    setIsButton102(false);
    setIsButton104(false);
    setIsButton1(false);
    setIsButton12(false);
    setIsButton14(false);
    setIsButton2(false);
    setIsButton22(false);
    setIsButton24(false);
    setIsButton3(false);
    setIsButton32(false);
    setIsButton34(false);
    setIsButton4(false);
    setIsButton42(false);
    setIsButton44(true);
  };

  const Datetime = (e) => {
    setSelected(e.dateString);
  };
  const OnSubmit = () => {
    const fromData = {
      selected: selected,
      Service: ServiceDrop,
      
    };
    navigation.navigate("Blackheads");
    console.log(fromData);
  };
  const ClickChoice = (id) => {
    if (HideClick == true) {
     
      setHideClick(false);
    } else {
      setHideClick(true);
    }
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
            navigation.navigate("Appointment");
          }}
        >
          <Icons name="arrowleft" size={35} style={styles.IconLeft} />
        </TouchableOpacity>
        <View style={styles.Header_Detail}>
          <Text style={styles.Text_Detail}>Appointment</Text>
        </View>
        <View style={styles.Body}>
          <ScrollView style={{ marginVertical: 10 }}>
            <View style={styles.DropdownList}>
              <Text style={styles.Txt_Time}>
                {" "}
                Select An Examination Service
              </Text>
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "Choose an examination service" : "..."}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setValue(item.value);
                  setIsFocus(false);
                  setServiceDrop(item.label);
                }}
              />
            </View>

            <View style={styles.Selected}>
              <Text style={styles.Txt_Time}>Select A Doctor</Text>

              <ScrollView horizontal >
                {DataDoctor.map((item, index) => {
                  return (
                    <View key={item.id} style={styles.Services}>
                      <TouchableOpacity
                        style={styles.ButtonServices}
                        onPress={() => ClickChoice()}
                      >
                        <ImageBackground
                          source={{ uri: item.image }}
                          style={styles.button_img}
                          resizeMode="stretch"
                        >
                          {HideClick? (
                            ""
                          ) : (
                            <View key={item.id} style={styles.text_background}>
                              <Text style={styles.txtSelect}>Selected</Text>
                            </View>
                          )}
                        </ImageBackground>
                      </TouchableOpacity>
                      <Text>{item.NameDoctor} </Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
            <View>
              <Calendar
                minDate={Date()}
                style={styles.Calendar}
                onDayPress={(day) => {
                  Datetime(day);
                }}
                markedDates={{
                  [selected]: {
                    selected: true,
                    disableTouchEvent: true,
                  },
                }}
                theme={{
                  calendarBackground: "#F5F5F5",
                  textSectionTitleColor: "black",
                  arrowColor: "black",
                  textMonthFontSize: 20,
                  textMonthFontWeight: "bold",
                  textDayFontWeight: "bold",
                }}
              />
            </View>
            <View style={styles.Time_Button}>
              <Text style={styles.Txt_Time}>Select An Appointment Time</Text>
              <View style={styles.Button_Morning}>
                {/* Morning */}
                <Text style={styles.Text_M_A}>Morning</Text>
                <View style={styles.ListButton}>
                  <TouchableOpacity onPress={() => ClickButton7()}>
                    {isButton7 ? (
                      <View style={styles.Button_detail_time_Click}>
                        <Text style={styles.txt_detail_time}>7:00 am</Text>
                      </View>
                    ) : (
                      <View style={styles.Button_detail_time}>
                        <Text style={styles.txt_detail_time}>7:00 am</Text>
                      </View>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => ClickButton72()}>
                    {isButton72 ? (
                      <View style={styles.Button_detail_time_Click}>
                        <Text style={styles.txt_detail_time}>7:20 am</Text>
                      </View>
                    ) : (
                      <View style={styles.Button_detail_time}>
                        <Text style={styles.txt_detail_time}>7:20 am</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => ClickButton74()}>
                    {isButton74 ? (
                      <View style={styles.Button_detail_time_Click}>
                        <Text style={styles.txt_detail_time}>7:40 am</Text>
                      </View>
                    ) : (
                      <View style={styles.Button_detail_time}>
                        <Text style={styles.txt_detail_time}>7:40 am</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
                <View style={styles.ListButton}>
                  <TouchableOpacity onPress={() => ClickButton8()}>
                    {isButton8 ? (
                      <View style={styles.Button_detail_time_Click}>
                        <Text style={styles.txt_detail_time}>8:00 am</Text>
                      </View>
                    ) : (
                      <View style={styles.Button_detail_time}>
                        <Text style={styles.txt_detail_time}>8:00 am</Text>
                      </View>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => ClickButton82()}>
                    {isButton82 ? (
                      <View style={styles.Button_detail_time_Click}>
                        <Text style={styles.txt_detail_time}>8:20 am</Text>
                      </View>
                    ) : (
                      <View style={styles.Button_detail_time}>
                        <Text style={styles.txt_detail_time}>8:20 am</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => ClickButton84()}>
                    {isButton84 ? (
                      <View style={styles.Button_detail_time_Click}>
                        <Text style={styles.txt_detail_time}>8:40 am</Text>
                      </View>
                    ) : (
                      <View style={styles.Button_detail_time}>
                        <Text style={styles.txt_detail_time}>8:40 am</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
                <View style={styles.ListButton}>
                  <TouchableOpacity onPress={() => ClickButton9()}>
                    {isButton9 ? (
                      <View style={styles.Button_detail_time_Click}>
                        <Text style={styles.txt_detail_time}>9:00 am</Text>
                      </View>
                    ) : (
                      <View style={styles.Button_detail_time}>
                        <Text style={styles.txt_detail_time}>9:00 am</Text>
                      </View>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => ClickButton92()}>
                    {isButton92 ? (
                      <View style={styles.Button_detail_time_Click}>
                        <Text style={styles.txt_detail_time}>9:20 am</Text>
                      </View>
                    ) : (
                      <View style={styles.Button_detail_time}>
                        <Text style={styles.txt_detail_time}>9:20 am</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => ClickButton94()}>
                    {isButton94 ? (
                      <View style={styles.Button_detail_time_Click}>
                        <Text style={styles.txt_detail_time}>9:40 am</Text>
                      </View>
                    ) : (
                      <View style={styles.Button_detail_time}>
                        <Text style={styles.txt_detail_time}>9:40 am</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
                <View style={styles.ListButton}>
                  <TouchableOpacity onPress={() => ClickButton10()}>
                    {isButton10 ? (
                      <View style={styles.Button_detail_time_Click}>
                        <Text style={styles.txt_detail_time}>10:00 am</Text>
                      </View>
                    ) : (
                      <View style={styles.Button_detail_time}>
                        <Text style={styles.txt_detail_time}>10:00 am</Text>
                      </View>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => ClickButton102()}>
                    {isButton102 ? (
                      <View style={styles.Button_detail_time_Click}>
                        <Text style={styles.txt_detail_time}>10:20 am</Text>
                      </View>
                    ) : (
                      <View style={styles.Button_detail_time}>
                        <Text style={styles.txt_detail_time}>10:20 am</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => ClickButton104()}>
                    {isButton104 ? (
                      <View style={styles.Button_detail_time_Click}>
                        <Text style={styles.txt_detail_time}>10:40 am</Text>
                      </View>
                    ) : (
                      <View style={styles.Button_detail_time}>
                        <Text style={styles.txt_detail_time}>10:40 am</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              {/* Afternoon */}
              <View style={styles.Button_Morning}>
                <Text style={styles.Text_M_A}>Afternoon</Text>
                <View style={styles.ListButton}>
                  <TouchableOpacity onPress={() => ClickButton1()}>
                    {isButton1 ? (
                      <View style={styles.Button_detail_time_Click}>
                        <Text style={styles.txt_detail_time}>1:00 am</Text>
                      </View>
                    ) : (
                      <View style={styles.Button_detail_time}>
                        <Text style={styles.txt_detail_time}>1:00 am</Text>
                      </View>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => ClickButton12()}>
                    {isButton12 ? (
                      <View style={styles.Button_detail_time_Click}>
                        <Text style={styles.txt_detail_time}>1:20 am</Text>
                      </View>
                    ) : (
                      <View style={styles.Button_detail_time}>
                        <Text style={styles.txt_detail_time}>1:20 am</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => ClickButton14()}>
                    {isButton14 ? (
                      <View style={styles.Button_detail_time_Click}>
                        <Text style={styles.txt_detail_time}>1:40 am</Text>
                      </View>
                    ) : (
                      <View style={styles.Button_detail_time}>
                        <Text style={styles.txt_detail_time}>1:40 am</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
                <View style={styles.ListButton}>
                  <TouchableOpacity onPress={() => ClickButton2()}>
                    {isButton2 ? (
                      <View style={styles.Button_detail_time_Click}>
                        <Text style={styles.txt_detail_time}>2:00 am</Text>
                      </View>
                    ) : (
                      <View style={styles.Button_detail_time}>
                        <Text style={styles.txt_detail_time}>2:00 am</Text>
                      </View>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => ClickButton22()}>
                    {isButton22 ? (
                      <View style={styles.Button_detail_time_Click}>
                        <Text style={styles.txt_detail_time}>2:20 am</Text>
                      </View>
                    ) : (
                      <View style={styles.Button_detail_time}>
                        <Text style={styles.txt_detail_time}>2:20 am</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => ClickButton24()}>
                    {isButton24 ? (
                      <View style={styles.Button_detail_time_Click}>
                        <Text style={styles.txt_detail_time}>2:40 am</Text>
                      </View>
                    ) : (
                      <View style={styles.Button_detail_time}>
                        <Text style={styles.txt_detail_time}>2:40 am</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
                <View style={styles.ListButton}>
                  <TouchableOpacity onPress={() => ClickButton3()}>
                    {isButton3 ? (
                      <View style={styles.Button_detail_time_Click}>
                        <Text style={styles.txt_detail_time}>3:00 am</Text>
                      </View>
                    ) : (
                      <View style={styles.Button_detail_time}>
                        <Text style={styles.txt_detail_time}>3:00 am</Text>
                      </View>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => ClickButton32()}>
                    {isButton32 ? (
                      <View style={styles.Button_detail_time_Click}>
                        <Text style={styles.txt_detail_time}>3:20 am</Text>
                      </View>
                    ) : (
                      <View style={styles.Button_detail_time}>
                        <Text style={styles.txt_detail_time}>3:20 am</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => ClickButton34()}>
                    {isButton34 ? (
                      <View style={styles.Button_detail_time_Click}>
                        <Text style={styles.txt_detail_time}>3:40 am</Text>
                      </View>
                    ) : (
                      <View style={styles.Button_detail_time}>
                        <Text style={styles.txt_detail_time}>3:40 am</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
                <View style={styles.ListButton}>
                  <TouchableOpacity onPress={() => ClickButton4()}>
                    {isButton4 ? (
                      <View style={styles.Button_detail_time_Click}>
                        <Text style={styles.txt_detail_time}>4:00 am</Text>
                      </View>
                    ) : (
                      <View style={styles.Button_detail_time}>
                        <Text style={styles.txt_detail_time}>4:00 am</Text>
                      </View>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => ClickButton42()}>
                    {isButton42 ? (
                      <View style={styles.Button_detail_time_Click}>
                        <Text style={styles.txt_detail_time}>4:20 am</Text>
                      </View>
                    ) : (
                      <View style={styles.Button_detail_time}>
                        <Text style={styles.txt_detail_time}>4:20 am</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => ClickButton44()}>
                    {isButton44 ? (
                      <View style={styles.Button_detail_time_Click}>
                        <Text style={styles.txt_detail_time}>4:40 am</Text>
                      </View>
                    ) : (
                      <View style={styles.Button_detail_time}>
                        <Text style={styles.txt_detail_time}>4:40 am</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={[styles.button_Appoint, styles.Button_Summit]}
                onPress={() => {
                  OnSubmit();
                }}
              >
                <Text style={styles.Text_summit}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button_Appoint, styles.Button_Cancel]}
                onPress={() => {}}
              >
                <Text style={styles.Text_back}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default CreateAppoiment;
