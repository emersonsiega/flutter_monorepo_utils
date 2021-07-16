import * as vscode from 'vscode';
import { createTestFileWithCompletePath, getCurrentPath, getProjectPath, getTestFilePath, newTestFileContent, verifyTestFilePresence } from '../utils';
import { sep } from 'path';

export async function createOrOpenTestFile(uri: vscode.Uri) {
    let projectPath: string = getProjectPath(uri.fsPath);
    let currentPath: string = getCurrentPath(uri.fsPath);

    let fileName: string = '';
    let parts: string[] = currentPath.split(sep);
    fileName = parts[parts.length === 1 ? 0 : parts.length - 1];

    let fileLocation = currentPath.replace(`${fileName}`, '');
    let testFile: vscode.Uri = getTestFilePath(projectPath, fileLocation, fileName);

    let exists = await verifyTestFilePresence(testFile);

    if (!exists) {
        await createTestFileWithCompletePath(testFile, fileName);

        exists = await verifyTestFilePresence(testFile);
        if (!exists) {
            vscode.window.showErrorMessage("Can't create test file. Something wrong happened 😞");
            return;
        }

        // Reassign with correct file scheme...
        testFile = vscode.Uri.file(testFile.fsPath);
        vscode.window.showInformationMessage("Test file created... Have fun!");
    };

    let doc = await vscode.workspace.openTextDocument(testFile);
    await vscode.window.showTextDocument(doc);
}