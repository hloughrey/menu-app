import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { debounce } from 'lodash';
import { getItems } from './services';
import { MenuContext, BasketContext } from './context';
import { MenuItemHeading } from './components';

import './App.css';

export default function App() {
    const { menu, setMenu } = useContext(MenuContext);
    const {
        state: { basket, items },
        dispatch,
    } = useContext(BasketContext);

    const { status } = useQuery('items', getItems, {
        onSuccess: setMenu,
    });

    function addItemToBasket(item) {
        dispatch({ type: 'addItemToBasket', value: item });
    }

    function removeItemFromBasket(item) {
        dispatch({ type: 'removeItemFromBasket', value: item });
    }

    function removeAllFromBasket(item) {
        dispatch({ type: 'removeAllFromBasket', value: item });
    }

    function onSearchChange(event) {
        event.preventDefault();
        const debounceGetItems = debounce(
            value => getItems(value).then(setMenu),
            1000
        );
        debounceGetItems(event.target.value);
    }

    if (status === 'loading') {
        return <h1>loading</h1>;
    }

    return (
        <div className="wrapper">
            <div className="menu-summary">
                <div className="container">
                    <div className="row">
                        {basket.length > 0 && (
                            <div className="col-6 menu-summary-left">
                                <span>{items} items</span>
                            </div>
                        )}
                        <div className="col-6 menu-summary-right">
                            6x <span className="dietary">ve</span>
                            4x <span className="dietary">v</span>
                            12x <span className="dietary">n!</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container menu-builder">
                <div className="row">
                    <div className="col-4">
                        <div className="filters">
                            <input
                                onChange={onSearchChange}
                                className="form-control"
                                placeholder="Name"
                            />
                        </div>
                        <ul className="item-picker">
                            {menu.items.map(item => (
                                <li key={item.id} className="item">
                                    <MenuItemHeading>
                                        {item.name}
                                    </MenuItemHeading>
                                    <ul className="menuItemsDietarySpec">
                                        {item.dietaries.map(dietary => (
                                            <DietaryContent
                                                key={`menu-${item.id}`}
                                            >
                                                {dietary}
                                            </DietaryContent>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={() => addItemToBasket(item)}
                                    >
                                        Add to basket
                                    </button>
                                    <button
                                        onClick={() =>
                                            removeItemFromBasket(item)
                                        }
                                        disabled={
                                            !basket.find(
                                                basketItem =>
                                                    basketItem.id === item.id
                                            )
                                        }
                                    >
                                        Remove from basket
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-8">
                        <h2>Menu preview</h2>
                        {basket.length > 0 ? (
                            <ul className="menu-preview">
                                {basket.map(item => (
                                    <li className="item">
                                        <MenuItemHeading>
                                            {item.name}
                                        </MenuItemHeading>
                                        {item.dietaries.map(dietary => (
                                            <DietaryContent
                                                key={`basket-${item.id}`}
                                            >
                                                {dietary}
                                            </DietaryContent>
                                        ))}
                                        <div>Quantity: {item.quantity}</div>
                                        <button
                                            onClick={() =>
                                                removeAllFromBasket(item)
                                            }
                                            className="remove-item"
                                        >
                                            x
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Your basket is empty</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
