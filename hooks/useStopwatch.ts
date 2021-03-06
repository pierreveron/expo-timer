/**
 * Credit for this hook goes to:
 * https://dev.to/abdulbasit313/how-to-develop-a-stopwatch-in-react-js-with-custom-hook-561b
 * I only ported the code to Typescript
 */

import { useState, useRef, useEffect } from 'react';

export default function useStopwatch() {
    const [timer, setTimer] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    /* To understand why useRef is written like this click the link below: 
    https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31065#issuecomment-453841404 */
    const countRef = useRef<NodeJS.Timer | null>(null)

    const handleStart = () => {
        setIsActive(true)
        countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1)
        }, 1000)
    }

    const handlePause = () => {
        if (countRef.current) clearInterval(countRef.current)
        setIsPaused(true)
    }

    const handleResume = () => {
        setIsPaused(false)
        countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1)
        }, 1000)
    }

    const handleReset = () => {
        if (countRef.current) clearInterval(countRef.current)
        setIsActive(false)
        setIsPaused(false)
        setTimer(0)
    }

    const handleClear = () => {
        if (countRef.current) clearInterval(countRef.current)
    }

    useEffect(() => {
        // Prevents from memory leaks by stopping the 1 second interval
        return () => {
            handleClear();
        };
    }, []);

    return { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset, handleClear }
}