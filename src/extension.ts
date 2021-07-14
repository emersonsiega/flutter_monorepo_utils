import * as vscode from 'vscode';
import { packageIdentifier } from './constants';
import { runTests, runAllTests } from './utilities/test_runner';
import { runBuildRunner, runBuildRunnerDeleteConflicting, runClean, runPubGet } from './utilities/simple_commands_runner';

export function activate(context: vscode.ExtensionContext) {
	registerRunTestsContextMenu(context);

	registerRunAllTestsContextMenu(context);

	registerRunPubGetContextMenu(context);

	registerRunCleanContextMenu(context);

	registerRunBuildRunnerContextMenu(context);

	registerRunBuildRunnerDeleteConflictingContextMenu(context);
}

function registerRunTestsContextMenu(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand(`${packageIdentifier}.runTests`, (uri) => runTests(uri))
	);
}

function registerRunAllTestsContextMenu(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand(`${packageIdentifier}.runAllTests`, runAllTests)
	);
}

function registerRunPubGetContextMenu(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand(`${packageIdentifier}.runPubGet`, runPubGet)
	);
}

function registerRunCleanContextMenu(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand(`${packageIdentifier}.runClean`, runClean)
	);
}

function registerRunBuildRunnerContextMenu(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand(`${packageIdentifier}.runBuildRunner`, runBuildRunner)
	);
}

function registerRunBuildRunnerDeleteConflictingContextMenu(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand(`${packageIdentifier}.runBuildRunnerDeleteConflicting`, runBuildRunnerDeleteConflicting)
	);
}