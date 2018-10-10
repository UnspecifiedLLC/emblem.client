"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const secrets = require("secrets.js-grempe");
const Envelope_1 = require("../transport/Envelope");
const Mnemonic = require("./Mnemonic");
var Shamir;
(function (Shamir) {
    class Key {
        constructor() { }
        GetKey(length) {
            let _envelope = new Envelope_1.Envelope();
            if (!this.key) {
                var mnemonic = new Mnemonic.Mnemonic();
                var phrase = mnemonic.Generate();
                var key = mnemonic.ToEntropy(phrase);
                this.key = key; //secrets.random(length || 512)
            }
            else {
                _envelope.AddError("Key accessed twice!");
            }
            _envelope.AddValue(this.key);
            return _envelope;
        }
        SetKey(key) {
            this.key = key;
        }
        CreateShares(count, threshold, length) {
            if (!this.key) {
                this.GetKey(length || 512);
            }
            let shares = secrets.share(this.key, count, threshold);
            let envelope = new Envelope_1.Envelope();
            envelope.AddValue(shares);
            return envelope;
        }
        CombineShares(shares) {
            let combined = secrets.combine(shares);
            let envelope = new Envelope_1.Envelope();
            envelope.AddValue(combined);
            return envelope;
        }
    }
    Shamir.Key = Key;
})(Shamir = exports.Shamir || (exports.Shamir = {}));
//# sourceMappingURL=Shamir.js.map