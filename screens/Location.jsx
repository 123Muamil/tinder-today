import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,StatusBar,Platform,ScrollView,Dimensions,SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { Entypo } from '@expo/vector-icons';
const screenWidth=Dimensions.get('window').width;
const {height}=Dimensions.get('window')
const headerHeight=height*0.1;
const LocationSelector = ({navigation}) => {
  const [locationEnabled, setLocationEnabled] = useState(false);
  const enableLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }
    setLocationEnabled(true);
  };

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
      <MaterialIcons name="location-on" size={60} color="#FFF" />
   
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>Enable Location</Text>
        <Text style={styles.paragraph}>
          You'll need to enable your location in order to use Tinder
        </Text>
       
      </View>
      
    </View>
   <View style={{marginTop:'50%'}}>
          <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('keep_posted')}>
            <Text style={styles.buttonText}>ALLOW LOCATION</Text>
          </TouchableOpacity>
        <TouchableOpacity style={styles.moreContainer}>
          <Text style={styles.moreText}>TELL ME MORE</Text>
          <Entypo name="chevron-small-down" size={24} color="#d4d7e6" />
        </TouchableOpacity>
   </View>
      </ScrollView>
   </SafeAreaView>
  );
};

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
    paddingHorizontal:'20%',
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

export default LocationSelector;
