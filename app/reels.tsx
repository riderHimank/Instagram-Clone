import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { ResizeMode, Video } from "expo-av";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHeart as faLiked,
  faEllipsis,
  faPause,
  faVolumeXmark,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCircle,
  faComment,
  faHeart,
  faPaperPlane,
  faPauseCircle,
} from "@fortawesome/free-regular-svg-icons";
import { Image } from "react-native";
import { router } from "expo-router";

const data = [
  require("../assets/video/1.mp4"),
  require("../assets/video/a.mp4"),
  require("../assets/video/b.mp4"),
  require("../assets/video/c.mp4"),
  require("../assets/video/d.mp4"),
];

export default function App() {
  const [selectedVideo, setSelectedVideo] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [liked, setLiked] = useState(false);
  const [paused, setpaused] = useState(false);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onScroll={(e) => {
          setSelectedVideo(
            parseInt(e.nativeEvent.contentOffset.y.toFixed(0)) /
              Dimensions.get("window").height
          );
        }}
        renderItem={({ item, index }) => (
          <View style={styles.videoContainer}>
            <View style={styles.info}>
              <View style={styles.userName}>
                <Image
                  style={styles.avatar}
                  source={{
                    uri: "https://dummyjson.com/icon/emilys/128",
                  }}
                />
                <Text style={styles.userText}>himank_bohara</Text>
              </View>
              <Text style={styles.infoArea}>A nice caption goes here</Text>
              <Text style={styles.infoArea}>Liked by 69 others</Text>
            </View>
            <View style={styles.reactionContainer}>
              <View style={styles.reaction}>
                <TouchableOpacity
                  onPress={() => {
                    setLiked(!liked);
                  }}
                >
                  {!liked && (
                    <FontAwesomeIcon size={30} color="#fff" icon={faHeart} />
                  )}
                  {liked && (
                    <FontAwesomeIcon size={30} color="red" icon={faLiked} />
                  )}
                </TouchableOpacity>
                <Text style={styles.textStyles}>1.4M</Text>
              </View>
              <View style={styles.reaction}>
                <TouchableOpacity>
                  <FontAwesomeIcon size={30} color="#fff" icon={faComment} />
                </TouchableOpacity>
                <Text style={styles.textStyles}>365k</Text>
              </View>
              <View style={styles.reaction}>
                <TouchableOpacity>
                  <FontAwesomeIcon size={30} color="#fff" icon={faPaperPlane} />
                </TouchableOpacity>
                <Text style={styles.textStyles}>Share</Text>
              </View>
              <View>
                <TouchableOpacity>
                  <FontAwesomeIcon size={30} color="#fff" icon={faEllipsis} />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity>
                  <FontAwesomeIcon size={30} color="#fff" icon={faCircle} />
                </TouchableOpacity>
              </View>
            </View>
            <Video
              source={item}
              volume={1.0}
              isMuted={isMuted}
              resizeMode={"cover" as ResizeMode}
              shouldPlay={selectedVideo === index}
              isLooping
              style={styles.videoStyles}
            />
            <TouchableOpacity
              style={styles.touchableStyles}
              onLongPress={() => {
                setSelectedVideo(selectedVideo === -1 ? index : -1);
                setpaused(true);
              }}
              onPressOut={() => {
                setSelectedVideo(index);
                setpaused(false);
              }}
              onPress={() => setIsMuted(!isMuted)}
            />
          </View>
        )}
      />
      {paused && (
        <View style={styles.pauseButton}>
          <TouchableOpacity>
            <FontAwesomeIcon size={30} color="#fff" icon={faPause} />
          </TouchableOpacity>
        </View>
      )}
      {isMuted && (
        <View style={styles.pauseButton}>
          <TouchableOpacity>
            <FontAwesomeIcon size={30} color="#fff" icon={faVolumeXmark} />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.backButton}>
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <FontAwesomeIcon icon={faChevronLeft} size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 20,
    borderColor: "#fff",
    borderWidth: 1,
    marginRight: 10,
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    position: "absolute",
    left: 10,
    bottom: 50,
    zIndex: 100,
    gap: 10,
  },
  infoArea: {
    marginHorizontal: 5,
    color: "#fff",
    fontWeight: "500",
    fontSize: 15,
  },
  pauseButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    width: 50,
    height: 50,
    borderRadius: 50,
    position: "absolute",
  },
  reaction: {
    alignItems: "center",
  },
  reactionContainer: {
    alignItems: "center",
    rowGap: 20,
    position: "absolute",
    right: 10,
    bottom: 50,
    zIndex: 100,
  },
  textStyles: {
    marginHorizontal: 5,
    color: "#fff",
    fontWeight: "500",
    fontSize: 15,
  },
  touchableStyles: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    position: "absolute",
    top: 0,
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
  videoContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  videoStyles: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
