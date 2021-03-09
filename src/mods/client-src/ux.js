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

function removeCastShadows() {
  MapManager.prototype.onSettingsChange = function () {
  };
}

function reduceJumpAnimIntensity() {
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

function bloomFix() {
  Player.prototype.setDeath = function (t, e) {
    fpsCamera.camera.postEffects.removeEffect(bloom);
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
            .to(
              {
                x: 0,
                y: -6.5,
                z: 0,
              },
              2,
              pc.Linear
            )
            .start())
        : (this.characterEntity.animation.play('Death'),
          (this.characterEntity.animation.loop = !1)),
      (this.characterCamera.script.blackWhite.enabled = !0),
      this.characterCamera.setLocalPosition(0, 1.215, -0.115),
      this.characterCamera
        .tween(this.characterCamera.getLocalPosition())
        .to(
          {
            x: 0,
            y: 3.015,
            z: 7,
          },
          1,
          pc.SineOut
        )
        .start(),
      this.characterCamera.setLocalEulerAngles(0, 0, 0),
      this.characterCamera
        .tween(this.characterCamera.getLocalEulerAngles())
        .rotate(
          {
            x: -18,
            y: 0,
            z: 0,
          },
          0.7,
          pc.BackOut
        )
        .start(),
      this.interface.hideGameplay(),
      this.killedBy && this.killedBy != this.entity)
    ) {
      var a = Utils.displayUsername(this.killedBy.script.enemy.username);
      this.app.fire(
        'Overlay:Status',
        'Killed by [color="#FF0000"]' + a + '[/color]'
      );
    }
    this.app.fire('Player:StopSpeaking', !0), this.showCircularMenu();
  };

  Player.prototype.onRespawn = function (t) {
    fpsCamera.camera.postEffects.removeEffect(bloom);
    if (pc.isFinished) return !1;
    if (!pc.isMapLoaded) return !1;
    if (!this.isRespawnAllowed && 'undefined' != typeof VERSION) return !1;
    if (Date.now() - this.lastRespawnDate < 500) return !1;
    (this.isDeath = !1),
      (this.isEmotePlaying = !1),
      this.movement.currentWeapon.entity.name != this.lastWeapon
        ? ('Shotgun' == this.movement.currentWeapon.entity.name
            ? this.app.fire('Player:Speak', 'Shotgun', 1)
            : this.app.fire('Player:Speak', 'Weapon-Selection', 2),
          (this.lastWeapon = this.movement.currentWeapon.entity.name + ''))
        : Math.random() > 0.8 && this.app.fire('Player:Speak', 'Respawn', 3),
      this.onCameraReturn(!0),
      this.movement.enableMovement(),
      this.movement.setAmmoFull(),
      this.interface.showGameplay();
    var e = new pc.Vec3(t.position.x, t.position.y, t.position.z),
      a = 2 * Math.random() + 2,
      i = 2 * Math.random() + 2;
    if (e) {
      0 === e.x && 0 === e.y && 0 === e.z && (e = this.getSpawnPoint()),
        e || (e = new pc.Vec3(0, 0, 0)),
        e.add || (e = new pc.Vec3(0, 0, 0));
      var s = e.add(new pc.Vec3(a, 4, i)),
        o = t.rotation;
      (this.entity.rigidbody.linearVelocity = new pc.Vec3(0, 0, 0)),
        this.entity.rigidbody.teleport(s.x, s.y, s.z, 0, 0, 0),
        180 == o.x && 180 == o.z
          ? (this.movement.lookX = 90 - o.y)
          : (this.movement.lookX = o.y + 45);
    }
    fpsCamera.camera.postEffects.addEffect(bloom);
    this.lastRespawnDate = Date.now();
  };

  Player.prototype.onFinish = function () {
    fpsCamera.camera.postEffects.removeEffect(bloom);
    this.movement.disableMovement(),
      (this.isCardSelection = !1),
      (this.canBuy = !1),
      (this.isMapLoaded = !1);
  };

  Player.prototype.emote = function () {
    fpsCamera.camera.postEffects.removeEffect(bloom);
    fpsCamera.camera.postEffects.addEffect(bloom);
    if (this.isEmotePlaying) return !1;
    if (this.emoteTimeout) return !1;
    var t = this.danceName;
    (this.isEmotePlaying = !0),
      this.movement.disableMovement(),
      (this.characterHolder.enabled = !0),
      this.characterEntity.setLocalPosition(0, -2.15, 0),
      this.characterEntity.animation.play(t + '-Animation'),
      (this.characterEntity.animation.speed = 1),
      (this.characterEntity.animation.loop = !0),
      this.entity.sound.play('Emote'),
      setTimeout(
        function (t) {
          t.movement.lookEntity.enabled = !1;
        },
        100,
        this
      ),
      (this.characterCamera.script.blackWhite.enabled = !1),
      this.characterCamera.setLocalPosition(0, 1.215, -0.115),
      this.characterCamera
        .tween(this.characterCamera.getLocalPosition())
        .to(
          {
            x: 0,
            y: 3.015,
            z: 7,
          },
          1,
          pc.SineOut
        )
        .start(),
      this.characterCamera.setLocalEulerAngles(0, 0, 0),
      this.characterCamera
        .tween(this.characterCamera.getLocalEulerAngles())
        .rotate(
          {
            x: -18,
            y: 0,
            z: 0,
          },
          0.7,
          pc.BackOut
        )
        .start(),
      this.fireNetworkEvent('emote', t),
      setTimeout(
        function (t) {
          t.allowEmoteCancelation = !0;
        },
        1500,
        this
      ),
      (this.emoteTimeout = setTimeout(
        function (t) {
          t.finishEmote();
        },
        4500,
        this
      ));
    fpsCamera.camera.postEffects.removeEffect(bloom);
  };

  Player.prototype.finishEmote = function () {
    fpsCamera.camera.postEffects.removeEffect(bloom);
    if (!this.isEmotePlaying) return !1;
    this.isDeath ||
      (this.onCameraReturn(),
      clearTimeout(this.emoteTimeout),
      setTimeout(
        function (t) {
          (t.allowEmoteCancelation = !1),
            (t.emoteTimeout = !1),
            (t.isEmotePlaying = !1),
            t.movement.enableMovement();
        },
        400,
        this
      ));
    fpsCamera.camera.postEffects.addEffect(bloom);
  };
}

module.exports = {
  fixQuitLogic,
  allowSoloCustom,
  removeCastShadows,
  reduceJumpAnimIntensity,
  removeReminder,
  bloomFix,
};
