import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Icons from "react-native-vector-icons/FontAwesome5";
import IconEntypo from "react-native-vector-icons/Entypo";
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from "react-native-responsive-dimensions";
const RatedCommon = (props) => {
  return (
    <View style={styles.Rated}>
      <View style={styles.RatedStar}>
        <Icons name="user-alt" size={40} color="black" />
        <Text>
          {props.NumberStar}
          <IconEntypo name="star" size={20} color={"black"} />
        </Text>
      </View>
      <View style={styles.RatedName}>
        <Text style={styles.TextDoctor}>{props.NameDoctor}</Text>
        <Text style={styles.TextAcne}>{props.NameAcne}</Text>
      </View>
      <View style={styles.RatedRight}>
        <IconEntypo name="chevron-small-right" size={40} color={"black"} />
      </View>
    </View>
  );
};

export default RatedCommon;

const styles = StyleSheet.create({
  Rated: {
    marginTop: responsiveScreenHeight(2),
    marginLeft: responsiveScreenWidth(5),
    height: responsiveScreenHeight(11),
    width: responsiveScreenWidth(90),
    backgroundColor: "#F5F5F5",
    flexDirection: "row",
    borderRadius: 20,
    padding: 5,
    marginHorizontal: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  RatedStar: {
    marginLeft: responsiveScreenWidth(8),
    justifyContent: "center",
    alignItems: "center",
  },
  RatedName: {
    width:responsiveScreenWidth(45),
    marginLeft: responsiveScreenWidth(10),
    justifyContent: "center",
  },
  RatedRight: {

    justifyContent: "center",
    alignItems: "center",
  },
  TextDoctor: {
    fontSize: responsiveScreenFontSize(2.3),
    fontWeight: "bold",
  },
  TextAcne:{
    fontSize: responsiveScreenFontSize(2),
  }
});
