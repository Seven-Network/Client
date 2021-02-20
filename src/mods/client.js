const clientNetworking = require('./client-src/networking');
const userInterface = require('./client-src/ui');
const userExperience = require('./client-src/ux');
const gungameWeapons = require('./client-src/gg-weapons');
const devTools = require('./client-src/dev');
const weaponPropertise = require('./client-src/weaponPropertise');

process.once('loaded', () => {
  console.log('Welcome to Seven Network');

  global.clientInit = () => {
    window._messagePack = MessagePack.initialize(0xfff);
    clientNetworking.modifyFetcher();
    clientNetworking.websocketProxy();
    userExperience.fixQuitLogic();
    userExperience.allowSoloCustom();
    userExperience.reduceJumpAnimIntensity();
    userExperience.removeReminder();
    gungameWeapons.modifyKeybinds();
    gungameWeapons.removeCircularWeaponSelector();
    gungameWeapons.weaponSelectionFix();
    devTools.initialize();
  };

  global.mapInit = () => {
    clientNetworking.modifyRoomManagerLogic();
    gungameWeapons.addWeaponsToMainMenuScene();
    userInterface.modifyMenuUI();
    userInterface.modifyInGameOverlay();
    weaponPropertise.weaponBalancing();
    userInterface.disableResultScreenMapSelection();
  };

  global.startInit = () => {
    gungameWeapons.addWeaponsToMainMenuSelector();
    clientNetworking.modifyRoomProperties();
  };
});
