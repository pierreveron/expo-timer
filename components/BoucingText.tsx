import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import FontInter from "../constants/FontInter";
import FadedView from "./FadedView";
import { Text } from "./tailwind";

export default function BouncingText({
  children: text,
  visible,
  fadeDuration,
}: {
  children: string;
  visible: boolean;
  fadeDuration: number;
}) {
  const duration = 1000;

  const offset = useSharedValue(-8);

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: offset.value }],
    };
  });

  useEffect(() => {
    console.log("Text animation started");
    offset.value = withRepeat(
      withTiming(8, {
        duration: duration,
        easing: Easing.linear,
      }),
      -1,
      true
    );
    return () => {
      cancelAnimation(offset);
    };
  }, []);
  return (
    <FadedView
      visible={visible}
      fadeDuration={fadeDuration}
      style={{
        position: "absolute",
        bottom: Dimensions.get("screen").height / 8,
      }}
    >
      <Animated.View style={[style]}>
        <Text
          className="text-white text-2xl"
          style={{
            fontFamily: FontInter.semiBold,
            textAlign: "center",
          }}
        >
          {text}
        </Text>
      </Animated.View>
    </FadedView>
  );
}
