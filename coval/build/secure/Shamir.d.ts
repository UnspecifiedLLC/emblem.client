import { Envelope } from "../transport/Envelope";
export declare module Shamir {
    class Key {
        key: string;
        shares: string[];
        constructor();
        GetKey(length?: any): Envelope;
        SetKey(key: any): void;
        CreateShares(count: number, threshold: number, length?: any): Envelope;
        CombineShares(shares: string[]): Envelope;
    }
}
