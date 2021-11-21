import { useState, useRef, useEffect } from 'react';
import useTimer from './useTimer';

export default function useTabataTimer() {
    const totalTime = 30;
    const restTime = 10;
    const workTime = 20;
    const numberRounds = 8;
    const roundTime = restTime + workTime;
    const { timer, isActive, isPaused, isFinished, handleStart, handlePause, handleResume, handleReset: superReset, handleClear, handleFinish } = useTimer(totalTime)
    const [round, setRound] = useState(1)
    const [isRest, setIsRest] = useState(false)

    const handleReset = () => {
        superReset();
        setRound(1)
        setIsRest(false);

    }

    const handleNewRound = () => {
        setIsRest(false)
        setRound(round => round + 1)
    }

    useEffect(() => {
        if (isActive && timer != 0) {
            if ((totalTime - timer) == workTime * round + restTime * (round - 1)) {
                setIsRest(true);
                console.log("rest is true")
            }

            if (timer % roundTime == 0)
                handleNewRound();
        }
    }, [timer]);

    return {
        totalTime, workTime, roundTime, restTime, numberRounds,
        timer, round,
        isActive, isPaused, isRest, isFinished,
        handleStart, handlePause, handleResume, handleReset, handleClear, handleFinish
    }
}