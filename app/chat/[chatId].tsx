import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FieldValue,
  collection,
  collectionGroup,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db, auth } from "@/firebase/firebase";

export type MessageType = {
  content: string;
  sender: string;
  createdAt: FieldValue;
};

const Personal = () => {
  const { chatId } = useLocalSearchParams();

  const [messages, setMessages] = useState<MessageType[]>([]);

  // const q = query(
  //       collection(db, "users"),
  //       where("email", "==", auth?.currentUser?.email),
  //       limit(1)
  //     );

  //     const querySnapshot = await getDocs(q);

  //     if (!querySnapshot.empty) {
  //       const userDoc = querySnapshot.docs[0];
  //       const userId = userDoc.id;

  //       const postsSubcollectionRef = collection(db, `users/${userId}/posts`);

  //       const postDocRef = await addDoc(postsSubcollectionRef, {
  //         caption: values.caption,
  //         image: values.image,
  //         username: currentLoggedInUser?.username,
  //         uid: auth.currentUser?.uid,
  //         profilePic: currentLoggedInUser?.profilePic,
  //         createdAt: serverTimestamp(),
  //         likes: 0,
  //         likes_by: [],
  //         comments: [],
  //       });

  const fetchMessages = async () => {
    const user = auth?.currentUser;
    const c = collection(db, `chats/${chatId}/messages`);

    // getDocs(c).then((querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //     console.log(doc.data());
    //   });
    // });
    // getDocs(c)
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       console.log(doc.data(), "!!!!", messages);
    //       setMessages((prev) => [
    //         ...prev,
    //         {
    //           content: doc.data().content,
    //           sender: doc.data().sender,
    //           createdAt: doc.data().createdAt,
    //         },
    //       ]);
    //     });
    //   })
    //   .catch((error) => console.log(error));
    getDocs(c)
      .then((querySnapshot) => {
        const sortedMessages = querySnapshot.docs
          .map((doc) => ({
            content: doc.data().content,
            sender: doc.data().sender,
            createdAt: doc.data().createdAt,
          }))
          .sort((a, b) => b.createdAt - a.createdAt);

        setMessages(sortedMessages);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchMessages();
    console.log(messages);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: "100%",
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#fff" }}>{messages[0]?.content}</Text>
    </SafeAreaView>
  );
};

export default Personal;

const styles = StyleSheet.create({});
