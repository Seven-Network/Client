# Seven Network Client

Seven Network Client is a Private Venge.io Client that connects to the Seven Network Private Server

_Note: SevenNetwork is a temporary name and can change any time_

## Project Structure

`src` folder:
Contains source code and assets for the client.

`src/mods` folder:
Contains client modifications. More info below.

`src/public` folder:
Contains the files that will be loaded by the Chromium renderer. More info below.

`src/source` folder:
Contains all the original Venge assets and scripts. More info below.

## Developer Setup

1. Clone the repository on to your machine:
   `git clone git@github.com:Seven-Network/Client.git`

2. Install dependencies:
   `npm install` or `yarn` (Run these in the project root)

3. Update source folder:
   `npm run update-source` or `yarn update-source`

4. Build client public files:
   `npm run build-public` or `yarn build-public`

5. Start app in development mode:
   `npm run serve` or `yarn serve`

6. Package the app for distribution:

- Windows: `npm run build-win` or `yarn build-win`
- macOS: `npm run build-mac` or `yarn build-mac` (Can only be run on macOS)
- Linux: `npm run build-linux` or `yarn build-linux`
- All: `npm run build-all` or `yarn build-all` (Can only be fully run on macOS)

## Project Overview

### Scripts

The `src/main.js` script is the main process script and the entry point of the Electron app. It is responsible for creating the browser window and performing low-level operations through the Node API.

The `src/downloader.js` script is responsible for retrieving all the game assets/scripts and writing them to the `src/source` folder.

The `src/builder.js` script is responsible for performing all build operations and writing to the `src/public` folder.

### Modifying assets manually

_To be written_

### Modifying assets programatically

_To be written_

### Modifying game logic

_To be written_
