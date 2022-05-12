import { createContext, useContext, useReducer } from "react";
import cartReducer from "./Reducers";

const Cart = createContext()

const initialState = {
  products: {},
  cart: []
}

const Context = ({children}) => {

  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <Cart.Provider value={{ state, dispatch }}>{ children }</Cart.Provider>
  )
}

export default Context;

export const CartState = () => {
  return useContext(Cart)
} 