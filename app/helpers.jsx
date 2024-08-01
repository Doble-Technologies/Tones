import styled from 'styled-components';
import Constants from 'expo-constants';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const StatusBarHeight = Constants.statusBarHeight;

export const StyledContainer = styled.View`
  flex: 1;
  padding: 25px;
  padding-top: ${StatusBarHeight + 10}px;
`;

export const InnerContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const StyledFormArea = styled.View`
  padding-top: 10px;
  width: 90%;
`;

export const Title = styled.Text`
  text-align: center;
  padding: 10px 10px 0px 10px;
  font-size: 30px;
  font-wieght: bold;
`;

export const SubTitle = styled.Text`
  text-align: center;
  font-size: 15px;
`;

export const PageImage = styled.Image``;

export const StyledTextInput = styled.TextInput`
  background-color: #E5E7EB;
  padding: 15px 55px 15px 55px;
  border-radius: 5px;
  font-size: 16px;
  height: 60px;
  margin-vertical: 3px;
  margin-bottom: 10px;
`;

export const StyledInputLabel =  styled.Text`
  font-size: 13px;
  text-align: left;
`;

export const LeftIcon = styled.View`
  left: 15px;
  top: 32px;
  position: absolute;
  z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
  right: 15px;
  top: 32px;
  position: absolute;
  z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: red;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-vertical: 5px;
  height: 60px;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: 450;
  color: white;
`;

export const MessageBox = styled.Text`
  text-align: center;
  font-size: 13px;
`

export const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: 'gray';
  margin-vertical: 10px;
`

export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`

export const ExtraText = styled.Text`
  justify0content: center;
  align-content: center;
  font-size: 15px;
`

export const TextLink = styled.TouchableOpacity`
  justify-content: center;
  align-content: center;
`

export const TextLinkContent = styled.Text`
  color: red;
  font-size: 15px;
`

export const LoginTextInput = ({
  label, 
  icon, 
  isPassword = false, 
  hidePassword = true, 
  setHidePassword = (boolean) => {},
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Ionicons name={icon} size={30} color='red' />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword ? (
        <RightIcon onPress={() => {setHidePassword(!hidePassword)}}>
          <Ionicons name={hidePassword ? 'eye-off-outline' : 'eye-outline'} size={30} color="gray" />
        </RightIcon>
      ) : null}
    </View>
  )
}

export const LoginDropdownInput = ({
  label, 
  icon,
  selectedValue,
  onValueChange,
  items,
}) => {
  return (
    <View>
      <StyledInputLabel>{label}</StyledInputLabel>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
      >
        {items.map((provider) => {
          return <Picker.Item label={provider.label} value={provider.value} key={provider.value} />
        })}
      </Picker>
    </View>
  )
}