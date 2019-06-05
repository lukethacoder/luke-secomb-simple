---
layout: word_repo
title: 'VS Code Workspaces'
slug: 'vs-code-workspaces'
tags: ['vscode', 'code editor', 'workspaces', 'config']
category: 'word_repo'
order: 1
image: ''
gallery: [
  './2019-06-03-test-01.jpg'
]
date: '2019-06-03'
published: true
---

## Up your VS Code Game with Workspace Settings

#### What are Workspaces

VS Code's Workspaces allow users to customise both the UI and functionality of the IDE at a project level. Workspaces settings override `User Settings` and are useful for sharing project settings with other devs and allow for project specific functionality and customisations.

To open Workspace Settings use the shortcut `Ctrl+,`. You can either edit the settings using the UI on this view or click the `{ }` in the top right corner to edit the `JSON` file.

#### What I use Workspaces for (atm)

- Adjusting `titleBar` colors to differentiate between multiple projects.
- `search.exclude` to hide `dist` / `plugins` / `vendor` folders from search results.
- Exportable config allows sharing with co-workers on a per project basis.
- Multiple folder paths on one project

```json
...
  "folders": [
    {
      "path": "C:\\laragon\\www\\backend_server"
    },
    {
      "path": "C:\\Github\\front_end_ui"
    }
  ],
...
```

#### My Workspace Starter Settings

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
      "titleBar.inactiveForeground": "#FFC87F"
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

#### References

[User and Workspace Settings](!https://code.visualstudio.com/docs/getstarted/settings)
