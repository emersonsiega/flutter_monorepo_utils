# FMU: Flutter Monorepo Utils

VSCode extension with utilities to work with Flutter monorepo projects.  


## Features

### Test runner

Runs tests on specific projects by the context menu.  
The selected folder must be a testable Flutter project (with a test folder inside).

![](https://media.giphy.com/media/E1RARd0fii6Zk2iZ4R/giphy.gif)

When some test fails, you'll get the complete log with the link to the lines that have failed.

![](https://p43.f3.n0.cdn.getcloudapp.com/items/jkuPjp8q/58180c7c-44ca-4621-905e-7d6fe040054c.jpg?source=viewer&v=2bfe43cad584feacf4e8bab42fecdc0a)

### Test runner in all projects

Runs tests of all projects present in the workspace.  
This option is available **only** for the root folder context menu and merges the output of all tests in the same place.  

### Get/Clean/build_runner

Runs get, clean and build_runner actions on specific projects by the context menu.

![](https://p43.f3.n0.cdn.getcloudapp.com/items/Z4uKBvA9/778be7d4-6ab0-4e92-8c78-6d6ad15dcccc.jpg?source=viewer&v=c1502ee65b53ed6f10d136f4a2624d88)

### Get/Clean/build_runner in all projects

Runs get, clean and build_runner actions on all projects in the workspace.  
This option is available **only** for the root folder context menu and merges the execution output in the same place.  


<!-- TODO:
 - [X] Run ALL tests (context menu)
 - [X] Run ALL get/clean (context menu)
 - [ ] Create/open test file in same hierarchy of selected file
 - [ ] Run tests when project changes
 - [ ] Dream: Load all tests (grouped by package) in the testing tab on vscode startup -->
