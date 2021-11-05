import React from "react";
import { ColorValue, StyleSheet } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { View } from "./tailwind";

export default function SharedBackground({
  title,
  backgroundColor,
}: {
  title: string;
  backgroundColor: ColorValue;
}) {
  return (
    <SharedElement
      id={`${title}.background`}
      style={[StyleSheet.absoluteFillObject]}
    >
      <View
        style={[
          StyleSheet.absoluteFillObject,
          {
            backgroundColor,
          },
        ]}
      />
    </SharedElement>
  );
}
