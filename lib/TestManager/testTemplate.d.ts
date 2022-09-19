import { TestCase, TestCompletion, TestPreparation, TestResult } from "./types";
export default class Test {
    private _name;
    private _tag;
    private _result;
    private _caseStartTime;
    private _caseEndTime;
    private _case;
    private _preparation;
    private _completion;
    get name(): string;
    get tag(): string;
    get result(): TestResult;
    get caseExecutionTime(): string;
    get caseExecutionTimeMs(): number;
    set tag(tag: string);
    /**
     * Тестовый кейс, который необходимо инициализировать
     * при создании теста. Должен возвращать true, если
     * тест выполнен успешно, и fals, если нет.
     */
    set case(testCase: TestCase);
    /**
     * Опциональая функция, которая выполнется перед
     * выполнением теста
     */
    set preparation(preparation: TestPreparation);
    /**
     * Опциональая функция, которая выполнется после
     * выполнением теста
     */
    set completion(completion: TestCompletion);
    constructor(nameOfTest?: string);
    /**
     * Функция запускает тест и возвращает его результат
     * @returns TestResult
     */
    private runTest;
    /**
     * Запускает тест и обновляет поле result
     * @returns TestResult
     */
    run(): Promise<TestResult>;
    /**
     * @returns true если успешно
     */
    private runPreparation;
    /**
     * @returns true если успешно
     */
    private runCompletion;
}
