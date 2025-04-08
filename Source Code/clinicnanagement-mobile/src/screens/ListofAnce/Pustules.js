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
import styles from "../../../assets/style/Listacne.style";
import Icons from "react-native-vector-icons/AntDesign";
import ImgPustules from "../../assets/images/Pustules.png";
import ImgProduct from "../../assets/images/Product.png";
const Pustules = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={ImgBackground}
        style={{ height: "100%", width: "100%" }}
        resizeMode="stretch"
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ListAcne");
          }}
        >
          <Icons name="arrowleft" size={35} style={styles.IconLeft} />
        </TouchableOpacity>
        <View style={styles.Header}>
          <Text style={styles.Text}>List of acne</Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.BodyAcne}>
            <View style={styles.TextBody}>
              <Text style={styles.Txt_Tittle}>Pustules</Text>
              <Text style={styles.txt_content}>
                Pustules, or pus-filled bumps, can happen due to acne, an
                allergic reaction, or an infection. If they occur with certain
                other symptoms, you may need urgent medical attention.
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.ImgFace}>
                <Image
                  resizeMode="stretch"
                  style={{ height: "100%", width: "100%" }}
                />
              </View>
              <View style={styles.ImgFace}>
                <Image
                  resizeMode="stretch"
                  style={{ height: "100%", width: "100%" }}
                />
              </View>
            </View>
            <View style={styles.TextBody}>
              <Text style={styles.Txt_Suggested}>Suggested products</Text>
              <View style={styles.Suggested}>
                <View style={styles.ImgProduct}>
                  <Image
                    source={ImgProduct}
                    resizeMode="stretch"
                    style={{ height: "100%", width: "100%" }}
                  />
                  <View style={{ alignItems: "center" }}>
                    <Text style={styles.txt_content}>Paula choice’s</Text>
                    <Text style={styles.txt_content}>10.39$</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.ImgAcneHeader}>
            <Image source={ImgPustules} resizeMode="stretch" />
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default Pustules;
