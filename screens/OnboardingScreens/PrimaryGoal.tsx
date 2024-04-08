import React,{useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet,StatusBar,Platform,ScrollView,Dimensions,SafeAreaView } from 'react-native';
const screenWidth=Dimensions.get('window').width;
const {height}=Dimensions.get('window')
const headerHeight=height*0.1;
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import StepIndicatorComponent from './StepsIndicator';
import { useStateContext } from '../../redux/context/context';
import { showToast } from '../../redux/context/Toasts';
import Toast from 'react-native-toast-message';
const PrimaryGoal= ({navigation}:any) => {
    const { dispatch } = useStateContext();
    const [selectedText, setSelectedText] = useState('Seeking friendships with depth and inspiration.');
    const texts = ["Seeking friendships with depth and inspiration.", "Building a network that supports my professional ascent.", "Collaborating to turn ideas into realities.", "Learning from others and sharing my expertise."];
    const handleTextPress = (text:string) => {
      setSelectedText(text);
    };
    const hanndleClick=()=>{
      if(selectedText==='')
      {
        showToast("Warning","Please select an option!")
      }
      else
      {
        dispatch({ type: 'ADD_VALUE', payload: { key: 'primary_goal', value: selectedText } });
        navigation.navigate('valuesandmindset')
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
      <Text style={styles.headerText}>Primary Goal</Text>
      </View>
    
      </View>
      </LinearGradient>
      <View style={{flex:1}}>
       <ScrollView style={styles.content}>
       <StepIndicatorComponent currentStep={5}/>
       <View style={styles.container}>
        
          <Text style={styles.text}>Understanding your focus helps us find your tribe. What's at the heart of your journey?</Text>
     </View>
     <View style={{flex:1}}>
     {texts.map((text, index) => (
        <LinearGradient
          key={index}
          colors={
            selectedText === text
              ? ['rgba(71, 77, 239, 0.60)', 'rgba(10, 13, 71, 0.60)']
              : ['rgba(13, 21, 43, 0.40)', 'rgba(13, 21, 43, 0.40)']
          }
          style={[
            styles.textContainer,
            {
              borderColor: selectedText === text ? '#474DEF' : '#283455',
            }
          ]}
        >
          <Text
            style={[
              styles.text,
              { color: selectedText === text ? '#FFF' : '#FFF' }
            ]}
            onPress={() => handleTextPress(text)}
          >
            {text}
          </Text>
        </LinearGradient>
      ))}
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

export default PrimaryGoal

const styles = StyleSheet.create({
    Container:{
        flex:1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header:{
      width:screenWidth,
      height:headerHeight,
      flexDirection:'row',
      gap:60,
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
      bottomHeader: {
        borderTopWidth: 1,
        borderTopColor: '#2D335D',
        marginBottom:10,
      },
  });