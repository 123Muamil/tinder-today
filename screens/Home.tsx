import React,{useRef,useState,useEffect} from "react";
import { View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, StatusBar, Platform, Dimensions } from "react-native";
import Swiper from "react-native-deck-swiper";
const { height } = Dimensions.get("window");
import  EvilIcons  from 'react-native-vector-icons/EvilIcons';
import  Entypo  from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getDatabase, ref,get,set, update } from "firebase/database";
import { getAuth } from 'firebase/auth';
import app from "../config/firebaseConfig";
import {  compareAllUsers } from "../config/MatchingAlgorithm";
const Home = () => {
  const auth = getAuth(app);
  const database = getDatabase(app);
  const [udatedAllUsers,setUpdatedAllUsers]=useState([])
  const [currentUserData,setCurrentUserData]=useState({})
  const currentUser=auth?.currentUser;
    const swiperRef = useRef(null) as any;
     const [showLikeButton, setShowLikeButton] = useState(false);
     const [allUsers, setAllUsers] = useState([]);
     useEffect(() => {
      const usersRef = ref(database, 'users');
  const fetchUsersExceptCurrentUser = async () => {
    try {
        const snapshot = await get(usersRef);
        const users = [];
        snapshot.forEach(childSnapshot => {
            const user = childSnapshot.val();
            if (user?.uid !== currentUser?.uid) { 
                users.push(user);
            }
        });
        setAllUsers(users)
    } catch (error) {
        console.error("Error fetching users:", error);
    }
  };
  const fetchCurrentUserData= async () => {
    try {
        const snapshot = await get(usersRef);
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
  fetchUsersExceptCurrentUser();
  fetchCurrentUserData();
  
    }, []); 
    useEffect(() => {
      const matchScores = compareAllUsers(currentUserData, allUsers);
      const updatedUsers = [...allUsers];
      matchScores.forEach(match => {
          const userIndex = updatedUsers.findIndex(user => user.uid === match.to);
          if (userIndex !== -1) {
              updatedUsers[userIndex].score = match.score;
          }
      });
      setUpdatedAllUsers(updatedUsers)  
  }, [currentUser,allUsers]); 
  const storeOrUpdateData = async (userId:any, data:any) => {
    const usersRef = ref(database, `matchingScore/${userId}`);
   try {
     const snapshot = await get(usersRef);
     const exists = snapshot.exists();
     if (exists) {
       const updatedData = { ...data };
       await update(usersRef, updatedData);
      //  console.log('Data updated successfully');
     } else {
       const newData = { ...data };
       await set(usersRef, newData);
      //  console.log('Data stored successfully');
     }
   } catch (error) {
     console.error('Error storing or updating data:', error);
   }
 };
 
 if(udatedAllUsers.length!==0)
  {
   const currentUser = auth?.currentUser;
   const userId=currentUser?.uid;
   storeOrUpdateData(userId,udatedAllUsers)
  }
    useEffect(() => {
      const usersRef = ref(database, 'matchingScore');
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
      fetchUserData();
    }, []); 
 
  const renderCard = (item:any) => {
 
 
    return (
      <View style={styles.card}>
        <Image source={{ uri: item?.imageUrls?.[0] }} style={styles.cardImage} />
        <View style={styles.explorerInnerContainer}>
                    <View style={styles.matchContainer}>
                      <Text style={styles.NameStyle}>{item?.displayName}</Text>
                      <View style={styles.MATCHContainer}>
  <Text style={styles.matchText}>
    {item?.score }
  </Text>
</View>

                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                      <EvilIcons name="location" size={24} color="#FFFFFF" style={{ marginRight: 5, marginTop: 4, }} />
                      <Text style={styles.text}>Lahore</Text>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.Container}>
            {item?.professional_interests?.map((interest: string, index: number) => (
              <View key={index} style={styles.Row}>
               
                <Image source={require('../assets/traveler.png')} style={styles.iconImage} />
                <Text style={styles.icon}>{interest}</Text>
              </View>
            ))}
          </View>
                  </View>
                  <TouchableOpacity style={styles.crossContainer} onPress={handleCrossButtonClick}>
                    <Entypo name="cross" size={20} color="#FFFFFF" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.heartContainer} onPress={handleLikeButtonClick}>
                    <AntDesign name="heart" size={20} color="#FFFFFF" />
                  </TouchableOpacity>
                   {showLikeButton && (
          <View
            style={styles.heartContainer1}
          
          >
            <AntDesign name="heart" size={20} color="#FFFFFF" />
          </View>
        )}
      </View>
    );
  };
   const handleCrossButtonClick = () => {
    if (swiperRef.current) {
      swiperRef.current.swipeLeft(); 
    }
  };
    const handleLikeButtonClick = () => {
      console.log("You like this text")
      console.warn('Like')
      setTimeout(() => {
         if (swiperRef.current) {
          setShowLikeButton(false)
      swiperRef.current.swipeRight(); 
    }
      }, 1000);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#010510" barStyle="light-content" translucent={true} />
      <View style={styles.top}>
        <Text style={styles.explorerText}>Explore</Text>
        <TouchableOpacity style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconContainer}><Image source={require('../assets/match.png')} /></TouchableOpacity>
        </TouchableOpacity>
      </View>

      <Swiper
        ref={swiperRef}
        cards={allUsers}
        renderCard={renderCard}
        backgroundColor="transparent"
        stackSize={3}
        stackScale={5}
        stackSeparation={15}
        cardVerticalMargin={height * 0.05}
        overlayLabels={{
          right: {
            title: "Like",
            style: {
              label: {
                backgroundColor: "green",
                borderColor: "green",
                color: "white",
                borderWidth: 1
              },
              wrapper: {
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }
            }
          }
        }}
        animateOverlayLabelsOpacity
        animateCardOpacity
        swipeBackCard
        infinite={true}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010510',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  explorerText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 24,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 20,
    backgroundColor: 'rgba(63, 80, 124, 0.16)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical:'20%'
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius:20,
  },
  explorerInnerContainer: {
    width: '100%',
    height: 120,
    gap: 8,
    borderRadius: 30,
    backgroundColor: 'rgba(63, 80, 124, 0.40)',
    position:'absolute',
    bottom:0,
    marginBottom:10,
    marginHorizontal:10,
  
  },
  matchContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:20,
    marginTop:10,
   },
 
   NameStyle: {
     color: '#FFF',
     fontFamily: '',
     fontSize: 20,
     fontStyle: 'normal',
     fontWeight: '500',
     lineHeight: 24, 
    
   },
   matchText: {
     color: '#000',
     fontFamily: '',
     fontSize: 10,
     fontStyle: 'normal',
     fontWeight: '500',
     lineHeight: 10,
     letterSpacing: 0.2,
     textTransform: 'uppercase',
   },
   MATCHContainer: {
     display: 'flex',
     paddingVertical: 4,
     paddingHorizontal: 8,
     justifyContent:'flex-end',
     alignItems: 'flex-end',
     gap: 4,
     borderRadius: 40,
     backgroundColor: '#FFF',
   },
   line: {
     height: 1,
     alignSelf: 'stretch',
     borderBottomWidth: 1,
     borderBottomColor: 'rgba(255, 255, 255, 0.10)',
   },
   Container:{
   flexDirection:'row',
   justifyContent:'space-between',
   marginHorizontal:30,
   },
   Row:{
 flexDirection:'row'
   },
   justifyRow:{
     flexDirection:'row',marginLeft:10,
   },
   crossContainer: {
     padding: 16,
     flexDirection: 'column',
     alignItems: 'flex-start',
     gap: 8,
     borderRadius: 20,
     backgroundColor: 'rgba(63, 80, 124, 0.40)',
     position:'absolute',
     right:0,
     bottom:140,
   },
   heartContainer:{
     padding: 16,
     flexDirection: 'column',
     alignItems: 'flex-start',
     gap: 8,
     borderRadius: 20,
     backgroundColor: 'rgba(63, 80, 124, 0.40)',
     position:'absolute',
     right:0,
     bottom:200,
   },
    heartContainer1:{
     padding: 16,
     flexDirection: 'column',
     alignItems: 'flex-start',
     gap: 8,
     borderRadius: 20,
     backgroundColor: 'rgba(63, 80, 124, 0.40)',
     position:'absolute',
     right:0,
     bottom:270,
   },
   text: {
    color: '#FFF',
    fontFamily: '',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 16 * 1.5,
    marginRight:10
  },
  icon: {
    color: '#D0D9F9',
    fontFamily: '',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 14 * 1.5, 
  },
  iconImage:{
    width:16,
    height:16,
    marginTop:2,
    marginRight:5,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#010510',
  },
});