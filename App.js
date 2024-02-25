import React from 'react'
import { Provider} from 'react-redux';
import store from './redux/store/index';
import Index from './index'
const App = () => {
  return (
    <Provider store={store}>
    <Index/>
</Provider>
  )
}

export default App