"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LR = require("lightrail-client");
class Lightrail {
    constructor(options) {
        this.client = LR;
        if (options) {
            LR.configure(options || {});
        }
    }
    ContactParams(firstName, lastName, email, userSuppliedId) {
        return {
            id: userSuppliedId || this.GenerateID(),
            email: email,
            firstName: firstName,
            lastName: lastName
        };
    }
    CreateContact(contact) {
        return this.client.contacts.createContact(contact);
    }
    GenerateID() {
        return "testID";
    }
}
exports.Lightrail = Lightrail;
//# sourceMappingURL=Lightrail.js.map