import React from "react";
import { Dimensions } from "react-native";
import FontInter from "../constants/FontInter";
import FadedView from "./FadedView";
import { Text } from "./tailwind";

export default function FinishedText({
  visible,
  fadeDuration,
}: {
  visible: boolean;
  fadeDuration: number;
}) {
  return (
    <FadedView
      visible={visible}
      fadeDuration={fadeDuration}
      style={{
        position: "absolute",
      }}
      initialValue={0}
    >
      <Text
        className="text-white"
        style={{
          fontFamily: FontInter.semiBold,
          fontSize: Dimensions.get("screen").width * 0.1,
        }}
      >
        FINISHED
      </Text>
    </FadedView>
  );
}
