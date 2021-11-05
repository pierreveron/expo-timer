import React from "react";
import FontInter from "../constants/FontInter";
import { Text, TouchableHighlight, TouchableOpacity, View } from "./tailwind";
import { SharedElement } from "react-navigation-shared-element";
import { ColorValue, StyleSheet } from "react-native";
import SharedBackground from "./SharedBackgound";

export default function HomeScreenButton({
  backgroundColor,
  title,
  onPress,
}: {
  backgroundColor: ColorValue;
  title: string;
  onPress: () => void;
}) {
  return (
    <TouchableHighlight className="w-1/2 h-1/2" onPress={onPress}>
      <View className="flex-1 items-center justify-center">
        <SharedBackground title={title} backgroundColor={backgroundColor} />
        <SharedElement id={title}>
          <Text
            className="text-white text-2xl"
            style={{
              fontFamily: FontInter.semiBold,
              // flex: 1
              // zIndex: 1,
            }}
          >
            {title}
          </Text>
        </SharedElement>
      </View>
    </TouchableHighlight>
  );
}
