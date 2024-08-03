import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'

//Form validation
import * as Yup from 'yup';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
                     .min(4, "Should be min of 4 characters")
                     .max(16, "Should be a max of 16 characters")
                     .required('Length is required')
})

export default function App(): JSX.Element {

  const[password, setPassword] = useState("");
  const[isPasswordGenerated, setIsPasswordGenerated] = useState(false);

  const[lowerCase, setLowerCase] = useState(true);
  const[upperCase, setUpperCase] = useState(false);
  const[numbers, setNumbers] = useState(false);
  const[symbols, setSymbols] = useState(false);

  const generatePasswordString = (passwordLength: number) => {

  }

  const createPassword = (characters: string, passwordLength: number) => {
    let result = "";
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex: number = Math.round(Math.random() * characters.length);
      result += characters.charAt(characterIndex)
    }
    return result;
  }

  const resetPassword = () => {
    setPassword("");
    setIsPasswordGenerated(false);
    setLowerCase(true);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
  }


  return (
    <View>
      <Text>App</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  
})