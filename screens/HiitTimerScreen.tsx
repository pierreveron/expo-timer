import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Animated,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BouncingText from "../components/BoucingText";
import CustomButton from "../components/Button";
import Header from "../components/Header";
import ScreenWrapper from "../components/ScreenWrapper";
import { View, Text } from "../components/tailwind";
import TimeText from "../components/TimeText";
import Colors from "../constants/Colors";
import FontInter from "../constants/FontInter";
import useFade from "../hooks/useFade";
import useHiitTimer from "../hooks/useHiitTimer";
import useUpdateEffect from "../hooks/useUpdateEffect";
import { RootStackScreenProps } from "../types";
import { formatTime } from "../utils/time";
import { Slider } from "@miblanchard/react-native-slider";
import FadedView from "../components/FadedView";
import FinishedText from "../components/FinishedText";
import BottomButtons from "../components/BottomButtons";
import FadeDuration from "../constants/FadeDuration";

export default function HiitTimerScreen({
  navigation,
}: RootStackScreenProps<"HiitTimer">) {
  const {
    totalTime,
    workTime,
    roundTime,
    restTime,
    timer,
    isActive,
    isPaused,
    round,
    numberRounds,
    setNumberRounds,
    isRest,
    isFinished,
    handleStart,
    handlePause,
    handleResume,
    handleReset,
    setRestTime,
    setWorkTime,
  } = useHiitTimer();

  const isActiveRef = useRef(isActive);

  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  const [isSettingsShown, setIsSettingsShown] = useState(false);
  const onScreenTap = () => {
    if (!isActiveRef.current) setIsSettingsShown((v) => !v);
  };

  const onPanResponderRelease = (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => {
    console.log("release");
    if (gestureState.dx == 0 && gestureState.dy == 0) onScreenTap();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: onPanResponderRelease,
    })
  ).current;

  return (
    <ScreenWrapper
      title="HIIT Timer"
      onPress={() => navigation.navigate("Home")}
      backgroundColor={Colors.hiitTimer}
    >
      <View
        className="h-full items-center justify-center"
        {...panResponder.panHandlers}
      >
        {/* WorkoutView */}
        <FadedView
          visible={!isFinished && !isSettingsShown}
          style={{
            width: "100%",
            alignItems: "center",
          }}
          fadeDuration={FadeDuration}
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
            Round {round}/{numberRounds}
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
        </FadedView>
        <FinishedText visible={isFinished} fadeDuration={FadeDuration} />
        {/* SettingsView */}
        <FadedView
          visible={!isFinished && isSettingsShown}
          style={{
            width: "100%",
            alignItems: "center",
            position: "absolute",
          }}
          fadeDuration={FadeDuration}
          initialValue={0}
        >
          <View className="w-full px-8">
            <View>
              <View className="flex-row justify-between">
                <Text
                  className="text-white text-xl"
                  style={{
                    fontFamily: FontInter.semiBold,
                    // fontSize: Dimensions.get("screen").width * 0.1,
                  }}
                >
                  Rounds
                </Text>
                <Text
                  className="text-white text-xl"
                  style={{
                    fontFamily: FontInter.semiBold,
                    // fontSize: Dimensions.get("screen").width * 0.1,
                  }}
                >
                  {numberRounds}
                </Text>
              </View>
              <Slider
                value={numberRounds}
                onValueChange={(value) => {
                  if (typeof value === "number") setNumberRounds(value);
                  else setNumberRounds(value[0]);
                }}
                maximumValue={60}
                minimumValue={1}
                step={1}
              />
            </View>
            <View>
              <View className="flex-row justify-between">
                <Text
                  className="text-white text-xl"
                  style={{
                    fontFamily: FontInter.semiBold,
                    // fontSize: Dimensions.get("screen").width * 0.1,
                  }}
                >
                  Work period
                </Text>
                <Text
                  className="text-white text-xl"
                  style={{
                    fontFamily: FontInter.semiBold,
                    // fontSize: Dimensions.get("screen").width * 0.1,
                  }}
                >
                  {formatTime(workTime)}
                </Text>
              </View>
              <Slider
                value={workTime}
                onValueChange={(value) => {
                  if (typeof value === "number") setWorkTime(value);
                  else setWorkTime(value[0]);
                }}
                maximumValue={120}
                minimumValue={10}
                step={1}
              />
            </View>
            <View>
              <View className="flex-row justify-between">
                <Text
                  className="text-white text-xl"
                  style={{
                    fontFamily: FontInter.semiBold,
                    // fontSize: Dimensions.get("screen").width * 0.1,
                  }}
                >
                  Rest period
                </Text>
                <Text
                  className="text-white text-xl"
                  style={{
                    fontFamily: FontInter.semiBold,
                    // fontSize: Dimensions.get("screen").width * 0.1,
                  }}
                >
                  {formatTime(restTime)}
                </Text>
              </View>
              <Slider
                value={restTime}
                onValueChange={(value) => {
                  if (typeof value === "number") setRestTime(value);
                  else setRestTime(value[0]);
                }}
                maximumValue={120}
                minimumValue={0}
                step={1}
              />
            </View>
          </View>
        </FadedView>
        <BouncingText
          visible={!isActive && !isPaused}
          fadeDuration={FadeDuration}
        >
          Swipe up to add time, down to reduce
        </BouncingText>
        <BottomButtons
          isActive={isActive}
          isPaused={isPaused}
          isFinished={isFinished}
          handleReset={handleReset}
          handleStart={() => {
            setIsSettingsShown(false);
            handleStart();
          }}
          handlePause={handlePause}
          handleResume={handleResume}
        />
      </View>
    </ScreenWrapper>
  );
}
