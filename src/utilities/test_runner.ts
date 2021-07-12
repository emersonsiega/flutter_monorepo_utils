import * as vscode from 'vscode';
import * as cp from 'child_process';
import * as commands from '../flutter_commands';
import { packageAlias } from '../constants';

function getFinalPath(path: String, split: string = '/') {
    let file: any = path.split(split);
    file = file[file.length - 1];
    return file;
}

export async function runTests(uri: vscode.Uri) {
    let folder: String = getFinalPath(uri.path);

    const opts: vscode.ProgressOptions = {
        location: vscode.ProgressLocation.Notification,
        title: `Running ${folder} tests`,
        cancellable: true
    };

    let testsChannel = vscode.window.createOutputChannel(`${packageAlias}: Flutter Tests`);
    testsChannel.show();
    testsChannel.appendLine(`Running ${folder.toUpperCase()} tests...`);

    var cancelled = false;

    vscode.window.withProgress(opts, async (p, _token) => {
        return new Promise<void>((resolve, reject) => {
            const child = cp.spawn(
                commands.runTests.command,
                commands.runTests.args,
                { cwd: uri.path, detached: true },
            );

            _token.onCancellationRequested(() => {
                cancelled = true;
                cp.spawn("sh", ["-c", "kill -INT -" + child.pid]);

                testsChannel.appendLine("\n🚫 Test runner stopped by user!");
                testsChannel.show();
                reject();
            });

            p.report({ increment: 0 });

            child.stdout.addListener('error', (error) => {
                testsChannel.appendLine(error.toString());
                testsChannel.show();
            });

            child.stdout.addListener('data', (data) => {
                _processResult(data.toString(), testsChannel, p);
            });

            child.on('close', async (code) => {
                if (!cancelled) {
                    if (code !== 0) {
                        testsChannel.appendLine("🔥 Test runner failed!");
                        testsChannel.show();
                    } else {
                        testsChannel.appendLine("🎉 Test runner finished!");
                        testsChannel.show();
                    }
                }

                resolve();
            });



        });
    });

}

let resultMap: Map<string, any> = new Map([]);
let lastSuiteName = '';
let totalSuites = 0;
let groupMap: Map<string, any> = new Map([]);

async function _processResult(data: string, output: vscode.OutputChannel, p: vscode.Progress<any>) {

    await new Promise<void>((resolve) => {

        let resultList = data.split('\n');

        for (let resultItem of resultList) {
            if (resultItem.length === 0) {
                continue;
            }

            const result = JSON.parse(resultItem);

            let message = '';

            if (result.type === 'start') {
                message = `\nReading tests data...`;
            }

            if (result.type === 'allSuites') {
                console.log(`${result.count} suites found`);
                totalSuites = result.count;
            }

            if (result.type === 'group') {
                groupMap.set(result.group.id, { testCount: result.group.testCount, totalExecuted: 0 });
            }

            if (result.type === 'done') {
                message = `\n\n⏳ Test runner executed in ${_formatTime(result.time)}`;
            }

            if (result.type === 'print' && result.testID) {
                let test = resultMap.get(result.testID);

                if (test) {
                    let testWithMessage = { ...test, message: result.message };

                    resultMap.set(result.testID, testWithMessage);
                }
            }

            if (result.type === 'testStart') {
                if (result.test.name.indexOf('loading ') === -1) {
                    const newTest = {
                        name: getFinalPath(result.test.name),
                        suiteID: result.test.suiteID,
                        suiteName: getFinalPath(result.test.root_url ?? result.test.url),
                        groupID: result.test.groupIDs[0]
                    };

                    resultMap.set(result.test.id, newTest);
                }
            }

            if (result.type === 'testDone') {
                if (result.hidden !== true && result.skipped !== true) {
                    let test = resultMap.get(result.testID);

                    if (!test) {
                        output.appendLine(`Test ${result.testID} not found!!!`);
                        console.log(`Test ${result.testID} not found!!!`, result, resultMap);
                        return;
                    }

                    _incrementCounter(test.groupID, p);

                    if (test.suiteName !== lastSuiteName) {
                        lastSuiteName = test.suiteName;
                        output.appendLine(``);
                        output.appendLine(`📄 ${lastSuiteName}`);
                    }

                    let succeeded = result.result === 'success';

                    message = `    ${succeeded ? '✅' : '💥'} - ${test.name} (⏳ ${_formatTime(result.time)})`;

                    if (!succeeded && test.message) {
                        message += `\n\n    🕵🏻‍♂️ Error details:${test.message.split('\n').map((msg: string) => {
                            return `\n        ${msg}`;
                        })}\n`;
                    }

                    console.log(message);


                }
            }

            if (message.length > 0) {
                output.appendLine(message);
            }

        }


        resolve();
    });

}

function _incrementCounter(groupId: any, p: vscode.Progress<any>) {
    let group = groupMap.get(groupId);

    group = {
        ...group,
        totalExecuted: group.totalExecuted + 1,
    };

    groupMap.set(groupId, group);

    if (group.totalExecuted === group.testCount) {
        p.report({ increment: 100 / totalSuites });
    }
}

function _formatTime(time: number) {
    var newTime = time / 1000;

    if (newTime > 60.0) {
        let min = newTime / 60;
        return `${min.toFixed(0)}m ${(newTime - min).toFixed(2)}s`;
    } else {
        return `${newTime.toFixed(2)}s`;
    }
}


export function deactivate() { }
