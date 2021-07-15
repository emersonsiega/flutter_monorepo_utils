import * as vscode from 'vscode';
import { packageIdentifier } from './constants';
import { runTests, runAllTests } from './utilities/test_runner';
import {
	runAllPubGet,
	runAllClean,
	runAllBuildRunner,
	runAllBuildRunnerDeleteConflicting,
	runBuildRunner,
	runBuildRunnerDeleteConflicting,
	runClean,
	runPubGet,
} from './utilities/simple_commands_runner';
import { createOrOpenTestFile } from './utilities/test_file_manager';

export function activate(context: vscode.ExtensionContext) {

	// All projects actions
	registerRunAllTestsContextMenu(context);
	registerRunAllPubGetContextMenu(context);
	registerRunAllCleanContextMenu(context);
	registerRunAllBuildRunnerContextMenu(context);
	registerRunAllBuildRunnerDeleteConflictingContextMenu(context);

	// Specific project actions
	registerRunTestsContextMenu(context);
	registerRunPubGetContextMenu(context);
	registerRunCleanContextMenu(context);
	registerRunBuildRunnerContextMenu(context);
	registerRunBuildRunnerDeleteConflictingContextMenu(context);

	// File actions
	registerCreateOrOpenTestContextMenu(context);
}

function registerRunAllTestsContextMenu(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand(`${packageIdentifier}.runAllTests`, runAllTests)
	);
}

function registerRunAllPubGetContextMenu(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand(`${packageIdentifier}.runAllPubGet`, runAllPubGet)
	);
}


function registerRunAllCleanContextMenu(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand(`${packageIdentifier}.runAllClean`, runAllClean)
	);
}

function registerRunAllBuildRunnerContextMenu(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand(`${packageIdentifier}.runAllBuildRunner`, runAllBuildRunner)
	);
}

function registerRunAllBuildRunnerDeleteConflictingContextMenu(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand(`${packageIdentifier}.runAllBuildRunnerDeleteConflicting`, runAllBuildRunnerDeleteConflicting)
	);
}

function registerRunTestsContextMenu(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand(`${packageIdentifier}.runTests`, (uri) => runTests(uri))
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

function registerCreateOrOpenTestContextMenu(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand(`${packageIdentifier}.createOrOpenTestFile`, createOrOpenTestFile)
	);
}