import React from "react";
import { Dimensions, StyleProp, ViewStyle } from "react-native";
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
  return (
    <TouchableOpacity
      className="bg-white rounded-xl items-center py-2 max-w-lg"
      style={[{ width: Dimensions.get("screen").width * 0.8 }, style]}
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
