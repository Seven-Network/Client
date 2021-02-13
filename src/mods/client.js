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
  };

  Fetcher.prototype.fetch = function (t, e, i) {
    if (t.includes('gateway.venge.io')) {
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

function sevenNetworkServer() {
  (() => {
    Object.freeze(Object);
    Object.defineProperty(globalThis, 'WebSocket', {
      value: class extends WebSocket {
        constructor() {
          let url = arguments[0],
            bool = /invite/.test(url);
          arguments[0] =
            'wss://venge.herokuapp.com?isMatchmaker=' + (bool + []);
          super(...arguments);
        }
      },
      configurable: !1,
    });
  })();
}

function respawnAnimation() {
  Overlay.prototype.onTransition = function (t) {
    t
      ? ((this.leftCinema.element.color = t),
        (this.rightCinema.element.color = t))
      : ((this.leftCinema.element.color = pc.colors.black),
        (this.rightCinema.element.color = pc.colors.black)),
      (this.leftCinema.enabled = !0),
      (this.rightCinema.enabled = !0),
      (this.entity.sound.slots.Whoosh.pitch = 1.1),
      this.entity.sound.play('Whoosh'),
      this.leftCinema.setLocalEulerAngles(0, 0, 0),
      this.leftCinema.setLocalScale(0.1, 0, 0),
      this.leftCinema
        .tween(this.leftCinema.getLocalScale())
        .to({ x: 1.4, y: 1, z: 1 }, 0.35, pc.QuarticInOut)
        .start(),
      this.rightCinema.setLocalEulerAngles(0, 0, 0),
      this.rightCinema.setLocalScale(0.1, 0, 0),
      this.rightCinema
        .tween(this.rightCinema.getLocalScale())
        .to({ x: 1.4, y: 1, z: 1 }, 0.35, pc.QuarticInOut)
        .start(),
      setTimeout(
        function (t) {
          t.leftCinema.setLocalEulerAngles(0, 0, 0),
            t.leftCinema
              .tween(t.leftCinema.getLocalScale())
              .to({ x: 0.1, y: 1, z: 1 }, 0.35, pc.QuarticInOut)
              .start(),
            t.rightCinema.setLocalEulerAngles(0, 0, 0),
            t.rightCinema
              .tween(t.rightCinema.getLocalScale())
              .to({ x: 0.1, y: 1, z: 1 }, 0.35, pc.QuarticInOut)
              .start(),
            (t.entity.sound.slots.Whoosh.pitch = 1),
            t.entity.sound.play('Whoosh');
        },
        400,
        this
      );
  };
}

function matchFoundAnimation() {
  Menu.prototype.onMatchFound = function () {
    (this.isMatchFound = !0),
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
        .to({ opacity: 1 }, 1, pc.QuarticOut)
        .start(),
      (this.matchFoundRectangle.element.opacity = 1),
      this.matchFoundRectangle.setLocalScale(0, 0, 0),
      this.matchFoundCenter.setLocalScale(3, 3, 3),
      this.matchFoundRectangle
        .tween(this.matchFoundRectangle.getLocalScale())
        .to({ x: 1, y: 1, z: 1 }, 0.5, pc.QuarticOut)
        .start(),
      this.matchFoundRectangle
        .tween(this.matchFoundRectangle.element)
        .to({ opacity: 0.1 }, 0.5, pc.QuarticOut)
        .start(),
      this.matchFoundCenter
        .tween(this.matchFoundCenter.getLocalScale())
        .to({ x: 1.2, y: 1.2, z: 1.2 }, 2, pc.QuarticOut)
        .start(),
      setTimeout(
        function (e) {
          (e.matchFoundLoading.enabled = !0),
            e.matchFoundRectangle
              .tween(e.matchFoundRectangle.element)
              .to({ opacity: 0 }, 0.5, pc.QuarticOut)
              .start(),
            e.matchFoundText
              .tween(e.matchFoundText.element)
              .to({ opacity: 0 }, 0.5, pc.QuarticOut)
              .start(),
            setTimeout(function () {
              pc.app.fire('Game:Connect', !0);
            }, 1300);
        },
        1500,
        this
      );
  };
}

function deathMessage() {
  Player.prototype.setDeath = function (t, e) {
    if (
      ((this.killedBy = t),
      (this.isDeath = !0),
      this.deathCount++,
      this.app.fire('Digit:DeathCount', this.deathCount),
      this.movement.death(),
      (this.characterHolder.enabled = !0),
      this.characterEntity.setLocalEulerAngles(0, this.movement.lookX, 0),
      setTimeout(
        function (t) {
          t.movement.lookEntity.enabled = !1;
        },
        100,
        this
      ),
      this.characterEntity.setLocalPosition(0, -2.15, 0),
      (this.characterEntity.animation.speed = 1),
      'Drown' == e
        ? (this.characterEntity.animation.play('Floating'),
          (this.characterEntity.animation.speed = 3),
          (this.characterEntity.animation.loop = !0),
          this.entity.sound.play('Splash'),
          this.characterEntity.setLocalPosition(0, -3.5, 0),
          this.characterEntity
            .tween(this.characterEntity.getLocalPosition())
            .to({ x: 0, y: -6.5, z: 0 }, 2, pc.Linear)
            .start())
        : (this.characterEntity.animation.play('Death'),
          (this.characterEntity.animation.loop = !1)),
      (this.characterCamera.script.blackWhite.enabled = !0),
      this.characterCamera.setLocalPosition(0, 1.215, -0.115),
      this.characterCamera
        .tween(this.characterCamera.getLocalPosition())
        .to({ x: 0, y: 3.015, z: 7 }, 1, pc.SineOut)
        .start(),
      this.characterCamera.setLocalEulerAngles(0, 0, 0),
      this.characterCamera
        .tween(this.characterCamera.getLocalEulerAngles())
        .rotate({ x: -18, y: 0, z: 0 }, 0.7, pc.BackOut)
        .start(),
      this.interface.hideGameplay(),
      this.killedBy && this.killedBy != this.entity)
    ) {
      var a = this.killedBy.script.enemy.username;
      this.app.fire(
        'Overlay:Status',
        'Eliminated by [color="#FF0000"]' + a + '[/color]'
      );
    }
    this.app.fire('Player:StopSpeaking', !0),
      this.showCircularMenu(),
      'undefined' != typeof PokiSDK && PokiSDK.gameplayStop();
  };
}

function removeEmoteHint() {
  Player.prototype.onKill = function (t, e) {
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

function reduceSpellHintFix() {
  SpellManager.prototype.applyReduce = function () {
    this.isReducedApplied ||
      ('Lilium' == this.characterName
        ? (this.player.throwCooldown = 7)
        : 'Shin' == this.characterName && (this.player.throwCooldown = 2),
      (this.isReducedApplied = !0));
    //this.app.fire("Overlay:Announce", "Reduce", "Throw cooldown time reduced", !1, "Reduce-Icon")) Why needed?
  };
}

function scoreboardFix() {
  (Overlay.prototype.onStart = function () {
    this.app.fire('Overlay:Gameplay', !0),
      this.clearAbilityList(),
      this.abilityBar.setLocalScale(1, 0.001, 1),
      (this.abilityHolderEntity.enabled = !1),
      (this.skillIcon.enabled = !0),
      (this.abilityNotification.enabled = !1),
      (this.abilityBuyClock.enabled = !0),
      (this.abilityBuyKey.enabled = !1),
      (this.abilityBuyButton.findByName('TierLevel').element.color =
        pc.colors.gray),
      (this.abilityBuyButton.findByName('Thumbnail').element.color =
        pc.colors.gray),
      (this.isAbilitySelected = !1),
      (this.isOvertime = !1);
    this.app.fire('Overlay:PlayerStats', !1);
  }),
    (Overlay.prototype.onFinish = function () {
      (this.pauseEntity.enabled = !1),
        (pc.isPauseActive = !1),
        (this.taskEntity.enabled = !1),
        (this.achievementEntity.enabled = !1),
        (this.focusBulletsEntity.enabled = !1),
        (this.cardEntity.enabled = !1),
        this.entity.sound.stop('Card-Selection-Loop'),
        this.entity.sound.stop('Overtime-Loop'),
        (this.abilities = []),
        this.hideAllGameplay(),
        this.app.fire('Overlay:PlayerStats', !1);
    });
}

function hexagonTiles() {
  Damageable.prototype.setDamage = function (t) {
    var e = this.entity.getPosition().clone();
    (this.health = t),
      this.app.fire(
        'EffectManager:CustomSound',
        'Hit-Sound',
        1 - 0.005 * this.health,
        e
      ),
      this.health <= -500 &&
        (this.app.fire('EffectManager:ExplosionEffect', e),
        this.entity.destroy());
  };
}

function menuMusic() {
  Menu.prototype.onWeaponSelect = function (e) {
    var t = this.weaponEntity.findByTag('Weapon'),
      n = this.app.assets.find(e + '-Thumbnail-White.png');
    for (var i in t) {
      t[i].enabled = !1;
    }
    (this.weaponEntity.findByName(e).enabled = !0),
      (this.weaponIcon.element.textureAsset = n),
      (this.weaponName.element.text = e.toLowerCase()),
      this.entity.sound.play('Whoosh'),
      this.entity.sound.play('Loop'),
      (pc.session.weapon = e);
  };
  Menu.prototype.setMute = function () {};
}

process.once('loaded', () => {
  console.log('Welcome to Seven Network');

  global.clientInit = function () {
    fixQuitLogic();
    allowSoloCustom();
    modifyFetcher();
    sevenNetworkServer();
    respawnAnimation();
    matchFoundAnimation();
    deathMessage();
    removeEmoteHint();
    reduceSpellHintFix();
    scoreboardFix();
    hexagonTiles();
    menuMusic();
  };
});
