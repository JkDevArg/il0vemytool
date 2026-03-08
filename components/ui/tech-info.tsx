import { View, Text, type ViewProps } from "react-native";
import { cn } from "@/lib/utils";
import { useColors } from "@/hooks/use-colors";

export interface TechInfoProps extends ViewProps {
  label: string;
  value: string | number;
  monospace?: boolean;
  className?: string;
}

export function TechInfo({
  label,
  value,
  monospace = false,
  className,
  ...props
}: TechInfoProps) {
  const colors = useColors();

  return (
    <View className={cn("flex-row items-center justify-between py-2", className)} {...props}>
      <Text className="text-xs text-muted">{label}</Text>
      <Text
        className={cn(
          "text-sm text-foreground",
          monospace && "font-mono"
        )}
      >
        {value}
      </Text>
    </View>
  );
}

export interface TerminalCardProps extends ViewProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function TerminalCard({
  title,
  children,
  className,
  ...props
}: TerminalCardProps) {
  return (
    <View
      className={cn(
        "bg-secondary border border-border rounded-lg overflow-hidden",
        className
      )}
      {...props}
    >
      <View className="bg-border px-4 py-2 border-b border-border">
        <Text className="text-xs font-mono text-primary">$ {title}</Text>
      </View>
      <View className="p-4">{children}</View>
    </View>
  );
}
