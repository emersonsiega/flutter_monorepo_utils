import * as vscode from 'vscode';
import * as cp from 'child_process';
import * as commands from '../flutter_commands';
import { packageAlias } from '../constants';
import { isWindows, getFinalPath, containsPubspec } from '../utils';

export async function runPubGet(uri: vscode.Uri) {
    return await _runCommand(uri, commands.getPackages);
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


async function _runCommand(uri: vscode.Uri, command: any) {
    let folder: String = getFinalPath(uri.path);

    let testsChannel = vscode.window.createOutputChannel(`${packageAlias}: ${command.channelTitle}`);
    testsChannel.show();
    testsChannel.appendLine(command.firstActionLog(folder));

    const isFlutterProject = await containsPubspec(uri);

    if (!isFlutterProject) {
        testsChannel.appendLine(command.invalidFolderLog(folder));
        return;
    }

    const opts: vscode.ProgressOptions = {
        location: vscode.ProgressLocation.Notification,
        title: command.firstActionLog(folder),
    };

    vscode.window.withProgress(opts, async (_, __) => {
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
                testsChannel.appendLine(error.toString());
                testsChannel.show();

                resolve();
            });

            child.stdout.on('data', (data) => {
                _processResult(data.toString(), testsChannel);
            });

            child.on('close', async (code) => {
                if (code !== 0) {
                    testsChannel.appendLine(command.errorMessage);
                    testsChannel.show();
                } else {
                    testsChannel.appendLine(command.successMessage);
                    testsChannel.show();
                }

                resolve();
            });
        });
    });

}

async function _processResult(data: string, output: vscode.OutputChannel) {

    await new Promise<void>((resolve) => {

        let resultList = data.split('\n');

        for (let resultItem of resultList) {
            if (resultItem.length === 0) {
                continue;
            }

            output.appendLine(resultItem);
        }

        resolve();
    });

}

export function deactivate() { }
