import Toast from 'react-native-toast-message';
export const showToast = (text1:string,text2:string) => {
    Toast.show({
        type: 'success',
        position: 'top',
        text1: text1,
        text2: text2,
        visibilityTime: 3000, 
        autoHide: true,
        topOffset: 50,
        bottomOffset: 40,
        text2Style:{color:'green'}
      });
};
