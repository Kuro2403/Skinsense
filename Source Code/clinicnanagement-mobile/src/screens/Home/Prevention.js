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
import ImgAcneDrainage from "../../assets/images/Acnedrainage.png";
import ImgChemicalPeels from "../../assets/images/Chemicalpeels.png";
import ImgLaserTherapy from "../../assets/images/Lasertherapy.png";
import ImgBlueLightTherapy from "../../assets/images/Bluelighttherapy.png";
import ImgInjectionsOfMedication from "../../assets/images/Injectionsofmedication.png";
import ImgAcneTreatments from "../../assets/images/Acnetreatments.png";
import ImgPDTtreatment from "../../assets/images/PDTtreatment.png";
const Prevention = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
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
          <Text style={styles.Text}>Acne Prevention Measures</Text>
        </View>

        <View style={styles.Body}>
          <View style={styles.AcneBody}>
            <View style={styles.Acne}>
              {/* Acne drainage  */}
              <View style={styles.Acne_Img}>
                <Image
                  source={ImgAcneDrainage}
                  resizeMode="stretch"
                  style={styles.ImgAcne}
                />
              </View>
              <Text style={styles.Txt_Acne}>Acne drainage </Text>
            </View>
            {/* Chemical peels */}
            <View style={styles.Acne}>
              <View style={styles.Acne_Img}>
                <Image
                  source={ImgChemicalPeels}
                  resizeMode="stretch"
                  style={styles.ImgAcne}
                />
              </View>
              <Text style={styles.Txt_Acne}>Chemical peels</Text>
            </View>
          </View>
          {/* Laser therapy */}
          <View style={styles.AcneBody}>
            <View style={styles.Acne}>
              <View style={styles.Acne_Img}>
                <Image
                  source={ImgLaserTherapy}
                  resizeMode="stretch"
                  style={styles.ImgAcne}
                />
              </View>
              <Text style={styles.Txt_Acne}>Laser therapy</Text>
            </View>
            {/* Blue light therapy  */}
            <View style={styles.Acne}>
              <View style={styles.Acne_Img}>
                <Image
                  source={ImgBlueLightTherapy}
                  resizeMode="stretch"
                  style={styles.ImgAcne}
                />
              </View>
              <Text style={styles.Txt_Acne}>Blue light therapy </Text>
            </View>
          </View>
          {/* Injections of medication */}
          <View style={styles.AcneBody}>
            <View style={styles.Acne}>
              <View style={styles.Acne_Img}>
                <Image
                  source={ImgInjectionsOfMedication}
                  resizeMode="stretch"
                  style={styles.ImgAcne}
                />
              </View>
              <Text style={styles.Txt_Acne}>Injections of medication</Text>
            </View>
            {/* Acne treatments */}
            <View style={styles.Acne}>
              <View style={styles.Acne_Img}>
                <Image
                  source={ImgAcneTreatments}
                  resizeMode="stretch"
                  style={styles.ImgAcne}
                />
              </View>
              <Text style={styles.Txt_Acne}>Acne treatments</Text>
            </View>
          </View>
          <View style={styles.AcneBody}>
            <View style={styles.Acne}>
              <View style={styles.Acne_Img}>
                <Image
                  source={ImgPDTtreatment}
                  resizeMode="stretch"
                  style={styles.ImgAcne}
                />
              </View>
              <Text style={styles.Txt_Acne}>PDT treatment </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default Prevention;
