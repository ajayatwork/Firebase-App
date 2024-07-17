// src/Signup.js
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button, useTheme } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { router } from 'expo-router';
import { auth } from '@/firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
interface valueType{
    email: string,
    password: string,
    confirmPass: string,
    phoneNo: string
}

const saveData = async (userData:any)=>{
  try {
    await AsyncStorage.setItem('token',"eybnjiuihy9y129837u23ibdasdnadpoqwer-oghgerth893");
  } catch (e) {
    // saving error
    console.log("EEEEERRR", e);
  }
}

const SignupScreen = () => {
  const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: Yup.string()
      .min(6, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
    confirmPass: Yup.string()
     .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
    phoneNo: Yup.string()
    .min(8, ({min})=>` Phone Number must be at least ${min} Digits`)
    .required("Phone Number is required")
    .matches(/^\d+$/)
  });
  const loginToFirebase = async (values:valueType)=>{
  createUserWithEmailAndPassword(auth, values.email, values.password)
  .then((userData) => {
    saveData(userData)
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });

  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: '', password: '', confirmPass: "", phoneNo: "" }}
        onSubmit={values => loginToFirebase(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <TextInput
              label="Email"
              mode="outlined"
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              error={touched.email && errors.email ? true : false}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <TextInput
              label="Password"
              mode="outlined"
              secureTextEntry
              style={styles.input}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              error={touched.password && errors.password ? true : false}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
             <TextInput
              label="Confirm Password"
              mode="outlined"
              secureTextEntry
              style={styles.input}
              onChangeText={handleChange('confirmPass')}
              onBlur={handleBlur('confirmPass')}
              value={values.confirmPass}
              error={touched.password && errors.password ? true : false}
            />
            {touched.confirmPass && errors.confirmPass && (
              <Text style={styles.errorText}>{errors.confirmPass}</Text>
            )}
              <TextInput
              label="Phone Number"
              mode="outlined"
              keyboardType='numeric'
              style={styles.input}
              onChangeText={handleChange('phoneNo')}
              onBlur={handleBlur('phoneNo')}
              value={values.phoneNo}
              error={touched.phoneNo && errors.phoneNo ? true : false}
            />
            {touched.phoneNo && errors.phoneNo && (
              <Text style={styles.errorText}>{errors.phoneNo}</Text>
            )}
            <Button
              mode="contained"
              onPress={()=>handleSubmit()}
              style={styles.button}
              contentStyle={styles.buttonContent}
            >
              Signup
            </Button>
          </>
        )}
      </Formik>
      <Text style={styles.centeredText}>Already a user?</Text>
      <Button onPress={()=>router.push("/index")}>
        Login instead
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
    borderRadius: 24,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
  centeredText:{
    fontSize: 13,
    textAlign: 'center',
    marginTop: 12
  }
});

export default SignupScreen;
