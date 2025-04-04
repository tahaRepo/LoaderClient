import React from "react";
import {View, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native'
import { TextInput, Button, Text, Appbar, DataTable } from 'react-native-paper';
import tailwind from "twrnc";
import { getAllOrder } from "../src/services/client_service";
import { useRoute } from "@react-navigation/native";
import { responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions";


export default Orders = ({navigation}) =>{
    const route=useRoute();
    const id=global.id;
    const [allOrders,setAllOrders]=React.useState([]);
    const [order,setOrder]=React.useState([]);
    
    const updatePrice=(order)=>{
        order.clientid=order.client.id;
        order.orderId=order.orderId;
        order.statusId=order.status.statusId;
        navigation.navigate('Page 4',{
            data: order});
    }

    const review=(order)=>{
        order.orderId=order.orderId;
        console.log(order);
        navigation.navigate('Review',{
            data: order});
        }
        const pay=(order)=>{
        navigation.navigate('Page 5',{
            data: order});
        
    }
    React.useEffect(()=>{
            getAllOrder().then((response)=>{
                        setAllOrders(response.data);
            })
            .catch((err)=>{
                if(err.response){
                    console.log(er.response);
                }
                else if(err.request){
                    console.log(err.request);
                }
                else {
                    console.log(err);
                }
            })    
    },[]);
    return(
        <View style={tailwind`bg-pink-200 h-full`}>
            <View style={tailwind`flex-row items-center mb-5`}>
                <TouchableOpacity style={tailwind`flex-0.1 `} onPress={() => navigation.openDrawer()} >
                    <Image source={require('../screens/pictures/left.png')}></Image>
                </TouchableOpacity>
                <View style={{flex:0.4}}></View>
                <Text style={tailwind`text-center text-2xl font-mono font-extrabold text-sky-900
                                    underline  `}>Orders list</Text>
            </View>
            <ScrollView>
                <DataTable style={tailwind`border-dotted border-black`}>
                    <DataTable.Header style={tailwind`text-center text-lg font-mono font-extrabold text-sky-900
                                    underline pb-0 bg-amber-300`}>
                        <DataTable.Title style={tailwind`flex-0.2`}><Text style={tailwind`text-black font-bold`}>ID</Text></DataTable.Title>
                        <DataTable.Title style={tailwind`flex-0.6`}><Text style={tailwind`text-black font-bold`}>Order Name</Text></DataTable.Title>
                        <DataTable.Title style={tailwind`flex-0.6`}><Text style={tailwind`text-black font-bold`}>Status</Text></DataTable.Title>
                        <DataTable.Title style={tailwind``}><Text style={tailwind`text-black`}></Text></DataTable.Title>
                        
                    </DataTable.Header>


                    {allOrders.map((order, index) => (
                        (order.client.id==id) ? (
                        <DataTable.Row key={index}>
                            <DataTable.Cell style={tailwind`flex-0.2`}><Text style={tailwind`text-black font-bold`}>{order.orderId}</Text></DataTable.Cell>
                            <DataTable.Cell style={tailwind`flex-0.6`}><Text style={tailwind`text-black`}>{order.orderName}</Text></DataTable.Cell>
                            <DataTable.Cell style={tailwind`flex-0.6`}> <Text style={tailwind`text-black `}>{order.status.status}</Text> </DataTable.Cell>
                            <DataTable.Cell style={tailwind`mx-0`}>
                                <View style={tailwind`flex-row `}>
                                    
                                    {order.status.statusId==1 ? (
                                        <Button mode="contained" style={[tailwind`bg-amber-400 mx-0`,{width: responsiveWidth(30),paddingHorizontal: 0}]} onPress={() => navigation.navigate('TrackOrders',{
                                        order: order,})}>
                                        <Text style={tailwind`text-black`}>Track</Text>                            
                                    </Button>):null}
                                    {order.status.statusId==6 ? (
                                        <Button mode="contained"  style={[tailwind`bg-amber-400 mx-0`,{width: responsiveWidth(30),paddingHorizontal: 0}]} onPress={() => {updatePrice(order)}}>
                                        <Text style={tailwind`text-black text-xs`}>Update Price</Text>                            
                                    </Button>):null}

                                    {order.status.statusId==4 ? (
                                        <Button mode="contained"  style={[tailwind`bg-amber-400 mx-0`,{width: responsiveWidth(30),paddingHorizontal: 0}]} onPress={() => {review(order)}}>
                                        <Text style={tailwind`text-black text-xs`}>Review</Text>                            
                                    </Button>):null}
                                    {order.status.statusId==3&&order.paymentStatus!="done" ? (
                                        <Button mode="contained"  style={[tailwind`bg-amber-400 mx-0`,{width: responsiveWidth(30)}]}  onPress={() => {pay(order)}}>
                                        <Text style={tailwind`text-black text-xs`}>Pay</Text>                            
                                    </Button>):null}
                                </View>
                            </DataTable.Cell>
                            

                        </DataTable.Row>) : null
                    ))}
                </DataTable>
            </ScrollView>
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