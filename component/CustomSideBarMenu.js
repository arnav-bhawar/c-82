import React ,{Component} from 'react';
import{StyleSheet,View,Text,TouchableOpacity, TouchableHighlightBase} from 'react-native';
import {DrawerItems} from ' react-navigation-drawer'

import firebase from 'firebase';

export default class CustomSideBarMenu extends Componenet{
    render(){
        return(
            <View style = {{flex:1}}>
            <View style = {StyleSheet.drawerItemsContainer}>
                <DrawerItems{... this.props}/>
            </View>
            <View style = {StyleSheet.logOutContainer}>
                <TouchableOpacity styyle = {StyleSheet.logOutButton}
                onPress = {()=>{
                    TouchableHighlightBase.props.navigation.navigate('WelcomScreen')
                    firebase.auth().signOut()

                }}>
                    <Text>Log out</Text>
                    </TouchableOpacity>
                    </View>
            </View>
        )
    }

}

var styles = StyleSheet.create({
    container:{
        flex:1
    },
    drawerItemsContainer:{
        flex:0.8
    },
    logOutContainer : {
        flex: 0.2,
        justifyContent: 'flex-end',
        paddingButtom: 30
    },
    logOutButton:{
        height: 30,
        width:'100%',
        justifyContent: 'center',
        padding: 10
    },
    logOutText:{
        fontSize: 30,
        fontWeight:'bold'
    }
})