export function isUndefinedOrEmpty (value: string | undefined) {

    return value === undefined || value.trim().length === 0;
}