import React,{ useState} from 'react'
import { Provider} from 'react-redux';
import store from './redux/store/index';
import Index from './index'
import { dataContext } from './redux/context/context';
const App = () => {
  const [fullData,setFullData]=useState()
  return (
    <Provider store={store}>
   <dataContext.Provider value={{fullData,setFullData}}>
   <Index/>
   </dataContext.Provider>
</Provider>
  )
}

export default App