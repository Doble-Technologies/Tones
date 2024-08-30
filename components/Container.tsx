import { View, ViewStyle } from "react-native";

interface ContainerProps {
  children?: React.ReactNode;
  backgroundColor?: string;
  style?: ViewStyle;
}
export const Container = ({
  children,
  backgroundColor,
  style,
}: ContainerProps) => {
  return (
    <View style={[
        { flex: 1 }, 
        { backgroundColor }, 
        style
    ]}>{children}</View>
  )
};