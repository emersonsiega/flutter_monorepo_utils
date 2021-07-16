# FMU: Flutter Monorepo Utils

VSCode extension with utilities to work with Flutter monorepo projects.  


## [Get it on the Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=emersonsiega.flutter-monorepo-utils)


## Features

### Test runner

Runs tests on specific projects by the context menu.  
The selected folder must be a testable Flutter project (with a test folder inside).

![](https://media.giphy.com/media/E1RARd0fii6Zk2iZ4R/giphy.gif)

When some test fails, you'll get the complete log with the link to the lines that have failed.

![](https://i.imgur.com/7hf0EFM.png)

### Test runner in all projects

Runs tests of all projects present in the workspace.  
This option is available **only** for the root folder context menu and merges the output of all tests in the same place.  

### Get/Clean/build_runner

Runs get, clean and build_runner actions in specific projects by the context menu.

![](https://i.imgur.com/TVutVm6.png)

### Get/Clean/build_runner in all projects

Runs get, clean and build_runner actions in all projects in the workspace.  
This option is available **only** for the root folder context menu and merges the execution output in the same place.  


### Create or open test file

By selecting a dart file, there's a context menu option to create a corresponding test file, respecting to the same folder hierarchy.  

If test file already exists, then it's just opened.  

![](https://media.giphy.com/media/TNfsqlSSbxyulvEzs4/giphy.gif)


<!-- TODO:
 - [X] Run ALL tests (context menu)
 - [X] Run ALL get/clean (context menu)
 - [X] Create/open test file in same hierarchy of selected file
 - [ ] Run tests when project changes
 - [ ] Dream: Load all tests (grouped by package) in the testing tab on vscode startup -->
