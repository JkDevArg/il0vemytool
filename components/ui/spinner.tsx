import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useEffect } from "react";
import { useColors } from "@/hooks/use-colors";

export interface SpinnerProps {
  size?: number;
  color?: string;
}

export function Spinner({ size = 40, color }: SpinnerProps) {
  const colors = useColors();
  const spinValue = useSharedValue(0);
  const finalColor = color || colors.primary;

  useEffect(() => {
    spinValue.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, [spinValue]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spinValue.value}deg` }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: 3,
          borderColor: `${finalColor}30`,
          borderTopColor: finalColor,
        }}
      />
    </Animated.View>
  );
}
