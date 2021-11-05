import React from "react";
import { ColorValue, StyleSheet } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import FontInter from "../constants/FontInter";
import { View, Text } from "./tailwind";

export default function SharedBackground({
  title,
  backgroundColor,
}: {
  title: string;
  backgroundColor: ColorValue;
}) {
  return (
    // <SharedElement id={title}>
    //   <Text
    //     className="text-white text-center text-2xl flex-1"
    //     style={{
    //       paddingRight: iconWidth,
    //       textAlign: "center",
    //       fontFamily: FontInter.semiBold,
    //     }}
    //   >
    //     {title}
    //   </Text>
    // </SharedElement>
  );
}
