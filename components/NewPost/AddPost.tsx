import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { router } from "expo-router";

const AddPost = () => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
      >
        <FontAwesomeIcon icon={faChevronLeft} size={30} color="white" />
      </TouchableOpacity>
      <Text style={styles.textStyles}>NEW POST</Text>
    </View>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  textStyles: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "black",
  },
});
