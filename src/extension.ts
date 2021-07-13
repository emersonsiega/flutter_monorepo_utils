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
