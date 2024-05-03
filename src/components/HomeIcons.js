import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const HomeIcons = ({ handleToggleSearch, navigation }) => {
  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity
        style={styles.icon}
        onPress={() => navigation.navigate("DocumentUpload")}
      >
        <MaterialIcons name="add" size={26} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.icon}
        onPress={handleToggleSearch} // Toggle search bar
      >
        <MaterialIcons name="search" size={26} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: "absolute",
    bottom: 25,
    right: 25,
    flexDirection: "column",
  },
  icon: {
    marginVertical: 5, // Adjust the vertical distance between icons
    backgroundColor: "rgb(56 189 248)", // White background color
    borderRadius: 50, // Make the border radius half of the width/height to create a circle
    width: 50, // Width of the icon container
    height: 50, // Height of the icon container
    justifyContent: "center",
    alignItems: "center",
    elevation: 3, // Add elevation to make the icon container appear on top of other elements
  },
});

export default HomeIcons;
