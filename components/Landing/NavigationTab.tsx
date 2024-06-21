import { Image, Pressable, View } from "react-native";
import React, { useState } from "react";
import { Divider } from "@rneui/themed/dist/Divider";
import { router } from "expo-router";

const Icons = [
  {
    name: "home",
    active:
      "https://img.icons8.com/?size=100&id=1iF9PyJ2Thzo&format=png&color=ffffff",
    inactive:
      "https://img.icons8.com/?size=100&id=i6fZC6wuprSu&format=png&color=ffffff",
  },
  {
    name: "search",
    active: "https://img.icons8.com/?size=100&id=7695&format=png&color=ffffff",
    inactive: "https://img.icons8.com/?size=100&id=132&format=png&color=ffffff",
  },
  {
    name: "newpost",
    active:
      "https://img.icons8.com/?size=100&id=TasygyA45Sdx&format=png&color=ffffff",
    inactive:
      "https://img.icons8.com/?size=100&id=TasygyA45Sdx&format=png&color=ffffff",
  },
  {
    name: "reels",
    active:
      "https://img.icons8.com/?size=100&id=YoIaSvIehcuI&format=png&color=ffffff",
    inactive:
      "https://img.icons8.com/?size=100&id=PxI9IPCyBAOD&format=png&color=ffffff",
  },
  {
    name: "profile",
    active: "https://img.icons8.com/?size=100&id=7819&format=png&color=ffffff",
    inactive:
      "https://img.icons8.com/?size=100&id=7820&format=png&color=ffffff",
  },
];
const NavigationTab = () => {
  const [active, setActive] = useState("index");

  const Icon = ({ icon }: any) => {
    return (
      <Pressable
        onPress={() => {
          if (active === icon.name) return;
          setActive(icon.name);
          router.push(`${icon.name}`);
        }}
      >
        <Image
          source={{ uri: active == icon.name ? icon.active : icon.inactive }}
          style={{ width: 30, height: 30 }}
        />
      </Pressable>
    );
  };

  return (
    <View
      style={{
        position: "absolute",
        width: "100%",
        height: 80,
        bottom: 0,
        backgroundColor: "#000",
        zIndex: 100,
        marginTop: 10,
      }}
    >
      <Divider width={1} orientation="vertical" />
      <View
        style={{
          width: "100%",
          paddingTop: 10,
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {Icons.map((icon, index) => (
          <Icon key={index} icon={icon} />
        ))}
      </View>
    </View>
  );
};

export default NavigationTab;
