import React, { useContext, useState, useEffect } from "react";
import { Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { AuthContext } from "../../context/AuthContext";
import { auth, db } from "../../firebaseConfig";
import { signOut, updateProfile } from "firebase/auth"; // Import updateProfile
import { setDoc, doc, updateDoc } from "firebase/firestore";
import ButtonComponent from "@/components/ButtonComponent";
import ContainerComponent from "../../components/ContainerComponent";
import InputComponent from "@/components/InputComponent";
import TitleComponent from "@/components/TitleComponent";

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || user.email || "");
    }
  }, [user]);

  const handleSave = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: displayName,
        });

        await updateDoc(doc(db, "users", auth.currentUser.uid), {
          displayName: displayName,
        });

        const updatedUser = auth.currentUser;

        setUser(updatedUser);

        alert("Display name updated!");
      }
    } catch (error) {
      console.error("Error updating display name:", error);
      setErrorMessage("Failed to update display name.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!user) return null;

  return (
    <>
      <ContainerComponent>
        <TitleComponent>Profile page</TitleComponent>
        {errorMessage ? (
          <Text style={{ color: "red" }}>{errorMessage}</Text>
        ) : null}
        <Text>Change your display name</Text>
        <InputComponent
          placeholder="Name"
          value={displayName}
          onChangeText={setDisplayName}
        />
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <ButtonComponent title="Save" onPress={handleSave} />
        )}
        <Text>Signed in as: {user?.email || "Guest"}</Text>
        <ButtonComponent title="Sign out" onPress={handleSignOut} />
      </ContainerComponent>
    </>
  );
}
