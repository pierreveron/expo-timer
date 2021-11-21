import React, { useEffect } from "react";
import Header from "./Header";
import { Animated, ColorValue } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SharedBackground from "./SharedBackgound";
import useFade from "../hooks/useFade";

export default function ScreenWrapper({
  title,
  onPress,
  children,
  backgroundColor,
}: {
  title: string;
  onPress: () => void;
  backgroundColor: ColorValue;
  children?: React.ReactNode;
}) {
  const fadeInDuration = 400;
  const fadeOutDuration = 80;
  const { fadeAnim, fadeIn, fadeOut } = useFade(
    0,
    fadeInDuration,
    fadeOutDuration
  );

  useEffect(() => {
    setTimeout(() => {
      fadeIn();
    }, fadeInDuration);
  }, []);
  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={{ flex: 1 }}>
      <SharedBackground title={title} backgroundColor={backgroundColor} />
      <Header
        title={title}
        onPress={() => {
          fadeOut();
          setTimeout(() => {
            onPress();
          }, fadeOutDuration);
        }}
        fadeAnim={fadeAnim}
      />
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        {children}
      </Animated.View>
    </SafeAreaView>
  );
}
