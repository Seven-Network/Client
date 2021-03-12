function weaponBalancing() {
  pc.app.on('Map:Loaded', () => {
    const ingameOverlay = pc.app.getEntityFromIndex(
      '9fcdea8c-ee29-403e-8e5b-0eddd1e548f6'
    );

    if (ingameOverlay) {
      const scarPropertise = pc.app.getEntityFromIndex(
        '00e8efa1-8e2a-4162-97a3-202b601757ca'
      );

      scarPropertise.script.weapon.capacity = 20;
      scarPropertise.script.weapon.ammo = 20;
      scarPropertise.script.weapon.spread = 1500;
      scarPropertise.script.weapon.shootTime = 0.1;
      scarPropertise.script.weapon.focusFov = 35;
      scarPropertise.script.weapon.focusSpread = 150;

      const shotgunPropertise = pc.app.getEntityFromIndex(
        '974afaa4-7d88-4fca-8d55-33a5527c2cf9'
      );

      shotgunPropertise.script.weapon.shootTime = 0.65;
      shotgunPropertise.script.weapon.damage = 8;
      shotgunPropertise.script.weapon.spread = 140;
      shotgunPropertise.script.weapon.cameraShake = 130;
      shotgunPropertise.script.weapon.focusFov = 50;
      shotgunPropertise.script.weapon.focusSpread = 70;

      const sniperPropertise = pc.app.getEntityFromIndex(
        'a92e3a56-d2cb-4d4a-8f97-047cd217b171'
      );

      sniperPropertise.script.weapon.capacity = 4;
      sniperPropertise.script.weapon.ammo = 4;
      sniperPropertise.script.weapon.focusFov = 22.5;
      sniperPropertise.script.weapon.focusSpread = 0;

      const sniperLens = pc.app.getEntityFromIndex(
        'b655ed04-9844-4957-a03c-1756b25bda05'
      );
      sniperLens.enabled = false;

      const tec9Propertise = pc.app.getEntityFromIndex(
        '952abbee-906a-45c8-b343-a33c07860148'
      );

      tec9Propertise.script.weapon.capacity = 25;
      tec9Propertise.script.weapon.ammo = 25;
      tec9Propertise.script.weapon.shootTime = 0.06;
      tec9Propertise.script.weapon.damage = 10;
      tec9Propertise.script.weapon.reloadingTime = 1.8;
      tec9Propertise.script.weapon.cameraShake = 22;
      tec9Propertise.script.weapon.focusFov = 47.5;
      tec9Propertise.script.weapon.focusSpread = 325;

      const m4Propertise = pc.app.getEntityFromIndex(
        'b2510852-d387-4cfd-b568-81a01af8852f'
      );

      m4Propertise.script.weapon.capacity = 30;
      m4Propertise.script.weapon.ammo = 30;
      m4Propertise.script.weapon.shootTime = 0.05;
      m4Propertise.script.weapon.damage = 11;
      m4Propertise.script.weapon.cameraShake = 16;
      m4Propertise.script.weapon.spread = 700;
      m4Propertise.script.weapon.focusSpread = 600;

      const lmgPropertise = pc.app.getEntityFromIndex(
        '46f6693f-bbe6-48a7-b7fd-0c352d744e67'
      );

      lmgPropertise.script.weapon.capacity = 50;
      lmgPropertise.script.weapon.ammo = 50;
      lmgPropertise.script.weapon.shootTime = 0.05;
      lmgPropertise.script.weapon.reloadingTime = 4;
      lmgPropertise.script.weapon.damage = 12;
      lmgPropertise.script.weapon.cameraShake = 25;
      lmgPropertise.script.weapon.focusFov = 35;
      lmgPropertise.script.weapon.focusSpread = 350;

      const deaglePropertise = pc.app.getEntityFromIndex(
        '6da0a919-8f04-41d5-b3c5-1d67d97a0c0c'
      );

      deaglePropertise.script.weapon.capacity = 7;
      deaglePropertise.script.weapon.ammo = 7;
      deaglePropertise.script.weapon.shootTime = 0.32;
      deaglePropertise.script.weapon.cameraShake = 52;
      deaglePropertise.script.weapon.focusFov = 45;
      deaglePropertise.script.weapon.focusSpread = 600;
    }
  });
}

