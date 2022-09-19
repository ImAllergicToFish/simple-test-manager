export declare function printDividingLine(options?: {
    isBold?: boolean;
    text?: string;
}): void;
export declare class ProcessingLog {
    private _log;
    constructor(log: string);
    print(): void;
    clear(): void;
}
