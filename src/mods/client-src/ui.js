function modifyMenuUI() {
  const bannerEntity = pc.app.getEntityFromIndex(
    '2baa7f22-cb28-4cbb-a175-55b8d4385c6f'
  );

  var bloom = new pc.BloomEffect(pc.app.graphicsDevice);
  window.bloom = bloom;

  const menu = pc.app.getEntityFromIndex(
    'f476d893-1c86-419b-a3f6-7062a0928b7c'
  );

  menu.camera.postEffects.addEffect(bloom);
  bloom.bloomThreshold = 0.5;
  bloom.bloomIntensity = 0.5;

  const contentEntity = pc.app.getEntityFromIndex(
    '25c130ff-ea6b-4aa7-aaac-92668ab9d466'
  );

  bannerEntity.enabled = false; // Disable Ad banner
  contentEntity.setLocalPosition(0, -110, 0);
  contentEntity.element.margin = { w: 120, x: -460, y: -600, z: -460 };

  const socialLinks = pc.app.getEntityFromIndex(
    'cb6b5875-716b-41cf-b8b3-1366c9c0d388'
  );
  socialLinks.enabled = false;

  const questBar = pc.app.getEntityFromIndex(
    'c54764ff-a5d4-49d9-b7a6-24de6e3def41'
  );
  questBar.enabled = false;

  const shopSliderNotification = pc.app.getEntityFromIndex(
    '58aad250-a3ee-484c-a580-f6dfc9b5c8ad'
  );
  shopSliderNotification.enabled = false;

  const logoElements = pc.app.getEntityFromIndex(
    'f4639fce-ab03-4766-847a-3beee201bc2a'
  );

  logoElements.element.width = 300;
  logoElements.element.height = 200;

  const logoRectangle = pc.app.getEntityFromIndex(
    '78923add-f2a6-4bd9-88fc-253ffcea3ab3'
  );
  logoRectangle.element.margin = {
    x: 215,
    y: -20,
    z: -210,
    w: -25,
  };

  const headerBackground = pc.app.getEntityFromIndex(
    'a8864f8b-ae61-470d-99b2-91800ab9c798'
  );

  headerBackground.element.color = {
    r: 0,
    g: 0,
    b: 0.3,
    a: 1,
  };
  headerBackground.element.opacity = 0.3;

  const weaponBackground = pc.app.getEntityFromIndex(
    'a5831d25-af1f-43ad-bcff-962c437cb583'
  );

  weaponBackground.element.opacity = 0.3;
  weaponBackground.element.color = {
    r: 0,
    g: 0,
    b: 0.3,
    a: 0.3,
  };

  const heroBackground = pc.app.getEntityFromIndex(
    '2a54bcff-f343-4256-9ca9-3f8c5d2e1ad8'
  );

  heroBackground.element.opacity = 0.3;
  heroBackground.element.color = {
    r: 0,
    g: 0,
    b: 0.3,
    a: 0.3,
  };

  const quickMatchBackground = pc.app.getEntityFromIndex(
    'dfbe908b-c82f-4f1b-a13f-e5ec56619b03'
  );

  quickMatchBackground.element.opacity = 0.3;
  quickMatchBackground.element.color = {
    r: 0,
    g: 0,
    b: 0.3,
    a: 0.3,
  };

  const changeLogButton = pc.app.getEntityFromIndex(
    '019bfc08-7caa-49fe-a4b1-681dc7060a80'
  );
  changeLogButton.enabled = false;

  const tosButton = pc.app.getEntityFromIndex(
    '72fadb2f-bcce-4848-9c17-f66bfce97edf'
  );

  tosButton.enabled = false;

  const betaText = pc.app.getEntityFromIndex(
    'e0850441-d29d-4e62-ae27-b1853130faec'
  );

  betaText.element.text = 'Closed Beta'; //Should be removed later
  betaText.element.color = {
    r: 1,
    g: 1,
    b: 1,
    a: 1,
  };

  const versionText = pc.app.getEntityFromIndex(
    '9b3f317d-b27f-4819-8303-5c0bab068d86'
  );

  versionText.element.color = {
    r: 0,
    g: 1,
    b: 1,
    a: 1,
  };

  const createAccountPage = pc.app.getEntityFromIndex(
    '92abc8d7-6585-44de-aff6-604ccdbe1524'
  );
  createAccountPage.element.opacity = 0.3;
  createAccountPage.element.color = {
    r: 0,
    g: 0,
    b: 0.3,
    a: 0.3,
  };

  const pageProfile = pc.app.getEntityFromIndex(
    '4fbdbd0e-b3f1-4561-bb71-a8038145c6e6'
  );
  pageProfile.element.opacity = 0.3;
  pageProfile.element.color = {
    r: 0,
    g: 0,
    b: 0.3,
    a: 0.3,
  };

  const findMatchEntity = pc.app.getEntityFromIndex(
    'ed3526e2-16ff-4fa9-a9a5-2dd5908e842e'
  );

  findMatchEntity.element.color = {
    r: 0,
    g: 0.5,
    b: 0.8,
    a: 1,
  };

  const inviteFriendsPage = pc.app.getEntityFromIndex(
    '0f3aaa83-aa4e-4a46-af03-a40bf527f726'
  );

  inviteFriendsPage.element.color = {
    r: 0,
    g: 0.5,
    b: 0.8,
    a: 1,
  };

  const twitchLink = pc.app.getEntityFromIndex(
    '2123a6e2-3bf0-40f8-86cd-9a68f689bd2b'
  );
  twitchLink.enabled = false;

  const settingsBackground = pc.app.getEntityFromIndex(
    'af0b095d-2ad7-42ee-8c10-6cd4f1f25602'
  );
  settingsBackground.element.opacity = 0.4;
  settingsBackground.element.color = {
    r: 0,
    g: 0,
    b: 0.3,
    a: 0.3,
  };

  const setttingsSidebarBackground = pc.app.getEntityFromIndex(
    'db1a4837-96c1-4bf7-b11a-0074a6e042ed'
  );
  setttingsSidebarBackground.element.opacity = 0.3;
  setttingsSidebarBackground.element.color = {
    r: 0,
    g: 0,
    b: 0.3,
    a: 0.3,
  };

  const disableMusicButton = pc.app.getEntityFromIndex(
    'c719a624-3eb0-4761-9c3d-a18c7963b776'
  );
  disableMusicButton.enabled = false; //Remove 'Disable Menu Music' since there is no menu music anymore ;-;

  const removeServerButton = pc.app.getEntityFromIndex(
    '6e36935a-9361-4b62-88a8-76e255a1cc4b'
  );
  removeServerButton.enabled = false;

  //Fix for Markup in Private Player list
  const playerListFixCreator = pc.app.getEntityFromIndex(
    'a71ac4fd-faea-4387-8185-268b7baed467'
  );
  playerListFixCreator.element.text = 'Loading...';
  playerListFixCreator.element.enableMarkup = true;

  const playerListFixJoiner = pc.app.getEntityFromIndex(
    '6f4ea2ce-32c0-4715-b053-73c57d85c607'
  );
  playerListFixJoiner.element.enableMarkup = true;

  const playerCountFix = pc.app.getEntityFromIndex(
    '471019e4-364f-4b84-8b78-3248af891cce'
  );
  playerCountFix.element.text = '1 / 6';
}

