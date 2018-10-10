"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bitcore = require("bitcore-lib");
const coininfo_1 = require("coininfo");
const CryptoJS = require("crypto-js");
const _Utils = require("../Utils");
const Envelope_1 = require("../transport/Envelope");
let bitcoin = coininfo_1.coininfo.bitcoin.main;
let bitcoinBitcoreLib = bitcoin.toBitcore();
let APIKey = /* process.env.APIKey ||  */ "3031323334353637383931323334353637383930";
var Utils = new _Utils.Utils();
class HDKey {
    CreateNamespacedHDKey(ns, sha256Password, plainTextPassword, walletPath) {
        var envelope = new Envelope_1.Envelope();
        var seed, nonce, passHex, pass;
        var path = EncodePath(walletPath);
        //console.log("--=-=-=-=-=-=-=-==-=", path, walletPath, ns, sha256Password, plainTextPassword)
        ns = Utils.HexEncode(ns);
        pass = EncodePass(sha256Password, plainTextPassword);
        //console.log("--=-=-=-=-=-=-=-==-= pass", pass)
        nonce = bitcore.crypto.Hash.sha256(bitcore.util.buffer.hexToBuffer(ns + APIKey)).toString('hex');
        //console.log("--=-=-=-=-=-=-=-==-= nonce", nonce)
        seed = bitcore.crypto.Hash.sha256(bitcore.util.buffer.hexToBuffer(ns + pass + nonce)).toString('hex');
        //console.log("--=-=-=-=-=-=-=-==-= seed", seed)
        return GeneratePayloadFromSeed(seed, path, function (address, pk) {
            var encrypted = CryptoJS.AES.encrypt(seed, pass).toString();
            envelope.AddValue({ encrypted: encrypted, address: address });
            return envelope;
        });
    }
    DecodeKey(encrypted, sha256Password, plainTextPassword, walletPath) {
        let path = EncodePath(walletPath);
        let pass = EncodePass(sha256Password, plainTextPassword);
        let seed = CryptoJS.AES.decrypt(encrypted, pass).toString(CryptoJS.enc.Utf8);
        //return {seed: seed, pass: pass}
        try {
            return GeneratePayloadFromSeed(seed, path, function (address, pk) {
                return { seed: seed, key: pk, address: address };
            });
        }
        catch (err) {
            return { error: err };
        }
        /* Debug */ //return {encrypted:encrypted, sha256Password:sha256Password, plainTextPassword:plainTextPassword, walletPath:walletPath, path:path, pass:pass, seed:seed }
    }
    StandardHDKey(walletPath, cb) {
        var pk = new bitcore.HDPrivateKey(bitcore.Networks.mainnet);
        var d = pk.derive("m/0'/0/" + walletPath, false);
        var address = d.privateKey.toAddress().toString();
        return cb(address, pk);
    }
    MakeNamespace(req) {
        var teamId, userId, service, ns;
        teamId = req.body.originalRequest.data.team_id;
        userId = req.body.originalRequest.data.event.user;
        service = req.body.originalRequest.source;
        ns = service + ":" + teamId + ":" + userId;
        return ns;
    }
    GetBitcore() {
        return bitcore;
    }
    /* public MakeNamespaceOverride(userId: string, req: any) {
        var teamId, service, ns
            teamId = req.body.originalRequest.data.team_id
            service = req.body.originalRequest.source
            ns = service+":"+teamId+":"+userId
            console.log('--------- Namespace', ns)
        return ns
    } */
    MakeWalletFromNs(ns) {
        return this.CreateNamespacedHDKey(ns);
    }
    CreateKeysFromEncrypted(encrypted) {
        var fromKey = this.DecodeKey(encrypted);
        return this.DeriveKeyWif(fromKey, 0);
    }
    DeriveKeyWif(fromKey, index) {
        if (!index) {
            index = 0;
        }
        var hdPrivateKey = new bitcore.HDPrivateKey(fromKey.key, bitcore.Networks.mainnet);
        var derived = hdPrivateKey.derive("m/0'/0/0");
        var wif = derived.privateKey.toWIF();
        return { derived: derived, wif: wif, pk: fromKey.key };
    }
}
exports.HDKey = HDKey;
function EncodePath(walletPath) {
    var path = walletPath || 0;
    return path;
}
function EncodePass(sha256Password, plainTextPassword) {
    var pass;
    if (sha256Password) {
        pass = sha256Password;
    }
    else if (plainTextPassword) {
        let passHex = Utils.HexEncode(plainTextPassword);
        //console.log('-=-=-=-=-=-= plain text pw', plainTextPassword, passHex)
        pass = bitcore.crypto.Hash.sha256(bitcore.util.buffer.hexToBuffer(passHex)).toString('hex');
    }
    else {
        //console.log('=-=-=-=- NO PASSWORD')
        pass = bitcore.crypto.Hash.sha256(bitcore.util.buffer.hexToBuffer(APIKey)).toString('hex');
    }
    return pass;
}
function GeneratePayloadFromSeed(seed, index, cb) {
    var pk = bitcore.HDPrivateKey.fromSeed(seed, bitcore.Networks.mainnet);
    var d = pk.derive("m/0'/0/" + index, false);
    var address = d.privateKey.toAddress().toString();
    return cb(address, pk);
}
//# sourceMappingURL=HDKey.js.map