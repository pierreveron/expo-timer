import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  useFonts,
  Inter_900Black,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import Navigation from "./navigation";

export default function App() {
  // const isLoadingComplete = useCachedResources();
  const [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
