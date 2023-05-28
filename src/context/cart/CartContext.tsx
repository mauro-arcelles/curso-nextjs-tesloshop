import { createContext, useEffect, useReducer, useRef } from 'react';
import { cartReducer } from './';
import { ICartProduct } from '@/interfaces';
import Cookie from 'js-cookie';

// --------------------------------------------------------------------
// Context
// --------------------------------------------------------------------
interface CtxProps {
  cart: ICartProduct[];
  addProductToCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeCartProduct: (product: ICartProduct) => void;
  updateAddress: (address: ShippingAddress) => void;
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
  isLoaded: boolean;

  shippingAddress?: ShippingAddress;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
}

export const CartContext = createContext<CtxProps>({} as CtxProps);

// --------------------------------------------------------------------
// Provider
// --------------------------------------------------------------------
export interface CartState {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
  shippingAddress?: ShippingAddress;
}

const initialState: CartState = {
  isLoaded: false,
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
  shippingAddress: undefined,
};

type Props = { children?: React.ReactNode; };
export const CartProvider = ({ children }: Props) => {

  const [state, dispatch] = useReducer(cartReducer, initialState);
  const firstTimeLoad = useRef(true);

  useEffect(() => {
    const cookieProducts = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [];
    dispatch({ type: '[CART] - LoadCart from cookies | storage', payload: cookieProducts });

  }, []);

  useEffect(() => {
    if (firstTimeLoad.current) {
      firstTimeLoad.current = false;
      if (state.cart.length === 0) {
        return;
      }
    }
    Cookie.set('cart', JSON.stringify(state.cart));

  }, [state.cart]);

  useEffect(() => {
    if (Cookie.get('firstName')) {
      const shippingAddress = {
        firstName: Cookie.get('firstName') || '',
        lastName: Cookie.get('lastName') || '',
        address: Cookie.get('address') || '',
        address2: Cookie.get('address2') || '',
        zip: Cookie.get('zip') || '',
        city: Cookie.get('city') || '',
        country: Cookie.get('country') || '',
        phone: Cookie.get('phone') || '',
      };

      dispatch({ type: '[CART] - LoadAddress from cookies', payload: shippingAddress });
    }
  }, []);

  useEffect(() => {
    const numberOfItems = state.cart.reduce((acc, curr) => acc + curr.quantity, 0);
    const subTotal = state.cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

    const orderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal + subTotal * taxRate,
    };

    dispatch({ type: '[CART] - Update order summary', payload: orderSummary });

  }, [state.cart]);

  const addProductToCart = (product: ICartProduct) => {
    const productInCart = state.cart.some((p) => p._id === product._id);
    if (!productInCart) return dispatch({ type: '[CART] - Update product in cart', payload: [...state.cart, product] });

    const productInCartButDifferentSize = state.cart.some((p) => p._id === product._id && p.size === product.size);
    if (!productInCartButDifferentSize) return dispatch({ type: '[CART] - Update product in cart', payload: [...state.cart, product] });

    const updatedProducts = state.cart.map((p) => {
      if (p._id === product._id && p.size === product.size) {
        return {
          ...p,
          quantity: p.quantity + product.quantity
        };
      }

      return p;
    });

    dispatch({ type: '[CART] - Update product in cart', payload: updatedProducts });
  };

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({ type: '[CART] - Change cart quantity', payload: product });
  };

  const removeCartProduct = (product: ICartProduct) => {
    dispatch({ type: '[CART] - Remove cart product', payload: product });
  };

  const updateAddress = (address: ShippingAddress) => {
    Cookie.set('firstName', address.firstName);
    Cookie.set('lastName', address.lastName);
    Cookie.set('address', address.address);
    Cookie.set('address2', address.address2 || '');
    Cookie.set('zip', address.zip);
    Cookie.set('city', address.city);
    Cookie.set('country', address.country);
    Cookie.set('phone', address.phone);
    dispatch({ type: '[CART] - Update shipping address', payload: address });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
        updateCartQuantity,
        removeCartProduct,
        updateAddress
      }}
    >
      {children}
    </CartContext.Provider>
  );
};