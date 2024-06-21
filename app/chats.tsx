import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { auth, db } from "@/firebase/firebase";
import {
  FieldValue,
  collection,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import Chat from "@/components/chats/Chat";

export type ChatType = {
  cid: string;
  people: string[];
  createdAt: FieldValue;
  lastmessage: string;
};

const Chatlist = () => {
  const [chats, setChats] = useState<ChatType[]>([]);

  const fetchChats = async () => {
    const user = auth.currentUser;
    const q = query(
      collection(db, "chats"),
      where("people", "array-contains", user?.uid)
    );
    getDocs(q)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setChats((prev) => [
            ...prev,
            {
              cid: doc.data().cid,
              people: doc.data().people,
              createdAt: doc.data().createdAt,
              lastmessage: doc.data().lastmessage,
            },
          ]);
        });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <FontAwesomeIcon icon={faChevronLeft} size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.textStyles}>CHATS</Text>
      </View>
      {/* Chats */}
      <ScrollView>
        {chats.map((chat, index) => (
          <Chat key={index} data={chat} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Chatlist;

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
