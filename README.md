# AutoVirtualEnv 🐍

Automatically create and activate Python virtual environments in your VS Code workspace.

## Features

- ✅ Detects `.venv` in the root folder
- 🧪 If missing, creates it using `python -m venv .venv`
- ⚡ Activates the virtual environment in terminal
- 🔄 Works on Windows, macOS, and Linux

## Installation

### Option 1: From VS Code

1. Press `Ctrl+Shift+P` → Extensions: Install from VSIX
2. Choose the downloaded `.vsix` file

### Option 2: From Terminal

```bash
code --install-extension autovirtualenv-0.0.1.vsix
