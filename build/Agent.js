"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserLib = require("./base/User");
const User_1 = require("./base/User");
class Agent {
    constructor(_UserType, IdentityType, Opts) {
        if (_UserType) {
            if (IdentityType) {
                this.user = UserLib.As(_UserType, IdentityType, Opts);
            }
            else {
                this.user = UserLib.As(_UserType);
            }
        }
        else {
            this.user = new UserLib.User(User_1.UserType.Generic);
        }
    }
    CallServerless(target, opts) {
        throw new Error("Method not implemented.");
    }
}
exports.Agent = Agent;
//# sourceMappingURL=Agent.js.map