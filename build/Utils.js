"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    HexEncode(input) {
        var hex, i;
        var result = "";
        for (i = 0; i < input.length; i++) {
            hex = input.charCodeAt(i).toString(16);
            result += ("000" + hex).slice(-4);
        }
        return result;
    }
    HexDecode(j) {
        //var j
        var hexes = j.match(/.{1,4}/g) || [];
        var back = "";
        for (j = 0; j < hexes.length; j++) {
            back += String.fromCharCode(parseInt(hexes[j], 16));
        }
        return back;
    }
    HexToAscii(hexString) {
        let strOut = '';
        for (var x = 0; x < hexString.length; x += 2) {
            strOut += String.fromCharCode(parseInt(hexString.substr(x, 2), 16));
        }
        return strOut;
    }
    toHexString(byteArray) {
        return Array.prototype.map.call(byteArray, function (byte) {
            return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('');
    }
}
exports.Utils = Utils;
//# sourceMappingURL=Utils.js.map