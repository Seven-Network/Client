function modifyMenuUI() {
  const bannerEntity = pc.app.getEntityFromIndex(
    '2baa7f22-cb28-4cbb-a175-55b8d4385c6f'
  );

  const contentEntity = pc.app.getEntityFromIndex(
    '25c130ff-ea6b-4aa7-aaac-92668ab9d466'
  );

  //Redo this. Spaghetti Code

  bannerEntity.enabled = false; // Disable Ad banner
  contentEntity.setLocalPosition(0, -110, 0);
  contentEntity.element.margin = { w: 120, x: -460, y: -600, z: -460 };
  contentEntity.children[0].children[2].enabled = false; // Social Links
  contentEntity.children[0].children[1].children[1].children[1].children[1].enabled = 0; //Quest Bar
  contentEntity.children[0].children[1].children[1].children[1].children[0].enabled = 0; //Shop Notification (also called 'Slider')
  contentEntity.parent.children[2].children[1].children[0].element.width = 300;
  contentEntity.parent.children[2].children[1].children[0].element.height = 200;
  contentEntity.parent.children[2].children[1].element.margin = {
    x: 215,
    y: -20,
    z: -210,
    w: -25,
  };
  contentEntity.parent.children[2].children[0].element.color = {
    r: 0,
    g: 0,
    b: 0.3,
    a: 1,
  };
  contentEntity.parent.children[2].children[0].element.opacity = 0.3;

  //Main Menu Page
  contentEntity.children[0].children[1].children[0].children[0].element.opacity = 0.3;
  contentEntity.children[0].children[1].children[0].children[0].element.color = {
    r: 0,
    g: 0,
    b: 0.3,
    a: 0.3,
  };
  contentEntity.children[0].children[1].children[0].children[1].element.opacity = 0.3;
  contentEntity.children[0].children[1].children[0].children[1].element.color = {
    r: 0,
    g: 0,
    b: 0.3,
    a: 0.3,
  };
  contentEntity.children[0].children[1].children[1].children[0].element.opacity = 0.3;
  contentEntity.children[0].children[1].children[1].children[0].element.color = {
    r: 0,
    g: 0,
    b: 0.3,
    a: 0.3,
  };
  contentEntity.children[0].children[1].children[1].children[1].children[6].enabled = false;
  contentEntity.children[0].children[1].children[1].children[1].children[7].enabled = false;
  contentEntity.children[0].children[1].children[1].children[1].children[9].element.text =
    'Closed Beta'; //Should be removed later
  contentEntity.children[0].children[1].children[1].children[1].children[9].element.color = {
    r: 1,
    g: 1,
    b: 1,
    a: 1,
  };
  contentEntity.children[0].children[1].children[1].children[1].children[8].element.color = {
    r: 0,
    g: 1,
    b: 1,
    a: 1,
  };
  contentEntity.children[0].children[0].children[0].element.opacity = 0.3;
  contentEntity.children[0].children[0].children[0].element.color = {
    r: 0,
    g: 0,
    b: 0.3,
    a: 0.3,
  };
  contentEntity.children[0].children[0].children[1].element.opacity = 0.3;
  contentEntity.children[0].children[0].children[1].element.color = {
    r: 0,
    g: 0,
    b: 0.3,
    a: 0.3,
  };
  contentEntity.children[0].children[1].children[1].children[1].children[5].element.color = {
    r: 0,
    g: 0.5,
    b: 0.8,
    a: 1,
  };
  contentEntity.children[0].children[1].children[1].children[1].children[3].element.color = {
    r: 0,
    g: 0.5,
    b: 0.8,
    a: 1,
  };
  //contentEntity.parent.children[2].children[2].children[2].enabled = false
  //contentEntity.parent.children[2].children[2].children[1].enabled = false
  contentEntity.children[0].children[3].enabled = false;

  //Settings Page
  contentEntity.children[4].children[0].element.opacity = 0.4;
  contentEntity.children[4].children[0].element.color = {
    r: 0,
    g: 0,
    b: 0.3,
    a: 0.3,
  };
  contentEntity.children[4].children[1].children[0].element.opacity = 0.3;
  contentEntity.children[4].children[1].children[0].element.color = {
    r: 0,
    g: 0,
    b: 0.3,
    a: 0.3,
  };
  contentEntity.children[4].children[4].children[1].children[2].enabled = false; //Remove 'Disable Menu Music' since there is no menu music anymore ;-;

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
      modifyViewmodel.localPosition = { x: 0.45, y: 0.6, z: -0.5 };

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
      )
      healthEntity.script.variables.health = {r: 0, g: 0.75, b: 0.75, a: 1}
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

  //Account Page
  contentEntity.children[3].children[0].element.opacity = 0.4;
  contentEntity.children[3].children[0].element.color = {
    r: 0,
    g: 0,
    b: 0.3,
    a: 0.3,
  };
  contentEntity.children[3].children[2].children[0].children[0].element.opacity = 0.3;
  contentEntity.children[3].children[2].children[0].children[0].element.color = {
    r: 0,
    g: 0,
    b: 0.3,
    a: 0.3,
  };
  contentEntity.children[3].children[2].children[1].children[1].children[12].localScale = {
    x: 0,
    y: 0,
    z: 0,
  }; //Fuck you >:C

  contentEntity.children[3].children[2].children[7].children[1].children[6].enabled = false; // Partnership Button
  contentEntity.children[3].children[2].children[7].children[1].children[3].enabled = false; // Emoji Button
}

module.exports = {
  modifyMenuUI,
  modifyInGameOverlay,
  disableResultScreenMapSelection,
  disableRematchmaking,
  changeVersionURL,
  profilePageEntity,
};
