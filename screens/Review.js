import React from "react";
import {View, StyleSheet} from 'react-native'
import { TextInput, Button, Text} from 'react-native-paper';
import Snackbar from "react-native-snackbar";
import tailwind from "twrnc";
import { useRoute } from "@react-navigation/native";
import { getReview, addReview } from "../src/services/client_service";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RatingProps } from "react-native-stock-star-rating";
import { responsiveWidth } from "react-native-responsive-dimensions";


export default Review = ({navigation}) =>{
    const route=useRoute();
    const [order,setOrder]=React.useState(route.params.data);
    const [review,setReview]=React.useState();
    const [rating,setRating]=React.useState(0);
    const [comment,setComment]=React.useState(0);
    const stars = [1, 2, 3, 4, 5];
    const [check,setCheck]=React.useState(true);

    const PostReview=()=>{
        order.rating=rating;
        order.comment=comment;
        addReview(order).then((response)=>{
            Snackbar.show({
                text: "Submitted the Review.",
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
            console.log(err.response.data);
        }
        else if(err.request){
            console.log(err.request);
        }
        else {
            console.log(err);
        }
    })    
    console.log(rating);
    }
    React.useEffect(()=>{
        getReview(order).then((response)=>{
            Snackbar.show({
                text: "Already Reviewed.",
                duration: Snackbar.LENGTH_SHORT,
                action: {
                  text: 'close',
                  textColor: 'green',
                  onPress: () => { /* Do something. */ },
                },
              });
              setCheck(false);
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
    })    ;
    },[]);
    return(
        <View style={tailwind`bg-pink-200 h-full`}>
            <Text style={tailwind`text-center text-2xl font-mono font-extrabold text-sky-900 underline pb-0 my-5 `}>Review Our Service</Text>
            <TextInput
                    style={tailwind`my-5 mx-10 mb-0 rounded-b-2xl rounded-t-2xl text-center`}
                    underlineColor="transparent"
                    placeholder=''
                    value={order.orderId.toString()}
                    label='Enter Order ID'
            />
            <TextInput
                    style={tailwind`my-5 mx-10 mb-0 rounded-b-2xl rounded-t-2xl text-center h-50`}
                    underlineColor="transparent"
                    placeholder=''
                    label='Add Review'
                    onChangeText={value=>setComment(value)}
            />

            <View style= {[tailwind`flex-row mt-5 ml-20`,{width: responsiveWidth(100)}]}>
                {stars.map((star) => (
                    <TouchableOpacity key={star} onPress={() => setRating(star)}>
                    <View style={styles.star}>
                        {star <= rating && <View style={styles.filledStar} />}
                    </View>
                    </TouchableOpacity>
                ))}
            </View>
            {
                check==true?(<Button style={tailwind` my-5 mx-15 bg-amber-400 text-black`} mode="contained" onPress={()=>{PostReview()}}>Submit</Button>):null
            }
            
            
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
    bigField: {
        margin: 20,
        height: 100
    },
    star: {
        margin: 2,
        width: 30,
        height: 30,
        borderWidth: 1,
        borderColor: '#ffc107',
        justifyContent: 'center',
        alignItems: 'center',
      },
      filledStar: {
        width: 24,
        height: 24,
        backgroundColor: '#ffc107',
      },
})