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

module.exports = {
  fixQuitLogic,
  allowSoloCustom,
  removeCastShadows,
  reduceJumpAnimIntensity,
  removeReminder,
};
