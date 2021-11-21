import useTimer from './useTimer';

export default function useClassicTimer(initialState: number) {
    const {
        timer, setTimer,
        isActive, isPaused, isFinished,
        handleStart, handlePause, handleResume, handleReset, handleFinish
    } = useTimer(initialState)

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

    return {
        timer,
        isActive, isPaused, isFinished,
        handleStart, handlePause, handleResume, handleReset, handleFinish,
        upTimer, downTimer,
    }
}