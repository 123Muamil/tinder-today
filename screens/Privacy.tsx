import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,StatusBar,Platform,ScrollView,Dimensions,SafeAreaView } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
const screenWidth=Dimensions.get('window').width;
const {height}=Dimensions.get('window')
const headerHeight=height*0.1;
const Privacy = ({navigation}:any) => {
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
       <MaterialIcons name="privacy-tip" size={60} color="#FFF" />
       </View>
       <View style={styles.textContainer}>
         <Text style={styles.heading}>We value your privacy</Text>
         <Text style={styles.paragraph}>
          We use tools to measure the audience of our app, to personalise ads, to enhance Tinder's own marketing operations and 
          to enable social features. These tools do not track you access apps and websites
         </Text>
        
       </View>
       
     </View>
    <View style={{marginTop:'10%'}}>
           <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('')}>
             <Text style={styles.buttonText}>I ACCEPT</Text>
           </TouchableOpacity>
         <TouchableOpacity style={[styles.button,{marginTop:20,}]}>
         <Text style={styles.buttonText}>PERSONALISE</Text>
         </TouchableOpacity>
    </View>
       </ScrollView>
    </SafeAreaView>
  )
}

export default Privacy

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