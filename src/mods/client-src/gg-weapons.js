function modifyKeybinds() {
  Player.prototype.setKeyboard = function () {
    return (
      !pc.isFinished &&
      'INPUT' != document.activeElement.tagName &&
      !(
        !this.isCardSelection &&
        this.isMapLoaded &&
        ('GUNGAME' != pc.currentMode &&
          (this.app.keyboard.wasPressed(pc.KEY_1) && this.setWeapon('Scar'),
          this.app.keyboard.wasPressed(pc.KEY_2) && this.setWeapon('Shotgun'),
          this.app.keyboard.wasPressed(pc.KEY_3) && this.setWeapon('Sniper'),
          this.app.keyboard.wasPressed(pc.KEY_4) && this.setWeapon('Tec-9'),
          this.app.keyboard.wasPressed(pc.KEY_5) && this.setWeapon('M4'),
          this.app.keyboard.wasPressed(pc.KEY_6) && this.setWeapon('LMG'),
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
  };
}

function addWeaponsToMainMenuSelector() {
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
    34217430,
    34217431,
    34217435,
    36674698,
    36674696,
    36674697,
  ];
}

function addWeaponsToMainMenuScene() {
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

function removeCircularWeaponSelector() {
  (Overlay.prototype.clearCircularMenu = function () {
    for (var t = this.circularItems.length; t--; )
      this.circularItems[t].destroy();
    (this.circularItems = []), (this.circularItemsList = []);
  }),
    (Overlay.prototype.showSmallBanner = function (t) {}),
    (Overlay.prototype.triggerSmallBanner = function (t) {}),
    (Overlay.prototype.onCircularMenu = function (t) {
      if ((this.clearCircularMenu(), 'GUNGAME' == pc.currentMode)) return !1;
      (this.circularEntity.enabled = !1), (this.circularPiece.enabled = !1);
      var e = 0,
        i = 23.15 * t.length;
      for (var a in t) {
        var n = t[a],
          s = this.app.assets.find(n + '-Thumbnail-White.png'),
          o = parseInt(a),
          l = 0.1 * o,
          r = this.circularPiece.clone();
        r.setLocalScale(0.5, 0.5, 0.5),
          (r.findByName('Key').element.text = o + 1 + ''),
          (r.findByName('Icon').element.textureAsset = s),
          r.findByName('Icon').setLocalEulerAngles(0, 0, -e - i),
          r.setLocalEulerAngles(0, 0, e),
          r
            .tween(r.getLocalScale())
            .to({ x: 1.1, y: 1.1, z: 1.1 }, 0.35 + l, pc.BackOut)
            .delay(l)
            .start(),
          setTimeout(
            function (t, e) {
              (e.enabled = !0), t.entity.sound.play('Whoosh');
            },
            1e3 * l,
            this,
            r
          ),
          this.circularHolder.addChild(r),
          this.circularItems.push(r),
          this.circularItemsList.push(n),
          (e -= 62);
      }
      this.circularHolder.setLocalEulerAngles(0, 0, i),
        (this.circularSpinner.enabled = !0),
        this.circularEntity.setLocalPosition(0, -300, 0),
        this.circularEntity
          .tween(this.circularEntity.getLocalPosition())
          .to({ x: 0, y: 55, z: 0 }, 0.5, pc.BackOut)
          .start(),
        setTimeout(
          function (t) {
            t.hideCircularMenu();
          },
          3500,
          this
        );
    });
}

function weaponSelectionFix() {
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

module.exports = {
  modifyKeybinds,
  addWeaponsToMainMenuSelector,
  addWeaponsToMainMenuScene,
  removeCircularWeaponSelector,
  weaponSelectionFix,
};
