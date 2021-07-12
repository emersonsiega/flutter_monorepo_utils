// ------------------------------------------------------------------------------------
/**
 * TODO:
 *  [X] - Run tests (context menu)
 *  [] - Improve context menu location and package name
 *  [] - Run ALL tests (context menu)
 *  [] - Run get/clean/build_runner (context menu)
 *  [] - Run tests when project changes
 *  [] - Create test file in same hierarchy
 *  [] - Dream: Load and watch all tests (grouped by package) in the testing tab
 */
// ------------------------------------------------------------------------------------

import * as vscode from 'vscode';
import { runTests } from './utilities/test_runner';
import { packageIdentifier } from './constants';

export function activate(context: vscode.ExtensionContext) {
	registerRunTestsContextMenu(context);
}

function registerRunTestsContextMenu(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand(`${packageIdentifier}.runTests`, runTests)
	);
}
