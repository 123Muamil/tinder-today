import { StyleSheet, Text, View,Dimensions,SafeAreaView,Platform,StatusBar,TouchableOpacity,ScrollView } from 'react-native'
import React,{useState,useContext} from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
const screenWidth=Dimensions.get('window').width;
const {height}=Dimensions.get('window')
const headerHeight=height*0.1;
import { dataContext } from '../redux/context/context';
const Interests = ({ navigation }:any) => {
  const {fullData,setFullData}=useContext(dataContext) as any
    const [selectedInterests, setSelectedInterests] = useState([]) as any;
    console.log("The console is:",selectedInterests)
    setFullData(selectedInterests)
    const interests = [
      "Harry Potter",
      "90s Kid",
      "SoundCloud",
      "Spa",
      "Self-care",
      "Basketball",
      "Stam Poetry",
      "Home workouts",
      "Hot springs",
      "Walking",
      "Hot springs",
      "Walking",
      
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
      <TouchableOpacity style={styles.headerTextContainer} onPress={()=>navigation.navigate('add_photos')}>
      <Text style={styles.headerText}>skip</Text>
  <View style={styles.line} />
      
      </TouchableOpacity>
    
      </View>
      </LinearGradient>
      {/* Your content */}
      <View style={{flex:1}}>
      <ScrollView style={styles.content}>
     
       <Text style={styles.heading}>
        Interests
       </Text>
       <Text style={styles.paragraph}>Let everyone know what you're interested in by adding to your profile</Text>
       <View style={{ flex: 1, padding: 20 }}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap',justifyContent:'center',alignItems:'center'}}>
        {interests.map((interest, index) => (
          
          <TouchableOpacity
            key={index}
            style={{
              width: 100,
              height:100,
              backgroundColor: 'rgba(13, 21, 43, 0.40)',
              borderRadius: 50,
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
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{ color: selectedInterests.includes(interest) ? '#D0D9F9' : 'grey', }}>{interest}</Text>
                </LinearGradient>
        
          </TouchableOpacity>
        ))}
      </View>
      <View>
       
       
      </View>
    </View>
      </ScrollView>
      <TouchableOpacity style={styles.selectButton} onPress={()=>navigation.navigate('add_photos')}>
          <Text style={{color:"#FFFFFF"}}>CONTINUE {selectedInterests.length}/22</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Interests

const styles = StyleSheet.create({
   container:{
     flex:1,
     paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
   },
   header:{
    width:screenWidth,
    height:headerHeight,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  
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
 
})