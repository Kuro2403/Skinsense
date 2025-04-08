import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScreenWelcome from "../components/screens/ScreenWelcome";
import Login from "../screens/Auth/Login"
import Register from "../screens/Auth/Register";
import BottomTab from "./BottomTab";
import RegisterVerifi from "../screens/Auth/RegisterVerifi";
import ForgotPass from "../screens/Auth/ForgotPass";
import Verification from "../screens/Auth/Verification"
import ResetPass from "../screens/Auth/ResetPass";
import Medical from "../screens/Home/Medical";
import ListAcne from "../screens/Home/ListAcne";
import CauseAcne from "../screens/Home/CauseAcne";
import Prevention from "../screens/Home/Prevention";
import Nodules from "../screens/ListofAnce/Nodules";
import Cyst from "../screens/ListofAnce/Cyst";
import Pustules from "../screens/ListofAnce/Pustules";
import Papules from "../screens/ListofAnce/Papules";
import Blackheads from "../screens/ListofAnce/Blackheads";
import Whiteheads from "../screens/ListofAnce/Whiteheads";
import Invoice from "../screens/Home/Invoice";
import Detailinvoice from "../screens/Home/Detailinvoice";
import CreateAppoiment from "../screens/Home/CreateAppoiment";
import DetailMedical from "../screens/Home/DetailMedical";
import DetailAppointment from "../screens/Home/DetailAppointment";
import Profile from "../screens/Auth/Profile";
import EditProfile from "../screens/Auth/EditProfile";
import CameraApp from "../screens/Home/CameraApp";
import ChangNewPass from "../screens/Auth/ChangNewPass";
import ChangeAnEmail from "../screens/Auth/ChangeAnEmail";
import News from "../screens/Home/news";
import DetailNews from "../screens/Home/deatailNews";
import HomeDoctor from "../screens/Doctor/HomeDoctor";
import AppointmentDoctor from "../screens/Doctor/AppointmentDoctor";
import ExaminedDoctor from "../screens/Doctor/ExaminedDoctor";
import Medicalrecord from "../screens/Doctor/Medicalrecord";
import MedicalreportDoctor from "../screens/Doctor/MedicalreportDoctor";
const Stack = createNativeStackNavigator();
const Navigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator
          initialRouteName="ScreenWelcome"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="ScreenWelcome" component={ScreenWelcome}/>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="RegisterVerifi" component={RegisterVerifi} />
          <Stack.Screen name="ForgotPass" component={ForgotPass} />
          <Stack.Screen name="Verification" component={Verification} />
          <Stack.Screen name="ResetPass" component={ResetPass} />
          <Stack.Screen name="Medical" component={Medical} />
          <Stack.Screen name="ListAcne" component={ListAcne} />
          <Stack.Screen name="CauseAcne" component={CauseAcne} />
          <Stack.Screen name="Prevention" component={Prevention} />
          <Stack.Screen name="Nodules" component={Nodules} />
          <Stack.Screen name="Cyst" component={Cyst} />
          <Stack.Screen name="Pustules" component={Pustules} />
          <Stack.Screen name="Papules" component={Papules} />
          <Stack.Screen name="Blackheads" component={Blackheads} />
          <Stack.Screen name="Whiteheads" component={Whiteheads} />
          <Stack.Screen name="Invoice" component={Invoice} />
          <Stack.Screen name="Detailinvoice" component={Detailinvoice} />
          <Stack.Screen name="CreateAppoiment" component={CreateAppoiment} />
          <Stack.Screen name="DetailMedical" component={DetailMedical} />
          <Stack.Screen name="DetailAppointment" component={DetailAppointment} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="CameraApp" component={CameraApp} />
          <Stack.Screen name="ChangNewPass" component={ChangNewPass} />
          <Stack.Screen name="ChangeAnEmail" component={ChangeAnEmail} />
          <Stack.Screen name="News" component={News}/>
          <Stack.Screen name="DetailNews" component={DetailNews}/>
          <Stack.Screen name="HomeDoctor" component={HomeDoctor}/>
          <Stack.Screen name="AppointmentDoctor" component={AppointmentDoctor}/>
          <Stack.Screen name="ExaminedDoctor" component={ExaminedDoctor}/>
          <Stack.Screen name="Medicalrecord" component={Medicalrecord}/>
          <Stack.Screen name="MedicalreportDoctor" component={MedicalreportDoctor}/>
          <Stack.Screen name="MyTabs" component={BottomTab}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
};
export default Navigator;