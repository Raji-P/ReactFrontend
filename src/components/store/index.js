import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import SellingApp from '../reducers/index'
const store =  createStore(SellingApp,applyMiddleware(thunkMiddleware));
export default store;