---
title: 'SFDX: How to setup a Scratch Org'
slug: sfdx-how-to-setup-a-scratch-org
date: 2019-12-09
editedDate: 2023-04-12
color: '#8e1b0b'
description: How the heck do I set up a scratch org using sfdx? Well, you're in the right place
tags: ['salesforce', 'javascript']
---

How the heck do I set up a scratch org using sfdx? Well, you're in the right place.

Firstly, you will need to have SFDX ([Salesforce CLI](https://developer.salesforce.com/tools/sfdxcli)) installed and VS Code. You will also need your own Salesforce DevHub instance setup (need a hand with setting up your dev hub? check out this [trailhead unit](https://trailhead.salesforce.com/en/content/learn/modules/sfdx_app_dev/sfdx_app_dev_setup_dx).

## Create a Salesforce DX Project

The second step is to create a (SF)DX project.

```shell
sf project generate -n YOUR_PROJECT_NAME
```
<small>Replaces the deprecated `sfdx force:project:create` command.</small>

## Auth your DevHub

Next, we need to connect your DevHub with your new project

```shell
sf org login web -d -r https://login.salesforce.com -a ALIAS_FOR_YOUR_DEV_HUB 
```
<small>Replaces the deprecated `sfdx force:auth:web:login` command.</small>

- `-d` sets this as the default Dev Hub.
- `-r` sets the login URL for the org.
- `-a` sets this alias for the org.

> If you have already auth'd, set your default username using `sf config set defaultdevhubusername=lukesfakeemail@force.com`

## Login To Sandboxes

In addition to DebHubs, we can also connect to standard salesforce Sandboxes. This can be handy when it comes to pulling components into your scratch org

```shell
sf org login web -r https://test.salesforce.com -a ALIAS_FOR_YOUR_SANDBOX
```
<small>Replaces the deprecated `sfdx force:auth:web:login` command.</small>

> Remember, don't use the `-d` flag. If you do, the CLI thinks the org is your Dev Hub, and then you'll see an error when you try to create a scratch org.

If ~~`force:auth:web:login`~~ `sf org login web` isnt working, use ~~`sfdx force:auth:device:login`~~ `sf org login device` instead.

## Rename (add) Alias

```shell
sf alias set NEW_ALIAS_FOR_YOUR_SANDBOX=current@sandbox.user.com
sf alias set OLD_ALIAS_FOR_YOUR_SANDBOX=
```
<small>Replaces the deprecated `sfdx force:alias:set` command.</small>

## Logout of Sandboxes

logout/remove the sandbox from the `sfdx force:org:list`

```shell
sf org logout -o ALIAS_FOR_YOUR_SANDBOX
```
<small>Replaces the deprecated `sfdx force:auth:logout` command.</small>

## Create your scratch org

Now for the fun part, creating your scratch org.

> if you want to set the scratch org name, or adjust other config options, edit the `./config/project-scratch-def.json` file before progressing

```shell
sf org create scratch -v ALIAS_OF_YOUR_DEBHUB -f config/project-scratch-def.json -a ALIAS_FOR_SCRATCH_ORG -y 30 -w 10
```
<small>Replaces the deprecated `sfdx force:org:create` command.</small>

- `-v` optional param to choose your DevHub (not needed if you have a default DevHub set)
- `-s` sets this as the default sratch org
- `-f` sets the location for the config file (to build the org)
- `-a` sets the alias for the scratch org
- `-y` sets the expiry to 30 days
- `-w` sets the wait time to 10mins
- `-e` edition to use (developer, enterprise, group, professional, partner-developer, partner-enterprise, partner-group, partner-professional)


### View Scratch Org Config/Details

```shell
sf org display -o SCRATCH_ORG_ALIAS
```
<small>Replaces the deprecated `sfdx force:org:display` command.</small>

### Generate Password Scratch Org

```shell
sf force user password generate -u SCRATCH_ORG_ALIAS
```
<small>Replaces the deprecated `sfdx force:user:password:generate` command.</small>

### Delete Scratch Org

```shell
sf org delete scratch -o SCRATCH_ORG_ALIAS
```
<small>Replaces the deprecated `sfdx force:org:delete` command.</small>

### Assign Permission Set

Before you can start pushing code, we have to set up some permission sets to allow us.

```shell
sf org assign permset -n NAME_OF_PERMISSION_SET
```
<small>Replaces the deprecated `sfdx force:user:permset:assign` command.</small>

> most likely named `SalesConsoleUser` on default scratch orgs

### Deploy code back to DevHub

Deploy all of type

```shell
sf deploy metadata -m ApexPage, ApexClasses, LightningComponentBundle -o ALIAS_FOR_YOUR_DEV_HUB
```
<small>Replaces the deprecated `sfdx force:source:deploy` command.</small>

Deploy specific component by path

```shell
sf deploy metadata -p force-app/main/default/lwc/SINGLE_COMPONENT_NAME -o ALIAS_FOR_YOUR_DEV_HUB
```
<small>Replaces the deprecated `sfdx force:source:deploy` command.</small>


## Deploy code to a Sandbox

> NOTE: These are the same deploy commands as above but with the extra `project` keyword in the command.

Deploy all of type

```shell
sf project deploy metadata -m ApexPage, ApexClasses, LightningComponentBundle -o ALIAS_FOR_YOUR_DEV_HUB
```
<small>Replaces the deprecated `sfdx force:source:deploy` command.</small>

Deploy specific component by path

```shell
sf project deploy metadata -p force-app/main/default/lwc/SINGLE_COMPONENT_NAME -o ALIAS_FOR_YOUR_DEV_HUB
```
<small>Replaces the deprecated `sfdx force:source:deploy` command.</small>


## Retrieve / Fetch / Pull Data

Retrieve all ApexClasses, ApexPages and LWC's

```shell
sf project retrieve metadata -m ApexClass, ApexPage, LightningComponentBundle -o ALIAS_FOR_YOUR_DEV_HUB
```
<small>Replaces the deprecated `sfdx force:source:retrieve` command.</small>

[Metadata Ref](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_types_list.htm)


## Create Data

Specify the Object type and the fields 'n values

```shell
sf data create record -s Account -v "Name='Marriott Marquis' BillingStreet='780 Mission St' BillingCity='San Francisco' BillingState='CA' BillingPostalCode='94103' Phone='(415) 896-1600' Website='www.marriott.com'" -o SCRATCH_ORG_ALIAS
```
<small>Replaces the deprecated `sfdx force:data:record:create` command.</small>

#### Export Data

Using SQL to JSON data

```shell
sf data export tree -q "SELECT Name, BillingStreet, BillingCity, BillingState, BillingPostalCode, Phone, Website FROM Account WHERE BillingStreet != NULL AND BillingCity != NULL and BillingState != NULL" -d ./data -o SCRATCH_ORG_ALIAS
```
<small>Replaces the deprecated `sfdx force:data:tree:export` command.</small>

#### Import Data

```shell
sf data import tree -f data/Account.json
```
<small>Replaces the deprecated `sfdx force:data:tree:import` command.</small>

## Create an Apex Class

```shell
sf apex generate class -n YourClassName -d force-app/main/default/classes
```
<small>Replaces the deprecated `sfdx force:apex:class:create` command.</small>

## `config/project-scratch-def.json`

Disable Lightning Experience caching

```json
"settings": {
  "orgPreferenceSettings": {
    "s1EncryptedStoragePref2": false
  }
}
```

> Disabling secure and persistent browser caching has a significant negative performance impact on Lightning Experience. Always enable the setting in production orgs.

## Useful Links

- [Salesforce Metadata Ref](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_types_list.htm)
- [Salesforce CLI (`sf`/`sfdx`)](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_top.htm)