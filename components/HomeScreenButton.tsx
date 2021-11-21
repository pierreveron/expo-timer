import React from "react";
import { TouchableHighlight, View } from "./tailwind";
import { ColorValue } from "react-native";
import SharedBackground from "./SharedBackgound";
import SharedTitle from "./SharedTitle";

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
        <SharedTitle title={title} />
      </View>
    </TouchableHighlight>
  );
}
