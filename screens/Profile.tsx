import React,{useState} from "react";
import { getAuth, signOut } from "firebase/auth";
import {
  View,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Platform,
  StatusBar,
  Modal
} from "react-native";
import { Icon} from "../components";
import { EvilIcons } from '@expo/vector-icons';
import DEMO from "../assets/data/demo";
import styles, { WHITE } from "../assets/styles";
import { LinearGradient } from 'expo-linear-gradient';
import app from "../config/firebaseConfig";
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const halfScreenHeight = height * 0.5;
const Profile = ({ navigation }:any) => {
  
  const [modalVisible, setModalVisible] = useState(false);
  const auth = getAuth(app);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
const Logout=async()=>{
  signOut(auth).then(() => {
    setModalVisible(false)
    navigation.navigate('Login')
  }).catch((error) => {
    console.log("error while logout")
  });
}
  return (
    <SafeAreaView style={{flex:1,backgroundColor: '#010510', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
           <StatusBar backgroundColor="#010510" barStyle="light-content" translucent={true} />
        <View>
      
         <ImageBackground
         source={require('../assets/images/profile.png')}
        style={{width:width,height:halfScreenHeight}}
        resizeMode="cover"
        
         >
     
              <View style={styles.top}>
            <TouchableOpacity>
              <Text style={styles.topIconLeft}>Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.circle} onPress={toggleModal}>
              <Icon
                name="ellipsis-vertical"
                size={20}
                color={WHITE}
                style={styles.topIconRight}
              />

            </TouchableOpacity>
            {/* Modal  */}
            <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View
          style={{
            position: 'absolute',
            top: 100,
            right: 0,
            width: 200,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          
          }}
        >
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <TouchableOpacity onPress={Logout}>
              <Text style={{ marginBottom: 10 }}>Logout</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => console.log('New Broadcast')}>
              <Text style={{ marginBottom: 10 }}>New Broadcast</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Linked Devices')}>
              <Text style={{ marginBottom: 10 }}>Linked Devices</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Starred Messages')}>
              <Text style={{ marginBottom: 10 }}>Starred Messages</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Settings')}>
              <Text>Settings</Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity onPress={toggleModal}>
              <Text style={{ marginTop: 20 }}>Close</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </Modal>

            {/* end of modal */}
          </View>
          <LinearGradient
        colors={['rgba(1, 5, 16, 0.00)', '#010510']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1}}
      >
          <View style={styles.profile}>
      <View>
        <Image source={require('../assets/images/profile1.png')} />
      </View>
      <View style={{flexDirection:'row'}}>
        <Text style={styles.text}>Julio Mitchell</Text>
        <Text style={styles.text}>26</Text>
      </View>
      <View style={{flexDirection:'row'}}>
      <EvilIcons name="location" size={16} color="#FFFFFF" style={{marginRight:5,marginTop:7,}} />
        <Text style={styles.text}>New York</Text>
       
      </View>
    </View>
  </LinearGradient>
         </ImageBackground>
     
        </View>
        <View   style={{width:width,height:halfScreenHeight,backgroundColor:'#010510'}}>
          <View style={{flexDirection:'row',justifyContent:'center',width:width}}>
            <View style={styles.likeContainer}>
              <Text style={styles.topText}>80%</Text>
              <Text style={styles.bottomText}>Matches</Text>
            </View>
            <View style={styles.likeContainer}>
            <Text style={styles.topText}>150</Text>
              <Text style={styles.bottomText}>Likes</Text>
            </View>
            <View style={styles.likeContainer}>
            <Text style={styles.topText}>75</Text>
              <Text style={styles.bottomText}>Dislikes</Text>
            </View>
          </View>
          <View style={{marginHorizontal:10}}>
         <View style={styles.aboutContainer}>
            
            <Text style={styles.about}>About</Text>
            <View style={styles.flexContainer1}>
            <View style={styles.justifyRow}>
            <Image source={require('../assets/traveler.png')} style={styles.iconImage}/>
             <Text style={styles.icon}>Traveler</Text>
            </View>
            <View style={styles.Row}>
            <Image source={require('../assets/bikeRider.png')} style={styles.iconImage}/>
             <Text style={styles.icon}>Bike Rider     </Text>
            </View>
            <View  style={styles.Row}>
            <Image source={require('../assets/singer.png')} style={styles.iconImage}/>
             <Text style={styles.icon}>Singer</Text>
            </View>
            </View>
            <View  style={styles.flexContainer2}>
            <View style={styles.justifyRow}>
            <Image source={require('../assets/teaLover.png')} style={styles.iconImage}/>
             <Text style={styles.icon}>Tea lover</Text>
            </View>
            <View style={styles.Row}>
            <Image source={require('../assets/photographer.png')} style={styles.iconImage}/>
             <Text style={styles.icon}>Photographer</Text>
            </View>
            <View style={styles.Row}>
            <Image source={require('../assets/painter.png')} style={styles.iconImage}/>
             <Text style={styles.icon}>Painter</Text>
            </View>
            </View>
          
          </View>
          </View>
        </View>

       
     
    </SafeAreaView>
  );
};

export default Profile;
