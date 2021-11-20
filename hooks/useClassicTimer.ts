import { useEffect } from 'react';
import useTimer from './useTimer';

export default function useClassicTimer(initialState: number) {
    const { timer, setTimer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset: superReset, handleClear } = useTimer(initialState)

    const handleReset = () => {
        superReset()
    }

    // const handleFinish = () => {
    //     if (countRef.current) clearInterval(countRef.current)
    //     setIsActive(false)
    //     setIsPaused(false)
    // }

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

    useEffect(() => {
        if (timer == 0 && isActive) handleReset();
    }, [timer]);

    return { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset, upTimer, downTimer }
}