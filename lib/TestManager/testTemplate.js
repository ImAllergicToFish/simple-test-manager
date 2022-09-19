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
Object.defineProperty(exports, "__esModule", { value: true });
const prettyMs_1 = require("./utils/prettyMs");
class Test {
    constructor(nameOfTest) {
        this._result = 'WAS_NOT_RUNNING';
        if (nameOfTest)
            this._name = nameOfTest;
    }
    get name() {
        if (!this._name)
            return "UNNAMED";
        return this._name;
    }
    get tag() {
        if (!this._tag)
            return "UNNAMED";
        return this._tag;
    }
    get result() {
        if (!this._case)
            return 'NOT_CONFIGURED';
        return this._result;
    }
    get caseExecutionTime() {
        const startTime = this._caseStartTime ? this._caseStartTime : 0;
        const endTime = this._caseEndTime ? this._caseEndTime : 0;
        const executionTimeMs = endTime - startTime;
        const executionTime = prettyMs_1.prettyMs(executionTimeMs);
        return executionTime;
    }
    get caseExecutionTimeMs() {
        const startTime = this._caseStartTime ? this._caseStartTime : 0;
        const endTime = this._caseEndTime ? this._caseEndTime : 0;
        const executionTimeMs = endTime - startTime;
        return executionTimeMs;
    }
    set tag(tag) {
        this._tag = tag;
    }
    /**
     * Тестовый кейс, который необходимо инициализировать
     * при создании теста. Должен возвращать true, если
     * тест выполнен успешно, и fals, если нет.
     */
    set case(testCase) {
        this._case = testCase;
    }
    /**
     * Опциональая функция, которая выполнется перед
     * выполнением теста
     */
    set preparation(preparation) {
        this._preparation = preparation;
    }
    /**
     * Опциональая функция, которая выполнется после
     * выполнением теста
     */
    set completion(completion) {
        this._completion = completion;
    }
    /**
     * Функция запускает тест и возвращает его результат
     * @returns TestResult
     */
    runTest() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this._case)
                    return 'NOT_CONFIGURED';
                const isPreparationSuccess = yield this.runPreparation();
                if (!isPreparationSuccess)
                    return 'PREPARATION_FAILED';
                this._caseStartTime = new Date().getTime();
                const isTestSuccess = yield this._case();
                this._caseEndTime = new Date().getTime();
                const isCompletionSuccess = yield this.runCompletion();
                if (!isCompletionSuccess)
                    return 'COMPLETION_FAILED';
                if (isTestSuccess)
                    return 'PASSED';
                return 'FAILED';
            }
            catch (error) {
                this._caseEndTime = new Date().getTime();
                console.log(error);
                return 'EXCEPTION';
            }
        });
    }
    /**
     * Запускает тест и обновляет поле result
     * @returns TestResult
     */
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            this._result = yield this.runTest();
            return this._result;
        });
    }
    /**
     * @returns true если успешно
     */
    runPreparation() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this._preparation)
                    yield this._preparation();
                return true;
            }
            catch (e) {
                return false;
            }
        });
    }
    /**
     * @returns true если успешно
     */
    runCompletion() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this._completion)
                    yield this._completion();
                return true;
            }
            catch (e) {
                return false;
            }
        });
    }
}
exports.default = Test;
//# sourceMappingURL=testTemplate.js.map