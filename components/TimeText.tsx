import React from "react";
import { View, Text } from "./tailwind";
import FontInter from "../constants/FontInter";
import Layout from "../constants/Layout";
import { formatTime } from "../utils/time";

export default function TimeText({
  children: timer,
  big = false,
}: {
  children: number;
  big?: boolean;
}) {
  const fontSize = big ? Layout.window.width * 0.2 : 20;
  const width = fontSize * 0.65;
  const timerString = formatTime(timer, false);

  const textViews = [];

  for (var x = 0, c = ""; (c = timerString.charAt(x)); x++) {
    if (c !== " ")
      textViews.push(
        <Text
          key={x}
          className="text-white text-center"
          style={{
            fontFamily: FontInter.semiBold,
            fontSize: fontSize,
            width: width,
            textAlign: "center",
          }}
        >
          {c}
        </Text>
      );
  }

  return <View className="flex-row">{textViews}</View>;
}
