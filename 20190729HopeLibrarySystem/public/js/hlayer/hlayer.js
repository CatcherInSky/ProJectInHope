!
function() {
	function e(e) {
		return this.index = ++t.index, this.config = o.mergeJson(this.defaultConfig, e, this.index), this.init()
	}
	var n = ["msg", "alert", "loading", "iframe", "prompt", "photo", "tips", "music"],
		o = {
			css: function(e, n) {
				for (var o in n) e.style[o] = n[o]
			},
			getStyle: function(e, n) {
				return e.currentStyle ? e.currentStyle[n] : getComputedStyle(e, !1)[n]
			},
			move: function(e, n, t) {
				clearInterval(e.timer), e.timer = setInterval(function() {
					var i = !0;
					for (var r in n) {
						var a;
						a = "opacity" == r ? parseInt(100 * parseFloat(o.getStyle(e, r))) : parseInt(o.getStyle(e, r));
						var l = (n[r] - a) / 7;
						l = l > 0 ? Math.ceil(l) : Math.floor(l), "opacity" == r ? (e.style[r] = (a + l) / 100, e.style.filter = "alpha(opacity:" + a + l + ")") : e.style[r] = a + l + "px", a != n[r] && (i = !1)
					}
					i && (clearInterval(e.timer), t && t())
				}, 16)
			},
			addEvent: function(e, n, o) {
				return e.addEventListener ? e.addEventListener(n, o, !1) : e.attachEvent ? e.attachEvent("on" + n, o) : e["on" + n] = o
			},
			removeEvent: function(e, n, o) {
				e.removeEventListener ? e.removeEventListener(n, o) : e.detachEvent ? e.detachEvent("on" + n, o) : e["on" + n] = null
			},
			mergeJson: function() {
				for (var e = {}, n = 0, o = arguments.length; n < o; n++) for (var t in arguments[n]) e[t] = arguments[n][t];
				return e
			},
			creEle: function(e, n, o) {
				var t = document.createElement(e);
				return n && (t.className = n), o && (t.id = o), t
			},
			addChild: function(e, n) {
				if (n instanceof Array) for (var o = 0, t = n.length; o < t; o++) e.appendChild(n[o]);
				else e.appendChild(n)
			},
			random: function(e, n) {
				return Math.floor(Math.random() * (n - e + 1) + e)
			}
		},
		dom = {
			body: document.body
		},
		t = {
			index: 1e5,
			times: 0,
			msg: function(n) {
				var t = n || {},
					i = {
						type: "msg",
						title: !1,
						btn: !1
					},
					r = {
						icon: !1,
						time: 2e3,
						height: "50px"
					},
					a = o.mergeJson(r, t, i);
				return new e(a)
			},
			alert: function(n) {
				var t = n || {},
					i = {
						type: "alert"
					},
					r = {
						icon: !1,
						height: "148px",
						width: "260px",
						closeBtn: !0
					};
				r.btn = [], r.btnCb = [], t.confirmBtn !== !1 && r.btn.push("确定"), t.cancelBtn && r.btn.push("取消"), t.confirmCb && r.btnCb.push(t.confirmCb), t.cancelCb && r.btnCb.push(t.cancelCb);
				var a = o.mergeJson(r, t, i);
				return new e(a)
			},
			loading: function(n) {
				var t = n || {},
					i = {
						type: "loading",
						icon: !1,
						title: !1,
						btn: !1,
						text: !1
					},
					r = {
						height: "100px",
						width: "100px",
						time: 2e3,
						shadow: !1,
						loadingColor: "#169fe6"
					},
					a = o.mergeJson(r, t, i);
				return new e(a)
			},
			iframe: function(n) {
				var t = n || {},
					i = {
						type: "iframe",
						icon: !1,
						btn: !1,
						text: !1
					},
					r = {
						height: "500px",
						width: "700px",
						time: !1,
						shadow: !1,
						closeBtn: !0,
						url: "202.116.83.50/hope/"
					},
					a = o.mergeJson(r, t, i);
				return new e(a)
			},
			prompt: function(n) {
				var t = n || {},
					i = {
						type: "prompt",
						icon: !1
					},
					r = {
						height: "160px",
						width: "270px",
						time: !1,
						shadow: !1,
						closeBtn: !0,
						confirmCb: !1
					};
				r.btn = [], r.btnCb = [], t.confirmBtn !== !1 && r.btn.push("确定"), t.cancelBtn && r.btn.push("取消"), t.confirmCb && r.btnCb.push(t.confirmCb), t.cancelCb && r.btnCb.push(t.cancelCb);
				var a = o.mergeJson(r, t, i);
				return new e(a)
			},
			photo: function(n) {
				var t = n || {},
					i = {
						type: "photo",
						icon: !1,
						move: !1,
						title: !1,
						closeBtn: !0,
						text: !1,
						closeType: 2
					},
					r = {
						time: !1,
						shadow: !0,
						animateType: 3
					},
					a = o.mergeJson(r, t, i);
				return new e(a)
			},
			tips: function(n) {
				var t = n || {},
					i = {
						type: "tips",
						move: !1,
						title: !1,
						closeBtn: !1,
						shadow: !1
					},
					r = {
						time: 1e3,
						shadow: !0,
						animateType: 3,
						icon: !1,
						height: "40px",
						position: "right"
					},
					a = o.mergeJson(r, t, i);
				return new e(a)
			},
			music: function(n) {
				var t = n || {},
					i = {
						type: "music",
						icon: !1
					},
					r = {
						time: !1,
						shadow: !1,
						closeBtn: 1,
						animateType: 3,
						height: "142px",
						width: "320px",
						text: !1,
						autoPlay: !0
					},
					a = o.mergeJson(r, t, i);
				return new e(a)
			},
			open: function(e) {
				var n = e || {};
				return t[n.type](n)
			},
			remove: function(dom) {
				arguments.length > 0 && [].slice.call(arguments).forEach(function(e) {
					e.parentNode.removeChild(e)
				});
				for (var e = document.getElementsByClassName("hlayer"); e[0];) e[0].parentNode.removeChild(e[0])
			}
		};
	e.prototype = {
		setConfig: function() {
			var that = this;
			that.config.animateType.toString().indexOf("random") > -1 && (that.config.animateType = o.random(1, 9) + "random"), that.config.type === n[2] && (that.config.contentBg = "transparent")
		},
		init: function() {
			var that = this;
			return that.setConfig(), that.times = ++t.times, that.layer = o.creEle("div", "hlayer hlayer" + that.times, "hlayer" + that.times), that.start(function() {
				dom.body.appendChild(that.layer), that.layerCon = o.creEle("div", "hlayer-content hlayer-" + that.config.type + " hlayer-animate" + parseInt(that.config.animateType)), that.layer.appendChild(that.layerCon), that.layer.style.zIndex = ++t.index, that.layout(), that.setStyle(), that.eventHandle()
			}), that.layer
		},
		start: function(e) {
			var that = this;
			if (that.complete = !0, that.config.type == n[5]) {
				var t = [];
				that.complete = !1;
				for (var i = 0, r = that.config.photos.length; i < r; i++) {
					var a = o.creEle("img");
					a.src = that.config.photos[i].img, t.push(a)
				}
				var l = setInterval(function() {
					that.complete = !0;
					for (var n = 0, o = t.length; n < o; n++) if (!t[n].complete) {
						that.complete = !1;
						break
					}
					that.complete && (clearInterval(l), e())
				}, 50)
			}
			that.complete && e()
		},
		layout: function() {
			var that = this;
			if (that.layerTitle = "", that.layerMain = "", that.layerIcon = "", that.layerBtnCON = "", that.closeBtn = "", that.layerBtns = [], that.layerShadow = "", that.prompt = [], that.config.title !== !1 && (that.layerTitle = o.creEle("div", "hlayer-content-title hlayer-" + that.config.type), that.layerTitle.textContent = that.config.title, o.css(that.layerTitle, {
				backgroundColor: that.config.mainBg,
				color: that.config.mainColor
			}), that.layerCon.appendChild(that.layerTitle)), that.config.shadow && (that.layerShadow = o.creEle("div", "hlayer-shadow"), that.layer.insertBefore(that.layerShadow, that.layerCon)), that.layerMain = o.creEle("div", "hlayer-content-main hlayer-" + that.config.type + "-content"), that.layerCon.appendChild(that.layerMain), that.config.text && (that.layerMain.innerHTML = that.config.text), that.config.icon !== !1) {
				that.layerMain.style.paddingLeft = "48px", that.layerIcon = o.creEle("div", "hlayer-icon hlayer-icon" + that.config.icon);
				var e = o.creEle("i");
				that.layerIcon.appendChild(e), that.layerMain.appendChild(that.layerIcon)
			}
			if (that.config.btn) {
				that.layerBtnCON = o.creEle("div", "hlayer-content-btns hlayer-" + that.config.type + "-content-btns"), o.css(that.layerBtnCON, {
					background: that.config.contentBg
				}), that.layerCon.appendChild(that.layerBtnCON);
				for (var t = 0, i = that.config.btn.length; t < i; t++) {
					var r = o.creEle("span", "hlayer-content-btns-item hlayer-content-btns-item" + t);
					r.textContent = that.config.btn[t], o.css(r, {
						backgroundColor: that.config.mainBg,
						color: that.config.mainColor
					}), that.layerBtnCON.appendChild(r), that.layerBtns.push(r)
				}
			}
			if (that.config.closeBtn && (that.closeBtn = o.creEle("div", "hlayer-close hlayer-" + that.config.type + "close hlayer-close" + that.config.closeType), that.layerCon.appendChild(that.closeBtn)), that.config.loadingType && that.config.type == n[2]) {
				if (that.loading = o.creEle("div", "hlayer-content-load hlayer-content-load" + that.config.loadingType), 1 === that.config.loadingType) for (var t = 0; t < 8; t++) {
					var a = o.creEle("div");
					o.css(a, {
						backgroundColor: that.config.loadingColor
					}), that.loading.appendChild(a)
				} else if (2 === that.config.loadingType) for (var t = 0; t < 2; t++) {
					var a = o.creEle("div");
					o.css(a, {
						backgroundColor: that.config.loadingColor
					}), that.loading.appendChild(a)
				} else if (3 === that.config.loadingType) for (var t = 0; t < 5; t++) {
					var a = o.creEle("div", "div" + (t + 1));
					t < 2 ? o.css(a, {
						borderColor: this.config.loadingColor
					}) : t >= 2 && o.css(a, {
						backgroundColor: that.config.loadingColor
					}), that.loading.appendChild(a)
				} else if (4 === that.config.loadingType) for (var t = 0; t < 5; t++) {
					var a = o.creEle("div", "div" + (t + 1));
					o.css(a, {
						backgroundColor: that.config.loadingColor
					}), that.loading.appendChild(a)
				}
				that.layerMain.appendChild(that.loading), o.css(that.layerCon, {
					boxShadow: "none",
					background: "transparent"
				})
			}
			if (that.config.type == n[3]) {
				var l = o.creEle("iframe", "hlayer-content-iframe");
				o.css(l, {
					height: parseInt(that.config.height) - 52 + "px"
				}), l.src = that.config.url, that.layerMain.appendChild(l)
			}
			if (that.config.type == n[4]) if (1 === that.config.formType || 2 === that.config.formType) {
				var c = o.creEle("input", "hlayer-content-prompt hlayer-form-group hlayer-form-input");
				2 === that.config.formType && (c.type = "password"), that.prompt.push(c), that.layerMain.appendChild(c)
			} else if (3 === that.config.formType) {
				var c = o.creEle("textarea", "hlayer-content-prompt hlayer-form-group hlayer-form-textarea");
				that.prompt.push(c), o.css(c, {
					height: parseInt(that.config.height) - 125 + "px"
				}), that.layerMain.appendChild(c)
			} else if (4 === that.config.formType) for (var t = 0, i = that.config.options.inputs.length; t < i; t++) {
				var p = o.creEle("label", "hlayer-prompt-content-label"),
					c = o.creEle("input");
				c.type = "radio", c.name = that.config.options.name, p.appendChild(c), that.prompt.push(c);
				var s = document.createTextNode(that.config.options.inputs[t]);
				p.appendChild(s), that.layerMain.appendChild(p)
			} else if (5 === that.config.formType) for (var t = 0, i = that.config.options.inputs.length; t < i; t++) {
				var p = o.creEle("label", "hlayer-prompt-content-label"),
					c = o.creEle("input");
				c.type = "checkbox", c.name = that.config.options.name, p.appendChild(c), that.prompt.push(c);
				var s = document.createTextNode(that.config.options.inputs[t]);
				p.appendChild(s), that.layerMain.appendChild(p)
			}
			if (that.config.type === n[6] && (that.tipsArrow = o.creEle("i", that.config.tipsPosition), that.layerMain.appendChild(that.tipsArrow)), that.config.type == n[5] && (that.photosIndex = that.photosIndex || 0, that.photoImg = o.creEle("img", "hlayer-content-photo"), o.photoImg = o.css(that.photoImg, {
				display: "block"
			}), that.photoImgNext = o.creEle("div", "hlayer-content-photo-next"), that.photoImgPre = o.creEle("div", "hlayer-content-photo-pre"), o.css(that.layerMain, {
				padding: "0px"
			}), o.css(that.layerCon, {
				padding: "10px"
			}), that.photoText = o.creEle("div", "hlayer-content-photo-text"), that.photoImg.src = that.config.photos[that.photosIndex].img, that.photoText.textContent = that.config.photos[that.photosIndex].text, that.layerMain.appendChild(that.photoImg), that.layerMain.appendChild(that.photoText), that.layerMain.appendChild(that.photoImgNext), that.layerMain.appendChild(that.photoImgPre), that.setStyle(), that.photoEventHandle()), that.config.type == n[7]) {
				that.musicImgCon = o.creEle("div", "hlayer-content-music-img");
				var f = o.creEle("img");
				f.src = that.config.photos, o.css(f, {
					height: "100%"
				}), that.musicImgCon.appendChild(f), that.layerMain.appendChild(that.musicImgCon), o.css(that.musicImgCon, {
					height: "80px",
					position: "absolute",
					top: "10px"
				});
				var h = o.creEle("audio");
				h.controls = "controls", that.config.autoPlay && (h.autoplay = !0);
				var d = o.creEle("source");
				"string" == typeof that.config.url ? (d.src = that.config.url, h.appendChild(d)) : that.config.url instanceof Array && that.config.url.forEach(function(e) {
					d.src = e, h.appendChild(d)
				}), o.css(h, {
					marginLeft: "100px",
					width: "200px",
					top: "30px",
					position: "relative"
				}), that.layerMain.appendChild(h)
			}
		},
		setStyle: function() {
			var that = this;
			o.css(that.layerMain, {
				background: that.config.contentBg,
				color: that.config.contentColor
			}), that.setHeight(), that.config.type === n[0] && o.css(that.layerMain, {
				textAlign: "center"
			}), that.tipsArrow && o.css(that.tipsArrow, {
				borderRightColor: that.config.contentBg
			}), that.position()
		},
		eventHandle: function() {
			var that = this;
			that.config.time && setTimeout(function() {
				that.close()
			}, that.config.time), that.closeBtn && that.closeBtnHandle(), that.btnsHandle(), that.resize(), that.move()
		},
		photoEventHandle: function() {
			var that = this;
			that.photoHover(), that.photoChange(), that.autoPlay()
		},
		photoHover: function() {
			var that = this;
			that.photoImg && (o.addEvent(that.layerCon, "mouseover", function() {
				that.photoImgNext.style.display = "block", that.photoImgPre.style.display = "block", that.photoText.style.display = "block"
			}), o.addEvent(that.layerCon, "mouseleave", function() {
				that.photoImgNext.style.display = "none", that.photoImgPre.style.display = "none", that.photoText.style.display = "none"
			}))
		},
		photoChange: function() {
			var that = this;
			that.photoImg && (o.addEvent(that.photoImgNext, "click", function() {
				that.photosIndex == that.config.photos.length - 1 ? that.photosIndex = 0 : that.photosIndex += 1, this.photoTimer && clearTimeout(this.photoTimer), that.close(), that.init()
			}), o.addEvent(that.photoImgPre, "click", function() {
				0 == that.photosIndex ? that.photosIndex = that.config.photos.length - 1 : that.photosIndex -= 1, this.photoTimer && clearTimeout(this.photoTimer), that.close(), that.init()
			}))
		},
		autoPlay: function() {
			var that = this;
			that.config.autoPlay && (that.photoTimer = setTimeout(function() {
				that.photoImgNext.click()
			}, that.config.playTime))
		},
		resize: function() {
			var that = this;
			that.config.resize && o.addEvent(window, "resize", function() {
				that.position.apply(that)
			})
		},
		move: function() {
			var that = this;
			that.layerTitle && that.config.move && (that.layerTitle.onmousedown = function(e) {
				var n = e || window.event,
					t = n.clientX - that.layerCon.offsetLeft,
					i = n.clientY - that.layerCon.offsetTop;
				document.onmousemove = function(e) {
					var n = e || window.event,
						r = n.clientX - t + "px",
						a = n.clientY - i + "px";
					o.css(that.layerCon, {
						left: r,
						top: a
					}), document.onmouseup = function() {
						document.onmousemove = null
					}
				}
			})
		},
		setHeight: function() {
			var that = this;
			that.config.width && (that.layerCon.style.width = that.config.width), that.config.height && (that.layerCon.style.height = that.config.height);
			var e = parseInt(that.config.height);
			that.layerTitle && (e -= 42), that.layerBtnCON && (e -= 40), o.css(that.layerMain, {
				height: e + "px",
				lineHeight: "30px"
			}), that.config.type !== n[0] && that.config.type !== n[1] && that.config.type !== n[6] || e && (o.css(that.layerMain, {
				height: e + "px"
			}), o.css(that.layerMain, {
				lineHeight: e + "px"
			}))
		},
		close: function() {
			var that = this;
			that.layer.style.display = "none", that.layer.parentNode.removeChild(that.layer)
		},
		closeBtnHandle: function() {
			var that = this;
			o.addEvent(that.closeBtn, "click", function() {
				that.layer.style.display = "none", that.layer.parentNode.removeChild(that.layer)
			})
		},
		btnsHandle: function() {
			var that = this;
			if (that.layerBtns && that.config.btnCb) for (var e = 0, t = that.layerBtns.length; e < t; e++) that.layerBtns[e] && that.config.btnCb[e] && !
			function(e) {
				o.addEvent(that.layerBtns[e], "click", function() {
					if ("function" != typeof that.config.btnCb[e] && "close" == that.config.btnCb[e]) return void that.close();
					if (that.config.btnCb[e] !== !1) if (that.config.type === n[4] && 0 === e) {
						var o = [];
						if (1 === that.config.formType || 2 === that.config.formType || 3 === that.config.formType) {
							var t = !0;
							if (!that.config.allowEmpty) var t = that.prompt.some(function(e) {
								return e.value
							});
							if (!t) return;
							that.close(), that.prompt.forEach(function(e) {
								o.push(e.value)
							})
						} else if (4 === that.config.formType || 5 === that.config.formType) {
							var t = !0;
							if (!that.config.allowEmpty) var t = that.prompt.some(function(e) {
								return e.checked
							});
							if (!t) return;
							that.close(), that.prompt.forEach(function(e, n) {
								e.checked && o.push({
									index: n,
									value: that.config.options.inputs[n]
								})
							})
						}
						1 === o.length ? that.config.btnCb[0](o[0]) : that.config.btnCb[0](o)
					} else that.close(), that.config.btnCb[e]()
				})
			}(e)
		},
		position: function() {
			var that = this,
				e = "",
				t = "";
			if (that.config.type === n[6]) {
				var i = document.getElementById(this.config.tipsCon),
					r = i.offsetTop,
					a = i.offsetLeft,
					l = i.offsetHeight,
					c = i.offsetWidth,
					p = that.layerCon.offsetHeight,
					s = that.layerCon.offsetWidth,
					f = document.body.scrollLeft || document.documentElement.scrollLeft,
					h = document.body.scrollTop || document.documentElement.scrollTop;
				return void("left" === that.config.tipsPosition ? (t = a - s - 10 - f + "px", e = r + (l - p) / 2 - h + "px", o.css(that.layerCon, {
					left: t,
					top: e
				})) : "top" === that.config.tipsPosition ? (t = a + (c - s) / 2 - f + "px", e = r - p - 10 - h + "px", o.css(that.layerCon, {
					left: t,
					top: e
				})) : "right" === that.config.tipsPosition ? (t = a + c + 10 - f + "px", e = r + (l - p) / 2 - h + "px", o.css(that.layerCon, {
					left: t,
					top: e
				})) : "bottom" === that.config.tipsPosition && (t = a + (c - s) / 2 - f + "px", e = r + l + 10 - h + "px", o.css(that.layerCon, {
					left: t,
					top: e
				})))
			}
			var d = that.config.position,
				g = that.layerCon.offsetHeight,
				y = that.layerCon.offsetWidth,
				m = window.innerHeight,
				u = window.innerWidth;
			"random" === d && (e = o.random(0, m - g) + "px", t = o.random(0, u - y) + "px", o.css(that.layerCon, {
				left: t,
				top: e
			})), 0 === d ? (e = (m - g) / 2 + "px", t = (u - y) / 2 + "px", o.css(that.layerCon, {
				left: t,
				top: e
			})) : 1 === d ? o.css(that.layerCon, {
				top: "0px",
				left: "0px"
			}) : 2 === d ? (t = (u - y) / 2 + "px", o.css(that.layerCon, {
				top: "0px",
				left: t
			})) : 3 === d ? o.css(that.layerCon, {
				top: "0px",
				right: "0px"
			}) : 4 === d ? o.css(that.layerCon, {
				bottom: "0px",
				left: "0px"
			}) : 5 === d ? (t = (u - y) / 2 + "px", o.css(that.layerCon, {
				bottom: "0px",
				left: t
			})) : 6 === d && o.css(that.layerCon, {
				bottom: "0px",
				right: "0px"
			})
		},
		defaultConfig: {
			mainBg: "#169FE6",
			mainColor: "#fff",
			contentBg: "#fff",
			contentColor: "#000",
			title: "信息",
			text: "提示信息",
			width: "",
			height: "",
			btns: "",
			confirmBtn: !0,
			confirmCb: !1,
			cancelBtn: !1,
			cancelCb: !1,
			animateType: 1,
			resize: !0,
			position: 0,
			shadow: !0,
			time: !1,
			loadingType: 1,
			closeBtn: !1,
			url: !1,
			formType: 1,
			move: !0,
			photos: !1,
			closeType: 1,
			tipsPosition: "right",
			tipsCon: "",
			autoPlay: !1,
			playTime: 5e3,
			allowEmpty: !0
		}
	}, "function" == typeof define && define.amd ? define("hlayer", [], function() {
		return t
	}) : window.hlayer = t
}(window);