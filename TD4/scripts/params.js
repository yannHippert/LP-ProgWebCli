const getQueryParams = () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  return params;
};

const handleParams = () => {
  const params = getQueryParams();
  try {
    if (params.size) {
      document.getElementById(
        `size${params.size}x${params.size}`
      ).checked = true;
    }
    if (params.mode) {
      document.getElementById(`${params.mode}-mode`).checked = true;
    }
    if (params.player1) {
      document.getElementById('player1Input').value = params.player1;
    }
    if (params.player2) {
      document.getElementById('player2Input').value = params.player2;
    }
  } catch (e) {
    console.error('You tampered with the paramameters!');
  }
};

const onLoad = () => {
  handleParams();
};

window.addEventListener('load', () => onLoad());
