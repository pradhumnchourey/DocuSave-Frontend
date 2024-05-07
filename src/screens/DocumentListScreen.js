import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  BackHandler,
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import HomeIcons from "../components/HomeIcons";
import ListOptions from "../components/ListOptions";
import SearchDocument from "../components/SearchDocument";
import { getDocumentList } from "../utils/api";

const DocumentListScreen = ({ navigation, route }) => {
  const {categoryId, categoryName}=route.params;
  const [documentList, setDocumentList] = useState([]);
  const [filteredDocumentList, setFilteredDocumentList] = useState([]);
  const [isListEmpty, setIsListEmpty] = useState(true);
  const [expandedItems, setExpandedItems] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("all"); // Initialize with a default value
  const [isAllDocsEnabled, setAllDocsEnabled] = useState(false);
  const [isPdfEnabled, setPdfEnabled] = useState(false);
  const [isWordEnabled, setWordEnabled] = useState(false);
  const [isExcelEnabled, setExcelEnabled] = useState(false);
  const [isPptEnabled, setPptEnabled] = useState(false);

  useEffect(() => {
    refreshPage();
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );
    return () => backHandler.remove();
  }, [selectedType]);

  useFocusEffect(
    React.useCallback(() => {
      refreshPage();
      return () => {};
    }, [])
  );

  const refreshPage = () => {
    // Implement your refresh logic here
    fetchDocumentList(selectedType);
    console.log("Page refreshed");
  };

  const toggleExpanded = (index) => {
    const newExpandedItems = [...expandedItems];
    newExpandedItems[index] = !newExpandedItems[index];
    setExpandedItems(newExpandedItems);
    console.log("index: ", expandedItems[index]);
  };

  // const closeDropdowns = () => {
  //   setExpandedItems(new Array(expandedItems.length).fill(false));
  // };

  const fetchDocumentList = async (type) => {
    try {
      const response = await getDocumentList(categoryId, type); // Make API call to fetch document list
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
    } else {
      setIsListEmpty(false);
    }
    handleToggleSearch();
  };

  const filterDocuments = (type) => { 
    const filteredDocuments = documentList.filter((doc) => doc.docType === type);
    if (filteredDocuments.length !== 0) {
      setFilteredDocumentList(filteredDocuments);
    } else {
      setIsListEmpty(false);
    }
    // setFilteredDocumentList(filteredDocuments);
    // setIsListEmpty(filteredDocuments.length === 0);
  };

  const toggleEnabledButton = (type) =>{
    switch(type){
      case "all":
        setExcelEnabled(false);
        setPdfEnabled(false);
        setWordEnabled(false);
        setPptEnabled(false);
        break;
      case "pdf":
        setAllDocsEnabled(false);
        setExcelEnabled(false);
        setWordEnabled(false);
        setPptEnabled(false);
        break;
      case "excel":
        setAllDocsEnabled(false);
        setPdfEnabled(false);
        setWordEnabled(false);
        setPptEnabled(false);
        break;
      case "word":
        setAllDocsEnabled(false);
        setExcelEnabled(false);
        setPdfEnabled(false);
        setPptEnabled(false);
        break;
      case "ppt":
        setAllDocsEnabled(false);
        setExcelEnabled(false);
        setWordEnabled(false);
        setPdfEnabled(false);
        break;
    }
  };

  const CustomButton = ({ onPress, isEnabled, label }) => (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          backgroundColor: isEnabled ? '#5555' : '#FFFFFF',
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: '#666666',
        }}
      >
        <Text style={{ color: '#000000' }}>{label}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1">
      <StatusBar style="light" />
      <View className="p-7  flex-row bg-blue-100 justify-center">
        <Text className=" font-bold text-3xl shadow-sm ">
          {categoryName}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, marginHorizontal: 10 }}>
        <CustomButton
          onPress={() => {
            setSelectedType("all");
            setAllDocsEnabled(true);
            toggleEnabledButton("all");
            fetchDocumentList(selectedType);
          }}
          isEnabled={isAllDocsEnabled}
          label="All Docs"
        />
        <CustomButton
          onPress={async () => {
            await setSelectedType("application/pdf");
            fetchDocumentList(selectedType);
            setPdfEnabled(true);
            toggleEnabledButton("pdf");
          }}
          isEnabled={isPdfEnabled}
          label="PDF"
        />
        <CustomButton
          onPress={async () => {
            await setSelectedType("application/vnd.openxmlformats-officedocument.wordprocessingml.document");
            fetchDocumentList(selectedType);
            setWordEnabled(true);
            toggleEnabledButton("word");
          }}
          isEnabled={isWordEnabled}
          label="Word"
        />
        <CustomButton
          onPress={async () => {
            await setSelectedType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            fetchDocumentList(selectedType);
            setExcelEnabled(true);
            toggleEnabledButton("excel");
          }}
          isEnabled={isExcelEnabled}
          label="Excel"
        />
        <CustomButton
          onPress={async () => {
            await setSelectedType("application/vnd.openxmlformats-officedocument.presentationml.presentation");
            fetchDocumentList(selectedType);
            setPptEnabled(true);
            toggleEnabledButton("ppt");
          }}
          isEnabled={isPptEnabled}
          label="PPT"
        />
      </View>
      {isSearchOpen && <SearchDocument onSearch={handleSearch} />}
      {!isListEmpty && (
        <View className="flex-1 justify-center items-center p-5 mt-5 ">
          <Text className="text-2xl font-bold text-sky-950">
            No Documents Found.
          </Text>
        </View>
      )}
      {/**list of docs */}
      {isListEmpty && (
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
                  <ListOptions
                    docId={item.docId}
                    uri={item.docUri.toString()}
                    refreshPage={refreshPage}
                  />
                )}
              </View>
            )}
          />
        </View>
      )}
      <HomeIcons
        handleToggleSearch={handleToggleSearch}
        navigation={navigation}
        categoryId={categoryId}
        categoryName={categoryName}
      />
    </View>
  );
};

export default DocumentListScreen;
