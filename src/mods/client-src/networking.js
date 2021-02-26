const requestMap = {
  create_account: 'https://sn-gateway.tk/user/create',
  login: 'https://sn-gateway.tk/user/login',
  logout: 'https://sn-gateway.tk/user/logout',
  get_details: 'https://sn-gateway.tk/user/details',
  create_room: 'https://invite.sn-gateway.tk/create-room',
  get_room: 'https://invite.sn-gateway.tk/get-room',
  update_map: 'https://invite.sn-gateway.tk/update-map',
  find_room_v2: 'https://invite.sn-gateway.tk/matchmaking',
};

function modifyFetcher() {
  if (
    process.argv.includes('ELECTRON_IS_DEV') &&
    localStorage.getItem('useLocalServer') == '1'
  ) {
    console.log('Using development request map');
    for (let [key, value] of Object.entries(requestMap)) {
      requestMap[key] = value.replace(
        'https://sn-gateway.tk/',
        'http://localhost:7777/'
      );
      requestMap[key] = requestMap[key].replace(
        'https://invite.sn-gateway.tk/',
        'http://localhost:7778/'
      );
      console.log(key, requestMap[key]);
    }
  } else if (
    process.argv.includes('ELECTRON_IS_DEV') &&
    localStorage.getItem('useTestServer') == '1'
  ) {
    console.log('Using test server request map');
    for (let [key, value] of Object.entries(requestMap)) {
      requestMap[key] = value.replace(
        'https://sn-gateway.tk/',
        'https://sn-gateway.tk/'
      );
      requestMap[key] = requestMap[key].replace(
        'https://invite.sn-gateway.tk/',
        'https://invite-test.sn-gateway.tk/'
      );
      console.log(key, requestMap[key]);
    }
  }

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
        if (
          process.argv.includes('ELECTRON_IS_DEV') &&
          localStorage.getItem('useTestServer') == '1'
        ) {
          args[0] = args[0].replace(
            'wss://invite.venge.io/',
            'wss://invite-test.sn-gateway.tk/'
          );
        } else if (
          process.argv.includes('ELECTRON_IS_DEV') &&
          localStorage.getItem('useLocalServer') == '1'
        ) {
          args[0] = args[0].replace(
            'wss://invite.venge.io/',
            'ws://localhost:7778/'
          );
        } else {
          args[0] = args[0].replace(
            'wss://invite.venge.io/',
            'wss://invite.sn-gateway.tk/'
          );
        }
      }
      if (args[0].includes('localhost')) {
        args[0] = args[0].replace('wss://', 'ws://');
      }

      const instance = new target(...args);

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

function modifyRoomManagerLogic() {
  const copyLinkButtonEntity = pc.app.getEntityFromIndex(
    'e205d856-7111-4a26-aecf-2c874f50c61c'
  );
  copyLinkButtonEntity.element.text = 'Copy ID';

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

// Not sure where this goes
function modifyRoomProperties() {
  // Remove all Maps except Sierra & Xibalba for now
  const mapSelectionPrivate = pc.app.getEntityFromIndex(
    'a82cb119-ed8e-42ac-8ed9-6f82b4032fc1'
  );
  //(mapSelectionPrivate.script.popup.itemNames = ['Sierra', 'Sierra.Snow']),
  //(mapSelectionPrivate.script.popup.itemImages = [32202739, 32202738]);
  const mapSelectionPublic = pc.app.getEntityFromIndex(
    'c9b08a93-b86e-4fdf-a9e5-2e447e73b641'
  );
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
  playerLimit.element.text = '1 / 6';
}

module.exports = {
  modifyFetcher,
  websocketProxy,
  modifyRoomManagerLogic,
  modifyRoomProperties,
};
