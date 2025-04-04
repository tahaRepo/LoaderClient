import { myAxios } from "./helper";

export const register=async (userDetail)=>{
    const userDetailsString = JSON.stringify(userDetail);
    const userDetails = JSON.parse(userDetailsString);
    const cnic = parseInt(userDetails.cnic);

    const data={
        "userName": userDetails.username,
        "companyName": userDetails.companyName,
        "password":userDetails.password,
        "cnic": cnic,
        "phoneNumber" : userDetails.phonenumber
    }
    const response = await myAxios.post('api/client/',data);
    return response;
}
export const login=async (userDetail)=>{
    const userDetailsString = JSON.stringify(userDetail);
    const userDetails = JSON.parse(userDetailsString);
    // const data={
    //     "userName": "SyedMubarak",
    //     "password":"Syed!123",
    // };
    const data={
        "userName": userDetails.username,
        "password":userDetails.password,
    };
    const response = await myAxios.post('api/client/login',data);
    return response;
}

export const getUser=async (id)=>{
    const response=myAxios.get(`api/client/${id}`);
    return response;
}


export const updateUser=async (data)=>{
    const Data={
        "userName":data.userName,
        "companyName": data.companyName,
        "password":data.newPassword,
        "cnic": data.cnic,
        "phoneNumber" : data.phoneNumber
    }
    console.log(data);
    const response=myAxios.put(`api/client/${data.id}`,Data);
    return response;
}

export const addReview=async (data)=>{
    console.log(data);
    const Data={
        "rating": data.rating,
        "comment": data.comment,
        "reviewDate": null,
        "order": {
            "orderId": data.orderId,
            "orderName": null,
            "noOfLabors": 0,
            "totalWeight": 12.0,
            "totalSize": 1.0,
            "fragility": false,
            "price": 15.0,
            "status": {
                "statusId": 3,
                "status": "pending"
            },
            "client": {
                "id": data.client.id,
                "userName": "SyedMubarak",
                "password": "Syed!123",
                "phoneNumber": "03043737019",
                "cnic": 4510287726477,
                "companyName": "Jil"
            },
            "driver": {
                "id": data.driver.id,
                "userName": "driver_1",
                "password": "driver1pass",
                "phoneNumber": "034393443443",
                "cnic": 441098565045,
                "licenseNumber": "441098565645-455",
                "yearsOfExperience": 6,
                "salary": 6000,
                "foodCost": 500,
                "status": {
                    "statusId": 1,
                    "status": "busy"
                },
                "vehicle": {
                    "vehicleId": 2,
                    "name": "giant container",
                    "maxWeightCarry": 454,
                    "minWeightCarry": null,
                    "maxSizeCarry": null,
                    "mileage": 56.0,
                    "plateNo": "API-108",
                    "cost": {
                        "maintenanceCost": 3434.6,
                        "fuelCost": 534.0
                    },
                    "vtype": {
                        "typeId": 2,
                        "typeName": "bulk",
                        "cost": null
                    },
                    "status": {
                        "statusId": 4,
                        "status": "assigned"
                    }
                }
            },
            "payment": {
                "paymentId": data.payment.paymentId,
                "paymentMode": data.payment.paymentMode
            },
            "orderLocation": {
                "pickUp": "0",
                "dropOff": "0"
            },
            "orderSchedule": {
                "schedule": "2023-05-15T07:30:33.502+00:00"
            },
            "estimatedArrivalOfGoods": data.estimatedArrivalOfGoods,
            "image": null,
            "imageName": null,
            "imageType": null
        },
        "client": {
            "id": global.id,
            "userName": "SyedMubarak",
            "password": "Syed!123",
            "phoneNumber": "03043737019",
            "cnic": 4510287726477,
            "companyName": "Jil"
        }
    };
    console.log("Here is the Data"+JSON.stringify(Data))
    const response=myAxios.post(`api/review/order/${data.orderId}/client-review`,Data);
    return response
}
export const getReview=async (data)=>{
   
    const response=myAxios.get(`api/review/order/${data.orderId}/client-review`);
    return response
}
export const pay=async (data)=>{
   
    const response=myAxios.post(`api/pay/charge/${data.id}/${data.amount}/${data.description}`);
    return response
}

export const getAllOrder=async ()=>{
    const response=myAxios.get('api/orders/');
    return response;
}

export const getVehicleType=async ()=>{
    const response=myAxios.get('api/vehicle-type/');
    return response;
}
export const getAllVehicles=async ()=>{
    const response=myAxios.get('api/vehicle/');
    return response;
}

