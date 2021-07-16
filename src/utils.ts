import * as vscode from 'vscode';
import * as fs from 'fs';
import { sep } from 'path';

export const isWindows: boolean = process.platform === 'win32';

export async function fileExists(file: string) {
    try {
        await vscode.workspace.fs.stat(vscode.Uri.file(file));
        return true;
    } catch {
        return false;
    }
}


export async function containsTestFolder(uri: vscode.Uri) {
    return await fileExists(`${uri.fsPath}/test`);
}

export async function containsPubspec(uri: vscode.Uri) {
    return await fileExists(`${uri.fsPath}/pubspec.yaml`);
}

export function getFinalPath(path: String, split: string = '/') {
    let file: any = path.split(split);
    file = file[file.length - 1];
    return file;
}

export function getCurrentPath(path: String) {
    let file: any = path.split(`${sep}lib${sep}`);
    file = file[file.length - 1];
    return file;
}

export function getProjectPath(path: String) {
    let file: string[] = path.split(`${sep}lib${sep}`);
    return file[0];
}

export function getTestFilePath(projectPath: string, fileLocation: string, fileName: string) {
    return vscode.Uri.joinPath(vscode.Uri.file(projectPath), 'test', fileLocation, fileName.replace('.dart', '_test.dart'));
}

export async function verifyTestFilePresence(testFilePath: vscode.Uri) {
    return await fileExists(testFilePath.fsPath);
}

export function newTestFileContent() {
    return `import 'package:flutter_test/flutter_test.dart';

void main() {
  setUp(() {
    //
  });

  test('', () {
    //
  });
}`;
}

export async function createTestFileWithCompletePath(testFile: vscode.Uri, fileName: string) {
    let fileNameWithoutExt = fileName.replace('.dart', '');
    let completePath = testFile.fsPath.split(`${sep}${fileNameWithoutExt}`)[0];
    let exists = await fileExists(completePath);

    if (!exists) {
        fs.mkdirSync(completePath, {recursive: true});
    }

    fs.writeFileSync(testFile.fsPath, newTestFileContent(), 'utf8');
}

export async function getWorkspaceTestFiles() { 
    return await vscode.workspace.findFiles('{*/test/*_test.dart}', '.*');
}

export async function getWorkspaceFlutterProjects() { 
    return await vscode.workspace.findFiles('{*/pubspec.yaml}', '.*');
}