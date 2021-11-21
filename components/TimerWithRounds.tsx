import React from "react";
import { Dimensions } from "react-native";
import FadeDuration from "../constants/FadeDuration";
import FontInter from "../constants/FontInter";
import FadedView from "./FadedView";
import { View, Text } from "./tailwind";
import TimerWithRoundsLowerPart from "./TimerWithRoundsLowerPart";
import TimerWithRoundsUpperPart from "./TimerWithRoundsUpperPart";
import TimeText from "./TimeText";

export default function TimerWithRounds({
  visible,
  timer,
  totalTime,
  isRest,
  round,
  numberRounds,
  restTime,
  workTime,
  roundTime,
}: {
  timer: number;
  totalTime: number;
  visible: boolean;
  isRest: boolean;
  round: number;
  numberRounds: number;
  restTime: number;
  workTime: number;
  roundTime: number;
}) {
  return (
    <FadedView
      visible={visible}
      fadeDuration={FadeDuration}
      style={{
        width: "100%",
        alignItems: "center",
      }}
    >
      <TimerWithRoundsUpperPart
        isRest={isRest}
        round={round}
        numberRounds={numberRounds}
      />
      <TimeText big>
        {timer == 0
          ? 0
          : isRest
          ? restTime - ((totalTime - timer) % restTime)
          : workTime - ((totalTime - timer) % roundTime)}
      </TimeText>
      <TimerWithRoundsLowerPart timer={timer} totalTime={totalTime} />
    </FadedView>
  );
}
