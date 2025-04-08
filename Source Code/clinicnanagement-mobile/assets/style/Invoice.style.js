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
  Body_body_tit_txt_tittle: {
    fontSize: responsiveScreenFontSize(2),
    fontWeight: "bold",
    paddingVertical: responsiveScreenHeight(1.5),
  },
  brick: {
    width: "50%",
    height: 2,
    backgroundColor: "black",
  },
  Body: {
    marginTop: responsiveScreenHeight(1.5),
    backgroundColor: "white",
    flex: 1,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  BodyCenter: {
    alignItems: "center",
  },
  Invoice: {
    width: WIDTH * 0.9,
    height: HEIGHT * 0.18,
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
  text_invoice_header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text_invoice: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: responsiveScreenHeight(3),
  },
  text_invoice_doctor:{
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: responsiveScreenHeight(3),
  },
  Notification_invoice: {
    flexDirection: "row",
    marginTop: responsiveScreenHeight(3),
  },
  txt_invoice_Title: {
    fontWeight: "bold",
    fontSize: responsiveScreenFontSize(3),
  },
  txt_invoice_id: {
    fontSize: responsiveScreenFontSize(2),
  },
  txt_invoice: {
    fontWeight: "bold",
    fontSize: responsiveScreenFontSize(2),
  },
  txt_invoice_content: {
    borderLeftColor: "black",
    borderLeftWidth: 1,
    paddingLeft: 20,
   
  },
  txt_invoice_content_Complete: {
    marginRight: responsiveScreenWidth(15),
  },
  invoiceComplete: {
    width: responsiveScreenWidth(65),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: responsiveScreenHeight(5),
    borderRadius: 15,
  },
  button_invoice: {
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
    fontSize: responsiveScreenFontSize(2.3),
    fontWeight: "bold",
    paddingVertical: responsiveScreenHeight(1.5),
  },
  Body_body_tit_txt: {
    fontSize: responsiveScreenFontSize(1.8),
  },
  Body_body_invoice: {
    marginTop: responsiveScreenHeight(0.5),  
  },
  Body_body_invoice_title: {
    flexDirection:"row",
    justifyContent:"space-between",
  },
  Body_body_invoice_payment:{
    flexDirection:"row",
    justifyContent:"space-between",
  },
  width_txt:{
    width:responsiveScreenWidth(30)
  },
  Body_body_invoice_title_txt: {
    fontSize: responsiveScreenFontSize(2.5),
    paddingVertical: responsiveScreenHeight(1.2),
    fontWeight: "bold",
  },
  Body_body_invoice_payment_txt: {
    fontSize: responsiveScreenFontSize(2),
    paddingVertical: responsiveScreenHeight(1.2),
  },
  Body_body_invoice_total:{
    marginTop:responsiveScreenHeight(2.2),
    flexDirection: "row",
    width: responsiveScreenWidth(50),
    borderTopWidth:1,
    borderColor:"black"
  },
  Status_invoice:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"flex-end"
  },
  Body_body_invoice_total_txt:{
    fontSize: responsiveScreenFontSize(2),
    paddingVertical: responsiveScreenHeight(1.2),
    fontWeight: "bold",
    width: responsiveScreenWidth(30),
  },
  Body_body_invoice_total_txt_invoice:{
    fontSize: responsiveScreenFontSize(3),
    paddingVertical: responsiveScreenHeight(1.2),
    fontWeight: "bold",
    width: responsiveScreenWidth(30),
  },
  Status_true:{
    fontSize: responsiveScreenFontSize(3), 
    fontWeight: "bold",
    color:"green"
  },
  Status_failed:{
    fontSize: responsiveScreenFontSize(3), 
    fontWeight: "bold",
    color:"red"
  },
  Body_body_Note_title:{
    fontSize: responsiveScreenFontSize(3),
    paddingVertical: responsiveScreenHeight(1),
    fontWeight: "bold",
  },
  Body_body_Note_txt:{
    fontSize: responsiveScreenFontSize(1.7),
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
