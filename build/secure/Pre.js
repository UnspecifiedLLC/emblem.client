"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
const PyShell_1 = require("../base/PyShell");
class Pre {
    constructor(script) {
        if (script) {
            this.script = script;
        }
        else {
            this.script = 'pre.py';
        }
    }
    Execute(callback) {
        let options = new PyShell_1.PyShellOptions(PyShell_1.Mode.Text, '/usr/local/bin/python3');
        //var target = path.join(__dirname, '..', '..', '/build/python', this.script )
        var target = './build/python/pre.py';
        let pyshell = new PyShell_1.PyShell(target, options);
        console.log('---------------- TARGET', target);
        console.log('---------------- DIR', __dirname);
        pyshell.Run(target, function (err, msg) {
            return callback(msg, err);
        });
    }
    GenKey(callback) {
        this.Execute(function (msg) {
            return callback(JSON.parse(JSON.stringify(msg[0])));
        });
    }
}
exports.Pre = Pre;
//# sourceMappingURL=Pre.js.map