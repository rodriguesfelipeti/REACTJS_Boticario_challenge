import { CLICK_ADD_PRODUCT_TO_CART, CLICK_REMOVE_PRODUCT, INCREASE_ITEM, DECREASE_ITEM } from '../actions/actionTypes';
import {defineState} from 'redux-localstore'

const defaultState = {
  cart: [],
  totalCart: 0
}



const initialState = defineState(defaultState)('cartReducer')

export const cartReducer = (state = initialState, action) => {

  switch (action.type) {

    case CLICK_ADD_PRODUCT_TO_CART:
    
      state.totalCart = parseFloat(state.totalCart) + parseFloat(action.cart.Value)
      if(action.index !== false) {

        state.cart[action.index].qtd++ 
        return {
          ...state,
          cart: [...state.cart],
        }
      }else {

        return {
          ...state,
          cart: [...state.cart, action.cart],
        }
      }

    case CLICK_REMOVE_PRODUCT: 
      return {
        ...state,
        cart: state.cart.filter((_item, index) => index !== action.index)
      }

    case INCREASE_ITEM:
      
      state.totalCart = parseFloat(state.totalCart) + parseFloat(state.cart[action.index].Value)
      state.cart[action.index].qtd++ 
        return {
          ...state,
          cart: [...state.cart],
        }

    case DECREASE_ITEM: 

      if(state.cart[action.index].qtd === 1) {
        state.totalCart = parseFloat(state.totalCart) - parseFloat(state.cart[action.index].Value)
        return {
          ...state,
          cart: state.cart.filter((_item, index) => index !== action.index)
        }

      }else {
        state.totalCart = parseFloat(state.totalCart) - parseFloat(state.cart[action.index].Value)
        state.cart[action.index].qtd-- 
        return {
          ...state,
          cart: [...state.cart],
        }
      }


    default:
      return state;
  }
};  