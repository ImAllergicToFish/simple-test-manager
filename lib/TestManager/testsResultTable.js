"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prettyMs_1 = require("./utils/prettyMs");
const console_table_printer_1 = require("console-table-printer");
const FIELDS_NAMES = ['Tag', 'Total', 'Passed', 'TotalTime'];
class TestsResultTable {
    constructor(runnedTests) {
        this._runnedTests = [];
        if (runnedTests)
            this._runnedTests = runnedTests;
        this._fieldNames = FIELDS_NAMES;
    }
    /**
     * Возвращает набор тегов тестов (без повторений)
     */
    get _tags() {
        let tags = this._runnedTests.map(test => { return test.tag; });
        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }
        const uniqueTags = tags.filter(onlyUnique);
        return uniqueTags;
    }
    print() {
        let resultRows = [];
        for (const tag of this._tags) {
            resultRows.push({
                tag,
                total: this.testsCountByTag(tag),
                passed: this.passedTestsCountByTag(tag),
                totalTime: this.totalTimeCountByTag(tag)
            });
        }
        const tb = new console_table_printer_1.Table();
        tb.addRows(resultRows);
        const summarizeRow = this.getSummarizeRow();
        const isFullComplete = summarizeRow.total == summarizeRow.passed;
        const summarizeRowColor = isFullComplete ? 'green' : 'red';
        tb.addRow(summarizeRow, { color: summarizeRowColor });
        tb.printTable();
    }
    testsCountByTag(tag) {
        let count = 0;
        for (const test of this._runnedTests) {
            if (test.tag == tag)
                count++;
        }
        return count;
    }
    passedTestsCountByTag(tag) {
        let count = 0;
        for (const test of this._runnedTests) {
            if (test.tag == tag && test.result == 'PASSED')
                count++;
        }
        return count;
    }
    totalTimeCountByTag(tag) {
        let totalTimeMs = 0;
        for (const test of this._runnedTests) {
            if (test.tag == tag)
                totalTimeMs += test.caseExecutionTimeMs;
        }
        const totalTime = prettyMs_1.prettyMs(totalTimeMs);
        return totalTime;
    }
    getSummarizeRow() {
        let passesCount = 0;
        let totalTimeMs = 0;
        for (const test of this._runnedTests) {
            if (test.result == 'PASSED')
                passesCount++;
            totalTimeMs += test.caseExecutionTimeMs;
        }
        return {
            tag: 'SUMMARY',
            total: this._runnedTests.length,
            passed: passesCount,
            totalTime: prettyMs_1.prettyMs(totalTimeMs)
        };
    }
}
exports.default = TestsResultTable;
//# sourceMappingURL=testsResultTable.js.map