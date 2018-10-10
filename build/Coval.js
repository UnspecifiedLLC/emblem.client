"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Protected_1 = require("./secure/Protected");
const Mnemonic_1 = require("./secure/Mnemonic");
const Shamir_1 = require("./secure/Shamir");
const Diffie_1 = require("./secure/Diffie");
const Envelope_1 = require("./transport/Envelope");
const Dat_1 = require("./transport/Dat");
const Multichain_1 = require("./transport/Multichain");
const GenerateKey_1 = require("./secure/GenerateKey");
const Unloq_1 = require("./partner/Unloq");
const Changely_1 = require("./partner/Changely");
const Shapeshift_1 = require("./partner/Shapeshift");
const Vocal_1 = require("./Vocal");
const Emblem_1 = require("./Emblem");
const Caesar_1 = require("./secure/Caesar");
const HDKey_1 = require("./secure/HDKey");
const Pre_1 = require("./secure/Pre");
const Lightrail_1 = require("./partner/Lightrail");
const Agent_1 = require("./Agent");
const Error_1 = require("./base/Error");
const Log_1 = require("./base/Log");
const Msgs_1 = require("./base/Msgs");
const PyShell_1 = require("./base/PyShell");
const User = require("./base/User");
const ManyKeys_1 = require("./secure/ManyKeys");
/**
 * Coval main export
 *
 * @export
 * @class Coval
 */
class Coval {
    constructor() {
        this.Secure = new Secures();
        this.Partner = new Partners();
        this.Transport = new Transports();
        this.Vocal = Vocal_1.Vocal;
        this.Emblem = Emblem_1.Emblem;
        this.Agent = Agent_1.Agent;
        this.Error = Error_1.BaseError;
        this.Log = Log_1.Log;
        this.Msgs = Msgs_1.Msgs;
        this.PyShell = PyShell_1.PyShell;
        this.User = User;
    }
}
exports.Coval = Coval;
/**
 * Coval Secure Class
 *
 * @export
 * @class Secure
 */
class Secures {
    constructor() {
        this.Shamir = Shamir_1.Shamir;
        this.Protected = Protected_1.Protected;
        this.Diffie = Diffie_1.Diffie;
        this.Mnemonic = Mnemonic_1.Mnemonic;
        this.Caesar = Caesar_1.Caesar;
        this.HDKey = HDKey_1.HDKey;
        this.Pre = Pre_1.Pre;
        this.ManyKeys = ManyKeys_1.ManyKeys;
        this.GenerateKey = GenerateKey_1.GenerateKey;
    }
}
exports.Secures = Secures;
/**
 * Partners of Coval
 *
 * @export
 * @class Partner
 */
class Partners {
    constructor() {
        this.Unloq = Unloq_1.Unloq;
        this.Shapeshift = Shapeshift_1.Shapeshift;
        this.Changely = Changely_1.Changely;
        this.Lightrail = Lightrail_1.Lightrail;
    }
}
exports.Partners = Partners;
/**
 * Coval Transport Class
 *
 * @export
 * @class Transport
 */
class Transports {
    constructor() {
        this.Envelope = Envelope_1.Envelope;
        this.DatNode = Dat_1.DatNode;
        this.Multichain = Multichain_1.Multichain;
    }
}
exports.Transports = Transports;
//# sourceMappingURL=Coval.js.map