import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'

export default class BookRequestScreen extends Component{
    constructor(){
        super();
        this.state = {
            userId : firebase.auth().currentUser.email,
            bookName : "",
            reasonToRequest:""
        }
    }

    createUniqueId(){
        return Math.random().toString(36).substring(7);
    }

    addRequest = (bookName, reasonToRequest) => {
        var userId = this.state.userId
        var randomRequestedId =this.createUniqueId()
        db.collection('requested_books').add({
            "user_id": userId,
            "book_name":bookName,
            "reason_to_request" : reasonToRequest,
            "request_id" : randomRequestedId,
        })

        this.setState({
            bookanme: '',
            reasonToRequest:''
        })

        return Alert.alert("Books Requested Scuccessfully")
    }

    render(){
        return(
            <View style={{flex:1}}>
                <MyHeader title= "Request Book"/>
                <KeyBoardAvoidingView style ={StyleSheet.keyBoardStyle}>
                    <TextInput
                    style = {styles.formTextInput}
                    placeHolder = {"enter book name"}
                    onChangeText = {(text)=>{
                        this.setState({
                            bookNanme: text 
                        })
                    }}

                    value ={ this.state.bookName}
                    />
                    <TextInput
                    style =  {[styles.formTextInput,{height:300}]}
                    multiline
                    numberOfLine = {8}
                    placeHolder={"Why do you need teh book"}
                    onChnageTExt = {(text)=>{
                        this.setState({
                            reasonToRequest:text
                        })
                    }}
                    vale = {this.state.reasonToRequest}
                    />
                    <TouchableOpacity
                    style = {styles.button}
                    onPress = {()=>{this,this.addRequest(this.state.bookNamme,this.state.reasonToRequest)}}
                    >
                        <Text>Request</Text>

                    </TouchableOpacity>


                </KeyBoardAvoidingView>
            </View>
        )
    }
}


const styles = stylesSheey.create({
    keyBoardStyle:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'

    },

    formTextInput :{
        width: "75%",
        height:35,
        alignSelf :'center',
        borderColor: '#ffab91',
        borderRadius: 10,
        borderWidth: 1,
        marginTop:20,
        padding:10,
    },
    button:{
        width:"75%",
        height: 50,
        justifyContent:'center',
        borderRadius: 10,
        backgroundColor: '#ff5722',
        shadowColor:"#000",
        shadowOffset:{
            width:0,
            hieght:8.

        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        levation:16,
        marginTop:20
    },

}
)