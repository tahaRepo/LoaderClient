import React from "react";
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native'
import { TextInput, Button, Text, Appbar } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import tailwind from "twrnc";
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { requestLocationPermission } from '../src/services/location_service';


export default Orders = ({navigation}) =>{
    const [latitude, setLatitude] = React.useState(0);
    const [longitude, setLongitude] = React.useState(0);
    const route=useRoute();
    const [data,setData]=React.useState(route.params.data);

    
    const updateLocation = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setLatitude(latitude);
        setLongitude(longitude);
    };

    React.useEffect(() => {
        requestLocationPermission();
        Geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
        },
        error => {
            console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, provider: Geolocation.PROVIDER_GPS },
        );
    }, []);


    return(
        <View style={tailwind`bg-pink-200 h-full`}>
            <View style={tailwind`h-1/3`}>
                <View style={tailwind`flex-row items-center mb-5`}>
                    <TouchableOpacity style={tailwind`flex-0.1 `} onPress={() => navigation.openDrawer()} >
                        <Image source={require('../screens/pictures/left.png')}></Image>
                    </TouchableOpacity>
                    <View style={{flex:0.4}}></View>
                    <Text style={tailwind`text-center text-2xl font-mono font-extrabold text-sky-900
                                        underline  `}>TRACK ORDER</Text>
                </View>
                <TextInput
                        style={tailwind`my-2 mx-10 mb-0 rounded-b-2xl rounded-t-2xl text-center`} 
                        placeholder=''
                        label='Order ID'
                        underlineColor="transparent"
                        disabled={true}
                />
                {/* <Button style={tailwind` my-5 mx-15 bg-amber-400 text-black`} mode="contained" onPress={()=>{}}>
                    <Text>Enter</Text>
                </Button> */}
            </View>
            <View style={tailwind`h-2/3`}>
                {/* <Image style={{width:500 , height:300}} 
                source={require('./pictures/map.png')} /> */}
                <MapView
                    style={styles.map}
                    region={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.00922,
                    longitudeDelta: 0.00912,
                    }}
                    onPress={(event) => updateLocation(event)}
                >
                    <Marker
                    coordinate={{
                        latitude: latitude,
                        longitude: longitude,
                    }}
                    title={'Marker Title'}
                    description={'Marker Description'}
                    />
                </MapView>
                
                <Text style={tailwind`text-center font-bold text-lg mt-5`}>Estimated arrival time:</Text>
                <TextInput disabled = 'true' 
                style={tailwind`my-2 mx-10 mb-0 rounded-b-2xl rounded-t-2xl text-center font-bold`} 
                placeholder = "23:35:18">
                </TextInput>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container : {
        margin: 10
    },
    heading: {
        margin: 20,
        fontSize: 20,
        fontWeight: 'bold'
    },
    buttton: {
        width: 200,
        margin: 10,
        marginLeft: 90
    }
    
})