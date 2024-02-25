import React, { useState} from "react";
import { View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, ScrollView, StatusBar, Platform,Dimensions } from "react-native";
// import CardStack, { Card } from "react-native-card-stack-swiper";
import styles from "../assets/styles";
import DEMO from "../assets/data/demo";
import { EvilIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {responsiveHeight} from 'react-native-responsive-dimensions'
const {height} = Dimensions.get("window");
const screenWidth=Dimensions.get('window');

export const DIMENSION_HEIGHT1=height*0.7;
const Home = () => {
  // const [swiper, setSwiper] = useState<CardStack | null>(null);
  // const [activeCardIndex, setActiveCardIndex] = useState(0);

  // const handleSwiped = (index: number) => {
  //   setActiveCardIndex(index);
  // };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#010510', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
      <StatusBar backgroundColor="#010510" barStyle="light-content" translucent={true} />
      <View style={Styles.top}>
        <View><Text style={Styles.explorerText}>Explore</Text></View>
        <TouchableOpacity style={Styles.iconContainer}><Image source={require('../assets/match.png')} /></TouchableOpacity>
      </View>
   
      {/* <CardStack
            loop
            verticalSwipe={true}
            renderNoMoreCards={() => null}
            ref={(newSwiper: any): void => setSwiper(newSwiper)}
            onSwiped={(index) => handleSwiped(index)}
            disableBottomSwipe={false}
          >
            {DEMO.map((item,index) => ( */}
              {/* <Card key={item.id} style={Styles.Card} > */}
                <View>
                  <Image source={require('../assets/images/explorer.png')} style={Styles.explorerImage} />
                  <View style={Styles.explorerInnerContainer}>
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
                  <TouchableOpacity style={styles.crossContainer}>
                    <Entypo name="cross" size={20} color="#FFFFFF" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.heartContainer}>
                    <AntDesign name="heart" size={20} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
                {/* {activeCardIndex === index && (
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#FFF' }}>Name: {item.name}</Text>
                <Text style={{ color: '#FFF' }}>Match: {item.match}%</Text>
              </View>
          )}
              </Card>
            ))}
          </CardStack> */}
    </SafeAreaView>
  );
};

export default Home;

const Styles = StyleSheet.create({
  top: {
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical:10,
 
  },
  explorerText: {
    color: '#FFF',
    fontFamily: '',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 24, 
  },
  iconContainer: {
    width: 48,
    height: 48,
    flexShrink: 0,
    borderRadius: 20,
    backgroundColor: 'rgba(63, 80, 124, 0.16)',
     justifyContent:'center',
     alignItems:'center'
  },
  explorerImage:{
  borderRadius:40,
   height:responsiveHeight(70)
  },
  explorerInnerContainer: {
    width: 337,
    height: 120,
    gap: 8,
    borderRadius: 30,
    backgroundColor: 'rgba(63, 80, 124, 0.40)',
    position:'absolute',
    bottom:0,
    marginBottom:10,
    marginHorizontal:10,
  
  },
  detailsContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    zIndex:1,
  },
  detailsText: {
    color: '#FFF',
    fontSize: 16,
    lineHeight: 24,
  },
  Card:{
      width:'100%',
      height:responsiveHeight(100),
  }
});
