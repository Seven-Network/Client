function mapChanges() {
  pc.app.on('Map:Loaded', () => {
    console.clear(true);
    if (pc.currentMap == 'Sierra') {
      const sierraLight = pc.app.getEntityFromIndex(
        '3cdefb40-ae0d-439e-920f-a3fdef926ba3'
      );
      const waterBox1 = pc.app.getEntityFromIndex(
        'f8b358bf-a49a-473e-a9b0-373af8479d6f'
      );
      const waterBox2 = pc.app.getEntityFromIndex(
        '287b6307-179a-458b-8b86-c82c9c7e2f95'
      );
      const waterBox3 = pc.app.getEntityFromIndex(
        '92ec5368-140b-458d-9950-1a293003d30d'
      );
      const waterBox4 = pc.app.getEntityFromIndex(
        'fc6832e7-72fc-4995-bdac-719b29869249'
      );

      sierraLight.light.color = { r: 0.3, g: 0.1, b: 0.1, a: 1 };
      console.log('Changed Lighting');

      waterBox1.enabled = false;
      waterBox2.enabled = false;
      waterBox3.enabled = false;
      waterBox4.enabled = false;
      console.log('Changed Props');

      console.log('Found Map: Sierra');
    } else if (pc.currentMap == 'Xibalba') {
      pc.app.renderer.scene.exposure = 1;
      pc.app.renderer.scene.skyboxIntensity = 0.01;
      console.log('Changed Lighting');

      pc.app.renderer.scene.fogStart = 5;
      pc.app.renderer.scene.fog = 'linear';
      pc.app.renderer.scene.fogColor = { r: 0, g: 0, b: 0, a: 1 };
      pc.app.renderer.scene.fogEnd = 50;
      console.log('Added Fog');

      const xierraAmbient = pc.app.getEntityFromIndex(
        '97000aad-f0e6-4c25-957a-0c86e0380745'
      );
      xierraAmbient.sound.slots.Ambient.volume = 0
      console.log('Changed Sounds');

      console.log('Found Map: Xibalba');
    } else if (pc.currentMap == 'Mistle') {
      console.log('Found Map: Mistle');
    } else if (pc.currentMap == 'Tundra') {
      console.log('Found Map: Tundra');
    } else if (pc.currentMap == 'Temple') {
      pc.app.renderer.scene.skyboxIntensity = 20;
      pc.app.renderer.scene.fog = 'linear';
      pc.app.renderer.scene.fogStart = 0.01;
      pc.app.renderer.scene.fogEnd = 500;
      console.log('Added Fog');

      console.log('Found Map: Temple');
    } else {
      console.log('What fucking map is this...');
      console.log('Jenny. Help me. Im confused. NeXi broke me >.<');
    }
  });
}

module.exports = {
  mapChanges,
};
