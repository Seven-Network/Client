const fs = require("fs");
const path = require("path");
const axios = require("axios");
const objectScan = require("object-scan");
const loadashGet = require("lodash.get");
const { clear } = require("console");
const { platform } = require("os");

const HOST = "https://venge.io/";
const TARGET_DIR = path.join(__dirname, "source");

var config;
var urls = [];
var reqFiles = [
  "__modules__.js",
  "__start__.js",
  "__loading__.js",
  "__settings__.js",
  "playcanvas-stable.min.js",
  "favicon-96x96.png",
  "styles.css",
  "index.html",
  "adblock.js",
  "provider.js",
];

async function clearSourceFolder() {
  console.log("Clearing source folder");
  return new Promise((resolve, reject) => {
    fs.rmdir(TARGET_DIR, { recursive: true }, function (err) {
      if (err) throw err;
      console.log("Cleared source folder");
      resolve();
    });
  });
}

async function downloadResource(resource, shouldRequire) {
  return new Promise(async (resolve, reject) => {
    console.log(`Downloading resource ${resource}`);

    const url = HOST + resource;
    const fileLoc = path.join(TARGET_DIR, decodeURI(resource));

    // Create sub-dirs
    var sep = "/";
    if (process.platform === "win32") sep = "\\";

    const fileLocArr = fileLoc.split(sep);
    fileLocArr.pop();
    const tempFileLoc = fileLocArr.join(sep);

    console.log(tempFileLoc);
    fs.mkdir(tempFileLoc, { recursive: true }, async function (err) {
      if (err) throw err;

      const writer = fs.createWriteStream(fileLoc);

      try {
        const response = await axios({
          url,
          method: "GET",
          responseType: "stream",
        });

        response.data.pipe(writer);

        writer.on("finish", () => {
          if (shouldRequire) {
            const file = require(path.join(TARGET_DIR, resource));
            resolve(file);
          } else {
            resolve();
          }
        });

        writer.on("error", reject);
      } catch (error) {
        console.log(error.message);
        resolve();
      }
    });
  });
}

function getResourceUrls() {
  console.log("Processing configuration object");
  return new Promise((resolve, reject) => {
    const keys = objectScan(["**.url"], { joined: true })(config);
    // Time to iterate over thousands of keys
    keys.forEach((key) => {
      urls.push(loadashGet(config, key));
    });
    resolve();
  });
}

async function downloadAllUrls() {
  console.log("Downloading all resources");
  var filesToDownload = urls.length;
  return new Promise(async (resolve, reject) => {
    for (var i = 0; i < filesToDownload; i++) {
      console.log(`Downloading file ${i + 1} of ${filesToDownload}`);
      await downloadResource(urls[i], false);
    }
    resolve();
  });
}

async function downloadRequiredFiles() {
  console.log("Downloading all other required files");
  var filesToDownload = reqFiles.length;
  return new Promise(async (resolve, reject) => {
    for (var i = 0; i < filesToDownload; i++) {
      console.log(`Downloading file ${i + 1} of ${filesToDownload}`);
      await downloadResource(reqFiles[i], false);
    }
    resolve();
  });
}

async function getConfig() {
  console.log("Retrieving game configuration JSON file");
  config = await downloadResource("config.json", true);
}

async function getAllResources() {
  console.log("Starting source files update process");
  await clearSourceFolder();
  await getConfig();
  await getResourceUrls();
  await downloadAllUrls();
  await downloadRequiredFiles();
  console.log("Source files update process complete");
}

getAllResources();
