import { StyleSheet, Text, View ,TouchableOpacity, ScrollView} from 'react-native'
import React,{useState} from 'react'
import StepIndicator from 'react-native-step-indicator';
import { Ionicons } from '@expo/vector-icons';
const Test = () => {
 
  const totalSteps = 13;
  const questions = [
    "Curious to see this! ",
    "Let's do this!",
    "Not sure but okay",
    "Others"
  ];
  const icons = [
    'add',
    'add',
    'add',
    'add'
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
    stepIndicatorBgColor: 'transparent', // Transparent background for step indicator
  };


  const [currentStep, setCurrentStep] = useState(0); // Start from step 0

  const handleStepPress = (step:any) => {
    setCurrentStep(step); // Update current step
  };

  return (
    <ScrollView style={styles.container}>
    
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
     
     <View style={styles.questionContainer}>
      {questions.map((question, index) => (
        <TouchableOpacity style={styles.messageBubble} key={index} onPress={() => handleStepPress(index)}>
                   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons
              name={icons[index]} // Use corresponding icon for the question
              size={24}
              color={currentStep === index ? '#474DEF' : '#FFF'}
              style={{ marginRight: 5 }}
            />
            <Text style={{ fontSize: 16, color: currentStep === index ? 'blue' : '#FFF' }}>
              {`${question}`}
            </Text>
          </View>

        </TouchableOpacity>
      ))}
</View>
    </ScrollView>
  )
}
export default Test
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  questionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
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
  },
})