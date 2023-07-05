import React from 'react';
import {Text,View,StyleSheet} from 'react-native';
import { COLORS,SIZES,FONTS } from '../../constants';
const Wellcome = ()=>{
    return(
        <View style={style.container}>
        <Text style={style.text}>Hello My Friend</Text>
        <Text style={style.text2}>Have a good day with your pet !</Text>
        </View>
    )
}
const style = StyleSheet.create({
    container:{
        position:'relative',
        height: "30%", 
        backgroundColor: COLORS.gray2,
        borderBottomLeftRadius:50,
        borderBottomRightRadius:50
    },
    text:{
        marginTop: SIZES.padding * 3, 
        marginHorizontal: SIZES.padding,
        color: COLORS.white,
        fontWeight:'bold',
        ...FONTS.h2,
        fontSize:30
    },
    text2:{
        marginHorizontal: SIZES.padding,
        color: COLORS.gray,
        fontSize:16
    }
})
export default Wellcome;