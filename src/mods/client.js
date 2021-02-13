function fixQuitLogic() {
    Player.prototype.onLeave = function () {
        this.app.mouse.disablePointerLock();
        window.location.href = "index.html";
    };
}

function allowSoloCustom() {
    RoomManager.prototype.onStart = function () {
        this.app.fire("Analytics:Event", "Invite", "TriedToStart");
        this.send([this.keys.start]);
        this.app.fire("Analytics:Event", "Invite", "Start");
    };
}

function setupMatchmakingDialog() {
    RoomManager.prototype.matchmaking = function () {
        (this.time = 0);
        // (this.matchmakingEntity.enabled = !0);
        document.getElementById('matchmaking').style.display = 'block';
        (this.isMatchmakingStarted =! 0);
    };
    RoomManager.prototype.onLeave = function (t) {
        this.ws && (this.ws.close(), (this.ws =! 1));
        (window.location.hash = "");
        (this.isMatchmaking =! 1);
        (this.waitingForInfo =! 1);
        (this.isMatchmakingStarted =! 1);
        this.app.fire("View:Match", "QuickMatch");
        t ? this.app.fire("Analytics:Event", "Room", "Rematchmaking") : (this.app.fire("Alert:Menu", {message: "Session is canceled."}), this.app.fire("Analytics:Event", "Invite", "Cancel"));
        // (this.matchmakingEntity.enabled = !1);
        document.getElementById('matchmaking').style.display = 'none';
        (this.friendWaiting.enabled =! 1);
    };
    RoomManager.prototype.onGameFound = function () {
        if (this.isStarted) 
            return !1;
            (window.onhashchange =! 1);
            clearInterval(this.timer);
            (this.isStarted =! 0);
            (this.isMatchmakingStarted =! 1);
            document.getElementById('matchmaking').style.display = 'none';
        };
    }

    function fetcherPrivateServer() {
        const requestMap = {
            create_account: "user/create",
            login: "user/login",
            logout: "user/logout",
            get_details: "user/details"
        };
        Fetcher.prototype.initialize = new Proxy(Fetcher.prototype.initialize, {
            apply: (target, thisArg, args) => {
                thisArg.URL = thisArg.URL.replace("https://gateway.venge.io/", "https://sn-gateway.herokuapp.com/");
                const params = new URLSearchParams(new URL(thisArg.URL).search);
                for (const [key, value] of Object.entries(requestMap)) {
                    if (params.get("request") === key) {
                        thisArg.URL = thisArg.URL.replace(`?request=${key}`, value);
                        break;
                    }
                }
                if (thisArg.URL.includes("&") && !thisArg.URL.includes("?")) {
                    thisArg.URL = thisArg.URL.replace("&", "?");
                }
                target.apply(thisArg, args);
            }
        });

        Fetcher.prototype.fetch = function (t, e, i) {
            if (!this.URL.includes("hash")) {
                if (this.URL.includes("?")) {
                    this.URL += `&hash=${
                        localStorage.getItem("Hash")
                    }`;
                } else {
                    this.URL += `?hash=${
                        localStorage.getItem("Hash")
                    }`;
                }
            }
            if (this.URL.includes("logout")) {
                localStorage.setItem("Hash", null);
            }
            var r = "string" == typeof e ? e : Object.keys(e).map(function (t) {
                    return encodeURIComponent(t) + "=" + encodeURIComponent(e[t]);
                }).join("&"),
                n = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
            n.open("POST", t),
            (n.onreadystatechange = function () {
                if (n.readyState > 3) {
                    var parse = JSON.parse(n.responseText);
                    if (parse.hash) {
                        localStorage.setItem("Hash", parse.hash);
                    }
                    i(parse);
                }
            }),
            (n.withCredentials =! 0),
            n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
            n.send(r);
        }
    }

    process.once("loaded", () => {
        console.log("Welcome to xVenge");

        global.clientInit = function () {
            fixQuitLogic();
            allowSoloCustom();
            // setupMatchmakingDialog();
            fetcherPrivateServer();
        };
    });
