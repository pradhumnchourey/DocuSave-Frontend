import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { deleteDocument } from "../utils/api";

const ListOptions = ({ docId, uri, refreshPage }) => {
  const openPDF = async () => {
    // const uri =
    //   "file:///data/user/0/host.exp.exponent/cache/DocumentPicker/ad747021-2359-4b42-960c-2010d39a1c8a.pdf";

    try {
      console.log("in view", uri);
      const cUri = await FileSystem.getContentUriAsync(uri);

      await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
        data: cUri,
        flags: 1,
        type: "*/*",
      });
    } catch (e) {
      console.log("Reading Error", e.message);
    }
  };

  const handleDeleteDocument = async (docId) => {
    // Display an alert to confirm deletion
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this document?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              // Call the deleteDocument function from api.js to send the delete request
              await deleteDocument(docId);
              // Refresh the document list after successful deletion (you can implement this based on your data fetching logic)
              // setShowDropdown(false); // Close dropdown after deletion
              refreshPage();
            } catch (error) {
              console.error("Error deleting document:", error);
              // Handle error, e.g., show an error message
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View className="flex-row pb-2">
      <TouchableOpacity
        style={styles.option}
        onPress={() => openPDF()}
        className="border-cyan-800"
      >
        <Text className="text-sky-600 text-base font-bold ">View</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.option}
        onPress={() => handleDeleteDocument(docId)}
        className="border-red-600"
      >
        <Text className="text-sky-600 text-base font-bold">Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  option: {
    height: 35,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default ListOptions;
