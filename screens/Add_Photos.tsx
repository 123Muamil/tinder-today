import { StyleSheet, Text, View,SafeAreaView,StatusBar,TouchableOpacity,Dimensions,Platform,ScrollView,Image } from 'react-native'
import React,{useState,useContext} from 'react'
import { AntDesign } from '@expo/vector-icons';
const screenWidth=Dimensions.get('window').width;
const {height}=Dimensions.get('window')
const headerHeight=height*0.1;
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { EvilIcons } from '@expo/vector-icons';
import { DraggableGrid } from 'react-native-draggable-grid';
import { dataContext } from '../redux/context/context';
interface MyTestProps {}
interface MyTestState {
  data: { key: string; image: string }[];
}
const Add_Photos:React.FC<MyTestProps> = ({ navigation }:any) => {
  const [data, setData] = useState<MyTestState['data']>([]);
  console.log("The images are:",data)
  const {fullData,setFullData}=useContext(dataContext) as any
  // setFullData((fullData: any)=>[...fullData,data])
  
  // console.log("The data is:",data) this data is send to next
  const render_item = (item: { image: string; key: string }) => {
    return (
      <View style={styles.showImage} key={item.key}>
         <Image style={styles.image} source={{ uri: item.image }} />
         </View>
    );
  };
  const onDragRelease = (updatedData: { key: string; image: string }[]) => {
    setData(updatedData);
  };
  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 1,
        allowsMultipleSelection: true, // This property is not supported by Expo's ImagePicker
    });

    if (!result.canceled) {
        const newImages = result.assets.map(asset => {
            if (asset.fileSize > 10 * 1024 * 1024) {
                alert('Image size exceeds 2MB limit.');
                return null; 
            }
            return {
                image: asset.uri,
                key: Math.random().toString(),
            };
        }).filter(image => image !== null); // Filter out null values

        if (newImages.length > 0) {
            setData([...data, ...newImages]);
            setFullData((prevFullData: any) => [...prevFullData, ...newImages]);
        }
    }
};


  return (
    <SafeAreaView style={styles.container}>
         <StatusBar backgroundColor="#010510" translucent={true} />
         <LinearGradient
        colors={['rgba(71, 77, 239, 0.20)', 'rgba(71, 77, 239, 0.40)', 'rgba(10, 13, 71, 0.40)', 'rgba(10, 13, 71, 0.20)']}
        start={[0.5, 0]}
        end={[0.5, 1]}
      >
          <View style={styles.header}>
        
      <TouchableOpacity style={{width:40,height:40,borderRadius:50,backgroundColor:'rgba(63, 80, 124, 0.16)',justifyContent:'center',alignItems:'center'}} onPress={()=>navigation.goBack()}>
      <AntDesign  name="arrowleft" size={20} color="#FFFFFF" style={styles.headerIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.headerTextContainer} onPress={()=>navigation.navigate('location')}>
      <Text style={styles.headerText}>skip</Text>
  <View style={styles.line} />
      
      </TouchableOpacity>
    
      </View>
      </LinearGradient>
      <View style={{flex:1}}>
      <ScrollView style={styles.content}>
      <Text style={styles.heading}>
        Add photos
       </Text>
       <Text style={styles.paragraph}>Add at least 2 photos to continue</Text>
      <View style={{ flex: 1, padding: 20 }}>
      <View style={styles.uploadPhotos}>
        <TouchableOpacity onPress={selectImage}>
        <AntDesign name="upload" size={24} color="#D0D9F9" />
        </TouchableOpacity>
        <Text style={{color:'#D0D9F9',marginTop:10}}>Upload photos</Text>
        <Text style={{color:'#757A8D',fontSize:12}}>Min. size 2Mb</Text>
      </View>
      <View style={{marginTop:'10%',flexDirection:'row',justifyContent:'center',alignItems:'center',gap:25,flexWrap:"wrap"}}>
    
         {
            data.length===0? <><View style={styles.showImage}>
                  <EvilIcons name="image" size={40} color="#D0D9F9" />
                </View><View style={styles.showImage}>
                    <EvilIcons name="image" size={40} color="#D0D9F9" />
                  </View></>:<>
                 <DraggableGrid
                 numColumns={3}
                 data={data}
                 renderItem={render_item }
                 onDragRelease={onDragRelease}
                 />
                  </>
         }
   
      </View>
      <View>
       
       
   </View>
    </View>
      </ScrollView>
      <TouchableOpacity style={styles.selectButton} onPress={()=>navigation.navigate('location')}>
       <Text style={{color:"#FFF"}}>CONTINUE</Text>
       </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Add_Photos

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      },
    header:{
      width:screenWidth,
      height:headerHeight,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
       },
       headerIcon:{
            padding:'5%',
       },
       headerText:{
        paddingRight:'5%',
    color:'#FFFFFF'
       },
       content: {
        flex: 1, 
        backgroundColor: '#010510', 
      },
      buttonContainer:{
         backgroundColor:'#edeef3',
         width:'100%',
         height:150,
         borderRadius:10,

      },
      addButton:{
        backgroundColor:'#cf505b',
        borderRadius:50,
     
        position:'absolute',
        bottom:0,
        right:0,
        width:25,
        height:25,
        justifyContent:'center',
        alignItems:'center'
      },
      heading:{
        color: '#FFF',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '500',
        alignSelf: 'center',
        marginBottom:10,
  },
  paragraph:{
    marginHorizontal:'10%',
    color: '#D0D9F9',
    textAlign: 'center',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
  }
  ,
  selectButton:{
    backgroundColor:"#474DEF",
    padding:16,
    borderRadius:32,
    justifyContent:'center',
    alignItems:'center',
    marginBottom:'5%',
  },
  headerTextContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  line: {
    width: 25,
    height: 1,
    backgroundColor: '#FFFFFF',
    alignSelf:'center',
    marginRight:20    ,
  },
  uploadPhotos: {
    height: 224,
    padding: 16,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#283455',
    backgroundColor: 'rgba(13, 21, 43, 0.40)',
    alignSelf: 'stretch',
  },
  showImage: {
    width:100,
    height: 100,
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#283455',
    backgroundColor: 'rgba(13, 21, 43, 0.40)',
    justifyContent:'center',
    
  },
  image:{
    width: 98, 
        height: 98, 
        borderRadius: 19,
  }
})