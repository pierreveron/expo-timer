import React from "react";
import FadeDuration from "../constants/FadeDuration";
import FontInter from "../constants/FontInter";
import Layout from "../constants/Layout";
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
          bottom: Layout.window.width * 0.1,
        }}
        fadeDuration={FadeDuration / 2}
      >
        <Text
          className="text-white"
          style={{
            fontFamily: FontInter.semiBold,
            fontSize: Layout.window.width * 0.1,
          }}
        >
          WORK
        </Text>
      </FadedView>
      <FadedView
        visible={isRest}
        style={{
          position: "absolute",
          bottom: Layout.window.width * 0.1,
        }}
        fadeDuration={FadeDuration / 2}
      >
        <Text
          className="text-white"
          style={{
            fontFamily: FontInter.semiBold,
            fontSize: Layout.window.width * 0.1,
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
