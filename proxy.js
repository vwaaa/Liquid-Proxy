import fetch from "node-fetch";
import http from "http";
import { URL } from "url";

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Site</title>

<style>
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    min-height: 100vh;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  body::before {
    content: "";
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.45);
    z-index: -1;
  }

  /* GLASS NAVBAR */
  .top-bar {
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 15px 25px;
    flex-wrap: wrap;
    background: rgba(20,20,20,0.45);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-bottom: 1px solid rgba(255,255,255,0.15);
  }

  /* BUTTONS */
  .btn,
  .fullscreen-btn,
  .redirect,
  .music-btn,
  .settings-btn {
    padding: 10px 22px;
    border-radius: 999px;
    border: 1px solid black;
    background: rgba(255,255,255,0.75);
    color: black;
    cursor: pointer;
    text-decoration: none;
    white-space: nowrap;
  }

  .btn:hover,
  .fullscreen-btn:hover,
  .redirect:hover,
  .music-btn:hover,
  .settings-btn:hover {
    background: rgba(255,255,255,0.95);
  }

  /* PAGES */
  .page {
    display: none;
    padding: 40px;
    color: white;
  }

  #proxy:target,
  #links:target,
  #music:target,
  #games:target,
  #wither:target,
  #settings:target {
    display: block;
  }

  /* IFRAMES */
  .iframe-wrap {
    width: 100%;
    height: 75vh;
    margin-top: 15px;
  }

  iframe {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 20px;
    background: white;
  }

  /* SETTINGS */
  .settings-box {
    max-width: 400px;
    background: rgba(0,0,0,0.4);
    padding: 20px;
    border-radius: 20px;
    backdrop-filter: blur(10px);
  }
</style>
</head>
<body>

<!-- NAV -->
<div class="top-bar">
  <a href="#proxy" class="btn">Proxy</a>
  <a href="#links" class="btn">Links</a>
  <a href="#music" class="btn">Music</a>
  <a href="#games" class="btn">Games</a>
  <a href="#wither" class="btn">Wither</a>
  <a href="#settings" class="settings-btn">⚙️ Settings</a>
</div>

<!-- PROXY -->
<div id="proxy" class="page">
  <h1>Proxy</h1>
  <button class="fullscreen-btn" onclick="goFullscreen('proxyFrame')">Fullscreen</button>
  <div class="iframe-wrap">
    <iframe id="proxyFrame" src="https://ixl.greenfieldhk.org/"></iframe>
  </div>
</div>

<!-- LINKS -->
<div id="links" class="page">
  <h1>Links</h1>
  <a class="redirect" href="#">Placeholder</a>
</div>

<!-- MUSIC -->
<div id="music" class="page">
  <h1>Music</h1>
  <button class="music-btn" onclick="toggleMusic()">Music On / Off</button>
</div>

<!-- GAMES -->
<div id="games" class="page">
  <h1>Games</h1>
  <button class="fullscreen-btn" onclick="goFullscreen('gamesFrame')">Fullscreen</button>
  <div class="iframe-wrap">
    <iframe id="gamesFrame" src="https://www.cloudmoonapp.com"></iframe>
  </div>
</div>

<!-- WITHER -->
<div id="wither" class="page">
  <h1>Wither</h1>
  <button class="fullscreen-btn" onclick="goFullscreen('witherFrame')">Fullscreen</button>
  <div class="iframe-wrap">
    <iframe id="witherFrame" src="https://wither.lat"></iframe>
  </div>
</div>

<!-- SETTINGS -->
<div id="settings" class="page">
  <h1>Settings</h1>
  <div class="settings-box">
    <p>Set background image (.png .jpg .jpeg .gif)</p>
    <input type="file" accept="image/png,image/jpeg,image/gif" onchange="setBackground(this)">
    <br><br>
    <button class="btn" onclick="resetBackground()">Reset Background</button>
  </div>
</div>

<!-- SPOTIFY -->
<iframe
  id="bgMusic"
  src="https://open.spotify.com/embed/track/6qXGfKR1JHtH18PbT15k6F?autoplay=1"
  width="0" height="0"
  style="border:none; opacity:0; pointer-events:none;"
  allow="autoplay; encrypted-media">
</iframe>

<script>
  // BACKGROUND
  const savedBg = localStorage.getItem("bgImage");
  if (savedBg) document.body.style.backgroundImage = `url(${savedBg})`;

  function setBackground(input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      document.body.style.backgroundImage = `url(${reader.result})`;
      localStorage.setItem("bgImage", reader.result);
    };
    reader.readAsDataURL(file);
  }

  function resetBackground() {
    document.body.style.backgroundImage = "";
    localStorage.removeItem("bgImage");
  }

  // MUSIC
  let musicOn = true;
  function toggleMusic() {
    const iframe = document.getElementById("bgMusic");
    iframe.style.display = musicOn ? "none" : "block";
    musicOn = !musicOn;
  }

  // FULLSCREEN
  function goFullscreen(id) {
    const el = document.getElementById(id);
    if (el.requestFullscreen) el.requestFullscreen();
    document.getElementById("bgMusic").style.display = "none";
  }
</script>

</body>
</html>`;
