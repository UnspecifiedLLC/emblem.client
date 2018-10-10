"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mneumonic = require("bip39");
const bip39Shamir = require("bip39shamir-web");
class Mnemonic {
    constructor(seed) {
        if (seed) {
            this.seed = Buffer.from(seed, 'hex');
        }
    }
    Generate(strength) {
        if (this.seed) {
            return mneumonic.entropyToMnemonic(this.seed);
        }
        else {
            return mneumonic.generateMnemonic(strength || 256);
        }
    }
    ToSeedHex(phrase) {
        return mneumonic.mnemonicToSeedHex(phrase);
    }
    ToEntropy(phrase) {
        if (!phrase) {
            return "Missing Phrase";
        }
        else {
            return mneumonic.mnemonicToEntropy(phrase);
        }
    }
    Split(quantity, threshold, phrase) {
        var shares = bip39Shamir.shares(phrase || this.Generate(128), quantity || 3, threshold || 2);
        return shares;
    }
    Combine(shares) {
        return bip39Shamir.combine(shares);
    }
}
exports.Mnemonic = Mnemonic;
//# sourceMappingURL=Mnemonic.js.map