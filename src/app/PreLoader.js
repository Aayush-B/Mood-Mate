import React, { useEffect } from "react";
import './PreLoader.css'
import { preLoaderAnim } from "./index.js";
const PreLoader = () => {
    useEffect(() => {
        preLoaderAnim()

    }, []);
return(
<div className="preloader">
<div className="texts-container">


<span>Unleash the Power of your Mood</span>

</div>
</div>
)
}

export default PreLoader;