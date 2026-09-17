# Disable Virtual Environment Terminal Auto-Activation

## Summary

Disabled automatic Python virtual environment activation when a new VS Code terminal is opened.

## Cause

The installed Microsoft Python Environments extension defaults `python-envs.terminal.autoActivationType` to `command`. When `.venv` is selected for the workspace, the extension sends the following PowerShell activation sequence to every new terminal:

```powershell
(Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned) ; (& .venv\Scripts\Activate.ps1)
```

## Changes

- Updated `C:\Users\Lenovo\AppData\Roaming\Code\User\settings.json`.
- Added `"python-envs.terminal.autoActivationType": "off"`.
- Kept the project's `.venv` directory unchanged so it can still be activated manually.

## Manual Activation

```powershell
& .\.venv\Scripts\Activate.ps1
```

Use `deactivate` to leave an environment that is already active.
