//------------------------------------------------------------|
//                     TEST FACTORY IMPORTS                   |
//------------------------------------------------------------|

import createTest from "./TestManager/testFactory";

//------------------------------------------------------------|
//                       TYPES IMPORTS                        |
//------------------------------------------------------------|

import { TestResult, TestCase, TestOptions } from "./TestManager/types";
import { TestCompletion,  TestPreparation } from "./TestManager/types";

//------------------------------------------------------------|
//                       TEST MANAGER                         |
//------------------------------------------------------------|

import testManager from "./TestManager";

//------------------------------------------------------------|

export {
    TestResult,
    TestCase,
    TestOptions,
    TestCompletion,
    TestPreparation 
}

export {
    createTest
}

export default testManager;