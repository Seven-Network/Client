function modifyFetcher() {
  const requestMap = {
    create_account: 'https://sn-gateway.tk/user/create',
    login: 'https://sn-gateway.tk/user/login',
    logout: 'https://sn-gateway.tk/user/logout',
    get_details: 'https://sn-gateway.tk/user/details',
    create_room: 'https://invite.sn-gateway.tk/create-room',
    get_room: 'https://invite.sn-gateway.tk/get-room',
    update_map: 'https://invite.sn-gateway.tk/update-map',
  };

  Fetcher.prototype.fetch = function (t, e, i) {
    if (t.includes('gateway.venge.io') || t.includes('matchmaking.venge.io')) {
      // We start doing business with the URL if it is gateway URL
      var params = new URLSearchParams(new URL(t).search);

      // Remember params incase if needed
      const roomHash = params.get('hash');
      const newMap = params.get('map');

      // This does not work ATM.
      // Check if hash is needed
      // var hashNeeded = false;
      // if (params.get('hash')) {
      //   hashNeeded = true;
      // }

      if (params.get('request')) {
        for (let [key, value] of Object.entries(requestMap)) {
          if (key == params.get('request')) {
            t = value;
            break;
          }
        }
      }
      // If the URL still includes the original host,
      // that it means it couldn't find the key in the
      // request map. So we use backup method.
      if (t.includes('gateway.venge.io')) {
        t = t.replace('gateway.venge.io', 'sn-gateway.tk');
      }
      // Update params
      var params = new URLSearchParams(new URL(t).search);

      // Add room hash if needed
      if (t.includes('get-room') || t.includes('update-map')) {
        t += `/${roomHash}`;
      }
      if (t.includes('update-map')) {
        t += `/${newMap}`;
      }

      // Add hash if not present
      if (!params.get('hash')) {
        const hash = localStorage.getItem('Hash');
        if (t.includes('?')) {
          t += `&hash=${hash}`;
        } else {
          t += `?hash=${hash}`;
        }
      }

      // Delete hash if logging out
      if (t.includes('logout')) {
        localStorage.setItem('Hash', null);
      }
    }
    var r =
        'string' == typeof e
          ? e
          : Object.keys(e)
              .map(function (t) {
                return encodeURIComponent(t) + '=' + encodeURIComponent(e[t]);
              })
              .join('&'),
      n = window.XMLHttpRequest
        ? new XMLHttpRequest()
        : new ActiveXObject('Microsoft.XMLHTTP');
    n.open('POST', t),
      (n.onreadystatechange = function () {
        if (n.readyState > 3) {
          try {
            var parse = JSON.parse(n.responseText);
            if (parse.hash) {
              localStorage.setItem('Hash', parse.hash);
            }
            i(parse);
          } catch (_) {}
        }
      }),
      (n.withCredentials = !0),
      n.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'),
      n.send(r);
  };
}

function websocketProxy() {
  window.WebSocket = new Proxy(window.WebSocket, {
    construct: (target, args) => {
      if (args[0].includes('chat.venge.io')) {
        args[0] = args[0].replace(
          'wss://chat.venge.io/',
          'wss://chat.sn-gateway.tk/'
        );
      }
      if (args[0].includes('invite.venge.io')) {
        args[0] = args[0].replace(
          'wss://invite.venge.io/',
          'wss://invite.sn-gateway.tk/'
        );
      }

      const instance = new target(...args);

      // const messageHandler = function (_) {
      // NO NEED FOR THIS NOW LMAO
      // if (instance.url.includes('sn-invite.herokuapp.com')) {
      //   if (window.ipinterv) return;
      //   window.ipinterv = setInterval(() => {
      //     instance.send('ping');
      //   }, 10000);
      // }
      // };

      // instance.addEventListener('message', messageHandler);
      instance.addEventListener('close', () => {
        if (window.ipinterv) {
          clearInterval(window.ipinterv);
        }
      });

      return instance;
    },
  });
}

