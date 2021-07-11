import React, { useState } from 'react';
import { MenuContext } from './';

export function MenuProvider({ children }) {
    const [menu, setMenu] = useState(undefined);

    return (
        <MenuContext.Provider
            value={{
                menu,
                setMenu,
            }}
        >
            {children}
        </MenuContext.Provider>
    );
}
