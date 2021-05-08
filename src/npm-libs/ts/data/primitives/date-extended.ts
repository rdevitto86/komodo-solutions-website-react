// TODO - augment global Date constructor and add these functions

type TimeUnit = number | string;
type DateType = Date | TimeUnit;

/**
 * Collection of functions that extend JavaScript Date objects
 */
export const DateExtended = {
    toLocalTime,
    toUTC,
    difference,
    convertMilliseconds,
    convertSeconds,
    convertMinutes,
    convertHours,
    convertDays,
    convertWeeks,
    convertMonths,
    convertYears,
};

/**
 * Converts a date-time entity into a local Date object
 * @param {DateType} date date to convert
 * @returns {Date | undefined} local date object
 */
export function toLocalTime(date: DateType) {
    switch (typeof date) {
        case 'string':
        case 'number':
            return new Date(date);
        case 'object':
            if (date instanceof Date) {
                return new Date(
                    Date.UTC(
                        date.getFullYear(),
                        date.getMonth(),
                        date.getDate(),
                        date.getHours(),
                        date.getMinutes(),
                        date.getSeconds()
                    )
                );
            }
            return undefined;
        default:
            return undefined;
    }
}

/**
 * Converts a local date object to UTC
 * @param {DateType} date date in local time zone
 * @returns {Date | undefined} UTC date
 */
export function toUTC(date: DateType) {
    if (!(date instanceof Date)) {
        // convert string/number to local date
        if (typeof date === 'string' || typeof date === 'number') {
            date = new Date(date);
        } else {
            return undefined;
        }
    }

    return new Date(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds()
    );
}

/**
 * Calculates the time difference between two dates
 * @param {Date} recent most recent date
 * @param {Date} previous past date
 * @returns {Object | undefined} difference between dates
 */
export function difference(recent: Date, previous: Date) {
    if (!(recent instanceof Date) || !(previous instanceof Date)) {
        return undefined;
    }

    const milliseconds = recent.getTime() - previous.getTime();
    const seconds = milliseconds / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const weeks = days / 7;
    const months = weeks / 4;
    const years = months / 12;

    // ms, sec, min, hr, day, week, month,
    return {
        milliseconds,
        seconds,
        minutes,
        hours,
        days,
        weeks,
        months,
        years
    };
}

/**
 * Converts milliseconds into equivalent time units
 * @param {TimeUnit} ms number of milliseconds
 * @returns {Object | undefined} calculated time units
 */
export function convertMilliseconds(ms: TimeUnit) {
    if (typeof ms !== 'number') {
        if (typeof ms === 'string') {
            ms = Number(Number.parseFloat(ms).toFixed(4));
            if (Number.isNaN(ms)) {
                return undefined;
            }
        }
        return undefined;
    }

    const seconds = ms / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const weeks = days / 7;
    const months = weeks / 4;
    const years = months / 12;

    return {
        milliseconds: ms,
        seconds,
        minutes,
        hours,
        days,
        weeks,
        months,
        years
    };
}

/**
 * Converts seconds into equivalent time units
 * @param {TimeUnit} sec number of seconds
 * @returns {Object | undefined} calculated time units
 */
export function convertSeconds(sec: TimeUnit) {
    if (typeof sec !== 'number') {
        if (typeof sec === 'string') {
            sec = Number(Number.parseFloat(sec).toFixed(4));
            if (Number.isNaN(sec)) {
                return undefined;
            }
        }
        return undefined;
    }

    const milliseconds = sec * 1000;
    const minutes = sec / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const weeks = days / 7;
    const months = weeks / 4;
    const years = months / 12;

    return {
        milliseconds,
        seconds: sec,
        minutes,
        hours,
        days,
        weeks,
        months,
        years
    };
}

/**
 * Converts minutes into equivalent time units
 * @param {TimeUnit} min number of milliseconds
 * @returns {Object | undefined} calculated time units
 */
export function convertMinutes(min: TimeUnit) {
    if (typeof min !== 'number') {
        if (typeof min === 'string') {
            min = Number(Number.parseFloat(min).toFixed(4));
            if (Number.isNaN(min)) {
                return undefined;
            }
        }
        return undefined;
    }

    const seconds = min * 60;
    const milliseconds = seconds * 1000;
    const hours = min * 60;
    const days = hours / 24;
    const weeks = days / 7;
    const months = weeks / 4;
    const years = months / 12;

    return {
        milliseconds,
        seconds,
        minutes: min,
        hours,
        days,
        weeks,
        years
    };
}

