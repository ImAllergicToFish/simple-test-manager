import { TestCase, TestCompletion, TestPreparation, TestResult } from "./types";
import { prettyMs } from "./utils/prettyMs";

export default class Test {

    private _name: string | undefined;
    private _tag: string | undefined;
    private _result: TestResult;

    //Время начала и конца выполнения тест-кейса в мс
    //по нему расчитывается время в-я кейса
    //не учитывает preparation и completion
    private _caseStartTime: number | undefined;
    private _caseEndTime: number | undefined;

    private _case!: TestCase;
    private _preparation: TestPreparation;
    private _completion: TestCompletion;

    get name(): string {
        if(!this._name) return "UNNAMED";
        return this._name;
    }
   
    get tag(): string {
        if(!this._tag) return "UNNAMED";
        return this._tag;
    }

    get result(): TestResult {
        if(!this._case) return 'NOT_CONFIGURED';
        return this._result;
    }

    get caseExecutionTime(): string {
        const startTime = this._caseStartTime ? this._caseStartTime : 0;
        const endTime = this._caseEndTime ? this._caseEndTime : 0;
        const executionTimeMs = endTime - startTime;
        const executionTime = prettyMs(executionTimeMs);
        return executionTime;
    }

    get caseExecutionTimeMs(): number {
        const startTime = this._caseStartTime ? this._caseStartTime : 0;
        const endTime = this._caseEndTime ? this._caseEndTime : 0;
        const executionTimeMs = endTime - startTime;
        return executionTimeMs;
    }

    set tag(tag: string) {
        this._tag = tag;
    }

    /**
     * Тестовый кейс, который необходимо инициализировать
     * при создании теста. Должен возвращать true, если
     * тест выполнен успешно, и fals, если нет.
     */
    set case(testCase: TestCase) {
        this._case = testCase;
    }

    /**
     * Опциональая функция, которая выполнется перед
     * выполнением теста
     */
     set preparation(preparation: TestPreparation) {
        this._preparation = preparation;
    }

    /**
     * Опциональая функция, которая выполнется после
     * выполнением теста
     */
    set completion(completion: TestCompletion) {
        this._completion = completion;
    }

    constructor(nameOfTest?: string) {
        this._result = 'WAS_NOT_RUNNING';
        if(nameOfTest) this._name = nameOfTest;
    }

    /**
     * Функция запускает тест и возвращает его результат
     * @returns TestResult
     */
    private async runTest(): Promise<TestResult> {
        try {
            if(!this._case) return 'NOT_CONFIGURED';

            const isPreparationSuccess = await this.runPreparation();
            if(!isPreparationSuccess) return 'PREPARATION_FAILED';

            this._caseStartTime = new Date().getTime();
            const isTestSuccess = await this._case();
            this._caseEndTime = new Date().getTime();

            const isCompletionSuccess = await this.runCompletion();
            if(!isCompletionSuccess) return 'COMPLETION_FAILED';

            if(isTestSuccess) return 'PASSED';
            return 'FAILED';

        } catch (error) {
            this._caseEndTime = new Date().getTime();
            console.log(error)
            return 'EXCEPTION';
        }
    }

    /**
     * Запускает тест и обновляет поле result
     * @returns TestResult
     */
    async run(): Promise<TestResult> {
        this._result = await this.runTest();
        return this._result;
    }

    /**
     * @returns true если успешно
     */
    private async runPreparation(): Promise<boolean> {
        try {
            if(this._preparation) await this._preparation();
            return true;
        }
        catch (e) {
            return false;
        }
    }

    /**
     * @returns true если успешно
     */
    private async runCompletion(): Promise<boolean> {
        try {
            if(this._completion) await this._completion();
            return true;
        }
        catch (e) {
            return false;
        }
    }


}