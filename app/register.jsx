import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFormik, Formik } from 'formik';
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
  LoginTextInput,
  LoginDropdownInput
} from './helpers.jsx';

const providers = [
  {label: 'Verizon', value: 'verizon'},
  {label: 'AT&T', value: 'att'},
  {label: 'T-Mobile', value: 'tmobile'}
]


export default function Register() {

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
            <LoginDropdownInput
              label="Cellular Provider"
              selectedValue={formik.values.provider}
              onValueChange={formik.handleChange('provider')}
              items={providers}
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
  )
}