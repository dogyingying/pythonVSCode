// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

'use strict';

import * as vscode from 'vscode';
import { TestStatus } from '../../../client/unittests/common/types';

export interface ITestDetails {
    className: string;
    nameToRun: string;
    fileName: string;
    sourceFileName?: string;
    testName: string;
    simpleClassName?: string;
    sourceTestName: string;
    imported: boolean;
    passOnFailedRun?: boolean;
    status: TestStatus;
    classDefRange?: vscode.Range;
    testDefRange?: vscode.Range;
    issueRange?: vscode.Range;
    issueLineText?: string;
    message?: string;
    expectedDiagnostic?: vscode.Diagnostic;
}

export const allTestDetails: ITestDetails[] = [
    {
        className: 'test_root.Test_Root_test1',
        nameToRun: 'test_root.py::Test_Root_test1::test_Root_A',
        fileName: 'test_root.py',
        testName: 'test_Root_A',
        sourceTestName: 'test_Root_A',
        testDefRange: new vscode.Range(6, 8, 6, 19),
        issueRange: new vscode.Range(7, 8, 7, 36),
        issueLineText: 'self.fail("Not implemented")',
        message: 'AssertionError: Not implemented',
        imported: false,
        status: TestStatus.Fail
    },
    {
        className: 'test_root.Test_Root_test1',
        nameToRun: 'test_root.py::Test_Root_test1::test_Root_B',
        fileName: 'test_root.py',
        testName: 'test_Root_B',
        sourceTestName: 'test_Root_B',
        imported: false,
        status: TestStatus.Pass
    },
    {
        className: 'test_root.Test_Root_test1',
        nameToRun: 'test_root.py::Test_Root_test1::test_Root_c',
        fileName: 'test_root.py',
        testName: 'test_Root_c',
        sourceTestName: 'test_Root_c',
        testDefRange: new vscode.Range(13, 8, 13, 19),
        message: 'demonstrating skipping',
        imported: false,
        status: TestStatus.Skipped
    },
    {
        className: 'tests.test_another_pytest',
        nameToRun: 'tests/test_another_pytest.py::test_username',
        fileName: 'tests/test_another_pytest.py',
        testName: 'test_username',
        sourceTestName: 'test_username',
        imported: false,
        status: TestStatus.Pass
    },
    {
        className: 'tests.test_another_pytest',
        nameToRun: 'tests/test_another_pytest.py::test_parametrized_username[one]',
        fileName: 'tests/test_another_pytest.py',
        testName: 'test_parametrized_username[one]',
        sourceTestName: 'test_parametrized_username',
        imported: false,
        status: TestStatus.Pass
    },
    {
        className: 'tests.test_another_pytest',
        nameToRun: 'tests/test_another_pytest.py::test_parametrized_username[two]',
        fileName: 'tests/test_another_pytest.py',
        testName: 'test_parametrized_username[two]',
        sourceTestName: 'test_parametrized_username',
        imported: false,
        status: TestStatus.Pass
    },
    {
        className: 'tests.test_another_pytest',
        nameToRun: 'tests/test_another_pytest.py::test_parametrized_username[three]',
        fileName: 'tests/test_another_pytest.py',
        testName: 'test_parametrized_username[three]',
        sourceTestName: 'test_parametrized_username',
        testDefRange: new vscode.Range(15, 4, 15, 30),
        issueRange: new vscode.Range(16, 4, 16, 64),
        issueLineText: 'assert non_parametrized_username in [\'one\', \'two\', \'threes\']',
        message: 'AssertionError: assert \'three\' in [\'one\', \'two\', \'threes\']',
        imported: false,
        status: TestStatus.Fail
    },
    {
        className: 'tests.test_foreign_nested_tests.TestNestedForeignTests.TestInheritingHere.().TestExtraNestedForeignTests.()',
        nameToRun: 'tests/test_foreign_nested_tests.py::TestNestedForeignTests::TestInheritingHere::TestExtraNestedForeignTests::test_super_deep_foreign',
        simpleClassName: 'TestInheritingHere',
        fileName: 'tests/test_foreign_nested_tests.py',
        testName: 'test_super_deep_foreign',
        sourceTestName: 'test_super_deep_foreign',
        sourceFileName: 'tests/external.py',
        classDefRange: new vscode.Range(4, 10, 4, 28),
        testDefRange: new vscode.Range(2, 12, 2, 35),
        issueRange: new vscode.Range(3, 12, 3, 24),
        issueLineText: 'assert False',
        message: 'AssertionError',
        imported: true,
        status: TestStatus.Fail
    },
    {
        className: 'tests.test_foreign_nested_tests.TestNestedForeignTests.TestInheritingHere.()',
        nameToRun: 'tests/test_foreign_nested_tests.py::TestNestedForeignTests::TestInheritingHere::test_foreign_test',
        simpleClassName: 'TestInheritingHere',
        fileName: 'tests/test_foreign_nested_tests.py',
        testName: 'test_foreign_test',
        sourceTestName: 'test_foreign_test',
        sourceFileName: 'tests/external.py',
        classDefRange: new vscode.Range(4, 10, 4, 28),
        testDefRange: new vscode.Range(4, 8, 4, 25),
        issueRange: new vscode.Range(5, 8, 5, 20),
        issueLineText: 'assert False',
        message: 'AssertionError',
        imported: true,
        status: TestStatus.Fail
    },
    {
        className: 'tests.test_foreign_nested_tests.TestNestedForeignTests.TestInheritingHere.()',
        nameToRun: 'tests/test_foreign_nested_tests.py::TestNestedForeignTests::TestInheritingHere::test_nested_normal',
        fileName: 'tests/test_foreign_nested_tests.py',
        testName: 'test_nested_normal',
        sourceTestName: 'test_nested_normal',
        imported: false,
        status: TestStatus.Pass
    },
    {
        className: 'tests.test_foreign_nested_tests.TestNestedForeignTests',
        nameToRun: 'tests/test_foreign_nested_tests.py::TestNestedForeignTests::test_normal',
        fileName: 'tests/test_foreign_nested_tests.py',
        testName: 'test_normal',
        sourceTestName: 'test_normal',
        imported: false,
        status: TestStatus.Pass
    },
    {
        className: 'tests.test_pytest.Test_CheckMyApp',
        nameToRun: 'tests/test_pytest.py::Test_CheckMyApp::test_simple_check',
        fileName: 'tests/test_pytest.py',
        testName: 'test_simple_check',
        sourceTestName: 'test_simple_check',
        testDefRange: new vscode.Range(7, 8, 7, 25),
        message: 'demonstrating skipping',
        imported: false,
        status: TestStatus.Skipped
    },
    {
        className: 'tests.test_pytest.Test_CheckMyApp',
        nameToRun: 'tests/test_pytest.py::Test_CheckMyApp::test_complex_check',
        fileName: 'tests/test_pytest.py',
        testName: 'test_complex_check',
        sourceTestName: 'test_complex_check',
        imported: false,
        status: TestStatus.Pass
    },
    {
        className: 'tests.test_pytest.Test_CheckMyApp.Test_NestedClassA.()',
        nameToRun: 'tests/test_pytest.py::Test_CheckMyApp::Test_NestedClassA::test_nested_class_methodB',
        fileName: 'tests/test_pytest.py',
        testName: 'test_nested_class_methodB',
        sourceTestName: 'test_nested_class_methodB',
        imported: false,
        status: TestStatus.Pass
    },
    {
        className: 'tests.test_pytest.Test_CheckMyApp.Test_NestedClassA.().Test_nested_classB_Of_A.()',
        nameToRun: 'tests/test_pytest.py::Test_CheckMyApp::Test_NestedClassA::Test_nested_classB_Of_A::test_d',
        fileName: 'tests/test_pytest.py',
        testName: 'test_d',
        sourceTestName: 'test_d',
        imported: false,
        status: TestStatus.Pass
    },
    {
        className: 'tests.test_pytest.Test_CheckMyApp.Test_NestedClassA.()',
        nameToRun: 'tests/test_pytest.py::Test_CheckMyApp::Test_NestedClassA::test_nested_class_methodC',
        fileName: 'tests/test_pytest.py',
        testName: 'test_nested_class_methodC',
        sourceTestName: 'test_nested_class_methodC',
        imported: false,
        status: TestStatus.Pass
    },
    {
        className: 'tests.test_pytest.Test_CheckMyApp',
        nameToRun: 'tests/test_pytest.py::Test_CheckMyApp::test_simple_check2',
        fileName: 'tests/test_pytest.py',
        testName: 'test_simple_check2',
        sourceTestName: 'test_simple_check2',
        imported: false,
        status: TestStatus.Pass
    },
    {
        className: 'tests.test_pytest.Test_CheckMyApp',
        nameToRun: 'tests/test_pytest.py::Test_CheckMyApp::test_complex_check2',
        fileName: 'tests/test_pytest.py',
        testName: 'test_complex_check2',
        sourceTestName: 'test_complex_check2',
        imported: false,
        status: TestStatus.Pass
    },
    {
        className: 'tests.test_pytest',
        nameToRun: 'tests/test_pytest.py::test_username',
        fileName: 'tests/test_pytest.py',
        testName: 'test_username',
        sourceTestName: 'test_username',
        imported: false,
        status: TestStatus.Pass
    },
    {
        className: 'tests.test_pytest',
        nameToRun: 'tests/test_pytest.py::test_parametrized_username[one]',
        fileName: 'tests/test_pytest.py',
        testName: 'test_parametrized_username[one]',
        sourceTestName: 'test_parametrized_username',
        imported: false,
        status: TestStatus.Pass
    },
    {
        className: 'tests.test_pytest',
        nameToRun: 'tests/test_pytest.py::test_parametrized_username[two]',
        fileName: 'tests/test_pytest.py',
        testName: 'test_parametrized_username[two]',
        sourceTestName: 'test_parametrized_username',
        imported: false,
        status: TestStatus.Pass
    },
    {
        className: 'tests.test_pytest',
        nameToRun: 'tests/test_pytest.py::test_parametrized_username[three]',
        fileName: 'tests/test_pytest.py',
        testName: 'test_parametrized_username[three]',
        sourceTestName: 'test_parametrized_username',
        testDefRange: new vscode.Range(38, 4, 38, 30),
        issueRange: new vscode.Range(39, 4, 39, 64),
        issueLineText: 'assert non_parametrized_username in [\'one\', \'two\', \'threes\']',
        message: 'AssertionError: assert \'three\' in [\'one\', \'two\', \'threes\']',
        imported: false,
        status: TestStatus.Fail
    },
    {
        className: 'tests.test_unittest_one.Test_test1',
        nameToRun: 'tests/test_unittest_one.py::Test_test1::test_A',
        fileName: 'tests/test_unittest_one.py',
        testName: 'test_A',
        sourceTestName: 'test_A',
        testDefRange: new vscode.Range(6, 8, 6, 14),
        issueRange: new vscode.Range(7, 8, 7, 36),
        issueLineText: 'self.fail("Not implemented")',
        message: 'AssertionError: Not implemented',
        imported: false,
        status: TestStatus.Fail
    },
    {
        className: 'tests.test_unittest_one.Test_test1',
        nameToRun: 'tests/test_unittest_one.py::Test_test1::test_B',
        fileName: 'tests/test_unittest_one.py',
        testName: 'test_B',
        sourceTestName: 'test_B',
        imported: false,
        status: TestStatus.Pass
    },
    {
        className: 'tests.test_unittest_one.Test_test1',
        nameToRun: 'tests/test_unittest_one.py::Test_test1::test_c',
        fileName: 'tests/test_unittest_one.py',
        testName: 'test_c',
        sourceTestName: 'test_c',
        testDefRange: new vscode.Range(13, 8, 13, 14),
        message: 'demonstrating skipping',
        imported: false,
        status: TestStatus.Skipped
    },
    {
        className: 'tests.test_unittest_two.Test_test2',
        nameToRun: 'tests/test_unittest_two.py::Test_test2::test_A2',
        fileName: 'tests/test_unittest_two.py',
        testName: 'test_A2',
        sourceTestName: 'test_A2',
        testDefRange: new vscode.Range(3, 8, 3, 15),
        issueRange: new vscode.Range(4, 8, 4, 36),
        issueLineText: 'self.fail("Not implemented")',
        message: 'AssertionError: Not implemented',
        imported: false,
        status: TestStatus.Fail
    },
    {
        className: 'tests.test_unittest_two.Test_test2',
        nameToRun: 'tests/test_unittest_two.py::Test_test2::test_B2',
        fileName: 'tests/test_unittest_two.py',
        testName: 'test_B2',
        sourceTestName: 'test_B2',
        imported: false,
        status: TestStatus.Pass
    },
    {
        className: 'tests.test_unittest_two.Test_test2',
        nameToRun: 'tests/test_unittest_two.py::Test_test2::test_C2',
        fileName: 'tests/test_unittest_two.py',
        testName: 'test_C2',
        sourceTestName: 'test_C2',
        testDefRange: new vscode.Range(9, 8, 9, 15),
        issueRange: new vscode.Range(10, 8, 10, 41),
        issueLineText: 'self.assertEqual(1,2,\'Not equal\')',
        message: 'AssertionError: 1 != 2 : Not equal',
        imported: false,
        status: TestStatus.Fail
    },
    {
        className: 'tests.test_unittest_two.Test_test2',
        nameToRun: 'tests/test_unittest_two.py::Test_test2::test_D2',
        fileName: 'tests/test_unittest_two.py',
        testName: 'test_D2',
        sourceTestName: 'test_D2',
        testDefRange: new vscode.Range(12, 8, 12, 15),
        issueRange: new vscode.Range(13, 8, 13, 31),
        issueLineText: 'raise ArithmeticError()',
        message: 'ArithmeticError',
        imported: false,
        status: TestStatus.Fail
    },
    {
        className: 'tests.test_unittest_two.Test_test2a',
        nameToRun: 'tests/test_unittest_two.py::Test_test2a::test_222A2',
        fileName: 'tests/test_unittest_two.py',
        testName: 'test_222A2',
        sourceTestName: 'test_222A2',
        testDefRange: new vscode.Range(17, 8, 17, 18),
        issueRange: new vscode.Range(18, 8, 18, 36),
        issueLineText: 'self.fail("Not implemented")',
        message: 'AssertionError: Not implemented',
        imported: false,
        passOnFailedRun: true,
        status: TestStatus.Fail
    },
    {
        className: 'tests.test_unittest_two.Test_test2a',
        nameToRun: 'tests/test_unittest_two.py::Test_test2a::test_222B2',
        fileName: 'tests/test_unittest_two.py',
        testName: 'test_222B2',
        sourceTestName: 'test_222B2',
        imported: false,
        status: TestStatus.Pass
    },
    {
        className: 'tests.unittest_three_test.Test_test3',
        nameToRun: 'tests/unittest_three_test.py::Test_test3::test_A',
        fileName: 'tests/unittest_three_test.py',
        testName: 'test_A',
        sourceTestName: 'test_A',
        testDefRange: new vscode.Range(4, 8, 4, 14),
        issueRange: new vscode.Range(5, 8, 5, 36),
        issueLineText: 'self.fail("Not implemented")',
        message: 'AssertionError: Not implemented',
        imported: false,
        status: TestStatus.Fail
    },
    {
        className: 'tests.unittest_three_test.Test_test3',
        nameToRun: 'tests/unittest_three_test.py::Test_test3::test_B',
        fileName: 'tests/unittest_three_test.py',
        testName: 'test_B',
        sourceTestName: 'test_B',
        imported: false,
        status: TestStatus.Pass
    }
];