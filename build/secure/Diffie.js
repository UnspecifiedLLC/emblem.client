"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
class Diffie {
    constructor(strength, prime, generator, key) {
        if (generator && prime) {
            this.dh = crypto.createDiffieHellman(prime, generator);
        }
        else {
            this.dh = crypto.createDiffieHellman(strength || 2048);
        }
        if (key) {
            this.dh.setPrivateKey(key);
        }
        this.keys = this.dh.generateKeys();
    }
    GetPubKey() {
        return this.dh.getPublicKey();
    }
    GetPrime() {
        return this.dh.getPrime();
    }
    GetGenerator() {
        return this.dh.getGenerator();
    }
    GetPrivateKey() {
        return this.dh.getPrivateKey();
    }
    GetSharedSecret(pubkey) {
        return this.dh.computeSecret(pubkey);
    }
    Serialize() {
        return {
            pubkey: this.dh.getPublicKey(),
            privkey: this.dh.getPrivateKey(),
            prime: this.dh.getPrime(),
            generator: this.dh.getGenerator()
        };
    }
}
exports.Diffie = Diffie;
//# sourceMappingURL=Diffie.js.map