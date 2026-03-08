import { View, Text, type ViewProps } from "react-native";
import { cn } from "@/lib/utils";

export interface StatProps extends ViewProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function Stat({
  label,
  value,
  unit,
  icon,
  className,
  ...props
}: StatProps) {
  return (
    <View
      className={cn(
        "bg-surface border border-border rounded-lg p-4",
        className
      )}
      {...props}
    >
      <View className="flex-row items-center gap-2 mb-2">
        {icon && <View>{icon}</View>}
        <Text className="text-xs text-muted font-medium">{label}</Text>
      </View>
      <View className="flex-row items-baseline gap-1">
        <Text className="text-2xl font-bold text-foreground">{value}</Text>
        {unit && <Text className="text-sm text-muted">{unit}</Text>}
      </View>
    </View>
  );
}
