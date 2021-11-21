import React, { useEffect, useRef, useState } from "react";
import {
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
} from "react-native";
import BouncingText from "../components/BoucingText";
import ScreenWrapper from "../components/ScreenWrapper";
import { View } from "../components/tailwind";
import Colors from "../constants/Colors";
import useHiitTimer from "../hooks/useHiitTimer";
import { RootStackScreenProps } from "../types";
import FinishedText from "../components/FinishedText";
import BottomButtons from "../components/BottomButtons";
import FadeDuration from "../constants/FadeDuration";
import TimerWithRounds from "../components/TimerWithRounds";
import RoundsSettings from "../components/RoundsSettings";

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
    isRest,
    isFinished,
    handleStart,
    handlePause,
    handleResume,
    handleReset,
    setNumberRounds,
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
        <TimerWithRounds
          timer={timer}
          totalTime={totalTime}
          visible={!isFinished && !isSettingsShown}
          isRest={isRest}
          round={round}
          numberRounds={numberRounds}
          restTime={restTime}
          workTime={workTime}
          roundTime={roundTime}
        />
        <FinishedText visible={isFinished} fadeDuration={FadeDuration} />
        <RoundsSettings
          visible={!isFinished && isSettingsShown}
          numberRounds={numberRounds}
          workTime={workTime}
          restTime={restTime}
          setNumberRounds={setNumberRounds}
          setRestTime={setRestTime}
          setWorkTime={setWorkTime}
        />
        <BouncingText
          visible={!isActive && !isPaused}
          fadeDuration={FadeDuration}
        >
          Tap the screen to change the settings
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
