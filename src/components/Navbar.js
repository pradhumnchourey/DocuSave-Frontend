import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Navbar = ({ navigation }) => {
  const handleLogout = () => {
    // Clear user authentication state (example: clear token from AsyncStorage)
    AsyncStorage.removeItem("authToken")
      .then(() => {
        // Navigate to the login screen (example: using React Navigation)
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
    // navigation.navigate("Login"); // for testing purposes
    console.log("Logout pressed");
  };

  return (
    <View className="flex-row items-center justify-between p-4 mt-10">
      <Text className="font-bold text-3xl shadow-sm">DocuSave</Text>
      <TouchableOpacity
        onPress={handleLogout}
        className="p-2 px-3 bg-white border border-gray-200 rounded-full"
      >
        <Text className>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;
