import { createContext } from 'react';

const initialContext = {
    state: undefined,
    dispatch: undefined,
};

export const BasketContext = createContext(initialContext);
