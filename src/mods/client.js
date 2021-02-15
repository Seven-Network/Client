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

function modifyFetcher() {
  const requestMap = {
    create_account: 'https://sn-gateway.herokuapp.com/user/create',
    login: 'https://sn-gateway.herokuapp.com/user/login',
    logout: 'https://sn-gateway.herokuapp.com/user/logout',
    get_details: 'https://sn-gateway.herokuapp.com/user/details',
    create_room: 'https://sn-invite.herokuapp.com/create-room',
    get_room: 'https://sn-game-na.herokuapp.com/get-room',
  };

  Fetcher.prototype.fetch = function (t, e, i) {
    if (t.includes('gateway.venge.io') || t.includes('matchmaking.venge.io')) {
      // We start doing business with the URL if it is gateway URL
      var params = new URLSearchParams(new URL(t).search);

      // Remember hash if needed in case it's a room request
      const roomHash = params.get('hash');

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
        t = t.replace('gateway.venge.io', 'sn-gateway.herokuapp.com');
      }
      // Update params
      var params = new URLSearchParams(new URL(t).search);

      // Add room hash if needed
      if (t.includes('get-room')) {
        t += `/${roomHash}`;
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
      if (args[0].includes('invite.venge.io')) {
        args[0] = args[0].replace(
          'wss://invite.venge.io/',
          'wss://sn-invite.herokuapp.com/'
        );
      }

      const instance = new target(...args);

      const messageHandler = function (event) {
        if (instance.url.includes('sn-invite.herokuapp.com')) {
          if (window.ipinterv) return;
          window.ipinterv = setInterval(() => {
            instance.send('ping');
          }, 10000);
        }
      };

      instance.addEventListener('message', messageHandler);
      instance.addEventListener('close', () => {
        if (window.ipinterv) {
          clearInterval(window.ipinterv);
        }
      });

      return instance;
    },
  });
}

function addGGWeapons() {
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

function setupGGWeapons() {
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

function weaponSelectFix() {
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

function menuRework() {
  const bannerEntity = pc.app.getEntityFromIndex(
    '2baa7f22-cb28-4cbb-a175-55b8d4385c6f'
  );

  const contentEntity = pc.app.getEntityFromIndex(
    '25c130ff-ea6b-4aa7-aaac-92668ab9d466'
  );

  bannerEntity.enabled = false;
  contentEntity.setLocalPosition(0, -110, 0);
  contentEntity.setLocalScale(1.05, 1.05, 1.05);
  contentEntity.element.margin = { w: 120, x: -460, y: -600, z: -460 };
  contentEntity.children[0].children[2].enabled = false; //Social Links
  contentEntity.children[0].children[1].children[1].children[1].children[1].enabled = 0; //Quest Bar
  contentEntity.children[0].children[1].children[1].children[1].children[0].enabled = 0; //Shop Notification (also called 'Slider')
}

function ingameRework() {
  pc.app.on('Map:Loaded', () => {
    const ingameOverlay = pc.app.getEntityFromIndex(
      '9fcdea8c-ee29-403e-8e5b-0eddd1e548f6'
    );

    window.ingameOverlay = ingameOverlay;

    if (ingameOverlay) {
      //FPS Counter
      const fpsPingCounterEntity = pc.app.getEntityFromIndex(
        '2885c322-8cea-4b70-b591-89266a1bb5a0'
      );
      fpsPingCounterEntity.setLocalScale(1.5, 1.5, 1);
      fpsPingCounterEntity.element.color = { r: 0, g: 0.9, b: 0.9, a: 1 };

      //Healht Bar
      const healthBarEntity = pc.app.getEntityFromIndex(
        'd024dcbc-ab7c-4ab5-983e-47c86da9e017'
      );
      healthBarEntity.setLocalScale(1.4, 1.4, 1);
      healthBarEntity.children[2].children[0].element.color = {
        r: 0,
        g: 0.75,
        b: 0.75,
        a: 1,
      }; //Changes health bar color

      //Change Opacity of Scoreboards
      const tabScoreboardEntity = pc.app.getEntityFromIndex(
        '907d5c7e-7daa-4663-a7e9-5807b0f17a74'
      )
      tabScoreboardEntity.children[0].element.opacity = 1

      //Pause Menu
      const ingameBannerEntity = pc.app.getEntityFromIndex(
        '274f775a-5d43-4147-8bbf-6db846f698c6'
      );
      ingameBannerEntity.enabled = false;

      //Overall Pause Menu Rework
      const pauseMenuWeaponsEntity = pc.app.getEntityFromIndex(
        '677b52db-53b5-44fb-9c99-75733583d542'
      );
      const pauseMenuEntity = pc.app.getEntityFromIndex(
        '042afaa4-4432-4e25-845e-9a1a7eb897a1'
      );

      pauseMenuWeaponsEntity.enabled = false;
      pauseMenuEntity.element.margin = { x: -315, y: -180, z: -315, w: -210 };
      pauseMenuEntity.element.opacity = 0.8
      pauseMenuEntity.parent.element.opacity = 0
      pauseMenuEntity.element.opacity = 1

      window.pauseMenuWeaponsEntity = pauseMenuWeaponsEntity;
      window.pauseMenuEntity = pauseMenuEntity;
    }
  });
}

function ggWeaponsKeybinds() {
  (Player.prototype.setKeyboard = function () {
    return (
      !pc.isFinished &&
      'INPUT' != document.activeElement.tagName &&
      !(
        !this.isCardSelection &&
        this.isMapLoaded &&
        ('GUNGAME' != pc.currentMode &&
          (this.app.keyboard.wasPressed(pc.KEY_1) &&
            this.setWeapon('Scar'),
          this.app.keyboard.wasPressed(pc.KEY_2) &&
            this.setWeapon('Shotgun'),
          this.app.keyboard.wasPressed(pc.KEY_3) &&
            this.setWeapon('Sniper'),
          this.app.keyboard.wasPressed(pc.KEY_4) &&
            this.setWeapon('Tec-9'),
          this.app.keyboard.wasPressed(pc.KEY_5) &&
            this.setWeapon('M4'),
          this.app.keyboard.wasPressed(pc.KEY_6) &&
            this.setWeapon('LMG'),
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
  })
}

process.once('loaded', () => {
  console.log('Welcome to Seven Network');

  global.clientInit = () => {
    window._messagePack = MessagePack.initialize(0xfff);
    fixQuitLogic();
    allowSoloCustom();
    modifyFetcher();
    websocketProxy();
    weaponSelectFix();
    ggWeaponsKeybinds();
  };

  global.mapInit = () => {
    setupGGWeapons();
    menuRework();
    ingameRework();
  };

  global.startInit = () => {
    addGGWeapons();
  };
});
