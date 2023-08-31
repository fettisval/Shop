import {useEffect, useRef} from "react";
import {nextImageInProductGallery, previousImageInProductGallery} from "../utils/photoGallery";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setCartProducts, setTotal, setTotalProducts, setTotalQuantity} from "../app/cartSlice";
import {useAddProductToCartMutation} from "../app/apiSlice";

export function Product({product}) {
    const productContainerRef = useRef(null);

    const ratings = useSelector(state => state.ratings.ratings);

    const isLoggedIn = useSelector(state => state.login.isLoggedIn);
    const {total, totalQuantity} = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const [addToCart] = useAddProductToCartMutation();

    useEffect(() => {
        const productContainer = productContainerRef.current;
        const button = productContainer.querySelector(".product-button");
        const handleButtonClick = async () => {
            if (isLoggedIn) {
                const popUpContainer = document.querySelector(".pop-up");
                popUpContainer.style.display = 'flex';

                const response = await addToCart({id: product.id, quantity: 1});
                dispatch(setTotal(response.data.data.total));
                dispatch(setTotalQuantity(response.data.data.totalQuantity));
                dispatch(setTotalProducts(response.data.data.totalProducts));
                dispatch(setCartProducts(response.data.data.products));

                button.style.pointerEvents = 'none';
                button.innerText = 'Added to cart';
                setTimeout(() => {
                    popUpContainer.style.display = 'none';
                    button.innerText = 'Add to cart';
                    button.style.pointerEvents = 'all';
                }, 2000);

            } else {
                alert("You must be logged in to add products to cart!")
            }
        }
        const handleKeyDown = (event) => {
            if (productContainer.classList.contains("hovered")) {
                const currentImage = productContainer.querySelector('.product-image[style*="display: block"]');
                if (event.key === 'ArrowRight') {
                    nextImageInProductGallery(currentImage);
                }
                if (event.key === 'ArrowLeft') {
                    previousImageInProductGallery(currentImage);
                }
            }
        }
        const handleHover = (event) => {
            productContainer.classList.toggle("hovered");
            if (event.type === "mouseover") {
                document.addEventListener("keydown", handleKeyDown);
            }
            if (event.type === "mouseout") {
                document.removeEventListener("keydown", handleKeyDown);
            }
        }

        const handleArrowClick = (event) => {
            const currentImage = productContainer.querySelector(".product-image[style*='display: block']");
            if (event.target.classList.contains('arrow-right')) {
                nextImageInProductGallery(currentImage);
            }
            if (event.target.classList.contains('arrow-left')) {
                previousImageInProductGallery(currentImage);
            }
        }

        productContainer.addEventListener("mouseover", handleHover);
        productContainer.addEventListener("mouseout", handleHover);
        const arrowRight = productContainer.querySelector(".arrow-right");
        const arrowLeft = productContainer.querySelector(".arrow-left");
        arrowRight.addEventListener("click", handleArrowClick);
        arrowLeft.addEventListener("click", handleArrowClick);
        button.addEventListener("click", handleButtonClick);

        return () => {
            button.removeEventListener("click", handleButtonClick);
            productContainer.removeEventListener("mouseover", handleHover);
            productContainer.removeEventListener("mouseout", handleHover);
            arrowRight.removeEventListener("click", handleArrowClick);
            arrowLeft.removeEventListener("click", handleArrowClick);
        }
    }, [totalQuantity, total, isLoggedIn]);

    const calculateRating = (id) => {
        let sum = parseFloat(product.rating);
        let count = 1;
        ratings.forEach((rating) => {
            if (rating.id === id) {
                sum += parseInt(rating.rating);
                count++;
            }
        });
        return (sum / count).toFixed(3);
    }

    const starRating = {
        "--rating": calculateRating(product.id),
    };

    return (
        <div className="products-item" ref={productContainerRef}>
            <Link to={`/shop/${product.id}`}>
            <div className="product-images">
                {product.images.map((image, index) => <img style={{ display: index === 0 ? "block" : "none" }} className="product-image" key={image} src={image} alt={product.title} />)}
            </div>
            </Link>
            <div className="arrow-left"></div>
            <div className="arrow-right"></div>
            <h2 className="product-title">{product.title}</h2>
            <h3 className="product-brand">{product.brand}</h3>
            <h5 className="product-category">Category: {product.category}</h5>
            <p className="product-description">
                {product.description}
            </p>
            <h3 className="product-rating">
                <span className="star-rating" style={starRating}>
                </span>
                {calculateRating(product.id)}
            </h3>
            <h3 className="product-stock">
                Available: {product.stock}
            </h3>
            <p className="product-discount-percentage">
                ${Math.floor(product.price + product.price * product.discountPercentage / 100)}
            </p>
            <h3 className="product-price">
                ${product.price}
            </h3>
            <button className="product-button" data-id={product.id}>Add to cart</button>
        </div>
    )
}