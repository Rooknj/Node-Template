"use strict";

process.env.NODE_ENV = "development";
process.env.DEBUG = "";

const spawn = require("cross-spawn");
const spawnArgs = require("spawn-args");
const { delimiter } = require("path");
const pathResolve = require("path").resolve;

// Crash on unhandled rejections
process.on("unhandledRejection", err => {
  throw err;
});

// Get start arguments
let argv = process.argv.slice(2);
console.log(argv)

// Start Nodemon with cross-spawn
const args = spawnArgs("nodemon", { removequotes: "always" });
spawn.sync(args.shift(), args, {
  stdio: ["inherit", "inherit", "inherit"],
  cwd: process.cwd(),
  env: Object.assign({}, process.env, {
    PATH:
      process.env.PATH +
      delimiter +
      pathResolve(process.cwd(), "node_modules", ".bin")
  })
});
