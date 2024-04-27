import React,{useState,useEffect} from "react";
import { getDatabase, ref,get } from "firebase/database";
import { getAuth } from 'firebase/auth';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  Platform
} from "react-native";
import { CardItem, Icon } from "../components";
import styles from "../assets/styles";
import app from "../config/firebaseConfig";

const Matches = ({navigation}:any) => {
  const [allUsers, setAllUsers] = useState([]);
  console.log('The users are:',allUsers)
  const auth = getAuth(app);
  const database = getDatabase(app);
  const currentUser=auth.currentUser;
  useEffect(() => {
    const usersRef = ref(database, 'users');
const fetchUsersExceptCurrentUser = async () => {
  try {
      const snapshot = await get(usersRef);
      const users = [];
      snapshot.forEach(childSnapshot => {
          const user = childSnapshot.val();
          if (user.uid !== currentUser.uid) { 
              users.push(user);
          }
      });
      setAllUsers(users)
  } catch (error) {
      console.error("Error fetching users:", error);
  }
};
fetchUsersExceptCurrentUser();
  }, []); 
  return (
    <SafeAreaView style={{flex:1,backgroundColor: '#010510', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
        <StatusBar backgroundColor="#010510" barStyle="light-content" translucent={true} />
    <View style={styles.containerMatches}>
      <View style={styles.top}>
        <Text style={styles.title}>Matches</Text>
        <TouchableOpacity style={styles.circle}>
          <Icon name="ellipsis-vertical" color={'#FFFFFF'} size={20} />
        </TouchableOpacity>
      </View>
      <FlatList
        numColumns={2}
        data={allUsers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item,index }) => (
          <TouchableOpacity    onPress={() => {
            navigation.navigate("ChatScreen", { match: item }); 
          }}
          >
            <CardItem
              image={item.imageUrls?.[0]}
              name={item.displayName}
              // isOnline={item.isOnline}
              hasVariant
              index={index}
            />
          </TouchableOpacity>
        )}
      />
    </View>

    </SafeAreaView>
  )
}

export default Matches