function modifyLinkEntity() {
  const copyLinkButtonEntity = pc.app.getEntityFromIndex(
    'e205d856-7111-4a26-aecf-2c874f50c61c'
  );
  copyLinkButtonEntity.element.text = 'Copy ID';

  RoomManager.prototype.onHashSet = function (t) {
    if (t) {
      var e = t.result.split('#');
      window.location.hash = '#' + e[1];
    }
    if (this.sessionLink.script.input.element) {
      this.sessionLink.script.input.element.value = window.location.href
        .split('#')
        .pop();
    }
  };

  RoomManager.prototype.room = function (t) {
    if (this.isStarted) return !1;
    if (t.length > 0) {
      var e = t[0],
        i = t[1],
        a = t[2],
        n = t[3],
        s = Math.min(e.length, this.maxPlayers);
      if (
        (i ||
          (this.app.fire('View:Match', 'Room'),
          this.app.fire('Analytics:Event', 'Invite', 'Join'),
          n && this.start()),
        e.length > 0)
      ) {
        (this.playersEntity.element.text = e.slice(0, 4).join(', ')),
          (this.playerCountEntity.element.text = s + ' / ' + this.maxPlayers),
          (this.invitePlayers.element.text = e.slice(0, 4).join(', ')),
          (this.inviteCountEntity.element.text = s + ' / ' + this.maxPlayers),
          (this.matchCountEntity.element.text = s + ' / ' + this.maxPlayers),
          this.setFriendList(e);
        var o = e.map(function (t) {
          return { username: t };
        });
        this.app.fire('CustomList:Friends', { list: o }),
          (this.currentUsernames = e);
      }
      if (this.sessionLink.script.input.element) {
        this.sessionLink.script.input.element.value = window.location.href
          .split('#')
          .pop();
      }
      (pc.isOwner = i),
        setTimeout(
          function (t) {
            console.log(t.isMatchmaking),
              !a ||
                n ||
                t.isMatchmaking ||
                t.app.fire('CustomChat:Match', { hash: t.roomId });
          },
          500,
          this
        ),
        this.private([a]);
    }
  };
}

function changeTweenAnimation() {
  //Jenny was here :)
  (Movement.prototype.jump = function () {
    if (!this.isLanded && !this.isCollided) return !1;
    if (this.playerAbilities.isDashing) return !1;
    if (this.bounceJumpTime > this.timestamp) return !1;
    if (this.jumpingTime > this.timestamp) return !1;
    if (
      ((this.jumpingTime = this.timestamp + this.jumpDuration),
      (this.isJumping = !0),
      (this.isLanded = !1),
      (this.airTime = this.now()),
      (this.randomDirection = Math.random() > 0.5 ? -1 : 1),
      this.previousVelocity,
      this.now() - this.lastImpactTime > 3e3)
    ) {
      var t = 'Jump-' + (Math.round(1 * Math.random()) + 1);
      this.app.fire('Character:Sound', t, 0.1 * Math.random()),
        this.entity.sound.play('Only-Jump'),
        (this.entity.sound.slots['Only-Jump'].pitch =
          0.1 * Math.random() + 1.1);
    }
    if (
      ((this.dynamicGravity = 0),
      this.app.fire('Overlay:Jump', !0),
      this.player.fireNetworkEvent('j'),
      this.isShooting > this.timestamp)
    )
      return !1;
    this.app
      .tween(this.animation)
      .to({ jumpAngle: -6 }, 0.15, pc.BackOut)
      .start();
  })(
    (Movement.prototype.bounceJump = function (t, e) {
      if (this.jumpingTime > this.timestamp) return !1;
      if (this.locked) return !1;
      var i = 1;
      if (e) {
        var s = e.tags.list();
        s.indexOf('Long') > -1
          ? (i = 1.25)
          : s.indexOf('Short') > -1 && (i = 0.7);
      }
      if (
        ((this.airTime = this.now()),
        (this.bounceJumpTime = this.timestamp - 500),
        this.entity.sound.play('BounceJump'),
        this.entity.sound.play('Only-Jump'),
        this.entity.rigidbody.applyImpulse(0, this.bounceJumpForce * i, 0),
        (this.entity.sound.slots['Only-Jump'].pitch =
          0.1 * Math.random() + 1.1),
        (this.isJumping = !0),
        (this.isLanded = !1),
        this.app.fire('Overlay:Jump', !0),
        this.player.fireNetworkEvent('bj'),
        this.isShooting > this.timestamp)
      )
        return !1;
      this.app
        .tween(this.animation)
        .to({ jumpAngle: -18 }, 0.15, pc.BackOut)
        .start();
    })
  );
}

