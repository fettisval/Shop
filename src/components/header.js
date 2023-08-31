import '../index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCartShopping, faStore, faUser} from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";
import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCartProducts, setTotal, setTotalProducts, setTotalQuantity} from "../app/cartSlice";
import {useInitCartProductsQuery} from "../app/apiSlice";
import CartItemInShop from "./cartItemInShop";

export default function Header() {
    const {total, totalQuantity, totalProducts, cartProducts} = useSelector(state => state.cart);
    const isLoggedIn = useSelector(state => state.login.isLoggedIn);
    const dispatch = useDispatch();
    const {data: response, isLoading, isSuccess} = useInitCartProductsQuery(undefined,
        {skip: !isLoggedIn },
    );
    const isMounted = useRef(false);

    useEffect(() => {
        if (isLoggedIn) {
            if (totalQuantity >= 1) {
                const shoppingCartCount = document.querySelector('.shopping-cart-count');
                shoppingCartCount.innerText = totalQuantity;
                shoppingCartCount.style.display = 'flex';
            }

            const cart = document.querySelector('.shopping-cart');
            const cartProductsContainer = document.querySelector('.cart-items');

            const handleMouseOver = () => {
                cartProductsContainer.style.display = 'flex';
            }

            const handleMouseOut = () => {
                cartProductsContainer.style.display = 'none';
            }

            cart.addEventListener('mouseover', handleMouseOver);
            cart.addEventListener('mouseout', handleMouseOut);

            return () => {
                cart.removeEventListener('mouseover', handleMouseOver);
                cart.removeEventListener('mouseout', handleMouseOut);
            }
        }
    }, [isLoggedIn, totalQuantity, total, dispatch, cartProducts]);

    useEffect(() => {
        if (!isMounted.current && response) {
            dispatch(setCartProducts(response.products));
            dispatch(setTotal(response.total));
            dispatch(setTotalQuantity(response.totalQuantity));
            dispatch(setTotalProducts(response.totalProducts));
            isMounted.current = true;
        }
        else {
            dispatch(setCartProducts(cartProducts));
            dispatch(setTotal(total));
            dispatch(setTotalQuantity(totalQuantity));
            dispatch(setTotalProducts(totalProducts));
        }
    }, [response, totalQuantity, total, totalProducts, cartProducts, dispatch]);


    return (
        <header>
            <div className="pop-up">
                <span>Added to the cart!</span>
            </div>
            <nav className="effect-1">
                <ul className="top-nav">
                    <li className="account-logo"><Link to="/">&spades;</Link></li>
                    <div className="links">
                        <li className="shopping-cart"><Link to="/cart"><FontAwesomeIcon icon={faCartShopping} /><span className="shopping-cart-count"></span></Link>
                            <div className="cart-items-wrapper">
                                <div className="cart-items">
                                    {
                                        isLoggedIn && isSuccess && !isLoading &&
                                        cartProducts.map((product) => (<CartItemInShop key={product.id} product={product}/>))
                                    }
                                    <h3 className="cart-total">TOTAL: ${total}</h3>
                                </div>
                            </div></li>
                        <li><Link to="/shop"><FontAwesomeIcon icon={faStore} /></Link></li>
                        <li><Link to="/account"><FontAwesomeIcon icon={faUser} /></Link></li>
                    </div>
                </ul>
            </nav>
            <div className="promo">
                <h1>Edi's shop</h1>
            </div>
        </header>
    );
}