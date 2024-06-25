import React, { useState, useEffect } from 'react';

const KulTeller = ({ endNumber }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (count < endNumber) {
            const interval = setInterval(() => {
                setCount(prevCount => prevCount + 1);
            }, 100) // her kan vi justere tida mellom intervallene

            return () => clearInterval(interval);
        }
    }, [count, endNumber]);

    return (
        <>{count}</>
    )
}

export default KulTeller;