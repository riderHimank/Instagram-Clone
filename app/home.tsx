import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Landing/Header";
import Stories from "../components/Landing/Stories";
import Post from "../components/Landing/Post";

// import { posts } from "../assets/data/post";
import NavigationTab from "../components/Landing/NavigationTab";
import { db } from "@/firebase/firebase";
import {
  FieldValue,
  collectionGroup,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { View } from "react-native";

export type PostType = {
  caption: string;
  image: string;
  username: string;
  uid: string;
  profilePic: string;
  createdAt: FieldValue;
  likes: number;
  likes_by: string[];
  comments: string[];
};

const Landing = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const user_posts = query(collectionGroup(db, "posts"));
    getDocs(user_posts).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setPosts((prev) => [...prev, doc.data() as PostType]);
      });
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Stories />
      <ScrollView showsVerticalScrollIndicator={false}>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
        <View style={{ height: 100 }} />
      </ScrollView>
      <NavigationTab />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "#fff",
    width: "100%",
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  textStyles: {
    color: "#fff",
  },
});

export default Landing;
