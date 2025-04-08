import {
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import ImgBackground from "../../assets/images/Skinsense_function_background.png";
import Icons from "react-native-vector-icons/AntDesign";
import styles from "../../../assets/style/Appointment.style";
import ImgNew from "../../assets/images/images_mun.jpg";
import ImgNew2 from "../../assets/images/Rectangle-65.png";
const DetailNews = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={ImgBackground}
        style={{ height: "100%", width: "100%" }}
        resizeMode="stretch"
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("News");
          }}
        >
          <Icons name="arrowleft" size={35} style={styles.IconLeft} />
        </TouchableOpacity>

        <View style={styles.Header_Detail}>
          <Text style={styles.Text_Detail}>News</Text>
        </View>

        <View style={styles.Body}>
          <ScrollView style={styles.scrollViewSearch}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 30,
              }}
            >
              <Text style={styles.txt_Title}>
                Researchers Discover New Pain Organ in Human Skin | Biology,
                Neuroscience
              </Text>
              <Image style={styles.ImgNewsSlide} source={ImgNew}></Image>
              <Text style={styles.Text_describe}>
                Pain causes suffering and results in substantial costs for
                society. Almost one person in every five experiences constant
                pain and there is a considerable need to find new painkilling
                drugs. However, sensitivity to pain is also required for
                survival and it has a protective function. It prompts reflex
                reactions that prevent damage to tissue, such as pulling your
                hand away when you feel a jab from a sharp object or when you
                burn yourself. The newly-discovered sensory organ is built from
                specialized glial cells located in the epidermal-dermal border.
                It is sensitive to painful mechanical damage such as pricks and
                pressure.
              </Text>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default DetailNews;
