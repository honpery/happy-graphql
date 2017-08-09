export function bigCamel(...strs: string[]) {
    return strs.map(str => str.charAt(0).toUpperCase() + str.substr(1)).join('');
}

export function smallCamel(...strs: string[]) {
    const str = bigCamel(...strs);
    return str.charAt(0).toLowerCase() + str.substr(1);
}

export type Thunk<T> = T | (() => T);

export function ResolveThunk<T>(thunk: Thunk<T>) {
    return typeof thunk === 'function' ? thunk() : thunk;
}
