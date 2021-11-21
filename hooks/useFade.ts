import { useRef } from "react";
import { Animated } from "react-native";

export default function useFade(initialValue: number, fadeDuration: number, fadeOutDuration?: number) {
    const fadeAnim = useRef(new Animated.Value(initialValue)).current;

    const fadeIn = (callback?: () => void) => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: fadeDuration,
            useNativeDriver: false,
        }).start();
        if (callback)
            setTimeout(callback, fadeOutDuration ?? fadeDuration);
    };

    const fadeOut = (callback?: () => void) => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: fadeOutDuration ?? fadeDuration,
            useNativeDriver: false,
        }).start();
        if (callback)
            setTimeout(callback, fadeOutDuration ?? fadeDuration);
    };

    return { fadeAnim, fadeIn, fadeOut }
}