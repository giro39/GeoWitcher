import React from "react";

import Map from "../../components/Map/Map";

import styles from "./RoundWithMap.module.scss";


const RoundWithMap = () => {
    return (<Map location="white_orchard" rows={4} cols={5} />)
}


export default RoundWithMap;