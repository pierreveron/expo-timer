import React, { useEffect, useRef } from "react";
import {
  Dimensions,
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BouncingText from "../components/BoucingText";
import CustomButton from "../components/Button";
import ScreenWrapper from "../components/ScreenWrapper";
import { View } from "../components/tailwind";
import TimeText from "../components/TimeText";
import Colors from "../constants/Colors";
import useClassicTimer from "../hooks/useClassicTimer";
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
    upTimer,
    downTimer,
  } = useClassicTimer(1800);

  const isActiveRef = useRef(isActive);
  const intervalRef = useRef<NodeJS.Timer | null>(null);
  const timeoutRef = useRef<NodeJS.Timer | null>(null);
  const oldDy = useRef(0);
  const halfScreenWidth = Dimensions.get("screen").width / 2;

  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (timer == 0 && isActive) handleReset();
  }, [timer]);

  const onPanResponderStart = (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => {
    console.log("start");
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const onPanResponderRelease = (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => {
    console.log("release");
    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, 200);
    oldDy.current = 0;
  };

  const onPanResponderMove = (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => {
    const { vy, dy, x0 } = gestureState;
    const velocity = Math.abs(vy);
    const sign = Math.sign(oldDy.current - dy);
    const eps = x0 < halfScreenWidth ? 60 : 1;
    const velocityThreshold = 1;

    if (velocity < velocityThreshold && Math.abs(oldDy.current - dy) > 15) {
      if (sign == 1) upTimer(eps);
      if (sign == -1) downTimer(eps);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      oldDy.current = dy;
    }

    if (velocity >= velocityThreshold) {
      if (!intervalRef.current) {
        const intervalDuration = 10;
        if (sign == 1)
          intervalRef.current = setInterval(
            () => upTimer(eps),
            intervalDuration
          );
        if (sign == -1)
          intervalRef.current = setInterval(
            () => downTimer(eps),
            intervalDuration
          );

        oldDy.current = dy;
      }
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !isActiveRef.current,
      onPanResponderStart: onPanResponderStart,
      onPanResponderMove: onPanResponderMove,
      onPanResponderRelease: onPanResponderRelease,
    })
  ).current;

  const { bottom: insetsBottom } = useSafeAreaInsets();
  return (
    <ScreenWrapper
      title="Classic Timer"
      onPress={() => navigation.navigate("Home")}
      backgroundColor={Colors.classicTimer}
    >
      <View
        className="h-full items-center justify-center"
        {...panResponder.panHandlers}
      >
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
            <View className="items-center">
              <BouncingText>Swipe up to add time, down to reduce</BouncingText>
              <CustomButton
                title="Start"
                onPress={handleStart}
                style={{ marginTop: Dimensions.get("screen").height / 8 }}
              />
            </View>
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