export const updateOrderStatus=async (Data)=> {
   var pickup="";
   var dropoff="";
   
    if(Data.pickuplatitude!==undefined){
       pickup=Data.pickuplatitude+","+Data.pickuplongitude;
       dropoff=Data.dropOffLatitude+","+Data.dropOffLongitude;

   }
   else{
    pickup=Data.pickUp;
    dropoff=Data.dropOff;
   }
    Data.size=parseInt(Data.size);
    Data.weight=parseInt(Data.weight);
    let data={
        "orderId": Data.orderId,
        "orderName": Data.orderName,
        "noOfLabors": Data.noOfLabors,
        "totalWeight": Data.weight,
        "totalSize": Data.size,
        "paymentStatus": Data.paymentStatus,
        "fragility": false,
        "status": {
            "statusId": Data.status.statusId||Data.statusId,
            "status": Data.status.status||Data.status
        },
        "price": Data.price,
        "client": {
            "id": Data.client.id,
            "userName": "cent1",
            "password": "mypassword",
            "phoneNumber": "1234567890",
            "cnic": 1234567890123,
            "companyName": "company"
        },
        "driver": {
            "id": 1,
            "userName": "funny_driver",
            "password": "2323",
            "phoneNumber": "24433232332",
            "cnic": 434343434434,
            "licenseNumber": "232332",
            "yearsOfExperience": 32,
            "salary": 23232,
            "foodCost": 2323,
            "status": {
                "statusId": 1,
                "status": "busy"
            },
            "vehicle": {
                "vehicleId": 6,
                "name": "formevehicle",
                "maxWeightCarry": 3434,
                "mileage": 3434.0,
                "plateNo": "V234",
                "cost": {
                    "maintenanceCost": 645.0,
                    "fuelCost": 434.0
                },
                "vtype": {
                    "typeId": 3,
                    "typeName": "container"
                },
                "status": {
                    "statusId": 4,
                    "status": "assigned"
                }
            }
        },
        "payment": {
            "paymentId": Data.paymentId,
            "paymentMode": Data.paymentMode
        },
        "pickUp": pickup,
        "dropOff": dropoff,
        "estimatedArrivalOfGoods": null,
        "schedule": Data.schedule||null
    }

    console.log("Value Of Data: "+JSON.stringify(data)+"Ends Here")
    const response=myAxios.put(`api/orders/${Data.orderId}`,data);
    return response;
}

export const getOrder=async (id)=>{
    const response=myAxios.get(`api/orders/${id}`)
    return response;
}

export const placeOrder=async (Data) => {
    const pickup=Data.pickuplatitude+","+Data.pickuplongitude;
    const dropoff=Data.dropOffLatitude+","+Data.dropOffLongitude;
    Data.size=parseFloat(Data.size);
    Data.weight=parseFloat(Data.weight);
    const data={
        "orderName": Data.ordername,
        "noOfLabors": Data.labour,
        "totalWeight": Data.weight,
        "totalSize": Data.size,
        "paymentStatus": "pending",
        "fragility": false,
        "status": {
            "statusId": 2,
            "status": "Bidding"
        },
        "price": Data.price,
        "client": {
            "id": Data.clientId,
            "userName": "cent1",
            "password": "mypassword",
            "phoneNumber": "1234567890",
            "cnic": 1234567890123,
            "companyName": "company"
        },
        "driver": {
            "id": 1,
            "userName": "funny_driver",
            "password": "2323",
            "phoneNumber": "24433232332",
            "cnic": 434343434434,
            "licenseNumber": "232332",
            "yearsOfExperience": 32,
            "salary": 23232,
            "foodCost": 2323,
            "status": {
                "statusId": 1,
                "status": "busy"
            },
            "vehicle": {
                "vehicleId": 6,
                "name": "formevehicle",
                "maxWeightCarry": 3434,
                "mileage": 3434.0,
                "plateNo": "V234",
                "cost": {
                    "maintenanceCost": 645.0,
                    "fuelCost": 434.0
                },
                "vtype": {
                    "typeId": 3,
                    "typeName": "container"
                },
                "status": {
                    "statusId": 4,
                    "status": "assigned"
                }
            }
        },
        "payment": {
            "paymentId": 1,
            "paymentMode": "Credit Card"
        },
        "pickUp": pickup,
        "dropOff": dropoff,
        "estimatedArrivalOfGoods": null,
        "schedule": Data.date
    }
   const response = myAxios.post('api/orders/',data);
   return response;
}