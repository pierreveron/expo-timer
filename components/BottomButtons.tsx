import React from "react";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomButton from "./CustomButton";
import FadedView from "./FadedView";

export default function BottomButtons({
  isActive,
  isPaused,
  isFinished,
  handleReset,
  handleStart,
  handlePause,
  handleResume,
}: {
  isActive: boolean;
  isPaused: boolean;
  isFinished?: boolean;
  handleReset: () => void;
  handleStart: () => void;
  handlePause: () => void;
  handleResume: () => void;
}) {
  const insetsBottom = Platform.OS === "ios" || Platform.OS === "android" ? useSafeAreaInsets().bottom : 20;
  return (
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
      >
        <CustomButton
          title="Reset"
          onPress={handleReset}
          style={{ marginBottom: insetsBottom / 2 }}
        />
      </FadedView>
      {!!isFinished ? (
        <CustomButton title="Reset" onPress={handleReset} />
      ) : !isActive ? (
        <CustomButton title="Start" onPress={handleStart} />
      ) : !isPaused ? (
        <CustomButton title="Stop" onPress={handlePause} />
      ) : (
        <CustomButton title="Resume" onPress={handleResume} />
      )}
    </View>
  );
}
