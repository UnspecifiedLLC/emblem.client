"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coininfo_1 = require("coininfo");
const CoinKey = require("coinkey");
const bitcoin = coininfo_1.coininfo.bitcoin.main;
const bitcoinBitcoreLib = bitcoin.toBitcore();
class ManyKeys {
    constructor(seed) {
        if (seed) {
            this.seed = Buffer.from(seed, 'hex');
        }
    }
    static combineDicts(item1, item2) {
        return Object.assign({}, item1, item2);
    }
    GenKeys() {
        this.ck = new CoinKey(this.seed);
        return this.ck;
    }
    As(type, network) {
        this.ck = new CoinKey(this.seed, coininfo_1.coininfo(network ? type + '-' + network : type).versions);
        return this.ck;
    }
    GetAllAddresses() {
        return Object.keys(coininfo_1.supportedCoins)
            .map((coin) => this.createAddressDict(coin))
            .reduce((address1, address2) => ManyKeys.combineDicts(address1, address2));
    }
    GetAllKeys() {
        return Object.keys(coininfo_1.supportedCoins)
            .map((coin) => this.createKeyDict(coin))
            .reduce((key1, key2) => ManyKeys.combineDicts(key1, key2));
    }
    KeyFromWif(wif) {
        const ck = CoinKey.fromWif(wif);
        return { privateKey: ck.privateKey.toString('hex'), address: ck.publicAddress };
    }
    createAddressDict(coin) {
        const addresses = {};
        addresses[coin] = { address: this.createCoinKey(coin).publicAddress, unit: coininfo_1.supportedCoins[coin].unit };
        return addresses;
    }
    createKeyDict(coin) {
        const keys = {};
        keys[coin] = { wif: this.createCoinKey(coin).privateWif, unit: coininfo_1.supportedCoins[coin].unit };
        return keys;
    }
    createCoinKey(coin) {
        var ck = new CoinKey(this.seed, coininfo_1.coininfo(coininfo_1.supportedCoins[coin].name).versions);
        return ck;
    }
}
exports.ManyKeys = ManyKeys;
//# sourceMappingURL=ManyKeys.js.map