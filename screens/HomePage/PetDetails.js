import React from 'react';
import {Text, View,StyleSheet} from 'react-native';

const PetDetails = ({ route,navigation })=>{
    console.log(route)
    return(
        <View style={style.container}>
        <Text>{route.params.data.name}</Text>
        </View>
    )
}
const style = StyleSheet.create({
   container:{
    flex:1
   }
});
export default PetDetails;