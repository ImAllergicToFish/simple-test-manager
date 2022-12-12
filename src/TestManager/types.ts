/**
 * Виды ответов, которые может вернуть метод Test.run()
 */
type TestResult = 'PASSED' | 'FAILED' | 'EXCEPTION' | 'WAS_NOT_RUNNING' |
    'NOT_CONFIGURED' | 'PREPARATION_FAILED' | 'COMPLETION_FAILED';

/**
 * Тест-кейс, который должен задать пользователь
 */
type TestCase = (() => Promise<boolean> | boolean);

type TestPreparation = (() => Promise<void> | void) | undefined;

type TestCompletion = TestPreparation;

type TestOptions = {
    /**
     * Имя тестового кейса
     */
    name: string,

    /**
     * Тэг
     */
    tag: string,
    case: TestCase,
    preparation?: TestPreparation,
    completion?: TestCompletion
}

export { TestResult , TestCase, TestPreparation, TestCompletion, TestOptions};