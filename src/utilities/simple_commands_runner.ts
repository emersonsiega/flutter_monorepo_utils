import * as vscode from 'vscode';
import * as cp from 'child_process';
import * as commands from '../flutter_commands';
import { packageAlias } from '../constants';
import { isWindows, getFinalPath, containsPubspec, getWorkspaceFlutterProjects } from '../utils';
import { sep } from 'path';

export async function runPubGet(uri: vscode.Uri) {
    return await _runCommand(uri, commands.getPackages);
}

export async function runAllPubGet() {
    return await _runCommandAllProjects(commands.getPackages);
}

export async function runAllClean() {
    return await _runCommandAllProjects(commands.cleanProject);
}

export async function runAllBuildRunner() {
    return await _runCommandAllProjects(commands.buildRunner);
}

export async function runAllBuildRunnerDeleteConflicting() {
    return await _runCommandAllProjects({
        ...commands.buildRunner,
        args: [...commands.buildRunner.args, commands.buildRunnerExtraArgument],
    });
}

export async function _runCommandAllProjects(command: any) {
    const projects = await getWorkspaceFlutterProjects();

    if (projects.length <= 0) {
        await vscode.window.showWarningMessage("Can't find Flutter projects in the current workspace...");
        return;
    }

    let channel = vscode.window.createOutputChannel(`${packageAlias}: ${command.channelTitle}`);
    channel.appendLine(command.firstActionLog('all projects'));

    await Promise.all(projects.map((file) => {
        const projectPath = vscode.Uri.file(file.fsPath.replace(`${sep}pubspec.yaml`, ''));

        return _runCommand(projectPath, command, true, channel);
    }));
}

export async function runClean(uri: vscode.Uri) {
    return await _runCommand(uri, commands.cleanProject);
}

export async function runBuildRunner(uri: vscode.Uri) {
    return await _runCommand(uri, commands.buildRunner);
}

export async function runBuildRunnerDeleteConflicting(uri: vscode.Uri) {
    return await _runCommand(uri, {
        ...commands.buildRunner,
        args: [...commands.buildRunner.args, commands.buildRunnerExtraArgument],
    });
}

function _logger(newLog: string, showLogsWhenFinish: boolean = true, outputChannel: vscode.OutputChannel) {
    if (!showLogsWhenFinish) {
        outputChannel.appendLine(newLog);
    }

    return newLog + "\n";
}

function _logFinished(acc: string, showLogsWhenFinish: boolean, output: vscode.OutputChannel) {
    if (showLogsWhenFinish) {
        output.show();
        output.append("\n\n--------------------------\n" + acc);
    }
}

async function _runCommand(uri: vscode.Uri, command: any, showLogsWhenFinish: boolean = false, outputChannel?: vscode.OutputChannel) {
    let folder: String = getFinalPath(uri.path);
    let acc: string = "";

    let output = outputChannel ?? vscode.window.createOutputChannel(`${packageAlias}: ${command.channelTitle}`);
    output.show();

    acc += _logger(command.firstActionLog(folder), showLogsWhenFinish, output);

    const isFlutterProject = await containsPubspec(uri);

    if (!isFlutterProject) {
        acc += _logger(command.invalidFolderLog(folder), showLogsWhenFinish, output);
        _logFinished(acc, showLogsWhenFinish, output);

        return;
    }

    const opts: vscode.ProgressOptions = {
        location: vscode.ProgressLocation.Notification,
        title: command.firstActionLog(folder),
    };

    await vscode.window.withProgress(opts, async (_, __) => {
        console.log(`Running ${command.command} (${command.args})`);

        return new Promise<void>((resolve) => {

            const child = cp.spawn(
                command.command,
                command.args,
                {
                    cwd: uri.fsPath,
                    shell: isWindows,
                    detached: !isWindows,
                },
            );

            child.stderr.on('data', (error) => {
                acc += _logger(error.toString(), showLogsWhenFinish, output);
                _logFinished(acc, showLogsWhenFinish, output);

                resolve();
            });

            child.stdout.on('data', (data) => {
                let resultList = data.toString().split('\n');

                for (let resultItem of resultList) {
                    if (resultItem.length === 0) {
                        continue;
                    }
                    acc += _logger(resultItem, showLogsWhenFinish, output);
                };
            });

            child.on('close', async (code) => {
                if (code !== 0) {
                    acc += _logger(command.errorMessage, showLogsWhenFinish, output);
                } else {
                    acc += _logger(command.successMessage, showLogsWhenFinish, output);
                }

                _logFinished(acc, showLogsWhenFinish, output);

                resolve();
            });
        });
    });

}


export function deactivate() { }
