import commerce from "@chec/commerce.js";
import { createContext, useReducer, useEffect } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const SET_CART = "SET_CART";

const initialState = {
  total_items: 0,
  total_unique_items: 0,
  line_items: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_CART:
      return { ...state, ...action.payload };
    default:
      throw new Error(`Action desconhecida: ${action.type}`);
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setCart = (payload) => dispatch({ type: SET_CART, payload });

  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    try {
      const cart = await commerce.cart.retrieve();

      setCart(cart);
    } catch (error) {
      console.log(err);
    }
  };

  return (
    <CartDispatchContext value={{ setCart }}>
      <CartStateContext.Provider value={{ state }}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext>
  );
};

export const useCartState = () => useContext(CartStateContext);
export const useCartDispatch = () => useContext(CartDispatchContext);
