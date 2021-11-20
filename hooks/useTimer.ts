/**
 * Credit for this hook goes to:
 * https://dev.to/abdulbasit313/how-to-develop-a-stopwatch-in-react-js-with-custom-hook-561b
 * I only ported the code to Typescript
 */

import { useState, useRef, useEffect } from 'react';

export default function useTimer(initialState: number) {
    const [timer, setTimer] = useState(initialState)
    const [isActive, setIsActive] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    /* To understand why useRef is written like this click the link below: 
   https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31065#issuecomment-453841404 */
    const countRef = useRef<NodeJS.Timer | null>(null)
    const timerInterval = () => setInterval(() => {
        setTimer((timer) => timer - 1 > 0 ? timer - 1 : 0)
    }, 1000)

    const handleStart = () => {
        setIsActive(true)
        setIsPaused(true)
        countRef.current = timerInterval()
    }

    const handlePause = () => {
        handleClear()
        setIsPaused(false)
    }

    const handleResume = () => {
        setIsPaused(true)
        countRef.current = timerInterval()
    }

    const handleReset = () => {
        handleClear()
        setIsActive(false)
        setIsPaused(false)
        setTimer(initialState)
    }

    const handleClear = () => {
        if (countRef.current) clearInterval(countRef.current)
    }

    useEffect(() => {
        return () => {
            console.log("Timer dismounted");
            //Prevents from memory leaks by stopping the 1 second interval
            handleClear();
        };
    }, []);

    return { timer, setTimer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset, handleClear }
}