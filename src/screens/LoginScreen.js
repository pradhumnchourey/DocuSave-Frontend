// screens/LoginScreen.js
import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { login } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-gesture-handler";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleEmailFocus = () => setEmailFocused(true);
  const handleEmailBlur = () => setEmailFocused(false);
  const handlePasswordFocus = () => setPasswordFocused(true);
  const handlePasswordBlur = () => setPasswordFocused(false);

  const handleLogin = async () => {
    console.log(email, password);

    try {
      const token = await login(email, password);
      await AsyncStorage.setItem("token", JSON.stringify(token));
      navigation.replace("AuthLoading");
    } catch (error) {
      console.error("Login failed:", error);
      Alert.alert(
        "Login Failed",
        "Please check your email and password and try again."
      );
      setEmail("");
      setPassword("");
    }
  };

  const navigateToSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View className="bg-white h-full w-full">
      <StatusBar style="light" />
      {/**background img */}
      <Image
        className="h-full w-full absolute bottom-20"
        source={require("../../assets/Images/background.png")}
      />
      {/* lamps */}
      <View className="flex-row justify-around w-full absolute">
        <Animated.Image
          entering={FadeInUp.delay(200).duration(1000).springify().damping(3)}
          className="h-[225] w-[90]"
          source={require("../../assets/Images/light.png")}
        />
        <Animated.Image
          entering={FadeInUp.delay(400).duration(1000).springify().damping(3)}
          className="h-[160] w-[65]"
          source={require("../../assets/Images/light.png")}
        />
      </View>
      {/* form and heading */}
      <View className="h-full w-full flex justify-around  pb-10 mt-5">
        {/* title */}
        <View className="flex items-center">
          <Animated.Text
            entering={FadeInUp.duration(1000).springify()}
            className="text-white font-bold tracking-wider text-4xl"
          >
            Login
          </Animated.Text>
        </View>
        {/* form */}
        <View className="flex items-center mx-4 space-y-4">
          <Animated.View
            entering={FadeInDown.delay(200).duration(1000).springify()}
            className={`bg-black/5 p-5 rounded-2xl w-full ${
              emailFocused ? "bg-sky-200" : ""
            }`}
          >
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(value) => setEmail(value)}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="grey"
              onFocus={handleEmailFocus}
              onBlur={handleEmailBlur}
              className="text-lg"
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(400).duration(1000).springify()}
            className={`bg-black/5 p-5 rounded-2xl w-full mb-3 ${
              passwordFocused ? "bg-sky-200" : ""
            }`}
          >
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={(value) => setPassword(value)}
              secureTextEntry
              placeholderTextColor="grey"
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
              className="text-lg"
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(600).duration(1000).springify()}
            className="w-full"
          >
            <TouchableOpacity className="w-full bg-sky-400 p-3 rounded-2xl mb-3">
              <Text
                className="text-xl font-bold text-white text-center"
                onPress={handleLogin}
              >
                Login
              </Text>
            </TouchableOpacity>
          </Animated.View>
          <View className="flex-row justify-center">
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={navigateToSignUp}>
              <Text className="text-sky-600">Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
