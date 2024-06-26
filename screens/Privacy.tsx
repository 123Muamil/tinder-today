import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,StatusBar,Platform,ScrollView,Dimensions,SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
const screenWidth=Dimensions.get('window').width;
const {height}=Dimensions.get('window')
const headerHeight=height*0.1;
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
const Privacy = ({navigation}:any) => {
  return (
    <SafeAreaView style={styles.Container}>
    <StatusBar backgroundColor="#010510" translucent={true} />
    <LinearGradient
        colors={['rgba(71, 77, 239, 0.20)', 'rgba(71, 77, 239, 0.40)', 'rgba(10, 13, 71, 0.40)', 'rgba(10, 13, 71, 0.20)']}
        start={[0.5, 0]}
        end={[0.5, 1]}
      >
          <View style={styles.header}>
        
      <TouchableOpacity style={{width:40,height:40,borderRadius:50,backgroundColor:'rgba(63, 80, 124, 0.16)',justifyContent:'center',alignItems:'center'}} onPress={()=>navigation.goBack()}>
      <AntDesign  name="arrowleft" size={20} color="#FFFFFF" style={styles.headerIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.headerTextContainer} onPress={()=>navigation.navigate('privacy')}>
      <Text style={styles.headerText}>skip</Text>
  <View style={styles.line} />
      
      </TouchableOpacity>
    
      </View>
      </LinearGradient>
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
           <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('location')}>
             <Text style={styles.buttonText}>I ACCEPT</Text>
           </TouchableOpacity>
         <TouchableOpacity style={[styles.moreContainer,{marginTop:20,}]}>
         <Text style={styles.moreText}>PERSONALISE</Text>
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
      alignItems:'center',
     },
     headerIcon:{
          padding:'5%',
     },
     headerText:{
      paddingRight:'5%',
      color:'#FFFFFF'
     },
     content: {
      flex: 1, 
      backgroundColor: '#010510', 
    marginTop:'15%'
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    circle: {
      width: 150,
      height: 150,
      borderRadius: 100,
      backgroundColor: 'rgba(12, 20, 40, 0.24)',
      borderWidth: 1,
      borderColor: '#434978',
      justifyContent:'center',
      alignItems:'center'
    },
    textContainer: {
      marginTop: 20,
    },
    heading: {
      color: '#FFF',
      fontSize: 20,
      fontStyle: 'normal',
      fontWeight: '500',
      alignSelf:'center',
      marginBottom:10
    },
    paragraph: {
      color: '#D0D9F9',
      textAlign: 'center',
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: '400',
    },
    button: {
      height: 60,
      padding: 16,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'stretch',
      borderRadius: 32,
      backgroundColor: '#474DEF',
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 20,
      fontStyle: 'normal',
      fontWeight: '500',
    },
    locationText: {
      fontSize: 16,
      marginTop: 10,
    },
    moreContainer: {
      height: 60,
      padding: 16,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'stretch',
      borderRadius: 32,
      borderWidth: 1,
      borderColor: '#474DEF',
      marginTop:15,
    },
    moreText: {
      color: '#474DEF',
      fontSize: 18,
      fontStyle: 'normal',
      fontWeight: '700',
    },
    headerTextContainer: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    line: {
      width: 25,
      height: 1,
      backgroundColor: '#FFFFFF',
      alignSelf:'center',
      marginRight:20    ,
    },
  });