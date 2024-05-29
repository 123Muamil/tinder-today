import React,{useEffect,useState} from "react";
import { NavigationContainer,DefaultTheme} from '@react-navigation/native';
import { Home, Matches, Messages, Profile } from "./screens";
import TabBarIcon from "./components/TabBarIcon";
import ChatScreen from "./screens/ChatScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Forgotpassword from './auth/ForgotPassword'
import {useDispatch ,useSelector} from 'react-redux';
import Auth from "./service/Auth";
import { setUser } from "./redux/reducer/user";
import { useTheme } from 'react-native-paper';
import { BlurView } from 'expo-blur';
import Interests from "./screens/Interests";
import ProfessionalInterests from "./screens/OnboardingScreens/ProfessionalInterests";
import Add_Photos from "./screens/Add_Photos";
import LocationSelector from "./screens/Location";
import Keep_Posted from "./screens/Keep_Posted";
import Privacy from "./screens/Privacy";
import Test from './screens/Test'
import Questions from "./screens/Questions";
import Introduction from "./screens/OnboardingScreens/Introduction";
import Personalization from "./screens/OnboardingScreens/Personalization";
import PrimaryGoal from "./screens/OnboardingScreens/PrimaryGoal";
import ValuesAndMindset from "./screens/OnboardingScreens/ValuesAndMindset";
import ConnectionGoals from "./screens/OnboardingScreens/ConnectionGoals";
import FinalThoughts from "./screens/OnboardingScreens/FinalThoughts";
import PotentialMatches from "./screens/OnboardingScreens/PotentialMatches";
import InviteCircle from "./screens/OnboardingScreens/InviteCircle";
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#010510',
  },
};
const index = () => {
  
    const theme = useTheme();
  theme.colors.secondaryContainer = "transperent"
      const dispatch=useDispatch()
      const { userData, login } = useSelector((state) => state.User);
      // console.warn("The user is:",login)
      console.log(login)
      useEffect(() => {
        getUser();
      }, []);
      const getUser=async()=>{
          let data=await Auth.getAccount();
          if(data!=null)
          {
              dispatch(setUser(data))
          }
      }
   
  
  return (
    <NavigationContainer theme={MyTheme}>
    <Stack.Navigator  initialRouteName={!login?"Login":'Tab'} >
      <Stack.Screen
        name="Tab"
        options={{ headerShown: false,}}
      >
        {() => (
           <BlurView intensity={100} tint="light" blurReductionFactor={32} style={{flex:1}}>
             <Tab.Navigator
          theme={{colors:{secondaryContainer:'transparent'}}}
            shifting={true}
            activeColor="#474DEF"
            inactiveColor="#FFFFFF"
            sceneAnimationEnabled={true}
            labeled={false}
          
            barStyle={{ backgroundColor: 'rgba(63, 80, 124, 0.24)',

             borderRadius:40,
              marginHorizontal:5,
              marginBottom:10,
              overflow: 'hidden',
              justifyContent:'center',
              alignItems:'center',
              position: "absolute",
              zIndex:1000,
              }}
              
            screenOptions={({ route }) => ({
            
              tabBarIcon: ({ focused}) => {
                let iconName;
               
                if (route.name === "Explore") {
                  iconName = "search";
                  
                } else if (route.name === "Matches") {
                  iconName = "heart";
                } else if (route.name === "Chat") {
                  iconName = "chatbubble";
                  
                } else if (route.name === "Profile") {
                  iconName = "person";
                }
                const tabs = ["Explore", "Matches", "Chat", "Profile"];
                const isLast = route.name === tabs[tabs.length - 1];
                return (
                  <TabBarIcon
                    focused={focused}
                    iconName={iconName || ""} // Provide a default value if necessary
                    label={route.name}
                    isLast={isLast}
                  />
                );
              },
             
            
          
            
        
            })}
           
          >
            
            <Tab.Screen name="Explore" component={Home} options={{tabBarColor:"green"}}/>
            <Tab.Screen name="Matches" component={Matches} />
            <Tab.Screen name="Chat" component={Messages} />
            <Tab.Screen name="Profile" component={Profile} />
          </Tab.Navigator>
           </BlurView>
        )}
      </Stack.Screen>
      <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false}}  />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false,}}/>
      <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false,}}/>
      <Stack.Screen name="interests" component={Interests} options={{ headerShown: false,}}/>
      <Stack.Screen name="pro_interests" component={ProfessionalInterests} options={{ headerShown: false,}}/>
      <Stack.Screen name="add_photos" component={Add_Photos} options={{ headerShown: false,}}/>
      <Stack.Screen name="location" component={LocationSelector} options={{headerShown:false}}/>
      <Stack.Screen name="keep_posted" component={Keep_Posted} options={{headerShown:false}}/>
      <Stack.Screen name="privacy" component={Privacy} options={{headerShown:false}}/>
      <Stack.Screen name="questions" component={Questions} options={{headerShown:false}}/>
      <Stack.Screen name="introduction" component={Introduction} options={{headerShown:false}}/>
      <Stack.Screen name="personalization" component={Personalization} options={{headerShown:false}}/>
      <Stack.Screen name="primarygoal" component={PrimaryGoal} options={{headerShown:false}}/>
      <Stack.Screen name="valuesandmindset" component={ValuesAndMindset} options={{headerShown:false}}/>
      <Stack.Screen name="connectiongoals" component={ConnectionGoals} options={{headerShown:false}}/>
      <Stack.Screen name="finalthoughts" component={FinalThoughts} options={{headerShown:false}}/>
      <Stack.Screen name="potentialmatches" component={PotentialMatches} options={{headerShown:false}}/>
      <Stack.Screen name="invitecircle" component={InviteCircle} options={{headerShown:false}}/>
      <Stack.Screen name='forgot' component={Forgotpassword} options={{headerShown:false}}/>
      <Stack.Screen name="test" component={Test}/>
    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default index
