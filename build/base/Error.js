"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//export module CovalType {
class BaseError {
    /**
     * Creates an instance of Error.
     * @param {string} message
     * @memberof Error
     */
    constructor(message) {
        this.message = message;
        this.message = message;
    }
}
exports.BaseError = BaseError;
class MultichainError extends Error {
    constructor(cause) {
        super('An unexpected error occurred in multichain, are you connected?');
        // super('Something went wrong in multichain, are you connected?')
        this.cause = cause;
        this.name = 'MultichainError';
    }
}
exports.MultichainError = MultichainError;
class Errors {
    constructor() {
        this.errors = [];
    }
    Errors() {
        return this.errors;
    }
    HasErrors() {
        return this.errors.length > 0;
    }
    AddError(error) {
        this._internalAddError(new BaseError(error));
    }
    /**
     * Internal because Error interface is
     * @param error
     */
    _internalAddError(error) {
        this.errors.push(error);
    }
}
exports.Errors = Errors;
//# sourceMappingURL=Error.js.map