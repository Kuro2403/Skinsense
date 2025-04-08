import { View, Text ,Image} from "react-native";
import React from "react";
import { responsiveScreenFontSize } from "react-native-responsive-dimensions";
const ServiceCommon = (props) => {
  return (
    <View
      style={{
        backgroundColor: "#F5F5F5",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        height: 110,
        borderRadius: 25,
        marginHorizontal: 12,
        shadowColor: "#000000",
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
      }}
    >
      <Image source={props.imgUri} style={{ height: 50, width: 50 }}></Image>
      <Text
        style={{
          fontSize: responsiveScreenFontSize(1.6),
          paddingTop: 5,
          fontWeight: "bold",
        }}
      >
        {props.name}
      </Text>
    </View>
  );
};

export default ServiceCommon;
