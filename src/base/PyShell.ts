"use strict"
import * as PythonShellLib from "python-shell"

export class PyShell {
    public Interactive
    constructor(public script?: string, public options?: PyShellOptions){
        if (script) {
            this.Interactive = new PythonShellLib.PythonShell(script, options || {})
        }
    }
    public Run(script: string, callback?) {
        PythonShellLib.PythonShell.run(script, this.options || {}, function(err, results){
            return callback(err, results)
        })
    }
    public Send(input: string, callback) {
        this.Interactive.send(input)
        this.Interactive.on('message', function (message) {
            return callback(message)
        })
    }
    public End(callback){
        this.Interactive.end(function(err){
            return callback(err)
        })
    }
}

export class PyShellOptions {
    constructor(public mode?: Mode, public pythonPath?: string, public pythonOptions?: string[], public scriptPath?: string, public args?: string[]){}
}

export enum Mode {
    Text = 'text',
    Json = 'json',
    Binary = 'binary'
}