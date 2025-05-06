---
title: Up Your VS Code Game with Workspaces
slug: up-your-vs-code-game-with-workspaces
date: 2019-06-07
description: VS Code's Workspaces allow you to customise both the UI and functionality of the IDE at a project level.
tags: ['vscode', 'config']
dev_to_id: '118546'
dev_url: '/up-your-vs-code-game-with-workspaces-4fp5'
---

VS Code's Workspaces allow you to customise both the UI and functionality of the IDE at a project level. Workspaces settings override `User Settings` and are useful for sharing project settings with other devs and allow for project specific functionality and customisation.

To open Workspace Settings use the shortcut <kbd>Ctrl</kbd> + <kbd>,</kbd>. You can either edit the settings using the UI on this view or click the `{ }` in the top right corner to edit the `JSON` file.

### What are they good for?

- Adjusting `titleBar` colors to differentiate between multiple projects.
- `search.exclude` to hide `dist` / `plugins` / `vendor` / `node_modules` folders from search results.
- Exportable config allows sharing with co-workers on a per project basis.
- Multiple folder paths on one project (handy if frontend and backend live in separate repositories)

```json
{
  "folders": [
    {
      "path": "C:\\laragon\\www\\backend_server"
    },
    {
      "path": "C:\\Github\\front_end_ui"
    }
  ]
}
```

### My Workspace Starter Settings

This is what I copy in to when I spool up a new project as a base - <a href="https://gist.github.com/lukethacoder/eecfc34c9c2bc63e87947d55d5b8b786" target="_blank">Gist</a>

```json
{
  "folders": [
    {
      "path": "C:\\Github\\PROJECT_NAME"
    }
  ],
  "settings": {
    "workbench.colorCustomizations": {
      "titleBar.activeBackground": "#141414",
      "titleBar.activeForeground": "#FFC87F",
      "titleBar.inactiveBackground": "#696969",
      "titleBar.inactiveForeground": "#FFC87F",
      "sash.hoverBorder": "#FFC87F"
    },
    "search.exclude": {
      ".cache": true,
      ".vscode": true,
      "node_modules": true
    },
    "window.title": "${rootName}",
    "editor.cursorSmoothCaretAnimation": true
  }
}
```

### So what do you use?

What other handy settings should other developers be using with their workspaces?

### References

[User and Workspace Settings](https://code.visualstudio.com/docs/getstarted/settings)