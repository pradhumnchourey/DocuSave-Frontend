import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import Navbar from "../components/Navbar";

const items = [
  {
    id: 1,
    type: "Identity Docs",
    image: require("../../assets/Images/1.png"),
  },
  {
    id: 2,
    type: "Finance Docs",
    image: require("../../assets/Images/2.png"),
  },
  {
    id: 3,
    type: "Education Docs",
    image: require("../../assets/Images/3.png"),
  },
  {
    id: 4,
    type: "Legal Docs",
    image: require("../../assets/Images/4.png"),
  },
];

const HomeCategoryScreen = ({ navigation }) => {
  return (
    <View className="flex-1 ">
      <Navbar navigation={navigation}/>
      <View className="justify-center items-center bg-blue-200 rounded-xl mx-4 mb-4">
        <Image
          source={require("../../assets/Images/banner.png")}
          className="w-80 h-80"
        />
      </View>
      <View className="px-4 space-y-5">
        <View className="flex-row justify-between items-center">
          <Text className="font-bold text-xl shadow-sm">Category</Text>
          <TouchableOpacity className="p-2 px-3 bg-white border border-gray-200 rounded-full">
            <Text>Add Category</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={items}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            columnWrapperStyle={{
              justifyContent: "space-evenly",
            }}
            className="mx-2"
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  className="bg-blue-100 p-3 rounded-2xl mb-3 mx-2 "
                  onPress={() => {
                    navigation.navigate("DocumentList", {});
                  }}
                >
                  <View>
                    <Image source={item.image} className="w-36 h-36" />
                    <Text className="font-bold ">{item.type}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeCategoryScreen;