function addWeaponsToMainMenuSelector() {
  const weaponEnity = pc.app.getEntityFromIndex(
    '1a599c4d-e39b-40f8-b41e-a6a260acb9bb'
  );
  weaponEnity.script.popup.itemNames = [
    'Scar',
    'Shotgun',
    'Sniper',
    'Tec-9',
    'M4',
    'LMG',
    'Desert-Eagle',
  ];
  weaponEnity.script.popup.itemImages = [
    34217429,
    31196952,
    31196950,
    31196954,
    36674698,
    36674696,
    36674697,
  ];
}

function addWeaponsToMainMenuScene() {
  // You want to wait for Map:Loaded when doing
  // anything outside main menu
  // pc.app.on('Map:Loaded', () => {

  const holderEntity = pc.app.getEntityFromIndex(
    'ffd2ace5-ed11-472d-8ec6-7f36980e3fa6'
  );

  // M4
  const m4Entity = new pc.Entity();
  holderEntity.addChild(m4Entity);
  m4Entity.setName('M4');
  m4Entity.setLocalPosition(-0.1, 0, 0.02);
  m4Entity.setLocalScale(21, 21, 21);
  m4Entity.addComponent('model', {
    enabled: true,
    type: 'asset',
    asset: 36716849,
    materialAsset: null,
    castShadows: true,
    castShadowsLightmap: true,
    receiveShadows: true,
    lightmapped: false,
    lightmapSizeMultiplier: 1,
    castShadowsLightMap: true,
    lightMapped: false,
    lightMapSizeMultiplier: 1,
    isStatic: false,
    layers: [0],
    batchGroupId: null,
  });
  m4Entity.tags.add('Weapon');

  // LMG
  const lmgEntity = new pc.Entity();
  holderEntity.addChild(lmgEntity);
  lmgEntity.setName('LMG');
  lmgEntity.setLocalPosition(-0.1, 0, 0.02);
  lmgEntity.setLocalScale(21, 21, 21);
  lmgEntity.addComponent('model', {
    enabled: true,
    type: 'asset',
    asset: 36716852,
    materialAsset: null,
    castShadows: true,
    castShadowsLightmap: true,
    receiveShadows: true,
    lightmapped: false,
    lightmapSizeMultiplier: 1,
    castShadowsLightMap: true,
    lightMapped: false,
    lightMapSizeMultiplier: 1,
    isStatic: false,
    layers: [0],
    batchGroupId: null,
  });
  lmgEntity.tags.add('Weapon');

  // Desert-Eagle
  const desertEntity = new pc.Entity();
  holderEntity.addChild(desertEntity);
  desertEntity.setName('Desert-Eagle');
  desertEntity.setLocalPosition(-0.1, 0, 0.02);
  desertEntity.setLocalScale(21, 21, 21);
  desertEntity.addComponent('model', {
    enabled: true,
    type: 'asset',
    asset: 36716855,
    materialAsset: null,
    castShadows: true,
    castShadowsLightmap: true,
    receiveShadows: true,
    lightmapped: false,
    lightmapSizeMultiplier: 1,
    castShadowsLightMap: true,
    lightMapped: false,
    lightMapSizeMultiplier: 1,
    isStatic: false,
    layers: [0],
    batchGroupId: null,
  });
  desertEntity.tags.add('Weapon');
}

function weaponSelectionFix() {
  Menu.prototype.onWeaponSelect = function (e) {
    var t = this.weaponEntity.findByTag('Weapon'),
      n = this.app.assets.find(e + '-Thumbnail-White.png');
    for (var i in t) {
      t[i].enabled = !1;
    }
    (this.weaponIcon.element.textureAsset = n),
      (this.weaponName.element.text = e.toLowerCase()),
      this.entity.sound.play('Whoosh'),
      (pc.session.weapon = e);
  };
}

function modifyMenuUI() {
  const bannerEntity = pc.app.getEntityFromIndex(
    '2baa7f22-cb28-4cbb-a175-55b8d4385c6f'
  );

  const contentEntity = pc.app.getEntityFromIndex(
    '25c130ff-ea6b-4aa7-aaac-92668ab9d466'
  );

  window.contentEntity = contentEntity;

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
  window.playerListFixJoiner = playerListFixJoiner;

  RoomManager.prototype.setFriendList = function (t) {
    this.clearFriendList();
    var e = 0;
    for (var i in t) {
      var a = t[i];
      if (parseInt(i) > 0) {
        var n = 30 * -parseInt(e),
          s = this.friendEntity.clone();
        (s.enabled = !0),
          s.setLocalPosition(0, n, 0),
          (s.findByName('Username').element.text = a),
          (s.findByName('Username').element.enableMarkup = true),
          this.friendHolder.addChild(s),
          this.friends.push(s),
          e++;
      }
    }
    t.length > 1
      ? (this.friendWaiting.enabled = !1)
      : (this.friendWaiting.enabled = !0);
  };
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
      window.modifyViewmodel = modifyViewmodel;
      modifyViewmodel.localPosition = { x: 0.45, y: 0.6, z: -0.5 };
    }
  });
}

