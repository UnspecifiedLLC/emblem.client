"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MultichainLib = require("multichain-node");
const UtilLib = require("../Utils");
const HDKeyLib = require("../secure/HDKey");
const Error_1 = require("../base/Error");
class Multichain {
    constructor(address, connection, asset, permissions) {
        this.address = address;
        this.asset = asset;
        this.permissions = permissions;
        this.Utils = new UtilLib.Utils();
        if (connection) {
            this.multichain = MultichainLib(connection);
        }
        else {
            this.multichain = Multichain.makeConnectedMultichainObject();
        }
    }
    static makeConnectionFromEnv() {
        return new MultichainConnection(Number(process.env.MULTICHAINport), process.env.MULTICHAINhost, process.env.MULTICHAINuser, process.env.MULTICHAINpass);
    }
    static makeConnectedMultichainObject() {
        return new Multichain(process.env.MULTICHAINADDRESS, Multichain.makeConnectionFromEnv());
    }
    Info(callback) {
        try {
            this.multichain.getInfo(callback);
        }
        catch (error) {
            callback(new Error_1.MultichainError(error), null);
        }
    }
    Connect(connection) {
        this.multichain = MultichainLib(connection);
    }
    Streams(callback) {
        try {
            this.multichain.listStreams(callback);
        }
        catch (error) {
            callback(new Error_1.MultichainError(error), null);
        }
    }
    StreamItemsByKey(streamName, key, callback) {
        try {
            this.multichain.listStreamKeyItems({
                stream: streamName,
                key: key,
                verbose: true
            }, (error, items) => {
                return !!error ? callback(error, null) : this._StreamItems(null, items, callback);
            });
        }
        catch (error) {
            callback(new Error_1.MultichainError(error), null);
        }
    }
    StreamItemsByPublisher(streamName, publisherAddress, callback) {
        try {
            this.multichain.listStreamPublisherItems({
                stream: streamName,
                address: publisherAddress,
                verbose: true
            }, (error, items) => {
                return !!error ? callback(error, null) : this._StreamItems(null, items, callback);
            });
        }
        catch (error) {
            callback(new Error_1.MultichainError(error), null);
        }
    }
    GrantPermissionToAddress(addresses, permissions, callback) {
        try {
            this.multichain.grant({
                addresses: addresses,
                permissions: permissions
            }, callback);
        }
        catch (error) {
            callback(new Error_1.MultichainError(error), null);
        }
    }
    RevokePermissionToAddress(address, permissions, callback) {
        try {
            this.multichain.revoke({
                addresses: address,
                permissions: permissions
            }, callback);
        }
        catch (error) {
            callback(new Error_1.MultichainError(error), null);
        }
    }
    ImportAddress(address, name, callback) {
        try {
            this.multichain.importAddress({
                address: address,
                label: name,
                rescan: false
            }, callback);
        }
        catch (error) {
            callback(new Error_1.MultichainError(error), null);
        }
    }
    ImportPrivKey(key, callback) {
        this.multichain.importPrivKey([key], callback);
    }
    SendSignedTransaction(signed, callback) {
        this.multichain.sendRawTransaction([signed.toString("hex")], callback);
    }
    CreateAndSignSend(from, to, asset, qty, callback) {
        var rawRequest = {};
        rawRequest[to] = {};
        // TODO: Use promise with async and await instead of callback, to avoid race condition
        rawRequest[to][asset] = () => Number(qty);
        var parent = this;
        parent.multichain.createRawSendFrom([from.address, rawRequest], function (error, raw) {
            parent.SignRaw(from, raw, callback);
        });
    }
    SignRaw(from, hex, callback) {
        var HDKey = new HDKeyLib.HDKey();
        from.wif = HDKey.DeriveKeyWif(from, 0);
        var parent = this;
        try {
            parent.multichain.signRawTransaction([hex, [], [from.wif.wif]], callback);
        }
        catch (error) {
            callback(new Error_1.MultichainError(error), null);
        }
    }
    GetAssetBalance(address, asset, callback) {
        try {
            this.multichain.getAddressBalances({
                minconf: 0,
                address: address
            }, function (error, result) {
                var balance = 0;
                var filtered = result.filter(function (a) { return a.name === asset; });
                if (filtered.length > 0) {
                    balance = filtered[0].qty;
                }
                return callback(null, balance);
            });
        }
        catch (error) {
            callback(new Error_1.MultichainError(error), null);
        }
    }
    SendAssetFrom(from, to, amount, asset, callback) {
        try {
            this.multichain.sendAssetFrom({
                from: from,
                to: to,
                asset: asset,
                qty: amount
            }, callback);
        }
        catch (error) {
            callback(new Error_1.MultichainError(error), null);
        }
    }
    Issue(to, name, qty, callback) {
        try {
            this.multichain.issue({
                address: to,
                asset: { name: name, open: true },
                qty: qty,
                units: 1
            }, callback);
        }
        catch (error) {
            callback(new Error_1.MultichainError(error), null);
        }
    }
    IssueMore(to, name, qty, callback) {
        try {
            this.multichain.issueMore({
                address: to,
                asset: name,
                qty: qty
            }, callback);
        }
        catch (error) {
            callback(new Error_1.MultichainError(error), null);
        }
    }
    CreateExchange(from, asset, asking, callback) {
        var parent = this;
        var assets = {};
        var ask = {};
        assets[asset] = 1;
        ask[asking] = 1;
        this.PrepareUnlockFrom(from, assets, function (error, unlocks) {
            var payload = { unlocks: unlocks, prepared: '', offer: assets, asking: ask };
            try {
                parent.multichain.createRawExchange({
                    txid: payload.unlocks.txid,
                    vout: payload.unlocks.vout,
                    assets: ask
                }, function (error, raw) {
                    payload.prepared = raw;
                    return callback(error, payload);
                });
            }
            catch (error) {
                callback(new Error_1.MultichainError(error), null);
            }
        });
    }
    FinalizeExchange(hex, txid, vout, assets, callback) {
        try {
            this.multichain.completeRawExchange({
                hexstring: hex,
                txid: txid,
                vout: vout,
                assets: assets,
                data: ''
            }, callback);
        }
        catch (error) {
            callback(new Error_1.MultichainError(error), null);
        }
    }
    PrepareUnlockFrom(from, assets, callback) {
        try {
            this.multichain.prepareLockUnspentFrom({
                from: from,
                assets: assets,
                lock: true
            }, callback);
        }
        catch (error) {
            callback(new Error_1.MultichainError(error), null);
        }
    }
    PrepareUnlock(assets, callback) {
        try {
            this.multichain.prepareLockUnspent({
                assets: assets,
                lock: false
            }, callback);
        }
        catch (error) {
            callback(new Error_1.MultichainError(error), null);
        }
    }
    IssueEmblem(to, assetName, callback) {
        this.Issue(to, assetName, 1, callback);
    }
    _StreamItems(error, items, callback) {
        var itemArray = [];
        if (items && items.length > 0)
            itemArray = this._elementValueCompute(items);
        return callback(error, itemArray);
    }
    _elementValueCompute(items) {
        let Utils = this.Utils;
        return items.map(function (element) {
            element.value = Utils.HexToAscii(element.data);
            return element;
        });
    }
}
exports.Multichain = Multichain;
class MultichainConnection {
    constructor(port, host, user, pass) {
        this.port = port;
        this.host = host;
        this.user = user;
        this.pass = pass;
    }
}
exports.MultichainConnection = MultichainConnection;
//# sourceMappingURL=Multichain.js.map