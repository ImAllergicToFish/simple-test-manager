import Test from "./testTemplate";
export default class TestsResultTable {
    private _runnedTests;
    private readonly _fieldNames;
    /**
     * Возвращает набор тегов тестов (без повторений)
     */
    private get _tags();
    constructor(runnedTests?: Test[]);
    print(): void;
    private testsCountByTag;
    private passedTestsCountByTag;
    private totalTimeCountByTag;
    private getSummarizeRow;
}
