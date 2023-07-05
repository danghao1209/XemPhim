import React from 'react';
import {Text,View,StyleSheet} from 'react-native';
import { COLORS,SIZES,FONTS } from '../../constants';
const NewFeed = ()=>{
    return(
        <View style={style.container}>
        <Text style={style.text}>This is notification</Text>
        </View>
    )
}
const style = StyleSheet.create({
    container:{
        display:'flex',
        position:'absolute',
        height: "13%", 
        width:"85%",
        backgroundColor: COLORS.third,
        borderRadius:30,
        top:180,
        left:30,
        alignItems:'center',
        justifyContent:'center',
        zIndex: 3, // works on ios
        elevation: 3, // works on android
    },
    text:{
        fontSize:20,
        color: COLORS.white,
        textAlign:'center',

    },
    text2:{
        marginHorizontal: SIZES.padding,
        color: COLORS.gray,
        fontSize:16
    }
})
export default NewFeed;