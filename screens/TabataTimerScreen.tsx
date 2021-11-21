import React from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import Colors from "../constants/Colors";
import { RootStackScreenProps } from "../types";
import { Dimensions } from "react-native";
import { Text, View } from "../components/tailwind";
import TimeText from "../components/TimeText";
import useTabataTimer from "../hooks/useTabataTimer";
import FontInter from "../constants/FontInter";
import { formatTime } from "../utils/time";
import FadedView from "../components/FadedView";
import BottomButtons from "../components/BottomButtons";
import FinishedText from "../components/FinishedText";
import FadeDuration from "../constants/FadeDuration";

export default function TabataTimerScreen({
  navigation,
}: RootStackScreenProps<"TabataTimer">) {
  const {
    totalTime,
    workTime,
    roundTime,
    restTime,
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
        <FadedView
          visible={!isFinished}
          fadeDuration={FadeDuration}
          style={{
            width: "100%",
            alignItems: "center",
          }}
        >
          <Text
            className="text-white"
            style={{
              fontFamily: FontInter.semiBold,
              fontSize: Dimensions.get("screen").width * 0.1,
            }}
          >
            {isRest ? "REST" : "WORK"}
          </Text>
          <Text
            className="text-white text-xl"
            style={{
              fontFamily: FontInter.semiBold,
            }}
          >
            Round {round}/8
          </Text>
          <TimeText big>
            {timer == 0
              ? 0
              : isRest
              ? restTime - ((totalTime - timer) % restTime)
              : workTime - ((totalTime - timer) % roundTime)}
          </TimeText>
          <View className="w-full px-8">
            <View className="flex-row justify-between items-center">
              <Text
                className="text-white text-xl"
                style={{
                  fontFamily: FontInter.semiBold,
                  // fontSize: Dimensions.get("screen").width * 0.1,
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
                  // fontSize: Dimensions.get("screen").width * 0.1,
                }}
              >
                Time
              </Text>
              <TimeText>{totalTime - timer}</TimeText>
            </View>
          </View>
        </FadedView>
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
