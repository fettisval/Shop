import {Link, useParams} from "react-router-dom";
import {Product} from "./product";
import '../styles/productPage.css';
import {Loader} from "./loader";
import Header from "./header";
import {useGetProductQuery} from "../app/apiSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {setRatings} from "../app/ratingsSlice";
import {faCircleChevronLeft, faCircleChevronRight, faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
function ProductPage() {

    let {id} = useParams();
    const dispatch = useDispatch();
    id = parseInt(id);
    const ratings = useSelector(state => state.ratings.ratings);

    const {isLoggedIn} = useSelector(state => state.login);
    const {data: product, isLoading} = useGetProductQuery(id);

    useEffect(() => {
        if (product && isLoggedIn) {
            const reviewButton = document.getElementById("review-button");
            const reviewContainer = document.querySelector(".review-container");
            const reviewForm = document.querySelector(".review-form");

            const handleClickReviewButton = () => {
                reviewContainer.classList.toggle("review-container-active");
                reviewForm.reset();
            }

            reviewButton.addEventListener("click", handleClickReviewButton);

            return () => {
                reviewForm.reset();
                reviewButton.removeEventListener("click", handleClickReviewButton);
                reviewContainer.classList.remove("review-container-active");
            }
        }
    }, [product, isLoggedIn]);

    if (id > 100 || id < 1) {
        window.location.href = '/404'
        return;
    }


    const handleFormSubmit = (e, id) => {
        e.preventDefault();
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const rating = document.querySelector('input[name="rating"]:checked').value;
        const review = {
            id,
            title,
            description,
            rating,
        }
        const newRatings = [...ratings, review];
        dispatch(setRatings(newRatings));
        const reviewContainer = document.querySelector(".review-container");
        reviewContainer.classList.remove("review-container-active");
    }
    return (
        <div className="product-page-container">
            <Header/>
            <div className="review-container">
                <form className="review-form"
                        onSubmit={(e) => handleFormSubmit(e, id)}>
                    <label htmlFor={"title"}>Title: </label>
                    <input
                        type={"text"}
                        id={"title"}
                        name={"title"}
                        required={true}
                        className={"rating-title"}
                        maxLength={20}
                    />
                    <label htmlFor={"description"}>Description: </label>
                    <textarea maxLength={30}
                        id={"description"}
                        name={"description"}
                        required={true}
                        className={"rating-description"}
                    />
                    <label htmlFor={"rating"}>Rating: </label>
                    <div className={"radios"}>
                        <label htmlFor={"rating"}>1</label>
                        <input type={"radio"} id={"rating"} name={"rating"} value={"1"} required={true}/>
                        <label htmlFor={"rating"}>2</label>
                        <input type={"radio"} id={"rating"} name={"rating"} value={"2"} required={true}/>
                        <label htmlFor={"rating"}>3</label>
                        <input type={"radio"} id={"rating"} name={"rating"} value={"3"} required={true}/>
                        <label htmlFor={"rating"}>4</label>
                        <input type={"radio"} id={"rating"} name={"rating"} value={"4"} required={true}/>
                        <label htmlFor={"rating"}>5</label>
                        <input type={"radio"} id={"rating"} name={"rating"} value={"5"} required={true}/>
                    </div>
                    <button>Submit</button>
                </form>
            </div>
            <div className="other-items">
                {id > 1 ? <Link to={`/shop/${id - 1}`}>
                    <button><FontAwesomeIcon className="icon" icon={faCircleChevronLeft} /></button></Link>: <button style={{pointerEvents: "none", opacity: 0.5}}><FontAwesomeIcon className="icon" icon={faCircleChevronLeft} /></button>}


                {isLoggedIn && <button id="review-button"> <FontAwesomeIcon className="icon" icon={faStar} /> </button>}

                {id < 100 ? <Link to={`/shop/${id + 1}`}>
                    <button><FontAwesomeIcon className="icon" icon={faCircleChevronRight} /></button></Link>: <button style={{pointerEvents: "none", opacity: 0.5}}><FontAwesomeIcon className="icon" icon={faCircleChevronRight} /></button>}
            </div>
            <div className="product-page">
                {isLoading ? <Loader/> : <Product product={product}/>}
            </div>
            {ratings.filter(rating => rating.id === id).length > 0 && <h1 id="reviews-header">Reviews:</h1>}
            <div className="ratings">
                {ratings.filter(rating => rating.id === id).map(rating => {
                    return (
                        <div className="rating" key={rating.title}>
                            <h3 className="rating-title">{rating.title}</h3>
                            <p className="rating-description">{rating.description}</p>
                            <h3 className="product-rating">
                                <span className="star-rating" style={{
                                    "--rating": rating.rating,
                                }}>
                                </span>
                            </h3>
                        </div>
                    )
                })
                }
            </div>
        </div>
    );
}

export default ProductPage;