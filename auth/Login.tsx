import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image ,Dimensions,ImageBackground,SafeAreaView,ScrollView} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { getDatabase, ref, onValue,set } from "firebase/database";
import { getAuth, signInWithEmailAndPassword,GoogleAuthProvider,signInWithCredential} from "firebase/auth";
import app from '../config/firebaseConfig';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/reducer/user';
import Auth from '../service/Auth';
import { LinearGradient } from 'expo-linear-gradient';
const windowWidth = Dimensions.get('window').width;
import * as AppleAuthentication from 'expo-apple-authentication';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// GoogleSignin.configure({
//   webClientId: '387288605049-btadl9uc77qirt3umdoijhajp7pp9idl.apps.googleusercontent.com',
//   iosClientId:'384466588084-q9f2aq8qifaqo11071u71t9k4mobeifn.apps.googleusercontent.com',
// });
const Login = ({ navigation }:any) => {
    const db = getDatabase(app);
    const auth = getAuth(app);
    const dispatch=useDispatch()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [accessToken,setAccessToken]=useState(null) as any
    const [user,set_User]=useState(null)
    const [passowrdShowHide,setPassordShowHide]=useState<boolean>(true)
   
   
    const handleLogin = async () => {
      // navigation.navigate('Tab')
       
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                fetchUserData(user.uid);
            })
            .catch((error) => {
                console.error('Error logging in:', error.message);
            });
    };
  
    const fetchUserData = async (userId:string) => {
        const userRef = await ref(db, 'users/' + userId);
        onValue(userRef, (snapshot) => {
            const userData = snapshot.val();
            dispatch(setUser(userData))
            Auth.setAccount(userData)
            navigation.navigate('Tab')
        });
    };
const GoogleLogin=async()=>{
//  try {
//   await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
//   const {idToken}=await GoogleSignin.signIn()
//   const googleCredential=GoogleAuthProvider.credential(idToken)
//   await signInWithCredential(auth,googleCredential)
//   const user=auth.currentUser
//   if(user)
//   {
//     const data={
//       uid:user.uid,
//       email: user.email,
//       displayName: user.displayName, 
//       photoURL:user.photoURL
//   }
//   set(ref(db, `users/${user.uid}`), data)
//   }
//   if(user)
//   {
//     fetchUserData(user.uid);
//   }
 
  
//  } catch (error) {
//   console.log("Error while google login",error)
//  }
}
const AppleLogin=async()=>{
    try {
     await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      const user=auth.currentUser
      if(user)
      {
        const data={
          uid:user.uid,
          email: user.email,
          displayName: user.displayName, 
          photoURL:user.photoURL
      }
      set(ref(db, `users/${user.uid}`), data)
      }
      if(user)
      {
        fetchUserData(user.uid);
      }
     
   } catch (e) {
    if (e.code === 'ERR_REQUEST_CANCELED') {
      // Handle the scenario when the user cancels the sign-in flow
      console.log('User canceled the sign-in flow');
    } else {
      // Handle other errors
      console.error('Error occurred during sign-in:', e.message);
    }
  }
}
// Rotate Image to passowrd show and hide
const visibilityStyle = {
  marginRight: 10,
  transform: passowrdShowHide ?  [{ rotate: '0deg' }] : [{ rotate: '180deg' }], 
};
    return (
            <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent} nestedScrollEnabled={true}>
                <LinearGradient
                    colors={['#010510', '#010510']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <ImageBackground source={require('../assets/images/login.png')} style={styles.imageContianer}>
                        <Image source={require('../assets/images/logo.png')} style={styles.logoImage} />
                        <Text style={styles.welcomeText}>Welcome!</Text>
                        <Text style={styles.LOGOText}>LOGO</Text>
                    </ImageBackground>
                    <View style={styles.authContianer}>
                        <Text style={styles.authText}>Email Id</Text>
                        <View style={styles.inputContainer1}>
                            <Image source={require('../assets/email.png')} style={styles.icon}/>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Email Address"
                                placeholderTextColor="#757A8D"
                                onChangeText={setEmail}
                                keyboardType='email-address'
                            />
                        </View>
                        <Text style={styles.authText}>Password</Text>
                        <View style={styles.inputContainer}>
                            <Image source={require('../assets/password.png')} style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Password"
                                placeholderTextColor="#757A8D"
                                onChangeText={setPassword}
                                keyboardType="default"
                                secureTextEntry={passowrdShowHide}
                            />
                           <TouchableOpacity onPress={()=>setPassordShowHide(!passowrdShowHide)}>
                           <Image source={require('../assets/hideshow.png')}  style={visibilityStyle}/>
                           </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.forgotContainer} onPress={()=>navigation.navigate('interests')}>
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                            <Text style={styles.buttonText}>Log In</Text>
                        </TouchableOpacity>
                        <View style={styles.dividerContainer}>
                            <View style={styles.line}></View>
                            <Text style={styles.orText}>Or</Text>
                            <View style={styles.line}></View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.authButton} onPress={AppleLogin}>
                                <AntDesign name="apple1" size={24} color="#FFFFFF" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.authButton} onPress={GoogleLogin}>
                                <AntDesign name="google" size={24} color="#FFFFFF" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.accountContainer}>
                          <Text style={styles.account}>Don’t have an account?</Text>
                        <TouchableOpacity onPress={()=>navigation.navigate('Signup')}>
                           <Text style={styles.register}>Register</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            </ScrollView>
    </SafeAreaView>
    );
};


