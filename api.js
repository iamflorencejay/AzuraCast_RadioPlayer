function $$(e) {
    return document.getElementById(e)
}

function $(e, t) {
    return (t || document).querySelector(e)
}

function setAccentColor(e, t) {
    let a = new ColorThief;
    t.complete ? e.setAttribute("style", `--accent: rgb(${a.getColor(t)})`) : t.addEventListener("load", (function() {
        e.setAttribute("style", `--accent: rgb(${a.getColor(t)})`)
    }))
}

function setPlayerMeta(e, t) {
    let a = $(".song-cover", e),
        o = $(".song-title", e),
        n = $(".song-artist", e),
        l = $(".song-album", e);
        ol = $(".live-is_live", e);
        li = $(".live-streamer_name", e);
    a && (a.src = t.art), o && (o.innerText = t.title), n && (n.innerText = t.artist), l && (l.innerText = t.album), li && (li.innerText = t.streamer_name), ol && (ol.innerText = t.streamer_name)
}

function setScrollText() {
    document.querySelectorAll(".player-meta").forEach((e => {
        var t = $(".song-title", e),
            a = t.offsetWidth,
            o = e.offsetWidth;
        e.setAttribute("style", "--title-width:" + o + "px"), a > o ? t.classList.add("song-very-long") : t.classList.remove("song-very-long")
    }))
}

function setScrollForEmbed() {
    document.querySelectorAll(".embed-meta").forEach((e => {
        var t = $(".song-title", e),
            i = t.offsetWidth,
            d = e.offsetWidth;
        e.setAttribute("style", "--title-width:" + d + "px"), i > d ? t.classList.add("embed-very-long") : t.classList.remove("embed-very-long")
    }))
}


function setVolumeIcon(e) {
    e < 10 ? controlVolume.innerHTML = '<i class="fa-solid fa-volume-off"></i>' : e < 60 && e > 10 ? controlVolume.innerHTML = '<i class="fa-solid fa-volume-low"></i>' : e > 60 && (controlVolume.innerHTML = '<i class="fa-solid fa-volume-high"></i>')
}
const player = $(".player"),
    audioPlayer = $(".player-audio"),
    verticalVolume = $(".player-volume-toggle"),
    controlVolume = $(".player-volume-toggle-btn");
if (audioPlayer && audioPlayer.dataset.src) {
    const e = new Audio(audioPlayer.dataset.src);
    verticalVolume && controlVolume && (controlVolume.onclick = () => {
        verticalVolume.classList.toggle("is-active")
    });
    const t = $(".player-volume", audioPlayer);
    t.addEventListener("change", (function(t) {
        e.volume = t.currentTarget.value / 100, verticalVolume && controlVolume && setVolumeIcon(t.currentTarget.value), localStorage.setItem("player_vol", e.volume)
    }), !1);
    var getVolume = localStorage.getItem("player_vol");
    getVolume && (e.volume = getVolume, t.value = 100 * getVolume), verticalVolume && controlVolume && setVolumeIcon(t.value);
    var playBtn = $(".player-toggle", audioPlayer),
        playIcon = $(".i-play", audioPlayer),
        pauseIcon = $(".i-pause", audioPlayer);

    function setPlayStatus() {
        e.load(), player.classList.toggle("is-playing"), e.play(), playBtn.innerHTML = '<svg class="i i-pause" viewBox="0 0 24 24"><path d="M5 4h4v16H5Zm10 0h4v16h-4Z"></path></svg>'
    }

    function setPauseStatus() {
        player.classList.toggle("is-playing"), e.pause(), playBtn.innerHTML = '<svg class="i i-play" viewBox="0 0 24 24"><path d="m7 3 14 9-14 9z"></path></svg>'
    }
    "mediaSession" in navigator && (navigator.mediaSession.setActionHandler("play", (function() {
        setPlayStatus()
    })), navigator.mediaSession.setActionHandler("pause", (function() {
        setPauseStatus()
    }))), playBtn.addEventListener("click", (() => {
        e.paused ? setPlayStatus() : setPauseStatus()
    }), !1)
}
const boxplay = "https://talktalk.florencejaymunar.com/api/nowplaying_static/main.json";

function playerInit() {
    fetch(boxplay).then((e => e.json())).then((e => {
        let t = e.song_history,
            a = $$("playerHistory"),
            o = $(".song-now", player),
            n = $(".song-next", player),
            l = e.now_playing.remaining,
            s = $(".player-poster");
            olv = $(".live-is_live", player);
            liv = $(".live-streamer_name", player);
            art = $(".live-art", player);

        s && s.src && (s.crossOrigin = "Anonymous", s.src = "https://images.weserv.nl/?url=" + encodeURIComponent(e.now_playing.song.art), setAccentColor(document.body, s)), o && setPlayerMeta(o, e.now_playing.song), a && (a.innerHTML = createHistory(t, a.dataset.results || 5)), setScrollText(), "mediaSession" in navigator && (navigator.mediaSession.metadata = new MediaMetadata({
            title: e.now_playing.song.title,
            artist: e.now_playing.song.artist,
            album: e.now_playing.song.album,
            artwork: [{
                src: e.now_playing.song.art,
                sizes: "96x96",
                type: "image/png"
            }, {
                src: e.now_playing.song.art,
                sizes: "128x128",
                type: "image/png"
            }, {
                src: e.now_playing.song.art,
                sizes: "192x192",
                type: "image/png"
            }, {
                src: e.now_playing.song.art,
                sizes: "256x256",
                type: "image/png"
            }]
        })), setTimeout(playerInit, 1e1 * 5)

        if (e.live.is_live == true) {
            document.getElementById("radio-status").innerHTML = "LIVE:" + " " + e.live.streamer_name;
            document.getElementById("live-streamer-art").src = e.live.art;
            
        } else {
        document.getElementById("radio-status").innerHTML = "radio offline, on autodj mode";
        n && setPlayerMeta(n, e.playing_next.song);
        }

        
    })).catch((e => console.log(e)))
}
playerInit();

function navBar() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }