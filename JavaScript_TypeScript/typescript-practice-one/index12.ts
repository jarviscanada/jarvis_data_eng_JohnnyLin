declare module 'stats' {
    type Comparator<T> = (a: T, b: T) => number;
    type getIndex = <T>(input: T[], comparator: Comparator<T>) => number;
    type getElement = <T>(input: T[], comparator: Comparator<T>) => T | null;

    export const getMaxIndex: getIndex;
    export const getMaxElement: getElement;
    export const getMinIndex: getIndex;
    export const getMinElement: getElement;
    export const getMedianIndex: getIndex;
    export const getMedianElement: getElement;
    export const getAverageValue: <T>(input: T[], getValue: (item: T) => number) => number | null;
}