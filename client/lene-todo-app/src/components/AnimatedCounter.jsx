import { animate, useInView, useIsomorphicLayoutEffect } from "framer-motion";
import React, { useRef } from 'react';

const AnimatedCounter = ({ from , to, animationOptions }) => {

    const ref = useRef();
    const inView = useInView(ref, {once: true})
    useIsomorphicLayoutEffect(() => {

        const element = ref.current;
        element.textContent = String(from);

        const controls = animate(from, to, {
            duration: 0.4,
            ease: "easeOut",
            ...animationOptions,
            onUpdate(value) {
                element.textContent = String(value.toFixed(0));
            }
        })

        return () => {
            controls.stop();
        }
    }, [ref, from, to, inView])

    return <span ref={ref}></span>
    
}

export default AnimatedCounter;