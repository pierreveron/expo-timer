import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import FontInter from "../constants/FontInter";
import Layout from "../constants/Layout";
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
      style={[{ width: Layout.window.width * 0.8 }, style]}
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
