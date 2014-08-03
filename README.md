HotTowelTypescript
==================

HotTowel Typescript is a SPA template. This is an update to John Papas HotTowel updated and written in Typescript. Some minor ui-bugs are fixed and there are some changes to the project structure, mainly naming of controllers and directives. Using Web Essentials plugin for Visual Studio is highly recommended when using Typescript. You need to generate the .js files from TypeScript files before you run the project.

This is the nuget-package HotTowelTypescript

<h2>UI fixes:</h2>

- When going from small screen to large screen after selecting a menuitem the sidebar contained no menuitems

- When clicking on a menuitem in a small screen the menu now closes

<h3>Version 2.1:</h3>
* Removed .js files, use Web Essentials VS plugin to recreate them

* Fixed the startup spinner not showing

* Fixed an error with logFn, causing it to only log 'info' messages

<h3>Version 2:</h3>
* Changed naming of directives to be similar to their use: "cc-widget-close"

* Updated services, controllers and directives to comply with the new SideWaffle templates for Typescript

* Dependencies now sorted out and should fix the "Failed to add reference to 'System.Net.Http'..." error that happened for some users.
 
<h2>How to contribute:</h2>
Since this is a nuget package, this project will not run in visual studio since the dependencies are not loaded. 

You will find all the files in the Content folder.

Best way to contribute is to clone the project, make your changes and then do a pull request. 

If you want to test your changes or run the project with the latest changes from the repo then: 

Download nuget.exe (<a href="https://nuget.codeplex.com/releases">you can do that here</a>) to the root folder of the cloned project

Run 'nuget-pack' i a command line from the root folder. This will create a nuget package with the last changes in the repo. You can also use one of the nuget packages included in the repo, but just be aware that there might have been changes since the last package.

Then in Visual studio run the package you just created in package manager and the whole project will load with the latest changes and dependencies. You can then modify the files, run the project and test your changes.

Then reflect suggested changes in the cloned repo and make the pull request.
