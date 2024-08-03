import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

//Form validation
import * as Yup from 'yup';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
                     .min(4, "Should be min of 4 characters")
                     .max(16, "Should be a max of 16 characters")
                     .required('Length is required')
})

export default function App(): JSX.Element {
  return (
    <View>
      <Text>App</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  
})