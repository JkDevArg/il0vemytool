import { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";

export function useScanAnimation(isScanning: boolean) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (isScanning) {
      scale.value = withRepeat(
        withTiming(1.5, {
          duration: 1500,
          easing: Easing.out(Easing.cubic),
        }),
        -1,
        true
      );

      opacity.value = withRepeat(
        withTiming(0.2, {
          duration: 1500,
          easing: Easing.out(Easing.cubic),
        }),
        -1,
        true
      );
    } else {
      scale.value = 1;
      opacity.value = 1;
    }
  }, [isScanning, scale, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return animatedStyle;
}
