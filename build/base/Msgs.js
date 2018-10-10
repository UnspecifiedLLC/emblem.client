"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Error_1 = require("./Error");
const Log_1 = require("./Log");
"use strict";
class Msgs extends Error_1.Errors {
    EnvLogs() {
        return new Log_1.Logs();
    }
}
exports.Msgs = Msgs;
//# sourceMappingURL=Msgs.js.map