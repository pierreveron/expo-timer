import React from "react";
import { View, Text } from "react-native";
import Header from "../components/Header";
import ScreenWrapper from "../components/ScreenWrapper";
import Colors from "../constants/Colors";
import { RootStackScreenProps } from "../types";

export default function HiitTimerScreen({
  navigation,
}: RootStackScreenProps<"HiitTimer">) {
  return (
    <ScreenWrapper
      title="HIIT Timer"
      onPress={() => navigation.navigate("Home")}
      backgroundColor={Colors.hiitTimer}
    ></ScreenWrapper>
  );
}
