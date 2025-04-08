import { StyleSheet, TouchableOpacity, Image, View } from "react-native";
import React, { useEffect, useRef } from "react";
import Home from "../screens/Home/Home";
import Chat from "../screens/Home/Chat";
import Profile from "../screens/Auth/Profile";
import Appointment from "../screens/Home/Appointment";
import Service from "../screens/Home/Service";
import Prevention from "../screens/Home/Prevention";
import CameraApp from "../screens/Home/CameraApp";
import ImgHome from "../assets/images/Home.png";
import ImgService from "../assets/images/ServiceList.png";
import ImgCamera from "../assets/images/Face-detection.png";
import ImgAppointment from "../assets/images/Calender.png";
import ImgChat from "../assets/images/User.png";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Animatable from "react-native-animatable";
const Tab = createBottomTabNavigator();

const TabArr = [
  { route: "Home", label: "Home", source: ImgHome, component: Home },
  {
    route: "Prevention",
    label: "Service",
    source: ImgService,
    component: Prevention,
    display: "none",
  },
  {
    route: "CameraApp",
    label: "Camera",
    source: ImgCamera,
    component: CameraApp,
    display: "none",
  },
  {
    route: "Appointment",
    label: "Appointment",
    source: ImgAppointment,
    component: Appointment,
  },
  { route: "Profile", label: "Profile", source: ImgChat, component: Profile , display: "none",},
];

const animate1 = {
  0: { scale: 0.5, translateY: 7 },
  0.92: { translateY: -34 },
  1: { scale: 1.2, translateY: -24 },
};
const animate2 = {
  0: { scale: 1.2, translateY: -24 },
  1: { scale: 1, translateY: 7 },
};

const circle1 = {
  0: { scale: 0 },
  0.3: { scale: 0.9 },
  0.5: { scale: 0.2 },
  0.8: { scale: 0.7 },
  1: { scale: 1 },
};
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } };

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      textRef.current.transitionTo({ scale: 1 });
    } else {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
      textRef.current.transitionTo({ scale: 0 });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}
    >
      <Animatable.View ref={viewRef} duration={1000} style={styles.container}>
        <View style={styles.btn}>
          <Animatable.View ref={circleRef} style={styles.circle} />
          <Image
            source={item.source}
            style={{ width: 25, height: 25 }}
            resizeMode="stretch"
          />
        </View>
        <Animatable.Text ref={textRef} style={styles.text}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};

const BottomTab = () => {
  return (
    
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: [styles.tabBar],
      }}
    >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarStyle: [styles.tabBar, {display:item.display}],
              tabBarButton: (props) => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default BottomTab;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBar: {
    height: 70,
    position: "absolute",
    bottom: 16,
    right: 14,
    left: 14,
    borderRadius: 20,
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: "white",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
    borderRadius: 25,
  },
  text: {
    fontSize: 10,
    textAlign: "center",
    color: "blue",
  },
});
