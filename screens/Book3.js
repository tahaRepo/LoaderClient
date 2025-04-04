import React from "react";
import {View, StyleSheet, Image, ScrollView,TouchableOpacity} from 'react-native'
import { TextInput, Button, Text, Appbar } from 'react-native-paper';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import tailwind from "twrnc";
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { GooglePlacesAutocomplete,PlacesServiceStatus  } from 'react-native-google-places-autocomplete';
import { requestLocationPermission } from '../src/services/location_service';

export default Book3 = ({navigation}) =>{
    
    
    const [latitude, setLatitude] = React.useState(0);
    const [longitude, setLongitude] = React.useState(0);
    const route=useRoute();
    const [data,setData]=React.useState(route.params.data);
    const [labour,setLabour]=React.useState(0);

    const updateLocation = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setLatitude(latitude);
        setLongitude(longitude);
    };
    const conformDropOff = () =>{
        data.dropOffLongitude=longitude;
        data.dropOffLatitude=latitude;
        data.labour=labour;
        data.statusId='1';
        navigation.navigate('Page 4',{
            data:data,
        })
    }
    React.useEffect(async () => {
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
        <View>
           <View style={tailwind`h-1/2`}>
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
                <GooglePlacesAutocomplete
                        styles={{
                            container: {
                              flex: 1,
                            },
                            placeholder:{
                                text: 'black',
                            },
                            textInputContainer: {
                              borderTopWidth: 0,
                              borderBottomWidth: 0,
                              marginLeft: 10,
                              marginRight: 10,
                              marginTop: 20,
                              marginBottom: 20,
                            },
                            textInput: {
                              height: 38,
                              color: 'black',
                              fontSize: 16,
                              
                            },
                            
                          }}
                          fetchDetails={true}
                        placeholder='Search'
                        onPress={async (data, details = null) => {
                            const location = details.geometry.location;
                            setLatitude(location.lat);
                            setLongitude(location.lng);
                            }}
                        query={{
                            key: 'AIzaSyCU18_3ekW7y7z7qVYjg-FoTQ56hUIyPxE',
                            language: 'en',
                            types: '(cities)',
                            components: 'country:pak'
                        }}
                        
                        />
            </View>

            <View style={tailwind`h-1/2 rounded-t-3xl bg-violet-300`}>
                <View style={tailwind`flex-row items-center mb-5`}>
                    <TouchableOpacity style={tailwind`flex-0.1 `} onPress={() => navigation.openDrawer()} >
                        <Image source={require('../screens/pictures/left.png')}></Image>
                    </TouchableOpacity>
                    <View style={{flex:0.4}}></View>
                    <Text style={tailwind`text-center text-2xl font-mono font-extrabold text-sky-900
                                        underline  `}>Add DropOff Location</Text>
                </View>
                
                <TextInput
                    style={tailwind`mx-5 mb-2 rounded-2xl rounded-t-2xl text-center  `}
                    underlineColor='transparent'
                    placeholder="Labour Required"
                    keyboardType='number-pad'
                    onChangeText={value => setLabour(value)}
                    />
                <Button style={tailwind` mx-15 bg-amber-400 text-black mt-2`} mode="contained"onPress={()=>{conformDropOff()}}><Text>Next</Text></Button>
            </View>
            
        
        </View>
    )
}
const styles=StyleSheet.create({
    container : {
        margin: 12
    },
    heading: {
        margin: 20,
        fontSize: 20,
        fontWeight: 'bold'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
      },
})
