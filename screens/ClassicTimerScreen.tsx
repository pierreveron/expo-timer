import React from "react";
import { View } from "react-native";
import Header from "../components/Header";
import ScreenWrapper from "../components/ScreenWrapper";
import Colors from "../constants/Colors";
import { RootStackScreenProps } from "../types";

export default function ClassicTimerScreen({
  navigation,
}: RootStackScreenProps<"ClassicTimer">) {
  return (
    <ScreenWrapper
      title="Classic Timer"
      onPress={() => navigation.navigate("Home")}
      backgroundColor={Colors.classicTimer}
    ></ScreenWrapper>
  );
}
