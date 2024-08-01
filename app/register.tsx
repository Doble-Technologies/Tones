import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    LoginTextInput
  } from './helpers.jsx';

export default function Register() {

  const [hidePassword, setHidePassword] = useState(true);

  return (
    <ScrollView>
      <StyledContainer>
        <StatusBar style="dark" />
        <SafeAreaView />
        <InnerContainer>
          <PageImage resizeMode="cover" source={require('./../assets/images/tones-logo.png')} />
          <Title>Tones</Title>
          <SubTitle>Account Register</SubTitle>

          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              number: '',
              email: '', 
              password: '', 
              passwordConfirmation: '' 
            }}
            onSubmit={(values) => {
              values.number = values.number.replace(/[()\-\s]/g, '');
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
                  value={values.number.replace(/^(\d{3})(\d{3})(\d+)$/, "($1) $2-$3")}
                  keyboardType="number-pad"
                  maxLength={14}
                />
                <LoginTextInput 
                  label="Email Address"
                  icon="mail-outline"
                  placeholder="test-email@post53.org"
                  placeholderTextColor="gray"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
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
                <LoginTextInput 
                  label="Confirm Password"
                  icon="lock-closed-outline"
                  placeholder="* * * * * *"
                  placeholderTextColor="gray"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.passwordConfirmation}
                  secureTextEntry={hidePassword}
                  isPassword
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MessageBox>...</MessageBox>
                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Register</ButtonText>
                </StyledButton>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </ScrollView>
  )
}