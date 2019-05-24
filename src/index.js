"use strict";
// Enable console log statements in this file
/*eslint no-console:0*/
const packageJson = require("../package.json");

// Verbose statement of service starting
const { name, version } = packageJson;
console.log(`--- ${name} v${version} ---`);

// Unhandled error logging
process.on("uncaughtException", err => {
  console.log("Unhandled Exception", err);
  process.exit(1);
});
process.on("unhandledRejection", err => {
  console.error("Unhandled Rejection", err);
  process.exit(1);
});
