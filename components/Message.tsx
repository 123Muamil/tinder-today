import React,{useState} from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { MessageT } from "../types";
import styles from "../assets/styles";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Message: React.FC<MessageT> = ({ image, lastMessage, name }) => {
  const [time, setTime] = useState("10:30 AM");
  const message =  AsyncStorage.getItem('lastMessage');
  console.log("The last message is:",message)
  return (
    <View style={Styles.messageContainer}>
      <Image source={{uri:image}} style={styles.avatar} />
      <View style={Styles.contentContainer}>
        <View style={Styles.lastMessageContainer}>
          <Text style={Styles.name}>{name}</Text>
          <Text style={Styles.message}>{lastMessage}Hello Every One</Text>
        </View>
      </View>
      <Text style={Styles.time}>{time}</Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
   marginHorizontal:10,
  },
  contentContainer: {
    flex: 1,
  },
  lastMessageContainer: {
    marginTop: 10,
  },
  message: {
    color: '#D0D9F9',
    fontFamily: '',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    paddingTop: 5,
  },
  time: {
    position: 'absolute',
    top: 0,
    right: 0,
    color: '#D0D9F9',
    fontFamily: '',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    marginTop: 10,
  },
  name: {
    color: '#FFF',
    fontFamily: '',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
  
  },
});

export default Message;
