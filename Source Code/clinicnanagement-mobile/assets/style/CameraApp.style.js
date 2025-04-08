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
    backgroundColor: "#000",
    justifyContent: "center",
    paddingBottom: 20,
  },
  camera: {
    flex: 1,
    borderRadius: 20,
  },
  Button: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  Button_Camera_Center: {
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",

    paddingHorizontal: 50,
  },
  Button_cam: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.15,
    height: Dimensions.get("window").width * 0.15,
    backgroundColor: "white",
  },
  Text: {
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
  Button_Check_Re: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 50,
  },
  Button_Fls_Re: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 30,
  },
});

export default styles;
