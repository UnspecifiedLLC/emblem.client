import { DatNode } from "./transport/Dat";
import { Envelope } from "./transport/Envelope";
export declare class Emblem {
    claimed: boolean;
    private datNodes;
    AddDatNode(dat: DatNode): Envelope;
    findDatOfType(type: string): DatNode;
    HasRequiredDats(): boolean;
}
