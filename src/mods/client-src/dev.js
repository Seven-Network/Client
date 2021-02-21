const HTML_MARKUP = `
<div id="snc-dev-wrapper" class="snc-join-wrapper">
  <div id="snc-dev" class="snc-join">
    <button onclick="useLocalServers()" id="use-local-servers-button" class="join-game-button">
      Use Local Servers
    </button>
    <button onclick="useTestServers()" id="use-test-servers-button" class="join-game-button">
      Use Test Servers
    </button>
  </div>
</div>
`;

function initialize() {
  const div = document.createElement('div');
  div.innerHTML = HTML_MARKUP;
  document.body.appendChild(div);

  const sncDevElement = document.getElementById('snc-dev');
  const sncDevWrapperElement = document.getElementById('snc-dev-wrapper');
  const useLocalServerElement = document.getElementById(
    'use-local-servers-button'
  );
  const useTestServerElement = document.getElementById(
    'use-test-servers-button'
  );

  var devPanelEnabled = false;

  sncDevWrapperElement.style.display = 'none';

  window.enableDevPanel = function () {
    devPanelEnabled = true;
    sncDevWrapperElement.style.display = 'flex';
    sncDevElement.classList.add('snc-enter');
    sncDevWrapperElement.classList.add('snc-fade-in');
    setTimeout(() => {
      sncDevElement.classList.remove('snc-enter');
      sncDevWrapperElement.classList.remove('snc-fade-in');
    }, 500);
  };

  window.disableDevPanel = function () {
    devPanelEnabled = false;
    sncDevElement.classList.add('snc-leave');
    sncDevWrapperElement.classList.add('snc-fade-out');
    setTimeout(() => {
      sncDevElement.classList.remove('snc-leave');
      sncDevWrapperElement.classList.remove('snc-fade-out');
      sncDevWrapperElement.style.display = 'none';
    }, 500);
  };

  window.toggleDevPanel = function () {
    devPanelEnabled ? disableDevPanel() : enableDevPanel();
  };

  window.useLocalServers = function () {
    if (localStorage.getItem('useLocalServer') == '1') {
      localStorage.setItem('useLocalServer', '0');
      useLocalServerElement.innerHTML = 'Use Local Servers';
    } else {
      localStorage.setItem('useLocalServer', '1');
      useLocalServerElement.innerHTML = 'Do Not Use Local Servers';
    }
  };

  window.useTestServers = function () {
    if (localStorage.getItem('useTestServer') == '1') {
      localStorage.setItem('useTestServer', '0');
      useTestServerElement.innerHTML = 'Use Test Servers';
    } else {
      localStorage.setItem('useTestServer', '1');
      useTestServerElement.innerHTML = 'Do Not Use Test Servers';
    }
  };

  if (localStorage.getItem('useLocalServer') == '1') {
    useLocalServerElement.innerHTML = 'Do Not Use Local Servers';
  }

  if (localStorage.getItem('useTestServer') == '1') {
    useTestServerElement.innerHTML = 'Do Not Use Test Servers';
  }
}

module.exports = {
  initialize,
};
