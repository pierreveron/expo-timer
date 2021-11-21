import React, { useEffect } from "react";
import BottomButtons from "../components/BottomButtons";
import BouncingText from "../components/BoucingText";
import FadedView from "../components/FadedView";
import FinishedText from "../components/FinishedText";
import ScreenWrapper from "../components/ScreenWrapper";
import { View } from "../components/tailwind";
import TimeText from "../components/TimeText";
import Colors from "../constants/Colors";
import FadeDuration from "../constants/FadeDuration";
import useClassicTimer from "../hooks/useClassicTimer";
import { RootStackScreenProps } from "../types";

export default function ClassicTimerScreen({
  navigation,
}: RootStackScreenProps<"ClassicTimer">) {
  const {
    timer,
    isActive,
    isPaused,
    isFinished,
    handleStart,
    handlePause,
    handleResume,
    handleReset,
    upTimer,
    downTimer,
  } = useClassicTimer(1800);

  var throttle: NodeJS.Timer | null = null;
  const throttleDuration = 80;

  const handleScroll = (e: WheelEvent) => {
    if (!throttle) {
      const sign = Math.sign(e.deltaY);
      const eps =
        Math.abs(Math.floor(e.deltaY)) < 10 ? sign : Math.floor(e.deltaY);
      if (sign == 1) upTimer(eps);
      if (sign == -1) downTimer(eps);
      /* Add: Start a "throttle" timer that prevents next wheel processing
      until timer completed */
      throttle = setTimeout(() => {
        throttle = null;
      }, throttleDuration);
    }
  };

  useEffect(() => {
    if (!isActive && !isPaused) {
      window.addEventListener("wheel", handleScroll);
      return () => {
        window.removeEventListener("wheel", handleScroll);
      };
    }
  }, [isActive, isPaused]);

  return (
    <ScreenWrapper
      title="Classic Timer"
      onPress={() => navigation.navigate("Home")}
      backgroundColor={Colors.classicTimer}
    >
      <View className="h-full items-center justify-center">
        <FinishedText visible={isFinished} fadeDuration={FadeDuration} />
        <FadedView visible={!isFinished} fadeDuration={FadeDuration}>
          <TimeText big>{timer}</TimeText>
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
          handleStart={handleStart}
          handlePause={handlePause}
          handleResume={handleResume}
        />
      </View>
    </ScreenWrapper>
  );
}
