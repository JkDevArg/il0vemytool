import { Pressable, Text, View, type PressableProps } from "react-native";
import { cn } from "@/lib/utils";
import { useColors } from "@/hooks/use-colors";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

export interface ButtonProps extends Omit<PressableProps, "style"> {
  variant?: "primary" | "secondary" | "accent" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  disabled?: boolean;
  haptic?: boolean;
  className?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  disabled = false,
  haptic = true,
  className,
  onPress,
  ...props
}: ButtonProps) {
  const colors = useColors();

  const handlePress = (e: any) => {
    if (!disabled && haptic && Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress?.(e);
  };

  const variantStyles = {
    primary: "bg-primary",
    secondary: "bg-accent",
    accent: "bg-highlight",
    danger: "bg-error",
    outline: "bg-transparent border border-primary",
  };

  const sizeStyles = {
    sm: "px-3 py-2",
    md: "px-6 py-3",
    lg: "px-8 py-4",
  };

  const textColorMap = {
    primary: "text-background",
    secondary: "text-background",
    accent: "text-background",
    danger: "text-background",
    outline: "text-primary",
  };

  return (
    <Pressable
      disabled={disabled}
      onPress={handlePress}
      style={({ pressed }) => [
        {
          opacity: pressed && !disabled ? 0.8 : 1,
          transform: [{ scale: pressed && !disabled ? 0.97 : 1 }],
        },
      ]}
      {...props}
    >
      <View
        className={cn(
          "rounded-lg items-center justify-center",
          variantStyles[variant],
          sizeStyles[size],
          disabled && "opacity-50",
          className
        )}
      >
        {typeof children === "string" ? (
          <Text className={cn("font-semibold", textColorMap[variant])}>
            {children}
          </Text>
        ) : (
          children
        )}
      </View>
    </Pressable>
  );
}
