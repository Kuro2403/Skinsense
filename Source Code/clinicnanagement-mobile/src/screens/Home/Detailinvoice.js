import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import ImgBackground from "../../assets/images/Skinsense_function_background.png";
import styles from "../../../assets/style/Invoice.style";
import Icons from "react-native-vector-icons/AntDesign";

const Detailinvoice = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={ImgBackground}
        style={{ height: "100%", width: "100%" }}
        resizeMode="stretch"
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Invoice");
          }}
        >
          <Icons name="arrowleft" size={35} style={styles.IconLeft} />
        </TouchableOpacity>

        <View style={styles.Header}>
          <Text style={styles.Text}>Invoice</Text>
        </View>

        <View style={styles.Body}>
          <ScrollView>
          <View style={styles.BodyCenter}>
            <View style={styles.header_body}>
              <Text style={styles.Txt_header_body}>Information of patient</Text>
            </View>
          </View>
          <View style={styles.Body_body}>
            <View style={styles.Body_body_detail}>
              <View style={styles.Body_body_tit}>
                <Text style={styles.Body_body_tit_text}>Patient Name</Text>
                <Text style={styles.Body_body_tit_txt}>Nguyen Van A</Text>
                <Text style={styles.Body_body_tit_text}>Email</Text>
                <Text style={styles.Body_body_tit_txt}>
                  tntrngtrung@gmail.com
                </Text>
              </View>
              <View style={styles.Body_body_tit}>
                <Text style={styles.Body_body_tit_text}>Phone Number</Text>
                <Text style={styles.Body_body_tit_txt}>098725412</Text>
                <Text style={styles.Body_body_tit_text}>Address</Text>
                <Text style={styles.Body_body_tit_txt}>Rach Gia, Viet Nam</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={styles.brick} />
              <Text style={styles.Body_body_tit_txt_tittle}>
                {" "}
                Detail invoice{" "}
              </Text>
              <View style={styles.brick} />
            </View>
            <View style={styles.Body_body_tit_time}>
                <Text style={styles.Body_body_tit_text}>Invoice date</Text>
                <Text style={styles.Body_body_tit_txt}>02 july, 2023</Text>
            </View>
            <View style={styles.Body_body_inv}>
              <View style={styles.Body_body_invoice}>
                <View style={styles.Body_body_invoice_title}>
                  <Text
                    style={[
                      styles.Body_body_invoice_title_txt,
                      styles.width_txt,
                    ]}
                  >
                    Items
                  </Text>
                  <Text style={styles.Body_body_invoice_title_txt}>Dosage</Text>
                  <Text style={styles.Body_body_invoice_title_txt}>Price</Text>
                </View>
                <View style={styles.Body_body_invoice_payment}>
                  <Text
                    style={[
                      styles.Body_body_invoice_payment_txt,
                      styles.width_txt,
                    ]}
                  >
                    La roche posay Serozinc
                  </Text>
                  <Text style={styles.Body_body_invoice_payment_txt}>x1</Text>
                  <Text style={styles.Body_body_invoice_payment_txt}>35$</Text>
                </View>
                
              </View>
              <View style={styles.Body_body_invoice}>
                <View style={styles.Body_body_invoice_title}>
                  <Text
                    style={[
                      styles.Body_body_invoice_title_txt,
                      styles.width_txt,
                    ]}
                  >
                    Treatment
                  </Text>
                  <Text style={styles.Body_body_invoice_title_txt}>Price</Text>
                </View>
                <View style={styles.Body_body_invoice_payment}>
                  <Text style={[styles.Body_body_invoice_payment_txt]}>
                  injections of medication
                  </Text>

                  <Text style={styles.Body_body_invoice_payment_txt}>35$</Text>
                </View>
              </View>
              <View style={styles.Body_body_invoice_total}>
                <Text style={styles.Body_body_invoice_total_txt}>TOTAL</Text>
                <Text style={styles.Body_body_invoice_payment_txt}>780$</Text>
              </View>
              <View style={styles.Status_invoice}>
                    <Text style={styles.Body_body_invoice_total_txt_invoice}>status:</Text>
                    <Text style={styles.Status_true}>paid</Text>
                    {/* dieu kien */}
                    {/* <Text style={styles.Status_failed}>unpaid</Text> */}
              </View>
            </View>
          </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Detailinvoice;
