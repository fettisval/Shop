import React from "react";
import {Link} from "react-router-dom";

const Home = () => {

    return (
        <div className={"home-wrapper"}>
            <div className="home">
                <h1>Welcome to Edi's shop!</h1>
                <Link to="/shop">
                    <button>Shop now!</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;