function modifyKeybinds() {
  Player.prototype.setKeyboard = function () {
    return (
      !pc.isFinished &&
      'INPUT' != document.activeElement.tagName &&
      !(
        !this.isCardSelection &&
        this.isMapLoaded &&
        ('GUNGAME' != pc.currentMode &&
          (this.app.keyboard.wasPressed(pc.KEY_1) && this.setWeapon('Scar'),
          this.app.keyboard.wasPressed(pc.KEY_2) && this.setWeapon('Shotgun'),
          this.app.keyboard.wasPressed(pc.KEY_3) && this.setWeapon('Sniper'),
          this.app.keyboard.wasPressed(pc.KEY_4) && this.setWeapon('Tec-9'),
          this.app.keyboard.wasPressed(pc.KEY_5) && this.setWeapon('M4'),
          this.app.keyboard.wasPressed(pc.KEY_6) && this.setWeapon('LMG'),
          this.app.keyboard.wasPressed(pc.KEY_7) &&
            this.setWeapon('Desert-Eagle')),
        this.isDeath && this.isCircularMenuActive)
      ) &&
      (this.isCardSelection &&
        (this.app.keyboard.wasPressed(pc.KEY_1) && this.onBuyCard1(),
        this.app.keyboard.wasPressed(pc.KEY_2) && this.onBuyCard2(),
        this.app.keyboard.wasPressed(pc.KEY_3) && this.onBuyCard3()),
      !this.movement.locked &&
        (this.app.keyboard.wasPressed(pc.KEY_H) && this.emote(),
        this.app.keyboard.wasPressed(pc.KEY_B) && this.buyAbility(),
        this.app.keyboard.wasReleased(pc.KEY_B) && this.buyAbilityEnd(),
        this.app.keyboard.wasPressed(pc.KEY_TAB) &&
          this.app.fire('Overlay:PlayerStats', !0),
        void (
          this.app.keyboard.wasReleased(pc.KEY_TAB) &&
          this.app.fire('Overlay:PlayerStats', !1)
        )))
    );
  };
}

function modifyRoomProperties() {
  // Remove all Maps except Sierra & Xibalba for now
  const mapSelectionPrivate = pc.app.getEntityFromIndex(
    'a82cb119-ed8e-42ac-8ed9-6f82b4032fc1'
  );
  //(mapSelectionPrivate.script.popup.itemNames = ['Sierra', 'Xibalba']),
  //(mapSelectionPrivate.script.popup.itemImages = [32202739, 32202738]);
  window.mapSelectionPrivate = mapSelectionPrivate;
  const mapSelectionPublic = pc.app.getEntityFromIndex(
    'c9b08a93-b86e-4fdf-a9e5-2e447e73b641'
  );
  window.mapSelectionPublic = mapSelectionPublic;
  mapSelectionPublic.script.scripts[1].data = `{
  "maps": [
    {
      "id": "Sierra",
      "Image": "Sierra-512x.jpg",
      "Title": "Sierra",
      "Mode": "FFA"
    },
    {
      "id": "Xibalba",
      "Image": "Xibalba-512x.jpg",
      "Title": "Xibalba",
      "Mode": "FFA"
    },
    {
      "id": "Mistle",
      "Image": "Mistle-512x.jpg",
      "Title": "Mistle",
      "Mode": "FFA"
    },
    {
      "id": "Tundra",
      "Image": "Tundra-512x.jpg",
      "Title": "Tundra",
      "Mode": "FFA"
    },
    {
      "id": "Temple",
      "Image": "Temple-512x.jpg",
      "Title": "Temple",
      "Mode": "FFA"
    }
  ]
}`;

  const privateMapName = pc.app.getEntityFromIndex(
    '55c52f02-b451-4e2a-8f0b-4a04bee3814e'
  );
  window.privateMapName = privateMapName;
  privateMapName.script.scripts[1].transformers = [
    { input: 'Sierra', output: 'Sierra - FFA' },
    { input: 'Xibalba', output: 'Xibalba - FFA' },
    { input: 'Mistle', output: 'Mistle - FFA' },
    { input: 'Tundra', output: 'Tundra - FFA' },
    { input: 'Temple', output: 'Temple - FFA' },
  ];

  privateMapName.element.text = 'Sierra - FFA';

  // Changing player limit from 4 to 6
  const playerLimit = pc.app.getEntityFromIndex(
    'bf844e30-96d9-408b-8315-82f20348df96'
  );
  window.playerLimit = playerLimit;
  playerLimit.element.text = '1 / 6';
}

