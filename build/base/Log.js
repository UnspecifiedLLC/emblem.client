"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Log {
    constructor(message) {
        this.message = message;
        this.message = message;
    }
}
exports.Log = Log;
class Logs {
    constructor() {
        this.env_logs = [];
    }
    _Logs() {
        return this.env_logs;
    }
    HasLogs() {
        return this.env_logs.length > 0;
    }
    AddError(_log) {
        this._internalAddError(new Log(_log));
    }
    _internalAddError(_log) {
        this.env_logs.push(_log);
    }
}
exports.Logs = Logs;
//# sourceMappingURL=Log.js.map