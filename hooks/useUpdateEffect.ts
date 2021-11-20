import { useRef, useEffect, EffectCallback, DependencyList } from "react";

/**
 * A custom useEffect hook that only triggers on updates, not on initial mount
 * @param {Function} effect
 * @param {Array<any>} dependencies
 */
export default function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) isInitialMount.current = false;
        else effect();
    }, deps);
}