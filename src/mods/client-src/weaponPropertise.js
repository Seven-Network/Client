function weaponBalancing() {
  pc.app.on('Map:Loaded', () => {
    const ingameOverlay = pc.app.getEntityFromIndex(
      '9fcdea8c-ee29-403e-8e5b-0eddd1e548f6'
    );

    if (ingameOverlay) {
      const scarPropertise = pc.app.getEntityFromIndex(
        '00e8efa1-8e2a-4162-97a3-202b601757ca'
      );
      window.scarPropertise = scarPropertise;

      scarPropertise.script.weapon.capacity = 20;
      scarPropertise.script.weapon.ammo = 20;
      scarPropertise.script.weapon.shootTime = 0.08;
      scarPropertise.script.weapon.focusFov = 35;
      scarPropertise.script.weapon.focusSpread = 150;

      const shotgunPropertise = pc.app.getEntityFromIndex(
        '974afaa4-7d88-4fca-8d55-33a5527c2cf9'
      );
      window.shotgunPropertise = shotgunPropertise;

      shotgunPropertise.script.weapon.shootTime = 0.65;
      shotgunPropertise.script.weapon.damage = 8;
      shotgunPropertise.script.weapon.spread = 140;
      shotgunPropertise.script.weapon.cameraShake = 130;
      shotgunPropertise.script.weapon.focusFov = 50;
      shotgunPropertise.script.weapon.focusSpread = 70;

      const sniperPropertise = pc.app.getEntityFromIndex(
        'a92e3a56-d2cb-4d4a-8f97-047cd217b171'
      );
      window.sniperPropertise = sniperPropertise;

      sniperPropertise.script.weapon.capacity = 4;
      sniperPropertise.script.weapon.ammo = 4;
      sniperPropertise.script.weapon.focusFov = 20;
      sniperPropertise.script.weapon.focusSpread = 0;

      const tec9Propertise = pc.app.getEntityFromIndex(
        '952abbee-906a-45c8-b343-a33c07860148'
      );
      window.tec9Propertise = tec9Propertise;

      tec9Propertise.script.weapon.capacity = 15;
      tec9Propertise.script.weapon.ammo = 15;
      tec9Propertise.script.weapon.reloadingTime = 1.8;
      tec9Propertise.script.weapon.focusFov = 55;
      tec9Propertise.script.weapon.focusSpread = 325;

      const m4Propertise = pc.app.getEntityFromIndex(
        'b2510852-d387-4cfd-b568-81a01af8852f'
      );
      window.m4Propertise = m4Propertise;

      m4Propertise.script.weapon.capacity = 30;
      m4Propertise.script.weapon.ammo = 30;
      m4Propertise.script.weapon.shootTime = 0.05;
      m4Propertise.script.weapon.damage = 12;
      m4Propertise.script.weapon.spread = 600;
      m4Propertise.script.weapon.focusSpread = 400;

      const lmgPropertise = pc.app.getEntityFromIndex(
        '46f6693f-bbe6-48a7-b7fd-0c352d744e67'
      );
      window.lmgPropertise = lmgPropertise;

      lmgPropertise.script.weapon.capacity = 50;
      lmgPropertise.script.weapon.ammo = 50;
      lmgPropertise.script.weapon.shootTime = 0.05;
      lmgPropertise.script.weapon.reloadingTime = 4;
      lmgPropertise.script.weapon.damage = 10;
      lmgPropertise.script.weapon.cameraShake = 25;
      lmgPropertise.script.weapon.focusFov = 35;
      lmgPropertise.script.weapon.focusSpread = 350;

      const deaglePropertise = pc.app.getEntityFromIndex(
        '6da0a919-8f04-41d5-b3c5-1d67d97a0c0c'
      );
      window.deaglePropertise = deaglePropertise;

      deaglePropertise.script.weapon.capacity = 5;
      deaglePropertise.script.weapon.ammo = 5;
      deaglePropertise.script.weapon.shootTime = 0.32;
      deaglePropertise.script.weapon.cameraShake = 44;
      deaglePropertise.script.weapon.focusFov = 70;
      deaglePropertise.script.weapon.focusSpread = 1000;
    }
  });
}

module.exports = {
  weaponBalancing,
};
