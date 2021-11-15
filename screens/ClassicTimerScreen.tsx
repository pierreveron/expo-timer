import React, { useRef, useState } from "react";
import { Dimensions, Keyboard, StyleSheet, TextInput } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Header from "../components/Header";
import ScreenWrapper from "../components/ScreenWrapper";
import { View, Text } from "../components/tailwind";
import Colors from "../constants/Colors";
import FontInter from "../constants/FontInter";
import useTimer from "../hooks/useTimer";
import { RootStackScreenProps } from "../types";
import {
  formatTime,
  formatTimeNumber,
  formatTimeString,
  reformatTimeNumber,
} from "../utils/time";

export default function ClassicTimerScreen({
  navigation,
}: RootStackScreenProps<"ClassicTimer">) {
  const [number, setNumber] = useState<number>(60);

  const textInput = useRef<TextInput>(null);

  const onChangeText = (text: string) => {
    setNumber(Number(text));
    if (text.length == 4) {
      Keyboard.dismiss();
      setNumber(reformatTimeNumber(Number(text)));
    }
  };

  const onTextClick = () => {
    if (textInput.current) {
      if (textInput.current.isFocused()) {
        Keyboard.dismiss();
        setNumber(reformatTimeNumber(number));
      } else {
        setNumber(0);
        textInput.current.focus();
      }
    }
  };

  const onScreenClick = () => {
    if (textInput.current) {
      if (textInput.current.isFocused()) {
        Keyboard.dismiss();
        setNumber(reformatTimeNumber(number));
      }
    }
  };

  const {
    timer,
    isActive,
    isPaused,
    handleStart,
    handlePause,
    handleResume,
    handleReset,
    handleCancel,
  } = useTimer(number);

  return (
    <ScreenWrapper
      title="Classic Timer"
      onPress={() => navigation.navigate("Home")}
      backgroundColor={Colors.classicTimer}
    >
      <TouchableWithoutFeedback
        onPress={onScreenClick}
        // accessible={false}
        // style={{ flex: 1 }}
      >
        <View className="h-full items-center justify-center">
          <TouchableWithoutFeedback onPress={onTextClick}>
            <Text
              className="text-white"
              style={{
                fontFamily: FontInter.semiBold,
                fontSize: Dimensions.get("screen").width * 0.2,
                // width: Dimensions.get("screen").width * 0.3,
                // height: 200,
                textAlign: "center",
              }}
            >
              {formatTime(number, false)}
            </Text>
          </TouchableWithoutFeedback>
          <TextInput
            ref={textInput}
            style={{ display: "none" }}
            onChangeText={onChangeText}
            value={number.toString()}
            keyboardType="numeric"
          />
        </View>
      </TouchableWithoutFeedback>
    </ScreenWrapper>
  );
}
