import React from "react";
import { Helmet } from "react-helmet";

function Foo() {
    return (
      <div>
        <Helmet>
          <title>Foo</title>
        </Helmet>
        <div>Foo</div>
      </div>
    );
}

export default Foo;
