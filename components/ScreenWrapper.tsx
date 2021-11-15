import React, { useEffect, useRef } from "react";
import Header from "./Header";
import { Animated, ColorValue } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SharedBackground from "./SharedBackgound";

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
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeInDuration = 400;
  const fadeOutDuration = 80;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: fadeInDuration,
      useNativeDriver: false,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: fadeOutDuration,
      useNativeDriver: false,
    }).start();
  };

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
