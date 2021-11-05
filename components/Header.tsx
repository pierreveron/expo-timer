import React from "react";
import { View, Text } from "./tailwind";
import { Ionicons } from "@expo/vector-icons";
import FontInter from "../constants/FontInter";
import { SharedElement } from "react-navigation-shared-element";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Animated } from "react-native";

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
      <SharedElement id={title}>
        <Text
          className="text-white text-center text-2xl"
          style={{
            fontFamily: FontInter.semiBold,
          }}
        >
          {title}
        </Text>
      </SharedElement>
    </View>
  );
}
