"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessingLog = exports.printDividingLine = void 0;
const DIVIDING_LINE_LENGTH = 50;
const TEXT_LINE_BASE_SYMBOL = '_';
function printDividingLine(options) {
    if (!options)
        options = {};
    const baseSymbol = options.isBold ? '=' : '-';
    const line = getLineString(baseSymbol, DIVIDING_LINE_LENGTH);
    if (!options.text) {
        console.log(line);
        return;
    }
    const textLine = line + '\n' + getTextLine(options.text) + '\n' + line;
    console.log(textLine);
}
exports.printDividingLine = printDividingLine;
class ProcessingLog {
    constructor(log) {
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
exports.ProcessingLog = ProcessingLog;
function getTextLine(text) {
    const baseSymbol = TEXT_LINE_BASE_SYMBOL;
    const textLength = text.length;
    const leftLineLength = (DIVIDING_LINE_LENGTH - textLength) / 2;
    const rightLineLength = DIVIDING_LINE_LENGTH - leftLineLength - textLength;
    const leftLine = getLineString(baseSymbol, leftLineLength);
    const rightLine = getLineString(baseSymbol, rightLineLength);
    let line = leftLine + text + rightLine;
    if (line.length > DIVIDING_LINE_LENGTH)
        line = line.slice(0, -1);
    if (line.length < DIVIDING_LINE_LENGTH)
        line += baseSymbol;
    //Опционально
    line = setChar(line, 0, '|');
    line = setChar(line, line.length - 1, '|');
    return line;
}
function getLineString(symbol, length) {
    const char = symbol[0];
    let line = '';
    for (let i = 0; i < length; i++)
        line += char;
    return line;
}
function setChar(str, index, char) {
    if (index > str.length - 1)
        return str;
    return str.substring(0, index) + char + str.substring(index + 1);
}
//# sourceMappingURL=prettyPrints.js.map