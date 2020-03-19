/*!
 Copyright 2018 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*! lifecycle.es5.js v0.1.1 */
!(function(e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : (e.lifecycle = t());
})(this, function() {
  "use strict";
  var e = void 0;
  try {
    new EventTarget(), (e = !1);
  } catch (t) {
    e = !1;
  }
  var t =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function(e) {
            return typeof e;
          }
        : function(e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          },
    n = function(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    },
    i = (function() {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          (i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            "value" in i && (i.writable = !0),
            Object.defineProperty(e, i.key, i);
        }
      }
      return function(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
      };
    })(),
    r = function(e, t) {
      if ("function" != typeof t && null !== t)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof t
        );
      (e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        t &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(e, t)
            : (e.__proto__ = t));
    },
    a = function(e, t) {
      if (!e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
    },
    s = (function() {
      function e() {
        n(this, e), (this._registry = {});
      }
      return (
        i(e, [
          {
            key: "addEventListener",
            value: function(e, t) {
              this._getRegistry(e).push(t);
            },
          },
          {
            key: "removeEventListener",
            value: function(e, t) {
              var n = this._getRegistry(e),
                i = n.indexOf(t);
              i > -1 && n.splice(i, 1);
            },
          },
          {
            key: "dispatchEvent",
            value: function(e) {
              return (
                (e.target = this),
                Object.freeze(e),
                this._getRegistry(e.type).forEach(function(t) {
                  return t(e);
                }),
                !0
              );
            },
          },
          {
            key: "_getRegistry",
            value: function(e) {
              return (this._registry[e] = this._registry[e] || []);
            },
          },
        ]),
        e
      );
    })(),
    o = e ? EventTarget : s,
    u = e
      ? Event
      : function e(t) {
          n(this, e), (this.type = t);
        },
    f = (function(e) {
      function t(e, i) {
        n(this, t);
        var r = a(
          this,
          (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)
        );
        return (
          (r.newState = i.newState),
          (r.oldState = i.oldState),
          (r.originalEvent = i.originalEvent),
          r
        );
      }
      return r(t, u), t;
    })(),
    c = "active",
    h = "passive",
    d = "hidden",
    l = "frozen",
    p = "terminated",
    v =
      "object" === ("undefined" == typeof safari ? "undefined" : t(safari)) &&
      safari.pushNotification,
    y = [
      "focus",
      "blur",
      "visibilitychange",
      "freeze",
      "resume",
      "pageshow",
      "onpageshow" in self ? "pagehide" : "unload",
    ],
    g = function(e) {
      return e.preventDefault(), (e.returnValue = "Are you sure?");
    },
    _ = [
      [c, h, d, p],
      [c, h, d, l],
      [d, h, c],
      [l, d],
      [l, c],
      [l, h],
    ].map(function(e) {
      return e.reduce(function(e, t, n) {
        return (e[t] = n), e;
      }, {});
    }),
    b = function() {
      return document.visibilityState === d ? d : document.hasFocus() ? c : h;
    };
  return new ((function(e) {
    function t() {
      n(this, t);
      var e = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this)),
        i = b();
      return (
        (e._state = i),
        (e._unsavedChanges = []),
        (e._handleEvents = e._handleEvents.bind(e)),
        y.forEach(function(t) {
          return addEventListener(t, e._handleEvents, !0);
        }),
        v &&
          addEventListener("beforeunload", function(t) {
            e._safariBeforeUnloadTimeout = setTimeout(function() {
              t.defaultPrevented ||
                t.returnValue.length > 0 ||
                e._dispatchChangesIfNeeded(t, d);
            }, 0);
          }),
        e
      );
    }
    return (
      r(t, o),
      i(t, [
        {
          key: "addUnsavedChanges",
          value: function(e) {
            !this._unsavedChanges.indexOf(e) > -1 &&
              (0 === this._unsavedChanges.length &&
                addEventListener("beforeunload", g),
              this._unsavedChanges.push(e));
          },
        },
        {
          key: "removeUnsavedChanges",
          value: function(e) {
            var t = this._unsavedChanges.indexOf(e);
            t > -1 &&
              (this._unsavedChanges.splice(t, 1),
              0 === this._unsavedChanges.length &&
                removeEventListener("beforeunload", g));
          },
        },
        {
          key: "_dispatchChangesIfNeeded",
          value: function(e, t) {
            if (t !== this._state)
              for (
                var n = (function(e, t) {
                    for (var n, i = 0; (n = _[i]); ++i) {
                      var r = n[e],
                        a = n[t];
                      if (r >= 0 && a >= 0 && a > r)
                        return Object.keys(n).slice(r, a + 1);
                    }
                    return [];
                  })(this._state, t),
                  i = 0;
                i < n.length - 1;
                ++i
              ) {
                var r = n[i],
                  a = n[i + 1];
                (this._state = a),
                  this.dispatchEvent(
                    new f("statechange", {
                      oldState: r,
                      newState: a,
                      originalEvent: e,
                    })
                  );
              }
          },
        },
        {
          key: "_handleEvents",
          value: function(e) {
            switch (
              (v && clearTimeout(this._safariBeforeUnloadTimeout), e.type)
            ) {
              case "pageshow":
              case "resume":
                this._dispatchChangesIfNeeded(e, b());
                break;
              case "focus":
                this._dispatchChangesIfNeeded(e, c);
                break;
              case "blur":
                this._state === c && this._dispatchChangesIfNeeded(e, b());
                break;
              case "pagehide":
              case "unload":
                this._dispatchChangesIfNeeded(e, e.persisted ? l : p);
                break;
              case "visibilitychange":
                this._state !== l &&
                  this._state !== p &&
                  this._dispatchChangesIfNeeded(e, b());
                break;
              case "freeze":
                this._dispatchChangesIfNeeded(e, l);
            }
          },
        },
        {
          key: "state",
          get: function() {
            return this._state;
          },
        },
        {
          key: "pageWasDiscarded",
          get: function() {
            return document.wasDiscarded || !1;
          },
        },
      ]),
      t
    );
  })())();
});
//# sourceMappingURL=lifecycle.es5.js.map
