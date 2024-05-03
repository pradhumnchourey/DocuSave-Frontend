import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  BackHandler,
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import HomeIcons from "../components/HomeIcons";
import ListOptions from "../components/ListOptions";
import SearchDocument from "../components/SearchDocument";
import { getDocumentList } from "../utils/api";

const DocumentListScreen = ({ navigation }) => {
  const [documentList, setDocumentList] = useState([]);
  const [filteredDocumentList, setFilteredDocumentList] = useState([]);
  const [isListEmpty, setIsListEmpty] = useState(true);
  const [expandedItems, setExpandedItems] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    fetchDocumentList();
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );
    return () => backHandler.remove();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      refreshPage();
      return () => {};
    }, [])
  );

  const refreshPage = () => {
    // Implement your refresh logic here
    fetchDocumentList();
    console.log("Page refreshed");
  };

  const toggleExpanded = (index) => {
    const newExpandedItems = [...expandedItems];
    newExpandedItems[index] = !newExpandedItems[index];
    setExpandedItems(newExpandedItems);
    console.log("index: ", expandedItems[index]);
  };

  const closeDropdowns = () => {
    setExpandedItems(new Array(expandedItems.length).fill(false));
  };

  const fetchDocumentList = async () => {
    try {
      const response = await getDocumentList(); // Make API call to fetch document list
      setDocumentList(response); // Store the document list in state
      setFilteredDocumentList(response);
    } catch (error) {
      console.error("Error fetching document list:", error);
      // Handle error, e.g., show an error message
    }
  };

  const handleBackPress = () => {
    fetchDocumentList();
    // console.log(documentList);
    setFilteredDocumentList(documentList); // Reset to show all documents
    setIsListEmpty(true);
    return true; // Prevent default back button behavior
  };

  const handleToggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearch = (query) => {
    const filteredDocuments = documentList.filter((doc) =>
      doc.docName.toLowerCase().includes(query.toLowerCase())
    );
    if (filteredDocuments.length !== 0) {
      setFilteredDocumentList(filteredDocuments);
    }
    else{
      setIsListEmpty(false);
    }
    handleToggleSearch();
  };

  return (
    <View className="flex-1">
      <StatusBar style="light" />
      {/* <Image
        className="h-full w-full absolute"
        source={require("../../assets/Images/bg-doc.jpg")}
      /> */}
      <View className="p-7  flex-row bg-sky-400 justify-center">
        <Text className=" font-bold text-3xl shadow-sm ">
          Identity documents
        </Text>
      </View>

      {isSearchOpen && <SearchDocument onSearch={handleSearch} />}
      {!(isListEmpty) && <View className="flex-1 justify-center items-center p-5 mt-5 "> 
      <Text className="text-2xl font-bold text-sky-950">Oops! No Documents Found.</Text>
      </View>}
      {/**list of docs */}
      {(isListEmpty) &&  
      <View className="flex-1 p-5 mt-5 ">
        <FlatList
          data={filteredDocumentList}
          keyExtractor={(item) => item.docId.toString()}
          renderItem={({ item, index }) => (
            <View className="mb-4 border-b-2 border-slate-400">
              <TouchableOpacity onPress={() => toggleExpanded(index)}>
                <View className="flex flex-row justify-between items-center h-14 ">
                  <Text className="text-lg font-bold text-sky-950">
                    {item.docName}
                  </Text>
                  {/* <Text className="text-base">{item.docType}</Text> */}
                  <MaterialIcons
                    name={
                      expandedItems[index]
                        ? "keyboard-arrow-up"
                        : "keyboard-arrow-down"
                    }
                    size={30}
                    color="rgb(8 47 73)"
                  />
                </View>
              </TouchableOpacity>
              {expandedItems[index] && (
                <ListOptions docId={item.docId} uri={item.docUri.toString()} refreshPage={refreshPage}/>
              )}
            </View>
          )}
        />
      </View>
      }
      <HomeIcons
        handleToggleSearch={handleToggleSearch}
        navigation={navigation}
      />
    </View>
  );
};

export default DocumentListScreen;
