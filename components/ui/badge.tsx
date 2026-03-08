import { View, Text, type ViewProps } from "react-native";
import { cn } from "@/lib/utils";

export interface BadgeProps extends ViewProps {
  children: React.ReactNode;
  variant?: "secure" | "vulnerable" | "critical" | "warning" | "unknown" | "default";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className,
  ...props
}: BadgeProps) {
  const variantStyles = {
    secure: "bg-highlight/20 border border-highlight",
    vulnerable: "bg-warning/20 border border-warning",
    critical: "bg-error/20 border border-error",
    warning: "bg-warning/20 border border-warning",
    unknown: "bg-muted/20 border border-muted",
    default: "bg-primary/20 border border-primary",
  };

  const textColorMap = {
    secure: "text-highlight",
    vulnerable: "text-warning",
    critical: "text-error",
    warning: "text-warning",
    unknown: "text-muted",
    default: "text-primary",
  };

  return (
    <View
      className={cn(
        "px-3 py-1 rounded-full",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {typeof children === "string" ? (
        <Text className={cn("text-xs font-semibold", textColorMap[variant])}>
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
}
