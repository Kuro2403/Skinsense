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
  UserLogo: {
    flexDirection: "row",
    marginTop: responsiveScreenHeight(4),
    justifyContent:"space-between"
  },
  ImageUser: {
    height: 50,
    width: 50,
    marginLeft: responsiveScreenWidth(5),
  },
  IconUserService: {
   alignSelf:"flex-end",
  },
  IconLeft: {
    width: WIDTH * 0.1,
    marginRight: responsiveScreenWidth(4),
    color: "white",
  },
  ImageUserService: {
    height: 35,
    width: 35,
    marginLeft: responsiveScreenWidth(5),
  },
  TextUser: {
    marginLeft: responsiveScreenWidth(6),
    marginTop: responsiveScreenHeight(0.5),
  },
  TextName: {
    color: "#ffffff",
    fontSize: responsiveScreenFontSize(2.5),
    fontWeight: "bold",
  },
  TextUserName: {
    flexDirection: "row",
  },
  UserBody: {
    height: responsiveScreenHeight(117),
    backgroundColor: "#ffffff",
    marginTop: responsiveScreenHeight(1.5),
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
  UserBodyDoctor: {
    height: responsiveScreenHeight(100),
    backgroundColor: "#ffffff",
    marginTop: responsiveScreenHeight(1.5),
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
  wrap: {
    width: WIDTH * 0.9,
    height: HEIGHT * 0.25,
    alignSelf: "center",
  },
  wrapImg: {
    width: WIDTH * 0.8,
    borderRadius: 40,
    marginHorizontal: 16,
  },
  warpNews: {
    marginTop: responsiveScreenHeight(4),
  },
  wrapDot: {
    position: "absolute",
    marginTop: responsiveScreenHeight(24),
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
  service: {
    marginTop: responsiveScreenHeight(2),
  },
  serviceCommon: {
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    height: 110,
    width: 120,
    borderRadius: 25,
    marginHorizontal: 12,
    shadowColor: "#000000",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    flex:1,
  },
  serviceCommonText: {
    fontSize: responsiveScreenFontSize(1.6),
    paddingTop: 5,
    fontWeight: "bold",
  },
  ServiceText: {
    marginLeft: responsiveScreenWidth(6),
    marginTop: responsiveScreenHeight(2),
  },
  textService: {
    fontSize: responsiveScreenFontSize(2.5),
    fontWeight: "bold",
  },
  serviceList: {
    marginTop: responsiveScreenHeight(1),
    flexDirection: "row",
  
  },

  scheduleText: {
    marginLeft: responsiveScreenWidth(6),
    marginTop: responsiveScreenHeight(2),
    fontSize: responsiveScreenFontSize(2.5),
    fontWeight: "bold",
  },

  SuggestionText: {
    marginLeft: responsiveScreenWidth(6),
    marginTop: responsiveScreenHeight(2),
    fontSize: responsiveScreenFontSize(2.5),
    fontWeight: "bold",
  },

  Calendar: {
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    padding: 5,
    marginHorizontal: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  ScrollSuggestion: {
    marginTop: responsiveScreenHeight(2),
    height: 130,
  },
  TopRatedText: {
    marginLeft: responsiveScreenWidth(6),
    marginTop: responsiveScreenHeight(2),
    fontSize: responsiveScreenFontSize(2.5),
    fontWeight: "bold",
  },
});

export default styles;