function modifyInGameOverlay() {
  pc.app.on('Map:Loaded', () => {
    const ingameOverlay = pc.app.getEntityFromIndex(
      '9fcdea8c-ee29-403e-8e5b-0eddd1e548f6'
    );

    if (ingameOverlay) {
      // FPS Counter
      const fpsPingCounterEntity = pc.app.getEntityFromIndex(
        '2885c322-8cea-4b70-b591-89266a1bb5a0'
      );
      fpsPingCounterEntity.setLocalScale(1.5, 1.5, 1);
      fpsPingCounterEntity.element.color = { r: 0, g: 0.9, b: 0.9, a: 1 };

      // Health Bar
      const healthBarEntity = pc.app.getEntityFromIndex(
        'd024dcbc-ab7c-4ab5-983e-47c86da9e017'
      );
      healthBarEntity.setLocalScale(1.4, 1.4, 1);
      healthBarEntity.children[2].children[0].element.color = {
        r: 0,
        g: 0.75,
        b: 0.75,
        a: 1,
      }; // Changes health bar color

      // Change Opacity of Scoreboards
      const tabScoreboardEntity = pc.app.getEntityFromIndex(
        '907d5c7e-7daa-4663-a7e9-5807b0f17a74'
      );
      tabScoreboardEntity.children[0].element.opacity = 1;

      // Pause Menu
      const ingameBannerEntity = pc.app.getEntityFromIndex(
        '274f775a-5d43-4147-8bbf-6db846f698c6'
      );
      ingameBannerEntity.enabled = false;

      // Overall Pause Menu Rework
      const pauseMenuWeaponsEntity = pc.app.getEntityFromIndex(
        '677b52db-53b5-44fb-9c99-75733583d542'
      );
      const pauseMenuEntity = pc.app.getEntityFromIndex(
        '042afaa4-4432-4e25-845e-9a1a7eb897a1'
      );
      pauseMenuWeaponsEntity.enabled = false;
      pauseMenuEntity.element.margin = { x: -315, y: -180, z: -315, w: -210 };
      pauseMenuEntity.element.opacity = 0.8;
      pauseMenuEntity.parent.element.opacity = 0;
      pauseMenuEntity.element.opacity = 1;

      //Viewmodel Position change
      const modifyViewmodel = pc.app.getEntityFromIndex(
        '63cc6332-bf3e-4da6-a11b-c467bead28a4'
      );
      modifyViewmodel.localPosition = { x: 0.55, y: 0.56, z: -0.66 };

      //Remove Scope Border
      const scopeBorder1 = pc.app.getEntityFromIndex(
        '78c01491-2565-417a-987b-6c95af4cc8eb'
      );
      const scopeBorder2 = pc.app.getEntityFromIndex(
        '03a21dce-6227-4aff-a9a5-3e1e4492ec75'
      );
      scopeBorder1.enabled = false;
      scopeBorder2.enabled = false;

      const healthEntity = pc.app.getEntityFromIndex(
        '68d4e7a3-7063-11ea-97ae-026349a27a7c'
      );
      healthEntity.script.variables.health = { r: 0, g: 0.75, b: 0.75, a: 1 };
    }
  });
}

