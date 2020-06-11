import React from "react";
import {Helmet} from "react-helmet";

function Bar() {
    return (
        <div>
            <Helmet>
                <title>Bar</title>
            </Helmet>
            <div>Bar</div>
        </div>
    );
}

export default Bar;
