import React from "react";
import { Dimensions } from "react-native";
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
  return (
    <View className="items-center">
      <FadedView
        visible={!isRest}
        style={{
          position: "absolute",
          bottom: Dimensions.get("screen").width * 0.1,
        }}
        fadeDuration={FadeDuration / 2}
      >
        <Text
          className="text-white"
          style={{
            fontFamily: FontInter.semiBold,
            fontSize: Dimensions.get("screen").width * 0.1,
          }}
        >
          WORK
        </Text>
      </FadedView>
      <FadedView
        visible={isRest}
        style={{
          position: "absolute",
          bottom: Dimensions.get("screen").width * 0.1,
        }}
        fadeDuration={FadeDuration / 2}
      >
        <Text
          className="text-white"
          style={{
            fontFamily: FontInter.semiBold,
            fontSize: Dimensions.get("screen").width * 0.1,
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
