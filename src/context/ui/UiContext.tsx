import { createContext, useReducer } from 'react';
import { uiReducer } from './';

// --------------------------------------------------------------------
// Context
// --------------------------------------------------------------------
interface CtxProps {
  isMenuOpen: boolean;
  toggleSideMenu: () => void;
}

export const UiContext = createContext<CtxProps>({} as CtxProps);

// --------------------------------------------------------------------
// Provider
// --------------------------------------------------------------------
export interface UiState {
  isMenuOpen: boolean;
}

const initialState: UiState = {
  isMenuOpen: false,
};

type Props = { children?: React.ReactNode; };
export const UiProvider = ({ children }: Props) => {

  const [state, dispatch] = useReducer(uiReducer, initialState);

  const toggleSideMenu = () => {
    dispatch({ type: '[UI] - Toggle Menu' });
  };

  return (
    <UiContext.Provider
      value={{
        ...state,
        toggleSideMenu,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};