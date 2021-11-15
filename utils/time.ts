/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 * @generate-docs
 */

export const formatTime = (timer: number, hoursActive = true) => {
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    const minutes = Math.floor(timer / 60)
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const hours = Math.floor(timer / 3600)

    if (hoursActive && hours) {
        const getHours = `0${hours}`.slice(-2)
        return `${getHours} : ${getMinutes} : ${getSeconds}`
    }

    return `${getMinutes} : ${getSeconds}`
}

export const formatTimeNumber = (timer: number) => {
    const seconds = timer % 100;
    const getSeconds = `0${seconds}`.slice(-2)
    const minutes = Math.floor(timer / 100)
    const getMinutes = `0${minutes}`.slice(-2)

    return `${getMinutes} : ${getSeconds}`
}

export const reformatTimeNumber = (timer: number) => {
    const seconds = timer % 100;
    const reelSeconds = seconds % 60;
    const minutes = Math.floor(timer / 100) + Math.floor(seconds / 60);
    const reelMinutes = minutes > 60 ? 60 : minutes;
    if (timer >= 6000)
        return 6000;
    const reelNumber = Number(`${reelMinutes}${reelSeconds}`);

    return reelNumber;
}

export const formatTimeString = (timer: string) => {
    const getSeconds = timer.slice(0, 2)
    const getMinutes = timer.slice(2)

    return `${getMinutes} : ${getSeconds}`
}