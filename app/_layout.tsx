import React, { useEffect } from "react";
import { Slot } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import KeyboardDismissWrapper from "../components/KeyboardDismissWrapper";
import { StatusBar, Appearance } from "react-native";

export default function RootLayout() {
  StatusBar.setBarStyle("dark-content"); // Force light content
  Appearance.setColorScheme("light"); // Force dark mode (optional)

  return (
    <AuthProvider>
      <KeyboardDismissWrapper>
        <Slot />
      </KeyboardDismissWrapper>
    </AuthProvider>
  );
}
