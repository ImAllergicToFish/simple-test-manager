"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testTemplate_1 = __importDefault(require("./testTemplate"));
function createTest(testOptions) {
    const test = new testTemplate_1.default(testOptions.name);
    test.tag = testOptions.tag;
    test.case = testOptions.case;
    test.preparation = testOptions.preparation;
    test.completion = testOptions.completion;
    return test;
}
exports.default = createTest;
//# sourceMappingURL=testFactory.js.map