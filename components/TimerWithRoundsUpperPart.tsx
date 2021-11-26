import React from "react";
import { useWindowDimensions } from "react-native";
import FadeDuration from "../constants/FadeDuration";
import FontInter from "../constants/FontInter";
import FadedView from "./FadedView";
import { View, Text } from "./tailwind";

export default function TimerWithRoundsUpperPart({
  isRest,
  round,
  numberRounds,
}: {
  isRest: boolean;
  round: number;
  numberRounds: number;
}) {
  const bottom = 20;
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const fontSize =
    windowHeight * 0.1 > windowWidth * 0.16
      ? windowWidth * 0.16
      : windowHeight * 0.1;
  return (
    <View className="items-center">
      <FadedView
        visible={!isRest}
        style={{
          position: "absolute",
          bottom: bottom,
        }}
        fadeDuration={FadeDuration / 2}
      >
        <Text
          className="text-white"
          style={{
            fontFamily: FontInter.semiBold,
            fontSize: fontSize,
          }}
        >
          WORK
        </Text>
      </FadedView>
      <FadedView
        visible={isRest}
        style={{
          position: "absolute",
          bottom: bottom,
        }}
        fadeDuration={FadeDuration / 2}
      >
        <Text
          className="text-white"
          style={{
            fontFamily: FontInter.semiBold,
            fontSize: fontSize,
          }}
        >
          REST
        </Text>
      </FadedView>
      <Text
        className="text-white text-xl"
        style={{
          fontFamily: FontInter.semiBold,
        }}
      >
        Round {round}/{numberRounds}
      </Text>
    </View>
  );
}
