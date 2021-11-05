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

export const formatTime = (timer: number) => {
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    const minutes = Math.floor(timer / 60)
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const hours = Math.floor(timer / 3600)

    if (hours) {
        const getHours = `0${hours}`.slice(-2)
        return `${getHours} : ${getMinutes} : ${getSeconds}`
    }

    return `${getMinutes} : ${getSeconds}`
}