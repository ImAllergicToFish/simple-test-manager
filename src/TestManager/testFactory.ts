import Test from "./testTemplate";
import { TestOptions } from "./types";

export default function createTest(testOptions: TestOptions) {
    const test = new Test(testOptions.name);
    test.tag = testOptions.tag;
    
    test.case = testOptions.case;
    test.preparation  = testOptions.preparation;
    test.completion = testOptions.completion;

    return test;
}
