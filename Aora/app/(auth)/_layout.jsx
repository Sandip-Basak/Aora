import { View, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { Stack } from 'expo-router'

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name='SignIn' options={{headerShown: false}} />
        <Stack.Screen name='SignUp' options={{headerShown: false}} />
      </Stack>
    </>
  )
}

export default AuthLayout