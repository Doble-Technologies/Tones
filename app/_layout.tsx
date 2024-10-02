import React, { useState, useEffect } from 'react';
import { router, Stack } from 'expo-router';

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: 'login',
};

export default function App() {

  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (auth) {
      router.replace('./landing');
    } else {
      router.replace('/login');
    }
  }, []);

  useEffect(() => {
    if (auth) {
      router.replace('./landing');
    } else {
      router.replace('/login');
    }
  }, [auth]);

  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="explore" />
      <Stack.Screen name="landing" />
    </Stack>
  );
}