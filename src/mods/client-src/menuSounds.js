function menuUID() {
  const menuUIDFind = pc.app.getEntityFromIndex(
    '06c5ec69-e469-4a9c-8d86-1f10ab8e0412'
  );

  menuUIDFind.sound.slots = {
    1: {
      name: 'Primary-Click',
      loop: false,
      autoPlay: false,
      overlap: false,
      asset: 31696828,
      startTime: 0,
      duration: null,
      volume: 0.1,
      pitch: 1.1,
    },
    2: {
      name: 'Primary-Hover',
      loop: false,
      autoPlay: false,
      overlap: false,
      asset: null,
      startTime: 0,
      duration: null,
      volume: 0.1,
      pitch: 2,
    },
    3: {
      name: 'Loop',
      loop: false,
      autoPlay: false,
      overlap: false,
      asset: 31696928,
      startTime: 0,
      duration: null,
      volume: 0.275,
      pitch: 1,
    },
    4: {
      name: 'Error',
      loop: false,
      autoPlay: false,
      overlap: false,
      asset: 31197478,
      startTime: 0,
      duration: null,
      volume: 1,
      pitch: 1,
    },
    5: {
      name: 'Whoosh',
      loop: false,
      autoPlay: false,
      overlap: false,
      asset: 29817356,
      startTime: 0,
      duration: null,
      volume: 1,
      pitch: 1,
    },
    6: {
      name: 'Success',
      loop: false,
      autoPlay: false,
      overlap: false,
      asset: 36675267,
      startTime: 0,
      duration: null,
      volume: 1,
      pitch: 1,
    },
    7: {
      name: 'Matchmaker',
      loop: false,
      autoPlay: false,
      overlap: false,
      asset: 36578644,
      startTime: 0,
      duration: null,
      volume: 0.275,
      pitch: 1,
    },
  };
}

function onMatchMakingStart() {
  const menuUIDFind = pc.app.getEntityFromIndex(
    '06c5ec69-e469-4a9c-8d86-1f10ab8e0412'
  );
  RoomManager.prototype.startMatchmaking = function () {
    (this.isMatchmakingStarted = !0),
      this.app.fire('RoomManager:Matchmaking', !0),
      this.app.fire('Fetcher:Match', {
        country: this.currentServer,
        version: this.serverCode,
        maps: this.currentMaps,
        max_player: this.maxPlayers,
        is_mobile: pc.isMobile ? 1 : 0,
      }),
      (pc.currentServer = this.currentServer),
      (pc.serverCode = this.serverCode),
      (pc.currentMap = this.currentMap),
      (pc.currentMaps = this.currentMaps),
      (pc.maxPlayers = this.maxPlayers),
      this.app.fire('Analytics:Event', 'Matchmaking', 'Start');
    menuUIDFind.sound.slots['Matchmaker'].play();
  };
}

function onMatchMakingLeave() {
  const menuUIDFind = pc.app.getEntityFromIndex(
    '06c5ec69-e469-4a9c-8d86-1f10ab8e0412'
  );
  RoomManager.prototype.onLeave = function (t) {
    this.ws && (this.ws.close(), (this.ws = !1)),
      (window.location.hash = ''),
      (this.isMatchmaking = !1),
      (this.waitingForInfo = !1),
      (this.isMatchmakingStarted = !1),
      this.app.fire('View:Match', 'QuickMatch'),
      t
        ? this.app.fire('Analytics:Event', 'Room', 'Rematchmaking')
        : (this.app.fire('Alert:Menu', {
            message: 'Session is canceled.',
          }),
          this.app.fire('Analytics:Event', 'Invite', 'Cancel')),
      (this.matchmakingEntity.enabled = !1),
      (this.friendWaiting.enabled = !1);
    menuUIDFind.sound.slots['Matchmaker'].stop();
  };
}

function onMatchMakingFound() {
  const stupidMatchFoundSound = pc.app.getEntityFromIndex(
    '90849701-0c04-4a04-a782-1db2f9077105'
  );
  stupidMatchFoundSound.sound.slots['Found'].autoPlay = false;
  const menuUIDFind = pc.app.getEntityFromIndex(
    '06c5ec69-e469-4a9c-8d86-1f10ab8e0412'
  );

  Menu.prototype.onMatchFound = function () {
    (this.isMatchFound = !0), menuUIDFind.sound.slots['Matchmaker'].stop();
    menuUIDFind.sound.slots['Loop'].play();
    (this.app.scene.layers.getLayerByName('Lightroom').enabled = !1),
      (this.app.scene.layers.getLayerByName('Lightroom-Top').enabled = !1),
      clearTimeout(this.bannerTimeout),
      this.app.fire('Ads:BannerDestroy', 'venge-io_728x90', '728x90'),
      this.app.fire('DOM:Clear', !0),
      this.app.off('Player:Character'),
      this.app.fire('Popup:Close', !0),
      (this.matchFoundBackground.enabled = !0),
      this.matchFoundBackground
        .tween(this.matchFoundBackground.element)
        .to(
          {
            opacity: 1,
          },
          1,
          pc.Linear
        )
        .start(),
      (this.matchFoundRectangle.element.opacity = 1),
      this.matchFoundRectangle.setLocalScale(20, 1, 1),
      this.matchFoundRectangle
        .tween(this.matchFoundRectangle.getLocalScale())
        .to(
          {
            x: 1,
            y: 1,
            z: 1,
          },
          0.5,
          pc.Linear
        )
        .start(),
      this.matchFoundRectangle
        .tween(this.matchFoundRectangle.element)
        .to(
          {
            opacity: 0.1,
          },
          0.5,
          pc.Linear
        )
        .start(),
      this.matchFoundCenter
        .tween(this.matchFoundCenter.getLocalScale())
        .to(
          {
            x: 1.2,
            y: 1.2,
            z: 1.2,
          },
          2,
          pc.Linear
        )
        .start(),
      setTimeout(
        function (t) {
          (t.matchFoundLoading.enabled = !0),
            t.matchFoundRectangle
              .tween(t.matchFoundRectangle.element)
              .to(
                {
                  opacity: 0,
                },
                0.5,
                pc.Linear
              )
              .start(),
            t.matchFoundText
              .tween(t.matchFoundText.element)
              .to(
                {
                  opacity: 0,
                },
                0.5,
                pc.Linear
              )
              .start(),
            setTimeout(function () {
              pc.app.fire('Game:Connect', !0);
            }, 600);
        },
        3000,
        this
      );
  };
}

module.exports = {
  menuUID,
  onMatchMakingLeave,
  onMatchMakingStart,
  onMatchMakingFound,
};
