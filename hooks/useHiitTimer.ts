import { useState, useEffect } from 'react';
import useTimer from './useTimer';

export default function useHiitTimer() {
    const [restTime, setRestTime] = useState(30)
    const [workTime, setWorkTime] = useState(30)
    const [numberRounds, setNumberRounds] = useState(20)
    const [roundTime, setRoundTime] = useState(restTime + workTime)
    const [totalTime, setTotalTime] = useState(roundTime * numberRounds)
    const { timer, isActive, isPaused, isFinished,
        handleStart, handlePause, handleResume, handleReset: superReset, setTimer } = useTimer(totalTime)
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
            if ((totalTime - timer) == workTime * round + restTime * (round - 1) && restTime != 0)
                setIsRest(true);

            if (timer % roundTime == 0)
                handleNewRound();
        }
    }, [timer]);

    useEffect(() => {
        setTotalTime((workTime + restTime) * numberRounds);
        setTimer((workTime + restTime) * numberRounds)
        setRoundTime(workTime + restTime)
    }, [workTime, restTime, numberRounds]);

    return {
        totalTime, workTime, roundTime, restTime,
        timer, round, numberRounds,
        isActive, isPaused, isRest, isFinished,
        handleStart, handlePause, handleResume, handleReset,
        setNumberRounds, setRestTime, setWorkTime
    }
}