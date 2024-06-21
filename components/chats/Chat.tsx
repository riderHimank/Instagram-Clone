import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ChatType } from "@/app/chats";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";
import { UserType } from "../Auth/SignUp";
import { Image } from "react-native";
import { router } from "expo-router";

const Chat = (props: { key: number; data: ChatType }) => {
  const user = auth.currentUser;
  const sender =
    props.data.people[0] === user?.uid
      ? props.data.people[0]
      : props.data.people[1];
  const q = query(collection(db, "users"), where("uid", "==", sender));

  const [chatRec, setChatRec] = useState<UserType | null>(null);

  getDocs(q).then((s) => {
    s.forEach((doc) => {
      setChatRec(doc.data() as UserType);
    });
  });

  return (
    <Pressable
      onPress={() => {
        router.push(`/chat/${props.data.cid}`);
      }}
    >
      <View
        style={{
          width: "100%",
          marginHorizontal: 10,
          height: 70,
          alignItems: "center",
          flexDirection: "row",
          backgroundColor: "rgba(0,0,0,0.5)",
          borderBottomWidth: 1,
          borderColor: "grey",
        }}
      >
        <Image
          source={{
            uri: chatRec?.profilePic,
          }}
          style={styles.avatar}
        />
        <View>
          <Text
            style={[
              styles.textStyles,
              {
                fontSize: 20,
                fontWeight: "500",
              },
            ]}
          >
            {chatRec?.username}
          </Text>
          <Text style={styles.textStyles}>{props.data.lastmessage}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Chat;

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#ff8501",
    marginHorizontal: 10,
  },
  textStyles: {
    color: "#fff",
  },
});
