import { useState, useRef, useEffect } from 'react';
import useTimer from './useTimer';

export default function useHiitTimer() {
    const totalTime = 30;
    const restTime = 10;
    const workTime = 20;
    const roundTime = restTime + workTime;
    const { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset: superReset, handleClear } = useTimer(totalTime)
    const [isFinished, setIsFinished] = useState(false)
    const [round, setRound] = useState(1)
    const [isRest, setIsRest] = useState(false)

    const handleReset = () => {
        superReset();
        setRound(1)
        setIsRest(false);
        setIsFinished(false);
    }

    const handleNewRound = () => {
        setIsRest(false)
        setRound(round => round + 1)
    }

    const handleFinish = () => {
        handleClear();
        setIsFinished(true);
    }

    useEffect(() => {
        if (isActive) {
            if ((totalTime - timer) == workTime * round + restTime * (round - 1)) {
                setIsRest(true);
                console.log("rest is true")
            }

            if (timer % roundTime == 0) {
                if (timer == 0) handleFinish();
                else handleNewRound();
            }
        }
    }, [timer]);

    return {
        totalTime, workTime, roundTime, restTime,
        timer, round,
        isActive, isPaused, isRest, isFinished,
        handleStart, handlePause, handleResume, handleReset
    }
}