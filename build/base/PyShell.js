"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PythonShellLib = require("python-shell");
class PyShell {
    constructor(script, options) {
        this.script = script;
        this.options = options;
        if (script) {
            this.Interactive = new PythonShellLib.PythonShell(script, options || {});
        }
    }
    Run(script, callback) {
        PythonShellLib.PythonShell.run(script, this.options || {}, function (err, results) {
            return callback(err, results);
        });
    }
    Send(input, callback) {
        this.Interactive.send(input);
        this.Interactive.on('message', function (message) {
            return callback(message);
        });
    }
    End(callback) {
        this.Interactive.end(function (err) {
            return callback(err);
        });
    }
}
exports.PyShell = PyShell;
class PyShellOptions {
    constructor(mode, pythonPath, pythonOptions, scriptPath, args) {
        this.mode = mode;
        this.pythonPath = pythonPath;
        this.pythonOptions = pythonOptions;
        this.scriptPath = scriptPath;
        this.args = args;
    }
}
exports.PyShellOptions = PyShellOptions;
var Mode;
(function (Mode) {
    Mode["Text"] = "text";
    Mode["Json"] = "json";
    Mode["Binary"] = "binary";
})(Mode = exports.Mode || (exports.Mode = {}));
//# sourceMappingURL=PyShell.js.map