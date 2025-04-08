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
const News = ({ navigation }) => {
  return (
    <View style={styles.container}>
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

        <View style={styles.Header_Detail}>
          <Text style={styles.Text_Detail}>News</Text>
        </View>

        <View style={styles.Body}>
          <ScrollView style={styles.scrollViewSearch}>
            {/* search */}
            <View style={styles.SearchNew}>
              <TextInput
                placeholder="Example:inflammatory acne on the face."
                style={styles.textSearch}
              />
              <Icons
                name="search1"
                size={25}
                style={{ color: "white", paddingLeft: 10 }}
              />
            </View>
            <View style={styles.NewBody}>
              <TouchableOpacity
                style={styles.News_title}
                onPress={() => {
                  navigation.navigate("DetailNews");
                }}
              >
                <Text style={styles.txt_title_News}>
                  Researchers Discover New Pain Organ in Human Skin | Biology,
                  Neuroscience
                </Text>
                <Image source={ImgNew2} style={styles.img_News}></Image>
              </TouchableOpacity>
              <View style={styles.News_title}>
                <Text style={styles.txt_title_News}>
                  Shining a Spotlight on Skin Conditions Affecting People with
                  Black & Brown Skin
                </Text>
                <Image source={ImgNew} style={styles.img_News}></Image>
              </View>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default News;
