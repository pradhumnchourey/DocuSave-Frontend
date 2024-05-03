import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AddDocumentScreen from "./AddDocumentScreen";
import AuthLoadingScreen from "./AuthLoadingScreen";
import DocumentListScreen from "./DocumentListScreen";
import HomeCategoryScreen from "./HomeCategoryScreen";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AuthLoading"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeCategoryScreen} />
        <Stack.Screen
          name="DocumentList"
          component={DocumentListScreen}
          options={{
            headerShown: true,
            title: "All Categories",
            headerStyle: {
              backgroundColor: "rgb(219 234 254)",
              borderBottomWidth: 1,
              borderBottomColor: "rgb(23 37 84)",
            },
          }}
        />
        <Stack.Screen
          name="DocumentUpload"
          component={AddDocumentScreen}
          options={{ headerShown: true, title: "View Documents" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
