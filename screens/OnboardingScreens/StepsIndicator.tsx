import { View } from 'react-native';
import React from 'react';
import StepIndicator from 'react-native-step-indicator'; 
const StepIndicatorComponent = ({currentStep}) => { 
  const totalSteps = 11;
  const customStyles = {
    stepIndicatorSize: 10,
    currentStepIndicatorSize: 15,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#474DEF',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#283455',
    stepStrokeUnFinishedColor: '#283455',
    separatorFinishedColor: '#283455',
    separatorUnFinishedColor: '#283455',
    stepIndicatorFinishedColor: '#283455',
    stepIndicatorUnFinishedColor: '#283455',
    stepIndicatorCurrentColor: '#474DEF',
    stepIndicatorLabelFontSize: 0,
    currentStepIndicatorLabelFontSize: 0,
    stepIndicatorLabelCurrentColor: '#474DEF',
    stepIndicatorLabelFinishedColor: '#474DEF',
    stepIndicatorLabelUnFinishedColor: '#283455',
    labelColor: '#283455',
    labelSize: 13,
    currentStepLabelColor: '#fe7013',
    stepIndicatorBgColor: 'transparent',
  };
  return (
    <View style={{ marginBottom: '5%', marginHorizontal: 10 }}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={currentStep}
        stepCount={totalSteps}
      />
    </View>
  );
};
export default StepIndicatorComponent;


