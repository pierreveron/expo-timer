import React from "react";
import { View, Text } from "./tailwind";
import { Ionicons } from "@expo/vector-icons";
import FontInter from "../constants/FontInter";
import { SharedElement } from "react-navigation-shared-element";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Header({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
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
      <Ionicons
        name="arrow-back-circle"
        size={iconWidth}
        color="white"
        onPress={onPress}
        style={{
          position: "absolute",
          left: 0,
        }}
      />
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
