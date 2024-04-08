import { StyleSheet, Text, View,Dimensions,SafeAreaView,Platform,StatusBar,TouchableOpacity,ScrollView } from 'react-native'
import React,{useState} from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
const screenWidth=Dimensions.get('window').width;
const {height}=Dimensions.get('window')
const headerHeight=height*0.1;
import StepIndicatorComponent from './StepsIndicator';
import { useStateContext } from '../../redux/context/context';
const ProfessionalInterests = ({ navigation }:any) => {
    const [selectedInterests, setSelectedInterests] = useState([]) as any;
    const { dispatch } = useStateContext();
    // console.log("The console is:",selectedInterests)
    const interests = [
      "Technology & Software Dev.",
      "Business Development & Entrepreneurship",
      "Creative Industries & Design",
      "Marketing & Communications",
      "Science & Research",
      "Finance & Investment",
      "Education & Training",
      "Healthcare & Medical Fields",
      "Non-Profit & Community Work",
      "Engineering & Manufacturing",
      
      
    ];
    const handleInterestToggle = (interest:any) => {
        const index = selectedInterests.indexOf(interest);
        if (index === -1) {
          setSelectedInterests([...selectedInterests, interest]);
        } else {
          const updatedInterests = [...selectedInterests];
          updatedInterests.splice(index, 1);
          setSelectedInterests(updatedInterests);
        }
      };
      const handleClick=()=>{
        dispatch({ type: 'ADD_VALUE', payload: { key: 'professional_interests', value: selectedInterests } });
        navigation.navigate('personalization')
    }
  return (
    <SafeAreaView style={styles.container}>
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
      <Text style={styles.headerText}>Professional Interests </Text>
      </View>
    
      </View>
      </LinearGradient>
      {/* Your content */}
      <View style={{flex:1}}>
      <ScrollView style={styles.content}>
     
      <StepIndicatorComponent currentStep={3}/>
      <View style={styles.container1}>
        <Text style={styles.text}>Your professional pursuits are a mosaic of your ambition. Which fields are you looking to make your mark in or explore with others?</Text>
   </View>
       <View style={{ flex: 1, padding: 0 }}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap',justifyContent:'center',alignItems:'center'}}>
        {interests.map((interest, index) => (
          
          <TouchableOpacity
            key={index}
            style={{
              width: 116,
              height:116,
              backgroundColor: 'rgba(13, 21, 43, 0.40)',
              borderRadius: 100,
              marginRight: '2%',
              borderWidth: 1,
              marginBottom:'4%',
              justifyContent:'center',
              alignItems:"center",
            
             
              borderColor:selectedInterests.includes(interest) ? '#474DEF' : '#283455'
            }}
            onPress={() => handleInterestToggle(interest)}
          >
         
         <LinearGradient
                  colors={selectedInterests.includes(interest) ? ['rgba(71, 77, 239, 0.60)', 'rgba(10, 13, 71, 0.60)'] : ['rgba(13, 21, 43, 0.40)', 'rgba(13, 21, 43, 0.40)']}
                  style={{
                    width: 116,
                    height: 116,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf:'center',
                    padding:1
                  }}>
                  <Text style={{ color: selectedInterests.includes(interest) ? '#D0D9F9' : '#D0D9F9',fontSize:12 }}>{interest}</Text>
                </LinearGradient>
        
          </TouchableOpacity>
        ))}
      </View>
      <View>
       
       
      </View>
    </View>
      </ScrollView>
      <View >
        <View style={styles.bottomHeader}/>
      <TouchableOpacity style={styles.selectButton} onPress={handleClick}>
          <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
          </View>
      </View>
    </SafeAreaView>
  )
}

export default ProfessionalInterests

const styles = StyleSheet.create({
   container:{
     flex:1,
     paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
   },
   buttonText: {
  color: '#FFF',
  fontSize: 18,
  fontStyle: 'normal',
  fontWeight: '700',
   
  },
   header:{
    width:screenWidth,
    height:headerHeight,
    flexDirection:'row',
    gap:50,
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
   
  },
  heading:{
    color: '#FFF',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '500',
    alignSelf: 'center',
    marginBottom:10,
  },
  paragraph:{
    marginHorizontal:'10%',
    color: '#D0D9F9',
    textAlign: 'center',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  selectButton:{
    backgroundColor:"#474DEF",
    padding:16,
    borderRadius:32,
    justifyContent:'center',
    alignItems:'center',
    marginBottom:'5%',
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
  container1:{
    padding: 12,
    borderWidth:5,
      borderColor:'#191D2B',
      borderRadius:10,
      textAlign:'justify',
      backgroundColor:'rgba(27, 30, 67, 0.20)',
      elevation:6,
      marginTop:'2%',
    
  }
  ,
    text:{
        color: '#D0D9F9', 
        fontSize: 16,
        fontStyle: 'normal', 
        fontWeight: '400', 
    },
    bottomHeader: {
      borderTopWidth: 1,
      borderTopColor: '#2D335D',
      marginBottom:10,
    },
})