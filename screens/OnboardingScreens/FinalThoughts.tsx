import React,{useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet,StatusBar,TextInput,Platform,ScrollView,Dimensions,SafeAreaView } from 'react-native';
const screenWidth=Dimensions.get('window').width;
const {height}=Dimensions.get('window')
const headerHeight=height*0.1;
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import StepIndicatorComponent from './StepsIndicator';
import { useStateContext } from '../../redux/context/context';
import { showToast } from '../../redux/context/Toasts';
import Toast from 'react-native-toast-message';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const FinalThoughts= ({navigation}:any) => {
   const [value,setValue]=useState('')
   const {dispatch } = useStateContext();
   const hanndleClick=()=>{
    if(value==='')
    {
      showToast("Warning","Please select an option!")
    }
    else
    {
      dispatch({ type: 'ADD_VALUE', payload: { key: 'final_thoughts', value: value} });
      navigation.navigate('potentialmatches')
    }
  }
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
      <View style={styles.headerTextContainer} >
      <Text style={styles.headerText}>Final Thoughts</Text>
      </View>
    
      </View>
      </LinearGradient>
      <View style={{flex:1}}>
       <ScrollView style={styles.content}>
       <StepIndicatorComponent currentStep={8}/>
       <View style={styles.container}>
          <Text style={styles.text}>Any final thoughts you'd like to share to enhance your connections on Today?</Text>
     </View>
     <View style={{flex:1}}>
     <View style={styles.messageContainer}>
      <MaterialCommunityIcons name="android-messages" size={20} color="#757A8D" style={styles.icon} />
      <TextInput
        placeholder="Write here..."
        placeholderTextColor="#757A8D"
        style={styles.input}
        multiline
        onChangeText={(text)=>setValue(text)}
      />
    </View>
     </View>

      
  
       </ScrollView>
       <View >
        <View style={styles.bottomHeader}/>
       <TouchableOpacity style={styles.button} onPress={hanndleClick}>
             <Text style={styles.buttonText}>Next</Text>
           </TouchableOpacity>
           </View>
  </View>
  <Toast/>
    </SafeAreaView>
  )
}

export default FinalThoughts

const styles = StyleSheet.create({
    Container:{
        flex:1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header:{
      width:screenWidth,
      height:headerHeight,
      flexDirection:'row',
      gap:70,
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
    marginTop:'5%'
    },
    container: {
      padding: 12,
      borderWidth:5,
        borderColor:'#191D2B',
        borderRadius:10,
        textAlign:'justify',
        backgroundColor:'rgba(27, 30, 67, 0.20)',
        elevation:6,
        marginTop:'2%',
        marginBottom:'4%',
    },
    text:{
        color: '#D0D9F9', 
        fontSize: 16,
        fontStyle: 'normal', 
        fontWeight: '400', 
    },
    circle: {
      width: 80,
      height: 80,
      borderRadius: 100,
      backgroundColor: 'rgba(12, 20, 40, 0.24)',
      borderWidth: 1,
      borderColor: '#434978',
      justifyContent:'center',
      alignItems:'center'
    },
    textContainer: {
      flexDirection:"row",
      alignSelf:"flex-start",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#2A2F5C',
      paddingHorizontal: 10,
      paddingVertical: 8,
      marginBottom: 10, 
      marginRight:10,  
    },
    paragraphContainer:{
        borderWidth:5,
        borderColor:'#191D2B',
        borderRadius:10,
        marginHorizontal:15,
        textAlign:'justify',
        marginBottom:10,
      
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
      backgroundColor:"#474DEF",
    padding:16,
    borderRadius:32,
    justifyContent:'center',
    alignItems:'center',
    marginBottom:'5%',
    },
    buttonText: {
      color: '#FFF',
   
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '700',
    
     
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
    questionContainer: {
        paddingHorizontal: 10,
        marginTop:20,
      },
      messageBubble: {
        flexDirection:"row",
        alignSelf:"flex-start",
        borderRadius: 48,
        borderWidth: 1,
        borderColor: '#2A2F5C',
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 10, 
        marginRight:10,     
      },
      answerContainer:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
      },
      inner: {
    backgroundColor: '#D0D9F9',
    shadowColor: '#5B6897',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 6, // This is for Android
  },
  messageContainer:{
    height: 108,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    flexShrink: 0,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#283455',
    backgroundColor: '#0D152B',
  },
  
  icon: {
    width: 20,
    height: 20,
    marginTop:4,
  },
  input: {
    color: '#FFF',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    flex: 1,
  },
  bottomHeader: {
    borderTopWidth: 1,
    borderTopColor: '#2D335D',
    marginBottom:10,
  },
  });