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
  Text: {
    fontSize: responsiveScreenFontSize(3),
    fontWeight: "bold",
    color: "white",
  },
  Body: {
    marginTop: responsiveScreenHeight(1.5),
    backgroundColor: "white",
    flex: 1,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    alignItems:"center",
  },
  Acnes:{
    marginTop: responsiveScreenHeight(4),
    width: WIDTH * 0.9,
    height: HEIGHT * 0.15,
    borderRadius:20,
    backgroundColor:"white",
    shadowColor: "#000000",
    shadowOffset: { width: 30, height: 30 },
    shadowOpacity: 10,
    shadowRadius: 3.5,
    elevation: 3,
    
  },
  AcneImg:{
    height:"100%",
    width:"100%",
    borderRadius:20,
    overflow:"hidden",
   
    justifyContent:"center",
    alignItems:"center",
  },
  Txt_Acne:{
    fontSize: responsiveScreenFontSize(3),
    fontWeight: "bold",
    color: "white",
  }
  
});

export default styles;
