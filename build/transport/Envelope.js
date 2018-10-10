"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../base/Log");
require("../base/Msgs");
const Msgs_1 = require("../base/Msgs");
class Envelope extends Msgs_1.Msgs {
    AddValue(_value) {
        this.value = _value;
    }
    GetValue() {
        return this.value;
    }
    toString() {
        return {
            value: this.value,
            errors: this.Errors(),
            logs: this.EnvLogs().env_logs
        };
    }
}
exports.Envelope = Envelope;
//# sourceMappingURL=Envelope.js.map