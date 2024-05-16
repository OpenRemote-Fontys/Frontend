import { useState, useEffect } from "react";
import "./styles.css";

const FooterComponent = () => {
    const [time, setTime] = useState<Date>(new Date());

    useEffect(() => {
        const interval = setInterval(() => setTime((new Date())), 1000);
        return () => {
            clearInterval(interval);
        };
    })

    return (
        <div className="footer-wrapper flex-container">
            <div className="building-information-wrapper">Placeholder text</div>
            <div className="clock-wrapper">{time?.getHours() + ":" + time?.getMinutes()}</div>
            <div className="last-update-wrapper">Flex 3</div>            
        </div>
    )
}

export default FooterComponent;