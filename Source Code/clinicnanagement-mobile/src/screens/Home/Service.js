import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import ImgBackground from "../../assets/images/Skinsense_function_background.png";
import styles from "../../../assets/style/Service.style";
import ImgListAcne from "../../assets/images/List_of_Acne.png";
import ImgCauseAcne  from "../../assets/images/Causes_of_Acne.png"
import ImgAcnePre from  "../../assets/images/Acne_prevention_measures.png"
import ImaAppointment from "../../assets/images/Appoiment.png"
const Service = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={ImgBackground}
        style={{ height: "100%", width: "100%" }}
        resizeMode="stretch"
      >
        <View style={styles.Header}>
      
          <Text style={styles.Text}>Service list</Text>
        </View>

        <View style={styles.Body}>
           {/* LIST OF ACNE */}
           <TouchableOpacity style={styles.Acnes} onPress={() => {
                    navigation.navigate("ListAcne");
                  }}>
            <ImageBackground
              source={ImgListAcne}
              style={styles.AcneImg}
              resizeMode="stretch"
            >
              <Text style={styles.Txt_Acne}>LIST OF ACNE</Text>
            </ImageBackground>
          </TouchableOpacity>

        {/* CAUSES OF ACNE */}
          <TouchableOpacity style={styles.Acnes} onPress={() => {
                    navigation.navigate("CauseAcne");
                  }}>
            <ImageBackground
              source={ImgCauseAcne}
              style={styles.AcneImg}
              resizeMode="stretch"
            >
              <Text style={styles.Txt_Acne}>CAUSES OF ACNE</Text>
            </ImageBackground>
          </TouchableOpacity>

             {/* ACNE PREVENTION MEASURES */}
             <TouchableOpacity style={styles.Acnes} onPress={() => {
                    navigation.navigate("Prevention");
                  }}>
            <ImageBackground
              source={ImgAcnePre}
              style={styles.AcneImg}
              resizeMode="stretch"
            >
              <Text style={styles.Txt_Acne}>ACNE PREVENTION MEASURES</Text>
            </ImageBackground>
          </TouchableOpacity>
           {/* APPOINTMENT */}
           <TouchableOpacity style={styles.Acnes}  onPress={() => {
                    navigation.navigate("Appointment");
                  }}>
            <ImageBackground
              source={ImaAppointment}
              style={styles.AcneImg}
              resizeMode="stretch"
            >
              <Text style={styles.Txt_Acne}>APPOINTMENT</Text>
            </ImageBackground>
          </TouchableOpacity>

          
        </View>
      </ImageBackground>
    </View>
  );
};

export default Service;
