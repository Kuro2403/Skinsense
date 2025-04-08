import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
  } from "react-native";
  import React from "react";
  import ImgBackground from "../../assets/images/Skinsense_function_background.png";
  import styles from "../../../assets/style/Listacne.style";
  import Icons from "react-native-vector-icons/AntDesign";
  import ImgPapules from "../../assets/images/CausePapules.png"
  import ImgBlackHeads from "../../assets/images/CauseBlackheads.png"
  import ImgWhiteheads from "../../assets/images/CauseWhiteheads.png"
  import ImgPustules from "../../assets/images/CausePustules.png"
  import ImgNodules from "../../assets/images/CauseNodules.png"
  import ImgCyst from "../../assets/images/CauseCyst.png"
const CauseAcne = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={ImgBackground}
        style={{ height: "100%", width: "100%" }}
        resizeMode="stretch"
      >
        <TouchableOpacity
            onPress={() => {
              navigation.navigate("Service");
            }}
          >
            <Icons name="arrowleft" size={35} style={styles.IconLeft} />
          </TouchableOpacity>

        <View style={styles.Header}>
          
          <Text style={styles.Text}>Cause of acne</Text>
        </View>

        <View style={styles.Body}>
          <View style={styles.AcneBody}>
            <View style={styles.Acne}>
            {/* Papules */}
              <View style={styles.Acne_Img}>
                <Image source={ImgPapules} resizeMode="stretch" style={styles.ImgAcne}/>
              </View>
              <Text style={styles.Txt_Acne}>Papules</Text>
            </View>
            {/* Blackheads */}
            <View style={styles.Acne}>
              <View style={styles.Acne_Img}>
                <Image source={ImgBlackHeads} resizeMode="stretch" style={styles.ImgAcne}/>
              </View>
              <Text style={styles.Txt_Acne}>Blackheads</Text>
            </View>
          </View>
          {/* Whiteheads */}
          <View style={styles.AcneBody}>
            <View style={styles.Acne}>
              <View style={styles.Acne_Img}>
                <Image source={ImgWhiteheads} resizeMode="stretch" style={styles.ImgAcne}/>
              </View>
              <Text style={styles.Txt_Acne}>Whiteheads</Text>
            </View>
            {/* Pustules */}
            <View style={styles.Acne}>
              <View style={styles.Acne_Img}>
                <Image source={ImgPustules} resizeMode="stretch" style={styles.ImgAcne}/>
              </View>
              <Text style={styles.Txt_Acne}>Pustules</Text>
            </View>
          </View>
          {/* Nodules */}
          <View style={styles.AcneBody}>
            <View style={styles.Acne}>
              <View style={styles.Acne_Img}>
                <Image source={ImgNodules} resizeMode="stretch" style={styles.ImgAcne}/>
              </View>
              <Text style={styles.Txt_Acne}>Nodules</Text>
            </View>
            {/* Cyst */}
            <View style={styles.Acne}>
              <View style={styles.Acne_Img}>
                <Image source={ImgCyst} resizeMode="stretch" style={styles.ImgAcne}/>
              </View>
              <Text style={styles.Txt_Acne}>Cyst</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

export default CauseAcne