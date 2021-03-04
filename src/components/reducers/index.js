import { combineReducers } from 'redux';
import {GET_NUMBER_OF_ITEMS_IN_CART,ADD_TO_CART, DECREASE_QUANTITY, INCREASE_QUANTITY, DELETE_TO_CART} from  '../actions';

const initProduct = {
    numberCart:0,
    Carts:[],
}

function productStatus(state = initProduct,action){
    switch(action.type){

        case GET_NUMBER_OF_ITEMS_IN_CART:
                return{
                    ...state
                }
        case ADD_TO_CART:
            if(state.numberCart === 0){
                let cart = {
                    id:action.payload.id,
                    quantity:1,
                    name:action.payload.name,
                    price:action.payload.price
                } 
                state.Carts.push(cart); 
            }
            else{
                let check = false;
                state.Carts.map((item,key)=>{
                    if(item.id === action.payload.id){
                        state.Carts[key].quantity++;
                        check=true;
                    }
                });
                if(!check){
                    let _cart = {
                        id:action.payload.id,
                        quantity:1,
                        name:action.payload.name,
                        price:action.payload.price
                    }
                    state.Carts.push(_cart);
                }
            }
            return{
                ...state,
                numberCart:state.numberCart+1
            }
            case INCREASE_QUANTITY:
                state.numberCart++
                state.Carts[action.payload].quantity++;
              
               return{
                   ...state
               }
            case DECREASE_QUANTITY:
                let quantity = state.Carts[action.payload].quantity;
                if(quantity>1){
                    state.numberCart--;
                    state.Carts[action.payload].quantity--;
                }
              
                return{
                    ...state
                }
            case DELETE_TO_CART:
                let quantity_ = state.Carts[action.payload].quantity;
                return{
                    ...state,
                    numberCart:state.numberCart - quantity_,
                    Carts:state.Carts.filter(item=>{
                        return item.id !== state.Carts[action.payload].id
                    })
                   
                }             
        default:
            return state;
    }
}
const SellingApp = combineReducers({
    _productStatus:productStatus
});
export default SellingApp;