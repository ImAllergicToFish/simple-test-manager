import { printDividingLine, ProcessingLog } from "./utils/prettyPrints";
import { prettyMs } from "./utils/prettyMs";
import Test from "./testTemplate";
import TestsResultTable from "./testsResultTable";

class TestManager {

    private _tests: Test[];
    private _runnedTests: Test[];

    constructor() {
        this._tests = [];
        this._runnedTests = [];
    }

   
    addTest(test: Test) {
        this._tests.push(test);
    }

    addTests(tests: Test[]) {
        for(const test of tests) this.addTest(test);
    }

    async runAllTests() {
        for(const tag of this._tags) {
            await this.runTestsByTag(tag);
        }
        printDividingLine({isBold: true});
        new TestsResultTable(this._runnedTests).print();
    }

    async runTestsByTag(tag: string) {
        const isTagExist = this.isTagExist(tag);
        if(!isTagExist) {
            console.log(`Tag "${tag}" is dont exist`);
            return;
        }

        let totalTimeMs = 0;
        let totalTestsCount = 0;
        let passedTestsCount = 0;

        this.printTag(tag);
        for(const test of this._tests) {
            if(test.tag == tag) {
                await this.runTest(test);
                totalTimeMs += test.caseExecutionTimeMs;
                totalTestsCount++;
                if(test.result == 'PASSED') passedTestsCount++;
            }
        }
        this.printTestsByTagResult(totalTestsCount, passedTestsCount, totalTimeMs);
    }

    /**
     * Возвращает набор тегов тестов (без повторений)
     */
    private get _tags(): string[] {
        let tags = this._tests.map(test => { return test.tag });

        function onlyUnique<T>(value: T, index: number, self: T[]) {
            return self.indexOf(value) === index;
        }
        const uniqueTags = tags.filter(onlyUnique);
        return uniqueTags;
    }

    /**
     * Проверяет существует ли тэг среди имеющихся тестов
     */
    private isTagExist(tag: string): boolean {
        for (const existingTag of this._tags) {
            if(tag == existingTag) return true;
        }
        return false;
    }

    private async runTest(test: Test) {
        const processingLog = new ProcessingLog(`${test.name} --> IN PROCESS...\r`);
        processingLog.print();

        await test.run();
        this._runnedTests.push(test);

        processingLog.clear();
        this.printTestResult(test);
    }

    private printTag(tag: string) {
        printDividingLine({isBold: true, text: tag});
        console.log('');
    }

    private printTestResult(test: Test) {
        console.log('NAME: ' + test.name);
        console.log('TIME: ' + test.caseExecutionTime);
        console.log('STATUS: ' + test.result);
        console.log('');
    }

    private printTestsByTagResult(
        totalCount: number, 
        passedCount: number, 
        totalTimeMs: number
    ): void {
        console.log('');
        printDividingLine();
        console.log('')
        console.log('TOTAL TIME: ' + prettyMs(totalTimeMs));
        console.log('TOTAL: ' + totalCount);
        console.log('PASSED: ' + passedCount);
        console.log('');
    }

}

const testManager = new TestManager();
export default testManager;