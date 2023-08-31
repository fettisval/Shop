import React from "react";
import {setLimit} from "../app/itemSlice";
import {useDispatch, useSelector} from "react-redux";

const ItemLimit = () => {
    const dispatch = useDispatch();
    const {limit} = useSelector((state) => state.item);
    const handleLimitChange = (e) => {
        const newLimit = parseInt(e.target.value);
        dispatch(setLimit(newLimit));
    };

    return (
        <div className="item-limit">
            <select id="limit" value={limit} onChange={handleLimitChange}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
            </select>
        </div>
    );
};

export default ItemLimit;