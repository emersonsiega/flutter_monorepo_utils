import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { isWindows } from "./utils";

export const runTests = {
    command: 'flutter', args: [
        'test', '--reporter=json'
    ],
};

export const getPackages = {
    command: 'flutter',
    args: ['pub', 'get'],
    successMessage: "\nš Packages get finished!",
    errorMessage: "\nš„ Packages get failed!",
    channelTitle: "Flutter Packages Get",
    firstActionLog: (folder: String) => `Getting packages in ${folder}...\n\n`,
    invalidFolderLog: (folder: String) => `\nš« The ${folder} folder is not a Flutter project!`
};

export const cleanProject = {
    command: 'flutter',
    args: ['clean'],
    successMessage: "\nš Flutter clean finished!",
    errorMessage: "\nš„ Flutter clean failed!",
    channelTitle: "Flutter clean",
    firstActionLog: (folder: String) => `Running Flutter clean in ${folder}...\n\n`,
    invalidFolderLog: (folder: String) => `\nš« The ${folder} folder is not a Flutter project!`
};

export const buildRunner = {
    command: 'flutter',
    args: ['pub', 'run', 'build_runner', 'build'],
    successMessage: "\nš Build runner finished!",
    errorMessage: "\nš„ Build runner failed!",
    channelTitle: "Build runner",
    firstActionLog: (folder: String) => `Running build_runner in ${folder}...\n\n`,
    invalidFolderLog: (folder: String) => `\nš« The ${folder} folder is not a Flutter project!`
};

export const buildRunnerExtraArgument = '--delete-conflicting-outputs';

export function killProcess(child: ChildProcessWithoutNullStreams) {
    if (isWindows) {
        spawn("cmd.exe", ["/c", "taskkill /F /PID " + child.pid], { shell: true });
    } else {
        spawn("sh", ["-c", "kill -INT -" + child.pid]);
    }
}