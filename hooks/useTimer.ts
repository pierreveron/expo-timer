import { useState, useRef, useEffect } from 'react';

export default function useTimer(initialState: number) {
    const [timer, setTimer] = useState(initialState)
    const [isActive, setIsActive] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const [isFinished, setIsFinished] = useState(false)
    const countRef = useRef<NodeJS.Timer | null>(null)
    const timerInterval = () => setInterval(() => {
        setTimer((timer) => timer - 1 > 0 ? timer - 1 : 0)
    }, 1000)

    const handleStart = () => {
        setIsActive(true)
        countRef.current = timerInterval()
    }

    const handlePause = () => {
        handleClear()
        setIsPaused(true)
    }

    const handleResume = () => {
        setIsPaused(false)
        countRef.current = timerInterval()
    }

    const handleReset = () => {
        handleClear()
        setIsActive(false)
        setIsPaused(false)
        setIsFinished(false);
        setTimer(initialState)
    }

    const handleFinish = () => {
        handleClear();
        setIsFinished(true);
    }

    const handleClear = () => {
        if (countRef.current) clearInterval(countRef.current)
    }

    useEffect(() => {
        if (isActive && timer == 0)
            handleFinish();
    }, [timer]);

    useEffect(() => {
        return () => {
            console.log("Timer dismounted");
            //Prevents from memory leaks by stopping the 1 second interval
            handleClear();
        };
    }, []);

    return {
        timer, setTimer,
        isActive, isPaused, isFinished,
        handleStart, handlePause, handleResume, handleReset, handleClear, handleFinish
    }
}