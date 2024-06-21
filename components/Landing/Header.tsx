import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";

const onSignOut = async () => {
  try {
    router.push("/signin");
    await signOut(auth);
    Alert.alert("Account Signed Out.");
  } catch (error: any) {
    Alert.alert(error.message);
  }
};

const Header = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={onSignOut}>
        <Image
          style={styles.logo}
          source={require("../../assets/images/header-logo.png")}
        />
      </TouchableOpacity>
      <View style={styles.icons}>
        <TouchableOpacity>
          <FontAwesomeIcon size={25} icon={faHeart} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/chats")}>
          <View style={styles.unReadBadge}>
            <Text style={styles.unReadText}>3</Text>
          </View>
          <FontAwesomeIcon size={25} icon={faFacebookMessenger} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    color: "#fff",
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#000",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icons: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 20,
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: "cover",
  },
  textStyles: {
    color: "#fff",
  },
  unReadBadge: {
    backgroundColor: "#e41c1c",
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    width: 20,
    height: 18,
    borderRadius: 8,
    position: "absolute",
    top: -8,
    right: -8,
    zIndex: 2,
  },
  unReadText: {
    flex: 1,
    color: "#fff",
  },
});

export default Header;
