import React from "react";
import {View, StyleSheet, ScrollView,Image} from 'react-native'
import { TextInput, Button, Text, Appbar , Avatar} from 'react-native-paper';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import Book2 from "./Book2";
import tailwind from "twrnc";
import { TouchableOpacity } from "react-native-gesture-handler";
import ImagePicker from 'react-native-image-picker';
import * as yup from 'yup';
import { Formik } from 'formik';


export default Book1 = ({navigation}) =>{
    const route=useRoute();
    const [id, setClientId] = React.useState(route.params.id);
  
    const ToS2=(FormData)=>{
        FormData.clientid=id;
        navigation.navigate('Page 2',{
            data: FormData,
        })
    }

    return(
        <View style={tailwind`bg-violet-300 h-full`} >
            
            <View style={tailwind`flex-row items-center m-5`}>
                <TouchableOpacity style={tailwind`flex-1 `} onPress={() => navigation.openDrawer()} >
                    <Image source={require('../screens/pictures/left.png')}></Image>
                </TouchableOpacity>
                <View style={{flex:0.4}}></View>
                <Text style={tailwind`text-center text-2xl font-mono font-extrabold text-sky-900
                                 mt-5   underline  `}>BOOKING</Text>
            </View>

            
            <Formik
              validationSchema={OrderProcessingSchema}
              initialValues={{ ordername: '', weight: '', size:'' }}
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
                      placeholder='Order Name'
                      onChangeText={handleChange('ordername')}
                      value={values.ordername}
                      underlineColor='transparent'
                      style={tailwind`m-5 rounded-2xl rounded-t-2xl text-center`}
                    />
                    {errors.username &&
                      <Text style={styles.error}>{errors.username}</Text>
                    }
                    <TextInput
                      placeholder='Weight'
                      onChangeText={handleChange('weight')}
                      value={values.weight}
                      keyboardType='number-pad'
                      underlineColor='transparent'
                      style={tailwind`mx-5 mt-5 rounded-2xl rounded-t-2xl text-center`}
                    />
                    <Text style={tailwind`mt-0 text-red-600 text-center`}>According to Weight in Tons</Text>
                    {errors.weight &&
                      <Text style={styles.error}>{errors.weight}</Text>
                    }
                    <TextInput
                      placeholder='Size'
                      onChangeText={handleChange('size')}
                      value={values.size}
                      keyboardType='number-pad'
                      underlineColor='transparent'
                      style={tailwind`mx-5 mt-5 rounded-2xl rounded-t-2xl text-center`}
                    />
                    <Text style={tailwind`mb-5 text-red-600 text-center`}>According to Length in Ft.</Text>
                    {errors.size &&
                      <Text style={styles.error}>{errors.size}</Text>
                    }
                    <Button style={tailwind `mx-15 bg-amber-400 text-black mb-2`} mode="contained" onPress={()=>{ToS2(values)}}><Text style={tailwind`font-bold text-black`}>Next</Text></Button>
                    
                    
                  </View>
                ) 
              }
            </Formik>
        </View>
    )
}

const styles=StyleSheet.create({
    container : {
        margin: 20
    },
    heading: {
        margin: 20,
        fontSize: 20,
        fontWeight: 'bold'
    },
    
})

const OrderProcessingSchema = yup.object().shape({
    ordername: yup.string().required('Order Name is Required'),
    weight: yup.string().required('Weight is required'),
    size: yup.string().required('Size is required')
  
  })
  
