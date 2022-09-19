import Test from "./testTemplate";
import { prettyMs } from "./utils/prettyMs";
import { Table } from 'console-table-printer';

const FIELDS_NAMES = ['Tag', 'Total', 'Passed', 'TotalTime'];

interface ResultRow {
    tag: string,
    total: number,
    passed: number,
    totalTime: string
}

export default class TestsResultTable {

    private _runnedTests: Test[];
    private readonly _fieldNames: typeof FIELDS_NAMES;


    /**
     * Возвращает набор тегов тестов (без повторений)
     */
    private get _tags(): string[] {
        let tags = this._runnedTests.map(test => { return test.tag });

        function onlyUnique<T>(value: T, index: number, self: T[]) {
            return self.indexOf(value) === index;
        }
        const uniqueTags = tags.filter(onlyUnique);
        return uniqueTags;
    }

    constructor(runnedTests?: Test[]) {
        this._runnedTests = [];
        if(runnedTests) this._runnedTests = runnedTests;

        this._fieldNames = FIELDS_NAMES;
    }

    print() {
        let resultRows: ResultRow[] = [];
        for(const tag of this._tags) {
            resultRows.push({
                tag,
                total: this.testsCountByTag(tag),
                passed: this.passedTestsCountByTag(tag),
                totalTime: this.totalTimeCountByTag(tag)
            })
        }

        const tb = new Table();
        tb.addRows(resultRows);

        const summarizeRow = this.getSummarizeRow();
        const isFullComplete = summarizeRow.total == summarizeRow.passed
        const summarizeRowColor = isFullComplete? 'green' : 'red';
        tb.addRow(summarizeRow, {color: summarizeRowColor});

        tb.printTable()
    }

    private testsCountByTag(tag: string): number {
        let count = 0;
        for(const test of this._runnedTests) {
            if(test.tag == tag) count++;
        }
        return count;
    }

    private passedTestsCountByTag(tag: string): number {
        let count = 0;
        for(const test of this._runnedTests) {
            if(test.tag == tag && test.result == 'PASSED') count++;
        }
        return count;
    }

    private totalTimeCountByTag(tag: string): string {
        let totalTimeMs = 0;
        for(const test of this._runnedTests) {
            if(test.tag == tag) totalTimeMs += test.caseExecutionTimeMs;
        }
        const totalTime = prettyMs(totalTimeMs);
        return totalTime;
    }

    private getSummarizeRow(): ResultRow {
        let passesCount = 0;
        let totalTimeMs = 0;
        for(const test of this._runnedTests) {
            if(test.result == 'PASSED') passesCount++;
            totalTimeMs += test.caseExecutionTimeMs;
        }

        return {
            tag: 'SUMMARY',
            total: this._runnedTests.length,
            passed: passesCount,
            totalTime: prettyMs(totalTimeMs)
        }
    }
}

