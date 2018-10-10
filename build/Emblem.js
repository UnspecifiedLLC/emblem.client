"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Envelope_1 = require("./transport/Envelope");
class Emblem {
    constructor() {
        this.claimed = false;
        this.datNodes = [];
    }
    AddDatNode(dat) {
        var envelope = new Envelope_1.Envelope();
        if (this.findDatOfType(dat.getID())) {
            envelope.AddError("Dat of this type already exists");
        }
        else {
            this.datNodes.push(dat);
            envelope.AddValue("Sucessfully added dat");
        }
        envelope.AddValue("Sucessfully added dat");
        return envelope;
    }
    findDatOfType(type) {
        let found = this.datNodes.filter((d) => { return d.getID() === type; });
        return found.length > 0 ? found[0] : null;
    }
    HasRequiredDats() {
        return !!this.findDatOfType('client') && !!this.findDatOfType('server');
    }
}
exports.Emblem = Emblem;
//# sourceMappingURL=Emblem.js.map