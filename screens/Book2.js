import React from "react";
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native'
import { TextInput, Button, Text, Appbar } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import tailwind from "twrnc";
import DateTimePicker from '@react-native-community/datetimepicker';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { GooglePlacesAutocomplete  } from 'react-native-google-places-autocomplete';
import { requestLocationPermission } from '../src/services/location_service';




export default Book2 = ({navigation}) =>{
    
    const [latitude, setLatitude] = React.useState(0);
    const [longitude, setLongitude] = React.useState(0);
    const route=useRoute();
    const [data,setData]=React.useState(route.params.data);

    const [date, setDate] = React.useState(new Date());
    const [time, setTime] = React.useState('');
    const [Today, setToday] = React.useState(new Date());
    const [show, setShow] = React.useState(false);
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
    

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        
    };
    const submitDate= () =>{
        data.date=date;
        data.time=time;
        data.pickuplongitude=longitude;
        data.pickuplatitude=latitude;
        navigation.navigate('Page 3',{
            data:data,
        })
    }
    const showDatePicker = () => {
        setShow(true);
    };

    return(
        <View style={tailwind`bg-white`}>
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
                              text: 'black'
                              
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
                              text: 'black'
                              
                            },
                            textInput: {
                              height: 38,
                              color: 'black',
                              text: 'black',
                              fontSize: 16,
                            
                              borderColor: 'black',
                              
                            },
                            listView:{
                                text: 'black',
                                marginHorizontal: 10,
                            
                                
                            },
                            
                          }}
                          fetchDetails={true}
                          enablePoweredByContainer={false}
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
            <View style={tailwind`h-1/2 bg-violet-300 rounded-t-3xl`}>
                <View style={tailwind`flex-row`}>
                    <TouchableOpacity style={tailwind`flex-0.1 `} onPress={() => navigation.openDrawer()} >
                        <Image source={require('../screens/pictures/left.png')}></Image>
                    </TouchableOpacity>
                    <View style={{flex:0.4}}></View>
                    <Text style={tailwind`text-center text-2xl font-extrabold mt-5 text-sky-900 underline`}>SCHEDULE BOOKING</Text>
                    
                </View>       

                
                <TextInput
                    style={tailwind`mt-2 mx-5 mb-0 rounded-b-2xl rounded-t-2xl text-center`}
                    placeholder="Departure Time (24 hrs)"
                    underlineColor='transparent'
                    keyboardType='number-pad'
                    value={time}
                    onChangeText={setTime}
                />            
                <Text style={tailwind`text-center text-2xl font-extrabold m-5 text-sky-900 underline`}>Select a Departure date:</Text>
                <Button onPress={showDatePicker} >
                <Text style={tailwind`text-center text-xl font-extrabold m-5 text-black bg-white`} >{`${date.toLocaleDateString()}`}</Text>
                    {show && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="date"
                        minimumDate={Today}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        />
                    )}
                </Button>
                <Button style={tailwind` mx-15 bg-amber-400 text-black mt-5`} mode="contained" onPress={()=>{submitDate()}}><Text style={tailwind`text-black`}>Next</Text></Button>
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
    map: {
        ...StyleSheet.absoluteFillObject,
      },
    
})