export function checkNonEmptyString(v: unknown, field = 'value') {
    if (typeof v !== 'string' || v.trim().length === 0) {
        throw new Error(`${field} must be a non-empty string`);
    }
}

export function checkPositiveInt(v: unknown, field = 'value') {
    if (typeof v !== 'number' || !Number.isInteger(v) || v <= 0) {
        throw new Error(`${field} must be a positive integer`);
    }
}