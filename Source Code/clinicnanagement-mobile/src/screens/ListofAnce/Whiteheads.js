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
  import ImgWhiteheads from "../../assets/images/Whiteheads.png";
  import ImgProduct from "../../assets/images/Product.png";
const Whiteheads = ({navigation}) => {
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
              <Text style={styles.Txt_Tittle}>Whiteheads</Text>
              <Text style={styles.txt_content}>
              Whiteheads are a type of acne (vulgaris). Oil and dead skin close off hair follicles or sebaceous glands (oil glands) and form a closed bump on your skin (comedo, plural comedones).
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
            <Image source={ImgWhiteheads} resizeMode="stretch" />
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  )
}

export default Whiteheads