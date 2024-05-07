import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import Navbar from "../components/Navbar";

const BASE_URL = "http://192.168.29.43:8080"; // backend URL

const HomeCategoryScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchUserName();
    fetchCategories();
  }, []);

  const fetchUserName = async () => {
    try {
      const storedData = await AsyncStorage.getItem("user");
      if (storedData !== null) {
        const dataObj = JSON.parse(storedData);
        const userName = dataObj.userName;
        setUserName(userName);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const fetchCategories = async() =>{
    try{
      const response = await axios.get(`${BASE_URL}/home`);
      if(response.status===200){
        const categoriesData = response.data.map((category) => ({
          ...category,
          imageUrl: getCategoryImageUrl(category.categoryId), // Add imageUrl property
        }));
        setCategories(categoriesData);
        await AsyncStorage.setItem("categories", JSON.stringify(categoriesData)); // Store categories in AsyncStorage
        // console.log("Categories:", categoriesData);
      }
      else{
        console.log("Failed to fetch categories");
      }
    }
    catch(error){
      console.error("Error fetching categories:", error);
    }
  }
  const getCategoryImageUrl = (categoryId) => {
    switch (categoryId) {
      case 1:
        return require("../../assets/Images/1.png");
      case 2:
        return require("../../assets/Images/2.png");
      case 3:
        return require("../../assets/Images/3.png");
      case 4:
        return require("../../assets/Images/4.png");
      default:
        return require("../../assets/Images/default.png");
    }
  };

  return (
    <View className="flex-1 ">
      <Navbar navigation={navigation} />
      <View className="justify-center items-center bg-blue-200 rounded-xl mx-4 mb-4">
        <Image
          source={require("../../assets/Images/banner.png")}
          className="w-80 h-80"
        />
        <Text className="font-bold text-2xl shadow-sm mb-5">Welcome {userName}!</Text>
      </View>
      <View className="px-4 space-y-5">
        <View className="flex-row justify-between items-center">
          <Text className="font-bold text-xl shadow-sm">Category</Text>
          <TouchableOpacity className="p-2 px-3 bg-white border border-gray-200 rounded-full">
            <Text>Add Category</Text>
          </TouchableOpacity>
        </View>
        {/* <ScrollView horizontal={true}> */}
          {/* <View> */}
          <FlatList
            horizontal={true}
            data={categories}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.categoryId}
            className="mx-2"
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  className="bg-blue-100 p-3 rounded-2xl mb-3 mx-2 "
                  onPress={() => {
                    navigation.navigate("DocumentList", {
                      categoryId: item.categoryId, 
                      categoryName: item.categoryName});
                  }}
                >
                  <View>
                    <Image source={item.imageUrl} className="w-36 h-36" />
                    <Text className="font-bold ">{item.categoryName}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
          {/* </View> */}
        {/* </ScrollView> */}
      </View>
    </View>
  );
};

export default HomeCategoryScreen;
