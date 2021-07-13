import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { isWindows } from "./utils";

export const runTests = {
    command: 'flutter', args: [
        'test', '--reporter=json'
    ],
};

export function killProcess(child: ChildProcessWithoutNullStreams) {
    if (isWindows) {
        spawn("cmd.exe", ["/c", "taskkill /F /PID " + child.pid], { shell: true });
    } else {
        spawn("sh", ["-c", "kill -INT -" + child.pid]);
    }
}