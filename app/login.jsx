import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Tabs, Link } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import {
  StyledContainer,
  InnerContainer,
  StyledFormArea,
  Title,
  SubTitle,
  PageImage,
  StyledButton,
  ButtonText,
  MessageBox,
  Line,
  ExtraView,
  ExtraText,
  TextLinkContent,
  LoginTextInput
} from './helpers.jsx';

export default function TabLayout() {
    const colorScheme = useColorScheme();
  
    const [login, setLogin] = useState(false);
    const [hidePassword, setHidePassword] = useState(true);
  
    return (
      <React.Fragment>
        {login ? (
          <Tabs
            screenOptions={{
              tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint
            }}>
            <Tabs.Screen
              name="index"
              options={{
                title: 'Home',
                tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="explore"
              options={{
                title: 'Explore',
                tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
                ),
              }}
            />
          </Tabs>
        ) : (
          <StyledContainer>
            <StatusBar style="dark" />
            <SafeAreaView />
            <InnerContainer>
              <PageImage resizeMode="cover" source={require('./../assets/images/tones-logo.png')} />
              <Title>Tones</Title>
              <SubTitle>Account Login</SubTitle>
  
              <Formik
                initialValues={{ number: '', password: '' }}
                onSubmit={(values) => {
                  console.log(values);
                }}
              >
                {({handleChange, handleBlur, handleSubmit, values}) => (
                  <StyledFormArea>
                    <LoginTextInput 
                      label="Phone Number"
                      icon="call-outline"
                      placeholder="123-456-7890"
                      placeholderTextColor="gray"
                      onChangeText={handleChange('number')}
                      onBlur={handleBlur('number')}
                      value={values.number}
                      keyboardType="number-pad"
                    />
                    <LoginTextInput 
                      label="Password"
                      icon="lock-closed-outline"
                      placeholder="* * * * * *"
                      placeholderTextColor="gray"
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      secureTextEntry={hidePassword}
                      isPassword
                      hidePassword={hidePassword}
                      setHidePassword={setHidePassword}
                    />
                    <MessageBox>...</MessageBox>
                    <StyledButton onPress={handleSubmit}>
                      <ButtonText>Login</ButtonText>
                    </StyledButton>
                    <Line />
                    <ExtraView>
                      <ExtraText>Don't have an account already? </ExtraText>
                      <Link href='./register'>
                        <TextLinkContent>Register</TextLinkContent>
                      </Link>
                    </ExtraView>
                  </StyledFormArea>
                )}
              </Formik>
            </InnerContainer>
          </StyledContainer>
        )}
      </React.Fragment>
    );
  }