function disableResultScreenMapSelection() {
  NetworkManager.prototype.finish = function (e) {
    if (
      (this.app.fire('Game:Overtime', !1),
      this.app.fire('Analytics:GameplayStop', !0),
      e.length > 0)
    ) {
      var t = 'none',
        a = e[0];
      for (var i in a) {
        var r = a[i];
        r.id == this.playerId ? ((r.isMe = !0), (t = r.team)) : (r.isMe = !1);
      }
      (pc.stats = a),
        'FFA' == pc.currentMode ||
        'POINT' == pc.currentMode ||
        'LASTMANSTANDING' == pc.currentMode ||
        'GUNGAME' == pc.currentMode ||
        'BLACKCOIN' == pc.currentMode
          ? !0 === a[0].isMe
            ? (pc.isVictory = !0)
            : (pc.isVictory = !1)
          : 'PAYLOAD' == pc.currentMode &&
            (('red' == t && this.payloadPercentage < 0.5) ||
            ('blue' == t && this.payloadPercentage >= 0.5)
              ? (pc.isVictory = !0)
              : (pc.isVictory = !1));
      var s = '1.0.0';
      'undefined' != typeof VERSION && (s = VERSION);
      //var o = this.app.scenes.find('MVP'); //Changes this later for the new map
      var o = this.app.scenes.find('Result');
      this.app.scenes.loadSceneHierarchy(o.url + '?v=' + s, (_, __) => {
        const mapSelection = pc.app.getEntityFromIndex(
          '5f4f73be-e309-4151-871c-e04c60158d78'
        );
        mapSelection.enabled = false;
        mapSelection.parent.children[4].enabled = false;
      }),
        (window.onbeforeunload = !1);
    }
  };
}

