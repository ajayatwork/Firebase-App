// src/LoginScreen.js
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { TextInput, Button, useTheme } from 'react-native-paper';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
const LoginScreen = () => {
  const theme = useTheme();
  GoogleSignin.configure({
  webClientId: 'AIzaSyBsNME5IFGLyXJQXQA0OcsufZaFF3BAkHw',
});
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: Yup.string()
      .min(6, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: '', password: '' }}
        onSubmit={values => console.log(values)}
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
            <Button
              mode="contained"
              onPress={()=>handleSubmit()}
              style={styles.button}
              contentStyle={styles.buttonContent}
            >
              Login
            </Button>
          </>
        )}
      </Formik>
      <Text style={styles.centeredText}>Don't Have An Account?</Text>
      <Button onPress={()=>router.push("/signup")}>
        Sign up now
      </Button>

      <Text>OR</Text>

      <TouchableOpacity>
        <Text>Continue with Google</Text>
        <LottieView 
        
        />
      </TouchableOpacity>
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

export default LoginScreen;
