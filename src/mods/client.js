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
  };

  Fetcher.prototype.fetch = function (t, e, i) {
    if (t.includes('gateway.venge.io') || t.includes('matchmaking.venge.io')) {
      // We start doing business with the URL if it is gateway URL
      var params = new URLSearchParams(new URL(t).search);

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
      return instance;
    },
  });
}

process.once('loaded', () => {
  console.log('Welcome to Seven Network');

  global.clientInit = () => {
    fixQuitLogic();
    allowSoloCustom();
    modifyFetcher();
    websocketProxy();
  };

  global.mapInit = () => {
  };

  global.startInit = () => {
  };
});