// Styles
const styles = StyleSheet.create({
    container: {
      flex:1,
    },
    scrollViewContent: {
        flexGrow: 1,
      
    },
  imageContianer:{
    width:windowWidth,
   
    resizeMode:'cover',
    justifyContent:'center',
    alignItems:'center',
    opacity: 0.8,
    borderRadius:0,
  },
  logoImage:{
    marginTop:90,
  },
  welcomeText: {
    color: '#FFF',
    fontFamily: '',
    fontSize: 28,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  LOGOText: {
    position: 'absolute',
    left: 150,
    top: 140,
    color: '#D0D9F9',
    textAlign: 'center',
    fontFamily: '',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '500', 
},
authContianer:{
  width:windowWidth,
  backgroundColor:'#050B1A',
  borderTopRightRadius:40,
  borderTopLeftRadius:40,
  borderWidth:1,
  position: 'relative',
  borderColor:'#434978',
   padding:20,
 
},
authText: {
  color: '#D0D9F9',
  fontFamily: '',
  fontSize: 14,
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: 20, 
   marginTop:10,
},
inputContainer1: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 16,
  borderRadius: 48,
  borderWidth: 1,
  borderColor: '#283455',
  backgroundColor: '#0D152B',
  padding:16,
  marginTop:10,
},
inputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 16,
  borderRadius: 48,
  borderWidth: 1,
  borderColor: '#283455',
  backgroundColor: '#0D152B',
  padding:16,
  marginTop:10,
},
icon: {
  marginRight: 8,
},
input: {
  flex: 1,
  color: 'white',
  fontSize: 16,
 
},
forgotContainer:{
   alignItems:'flex-end',
   marginTop:10,
}
,
forgotPasswordText: {
  color: '#FFF',
  fontFamily: '',
  fontSize: 14,
  fontStyle: 'normal',
  fontWeight: '500',
  lineHeight: 20,
  textDecorationLine: 'underline',
},
loginButton: {
  padding: 16,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 32,
  backgroundColor: '#474DEF',
  marginTop:30,
},
buttonText: {
  color: '#FFF',
  fontFamily: '', 
  fontSize: 18,
  fontWeight: '700',
  lineHeight: 24,
},
 dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop:20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#757A8D',
    marginHorizontal: 10,
  },
  orText: {
    color: '#757A8D',
    fontFamily: '',
    fontSize: 14,
    fontWeight: '400',
    marginHorizontal: 10,
  },
   authButton: {
    display: 'flex',
    padding: 16,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#434978',
    backgroundColor: 'rgba(12, 20, 40, 0.40)',
    width:60,
  },
  buttonContainer:{
       flexDirection:'row',
       gap:16,
       justifyContent:'center',
       alignItems:'center',
       marginTop:20,
       marginBottom:30,
  },
   account: {
    color: '#757A8D',
    fontFamily: '',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 14,
  },
   register: {
    color: '#FFF',
    fontFamily: '',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 14,
    textDecorationLine: 'underline',
  },
  accountContainer:{
     flexDirection:'row',
     gap:5,
     justifyContent:'center',
     alignItems:'center',
     marginBottom:20,
  }
});
export default Login;