function modifyRoomManagerInit() {
  RoomManager.prototype.initialize = new Proxy(
    RoomManager.prototype.initialize,
    {
      apply: (target, thisArg, args) => {
        target.apply(thisArg, args);
        thisArg.currentMaps = [
          'Sierra',
          'Xibalba',
          'Mistle',
          'Tundra',
          'Temple',
        ];
        thisArg.username = 'Unknown Guest';
        thisArg.maxPlayers = 6;
      },
    }
  );
}

function fixQuitLogic() {
  Player.prototype.onLeave = function () {
    this.app.mouse.disablePointerLock();
    window.location.href = 'index.html';
  };
}

function allowSoloCustom() {
  RoomManager.prototype.onStart = function () {
    this.app.fire('Analytics:Event', 'Invite', 'TriedToStart');
    this.send([this.keys.start]);
    this.app.fire('Analytics:Event', 'Invite', 'Start');
  };
}

function removeReminder() {
  Player.prototype.onKill = function (t, e) {
    this.emoteReminder ||
      'Suicide' == e ||
      'FirstBlood' == e ||
      (Math.random() > 0.5 ? this.app.fire() : this.app.fire(),
      (this.emoteReminder = !0)),
      this.app.fire('Player:Frag', !0),
      'Capture' != e &&
        'Suicide' != e &&
        (this.killCount++, this.app.fire('Digit:KillCount', this.killCount)),
      setTimeout(
        function (t) {
          t.movement.inspect();
        },
        1e3,
        this
      );
  };
}

function resultFunctionRework() {
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
      this.app.scenes.loadSceneHierarchy(o.url + '?v=' + s, (err, entity) => {
        console.log(pc.currentMap);
        resultScreenMaps();
        /*newResultScreen(); //Not done yet
        if ((pc.currentMap = 'Sierra')) {
        } else if ((pc.currentMap = 'Xibalba')) {
        } else {
          console.log('what fucking map is this???');
        }*/
      }),
        (window.onbeforeunload = !1);
    }
  };
}

function resultScreenMaps() {
  const mapSelection = pc.app.getEntityFromIndex(
    '5f4f73be-e309-4151-871c-e04c60158d78'
  );
  window.mapSelection = mapSelection;
  mapSelection.enabled = false;
}
/*function newResultScreen() { //Not done yet
  // This should be loaded when match ends. No global init for it still
  const mvpMode = pc.app.getEntityFromIndex(
    '5a7daafc-cd66-44f8-9d6c-40e61db2c491'
  );
  mvpMode.enabled = false;
  const mvpCamera = pc.app.getEntityFromIndex(
    'f1e215cf-dd4d-41e9-9249-9d858ae1fbcf'
  );
  mvpCamera.enabled = false;
  const mvpOverlay = pc.app.getEntityFromIndex(
    'ecaf0684-09ca-4b0e-869a-02edbe1e3f9d'
  );
  mvpOverlay.enabled = true;
  const mvpMap = pc.app.getEntityFromIndex(
    '31e1399c-bd98-4ace-a4b9-6736258d913a'
  );
  mvpMap.enabled = false;
}*/

