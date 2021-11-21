import React from "react";
import { View } from "./tailwind";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Animated } from "react-native";
import SharedTitle from "./SharedTitle";

export default function Header({
  title,
  onPress,
  fadeAnim,
}: {
  title: string;
  onPress: () => void;
  fadeAnim: Animated.Value;
}) {
  const iconWidth = 40;
  const { top: insetsTop } = useSafeAreaInsets();
  return (
    <View
      className="flex-row items-center justify-center m-4"
      style={{
        position: "absolute",
        top: insetsTop,
        left: 0,
        right: 0,
        zIndex: 1,
      }}
    >
      <Animated.View
        style={{ opacity: fadeAnim, position: "absolute", left: 0 }}
      >
        <Ionicons
          name="arrow-back-circle"
          size={iconWidth}
          color="white"
          onPress={onPress}
        />
      </Animated.View>
      <SharedTitle title={title} />
    </View>
  );
}
