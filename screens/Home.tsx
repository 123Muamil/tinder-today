import React,{useRef,useState} from "react";
import { View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, StatusBar, Platform, Dimensions } from "react-native";
import Swiper from "react-native-deck-swiper";
import DEMO from "../assets/data/demo";
const { height } = Dimensions.get("window");
import  EvilIcons  from 'react-native-vector-icons/EvilIcons';
import  Entypo  from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Home = () => {
    const swiperRef = useRef(null) as any;
     const [showLikeButton, setShowLikeButton] = useState(false);
  const renderCard = (item:any) => {
    return (
      <View style={styles.card}>
        <Image source={item.image} style={styles.cardImage} />
        <View style={styles.explorerInnerContainer}>
                    <View style={styles.matchContainer}>
                      <Text style={styles.NameStyle}>Brandy Kautzer </Text>
                      <View style={styles.MATCHContainer}>
                        <Text style={styles.matchText}>80% Match</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                      <EvilIcons name="location" size={24} color="#FFFFFF" style={{ marginRight: 5, marginTop: 4, }} />
                      <Text style={styles.text}>New York</Text>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.Container}>
                      <View style={styles.Row}>
                        <Image source={require('../assets/traveler.png')} style={styles.iconImage} />
                        <Text style={styles.icon}>Traveler</Text>
                      </View>
                      <View style={styles.Row}>
                        <Image source={require('../assets/singer.png')} style={styles.iconImage} />
                        <Text style={styles.icon}>Singer</Text>
                      </View>
                      <View style={styles.Row}>
                        <Image source={require('../assets/painter.png')} style={styles.iconImage} />
                        <Text style={styles.icon}>Painter</Text>
                      </View>
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
        cards={DEMO}
        renderCard={renderCard}
        backgroundColor="transparent"
        stackSize={3}
        stackScale={5}
        stackSeparation={15}
        cardVerticalMargin={height * 0.05}
        overlayLabels={{
          // bottom: {
          //   title: "NOPE",
          //   style: {
          //     label: {
          //       backgroundColor: "red",
          //       borderColor: "red",
          //       color: "white",
          //       borderWidth: 1
          //     },
          //     wrapper: {
          //       flexDirection: "column",
          //       alignItems: "center",
          //       justifyContent: "center"
          //     }
          //   }
          // },
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
});