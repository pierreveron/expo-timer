import * as React from "react";
import { View } from "react-native";
import HomeScreenButton from "../components/HomeScreenButton";
import Colors from "../constants/Colors";
import { RootStackScreenProps } from "../types";

export default function HomeScreen({
  navigation,
}: RootStackScreenProps<"Home">) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      <HomeScreenButton
        title="Stopwatch"
        backgroundColor={Colors.stopwatch}
        onPress={() => {
          navigation.navigate("Stopwatch");
        }}
      />

      <HomeScreenButton
        title="Classic Timer"
        backgroundColor={Colors.classicTimer}
        onPress={() => {
          navigation.navigate("ClassicTimer");
        }}
      />
      <HomeScreenButton
        title="Tabata Timer"
        backgroundColor={Colors.tabataTimer}
        onPress={() => {
          navigation.navigate("TabataTimer");
        }}
      />
      <HomeScreenButton
        title="HIIT Timer"
        backgroundColor={Colors.hiitTimer}
        onPress={() => {
          navigation.navigate("HiitTimer");
        }}
      />
    </View>
  );
}
