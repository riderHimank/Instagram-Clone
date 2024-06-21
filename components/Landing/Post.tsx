import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Image } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import {
  faBookmark,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { PostType } from "@/app/home";

const Post = (values: { post: PostType; key: number }) => {
  return (
    <View style={styles.container}>
      <View style={styles.postHeader}>
        <View style={styles.userName}>
          <Image
            style={styles.avatar}
            source={{
              uri: values.post.profilePic,
            }}
          />
          <Text style={styles.userText}>{values.post.username}</Text>
        </View>
        <FontAwesomeIcon size={25} icon={faEllipsisVertical} color="#fff" />
      </View>

      <Image
        source={{
          uri: values.post.image,
        }}
        style={styles.postImage}
      />

      <View>
        <View style={styles.postReactions}>
          <View style={styles.reactions}>
            <TouchableOpacity>
              <FontAwesomeIcon size={25} icon={faHeart} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesomeIcon size={25} icon={faComment} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesomeIcon size={25} icon={faPaperPlane} color="#fff" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <FontAwesomeIcon size={25} icon={faBookmark} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.likes}>{values.post.likes} Likes</Text>
        <View>
          <View style={styles.comment}>
            <Text style={styles.commentUser}>{values.post.username}</Text>
            <Text style={styles.commentText}>{values.post.caption}</Text>
          </View>
        </View>
        {!!values.post?.comments?.length ? (
          <Text style={styles.likes}>
            View {values.post.comments?.length > 1 ? "all" : ""}{" "}
            {values.post?.comments?.length}{" "}
            {values.post?.comments?.length > 1 ? "comments" : "comment"}
          </Text>
        ) : (
          <Text style={styles.likes}> No Comments</Text>
        )}
        <View>
          {values.post?.comments
            ?.slice(0, 2)
            .map((comment: any, index: number) => (
              <View style={styles.comment} key={index}>
                <Text style={styles.commentUser}>{comment.user}</Text>
                <Text style={styles.commentText}>{comment.comment}</Text>
              </View>
            ))}
        </View>
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 20,
    borderColor: "#fff",
    borderWidth: 1,
    marginRight: 10,
  },
  comment: {
    flexDirection: "row",
    marginHorizontal: 5,
    marginBottom: 3,
  },
  commentUser: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
    marginRight: 3,
  },
  commentText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "normal",
  },
  container: {
    marginVertical: 5,
  },
  likes: {
    color: "#949498",
    height: 20,
    marginHorizontal: 5,
    marginBottom: 5,
    fontSize: 15,
  },
  reactions: {
    flexDirection: "row",
    gap: 20,
  },
  postHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 5,
  },
  postImage: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").width,
    marginVertical: 10,
  },
  postReactions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    marginHorizontal: 5,
  },
  userName: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
