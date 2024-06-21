import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import users from "../../assets/data/data";

const Stories = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {users?.map((user, index) => (
          <View key={index} style={styles.avatarContainer}>
            <TouchableWithoutFeedback>
              <Image source={{ uri: user?.image }} style={styles.avatar} />
            </TouchableWithoutFeedback>
            <Text style={styles.userName}>
              {user.username.length > 10
                ? user.username.slice(0, 7) + "..."
                : user.username}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Stories;

const styles = StyleSheet.create({
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#ff8501",
  },
  avatarContainer: {
    alignItems: "center",
    margin: 5,
    gap: 5,
  },
  container: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  textStyles: {
    color: "#fff",
  },
  userName: {
    maxWidth: 70,
    color: "#fff",
    textAlign: "center",
  },
});
