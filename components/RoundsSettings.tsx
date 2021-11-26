import React from "react";
import FadeDuration from "../constants/FadeDuration";
import FontInter from "../constants/FontInter";
import { View, Text, FadedView } from "./tailwind";
import { Slider } from "@miblanchard/react-native-slider";
import TimeText from "./TimeText";
import { useWindowDimensions } from "react-native";

export default function RoundsSettings({
  visible,
  numberRounds,
  workTime,
  restTime,
  setNumberRounds,
  setRestTime,
  setWorkTime,
}: {
  visible: boolean;
  numberRounds: number;
  workTime: number;
  restTime: number;
  setNumberRounds: React.Dispatch<React.SetStateAction<number>>;
  setRestTime: React.Dispatch<React.SetStateAction<number>>;
  setWorkTime: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { width: windowWidth } = useWindowDimensions();
  return (
    <FadedView
      visible={visible}
      className="max-w-xl"
      style={{
        width: windowWidth * 0.8,
        alignItems: "center",
        position: "absolute",
      }}
      fadeDuration={FadeDuration}
      initialValue={0}
    >
      <View className="w-full">
        <View>
          <View className="flex-row justify-between">
            <Text
              className="text-white text-xl"
              style={{
                fontFamily: FontInter.semiBold,
              }}
            >
              Rounds
            </Text>
            <Text
              className="text-white text-xl"
              style={{
                fontFamily: FontInter.semiBold,
              }}
            >
              {numberRounds}
            </Text>
          </View>
          <Slider
            value={numberRounds}
            onValueChange={(value) => {
              if (typeof value === "number") setNumberRounds(value);
              else setNumberRounds(value[0]);
            }}
            maximumValue={60}
            minimumValue={1}
            step={1}
          />
        </View>
        <View>
          <View className="flex-row justify-between">
            <Text
              className="text-white text-xl"
              style={{
                fontFamily: FontInter.semiBold,
              }}
            >
              Work period
            </Text>
            <TimeText>{workTime}</TimeText>
          </View>
          <Slider
            value={workTime}
            onValueChange={(value) => {
              if (typeof value === "number") setWorkTime(value);
              else setWorkTime(value[0]);
            }}
            maximumValue={120}
            minimumValue={10}
            step={1}
          />
        </View>
        <View>
          <View className="flex-row justify-between">
            <Text
              className="text-white text-xl"
              style={{
                fontFamily: FontInter.semiBold,
              }}
            >
              Rest period
            </Text>
            <TimeText>{restTime}</TimeText>
          </View>
          <Slider
            value={restTime}
            onValueChange={(value) => {
              if (typeof value === "number") setRestTime(value);
              else setRestTime(value[0]);
            }}
            maximumValue={120}
            minimumValue={0}
            step={1}
          />
        </View>
      </View>
    </FadedView>
  );
}
