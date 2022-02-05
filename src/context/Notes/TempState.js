import { useState } from "react";
import TempContext from "./tempContext";

const TempState = (props) => {
    const temp ={
            "name":"suraj",
            "std":"BE"
        }

    return (
        <TempContext.Provider value={temp}>
            {props.children}
        </TempContext.Provider>
    )

}

export default TempState;