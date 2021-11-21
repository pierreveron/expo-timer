import React from "react";
import { View } from "../components/tailwind";
import { RootStackScreenProps } from "../types";
import CustomButton from "../components/Button";
import ScreenWrapper from "../components/ScreenWrapper";
import Colors from "../constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useStopwatch from "../hooks/useStopwatch";
import TimeText from "../components/TimeText";
import FadedView from "../components/FadedView";

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
          <FadedView
            visible={isActive && isPaused}
            fadeDuration={400}
            fadeOutDuration={0}
            initialValue={0}
            style={{ marginBottom: insetsBottom / 2 }}
          >
            <CustomButton title="Reset" onPress={handleReset} />
          </FadedView>
          {!isActive ? (
            <CustomButton title="Start" onPress={handleStart} />
          ) : !isPaused ? (
            <CustomButton title="Stop" onPress={handlePause} />
          ) : (
            <CustomButton title="Resume" onPress={handleResume} />
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
}
