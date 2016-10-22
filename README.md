# Reforges App on the web yo.

Before starting, make sure you have Node.js and NPM installed.

Once they are installed, navigate to this directory in Terminal, and do an 'npm install' command in order to install
all dev dependencies.

The command "npm run watch:all" will build, run a local server (url at localhost:3000), and continually watch for changes in the 'src' folder and minify them into the 'dist' folder. If you want to take this to production on the web, simply copy index.html and the dist folder and upload to your site via FTP.

With browsersync installed as part of this package, multiple devices viewing off your local server, will update if the state of the app changes on one of them, saving time with cross-compatibility testing. Refer to package.json if you only want to run specific commands.
