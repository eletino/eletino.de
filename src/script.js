const btn = document.querySelector(".btn-toggle");
const theme = document.documentElement;


function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for(let i=0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function loadTheme() {
  let savedTheme = getCookie("theme");
  if (!savedTheme) {
    const prefersDark = window.matchMedia("(prefers-color-scheme:dark)").matches;
    savedTheme = prefersDark ? "dark" : "light";
  }
  applyTheme(savedTheme);
}

function applyTheme(mode) {
  if (mode === "dark") {
    theme.setAttribute('data-bs-theme', 'dark');
        btn.innerHTML = "<svg height='24px' viewBox='0 -960 960 960' width='24px' fill='#e3e3e3'><path d='M450-770v-150h60v150h-60Zm256 106-42-42 106-107 42 43-106 106Zm64 214v-60h150v60H770ZM450-40v-150h60v150h-60ZM253-665 148-770l42-42 106 106-43 41Zm518 517L664-254l41-41 108 104-42 43ZM40-450v-60h150v60H40Zm151 302-43-42 105-105 22 20 22 21-106 106Zm289-92q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-60q75 0 127.5-52.5T660-480q0-75-52.5-127.5T480-660q-75 0-127.5 52.5T300-480q0 75 52.5 127.5T480-300Zm0-180Z'/></svg>";
    btn.title = "Switch to Light Mode";
    setCookie("theme", "dark", 365);
  } else {
    theme.setAttribute('data-bs-theme', 'light')
        btn.innerHTML = "<svg height='24px' viewBox='0 -960 960 960' width='24px' fill='#171717ff'><path d='M484-80q-84 0-157.5-32t-128-86.5Q144-253 112-326.5T80-484q0-146 93-257.5T410-880q-18 98 11 192.63 29 94.64 100 165.74 71 71.1 165.5 100.14Q781-392.45 880-410.47q-26 144.2-138 237.34Q630-80 484-80Zm0-60q100 0 182-57t132-145q-90-8-173-41.5T478.5-480Q415-543 382-625.5T341-797q-88 48-144.5 130.5T140-484q0 143.33 100.33 243.67Q340.67-140 484-140Zm-6-340Z'/></svg>";
    btn.title = "Switch to Dark Mode";
    setCookie("theme", "light", 365);
  }
}

btn.addEventListener("click", () => {
  const current = theme.getAttribute("data-bs-theme");
  applyTheme(current === "light" ? "dark" : "light");
});


loadTheme();
