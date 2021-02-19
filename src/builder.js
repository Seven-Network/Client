const fs = require('fs-extra');
const readDir = require('recursive-readdir');
const path = require('path');

async function clearPublicFolder() {
  console.log('Clearing public folder');
  const folder = path.join(__dirname, 'public');
  return new Promise((resolve, reject) => {
    fs.rmdir(folder, { recursive: true }, function (err) {
      if (err) throw err;
      console.log('Cleared public folder');
      resolve();
    });
  });
}

async function copySource() {
  console.log('Copying source files');

  return new Promise((resolve, reject) => {
    const source = path.join(__dirname, 'source');
    const output = path.join(__dirname, 'public');

    fs.copy(source, output, { overwrite: true }, function (err) {
      if (err) throw err;
      console.log('Copied source files');
      resolve();
    });
  });
}

async function performOverwrites() {
  console.log('Performing overwrites');

  return new Promise((resolve, reject) => {
    const source = path.join(__dirname, 'mods', 'overwrites');
    const output = path.join(__dirname, 'public');

    fs.copy(source, output, { overwrite: true }, function (err) {
      if (err) throw err;
      console.log('Performed overwrites');
      resolve();
    });
  });
}

async function moveClientJS() {
  console.log('Building client JS');

  return new Promise((resolve, reject) => {
    const source = path.join(__dirname, 'mods', 'client.js');
    const output = path.join(__dirname, 'public', 'client.js');

    fs.copyFile(source, output, fs.constants.COPYFILE_FICLONE, function (err) {
      if (err) throw err;
      console.log('Built client JS');
      resolve();
    });
  });
}

async function moveClientSource() {
  console.log('Building client source');

  return new Promise((resolve, reject) => {
    const source = path.join(__dirname, 'mods', 'client-src');
    const output = path.join(__dirname, 'public', 'client-src');

    fs.copy(source, output, { overwrite: true }, function (err) {
      if (err) throw err;
      console.log('Built client source');
      resolve();
    });
  });
}

async function buildProcess() {
  console.log('Starting build process');
  await clearPublicFolder();
  await copySource();
  await performOverwrites();
  await moveClientJS();
  await moveClientSource();
  console.log('Build process complete');
}

buildProcess();
