import { useRef } from "react";
import { Animated } from "react-native";


export default function useFade(initialValue: number, fadeDuration: number, fadeOutDuration?: number) {
    const fadeAnim = useRef(new Animated.Value(initialValue)).current;

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: fadeDuration,
            useNativeDriver: false,
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: fadeOutDuration ?? fadeDuration,
            useNativeDriver: false,
        }).start();
    };

    return { fadeAnim, fadeIn, fadeOut }
}