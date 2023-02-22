import IndexRouter from './router/indexRouter'
import { Provider } from 'react-redux'
import { Button } from 'antd'
import store from './redux/store'
//供应商组建：轻松获得store，自动获得store.state 不用store.dispatch subscribe。raect-redux不用store.dispatch subscribe。这一步
function App() {
  return (
    <div>
      <Provider store={store}>
        <IndexRouter></IndexRouter>
      </Provider>


    </div>
  )
}

export default App;