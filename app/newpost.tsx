import { SafeAreaView } from "react-native";
import React from "react";
import AddPost from "../components/NewPost/AddPost";
import PostUploader from "../components/NewPost/PostUploader";

const NewPost = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "black", flex: 1, width: "100%" }}>
      <AddPost />
      {/* FormikPostUploader */}
      <PostUploader />
    </SafeAreaView>
  );
};

export default NewPost;
