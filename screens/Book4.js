import React from "react";
import {View, StyleSheet, Image, FlatList, TouchableOpacity} from 'react-native'
import { TextInput, Button, Text, Appbar, DataTable } from 'react-native-paper';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import tailwind from "twrnc";
import Snackbar from "react-native-snackbar";
import { getAllOrder, getAllVehicles, getVehicleType, placeOrder, updateOrderStatus, getOrder } from "../src/services/client_service";

export default Book2 = ({navigation}) =>{
    
    const route=useRoute();
    const [orderDetails,setOrderDetails]=React.useState(route.params.data);
    const [price,setPrice]=React.useState(0);
    const [originalPrice,setOriginalPrice]=React.useState(0);
    const [vehicle,setAllVehicles]=React.useState([]);
    const [allOrders,setAllOrders]=React.useState([]);
    const [orderexist,setOrderExist]=React.useState(false);
    function toRadians(degrees) {
        return degrees * Math.PI / 180;
      }
    const Price=(value)=>{
        const val= parseInt(value);
        setPrice(val);
        orderDetails.orderId=orderDetails.orderId
        orderDetails.price=val;
        orderDetails.statusId=2;
        orderDetails.status="bidding";
        updateOrderStatus(orderDetails).then((response)=>{
            console.log("From Order");
        })
        .catch((err)=>{
            if(err.response){
                console.log("D"+JSON.stringify(err.response));
            }
            else if(err.request){
                console.log("De"+err.request);
            }
            else {
                console.log("Deq: "+err);
            }
        });
        
    }
    const placeorder=(value)=>{
        const val= parseInt(value);
        setPrice(val);
        orderDetails.price=val;
        orderDetails.statusId=2;
        orderDetails.clientId=global.id;
        orderDetails.status="bidding";
        placeOrder(orderDetails).then((response)=>{
            Snackbar.show({
                text: "Successfully Placed Order. Please Check Your Order Update in Orders Tab.",
                duration: Snackbar.LENGTH_SHORT,
                action: {
                  text: 'close',
                  textColor: 'green',
                  onPress: () => { /* Do something. */ },
                },
              });
              setOrderExist(true);
      
        })
        .catch((err)=>{
            if(err.response){
                console.log("D"+JSON.stringify(err.response));
            }
            else if(err.request){
                console.log("De"+err.request);
            }
            else {
                console.log("Deq: "+err);
            }
        });
        
    }
    const acceptOrder=()=>{
        //update the ostatus in database

        if(orderDetails.totalWeight!==undefined){
            orderDetails.weight=orderDetails.totalWeight;
        }
        if(orderDetails.totalWeight!==undefined){
            orderDetails.size=orderDetails.totalsize;
        }


        orderDetails.price=orderDetails.price*orderDetails.totalWeight;
        orderDetails.statusId=3;
        orderDetails.status="pending";
        orderDetails.paymentStatus="pending";
        console.log(orderDetails);
        console.log(orderDetails.price);
        updateOrderStatus(orderDetails).then((response)=>{
            Snackbar.show({
                text: "Successfully confirmed Price.",
                duration: Snackbar.LENGTH_SHORT,
                action: {
                  text: 'close',
                  textColor: 'green',
                  onPress: () => { /* Do something. */ },
                },
              });
      
        })
        .catch((err)=>{
            if(err.response){
                console.log("D"+JSON.stringify(err.response));
            }
            else if(err.request){
                console.log("De"+err.request);
            }
            else {
                console.log("Deq: "+err);
            }
        });
        navigation.navigate("Page 5",{data:orderDetails});
    }
    const calculatePrice=()=>{
        let lon1="";
        let lat1="";
        let lon2="";
        let lat2="";
        if(orderDetails.pickuplongitude!=null){
            lon1=orderDetails.pickuplongitude;
            lat1=orderDetails.pickuplatitude;
            lon2=orderDetails.dropOffLongitude;
            lat2=orderDetails.dropOffLatitude;
        }
        else {
            const pickup = orderDetails.pickUp;
            let arr=pickup.split(',');
            lat1=arr[0];
            lon1=arr[1];
            orderDetails.pickuplongitude=lon1;
            orderDetails.pickuplatitude=lat1;
            const drop = orderDetails.dropOff;
            arr=drop.split(',');
            lat2=arr[0];
            lon2=arr[1];
            orderDetails.dropOffLongitude=lon2;
            orderDetails.dropOffLatitude=lat2;
            console.log(orderDetails.pickuplatitude)
            console.log(orderDetails.pickuplongitude)

        }


        console.log(lat1, lon1+"==="+lat2, lon2);
        const R = 6371  // km;
        const x1 = lat2 - lat1;
        const dLat = toRadians(x1);
        const x2 = lon2 - lon1;
        const dLon = toRadians(x2);
        const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        getAllVehicles().then((response)=>{
            setAllVehicles((response.data));
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
        const check=true;
        let pr=0;
        vehicle.forEach((vehicle) => {
            if((orderDetails.weight<vehicle.maxweight) && (orderDetails.size>vehicle.maxsize) && (orderDetails.weight>vehicle.minweight) && (orderDetails.size>vehicle.minsize))
                {
                    console.log("here In vehicle");
                    pr=((vehicle.type.cost)*d);
                    check=false
                }
        });
        if(check==true){
            pr=7*d;
            console.log("pr"+pr)
        }

        if(orderDetails.labour>0){
            pr=(parseInt(orderDetails.labour)*10)+pr;
            console.log("P"+pr);
        }
        console.log(pr)
        setPrice(pr);
        console.log("distance==?",d);
        console.log("Price==?",price);

    }

    React.useEffect(()=>{
        console.log("Use effect wali"+orderDetails);
        if(orderDetails.orderId!==undefined){
            getOrder(orderDetails.orderId).then((response)=>{
                setOrderExist(true);
                setOriginalPrice(orderDetails.price);
                console.log(originalPrice);
                console.log(price);
                console.log(response.data);
                console.log(orderDetails)
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
            })
        }        
           
    },[]);
    React.useEffect(()=>{
        if(orderDetails.price===undefined){
            console.log("inundefined")
                calculatePrice();
        }
        getAllOrder().then((response)=>{
            setAllOrders(response.data);
            if(orderDetails.price!==undefined)
                setPrice(orderDetails.price);
            
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
        console.log(price);
    },[]);
    return(
        <View>
            
            <View style={tailwind`h-full bg-violet-200`}>
                <View style={tailwind`flex-row items-center my-5`}>
                    <TouchableOpacity style={tailwind`flex-0.1 `} onPress={() => navigation.openDrawer()} >
                        <Image source={require('../screens/pictures/left.png')}></Image>
                    </TouchableOpacity>
                    <View style={{flex:0.4}}></View>
                    <Text style={tailwind`text-center text-2xl font-mono font-extrabold text-sky-900
                                        underline  `}>FARE</Text>
                </View>
                <TextInput
                      
                      label='Enter Price'
                      placeholder='Price Suggestion'
                      underlineColor='transparent'
                      keyboardType='number-pad'
                      value={price.toString()}
                      onChangeText={value => setPrice(value)}
                      style={tailwind`mx-5 mt-10 rounded-2xl rounded-t-2xl text-center`}
                    />
                    <Text style={tailwind`mt-0 mb-10 text-red-600 text-center`}>According to Weight in Tons</Text>
                    
                    {(orderexist)?(
                        <Button style={tailwind` bg-amber-400 text-black mt-2 mx-10`}  mode="contained" 
                            onPress={()=>{Price(price)}}>
                        <Text>Update Price</Text></Button>):
                        (<Button style={tailwind` bg-amber-400 text-black my-2 mx-10`}  mode="contained" 
                            onPress={()=>{placeorder(price)}}>
                        <Text>Place Order</Text></Button>)}
                    
                {
                    allOrders.map((order,index)=>(
                        (orderDetails.orderId!==undefined) ? (
                            <View style={tailwind` `}>
                                {((order.orderId==orderDetails.orderId)&&originalPrice==price&&order.status.statusId==6)?(
                                    <Button style={tailwind`  bg-amber-400 text-black mt-10 mx-10`}  mode="contained" 
                                        onPress={()=>{acceptOrder()}}>
                                    <Text>Accept</Text></Button>
                                ) : null
                                }
                                </View>

                        ):  null
                    )
                    )
                }
            </View>
            
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