/**
 * Converts hours into equivalent time units
 * @param {TimeUnit} hr number of hours
 * @returns {Object | undefined} calculated time units
 */
export function convertHours(hr: TimeUnit) {
    if (typeof hr !== 'number') {
        if (typeof hr === 'string') {
            hr = Number(Number.parseFloat(hr).toFixed(4));
            if (Number.isNaN(hr)) {
                return undefined;
            }
        }
        return undefined;
    }

    const minutes = hr * 60;
    const seconds = minutes * 60;
    const milliseconds = seconds * 1000;
    const days = hr / 24;
    const weeks = days / 7;
    const years = weeks / 52;

    return {
        milliseconds,
        seconds,
        minutes,
        hours: hr,
        days,
        weeks,
        years
    };
}

/**
 * Converts days into equivalent time units
 * @param {TimeUnit} days number of days
 * @returns {Object | undefined} calculated time units
 */
export function convertDays(days: TimeUnit) {
    if (typeof days !== 'number') {
        if (typeof days === 'string') {
            days = Number(Number.parseFloat(days).toFixed(4));
            if (Number.isNaN(days)) {
                return undefined;
            }
        }
        return undefined;
    }

    const hours = days * 24;
    const minutes = hours * 60;
    const seconds = minutes * 60;
    const milliseconds = seconds * 1000;
    const weeks = days / 7;
    const months = weeks / 4;
    const years = months / 12;

    return {
        milliseconds,
        seconds,
        minutes,
        hours,
        days,
        weeks,
        months,
        years
    };
}

/**
 * Converts weeks into equivalent time units
 * @param {TimeUnit} weeks number of weeks
 * @returns {Object | undefined} calculated time units
 */
export function convertWeeks(weeks: TimeUnit) {
    if (typeof weeks !== 'number') {
        if (typeof weeks === 'string') {
            weeks = Number(Number.parseFloat(weeks).toFixed(4));
            if (Number.isNaN(weeks)) {
                return undefined;
            }
        }
        return undefined;
    }

    const days = weeks * 7;
    const hours = days * 24;
    const minutes = hours * 60;
    const seconds = minutes * 60;
    const milliseconds = seconds * 1000;
    const months = weeks / 4;
    const years = months / 12;

    return {
        milliseconds,
        seconds,
        minutes,
        hours,
        days,
        weeks,
        months,
        years
    };
}

/**
 * Converts months into equivalent time units
 * @param {TimeUnit} mo number of months
 * @returns {Object | undefined} calculated time units
 */
export function convertMonths(mo: TimeUnit) {
    if (typeof mo !== 'number') {
        if (typeof mo === 'string') {
            mo = Number(Number.parseFloat(mo).toFixed(4));
            if (Number.isNaN(mo)) {
                return undefined;
            }
        }
        return undefined;
    }

    const weeks = mo * 4;
    const days = weeks * 7;
    const hours = days * 24;
    const minutes = hours * 60;
    const seconds = minutes * 60;
    const milliseconds = seconds * 1000;
    const years = mo / 12;

    return {
        milliseconds,
        seconds,
        minutes,
        hours,
        days,
        weeks,
        months: mo,
        years
    };
}

/**
 * Converts years into equivalent time units
 * @param {TimeUnit} yr number of years
 * @returns {Object | undefined} calculated time units
 */
export function convertYears(yr: TimeUnit) {
    if (typeof yr !== 'number') {
        if (typeof yr === 'string') {
            yr = Number(Number.parseFloat(yr).toFixed(4));
            if (Number.isNaN(yr)) {
                return undefined;
            }
        }
        return undefined;
    }

    const months = yr * 12;
    const weeks = months * 4;
    const days = weeks * 7;
    const hours = days * 24;
    const minutes = hours * 60;
    const seconds = minutes * 60;
    const milliseconds = seconds * 1000;

    return {
        milliseconds,
        seconds,
        minutes,
        hours,
        days,
        weeks,
        months,
        years: yr
    };
}

export const SECOND_IN_MS = 1000;
export const MINUTE_IN_MS = 60000;
export const HOUR_IN_MS = 3600000;
export const DAY_IN_MS = 86400000;
export const WEEK_IN_MS = 604800000;
export const MONTH_IN_MS = 2419200000;
export const YEAR_IN_MS = 31556952000;
