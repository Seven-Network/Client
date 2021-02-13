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
    (this.isMatchmakingStarted = !0);
  };
  RoomManager.prototype.onLeave = function (t) {
    this.ws && (this.ws.close(), (this.ws = !1));
    (window.location.hash = "");
    (this.isMatchmaking = !1);
    (this.waitingForInfo = !1);
    (this.isMatchmakingStarted = !1);
    this.app.fire("View:Match", "QuickMatch");
    t
      ? this.app.fire("Analytics:Event", "Room", "Rematchmaking")
      : (this.app.fire("Alert:Menu", { message: "Session is canceled." }),
        this.app.fire("Analytics:Event", "Invite", "Cancel"));
    // (this.matchmakingEntity.enabled = !1);
    document.getElementById('matchmaking').style.display = 'none';
    (this.friendWaiting.enabled = !1);
  };
  RoomManager.prototype.onGameFound = function () {
    if (this.isStarted) return !1;
    (window.onhashchange = !1);
    clearInterval(this.timer);
    (this.isStarted = !0);
    (this.isMatchmakingStarted = !1);
    document.getElementById('matchmaking').style.display = 'none';
  };
}

process.once("loaded", () => {
  console.log("Welcome to xVenge");

  global.clientInit = function () {
    fixQuitLogic();
    allowSoloCustom();
    setupMatchmakingDialog();
  };
});
