/*!
 * /**
 * * @name JSON Editor
 * * @description JSON Schema Based Editor
 * * This library is the continuation of jdorn's great work (see also https://github.com/jdorn/json-editor/issues/800)
 * * @version "2.0.0-alpha.0"
 * * @author Jeremy Dorn
 * * @see https://github.com/jdorn/json-editor/
 * * @see https://github.com/json-editor/json-editor
 * * @license MIT
 * * @example see README.md and docs/ for requirements, examples and usage info
 * * /
 */
! function(t) {
    var e = {};

    function i(s) {
        if (e[s]) return e[s].exports;
        var n = e[s] = {
            i: s,
            l: !1,
            exports: {}
        };
        return t[s].call(n.exports, n, n.exports, i), n.l = !0, n.exports
    }
    i.m = t, i.c = e, i.d = function(t, e, s) {
        i.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: s
        })
    }, i.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, i.t = function(t, e) {
        if (1 & e && (t = i(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var s = Object.create(null);
        if (i.r(s), Object.defineProperty(s, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var n in t) i.d(s, n, function(e) {
                return t[e]
            }.bind(null, n));
        return s
    }, i.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return i.d(e, "a", e), e
    }, i.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, i.p = "/dist/", i(i.s = 6)
}([function(t, e, i) {
    t.exports = function(t) {
        var e = [];
        return e.toString = function() {
            return this.map(function(e) {
                var i = function(t, e) {
                    var i = t[1] || "",
                        s = t[3];
                    if (!s) return i;
                    if (e && "function" == typeof btoa) {
                        var n = (o = s, a = btoa(unescape(encodeURIComponent(JSON.stringify(o)))), l = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(a), "/*# ".concat(l, " */")),
                            r = s.sources.map(function(t) {
                                return "/*# sourceURL=".concat(s.sourceRoot).concat(t, " */")
                            });
                        return [i].concat(r).concat([n]).join("\n")
                    }
                    var o, a, l;
                    return [i].join("\n")
                }(e, t);
                return e[2] ? "@media ".concat(e[2], "{").concat(i, "}") : i
            }).join("")
        }, e.i = function(t, i) {
            "string" == typeof t && (t = [
                [null, t, ""]
            ]);
            for (var s = {}, n = 0; n < this.length; n++) {
                var r = this[n][0];
                null != r && (s[r] = !0)
            }
            for (var o = 0; o < t.length; o++) {
                var a = t[o];
                null != a[0] && s[a[0]] || (i && !a[2] ? a[2] = i : i && (a[2] = "(".concat(a[2], ") and (").concat(i, ")")), e.push(a))
            }
        }, e
    }
}, function(t, e, i) {
    var s, n = {},
        r = function() {
            return void 0 === s && (s = Boolean(window && document && document.all && !window.atob)), s
        },
        o = function() {
            var t = {};
            return function(e) {
                if (void 0 === t[e]) {
                    var i = document.querySelector(e);
                    if (window.HTMLIFrameElement && i instanceof window.HTMLIFrameElement) try {
                        i = i.contentDocument.head
                    } catch (t) {
                        i = null
                    }
                    t[e] = i
                }
                return t[e]
            }
        }();

    function a(t, e) {
        for (var i = [], s = {}, n = 0; n < t.length; n++) {
            var r = t[n],
                o = e.base ? r[0] + e.base : r[0],
                a = {
                    css: r[1],
                    media: r[2],
                    sourceMap: r[3]
                };
            s[o] ? s[o].parts.push(a) : i.push(s[o] = {
                id: o,
                parts: [a]
            })
        }
        return i
    }

    function l(t, e) {
        for (var i = 0; i < t.length; i++) {
            var s = t[i],
                r = n[s.id],
                o = 0;
            if (r) {
                for (r.refs++; o < r.parts.length; o++) r.parts[o](s.parts[o]);
                for (; o < s.parts.length; o++) r.parts.push(f(s.parts[o], e))
            } else {
                for (var a = []; o < s.parts.length; o++) a.push(f(s.parts[o], e));
                n[s.id] = {
                    id: s.id,
                    refs: 1,
                    parts: a
                }
            }
        }
    }

    function d(t) {
        var e = document.createElement("style");
        if (void 0 === t.attributes.nonce) {
            var s = i.nc;
            s && (t.attributes.nonce = s)
        }
        if (Object.keys(t.attributes).forEach(function(i) {
                e.setAttribute(i, t.attributes[i])
            }), "function" == typeof t.insert) t.insert(e);
        else {
            var n = o(t.insert || "head");
            if (!n) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
            n.appendChild(e)
        }
        return e
    }
    var h, c = (h = [], function(t, e) {
        return h[t] = e, h.filter(Boolean).join("\n")
    });

    function u(t, e, i, s) {
        var n = i ? "" : s.css;
        if (t.styleSheet) t.styleSheet.cssText = c(e, n);
        else {
            var r = document.createTextNode(n),
                o = t.childNodes;
            o[e] && t.removeChild(o[e]), o.length ? t.insertBefore(r, o[e]) : t.appendChild(r)
        }
    }
    var p = null,
        m = 0;

    function f(t, e) {
        var i, s, n;
        if (e.singleton) {
            var r = m++;
            i = p || (p = d(e)), s = u.bind(null, i, r, !1), n = u.bind(null, i, r, !0)
        } else i = d(e), s = function(t, e, i) {
            var s = i.css,
                n = i.media,
                r = i.sourceMap;
            if (n && t.setAttribute("media", n), r && btoa && (s += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r)))), " */")), t.styleSheet) t.styleSheet.cssText = s;
            else {
                for (; t.firstChild;) t.removeChild(t.firstChild);
                t.appendChild(document.createTextNode(s))
            }
        }.bind(null, i, e), n = function() {
            ! function(t) {
                if (null === t.parentNode) return !1;
                t.parentNode.removeChild(t)
            }(i)
        };
        return s(t),
            function(e) {
                if (e) {
                    if (e.css === t.css && e.media === t.media && e.sourceMap === t.sourceMap) return;
                    s(t = e)
                } else n()
            }
    }
    t.exports = function(t, e) {
        (e = e || {}).attributes = "object" == typeof e.attributes ? e.attributes : {}, e.singleton || "boolean" == typeof e.singleton || (e.singleton = r());
        var i = a(t, e);
        return l(i, e),
            function(t) {
                for (var s = [], r = 0; r < i.length; r++) {
                    var o = i[r],
                        d = n[o.id];
                    d && (d.refs--, s.push(d))
                }
                t && l(a(t, e), e);
                for (var h = 0; h < s.length; h++) {
                    var c = s[h];
                    if (0 === c.refs) {
                        for (var u = 0; u < c.parts.length; u++) c.parts[u]();
                        delete n[c.id]
                    }
                }
            }
    }
}, function(t, e, i) {
    var s = i(3);
    "string" == typeof s && (s = [
        [t.i, s, ""]
    ]);
    var n = {
        insert: "head",
        singleton: !1
    };
    i(1)(s, n);
    s.locals && (t.exports = s.locals)
}, function(t, e, i) {
    (t.exports = i(0)(!1)).push([t.i, ".choices > * {\n  box-sizing: border-box;\n}\n", ""])
}, function(t, e, i) {
    var s = i(5);
    "string" == typeof s && (s = [
        [t.i, s, ""]
    ]);
    var n = {
        insert: "head",
        singleton: !1
    };
    i(1)(s, n);
    s.locals && (t.exports = s.locals)
}, function(t, e, i) {
    (t.exports = i(0)(!1)).push([t.i, ".starrating {\n  direction: rtl;\n  display: inline-block;\n  white-space:nowrap;\n}\n.starrating > input {\n  display: none;\n}  /* Remove radio buttons */\n.starrating > label:before {\n  content: '\\2606'; /* Empty Star */\n  margin: 1px;\n  font-size: 18px;\n  font-style:normal;\n  font-weight:400;\n  line-height:1;\n  font-family: 'Arial';\n  display: inline-block;\n}\n.starrating > label {\n  color: #888; /* Start color when not clicked */\n  cursor: pointer;\n  margin: 0;\n  margin: 8px 0 2px 0;\n}\n.starrating > label.starrating-display-enabled {\n  margin: 1px 0 0 0;\n}\n.starrating > input:checked ~ label,\n.starrating:not(.readonly) > input:hover ~ label {\n  color: #ffca08; /* Set yellow color when star checked/hover */\n}\n.starrating > input:checked ~ label:before,\n.starrating:not(.readonly) > input:hover ~ label:before {\n  content: '\\2605'; /* Filled Star when star checked/hover */\n  text-shadow: 0 0 1px rgba(0,20,20,1);\n}\n.starrating .starrating-display {\n  position: relative;\n  direction: rtl;     \n  text-align: center;\n  font-size: 10px;\n  line-height: 0px;\n}\n", ""])
}, function(t, e, i) {
    i.r(e);
    i(2), i(4);
    var s = function(t) {
            return !("object" != typeof t || t.nodeType || null !== t && t === t.window) && !(t.constructor && !Object.prototype.hasOwnProperty.call(t.constructor.prototype, "isPrototypeOf"))
        },
        n = function(t) {
            var e, i, r;
            for (i = 1; i < arguments.length; i++)
                for (r in e = arguments[i]) e.hasOwnProperty(r) && (e[r] && s(e[r]) ? (t.hasOwnProperty(r) || (t[r] = {}), n(t[r], e[r])) : t[r] = e[r]);
            return t
        },
        r = function(t, e) {
            var i;
            if (t && "object" == typeof t)
                if (Array.isArray(t) || "number" == typeof t.length && t.length > 0 && t.length - 1 in t) {
                    for (i = 0; i < t.length; i++)
                        if (!1 === e(i, t[i])) return
                } else if (Object.keys) {
                var s = Object.keys(t);
                for (i = 0; i < s.length; i++)
                    if (!1 === e(s[i], t[s[i]])) return
            } else
                for (i in t)
                    if (t.hasOwnProperty(i) && !1 === e(i, t[i])) return
        },
        o = function(t, e) {
            var i = document.createEvent("HTMLEvents");
            i.initEvent(e, !0, !0), t.dispatchEvent(i)
        };
    var a, l, d = (a = !1, l = /xyz/.test(function() {
            window.postMessage("xyz")
        }) ? /\b_super\b/ : /.*/, (d = function() {}).extend = function t(e) {
            var i = this.prototype;
            a = !0;
            var s = new this;
            for (var n in a = !1, e) s[n] = "function" == typeof e[n] && "function" == typeof i[n] && l.test(e[n]) ? function(t, e) {
                return function() {
                    var s = this._super;
                    this._super = i[t];
                    var n = e.apply(this, arguments);
                    return this._super = s, n
                }
            }(n, e[n]) : e[n];

            function r() {
                !a && this.init && this.init.apply(this, arguments)
            }
            return r.prototype = s, r.prototype.constructor = r, r.extend = t, r
        }, d),
        h = function(t) {
            var e = t.split(".");
            if (4 !== e.length) throw new Error("error_ipv4");
            e.forEach(function(t) {
                if (isNaN(+t) || +t < 0 || +t > 255) throw new Error("error_ipv4")
            })
        },
        c = function(t) {
            if (!t.match("^(?:(?:(?:[a-fA-F0-9]{1,4}:){6}|(?=(?:[a-fA-F0-9]{0,4}:){2,6}(?:[0-9]{1,3}.){3}[0-9]{1,3}$)(([0-9a-fA-F]{1,4}:){1,5}|:)((:[0-9a-fA-F]{1,4}){1,5}:|:)|::(?:[a-fA-F0-9]{1,4}:){5})(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9]).){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])|(?:[a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}|(?=(?:[a-fA-F0-9]{0,4}:){0,7}[a-fA-F0-9]{0,4}$)(([0-9a-fA-F]{1,4}:){1,7}|:)((:[0-9a-fA-F]{1,4}){1,7}|:)|(?:[a-fA-F0-9]{1,4}:){7}:|:(:[a-fA-F0-9]{1,4}){7})$")) throw new Error("error_ipv6")
        },
        u = function(t) {
            if (!t.match("(?=^.{4,253}$)(^((?!-)[a-zA-Z0-9-]{0,62}[a-zA-Z0-9].)+[a-zA-Z]{2,63}$)")) throw new Error("error_hostname")
        };
    const p = d.extend({
        init: function(t, e, i, s) {
            this.jsoneditor = t, this.schema = e || this.jsoneditor.schema, this.options = i || {}, this.translate = this.jsoneditor.translate || s.translate, this.defaults = s
        },
        fitTest: function(t, e, i) {
            i = void 0 === i ? 1e7 : i;
            var s = 0,
                r = 0;
            if ("object" == typeof t && null !== t) {
                var o = void 0 === e ? n({}, this.jsoneditor.expandRefs(this.schema)) : e;
                for (var a in o.properties)
                    if (o.properties.hasOwnProperty(a)) {
                        if ("object" == typeof t[a] && "object" == typeof o.properties[a] && "object" == typeof o.properties[a].properties) {
                            var l = this.fitTest(t[a], o.properties[a], i / 100);
                            s += l.match, r += l.extra
                        }
                        void 0 !== t[a] && (s += i)
                    } else r += i
            }
            return {
                match: s,
                extra: r
            }
        },
        validate: function(t) {
            return this._validateSchema(this.schema, t)
        },
        _validateSchema: function(t, e, i) {
            var s, o, a, l = this,
                d = [],
                p = JSON.stringify(e);
            if (i = i || "root", t = n({}, this.jsoneditor.expandRefs(t)), void 0 === e) return (void 0 !== t.required && !0 === t.required || void 0 === t.required && !0 === this.jsoneditor.options.required_by_default) && d.push({
                path: i,
                property: "required",
                message: this.translate("error_notset")
            }), d;
            if (t.enum) {
                for (s = !1, o = 0; o < t.enum.length; o++) p === JSON.stringify(t.enum[o]) && (s = !0);
                s || d.push({
                    path: i,
                    property: "enum",
                    message: this.translate("error_enum")
                })
            }
            if (t.extends)
                for (o = 0; o < t.extends.length; o++) d = d.concat(this._validateSchema(t.extends[o], e, i));
            if (t.allOf)
                for (o = 0; o < t.allOf.length; o++) d = d.concat(this._validateSchema(t.allOf[o], e, i));
            if (t.anyOf) {
                for (s = !1, o = 0; o < t.anyOf.length; o++)
                    if (!this._validateSchema(t.anyOf[o], e, i).length) {
                        s = !0;
                        break
                    } s || d.push({
                    path: i,
                    property: "anyOf",
                    message: this.translate("error_anyOf")
                })
            }
            if (t.oneOf) {
                s = 0;
                var m = [];
                for (o = 0; o < t.oneOf.length; o++) {
                    var f = this._validateSchema(t.oneOf[o], e, i);
                    for (f.length || s++, a = 0; a < f.length; a++) f[a].path = i + ".oneOf[" + o + "]" + f[a].path.substr(i.length);
                    m = m.concat(f)
                }
                1 !== s && (d.push({
                    path: i,
                    property: "oneOf",
                    message: this.translate("error_oneOf", [s])
                }), d = d.concat(m))
            }
            if (t.not && (this._validateSchema(t.not, e, i).length || d.push({
                    path: i,
                    property: "not",
                    message: this.translate("error_not")
                })), t.type)
                if (Array.isArray(t.type)) {
                    for (s = !1, o = 0; o < t.type.length; o++)
                        if (this._checkType(t.type[o], e)) {
                            s = !0;
                            break
                        } s || d.push({
                        path: i,
                        property: "type",
                        message: this.translate("error_type_union")
                    })
                } else -1 !== ["date", "time", "datetime-local"].indexOf(t.format) && "integer" === t.type ? this._checkType("string", "" + e) || d.push({
                    path: i,
                    property: "type",
                    message: this.translate("error_type", [t.format])
                }) : this._checkType(t.type, e) || d.push({
                    path: i,
                    property: "type",
                    message: this.translate("error_type", [t.type])
                });
            if (t.disallow)
                if (Array.isArray(t.disallow)) {
                    for (s = !0, o = 0; o < t.disallow.length; o++)
                        if (this._checkType(t.disallow[o], e)) {
                            s = !1;
                            break
                        } s || d.push({
                        path: i,
                        property: "disallow",
                        message: this.translate("error_disallow_union")
                    })
                } else this._checkType(t.disallow, e) && d.push({
                    path: i,
                    property: "disallow",
                    message: this.translate("error_disallow", [t.disallow])
                });
            if ("number" == typeof e) {
                if (t.multipleOf || t.divisibleBy) {
                    var g = t.multipleOf || t.divisibleBy;
                    s = e / g === Math.floor(e / g), window.math ? s = window.math.mod(window.math.bignumber(e), window.math.bignumber(g)).equals(0) : window.Decimal && (s = new window.Decimal(e).mod(new window.Decimal(g)).equals(0)), s || d.push({
                        path: i,
                        property: t.multipleOf ? "multipleOf" : "divisibleBy",
                        message: this.translate("error_multipleOf", [g])
                    })
                }
                t.hasOwnProperty("maximum") && (s = t.exclusiveMaximum ? e < t.maximum : e <= t.maximum, window.math ? s = window.math[t.exclusiveMaximum ? "smaller" : "smallerEq"](window.math.bignumber(e), window.math.bignumber(t.maximum)) : window.Decimal && (s = new window.Decimal(e)[t.exclusiveMaximum ? "lt" : "lte"](new window.Decimal(t.maximum))), s || d.push({
                    path: i,
                    property: "maximum",
                    message: this.translate(t.exclusiveMaximum ? "error_maximum_excl" : "error_maximum_incl", [t.maximum])
                })), t.hasOwnProperty("minimum") && (s = t.exclusiveMinimum ? e > t.minimum : e >= t.minimum, window.math ? s = window.math[t.exclusiveMinimum ? "larger" : "largerEq"](window.math.bignumber(e), window.math.bignumber(t.minimum)) : window.Decimal && (s = new window.Decimal(e)[t.exclusiveMinimum ? "gt" : "gte"](new window.Decimal(t.minimum))), s || d.push({
                    path: i,
                    property: "minimum",
                    message: this.translate(t.exclusiveMinimum ? "error_minimum_excl" : "error_minimum_incl", [t.minimum])
                }))
            } else if ("string" == typeof e) t.maxLength && (e + "").length > t.maxLength && d.push({
                path: i,
                property: "maxLength",
                message: this.translate("error_maxLength", [t.maxLength])
            }), t.minLength && (e + "").length < t.minLength && d.push({
                path: i,
                property: "minLength",
                message: this.translate(1 === t.minLength ? "error_notempty" : "error_minLength", [t.minLength])
            }), t.pattern && (new RegExp(t.pattern).test(e) || d.push({
                path: i,
                property: "pattern",
                message: t.options && t.options.patternmessage ? t.options.patternmessage : this.translate("error_pattern", [t.pattern])
            }));
            else if ("object" == typeof e && null !== e && Array.isArray(e)) {
                if (t.items)
                    if (Array.isArray(t.items))
                        for (o = 0; o < e.length; o++)
                            if (t.items[o]) d = d.concat(this._validateSchema(t.items[o], e[o], i + "." + o));
                            else {
                                if (!0 === t.additionalItems) break;
                                if (!t.additionalItems) {
                                    if (!1 === t.additionalItems) {
                                        d.push({
                                            path: i,
                                            property: "additionalItems",
                                            message: this.translate("error_additionalItems")
                                        });
                                        break
                                    }
                                    break
                                }
                                d = d.concat(this._validateSchema(t.additionalItems, e[o], i + "." + o))
                            }
                else
                    for (o = 0; o < e.length; o++) d = d.concat(this._validateSchema(t.items, e[o], i + "." + o));
                if (t.maxItems && e.length > t.maxItems && d.push({
                        path: i,
                        property: "maxItems",
                        message: this.translate("error_maxItems", [t.maxItems])
                    }), t.minItems && e.length < t.minItems && d.push({
                        path: i,
                        property: "minItems",
                        message: this.translate("error_minItems", [t.minItems])
                    }), t.uniqueItems) {
                    var b = {};
                    for (o = 0; o < e.length; o++) {
                        if (b[s = JSON.stringify(e[o])]) {
                            d.push({
                                path: i,
                                property: "uniqueItems",
                                message: this.translate("error_uniqueItems")
                            });
                            break
                        }
                        b[s] = !0
                    }
                }
            } else if ("object" == typeof e && null !== e) {
                if (t.maxProperties) {
                    for (o in s = 0, e) e.hasOwnProperty(o) && s++;
                    s > t.maxProperties && d.push({
                        path: i,
                        property: "maxProperties",
                        message: this.translate("error_maxProperties", [t.maxProperties])
                    })
                }
                if (t.minProperties) {
                    for (o in s = 0, e) e.hasOwnProperty(o) && s++;
                    s < t.minProperties && d.push({
                        path: i,
                        property: "minProperties",
                        message: this.translate("error_minProperties", [t.minProperties])
                    })
                }
                if (void 0 !== t.required && Array.isArray(t.required))
                    for (o = 0; o < t.required.length; o++)
                        if (void 0 === e[t.required[o]]) {
                            var v = this.jsoneditor.getEditor(i + "." + t.required[o]);
                            if (v && -1 !== ["button", "info"].indexOf(v.schema.format || v.schema.type)) continue;
                            d.push({
                                path: i,
                                property: "required",
                                message: this.translate("error_required", [t.required[o]])
                            })
                        } var _ = {};
                for (o in t.properties) t.properties.hasOwnProperty(o) && (_[o] = !0, d = d.concat(this._validateSchema(t.properties[o], e[o], i + "." + o)));
                if (t.patternProperties)
                    for (o in t.patternProperties)
                        if (t.patternProperties.hasOwnProperty(o)) {
                            var y = new RegExp(o);
                            for (a in e) e.hasOwnProperty(a) && y.test(a) && (_[a] = !0, d = d.concat(this._validateSchema(t.patternProperties[o], e[a], i + "." + a)))
                        } if (void 0 !== t.additionalProperties || !this.jsoneditor.options.no_additional_properties || t.oneOf || t.anyOf || (t.additionalProperties = !1), void 0 !== t.additionalProperties)
                    for (o in e)
                        if (e.hasOwnProperty(o) && !_[o]) {
                            if (!t.additionalProperties) {
                                d.push({
                                    path: i,
                                    property: "additionalProperties",
                                    message: this.translate("error_additional_properties", [o])
                                });
                                break
                            }
                            if (!0 === t.additionalProperties) break;
                            d = d.concat(this._validateSchema(t.additionalProperties, e[o], i + "." + o))
                        } if (t.dependencies)
                    for (o in t.dependencies)
                        if (t.dependencies.hasOwnProperty(o) && void 0 !== e[o])
                            if (Array.isArray(t.dependencies[o]))
                                for (a = 0; a < t.dependencies[o].length; a++) void 0 === e[t.dependencies[o][a]] && d.push({
                                    path: i,
                                    property: "dependencies",
                                    message: this.translate("error_dependency", [t.dependencies[o][a]])
                                });
                            else d = d.concat(this._validateSchema(t.dependencies[o], e, i))
            }
            if (t.links)
                for (var w = 0; w < t.links.length; w++)
                    if (t.links[w].rel && "describedby" === t.links[w].rel.toLowerCase()) {
                        var x = t.links[w].href,
                            C = this.jsoneditor.root.getValue(),
                            L = this.jsoneditor.compileTemplate(x, this.jsoneditor.template)(C);
                        t.links.splice(w, 1), t = n({}, t, this.jsoneditor.refs[L]), d = d.concat(this._validateSchema(t, e, i, this.translate))
                    } if (-1 !== ["date", "time", "datetime-local"].indexOf(t.format)) {
                var E = this.jsoneditor.getEditor(i),
                    k = E && E.flatpickr ? E.flatpickr.config.dateFormat : {
                        date: '"YYYY-MM-DD"',
                        time: '"HH:MM"',
                        "datetime-local": '"YYYY-MM-DD HH:MM"'
                    } [t.format];
                if ("integer" === t.type) 1 * e < 1 ? d.push({
                    path: i,
                    property: "format",
                    message: this.translate("error_invalid_epoch")
                }) : e !== Math.abs(parseInt(e)) && d.push({
                    path: i,
                    property: "format",
                    message: this.translate("error_" + t.format.replace(/-/g, "_"), [k])
                });
                else if (E && E.flatpickr) {
                    if (E && "" !== e) {
                        var T;
                        if ("single" !== E.flatpickr.config.mode) {
                            var j = "range" === E.flatpickr.config.mode ? E.flatpickr.l10n.rangeSeparator : ", ";
                            T = E.flatpickr.selectedDates.map(function(t) {
                                return E.flatpickr.formatDate(t, E.flatpickr.config.dateFormat)
                            }).join(j)
                        }
                        try {
                            if (T) {
                                if (T !== e) throw new Error(E.flatpickr.config.mode + " mismatch")
                            } else if (E.flatpickr.formatDate(E.flatpickr.parseDate(e, E.flatpickr.config.dateFormat), E.flatpickr.config.dateFormat) !== e) throw new Error("mismatch")
                        } catch (t) {
                            var A = void 0 !== E.flatpickr.config.errorDateFormat ? E.flatpickr.config.errorDateFormat : E.flatpickr.config.dateFormat;
                            d.push({
                                path: i,
                                property: "format",
                                message: this.translate("error_" + E.format.replace(/-/g, "_"), [A])
                            })
                        }
                    }
                } else({
                    date: /^(\d{4}\D\d{2}\D\d{2})?$/,
                    time: /^(\d{2}:\d{2}(?::\d{2})?)?$/,
                    "datetime-local": /^(\d{4}\D\d{2}\D\d{2}[ T]\d{2}:\d{2}(?::\d{2})?)?$/
                })[t.format].test(e) || d.push({
                    path: i,
                    property: "format",
                    message: this.translate("error_" + t.format.replace(/-/g, "_"), [k])
                })
            }
            return d = d.concat(function(t, e, i, s) {
                try {
                    switch (t.format) {
                        case "ipv4":
                            h(e);
                            break;
                        case "ipv6":
                            c(e);
                            break;
                        case "hostname":
                            u(e)
                    }
                    return []
                } catch (t) {
                    return [{
                        path: i,
                        property: "format",
                        message: s(t.message)
                    }]
                }
            }.call(l, t, e, i, l.translate)), r(l.defaults.custom_validators, function(s, n) {
                d = d.concat(n.call(l, t, e, i))
            }), this.options.custom_validators && r(this.options.custom_validators, function(s, n) {
                d = d.concat(n.call(l, t, e, i))
            }), d = this._removeDuplicateErrors(d)
        },
        _removeDuplicateErrors: function(t) {
            return t.reduce(function(t, e) {
                var i = !0;
                return t || (t = []), t.forEach(function(t) {
                    t.message === e.message && t.path === e.path && t.property === e.property && (t.errorcount++, i = !1)
                }), i && (e.errorcount = 1, t.push(e)), t
            }, [])
        },
        _checkType: function(t, e) {
            return "string" == typeof t ? "string" === t ? "string" == typeof e : "number" === t ? "number" == typeof e : "integer" === t ? "number" == typeof e && e === Math.floor(e) : "boolean" === t ? "boolean" == typeof e : "array" === t ? Array.isArray(e) : "object" === t ? null !== e && !Array.isArray(e) && "object" == typeof e : "null" !== t || null === e : !this._validateSchema(t, e).length
        }
    });
    var m, f = (m = document.documentElement).matches ? "matches" : m.webkitMatchesSelector ? "webkitMatchesSelector" : m.mozMatchesSelector ? "mozMatchesSelector" : m.msMatchesSelector ? "msMatchesSelector" : m.oMatchesSelector ? "oMatchesSelector" : void 0,
        g = d.extend({
            options: {
                disable_theme_rules: !1
            },
            rules: {},
            getContainer: function() {
                return document.createElement("div")
            },
            getFloatRightLinkHolder: function() {
                var t = document.createElement("div");
                return t.style = t.style || {}, t.style.cssFloat = "right", t.style.marginLeft = "10px", t
            },
            getModal: function() {
                var t = document.createElement("div");
                return t.style.backgroundColor = "white", t.style.border = "1px solid black", t.style.boxShadow = "3px 3px black", t.style.position = "absolute", t.style.zIndex = "10", t.style.display = "none", t
            },
            getGridContainer: function() {
                return document.createElement("div")
            },
            getGridRow: function() {
                var t = document.createElement("div");
                return t.classList.add("row"), t
            },
            getGridColumn: function() {
                return document.createElement("div")
            },
            setGridColumnSize: function(t, e) {},
            getLink: function(t) {
                var e = document.createElement("a");
                return e.setAttribute("href", "#"), e.appendChild(document.createTextNode(t)), e
            },
            disableHeader: function(t) {
                t.style.color = "#ccc"
            },
            disableLabel: function(t) {
                t.style.color = "#ccc"
            },
            enableHeader: function(t) {
                t.style.color = ""
            },
            enableLabel: function(t) {
                t.style.color = ""
            },
            getInfoButton: function(t) {
                var e = document.createElement("span");
                e.innerText = "ⓘ", e.style.fontSize = "16px", e.style.fontWeight = "bold", e.style.padding = ".25rem", e.style.position = "relative", e.style.display = "inline-block";
                var i = document.createElement("span");
                return i.style.fontSize = "12px", e.style.fontWeight = "normal", i.style["font-family"] = "sans-serif", i.style.visibility = "hidden", i.style["background-color"] = "rgba(50, 50, 50, .75)", i.style.margin = "0 .25rem", i.style.color = "#FAFAFA", i.style.padding = ".5rem 1rem", i.style["border-radius"] = ".25rem", i.style.width = "20rem", i.style.position = "absolute", i.innerText = t, e.onmouseover = function() {
                    i.style.visibility = "visible"
                }, e.onmouseleave = function() {
                    i.style.visibility = "hidden"
                }, e.appendChild(i), e
            },
            getFormInputLabel: function(t, e) {
                var i = document.createElement("label");
                return i.appendChild(document.createTextNode(t)), e && i.classList.add("required"), i
            },
            getHeader: function(t) {
                var e = document.createElement("h3");
                return "string" == typeof t ? e.textContent = t : e.appendChild(t), e
            },
            getCheckbox: function() {
                var t = this.getFormInputField("checkbox");
                return t.style.display = "inline-block", t.style.width = "auto", t
            },
            getCheckboxLabel: function(t, e) {
                var i = document.createElement("label");
                return i.appendChild(document.createTextNode(" " + t)), e && i.classList.add("required"), i
            },
            getMultiCheckboxHolder: function(t, e, i, s) {
                var n = document.createElement("div");
                for (var r in n.classList.add("control-group"), e && (e.style.display = "block", n.appendChild(e), s && e.appendChild(s)), t) t.hasOwnProperty(r) && (t[r].style.display = "inline-block", t[r].style.marginRight = "20px", n.appendChild(t[r]));
                return i && n.appendChild(i), n
            },
            getFormCheckboxControl: function(t, e, i) {
                var s = document.createElement("div");
                return s.appendChild(t), e.style.width = "auto", t.insertBefore(e, t.firstChild), i && this.applyStyles(s, {
                    display: "inline-block",
                    marginRight: "1rem"
                }), s
            },
            getFormRadio: function(t) {
                var e = this.getFormInputField("radio");
                for (var i in t) e.setAttribute(i, t[i]);
                return e.style.display = "inline-block", e.style.width = "auto", e
            },
            getFormRadioLabel: function(t, e) {
                var i = document.createElement("label");
                return i.appendChild(document.createTextNode(" " + t)), e && i.classList.add("required"), i
            },
            getFormRadioControl: function(t, e, i) {
                var s = document.createElement("div");
                return s.appendChild(t), e.style.width = "auto", t.insertBefore(e, t.firstChild), i && this.applyStyles(s, {
                    display: "inline-block",
                    marginRight: "1rem"
                }), s
            },
            getSelectInput: function(t, e) {
                var i = document.createElement("select");
                return t && this.setSelectOptions(i, t), i
            },
            getSwitcher: function(t) {
                var e = this.getSelectInput(t, !1);
                return e.style.backgroundColor = "transparent", e.style.display = "inline-block", e.style.fontStyle = "italic", e.style.fontWeight = "normal", e.style.height = "auto", e.style.marginBottom = 0, e.style.marginLeft = "5px", e.style.padding = "0 0 0 3px", e.style.width = "auto", e
            },
            getSwitcherOptions: function(t) {
                return t.getElementsByTagName("option")
            },
            setSwitcherOptions: function(t, e, i) {
                this.setSelectOptions(t, e, i)
            },
            setSelectOptions: function(t, e, i) {
                i = i || [], t.innerHTML = "";
                for (var s = 0; s < e.length; s++) {
                    var n = document.createElement("option");
                    n.setAttribute("value", e[s]), n.textContent = i[s] || e[s], t.appendChild(n)
                }
            },
            getTextareaInput: function() {
                var t = document.createElement("textarea");
                return t.style = t.style || {}, t.style.width = "100%", t.style.height = "300px", t.style.boxSizing = "border-box", t
            },
            getRangeInput: function(t, e, i) {
                var s = this.getFormInputField("range");
                return s.setAttribute("min", t), s.setAttribute("max", e), s.setAttribute("step", i), s
            },
            getRangeOutput: function(t, e) {
                var i = document.createElement("output");
                i.value = e || 0;
                var s = function() {
                    i.value = this.value
                };
                return t.addEventListener("change", s, !1), t.addEventListener("input", s, !1), i
            },
            getRangeControl: function(t, e) {
                var i = document.createElement("div");
                return i.style.textAlign = "center", e && i.appendChild(e), i.appendChild(t), i
            },
            getFormInputField: function(t) {
                var e = document.createElement("input");
                return e.setAttribute("type", t), e
            },
            afterInputReady: function(t) {},
            getFormControl: function(t, e, i, s) {
                var n = document.createElement("div");
                return n.classList.add("form-control"), t && n.appendChild(t), "checkbox" !== e.type && "radio" !== e.type || !t ? (s && t.appendChild(s), n.appendChild(e)) : (e.style.width = "auto", t.insertBefore(e, t.firstChild), s && t.appendChild(s)), i && n.appendChild(i), n
            },
            getIndentedPanel: function() {
                var t = document.createElement("div");
                return t.style = t.style || {}, t.style.paddingLeft = "10px", t.style.marginLeft = "10px", t.style.borderLeft = "1px solid #ccc", t
            },
            getTopIndentedPanel: function() {
                var t = document.createElement("div");
                return t.style = t.style || {}, t.style.paddingLeft = "10px", t.style.marginLeft = "10px", t
            },
            getChildEditorHolder: function() {
                return document.createElement("div")
            },
            getDescription: function(t) {
                var e = document.createElement("p");
                return window.DOMPurify ? e.innerHTML = window.DOMPurify.sanitize(t) : e.textContent = this.cleanText(t), e
            },
            getCheckboxDescription: function(t) {
                return this.getDescription(t)
            },
            getFormInputDescription: function(t) {
                return this.getDescription(t)
            },
            getButtonHolder: function() {
                return document.createElement("div")
            },
            getHeaderButtonHolder: function() {
                return this.getButtonHolder()
            },
            getFormButtonHolder: function(t) {
                return this.getButtonHolder()
            },
            getButton: function(t, e, i) {
                var s = document.createElement("button");
                return s.type = "button", this.setButtonText(s, t, e, i), s
            },
            getFormButton: function(t, e, i) {
                return this.getButton(t, e, i)
            },
            setButtonText: function(t, e, i, s) {
                for (; t.firstChild;) t.removeChild(t.firstChild);
                i && (t.appendChild(i), e = " " + e);
                var n = document.createElement("span");
                n.appendChild(document.createTextNode(e)), t.appendChild(n), s && t.setAttribute("title", s)
            },
            getTable: function() {
                return document.createElement("table")
            },
            getTableRow: function() {
                return document.createElement("tr")
            },
            getTableHead: function() {
                return document.createElement("thead")
            },
            getTableBody: function() {
                return document.createElement("tbody")
            },
            getTableHeaderCell: function(t) {
                var e = document.createElement("th");
                return e.textContent = t, e
            },
            getTableCell: function() {
                return document.createElement("td")
            },
            getErrorMessage: function(t) {
                var e = document.createElement("p");
                return e.style = e.style || {}, e.style.color = "red", e.appendChild(document.createTextNode(t)), e
            },
            addInputError: function(t, e) {},
            removeInputError: function(t) {},
            addTableRowError: function(t) {},
            removeTableRowError: function(t) {},
            getTabHolder: function(t) {
                var e = void 0 === t ? "" : t,
                    i = document.createElement("div");
                return i.innerHTML = "<div style='float: left; width: 130px;' class='tabs'></div><div class='content' style='margin-left: 120px;' id='" + e + "'></div><div style='clear:both;'></div>", i
            },
            getTopTabHolder: function(t) {
                var e = void 0 === t ? "" : t,
                    i = document.createElement("div");
                return i.innerHTML = "<div class='tabs' style='margin-left: 10px;'></div><div style='clear:both;'></div><div class='content' id='" + e + "'></div>", i
            },
            applyStyles: function(t, e) {
                for (var i in e) e.hasOwnProperty(i) && (t.style[i] = e[i])
            },
            closest: function(t, e) {
                for (; t && t !== document;) {
                    if (!t[f]) return !1;
                    if (t[f](e)) return t;
                    t = t.parentNode
                }
                return !1
            },
            insertBasicTopTab: function(t, e) {
                e.firstChild.insertBefore(t, e.firstChild.firstChild)
            },
            getTab: function(t, e) {
                var i = document.createElement("div");
                return i.appendChild(t), i.id = e, i.style = i.style || {}, this.applyStyles(i, {
                    border: "1px solid #ccc",
                    borderWidth: "1px 0 1px 1px",
                    textAlign: "center",
                    lineHeight: "30px",
                    borderRadius: "5px",
                    borderBottomRightRadius: 0,
                    borderTopRightRadius: 0,
                    fontWeight: "bold",
                    cursor: "pointer"
                }), i
            },
            getTopTab: function(t, e) {
                var i = document.createElement("div");
                return i.id = e, i.appendChild(t), i.style = i.style || {}, this.applyStyles(i, {
                    float: "left",
                    border: "1px solid #ccc",
                    borderWidth: "1px 1px 0px 1px",
                    textAlign: "center",
                    lineHeight: "30px",
                    borderRadius: "5px",
                    paddingLeft: "5px",
                    paddingRight: "5px",
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: 0,
                    fontWeight: "bold",
                    cursor: "pointer"
                }), i
            },
            getTabContentHolder: function(t) {
                return t.children[1]
            },
            getTopTabContentHolder: function(t) {
                return t.children[1]
            },
            getTabContent: function() {
                return this.getIndentedPanel()
            },
            getTopTabContent: function() {
                return this.getTopIndentedPanel()
            },
            markTabActive: function(t) {
                this.applyStyles(t.tab, {
                    opacity: 1,
                    background: "white"
                }), void 0 !== t.rowPane ? t.rowPane.style.display = "" : t.container.style.display = ""
            },
            markTabInactive: function(t) {
                this.applyStyles(t.tab, {
                    opacity: .5,
                    background: ""
                }), void 0 !== t.rowPane ? t.rowPane.style.display = "none" : t.container.style.display = "none"
            },
            addTab: function(t, e) {
                t.children[0].appendChild(e)
            },
            addTopTab: function(t, e) {
                t.children[0].appendChild(e)
            },
            getBlockLink: function() {
                var t = document.createElement("a");
                return t.style.display = "block", t
            },
            getBlockLinkHolder: function() {
                return document.createElement("div")
            },
            getLinksHolder: function() {
                return document.createElement("div")
            },
            createMediaLink: function(t, e, i) {
                t.appendChild(e), i.style.width = "100%", t.appendChild(i)
            },
            createImageLink: function(t, e, i) {
                t.appendChild(e), e.appendChild(i)
            },
            getFirstTab: function(t) {
                return t.firstChild.firstChild
            },
            getInputGroup: function(t, e) {},
            cleanText: function(t) {
                var e = document.createElement("div");
                return e.innerHTML = t, e.textContent || e.innerText
            },
            getProgressBar: function() {
                var t = document.createElement("progress");
                return t.setAttribute("max", 100), t.setAttribute("value", 0), t
            },
            updateProgressBar: function(t, e) {
                t && t.setAttribute("value", e)
            },
            updateProgressBarUnknown: function(t) {
                t && t.removeAttribute("value")
            }
        }),
        b = g.extend({
            options: {
                disable_theme_rules: !1
            },
            rules: {
                "je-form-input-label": "display:block;margin-bottom:3px;font-weight:bold;",
                "je-form-input-description": "display:inline-block;margin:0;font-size:.8em;font-style:italic;",
                "je-indented-panel": "padding:5px;margin:10px;border-radius:3px;border:1px solid #ddd;",
                "je-child-editor-holder": "margin-bottom:8px;",
                "je-header-button-holder": "display:inline-block;margin-left:10px;font-size:.8em;vertical-align:middle;",
                "je-table": "margin-bottom:5px;border-bottom:1px solid #ccc;"
            },
            getFormInputLabel: function(t, e) {
                var i = this._super(t, e);
                return i.classList.add("je-form-input-label"), i
            },
            getFormInputDescription: function(t) {
                var e = this._super(t);
                return e.classList.add("je-form-input-label"), e
            },
            getIndentedPanel: function() {
                var t = this._super();
                return t.classList.add("je-indented-panel"), t
            },
            getTopIndentedPanel: function() {
                return this.getIndentedPanel()
            },
            getChildEditorHolder: function() {
                var t = this._super();
                return t.classList.add("je-child-editor-holder"), t
            },
            getHeaderButtonHolder: function() {
                var t = this.getButtonHolder();
                return t.classList.add("je-header-button-holder"), t
            },
            getTable: function() {
                var t = this._super();
                return t.classList.add("je-table"), t
            },
            addInputError: function(t, e) {
                if (t.style.borderColor = "red", t.errmsg) t.errmsg.style.display = "block";
                else {
                    var i = this.closest(t, ".form-control");
                    t.errmsg = document.createElement("div"), t.errmsg.setAttribute("class", "errmsg"), t.errmsg.style = t.errmsg.style || {}, t.errmsg.style.color = "red", i.appendChild(t.errmsg)
                }
                t.errmsg.innerHTML = "", t.errmsg.appendChild(document.createTextNode(e))
            },
            removeInputError: function(t) {
                t.style && (t.style.borderColor = ""), t.errmsg && (t.errmsg.style.display = "none")
            }
        }),
        v = g.extend({
            options: {
                disable_theme_rules: !1
            },
            rules: {
                'div[data-schemaid="root"]:after': 'position:relative;color:red;margin:10px 0;font-weight:600;display:block;width:100%;text-align:center;content:"This is an old JSON-Editor 1.x Theme and might not display elements correctly when used with the 2.x version"'
            },
            getRangeInput: function(t, e, i) {
                return this._super(t, e, i)
            },
            getGridContainer: function() {
                var t = document.createElement("div");
                return t.classList.add("container-fluid"), t
            },
            getGridRow: function() {
                var t = document.createElement("div");
                return t.classList.add("row-fluid"), t
            },
            getFormInputLabel: function(t, e) {
                var i = this._super(t, e);
                return i.style.display = "inline-block", i.style.fontWeight = "bold", i
            },
            setGridColumnSize: function(t, e) {
                t.classList.add("span" + e)
            },
            getSelectInput: function(t, e) {
                var i = this._super(t);
                return i.style.width = "auto", i.style.maxWidth = "98%", i
            },
            getFormInputField: function(t) {
                var e = this._super(t);
                return e.style.width = "98%", e
            },
            afterInputReady: function(t) {
                if (!t.controlgroup && (t.controlgroup = this.closest(t, ".control-group"), t.controls = this.closest(t, ".controls"), this.closest(t, ".compact") && (t.controlgroup.className = t.controlgroup.className.replace(/control-group/g, "").replace(/[ ]{2,}/g, " "), t.controls.className = t.controlgroup.className.replace(/controls/g, "").replace(/[ ]{2,}/g, " "), t.style.marginBottom = 0), this.queuedInputErrorText)) {
                    var e = this.queuedInputErrorText;
                    delete this.queuedInputErrorText, this.addInputError(t, e)
                }
            },
            getIndentedPanel: function() {
                var t = document.createElement("div");
                return t.classList.add("well", "well-small"), t.style.paddingBottom = 0, t
            },
            getInfoButton: function(t) {
                var e = document.createElement("span");
                e.classList.add("icon-info-sign", "pull-right"), e.style.padding = ".25rem", e.style.position = "relative", e.style.display = "inline-block";
                var i = document.createElement("span");
                return i.style["font-family"] = "sans-serif", i.style.visibility = "hidden", i.style["background-color"] = "rgba(50, 50, 50, .75)", i.style.margin = "0 .25rem", i.style.color = "#FAFAFA", i.style.padding = ".5rem 1rem", i.style["border-radius"] = ".25rem", i.style.width = "25rem", i.style.transform = "translateX(-27rem) translateY(-.5rem)", i.style.position = "absolute", i.innerText = t, e.onmouseover = function() {
                    i.style.visibility = "visible"
                }, e.onmouseleave = function() {
                    i.style.visibility = "hidden"
                }, e.appendChild(i), e
            },
            getFormInputDescription: function(t) {
                var e = document.createElement("p");
                return e.classList.add("help-inline"), window.DOMPurify ? e.innerHTML = window.DOMPurify.sanitize(t) : e.textContent = this.cleanText(t), e
            },
            getFormControl: function(t, e, i, s) {
                var n = document.createElement("div"),
                    r = document.createElement("div");
                return !t || "checkbox" !== e.getAttribute("type") && "radio" !== e.getAttribute("type") ? (n.classList.add("control-group"), t && (t.classList.add("control-label"), n.appendChild(t)), s && r.appendChild(s), r.appendChild(e), n.appendChild(r)) : (n.appendChild(r), r.classList.add("form-check"), t.classList.add("form-check-label"), e.classList.add("form-check-input"), e.style.margin = "0 4px 4px 0", e.style.width = "auto", r.appendChild(e), r.appendChild(t), s && r.appendChild(s), r.style.height = "30px"), i && r.appendChild(i), n
            },
            getHeaderButtonHolder: function() {
                var t = this.getButtonHolder();
                return t.style.marginLeft = "10px", t
            },
            getButtonHolder: function() {
                var t = document.createElement("div");
                return t.classList.add("btn-group"), t
            },
            getButton: function(t, e, i) {
                var s = this._super(t, e, i);
                return s.classList.add("btn", "btn-default"), s
            },
            getTable: function() {
                var t = document.createElement("table");
                return t.classList.add("table", "table-bordered"), t.style.width = "auto", t.style.maxWidth = "none", t
            },
            addInputError: function(t, e) {
                t.controlgroup ? t.controlgroup && t.controls && (t.controlgroup.classList.add("error"), t.errmsg ? t.errmsg.style.display = "" : (t.errmsg = document.createElement("p"), t.errmsg.classList.add("help-block", "errormsg"), t.controls.appendChild(t.errmsg)), t.errmsg.textContent = e) : this.queuedInputErrorText = e
            },
            removeInputError: function(t) {
                t.controlgroup || delete this.queuedInputErrorText, t.errmsg && (t.errmsg.style.display = "none", t.controlgroup.classList.remove("error"))
            },
            getTabHolder: function(t) {
                var e = void 0 === t ? "" : t,
                    i = document.createElement("div");
                return i.classList.add("tabbable", "tabs-left"), i.innerHTML = "<ul class='nav nav-tabs'  id='" + e + "'></ul><div class='tab-content well well-small' id='" + e + "'></div>", i
            },
            getTopTabHolder: function(t) {
                var e = void 0 === t ? "" : t,
                    i = document.createElement("div");
                return i.classList.add("tabbable", "tabs-over"), i.innerHTML = "<ul class='nav nav-tabs' id='" + e + "'></ul><div class='tab-content well well-small'  id='" + e + "'></div>", i
            },
            getTab: function(t, e) {
                var i = document.createElement("li");
                i.classList.add("nav-item");
                var s = document.createElement("a");
                return s.setAttribute("href", "#" + e), s.appendChild(t), i.appendChild(s), i
            },
            getTopTab: function(t, e) {
                var i = document.createElement("li");
                i.classList.add("nav-item");
                var s = document.createElement("a");
                return s.setAttribute("href", "#" + e), s.appendChild(t), i.appendChild(s), i
            },
            getTabContentHolder: function(t) {
                return t.children[1]
            },
            getTopTabContentHolder: function(t) {
                return t.children[1]
            },
            getTabContent: function() {
                var t = document.createElement("div");
                return t.classList.add("tab-pane"), t
            },
            getTopTabContent: function() {
                var t = document.createElement("div");
                return t.classList.add("tab-pane"), t
            },
            markTabActive: function(t) {
                t.tab.classList.add("active"), void 0 !== t.rowPane ? t.rowPane.classList.add("active") : t.container.classList.add("active")
            },
            markTabInactive: function(t) {
                t.tab.classList.remove("active"), void 0 !== t.rowPane ? t.rowPane.classList.remove("active") : t.container.classList.remove("active")
            },
            addTab: function(t, e) {
                t.children[0].appendChild(e)
            },
            addTopTab: function(t, e) {
                t.children[0].appendChild(e)
            },
            getProgressBar: function() {
                var t = document.createElement("div");
                t.classList.add("progress");
                var e = document.createElement("div");
                return e.classList.add("bar"), e.style.width = "0%", t.appendChild(e), t
            },
            updateProgressBar: function(t, e) {
                t && (t.firstChild.style.width = e + "%")
            },
            updateProgressBarUnknown: function(t) {
                t && (t.classList.add("progress", "progress-striped", "active"), t.firstChild.style.width = "100%")
            },
            getInputGroup: function(t, e) {
                if (t) {
                    var i = document.createElement("div");
                    i.classList.add("input-append"), i.appendChild(t);
                    for (var s = 0; s < e.length; s++) e[s].classList.add("btn"), i.appendChild(e[s]);
                    return i
                }
            }
        }),
        _ = g.extend({
            options: {
                disable_theme_rules: !1
            },
            rules: {
                'div[data-schemaid="root"]:after': 'position:relative;color:red;margin:10px 0;font-weight:600;display:block;width:100%;text-align:center;content:"This is an old JSON-Editor 1.x Theme and might not display elements correctly when used with the 2.x version"'
            },
            getSelectInput: function(t, e) {
                var i = this._super(t);
                return i.classList.add("form-control"), i
            },
            setGridColumnSize: function(t, e, i) {
                t.classList.add("col-md-" + e), i && t.classList.add("col-md-offset-" + i)
            },
            afterInputReady: function(t) {
                if (!t.controlgroup && (t.controlgroup = this.closest(t, ".form-group"), this.closest(t, ".compact") && (t.controlgroup.style.marginBottom = 0), this.queuedInputErrorText)) {
                    var e = this.queuedInputErrorText;
                    delete this.queuedInputErrorText, this.addInputError(t, e)
                }
            },
            getTextareaInput: function() {
                var t = document.createElement("textarea");
                return t.classList.add("form-control"), t
            },
            getRangeInput: function(t, e, i) {
                return this._super(t, e, i)
            },
            getFormInputField: function(t) {
                var e = this._super(t);
                return "checkbox" !== t && "radio" !== t && e.classList.add("form-control"), e
            },
            getFormControl: function(t, e, i) {
                var s = document.createElement("div");
                return !t || "checkbox" !== e.type && "radio" !== e.type ? (s.classList.add("form-group"), t && (t.classList.add("control-label"), s.appendChild(t)), s.appendChild(e)) : (s.classList.add(e.type), t.insertBefore(e, t.firstChild), s.appendChild(t)), i && s.appendChild(i), s
            },
            getIndentedPanel: function() {
                var t = document.createElement("div");
                return t.classList.add("well", "well-sm"), t.style.paddingBottom = 0, t
            },
            getInfoButton: function(t) {
                var e = document.createElement("span");
                e.classList.add("glyphicon", "glyphicon-info-sign", "pull-right"), e.style.padding = ".25rem", e.style.position = "relative", e.style.display = "inline-block";
                var i = document.createElement("span");
                return i.style["font-family"] = "sans-serif", i.style.visibility = "hidden", i.style["background-color"] = "rgba(50, 50, 50, .75)", i.style.margin = "0 .25rem", i.style.color = "#FAFAFA", i.style.padding = ".5rem 1rem", i.style["border-radius"] = ".25rem", i.style.width = "25rem", i.style.transform = "translateX(-27rem) translateY(-.5rem)", i.style.position = "absolute", i.innerText = t, e.onmouseover = function() {
                    i.style.visibility = "visible"
                }, e.onmouseleave = function() {
                    i.style.visibility = "hidden"
                }, e.appendChild(i), e
            },
            getFormInputDescription: function(t) {
                var e = document.createElement("p");
                return e.classList.add("help-block"), window.DOMPurify ? e.innerHTML = window.DOMPurify.sanitize(t) : e.textContent = this.cleanText(t), e
            },
            getHeaderButtonHolder: function() {
                var t = this.getButtonHolder();
                return t.style.marginLeft = "10px", t
            },
            getButtonHolder: function() {
                var t = document.createElement("div");
                return t.classList.add("btn-group"), t
            },
            getButton: function(t, e, i) {
                var s = this._super(t, e, i);
                return s.classList.add("btn", "btn-default"), s
            },
            getTable: function() {
                var t = document.createElement("table");
                return t.classList.add("table", "table-bordered"), t.style.width = "auto", t.style.maxWidth = "none", t
            },
            addInputError: function(t, e) {
                t.controlgroup ? (t.controlgroup.classList.add("has-error"), t.errmsg ? t.errmsg.style.display = "" : (t.errmsg = document.createElement("p"), t.errmsg.classList.add("help-block", "errormsg"), t.controlgroup.appendChild(t.errmsg)), t.errmsg.textContent = e) : this.queuedInputErrorText = e
            },
            removeInputError: function(t) {
                t.controlgroup || delete this.queuedInputErrorText, t.errmsg && (t.errmsg.style.display = "none", t.controlgroup.classList.remove("has-error"))
            },
            getTabHolder: function(t) {
                var e = void 0 === t ? "" : t,
                    i = document.createElement("div");
                return i.innerHTML = "<ul class='col-md-2 nav nav-pills nav-stacked' id='" + e + "' role='tablist'></ul><div class='col-md-10 tab-content well well-small'  id='" + e + "'></div>", i
            },
            getTopTabHolder: function(t) {
                var e = void 0 === t ? "" : t,
                    i = document.createElement("div");
                return i.innerHTML = "<ul class='nav nav-tabs' id='" + e + "' role='tablist'></ul><div class='tab-content well well-small'  id='" + e + "'></div>", i
            },
            getTab: function(t, e) {
                var i = document.createElement("li");
                i.setAttribute("role", "presentation");
                var s = document.createElement("a");
                return s.setAttribute("href", "#" + e), s.appendChild(t), s.setAttribute("aria-controls", e), s.setAttribute("role", "tab"), s.setAttribute("data-toggle", "tab"), i.appendChild(s), i
            },
            getTopTab: function(t, e) {
                var i = document.createElement("li");
                i.setAttribute("role", "presentation");
                var s = document.createElement("a");
                return s.setAttribute("href", "#" + e), s.appendChild(t), s.setAttribute("aria-controls", e), s.setAttribute("role", "tab"), s.setAttribute("data-toggle", "tab"), i.appendChild(s), i
            },
            getTabContent: function() {
                var t = document.createElement("div");
                return t.classList.add("tab-pane"), t.setAttribute("role", "tabpanel"), t
            },
            getTopTabContent: function() {
                var t = document.createElement("div");
                return t.classList.add("tab-pane"), t.setAttribute("role", "tabpanel"), t
            },
            markTabActive: function(t) {
                t.tab.classList.add("active"), void 0 !== t.rowPane ? t.rowPane.classList.add("active") : t.container.classList.add("active")
            },
            markTabInactive: function(t) {
                t.tab.classList.remove("active"), void 0 !== t.rowPane ? t.rowPane.classList.remove("active") : t.container.classList.remove("active")
            },
            getProgressBar: function() {
                var t = document.createElement("div");
                t.classList.add("progress");
                var e = document.createElement("div");
                return e.classList.add("progress-bar"), e.setAttribute("role", "progressbar"), e.setAttribute("aria-valuenow", 0), e.setAttribute("aria-valuemin", 0), e.setAttribute("aria-valuenax", 100), e.innerHTML = "0%", t.appendChild(e), t
            },
            updateProgressBar: function(t, e) {
                if (t) {
                    var i = t.firstChild,
                        s = e + "%";
                    i.setAttribute("aria-valuenow", e), i.style.width = s, i.innerHTML = s
                }
            },
            updateProgressBarUnknown: function(t) {
                if (t) {
                    var e = t.firstChild;
                    t.classList.add("progress", "progress-striped", "active"), e.removeAttribute("aria-valuenow"), e.style.width = "100%", e.innerHTML = ""
                }
            },
            getInputGroup: function(t, e) {
                if (t) {
                    var i = document.createElement("div");
                    i.classList.add("input-group"), i.appendChild(t);
                    var s = document.createElement("div");
                    s.classList.add("input-group-btn"), i.appendChild(s);
                    for (var n = 0; n < e.length; n++) s.appendChild(e[n]);
                    return i
                }
            }
        }),
        y = g.extend({
            options: {
                disable_theme_rules: !1
            },
            rules: {
                'div[data-schemaid="root"]:after': 'position:relative;color:red;margin:10px 0;font-weight:600;display:block;width:100%;text-align:center;content:"This is an old JSON-Editor 1.x Theme and might not display elements correctly when used with the 2.x version"'
            },
            getSelectInput: function(t, e) {
                var i = this._super(t);
                return i.classList.add("form-control"), i
            },
            setGridColumnSize: function(t, e, i) {
                t.classList.add("col-md-" + e), i && t.classList.add("offset-md-" + i)
            },
            afterInputReady: function(t) {
                t.controlgroup || (t.controlgroup = this.closest(t, ".form-group"), this.closest(t, ".compact") && (t.controlgroup.style.marginBottom = 0))
            },
            getTextareaInput: function() {
                var t = document.createElement("textarea");
                return t.classList.add("form-control"), t
            },
            getRangeInput: function(t, e, i) {
                return this._super(t, e, i)
            },
            getFormInputField: function(t) {
                var e = this._super(t);
                return "checkbox" !== t && "radio" !== t && e.classList.add("form-control"), e
            },
            getFormControl: function(t, e, i) {
                var s = document.createElement("div");
                return !t || "checkbox" !== e.type && "radio" !== e.type ? (s.classList.add("form-group"), t && (t.classList.add("form-control-label"), s.appendChild(t)), s.appendChild(e)) : (s.classList.add("form-check"), t.classList.add("form-check-label"), e.classList.add("form-check-input"), t.insertBefore(e, t.firstChild), s.appendChild(t)), i && s.appendChild(i), s
            },
            getIndentedPanel: function() {
                var t = document.createElement("div");
                return t.classList.add("card", "card-body", "bg-light"), t
            },
            getFormInputDescription: function(t) {
                var e = document.createElement("p");
                return e.classList.add("form-text"), window.DOMPurify ? e.innerHTML = window.DOMPurify.sanitize(t) : e.textContent = this.cleanText(t), e
            },
            getHeaderButtonHolder: function() {
                var t = this.getButtonHolder();
                return t.style.marginLeft = "10px", t
            },
            getButtonHolder: function() {
                var t = document.createElement("div");
                return t.classList.add("btn-group"), t
            },
            getButton: function(t, e, i) {
                var s = this._super(t, e, i);
                return s.classList.add("btn", "btn-secondary"), s
            },
            getTable: function() {
                var t = document.createElement("table");
                return t.classList.add("table-bordered", "table-sm"), t.style.width = "auto", t.style.maxWidth = "none", t
            },
            addInputError: function(t, e) {
                t.controlgroup && (t.controlgroup.classList.add("has-danger"), t.classList.add("is-invalid"), t.errmsg ? t.errmsg.style.display = "" : (t.errmsg = document.createElement("p"), t.errmsg.classList.add("form-text", "invalid-feedback"), t.controlgroup.appendChild(t.errmsg)), t.errmsg.textContent = e)
            },
            removeInputError: function(t) {
                t.errmsg && (t.errmsg.style.display = "none", t.classList.remove("is-invalid"), t.controlgroup.classList.remove("has-danger"))
            },
            getTabHolder: function(t) {
                var e = document.createElement("div"),
                    i = void 0 === t ? "" : t;
                return e.innerHTML = "<div class='col-md-2' id='" + i + "'><ul class='nav flex-column nav-pills'></ul></div><div class='tab-content col-md-10' id='" + i + "'></div>", e.classList.add("row"), e
            },
            addTab: function(t, e) {
                t.children[0].children[0].appendChild(e)
            },
            getTopTabHolder: function(t) {
                var e = void 0 === t ? "" : t,
                    i = document.createElement("div");
                return i.innerHTML = "<ul class='nav nav-tabs' id='" + e + "'></ul><div class='card-body tab-content' id='" + e + "'></div>", i
            },
            getTab: function(t, e) {
                var i = document.createElement("li");
                i.classList.add("nav-item");
                var s = document.createElement("a");
                return s.classList.add("nav-link"), s.setAttribute("style", "padding:10px;"), s.setAttribute("href", "#" + e), s.setAttribute("data-toggle", "tab"), s.appendChild(t), i.appendChild(s), i
            },
            getTopTab: function(t, e) {
                var i = document.createElement("li");
                i.classList.add("nav-item");
                var s = document.createElement("a");
                return s.classList.add("nav-link"), s.setAttribute("href", "#" + e), s.setAttribute("data-toggle", "tab"), s.appendChild(t), i.appendChild(s), i
            },
            getTabContent: function() {
                var t = document.createElement("div");
                return t.classList.add("tab-pane"), t.setAttribute("role", "tabpanel"), t
            },
            getTopTabContent: function() {
                var t = document.createElement("div");
                return t.classList.add("tab-pane"), t.setAttribute("role", "tabpanel"), t
            },
            markTabActive: function(t) {
                t.tab.firstChild.classList.add("active"), void 0 !== t.rowPane ? t.rowPane.classList.add("active") : t.container.classList.add("active")
            },
            markTabInactive: function(t) {
                t.tab.firstChild.classList.remove("active"), void 0 !== t.rowPane ? t.rowPane.classList.remove("active") : t.container.classList.remove("active")
            },
            getProgressBar: function() {
                var t = document.createElement("div");
                t.classList.add("progress");
                var e = document.createElement("div");
                return e.classList.add("progress-bar"), e.setAttribute("role", "progressbar"), e.setAttribute("aria-valuenow", 0), e.setAttribute("aria-valuemin", 0), e.setAttribute("aria-valuenax", 100), e.innerHTML = "0%", t.appendChild(e), t
            },
            updateProgressBar: function(t, e) {
                if (t) {
                    var i = t.firstChild,
                        s = e + "%";
                    i.setAttribute("aria-valuenow", e), i.style.width = s, i.innerHTML = s
                }
            },
            updateProgressBarUnknown: function(t) {
                if (t) {
                    var e = t.firstChild;
                    t.classList.add("progress", "progress-striped", "active"), e.removeAttribute("aria-valuenow"), e.style.width = "100%", e.innerHTML = ""
                }
            },
            getInputGroup: function(t, e) {
                if (t) {
                    var i = document.createElement("div");
                    i.classList.add("input-group"), i.appendChild(t);
                    var s = document.createElement("div");
                    s.classList.add("input-group-prepend"), i.appendChild(s);
                    for (var n = 0; n < e.length; n++) s.appendChild(e[n]);
                    return i
                }
            }
        }),
        w = g.extend({
            options: {
                disable_theme_rules: !1
            },
            rules: {
                'div[data-schemaid="root"]:after': 'position:relative;color:red;margin:10px 0;font-weight:600;display:block;width:100%;text-align:center;content:"This is an old JSON-Editor 1.x Theme and might not display elements correctly when used with the 2.x version"'
            },
            getChildEditorHolder: function() {
                var t = document.createElement("div");
                return t.style.marginBottom = "15px", t
            },
            getSelectInput: function(t, e) {
                var i = this._super(t);
                return i.style.minWidth = "none", i.style.padding = "5px", i.style.marginTop = "3px", i
            },
            getSwitcher: function(t) {
                var e = this._super(t);
                return e.style.paddingRight = "8px", e
            },
            afterInputReady: function(t) {
                if (!t.group && (this.closest(t, ".compact") && (t.style.marginBottom = 0), t.group = this.closest(t, ".form-control"), this.queuedInputErrorText)) {
                    var e = this.queuedInputErrorText;
                    delete this.queuedInputErrorText, this.addInputError(t, e)
                }
            },
            getFormInputLabel: function(t, e) {
                var i = this._super(t, e);
                return i.style.display = "inline-block", i
            },
            getFormInputField: function(t) {
                var e = this._super(t);
                return e.style.width = "100%", e.style.marginBottom = "checkbox" === t || "radio" === t ? "0" : "12px", e
            },
            getFormInputDescription: function(t) {
                var e = document.createElement("p");
                return window.DOMPurify ? e.innerHTML = window.DOMPurify.sanitize(t) : e.textContent = this.cleanText(t), e.style.marginTop = "-10px", e.style.fontStyle = "italic", e
            },
            getIndentedPanel: function() {
                var t = document.createElement("div");
                return t.classList.add("panel"), t.style.paddingBottom = 0, t
            },
            getHeaderButtonHolder: function() {
                var t = this.getButtonHolder();
                return t.style.display = "inline-block", t.style.marginLeft = "10px", t.style.verticalAlign = "middle", t
            },
            getButtonHolder: function() {
                var t = document.createElement("div");
                return t.classList.add("button-group"), t
            },
            getButton: function(t, e, i) {
                var s = this._super(t, e, i);
                return s.classList.add("small", "button"), s
            },
            addInputError: function(t, e) {
                t.group ? (t.group.classList.add("error"), t.errmsg ? t.errmsg.style.display = "" : (t.insertAdjacentHTML("afterend", '<small class="error"></small>'), t.errmsg = t.parentNode.getElementsByClassName("error")[0]), t.errmsg.textContent = e) : this.queuedInputErrorText = e
            },
            removeInputError: function(t) {
                t.group || delete this.queuedInputErrorText, t.errmsg && (t.group.classList.remove("error"), t.errmsg.style.display = "none")
            },
            getProgressBar: function() {
                var t = document.createElement("div");
                t.classList.add("progress");
                var e = document.createElement("span");
                return e.classList.add("meter"), e.style.width = "0%", t.appendChild(e), t
            },
            updateProgressBar: function(t, e) {
                t && (t.firstChild.style.width = e + "%")
            },
            updateProgressBarUnknown: function(t) {
                t && (t.firstChild.style.width = "100%")
            },
            getInputGroup: function(t, e) {
                if (t) {
                    var i = document.createElement("div");
                    i.classList.add("input-group"), t.classList.add("input-group-field"), i.appendChild(t);
                    for (var s = 0; s < e.length; s++) {
                        var n = document.createElement("div");
                        n.classList.add("input-group-button"), n.style.verticalAlign = "top", e[s].classList.remove("small"), n.appendChild(e[s]), i.appendChild(n)
                    }
                    return i
                }
            }
        }),
        x = w.extend({
            getHeaderButtonHolder: function() {
                var t = this._super();
                return t.style.fontSize = ".6em", t
            },
            getFormInputLabel: function(t, e) {
                var i = this._super(t, e);
                return i.style.fontWeight = "bold", i
            },
            getTabHolder: function(t) {
                var e = void 0 === t ? "" : t,
                    i = document.createElement("div");
                return i.classList.add("row"), i.innerHTML = '<dl class="tabs vertical two columns" id="' + e + '"></dl><div class="tabs-content ten columns" id="' + e + '"></div>', i
            },
            getTopTabHolder: function(t) {
                var e = void 0 === t ? "" : t,
                    i = document.createElement("div");
                return i.classList.add("row"), i.innerHTML = '<dl class="tabs horizontal" style="padding-left: 10px; margin-left: 10px;" id="' + e + '"></dl><div class="tabs-content twelve columns" style="padding: 10px; margin-left: 10px;" id="' + e + '"></div>', i
            },
            setGridColumnSize: function(t, e, i) {
                var s = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
                t.classList.add("columns", s[e]), i && i < 11 && t.classList.add("offset-by-" + s[i])
            },
            getTab: function(t, e) {
                var i = document.createElement("dd"),
                    s = document.createElement("a");
                return s.setAttribute("href", "#" + e), s.appendChild(t), i.appendChild(s), i
            },
            getTopTab: function(t, e) {
                var i = document.createElement("dd"),
                    s = document.createElement("a");
                return s.setAttribute("href", "#" + e), s.appendChild(t), i.appendChild(s), i
            },
            getTabContentHolder: function(t) {
                return t.children[1]
            },
            getTopTabContentHolder: function(t) {
                return t.children[1]
            },
            getTabContent: function() {
                var t = document.createElement("div");
                return t.classList.add("content", "active"), t.style.paddingLeft = "5px", t
            },
            getTopTabContent: function() {
                var t = document.createElement("div");
                return t.classList.add("content", "active"), t.style.paddingLeft = "5px", t
            },
            markTabActive: function(t) {
                t.tab.classList.add("active"), void 0 !== t.rowPane ? t.rowPane.style.display = "" : t.container.style.display = ""
            },
            markTabInactive: function(t) {
                t.tab.classList.remove("active"), void 0 !== t.rowPane ? t.rowPane.style.display = "none" : t.container.style.display = "none"
            },
            addTab: function(t, e) {
                t.children[0].appendChild(e)
            },
            addTopTab: function(t, e) {
                t.children[0].appendChild(e)
            }
        }),
        C = w.extend({
            getHeaderButtonHolder: function() {
                var t = this._super();
                return t.style.fontSize = ".6em", t
            },
            setGridColumnSize: function(t, e, i) {
                t.classList.add("columns", "large-" + e), i && t.classList.add("large-offset-" + i)
            },
            getFormInputDescription: function(t) {
                var e = this._super(t);
                return e.style.fontSize = ".8rem", e
            },
            getFormInputLabel: function(t, e) {
                var i = this._super(t, e);
                return i.style.fontWeight = "bold", i
            }
        }),
        L = w.extend({
            getFormInputDescription: function(t) {
                var e = this._super(t);
                return e.style.fontSize = ".8rem", e
            },
            setGridColumnSize: function(t, e, i) {
                t.classList.add("columns", "medium-" + e), i && t.classList.add("medium-offset-" + i)
            },
            getButton: function(t, e, i) {
                var s = this._super(t, e, i);
                return s.className = s.className.replace(/\s*small/g, "") + " tiny", s
            },
            getTabHolder: function(t) {
                var e = void 0 === t ? "" : t,
                    i = document.createElement("div");
                return i.innerHTML = '<dl class="tabs vertical" id="' + e + '"></dl><div class="tabs-content vertical" id="' + e + '"></div>', i
            },
            getTopTabHolder: function(t) {
                var e = void 0 === t ? "" : t,
                    i = document.createElement("div");
                return i.classList.add("row"), i.innerHTML = '<dl class="tabs horizontal" style="padding-left: 10px;" id="' + e + '"></dl><div class="tabs-content horizontal" style="padding: 10px;" id="' + e + '"></div>', i
            },
            getTab: function(t, e) {
                var i = document.createElement("dd"),
                    s = document.createElement("a");
                return s.setAttribute("href", "#" + e), s.appendChild(t), i.appendChild(s), i
            },
            getTopTab: function(t, e) {
                var i = document.createElement("dd"),
                    s = document.createElement("a");
                return s.setAttribute("href", "#" + e), s.appendChild(t), i.appendChild(s), i
            },
            getTabContentHolder: function(t) {
                return t.children[1]
            },
            getTopTabContentHolder: function(t) {
                return t.children[1]
            },
            getTabContent: function() {
                var t = document.createElement("div");
                return t.classList.add("tab-content", "active"), t.style.paddingLeft = "5px", t
            },
            getTopTabContent: function() {
                var t = document.createElement("div");
                return t.classList.add("tab-content", "active"), t.style.paddingLeft = "5px", t
            },
            markTabActive: function(t) {
                t.tab.classList.add("active"), void 0 !== t.rowPane ? t.rowPane.style.display = "" : t.container.style.display = ""
            },
            markTabInactive: function(t) {
                t.tab.classList.remove("active"), void 0 !== t.rowPane ? t.rowPane.style.display = "none" : t.container.style.display = "none"
            },
            addTab: function(t, e) {
                t.children[0].appendChild(e)
            },
            addTopTab: function(t, e) {
                t.children[0].appendChild(e)
            }
        }),
        E = L.extend({
            getIndentedPanel: function() {
                var t = document.createElement("div");
                return t.classList.add("callout", "secondary"), t.style = "padding-left: 10px; margin-left: 10px;", t
            },
            getButtonHolder: function() {
                var t = document.createElement("div");
                return t.classList.add("button-group", "tiny"), t.style.marginBottom = 0, t
            },
            getFormInputLabel: function(t, e) {
                var i = this._super(t, e);
                return i.style.display = "block", i
            },
            getFormControl: function(t, e, i, s) {
                var n = document.createElement("div");
                return n.classList.add("form-control"), t && n.appendChild(t), "checkbox" === e.type || "radio" === e.type ? (e.style.width = "auto", t.insertBefore(e, t.firstChild)) : t ? (s && t.appendChild(s), t.appendChild(e)) : (s && n.appendChild(s), n.appendChild(e)), i && t.appendChild(i), n
            },
            addInputError: function(t, e) {
                if (t.group) {
                    if (t.group.classList.add("error"), t.errmsg) t.errmsg.style.display = "", t.className = "";
                    else {
                        var i = document.createElement("span");
                        i.classList.add("form-error", "is-visible"), t.group.getElementsByTagName("label")[0].appendChild(i), t.classList.add("is-invalid-input"), t.errmsg = i
                    }
                    t.errmsg.textContent = e
                }
            },
            removeInputError: function(t) {
                t.errmsg && (t.classList.remove("is-invalid-input"), t.errmsg.parentNode && t.errmsg.parentNode.removeChild(t.errmsg))
            },
            getTabHolder: function(t) {
                var e = void 0 === t ? "" : t,
                    i = document.createElement("div");
                return i.classList.add("grid-x"), i.innerHTML = '<div class="medium-2 cell" style="float: left;"><ul class="vertical tabs" data-tabs id="' + e + '"></ul></div><div class="medium-10 cell" style="float: left;"><div class="tabs-content" data-tabs-content="' + e + '"></div></div>', i
            },
            getTopTabHolder: function(t) {
                var e = void 0 === t ? "" : t,
                    i = document.createElement("div");
                return i.classList.add("grid-y"), i.innerHTML = '<div className="cell"><ul class="tabs" data-tabs id="' + e + '"></ul><div class="tabs-content" data-tabs-content="' + e + '"></div></div>', i
            },
            insertBasicTopTab: function(t, e) {
                e.firstChild.firstChild.insertBefore(t, e.firstChild.firstChild.firstChild)
            },
            getTab: function(t, e) {
                var i = document.createElement("li");
                i.classList.add("tabs-title");
                var s = document.createElement("a");
                return s.setAttribute("href", "#" + e), s.appendChild(t), i.appendChild(s), i
            },
            getTopTab: function(t, e) {
                var i = document.createElement("li");
                i.classList.add("tabs-title");
                var s = document.createElement("a");
                return s.setAttribute("href", "#" + e), s.appendChild(t), i.appendChild(s), i
            },
            getTabContentHolder: function(t) {
                return t.children[1].firstChild
            },
            getTopTabContentHolder: function(t) {
                return t.firstChild.children[1]
            },
            getTabContent: function() {
                var t = document.createElement("div");
                return t.classList.add("tabs-panel"), t.style.paddingLeft = "5px", t
            },
            getTopTabContent: function() {
                var t = document.createElement("div");
                return t.classList.add("tabs-panel"), t.style.paddingLeft = "5px", t
            },
            markTabActive: function(t) {
                t.tab.classList.add("is-active"), t.tab.firstChild.setAttribute("aria-selected", "true"), void 0 !== t.rowPane ? (t.rowPane.classList.add("is-active"), t.rowPane.setAttribute("aria-selected", "true")) : (t.container.classList.add("is-active"), t.container.setAttribute("aria-selected", "true"))
            },
            markTabInactive: function(t) {
                t.tab.classList.remove("is-active"), t.tab.firstChild.removeAttribute("aria-selected"), void 0 !== t.rowPane ? (t.rowPane.classList.remove("is-active"), t.rowPane.removeAttribute("aria-selected")) : (t.container.classList.remove("is-active"), t.container.removeAttribute("aria-selected"))
            },
            addTab: function(t, e) {
                t.children[0].firstChild.appendChild(e)
            },
            addTopTab: function(t, e) {
                t.firstChild.children[0].appendChild(e)
            },
            getFirstTab: function(t) {
                return t.firstChild.firstChild.firstChild
            }
        }),
        k = g.extend({
            options: {
                disable_theme_rules: !1
            },
            rules: {
                'div[data-schemaid="root"]:after': 'position:relative;color:red;margin:10px 0;font-weight:600;display:block;width:100%;text-align:center;content:"This is an old JSON-Editor 1.x Theme and might not display elements correctly when used with the 2.x version"'
            },
            getTable: function() {
                var t = this._super();
                return t.setAttribute("cellpadding", 5), t.setAttribute("cellspacing", 0), t
            },
            getTableHeaderCell: function(t) {
                var e = this._super(t);
                return e.classList.add("ui-state-active"), e.style.fontWeight = "bold", e
            },
            getTableCell: function() {
                var t = this._super();
                return t.classList.add("ui-widget-content"), t
            },
            getHeaderButtonHolder: function() {
                var t = this.getButtonHolder();
                return t.style.marginLeft = "10px", t.style.fontSize = ".6em", t.style.display = "inline-block", t
            },
            getFormInputDescription: function(t) {
                var e = this.getDescription(t);
                return e.style.marginLeft = "10px", e.style.display = "inline-block", e
            },
            getFormControl: function(t, e, i, s) {
                var n = this._super(t, e, i, s);
                return "checkbox" === e.type ? (n.style.lineHeight = "25px", n.style.padding = "3px 0") : n.style.padding = "4px 0 8px 0", n
            },
            getDescription: function(t) {
                var e = document.createElement("span");
                return e.style.fontSize = ".8em", e.style.fontStyle = "italic", window.DOMPurify ? e.innerHTML = window.DOMPurify.sanitize(t) : e.textContent = this.cleanText(t), e
            },
            getButtonHolder: function() {
                var t = document.createElement("div");
                return t.classList.add("ui-buttonset"), t.style.fontSize = ".7em", t
            },
            getFormInputLabel: function(t, e) {
                var i = document.createElement("label");
                return i.style.fontWeight = "bold", i.style.display = "block", i.textContent = t, e && i.classList.add("required"), i
            },
            getButton: function(t, e, i) {
                var s = document.createElement("button");
                s.classList.add("ui-button", "ui-widget", "ui-state-default", "ui-corner-all"), e && !t ? (s.classList.add("ui-button-icon-only"), e.classList.add("ui-button-icon-primary", "ui-icon-primary"), s.appendChild(e)) : e ? (s.classList.add("ui-button-text-icon-primary"), e.classList.add("ui-button-icon-primary", "ui-icon-primary"), s.appendChild(e)) : s.classList.add("ui-button-text-only");
                var n = document.createElement("span");
                return n.classList.add("ui-button-text"), n.textContent = t || i || ".", s.appendChild(n), s.setAttribute("title", i), s
            },
            setButtonText: function(t, e, i, s) {
                t.innerHTML = "", t.classList.add("ui-button", "ui-widget", "ui-state-default", "ui-corner-all"), i && !e ? (t.classList.add("ui-button-icon-only"), i.classList.add("ui-button-icon-primary", "ui-icon-primary"), t.appendChild(i)) : i ? (t.classList.add("ui-button-text-icon-primary"), i.classList.add("ui-button-icon-primary", "ui-icon-primary"), t.appendChild(i)) : t.classList.add("ui-button-text-only");
                var n = document.createElement("span");
                n.classList.add("ui-button-text"), n.textContent = e || s || ".", t.appendChild(n), t.setAttribute("title", s)
            },
            getIndentedPanel: function() {
                var t = document.createElement("div");
                return t.classList.add("ui-widget-content", "ui-corner-all"), t.style.padding = "1em 1.4em", t.style.marginBottom = "20px", t
            },
            afterInputReady: function(t) {
                if (!t.controls && (t.controls = this.closest(t, ".form-control"), this.queuedInputErrorText)) {
                    var e = this.queuedInputErrorText;
                    delete this.queuedInputErrorText, this.addInputError(t, e)
                }
            },
            addInputError: function(t, e) {
                t.controls ? (t.errmsg ? t.errmsg.style.display = "" : (t.errmsg = document.createElement("div"), t.errmsg.classList.add("ui-state-error"), t.controls.appendChild(t.errmsg)), t.errmsg.textContent = e) : this.queuedInputErrorText = e
            },
            removeInputError: function(t) {
                t.controls || delete this.queuedInputErrorText, t.errmsg && (t.errmsg.style.display = "none")
            },
            markTabActive: function(t) {
                t.tab.classList.remove("ui-widget-header"), t.tab.classList.add("ui-state-active"), void 0 !== t.rowPane ? t.rowPane.style.display = "" : t.container.style.display = ""
            },
            markTabInactive: function(t) {
                t.tab.classList.add("ui-widget-header"), t.tab.classList.remove("ui-state-active"), void 0 !== t.rowPane ? t.rowPane.style.display = "none" : t.container.style.display = "none"
            }
        }),
        T = g.extend({
            options: {
                disable_theme_rules: !1
            },
            rules: {},
            addInputError: function(t, e) {
                if (t.errmsg) t.errmsg.style.display = "block";
                else {
                    var i = this.closest(t, ".form-control");
                    t.errmsg = document.createElement("div"), t.errmsg.setAttribute("class", "errmsg"), i.appendChild(t.errmsg)
                }
                t.errmsg.innerHTML = "", t.errmsg.appendChild(document.createTextNode(e))
            },
            removeInputError: function(t) {
                t.style.borderColor = "", t.errmsg && (t.errmsg.style.display = "none")
            }
        }),
        j = g.extend({
            options: {
                disable_theme_rules: !1
            },
            rules: {
                'div[data-schemaid="root"]:after': 'position:relative;color:red;margin:10px 0;font-weight:600;display:block;width:100%;text-align:center;content:"This is an old JSON-Editor 1.x Theme and might not display elements correctly when used with the 2.x version"'
            },
            setGridColumnSize: function(t, e) {
                t.classList.add("col"), t.classList.add("s" + e)
            },
            getHeaderButtonHolder: function() {
                return this.getButtonHolder()
            },
            getButtonHolder: function() {
                return document.createElement("span")
            },
            getButton: function(t, e, i) {
                t && (e.classList.add("left"), e.style.marginRight = "5px");
                var s = this._super(t, e, i);
                return s.classList.add("waves-effect", "waves-light", "btn"), s.style.fontSize = "0.75rem", s.style.height = "24px", s.style.lineHeight = "24px", s.style.marginLeft = "5px", s.style.padding = "0 0.5rem", s
            },
            afterInputReady: function(t) {
                var e = t.previousSibling;
                t.type && "range" === t.type && (e = t.parentElement.previousSibling), (t.value || t.dataset.containerFor && "radio" === t.dataset.containerFor) && e && "label" === e.localName && e.classList.add("active")
            },
            getFormControl: function(t, e, i, s) {
                var n, r = e.type;
                if (r && ("checkbox" === r || "radio" === r)) {
                    if (n = document.createElement("p"), t) {
                        var o = document.createElement("span");
                        o.innerHTML = t.innerHTML, t.innerHTML = "", t.setAttribute("for", e.id), n.appendChild(t), t.appendChild(e), t.appendChild(o)
                    } else n.appendChild(e);
                    return n
                }
                return n = this._super(t, e, i, s), r && r.startsWith("select") || n.classList.add("input-field"), r && "color" === r && (e.style.height = "3rem", e.style.width = "100%", e.style.margin = "5px 0 20px 0", e.style.padding = "3px", t && (t.style.transform = "translateY(-14px) scale(0.8)", t.style["-webkit-transform"] = "translateY(-14px) scale(0.8)", t.style["-webkit-transform-origin"] = "0 0", t.style["transform-origin"] = "0 0")), n
            },
            getDescription: function(t) {
                var e = document.createElement("div");
                return e.classList.add("grey-text"), e.style.marginTop = "-15px", window.DOMPurify ? e.innerHTML = window.DOMPurify.sanitize(t) : e.textContent = this.cleanText(t), e
            },
            getHeader: function(t) {
                var e = document.createElement("h5");
                return "string" == typeof t ? e.textContent = t : e.appendChild(t), e
            },
            getChildEditorHolder: function() {
                var t = document.createElement("div");
                return t.marginBottom = "10px", t
            },
            getIndentedPanel: function() {
                var t = document.createElement("div");
                return t.classList.add("card-panel"), t
            },
            getTable: function() {
                var t = document.createElement("table");
                return t.classList.add("striped", "bordered"), t.style.marginBottom = "10px", t
            },
            getTableRow: function() {
                return document.createElement("tr")
            },
            getTableHead: function() {
                return document.createElement("thead")
            },
            getTableBody: function() {
                return document.createElement("tbody")
            },
            getTableHeaderCell: function(t) {
                var e = document.createElement("th");
                return e.textContent = t, e
            },
            getTableCell: function() {
                return document.createElement("td")
            },
            getTabHolder: function() {
                var t = ['<div class="col s2">', '   <ul class="tabs" style="height: auto; margin-top: 0.82rem; -ms-flex-direction: column; -webkit-flex-direction: column; flex-direction: column; display: -webkit-flex; display: flex;">', "   </ul>", "</div>", '<div class="col s10">', "<div>"].join("\n"),
                    e = document.createElement("div");
                return e.classList.add("row", "card-panel"), e.innerHTML = t, e
            },
            addTab: function(t, e) {
                t.children[0].children[0].appendChild(e)
            },
            getTab: function(t) {
                var e = document.createElement("li");
                return e.classList.add("tab"), e.style = e.style || {}, this.applyStyles(e, {
                    width: "100%",
                    textAlign: "left",
                    lineHeight: "24px",
                    height: "24px",
                    fontSize: "14px",
                    cursor: "pointer"
                }), e.appendChild(t), e
            },
            markTabActive: function(t) {
                t.style = t.style || {}, this.applyStyles(t, {
                    width: "100%",
                    textAlign: "left",
                    lineHeight: "24px",
                    height: "24px",
                    fontSize: "14px",
                    cursor: "pointer",
                    color: "rgba(238,110,115,1)",
                    transition: "border-color .5s ease",
                    borderRight: "3px solid #424242"
                })
            },
            markTabInactive: function(t) {
                t.style = t.style || {}, this.applyStyles(t, {
                    width: "100%",
                    textAlign: "left",
                    lineHeight: "24px",
                    height: "24px",
                    fontSize: "14px",
                    cursor: "pointer",
                    color: "rgba(238,110,115,0.7)"
                })
            },
            getTabContentHolder: function(t) {
                return t.children[1]
            },
            getTabContent: function() {
                return document.createElement("div")
            },
            addInputError: function(t, e) {
                var i, s = t.parentNode;
                s && (this.removeInputError(t), (i = document.createElement("div")).classList.add("error-text", "red-text"), i.textContent = e, s.appendChild(i))
            },
            removeInputError: function(t) {
                var e, i = t.parentElement;
                if (i) {
                    e = i.getElementsByClassName("error-text");
                    for (var s = 0; s < e.length; s++) i.removeChild(e[s])
                }
            },
            addTableRowError: function(t) {},
            removeTableRowError: function(t) {},
            getSelectInput: function(t, e) {
                var i = this._super(t);
                return i.classList.add("browser-default"), i
            },
            getTextareaInput: function() {
                var t = document.createElement("textarea");
                return t.style.marginBottom = "5px", t.style.fontSize = "1rem", t.style.fontFamily = "monospace", t
            },
            getCheckbox: function() {
                var t = this.getFormInputField("checkbox");
                return t.id = this.createUuid(), t
            },
            getModal: function() {
                var t = document.createElement("div");
                return t.classList.add("card-panel", "z-depth-3"), t.style.padding = "5px", t.style.position = "absolute", t.style.zIndex = "10", t.style.display = "none", t
            },
            createUuid: function() {
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
                    var e = 16 * Math.random() | 0;
                    return ("x" === t ? e : 3 & e | 8).toString(16)
                })
            }
        }),
        A = g.extend({
            options: {
                disable_theme_rules: !1,
                label_bold: !0,
                align_bottom: !1,
                object_indent: !1,
                object_border: !1,
                table_border: !1,
                table_zebrastyle: !1,
                input_size: "normal"
            },
            rules: {
                "*": "--primary-color:#5755d9;--gray-color:#bcc3ce;--light-color:#fff",
                ".slider:focus": "box-shadow: none",
                "h4>label+.btn-group": "margin-left:1rem",
                ".text-right>button": "margin-right: 0 !important",
                ".text-left>button": "margin-left: 0 !important",
                ".json-editor-btntype-properties+div>.property-selector": "font-size: .7rem;font-weight: normal; max-height:260px!important;width:395px!important",
                ".json-editor-btntype-properties+div>.property-selector .form-checkbox": "margin:0",
                textarea: "width:100%;min-height: 2rem;resize:vertical",
                table: "border-collapse: collapse;",
                ".table td": "padding: .4rem .4rem;",
                ".mr-5": "margin-right: 1rem !important;",
                'div[data-schematype]:not([data-schematype="object"])': "transition:.5s",
                'div[data-schematype]:not([data-schematype="object"]):hover': "background-color: #eee",
                ".je-table-border td": "border: .05rem solid #dadee4 !important",
                ".btn-info": "font-size:.5rem;font-weight:bold;height:.8rem;padding:.15rem 0;line-height:.8;margin:.3rem 0 .3rem .1rem;",
                ".je-label+select": "min-width: 5rem",
                ".je-label": "font-weight: 600",
                ".btn-action.btn-info": "width: .8rem;",
                ".je-border": "border:.05rem solid #dadee4",
                ".je-panel": "padding:.2rem;margin:.2rem;background-color: rgba(218,222,228,.1)",
                ".je-panel-top": "padding:.2rem;margin:.2rem;background-color: rgba(218,222,228,.1)",
                ".required:after": 'content: " *";color: red;font:inherit',
                ".je-align-bottom": "margin-top: auto",
                ".je-desc": "font-size: smaller;margin: .2rem 0;",
                ".columns .container.je-noindent": "padding-left:0;padding-right:0;",
                ".selectize-control.multi .item": "background: var(--primary-color) !important;",
                ".select2-container--default .select2-selection--single .select2-selection__arrow": "display: none",
                ".select2-container--default .select2-selection--single": "border: none;",
                ".select2-container .select2-selection--single .select2-selection__rendered": "padding: 0; ",
                ".select2-container .select2-search--inline .select2-search__field": "margin-top: 0;",
                ".select2-container--default.select2-container--focus .select2-selection--multiple": "border: .05rem solid var(--gray-color);",
                ".select2-container--default .select2-selection--multiple .select2-selection__choice": "margin:.4rem .2rem .2rem 0;padding:2px 5px;background-color:var(--primary-color);color:var(--light-color)",
                ".select2-container--default .select2-search--inline .select2-search__field": "line-height: normal;",
                ".choices": "margin-bottom: auto",
                ".choices__list--multiple .choices__item": "border:none;background-color:var(--primary-color);color:var(--light-color)",
                '.choices[data-type*="select-multiple"] .choices__button': "border-left:.05rem solid #2826A6",
                ".choices__inner": "font-size: inherit;min-height: 20px;padding: 4px 7.5px 4px 3.75px",
                '.choices[data-type*="select-one"] .choices__inner': "padding-bottom: 4px",
                ".choices__list--dropdown .choices__item": "font-size:inherit"
            },
            setGridColumnSize: function(t, e, i) {
                t.classList.add("col-" + e), i && t.classList.add("col-mx-auto")
            },
            getGridContainer: function() {
                var t = document.createElement("div");
                return t.classList.add("container"), this.options.object_indent || t.classList.add("je-noindent"), t
            },
            getGridRow: function() {
                var t = document.createElement("div");
                return t.classList.add("columns"), t
            },
            getGridColumn: function() {
                var t = document.createElement("div");
                return t.classList.add("column"), this.options.align_bottom && t.classList.add("je-align-bottom"), t
            },
            getIndentedPanel: function() {
                var t = document.createElement("div");
                return t.classList.add("je-panel"), this.options.object_border && t.classList.add("je-border"), t
            },
            getTopIndentedPanel: function() {
                var t = document.createElement("div");
                return t.classList.add("je-panel-top"), this.options.object_border && t.classList.add("je-border"), t
            },
            getHeaderButtonHolder: function() {
                return this.getButtonHolder()
            },
            getButtonHolder: function() {
                var t = this._super();
                return t.classList.add("btn-group"), t
            },
            getFormButtonHolder: function(t) {
                var e = this._super();
                return e.classList.remove("btn-group"), "center" === t ? e.classList.add("text-center") : "right" === t ? e.classList.add("text-right") : e.classList.add("text-left"), e
            },
            getFormButton: function(t, e, i) {
                var s = this._super(t, e, i);
                return s.classList.add("btn", "btn-primary", "mx-2", "my-1"), "small" !== this.options.input_size && s.classList.remove("btn-sm"), "large" === this.options.input_size && s.classList.add("btn-lg"), s
            },
            getButton: function(t, e, i) {
                var s = this._super(t, e, i);
                return s.classList.add("btn", "btn-sm", "btn-primary", "mr-2", "my-1"), s
            },
            getHeader: function(t) {
                var e = document.createElement("h4");
                return "string" == typeof t ? e.textContent = t : e.appendChild(t), e
            },
            getFormInputDescription: function(t) {
                var e = this._super(t);
                return e.classList.add("je-desc", "hide-sm"), e
            },
            getFormInputLabel: function(t, e) {
                var i = this._super(t, e);
                return this.options.label_bold && i.classList.add("je-label"), i
            },
            getCheckbox: function() {
                return this.getFormInputField("checkbox")
            },
            getCheckboxLabel: function(t, e) {
                var i = this._super(t, e),
                    s = document.createElement("i");
                return s.classList.add("form-icon"), i.classList.add("form-checkbox", "mr-5"), i.insertBefore(s, i.firstChild), i
            },
            getFormCheckboxControl: function(t, e, i) {
                return t.insertBefore(e, t.firstChild), i && t.classList.add("form-inline"), t
            },
            getMultiCheckboxHolder: function(t, e, i, s) {
                return console.log("mul"), this._super(t, e, i, s)
            },
            getFormRadio: function(t) {
                var e = this.getFormInputField("radio");
                for (var i in t) e.setAttribute(i, t[i]);
                return e
            },
            getFormRadioLabel: function(t, e) {
                var i = this._super(t, e),
                    s = document.createElement("i");
                return s.classList.add("form-icon"), i.classList.add("form-radio"), i.insertBefore(s, i.firstChild), i
            },
            getFormRadioControl: function(t, e, i) {
                return t.insertBefore(e, t.firstChild), i && t.classList.add("form-inline"), t
            },
            getFormInputField: function(t) {
                var e = this._super(t);
                return ["checkbox", "radio"].indexOf(t) < 0 && e.classList.add("form-input"), e
            },
            getRangeInput: function(t, e, i) {
                var s = this.getFormInputField("range");
                return s.classList.add("slider"), s.classList.remove("form-input"), s.setAttribute("oninput", 'this.setAttribute("value", this.value)'), s.setAttribute("min", t), s.setAttribute("max", e), s.setAttribute("step", i), s
            },
            getRangeControl: function(t, e) {
                var i = this._super(t, e);
                return i.classList.add("text-center"), i
            },
            getSelectInput: function(t, e) {
                var i = this._super(t);
                return i.classList.add("form-select"), i
            },
            getTextareaInput: function() {
                var t = document.createElement("textarea");
                return t.classList.add("form-input"), t
            },
            getFormControl: function(t, e, i, s) {
                var n = document.createElement("div");
                return n.classList.add("form-group"), t && ("checkbox" === e.type && (t = this.getFormCheckboxControl(t, e, !1)), t.classList.add("form-label"), n.appendChild(t), s && n.insertBefore(s, n.firstChild)), "small" === this.options.input_size ? e.classList.add("input-sm", "select-sm") : "large" === this.options.input_size && e.classList.add("input-lg", "select-lg"), "checkbox" !== e.type && n.appendChild(e), i && n.appendChild(i), n
            },
            getInputGroup: function(t, e) {
                if (t) {
                    var i = document.createElement("div");
                    i.classList.add("input-group"), i.appendChild(t);
                    for (var s = 0; s < e.length; s++) e[s].classList.add("input-group-btn"), e[s].classList.remove("btn-sm", "mr-2", "my-1"), i.appendChild(e[s]);
                    return i
                }
            },
            getInfoButton: function(t) {
                var e = document.createElement("div");
                e.classList.add("popover", "popover-left", "float-right");
                var i = document.createElement("button");
                i.classList.add("btn", "btn-secondary", "btn-info", "btn-action", "s-circle"), i.setAttribute("tabindex", "-1"), e.appendChild(i);
                var s = document.createTextNode("I");
                i.appendChild(s);
                var n = document.createElement("div");
                n.classList.add("popover-container"), e.appendChild(n);
                var r = document.createElement("div");
                r.classList.add("card"), n.appendChild(r);
                var o = document.createElement("div");
                return o.classList.add("card-body"), o.innerHTML = t, r.appendChild(o), e
            },
            getTable: function() {
                var t = this._super();
                return t.classList.add("table", "table-scroll"), this.options.table_border && t.classList.add("je-table-border"), this.options.table_zebrastyle && t.classList.add("table-striped"), t
            },
            getTabHolder: function(t) {
                var e = void 0 === t ? "" : t,
                    i = document.createElement("div");
                return i.classList.add("columns"), i.innerHTML = '<div class="column col-2"></div><div class="column col-10 content" id="' + e + '"></div>', i
            },
            getTopTabHolder: function(t) {
                var e = void 0 === t ? "" : t,
                    i = document.createElement("div");
                return i.innerHTML = '<ul class="tab"></ul><div class="content" id="' + e + '"></div>', i
            },
            getTab: function(t, e) {
                var i = document.createElement("a");
                return i.classList.add("btn", "btn-secondary", "btn-block"), i.id = e, i.innerHTML = t.innerHTML, i
            },
            getTopTab: function(t, e) {
                var i = document.createElement("li");
                i.id = e, i.classList.add("tab-item");
                var s = document.createElement("a");
                return s.href = "#", s.innerHTML = t.innerHTML, i.appendChild(s), i
            },
            markTabActive: function(t) {
                t.tab.classList.add("active"), void 0 !== t.rowPane ? t.rowPane.style.display = "" : t.container.style.display = ""
            },
            markTabInactive: function(t) {
                t.tab.classList.remove("active"), void 0 !== t.rowPane ? t.rowPane.style.display = "none" : t.container.style.display = "none"
            },
            afterInputReady: function(t) {
                if ("select" === t.localName)
                    if (t.classList.contains("selectized")) {
                        var e = t.nextSibling;
                        e && (e.classList.remove("form-select"), r(e.querySelectorAll(".form-select"), function(t, e) {
                            e.classList.remove("form-select")
                        }))
                    } else if (t.classList.contains("select2-hidden-accessible")) {
                    var i = t.nextSibling;
                    i && i.querySelector(".select2-selection--single") && i.classList.add("form-select")
                }
                t.controlgroup || (t.controlgroup = this.closest(t, ".form-group"), this.closest(t, ".compact") && (t.controlgroup.style.marginBottom = 0))
            },
            addInputError: function(t, e) {
                t.controlgroup && (t.controlgroup.classList.add("has-error"), t.errmsg || (t.errmsg = document.createElement("p"), t.errmsg.classList.add("form-input-hint"), t.controlgroup.appendChild(t.errmsg)), t.errmsg.classList.remove("d-hide"), t.errmsg.textContent = e)
            },
            removeInputError: function(t) {
                t.errmsg && (t.errmsg.classList.add("d-hide"), t.controlgroup.classList.remove("has-error"))
            }
        }),
        I = g.extend({
            options: {
                disable_theme_rules: !1,
                label_bold: !1,
                object_panel_default: !0,
                object_indent: !0,
                object_border: !1,
                table_border: !1,
                table_hdiv: !1,
                table_zebrastyle: !1,
                input_size: "small",
                enable_compact: !1
            },
            rules: {
                ".slider": "-webkit-appearance: none;-moz-appearance: none;appearance: none;background: transparent;display: block;border: none;height: 1.2rem;width: 100%;",
                ".slider:focus": "box-shadow: 0 0 0 0 rgba(87, 85, 217, .2); outline: none;",
                ".slider.tooltip:not([data-tooltip])::after": "content: attr(value);",
                ".slider::-webkit-slider-thumb": "-webkit-appearance: none;background: #F17405;border-radius: 100%;height: .6rem;margin-top: -.25rem;transition: transform .2s;width: .6rem;",
                ".slider:active::-webkit-slider-thumb": "transform: scale(1.25); outline: none;",
                ".slider::-webkit-slider-runnable-track": "background: #B2B4B6;border-radius: .1rem;height: .1rem;width: 100%;",
                "a.tooltips": "position: relative;display: inline;",
                "a.tooltips span": "position: absolute; white-space: nowrap; width:auto;padding-left:1rem;padding-right:1rem;color: #FFFFFF;background: rgba(56, 56, 56, 0.85);height:1.5rem;line-height: 1.5rem;text-align: center;visibility: hidden;border-radius: 3px;",
                "a.tooltips span:after": "content: '';position: absolute;top: 50%;left: 100%;margin-top: -5px;width: 0; height: 0;border-left: 5px solid rgba(56, 56, 56, 0.85);border-top: 5px solid transparent;border-bottom: 5px solid transparent;",
                "a:hover.tooltips span": "visibility: visible;opacity: 0.9;font-size:0.8rem;right: 100%;top: 50%;margin-top: -12px;margin-right: 10px;z-index: 999;",
                ".json-editor-btntype-properties+div": "font-size: .8rem;font-weight: normal;",
                textarea: "width:100%;min-height: 2rem;resize:vertical",
                table: "width:100%;border-collapse: collapse;",
                ".table td": "padding: .0rem .0rem;",
                'div[data-schematype]:not([data-schematype="object"])': "transition:.5s",
                'div[data-schematype]:not([data-schematype="object"]):hover': "background-color: #E6F4FE",
                'div[data-schemaid="root"]': "position: relative;width:inherit;display:inherit;overflow-x: hidden;z-index:10",
                "select[multiple]": "height:auto;",
                "select[multiple].from-select": "height:auto;",
                ".je-table-zebra:nth-child(even)": "background-color: #f2f2f2;",
                ".je-table-border": "border: 0.5px solid black;",
                ".je-table-hdiv": "border-bottom: 1px solid black;",
                ".je-border": "border:.05rem solid #3182CE",
                ".je-panel": "width:inherit; padding:.2rem;margin:.2rem;background-color: rgba(218,222,228,.1)",
                ".je-panel-top": "width:100%; padding:.2rem;margin:.2rem;background-color: rgba(218,222,228,.1)",
                ".required:after": 'content: " *";color: red;font:inherit;font-weight: bold;',
                ".je-desc": "font-size: smaller;margin: .2rem 0;",
                ".container-xl.je-noindent": "padding-left:0;padding-right:0;",
                ".json-editor-btntype-add": "color: white; margin:.3rem; padding: 0.3rem .8rem; background-color: #4299E1; box-shadow: 3px 3px 5px 1px rgba(4,4,4,0.2);-webkit-box-shadow: 3px 3px 5px 1px rgba(4,4,4,0.2);-moz-box-shadow: 3px 3px 5px 1px rgba(4,4,4,0.2);",
                ".json-editor-btntype-deletelast": "color: white;margin:.3rem; padding: 0.3rem .8rem; background-color: #E53E3E; box-shadow: 3px 3px 5px 1px rgba(4,4,4,0.2);-webkit-box-shadow: 3px 3px 5px 1px rgba(4,4,4,0.2);-moz-box-shadow: 3px 3px 5px 1px rgba(4,4,4,0.2);",
                ".json-editor-btntype-deleteall": "color: white;margin:.3rem; padding: 0.3rem .8rem; background-color: #000000; box-shadow: 3px 3px 5px 1px rgba(4,4,4,0.2);-webkit-box-shadow: 3px 3px 5px 1px rgba(4,4,4,0.2);-moz-box-shadow: 3px 3px 5px 1px rgba(4,4,4,0.2);",
                ".json-editor-btn-save": "float:right; color: white; margin: 0.3rem; padding: 0.3rem .8rem; background-color: #2B6CB0; box-shadow: 3px 3px 5px 1px rgba(4,4,4,0.2);-webkit-box-shadow: 3px 3px 5px 1px rgba(4,4,4,0.2);-moz-box-shadow: 3px 3px 5px 1px rgba(4,4,4,0.2);",
                ".json-editor-btn-back": "color: white; margin:.3rem; padding: 0.3rem .8rem; background-color: #2B6CB0; box-shadow: 3px 3px 5px 1px rgba(4,4,4,0.2);-webkit-box-shadow: 3px 3px 5px 1px rgba(4,4,4,0.2);-moz-box-shadow: 3px 3px 5px 1px rgba(4,4,4,0.2);",
                ".json-editor-btntype-delete": "color: #E53E3E; background-color: rgba(218,222,228,.1);margin:.03rem; padding: 0.1rem;",
                ".json-editor-btntype-move": "color: #000000; background-color: rgba(218,222,228,.1);margin:.03rem; padding: 0.1rem;",
                ".json-editor-btn-collapse": "padding: 0em .8rem;font-size:1.3rem;color: #E53E3E;background-color: rgba(218,222,228,.1);"
            },
            getGridContainer: function() {
                var t = document.createElement("div");
                return t.classList.add("flex", "flex-col", "w-full"), this.options.object_indent || t.classList.add("je-noindent"), t
            },
            getGridRow: function() {
                var t = document.createElement("div");
                return t.classList.add("flex", "flex-wrap", "w-full"), t
            },
            getGridColumn: function() {
                var t = document.createElement("div");
                return t.classList.add("flex", "flex-col"), t
            },
            setGridColumnSize: function(t, e, i) {
                e > 0 && e < 12 ? t.classList.add("w-" + e + "/12", "px-1") : t.classList.add("w-full", "px-1"), i && (t.style.marginLeft = 100 / 12 * i + "%")
            },
            getIndentedPanel: function() {
                var t = document.createElement("div");
                return this.options.object_panel_default ? t.classList.add("w-full", "p-1") : t.classList.add("relative", "flex", "flex-col", "rounded", "break-words", "border", "bg-white", "border-0", "border-blue-400", "p-1", "shadow-md"), this.options.object_border && t.classList.add("je-border"), t
            },
            getTopIndentedPanel: function() {
                var t = document.createElement("div");
                return this.options.object_panel_default ? t.classList.add("w-full", "m-2") : t.classList.add("relative", "flex", "flex-col", "rounded", "break-words", "border", "bg-white", "border-0", "border-blue-400", "p-1", "shadow-md"), this.options.object_border && t.classList.add("je-border"), t
            },
            getTitle: function() {
                return this.schema.title
            },
            getSelectInput: function(t, e) {
                var i = this._super(t);
                return e ? i.classList.add("form-multiselect", "block", "py-0", "h-auto", "w-full", "px-1", "text-sm", "text-black", "leading-normal", "bg-white", "border", "border-grey", "rounded") : i.classList.add("form-select", "block", "py-0", "h-6", "w-full", "px-1", "text-sm", "text-black", "leading-normal", "bg-white", "border", "border-grey", "rounded"), this.options.enable_compact && i.classList.add("compact"), i
            },
            afterInputReady: function(t) {
                t.controlgroup || (t.controlgroup = this.closest(t, ".form-group"), this.closest(t, ".compact") && (t.controlgroup.style.marginBottom = 0))
            },
            getTextareaInput: function() {
                var t = this._super();
                return t.classList.add("block", "w-full", "px-1", "text-sm", "leading-normal", "bg-white", "text-black", "border", "border-grey", "rounded"), this.options.enable_compact && t.classList.add("compact"), t.style.height = 0, t
            },
            getRangeInput: function(t, e, i) {
                var s = this.getFormInputField("range");
                return s.classList.add("slider"), this.options.enable_compact && s.classList.add("compact"), s.setAttribute("oninput", 'this.setAttribute("value", this.value)'), s.setAttribute("min", t), s.setAttribute("max", e), s.setAttribute("step", i), s
            },
            getRangeControl: function(t, e) {
                var i = this._super(t, e);
                return i.classList.add("text-center", "text-black"), i
            },
            getCheckbox: function() {
                var t = this.getFormInputField("checkbox");
                return t.classList.add("form-checkbox", "text-red-600"), t
            },
            getCheckboxLabel: function(t, e) {
                var i = this._super(t, e);
                return i.classList.add("inline-flex", "items-center"), i
            },
            getFormCheckboxControl: function(t, e, i) {
                return t.insertBefore(e, t.firstChild), i && t.classList.add("inline-flex flex-row"), t
            },
            getMultiCheckboxHolder: function(t, e, i, s) {
                var n = this._super(t, e, i, s);
                return n.classList.add("inline-flex", "flex-col"), n
            },
            getFormRadio: function(t) {
                var e = this.getFormInputField("radio");
                for (var i in e.classList.add("form-radio", "text-red-600"), t) e.setAttribute(i, t[i]);
                return e
            },
            getFormRadioLabel: function(t, e) {
                var i = this._super(t, e);
                return i.classList.add("inline-flex", "items-center", "mr-2"), i
            },
            getFormRadioControl: function(t, e, i) {
                return t.insertBefore(e, t.firstChild), i && t.classList.add("form-radio"), t
            },
            getRadioHolder: function(t, e, i, s, n) {
                var r = this._super(e, i, s, n);
                return "h" === t.options.layout ? r.classList.add("inline-flex", "flex-row") : r.classList.add("inline-flex", "flex-col"), r
            },
            getFormInputLabel: function(t, e) {
                var i = this._super(t, e);
                return this.options.label_bold ? i.classList.add("font-bold") : i.classList.add("required"), i
            },
            getFormInputField: function(t) {
                var e = this._super(t);
                return ["checkbox", "radio"].indexOf(t) < 0 && e.classList.add("block", "w-full", "px-1", "text-black", "text-sm", "leading-normal", "bg-white", "border", "border-grey", "rounded"), this.options.enable_compact && e.classList.add("compact"), e
            },
            getFormInputDescription: function(t) {
                var e = document.createElement("p");
                return e.classList.add("block", "mt-1", "text-xs"), window.DOMPurify ? e.innerHTML = window.DOMPurify.sanitize(t) : e.textContent = this.cleanText(t), e
            },
            getFormControl: function(t, e, i, s) {
                var n = document.createElement("div");
                return n.classList.add("form-group", "mb-1", "w-full"), t && (t.classList.add("text-xs"), "checkbox" === e.type && (e.classList.add("form-checkbox", "text-xs", "text-red-600", "mr-1"), t.classList.add("items-center", "flex"), t = this.getFormCheckboxControl(t, e, !1, s)), "radio" === e.type && (e.classList.add("form-radio", "text-red-600", "mr-1"), t.classList.add("items-center", "flex"), t = this.getFormRadioControl(t, e, !1, s)), n.appendChild(t), ["checkbox", "radio"].indexOf(e.type) < 0 && s && n.appendChild(s)), ["checkbox", "radio"].indexOf(e.type) < 0 && ("small" === this.options.input_size ? e.classList.add("text-xs") : "normal" === this.options.input_size ? e.classList.add("text-base") : "large" === this.options.input_size && e.classList.add("text-xl"), n.appendChild(e)), i && n.appendChild(i), n
            },
            getHeaderButtonHolder: function() {
                var t = this.getButtonHolder();
                return t.classList.add("text-sm"), t
            },
            getButtonHolder: function() {
                var t = document.createElement("div");
                return t.classList.add("flex", "relative", "inline-flex", "align-middle"), t
            },
            getButton: function(t, e, i) {
                var s = this._super(t, e, i);
                return s.classList.add("inline-block", "align-middle", "text-center", "text-sm", "bg-blue-700", "text-white", "py-1", "pr-1", "m-2", "shadow", "select-none", "whitespace-no-wrap", "rounded"), s
            },
            getInfoButton: function(t) {
                var e = document.createElement("a");
                e.classList.add("tooltips", "float-right"), e.innerHTML = "ⓘ";
                var i = document.createElement("span");
                return i.innerHTML = t, e.appendChild(i), e
            },
            getTable: function() {
                var t = this._super();
                return this.options.table_border ? t.classList.add("je-table-border") : t.classList.add("table", "border", "p-0"), t
            },
            getTableRow: function() {
                var t = this._super();
                return this.options.table_border && t.classList.add("je-table-border"), this.options.table_zebrastyle && t.classList.add("je-table-zebra"), t
            },
            getTableHeaderCell: function(t) {
                var e = this._super(t);
                return this.options.table_border ? e.classList.add("je-table-border") : this.options.table_hdiv ? e.classList.add("je-table-hdiv") : e.classList.add("text-xs", "border", "p-0", "m-0"), e
            },
            getTableCell: function() {
                var t = this._super();
                return this.options.table_border ? t.classList.add("je-table-border") : this.options.table_hdiv ? t.classList.add("je-table-hdiv") : t.classList.add("border-0", "p-0", "m-0"), t
            },
            addInputError: function(t, e) {
                t.controlgroup && (t.controlgroup.classList.add("has-error"), t.classList.add("bg-red-600"), t.errmsg ? t.errmsg.style.display = "" : (t.errmsg = document.createElement("p"), t.errmsg.classList.add("block", "mt-1", "text-xs", "text-red"), t.controlgroup.appendChild(t.errmsg)), t.errmsg.textContent = e)
            },
            removeInputError: function(t) {
                t.errmsg && (t.errmsg.style.display = "none", t.classList.remove("bg-red-600"), t.controlgroup.classList.remove("has-error"))
            },
            getTabHolder: function(t) {
                var e = document.createElement("div"),
                    i = void 0 === t ? "" : t;
                return e.innerHTML = "<div class='w-2/12' id='" + i + "'><ul class='list-reset pl-0 mb-0'></ul></div><div class='w-10/12' id='" + i + "'></div>", e.classList.add("flex"), e
            },
            addTab: function(t, e) {
                t.children[0].children[0].appendChild(e)
            },
            getTopTabHolder: function(t) {
                var e = void 0 === t ? "" : t,
                    i = document.createElement("div");
                return i.innerHTML = "<ul class='nav-tabs flex list-reset pl-0 mb-0 border-b border-grey-light' id='" + e + "'></ul><div class='p-6 block' id='" + e + "'></div>", i
            },
            getTab: function(t, e) {
                var i = document.createElement("li");
                i.classList.add("nav-item", "flex-col", "text-center", "text-white", "bg-blue-500", "shadow-md", "border", "p-2", "mb-2", "mr-2", "hover:bg-blue-400", "rounded");
                var s = document.createElement("a");
                return s.classList.add("nav-link", "text-center"), s.setAttribute("href", "#" + e), s.setAttribute("data-toggle", "tab"), s.appendChild(t), i.appendChild(s), i
            },
            getTopTab: function(t, e) {
                var i = document.createElement("li");
                i.classList.add("nav-item", "flex", "border-l", "border-t", "border-r");
                var s = document.createElement("a");
                return s.classList.add("nav-link", "-mb-px", "flex-row", "text-center", "bg-white", "p-2", "hover:bg-blue-400", "rounded-t"), s.setAttribute("href", "#" + e), s.setAttribute("data-toggle", "tab"), s.appendChild(t), i.appendChild(s), i
            },
            getTabContent: function() {
                var t = document.createElement("div");
                return t.setAttribute("role", "tabpanel"), t
            },
            getTopTabContent: function() {
                var t = document.createElement("div");
                return t.setAttribute("role", "tabpanel"), t
            },
            markTabActive: function(t) {
                t.tab.firstChild.classList.add("block"), !0 === t.tab.firstChild.classList.contains("border-b") ? (t.tab.firstChild.classList.add("border-b-0"), t.tab.firstChild.classList.remove("border-b")) : t.tab.firstChild.classList.add("border-b-0"), !0 === t.container.classList.contains("hidden") ? (t.container.classList.remove("hidden"), t.container.classList.add("block")) : t.container.classList.add("block")
            },
            markTabInactive: function(t) {
                !0 === t.tab.firstChild.classList.contains("border-b-0") ? (t.tab.firstChild.classList.add("border-b"), t.tab.firstChild.classList.remove("border-b-0")) : t.tab.firstChild.classList.add("border-b"), !0 === t.container.classList.contains("block") && (t.container.classList.remove("block"), t.container.classList.add("hidden"))
            },
            getProgressBar: function() {
                var t = document.createElement("div");
                t.classList.add("progress");
                var e = document.createElement("div");
                return e.classList.add("bg-blue", "leading-none", "py-1", "text-xs", "text-center", "text-white"), e.setAttribute("role", "progressbar"), e.setAttribute("aria-valuenow", 0), e.setAttribute("aria-valuemin", 0), e.setAttribute("aria-valuenax", 100), e.innerHTML = "0%", t.appendChild(e), t
            },
            updateProgressBar: function(t, e) {
                if (t) {
                    var i = t.firstChild,
                        s = e + "%";
                    i.setAttribute("aria-valuenow", e), i.style.width = s, i.innerHTML = s
                }
            },
            updateProgressBarUnknown: function(t) {
                if (t) {
                    var e = t.firstChild;
                    t.classList.add("progress", "bg-blue", "leading-none", "py-1", "text-xs", "text-center", "text-white", "block"), e.removeAttribute("aria-valuenow"), e.classList.add("w-full"), e.innerHTML = ""
                }
            },
            getInputGroup: function(t, e) {
                if (t) {
                    var i = document.createElement("div");
                    i.classList.add("relative", "items-stretch", "w-full"), i.appendChild(t);
                    var s = document.createElement("div");
                    s.classList.add("-mr-1"), i.appendChild(s);
                    for (var n = 0; n < e.length; n++) s.appendChild(e[n]);
                    return i
                }
            }
        }),
        O = d.extend({
            onChildEditorChange: function(t) {
                this.onChange(!0)
            },
            notify: function() {
                this.path && this.jsoneditor.notifyWatchers(this.path)
            },
            change: function() {
                this.parent ? this.parent.onChildEditorChange(this) : this.jsoneditor && this.jsoneditor.onChange()
            },
            onChange: function(t) {
                this.notify(), this.watch_listener && this.watch_listener(), t && this.change()
            },
            register: function() {
                this.jsoneditor.registerEditor(this), this.onChange()
            },
            unregister: function() {
                this.jsoneditor && this.jsoneditor.unregisterEditor(this)
            },
            getNumColumns: function() {
                return 12
            },
            isActive: function() {
                return this.active
            },
            activate: function() {
                this.active = !0, this.optInCheckbox.checked = !0, this.enable(), this.change()
            },
            deactivate: function() {
                this.isRequired() || (this.active = !1, this.optInCheckbox.checked = !1, this.disable(), this.change())
            },
            init: function(t, e) {
                this.defaults = e, this.jsoneditor = t.jsoneditor, this.theme = this.jsoneditor.theme, this.template_engine = this.jsoneditor.template, this.iconlib = this.jsoneditor.iconlib, this.translate = this.jsoneditor.translate || this.defaults.translate, this.original_schema = t.schema, this.schema = this.jsoneditor.expandSchema(this.original_schema), this.active = !0, this.options = n({}, this.options || {}, this.schema.options || {}, t.schema.options || {}, t), t.path || this.schema.id || (this.schema.id = "root"), this.path = t.path || "root", this.formname = t.formname || this.path.replace(/\.([^.]+)/g, "[$1]"), this.jsoneditor.options.form_name_root && (this.formname = this.formname.replace(/^root\[/, this.jsoneditor.options.form_name_root + "[")), this.parent = t.parent, this.key = void 0 !== this.parent ? this.path.split(".").slice(this.parent.path.split(".").length).join(".") : this.path, this.link_watchers = [], this.watchLoop = !1, t.container && this.setContainer(t.container), this.registerDependencies()
            },
            registerDependencies: function() {
                this.dependenciesFulfilled = !0;
                var t = this.options.dependencies;
                if (t) {
                    var e = this;
                    Object.keys(t).forEach(function(i) {
                        var s = e.path.split(".");
                        s[s.length - 1] = i, s = s.join(".");
                        var n = t[i];
                        e.jsoneditor.watch(s, function() {
                            e.checkDependency(s, n)
                        })
                    })
                }
            },
            checkDependency: function(t, e) {
                var i = this.container || this.control;
                if (this.path !== t && i && null !== this.jsoneditor) {
                    var s = this,
                        n = this.jsoneditor.getEditor(t),
                        r = n ? n.getValue() : void 0,
                        o = this.dependenciesFulfilled;
                    this.dependenciesFulfilled = !1, n && n.dependenciesFulfilled ? Array.isArray(e) ? e.some(function(t) {
                        if (r === t) return s.dependenciesFulfilled = !0, !0
                    }) : "object" == typeof e ? "object" != typeof r ? this.dependenciesFulfilled = e === r : Object.keys(e).some(function(t) {
                        return !!e.hasOwnProperty(t) && (r.hasOwnProperty(t) && e[t] === r[t] ? void(s.dependenciesFulfilled = !0) : (s.dependenciesFulfilled = !1, !0))
                    }) : "string" == typeof e || "number" == typeof e ? this.dependenciesFulfilled = r === e : "boolean" == typeof e && (this.dependenciesFulfilled = e ? r || r.length > 0 : !r || 0 === r.length) : this.dependenciesFulfilled = !1, this.dependenciesFulfilled !== o && this.notify();
                    var a = this.dependenciesFulfilled ? "block" : "none";
                    if ("TD" === i.tagName)
                        for (var l in i.childNodes) i.childNodes.hasOwnProperty(l) && (i.childNodes[l].style.display = a);
                    else i.style.display = a
                }
            },
            setContainer: function(t) {
                this.container = t, this.schema.id && this.container.setAttribute("data-schemaid", this.schema.id), this.schema.type && "string" == typeof this.schema.type && this.container.setAttribute("data-schematype", this.schema.type), this.container.setAttribute("data-schemapath", this.path)
            },
            setOptInCheckbox: function(t) {
                var e = this;
                this.optInCheckbox = document.createElement("input"), this.optInCheckbox.setAttribute("type", "checkbox"), this.optInCheckbox.setAttribute("style", "margin: 0 10px 0 0;"), this.optInCheckbox.classList.add("json-editor-opt-in"), this.optInCheckbox.addEventListener("click", function() {
                    e.isActive() ? e.deactivate() : e.activate()
                }), (this.jsoneditor.options.show_opt_in || this.options.show_opt_in) && this.parent && "object" === this.parent.schema.type && !this.isRequired() && this.header && (this.header.appendChild(this.optInCheckbox), this.header.insertBefore(this.optInCheckbox, this.header.firstChild))
            },
            preBuild: function() {},
            build: function() {},
            postBuild: function() {
                this.setupWatchListeners(), this.addLinks(), this.setValue(this.getDefault(), !0), this.updateHeaderText(), this.register(), this.onWatchedFieldChange()
            },
            setupWatchListeners: function() {
                var t = this;
                if (this.watched = {}, this.schema.vars && (this.schema.watch = this.schema.vars), this.watched_values = {}, this.watch_listener = function() {
                        t.refreshWatchedFieldValues() && t.onWatchedFieldChange()
                    }, this.schema.hasOwnProperty("watch")) {
                    var e, i, s, n, r, o = t.container.getAttribute("data-schemapath");
                    for (var a in this.schema.watch)
                        if (this.schema.watch.hasOwnProperty(a)) {
                            if (e = this.schema.watch[a], Array.isArray(e)) {
                                if (e.length < 2) continue;
                                i = [e[0]].concat(e[1].split("."))
                            } else i = e.split("."), t.theme.closest(t.container, '[data-schemaid="' + i[0] + '"]') || i.unshift("#");
                            if ("#" === (s = i.shift()) && (s = t.jsoneditor.schema.id || "root"), !(n = t.theme.closest(t.container, '[data-schemaid="' + s + '"]'))) throw new Error("Could not find ancestor node with id " + s);
                            r = n.getAttribute("data-schemapath") + "." + i.join("."), o.startsWith(r) && (t.watchLoop = !0), t.jsoneditor.watch(r, t.watch_listener), t.watched[a] = r
                        }
                }
                this.schema.headerTemplate && (this.header_template = this.jsoneditor.compileTemplate(this.schema.headerTemplate, this.template_engine))
            },
            addLinks: function() {
                if (!this.no_link_holder && (this.link_holder = this.theme.getLinksHolder(), this.container.appendChild(this.link_holder), this.schema.links))
                    for (var t = 0; t < this.schema.links.length; t++) this.addLink(this.getLink(this.schema.links[t]))
            },
            onMove: function() {},
            getButton: function(t, e, i) {
                var s = "json-editor-btn-" + e;
                !(e = this.iconlib ? this.iconlib.getIcon(e) : null) && i && (t = i, i = null);
                var n = this.theme.getButton(t, e, i);
                return n.classList.add(s), n
            },
            setButtonText: function(t, e, i, s) {
                return !(i = this.iconlib ? this.iconlib.getIcon(i) : null) && s && (e = s, s = null), this.theme.setButtonText(t, e, i, s)
            },
            addLink: function(t) {
                this.link_holder && this.link_holder.appendChild(t)
            },
            getLink: function(t) {
                var e, i, s = (t.mediaType || "application/javascript").split("/")[0],
                    n = this.jsoneditor.compileTemplate(t.href, this.template_engine),
                    r = this.jsoneditor.compileTemplate(t.rel ? t.rel : t.href, this.template_engine),
                    o = null;
                if (t.download && (o = t.download), o && !0 !== o && (o = this.jsoneditor.compileTemplate(o, this.template_engine)), "image" === s) {
                    e = this.theme.getBlockLinkHolder(), (i = document.createElement("a")).setAttribute("target", "_blank");
                    var a = document.createElement("img");
                    this.theme.createImageLink(e, i, a), this.link_watchers.push(function(t) {
                        var e = n(t),
                            s = r(t);
                        i.setAttribute("href", e), i.setAttribute("title", s || e), a.setAttribute("src", e)
                    })
                } else if (["audio", "video"].indexOf(s) >= 0) {
                    e = this.theme.getBlockLinkHolder(), (i = this.theme.getBlockLink()).setAttribute("target", "_blank");
                    var l = document.createElement(s);
                    l.setAttribute("controls", "controls"), this.theme.createMediaLink(e, i, l), this.link_watchers.push(function(t) {
                        var e = n(t),
                            s = r(t);
                        i.setAttribute("href", e), i.textContent = s || e, l.setAttribute("src", e)
                    })
                } else i = e = this.theme.getBlockLink(), e.setAttribute("target", "_blank"), e.textContent = t.rel, this.link_watchers.push(function(t) {
                    var i = n(t),
                        s = r(t);
                    e.setAttribute("href", i), e.textContent = s || i
                });
                return o && i && (!0 === o ? i.setAttribute("download", "") : this.link_watchers.push(function(t) {
                    i.setAttribute("download", o(t))
                })), t.class && i.classList.add(t.class), e
            },
            refreshWatchedFieldValues: function() {
                if (this.watched_values) {
                    var t, e, i = {},
                        s = !1;
                    if (this.watched)
                        for (var n in this.watched) this.watched.hasOwnProperty(n) && (t = (e = this.jsoneditor.getEditor(this.watched[n])) ? e.getValue() : null, this.watched_values[n] !== t && (s = !0), i[n] = t);
                    return i.self = this.getValue(), this.watched_values.self !== i.self && (s = !0), this.watched_values = i, s
                }
            },
            getWatchedFieldValues: function() {
                return this.watched_values
            },
            updateHeaderText: function() {
                if (this.header) {
                    var t = this.getHeaderText();
                    if (this.header.children.length) {
                        for (var e = 0; e < this.header.childNodes.length; e++)
                            if (3 === this.header.childNodes[e].nodeType) {
                                this.header.childNodes[e].nodeValue = this.cleanText(t);
                                break
                            }
                    } else window.DOMPurify ? this.header.innerHTML = window.DOMPurify.sanitize(t) : this.header.textContent = this.cleanText(t)
                }
            },
            getHeaderText: function(t) {
                return this.header_text ? this.header_text : t ? this.schema.title : this.getTitle()
            },
            cleanText: function(t) {
                var e = document.createElement("div");
                return e.innerHTML = t, e.textContent || e.innerText
            },
            onWatchedFieldChange: function() {
                var t;
                if (this.header_template) {
                    t = n(this.getWatchedFieldValues(), {
                        key: this.key,
                        i: this.key,
                        i0: 1 * this.key,
                        i1: 1 * this.key + 1,
                        title: this.getTitle()
                    });
                    var e = this.header_template(t);
                    e !== this.header_text && (this.header_text = e, this.updateHeaderText(), this.notify())
                }
                if (this.link_watchers.length) {
                    t = this.getWatchedFieldValues();
                    for (var i = 0; i < this.link_watchers.length; i++) this.link_watchers[i](t)
                }
            },
            setValue: function(t) {
                this.value = t
            },
            getValue: function() {
                if (this.dependenciesFulfilled) return this.value
            },
            refreshValue: function() {},
            getChildEditors: function() {
                return !1
            },
            destroy: function() {
                var t = this;
                this.unregister(this), r(this.watched, function(e, i) {
                    t.jsoneditor.unwatch(i, t.watch_listener)
                }), this.watched = null, this.watched_values = null, this.watch_listener = null, this.header_text = null, this.header_template = null, this.value = null, this.container && this.container.parentNode && this.container.parentNode.removeChild(this.container), this.container = null, this.jsoneditor = null, this.schema = null, this.path = null, this.key = null, this.parent = null
            },
            getDefault: function() {
                if (void 0 !== this.schema.default) return this.schema.default;
                if (void 0 !== this.schema.enum) return this.schema.enum[0];
                var t = this.schema.type || this.schema.oneOf;
                if (t && Array.isArray(t) && (t = t[0]), t && "object" == typeof t && (t = t.type), t && Array.isArray(t) && (t = t[0]), "string" == typeof t) {
                    if ("number" === t) return 0;
                    if ("boolean" === t) return !1;
                    if ("integer" === t) return 0;
                    if ("string" === t) return "";
                    if ("object" === t) return {};
                    if ("array" === t) return []
                }
                return null
            },
            getTitle: function() {
                return this.schema.title || this.key
            },
            enable: function() {
                this.disabled = !1
            },
            disable: function() {
                this.disabled = !0
            },
            isEnabled: function() {
                return !this.disabled
            },
            isRequired: function() {
                return "boolean" == typeof this.schema.required ? this.schema.required : this.parent && this.parent.schema && Array.isArray(this.parent.schema.required) ? this.parent.schema.required.indexOf(this.key) > -1 : !!this.jsoneditor.options.required_by_default
            },
            getDisplayText: function(t) {
                var e = [],
                    i = {};
                r(t, function(t, e) {
                    e.title && (i[e.title] = i[e.title] || 0, i[e.title]++), e.description && (i[e.description] = i[e.description] || 0, i[e.description]++), e.format && (i[e.format] = i[e.format] || 0, i[e.format]++), e.type && (i[e.type] = i[e.type] || 0, i[e.type]++)
                }), r(t, function(t, s) {
                    var n;
                    n = "string" == typeof s ? s : s.title && i[s.title] <= 1 ? s.title : s.format && i[s.format] <= 1 ? s.format : s.type && i[s.type] <= 1 ? s.type : s.description && i[s.description] <= 1 ? s.descripton : s.title ? s.title : s.format ? s.format : s.type ? s.type : s.description ? s.description : JSON.stringify(s).length < 500 ? JSON.stringify(s) : "type", e.push(n)
                });
                var s = {};
                return r(e, function(t, n) {
                    s[n] = s[n] || 0, s[n]++, i[n] > 1 && (e[t] = n + " " + s[n])
                }), e
            },
            getValidId: function(t) {
                return (t = void 0 === t ? "" : t.toString()).replace(/\s+/g, "-")
            },
            setInputAttributes: function(t) {
                if (this.schema.options && this.schema.options.inputAttributes) {
                    var e = this.schema.options.inputAttributes,
                        i = ["name", "type"].concat(t);
                    for (var s in e) e.hasOwnProperty(s) && -1 === i.indexOf(s.toLowerCase()) && this.input.setAttribute(s, e[s])
                }
            },
            expandCallbacks: function(t, e) {
                for (var i in e) e.hasOwnProperty(i) && "string" == typeof e[i] && "object" == typeof this.defaults.callbacks[t] && "function" == typeof this.defaults.callbacks[t][e[i]] && (e[i] = this.defaults.callbacks[t][e[i]].bind(null, this));
                return e
            },
            showValidationErrors: function(t) {}
        }),
        P = O.extend({
            register: function() {
                this._super(), this.input && this.input.setAttribute("name", this.formname)
            },
            unregister: function() {
                this._super(), this.input && this.input.removeAttribute("name")
            },
            setValue: function(t, e, i) {
                if ((!this.template || i) && (null == t ? t = "" : "object" == typeof t ? t = JSON.stringify(t) : "string" != typeof t && (t = "" + t), t !== this.serialized)) {
                    var s = this.sanitize(t);
                    if (this.input.value !== s) {
                        this.input.value = s;
                        var n = i || this.getValue() !== t;
                        return this.refreshValue(), e ? this.is_dirty = !1 : "change" === this.jsoneditor.options.show_errors && (this.is_dirty = !0), this.adjust_height && this.adjust_height(this.input), this.onChange(n), {
                            changed: n,
                            value: s
                        }
                    }
                }
            },
            getNumColumns: function() {
                var t, e = Math.ceil(Math.max(this.getTitle().length, this.schema.maxLength || 0, this.schema.minLength || 0) / 5);
                return t = "textarea" === this.input_type ? 6 : ["text", "email"].indexOf(this.input_type) >= 0 ? 4 : 2, Math.min(12, Math.max(e, t))
            },
            build: function() {
                var t = this;
                if (this.options.compact || (this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())), this.schema.description && (this.description = this.theme.getFormInputDescription(this.schema.description)), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.options.infoText)), this.format = this.schema.format, !this.format && this.schema.media && this.schema.media.type && (this.format = this.schema.media.type.replace(/(^(application|text)\/(x-)?(script\.)?)|(-source$)/g, "")), !this.format && this.options.default_format && (this.format = this.options.default_format), this.options.format && (this.format = this.options.format), this.format)
                    if ("textarea" === this.format) this.input_type = "textarea", this.input = this.theme.getTextareaInput();
                    else if ("range" === this.format) {
                    this.input_type = "range";
                    var e = this.schema.minimum || 0,
                        i = this.schema.maximum || Math.max(100, e + 1),
                        s = 1;
                    this.schema.multipleOf && (e % this.schema.multipleOf && (e = Math.ceil(e / this.schema.multipleOf) * this.schema.multipleOf), i % this.schema.multipleOf && (i = Math.floor(i / this.schema.multipleOf) * this.schema.multipleOf), s = this.schema.multipleOf), this.input = this.theme.getRangeInput(e, i, s)
                } else this.input_type = "text", ["button", "checkbox", "color", "date", "datetime-local", "email", "file", "hidden", "image", "month", "number", "password", "radio", "reset", "search", "submit", "tel", "text", "time", "url", "week"].indexOf(this.format) > -1 && (this.input_type = this.format), this.input = this.theme.getFormInputField(this.input_type);
                else this.input_type = "text", this.input = this.theme.getFormInputField(this.input_type);
                void 0 !== this.schema.maxLength && this.input.setAttribute("maxlength", this.schema.maxLength), void 0 !== this.schema.pattern ? this.input.setAttribute("pattern", this.schema.pattern) : void 0 !== this.schema.minLength && this.input.setAttribute("pattern", ".{" + this.schema.minLength + ",}"), this.options.compact ? this.container.classList.add("compact") : this.options.input_width && (this.input.style.width = this.options.input_width), (this.schema.readOnly || this.schema.readonly || this.schema.template) && (this.always_disabled = !0, this.input.setAttribute("readonly", "true")), this.setInputAttributes(["maxlength", "pattern", "readonly", "min", "max", "step"]), this.input.addEventListener("change", function(e) {
                    if (e.preventDefault(), e.stopPropagation(), t.schema.template) this.value = t.value;
                    else {
                        var i = this.value,
                            s = t.sanitize(i);
                        i !== s && (this.value = s), t.is_dirty = !0, t.refreshValue(), t.onChange(!0)
                    }
                }), this.options.input_height && (this.input.style.height = this.options.input_height), this.options.expand_height && (this.adjust_height = function(t) {
                    if (t) {
                        var e, i = t.offsetHeight;
                        if (t.offsetHeight < t.scrollHeight)
                            for (e = 0; t.offsetHeight < t.scrollHeight + 3 && !(e > 100);) e++, i++, t.style.height = i + "px";
                        else {
                            for (e = 0; t.offsetHeight >= t.scrollHeight + 3 && !(e > 100);) e++, i--, t.style.height = i + "px";
                            t.style.height = i + 1 + "px"
                        }
                    }
                }, this.input.addEventListener("keyup", function(e) {
                    t.adjust_height(this)
                }), this.input.addEventListener("change", function(e) {
                    t.adjust_height(this)
                }), this.adjust_height()), this.format && this.input.setAttribute("data-schemaformat", this.format);
                var n = this.input;
                if ("range" === this.format && (n = this.theme.getRangeControl(this.input, this.theme.getRangeOutput(this.input, this.schema.default || Math.max(this.schema.minimum || 0, 0)))), this.control = this.theme.getFormControl(this.label, n, this.description, this.infoButton), this.container.appendChild(this.control), window.requestAnimationFrame(function() {
                        t.input.parentNode && t.afterInputReady(), t.adjust_height && t.adjust_height(t.input)
                    }), this.schema.template) {
                    var r = this.expandCallbacks("template", {
                        template: this.schema.template
                    });
                    "function" == typeof r.template ? this.template = r.template : this.template = this.jsoneditor.compileTemplate(this.schema.template, this.template_engine), this.refreshValue()
                } else this.refreshValue()
            },
            setupCleave: function(t) {
                var e = this.expandCallbacks("cleave", n({}, this.defaults.options.cleave || {}, this.options.cleave || {}));
                "object" == typeof e && Object.keys(e).length > 0 && (this.cleave_instance = new window.Cleave(t, e))
            },
            setupImask: function(t) {
                var e = this.expandCallbacks("imask", n({}, this.defaults.options.imask || {}, this.options.imask || {}));
                "object" == typeof e && Object.keys(e).length > 0 && (this.imask_instance = window.IMask(t, e))
            },
            enable: function() {
                this.always_disabled || (this.input.disabled = !1, this._super())
            },
            disable: function(t) {
                t && (this.always_disabled = !0), this.input.disabled = !0, this._super()
            },
            afterInputReady: function() {
                this.theme.afterInputReady(this.input), window.Cleave && !this.cleave_instance && this.setupCleave(this.input), window.IMask && !this.imask_instance && this.setupImask(this.input)
            },
            refreshValue: function() {
                this.value = this.input.value, "string" != typeof this.value && (this.value = ""), this.serialized = this.value
            },
            destroy: function() {
                this.cleave_instance && this.cleave_instance.destroy(), this.imask_instance && this.imask_instance.destroy(), this.template = null, this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), this.label && this.label.parentNode && this.label.parentNode.removeChild(this.label), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), this._super()
            },
            sanitize: function(t) {
                return t
            },
            onWatchedFieldChange: function() {
                var t;
                this.template && (t = this.getWatchedFieldValues(), this.setValue(this.template(t), !1, !0)), this._super()
            },
            showValidationErrors: function(t) {
                var e = this;
                if ("always" === this.jsoneditor.options.show_errors);
                else if (!this.is_dirty && this.previous_error_setting === this.jsoneditor.options.show_errors) return;
                this.previous_error_setting = this.jsoneditor.options.show_errors;
                var i = [];
                r(t, function(t, s) {
                    s.path === e.path && i.push(s.message)
                }), i.length ? this.theme.addInputError(this.input, i.join(". ") + ".") : this.theme.removeInputError(this.input)
            }
        }),
        H = P.extend({
            setValue: function(t, e, i) {
                var s = this._super(t, e, i);
                void 0 !== s && s.changed && this.ace_editor_instance && (this.ace_editor_instance.setValue(s.value), this.ace_editor_instance.session.getSelection().clearSelection(), this.ace_editor_instance.resize())
            },
            build: function() {
                this.options.format = "textarea", this._super(), this.input_type = this.schema.format, this.input.setAttribute("data-schemaformat", this.input_type)
            },
            afterInputReady: function() {
                var t, e = this;
                if (window.ace) {
                    var i = this.input_type;
                    "cpp" !== i && "c++" !== i && "c" !== i || (i = "c_cpp"), t = this.expandCallbacks("ace", n({}, {
                        selectionStyle: "text",
                        minLines: 30,
                        maxLines: 30
                    }, this.defaults.options.ace || {}, this.options.ace || {}, {
                        mode: "ace/mode/" + i
                    })), this.ace_container = document.createElement("div"), this.ace_container.style.width = "100%", this.ace_container.style.position = "relative", this.input.parentNode.insertBefore(this.ace_container, this.input), this.input.style.display = "none", this.ace_editor_instance = window.ace.edit(this.ace_container, t), this.ace_editor_instance.setValue(this.getValue()), this.ace_editor_instance.session.getSelection().clearSelection(), this.ace_editor_instance.resize(), (this.schema.readOnly || this.schema.readonly || this.schema.template) && this.ace_editor_instance.setReadOnly(!0), this.ace_editor_instance.on("change", function() {
                        e.input.value = e.ace_editor_instance.getValue(), e.refreshValue(), e.is_dirty = !0, e.onChange(!0)
                    }), this.theme.afterInputReady(e.input)
                } else this._super()
            },
            getNumColumns: function() {
                return 6
            },
            enable: function() {
                !this.always_disabled && this.ace_editor_instance && this.ace_editor_instance.setReadOnly(!1), this._super()
            },
            disable: function(t) {
                this.ace_editor_instance && this.ace_editor_instance.setReadOnly(!0), this._super(t)
            },
            destroy: function() {
                this.ace_editor_instance && (this.ace_editor_instance.destroy(), this.ace_editor_instance = null), this._super()
            }
        }),
        B = O.extend({
            askConfirmation: function() {
                return !0 !== this.jsoneditor.options.prompt_before_delete || !1 !== window.confirm("Are you sure you want to remove this node?")
            },
            getDefault: function() {
                return this.schema.default || []
            },
            register: function() {
                if (this._super(), this.rows)
                    for (var t = 0; t < this.rows.length; t++) this.rows[t].register()
            },
            unregister: function() {
                if (this._super(), this.rows)
                    for (var t = 0; t < this.rows.length; t++) this.rows[t].unregister()
            },
            getNumColumns: function() {
                var t = this.getItemInfo(0);
                return this.tabs_holder && "tabs-top" !== this.schema.format ? Math.max(Math.min(12, t.width + 2), 4) : t.width
            },
            enable: function() {
                if (!this.always_disabled) {
                    if (this.add_row_button && (this.add_row_button.disabled = !1), this.remove_all_rows_button && (this.remove_all_rows_button.disabled = !1), this.delete_last_row_button && (this.delete_last_row_button.disabled = !1), this.copy_button && (this.copy_button.disabled = !1), this.delete_button && (this.delete_button.disabled = !1), this.moveup_button && (this.moveup_button.disabled = !1), this.movedown_button && (this.movedown_button.disabled = !1), this.rows)
                        for (var t = 0; t < this.rows.length; t++) this.rows[t].enable(), this.rows[t].add_row_button && (this.rows[t].add_row_button.disabled = !1), this.rows[t].remove_all_rows_button && (this.rows[t].remove_all_rows_button.disabled = !1), this.rows[t].delete_last_row_button && (this.rows[t].delete_last_row_button.disabled = !1), this.rows[t].copy_button && (this.rows[t].copy_button.disabled = !1), this.rows[t].delete_button && (this.rows[t].delete_button.disabled = !1), this.rows[t].moveup_button && (this.rows[t].moveup_button.disabled = !1), this.rows[t].movedown_button && (this.rows[t].movedown_button.disabled = !1);
                    this._super()
                }
            },
            disable: function(t) {
                if (t && (this.always_disabled = !0), this.add_row_button && (this.add_row_button.disabled = !0), this.remove_all_rows_button && (this.remove_all_rows_button.disabled = !0), this.delete_last_row_button && (this.delete_last_row_button.disabled = !0), this.copy_button && (this.copy_button.disabled = !0), this.delete_button && (this.delete_button.disabled = !0), this.moveup_button && (this.moveup_button.disabled = !0), this.movedown_button && (this.movedown_button.disabled = !0), this.rows)
                    for (var e = 0; e < this.rows.length; e++) this.rows[e].disable(t), this.rows[e].add_row_button && (this.rows[e].add_row_button.disabled = !0), this.rows[e].remove_all_rows_button && (this.rows[e].remove_all_rows_button.disabled = !0), this.rows[e].delete_last_row_button && (this.rows[e].delete_last_row_button.disabled = !0), this.rows[e].copy_button && (this.rows[e].copy_button.disabled = !0), this.rows[e].delete_button && (this.rows[e].delete_button.disabled = !0), this.rows[e].moveup_button && (this.rows[e].moveup_button.disabled = !0), this.rows[e].movedown_button && (this.rows[e].movedown_button.disabled = !0);
                this._super()
            },
            preBuild: function() {
                this._super(), this.rows = [], this.row_cache = [], this.hide_delete_buttons = this.options.disable_array_delete || this.jsoneditor.options.disable_array_delete, this.hide_delete_all_rows_buttons = this.hide_delete_buttons || this.options.disable_array_delete_all_rows || this.jsoneditor.options.disable_array_delete_all_rows, this.hide_delete_last_row_buttons = this.hide_delete_buttons || this.options.disable_array_delete_last_row || this.jsoneditor.options.disable_array_delete_last_row, this.hide_move_buttons = this.options.disable_array_reorder || this.jsoneditor.options.disable_array_reorder, this.hide_add_button = this.options.disable_array_add || this.jsoneditor.options.disable_array_add, this.show_copy_button = this.options.enable_array_copy || this.jsoneditor.options.enable_array_copy, this.array_controls_top = this.options.array_controls_top || this.jsoneditor.options.array_controls_top
            },
            build: function() {
                this.options.compact ? (this.title = this.theme.getHeader(""), this.container.appendChild(this.title), this.panel = this.theme.getIndentedPanel(), this.container.appendChild(this.panel), this.title_controls = this.theme.getHeaderButtonHolder(), this.title.appendChild(this.title_controls), this.controls = this.theme.getHeaderButtonHolder(), this.title.appendChild(this.controls), this.row_holder = document.createElement("div"), this.panel.appendChild(this.row_holder)) : (this.header = document.createElement("label"), this.header.textContent = this.getTitle(), this.title = this.theme.getHeader(this.header), this.container.appendChild(this.title), this.title_controls = this.theme.getHeaderButtonHolder(), this.title.appendChild(this.title_controls), this.schema.description && (this.description = this.theme.getDescription(this.schema.description), this.container.appendChild(this.description)), this.error_holder = document.createElement("div"), this.container.appendChild(this.error_holder), "tabs-top" === this.schema.format ? (this.controls = this.theme.getHeaderButtonHolder(), this.title.appendChild(this.controls), this.tabs_holder = this.theme.getTopTabHolder(this.getValidId(this.getItemTitle())), this.container.appendChild(this.tabs_holder), this.row_holder = this.theme.getTopTabContentHolder(this.tabs_holder), this.active_tab = null) : "tabs" === this.schema.format ? (this.controls = this.theme.getHeaderButtonHolder(), this.title.appendChild(this.controls), this.tabs_holder = this.theme.getTabHolder(this.getValidId(this.getItemTitle())), this.container.appendChild(this.tabs_holder), this.row_holder = this.theme.getTabContentHolder(this.tabs_holder), this.active_tab = null) : (this.panel = this.theme.getIndentedPanel(), this.container.appendChild(this.panel), this.row_holder = document.createElement("div"), this.panel.appendChild(this.row_holder), this.controls = this.theme.getButtonHolder(), this.array_controls_top ? this.title.appendChild(this.controls) : this.panel.appendChild(this.controls))), this.addControls()
            },
            onChildEditorChange: function(t) {
                this.refreshValue(), this.refreshTabs(!0), this._super(t)
            },
            getItemTitle: function() {
                if (!this.item_title)
                    if (this.schema.items && !Array.isArray(this.schema.items)) {
                        var t = this.jsoneditor.expandRefs(this.schema.items);
                        this.item_title = t.title || this.translate("default_array_item_title")
                    } else this.item_title = this.translate("default_array_item_title");
                return this.cleanText(this.item_title)
            },
            getItemSchema: function(t) {
                return Array.isArray(this.schema.items) ? t >= this.schema.items.length ? !0 === this.schema.additionalItems ? {} : this.schema.additionalItems ? n({}, this.schema.additionalItems) : void 0 : n({}, this.schema.items[t]) : this.schema.items ? n({}, this.schema.items) : {}
            },
            getItemInfo: function(t) {
                var e = this.getItemSchema(t);
                this.item_info = this.item_info || {};
                var i = JSON.stringify(e);
                return void 0 !== this.item_info[i] ? this.item_info[i] : (e = this.jsoneditor.expandRefs(e), this.item_info[i] = {
                    title: e.title || this.translate("default_array_item_title"),
                    default: e.default,
                    width: 12,
                    child_editors: e.properties || e.items
                }, this.item_info[i])
            },
            getElementEditor: function(t) {
                var e = this.getItemInfo(t),
                    i = this.getItemSchema(t);
                (i = this.jsoneditor.expandRefs(i)).title = e.title + " " + (t + 1);
                var s, n = this.jsoneditor.getEditorClass(i);
                this.tabs_holder ? (s = "tabs-top" === this.schema.format ? this.theme.getTopTabContent() : this.theme.getTabContent()).id = this.path + "." + t : s = e.child_editors ? this.theme.getChildEditorHolder() : this.theme.getIndentedPanel(), this.row_holder.appendChild(s);
                var r = this.jsoneditor.createEditor(n, {
                    jsoneditor: this.jsoneditor,
                    schema: i,
                    container: s,
                    path: this.path + "." + t,
                    parent: this,
                    required: !0
                });
                return r.preBuild(), r.build(), r.postBuild(), r.title_controls || (r.array_controls = this.theme.getButtonHolder(), s.appendChild(r.array_controls)), r
            },
            destroy: function() {
                this.empty(!0), this.title && this.title.parentNode && this.title.parentNode.removeChild(this.title), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), this.row_holder && this.row_holder.parentNode && this.row_holder.parentNode.removeChild(this.row_holder), this.controls && this.controls.parentNode && this.controls.parentNode.removeChild(this.controls), this.panel && this.panel.parentNode && this.panel.parentNode.removeChild(this.panel), this.rows = this.row_cache = this.title = this.description = this.row_holder = this.panel = this.controls = null, this._super()
            },
            empty: function(t) {
                if (this.rows) {
                    var e = this;
                    r(this.rows, function(i, s) {
                        t && (s.tab && s.tab.parentNode && s.tab.parentNode.removeChild(s.tab), e.destroyRow(s, !0), e.row_cache[i] = null), e.rows[i] = null
                    }), e.rows = [], t && (e.row_cache = [])
                }
            },
            destroyRow: function(t, e) {
                var i = t.container;
                e ? (t.destroy(), i.parentNode && i.parentNode.removeChild(i), t.tab && t.tab.parentNode && t.tab.parentNode.removeChild(t.tab)) : (t.tab && (t.tab.style.display = "none"), i.style.display = "none", t.unregister())
            },
            getMax: function() {
                return Array.isArray(this.schema.items) && !1 === this.schema.additionalItems ? Math.min(this.schema.items.length, this.schema.maxItems || 1 / 0) : this.schema.maxItems || 1 / 0
            },
            refreshTabs: function(t) {
                var e = this;
                r(this.rows, function(i, s) {
                    s.tab && (t ? s.tab_text.textContent = s.getHeaderText() : s.tab === e.active_tab ? e.theme.markTabActive(s) : e.theme.markTabInactive(s))
                })
            },
            setValue: function(t, e) {
                if (t = t || [], Array.isArray(t) || (t = [t]), JSON.stringify(t) !== this.serialized) {
                    if (this.schema.minItems)
                        for (; t.length < this.schema.minItems;) t.push(this.getItemInfo(t.length).default);
                    this.getMax() && t.length > this.getMax() && (t = t.slice(0, this.getMax()));
                    var i = this;
                    r(t, function(t, s) {
                        if (i.rows[t]) i.rows[t].setValue(s, e);
                        else if (i.row_cache[t]) i.rows[t] = i.row_cache[t], i.rows[t].setValue(s, e), i.rows[t].container.style.display = "", i.rows[t].tab && (i.rows[t].tab.style.display = ""), i.rows[t].register(), i.jsoneditor.trigger("addRow", i.rows[t]);
                        else {
                            var n = i.addRow(s, e);
                            i.jsoneditor.trigger("addRow", n)
                        }
                    });
                    for (var s = t.length; s < i.rows.length; s++) i.destroyRow(i.rows[s]), i.rows[s] = null;
                    i.rows = i.rows.slice(0, t.length);
                    var n = null;
                    r(i.rows, function(t, e) {
                        if (e.tab === i.active_tab) return n = e.tab, !1
                    }), !n && i.rows.length && (n = i.rows[0].tab), i.active_tab = n, i.refreshValue(e), i.refreshTabs(!0), i.refreshTabs(), i.onChange()
                }
            },
            refreshValue: function(t) {
                var e = this,
                    i = this.value ? this.value.length : 0;
                if (this.value = [], r(this.rows, function(t, i) {
                        e.value[t] = i.getValue()
                    }), i !== this.value.length || t) {
                    var s = this.schema.minItems && this.schema.minItems >= this.rows.length;
                    r(this.rows, function(t, i) {
                        i.movedown_button && (t === e.rows.length - 1 ? i.movedown_button.style.display = "none" : i.movedown_button.style.display = ""), i.delete_button && (i.delete_button.style.display = s ? "none" : ""), e.value[t] = i.getValue()
                    });
                    var n = !1;
                    this.value.length ? 1 === this.value.length ? (this.remove_all_rows_button.style.display = "none", s || this.hide_delete_last_row_buttons ? this.delete_last_row_button.style.display = "none" : (this.delete_last_row_button.style.display = "", n = !0)) : (s || this.hide_delete_last_row_buttons ? this.delete_last_row_button.style.display = "none" : (this.delete_last_row_button.style.display = "", n = !0), s || this.hide_delete_all_rows_buttons ? this.remove_all_rows_button.style.display = "none" : (this.remove_all_rows_button.style.display = "", n = !0)) : (this.delete_last_row_button.style.display = "none", this.remove_all_rows_button.style.display = "none"), this.getMax() && this.getMax() <= this.rows.length || this.hide_add_button ? this.add_row_button.style.display = "none" : (this.add_row_button.style.display = "", n = !0), !this.collapsed && n ? this.controls.style.display = "inline-block" : this.controls.style.display = "none"
                }
            },
            addRow: function(t, e) {
                var i = this,
                    s = this.rows.length;
                i.rows[s] = this.getElementEditor(s), i.row_cache[s] = i.rows[s], i.tabs_holder && (i.rows[s].tab_text = document.createElement("span"), i.rows[s].tab_text.textContent = i.rows[s].getHeaderText(), "tabs-top" === i.schema.format ? (i.rows[s].tab = i.theme.getTopTab(i.rows[s].tab_text, this.getValidId(i.rows[s].path)), i.theme.addTopTab(i.tabs_holder, i.rows[s].tab)) : (i.rows[s].tab = i.theme.getTab(i.rows[s].tab_text, this.getValidId(i.rows[s].path)), i.theme.addTab(i.tabs_holder, i.rows[s].tab)), i.rows[s].tab.addEventListener("click", function(t) {
                    i.active_tab = i.rows[s].tab, i.refreshTabs(), t.preventDefault(), t.stopPropagation()
                }));
                var n = i.rows[s].title_controls || i.rows[s].array_controls;
                return i.hide_delete_buttons || (i.rows[s].delete_button = this.getButton(i.getItemTitle(), "delete", this.translate("button_delete_row_title", [i.getItemTitle()])), i.rows[s].delete_button.classList.add("delete", "json-editor-btntype-delete"), i.rows[s].delete_button.setAttribute("data-i", s), i.rows[s].delete_button.addEventListener("click", function(t) {
                    if (t.preventDefault(), t.stopPropagation(), !i.askConfirmation()) return !1;
                    var e = 1 * this.getAttribute("data-i"),
                        s = i.getValue(),
                        n = [],
                        o = null;
                    r(s, function(t, i) {
                        t !== e && n.push(i)
                    });
                    var a = i.rows[e];
                    i.setValue(n), i.rows[e] ? o = i.rows[e].tab : i.rows[e - 1] && (o = i.rows[e - 1].tab), o && (i.active_tab = o, i.refreshTabs()), i.onChange(!0), i.jsoneditor.trigger("deleteRow", a)
                }), n && n.appendChild(i.rows[s].delete_button)), i.show_copy_button && (i.rows[s].copy_button = this.getButton(i.getItemTitle(), "copy", "Copy " + i.getItemTitle()), i.rows[s].copy_button.classList.add("copy", "json-editor-btntype-copy"), i.rows[s].copy_button.setAttribute("data-i", s), i.rows[s].copy_button.addEventListener("click", function(t) {
                    var e = i.getValue();
                    t.preventDefault(), t.stopPropagation();
                    var s = 1 * this.getAttribute("data-i");
                    r(e, function(t, i) {
                        t === s && e.push(i)
                    }), i.setValue(e), i.refreshValue(!0), i.onChange(!0)
                }), n.appendChild(i.rows[s].copy_button)), s && !i.hide_move_buttons && (i.rows[s].moveup_button = this.getButton("", "moveup", this.translate("button_move_up_title")), i.rows[s].moveup_button.classList.add("moveup", "json-editor-btntype-move"), i.rows[s].moveup_button.setAttribute("data-i", s), i.rows[s].moveup_button.addEventListener("click", function(t) {
                    t.preventDefault(), t.stopPropagation();
                    var e = 1 * this.getAttribute("data-i");
                    if (!(e <= 0)) {
                        var s = i.getValue(),
                            n = s[e - 1];
                        s[e - 1] = s[e], s[e] = n, i.setValue(s), i.active_tab = i.rows[e - 1].tab, i.refreshTabs(), i.onChange(!0), i.jsoneditor.trigger("moveRow", i.rows[e - 1])
                    }
                }), n && n.appendChild(i.rows[s].moveup_button)), i.hide_move_buttons || (i.rows[s].movedown_button = this.getButton("", "movedown", this.translate("button_move_down_title")), i.rows[s].movedown_button.classList.add("movedown", "json-editor-btntype-move"), i.rows[s].movedown_button.setAttribute("data-i", s), i.rows[s].movedown_button.addEventListener("click", function(t) {
                    t.preventDefault(), t.stopPropagation();
                    var e = 1 * this.getAttribute("data-i"),
                        s = i.getValue();
                    if (!(e >= s.length - 1)) {
                        var n = s[e + 1];
                        s[e + 1] = s[e], s[e] = n, i.setValue(s), i.active_tab = i.rows[e + 1].tab, i.refreshTabs(), i.onChange(!0), i.jsoneditor.trigger("moveRow", i.rows[e + 1])
                    }
                }), n && n.appendChild(i.rows[s].movedown_button)), t && i.rows[s].setValue(t, e), i.refreshTabs(), i.rows[s]
            },
            addControls: function() {
                var t = this;
                this.collapsed = !1, this.toggle_button = this.getButton("", "collapse", this.translate("button_collapse")), this.toggle_button.classList.add("json-editor-btntype-toggle"), this.title_controls.appendChild(this.toggle_button);
                var e = t.row_holder.style.display,
                    i = t.controls.style.display;
                this.toggle_button.addEventListener("click", function(s) {
                    s.preventDefault(), s.stopPropagation(), t.collapsed ? (t.collapsed = !1, t.panel && (t.panel.style.display = ""), t.row_holder.style.display = e, t.tabs_holder && (t.tabs_holder.style.display = ""), t.controls.style.display = i, t.setButtonText(this, "", "collapse", t.translate("button_collapse"))) : (t.collapsed = !0, t.row_holder.style.display = "none", t.tabs_holder && (t.tabs_holder.style.display = "none"), t.controls.style.display = "none", t.panel && (t.panel.style.display = "none"), t.setButtonText(this, "", "expand", t.translate("button_expand")))
                }), this.options.collapsed && o(this.toggle_button, "click"), this.schema.options && void 0 !== this.schema.options.disable_collapse ? this.schema.options.disable_collapse && (this.toggle_button.style.display = "none") : this.jsoneditor.options.disable_collapse && (this.toggle_button.style.display = "none"), this.add_row_button = this.getButton(this.getItemTitle(), "add", this.translate("button_add_row_title", [this.getItemTitle()])), this.add_row_button.classList.add("json-editor-btntype-add"), this.add_row_button.addEventListener("click", function(e) {
                    e.preventDefault(), e.stopPropagation();
                    var i, s = t.rows.length;
                    t.row_cache[s] ? (i = t.rows[s] = t.row_cache[s], t.rows[s].setValue(t.rows[s].getDefault(), !0), t.rows[s].container.style.display = "", t.rows[s].tab && (t.rows[s].tab.style.display = ""), t.rows[s].register()) : i = t.addRow(), t.active_tab = t.rows[s].tab, t.refreshTabs(), t.refreshValue(), t.onChange(!0), t.jsoneditor.trigger("addRow", i)
                }), t.controls.appendChild(this.add_row_button), this.delete_last_row_button = this.getButton(this.translate("button_delete_last", [this.getItemTitle()]), "delete", this.translate("button_delete_last_title", [this.getItemTitle()])), this.delete_last_row_button.classList.add("json-editor-btntype-deletelast"), this.delete_last_row_button.addEventListener("click", function(e) {
                    if (e.preventDefault(), e.stopPropagation(), !t.askConfirmation()) return !1;
                    var i = t.getValue(),
                        s = null,
                        n = i.pop();
                    t.setValue(i), t.rows[t.rows.length - 1] && (s = t.rows[t.rows.length - 1].tab), s && (t.active_tab = s, t.refreshTabs()), t.onChange(!0), t.jsoneditor.trigger("deleteRow", n)
                }), t.controls.appendChild(this.delete_last_row_button), this.remove_all_rows_button = this.getButton(this.translate("button_delete_all"), "delete", this.translate("button_delete_all_title")), this.remove_all_rows_button.classList.add("json-editor-btntype-deleteall"), this.remove_all_rows_button.addEventListener("click", function(e) {
                    if (e.preventDefault(), e.stopPropagation(), !t.askConfirmation()) return !1;
                    t.empty(!0), t.setValue([]), t.onChange(!0), t.jsoneditor.trigger("deleteAllRows")
                }), t.controls.appendChild(this.remove_all_rows_button), t.tabs && (this.add_row_button.style.width = "100%", this.add_row_button.style.textAlign = "left", this.add_row_button.style.marginBottom = "3px", this.delete_last_row_button.style.width = "100%", this.delete_last_row_button.style.textAlign = "left", this.delete_last_row_button.style.marginBottom = "3px", this.remove_all_rows_button.style.width = "100%", this.remove_all_rows_button.style.textAlign = "left", this.remove_all_rows_button.style.marginBottom = "3px")
            },
            showValidationErrors: function(t) {
                var e = this,
                    i = [],
                    s = [];
                r(t, function(t, n) {
                    n.path === e.path ? i.push(n) : s.push(n)
                }), this.error_holder && (i.length ? (this.error_holder.innerHTML = "", this.error_holder.style.display = "", r(i, function(t, i) {
                    e.error_holder.appendChild(e.theme.getErrorMessage(i.message))
                })) : this.error_holder.style.display = "none"), r(this.rows, function(t, e) {
                    e.showValidationErrors(s)
                })
            }
        }),
        S = O.extend({
            onInputChange: function() {
                this.value = this.input.value, this.onChange(!0)
            },
            register: function() {
                this._super(), this.input && this.input.setAttribute("name", this.formname)
            },
            unregister: function() {
                this._super(), this.input && this.input.removeAttribute("name")
            },
            getNumColumns: function() {
                var t = this.getTitle().length;
                for (var e in this.select_values) this.select_values.hasOwnProperty(e) && (t = Math.max(t, (this.select_values[e] + "").length + 4));
                return Math.min(12, Math.max(t / 7, 2))
            },
            preBuild: function() {
                var t;
                this._super(), this.select_options = {}, this.select_values = {}, this.option_keys = [], this.option_titles = [];
                var e = this.jsoneditor.expandRefs(this.schema.items || {}),
                    i = e.enum || [],
                    s = e.options && e.options.enum_titles || [];
                for (t = 0; t < i.length; t++) this.sanitize(i[t]) === i[t] && (this.option_keys.push(i[t] + ""), this.option_titles.push((s[t] || i[t]) + ""), this.select_values[i[t] + ""] = i[t])
            },
            build: function() {
                var t, e = this;
                if (this.options.compact || (this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())), this.schema.description && (this.description = this.theme.getFormInputDescription(this.schema.description)), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.options.infoText)), this.options.compact && this.container.classList.add("compact"), !this.schema.format && this.option_keys.length < 8 || "checkbox" === this.schema.format) {
                    for (this.input_type = "checkboxes", this.inputs = {}, this.controls = {}, t = 0; t < this.option_keys.length; t++) {
                        this.inputs[this.option_keys[t]] = this.theme.getCheckbox(), this.select_options[this.option_keys[t]] = this.inputs[this.option_keys[t]];
                        var i = this.theme.getCheckboxLabel(this.option_titles[t]);
                        this.controls[this.option_keys[t]] = this.theme.getFormControl(i, this.inputs[this.option_keys[t]])
                    }
                    this.control = this.theme.getMultiCheckboxHolder(this.controls, this.label, this.description, this.infoButton), this.inputs.controlgroup = this.inputs.controls = this.control
                } else {
                    for (this.input_type = "select", this.input = this.theme.getSelectInput(this.option_keys, !0), this.theme.setSelectOptions(this.input, this.option_keys, this.option_titles), this.input.setAttribute("multiple", "multiple"), this.input.size = Math.min(10, this.option_keys.length), t = 0; t < this.option_keys.length; t++) this.select_options[this.option_keys[t]] = this.input.children[t];
                    this.control = this.theme.getFormControl(this.label, this.input, this.description, this.infoButton)
                }(this.schema.readOnly || this.schema.readonly) && this.disable(!0), this.container.appendChild(this.control), this.multiselectChangeHandler = function(i) {
                    var s = [];
                    for (t = 0; t < e.option_keys.length; t++) e.select_options[e.option_keys[t]] && (e.select_options[e.option_keys[t]].selected || e.select_options[e.option_keys[t]].checked) && s.push(e.select_values[e.option_keys[t]]);
                    e.updateValue(s), e.onChange(!0)
                }, this.control.addEventListener("change", this.multiselectChangeHandler, !1), window.requestAnimationFrame(function() {
                    e.afterInputReady()
                })
            },
            postBuild: function() {
                this._super()
            },
            afterInputReady: function() {
                this.theme.afterInputReady(this.input || this.inputs)
            },
            setValue: function(t, e) {
                var i;
                for (i in t = t || [], Array.isArray(t) || (t = [t]), t = t.map(function(t) {
                        return t + ""
                    }), this.select_options) this.select_options.hasOwnProperty(i) && (this.select_options[i]["select" === this.input_type ? "selected" : "checked"] = -1 !== t.indexOf(i));
                this.updateValue(t), this.onChange(!0)
            },
            removeValue: function(t) {
                t = [].concat(t), this.setValue(this.getValue().filter(function(e) {
                    return -1 === t.indexOf(e)
                }))
            },
            addValue: function(t) {
                this.setValue(this.getValue().concat(t))
            },
            updateValue: function(t) {
                for (var e = !1, i = [], s = 0; s < t.length; s++)
                    if (this.select_options[t[s] + ""]) {
                        var n = this.sanitize(this.select_values[t[s]]);
                        i.push(n), n !== t[s] && (e = !0)
                    } else e = !0;
                return this.value = i, e
            },
            sanitize: function(t) {
                return "boolean" === this.schema.items.type ? !!t : "number" === this.schema.items.type ? 1 * t || 0 : "integer" === this.schema.items.type ? Math.floor(1 * t || 0) : "" + t
            },
            enable: function() {
                if (!this.always_disabled) {
                    if (this.input) this.input.disabled = !1;
                    else if (this.inputs)
                        for (var t in this.inputs) this.inputs.hasOwnProperty(t) && (this.inputs[t].disabled = !1);
                    this._super()
                }
            },
            disable: function(t) {
                if (t && (this.always_disabled = !0), this.input) this.input.disabled = !0;
                else if (this.inputs)
                    for (var e in this.inputs) this.inputs.hasOwnProperty(e) && (this.inputs[e].disabled = !0);
                this._super()
            },
            destroy: function() {
                this._super()
            },
            escapeRegExp: function(t) {
                return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
            },
            showValidationErrors: function(t) {
                var e = new RegExp("^" + this.escapeRegExp(this.path) + "(\\.\\d+)?$"),
                    i = [];
                r(t, function(t, s) {
                    s.path.match(e) && i.push(s.message)
                }), i.length ? this.theme.addInputError(this.input || this.inputs, i.join(". ") + ".") : this.theme.removeInputError(this.input || this.inputs)
            }
        }),
        N = S.extend({
            setValue: function(t, e) {
                this.choices_instance ? (t = [].concat(t).map(function(t) {
                    return t + ""
                }), this.updateValue(t), this.choices_instance.removeActiveItems(), this.choices_instance.setChoiceByValue(this.value), this.onChange(!0)) : this._super(t, e)
            },
            afterInputReady: function() {
                if (window.Choices && !this.choices_instance) {
                    var t, e = this;
                    t = this.expandCallbacks("choices", n({}, {
                        removeItems: !0,
                        removeItemButton: !0
                    }, this.defaults.options.choices || {}, this.options.choices || {}, {
                        addItems: !0,
                        editItems: !1,
                        duplicateItemsAllowed: !1
                    })), this.newEnumAllowed = !1, this.choices_instance = new window.Choices(this.input, t), this.control.removeEventListener("change", this.multiselectChangeHandler), this.multiselectChangeHandler = function(t) {
                        var i = e.choices_instance.getValue(!0);
                        e.updateValue(i), e.onChange(!0)
                    }, this.control.addEventListener("change", this.multiselectChangeHandler, !1)
                }
                this._super()
            },
            updateValue: function(t) {
                t = [].concat(t);
                for (var e = !1, i = [], s = 0; s < t.length; s++) {
                    if (!this.select_values[t[s] + ""]) {
                        if (e = !0, !this.newEnumAllowed) continue;
                        if (!this.addNewOption(t[s])) continue
                    }
                    var n = this.sanitize(this.select_values[t[s]]);
                    i.push(n), n !== t[s] && (e = !0)
                }
                return this.value = i, e
            },
            addNewOption: function(t) {
                return this.option_keys.push(t + ""), this.option_titles.push(t + ""), this.select_values[t + ""] = t, this.schema.items.enum.push(t), this.choices_instance.setChoices([{
                    value: t + "",
                    label: t + ""
                }], "value", "label", !1), !0
            },
            enable: function() {
                !this.always_disabled && this.choices_instance && this.choices_instance.enable(), this._super()
            },
            disable: function(t) {
                this.choices_instance && this.choices_instance.disable(), this._super(t)
            },
            destroy: function() {
                this.choices_instance && (this.choices_instance.destroy(), this.choices_instance = null), this._super()
            }
        }),
        F = S.extend({
            setValue: function(t, e) {
                this.select2_instance ? (t = [].concat(t).map(function(t) {
                    return t + ""
                }), this.updateValue(t), this.select2v4 ? this.select2_instance.val(this.value).change() : this.select2_instance.select2("val", this.value), this.onChange(!0)) : this._super(t, e)
            },
            afterInputReady: function() {
                var t, e = this;
                window.jQuery && window.jQuery.fn && window.jQuery.fn.select2 && !this.select2_instance && (t = this.expandCallbacks("select2", n({}, {
                    tags: !0,
                    width: "100%"
                }, this.defaults.options.select2 || {}, this.options.select2 || {})), this.newEnumAllowed = t.tags = !!t.tags && this.schema.items && "string" === this.schema.items.type, this.select2_instance = window.jQuery(this.input).select2(t), this.select2v4 = this.select2_instance.select2.hasOwnProperty("amd"), this.selectChangeHandler = function() {
                    var t = e.select2v4 ? e.select2_instance.val() : e.select2_instance.select2("val");
                    e.updateValue(t), e.onChange(!0)
                }, this.select2_instance.on("select2-blur", this.selectChangeHandler), this.select2_instance.on("change", this.selectChangeHandler)), this._super()
            },
            updateValue: function(t) {
                t = [].concat(t);
                for (var e = !1, i = [], s = 0; s < t.length; s++) {
                    if (!this.select_values[t[s] + ""]) {
                        if (e = !0, !this.newEnumAllowed) continue;
                        if (!this.addNewOption(t[s])) continue
                    }
                    var n = this.sanitize(this.select_values[t[s]]);
                    i.push(n), n !== t[s] && (e = !0)
                }
                return this.value = i, e
            },
            addNewOption: function(t) {
                this.option_keys.push(t + ""), this.option_titles.push(t + ""), this.select_values[t + ""] = t, this.schema.items.enum.push(t);
                var e = this.input.querySelector('option[value="' + t + '"]');
                return e ? e.removeAttribute("data-select2-tag") : this.input.appendChild(new Option(t, t, !1, !1)).trigger("change"), !0
            },
            enable: function() {
                !this.always_disabled && this.select2_instance && (this.select2v4 ? this.select2_instance.prop("disabled", !1) : this.select2_instance.select2("enable", !0)), this._super()
            },
            disable: function(t) {
                this.select2_instance && (this.select2v4 ? this.select2_instance.prop("disabled", !0) : this.select2_instance.select2("enable", !1)), this._super()
            },
            destroy: function() {
                this.select2_instance && (this.select2_instance.select2("destroy"), this.select2_instance = null), this._super()
            }
        }),
        V = S.extend({
            setValue: function(t, e) {
                this.selectize_instance ? (t = [].concat(t).map(function(t) {
                    return t + ""
                }), this.updateValue(t), this.selectize_instance.setValue(this.value), this.onChange(!0)) : this._super(t, e)
            },
            afterInputReady: function() {
                var t, e = this;
                window.jQuery && window.jQuery.fn && window.jQuery.fn.selectize && !this.selectize_instance && (t = this.expandCallbacks("selectize", n({}, {
                    plugins: ["remove_button"],
                    delimiter: !1,
                    createOnBlur: !0,
                    create: !0
                }, this.defaults.options.selectize || {}, this.options.selectize || {})), this.newEnumAllowed = t.create = !!t.create && this.schema.items && "string" === this.schema.items.type, this.selectize_instance = window.jQuery(this.input).selectize(t)[0].selectize, this.control.removeEventListener("change", this.multiselectChangeHandler), this.multiselectChangeHandler = function(t) {
                    var i = e.selectize_instance.getValue();
                    e.updateValue(i), e.onChange(!0)
                }, this.selectize_instance.on("change", this.multiselectChangeHandler)), this._super()
            },
            updateValue: function(t) {
                t = [].concat(t);
                for (var e = !1, i = [], s = 0; s < t.length; s++) {
                    if (!this.select_values[t[s] + ""]) {
                        if (e = !0, !this.newEnumAllowed) continue;
                        if (!this.addNewOption(t[s])) continue
                    }
                    var n = this.sanitize(this.select_values[t[s]]);
                    i.push(n), n !== t[s] && (e = !0)
                }
                return this.value = i, e
            },
            addNewOption: function(t) {
                return this.option_keys.push(t + ""), this.option_titles.push(t + ""), this.select_values[t + ""] = t, this.schema.items.enum.push(t), this.selectize_instance.addOption({
                    text: t,
                    value: t
                }), !0
            },
            enable: function() {
                !this.always_disabled && this.selectize_instance && this.selectize_instance.unlock(), this._super()
            },
            disable: function(t) {
                this.selectize_instance && this.selectize_instance.lock(), this._super(t)
            },
            destroy: function() {
                this.selectize_instance && (this.selectize_instance.destroy(), this.selectize_instance = null), this._super()
            }
        }),
        R = P.extend({
            postBuild: function() {
                window.Autocomplete && (this.autocomplete_wrapper = document.createElement("div"), this.input.parentNode.insertBefore(this.autocomplete_wrapper, this.input.nextSibling), this.autocomplete_wrapper.appendChild(this.input), this.autocomplete_dropdown = document.createElement("ul"), this.input.parentNode.insertBefore(this.autocomplete_dropdown, this.input.nextSibling)), this._super()
            },
            afterInputReady: function() {
                var t;
                window.Autocomplete && !this.autocomplete_instance && (t = this.expandCallbacks("autocomplete", n({}, {
                    search: function(t, e) {
                        return console.log('No "search" callback defined for autocomplete in property "' + t.key + '"'), []
                    }.bind(null, this),
                    baseClass: "autocomplete"
                }, this.defaults.options.autocomplete || {}, this.options.autocomplete || {})), this.autocomplete_wrapper.classList.add(t.baseClass), this.autocomplete_dropdown.classList.add(t.baseClass + "-result-list"), this.autocomplete_instance = new window.Autocomplete(this.autocomplete_wrapper, t)), this._super()
            },
            destroy: function() {
                this.autocomplete_instance && (this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), this.autocomplete_dropdown && this.autocomplete_dropdown.parentNode && this.autocomplete_dropdown.parentNode.removeChild(this.autocomplete_dropdown), this.autocomplete_wrapper && this.autocomplete_wrapper.parentNode && this.autocomplete_wrapper.parentNode.removeChild(this.autocomplete_wrapper), this.autocomplete_instance = null), this._super()
            }
        }),
        M = O.extend({
            getNumColumns: function() {
                return 4
            },
            setFileReaderListener: function(t) {
                var e = this;
                t.addEventListener("load", function(t) {
                    if (e.count === e.current_item_index) e.value[e.count][e.key] = t.target.result;
                    else {
                        var i = {};
                        for (var s in e.parent.schema.properties) i[s] = "";
                        i[e.key] = t.target.result, e.value.splice(e.count, 0, i)
                    }
                    e.count += 1, e.count === e.total + e.current_item_index && e.arrayEditor.setValue(e.value)
                })
            },
            build: function() {
                var t = this;
                if (this.title = this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired()), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.options.infoText)), this.input = this.theme.getFormInputField("hidden"), this.container.appendChild(this.input), !this.schema.readOnly && !this.schema.readonly) {
                    if (!window.FileReader) throw new Error("FileReader required for base64 editor");
                    this.uploader = this.theme.getFormInputField("file"), t.schema.options && t.schema.options.multiple && !0 === t.schema.options.multiple && t.parent && "object" === t.parent.schema.type && t.parent.parent && "array" === t.parent.parent.schema.type && this.uploader.setAttribute("multiple", ""), this.uploader.addEventListener("change", function(e) {
                        if (e.preventDefault(), e.stopPropagation(), this.files && this.files.length)
                            if (this.files.length > 1 && t.schema.options && t.schema.options.multiple && !0 === t.schema.options.multiple && t.parent && "object" === t.parent.schema.type && t.parent.parent && "array" === t.parent.parent.schema.type) {
                                t.arrayEditor = t.jsoneditor.getEditor(t.parent.parent.path), t.value = t.arrayEditor.getValue(), t.total = this.files.length, t.current_item_index = parseInt(t.parent.key), t.count = t.current_item_index;
                                for (var i = 0; i < t.total; i++) {
                                    var s = new FileReader;
                                    t.setFileReaderListener(s), s.readAsDataURL(this.files[i])
                                }
                            } else {
                                var n = new FileReader;
                                n.onload = function(e) {
                                    t.value = e.target.result, t.refreshPreview(), t.onChange(!0), n = null
                                }, n.readAsDataURL(this.files[0])
                            }
                    })
                }
                this.preview = this.theme.getFormInputDescription(this.schema.description), this.container.appendChild(this.preview), this.control = this.theme.getFormControl(this.label, this.uploader || this.input, this.preview, this.infoButton), this.container.appendChild(this.control)
            },
            refreshPreview: function() {
                if (this.last_preview !== this.value && (this.last_preview = this.value, this.preview.innerHTML = "", this.value)) {
                    var t = this.value.match(/^data:([^;,]+)[;,]/);
                    if (t && (t = t[1]), t) {
                        if (this.preview.innerHTML = "<strong>Type:</strong> " + t + ", <strong>Size:</strong> " + Math.floor((this.value.length - this.value.split(",")[0].length - 1) / 1.33333) + " bytes", "image" === t.substr(0, 5)) {
                            this.preview.innerHTML += "<br>";
                            var e = document.createElement("img");
                            e.style.maxWidth = "100%", e.style.maxHeight = "100px", e.src = this.value, this.preview.appendChild(e)
                        }
                    } else this.preview.innerHTML = "<em>Invalid data URI</em>"
                }
            },
            enable: function() {
                this.always_disabled || (this.uploader && (this.uploader.disabled = !1), this._super())
            },
            disable: function(t) {
                t && (this.always_disabled = !0), this.uploader && (this.uploader.disabled = !0), this._super()
            },
            setValue: function(t) {
                this.value !== t && (this.value = t, this.input.value = this.value, this.refreshPreview(), this.onChange())
            },
            destroy: function() {
                this.preview && this.preview.parentNode && this.preview.parentNode.removeChild(this.preview), this.title && this.title.parentNode && this.title.parentNode.removeChild(this.title), this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), this.uploader && this.uploader.parentNode && this.uploader.parentNode.removeChild(this.uploader), this._super()
            }
        }),
        z = O.extend({
            init: function(t, e) {
                this._super(t, e), this.active = !1, this.parent && this.parent.schema && (Array.isArray(this.parent.schema.required) ? -1 === this.parent.schema.required.indexOf(this.key) && this.parent.schema.required.push(this.key) : this.parent.schema.required = [this.key])
            },
            build: function() {
                this.options.compact = !0;
                var t = this.schema.title || this.key,
                    e = this.expandCallbacks("button", n({}, {
                        icon: "",
                        validated: !1,
                        align: "left",
                        action: function(t, e) {
                            window.alert('No button action defined for "' + t.path + '"')
                        }.bind(null, this)
                    }, this.defaults.options.button || {}, this.options.button || {}));
                this.input = this.theme.getFormButton(t, e.icon, t), this.input.addEventListener("click", e.action, !1), (this.schema.readOnly || this.schema.readonly || this.schema.template) && (this.always_disabled = !0, this.input.setAttribute("readonly", "true")), this.setInputAttributes(["readonly"]), this.control = this.theme.getFormButtonHolder(e.align), this.control.appendChild(this.input), this.container.appendChild(this.control);
                var i = this;
                this.changeHandler = function() {
                    i.jsoneditor.validate(i.jsoneditor.getValue()).length > 0 ? i.disable() : i.enable()
                }, e.validated && this.jsoneditor.on("change", this.changeHandler)
            },
            enable: function() {
                this.always_disabled || (this.input.disabled = !1, this._super())
            },
            disable: function(t) {
                t && (this.always_disabled = !0), this.input.disabled = !0, this._super()
            },
            getNumColumns: function() {
                return 2
            },
            activate: function() {
                this.active = !1, this.enable()
            },
            deactivate: function() {
                this.isRequired() || (this.active = !1, this.disable())
            },
            destroy: function() {
                this.jsoneditor.off("change", this.changeHandler), this.changeHandler = null, this._super()
            }
        }),
        D = O.extend({
            setValue: function(t, e) {
                t = !!t;
                var i = this.getValue() !== t;
                this.value = t, this.input.checked = this.value, this.onChange(i)
            },
            register: function() {
                this._super(), this.input && this.input.setAttribute("name", this.formname)
            },
            unregister: function() {
                this._super(), this.input && this.input.removeAttribute("name")
            },
            getNumColumns: function() {
                return Math.min(12, Math.max(this.getTitle().length / 7, 2))
            },
            build: function() {
                var t = this;
                this.label = this.header = this.theme.getCheckboxLabel(this.getTitle(), this.isRequired()), this.schema.description && (this.description = this.theme.getFormInputDescription(this.schema.description)), this.options.infoText && !this.options.compact && (this.infoButton = this.theme.getInfoButton(this.options.infoText)), this.options.compact && this.container.classList.add("compact"), this.input = this.theme.getCheckbox(), this.control = this.theme.getFormControl(this.label, this.input, this.description, this.infoButton), (this.schema.readOnly || this.schema.readonly) && (this.always_disabled = !0, this.input.disabled = !0), this.input.addEventListener("change", function(e) {
                    e.preventDefault(), e.stopPropagation(), t.value = this.checked, t.onChange(!0)
                }), this.container.appendChild(this.control)
            },
            enable: function() {
                this.always_disabled || (this.input.disabled = !1, this._super())
            },
            disable: function(t) {
                t && (this.always_disabled = !0), this.input.disabled = !0, this._super()
            },
            destroy: function() {
                this.label && this.label.parentNode && this.label.parentNode.removeChild(this.label), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), this._super()
            },
            showValidationErrors: function(t) {
                var e = this;
                if ("always" === this.jsoneditor.options.show_errors);
                else if (!this.is_dirty && this.previous_error_setting === this.jsoneditor.options.show_errors) return;
                this.previous_error_setting = this.jsoneditor.options.show_errors;
                var i = [];
                r(t, function(t, s) {
                    s.path === e.path && i.push(s.message)
                }), this.input.controlgroup = this.control, i.length ? this.theme.addInputError(this.input, i.join(". ") + ".") : this.theme.removeInputError(this.input)
            }
        }),
        q = O.extend({
            setValue: function(t, e) {
                var i = this.typecast(t || "");
                this.enum_values.indexOf(i) < 0 && (i = this.enum_values[0]), this.value !== i && (e ? this.is_dirty = !1 : "change" === this.jsoneditor.options.show_errors && (this.is_dirty = !0), this.input.value = this.enum_options[this.enum_values.indexOf(i)], this.value = i, this.onChange(), this.change())
            },
            register: function() {
                this._super(), this.input && this.input.setAttribute("name", this.formname)
            },
            unregister: function() {
                this._super(), this.input && this.input.removeAttribute("name")
            },
            getNumColumns: function() {
                if (!this.enum_options) return 3;
                for (var t = this.getTitle().length, e = 0; e < this.enum_options.length; e++) t = Math.max(t, this.enum_options[e].length + 4);
                return Math.min(12, Math.max(t / 7, 2))
            },
            typecast: function(t) {
                return "boolean" === this.schema.type ? "undefined" === t || void 0 === t ? void 0 : !!t : "number" === this.schema.type ? 1 * t || 0 : "integer" === this.schema.type ? Math.floor(1 * t || 0) : "" + t
            },
            getValue: function() {
                if (this.dependenciesFulfilled) return this.typecast(this.value)
            },
            preBuild: function() {
                var t, e, i = this;
                if (this.input_type = "select", this.enum_options = [], this.enum_values = [], this.enum_display = [], this.schema.enum) {
                    var s = this.schema.options && this.schema.options.enum_titles || [];
                    r(this.schema.enum, function(t, e) {
                        i.enum_options[t] = "" + e, i.enum_display[t] = "" + (s[t] || e), i.enum_values[t] = i.typecast(e)
                    }), this.isRequired() || (i.enum_display.unshift(" "), i.enum_options.unshift("undefined"), i.enum_values.unshift(void 0))
                } else if ("boolean" === this.schema.type) i.enum_display = this.schema.options && this.schema.options.enum_titles || ["true", "false"], i.enum_options = ["1", ""], i.enum_values = [!0, !1], this.isRequired() || (i.enum_display.unshift(" "), i.enum_options.unshift("undefined"), i.enum_values.unshift(void 0));
                else {
                    if (!this.schema.enumSource) throw new Error("'select' editor requires the enum property to be set.");
                    if (this.enumSource = [], this.enum_display = [], this.enum_options = [], this.enum_values = [], Array.isArray(this.schema.enumSource))
                        for (t = 0; t < this.schema.enumSource.length; t++) "string" == typeof this.schema.enumSource[t] ? this.enumSource[t] = {
                            source: this.schema.enumSource[t]
                        } : Array.isArray(this.schema.enumSource[t]) ? this.enumSource[t] = this.schema.enumSource[t] : this.enumSource[t] = n({}, this.schema.enumSource[t]);
                    else this.schema.enumValue ? this.enumSource = [{
                        source: this.schema.enumSource,
                        value: this.schema.enumValue
                    }] : this.enumSource = [{
                        source: this.schema.enumSource
                    }];
                    for (t = 0; t < this.enumSource.length; t++) this.enumSource[t].value && ("function" == typeof(e = this.expandCallbacks("template", {
                        template: this.enumSource[t].value
                    })).template ? this.enumSource[t].value = e.template : this.enumSource[t].value = this.jsoneditor.compileTemplate(this.enumSource[t].value, this.template_engine)), this.enumSource[t].title && ("function" == typeof(e = this.expandCallbacks("template", {
                        template: this.enumSource[t].title
                    })).template ? this.enumSource[t].title = e.template : this.enumSource[t].title = this.jsoneditor.compileTemplate(this.enumSource[t].title, this.template_engine)), this.enumSource[t].filter && this.enumSource[t].value && ("function" == typeof(e = this.expandCallbacks("template", {
                        template: this.enumSource[t].filter
                    })).template ? this.enumSource[t].filter = e.template : this.enumSource[t].filter = this.jsoneditor.compileTemplate(this.enumSource[t].filter, this.template_engine))
                }
            },
            build: function() {
                var t = this;
                this.options.compact || (this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())), this.schema.description && (this.description = this.theme.getFormInputDescription(this.schema.description)), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.options.infoText)), this.options.compact && this.container.classList.add("compact"), this.input = this.theme.getSelectInput(this.enum_options, !1), this.theme.setSelectOptions(this.input, this.enum_options, this.enum_display), (this.schema.readOnly || this.schema.readonly) && (this.always_disabled = !0, this.input.disabled = !0), this.setInputAttributes([]), this.input.addEventListener("change", function(e) {
                    e.preventDefault(), e.stopPropagation(), t.onInputChange()
                }), this.control = this.theme.getFormControl(this.label, this.input, this.description, this.infoButton), this.container.appendChild(this.control), this.value = this.enum_values[0], window.requestAnimationFrame(function() {
                    t.input.parentNode && t.afterInputReady()
                })
            },
            afterInputReady: function() {
                this.theme.afterInputReady(this.input)
            },
            onInputChange: function() {
                var t, e = this.typecast(this.input.value);
                (t = -1 === this.enum_values.indexOf(e) ? this.enum_values[0] : this.enum_values[this.enum_values.indexOf(e)]) !== this.value && (this.is_dirty = !0, this.value = t, this.onChange(!0))
            },
            onWatchedFieldChange: function() {
                var t, e, i = [],
                    s = [];
                if (this.enumSource) {
                    t = this.getWatchedFieldValues();
                    for (var n = 0; n < this.enumSource.length; n++)
                        if (Array.isArray(this.enumSource[n])) i = i.concat(this.enumSource[n]), s = s.concat(this.enumSource[n]);
                        else {
                            var r = [];
                            if (r = Array.isArray(this.enumSource[n].source) ? this.enumSource[n].source : t[this.enumSource[n].source]) {
                                if (this.enumSource[n].slice && (r = Array.prototype.slice.apply(r, this.enumSource[n].slice)), this.enumSource[n].filter) {
                                    var o = [];
                                    for (e = 0; e < r.length; e++) this.enumSource[n].filter({
                                        i: e,
                                        item: r[e],
                                        watched: t
                                    }) && o.push(r[e]);
                                    r = o
                                }
                                var a = [],
                                    l = [];
                                for (e = 0; e < r.length; e++) {
                                    var d = r[e];
                                    this.enumSource[n].value ? l[e] = this.typecast(this.enumSource[n].value({
                                        i: e,
                                        item: d
                                    })) : l[e] = r[e], this.enumSource[n].title ? a[e] = this.enumSource[n].title({
                                        i: e,
                                        item: d
                                    }) : a[e] = l[e]
                                }
                                this.enumSource[n].sort && function(t, e, i) {
                                    t.map(function(t, i) {
                                        return {
                                            v: t,
                                            t: e[i]
                                        }
                                    }).sort(function(t, e) {
                                        return t.v < e.v ? -i : t.v === e.v ? 0 : i
                                    }).forEach(function(i, s) {
                                        t[s] = i.v, e[s] = i.t
                                    })
                                }.bind(null, l, a, "desc" === this.enumSource[n].sort ? 1 : -1)(), i = i.concat(l), s = s.concat(a)
                            }
                        } var h = this.value;
                    this.theme.setSelectOptions(this.input, i, s), this.enum_options = i, this.enum_display = s, this.enum_values = i, -1 !== i.indexOf(h) ? (this.input.value = h, this.value = h) : (this.input.value = i[0], this.value = this.typecast(i[0] || ""), this.parent && !this.watchLoop ? this.parent.onChildEditorChange(this) : this.jsoneditor.onChange(), this.jsoneditor.notifyWatchers(this.path))
                }
                this._super()
            },
            enable: function() {
                this.always_disabled || (this.input.disabled = !1), this._super()
            },
            disable: function(t) {
                t && (this.always_disabled = !0), this.input.disabled = !0, this._super(t)
            },
            destroy: function() {
                this.label && this.label.parentNode && this.label.parentNode.removeChild(this.label), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), this._super()
            },
            showValidationErrors: function(t) {
                var e = this;
                this.previous_error_setting = this.jsoneditor.options.show_errors;
                var i = [];
                r(t, function(t, s) {
                    s.path === e.path && i.push(s.message)
                }), i.length ? this.theme.addInputError(this.input, i.join(". ") + ".") : this.theme.removeInputError(this.input)
            }
        }),
        G = q.extend({
            setValue: function(t, e) {
                if (this.choices_instance) {
                    var i = this.typecast(t || "");
                    if (this.enum_values.indexOf(i) < 0 && (i = this.enum_values[0]), this.value === i) return;
                    e ? this.is_dirty = !1 : "change" === this.jsoneditor.options.show_errors && (this.is_dirty = !0), this.input.value = this.enum_options[this.enum_values.indexOf(i)], this.choices_instance.setChoiceByValue(this.input.value), this.value = i, this.onChange()
                } else this._super(t, e)
            },
            afterInputReady: function() {
                var t;
                window.Choices && !this.choices_instance && (t = this.expandCallbacks("choices", n({}, this.defaults.options.choices || {}, this.options.choices || {})), this.choices_instance = new window.Choices(this.input, t));
                this._super()
            },
            onWatchedFieldChange: function() {
                if (this._super(), this.choices_instance) {
                    var t = this,
                        e = this.enum_options.map(function(e, i) {
                            return {
                                value: e,
                                label: t.enum_display[i]
                            }
                        });
                    this.choices_instance.setChoices(e, "value", "label", !0), this.choices_instance.setChoiceByValue(this.value + "")
                }
            },
            enable: function() {
                !this.always_disabled && this.choices_instance && this.choices_instance.enable(), this._super()
            },
            disable: function(t) {
                this.choices_instance && this.choices_instance.disable(), this._super(t)
            },
            destroy: function() {
                this.choices_instance && (this.choices_instance.destroy(), this.choices_instance = null), this._super()
            }
        }),
        J = P.extend({
            build: function() {
                if (this._super(), this.input && window.flatpickr && "object" == typeof this.options.flatpickr) {
                    this.options.flatpickr.enableTime = "date" !== this.schema.format, this.options.flatpickr.noCalendar = "time" === this.schema.format, "integer" === this.schema.type && (this.options.flatpickr.mode = "single"), this.input.setAttribute("data-input", "");
                    var t = this.input;
                    if (!0 === this.options.flatpickr.wrap) {
                        var e = [];
                        if (!1 !== this.options.flatpickr.showToggleButton) {
                            var i = this.getButton("", "time" === this.schema.format ? "time" : "calendar", this.translate("flatpickr_toggle_button"));
                            i.setAttribute("data-toggle", ""), e.push(i)
                        }
                        if (!1 !== this.options.flatpickr.showClearButton) {
                            var s = this.getButton("", "clear", this.translate("flatpickr_clear_button"));
                            s.setAttribute("data-clear", ""), e.push(s)
                        }
                        var n = this.input.parentNode,
                            r = this.input.nextSibling,
                            o = this.theme.getInputGroup(this.input, e);
                        void 0 !== o ? (this.options.flatpickr.inline = !1, n.insertBefore(o, r), t = o) : this.options.flatpickr.wrap = !1
                    }
                    this.flatpickr = window.flatpickr(t, this.options.flatpickr), !0 === this.options.flatpickr.inline && !0 === this.options.flatpickr.inlineHideInput && this.input.setAttribute("type", "hidden")
                }
            },
            getValue: function() {
                if (this.dependenciesFulfilled) {
                    if ("string" === this.schema.type) return this.value;
                    if ("" !== this.value && void 0 !== this.value) {
                        var t = "time" === this.schema.format ? "1970-01-01 " + this.value : this.value;
                        return parseInt(new Date(t).getTime() / 1e3)
                    }
                }
            },
            setValue: function(t, e, i) {
                if ("string" === this.schema.type) this._super(t, e, i), this.flatpickr && this.flatpickr.setDate(t);
                else if (t > 0) {
                    var s = new Date(1e3 * t),
                        n = s.getFullYear(),
                        r = this.zeroPad(s.getMonth() + 1),
                        o = this.zeroPad(s.getDate()),
                        a = this.zeroPad(s.getHours()),
                        l = this.zeroPad(s.getMinutes()),
                        d = this.zeroPad(s.getSeconds()),
                        h = [n, r, o].join("-"),
                        c = [a, l, d].join(":"),
                        u = h + "T" + c;
                    "date" === this.schema.format ? u = h : "time" === this.schema.format && (u = c), this.input.value = u, this.refreshValue(), this.flatpickr && this.flatpickr.setDate(u)
                }
            },
            destroy: function() {
                this.flatpickr && this.flatpickr.destroy(), this.flatpickr = null, this._super()
            },
            zeroPad: function(t) {
                return ("0" + t).slice(-2)
            }
        }),
        W = O.extend({
            register: function() {
                if (this.editors) {
                    for (var t = 0; t < this.editors.length; t++) this.editors[t] && this.editors[t].unregister();
                    this.editors[this.currentEditor] && this.editors[this.currentEditor].register()
                }
                this._super()
            },
            unregister: function() {
                if (this._super(), this.editors)
                    for (var t = 0; t < this.editors.length; t++) this.editors[t] && this.editors[t].unregister()
            },
            getNumColumns: function() {
                return this.editors[this.currentEditor] ? Math.max(this.editors[this.currentEditor].getNumColumns(), 4) : 4
            },
            enable: function() {
                if (this.editors)
                    for (var t = 0; t < this.editors.length; t++) this.editors[t] && this.editors[t].enable();
                this._super()
            },
            disable: function() {
                if (this.editors)
                    for (var t = 0; t < this.editors.length; t++) this.editors[t] && this.editors[t].disable();
                this._super()
            },
            switchEditor: function() {
                var t = this,
                    e = this.getWatchedFieldValues();
                if (e) {
                    var i = document.location.toString() + this.template(e);
                    this.editors[this.refs[i]] || this.buildChildEditor(i), this.currentEditor = this.refs[i], this.register(), r(this.editors, function(e, i) {
                        i && (t.currentEditor === e ? i.container.style.display = "" : i.container.style.display = "none")
                    }), this.refreshValue(), this.onChange(!0)
                }
            },
            buildChildEditor: function(t) {
                this.refs[t] = this.editors.length;
                var e = this.theme.getChildEditorHolder();
                this.editor_holder.appendChild(e);
                var i = n({}, this.schema, this.jsoneditor.refs[t]),
                    s = this.jsoneditor.getEditorClass(i, this.jsoneditor),
                    r = this.jsoneditor.createEditor(s, {
                        jsoneditor: this.jsoneditor,
                        schema: i,
                        container: e,
                        path: this.path,
                        parent: this,
                        required: !0
                    });
                this.editors.push(r), r.preBuild(), r.build(), r.postBuild()
            },
            preBuild: function() {
                this.refs = {}, this.editors = [], this.currentEditor = "";
                for (var t = 0; t < this.schema.links.length; t++)
                    if ("describedby" === this.schema.links[t].rel.toLowerCase()) {
                        this.template = this.jsoneditor.compileTemplate(this.schema.links[t].href, this.template_engine);
                        break
                    } this.schema.links.splice(0, 1), 0 === this.schema.links.length && delete this.schema.links, this.baseSchema = n({}, this.schema)
            },
            build: function() {
                this.editor_holder = document.createElement("div"), this.container.appendChild(this.editor_holder), this.switchEditor()
            },
            onWatchedFieldChange: function() {
                this.switchEditor()
            },
            onChildEditorChange: function(t) {
                this.editors[this.currentEditor] && this.refreshValue(), this._super(t)
            },
            refreshValue: function() {
                this.editors[this.currentEditor] && (this.value = this.editors[this.currentEditor].getValue())
            },
            setValue: function(t, e) {
                this.editors[this.currentEditor] && (this.editors[this.currentEditor].setValue(t, e), this.refreshValue(), this.onChange())
            },
            destroy: function() {
                r(this.editors, function(t, e) {
                    e && e.destroy()
                }), this.editor_holder && this.editor_holder.parentNode && this.editor_holder.parentNode.removeChild(this.editor_holder), this._super()
            },
            showValidationErrors: function(t) {
                r(this.editors, function(e, i) {
                    i && i.showValidationErrors(t)
                })
            }
        }),
        U = O.extend({
            getNumColumns: function() {
                return 4
            },
            build: function() {
                this.title = this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired()), this.container.appendChild(this.title), this.options.enum_titles = this.options.enum_titles || [], this.enum = this.schema.enum, this.selected = 0, this.select_options = [], this.html_values = [];
                for (var t = this, e = 0; e < this.enum.length; e++) this.select_options[e] = this.options.enum_titles[e] || "Value " + (e + 1), this.html_values[e] = this.getHTML(this.enum[e]);
                this.switcher = this.theme.getSwitcher(this.select_options), this.container.appendChild(this.switcher), this.display_area = this.theme.getIndentedPanel(), this.container.appendChild(this.display_area), this.options.hide_display && (this.display_area.style.display = "none"), this.switcher.addEventListener("change", function() {
                    t.selected = t.select_options.indexOf(this.value), t.value = t.enum[t.selected], t.refreshValue(), t.onChange(!0)
                }), this.value = this.enum[0], this.refreshValue(), 1 === this.enum.length && (this.switcher.style.display = "none")
            },
            refreshValue: function() {
                var t = this;
                t.selected = -1;
                var e = JSON.stringify(this.value);
                r(this.enum, function(i, s) {
                    if (e === JSON.stringify(s)) return t.selected = i, !1
                }), t.selected < 0 ? t.setValue(t.enum[0]) : (this.switcher.value = this.select_options[this.selected], this.display_area.innerHTML = this.html_values[this.selected])
            },
            enable: function() {
                this.always_disabled || (this.switcher.disabled = !1, this._super())
            },
            disable: function(t) {
                t && (this.always_disabled = !0), this.switcher.disabled = !0, this._super()
            },
            getHTML: function(t) {
                var e = this;
                if (null === t) return "<em>null</em>";
                if ("object" == typeof t) {
                    var i = "";
                    return r(t, function(s, n) {
                        var r = e.getHTML(n);
                        Array.isArray(t) || (r = "<div><em>" + s + "</em>: " + r + "</div>"), i += "<li>" + r + "</li>"
                    }), i = Array.isArray(t) ? "<ol>" + i + "</ol>" : "<ul style='margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0;'>" + i + "</ul>"
                }
                return "boolean" == typeof t ? t ? "true" : "false" : "string" == typeof t ? t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : t
            },
            setValue: function(t) {
                this.value !== t && (this.value = t, this.refreshValue(), this.onChange())
            },
            destroy: function() {
                this.display_area && this.display_area.parentNode && this.display_area.parentNode.removeChild(this.display_area), this.title && this.title.parentNode && this.title.parentNode.removeChild(this.title), this.switcher && this.switcher.parentNode && this.switcher.parentNode.removeChild(this.switcher), this._super()
            }
        }),
        $ = O.extend({
            register: function() {
                this._super(), this.input && this.input.setAttribute("name", this.formname)
            },
            unregister: function() {
                this._super(), this.input && this.input.removeAttribute("name")
            },
            setValue: function(t, e, i) {
                if ((!this.template || i) && (null == t ? t = "" : "object" == typeof t ? t = JSON.stringify(t) : "string" != typeof t && (t = "" + t), t !== this.serialized)) {
                    var s = this.sanitize(t);
                    if (this.input.value !== s) {
                        this.input.value = s;
                        var n = i || this.getValue() !== t;
                        this.refreshValue(), e ? this.is_dirty = !1 : "change" === this.jsoneditor.options.show_errors && (this.is_dirty = !0), this.adjust_height && this.adjust_height(this.input), this.onChange(n)
                    }
                }
            },
            getNumColumns: function() {
                return 2
            },
            enable: function() {
                this._super()
            },
            disable: function() {
                this._super()
            },
            refreshValue: function() {
                this.value = this.input.value, "string" != typeof this.value && (this.value = ""), this.serialized = this.value
            },
            destroy: function() {
                this.template = null, this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), this.label && this.label.parentNode && this.label.parentNode.removeChild(this.label), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), this._super()
            },
            sanitize: function(t) {
                return t
            },
            onWatchedFieldChange: function() {
                var t;
                this.template && (t = this.getWatchedFieldValues(), this.setValue(this.template(t), !1, !0)), this._super()
            },
            build: function() {
                if (this.format = this.schema.format, !this.format && this.options.default_format && (this.format = this.options.default_format), this.options.format && (this.format = this.options.format), this.input_type = "hidden", this.input = this.theme.getFormInputField(this.input_type), this.format && this.input.setAttribute("data-schemaformat", this.format), this.container.appendChild(this.input), this.schema.template) {
                    var t = this.expandCallbacks("template", {
                        template: this.schema.template
                    });
                    "function" == typeof t.template ? this.template = t.template : this.template = this.jsoneditor.compileTemplate(this.schema.template, this.template_engine), this.refreshValue()
                } else this.refreshValue()
            }
        }),
        Q = z.extend({
            build: function() {
                this.options.compact = !1, this.header = this.label = this.theme.getFormInputLabel(this.getTitle()), this.description = this.theme.getDescription(this.schema.description || ""), this.control = this.theme.getFormControl(this.label, this.description, null), this.container.appendChild(this.control)
            },
            getTitle: function() {
                return this.schema.title
            },
            getNumColumns: function() {
                return 12
            }
        }),
        Y = P.extend({
            build: function() {
                if (this._super(), void 0 !== this.schema.minimum) {
                    var t = this.schema.minimum;
                    void 0 !== this.schema.exclusiveMinimum && (t += 1), this.input.setAttribute("min", t)
                }
                if (void 0 !== this.schema.maximum) {
                    var e = this.schema.maximum;
                    void 0 !== this.schema.exclusiveMaximum && (e -= 1), this.input.setAttribute("max", e)
                }
                if (void 0 !== this.schema.step) {
                    var i = this.schema.step || 1;
                    this.input.setAttribute("step", i)
                }
                this.setInputAttributes(["maxlength", "pattern", "readonly", "min", "max", "step"])
            },
            sanitize: function(t) {
                return (t + "").replace(/[^0-9\.\-eE]/g, "")
            },
            getNumColumns: function() {
                return 2
            },
            getValue: function() {
                if (this.dependenciesFulfilled) return "" === this.value ? void 0 : 1 * this.value
            }
        }),
        Z = Y.extend({
            sanitize: function(t) {
                return (t += "").replace(/[^0-9\-]/g, "")
            },
            getNumColumns: function() {
                return 2
            }
        }),
        X = P.extend({
            preBuild: function() {
                if (this._super(), this.schema.options || (this.schema.options = {}), !this.schema.options.cleave) switch (this.format) {
                    case "ipv6":
                        this.schema.options.cleave = {
                            delimiters: [":"],
                            blocks: [4, 4, 4, 4, 4, 4, 4, 4],
                            uppercase: !0
                        };
                        break;
                    case "ipv4":
                        this.schema.options.cleave = {
                            delimiters: ["."],
                            blocks: [3, 3, 3, 3],
                            numericOnly: !0
                        }
                }
                this.options = n(this.options, this.schema.options || {})
            }
        }),
        K = P.extend({
            setValue: function(t, e, i) {
                var s = this._super(t, e, i);
                void 0 !== s && s.changed && this.jodit_instance && this.jodit_instance.setEditorValue(s.value)
            },
            build: function() {
                this.options.format = "textarea", this._super(), this.input_type = this.schema.format, this.input.setAttribute("data-schemaformat", this.input_type)
            },
            afterInputReady: function() {
                var t, e = this;
                window.Jodit ? (t = this.expandCallbacks("jodit", n({}, {
                    height: 300
                }, this.defaults.options.jodit || {}, this.options.jodit || {})), this.jodit_instance = new window.Jodit(this.input, t), (this.schema.readOnly || this.schema.readonly || this.schema.template) && this.jodit_instance.setReadOnly(!0), this.jodit_instance.events.on("change", function() {
                    e.value = e.jodit_instance.getEditorValue(), e.is_dirty = !0, e.onChange(!0)
                }), this.theme.afterInputReady(e.input)) : this._super()
            },
            getNumColumns: function() {
                return 6
            },
            enable: function() {
                !this.always_disabled && this.jodit_instance && this.jodit_instance.setReadOnly(!1), this._super()
            },
            disable: function(t) {
                this.jodit_instance && this.jodit_instance.setReadOnly(!0), this._super(t)
            },
            destroy: function() {
                this.jodit_instance && (this.jodit_instance.destruct(), this.jodit_instance = null), this._super()
            }
        }),
        tt = O.extend({
            register: function() {
                if (this.editors) {
                    for (var t = 0; t < this.editors.length; t++) this.editors[t] && this.editors[t].unregister();
                    this.editors[this.type] && this.editors[this.type].register()
                }
                this._super()
            },
            unregister: function() {
                if (this._super(), this.editors)
                    for (var t = 0; t < this.editors.length; t++) this.editors[t] && this.editors[t].unregister()
            },
            getNumColumns: function() {
                return this.editors[this.type] ? Math.max(this.editors[this.type].getNumColumns(), 4) : 4
            },
            enable: function() {
                if (!this.always_disabled) {
                    if (this.editors)
                        for (var t = 0; t < this.editors.length; t++) this.editors[t] && this.editors[t].enable();
                    this.switcher.disabled = !1, this._super()
                }
            },
            disable: function(t) {
                if (t && (this.always_disabled = !0), this.editors)
                    for (var e = 0; e < this.editors.length; e++) this.editors[e] && this.editors[e].disable(t);
                this.switcher.disabled = !0, this._super()
            },
            switchEditor: function(t) {
                var e = this;
                this.editors[t] || this.buildChildEditor(t);
                var i = e.getValue();
                e.type = t, e.register(), r(e.editors, function(t, s) {
                    s && (e.type === t ? (e.keep_values && s.setValue(i, !0), s.container.style.display = "") : s.container.style.display = "none")
                }), e.refreshValue(), e.refreshHeaderText()
            },
            buildChildEditor: function(t) {
                var e, i = this,
                    s = this.types[t],
                    r = i.theme.getChildEditorHolder();
                i.editor_holder.appendChild(r), "string" == typeof s ? (e = n({}, i.schema)).type = s : (e = n({}, i.schema, s), e = i.jsoneditor.expandRefs(e), s && s.required && Array.isArray(s.required) && i.schema.required && Array.isArray(i.schema.required) && (e.required = i.schema.required.concat(s.required)));
                var o = i.jsoneditor.getEditorClass(e);
                i.editors[t] = i.jsoneditor.createEditor(o, {
                    jsoneditor: i.jsoneditor,
                    schema: e,
                    container: r,
                    path: i.path,
                    parent: i,
                    required: !0
                }), i.editors[t].preBuild(), i.editors[t].build(), i.editors[t].postBuild(), i.editors[t].header && (i.editors[t].header.style.display = "none"), i.editors[t].option = i.switcher_options[t], r.addEventListener("change_header_text", function() {
                    i.refreshHeaderText()
                }), t !== i.type && (r.style.display = "none")
            },
            preBuild: function() {
                if (this.types = [], this.type = 0, this.editors = [], this.validators = [], this.keep_values = !0, void 0 !== this.jsoneditor.options.keep_oneof_values && (this.keep_values = this.jsoneditor.options.keep_oneof_values), void 0 !== this.options.keep_oneof_values && (this.keep_values = this.options.keep_oneof_values), this.schema.oneOf) this.oneOf = !0, this.types = this.schema.oneOf, delete this.schema.oneOf;
                else if (this.schema.anyOf) this.anyOf = !0, this.types = this.schema.anyOf, delete this.schema.anyOf;
                else {
                    if (this.schema.type && "any" !== this.schema.type) Array.isArray(this.schema.type) ? this.types = this.schema.type : this.types = [this.schema.type];
                    else if (this.types = ["string", "number", "integer", "boolean", "object", "array", "null"], this.schema.disallow) {
                        var t = this.schema.disallow;
                        "object" == typeof t && Array.isArray(t) || (t = [t]);
                        var e = [];
                        r(this.types, function(i, s) {
                            -1 === t.indexOf(s) && e.push(s)
                        }), this.types = e
                    }
                    delete this.schema.type
                }
                this.display_text = this.getDisplayText(this.types)
            },
            build: function() {
                var t = this,
                    e = this.container;
                this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired()), this.container.appendChild(this.header), this.switcher = this.theme.getSwitcher(this.display_text), e.appendChild(this.switcher), this.switcher.addEventListener("change", function(e) {
                    e.preventDefault(), e.stopPropagation(), t.switchEditor(t.display_text.indexOf(this.value)), t.onChange(!0)
                }), this.editor_holder = document.createElement("div"), e.appendChild(this.editor_holder);
                var i = {};
                t.jsoneditor.options.custom_validators && (i.custom_validators = t.jsoneditor.options.custom_validators), this.switcher_options = this.theme.getSwitcherOptions(this.switcher), r(this.types, function(e, s) {
                    var r;
                    t.editors[e] = !1, "string" == typeof s ? (r = n({}, t.schema)).type = s : (r = n({}, t.schema, s), s.required && Array.isArray(s.required) && t.schema.required && Array.isArray(t.schema.required) && (r.required = t.schema.required.concat(s.required))), t.validators[e] = new p(t.jsoneditor, r, i, t.defaults)
                }), this.switchEditor(0)
            },
            onChildEditorChange: function(t) {
                this.editors[this.type] && (this.refreshValue(), this.refreshHeaderText()), this._super()
            },
            refreshHeaderText: function() {
                var t = this.getDisplayText(this.types);
                r(this.switcher_options, function(e, i) {
                    i.textContent = t[e]
                })
            },
            refreshValue: function() {
                this.value = this.editors[this.type].getValue()
            },
            setValue: function(t, e) {
                var i = this,
                    s = this.type,
                    n = {
                        match: 0,
                        extra: 0,
                        i: this.type
                    },
                    o = {
                        match: 0,
                        i: null
                    };
                r(this.validators, function(e, s) {
                    var r = null;
                    void 0 !== i.anyOf && i.anyOf && (r = s.fitTest(t), n.match < r.match ? (n = r).i = e : n.match === r.match && n.extra > r.extra && ((n = r).i = e)), s.validate(t).length || null !== o.i || (o.i = e, null !== r && (o.match = r.match))
                });
                var a = o.i;
                void 0 !== i.anyOf && i.anyOf && o.match < n.match && (a = n.i), null === a && (a = this.type), this.type = a, this.switcher.value = this.display_text[a];
                var l = this.type !== s;
                l && this.switchEditor(this.type), this.editors[this.type].setValue(t, e), this.refreshValue(), i.onChange(l)
            },
            destroy: function() {
                r(this.editors, function(t, e) {
                    e && e.destroy()
                }), this.editor_holder && this.editor_holder.parentNode && this.editor_holder.parentNode.removeChild(this.editor_holder), this.switcher && this.switcher.parentNode && this.switcher.parentNode.removeChild(this.switcher), this._super()
            },
            showValidationErrors: function(t) {
                var e = this;
                if (this.oneOf || this.anyOf) {
                    var i = this.oneOf ? "oneOf" : "anyOf";
                    r(this.editors, function(s, o) {
                        if (o) {
                            var a = e.path + "." + i + "[" + s + "]",
                                l = [];
                            r(t, function(t, i) {
                                if (i.path === a.substr(0, i.path.length)) {
                                    var s = n({}, i);
                                    s.path = e.path + s.path.substr(a.length), l.push(s)
                                }
                            }), o.showValidationErrors(l)
                        }
                    })
                } else r(this.editors, function(e, i) {
                    i && i.showValidationErrors(t)
                })
            }
        }),
        et = O.extend({
            getValue: function() {
                if (this.dependenciesFulfilled) return null
            },
            setValue: function() {
                this.onChange()
            },
            getNumColumns: function() {
                return 2
            }
        }),
        it = O.extend({
            getDefault: function() {
                return n({}, this.schema.default || {})
            },
            getChildEditors: function() {
                return this.editors
            },
            register: function() {
                if (this._super(), this.editors)
                    for (var t in this.editors) this.editors.hasOwnProperty(t) && this.editors[t].register()
            },
            unregister: function() {
                if (this._super(), this.editors)
                    for (var t in this.editors) this.editors.hasOwnProperty(t) && this.editors[t].unregister()
            },
            getNumColumns: function() {
                return Math.max(Math.min(12, this.maxwidth), 3)
            },
            enable: function() {
                if (!this.always_disabled && (this.editjson_button && (this.editjson_button.disabled = !1), this.addproperty_button && (this.addproperty_button.disabled = !1), this._super(), this.editors))
                    for (var t in this.editors) this.editors.hasOwnProperty(t) && (this.editors[t].isActive() && this.editors[t].enable(), this.editors[t].optInCheckbox.disabled = !1)
            },
            disable: function(t) {
                if (t && (this.always_disabled = !0), this.editjson_button && (this.editjson_button.disabled = !0), this.addproperty_button && (this.addproperty_button.disabled = !0), this.hideEditJSON(), this._super(), this.editors)
                    for (var e in this.editors) this.editors.hasOwnProperty(e) && (this.editors[e].isActive() && this.editors[e].disable(t), this.editors[e].optInCheckbox.disabled = !0)
            },
            layoutEditors: function() {
                var t, e, i = this;
                if (this.row_container) {
                    var s;
                    this.property_order = Object.keys(this.editors), this.property_order = this.property_order.sort(function(t, e) {
                        var s = i.editors[t].schema.propertyOrder,
                            n = i.editors[e].schema.propertyOrder;
                        return "number" != typeof s && (s = 1e3), "number" != typeof n && (n = 1e3), s - n
                    });
                    var n, a = "categories" === this.format,
                        l = [],
                        d = null,
                        h = null;
                    if ("grid-strict" === this.format) {
                        var c = 0;
                        if (n = [], r(this.property_order, function(t, e) {
                                var s = i.editors[e];
                                if (!s.property_removed) {
                                    var r = s.options.hidden ? 0 : s.options.grid_columns || s.getNumColumns(),
                                        o = s.options.hidden ? 0 : s.options.grid_offset || 0,
                                        a = !s.options.hidden && (s.options.grid_break || !1),
                                        d = {
                                            key: e,
                                            width: r,
                                            offset: o,
                                            height: s.options.hidden ? 0 : s.container.offsetHeight
                                        };
                                    n.push(d), l[c] = n, a && (c++, n = [])
                                }
                            }), this.layout === JSON.stringify(l)) return !1;
                        for (this.layout = JSON.stringify(l), s = document.createElement("div"), t = 0; t < l.length; t++)
                            for (n = this.theme.getGridRow(), s.appendChild(n), e = 0; e < l[t].length; e++) d = l[t][e].key, (h = this.editors[d]).options.hidden ? h.container.style.display = "none" : this.theme.setGridColumnSize(h.container, l[t][e].width, l[t][e].offset), n.appendChild(h.container)
                    } else if ("grid" === this.format) {
                        for (r(this.property_order, function(t, e) {
                                var s = i.editors[e];
                                if (!s.property_removed) {
                                    for (var n = !1, r = s.options.hidden ? 0 : s.options.grid_columns || s.getNumColumns(), o = s.options.hidden ? 0 : s.container.offsetHeight, a = 0; a < l.length; a++) l[a].width + r <= 12 && (!o || .5 * l[a].minh < o && 2 * l[a].maxh > o) && (n = a);
                                    !1 === n && (l.push({
                                        width: 0,
                                        minh: 999999,
                                        maxh: 0,
                                        editors: []
                                    }), n = l.length - 1), l[n].editors.push({
                                        key: e,
                                        width: r,
                                        height: o
                                    }), l[n].width += r, l[n].minh = Math.min(l[n].minh, o), l[n].maxh = Math.max(l[n].maxh, o)
                                }
                            }), t = 0; t < l.length; t++)
                            if (l[t].width < 12) {
                                var u = !1,
                                    p = 0;
                                for (e = 0; e < l[t].editors.length; e++) !1 === u ? u = e : l[t].editors[e].width > l[t].editors[u].width && (u = e), l[t].editors[e].width *= 12 / l[t].width, l[t].editors[e].width = Math.floor(l[t].editors[e].width), p += l[t].editors[e].width;
                                p < 12 && (l[t].editors[u].width += 12 - p), l[t].width = 12
                            } if (this.layout === JSON.stringify(l)) return !1;
                        for (this.layout = JSON.stringify(l), s = document.createElement("div"), t = 0; t < l.length; t++)
                            for (n = this.theme.getGridRow(), s.appendChild(n), e = 0; e < l[t].editors.length; e++) d = l[t].editors[e].key, (h = this.editors[d]).options.hidden ? h.container.style.display = "none" : this.theme.setGridColumnSize(h.container, l[t].editors[e].width), n.appendChild(h.container)
                    } else {
                        if (s = document.createElement("div"), a) {
                            var m = document.createElement("div"),
                                f = this.theme.getTopTabHolder(this.schema.title),
                                g = this.theme.getTopTabContentHolder(f);
                            for (r(this.property_order, function(t, e) {
                                    var s = i.editors[e];
                                    if (!s.property_removed) {
                                        var n = i.theme.getTabContent(),
                                            r = s.schema && ("object" === s.schema.type || "array" === s.schema.type);
                                        n.isObjOrArray = r;
                                        var o = i.theme.getGridRow();
                                        s.tab || (void 0 === i.basicPane ? i.addRow(s, f, n) : i.addRow(s, f, i.basicPane)), n.id = i.getValidId(s.tab_text.textContent), r ? (n.appendChild(o), g.appendChild(n), i.theme.addTopTab(f, s.tab)) : (m.appendChild(o), g.childElementCount > 0 ? g.firstChild.isObjOrArray && (n.appendChild(m), g.insertBefore(n, g.firstChild), i.theme.insertBasicTopTab(s.tab, f), s.basicPane = n) : (n.appendChild(m), g.appendChild(n), i.theme.addTopTab(f, s.tab), s.basicPane = n)), s.options.hidden ? s.container.style.display = "none" : i.theme.setGridColumnSize(s.container, 12), o.appendChild(s.container), s.rowPane = n
                                    }
                                }); this.tabPanesContainer.firstChild;) this.tabPanesContainer.removeChild(this.tabPanesContainer.firstChild);
                            var b = this.tabs_holder.parentNode;
                            b.removeChild(b.firstChild), b.appendChild(f), this.tabPanesContainer = g, this.tabs_holder = f;
                            var v = this.theme.getFirstTab(this.tabs_holder);
                            return void(v && o(v, "click"))
                        }
                        r(this.property_order, function(t, e) {
                            var r = i.editors[e];
                            r.property_removed || (n = i.theme.getGridRow(), s.appendChild(n), r.options.hidden ? r.container.style.display = "none" : i.theme.setGridColumnSize(r.container, 12), n.appendChild(r.container))
                        })
                    }
                    for (; this.row_container.firstChild;) this.row_container.removeChild(this.row_container.firstChild);
                    this.row_container.appendChild(s)
                }
            },
            getPropertySchema: function(t) {
                var e = this.schema.properties[t] || {};
                e = n({}, e);
                var i = !!this.schema.properties[t];
                if (this.schema.patternProperties)
                    for (var s in this.schema.patternProperties) {
                        if (this.schema.patternProperties.hasOwnProperty(s)) new RegExp(s).test(t) && (e.allOf = e.allOf || [], e.allOf.push(this.schema.patternProperties[s]), i = !0)
                    }
                return !i && this.schema.additionalProperties && "object" == typeof this.schema.additionalProperties && (e = n({}, this.schema.additionalProperties)), e
            },
            preBuild: function() {
                this._super(), this.editors = {}, this.cached_editors = {};
                var t = this;
                if (this.format = this.options.layout || this.options.object_layout || this.schema.format || this.jsoneditor.options.object_layout || "normal", this.schema.properties = this.schema.properties || {}, this.minwidth = 0, this.maxwidth = 0, this.options.table_row) r(this.schema.properties, function(e, i) {
                    var s = t.jsoneditor.getEditorClass(i);
                    t.editors[e] = t.jsoneditor.createEditor(s, {
                        jsoneditor: t.jsoneditor,
                        schema: i,
                        path: t.path + "." + e,
                        parent: t,
                        compact: !0,
                        required: !0
                    }), t.editors[e].preBuild();
                    var n = t.editors[e].options.hidden ? 0 : t.editors[e].options.grid_columns || t.editors[e].getNumColumns();
                    t.minwidth += n, t.maxwidth += n
                }), this.no_link_holder = !0;
                else {
                    if (this.options.table) throw new Error("Not supported yet");
                    this.schema.defaultProperties || (this.jsoneditor.options.display_required_only || this.options.display_required_only ? (this.schema.defaultProperties = [], r(this.schema.properties, function(e, i) {
                        t.isRequired({
                            key: e,
                            schema: i
                        }) && t.schema.defaultProperties.push(e)
                    })) : t.schema.defaultProperties = Object.keys(t.schema.properties)), t.maxwidth += 1, r(this.schema.defaultProperties, function(e, i) {
                        t.addObjectProperty(i, !0), t.editors[i] && (t.minwidth = Math.max(t.minwidth, t.editors[i].options.grid_columns || t.editors[i].getNumColumns()), t.maxwidth += t.editors[i].options.grid_columns || t.editors[i].getNumColumns())
                    })
                }
                this.property_order = Object.keys(this.editors), this.property_order = this.property_order.sort(function(e, i) {
                    var s = t.editors[e].schema.propertyOrder,
                        n = t.editors[i].schema.propertyOrder;
                    return "number" != typeof s && (s = 1e3), "number" != typeof n && (n = 1e3), s - n
                })
            },
            addTab: function(t) {
                var e = this,
                    i = e.rows[t].schema && ("object" === e.rows[t].schema.type || "array" === e.rows[t].schema.type);
                e.tabs_holder && (e.rows[t].tab_text = document.createElement("span"), e.rows[t].tab_text.textContent = i ? e.rows[t].getHeaderText() : void 0 === e.schema.basicCategoryTitle ? "Basic" : e.schema.basicCategoryTitle, e.rows[t].tab = e.theme.getTopTab(e.rows[t].tab_text, this.getValidId(e.rows[t].tab_text.textContent)), e.rows[t].tab.addEventListener("click", function(i) {
                    e.active_tab = e.rows[t].tab, e.refreshTabs(), i.preventDefault(), i.stopPropagation()
                }))
            },
            addRow: function(t, e, i) {
                var s = this.rows.length,
                    n = "object" === t.schema.type || "array" === t.schema.type;
                this.rows[s] = t, this.rows[s].rowPane = i, n ? (this.addTab(s), this.theme.addTopTab(e, this.rows[s].tab)) : void 0 === this.basicTab ? (this.addTab(s), this.basicTab = s, this.basicPane = i, this.theme.addTopTab(e, this.rows[s].tab)) : (this.rows[s].tab = this.rows[this.basicTab].tab, this.rows[s].tab_text = this.rows[this.basicTab].tab_text, this.rows[s].rowPane = this.rows[this.basicTab].rowPane)
            },
            refreshTabs: function(t) {
                var e = this,
                    i = void 0 !== e.basicTab,
                    s = !1;
                r(this.rows, function(n, r) {
                    r.tab && r.rowPane && r.rowPane.parentNode && (i && r.tab === e.rows[e.basicTab].tab && s || (t ? r.tab_text.textContent = r.getHeaderText() : (i && r.tab === e.rows[e.basicTab].tab && (s = !0), r.tab === e.active_tab ? e.theme.markTabActive(r) : e.theme.markTabInactive(r))))
                })
            },
            build: function() {
                var t = this,
                    e = "categories" === this.format;
                if (this.rows = [], this.active_tab = null, this.options.table_row) this.editor_holder = this.container, r(this.editors, function(e, i) {
                    var s = t.theme.getTableCell();
                    t.editor_holder.appendChild(s), i.setContainer(s), i.build(), i.postBuild(), i.setOptInCheckbox(i.header), t.editors[e].options.hidden && (s.style.display = "none"), t.editors[e].options.input_width && (s.style.width = t.editors[e].options.input_width)
                });
                else {
                    if (this.options.table) throw new Error("Not supported yet");
                    this.header = "", this.options.compact || (this.header = document.createElement("label"), this.header.textContent = this.getTitle()), this.title = this.theme.getHeader(this.header), this.container.appendChild(this.title), this.container.style.position = "relative", this.editjson_holder = this.theme.getModal(), this.editjson_textarea = this.theme.getTextareaInput(), this.editjson_textarea.style.height = "170px", this.editjson_textarea.style.width = "300px", this.editjson_textarea.style.display = "block", this.editjson_save = this.getButton("Save", "save", "Save"), this.editjson_save.classList.add("json-editor-btntype-save"), this.editjson_save.addEventListener("click", function(e) {
                        e.preventDefault(), e.stopPropagation(), t.saveJSON()
                    }), this.editjson_copy = this.getButton("Copy", "copy", "Copy"), this.editjson_copy.classList.add("json-editor-btntype-copy"), this.editjson_copy.addEventListener("click", function(e) {
                        e.preventDefault(), e.stopPropagation(), t.copyJSON()
                    }), this.editjson_cancel = this.getButton("Cancel", "cancel", "Cancel"), this.editjson_cancel.classList.add("json-editor-btntype-cancel"), this.editjson_cancel.addEventListener("click", function(e) {
                        e.preventDefault(), e.stopPropagation(), t.hideEditJSON()
                    }), this.editjson_holder.appendChild(this.editjson_textarea), this.editjson_holder.appendChild(this.editjson_save), this.editjson_holder.appendChild(this.editjson_copy), this.editjson_holder.appendChild(this.editjson_cancel), this.addproperty_holder = this.theme.getModal(), this.addproperty_list = document.createElement("div"), this.addproperty_list.style.width = "295px", this.addproperty_list.style.maxHeight = "160px", this.addproperty_list.style.padding = "5px 0", this.addproperty_list.style.overflowY = "auto", this.addproperty_list.style.overflowX = "hidden", this.addproperty_list.style.paddingLeft = "5px", this.addproperty_list.setAttribute("class", "property-selector"), this.addproperty_add = this.getButton("add", "add", "add"), this.addproperty_add.classList.add("json-editor-btntype-add"), this.addproperty_input = this.theme.getFormInputField("text"), this.addproperty_input.setAttribute("placeholder", "Property name..."), this.addproperty_input.style.width = "220px", this.addproperty_input.style.marginBottom = "0", this.addproperty_input.style.display = "inline-block", this.addproperty_add.addEventListener("click", function(e) {
                        if (e.preventDefault(), e.stopPropagation(), t.addproperty_input.value) {
                            if (t.editors[t.addproperty_input.value]) return void window.alert("there is already a property with that name");
                            t.addObjectProperty(t.addproperty_input.value), t.editors[t.addproperty_input.value] && t.editors[t.addproperty_input.value].disable(), t.onChange(!0)
                        }
                    }), this.addproperty_holder.appendChild(this.addproperty_list), this.addproperty_holder.appendChild(this.addproperty_input), this.addproperty_holder.appendChild(this.addproperty_add);
                    var i = document.createElement("div");
                    i.style.clear = "both", this.addproperty_holder.appendChild(i), document.addEventListener("click", this.onOutsideModalClick), this.schema.description && (this.description = this.theme.getDescription(this.schema.description), this.container.appendChild(this.description)), this.error_holder = document.createElement("div"), this.container.appendChild(this.error_holder), this.editor_holder = this.theme.getIndentedPanel(), this.container.appendChild(this.editor_holder), this.row_container = this.theme.getGridContainer(), e ? (this.tabs_holder = this.theme.getTopTabHolder(this.getValidId(this.schema.title)), this.tabPanesContainer = this.theme.getTopTabContentHolder(this.tabs_holder), this.editor_holder.appendChild(this.tabs_holder)) : (this.tabs_holder = this.theme.getTabHolder(this.getValidId(this.schema.title)), this.tabPanesContainer = this.theme.getTabContentHolder(this.tabs_holder), this.editor_holder.appendChild(this.row_container)), r(this.editors, function(i, s) {
                        var n = t.theme.getTabContent(),
                            r = t.theme.getGridColumn(),
                            o = !(!s.schema || "object" !== s.schema.type && "array" !== s.schema.type);
                        if (n.isObjOrArray = o, e) {
                            if (o) {
                                var a = t.theme.getGridContainer();
                                a.appendChild(r), n.appendChild(a), t.tabPanesContainer.appendChild(n), t.row_container = a
                            } else void 0 === t.row_container_basic && (t.row_container_basic = t.theme.getGridContainer(), n.appendChild(t.row_container_basic), 0 === t.tabPanesContainer.childElementCount ? t.tabPanesContainer.appendChild(n) : t.tabPanesContainer.insertBefore(n, t.tabPanesContainer.childNodes[1])), t.row_container_basic.appendChild(r);
                            t.addRow(s, t.tabs_holder, n), n.id = t.getValidId(s.schema.title)
                        } else t.row_container.appendChild(r);
                        s.setContainer(r), s.build(), s.postBuild(), s.setOptInCheckbox(s.header)
                    }), this.rows[0] && o(this.rows[0].tab, "click"), this.title_controls = this.theme.getHeaderButtonHolder(), this.editjson_controls = this.theme.getHeaderButtonHolder(), this.addproperty_controls = this.theme.getHeaderButtonHolder(), this.title.appendChild(this.title_controls), this.title.appendChild(this.editjson_controls), this.title.appendChild(this.addproperty_controls), this.collapsed = !1, this.toggle_button = this.getButton("", "collapse", this.translate("button_collapse")), this.toggle_button.classList.add("json-editor-btntype-toggle"), this.title_controls.appendChild(this.toggle_button), this.toggle_button.addEventListener("click", function(e) {
                        e.preventDefault(), e.stopPropagation(), t.collapsed ? (t.editor_holder.style.display = "", t.collapsed = !1, t.setButtonText(t.toggle_button, "", "collapse", t.translate("button_collapse"))) : (t.editor_holder.style.display = "none", t.collapsed = !0, t.setButtonText(t.toggle_button, "", "expand", t.translate("button_expand")))
                    }), this.options.collapsed && o(this.toggle_button, "click"), this.schema.options && void 0 !== this.schema.options.disable_collapse ? this.schema.options.disable_collapse && (this.title_controls.style.display = "none") : this.jsoneditor.options.disable_collapse && (this.title_controls.style.display = "none"), this.editjson_button = this.getButton("JSON", "edit", "Edit JSON"), this.editjson_button.classList.add("json-editor-btntype-editjson"), this.editjson_button.addEventListener("click", function(e) {
                        e.preventDefault(), e.stopPropagation(), t.toggleEditJSON()
                    }), this.editjson_controls.appendChild(this.editjson_button), this.editjson_controls.appendChild(this.editjson_holder), this.schema.options && void 0 !== this.schema.options.disable_edit_json ? this.schema.options.disable_edit_json && (this.editjson_controls.style.display = "none") : this.jsoneditor.options.disable_edit_json && (this.editjson_controls.style.display = "none"), this.addproperty_button = this.getButton("Properties", "edit", t.translate("button_object_properties")), this.addproperty_button.classList.add("json-editor-btntype-properties"), this.addproperty_button.addEventListener("click", function(e) {
                        e.preventDefault(), e.stopPropagation(), t.toggleAddProperty()
                    }), this.addproperty_controls.appendChild(this.addproperty_button), this.addproperty_controls.appendChild(this.addproperty_holder), this.refreshAddProperties(), this.deactivateNonRequiredProperties()
                }
                this.options.table_row ? (this.editor_holder = this.container, r(this.property_order, function(e, i) {
                    t.editor_holder.appendChild(t.editors[i].container)
                })) : (this.layoutEditors(), this.layoutEditors())
            },
            deactivateNonRequiredProperties: function() {
                var t = this;
                (this.jsoneditor.options.show_opt_in || this.options.show_opt_in) && r(this.editors, function(e, i) {
                    t.isRequired(i) || t.editors[e].deactivate()
                })
            },
            showEditJSON: function() {
                this.editjson_holder && (this.hideAddProperty(), this.editjson_holder.style.left = this.editjson_button.offsetLeft + "px", this.editjson_holder.style.top = this.editjson_button.offsetTop + this.editjson_button.offsetHeight + "px", this.editjson_textarea.value = JSON.stringify(this.getValue(), null, 2), this.disable(), this.editjson_holder.style.display = "", this.editjson_button.disabled = !1, this.editing_json = !0)
            },
            hideEditJSON: function() {
                this.editjson_holder && this.editing_json && (this.editjson_holder.style.display = "none", this.enable(), this.editing_json = !1)
            },
            copyJSON: function() {
                if (this.editjson_holder) {
                    var t = document.createElement("textarea");
                    t.value = this.editjson_textarea.value, t.setAttribute("readonly", ""), t.style.position = "absolute", t.style.left = "-9999px", document.body.appendChild(t), t.select(), document.execCommand("copy"), document.body.removeChild(t)
                }
            },
            saveJSON: function() {
                if (this.editjson_holder) try {
                    var t = JSON.parse(this.editjson_textarea.value);
                    this.setValue(t), this.hideEditJSON(), this.onChange(!0)
                } catch (t) {
                    throw window.alert("invalid JSON"), t
                }
            },
            toggleEditJSON: function() {
                this.editing_json ? this.hideEditJSON() : this.showEditJSON()
            },
            insertPropertyControlUsingPropertyOrder: function(t, e, i) {
                var s;
                this.schema.properties[t] && (s = this.schema.properties[t].propertyOrder), "number" != typeof s && (s = 1e3), e.propertyOrder = s;
                for (var n = 0; n < i.childNodes.length; n++) {
                    var r = i.childNodes[n];
                    if (e.propertyOrder < r.propertyOrder) {
                        this.addproperty_list.insertBefore(e, r), e = null;
                        break
                    }
                }
                e && this.addproperty_list.appendChild(e)
            },
            addPropertyCheckbox: function(t) {
                var e, i, s, n, r = this;
                return (e = r.theme.getCheckbox()).style.width = "auto", s = this.schema.properties[t] && this.schema.properties[t].title ? this.schema.properties[t].title : t, i = r.theme.getCheckboxLabel(s), (n = r.theme.getFormControl(i, e)).style.paddingBottom = n.style.marginBottom = n.style.paddingTop = n.style.marginTop = 0, n.style.height = "auto", this.insertPropertyControlUsingPropertyOrder(t, n, this.addproperty_list), e.checked = t in this.editors, e.addEventListener("change", function() {
                    e.checked ? r.addObjectProperty(t) : r.removeObjectProperty(t), r.onChange(!0)
                }), r.addproperty_checkboxes[t] = e, e
            },
            showAddProperty: function() {
                this.addproperty_holder && (this.hideEditJSON(), this.addproperty_holder.style.left = this.addproperty_button.offsetLeft + "px", this.addproperty_holder.style.top = this.addproperty_button.offsetTop + this.addproperty_button.offsetHeight + "px", this.disable(), this.adding_property = !0, this.addproperty_button.disabled = !1, this.addproperty_holder.style.display = "", this.refreshAddProperties())
            },
            hideAddProperty: function() {
                this.addproperty_holder && this.adding_property && (this.addproperty_holder.style.display = "none", this.enable(), this.adding_property = !1)
            },
            toggleAddProperty: function() {
                this.adding_property ? this.hideAddProperty() : this.showAddProperty()
            },
            removeObjectProperty: function(t) {
                this.editors[t] && (this.editors[t].unregister(), delete this.editors[t], this.refreshValue(), this.layoutEditors())
            },
            addObjectProperty: function(t, e) {
                if (!this.editors[t]) {
                    if (this.cached_editors[t]) {
                        if (this.editors[t] = this.cached_editors[t], e) return;
                        this.editors[t].register()
                    } else {
                        if (!(this.canHaveAdditionalProperties() || this.schema.properties && this.schema.properties[t])) return;
                        var i = this.getPropertySchema(t);
                        "number" != typeof i.propertyOrder && (i.propertyOrder = Object.keys(this.editors).length + 1e3);
                        var s = this.jsoneditor.getEditorClass(i);
                        if (this.editors[t] = this.jsoneditor.createEditor(s, {
                                jsoneditor: this.jsoneditor,
                                schema: i,
                                path: this.path + "." + t,
                                parent: this
                            }), this.editors[t].preBuild(), !e) {
                            var n = this.theme.getChildEditorHolder();
                            this.editor_holder.appendChild(n), this.editors[t].setContainer(n), this.editors[t].build(), this.editors[t].postBuild(), this.editors[t].setOptInCheckbox(s.header), this.editors[t].activate()
                        }
                        this.cached_editors[t] = this.editors[t]
                    }
                    e || (this.refreshValue(), this.layoutEditors())
                }
            },
            onOutsideModalClick: function(t) {
                this.addproperty_holder && !this.addproperty_holder.contains(t.target) && this.adding_property && (t.preventDefault(), t.stopPropagation(), this.toggleAddProperty())
            },
            onChildEditorChange: function(t) {
                this.refreshValue(), this._super(t)
            },
            canHaveAdditionalProperties: function() {
                return "boolean" == typeof this.schema.additionalProperties ? this.schema.additionalProperties : !this.jsoneditor.options.no_additional_properties
            },
            destroy: function() {
                r(this.cached_editors, function(t, e) {
                    e.destroy()
                }), this.editor_holder && (this.editor_holder.innerHTML = ""), this.title && this.title.parentNode && this.title.parentNode.removeChild(this.title), this.error_holder && this.error_holder.parentNode && this.error_holder.parentNode.removeChild(this.error_holder), this.editors = null, this.cached_editors = null, this.editor_holder && this.editor_holder.parentNode && this.editor_holder.parentNode.removeChild(this.editor_holder), this.editor_holder = null, document.removeEventListener("click", this.onOutsideModalClick), this._super()
            },
            getValue: function() {
                if (this.dependenciesFulfilled) {
                    var t = this._super();
                    if (this.jsoneditor.options.remove_empty_properties || this.options.remove_empty_properties)
                        for (var e in t) t.hasOwnProperty(e) && (void 0 !== t[e] && "" !== t[e] && t[e] !== Object(t[e]) || 0 !== Object.keys(t[e]).length || t[e].constructor !== Object || delete t[e]);
                    return t
                }
            },
            refreshValue: function() {
                for (var t in this.value = {}, this.editors) this.editors.hasOwnProperty(t) && this.editors[t].isActive() && (this.value[t] = this.editors[t].getValue());
                this.adding_property && this.refreshAddProperties()
            },
            refreshAddProperties: function() {
                if (this.options.disable_properties || !1 !== this.options.disable_properties && this.jsoneditor.options.disable_properties) this.addproperty_controls.style.display = "none";
                else {
                    var t, e, i = 0,
                        s = !1;
                    for (e in this.editors) this.editors.hasOwnProperty(e) && i++;
                    for (e in t = this.canHaveAdditionalProperties() && !(void 0 !== this.schema.maxProperties && i >= this.schema.maxProperties), this.addproperty_checkboxes && (this.addproperty_list.innerHTML = ""), this.addproperty_checkboxes = {}, this.cached_editors) this.cached_editors.hasOwnProperty(e) && (this.addPropertyCheckbox(e), this.isRequired(this.cached_editors[e]) && e in this.editors && (this.addproperty_checkboxes[e].disabled = !0), void 0 !== this.schema.minProperties && i <= this.schema.minProperties ? (this.addproperty_checkboxes[e].disabled = this.addproperty_checkboxes[e].checked, this.addproperty_checkboxes[e].checked || (s = !0)) : e in this.editors ? s = !0 : t || this.schema.properties.hasOwnProperty(e) ? (this.addproperty_checkboxes[e].disabled = !1, s = !0) : this.addproperty_checkboxes[e].disabled = !0);
                    for (e in this.canHaveAdditionalProperties() && (s = !0), this.schema.properties) this.schema.properties.hasOwnProperty(e) && (this.cached_editors[e] || (s = !0, this.addPropertyCheckbox(e)));
                    s ? this.canHaveAdditionalProperties() ? this.addproperty_add.disabled = !t : (this.addproperty_add.style.display = "none", this.addproperty_input.style.display = "none") : (this.hideAddProperty(), this.addproperty_controls.style.display = "none")
                }
            },
            isRequired: function(t) {
                if (t) return "boolean" == typeof t.schema.required ? t.schema.required : Array.isArray(this.schema.required) ? this.schema.required.indexOf(t.key) > -1 : !!this.jsoneditor.options.required_by_default
            },
            setValue: function(t, e) {
                var i = this;
                ("object" != typeof(t = t || {}) || Array.isArray(t)) && (t = {}), r(this.cached_editors, function(s, n) {
                    void 0 !== t[s] ? (i.addObjectProperty(s), n.setValue(t[s], e)) : e || i.isRequired(n) ? n.setValue(n.getDefault(), e) : i.removeObjectProperty(s)
                }), r(t, function(t, s) {
                    i.cached_editors[t] || (i.addObjectProperty(t), i.editors[t] && i.editors[t].setValue(s, e))
                }), this.refreshValue(), this.layoutEditors(), this.onChange()
            },
            showValidationErrors: function(t) {
                var e = this,
                    i = [],
                    s = [];
                r(t, function(t, n) {
                    n.path === e.path ? i.push(n) : s.push(n)
                }), this.error_holder && (i.length ? (this.error_holder.innerHTML = "", this.error_holder.style.display = "", r(i, function(t, i) {
                    i.errorcount && i.errorcount > 1 && (i.message += " (" + i.errorcount + " errors)"), e.error_holder.appendChild(e.theme.getErrorMessage(i.message))
                })) : this.error_holder.style.display = "none"), this.options.table_row && (i.length ? this.theme.addTableRowError(this.container) : this.theme.removeTableRowError(this.container)), r(this.editors, function(t, e) {
                    e.showValidationErrors(s)
                })
            }
        }),
        st = q.extend({
            preBuild: function() {
                this.schema.required = !0, this._super()
            },
            build: function() {
                var t = this;
                this.label = "", this.options.compact || (this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())), this.schema.description && (this.description = this.theme.getFormInputDescription(this.schema.description)), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.options.infoText)), this.options.compact && this.container.classList.add("compact"), this.radioContainer = document.createElement("div"), this.radioGroup = [];
                for (var e = function(e) {
                        t.setValue(this.value), t.onChange(!0)
                    }, i = 0; i < this.enum_values.length; i++) {
                    this.input = this.theme.getFormRadio({
                        name: this.formname,
                        id: this.formname + "[" + i + "]",
                        value: this.enum_values[i]
                    }), this.setInputAttributes(["id", "value", "name"]), this.input.addEventListener("change", e, !1), this.radioGroup.push(this.input);
                    var s = this.theme.getFormRadioLabel(this.enum_display[i]);
                    s.htmlFor = this.input.id;
                    var n = this.theme.getFormRadioControl(s, this.input, !("horizontal" !== this.options.layout && !this.options.compact));
                    this.radioContainer.appendChild(n)
                }
                if (this.schema.readOnly || this.schema.readonly) {
                    this.always_disabled = !0;
                    for (var r = 0; r < this.radioGroup.length; r++) this.radioGroup[r].disabled = !0;
                    this.radioContainer.classList.add("readonly")
                }
                var o = this.theme.getContainer();
                o.appendChild(this.radioContainer), o.dataset.containerFor = "radio", this.input = o, this.control = this.theme.getFormControl(this.label, o, this.description, this.infoButton), this.container.appendChild(this.control), window.requestAnimationFrame(function() {
                    t.input.parentNode && t.afterInputReady()
                })
            },
            enable: function() {
                if (!this.always_disabled) {
                    for (var t = 0; t < this.radioGroup.length; t++) this.radioGroup[t].disabled = !1;
                    this.radioContainer.classList.remove("readonly"), this._super()
                }
            },
            disable: function(t) {
                t && (this.always_disabled = !0);
                for (var e = 0; e < this.radioGroup.length; e++) this.radioGroup[e].disabled = !0;
                this.radioContainer.classList.add("readonly"), this._super()
            },
            destroy: function() {
                this.radioContainer.parentNode && this.radioContainer.parentNode.parentNode && this.radioContainer.parentNode.parentNode.removeChild(this.radioContainer.parentNode), this.label && this.label.parentNode && this.label.parentNode.removeChild(this.label), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), this._super()
            },
            getNumColumns: function() {
                return 2
            },
            setValue: function(t) {
                for (var e = 0; e < this.radioGroup.length; e++)
                    if (this.radioGroup[e].value === t) {
                        this.radioGroup[e].checked = !0, this.value = t, this.onChange();
                        break
                    }
            }
        }),
        nt = P.extend({
            setValue: function(t, e, i) {
                var s = this._super(t, e, i);
                void 0 !== s && s.changed && this.sceditor_instance && this.sceditor_instance.val(s.value)
            },
            build: function() {
                this.options.format = "textarea", this._super(), this.input_type = this.schema.format, this.input.setAttribute("data-schemaformat", this.input_type)
            },
            afterInputReady: function() {
                var t, e = this;
                window.jQuery && window.jQuery.fn && window.jQuery.fn.sceditor ? (t = this.expandCallbacks("sceditor", n({}, {
                    plugins: e.input_type,
                    emoticonsEnabled: !1,
                    width: "100%",
                    height: 300
                }, this.defaults.options.sceditor || {}, this.options.sceditor || {}, {
                    element: this.input
                })), window.jQuery(e.input).sceditor(t), this.sceditor_instance = window.jQuery(e.input).sceditor("instance"), (this.schema.readOnly || this.schema.readonly || this.schema.template) && this.sceditor_instance.readOnly(!0), e.sceditor_instance.blur(function() {
                    var t = window.jQuery("<div>" + e.sceditor_instance.val() + "</div>");
                    window.jQuery("#sceditor-start-marker,#sceditor-end-marker,.sceditor-nlf", t).remove(), e.input.value = t.html(), e.value = e.input.value, e.is_dirty = !0, e.onChange(!0)
                }), this.theme.afterInputReady(e.input)) : this._super()
            },
            getNumColumns: function() {
                return 6
            },
            enable: function() {
                !this.always_disabled && this.sceditor_instance && this.sceditor_instance.readOnly(!1), this._super()
            },
            disable: function(t) {
                this.sceditor_instance && this.sceditor_instance.readOnly(!0), this._super(t)
            },
            destroy: function() {
                this.sceditor_instance && (this.sceditor_instance.destroy(), this.sceditor_instance = null), this._super()
            }
        }),
        rt = q.extend({
            setValue: function(t, e) {
                if (this.select2_instance) {
                    e ? this.is_dirty = !1 : "change" === this.jsoneditor.options.show_errors && (this.is_dirty = !0);
                    var i = this.updateValue(t);
                    this.input.value = i, this.select2v4 ? this.select2_instance.val(i).trigger("change") : this.select2_instance.select2("val", i), this.onChange(!0)
                } else this._super(t, e)
            },
            afterInputReady: function() {
                if (window.jQuery && window.jQuery.fn && window.jQuery.fn.select2 && !this.select2_instance) {
                    var t = this,
                        e = this.expandCallbacks("select2", n({}, this.defaults.options.select2 || {}, this.options.select2 || {}));
                    this.newEnumAllowed = e.tags = !!e.tags && "string" === this.schema.type, this.select2_instance = window.jQuery(this.input).select2(e), this.select2v4 = this.select2_instance.select2.hasOwnProperty("amd"), this.selectChangeHandler = function() {
                        var e = t.select2v4 ? t.select2_instance.val() : t.select2_instance.select2("val");
                        t.updateValue(e), t.onChange(!0)
                    }, this.select2_instance.on("change", this.selectChangeHandler), this.select2_instance.on("select2-blur", this.selectChangeHandler)
                }
                this._super()
            },
            updateValue: function(t) {
                var e = this.enum_values[0];
                return t = this.typecast(t || ""), -1 === this.enum_values.indexOf(t) ? this.newEnumAllowed && (e = this.addNewOption(t) ? t : e) : e = t, this.value = e, e
            },
            addNewOption: function(t) {
                var e, i = this.typecast(t),
                    s = !1;
                return this.enum_values.indexOf(i) < 0 && "" !== i && (this.enum_options.push("" + i), this.enum_display.push("" + i), this.enum_values.push(i), this.schema.enum.push(i), (e = this.input.querySelector('option[value="' + i + '"]')) ? e.removeAttribute("data-select2-tag") : this.input.appendChild(new Option(i, i, !1, !1)).trigger("change"), s = !0), s
            },
            enable: function() {
                this.always_disabled || this.select2_instance && (this.select2v4 ? this.select2_instance.prop("disabled", !1) : this.select2_instance.select2("enable", !0)), this._super()
            },
            disable: function(t) {
                this.select2_instance && (this.select2v4 ? this.select2_instance.prop("disabled", !0) : this.select2_instance.select2("enable", !1)), this._super(t)
            },
            destroy: function() {
                this.select2_instance && (this.select2_instance.select2("destroy"), this.select2_instance = null), this._super()
            }
        }),
        ot = q.extend({
            setValue: function(t, e) {
                if (this.selectize_instance) {
                    e ? this.is_dirty = !1 : "change" === this.jsoneditor.options.show_errors && (this.is_dirty = !0);
                    var i = this.updateValue(t);
                    this.input.value = i, this.selectize_instance.clear(!0), this.selectize_instance.setValue(i), this.onChange(!0)
                } else this._super(t, e)
            },
            afterInputReady: function() {
                if (window.jQuery && window.jQuery.fn && window.jQuery.fn.selectize && !this.selectize_instance) {
                    var t = this,
                        e = this.expandCallbacks("selectize", n({}, this.defaults.options.selectize || {}, this.options.selectize || {}));
                    this.newEnumAllowed = e.create = !!e.create && "string" === this.schema.type, this.selectize_instance = window.jQuery(this.input).selectize(e)[0].selectize, this.control.removeEventListener("change", this.multiselectChangeHandler), this.multiselectChangeHandler = function(e) {
                        t.updateValue(e), t.onChange(!0)
                    }, this.selectize_instance.on("change", this.multiselectChangeHandler)
                }
                this._super()
            },
            updateValue: function(t) {
                var e = this.enum_values[0];
                return t = this.typecast(t || ""), -1 === this.enum_values.indexOf(t) ? this.newEnumAllowed && (e = this.addNewOption(t) ? t : e) : e = t, this.value = e, e
            },
            addNewOption: function(t) {
                var e = this.typecast(t),
                    i = !1;
                return this.enum_values.indexOf(e) < 0 && "" !== e && (this.enum_options.push("" + e), this.enum_display.push("" + e), this.enum_values.push(e), this.schema.enum.push(e), this.selectize_instance.addItem(e), this.selectize_instance.refreshOptions(!1), i = !0), i
            },
            onWatchedFieldChange: function() {
                if (this._super(), this.selectize_instance) {
                    var t = this;
                    this.selectize_instance.clear(!0), this.selectize_instance.clearOptions(!0), this.enum_options.forEach(function(e, i) {
                        t.selectize_instance.addOption({
                            value: e,
                            text: t.enum_display[i]
                        })
                    }), this.selectize_instance.addItem(this.value + "", !0)
                }
            },
            enable: function() {
                !this.always_disabled && this.selectize_instance && this.selectize_instance.unlock(), this._super()
            },
            disable: function(t) {
                this.selectize_instance && this.selectize_instance.lock(), this._super(t)
            },
            destroy: function() {
                this.selectize_instance && (this.selectize_instance.destroy(), this.selectize_instance = null), this._super()
            }
        }),
        at = P.extend({
            build: function() {
                var t = this;
                this.options.compact || (this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())), this.schema.description && (this.description = this.theme.getFormInputDescription(this.schema.description));
                var e = this.formname.replace(/\W/g, "");
                if ("function" == typeof SignaturePad) {
                    this.input = this.theme.getFormInputField("hidden"), this.container.appendChild(this.input);
                    var i = document.createElement("div");
                    i.classList.add("signature-container");
                    var s = document.createElement("canvas");
                    s.setAttribute("name", e), s.classList.add("signature"), i.appendChild(s), t.signaturePad = new window.SignaturePad(s, {
                        onEnd: function() {
                            t.signaturePad.isEmpty() ? t.input.value = "" : t.input.value = t.signaturePad.toDataURL(), t.is_dirty = !0, t.refreshValue(), t.watch_listener(), t.jsoneditor.notifyWatchers(t.path), t.parent ? t.parent.onChildEditorChange(t) : t.jsoneditor.onChange()
                        }
                    });
                    var n = document.createElement("div"),
                        o = document.createElement("button");
                    o.classList.add("tiny", "button"), o.innerHTML = "Clear signature", n.appendChild(o), i.appendChild(n), this.options.compact && this.container.setAttribute("class", this.container.getAttribute("class") + " compact"), (this.schema.readOnly || this.schema.readonly) && (this.always_disabled = !0, r(this.inputs, function(t, e) {
                        s.setAttribute("readOnly", "readOnly"), e.disabled = !0
                    })), o.addEventListener("click", function(e) {
                        e.preventDefault(), e.stopPropagation(), t.signaturePad.clear(), t.signaturePad.strokeEnd()
                    }), this.control = this.theme.getFormControl(this.label, i, this.description), this.container.appendChild(this.control), this.refreshValue(), s.width = i.offsetWidth, t.options && t.options.canvas_height ? s.height = t.options.canvas_height : s.height = "300"
                } else {
                    var a = document.createElement("p");
                    a.innerHTML = "Signature pad is not available, please include SignaturePad from https://github.com/szimek/signature_pad", this.container.appendChild(a)
                }
            },
            setValue: function(t) {
                if ("function" == typeof SignaturePad) {
                    var e = this.sanitize(t);
                    if (this.value === e) return;
                    return this.value = e, this.input.value = this.value, this.signaturePad.clear(), t && "" !== t && this.signaturePad.fromDataURL(t), this.watch_listener(), this.jsoneditor.notifyWatchers(this.path), !1
                }
            },
            destroy: function() {
                this.signaturePad.off(), delete this.signaturePad
            }
        }),
        lt = P.extend({
            setValue: function(t, e, i) {
                var s = this._super(t, e, i);
                void 0 !== s && s.changed && this.simplemde_instance && this.simplemde_instance.value(s.value)
            },
            build: function() {
                this.options.format = "textarea", this._super(), this.input_type = this.schema.format, this.input.setAttribute("data-schemaformat", this.input_type)
            },
            afterInputReady: function() {
                var t, e = this;
                window.SimpleMDE ? (t = this.expandCallbacks("simplemde", n({}, {
                    height: 300
                }, this.defaults.options.simplemde || {}, this.options.simplemde || {}, {
                    element: this.input
                })), this.simplemde_instance = new window.SimpleMDE(t), (this.schema.readOnly || this.schema.readonly || this.schema.template) && (this.simplemde_instance.codemirror.options.readOnly = !0), this.simplemde_instance.codemirror.on("change", function() {
                    e.value = e.simplemde_instance.value(), e.is_dirty = !0, e.onChange(!0)
                }), this.theme.afterInputReady(e.input)) : this._super()
            },
            getNumColumns: function() {
                return 6
            },
            enable: function() {
                !this.always_disabled && this.simplemde_instance && (this.simplemde_instance.codemirror.options.readOnly = !1), this._super()
            },
            disable: function(t) {
                this.simplemde_instance && (this.simplemde_instance.codemirror.options.readOnly = !0), this._super(t)
            },
            destroy: function() {
                this.simplemde_instance && (this.simplemde_instance.toTextArea(), this.simplemde_instance = null), this._super()
            }
        }),
        dt = P.extend({
            build: function() {
                var t = this;
                if (this.options.compact || (this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired())), this.schema.description && (this.description = this.theme.getFormInputDescription(this.schema.description)), this.options.infoText && (this.infoButton = this.theme.getInfoButton(this.options.infoText)), this.options.compact && this.container.classList.add("compact"), this.ratingContainer = document.createElement("div"), this.ratingContainer.classList.add("starrating"), void 0 === this.schema.enum) {
                    var e = this.schema.maximum ? this.schema.maximum : 5;
                    this.schema.exclusiveMaximum && e--, this.enum_values = [];
                    for (var i = 0; i < e; i++) this.enum_values.push(i + 1)
                } else this.enum_values = this.schema.enum;
                this.radioGroup = [];
                for (var s = function(e) {
                        e.preventDefault(), e.stopPropagation(), t.setValue(this.value), t.onChange(!0)
                    }, n = this.enum_values.length - 1; n > -1; n--) {
                    var r = this.formname + (n + 1),
                        o = this.theme.getFormInputField("radio");
                    o.name = this.formname + "[starrating]", o.value = this.enum_values[n], o.id = r, o.addEventListener("change", s, !1), this.radioGroup.push(o);
                    var a = document.createElement("label");
                    a.htmlFor = r, a.title = this.enum_values[n], this.options.displayValue && a.classList.add("starrating-display-enabled"), this.ratingContainer.appendChild(o), this.ratingContainer.appendChild(a)
                }
                if (this.options.displayValue && (this.displayRating = document.createElement("div"), this.displayRating.classList.add("starrating-display"), this.displayRating.innerText = this.enum_values[0], this.ratingContainer.appendChild(this.displayRating)), this.schema.readOnly || this.schema.readonly) {
                    this.always_disabled = !0;
                    for (var l = 0; l < this.radioGroup.length; l++) this.radioGroup[l].disabled = !0;
                    this.ratingContainer.classList.add("readonly")
                }
                var d = this.theme.getContainer();
                d.appendChild(this.ratingContainer), this.input = d, this.control = this.theme.getFormControl(this.label, d, this.description, this.infoButton), this.container.appendChild(this.control), this.refreshValue()
            },
            enable: function() {
                if (!this.always_disabled) {
                    for (var t = 0; t < this.radioGroup.length; t++) this.radioGroup[t].disabled = !1;
                    this.ratingContainer.classList.remove("readonly"), this._super()
                }
            },
            disable: function(t) {
                t && (this.always_disabled = !0);
                for (var e = 0; e < this.radioGroup.length; e++) this.radioGroup[e].disabled = !0;
                this.ratingContainer.classList.add("readonly"), this._super()
            },
            destroy: function() {
                this.ratingContainer.parentNode && this.ratingContainer.parentNode.parentNode && this.ratingContainer.parentNode.parentNode.removeChild(this.ratingContainer.parentNode), this.label && this.label.parentNode && this.label.parentNode.removeChild(this.label), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), this._super()
            },
            getNumColumns: function() {
                return 2
            },
            getValue: function() {
                if (this.dependenciesFulfilled) return "integer" === this.schema.type ? "" === this.value ? void 0 : 1 * this.value : this.value
            },
            setValue: function(t) {
                for (var e = 0; e < this.radioGroup.length; e++)
                    if (this.radioGroup[e].value == t) {
                        this.radioGroup[e].checked = !0, this.value = t, this.options.displayValue && (this.displayRating.innerHTML = this.value), this.onChange(!0);
                        break
                    }
            }
        }),
        ht = B.extend({
            register: function() {
                if (this._super(), this.rows)
                    for (var t = 0; t < this.rows.length; t++) this.rows[t].register()
            },
            unregister: function() {
                if (this._super(), this.rows)
                    for (var t = 0; t < this.rows.length; t++) this.rows[t].unregister()
            },
            getNumColumns: function() {
                return Math.max(Math.min(12, this.width), 3)
            },
            preBuild: function() {
                var t = this.jsoneditor.expandRefs(this.schema.items || {});
                this.item_title = t.title || "row", this.item_default = t.default || null, this.item_has_child_editors = t.properties || t.items, this.width = 12, this._super()
            },
            build: function() {
                this.table = this.theme.getTable(), this.container.appendChild(this.table), this.thead = this.theme.getTableHead(), this.table.appendChild(this.thead), this.header_row = this.theme.getTableRow(), this.thead.appendChild(this.header_row), this.row_holder = this.theme.getTableBody(), this.table.appendChild(this.row_holder);
                var t = this.getElementEditor(0, !0);
                if (this.item_default = t.getDefault(), this.width = t.getNumColumns() + 2, this.options.compact ? (this.panel = document.createElement("div"), this.container.appendChild(this.panel)) : (this.header = document.createElement("label"), this.header.textContent = this.getTitle(), this.title = this.theme.getHeader(this.header), this.container.appendChild(this.title), this.title_controls = this.theme.getHeaderButtonHolder(), this.title.appendChild(this.title_controls), this.schema.description && (this.description = this.theme.getDescription(this.schema.description), this.container.appendChild(this.description)), this.panel = this.theme.getIndentedPanel(), this.container.appendChild(this.panel), this.error_holder = document.createElement("div"), this.panel.appendChild(this.error_holder)), this.panel.appendChild(this.table), this.controls = this.theme.getButtonHolder(), this.panel.appendChild(this.controls), this.item_has_child_editors)
                    for (var e = t.getChildEditors(), i = t.property_order || Object.keys(e), s = 0; s < i.length; s++) {
                        var n = this.theme.getTableHeaderCell(e[i[s]].getTitle());
                        e[i[s]].options.hidden && (n.style.display = "none"), this.header_row.appendChild(n)
                    } else this.header_row.appendChild(this.theme.getTableHeaderCell(this.item_title));
                t.destroy(), this.row_holder.innerHTML = "", this.controls_header_cell = this.theme.getTableHeaderCell(" "), this.header_row.appendChild(this.controls_header_cell), this.addControls()
            },
            onChildEditorChange: function(t) {
                this.refreshValue(), this._super()
            },
            getItemDefault: function() {
                return n({}, {
                    default: this.item_default
                }).default
            },
            getItemTitle: function() {
                return this.item_title
            },
            getElementEditor: function(t, e) {
                var i = n({}, this.schema.items),
                    s = this.jsoneditor.getEditorClass(i, this.jsoneditor),
                    r = this.row_holder.appendChild(this.theme.getTableRow()),
                    o = r;
                this.item_has_child_editors || (o = this.theme.getTableCell(), r.appendChild(o));
                var a = this.jsoneditor.createEditor(s, {
                    jsoneditor: this.jsoneditor,
                    schema: i,
                    container: o,
                    path: this.path + "." + t,
                    parent: this,
                    compact: !0,
                    table_row: !0
                });
                return a.preBuild(), e || (a.build(), a.postBuild(), a.controls_cell = r.appendChild(this.theme.getTableCell()), a.row = r, a.table_controls = this.theme.getButtonHolder(), a.controls_cell.appendChild(a.table_controls), a.table_controls.style.margin = 0, a.table_controls.style.padding = 0), a
            },
            destroy: function() {
                this.innerHTML = "", this.title && this.title.parentNode && this.title.parentNode.removeChild(this.title), this.description && this.description.parentNode && this.description.parentNode.removeChild(this.description), this.row_holder && this.row_holder.parentNode && this.row_holder.parentNode.removeChild(this.row_holder), this.table && this.table.parentNode && this.table.parentNode.removeChild(this.table), this.panel && this.panel.parentNode && this.panel.parentNode.removeChild(this.panel), this.rows = this.title = this.description = this.row_holder = this.table = this.panel = null, this._super()
            },
            setValue: function(t, e) {
                if (t = t || [], this.schema.minItems)
                    for (; t.length < this.schema.minItems;) t.push(this.getItemDefault());
                if (this.schema.maxItems && t.length > this.schema.maxItems && (t = t.slice(0, this.schema.maxItems)), JSON.stringify(t) !== this.serialized) {
                    var i = !1,
                        s = this;
                    r(t, function(t, e) {
                        s.rows[t] ? s.rows[t].setValue(e) : (s.addRow(e), i = !0)
                    });
                    for (var n = t.length; n < s.rows.length; n++) {
                        var o = s.rows[n].container;
                        s.item_has_child_editors || s.rows[n].row.parentNode.removeChild(s.rows[n].row), s.rows[n].destroy(), o.parentNode && o.parentNode.removeChild(o), s.rows[n] = null, i = !0
                    }
                    s.rows = s.rows.slice(0, t.length), s.refreshValue(), (i || e) && s.refreshRowButtons(), s.onChange()
                }
            },
            refreshRowButtons: function() {
                var t = this,
                    e = this.schema.minItems && this.schema.minItems >= this.rows.length,
                    i = !1;
                r(this.rows, function(s, n) {
                    n.movedown_button && (s === t.rows.length - 1 ? n.movedown_button.style.display = "none" : (i = !0, n.movedown_button.style.display = "")), n.delete_button && (e ? n.delete_button.style.display = "none" : (i = !0, n.delete_button.style.display = "")), n.moveup_button && (i = !0)
                }), r(this.rows, function(t, e) {
                    e.controls_cell.style.display = i ? "" : "none"
                }), this.controls_header_cell.style.display = i ? "" : "none";
                var s = !1;
                this.value.length ? 1 === this.value.length ? (this.table.style.display = "", this.remove_all_rows_button.style.display = "none", e || this.hide_delete_last_row_buttons ? this.delete_last_row_button.style.display = "none" : (this.delete_last_row_button.style.display = "", s = !0)) : (this.table.style.display = "", e || this.hide_delete_last_row_buttons ? this.delete_last_row_button.style.display = "none" : (this.delete_last_row_button.style.display = "", s = !0), e || this.hide_delete_all_rows_buttons ? this.remove_all_rows_button.style.display = "none" : (this.remove_all_rows_button.style.display = "", s = !0)) : (this.delete_last_row_button.style.display = "none", this.remove_all_rows_button.style.display = "none", this.table.style.display = "none"), this.schema.maxItems && this.schema.maxItems <= this.rows.length || this.hide_add_button ? this.add_row_button.style.display = "none" : (this.add_row_button.style.display = "", s = !0), this.controls.style.display = s ? "" : "none"
            },
            refreshValue: function() {
                var t = this;
                this.value = [], r(this.rows, function(e, i) {
                    t.value[e] = i.getValue()
                }), this.serialized = JSON.stringify(this.value)
            },
            addRow: function(t) {
                var e = this,
                    i = this.rows.length;
                e.rows[i] = this.getElementEditor(i);
                var s = e.rows[i].table_controls;
                this.hide_delete_buttons || (e.rows[i].delete_button = this.getButton("", "delete", this.translate("button_delete_row_title_short")), e.rows[i].delete_button.classList.add("delete", "json-editor-btntype-delete"), e.rows[i].delete_button.setAttribute("data-i", i), e.rows[i].delete_button.addEventListener("click", function(t) {
                    if (t.preventDefault(), t.stopPropagation(), !e.askConfirmation()) return !1;
                    var i = 1 * this.getAttribute("data-i"),
                        s = e.getValue(),
                        n = [];
                    r(s, function(t, e) {
                        t !== i && n.push(e)
                    }), e.setValue(n), e.onChange(!0), e.jsoneditor.trigger("deleteRow", e.rows[i])
                }), s.appendChild(e.rows[i].delete_button)), i && !this.hide_move_buttons && (e.rows[i].moveup_button = this.getButton("", "moveup", this.translate("button_move_up_title")), e.rows[i].moveup_button.classList.add("moveup", "json-editor-btntype-move"), e.rows[i].moveup_button.setAttribute("data-i", i), e.rows[i].moveup_button.addEventListener("click", function(t) {
                    t.preventDefault(), t.stopPropagation();
                    var i = 1 * this.getAttribute("data-i");
                    if (!(i <= 0)) {
                        var s = e.getValue(),
                            n = s[i - 1];
                        s[i - 1] = s[i], s[i] = n, e.setValue(s), e.onChange(!0), e.jsoneditor.trigger("moveRow", e.rows[i - 1])
                    }
                }), s.appendChild(e.rows[i].moveup_button)), this.hide_move_buttons || (e.rows[i].movedown_button = this.getButton("", "movedown", this.translate("button_move_down_title")), e.rows[i].movedown_button.classList.add("movedown", "json-editor-btntype-move"), e.rows[i].movedown_button.setAttribute("data-i", i), e.rows[i].movedown_button.addEventListener("click", function(t) {
                    t.preventDefault(), t.stopPropagation();
                    var i = 1 * this.getAttribute("data-i"),
                        s = e.getValue();
                    if (!(i >= s.length - 1)) {
                        var n = s[i + 1];
                        s[i + 1] = s[i], s[i] = n, e.setValue(s), e.onChange(!0), e.jsoneditor.trigger("moveRow", e.rows[i + 1])
                    }
                }), s.appendChild(e.rows[i].movedown_button)), t && e.rows[i].setValue(t)
            },
            addControls: function() {
                var t = this;
                this.collapsed = !1, this.toggle_button = this.getButton("", "collapse", this.translate("button_collapse")), this.toggle_button.classList.add("json-editor-btntype-toggle"), this.title_controls && (this.title_controls.appendChild(this.toggle_button), this.toggle_button.addEventListener("click", function(e) {
                    e.preventDefault(), e.stopPropagation(), t.collapsed ? (t.collapsed = !1, t.panel.style.display = "", t.setButtonText(this, "", "collapse", t.translate("button_collapse"))) : (t.collapsed = !0, t.panel.style.display = "none", t.setButtonText(this, "", "expand", t.translate("button_expand")))
                }), this.options.collapsed && o(this.toggle_button, "click"), this.schema.options && void 0 !== this.schema.options.disable_collapse ? this.schema.options.disable_collapse && (this.toggle_button.style.display = "none") : this.jsoneditor.options.disable_collapse && (this.toggle_button.style.display = "none")), this.add_row_button = this.getButton(this.getItemTitle(), "add", this.translate("button_add_row_title", [this.getItemTitle()])), this.add_row_button.classList.add("json-editor-btntype-add"), this.add_row_button.addEventListener("click", function(e) {
                    e.preventDefault(), e.stopPropagation();
                    var i = t.addRow();
                    t.refreshValue(), t.refreshRowButtons(), t.onChange(!0), t.jsoneditor.trigger("addRow", i)
                }), t.controls.appendChild(this.add_row_button), this.delete_last_row_button = this.getButton(this.translate("button_delete_last", [this.getItemTitle()]), "delete", this.translate("button_delete_last_title", [this.getItemTitle()])), this.delete_last_row_button.classList.add("json-editor-btntype-deletelast"), this.delete_last_row_button.addEventListener("click", function(e) {
                    if (e.preventDefault(), e.stopPropagation(), !t.askConfirmation()) return !1;
                    var i = t.getValue(),
                        s = i.pop();
                    t.setValue(i), t.onChange(!0), t.jsoneditor.trigger("deleteRow", s)
                }), t.controls.appendChild(this.delete_last_row_button), this.remove_all_rows_button = this.getButton(this.translate("button_delete_all"), "delete", this.translate("button_delete_all_title")), this.remove_all_rows_button.classList.add("json-editor-btntype-deleteall"), this.remove_all_rows_button.addEventListener("click", function(e) {
                    if (e.preventDefault(), e.stopPropagation(), !t.askConfirmation()) return !1;
                    t.setValue([]), t.onChange(!0), t.jsoneditor.trigger("deleteAllRows")
                }), t.controls.appendChild(this.remove_all_rows_button)
            }
        }),
        ct = O.extend({
            getNumColumns: function() {
                return 4
            },
            build: function() {
                var t = this;
                if (this.title = this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired()), this.input = this.theme.getFormInputField("hidden"), this.container.appendChild(this.input), !this.schema.readOnly && !this.schema.readonly) {
                    if (!this.jsoneditor.options.upload) throw new Error("Upload handler required for upload editor");
                    this.uploader = this.theme.getFormInputField("file"), this.uploader.addEventListener("change", function(e) {
                        if (e.preventDefault(), e.stopPropagation(), this.files && this.files.length) {
                            var i = new FileReader;
                            i.onload = function(e) {
                                t.preview_value = e.target.result, t.refreshPreview(), t.onChange(!0), i = null
                            }, i.readAsDataURL(this.files[0])
                        }
                    })
                }
                var e = this.schema.description;
                e || (e = ""), this.preview = this.theme.getFormInputDescription(e), this.container.appendChild(this.preview), this.control = this.theme.getFormControl(this.label, this.uploader || this.input, this.preview), this.container.appendChild(this.control), window.requestAnimationFrame(function() {
                    if (t.value) {
                        var e = document.createElement("img");
                        e.style.maxWidth = "100%", e.style.maxHeight = "100px", e.onload = function(i) {
                            t.preview.appendChild(e)
                        }, e.onerror = function(t) {
                            console.error("upload error", t)
                        }, e.src = t.container.querySelector("a").href
                    }
                })
            },
            refreshPreview: function() {
                if (this.last_preview !== this.preview_value && (this.last_preview = this.preview_value, this.preview.innerHTML = "", this.preview_value)) {
                    var t = this,
                        e = this.preview_value.match(/^data:([^;,]+)[;,]/);
                    e && (e = e[1]), e || (e = "unknown");
                    var i = this.uploader.files[0];
                    if (this.preview.innerHTML = "<strong>Type:</strong> " + e + ", <strong>Size:</strong> " + i.size + " bytes", "image" === e.substr(0, 5)) {
                        this.preview.innerHTML += "<br>";
                        var s = document.createElement("img");
                        s.style.maxWidth = "100%", s.style.maxHeight = "100px", s.src = this.preview_value, this.preview.appendChild(s)
                    }
                    this.preview.innerHTML += "<br>";
                    var n = this.getButton("Upload", "upload", "Upload");
                    this.preview.appendChild(n), n.addEventListener("click", function(e) {
                        e.preventDefault(), n.setAttribute("disabled", "disabled"), t.theme.removeInputError(t.uploader), t.theme.getProgressBar && (t.progressBar = t.theme.getProgressBar(), t.preview.appendChild(t.progressBar)), t.jsoneditor.options.upload(t.path, i, {
                            success: function(e) {
                                t.setValue(e), t.parent ? t.parent.onChildEditorChange(t) : t.jsoneditor.onChange(), t.progressBar && t.preview.removeChild(t.progressBar), n.removeAttribute("disabled")
                            },
                            failure: function(e) {
                                t.theme.addInputError(t.uploader, e), t.progressBar && t.preview.removeChild(t.progressBar), n.removeAttribute("disabled")
                            },
                            updateProgress: function(e) {
                                t.progressBar && (e ? t.theme.updateProgressBar(t.progressBar, e) : t.theme.updateProgressBarUnknown(t.progressBar))
                            }
                        })
                    }), (this.jsoneditor.options.auto_upload || this.schema.options.auto_upload) && (n.dispatchEvent(new MouseEvent("click")), this.preview.removeChild(n))
                }
            },
            enable: function() {
                this.always_disabled || (this.uploader && (this.uploader.disabled = !1), this._super())
            },
            disable: function(t) {
                t && (this.always_disabled = !0), this.uploader && (this.uploader.disabled = !0), this._super()
            },
            setValue: function(t) {
                this.value !== t && (this.value = t, this.input.value = this.value, this.onChange())
            },
            destroy: function() {
                this.preview && this.preview.parentNode && this.preview.parentNode.removeChild(this.preview), this.title && this.title.parentNode && this.title.parentNode.removeChild(this.title), this.input && this.input.parentNode && this.input.parentNode.removeChild(this.input), this.uploader && this.uploader.parentNode && this.uploader.parentNode.removeChild(this.uploader), this._super()
            }
        }),
        ut = O.extend({
            preBuild: function() {
                this._super(), this.schema.default = this.uuid = this.getUuid(), this.jsoneditor.validator.schema.properties[this.key].pattern = this.schema.pattern = "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$", this.schema.options || (this.schema.options = {}), this.schema.options.cleave || (this.schema.options.cleave = {
                    delimiters: ["-"],
                    blocks: [8, 4, 4, 4, 12]
                })
            },
            sanitize: function(t) {
                return this.testUuid(t) || (t = this.uuid), t
            },
            setValue: function(t, e, i) {
                this.testUuid(t) || (t = this.uuid), this.uuid = t, this._super(t, e, i)
            },
            getUuid: function() {
                var t = (new Date).getTime();
                return "undefined" != typeof performance && "function" == typeof performance.now && (t += performance.now()), "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
                    var i = (t + 16 * Math.random()) % 16 | 0;
                    return t = Math.floor(t / 16), ("x" === e ? i : 3 & i | 8).toString(16)
                })
            },
            testUuid: function(t) {
                return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(t)
            }
        }),
        pt = function() {
            return {
                compile: function(t) {
                    var e = t.match(/{{\s*([a-zA-Z0-9\-_ .]+)\s*}}/g),
                        i = e && e.length;
                    if (!i) return function() {
                        return t
                    };
                    for (var s = [], n = function(t) {
                            var i, n, r = e[t].replace(/[{}]+/g, "").trim().split("."),
                                o = r.length;
                            o > 1 ? i = function(e) {
                                for (n = e, t = 0; t < o && (n = n[r[t]]); t++);
                                return n
                            } : (r = r[0], i = function(t) {
                                return t[r]
                            });
                            s.push({
                                s: e[t],
                                r: i
                            })
                        }, r = 0; r < i; r++) n(r);
                    return function(e) {
                        var n, o = t + "";
                        for (r = 0; r < i; r++) n = s[r], o = o.replace(n.s, n.r(e));
                        return o
                    }
                }
            }
        },
        mt = function() {
            return !!window.EJS && {
                compile: function(t) {
                    var e = new window.EJS({
                        text: t
                    });
                    return function(t) {
                        return e.render(t)
                    }
                }
            }
        },
        ft = function() {
            return window.Handlebars
        },
        gt = function() {
            return !!window.Hogan && {
                compile: function(t) {
                    var e = window.Hogan.compile(t);
                    return function(t) {
                        return e.render(t)
                    }
                }
            }
        },
        bt = function() {
            return !!window._ && {
                compile: function(t) {
                    return function(e) {
                        return window._.template(t)(e)
                    }
                }
            }
        },
        vt = function() {
            return !(!window.Mark || !window.Mark.up) && {
                compile: function(t) {
                    return function(e) {
                        return window.Mark.up(t, e)
                    }
                }
            }
        },
        _t = function() {
            return !!window.Mustache && {
                compile: function(t) {
                    return function(e) {
                        return window.Mustache.render(t, e)
                    }
                }
            }
        },
        yt = function() {
            return window.swig
        },
        wt = function() {
            return !!window._ && {
                compile: function(t) {
                    return function(e) {
                        return window._.template(t)(e)
                    }
                }
            }
        },
        xt = d.extend({
            mapping: {
                collapse: "",
                expand: "",
                delete: "",
                edit: "",
                add: "",
                cancel: "",
                save: "",
                moveup: "",
                movedown: ""
            },
            icon_prefix: "",
            getIconClass: function(t) {
                return this.mapping[t] ? this.icon_prefix + this.mapping[t] : null
            },
            getIcon: function(t) {
                var e = this.getIconClass(t);
                if (!e) return null;
                var i = document.createElement("i");
                return i.classList.add.apply(i.classList, e.split(" ")), i
            }
        }),
        Ct = xt.extend({
            mapping: {
                collapse: "chevron-down",
                expand: "chevron-up",
                delete: "trash",
                edit: "pencil",
                add: "plus",
                cancel: "ban-circle",
                save: "ok",
                moveup: "arrow-up",
                movedown: "arrow-down",
                copy: "copy",
                clear: "remove-circle",
                time: "time",
                calendar: "calendar"
            },
            icon_prefix: "icon-"
        }),
        Lt = xt.extend({
            mapping: {
                collapse: "chevron-down",
                expand: "chevron-right",
                delete: "remove",
                edit: "pencil",
                add: "plus",
                cancel: "floppy-remove",
                save: "floppy-saved",
                moveup: "arrow-up",
                movedown: "arrow-down",
                copy: "copy",
                clear: "remove-circle",
                time: "time",
                calendar: "calendar"
            },
            icon_prefix: "glyphicon glyphicon-"
        }),
        Et = xt.extend({
            mapping: {
                collapse: "chevron-down",
                expand: "chevron-right",
                delete: "remove",
                edit: "pencil",
                add: "plus",
                cancel: "ban-circle",
                save: "save",
                moveup: "arrow-up",
                movedown: "arrow-down",
                copy: "copy",
                clear: "remove-circle",
                time: "time",
                calendar: "calendar"
            },
            icon_prefix: "icon-"
        }),
        kt = xt.extend({
            mapping: {
                collapse: "caret-square-o-down",
                expand: "caret-square-o-right",
                delete: "times",
                edit: "pencil",
                add: "plus",
                cancel: "ban",
                save: "save",
                moveup: "arrow-up",
                movedown: "arrow-down",
                copy: "files-o",
                clear: "times-circle-o",
                time: "clock-o",
                calendar: "calendar"
            },
            icon_prefix: "fa fa-"
        }),
        Tt = xt.extend({
            mapping: {
                collapse: "caret-down",
                expand: "caret-right",
                delete: "times",
                edit: "pen",
                add: "plus",
                cancel: "ban",
                save: "save",
                moveup: "arrow-up",
                movedown: "arrow-down",
                copy: "copy",
                clear: "times-circle",
                time: "clock",
                calendar: "calendar"
            },
            icon_prefix: "fas fa-"
        }),
        jt = xt.extend({
            mapping: {
                collapse: "minus",
                expand: "plus",
                delete: "remove",
                edit: "edit",
                add: "add-doc",
                cancel: "error",
                save: "checkmark",
                moveup: "up-arrow",
                movedown: "down-arrow",
                copy: "page-copy",
                clear: "remove",
                time: "clock",
                calendar: "calendar"
            },
            icon_prefix: "foundicon-"
        }),
        At = xt.extend({
            mapping: {
                collapse: "minus",
                expand: "plus",
                delete: "x",
                edit: "pencil",
                add: "page-add",
                cancel: "x-circle",
                save: "save",
                moveup: "arrow-up",
                movedown: "arrow-down",
                copy: "page-copy",
                clear: "x-circle",
                time: "clock",
                calendar: "calendar"
            },
            icon_prefix: "fi-"
        }),
        It = xt.extend({
            mapping: {
                collapse: "triangle-1-s",
                expand: "triangle-1-e",
                delete: "trash",
                edit: "pencil",
                add: "plusthick",
                cancel: "closethick",
                save: "disk",
                moveup: "arrowthick-1-n",
                movedown: "arrowthick-1-s",
                clear: "circle-close",
                time: "time",
                calendar: "calendar"
            },
            icon_prefix: "ui-icon ui-icon-"
        }),
        Ot = xt.extend({
            mapping: {
                collapse: "arrow_drop_up",
                expand: "arrow_drop_down",
                delete: "delete",
                edit: "edit",
                add: "add",
                cancel: "cancel",
                save: "save",
                moveup: "arrow_upward",
                movedown: "arrow_downward",
                copy: "content_copy",
                clear: "highlight_off",
                time: "access_time",
                calendar: "calendar_today",
                upload: "cloud_upload"
            },
            icon_class: "material-icons",
            icon_prefix: "",
            getIconClass: function(t) {
                return this.icon_class
            },
            getIcon: function(t) {
                var e = this.mapping[t];
                if (!e) return null;
                var i = document.createElement("i");
                i.classList.add(this.icon_class);
                var s = document.createTextNode(e);
                return i.appendChild(s), i
            }
        }),
        Pt = xt.extend({
            mapping: {
                collapse: "arrow-down",
                expand: "arrow-right",
                delete: "delete",
                edit: "edit",
                add: "plus",
                cancel: "close",
                save: "save",
                moveup: "upward",
                movedown: "downward",
                copy: "copy",
                clear: "close",
                time: "time",
                calendar: "bookmark"
            },
            icon_prefix: "icon icon-"
        });
    i.d(e, "JSONEditor", function() {
        return Vt
    });
    var Ht, Bt, St, Nt, Ft, Vt = function(t, e) {
        if (!(t instanceof Element)) throw new Error("element should be an instance of Element");
        e = n({}, Vt.defaults.options, e || {}), this.element = t, this.options = e, this.init()
    };
    Vt.prototype = {
            constructor: Vt,
            init: function() {
                var t = this;
                this.ready = !1, this.copyClipboard = null, this.refs_with_info = {}, this.refs_prefix = "#/counter/", this.refs_counter = 1;
                var e = this.options.theme || Vt.defaults.theme,
                    i = Vt.defaults.themes[e];
                if (!i) throw new Error("Unknown theme " + e);
                this.schema = this.options.schema, this.theme = new i, this.element.setAttribute("data-theme", e), this.theme.options.disable_theme_rules || this.addNewStyleRules(e, this.theme.rules), this.template = this.options.template, this.refs = this.options.refs || {}, this.uuid = 0, this.__data = {};
                var s = Vt.defaults.iconlibs[this.options.iconlib || Vt.defaults.iconlib];
                s && (this.iconlib = new s), this.root_container = this.theme.getContainer(), this.element.appendChild(this.root_container), this.translate = this.options.translate || Vt.defaults.translate;
                var n = document.location.toString(),
                    r = this._getFileBase();
                this._loadExternalRefs(this.schema, function() {
                    t._getDefinitions(t.schema, n + "#/definitions/");
                    var e = {};
                    t.options.custom_validators && (e.custom_validators = t.options.custom_validators), t.validator = new p(t, null, e, Vt.defaults);
                    var i = t.expandRefs(t.schema),
                        s = t.getEditorClass(i);
                    t.root = t.createEditor(s, {
                        jsoneditor: t,
                        schema: i,
                        required: !0,
                        container: t.root_container
                    }), t.root.preBuild(), t.root.build(), t.root.postBuild(), t.options.hasOwnProperty("startval") && t.root.setValue(t.options.startval), t.validation_results = t.validator.validate(t.root.getValue()), t.root.showValidationErrors(t.validation_results), t.ready = !0, window.requestAnimationFrame(function() {
                        t.ready && (t.validation_results = t.validator.validate(t.root.getValue()), t.root.showValidationErrors(t.validation_results), t.trigger("ready"), t.trigger("change"))
                    })
                }, n, r)
            },
            getValue: function() {
                if (!this.ready) throw new Error("JSON Editor not ready yet.  Listen for 'ready' event before getting the value");
                return this.root.getValue()
            },
            setValue: function(t) {
                if (!this.ready) throw new Error("JSON Editor not ready yet.  Listen for 'ready' event before setting the value");
                return this.root.setValue(t), this
            },
            validate: function(t) {
                if (!this.ready) throw new Error("JSON Editor not ready yet.  Listen for 'ready' event before validating");
                return 1 === arguments.length ? this.validator.validate(t) : this.validation_results
            },
            destroy: function() {
                this.destroyed || this.ready && (this.schema = null, this.options = null, this.root.destroy(), this.root = null, this.root_container = null, this.validator = null, this.validation_results = null, this.theme = null, this.iconlib = null, this.template = null, this.__data = null, this.ready = !1, this.element.innerHTML = "", this.element.removeAttribute("data-theme"), this.destroyed = !0)
            },
            on: function(t, e) {
                return this.callbacks = this.callbacks || {}, this.callbacks[t] = this.callbacks[t] || [], this.callbacks[t].push(e), this
            },
            off: function(t, e) {
                if (t && e) {
                    this.callbacks = this.callbacks || {}, this.callbacks[t] = this.callbacks[t] || [];
                    for (var i = [], s = 0; s < this.callbacks[t].length; s++) this.callbacks[t][s] !== e && i.push(this.callbacks[t][s]);
                    this.callbacks[t] = i
                } else t ? (this.callbacks = this.callbacks || {}, this.callbacks[t] = []) : this.callbacks = {};
                return this
            },
            trigger: function(t, e) {
                if (this.callbacks && this.callbacks[t] && this.callbacks[t].length)
                    for (var i = 0; i < this.callbacks[t].length; i++) this.callbacks[t][i].apply(this, [e]);
                return this
            },
            setOption: function(t, e) {
                if ("show_errors" !== t) throw new Error("Option " + t + " must be set during instantiation and cannot be changed later");
                return this.options.show_errors = e, this.onChange(), this
            },
            getEditorClass: function(t) {
                var e;
                if (t = this.expandSchema(t), r(Vt.defaults.resolvers, function(i, s) {
                        var n = s(t);
                        if (n && Vt.defaults.editors[n]) return e = n, !1
                    }), !e) throw new Error("Unknown editor for schema " + JSON.stringify(t));
                if (!Vt.defaults.editors[e]) throw new Error("Unknown editor " + e);
                return Vt.defaults.editors[e]
            },
            createEditor: function(t, e) {
                return new t(e = n({}, t.options || {}, e), Vt.defaults)
            },
            onChange: function() {
                if (this.ready && !this.firing_change) {
                    this.firing_change = !0;
                    var t = this;
                    return window.requestAnimationFrame(function() {
                        t.firing_change = !1, t.ready && (t.validation_results = t.validator.validate(t.root.getValue()), "never" !== t.options.show_errors ? t.root.showValidationErrors(t.validation_results) : t.root.showValidationErrors([]), t.trigger("change"))
                    }), this
                }
            },
            compileTemplate: function(t, e) {
                var i;
                if ("string" == typeof(e = e || Vt.defaults.template)) {
                    if (!Vt.defaults.templates[e]) throw new Error("Unknown template engine " + e);
                    if (!(i = Vt.defaults.templates[e]())) throw new Error("Template engine " + e + " missing required library.")
                } else i = e;
                if (!i) throw new Error("No template engine set");
                if (!i.compile) throw new Error("Invalid template engine set");
                return i.compile(t)
            },
            _data: function(t, e, i) {
                if (3 !== arguments.length) return t.hasAttribute("data-jsoneditor-" + e) ? this.__data[t.getAttribute("data-jsoneditor-" + e)] : null;
                var s;
                t.hasAttribute("data-jsoneditor-" + e) ? s = t.getAttribute("data-jsoneditor-" + e) : (s = this.uuid++, t.setAttribute("data-jsoneditor-" + e, s)), this.__data[s] = i
            },
            registerEditor: function(t) {
                return this.editors = this.editors || {}, this.editors[t.path] = t, this
            },
            unregisterEditor: function(t) {
                return this.editors = this.editors || {}, this.editors[t.path] = null, this
            },
            getEditor: function(t) {
                if (this.editors) return this.editors[t]
            },
            watch: function(t, e) {
                return this.watchlist = this.watchlist || {}, this.watchlist[t] = this.watchlist[t] || [], this.watchlist[t].push(e), this
            },
            unwatch: function(t, e) {
                if (!this.watchlist || !this.watchlist[t]) return this;
                if (!e) return this.watchlist[t] = null, this;
                for (var i = [], s = 0; s < this.watchlist[t].length; s++) this.watchlist[t][s] !== e && i.push(this.watchlist[t][s]);
                return this.watchlist[t] = i.length ? i : null, this
            },
            notifyWatchers: function(t) {
                if (!this.watchlist || !this.watchlist[t]) return this;
                for (var e = 0; e < this.watchlist[t].length; e++) this.watchlist[t][e]()
            },
            isEnabled: function() {
                return !this.root || this.root.isEnabled()
            },
            enable: function() {
                this.root.enable()
            },
            disable: function() {
                this.root.disable()
            },
            _getDefinitions: function(t, e) {
                if (t.definitions)
                    for (var i in t.definitions) t.definitions.hasOwnProperty(i) && (this.refs[e + i] = t.definitions[i], t.definitions[i].definitions && this._getDefinitions(t.definitions[i], e + i + "/definitions/"))
            },
            _getExternalRefs: function(t, e) {
                var i = {},
                    s = function(t) {
                        for (var e in t) t.hasOwnProperty(e) && (i[e] = !0)
                    };
                if (t.$ref && "object" != typeof t.$ref) {
                    var n = this.refs_prefix + this.refs_counter++;
                    "#" === t.$ref.substr(0, 1) || this.refs[t.$ref] || (i[t.$ref] = !0), this.refs_with_info[n] = {
                        fetchUrl: e,
                        $ref: t.$ref
                    }, t.$ref = n
                }
                for (var r in t)
                    if (t.hasOwnProperty(r) && t[r] && "object" == typeof t[r])
                        if (Array.isArray(t[r]))
                            for (var o = 0; o < t[r].length; o++) t[r][o] && "object" == typeof t[r][o] && s(this._getExternalRefs(t[r][o], e));
                        else s(this._getExternalRefs(t[r], e));
                return i
            },
            _getFileBase: function() {
                var t = this.options.ajaxBase;
                return void 0 === t && (t = this._getFileBaseFromFileLocation(document.location.toString())), t
            },
            _getFileBaseFromFileLocation: function(t) {
                var e = t.split("/");
                return e.pop(), e.join("/") + "/"
            },
            _loadExternalRefs: function(t, e, i, s) {
                var n = this,
                    o = this._getExternalRefs(t, i),
                    a = 0,
                    l = 0,
                    d = !1;
                r(o, function(t) {
                    if (!n.refs[t]) {
                        if (!n.options.ajax) throw new Error("Must set ajax option to true to load external ref " + t);
                        n.refs[t] = "loading", l++;
                        var i = t;
                        s !== t.substr(0, s.length) && "http" !== t.substr(0, 4) && "/" !== t.substr(0, 1) && (i = s + t);
                        var r = new XMLHttpRequest;
                        r.overrideMimeType("application/json"), r.open("GET", i, !0), n.options.ajaxCredentials && (r.withCredentials = n.options.ajaxCredentials), r.onreadystatechange = function() {
                            if (4 === r.readyState) {
                                if (200 !== r.status) throw window.console.log(r), new Error("Failed to fetch ref via ajax- " + t);
                                var s;
                                try {
                                    s = JSON.parse(r.responseText)
                                } catch (t) {
                                    throw window.console.log(t), new Error("Failed to parse external ref " + i)
                                }
                                if ("boolean" != typeof s && "object" != typeof s || null === s || Array.isArray(s)) throw new Error("External ref does not contain a valid schema - " + i);
                                n.refs[t] = s;
                                var o = n._getFileBaseFromFileLocation(i);
                                n._getDefinitions(s, i + "#/definitions/"), n._loadExternalRefs(s, function() {
                                    ++a >= l && !d && (d = !0, e())
                                }, i, o)
                            }
                        }, r.send()
                    }
                }), l || e()
            },
            expandRefs: function(t, e) {
                for (t = n({}, t); t.$ref;) {
                    var i = this.refs_with_info[t.$ref];
                    delete t.$ref;
                    var s = "";
                    i.$ref.startsWith("#") && (s = i.fetchUrl);
                    var r = s + i.$ref;
                    if (this.refs[r] || (r = s + decodeURIComponent(i.$ref)), e && this.refs[r].hasOwnProperty("allOf"))
                        for (var o = this.refs[r].allOf, a = 0; a < o.length; a++) o[a] = this.expandRefs(o[a], !0);
                    t = this.extendSchemas(t, n({}, this.refs[r]))
                }
                return t
            },
            expandSchema: function(t, e) {
                var i, s = this,
                    o = n({}, t);
                if ("object" == typeof t.type && (Array.isArray(t.type) ? r(t.type, function(e, i) {
                        "object" == typeof i && (t.type[e] = s.expandSchema(i))
                    }) : t.type = s.expandSchema(t.type)), "object" == typeof t.disallow && (Array.isArray(t.disallow) ? r(t.disallow, function(e, i) {
                        "object" == typeof i && (t.disallow[e] = s.expandSchema(i))
                    }) : t.disallow = s.expandSchema(t.disallow)), t.anyOf && r(t.anyOf, function(e, i) {
                        t.anyOf[e] = s.expandSchema(i)
                    }), t.dependencies && r(t.dependencies, function(e, i) {
                        "object" != typeof i || Array.isArray(i) || (t.dependencies[e] = s.expandSchema(i))
                    }), t.not && (t.not = this.expandSchema(t.not)), t.allOf) {
                    for (i = 0; i < t.allOf.length; i++) t.allOf[i] = this.expandRefs(t.allOf[i], !0), o = this.extendSchemas(o, this.expandSchema(t.allOf[i]));
                    delete o.allOf
                }
                if (t.extends) {
                    if (Array.isArray(t.extends))
                        for (i = 0; i < t.extends.length; i++) o = this.extendSchemas(o, this.expandSchema(t.extends[i]));
                    else o = this.extendSchemas(o, this.expandSchema(t.extends));
                    delete o.extends
                }
                if (t.oneOf) {
                    var a = n({}, o);
                    for (delete a.oneOf, i = 0; i < t.oneOf.length; i++) o.oneOf[i] = this.extendSchemas(this.expandSchema(t.oneOf[i]), a)
                }
                return this.expandRefs(o)
            },
            extendSchemas: function(t, e) {
                t = n({}, t), e = n({}, e);
                var i = this,
                    s = {};
                return r(t, function(t, n) {
                    void 0 !== e[t] ? "required" !== t && "defaultProperties" !== t || "object" != typeof n || !Array.isArray(n) ? "type" !== t || "string" != typeof n && !Array.isArray(n) ? "object" == typeof n && Array.isArray(n) ? s[t] = n.filter(function(i) {
                        return -1 !== e[t].indexOf(i)
                    }) : s[t] = "object" == typeof n && null !== n ? i.extendSchemas(n, e[t]) : n : ("string" == typeof n && (n = [n]), "string" == typeof e.type && (e.type = [e.type]), e.type && e.type.length ? s.type = n.filter(function(t) {
                        return -1 !== e.type.indexOf(t)
                    }) : s.type = n, 1 === s.type.length && "string" == typeof s.type[0] ? s.type = s.type[0] : 0 === s.type.length && delete s.type) : s[t] = n.concat(e[t]).reduce(function(t, e) {
                        return t.indexOf(e) < 0 && t.push(e), t
                    }, []) : s[t] = n
                }), r(e, function(e, i) {
                    void 0 === t[e] && (s[e] = i)
                }), s
            },
            setCopyClipboardContents: function(t) {
                this.copyClipboard = t
            },
            getCopyClipboardContents: function() {
                return this.copyClipboard
            },
            addNewStyleRules: function(t, e) {
                var i = document.querySelector("#theme-" + t);
                i || ((i = document.createElement("style")).setAttribute("id", "theme-" + t), i.appendChild(document.createTextNode("")), document.head.appendChild(i));
                var s = i.sheet ? i.sheet : i.styleSheet,
                    n = this.element.nodeName.toLowerCase();
                for (var r in e)
                    if (e.hasOwnProperty(r)) {
                        var o = n + '[data-theme="' + t + '"] ' + r;
                        s.insertRule ? s.insertRule(o + " {" + e[r] + "}", 0) : s.addRule && s.addRule(o, e[r], 0)
                    }
            }
        },
        function() {
            function t(t, e) {
                e = e || {
                    bubbles: !1,
                    cancelable: !1,
                    detail: void 0
                };
                var i = document.createEvent("CustomEvent");
                return i.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), i
            }
            t.prototype = window.Event.prototype, window.CustomEvent = t
        }(),
        function() {
            for (var t = 0, e = ["ms", "moz", "webkit", "o"], i = 0; i < e.length && !window.requestAnimationFrame; ++i) window.requestAnimationFrame = window[e[i] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[i] + "CancelAnimationFrame"] || window[e[i] + "CancelRequestAnimationFrame"];
            window.requestAnimationFrame || (window.requestAnimationFrame = function(e, i) {
                var s = (new Date).getTime(),
                    n = Math.max(0, 16 - (s - t)),
                    r = window.setTimeout(function() {
                        e(s + n)
                    }, n);
                return t = s + n, r
            }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(t) {
                clearTimeout(t)
            })
        }(), Array.isArray || (Array.isArray = function(t) {
            return "[object Array]" === Object.prototype.toString.call(t)
        }), Vt.defaults = ((Ht = {
            defaults: {
                themes: {},
                templates: {},
                iconlibs: {},
                editors: {},
                languages: {},
                resolvers: [],
                custom_validators: []
            }
        }).defaults.theme = "html", Ht.defaults.template = "default", Ht.defaults.options = {}, Ht.defaults.options.prompt_before_delete = !0, Ht.defaults.options.upload = function(t, e, i) {
            console.log("Upload handler required for upload editor")
        }, Ht.defaults.translate = function(t, e) {
            var i = Ht.defaults.languages[Ht.defaults.language];
            if (!i) throw new Error("Unknown language " + Ht.defaults.language);
            var s = i[t] || Ht.defaults.languages[Ht.defaults.default_language][t];
            if (void 0 === s) throw new Error("Unknown translate string " + t);
            if (e)
                for (var n = 0; n < e.length; n++) s = s.replace(new RegExp("\\{\\{" + n + "}}", "g"), e[n]);
            return s
        }, Ht.defaults.default_language = "en", Ht.defaults.language = Ht.defaults.default_language, Ht.defaults.languages.en = {
            error_notset: "Property must be set",
            error_notempty: "Value required",
            error_enum: "Value must be one of the enumerated values",
            error_anyOf: "Value must validate against at least one of the provided schemas",
            error_oneOf: "Value must validate against exactly one of the provided schemas. It currently validates against {{0}} of the schemas.",
            error_not: "Value must not validate against the provided schema",
            error_type_union: "Value must be one of the provided types",
            error_type: "Value must be of type {{0}}",
            error_disallow_union: "Value must not be one of the provided disallowed types",
            error_disallow: "Value must not be of type {{0}}",
            error_multipleOf: "Value must be a multiple of {{0}}",
            error_maximum_excl: "Value must be less than {{0}}",
            error_maximum_incl: "Value must be at most {{0}}",
            error_minimum_excl: "Value must be greater than {{0}}",
            error_minimum_incl: "Value must be at least {{0}}",
            error_maxLength: "Value must be at most {{0}} characters long",
            error_minLength: "Value must be at least {{0}} characters long",
            error_pattern: "Value must match the pattern {{0}}",
            error_additionalItems: "No additional items allowed in this array",
            error_maxItems: "Value must have at most {{0}} items",
            error_minItems: "Value must have at least {{0}} items",
            error_uniqueItems: "Array must have unique items",
            error_maxProperties: "Object must have at most {{0}} properties",
            error_minProperties: "Object must have at least {{0}} properties",
            error_required: "Object is missing the required property '{{0}}'",
            error_additional_properties: "No additional properties allowed, but property {{0}} is set",
            error_dependency: "Must have property {{0}}",
            error_date: "Date must be in the format {{0}}",
            error_time: "Time must be in the format {{0}}",
            error_datetime_local: "Datetime must be in the format {{0}}",
            error_invalid_epoch: "Date must be greater than 1 January 1970",
            error_ipv4: "Value must be a valid IPv4 address in the form of 4 numbers between 0 and 255, separated by dots",
            error_ipv6: "Value must be a valid IPv6 address",
            error_hostname: "The hostname has the wrong format",
            button_delete_all: "All",
            button_delete_all_title: "Delete All",
            button_delete_last: "Last {{0}}",
            button_delete_last_title: "Delete Last {{0}}",
            button_add_row_title: "Add {{0}}",
            button_move_down_title: "Move down",
            button_move_up_title: "Move up",
            button_object_properties: "Object Properties",
            button_delete_row_title: "Delete {{0}}",
            button_delete_row_title_short: "Delete",
            button_collapse: "Collapse",
            button_expand: "Expand",
            flatpickr_toggle_button: "Toggle",
            flatpickr_clear_button: "Clear",
            choices_placeholder_text: "Start typing to add value",
            default_array_item_title: "item"
        }, Ht.defaults.callbacks = {}, r(Ht.defaults.editors, function(t, e) {
            Ht.defaults.editors[t].options = e.options || {}
        }), Ht.defaults.resolvers.unshift(function(t) {
            if ("string" != typeof t.type) return "multiple"
        }), Ht.defaults.resolvers.unshift(function(t) {
            if (!t.type && t.properties) return "object"
        }), Ht.defaults.resolvers.unshift(function(t) {
            if ("string" == typeof t.type) return t.type
        }), Ht.defaults.resolvers.unshift(function(t) {
            if ("string" === t.type && "signature" === t.format) return "signature"
        }), Ht.defaults.resolvers.unshift(function(t) {
            if ("boolean" === t.type) return "checkbox" === t.format || t.options && t.options.checkbox ? "checkbox" : "select2" === t.format ? "select2" : "selectize" === t.format ? "selectize" : "choices" === t.format ? "choices" : "select"
        }), Ht.defaults.resolvers.unshift(function(t) {
            if ("any" === t.type) return "multiple"
        }), Ht.defaults.resolvers.unshift(function(t) {
            if ("string" === t.type && t.media && "base64" === t.media.binaryEncoding) return "base64"
        }), Ht.defaults.resolvers.unshift(function(t) {
            if ("string" === t.type && "url" === t.format && t.options && !0 === t.options.upload && window.FileReader) return "upload"
        }), Ht.defaults.resolvers.unshift(function(t) {
            if ("array" === t.type && "table" === t.format) return "table"
        }), Ht.defaults.resolvers.unshift(function(t) {
            if (t.enumSource) return "radio" === t.format ? "radio" : "select2" === t.format ? "select2" : "selectize" === t.format ? "selectize" : "choices" === t.format ? "choices" : "select"
        }), Ht.defaults.resolvers.unshift(function(t) {
            if (t.enum) {
                if ("array" === t.type || "object" === t.type) return "enum";
                if ("number" === t.type || "integer" === t.type || "string" === t.type) return "radio" === t.format ? "radio" : "select2" === t.format ? "select2" : "selectize" === t.format ? "selectize" : "choices" === t.format ? "choices" : "select"
            }
        }), Ht.defaults.resolvers.unshift(function(t) {
            if ("array" === t.type && t.items && !Array.isArray(t.items) && ["string", "number", "integer"].indexOf(t.items.type) >= 0) {
                if ("choices" === t.format) return "arrayChoices";
                if (t.uniqueItems) {
                    if ("selectize" === t.format) return "arraySelectize";
                    if ("select2" === t.format) return "arraySelect2";
                    if ("table" !== t.format) return "multiselect"
                }
            }
        }), Ht.defaults.resolvers.unshift(function(t) {
            if (t.oneOf || t.anyOf) return "multiple"
        }), Ht.defaults.resolvers.unshift(function(t) {
            if (-1 !== ["string", "integer"].indexOf(t.type) && -1 !== ["date", "time", "datetime-local"].indexOf(t.format)) return "datetime"
        }), Ht.defaults.resolvers.unshift(function(t) {
            if (-1 !== ["string", "integer"].indexOf(t.type) && -1 !== ["starrating", "rating"].indexOf(t.format)) return "starrating"
        }), Ht.defaults.resolvers.unshift(function(t) {
            if (t.links)
                for (var e = 0; e < t.links.length; e++)
                    if (t.links[e].rel && "describedby" === t.links[e].rel.toLowerCase()) return "describedBy"
        }), Ht.defaults.resolvers.unshift(function(t) {
            if ("button" === t.format) return "button"
        }), Ht.defaults.resolvers.unshift(function(t) {
            if ("info" === t.format) return "info"
        }), Ht.defaults.resolvers.unshift(function(t) {
            if ("string" === t.type && "uuid" === t.format) return "uuid"
        }), Ht.defaults.resolvers.unshift(function(t) {
            if ("string" === t.type && "autocomplete" === t.format) return "autocomplete"
        }), Ht.defaults.resolvers.unshift(function(t) {
            if ("string" === t.type && "jodit" === t.format) return "jodit"
        }), Ht.defaults.resolvers.unshift(function(t) {
            if ("string" === t.type && "markdown" === t.format) return "simplemde"
        }), Ht.defaults.resolvers.unshift(function(t) {
            if ("string" === t.type && -1 !== ["xhtml", "bbcode"].indexOf(t.format)) return "sceditor"
        }), Ht.defaults.resolvers.unshift(function(t) {
            if ("string" === t.type && -1 !== ["actionscript", "batchfile", "c", "c++", "cpp", "coffee", "csharp", "css", "dart", "django", "ejs", "erlang", "golang", "groovy", "handlebars", "haskell", "haxe", "html", "ini", "jade", "java", "javascript", "json", "less", "lisp", "lua", "makefile", "matlab", "mysql", "objectivec", "pascal", "perl", "pgsql", "php", "python", "r", "ruby", "sass", "scala", "scss", "smarty", "sql", "sqlserver", "stylus", "svg", "twig", "vbscript", "xml", "yaml"].indexOf(t.format)) return "ace"
        }), Ht.defaults.resolvers.unshift(function(t) {
            if ("string" === t.type && -1 !== ["ip", "ipv4", "ipv6", "hostname"].indexOf(t.format)) return "ip"
        }), Ht.defaults), Vt.plugins = {
            ace: {
                theme: ""
            },
            choices: {},
            SimpleMDE: {},
            sceditor: {},
            select2: {},
            selectize: {}
        }, (Bt = Vt.defaults.themes).html = b, Bt.bootstrap2 = v, Bt.bootstrap3 = _, Bt.bootstrap4 = y, Bt.foundation = w, Bt.foundation3 = x, Bt.foundation4 = C, Bt.foundation5 = L, Bt.foundation6 = E, Bt.jqueryui = k, Bt.barebones = T, Bt.materialize = j, Bt.spectre = A, Bt.tailwind = I, Vt.AbstractEditor = O, (St = Vt.defaults.editors).ace = H, St.array = B, St.arrayChoices = N, St.arraySelect2 = F, St.arraySelectize = V, St.autocomplete = R, St.base64 = M, St.button = z, St.checkbox = D, St.choices = G, St.datetime = J, St.describedBy = W, St.enum = U, St.hidden = $, St.info = Q, St.integer = Z, St.ip = X, St.jodit = K, St.multiple = tt, St.multiselect = S, St.null = et, St.number = Y, St.object = it, St.radio = st, St.sceditor = nt, St.select = q, St.select2 = rt, St.selectize = ot, St.signature = at, St.simplemde = lt, St.starrating = dt, St.string = P, St.table = ht, St.upload = ct, St.uuid = ut, (Nt = Vt.defaults.templates).default = pt, Nt.ejs = mt, Nt.handlebars = ft, Nt.hogan = gt, Nt.hogan = bt, Nt.markup = vt, Nt.mustache = _t, Nt.swig = yt, Nt.underscore = wt, (Ft = Vt.defaults.iconlibs).bootstrap2 = Ct, Ft.bootstrap3 = Lt, Ft.fontawesome3 = Et, Ft.fontawesome4 = kt, Ft.fontawesome5 = Tt, Ft.foundation2 = jt, Ft.foundation3 = At, Ft.jqueryui = It, Ft.materialicons = Ot, Ft.spectre = Pt,
        function() {
            if (window.jQuery || window.Zepto) {
                var t = window.jQuery || window.Zepto;
                t.jsoneditor = Vt.defaults, t.fn.jsoneditor = function(t) {
                    var e = this,
                        i = this.data("jsoneditor");
                    if ("value" === t) {
                        if (!i) throw new Error("Must initialize jsoneditor before getting/setting the value");
                        if (!(arguments.length > 1)) return i.getValue();
                        i.setValue(arguments[1])
                    } else {
                        if ("validate" === t) {
                            if (!i) throw new Error("Must initialize jsoneditor before validating");
                            return arguments.length > 1 ? i.validate(arguments[1]) : i.validate()
                        }
                        "destroy" === t ? i && (i.destroy(), this.data("jsoneditor", null)) : (i && i.destroy(), i = new Vt(this.get(0), t), this.data("jsoneditor", i), i.on("change", function() {
                            e.trigger("change")
                        }), i.on("ready", function() {
                            e.trigger("ready")
                        }))
                    }
                    return this
                }
            }
        }(), window.JSONEditor = Vt
}]);