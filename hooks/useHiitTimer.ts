import { useState, useRef, useEffect } from 'react';
import useTimer from './useTimer';

export default function useHiitTimer() {
    const [numberRounds, setNumberRounds] = useState(30)
    const [workTime, setWorkTime] = useState(30)
    const [restTime, setRestTime] = useState(30)
    const [totalTime, setTotalTime] = useState((workTime + restTime) * numberRounds)
    const [roundTime, setRoundTime] = useState(restTime + workTime)
    const { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset: superReset, handleClear, setTimer } = useTimer(totalTime)
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

    useEffect(() => {
        setTotalTime((workTime + restTime) * numberRounds);
        setTimer((workTime + restTime) * numberRounds)
        setRoundTime(workTime + restTime)
    }, [workTime, restTime, numberRounds]);

    return {
        totalTime, workTime, roundTime, restTime,
        timer, round,
        isActive, isPaused, isRest, isFinished,
        numberRounds,
        handleStart, handlePause, handleResume, handleReset,
        setNumberRounds,
        setRestTime, setWorkTime
    }
}