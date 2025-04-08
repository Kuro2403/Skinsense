import { StyleSheet, Dimensions } from "react-native";
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from "react-native-responsive-dimensions";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const styles = StyleSheet.create({
  Header: {
    marginTop: responsiveScreenHeight(6),
    marginLeft: responsiveScreenWidth(8),
  },
  TextHeader: {
    fontSize: responsiveScreenFontSize(5),
    fontWeight: "bold",
    color: "white",
  },
  Text: {
    fontSize: responsiveScreenFontSize(2),
    color: "white",
  },
  HeaderText: {
    fontSize: responsiveScreenFontSize(2),
    color: "white",
    fontWeight: "bold",
  },
  Body: {
    justifyContent: "center",
    alignItems: "center",
  },
  Img: {
    top: -responsiveScreenHeight(4),
    width: WIDTH,
    height: HEIGHT * 0.5,
  },
  ButtonSign: {
    top: -responsiveScreenHeight(3),
    justifyContent: "center",
    alignItems: "center",
    width: WIDTH * 0.75,
    height: HEIGHT * 0.07,
    backgroundColor: "white",
    borderRadius:20,
  },
  TextSignIn:{
    fontSize: responsiveScreenFontSize(3.4),
    color: "blue",
    fontWeight: "bold",
  },
  ButtonCreate:{
    justifyContent: "center",
    alignItems: "center",
    width: WIDTH * 0.75,
    height: HEIGHT * 0.07,
    backgroundColor: "blue",
    borderRadius:20,
    borderWidth:2,
    borderColor:"white"
  },
  TextCreate:{
    fontSize: responsiveScreenFontSize(3.4),
    color: "white",
    fontWeight: "bold",
  },
  Bottom:{
    justifyContent: "center",
    alignItems: "center",
    flexDirection:"row",
    marginTop: responsiveScreenHeight(6),
  },
  TextBottom:{
    fontSize: responsiveScreenFontSize(2),
  },
  TextBottomSign:{
    marginLeft:responsiveScreenWidth(2),
    color:"blue",
    fontWeight:"bold"
  }
});

export default styles;
