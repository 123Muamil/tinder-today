import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,StatusBar,Platform,ScrollView,Dimensions,SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
const screenWidth=Dimensions.get('window').width;
const {height}=Dimensions.get('window')
const headerHeight=height*0.1;

const Keep_Posted = ({navigation}:any) => {
  return (
    <SafeAreaView style={styles.Container}>
   <StatusBar backgroundColor="red" translucent={true} />
          <View style={styles.header}>
      <TouchableOpacity onPress={()=>navigation.goBack()}>
      <Entypo name="chevron-left" size={24} color="#d6d9ec" style={styles.headerIcon} />
      </TouchableOpacity>
      <TouchableOpacity>
      <Text style={styles.headerText}>skip</Text>
      </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
      <View style={styles.container}>
      <View style={styles.circle}>
      <Ionicons name="chatbubble-ellipses-outline" size={60} color="#FFF" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>Keep me posted</Text>
        <Text style={styles.paragraph}>
          Find out when you get a match of message
        </Text>
       
      </View>
      
    </View>
   <View style={{marginTop:'50%'}}>
          <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('privacy')}>
            <Text style={styles.buttonText}>I WANT TO BE NOTIFIED</Text>
          </TouchableOpacity>
        <TouchableOpacity style={styles.moreContainer}>
          <Text style={styles.moreText}>TELL ME MORE</Text>
          <Entypo name="chevron-small-down" size={24} color="#d4d7e6" />
        </TouchableOpacity>
   </View>
      </ScrollView>
   </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    Container:{
        flex:1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header:{
      width:screenWidth,
      height:headerHeight,
      flexDirection:'row',
      justifyContent:'space-between',
      backgroundColor:'#FFF'
     },
     headerIcon:{
          padding:'5%',
     },
     headerText:{
      padding:'5%',
     },
     content: {
      flex: 1, 
      backgroundColor: 'white', 
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    circle: {
      width: 150,
      height: 150,
      borderRadius: 75,
      backgroundColor: '#f3f4f7',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textContainer: {
      marginTop: 20,
    },
    heading: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color:"#515151"
    },
    paragraph: {
     
      marginVertical: 10,
      paddingHorizontal:'10%',
      color:'#d2c9c9'
    },
    button: {
      backgroundColor:"#d53a3f",
      padding:16,
      borderRadius:40,
      justifyContent:'center',
      alignItems:'center',
      marginHorizontal:'10%'
    },
    buttonText: {
      color: '#FFF',
      fontSize: 16,
    },
    locationText: {
      fontSize: 16,
      marginTop: 10,
    },
    moreContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
      justifyContent:'center'
    },
    moreText: {
      marginRight: 5,
      color:'#d4d7e6'
    },
  });
  
  export default Keep_Posted
  