import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { auth } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const SignedInStack = () => {
  return (
    <Stack initialRouteName="home">
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="newpost" options={{ headerShown: false }} />
      <Stack.Screen name="two" options={{ headerShown: false }} />
      <Stack.Screen name="reels" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="search" options={{ headerShown: false }} />
      <Stack.Screen name="chat/[chatId]" options={{ headerShown: false }} />
      <Stack.Screen name="chats" options={{ headerShown: false }} />
    </Stack>
  );
};

const SignedOutStack = () => {
  return (
    <Stack initialRouteName="signin">
      <Stack.Screen name="signin" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
    </Stack>
  );
};

export default function RootLayout() {
  const [currentUser, setCurrentUser] = useState(null);

  const userHandler = (user: any) => {
    user ? setCurrentUser(user) : setCurrentUser(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => userHandler(user));
    return () => unsubscribe();
  }, []);
  return <>{currentUser ? <SignedInStack /> : <SignedOutStack />}</>;
}
