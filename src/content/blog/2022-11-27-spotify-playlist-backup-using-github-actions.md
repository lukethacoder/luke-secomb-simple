---
title: Spotify Playlist Backup using Github Actions
slug: spotify-playlist-backup-using-github-actions
description: Platforms come and go, and Spotify most likely wont be around forever. What would you do if you woke up tomorrow and Spotify was gone?
date: 2022-11-27
color: '#1db954'
tags: ['spotify', 'python', 'github actions']
---

Platforms come and go, and Spotify most likely wont be around forever. What would you do if you woke up tomorrow and Spotify was gone. I know I wouldn't be too happy, after spending countless hours carefully curating well over 200 playlists.

So, to save your playlists from being erased from the internet forever, lets create a small python script to back them up. This post outlines the steps to configue and a basic walkthrough of my [spotify-playlist-backup](https://github.com/lukethacoder/spotify-playlist-backup) project.

[![spotify-playlist-backup project banner](https://github.com/lukethacoder/spotify-playlist-backup/raw/main/docs/banner.jpg)](https://github.com/lukethacoder/spotify-playlist-backup)

## Spotify Developer Application

Before we can jump into the code we need to setup our own [Spotify Developer Application](https://developer.spotify.com/dashboard/applications). This will require you to have a Spotify account (a free account should work). Once logged in, create a new application and save the `CLIENT_ID` and `CLIENT_SECRET` for later. Make sure you set `http://localhost:3000/callback` as a return url for your application.

![spotify dashboard application page](https://github.com/lukethacoder/spotify-playlist-backup/raw/main/docs/spotify-developer-app-dashboard.jpg)

## Into the code

Clone the [spotify-playlist-backup](https://github.com/lukethacoder/spotify-playlist-backup) repo and create a new `.env` file. Copy and paste in the following code snippet and replace the values with your configuration.

```
# .env file
# Values from your Spotify Developer Application
SPOTIFY_CLIENT_ID=laboriselitutenimdoculpa
SPOTIFY_CLIENT_SECRET=laboriselitutenimdoculpa

# Your Spotify Username
SPOTIFY_USERNAME=12345678910

# Your Spotify Password
SPOTIFY_PASSWORD=abcdefghijklmnopqrstuvwxyz

# Comma separated list of usernames of playlist authors.
# This allows you to back up other peoples playlists (that you follow) if you want.
# if left blank, all of your followed/created playlists will be backed up.
SPOTIFY_OWNER_IDS=snoopdogg,drdre,spotify
```

## Run the script

Once you have setup the `.env` file, you're ready to run the script.

```shell
python script.py
```

> This assumes you already have python installed.

Yes, it is that easy. After running the above script you will have a local copy of all your playlist data in beautiful `json` format.

## Github Action setup

Before your Github Action will run successfully, you must setup the above `.env` variables correctly within the repo.

> [!warning]
> Make sure your fork is a private repository

![Github actions dashboard screenshot](https://github.com/lukethacoder/spotify-playlist-backup/raw/main/docs/github-actions-secrets-setup.jpg)

## Cron Job

Lets go one step further and set our Github Action to run once a week. By default, the CRON Job Github Action is disabled. To enable this within your repo, open the `.github/workflows/python-app.yml` file and uncomment the schedule code block.

```yaml
on:
  schedule:
    # scheduled to run each week at 3am on a Tuesday
    - cron: '0 3 * * 2'
  workflow_dispatch:
    inputs:
      logLevel:
        description: 'Log level'
        required: true
        default: 'warning'
        type: choice
        options:
          - info
          - warning
          - debug
```

> You can use the <a href='https://crontab.guru/'>crontab</a> tool to calculate when and how often you want to run the Github Action.