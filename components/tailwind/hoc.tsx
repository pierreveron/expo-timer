import * as React from "react";
import * as RN from "react-native";
import tailwind from "tailwind-rn";

interface WithTailwindProps {
  className?: string;
  children?: React.ReactNode;
}

interface StyleProps {
  style?: RN.StyleProp<any>;
}

export function withTailwind<T extends StyleProps>(
  WrappedComponent: React.ComponentType<T>
) {
  const ComponentWithTailwind = (props: T & WithTailwindProps) => {
    const { className, style, ...otherProps } = props;
    // props comes afterwards so the can override the default ones.
    return (
      <WrappedComponent
        //applying style with override tailwind
        style={[tailwind(className ?? ""), style]}
        {...(otherProps as T)}
      />
    );
  };

  // Try to create a nice displayName for React Dev Tools.
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";
  ComponentWithTailwind.displayName = `withTailwind(${displayName})`;

  return ComponentWithTailwind;
}
