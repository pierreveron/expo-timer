import React from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import Colors from "../constants/Colors";
import { RootStackScreenProps } from "../types";
import { View } from "../components/tailwind";
import useTabataTimer from "../hooks/useTabataTimer";
import FinishedText from "../components/FinishedText";
import FadeDuration from "../constants/FadeDuration";
import TimerWithRounds from "../components/TimerWithRounds";
import BottomButtons from "../components/BottomButtons";

export default function TabataTimerScreen({
  navigation,
}: RootStackScreenProps<"TabataTimer">) {
  const {
    totalTime,
    workTime,
    roundTime,
    restTime,
    numberRounds,
    timer,
    isActive,
    isPaused,
    round,
    isRest,
    isFinished,
    handleStart,
    handlePause,
    handleResume,
    handleReset,
  } = useTabataTimer();

  return (
    <ScreenWrapper
      title="Tabata Timer"
      onPress={() => navigation.navigate("Home")}
      backgroundColor={Colors.tabataTimer}
    >
      <View className="h-full items-center justify-center">
        <FinishedText visible={isFinished} fadeDuration={FadeDuration} />
        <TimerWithRounds
          timer={timer}
          totalTime={totalTime}
          visible={!isFinished}
          isRest={isRest}
          round={round}
          numberRounds={numberRounds}
          restTime={restTime}
          workTime={workTime}
          roundTime={roundTime}
        />
        <BottomButtons
          isActive={isActive}
          isPaused={isPaused}
          isFinished={isFinished}
          handleReset={handleReset}
          handleStart={handleStart}
          handlePause={handlePause}
          handleResume={handleResume}
        />
      </View>
    </ScreenWrapper>
  );
}
