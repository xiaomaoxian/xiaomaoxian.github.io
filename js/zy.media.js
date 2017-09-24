!
function() {
    function b(a, b) {
        return parseInt(a.style[b] || getComputedStyle(a, null).getPropertyValue(b))
    }
    function c(a, b) {
        return new RegExp("(\\s|^)" + b + "(\\s|$)").test(a.className)
    }
    function d(a, b) {
        a.classList ? a.classList.add(b) : c(a, b) || (a.className += "" + b)
    }
    function e(a, b) {
        a.classList ? a.classList.remove(b) : c(a, b) && (a.className = a.className.replace(new RegExp("(\\s|^)" + b + "(\\s|$)"), " ").replace(/^\s+|\s+$/g, ""))
    }
    function f(a, b) { (!isFinite(a) || 0 > a) && (a = 0);
        var c = b.alwaysShowHours ? [0] : [];
        return Math.floor(a / 3600) % 24 && c.push(Math.floor(a / 3600) % 24),
        c.push(Math.floor(a / 60) % 60),
        c.push(Math.floor(a % 60)),
        c = c.join(":"),
        1 == b.timeFormatType && (c = c.replace(/(:|^)([0-9])(?=:|$)/g, "$10$2")),
        c
    }
    function g() {
        return document.fullscreenElement || document.mozFullScreen || document.webkitIsFullScreen
    }
    function h(a) {
        var b, c;
        switch (a = a.toLowerCase().split("?")[0], b = a.substring(a.lastIndexOf(".") + 1), c = /mp4|m4v|ogg|ogv|m3u8|webm|webmv|wmv|mpeg|mov/gi.test(b) ? "video/": "audio/", b) {
        case "mp4":
        case "m4v":
        case "m4a":
            return c + "mp4";
        case "webm":
        case "webma":
        case "webmv":
            return c + "webm";
        case "ogg":
        case "oga":
        case "ogv":
            return c + "ogg";
        case "m3u8":
            return "application/x-mpegurl";
        case "ts":
            return c + "mp2t";
        default:
            return c + b
        }
    }
    function i(a, b) {
        return a && !b ? h(a) : b && ~b.indexOf(";") ? b.substr(0, b.indexOf(";")) : b
    }
    function j(b, c, d) {
        var f, g, h, e = [];
        if (c.type) if ("string" == typeof c.type) e.push({
            type: c.type,
            url: d
        });
        else for (f = 0; f < c.type.length; f++) e.push({
            type: c.type[f],
            url: d
        });
        else if (null !== d) e.push({
            type: i(d, b.getAttribute("type")),
            url: d
        });
        else for (f = 0; f < b.children.length; f++) g = b.children[f],
        1 == g.nodeType && "source" == g.tagName.toLowerCase() && (d = g.getAttribute("src"), e.push({
            type: i(d, g.getAttribute("type")),
            url: d
        }));
        if (a.features.isBustedAndroid && (b.canPlayType = function(a) {
            return /video\/(mp4|m4v)/i.test(a) ? "maybe": ""
        }), a.features.isChromium && (b.canPlayType = function(a) {
            return /video\/(webm|ogv|ogg)/i.test(a) ? "maybe": ""
        }), a.features.supportsCanPlayType) for (f = 0; f < e.length; f++) if ("video/m3u8" == e[f].type || "" !== b.canPlayType(e[f].type).replace(/no/, "") || "" !== b.canPlayType(e[f].type.replace(/mp3/, "mpeg")).replace(/no/, "") || "" !== b.canPlayType(e[f].type.replace(/m4a/, "mp4")).replace(/no/, "")) {
            h = !0;
            break
        }
        return h
    }
    var k, a = {};
    a.config = {
        type: "",
        mediaTitle: "",
        nativeControls: !1,
        autoplay: !1,
        preload: "none",
        videoWidth: "100%",
        videoHeight: "auto",
        aspectRation: 16 / 9,
        audioWidth: "100%",
        audioHeight: 44,
        autoLoop: !1,
        timeFormatType: 1,
        alwaysShowHours: !1,
        alwaysShowControls: !1,
        hideVideoControlsOnLoad: !1,
        enableFullscreen: !0,
        pauseOtherPlayers: !0,
        duration: 0,
        success: null,
        error: null
    },
    function(a) {
        var b = window.navigator.userAgent.toLowerCase(),
        c = document.createElement("video");
        a.isiOS = /iphone|ipod|ipad/i.test(b) && !window.MSStream,
        a.isAndroid = /android/i.test(b) && !window.MSStream,
        a.isBustedAndroid = /android 2\.[12]/i.test(b),
        a.isChromium = /chromium/i.test(b),
        a.hasTouch = "ontouchstart" in window,
        a.supportsCanPlayType = "undefined" != typeof c.canPlayType,
        a.isVendorBigPlay = /iphone/i.test(b) && !window.MSStream,
        a.isVendorControls = /baidu/i.test(b),
        a.isVendorFullscreen = /micromessenger|weibo/i.test(b),
        a.isVendorAutoplay = /v819mini/i.test(b) || a.isiOS,
        a.nativeFullscreenPrefix = function() {
            return c.requestFullScreen ? "": c.webkitRequestFullScreen ? "webkit": c.mozRequestFullScreen ? "moz": c.msRequestFullScreen ? "ms": "-"
        } (),
        a.hasOldNativeFullScreen = "-" == a.nativeFullscreenPrefix && c.webkitEnterFullscreen,
        a.hasOldNativeFullScreen && /mac os x 10_5/i.test(b) && (a.nativeFullscreenPrefix = "-", a.hasOldNativeFullScreen = !1)
    } (a.features = {}),
    k = 0,
    a.players = {},
    a.MediaPlayer = function(b, c) {
        var e, f, g, i, d = this;
        if (!b.isInstantiated && (b.isInstantiated = !0, d.media = b, f = d.media.tagName.toLowerCase(), /audio|video/.test(f))) {
            d.isVideo = "video" === f,
            d.options = {};
            for (e in a.config) d.options[e] = a.config[e];
            try {
                for (e in c) d.options[e] = c[e];
                g = JSON.parse(d.media.getAttribute("data-config"));
                for (e in g) d.options[e] = g[e]
            } catch(h) {}
            d.options.autoplay && (d.options.autoplay = !a.features.isVendorAutoplay),
            d.isVideo || (d.options.alwaysShowControls = !0),
            d.options.nativeControls || a.features.isVendorControls ? d.media.setAttribute("controls", "controls") : (i = d.media.getAttribute("src"), i = "" === i ? null: i, j(d.media, d.options, i) ? (d.id = "zym_" + k++, a.players[d.id] = d, d.init()) : alert("不支持此" + (d.isVideo ? "视": "音") + "频"))
        }
    },
    a.MediaPlayer.prototype = {
        isControlsVisible: !0,
        isFullScreen: !1,
        setPlayerSize: function(a) {
            var f, g, d = this,
            e = b(d.container, "width");
            a > e && (d.width = e),
            d.enableAutoSize && (f = d.media.videoWidth, g = d.media.videoHeight, f && g && Math.abs(d.options.aspectRation - f / g) < .1 && (d.options.aspectRation = f / g), d.height = parseInt(e / d.options.aspectRation)),
            d.container.style.width = d.width + "px",
            d.media.style.height = d.container.style.height = d.height + "px"
        },
        showControls: function() {
            var a = this;
            a.isControlsVisible || (a.controls.style.bottom = 0, a.options.mediaTitle && (a.title.style.top = 0), a.isControlsVisible = !0)
        },
        hideControls: function() {
            var a = this;
            a.isControlsVisible && !a.options.alwaysShowControls && (a.controls.style.bottom = "-45px", a.options.mediaTitle && (a.title.style.top = "-35px"), a.isControlsVisible = !1)
        },
        setControlsTimer: function(a) {
            var b = this;
            clearTimeout(b.controlsTimer),
            b.controlsTimer = setTimeout(function() {
                b.hideControls()
            },
            a)
        },
        updateTimeline: function(a) {
            var g, c = this,
            d = void 0 !== a ? a.target: c.media,
            e = null,
            f = b(c.slider, "width");
            d.buffered && d.buffered.length > 0 && d.buffered.end && d.duration ? e = d.buffered.end(d.buffered.length - 1) / d.duration: void 0 !== d.bytesTotal && d.bytesTotal > 0 && void 0 !== d.bufferedBytes ? e = d.bufferedBytes / d.bytesTotal: a && a.lengthComputable && 0 !== a.total && (e = a.loaded / a.total),
            null !== e && (e = Math.min(1, Math.max(0, e)), c.loaded.style.width = f * e + "px", c.media.paused && setTimeout(function() {
                c.loaded.style.width = f * e + "px",
                c.updateTimeline()
            },
            300)),
            void 0 !== c.media.currentTime && c.media.duration && (g = Math.round(f * c.media.currentTime / c.media.duration), c.current.style.width = g + "px", c.handle.style.left = g - Math.round(b(c.handle, "width") / 2) + "px")
        },
        updateTime: function() {
            var a = this;
            a.currentTime.innerHTML = f(a.media.currentTime, a.options),
            (a.options.duration > 1 || a.media.duration > 1) && (a.durationDuration.innerHTML = f(a.options.duration > 1 ? a.options.duration: a.media.duration, a.options))
        },
        enterFullScreen: function() {
            var c = this;
            if (c.normalHeight = b(c.container, "height"), c.normalWidth = b(c.container, "width"), "-" != a.features.nativeFullscreenPrefix) c.container[a.features.nativeFullscreenPrefix + "RequestFullScreen"]();
            else if (a.features.hasOldNativeFullScreen) return c.media.webkitEnterFullscreen(),
            void 0;
            d(document.documentElement, "zy_fullscreen"),
            c.media.style.width = c.container.style.width = "100%",
            c.media.style.height = c.container.style.height = "100%",
            d(c.fullscreenBtn, "zy_unfullscreen"),
            c.isFullScreen = !0
        },
        exitFullScreen: function() {
            var b = this; (g() || b.isFullScreen) && ("-" != a.features.nativeFullscreenPrefix ? document[a.features.nativeFullscreenPrefix + "CancelFullScreen"]() : a.features.hasOldNativeFullScreen && document.webkitExitFullscreen()),
            e(document.documentElement, "zy_fullscreen"),
            b.media.style.width = b.container.style.width = b.normalWidth + "px",
            b.media.style.height = b.container.style.height = b.normalHeight + "px",
            e(b.fullscreenBtn, "zy_unfullscreen"),
            b.isFullScreen = !1
        },
        buildContainer: function() {
            var a = this;
            a.container = a.media.parentNode,
            a.container.style.overflow = "hidden",
            a.container.style.height = (a.isVideo ? b(a.container, "width") / a.options.aspectRation: a.options.audioHeight) + "px",
            a.container.innerHTML = '<div class="zy_wrap"></div><div class="zy_controls"></div>' + (a.options.mediaTitle ? '<div class="zy_title">' + a.options.mediaTitle + "</div>": ""),
            a.title = a.container.querySelector(".zy_title"),
            a.media.setAttribute("preload", a.options.preload),
            a.container.querySelector(".zy_wrap").appendChild(a.media),
            a.controls = a.container.querySelector(".zy_controls"),
            a.isVideo && (a.width = a.options.videoWidth, a.height = a.options.videoHeight, "100%" == a.width && "auto" == a.height && (a.enableAutoSize = !0), a.setPlayerSize(a.width, a.height))
        },
        buildPlaypause: function() {
            function c(c) { (a.media.isUserClick || a.options.autoplay) && ("play" === c ? (e(b, "zy_play"), d(b, "zy_pause")) : (e(b, "zy_pause"), d(b, "zy_play")))
            }
            var a = this,
            b = document.createElement("div");
            b.className = "zy_playpause_btn zy_play",
            a.controls.appendChild(b),
            b.addEventListener("click",
            function() {
                a.media.isUserClick = !0,
                a.media.paused ? (a.media.play(), a.media.paused || a.options.alwaysShowControls || a.setControlsTimer(3e3)) : a.media.pause()
            }),
            a.media.addEventListener("play",
            function() {
                c("play")
            }),
            a.media.addEventListener("playing",
            function() {
                c("play")
            }),
            a.media.addEventListener("pause",
            function() {
                c("pse")
            }),
            a.media.addEventListener("paused",
            function() {
                c("pse")
            })
        },
        buildTimeline: function() {
            var e, g, h, i, j, c = this,
            d = document.createElement("div");
            d.className = "zy_timeline",
            d.innerHTML = '<div class="zy_timeline_slider"><div class="zy_timeline_buffering" style="display:none"></div><div class="zy_timeline_loaded"></div><div class="zy_timeline_current"></div><div class="zy_timeline_handle"></div></div>',
            c.controls.appendChild(d),
            c.slider = d.children[0],
            c.buffering = c.slider.children[0],
            c.loaded = c.slider.children[1],
            c.current = c.slider.children[2],
            c.handle = c.slider.children[3],
            e = !1,
            g = c.slider.offsetLeft,
            h = b(c.slider, "width"),
            i = b(c.handle, "width") / 2,
            j = function(a) {
                var d, b = 0;
                d = a.changedTouches ? a.changedTouches[0].pageX: a.pageX,
                c.media.duration && (g > d ? d = g: d > h + g && (d = h + g), c.handle.style.left = d - i - g + "px", b = (d - g) / h * c.media.duration, c.currentTime.innerHTML = f(c.media.currentTime, c.options), e && b !== c.media.currentTime && (c.media.currentTime = b))
            },
            a.features.hasTouch ? c.slider.addEventListener("touchstart",
            function(a) {
                e = !0,
                j(a),
                g = c.slider.offsetLeft,
                h = b(c.slider, "width"),
                c.slider.addEventListener("touchmove", j),
                c.slider.addEventListener("touchend",
                function() {
                    e = !1,
                    c.slider.removeEventListener("touchmove", j)
                })
            }) : c.slider.addEventListener("mousedown",
            function(a) {
                e = !0,
                j(a),
                g = c.slider.offsetLeft,
                h = b(c.slider, "width"),
                c.slider.addEventListener("mousemove", j),
                c.slider.addEventListener("mouseup",
                function() {
                    e = !1,
                    c.slider.addEventListener("mousemove", j)
                })
            }),
            c.slider.addEventListener("mouseenter",
            function() {
                c.slider.addEventListener("mousemove", j)
            }),
            c.slider.addEventListener("mouseleave",
            function() {
                e || c.slider.removeEventListener("mousemove", j)
            }),
            c.media.addEventListener("timeupdate",
            function(a) {
                c.updateTimeline(a)
            })
        },
        buildTime: function() {
            var a = this,
            b = document.createElement("div");
            b.className = "zy_time",
            b.innerHTML = '<span class="zy_currenttime">' + f(0, a.options) + "</span>/" + '<span class="zy_duration">' + f(a.options.duration, a.options) + "</span>",
            a.controls.appendChild(b),
            a.currentTime = b.children[0],
            a.durationDuration = b.children[1],
            a.media.addEventListener("timeupdate",
            function() {
                a.updateTime()
            })
        },
        buildFullscreen: function() {
            var c, b = this;
            "-" != a.features.nativeFullscreenPrefix && (c = function() {
                b.isFullScreen && (g() || b.exitFullScreen())
            },
            document.addEventListener(a.features.nativeFullscreenPrefix + "fullscreenchange", c)),
            b.fullscreenBtn = document.createElement("div"),
            b.fullscreenBtn.className = "zy_fullscreen_btn",
            b.controls.appendChild(b.fullscreenBtn),
            b.fullscreenBtn.addEventListener("click",
            function() {
                "-" != a.features.nativeFullscreenPrefix && g() || b.isFullScreen ? b.exitFullScreen() : b.enterFullScreen()
            })
        },
        buildDec: function() {
            var d, e, b = this,
            c = document.createElement("div");
            c.className = "dec_loading",
            c.style.display = "none",
            b.container.appendChild(c),
            d = document.createElement("div"),
            d.className = "dec_error",
            d.style.display = "none",
            d.innerHTML = "播放异常",
            b.container.appendChild(d),
            e = document.createElement("div"),
            a.features.isVendorBigPlay || (e.className = "dec_play", b.container.appendChild(e), e.addEventListener("click",
            function() {
                b.media.isUserClick = !0,
                b.media.play(),
                b.media.paused || b.options.alwaysShowControls || b.setControlsTimer(3e3)
            })),
            b.media.addEventListener("play",
            function() {
                b.media.isUserClick && (e.style.display = "none", c.style.display = "", b.buffering.style.display = "none")
            }),
            b.media.addEventListener("playing",
            function() {
                e.style.display = "none",
                c.style.display = "none",
                b.buffering.style.display = "none",
                d.style.display = "none"
            }),
            b.media.addEventListener("seeking",
            function() {
                c.style.display = "",
                e.style.display = "none",
                b.buffering.style.display = ""
            }),
            b.media.addEventListener("seeked",
            function() {
                c.style.display = "none",
                b.buffering.style.display = "none"
            }),
            b.media.addEventListener("pause",
            function() {
                e.style.display = ""
            }),
            b.media.addEventListener("waiting",
            function() {
                c.style.display = "",
                e.style.display = "none",
                b.buffering.style.display = ""
            }),
            b.media.addEventListener("error",
            function(a) {
                c.style.display = "none",
                e.style.display = "",
                b.buffering.style.display = "none",
                b.media.pause(),
                d.style.display = "",
                "function" == typeof b.options.error && b.options.error(a)
            })
        },
        init: function() {
            var d, b = this,
            c = ["Container", "Playpause", "Timeline", "Time"];
            for (b.options.enableFullscreen && !a.features.isVendorFullscreen && b.isVideo && c.push("Fullscreen"), b.isVideo && c.push("Dec"), d = 0; d < c.length; d++) try {
                b["build" + c[d]]()
            } catch(e) {}
            b.isVideo && (a.features.hasTouch ? b.media.addEventListener("click",
            function() {
                b.isControlsVisible ? b.hideControls() : (b.showControls(), b.media.paused || b.options.alwaysShowControls || b.setControlsTimer(3e3))
            }) : (b.media.addEventListener("click",
            function() {
                b.media.paused ? b.media.play() : b.media.pause()
            }), b.container.addEventListener("mouseenter",
            function() {
                b.showControls(),
                b.options.alwaysShowControls || b.setControlsTimer(3e3)
            }), b.container.addEventListener("mousemove",
            function() {
                b.showControls(),
                b.options.alwaysShowControls || b.setControlsTimer(3e3)
            })), b.options.hideVideoControlsOnLoad && b.hideControls(), b.media.addEventListener("loadedmetadata",
            function() {
                b.enableAutoSize && setTimeout(function() {
                    isNaN(b.media.videoHeight) || b.setPlayerSize()
                },
                50)
            })),
            b.media.addEventListener("play",
            function() {
                var c, d;
                for (d in a.players) if (c = a.players[d], c.id != b.id && b.options.pauseOtherPlayers && !c.paused && !c.ended) try {
                    c.media.pause()
                } catch(e) {}
            }),
            window.addEventListener("orientationchange",
            function() {
                setTimeout(function() {
                    b.setPlayerSize()
                },
                500)
            }),
            b.media.addEventListener("ended",
            function(a) {
                b.media.currentTime = 0,
                b.options.autoLoop ? b.media.play() : (b.isVideo && setTimeout(function() {
                    b.container.querySelector(".dec_loading").style.display = "none"
                },
                20), b.media.pause()),
                b.updateTimeline(a)
            }),
            b.media.addEventListener("loadedmetadata",
            function() {
                b.updateTime()
            }),
            b.options.autoplay && (b.media.isUserClick = !1, b.media.play()),
            "function" == typeof b.options.success && b.options.success(b.media)
        }
    },
    window.zymedia = function(b, c) {
        "string" == typeof b ? [].forEach.call(document.querySelectorAll(b),
        function(b) {
            new a.MediaPlayer(b, c)
        }) : new a.MediaPlayer(b, c)
    }
} ();