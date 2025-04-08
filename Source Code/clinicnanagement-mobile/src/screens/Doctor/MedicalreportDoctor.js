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
import styles from "../../../assets/style/Medical.style";
import Icons from "react-native-vector-icons/AntDesign";
import LogoUser from "../../assets/images/Man.png";
const ImageNews = [
  "https://cdn.pixabay.com/photo/2023/05/10/03/51/abstract-7982855_1280.png",
  "https://cdn.pixabay.com/photo/2023/05/06/20/36/ai-generated-7975127_1280.png",
  "https://cdn.pixabay.com/photo/2017/03/25/18/06/color-2174065_1280.png",
];

const MedicalreportDoctor = (navigation) => {
  return (
    <ImageBackground
    source={ImgBackground}
    style={{ height: "100%", width: "100%" }}
    resizeMode="stretch"
  >
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Medical");
        }}
      >
        <Icons name="arrowleft" size={35} style={styles.IconLeft} />
      </TouchableOpacity>

      <View style={styles.Header}>
        <Text style={styles.Text}>Medical record: #4672</Text>
      </View>

      <View style={styles.Body}>
        <ScrollView bounces={false}>
          <View style={{ alignItems: "center" }}>
            <View style={styles.Body_Header}>
              <Text style={styles.Txt_body_header}>
                Information of patient
              </Text>
            </View>
          </View>
          <View style={styles.Body_body}>
            <View style={styles.Body_body_detail}>
              <View style={styles.Body_body_tit}>
                <Text style={styles.Body_body_tit_text}>Report</Text>
                <Text style={styles.Body_body_tit_txt}>Report From Doctor</Text>
                <Text style={styles.Body_body_tit_text}>
                  Medical record date
                </Text>
                <Text style={styles.Body_body_tit_txt}>18 Dec, 2023</Text>
              </View>
              <View style={styles.Body_body_tit}>
                <Text style={styles.Body_body_tit_text}>Address</Text>
                <Text style={styles.Body_body_tit_txt}>
                  Rach Gia, Viet Nam
                </Text>
                <Text style={styles.Body_body_tit_text}>Phone</Text>
                <Text style={styles.Body_body_tit_txt}>0978128757$</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={styles.brick} />
              <Text style={styles.Body_body_tit_text}>
                {" "}
                Detail test result{" "}
              </Text>
              <View style={styles.brick} />
            </View>
            <View style={styles.TextNews}>
              <Text style={styles.Body_body_tit_txt}>
                Boxcar scars form when the skin tries to heal after an injury
                but does not produce enough collagen. Collagen is a substance
                that helps support the skin, so a lack of collagen causes
                pitting.
              </Text>
              {/* Diagnosis */}
              <Text style={styles.Body_body_tit_text}>Diagnosis</Text>
              <Text style={styles.Body_body_tit_txt}>Acne scar</Text>
              {/* Recommendations */}
              <Text style={styles.Body_body_tit_text}>Recommendations</Text>
              <Text style={styles.Body_body_tit_txt}>
                Acne affects up to 50 million Americans yearly, making it the
                most common skin condition in the United States. Whether you
                are young, old, male, or female, you are likely to experience
                acne at some point in your life, whether it is just the
                occasional pimple or chronic acne.
              </Text>
              {/* doctor */}
              <Text style={styles.Body_body_tit_text}>Doctor assgin</Text>
              <View style={{alignSelf:"flex-start",alignItems:"center"}}>
                <Image
                  source={LogoUser}
                  style={styles.ImageUser}
                  resizeMode="stretch"
                ></Image>
                <Text style={styles.Body_body_tit_txt}>Dr. Alex</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  </ImageBackground>
  )
}

export default MedicalreportDoctor