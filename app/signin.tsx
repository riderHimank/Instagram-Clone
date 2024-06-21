import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SignInForm from "@/components/Auth/SignIn";
import SignUpForm from "@/components/Auth/SignUp";

const auth = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SignInForm />
    </SafeAreaView>
  );
};

export default auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "#fff",
    width: "100%",
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
});
