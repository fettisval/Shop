import {Product} from "./product";
import Filter from "./filter";
import ItemLimit from "./limit";
import {useDispatch, useSelector} from "react-redux";
import {setFilterValue, setOffset} from "../app/itemSlice";
import {useEffect, useRef} from "react";
import {useGetProductsQuery} from "../app/apiSlice";
export default function Products() {
    const dispatch = useDispatch();
    const {limit, filterValue, offset} = useSelector((state) => state.item);
    const {data: response, isFetching,} = useGetProductsQuery({limit: limit, skip: offset});
    const isMounted = useRef(false);

    const products = response?.products ?? [];

    useEffect(() => {
        const onScroll = () => {
            const scrolledToBottom =
                window.innerHeight + window.scrollY >= document.body.offsetHeight;
            if (scrolledToBottom && !isFetching && !isMounted.current) {
                const newOffset = offset + limit;
                dispatch(setOffset(newOffset));
                isMounted.current = true;
            }
        };

        document.addEventListener("scroll", onScroll);

        return function () {
            document.removeEventListener("scroll", onScroll);
            isMounted.current = false;
        };
    }, [offset, isFetching]);

    const handleFilterChange = (value) => {
        dispatch(setFilterValue(value));
    };


    const filteredProducts = products.filter((product) => {
        const {category, title} = product;
        const lowerCaseFilterValue = filterValue.toLowerCase();
        return (
            category.toLowerCase().includes(lowerCaseFilterValue) ||
            title.toLowerCase().includes(lowerCaseFilterValue)
        );
    });

    return (
        <>
            <Filter onFilterChange={handleFilterChange}/>
            <ItemLimit />
            <div className="products">
                {
                    filteredProducts.map((product) => (
                        <Product key={product.id} product={product}/>
                    ))
                }
            </div>
        </>
    );
}