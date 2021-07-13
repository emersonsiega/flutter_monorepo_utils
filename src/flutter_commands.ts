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
    successMessage: "\n🎉 Packages get finished!",
    errorMessage: "\n🔥 Packages get failed!",
    channelTitle: "Flutter Packages Get",
    firstActionLog: (folder: String) => `Getting packages on ${folder}...\n\n`,
    invalidFolderLog: (folder: String) => `\n🚫 The ${folder} folder is not a Flutter project!`
};

export const cleanProject = {
    command: 'flutter',
    args: ['clean'],
    successMessage: "\n🎉 Flutter clean finished!",
    errorMessage: "\n🔥 Flutter clean failed!",
    channelTitle: "Flutter clean",
    firstActionLog: (folder: String) => `Cleaning project ${folder}...\n\n`,
    invalidFolderLog: (folder: String) => `\n🚫 The ${folder} folder is not a Flutter project!`
};

export const buildRunner = {
    command: 'flutter',
    args: ['pub', 'run', 'build_runner', 'build'],
    successMessage: "\n🎉 Build runner finished!",
    errorMessage: "\n🔥 Build runner failed!",
    channelTitle: "Build runner",
    firstActionLog: (folder: String) => `Running build_runner on ${folder}...\n\n`,
    invalidFolderLog: (folder: String) => `\n🚫 The ${folder} folder is not a Flutter project!`
};

export const buildRunnerExtraArgument = '--delete-conflicting-outputs';

export function killProcess(child: ChildProcessWithoutNullStreams) {
    if (isWindows) {
        spawn("cmd.exe", ["/c", "taskkill /F /PID " + child.pid], { shell: true });
    } else {
        spawn("sh", ["-c", "kill -INT -" + child.pid]);
    }
}