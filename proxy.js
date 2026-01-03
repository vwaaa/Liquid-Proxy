import fetch from "node-fetch";
import http from "http";
import { URL } from "url";

/* =========================
   HTML UI
========================= */
const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Liquid Proxy</title>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
}
body::before {
  content: "";
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  z-index: -1;
}
.top-bar {
  position: sticky;
  top: 0;
  display: flex;
  gap: 10px;
  padding: 15px;
  background: rgba(20,20,20,0.5);
  backdrop-filter: blur(14px);
}
.btn {
  padding: 10px 20px;
  border: 1px solid black;
  background: rgba(255,255,255,0.8);
  color: black;
  cursor: pointer;
  border-radius: 20px;
}
.page { display: none; padding: 25px; }
#proxy:target,
#games:target,
#music:target,
#settings:target,
#wither:target { display: block; }
iframe {
  width: 100%;
  height: 75vh;
  border: none;
  border-radius: 20px;
  background: white;
}
input {
  padding: 10px;
  width: 100%;
  border-radius: 10px;
  border: none;
}
</style>
</head>

<body>

<div class="top-bar">
  <a href="#proxy" class="btn">Proxy</a>
  <a href="#games" class="btn">Games</a>
  <a href="#wither" class="btn">Minecraft</a>
  <a href="#music" class="btn">Music</a>
  <a href="#settings" class="btn">⚙ Settings</a>
</div>

<div id="proxy" class="page">
  <h2>Proxy</h2>
  <input id="urlInput" placeholder="Enter URL or search">
  <br><br>
  <button class="btn" onclick="go()">Go</button>
  <iframe id="proxyFrame"></iframe>
</div>

<div id="games" class="page">
  <h2>Games</h2>
  <iframe src="https://wither.lat"></iframe>
</div>

<div id="wither" class="page">
  <h2>Minecraft</h2>
  <iframe src="https://astraclient.com"></iframe>
</div>

<div id="music" class="page">
  <h2>Spotify</h2>
  <input id="spotifyInput" placeholder="Paste Spotify playlist link">
  <br><br>
  <button class="btn" onclick="playSpotify()">Play</button>
  <iframe id="spotifyFrame" width="300" height="380" allow="autoplay; encrypted-media"></iframe>
</div>

<div id="settings" class="page">
  <h2>Background</h2>
  <input type="file" accept="image/png,image/jpeg,image/gif" onchange="setBg(this)">
</div>

<script>
function normalizeUrl(input) {
  if (input.startsWith("http")) return input;
  if (input.includes(".")) return "https://" + input;
  return "https://www.google.com/search?q=" + encodeURIComponent(input);
}

function go() {
  const input = document.getElementById("urlInput").value;
  const url = normalizeUrl(input);
  document.getElementById("proxyFrame").src =
    "/proxy?url=" + encodeURIComponent(url);
}

function
