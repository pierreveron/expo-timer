import React from "react";
import { SharedElement } from "react-navigation-shared-element";
import FontInter from "../constants/FontInter";
import { Text } from "./tailwind";

export default function SharedTitle({ title }: { title: string }) {
  return (
    <SharedElement id={title}>
      <Text
        className="text-white text-center text-2xl"
        style={{
          fontFamily: FontInter.semiBold,
        }}
      >
        {title}
      </Text>
    </SharedElement>
  );
}
