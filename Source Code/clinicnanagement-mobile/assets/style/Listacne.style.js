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
  BodyAcne: {
    marginTop: responsiveScreenHeight(9),
    backgroundColor: "white",
    flex: 1,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  Acne: {
    justifyContent: "center",
    alignItems: "center",
  },
  AcneBody: {
    flexDirection: "row",
  },
  Acne_Img: {
    width: WIDTH * 0.4,
    height: HEIGHT * 0.2,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"white",
    shadowColor: "#000000",
    shadowOffset: { width: 30, height: 30 },
    shadowOpacity: 10,
    shadowRadius: 3.5,
    elevation: 3,
    marginHorizontal: responsiveScreenWidth(4),
    marginTop: responsiveScreenHeight(3),
  },
  ImgAcne: {
    height: "90%",
    width: "90%",
  },
  Txt_Acne: {
    width: WIDTH * 0.4,
    marginTop: responsiveScreenHeight(1),
    fontSize: responsiveScreenFontSize(2.3),
    fontWeight: "bold",
    color: "#64B6E4",
    textAlign: "center",
  },
  ImgAcneHeader: {
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.45,
    height: Dimensions.get("window").width * 0.45,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: responsiveScreenWidth(10),
    shadowColor: "white",
    shadowOffset: { width: 30, height: 30 },
    shadowOpacity: 100,
    shadowRadius: 0.5,
    elevation: 10,
  },
  Txt_Tittle: {
    marginTop: responsiveScreenHeight(14),
    fontSize: responsiveScreenFontSize(3),
    fontWeight: "bold",
    color: "black",
  },
  txt_content: {
    fontSize: responsiveScreenFontSize(2),
  },
  TextBody: {
    paddingHorizontal: responsiveScreenWidth(10),
  },
  ImgFace: {
   
    width: WIDTH * 0.4,
    height: HEIGHT * 0.3,
    marginHorizontal: responsiveScreenWidth(5),
  },
  Suggested: {
    height: HEIGHT * 0.4,
  },
  ImgProduct: {
    width: WIDTH * 0.5,
    height: HEIGHT * 0.3,
  },
  Txt_Suggested: {
    fontSize: responsiveScreenFontSize(3),
    marginTop: responsiveScreenHeight(5),
    fontWeight: "bold",
    color: "black",
  },
});

export default styles;
