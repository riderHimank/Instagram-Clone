import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Divider, Button } from "@rneui/themed";
import { auth, db } from "@/firebase/firebase";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { router } from "expo-router";

const PLACEHOLDER_IMAGE =
  "https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg";

const uploadPostSchema = Yup.object().shape({
  caption: Yup.string().max(220).required("Caption is required"),
  image: Yup.string().url().required("Image is required"),
});

const PostUploader = () => {
  const [imgUrl, setimgUrl] = useState(PLACEHOLDER_IMAGE);
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState<{
    username: string;
    profilePic: string;
  } | null>(null);

  const getUsername = () => {
    const user = auth.currentUser;
    const q = query(
      collection(db, "users"),
      where("uid", "==", user?.uid),
      limit(1)
    );
    const unsubscribe = getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setCurrentLoggedInUser({
          username: doc.data().username,
          profilePic: doc.data().profilePic,
        });
      });
    });
    return unsubscribe;
  };
  useEffect(() => {
    getUsername();
  }, []);

  const uploadPost = async (values: { caption: string; image: string }) => {
    try {
      const q = query(
        collection(db, "users"),
        where("email", "==", auth?.currentUser?.email),
        limit(1)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userId = userDoc.id;

        const postsSubcollectionRef = collection(db, `users/${userId}/posts`);

        const postDocRef = await addDoc(postsSubcollectionRef, {
          caption: values.caption,
          image: values.image,
          username: currentLoggedInUser?.username,
          uid: auth.currentUser?.uid,
          profilePic: currentLoggedInUser?.profilePic,
          createdAt: serverTimestamp(),
          likes: 0,
          likes_by: [],
          comments: [],
        });
        console.log("Document written with ID: ", postDocRef.id);
        Alert.alert("Post uploaded successfully");
        router.push("/home");
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <Formik
      initialValues={{ caption: "", image: "" }}
      validationSchema={uploadPostSchema}
      onSubmit={(values) => uploadPost(values)}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
      }) => (
        <>
          <View style={styles.container}>
            <Image
              source={{ uri: imgUrl ? imgUrl : PLACEHOLDER_IMAGE }}
              style={styles.image}
            />
            <TextInput
              placeholder="Write a caption..."
              placeholderTextColor={"grey"}
              onChangeText={handleChange("caption")}
              onBlur={handleBlur("caption")}
              multiline={true}
              value={values.caption}
              style={styles.input}
            />
          </View>
          {errors.caption && touched.caption && (
            <Text style={{ color: "red", marginBottom: 5 }}>
              {errors.caption}
            </Text>
          )}
          <Divider width={0.2} orientation="vertical" />
          <View style={styles.url}>
            <TextInput
              onChange={(e) => setimgUrl(e.nativeEvent.text)}
              placeholder="Enter image URL..."
              placeholderTextColor={"grey"}
              onChangeText={handleChange("image")}
              onBlur={handleBlur("image")}
              value={values.image}
              style={styles.input}
            />
            {errors.image && touched.image && (
              <Text style={{ color: "red" }}>{errors.image}</Text>
            )}
          </View>
          <TouchableOpacity>
            <Button
              onPress={(e) => handleSubmit()}
              title="Upload"
              disabled={!isValid}
              color={"grey"}
            />
          </TouchableOpacity>
        </>
      )}
    </Formik>
  );
};

export default PostUploader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
  input: {
    color: "white",
    margin: 5,
    flex: 1,
    borderWidth: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    fontSize: 20,
  },
  url: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    minHeight: 80,
  },
});
