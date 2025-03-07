// index.tsx
import React, { useEffect, useContext } from "react";
import { Text, Button, View } from "react-native";
import { useRouter } from "expo-router";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebaseConfig";
import { signOut, onAuthStateChanged } from "firebase/auth";

export default function Index() {
  const router = useRouter();
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      if (!authUser) {
        router.replace("/login");
      } else {
        router.replace("/menu/play");
      }
    });

    return unsubscribe;
  }, []);

  return (
    <View>
      <Text>hej</Text>
    </View>
  );
}
