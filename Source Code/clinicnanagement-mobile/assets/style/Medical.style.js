import { StyleSheet, Dimensions } from "react-native";
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from "react-native-responsive-dimensions";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
  txt_medical_id: {
    fontSize: responsiveScreenFontSize(2),
  },
  IconLeft: {
    width: WIDTH * 0.1,
    marginTop: responsiveScreenHeight(5),
    marginLeft: responsiveScreenWidth(4),
    color: "white",
  },
  Header: {
    alignItems: "center",
    justifyContent: "center",
  },
  Text: {
    top: -responsiveScreenHeight(3.5),
    fontSize: responsiveScreenFontSize(2.5),
    fontWeight: "bold",
    color: "white",
    position: "absolute",
  },
  Body: {
    marginTop: responsiveScreenHeight(1.5),
    backgroundColor: "white",
    flex: 1,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  Center: {
    alignItems: "center",
  },
  medical: {
    width: WIDTH * 0.9,
    height: HEIGHT * 0.25,
    backgroundColor: "white",
    marginVertical: responsiveScreenHeight(2),
    borderRadius: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 30, height: 30 },
    shadowOpacity: 10,
    shadowRadius: 3.5,
    elevation: 8,
    padding: 20,
  },
  text_medical_header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text_medical: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: responsiveScreenHeight(3),
  },
  Notification_medical: {
    flexDirection: "row",
    marginTop: responsiveScreenHeight(2),
  },
  txt_medical_Title: {
    fontWeight: "bold",
    fontSize: responsiveScreenFontSize(3),
  },
  txt_medical_id: {
    fontSize: responsiveScreenFontSize(2),
  },
  txt_medical: {
    fontWeight: "bold",
    fontSize: responsiveScreenFontSize(2),
  },
  txt_medical_content: {
    borderLeftColor: "black",
    borderLeftWidth: 1,
    paddingLeft: 20,
    marginRight: responsiveScreenWidth(20),
    marginLeft:responsiveScreenWidth(10),
  },
  txt_medical_content_doctor: {
    borderLeftColor: "black",
    borderLeftWidth: 1,
    paddingLeft: 20,
    marginRight: responsiveScreenWidth(20),
    marginLeft:responsiveScreenWidth(2),
  },
  txt_medical_content_Complete: {
    marginRight: responsiveScreenWidth(15),
  },
  medicalComplete: {
    width: responsiveScreenWidth(65),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: responsiveScreenHeight(5),
    borderRadius: 15,
  },
  button_medical: {
    width: responsiveScreenWidth(12),
    height: responsiveScreenHeight(5),
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "#000000",
    shadowOffset: { width: 30, height: 30 },
    shadowOpacity: 10,
    shadowRadius: 3.5,
    elevation: 3,
    marginHorizontal: responsiveScreenWidth(4),
  },
  header_body: {
    alignItems: "center",
    backgroundColor: "black",
    justifyContent: "center",
    height: responsiveScreenHeight(5),
    width: responsiveScreenWidth(60),
    borderRadius: 30,
    marginTop: responsiveScreenHeight(2),
  },
  Txt_header_body: {
    color: "white",
    fontWeight: "bold",
    fontSize: responsiveScreenFontSize(2),
  },
  Body_body: {
    paddingHorizontal: responsiveScreenWidth(7),
  },
  Body_body_detail: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  Body_body_tit: {
    marginTop: responsiveScreenHeight(2),
  },
  Body_body_tit_text: {
    fontSize: responsiveScreenFontSize(2),
    fontWeight: "bold",
    paddingVertical: responsiveScreenHeight(1.5),
  },
  Body_body_tit_txt: {
    fontSize: responsiveScreenFontSize(1.8),
  },
  Body_body_medical: {
    flexDirection: "row",
    marginTop: responsiveScreenHeight(2),
  },
  Body_body_medical_title: {
    width: responsiveScreenWidth(30),
  },
  Body_body_medical_payment: {
    alignItems: "center",
    justifyContent: "center",
  },
  Body_body_medical_title_txt: {
    fontSize: responsiveScreenFontSize(2),
    paddingVertical: responsiveScreenHeight(1.2),
    fontWeight: "bold",
  },
  Body_body_medical_payment_txt: {
    fontSize: responsiveScreenFontSize(2),
    paddingVertical: responsiveScreenHeight(1.2),
  },
  Body_body_medical_total: {
    flexDirection: "row",
    width: responsiveScreenWidth(50),
    borderTopWidth: 1,
    borderColor: "black",
  },
  Body_body_medical_total_txt: {
    fontSize: responsiveScreenFontSize(2),
    paddingVertical: responsiveScreenHeight(1.2),
    fontWeight: "bold",
    width: responsiveScreenWidth(30),
  },
  Body_body_Note_title: {
    fontSize: responsiveScreenFontSize(3),
    paddingVertical: responsiveScreenHeight(1),
    fontWeight: "bold",
  },
  Body_body_Note_txt: {
    fontSize: responsiveScreenFontSize(1.7),
  },
  Body_Header: {
    alignItems: "center",
    backgroundColor: "black",
    justifyContent: "center",
    height: responsiveScreenHeight(5),
    width: responsiveScreenWidth(60),
    borderRadius: 30,
    marginTop: responsiveScreenHeight(2),
  },
  Txt_body_header: {
    color: "white",
    fontWeight: "bold",
    fontSize: responsiveScreenFontSize(2),
  },
  brick: {
    width: "50%",
    height: 2,
    backgroundColor: "black",
  },
  wrap: {
    width: WIDTH * 1,
    height: HEIGHT * 0.3,
    alignSelf: "center",
  },
  wrapImg: {
    width: WIDTH * 0.92,
    borderRadius: 40,
    marginHorizontal: 16,
  },
  warpNews: {
    marginTop: responsiveScreenHeight(2),
  },
  wrapDot: {
    position: "absolute",
    marginTop: responsiveScreenHeight(28),
    flexDirection: "row",
    alignSelf: "center",
  },
  dotActive: {
    margin: 3,
    color: "gray",
    fontSize: 20,
  },
  dot: {
    margin: 3,
    color: "black",
    fontSize: 20,
  },
  TextNews: {
    marginTop: responsiveScreenHeight(1),
  },
  advertisement: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    height: 120,
    width: 120,
    borderRadius: 25,
    marginHorizontal: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
   borderWidth:1
  },
  advImg: {
    height: 90,
    width: 100,
  },
  scrollView: {
    flex: 1,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginTop: responsiveScreenHeight(1),

    marginLeft: responsiveScreenWidth(5),
  },
});

export default styles;
