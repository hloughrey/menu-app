import { createContext } from 'react';

const initialContext = {
    menu: undefined,
    setMenu: undefined,
};

export const MenuContext = createContext(initialContext);