function disableRematchmaking() {
  RoomManager.prototype.rematchmaking = function () {};
}

function changeVersionURL() {
  const contentEntity = pc.app.getEntityFromIndex(
    '25c130ff-ea6b-4aa7-aaac-92668ab9d466'
  );

  contentEntity.children[0].children[1].children[1].children[1].children[8].script.scripts[0].triggerFunction =
    "window.open('https://discord.gg/85wE47ZK8b');";
}

function profilePageEntity() {
  const contentEntity = pc.app.getEntityFromIndex(
    '25c130ff-ea6b-4aa7-aaac-92668ab9d466'
  );

  const accountBackground = pc.app.getEntityFromIndex(
    '80a82ef3-d074-4fd5-9c99-9f969ef29888'
  );
  accountBackground.element.opacity = 0.4;
  accountBackground.element.color = {
    r: 0,
    g: 0,
    b: 0.3,
    a: 0.3,
  };

  const sideBar = pc.app.getEntityFromIndex(
    'bac460ee-3cd9-4de0-ae3c-ed99ff1619f1'
  );

  sideBar.element.opacity = 0.3;
  sideBar.element.color = {
    r: 0,
    g: 0,
    b: 0.3,
    a: 0.3,
  };

  const removeSocialLink = pc.app.getEntityFromIndex(
    '1c84fac2-9b22-415d-a477-3d6afd470e9f'
  );
  removeSocialLink.localScale = {
    x: 0,
    y: 0,
    z: 0,
  };

  contentEntity.children[3].children[2].children[7].children[1].children[6].enabled = false; // Partnership Button
  contentEntity.children[3].children[2].children[7].children[1].children[3].enabled = false; // Emoji Button
}

//Added bloom which breaks on respawns >:C
function addBloom() {
  pc.app.on('Map:Loaded', () => {
    const ingameOverlay = pc.app.getEntityFromIndex(
      '9fcdea8c-ee29-403e-8e5b-0eddd1e548f6'
    );
    if (ingameOverlay) {
      // Testing Bloom Effect
      const fpsCamera = pc.app.getEntityFromIndex(
        '68d4e7a4-7063-11ea-97ae-026349a27a7c'
      );
      window.fpsCamera = fpsCamera;

      var bloom = new pc.BloomEffect(pc.app.graphicsDevice);
      window.bloom = bloom;
      if (pc.currentMap == 'Sierra') {
        bloom.bloomIntensity = 1.8;
        bloom.bloomThreshold = 0.7;
      } else if (pc.currentMap == 'Xibalba') {
        bloom.bloomIntensity = 2;
        bloom.bloomThreshold = 0.1;
      } else if (pc.currentMap == 'Mistle') {
        bloom.bloomIntensity = 2;
        bloom.bloomThreshold = 0.8;
      } else if (pc.currentMap == 'Tundra') {
        bloom.bloomIntensity = 2;
        bloom.bloomThreshold = 0.8;
      } else if (pc.currentMap == 'Temple') {
        bloom.bloomIntensity = 0.8;
        bloom.bloomThreshold = 0.1;
      }
    }
  });
}

module.exports = {
  modifyMenuUI,
  modifyInGameOverlay,
  disableResultScreenMapSelection,
  disableRematchmaking,
  changeVersionURL,
  profilePageEntity,
  //addBloom,
};
