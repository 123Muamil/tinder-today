import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image ,Dimensions,ImageBackground,SafeAreaView,ScrollView} from 'react-native';
import { getAuth, sendPasswordResetEmail} from "firebase/auth";
import app from '../config/firebaseConfig';
import { LinearGradient } from 'expo-linear-gradient';
const windowWidth = Dimensions.get('window').width;
import Toast from 'react-native-toast-message';
import { showToast } from '../redux/context/Toasts';
const Login = ({ navigation }:any) => {
    const auth = getAuth(app);
    const [email, setEmail] = useState('');
    const handlePress=async()=>{
        try {
            await sendPasswordResetEmail(auth,email); 
            showToast("Success","Password reset email sent successfully.")
            setEmail('');
          } catch (error) {
            console.log(error.message);
          }
    }
    return (
            <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent} nestedScrollEnabled={true}>
                <LinearGradient
                    colors={['#010510', '#010510']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <ImageBackground source={require('../assets/images/login.png')} style={styles.imageContianer}>
                        <Image source={require('../assets/today_logo.png')} style={styles.logoImage} />
                        <Text style={styles.welcomeText}>Welcome!</Text>
                    
                       
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
                                value={email}
                            />
                        </View>
                        <TouchableOpacity style={styles.forgotContainer} onPress={()=>navigation.navigate('Login')}>
                            <Text style={styles.forgotPasswordText}>Log In?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.loginButton} onPress={handlePress} >
                            <Text style={styles.buttonText}>Forgot Password</Text>
                        </TouchableOpacity>
                      
                       
                       
                    </View>
                </LinearGradient>
                <Toast/>
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
    width: 120,
   height: 120,

  },
  welcomeText: {
    color: '#FFF',
    fontFamily: '',
    fontSize: 28,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  LOGOText: {
    width: 275,
height: 315.703,
flexShrink: 0,
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
