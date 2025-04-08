import { View } from "react-native";
//Style
import styles from "./assets/style/App.style";
//Page
import Navigator from "./src/navigation/navigation";

const App = () => {
  return (
    <View style={styles.container}>
      <Navigator/>
    </View>
  );
};

export default App;
