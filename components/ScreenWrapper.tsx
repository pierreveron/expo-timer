import React from "react";
import Header from "./Header";
import { ColorValue } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SharedBackground from "./SharedBackgound";

export default function ScreenWrapper({
  title,
  onPress,
  children,
  backgroundColor,
}: {
  title: string;
  onPress: () => void;
  backgroundColor: ColorValue;
  children?: React.ReactNode;
}) {
  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={{ flex: 1 }}>
      <SharedBackground title={title} backgroundColor={backgroundColor} />
      <Header title={title} onPress={onPress} />
      {children}
    </SafeAreaView>
  );
}
