"use strict";
// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

const packageJson = require("../package.json");

const { name } = packageJson;

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", err => {
  throw err;
});

const { exec } = require("pkg");

// BUILD: Build an executable with pkg
let target;
if (process.env.PKG_TARGET) {
  // Run pkg with this target
  target = process.env.PKG_TARGET;
} else {
  switch (process.platform) {
    case "darwin": // mac
      target = "node10-macos-x64";
      break;
    case "win32": // windows
      target = "node10-win-x64";
      break;
    case "linux": // linux
      target = "node10-linux-x64";
      break;
    default:
      throw new Error("No target specified");
  }
}

exec([".", "--target", target, "--output", `./build/${name}`]);
