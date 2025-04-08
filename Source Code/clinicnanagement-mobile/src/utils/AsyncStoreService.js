import AsyncStorage from "@react-native-async-storage/async-storage";

export const _storeData = async (Key, value) => {
    try {
        await AsyncStorage.setItem(Key, value);
        return true;
    } catch (error) {
        console.log(error);
        // Error saving data
    }
}
export const _retrieveData = async (Key) => {
    try {
        const value = await AsyncStorage.getItem(Key);
        if (value !== null) {
            // Our data is fetched successfully
            return value;
        }
    } catch (error) {
        console.log(error);
        // Error retrieving data
    }
}