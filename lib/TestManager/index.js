"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prettyPrints_1 = require("./utils/prettyPrints");
const prettyMs_1 = require("./utils/prettyMs");
const testsResultTable_1 = __importDefault(require("./testsResultTable"));
class TestManager {
    constructor() {
        this._tests = [];
        this._runnedTests = [];
    }
    addTest(test) {
        this._tests.push(test);
    }
    addTests(tests) {
        for (const test of tests)
            this.addTest(test);
    }
    runAllTests() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const tag of this._tags) {
                yield this.runTestsByTag(tag);
            }
            prettyPrints_1.printDividingLine({ isBold: true });
            new testsResultTable_1.default(this._runnedTests).print();
        });
    }
    runTestsByTag(tag) {
        return __awaiter(this, void 0, void 0, function* () {
            const isTagExist = this.isTagExist(tag);
            if (!isTagExist) {
                console.log(`Tag "${tag}" is dont exist`);
                return;
            }
            let totalTimeMs = 0;
            let totalTestsCount = 0;
            let passedTestsCount = 0;
            this.printTag(tag);
            for (const test of this._tests) {
                if (test.tag == tag) {
                    yield this.runTest(test);
                    totalTimeMs += test.caseExecutionTimeMs;
                    totalTestsCount++;
                    if (test.result == 'PASSED')
                        passedTestsCount++;
                }
            }
            this.printTestsByTagResult(totalTestsCount, passedTestsCount, totalTimeMs);
        });
    }
    /**
     * Завершает процесс с exit code:
     * - 0 если тесты выполнились без ошибок
     * - 1 если с ошибками
     */
    evaluateFinishedTests() {
        const finishedTests = this._tests.filter((test) => { return test.result != 'WAS_NOT_RUNNING'; });
        const failedTests = finishedTests.filter((test) => { return test.result != 'PASSED'; });
        if (failedTests.length)
            process.exit(1);
        process.exit(0);
    }
    /**
     * Возвращает набор тегов тестов (без повторений)
     */
    get _tags() {
        let tags = this._tests.map(test => { return test.tag; });
        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }
        const uniqueTags = tags.filter(onlyUnique);
        return uniqueTags;
    }
    /**
     * Проверяет существует ли тэг среди имеющихся тестов
     */
    isTagExist(tag) {
        for (const existingTag of this._tags) {
            if (tag == existingTag)
                return true;
        }
        return false;
    }
    runTest(test) {
        return __awaiter(this, void 0, void 0, function* () {
            const processingLog = new prettyPrints_1.ProcessingLog(`${test.name} --> IN PROCESS...\r`);
            processingLog.print();
            yield test.run();
            this._runnedTests.push(test);
            processingLog.clear();
            this.printTestResult(test);
        });
    }
    printTag(tag) {
        prettyPrints_1.printDividingLine({ isBold: true, text: tag });
        console.log('');
    }
    printTestResult(test) {
        console.log('NAME: ' + test.name);
        console.log('TIME: ' + test.caseExecutionTime);
        console.log('STATUS: ' + test.result);
        console.log('');
    }
    printTestsByTagResult(totalCount, passedCount, totalTimeMs) {
        console.log('');
        prettyPrints_1.printDividingLine();
        console.log('');
        console.log('TOTAL TIME: ' + prettyMs_1.prettyMs(totalTimeMs));
        console.log('TOTAL: ' + totalCount);
        console.log('PASSED: ' + passedCount);
        console.log('');
    }
}
const testManager = new TestManager();
exports.default = testManager;
//# sourceMappingURL=index.js.map