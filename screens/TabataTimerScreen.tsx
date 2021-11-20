import React, { useEffect, useRef, useState } from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import Colors from "../constants/Colors";
import { RootStackScreenProps } from "../types";
import { Animated, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomButton from "../components/Button";
import { Text, View } from "../components/tailwind";
import TimeText from "../components/TimeText";
import useTabataTimer from "../hooks/useTabataTimer";
import FontInter from "../constants/FontInter";
import { formatTime } from "../utils/time";
import useUpdateEffect from "../hooks/useUpdateEffect";
import useFade from "../hooks/useFade";

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

  const { fadeAnim, fadeIn, fadeOut } = useFade(1, 600);

  useUpdateEffect(() => {
    if (isFinished) {
      fadeOut();
    } else {
      fadeIn();
    }
  }, [isFinished]);

  const { bottom: insetsBottom } = useSafeAreaInsets();
  return (
    <ScreenWrapper
      title="Tabata Timer"
      onPress={() => navigation.navigate("Home")}
      backgroundColor={Colors.tabataTimer}
    >
      <View className="h-full items-center justify-center">
        <Animated.View
          style={{
            opacity: Animated.subtract(1, fadeAnim),
            position: "absolute",
          }}
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
        </Animated.View>
        <Animated.View
          style={{
            opacity: fadeAnim,
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
          <TimeText>
            {timer == 0
              ? 0
              : isRest
              ? restTime - ((totalTime - timer) % restTime)
              : workTime - ((totalTime - timer) % roundTime)}
          </TimeText>
          <View className="w-full px-8">
            <View className="flex-row justify-between">
              <Text
                className="text-white text-xl"
                style={{
                  fontFamily: FontInter.semiBold,
                  // fontSize: Dimensions.get("screen").width * 0.1,
                }}
              >
                Time remaining
              </Text>
              <Text
                className="text-white text-xl"
                style={{
                  fontFamily: FontInter.semiBold,
                  // fontSize: Dimensions.get("screen").width * 0.1,
                }}
              >
                {formatTime(timer)}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text
                className="text-white text-xl"
                style={{
                  fontFamily: FontInter.semiBold,
                  // fontSize: Dimensions.get("screen").width * 0.1,
                }}
              >
                Time
              </Text>
              <Text
                className="text-white text-xl"
                style={{
                  fontFamily: FontInter.semiBold,
                  // fontSize: Dimensions.get("screen").width * 0.1,
                }}
              >
                {formatTime(totalTime - timer)}
              </Text>
            </View>
          </View>
        </Animated.View>

        <View
          style={{
            position: "absolute",
            bottom: insetsBottom,
          }}
        >
          {((isActive && !isPaused) || isFinished) && (
            <CustomButton
              title="Reset"
              onPress={handleReset}
              style={{ marginBottom: isFinished ? 0 : insetsBottom / 2 }}
            />
          )}
          {!isFinished &&
            (!isActive && !isPaused ? (
              <CustomButton
                title="Start"
                onPress={handleStart}
                style={{ marginTop: Dimensions.get("screen").height / 8 }}
              />
            ) : isPaused ? (
              <CustomButton title="Stop" onPress={handlePause} />
            ) : (
              <CustomButton title="Resume" onPress={handleResume} />
            ))}
        </View>
      </View>
    </ScreenWrapper>
  );
}
