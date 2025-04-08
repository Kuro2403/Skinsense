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
  },
  Header: {
    marginTop: responsiveScreenHeight(6),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  checkboxGender: {
    marginTop: responsiveScreenHeight(4),
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
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
    fontSize: 15,
    fontWeight: "bold",
  },
  IconLeft: {
    width: WIDTH * 0.1,
    marginTop: responsiveScreenHeight(5),
    marginLeft: responsiveScreenWidth(4),
    color: "white",
  },
  Text: {
    fontSize: responsiveScreenFontSize(3),
    fontWeight: "bold",
    color: "white",
  },
  button_Pass: {
    backgroundColor: "#386DFE",
    width: 160,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  Header_Detail: {
    alignItems: "center",
    justifyContent: "center",
  },
  Text_Detail: {
    top: -responsiveScreenHeight(3.5),
    fontSize: responsiveScreenFontSize(2.5),
    fontWeight: "bold",
    color: "white",
    position: "absolute",
  },
  scrollView: {
    flex: 1,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginTop: responsiveScreenHeight(1),
    paddingBottom: responsiveScreenHeight(3),
  },
  Body: {
    marginTop: responsiveScreenHeight(1.5),
    backgroundColor: "white",
    flex: 1,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  Account_Header: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  Txt_Button_edit: {
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: "white",
    height: responsiveScreenHeight(6),
    alignItems: "center",
    width: responsiveScreenWidth(70),
    borderRadius: 25,
  },
  Button_edit: {
    backgroundColor: "#386DFE",
    width: responsiveScreenWidth(22),
    height: responsiveScreenHeight(4),
    justifyContent: "center",

    fontSize: responsiveScreenFontSize(2),
    borderRadius: 25,
    marginLeft: responsiveScreenWidth(3),
    alignItems: "center",
  },
  Txt_Email: {
    fontSize: responsiveScreenFontSize(1.8),
  },
  Txt_Edit: {
    fontSize: responsiveScreenFontSize(1.8),
    color: "white",
  },
  contents: {
    marginTop: responsiveScreenHeight(4),
    paddingHorizontal: responsiveScreenWidth(3),
  },
  Table_of_contents: {
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 30, height: 30 },
    shadowOpacity: 10,
    shadowRadius: 3.5,
    elevation: 8,
  },

  contents_Title: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contents_Title_2: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brick: {
    borderColor: "#000000",
    borderTopWidth: 0.2,
  },
  Header_Txt: {
    fontSize: responsiveScreenFontSize(3.5),
    fontWeight: "bold",
    marginLeft: responsiveScreenWidth(10),
    marginBottom: responsiveScreenHeight(2),
  },
  Text_contents: {
    fontSize: responsiveScreenFontSize(2),
    fontWeight: "bold",
    paddingLeft: 10,
  },
  Logout: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: responsiveScreenHeight(4),
  },
  Button_logout: {
    color: "#7ED3E5",
  },
  Text_logout: {
    fontSize: responsiveScreenFontSize(3),
    fontWeight: "bold",
  },
  Edit_Width: {
    width: WIDTH * 0.9,
    justifyContent: "center",
    alignSelf: "center",
  },
  EditFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: responsiveScreenHeight(2),
    paddingHorizontal: 20,
    height: responsiveScreenHeight(8),
    borderBottomWidth: 0.2,
    borderColor: "black",
  },
  Edit_txt: {
    fontSize: responsiveScreenFontSize(2),
    fontWeight: "bold",
  },
  ImageUserProfile: {
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.15,
    height: Dimensions.get("window").width * 0.15,
  },
  Form_input: {
    paddingLeft: 20,
    fontSize: responsiveScreenFontSize(2),
  },
  Form_Pass: {
    flexDirection: "row",
    alignItems: "center",
  },
  InputTextForm: {
    paddingLeft: 20,
    fontSize: responsiveScreenFontSize(2),
  },
  TextError: {
    marginTop: responsiveScreenHeight(1),
    fontSize: responsiveScreenFontSize(2),
    color: "red",
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: WIDTH * 0.3,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  Button_center: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: responsiveScreenHeight(4),
  },
  Button_Save: {
    backgroundColor: "#386DFE",
    width: responsiveScreenWidth(20),
    height: responsiveScreenHeight(6),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  Txt_Save: {
    color: "white",
    fontSize: responsiveScreenFontSize(2),
  },
  UserProfile_img: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  UserProfile: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  Text_User: {
    fontSize: 17,
    paddingLeft: 5,
  },
  Txt_Pass:{
  fontSize:15,
  color:"white",
  fontWeight:"bold"
  }
});

export default styles;
