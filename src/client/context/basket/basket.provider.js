import React, { useReducer } from 'react';
import { BasketContext } from './';

const INITIAL_STATE = {
    basket: [],
    items: 0,
};

function increamentQuantity(state, item) {
    let basket = [];

    const newBasket = state.basket.filter(
        basketItem => basketItem.id !== item.id
    );

    const itemInBasket = state.basket.find(
        basketItem => basketItem.id === item.id
    );

    if (itemInBasket) {
        itemInBasket.quantity = itemInBasket.quantity + 1;
        basket = [...newBasket, itemInBasket];
    } else {
        item.quantity = 1;
        basket = [...newBasket, item];
    }

    return {
        basket,
        items: state.items + 1,
    };
}

function decrementQuantity(state, item) {
    let basket = [];
    const newBasket = state.basket.filter(
        basketItem => basketItem.id !== item.id
    );

    const itemInBasket = state.basket.find(
        basketItem => basketItem.id === item.id
    );

    if (itemInBasket.quantity - 1 === 0) {
        basket = [...newBasket];
    } else {
        itemInBasket.quantity = itemInBasket.quantity - 1;
        basket = [...newBasket, itemInBasket];
    }

    return {
        basket,
        items: state.items - 1,
    };
}

function removeAllFromBasket(state, item) {
    return {
        basket: state.basket.filter(basketItem => basketItem.id !== item.id),
        items: 1,
    };
}

function reducer(state, action) {
    switch (action.type) {
        case 'addItemToBasket':
            return {
                ...state,
                ...increamentQuantity(state, action.value),
            };
        case 'removeItemFromBasket':
            return {
                ...state,
                ...decrementQuantity(state, action.value),
            };
        case 'removeAllFromBasket':
            return {
                ...state,
                ...removeAllFromBasket(state, action.value),
            };
        default:
            return INITIAL_STATE;
    }
}

export function BasketProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    return (
        <BasketContext.Provider
            value={{
                state,
                dispatch,
            }}
        >
            {children}
        </BasketContext.Provider>
    );
}
