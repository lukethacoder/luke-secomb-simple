---
title: 'Salesforce Trekken: Salesforce CMS Migration Tool'
slug: salesforce-trekken-cms-migration-tool
date: 2023-01-13
color: '#c23a3a'
description: Exporing the new Salesforce CMS Migration Tool built with Tauri, React, TailwindCSS & Vite
tags: ['salesforce', 'tool']
---

![Salesforce Trekken: Banner](./banner.png)

The Salesforce CMS data migration experience is lacking. There is no bulk export, and there is no sorting/filtering of content and you are sent an email link instead of being able to directly download the zip file.

Salesforce Trekken aims to rethink the Salesforce CMS migration experience. Using modern web technologies and thoughtful a user experience, migrating Salesforce CMS data has never been easier.

## How does it work?

Salesforce Trekken allows users to authenticate using one of two methods:

- The [sfdx cli](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_install_cli.htm)
- Access Token (and Instance URL)

The [Salesforce REST API](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_rest.htm) is used to fetch CMS Channels and the CMS Content after a specific channel has been selected.

## Features

- Multiple Authentication Methods (`sfdx cli` or ACCESS_TOKEN)
- Channel Selection: Choose the right CMS Channel to export data from
- Feature Rich Export Table
- Bundled Zip file export, ready to be imported into your target org.

## Walkthrough

#### Select Your Authentication Method

![Salesforce Trekken: Select Authentication Method Screenshot](./authentication.png)

#### Select An Org

![Salesforce Trekken: Select An Org Screenshot](./select-an-org.png)

#### Select A CMS Channel

![Salesforce Trekken: Select A CMS Channel Screenshot](./select-channel.png)

#### Search/Filter/Sort and Select Content

![Salesforce Trekken: Select CMS Content Screenshot](./select-cms-content.png)

#### Select An Output Folder

and whether to include images as part of the export.

![Salesforce Trekken: Select An Output Folder Screenshot](./select-output-folder.png)

#### Success

Either open the source folder or start over.

![Salesforce Trekken: Successful Export Screenshot](./success.png)

Your content is now ready to import into your target org.

> [!warning]
> If you are working with `cms_image`, make sure you import your images zip file first

## Closing

Now you've seen the powers of Salesforce Trekken and its improved user experience compared to the standard salesforce experience.

Want to find out more and/or download, checkout the [Salesforce Trekken site](https://trekken.lukesecomb.digital/)