import { View, ViewStyle } from "react-native";
import { ReactNode } from "react";

interface RowProps {
  children?: ReactNode | ReactNode[];
  backgroundColor?: string;
  style?: ViewStyle | ViewStyle[];
}

export const Row = ({
  children,
  backgroundColor,
  style,
}: RowProps) => {
  return (
    <View style={[
        { flexDirection: 'row', alignItems: 'center' }, 
        { backgroundColor }, 
        style
    ]}>
      {children}
    </View>
  )
};