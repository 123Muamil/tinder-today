import React from 'react'
import { Provider} from 'react-redux';
import store from './redux/store/index';
import Index from './index'
import { StateProvider } from './redux/context/context';
const App = () => {
  return (
    <Provider store={store}>
   <StateProvider>
   <Index/>
   </StateProvider>
</Provider>
  )
}

export default App