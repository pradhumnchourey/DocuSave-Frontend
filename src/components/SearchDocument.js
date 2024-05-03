import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

const SearchDocument = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
    setSearchQuery("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search documents"
        placeholderTextColor="rgb(23 37 84)"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        onSubmitEditing={handleSearch}
        className=" border-b-2 border-sky-950 h-10"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Translucent background for search bar
  },
  input: {
    flex: 1,
    // height: 40,
    // borderBottomWidth: 2,
    // borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});

export default SearchDocument;
