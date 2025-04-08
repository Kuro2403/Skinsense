import { StyleSheet, Dimensions } from "react-native";
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from "react-native-responsive-dimensions";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

//Login
const AuthStyles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
  },
  IconLeft: {
    width: WIDTH * 0.1,
    marginTop: responsiveScreenHeight(6),
    marginLeft: responsiveScreenWidth(4),
    color: "white",
  },
  TextLogin: {
    marginTop: responsiveScreenHeight(4.5),
    marginLeft: responsiveScreenWidth(6),
    fontSize: responsiveScreenFontSize(5),
    fontWeight: "bold",
    color: "white",
  },
  TextForgot: {
    marginTop: responsiveScreenHeight(7),
    fontSize: responsiveScreenFontSize(5),
    fontWeight: "bold",
    color: "white",
  },
  TextHeader: {
    marginTop: responsiveScreenHeight(3),
    marginLeft: responsiveScreenWidth(6),
    fontSize: responsiveScreenFontSize(5),
    fontWeight: "bold",
    color: "white",
  },
  Body: {
    marginTop: responsiveScreenHeight(2),
    backgroundColor: "white",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingTop: responsiveScreenHeight(3),
    paddingHorizontal: responsiveScreenWidth(5),
    flex: 1,
  },
  BodyLogin: {
    height: responsiveScreenWidth(170),
  },
  BodyRegister: {
    height: responsiveScreenWidth(174),
  },
  BodyForgot: {
    height: responsiveScreenWidth(165),
  },
  Text: {
    fontSize: responsiveScreenFontSize(2),
  },
  Text_ver:{
    fontSize: responsiveScreenFontSize(1.8),
  },
  Text_Tittle: {
    fontSize: responsiveScreenFontSize(3.5),

    color: "blue",
  },
  Text_Header: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: responsiveScreenHeight(4),
  },
  Text_Welcome: {
    fontSize: responsiveScreenFontSize(3.5),
    fontWeight: "bold",
    color: "#386DFE",
  },
  TextVerification: {
    textAlign: "center",
  },
  Form_Group: {
    marginTop: responsiveScreenHeight(2),
  },
  label: {
    fontSize: responsiveScreenFontSize(2),
    fontWeight: "bold",
  },
  Form_input: {
    marginTop: responsiveScreenHeight(1),
    backgroundColor: "#D9D9D9",
    width: WIDTH * 0.9,
    height: HEIGHT * 0.07,
    paddingLeft: 20,
    fontSize: responsiveScreenFontSize(2.5),
    borderRadius: 15,
  },
  Form_Verification: {
    marginTop: responsiveScreenHeight(4),
    flexDirection: "row",
  },
  Input_Verification: {
    backgroundColor: "#D9D9D9",
    width: WIDTH * 0.15,
    height: HEIGHT * 0.07,

    fontSize: responsiveScreenFontSize(2.5),
    borderRadius: 15,
    flex: 1,
    marginHorizontal: 12,
  },
  Form_Pass: {
    flexDirection: "row",
    alignItems: "center",
  },
  Text_Email: {
    borderLeftWidth: 1,
    borderColor: "black",
    width: WIDTH * 0.72,
    height: HEIGHT * 0.07,
    paddingLeft: 20,
    fontSize: responsiveScreenFontSize(2.5),
    marginLeft: 20,
  },
  Text_ResetPass: {
    borderLeftWidth: 1,
    borderColor: "black",
    width: WIDTH * 0.62,
    height: HEIGHT * 0.07,
    paddingLeft: 20,
    fontSize: responsiveScreenFontSize(2.5),
    marginLeft: 20,
  },
  InputTextForm: {
    width: WIDTH * 0.7,
    height: HEIGHT * 0.07,
    fontSize: responsiveScreenFontSize(2.5),
  },
  Text_forget: {
    marginTop: responsiveScreenHeight(1),
    fontSize: responsiveScreenFontSize(2.5),
    color: "blue",
  },
  Button_Form: {
    marginTop: responsiveScreenHeight(2),
    backgroundColor: "#386DFE",
    width: WIDTH * 0.9,
    height: HEIGHT * 0.07,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  Text_Button: {
    fontSize: responsiveScreenFontSize(3.5),
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  TextError: {
    marginTop: responsiveScreenHeight(1),
    fontSize: responsiveScreenFontSize(2),
    color: "red",
  },
  Bottom: {
    borderTopWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",
  },
  BottomLogin: { marginTop: responsiveScreenHeight(15) },
  BottomRegister: { marginTop: responsiveScreenHeight(7) },
  TextBottom: {
    fontSize: responsiveScreenFontSize(2),
  },
  TextBottomSign: {
    marginLeft: responsiveScreenWidth(2),
    color: "blue",
    fontWeight: "bold",
  },
  checkboxGender: {
    marginVertical:10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-around"
  },
  checkMale: {
    flexDirection: "row",
    alignItems: "center",
  },
  Outter: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    width: 15,
    height: 15,
    backgroundColor: "gray",
    borderRadius: 10,
  },
  textGender: {
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default AuthStyles;
