import React ,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity, SnapshotViewIOS} from 'react-native';
import{Card,Header,Icon} from 'react-native-elements';
import firebase from 'firebase';

import db from '../config.js';

export default class RecieverDetailsScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            userId : firebase.auth().currentUser.email,
            recieverId : this.props.navigation.getParam('details')["user_id"],
            requestId : this.props.navigation.getParem('details')["request_id"],
            bookName:  this.props.navigation.getParam('details')["book_name"],
            reason_for_requesting : this.props.naviation.getParam('detals')["reason_to_request"],
            recieverName: '',
            recieverContact: '',
            recieverAddress: '',
            recieverRequestDocId: '',
        }
    }


    getRecieverDetails(){
        db.collection('users').where('email_id','==',this.state.recieverId).get()
        .then(snashot=>{
            SnapshotViewIOS.forEach(doc=>{
                this.setState({recieverRequestDocId:doc.id})
            })
        })}

        updateBookStatus = ()=>{
            db.collection('all_donations').add({
                book_name : this.state.bookName,
                request_id : this.state.requestId,
                donor_id : this.state.userId,
                request_status: "Donor Intersted"
            })
        }
        componentDidMount(){
            this.getRecieverDetails()
        }

render(){
    return(
        <View style = {StyleSheet.container}>
            <View style = {{flex:0.1}}>
            <Header
            leftComponent = {<Icon name = 'arrow-left' type= 'feather' color='#696969' onPress={()=>this.props.navigation.goBack()}/>}
            centerComponent = {{text:"Donate Books", style:{color: '#90A5A9',fontSize:20},fontWeight:"bold",}}
            backgroundColor = "#eaf8fe"
                />

            </View>
            <View style= {{flex:0.3}}>
                <Card
                title  = {"Book Information"}
                tittleStyle = {{fontSize: 20}}
                >
                    <   Card>
                        <Text style = {{fontWeight: 'bold'}}>Name:{this.state.bookName}</Text>
                    </Card>
                <Card>
                    <Text style = {{fontWeight: 'bold'}}>Reason: {this.state.reason_for_requesting}</Text>
                </Card>
                </Card>
            </View>
            <View style = {{flex:0.3}}>
                <Card 
                title = {"Reciever Information"}
                titleStyle = {{fontSize: 20}}
                >
                    <Card>
                        <Text style = {{fontWeight: 'bold'}}>Name: {this.state.recieverName}</Text>
                    </Card>
                    <Card>
                    <Text style = {{fontWeight: 'bold'}}>Contact: {this.state.recieverContact}</Text>
                    </Card>
                </Card>
            </View>

            <View style = {StyleSheet.buttonContainer}>
                {
                    this.state.recieverid !==this.state.userId
                    ?(
                        <TouchableOpacity
                        style = {StyleSheet.button}
                        onPress = {()=>{
                            this.updateBookStauts()
                            this.props.navigtion.navigate('MyDonations')
                        }}>
                            <Text>I want to Donate</Text>
                        </TouchableOpacity>
                    )
                    :null
                }
            </View>
        </View>
    )
}


}

const styles = StyleSheet.create({
    container: {
      flex:1,
    },
    buttonContainer : {
      flex:0.3,
      justifyContent:'center',
      alignItems:'center'
    },
    button:{
      width:200,
      height:50,
      justifyContent:'center',
      alignItems : 'center',
      borderRadius: 10,
      backgroundColor: 'orange',
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       },
      elevation : 16
    }
  })