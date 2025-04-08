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
import ImgNodules from "../../assets/images/Nodules.png";
import Face15 from "../../assets/images/image15.png";
import Face16 from "../../assets/images/image16.png";
import ImgProduct from "../../assets/images/Product.png";
const Nodules = ({navigation}) => {
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
              <Text style={styles.Txt_Tittle}>Nodules</Text>
              <Text style={styles.txt_content}>
                Nodular acne is a severe type of acne. It causes hard lumps or
                knots (nodules) to develop deep under your skin. The nodules
                start below the surface and appear on the skin as red bumps.
                These bumps usually don’t have a whitehead or blackhead at the
                center.
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.ImgFace}>
                <Image
                  source={Face15}
                  resizeMode="stretch"
                  style={{ height: "100%", width: "100%" }}
                />
              </View>
              <View style={styles.ImgFace}>
                <Image
                  source={Face16}
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
            <Image source={ImgNodules} resizeMode="stretch" />
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default Nodules;
