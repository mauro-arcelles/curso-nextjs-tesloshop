import { createContext, useEffect, useReducer } from 'react';
import { authReducer } from './';
import { IUser } from '@/interfaces';
import { testoApi } from '@/api';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';

// --------------------------------------------------------------------
// Context
// --------------------------------------------------------------------
interface CtxProps {
  isLoggedIn: boolean;
  user?: IUser;
  loginUser: (email: string, password: string) => Promise<boolean>;
  registerUser: (name: string, email: string, password: string) => Promise<{ hasError: boolean; message?: string; }>;
  logout: () => void;
}

export const AuthContext = createContext<CtxProps>({} as CtxProps);

// --------------------------------------------------------------------
// Provider
// --------------------------------------------------------------------
export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

type Props = { children?: React.ReactNode; };
export const AuthProvider = ({ children }: Props) => {

  const [state, dispatch] = useReducer(authReducer, initialState);
  const router = useRouter();

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    if (!Cookies.get('token')) return;

    try {
      const { data } = await testoApi.get('/user/validate-token');
      const { token, user } = data;
      Cookies.set('token', token);
      dispatch({ type: '[AUTH] - Login', payload: user });

    } catch (error) {
      Cookies.remove('token');
    }
  };

  const loginUser = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await testoApi.post('/user/login', { email, password });
      const { token, user } = data;
      Cookies.set('token', token);
      dispatch({ type: '[AUTH] - Login', payload: user });

      return true;

    } catch (error) {
      return false;
    }
  };

  const registerUser = async (name: string, email: string, password: string): Promise<{ hasError: boolean, message?: string; }> => {
    try {
      const { data } = await testoApi.post('/user/register', { name, email, password });
      const { token, user } = data;
      Cookies.set('token', token);
      dispatch({ type: '[AUTH] - Login', payload: user });

      return {
        hasError: false,
      };

    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }

      return {
        hasError: true,
        message: 'No se pudo crear el usuario',
      };
    }
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('cart');
    router.reload();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        loginUser,
        registerUser,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};