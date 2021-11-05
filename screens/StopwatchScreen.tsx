import React from "react";
import { Text, View } from "../components/tailwind";
import useTimer from "../hooks/useTimer";
import { formatTime } from "../utils/time";
import { RootStackScreenProps } from "../types";
import CustomButton from "../components/Button";
import ScreenWrapper from "../components/ScreenWrapper";
import FontInter from "../constants/FontInter";
import { Dimensions } from "react-native";
import Colors from "../constants/Colors";

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
  } = useTimer();
  return (
    <ScreenWrapper
      title="Stopwatch"
      onPress={() => navigation.navigate("Home")}
      backgroundColor={Colors.stopwatch}
    >
      <View className="flex-1 items-center justify-center">
        <Text
          className="text-white"
          style={{
            fontFamily: FontInter.semiBold,
            fontSize: Dimensions.get("screen").width * 0.2,
          }}
        >
          {formatTime(timer)}
        </Text>
        <View className="absolute bottom-0">
          {isActive && !isPaused && (
            <CustomButton
              title="Reset"
              onPress={handleReset}
              style={{ marginBottom: 10 }}
            />
          )}
          {!isActive && !isPaused ? (
            <CustomButton title="Start" onPress={handleStart} />
          ) : isPaused ? (
            <CustomButton title="Stop" onPress={handlePause} />
          ) : (
            <CustomButton title="Resume" onPress={handleResume} />
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
}
