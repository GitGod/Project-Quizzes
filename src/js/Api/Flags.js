import React, { useEffect, useState } from "react";
import { fetchResp } from "./utils";

export const flags = () => {

    const [flags, setFlags] = useState([]);

    useEffect(() => {
        fetch(`https://flagcdn.com/pl/codes.json`)
            .then(fetchResp)
            .then((data) => setFlags(data))
            .catch((err) => console.log(err));
    },[]);

    return flags;
};

