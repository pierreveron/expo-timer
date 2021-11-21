import { useState, useEffect } from 'react';
import useTimer from './useTimer';

export default function useTabataTimer() {
    const restTime = 10;
    const workTime = 20;
    const numberRounds = 8;
    const roundTime = restTime + workTime;
    const totalTime = roundTime * numberRounds;
    const { timer, isActive, isPaused, isFinished,
        handleStart, handlePause, handleResume, handleReset: superReset } = useTimer(totalTime)
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
            if ((totalTime - timer) == workTime * round + restTime * (round - 1))
                setIsRest(true);

            if (timer % roundTime == 0)
                handleNewRound();
        }
    }, [timer]);

    return {
        totalTime, workTime, roundTime, restTime,
        timer, round, numberRounds,
        isActive, isPaused, isRest, isFinished,
        handleStart, handlePause, handleResume, handleReset
    }
}