function weaponModels() {
  pc.app.on('Map:Loaded', () => {
    const ingameOverlay = pc.app.getEntityFromIndex(
      '9fcdea8c-ee29-403e-8e5b-0eddd1e548f6'
    );

    if (ingameOverlay) {
      const weaponManager = pc.app.getEntityFromIndex(
        'd6311a5c-7dec-4eb4-b495-15f29130570e'
      );

      const modifyViewmodel = pc.app.getEntityFromIndex(
        '63cc6332-bf3e-4da6-a11b-c467bead28a4'
      );

      const LeftArm = pc.app.getEntityFromIndex(
        'c112a26d-22a6-468a-82d6-b3b600b07bc5'
      );

      const RightArm = pc.app.getEntityFromIndex(
        '8b07a182-402b-4af9-a2d7-ec35be35d50f'
      );

      const LeftHand = pc.app.getEntityFromIndex(
        'e675b0b3-553a-4525-ba47-5ed2219b3d1b'
      );

      const RightHand = pc.app.getEntityFromIndex(
        '8b07a182-402b-4af9-a2d7-ec35be35d50f'
      );

      this.currentWeapon = weaponManager.script.weaponManager.currentWeapon;

      if (this.currentWeapon.capacity == 25) {
        //Tec-9 = AK-74u

        const tec9Propertise = pc.app.getEntityFromIndex(
          '952abbee-906a-45c8-b343-a33c07860148'
        );

        const LeftArm = pc.app.getEntityFromIndex(
          'c112a26d-22a6-468a-82d6-b3b600b07bc5'
        );

        const RightArm = pc.app.getEntityFromIndex(
          '8b07a182-402b-4af9-a2d7-ec35be35d50f'
        );

        const LeftHand = pc.app.getEntityFromIndex(
          'e675b0b3-553a-4525-ba47-5ed2219b3d1b'
        );

        const RightHand = pc.app.getEntityFromIndex(
          '8b07a182-402b-4af9-a2d7-ec35be35d50f'
        );

        tec9Propertise.setLocalScale(0.8, 1, 1);
        modifyViewmodel.localPosition = { x: 0.35, y: 0.65, z: -0.45 };
        RightHand.setLocalPosition(-0.2, 0.03, 0.06);
        LeftHand.setLocalPosition(-0.22, 0.12, 0);
        LeftArm.setLocalPosition(-0.22, 0.12, 0);
      } else if (this.currentWeapon.capacity == 20) {
        //Scar = AK-47

        const scarPropertise = pc.app.getEntityFromIndex(
          '00e8efa1-8e2a-4162-97a3-202b601757ca'
        );

        const LeftArm = pc.app.getEntityFromIndex(
          'c112a26d-22a6-468a-82d6-b3b600b07bc5'
        );

        const RightArm = pc.app.getEntityFromIndex(
          '8b07a182-402b-4af9-a2d7-ec35be35d50f'
        );

        const LeftHand = pc.app.getEntityFromIndex(
          'e675b0b3-553a-4525-ba47-5ed2219b3d1b'
        );

        const RightHand = pc.app.getEntityFromIndex(
          '8b07a182-402b-4af9-a2d7-ec35be35d50f'
        );

        modifyViewmodel.localPosition = { x: 0.55, y: 0.56, z: -0.66 };
        LeftHand.setLocalPosition(-0.03, 0.03, -0.02);
        LeftArm.setLocalPosition(-0.03, 0.03, -0.02);
      } else if (this.currentWeapon.capacity == 4) {
        //Sniper - Intervention

        const sniperPropertise = pc.app.getEntityFromIndex(
          'a92e3a56-d2cb-4d4a-8f97-047cd217b171'
        );

        const LeftArm = pc.app.getEntityFromIndex(
          'c112a26d-22a6-468a-82d6-b3b600b07bc5'
        );

        const RightArm = pc.app.getEntityFromIndex(
          '8b07a182-402b-4af9-a2d7-ec35be35d50f'
        );

        const LeftHand = pc.app.getEntityFromIndex(
          'e675b0b3-553a-4525-ba47-5ed2219b3d1b'
        );

        const RightHand = pc.app.getEntityFromIndex(
          '8b07a182-402b-4af9-a2d7-ec35be35d50f'
        );

        modifyViewmodel.localPosition = { x: 0.55, y: 0.56, z: -0.66 };
        LeftHand.setLocalPosition(-0.03, 0.03, -0.02);
        LeftArm.setLocalPosition(-0.03, 0.03, -0.02);
      }
      else if (this.currentWeapon.capacity == 7) {
        //Desert-Eagle = Deagle-Eagle Silenced
        const deaglePropertise = pc.app.getEntityFromIndex(
          '6da0a919-8f04-41d5-b3c5-1d67d97a0c0c'
        );

        const RightArm = pc.app.getEntityFromIndex(
          '8b07a182-402b-4af9-a2d7-ec35be35d50f'
        );

        const RightHand = pc.app.getEntityFromIndex(
          '8b07a182-402b-4af9-a2d7-ec35be35d50f'
        );

        RightHand.setLocalPosition(0.12, 0.02, -0.01)
        RightHand.setLocalPosition(0.12, 0.02, -0.01)
        modifyViewmodel.localPosition = { x: 0.30, y: 0.68, z: -0.60 };
        RightHand.setLocalScale(1.6, 1.0, 1.2)
        RightArm.setLocalScale(1.6, 1.0, 1.2)
        deaglePropertise.children[2].enabled = false

      }

      Movement.prototype.setCurrentWeapon = function () {
        (this.currentWeapon = this.entity.script.weaponManager.currentWeapon),
          (this.currentWeapon.player = this.entity),
          this.takeout(),
          (this.interface.capacityEntity.element.text =
            this.currentWeapon.capacity + '');
        window.currentWeapon = this.entity.script.weaponManager.currentWeapon;

        const LeftArm = pc.app.getEntityFromIndex(
          'c112a26d-22a6-468a-82d6-b3b600b07bc5'
        );

        const RightArm = pc.app.getEntityFromIndex(
          '8b07a182-402b-4af9-a2d7-ec35be35d50f'
        );

        const LeftHand = pc.app.getEntityFromIndex(
          'e675b0b3-553a-4525-ba47-5ed2219b3d1b'
        );

        const RightHand = pc.app.getEntityFromIndex(
          '8b07a182-402b-4af9-a2d7-ec35be35d50f'
        );

        if (this.currentWeapon.capacity == 25) {
          //Tec-9 = AK-74u

          const tec9Propertise = pc.app.getEntityFromIndex(
            '952abbee-906a-45c8-b343-a33c07860148'
          );

          const LeftArm = pc.app.getEntityFromIndex(
            'c112a26d-22a6-468a-82d6-b3b600b07bc5'
          );

          const RightArm = pc.app.getEntityFromIndex(
            '8b07a182-402b-4af9-a2d7-ec35be35d50f'
          );

          const LeftHand = pc.app.getEntityFromIndex(
            'e675b0b3-553a-4525-ba47-5ed2219b3d1b'
          );

          const RightHand = pc.app.getEntityFromIndex(
            '8b07a182-402b-4af9-a2d7-ec35be35d50f'
          );

          tec9Propertise.setLocalScale(0.8, 1, 1);
          modifyViewmodel.localPosition = { x: 0.35, y: 0.65, z: -0.45 };
          RightHand.setLocalPosition(-0.2, 0.03, 0.06);
          LeftHand.setLocalPosition(-0.22, 0.12, 0);
          LeftArm.setLocalPosition(-0.22, 0.12, 0);
        } else if (this.currentWeapon.capacity == 20) {
          //Scar = AK-47

          const scarPropertise = pc.app.getEntityFromIndex(
            '00e8efa1-8e2a-4162-97a3-202b601757ca'
          );

          const LeftArm = pc.app.getEntityFromIndex(
            'c112a26d-22a6-468a-82d6-b3b600b07bc5'
          );

          const RightArm = pc.app.getEntityFromIndex(
            '8b07a182-402b-4af9-a2d7-ec35be35d50f'
          );

          const LeftHand = pc.app.getEntityFromIndex(
            'e675b0b3-553a-4525-ba47-5ed2219b3d1b'
          );

          const RightHand = pc.app.getEntityFromIndex(
            '8b07a182-402b-4af9-a2d7-ec35be35d50f'
          );

          modifyViewmodel.localPosition = { x: 0.55, y: 0.56, z: -0.66 };
          LeftHand.setLocalPosition(-0.03, 0.03, -0.02);
          LeftArm.setLocalPosition(-0.03, 0.03, -0.02);
        } else if (this.currentWeapon.capacity == 4) {
          //Sniper - Intervention

          const sniperPropertise = pc.app.getEntityFromIndex(
            'a92e3a56-d2cb-4d4a-8f97-047cd217b171'
          );

          const LeftArm = pc.app.getEntityFromIndex(
            'c112a26d-22a6-468a-82d6-b3b600b07bc5'
          );

          const RightArm = pc.app.getEntityFromIndex(
            '8b07a182-402b-4af9-a2d7-ec35be35d50f'
          );

          const LeftHand = pc.app.getEntityFromIndex(
            'e675b0b3-553a-4525-ba47-5ed2219b3d1b'
          );

          const RightHand = pc.app.getEntityFromIndex(
            '8b07a182-402b-4af9-a2d7-ec35be35d50f'
          );

          modifyViewmodel.localPosition = { x: 0.55, y: 0.56, z: -0.66 };
          LeftHand.setLocalPosition(-0.03, 0.03, -0.02);
          LeftArm.setLocalPosition(-0.03, 0.03, -0.02);
        }
        else if (this.currentWeapon.capacity == 7) {
          //Desert-Eagle = Deagle-Eagle Silenced
          const deaglePropertise = pc.app.getEntityFromIndex(
            '6da0a919-8f04-41d5-b3c5-1d67d97a0c0c'
          );

          const RightArm = pc.app.getEntityFromIndex(
            '8b07a182-402b-4af9-a2d7-ec35be35d50f'
          );

          const RightHand = pc.app.getEntityFromIndex(
            '8b07a182-402b-4af9-a2d7-ec35be35d50f'
          );

          RightHand.setLocalPosition(0.12, 0.02, -0.01)
          RightHand.setLocalPosition(0.12, 0.02, -0.01)
          modifyViewmodel.localPosition = { x: 0.30, y: 0.68, z: -0.60 };
          RightHand.setLocalScale(1.6, 1.0, 1.2)
          RightArm.setLocalScale(1.6, 1.0, 1.2)
          deaglePropertise.children[2].enabled = false

        }
      };
    }
  });
}

module.exports = {
  weaponBalancing,
  weaponModels,
};
