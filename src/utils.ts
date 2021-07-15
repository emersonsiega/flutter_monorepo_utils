import * as vscode from 'vscode';

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

export async function getWorkspaceTestFiles() { 
    return await vscode.workspace.findFiles('{*/test/*_test.dart}', '.*');
}

export async function getWorkspaceFlutterProjects() { 
    return await vscode.workspace.findFiles('{*/pubspec.yaml}', '.*');
}