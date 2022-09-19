import Test from "./testTemplate";
declare class TestManager {
    private _tests;
    private _runnedTests;
    constructor();
    addTest(test: Test): void;
    addTests(tests: Test[]): void;
    runAllTests(): Promise<void>;
    runTestsByTag(tag: string): Promise<void>;
    /**
     * Возвращает набор тегов тестов (без повторений)
     */
    private get _tags();
    /**
     * Проверяет существует ли тэг среди имеющихся тестов
     */
    private isTagExist;
    private runTest;
    private printTag;
    private printTestResult;
    private printTestsByTagResult;
}
declare const testManager: TestManager;
export default testManager;
