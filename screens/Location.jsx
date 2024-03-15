import React, { useContext, useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,StatusBar,Platform,ScrollView,Dimensions,SafeAreaView } from 'react-native';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { dataContext } from '../redux/context/context';
const screenWidth=Dimensions.get('window').width;
const {height}=Dimensions.get('window')
const headerHeight=height*0.1;
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
const LocationSelector = ({navigation}) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const {fullData,setFullData}=useContext(dataContext)
  useEffect(() => {
    console.log("The data is:",fullData)
  }, [])
const GetLocation=async()=>{
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    setErrorMsg('Permission to access location was denied');
    return;
  }

  let initialLocation = await Location.getCurrentPositionAsync({});
  setLocation(initialLocation);
  console.log("The location is:",initialLocation)
  setMapRegion({
    latitude: initialLocation.coords.latitude,
    longitude: initialLocation.coords.longitude,
    latitudeDelta: 0.0522,
    longitudeDelta: 0.0421
  });
}
const handleRegionChangeComplete = (region) => {
  setMapRegion(region);
  console.log("Updated location:", region);
};
const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ec3b9"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1a3646"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#64779e"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#334e87"
      }
    ]
  }

];

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
      <TouchableOpacity style={styles.headerTextContainer} onPress={()=>navigation.navigate('keep_posted')}>
      <Text style={styles.headerText}>skip</Text>
  <View style={styles.line} />
      </TouchableOpacity>
      </View>
      </LinearGradient>
      <View style={{flex:1}}>
      <ScrollView style={[styles.content, { marginTop: location ? '5%' : '15%' }]}>
    {location ? (
        <View style={styles.container1}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            showsUserLocation={true}
            region={mapRegion}
            customMapStyle={mapStyle}
            onRegionChangeComplete={handleRegionChangeComplete}
          >
            {mapRegion && <Marker title='Today' coordinate={mapRegion} />}
          </MapView>
        </View>
     
    ) : (
      <View style={styles.container}>
        <View style={styles.circle}>
          <EvilIcons name="location" size={60} color="#FFFFFF" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>Enable Location</Text>
          <Text style={styles.paragraph}>
            You'll need to enable your location in order to use Tinder
          </Text>
        </View>
      </View>
    )}
  </ScrollView>
      <View style={{marginBottom:'25%',marginTop:10}}>
          <TouchableOpacity style={styles.button} onPress={GetLocation}>
          {/* ()=>navigation.navigate('keep_posted') */}
            <Text style={styles.buttonText}>ALLOW LOCATION</Text>
          </TouchableOpacity>
        <TouchableOpacity style={styles.moreContainer}>
          <Text style={styles.moreText}>TELL ME MORE</Text>
      
        </TouchableOpacity>
   </View>
      </View>
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
  container1: {
    borderRadius: 20, 
    overflow: 'hidden',
  },
  map: {
    width: Dimensions.get('screen').width * 0.95,
    height: Dimensions.get('screen').height * 0.43,
  },
});

export default LocationSelector;
