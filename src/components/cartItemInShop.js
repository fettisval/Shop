
function CartItemInShop({product}) {
    return (
        <>
            <div className="cart-item">
                <img className="cart-item-image" src={product.images[0]} alt={product.title}/>
                <h3 className="cart-item-title">{product.title}</h3>
                <h3 className="cart-item-price">${product.price}</h3>
                <h3 className="cart-item-counter">x{product.quantity}</h3>
            </div>
        </>
    );
}

export default CartItemInShop;