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

function IngameInit() {
  (MapManager.prototype.setMap = function (t) {
    if (this.isLoaded) return !1;
    console.log('Loading map : ', t), (this.mapName = t);
    var a = this,
      e = this.app.scenes.find(t),
      o = '1.0.0';
    'undefined' != typeof VERSION && (o = VERSION),
      (this.isLoading = Date.now()),
      (pc.isMapLoaded = !1);
    var i = this.app.root.findByName('Map');
    i && i.sound && (i.sound.stop('Ambient'), i.sound.stop('Rain')),
      e &&
        e.url &&
        (this.app.scenes.loadSceneHierarchy(e.url + '?v=' + o, function (t, i) {
          i &&
            (a.mapHolder.reparent(i),
            a.app.scenes.loadSceneSettings(e.url + '?v=' + o, function (t, a) {
              setTimeout(function () {
                (pc.isMapLoaded = !0), pc.app.fire('Map:Loaded', !0);
              }, 1e3);
            })),
            t && console.log('[ERROR] ', t);
        }),
        (this.isLoaded = !0));
        global.levelInit();
        console.log("Loaded Level Init")
  })
}

function IngameRework() {
  const fpsPingCounter = pc.app.getEntityFromIndex(
    '2885c322-8cea-4b70-b591-89266a1bb5a0'
  );

  window.fpsPingCounter = fpsPingCounter
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
    IngameInit();
  };

  global.mapInit = () => {
    setupGGWeapons();
    menuRework();
  };

  global.startInit = () => {
    addGGWeapons();
  };

  global.levelInit = () => {
    IngameRework();
  }
});
