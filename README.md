# Reforges App on the web yo.

##Setup
Before starting, make sure you have Node.js and NPM installed.

Once they are installed, navigate to this directory in Terminal, and do an 'npm install' command in order to install
all dev dependencies.

##Quick Start: Building & Running the Server
Running the command "npm run watch:all" in the root folder in the terminal will build, run a local server (url at localhost:3000), and continually watch for changes in the 'src' folder and minify them into the 'dist' folder and then update the build. If you want to take this to production on the web, simply copy index.html and the dist folder and upload to your site via FTP.

Installed as part of this package,is Browsersync which allows multiple devices viewing to update if the state of the app changes on one of them, saving time with cross-compatibility testing.

##Potentially Useful Details of the Build Process
There are several Node packages you installed with 'npm install' that are there streamline the development process. You can see the entire list in the package.json file. Here are a few of them:

The ESlint module (http://eslint.org) helps to "lint" the javascript files identifying syntactical errors and accidental globals.  Configuration of the rules can be found in the .eslintrc.js file.

"Node-sass" is a module for converting Sass or .scss code to CSS. This project uses .scss code in the /src folder, which is then built into CSS in the /dist folder. For the uninitiated, .scss files are just like CSS files except you can include things like variables which makes the entire styling process much easier.

"postcss-cli" and "autoprefixer" work in conjuction to transform the original .scss files, and "prefix" certain parts of the CSS automatically to ensure that even though different browsers that render styles differently, the site looks as you intended for all of them. (Well, except IE8. But if you're using that you have bigger problems.)

"Browser-sync" is detailed above in "Quick Start" and is awesome.

"On-change" watches for updated files in your folder and automatically tells the rest of this package to refresh the page on the server you're running.








##Troubleshooting
