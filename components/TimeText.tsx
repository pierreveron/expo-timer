import React from "react";
import { View, Text } from "./tailwind";
import FontInter from "../constants/FontInter";
import { formatTime } from "../utils/time";
import { Dimensions } from "react-native";

export default function TimeText({ children: timer }: { children: number }) {
  const fontSize = Dimensions.get("screen").width * 0.2;
  // const width = Dimensions.get("screen").width * 0.13;
  const width = fontSize * 0.65;
  const timerString = formatTime(timer, false);
  return (
    <View className="flex-row">
      <Text
        className="text-white"
        style={{
          fontFamily: FontInter.semiBold,
          fontSize: fontSize,
          width: width,
          textAlign: "center",
        }}
      >
        {timerString.slice(0, 1)}
      </Text>
      <Text
        className="text-white"
        style={{
          fontFamily: FontInter.semiBold,
          fontSize: fontSize,
          width: width,
          textAlign: "center",
        }}
      >
        {timerString.slice(1, 2)}
      </Text>
      <Text
        className="text-white mx-10"
        style={{
          fontFamily: FontInter.semiBold,
          fontSize: fontSize,
          // transform: [{ translateY: -10 }],
          textAlign: "center",
        }}
      >
        :
      </Text>
      <Text
        className="text-white"
        style={{
          fontFamily: FontInter.semiBold,
          fontSize: fontSize,
          width: width,
          textAlign: "center",
        }}
      >
        {timerString.slice(-2, -1)}
      </Text>
      <Text
        className="text-white"
        style={{
          fontFamily: FontInter.semiBold,
          fontSize: fontSize,
          width: width,
          textAlign: "center",
        }}
      >
        {timerString.slice(-1)}
      </Text>
    </View>
  );
}
