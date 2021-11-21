import React from "react";
import FadeDuration from "../constants/FadeDuration";
import FadedView from "./FadedView";
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
