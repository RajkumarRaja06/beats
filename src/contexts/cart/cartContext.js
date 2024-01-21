import React, { createContext, useReducer } from 'react';
import cartReducer from './cartReducer';
import { toast } from 'react-toastify';

// Cart-Context
const cartContext = createContext();

// Initial State
const initialState = {
  cartItems: [],
};

// Cart-Provider Component
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Dispatched Actions
  const addItem = (item) => {
    toast.success('Successfully Add To Cart');
    return dispatch({
      type: 'ADD_TO_CART',
      payload: { item },
    });
  };

  const removeItem = (itemId) => {
    toast.success('Successfully removed from the cart');
    return dispatch({
      type: 'REMOVE_FROM_CART',
      payload: { itemId },
    });
  };

  const incrementItem = (itemId) => {
    toast.success('Successfully Add To Cart');
    return dispatch({
      type: 'INCREMENT_ITEM',
      payload: { itemId },
    });
  };

  const decrementItem = (itemId) => {
    toast.success('Successfully removed from the cart');
    return dispatch({
      type: 'DECREMENT_ITEM',
      payload: { itemId },
    });
  };

  // Context values
  const values = {
    ...state,
    addItem,
    removeItem,
    incrementItem,
    decrementItem,
  };

  return <cartContext.Provider value={values}>{children}</cartContext.Provider>;
};

export default cartContext;
export { CartProvider };
