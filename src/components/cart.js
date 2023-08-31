import {Link} from "react-router-dom";
import '../styles/cart.css';
import CartItem from "./cartItem";
import {setCartProducts, setTotal, setTotalProducts, setTotalQuantity} from "../app/cartSlice";
import {useInitCartProductsQuery} from "../app/apiSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from "react";


function Cart() {
    const dispatch = useDispatch();

    const {data: response,isLoading, isSuccess} = useInitCartProductsQuery();
    const {total, totalQuantity, totalProducts, cartProducts} = useSelector(state => state.cart);
    const isMounted = useRef(false);

    useEffect(() => {
        if (!isMounted.current && response) {
            dispatch(setCartProducts(response.products));
            dispatch(setTotal(response.total));
            dispatch(setTotalQuantity(response.totalQuantity));
            dispatch(setTotalProducts(response.totalProducts));
            isMounted.current = true;
        }
        else {
            dispatch(setTotal(total));
            dispatch(setTotalQuantity(totalQuantity));
            dispatch(setTotalProducts(totalProducts));
            dispatch(setCartProducts(cartProducts));
        }
    }, [dispatch, response, total, totalQuantity, totalProducts, cartProducts]);

    return (
        <div className="cart-page">
            <Link to="/shop"><h1 className="account-logo">&spades;</h1></Link>
            <div className="cart-page-items">
                {
                    isSuccess && !isLoading &&
                    cartProducts.map((product) => (<CartItem key={product.id} product={product}/>))
                }
            </div>
            {
                <div className="totals">
                    <h3 className="cart-page-total">Total quantity: {totalQuantity}</h3>
                    <h3 className="cart-page-total">Total products: {totalProducts}</h3>
                    <h3 className="cart-page-total">Total: ${total}</h3>
                </div>
            }
            <button className="buy-button">Buy!</button>
        </div>
    )
}

export default Cart;