import React,{useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet,StatusBar,Platform,ScrollView,Dimensions,SafeAreaView } from 'react-native';
import  MaterialCommunityIcons  from '@expo/vector-icons/MaterialCommunityIcons';
const screenWidth=Dimensions.get('window').width;
const {height}=Dimensions.get('window')
const headerHeight=height*0.1;
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import StepIndicator from 'react-native-step-indicator';
import { Ionicons } from '@expo/vector-icons';
const Questions= ({navigation}:any) => {
    const totalSteps = 13;
    const questions = [
        {
          question: "Hello! I'm your networking guide, Botley. Ready to tailor your experience to your ambitions?",
          options: ["Yes, I'm excited!", "I'm not sure yet.", "I have questions first", "No, thanks."],
        },
        {
            question: "Is there anything else you'd like to share or ask about networking?",
            options: ["Yes may possible", "No not possilbe","may be if possilbe","not possible"],
         
          },
        {
            question: "What specific areas of networking are you interested in learning more about?",
            options: ["Networking fundamental", "Cybersecurity", "Cloud computing", "Wireless networking"],
          },
        {
          question: "What are your main goals or ambitions in networking?",
          options: ["To advance my career", "To learn new skills", "To build professional connections", "To explore different career paths"],
        },
        
        {
          question: "Have you had any previous experience or background in networking?",
          options: ["Yes, I have experience", "No, I'm new to networking", "I have some basic knowledge", "I'm not sure"],
        },
        {
          question: "Is there anything else you'd like to share or ask about networking?",
          options: ["Yes", "No"],
       
        }
      ];
      
      
    const icons = [
      'checkbox-blank-circle',
      'checkbox-marked',
      'checkbox-blank',
      'checkbox-blank-outline'
    ] as any;
    const customStyles = {
        stepIndicatorSize: 10,
        currentStepIndicatorSize: 15,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 3,
        stepStrokeCurrentColor: '#474DEF',
        stepStrokeWidth: 3,
        stepStrokeFinishedColor: '#474DEF',
        stepStrokeUnFinishedColor: '#283455',
        separatorFinishedColor: '#474DEF',
        separatorUnFinishedColor: '#283455',
        stepIndicatorFinishedColor: '#474DEF', 
        stepIndicatorUnFinishedColor: '#283455', 
        stepIndicatorCurrentColor: '#474DEF', 
        stepIndicatorLabelFontSize: 0, 
        currentStepIndicatorLabelFontSize: 0, 
        stepIndicatorLabelCurrentColor: '#283455',
        stepIndicatorLabelFinishedColor: '#474DEF',
        stepIndicatorLabelUnFinishedColor: '#283455',
        labelColor: '#283455',
        labelSize: 13,
        currentStepLabelColor: '#fe7013',
        stepIndicatorBgColor: 'transparent', 
      };
    
    
      const [currentStep, setCurrentStep] = useState(0); 
    
      const handleStepPress = (step:any) => {
        setCurrentStep(step); 
      };
      const formatStepNumber = (step:any) => {
        return step < 9 ? `0${step + 1}` : `${step + 1}`;
      };
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
      <Text style={styles.headerText}>{`${formatStepNumber(currentStep)}/${totalSteps}`}</Text>
      
  
      
      </TouchableOpacity>
    
      </View>
      </LinearGradient>
      <View style={{flex:1}}>
       <ScrollView style={styles.content}>
        <View style={{marginBottom:'5%',marginHorizontal:10,}}>
        <StepIndicator
        customStyles={customStyles}
        currentPosition={currentStep} // Set current position
        stepCount={totalSteps}
        onPress={handleStepPress}
    
        renderStepIndicator={(params) => (
          <View
            style={{
              backgroundColor: params.stepStatus === 'finished' ? customStyles.stepIndicatorFinishedColor : customStyles.stepIndicatorUnFinishedColor,
              borderRadius: customStyles.stepIndicatorSize / 2,
              margin: customStyles.stepStrokeWidth / 2,
              width: params.stepStatus === 'current' ? customStyles.currentStepIndicatorSize : customStyles.stepIndicatorSize,
              height: params.stepStatus === 'current' ? customStyles.currentStepIndicatorSize : customStyles.stepIndicatorSize,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
          
          </View>
        )}
      />
        </View>
       <View style={styles.container}>
        
       <View style={styles.circle}>
       <MaterialCommunityIcons name="language-xaml" size={30} color="#FFF" />
       </View>
       <View style={styles.textContainer}>
         <Text style={styles.heading}>Greeting & Introduction</Text>
      
       </View>
     </View>
     <View style={styles.questionContainer}>
  {questions.map((question, index) => (
    <View>
         <TouchableOpacity style={styles.paragraphContainer} key={index} onPress={() => handleStepPress(index)}>
      <View style={{ flexDirection: 'column' }}>
        <Text style={{color:currentStep===index?'blue':'#FFF', fontSize: 16,  marginBottom: 5 }}>
          {question.question}
        </Text>
      </View>
    </TouchableOpacity>
    <View  style={styles.answerContainer}>
        {question.options.map((option, optionIndex) => (
          <TouchableOpacity key={optionIndex} style={styles.messageBubble}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons
              name={icons[index]} 
              size={24}
              color={'#FFF'}
              style={{ marginRight: 5 }}
            />
            <Text style={{ fontSize: 16, color:  '#FFF' }}>
              {`${option}`}
            </Text>
              </View>
          
          </TouchableOpacity>
        ))}
    </View>
    </View>
  ))}
</View>

      
  
       </ScrollView>

       <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('test')}>
             <Text style={styles.buttonText}>Submit</Text>
           </TouchableOpacity>
  </View>
    </SafeAreaView>
  )
}

export default Questions

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
    marginTop:'5%'
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
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
      marginTop: 20,
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
      height: 60,
      padding: 16,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'stretch',
      borderRadius: 32,
      backgroundColor: '#474DEF',
      marginBottom: 20, 
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
      }
  });