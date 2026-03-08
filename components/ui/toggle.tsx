import { Pressable, View, type PressableProps } from "react-native";
import { cn } from "@/lib/utils";
import { useColors } from "@/hooks/use-colors";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

export interface ToggleProps extends Omit<PressableProps, "style"> {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function Toggle({
  value,
  onValueChange,
  disabled = false,
  className,
  ...props
}: ToggleProps) {
  const colors = useColors();

  const handlePress = () => {
    if (!disabled) {
      if (Platform.OS !== "web") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      onValueChange(!value);
    }
  };

  return (
    <Pressable
      disabled={disabled}
      onPress={handlePress}
      {...props}
    >
      <View
        className={cn(
          "w-14 h-8 rounded-full flex-row items-center px-1",
          value ? "bg-primary" : "bg-muted/30",
          disabled && "opacity-50",
          className
        )}
      >
        <View
          className={cn(
            "w-6 h-6 rounded-full bg-background",
            value ? "ml-auto" : "ml-0"
          )}
        />
      </View>
    </Pressable>
  );
}
