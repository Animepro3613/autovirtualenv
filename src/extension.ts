import * as vscode from 'vscode';
import { execSync } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
  const workspace = vscode.workspace.workspaceFolders?.[0];
  if (!workspace) {
    vscode.window.showWarningMessage("No workspace folder open.");
    return;
  }

  const rootPath = workspace.uri.fsPath;
  const venvPath = path.join(rootPath, '.venv');
  const pythonCommand = process.platform === 'win32' ? '.venv\\Scripts\\activate' : 'source .venv/bin/activate';

  // Step 1: Check for existing .venv
  if (!fs.existsSync(venvPath)) {
    vscode.window.showInformationMessage("Creating Python virtual environment...");
    try {
      execSync('python -m venv .venv', { cwd: rootPath });
    } catch (error: any) {
      vscode.window.showErrorMessage("Failed to create virtual environment: " + error.message);
      return;
    }
  }

  // Step 2: Activate virtual environment in terminal
  const terminal = vscode.window.createTerminal("AutoVirtualEnv");
  terminal.sendText(pythonCommand);
  terminal.show();

  context.subscriptions.push(terminal);

  // Step 3 (Optional): On exit clean-up
  vscode.window.onDidCloseTerminal((term) => {
    if (term.name === "AutoVirtualEnv") {
      console.log("Virtual environment terminal closed.");
    }
  });
}

export function deactivate() {
  // Auto-closes with VS Code
}
