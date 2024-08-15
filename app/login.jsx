import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFormik } from 'formik';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Tabs, Link } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import {
  PageHeader,
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
    const [hidePassword, setHidePassword] = useState(true);
    const [loginButtonDisabled, setLoginButtonDisabled] = useState(true);

    const formik = useFormik({
      initialValues: {
        number: '',
        password: ''
      },
      onSubmit: (values) => {
        values.number = values.number.replace(/[()\-\s]/g, '');
        console.log(values);
      },
    });

    const formValues = formik.values;

    useEffect(() => {
      if (formValues) {
        if (formValues.number.length === 14 && formValues.password) {
          setLoginButtonDisabled(false);
        } else {
          setLoginButtonDisabled(true);
        }
      }
    }, [formValues])
  
    return (
      <React.Fragment>
        <PageHeader />
        <StyledContainer>
          <StatusBar style="dark" />
          <SafeAreaView />
          <InnerContainer>
            <PageImage resizeMode="cover" source={require('./../assets/images/tones-logo.png')} />
            <Title>Tones</Title>
            <SubTitle>Account Login</SubTitle>
            <StyledFormArea>
              <LoginTextInput 
                label="Phone Number"
                icon="call-outline"
                placeholder="123-456-7890"
                placeholderTextColor="gray"
                onChangeText={formik.handleChange('number')}
                onBlur={formik.handleBlur('number')}
                value={formik.values.number.replace(/^(\d{3})(\d{3})(\d+)$/, "($1) $2-$3")}
                keyboardType="number-pad"
                maxLength={14}
              />
              <LoginTextInput 
                label="Password"
                icon="lock-closed-outline"
                placeholder="* * * * * *"
                placeholderTextColor="gray"
                onChangeText={formik.handleChange('password')}
                onBlur={formik.handleBlur('password')}
                value={formik.values.password}
                secureTextEntry={hidePassword}
                isPassword
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
              />
              <MessageBox>...</MessageBox>
              <StyledButton onPress={formik.handleSubmit} disabled={loginButtonDisabled} style={loginButtonDisabled ? {backgroundColor: 'grey'} : {}}>
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
          </InnerContainer>
        </StyledContainer>
      </React.Fragment>
    );
  }