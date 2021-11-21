/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import { Easing, Platform } from "react-native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import {
  ClassicTimerScreen,
  HiitTimerScreen,
  HomeScreen,
  StopwatchScreen,
  TabataTimerScreen,
} from "../screens";

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createSharedElementStackNavigator<RootStackParamList>();
const options = (): StackNavigationOptions => ({
  gestureEnabled: false,
  transitionSpec: {
    open: {
      animation: "timing",
      config: {
        duration: 400,
        easing: Easing.inOut(Easing.ease),
      },
    },
    close: {
      animation: "timing",
      config: {
        duration: 400,
        easing: Easing.inOut(Easing.ease),
      },
    },
  },
  cardStyleInterpolator: ({
    current: { progress },
  }: {
    current: {
      progress: any;
    };
  }) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
});

function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Stopwatch"
        component={StopwatchScreen}
        sharedElements={(route, otherRoute, showing) => {
          if (Platform.OS === "web") {
            return [];
          }
          return [{ id: "Stopwatch.background" }, { id: "Stopwatch" }];
        }}
        options={options}
      />
      <Stack.Screen
        name="ClassicTimer"
        component={ClassicTimerScreen}
        sharedElements={(route, otherRoute, showing) => {
          if (Platform.OS === "web") {
            return [];
          }
          return [{ id: "Classic Timer.background" }, { id: "Classic Timer" }];
        }}
        options={options}
      />
      <Stack.Screen
        name="TabataTimer"
        component={TabataTimerScreen}
        sharedElements={(route, otherRoute, showing) => {
          if (Platform.OS === "web") {
            return [];
          }
          return [{ id: "Tabata Timer.background" }, { id: "Tabata Timer" }];
        }}
        options={options}
      />
      <Stack.Screen
        name="HiitTimer"
        component={HiitTimerScreen}
        sharedElements={(route, otherRoute, showing) => {
          if (Platform.OS === "web") {
            return [];
          }
          return [{ id: "HIIT Timer.background" }, { id: "HIIT Timer" }];
        }}
        options={options}
      />
    </Stack.Navigator>
  );
}
