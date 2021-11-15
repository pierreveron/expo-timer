import React, { useEffect } from "react";
import { Text, View } from "../components/tailwind";
import { formatTime } from "../utils/time";
import { RootStackScreenProps } from "../types";
import CustomButton from "../components/Button";
import ScreenWrapper from "../components/ScreenWrapper";
import FontInter from "../constants/FontInter";
import { Dimensions } from "react-native";
import Colors from "../constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useStopwatch from "../hooks/useStopwatch";

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
    handleCancel,
  } = useStopwatch();

  useEffect(() => {
    return () => {
      //Prevents from memory leaks by stopping the 1 second interval
      handleCancel();
    };
  }, []);

  const { bottom: insetsBottom } = useSafeAreaInsets();
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
        <View
          style={{
            position: "absolute",
            bottom: insetsBottom,
          }}
        >
          {isActive && !isPaused && (
            <CustomButton
              title="Reset"
              onPress={handleReset}
              style={{ marginBottom: insetsBottom / 2 }}
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
