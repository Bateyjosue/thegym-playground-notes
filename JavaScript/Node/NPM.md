NPM, which stands for Node Package Manager, is a package manager for the JavaScript programming language and is the default package manager for the JavaScript runtime environment Node.js. It consists of a command-line client, also called npm, and an online database of public and paid-for private packages, called the npm registry.

Here's how you can use NPM in Node.js:

1. **Installing NPM**: If you have Node.js installed, you likely have NPM installed as well. You can check by running `npm -v` in your terminal. If it's not installed, you can download and install Node.js from the official website, which includes NPM.

2. **Initializing a Project**: To start using NPM in a project, navigate to your project directory in the terminal and run `npm init`. This will create a `package.json` file, which is used to manage the project's dependencies and scripts.

3. **Installing Packages**: To install a package, you can use the `npm install` command followed by the package name. For example, to install the popular Express.js framework, you would run `npm install express`. This will download the package and add it to your `node_modules` directory.

   ```sh
   npm install express
   ```

4. **Using Packages**: After installing a package, you can require it in your Node.js application using the `require` function. For example:

   ```javascript
   const express = require('express');
   const app = express();
   ```

5. **Updating Packages**: To update a package to its latest version, you can use `npm update <package-name>`. To update all packages listed in your `package.json` file, you can simply run `npm update`.

6. **Uninstalling Packages**: To uninstall a package, you can use `npm uninstall <package-name>`.

7. **Saving Packages**: By default, when you install a package using `npm install <package-name>`, it will be added to the `dependencies` section of your `package.json` file. If you want to install a package for development purposes only, you can use `npm install --save-dev <package-name>`, which will add it to the `devDependencies` section.

8. **Running Scripts**: You can define scripts in your `package.json` file that can be run with `npm run <script-name>`. This is useful for automating tasks like starting your application, running tests, or building your application for production.

9. **Publishing Packages**: If you've created a package that you want to share with others, you can publish it to the npm registry using `npm publish`.

10. **Searching for Packages**: You can search for packages on the npm registry by visiting the npm website or by using the command `npm search <keyword>`.

NPM is a powerful tool that simplifies the process of managing dependencies and scripts for your Node.js projects. It's an essential part of the Node.js ecosystem and is used by developers worldwide to share and reuse code.

### Installing Packages Globally
`nodemon` is a utility that monitors for any changes in your source code and automatically restarts your Node.js application. It's a tool that simplifies the development process by eliminating the need to manually stop and restart your server every time you make changes to your code.

Here's how you can use `nodemon` in your Node.js projects:

1. **Installing nodemon**: You can install `nodemon` globally on your system or locally in your project using npm. To install it globally, run:

   ```sh
   npm install -g nodemon
   ```

   To install it locally in your project, navigate to your project directory and run:

   ```sh
   npm install --save-dev nodemon
   ```

2. **Using nodemon**: After installing `nodemon`, you can use it to run your application instead of the regular `node` command. For example, if your main application file is `app.js`, you would start your application with:

   ```sh
   nodemon app.js
   ```

   If you installed `nodemon` locally, you can add a script to your `package.json` file to make it easier to start your application with `nodemon`:

   ```json
   "scripts": {
     "start": "nodemon app.js"
   }
   ```

   Then you can start your application with:

   ```sh
   npm start
   ```

3. **Ignoring Files**: By default, `nodemon` will restart your application whenever any file changes. However, you might want to ignore certain files or directories, such as those in the `node_modules` directory or any log files. You can configure `nodemon` to ignore files by creating a `.nodemonignore` file in your project root or by using the `-e` or `--ext` flag to specify file extensions to watch.

4. **Using nodemon with Express**: If you're using Express.js, you can start your server with `nodemon` to automatically restart it whenever you make changes to your server code. This is particularly useful during development.

5. **nodemon Configuration**: You can configure `nodemon` by creating a `nodemon.json` file in your project root. This file allows you to set various options, such as the files to watch, the delay before restarting, and the environment variables to use.

Here's an example of a `nodemon.json` configuration file:

```json
{
  "watch": ["src"],
  "ext": "js,json",
  "ignore": ["src/node_modules/*"],
  "delay": "2500"
}
```

In this configuration, `nodemon` will watch the `src` directory for changes to `.js` and `.json` files, ignore any changes in the `src/node_modules` directory, and wait  2.5 seconds before restarting the application after a change is detected.

`nodemon` is a valuable tool for Node.js developers, as it streamlines the development process and helps to ensure that your application is always running with the latest code changes.