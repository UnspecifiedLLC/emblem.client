"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* import * as CaesarLib from 'caesar' */
class Caesar {
    constructor() { }
}
exports.Caesar = Caesar;
class XtsEncryptor {
}
exports.XtsEncryptor = XtsEncryptor;
class XtsDecrypter {
    constructor() {
        this.decryptedChunks = '';
        /* constructor(key) {
            this.decrypter = new CaesarLib.message.XTSDecrypter(key)
        }
        registeredActivity = false
        Activity(msgBufferLength, cb) {
            this.decrypter.on('data', (chunk) => {
                if (this.decryptedChunks.length + 32 > msgBufferLength) {
                    var extra = this.decryptedChunks.length + 32 - msgBufferLength
                    var sliceAt = 32 - extra
                    chunk = chunk.slice(0, sliceAt)
                    this.decryptedChunks += chunk
                    return cb(this.decryptedChunks)
                }
                this.decryptedChunks += chunk
            })
        }
    
        public write(buffer, msgBufferLength: number, cb) {
            if (!this.registeredActivity) {
                this.Activity(msgBufferLength, cb)
                this.registeredActivity = true
            }
            this.decrypter.write(buffer)
        } */
    }
}
exports.XtsDecrypter = XtsDecrypter;
//# sourceMappingURL=Caesar.js.map