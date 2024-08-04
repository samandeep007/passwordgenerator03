import { SafeAreaView, TouchableOpacity, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, {useState} from 'react'
import * as Yup from 'yup'; //form validation
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Formik } from 'formik';


export default function AppPro() {
  const[password, setPassword] = useState("");
  const[isPasswordGenerated, setIsPasswordGenerated] = useState(false);

  const[options, setOptions] = useState({
    lowercase: true,
    uppercase: false,
    numbers: false,
    symbols: false
  })

  const generatePasswordString = (passwordLength: number) => {
    let characterString = "";
    const data: any = {
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      numbers: "0123456789",
      symbols: "!@#$%^&*()_+"
    }

    for(const[key, value] of Object.entries(options)){
      if(value){
        characterString += data[key];
      }
    }

    const password = createPassword(characterString, passwordLength);
    setPassword(password);
    setIsPasswordGenerated(true);

  }

  const createPassword = (characterString: string, passwordLength: number) => {
    let passwordString = ""
    for(let i = 0; i<passwordLength; i++){
      let characterIndex = Math.floor(Math.random() * characterString.length);
      passwordString += characterString.charAt(characterIndex);
    }
    return passwordString
  }


  const resetPassword = () => {
    setIsPasswordGenerated(false);
    setPassword("");
    setOptions({
      lowercase: true,
      uppercase: false,
      numbers: false,
      symbols: false
    })
  }

  const passwordSchema = Yup.object().shape({
    passwordLength: Yup.number()
    .min(6, "password length should be min of 6 characters")
    .max(30, "password length should be a max of 30 characters")
    .required("password length is required")
  })

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
    <SafeAreaView style={styles.appContainer}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Password Generator</Text>
        <Formik
          initialValues={{ passwordLength: '' }}
          validationSchema={passwordSchema}
          onSubmit={(values) => { generatePasswordString(+values.passwordLength); console.log(values); }}
        >
          {({
            values,
            errors,
            touched,
            isValid,
            handleChange,
            handleSubmit,
            handleReset,
          }) => (
            <>
              <View style={styles.inputWrapper}>
                <View style={styles.inputColumn}>
                  <Text style={styles.heading}>Password Length</Text>
                  {touched.passwordLength && errors.passwordLength && (
                    <Text style={styles.errorText}>
                      {errors.passwordLength}
                    </Text>
                  )}
                </View>
                <TextInput
                  style={styles.inputStyle}
                  value={values.passwordLength}
                  onChangeText={handleChange('passwordLength')}
                  placeholder='Ex. 8'
                  keyboardType='numeric'
                />
              </View>
              <View style={styles.inputWrapper}>
               
                <Text style={styles.heading}>Include lowercase</Text>
                <BouncyCheckbox
                  isChecked={options.lowercase}
                  onPress={() => setOptions(prev => ({...prev, lowercase: !prev.lowercase}))}
                  fillColor='#29AB87'
                />
                
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.heading}>Include uppercase</Text>
                <BouncyCheckbox
                  isChecked={options.uppercase}
                  onPress={() => setOptions(prev => ({...prev, uppercase: !prev.uppercase}))}
                  fillColor='#FED850'
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.heading}>Include numbers</Text>
                <BouncyCheckbox
                  isChecked={options.numbers}
                  onPress={() => setOptions(prev => ({...prev, numbers: !prev.numbers}))}
                  fillColor='#C9A0DC'
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.heading}>Include symbols</Text>
                <BouncyCheckbox
                  isChecked={options.symbols}
                  onPress={() => setOptions(prev => ({...prev, symbols: !prev.symbols}))}
                  fillColor='#FC80A5'
                />
              </View>

              <View style={styles.formActions}>
                <TouchableOpacity disabled={!isValid} style={styles.primaryBtn} onPress={handleSubmit}>
                  <Text style={styles.primaryBtnTxt}>Generate Password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondaryBtn} onPress={() => { handleReset(); resetPassword(); }}>
                  <Text style={styles.secondaryBtnTxt}>Reset</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
      {isPasswordGenerated && (
         <View style={[styles.card, styles.cardElevated]}>
         <Text style={styles.subTitle}>Result:</Text>
         <Text style={styles.description}>Long Press to copy</Text>
         <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
       </View>
      )}
    </SafeAreaView>
  </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: '#000',
  },
});
