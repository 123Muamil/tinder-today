import React,{useState,useEffect} from "react";
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
import styles, { WHITE } from "../assets/styles";
import { LinearGradient } from 'expo-linear-gradient';
import app from "../config/firebaseConfig";
import { getDatabase, ref,get, onValue} from "firebase/database";
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const halfScreenHeight = height * 0.5;
const Profile = ({ navigation }:any) => {
  
  const [modalVisible, setModalVisible] = useState(false);
  const auth = getAuth(app);
  const database = getDatabase(app);
  const [allUsers,setAllUsers]=useState([])
  const [currentUserData,setCurrentUserData]=useState([])
  const [likes, setLikes] = useState(0);
  // console.log("The current user data is:",likes)
  const currentUser=auth?.currentUser;
  
  // console.log("The All users are:",allUsers)
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
function AverageMatching(users) {
  // Initialize sum and count variables
  let sum = 0;
  let count = 0;

  // Iterate over each user in the array
  users.forEach(user => {
    // console.log("The score is:",user.score)
    if (user.score) {
      // Convert the score to a number and add it to the sum
      sum += parseFloat(user.score);
      // Increment the count
      count++;
    }
  });

  // Calculate the average score
  const average = count > 0 ? sum / count : 0;

  return average;
}
const averageScore = AverageMatching(allUsers);
// console.log("The all users are:",allUsers)
// console.log("Average Matching Score:", averageScore);
useEffect(() => {
  const usersRef = ref(database, `matchingScore/${auth.currentUser.uid}`);
  const fetchUserData = async () => {
    try {
      const snapshot = await get(usersRef);
      const userDataFromDB = [];
      snapshot.forEach((childSnapshot) => {
        const user = childSnapshot.val();
        userDataFromDB.push(user);
      });
      setAllUsers(userDataFromDB);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const usersRef1 = ref(database, 'users');
  const fetchCurrentUserData= async () => {
    try {
        const snapshot = await get(usersRef1);
        const users = [];
        snapshot.forEach(childSnapshot => {
            const user = childSnapshot.val();
            if (user?.uid === currentUser?.uid) { 
                users.push(user);
            }
        });
        setCurrentUserData(users)
       
    } catch (error) {
        console.error("Error fetching users:", error);
    }
  };
  const fetchCurrentUserLikes = async () => {
    const userLikesRef = ref(database, `likes/${currentUser?.uid}`);
    onValue(userLikesRef, (snapshot) => {
      const likesData = snapshot.val();
      const likesCount = likesData ? likesData.likes : 0; // Adjusted to access the likes count correctly
      setLikes(likesCount);
    });
  }
  const fetchCurrentUserDislikes = async () => {
    const userLikesRef = ref(database, `dislikes/${currentUser?.uid}`);
    onValue(userLikesRef, (snapshot) => {
      const likesData = snapshot.val();
      const likesCount = likesData ? likesData.likes : 0; // Adjusted to access the likes count correctly
      setLikes(likesCount);
    });
  }
  
  fetchCurrentUserData();
  fetchUserData();
  fetchCurrentUserLikes();
  fetchCurrentUserDislikes()
}, []); 

  return (
    <SafeAreaView style={{flex:1,backgroundColor: '#010510', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
           <StatusBar backgroundColor="#010510" barStyle="light-content" translucent={true} />
        <View>
      
        {
            currentUserData.map((item:any)=>{
              return<>
               <ImageBackground
         source={{uri:item?.imageUrls[1]}}
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
           {
            currentUserData.map((item:any,index:any)=>{
              return (
                <>
                 <View>
        <Image style={{width:120,height:120,borderRadius:40,marginBottom:10}} source={{uri:item?.imageUrls[0]}} />
     
      </View>
      <View style={{flexDirection:'row'}}>
        <Text style={styles.text}>{item.displayName}</Text>
        <Text style={styles.text}>26</Text>
      </View>
      <View style={{flexDirection:'row'}}>
      <EvilIcons name="location" size={16} color="#FFFFFF" style={{marginRight:5,marginTop:7,}} />
        <Text style={styles.text}>New York</Text>
       
      </View>
                </>
              )
            })
           }
    </View>
  </LinearGradient>
         </ImageBackground>
     
              </>
            })
        }
        </View>
        <View   style={{width:width,height:halfScreenHeight,backgroundColor:'#010510'}}>
          <View style={{flexDirection:'row',justifyContent:'center',width:width}}>
            <View style={styles.likeContainer}>
              <Text style={styles.topText}>{averageScore}%</Text>
              <Text style={styles.bottomText}>Matches</Text>
            </View>
            <View style={styles.likeContainer}>
            <Text style={styles.topText}>{likes}</Text>
              <Text style={styles.bottomText}>Likes</Text>
            </View>
            <View style={styles.likeContainer}>
            <Text style={styles.topText}>75</Text>
              <Text style={styles.bottomText}>Dislikes</Text>
            </View>
          </View>
          <View style={{marginHorizontal:10}}>
         <View style={styles.aboutContainer}>
            
          {
             currentUserData.map((item:any,index)=>{
              return(<>
                <Text style={styles.about}>About</Text>
            <View style={styles.flexContainer1}>
            <View style={styles.justifyRow}>
            <Image source={require('../assets/traveler.png')} style={styles.iconImage}/>
             <Text style={styles.icon}>{item?.interests[0]}</Text>
            </View>
            <View style={styles.Row}>
            <Image source={require('../assets/bikeRider.png')} style={styles.iconImage}/>
             <Text style={styles.icon}>{item?.interests[1]} </Text>
            </View>
            <View  style={styles.Row}>
            <Image source={require('../assets/singer.png')} style={styles.iconImage}/>
             <Text style={styles.icon}>{item?.interests[2]}</Text>
            </View>
            </View>
            <View  style={styles.flexContainer2}>
            <View style={styles.justifyRow}>
            <Image source={require('../assets/teaLover.png')} style={styles.iconImage}/>
             <Text style={styles.icon}>{item.professional_interests[0]}</Text>
            </View>
            <View style={styles.Row}>
            <Image source={require('../assets/photographer.png')} style={styles.iconImage}/>
             <Text style={styles.icon}>{item.professional_interests[1]}</Text>
            </View>
            <View style={styles.Row}>
            <Image source={require('../assets/painter.png')} style={styles.iconImage}/>
             <Text style={styles.icon}>{item.professional_interests[2]}</Text>
            </View>
            </View>
              </>)
             })
          }
          
          </View>
          </View>
        </View>

       
     
    </SafeAreaView>
  );
};

export default Profile;
