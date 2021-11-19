import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BouncingText from "../components/BoucingText";
import CustomButton from "../components/Button";
import ScreenWrapper from "../components/ScreenWrapper";
import { View, Text } from "../components/tailwind";
import TimeText from "../components/TimeText";
import Colors from "../constants/Colors";
import useTimer from "../hooks/useTimer";
import { RootStackScreenProps } from "../types";

export default function ClassicTimerScreen({
  navigation,
}: RootStackScreenProps<"ClassicTimer">) {
  const {
    timer,
    isActive,
    isPaused,
    handleStart,
    handlePause,
    handleResume,
    handleReset,
    handleCancel,
    upTimer,
    downTimer,
  } = useTimer(1800);

  var throttle: NodeJS.Timer | null = null;
  const throttleDuration = 80;

  const handleScroll = (e: WheelEvent) => {
    if (!throttle) {
      const sign = Math.sign(e.deltaY);
      // console.log(e.deltaY);
      const eps =
        Math.abs(Math.floor(e.deltaY)) < 10 ? sign : Math.floor(e.deltaY);
      if (sign == 1) upTimer(eps);
      if (sign == -1) downTimer(eps);
      // console.log("wheeling");
      /* Add: Start a "throttle" timer that prevents next wheel processing
      until timer completed */
      throttle = setTimeout(() => {
        throttle = null;
      }, throttleDuration);
    }
  };

  useEffect(() => {
    return () => {
      console.log("Timer dismounted");
      //Prevents from memory leaks by stopping the 1 second interval
      handleCancel();
    };
  }, []);

  useEffect(() => {
    if (!isActive && !isPaused) {
      window.addEventListener("wheel", handleScroll);
      return () => {
        window.removeEventListener("wheel", handleScroll);
      };
    }
  }, [isActive, isPaused]);

  useEffect(() => {
    if (timer == 0 && isActive) handleReset();
  }, [timer]);

  const { bottom: insetsBottom } = useSafeAreaInsets();
  return (
    <ScreenWrapper
      title="Classic Timer"
      onPress={() => navigation.navigate("Home")}
      backgroundColor={Colors.classicTimer}
    >
      <View className="h-full items-center justify-center">
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
            <>
              <BouncingText>Scroll up to add time, down to reduce</BouncingText>
              <CustomButton
                title="Start"
                onPress={handleStart}
                style={{ marginTop: Dimensions.get("screen").height / 8 }}
              />
            </>
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
