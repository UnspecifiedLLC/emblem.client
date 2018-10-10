"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Envelope_1 = require("../transport/Envelope");
class Protected {
    constructor(value) {
        var privateValue = value;
        this.Value = function () {
            var envelope = new Envelope_1.Envelope();
            envelope.AddValue(privateValue);
            if (!privateValue) {
                envelope.AddError("Self destructed!");
            }
            privateValue = null;
            return envelope;
        };
    }
}
exports.Protected = Protected;
//# sourceMappingURL=Protected.js.map