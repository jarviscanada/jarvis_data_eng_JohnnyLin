declare module 'str-utils' {
    // export const ...
    // export function ...

    type StrDecorator = (str: string) => string;

    export const strReverse: StrDecorator;
    export const strToLower: StrDecorator;
    export const strToUpper: StrDecorator;
    export const strRandomize: StrDecorator;
    export const strInvertCase: StrDecorator;
}