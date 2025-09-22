"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkNonEmptyString = checkNonEmptyString;
exports.checkPositiveInt = checkPositiveInt;
function checkNonEmptyString(v, field = 'value') {
    if (typeof v !== 'string' || v.trim().length === 0) {
        throw new Error(`${field} must be a non-empty string`);
    }
}
function checkPositiveInt(v, field = 'value') {
    if (typeof v !== 'number' || !Number.isInteger(v) || v <= 0) {
        throw new Error(`${field} must be a positive integer`);
    }
}