function packetReader() {
  let _messagePack = MessagePack.initialize(0xfff);

  window.WebSocket = new Proxy(window.WebSocket, {
    construct: function (target, args) {
      let isFirstMessage = true;

      const instance = new target(...args);

      const openHandler = function (event) {
        console.log('7Client: WebSocket connection opened', event);
      };

      const messageHandler = function (event) {
        // console.log('7Client: WebSocket incoming message raw data intercepted', event);
        try {
          let buffer = MessagePack.Buffer.from(new Uint8Array(event.data));
          let data = _messagePack.decode(buffer);
          if (_messagePack && data[0]) {
            console.log(
              instance.url + ': WebSocket incoming message intercepted',
              data
            );
          } //else if (_messagePack && isFirstMessage) {
          //let nestedData = _messagePack.decode(data[0])
          //console.log(instance.url + ': WebSocket nested incoming message intercepted',
          //nestedData);
          //isFirstMessage = false;
          //}
        } catch (err) {
          console.log(err);
        }
      };

      const closeHandler = function (event) {
        console.log('7Client: WebSocket connection closed', event);
        instance.removeEventListener('open', openHandler);
        instance.removeEventListener('message', messageHandler);
        instance.removeEventListener('close', closeHandler);
      };

      instance.addEventListener('open', openHandler);
      instance.addEventListener('message', messageHandler);
      instance.addEventListener('close', closeHandler);

      const sendProxy = new Proxy(instance.send, {
        apply: function (target, thisArg, args) {
          if (_messagePack && _messagePack.decode(args[0])[0]) {
            console.log(
              instance.url + ': WebSocket outgoing message intercepted',
              _messagePack.decode(args[0])
            );
          }

          target.apply(thisArg, args);
        },
      });

      instance.send = sendProxy;

      return instance;
    },
  });
}

function removeDeathWeaponSelect() {
  (Overlay.prototype.clearCircularMenu = function () {
    for (var t = this.circularItems.length; t--; )
      this.circularItems[t].destroy();
    (this.circularItems = []), (this.circularItemsList = []);
  }),
    (Overlay.prototype.showSmallBanner = function (t) {}),
    (Overlay.prototype.triggerSmallBanner = function (t) {}),
    (Overlay.prototype.onCircularMenu = function (t) {
      if ((this.clearCircularMenu(), 'GUNGAME' == pc.currentMode)) return !1;
      (this.circularEntity.enabled = !1), (this.circularPiece.enabled = !1);
      var e = 0,
        i = 23.15 * t.length;
      for (var a in t) {
        var n = t[a],
          s = this.app.assets.find(n + '-Thumbnail-White.png'),
          o = parseInt(a),
          l = 0.1 * o,
          r = this.circularPiece.clone();
        r.setLocalScale(0.5, 0.5, 0.5),
          (r.findByName('Key').element.text = o + 1 + ''),
          (r.findByName('Icon').element.textureAsset = s),
          r.findByName('Icon').setLocalEulerAngles(0, 0, -e - i),
          r.setLocalEulerAngles(0, 0, e),
          r
            .tween(r.getLocalScale())
            .to({ x: 1.1, y: 1.1, z: 1.1 }, 0.35 + l, pc.BackOut)
            .delay(l)
            .start(),
          setTimeout(
            function (t, e) {
              (e.enabled = !0), t.entity.sound.play('Whoosh');
            },
            1e3 * l,
            this,
            r
          ),
          this.circularHolder.addChild(r),
          this.circularItems.push(r),
          this.circularItemsList.push(n),
          (e -= 62);
      }
      this.circularHolder.setLocalEulerAngles(0, 0, i),
        (this.circularSpinner.enabled = !0),
        this.circularEntity.setLocalPosition(0, -300, 0),
        this.circularEntity
          .tween(this.circularEntity.getLocalPosition())
          .to({ x: 0, y: 55, z: 0 }, 0.5, pc.BackOut)
          .start(),
        setTimeout(
          function (t) {
            t.hideCircularMenu();
          },
          3500,
          this
        );
    });
}

process.once('loaded', () => {
  console.log('Welcome to Seven Network');

  global.clientInit = () => {
    window._messagePack = MessagePack.initialize(0xfff);
    modifyFetcher();
    websocketProxy();
    modifyKeybinds();
    modifyRoomManagerInit();
    weaponSelectionFix();
    fixQuitLogic();
    allowSoloCustom();
    resultFunctionRework();
    changeTweenAnimation();
    //packetReader();
    removeDeathWeaponSelect();
  };

  global.mapInit = () => {
    addWeaponsToMainMenuScene();
    modifyMenuUI();
    modifyInGameOverlay();
    modifyLinkEntity();
    removeReminder();
  };

  global.startInit = () => {
    addWeaponsToMainMenuSelector();
    modifyRoomProperties();
  };
});
