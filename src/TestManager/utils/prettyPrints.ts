const DIVIDING_LINE_LENGTH = 50;
const TEXT_LINE_BASE_SYMBOL = '_';

export function printDividingLine(options?: {isBold?: boolean, text?: string}): void {
    if(!options) options = {};
    
    const baseSymbol = options.isBold ? '=' : '-';
    const line = getLineString(baseSymbol, DIVIDING_LINE_LENGTH);

    if(!options.text) {
        console.log(line);
        return;
    }

    const textLine = line + '\n' + getTextLine(options.text) + '\n' + line;
    console.log(textLine);
}

export class ProcessingLog {

    private _log: string;

    constructor(log: string) {
        this._log = log;
    }

    print() {
        process.stdout.write(this._log + '\r');
    }

    clear() {
        //line of spaces :)
        const emptyLine = getLineString(' ', this._log.length) + '\r';
        process.stdout.write(emptyLine);
    }
} 

function getTextLine(text: string): string {
    const baseSymbol = TEXT_LINE_BASE_SYMBOL;

    const textLength = text.length;
    const leftLineLength = (DIVIDING_LINE_LENGTH - textLength) / 2;
    const rightLineLength = DIVIDING_LINE_LENGTH - leftLineLength - textLength;
    
    const leftLine = getLineString(baseSymbol, leftLineLength);
    const rightLine = getLineString(baseSymbol, rightLineLength);
    let line = leftLine + text + rightLine;

    if(line.length > DIVIDING_LINE_LENGTH) line = line.slice(0, -1);
    if(line.length < DIVIDING_LINE_LENGTH) line += baseSymbol;

    //Опционально
    line = setChar(line, 0, '|');
    line = setChar(line, line.length - 1, '|');

    return line;
}

function getLineString(symbol: string, length: number): string {
    const char = symbol[0];
    let line = '';
    for(let i = 0; i < length; i++) line += char;
    return line;
}

function setChar(str: string, index: number, char: string) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + char + str.substring(index+1);
}