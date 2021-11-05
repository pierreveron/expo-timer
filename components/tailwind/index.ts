import * as RN from "react-native";
import { withTailwind } from "./hoc";

export const View = withTailwind(RN.View);
export const Text = withTailwind(RN.Text);
export const TouchableOpacity = withTailwind(RN.TouchableOpacity);
export const TouchableHighlight = withTailwind(RN.TouchableHighlight);
export const TextInput = withTailwind(RN.TextInput)
export const Image = withTailwind(RN.Image)