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
  import Icons from "react-native-vector-icons/AntDesign";
  import ImgBackground from "../../assets/images/Skinsense_Home_screen1.png";
  import ImgMedical from "../../assets/images/Cardiogram.png";
  import ImgService from "../../assets/images/To-do-list.png";
  import ImgInvoice from "../../assets/images/Invoice.png";
  import SuggestionList from "../../components/common/suggestionList";
  import SessionStorage from 'react-native-session-storage';
  import RatedCommon from "../../components/common/RatedCommon";
  import { Calendar, LocaleConfig } from "react-native-calendars";
  import { _retrieveData } from "../../utils/AsyncStoreService";
  
  const ImageNews = [
    "https://cdn.pixabay.com/photo/2023/05/10/03/51/abstract-7982855_1280.png",
    "https://cdn.pixabay.com/photo/2023/05/06/20/36/ai-generated-7975127_1280.png",
    "https://cdn.pixabay.com/photo/2017/03/25/18/06/color-2174065_1280.png",
  ];
  const Home = ({ navigation }) => {
    const [imgActive, setimgActive] = useState(0);
    const [namePatient, setNamePatient] = useState('');
   
    useEffect(() => {
      const patient = _retrieveData('Patient');
      const data = JSON.parse(patient);
      setNamePatient(data.name);
    });
    onchange = (nativeEvent) => {
      if (nativeEvent) {
        const slide = Math.ceil(
          nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
        );
        if (slide != imgActive) {
          setimgActive(slide);
        }
      }
      
      
    };
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
                <TouchableOpacity
                style={{ paddingLeft:10}}
                  onPress={() => {
                    navigation.navigate("Profile");
                  }}
                >
                  <Icons name="setting" size={35} style={styles.IconLeft} />
                </TouchableOpacity>
              </View>
              <View style={styles.TextUser}>
                <Text style={styles.TextName}>HELLO!</Text>
                <View style={styles.TextUserName}>
                  <Text style={styles.TextName}>WELCOME, </Text>
                  <Text style={[styles.UserName, styles.TextName]}>{namePatient}</Text>
                </View>
              </View>
            </View>
            <View style={styles.UserBody}>
              <View style={[styles.wrap, styles.warpNews]}>
                <ScrollView
                  onScroll={({ nativeEvent }) => onchange(nativeEvent)}
                  showsHorizontalScrollIndicator={false}
                  pagingEnabled
                  horizontal
                  style={styles.wrap}
                >
                  {ImageNews.map((e, index) => (
                    <Image
                      key={e}
                      resizeMode="stretch"
                      source={{ uri: e }}
                      style={[styles.wrap, styles.wrapImg]}
                    />
                  ))}
                </ScrollView>
                <View style={styles.wrapDot}>
                  {ImageNews.map((e, index) => (
                    <Text
                      key={e}
                      style={imgActive == index ? styles.dotActive : styles.dot}
                    >
                      ●
                    </Text>
                  ))}
                </View>
              </View>
              <View style={styles.service}>
                <View style={styles.ServiceText}>
                  <Text style={styles.textService}>Your service</Text>
                </View>
                {/* service */}
                <View style={styles.serviceList}>
                  <TouchableOpacity
                    style={styles.serviceCommon}
                    onPress={() => {
                      navigation.navigate("Medical");
                    }}
                  >
                    <Image
                      source={ImgMedical}
                      style={{ height: 50, width: 50 }}
                    ></Image>
                    <Text style={styles.serviceCommonText}>Medical record</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.serviceCommon}
                    onPress={() => {
                      navigation.navigate("Service");
                    }}
                  >
                    <Image
                      source={ImgService}
                      style={{ height: 50, width: 50 }}
                    ></Image>
                    <Text style={styles.serviceCommonText}>Service list</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.serviceCommon}
                    onPress={() => {
                      navigation.navigate("Invoice");
                    }}
                  >
                    <Image
                      source={ImgInvoice}
                      style={{ height: 50, width: 50 }}
                    ></Image>
                    <Text style={styles.serviceCommonText}>Invoice</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* Suggestion */}
              <View style={styles.Suggestion}>
                <Text style={styles.SuggestionText}>Suggestion for you</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.ScrollSuggestion}
                >
                  <SuggestionList imgUri={ImgMedical} name={"Cleanser"} />
                  <SuggestionList imgUri={ImgMedical} name={"Toner"} />
                  <SuggestionList imgUri={ImgMedical} name={"Serum"} />
                  <SuggestionList imgUri={ImgMedical} name={"Moisturizer"} />
                  <SuggestionList imgUri={ImgMedical} name={"Sunscreen"} />
                </ScrollView>
              </View>
              {/* schedule */}
              <View style={styles.schedule}>
                <Text style={styles.scheduleText}>Your schedule</Text>
                <View>
                  <Calendar
                    style={styles.Calendar}
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
                      textDisabledColor: "gray",
                      textMonthFontSize: 20,
                      textMonthFontWeight: "bold",
                      textDayFontWeight: "bold",
                    }}
                  />
                </View>
              </View>
  
              {/* TopRated */}
  
              <View style={styles.TopRated}>
                <Text style={styles.TopRatedText}>Top Rated</Text>
                <View style={styles.DoctorRated}>
                  <RatedCommon
                    NumberStar={"4,9"}
                    NameDoctor={"Dr. Water Ellis"}
                    NameAcne={"Acne Noduclar"}
                  />
                  <RatedCommon
                    NumberStar={"5"}
                    NameDoctor={"Dr. Laura Alexaner"}
                    NameAcne={"Papules"}
                  />
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    );
  };
  
  export default Home;
  