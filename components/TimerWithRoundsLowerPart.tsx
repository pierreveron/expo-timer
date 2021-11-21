import React from "react";
import FontInter from "../constants/FontInter";
import { View, Text } from "./tailwind";
import TimeText from "./TimeText";

export default function TimerWithRoundsLowerPart({
  timer,
  totalTime,
}: {
  timer: number;
  totalTime: number;
}) {
  return (
    <View className="w-full px-8">
      <View className="flex-row justify-between items-center">
        <Text
          className="text-white text-xl"
          style={{
            fontFamily: FontInter.semiBold,
          }}
        >
          Time remaining
        </Text>
        <TimeText>{timer}</TimeText>
      </View>
      <View className="flex-row justify-between items-center">
        <Text
          className="text-white text-xl"
          style={{
            fontFamily: FontInter.semiBold,
          }}
        >
          Time
        </Text>
        <TimeText>{totalTime - timer}</TimeText>
      </View>
    </View>
  );
}
