import styled from 'styled-components';
import Constants from 'expo-constants';
import { View, Text, LayoutAnimation, Image, TextInput, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Row } from '../components/Row';
import { Container } from '../components/Container';

const StatusBarHeight = Constants.statusBarHeight;

export const StyledContainer = styled.View`
  flex: 1;
  padding: 25px;
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

const ProviderDropdown = styled.TouchableOpacity`
  background-color: #E5E7EB;
  padding: 15px 55px 15px 55px;
  border-radius: 5px;
  font-size: 16px;
  height: 60px;
  margin-vertical: 3px;
  margin-bottom: 10px;
`

export const providerMenu = {
  menuName: 'providerList',
  placeholder: 'Select Provider',
  iconColor: 'red',
  iconName: 'globe-outline',
  dropdownList: [
    { label: 'AllTel', value: 'alltel' },
    { label: 'AT&T', value: 'att' },
    { label: 'AT&T MMS', value: 'attmms' },
    { label: 'Boost', value: 'boost' },
    { label: 'Boost MMS', value: 'boostmms' },
    { label: 'C Spire', value: 'c' },
    { label: 'Consumer Cellular', value: 'consumer' },
    { label: 'Cricket', value: 'cricket' },
    { label: 'Cricket MMS', value: 'cricketmms' },
    { label: 'Google Fi', value: 'googlefi' },
    { label: 'Mint Mobile', value: 'mint' },
    { label: 'MetroPCS', value: 'metro' },
    { label: 'Optimum', value: 'optimum' },
    { label: 'Republic Wireless', value: 'republic' },
    { label: 'Spectrum', value: 'spectrum' },
    { label: 'Sprint', value: 'sprint' },
    { label: 'Sprint MMS', value: 'sprintmms' },
    { label: 'Ting', value: 'ting' },
    { label: 'T-Mobile', value: 'tmobile' },
    { label: 'TracFone', value: 'tracfone' },
    { label: 'US Cellular', value: 'us' },
    { label: 'US Cellular MMS', value: 'usmms' },
    { label: 'Verizon', value: 'verizon' },
    { label: 'Verizon MMS', value: 'verizonmms' },
    { label: 'VerizonBiz', value: 'verizonbiz' },
    { label: 'Virgin', value: 'virgin' },
    { label: 'Virgin MMS', value: 'virginmms' },
  ]
}

const providerConversion = {
  alltel: 'AllTel',
  att: 'AT&T',
  attmms: 'AT&T MMS',
  boost: 'Boost',
  boostmms: 'Boost MMS',
  c: 'C Spire',
  consumer: 'Consumer Cellular',
  cricket: 'Cricket',
  cricketmms: 'Cricket MMS',
  googlefi: 'Google Fi',
  mint: 'Mint Mobile',
  metro: 'MetroPCS',
  optimum: 'Optimum',
  republic: 'Republic Wireless',
  spectrum: 'Spectrum',
  sprint: 'Sprint',
  sprintmms: 'Sprint MMS',
  ting: 'Ting',
  tmobile: 'T-Mobile',
  tracfone: 'TracFone',
  us: 'US Cellular',
  usmms: 'US Cellular MMS',
  verizon: 'Verizon',
  verizonmms: 'Verizon MMS',
  verizonbiz: 'VerizonBiz',
  virgin: 'Virgin',
  virginmms: 'Virgin MMS',
}

export const PageHeader = ({
  children 
}) => {
  return (
    <View style={{ position: 'sticky', top: 0, backgroundColor: '#ECEDEE', zIndex: 1, marginBottom: -80 }}>
      <View style={{ flexDirection: 'row', height: 80, alignItems: 'flex-end' }}>
        {children}
      </View>
    </View>
  )
}

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

export const TestLoginDropDownInput = ({
  label,
  isOpen,
  setOpen,
  selectedValue,
  onValueChange,
  menu
}) => {
  return (
    <Container>
      <StyledInputLabel>{label}</StyledInputLabel>
      <TouchableOpacity activeOpacity={0.8} key={`${menu.menuName}2`}
        style={{ 
          backgroundColor: '#E5E7EB',
          // marginHorizontal: constant.SPACING / 1.7,
          // marginVertical: constant.SPACING / 2.5,
          borderRadius: '5px',
        }}
        onPress={() => {
          // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
          LayoutAnimation.configureNext(LayoutAnimation.create(200, 'easeInEaseOut', 'opacity'))
          isOpen ? setOpen(false) : setOpen(true);
        }}>
        <Row style={{
          // paddingHorizontal: constant.SPACING / 1.5,
          // paddingVertical: constant.SPACING / 1.2,
        }}>
          <Ionicons 
            name={menu.iconName} 
            size={30}
            color={menu.iconColor} 
          />
          <Text style={{
            // fontSize: constant.textFontSize,
            // paddingHorizontal: constant.SPACING
          }}>
            {selectedValue ? providerConversion[selectedValue] : menu.placeholder}
          </Text>
        </Row>
        {isOpen && <View style={{ borderRadius: '5px', backgroundColor: '#E5E7EB' }}>
          {menu.dropdownList.map((subMenu, index) => (
            <TouchableNativeFeedback key={index}>
              <View style={{
                // paddingHorizontal: constant.SPACING,
                // paddingVertical: constant.SPACING / 1.5,
              }}>
                <Text>{subMenu.label}</Text>
              </View>
            </TouchableNativeFeedback>
          ))}
        </View>}
      </TouchableOpacity>
    </Container>
  )
}