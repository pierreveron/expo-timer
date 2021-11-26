import React from "react";
import { StyleProp, useWindowDimensions, ViewStyle } from "react-native";
import FontInter from "../constants/FontInter";
import { Text, TouchableOpacity } from "./tailwind";

export default function CustomButton({
  title,
  onPress,
  style,
}: {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  const { width: windowWidth } = useWindowDimensions();
  return (
    <TouchableOpacity
      className="bg-white rounded-xl items-center py-2 max-w-xl"
      style={[{ width: windowWidth * 0.8 }, style]}
      onPress={onPress}
    >
      <Text
        className="text-gray-900 text-2xl"
        style={{ fontFamily: FontInter.semiBold }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
