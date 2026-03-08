import { View, type ViewProps } from "react-native";
import { cn } from "@/lib/utils";

export interface CardProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "outlined";
}

export function Card({
  children,
  className,
  variant = "default",
  ...props
}: CardProps) {
  const variantStyles = {
    default: "bg-surface border border-border",
    elevated: "bg-surface shadow-lg",
    outlined: "bg-transparent border border-border",
  };

  return (
    <View
      className={cn(
        "rounded-lg p-4",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
}

export function CardHeader({
  children,
  className,
  ...props
}: ViewProps) {
  return (
    <View className={cn("mb-3", className)} {...props}>
      {children}
    </View>
  );
}

export function CardContent({
  children,
  className,
  ...props
}: ViewProps) {
  return (
    <View className={cn("", className)} {...props}>
      {children}
    </View>
  );
}

export function CardFooter({
  children,
  className,
  ...props
}: ViewProps) {
  return (
    <View className={cn("mt-4 pt-4 border-t border-border", className)} {...props}>
      {children}
    </View>
  );
}
