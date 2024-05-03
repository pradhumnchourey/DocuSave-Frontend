// screens/SignUpScreen.js
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { signUp } from "../utils/api";

const SignUpScreen = ({ navigation }) => {
  const [user, setUser] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  const [fieldErrors, setFieldErrors] = useState({
    name: false,
    phoneNumber: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const handleInputChange = (fieldName, value) => {
    setUser({ ...user, [fieldName]: value });
    checkAllFieldsFilled();
    switch (fieldName) {
      case "email":
        setFieldErrors({ ...fieldErrors, email: !validateEmail(value) });
        break;
      case "password":
        setFieldErrors({ ...fieldErrors, password: !validatePassword(value)});
        break;
      case "confirmPassword":
        setFieldErrors({ ...fieldErrors, confirmPassword: value !== user.password });
        break;
      case "phoneNumber":
        setFieldErrors({ ...fieldErrors, phoneNumber: !validatePhoneNumber(value) });
        break;
      default:
        break;
    }
  };
  const checkAllFieldsFilled = () => {
    const filled = Object.values(user).every((value) => value !== "");
    setAllFieldsFilled(filled);
  };

  useEffect(() => {
    checkAllFieldsFilled();
  }, [user]);


  const handleSignUp = async () => {
    if (!allFieldsFilled) {
      Alert.alert("Missing Information", "Please fill in all fields.");
      return;
    }

    if (!validateEmail(user.email)) {
      setFieldErrors({ ...fieldErrors, email: true });
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    } else {
      setFieldErrors({ ...fieldErrors, email: false });
    }

    // Validate password length
    if (!validatePassword(user.password)) {
      setFieldErrors({ ...fieldErrors, password: true });
      if(user.password.length < 6)
        Alert.alert("Password Too Short!");
      else
        Alert.alert("Password must contain a lowercase letter, an uppercase letter, a symbol and a digit.");
      return;
    } else {
      setFieldErrors({ ...fieldErrors, password: false });
    }

    // Validate password match
    if (user.password !== user.confirmPassword) {
      setFieldErrors({ ...fieldErrors, confirmPassword: true });
      Alert.alert("Passwords Don't Match", "Please make sure your passwords match.");
      return;
    } else {
      setFieldErrors({ ...fieldErrors, confirmPassword: false });
    }

    // Validate phone number length
    if (!validatePhoneNumber(user.phoneNumber)) {
      setFieldErrors({ ...fieldErrors, phoneNumber: true });
      Alert.alert("Invalid Phone Number", "Phone number must contain at least 10 digits.");
      return;
    } else {
      setFieldErrors({ ...fieldErrors, phoneNumber: false });
    }
    console.log(user);
    
    try {
      await signUp(user);
      // Reset all fields after successful signup
      setUser({
        name: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      // Navigate to the login screen upon successful sign-up
      navigation.navigate("Login");
    } catch (error) {
      console.error("Sign up failed:", error);
      Alert.alert("Error", "Sign up failed. Please try again later.");

      // Reset all fields
      setUser({
        name: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };
  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    // Regular expression for phone number validation
    const phoneRegex = /^[6-9][0-9]{9}$/;
    return phoneRegex.test(phoneNumber);
  };

  const validatePassword = (password) => {
    // Regular expression for password validation
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/;
    return passwordRegex.test(password);
  };


  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View className="bg-sky-100 h-full w-full">
      <StatusBar style="light" />
      {/**background img */}
      <Image
        className="h-full w-full absolute bottom-40"
        source={require("../../assets/Images/background.png")}
      />

      <View className="flex-row w-full absolute left-5 top-[-20]">
        <Animated.Image
          entering={FadeInUp.delay(200).duration(1000).springify().damping(3)}
          className="h-[190] w-[90]"
          source={require("../../assets/Images/light.png")}
        />
      </View>

      {/* form and heading */}
      <View className="h-full w-full flex justify-around pb-20 mt-5">
        {/* title */}
        <View className="flex items-center mt-10">
          <Animated.Text
            entering={FadeInUp.duration(1000).springify()}
            className="text-white font-bold tracking-wider text-4xl mt-8"
          >
            SignUp
          </Animated.Text>
        </View>

        {/* form */}
        <View className="flex items-center mx-4 space-y-2 pt-40">
          <Animated.View
            entering={FadeInDown.delay(200).duration(1000).springify()}
            className="bg-black/5 p-3 rounded-2xl w-full"
          >
            <TextInput
              className="text-lg"
              placeholder="Name"
              value={user.name}
              onChangeText={(text) => handleInputChange("name", text)}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(300).duration(1000).springify()}
            className={`bg-black/5 p-3 rounded-2xl w-full ${fieldErrors.phoneNumber ? "border border-red-500" : ""}`}
          >
            <TextInput
              className="text-lg"
              placeholder="Phone Number"
              value={user.phoneNumber}
              onChangeText={(text) => handleInputChange("phoneNumber", text)}
              keyboardType="phone-pad"
              maxLength={10}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(400).duration(1000).springify()}
            className={`bg-black/5 p-3 rounded-2xl w-full ${fieldErrors.email ? "border border-red-500" : ""}`}
            // "bg-black/5 p-3 rounded-2xl w-full "
          >
            <TextInput
              className="text-lg"
              placeholder="Email"
              value={user.email}
              onChangeText={(text) => handleInputChange("email", text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(400).duration(1000).springify()}
            className={`bg-black/5 p-3 rounded-2xl w-full ${fieldErrors.password ? "border border-red-500" : ""}`}            
          >
            <TextInput
              className="text-lg"
              placeholder="Password"
              value={user.password}
              onChangeText={(text) => handleInputChange("password", text)}
              secureTextEntry
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(400).duration(1000).springify()}
            className={`bg-black/5 p-3 rounded-2xl w-full ${fieldErrors.confirmPassword ? "border border-red-500" : ""}`}            
          >
            <TextInput
              className="text-lg"
              placeholder="Confirm Password"
              value={user.confirmPassword}
              onChangeText={(text) =>
                handleInputChange("confirmPassword", text)
              }
              secureTextEntry
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(600).duration(1000).springify()}
            className="w-full"
          >
            <TouchableOpacity
              disabled={!allFieldsFilled}
              className={`w-full bg-sky-400 p-3 rounded-2xl mb-3 ${
                !allFieldsFilled ? "opacity-50" : ""
              }`}
            >
              <Text
                className="text-xl font-bold text-white text-center"
                onPress={handleSignUp}
              >
                SignUp
              </Text>
            </TouchableOpacity>
          </Animated.View>
          <View className="flex-row justify-center">
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={navigateToLogin}>
              <Text className="text-sky-600">Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;
