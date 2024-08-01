import React, { useEffect } from 'react';
import { router, Stack } from 'expo-router';

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: 'login',
};

export default function App() {

  useEffect(() => {
    router.replace('/login');
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}