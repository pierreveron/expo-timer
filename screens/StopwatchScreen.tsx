import React from "react";
import { View } from "../components/tailwind";
import { RootStackScreenProps } from "../types";
import ScreenWrapper from "../components/ScreenWrapper";
import Colors from "../constants/Colors";
import useStopwatch from "../hooks/useStopwatch";
import TimeText from "../components/TimeText";
import BottomButtons from "../components/BottomButtons";

export default function StopwatchScreen({
  navigation,
}: RootStackScreenProps<"Stopwatch">) {
  const {
    timer,
    isActive,
    isPaused,
    handleStart,
    handlePause,
    handleResume,
    handleReset,
  } = useStopwatch();

  return (
    <ScreenWrapper
      title="Stopwatch"
      onPress={() => navigation.navigate("Home")}
      backgroundColor={Colors.stopwatch}
    >
      <View className="flex-1 items-center justify-center">
        <TimeText>{timer}</TimeText>
        <BottomButtons
          isActive={isActive}
          isPaused={isPaused}
          handleReset={handleReset}
          handleStart={handleStart}
          handlePause={handlePause}
          handleResume={handleResume}
        />
      </View>
    </ScreenWrapper>
  );
}
