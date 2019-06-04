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

This all stemmed from a personal issue I came across. Having two VS Code projects open at a time and not being able to easily distinguish between the two. In comes VS Code Workspaces.

#### What are Workspaces

VS Code's Workspaces allow users to customise both the UI and functionality of the IDE at a project level. Workspaces settings override `User Settings`. Workspaces are useful for sharing project settings with other devs and allow for project specific functionality and customisations.

#### How to find Workspace Settings

To open Workspace Settings use the shortcut `Ctrl+,`

You can either edit the settings using the UI on this view or click the `{ }` in the top right corner to edit the `JSON` file.

#### What I use Workspaces for (atm)

One of the best uses of Workspaces is the ability to adjust the `titleBar` colors. Adjusting these allows to easily see which project you are working in at a quick glance (provided your projects all have different titleBar colors).

Another great feature is the `search.exclude` setting. This blacklists folders from your searches. This is great for excluding plugins/dist/node_modules/cache folders.

#### Other Benefits of Workspaces

A great feature of Workspaces is that I can keep my Workspace config files all in one place, but have my various projects segregated anywhere on my hard drive. Moving from a Wordpress site (having to be placed in a certain place for my local server) to a simple GatsbyJS site (can be placed anywhere) is super easy. I don't need to remember exactly where I saved my projects as I can open them from the workspace configs.

Some projects may require you to have two separate folders. Maybe you have a backend server in one directory and your front end UI in another. Workspaces allows you to dual wield (or triple, quadruple etc.) folders.

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

#### My Workspace Starter

This is what I copy in to every project as a base for my Workspace Settings - <a href="https://gist.github.com/lukethacoder/eecfc34c9c2bc63e87947d55d5b8b786" target="_blank">Gist</a>

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
