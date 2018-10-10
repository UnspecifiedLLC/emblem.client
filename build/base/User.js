"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UtilLib = require("../Utils");
const Shamir_1 = require("../secure/Shamir");
const Multichain_1 = require("../transport/Multichain");
class User {
    constructor(_UserType, Opts) {
        this.type = _UserType;
    }
}
exports.User = User;
class IdentityProvider {
    constructor(_type) {
        this.type = _type || "generic";
    }
}
exports.IdentityProvider = IdentityProvider;
function As(UserObject, IdentityType, Opts) {
    return new UserObject(IdentityType, Opts);
}
exports.As = As;
class Client extends User {
    constructor() {
        super(UserType.Client);
    }
}
exports.Client = Client;
class Server extends User {
    constructor(IdentityType, Opts) {
        super(UserType.Server);
        if (IdentityType) {
            this.identity_type = IdentityType;
        }
        this.utils = new UtilLib.Utils();
        this.key = new Shamir_1.Shamir.Key();
        this.multichain = new Multichain_1.Multichain();
    }
    IssueEmblemAsset(to, assetName) {
        return this.multichain.IssueEmblem(to, assetName, function (err, tx) {
            return tx;
        });
    }
    SetKey(key) {
        this.key.SetKey(key);
    }
    GetKey() {
        return this.key.key;
    }
    Authenticate(token) {
        this.auth_token = token;
    }
    Generate(size) {
        return this.key.GetKey(size || 256);
    }
    Split(count, threshold, size) {
        return this.key.CreateShares(count, threshold, size);
    }
    Combine(shares) {
        return this.key.CombineShares(shares);
    }
}
exports.Server = Server;
class Identity extends User {
    constructor(IdentityType, Opts) {
        super(UserType.Identity);
        if (IdentityType) {
            this.identity = this.As(IdentityType, Opts);
        }
    }
    As(IdentityObject, Opts) {
        return new IdentityObject(Opts);
    }
}
exports.Identity = Identity;
var UserType;
(function (UserType) {
    UserType[UserType["Server"] = 0] = "Server";
    UserType[UserType["Identity"] = 1] = "Identity";
    UserType[UserType["Client"] = 2] = "Client";
    UserType[UserType["Generic"] = 3] = "Generic";
})(UserType = exports.UserType || (exports.UserType = {}));
//# sourceMappingURL=User.js.map