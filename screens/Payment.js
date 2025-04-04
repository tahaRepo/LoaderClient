import React, { useState } from "react";
import {View, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native'
import { TextInput, Button, Text, Appbar, RadioButton } from 'react-native-paper';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import tailwind from "twrnc";
import Snackbar from "react-native-snackbar";
import Stripe from 'react-native-stripe-api';
import { pay, updateOrderStatus } from "../src/services/client_service";



export default function Payment({navigation}) {
    const [agree, setAgree] = useState(true);
    const [agreeB, setAgreeB] = useState(false)
    const [checked,IsChecked] = useState('');
    const [number,setNumber] = useState('');
    const [exp_month,setExpMonth] = useState('');
    const [exp_year,setExpYear] = useState('');
    const [payment,setPayment] = useState('');
    const [description,setDescription] = useState('');
    const [cvc,setCvc] = useState('');
    const route=useRoute();
    const stripe = new Stripe('pk_test_51N7bfdKi05WvTLbhhI43mVTZ4nhd21DxVFxBVQKuh3wB8O1ED9VgFBQLQgfGXpJz8J1Rs1di55OGNxfpP64OjRz100zbpQRW8y');
    var token="";
    const [order,SetOrder]=React.useState(route.params.data);
    const createToken=async()=>{
      if(agree===false){
        token = await stripe.createToken({
          number: number,
          exp_month: exp_month,
          exp_year: exp_year,
          cvc: cvc,
        });
        console.log(order)
        token.amount=order.price;
        token.description=description;
        
        pay(token).then((response)=>{
          Snackbar.show({
              text: "Payment Succesfull.",
              duration: Snackbar.LENGTH_SHORT,
              action: {
                text: 'close',
                textColor: 'green',
                onPress: () => { /* Do something. */ },
              },
            });
            order.paymentStatus="done";
            order.paymentId=1;
            order.paymentMode="Credit Card";
            if(order.totalWeight!==undefined){
              order.weight=order.totalWeight;
          }
          if(order.totalSize!==undefined){
              order.size=order.totalSize;
          }
            updateOrderStatus(order).then((response)=>{
              navigation.navigate('Orders');
            })  
            .catch((err)=>{
                if(err.response){
                    console.log(err.response);
                }
                else if(err.request){
                    console.log(err.request);
                }
                else {
                    console.log(err);
                }
            });
                })
            .catch((err)=>{
                if(err.response){
                    console.log(err.response);
                }
                else if(err.request){
                    console.log(err.request);
                }
                else {
                    console.log(err);
                }
            });
      }
      else{
        order.paymentStatus="done";
        if(order.totalWeight!==undefined){
              order.weight=order.totalWeight;
          }
          if(order.totalSize!==undefined){
              order.size=order.totalSize;
          }
          order.paymentId=2;
          order.paymentMode="CashOnDelivery";
            updateOrderStatus(order).then((response)=>{
              Snackbar.show({
                text: "Payment Method Selected Successfully.",
                duration: Snackbar.LENGTH_SHORT,
                action: {
                  text: 'close',
                  textColor: 'green',
                  onPress: () => { /* Do something. */ },
                },
              });
              navigation.navigate('Orders');
            })  
            .catch((err)=>{
                if(err.response){
                    console.log(err.response);
                }
                else if(err.request){
                    console.log(err.request);
                }
                else {
                    console.log(err);
                }
            });
      }
      

    }
    
  return (
    <View style={tailwind`bg-violet-300 h-full`}>
      <View style={tailwind`flex-row items-center my-5`}>
                    <TouchableOpacity style={tailwind`flex-0.1 `} onPress={() => navigation.openDrawer()} >
                        <Image source={require('../screens/pictures/left.png')}></Image>
                    </TouchableOpacity>
                    <View style={{flex:0.4}}></View>
                    <Text style={tailwind`text-center text-2xl font-mono font-extrabold text-sky-900
                                        underline  `}>PAYMENT METHOD</Text>
      </View>
      <View style={tailwind`flex-row items-center`}>
        <RadioButton
        value={true}
        status={agree === true ? 'checked' : 'unchecked'}
        onPress={() => {
          setAgree(true)
          setAgreeB(false)
        }}/>
        <Text>Cash On Delivery</Text></View>
      <View style={tailwind`flex-row items-center`}>
        <RadioButton
        value={false}
        status={agreeB === true ? 'checked' : 'unchecked'}
        onPress={() => {
          setAgreeB(true)
          setAgree(false)
        }}
        />
        <Text>Online Payment</Text>
        
        
      </View>
      

      {agreeB && 
            <View>
                <TextInput
                      style={tailwind`mt-2 mx-5 mb-0 rounded-b-2xl rounded-t-2xl text-center`}
                      label='Expiry Month'
                      placeholder='Expiry Month'
                      underlineColor='transparent'
                      keyboardType='numeric'
                      onChangeText={(value)=>{setExpMonth(value)}}
                    />
                <TextInput
                      style={tailwind`mt-2 mx-5 mb-0 rounded-b-2xl rounded-t-2xl text-center`}
                      label='Expiry Year'
                      placeholder='Expiry Year'
                      keyboardType='numeric'
                      underlineColor='transparent'
                      onChangeText={(value)=>{setExpYear(value)}}
                    />
                <TextInput
                      style={tailwind`mt-2 mx-5 mb-0 rounded-b-2xl rounded-t-2xl text-center`}
                      label='Card Number'
                      placeholder='Card Number'
                      underlineColor='transparent'
                      keyboardType='numeric'
                      onChangeText={(value)=>{setNumber(value)}}
                    />
                <TextInput
                      style={tailwind`mt-2 mx-20 mb-0 rounded-b-2xl rounded-t-2xl text-center`}
                      label='CVC'
                      placeholder='CVC'
                      underlineColor='transparent'
                      keyboardType='numeric'
                      onChangeText={(value)=>{setCvc(value)}}
                    />       
                <TextInput
                      style={tailwind`mt-2 mx-20 mb-0 rounded-b-2xl rounded-t-2xl text-center`}
                      label='Description'
                      placeholder='Description'
                      underlineColor='transparent'
                      onChangeText={(value)=>{setDescription(value)}}
                    />    
            </View>
            }
      
      <Button style={tailwind` mx-15 bg-amber-400 text-black mt-20`} mode="contained" onPress={()=>{
                createToken();
            }}><Text style={tailwind`font-bold`}>Confirm Order</Text></Button>
    </View>
  )
}