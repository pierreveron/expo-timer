import React, { useRef, useState } from "react";
import { Animated, StyleProp, ViewStyle } from "react-native";
import useFade from "../hooks/useFade";
import useUpdateEffect from "../hooks/useUpdateEffect";

export default function FadedView({
  initialValue = 1,
  visible,
  style,
  children,
  fadeDuration,
  fadeOutDuration,
}: {
  initialValue?: number;
  visible: boolean;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  fadeDuration: number;
  fadeOutDuration?: number;
}) {
  const [showView, setShowView] = useState(visible);
  const { fadeAnim, fadeIn, fadeOut } = useFade(initialValue, fadeDuration);
  const timeoutRef = useRef<NodeJS.Timer | null>(null);

  useUpdateEffect(() => {
    fadeAnim.stopAnimation();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (visible) {
      setShowView(true);
      fadeIn();
    } else {
      fadeOut();
      timeoutRef.current = setTimeout(
        () => setShowView(false),
        fadeOutDuration ?? fadeDuration
      );
    }
  }, [visible]);

  return (
    <Animated.View style={[{ opacity: fadeAnim }, style]}>
      {showView && children}
    </Animated.View>
  );
}
