import { View, StyleSheet, TouchableOpacity, Image} from 'react-native'
import { TextInput, Button, Text, Appbar } from 'react-native-paper';
import { Formik } from 'formik';
// import { useTheme } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import HideKeyboard from '../components/HideKeyboard';
import * as yup from 'yup';
import TopBar from '../components/TopBar';
import BottomBar from '../components/BottomBar';
import Snackbar from "react-native-snackbar"
import { useState } from 'react';
import tailwind from 'twrnc';
import { SafeAreaView } from 'react-native-safe-area-context';
import { login } from '../src/services/client_service';
import { mainid } from '../App';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';

export default Login = ({ navigation }) => {
  // const theme = useTheme();
  // const styles = useStyles(theme);
  const handleRegister = () => {
    navigation.navigate('Register');
  }
  const loginfunc = (FormData)=>{
    login(FormData).then((response)=>{
        Snackbar.show({
          text: "Successfully Logged In",
          duration: Snackbar.LENGTH_SHORT,
          action: {
            text: 'close',
            textColor: 'green',
            onPress: () => { /* Do something. */ },
          },
        });

        global.id=response.data.id;
        console.log(response.data.id);
        navigation.navigate('Home',{
          id: response.data.id,
        });
      })
    .catch((err) => {
        if (err.response) {
          console.log(err.response);
          Snackbar.show({
            text: 'Incorrect Username or Password',
            duration: Snackbar.LENGTH_SHORT,
            action: {
              text: 'close',
              textColor: 'green',
              onPress: () => { /* Do something. */ },
            },
          });
          console.log("Error Response"+err.response.data.msg);
        } else if (err.request) {
          Snackbar.show({
            text: 'Incorrect Username or Password Else IF ',
            duration: Snackbar.LENGTH_SHORT,
            action: {
              text: 'close',
              textColor: 'green',
              onPress: () => { /* Do something. */ },
            },
          });
          console.log("Error Request");
          console.log(err.request);
        } else {
          Snackbar.show({
            text: 'Incorrect Username or Password! Else',
            duration: Snackbar.LENGTH_SHORT,
            action: {
              text: 'close',
              textColor: 'green',
              onPress: () => { /* Do something. */ },
            },
          });
            console.log("Error Else");
          console.log(err.message);
        }
      });
    
  }

  const [visible, setVisible] = useState(false);

  const onDismissSnackBar = () => setVisible(false);
  return (
    <HideKeyboard>
      <View style={tailwind`bg-pink-200`}>
        <View style={tailwind`h-1/2 `}>
          <Image source={require('../screens/pictures/logo.jpg')}
            style={[tailwind``,{resizeMode: "cover", width: responsiveWidth(100), height: responsiveHeight(50)}]}></Image>
        </View>
        <View style={tailwind`h-1/2 bg-violet-500 rounded-t-3xl`}>
          <Formik
              validationSchema={loginValidationSchema}
              initialValues={{ username: '', password: '' }}
              >
              {
                (
                  {
                    handleChange,
                    handleSubmit,
                    values,
                    errors,
                    isValid
                  }
                ) => (
                  <View>
                    <TextInput
                      placeholder='Username'
                      onChangeText={handleChange('username')}
                      value={values.username}
                      underlineColor='transparent'
                      style={tailwind`m-5 rounded-2xl rounded-t-2xl text-center`}
                    />
                    {errors.username &&
                      <Text style={styles.error}>{errors.username}</Text>
                    }
                    <TextInput
                      placeholder='Password'
                      secureTextEntry={true}
                      underlineColor='transparent'
                      onChangeText={handleChange('password')}
                      value={values.password}
                      style={tailwind`mx-5 rounded-2xl rounded-t-2xl text-center  `}
                    />
                    {errors.password &&
                      <Text style={styles.error}>{errors.password}</Text>
                    }
                    <View >
                      <Button style={tailwind`mt-5 mx-15 bg-amber-400 text-black`} mode='contained'
                        onPress={() => {loginfunc(values)}}
                        disabled={!isValid}
                      ><Text style={tailwind`font-bold text-black`}>Log In</Text></Button>
                      <Text style={tailwind`font-semibold text-white text-center my-5`}>Don't have an account?</Text>
                      <Button
                        style={tailwind` mx-15 bg-amber-400 text-black`}
                        mode='contained'
                        onPress={handleRegister}
                      ><Text style={tailwind`font-bold text-black`}>Register</Text></Button>
                    </View>
                  </View>
                )
              }
            </Formik>
        </View>
      
      </View>
      
    </HideKeyboard>

  // <SafeAreaView>
  //   <View style={tailwind`h-1/2 bg-red-300`}>
  //     <Text>Logo Here</Text>
  //   </View>
  //   <View style={tailwind`h-1/2 bg-blue-300`}>
  //     <Text>Fields Here</Text>
  //   </View>
  // </SafeAreaView>

  )
}



const styles = () => (StyleSheet.create({
  sidebutton: {
    marginTop: hp('2%'),
    width: wp('30%'),
    margin: wp('2%'),
    // backgroundColor: theme.colors.greey,

  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  error: {
    fontSize: 10,
    color: 'red'
  }
}))

const loginValidationSchema = yup.object().shape({
  username: yup.string().required('User name is Required'),
  password: yup.string().min(1, ({ min }) => `Password must be at least ${min} characters`).required('Password is required')

})
