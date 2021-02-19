const clientNetworking = require('./client-src/networking');
const userInterface = require('./client-src/ui');
const userExperience = require('./client-src/ux');
const gungameWeapons = require('./client-src/gg-weapons');

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
  };

  global.mapInit = () => {
    clientNetworking.modifyRoomManagerLogic();
    gungameWeapons.addWeaponsToMainMenuScene();
    userInterface.modifyMenuUI();
    userInterface.modifyInGameOverlay();
    userInterface.disableResultScreenMapSelection();
  };

  global.startInit = () => {
    gungameWeapons.addWeaponsToMainMenuSelector();
    clientNetworking.modifyRoomProperties();
  };
});
