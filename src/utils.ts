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

export function getFinalPath(path: String, split: string = '/') {
    let file: any = path.split(split);
    file = file[file.length - 1];
    return file;
}