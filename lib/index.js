"use strict";
//------------------------------------------------------------|
//                     TEST FACTORY IMPORTS                   |
//------------------------------------------------------------|
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testFactory_1 = __importDefault(require("./TestManager/testFactory"));
exports.createTest = testFactory_1.default;
//------------------------------------------------------------|
//                       TEST MANAGER                         |
//------------------------------------------------------------|
const TestManager_1 = __importDefault(require("./TestManager"));
exports.default = TestManager_1.default;
//# sourceMappingURL=index.js.map