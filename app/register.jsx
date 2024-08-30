import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFormik } from 'formik';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {
  providerMenu,
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
  LoginTextInput,
  RegisterDropdownInput,
} from './generalHelpers.jsx';

export default function Register() {

  const [providerDropdownOpen, setProviderDropdownOpen] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [registerButtonDisabled, setRegisterButtonDisabled] = useState(true);


  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      number: '',
      provider: '',
      email: '', 
      password: '', 
      passwordConfirmation: '' 
    },
    onSubmit: (values) => {
      values.number = values.number.replace(/[()\-\s]/g, '');
      console.log(values);
    }
  });

  const formValues = formik.values;

  useEffect(() => {
    if (formValues) {
      if ((formValues.number.length === 14 || (formValues.number.length === 10 && !formValues.number.includes('('))) && formValues.email && formValues.firstName && formValues.lastName) {
        if (formValues.password.length !== 0 && (formValues.password === formValues.passwordConfirmation)) {
          setRegisterButtonDisabled(false);
        } else {
          setRegisterButtonDisabled(true);
        }
      } else {
        setRegisterButtonDisabled(true);
      }
    } else {
      setRegisterButtonDisabled(true);
    }
  }, [formValues])

  return (
    <View>
      <PageHeader>
        <TouchableOpacity onPress={router.back} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="arrow-back-outline" size={30} color="red" style={{ paddingLeft: 20 }} />
          <Text style={{ color: 'red', fontWeight: 600 }}>Back to Login</Text>
        </TouchableOpacity>
      </PageHeader>
      <ScrollView>
        <StyledContainer>
          <StatusBar style="dark" />
          <SafeAreaView />
          <InnerContainer>
            <PageImage resizeMode="cover" source={require('./../assets/images/tones-logo.png')} />
            <Title>Tones</Title>
            <SubTitle>Account Register</SubTitle>
            <StyledFormArea>
              <LoginTextInput
                label="First Name"
                icon="person-outline"
                placeholder="Bud"
                placeholderTextColor="gray"
                onChangeText={formik.handleChange('firstName')}
                onBlur={formik.handleBlur('firstName')}
                value={formik.values.firstName}
              />
              <LoginTextInput
                label="Last Name"
                icon="people-outline"
                placeholder="Doble"
                placeholderTextColor="gray"
                onChangeText={formik.handleChange('lastName')}
                onBlur={formik.handleBlur('lastName')}
                value={formik.values.lastName}
              />
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
              <RegisterDropdownInput
                label="Cellular Provider"
                isOpen={providerDropdownOpen}
                setOpen={setProviderDropdownOpen}
                selectedValue={formik.values.provider}
                onValueChange={formik.handleChange('provider')}
                menu={providerMenu}
              />
              <LoginTextInput 
                label="Email Address"
                icon="mail-outline"
                placeholder="test@organization.com"
                placeholderTextColor="gray"
                onChangeText={formik.handleChange('email')}
                onBlur={formik.handleBlur('email')}
                value={formik.values.email}
                keyboardType="email-address"
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
              <LoginTextInput 
                label="Confirm Password"
                icon="shield-checkmark-outline"
                placeholder="* * * * * *"
                placeholderTextColor="gray"
                onChangeText={formik.handleChange('passwordConfirmation')}
                onBlur={formik.handleBlur('passwordConfirmation')}
                value={formik.values.passwordConfirmation}
                secureTextEntry={hidePassword}
                isPassword
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
              />
              <MessageBox>...</MessageBox>
              <StyledButton onPress={formik.handleSubmit} style={registerButtonDisabled ? {backgroundColor: 'grey'} : {}}>
                <ButtonText>Register</ButtonText>
              </StyledButton>
            </StyledFormArea>
          </InnerContainer>
        </StyledContainer>
      </ScrollView>
    </View>
  )
}