import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL = "http://192.168.29.43:8080"; // backend URL

const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email,
      password,
    });
    console.log("response of login: ", response.data);

    const user = response.data; // Assuming the server returns a user upon successful login
    await AsyncStorage.setItem("user", JSON.stringify(user)); // Store the token using AsyncStorage
    // Optionally, you can also store other user information such as name or email
    // await AsyncStorage.setItem("user", JSON.stringify(response.data));
    return true;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

const signUp = async (user) => {
  try {
    const response = await axios.post(`${BASE_URL}/SignUpForm`, user);
    // Optionally, handle response data if needed
    console.log("Sign up response:", response.data);
  } catch (error) {
    console.error("Sign up failed:", error);
    throw error;
  }
};

const uploadDocument = async (docName, docType, docUri) => {
  const userId = await fetchUserId();
  console.log("in uploadDocument");
  const data = {
    docName: docName,
    docType: docType,
    docUri: docUri,
    userId: userId,
  };
  try {
    const response = await axios.post(`${BASE_URL}/upload`, data);
    console.log("Document uploaded");
    console.log("Upload response: ", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getDocumentList = async () => {
  const userId = await fetchUserId();
  const response = await axios.get(`${BASE_URL}/documents/${userId}`);
  // console.log(response.data[0]);
  return response.data;
  // Just for fun
  // return [
  //   { docId: 1, docName: "Document 1", docType: "PDF" },
  //   { docId: 2, docName: "Document 2", docType: "PDF" },
  //   { docId: 3, docName: "Document 3", docType: "PDF" },
  //   { docId: 4, docName: "Document 1", docType: "PDF" },
  //   { docId: 5, docName: "Document 2", docType: "PDF" },
  //   { docId: 6, docName: "Document 3", docType: "PDF" },
  //   { docId: 7, docName: "Document 1", docType: "PDF" },
  //   { docId: 8, docName: "Document 2", docType: "PDF" },
  //   { docId: 9, docName: "Document 3", docType: "PDF" },
  // ];
};

const fetchUserId = async () => {
  try {
    const storedData = await AsyncStorage.getItem("user"); // Replace 'key' with the key you used while storing the data
    if (storedData !== null) {
      const dataObj = JSON.parse(storedData);
      const userId = parseInt(dataObj.userId, 10);
      return userId;
    }
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

const deleteDocument = async (docId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/documents/${docId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { deleteDocument, getDocumentList, login, signUp, uploadDocument };
