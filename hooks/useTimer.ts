/**
 * Credit for this hook goes to:
 * https://dev.to/abdulbasit313/how-to-develop-a-stopwatch-in-react-js-with-custom-hook-561b
 * I only ported the code to Typescript
 */

import { useState, useRef } from 'react';

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
        if (countRef.current) clearInterval(countRef.current)
        setIsPaused(false)
    }

    const handleResume = () => {
        setIsPaused(true)
        countRef.current = timerInterval()
    }

    const handleReset = () => {
        if (countRef.current) clearInterval(countRef.current)
        setIsActive(false)
        setIsPaused(false)
        setTimer(initialState)
    }

    const handleCancel = () => {
        if (countRef.current) clearInterval(countRef.current)
    }

    // const handleFinish = () => {
    //     if (countRef.current) clearInterval(countRef.current)
    //     setIsActive(false)
    //     setIsPaused(false)
    // }

    const handleUpdate = () => {

    }

    const upTimer = (eps = 1) => {
        setTimer(t => {
            if (eps < 60) {
                const seconds = t % 60;
                if (seconds == 59) return t
                return t + eps;
            }

            if (t < 3599) {
                if (t + eps < 3599)
                    return t + eps;
                return 3540 + t % 60
            }
            else return t
        })
    }

    const downTimer = (eps = 1) => {
        setTimer(t => {
            if (eps < 60) {
                const seconds = t % 60;
                if (seconds == 0) return t
                return t - eps;
            }
            if (t > 0) {
                if (t - eps > 0)
                    return t - eps;
                return t % 60;
            }
            else return t
        })
    }

    return { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset, handleCancel, upTimer, downTimer }
}