import React, { useEffect } from "react";
import { View } from "../components/tailwind";
import { RootStackScreenProps } from "../types";
import CustomButton from "../components/Button";
import ScreenWrapper from "../components/ScreenWrapper";
import Colors from "../constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useStopwatch from "../hooks/useStopwatch";
import TimeText from "../components/TimeText";

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
      console.log("Stopwatch dismounted");
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
        <TimeText>{timer}</TimeText>
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
