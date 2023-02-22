import { legacy_createStore as createStore, combineReducers } from 'redux'
/* import { legacy_createStore as createStore } from 'redux'; */
import { CollApsedReducer } from './reducers/CollapsedReducer'
//汇总combineReducers方法，放入CollApsedReducer对象简写形式
import {LoadingReducer} from './reducers/LoadingReducer'
const reducer = combineReducers({
    CollApsedReducer,
    LoadingReducer
})
const store = createStore(reducer);

export default store