import React from "react";
import flags from "./flags.png";
import { FLAG_ORDER } from "./constants";

const Flag = ({ country }) => {
    const offset = -(FLAG_ORDER.indexOf(country) * 17);
    return (
        <span
            className="flag"
            style={{
                background: flags,
                backgroundPositionY: offset,
                marginRight: 5,
                marginLeft: 5
            }}
        />
    );
};

export default Flag;
