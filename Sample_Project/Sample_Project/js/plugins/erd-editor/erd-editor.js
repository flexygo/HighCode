import { S as Ub, _ as na, a as no, O as ht, i as jb, o as Xa, e as On, c as Rd, b as Cn, d as Vn, f as Eb, r as Pb, g as Bb, h as Ld, j as Ob, k as Ab, l as Qb, m as Db, n as _b, p as Dn, q as Yd, s as qb, t as Kd, u as cn, v as e1, w as Td, x as t1, y as n1, z as or, R as ar, A as B, B as Be, C as i1, D as o1, E as a1, F as l1, G as Il, H as r1, I as c1, J as s1, K as lr, L as d1, M as u1, N as m1, P as h1, Q as p1, T as jn, U as b1, V as f1, W as yt, X as $i, Y as g1, Z as Se, $ as y1, a0 as Hd, a1 as Z1, a2 as Nd, a3 as Me, a4 as bi, a5 as fi, a6 as Je, a7 as ye, a8 as To, a9 as $e, aa as it, ab as v1, ac as N, ad as $, ae as et, af as os, ag as x1, ah as G1, ai as X1, aj as as, ak as W1, al as oe, am as Te, an as V1, ao as ni, ap as zd, aq as I1, ar as k1, as as C1, at as ls, au as Wa, av as rr, aw as Ci, ax as Va, ay as wd, az as Qt, aA as an, aB as ln, aC as I, aD as cl, aE as rs, aF as cs, aG as Ao, aH as S1, aI as gi, aJ as yi, aM as L1, aN as Pe, aO as de, aP as zi, aQ as De, aR as Ue, aS as Fe, aT as Y1, aU as K1, aV as In, aW as ss, aX as ie, aY as Ia, aZ as Si, a_ as Md, a$ as ge, b0 as We, b1 as cr, b2 as ka, b3 as T1, b4 as kl, b5 as Fd, b6 as ia, b7 as sr, b8 as H1, b9 as dr, ba as Ca, bb as $d, bc as N1, bd as z1, be as w1, bf as J1, bg as M1, bh as F1, bi as $1, bj as Ud, bk as Bi, bl as _n, bm as Xi, bn as eo, bo as Ri, bp as jd, bq as bo, br as rn, bs as io, bt as ii, bu as U1, bv as Qo, bw as ct, bx as Ed, by as j1, bz as oa, bA as Sa, bB as aa, bC as E1, bD as Cl, bE as ur, bF as Pd, bG as Bd, bH as P1, bI as Wi, bJ as la, bK as gt, bL as En, bM as Od, bN as Ad, bO as Qd, bP as mr, bQ as B1, bR as O1, bS as A1, bT as hr, bV as Q1, bW as Dd, bX as ds, bY as _d, bZ as D1, b_ as An, b$ as _1, c0 as q1, c1 as ef, c2 as tf, c3 as nf, c4 as of, c5 as af, c6 as lf, c7 as Ht, c8 as qd, c9 as Ce, ca as eu, cb as tu, cc as rf, cd as cf, ce as sf, cf as Ra, cg as Ho, ch as nu, ci as df, cj as uf, ck as br, cl as It, cm as iu, cn as ou, co as ue, cp as us, cq as mf, cr as hf, cs as pf, ct as bf, cu as ff, cv as ms, cw as gf, cx as yf, cy as Zf, cz as vf, cA as xf, cB as hi, cC as sl, cD as Gf, cE as Xf, cF as Wf, cG as hs, cH as ps, cI as Vf, cJ as bs, cK as No, cL as If, cM as Jt, cN as kf, cO as Cf, cP as Sl, cQ as fs, cS as Rf, cT as Lf, cU as Yf, cV as Kf, cW as Tf, cX as Hf, cY as Nf, cZ as gs, c_ as zf, c$ as wf, d0 as Jf, d1 as Mf, d2 as zo, d3 as Ff, d4 as $f, d5 as Uf, d6 as jf, d7 as Ef, d8 as Pf, measures as measures } from "./schemaGCService-J8vtSEfz.js";
/*!
 * @dineug/erd-editor
 * @version 3.2.3 | Sat Apr 13 2024
 * @author SeungHwan-Lee <dineug2@gmail.com>
 * @license MIT
 */
var au = {
    now: function () {
        return (au.delegate || performance).now();
    },
    delegate: void 0
}, to = {
    schedule: function (e) {
        var t = requestAnimationFrame, n = cancelAnimationFrame, i = to.delegate;
        i && (t = i.requestAnimationFrame, n = i.cancelAnimationFrame);
        var l = t(function (r) {
            n = void 0, e(r);
        });
        return new Ub(function () {
            return n == null ? void 0 : n(l);
        });
    },
    requestAnimationFrame: function () {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        var n = to.delegate;
        return ((n == null ? void 0 : n.requestAnimationFrame) || requestAnimationFrame).apply(void 0, na([], no(e)));
    },
    cancelAnimationFrame: function () {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        var n = to.delegate;
        return ((n == null ? void 0 : n.cancelAnimationFrame) || cancelAnimationFrame).apply(void 0, na([], no(e)));
    },
    delegate: void 0
};
function Bf(e) {
    return e ? lu(e) : Of;
}
function lu(e) {
    return new ht(function (t) {
        var n = e || au, i = n.now(), l = 0, r = function () {
            t.closed || (l = to.requestAnimationFrame(function (s) {
                l = 0;
                var m = n.now();
                t.next({
                    timestamp: e ? m : s,
                    elapsed: m - i
                }), r();
            }));
        };
        return r(), function () {
            l && to.cancelAnimationFrame(l);
        };
    });
}
var Of = lu(), Af = new ht(function (e) {
    return e.complete();
});
function ru(e) {
    return e[e.length - 1];
}
function Qf(e) {
    return jb(ru(e)) ? e.pop() : void 0;
}
function Df(e, t) {
    return typeof ru(e) == "number" ? e.pop() : t;
}
function cu(e, t) {
    return t === void 0 && (t = 0), Xa(function (n, i) {
        n.subscribe(Rd(i, function (l) {
            return On(i, e, function () {
                return i.next(l);
            }, t);
        }, function () {
            return On(i, e, function () {
                return i.complete();
            }, t);
        }, function (l) {
            return On(i, e, function () {
                return i.error(l);
            }, t);
        }));
    });
}
function su(e, t) {
    return t === void 0 && (t = 0), Xa(function (n, i) {
        i.add(e.schedule(function () {
            return n.subscribe(i);
        }, t));
    });
}
function _f(e, t) {
    return Cn(e).pipe(su(t), cu(t));
}
function qf(e, t) {
    return Cn(e).pipe(su(t), cu(t));
}
function eg(e, t) {
    return new ht(function (n) {
        var i = 0;
        return t.schedule(function () {
            i === e.length ? n.complete() : (n.next(e[i++]), n.closed || this.schedule());
        });
    });
}
function tg(e, t) {
    return new ht(function (n) {
        var i;
        return On(n, t, function () {
            i = e[Eb](), On(n, t, function () {
                var l, r, s;
                try {
                    l = i.next(), r = l.value, s = l.done;
                } catch (m) {
                    n.error(m);
                    return;
                }
                s ? n.complete() : n.next(r);
            }, 0, !0);
        }), function () {
            return Vn(i == null ? void 0 : i.return) && i.return();
        };
    });
}
function du(e, t) {
    if (!e)
        throw new Error("Iterable cannot be null");
    return new ht(function (n) {
        On(n, t, function () {
            var i = e[Symbol.asyncIterator]();
            On(n, t, function () {
                i.next().then(function (l) {
                    l.done ? n.complete() : n.next(l.value);
                });
            }, 0, !0);
        });
    });
}
function ng(e, t) {
    return du(Pb(e), t);
}
function ig(e, t) {
    if (e != null) {
        if (Bb(e))
            return _f(e, t);
        if (Ld(e))
            return eg(e, t);
        if (Ob(e))
            return qf(e, t);
        if (Ab(e))
            return du(e, t);
        if (Qb(e))
            return tg(e, t);
        if (Db(e))
            return ng(e, t);
    }
    throw _b(e);
}
function og(e, t) {
    return t ? ig(e, t) : Cn(e);
}
var ag = Array.isArray;
function lg(e, t) {
    return ag(t) ? e.apply(void 0, na([], no(t))) : e(t);
}
function rg(e) {
    return Dn(function (t) {
        return lg(e, t);
    });
}
function cg(e) {
    return e === void 0 && (e = 1 / 0), Yd(qb, e);
}
var sg = ["addListener", "removeListener"], dg = ["addEventListener", "removeEventListener"], ug = ["on", "off"];
function st(e, t, n, i) {
    if (Vn(n) && (i = n, n = void 0), i)
        return st(e, t, n).pipe(rg(i));
    var l = no(pg(e) ? dg.map(function (m) {
        return function (h) {
            return e[m](t, h, n);
        };
    }) : mg(e) ? sg.map(ys(e, t)) : hg(e) ? ug.map(ys(e, t)) : [], 2), r = l[0], s = l[1];
    if (!r && Ld(e))
        return Yd(function (m) {
            return st(m, t, n);
        })(Cn(e));
    if (!r)
        throw new TypeError("Invalid event target");
    return new ht(function (m) {
        var h = function () {
            for (var p = [], b = 0; b < arguments.length; b++)
                p[b] = arguments[b];
            return m.next(1 < p.length ? p : p[0]);
        };
        return r(h), function () {
            return s(h);
        };
    });
}
function ys(e, t) {
    return function (n) {
        return function (i) {
            return e[n](t, i);
        };
    };
}
function mg(e) {
    return Vn(e.addListener) && Vn(e.removeListener);
}
function hg(e) {
    return Vn(e.on) && Vn(e.off);
}
function pg(e) {
    return Vn(e.addEventListener) && Vn(e.removeEventListener);
}
function oo() {
    for (var e = [], t = 0; t < arguments.length; t++)
        e[t] = arguments[t];
    var n = Qf(e), i = Df(e, 1 / 0), l = e;
    return l.length ? l.length === 1 ? Cn(l[0]) : cg(i)(og(l, n)) : Af;
}
function bg(e) {
    e === void 0 && (e = {});
    var t = e.connector, n = t === void 0 ? function () {
        return new cn();
    } : t, i = e.resetOnError, l = i === void 0 ? !0 : i, r = e.resetOnComplete, s = r === void 0 ? !0 : r, m = e.resetOnRefCountZero, h = m === void 0 ? !0 : m;
    return function (p) {
        var b, g, Z, y = 0, G = !1, X = !1, W = function () {
            g == null || g.unsubscribe(), g = void 0;
        }, V = function () {
            W(), b = Z = void 0, G = X = !1;
        }, C = function () {
            var H = b;
            V(), H == null || H.unsubscribe();
        };
        return Xa(function (H, L) {
            y++, !X && !G && W();
            var E = Z = Z ?? n();
            L.add(function () {
                y--, y === 0 && !X && !G && (g = dl(C, h));
            }), E.subscribe(L), !b && y > 0 && (b = new Kd({
                next: function (J) {
                    return E.next(J);
                },
                error: function (J) {
                    X = !0, W(), g = dl(V, l, J), E.error(J);
                },
                complete: function () {
                    G = !0, W(), g = dl(V, s), E.complete();
                }
            }), Cn(H).subscribe(b));
        })(p);
    };
}
function dl(e, t) {
    for (var n = [], i = 2; i < arguments.length; i++)
        n[i - 2] = arguments[i];
    if (t === !0) {
        e();
        return;
    }
    if (t !== !1) {
        var l = new Kd({
            next: function () {
                l.unsubscribe(), e();
            }
        });
        return Cn(t.apply(void 0, na([], no(n)))).subscribe(l);
    }
}
function uu(e) {
    return Xa(function (t, n) {
        Cn(e).subscribe(Rd(n, function () {
            return n.complete();
        }, e1)), !n.closed && t.subscribe(n);
    });
}
var fg = Td(function (e, t, n) {
    return e + (n ? "-" : "") + t.toLowerCase();
});
const gg = fg;
function ul(e, t, n) {
    return e == null ? e : t1(e, t, n);
}
var yg = Td(function (e, t, n) {
    return e + (n ? "_" : "") + t.toLowerCase();
});
const Zg = yg;
function vg(e) {
    return {
        ...e
    };
}
function mu({ notify: e, dispatch: t }, n) {
    let i = (n == null ? void 0 : n.commands) ?? [], l = (n == null ? void 0 : n.cursor) ?? -1, r = (n == null ? void 0 : n.limit) ?? 0, s = !0;
    const m = () => l !== -1, h = () => l < i.length - 1, p = (V) => r = V, b = () => ({
        hasRedo: h(),
        hasUndo: m()
    }), g = (V, C) => {
        s = !1, V[C](t), s = !0;
    };
    return Object.freeze({
        get cursor() {
            return l;
        },
        get size() {
            return i.length;
        },
        hasUndo: m,
        hasRedo: h,
        push: (V) => {
            s && (i.splice(l + 1, i.length - l), i.push(V), r !== 0 && i.length > r && (i = i.slice(i.length - r, i.length)), l = i.length - 1, e(b()));
        },
        undo: () => {
            if (!m())
                return;
            const V = i[l];
            g(V, "undo"), l--, e(b());
        },
        redo: () => {
            if (!h())
                return;
            const V = i[l + 1];
            g(V, "redo"), l++, e(b());
        },
        clear: () => {
            const V = i.length;
            i = [], l = -1, V > 0 && e(b());
        },
        setLimit: p,
        clone: (V) => mu(V, {
            commands: [...i],
            cursor: l,
            limit: r
        })
    });
}
const xg = (e, t) => (n) => n.pipe(n1(new ht((i) => {
    let l = !1;
    const r = n.subscribe(() => {
        l && i.next();
    });
    return r.add(e.subscribe(() => {
        l || (l = !0, i.next());
    })), r.add(t.subscribe(() => {
        l = !1;
    })), r;
})), Dn((i) => i.flat()), or), hu = (e) => {
    const t = (n) => ar(n.tags) || !e.some((i) => B(n.tags, i));
    return (n) => new ht((i) => n.subscribe({
        next: (l) => i.next(l.filter(t)),
        error: (l) => i.error(l),
        complete: () => i.complete()
    })).pipe(or);
}, ml = (e, t = []) => {
    const n = Be(i1), i = (l) => !ar(l.tags) && t.some((r) => B(l.tags, r)) || !n(l.type);
    return (l) => new ht((r) => l.subscribe({
        next: (s) => {
            r.next(e() ? s.filter(i) : s);
        },
        error: (s) => r.error(s),
        complete: () => r.complete()
    })).pipe(or);
}, fr = 2048;
function Gg(e, { getReadonly: t = () => !1, getHistory: n } = {}) {
    const i = /* @__PURE__ */ new Set(), l = o1(e), r = a1(l), s = {
        notify: (W) => l.dispatch(l1(W)),
        dispatch: l.dispatchSync
    }, m = (n == null ? void 0 : n(s)) ?? mu(s);
    m.setLimit(fr);
    const h = new cn(), p = h.pipe(Il(r1), hu([jn.changeOnly, jn.shared]), ml(t), c1(p1, [
        ["@@move", u1],
        ["@@scroll", m1],
        ["@@color", h1]
    ])), b = new ht((W) => l.subscribe((V) => W.next(V))).pipe(Il(s1), ml(t, [jn.shared]), lr(200)), g = (...W) => {
        h.next(b1(l.state, l.context, W));
    }, Z = (...W) => {
        f1(() => g(W));
    }, y = () => {
        Array.from(i).forEach((W) => W.unsubscribe()), i.clear(), l.destroy(), r.destroy(), m.clear(), h.complete();
    }, G = () => {
        t() || m.undo();
    }, X = () => {
        t() || m.redo();
    };
    return i.add(p.subscribe(d1(l, m))).add(h.pipe(ml(t, [jn.shared])).subscribe(l.dispatchSync)), Object.freeze({
        ...l,
        dispatch: Z,
        dispatchSync: g,
        destroy: y,
        undo: G,
        redo: X,
        history: m,
        change$: b
    });
}
var Fn;
const Zt = {
    openColorPicker: "openColorPicker",
    closeColorPicker: "closeColorPicker",
    openToast: "openToast",
    loadShikiService: "loadShikiService",
    openTableProperties: "openTableProperties",
    dragendColumnAll: "dragendColumnAll",
    copy: "copy",
    paste: "paste",
    schemaGC: "schemaGC",
    toggleSearch: "toggleSearch",
    openThemeBuilder: "openThemeBuilder",
    setThemeOptions: "setThemeOptions",
    mouseTrackerStart: "mouseTrackerStart",
    mouseTrackerEnd: "mouseTrackerEnd",
    openDiffViewer: "openDiffViewer"
};
class pu {
    constructor() {
        Fn.set(this, /* @__PURE__ */ new Set());
    }
    on(t) {
        return $i(this, Fn, "f").has(t) || $i(this, Fn, "f").add(t), () => {
            $i(this, Fn, "f").delete(t);
        };
    }
    emit(t) {
        $i(this, Fn, "f").forEach((n) => {
            const i = Reflect.get(n, t.type);
            g1(i, t);
        });
    }
    clear() {
        $i(this, Fn, "f").clear();
    }
}
Fn = /* @__PURE__ */ new WeakMap();
const La = yt(Zt.openColorPicker), bu = yt(Zt.closeColorPicker), dn = yt(Zt.openToast), Xg = yt(Zt.loadShikiService), fu = yt(Zt.openTableProperties), Wg = yt(Zt.dragendColumnAll), Vg = yt(Zt.copy), Ig = yt(Zt.paste), kg = yt(Zt.schemaGC), Cg = yt(Zt.toggleSearch), Sg = yt(Zt.openThemeBuilder), hl = yt(Zt.setThemeOptions), Rg = yt(Zt.mouseTrackerStart), Lg = yt(Zt.mouseTrackerEnd), gu = yt(Zt.openDiffViewer);
function gr(e, t) {
    for (var n = e.length, i = 0; i < n; ++i)
        if (t(e[i], i))
            return !0;
    return !1;
}
function yu(e, t) {
    for (var n = e.length, i = 0; i < n; ++i)
        if (t(e[i], i))
            return e[i];
    return null;
}
function Zu(e) {
    var t = e;
    if (typeof t > "u") {
        if (typeof navigator > "u" || !navigator)
            return "";
        t = navigator.userAgent || "";
    }
    return t.toLowerCase();
}
function yr(e, t) {
    try {
        return new RegExp(e, "g").exec(t);
    } catch {
        return null;
    }
}
function vu() {
    if (typeof navigator > "u" || !navigator || !navigator.userAgentData)
        return !1;
    var e = navigator.userAgentData, t = e.brands || e.uaList;
    return !!(t && t.length);
}
function Yg(e, t) {
    var n = yr("(" + e + ")((?:\\/|\\s|:)([0-9|\\.|_]+))", t);
    return n ? n[3] : "";
}
function Rl(e) {
    return e.replace(/_/g, ".");
}
function Oi(e, t) {
    var n = null, i = "-1";
    return gr(e, function (l) {
        var r = yr("(" + l.test + ")((?:\\/|\\s|:)([0-9|\\.|_]+))?", t);
        return !r || l.brand ? !1 : (n = l, i = r[3] || "-1", l.versionAlias ? i = l.versionAlias : l.versionTest && (i = Yg(l.versionTest.toLowerCase(), t) || i), i = Rl(i), !0);
    }), {
        preset: n,
        version: i
    };
}
function Ui(e, t) {
    var n = {
        brand: "",
        version: "-1"
    };
    return gr(e, function (i) {
        var l = xu(t, i);
        return l ? (n.brand = i.id, n.version = i.versionAlias || l.version, n.version !== "-1") : !1;
    }), n;
}
function xu(e, t) {
    return yu(e, function (n) {
        var i = n.brand;
        return yr("" + t.test, i.toLowerCase());
    });
}
var Ll = [{
    test: "phantomjs",
    id: "phantomjs"
}, {
    test: "whale",
    id: "whale"
}, {
    test: "edgios|edge|edg",
    id: "edge"
}, {
    test: "msie|trident|windows phone",
    id: "ie",
    versionTest: "iemobile|msie|rv"
}, {
    test: "miuibrowser",
    id: "miui browser"
}, {
    test: "samsungbrowser",
    id: "samsung internet"
}, {
    test: "samsung",
    id: "samsung internet",
    versionTest: "version"
}, {
    test: "chrome|crios",
    id: "chrome"
}, {
    test: "firefox|fxios",
    id: "firefox"
}, {
    test: "android",
    id: "android browser",
    versionTest: "version"
}, {
    test: "safari|iphone|ipad|ipod",
    id: "safari",
    versionTest: "version"
}], Gu = [{
    test: "(?=.*applewebkit/(53[0-7]|5[0-2]|[0-4]))(?=.*\\schrome)",
    id: "chrome",
    versionTest: "chrome"
}, {
    test: "chromium",
    id: "chrome"
}, {
    test: "whale",
    id: "chrome",
    versionAlias: "-1",
    brand: !0
}], Yl = [{
    test: "applewebkit",
    id: "webkit",
    versionTest: "applewebkit|safari"
}], Xu = [{
    test: "(?=(iphone|ipad))(?!(.*version))",
    id: "webview"
}, {
    test: "(?=(android|iphone|ipad))(?=.*(naver|daum|; wv))",
    id: "webview"
}, {
    // test webview
    test: "webview",
    id: "webview"
}], Wu = [{
    test: "windows phone",
    id: "windows phone"
}, {
    test: "windows 2000",
    id: "window",
    versionAlias: "5.0"
}, {
    test: "windows nt",
    id: "window"
}, {
    test: "win32|windows",
    id: "window"
}, {
    test: "iphone|ipad|ipod",
    id: "ios",
    versionTest: "iphone os|cpu os"
}, {
    test: "macos|macintel|mac os x",
    id: "mac"
}, {
    test: "android|linux armv81",
    id: "android"
}, {
    test: "tizen",
    id: "tizen"
}, {
    test: "webos|web0s",
    id: "webos"
}];
function Vu(e) {
    return !!Oi(Xu, e).preset;
}
function Kg(e) {
    var t = Zu(e), n = !!/mobi/g.exec(t), i = {
        name: "unknown",
        version: "-1",
        majorVersion: -1,
        webview: Vu(t),
        chromium: !1,
        chromiumVersion: "-1",
        webkit: !1,
        webkitVersion: "-1"
    }, l = {
        name: "unknown",
        version: "-1",
        majorVersion: -1
    }, r = Oi(Ll, t), s = r.preset, m = r.version, h = Oi(Wu, t), p = h.preset, b = h.version, g = Oi(Gu, t);
    if (i.chromium = !!g.preset, i.chromiumVersion = g.version, !i.chromium) {
        var Z = Oi(Yl, t);
        i.webkit = !!Z.preset, i.webkitVersion = Z.version;
    }
    return p && (l.name = p.id, l.version = b, l.majorVersion = parseInt(b, 10)), s && (i.name = s.id, i.version = m, i.webview && l.name === "ios" && i.name !== "safari" && (i.webview = !1)), i.majorVersion = parseInt(i.version, 10), {
        browser: i,
        os: l,
        isMobile: n,
        isHints: !1
    };
}
function Iu(e) {
    var t = navigator.userAgentData, n = (t.uaList || t.brands).slice(), i = e && e.fullVersionList, l = t.mobile || !1, r = n[0], s = (e && e.platform || t.platform || navigator.platform).toLowerCase(), m = {
        name: r.brand,
        version: r.version,
        majorVersion: -1,
        webkit: !1,
        webkitVersion: "-1",
        chromium: !1,
        chromiumVersion: "-1",
        webview: !!Ui(Xu, n).brand || Vu(Zu())
    }, h = {
        name: "unknown",
        version: "-1",
        majorVersion: -1
    };
    m.webkit = !m.chromium && gr(Yl, function (G) {
        return xu(n, G);
    });
    var p = Ui(Gu, n);
    if (m.chromium = !!p.brand, m.chromiumVersion = p.version, !m.chromium) {
        var b = Ui(Yl, n);
        m.webkit = !!b.brand, m.webkitVersion = b.version;
    }
    var g = yu(Wu, function (G) {
        return new RegExp("" + G.test, "g").exec(s);
    });
    if (h.name = g ? g.id : "", e && (h.version = e.platformVersion), i && i.length) {
        var Z = Ui(Ll, i);
        m.name = Z.brand || m.name, m.version = Z.version || m.version;
    } else {
        var y = Ui(Ll, n);
        m.name = y.brand || m.name, m.version = y.brand && e ? e.uaFullVersion : y.version;
    }
    return m.webkit && (h.name = l ? "ios" : "mac"), h.name === "ios" && m.webview && (m.version = "-1"), h.version = Rl(h.version), m.version = Rl(m.version), h.majorVersion = parseInt(h.version, 10), m.majorVersion = parseInt(m.version, 10), {
        browser: m,
        os: h,
        isMobile: l,
        isHints: !0
    };
}
function Tg(e) {
    return vu() ? navigator.userAgentData.getHighEntropyValues(["architecture", "model", "platform", "platformVersion", "uaFullVersion", "fullVersionList"]).then(function (t) {
        var n = Iu(t);
        return e && e(n), n;
    }) : (e && e(Kl()), typeof Promise > "u" || !Promise ? null : Promise.resolve(Kl()));
}
function Kl(e) {
    return typeof e > "u" && vu() ? Iu() : Kg(e);
}
const oi = Kl();
let ku = oi.os.name === "mac", Cu = oi.os.name === "ios";
oi.os.name;
oi.os.name;
oi.browser.name;
oi.browser.name;
oi.browser.name;
Tg((e) => {
    ku = e.os.name === "mac", Cu = e.os.name === "ios", e.os.name, e.os.name, e.browser.name, e.browser.name, e.browser.name;
});
const Zr = () => ku || Cu;
function Hg(e) {
    const t = Zr() ? "Meta" : "Control";
    return e.trim().split(" ").map((n) => {
        let i = n.split(/\b\+/), l = i.pop();
        return i = i.map((r) => r === "$mod" ? t : r), [i, l];
    });
}
const D = {
    edit: "edit",
    stop: "stop",
    search: "search",
    undo: "undo",
    redo: "redo",
    addTable: "addTable",
    addColumn: "addColumn",
    removeTable: "removeTable",
    removeColumn: "removeColumn",
    primaryKey: "primaryKey",
    selectAllTable: "selectAllTable",
    selectAllColumn: "selectAllColumn",
    relationshipZeroOne: "relationshipZeroOne",
    relationshipZeroN: "relationshipZeroN",
    relationshipOneOnly: "relationshipOneOnly",
    relationshipOneN: "relationshipOneN",
    tableProperties: "tableProperties",
    zoomIn: "zoomIn",
    zoomOut: "zoomOut"
}, Ng = Object.values(D), zg = () => ({
    [D.edit]: [{ shortcut: "Enter" }],
    [D.stop]: [{ shortcut: "Escape" }],
    [D.search]: [
        { shortcut: "$mod+KeyK", preventDefault: !0, stopPropagation: !0 }
    ],
    [D.undo]: [
        { shortcut: "$mod+KeyZ", preventDefault: !0, stopPropagation: !0 }
    ],
    [D.redo]: [
        {
            shortcut: "$mod+Shift+KeyZ",
            preventDefault: !0,
            stopPropagation: !0
        }
    ],
    [D.addTable]: [{ shortcut: "Alt+KeyN", preventDefault: !0 }],
    [D.addColumn]: [{ shortcut: "Alt+Enter", preventDefault: !0 }],
    [D.removeTable]: [
        { shortcut: "$mod+Backspace", preventDefault: !0 },
        { shortcut: "$mod+Delete", preventDefault: !0 }
    ],
    [D.removeColumn]: [
        { shortcut: "Alt+Backspace", preventDefault: !0 },
        { shortcut: "Alt+Delete", preventDefault: !0 }
    ],
    [D.primaryKey]: [{ shortcut: "Alt+KeyK", preventDefault: !0 }],
    [D.selectAllTable]: [
        { shortcut: "$mod+Alt+KeyA", preventDefault: !0 }
    ],
    [D.selectAllColumn]: [
        { shortcut: "Alt+KeyA", preventDefault: !0 }
    ],
    [D.relationshipZeroOne]: [
        { shortcut: "$mod+Alt+Digit1", preventDefault: !0 }
    ],
    [D.relationshipZeroN]: [
        { shortcut: "$mod+Alt+Digit2", preventDefault: !0 }
    ],
    [D.relationshipOneOnly]: [
        { shortcut: "$mod+Alt+Digit3", preventDefault: !0 }
    ],
    [D.relationshipOneN]: [
        { shortcut: "$mod+Alt+Digit4", preventDefault: !0 }
    ],
    [D.tableProperties]: [
        { shortcut: "Alt+Space", preventDefault: !0 }
    ],
    [D.zoomIn]: [
        { shortcut: "$mod+Equal", preventDefault: !0, stopPropagation: !0 }
    ],
    [D.zoomOut]: [
        { shortcut: "$mod+Minus", preventDefault: !0, stopPropagation: !0 }
    ]
}), Xn = {
    Shift: "Shift",
    Meta: "Meta",
    Alt: "Alt",
    Control: "Control"
}, wg = {
    [Xn.Shift]: "⇧",
    // Shift
    [Xn.Meta]: "⌘",
    // Cmd
    [Xn.Alt]: "⌥",
    // Option
    [Xn.Control]: "⌃"
    // Ctrl
}, Jg = {
    [Xn.Shift]: "Shift",
    [Xn.Meta]: "Cmd",
    [Xn.Alt]: "Alt",
    [Xn.Control]: "Ctrl"
};
function Mg(e) {
    return (Zr() ? wg : Jg)[e] ?? e;
}
function Fg(e) {
    return e.startsWith("Key") ? e.slice(3) : e.startsWith("Digit") ? e.slice(5) : e === "Backspace" ? "⌫" : e === "Escape" ? "ESC" : e === "Equal" ? "Plus" : e;
}
function Su(e) {
    return e ? Hg(e).map(([t, n]) => [
        t.map(Mg),
        Fg(n)
    ]) : [];
}
function un(e) {
    return Zr() ? e.metaKey : e.ctrlKey;
}
function ra(e) {
    return Su(e).map(([t, n]) => [...t, n].join(" + ")).join(" ");
}
function ao(e, t) {
    const n = vg(e), i = Gg(n, t), l = Se(zg(), { shallow: !0 }), r = new cn(), s = new cn(), m = new pu();
    return Object.freeze({
        ...n,
        actions: y1,
        store: i,
        keyBindingMap: l,
        shortcut$: r,
        keydown$: s,
        emitter: m
    });
}
const Li = Nd({}), se = (e, t) => Hd(e, {
    ...Li,
    value: t ?? Li.value
});
function lo(e) {
    e.store.dispatchSync(Z1()), e.store.destroy(), e.keydown$.complete(), e.shortcut$.complete(), e.emitter.clear();
}
function Ug(e) {
    return {
        path: jg(e.start, e.end),
        line: Eg(e.start, e.end)
    };
}
function jg(e, t) {
    const n = {
        start: {
            x1: e.x,
            y1: e.y,
            x2: e.x,
            y2: e.y
        },
        end: {
            x1: t.x,
            y1: t.y,
            x2: t.x,
            y2: t.y
        }
    }, i = {
        M: { x: 0, y: 0 },
        L: { x: 0, y: 0 },
        Q: { x: 0, y: 0 },
        d() {
            const r = this.M.x - this.L.x, s = this.M.y - this.L.y, m = r / 2, h = s / 2, p = Math.abs(s) <= Math.abs(r), b = Math.abs(p ? h : m), g = Pg(b), Z = g(!0), y = g(!1), G = Z(r), X = Z(s), W = y(r), V = y(s), C = p ? this.M.x - m + G : this.M.x, H = p ? this.M.y : this.M.y - h + X, L = p ? this.L.x + m + W : this.L.x, E = p ? this.L.y : this.L.y + h + V;
            return [
                [
                    { x: this.M.x, y: this.M.y },
                    { x: C, y: H }
                ],
                [
                    { x: C, y: H },
                    { x: L, y: E }
                ],
                [
                    { x: L, y: E },
                    { x: this.L.x, y: this.L.y }
                ]
            ];
        }
    };
    let l = 1;
    return e.direction === Me.left || e.direction === Me.right ? (e.direction === Me.left && (l *= -1), n.start.x2 = e.x + l * bi, n.start.x1 += l * fi, i.M.x = n.start.x2, i.M.y = e.y) : (e.direction === Me.top || e.direction === Me.bottom) && (e.direction === Me.top && (l *= -1), n.start.y2 = e.y + l * bi, n.start.y1 += l * fi, i.M.x = e.x, i.M.y = n.start.y2), l = 1, t.direction === Me.left || t.direction === Me.right ? (t.direction === Me.left && (l *= -1), n.end.x2 = t.x + l * bi, n.end.x1 += l * fi, i.L.x = n.end.x2, i.L.y = t.y) : (t.direction === Me.top || t.direction === Me.bottom) && (t.direction === Me.top && (l *= -1), n.end.y2 = t.y + l * bi, n.end.y1 += l * fi, i.L.x = t.x, i.L.y = n.end.y2), {
        line: n,
        path: i
    };
}
function Eg(e, t) {
    const n = {
        start: {
            base: {
                x1: e.x,
                y1: e.y,
                x2: e.x,
                y2: e.y
            },
            base2: {
                x1: e.x,
                y1: e.y,
                x2: e.x,
                y2: e.y
            },
            center: {
                x1: e.x,
                y1: e.y,
                x2: e.x,
                y2: e.y
            },
            center2: {
                x1: e.x,
                y1: e.y,
                x2: e.x,
                y2: e.y
            }
        },
        end: {
            base: {
                x1: t.x,
                y1: t.y,
                x2: t.x,
                y2: t.y
            },
            base2: {
                x1: t.x,
                y1: t.y,
                x2: t.x,
                y2: t.y
            },
            left: {
                x1: t.x,
                y1: t.y,
                x2: t.x,
                y2: t.y
            },
            center: {
                x1: t.x,
                y1: t.y,
                x2: t.x,
                y2: t.y
            },
            center2: {
                x1: t.x,
                y1: t.y,
                x2: t.x,
                y2: t.y
            },
            right: {
                x1: t.x,
                y1: t.y,
                x2: t.x,
                y2: t.y
            }
        }
    }, i = {
        cx: t.x,
        cy: t.y
    }, l = {
        cx: e.x,
        cy: e.y
    };
    let r = 1;
    return e.direction === Me.left || e.direction === Me.right ? (e.direction === Me.left && (r *= -1), n.start.base.x1 = n.start.base.x2 += r * Je, n.start.base2.x1 = n.start.base2.x2 += r * (ye + Je), n.start.center.x1 = n.start.base.x1, n.start.base.y1 -= ye, n.start.base.y2 += ye, n.start.base2.y1 -= ye, n.start.base2.y2 += ye, n.start.center2.x1 += r * (Je + Je + 3), l.cx += r * To) : (e.direction === Me.top || e.direction === Me.bottom) && (e.direction === Me.top && (r *= -1), n.start.base.y1 = n.start.base.y2 += r * Je, n.start.base2.y1 = n.start.base2.y2 += r * (ye + Je), n.start.center.y1 = n.start.base.y1, n.start.base.x1 -= ye, n.start.base.x2 += ye, n.start.base2.x1 -= ye, n.start.base2.x2 += ye, n.start.center2.y1 += r * (Je + Je + 3), l.cy += r * To), r = 1, t.direction === Me.left || t.direction === Me.right ? (t.direction === Me.left && (r *= -1), n.end.base.x1 = n.end.base.x2 += r * Je, n.end.base2.x1 = n.end.base2.x2 += r * (ye + Je), n.end.center.x1 = n.end.left.x1 = n.end.right.x1 = n.end.base.x1, n.end.base.y1 -= ye, n.end.base.y2 += ye, n.end.base2.y1 -= ye, n.end.base2.y2 += ye, n.end.left.y2 += ye, n.end.right.y2 -= ye, n.end.center2.x1 += r * (Je + Je + 3), i.cx += r * To) : (t.direction === Me.top || t.direction === Me.bottom) && (t.direction === Me.top && (r *= -1), n.end.base.y1 = n.end.base.y2 += r * Je, n.end.base2.y1 = n.end.base2.y2 += r * (ye + Je), n.end.center.y1 = n.end.left.y1 = n.end.right.y1 = n.end.base.y1, n.end.base.x1 -= ye, n.end.base.x2 += ye, n.end.base2.x1 -= ye, n.end.base2.x2 += ye, n.end.left.x2 += ye, n.end.right.x2 -= ye, n.end.center2.y1 += r * (Je + Je + 3), i.cy += r * To), {
        line: n,
        circle: i,
        startCircle: l
    };
}
function Pg(e) {
    return (t) => (n) => n < 0 ? (t ? -1 : 1) * e : (t ? 1 : -1) * e;
}//FLEXYGO CHANGES
//change strokeWidth
const Bg = ({ path: e, line: t }) => it`
    <line
      x1=${e.line.end.x1} y1=${e.line.end.y1}
      x2=${e.line.end.x2} y2=${e.line.end.y2}
      stroke-width="${measures.relationship.stroke_width}"
    ></line>
    <circle
      cx=${t.circle.cx} cy=${t.circle.cy} r="${measures.relationship.circle_ratio}"
      fill-opacity="0.0"
      stroke-width="${measures.relationship.stroke_width}"
    ></circle>
    <line
      x1=${t.line.end.base.x1} y1=${t.line.end.base.y1}
      x2=${t.line.end.base.x2} y2=${t.line.end.base.y2}
      stroke-width="${measures.relationship.stroke_width}"
    ></line>
    <line
      x1=${t.line.end.left.x1} y1=${t.line.end.left.y1}
      x2=${t.line.end.left.x2} y2=${t.line.end.left.y2}
      stroke-width="${measures.relationship.stroke_width}"
    ></line>
    <line
      x1=${t.line.end.center.x1} y1=${t.line.end.center.y1}
      x2=${t.line.end.center.x2} y2=${t.line.end.center.y2}
      stroke-width="${measures.relationship.stroke_width}"
    ></line>
    <line
      x1=${t.line.end.right.x1} y1=${t.line.end.right.y1}
      x2=${t.line.end.right.x2} y2=${t.line.end.right.y2}
      stroke-width="${measures.relationship.stroke_width}"
    ></line>
  `, Og = ({ path: e, line: t }) => it`
    <line
      x1=${e.line.end.x1} y1=${e.line.end.y1}
      x2=${e.line.end.x2} y2=${e.line.end.y2}
      stroke-width="${measures.relationship.stroke_width}"
    ></line>
    <circle
      cx=${t.circle.cx} cy=${t.circle.cy} r="${measures.relationship.circle_ratio}"
      fill-opacity="0.0"
      stroke-width="${measures.relationship.stroke_width}"
    ></circle>
    <line
      x1=${t.line.end.base.x1} y1=${t.line.end.base.y1}
      x2=${t.line.end.base.x2} y2=${t.line.end.base.y2}
      stroke-width="${measures.relationship.stroke_width}"
    ></line>
    <line
      x1=${t.line.end.center.x1} y1=${t.line.end.center.y1}
      x2=${t.line.end.center.x2} y2=${t.line.end.center.y2}
      stroke-width="${measures.relationship.stroke_width}"
    ></line>
  `, Ag = ({ path: e, line: t }) => {
        return it`
    <line
      x1=${e.line.end.x1} y1=${e.line.end.y1}
      x2=${e.line.end.x2} y2=${e.line.end.y2}
      stroke-width="${measures.relationship.stroke_width}"
    ></line>
    <circle
      cx=${t.circle.cx} cy=${t.circle.cy} r="6"
      fill-opacity="0.0"
      stroke-width="${measures.relationship.stroke_width}"
    ></circle>
    <line
      x1=${t.line.end.left.x1} y1=${t.line.end.left.y1}
      x2=${t.line.end.left.x2} y2=${t.line.end.left.y2}
      stroke-width="${measures.relationship.stroke_width}"
    ></line>
    <line
      x1=${t.line.end.center.x1} y1=${t.line.end.center.y1}
      x2=${t.line.end.center.x2} y2=${t.line.end.center.y2}
      stroke-width="${measures.relationship.stroke_width}"
    ></line>
    <line
      x1=${t.line.end.right.x1} y1=${t.line.end.right.y1}
      x2=${t.line.end.right.x2} y2=${t.line.end.right.y2}
      stroke-width="${measures.relationship.stroke_width}"
    ></line>
  `}, Qg = ({ path: e, line: t }) => it`
    <line
      x1=${e.line.end.x1} y1=${e.line.end.y1}
      x2=${e.line.end.x2} y2=${e.line.end.y2}
      stroke-width="${measures.relationship.stroke_width}"
    ></line>
    <line
      x1=${t.line.end.base.x1} y1=${t.line.end.base.y1}
      x2=${t.line.end.base.x2} y2=${t.line.end.base.y2}
      stroke-width="${measures.relationship.stroke_width}"
    ></line>
    <line
      x1=${t.line.end.base2.x1} y1=${t.line.end.base2.y1}
      x2=${t.line.end.base2.x2} y2=${t.line.end.base2.y2}
      stroke-width="${measures.relationship.stroke_width}"
    ></line>
    <line
      x1=${t.line.end.center2.x1} y1=${t.line.end.center2.y1}
      x2=${t.line.end.center2.x2} y2=${t.line.end.center2.y2}
      stroke-width="${measures.relationship.stroke_width}"
    ></line>
  `, Dg = ({ path: e, line: t }) => it`
    <line
      x1=${e.line.end.x1} y1=${e.line.end.y1}
      x2=${e.line.end.x2} y2=${e.line.end.y2}
      stroke-width="${measures.relationship.stroke_width}"
    ></line>
    <line
      x1=${t.line.end.base.x1} y1=${t.line.end.base.y1}
      x2=${t.line.end.base.x2} y2=${t.line.end.base.y2}
      stroke-width="${measures.relationship.stroke_width}"
    ></line>
    <line
      x1=${t.line.end.left.x1} y1=${t.line.end.left.y1}
      x2=${t.line.end.left.x2} y2=${t.line.end.left.y2}
      stroke-width="${measures.relationship.stroke_width}"
    ></line>
    <line
      x1=${t.line.end.center2.x1} y1=${t.line.end.center2.y1}
      x2=${t.line.end.center2.x2} y2=${t.line.end.center2.y2}
      stroke-width="${measures.relationship.stroke_width}"
    ></line>
    <line
      x1=${t.line.end.right.x1} y1=${t.line.end.right.y1}
      x2=${t.line.end.right.x2} y2=${t.line.end.right.y2}
      stroke-width="${measures.relationship.stroke_width}"
    ></line>
  `, _g = ({ path: e, line: t }) => it`
    <line
      x1=${e.line.end.x1} y1=${e.line.end.y1}
      x2=${e.line.end.x2} y2=${e.line.end.y2}
      stroke-width="${measures.relationship.stroke_width}"
    ></line>
    <line
      x1=${t.line.end.base.x1} y1=${t.line.end.base.y1}
      x2=${t.line.end.base.x2} y2=${t.line.end.base.y2}
      stroke-width="${measures.relationship.stroke_width}"
    ></line>
    <line
      x1=${t.line.end.center2.x1} y1=${t.line.end.center2.y1}
      x2=${t.line.end.center2.x2} y2=${t.line.end.center2.y2}
      stroke-width="${measures.relationship.stroke_width}"
    ></line>
  `, qg = ({ path: e, line: t }) => it`
    <line
      x1=${e.line.end.x1} y1=${e.line.end.y1}
      x2=${e.line.end.x2} y2=${e.line.end.y2}
      stroke-width="${measures.relationship.stroke_width}"
    ></line>
    <line
      x1=${t.line.end.left.x1} y1=${t.line.end.left.y1}
      x2=${t.line.end.left.x2} y2=${t.line.end.left.y2}
      stroke-width="${measures.relationship.stroke_width}"
    ></line>
    <line
      x1=${t.line.end.center2.x1} y1=${t.line.end.center2.y1}
      x2=${t.line.end.center2.x2} y2=${t.line.end.center2.y2}
      stroke-width="${measures.relationship.stroke_width}"
    ></line>
    <line
      x1=${t.line.end.right.x1} y1=${t.line.end.right.y1}
      x2=${t.line.end.right.x2} y2=${t.line.end.right.y2}
      stroke-width="${measures.relationship.stroke_width}"
    ></line>
  `, ey = {
        1: Bg,
        [$e.ZeroOne]: Og,
        [$e.ZeroN]: Ag,
        [$e.OneOnly]: Qg,
        [$e.OneN]: Dg,
        32: _g,
        64: qg
    };
function ty(e, t) {
    const n = ey[e];
    return (n == null ? void 0 : n(t)) ?? null;
}
const ny = (e, t) => () => {
    const { relationship: n, strokeWidth: i } = e, l = Ug(n), { path: r, line: s } = l, m = r.path.d(), h = ty(n.relationshipType, l);
    //FLEXYGO CHANGES
    //change the dash array and stroke width
    return it`
      ${m.map(([p, b]) => it`
            <line
              x1=${p.x} y1=${p.y}
              x2=${b.x} y2=${b.y}
              stroke-dasharray=${measures.relationship.dash_array}
              stroke-width=${i}
              fill="transparent"
            ></line>
          `)}
      <line
        x1=${r.line.start.x1} y1=${r.line.start.y1}
        x2=${r.line.start.x2} y2=${r.line.start.y2}
        stroke-width="${measures.relationship.stroke_width}"
      ></line>
      <line
        x1=${s.line.start.base.x1} y1=${s.line.start.base.y1}
        x2=${s.line.start.base.x2} y2=${s.line.start.base.y2}
        stroke-width="${measures.relationship.stroke_width}"
      ></line>
      ${it`
            <line
              x1=${s.line.start.center2.x1} y1=${s.line.start.center2.y1}
              x2=${s.line.start.center2.x2} y2=${s.line.start.center2.y2}
              stroke-width="${measures.relationship.stroke_width}"
            ></line>
      `}
      ${h}
    `;
}, iy = N`
  position: absolute;
  top: 0;
  left: 0;
  overflow: visible;

  .relationship {
    stroke: var(--key-fk);
  }

  .relationship.identification {
    stroke: var(--key-pfk);
  }

  .relationship:hover {
    stroke: var(--relationship-hover);
  }
`, Ru = (e, t) => {
        const n = se(t), i = (r) => {
            const { store: s } = n.value;
            s.dispatch(os({
                columnIds: [
                    ...r.start.columnIds,
                    ...r.end.columnIds
                ]
            }));
        }, l = () => {
            const { store: r } = n.value;
            r.dispatch(os({ columnIds: [] }));
        };
        return () => {
            const { store: r } = n.value, { settings: { width: s, height: m }, doc: { relationshipIds: h }, collections: p } = r.state, b = $(p).collection("relationshipEntities").selectByIds(h);
            //FLEXYGO CHANGES
            //change strokeWidth
            return it`
      <svg
        class=${[iy, e.class]}
        style=${{
                    width: `${s}px`,
                    height: `${m}px`,
                    "min-width": `${s}px`,
                    "min-height": `${m}px`
                }}
      >
        ${et(b, (g) => g.id, (g) => it`
            <g
              class=${[
                        "relationship",
                        { identification: g.identification }
                    ]}
              data-id=${g.id}
              @mouseenter=${() => i(g)}
              @mouseleave=${l}
            >
              <${ny}
                relationship=${g}
                strokeWidth=${measures.relationship.stroke_width}
              />
            </g>
          `)}
      </svg>
    `;
        };
    };
function Ge() {
    const e = /* @__PURE__ */ new Set(), t = (...n) => {
        n.forEach((i) => e.add(i));
    };
    return x1(() => {
        Array.from(e).forEach((n) => G1(n) ? n() : n.unsubscribe()), e.clear();
    }), {
        addUnsubscribe: t
    };
}
function oy(e, t) {
    const n = {
        path: {
            path: {
                M: { x: 0, y: 0 },
                L: { x: 0, y: 0 },
                Q: { x: 0, y: 0 },
                d() {
                    return `M ${this.M.x} ${this.M.y} L ${this.L.x} ${this.L.y}`;
                }
            },
            line: {
                start: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 0
                }
            }
        },
        line: {
            start: {
                base: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 0
                },
                base2: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 0
                },
                center: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 0
                },
                center2: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 0
                }
            }
        }
    };
    if (!t.start)
        return n;
    const i = ay(e, t);
    return n.path = ly(i, t), n.line = ry(i, t), n;
}
function ay(e, t) {
    let n = oe.bottom;
    if (!t.start)
        return n;
    const i = $(e.collections).collection("tableEntities").selectById(t.start.tableId);
    if (!i)
        return n;
    const l = X1(e, i);
    let r = as(l.bottom, t.end);
    return t.start.x = l.bottom.x, t.start.y = l.bottom.y, W1.forEach((s) => {
        const m = s, h = as(l[m], t.end);
        r <= h || (r = h, n = m, t.start && (t.start.x = l[m].x, t.start.y = l[m].y));
    }), n;
}
function ly(e, t) {
    const n = {
        start: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0
        }
    }, i = {
        M: { x: 0, y: 0 },
        L: { x: 0, y: 0 },
        Q: { x: 0, y: 0 },
        d() {
            return `M ${this.M.x} ${this.M.y} L ${this.L.x} ${this.L.y}`;
        }
    };
    if (t.start) {
        n.start.x1 = t.start.x, n.start.y1 = t.start.y, n.start.x2 = t.start.x, n.start.y2 = t.start.y;
        let l = 1;
        e === oe.left || e === oe.right ? (e === oe.left && (l *= -1), n.start.x2 = t.start.x + l * bi, n.start.x1 += l * fi, i.M.x = n.start.x2, i.M.y = t.start.y) : (e === oe.top || e === oe.bottom) && (e === oe.top && (l *= -1), n.start.y2 = t.start.y + l * bi, n.start.y1 += l * fi, i.M.x = t.start.x, i.M.y = n.start.y2);
    }
    return i.L.x = t.end.x, i.L.y = t.end.y, {
        path: i,
        line: n
    };
}
function ry(e, t) {
    const n = {
        start: {
            base: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 0
            },
            base2: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 0
            },
            center: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 0
            },
            center2: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 0
            }
        }
    };
    if (!t.start)
        return n;
    n.start.base.x1 = n.start.base2.x1 = n.start.center.x1 = n.start.center2.x1 = t.start.x, n.start.base.x2 = n.start.base2.x2 = n.start.center.x2 = n.start.center2.x2 = t.start.x, n.start.base.y1 = n.start.base2.y1 = n.start.center.y1 = n.start.center2.y1 = t.start.y, n.start.base.y2 = n.start.base2.y2 = n.start.center.y2 = n.start.center2.y2 = t.start.y;
    let i = 1;
    return e === oe.left || e === oe.right ? (e === oe.left && (i *= -1), n.start.base.x1 = n.start.base.x2 += i * Je, n.start.base2.x1 = n.start.base2.x2 += i * (ye + Je), n.start.center.x1 = n.start.base.x1, n.start.base.y1 -= ye, n.start.base.y2 += ye, n.start.base2.y1 -= ye, n.start.base2.y2 += ye, n.start.center2.x1 += i * (Je + Je + 3)) : (e === oe.top || e === oe.bottom) && (e === oe.top && (i *= -1), n.start.base.y1 = n.start.base.y2 += i * Je, n.start.base2.y1 = n.start.base2.y2 += i * (ye + Je), n.start.center.y1 = n.start.base.y1, n.start.base.x1 -= ye, n.start.base.x2 += ye, n.start.base2.x1 -= ye, n.start.base2.x2 += ye, n.start.center2.y1 += i * (Je + Je + 3)), n;
}
const cy = N`
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  stroke: var(--key-fk);
  overflow: visible;
`, sy = (e, t) => {
        const n = se(t), { addUnsubscribe: i } = Ge();
        return Te(() => {
            const l = e.root.value, { store: r } = n.value;
            i(st(l, "mousemove").subscribe((s) => {
                s.preventDefault();
                const { x: m, y: h } = l.getBoundingClientRect();
                r.dispatch(V1({
                    x: s.clientX - m,
                    y: s.clientY - h
                }));
            }));
        }), () => {
            const { store: l } = n.value, { settings: { width: r, height: s } } = l.state, { path: m, line: h } = oy(l.state, e.draw);
            return it`
      <svg
        class=${cy}
        style=${{
                    width: `${r}px`,
                    height: `${s}px`,
                    "min-width": `${r}px`,
                    "min-height": `${s}px`
                }}
      >
        <g>
          <path
            d=${m.path.d()}
            stroke-dasharray="10"
            stroke-width="${measures.relationship.stroke_width}"
            fill="transparent"
          ></path>
          <line
            x1=${m.line.start.x1} y1=${m.line.start.y1}
            x2=${m.line.start.x2} y2=${m.line.start.y2}
            stroke-width="${measures.relationship.stroke_width}"
          ></line>
          <line
            x1=${h.start.base.x1} y1=${h.start.base.y1}
            x2=${h.start.base.x2} y2=${h.start.base.y2}
            stroke-width="${measures.relationship.stroke_width}"
          ></line>
          <line
            x1=${h.start.center2.x1} y1=${h.start.center2.y1}
            x2=${h.start.center2.x2} y2=${h.start.center2.y2}
            stroke-width="${measures.relationship.stroke_width}"
          ></line>
        </g>
      </svg>
    `;
        };
    }, bn = (e) => N`
  font-size: var(--font-size-${e});
  letter-spacing: var(--letter-spacing-${e});
  line-height: var(--line-height-${e});
`, Lu = bn(1), vr = bn(2), Yu = bn(3);
bn(4);
const Tl = bn(5), xr = bn(6), dy = bn(7), uy = bn(8), my = bn(9), hy = N`
  ${vr};
  font-weight: var(--font-weight-regular);
`, py = N`
  ${Lu};
  font-weight: var(--font-weight-regular);
`, Lt = {
        normal: hy,
        paragraph: py
    };
function by() {
    const e = document.createElement("style");
    return e.textContent = /* css */
        `
    :host {
      --font-size-1: 12px;
      --font-size-2: 14px;
      --font-size-3: 16px;
      --font-size-4: 18px;
      --font-size-5: 20px;
      --font-size-6: 24px;
      --font-size-7: 28px;
      --font-size-8: 35px;
      --font-size-9: 60px;
      --letter-spacing-1: 0em;
      --letter-spacing-2: 0em;
      --letter-spacing-3: 0em;
      --letter-spacing-4: -0.0025em;
      --letter-spacing-5: -0.005em;
      --letter-spacing-6: -0.00625em;
      --letter-spacing-7: -0.0075em;
      --letter-spacing-8: -0.01em;
      --letter-spacing-9: -0.025em;
      --line-height-1: 16px;
      --line-height-2: 20px;
      --line-height-3: 24px;
      --line-height-4: 26px;
      --line-height-5: 28px;
      --line-height-6: 30px;
      --line-height-7: 36px;
      --line-height-8: 40px;
      --line-height-9: 60px;
      --font-weight-light: 300;
      --font-weight-regular: 400;
      --font-weight-medium: 500;
      --font-weight-bold: 700;
    }
  `, e;
}
const Ya = N`
  position: absolute;
  background-color: var(--table-background);
  padding: ${ni}px 0;
  border-radius: 6px;
  border: 1px solid var(--table-border);
  fill: transparent;
  color: transparent;
  ${Lt.paragraph};

  &:hover {
    fill: var(--foreground);
    color: var(--foreground);
  }

  &[data-selected] {
    border: 1px solid var(--table-select);
  }

  .column-row-move {
    transition: transform 0.3s;
  }
`, Gr = N`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0 ${ni}px;
`, Xr = N`
  position: absolute;
  top: -${ni + 1}px;
  left: 0;
  width: 100%;
  min-height: 4px;
  border-radius: 6px 6px 0 0;
  cursor: pointer;
`, Ku = N`
  display: flex;
  height: ${zd}px;
  justify-content: flex-end;
  margin-bottom: ${I1}px;
  cursor: move;

  & > .icon {
    cursor: pointer;
  }

  & > .icon:last-child {
    margin-left: ${k1}px;
  }

  & > .icon:hover {
    fill: var(--active);
    color: var(--active);
  }
`, Tu = N`
  display: flex;
  height: ${C1}px;
  align-items: center;
`;
function fy(e) {
    const t = e.target;
    t && (t.value = rr(t.value));
}
function qn(e) {
    e.preventDefault();
}
function Ai(e) {
    e.stopPropagation();
}
function Yi(e) {
    return e instanceof MouseEvent;
}
const Wr = {
    focus: "@dineug/erd-editor/internal-focus",
    forceFocus: "@dineug/erd-editor/internal-force-focus",
    forwardMoveStart: "@dineug/erd-editor/internal-forward-move-start"
};
function Vr(e, t) {
    function n(i, l) {
        return new CustomEvent(e, {
            detail: i,
            ...t,
            ...l
        });
    }
    return n.toString = () => `${e}`, n.type = e, n;
}
const Ki = Vr(Wr.focus), Hu = Vr(Wr.forceFocus), gy = Vr(Wr.forwardMoveStart, { bubbles: !0, composed: !0 }), yy = st(window, "keyup"), Zy = st(window, "mousedown"), vy = st(window, "mousemove"), Nu = st(window, "mouseup"), xy = st(window, "touchstart"), Gy = st(window, "touchmove"), Xy = st(window, "touchend"), Wy = Bf().pipe(bg()), Vy = st(window, gy.type).pipe(Dn((e) => e.detail.originEvent)), Iy = oo(Zy, xy, Vy), ky = oo(Nu, Xy);
let Zi = 0, vi = 0;
Iy.subscribe((e) => {
    Yi(e) ? (Zi = e.clientX, vi = e.clientY) : (Zi = e.touches[0].clientX, vi = e.touches[0].clientY);
});
const Cy = oo(vy.pipe(Dn((e) => {
    const t = e.clientX, n = e.clientY, i = t - Zi, l = n - vi;
    return Zi = t, vi = n, {
        event: e,
        movementX: i,
        movementY: l,
        x: t,
        y: n
    };
})), Gy.pipe(Ci((e) => e.touches.length === 1), Dn((e) => {
    const t = e.touches[0].clientX, n = e.touches[0].clientY, i = t - Zi, l = n - vi;
    return Zi = t, vi = n, {
        event: e,
        movementX: i,
        movementY: l,
        x: t,
        y: n
    };
}))), qt = Cy.pipe(uu(ky));
function zu(e, t) {
    const n = se(e), i = ({ event: r, movementX: s, movementY: m }) => {
        r.type === "mousemove" && r.preventDefault();
        const { store: h } = n.value;
        h.dispatch(wd(s, m));
    };
    return {
        onMoveStart: (r) => {
            const s = r.target;
            if (!s)
                return;
            const { store: m } = n.value;
            m.dispatch(Va(t.table.id, un(r))), !s.closest(".table-header-color") && !s.closest(".column-row") && !s.closest(".icon") && !s.closest(".input-padding") && qt.subscribe(i);
        }
    };
}
const Sy = N`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  word-break: break-all;
  color: var(--active);
  font-weight: var(--font-weight-bold);

  &.isEmptyName {
    color: var(--placeholder);
  }
`, Ry = (e, t) => {
        const n = se(t), { onMoveStart: i } = zu(t, e), l = () => {
            const { store: s } = n.value, { settings: { zoomLevel: m } } = s.state;
            let h = Tl.toString();
            return m > 0.6 ? h = Tl.toString() : m > 0.5 ? h = xr.toString() : m > 0.4 ? h = dy.toString() : m > 0.3 ? h = uy.toString() : h = my.toString(), h;
        }, r = (s) => {
            const { emitter: m } = n.value;
            m.emit(La({
                x: s.clientX,
                y: s.clientY,
                color: e.table.ui.color
            }));
        };
        return () => {
            const { store: s } = n.value, { editor: m } = s.state, { table: h } = e, p = !!m.selectedMap[h.id], b = Qt(h, s.state), g = an(h), Z = ln(h.name.trim());
            //FLEXYGO CHANGES
            // change the width to 218
            b.width = 218;
            return I`
      <div
        class=${["table", Ya]}
        style=${{
                    top: `${h.ui.y}px`,
                    left: `${h.ui.x}px`,
                    "z-index": `${h.ui.zIndex}`,
                    width: `${b.width}px`,
                    height: `${g}px`
                }}
        ?data-selected=${p}
        data-id=${h.id}
        @mousedown=${i}
        @touchstart=${i}
      >
        <div class=${["headerContainer",Gr]}>
          <div
            class=${["table-header-color", Xr]}
            style=${{
                    "background-color": h.ui.color
                }}
          ></div>
        </div>
        <div
          class=${[
                    "scrollbar",
                    Sy,
                    l(),
                    { isEmptyName: Z }
                ]}
        >
          ${Z ? "unnamed" : h.name}
        </div>
      </div>
    `;
        };
    }, xi = 5, Ly = N`
  position: absolute;

  &.vertical {
    width: ${xi}px;
    height: 100%;
    cursor: ew-resize;
  }

  &.horizontal {
    width: 100%;
    height: ${xi}px;
    cursor: ns-resize;
  }

  &.edge {
    width: ${xi}px;
    height: ${xi}px;
  }
`, wt = {
        vertical: "vertical",
        horizontal: "horizontal",
        edge: "edge"
    }, Yy = (e, t) => {
        const n = () => {
            const r = e.top ?? 0;
            return r === 0 && e.type === wt.vertical ? r : r - xi / 2;
        }, i = () => {
            const r = e.left ?? 0;
            return r === 0 && e.type === wt.horizontal ? r : r - xi / 2;
        }, l = (r) => {
            var s;
            (s = e.onMousedown) == null || s.call(e, r), qt.subscribe((m) => {
                var h;
                m.event.type === "mousemove" && m.event.preventDefault(), (h = e.onMove) == null || h.call(e, m);
            });
        };
        return () => {
            const r = e.type === wt.vertical, s = e.type === wt.horizontal, m = e.type === wt.edge;
            return I`
      <div
        class=${[
                    "sash",
                    Ly,
                    {
                        vertical: r,
                        horizontal: s,
                        edge: m
                    }
                ]}
        style=${{
                    top: `${n()}px`,
                    left: `${i()}px`,
                    cursor: m ? e.cursor : ""
                }}
        @mousedown=${l}
      ></div>
    `;
        };
    }, pt = {
        left: "left",
        right: "right",
        top: "top",
        bottom: "bottom",
        lt: "lt",
        rt: "rt",
        lb: "lb",
        rb: "rb"
    }, Ky = (e, t) => [
        {
            type: wt.vertical,
            position: pt.left
        },
        {
            type: wt.vertical,
            position: pt.right,
            left: t
        },
        // {
        //   type: SashType.horizontal,
        //   position: Position.top,
        // },
        {
            type: wt.horizontal,
            position: pt.bottom,
            top: e
        },
        {
            type: wt.edge,
            position: pt.lt,
            cursor: "nwse-resize"
        },
        {
            type: wt.edge,
            position: pt.rt,
            cursor: "nesw-resize",
            left: t
        },
        {
            type: wt.edge,
            position: pt.lb,
            cursor: "nesw-resize",
            top: e
        },
        {
            type: wt.edge,
            position: pt.rb,
            cursor: "nwse-resize",
            top: e,
            left: t
        }
    ], Ty = (e, t) => {
        const n = se(t);
        let i = 0, l = 0;
        const r = ({ movementX: p, x: b }, g) => {
            const Z = Object.assign({ change: !1 }, e.memo.ui), y = p < 0 ? oe.left : oe.right, G = g === oe.left ? Z.width - p : Z.width + p;
            switch (y) {
                case oe.left:
                    rs < G && b < i && (g === oe.left && (Z.x += p), i += p, Z.width = G, Z.change = !0);
                    break;
                case oe.right:
                    rs < G && b > i && (g === oe.left && (Z.x += p), i += p, Z.width = G, Z.change = !0);
                    break;
            }
            return Z;
        }, s = ({ movementY: p, y: b }, g) => {
            const Z = Object.assign({ change: !1 }, e.memo.ui), y = p < 0 ? oe.top : oe.bottom, G = g === oe.top ? Z.height - p : Z.height + p;
            switch (y) {
                case oe.top:
                    cs < G && b < l && (g === oe.top && (Z.y += p), l += p, Z.height = G, Z.change = !0);
                    break;
                case oe.bottom:
                    cs < G && b > l && (g === oe.top && (Z.y += p), l += p, Z.height = G, Z.change = !0);
                    break;
            }
            return Z;
        }, m = (p, b) => {
            p.event.preventDefault();
            const { store: g } = n.value;
            let Z = null, y = null;
            switch (b) {
                case pt.left:
                case pt.right:
                    Z = r(p, b);
                    break;
                case pt.top:
                case pt.bottom:
                    y = s(p, b);
                    break;
                case pt.lt:
                    Z = r(p, oe.left), y = s(p, oe.top);
                    break;
                case pt.rt:
                    Z = r(p, oe.right), y = s(p, oe.top);
                    break;
                case pt.lb:
                    Z = r(p, oe.left), y = s(p, oe.bottom);
                    break;
                case pt.rb:
                    Z = r(p, oe.right), y = s(p, oe.bottom);
                    break;
            }
            Z != null && Z.change && (y != null && y.change) ? g.dispatch(cl({
                id: e.memo.id,
                x: Z.x,
                y: y.y,
                width: Z.width,
                height: y.height
            })) : Z != null && Z.change ? g.dispatch(cl({
                id: e.memo.id,
                x: Z.x,
                y: Z.y,
                width: Z.width,
                height: Z.height
            })) : y != null && y.change && g.dispatch(cl({
                id: e.memo.id,
                x: y.x,
                y: y.y,
                width: y.width,
                height: y.height
            }));
        }, h = (p, b) => {
            i = p.clientX, l = p.clientY, qt.subscribe((g) => m(g, b));
        };
        return () => I`${Ky(e.top, e.left).map((p) => I`
        <${Yy}
          ...${p}
          .onMousedown=${(b) => {
                h(b, p.position);
            }}
        />
      `)}`;
    };
function ca(e) {
    return Object.keys(e).reduce((t, n) => {
        const i = Reflect.get(e, n);
        return !ar(i) && i !== "" && Reflect.set(t, n, i), t;
    }, {});
}
const Hy = N`
  display: inline-flex;
  height: 100%;
  align-items: center;
`, Ny = N`
  transition: fill 0.15s;
`;
var zy = {
    prefix: "far",
    iconName: "copy",
    icon: [448, 512, [], "f0c5", "M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z"]
}, wy = {
    prefix: "fas",
    iconName: "table",
    icon: [512, 512, [], "f0ce", "M64 256V160H224v96H64zm0 64H224v96H64V320zm224 96V320H448v96H288zM448 256H288V160H448v96zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z"]
}, Jy = {
    prefix: "fas",
    iconName: "bars",
    icon: [448, 512, ["navicon"], "f0c9", "M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"]
}, My = {
    prefix: "fas",
    iconName: "key",
    icon: [512, 512, [128273], "f084", "M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V448h40c13.3 0 24-10.7 24-24V384h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z"]
}, Fy = {
    prefix: "fas",
    iconName: "arrow-pointer",
    icon: [320, 512, ["mouse-pointer"], "f245", "M0 55.2V426c0 12.2 9.9 22 22 22c6.3 0 12.4-2.7 16.6-7.5L121.2 346l58.1 116.3c7.9 15.8 27.1 22.2 42.9 14.3s22.2-27.1 14.3-42.9L179.8 320H297.9c12.2 0 22.1-9.9 22.1-22.1c0-6.3-2.7-12.3-7.4-16.5L38.6 37.9C34.3 34.1 28.9 32 23.2 32C10.4 32 0 42.4 0 55.2z"]
}, $y = Fy, Uy = {
    prefix: "fas",
    iconName: "rotate-left",
    icon: [512, 512, ["rotate-back", "rotate-backward", "undo-alt"], "f2ea", "M48.5 224H40c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H48.5z"]
}, jy = {
    prefix: "fas",
    iconName: "table-columns",
    icon: [512, 512, ["columns"], "f0db", "M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm64 64V416H224V160H64zm384 0H288V416H448V160z"]
}, Ey = jy, Py = {
    prefix: "fas",
    iconName: "file-import",
    icon: [512, 512, ["arrow-right-to-file"], "f56f", "M128 64c0-35.3 28.7-64 64-64H352V128c0 17.7 14.3 32 32 32H512V448c0 35.3-28.7 64-64 64H192c-35.3 0-64-28.7-64-64V336H302.1l-39 39c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l39 39H128V64zm0 224v48H24c-13.3 0-24-10.7-24-24s10.7-24 24-24H128zM512 128H384V0L512 128z"]
}, By = {
    prefix: "fas",
    iconName: "palette",
    icon: [512, 512, [127912], "f53f", "M512 256c0 .9 0 1.8 0 2.7c-.4 36.5-33.6 61.3-70.1 61.3H344c-26.5 0-48 21.5-48 48c0 3.4 .4 6.7 1 9.9c2.1 10.2 6.5 20 10.8 29.9c6.1 13.8 12.1 27.5 12.1 42c0 31.8-21.6 60.7-53.4 62c-3.5 .1-7 .2-10.6 .2C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"]
}, Oy = {
    prefix: "fas",
    iconName: "question",
    icon: [320, 512, [10067, 10068, 61736], "3f", "M80 160c0-35.3 28.7-64 64-64h32c35.3 0 64 28.7 64 64v3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74V320c0 17.7 14.3 32 32 32s32-14.3 32-32v-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7V160c0-70.7-57.3-128-128-128H144C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"]
}, Ay = {
    prefix: "fas",
    iconName: "code",
    icon: [640, 512, [], "f121", "M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"]
}, Qy = {
    prefix: "fas",
    iconName: "file-image",
    icon: [384, 512, [128443], "f1c5", "M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM64 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm152 32c5.3 0 10.2 2.6 13.2 6.9l88 128c3.4 4.9 3.7 11.3 1 16.5s-8.2 8.6-14.2 8.6H216 176 128 80c-5.8 0-11.1-3.1-13.9-8.1s-2.8-11.2 .2-16.1l48-80c2.9-4.8 8.1-7.8 13.7-7.8s10.8 2.9 13.7 7.8l12.8 21.4 48.3-70.2c3-4.3 7.9-6.9 13.2-6.9z"]
}, Dy = {
    prefix: "fas",
    iconName: "eye",
    icon: [576, 512, [128065], "f06e", "M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"]
}, _y = {
    prefix: "fas",
    iconName: "file-code",
    icon: [384, 512, [], "f1c9", "M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM153 289l-31 31 31 31c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L71 337c-9.4-9.4-9.4-24.6 0-33.9l48-48c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM265 255l48 48c9.4 9.4 9.4 24.6 0 33.9l-48 48c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l31-31-31-31c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"]
}, qy = {
    prefix: "fas",
    iconName: "gear",
    icon: [512, 512, [9881, "cog"], "f013", "M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"]
}, e2 = qy, t2 = {
    prefix: "fas",
    iconName: "rotate-right",
    icon: [512, 512, ["redo-alt", "rotate-forward"], "f2f9", "M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"]
}, n2 = {
    prefix: "fas",
    iconName: "location-dot",
    icon: [384, 512, ["map-marker-alt"], "f3c5", "M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"]
}, i2 = {
    prefix: "fas",
    iconName: "magnifying-glass",
    icon: [512, 512, [128269, "search"], "f002", "M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"]
}, o2 = {
    prefix: "fas",
    iconName: "circle-half-stroke",
    icon: [512, 512, [9680, "adjust"], "f042", "M448 256c0-106-86-192-192-192V448c106 0 192-86 192-192zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"]
}, a2 = {
    prefix: "fas",
    iconName: "diagram-project",
    icon: [576, 512, ["project-diagram"], "f542", "M0 80C0 53.5 21.5 32 48 32h96c26.5 0 48 21.5 48 48V96H384V80c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H432c-26.5 0-48-21.5-48-48V160H192v16c0 1.7-.1 3.4-.3 5L272 288h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H272c-26.5 0-48-21.5-48-48V336c0-1.7 .1-3.4 .3-5L144 224H48c-26.5 0-48-21.5-48-48V80z"]
}, l2 = a2, r2 = {
    prefix: "fas",
    iconName: "plus",
    icon: [448, 512, [10133, 61543, "add"], "2b", "M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"]
}, c2 = {
    prefix: "fas",
    iconName: "xmark",
    icon: [384, 512, [128473, 10005, 10006, 10060, 215, "close", "multiply", "remove", "times"], "f00d", "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"]
}, s2 = c2, d2 = {
    prefix: "fas",
    iconName: "chevron-right",
    icon: [320, 512, [9002], "f054", "M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"]
}, u2 = {
    prefix: "fas",
    iconName: "rotate",
    icon: [512, 512, [128260, "sync-alt"], "f2f1", "M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z"]
}, m2 = u2, h2 = {
    prefix: "fas",
    iconName: "file-export",
    icon: [576, 512, ["arrow-right-from-file"], "f56e", "M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V288H216c-13.3 0-24 10.7-24 24s10.7 24 24 24H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zM384 336V288H494.1l-39-39c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l80 80c9.4 9.4 9.4 24.6 0 33.9l-80 80c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l39-39H384zm0-208H256V0L384 128z"]
}, p2 = {
    prefix: "fas",
    iconName: "check",
    icon: [448, 512, [10003, 10004], "f00c", "M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"]
}, b2 = {
    prefix: "fas",
    iconName: "note-sticky",
    icon: [448, 512, [62026, "sticky-note"], "f249", "M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H288V368c0-26.5 21.5-48 48-48H448V96c0-35.3-28.7-64-64-64H64zM448 352H402.7 336c-8.8 0-16 7.2-16 16v66.7V480l32-32 64-64 32-32z"]
}, f2 = "M12,11A1,1 0 0,1 13,12A1,1 0 0,1 12,13A1,1 0 0,1 11,12A1,1 0 0,1 12,11M4.22,4.22C5.65,2.79 8.75,3.43 12,5.56C15.25,3.43 18.35,2.79 19.78,4.22C21.21,5.65 20.57,8.75 18.44,12C20.57,15.25 21.21,18.35 19.78,19.78C18.35,21.21 15.25,20.57 12,18.44C8.75,20.57 5.65,21.21 4.22,19.78C2.79,18.35 3.43,15.25 5.56,12C3.43,8.75 2.79,5.65 4.22,4.22M15.54,8.46C16.15,9.08 16.71,9.71 17.23,10.34C18.61,8.21 19.11,6.38 18.36,5.64C17.62,4.89 15.79,5.39 13.66,6.77C14.29,7.29 14.92,7.85 15.54,8.46M8.46,15.54C7.85,14.92 7.29,14.29 6.77,13.66C5.39,15.79 4.89,17.62 5.64,18.36C6.38,19.11 8.21,18.61 10.34,17.23C9.71,16.71 9.08,16.15 8.46,15.54M5.64,5.64C4.89,6.38 5.39,8.21 6.77,10.34C7.29,9.71 7.85,9.08 8.46,8.46C9.08,7.85 9.71,7.29 10.34,6.77C8.21,5.39 6.38,4.89 5.64,5.64M9.88,14.12C10.58,14.82 11.3,15.46 12,16.03C12.7,15.46 13.42,14.82 14.12,14.12C14.82,13.42 15.46,12.7 16.03,12C15.46,11.3 14.82,10.58 14.12,9.88C13.42,9.18 12.7,8.54 12,7.97C11.3,8.54 10.58,9.18 9.88,9.88C9.18,10.58 8.54,11.3 7.97,12C8.54,12.7 9.18,13.42 9.88,14.12M18.36,18.36C19.11,17.62 18.61,15.79 17.23,13.66C16.71,14.29 16.15,14.92 15.54,15.54C14.92,16.15 14.29,16.71 13.66,17.23C15.79,18.61 17.62,19.11 18.36,18.36Z", g2 = "M11,17A1,1 0 0,0 12,18A1,1 0 0,0 13,17A1,1 0 0,0 12,16A1,1 0 0,0 11,17M11,3V7H13V5.08C16.39,5.57 19,8.47 19,12A7,7 0 0,1 12,19A7,7 0 0,1 5,12C5,10.32 5.59,8.78 6.58,7.58L12,13L13.41,11.59L6.61,4.79V4.81C4.42,6.45 3,9.05 3,12A9,9 0 0,0 12,21A9,9 0 0,0 21,12A9,9 0 0,0 12,3M18,12A1,1 0 0,0 17,11A1,1 0 0,0 16,12A1,1 0 0,0 17,13A1,1 0 0,0 18,12M6,12A1,1 0 0,0 7,13A1,1 0 0,0 8,12A1,1 0 0,0 7,11A1,1 0 0,0 6,12Z", y2 = "M2,2H4V20H22V22H2V2M9,10A3,3 0 0,1 12,13A3,3 0 0,1 9,16A3,3 0 0,1 6,13A3,3 0 0,1 9,10M13,2A3,3 0 0,1 16,5A3,3 0 0,1 13,8A3,3 0 0,1 10,5A3,3 0 0,1 13,2M18,12A3,3 0 0,1 21,15A3,3 0 0,1 18,18A3,3 0 0,1 15,15A3,3 0 0,1 18,12Z", Z2 = "M15,4V6H18V18H15V20H20V4M4,4V20H9V18H6V6H9V4H4Z", v2 = "M5,3H7V5H5V10A2,2 0 0,1 3,12A2,2 0 0,1 5,14V19H7V21H5C3.93,20.73 3,20.1 3,19V15A2,2 0 0,0 1,13H0V11H1A2,2 0 0,0 3,9V5A2,2 0 0,1 5,3M19,3A2,2 0 0,1 21,5V9A2,2 0 0,0 23,11H24V13H23A2,2 0 0,0 21,15V19A2,2 0 0,1 19,21H17V19H19V14A2,2 0 0,1 21,12A2,2 0 0,1 19,10V5H17V3H19M12,15A1,1 0 0,1 13,16A1,1 0 0,1 12,17A1,1 0 0,1 11,16A1,1 0 0,1 12,15M8,15A1,1 0 0,1 9,16A1,1 0 0,1 8,17A1,1 0 0,1 7,16A1,1 0 0,1 8,15M16,15A1,1 0 0,1 17,16A1,1 0 0,1 16,17A1,1 0 0,1 15,16A1,1 0 0,1 16,15Z", x2 = "M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3M4,9V12C4,14.21 7.58,16 12,16C16.42,16 20,14.21 20,12V9C20,11.21 16.42,13 12,13C7.58,13 4,11.21 4,9M4,14V17C4,19.21 7.58,21 12,21C16.42,21 20,19.21 20,17V14C20,16.21 16.42,18 12,18C7.58,18 4,16.21 4,14Z", G2 = "M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C12.5,11 13,10.97 13.5,10.92V9.5H16.39L15.39,8.5L18.9,5C17.5,3.8 14.94,3 12,3M18.92,7.08L17.5,8.5L20,11H15V13H20L17.5,15.5L18.92,16.92L23.84,12M4,9V12C4,14.21 7.58,16 12,16C13.17,16 14.26,15.85 15.25,15.63L16.38,14.5H13.5V12.92C13,12.97 12.5,13 12,13C7.58,13 4,11.21 4,9M4,14V17C4,19.21 7.58,21 12,21C14.94,21 17.5,20.2 18.9,19L17,17.1C15.61,17.66 13.9,18 12,18C7.58,18 4,16.21 4,14Z", X2 = "M12,3C8.59,3 5.69,4.07 4.54,5.57L9.79,10.82C10.5,10.93 11.22,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3M3.92,7.08L2.5,8.5L5,11H0V13H5L2.5,15.5L3.92,16.92L8.84,12M20,9C20,11.21 16.42,13 12,13C11.34,13 10.7,12.95 10.09,12.87L7.62,15.34C8.88,15.75 10.38,16 12,16C16.42,16 20,14.21 20,12M20,14C20,16.21 16.42,18 12,18C9.72,18 7.67,17.5 6.21,16.75L4.53,18.43C5.68,19.93 8.59,21 12,21C16.42,21 20,19.21 20,17", W2 = "M20.06,18C20,17.83 19.91,17.54 19.86,17.11C19.19,17.81 18.38,18.16 17.45,18.16C16.62,18.16 15.93,17.92 15.4,17.45C14.87,17 14.6,16.39 14.6,15.66C14.6,14.78 14.93,14.1 15.6,13.61C16.27,13.12 17.21,12.88 18.43,12.88H19.83V12.24C19.83,11.75 19.68,11.36 19.38,11.07C19.08,10.78 18.63,10.64 18.05,10.64C17.53,10.64 17.1,10.76 16.75,11C16.4,11.25 16.23,11.54 16.23,11.89H14.77C14.77,11.46 14.92,11.05 15.22,10.65C15.5,10.25 15.93,9.94 16.44,9.71C16.95,9.5 17.5,9.36 18.13,9.36C19.11,9.36 19.87,9.6 20.42,10.09C20.97,10.58 21.26,11.25 21.28,12.11V16C21.28,16.8 21.38,17.42 21.58,17.88V18H20.06M17.66,16.88C18.11,16.88 18.54,16.77 18.95,16.56C19.35,16.35 19.65,16.07 19.83,15.73V14.16H18.7C16.93,14.16 16.04,14.63 16.04,15.57C16.04,16 16.19,16.3 16.5,16.53C16.8,16.76 17.18,16.88 17.66,16.88M5.46,13.71H9.53L7.5,8.29L5.46,13.71M6.64,6H8.36L13.07,18H11.14L10.17,15.43H4.82L3.86,18H1.93L6.64,6Z", V2 = "M19,13H5V11H19V13Z", I2 = "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z", k2 = "M11,4V9H6V11H11V16H13V11H18V9H13V4H11M6,18V20H18V18H6Z", C2 = "M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3H5M11,6H13V9H16V11H13V14H11V11H8V9H11V6M8,16H16V18H8V16Z", S2 = "M3 3H17C18.11 3 19 3.9 19 5V12.08C17.45 11.82 15.92 12.18 14.68 13H11V17H12.08C11.97 17.68 11.97 18.35 12.08 19H3C1.9 19 1 18.11 1 17V5C1 3.9 1.9 3 3 3M3 7V11H9V7H3M11 7V11H17V7H11M3 13V17H9V13H3M22.78 19.32L21.71 18.5C21.73 18.33 21.75 18.17 21.75 18S21.74 17.67 21.71 17.5L22.77 16.68C22.86 16.6 22.89 16.47 22.83 16.36L21.83 14.63C21.77 14.5 21.64 14.5 21.5 14.5L20.28 15C20 14.82 19.74 14.65 19.43 14.53L19.24 13.21C19.23 13.09 19.12 13 19 13H17C16.88 13 16.77 13.09 16.75 13.21L16.56 14.53C16.26 14.66 15.97 14.82 15.71 15L14.47 14.5C14.36 14.5 14.23 14.5 14.16 14.63L13.16 16.36C13.1 16.47 13.12 16.6 13.22 16.68L14.28 17.5C14.26 17.67 14.25 17.83 14.25 18S14.26 18.33 14.28 18.5L13.22 19.32C13.13 19.4 13.1 19.53 13.16 19.64L14.16 21.37C14.22 21.5 14.35 21.5 14.47 21.5L15.71 21C15.97 21.18 16.25 21.35 16.56 21.47L16.75 22.79C16.77 22.91 16.87 23 17 23H19C19.12 23 19.23 22.91 19.25 22.79L19.44 21.47C19.74 21.34 20 21.18 20.28 21L21.5 21.5C21.64 21.5 21.77 21.5 21.84 21.37L22.84 19.64C22.9 19.53 22.87 19.4 22.78 19.32M18 19.5C17.17 19.5 16.5 18.83 16.5 18S17.18 16.5 18 16.5 19.5 17.17 19.5 18 18.84 19.5 18 19.5Z", R2 = "M15,3V7.59L7.59,15H3V21H9V16.42L16.42,9H21V3M17,5H19V7H17M5,17H7V19H5", L2 = "M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z", Y2 = "M3.55 19.09L4.96 20.5L6.76 18.71L5.34 17.29M12 6C8.69 6 6 8.69 6 12S8.69 18 12 18 18 15.31 18 12C18 8.68 15.31 6 12 6M20 13H23V11H20M17.24 18.71L19.04 20.5L20.45 19.09L18.66 17.29M20.45 5L19.04 3.6L17.24 5.39L18.66 6.81M13 1H11V4H13M6.76 5.39L4.96 3.6L3.55 5L5.34 6.81L6.76 5.39M1 13H4V11H1M13 20H11V23H13";
const K2 = {
    /** @deprecated */
    ZeroOneN: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0RFRDI1RjI0ODY0MTFFN0JEQTA4NTA5QjY4NEI4MzAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0RFRDI1RjM0ODY0MTFFN0JEQTA4NTA5QjY4NEI4MzAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCQTE2QzQzRDQ4NjQxMUU3QkRBMDg1MDlCNjg0QjgzMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCQTE2QzQzRTQ4NjQxMUU3QkRBMDg1MDlCNjg0QjgzMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnTT5ywAAAJMSURBVHja7Fc9T2JBFB3MZq1IqLSgsRM6G6TcAmK7VNoRK4yBxE6XP/CsNxBohc6G5w+AoCU0aEWpBfAD4AeM55AZMjvvg2dClsRwkxOeb+7ce+6dmTPPmJRSbNP2xJZtR2DrBH6k0+ndEkSxBHAD9AGpMAJc4Lfh1zDGn4GLgHglNb8kqANhSKVSTiaTkY7jyMFgILWNx2PZ7XZluVyW8BkBJWA1PhwO+f7ZinUO9DmH8xl3XfIGnefzuQwzBsvlcjKIAH4PWAh9zCLq9Xp48mq16knGwASTmkaShULBQ0B1ZlSr1TyFtFqtwOS3xWLxH2eyZctUUOKVFTGRtslk4iHAODZZ/k2yLDKIwLsZjJ2gM3Bo+V0wieu6vsvCCu0ucS+RPHC1vId8kp+YrWRwvHsIWaosO7Nun3DDqn1yD+zr+RQiz3WYz+dXz6iCP82g84lKB4jxF0Rv0G7P+Gw2E6ha9Ho9/eoPsRJAucbUzl53Wi79NmwU25QSJuLx+ObugkqlInD+l8+oTsAny1aHxDlKJpOBgzhBot1ui8Vi4R3cwCY8jbIJeap4JOHvAmd6flDQj+l06ncMD/yktdPp+AoW59nEeBqUnjjAzyACd7YQUcnUxL7CyJZWk7QWIs6xdcLQg6cvSzETEl+Q4iyXkAWZBHU3/stlpLvKpaWkm0sb5Tq+19exqfvWdbyU1gjX8SGLIlnKNJ9jPGYRP0gugQLwS717Az6AB+DJ+CC5Vs8vSkEffeIdK79mVALf95swtvvXbEdg2wQ+BRgAvLABcxKvek4AAAAASUVORK5CYII=",
    ZeroOne: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkExNkM0M0I0ODY0MTFFN0JEQTA4NTA5QjY4NEI4MzAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkExNkM0M0M0ODY0MTFFN0JEQTA4NTA5QjY4NEI4MzAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCQTE2QzQzOTQ4NjQxMUU3QkRBMDg1MDlCNjg0QjgzMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCQTE2QzQzQTQ4NjQxMUU3QkRBMDg1MDlCNjg0QjgzMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PomEhhsAAAKSSURBVHja7FexbhpBED0ipFRI7ixBQwlV0nCUWKJIydEkFSRpHCGQ0iXgBqfBbQrAShXzA4BLJJCdEip3UDoSUFvwAZv30B5a1ncHBiSk2CONdrU3O/N2dt6w+IQQxiHllXFgeQFwcAD+aDT6zDPwBNsjaAoaVtbuoNcee46hOSi5/hd6pRv41vUBXJFJJ4FA4FMymTRCodDy22g0Mnq93gOml8Ph8Mxhb71QKOQYYzqdGq1W6zPsVkHwo5tGIpFvsVhMNJtN4Saz2UwUi0UB299QU9u/tBsMBrS51WN4BrcsS4zHY7GJEKQOYmsAMIzz5GrwyWQiSqWSwDXQkchms6LRaCwyoIPYB4Ar3NdyM+cEhPXv0LC0OYH+ZJZUEASG9fdbA2AAnlI9uQwedwF7waC29Pt92t5sCoCN6FzSZCmsdluq1aoxn8+LqN6+E0uwXoKPKNiQ4j7TNA0w5gRLZRdWraz7QZOyTkU6saXb7XL4taZH3IGSKRs4asVA5s5Vg2AwaOTz+QSmCZ2GniLTuI6uFpyLbcRfq9UeHYcZwL0v5mw8SFsYqb73yMBb9Tel3W4zA4s5gC1G2Yget2Lc8Q99MZ1Ol20AmLMOTjE9c7nT1xgstW4qlQrrhn7LNgACgp8/mN56dkKk84hVb1OLo+T+qUv66wi4QlnSeNc+cAG0y81IvyDfZaf7CE1Av5JubE6qSLDxXQEc05ib9HbLvp/JZARPTc6rQjDMyL5+Cz7wKkDDjapZD74zAOngHbRN57wGJyFAmfa6w/71ndCruyBoB0MHlf4FxZUDJd+o7wF8Z7Vfy/dAx8HFJWies1ng+CABqqe8oMIOL6KHDV5ElPt9APj/HqW+l/+Gzx7APwEGACfjkeXK58xsAAAAAElFTkSuQmCC",
    ZeroN: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDc5MkNFMEM0ODY0MTFFN0JEQTA4NTA5QjY4NEI4MzAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDc5MkNFMEQ0ODY0MTFFN0JEQTA4NTA5QjY4NEI4MzAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0NzkyQ0UwQTQ4NjQxMUU3QkRBMDg1MDlCNjg0QjgzMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0NzkyQ0UwQjQ4NjQxMUU3QkRBMDg1MDlCNjg0QjgzMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpR0ImIAAALlSURBVHja7Fe/jxJBGF0MyVUk2HgJFJ6NQqUNWEoCkfKWxusozxBI7Eiw8ardKy/hxyVWQqcF8AdA9Eqg8DqwuwJI7Aj8AeN7OEuGhd09tCBRvuTLzA4z37z53rxvF58QQtunPdD2bAcA/mg0+p9nYMf5Qfhz5fnmbwH47iND0PQaTS4QCOiRSGQ1PhgMZmja8OvhcNi/z4aIdc5Ycs1HjQCcHJu9hH/KZrOi0+kIu83nc9FsNkUymRSYZ3jEegqv6bousLHI5/NcU3RbkIa3W62W8DICKZVKDFhziFWMxWKiXq+v1ozHY8Exv0OajpmmSqVyitOtxrvdrjYajZZ90KGlUiktFAot+4ZhcDiHtTOc8L1KHWLoAKiFw+FVrOl0+rvjgNjA5msnJA3MCPxC+hX8DhuvzZN0kDqDfTt1nCPT/w1+tm3zIFPDidYC8oZxc8vcI6ZdBUHKMPadY1YMy0gBY6uxfHhIMBEKAw+BvIUMLB+q1aqG/iXSWnKg6wjND9DzmHQsFgttMploqlpIm2maWr/fv8bj5zUZMrV2KWYymaXTyDMCPgGAOxdpXRQKhQ9I7cZv2FSzDrPVvG44TiLc5CWp0Mnrn5gfxWQDFG8r02nddpwwiAzMXOrLC6d3CtNPWhxLMSjYKKcYe0XZ0OLxOOVHOX1xA6Bybj8MKWg0GjdOFNjTeUL5WNbr9UjDV3jcIf3nVIllrHK8V2xVYxypphr8kbXeidO2ql+WWwnijQrU0rq6mdT4W/gta4ldiuVy2ZJi0Q1AmoHVxTyBDL50/m7XOkETvIxxTL1zHpSwBoJlWBa2mtvNNpky+wmcjJvIk6Vtcc5Y9QjeHovxveRlbiun9tLKVFul1S2W+kJiywx4fg9AXmm+UDD5lIqg3HizwftSYgBHmV1izhXGfnrEeobmHeLkuB7rIj4n+WyTGjwh2xP4rXR+kMx2/BBKyLWzXQD8mx+lvsNfswOAfQP4JcAAK/At0HQvwB8AAAAASUVORK5CYII=",
    OneOnly: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUJCNTBCRDA0ODY0MTFFN0JEQTA4NTA5QjY4NEI4MzAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkExNkM0MzQ0ODY0MTFFN0JEQTA4NTA5QjY4NEI4MzAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQkI1MEJDRTQ4NjQxMUU3QkRBMDg1MDlCNjg0QjgzMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBQkI1MEJDRjQ4NjQxMUU3QkRBMDg1MDlCNjg0QjgzMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pur5d4QAAAE1SURBVHjaYvz//z/DQAImhgEGow4YcAewaGpqjvAQoJI5CUAsD2VPB+JXULY4EGcCMSivPwTiBRgOuH79OkU2A6MwITAwcL6UlBSYP3XqVHGgmVlQufqcnJxMUFnz7NkzhvXr1zMA5VAdAZKkBGtoaBw4derUfxgA8v8jycHFQWpAatH1j2bDUQeACqIGaDahGgClfmLlWIDZpJ7SKhmWBUEgOzsbRDVgUwOUswcy7ZHFGf8PcIOABVhwUGwIsCBiQCqIUOSgIQIviNABI7BwaKDQfodFixbZm5qawuIYRDVC5ephJe3p06cZ4uLiDgKZB0ZLwtGCaNg1SBYAs5c9MJExIDVI4GxgtgQ1SBiePn3KgK1BAsqG1GoRKSA54CVaiwgEHtDSAUM3DTCO9g1HvAMAAgwAvvwYPnW1JuQAAAAASUVORK5CYII=",
    OneN: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkExNkM0Mzc0ODY0MTFFN0JEQTA4NTA5QjY4NEI4MzAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkExNkM0Mzg0ODY0MTFFN0JEQTA4NTA5QjY4NEI4MzAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCQTE2QzQzNTQ4NjQxMUU3QkRBMDg1MDlCNjg0QjgzMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCQTE2QzQzNjQ4NjQxMUU3QkRBMDg1MDlCNjg0QjgzMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pt+BFx8AAAIISURBVHja7Fc9TwJBEF0MLYkdBgot4QdwLSaQSAmNdkCrR61CI9Ud1oCUIB0NYElBtJU/QIkmQKIVgcpqfXPekQNBYu7WM4FJJvs1x87Ovnk7uDjnzEnZYw7LzgHHHXAFAoHtjoDbpt9JQw/1fgX6vsH+CDohdVnlgWAwmE4kElWfz6eNy+Vypd/vX6yx9aK58fv959PplM1mswNGDlhRYOip1+txQzDma+wuoYNSqaTZUYvxnXAHMJag1WQyyYfDITdLJBLhbpEAQ8gVj8eThTBc03weoWeqqrLRaFQREgHoKfQRG3Pc9cKpW60WD4VCZKPS90IiAJA1FEVhkiTN58bjMaNIwNl7yhQA9VlLQ4Qpj9a2J1GWZZbJZBbmkBkMoHtFt6pPxbBvTGNCHZWWNqX7xalXriHkdNfrqZg7XBC4KTxWhSJgENGy0Onb7faPj1He4v7H9Xo9DGRrg1QqpaWY2SEAj+Vyua+0W6ZpQWn4YjCeWYrFIq0NiBWN70U54CWajcfj3LxGQmxIrEjsSCwplIrRP6N1cMI3Qmo2mxohCa0HQDYNNCfASAG8z7rd7nwtGo3+TUECJz6gWfB/DAT1QCAlViSgYq5gBxXXQDZhQrqpIFnlSAdNBwx4BWwUsPk15m7tqgnTepVjOPC2wX5fr4hse4xqv7Sf/J+yfPffcOsd+BRgAOvawAWTC+PMAAAAAElFTkSuQmCC",
    /** @deprecated */
    One: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUJCNTBCQ0M0ODY0MTFFN0JEQTA4NTA5QjY4NEI4MzAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUJCNTBCQ0Q0ODY0MTFFN0JEQTA4NTA5QjY4NEI4MzAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQkI1MEJDQTQ4NjQxMUU3QkRBMDg1MDlCNjg0QjgzMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBQkI1MEJDQjQ4NjQxMUU3QkRBMDg1MDlCNjg0QjgzMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnOhfCQAAADcSURBVHjaYvz//z/DQAImhgEGow4YcAewaGpqjvAQoJI5CUAsD2VPB+JXxGpkpLQcAEZhQmBg4HwpKSkwf+rUqdOvX7+eRbQBIAdQgjU0NA6cOnXqPwwA+f9J0T+aDUcdACqIGkBpkZqGAs2sJzobTpky5T+lWRGYDRmkpaXBbKB5JOll/D/ADQIWYMFBsSGgEEAqiEgLAWDB0UCh/Q6LFi2yNzU1hcU/iGocLQlHC6IR1SBZsH79entgQmRAapCQlA2p1SJSQHLAS3o3yRYM2TTAONo3HPEOAAgwAJh583IRUllDAAAAAElFTkSuQmCC",
    /** @deprecated */
    N: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDc5MkNFMDg0ODY0MTFFN0JEQTA4NTA5QjY4NEI4MzAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDc5MkNFMDk0ODY0MTFFN0JEQTA4NTA5QjY4NEI4MzAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNDQwRjc3NTQ4M0MxMUU3QkRBMDg1MDlCNjg0QjgzMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNDQwRjc3NjQ4M0MxMUU3QkRBMDg1MDlCNjg0QjgzMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkbQDKwAAAGjSURBVHja7Jcxb4JQEMefLl272cjSUbYu0g+gSVemdpPZwKzRRSf4AGg70k8AfACTdqx+ibYJLp2MfoDr/wg0vJp2Al6TeskFeQ+4e/fufvdsEJFQKU2hWE4OKHeg0el0TlugQi6h5+kW1MkBXddbuMw0TRvu93txOBwumjUaH+Hy4jjOcLVaCcuyeHgmOAJVKpLcgAaDwYCSJKGi9Hq9yo273W6XwjCUDCP8NJlMCPP3VRm+hT6xETZWlCiKiJ3CvJfmX8mGW7wqDu16vZYMb7db4m3A/CP0On+HQTRHMpRVCiaS7Mq2bWlwuVyKxWLxjp/BEQkxQWWVYr/fF9/JipALrP5nFJPiA0EagbI+BsAI0zSlMV59HMe/NqN5mYg1DMPyPE+02+2vwc1mI6bTKTvzgNsP6Y0KSnAMfctySxLf97kKXqGj/PmqOJCWI7aDsHrJCaZhVo4BU7JqEt5Bn13XPQIS05GBVEcvOGPqsTE0IQnHtThQcOQGGnP4mYpZL/Bqc6CYpFkvGOcoVsEfPg3tVB7Jdn/nWH76b/jvHfgUYADeZNmzPgOYQQAAAABJRU5ErkJggg=="
}, rt = (e, t) => ({
    prefix: "mdi",
    iconName: e,
    icon: [24, 24, , , t]
}), T2 = (e, t) => ({
    prefix: "base64",
    iconName: e,
    icon: [24, 24, , , t]
}), H2 = (e, t) => ({
    prefix: "radix",
    iconName: e,
    icon: [15, 15, , , t]
}), N2 = "M7.49998 0.849976C7.22383 0.849976 6.99998 1.07383 6.99998 1.34998V3.52234C6.99998 3.79848 7.22383 4.02234 7.49998 4.02234C7.77612 4.02234 7.99998 3.79848 7.99998 3.52234V1.8718C10.8862 2.12488 13.15 4.54806 13.15 7.49998C13.15 10.6204 10.6204 13.15 7.49998 13.15C4.37957 13.15 1.84998 10.6204 1.84998 7.49998C1.84998 6.10612 2.35407 4.83128 3.19049 3.8459C3.36919 3.63538 3.34339 3.31985 3.13286 3.14115C2.92234 2.96245 2.60681 2.98825 2.42811 3.19877C1.44405 4.35808 0.849976 5.86029 0.849976 7.49998C0.849976 11.1727 3.82728 14.15 7.49998 14.15C11.1727 14.15 14.15 11.1727 14.15 7.49998C14.15 3.82728 11.1727 0.849976 7.49998 0.849976ZM6.74049 8.08072L4.22363 4.57237C4.15231 4.47295 4.16346 4.33652 4.24998 4.25C4.33649 4.16348 4.47293 4.15233 4.57234 4.22365L8.08069 6.74051C8.56227 7.08599 8.61906 7.78091 8.19998 8.2C7.78089 8.61909 7.08597 8.56229 6.74049 8.08072Z", z2 = [
    My,
    wy,
    b2,
    r2,
    s2,
    d2,
    p2,
    t2,
    Uy,
    i2,
    Oy,
    l2,
    Qy,
    h2,
    Dy,
    Py,
    _y,
    e2,
    $y,
    Ay,
    m2,
    By,
    Ey,
    zy,
    Jy,
    n2,
    o2,
    rt("code-json", v2),
    rt("database", x2),
    rt("database-import", X2),
    rt("database-export", G2),
    rt("format-letter-case", W2),
    rt("table-cog", S2),
    rt("code-brackets", Z2),
    rt("vector-line", R2),
    rt("atom", f2),
    rt("chart-scatter-plot", y2),
    rt("white-balance-sunny", Y2),
    rt("weather-might", L2),
    rt("plus-minus-box", C2),
    rt("plus-minus", k2),
    rt("plus", I2),
    rt("minus", V2),
    rt("av-timer", g2),
    H2("timer", N2),
    ...Object.entries(K2).map(([e, t]) => T2(e, t))
], wu = {};
w2(z2);
function w2(e) {
    e.reduce((t, n) => (t[`${n.prefix}-${n.iconName}`] = n, t), wu);
}
function Ju(e, t) {
    return wu[`${e}-${t}`];
}
const J2 = 18, M2 = 24, F2 = 1.5, P = (e, t) => () => {
    const n = e.prefix ?? "fas", i = e.name ?? "", l = e.size ?? J2, r = Ju(n, i);
    if (!r)
        return it``;
    const [s, m, , , h] = r.icon, p = F2 * (l / M2);
    return I`
    <div
      class=${["icon", Hy, e.class]}
      style=${{
            transform: `rotate(${e.rotate ?? 0}deg)`
        }}
      ...${ca({ title: e.title })}
      @click=${e.onClick}
    >
      ${n === "base64" ? I`
            <img
              style=${{
                width: `${l}px`,
                height: `${l}px`
            }}
              src=${h}
            />
          ` : it`
            <svg
              class=${e.useTransition ? Ny : null}
              style=${{
                width: n === "fas" ? `${p}rem` : `${l}px`,
                height: n === "fas" ? `${p}rem` : `${l}px`
            }}
              viewBox="0 0 ${s} ${m}"
            >
              ${e.color ? it`<path d=${h} fill=${e.color}></path>` : it`<path d=${h}></path>`}
            </svg>
    `}
    </div>
  `;
}, Mu = N`
  position: absolute;
  background-color: var(--memo-background);
  border-radius: 6px;
  border: 1px solid var(--memo-border);
  fill: transparent;
  color: transparent;

  &:hover {
    fill: var(--foreground);
    color: var(--foreground);
  }

  &[data-selected] {
    border: 1px solid var(--memo-select);
  }
`, $2 = N`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: ${Ao}px;
  width: 100%;
  height: 100%;
`, U2 = N`
  display: flex;
  flex-direction: column;
  position: relative;
`, j2 = N`
  position: absolute;
  top: -${Ao + 1}px;
  left: -${Ao}px;
  width: calc(100% + ${Ao * 2}px);
  min-height: 4px;
  border-radius: 6px 6px 0 0;
  cursor: pointer;
`, E2 = N`
  display: flex;
  height: ${zd}px;
  justify-content: flex-end;
  margin-bottom: ${S1}px;
  cursor: move;

  & > .icon {
    margin-left: 4px;
    cursor: pointer;
  }

  & > .icon:hover {
    fill: var(--active);
    color: var(--active);
  }
`, P2 = N`
  resize: none;
  background-color: transparent;
  ${Lt.paragraph};
  line-height: normal;
`, B2 = (e, t) => {
        const n = se(t), i = ({ event: p, movementX: b, movementY: g }) => {
            p.type === "mousemove" && p.preventDefault();
            const { store: Z } = n.value;
            Z.dispatch(wd(b, g));
        }, l = (p) => {
            const b = p.target;
            if (!b)
                return;
            const { store: g } = n.value;
            g.dispatch(Jd(e.memo.id, un(p))), !b.closest(".memo-header-color") && !b.closest(".memo-textarea") && !b.closest(".icon") && !b.closest(".sash") && qt.subscribe(i);
        }, r = () => {
            const { store: p } = n.value;
            p.dispatch(R1(e.memo.id));
        }, s = (p) => {
            const b = p.target;
            if (!b)
                return;
            const { store: g } = n.value;
            g.dispatch(L1({
                id: e.memo.id,
                value: b.value
            }));
        }, m = () => {
            t.host.dispatchEvent(Ki());
        }, h = (p) => {
            const { emitter: b } = n.value;
            b.emit(La({
                x: p.clientX,
                y: p.clientY,
                color: e.memo.ui.color
            }));
        };
        return () => {
            var W;
            const { store: p, keyBindingMap: b } = n.value, { editor: g } = p.state, { memo: Z } = e, y = !!g.selectedMap[Z.id], G = gi(Z), X = yi(Z);
            return I`
      <div
        class=${["memo", Mu]}
        style=${{
                    top: `${Z.ui.y}px`,
                    left: `${Z.ui.x}px`,
                    "z-index": `${Z.ui.zIndex}`,
                    width: `${G}px`,
                    height: `${X}px`
                }}
        ?data-selected=${y}
        ?data-focus-border=${y}
        @mousedown=${l}
        @touchstart=${l}
      >
        <div class=${$2}>
          <div class=${U2}>
            <div
              class=${["memo-header-color", j2]}
              style=${{
                    "background-color": Z.ui.color
                }}
              @click=${h}
            ></div>
            <div class=${E2}>
              <${P}
                size=${12}
                name="xmark"
                title=${ra((W = b.removeTable[0]) == null ? void 0 : W.shortcut)}
                useTransition=${!0}
                .onClick=${r}
              />
            </div>
          </div>
          <textarea
            class=${["memo-textarea", "scrollbar", P2]}
            style=${{
                    width: `${Z.ui.width}px`,
                    height: `${Z.ui.height}px`
                }}
            spellcheck="false"
            .value=${Z.value}
            @input=${s}
            @wheel=${Ai}
            @blur=${m}
          ></textarea>
          <${Ty} memo=${Z} top=${X} left=${G} />
        </div>
      </div>
    `;
        };
    }, O2 = N`
  position: absolute;
  max-width: 100px;
  overflow: hidden;
  display: flex;
  pointer-events: none;
  z-index: 2147483647;

  & > span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`, A2 = (e, t) => {
        const n = Se({
            x: e.tracker.x,
            y: e.tracker.y
        }), { addUnsubscribe: i } = Ge();
        return Te(() => {
            i(Wy.subscribe(() => {
                const { tracker: l } = e;
                n.x += (l.x - n.x) * 0.05, n.y += (l.y - n.y) * 0.05;
            }));
        }), () => {
            const { tracker: { nickname: l } } = e;
            return I`
      <div
        class=${O2}
        style=${{ left: `${n.x}px`, top: `${n.y}px` }}
      >
        <${P} name="arrow-pointer" size=${16} />
        <span>${l}</span>
      </div>
    `;
        };
    }, Q2 = (e, t) => {
        const n = se(t), { addUnsubscribe: i } = Ge(), l = Se({ force: !1 }), r = () => {
            l.force = !l.force;
        };
        return Te(() => {
            const { store: s } = n.value, { editor: { sharedMouseTrackerMap: m } } = s.state;
            i(Pe(m).subscribe(r));
        }), () => {
            const { store: s } = n.value, { editor: { sharedMouseTrackerMap: m } } = s.state;
            return l.force, I`
      ${et(Object.values(m), (h) => h.id, (h) => I`<${A2} tracker=${h} />`)}
    `;
        };
    };
function mn(e) {
    return Array.isArray ? Array.isArray(e) : Uu(e) === "[object Array]";
}
const D2 = 1 / 0;
function _2(e) {
    if (typeof e == "string")
        return e;
    let t = e + "";
    return t == "0" && 1 / e == -D2 ? "-0" : t;
}
function q2(e) {
    return e == null ? "" : _2(e);
}
function Dt(e) {
    return typeof e == "string";
}
function Fu(e) {
    return typeof e == "number";
}
function eZ(e) {
    return e === !0 || e === !1 || tZ(e) && Uu(e) == "[object Boolean]";
}
function $u(e) {
    return typeof e == "object";
}
function tZ(e) {
    return $u(e) && e !== null;
}
function Kt(e) {
    return e != null;
}
function pl(e) {
    return !e.trim().length;
}
function Uu(e) {
    return e == null ? e === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(e);
}
const nZ = "Incorrect 'index' type", iZ = (e) => `Invalid value for key ${e}`, oZ = (e) => `Pattern length exceeds max of ${e}.`, aZ = (e) => `Missing ${e} property in key`, lZ = (e) => `Property 'weight' in key '${e}' must be a positive integer`, Zs = Object.prototype.hasOwnProperty;
class rZ {
    constructor(t) {
        this._keys = [], this._keyMap = {};
        let n = 0;
        t.forEach((i) => {
            let l = ju(i);
            this._keys.push(l), this._keyMap[l.id] = l, n += l.weight;
        }), this._keys.forEach((i) => {
            i.weight /= n;
        });
    }
    get(t) {
        return this._keyMap[t];
    }
    keys() {
        return this._keys;
    }
    toJSON() {
        return JSON.stringify(this._keys);
    }
}
function ju(e) {
    let t = null, n = null, i = null, l = 1, r = null;
    if (Dt(e) || mn(e))
        i = e, t = vs(e), n = Hl(e);
    else {
        if (!Zs.call(e, "name"))
            throw new Error(aZ("name"));
        const s = e.name;
        if (i = s, Zs.call(e, "weight") && (l = e.weight, l <= 0))
            throw new Error(lZ(s));
        t = vs(s), n = Hl(s), r = e.getFn;
    }
    return { path: t, id: n, weight: l, src: i, getFn: r };
}
function vs(e) {
    return mn(e) ? e : e.split(".");
}
function Hl(e) {
    return mn(e) ? e.join(".") : e;
}
function cZ(e, t) {
    let n = [], i = !1;
    const l = (r, s, m) => {
        if (Kt(r))
            if (!s[m])
                n.push(r);
            else {
                let h = s[m];
                const p = r[h];
                if (!Kt(p))
                    return;
                if (m === s.length - 1 && (Dt(p) || Fu(p) || eZ(p)))
                    n.push(q2(p));
                else if (mn(p)) {
                    i = !0;
                    for (let b = 0, g = p.length; b < g; b += 1)
                        l(p[b], s, m + 1);
                } else
                    s.length && l(p, s, m + 1);
            }
    };
    return l(e, Dt(t) ? t.split(".") : t, 0), i ? n : n[0];
}
const sZ = {
    // Whether the matches should be included in the result set. When `true`, each record in the result
    // set will include the indices of the matched characters.
    // These can consequently be used for highlighting purposes.
    includeMatches: !1,
    // When `true`, the matching function will continue to the end of a search pattern even if
    // a perfect match has already been located in the string.
    findAllMatches: !1,
    // Minimum number of characters that must be matched before a result is considered a match
    minMatchCharLength: 1
}, dZ = {
    // When `true`, the algorithm continues searching to the end of the input even if a perfect
    // match is found before the end of the same input.
    isCaseSensitive: !1,
    // When true, the matching function will continue to the end of a search pattern even if
    includeScore: !1,
    // List of properties that will be searched. This also supports nested properties.
    keys: [],
    // Whether to sort the result list, by score
    shouldSort: !0,
    // Default sort function: sort by ascending score, ascending index
    sortFn: (e, t) => e.score === t.score ? e.idx < t.idx ? -1 : 1 : e.score < t.score ? -1 : 1
}, uZ = {
    // Approximately where in the text is the pattern expected to be found?
    location: 0,
    // At what point does the match algorithm give up. A threshold of '0.0' requires a perfect match
    // (of both letters and location), a threshold of '1.0' would match anything.
    threshold: 0.6,
    // Determines how close the match must be to the fuzzy location (specified above).
    // An exact letter match which is 'distance' characters away from the fuzzy location
    // would score as a complete mismatch. A distance of '0' requires the match be at
    // the exact location specified, a threshold of '1000' would require a perfect match
    // to be within 800 characters of the fuzzy location to be found using a 0.8 threshold.
    distance: 100
}, mZ = {
    // When `true`, it enables the use of unix-like search commands
    useExtendedSearch: !1,
    // The get function to use when fetching an object's properties.
    // The default will search nested paths *ie foo.bar.baz*
    getFn: cZ,
    // When `true`, search will ignore `location` and `distance`, so it won't matter
    // where in the string the pattern appears.
    // More info: https://fusejs.io/concepts/scoring-theory.html#fuzziness-score
    ignoreLocation: !1,
    // When `true`, the calculation for the relevance score (used for sorting) will
    // ignore the field-length norm.
    // More info: https://fusejs.io/concepts/scoring-theory.html#field-length-norm
    ignoreFieldNorm: !1,
    // The weight to determine how much field length norm effects scoring.
    fieldNormWeight: 1
};
var re = {
    ...dZ,
    ...sZ,
    ...uZ,
    ...mZ
};
const hZ = /[^ ]+/g;
function pZ(e = 1, t = 3) {
    const n = /* @__PURE__ */ new Map(), i = Math.pow(10, t);
    return {
        get(l) {
            const r = l.match(hZ).length;
            if (n.has(r))
                return n.get(r);
            const s = 1 / Math.pow(r, 0.5 * e), m = parseFloat(Math.round(s * i) / i);
            return n.set(r, m), m;
        },
        clear() {
            n.clear();
        }
    };
}
class Ir {
    constructor({
        getFn: t = re.getFn,
        fieldNormWeight: n = re.fieldNormWeight
    } = {}) {
        this.norm = pZ(n, 3), this.getFn = t, this.isCreated = !1, this.setIndexRecords();
    }
    setSources(t = []) {
        this.docs = t;
    }
    setIndexRecords(t = []) {
        this.records = t;
    }
    setKeys(t = []) {
        this.keys = t, this._keysMap = {}, t.forEach((n, i) => {
            this._keysMap[n.id] = i;
        });
    }
    create() {
        this.isCreated || !this.docs.length || (this.isCreated = !0, Dt(this.docs[0]) ? this.docs.forEach((t, n) => {
            this._addString(t, n);
        }) : this.docs.forEach((t, n) => {
            this._addObject(t, n);
        }), this.norm.clear());
    }
    // Adds a doc to the end of the index
    add(t) {
        const n = this.size();
        Dt(t) ? this._addString(t, n) : this._addObject(t, n);
    }
    // Removes the doc at the specified index of the index
    removeAt(t) {
        this.records.splice(t, 1);
        for (let n = t, i = this.size(); n < i; n += 1)
            this.records[n].i -= 1;
    }
    getValueForItemAtKeyId(t, n) {
        return t[this._keysMap[n]];
    }
    size() {
        return this.records.length;
    }
    _addString(t, n) {
        if (!Kt(t) || pl(t))
            return;
        let i = {
            v: t,
            i: n,
            n: this.norm.get(t)
        };
        this.records.push(i);
    }
    _addObject(t, n) {
        let i = { i: n, $: {} };
        this.keys.forEach((l, r) => {
            let s = l.getFn ? l.getFn(t) : this.getFn(t, l.path);
            if (Kt(s)) {
                if (mn(s)) {
                    let m = [];
                    const h = [{ nestedArrIndex: -1, value: s }];
                    for (; h.length;) {
                        const { nestedArrIndex: p, value: b } = h.pop();
                        if (Kt(b))
                            if (Dt(b) && !pl(b)) {
                                let g = {
                                    v: b,
                                    i: p,
                                    n: this.norm.get(b)
                                };
                                m.push(g);
                            } else
                                mn(b) && b.forEach((g, Z) => {
                                    h.push({
                                        nestedArrIndex: Z,
                                        value: g
                                    });
                                });
                    }
                    i.$[r] = m;
                } else if (Dt(s) && !pl(s)) {
                    let m = {
                        v: s,
                        n: this.norm.get(s)
                    };
                    i.$[r] = m;
                }
            }
        }), this.records.push(i);
    }
    toJSON() {
        return {
            keys: this.keys,
            records: this.records
        };
    }
}
function Eu(e, t, { getFn: n = re.getFn, fieldNormWeight: i = re.fieldNormWeight } = {}) {
    const l = new Ir({ getFn: n, fieldNormWeight: i });
    return l.setKeys(e.map(ju)), l.setSources(t), l.create(), l;
}
function bZ(e, { getFn: t = re.getFn, fieldNormWeight: n = re.fieldNormWeight } = {}) {
    const { keys: i, records: l } = e, r = new Ir({ getFn: t, fieldNormWeight: n });
    return r.setKeys(i), r.setIndexRecords(l), r;
}
function wo(e, {
    errors: t = 0,
    currentLocation: n = 0,
    expectedLocation: i = 0,
    distance: l = re.distance,
    ignoreLocation: r = re.ignoreLocation
} = {}) {
    const s = t / e.length;
    if (r)
        return s;
    const m = Math.abs(i - n);
    return l ? s + m / l : m ? 1 : s;
}
function fZ(e = [], t = re.minMatchCharLength) {
    let n = [], i = -1, l = -1, r = 0;
    for (let s = e.length; r < s; r += 1) {
        let m = e[r];
        m && i === -1 ? i = r : !m && i !== -1 && (l = r - 1, l - i + 1 >= t && n.push([i, l]), i = -1);
    }
    return e[r - 1] && r - i >= t && n.push([i, r - 1]), n;
}
const $n = 32;
function gZ(e, t, n, {
    location: i = re.location,
    distance: l = re.distance,
    threshold: r = re.threshold,
    findAllMatches: s = re.findAllMatches,
    minMatchCharLength: m = re.minMatchCharLength,
    includeMatches: h = re.includeMatches,
    ignoreLocation: p = re.ignoreLocation
} = {}) {
    if (t.length > $n)
        throw new Error(oZ($n));
    const b = t.length, g = e.length, Z = Math.max(0, Math.min(i, g));
    let y = r, G = Z;
    const X = m > 1 || h, W = X ? Array(g) : [];
    let V;
    for (; (V = e.indexOf(t, G)) > -1;) {
        let K = wo(t, {
            currentLocation: V,
            expectedLocation: Z,
            distance: l,
            ignoreLocation: p
        });
        if (y = Math.min(K, y), G = V + b, X) {
            let Y = 0;
            for (; Y < b;)
                W[V + Y] = 1, Y += 1;
        }
    }
    G = -1;
    let C = [], H = 1, L = b + g;
    const E = 1 << b - 1;
    for (let K = 0; K < b; K += 1) {
        let Y = 0, T = L;
        for (; Y < T;)
            wo(t, {
                errors: K,
                currentLocation: Z + T,
                expectedLocation: Z,
                distance: l,
                ignoreLocation: p
            }) <= y ? Y = T : L = T, T = Math.floor((L - Y) / 2 + Y);
        L = T;
        let z = Math.max(1, Z - T + 1), M = s ? g : Math.min(Z + T, g) + b, U = Array(M + 2);
        U[M + 1] = (1 << K) - 1;
        for (let q = M; q >= z; q -= 1) {
            let ne = q - 1, te = n[e.charAt(ne)];
            if (X && (W[ne] = +!!te), U[q] = (U[q + 1] << 1 | 1) & te, K && (U[q] |= (C[q + 1] | C[q]) << 1 | 1 | C[q + 1]), U[q] & E && (H = wo(t, {
                errors: K,
                currentLocation: ne,
                expectedLocation: Z,
                distance: l,
                ignoreLocation: p
            }), H <= y)) {
                if (y = H, G = ne, G <= Z)
                    break;
                z = Math.max(1, 2 * Z - G);
            }
        }
        if (wo(t, {
            errors: K + 1,
            currentLocation: Z,
            expectedLocation: Z,
            distance: l,
            ignoreLocation: p
        }) > y)
            break;
        C = U;
    }
    const J = {
        isMatch: G >= 0,
        // Count exact matches (those with a score of 0) to be "almost" exact
        score: Math.max(1e-3, H)
    };
    if (X) {
        const K = fZ(W, m);
        K.length ? h && (J.indices = K) : J.isMatch = !1;
    }
    return J;
}
function yZ(e) {
    let t = {};
    for (let n = 0, i = e.length; n < i; n += 1) {
        const l = e.charAt(n);
        t[l] = (t[l] || 0) | 1 << i - n - 1;
    }
    return t;
}
class Pu {
    constructor(t, {
        location: n = re.location,
        threshold: i = re.threshold,
        distance: l = re.distance,
        includeMatches: r = re.includeMatches,
        findAllMatches: s = re.findAllMatches,
        minMatchCharLength: m = re.minMatchCharLength,
        isCaseSensitive: h = re.isCaseSensitive,
        ignoreLocation: p = re.ignoreLocation
    } = {}) {
        if (this.options = {
            location: n,
            threshold: i,
            distance: l,
            includeMatches: r,
            findAllMatches: s,
            minMatchCharLength: m,
            isCaseSensitive: h,
            ignoreLocation: p
        }, this.pattern = h ? t : t.toLowerCase(), this.chunks = [], !this.pattern.length)
            return;
        const b = (Z, y) => {
            this.chunks.push({
                pattern: Z,
                alphabet: yZ(Z),
                startIndex: y
            });
        }, g = this.pattern.length;
        if (g > $n) {
            let Z = 0;
            const y = g % $n, G = g - y;
            for (; Z < G;)
                b(this.pattern.substr(Z, $n), Z), Z += $n;
            if (y) {
                const X = g - $n;
                b(this.pattern.substr(X), X);
            }
        } else
            b(this.pattern, 0);
    }
    searchIn(t) {
        const { isCaseSensitive: n, includeMatches: i } = this.options;
        if (n || (t = t.toLowerCase()), this.pattern === t) {
            let G = {
                isMatch: !0,
                score: 0
            };
            return i && (G.indices = [[0, t.length - 1]]), G;
        }
        const {
            location: l,
            distance: r,
            threshold: s,
            findAllMatches: m,
            minMatchCharLength: h,
            ignoreLocation: p
        } = this.options;
        let b = [], g = 0, Z = !1;
        this.chunks.forEach(({ pattern: G, alphabet: X, startIndex: W }) => {
            const { isMatch: V, score: C, indices: H } = gZ(t, G, X, {
                location: l + W,
                distance: r,
                threshold: s,
                findAllMatches: m,
                minMatchCharLength: h,
                includeMatches: i,
                ignoreLocation: p
            });
            V && (Z = !0), g += C, V && H && (b = [...b, ...H]);
        });
        let y = {
            isMatch: Z,
            score: Z ? g / this.chunks.length : 1
        };
        return Z && i && (y.indices = b), y;
    }
}
class Sn {
    constructor(t) {
        this.pattern = t;
    }
    static isMultiMatch(t) {
        return xs(t, this.multiRegex);
    }
    static isSingleMatch(t) {
        return xs(t, this.singleRegex);
    }
    search() {
    }
}
function xs(e, t) {
    const n = e.match(t);
    return n ? n[1] : null;
}
class ZZ extends Sn {
    constructor(t) {
        super(t);
    }
    static get type() {
        return "exact";
    }
    static get multiRegex() {
        return /^="(.*)"$/;
    }
    static get singleRegex() {
        return /^=(.*)$/;
    }
    search(t) {
        const n = t === this.pattern;
        return {
            isMatch: n,
            score: n ? 0 : 1,
            indices: [0, this.pattern.length - 1]
        };
    }
}
class vZ extends Sn {
    constructor(t) {
        super(t);
    }
    static get type() {
        return "inverse-exact";
    }
    static get multiRegex() {
        return /^!"(.*)"$/;
    }
    static get singleRegex() {
        return /^!(.*)$/;
    }
    search(t) {
        const i = t.indexOf(this.pattern) === -1;
        return {
            isMatch: i,
            score: i ? 0 : 1,
            indices: [0, t.length - 1]
        };
    }
}
class xZ extends Sn {
    constructor(t) {
        super(t);
    }
    static get type() {
        return "prefix-exact";
    }
    static get multiRegex() {
        return /^\^"(.*)"$/;
    }
    static get singleRegex() {
        return /^\^(.*)$/;
    }
    search(t) {
        const n = t.startsWith(this.pattern);
        return {
            isMatch: n,
            score: n ? 0 : 1,
            indices: [0, this.pattern.length - 1]
        };
    }
}
class GZ extends Sn {
    constructor(t) {
        super(t);
    }
    static get type() {
        return "inverse-prefix-exact";
    }
    static get multiRegex() {
        return /^!\^"(.*)"$/;
    }
    static get singleRegex() {
        return /^!\^(.*)$/;
    }
    search(t) {
        const n = !t.startsWith(this.pattern);
        return {
            isMatch: n,
            score: n ? 0 : 1,
            indices: [0, t.length - 1]
        };
    }
}
class XZ extends Sn {
    constructor(t) {
        super(t);
    }
    static get type() {
        return "suffix-exact";
    }
    static get multiRegex() {
        return /^"(.*)"\$$/;
    }
    static get singleRegex() {
        return /^(.*)\$$/;
    }
    search(t) {
        const n = t.endsWith(this.pattern);
        return {
            isMatch: n,
            score: n ? 0 : 1,
            indices: [t.length - this.pattern.length, t.length - 1]
        };
    }
}
class WZ extends Sn {
    constructor(t) {
        super(t);
    }
    static get type() {
        return "inverse-suffix-exact";
    }
    static get multiRegex() {
        return /^!"(.*)"\$$/;
    }
    static get singleRegex() {
        return /^!(.*)\$$/;
    }
    search(t) {
        const n = !t.endsWith(this.pattern);
        return {
            isMatch: n,
            score: n ? 0 : 1,
            indices: [0, t.length - 1]
        };
    }
}
class Bu extends Sn {
    constructor(t, {
        location: n = re.location,
        threshold: i = re.threshold,
        distance: l = re.distance,
        includeMatches: r = re.includeMatches,
        findAllMatches: s = re.findAllMatches,
        minMatchCharLength: m = re.minMatchCharLength,
        isCaseSensitive: h = re.isCaseSensitive,
        ignoreLocation: p = re.ignoreLocation
    } = {}) {
        super(t), this._bitapSearch = new Pu(t, {
            location: n,
            threshold: i,
            distance: l,
            includeMatches: r,
            findAllMatches: s,
            minMatchCharLength: m,
            isCaseSensitive: h,
            ignoreLocation: p
        });
    }
    static get type() {
        return "fuzzy";
    }
    static get multiRegex() {
        return /^"(.*)"$/;
    }
    static get singleRegex() {
        return /^(.*)$/;
    }
    search(t) {
        return this._bitapSearch.searchIn(t);
    }
}
class Ou extends Sn {
    constructor(t) {
        super(t);
    }
    static get type() {
        return "include";
    }
    static get multiRegex() {
        return /^'"(.*)"$/;
    }
    static get singleRegex() {
        return /^'(.*)$/;
    }
    search(t) {
        let n = 0, i;
        const l = [], r = this.pattern.length;
        for (; (i = t.indexOf(this.pattern, n)) > -1;)
            n = i + r, l.push([i, n - 1]);
        const s = !!l.length;
        return {
            isMatch: s,
            score: s ? 0 : 1,
            indices: l
        };
    }
}
const Nl = [
    ZZ,
    Ou,
    xZ,
    GZ,
    WZ,
    XZ,
    vZ,
    Bu
], Gs = Nl.length, VZ = / +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/, IZ = "|";
function kZ(e, t = {}) {
    return e.split(IZ).map((n) => {
        let i = n.trim().split(VZ).filter((r) => r && !!r.trim()), l = [];
        for (let r = 0, s = i.length; r < s; r += 1) {
            const m = i[r];
            let h = !1, p = -1;
            for (; !h && ++p < Gs;) {
                const b = Nl[p];
                let g = b.isMultiMatch(m);
                g && (l.push(new b(g, t)), h = !0);
            }
            if (!h)
                for (p = -1; ++p < Gs;) {
                    const b = Nl[p];
                    let g = b.isSingleMatch(m);
                    if (g) {
                        l.push(new b(g, t));
                        break;
                    }
                }
        }
        return l;
    });
}
const CZ = /* @__PURE__ */ new Set([Bu.type, Ou.type]);
class SZ {
    constructor(t, {
        isCaseSensitive: n = re.isCaseSensitive,
        includeMatches: i = re.includeMatches,
        minMatchCharLength: l = re.minMatchCharLength,
        ignoreLocation: r = re.ignoreLocation,
        findAllMatches: s = re.findAllMatches,
        location: m = re.location,
        threshold: h = re.threshold,
        distance: p = re.distance
    } = {}) {
        this.query = null, this.options = {
            isCaseSensitive: n,
            includeMatches: i,
            minMatchCharLength: l,
            findAllMatches: s,
            ignoreLocation: r,
            location: m,
            threshold: h,
            distance: p
        }, this.pattern = n ? t : t.toLowerCase(), this.query = kZ(this.pattern, this.options);
    }
    static condition(t, n) {
        return n.useExtendedSearch;
    }
    searchIn(t) {
        const n = this.query;
        if (!n)
            return {
                isMatch: !1,
                score: 1
            };
        const { includeMatches: i, isCaseSensitive: l } = this.options;
        t = l ? t : t.toLowerCase();
        let r = 0, s = [], m = 0;
        for (let h = 0, p = n.length; h < p; h += 1) {
            const b = n[h];
            s.length = 0, r = 0;
            for (let g = 0, Z = b.length; g < Z; g += 1) {
                const y = b[g], { isMatch: G, indices: X, score: W } = y.search(t);
                if (G) {
                    if (r += 1, m += W, i) {
                        const V = y.constructor.type;
                        CZ.has(V) ? s = [...s, ...X] : s.push(X);
                    }
                } else {
                    m = 0, r = 0, s.length = 0;
                    break;
                }
            }
            if (r) {
                let g = {
                    isMatch: !0,
                    score: m / r
                };
                return i && (g.indices = s), g;
            }
        }
        return {
            isMatch: !1,
            score: 1
        };
    }
}
const zl = [];
function RZ(...e) {
    zl.push(...e);
}
function wl(e, t) {
    for (let n = 0, i = zl.length; n < i; n += 1) {
        let l = zl[n];
        if (l.condition(e, t))
            return new l(e, t);
    }
    return new Pu(e, t);
}
const sa = {
    AND: "$and",
    OR: "$or"
}, Jl = {
    PATH: "$path",
    PATTERN: "$val"
}, Ml = (e) => !!(e[sa.AND] || e[sa.OR]), LZ = (e) => !!e[Jl.PATH], YZ = (e) => !mn(e) && $u(e) && !Ml(e), Xs = (e) => ({
    [sa.AND]: Object.keys(e).map((t) => ({
        [t]: e[t]
    }))
});
function Au(e, t, { auto: n = !0 } = {}) {
    const i = (l) => {
        let r = Object.keys(l);
        const s = LZ(l);
        if (!s && r.length > 1 && !Ml(l))
            return i(Xs(l));
        if (YZ(l)) {
            const h = s ? l[Jl.PATH] : r[0], p = s ? l[Jl.PATTERN] : l[h];
            if (!Dt(p))
                throw new Error(iZ(h));
            const b = {
                keyId: Hl(h),
                pattern: p
            };
            return n && (b.searcher = wl(p, t)), b;
        }
        let m = {
            children: [],
            operator: r[0]
        };
        return r.forEach((h) => {
            const p = l[h];
            mn(p) && p.forEach((b) => {
                m.children.push(i(b));
            });
        }), m;
    };
    return Ml(e) || (e = Xs(e)), i(e);
}
function KZ(e, { ignoreFieldNorm: t = re.ignoreFieldNorm }) {
    e.forEach((n) => {
        let i = 1;
        n.matches.forEach(({ key: l, norm: r, score: s }) => {
            const m = l ? l.weight : null;
            i *= Math.pow(
                s === 0 && m ? Number.EPSILON : s,
                (m || 1) * (t ? 1 : r)
            );
        }), n.score = i;
    });
}
function TZ(e, t) {
    const n = e.matches;
    t.matches = [], Kt(n) && n.forEach((i) => {
        if (!Kt(i.indices) || !i.indices.length)
            return;
        const { indices: l, value: r } = i;
        let s = {
            indices: l,
            value: r
        };
        i.key && (s.key = i.key.src), i.idx > -1 && (s.refIndex = i.idx), t.matches.push(s);
    });
}
function HZ(e, t) {
    t.score = e.score;
}
function NZ(e, t, {
    includeMatches: n = re.includeMatches,
    includeScore: i = re.includeScore
} = {}) {
    const l = [];
    return n && l.push(TZ), i && l.push(HZ), e.map((r) => {
        const { idx: s } = r, m = {
            item: t[s],
            refIndex: s
        };
        return l.length && l.forEach((h) => {
            h(r, m);
        }), m;
    });
}
class ai {
    constructor(t, n = {}, i) {
        this.options = { ...re, ...n }, this.options.useExtendedSearch, this._keyStore = new rZ(this.options.keys), this.setCollection(t, i);
    }
    setCollection(t, n) {
        if (this._docs = t, n && !(n instanceof Ir))
            throw new Error(nZ);
        this._myIndex = n || Eu(this.options.keys, this._docs, {
            getFn: this.options.getFn,
            fieldNormWeight: this.options.fieldNormWeight
        });
    }
    add(t) {
        Kt(t) && (this._docs.push(t), this._myIndex.add(t));
    }
    remove(t = () => !1) {
        const n = [];
        for (let i = 0, l = this._docs.length; i < l; i += 1) {
            const r = this._docs[i];
            t(r, i) && (this.removeAt(i), i -= 1, l -= 1, n.push(r));
        }
        return n;
    }
    removeAt(t) {
        this._docs.splice(t, 1), this._myIndex.removeAt(t);
    }
    getIndex() {
        return this._myIndex;
    }
    search(t, { limit: n = -1 } = {}) {
        const {
            includeMatches: i,
            includeScore: l,
            shouldSort: r,
            sortFn: s,
            ignoreFieldNorm: m
        } = this.options;
        let h = Dt(t) ? Dt(this._docs[0]) ? this._searchStringList(t) : this._searchObjectList(t) : this._searchLogical(t);
        return KZ(h, { ignoreFieldNorm: m }), r && h.sort(s), Fu(n) && n > -1 && (h = h.slice(0, n)), NZ(h, this._docs, {
            includeMatches: i,
            includeScore: l
        });
    }
    _searchStringList(t) {
        const n = wl(t, this.options), { records: i } = this._myIndex, l = [];
        return i.forEach(({ v: r, i: s, n: m }) => {
            if (!Kt(r))
                return;
            const { isMatch: h, score: p, indices: b } = n.searchIn(r);
            h && l.push({
                item: r,
                idx: s,
                matches: [{ score: p, value: r, norm: m, indices: b }]
            });
        }), l;
    }
    _searchLogical(t) {
        const n = Au(t, this.options), i = (m, h, p) => {
            if (!m.children) {
                const { keyId: g, searcher: Z } = m, y = this._findMatches({
                    key: this._keyStore.get(g),
                    value: this._myIndex.getValueForItemAtKeyId(h, g),
                    searcher: Z
                });
                return y && y.length ? [
                    {
                        idx: p,
                        item: h,
                        matches: y
                    }
                ] : [];
            }
            const b = [];
            for (let g = 0, Z = m.children.length; g < Z; g += 1) {
                const y = m.children[g], G = i(y, h, p);
                if (G.length)
                    b.push(...G);
                else if (m.operator === sa.AND)
                    return [];
            }
            return b;
        }, l = this._myIndex.records, r = {}, s = [];
        return l.forEach(({ $: m, i: h }) => {
            if (Kt(m)) {
                let p = i(n, m, h);
                p.length && (r[h] || (r[h] = { idx: h, item: m, matches: [] }, s.push(r[h])), p.forEach(({ matches: b }) => {
                    r[h].matches.push(...b);
                }));
            }
        }), s;
    }
    _searchObjectList(t) {
        const n = wl(t, this.options), { keys: i, records: l } = this._myIndex, r = [];
        return l.forEach(({ $: s, i: m }) => {
            if (!Kt(s))
                return;
            let h = [];
            i.forEach((p, b) => {
                h.push(
                    ...this._findMatches({
                        key: p,
                        value: s[b],
                        searcher: n
                    })
                );
            }), h.length && r.push({
                idx: m,
                item: s,
                matches: h
            });
        }), r;
    }
    _findMatches({ key: t, value: n, searcher: i }) {
        if (!Kt(n))
            return [];
        let l = [];
        if (mn(n))
            n.forEach(({ v: r, i: s, n: m }) => {
                if (!Kt(r))
                    return;
                const { isMatch: h, score: p, indices: b } = i.searchIn(r);
                h && l.push({
                    score: p,
                    key: t,
                    value: r,
                    idx: s,
                    norm: m,
                    indices: b
                });
            });
        else {
            const { v: r, n: s } = n, { isMatch: m, score: h, indices: p } = i.searchIn(r);
            m && l.push({ score: h, key: t, value: r, norm: s, indices: p });
        }
        return l;
    }
}
ai.version = "7.0.0";
ai.createIndex = Eu;
ai.parseIndex = bZ;
ai.config = re;
ai.parseQuery = Au;
RZ(SZ);
function zZ(e, t, n, i = null) {
    if (!e || n !== e.tableId)
        return !1;
    switch (t) {
        case "tableName":
        case "tableComment":
            return t === e.focusType;
    }
    return i === e.columnId && t === e.focusType;
}
const wZ = (e, t, n) => (e == null ? void 0 : e.tableId) === t && e.selectColumnIds.includes(n);
function JZ(e, t, n, i = null) {
    if ((e == null ? void 0 : e.tableId) !== n)
        return !1;
    switch (t) {
        case de.tableName:
        case de.tableComment:
            return t === e.focusType && e.edit;
    }
    return i === e.columnId && t === e.focusType && e.edit;
}
function ro(e) {
    const t = e.value.length;
    e.selectionStart = t, e.selectionEnd = t, e.focus();
}
const Ws = N`
  display: inline-flex;
  height: 20px;
  box-sizing: border-box;
  align-items: center;
  vertical-align: middle;
  color: var(--active);
  background-color: transparent;
  border-bottom: solid transparent 1.5px;
  ${Lt.paragraph};
  line-height: normal;

  &.placeholder {
    color: var(--placeholder);
  }

  &.focus {
    border-bottom: solid var(--focus) 1.5px;
  }

  &.edit {
    border-bottom: solid var(--input-active) 1.5px;
  }
`, MZ = N`
  cursor: default;
`, FZ = N`
  user-select: none;
`, $Z = N`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`, Ct = (e, t) => {
        const n = Ue(), { addUnsubscribe: i } = Ge(), l = () => {
            const s = !e.edit;
            return {
                placeholder: s && !e.value.trim(),
                focus: s && e.focus,
                edit: e.edit
            };
        }, r = (s) => {
            var m;
            (m = e.onBlur) == null || m.call(e, s), t.host.dispatchEvent(Ki());
        };
        return zi(() => {
            i(Pe(e).subscribe((s) => {
                const m = n.value;
                s !== "edit" || !e.edit || !m || ro(m);
            }), Pe(e).subscribe((s) => {
                s === "edit" && (e.edit || t.host.dispatchEvent(Ki()));
            }));
        }), Te(() => {
            const s = n.value;
            !e.autofocus || !s || ro(s);
        }), () => {
            //FLEXYGO CHANGES
            //change width of edit-input
            const s = e.focus || e.edit;
            return e.edit ? I`
          <input
            ${De(n)}
            class=${["edit-input", Ws, l(), e.class]}
            style=${{
                    width: `100%`
                }}
            ...${ca({
                    title: e.title,
                    placeholder: e.placeholder
                })}
            type="text"
            spellcheck="false"
            ?data-focus-border-bottom=${s}
            .value=${e.value ?? ""}
            @input=${e.onInput}
            @blur=${r}
            @keydown=${e.onKeydown}
          />
        ` : I`
          <div
            class=${[
                    "edit-input",
                    Ws,
                    MZ,
                    FZ,
                    l(),
                    e.class
                ]}
            ...${ca({ title: e.title })}
            ?data-focus-border-bottom=${s}
          >
            <span class=${$Z}>
              ${e.value.trim() ? e.value : e.placeholder}
            </span>
          </div>
        `;
        };
    };
var Qu = { exports: {} };
(function (e) {
    e.exports = /******/
        function (t) {
            var n = {};
            function i(l) {
                if (n[l])
                    return n[l].exports;
                var r = n[l] = {
                    /******/
                    exports: {},
                    /******/
                    id: l,
                    /******/
                    loaded: !1
                    /******/
                };
                return t[l].call(r.exports, r, r.exports, i), r.loaded = !0, r.exports;
            }
            return i.m = t, i.c = n, i.p = "", i(0);
        }([
            /* 0 */
            /***/
            function (t, n, i) {
                t.exports = i(1);
            },
            /* 1 */
            /***/
            function (t, n, i) {
                Object.defineProperty(n, "__esModule", {
                    value: !0
                });
                var l = i(2);
                Object.defineProperty(n, "combineChunks", {
                    enumerable: !0,
                    get: function () {
                        return l.combineChunks;
                    }
                }), Object.defineProperty(n, "fillInChunks", {
                    enumerable: !0,
                    get: function () {
                        return l.fillInChunks;
                    }
                }), Object.defineProperty(n, "findAll", {
                    enumerable: !0,
                    get: function () {
                        return l.findAll;
                    }
                }), Object.defineProperty(n, "findChunks", {
                    enumerable: !0,
                    get: function () {
                        return l.findChunks;
                    }
                });
            },
            /* 2 */
            /***/
            function (t, n) {
                Object.defineProperty(n, "__esModule", {
                    value: !0
                }), n.findAll = function (p) {
                    var b = p.autoEscape, g = p.caseSensitive, Z = g === void 0 ? !1 : g, y = p.findChunks, G = y === void 0 ? l : y, X = p.sanitize, W = p.searchWords, V = p.textToHighlight;
                    return r({
                        chunksToHighlight: i({
                            chunks: G({
                                autoEscape: b,
                                caseSensitive: Z,
                                sanitize: X,
                                searchWords: W,
                                textToHighlight: V
                            })
                        }),
                        totalLength: V ? V.length : 0
                    });
                };
                var i = n.combineChunks = function (p) {
                    var b = p.chunks;
                    return b = b.sort(function (g, Z) {
                        return g.start - Z.start;
                    }).reduce(function (g, Z) {
                        if (g.length === 0)
                            return [Z];
                        var y = g.pop();
                        if (Z.start <= y.end) {
                            var G = Math.max(y.end, Z.end);
                            g.push({ highlight: !1, start: y.start, end: G });
                        } else
                            g.push(y, Z);
                        return g;
                    }, []), b;
                }, l = function (p) {
                    var b = p.autoEscape, g = p.caseSensitive, Z = p.sanitize, y = Z === void 0 ? s : Z, G = p.searchWords, X = p.textToHighlight;
                    return X = y(X), G.filter(function (W) {
                        return W;
                    }).reduce(function (W, V) {
                        V = y(V), b && (V = m(V));
                        for (var C = new RegExp(V, g ? "g" : "gi"), H = void 0; H = C.exec(X);) {
                            var L = H.index, E = C.lastIndex;
                            E > L && W.push({ highlight: !1, start: L, end: E }), H.index === C.lastIndex && C.lastIndex++;
                        }
                        return W;
                    }, []);
                };
                n.findChunks = l;
                var r = n.fillInChunks = function (p) {
                    var b = p.chunksToHighlight, g = p.totalLength, Z = [], y = function (W, V, C) {
                        V - W > 0 && Z.push({
                            start: W,
                            end: V,
                            highlight: C
                        });
                    };
                    if (b.length === 0)
                        y(0, g, !1);
                    else {
                        var G = 0;
                        b.forEach(function (X) {
                            y(G, X.start, !1), y(X.start, X.end, !0), G = X.end;
                        }), y(G, g, !1);
                    }
                    return Z;
                };
                function s(h) {
                    return h;
                }
                function m(h) {
                    return h.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
                }
            }
            /******/
        ]);
})(Qu);
var UZ = Qu.exports;
const jZ = N`
  color: var(--active);
`, Fl = (e, t) => () => UZ.findAll({ ...e, autoEscape: !0 }).map(({ end: i, highlight: l, start: r }) => {
    const s = e.textToHighlight.substring(r, i);
    return l ? I`<span class=${jZ}>${s}</span>` : s;
}), EZ = N`
  display: flex;
`, PZ = N`
  display: inline-flex;
  align-items: center;

  padding-left: 0.5em;
  padding-right: 0.5em;
  padding-bottom: 0.05em;
  margin-right: 4px;
  ${Lt.paragraph};

  white-space: nowrap;
  color: var(--foreground);
  border: 1px solid var(--foreground);
  border-radius: 3px;

  &:last-child {
    margin-right: 0;
  }
`, BZ = N`
  padding-left: 0.25em;
  padding-right: 0.25em;
  padding-bottom: 0.05em;
  margin-right: 2px;
  font-size: 10px;

  white-space: nowrap;
  color: var(--placeholder);
  border: 1px solid var(--placeholder);
  border-radius: 3px;

  &:last-child {
    margin-right: 0;
  }
`, Gn = (e, t) => () => {
        const i = Su(e.shortcut).map(([l, r]) => [...l, r].join(" + "));
        return I`
      <div class=${["kbd", EZ]}>
        ${i.map((l) => I`<div class=${e.mini ? BZ : PZ}>
              ${l}
            </div>`)}
      </div>
    `;
    }, OZ = [
        { name: "BIGINT", primitiveType: "long" },
        { name: "BINARY", primitiveType: "string" },
        { name: "BIT", primitiveType: "int" },
        { name: "BLOB", primitiveType: "lob" },
        { name: "BOOL", primitiveType: "boolean" },
        { name: "BOOLEAN", primitiveType: "boolean" },
        { name: "CHAR", primitiveType: "string" },
        { name: "DATE", primitiveType: "date" },
        { name: "DATETIME", primitiveType: "dateTime" },
        { name: "DEC", primitiveType: "decimal" },
        { name: "DECIMAL", primitiveType: "decimal" },
        { name: "DOUBLE PRECISION", primitiveType: "double" },
        { name: "DOUBLE", primitiveType: "double" },
        { name: "ENUM", primitiveType: "string" },
        { name: "FIXED", primitiveType: "decimal" },
        { name: "FLOAT", primitiveType: "float" },
        { name: "GEOMETRY", primitiveType: "string" },
        { name: "GEOMETRYCOLLECTION", primitiveType: "string" },
        { name: "INT", primitiveType: "int" },
        { name: "INTEGER", primitiveType: "int" },
        { name: "JSON", primitiveType: "lob" },
        { name: "LINESTRING", primitiveType: "string" },
        { name: "LONGBLOB", primitiveType: "lob" },
        { name: "LONGTEXT", primitiveType: "lob" },
        { name: "MEDIUMBLOB", primitiveType: "lob" },
        { name: "MEDIUMINT", primitiveType: "int" },
        { name: "MEDIUMTEXT", primitiveType: "lob" },
        { name: "MULTILINESTRING", primitiveType: "string" },
        { name: "MULTIPOINT", primitiveType: "string" },
        { name: "MULTIPOLYGON", primitiveType: "string" },
        { name: "NUMERIC", primitiveType: "decimal" },
        { name: "POINT", primitiveType: "string" },
        { name: "POLYGON", primitiveType: "string" },
        { name: "REAL", primitiveType: "double" },
        { name: "SET", primitiveType: "string" },
        { name: "SMALLINT", primitiveType: "int" },
        { name: "TEXT", primitiveType: "lob" },
        { name: "TIME", primitiveType: "time" },
        { name: "TIMESTAMP", primitiveType: "dateTime" },
        { name: "TINYBLOB", primitiveType: "lob" },
        { name: "TINYINT", primitiveType: "int" },
        { name: "TINYTEXT", primitiveType: "lob" },
        { name: "VARBINARY", primitiveType: "string" },
        { name: "VARCHAR", primitiveType: "string" },
        { name: "YEAR", primitiveType: "int" }
    ], AZ = [
        { name: "bigint", primitiveType: "long" },
        { name: "binary", primitiveType: "lob" },
        { name: "bit", primitiveType: "int" },
        { name: "char", primitiveType: "string" },
        { name: "date", primitiveType: "date" },
        { name: "datetime", primitiveType: "dateTime" },
        { name: "datetime2", primitiveType: "dateTime" },
        { name: "datetimeoffset", primitiveType: "dateTime" },
        { name: "decimal", primitiveType: "decimal" },
        { name: "float", primitiveType: "double" },
        { name: "geography", primitiveType: "string" },
        { name: "geometry", primitiveType: "string" },
        { name: "image", primitiveType: "lob" },
        { name: "int", primitiveType: "int" },
        { name: "money", primitiveType: "double" },
        { name: "nchar", primitiveType: "string" },
        { name: "ntext", primitiveType: "lob" },
        { name: "numeric", primitiveType: "float" },
        { name: "nvarchar", primitiveType: "string" },
        { name: "real", primitiveType: "float" },
        { name: "smalldatetime", primitiveType: "dateTime" },
        { name: "smallint", primitiveType: "int" },
        { name: "smallmoney", primitiveType: "float" },
        { name: "sql_variant", primitiveType: "string" },
        { name: "text", primitiveType: "lob" },
        { name: "time", primitiveType: "time" },
        { name: "tinyint", primitiveType: "int" },
        { name: "uniqueidentifier", primitiveType: "string" },
        { name: "varbinary", primitiveType: "string" },
        { name: "varchar", primitiveType: "string" },
        { name: "xml", primitiveType: "lob" }
    ], QZ = [
        { name: "BIGINT", primitiveType: "long" },
        { name: "BINARY", primitiveType: "string" },
        { name: "BIT", primitiveType: "int" },
        { name: "BLOB", primitiveType: "lob" },
        { name: "BOOL", primitiveType: "boolean" },
        { name: "BOOLEAN", primitiveType: "boolean" },
        { name: "CHAR", primitiveType: "string" },
        { name: "DATE", primitiveType: "date" },
        { name: "DATETIME", primitiveType: "dateTime" },
        { name: "DEC", primitiveType: "decimal" },
        { name: "DECIMAL", primitiveType: "decimal" },
        { name: "DOUBLE PRECISION", primitiveType: "double" },
        { name: "DOUBLE", primitiveType: "double" },
        { name: "ENUM", primitiveType: "string" },
        { name: "FLOAT", primitiveType: "float" },
        { name: "GEOMETRY", primitiveType: "string" },
        { name: "GEOMETRYCOLLECTION", primitiveType: "string" },
        { name: "INT", primitiveType: "int" },
        { name: "INTEGER", primitiveType: "int" },
        { name: "JSON", primitiveType: "lob" },
        { name: "LINESTRING", primitiveType: "string" },
        { name: "LONGBLOB", primitiveType: "lob" },
        { name: "LONGTEXT", primitiveType: "lob" },
        { name: "MEDIUMBLOB", primitiveType: "lob" },
        { name: "MEDIUMINT", primitiveType: "int" },
        { name: "MEDIUMTEXT", primitiveType: "lob" },
        { name: "MULTILINESTRING", primitiveType: "string" },
        { name: "MULTIPOINT", primitiveType: "string" },
        { name: "MULTIPOLYGON", primitiveType: "string" },
        { name: "NUMERIC", primitiveType: "decimal" },
        { name: "POINT", primitiveType: "string" },
        { name: "POLYGON", primitiveType: "string" },
        { name: "SET", primitiveType: "string" },
        { name: "SMALLINT", primitiveType: "int" },
        { name: "TEXT", primitiveType: "lob" },
        { name: "TIME", primitiveType: "time" },
        { name: "TIMESTAMP", primitiveType: "dateTime" },
        { name: "TINYBLOB", primitiveType: "lob" },
        { name: "TINYINT", primitiveType: "int" },
        { name: "TINYTEXT", primitiveType: "lob" },
        { name: "VARBINARY", primitiveType: "string" },
        { name: "VARCHAR", primitiveType: "string" },
        { name: "YEAR", primitiveType: "int" }
    ], DZ = [
        { name: "BFILE", primitiveType: "lob" },
        { name: "BINARY_DOUBLE", primitiveType: "double" },
        { name: "BINARY_FLOAT", primitiveType: "float" },
        { name: "BLOB", primitiveType: "lob" },
        { name: "CHAR", primitiveType: "string" },
        { name: "CLOB", primitiveType: "lob" },
        { name: "DATE", primitiveType: "date" },
        { name: "DATETIME", primitiveType: "dateTime" },
        { name: "LONG RAW", primitiveType: "lob" },
        { name: "LONG", primitiveType: "lob" },
        { name: "NCHAR", primitiveType: "string" },
        { name: "NCLOB", primitiveType: "lob" },
        { name: "NUMBER", primitiveType: "long" },
        { name: "NVARCHAR2", primitiveType: "string" },
        { name: "RAW", primitiveType: "lob" },
        { name: "TIMESTAMP WITH LOCAL TIME ZONE", primitiveType: "dateTime" },
        { name: "TIMESTAMP WITH TIME ZONE", primitiveType: "dateTime" },
        { name: "TIMESTAMP", primitiveType: "dateTime" },
        { name: "UriType", primitiveType: "string" },
        { name: "VARCHAR", primitiveType: "string" },
        { name: "VARCHAR2", primitiveType: "string" },
        { name: "XMLType", primitiveType: "string" }
    ], _Z = [
        { name: "bigint", primitiveType: "long" },
        { name: "bigserial", primitiveType: "long" },
        { name: "bit varying", primitiveType: "int" },
        { name: "bit", primitiveType: "int" },
        { name: "bool", primitiveType: "boolean" },
        { name: "boolean", primitiveType: "boolean" },
        { name: "box", primitiveType: "string" },
        { name: "bytea", primitiveType: "string" },
        { name: "char", primitiveType: "string" },
        { name: "character varying", primitiveType: "string" },
        { name: "character", primitiveType: "string" },
        { name: "cidr", primitiveType: "string" },
        { name: "circle", primitiveType: "string" },
        { name: "date", primitiveType: "date" },
        { name: "decimal", primitiveType: "decimal" },
        { name: "double precision", primitiveType: "double" },
        { name: "float4", primitiveType: "float" },
        { name: "float8", primitiveType: "double" },
        { name: "inet", primitiveType: "string" },
        { name: "int", primitiveType: "int" },
        { name: "int2", primitiveType: "int" },
        { name: "int4", primitiveType: "int" },
        { name: "int8", primitiveType: "long" },
        { name: "integer", primitiveType: "int" },
        { name: "interval", primitiveType: "time" },
        { name: "json", primitiveType: "lob" },
        { name: "jsonb", primitiveType: "lob" },
        { name: "line", primitiveType: "string" },
        { name: "lseg", primitiveType: "string" },
        { name: "macaddr", primitiveType: "string" },
        { name: "macaddr8", primitiveType: "string" },
        { name: "money", primitiveType: "double" },
        { name: "numeric", primitiveType: "decimal" },
        { name: "path", primitiveType: "string" },
        { name: "pg_lsn", primitiveType: "int" },
        { name: "point", primitiveType: "string" },
        { name: "polygon", primitiveType: "string" },
        { name: "real", primitiveType: "float" },
        { name: "serial", primitiveType: "int" },
        { name: "serial2", primitiveType: "int" },
        { name: "serial4", primitiveType: "int" },
        { name: "serial8", primitiveType: "long" },
        { name: "smallint", primitiveType: "int" },
        { name: "smallserial", primitiveType: "int" },
        { name: "text", primitiveType: "string" },
        { name: "time with time zone", primitiveType: "time" },
        { name: "time", primitiveType: "time" },
        { name: "timestamp with time zone", primitiveType: "dateTime" },
        { name: "timestamp", primitiveType: "dateTime" },
        { name: "timestamptz", primitiveType: "dateTime" },
        { name: "timetz", primitiveType: "time" },
        { name: "tsquery", primitiveType: "string" },
        { name: "tsvector", primitiveType: "string" },
        { name: "txid_snapshot", primitiveType: "string" },
        { name: "uuid", primitiveType: "string" },
        { name: "varbit", primitiveType: "int" },
        { name: "varchar", primitiveType: "string" },
        { name: "xml", primitiveType: "lob" }
    ], qZ = [
        { name: "BLOB", primitiveType: "lob" },
        { name: "INTEGER", primitiveType: "int" },
        { name: "NUMERIC", primitiveType: "decimal" },
        { name: "REAL", primitiveType: "double" },
        { name: "TEXT", primitiveType: "string" }
    ], Du = {
        [Fe.MariaDB]: OZ,
        [Fe.MSSQL]: AZ,
        [Fe.MySQL]: QZ,
        [Fe.Oracle]: DZ,
        [Fe.PostgreSQL]: _Z,
        [Fe.SQLite]: qZ
    }, ev = N`
  position: relative;
  outline: none;
`, tv = N`
  position: absolute;
  z-index: 1;
  top: ${Y1}px;
  left: 0;
  color: var(--foreground);
  background-color: var(--table-background);
  border: 1px solid var(--table-border);
  white-space: nowrap;
  ${Lt.paragraph};
`, nv = N`
  display: flex;
  align-items: center;
  padding: 0 4px;
  height: 20px;
  cursor: pointer;

  &:hover {
    background-color: var(--column-hover);
  }

  &.selected {
    background-color: var(--column-select);

    .kbd {
      visibility: visible;
    }
  }

  & > .kbd {
    margin-left: auto;
    padding-left: 6px;
    visibility: hidden;
  }
`, iv = Be([
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "Tab",
        "Enter"
    ]), kr = (e, t) => {
        var E;
        const n = se(t, (E = e.app) == null ? void 0 : E.value), i = Se({
            hints: [],
            index: -1
        }), l = Ue(), { addUnsubscribe: r } = Ge(), s = (J) => {
            const { store: K } = n.value, { settings: Y } = K.state, T = Du[Y.database] ?? [], z = J.trim();
            i.index = -1, i.hints = ln(z) ? [] : new ai(T, {
                keys: ["name"]
            }).search(z).map((M) => M.item);
        }, m = (J) => {
            const K = i.hints[J];
            if (!K)
                return;
            const { store: Y } = n.value;
            Y.dispatch(K1({
                id: e.columnId,
                tableId: e.tableId,
                value: K.name
            })), s("");
        }, G = {
            ArrowUp: (J) => {
                if (!i.hints.length)
                    return;
                J.preventDefault();
                const K = i.index - 1;
                i.index = K < 0 ? i.hints.length - 1 : K;
            },
            ArrowDown: (J) => {
                if (!i.hints.length)
                    return;
                J.preventDefault();
                const K = i.index + 1;
                i.index = K > i.hints.length - 1 ? 0 : K;
            },
            ArrowLeft: (J) => {
                i.index = -1;
            },
            ArrowRight: (J) => {
                i.index !== -1 && (J.preventDefault(), m(i.index));
            },
            Tab: (J) => {
                i.index !== -1 && (J.preventDefault(), J.stopPropagation(), m(i.index));
            },
            Enter: (J) => {
                var K;
                i.index !== -1 && (J.stopPropagation(), m(i.index), (K = e.onEditEnd) == null || K.call(e));
            }
        }, X = (J) => {
            var K;
            iv(J.key) && ((K = G[J.key]) == null || K.call(G, J));
        };
        let W = !1, V = -1;
        const C = () => {
            W = !0;
        }, H = (J) => {
            e.edit && (W = !1, clearTimeout(V), V = setTimeout(() => {
                var T, z;
                const K = (T = l.value) == null ? void 0 : T.querySelector("input");
                W && K && e.edit ? ro(K) : (z = e.onBlur) == null || z.call(e, J);
            }, 1));
        }, L = (J) => {
            var Y;
            const K = J.target;
            K && s(K.value), (Y = e.onInput) == null || Y.call(e, J);
        };
        return Te(() => {
            const { store: J } = n.value, { settings: K } = J.state;
            r(Pe(e).subscribe((Y) => {
                Y === "edit" && !e.edit && s("");
            }), Pe(K).subscribe((Y) => {
                Y === "database" && s(e.value);
            }));
        }), () => I`
    <div
      class=${ev}
      ${De(l)}
      tabindex="-1"
      @focus=${C}
      @focusin=${C}
      @focusout=${H}
    >
      <${Ct}
        placeholder="dataType"
        width=${e.width}
        value=${e.value}
        focus=${e.focus}
        edit=${e.edit}
        autofocus=${!0}
        .onInput=${L}
        .onKeydown=${X}
      />
      ${e.edit ? I`
            <div class=${tv}>
              ${et(i.hints, (J) => J.name, (J, K) => I`
                  <div
                    class=${[
                nv,
                { selected: K === i.index }
            ]}
                    @click=${() => m(K)}
                  >
                    <${Fl}
                      searchWords=${[e.value]}
                      textToHighlight=${J.name}
                    />
                    <${Gn} mini=${!0} shortcut="Tab" />
                  </div>
                `)}
            </div>
          ` : null}
    </div>
  `;
    }, ov = N`
  fill: transparent;

  &.pk {
    fill: var(--key-pk);
  }

  &.fk {
    fill: var(--key-fk);
  }

  &.pfk {
    fill: var(--key-pfk);
  }
`, Cr = (e, t) => {
        const n = () => {
            const i = B(e.keys, In.primaryKey), l = B(e.keys, In.foreignKey);
            return {
                pk: i && !l,
                fk: !i && l,
                pfk: i && l
            };
        };
        return () => I`
    <${P}
      class=${["column-col", ov, n()]}
      size=${12}
      name="key"
    />
  `;
    }, av = N`
  display: inline-flex;
  height: 20px;
  box-sizing: border-box;
  align-items: center;
  color: var(--active);
  background-color: transparent;
  border-bottom: solid transparent 1.5px;
  ${Lt.paragraph};
  line-height: normal;
  cursor: default;
  user-select: none;

  &.focus {
    border-bottom: solid var(--focus) 1.5px;
  }
`, Sr = (e, t) => () => I`
    <div
      class=${[av, { focus: e.focus }]}
      style=${{
            width: `${ss}px`,
            "min-width": `${ss}px`
        }}
      title="Not Null"
      ?data-focus-border-bottom=${e.focus}
    >
      ${B(e.options, ie.notNull) ? "N-N" : "NULL"}
    </div>
  `, lv = N`
  display: inline-flex;
  height: 20px;
  box-sizing: border-box;
  align-items: center;
  color: var(--placeholder);
  background-color: transparent;
  border-bottom: solid transparent 1.5px;
  ${Lt.paragraph};
  line-height: normal;
  cursor: default;
  user-select: none;

  &.focus {
    border-bottom: solid var(--focus) 1.5px;
  }

  &.checked {
    color: var(--active);
  }
`, kn = (e, t) => () => I`
    <div
      class=${[
            lv,
            { focus: e.focus, checked: e.checked },
            e.class
        ]}
      style=${{
            width: `${e.width}px`,
            "min-width": `${e.width}px`
        }}
      title=${e.title}
      ?data-focus-border-bottom=${e.focus}
    >
      ${e.text}
    </div>
  `, Rr = N`
  display: flex;
  width: 100%;
  height: ${Ia}px;
  align-items: center;
  fill: transparent;
  color: transparent;
  padding: 0 ${ni}px;

  &:hover {
    fill: var(--foreground);
    color: var(--foreground);
    background-color: var(--column-hover);
  }

  &[data-hover] {
    background-color: var(--column-hover);
  }

  &[data-selected] {
    background-color: var(--column-select);
  }

  & > .column-col {
    padding: ${Si}px ${Wa}px ${Si}px 0;
  }

  &.none-hover {
    background-color: transparent;
  }

  &[data-dragging] {
    opacity: 0.5;
  }

  &[data-ghost] {
    visibility: hidden;
  }
`, rv = N`
  cursor: pointer;
  margin-left: auto;

  &:hover {
    fill: var(--active);
    color: var(--active);
  }
`, cv = (e, t) => {
        var p;
        const n = se(t, (p = e.app) == null ? void 0 : p.value), i = () => {
            const { store: b } = n.value;
            b.dispatch(Md(e.column.tableId, [e.column.id]));
        }, l = (b, g) => {
            const { store: Z } = n.value;
            Z.dispatch(T1({
                tableId: e.column.tableId,
                columnId: e.column.id,
                focusType: g,
                $mod: un(b),
                shiftKey: b.shiftKey
            }));
        }, r = (b) => {
            const { store: g } = n.value;
            g.dispatch(kl(b) ? Fd(b, e.column.tableId, e.column.id) : ia());
        }, s = () => {
            const { store: b } = n.value;
            b.dispatch(sr());
        }, m = (b, g) => {
            const { store: Z } = n.value, y = b.target;
            y && Z.dispatch(H1(g, e.column.tableId, e.column.id, y.value));
        }, h = () => {
            const { store: b } = n.value, { settings: g } = b.state, { column: Z, widthName: y, widthDataType: G, widthDefault: X, widthComment: W } = e;
            return g.columnOrder.map((V) => {
                let C = null;
                switch (V) {
                    case ge.columnName:
                        C = I`
              <div
                class="column-col"
                data-type="columnName"
                @mousedown=${(H) => {
                                l(H, de.columnName);
                            }}
                @dblclick=${() => {
                                r(de.columnName);
                            }}
              >
                <${Ct}
                  placeholder="column"
                  width=${y}
                  value=${Z.name}
                  focus=${e.focusName}
                  edit=${e.editName}
                  autofocus=${!0}
                  .onBlur=${s}
                  .onInput=${(H) => {
                                m(H, de.columnName);
                            }}
                />
              </div>
            `;
                        break;
                    case ge.columnDefault:
                        C = B(g.show, We.columnDefault) ? I`
                  <div
                    class="column-col"
                    data-type="columnDefault"
                    @mousedown=${(H) => {
                                l(H, de.columnDefault);
                            }}
                    @dblclick=${() => {
                                r(de.columnDefault);
                            }}
                  >
                    <${Ct}
                      placeholder="default"
                      width=${X}
                      value=${Z.default}
                      focus=${e.focusDefault}
                      edit=${e.editDefault}
                      autofocus=${!0}
                      .onBlur=${s}
                      .onInput=${(H) => {
                                m(H, de.columnDefault);
                            }}
                    />
                  </div>
                ` : null;
                        break;
                    case ge.columnComment:
                        C = B(g.show, We.columnComment) ? I`
                  <div
                    class="column-col"
                    data-type="columnComment"
                    @mousedown=${(H) => {
                                l(H, de.columnComment);
                            }}
                    @dblclick=${() => {
                                r(de.columnComment);
                            }}
                  >
                    <${Ct}
                      title=${Z.comment}
                      placeholder="comment"
                      width=${W}
                      value=${Z.comment}
                      focus=${e.focusComment}
                      edit=${e.editComment}
                      autofocus=${!0}
                      .onBlur=${s}
                      .onInput=${(H) => {
                                m(H, de.columnComment);
                            }}
                    />
                  </div>
                ` : null;
                        break;
                    case ge.columnDataType:
                        C = B(g.show, We.columnDataType) ? I`
                  <div
                    class="column-col"
                    data-type="columnDataType"
                    @mousedown=${(H) => {
                                l(H, de.columnDataType);
                            }}
                    @dblclick=${() => {
                                r(de.columnDataType);
                            }}
                  >
                    <${kr}
                      app=${n}
                      tableId=${Z.tableId}
                      columnId=${Z.id}
                      width=${G}
                      value=${Z.dataType}
                      focus=${e.focusDataType}
                      edit=${e.editDataType}
                      .onBlur=${s}
                      .onEditEnd=${s}
                      .onInput=${(H) => {
                                m(H, de.columnDataType);
                            }}
                    />
                  </div>
                ` : null;
                        break;
                    case ge.columnNotNull:
                        C = B(g.show, We.columnNotNull) ? I`
                  <div
                    class="column-col"
                    data-type="columnNotNull"
                    @mousedown=${(H) => {
                                l(H, de.columnNotNull);
                            }}
                    @dblclick=${() => {
                                r(de.columnNotNull);
                            }}
                  >
                    <${Sr}
                      options=${Z.options}
                      focus=${e.focusNotNull}
                    />
                  </div>
                ` : null;
                        break;
                    case ge.columnUnique:
                        C = B(g.show, We.columnUnique) ? I`
                  <div
                    class="column-col"
                    data-type="columnUnique"
                    @mousedown=${(H) => {
                                l(H, de.columnUnique);
                            }}
                    @dblclick=${() => {
                                r(de.columnUnique);
                            }}
                  >
                    <${kn}
                      checked=${B(Z.options, ie.unique)}
                      width=${ka}
                      text="UQ"
                      title="Unique"
                      focus=${e.focusUnique}
                    />
                  </div>
                ` : null;
                        break;
                    case ge.columnAutoIncrement:
                        C = B(g.show, We.columnAutoIncrement) ? I`
                  <div
                    class="column-col"
                    data-type="columnAutoIncrement"
                    @mousedown=${(H) => {
                                l(H, de.columnAutoIncrement);
                            }}
                    @dblclick=${() => {
                                r(de.columnAutoIncrement);
                            }}
                  >
                    <${kn}
                      checked=${B(Z.options, ie.autoIncrement)}
                      width=${cr}
                      text="AI"
                      title="Auto Increment"
                      focus=${e.focusAutoIncrement}
                    />
                  </div>
                ` : null;
                        break;
                }
                return {
                    columnType: V,
                    template: C
                };
            }).filter(({ template: V }) => !!V);
        };
        return () => {
            var V;
            const { store: b, keyBindingMap: g } = n.value, { editor: Z } = b.state, { column: y, selected: G } = e, X = !!Z.hoverColumnMap[y.id], W = Z.draggingColumnMap[y.id];
            return I`
      <div
        class=${["column-row", Rr]}
        data-id=${y.id}
        data-table-id=${y.tableId}
        ?data-selected=${G}
        ?data-hover=${X}
        ?data-dragging=${W}
        ?data-ghost=${e.ghost}
        draggable=${e.draggable ? "true" : "false"}
        @dragstart=${e.onDragstart}
        @dragend=${e.onDragend}
      >
        <${Cr} keys=${y.ui.keys} />
        ${et(h(), ({ columnType: C }) => C, ({ template: C }) => C)}
        <${P}
          class=${rv}
          size=${12}
          name="xmark"
          title=${ra((V = g.removeColumn[0]) == null ? void 0 : V.shortcut)}
          .onClick=${i}
        />
      </div>
    `;
        };
    };
class Ka {
    constructor(t, n, i) {
        Object.defineProperty(this, "flipSnapshots", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: []
        }), Object.defineProperty(this, "root", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }), Object.defineProperty(this, "selector", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }), Object.defineProperty(this, "animationName", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }), this.root = t, this.selector = n, this.animationName = i;
    }
    snapshot() {
        var t;
        this.flipSnapshots = [], (t = this.root.value) == null || t.querySelectorAll(this.selector).forEach((n) => {
            if (n instanceof HTMLElement) {
                const { top: i, left: l } = n.getBoundingClientRect();
                this.flipSnapshots.push({ el: n, top: i, left: l });
            }
        });
    }
    play() {
        this.flipSnapshots.length && (this.flipSnapshots.forEach((t) => {
            const n = t.el, { top: i, left: l } = n.getBoundingClientRect(), r = t.left - l, s = t.top - i;
            (r || s) && (n.style.transform = `translate(${r}px,${s}px)`, n.style.transitionDuration = "0s", requestAnimationFrame(() => {
                n.classList.add(this.animationName), n.style.transform = "", n.style.transitionDuration = "";
                const m = () => {
                    n.classList.remove(this.animationName), n.removeEventListener("transitionend", m);
                };
                n.addEventListener("transitionend", m);
            }));
        }), this.flipSnapshots = []);
    }
}
const Lr = (e, t) => oo(...e.map((n) => st(n, "dragover").pipe(dr(300), Dn(() => t(n))))).pipe(lr(50), uu(oo(...e.map((n) => st(n, "dragend"))))), sv = (e) => (t) => new ht((n) => {
    const i = t.subscribe({
        next: (l) => n.next(l),
        error: (l) => n.error(l),
        complete: () => n.complete()
    });
    return () => {
        i.unsubscribe(), e();
    };
});
function dv(e, t) {
    const n = se(e), i = () => n.value.store.state.editor.focusTable;
    return {
        hasFocus: (m, h) => zZ(i(), m, t, h),
        hasEdit: (m, h) => JZ(i(), m, t, h),
        hasSelectColumn: (m) => wZ(i(), t, m)
    };
}
const uv = (e, t) => {
    const n = se(t), i = Ue(), { hasEdit: l, hasFocus: r, hasSelectColumn: s } = dv(t, e.table.id), { onMoveStart: m } = zu(t, e), { addUnsubscribe: h } = Ge(), p = Se({
        dragstartId: null
    }), b = new Ka(i, ".column-row", "column-row-move"), g = () => {
        const { store: Y } = n.value;
        Y.dispatch($d(e.table.id));
    }, Z = () => {
        const { store: Y } = n.value;
        Y.dispatch(N1(e.table.id));
    }, y = (Y) => {
        const { store: T } = n.value;
        T.dispatch(z1({ tableId: e.table.id, focusType: Y }));
    }, G = () => {
        const { store: Y } = n.value;
        Y.dispatch(ia());
    }, X = () => {
        const { store: Y } = n.value;
        Y.dispatch(sr());
    }, W = (Y, T) => {
        const { store: z } = n.value, M = Y.target;
        if (M)
            switch (T) {
                case de.tableName:
                    z.dispatch(J1({ id: e.table.id, value: M.value }));
                    break;
                case de.tableComment:
                    z.dispatch(w1({ id: e.table.id, value: M.value }));
                    break;
            }
    }, V = (Y) => {
        const { emitter: T } = n.value;
        T.emit(La({
            x: Y.clientX,
            y: Y.clientY,
            color: e.table.ui.color
        }));
    }, C = (Y, T) => {
        const { store: z } = n.value, { editor: { draggableColumn: M } } = z.state;
        !M || M.columnIds.includes(Y) || (b.snapshot(), z.dispatch($1(Y, T)));
    };
    let H = null;
    const L = () => {
        const Y = i.value;
        if (!Y || H)
            return;
        const T = Array.from(Y.querySelectorAll(".column-row"));
        T.forEach((M) => M.classList.add("none-hover"));
        const z = () => {
            T.forEach((M) => M.classList.remove("none-hover")), H = null, p.dragstartId = null;
        };
        H = Lr(T, (M) => ({
            targetId: M.dataset.id,
            targetTableId: M.dataset.tableId
        })).pipe(sv(z)).subscribe({
            next: ({ targetId: M, targetTableId: U }) => {
                C(M, U);
            },
            complete: z
        });
    }, E = (Y) => {
        var j;
        const { store: T } = n.value, { editor: { focusTable: z } } = T.state, M = Y.target;
        if (!M || !z || !z.columnId)
            return;
        const U = (j = M.dataset) == null ? void 0 : j.id;
        U && (p.dragstartId = U, T.dispatch(M1(un(Y))), L());
    }, J = () => {
        const { store: Y, emitter: T } = n.value;
        Y.dispatch(F1()), T.emit(Wg());
    }, K = () => {
        const { store: Y } = n.value, { editor: { draggableColumn: T } } = Y.state;
        T && L();
    };
    return Ca(() => b.play()), Te(() => {
        const { emitter: Y } = n.value;
        h(Y.on({
            dragendColumnAll: () => {
                H == null || H.unsubscribe();
            }
        }));
    }), () => {
        var zt, _e;
        const { store: Y, keyBindingMap: T } = n.value, { editor: z, settings: M, collections: U } = Y.state, { table: j } = e, q = !!z.selectedMap[j.id], ne = Qt(j, Y.state), te = an(j), je = p.dragstartId !== null && !j.columnIds.includes(p.dragstartId), jt = $(U).collection("tableColumnEntities").selectByIds(je ? [...j.columnIds, p.dragstartId] : j.columnIds);
        //FLEXYGO CHANGES
        // change the width
        ne.width = measures.table.width;
        return I`
      <div
        class=${["table", Ya]}
        style=${{
                top: `${j.ui.y}px`,
                left: `${j.ui.x}px`,
                "z-index": `${j.ui.zIndex}`,
                width: `${ne.width}px`,
                height: `${te}px`
            }}
        ${De(i)}
        ?data-selected=${q}
        ?data-focus-border=${q}
        data-id=${j.id}
        @mousedown=${m}
        @touchstart=${m}
      >
        <div class=${["headerContainer", Gr]}>
          <div
            class=${["table-header-color", Xr]}
            style=${{
                "background-color": j.ui.color
            }}
          ></div>
          <div class=${["headerToolbar", Ku]}>
            <${P}
              size=${12}
              name="plus"
              title=${ra((zt = T.addColumn[0]) == null ? void 0 : zt.shortcut)}
              useTransition=${!0}
              .onClick=${g}
            />
            <${P}
              size=${12}
              name="xmark"
              title=${ra((_e = T.removeTable[0]) == null ? void 0 : _e.shortcut)}
              useTransition=${!0}
              .onClick=${Z}
            />
          </div>
          <div class=${["tableName",Tu]}>
            <div
              class="input-padding"
              data-type="tableName"
              @mousedown=${() => {
                y(de.tableName);
            }}
              @dblclick=${G}
            >
              <${Ct}
                placeholder="table"
                width=${j.ui.widthName}
                value=${j.name}
                focus=${r(de.tableName)}
                edit=${l(de.tableName)}
                autofocus=${!0}
                .onBlur=${X}
                .onInput=${(Ke) => {
                W(Ke, de.tableName);
            }}
              />
            </div>
            ${B(M.show, We.tableComment) ? I`
                  <div
                    class="input-padding"
                    data-type="tableComment"
                    @mousedown=${() => {
                    y(de.tableComment);
                }}
                    @dblclick=${G}
                  >
                    <${Ct}
                      placeholder="comment"
                      width=${M.maxWidthComment === -1 ? j.ui.widthComment : M.maxWidthComment < j.ui.widthComment ? M.maxWidthComment : j.ui.widthComment}
                      value=${j.comment}
                      focus=${r(de.tableComment)}
                      edit=${l(de.tableComment)}
                      autofocus=${!0}
                      .onBlur=${X}
                      .onInput=${(Ke) => {
                    W(Ke, de.tableComment);
                }}
                    />
                  </div>
                ` : null}
          </div>
        </div>
        <div
          @dragenter=${K}
          @dragenter=${qn}
          @dragover=${qn}
        >
          ${et(jt, (Ke) => Ke.id, (Ke) => I`
              <${cv}
                app=${n}
                column=${Ke}
                selected=${s(Ke.id)}
                widthName=${ne.name}
                widthDataType=${ne.dataType}
                widthDefault=${ne.default}
                widthComment=${ne.comment}
                focusName=${r(de.columnName, Ke.id)}
                focusDataType=${r(de.columnDataType, Ke.id)}
                focusNotNull=${r(de.columnNotNull, Ke.id)}
                focusDefault=${r(de.columnDefault, Ke.id)}
                focusComment=${r(de.columnComment, Ke.id)}
                focusUnique=${r(de.columnUnique, Ke.id)}
                focusAutoIncrement=${r(de.columnAutoIncrement, Ke.id)}
                editName=${l(de.columnName, Ke.id)}
                editDataType=${l(de.columnDataType, Ke.id)}
                editDefault=${l(de.columnDefault, Ke.id)}
                editComment=${l(de.columnComment, Ke.id)}
                draggable=${!0}
                ghost=${je && Ke.id === p.dragstartId}
                .onDragstart=${E}
                .onDragend=${J}
              />
            `)}
        </div>
      </div>
    `;
    };
}, _u = N`
  position: relative;
  background-color: var(--canvas-background);
  top: 0;
  left: 0;
  will-change: transform;
`, mv = N`
  will-change: transform;
`, Ta = (e, t) => {
        const n = se(t);
        return () => {
            const { store: i } = n.value, { settings: { width: l, height: r, scrollTop: s, scrollLeft: m, zoomLevel: h, show: p }, doc: { tableIds: b, memoIds: g }, editor: { drawRelationship: Z }, collections: y } = i.state, G = $(y).collection("tableEntities").selectByIds(b), X = $(y).collection("memoEntities").selectByIds(g);
            return I`
      <div
        class=${["paper",mv]}
        style=${{
                    width: `${l}px`,
                    height: `${r}px`,
                    "min-width": `${l}px`,
                    "min-height": `${r}px`,
                    transform: `translate(${m}px, ${s}px) scale(${h})`,
                    "pointer-events": e.grabMove ? "none" : "auto"
                }}
      >
        <div
          class=${_u}
          ${De(e.canvas)}
          style=${{
                    width: `${l}px`,
                    height: `${r}px`,
                    "min-width": `${l}px`,
                    "min-height": `${r}px`
                }}
        >
          ${Ud(Bi(h) ? I`${et(G, (W) => W.id, (W) => I`<${Ry} table=${W} />`)}` : I`${et(G, (W) => W.id, (W) => I`<${uv} table=${W} />`)}`)}
          ${et(X, (W) => W.id, (W) => I`<${B2} memo=${W} />`)}
          ${B(p, We.relationship) ? I`<${Ru} />` : null}
          ${Z != null && Z.start ? I`
                <${sy}
                  root=${e.root}
                  draw=${Z}
                />
              ` : null}
          <${Q2} />
        </div>
      </div>
    `;
        };
    }, hv = (e, t) => () => {
        const { memo: n } = e, i = gi(n), l = yi(n);
        return I`
      <div
        class=${["memo", Mu]}
        style=${{
                top: `${n.ui.y}px`,
                left: `${n.ui.x}px`,
                "z-index": `${n.ui.zIndex}`,
                width: `${i}px`,
                height: `${l}px`
            }}
      ></div>
    `;
    }, pv = (e, t) => {
        const n = se(t);
        return () => {
            const { store: i } = n.value, { table: l } = e, r = Qt(l, i.state), s = an(l);
            //FLEXYGO CHANGES
            // change the width to 218
            r.width = 218;
            return I`
      <div
        class=${["table", Ya]}
        style=${{
                    top: `${l.ui.y}px`,
                    left: `${l.ui.x}px`,
                    "z-index": `${l.ui.zIndex}`,
                    width: `${r.width}px`,
                    height: `${s}px`
                }}
      ></div>
    `;
        };
    };
function qu(e) {
    const t = se(e), n = Se({
        selected: !1
    });
    let i = 0, l = 0;
    const r = () => {
        const { store: g } = t.value, { settings: { width: Z } } = g.state;
        return Xi / Z;
    }, s = (g) => {
        const Z = r();
        return -1 * (g / Z);
    }, m = ({ movementX: g, x: Z }) => {
        const { store: y } = t.value, { settings: G, editor: { viewport: X } } = y.state, W = G.scrollLeft + s(g), V = X.width - G.width, C = 0, H = g < 0 ? oe.left : oe.right;
        let L = !1;
        switch (H) {
            case oe.left:
                W < C && Z < i && (i += g, L = !0);
                break;
            case oe.right:
                W > V && Z > i && (i += g, L = !0);
                break;
        }
        return L ? g : 0;
    }, h = ({ movementY: g, y: Z }) => {
        const { store: y } = t.value, { settings: G, editor: { viewport: X } } = y.state, W = G.scrollTop + s(g), V = X.height - G.height, C = 0, H = g < 0 ? oe.top : oe.bottom;
        let L = !1;
        switch (H) {
            case oe.top:
                W < C && Z < l && (l += g, L = !0);
                break;
            case oe.bottom:
                W > V && Z > l && (l += g, L = !0);
                break;
        }
        return L ? g : 0;
    }, p = (g) => {
        const { event: Z } = g;
        Z.type === "mousemove" && Z.preventDefault();
        const y = m(g), G = h(g);
        if (y === 0 && G === 0)
            return;
        const { store: X } = t.value;
        X.dispatch(_n({
            movementX: s(y),
            movementY: s(G)
        }));
    };
    return {
        state: n,
        onScrollStart: (g) => {
            n.selected = !0, i = Yi(g) ? g.clientX : g.touches[0].clientX, l = Yi(g) ? g.clientY : g.touches[0].clientY, qt.subscribe({
                next: p,
                complete: () => {
                    n.selected = !1;
                }
            });
        }
    };
}
const bv = N`
  position: absolute;
  border: solid 1.5px var(--minimap-viewport-border);
  cursor: pointer;

  &:hover {
    border-color: var(--minimap-viewport-border-hover);
  }

  &.selected {
    border-color: var(--minimap-viewport-border-hover);
  }
`, fv = (e, t) => {
        const n = se(t), { state: i, onScrollStart: l } = qu(t), r = () => {
            const { store: m } = n.value, { settings: { width: h } } = m.state;
            return Xi / h;
        }, s = () => {
            const { store: m } = n.value, { settings: { scrollTop: h, scrollLeft: p }, editor: { viewport: b } } = m.state, g = r(), Z = p * g, y = h * g, G = b.width * g, X = b.height * g, W = eo - y, V = Z - G + Xi + eo;
            return {
                width: `${G}px`,
                height: `${X}px`,
                right: `${V}px`,
                top: `${W}px`
            };
        };
        return () => I`
    <div
      class=${[
                "minimap-viewport",
                bv,
                { selected: i.selected || e.selected }
            ]}
      style=${s()}
      data-focus-border
      @mousedown=${l}
      @touchstart=${l}
    ></div>
  `;
    }, gv = N`
  position: absolute;
  overflow: hidden;
  background-color: var(--canvas-boundary-background);
`, yv = N`
  position: absolute;
  box-sizing: content-box;
  pointer-events: none;
  border: 1px solid var(--minimap-border);
  box-shadow: 0 1px 6px var(--minimap-shadow);
  background-color: transparent;
`, Zv = N`
  pointer-events: none;
`, vv = 1, Ha = (e, t) => {
        const n = se(t), i = Ue(), { state: l, onScrollStart: r } = qu(t), s = () => {
            const { store: b } = n.value, { settings: { width: g } } = b.state;
            return Xi / g;
        }, m = () => {
            const { store: b } = n.value, { settings: { width: g, height: Z } } = b.state, y = s(), G = -1 * g / 2 + g * y / 2, X = -1 * Z / 2 + Z * y / 2, W = G + eo, V = X + eo;
            return {
                transform: `scale(${y})`,
                width: `${g}px`,
                height: `${Z}px`,
                right: `${W}px`,
                top: `${V}px`
            };
        }, h = () => {
            const b = eo - vv;
            return {
                width: `${Xi}px`,
                height: `${Xi}px`,
                right: `${b}px`,
                top: `${b}px`
            };
        }, p = (b) => {
            const { store: g } = n.value, { editor: { viewport: Z } } = g.state, y = s(), X = i.value.getBoundingClientRect(), W = Yi(b) ? b.clientX : b.touches[0].clientX, V = Yi(b) ? b.clientY : b.touches[0].clientY, C = W - X.x, H = V - X.y, L = C / y, E = H / y, J = L - Z.width / 2, K = E - Z.height / 2;
            g.dispatch(Ri({
                scrollLeft: -1 * J,
                scrollTop: -1 * K
            })), r(b);
        };
        return () => {
            const { store: b } = n.value, { settings: { width: g, height: Z, zoomLevel: y, show: G }, doc: { tableIds: X, memoIds: W }, collections: V } = b.state, C = $(V).collection("tableEntities").selectByIds(X), H = $(V).collection("memoEntities").selectByIds(W);
            //FLEXYGO CHANGES
            //dont show minimap
            return I``;
            return I`
      <div
        class=${["minimap", gv]}
        style=${m()}
        ${De(i)}
        @mousedown=${p}
        @touchstart=${p}
      >
        <div
          class=${_u}
          style=${{
                    width: `${g}px`,
                    height: `${Z}px`,
                    "min-width": `${g}px`,
                    "min-height": `${Z}px`,
                    transform: `scale(${y})`
                }}
        >
          ${et(C, (L) => L.id, (L) => I`<${pv} table=${L} />`)}
          ${et(H, (L) => L.id, (L) => I`<${hv} memo=${L} />`)}
          ${B(G, We.relationship) ? I`<${Ru} class=${Zv} strokeWidth=${12} />` : null}
        </div>
      </div>
      <div class=${yv} style=${h()}></div>
      <${fv} selected=${l.selected} />
    `;
        };
    }, em = N`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 6px;
  cursor: pointer;
`, xv = N`
  background-color: var(--accent-color-3);
  color: var(--accent-color-11);
  fill: var(--accent-color-11);

  &:hover {
    background-color: var(--accent-color-4);
  }

  &:active {
    background-color: var(--accent-color-5);
  }
`, Gv = N`
  background-color: var(--accent-color-9);
  color: #fff;
  fill: #fff;

  &:hover {
    background-color: var(--accent-color-10);
  }

  &:active {
    background-color: var(--accent-color-10);
  }
`, Xv = N`
  font-weight: var(--font-weight-medium);
  padding: 0 8px;
  height: 24px;
  ${Lu};
`, Wv = N`
  font-weight: var(--font-weight-medium);
  padding: 0 12px;
  height: 32px;
  ${vr};
`, Vv = N`
  font-weight: var(--font-weight-medium);
  padding: 0 16px;
  height: 40px;
  ${Yu};
`, Vs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
        __proto__: null,
        button: em,
        size1: Xv,
        size2: Wv,
        size3: Vv,
        soft: xv,
        solid: Gv
    }, Symbol.toStringTag, { value: "Module" })), Ti = (e, t) => () => I`
    <button
      class=${[
            em,
            Reflect.get(Vs, e.variant ?? "solid"),
            Reflect.get(Vs, `size${e.size ?? "2"}`)
        ]}
      type="button"
      @click=${e.onClick}
    >
      ${e.text}
    </button>
  `, Iv = N`
  display: flex;
  align-items: center;
  border-radius: 6px;
  width: fit-content;
  padding: 15px;
  background-color: var(--toast-background);
  border: 1px solid var(--toast-border);
`, kv = N`
  word-break: break-all;

  & > div {
    margin-bottom: 5px;
  }

  & > div:last-child {
    margin-bottom: 0;
  }
`, Cv = N`
  color: var(--active);
  font-weight: var(--font-weight-medium);
  ${vr};
`, Sv = N`
  ${Lt.paragraph};
`, Rv = N`
  display: flex;
  margin-left: 15px;

  & > button {
    margin-left: 8px;
  }

  & > button:first-child {
    margin-left: 0;
  }
`, hn = (e, t) => () => {
        const n = e.title || e.description, i = e.action;
        return I`
      <div class=${Iv}>
        ${n ? I`
              <div class=${kv}>
                ${e.title ? I`<div class=${Cv}>${e.title}</div>` : null}
                ${e.description ? I`<div class=${Sv}>
                      ${e.description}
                    </div>` : null}
              </div>
            ` : null}
        ${i ? I`<div class=${Rv}>${e.action}</div>` : null}
      </div>
    `;
    }, ce = {
        automaticTablePlacement: "automaticTablePlacement",
        tableProperties: "tableProperties",
        search: "search",
        themeBuilder: "themeBuilder",
        diffViewer: "diffViewer",
        timeTravel: "timeTravel"
    };
function tm() {
    let e = () => {
    };
    return [
        new Promise((t) => {
            e = t;
        }),
        () => e()
    ];
}
const Lv = N`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--canvas-boundary-background);
`, Yv = N`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  pointer-events: none;
`;
class Is extends Map {
    constructor(t, n = Hv) {
        if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: n } }), t != null)
            for (const [i, l] of t)
                this.set(i, l);
    }
    get(t) {
        return super.get(ks(this, t));
    }
    has(t) {
        return super.has(ks(this, t));
    }
    set(t, n) {
        return super.set(Kv(this, t), n);
    }
    delete(t) {
        return super.delete(Tv(this, t));
    }
}
function ks({ _intern: e, _key: t }, n) {
    const i = t(n);
    return e.has(i) ? e.get(i) : n;
}
function Kv({ _intern: e, _key: t }, n) {
    const i = t(n);
    return e.has(i) ? e.get(i) : (e.set(i, n), n);
}
function Tv({ _intern: e, _key: t }, n) {
    const i = t(n);
    return e.has(i) && (n = e.get(i), e.delete(i)), n;
}
function Hv(e) {
    return e !== null && typeof e == "object" ? e.valueOf() : e;
}
var Nv = {
    value: () => {
    }
};
function Na() {
    for (var e = 0, t = arguments.length, n = {}, i; e < t; ++e) {
        if (!(i = arguments[e] + "") || i in n || /[\s.]/.test(i))
            throw new Error("illegal type: " + i);
        n[i] = [];
    }
    return new Do(n);
}
function Do(e) {
    this._ = e;
}
function zv(e, t) {
    return e.trim().split(/^|\s+/).map(function (n) {
        var i = "", l = n.indexOf(".");
        if (l >= 0 && (i = n.slice(l + 1), n = n.slice(0, l)), n && !t.hasOwnProperty(n))
            throw new Error("unknown type: " + n);
        return { type: n, name: i };
    });
}
Do.prototype = Na.prototype = {
    constructor: Do,
    on: function (e, t) {
        var n = this._, i = zv(e + "", n), l, r = -1, s = i.length;
        if (arguments.length < 2) {
            for (; ++r < s;)
                if ((l = (e = i[r]).type) && (l = wv(n[l], e.name)))
                    return l;
            return;
        }
        if (t != null && typeof t != "function")
            throw new Error("invalid callback: " + t);
        for (; ++r < s;)
            if (l = (e = i[r]).type)
                n[l] = Cs(n[l], e.name, t);
            else if (t == null)
                for (l in n)
                    n[l] = Cs(n[l], e.name, null);
        return this;
    },
    copy: function () {
        var e = {}, t = this._;
        for (var n in t)
            e[n] = t[n].slice();
        return new Do(e);
    },
    call: function (e, t) {
        if ((l = arguments.length - 2) > 0)
            for (var n = new Array(l), i = 0, l, r; i < l; ++i)
                n[i] = arguments[i + 2];
        if (!this._.hasOwnProperty(e))
            throw new Error("unknown type: " + e);
        for (r = this._[e], i = 0, l = r.length; i < l; ++i)
            r[i].value.apply(t, n);
    },
    apply: function (e, t, n) {
        if (!this._.hasOwnProperty(e))
            throw new Error("unknown type: " + e);
        for (var i = this._[e], l = 0, r = i.length; l < r; ++l)
            i[l].value.apply(t, n);
    }
};
function wv(e, t) {
    for (var n = 0, i = e.length, l; n < i; ++n)
        if ((l = e[n]).name === t)
            return l.value;
}
function Cs(e, t, n) {
    for (var i = 0, l = e.length; i < l; ++i)
        if (e[i].name === t) {
            e[i] = Nv, e = e.slice(0, i).concat(e.slice(i + 1));
            break;
        }
    return n != null && e.push({ name: t, value: n }), e;
}
var $l = "http://www.w3.org/1999/xhtml";
const Ss = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: $l,
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
};
function za(e) {
    var t = e += "", n = t.indexOf(":");
    return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), Ss.hasOwnProperty(t) ? { space: Ss[t], local: e } : e;
}
function Jv(e) {
    return function () {
        var t = this.ownerDocument, n = this.namespaceURI;
        return n === $l && t.documentElement.namespaceURI === $l ? t.createElement(e) : t.createElementNS(n, e);
    };
}
function Mv(e) {
    return function () {
        return this.ownerDocument.createElementNS(e.space, e.local);
    };
}
function Yr(e) {
    var t = za(e);
    return (t.local ? Mv : Jv)(t);
}
function Fv() {
}
function Kr(e) {
    return e == null ? Fv : function () {
        return this.querySelector(e);
    };
}
function $v(e) {
    typeof e != "function" && (e = Kr(e));
    for (var t = this._groups, n = t.length, i = new Array(n), l = 0; l < n; ++l)
        for (var r = t[l], s = r.length, m = i[l] = new Array(s), h, p, b = 0; b < s; ++b)
            (h = r[b]) && (p = e.call(h, h.__data__, b, r)) && ("__data__" in h && (p.__data__ = h.__data__), m[b] = p);
    return new Nt(i, this._parents);
}
function Uv(e) {
    return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function jv() {
    return [];
}
function nm(e) {
    return e == null ? jv : function () {
        return this.querySelectorAll(e);
    };
}
function Ev(e) {
    return function () {
        return Uv(e.apply(this, arguments));
    };
}
function Pv(e) {
    typeof e == "function" ? e = Ev(e) : e = nm(e);
    for (var t = this._groups, n = t.length, i = [], l = [], r = 0; r < n; ++r)
        for (var s = t[r], m = s.length, h, p = 0; p < m; ++p)
            (h = s[p]) && (i.push(e.call(h, h.__data__, p, s)), l.push(h));
    return new Nt(i, l);
}
function im(e) {
    return function () {
        return this.matches(e);
    };
}
function om(e) {
    return function (t) {
        return t.matches(e);
    };
}
var Bv = Array.prototype.find;
function Ov(e) {
    return function () {
        return Bv.call(this.children, e);
    };
}
function Av() {
    return this.firstElementChild;
}
function Qv(e) {
    return this.select(e == null ? Av : Ov(typeof e == "function" ? e : om(e)));
}
var Dv = Array.prototype.filter;
function _v() {
    return Array.from(this.children);
}
function qv(e) {
    return function () {
        return Dv.call(this.children, e);
    };
}
function ex(e) {
    return this.selectAll(e == null ? _v : qv(typeof e == "function" ? e : om(e)));
}
function tx(e) {
    typeof e != "function" && (e = im(e));
    for (var t = this._groups, n = t.length, i = new Array(n), l = 0; l < n; ++l)
        for (var r = t[l], s = r.length, m = i[l] = [], h, p = 0; p < s; ++p)
            (h = r[p]) && e.call(h, h.__data__, p, r) && m.push(h);
    return new Nt(i, this._parents);
}
function am(e) {
    return new Array(e.length);
}
function nx() {
    return new Nt(this._enter || this._groups.map(am), this._parents);
}
function da(e, t) {
    this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
da.prototype = {
    constructor: da,
    appendChild: function (e) {
        return this._parent.insertBefore(e, this._next);
    },
    insertBefore: function (e, t) {
        return this._parent.insertBefore(e, t);
    },
    querySelector: function (e) {
        return this._parent.querySelector(e);
    },
    querySelectorAll: function (e) {
        return this._parent.querySelectorAll(e);
    }
};
function ix(e) {
    return function () {
        return e;
    };
}
function ox(e, t, n, i, l, r) {
    for (var s = 0, m, h = t.length, p = r.length; s < p; ++s)
        (m = t[s]) ? (m.__data__ = r[s], i[s] = m) : n[s] = new da(e, r[s]);
    for (; s < h; ++s)
        (m = t[s]) && (l[s] = m);
}
function ax(e, t, n, i, l, r, s) {
    var m, h, p = /* @__PURE__ */ new Map(), b = t.length, g = r.length, Z = new Array(b), y;
    for (m = 0; m < b; ++m)
        (h = t[m]) && (Z[m] = y = s.call(h, h.__data__, m, t) + "", p.has(y) ? l[m] = h : p.set(y, h));
    for (m = 0; m < g; ++m)
        y = s.call(e, r[m], m, r) + "", (h = p.get(y)) ? (i[m] = h, h.__data__ = r[m], p.delete(y)) : n[m] = new da(e, r[m]);
    for (m = 0; m < b; ++m)
        (h = t[m]) && p.get(Z[m]) === h && (l[m] = h);
}
function lx(e) {
    return e.__data__;
}
function rx(e, t) {
    if (!arguments.length)
        return Array.from(this, lx);
    var n = t ? ax : ox, i = this._parents, l = this._groups;
    typeof e != "function" && (e = ix(e));
    for (var r = l.length, s = new Array(r), m = new Array(r), h = new Array(r), p = 0; p < r; ++p) {
        var b = i[p], g = l[p], Z = g.length, y = cx(e.call(b, b && b.__data__, p, i)), G = y.length, X = m[p] = new Array(G), W = s[p] = new Array(G), V = h[p] = new Array(Z);
        n(b, g, X, W, V, y, t);
        for (var C = 0, H = 0, L, E; C < G; ++C)
            if (L = X[C]) {
                for (C >= H && (H = C + 1); !(E = W[H]) && ++H < G;)
                    ;
                L._next = E || null;
            }
    }
    return s = new Nt(s, i), s._enter = m, s._exit = h, s;
}
function cx(e) {
    return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function sx() {
    return new Nt(this._exit || this._groups.map(am), this._parents);
}
function dx(e, t, n) {
    var i = this.enter(), l = this, r = this.exit();
    return typeof e == "function" ? (i = e(i), i && (i = i.selection())) : i = i.append(e + ""), t != null && (l = t(l), l && (l = l.selection())), n == null ? r.remove() : n(r), i && l ? i.merge(l).order() : l;
}
function ux(e) {
    for (var t = e.selection ? e.selection() : e, n = this._groups, i = t._groups, l = n.length, r = i.length, s = Math.min(l, r), m = new Array(l), h = 0; h < s; ++h)
        for (var p = n[h], b = i[h], g = p.length, Z = m[h] = new Array(g), y, G = 0; G < g; ++G)
            (y = p[G] || b[G]) && (Z[G] = y);
    for (; h < l; ++h)
        m[h] = n[h];
    return new Nt(m, this._parents);
}
function mx() {
    for (var e = this._groups, t = -1, n = e.length; ++t < n;)
        for (var i = e[t], l = i.length - 1, r = i[l], s; --l >= 0;)
            (s = i[l]) && (r && s.compareDocumentPosition(r) ^ 4 && r.parentNode.insertBefore(s, r), r = s);
    return this;
}
function hx(e) {
    e || (e = px);
    function t(g, Z) {
        return g && Z ? e(g.__data__, Z.__data__) : !g - !Z;
    }
    for (var n = this._groups, i = n.length, l = new Array(i), r = 0; r < i; ++r) {
        for (var s = n[r], m = s.length, h = l[r] = new Array(m), p, b = 0; b < m; ++b)
            (p = s[b]) && (h[b] = p);
        h.sort(t);
    }
    return new Nt(l, this._parents).order();
}
function px(e, t) {
    return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function bx() {
    var e = arguments[0];
    return arguments[0] = this, e.apply(null, arguments), this;
}
function fx() {
    return Array.from(this);
}
function gx() {
    for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
        for (var i = e[t], l = 0, r = i.length; l < r; ++l) {
            var s = i[l];
            if (s)
                return s;
        }
    return null;
}
function yx() {
    let e = 0;
    for (const t of this)
        ++e;
    return e;
}
function Zx() {
    return !this.node();
}
function vx(e) {
    for (var t = this._groups, n = 0, i = t.length; n < i; ++n)
        for (var l = t[n], r = 0, s = l.length, m; r < s; ++r)
            (m = l[r]) && e.call(m, m.__data__, r, l);
    return this;
}
function xx(e) {
    return function () {
        this.removeAttribute(e);
    };
}
function Gx(e) {
    return function () {
        this.removeAttributeNS(e.space, e.local);
    };
}
function Xx(e, t) {
    return function () {
        this.setAttribute(e, t);
    };
}
function Wx(e, t) {
    return function () {
        this.setAttributeNS(e.space, e.local, t);
    };
}
function Vx(e, t) {
    return function () {
        var n = t.apply(this, arguments);
        n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
    };
}
function Ix(e, t) {
    return function () {
        var n = t.apply(this, arguments);
        n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
    };
}
function kx(e, t) {
    var n = za(e);
    if (arguments.length < 2) {
        var i = this.node();
        return n.local ? i.getAttributeNS(n.space, n.local) : i.getAttribute(n);
    }
    return this.each((t == null ? n.local ? Gx : xx : typeof t == "function" ? n.local ? Ix : Vx : n.local ? Wx : Xx)(n, t));
}
function lm(e) {
    return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function Cx(e) {
    return function () {
        this.style.removeProperty(e);
    };
}
function Sx(e, t, n) {
    return function () {
        this.style.setProperty(e, t, n);
    };
}
function Rx(e, t, n) {
    return function () {
        var i = t.apply(this, arguments);
        i == null ? this.style.removeProperty(e) : this.style.setProperty(e, i, n);
    };
}
function Lx(e, t, n) {
    return arguments.length > 1 ? this.each((t == null ? Cx : typeof t == "function" ? Rx : Sx)(e, t, n ?? "")) : Hi(this.node(), e);
}
function Hi(e, t) {
    return e.style.getPropertyValue(t) || lm(e).getComputedStyle(e, null).getPropertyValue(t);
}
function Yx(e) {
    return function () {
        delete this[e];
    };
}
function Kx(e, t) {
    return function () {
        this[e] = t;
    };
}
function Tx(e, t) {
    return function () {
        var n = t.apply(this, arguments);
        n == null ? delete this[e] : this[e] = n;
    };
}
function Hx(e, t) {
    return arguments.length > 1 ? this.each((t == null ? Yx : typeof t == "function" ? Tx : Kx)(e, t)) : this.node()[e];
}
function rm(e) {
    return e.trim().split(/^|\s+/);
}
function Tr(e) {
    return e.classList || new cm(e);
}
function cm(e) {
    this._node = e, this._names = rm(e.getAttribute("class") || "");
}
cm.prototype = {
    add: function (e) {
        var t = this._names.indexOf(e);
        t < 0 && (this._names.push(e), this._node.setAttribute("class", this._names.join(" ")));
    },
    remove: function (e) {
        var t = this._names.indexOf(e);
        t >= 0 && (this._names.splice(t, 1), this._node.setAttribute("class", this._names.join(" ")));
    },
    contains: function (e) {
        return this._names.indexOf(e) >= 0;
    }
};
function sm(e, t) {
    for (var n = Tr(e), i = -1, l = t.length; ++i < l;)
        n.add(t[i]);
}
function dm(e, t) {
    for (var n = Tr(e), i = -1, l = t.length; ++i < l;)
        n.remove(t[i]);
}
function Nx(e) {
    return function () {
        sm(this, e);
    };
}
function zx(e) {
    return function () {
        dm(this, e);
    };
}
function wx(e, t) {
    return function () {
        (t.apply(this, arguments) ? sm : dm)(this, e);
    };
}
function Jx(e, t) {
    var n = rm(e + "");
    if (arguments.length < 2) {
        for (var i = Tr(this.node()), l = -1, r = n.length; ++l < r;)
            if (!i.contains(n[l]))
                return !1;
        return !0;
    }
    return this.each((typeof t == "function" ? wx : t ? Nx : zx)(n, t));
}
function Mx() {
    this.textContent = "";
}
function Fx(e) {
    return function () {
        this.textContent = e;
    };
}
function $x(e) {
    return function () {
        var t = e.apply(this, arguments);
        this.textContent = t ?? "";
    };
}
function Ux(e) {
    return arguments.length ? this.each(e == null ? Mx : (typeof e == "function" ? $x : Fx)(e)) : this.node().textContent;
}
function jx() {
    this.innerHTML = "";
}
function Ex(e) {
    return function () {
        this.innerHTML = e;
    };
}
function Px(e) {
    return function () {
        var t = e.apply(this, arguments);
        this.innerHTML = t ?? "";
    };
}
function Bx(e) {
    return arguments.length ? this.each(e == null ? jx : (typeof e == "function" ? Px : Ex)(e)) : this.node().innerHTML;
}
function Ox() {
    this.nextSibling && this.parentNode.appendChild(this);
}
function Ax() {
    return this.each(Ox);
}
function Qx() {
    this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Dx() {
    return this.each(Qx);
}
function _x(e) {
    var t = typeof e == "function" ? e : Yr(e);
    return this.select(function () {
        return this.appendChild(t.apply(this, arguments));
    });
}
function qx() {
    return null;
}
function eG(e, t) {
    var n = typeof e == "function" ? e : Yr(e), i = t == null ? qx : typeof t == "function" ? t : Kr(t);
    return this.select(function () {
        return this.insertBefore(n.apply(this, arguments), i.apply(this, arguments) || null);
    });
}
function tG() {
    var e = this.parentNode;
    e && e.removeChild(this);
}
function nG() {
    return this.each(tG);
}
function iG() {
    var e = this.cloneNode(!1), t = this.parentNode;
    return t ? t.insertBefore(e, this.nextSibling) : e;
}
function oG() {
    var e = this.cloneNode(!0), t = this.parentNode;
    return t ? t.insertBefore(e, this.nextSibling) : e;
}
function aG(e) {
    return this.select(e ? oG : iG);
}
function lG(e) {
    return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function rG(e) {
    return function (t) {
        e.call(this, t, this.__data__);
    };
}
function cG(e) {
    return e.trim().split(/^|\s+/).map(function (t) {
        var n = "", i = t.indexOf(".");
        return i >= 0 && (n = t.slice(i + 1), t = t.slice(0, i)), { type: t, name: n };
    });
}
function sG(e) {
    return function () {
        var t = this.__on;
        if (t) {
            for (var n = 0, i = -1, l = t.length, r; n < l; ++n)
                r = t[n], (!e.type || r.type === e.type) && r.name === e.name ? this.removeEventListener(r.type, r.listener, r.options) : t[++i] = r;
            ++i ? t.length = i : delete this.__on;
        }
    };
}
function dG(e, t, n) {
    return function () {
        var i = this.__on, l, r = rG(t);
        if (i) {
            for (var s = 0, m = i.length; s < m; ++s)
                if ((l = i[s]).type === e.type && l.name === e.name) {
                    this.removeEventListener(l.type, l.listener, l.options), this.addEventListener(l.type, l.listener = r, l.options = n), l.value = t;
                    return;
                }
        }
        this.addEventListener(e.type, r, n), l = { type: e.type, name: e.name, value: t, listener: r, options: n }, i ? i.push(l) : this.__on = [l];
    };
}
function uG(e, t, n) {
    var i = cG(e + ""), l, r = i.length, s;
    if (arguments.length < 2) {
        var m = this.node().__on;
        if (m) {
            for (var h = 0, p = m.length, b; h < p; ++h)
                for (l = 0, b = m[h]; l < r; ++l)
                    if ((s = i[l]).type === b.type && s.name === b.name)
                        return b.value;
        }
        return;
    }
    for (m = t ? dG : sG, l = 0; l < r; ++l)
        this.each(m(i[l], t, n));
    return this;
}
function um(e, t, n) {
    var i = lm(e), l = i.CustomEvent;
    typeof l == "function" ? l = new l(t, n) : (l = i.document.createEvent("Event"), n ? (l.initEvent(t, n.bubbles, n.cancelable), l.detail = n.detail) : l.initEvent(t, !1, !1)), e.dispatchEvent(l);
}
function mG(e, t) {
    return function () {
        return um(this, e, t);
    };
}
function hG(e, t) {
    return function () {
        return um(this, e, t.apply(this, arguments));
    };
}
function pG(e, t) {
    return this.each((typeof t == "function" ? hG : mG)(e, t));
}
function* bG() {
    for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
        for (var i = e[t], l = 0, r = i.length, s; l < r; ++l)
            (s = i[l]) && (yield s);
}
var mm = [null];
function Nt(e, t) {
    this._groups = e, this._parents = t;
}
function fo() {
    return new Nt([[document.documentElement]], mm);
}
function fG() {
    return this;
}
Nt.prototype = fo.prototype = {
    constructor: Nt,
    select: $v,
    selectAll: Pv,
    selectChild: Qv,
    selectChildren: ex,
    filter: tx,
    data: rx,
    enter: nx,
    exit: sx,
    join: dx,
    merge: ux,
    selection: fG,
    order: mx,
    sort: hx,
    call: bx,
    nodes: fx,
    node: gx,
    size: yx,
    empty: Zx,
    each: vx,
    attr: kx,
    style: Lx,
    property: Hx,
    classed: Jx,
    text: Ux,
    html: Bx,
    raise: Ax,
    lower: Dx,
    append: _x,
    insert: eG,
    remove: nG,
    clone: aG,
    datum: lG,
    on: uG,
    dispatch: pG,
    [Symbol.iterator]: bG
};
function co(e) {
    return typeof e == "string" ? new Nt([[document.querySelector(e)]], [document.documentElement]) : new Nt([[e]], mm);
}
function gG(e) {
    return co(Yr(e).call(document.documentElement));
}
function yG(e) {
    let t;
    for (; t = e.sourceEvent;)
        e = t;
    return e;
}
function Rs(e, t) {
    if (e = yG(e), t === void 0 && (t = e.currentTarget), t) {
        var n = t.ownerSVGElement || t;
        if (n.createSVGPoint) {
            var i = n.createSVGPoint();
            return i.x = e.clientX, i.y = e.clientY, i = i.matrixTransform(t.getScreenCTM().inverse()), [i.x, i.y];
        }
        if (t.getBoundingClientRect) {
            var l = t.getBoundingClientRect();
            return [e.clientX - l.left - t.clientLeft, e.clientY - l.top - t.clientTop];
        }
    }
    return [e.pageX, e.pageY];
}
const ZG = { passive: !1 }, so = { capture: !0, passive: !1 };
function bl(e) {
    e.stopImmediatePropagation();
}
function Vi(e) {
    e.preventDefault(), e.stopImmediatePropagation();
}
function vG(e) {
    var t = e.document.documentElement, n = co(e).on("dragstart.drag", Vi, so);
    "onselectstart" in t ? n.on("selectstart.drag", Vi, so) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function xG(e, t) {
    var n = e.document.documentElement, i = co(e).on("dragstart.drag", null);
    t && (i.on("click.drag", Vi, so), setTimeout(function () {
        i.on("click.drag", null);
    }, 0)), "onselectstart" in n ? i.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const Jo = (e) => () => e;
function Ul(e, {
    sourceEvent: t,
    subject: n,
    target: i,
    identifier: l,
    active: r,
    x: s,
    y: m,
    dx: h,
    dy: p,
    dispatch: b
}) {
    Object.defineProperties(this, {
        type: { value: e, enumerable: !0, configurable: !0 },
        sourceEvent: { value: t, enumerable: !0, configurable: !0 },
        subject: { value: n, enumerable: !0, configurable: !0 },
        target: { value: i, enumerable: !0, configurable: !0 },
        identifier: { value: l, enumerable: !0, configurable: !0 },
        active: { value: r, enumerable: !0, configurable: !0 },
        x: { value: s, enumerable: !0, configurable: !0 },
        y: { value: m, enumerable: !0, configurable: !0 },
        dx: { value: h, enumerable: !0, configurable: !0 },
        dy: { value: p, enumerable: !0, configurable: !0 },
        _: { value: b }
    });
}
Ul.prototype.on = function () {
    var e = this._.on.apply(this._, arguments);
    return e === this._ ? this : e;
};
function GG(e) {
    return !e.ctrlKey && !e.button;
}
function XG() {
    return this.parentNode;
}
function WG(e, t) {
    return t ?? { x: e.x, y: e.y };
}
function VG() {
    return navigator.maxTouchPoints || "ontouchstart" in this;
}
function IG() {
    var e = GG, t = XG, n = WG, i = VG, l = {}, r = Na("start", "drag", "end"), s = 0, m, h, p, b, g = 0;
    function Z(L) {
        L.on("mousedown.drag", y).filter(i).on("touchstart.drag", W).on("touchmove.drag", V, ZG).on("touchend.drag touchcancel.drag", C).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
    }
    function y(L, E) {
        if (!(b || !e.call(this, L, E))) {
            var J = H(this, t.call(this, L, E), L, E, "mouse");
            J && (co(L.view).on("mousemove.drag", G, so).on("mouseup.drag", X, so), vG(L.view), bl(L), p = !1, m = L.clientX, h = L.clientY, J("start", L));
        }
    }
    function G(L) {
        if (Vi(L), !p) {
            var E = L.clientX - m, J = L.clientY - h;
            p = E * E + J * J > g;
        }
        l.mouse("drag", L);
    }
    function X(L) {
        co(L.view).on("mousemove.drag mouseup.drag", null), xG(L.view, p), Vi(L), l.mouse("end", L);
    }
    function W(L, E) {
        if (e.call(this, L, E)) {
            var J = L.changedTouches, K = t.call(this, L, E), Y = J.length, T, z;
            for (T = 0; T < Y; ++T)
                (z = H(this, K, L, E, J[T].identifier, J[T])) && (bl(L), z("start", L, J[T]));
        }
    }
    function V(L) {
        var E = L.changedTouches, J = E.length, K, Y;
        for (K = 0; K < J; ++K)
            (Y = l[E[K].identifier]) && (Vi(L), Y("drag", L, E[K]));
    }
    function C(L) {
        var E = L.changedTouches, J = E.length, K, Y;
        for (b && clearTimeout(b), b = setTimeout(function () {
            b = null;
        }, 500), K = 0; K < J; ++K)
            (Y = l[E[K].identifier]) && (bl(L), Y("end", L, E[K]));
    }
    function H(L, E, J, K, Y, T) {
        var z = r.copy(), M = Rs(T || J, E), U, j, q;
        if ((q = n.call(L, new Ul("beforestart", {
            sourceEvent: J,
            target: Z,
            identifier: Y,
            active: s,
            x: M[0],
            y: M[1],
            dx: 0,
            dy: 0,
            dispatch: z
        }), K)) != null)
            return U = q.x - M[0] || 0, j = q.y - M[1] || 0, function ne(te, je, jt) {
                var zt = M, _e;
                switch (te) {
                    case "start":
                        l[Y] = ne, _e = s++;
                        break;
                    case "end":
                        delete l[Y], --s;
                    case "drag":
                        M = Rs(jt || je, E), _e = s;
                        break;
                }
                z.call(
                    te,
                    L,
                    new Ul(te, {
                        sourceEvent: je,
                        subject: q,
                        target: Z,
                        identifier: Y,
                        active: _e,
                        x: M[0] + U,
                        y: M[1] + j,
                        dx: M[0] - zt[0],
                        dy: M[1] - zt[1],
                        dispatch: z
                    }),
                    K
                );
            };
    }
    return Z.filter = function (L) {
        return arguments.length ? (e = typeof L == "function" ? L : Jo(!!L), Z) : e;
    }, Z.container = function (L) {
        return arguments.length ? (t = typeof L == "function" ? L : Jo(L), Z) : t;
    }, Z.subject = function (L) {
        return arguments.length ? (n = typeof L == "function" ? L : Jo(L), Z) : n;
    }, Z.touchable = function (L) {
        return arguments.length ? (i = typeof L == "function" ? L : Jo(!!L), Z) : i;
    }, Z.on = function () {
        var L = r.on.apply(r, arguments);
        return L === r ? Z : L;
    }, Z.clickDistance = function (L) {
        return arguments.length ? (g = (L = +L) * L, Z) : Math.sqrt(g);
    }, Z;
}
function Hr(e, t, n) {
    e.prototype = t.prototype = n, n.constructor = e;
}
function hm(e, t) {
    var n = Object.create(e.prototype);
    for (var i in t)
        n[i] = t[i];
    return n;
}
function go() {
}
var uo = 0.7, ua = 1 / uo, Ii = "\\s*([+-]?\\d+)\\s*", mo = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", _t = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", kG = /^#([0-9a-f]{3,8})$/, CG = new RegExp(`^rgb\\(${Ii},${Ii},${Ii}\\)$`), SG = new RegExp(`^rgb\\(${_t},${_t},${_t}\\)$`), RG = new RegExp(`^rgba\\(${Ii},${Ii},${Ii},${mo}\\)$`), LG = new RegExp(`^rgba\\(${_t},${_t},${_t},${mo}\\)$`), YG = new RegExp(`^hsl\\(${mo},${_t},${_t}\\)$`), KG = new RegExp(`^hsla\\(${mo},${_t},${_t},${mo}\\)$`), Ls = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
};
Hr(go, ho, {
    copy(e) {
        return Object.assign(new this.constructor(), this, e);
    },
    displayable() {
        return this.rgb().displayable();
    },
    hex: Ys,
    // Deprecated! Use color.formatHex.
    formatHex: Ys,
    formatHex8: TG,
    formatHsl: HG,
    formatRgb: Ks,
    toString: Ks
});
function Ys() {
    return this.rgb().formatHex();
}
function TG() {
    return this.rgb().formatHex8();
}
function HG() {
    return pm(this).formatHsl();
}
function Ks() {
    return this.rgb().formatRgb();
}
function ho(e) {
    var t, n;
    return e = (e + "").trim().toLowerCase(), (t = kG.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? Ts(t) : n === 3 ? new kt(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? Mo(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? Mo(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = CG.exec(e)) ? new kt(t[1], t[2], t[3], 1) : (t = SG.exec(e)) ? new kt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = RG.exec(e)) ? Mo(t[1], t[2], t[3], t[4]) : (t = LG.exec(e)) ? Mo(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = YG.exec(e)) ? zs(t[1], t[2] / 100, t[3] / 100, 1) : (t = KG.exec(e)) ? zs(t[1], t[2] / 100, t[3] / 100, t[4]) : Ls.hasOwnProperty(e) ? Ts(Ls[e]) : e === "transparent" ? new kt(NaN, NaN, NaN, 0) : null;
}
function Ts(e) {
    return new kt(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Mo(e, t, n, i) {
    return i <= 0 && (e = t = n = NaN), new kt(e, t, n, i);
}
function NG(e) {
    return e instanceof go || (e = ho(e)), e ? (e = e.rgb(), new kt(e.r, e.g, e.b, e.opacity)) : new kt();
}
function jl(e, t, n, i) {
    return arguments.length === 1 ? NG(e) : new kt(e, t, n, i ?? 1);
}
function kt(e, t, n, i) {
    this.r = +e, this.g = +t, this.b = +n, this.opacity = +i;
}
Hr(kt, jl, hm(go, {
    brighter(e) {
        return e = e == null ? ua : Math.pow(ua, e), new kt(this.r * e, this.g * e, this.b * e, this.opacity);
    },
    darker(e) {
        return e = e == null ? uo : Math.pow(uo, e), new kt(this.r * e, this.g * e, this.b * e, this.opacity);
    },
    rgb() {
        return this;
    },
    clamp() {
        return new kt(Qn(this.r), Qn(this.g), Qn(this.b), ma(this.opacity));
    },
    displayable() {
        return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
    },
    hex: Hs,
    // Deprecated! Use color.formatHex.
    formatHex: Hs,
    formatHex8: zG,
    formatRgb: Ns,
    toString: Ns
}));
function Hs() {
    return `#${Pn(this.r)}${Pn(this.g)}${Pn(this.b)}`;
}
function zG() {
    return `#${Pn(this.r)}${Pn(this.g)}${Pn(this.b)}${Pn((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Ns() {
    const e = ma(this.opacity);
    return `${e === 1 ? "rgb(" : "rgba("}${Qn(this.r)}, ${Qn(this.g)}, ${Qn(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function ma(e) {
    return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Qn(e) {
    return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Pn(e) {
    return e = Qn(e), (e < 16 ? "0" : "") + e.toString(16);
}
function zs(e, t, n, i) {
    return i <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new $t(e, t, n, i);
}
function pm(e) {
    if (e instanceof $t)
        return new $t(e.h, e.s, e.l, e.opacity);
    if (e instanceof go || (e = ho(e)), !e)
        return new $t();
    if (e instanceof $t)
        return e;
    e = e.rgb();
    var t = e.r / 255, n = e.g / 255, i = e.b / 255, l = Math.min(t, n, i), r = Math.max(t, n, i), s = NaN, m = r - l, h = (r + l) / 2;
    return m ? (t === r ? s = (n - i) / m + (n < i) * 6 : n === r ? s = (i - t) / m + 2 : s = (t - n) / m + 4, m /= h < 0.5 ? r + l : 2 - r - l, s *= 60) : m = h > 0 && h < 1 ? 0 : s, new $t(s, m, h, e.opacity);
}
function wG(e, t, n, i) {
    return arguments.length === 1 ? pm(e) : new $t(e, t, n, i ?? 1);
}
function $t(e, t, n, i) {
    this.h = +e, this.s = +t, this.l = +n, this.opacity = +i;
}
Hr($t, wG, hm(go, {
    brighter(e) {
        return e = e == null ? ua : Math.pow(ua, e), new $t(this.h, this.s, this.l * e, this.opacity);
    },
    darker(e) {
        return e = e == null ? uo : Math.pow(uo, e), new $t(this.h, this.s, this.l * e, this.opacity);
    },
    rgb() {
        var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, i = n + (n < 0.5 ? n : 1 - n) * t, l = 2 * n - i;
        return new kt(
            fl(e >= 240 ? e - 240 : e + 120, l, i),
            fl(e, l, i),
            fl(e < 120 ? e + 240 : e - 120, l, i),
            this.opacity
        );
    },
    clamp() {
        return new $t(ws(this.h), Fo(this.s), Fo(this.l), ma(this.opacity));
    },
    displayable() {
        return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
    },
    formatHsl() {
        const e = ma(this.opacity);
        return `${e === 1 ? "hsl(" : "hsla("}${ws(this.h)}, ${Fo(this.s) * 100}%, ${Fo(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
    }
}));
function ws(e) {
    return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Fo(e) {
    return Math.max(0, Math.min(1, e || 0));
}
function fl(e, t, n) {
    return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const bm = (e) => () => e;
function JG(e, t) {
    return function (n) {
        return e + n * t;
    };
}
function MG(e, t, n) {
    return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function (i) {
        return Math.pow(e + i * t, n);
    };
}
function FG(e) {
    return (e = +e) == 1 ? fm : function (t, n) {
        return n - t ? MG(t, n, e) : bm(isNaN(t) ? n : t);
    };
}
function fm(e, t) {
    var n = t - e;
    return n ? JG(e, n) : bm(isNaN(e) ? t : e);
}
const Js = function e(t) {
    var n = FG(t);
    function i(l, r) {
        var s = n((l = jl(l)).r, (r = jl(r)).r), m = n(l.g, r.g), h = n(l.b, r.b), p = fm(l.opacity, r.opacity);
        return function (b) {
            return l.r = s(b), l.g = m(b), l.b = h(b), l.opacity = p(b), l + "";
        };
    }
    return i.gamma = e, i;
}(1);
function xn(e, t) {
    return e = +e, t = +t, function (n) {
        return e * (1 - n) + t * n;
    };
}
var El = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, gl = new RegExp(El.source, "g");
function $G(e) {
    return function () {
        return e;
    };
}
function UG(e) {
    return function (t) {
        return e(t) + "";
    };
}
function jG(e, t) {
    var n = El.lastIndex = gl.lastIndex = 0, i, l, r, s = -1, m = [], h = [];
    for (e = e + "", t = t + ""; (i = El.exec(e)) && (l = gl.exec(t));)
        (r = l.index) > n && (r = t.slice(n, r), m[s] ? m[s] += r : m[++s] = r), (i = i[0]) === (l = l[0]) ? m[s] ? m[s] += l : m[++s] = l : (m[++s] = null, h.push({ i: s, x: xn(i, l) })), n = gl.lastIndex;
    return n < t.length && (r = t.slice(n), m[s] ? m[s] += r : m[++s] = r), m.length < 2 ? h[0] ? UG(h[0].x) : $G(t) : (t = h.length, function (p) {
        for (var b = 0, g; b < t; ++b)
            m[(g = h[b]).i] = g.x(p);
        return m.join("");
    });
}
var Ms = 180 / Math.PI, Pl = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1
};
function gm(e, t, n, i, l, r) {
    var s, m, h;
    return (s = Math.sqrt(e * e + t * t)) && (e /= s, t /= s), (h = e * n + t * i) && (n -= e * h, i -= t * h), (m = Math.sqrt(n * n + i * i)) && (n /= m, i /= m, h /= m), e * i < t * n && (e = -e, t = -t, h = -h, s = -s), {
        translateX: l,
        translateY: r,
        rotate: Math.atan2(t, e) * Ms,
        skewX: Math.atan(h) * Ms,
        scaleX: s,
        scaleY: m
    };
}
var $o;
function EG(e) {
    const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
    return t.isIdentity ? Pl : gm(t.a, t.b, t.c, t.d, t.e, t.f);
}
function PG(e) {
    return e == null || ($o || ($o = document.createElementNS("http://www.w3.org/2000/svg", "g")), $o.setAttribute("transform", e), !(e = $o.transform.baseVal.consolidate())) ? Pl : (e = e.matrix, gm(e.a, e.b, e.c, e.d, e.e, e.f));
}
function ym(e, t, n, i) {
    function l(p) {
        return p.length ? p.pop() + " " : "";
    }
    function r(p, b, g, Z, y, G) {
        if (p !== g || b !== Z) {
            var X = y.push("translate(", null, t, null, n);
            G.push({ i: X - 4, x: xn(p, g) }, { i: X - 2, x: xn(b, Z) });
        } else
            (g || Z) && y.push("translate(" + g + t + Z + n);
    }
    function s(p, b, g, Z) {
        p !== b ? (p - b > 180 ? b += 360 : b - p > 180 && (p += 360), Z.push({ i: g.push(l(g) + "rotate(", null, i) - 2, x: xn(p, b) })) : b && g.push(l(g) + "rotate(" + b + i);
    }
    function m(p, b, g, Z) {
        p !== b ? Z.push({ i: g.push(l(g) + "skewX(", null, i) - 2, x: xn(p, b) }) : b && g.push(l(g) + "skewX(" + b + i);
    }
    function h(p, b, g, Z, y, G) {
        if (p !== g || b !== Z) {
            var X = y.push(l(y) + "scale(", null, ",", null, ")");
            G.push({ i: X - 4, x: xn(p, g) }, { i: X - 2, x: xn(b, Z) });
        } else
            (g !== 1 || Z !== 1) && y.push(l(y) + "scale(" + g + "," + Z + ")");
    }
    return function (p, b) {
        var g = [], Z = [];
        return p = e(p), b = e(b), r(p.translateX, p.translateY, b.translateX, b.translateY, g, Z), s(p.rotate, b.rotate, g, Z), m(p.skewX, b.skewX, g, Z), h(p.scaleX, p.scaleY, b.scaleX, b.scaleY, g, Z), p = b = null, function (y) {
            for (var G = -1, X = Z.length, W; ++G < X;)
                g[(W = Z[G]).i] = W.x(y);
            return g.join("");
        };
    };
}
var BG = ym(EG, "px, ", "px)", "deg)"), OG = ym(PG, ", ", ")", ")"), Ni = 0, Qi = 0, ji = 0, Zm = 1e3, ha, Di, pa = 0, ei = 0, wa = 0, po = typeof performance == "object" && performance.now ? performance : Date, vm = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function (e) {
    setTimeout(e, 17);
};
function Nr() {
    return ei || (vm(AG), ei = po.now() + wa);
}
function AG() {
    ei = 0;
}
function ba() {
    this._call = this._time = this._next = null;
}
ba.prototype = zr.prototype = {
    constructor: ba,
    restart: function (e, t, n) {
        if (typeof e != "function")
            throw new TypeError("callback is not a function");
        n = (n == null ? Nr() : +n) + (t == null ? 0 : +t), !this._next && Di !== this && (Di ? Di._next = this : ha = this, Di = this), this._call = e, this._time = n, Bl();
    },
    stop: function () {
        this._call && (this._call = null, this._time = 1 / 0, Bl());
    }
};
function zr(e, t, n) {
    var i = new ba();
    return i.restart(e, t, n), i;
}
function QG() {
    Nr(), ++Ni;
    for (var e = ha, t; e;)
        (t = ei - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
    --Ni;
}
function Fs() {
    ei = (pa = po.now()) + wa, Ni = Qi = 0;
    try {
        QG();
    } finally {
        Ni = 0, _G(), ei = 0;
    }
}
function DG() {
    var e = po.now(), t = e - pa;
    t > Zm && (wa -= t, pa = e);
}
function _G() {
    for (var e, t = ha, n, i = 1 / 0; t;)
        t._call ? (i > t._time && (i = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : ha = n);
    Di = e, Bl(i);
}
function Bl(e) {
    if (!Ni) {
        Qi && (Qi = clearTimeout(Qi));
        var t = e - ei;
        t > 24 ? (e < 1 / 0 && (Qi = setTimeout(Fs, e - po.now() - wa)), ji && (ji = clearInterval(ji))) : (ji || (pa = po.now(), ji = setInterval(DG, Zm)), Ni = 1, vm(Fs));
    }
}
function $s(e, t, n) {
    var i = new ba();
    return t = t == null ? 0 : +t, i.restart((l) => {
        i.stop(), e(l + t);
    }, t, n), i;
}
var qG = Na("start", "end", "cancel", "interrupt"), eX = [], xm = 0, Us = 1, Ol = 2, _o = 3, js = 4, Al = 5, qo = 6;
function Ja(e, t, n, i, l, r) {
    var s = e.__transition;
    if (!s)
        e.__transition = {};
    else if (n in s)
        return;
    tX(e, n, {
        name: t,
        index: i,
        // For context during callback.
        group: l,
        // For context during callback.
        on: qG,
        tween: eX,
        time: r.time,
        delay: r.delay,
        duration: r.duration,
        ease: r.ease,
        timer: null,
        state: xm
    });
}
function wr(e, t) {
    var n = Ut(e, t);
    if (n.state > xm)
        throw new Error("too late; already scheduled");
    return n;
}
function en(e, t) {
    var n = Ut(e, t);
    if (n.state > _o)
        throw new Error("too late; already running");
    return n;
}
function Ut(e, t) {
    var n = e.__transition;
    if (!n || !(n = n[t]))
        throw new Error("transition not found");
    return n;
}
function tX(e, t, n) {
    var i = e.__transition, l;
    i[t] = n, n.timer = zr(r, 0, n.time);
    function r(p) {
        n.state = Us, n.timer.restart(s, n.delay, n.time), n.delay <= p && s(p - n.delay);
    }
    function s(p) {
        var b, g, Z, y;
        if (n.state !== Us)
            return h();
        for (b in i)
            if (y = i[b], y.name === n.name) {
                if (y.state === _o)
                    return $s(s);
                y.state === js ? (y.state = qo, y.timer.stop(), y.on.call("interrupt", e, e.__data__, y.index, y.group), delete i[b]) : +b < t && (y.state = qo, y.timer.stop(), y.on.call("cancel", e, e.__data__, y.index, y.group), delete i[b]);
            }
        if ($s(function () {
            n.state === _o && (n.state = js, n.timer.restart(m, n.delay, n.time), m(p));
        }), n.state = Ol, n.on.call("start", e, e.__data__, n.index, n.group), n.state === Ol) {
            for (n.state = _o, l = new Array(Z = n.tween.length), b = 0, g = -1; b < Z; ++b)
                (y = n.tween[b].value.call(e, e.__data__, n.index, n.group)) && (l[++g] = y);
            l.length = g + 1;
        }
    }
    function m(p) {
        for (var b = p < n.duration ? n.ease.call(null, p / n.duration) : (n.timer.restart(h), n.state = Al, 1), g = -1, Z = l.length; ++g < Z;)
            l[g].call(e, b);
        n.state === Al && (n.on.call("end", e, e.__data__, n.index, n.group), h());
    }
    function h() {
        n.state = qo, n.timer.stop(), delete i[t];
        for (var p in i)
            return;
        delete e.__transition;
    }
}
function nX(e, t) {
    var n = e.__transition, i, l, r = !0, s;
    if (n) {
        t = t == null ? null : t + "";
        for (s in n) {
            if ((i = n[s]).name !== t) {
                r = !1;
                continue;
            }
            l = i.state > Ol && i.state < Al, i.state = qo, i.timer.stop(), i.on.call(l ? "interrupt" : "cancel", e, e.__data__, i.index, i.group), delete n[s];
        }
        r && delete e.__transition;
    }
}
function iX(e) {
    return this.each(function () {
        nX(this, e);
    });
}
function oX(e, t) {
    var n, i;
    return function () {
        var l = en(this, e), r = l.tween;
        if (r !== n) {
            i = n = r;
            for (var s = 0, m = i.length; s < m; ++s)
                if (i[s].name === t) {
                    i = i.slice(), i.splice(s, 1);
                    break;
                }
        }
        l.tween = i;
    };
}
function aX(e, t, n) {
    var i, l;
    if (typeof n != "function")
        throw new Error();
    return function () {
        var r = en(this, e), s = r.tween;
        if (s !== i) {
            l = (i = s).slice();
            for (var m = { name: t, value: n }, h = 0, p = l.length; h < p; ++h)
                if (l[h].name === t) {
                    l[h] = m;
                    break;
                }
            h === p && l.push(m);
        }
        r.tween = l;
    };
}
function lX(e, t) {
    var n = this._id;
    if (e += "", arguments.length < 2) {
        for (var i = Ut(this.node(), n).tween, l = 0, r = i.length, s; l < r; ++l)
            if ((s = i[l]).name === e)
                return s.value;
        return null;
    }
    return this.each((t == null ? oX : aX)(n, e, t));
}
function Jr(e, t, n) {
    var i = e._id;
    return e.each(function () {
        var l = en(this, i);
        (l.value || (l.value = {}))[t] = n.apply(this, arguments);
    }), function (l) {
        return Ut(l, i).value[t];
    };
}
function Gm(e, t) {
    var n;
    return (typeof t == "number" ? xn : t instanceof ho ? Js : (n = ho(t)) ? (t = n, Js) : jG)(e, t);
}
function rX(e) {
    return function () {
        this.removeAttribute(e);
    };
}
function cX(e) {
    return function () {
        this.removeAttributeNS(e.space, e.local);
    };
}
function sX(e, t, n) {
    var i, l = n + "", r;
    return function () {
        var s = this.getAttribute(e);
        return s === l ? null : s === i ? r : r = t(i = s, n);
    };
}
function dX(e, t, n) {
    var i, l = n + "", r;
    return function () {
        var s = this.getAttributeNS(e.space, e.local);
        return s === l ? null : s === i ? r : r = t(i = s, n);
    };
}
function uX(e, t, n) {
    var i, l, r;
    return function () {
        var s, m = n(this), h;
        return m == null ? void this.removeAttribute(e) : (s = this.getAttribute(e), h = m + "", s === h ? null : s === i && h === l ? r : (l = h, r = t(i = s, m)));
    };
}
function mX(e, t, n) {
    var i, l, r;
    return function () {
        var s, m = n(this), h;
        return m == null ? void this.removeAttributeNS(e.space, e.local) : (s = this.getAttributeNS(e.space, e.local), h = m + "", s === h ? null : s === i && h === l ? r : (l = h, r = t(i = s, m)));
    };
}
function hX(e, t) {
    var n = za(e), i = n === "transform" ? OG : Gm;
    return this.attrTween(e, typeof t == "function" ? (n.local ? mX : uX)(n, i, Jr(this, "attr." + e, t)) : t == null ? (n.local ? cX : rX)(n) : (n.local ? dX : sX)(n, i, t));
}
function pX(e, t) {
    return function (n) {
        this.setAttribute(e, t.call(this, n));
    };
}
function bX(e, t) {
    return function (n) {
        this.setAttributeNS(e.space, e.local, t.call(this, n));
    };
}
function fX(e, t) {
    var n, i;
    function l() {
        var r = t.apply(this, arguments);
        return r !== i && (n = (i = r) && bX(e, r)), n;
    }
    return l._value = t, l;
}
function gX(e, t) {
    var n, i;
    function l() {
        var r = t.apply(this, arguments);
        return r !== i && (n = (i = r) && pX(e, r)), n;
    }
    return l._value = t, l;
}
function yX(e, t) {
    var n = "attr." + e;
    if (arguments.length < 2)
        return (n = this.tween(n)) && n._value;
    if (t == null)
        return this.tween(n, null);
    if (typeof t != "function")
        throw new Error();
    var i = za(e);
    return this.tween(n, (i.local ? fX : gX)(i, t));
}
function ZX(e, t) {
    return function () {
        wr(this, e).delay = +t.apply(this, arguments);
    };
}
function vX(e, t) {
    return t = +t, function () {
        wr(this, e).delay = t;
    };
}
function xX(e) {
    var t = this._id;
    return arguments.length ? this.each((typeof e == "function" ? ZX : vX)(t, e)) : Ut(this.node(), t).delay;
}
function GX(e, t) {
    return function () {
        en(this, e).duration = +t.apply(this, arguments);
    };
}
function XX(e, t) {
    return t = +t, function () {
        en(this, e).duration = t;
    };
}
function WX(e) {
    var t = this._id;
    return arguments.length ? this.each((typeof e == "function" ? GX : XX)(t, e)) : Ut(this.node(), t).duration;
}
function VX(e, t) {
    if (typeof t != "function")
        throw new Error();
    return function () {
        en(this, e).ease = t;
    };
}
function IX(e) {
    var t = this._id;
    return arguments.length ? this.each(VX(t, e)) : Ut(this.node(), t).ease;
}
function kX(e, t) {
    return function () {
        var n = t.apply(this, arguments);
        if (typeof n != "function")
            throw new Error();
        en(this, e).ease = n;
    };
}
function CX(e) {
    if (typeof e != "function")
        throw new Error();
    return this.each(kX(this._id, e));
}
function SX(e) {
    typeof e != "function" && (e = im(e));
    for (var t = this._groups, n = t.length, i = new Array(n), l = 0; l < n; ++l)
        for (var r = t[l], s = r.length, m = i[l] = [], h, p = 0; p < s; ++p)
            (h = r[p]) && e.call(h, h.__data__, p, r) && m.push(h);
    return new pn(i, this._parents, this._name, this._id);
}
function RX(e) {
    if (e._id !== this._id)
        throw new Error();
    for (var t = this._groups, n = e._groups, i = t.length, l = n.length, r = Math.min(i, l), s = new Array(i), m = 0; m < r; ++m)
        for (var h = t[m], p = n[m], b = h.length, g = s[m] = new Array(b), Z, y = 0; y < b; ++y)
            (Z = h[y] || p[y]) && (g[y] = Z);
    for (; m < i; ++m)
        s[m] = t[m];
    return new pn(s, this._parents, this._name, this._id);
}
function LX(e) {
    return (e + "").trim().split(/^|\s+/).every(function (t) {
        var n = t.indexOf(".");
        return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
    });
}
function YX(e, t, n) {
    var i, l, r = LX(t) ? wr : en;
    return function () {
        var s = r(this, e), m = s.on;
        m !== i && (l = (i = m).copy()).on(t, n), s.on = l;
    };
}
function KX(e, t) {
    var n = this._id;
    return arguments.length < 2 ? Ut(this.node(), n).on.on(e) : this.each(YX(n, e, t));
}
function TX(e) {
    return function () {
        var t = this.parentNode;
        for (var n in this.__transition)
            if (+n !== e)
                return;
        t && t.removeChild(this);
    };
}
function HX() {
    return this.on("end.remove", TX(this._id));
}
function NX(e) {
    var t = this._name, n = this._id;
    typeof e != "function" && (e = Kr(e));
    for (var i = this._groups, l = i.length, r = new Array(l), s = 0; s < l; ++s)
        for (var m = i[s], h = m.length, p = r[s] = new Array(h), b, g, Z = 0; Z < h; ++Z)
            (b = m[Z]) && (g = e.call(b, b.__data__, Z, m)) && ("__data__" in b && (g.__data__ = b.__data__), p[Z] = g, Ja(p[Z], t, n, Z, p, Ut(b, n)));
    return new pn(r, this._parents, t, n);
}
function zX(e) {
    var t = this._name, n = this._id;
    typeof e != "function" && (e = nm(e));
    for (var i = this._groups, l = i.length, r = [], s = [], m = 0; m < l; ++m)
        for (var h = i[m], p = h.length, b, g = 0; g < p; ++g)
            if (b = h[g]) {
                for (var Z = e.call(b, b.__data__, g, h), y, G = Ut(b, n), X = 0, W = Z.length; X < W; ++X)
                    (y = Z[X]) && Ja(y, t, n, X, Z, G);
                r.push(Z), s.push(b);
            }
    return new pn(r, s, t, n);
}
var wX = fo.prototype.constructor;
function JX() {
    return new wX(this._groups, this._parents);
}
function MX(e, t) {
    var n, i, l;
    return function () {
        var r = Hi(this, e), s = (this.style.removeProperty(e), Hi(this, e));
        return r === s ? null : r === n && s === i ? l : l = t(n = r, i = s);
    };
}
function Xm(e) {
    return function () {
        this.style.removeProperty(e);
    };
}
function FX(e, t, n) {
    var i, l = n + "", r;
    return function () {
        var s = Hi(this, e);
        return s === l ? null : s === i ? r : r = t(i = s, n);
    };
}
function $X(e, t, n) {
    var i, l, r;
    return function () {
        var s = Hi(this, e), m = n(this), h = m + "";
        return m == null && (h = m = (this.style.removeProperty(e), Hi(this, e))), s === h ? null : s === i && h === l ? r : (l = h, r = t(i = s, m));
    };
}
function UX(e, t) {
    var n, i, l, r = "style." + t, s = "end." + r, m;
    return function () {
        var h = en(this, e), p = h.on, b = h.value[r] == null ? m || (m = Xm(t)) : void 0;
        (p !== n || l !== b) && (i = (n = p).copy()).on(s, l = b), h.on = i;
    };
}
function jX(e, t, n) {
    var i = (e += "") == "transform" ? BG : Gm;
    return t == null ? this.styleTween(e, MX(e, i)).on("end.style." + e, Xm(e)) : typeof t == "function" ? this.styleTween(e, $X(e, i, Jr(this, "style." + e, t))).each(UX(this._id, e)) : this.styleTween(e, FX(e, i, t), n).on("end.style." + e, null);
}
function EX(e, t, n) {
    return function (i) {
        this.style.setProperty(e, t.call(this, i), n);
    };
}
function PX(e, t, n) {
    var i, l;
    function r() {
        var s = t.apply(this, arguments);
        return s !== l && (i = (l = s) && EX(e, s, n)), i;
    }
    return r._value = t, r;
}
function BX(e, t, n) {
    var i = "style." + (e += "");
    if (arguments.length < 2)
        return (i = this.tween(i)) && i._value;
    if (t == null)
        return this.tween(i, null);
    if (typeof t != "function")
        throw new Error();
    return this.tween(i, PX(e, t, n ?? ""));
}
function OX(e) {
    return function () {
        this.textContent = e;
    };
}
function AX(e) {
    return function () {
        var t = e(this);
        this.textContent = t ?? "";
    };
}
function QX(e) {
    return this.tween("text", typeof e == "function" ? AX(Jr(this, "text", e)) : OX(e == null ? "" : e + ""));
}
function DX(e) {
    return function (t) {
        this.textContent = e.call(this, t);
    };
}
function _X(e) {
    var t, n;
    function i() {
        var l = e.apply(this, arguments);
        return l !== n && (t = (n = l) && DX(l)), t;
    }
    return i._value = e, i;
}
function qX(e) {
    var t = "text";
    if (arguments.length < 1)
        return (t = this.tween(t)) && t._value;
    if (e == null)
        return this.tween(t, null);
    if (typeof e != "function")
        throw new Error();
    return this.tween(t, _X(e));
}
function e5() {
    for (var e = this._name, t = this._id, n = Wm(), i = this._groups, l = i.length, r = 0; r < l; ++r)
        for (var s = i[r], m = s.length, h, p = 0; p < m; ++p)
            if (h = s[p]) {
                var b = Ut(h, t);
                Ja(h, e, n, p, s, {
                    time: b.time + b.delay + b.duration,
                    delay: 0,
                    duration: b.duration,
                    ease: b.ease
                });
            }
    return new pn(i, this._parents, e, n);
}
function t5() {
    var e, t, n = this, i = n._id, l = n.size();
    return new Promise(function (r, s) {
        var m = { value: s }, h = {
            value: function () {
                --l === 0 && r();
            }
        };
        n.each(function () {
            var p = en(this, i), b = p.on;
            b !== e && (t = (e = b).copy(), t._.cancel.push(m), t._.interrupt.push(m), t._.end.push(h)), p.on = t;
        }), l === 0 && r();
    });
}
var n5 = 0;
function pn(e, t, n, i) {
    this._groups = e, this._parents = t, this._name = n, this._id = i;
}
function Wm() {
    return ++n5;
}
var on = fo.prototype;
pn.prototype = {
    constructor: pn,
    select: NX,
    selectAll: zX,
    selectChild: on.selectChild,
    selectChildren: on.selectChildren,
    filter: SX,
    merge: RX,
    selection: JX,
    transition: e5,
    call: on.call,
    nodes: on.nodes,
    node: on.node,
    size: on.size,
    empty: on.empty,
    each: on.each,
    on: KX,
    attr: hX,
    attrTween: yX,
    style: jX,
    styleTween: BX,
    text: QX,
    textTween: qX,
    remove: HX,
    tween: lX,
    delay: xX,
    duration: WX,
    ease: IX,
    easeVarying: CX,
    end: t5,
    [Symbol.iterator]: on[Symbol.iterator]
};
function i5(e) {
    return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var o5 = {
    time: null,
    // Set on use.
    delay: 0,
    duration: 250,
    ease: i5
};
function a5(e, t) {
    for (var n; !(n = e.__transition) || !(n = n[t]);)
        if (!(e = e.parentNode))
            throw new Error(`transition ${t} not found`);
    return n;
}
function l5(e) {
    var t, n;
    e instanceof pn ? (t = e._id, e = e._name) : (t = Wm(), (n = o5).time = Nr(), e = e == null ? null : e + "");
    for (var i = this._groups, l = i.length, r = 0; r < l; ++r)
        for (var s = i[r], m = s.length, h, p = 0; p < m; ++p)
            (h = s[p]) && Ja(h, e, t, p, s, n || a5(h, t));
    return new pn(i, this._parents, e, t);
}
fo.prototype.interrupt = iX;
fo.prototype.transition = l5;
function r5(e) {
    const t = +this._x.call(null, e), n = +this._y.call(null, e);
    return Vm(this.cover(t, n), t, n, e);
}
function Vm(e, t, n, i) {
    if (isNaN(t) || isNaN(n))
        return e;
    var l, r = e._root, s = { data: i }, m = e._x0, h = e._y0, p = e._x1, b = e._y1, g, Z, y, G, X, W, V, C;
    if (!r)
        return e._root = s, e;
    for (; r.length;)
        if ((X = t >= (g = (m + p) / 2)) ? m = g : p = g, (W = n >= (Z = (h + b) / 2)) ? h = Z : b = Z, l = r, !(r = r[V = W << 1 | X]))
            return l[V] = s, e;
    if (y = +e._x.call(null, r.data), G = +e._y.call(null, r.data), t === y && n === G)
        return s.next = r, l ? l[V] = s : e._root = s, e;
    do
        l = l ? l[V] = new Array(4) : e._root = new Array(4), (X = t >= (g = (m + p) / 2)) ? m = g : p = g, (W = n >= (Z = (h + b) / 2)) ? h = Z : b = Z;
    while ((V = W << 1 | X) === (C = (G >= Z) << 1 | y >= g));
    return l[C] = r, l[V] = s, e;
}
function c5(e) {
    var t, n, i = e.length, l, r, s = new Array(i), m = new Array(i), h = 1 / 0, p = 1 / 0, b = -1 / 0, g = -1 / 0;
    for (n = 0; n < i; ++n)
        isNaN(l = +this._x.call(null, t = e[n])) || isNaN(r = +this._y.call(null, t)) || (s[n] = l, m[n] = r, l < h && (h = l), l > b && (b = l), r < p && (p = r), r > g && (g = r));
    if (h > b || p > g)
        return this;
    for (this.cover(h, p).cover(b, g), n = 0; n < i; ++n)
        Vm(this, s[n], m[n], e[n]);
    return this;
}
function s5(e, t) {
    if (isNaN(e = +e) || isNaN(t = +t))
        return this;
    var n = this._x0, i = this._y0, l = this._x1, r = this._y1;
    if (isNaN(n))
        l = (n = Math.floor(e)) + 1, r = (i = Math.floor(t)) + 1;
    else {
        for (var s = l - n || 1, m = this._root, h, p; n > e || e >= l || i > t || t >= r;)
            switch (p = (t < i) << 1 | e < n, h = new Array(4), h[p] = m, m = h, s *= 2, p) {
                case 0:
                    l = n + s, r = i + s;
                    break;
                case 1:
                    n = l - s, r = i + s;
                    break;
                case 2:
                    l = n + s, i = r - s;
                    break;
                case 3:
                    n = l - s, i = r - s;
                    break;
            }
        this._root && this._root.length && (this._root = m);
    }
    return this._x0 = n, this._y0 = i, this._x1 = l, this._y1 = r, this;
}
function d5() {
    var e = [];
    return this.visit(function (t) {
        if (!t.length)
            do
                e.push(t.data);
            while (t = t.next);
    }), e;
}
function u5(e) {
    return arguments.length ? this.cover(+e[0][0], +e[0][1]).cover(+e[1][0], +e[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function bt(e, t, n, i, l) {
    this.node = e, this.x0 = t, this.y0 = n, this.x1 = i, this.y1 = l;
}
function m5(e, t, n) {
    var i, l = this._x0, r = this._y0, s, m, h, p, b = this._x1, g = this._y1, Z = [], y = this._root, G, X;
    for (y && Z.push(new bt(y, l, r, b, g)), n == null ? n = 1 / 0 : (l = e - n, r = t - n, b = e + n, g = t + n, n *= n); G = Z.pop();)
        if (!(!(y = G.node) || (s = G.x0) > b || (m = G.y0) > g || (h = G.x1) < l || (p = G.y1) < r))
            if (y.length) {
                var W = (s + h) / 2, V = (m + p) / 2;
                Z.push(
                    new bt(y[3], W, V, h, p),
                    new bt(y[2], s, V, W, p),
                    new bt(y[1], W, m, h, V),
                    new bt(y[0], s, m, W, V)
                ), (X = (t >= V) << 1 | e >= W) && (G = Z[Z.length - 1], Z[Z.length - 1] = Z[Z.length - 1 - X], Z[Z.length - 1 - X] = G);
            } else {
                var C = e - +this._x.call(null, y.data), H = t - +this._y.call(null, y.data), L = C * C + H * H;
                if (L < n) {
                    var E = Math.sqrt(n = L);
                    l = e - E, r = t - E, b = e + E, g = t + E, i = y.data;
                }
            }
    return i;
}
function h5(e) {
    if (isNaN(b = +this._x.call(null, e)) || isNaN(g = +this._y.call(null, e)))
        return this;
    var t, n = this._root, i, l, r, s = this._x0, m = this._y0, h = this._x1, p = this._y1, b, g, Z, y, G, X, W, V;
    if (!n)
        return this;
    if (n.length)
        for (; ;) {
            if ((G = b >= (Z = (s + h) / 2)) ? s = Z : h = Z, (X = g >= (y = (m + p) / 2)) ? m = y : p = y, t = n, !(n = n[W = X << 1 | G]))
                return this;
            if (!n.length)
                break;
            (t[W + 1 & 3] || t[W + 2 & 3] || t[W + 3 & 3]) && (i = t, V = W);
        }
    for (; n.data !== e;)
        if (l = n, !(n = n.next))
            return this;
    return (r = n.next) && delete n.next, l ? (r ? l.next = r : delete l.next, this) : t ? (r ? t[W] = r : delete t[W], (n = t[0] || t[1] || t[2] || t[3]) && n === (t[3] || t[2] || t[1] || t[0]) && !n.length && (i ? i[V] = n : this._root = n), this) : (this._root = r, this);
}
function p5(e) {
    for (var t = 0, n = e.length; t < n; ++t)
        this.remove(e[t]);
    return this;
}
function b5() {
    return this._root;
}
function f5() {
    var e = 0;
    return this.visit(function (t) {
        if (!t.length)
            do
                ++e;
            while (t = t.next);
    }), e;
}
function g5(e) {
    var t = [], n, i = this._root, l, r, s, m, h;
    for (i && t.push(new bt(i, this._x0, this._y0, this._x1, this._y1)); n = t.pop();)
        if (!e(i = n.node, r = n.x0, s = n.y0, m = n.x1, h = n.y1) && i.length) {
            var p = (r + m) / 2, b = (s + h) / 2;
            (l = i[3]) && t.push(new bt(l, p, b, m, h)), (l = i[2]) && t.push(new bt(l, r, b, p, h)), (l = i[1]) && t.push(new bt(l, p, s, m, b)), (l = i[0]) && t.push(new bt(l, r, s, p, b));
        }
    return this;
}
function y5(e) {
    var t = [], n = [], i;
    for (this._root && t.push(new bt(this._root, this._x0, this._y0, this._x1, this._y1)); i = t.pop();) {
        var l = i.node;
        if (l.length) {
            var r, s = i.x0, m = i.y0, h = i.x1, p = i.y1, b = (s + h) / 2, g = (m + p) / 2;
            (r = l[0]) && t.push(new bt(r, s, m, b, g)), (r = l[1]) && t.push(new bt(r, b, m, h, g)), (r = l[2]) && t.push(new bt(r, s, g, b, p)), (r = l[3]) && t.push(new bt(r, b, g, h, p));
        }
        n.push(i);
    }
    for (; i = n.pop();)
        e(i.node, i.x0, i.y0, i.x1, i.y1);
    return this;
}
function Z5(e) {
    return e[0];
}
function v5(e) {
    return arguments.length ? (this._x = e, this) : this._x;
}
function x5(e) {
    return e[1];
}
function G5(e) {
    return arguments.length ? (this._y = e, this) : this._y;
}
function Mr(e, t, n) {
    var i = new Fr(t ?? Z5, n ?? x5, NaN, NaN, NaN, NaN);
    return e == null ? i : i.addAll(e);
}
function Fr(e, t, n, i, l, r) {
    this._x = e, this._y = t, this._x0 = n, this._y0 = i, this._x1 = l, this._y1 = r, this._root = void 0;
}
function Es(e) {
    for (var t = { data: e.data }, n = t; e = e.next;)
        n = n.next = { data: e.data };
    return t;
}
var vt = Mr.prototype = Fr.prototype;
vt.copy = function () {
    var e = new Fr(this._x, this._y, this._x0, this._y0, this._x1, this._y1), t = this._root, n, i;
    if (!t)
        return e;
    if (!t.length)
        return e._root = Es(t), e;
    for (n = [{ source: t, target: e._root = new Array(4) }]; t = n.pop();)
        for (var l = 0; l < 4; ++l)
            (i = t.source[l]) && (i.length ? n.push({ source: i, target: t.target[l] = new Array(4) }) : t.target[l] = Es(i));
    return e;
};
vt.add = r5;
vt.addAll = c5;
vt.cover = s5;
vt.data = d5;
vt.extent = u5;
vt.find = m5;
vt.remove = h5;
vt.removeAll = p5;
vt.root = b5;
vt.size = f5;
vt.visit = g5;
vt.visitAfter = y5;
vt.x = v5;
vt.y = G5;
function ft(e) {
    return function () {
        return e;
    };
}
function Wn(e) {
    return (e() - 0.5) * 1e-6;
}
function X5(e) {
    return e.x + e.vx;
}
function W5(e) {
    return e.y + e.vy;
}
function V5(e) {
    var t, n, i, l = 1, r = 1;
    typeof e != "function" && (e = ft(e == null ? 1 : +e));
    function s() {
        for (var p, b = t.length, g, Z, y, G, X, W, V = 0; V < r; ++V)
            for (g = Mr(t, X5, W5).visitAfter(m), p = 0; p < b; ++p)
                Z = t[p], X = n[Z.index], W = X * X, y = Z.x + Z.vx, G = Z.y + Z.vy, g.visit(C);
        function C(H, L, E, J, K) {
            var Y = H.data, T = H.r, z = X + T;
            if (Y) {
                if (Y.index > Z.index) {
                    var M = y - Y.x - Y.vx, U = G - Y.y - Y.vy, j = M * M + U * U;
                    j < z * z && (M === 0 && (M = Wn(i), j += M * M), U === 0 && (U = Wn(i), j += U * U), j = (z - (j = Math.sqrt(j))) / j * l, Z.vx += (M *= j) * (z = (T *= T) / (W + T)), Z.vy += (U *= j) * z, Y.vx -= M * (z = 1 - z), Y.vy -= U * z);
                }
                return;
            }
            return L > y + z || J < y - z || E > G + z || K < G - z;
        }
    }
    function m(p) {
        if (p.data)
            return p.r = n[p.data.index];
        for (var b = p.r = 0; b < 4; ++b)
            p[b] && p[b].r > p.r && (p.r = p[b].r);
    }
    function h() {
        if (t) {
            var p, b = t.length, g;
            for (n = new Array(b), p = 0; p < b; ++p)
                g = t[p], n[g.index] = +e(g, p, t);
        }
    }
    return s.initialize = function (p, b) {
        t = p, i = b, h();
    }, s.iterations = function (p) {
        return arguments.length ? (r = +p, s) : r;
    }, s.strength = function (p) {
        return arguments.length ? (l = +p, s) : l;
    }, s.radius = function (p) {
        return arguments.length ? (e = typeof p == "function" ? p : ft(+p), h(), s) : e;
    }, s;
}
function I5(e) {
    return e.index;
}
function Ps(e, t) {
    var n = e.get(t);
    if (!n)
        throw new Error("node not found: " + t);
    return n;
}
function Im(e) {
    var t = I5, n = g, i, l = ft(30), r, s, m, h, p, b = 1;
    e == null && (e = []);
    function g(W) {
        return 1 / Math.min(m[W.source.index], m[W.target.index]);
    }
    function Z(W) {
        for (var V = 0, C = e.length; V < b; ++V)
            for (var H = 0, L, E, J, K, Y, T, z; H < C; ++H)
                L = e[H], E = L.source, J = L.target, K = J.x + J.vx - E.x - E.vx || Wn(p), Y = J.y + J.vy - E.y - E.vy || Wn(p), T = Math.sqrt(K * K + Y * Y), T = (T - r[H]) / T * W * i[H], K *= T, Y *= T, J.vx -= K * (z = h[H]), J.vy -= Y * z, E.vx += K * (z = 1 - z), E.vy += Y * z;
    }
    function y() {
        if (s) {
            var W, V = s.length, C = e.length, H = new Map(s.map((E, J) => [t(E, J, s), E])), L;
            for (W = 0, m = new Array(V); W < C; ++W)
                L = e[W], L.index = W, typeof L.source != "object" && (L.source = Ps(H, L.source)), typeof L.target != "object" && (L.target = Ps(H, L.target)), m[L.source.index] = (m[L.source.index] || 0) + 1, m[L.target.index] = (m[L.target.index] || 0) + 1;
            for (W = 0, h = new Array(C); W < C; ++W)
                L = e[W], h[W] = m[L.source.index] / (m[L.source.index] + m[L.target.index]);
            i = new Array(C), G(), r = new Array(C), X();
        }
    }
    function G() {
        if (s)
            for (var W = 0, V = e.length; W < V; ++W)
                i[W] = +n(e[W], W, e);
    }
    function X() {
        if (s)
            for (var W = 0, V = e.length; W < V; ++W)
                r[W] = +l(e[W], W, e);
    }
    return Z.initialize = function (W, V) {
        s = W, p = V, y();
    }, Z.links = function (W) {
        return arguments.length ? (e = W, y(), Z) : e;
    }, Z.id = function (W) {
        return arguments.length ? (t = W, Z) : t;
    }, Z.iterations = function (W) {
        return arguments.length ? (b = +W, Z) : b;
    }, Z.strength = function (W) {
        return arguments.length ? (n = typeof W == "function" ? W : ft(+W), G(), Z) : n;
    }, Z.distance = function (W) {
        return arguments.length ? (l = typeof W == "function" ? W : ft(+W), X(), Z) : l;
    }, Z;
}
const k5 = 1664525, C5 = 1013904223, Bs = 4294967296;
function S5() {
    let e = 1;
    return () => (e = (k5 * e + C5) % Bs) / Bs;
}
function R5(e) {
    return e.x;
}
function L5(e) {
    return e.y;
}
var Y5 = 10, K5 = Math.PI * (3 - Math.sqrt(5));
function km(e) {
    var t, n = 1, i = 1e-3, l = 1 - Math.pow(i, 1 / 300), r = 0, s = 0.6, m = /* @__PURE__ */ new Map(), h = zr(g), p = Na("tick", "end"), b = S5();
    e == null && (e = []);
    function g() {
        Z(), p.call("tick", t), n < i && (h.stop(), p.call("end", t));
    }
    function Z(X) {
        var W, V = e.length, C;
        X === void 0 && (X = 1);
        for (var H = 0; H < X; ++H)
            for (n += (r - n) * l, m.forEach(function (L) {
                L(n);
            }), W = 0; W < V; ++W)
                C = e[W], C.fx == null ? C.x += C.vx *= s : (C.x = C.fx, C.vx = 0), C.fy == null ? C.y += C.vy *= s : (C.y = C.fy, C.vy = 0);
        return t;
    }
    function y() {
        for (var X = 0, W = e.length, V; X < W; ++X) {
            if (V = e[X], V.index = X, V.fx != null && (V.x = V.fx), V.fy != null && (V.y = V.fy), isNaN(V.x) || isNaN(V.y)) {
                var C = Y5 * Math.sqrt(0.5 + X), H = X * K5;
                V.x = C * Math.cos(H), V.y = C * Math.sin(H);
            }
            (isNaN(V.vx) || isNaN(V.vy)) && (V.vx = V.vy = 0);
        }
    }
    function G(X) {
        return X.initialize && X.initialize(e, b), X;
    }
    return y(), t = {
        tick: Z,
        restart: function () {
            return h.restart(g), t;
        },
        stop: function () {
            return h.stop(), t;
        },
        nodes: function (X) {
            return arguments.length ? (e = X, y(), m.forEach(G), t) : e;
        },
        alpha: function (X) {
            return arguments.length ? (n = +X, t) : n;
        },
        alphaMin: function (X) {
            return arguments.length ? (i = +X, t) : i;
        },
        alphaDecay: function (X) {
            return arguments.length ? (l = +X, t) : +l;
        },
        alphaTarget: function (X) {
            return arguments.length ? (r = +X, t) : r;
        },
        velocityDecay: function (X) {
            return arguments.length ? (s = 1 - X, t) : 1 - s;
        },
        randomSource: function (X) {
            return arguments.length ? (b = X, m.forEach(G), t) : b;
        },
        force: function (X, W) {
            return arguments.length > 1 ? (W == null ? m.delete(X) : m.set(X, G(W)), t) : m.get(X);
        },
        find: function (X, W, V) {
            var C = 0, H = e.length, L, E, J, K, Y;
            for (V == null ? V = 1 / 0 : V *= V, C = 0; C < H; ++C)
                K = e[C], L = X - K.x, E = W - K.y, J = L * L + E * E, J < V && (Y = K, V = J);
            return Y;
        },
        on: function (X, W) {
            return arguments.length > 1 ? (p.on(X, W), t) : p.on(X);
        }
    };
}
function Cm() {
    var e, t, n, i, l = ft(-30), r, s = 1, m = 1 / 0, h = 0.81;
    function p(y) {
        var G, X = e.length, W = Mr(e, R5, L5).visitAfter(g);
        for (i = y, G = 0; G < X; ++G)
            t = e[G], W.visit(Z);
    }
    function b() {
        if (e) {
            var y, G = e.length, X;
            for (r = new Array(G), y = 0; y < G; ++y)
                X = e[y], r[X.index] = +l(X, y, e);
        }
    }
    function g(y) {
        var G = 0, X, W, V = 0, C, H, L;
        if (y.length) {
            for (C = H = L = 0; L < 4; ++L)
                (X = y[L]) && (W = Math.abs(X.value)) && (G += X.value, V += W, C += W * X.x, H += W * X.y);
            y.x = C / V, y.y = H / V;
        } else {
            X = y, X.x = X.data.x, X.y = X.data.y;
            do
                G += r[X.data.index];
            while (X = X.next);
        }
        y.value = G;
    }
    function Z(y, G, X, W) {
        if (!y.value)
            return !0;
        var V = y.x - t.x, C = y.y - t.y, H = W - G, L = V * V + C * C;
        if (H * H / h < L)
            return L < m && (V === 0 && (V = Wn(n), L += V * V), C === 0 && (C = Wn(n), L += C * C), L < s && (L = Math.sqrt(s * L)), t.vx += V * y.value * i / L, t.vy += C * y.value * i / L), !0;
        if (y.length || L >= m)
            return;
        (y.data !== t || y.next) && (V === 0 && (V = Wn(n), L += V * V), C === 0 && (C = Wn(n), L += C * C), L < s && (L = Math.sqrt(s * L)));
        do
            y.data !== t && (H = r[y.data.index] * i / L, t.vx += V * H, t.vy += C * H);
        while (y = y.next);
    }
    return p.initialize = function (y, G) {
        e = y, n = G, b();
    }, p.strength = function (y) {
        return arguments.length ? (l = typeof y == "function" ? y : ft(+y), b(), p) : l;
    }, p.distanceMin = function (y) {
        return arguments.length ? (s = y * y, p) : Math.sqrt(s);
    }, p.distanceMax = function (y) {
        return arguments.length ? (m = y * y, p) : Math.sqrt(m);
    }, p.theta = function (y) {
        return arguments.length ? (h = y * y, p) : Math.sqrt(h);
    }, p;
}
function Sm(e) {
    var t = ft(0.1), n, i, l;
    typeof e != "function" && (e = ft(e == null ? 0 : +e));
    function r(m) {
        for (var h = 0, p = n.length, b; h < p; ++h)
            b = n[h], b.vx += (l[h] - b.x) * i[h] * m;
    }
    function s() {
        if (n) {
            var m, h = n.length;
            for (i = new Array(h), l = new Array(h), m = 0; m < h; ++m)
                i[m] = isNaN(l[m] = +e(n[m], m, n)) ? 0 : +t(n[m], m, n);
        }
    }
    return r.initialize = function (m) {
        n = m, s();
    }, r.strength = function (m) {
        return arguments.length ? (t = typeof m == "function" ? m : ft(+m), s(), r) : t;
    }, r.x = function (m) {
        return arguments.length ? (e = typeof m == "function" ? m : ft(+m), s(), r) : e;
    }, r;
}
function Rm(e) {
    var t = ft(0.1), n, i, l;
    typeof e != "function" && (e = ft(e == null ? 0 : +e));
    function r(m) {
        for (var h = 0, p = n.length, b; h < p; ++h)
            b = n[h], b.vy += (l[h] - b.y) * i[h] * m;
    }
    function s() {
        if (n) {
            var m, h = n.length;
            for (i = new Array(h), l = new Array(h), m = 0; m < h; ++m)
                i[m] = isNaN(l[m] = +e(n[m], m, n)) ? 0 : +t(n[m], m, n);
        }
    }
    return r.initialize = function (m) {
        n = m, s();
    }, r.strength = function (m) {
        return arguments.length ? (t = typeof m == "function" ? m : ft(+m), s(), r) : t;
    }, r.y = function (m) {
        return arguments.length ? (e = typeof m == "function" ? m : ft(+m), s(), r) : e;
    }, r;
}
function T5(e, t) {
    switch (arguments.length) {
        case 0:
            break;
        case 1:
            this.range(e);
            break;
        default:
            this.range(t).domain(e);
            break;
    }
    return this;
}
const Os = Symbol("implicit");
function Lm() {
    var e = new Is(), t = [], n = [], i = Os;
    function l(r) {
        let s = e.get(r);
        if (s === void 0) {
            if (i !== Os)
                return i;
            e.set(r, s = t.push(r) - 1);
        }
        return n[s % n.length];
    }
    return l.domain = function (r) {
        if (!arguments.length)
            return t.slice();
        t = [], e = new Is();
        for (const s of r)
            e.has(s) || e.set(s, t.push(s) - 1);
        return l;
    }, l.range = function (r) {
        return arguments.length ? (n = Array.from(r), l) : n.slice();
    }, l.unknown = function (r) {
        return arguments.length ? (i = r, l) : i;
    }, l.copy = function () {
        return Lm(t, n).unknown(i);
    }, T5.apply(l, arguments), l;
}
function H5(e) {
    for (var t = e.length / 6 | 0, n = new Array(t), i = 0; i < t;)
        n[i] = "#" + e.slice(i * 6, ++i * 6);
    return n;
}
const N5 = H5("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");
function _i(e, t, n) {
    this.k = e, this.x = t, this.y = n;
}
_i.prototype = {
    constructor: _i,
    scale: function (e) {
        return e === 1 ? this : new _i(this.k * e, this.x, this.y);
    },
    translate: function (e, t) {
        return e === 0 & t === 0 ? this : new _i(this.k, this.x + this.k * e, this.y + this.k * t);
    },
    apply: function (e) {
        return [e[0] * this.k + this.x, e[1] * this.k + this.y];
    },
    applyX: function (e) {
        return e * this.k + this.x;
    },
    applyY: function (e) {
        return e * this.k + this.y;
    },
    invert: function (e) {
        return [(e[0] - this.x) / this.k, (e[1] - this.y) / this.k];
    },
    invertX: function (e) {
        return (e - this.x) / this.k;
    },
    invertY: function (e) {
        return (e - this.y) / this.k;
    },
    rescaleX: function (e) {
        return e.copy().domain(e.range().map(this.invertX, this).map(e.invert, e));
    },
    rescaleY: function (e) {
        return e.copy().domain(e.range().map(this.invertY, this).map(e.invert, e));
    },
    toString: function () {
        return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
    }
};
_i.prototype;
function z5(e, t, n) {
    const { doc: { tableIds: i, relationshipIds: l }, collections: r } = e, s = $(r).collection("tableEntities").selectByIds(i), m = $(r).collection("relationshipEntities").selectByIds(l), h = [], p = [], b = /* @__PURE__ */ new Set();
    return s.forEach((g) => {
        const Z = Qt(g, e).width, y = an(g);
        h.push({
            id: g.id,
            r: (Z + y) / 4,
            x: t,
            y: n,
            ref: g
        });
    }), m.forEach((g) => {
        const { start: Z, end: y } = g, G = `${Z.tableId}-${y.tableId}`;
        Z.tableId !== y.tableId && !b.has(G) && (p.push({
            source: Z.tableId,
            target: y.tableId
        }), b.add(G));
    }), [h, p];
}
function w5(e) {
    const { settings: t } = e, n = t.width / 2, i = t.height / 2, [l, r] = z5(e, n, i);
    return km(l).force("link", Im(r).id((s) => s.id)).force("collide", V5().radius((s) => 100 + s.r)).force("charge", Cm()).force("x", Sm(n)).force("y", Rm(i)).on("tick", () => {
        l.forEach(({ r: s, x: m, y: h, ref: p }) => {
            p.ui.x = m - s, p.ui.y = h - s;
        }), jd(e);
    });
}
const J5 = (e, t) => {
    const n = Ue(), i = Ue(), l = e.app.value, r = ao({
        toWidth: l.toWidth
    }), { addUnsubscribe: s } = Ge(), m = bo(t, Li, r), { store: { state: h } } = l, { store: p } = r, b = () => ({ ...l.store.state.editor.viewport });
    s(Pe(l.store.state.editor.viewport).subscribe(() => {
        r.store.dispatch(rn(b()));
    }), () => {
        m.destroy(), lo(r);
    });
    const g = Ed(j1, 0.7), Z = (L) => Qo(g(L), 2);
    p.dispatchSync(io(ii(h)), rn(b()), U1({
        value: Z(h.editor.viewport.width / h.settings.width)
    }), Ri({
        scrollLeft: -1 * (h.settings.width / 2 - h.editor.viewport.width / 2),
        scrollTop: -1 * (h.settings.height / 2 - h.editor.viewport.height / 2)
    }));
    const { doc: { tableIds: y }, collections: G } = p.state, X = $(G).collection("tableEntities").selectByIds(y), [W, V] = tm();
    let C = !1;
    const H = () => {
        C = !0, V(), l.store.dispatch(ct({ [ce.automaticTablePlacement]: !1 }));
    };
    if (!X.length)
        return H(), l.emitter.emit(dn({
            message: I`<${hn} description="Not found tables" />`
        })), () => null;
    try {
        const L = w5(p.state), E = () => {
            C || (L.stop(), e.onChange(X.map((K) => ({
                id: K.id,
                x: K.ui.x,
                y: K.ui.y
            }))), H());
        }, J = () => {
            L.stop(), H();
        };
        l.emitter.emit(dn({
            close: W,
            message: I`
          <${hn}
            description="Automatic Table Placement..."
            action=${I`
              <${Ti}
                variant="soft"
                size="1"
                text="Stop"
                .onClick=${E}
              />
              <${Ti} size="1" text="Cancel" .onClick=${J} />
            `}
          />
        `
        })), L.on("end", E), s(l.shortcut$.subscribe(({ type: K }) => {
            K === D.stop && J();
        }));
    } catch {
        return H(), () => null;
    }
    return () => I`
    <div class=${Lv}>
      <div class=${Yv} ${De(n)}>
        <${Ta} root=${n} canvas=${i} grabMove=${!0} />
        <${Ha} />
      </div>
    </div>
  `;
}, at = {
    insert: 1,
    delete: 2
};
function M5(e, t) {
    const n = fa(e), i = fa(t), l = As(e, i, at.delete), r = As(t, n, at.insert);
    return [l, r];
}
function fa({ doc: { tableIds: e }, collections: t }) {
    const n = /* @__PURE__ */ new Map();
    return $(t).collection("tableEntities").selectByIds(e).forEach((i) => {
        const l = /* @__PURE__ */ new Map();
        n.set(i.name, { table: i, nameToColumnMap: l }), $(t).collection("tableColumnEntities").selectByIds(i.columnIds).forEach((r) => {
            l.set(r.name, r);
        });
    }), n;
}
function As({ doc: { tableIds: e }, collections: t }, n, i) {
    const l = /* @__PURE__ */ new Map();
    return $(t).collection("tableEntities").selectByIds(e).forEach((r) => {
        const s = n.get(r.name), m = /* @__PURE__ */ new Map();
        l.set(r.id, ["tableEntities", m]), m.set("tableName", Ot(i, r.name, s == null ? void 0 : s.table.name)), m.set("tableComment", Ot(i, r.comment, s == null ? void 0 : s.table.comment)), $(t).collection("tableColumnEntities").selectByIds(r.columnIds).forEach((h) => {
            const p = s == null ? void 0 : s.nameToColumnMap.get(h.name), b = /* @__PURE__ */ new Map();
            l.set(h.id, ["tableColumnEntities", b]), b.set("columnName", Ot(i, h.name, p == null ? void 0 : p.name)), b.set("columnComment", Ot(i, h.comment, p == null ? void 0 : p.comment)), b.set("columnDataType", Ot(i, h.dataType, p == null ? void 0 : p.dataType)), b.set("columnDefault", Ot(i, h.default, p == null ? void 0 : p.default)), b.set("columnAutoIncrement", p ? Ot(i, B(h.options, ie.autoIncrement), B(p.options, ie.autoIncrement)) : i), b.set("columnPrimaryKey", p ? Ot(i, B(h.options, ie.primaryKey), B(p.options, ie.primaryKey)) : i), b.set("columnUnique", p ? Ot(i, B(h.options, ie.unique), B(p.options, ie.unique)) : i), b.set("columnNotNull", p ? Ot(i, B(h.options, ie.notNull), B(p.options, ie.notNull)) : i);
        });
    }), Array.from(l).forEach(([r, [s, m]]) => {
        Array.from(m).forEach(([h, p]) => {
            p === 0 && m.delete(h);
        }), m.size === 0 && l.delete(r);
    }), l;
}
function Ot(e, t, n) {
    return t === n ? 0 : e;
}
function F5(e, t) {
    const n = document.createElement("style"), i = e === at.insert ? ".diff-viewer-insert" : ".diff-viewer-delete", l = Array.from(t).map(([r, [s, m]]) => {
        const h = `${i} [data-id="${r}"]`;
        return Array.from(m).map(([p, b]) => b !== 0 ? (
            /* css */
            `
              ${h} [data-type="${p}"] {
                background-color: ${b === at.insert ? "var(--diff-insert-background)" : "var(--diff-delete-background)"};
              }
            `
        ) : "").join(`
`);
    }).join(`
`);
    return n.textContent = l, n;
}
function $5(e) {
    const t = se(e), n = Se({
        selected: null
    });
    let i = 0, l = 0;
    const r = () => {
        const { store: y } = t.value, { editor: { viewport: G }, settings: { width: X } } = y.state;
        return G.width / X;
    }, s = () => {
        const { store: y } = t.value, { editor: { viewport: G }, settings: { height: X } } = y.state;
        return G.height / X;
    }, m = (y, G) => -1 * (y / G), h = ({ movementX: y, x: G }) => {
        const { store: X } = t.value, { settings: W, editor: { viewport: V } } = X.state, C = W.scrollLeft + m(y, r()), H = V.width - W.width, L = 0, E = y < 0 ? oe.left : oe.right;
        let J = !1;
        switch (E) {
            case oe.left:
                C < L && G < i && (i += y, J = !0);
                break;
            case oe.right:
                C > H && G > i && (i += y, J = !0);
                break;
        }
        return J ? y : 0;
    }, p = ({ movementY: y, y: G }) => {
        const { store: X } = t.value, { settings: W, editor: { viewport: V } } = X.state, C = W.scrollTop + m(y, s()), H = V.height - W.height, L = 0, E = y < 0 ? oe.top : oe.bottom;
        let J = !1;
        switch (E) {
            case oe.top:
                C < L && G < l && (l += y, J = !0);
                break;
            case oe.bottom:
                C > H && G > l && (l += y, J = !0);
                break;
        }
        return J ? y : 0;
    }, b = (y) => {
        const { event: G } = y;
        G.type === "mousemove" && G.preventDefault();
        const X = n.selected === "vertical", W = n.selected === "horizontal", V = h(y), C = p(y), { store: H } = t.value;
        X && C !== 0 ? H.dispatch(_n({
            movementX: 0,
            movementY: m(C, s())
        })) : W && V !== 0 && H.dispatch(_n({
            movementX: m(V, r()),
            movementY: 0
        }));
    };
    return {
        state: n,
        onScrollLeftStart: (y) => {
            n.selected = "horizontal", i = y.clientX, qt.subscribe({
                next: b,
                complete: () => {
                    n.selected = null;
                }
            });
        },
        onScrollTopStart: (y) => {
            n.selected = "vertical", l = y.clientY, qt.subscribe({
                next: b,
                complete: () => {
                    n.selected = null;
                }
            });
        },
        getWidthRatio: r,
        getHeightRatio: s
    };
}
const U5 = N`
  position: absolute;
  top: 0;
  right: 0;
  width: 8px;
  height: calc(100% - 8px);
  overflow: hidden;
  padding-top: 4px;
`, j5 = N`
  position: absolute;
  left: 0;
  bottom: 0;
  width: calc(100% - 8px);
  height: 8px;
  overflow: hidden;
  padding-left: 4px;
`, Qs = N`
  will-change: transform;
  cursor: pointer;

  &:hover > div {
    background-color: var(--scrollbar-thumb-hover);
  }

  &[data-selected] > div {
    background-color: var(--scrollbar-thumb-hover);
  }
`, Ym = N`
  background-color: var(--scrollbar-thumb);
  border-radius: 4px;
`, E5 = N`
  width: 4px;
  height: 100%;
  ${Ym};
`, P5 = N`
  width: 100%;
  height: 4px;
  ${Ym};
`, Km = (e, t) => {
        const n = se(t), { state: i, getWidthRatio: l, getHeightRatio: r, onScrollLeftStart: s, onScrollTopStart: m } = $5(t), h = Ue(), p = Ue(), b = (Z) => {
            const y = Z.target;
            if (!y || !!y.closest(".virtual-scroll-ghost-thumb"))
                return;
            const { store: X } = n.value, { editor: { viewport: W }, settings: V } = X.state, C = l(), L = h.value.getBoundingClientRect(), Y = (Z.clientX - L.x) / C - W.width / 2;
            X.dispatch(Ri({
                scrollLeft: -1 * Y,
                scrollTop: V.scrollTop
            })), s(Z);
        }, g = (Z) => {
            const y = Z.target;
            if (!y || !!y.closest(".virtual-scroll-ghost-thumb"))
                return;
            const { store: X } = n.value, { editor: { viewport: W } } = X.state, V = r(), H = p.value.getBoundingClientRect(), K = (Z.clientY - H.y) / V - W.height / 2;
            X.dispatch(Ri({
                scrollLeft: X.state.settings.scrollLeft,
                scrollTop: -1 * K
            })), m(Z);
        };
        return () => {
            const { store: Z } = n.value, { editor: { viewport: y }, settings: { width: G, height: X, scrollLeft: W, scrollTop: V } } = Z.state, C = l(), H = r(), L = y.width * C, E = y.height * H, J = -1 * W * C, K = -1 * V * H, Y = y.width < G, T = y.height < X;
            return I`
      ${Y ? I`
            <div
              class=${["virtual-scroll", j5]}
              ${De(h)}
              @mousedown=${b}
            >
              <div
                class=${["virtual-scroll-ghost-thumb", Qs]}
                style=${{
                        width: `${L}px`,
                        height: "100%",
                        transform: `translate(${J}px, 0px)`
                    }}
                ?data-selected=${i.selected === "horizontal"}
                @mousedown=${s}
              >
                <div class=${P5}></div>
              </div>
            </div>
          ` : null}
      ${T ? I`
            <div
              class=${["virtual-scroll", U5]}
              ${De(p)}
              @mousedown=${g}
            >
              <div
                class=${["virtual-scroll-ghost-thumb", Qs]}
                style=${{
                        width: "100%",
                        height: `${E}px`,
                        transform: `translate(0px, ${K}px)`
                    }}
                ?data-selected=${i.selected === "vertical"}
                @mousedown=${m}
              >
                <div class=${E5}></div>
              </div>
            </div>
          ` : null}
    `;
        };
    }, B5 = N`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`, Ds = (e, t) => {
        const n = Ue(), i = Ue(), l = e.app, r = bo(t, Li, l), s = Se({
            grabCursor: "grab"
        }), { addUnsubscribe: m } = Ge(), h = F5(e.diff, e.diffMap);
        m(() => {
            r.destroy();
        });
        const p = () => {
            n.value.scrollTop === 0 && n.value.scrollLeft === 0 || (n.value.scrollTop = 0, n.value.scrollLeft = 0);
        }, b = (y) => {
            y.preventDefault();
            const G = un(y), { store: X } = l;
            X.dispatch(G ? oa(y.deltaY < 0 ? 0.1 : -0.1) : _n({
                movementX: y.deltaX * -1,
                movementY: y.deltaY * -1
            }));
        }, g = ({ event: y, movementX: G, movementY: X }) => {
            const { store: W } = l;
            y.type === "mousemove" && y.preventDefault(), !(G === 0 && X === 0) && (W.dispatch(_n({ movementX: G, movementY: X })), p());
        }, Z = (y) => {
            const G = y.target;
            if (!G)
                return;
            const X = !G.closest(".color-picker"), W = !G.closest(".table") && !G.closest(".memo") && !G.closest(".edit-input") && !G.closest(".context-menu-content") && !G.closest(".hide-sign") && X, V = W && X && !G.closest(".minimap") && !G.closest(".minimap-viewport") && !G.closest(".virtual-scroll");
            if (W) {
                const { store: C } = l;
                C.dispatch(Sa());
            }
            if (X) {
                const { emitter: C } = l;
                C.emit(bu());
            }
            V && (s.grabCursor = "grabbing", qt.subscribe({
                next: g,
                complete: () => {
                    s.grabCursor = "grab";
                }
            }));
        };
        return () => I`
    <div
      class=${[
                B5,
                e.diff === at.insert ? "diff-viewer-insert" : "diff-viewer-delete"
            ]}
      style=${{ cursor: s.grabCursor }}
      ${De(n)}
      @contextmenu=${qn}
      @mousedown=${Z}
      @touchstart=${Z}
      @wheel=${b}
    >
      ${h}
      <${Ta} root=${n} canvas=${i} grabMove=${!0} />
      <${Km} />
      <${Ha} />
    </div>
  `;
    };
function Ve(e, t, n) {
    const i = [];
    return e.forEach((l, r) => {
        t ? n ? i.push(`${t}${l.name}${n}`) : i.push(`${t}${l.name}${t}`) : i.push(l.name), e.length !== r + 1 && i.push(", ");
    }), i.join("");
}
function wi(e) {
    let t = 0, n = 0;
    return e.forEach((i) => {
        t < i.name.length && (t = i.name.length), n < i.dataType.length && (n = i.dataType.length);
    }), {
        name: t,
        dataType: n
    };
}
function Mt(e) {
    const t = [];
    for (let n = 0; n < e; n++)
        t.push(" ");
    return t.join("");
}
function li(e) {
    return e.some(({ options: t }) => B(t, ie.primaryKey));
}
function ri(e) {
    return e.filter(({ options: t }) => B(t, ie.primaryKey));
}
function Ma(e) {
    return e.some(({ options: t }) => B(t, ie.unique));
}
function Fa(e) {
    return e.filter(({ options: t }) => B(t, ie.unique));
}
function Ie(e) {
    return E1[e] ?? "";
}
function xt(e, t) {
    const n = e.name.toLowerCase(), i = t.name.toLowerCase();
    return n < i ? -1 : n > i ? 1 : 0;
}
function Rt(e, t, n, i = 1) {
    let l = !0;
    for (const r of e)
        if (n === r.name && r.id !== t && n !== "") {
            l = !1;
            break;
        }
    return l ? n : Rt(e, t, n.replace(/[0-9]/g, "") + i, i + 1);
}
function ci(e) {
    switch (e) {
        case aa.ASC:
            return "ASC";
        case aa.DESC:
            return "DESC";
        default:
            return "";
    }
}
const O5 = N`
  display: flex;
  flex-direction: column;
  width: ${Cl}px;
  min-width: ${Cl}px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: var(--context-menu-background);
  padding: 14px 0;
`, Tm = N`
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: var(--context-menu-hover);
    color: var(--active);
    fill: var(--active);
  }
`, _s = N`
  display: flex;
  align-items: center;
  min-width: 14px;
  margin-right: 8px;

  &.diff-insert {
    fill: var(--diff-insert-foreground);
  }

  &.diff-delete {
    fill: var(--diff-delete-foreground);
  }

  &.diff-cross {
    fill: var(--diff-cross-foreground);
  }
`, A5 = N`
  ${Tm};
  height: 36px;
  min-height: 36px;
  padding: 0 12px;
`, Q5 = N`
  ${Tm};
  height: 24px;
  min-height: 24px;
  padding: 0 12px 0 24px;
`, qs = N`
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`, D5 = (e, t) => {
        const { prevApp: n, prevDiffMap: i, app: l, diffMap: r } = e, s = fa(n.store.state), m = fa(l.store.state), h = $(n.store.state.collections).collection("tableEntities"), p = $(n.store.state.collections).collection("tableColumnEntities"), b = $(l.store.state.collections).collection("tableEntities"), g = $(l.store.state.collections).collection("tableColumnEntities"), Z = [], y = [], G = [], X = [];
        Array.from(i).forEach(([T, [z, M]]) => {
            z === "tableEntities" ? Z.push(T) : G.push(T);
        }), Array.from(r).forEach(([T, [z, M]]) => {
            z === "tableEntities" ? y.push(T) : X.push(T);
        });
        const W = Be(Z), V = Be(y), C = Be(G), H = Be(X);
        p.selectByIds(G).forEach((T) => {
            W(T.tableId) || Z.push(T.tableId);
        }), g.selectByIds(X).forEach((T) => {
            V(T.tableId) || y.push(T.tableId);
        });
        const L = h.selectByIds(Z), E = b.selectByIds(y), J = [];
        L.forEach((T) => {
            const z = i.get(T.id), M = s.get(T.name), U = m.get(T.name), j = {
                diff: 0,
                prevId: T.id,
                id: U == null ? void 0 : U.table.id,
                name: T.name,
                columns: []
            };
            J.push(j), z && (j.diff |= at.delete, U && (j.diff |= at.insert)), p.selectByIds(T.columnIds.filter(C)).forEach((q) => {
                const ne = U == null ? void 0 : U.nameToColumnMap.get(q.name), te = {
                    diff: at.delete,
                    prevId: q.id,
                    id: ne == null ? void 0 : ne.id,
                    name: q.name
                };
                j.columns.push(te), ne && (te.diff |= at.insert);
            }), U && g.selectByIds(U.table.columnIds.filter(H)).forEach((q) => {
                if (M == null ? void 0 : M.nameToColumnMap.get(q.name))
                    return;
                const te = {
                    diff: at.insert,
                    id: q.id,
                    name: q.name
                };
                j.columns.push(te);
            });
        }), E.forEach((T) => {
            if (s.get(T.name))
                return;
            const M = {
                diff: at.insert,
                id: T.id,
                name: T.name,
                columns: []
            };
            J.push(M), g.selectByIds(T.columnIds.filter(H)).forEach((U) => {
                const j = {
                    diff: at.insert,
                    id: U.id,
                    name: U.name
                };
                M.columns.push(j);
            });
        }), J.sort(xt);
        const K = ({ store: T }, z) => {
            const { settings: { width: M, height: U, zoomLevel: j }, collections: q } = T.state, ne = $(q).collection("tableEntities").selectById(z);
            if (!ne)
                return;
            const { x: te, y: je } = ur({ x: ne.ui.x - Pd, y: ne.ui.y - Bd }, M, U, j);
            T.dispatch(Ri({
                scrollLeft: te * -1,
                scrollTop: je * -1
            }), Va(ne.id, !1));
        }, Y = (T) => {
            T.prevId && K(n, T.prevId), T.id && K(l, T.id);
        };
        return () => I`
    <div class=${O5}>
      ${J.map((T) => {
            const z = T.name.trim() ? T.name : "unnamed", M = B(T.diff, at.insert), U = B(T.diff, at.delete);
            return I`
          <div class=${A5} @click=${() => Y(T)}>
            <div class=${[_s, {
                    "diff-cross": M && U,
                    "diff-insert": M && !U,
                    "diff-delete": !M && U
                }]}>
              ${M && U ? I`<${P} prefix="mdi" name="plus-minus" size=${14} />` : M ? I`<${P} prefix="mdi" name="plus" size=${14} />` : U ? I`<${P} prefix="mdi" name="minus" size=${14} />` : I`<${P} name="table" size=${14} />`}
            </div>
            <span class=${qs}>${z}</span>
          </div>
          ${T.columns.map((q) => {
                    const ne = q.name.trim() ? q.name : "unnamed", te = B(q.diff, at.insert), je = B(q.diff, at.delete);
                    return I`
              <div class=${Q5} @click=${() => Y(T)}>
                <div class=${[_s, {
                            "diff-cross": te && je,
                            "diff-insert": te && !je,
                            "diff-delete": !te && je
                        }]}>
                  ${te && je ? I`<${P}
                        prefix="mdi"
                        name="plus-minus"
                        size=${14}
                      />` : te ? I`<${P} prefix="mdi" name="plus" size=${14} />` : je ? I`<${P} prefix="mdi" name="minus" size=${14} />` : null}
                </div>
                <span class=${qs}>${ne}</span>
              </div>
            `;
                })}
        `;
        })}
    </div>
  `;
    }, _5 = N`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--canvas-boundary-background);
`, q5 = N`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`, ed = N`
  display: flex;
  width: 50%;
  height: 100%;
  overflow: hidden;
  border-left: 1px solid var(--context-menu-border);
`, eW = 1, tW = (e, t) => {
        const n = e.app.value, i = () => !0, l = ao({ toWidth: n.toWidth }, { getReadonly: i }), r = ao({ toWidth: n.toWidth }, { getReadonly: i }), { addUnsubscribe: s } = Ge(), m = () => {
            const { store: y } = n, { editor: { viewport: G } } = y.state;
            return {
                width: (G.width - Cl) / 2 - eW,
                height: G.height
            };
        };
        l.store.dispatchSync(io(e.initialValue), rn(m())), r.store.dispatchSync(io(ii(n.store.state)), rn(m()));
        const [h, p] = M5(l.store.state, r.store.state), [b, g] = tm(), Z = () => {
            g(), e.onClose();
        };
        return n.emitter.emit(dn({
            close: b,
            message: I`
        <${hn}
          description="Diff Viewer..."
          action=${I`
            <${Ti} size="1" text="Close" .onClick=${Z} />
          `}
        />
      `
        })), Te(() => {
            s(n.shortcut$.subscribe(({ type: y }) => {
                y === D.stop && Z();
            }), Pe(n.store.state.editor.viewport).subscribe(() => {
                const y = m();
                l.store.dispatch(rn(y)), r.store.dispatch(rn(y));
            }), () => {
                lo(l), lo(r);
            });
        }), () => I`
    <div class=${_5}>
      <div class=${q5}>
        <${D5}
          prevApp=${l}
          prevDiffMap=${h}
          app=${r}
          diffMap=${p}
        />
        <div class=${ed}>
          <${Ds}
            app=${l}
            diff=${at.delete}
            diffMap=${h}
          />
        </div>
        <div class=${ed}>
          <${Ds} app=${r} diff=${at.insert} diffMap=${p} />
        </div>
      </div>
    </div>
  `;
    }, nW = N`
  position: absolute;
  stroke: var(--darg-select-border);
  fill: var(--darg-select-background);
  pointer-events: none;
`, iW = (e, t) => {
        const n = se(t), i = Se({ width: 0, height: 0, top: 0, left: 0 }), { addUnsubscribe: l } = Ge();
        return zi(() => {
            const { store: r } = n.value, s = e.root.value;
            l(Nu.subscribe(e.onDragSelectEnd), st(s, "mousemove").subscribe((m) => {
                m.preventDefault();
                const { settings: { width: h, height: p, zoomLevel: b, scrollLeft: g, scrollTop: Z } } = r.state, y = s.getBoundingClientRect(), G = m.clientX - y.x, X = m.clientY - y.y, W = {
                    x: e.x < G ? e.x : G,
                    y: e.y < X ? e.y : X
                }, V = {
                    x: e.x > G ? e.x : G,
                    y: e.y > X ? e.y : X
                };
                i.left = W.x, i.width = V.x - W.x, i.width < 0 && (i.width = 0), i.top = W.y, i.height = V.y - W.y, i.height < 0 && (i.height = 0);
                const C = Object.assign({}, W), H = Object.assign({}, V);
                C.x -= g, C.y -= Z, H.x -= g, H.y -= Z;
                const L = Wi(C, h, p, b), E = Wi(H, h, p, b);
                r.dispatch(P1({
                    ...L,
                    w: E.x - L.x,
                    h: E.y - L.y
                }));
            }));
        }), () => it`
    <svg
      class=${nW}
      style=${{
                top: `${i.top}px`,
                left: `${i.left}px`,
                width: `${i.width}px`,
                height: `${i.height}px`
            }}
    >
      <rect
        width=${i.width}
        height=${i.height}
        stroke-width="1"
        stroke-opacity="1"
        stroke-dasharray="3"
        fill-opacity="0.3"
      >
      </rect>
    </svg>
  `;
    }, oW = N`
  position: fixed;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  min-width: max-content;
  padding: 8px;
  background-color: var(--context-menu-background);
  border: 1px solid var(--context-menu-border);
`, Hm = (e, t) => () => I`
    <div
      class=${["context-menu-content", oW]}
      style=${{ left: `${e.x}px`, top: `${e.y}px` }}
      data-id=${e.id}
    >
      ${e.children}
    </div>
  `, Nm = Nd({
        show: !1,
        x: 0,
        y: 0,
        change$: new cn()
    }), zm = (e) => Hd(e, Nm);
function Ur(e) {
    const t = Se({
        show: !1,
        x: 0,
        y: 0,
        change$: new cn()
    });
    return {
        provider: bo(e, Nm, t),
        state: t,
        onContextmenu: (r) => {
            r.preventDefault(), t.x = r.clientX, t.y = r.clientY, t.show = !1, la(() => {
                t.show = !0;
            });
        },
        onMousedown: (r) => {
            const s = r.target;
            s && (s.closest(".context-menu-content") || (t.show = !1));
        }
    };
}
const aW = N`
  display: flex;
  align-items: center;
  padding: 0 12px;
  height: 32px;
  cursor: default;
  border-radius: 4px;

  &:hover {
    background-color: var(--context-menu-hover);
    color: var(--active);
    fill: var(--active);
  }

  &.selected {
    background-color: var(--context-menu-select);
  }
`, lW = (e, t) => {
        const n = zm(t), i = gt(), l = Ue(), r = Se({
            selected: !1,
            show: !1,
            x: 0,
            y: 0
        }), { addUnsubscribe: s } = Ge(), m = () => {
            var Z;
            const { width: h, x: p, y: b } = l.value.getBoundingClientRect();
            r.x = h + p, r.y = b - 8, r.show = !0;
            const g = (Z = l.value.parentElement) == null ? void 0 : Z.dataset.id;
            g && n.value.change$.next({ parentId: g, id: i });
        };
        return Te(() => {
            e.subChildren && s(n.value.change$.subscribe((h) => {
                var b;
                ((b = l.value.parentElement) == null ? void 0 : b.dataset.id) === h.parentId && i !== h.id && (r.show = !1), r.selected = i === h.parentId;
            }));
        }), () => I`
    <div
      ${De(l)}
      class=${[aW, { selected: r.selected }]}
      data-id=${i}
      @mouseenter=${m}
      @click=${e.onClick}
    >
      ${e.children}
    </div>
    ${e.subChildren && r.show ? I`
          <${Hm}
            id=${i}
            x=${r.x}
            y=${r.y}
            children=${e.subChildren}
          />
        ` : null}
  `;
    }, rW = (e, t) => {
        const n = zm(t);
        return () => n.value.show ? I`
          <${Hm}
            id="root"
            x=${n.value.x}
            y=${n.value.y}
            children=${e.children}
          />
        ` : null;
    }, cW = N`
  display: flex;
  align-items: center;
  width: 100%;
`, sW = N`
  display: flex;
  align-items: center;
  min-width: 14px;
  margin-right: 8px;
`, dW = N`
  display: flex;
  align-items: center;
  margin-left: auto;
  padding-left: 24px;
`, wm = (e, t) => () => I`
  <div class=${cW}>
    <div class=${sW}>${e.icon}</div>
    <div>${e.name}</div>
    ${e.right ? I`<div class=${dW}>${e.right}</div>` : null}
  </div>
`, _ = {
        Root: rW,
        Item: lW,
        Menu: wm
    }
const $m = [
    {
        name: "MSSQL",
        value: Fe.MSSQL
    },
    {
        name: "MariaDB",
        value: Fe.MariaDB
    },
    {
        name: "MySQL",
        value: Fe.MySQL
    },
    {
        name: "Oracle",
        value: Fe.Oracle
    },
    {
        name: "PostgreSQL",
        value: Fe.PostgreSQL
    },
    {
        name: "SQLite",
        value: Fe.SQLite
    }
];
function Um({ store: e }) {
    const { settings: t } = e.state;
    return $m.map((n) => ({
        checked: n.value === t.database,
        name: n.name,
        onClick: () => {
            e.dispatch(Qd({
                value: n.value
            }));
        }
    }));
}
const jm = [
    {
        iconName: "ZeroOne",
        name: "Zero One",
        keyBindingName: D.relationshipZeroOne,
        relationshipType: $e.ZeroOne
    },
    {
        iconName: "ZeroN",
        name: "Zero N",
        keyBindingName: D.relationshipZeroN,
        relationshipType: $e.ZeroN
    },
    {
        iconName: "OneOnly",
        name: "One Only",
        keyBindingName: D.relationshipOneOnly,
        relationshipType: $e.OneOnly
    },
    {
        iconName: "OneN",
        name: "One N",
        keyBindingName: D.relationshipOneN,
        relationshipType: $e.OneN
    }
];
function hW({ store: e, keyBindingMap: t }, n) {
    return jm.map((i) => {
        var l;
        return {
            iconName: i.iconName,
            name: i.name,
            shortcut: (l = t[i.keyBindingName][0]) == null ? void 0 : l.shortcut,
            onClick: () => {
                e.dispatch(mr(i.relationshipType)), n();
            }
        };
    });
}
function pW(e, t) {
    if (e.match(/^[a-z]+:\/\//i))
        return e;
    if (e.match(/^\/\//))
        return window.location.protocol + e;
    if (e.match(/^[a-z]+:/i))
        return e;
    const n = document.implementation.createHTMLDocument(), i = n.createElement("base"), l = n.createElement("a");
    return n.head.appendChild(i), n.body.appendChild(l), t && (i.href = t), l.href = e, l.href;
}
const bW = /* @__PURE__ */ (() => {
    let e = 0;
    const t = () => (
        // eslint-disable-next-line no-bitwise
        `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4)
    );
    return () => (e += 1, `u${t()}${e}`);
})();
function sn(e) {
    const t = [];
    for (let n = 0, i = e.length; n < i; n++)
        t.push(e[n]);
    return t;
}
function ga(e, t) {
    const i = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(t);
    return i ? parseFloat(i.replace("px", "")) : 0;
}
function fW(e) {
    const t = ga(e, "border-left-width"), n = ga(e, "border-right-width");
    return e.clientWidth + t + n;
}
function gW(e) {
    const t = ga(e, "border-top-width"), n = ga(e, "border-bottom-width");
    return e.clientHeight + t + n;
}
function Em(e, t = {}) {
    const n = t.width || fW(e), i = t.height || gW(e);
    return { width: n, height: i };
}
function yW() {
    let e, t;
    try {
        t = process;
    } catch {
    }
    const n = t && t.env ? t.env.devicePixelRatio : null;
    return n && (e = parseInt(n, 10), Number.isNaN(e) && (e = 1)), e || window.devicePixelRatio || 1;
}
const Yt = 16384;
function ZW(e) {
    (e.width > Yt || e.height > Yt) && (e.width > Yt && e.height > Yt ? e.width > e.height ? (e.height *= Yt / e.width, e.width = Yt) : (e.width *= Yt / e.height, e.height = Yt) : e.width > Yt ? (e.height *= Yt / e.width, e.width = Yt) : (e.width *= Yt / e.height, e.height = Yt));
}
function vW(e, t = {}) {
    return e.toBlob ? new Promise((n) => {
        e.toBlob(n, t.type ? t.type : "image/png", t.quality ? t.quality : 1);
    }) : new Promise((n) => {
        const i = window.atob(e.toDataURL(t.type ? t.type : void 0, t.quality ? t.quality : void 0).split(",")[1]), l = i.length, r = new Uint8Array(l);
        for (let s = 0; s < l; s += 1)
            r[s] = i.charCodeAt(s);
        n(new Blob([r], {
            type: t.type ? t.type : "image/png"
        }));
    });
}
function ya(e) {
    return new Promise((t, n) => {
        const i = new Image();
        i.decode = () => t(i), i.onload = () => t(i), i.onerror = n, i.crossOrigin = "anonymous", i.decoding = "async", i.src = e;
    });
}
async function xW(e) {
    return Promise.resolve().then(() => new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then((t) => `data:image/svg+xml;charset=utf-8,${t}`);
}
async function GW(e, t, n) {
    const i = "http://www.w3.org/2000/svg", l = document.createElementNS(i, "svg"), r = document.createElementNS(i, "foreignObject");
    return l.setAttribute("width", `${t}`), l.setAttribute("height", `${n}`), l.setAttribute("viewBox", `0 0 ${t} ${n}`), r.setAttribute("width", "100%"), r.setAttribute("height", "100%"), r.setAttribute("x", "0"), r.setAttribute("y", "0"), r.setAttribute("externalResourcesRequired", "true"), l.appendChild(r), r.appendChild(e), xW(l);
}
const St = (e, t) => {
    if (e instanceof t)
        return !0;
    const n = Object.getPrototypeOf(e);
    return n === null ? !1 : n.constructor.name === t.name || St(n, t);
};
function XW(e) {
    const t = e.getPropertyValue("content");
    return `${e.cssText} content: '${t.replace(/'|"/g, "")}';`;
}
function WW(e) {
    return sn(e).map((t) => {
        const n = e.getPropertyValue(t), i = e.getPropertyPriority(t);
        return `${t}: ${n}${i ? " !important" : ""};`;
    }).join(" ");
}
function VW(e, t, n) {
    const i = `.${e}:${t}`, l = n.cssText ? XW(n) : WW(n);
    return document.createTextNode(`${i}{${l}}`);
}
function td(e, t, n) {
    const i = window.getComputedStyle(e, n), l = i.getPropertyValue("content");
    if (l === "" || l === "none")
        return;
    const r = bW();
    try {
        t.className = `${t.className} ${r}`;
    } catch {
        return;
    }
    const s = document.createElement("style");
    s.appendChild(VW(r, n, i)), t.appendChild(s);
}
function IW(e, t) {
    td(e, t, ":before"), td(e, t, ":after");
}
const nd = "application/font-woff", id = "image/jpeg", kW = {
    woff: nd,
    woff2: nd,
    ttf: "application/font-truetype",
    eot: "application/vnd.ms-fontobject",
    png: "image/png",
    jpg: id,
    jpeg: id,
    gif: "image/gif",
    tiff: "image/tiff",
    svg: "image/svg+xml",
    webp: "image/webp"
};
function CW(e) {
    const t = /\.([^./]*?)$/g.exec(e);
    return t ? t[1] : "";
}
function jr(e) {
    const t = CW(e).toLowerCase();
    return kW[t] || "";
}
function SW(e) {
    return e.split(/,/)[1];
}
function Ql(e) {
    return e.search(/^(data:)/) !== -1;
}
function Pm(e, t) {
    return `data:${t};base64,${e}`;
}
async function Bm(e, t, n) {
    const i = await fetch(e, t);
    if (i.status === 404)
        throw new Error(`Resource "${i.url}" not found`);
    const l = await i.blob();
    return new Promise((r, s) => {
        const m = new FileReader();
        m.onerror = s, m.onloadend = () => {
            try {
                r(n({ res: i, result: m.result }));
            } catch (h) {
                s(h);
            }
        }, m.readAsDataURL(l);
    });
}
const yl = {};
function RW(e, t, n) {
    let i = e.replace(/\?.*/, "");
    return n && (i = e), /ttf|otf|eot|woff2?/i.test(i) && (i = i.replace(/.*\//, "")), t ? `[${t}]${i}` : i;
}
async function Er(e, t, n) {
    const i = RW(e, t, n.includeQueryParams);
    if (yl[i] != null)
        return yl[i];
    n.cacheBust && (e += (/\?/.test(e) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
    let l;
    try {
        const r = await Bm(e, n.fetchRequestInit, ({ res: s, result: m }) => (t || (t = s.headers.get("Content-Type") || ""), SW(m)));
        l = Pm(r, t);
    } catch (r) {
        l = n.imagePlaceholder || "";
        let s = `Failed to fetch resource: ${e}`;
        r && (s = typeof r == "string" ? r : r.message), s && console.warn(s);
    }
    return yl[i] = l, l;
}
async function LW(e) {
    const t = e.toDataURL();
    return t === "data:," ? e.cloneNode(!1) : ya(t);
}
async function YW(e, t) {
    if (e.currentSrc) {
        const r = document.createElement("canvas"), s = r.getContext("2d");
        r.width = e.clientWidth, r.height = e.clientHeight, s == null || s.drawImage(e, 0, 0, r.width, r.height);
        const m = r.toDataURL();
        return ya(m);
    }
    const n = e.poster, i = jr(n), l = await Er(n, i, t);
    return ya(l);
}
async function KW(e) {
    var t;
    try {
        if (!((t = e == null ? void 0 : e.contentDocument) === null || t === void 0) && t.body)
            return await $a(e.contentDocument.body, {}, !0);
    } catch {
    }
    return e.cloneNode(!1);
}
async function TW(e, t) {
    return St(e, HTMLCanvasElement) ? LW(e) : St(e, HTMLVideoElement) ? YW(e, t) : St(e, HTMLIFrameElement) ? KW(e) : e.cloneNode(!1);
}
const HW = (e) => e.tagName != null && e.tagName.toUpperCase() === "SLOT";
async function NW(e, t, n) {
    var i, l;
    let r = [];
    return HW(e) && e.assignedNodes ? r = sn(e.assignedNodes()) : St(e, HTMLIFrameElement) && (!((i = e.contentDocument) === null || i === void 0) && i.body) ? r = sn(e.contentDocument.body.childNodes) : r = sn(((l = e.shadowRoot) !== null && l !== void 0 ? l : e).childNodes), r.length === 0 || St(e, HTMLVideoElement) || await r.reduce((s, m) => s.then(() => $a(m, n)).then((h) => {
        h && t.appendChild(h);
    }), Promise.resolve()), t;
}
function zW(e, t) {
    const n = t.style;
    if (!n)
        return;
    const i = window.getComputedStyle(e);
    i.cssText ? (n.cssText = i.cssText, n.transformOrigin = i.transformOrigin) : sn(i).forEach((l) => {
        let r = i.getPropertyValue(l);
        l === "font-size" && r.endsWith("px") && (r = `${Math.floor(parseFloat(r.substring(0, r.length - 2))) - 0.1}px`), St(e, HTMLIFrameElement) && l === "display" && r === "inline" && (r = "block"), l === "d" && t.getAttribute("d") && (r = `path(${t.getAttribute("d")})`), n.setProperty(l, r, i.getPropertyPriority(l));
    });
}
function wW(e, t) {
    St(e, HTMLTextAreaElement) && (t.innerHTML = e.value), St(e, HTMLInputElement) && t.setAttribute("value", e.value);
}
function JW(e, t) {
    if (St(e, HTMLSelectElement)) {
        const n = t, i = Array.from(n.children).find((l) => e.value === l.getAttribute("value"));
        i && i.setAttribute("selected", "");
    }
}
function MW(e, t) {
    return St(t, Element) && (zW(e, t), IW(e, t), wW(e, t), JW(e, t)), t;
}
async function FW(e, t) {
    const n = e.querySelectorAll ? e.querySelectorAll("use") : [];
    if (n.length === 0)
        return e;
    const i = {};
    for (let r = 0; r < n.length; r++) {
        const m = n[r].getAttribute("xlink:href");
        if (m) {
            const h = e.querySelector(m), p = document.querySelector(m);
            !h && p && !i[m] && (i[m] = await $a(p, t, !0));
        }
    }
    const l = Object.values(i);
    if (l.length) {
        const r = "http://www.w3.org/1999/xhtml", s = document.createElementNS(r, "svg");
        s.setAttribute("xmlns", r), s.style.position = "absolute", s.style.width = "0", s.style.height = "0", s.style.overflow = "hidden", s.style.display = "none";
        const m = document.createElementNS(r, "defs");
        s.appendChild(m);
        for (let h = 0; h < l.length; h++)
            m.appendChild(l[h]);
        e.appendChild(s);
    }
    return e;
}
async function $a(e, t, n) {
    return !n && t.filter && !t.filter(e) ? null : Promise.resolve(e).then((i) => TW(i, t)).then((i) => NW(e, i, t)).then((i) => MW(e, i)).then((i) => FW(i, t));
}
const Om = /url\((['"]?)([^'"]+?)\1\)/g, $W = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, UW = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function jW(e) {
    const t = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
    return new RegExp(`(url\\(['"]?)(${t})(['"]?\\))`, "g");
}
function EW(e) {
    const t = [];
    return e.replace(Om, (n, i, l) => (t.push(l), n)), t.filter((n) => !Ql(n));
}
async function PW(e, t, n, i, l) {
    try {
        const r = n ? pW(t, n) : t, s = jr(t);
        let m;
        if (l) {
            const h = await l(r);
            m = Pm(h, s);
        } else
            m = await Er(r, s, i);
        return e.replace(jW(t), `$1${m}$3`);
    } catch {
    }
    return e;
}
function BW(e, { preferredFontFormat: t }) {
    return t ? e.replace(UW, (n) => {
        for (; ;) {
            const [i, , l] = $W.exec(n) || [];
            if (!l)
                return "";
            if (l === t)
                return `src: ${i};`;
        }
    }) : e;
}
function Am(e) {
    return e.search(Om) !== -1;
}
async function Qm(e, t, n) {
    if (!Am(e))
        return e;
    const i = BW(e, n);
    return EW(i).reduce((r, s) => r.then((m) => PW(m, s, t, n)), Promise.resolve(i));
}
async function Uo(e, t, n) {
    var i;
    const l = (i = t.style) === null || i === void 0 ? void 0 : i.getPropertyValue(e);
    if (l) {
        const r = await Qm(l, null, n);
        return t.style.setProperty(e, r, t.style.getPropertyPriority(e)), !0;
    }
    return !1;
}
async function OW(e, t) {
    await Uo("background", e, t) || await Uo("background-image", e, t), await Uo("mask", e, t) || await Uo("mask-image", e, t);
}
async function AW(e, t) {
    const n = St(e, HTMLImageElement);
    if (!(n && !Ql(e.src)) && !(St(e, SVGImageElement) && !Ql(e.href.baseVal)))
        return;
    const i = n ? e.src : e.href.baseVal, l = await Er(i, jr(i), t);
    await new Promise((r, s) => {
        e.onload = r, e.onerror = s;
        const m = e;
        m.decode && (m.decode = r), m.loading === "lazy" && (m.loading = "eager"), n ? (e.srcset = "", e.src = l) : e.href.baseVal = l;
    });
}
async function QW(e, t) {
    const i = sn(e.childNodes).map((l) => Dm(l, t));
    await Promise.all(i).then(() => e);
}
async function Dm(e, t) {
    St(e, Element) && (await OW(e, t), await AW(e, t), await QW(e, t));
}
function DW(e, t) {
    const { style: n } = e;
    t.backgroundColor && (n.backgroundColor = t.backgroundColor), t.width && (n.width = `${t.width}px`), t.height && (n.height = `${t.height}px`);
    const i = t.style;
    return i != null && Object.keys(i).forEach((l) => {
        n[l] = i[l];
    }), e;
}
const od = {};
async function ad(e) {
    let t = od[e];
    if (t != null)
        return t;
    const i = await (await fetch(e)).text();
    return t = { url: e, cssText: i }, od[e] = t, t;
}
async function ld(e, t) {
    let n = e.cssText;
    const i = /url\(["']?([^"')]+)["']?\)/g, r = (n.match(/url\([^)]+\)/g) || []).map(async (s) => {
        let m = s.replace(i, "$1");
        return m.startsWith("https://") || (m = new URL(m, e.url).href), Bm(m, t.fetchRequestInit, ({ result: h }) => (n = n.replace(s, `url(${h})`), [s, h]));
    });
    return Promise.all(r).then(() => n);
}
function rd(e) {
    if (e == null)
        return [];
    const t = [], n = /(\/\*[\s\S]*?\*\/)/gi;
    let i = e.replace(n, "");
    const l = new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})", "gi");
    for (; ;) {
        const h = l.exec(i);
        if (h === null)
            break;
        t.push(h[0]);
    }
    i = i.replace(l, "");
    const r = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi, s = "((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})", m = new RegExp(s, "gi");
    for (; ;) {
        let h = r.exec(i);
        if (h === null) {
            if (h = m.exec(i), h === null)
                break;
            r.lastIndex = m.lastIndex;
        } else
            m.lastIndex = r.lastIndex;
        t.push(h[0]);
    }
    return t;
}
async function _W(e, t) {
    const n = [], i = [];
    return e.forEach((l) => {
        if ("cssRules" in l)
            try {
                sn(l.cssRules || []).forEach((r, s) => {
                    if (r.type === CSSRule.IMPORT_RULE) {
                        let m = s + 1;
                        const h = r.href, p = ad(h).then((b) => ld(b, t)).then((b) => rd(b).forEach((g) => {
                            try {
                                l.insertRule(g, g.startsWith("@import") ? m += 1 : l.cssRules.length);
                            } catch (Z) {
                                console.error("Error inserting rule from remote css", {
                                    rule: g,
                                    error: Z
                                });
                            }
                        })).catch((b) => {
                            console.error("Error loading remote css", b.toString());
                        });
                        i.push(p);
                    }
                });
            } catch (r) {
                const s = e.find((m) => m.href == null) || document.styleSheets[0];
                l.href != null && i.push(ad(l.href).then((m) => ld(m, t)).then((m) => rd(m).forEach((h) => {
                    s.insertRule(h, l.cssRules.length);
                })).catch((m) => {
                    console.error("Error loading remote stylesheet", m);
                })), console.error("Error inlining remote css file", r);
            }
    }), Promise.all(i).then(() => (e.forEach((l) => {
        if ("cssRules" in l)
            try {
                sn(l.cssRules || []).forEach((r) => {
                    n.push(r);
                });
            } catch (r) {
                console.error(`Error while reading CSS rules from ${l.href}`, r);
            }
    }), n));
}
function qW(e) {
    return e.filter((t) => t.type === CSSRule.FONT_FACE_RULE).filter((t) => Am(t.style.getPropertyValue("src")));
}
async function eV(e, t) {
    if (e.ownerDocument == null)
        throw new Error("Provided element is not within a Document");
    const n = sn(e.ownerDocument.styleSheets), i = await _W(n, t);
    return qW(i);
}
async function tV(e, t) {
    const n = await eV(e, t);
    return (await Promise.all(n.map((l) => {
        const r = l.parentStyleSheet ? l.parentStyleSheet.href : null;
        return Qm(l.cssText, r, t);
    }))).join(`
`);
}
async function nV(e, t) {
    const n = t.fontEmbedCSS != null ? t.fontEmbedCSS : t.skipFonts ? null : await tV(e, t);
    if (n) {
        const i = document.createElement("style"), l = document.createTextNode(n);
        i.appendChild(l), e.firstChild ? e.insertBefore(i, e.firstChild) : e.appendChild(i);
    }
}
async function iV(e, t = {}) {
    const { width: n, height: i } = Em(e, t), l = await $a(e, t, !0);
    return await nV(l, t), await Dm(l, t), DW(l, t), await GW(l, n, i);
}
async function oV(e, t = {}) {
    const { width: n, height: i } = Em(e, t), l = await iV(e, t), r = await ya(l), s = document.createElement("canvas"), m = s.getContext("2d"), h = t.pixelRatio || yW(), p = t.canvasWidth || n, b = t.canvasHeight || i;
    return s.width = p * h, s.height = b * h, t.skipAutoScale || ZW(s), s.style.width = `${p}`, s.style.height = `${b}`, t.backgroundColor && (m.fillStyle = t.backgroundColor, m.fillRect(0, 0, s.width, s.height)), m.drawImage(r, 0, 0, s.width, s.height), s;
}
async function aV(e, t = {}) {
    const n = await oV(e, t);
    return await vW(n);
}
let Dl = null;
function JS(e) {
    Dl = e;
}
function Pr(e, t) {
    (Dl || lV)(e, t);
}
function lV(e, t) {
    const n = document.createElement("a");
    n.href = URL.createObjectURL(e), n.download = t.fileName, n.click();
}
function Br(e, t) {
    const n = B1.now().toFormat("yyyy-MM-dd'T'HH_mm_ss");
    return t != null && t.trim() ? `${t}-${n}${e}` : `unnamed-${n}${e}`;
}
function _m(e, t) {
    Pr(new Blob([e], { type: "application/json" }), {
        fileName: Br(".erd.json", t)
    });
}
function qm(e, t) {
    Pr(new Blob([e]), {
        fileName: Br(".sql", t)
    });
}
function rV(e, t) {
    aV(e).then((n) => {
        n && Pr(n, {
            fileName: Br(".png", t)
        });
    });
}
function cV(e) {
    const { settings: { bracketType: t }, doc: { tableIds: n, relationshipIds: i, indexIds: l }, collections: r } = e, s = [], m = [], h = [""], p = Ie(t), b = $(r).collection("tableEntities").selectByIds(n).sort(xt), g = $(r).collection("relationshipEntities").selectByIds(i), Z = $(r).collection("indexEntities").selectByIds(l);
    return b.forEach((y) => {
        e0(e, { table: y, buffer: h }), h.push("");
        const G = $(r).collection("tableColumnEntities").selectByIds(y.columnIds);
        Ma(G) && Fa(G).forEach((W) => {
            h.push(`ALTER TABLE ${p}${y.name}${p}`), h.push(`  ADD CONSTRAINT ${p}UQ_${W.name}${p} UNIQUE (${p}${W.name}${p});`), h.push("");
        });
    }), g.forEach((y) => {
        sV(e, {
            relationship: y,
            buffer: h,
            fkNames: s
        }), h.push("");
    }), Z.forEach((y) => {
        t0(e, {
            index: y,
            buffer: h,
            indexNames: m
        }), h.push("");
    }), h.join(`
`);
}
function e0(e, { buffer: t, table: n }) {
    const { settings: { bracketType: i }, collections: l } = e, r = Ie(i), s = $(l).collection("tableColumnEntities").selectByIds(n.columnIds);
    t.push(`CREATE TABLE ${r}${n.name}${r}`), t.push("(");
    const m = li(s), h = wi(s);
    if (s.forEach((p, b) => {
        m ? cd(e, {
            column: p,
            isComma: !0,
            spaceSize: h,
            buffer: t
        }) : cd(e, {
            column: p,
            isComma: s.length !== b + 1,
            spaceSize: h,
            buffer: t
        });
    }), m) {
        const p = ri(s);
        t.push(`  PRIMARY KEY (${Ve(p, r)})`);
    }
    n.comment.trim() === "" ? t.push(");") : t.push(`) COMMENT '${n.comment}';`);
}
function cd({ settings: { bracketType: e } }, { buffer: t, column: n, isComma: i, spaceSize: l }) {
    const r = Ie(e), s = [];
    s.push(`  ${r}${n.name}${r}` + Mt(l.name - n.name.length)), s.push(`${n.dataType}` + Mt(l.dataType - n.dataType.length)), s.push(`${B(n.options, ie.notNull) ? "NOT NULL" : "NULL    "}`), B(n.options, ie.autoIncrement) ? s.push("AUTO_INCREMENT") : n.default.trim() !== "" && s.push(`DEFAULT ${n.default}`), n.comment.trim() !== "" && s.push(`COMMENT '${n.comment}'`), t.push(s.join(" ") + `${i ? "," : ""}`);
}
function sV({ settings: { bracketType: e }, collections: t }, { buffer: n, relationship: i, fkNames: l }) {
    const r = Ie(e), s = $(t).collection("tableEntities"), m = $(t).collection("tableColumnEntities"), h = s.selectById(i.start.tableId), p = s.selectById(i.end.tableId);
    if (h && p) {
        n.push(`ALTER TABLE ${r}${p.name}${r}`);
        let b = `FK_${h.name}_TO_${p.name}`;
        b = Rt(l, "", b), l.push({
            id: gt(),
            name: b
        }), n.push(`  ADD CONSTRAINT ${r}${b}${r}`);
        const g = {
            start: [],
            end: []
        };
        i.end.columnIds.forEach((Z) => {
            const y = m.selectById(Z);
            y && g.end.push(y);
        }), i.start.columnIds.forEach((Z) => {
            const y = m.selectById(Z);
            y && g.start.push(y);
        }), n.push(`    FOREIGN KEY (${Ve(g.end, r)})`), n.push(`    REFERENCES ${r}${h.name}${r} (${Ve(g.start, r)});`);
    }
}
function t0({ settings: { bracketType: e }, collections: t }, { buffer: n, index: i, indexNames: l }) {
    const r = Ie(e), s = $(t).collection("tableEntities").selectById(i.tableId);
    if (!s)
        return;
    const m = $(t).collection("indexColumnEntities").selectByIds(i.indexColumnIds).map((h) => {
        const p = $(t).collection("tableColumnEntities").selectById(h.columnId);
        return p ? {
            name: `${r}${p.name}${r} ${ci(h.orderType)}`
        } : null;
    }).filter((h) => h !== null);
    if (m.length !== 0) {
        let h = i.name;
        i.name.trim() === "" && (h = `IDX_${s.name}`, h = Rt(l, "", h), l.push({
            id: gt(),
            name: h
        })), i.unique ? n.push(`CREATE UNIQUE INDEX ${r}${h}${r}`) : n.push(`CREATE INDEX ${r}${h}${r}`), n.push(`  ON ${r}${s.name}${r} (${Ve(m)});`);
    }
}
function dV(e) {
    const { settings: { bracketType: t }, doc: { tableIds: n, relationshipIds: i, indexIds: l }, collections: r } = e, s = [], m = [], h = [""], p = Ie(t), b = $(r).collection("tableEntities").selectByIds(n).sort(xt), g = $(r).collection("relationshipEntities").selectByIds(i), Z = $(r).collection("indexEntities").selectByIds(l);
    return b.forEach((y) => {
        n0(e, { table: y, buffer: h }), h.push("");
        const G = $(r).collection("tableColumnEntities").selectByIds(y.columnIds);
        Ma(G) && Fa(G).forEach((W) => {
            h.push(`ALTER TABLE ${p}${y.name}${p}`), h.push(`  ADD CONSTRAINT ${p}UQ_${W.name}${p} UNIQUE (${p}${W.name}${p})
GO`), h.push("");
        }), uV(e, { table: y, buffer: h });
    }), g.forEach((y) => {
        mV(e, {
            relationship: y,
            buffer: h,
            fkNames: s
        }), h.push("");
    }), Z.forEach((y) => {
        i0(e, {
            index: y,
            buffer: h,
            indexNames: m
        }), h.push("");
    }), h.join(`
`);
}
function n0(e, { buffer: t, table: n }) {
    const { settings: { bracketType: i }, collections: l } = e, r = Ie(i), s = $(l).collection("tableColumnEntities").selectByIds(n.columnIds);
    t.push(`CREATE TABLE ${r}${n.name}${r}`), t.push("(");
    const m = li(s), h = wi(s);
    if (s.forEach((p, b) => {
        m ? sd(e, {
            column: p,
            isComma: !0,
            spaceSize: h,
            buffer: t
        }) : sd(e, {
            column: p,
            isComma: s.length !== b + 1,
            spaceSize: h,
            buffer: t
        });
    }), m) {
        const p = ri(s);
        t.push(`  CONSTRAINT ${r}PK_${n.name}${r} PRIMARY KEY (${Ve(p, r)})`);
    }
    t.push(`)
GO`);
}
function sd({ settings: { bracketType: e } }, { buffer: t, column: n, isComma: i, spaceSize: l }) {
    const r = Ie(e), s = [];
    s.push(`  ${r}${n.name}${r}` + Mt(l.name - n.name.length)), s.push(`${n.dataType}` + Mt(l.dataType - n.dataType.length)), B(n.options, ie.notNull) && s.push("NOT NULL"), B(n.options, ie.autoIncrement) ? s.push("IDENTITY(1,1)") : n.default.trim() !== "" && s.push(`DEFAULT ${n.default}`), t.push(s.join(" ") + `${i ? "," : ""}`);
}
function uV({ collections: e }, { table: t, buffer: n }) {
    t.comment.trim() !== "" && (n.push("EXECUTE sys.sp_addextendedproperty 'MS_Description',"), n.push(`  '${t.comment}', 'user', dbo, 'table', '${t.name}'
GO`), n.push("")), $(e).collection("tableColumnEntities").selectByIds(t.columnIds).forEach((i) => {
        i.comment.trim() !== "" && (n.push("EXECUTE sys.sp_addextendedproperty 'MS_Description',"), n.push(`  '${i.comment}', 'user', dbo, 'table', '${t.name}', 'column', '${i.name}'
GO`), n.push(""));
    });
}
function mV({ settings: { bracketType: e }, collections: t }, { buffer: n, relationship: i, fkNames: l }) {
    const r = Ie(e), s = $(t).collection("tableEntities"), m = $(t).collection("tableColumnEntities"), h = s.selectById(i.start.tableId), p = s.selectById(i.end.tableId);
    if (h && p) {
        n.push(`ALTER TABLE ${r}${p.name}${r}`);
        let b = `FK_${h.name}_TO_${p.name}`;
        b = Rt(l, "", b), l.push({
            id: gt(),
            name: b
        }), n.push(`  ADD CONSTRAINT ${r}${b}${r}`);
        const g = {
            start: [],
            end: []
        };
        i.end.columnIds.forEach((Z) => {
            const y = m.selectById(Z);
            y && g.end.push(y);
        }), i.start.columnIds.forEach((Z) => {
            const y = m.selectById(Z);
            y && g.start.push(y);
        }), n.push(`    FOREIGN KEY (${Ve(g.end, r)})`), n.push(`    REFERENCES ${r}${h.name}${r} (${Ve(g.start, r)})
GO`);
    }
}
function i0({ settings: { bracketType: e }, collections: t }, { buffer: n, index: i, indexNames: l }) {
    const r = Ie(e), s = $(t).collection("tableEntities").selectById(i.tableId);
    if (!s)
        return;
    const m = $(t).collection("indexColumnEntities").selectByIds(i.indexColumnIds).map((h) => {
        const p = $(t).collection("tableColumnEntities").selectById(h.columnId);
        return p ? {
            name: `${r}${p.name}${r} ${ci(h.orderType)}`
        } : null;
    }).filter((h) => h !== null);
    if (m.length !== 0) {
        let h = i.name;
        i.name.trim() === "" && (h = `IDX_${s.name}`, h = Rt(l, "", h), l.push({
            id: gt(),
            name: h
        })), i.unique ? n.push(`CREATE UNIQUE INDEX ${r}${h}${r}`) : n.push(`CREATE INDEX ${r}${h}${r}`), n.push(`  ON ${r}${s.name}${r} (${Ve(m)})
GO`);
    }
}
function hV(e) {
    const { settings: { bracketType: t }, doc: { tableIds: n, relationshipIds: i, indexIds: l }, collections: r } = e, s = [], m = [], h = [""], p = Ie(t), b = $(r).collection("tableEntities").selectByIds(n).sort(xt), g = $(r).collection("relationshipEntities").selectByIds(i), Z = $(r).collection("indexEntities").selectByIds(l);
    return b.forEach((y) => {
        o0(e, { table: y, buffer: h }), h.push("");
        const G = $(r).collection("tableColumnEntities").selectByIds(y.columnIds);
        Ma(G) && Fa(G).forEach((W) => {
            h.push(`ALTER TABLE ${p}${y.name}${p}`), h.push(`  ADD CONSTRAINT ${p}UQ_${W.name}${p} UNIQUE (${p}${W.name}${p});`), h.push("");
        });
    }), g.forEach((y) => {
        pV(e, {
            relationship: y,
            buffer: h,
            fkNames: s
        }), h.push("");
    }), Z.forEach((y) => {
        a0(e, {
            index: y,
            buffer: h,
            indexNames: m
        }), h.push("");
    }), h.join(`
`);
}
function o0(e, { buffer: t, table: n }) {
    const { settings: { bracketType: i }, collections: l } = e, r = Ie(i), s = $(l).collection("tableColumnEntities").selectByIds(n.columnIds);
    t.push(`CREATE TABLE ${r}${n.name}${r}`), t.push("(");
    const m = li(s), h = wi(s);
    if (s.forEach((p, b) => {
        m ? dd(e, {
            column: p,
            isComma: !0,
            spaceSize: h,
            buffer: t
        }) : dd(e, {
            column: p,
            isComma: s.length !== b + 1,
            spaceSize: h,
            buffer: t
        });
    }), m) {
        const p = ri(s);
        t.push(`  PRIMARY KEY (${Ve(p, r)})`);
    }
    n.comment.trim() === "" ? t.push(");") : t.push(`) COMMENT '${n.comment}';`);
}
function dd({ settings: { bracketType: e } }, { buffer: t, column: n, isComma: i, spaceSize: l }) {
    const r = Ie(e), s = [];
    s.push(`  ${r}${n.name}${r}` + Mt(l.name - n.name.length)), s.push(`${n.dataType}` + Mt(l.dataType - n.dataType.length)), s.push(`${B(n.options, ie.notNull) ? "NOT NULL" : "NULL    "}`), B(n.options, ie.autoIncrement) ? s.push("AUTO_INCREMENT") : n.default.trim() !== "" && s.push(`DEFAULT ${n.default}`), n.comment.trim() !== "" && s.push(`COMMENT '${n.comment}'`), t.push(s.join(" ") + `${i ? "," : ""}`);
}
function pV({ settings: { bracketType: e }, collections: t }, { buffer: n, relationship: i, fkNames: l }) {
    const r = Ie(e), s = $(t).collection("tableEntities"), m = $(t).collection("tableColumnEntities"), h = s.selectById(i.start.tableId), p = s.selectById(i.end.tableId);
    if (h && p) {
        n.push(`ALTER TABLE ${r}${p.name}${r}`);
        let b = `FK_${h.name}_TO_${p.name}`;
        b = Rt(l, "", b), l.push({
            id: gt(),
            name: b
        }), n.push(`  ADD CONSTRAINT ${r}${b}${r}`);
        const g = {
            start: [],
            end: []
        };
        i.end.columnIds.forEach((Z) => {
            const y = m.selectById(Z);
            y && g.end.push(y);
        }), i.start.columnIds.forEach((Z) => {
            const y = m.selectById(Z);
            y && g.start.push(y);
        }), n.push(`    FOREIGN KEY (${Ve(g.end, r)})`), n.push(`    REFERENCES ${r}${h.name}${r} (${Ve(g.start, r)});`);
    }
}
function a0({ settings: { bracketType: e }, collections: t }, { buffer: n, index: i, indexNames: l }) {
    const r = Ie(e), s = $(t).collection("tableEntities").selectById(i.tableId);
    if (!s)
        return;
    const m = $(t).collection("indexColumnEntities").selectByIds(i.indexColumnIds).map((h) => {
        const p = $(t).collection("tableColumnEntities").selectById(h.columnId);
        return p ? {
            name: `${r}${p.name}${r} ${ci(h.orderType)}`
        } : null;
    }).filter((h) => h !== null);
    if (m.length !== 0) {
        let h = i.name;
        i.name.trim() === "" && (h = `IDX_${s.name}`, h = Rt(l, "", h), l.push({
            id: gt(),
            name: h
        })), i.unique ? n.push(`CREATE UNIQUE INDEX ${r}${h}${r}`) : n.push(`CREATE INDEX ${r}${h}${r}`), n.push(`  ON ${r}${s.name}${r} (${Ve(m)});`);
    }
}
function bV(e) {
    const { settings: { bracketType: t }, doc: { tableIds: n, relationshipIds: i, indexIds: l }, collections: r } = e, s = [], m = [], h = [], p = [], b = [""], g = Ie(t), Z = $(r).collection("tableEntities").selectByIds(n).sort(xt), y = $(r).collection("relationshipEntities").selectByIds(i), G = $(r).collection("indexEntities").selectByIds(l);
    return Z.forEach((X) => {
        l0(e, { table: X, buffer: b }), b.push("");
        const W = $(r).collection("tableColumnEntities").selectByIds(X.columnIds);
        Ma(W) && Fa(W).forEach((C) => {
            b.push(`ALTER TABLE ${g}${X.name}${g}`), b.push(`  ADD CONSTRAINT ${g}UQ_${C.name}${g} UNIQUE (${g}${C.name}${g});`), b.push("");
        }), W.forEach((V) => {
            if (B(V.options, ie.autoIncrement)) {
                let C = `SEQ_${X.name}`;
                C = Rt(m, "", C), m.push({
                    id: gt(),
                    name: C
                }), b.push(`CREATE SEQUENCE ${C}`), b.push("START WITH 1"), b.push("INCREMENT BY 1;"), b.push("");
                let H = `SEQ_TRG_${X.name}`;
                H = Rt(m, "", H), h.push({
                    id: gt(),
                    name: H
                }), b.push(`CREATE OR REPLACE TRIGGER ${H}`), b.push(`BEFORE INSERT ON ${X.name}`), b.push("REFERENCING NEW AS NEW FOR EACH ROW"), b.push("BEGIN"), b.push(`  SELECT ${C}.NEXTVAL`), b.push(`  INTO: NEW.${V.name}`), b.push("  FROM DUAL;"), b.push("END;"), b.push("");
            }
        }), fV(e, { table: X, buffer: b });
    }), y.forEach((X) => {
        gV(e, {
            relationship: X,
            buffer: b,
            fkNames: s
        }), b.push("");
    }), G.forEach((X) => {
        r0(e, {
            index: X,
            buffer: b,
            indexNames: p
        }), b.push("");
    }), b.join(`
`);
}
function l0(e, { buffer: t, table: n }) {
    const { settings: { bracketType: i }, collections: l } = e, r = Ie(i), s = $(l).collection("tableColumnEntities").selectByIds(n.columnIds);
    t.push(`CREATE TABLE ${r}${n.name}${r}`), t.push("(");
    const m = li(s), h = wi(s);
    if (s.forEach((p, b) => {
        m ? ud(e, {
            column: p,
            isComma: !0,
            spaceSize: h,
            buffer: t
        }) : ud(e, {
            column: p,
            isComma: s.length !== b + 1,
            spaceSize: h,
            buffer: t
        });
    }), m) {
        const p = ri(s);
        t.push(`  CONSTRAINT ${r}PK_${n.name}${r} PRIMARY KEY (${Ve(p, r)})`);
    }
    t.push(");");
}
function ud({ settings: { bracketType: e } }, { buffer: t, column: n, isComma: i, spaceSize: l }) {
    const r = Ie(e), s = [];
    s.push(`  ${r}${n.name}${r}` + Mt(l.name - n.name.length)), s.push(`${n.dataType}` + Mt(l.dataType - n.dataType.length)), n.default.trim() !== "" && s.push(`DEFAULT ${n.default}`), B(n.options, ie.notNull) && s.push("NOT NULL"), t.push(s.join(" ") + `${i ? "," : ""}`);
}
function fV({ settings: { bracketType: e }, collections: t }, { table: n, buffer: i }) {
    const l = Ie(e);
    n.comment.trim() !== "" && (i.push(`COMMENT ON TABLE ${l}${n.name}${l} IS '${n.comment}';`), i.push("")), $(t).collection("tableColumnEntities").selectByIds(n.columnIds).forEach((r) => {
        r.comment.trim() !== "" && (i.push(`COMMENT ON COLUMN ${l}${n.name}${l}.${l}${r.name}${l} IS '${r.comment}';`), i.push(""));
    });
}
function gV({ settings: { bracketType: e }, collections: t }, { buffer: n, relationship: i, fkNames: l }) {
    const r = Ie(e), s = $(t).collection("tableEntities"), m = $(t).collection("tableColumnEntities"), h = s.selectById(i.start.tableId), p = s.selectById(i.end.tableId);
    if (h && p) {
        n.push(`ALTER TABLE ${r}${p.name}${r}`);
        let b = `FK_${h.name}_TO_${p.name}`;
        b = Rt(l, "", b), l.push({
            id: gt(),
            name: b
        }), n.push(`  ADD CONSTRAINT ${r}${b}${r}`);
        const g = {
            start: [],
            end: []
        };
        i.end.columnIds.forEach((Z) => {
            const y = m.selectById(Z);
            y && g.end.push(y);
        }), i.start.columnIds.forEach((Z) => {
            const y = m.selectById(Z);
            y && g.start.push(y);
        }), n.push(`    FOREIGN KEY (${Ve(g.end, r)})`), n.push(`    REFERENCES ${r}${h.name}${r} (${Ve(g.start, r)});`);
    }
}
function r0({ settings: { bracketType: e }, collections: t }, { buffer: n, index: i, indexNames: l }) {
    const r = Ie(e), s = $(t).collection("tableEntities").selectById(i.tableId);
    if (!s)
        return;
    const m = $(t).collection("indexColumnEntities").selectByIds(i.indexColumnIds).map((h) => {
        const p = $(t).collection("tableColumnEntities").selectById(h.columnId);
        return p ? {
            name: `${r}${p.name}${r} ${ci(h.orderType)}`
        } : null;
    }).filter((h) => h !== null);
    if (m.length !== 0) {
        let h = i.name;
        i.name.trim() === "" && (h = `IDX_${s.name}`, h = Rt(l, "", h), l.push({
            id: gt(),
            name: h
        })), i.unique ? n.push(`CREATE UNIQUE INDEX ${r}${h}${r}`) : n.push(`CREATE INDEX ${r}${h}${r}`), n.push(`  ON ${r}${s.name}${r} (${Ve(m)});`);
    }
}
function yV(e) {
    const { doc: { tableIds: t, relationshipIds: n, indexIds: i }, collections: l } = e, r = [], s = [], m = [""], h = $(l).collection("tableEntities").selectByIds(t).sort(xt), p = $(l).collection("relationshipEntities").selectByIds(n), b = $(l).collection("indexEntities").selectByIds(i);
    return h.forEach((g) => {
        c0(e, { table: g, buffer: m }), m.push(""), ZV(e, { table: g, buffer: m });
    }), p.forEach((g) => {
        vV(e, {
            relationship: g,
            buffer: m,
            fkNames: r
        }), m.push("");
    }), b.forEach((g) => {
        s0(e, {
            index: g,
            buffer: m,
            indexNames: s
        }), m.push("");
    }), m.join(`
`);
}
function c0(e, { buffer: t, table: n }) {
    const { settings: { bracketType: i }, collections: l } = e, r = Ie(i), s = $(l).collection("tableColumnEntities").selectByIds(n.columnIds);
    t.push(`CREATE TABLE ${r}${n.name}${r}`), t.push("(");
    const m = li(s), h = wi(s);
    if (s.forEach((p, b) => {
        m ? md(e, {
            column: p,
            isComma: !0,
            spaceSize: h,
            buffer: t
        }) : md(e, {
            column: p,
            isComma: s.length !== b + 1,
            spaceSize: h,
            buffer: t
        });
    }), m) {
        const p = ri(s);
        t.push(`  PRIMARY KEY (${Ve(p, r)})`);
    }
    t.push(");");
}
function md({ settings: { bracketType: e } }, { buffer: t, column: n, isComma: i, spaceSize: l }) {
    const r = Ie(e), s = [];
    s.push(`  ${r}${n.name}${r}` + Mt(l.name - n.name.length)), s.push(`${n.dataType}` + Mt(l.dataType - n.dataType.length)), B(n.options, ie.notNull) && s.push("NOT NULL"), B(n.options, ie.autoIncrement) ? s.push("GENERATED ALWAYS AS IDENTITY") : n.default.trim() !== "" && s.push(`DEFAULT ${n.default}`), B(n.options, ie.unique) && s.push("UNIQUE"), t.push(s.join(" ") + `${i ? "," : ""}`);
}
function ZV({ settings: { bracketType: e }, collections: t }, { buffer: n, table: i }) {
    const l = Ie(e);
    i.comment.trim() !== "" && (n.push(`COMMENT ON TABLE ${l}${i.name}${l} IS '${i.comment}';`), n.push("")), $(t).collection("tableColumnEntities").selectByIds(i.columnIds).forEach((r) => {
        r.comment.trim() !== "" && (n.push(`COMMENT ON COLUMN ${l}${i.name}${l}.${l}${r.name}${l} IS '${r.comment}';`), n.push(""));
    });
}
function vV({ settings: { bracketType: e }, collections: t }, { buffer: n, relationship: i, fkNames: l }) {
    const r = Ie(e), s = $(t).collection("tableEntities"), m = $(t).collection("tableColumnEntities"), h = s.selectById(i.start.tableId), p = s.selectById(i.end.tableId);
    if (h && p) {
        n.push(`ALTER TABLE ${r}${p.name}${r}`);
        let b = `FK_${h.name}_TO_${p.name}`;
        b = Rt(l, "", b), l.push({
            id: gt(),
            name: b
        }), n.push(`  ADD CONSTRAINT ${r}${b}${r}`);
        const g = {
            start: [],
            end: []
        };
        i.end.columnIds.forEach((Z) => {
            const y = m.selectById(Z);
            y && g.end.push(y);
        }), i.start.columnIds.forEach((Z) => {
            const y = m.selectById(Z);
            y && g.start.push(y);
        }), n.push(`    FOREIGN KEY (${Ve(g.end, r)})`), n.push(`    REFERENCES ${r}${h.name}${r} (${Ve(g.start, r)});`);
    }
}
function s0({ settings: { bracketType: e }, collections: t }, { buffer: n, index: i, indexNames: l }) {
    const r = Ie(e), s = $(t).collection("tableEntities").selectById(i.tableId);
    if (!s)
        return;
    const m = $(t).collection("indexColumnEntities").selectByIds(i.indexColumnIds).map((h) => {
        const p = $(t).collection("tableColumnEntities").selectById(h.columnId);
        return p ? {
            name: `${r}${p.name}${r} ${ci(h.orderType)}`
        } : null;
    }).filter((h) => h !== null);
    if (m.length !== 0) {
        let h = i.name;
        i.name.trim() === "" && (h = `IDX_${s.name}`, h = Rt(l, "", h), l.push({
            id: gt(),
            name: h
        })), i.unique ? n.push(`CREATE UNIQUE INDEX ${r}${h}${r}`) : n.push(`CREATE INDEX ${r}${h}${r}`), n.push(`  ON ${r}${s.name}${r} (${Ve(m)});`);
    }
}
function xV(e) {
    const { doc: { tableIds: t, indexIds: n }, collections: i } = e, l = [], r = [""], s = $(i).collection("tableEntities").selectByIds(t).sort(xt), m = $(i).collection("indexEntities").selectByIds(n);
    return s.forEach((h) => {
        d0(e, { table: h, buffer: r }), r.push("");
    }), m.forEach((h) => {
        u0(e, {
            index: h,
            buffer: r,
            indexNames: l
        }), r.push("");
    }), r.join(`
`);
}
function d0(e, { buffer: t, table: n }) {
    const { settings: { bracketType: i }, doc: { relationshipIds: l }, collections: r } = e, s = Ie(i), m = $(r).collection("tableEntities"), h = $(r).collection("tableColumnEntities"), p = h.selectByIds(n.columnIds), b = $(r).collection("relationshipEntities").selectByIds(l).filter(({ end: y }) => y.tableId === n.id);
    n.comment.trim() !== "" && t.push(`-- ${n.comment}`), t.push(`CREATE TABLE ${s}${n.name}${s}`), t.push("(");
    const g = li(p), Z = wi(p);
    if (p.forEach((y, G) => {
        g ? hd(e, {
            column: y,
            isComma: !0,
            spaceSize: Z,
            buffer: t
        }) : hd(e, {
            column: y,
            isComma: p.length !== G + 1,
            spaceSize: Z,
            buffer: t
        });
    }), g) {
        const y = ri(p);
        if (b.length !== 0)
            if (y.length === 1) {
                const G = B(y[0].options, ie.autoIncrement) ? " AUTOINCREMENT" : "";
                t.push(`  PRIMARY KEY (${Ve(y, s)}${G}),`);
            } else
                t.push(`  PRIMARY KEY (${Ve(y, s)}),`);
        else if (y.length === 1) {
            const G = B(y[0].options, ie.autoIncrement) ? " AUTOINCREMENT" : "";
            t.push(`  PRIMARY KEY (${Ve(y, s)}${G})`);
        } else
            t.push(`  PRIMARY KEY (${Ve(y, s)})`);
    }
    b.forEach((y, G) => {
        const X = m.selectById(y.start.tableId), W = m.selectById(y.end.tableId);
        if (X && W) {
            const V = {
                start: [],
                end: []
            };
            y.end.columnIds.forEach((C) => {
                const H = h.selectById(C);
                H && V.end.push(H);
            }), y.start.columnIds.forEach((C) => {
                const H = h.selectById(C);
                H && V.start.push(H);
            }), b.length - 1 > G ? t.push(`  FOREIGN KEY (${Ve(V.end, s)}) REFERENCES ${s}${X.name}${s} (${Ve(V.start, s)}),`) : t.push(`  FOREIGN KEY (${Ve(V.end, s)}) REFERENCES ${s}${X.name}${s} (${Ve(V.start, s)})`);
        }
    }), t.push(");");
}
function hd({ settings: { bracketType: e } }, { buffer: t, column: n, isComma: i, spaceSize: l }) {
    const r = Ie(e), s = [];
    n.comment.trim() !== "" && t.push(`  -- ${n.comment}`), s.push(`  ${r}${n.name}${r}` + Mt(l.name - n.name.length)), s.push(`${n.dataType}` + Mt(l.dataType - n.dataType.length)), s.push(`${B(n.options, ie.notNull) ? "NOT NULL" : "NULL    "}`), B(n.options, ie.unique) && s.push("UNIQUE"), !B(n.options, ie.autoIncrement) && n.default.trim() !== "" && s.push(`DEFAULT ${n.default}`), t.push(s.join(" ") + `${i ? "," : ""}`);
}
function u0({ settings: { bracketType: e }, collections: t }, { buffer: n, index: i, indexNames: l }) {
    const r = Ie(e), s = $(t).collection("tableEntities").selectById(i.tableId);
    if (!s)
        return;
    const m = $(t).collection("indexColumnEntities").selectByIds(i.indexColumnIds).map((h) => {
        const p = $(t).collection("tableColumnEntities").selectById(h.columnId);
        return p ? {
            name: `${r}${p.name}${r} ${ci(h.orderType)}`
        } : null;
    }).filter((h) => h !== null);
    if (m.length !== 0) {
        let h = i.name;
        i.name.trim() === "" && (h = `IDX_${s.name}`, h = Rt(l, "", h), l.push({
            id: gt(),
            name: h
        })), i.unique ? n.push(`CREATE UNIQUE INDEX ${r}${h}${r}`) : n.push(`CREATE INDEX ${r}${h}${r}`), n.push(`  ON ${r}${s.name}${r} (${Ve(m)});`);
    }
}
function Ua(e, t) {
    switch (t || e.settings.database) {
        case Fe.MariaDB:
            return cV(e);
        case Fe.MSSQL:
            return dV(e);
        case Fe.MySQL:
            return hV(e);
        case Fe.Oracle:
            return bV(e);
        case Fe.PostgreSQL:
            return yV(e);
        case Fe.SQLite:
            return xV(e);
    }
    return "";
}
function GV(e, t) {
    const { settings: n, doc: { indexIds: i }, collections: l } = e, r = [""], s = n.database, m = [], h = $(l).collection("indexEntities").selectByIds(i).filter((p) => p.tableId === t.id);
    switch (s) {
        case Fe.MariaDB:
            e0(e, { buffer: r, table: t }), r.push(""), h.forEach((p) => {
                t0(e, {
                    index: p,
                    buffer: r,
                    indexNames: m
                }), r.push("");
            });
            break;
        case Fe.MSSQL:
            n0(e, { buffer: r, table: t }), r.push(""), h.forEach((p) => {
                i0(e, {
                    index: p,
                    buffer: r,
                    indexNames: m
                }), r.push("");
            });
            break;
        case Fe.MySQL:
            o0(e, { buffer: r, table: t }), r.push(""), h.forEach((p) => {
                a0(e, {
                    index: p,
                    buffer: r,
                    indexNames: m
                }), r.push("");
            });
            break;
        case Fe.Oracle:
            l0(e, { buffer: r, table: t }), r.push(""), h.forEach((p) => {
                r0(e, {
                    index: p,
                    buffer: r,
                    indexNames: m
                }), r.push("");
            });
            break;
        case Fe.PostgreSQL:
            c0(e, { buffer: r, table: t }), r.push(""), h.forEach((p) => {
                s0(e, {
                    index: p,
                    buffer: r,
                    indexNames: m
                }), r.push("");
            });
            break;
        case Fe.SQLite:
            d0(e, { buffer: r, table: t }), r.push(""), h.forEach((p) => {
                u0(e, {
                    index: p,
                    buffer: r,
                    indexNames: m
                }), r.push("");
            });
            break;
    }
    return r.join(`
`);
}
function XV(e, t, n) {
    const { store: i } = e, l = i.state.settings.databaseName;
    return [
        {
            icon: {
                prefix: "mdi",
                name: "code-json"
            },
            name: "json",
            onClick: () => {
                t(), _m(ii(i.state), l);
            }
        },
        {
            icon: {
                prefix: "mdi",
                name: "database-export"
            },
            name: "Schema SQL",
            onClick: () => {
                t(), qm(Ua(i.state), l);
            }
        },
        {
            icon: {
                prefix: "fas",
                name: "file-image"
            },
            name: "png",
            onClick: () => {
                t(), rV(n, l);
            }
        }
    ];
}
function WV(e, t) {
    return [
        {
            icon: {
                prefix: "mdi",
                name: "code-json"
            },
            name: "json",
            onClick: () => {
                Mm(e), t();
            }
        },
        {
            icon: {
                prefix: "mdi",
                name: "database-import"
            },
            name: "Schema SQL",
            onClick: () => {
                Fm(e), t();
            }
        }
    ];
}
const VV = [
    {
        iconName: "ZeroOne",
        name: "Zero One",
        relationshipType: $e.ZeroOne
    },
    {
        iconName: "ZeroN",
        name: "Zero N",
        relationshipType: $e.ZeroN
    },
    {
        iconName: "OneOnly",
        name: "One Only",
        relationshipType: $e.OneOnly
    },
    {
        iconName: "OneN",
        name: "One N",
        relationshipType: $e.OneN
    }
];
function IV({ store: e }, t) {
    if (!t)
        return [];
    const { collections: n } = e.state, i = $(n).collection("relationshipEntities").selectById(t);
    return i ? VV.map((l) => ({
        checked: l.relationshipType === i.relationshipType,
        iconName: l.iconName,
        name: l.name,
        onClick: () => {
            e.dispatch(O1({
                id: t,
                value: l.relationshipType
            }));
        }
    })) : [];
}
const kV = [
    {
        name: "Table Comment",
        show: We.tableComment
    },
    {
        name: "Column Comment",
        show: We.columnComment
    },
    {
        name: "DataType",
        show: We.columnDataType
    },
    {
        name: "Default",
        show: We.columnDefault
    },
    {
        name: "Not Null",
        show: We.columnNotNull
    },
    {
        name: "Unique",
        show: We.columnUnique
    },
    {
        name: "Auto Increment",
        show: We.columnAutoIncrement
    },
    {
        name: "Relationship",
        show: We.relationship
    }
];
function CV({ store: e }) {
    const { settings: t } = e.state;
    return kV.map((n) => {
        const i = B(t.show, n.show);
        return {
            checked: i,
            name: n.name,
            onClick: () => {
                e.dispatch(A1({
                    show: n.show,
                    value: !i
                }));
            }
        };
    });
}
const Gi = {
    ERD: "ERD",
    table: "table",
    relationship: "relationship"
}, SV = (e, t) => {
    const n = se(t), i = I`<${P} name="chevron-right" size=${14} />`, { addUnsubscribe: l } = Ge(), r = () => {
        const { store: y } = n.value;
        y.dispatch(hr()), e.onClose();
    }, m = () => {
        const { store: y } = n.value;
        y.dispatch(ct({ [ce.automaticTablePlacement]: !0 })), e.onClose();
    }, p = () => {
        if (!e.relationshipId)
            return;
        const { store: y } = n.value;
        y.dispatch(Q1({
            id: e.relationshipId
        })), e.onClose();
    }, b = () => {
        if (!e.tableId)
            return;
        const { store: y } = n.value, { editor: G } = y.state;
        !G.focusTable || !G.focusTable.columnId || (y.dispatch(Dd(G.focusTable.tableId, G.focusTable.columnId)), e.onClose());
    }, g = () => {
        if (!e.tableId)
            return;
        const { store: y, emitter: G } = n.value;
        G.emit(fu({ tableId: e.tableId })), y.dispatch(ct({ [ce.tableProperties]: !0 })), e.onClose();
    }, Z = (y) => {
        if (!e.tableId)
            return;
        const { store: G, emitter: X } = n.value, { collections: W } = G.state, V = $(W).collection("tableEntities").selectById(e.tableId);
        V && (X.emit(La({
            x: y.clientX,
            y: y.clientY,
            color: V.ui.color
        })), e.onClose());
    };
    return Te(() => {
        const { shortcut$: y } = n.value;
        l(y.subscribe(({ type: G }) => {
            G === D.stop && e.onClose();
        }));
    }), () => {
        var G, X, W, V;
        const { keyBindingMap: y } = n.value;
        return I`
      <${_.Root}
        children=${e.type === Gi.table ? I`
              <${_.Item}
                .onClick=${b}
                children=${I`
                  <${_.Menu}
                    icon=${I`<${P} name="key" size=${14} />`}
                    name="Primary Key"
                    right=${I`
                      <${Gn}
                        shortcut=${(G = y.primaryKey[0]) == null ? void 0 : G.shortcut}
                      />
                    `}
                  />
                `}
              />
              <${_.Item}
                .onClick=${g}
                children=${I`
                  <${_.Menu}
                    icon=${I`
                      <${P} prefix="mdi" name="table-cog" size=${14} />
                    `}
                    name="Table Properties"
                    right=${I`
                      <${Gn}
                        shortcut=${(X = y.tableProperties[0]) == null ? void 0 : X.shortcut}
                      />
                    `}
                  />
                `}
              />
              <${_.Item}
                .onClick=${Z}
                children=${I`
                  <${_.Menu}
                    icon=${I`<${P} name="palette" size=${14} />`}
                    name="Color"
                  />
                `}
              />
            ` : e.type === Gi.relationship ? I`
                <${_.Item}
                  children=${I`
                    <${_.Menu}
                      icon=${I`
                        <${P} prefix="mdi" name="vector-line" size=${14} />
                      `}
                      name="Relationship Type"
                      right=${i}
                    />
                  `}
                  subChildren=${I`${IV(n.value, e.relationshipId).map((C) => I`
                      <${_.Item}
                        .onClick=${C.onClick}
                        children=${I`
                          <${_.Menu}
                            icon=${C.checked ? I`<${P} name="check" size=${14} />` : null}
                            name=${I`
                              <${_.Menu}
                                icon=${I` <${P}
                                  prefix="base64"
                                  name=${C.iconName}
                                  size=${14}
                                />`}
                                name=${C.name}
                              />
                            `}
                          />
                        `}
                      />
                    `)}`}
                />
                <${_.Item}
                  .onClick=${p}
                  children=${I`<${_.Menu} name="Delete" />`}
                />
              ` : I`
                <${_.Item}
                  .onClick=${r}
                  children=${I`
                    <${_.Menu}
                      icon=${I`<${P} name="table" size=${14} />`}
                      name="New Table"
                      right=${I`
                        <${Gn}
                          shortcut=${(W = y.addTable[0]) == null ? void 0 : W.shortcut}
                        />
                      `}
                    />
                  `}
                />
                <${_.Item}
                  children=${I`
                    <${_.Menu}
                      icon=${I`
                        <${P} prefix="mdi" name="vector-line" size=${14} />
                      `}
                      name="Relationship"
                      right=${i}
                    />
                  `}
                  subChildren=${I`${hW(n.value, e.onClose).map((C) => I`
                      <${_.Item}
                        .onClick=${C.onClick}
                        children=${I`
                          <${_.Menu}
                            icon=${I`
                              <${P}
                                prefix="base64"
                                name=${C.iconName}
                                size=${14}
                              />
                            `}
                            name=${C.name}
                            right=${I`
                              <${Gn} shortcut=${C.shortcut} />
                            `}
                          />
                        `}
                      />
                    `)}`}
                />
                <${_.Item}
                  children=${I`
                    <${_.Menu}
                      icon=${I`<${P} name="file-export" size=${14} />`}
                      name="Export"
                      right=${i}
                    />
                  `}
                  subChildren=${I`${XV(n.value, e.onClose, e.canvas.value).map((C) => I`
                      <${_.Item}
                        .onClick=${C.onClick}
                        children=${I`
                          <${_.Menu}
                            icon=${I`<${P}
                              prefix=${C.icon.prefix}
                              name=${C.icon.name}
                              size=${14}
                            />`}
                            name=${C.name}
                          />
                        `}
                      />
                    `)}`}
                />
                <${_.Item}
                  .onClick=${m}
                  children=${I`
                    <${_.Menu}
                      icon=${I`<${P}
                        prefix="mdi"
                        name="atom"
                        size=${14}
                      />`}
                      name="Automatic Table Placement"
                    />
                  `}
                />
              `}
      />
    `;
    };
}, pd = N`
  position: absolute;
  cursor: pointer;

  &:hover {
    fill: var(--active);
  }
`, Jn = 45, fe = {
        left: "left",
        right: "right",
        top: "top",
        bottom: "bottom",
        lt: "lt",
        rt: "rt",
        lb: "lb",
        rb: "rb"
    }, RV = {
        [fe.lt]: 3 * Jn,
        [fe.rt]: 5 * Jn,
        [fe.lb]: Jn,
        [fe.rb]: 7 * Jn,
        [fe.left]: 2 * Jn,
        [fe.right]: 6 * Jn,
        [fe.top]: 4 * Jn,
        [fe.bottom]: 0
    }, LV = (e, t) => {
        const n = se(t), { addUnsubscribe: i } = Ge(), l = Se({
            scrollLeft: 0,
            scrollTop: 0
        }), r = ({ x: b, y: g }) => {
            const { store: Z } = n.value, { settings: { width: y, height: G } } = Z.state;
            return b < 0 && g < 0 ? fe.lt : b > y && g < 0 ? fe.rt : b < 0 && g > G ? fe.lb : b > y && g > G ? fe.rb : b < 0 ? fe.left : b > y ? fe.right : g < 0 ? fe.top : (g > G, fe.bottom);
        }, s = (b) => {
            const { store: g } = n.value, { settings: { width: Z, height: y, zoomLevel: G } } = g.state, { scrollLeft: X, scrollTop: W } = l, { x: V, y: C } = ur(b, Z, y, G), H = `${C + W}px`, L = `${V + X}px`, E = r(b), J = RV[E];
            switch (E) {
                case fe.lt:
                    return [{ left: "0", top: "0" }, J];
                case fe.rt:
                    return [{ right: "0", top: "0" }, J];
                case fe.lb:
                    return [{ left: "0", bottom: "0" }, J];
                case fe.rb:
                    return [{ right: "0", bottom: "0" }, J];
                case fe.left:
                    return [{ left: "0", top: H }, J];
                case fe.right:
                    return [{ right: "0", top: H }, J];
                case fe.top:
                    return [{ left: L, top: "0" }, J];
                case fe.bottom:
                    return [{ left: L, bottom: "0" }, J];
            }
        }, m = (b) => {
            const g = e.root.value, { store: Z } = n.value, { settings: { width: y, height: G, zoomLevel: X, scrollLeft: W, scrollTop: V } } = Z.state, C = g.getBoundingClientRect(), H = {
                x: b.clientX - C.x - W,
                y: b.clientY - C.y - V
            };
            return Wi(H, y, G, X);
        }, h = (b, g) => {
            const { store: Z } = n.value, y = r(g.ui), { x: G, y: X } = m(b);
            let W = 0, V = 0;
            switch (y) {
                case fe.rt:
                    W = Qt(g, Z.state).width;
                    break;
                case fe.lb:
                    V = an(g);
                    break;
                case fe.rb:
                    W = Qt(g, Z.state).width, V = an(g);
                    break;
                case fe.right:
                    W = Qt(g, Z.state).width;
                    break;
                case fe.bottom:
                    V = an(g);
                    break;
            }
            Z.dispatch(_d({ id: g.id, x: G - W, y: X - V }), Va(g.id, un(b)));
        }, p = (b, g) => {
            const { store: Z } = n.value, y = r(g.ui), { x: G, y: X } = m(b);
            let W = 0, V = 0;
            switch (y) {
                case fe.rt:
                    W = gi(g);
                    break;
                case fe.lb:
                    V = yi(g);
                    break;
                case fe.rb:
                    W = gi(g), V = yi(g);
                    break;
                case fe.right:
                    W = gi(g);
                    break;
                case fe.bottom:
                    V = yi(g);
                    break;
            }
            Z.dispatch(D1({ id: g.id, x: G - W, y: X - V }), Jd(g.id, un(b)));
        };
        return Te(() => {
            const { store: b } = n.value, { settings: g } = b.state, Z = new ht((y) => Pe(g).subscribe((G) => {
                (G === "scrollLeft" || G === "scrollTop") && y.next({
                    scrollLeft: g.scrollLeft,
                    scrollTop: g.scrollTop
                });
            }));
            i(Z.pipe(lr(100)).subscribe(({ scrollLeft: y, scrollTop: G }) => {
                l.scrollLeft = y, l.scrollTop = G;
            }));
        }), () => {
            const { store: b } = n.value, { doc: { tableIds: g, memoIds: Z }, settings: { zoomLevel: y, width: G, height: X }, collections: W } = b.state, V = Wi({ x: 0, y: 0 }, G, X, y), C = Wi({ x: G, y: X }, G, X, y), H = {
                ...V,
                w: C.x - V.x,
                h: C.y - V.y
            }, L = $(W).collection("tableEntities").selectByIds(g).filter((J) => !ds(H, {
                x: J.ui.x,
                y: J.ui.y,
                w: measures.table.width,
                h: an(J)
            })), E = $(W).collection("memoEntities").selectByIds(Z).filter((J) => !ds(H, {
                x: J.ui.x,
                y: J.ui.y,
                w: gi(J),
                h: yi(J)
            }));
            return L.length === 0 && E.length === 0 ? null : I`
      ${et(L, (J) => J.id, (J) => {
                const [K, Y] = s(J.ui), T = ln(J.name.trim());
                return I`
            <div
              class=${["hide-sign", pd]}
              title=${T ? "unnamed" : J.name}
              style=${K}
              @click=${(z) => h(z, J)}
            >
              <${P} name="location-dot" rotate=${Y} />
            </div>
          `;
            })}
      ${et(E, (J) => J.id, (J) => {
                const [K, Y] = s(J.ui);
                return I`
            <div
              class=${["hide-sign", pd]}
              title="Memo"
              style=${K}
              @click=${(T) => p(T, J)}
            >
              <${P} name="location-dot" rotate=${Y} />
            </div>
          `;
            })}
    `;
        };
    }, ki = (e, t) => {
        const n = Ue();
        return Te(() => {
            const i = n.value;
            !e.autofocus || !i || ro(i);
        }), () => I`
    <input
      ${De(n)}
      class=${e.class}
      style=${{ width: e.width ? `${e.width}px` : "" }}
      ...${ca({
            title: e.title,
            placeholder: e.placeholder
        })}
      type="text"
      spellcheck="false"
      ?readonly=${e.readonly}
      ?disabled=${e.disabled}
      .value=${e.value ?? ""}
      @input=${e.numberOnly ? fy : null}
      @input=${e.onInput}
      @change=${e.onChange}
      @blur=${e.onBlur}
      @keyup=${e.onKeyup}
      @keydown=${e.onKeydown}
    />
  `;
    }, YV = N`
  display: flex;
  width: 100%;
  height: ${Ia}px;
  align-items: center;
  fill: transparent;
  color: transparent;
  padding: 0 ${ni}px;

  &:hover {
    fill: var(--foreground);
    color: var(--foreground);
    background-color: var(--column-hover);
  }

  &.selected {
    background-color: var(--column-select);
  }

  & > .column-col {
    padding: ${Si}px ${Wa}px ${Si}px 0;
  }
`, bd = N`
  width: 100%;
`, KV = N`
  cursor: pointer;
`, TV = N`
  cursor: pointer;
  margin-left: auto;

  &:hover {
    fill: var(--active);
    color: var(--active);
  }
`, HV = (e, t) => {
        const n = se(t), i = () => {
            e.onSelect(e.index);
        }, l = (m) => {
            m.stopPropagation(), e.onSelect(null);
            const { store: h } = n.value;
            h.dispatch(An(_1({ id: e.index.id })));
        }, r = () => {
            const { store: m } = n.value;
            m.dispatch(An(q1(e.index.id)));
        }, s = (m) => {
            const h = m.target;
            if (!h)
                return;
            const { store: p } = n.value;
            p.dispatch(An(ef({
                id: e.index.id,
                tableId: e.index.tableId,
                value: h.value
            })));
        };
        return () => {
            const { index: m } = e;
            return I`
      <div
        class=${[YV, { selected: e.selected }]}
        @click=${i}
      >
        <div class="column-col" @click=${r}>
          <${kn}
            class=${KV}
            checked=${m.unique}
            width=${ka}
            text="UQ"
            title="Unique"
          />
        </div>
        <div class=${["column-col", bd]}>
          <${ki}
            class=${bd}
            placeholder="name"
            value=${m.name}
            .onInput=${s}
          />
        </div>
        <${P}
          class=${TV}
          size=${12}
          name="xmark"
          title="Remove"
          .onClick=${l}
        />
      </div>
    `;
        };
    }, NV = N`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 240px;
  overflow: auto;
`, zV = (e, t) => {
        const n = se(t), i = (r, s) => {
            const { store: m } = n.value, { settings: h } = m.state;
            return h.columnOrder.map((p) => {
                let b = null;
                switch (p) {
                    case ge.columnName:
                        b = I`
              <div class="column-col">
                <${Ct}
                  placeholder="column"
                  width=${s.name}
                  value=${r.name}
                />
              </div>
            `;
                        break;
                    case ge.columnDefault:
                        b = B(h.show, We.columnDefault) ? I`
                  <div class="column-col">
                    <${Ct}
                      placeholder="default"
                      width=${s.default}
                      value=${r.default}
                    />
                  </div>
                ` : null;
                        break;
                    case ge.columnComment:
                        b = B(h.show, We.columnComment) ? I`
                  <div class="column-col">
                    <${Ct}
                      placeholder="comment"
                      width=${s.comment}
                      value=${r.comment}
                    />
                  </div>
                ` : null;
                        break;
                    case ge.columnDataType:
                        b = B(h.show, We.columnDataType) ? I`
                  <div class="column-col">
                    <${kr}
                      tableId=${r.tableId}
                      columnId=${r.id}
                      width=${s.dataType}
                      value=${r.dataType}
                    />
                  </div>
                ` : null;
                        break;
                    case ge.columnNotNull:
                        b = B(h.show, We.columnNotNull) ? I`
                  <div class="column-col">
                    <${Sr} options=${r.options} />
                  </div>
                ` : null;
                        break;
                    case ge.columnUnique:
                        b = B(h.show, We.columnUnique) ? I`
                  <div class="column-col">
                    <${kn}
                      checked=${B(r.options, ie.unique)}
                      width=${ka}
                      text="UQ"
                      title="Unique"
                    />
                  </div>
                ` : null;
                        break;
                    case ge.columnAutoIncrement:
                        b = B(h.show, We.columnAutoIncrement) ? I`
                  <div class="column-col">
                    <${kn}
                      checked=${B(r.options, ie.autoIncrement)}
                      width=${cr}
                      text="AI"
                      title="Auto Increment"
                    />
                  </div>
                ` : null;
                        break;
                }
                return {
                    columnType: p,
                    template: b
                };
            }).filter(({ template: p }) => !!p);
        }, l = (r, s) => {
            const m = r.target;
            if (!m)
                return;
            const { store: h } = n.value, p = m.checked ? tf : nf;
            h.dispatch(An(p(e.index.id, s.id)));
        };
        return () => {
            const { tableId: r, index: s } = e, { store: m } = n.value, { collections: h } = m.state, p = $(h).collection("tableEntities").selectById(r);
            if (!p)
                return null;
            const b = $(h).collection("tableColumnEntities").selectByIds(p.columnIds), g = Qt(p, m.state), Z = $(h).collection("indexColumnEntities").selectByIds((s == null ? void 0 : s.indexColumnIds) ?? []).map((G) => G.columnId), y = Be(Z);
            return I`
      <div class=${["scrollbar", NV]}>
        ${et(b, (G) => G.id, (G) => I`
            <div class=${["column-row", Rr]}>
              <div class="column-col">
                <input
                  type="checkbox"
                  ?disabled=${!s}
                  ?checked=${y(G.id)}
                  @change=${(X) => l(X, G)}
                />
              </div>
              <${Cr} keys=${G.ui.keys} />
              ${et(i(G, g), ({ columnType: X }) => X, ({ template: X }) => X)}
            </div>
          `)}
      </div>
    `;
        };
    }, wV = N`
  padding-top: 12px;

  .index-column-order-move {
    transition: transform 0.3s;
  }
`, Zl = N`
  display: flex;
  width: 100%;
  height: ${Ia}px;
  align-items: center;
  color: var(--active);
  fill: var(--active);
  padding: 0 ${ni}px;
  cursor: move;

  &:hover {
    background-color: var(--column-hover);
  }

  & > .column-col {
    padding: ${Si}px ${Wa}px ${Si}px 0;
  }

  &.none-hover {
    background-color: transparent;
  }

  &.dragging {
    opacity: 0.5;
  }
`, JV = N`
  cursor: pointer;
`, MV = (e, t) => {
        const n = se(t), i = Ue(), l = new Ka(i, `.${Zl}`, "index-column-order-move"), r = (p) => {
            switch (p) {
                case aa.ASC:
                    return "Ascending";
                case aa.DESC:
                    return "Descending";
                default:
                    return "";
            }
        }, s = (p, b) => {
            const { store: g } = n.value;
            p !== b && (l.snapshot(), g.dispatch(An(af(p, b))));
        }, m = (p) => {
            var G;
            const b = i.value, g = p.target;
            if (!b || !g)
                return;
            const Z = (G = g.dataset) == null ? void 0 : G.id;
            if (!Z)
                return;
            const y = Array.from(b.querySelectorAll(`.${Zl}`));
            y.forEach((X) => X.classList.add("none-hover")), g.classList.add("dragging"), Lr(y, (X) => X.dataset.id).subscribe({
                next: (X) => {
                    s(Z, X);
                },
                complete: () => {
                    g.classList.remove("dragging"), y.forEach((X) => X.classList.remove("none-hover"));
                }
            });
        }, h = (p) => {
            const { store: b } = n.value;
            b.dispatch(An(of(p.id)));
        };
        return Ca(() => l.play()), () => {
            const { store: p } = n.value, { collections: b } = p.state, g = $(b).collection("indexColumnEntities").selectByIds(e.index.indexColumnIds).map((Z) => ({
                ...Z,
                column: $(b).collection("tableColumnEntities").selectById(Z.columnId)
            }));
            return I`
      <div
        class=${wV}
        ${De(i)}
        @dragenter=${qn}
        @dragover=${qn}
      >
        ${et(g, (Z) => Z.id, (Z) => {
                var y;
                return I`
            <div
              class=${Zl}
              draggable="true"
              data-id=${Z.id}
              @dragstart=${m}
            >
              <${P} class=${"column-col"} name="bars" size=${14} />
              <div
                class="column-col"
                @click=${() => h(Z)}
              >
                <${kn}
                  class=${JV}
                  checked=${!0}
                  width=${40}
                  text=${ci(Z.orderType)}
                  title=${r(Z.orderType)}
                />
              </div>
              <div class="column-col">${(y = Z.column) == null ? void 0 : y.name}</div>
            </div>
          `;
            })}
      </div>
    `;
        };
    }, FV = N`
  width: 30%;
  min-width: 240px;
  height: 100%;
  padding-right: 12px;
`, $V = N`
  width: 70%;
  min-width: 560px;
  height: 100%;
`, UV = N`
  display: flex;
  width: 100%;
  height: ${Ia}px;
  align-items: center;
  padding: 0 ${ni}px;
  cursor: pointer;

  &:hover {
    background-color: var(--column-hover);
    fill: var(--active);
    color: var(--active);
  }
`, jV = (e, t) => {
        const n = se(t), i = Se({
            index: null
        }), l = (s) => {
            i.index = s;
        }, r = () => {
            const { store: s } = n.value;
            s.dispatch(An(lf(e.tableId)));
        };
        return () => {
            const { tableId: s } = e, { store: m } = n.value, { doc: { indexIds: h }, collections: p } = m.state, b = $(p).collection("indexEntities").selectByIds(h).filter((g) => g.tableId === s);
            return I`
      <div class=${FV}>
        ${et(b, (g) => g.id, (g) => {
                var Z;
                return I`
            <${HV}
              index=${g}
              selected=${g.id === ((Z = i.index) == null ? void 0 : Z.id)}
              .onSelect=${l}
            />
          `;
            })}
        <div
          class=${UV}
          title="Add Index"
          @click=${r}
        >
          <${P} size=${12} name="plus" />
        </div>
      </div>
      <div class=${$V}>
        <${zV} tableId=${s} index=${i.index} />
        ${i.index ? I`<${MV} index=${i.index} />` : null}
      </div>
    `;
        };
    }, EV = N`
  display: flex;
  padding: 12px;
  min-height: 56px;
`, PV = N`
  display: flex;
  align-items: center;
  padding: 0 12px;
  height: 32px;
  border-radius: 4px;
  cursor: default;
  white-space: nowrap;

  &:hover {
    background-color: var(--context-menu-hover);
    color: var(--active);
    fill: var(--active);
  }

  &.selected {
    background-color: var(--context-menu-select);
    color: var(--active);
    fill: var(--active);
  }
`, qi = {
        Indexes: "Indexes",
        SchemaSQL: "Schema SQL",
    }, BV = Object.values(qi), OV = (e, t) => () => I`
    <div class=${EV}>
      ${BV.map((n) => I`
          <div
            class=${[PV, { selected: n === e.value }]}
            @click=${() => e.onChange(n)}
          >
            ${n}
          </div>
        `)}
    </div>
  `, m0 = [
        {
            name: "Pascal",
            value: Ht.pascalCase
        },
        {
            name: "Camel",
            value: Ht.camelCase
        },
        {
            name: "Snake",
            value: Ht.snakeCase
        },
        {
            name: "None",
            value: Ht.none
        }
    ];
function AV({ store: e }) {
    const { settings: t } = e.state;
    return m0.map((n) => ({
        checked: n.value === t.columnNameCase,
        name: n.name,
        onClick: () => {
            e.dispatch(qd({
                value: n.value
            }));
        }
    }));
}
const h0 = [
    {
        name: "GraphQL",
        value: Ce.GraphQL
    },
    {
        name: "C#",
        value: Ce.csharp
    },
    {
        name: "Java",
        value: Ce.Java
    },
    {
        name: "Kotlin",
        value: Ce.Kotlin
    },
    {
        name: "TypeScript",
        value: Ce.TypeScript
    },
    {
        name: "JPA",
        value: Ce.JPA
    },
    {
        name: "Scala",
        value: Ce.Scala
    }
];
function QV({ store: e }) {
    const { settings: t } = e.state;
    return h0.map((n) => ({
        checked: n.value === t.language,
        name: n.name,
        onClick: () => {
            e.dispatch(eu({
                value: n.value
            }));
        }
    }));
}
const p0 = [
    {
        name: "Pascal",
        value: Ht.pascalCase
    },
    {
        name: "Camel",
        value: Ht.camelCase
    },
    {
        name: "Snake",
        value: Ht.snakeCase
    },
    {
        name: "None",
        value: Ht.none
    }
];
function DV({ store: e }) {
    const { settings: t } = e.state;
    return p0.map((n) => ({
        checked: n.value === t.tableNameCase,
        name: n.name,
        onClick: () => {
            e.dispatch(tu({
                value: n.value
            }));
        }
    }));
}
const _V = (e, t) => {
    const n = se(t), i = I`<${P} name="chevron-right" size=${14} />`, { addUnsubscribe: l } = Ge();
    return Te(() => {
        const { shortcut$: r } = n.value;
        l(r.subscribe(({ type: s }) => {
            s === D.stop && e.onClose();
        }));
    }), () => I`
    <${_.Root}
      children=${I`
        <${_.Item}
          children=${I`
            <${_.Menu}
              icon=${I`<${P} name="code" size=${14} />`}
              name="Language"
              right=${i}
            />
          `}
          subChildren=${I`${QV(n.value).map((r) => I`
              <${_.Item}
                .onClick=${r.onClick}
                children=${I`
                  <${_.Menu}
                    icon=${r.checked ? I`<${P} name="check" size=${14} />` : null}
                    name=${r.name}
                  />
                `}
              />
            `)}`}
        />
        <${_.Item}
          children=${I`
            <${_.Menu}
              icon=${I`
                <${P} prefix="mdi" name="format-letter-case" size=${14} />
              `}
              name="Table Name Case"
              right=${i}
            />
          `}
          subChildren=${I`${DV(n.value).map((r) => I`
              <${_.Item}
                .onClick=${r.onClick}
                children=${I`
                  <${_.Menu}
                    icon=${r.checked ? I`<${P} name="check" size=${14} />` : null}
                    name=${r.name}
                  />
                `}
              />
            `)}`}
        />
        <${_.Item}
          children=${I`
            <${_.Menu}
              icon=${I`<${P}
                prefix="mdi"
                name="format-letter-case"
                size=${14}
              />`}
              name="Column Name Case"
              right=${i}
            />
          `}
          subChildren=${I`${AV(n.value).map((r) => I`
              <${_.Item}
                .onClick=${r.onClick}
                children=${I`
                  <${_.Menu}
                    icon=${r.checked ? I`<${P} name="check" size=${14} />` : null}
                    name=${r.name}
                  />
                `}
              />
            `)}`}
        />
      `}
    />
  `;
}, b0 = new pu();
let f0 = () => null;
function MS(e) {
    f0 = e, b0.emit(Xg());
}
function qV() {
    return f0();
}
const g0 = N`
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px;
  margin: 8px;
  cursor: pointer;
  fill: var(--foreground);
  color: var(--foreground);
  opacity: 0;
  transition: opacity 0.15s;
  user-select: none;

  &:hover {
    fill: var(--active);
    color: var(--active);
  }
`, e9 = N`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  min-height: 40px;
  outline: none;

  &:hover {
    ${g0} {
      opacity: 1;
    }
  }
`, t9 = N`
  width: 100%;
  height: 100%;
  white-space: pre;
  overflow: auto;
  outline: none;
  font-family: var(--code-font-family) !important;
  color: var(--active);
  padding: 16px;
`, n9 = Be([
    "value",
    "lang",
    "theme"
]), y0 = (e, t) => {
    const n = Ue(), { addUnsubscribe: i } = Ge(), l = Se({
        highlight: "",
        backgroundColor: ""
    }), r = () => {
        var p;
        (p = e.onCopy) == null || p.call(e, e.value);
    }, s = () => {
        const p = n.value;
        if (!p)
            return null;
        const b = p.querySelector("pre.shiki");
        if (!b)
            return null;
        const g = b.style.backgroundColor;
        return g || null;
    }, m = () => {
        la(() => {
            l.backgroundColor = s() || "";
        });
    }, h = () => {
        var p;
        (p = qV()) == null || p.codeToHtml(e.value, {
            lang: e.lang,
            theme: e.theme
        }).then((b) => {
            l.highlight = b, m();
        });
    };
    return zi(() => {
        h(), i(b0.on({ loadShikiService: h }), Pe(e).subscribe((p) => {
            n9(p) && h();
        }), () => {
            l.highlight = "";
        });
    }), () => I`
    <div class=${e9} ${De(n)}>
      <div
        class=${["scrollbar", t9]}
        style=${{
            "background-color": l.backgroundColor
        }}
      >
        ${rf(l.highlight ? l.highlight : e.value)}
      </div>
      <div class=${g0} title="Copy" @click=${r}>
        <${P} prefix="far" name="copy" useTransition=${!0} />
      </div>
    </div>
  `;
}, i9 = {
    [Ce.TypeScript]: "typescript",
    [Ce.GraphQL]: "graphql",
    [Ce.csharp]: "csharp",
    [Ce.Java]: "java",
    [Ce.Kotlin]: "kotlin",
    [Ce.Scala]: "scala",
    [Ce.JPA]: "java"
};
function fd(e) {
    return new Promise((t, n) => {
        const i = document.createElement("textarea");
        i.style.fontSize = "12pt", i.style.border = "0", i.style.padding = "0", i.style.margin = "0", i.style.position = "fixed", i.style.left = "-9999px", i.style.top = "-9999px", i.setAttribute("readonly", ""), i.value = e, document.body.appendChild(i), i.select(), i.setSelectionRange(0, 99999);
        try {
            document.execCommand("copy"), t();
        } catch (l) {
            n(l);
        }
        i.setSelectionRange(0, 0), document.body.removeChild(i);
    });
}
async function Z0(e) {
    if (!navigator.clipboard)
        return fd(e);
    try {
        await navigator.clipboard.writeText(e);
    } catch {
        return fd(e);
    }
}
const _l = Be([
    $e.ZeroOne,
    $e.OneOnly
]), ql = Be([
    $e.ZeroN,
    $e.OneN
]);
function Rn(e, t) {
    const n = o9(t);
    for (const i of n)
        if (e.toLocaleLowerCase().indexOf(i.name.toLocaleLowerCase()) === 0)
            return i.primitiveType;
    return "string";
}
function o9(e) {
    return Du[e] ?? [];
}
function Ze(e, t) {
    let n = e;
    switch (t) {
        case Ht.camelCase:
            n = sf(e);
            break;
        case Ht.pascalCase:
            n = cf(e);
            break;
        case Ht.snakeCase:
            n = Zg(e);
            break;
    }
    return n;
}
const a9 = {
    int: "int",
    long: "long",
    float: "float",
    double: "double",
    decimal: "decimal",
    boolean: "bool",
    string: "string",
    lob: "string",
    date: "DateTime",
    dateTime: "DateTime",
    time: "TimeSpan"
};
function l9(e) {
    const { doc: { tableIds: t }, collections: n } = e, i = [""];
    return $(n).collection("tableEntities").selectByIds(t).sort(xt).forEach((r) => {
        v0(e, {
            buffer: i,
            table: r
        }), i.push("");
    }), i.join(`
`);
}
function v0(e, { buffer: t, table: n }) {
    const { settings: { tableNameCase: i }, collections: l } = e, r = Ze(n.name, i);
    n.comment.trim() !== "" && t.push(`// ${n.comment}`), t.push(`public class ${r} {`), $(l).collection("tableColumnEntities").selectByIds(n.columnIds).forEach((s) => {
        r9(e, { buffer: t, column: s });
    }), t.push("}");
}
function r9({ settings: { columnNameCase: e, database: t } }, { buffer: n, column: i }) {
    const l = Ze(i.name, e), r = Rn(i.dataType, t);
    i.comment.trim() !== "" && n.push(`  // ${i.comment}`), n.push(`  public ${a9[r]} ${l.charAt(0).toLocaleUpperCase() + l.slice(1)} { get; set; }`);
}
const c9 = {
    int: "Int",
    long: "Int",
    float: "Float",
    double: "Float",
    decimal: "Float",
    boolean: "Boolean",
    string: "String",
    lob: "String",
    date: "String",
    dateTime: "String",
    time: "String"
};
function s9(e) {
    const { doc: { tableIds: t }, collections: n } = e, i = [""];
    return $(n).collection("tableEntities").selectByIds(t).sort(xt).forEach((r) => {
        x0(e, {
            buffer: i,
            table: r
        }), i.push("");
    }), i.join(`
`);
}
function x0(e, { buffer: t, table: n }) {
    const { settings: { tableNameCase: i }, collections: l } = e, r = Ze(n.name, i);
    n.comment.trim() !== "" && t.push(`# ${n.comment}`), t.push(`type ${r} {`), $(l).collection("tableColumnEntities").selectByIds(n.columnIds).forEach((s) => {
        d9(e, { buffer: t, column: s });
    }), u9(e, { buffer: t, table: n }), t.push("}");
}
function d9({ settings: { columnNameCase: e, database: t } }, { buffer: n, column: i }) {
    const l = B(i.ui.keys, In.primaryKey), r = B(i.ui.keys, In.foreignKey);
    if (!l && r)
        return;
    const s = Ze(i.name, e);
    if (i.comment.trim() !== "" && n.push(`  # ${i.comment}`), B(i.options, ie.primaryKey) || r)
        n.push(`  ${s}: ID${B(i.options, ie.notNull) ? "!" : ""}`);
    else {
        const h = Rn(i.dataType, t);
        n.push(`  ${s}: ${c9[h]}${B(i.options, ie.notNull) ? "!" : ""}`);
    }
}
function u9({ doc: { relationshipIds: e }, collections: t, settings: { tableNameCase: n, columnNameCase: i } }, { buffer: l, table: r }) {
    const s = $(t).collection("tableEntities"), m = $(t).collection("relationshipEntities").selectByIds(e);
    m.filter((h) => h.end.tableId === r.id).forEach((h) => {
        const p = s.selectById(h.start.tableId);
        if (p) {
            const b = Ze(p.name, n), g = Ze(p.name, i);
            p.comment.trim() !== "" && l.push(`  # ${p.comment}`), l.push(`  ${g}: ${b}`);
        }
    }), m.filter((h) => h.start.tableId === r.id).forEach((h) => {
        const p = s.selectById(h.end.tableId);
        if (p) {
            const b = Ze(p.name, n), g = Ze(p.name, i);
            p.comment.trim() !== "" && l.push(`  # ${p.comment}`), _l(h.relationshipType) ? l.push(`  ${g}: ${b}`) : ql(h.relationshipType) && l.push(`  ${Ze(`${g}List`, i)}: [${b}!]!`);
        }
    });
}
const m9 = {
    int: "Integer",
    long: "Long",
    float: "Float",
    double: "Double",
    decimal: "BigDecimal",
    boolean: "Boolean",
    string: "String",
    lob: "String",
    date: "LocalDate",
    dateTime: "LocalDateTime",
    time: "LocalTime"
};
function h9(e) {
    const { doc: { tableIds: t }, collections: n } = e, i = [""];
    return $(n).collection("tableEntities").selectByIds(t).sort(xt).forEach((r) => {
        G0(e, {
            buffer: i,
            table: r
        }), i.push("");
    }), i.join(`
`);
}
function G0(e, { buffer: t, table: n }) {
    const { settings: { tableNameCase: i }, collections: l } = e, r = Ze(n.name, i);
    n.comment.trim() !== "" && t.push(`// ${n.comment}`), t.push("@Data"), t.push(`public class ${r} {`), $(l).collection("tableColumnEntities").selectByIds(n.columnIds).forEach((s) => {
        p9(e, { buffer: t, column: s });
    }), t.push("}");
}
function p9({ settings: { columnNameCase: e, database: t } }, { buffer: n, column: i }) {
    const l = Ze(i.name, e), r = Rn(i.dataType, t);
    i.comment.trim() !== "" && n.push(`  // ${i.comment}`), n.push(`  private ${m9[r]} ${l};`);
}
const X0 = {
    int: "Integer",
    long: "Long",
    float: "Float",
    double: "Double",
    decimal: "BigDecimal",
    boolean: "Boolean",
    string: "String",
    lob: "String",
    date: "LocalDate",
    dateTime: "LocalDateTime",
    time: "LocalTime"
};
function b9(e) {
    const { doc: { tableIds: t }, collections: n } = e, i = [""];
    return $(n).collection("tableEntities").selectByIds(t).sort(xt).forEach((r) => {
        W0(e, {
            buffer: i,
            table: r
        }), i.push("");
    }), i.join(`
`);
}
function W0(e, { buffer: t, table: n }) {
    const { settings: { tableNameCase: i, columnNameCase: l, database: r }, doc: { relationshipIds: s }, collections: m } = e, h = Ze(n.name, i), p = $(m).collection("tableEntities"), b = $(m).collection("tableColumnEntities").selectByIds(n.columnIds), g = $(m).collection("relationshipEntities").selectByIds(s), Z = ri(b);
    if (Z.length > 1) {
        t.push("@Data"), t.push(`public class ${Ze(`${n.name}Id`, i)} implements Serializable {`);
        const y = [];
        Z.forEach((G) => {
            if (B(G.ui.keys, In.primaryKey) && B(G.ui.keys, In.foreignKey))
                p.selectByIds(g.filter((X) => X.end.columnIds.includes(G.id)).map((X) => X.start.tableId)).forEach((X) => {
                    y.some((W) => W.id === X.id) || y.push(X);
                });
            else {
                const X = Ze(G.name, l), W = Rn(G.dataType, r);
                t.push(`  private ${X0[W]} ${X};`);
            }
        }), y.forEach((G) => {
            t.push(`  private ${Ze(G.name, i)} ${Ze(G.name, l)};`);
        }), t.push("}");
    }
    n.comment.trim() !== "" && t.push(`// ${n.comment}`), t.push("@Data"), t.push("@Entity"), Z.length > 1 && t.push(`@IdClass(${Ze(`${n.name}Id`, i)}.class)`), t.push(`public class ${h} {`), b.forEach((y) => {
        f9(e, { buffer: t, column: y });
    }), g9(e, { buffer: t, table: n }), t.push("}");
}
function f9({ settings: { columnNameCase: e, database: t } }, { buffer: n, column: i }) {
    const l = B(i.ui.keys, In.primaryKey), r = B(i.ui.keys, In.foreignKey);
    if (!l && r || l && r)
        return;
    const s = Ze(i.name, e), m = Rn(i.dataType, t);
    i.comment.trim() !== "" && n.push(`  // ${i.comment}`), B(i.options, ie.primaryKey) ? (n.push("  @Id"), B(i.options, ie.autoIncrement) && n.push("  @GeneratedValue")) : B(i.options, ie.notNull) && n.push("  @Column(nullable = false)"), m === "lob" && n.push("  @Lob"), n.push(`  private ${X0[m]} ${s};`);
}
function g9({ doc: { relationshipIds: e }, collections: t, settings: { tableNameCase: n, columnNameCase: i } }, { buffer: l, table: r }) {
    const s = $(t).collection("tableEntities"), m = $(t).collection("tableColumnEntities"), h = $(t).collection("relationshipEntities").selectByIds(e);
    h.filter((p) => p.end.tableId === r.id).forEach((p) => {
        const b = s.selectById(p.start.tableId), g = m.selectByIds(p.end.columnIds);
        if (b && g.length !== 0) {
            const Z = Ze(b.name, n), y = Ze(b.name, i);
            b.comment.trim() !== "" && l.push(`  // ${b.comment}`), li(g) && l.push("  @Id"), _l(p.relationshipType) ? l.push("  @OneToOne") : ql(p.relationshipType) && l.push("  @ManyToOne"), g.length > 1 ? (l.push("  @JoinColumns(value = {"), g.forEach((G, X) => {
                l.push(`    @JoinColumn(name = "${Ze(G.name, Ht.snakeCase)}")${g.length - 1 > X ? "," : ""}`);
            }), l.push("  })")) : l.push(`  @JoinColumn(name = "${Ze(g[0].name, Ht.snakeCase)}")`), l.push(`  private ${Z} ${y};`);
        }
    }), h.filter((p) => p.start.tableId === r.id).forEach((p) => {
        const b = s.selectById(p.end.tableId);
        if (b) {
            const g = Ze(b.name, n), Z = Ze(b.name, i);
            b.comment.trim() !== "" && l.push(`  // ${b.comment}`), _l(p.relationshipType) ? (l.push(`  @OneToOne(mappedBy = "${Ze(r.name, i)}")`), l.push(`  private ${g} ${Z};`)) : ql(p.relationshipType) && (l.push(`  @OneToMany(mappedBy = "${Ze(r.name, i)}")`), l.push(`  private List<${g}> ${Ze(`${Z}List`, i)} = new ArrayList<>();`));
        }
    });
}
const gd = {
    int: "Int",
    long: "Long",
    float: "Float",
    double: "Double",
    decimal: "BigDecimal",
    boolean: "Boolean",
    string: "String",
    lob: "String",
    date: "LocalDate",
    dateTime: "LocalDateTime",
    time: "LocalTime"
};
function y9(e) {
    const { doc: { tableIds: t }, collections: n } = e, i = [""];
    return $(n).collection("tableEntities").selectByIds(t).sort(xt).forEach((r) => {
        V0(e, {
            buffer: i,
            table: r
        }), i.push("");
    }), i.join(`
`);
}
function V0(e, { buffer: t, table: n }) {
    const { settings: { tableNameCase: i }, collections: l } = e, r = Ze(n.name, i);
    n.comment.trim() !== "" && t.push(`// ${n.comment}`), t.push(`class ${r} {`), $(l).collection("tableColumnEntities").selectByIds(n.columnIds).forEach((s) => {
        Z9(e, { buffer: t, column: s });
    }), t.push("}");
}
function Z9({ settings: { columnNameCase: e, database: t } }, { buffer: n, column: i }) {
    const l = Ze(i.name, e), r = Rn(i.dataType, t);
    i.comment.trim() !== "" && n.push(`  // ${i.comment}`), B(i.options, ie.notNull) && r !== "date" && r !== "dateTime" && r !== "time" ? n.push(`  var ${l}: ${gd[r]} = ${v9(r)}`) : n.push(`  var ${l}: ${gd[r]}? = null`);
}
function v9(e) {
    switch (e) {
        case "int":
        case "long":
            return 0;
        case "float":
            return "0.0f";
        case "double":
            return "0.0";
        case "boolean":
            return !1;
        case "string":
        case "lob":
            return '""';
        case "decimal":
            return "BigDecimal.ZERO";
        case "date":
        case "dateTime":
        case "time":
            return null;
    }
}
const x9 = {
    int: "Int",
    long: "Long",
    float: "Float",
    double: "Double",
    decimal: "BigDecimal",
    boolean: "Boolean",
    string: "String",
    lob: "String",
    date: "LocalDate",
    dateTime: "LocalDateTime",
    time: "LocalTime"
};
function G9(e) {
    const { doc: { tableIds: t }, collections: n } = e, i = [""];
    return $(n).collection("tableEntities").selectByIds(t).sort(xt).forEach((r) => {
        I0(e, {
            buffer: i,
            table: r
        }), i.push("");
    }), i.join(`
`);
}
function I0(e, { buffer: t, table: n }) {
    const { settings: { tableNameCase: i }, collections: l } = e, r = Ze(n.name, i);
    n.comment.trim() !== "" && t.push(`// ${n.comment}`), t.push("@Data"), t.push(`case class ${r}(`), $(l).collection("tableColumnEntities").selectByIds(n.columnIds).forEach((s, m, h) => {
        let p = !0;
        m === h.length - 1 && (p = !1), X9(e, { buffer: t, column: s }, p);
    }), t.push(")");
}
function X9({ settings: { columnNameCase: e, database: t } }, { buffer: n, column: i }, l) {
    const r = Ze(i.name, e), s = Rn(i.dataType, t);
    i.comment.trim() !== "" && n.push(` // ${i.comment}`), n.push(` ${r}: ${x9[s]}${l ? "," : ""}`);
}
const W9 = {
    int: "number",
    long: "number",
    float: "number",
    double: "number",
    decimal: "number",
    boolean: "boolean",
    string: "string",
    lob: "string",
    date: "string",
    dateTime: "string",
    time: "string"
};
function V9(e) {
    const { doc: { tableIds: t }, collections: n } = e, i = [""];
    return $(n).collection("tableEntities").selectByIds(t).sort(xt).forEach((r) => {
        k0(e, {
            buffer: i,
            table: r
        }), i.push("");
    }), i.join(`
`);
}
function k0(e, { buffer: t, table: n }) {
    const { settings: { tableNameCase: i }, collections: l } = e, r = Ze(n.name, i);
    n.comment.trim() !== "" && t.push(`// ${n.comment}`), t.push(`export interface ${r} {`), $(l).collection("tableColumnEntities").selectByIds(n.columnIds).forEach((s) => {
        I9(e, { buffer: t, column: s });
    }), t.push("}");
}
function I9({ settings: { columnNameCase: e, database: t } }, { buffer: n, column: i }) {
    const l = Ze(i.name, e), r = Rn(i.dataType, t);
    i.comment.trim() !== "" && n.push(`  // ${i.comment}`), n.push(`  ${l}: ${W9[r]}${B(i.options, ie.notNull) ? "" : " | null"};`);
}
function k9(e) {
    const { settings: { language: t } } = e;
    switch (t) {
        case Ce.GraphQL:
            return s9(e);
        case Ce.JPA:
            return b9(e);
        case Ce.TypeScript:
            return V9(e);
        case Ce.csharp:
            return l9(e);
        case Ce.Java:
            return h9(e);
        case Ce.Kotlin:
            return y9(e);
        case Ce.Scala:
            return G9(e);
    }
    return "";
}
function C9(e, t) {
    const n = [""], { settings: { language: i } } = e;
    switch (i) {
        case Ce.GraphQL:
            x0(e, { buffer: n, table: t }), n.push("");
            break;
        case Ce.JPA:
            W0(e, { buffer: n, table: t }), n.push("");
            break;
        case Ce.TypeScript:
            k0(e, { buffer: n, table: t }), n.push("");
            break;
        case Ce.csharp:
            v0(e, { buffer: n, table: t }), n.push("");
            break;
        case Ce.Java:
            G0(e, { buffer: n, table: t }), n.push("");
            break;
        case Ce.Kotlin:
            V0(e, { buffer: n, table: t }), n.push("");
            break;
        case Ce.Scala:
            I0(e, { buffer: n, table: t }), n.push("");
            break;
    }
    return n.join(`
`);
}
const S9 = N`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: var(--canvas-background);
`, R9 = Be([
    "language",
    "tableNameCase",
    "columnNameCase"
]), S0 = [
    {
        name: "SingleQuote",
        value: Ho.singleQuote
    },
    {
        name: "DoubleQuote",
        value: Ho.doubleQuote
    },
    {
        name: "Backtick",
        value: Ho.backtick
    },
    {
        name: "None",
        value: Ho.none
    }
];
function L9({ store: e }) {
    const { settings: t } = e.state;
    return S0.map((n) => ({
        checked: n.value === t.bracketType,
        name: n.name,
        onClick: () => {
            e.dispatch(nu({
                value: n.value
            }));
        }
    }));
}
const Y9 = (e, t) => {
    const n = se(t), i = I`<${P} name="chevron-right" size=${14} />`, { addUnsubscribe: l } = Ge();
    return Te(() => {
        const { shortcut$: r } = n.value;
        l(r.subscribe(({ type: s }) => {
            s === D.stop && e.onClose();
        }));
    }), () => I`
    <${_.Root}
      children=${I`
        <${_.Item}
          children=${I`
            <${_.Menu}
              icon=${I`
                <${P} prefix="mdi" name="database" size=${14} />
              `}
              name="Database"
              right=${i}
            />
          `}
          subChildren=${I`${Um(n.value).map((r) => I`
              <${_.Item}
                .onClick=${r.onClick}
                children=${I`
                  <${_.Menu}
                    icon=${r.checked ? I`<${P} name="check" size=${14} />` : null}
                    name=${r.name}
                  />
                `}
              />
            `)}`}
        />
        <${_.Item}
          children=${I`
            <${_.Menu}
              icon=${I`
                <${P} prefix="mdi" name="code-brackets" size=${14} />
              `}
              name="Bracket"
              right=${i}
            />
          `}
          subChildren=${I`${L9(n.value).map((r) => I`
              <${_.Item}
                .onClick=${r.onClick}
                children=${I`
                  <${_.Menu}
                    icon=${r.checked ? I`<${P} name="check" size=${14} />` : null}
                    name=${r.name}
                  />
                `}
              />
            `)}`}
        />
      `}
    />
  `;
}, K9 = N`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: var(--canvas-background);
`, T9 = Be([
    "database",
    "bracketType"
]), R0 = (e, t) => {
    const n = se(t), { addUnsubscribe: i } = Ge(), l = Ur(t), r = Se({
        sql: ""
    }), s = () => {
        const { store: p } = n.value;
        if (e.tableId) {
            const { collections: b } = p.state, g = $(b).collection("tableEntities").selectById(e.tableId);
            g && (r.sql = GV(p.state, g));
        } else
            r.sql = Ua(p.state);
    }, m = () => {
        const { emitter: p } = n.value;
        Z0(r.sql).then(() => {
            p.emit(dn({
                close: Ra(2e3),
                message: I`<${hn} title="Copied!" />`
            }));
        });
    }, h = () => {
        l.state.show = !1;
    };
    return zi(() => {
        const { store: p } = n.value, { settings: b } = p.state;
        s(), i(Pe(b).subscribe((g) => {
            T9(g) && s();
        }), Pe(e).subscribe((g) => {
            g === "tableId" && s();
        }));
    }), () => I`
    <div
      class=${K9}
      @contextmenu=${l.onContextmenu}
      @mousedown=${l.onMousedown}
    >
      <${y0}
        lang="sql"
        theme=${e.isDarkMode ? "dark" : "light"}
        value=${r.sql}
        .onCopy=${m}
      />
      ${l.state.show ? I`<${Y9} .onClose=${h} />` : null}
    </div>
  `;
}, H9 = N`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.4);
  }
`, N9 = N`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 900px;
  max-height: calc(100% - 32px);
  position: relative;
  z-index: 1;
  background-color: var(--context-menu-background);
  border: 1px solid var(--context-menu-border);
  border-radius: 6px;
  overflow: hidden;
`, z9 = N`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: auto;
  padding: 0 12px 12px 12px;
`, w9 = N`
  display: flex;
  padding: 0 8px;
  min-height: 32px;
  overflow-x: auto;
`, J9 = N`
  display: flex;
  max-width: 200px;
  height: 32px;
  padding: 0 12px;
  border-radius: 4px;
  cursor: default;
  align-items: center;

  &:hover {
    background-color: var(--context-menu-hover);
    color: var(--active);
    fill: var(--active);
  }

  &.selected {
    background-color: var(--context-menu-select);
    color: var(--active);
    fill: var(--active);
  }

  & > span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`, vl = N`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 450px;
`, M9 = (e, t) => {
        const n = se(t), { addUnsubscribe: i } = Ge(), l = Se({
            tab: qi.Indexes
        }), r = () => {
            const { store: h } = n.value;
            h.dispatch(ct({ [ce.tableProperties]: !1 }));
        }, s = (h) => {
            const p = h.target;
            if (!p)
                return;
            !p.closest(".table-properties") && r();
        }, m = (h) => {
            l.tab = h;
        };
        return Te(() => {
            const { shortcut$: h } = n.value;
            i(h.subscribe(({ type: p }) => {
                p === D.stop && r();
            }));
        }), () => {
            const { store: h } = n.value, { collections: p } = h.state, { tableIds: b } = e, g = $(p).collection("tableEntities").selectByIds(b);
            return I`
      <div
        class=${H9}
        @contextmenu=${Ai}
        @mousedown=${Ai}
        @touchstart=${Ai}
        @wheel=${Ai}
        @click=${s}
      >
        <div class=${["table-properties", N9]}>
          <div class=${["scrollbar", w9]}>
            ${g.map((Z) => I`
                <div
                  class=${[
                    J9,
                    { selected: Z.id === e.tableId }
                ]}
                  title=${Z.name}
                  @click=${() => e.onChange(Z.id)}
                >
                  <span>${Z.name.trim() ? Z.name : "unnamed"}</span>
                </div>
              `)}
          </div>
          <${OV}
            value=${l.tab}
            .onChange=${m}
          />
          <div class=${["scrollbar", z9]}>
            ${l.tab === qi.Indexes ? I`
                  <div class=${vl}>
                    <${jV} tableId=${e.tableId} />
                  </div>
                ` : l.tab === qi.SchemaSQL ? I`
                    <div class=${vl}>
                      <${R0}
                      isDarkMode=${e.isDarkMode}
                        tableId=${e.tableId}
                      />
                    </div>
                  `: null}
          </div>
        </div>
      </div>
    `;
        };
    }, F9 = N`
  display: flex;
  width: 100%;
  height: 12px;
  position: relative;
  align-items: center;
  user-select: none;
  touch-action: none;
`, $9 = N`
  width: 100%;
  height: 8px;
  background-color: var(--gray-color-3);
  box-shadow: inset 0 0 0 1px var(--gray-color-6);
  overflow: hidden;
  position: relative;
  border-radius: 9999px;
`, U9 = N`
  position: absolute;
  border-radius: inherit;
  background-color: var(--accent-color-9);
  box-shadow: inset 0 0 0 1px var(--gray-color-6);
  top: 0;
  width: 100%;
  height: 100%;
`, j9 = N`
  position: absolute;
  width: 12px;
  height: 12px;
  background-color: white;
  border-radius: 9999px;

  &::before {
    content: '';
    position: absolute;
    width: calc(12px * 3);
    height: calc(12px * 3);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &::after {
    content: '';
    position: absolute;
    background-color: white;
    border-radius: 9999px;
    inset: calc(-0.25 * 8px);
    box-shadow: inset 0 0 0 1px var(--gray-color-6);
    cursor: pointer;
  }
`, E9 = (e, t) => {
        const n = Ue(), i = (m) => {
            const p = n.value.getBoundingClientRect(), b = m - p.x, g = Qo(b / p.width, 2), Z = e.max - e.min;
            return Ed(e.min, e.max)(Qo(Z * g) + e.min);
        }, l = ({ event: m, x: h }) => {
            m.type === "mousemove" && m.preventDefault();
            const p = i(h);
            p !== e.value && e.onChange(p);
        }, r = (m) => {
            qt.subscribe(l);
        }, s = (m) => {
            const h = i(m.clientX);
            h !== e.value && e.onChange(h), r();
        };
        return () => {
            const m = e.max - e.min, h = e.value - e.min, p = Qo(h / m, 2), b = p * 100, g = `${100 - b}%`, Z = `calc(${b}% - ${12 * p}px)`;
            return I`
      <div class=${F9} ${De(n)} @mousedown=${s}>
        <div class=${$9}>
          <div class=${U9} style=${{ right: g }}></div>
        </div>
        <div
          class=${j9}
          style=${{ left: Z }}
          @mousedown=${r}
        ></div>
      </div>
    `;
        };
    }, P9 = N`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--canvas-boundary-background);
`, B9 = N`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  pointer-events: none;
`, O9 = N`
  padding: 0 15px;
  display: flex;
  width: 100%;
  height: 30px;
  overflow: hidden;
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: var(--canvas-boundary-background);
  align-items: center;

  & > button:last-child {
    margin-left: 8px;
  }
`, A9 = N`
  width: 24px;
  height: 100%;
`, Q9 = (e, t) => {
        const n = Ue(), i = Ue(), l = e.app.value, r = ao({
            toWidth: l.toWidth
        }, {
            getHistory: l.store.history.clone
        }), { store: s } = r, { history: m } = s, { addUnsubscribe: h } = Ge(), p = bo(t, Li, r);
        h(() => {
            p.destroy();
        });
        const b = () => ({ ...l.store.state.editor.viewport }), g = Se({
            cursor: m.cursor
        });
        s.dispatchSync(io(ii(l.store.state)), rn(b()));
        const Z = (W) => {
            let V = 0;
            for (; m.cursor !== W && V <= fr;)
                m.cursor < W ? m.redo() : m.undo(), V++;
        }, y = () => {
            e.onClose();
        }, G = () => {
            e.onChange(g.cursor), y();
        }, X = (W) => {
            g.cursor = W, Z(W);
        };
        return Te(() => {
            h(l.shortcut$.subscribe(({ type: W }) => {
                W === D.stop && y();
            }), Pe(l.store.state.editor.viewport).subscribe(() => {
                r.store.dispatch(rn(b()));
            }), () => {
                lo(r);
            });
        }), () => I`
    <div class=${P9}>
      <div class=${B9} ${De(n)}>
        <${Ta} root=${n} canvas=${i} grabMove=${!0} />
        <${Ha} />
      </div>
    </div>
    <div class=${O9}>
      <${E9}
        min=${-1}
        max=${m.size - 1}
        value=${g.cursor}
        .onChange=${X}
      />
      <div class=${A9}></div>
      <${Ti} variant="soft" size="1" text="Apply" .onClick=${G} />
      <${Ti} size="1" text="Cancel" .onClick=${y} />
    </div>
  `;
    };
var L0 = { exports: {} };
(function (e, t) {
    (function (n, i) {
        e.exports = i();
    })(df, function () {
        function n(u, c) {
            var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "rgba(0, 0, 0, 0)";
            return Array.isArray(u) && (u = { r: u[0], g: u[1], b: u[2], a: u[3] }), c == "hex" ? i(u) : c == "rgb" ? l(u, a) : c == "hsl" ? r(u) : u;
        }
        function i(u) {
            Array.isArray(u) && (u = { r: u[0], g: u[1], b: u[2], a: u[3] });
            var c = u.r.toString(16);
            u.r < 16 && (c = "0" + c);
            var a = u.g.toString(16);
            u.g < 16 && (a = "0" + a);
            var o = u.b.toString(16);
            u.b < 16 && (o = "0" + o);
            var d = "";
            if (u.a < 1) {
                var f = Math.floor(u.a * 255), d = f.toString(16);
                f < 16 && (d = "0" + d);
            }
            return "#" + c + a + o + d;
        }
        function l(u) {
            var c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "rgba(0, 0, 0, 0)";
            if (Array.isArray(u) && (u = { r: u[0], g: u[1], b: u[2], a: u[3] }), !(typeof u > "u"))
                return u.a == 1 || typeof u.a > "u" ? isNaN(u.r) ? c : "rgb(" + u.r + "," + u.g + "," + u.b + ")" : "rgba(" + u.r + "," + u.g + "," + u.b + "," + u.a + ")";
        }
        function r(u) {
            return Array.isArray(u) && (u = { r: u[0], g: u[1], b: u[2], a: u[3] }), u.a == 1 || typeof u.a > "u" ? "hsl(" + u.h + "," + u.s + "%," + u.l + "%)" : "hsla(" + u.h + "," + u.s + "%," + u.l + "%," + u.a + ")";
        }
        var s = {
            format: n,
            rgb: l,
            hsl: r,
            hex: i
        };
        function m(u, c) {
            return c = typeof c > "u" ? 1 : c, Math.round(u * c) / c;
        }
        function h(u) {
            return u * Math.PI / 180;
        }
        function p(u) {
            var c = u * 180 / Math.PI;
            return c < 0 && (c = 360 + c), c;
        }
        function b(u, c) {
            var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
            return a + c * Math.cos(h(u));
        }
        function g(u, c) {
            var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
            return a + c * Math.sin(h(u));
        }
        function Z(u, c) {
            var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
            return {
                x: b(u, c, a),
                y: g(u, c, o)
            };
        }
        function y(u, c) {
            return p(Math.atan2(c, u));
        }
        var G = {
            round: m,
            radianToDegree: p,
            degreeToRadian: h,
            getXInCircle: b,
            getYInCircle: g,
            caculateAngle: y
        }, X = { aliceblue: "rgb(240, 248, 255)", antiquewhite: "rgb(250, 235, 215)", aqua: "rgb(0, 255, 255)", aquamarine: "rgb(127, 255, 212)", azure: "rgb(240, 255, 255)", beige: "rgb(245, 245, 220)", bisque: "rgb(255, 228, 196)", black: "rgb(0, 0, 0)", blanchedalmond: "rgb(255, 235, 205)", blue: "rgb(0, 0, 255)", blueviolet: "rgb(138, 43, 226)", brown: "rgb(165, 42, 42)", burlywood: "rgb(222, 184, 135)", cadetblue: "rgb(95, 158, 160)", chartreuse: "rgb(127, 255, 0)", chocolate: "rgb(210, 105, 30)", coral: "rgb(255, 127, 80)", cornflowerblue: "rgb(100, 149, 237)", cornsilk: "rgb(255, 248, 220)", crimson: "rgb(237, 20, 61)", cyan: "rgb(0, 255, 255)", darkblue: "rgb(0, 0, 139)", darkcyan: "rgb(0, 139, 139)", darkgoldenrod: "rgb(184, 134, 11)", darkgray: "rgb(169, 169, 169)", darkgrey: "rgb(169, 169, 169)", darkgreen: "rgb(0, 100, 0)", darkkhaki: "rgb(189, 183, 107)", darkmagenta: "rgb(139, 0, 139)", darkolivegreen: "rgb(85, 107, 47)", darkorange: "rgb(255, 140, 0)", darkorchid: "rgb(153, 50, 204)", darkred: "rgb(139, 0, 0)", darksalmon: "rgb(233, 150, 122)", darkseagreen: "rgb(143, 188, 143)", darkslateblue: "rgb(72, 61, 139)", darkslategray: "rgb(47, 79, 79)", darkslategrey: "rgb(47, 79, 79)", darkturquoise: "rgb(0, 206, 209)", darkviolet: "rgb(148, 0, 211)", deeppink: "rgb(255, 20, 147)", deepskyblue: "rgb(0, 191, 255)", dimgray: "rgb(105, 105, 105)", dimgrey: "rgb(105, 105, 105)", dodgerblue: "rgb(30, 144, 255)", firebrick: "rgb(178, 34, 34)", floralwhite: "rgb(255, 250, 240)", forestgreen: "rgb(34, 139, 34)", fuchsia: "rgb(255, 0, 255)", gainsboro: "rgb(220, 220, 220)", ghostwhite: "rgb(248, 248, 255)", gold: "rgb(255, 215, 0)", goldenrod: "rgb(218, 165, 32)", gray: "rgb(128, 128, 128)", grey: "rgb(128, 128, 128)", green: "rgb(0, 128, 0)", greenyellow: "rgb(173, 255, 47)", honeydew: "rgb(240, 255, 240)", hotpink: "rgb(255, 105, 180)", indianred: "rgb(205, 92, 92)", indigo: "rgb(75, 0, 130)", ivory: "rgb(255, 255, 240)", khaki: "rgb(240, 230, 140)", lavender: "rgb(230, 230, 250)", lavenderblush: "rgb(255, 240, 245)", lawngreen: "rgb(124, 252, 0)", lemonchiffon: "rgb(255, 250, 205)", lightblue: "rgb(173, 216, 230)", lightcoral: "rgb(240, 128, 128)", lightcyan: "rgb(224, 255, 255)", lightgoldenrodyellow: "rgb(250, 250, 210)", lightgreen: "rgb(144, 238, 144)", lightgray: "rgb(211, 211, 211)", lightgrey: "rgb(211, 211, 211)", lightpink: "rgb(255, 182, 193)", lightsalmon: "rgb(255, 160, 122)", lightseagreen: "rgb(32, 178, 170)", lightskyblue: "rgb(135, 206, 250)", lightslategray: "rgb(119, 136, 153)", lightslategrey: "rgb(119, 136, 153)", lightsteelblue: "rgb(176, 196, 222)", lightyellow: "rgb(255, 255, 224)", lime: "rgb(0, 255, 0)", limegreen: "rgb(50, 205, 50)", linen: "rgb(250, 240, 230)", magenta: "rgb(255, 0, 255)", maroon: "rgb(128, 0, 0)", mediumaquamarine: "rgb(102, 205, 170)", mediumblue: "rgb(0, 0, 205)", mediumorchid: "rgb(186, 85, 211)", mediumpurple: "rgb(147, 112, 219)", mediumseagreen: "rgb(60, 179, 113)", mediumslateblue: "rgb(123, 104, 238)", mediumspringgreen: "rgb(0, 250, 154)", mediumturquoise: "rgb(72, 209, 204)", mediumvioletred: "rgb(199, 21, 133)", midnightblue: "rgb(25, 25, 112)", mintcream: "rgb(245, 255, 250)", mistyrose: "rgb(255, 228, 225)", moccasin: "rgb(255, 228, 181)", navajowhite: "rgb(255, 222, 173)", navy: "rgb(0, 0, 128)", oldlace: "rgb(253, 245, 230)", olive: "rgb(128, 128, 0)", olivedrab: "rgb(107, 142, 35)", orange: "rgb(255, 165, 0)", orangered: "rgb(255, 69, 0)", orchid: "rgb(218, 112, 214)", palegoldenrod: "rgb(238, 232, 170)", palegreen: "rgb(152, 251, 152)", paleturquoise: "rgb(175, 238, 238)", palevioletred: "rgb(219, 112, 147)", papayawhip: "rgb(255, 239, 213)", peachpuff: "rgb(255, 218, 185)", peru: "rgb(205, 133, 63)", pink: "rgb(255, 192, 203)", plum: "rgb(221, 160, 221)", powderblue: "rgb(176, 224, 230)", purple: "rgb(128, 0, 128)", rebeccapurple: "rgb(102, 51, 153)", red: "rgb(255, 0, 0)", rosybrown: "rgb(188, 143, 143)", royalblue: "rgb(65, 105, 225)", saddlebrown: "rgb(139, 69, 19)", salmon: "rgb(250, 128, 114)", sandybrown: "rgb(244, 164, 96)", seagreen: "rgb(46, 139, 87)", seashell: "rgb(255, 245, 238)", sienna: "rgb(160, 82, 45)", silver: "rgb(192, 192, 192)", skyblue: "rgb(135, 206, 235)", slateblue: "rgb(106, 90, 205)", slategray: "rgb(112, 128, 144)", slategrey: "rgb(112, 128, 144)", snow: "rgb(255, 250, 250)", springgreen: "rgb(0, 255, 127)", steelblue: "rgb(70, 130, 180)", tan: "rgb(210, 180, 140)", teal: "rgb(0, 128, 128)", thistle: "rgb(216, 191, 216)", tomato: "rgb(255, 99, 71)", turquoise: "rgb(64, 224, 208)", violet: "rgb(238, 130, 238)", wheat: "rgb(245, 222, 179)", white: "rgb(255, 255, 255)", whitesmoke: "rgb(245, 245, 245)", yellow: "rgb(255, 255, 0)", yellowgreen: "rgb(154, 205, 50)", transparent: "rgba(0, 0, 0, 0)" };
        function W(u) {
            return !!X[u];
        }
        function V(u) {
            return X[u];
        }
        var C = {
            isColorName: W,
            getColorByName: V
        };
        function H(u, c, a) {
            return a < 0 && (a += 1), a > 1 && (a -= 1), a < 1 / 6 ? u + (c - u) * 6 * a : a < 1 / 2 ? c : a < 2 / 3 ? u + (c - u) * (2 / 3 - a) * 6 : u;
        }
        function L(u, c, a) {
            if (arguments.length == 1)
                var o = arguments[0], u = o.h, c = o.s, a = o.l;
            var d = E(u, c, a);
            return ja(d.r, d.g, d.b);
        }
        function E(u, c, a) {
            if (arguments.length == 1)
                var o = arguments[0], u = o.h, c = o.s, a = o.l;
            var d, f, v;
            if (u /= 360, c /= 100, a /= 100, c == 0)
                d = f = v = a;
            else {
                var x = a < 0.5 ? a * (1 + c) : a + c - a * c, k = 2 * a - x;
                d = H(k, x, u + 1 / 3), f = H(k, x, u), v = H(k, x, u - 1 / 3);
            }
            return { r: m(d * 255), g: m(f * 255), b: m(v * 255) };
        }
        var J = {
            HUEtoRGB: H,
            HSLtoHSV: L,
            HSLtoRGB: E
        }, K = function (u, c) {
            if (!(u instanceof c))
                throw new TypeError("Cannot call a class as a function");
        }, Y = /* @__PURE__ */ function () {
            function u(c, a) {
                for (var o = 0; o < a.length; o++) {
                    var d = a[o];
                    d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(c, d.key, d);
                }
            }
            return function (c, a, o) {
                return a && u(c.prototype, a), o && u(c, o), c;
            };
        }(), T = function (u, c, a) {
            return c in u ? Object.defineProperty(u, c, {
                value: a,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : u[c] = a, u;
        }, z = Object.assign || function (u) {
            for (var c = 1; c < arguments.length; c++) {
                var a = arguments[c];
                for (var o in a)
                    Object.prototype.hasOwnProperty.call(a, o) && (u[o] = a[o]);
            }
            return u;
        }, M = function u(c, a, o) {
            c === null && (c = Function.prototype);
            var d = Object.getOwnPropertyDescriptor(c, a);
            if (d === void 0) {
                var f = Object.getPrototypeOf(c);
                return f === null ? void 0 : u(f, a, o);
            } else {
                if ("value" in d)
                    return d.value;
                var v = d.get;
                return v === void 0 ? void 0 : v.call(o);
            }
        }, U = function (u, c) {
            if (typeof c != "function" && c !== null)
                throw new TypeError("Super expression must either be null or a function, not " + typeof c);
            u.prototype = Object.create(c && c.prototype, {
                constructor: {
                    value: u,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), c && (Object.setPrototypeOf ? Object.setPrototypeOf(u, c) : u.__proto__ = c);
        }, j = function (u, c) {
            if (!u)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return c && (typeof c == "object" || typeof c == "function") ? c : u;
        }, q = /* @__PURE__ */ function () {
            function u(c, a) {
                var o = [], d = !0, f = !1, v = void 0;
                try {
                    for (var x = c[Symbol.iterator](), k; !(d = (k = x.next()).done) && (o.push(k.value), !(a && o.length === a)); d = !0)
                        ;
                } catch (S) {
                    f = !0, v = S;
                } finally {
                    try {
                        !d && x.return && x.return();
                    } finally {
                        if (f)
                            throw v;
                    }
                }
                return o;
            }
            return function (c, a) {
                if (Array.isArray(c))
                    return c;
                if (Symbol.iterator in Object(c))
                    return u(c, a);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
        }(), ne = function (u) {
            return Array.isArray(u) ? u : Array.from(u);
        }, te = function (u) {
            if (Array.isArray(u)) {
                for (var c = 0, a = Array(u.length); c < u.length; c++)
                    a[c] = u[c];
                return a;
            } else
                return Array.from(u);
        }, je = /(#(?:[\da-f]{3}){1,2}|#(?:[\da-f]{8})|rgb\((?:\s*\d{1,3},\s*){2}\d{1,3}\s*\)|rgba\((?:\s*\d{1,3},\s*){3}\d*\.?\d+\s*\)|hsl\(\s*\d{1,3}(?:,\s*\d{1,3}%){2}\s*\)|hsla\(\s*\d{1,3}(?:,\s*\d{1,3}%){2},\s*\d*\.?\d+\s*\)|([\w_\-]+))/gi, jt = ",";
        function zt(u) {
            var c = u.match(je), a = [];
            if (!c)
                return a;
            for (var o = 0, d = c.length; o < d; o++)
                if (c[o].indexOf("#") > -1 || c[o].indexOf("rgb") > -1 || c[o].indexOf("hsl") > -1)
                    a.push({ color: c[o] });
                else {
                    var f = C.getColorByName(c[o]);
                    f && a.push({ color: c[o], nameColor: f });
                }
            var v = { next: 0 };
            return a.forEach(function (x) {
                var k = u.indexOf(x.color, v.next);
                x.startIndex = k, x.endIndex = k + x.color.length, v.next = x.endIndex;
            }), a;
        }
        function _e(u) {
            var c = zt(u);
            return c.forEach(function (a, o) {
                u = u.replace(a.color, "@" + o);
            }), { str: u, matches: c };
        }
        function Ke(u) {
            var c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ",", a = _e(u);
            return a.str.split(c).map(function (o, d) {
                return o = tn(o), a.matches[d] && (o = o.replace("@" + d, a.matches[d].color)), o;
            });
        }
        function fn(u, c) {
            return c.forEach(function (a, o) {
                u = u.replace("@" + o, a.color);
            }), u;
        }
        function tn(u) {
            return u.replace(/^\s+|\s+$/g, "");
        }
        function Ji(u) {
            if (typeof u == "string") {
                if (C.isColorName(u) && (u = C.getColorByName(u)), u.indexOf("rgb(") > -1) {
                    for (var c = u.replace("rgb(", "").replace(")", "").split(","), a = 0, o = c.length; a < o; a++)
                        c[a] = parseInt(tn(c[a]), 10);
                    var d = { type: "rgb", r: c[0], g: c[1], b: c[2], a: 1 };
                    return d = Object.assign(d, Ln(d)), d;
                } else if (u.indexOf("rgba(") > -1) {
                    for (var c = u.replace("rgba(", "").replace(")", "").split(","), a = 0, o = c.length; a < o; a++)
                        o - 1 == a ? c[a] = parseFloat(tn(c[a])) : c[a] = parseInt(tn(c[a]), 10);
                    var d = { type: "rgb", r: c[0], g: c[1], b: c[2], a: c[3] };
                    return d = Object.assign(d, Ln(d)), d;
                } else if (u.indexOf("hsl(") > -1) {
                    for (var c = u.replace("hsl(", "").replace(")", "").split(","), a = 0, o = c.length; a < o; a++)
                        c[a] = parseFloat(tn(c[a]));
                    var d = { type: "hsl", h: c[0], s: c[1], l: c[2], a: 1 };
                    return d = Object.assign(d, E(d)), d;
                } else if (u.indexOf("hsla(") > -1) {
                    for (var c = u.replace("hsla(", "").replace(")", "").split(","), a = 0, o = c.length; a < o; a++)
                        o - 1 == a ? c[a] = parseFloat(tn(c[a])) : c[a] = parseInt(tn(c[a]), 10);
                    var d = { type: "hsl", h: c[0], s: c[1], l: c[2], a: c[3] };
                    return d = Object.assign(d, E(d)), d;
                } else if (u.indexOf("#") == 0) {
                    u = u.replace("#", "");
                    var c = [], f = 1;
                    if (u.length == 3)
                        for (var a = 0, o = u.length; a < o; a++) {
                            var v = u.substr(a, 1);
                            c.push(parseInt(v + v, 16));
                        }
                    else if (u.length === 8) {
                        for (var a = 0, o = u.length; a < o; a += 2)
                            c.push(parseInt(u.substr(a, 2), 16));
                        f = c.pop() / 255;
                    } else
                        for (var a = 0, o = u.length; a < o; a += 2)
                            c.push(parseInt(u.substr(a, 2), 16));
                    var d = { type: "hex", r: c[0], g: c[1], b: c[2], a: f };
                    return d = Object.assign(d, Ln(d)), d;
                }
            } else if (typeof u == "number") {
                if (0 <= u && u <= 16777215) {
                    var x = (u & 16711680) >> 16, k = (u & 65280) >> 8, S = (u & 255) >> 0, d = { type: "hex", r: x, g: k, b: S, a: 1 };
                    return d = Object.assign(d, Ln(d)), d;
                } else if (0 <= u && u <= 4294967295) {
                    var R = (u & 4278190080) >> 24, w = (u & 16711680) >> 16, F = (u & 65280) >> 8, Q = (u & 255) / 255, d = { type: "hex", r: R, g: w, b: F, a: Q };
                    return d = Object.assign(d, Ln(d)), d;
                }
            }
            return u;
        }
        function Or(u) {
            typeof u == "string" && (u = Ke(u)), u = u.map(function (d) {
                if (typeof d == "string") {
                    var f = _e(d), v = tn(f.str).split(" ");
                    return v[1] ? v[1].includes("%") ? v[1] = parseFloat(v[1].replace(/%/, "")) / 100 : v[1] = parseFloat(v[1]) : v[1] = "*", v[0] = fn(v[0], f.matches), v;
                } else if (Array.isArray(d))
                    return d[1] ? typeof d[1] == "string" && (d[1].includes("%") ? d[1] = parseFloat(d[1].replace(/%/, "")) / 100 : d[1] = +d[1]) : d[1] = "*", [].concat(te(d));
            });
            var c = u.filter(function (d) {
                return d[1] === "*";
            }).length;
            if (c > 0) {
                var a = u.filter(function (d) {
                    return d[1] != "*" && d[1] != 1;
                }).map(function (d) {
                    return d[1];
                }).reduce(function (d, f) {
                    return d + f;
                }, 0), o = (1 - a) / c;
                u.forEach(function (d, f) {
                    d[1] == "*" && f > 0 && (u.length - 1 == f || (d[1] = o));
                });
            }
            return u;
        }
        var _0 = {
            matches: zt,
            convertMatches: _e,
            convertMatchesArray: Ke,
            reverseMatches: fn,
            parse: Ji,
            parseGradient: Or,
            trim: tn,
            color_regexp: je,
            color_split: jt
        };
        function ja(u, c, a) {
            if (arguments.length == 1)
                var o = arguments[0], u = o.r, c = o.g, a = o.b;
            var d = u / 255, f = c / 255, v = a / 255, x = Math.max(d, f, v), k = Math.min(d, f, v), S = x - k, R = 0;
            S == 0 ? R = 0 : x == d ? R = 60 * ((f - v) / S % 6) : x == f ? R = 60 * ((v - d) / S + 2) : x == v && (R = 60 * ((d - f) / S + 4)), R < 0 && (R = 360 + R);
            var w = 0;
            x == 0 ? w = 0 : w = S / x;
            var F = x;
            return { h: R, s: w, v: F };
        }
        function q0(u, c, a) {
            if (arguments.length == 1)
                var o = arguments[0], u = o.r, c = o.g, a = o.b;
            var d = u / 255, f = c / 255, v = a / 255, x = 1 - Math.max(d, f, v), k = (1 - d - x) / (1 - x), S = (1 - f - x) / (1 - x), R = (1 - v - x) / (1 - x);
            return { c: k, m: S, y: R, k: x };
        }
        function Ln(u, c, a) {
            if (arguments.length == 1)
                var o = arguments[0], u = o.r, c = o.g, a = o.b;
            u /= 255, c /= 255, a /= 255;
            var d = Math.max(u, c, a), f = Math.min(u, c, a), v, x, k = (d + f) / 2;
            if (d == f)
                v = x = 0;
            else {
                var S = d - f;
                switch (x = k > 0.5 ? S / (2 - d - f) : S / (d + f), d) {
                    case u:
                        v = (c - a) / S + (c < a ? 6 : 0);
                        break;
                    case c:
                        v = (a - u) / S + 2;
                        break;
                    case a:
                        v = (u - c) / S + 4;
                        break;
                }
                v /= 6;
            }
            return { h: m(v * 360), s: m(x * 100), l: m(k * 100) };
        }
        function eh(u, c, a) {
            if (arguments.length == 1)
                var o = arguments[0], u = o.r, c = o.g, a = o.b;
            return yo((u + c + a) / 3 > 90 ? 0 : 255);
        }
        function yo(u) {
            return { r: u, g: u, b: u };
        }
        function th(u, c, a) {
            if (arguments.length == 1)
                var o = arguments[0], u = o.r, c = o.g, a = o.b;
            return yo(Math.ceil((u + c + a) / 3));
        }
        function nh(u, c, a) {
            if (arguments.length == 1)
                var o = arguments[0], u = o.r, c = o.g, a = o.b;
            return yo(Qr(u, c, a).y);
        }
        function Ar(u, c, a) {
            return Math.ceil(u * 0.2126 + c * 0.7152 + a * 0.0722);
        }
        function Qr(u, c, a) {
            if (arguments.length == 1)
                var o = arguments[0], u = o.r, c = o.g, a = o.b;
            var d = Ar(u, c, a), f = 0.564 * (a - d), v = 0.713 * (u - d);
            return { y: d, cr: v, cb: f };
        }
        function Ea(u) {
            var c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0.04045;
            return (u > c ? Math.pow((u + 0.055) / 1.055, 2.4) : u / 12.92) * 100;
        }
        function Dr(u, c, a) {
            if (arguments.length == 1)
                var o = arguments[0], u = o.r, c = o.g, a = o.b;
            var d = u / 255, f = c / 255, v = a / 255;
            d = Ea(d), f = Ea(f), v = Ea(v);
            var x = d * 0.4124 + f * 0.3576 + v * 0.1805, k = d * 0.2126 + f * 0.7152 + v * 0.0722, S = d * 0.0193 + f * 0.1192 + v * 0.9505;
            return { x, y: k, z: S };
        }
        function ih(u, c, a) {
            if (arguments.length == 1)
                var o = arguments[0], u = o.r, c = o.g, a = o.b;
            return XYZtoLAB(Dr(u, c, a));
        }
        var oh = {
            RGBtoCMYK: q0,
            RGBtoGray: nh,
            RGBtoHSL: Ln,
            RGBtoHSV: ja,
            RGBtoLAB: ih,
            RGBtoSimpleGray: th,
            RGBtoXYZ: Dr,
            RGBtoYCrCb: Qr,
            c: eh,
            brightness: Ar,
            gray: yo
        };
        function ah(u, c, a, o) {
            if (arguments.length == 1)
                var d = arguments[0], u = d.c, c = d.m, a = d.y, o = d.k;
            var f = 255 * (1 - u) * (1 - o), v = 255 * (1 - c) * (1 - o), x = 255 * (1 - a) * (1 - o);
            return { r: f, g: v, b: x };
        }
        var lh = {
            CMYKtoRGB: ah
        };
        function Pa(u) {
            return Math.pow(u, 3) > 8856e-6 ? Math.pow(u, 3) : (u - 16 / 116) / 7.787;
        }
        function Ba(u) {
            return u > 31308e-7 ? 1.055 * Math.pow(u, 1 / 2.4) - 0.055 : 12.92 * u;
        }
        function _r(u, c, a) {
            if (arguments.length == 1)
                var o = arguments[0], u = o.x, c = o.y, a = o.z;
            var d = u / 100, f = c / 100, v = a / 100, x = d * 3.2406 + f * -1.5372 + v * -0.4986, k = d * -0.9689 + f * 1.8758 + v * 0.0415, S = d * 0.0557 + f * -0.204 + v * 1.057;
            x = Ba(x), k = Ba(k), S = Ba(S);
            var R = m(x * 255), w = m(k * 255), F = m(S * 255);
            return { r: R, g: w, b: F };
        }
        function qr(u, c, a) {
            if (arguments.length == 1)
                var o = arguments[0], u = o.l, c = o.a, a = o.b;
            var d = (u + 16) / 116, f = c / 500 + d, v = d - a / 200;
            d = Pa(d), f = Pa(f), v = Pa(v);
            var x = f * 95.047, k = d * 100, S = v * 108.883;
            return { x, y: k, z: S };
        }
        function rh(u, c, a) {
            if (arguments.length == 1)
                var o = arguments[0], u = o.l, c = o.a, a = o.b;
            return _r(qr(u, c, a));
        }
        var ch = {
            XYZtoRGB: _r,
            LABtoRGB: rh,
            LABtoXYZ: qr
        };
        function Oa(u, c, a) {
            if (arguments.length == 1)
                var o = arguments[0], u = o.h, c = o.s, a = o.v;
            var d = u, f = c, v = a;
            d >= 360 && (d = 0);
            var x = f * v, k = x * (1 - Math.abs(d / 60 % 2 - 1)), S = v - x, R = [];
            return 0 <= d && d < 60 ? R = [x, k, 0] : 60 <= d && d < 120 ? R = [k, x, 0] : 120 <= d && d < 180 ? R = [0, x, k] : 180 <= d && d < 240 ? R = [0, k, x] : 240 <= d && d < 300 ? R = [k, 0, x] : 300 <= d && d < 360 && (R = [x, 0, k]), {
                r: m((R[0] + S) * 255),
                g: m((R[1] + S) * 255),
                b: m((R[2] + S) * 255)
            };
        }
        function sh(u, c, a) {
            if (arguments.length == 1)
                var o = arguments[0], u = o.h, c = o.s, a = o.v;
            var d = Oa(u, c, a);
            return Ln(d.r, d.g, d.b);
        }
        var dh = {
            HSVtoHSL: sh,
            HSVtoRGB: Oa
        };
        function uh(u, c, a, o) {
            if (arguments.length == 1) {
                var d = arguments[0], u = d.y, c = d.cr, a = d.cb, o = d.bit;
                o = o || 0;
            }
            var f = u + 1.402 * (c - o), v = u - 0.344 * (a - o) - 0.714 * (c - o), x = u + 1.772 * (a - o);
            return { r: Math.ceil(f), g: Math.ceil(v), b: Math.ceil(x) };
        }
        var mh = {
            YCrCbtoRGB: uh
        };
        function ec(u, c) {
            var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0.5, o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "hex", d = {
                r: m(u.r + (c.r - u.r) * a),
                g: m(u.g + (c.g - u.g) * a),
                b: m(u.b + (c.b - u.b) * a),
                a: m(u.a + (c.a - u.a) * a, 100)
            };
            return n(d, d.a < 1 ? "rgb" : o);
        }
        function dt(u) {
            var c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 5;
            if (!u)
                return [];
            typeof u == "string" && (u = Ke(u)), u = u || [];
            for (var a = u.length, o = [], d = 0; d < a - 1; d++)
                for (var f = 0; f < c; f++)
                    o.push(Aa(u[d], u[d + 1], f / c));
            return o;
        }
        function Aa(u, c) {
            var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0.5, o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "hex", d = Ji(u), f = Ji(c);
            return ec(d, f, a, o);
        }
        function hh(u, c) {
            var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0.5, o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "hex";
            return Aa(u, c, a, o);
        }
        function tc(u) {
            return u = Ji(u), (Math.round(u.r * 299) + Math.round(u.g * 587) + Math.round(u.b * 114)) / 1e3;
        }
        function ph(u) {
            return tc(u) >= 128 ? "black" : "white";
        }
        function bh(u) {
            var c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 10;
            u = Or(u);
            for (var a = [], o = c - (u.length - 1), d = o, f = 1, v = u.length; f < v; f++) {
                var x = u[f - 1][0], k = u[f][0], S = f == 1 ? u[f][1] : u[f][1] - u[f - 1][1], R = f == u.length - 1 ? d : Math.floor(S * o);
                a = a.concat(dt([x, k], R), [k]), d -= R;
            }
            return a;
        }
        function Zo(u) {
            for (var c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "h", a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 9, o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "rgb", d = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0, f = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 1, v = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : 100, x = Ji(u), k = ja(x), S = (f - d) * v / a, R = [], w = 1; w <= a; w++)
                k[c] = Math.abs((v - S * w) / v), R.push(n(Oa(k), o));
            return R;
        }
        function fh(u) {
            var c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 9, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "rgb", o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0, d = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 360;
            return Zo(u, "h", c, a, o, d, 1);
        }
        function gh(u) {
            var c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 9, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "rgb", o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0, d = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1;
            return Zo(u, "s", c, a, o, d, 100);
        }
        function yh(u) {
            var c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 9, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "rgb", o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0, d = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1;
            return Zo(u, "v", c, a, o, d, 100);
        }
        dt.parula = function (u) {
            return dt(["#352a87", "#0f5cdd", "#00b5a6", "#ffc337", "#fdff00"], u);
        }, dt.jet = function (u) {
            return dt(["#00008f", "#0020ff", "#00ffff", "#51ff77", "#fdff00", "#ff0000", "#800000"], u);
        }, dt.hsv = function (u) {
            return dt(["#ff0000", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff", "#ff0000"], u);
        }, dt.hot = function (u) {
            return dt(["#0b0000", "#ff0000", "#ffff00", "#ffffff"], u);
        }, dt.pink = function (u) {
            return dt(["#1e0000", "#bd7b7b", "#e7e5b2", "#ffffff"], u);
        }, dt.bone = function (u) {
            return dt(["#000000", "#4a4a68", "#a6c6c6", "#ffffff"], u);
        }, dt.copper = function (u) {
            return dt(["#000000", "#3d2618", "#9d623e", "#ffa167", "#ffc77f"], u);
        };
        var Zh = {
            interpolateRGB: ec,
            blend: Aa,
            mix: hh,
            scale: dt,
            contrast: tc,
            contrastColor: ph,
            gradient: bh,
            scaleHSV: Zo,
            scaleH: fh,
            scaleS: gh,
            scaleV: yh
        };
        function vh(u, c) {
            if (u.length !== c.length)
                return !1;
            for (var a = 0, o = u.length; a < o; ++a)
                if (u[a] !== c[a])
                    return !1;
            return !0;
        }
        function xh(u, c) {
            for (var a = 0, o = 0, d = u.length; o < d; o++)
                a += Math.pow(c[o] - u[o], 2);
            return Math.sqrt(a);
        }
        function Gh(u, c) {
            for (var a = 0, o = 0, d = u.length; o < d; o++)
                a += Math.abs(c[o] - u[o]);
            return a;
        }
        function Xh(u, c) {
            for (var a = 0, o = 0, d = u.length; o < d; o++)
                a = Math.max(a, Math.abs(c[o] - u[o]));
            return a;
        }
        var Wh = {
            euclidean: xh,
            manhattan: Gh,
            max: Xh
        }, Vh = {
            linear: function (c, a) {
                var o = [], d = Math.round(Math.random() * c), f = Math.floor(c / a);
                do
                    o.push(d), d = (d + f) % c;
                while (o.length < a);
                return o;
            },
            shuffle: function (c, a) {
                for (var o = []; o.length < a;) {
                    var d = Math.round(Math.random() * c);
                    o.indexOf(d) == -1 && o.push(d);
                }
                return o;
            }
        };
        function Ih(u, c) {
            var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "linear", o = Vh[a](u.length, c);
            return o.map(function (d) {
                return u[d];
            });
        }
        function kh(u, c, a) {
            var o = 1 / 0, d = 0;
            return c.forEach(function (f, v) {
                var x = a(u, f);
                x < o && (o = x, d = v);
            }), d;
        }
        function Ch(u) {
            if (!u.length)
                return [];
            for (var c = new Array(u[0].length), a = 0, o = c.length; a < o; a++)
                c[a] = 0;
            for (var d = 0, o = u.length; d < o; d++)
                for (var f = u[d], v = d + 1, x = 0, k = f.length; x < k; x++)
                    c[x] += (f[x] - c[x]) / v;
            return c = c.map(function (S) {
                return Math.floor(S);
            }), c;
        }
        function NS(u) {
            return u;
        }
        function Sh(u, c, a, o) {
            for (var d = new Array(u), f = 0; f < u; f++)
                d[f] = [];
            for (var v = 0, x = c.length; v < x; v++) {
                var k = c[v], S = kh(k, a, o);
                d[S].push(k);
            }
            return d;
        }
        function Rh(u, c, a, o, d, f) {
            for (var v = 0; v < u; v++) {
                var x = a[v], k = o[v], S = new Array(k.length);
                if (x.length > 0)
                    S = Ch(x);
                else {
                    var R = Math.floor(f() * c.length);
                    S = c[R];
                }
                vh(S, k) ? d = !1 : d = !0, o[v] = S;
            }
            return d;
        }
        function Lh(u, c, a) {
            var o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 10, d = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : "linear";
            u = u, c = c || Math.max(2, Math.ceil(Math.sqrt(u.length / 2)));
            var f = a || "euclidean";
            typeof f == "string" && (f = Wh[f]);
            for (var v = 0, x = function () {
                return v = (v * 9301 + 49297) % 233280, v / 233280;
            }, k = Ih(u, c, d), S = !0, R = 0; S;) {
                var w = Sh(c, u, k, f);
                if (S = Rh(c, u, w, k, !1, x), R++, R % o == 0)
                    break;
            }
            return k;
        }
        function Yh(u, c) {
            for (var a = 0; a < u; a += 4)
                c(a);
        }
        function Kh(u, c) {
            Yh(u.pixels.length, function (a) {
                c(u.pixels, a);
            });
        }
        var Yn = {
            create: function (c, a) {
                var o = document.createElement("canvas");
                return o.width = c || 0, o.height = a || 0, o;
            },
            drawPixels: function (c) {
                var a = this.create(c.width, c.height), o = a.getContext("2d"), d = o.getImageData(0, 0, a.width, a.height);
                return d.data.set(c.pixels), o.putImageData(d, 0, 0), a;
            },
            createHistogram: function (c, a, o, d) {
                var f = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : { black: !0, red: !1, green: !1, blue: !1 }, v = this.create(c, a), x = v.getContext("2d");
                x.clearRect(0, 0, c, a), x.fillStyle = "white", x.fillRect(0, 0, c, a), x.globalAlpha = 0.7;
                var k = { black: !1 };
                f.black ? k.black = !1 : k.black = !0, f.red ? k.red = !1 : k.red = !0, f.green ? k.green = !1 : k.green = !0, f.blue ? k.blue = !1 : k.blue = !0, Object.keys(o).forEach(function (S) {
                    if (!k[S]) {
                        var R = o[S], w = Math.max.apply(Math, R), F = c / R.length;
                        x.fillStyle = S, R.forEach(function (Q, O) {
                            var A = a * (Q / w), ee = O * F;
                            x.fillRect(ee, a - A, F, A);
                        });
                    }
                }), typeof d == "function" && d(v);
            },
            getHistogram: function (c) {
                for (var a = new Array(256), o = new Array(256), d = new Array(256), f = new Array(256), v = 0; v < 256; v++)
                    a[v] = 0, o[v] = 0, d[v] = 0, f[v] = 0;
                return Kh(c, function (x, k) {
                    var S = Math.round(be.brightness(x[k], x[k + 1], x[k + 2]));
                    a[S]++, o[x[k]]++, d[x[k + 1]]++, f[x[k + 2]]++;
                }), { black: a, red: o, green: d, blue: f };
            },
            getBitmap: function (c, a) {
                var o = this.drawPixels(c), d = o.getContext("2d"), f = d.getImageData(a.x || 0, a.y || 0, a.width || o.width, a.height || o.height).data;
                return { pixels: f, width: a.width, height: a.height };
            },
            putBitmap: function (c, a, o) {
                var d = this.drawPixels(c), f = this.drawPixels(a), v = d.getContext("2d");
                return v.drawImage(f, o.x, o.y), c.pixels = v.getImageData(0, 0, c.width, c.height).data, c;
            }
        }, si = function () {
            function u(c) {
                var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                K(this, u), this.isLoaded = !1, this.imageUrl = c, this.opt = a, this.initialize();
            }
            return Y(u, [{
                key: "initialize",
                value: function () {
                    this.canvas = this.createCanvas(), this.context = this.canvas.getContext("2d");
                }
            }, {
                key: "createCanvas",
                value: function () {
                    return document.createElement("canvas");
                }
            }, {
                key: "load",
                value: function (a) {
                    this.loadImage(a);
                }
            }, {
                key: "loadImage",
                value: function (a) {
                    var o = this, d = this.context;
                    this.newImage = new Image();
                    var f = this.newImage;
                    f.onload = function () {
                        var v = f.height / f.width;
                        o.opt.canvasWidth && o.opt.canvasHeight ? (o.canvas.width = o.opt.canvasWidth, o.canvas.height = o.opt.canvasHeight) : (o.canvas.width = o.opt.maxWidth ? o.opt.maxWidth : f.width, o.canvas.height = o.canvas.width * v), d.drawImage(f, 0, 0, f.width, f.height, 0, 0, o.canvas.width, o.canvas.height), o.isLoaded = !0, a && a();
                    }, this.getImageUrl(function (v) {
                        f.src = v;
                    });
                }
            }, {
                key: "load",
                value: function (a) {
                    var o = this;
                    this.newImage = new Image();
                    var d = this.newImage;
                    d.onload = function () {
                        o.isLoaded = !0, a && a();
                    }, this.getImageUrl(function (f) {
                        d.src = f;
                    });
                }
            }, {
                key: "getImageUrl",
                value: function (a) {
                    if (typeof this.imageUrl == "string")
                        return a(this.imageUrl);
                    if (this.imageUrl instanceof Blob) {
                        var o = new FileReader();
                        o.onload = function (d) {
                            a(d.target.result);
                        }, o.readAsDataURL(this.imageUrl);
                    }
                }
            }, {
                key: "getRGBA",
                value: function (a, o, d, f) {
                    return [a, o, d, f];
                }
            }, {
                key: "toArray",
                value: function (a, o) {
                    var d = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, f = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height), v = f.width, x = f.height, k = new Uint8ClampedArray(f.data), S = { pixels: k, width: v, height: x };
                    a || (a = /* @__PURE__ */ function () {
                        return function (R, w) {
                            w(R);
                        };
                    }()), a(S, function (R) {
                        var w = Yn.drawPixels(R);
                        d.returnTo == "canvas" ? o(w) : o(w.toDataURL(d.outputFormat || "image/png"));
                    }, d);
                }
            }, {
                key: "toHistogram",
                value: function (a) {
                    var o = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height), d = o.width, f = o.height, v = new Uint8ClampedArray(o.data), x = { pixels: v, width: d, height: f };
                    return Yn.getHistogram(x);
                }
            }, {
                key: "toRGB",
                value: function () {
                    for (var a = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height), o = a.data, d = [], f = 0, v = o.length; f < v; f += 4)
                        d[d.length] = [o[f + 0], o[f + 1], o[f + 2], o[f + 3]];
                    return d;
                }
            }]), u;
        }();
        function Th(u) {
            var c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "hex";
            return u.length > c && (u = Lh(u, c)), u.map(function (o) {
                return n(o, a);
            });
        }
        function Hh(u) {
            var c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, a = arguments[2];
            if (a) {
                if (a) {
                    var o = new si(u, c);
                    o.loadImage(function () {
                        typeof a == "function" && a(o.toRGB());
                    });
                }
            } else {
                var o = new si(u);
                o.loadImage(function () {
                    typeof c == "function" && c(o.toRGB());
                });
            }
        }
        function Nh(u, c, a) {
            var o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : { frameTimer: "full" };
            nc(u, c, a, Object.assign({
                returnTo: "canvas"
            }, o));
        }
        function nc(u, c, a) {
            var o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : { frameTimer: "full" }, d = new si(u);
            d.loadImage(function () {
                d.toArray(c, function (f) {
                    typeof a == "function" && a(f);
                }, o);
            });
        }
        function zh(u, c) {
            var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, o = new si(u);
            o.loadImage(function () {
                typeof c == "function" && c(o.toHistogram(a));
            });
        }
        function wh(u) {
            for (var c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0.2, a = [], o = 0; o < u.length; o++) {
                var d = u[o];
                if (o == 0) {
                    a[o] = [];
                    continue;
                }
                if (o == u.length - 1) {
                    a[o] = [];
                    continue;
                }
                var f = u[o - 1], v = u[o + 1];
                (v[1] - f[1]) / (v[0] - f[0]);
                var x = [f[0] + (v[0] - f[0]) * c, f[1] + (v[1] - f[1]) * c], k = [
                    [].concat(te(f)),
                    /* start */
                    [].concat(x)
                    /* end */
                ], S = Math.sqrt(Math.pow(d[0] - f[0], 2) + Math.pow(d[1] - f[1], 2)), R = Math.sqrt(Math.pow(v[0] - d[0], 2) + Math.pow(v[1] - d[1], 2)), w = S / R, F = k[0][0] + (k[1][0] - k[0][0]) * w, Q = k[0][1] + (k[1][1] - k[0][1]) * w;
                k[0][0] += d[0] - F, k[0][1] += d[1] - Q, k[1][0] += d[0] - F, k[1][1] += d[1] - Q, a[o] = k;
            }
            return a;
        }
        function Jh(u, c) {
            var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : { width: 200, height: 100 }, o = new si(u);
            o.loadImage(function () {
                Yn.createHistogram(a.width || 200, a.height || 100, o.toHistogram(a), function (d) {
                    typeof c == "function" && c(d.toDataURL("image/png"));
                }, a);
            });
        }
        var Mh = {
            palette: Th,
            ImageToCanvas: Nh,
            ImageToHistogram: Jh,
            ImageToRGB: Hh,
            ImageToURL: nc,
            // GLToCanvas,
            histogram: zh,
            histogramToPoints: wh
        }, be = z({}, s, G, Zh, _0, mh, oh, lh, dh, J, ch, Mh);
        function Kn(u) {
            return typeof u > "u" || u === null;
        }
        function ot(u) {
            return Kn(u) === !1;
        }
        function vo(u) {
            return typeof u == "string";
        }
        function Qa(u) {
            return typeof u == "function";
        }
        function ic(u) {
            return typeof u == "number";
        }
        var Gt = [{ rgb: "#ff0000", start: 0 }, { rgb: "#ffff00", start: 0.17 }, { rgb: "#00ff00", start: 0.33 }, { rgb: "#00ffff", start: 0.5 }, { rgb: "#0000ff", start: 0.67 }, { rgb: "#ff00ff", start: 0.83 }, { rgb: "#ff0000", start: 1 }];
        function Da(u) {
            for (var c, a, o = 0; o < Gt.length; o++)
                if (Gt[o].start >= u) {
                    c = Gt[o - 1], a = Gt[o];
                    break;
                }
            return c && a ? be.mix(c.rgb, a.rgb, (u - c.start) / (a.start - c.start)) : Gt[0].rgb;
        }
        function Fh(u) {
            for (var c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0.1, a = arguments[2], o = Kn(a) ? u - c : c, d = Kn(a) ? u + scale : a, f = [], v = 0; v < Gt.length; v++) {
                var x = Gt[v];
                o <= x.start && x.start < d ? f.push({ rgb: x.rgb, start: x.start }) : Gt[v + 1] && x.start < o && o < Gt[v + 1].start ? f.push({ rgb: Da(o), start: o }) : Gt[v - 1] && Gt[v - 1].start < d && d < x.start ? f.push({ rgb: Da(d), start: d }) : x.start < o || x.start > d || f.push({ rgb: x.rgb, start: x.start });
            }
            return f;
        }
        function $h() {
            for (var u = 0, c = Gt.length; u < c; u++) {
                var a = Gt[u], o = be.parse(a.rgb);
                a.r = o.r, a.g = o.g, a.b = o.b;
            }
        }
        $h();
        var _a = {
            colors: Gt,
            checkHueColor: Da,
            getHueScale: Fh
        }, Tn = {
            identity: function () {
                return [1, 0, 0, 0, 1, 0, 0, 0, 1];
            },
            stretching: function (c) {
                return [c, 0, 0, 0, 1, 0, 0, 0, 1];
            },
            squeezing: function (c) {
                return [c, 0, 0, 0, 1 / c, 0, 0, 0, 1];
            },
            scale: function () {
                var c = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1, a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
                return c = c || c === 0 ? c : 1, a = a || a === 0 ? a : 1, [c, 0, 0, 0, a, 0, 0, 0, 1];
            },
            scaleX: function (c) {
                return this.scale(c);
            },
            scaleY: function (c) {
                return this.scale(1, c);
            },
            translate: function (c, a) {
                return [1, 0, c, 0, 1, a, 0, 0, 1];
            },
            rotate: function (c) {
                var a = this.radian(c);
                return [Math.cos(a), -Math.sin(a), 0, Math.sin(a), Math.cos(a), 0, 0, 0, 1];
            },
            rotate90: function () {
                return [0, -1, 0, 1, 0, 0, 0, 0, 1];
            },
            rotate180: function () {
                return [-1, 0, 0, 0, -1, 0, 0, 0, 1];
            },
            rotate270: function () {
                return [0, 1, 0, -1, 0, 0, 0, 0, 1];
            },
            radian: function (c) {
                return c * Math.PI / 180;
            },
            skew: function (c, a) {
                var o = this.radian(c), d = this.radian(a);
                return [1, Math.tan(o), 0, Math.tan(d), 1, 0, 0, 0, 1];
            },
            skewX: function (c) {
                var a = this.radian(c);
                return [1, Math.tan(a), 0, 0, 1, 0, 0, 0, 1];
            },
            skewY: function (c) {
                var a = this.radian(c);
                return [1, 0, 0, Math.tan(a), 1, 0, 0, 0, 1];
            },
            shear1: function (c) {
                return [1, -Math.tan(this.radian(c) / 2), 0, 0, 1, 0, 0, 0, 1];
            },
            shear2: function (c) {
                return [1, 0, 0, Math.sin(this.radian(c)), 1, 0, 0, 0, 1];
            }
        }, Et = {
            CONSTANT: Tn,
            radian: function (c) {
                return Tn.radian(c);
            },
            multiply: function (c, a) {
                return [c[0] * a[0] + c[1] * a[1] + c[2] * a[2], c[3] * a[0] + c[4] * a[1] + c[5] * a[2], c[6] * a[0] + c[7] * a[1] + c[8] * a[2]];
            },
            identity: function (c) {
                return this.multiply(Tn.identity(), c);
            },
            translate: function (c, a, o) {
                return this.multiply(Tn.translate(c, a), o);
            },
            rotate: function (c, a) {
                return this.multiply(Tn.rotate(c), a);
            },
            shear1: function (c, a) {
                return this.multiply(Tn.shear1(c), a);
            },
            shear2: function (c, a) {
                return this.multiply(Tn.shear2(c), a);
            },
            rotateShear: function (c, a) {
                var o = a;
                return o = this.shear1(c, o), o = this.shear2(c, o), o = this.shear1(c, o), o;
            }
        };
        function Uh() {
            var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, a = arguments[2], o = arguments[3], d = Nn(a * o * 4, a, o);
            return function (f, v) {
                for (var x = c, k = 0; x < o; x++, k++)
                    for (var S = u, R = 0; S < a; S++, R++)
                        d.pixels[k * a * R] = f.pixels[x * a * S];
                v(d);
            };
        }
        function jh(u, c) {
            return function (a, o) {
                var d = Yn.drawPixels(a), f = d.getContext("2d");
                d.width = u, d.height = c, o({
                    pixels: new Uint8ClampedArray(f.getImageData(0, 0, u, c).data),
                    width: u,
                    height: c
                });
            };
        }
        function Eh() {
            return function (u, c) {
                for (var a = u.width, o = u.height, d = o % 2 == 1 ? 1 : 0, f = d ? Math.floor(o / 2) : o / 2, v = 0; v < f; v++)
                    for (var x = 0; x < a; x++) {
                        var k = v * a + x << 2, S = (o - 1 - v) * a + x << 2;
                        Rc(u.pixels, k, S);
                    }
                c(u);
            };
        }
        function Ph() {
            return function (u, c) {
                for (var a = u.width, o = u.height, d = a % 2 == 1 ? 1 : 0, f = d ? Math.floor(a / 2) : a / 2, v = 0; v < o; v++)
                    for (var x = 0; x < f; x++) {
                        var k = v * a + x << 2, S = v * a + (a - 1 - x) << 2;
                        Rc(u.pixels, k, S);
                    }
                c(u);
            };
        }
        function qa(u) {
            var c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "center", a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "center";
            return function (o, d) {
                var f = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, v = Nn(o.pixels.length, o.width, o.height), x = o.width, k = o.height;
                c == "center" && (c = Math.floor(x / 2)), a == "center" && (a = Math.floor(k / 2));
                var S = Et.CONSTANT.translate(-c, -a), R = Et.CONSTANT.translate(c, a), w = Et.CONSTANT.shear1(u), F = Et.CONSTANT.shear2(u);
                el(function (Q, O, A, ee) {
                    var ae = Et.multiply(S, [A, ee, 1]);
                    ae = Et.multiply(w, ae).map(Math.round), ae = Et.multiply(F, ae).map(Math.round), ae = Et.multiply(w, ae).map(Math.round), ae = Et.multiply(R, ae);
                    var pe = ae, xe = q(pe, 2), Ye = xe[0], Re = xe[1];
                    if (!(Ye < 0) && !(Re < 0) && !(Ye > x - 1) && !(Re > k - 1)) {
                        var Ae = Re * x + Ye << 2;
                        nl(Q, Ae, o.pixels, O);
                    }
                })(v, function () {
                    d(v);
                }, f);
            };
        }
        function Bh() {
            var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
            return u = me(u), u = u % 360, function (c, a) {
                var o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                if (u == 0)
                    return c;
                if (u == 90 || u == 270)
                    var d = Nn(c.pixels.length, c.height, c.width);
                else if (u == 180)
                    var d = Nn(c.pixels.length, c.width, c.height);
                else
                    return qa(u)(c, a, o);
                el(function (f, v, x, k) {
                    if (u == 90)
                        var S = x * d.width + (d.width - 1 - k) << 2;
                    else if (u == 270)
                        var S = (d.height - 1 - x) * d.width + k << 2;
                    else if (u == 180)
                        var S = (d.height - 1 - k) * d.width + (d.width - 1 - x) << 2;
                    nl(d.pixels, S, c.pixels, v);
                })(c, function () {
                    a(d);
                }, o);
            };
        }
        function Oh() {
            for (var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "gray", c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], a = [], o = 0; o < c.length - 1; o++)
                for (var d = c[o], f = c[o + 1], v = f[0] - d[0], x = f[1] - d[1], k = x / v, S = 0, R = d[0]; S < v; S++, R++)
                    a[R] = d[1] + S * k;
            return a[255] = 255, u === "red" ? ke(function () {
                $r = a[$r];
            }, {}, { $realPoints: a }) : u === "green" ? ke(function () {
                $g = a[$g];
            }, {}, { $realPoints: a }) : u === "blue" ? ke(function () {
                $b = a[$b];
            }, {}, { $realPoints: a }) : ke(function () {
                var w = Color.RGBtoYCrCb($r, $g, $b), F = Color.YCrCbtoRGB(clamp(a[clamp(w.y)]), w.cr, w.cb, 0);
                $r = F.r, $g = F.g, $b = F.b;
            }, {}, { $realPoints: a });
        }
        var Ah = {
            crop: Uh,
            resize: jh,
            flipH: Ph,
            flipV: Eh,
            rotate: Bh,
            rotateDegree: qa,
            histogram: Oh,
            "rotate-degree": qa
        };
        function Qh(u, c) {
            var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 100, o = be.parse(u), d = be.parse(c), f = a;
            return ke(`        
        const thresholdColor = ( $r + $g + $b ) <= $threshold ? $darkColor : $lightColor

        $r = thresholdColor.r;
        $g = thresholdColor.g;
        $b = thresholdColor.b; 
    `, {
                $threshold: f
            }, {
                $darkColor: o,
                $lightColor: d
            });
        }
        function Dh() {
            var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
            u = me(u);
            var c = Math.floor(255 * (u / 100));
            return ke(`
        $r += $C;
        $g += $C;
        $b += $C;
    `, { $C: c });
        }
        function _h() {
            var u = [0.5997023498159715, 0.34553243048391263, -0.2708298674538042, 0, -0.037703249837783157, 0.8609577587992641, 0.15059552388459913, 0, 0.24113635128153335, -0.07441037908422492, 0.44972182064877153, 0, 0, 0, 0, 1];
            return ke(`
        $r = $matrix[0] * $r + $matrix[1] * $g + $matrix[2] * $b + $matrix[3] * $a;
        $g = $matrix[4] * $r + $matrix[5] * $g + $matrix[6] * $b + $matrix[7] * $a;
        $b = $matrix[8] * $r + $matrix[9] * $g + $matrix[10] * $b + $matrix[11] * $a;
        $a = $matrix[12] * $r + $matrix[13] * $g + $matrix[14] * $b + $matrix[15] * $a;        
    `, {
                $matrix: u
            });
        }
        function qh() {
            var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
            u = me(u);
            var c = Math.abs(u) * 2.55;
            return ke(`

        $r = ($r > 255 - $C) ? 255 : 0;
        $g = ($g > 255 - $C) ? 255 : 0;
        $b = ($b > 255 - $C) ? 255 : 0;

    `, { $C: c });
        }
        function ep() {
            var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
            u = me(u);
            var c = Math.max((128 + u) / 128, 0);
            return ke(`
        $r *= $C;
        $g *= $C;
        $b *= $C;
    `, { $C: c });
        }
        function tp() {
            var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1, c = me(u);
            return ke(`
        $r = Math.pow($r / 255, $C) * 255;
        $g = Math.pow($g / 255, $C) * 255;
        $b = Math.pow($b / 255, $C) * 255;
    `, { $C: c });
        }
        function np() {
            var u = [].concat(Array.prototype.slice.call(arguments));
            u.length === 1 && typeof u[0] == "string" && (u = be.convertMatchesArray(u[0])), u = u.map(function (o) {
                var d = be.matches(o);
                return d.length ? { type: "param", value: o } : { type: "scale", value: o };
            });
            var c = u.filter(function (o) {
                return o.type == "scale";
            })[0];
            c = c ? +c.value : 256, u = u.filter(function (o) {
                return o.type == "param";
            }).map(function (o) {
                return o.value;
            }).join(",");
            var a = be.gradient(u, c).map(function (o) {
                var d = be.parse(o), f = d.r, v = d.g, x = d.b, k = d.a;
                return { r: f, g: v, b: x, a: k };
            });
            return ke(`
        const colorIndex = clamp(Math.ceil($r * 0.2126 + $g * 0.7152 + $b * 0.0722));
        const newColorIndex = clamp(Math.floor(colorIndex * ($scale / 256)));
        const color = $colors[newColorIndex];

        $r = color.r; 
        $g = color.g; 
        $b = color.b; 
        $a = clamp(Math.floor(color.a * 256));
    `, {}, { $colors: a, $scale: c });
        }
        function ip(u) {
            u = me(u);
            var c = u / 100;
            c > 1 && (c = 1);
            var a = [0.2126 + 0.7874 * (1 - c), 0.7152 - 0.7152 * (1 - c), 0.0722 - 0.0722 * (1 - c), 0, 0.2126 - 0.2126 * (1 - c), 0.7152 + 0.2848 * (1 - c), 0.0722 - 0.0722 * (1 - c), 0, 0.2126 - 0.2126 * (1 - c), 0.7152 - 0.7152 * (1 - c), 0.0722 + 0.9278 * (1 - c), 0, 0, 0, 0, 1];
            return ke(`
        $r = $matrix[0] * $r + $matrix[1] * $g + $matrix[2] * $b + $matrix[3] * $a;
        $g = $matrix[4] * $r + $matrix[5] * $g + $matrix[6] * $b + $matrix[7] * $a;
        $b = $matrix[8] * $r + $matrix[9] * $g + $matrix[10] * $b + $matrix[11] * $a;
        $a = $matrix[12] * $r + $matrix[13] * $g + $matrix[14] * $b + $matrix[15] * $a;
    `, {
                $matrix: a
            });
        }
        function op() {
            var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 360, c = me(u);
            return ke(`
        var hsv = Color.RGBtoHSV($r, $g, $b);

        // 0 ~ 360 
        var h = hsv.h;
        h += Math.abs($C);
        h = h % 360;
        hsv.h = h;

        var rgb = Color.HSVtoRGB(hsv);

        $r = rgb.r;
        $g = rgb.g;
        $b = rgb.b;
    `, {
                $C: c
            });
        }
        function ap() {
            var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 100;
            u = me(u);
            var c = u / 100;
            return ke(`
        $r = (255 - $r) * $C;
        $g = (255 - $g) * $C;
        $b = (255 - $b) * $C;
    `, {
                $C: c
            });
        }
        function lp() {
            var u = [1.1285582396593525, -0.3967382283601348, -0.03992559172921793, 0, -0.16404339962244616, 1.0835251566291304, -0.05498805115633132, 0, -0.16786010706155763, -0.5603416277695248, 1.6014850761964943, 0, 0, 0, 0, 1];
            return ke(`
        $r = $matrix[0] * $r + $matrix[1] * $g + $matrix[2] * $b + $matrix[3] * $a;
        $g = $matrix[4] * $r + $matrix[5] * $g + $matrix[6] * $b + $matrix[7] * $a;
        $b = $matrix[8] * $r + $matrix[9] * $g + $matrix[10] * $b + $matrix[11] * $a;
        $a = $matrix[12] * $r + $matrix[13] * $g + $matrix[14] * $b + $matrix[15] * $a;
    `, {
                $matrix: u
            });
        }
        function rp() {
            var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0, d = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0, f = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 0, v = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : 0, x = arguments.length > 7 && arguments[7] !== void 0 ? arguments[7] : 0, k = arguments.length > 8 && arguments[8] !== void 0 ? arguments[8] : 0, S = arguments.length > 9 && arguments[9] !== void 0 ? arguments[9] : 0, R = arguments.length > 10 && arguments[10] !== void 0 ? arguments[10] : 0, w = arguments.length > 11 && arguments[11] !== void 0 ? arguments[11] : 0, F = arguments.length > 12 && arguments[12] !== void 0 ? arguments[12] : 0, Q = arguments.length > 13 && arguments[13] !== void 0 ? arguments[13] : 0, O = arguments.length > 14 && arguments[14] !== void 0 ? arguments[14] : 0, A = arguments.length > 15 && arguments[15] !== void 0 ? arguments[15] : 0, ee = [u, c, a, o, d, f, v, x, k, S, R, w, F, Q, O, A];
            return ke(`
        $r = $matrix[0] * $r + $matrix[1] * $g + $matrix[2] * $b + $matrix[3] * $a;
        $g = $matrix[4] * $r + $matrix[5] * $g + $matrix[6] * $b + $matrix[7] * $a;
        $b = $matrix[8] * $r + $matrix[9] * $g + $matrix[10] * $b + $matrix[11] * $a;
        $a = $matrix[12] * $r + $matrix[13] * $g + $matrix[14] * $b + $matrix[15] * $a;
    `, {
                $matrix: ee
            });
        }
        function cp() {
            var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1, c = me(u);
            return ke(`
        const C = Math.abs($C) * 5;
        const min = -C;
        const max = C;
        const noiseValue = Math.round(min + (Math.random() * (max - min)));

        $r += noiseValue;
        $g += noiseValue;
        $b += noiseValue;
    `, {
                $C: c
            });
        }
        function sp() {
            var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 100;
            u = me(u);
            var c = u / 100;
            return ke(`
        $a *= $C; 
    `, { $C: c });
        }
        function dp() {
            var u = [1.438, -0.062, -0.062, 0, -0.122, 1.378, -0.122, 0, -0.016, -0.016, 1.483, 0, 0, 0, 0, 1];
            return ke(`
        $r = $matrix[0] * $r + $matrix[1] * $g + $matrix[2] * $b + $matrix[3] * $a;
        $g = $matrix[4] * $r + $matrix[5] * $g + $matrix[6] * $b + $matrix[7] * $a;
        $b = $matrix[8] * $r + $matrix[9] * $g + $matrix[10] * $b + $matrix[11] * $a;
        $a = $matrix[12] * $r + $matrix[13] * $g + $matrix[14] * $b + $matrix[15] * $a;
    `, {
                $matrix: u
            });
        }
        function up() {
            var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 100;
            u = me(u);
            var c = u / 100, a = 1 - Math.abs(c), o = [a, 0, 0, 0, 0, a, 0, 0, 0, 0, a, 0, 0, 0, 0, a];
            return ke(`
        $r = $matrix[0] * $r + $matrix[1] * $g + $matrix[2] * $b + $matrix[3] * $a;
        $g = $matrix[4] * $r + $matrix[5] * $g + $matrix[6] * $b + $matrix[7] * $a;
        $b = $matrix[8] * $r + $matrix[9] * $g + $matrix[10] * $b + $matrix[11] * $a;
        $a = $matrix[12] * $r + $matrix[13] * $g + $matrix[14] * $b + $matrix[15] * $a;        
    `, {
                $matrix: o
            });
        }
        function mp() {
            var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1, c = me(u);
            c > 1 && (c = 1);
            var a = [0.393 + 0.607 * (1 - c), 0.769 - 0.769 * (1 - c), 0.189 - 0.189 * (1 - c), 0, 0.349 - 0.349 * (1 - c), 0.686 + 0.314 * (1 - c), 0.168 - 0.168 * (1 - c), 0, 0.272 - 0.272 * (1 - c), 0.534 - 0.534 * (1 - c), 0.131 + 0.869 * (1 - c), 0, 0, 0, 0, 1];
            return ke(`
        $r = $matrix[0] * $r + $matrix[1] * $g + $matrix[2] * $b + $matrix[3] * $a;
        $g = $matrix[4] * $r + $matrix[5] * $g + $matrix[6] * $b + $matrix[7] * $a;
        $b = $matrix[8] * $r + $matrix[9] * $g + $matrix[10] * $b + $matrix[11] * $a;
        $a = $matrix[12] * $r + $matrix[13] * $g + $matrix[14] * $b + $matrix[15] * $a;        
    `, {
                $matrix: a
            });
        }
        function hp() {
            var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1, c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1, o = me(u), d = me(c), f = me(a);
            return ke(`
        $r *= $redValue;
        $g *= $greenValue;
        $b *= $blueValue;
    `, {
                $redValue: o,
                $greenValue: d,
                $blueValue: f
            });
        }
        function pp() {
            var u = [1.438, -0.062, -0.062, 0, -0.122, 1.378, -0.122, 0, -0.016, -0.016, 1.483, 0, 0, 0, 0, 1];
            return ke(`
        $r = $matrix[0] * $r + $matrix[1] * $g + $matrix[2] * $b + $matrix[3] * $a;
        $g = $matrix[4] * $r + $matrix[5] * $g + $matrix[6] * $b + $matrix[7] * $a;
        $b = $matrix[8] * $r + $matrix[9] * $g + $matrix[10] * $b + $matrix[11] * $a;
        $a = $matrix[12] * $r + $matrix[13] * $g + $matrix[14] * $b + $matrix[15] * $a;        
    `, {
                $matrix: u
            });
        }
        function bp(u, c, a) {
            var o = me(u), d = me(c), f = me(a);
            return ke(`
        $r = ($r < $redValue) ? 255 - $r: $r;
        $g = ($g < $greenValue) ? 255 - $g: $g;
        $b = ($b < $blueValue) ? 255 - $b: $b;
    `, {
                $redValue: o,
                $greenValue: d,
                $blueValue: f
            });
        }
        function fp() {
            var u = [1.9125277891456083, -0.8545344976951645, -0.09155508482755585, 0, -0.3087833385928097, 1.7658908555458428, -0.10601743074722245, 0, -0.231103377548616, -0.7501899197440212, 1.847597816108189, 0, 0, 0, 0, 1];
            return ke(`
        $r = $matrix[0] * $r + $matrix[1] * $g + $matrix[2] * $b + $matrix[3] * $a;
        $g = $matrix[4] * $r + $matrix[5] * $g + $matrix[6] * $b + $matrix[7] * $a;
        $b = $matrix[8] * $r + $matrix[9] * $g + $matrix[10] * $b + $matrix[11] * $a;
        $a = $matrix[12] * $r + $matrix[13] * $g + $matrix[14] * $b + $matrix[15] * $a;
    `, {
                $matrix: u
            });
        }
        function oc() {
            var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 200, c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 100, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, o = me(u);
            c = me(c);
            var d = c / 100, f = a;
            return ke(`
        // refer to Color.brightness 
        const v = ($C * Math.ceil($r * 0.2126 + $g * 0.7152 + $b * 0.0722) ) >= $scale ? 255 : 0;

        if ($hasColor) {

            if (v == 0) {
                $r = 0; 
                $g = 0; 
                $b = 0;
            }
            
        } else {
            const value = Math.round(v);
            $r = value; 
            $g = value;
            $b = value; 
        }
        
    `, {
                $C: d,
                $scale: o,
                $hasColor: f
            });
        }
        function gp() {
            var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 200, c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 100;
            return oc(u, c, !1);
        }
        function yp() {
            var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1, c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1, o = me(u), d = me(c), f = me(a);
            return ke(`

        $r += (255 - $r) * $redTint;
        $g += (255 - $g) * $greenTint;
        $b += (255 - $b) * $blueTint;

    `, {
                $redTint: o,
                $greenTint: d,
                $blueTint: f
            });
        }
        var Zp = {
            bitonal: Qh,
            brightness: Dh,
            brownie: _h,
            clip: qh,
            contrast: ep,
            gamma: tp,
            gradient: np,
            grayscale: ip,
            hue: op,
            invert: ap,
            kodachrome: lp,
            matrix: rp,
            noise: cp,
            opacity: sp,
            polaroid: dp,
            saturation: up,
            sepia: mp,
            shade: hp,
            shift: pp,
            solarize: bp,
            technicolor: fp,
            threshold: gp,
            "threshold-color": oc,
            tint: yp
        };
        function vp() {
            var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 3;
            return u = me(u), Oe(Lc(u));
        }
        function xp() {
            var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 4;
            return u = me(u), Oe([u * -2, -u, 0, -u, 1, u, 0, u, u * 2]);
        }
        function ac() {
            var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 100;
            u = me(u);
            var c = u / 100;
            return Oe(Xt([1, 2, 1, 2, 4, 2, 1, 2, 1], 1 / 16 * c));
        }
        function lc() {
            var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 100;
            u = me(u);
            var c = u / 100;
            return Oe(Xt([1, 4, 6, 4, 1, 4, 16, 24, 16, 4, 6, 24, 36, 24, 6, 4, 16, 24, 16, 4, 1, 4, 6, 4, 1], 1 / 256 * c));
        }
        function Gp() {
            var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 100;
            return u = me(u), Oe(Xt([0.3, 0.3, 0.3, 0, 0, 0.59, 0.59, 0.59, 0, 0, 0.11, 0.11, 0.11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], u / 100));
        }
        function Xp() {
            return Oe([0, 0, 0, 0, 1, 0, 0, 0, 0]);
        }
        function rc() {
            var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
            return u = me(u), Oe([5, 5, 5, -3, 0, -3, -3, -3, -3]);
        }
        function cc() {
            var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
            return u = me(u), Oe([5, -3, -3, 5, 0, -3, 5, -3, -3]);
        }
        function Wp() {
            var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 100;
            return u = me(u), Oe(Xt([-1, -1, -1, -1, 8, -1, -1, -1, -1], u / 100));
        }
        function sc() {
            var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 100;
            return u = me(u), Oe(Xt([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 24, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], u / 100));
        }
        function dc() {
            return Oe(Xt([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 1 / 9));
        }
        function uc() {
            return Oe(Xt([1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1], 1 / 9));
        }
        function mc() {
            return Oe(Xt([1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1], 1 / 9));
        }
        function Vp() {
            var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 100;
            return u = me(u), Oe(Xt([-1, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1], u / 100));
        }
        function Ip() {
            var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 100;
            return u = me(u), Oe(Xt([0.393, 0.349, 0.272, 0, 0, 0.769, 0.686, 0.534, 0, 0, 0.189, 0.168, 0.131, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], u / 100));
        }
        function kp() {
            var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 100;
            return u = me(u), Oe(Xt([0, -1, 0, -1, 5, -1, 0, -1, 0], u / 100));
        }
        function hc() {
            return Oe([-1, -2, -1, 0, 0, 0, 1, 2, 1]);
        }
        function pc() {
            return Oe([-1, 0, 1, -2, 0, 2, -1, 0, 1]);
        }
        var bc = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259], fc = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];
        function xo() {
            this.r = 0, this.g = 0, this.b = 0, this.a = 0, this.next = null;
        }
        function Cp(u, c, a) {
            return a ? gc(u, 0, 0, c) : stackBlurCanvasRGB(u, 0, 0, c);
        }
        function gc(u, c, a, o) {
            if (isNaN(o) || o < 1)
                return u;
            o |= 0;
            var d = u.pixels, f = u.width, v = u.height, x, k, S, R, w, F, Q, O, A, ee, ae, pe, xe, Ye, Re, Ae, He, Ne, ze, Qe, mt = o + o + 1, tt = f - 1, ve = v - 1, we = o + 1, yn = we * (we + 1) / 2, Ft = new xo(), Xe = Ft;
            for (S = 1; S < mt; S++)
                if (Xe = Xe.next = new xo(), S == we)
                    var qe = Xe;
            Xe.next = Ft;
            var Le = null, nt = null;
            Q = F = 0;
            var he = bc[o], nn = fc[o];
            for (k = 0; k < v; k++) {
                for (Ye = Re = Ae = O = A = ee = 0, ae = we * (He = d[F]), pe = we * (Ne = d[F + 1]), xe = we * (ze = d[F + 2]), O += yn * He, A += yn * Ne, ee += yn * ze, Xe = Ft, S = 0; S < we; S++)
                    Xe.r = He, Xe.g = Ne, Xe.b = ze, Xe = Xe.next;
                for (S = 1; S < we; S++)
                    R = F + ((tt < S ? tt : S) << 2), O += (Xe.r = He = d[R]) * (Qe = we - S), A += (Xe.g = Ne = d[R + 1]) * Qe, ee += (Xe.b = ze = d[R + 2]) * Qe, Ye += He, Re += Ne, Ae += ze, Xe = Xe.next;
                for (Le = Ft, nt = qe, x = 0; x < f; x++)
                    d[F] = O * he >> nn, d[F + 1] = A * he >> nn, d[F + 2] = ee * he >> nn, O -= ae, A -= pe, ee -= xe, ae -= Le.r, pe -= Le.g, xe -= Le.b, R = Q + ((R = x + o + 1) < tt ? R : tt) << 2, Ye += Le.r = d[R], Re += Le.g = d[R + 1], Ae += Le.b = d[R + 2], O += Ye, A += Re, ee += Ae, Le = Le.next, ae += He = nt.r, pe += Ne = nt.g, xe += ze = nt.b, Ye -= He, Re -= Ne, Ae -= ze, nt = nt.next, F += 4;
                Q += f;
            }
            for (x = 0; x < f; x++) {
                for (Re = Ae = Ye = A = ee = O = 0, F = x << 2, ae = we * (He = d[F]), pe = we * (Ne = d[F + 1]), xe = we * (ze = d[F + 2]), O += yn * He, A += yn * Ne, ee += yn * ze, Xe = Ft, S = 0; S < we; S++)
                    Xe.r = He, Xe.g = Ne, Xe.b = ze, Xe = Xe.next;
                for (w = f, S = 1; S <= o; S++)
                    F = w + x << 2, O += (Xe.r = He = d[F]) * (Qe = we - S), A += (Xe.g = Ne = d[F + 1]) * Qe, ee += (Xe.b = ze = d[F + 2]) * Qe, Ye += He, Re += Ne, Ae += ze, Xe = Xe.next, S < ve && (w += f);
                for (F = x, Le = Ft, nt = qe, k = 0; k < v; k++)
                    R = F << 2, d[R] = O * he >> nn, d[R + 1] = A * he >> nn, d[R + 2] = ee * he >> nn, O -= ae, A -= pe, ee -= xe, ae -= Le.r, pe -= Le.g, xe -= Le.b, R = x + ((R = k + we) < ve ? R : ve) * f << 2, O += Ye += Le.r = d[R], A += Re += Le.g = d[R + 1], ee += Ae += Le.b = d[R + 2], Le = Le.next, ae += He = nt.r, pe += Ne = nt.g, xe += ze = nt.b, Ye -= He, Re -= Ne, Ae -= ze, nt = nt.next, F += f;
            }
            return u;
        }
        function yc() {
            var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 10, c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
            return u = me(u), function (a, o) {
                var d = Cp(a, u, c);
                o(d);
            };
        }
        function Sp() {
            var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 100;
            return u = me(u), Oe(Xt([1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0.3, 0, 0, 0, 0, 0, 1], u / 100));
        }
        function Zc() {
            var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 256;
            return u = me(u), Oe(Xt([1, 4, 6, 4, 1, 4, 16, 24, 16, 4, 6, 24, -476, 24, 6, 4, 16, 24, 16, 4, 1, 4, 6, 4, 1], -1 / u));
        }
        var Rp = {
            blur: vp,
            emboss: xp,
            gaussianBlur: ac,
            "gaussian-blur": ac,
            gaussianBlur5x: lc,
            "gaussian-blur-5x": lc,
            grayscale2: Gp,
            normal: Xp,
            kirschHorizontal: rc,
            "kirsch-horizontal": rc,
            kirschVertical: cc,
            "kirsch-vertical": cc,
            laplacian: Wp,
            laplacian5x: sc,
            "laplacian-5x": sc,
            motionBlur: dc,
            "motion-blur": dc,
            motionBlur2: uc,
            "motion-blur-2": uc,
            motionBlur3: mc,
            "motion-blur-3": mc,
            negative: Vp,
            sepia2: Ip,
            sharpen: kp,
            sobelHorizontal: hc,
            "sobel-horizontal": hc,
            sobelVertical: pc,
            "sobel-vertical": pc,
            stackBlur: yc,
            "stack-blur": yc,
            transparency: Sp,
            unsharpMasking: Zc,
            "unsharp-masking": Zc
        };
        function Lp() {
            return Mi("kirsch-horizontal kirsch-vertical");
        }
        function Yp() {
            return Mi("sobel-horizontal sobel-vertical");
        }
        function Kp() {
            return Mi("brightness(15) saturation(-20) gamma(1.8)");
        }
        var Tp = {
            kirsch: Lp,
            sobel: Yp,
            vintage: Kp
        }, vc = z({}, Ah, Zp, Rp, Tp), Hn, xc = 0, Gc = (Hn = {
            partial: Hc,
            multi: il,
            merge: Go,
            weight: Xt,
            repeat: Xc,
            colorMatrix: Np,
            each: Vc,
            eachXY: Ic,
            createRandomCount: Jp,
            createRandRange: wp,
            createBitmap: Nn,
            createBlurMatrix: Lc,
            pack: Up,
            packXY: el,
            pixel: ke,
            getBitmap: kc,
            putBitmap: Cc,
            radian: Op,
            convolution: Oe,
            parseParamNumber: me,
            filter: Mi,
            clamp: Tc,
            fillColor: tl,
            fillPixelColor: nl
        }, T(Hn, "multi", il), T(Hn, "merge", Go), T(Hn, "matches", Yc), T(Hn, "parseFilter", Kc), T(Hn, "partial", Hc), Hn), Hp = Gc;
        function Xt(u) {
            var c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
            return u.map(function (a) {
                return a * c;
            });
        }
        function Xc(u, c) {
            for (var a = new Array(c), o = 0; o < c; o++)
                a[o] = u;
            return a;
        }
        function Np(u, c, a) {
            var o = u[c], d = u[c + 1], f = u[c + 2], v = u[c + 3];
            tl(u, c, a[0] * o + a[1] * d + a[2] * f + a[3] * v, a[4] * o + a[5] * d + a[6] * f + a[7] * v, a[8] * o + a[9] * d + a[10] * f + a[11] * v, a[12] * o + a[13] * d + a[14] * f + a[15] * v);
        }
        function zp(u) {
            if (typeof u == "function")
                return u;
            typeof u == "string" && (u = [u]), u = u.slice(0);
            var c = u.shift();
            if (typeof c == "function")
                return c;
            var a = u, o = vc[c] || Hp[c];
            if (!o)
                throw new Error(c + " is not filter. please check filter name.");
            return o.apply(o, a);
        }
        function Wc(u) {
            var c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1, o = arguments[3], d = arguments[4], f = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 1e4, v = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : "full", x = arguments.length > 7 && arguments[7] !== void 0 ? arguments[7] : 50, k = c, S = function (O) {
                setTimeout(O, 0);
            };
            v == "requestAnimationFrame" && (S = requestAnimationFrame, f = 1e3), v == "full" && (S = null, f = u);
            function R() {
                var Q = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 50, O = [].concat(te(Array(Q))), A = O.map(function (ae) {
                    return "cri = ri + i * s; if (cri >= mx) return {currentRunIndex: cri, i: null}; c(cri); i++;";
                }).join(`
`), ee = new Function("ri", "i", "s", "mx", "c", `
            let cri = ri;
            
            ` + A + `
            
            return {currentRunIndex: cri, i: i} 
        `);
                return ee;
            }
            function w() {
                for (var Q = R(x), O = k, A = {}, ee = 0; ee < f;) {
                    if (A = Q(k, ee, a, u, o), A.i == null) {
                        O = A.currentRunIndex;
                        break;
                    }
                    ee = A.i, O = A.currentRunIndex;
                }
                F(O);
            }
            function F(Q) {
                if (Q ? k = Q : k += a, k >= u) {
                    d();
                    return;
                }
                S ? S(w) : w();
            }
            w();
        }
        function Vc(u, c, a) {
            var o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
            Wc(u, 0, 4, function (d) {
                c(
                    d,
                    d >> 2
                    /* xyIndex */
                );
            }, function () {
                a();
            }, o.functionDumpCount, o.frameTimer, o.loopCount);
        }
        function Ic(u, c, a, o) {
            var d = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {};
            Wc(u, 0, 4, function (f) {
                var v = f >> 2;
                a(f, v % c, Math.floor(v / c));
            }, function () {
                o();
            }, d.functionDumpCount, d.frameTimer, d.loopCount);
        }
        function wp(u, c, a) {
            for (var o = [], d = 1; d <= a; d++) {
                var f = Math.random() * (c - u) + u, v = Math.floor(Math.random() * 10) % 2 == 0 ? -1 : 1;
                o.push(v * f);
            }
            o.sort();
            var x = Math.floor(a >> 1), k = o[x];
            return o[x] = o[0], o[0] = k, o;
        }
        function Jp() {
            return [3 * 3, 4 * 4, 5 * 5, 6 * 6, 7 * 7, 8 * 8, 9 * 9, 10 * 10].sort(function (u, c) {
                return 0.5 - Math.random();
            })[0];
        }
        function Nn(u, c, a) {
            return { pixels: new Uint8ClampedArray(u), width: c, height: a };
        }
        function Mp(u, c, a, o) {
            for (var d = c.pixels.length / 4, f = 0, v = 0, x = 0, k = 0, S = 0, R = 0, w = 0; w < d; w++)
                x = w % c.width, k = Math.floor(w / c.width), f = a + x, v = o + k, !(f > u.width) && (v > u.height || (S = k * c.width + x << 2, R = v * u.width + f << 2, u.pixels[R] = c.pixels[S], u.pixels[R + 1] = c.pixels[S + 1], u.pixels[R + 2] = c.pixels[S + 2], u.pixels[R + 3] = c.pixels[S + 3]));
        }
        function Fp(u, c, a, o) {
            for (var d = c.pixels.length >> 2, f = 0, v = 0, x = 0, k = 0, S = 0, R = 0, w = 0; w < d; w++) {
                var x = w % c.width, k = Math.floor(w / c.width);
                f = a + x, v = o + k, !(f > u.width) && (v > u.height || (S = v * u.width + f << 2, R = k * c.width + x << 2, c.pixels[R] = u.pixels[S], c.pixels[R + 1] = u.pixels[S + 1], c.pixels[R + 2] = u.pixels[S + 2], c.pixels[R + 3] = u.pixels[S + 3]));
            }
        }
        function $p(u) {
            var c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, a = u.width + c, o = u.height + c, d = { pixels: new Uint8ClampedArray(a * o * 4), width: a, height: o };
            return d;
        }
        function kc(u, c) {
            return Yn.getBitmap(u, c);
        }
        function Cc(u, c, a) {
            return Yn.putBitmap(u, c, a);
        }
        function me(u) {
            return typeof u == "string" && (u = u.replace(/deg/, ""), u = u.replace(/px/, "")), +u;
        }
        var Sc = /(([\w_\-]+)(\(([^\)]*)\))?)+/gi;
        function Up(u) {
            return function (c, a) {
                Vc(c.pixels.length, function (o, d) {
                    u(c.pixels, o, d, c.pixels[o], c.pixels[o + 1], c.pixels[o + 2], c.pixels[o + 3]);
                }, function () {
                    a(c);
                });
            };
        }
        function jp(u) {
            var c = u.map(function (v) {
                return ` 
            ` + v.userFunction.$preContext + `

            ` + v.userFunction.$preCallbackString + `

            $r = clamp($r); $g = clamp($g); $b = clamp($b); $a = clamp($a);
        `;
            }).join(`

`), a = { clamp: Tc, Color: be };
            u.forEach(function (v) {
                Object.assign(a, v.userFunction.rootContextObject);
            });
            var o = "const " + Object.keys(a).map(function (v) {
                return " " + v + " = $rc." + v + " ";
            }).join(","), d = ` 
    let $r = $p[$pi], $g = $p[$pi+1], $b = $p[$pi+2], $a = $p[$pi+3];
    
    ` + o + `

    ` + c + `
    
    $p[$pi] = $r; $p[$pi+1] = $g; $p[$pi+2] = $b; $p[$pi+3] = $a;
    `, f = new Function("$p", "$pi", "$rc", d);
            return function (v, x) {
                f(v, x, a);
            };
        }
        function Ep(u) {
            var c = {}, a = u.map(function (x) {
                var k = [];
                Object.keys(x.context).forEach(function (w, F) {
                    k[w] = "n$" + xc++ + w + "$";
                }), Object.keys(x.rootContext).forEach(function (w, F) {
                    k[w] = "r$" + xc++ + w + "$", c[k[w]] = x.rootContext[w];
                });
                var S = Object.keys(x.context).filter(function (w) {
                    return typeof x.context[w] == "number" || typeof x.context[w] == "string" ? !1 : !(Array.isArray(x.context[w]) && (typeof x.context[w][0] == "number" || typeof x.context[w][0] == "string"));
                }).map(function (w, F) {
                    return [k[w], JSON.stringify(x.context[w])].join(" = ");
                }), R = x.callback;
                return typeof x.callback == "function" && (R = x.callback.toString().split("{"), R.shift(), R = R.join("{"), R = R.split("}"), R.pop(), R = R.join("}")), Object.keys(k).forEach(function (w) {
                    var F = k[w];
                    typeof x.context[w] == "number" || typeof x.context[w] == "string" ? R = R.replace(new RegExp("\\" + w, "g"), x.context[w]) : Array.isArray(x.context[w]) ? typeof x.context[w][0] == "number" || typeof x.context[w][0] == "string" ? x.context[w].forEach(function (Q, O) {
                        R = R.replace(new RegExp("\\" + w + "\\[" + O + "\\]", "g"), Q);
                    }) : R = R.replace(new RegExp("\\" + w, "g"), F) : R = R.replace(new RegExp("\\" + w, "g"), F);
                }), { preCallbackString: R, preContext: S };
            }), o = a.map(function (x, k) {
                return x.preContext.length ? "const " + x.preContext + ";" : "";
            }).join(`

`), d = a.map(function (x) {
                return x.preCallbackString;
            }).join(`

`), f = ` 
    let $r = $pixels[$pixelIndex], $g = $pixels[$pixelIndex+1], $b = $pixels[$pixelIndex+2], $a = $pixels[$pixelIndex+3];

    ` + o + `

    ` + d + `
    
    $pixels[$pixelIndex] = $r
    $pixels[$pixelIndex+1] = $g 
    $pixels[$pixelIndex+2] = $b   
    $pixels[$pixelIndex+3] = $a   
    `, v = new Function("$pixels", "$pixelIndex", "$clamp", "$Color", f);
            return v.$preCallbackString = d, v.$preContext = o, v.rootContextObject = c, v;
        }
        function Pp(u) {
            var c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
            return Ep([{ callback: u, context: c, rootContext: a }]);
        }
        function ke(u) {
            var c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, o = Pp(u, c, a), d = function (v, x) {
            };
            return d.userFunction = o, d;
        }
        var Bp = [0, 1, 2, 3];
        function Rc(u, c, a) {
            Bp.forEach(function (o) {
                var d = u[c + o];
                u[c + o] = u[a + o], u[a + o] = d;
            });
        }
        function el(u) {
            return function (c, a) {
                var o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                Ic(c.pixels.length, c.width, function (d, f, v) {
                    u(c.pixels, d, f, v);
                }, function () {
                    a(c);
                }, o);
            };
        }
        function Op(u) {
            return Et.CONSTANT.radian(u);
        }
        function Lc() {
            var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 3, c = Math.pow(u, 2), a = 1 / c;
            return Xc(a, c);
        }
        function tl(u, c, a, o, d, f) {
            if (arguments.length == 3)
                var v = arguments[2], a = v.r, o = v.g, d = v.b, f = v.a;
            typeof a == "number" && (u[c] = a), typeof o == "number" && (u[c + 1] = o), typeof d == "number" && (u[c + 2] = d), typeof f == "number" && (u[c + 3] = f);
        }
        function nl(u, c, a, o) {
            tl(u, c, a[o], a[o + 1], a[o + 2], a[o + 3]);
        }
        function Ap(u) {
            var c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 255, o = [];
            return o = u.map(function (d, f) {
                return [];
            }), u.forEach(function (d, f) {
                if (d != 0)
                    for (var v = o[f], f = c; f <= a; f++)
                        v[f] = d * f;
            }), o;
        }
        function Qp(u, c, a, o, d) {
            var f = Math.round(Math.sqrt(u.length)), v = Math.floor(f / 2), x = d ? 1 : 0, k = "let r = 0, g = 0, b = 0, a = 0, scy = 0, scx =0, si = 0; ", S = [], R = [], w = [], F = [];
            u.forEach(function (O, A) {
                var ee = Math.floor(A / f), ae = A % f, pe = ee - v, xe = ae - v;
                O != 0 && (S.push("$t[" + A + "][$sp[(($sy + (" + pe + ")) * " + a + " + ($sx + (" + xe + "))) * 4]]"), R.push("$t[" + A + "][$sp[(($sy + (" + pe + ")) * " + a + " + ($sx + (" + xe + "))) * 4 + 1]]"), w.push("$t[" + A + "][$sp[(($sy + (" + pe + ")) * " + a + " + ($sx + (" + xe + "))) * 4 + 2]]"), F.push("$t[" + A + "][$sp[(($sy + (" + pe + ")) * " + a + " + ($sx + (" + xe + "))) * 4 + 3]]"));
            }), k += "r = " + S.join(" + ") + "; g = " + R.join(" + ") + "; b = " + w.join(" + ") + "; a = " + F.join(" + ") + ";", k += "$dp[$di] = r; $dp[$di+1] = g;$dp[$di+2] = b;$dp[$di+3] = a + (" + x + ")*(255-a); ";
            var Q = new Function("$dp", "$sp", "$di", "$sx", "$sy", "$t", k);
            return function (O, A, ee, ae, pe) {
                Q(O, A, ee, ae, pe, c);
            };
        }
        function Oe(u) {
            var c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, a = Ap(u);
            return function (o, d) {
                var f = Math.round(Math.sqrt(u.length)), v = f * 2, x = $p(o, v);
                Mp(x, o, f, f);
                for (var k = Nn(x.pixels.length, x.width, x.height), S = Nn(o.pixels.length, o.width, o.height), R = Qp(u, a, x.width, x.height, c), w = o.pixels.length / 4, F = 0; F < w; F++) {
                    var Q = F, O = Q % o.width + f, A = Math.floor(Q / o.width) + f;
                    R(k.pixels, x.pixels, (A * x.width + O) * 4, O, A);
                }
                Fp(k, S, f, f), d(S);
            };
        }
        function Yc(u) {
            var c = be.convertMatches(u), a = c.str.match(Sc), o = [];
            if (!a)
                return o;
            o = a.map(function (f) {
                return { filter: f, origin: be.reverseMatches(f, c.matches) };
            });
            var d = { next: 0 };
            return o = o.map(function (f) {
                var v = u.indexOf(f.origin, d.next);
                return f.startIndex = v, f.endIndex = v + f.origin.length, f.arr = Kc(f.origin), d.next = f.endIndex, f;
            }).filter(function (f) {
                return !!f.arr.length;
            }), o;
        }
        function Kc(u) {
            var c = be.convertMatches(u), a = c.str.match(Sc);
            if (!a[0])
                return [];
            var o = a[0].split("("), d = o.shift(), f = [];
            o.length && (f = o.shift().split(")")[0].split(",").map(function (x) {
                return be.reverseMatches(x, c.matches);
            }));
            var v = [d].concat(te(f)).map(be.trim);
            return v;
        }
        function Tc(u) {
            return Math.min(255, u);
        }
        function Mi(u) {
            return Go(Yc(u).map(function (c) {
                return c.arr;
            }));
        }
        function Dp() {
            for (var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], c = [], a = [], o = 0, d = u.length; o < d; o++) {
                var f = u[o];
                f.userFunction ? a.push(f) : (a.length && c.push([].concat(te(a))), c.push(f), a = []);
            }
            return a.length && c.push([].concat(te(a))), c.forEach(function (v, x) {
                Array.isArray(v) && (c[x] = function () {
                    var k = jp(v);
                    return function (S, R) {
                        for (var w = 0, F = S.pixels.length; w < F; w += 4)
                            k(S.pixels, w);
                        R(S);
                    };
                }());
            }), c;
        }
        function il() {
            for (var u = arguments.length, c = Array(u), a = 0; a < u; a++)
                c[a] = arguments[a];
            c = c.map(function (d) {
                return zp(d);
            }).filter(function (d) {
                return d;
            }), c = Dp(c);
            var o = c.length;
            return function (d, f) {
                var v = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, x = d, k = 0;
                function S() {
                    c[k].call(null, x, function (w) {
                        x = w, R();
                    }, v);
                }
                function R() {
                    if (k++, k >= o) {
                        f(x);
                        return;
                    }
                    S();
                }
                S();
            };
        }
        function Go(u) {
            return il.apply(void 0, te(u));
        }
        function Hc(u) {
            for (var c = null, a = arguments.length, o = Array(a > 1 ? a - 1 : 0), d = 1; d < a; d++)
                o[d - 1] = arguments[d];
            return o.length == 1 && typeof o[0] == "string" ? c = Mi(o[0]) : c = Go(o), function (f, v) {
                var x = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                c(kc(f, u), function (k) {
                    v(Cc(f, k, u));
                }, x);
            };
        }
        var _p = z({}, vc, Gc), qp = {
            Color: be,
            HueColor: _a,
            ColorNames: C,
            ImageFilter: _p,
            Canvas: Yn,
            ImageLoader: si
        };
        be.color;
        var eb = 0, Xo = [], Wt = function () {
            function u(c, a, o) {
                if (K(this, u), typeof c != "string")
                    this.el = c;
                else {
                    var d = document.createElement(c);
                    this.uniqId = eb++, a && (d.className = a), o = o || {};
                    for (var f in o)
                        d.setAttribute(f, o[f]);
                    this.el = d;
                }
            }
            return Y(u, [{
                key: "attr",
                value: function (a, o) {
                    return arguments.length == 1 ? this.el.getAttribute(a) : (this.el.setAttribute(a, o), this);
                }
            }, {
                key: "closest",
                value: function (a) {
                    for (var o = this, d = !1; !(d = o.hasClass(a));)
                        if (o.el.parentNode)
                            o = new u(o.el.parentNode);
                        else
                            return null;
                    return d ? o : null;
                }
            }, {
                key: "checked",
                value: function () {
                    return this.el.checked;
                }
            }, {
                key: "removeClass",
                value: function (a) {
                    return this.el.className = (" " + this.el.className + " ").replace(" " + a + " ", " ").trim(), this;
                }
            }, {
                key: "hasClass",
                value: function (a) {
                    if (this.el.className) {
                        var o = " " + this.el.className + " ";
                        return o.indexOf(" " + a + " ") > -1;
                    } else
                        return !1;
                }
            }, {
                key: "addClass",
                value: function (a) {
                    return this.hasClass(a) || (this.el.className = this.el.className + " " + a), this;
                }
            }, {
                key: "toggleClass",
                value: function (a) {
                    this.hasClass(a) ? this.removeClass(a) : this.addClass(a);
                }
            }, {
                key: "html",
                value: function (a) {
                    try {
                        typeof a == "string" ? this.el.innerHTML = a : this.empty().append(a);
                    } catch {
                        console.log(a);
                    }
                    return this;
                }
            }, {
                key: "find",
                value: function (a) {
                    return this.el.querySelector(a);
                }
            }, {
                key: "$",
                value: function (a) {
                    return new u(this.find(a));
                }
            }, {
                key: "findAll",
                value: function (a) {
                    return this.el.querySelectorAll(a);
                }
            }, {
                key: "$$",
                value: function (a) {
                    return [].concat(te(this.findAll(a))).map(function (o) {
                        return new u(o);
                    });
                }
            }, {
                key: "empty",
                value: function () {
                    return this.html("");
                }
            }, {
                key: "append",
                value: function (a) {
                    return typeof a == "string" ? this.el.appendChild(document.createTextNode(a)) : this.el.appendChild(a.el || a), this;
                }
            }, {
                key: "appendTo",
                value: function (a) {
                    var o = a.el ? a.el : a;
                    return o.appendChild(this.el), this;
                }
            }, {
                key: "remove",
                value: function () {
                    return this.el.parentNode && this.el.parentNode.removeChild(this.el), this;
                }
            }, {
                key: "text",
                value: function () {
                    return this.el.textContent;
                }
            }, {
                key: "css",
                value: function (a, o) {
                    var d = this;
                    if (arguments.length == 2)
                        this.el.style[a] = o;
                    else if (arguments.length == 1) {
                        if (typeof a == "string")
                            return getComputedStyle(this.el)[a];
                        var f = a || {};
                        Object.keys(f).forEach(function (v) {
                            d.el.style[v] = f[v];
                        });
                    }
                    return this;
                }
            }, {
                key: "cssFloat",
                value: function (a) {
                    return parseFloat(this.css(a));
                }
            }, {
                key: "cssInt",
                value: function (a) {
                    return parseInt(this.css(a));
                }
            }, {
                key: "px",
                value: function (a, o) {
                    return this.css(a, o + "px");
                }
            }, {
                key: "offset",
                value: function () {
                    var a = this.el.getBoundingClientRect();
                    return {
                        top: a.top + u.getScrollTop(),
                        left: a.left + u.getScrollLeft()
                    };
                }
            }, {
                key: "rect",
                value: function () {
                    return this.el.getBoundingClientRect();
                }
            }, {
                key: "position",
                value: function () {
                    return this.el.style.top ? {
                        top: parseFloat(this.css("top")),
                        left: parseFloat(this.css("left"))
                    } : this.el.getBoundingClientRect();
                }
            }, {
                key: "size",
                value: function () {
                    return [this.width(), this.height()];
                }
            }, {
                key: "width",
                value: function () {
                    return this.el.offsetWidth || this.el.getBoundingClientRect().width;
                }
            }, {
                key: "contentWidth",
                value: function () {
                    return this.width() - this.cssFloat("padding-left") - this.cssFloat("padding-right");
                }
            }, {
                key: "height",
                value: function () {
                    return this.el.offsetHeight || this.el.getBoundingClientRect().height;
                }
            }, {
                key: "contentHeight",
                value: function () {
                    return this.height() - this.cssFloat("padding-top") - this.cssFloat("padding-bottom");
                }
            }, {
                key: "dataKey",
                value: function (a) {
                    return this.uniqId + "." + a;
                }
            }, {
                key: "data",
                value: function (a, o) {
                    if (arguments.length == 2)
                        Xo[this.dataKey(a)] = o;
                    else {
                        if (arguments.length == 1)
                            return Xo[this.dataKey(a)];
                        var d = Object.keys(Xo), f = this.uniqId + ".";
                        return d.filter(function (v) {
                            return v.indexOf(f) == 0;
                        }).map(function (v) {
                            return Xo[v];
                        });
                    }
                    return this;
                }
            }, {
                key: "val",
                value: function (a) {
                    return arguments.length == 0 ? this.el.value : (arguments.length == 1 && (this.el.value = a), this);
                }
            }, {
                key: "int",
                value: function () {
                    return parseInt(this.val(), 10);
                }
            }, {
                key: "float",
                value: function () {
                    return parseFloat(this.val());
                }
            }, {
                key: "show",
                value: function () {
                    return this.css("display", "block");
                }
            }, {
                key: "hide",
                value: function () {
                    return this.css("display", "none");
                }
            }, {
                key: "toggle",
                value: function () {
                    return this.css("display") == "none" ? this.show() : this.hide();
                }
            }, {
                key: "scrollTop",
                value: function () {
                    return this.el === document.body ? u.getScrollTop() : this.el.scrollTop;
                }
            }, {
                key: "scrollLeft",
                value: function () {
                    return this.el === document.body ? u.getScrollLeft() : this.el.scrollLeft;
                }
            }, {
                key: "on",
                value: function (a, o, d, f) {
                    return this.el.addEventListener(a, o, d, f), this;
                }
            }, {
                key: "off",
                value: function (a, o) {
                    return this.el.removeEventListener(a, o), this;
                }
            }, {
                key: "getElement",
                value: function () {
                    return this.el;
                }
            }, {
                key: "createChild",
                value: function (a) {
                    var o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", d = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, f = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, v = new u(a, o, d);
                    return v.css(f), this.append(v), v;
                }
            }, {
                key: "firstChild",
                value: function () {
                    return new u(this.el.firstElementChild);
                }
            }, {
                key: "replace",
                value: function (a, o) {
                    return this.el.replaceChild(o, a), this;
                }
            }], [{
                key: "getScrollTop",
                value: function () {
                    return Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
                }
            }, {
                key: "getScrollLeft",
                value: function () {
                    return Math.max(window.pageXOffset, document.documentElement.scrollLeft, document.body.scrollLeft);
                }
            }]), u;
        }(), Nc = function () {
            function u(c) {
                K(this, u), this.$store = c, this.initialize();
            }
            return Y(u, [{
                key: "initialize",
                value: function () {
                    var a = this;
                    this.filterProps().forEach(function (o) {
                        a.$store.action(o, a);
                    });
                }
            }, {
                key: "filterProps",
                value: function () {
                    var a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "/";
                    return Object.getOwnPropertyNames(this.__proto__).filter(function (o) {
                        return o.startsWith(a);
                    });
                }
            }]), u;
        }(), tb = function (u) {
            U(c, u);
            function c() {
                return K(this, c), j(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
            }
            return Y(c, [{
                key: "initialize",
                value: function () {
                    M(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "initialize", this).call(this), this.$store.colorSetsList = [{
                        name: "Material",
                        colors: ["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#9E9E9E", "#607D8B"],
                        edit: !0
                    }, { name: "Custom", edit: !0, colors: [] }, { name: "Color Scale", scale: ["red", "yellow", "black"], count: 5 }], this.$store.currentColorSets = {};
                }
            }, {
                key: "/list",
                value: function (o) {
                    return Array.isArray(o.userList) && o.userList.length ? o.userList : o.colorSetsList;
                }
            }, {
                key: "/setUserPalette",
                value: function (o, d) {
                    o.userList = d, o.dispatch("/resetUserPalette"), o.dispatch("/setCurrentColorSets");
                }
            }, {
                key: "/resetUserPalette",
                value: function (o) {
                    o.userList && o.userList.length && (o.userList = o.userList.map(function (d, f) {
                        if (typeof d.colors == "function") {
                            var v = d.colors;
                            d.colors = v(o), d._colors = v;
                        }
                        return Object.assign({
                            name: "color-" + f,
                            colors: []
                        }, d);
                    }), o.emit("changeUserList"));
                }
            }, {
                key: "/setCurrentColorSets",
                value: function (o, d) {
                    var f = o.dispatch("/list");
                    typeof d > "u" ? o.currentColorSets = f[0] : typeof d == "number" ? o.currentColorSets = f[d] : o.currentColorSets = f.filter(function (v) {
                        return v.name == d;
                    })[0], o.emit("changeCurrentColorSets");
                }
            }, {
                key: "/getCurrentColorSets",
                value: function (o) {
                    return o.currentColorSets;
                }
            }, {
                key: "/addCurrentColor",
                value: function (o, d) {
                    Array.isArray(o.currentColorSets.colors) && (o.currentColorSets.colors.push(d), o.emit("changeCurrentColorSets"), o.emit("addCurrentColor", d));
                }
            }, {
                key: "/setCurrentColorAll",
                value: function (o) {
                    var d = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
                    o.currentColorSets.colors = d, o.emit("changeCurrentColorSets");
                }
            }, {
                key: "/removeCurrentColor",
                value: function (o, d) {
                    o.currentColorSets.colors[d] && (o.currentColorSets.colors.splice(d, 1), o.emit("changeCurrentColorSets"));
                }
            }, {
                key: "/removeCurrentColorToTheRight",
                value: function (o, d) {
                    o.currentColorSets.colors[d] && (o.currentColorSets.colors.splice(d, Number.MAX_VALUE), o.emit("changeCurrentColorSets"));
                }
            }, {
                key: "/clearPalette",
                value: function (o) {
                    o.currentColorSets.colors && (o.currentColorSets.colors = [], o.emit("changeCurrentColorSets"));
                }
            }, {
                key: "/getCurrentColors",
                value: function (o) {
                    return o.dispatch("/getColors", o.currentColorSets);
                }
            }, {
                key: "/getColors",
                value: function (o, d) {
                    return d.scale ? be.scale(d.scale, d.count) : d.colors || [];
                }
            }, {
                key: "/getColorSetsList",
                value: function (o) {
                    return o.dispatch("/list").map(function (d) {
                        return {
                            name: d.name,
                            edit: d.edit,
                            colors: o.dispatch("/getColors", d)
                        };
                    });
                }
            }]), c;
        }(Nc), Pt = {
            addEvent: function (c, a, o, d) {
                c && c.addEventListener(a, o, d);
            },
            removeEvent: function (c, a, o) {
                c && c.removeEventListener(a, o);
            },
            pos: function (c) {
                return c.touches && c.touches[0] ? c.touches[0] : c;
            },
            posXY: function (c) {
                var a = this.pos(c);
                return {
                    x: a.pageX,
                    y: a.pageY
                };
            }
        }, nb = ".", ib = function () {
            function u(c) {
                var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                K(this, u), this.masterObj = c, this.settingObj = a;
            }
            return Y(u, [{
                key: "set",
                value: function (a, o) {
                    var d = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0;
                    this.settingObj[a] = o || d;
                }
            }, {
                key: "init",
                value: function (a) {
                    if (!this.has(a) || !this.settingObj[a]) {
                        var o = a.split(nb), d = this.masterObj.refs[o[0]] || this.masterObj[o[0]] || this.masterObj, f = o.pop();
                        if (d[f]) {
                            for (var v = arguments.length, x = Array(v > 1 ? v - 1 : 0), k = 1; k < v; k++)
                                x[k - 1] = arguments[k];
                            var S = d[f].apply(d, x);
                            this.set(a, S);
                        }
                    }
                }
            }, {
                key: "get",
                value: function (a) {
                    var o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
                    return this.init(a, o), this.settingObj[a] || o;
                }
            }, {
                key: "has",
                value: function (a) {
                    return !!this.settingObj[a];
                }
            }]), u;
        }(), ob = /^(click|mouse(down|up|move|enter|leave)|touch(start|move|end)|key(down|up|press)|contextmenu|change|input)/ig, ab = /^load (.*)/ig, zc = " ", lb = ["Control", "Shift", "Alt", "Meta"], rb = function () {
            function u() {
                K(this, u), this.state = new ib(this), this.refs = {}, this.childComponents = this.components();
            }
            return Y(u, [{
                key: "newChildComponents",
                value: function () {
                    var a = this, o = Object.keys(this.childComponents);
                    o.forEach(function (d) {
                        var f = a.childComponents[d];
                        a[d] = new f(a);
                    });
                }
                /**
                 * 부모가 정의한 template 과  그 안에서 동작하는 자식 컴포넌트들을 다 합쳐서 
                 * 최종 element 를 만들어준다. 
                 * 
                 * 그리고 자동으로 load 되어질게 있으면 로드 해준다. 
                 */
            }, {
                key: "render",
                value: function () {
                    this.$el = this.parseTemplate(this.template()), this.refs.$el = this.$el, this.parseTarget(), this.load(), this.afterRender();
                }
            }, {
                key: "afterRender",
                value: function () {
                }
                /**
                 * 자식 컴포넌트로 사용될 객체 정의 
                 */
            }, {
                key: "components",
                value: function () {
                    return {};
                }
                /**
                 * Class 기반으로 $el 을 생성하기 위해서 
                 * 선언형으로 html 템플릿을 정의한다. 
                 * 
                 * @param {*} html 
                 */
            }, {
                key: "parseTemplate",
                value: function (a) {
                    var o = this, d = new Wt("div").html(a).firstChild(), f = d.findAll("[ref]");
                    return [].concat(te(f)).forEach(function (v) {
                        var x = v.getAttribute("ref");
                        o.refs[x] = new Wt(v);
                    }), d;
                }
                /**
                 * target 으로 지정된 자식 컴포넌트를 대체해준다.
                 */
            }, {
                key: "parseTarget",
                value: function () {
                    var a = this, o = this.$el, d = o.findAll("[target]");
                    [].concat(te(d)).forEach(function (f) {
                        var v = f.getAttribute("target"), x = f.getAttribute("ref") || v, k = a.childComponents[v], S = new k(a);
                        if (a[x] = S, a.refs[x] = S.$el, S) {
                            S.render();
                            var R = new Wt(f.parentNode);
                            R.replace(f, S.$el.el);
                        }
                    });
                }
                // load function이 정의된 객체는 load 를 실행해준다. 
            }, {
                key: "load",
                value: function () {
                    var a = this;
                    this.filterProps(ab).forEach(function (o) {
                        var d = o.split("load ")[1];
                        a.refs[d] && a.refs[d].html(a.parseTemplate(a[o].call(a)));
                    });
                }
                // 기본 템플릿 지정 
            }, {
                key: "template",
                value: function () {
                    return "<div></div>";
                }
            }, {
                key: "initialize",
                value: function () {
                }
                /**
                 * 이벤트를 초기화한다. 
                 */
            }, {
                key: "initializeEvent",
                value: function () {
                    var a = this;
                    this.initializeEventMachin(), Object.keys(this.childComponents).forEach(function (o) {
                        a[o] && a[o].initializeEvent();
                    });
                }
                /**
                 * 자원을 해제한다. 
                 * 이것도 역시 자식 컴포넌트까지 제어하기 때문에 가장 최상위 부모에서 한번만 호출되도 된다. 
                 */
            }, {
                key: "destroy",
                value: function () {
                    var a = this;
                    this.destroyEventMachin(), Object.keys(this.childComponents).forEach(function (o) {
                        a[o] && a[o].destroy();
                    });
                }
            }, {
                key: "destroyEventMachin",
                value: function () {
                    this.removeEventAll();
                }
            }, {
                key: "initializeEventMachin",
                value: function () {
                    this.filterProps(ob).forEach(this.parseEvent.bind(this));
                }
                /**
                 * property 수집하기 
                 * 상위 클래스의 모든 property 를 수집해서 리턴한다. 
                 */
            }, {
                key: "collectProps",
                value: function () {
                    if (!this.collapsedProps) {
                        var a = this.__proto__, o = [];
                        do
                            o.push.apply(o, te(Object.getOwnPropertyNames(a))), a = a.__proto__;
                        while (a);
                        this.collapsedProps = o;
                    }
                    return this.collapsedProps;
                }
            }, {
                key: "filterProps",
                value: function (a) {
                    return this.collectProps().filter(function (o) {
                        return o.match(a);
                    });
                }
            }, {
                key: "parseEvent",
                value: function (a) {
                    var o = a.split(zc);
                    this.bindingEvent(o, this[a].bind(this));
                }
            }, {
                key: "getDefaultDomElement",
                value: function (a) {
                    var o = void 0;
                    return a ? o = this.refs[a] || this[a] || window[a] : o = this.el || this.$el || this.$root, o instanceof Wt ? o.getElement() : o;
                }
            }, {
                key: "getDefaultEventObject",
                value: function (a) {
                    var o = this, d = a.split("."), f = d.shift(), v = d.includes("Control"), x = d.includes("Shift"), k = d.includes("Alt"), S = d.includes("Meta");
                    d = d.filter(function (w) {
                        return lb.includes(w) === !1;
                    });
                    var R = d.filter(function (w) {
                        return !!o[w];
                    });
                    return d = d.filter(function (w) {
                        return R.includes(w) === !1;
                    }).map(function (w) {
                        return w.toLowerCase();
                    }), {
                        eventName: f,
                        isControl: v,
                        isShift: x,
                        isAlt: k,
                        isMeta: S,
                        codes: d,
                        checkMethodList: R
                    };
                }
            }, {
                key: "bindingEvent",
                value: function (a, o) {
                    var d = ne(a), f = d[0], v = d[1], x = d.slice(2);
                    v = this.getDefaultDomElement(v);
                    var k = this.getDefaultEventObject(f);
                    k.dom = v, k.delegate = x.join(zc), this.addEvent(k, o);
                }
            }, {
                key: "matchPath",
                value: function (a, o) {
                    return a ? a.matches(o) ? a : this.matchPath(a.parentElement, o) : null;
                }
            }, {
                key: "getBindings",
                value: function () {
                    return this._bindings || this.initBindings(), this._bindings;
                }
            }, {
                key: "addBinding",
                value: function (a) {
                    this.getBindings().push(a);
                }
            }, {
                key: "initBindings",
                value: function () {
                    this._bindings = [];
                }
            }, {
                key: "checkEventType",
                value: function (a, o) {
                    var d = this, f = o.isControl ? a.ctrlKey : !0, v = o.isShift ? a.shiftKey : !0, x = o.isAlt ? a.altKey : !0, k = o.isMeta ? a.metaKey : !0, S = !0;
                    o.codes.length && (S = o.codes.includes(a.code.toLowerCase()) || o.codes.includes(a.key.toLowerCase()));
                    var R = !0;
                    return o.checkMethodList.length && (R = o.checkMethodList.every(function (w) {
                        return d[w].call(d, a);
                    })), f && x && v && k && S && R;
                }
            }, {
                key: "makeCallback",
                value: function (a, o) {
                    var d = this;
                    return a.delegate ? function (f) {
                        if (f.xy = Pt.posXY(f), d.checkEventType(f, a)) {
                            var v = d.matchPath(f.target || f.srcElement, a.delegate);
                            if (v)
                                return f.delegateTarget = v, f.$delegateTarget = new Wt(v), o(f);
                        }
                    } : function (f) {
                        if (f.xy = Pt.posXY(f), d.checkEventType(f, a))
                            return o(f);
                    };
                }
            }, {
                key: "addEvent",
                value: function (a, o) {
                    a.callback = this.makeCallback(a, o), this.addBinding(a);
                    var d = !0;
                    a.eventName === "touchstart" && (d = { passive: !0 }), Pt.addEvent(a.dom, a.eventName, a.callback, d);
                }
            }, {
                key: "removeEventAll",
                value: function () {
                    var a = this;
                    this.getBindings().forEach(function (o) {
                        a.removeEvent(o);
                    }), this.initBindings();
                }
            }, {
                key: "removeEvent",
                value: function (a) {
                    var o = a.eventName, d = a.dom, f = a.callback;
                    Pt.removeEvent(d, o, f);
                }
            }]), u;
        }(), cb = /^@/, lt = function (u) {
            U(c, u);
            function c(a) {
                K(this, c);
                var o = j(this, (c.__proto__ || Object.getPrototypeOf(c)).call(this, a));
                return o.opt = a || {}, a && a.$store && (o.$store = a.$store), o.initialize(), o.initializeStoreEvent(), o;
            }
            return Y(c, [{
                key: "initializeStoreEvent",
                value: function () {
                    var o = this;
                    this.storeEvents = {}, this.filterProps(cb).forEach(function (d) {
                        var f = d.split("@");
                        f.shift();
                        var v = f.join("@");
                        o.storeEvents[v] = o[d].bind(o), o.$store.on(v, o.storeEvents[v]);
                    });
                }
            }, {
                key: "destoryStoreEvent",
                value: function () {
                    var o = this;
                    Object.keys(this.storeEvents).forEach(function (d) {
                        o.$store.off(d, o.storeEvents[d]);
                    });
                }
            }]), c;
        }(rb);
        function sb(u) {
            return typeof u > "u" || u == null;
        }
        var db = function (u) {
            U(c, u);
            function c() {
                return K(this, c), j(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
            }
            return Y(c, [{
                key: "initialize",
                value: function () {
                    M(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "initialize", this).call(this), this.$store.rgb = {}, this.$store.hsl = {}, this.$store.hsv = {}, this.$store.alpha = 1, this.$store.format = "hex";
                }
            }, {
                key: "/changeFormat",
                value: function (o, d) {
                    o.format = d, o.emit("changeFormat");
                }
            }, {
                key: "/initColor",
                value: function (o, d, f) {
                    o.dispatch("/changeColor", d, f, !0), o.emit("initColor");
                }
            }, {
                key: "/changeColor",
                value: function (o, d, f, v) {
                    d = d || "#FF0000", typeof d == "string" && (d = be.parse(d)), d.source = d.source || f, o.alpha = sb(d.a) ? o.alpha : d.a, o.format = d.type != "hsv" && d.type || o.format, d.type == "hsl" ? (o.hsl = Object.assign(o.hsl, d), o.rgb = be.HSLtoRGB(o.hsl), o.hsv = be.HSLtoHSV(d)) : d.type == "hex" || d.type == "rgb" ? (o.rgb = Object.assign(o.rgb, d), o.hsl = be.RGBtoHSL(o.rgb), o.hsv = be.RGBtoHSV(d)) : d.type == "hsv" && (o.hsv = Object.assign(o.hsv, d), o.rgb = be.HSVtoRGB(o.hsv), o.hsl = be.HSVtoHSL(o.hsv)), v || o.emit("changeColor", d.source);
                }
            }, {
                key: "/getHueColor",
                value: function (o) {
                    return _a.checkHueColor(o.hsv.h / 360);
                }
            }, {
                key: "/toString",
                value: function (o, d) {
                    d = d || o.format;
                    var f = o[d] || o.rgb;
                    return be.format(z({}, f, {
                        a: o.alpha
                    }), d);
                }
            }, {
                key: "/toColor",
                value: function (o, d) {
                    return d = d || o.format, d == "rgb" ? o.dispatch("/toRGB") : d == "hsl" ? o.dispatch("/toHSL") : d == "hex" ? o.dispatch("/toHEX") : o.dispatch("/toString", d);
                }
            }, {
                key: "/toRGB",
                value: function (o) {
                    return o.dispatch("/toString", "rgb");
                }
            }, {
                key: "/toHSL",
                value: function (o) {
                    return o.dispatch("/toString", "hsl");
                }
            }, {
                key: "/toHEX",
                value: function (o) {
                    return o.dispatch("/toString", "hex").toUpperCase();
                }
            }]), c;
        }(Nc), ub = function () {
            function u(c) {
                K(this, u), this.callbacks = [], this.actions = [], this.modules = c.modules || [], this.initialize();
            }
            return Y(u, [{
                key: "initialize",
                value: function () {
                    this.initializeModule();
                }
            }, {
                key: "initializeModule",
                value: function () {
                    var a = this;
                    this.modules.forEach(function (o) {
                        new o(a);
                    });
                }
            }, {
                key: "action",
                value: function (a, o) {
                    this.actions[a] = { context: o, callback: o[a] };
                }
            }, {
                key: "dispatch",
                value: function (d) {
                    var o = [].concat(Array.prototype.slice.call(arguments)), d = o.shift(), f = this.actions[d];
                    if (f)
                        return f.callback.apply(f.context, [this].concat(te(o)));
                }
            }, {
                key: "module",
                value: function (a) {
                }
            }, {
                key: "on",
                value: function (a, o) {
                    this.callbacks.push({ event: a, callback: o });
                }
            }, {
                key: "off",
                value: function (a, o) {
                    arguments.length == 0 ? this.callbacks = [] : arguments.length == 1 ? this.callbacks = this.callbacks.filter(function (d) {
                        return d.event != a;
                    }) : arguments.length == 2 && (this.callbacks = this.callbacks.filter(function (d) {
                        return d.event != a && d.callback != o;
                    }));
                }
            }, {
                key: "emit",
                value: function () {
                    var a = [].concat(Array.prototype.slice.call(arguments)), o = a.shift();
                    this.callbacks.filter(function (d) {
                        return d.event == o;
                    }).forEach(function (d) {
                        d && typeof d.callback == "function" && d.callback.apply(d, te(a));
                    });
                }
            }]), u;
        }(), gn = function (u) {
            U(c, u);
            function c(a) {
                K(this, c);
                var o = j(this, (c.__proto__ || Object.getPrototypeOf(c)).call(this, a));
                return o.isColorPickerShow = !1, o.isShortCut = !1, o.hideDelay = +(typeof o.opt.hideDeplay > "u" ? 2e3 : o.opt.hideDelay), o.timerCloseColorPicker, o.autoHide = o.opt.autoHide || !0, o.outputFormat = o.opt.outputFormat, o.$checkColorPickerClass = o.checkColorPickerClass.bind(o), o;
            }
            return Y(c, [{
                key: "initialize",
                value: function () {
                    var o = this;
                    this.$body = null, this.$root = null, this.$store = new ub({
                        modules: [db, tb]
                    }), this.callbackChange = function () {
                        o.callbackColorValue();
                    }, this.callbackLastUpdate = function () {
                        o.callbackLastUpdateColorValue();
                    }, this.callbackAddCurrentColor = function (d) {
                        o.callbackAddCurrentColorValue(d);
                    }, this.colorpickerShowCallback = function () {
                    }, this.colorpickerHideCallback = function () {
                    }, this.colorpickerLastUpdateCallback = function () {
                    }, this.colorpickerAddCurrentColorCallback = function () {
                    }, this.$body = new Wt(this.getContainer()), this.$root = new Wt("div", "easylogic-colorpicker", {
                        tabIndex: -1
                    }), this.opt.position == "inline" && this.$body.append(this.$root), this.opt.type && this.$root.addClass(this.opt.type), this.opt.hideInformation && this.$root.addClass("hide-information"), this.opt.hideColorsets && this.$root.addClass("hide-colorsets"), this.$arrow = new Wt("div", "arrow"), this.$root.append(this.$arrow), this.opt.colorSets ? this.$store.dispatch("/setUserPalette", this.opt.colorSet) : Qa(this.opt.onRetrievePreset) ? this.$store.dispatch("/setUserPalette", this.opt.onRetrievePreset()) : this.$store.dispatch("/setUserPalette", []), this.render(), this.$root.append(this.$el), this.initColorWithoutChangeEvent(this.opt.color), this.initializeEvent();
                }
            }, {
                key: "initColorWithoutChangeEvent",
                value: function (o) {
                    this.$store.dispatch("/initColor", o);
                }
                /** 
                 * public method 
                 * 
                 */
                /**
                 * 
                 * show colorpicker with position  
                 * 
                 * @param {{left, top, hideDelay, isShortCut}} opt 
                 * @param {String|Object} color  
                 * @param {Function} showCallback  it is called when colorpicker is shown
                 * @param {Function} hideCallback  it is called once when colorpicker is hidden
                 * @param {Function} addCurrentColorCallback  
                 */
            }, {
                key: "show",
                value: function (o, d, f, v, x, k) {
                    this.colorpickerShowCallback = f, this.colorpickerHideCallback = v, this.colorpickerLastUpdateCallback = x, this.colorpickerAddCurrentColorCallback = k, this.$root.css(this.getInitalizePosition()).show(), this.isColorPickerShow = !0, this.isShortCut = o.isShortCut || !1, this.outputFormat = o.outputFormat, this.hideDelay = +(typeof o.hideDelay > "u" ? 2e3 : o.hideDelay), this.hideDelay > 0 && this.setHideDelay(this.hideDelay), this.$root.appendTo(this.$body), this.definePosition(o), this.initColorWithoutChangeEvent(d);
                }
                /**
                 * 
                 * initialize color for colorpicker
                 * 
                 * @param {String|Object} newColor 
                 * @param {String} format  hex, rgb, hsl
                 */
            }, {
                key: "initColor",
                value: function (o, d) {
                    this.$store.dispatch("/changeColor", o, d);
                }
                /**
                 * hide colorpicker 
                 * 
                 */
            }, {
                key: "hide",
                value: function () {
                    this.isColorPickerShow && (this.$root.hide(), this.$root.remove(), this.isColorPickerShow = !1, this.callbackHideColorValue());
                }
                /**
                 * set to colors in current sets that you see 
                 * @param {Array} colors 
                 */
            }, {
                key: "setColorsInPalette",
                value: function () {
                    var o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
                    this.$store.dispatch("/setCurrentColorAll", o);
                }
                /**
                 * refresh all color palette 
                 * 
                 * @param {*} list 
                 */
            }, {
                key: "setUserPalette",
                value: function () {
                    var o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
                    this.$store.dispatch("/setUserPalette", o);
                }
                /**
                 * private method 
                 */
            }, {
                key: "getOption",
                value: function (o) {
                    return this.opt[o];
                }
            }, {
                key: "setOption",
                value: function (o, d) {
                    this.opt[o] = d;
                }
            }, {
                key: "isType",
                value: function (o) {
                    return this.getOption("type") == o;
                }
            }, {
                key: "isPaletteType",
                value: function () {
                    return this.isType("palette");
                }
            }, {
                key: "isSketchType",
                value: function () {
                    return this.isType("sketch");
                }
            }, {
                key: "getContainer",
                value: function () {
                    return this.opt.container || document.body;
                }
            }, {
                key: "getColor",
                value: function (o) {
                    return this.$store.dispatch("/toColor", o);
                }
            }, {
                key: "definePositionForArrow",
                value: function (o, d, f) {
                }
            }, {
                key: "definePosition",
                value: function (o) {
                    var d = this.$root.width(), f = this.$root.height(), v = o.left - this.$body.scrollLeft();
                    d + v > window.innerWidth && (v -= d + v - window.innerWidth), v < 0 && (v = 0);
                    var x = o.top - this.$body.scrollTop();
                    f + x > window.innerHeight && (x -= f + x - window.innerHeight), x < 0 && (x = 0), this.$root.css({
                        left: v + "px",
                        top: x + "px"
                    });
                }
            }, {
                key: "getInitalizePosition",
                value: function () {
                    return this.opt.position == "inline" ? {
                        position: "relative",
                        left: "auto",
                        top: "auto",
                        display: "inline-block"
                    } : {
                        position: "fixed",
                        // color picker has fixed position
                        left: "-10000px",
                        top: "-10000px"
                    };
                }
            }, {
                key: "isAbsolute",
                value: function () {
                    return this.opt.position !== "inline";
                }
                // Event Bindings 
            }, {
                key: "mouseup.isAbsolute document",
                value: function (o) {
                    this.__isMouseDown = !1, this.checkInHtml(o.target) || (this.checkColorPickerClass(o.target) == !1 ? this.hide() : this.__isMouseIn || (clearTimeout(this.timerCloseColorPicker), this.timerCloseColorPicker = setTimeout(this.hide.bind(this), this.delayTime || this.hideDelay)));
                }
            }, {
                key: "keyup.isAbsolute.escape $root",
                value: function (o) {
                    this.hide();
                }
            }, {
                key: "mouseover.isAbsolute $root",
                value: function (o) {
                    clearTimeout(this.timerCloseColorPicker);
                }
            }, {
                key: "mousemove.isAbsolute $root",
                value: function (o) {
                    clearTimeout(this.timerCloseColorPicker);
                }
            }, {
                key: "mouseenter.isAbsolute $root",
                value: function (o) {
                    clearTimeout(this.timerCloseColorPicker), this.__isMouseIn = !0;
                }
            }, {
                key: "mouseleave.isAbsolute $root",
                value: function (o) {
                    this.__isMouseIn = !1, this.__isMouseDown || (clearTimeout(this.timerCloseColorPicker), this.timerCloseColorPicker = setTimeout(this.hide.bind(this), this.delayTime || this.hideDelay));
                }
            }, {
                key: "mousedown.isAbsolute $root",
                value: function (o) {
                    this.__isMouseDown = !0;
                }
            }, {
                key: "setHideDelay",
                value: function (o) {
                    this.delayTime = o || 0;
                }
            }, {
                key: "runHideDelay",
                value: function () {
                    this.isColorPickerShow && this.setHideDelay();
                }
            }, {
                key: "callbackColorValue",
                value: function (o) {
                    o = o || this.getCurrentColor(), typeof this.opt.onChange == "function" && this.opt.onChange.call(this, o), typeof this.colorpickerShowCallback == "function" && this.colorpickerShowCallback(o);
                }
            }, {
                key: "callbackLastUpdateColorValue",
                value: function (o) {
                    o = o || this.getCurrentColor(), typeof this.opt.onLastUpdate == "function" && this.opt.onLastUpdate.call(this, o), typeof this.colorpickerLastUpdateCallback == "function" && this.colorpickerLastUpdateCallback(o);
                }
            }, {
                key: "callbackAddCurrentColorValue",
                value: function (o) {
                    typeof this.opt.onLastUpdate == "function" && this.opt.onAddPreset.call(this, o), typeof this.colorpickerAddCurrentColorCallback == "function" && this.colorpickerAddCurrentColorCallback(o);
                }
            }, {
                key: "callbackHideColorValue",
                value: function (o) {
                    o = o || this.getCurrentColor(), typeof this.opt.onHide == "function" && this.opt.onHide.call(this, o), typeof this.colorpickerHideCallback == "function" && this.colorpickerHideCallback(o);
                }
            }, {
                key: "getCurrentColor",
                value: function () {
                    return this.$store.dispatch("/toColor", this.outputFormat);
                }
            }, {
                key: "checkColorPickerClass",
                value: function (o) {
                    var d = new Wt(o).closest("codemirror-colorview"), f = new Wt(o).closest("easylogic-colorpicker"), v = new Wt(o).closest("CodeMirror");
                    return o.nodeName == "HTML", !!(f || d || v);
                }
            }, {
                key: "checkInHtml",
                value: function (o) {
                    var d = o.nodeName == "HTML";
                    return d;
                }
            }, {
                key: "initializeStoreEvent",
                value: function () {
                    M(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "initializeStoreEvent", this).call(this), this.$store.on("changeColor", this.callbackChange), this.$store.on("lastUpdateColor", this.callbackLastUpdate), this.$store.on("changeFormat", this.callbackChange), this.$store.on("addCurrentColor", this.callbackAddCurrentColor);
                }
            }, {
                key: "destroy",
                value: function () {
                    M(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "destroy", this).call(this), this.$store.off("changeColor", this.callbackChange), this.$store.off("lastUpdateColor", this.callbackLastUpdate), this.$store.off("changeFormat", this.callbackChange), this.$store.off("addCurrentColor", this.callbackAddCurrentColor), this.callbackChange = void 0, this.callbackLastUpdate = void 0, this.callbackAddCurrentColor = void 0, this.colorpickerShowCallback = void 0, this.colorpickerHideCallback = void 0;
                }
            }]), c;
        }(lt), mb = function (u) {
            U(c, u);
            function c(a) {
                K(this, c);
                var o = j(this, (c.__proto__ || Object.getPrototypeOf(c)).call(this, a));
                return o.source = "base-box", o;
            }
            return Y(c, [{
                key: "refresh",
                value: function () {
                }
            }, {
                key: "refreshColorUI",
                value: function (o) {
                }
                /** push change event  */
            }, {
                key: "changeColor",
                value: function (o) {
                    this.$store.dispatch("/changeColor", Object.assign({
                        source: this.source
                    }, o || {}));
                }
                // Event Bindings 
            }, {
                key: "mouseup document",
                value: function (o) {
                    this.onDragEnd(o);
                }
            }, {
                key: "mousemove document",
                value: function (o) {
                    this.onDragMove(o);
                }
            }, {
                key: "mousedown $bar",
                value: function (o) {
                    o.preventDefault(), this.isDown = !0;
                }
            }, {
                key: "mousedown $container",
                value: function (o) {
                    this.isDown = !0, this.onDragStart(o);
                }
            }, {
                key: "touchend document",
                value: function (o) {
                    this.onDragEnd(o);
                }
            }, {
                key: "touchmove document",
                value: function (o) {
                    this.onDragMove(o);
                }
            }, {
                key: "touchstart $bar",
                value: function (o) {
                    o.preventDefault(), this.isDown = !0;
                }
            }, {
                key: "touchstart $container",
                value: function (o) {
                    this.onDragStart(o);
                }
            }, {
                key: "onDragStart",
                value: function (o) {
                    this.isDown = !0, this.refreshColorUI(o);
                }
            }, {
                key: "onDragMove",
                value: function (o) {
                    this.isDown && this.refreshColorUI(o);
                }
                /* called when mouse is ended move  */
            }, {
                key: "onDragEnd",
                value: function (o) {
                    this.isDown && (this.$store.emit("lastUpdateColor"), this.isDown = !1);
                }
            }, {
                key: "@changeColor",
                value: function (o) {
                    this.source != o && this.refresh();
                }
            }, {
                key: "@initColor",
                value: function () {
                    this.refresh();
                }
            }]), c;
        }(lt), Fi = function (u) {
            U(c, u);
            function c(a) {
                K(this, c);
                var o = j(this, (c.__proto__ || Object.getPrototypeOf(c)).call(this, a));
                return o.minValue = 0, o.maxValue = 1, o.source = "base-slider", o;
            }
            return Y(c, [{
                key: "getMinMaxPosition",
                value: function () {
                    var o = this.getMinPosition(), d = this.getMaxDist(), f = o + d;
                    return { min: o, max: f, width: d };
                }
                /** get current position on page  */
            }, {
                key: "getCurrent",
                value: function (o) {
                    return min + this.getMaxDist() * o;
                }
                /** get min position on slider container  */
            }, {
                key: "getMinPosition",
                value: function () {
                    return this.refs.$container.offset().left;
                }
            }, {
                key: "getMaxDist",
                value: function () {
                    return this.state.get("$container.width");
                }
                /** get dist for position value */
            }, {
                key: "getDist",
                value: function (o) {
                    var d = this.getMinMaxPosition(), f = d.min, v = d.max, x;
                    return o < f ? x = 0 : o > v ? x = 100 : x = (o - f) / (v - f) * 100, x;
                }
                /** get caculated dist for domain value   */
            }, {
                key: "getCaculatedDist",
                value: function (o) {
                    var d = o ? this.getMousePosition(o) : this.getCurrent(this.getDefaultValue() / this.maxValue), f = this.getDist(d);
                    return f;
                }
                /** get default value used in slider container */
            }, {
                key: "getDefaultValue",
                value: function () {
                    return 0;
                }
                /** set mosue position */
            }, {
                key: "setMousePosition",
                value: function (o) {
                    this.refs.$bar.css({ left: o + "px" });
                }
                /** set mouse position in page */
            }, {
                key: "getMousePosition",
                value: function (o) {
                    return Pt.pos(o).pageX;
                }
            }, {
                key: "refresh",
                value: function () {
                    this.setColorUI();
                }
                /** set drag bar position  */
            }, {
                key: "setColorUI",
                value: function (o) {
                    if (o = o || this.getDefaultValue(), this.lastV === o)
                        return !0;
                    this.lastV = o, o <= this.minValue ? this.refs.$bar.addClass("first").removeClass("last") : o >= this.maxValue ? this.refs.$bar.addClass("last").removeClass("first") : this.refs.$bar.removeClass("last").removeClass("first"), this.setMousePosition(this.getMaxDist() * ((o || 0) / this.maxValue));
                }
            }]), c;
        }(mb), wc = function (u) {
            U(c, u);
            function c(a) {
                K(this, c);
                var o = j(this, (c.__proto__ || Object.getPrototypeOf(c)).call(this, a));
                return o.minValue = 0, o.maxValue = 1, o.source = "value-control", o;
            }
            return Y(c, [{
                key: "template",
                value: function () {
                    return `
            <div class="value">
                <div ref="$container" class="value-container">
                    <div ref="$bar" class="drag-bar"></div>
                </div>
            </div>
        `;
                }
            }, {
                key: "setBackgroundColor",
                value: function () {
                    this.refs.$container.css("background-color", this.$store.dispatch("/toRGB"));
                }
            }, {
                key: "refresh",
                value: function () {
                    M(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "refresh", this).call(this), this.setBackgroundColor();
                }
            }, {
                key: "getDefaultValue",
                value: function () {
                    return this.$store.hsv.v;
                }
            }, {
                key: "refreshColorUI",
                value: function (o) {
                    var d = this.getCaculatedDist(o);
                    this.setColorUI(d / 100 * this.maxValue), this.changeColor({
                        type: "hsv",
                        v: d / 100 * this.maxValue
                    });
                }
            }]), c;
        }(Fi), Wo = function (u) {
            U(c, u);
            function c(a) {
                K(this, c);
                var o = j(this, (c.__proto__ || Object.getPrototypeOf(c)).call(this, a));
                return o.minValue = 0, o.maxValue = 1, o.source = "opacity-control", o;
            }
            return Y(c, [{
                key: "template",
                value: function () {
                    return `
        <div class="opacity">
            <div ref="$container" class="opacity-container">
                <div ref="$colorbar" class="color-bar"></div>
                <div ref="$bar" class="drag-bar2"></div>
            </div>
        </div>
        `;
                }
            }, {
                key: "refresh",
                value: function () {
                    M(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "refresh", this).call(this), this.setOpacityColorBar();
                }
            }, {
                key: "setOpacityColorBar",
                value: function () {
                    var o = Object.assign({}, this.$store.rgb);
                    o.a = 0;
                    var d = be.format(o, "rgb");
                    o.a = 1;
                    var f = be.format(o, "rgb");
                    this.setOpacityColorBarBackground(d, f);
                }
            }, {
                key: "setOpacityColorBarBackground",
                value: function (o, d) {
                    this.refs.$colorbar.css("background", "linear-gradient(to right, " + o + ", " + d + ")");
                }
            }, {
                key: "getDefaultValue",
                value: function () {
                    return this.$store.alpha;
                }
            }, {
                key: "refreshColorUI",
                value: function (o) {
                    var d = this.getCaculatedDist(o);
                    this.setColorUI(d / 100 * this.maxValue), this.changeColor({
                        a: Math.floor(d) / 100 * this.maxValue
                    });
                }
            }]), c;
        }(Fi), hb = "macos-control", pb = function (u) {
            U(c, u);
            function c() {
                return K(this, c), j(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
            }
            return Y(c, [{
                key: "components",
                value: function () {
                    return { Value: wc, Opacity: Wo };
                }
            }, {
                key: "template",
                value: function () {
                    return `
        <div class="control">
            <div target="Value" ></div>
            <div target="Opacity" ></div>
            <div ref="$controlPattern" class="empty"></div>
            <div ref="$controlColor" class="color"></div>
        </div>
        `;
                }
            }, {
                key: "setBackgroundColor",
                value: function () {
                    this.refs.$controlColor.css("background-color", this.$store.dispatch("/toRGB"));
                }
            }, {
                key: "refresh",
                value: function () {
                    this.setColorUI(), this.setBackgroundColor();
                }
            }, {
                key: "setColorUI",
                value: function () {
                    this.Value.setColorUI(), this.Opacity.setColorUI();
                }
            }, {
                key: "@changeColor",
                value: function (o) {
                    hb != o && this.refresh();
                }
            }, {
                key: "@initColor",
                value: function () {
                    this.refresh();
                }
            }]), c;
        }(lt), Jc = function (u) {
            U(c, u);
            function c(a) {
                K(this, c);
                var o = j(this, (c.__proto__ || Object.getPrototypeOf(c)).call(this, a));
                return o.width = 214, o.height = 214, o.thinkness = 0, o.half_thinkness = 0, o.source = "colorwheel", o;
            }
            return Y(c, [{
                key: "template",
                value: function () {
                    return `
        <div class="wheel">
            <canvas class="wheel-canvas" ref="$colorwheel" ></canvas>
            <div class="wheel-canvas" ref="$valuewheel" ></div>
            <div class="drag-pointer" ref="$drag_pointer"></div>
        </div>
        `;
                }
            }, {
                key: "refresh",
                value: function (o) {
                    this.setColorUI(o);
                }
            }, {
                key: "setColorUI",
                value: function (o) {
                    this.renderCanvas(), this.renderValue(), this.setHueColor(null, o);
                }
            }, {
                key: "renderValue",
                value: function () {
                    var o = 1 - this.$store.hsv.v;
                    this.refs.$valuewheel.css({
                        "background-color": "rgba(0, 0, 0, " + o + ")"
                    });
                }
            }, {
                key: "renderWheel",
                value: function (o, d) {
                    this.width && !o && (o = this.width), this.height && !d && (d = this.height);
                    var f = new Wt("canvas"), v = f.el.getContext("2d");
                    f.el.width = o, f.el.height = d, f.css({ width: o + "px", height: d + "px" });
                    for (var x = v.getImageData(0, 0, o, d), k = x.data, S = Math.floor(o / 2), R = Math.floor(d / 2), w = o > d ? R : S, F = S, Q = R, O = 0; O < d; O++)
                        for (var A = 0; A < o; A++) {
                            var ee = A - F + 1, ae = O - Q + 1, pe = ee * ee + ae * ae, xe = y(ee, ae), Ye = be.HSVtoRGB(
                                xe,
                                // 0~360 hue 
                                Math.min(Math.sqrt(pe) / w, 1),
                                // 0..1 Saturation 
                                1
                                //  0..1 Value
                            ), Re = (O * o + A) * 4;
                            k[Re] = Ye.r, k[Re + 1] = Ye.g, k[Re + 2] = Ye.b, k[Re + 3] = 255;
                        }
                    return v.putImageData(x, 0, 0), this.thinkness > 0 && (v.globalCompositeOperation = "destination-out", v.fillStyle = "black", v.beginPath(), v.arc(F, Q, w - this.thinkness, 0, Math.PI * 2), v.closePath(), v.fill()), f;
                }
            }, {
                key: "renderCanvas",
                value: function () {
                    if (!this.$store.createdWheelCanvas) {
                        var o = this.refs.$colorwheel, d = o.el.getContext("2d"), f = o.size(), v = q(f, 2), x = v[0], k = v[1];
                        this.width && !x && (x = this.width), this.height && !k && (k = this.height), o.el.width = x, o.el.height = k, o.css({ width: x + "px", height: k + "px" });
                        var S = this.renderWheel(x, k);
                        d.drawImage(S.el, 0, 0), this.$store.createdWheelCanvas = !0;
                    }
                }
            }, {
                key: "getDefaultValue",
                value: function () {
                    return this.$store.hsv.h;
                }
            }, {
                key: "getDefaultSaturation",
                value: function () {
                    return this.$store.hsv.s;
                }
            }, {
                key: "getCurrentXY",
                value: function (o, d, f, v, x) {
                    return o ? Pt.posXY(o) : Z(d, f, v, x);
                }
            }, {
                key: "getRectangle",
                value: function () {
                    var o = this.state.get("$el.width"), d = this.state.get("$el.height"), f = this.state.get("$colorwheel.width") / 2, v = this.refs.$el.offset().left, x = v + o / 2, k = this.refs.$el.offset().top, S = k + d / 2;
                    return { minX: v, minY: k, width: o, height: d, radius: f, centerX: x, centerY: S };
                }
            }, {
                key: "setHueColor",
                value: function (o, d) {
                    if (this.state.get("$el.width")) {
                        var f = this.getRectangle(), v = f.minX, x = f.minY, k = f.radius, S = f.centerX, R = f.centerY, w = this.getCurrentXY(o, this.getDefaultValue(), this.getDefaultSaturation() * k, S, R), F = w.x, Q = w.y, O = F - S, A = Q - R, ee = O * O + A * A, ae = y(O, A);
                        if (ee > k * k)
                            var pe = this.getCurrentXY(null, ae, k, S, R), F = pe.x, Q = pe.y;
                        var xe = Math.min(Math.sqrt(ee) / k, 1);
                        this.refs.$drag_pointer.css({
                            left: F - v + "px",
                            top: Q - x + "px"
                        }), d || this.changeColor({
                            type: "hsv",
                            h: ae,
                            s: xe
                        });
                    }
                }
            }, {
                key: "changeColor",
                value: function (o) {
                    this.$store.dispatch("/changeColor", Object.assign({
                        source: this.source
                    }, o || {}));
                }
            }, {
                key: "@changeColor",
                value: function (o) {
                    this.source != o && this.refresh(!0);
                }
            }, {
                key: "@initColor",
                value: function () {
                    this.refresh(!0);
                }
                // Event Bindings 
            }, {
                key: "mouseup document",
                value: function (o) {
                    this.isDown && (this.isDown = !1, this.$store.emit("lastUpdateColor"));
                }
            }, {
                key: "mousemove document",
                value: function (o) {
                    this.isDown && this.setHueColor(o);
                }
            }, {
                key: "mousedown $drag_pointer",
                value: function (o) {
                    o.preventDefault(), this.isDown = !0;
                }
            }, {
                key: "mousedown $el",
                value: function (o) {
                    this.isDown = !0, this.setHueColor(o);
                }
            }, {
                key: "touchend document",
                value: function (o) {
                    this.isDown && (this.isDown = !1, this.$store.emit("lastUpdateColor"));
                }
            }, {
                key: "touchmove document",
                value: function (o) {
                    this.isDown && this.setHueColor(o);
                }
            }, {
                key: "touchstart $drag_pointer",
                value: function (o) {
                    o.preventDefault(), this.isDown = !0;
                }
            }, {
                key: "touchstart $el",
                value: function (o) {
                    o.preventDefault(), this.isDown = !0, this.setHueColor(o);
                }
            }]), c;
        }(lt), Vo = "chromedevtool-information", Io = function (u) {
            U(c, u);
            function c() {
                return K(this, c), j(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
            }
            return Y(c, [{
                key: "template",
                value: function () {
                    return (
                        /*html*/
                        `
        <div class="information hex">
            <div ref="$informationChange" class="information-change">
                <button ref="$formatChangeButton" type="button" class="format-change-button arrow-button"></button>
            </div>
            <div class="information-item hex">
                <div class="input-field hex">
                    <input ref="$hexCode" class="input" type="text" />
                    <div class="title">HEX</div>
                </div>
            </div>
            <div class="information-item rgb">
                <div class="input-field rgb-r">
                    <input ref="$rgb_r" class="input" type="number" step="1" min="0" max="255" />
                    <div class="title">R</div>
                </div>
                <div class="input-field rgb-g">
                    <input ref="$rgb_g" class="input" type="number" step="1" min="0" max="255" />
                    <div class="title">G</div>
                </div>
                <div class="input-field rgb-b">
                    <input ref="$rgb_b" class="input" type="number" step="1" min="0" max="255" />
                    <div class="title">B</div>
                </div>          
                <div class="input-field rgb-a">
                    <input ref="$rgb_a" class="input" type="number" step="0.01" min="0" max="1" />
                    <div class="title">A</div>
                </div>                                                            
            </div>
            <div class="information-item hsl">
                <div class="input-field hsl-h">
                    <input ref="$hsl_h" class="input" type="number" step="1" min="0" max="360" />
                    <div class="title">H</div>
                </div>
                <div class="input-field hsl-s">
                    <input ref="$hsl_s" class="input" type="number" step="1" min="0" max="100" />
                    <div class="postfix">%</div>
                    <div class="title">S</div>
                </div>
                <div class="input-field hsl-l">
                    <input ref="$hsl_l" class="input" type="number" step="1" min="0" max="100" />
                    <div class="postfix">%</div>                        
                    <div class="title">L</div>
                </div>
                <div class="input-field hsl-a">
                    <input ref="$hsl_a" class="input" type="number" step="0.01" min="0" max="1" />
                    <div class="title">A</div>
                </div>
            </div>
        </div>
        `
                    );
                }
            }, {
                key: "setCurrentFormat",
                value: function (o) {
                    this.format = o, this.initFormat();
                }
            }, {
                key: "initFormat",
                value: function () {
                    var o = this, d = this.format || "hex";
                    ["hex", "rgb", "hsl"].filter(function (f) {
                        return f !== d;
                    }).forEach(function (f) {
                        o.$el.removeClass(f);
                    }), this.$el.addClass(d);
                }
            }, {
                key: "nextFormat",
                value: function () {
                    var o = this.format || "hex", d = "hex";
                    o == "hex" ? d = "rgb" : o == "rgb" ? d = "hsl" : o == "hsl" && (d = "hex"), this.format = d, this.initFormat(), this.$store.dispatch("/changeFormat", this.format), this.$store.emit("lastUpdateColor");
                }
            }, {
                key: "goToFormat",
                value: function (o) {
                    this.format = o, (o === "rgb" || o === "hsl") && this.initFormat(), this.$store.dispatch("/changeFormat", this.format);
                }
            }, {
                key: "getFormat",
                value: function () {
                    return this.format || "hex";
                }
            }, {
                key: "checkNumberKey",
                value: function (o) {
                    var d = o.which, f = !1;
                    return (d == 37 || d == 39 || d == 8 || d == 46 || d == 9) && (f = !0), !(!f && (d < 48 || d > 57));
                }
            }, {
                key: "checkNotNumberKey",
                value: function (o) {
                    return !this.checkNumberKey(o);
                }
            }, {
                key: "changeRgbColor",
                value: function () {
                    this.$store.dispatch("/changeColor", {
                        type: "rgb",
                        r: this.refs.$rgb_r.int(),
                        g: this.refs.$rgb_g.int(),
                        b: this.refs.$rgb_b.int(),
                        a: this.refs.$rgb_a.float(),
                        source: Vo
                    }), this.$store.emit("lastUpdateColor");
                }
            }, {
                key: "changeHslColor",
                value: function () {
                    this.$store.dispatch("/changeColor", {
                        type: "hsl",
                        h: this.refs.$hsl_h.int(),
                        s: this.refs.$hsl_s.int(),
                        l: this.refs.$hsl_l.int(),
                        a: this.refs.$hsl_a.float(),
                        source: Vo
                    }), this.$store.emit("lastUpdateColor");
                }
            }, {
                key: "@changeColor",
                value: function (o) {
                    Vo != o && this.refresh();
                }
            }, {
                key: "@initColor",
                value: function () {
                    this.refresh();
                }
            }, {
                key: "input $rgb_r",
                value: function (o) {
                    this.changeRgbColor();
                }
            }, {
                key: "input $rgb_g",
                value: function (o) {
                    this.changeRgbColor();
                }
            }, {
                key: "input $rgb_b",
                value: function (o) {
                    this.changeRgbColor();
                }
            }, {
                key: "input $rgb_a",
                value: function (o) {
                    this.changeRgbColor();
                }
            }, {
                key: "input $hsl_h",
                value: function (o) {
                    this.changeHslColor();
                }
            }, {
                key: "input $hsl_s",
                value: function (o) {
                    this.changeHslColor();
                }
            }, {
                key: "input $hsl_l",
                value: function (o) {
                    this.changeHslColor();
                }
            }, {
                key: "input $hsl_a",
                value: function (o) {
                    this.changeHslColor();
                }
            }, {
                key: "keyup $hexCode",
                value: function (o) {
                    var d = this.refs.$hexCode.val();
                    d.charAt(0) == "#" && (d.length == 7 || d.length === 9) && (this.$store.dispatch("/changeColor", d, Vo), this.$store.emit("lastUpdateColor"));
                }
            }, {
                key: "click $formatChangeButton",
                value: function (o) {
                    this.nextFormat();
                }
            }, {
                key: "click $el .information-item.hex .input-field .title",
                value: function (o) {
                    this.goToFormat("hex");
                }
            }, {
                key: "click $el .information-item.rgb .input-field .title",
                value: function (o) {
                    this.goToFormat("hsl");
                }
            }, {
                key: "click $el .information-item.hsl .input-field .title",
                value: function (o) {
                    this.goToFormat("rgb");
                }
            }, {
                key: "setRGBInput",
                value: function () {
                    this.refs.$rgb_r.val(this.$store.rgb.r), this.refs.$rgb_g.val(this.$store.rgb.g), this.refs.$rgb_b.val(this.$store.rgb.b), this.refs.$rgb_a.val(this.$store.alpha);
                }
            }, {
                key: "setHSLInput",
                value: function () {
                    this.refs.$hsl_h.val(this.$store.hsl.h), this.refs.$hsl_s.val(this.$store.hsl.s), this.refs.$hsl_l.val(this.$store.hsl.l), this.refs.$hsl_a.val(this.$store.alpha);
                }
            }, {
                key: "setHexInput",
                value: function () {
                    this.refs.$hexCode.val(this.$store.dispatch("/toHEX"));
                }
            }, {
                key: "refresh",
                value: function () {
                    this.setCurrentFormat(this.$store.format), this.setRGBInput(), this.setHSLInput(), this.setHexInput();
                }
            }]), c;
        }(lt), bb = "data-colorsets-index", ko = function (u) {
            U(c, u);
            function c() {
                return K(this, c), j(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
            }
            return Y(c, [{
                key: "template",
                value: function () {
                    return `
            <div class="color-chooser">
                <div class="color-chooser-container">
                    <div class="colorsets-item colorsets-item-header">
                        <h1 class="title">Color Palettes</h1>
                        <span ref="$toggleButton" class="items">&times;</span>
                    </div>
                    <div ref="$colorsetsList" class="colorsets-list"></div>
                </div>
            </div>
        `;
                }
            }, {
                key: "refresh",
                value: function () {
                    this.load();
                }
            }, {
                key: "@changeCurrentColorSets",
                value: function () {
                    this.refresh();
                }
            }, {
                key: "@toggleColorChooser",
                value: function () {
                    this.toggle();
                }
                // loadable 
            }, {
                key: "load $colorsetsList",
                value: function () {
                    var o = this.$store.dispatch("/getColorSetsList");
                    return `
            <div>
                ` + o.map(function (d, f) {
                        return `
                        <div class="colorsets-item" data-colorsets-index="` + f + `" >
                            <h1 class="title">` + d.name + `</h1>
                            <div class="items">
                                <div>
                                    ` + d.colors.filter(function (v, x) {
                            return x < 5;
                        }).map(function (v) {
                            return v = v || "rgba(255, 255, 255, 1)", '<div class="color-item" title="' + v + `">
                                                <div class="color-view" style="background-color: ` + v + `"></div>
                                            </div>`;
                        }).join("") + `
                                </div>
                            </div>
                        </div>`;
                    }).join("") + `
            </div>
        `;
                }
            }, {
                key: "show",
                value: function () {
                    this.$el.addClass("open");
                }
            }, {
                key: "hide",
                value: function () {
                    this.$el.removeClass("open");
                }
            }, {
                key: "toggle",
                value: function () {
                    this.$el.toggleClass("open");
                }
            }, {
                key: "click $toggleButton",
                value: function (o) {
                    this.toggle();
                }
            }, {
                key: "click $colorsetsList .colorsets-item",
                value: function (o) {
                    var d = o.$delegateTarget;
                    if (d) {
                        var f = parseInt(d.attr(bb));
                        this.$store.dispatch("/setCurrentColorSets", f), this.hide();
                    }
                }
            }, {
                key: "destroy",
                value: function () {
                    M(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "destroy", this).call(this), this.hide();
                }
            }]), c;
        }(lt), Co = function (u) {
            U(c, u);
            function c() {
                return K(this, c), j(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
            }
            return Y(c, [{
                key: "template",
                value: function () {
                    return `
            <div class="colorsets">
                <div class="menu" title="Open Color Palettes">
                    <button ref="$colorSetsChooseButton" type="button" class="color-sets-choose-btn arrow-button"></button>
                </div>
                <div ref="$colorSetsColorList" class="color-list"></div>
            </div>
        `;
                }
            }, {
                key: "load $colorSetsColorList",
                value: function () {
                    var o = this.$store.dispatch("/getCurrentColorSets"), d = this.$store.dispatch("/getCurrentColors");
                    return `
            <div>
                <h6>` + o.name + `</h6>
                <div class="current-color-sets">
                ` + d.map(function (f, v) {
                        return '<div class="color-item" title="' + f + '" data-index="' + v + '" data-color="' + f + `">
                        <div class="empty"></div>
                        <div class="color-view" style="background-color: ` + f + `"></div>
                    </div>`;
                    }).join("") + `   
                ` + (o.edit ? '<div class="add-color-item">+</div>' : "") + `         
                </div>
            </div>
            
        `;
                }
            }, {
                key: "refresh",
                value: function () {
                    this.load();
                }
            }, {
                key: "addColor",
                value: function (o) {
                    this.$store.dispatch("/addCurrentColor", o);
                }
            }, {
                key: "@changeCurrentColorSets",
                value: function () {
                    this.refresh();
                }
            }, {
                key: "click $colorSetsChooseButton",
                value: function (o) {
                    this.$store.emit("toggleColorChooser");
                }
            }, {
                key: "contextmenu $colorSetsColorList",
                value: function (o) {
                    o.preventDefault();
                    var d = this.$store.dispatch("/getCurrentColorSets");
                    if (d.edit) {
                        var f = new Wt(o.target), v = f.closest("color-item");
                        if (v) {
                            var x = parseInt(v.attr("data-index"));
                            this.$store.emit("showContextMenu", o, x);
                        } else
                            this.$store.emit("showContextMenu", o);
                    }
                }
            }, {
                key: "click $colorSetsColorList .add-color-item",
                value: function (o) {
                    this.addColor(this.$store.dispatch("/toColor"));
                }
            }, {
                key: "click $colorSetsColorList .color-item",
                value: function (o) {
                    this.$store.dispatch("/changeColor", o.$delegateTarget.attr("data-color")), this.$store.emit("lastUpdateColor");
                }
            }]), c;
        }(lt), So = function (u) {
            U(c, u);
            function c() {
                return K(this, c), j(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
            }
            return Y(c, [{
                key: "template",
                value: function () {
                    return `
            <ul class="colorsets-contextmenu">
                <li class="menu-item small-hide" data-type="remove-color">Remove color</li>
                <li class="menu-item small-hide" data-type="remove-all-to-the-right">Remove all to the right</li>
                <li class="menu-item" data-type="clear-palette">Clear palette</li>
            </ul>
        `;
                }
            }, {
                key: "show",
                value: function (o, d) {
                    var f = Pt.pos(o);
                    this.$el.css({
                        top: f.clientY - 10 + "px",
                        left: f.clientX + "px"
                    }), this.$el.addClass("show"), this.selectedColorIndex = d, typeof this.selectedColorIndex > "u" ? this.$el.addClass("small") : this.$el.removeClass("small");
                }
            }, {
                key: "hide",
                value: function () {
                    this.$el.removeClass("show");
                }
            }, {
                key: "runCommand",
                value: function (o) {
                    switch (o) {
                        case "remove-color":
                            this.$store.dispatch("/removeCurrentColor", this.selectedColorIndex);
                            break;
                        case "remove-all-to-the-right":
                            this.$store.dispatch("/removeCurrentColorToTheRight", this.selectedColorIndex);
                            break;
                        case "clear-palette":
                            this.$store.dispatch("/clearPalette");
                            break;
                    }
                }
            }, {
                key: "@showContextMenu",
                value: function (o, d) {
                    this.show(o, d);
                }
            }, {
                key: "click $el .menu-item",
                value: function (o) {
                    o.preventDefault(), this.runCommand(o.$delegateTarget.attr("data-type")), this.hide();
                }
            }]), c;
        }(lt), Mc = function (u) {
            U(c, u);
            function c() {
                return K(this, c), j(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
            }
            return Y(c, [{
                key: "template",
                value: function () {
                    return `
            <div class='colorpicker-body'>
                <div target="colorwheel"></div>
                <div target="control"></div>
                <div target="information"></div>
                <div target="currentColorSets"></div>
                <div target="colorSetsChooser"></div>
                <div target="contextMenu"></div>                
            </div>
        `;
                }
            }, {
                key: "components",
                value: function () {
                    return {
                        colorwheel: Jc,
                        control: pb,
                        information: Io,
                        currentColorSets: Co,
                        colorSetsChooser: ko,
                        contextMenu: So
                    };
                }
            }]), c;
        }(gn), Fc = function (u) {
            U(c, u);
            function c(a) {
                K(this, c);
                var o = j(this, (c.__proto__ || Object.getPrototypeOf(c)).call(this, a));
                return o.minValue = 0, o.maxValue = 360, o.source = "hue-control", o;
            }
            return Y(c, [{
                key: "template",
                value: function () {
                    return (
                        /*html*/
                        `
            <div class="hue"> 
                <div ref="$container" class="hue-container">
                    <div ref="$bar" class="drag-bar"></div>
                </div>
            </div>
        `
                    );
                }
            }, {
                key: "getDefaultValue",
                value: function () {
                    return this.$store.hsv.h;
                }
            }, {
                key: "refreshColorUI",
                value: function (o) {
                    var d = this.getCaculatedDist(o), f = this.setColorUI(d / 100 * this.maxValue);
                    f !== !0 && this.changeColor({
                        h: d / 100 * this.maxValue,
                        type: "hsv"
                    });
                }
            }]), c;
        }(Fi), fb = function (u) {
            U(c, u);
            function c() {
                return K(this, c), j(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
            }
            return Y(c, [{
                key: "initialize",
                value: function () {
                    M(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "initialize", this).call(this), this.minValue = 0, this.maxValue = 360, this.hueScaleDist = 0.05;
                }
            }, {
                key: "template",
                value: function () {
                    return (
                        /*html*/
                        `
            <div class="hue-scale">
                <div ref="$container" class="hue-scale-container">
                    <div ref="$bar" class="drag-bar"></div>
                </div>
            </div>
        `
                    );
                }
            }, {
                key: "getDefaultValue",
                value: function () {
                    return this.$store.hsv.h;
                }
                /** get calculated dist for domain value   */
            }, {
                key: "getCalculatedDist",
                value: function (o) {
                    var d = o ? this.getMousePosition(o) : this.getCurrent(this.getDefaultValue() / this.maxValue), f = this.getDist(d);
                    return f;
                }
            }, {
                key: "refreshColorUI",
                value: function (o) {
                    var d = this.getCalculatedDist(o), f = this.setColorUI(d / 100);
                    f !== !0 && this.changeColor({
                        h: (this.minValue + this.fullDist * (d / 100)) * 360,
                        type: "hsv"
                    });
                }
            }, {
                key: "setColorUI",
                value: function (o) {
                    var d = void 0;
                    if (o) {
                        if (d = this.minValue + o * this.fullDist, this.lastP === d)
                            return !0;
                        this.lastP = d;
                    } else {
                        if (d = this.getDefaultValue() / 360, this.lastP === d)
                            return !0;
                        this.lastP = d;
                        var f = d + 0.05, v = d - 0.05;
                        if (f > 1)
                            f = 1, v = 1 - this.hueScaleDist * 2;
                        else if (v < 0) {
                            var x = Math.abs(v);
                            v = 0, f = f + x;
                        }
                        var k = _a.getHueScale(d, v, f);
                        this.list = k;
                        var S = k[0].start, R = k[k.length - 1].start;
                        this.minValue = S, this.maxValue = R;
                        var w = this.maxValue - this.minValue;
                        this.fullDist = w;
                        var F = k.map(function (Q) {
                            return {
                                color: Q.rgb,
                                percent: (Q.start - S) / w * 100,
                                unit: "%"
                            };
                        });
                        this.refs.$container.css("background-image", "linear-gradient(to right, " + F.map(function (Q) {
                            return Q.color + " " + Q.percent + Q.unit;
                        }).join(",") + ")");
                    }
                    d <= this.minValue ? (d = this.minValue, this.refs.$bar.addClass("first").removeClass("last")) : d >= this.maxValue ? (d = this.maxValue, this.refs.$bar.addClass("last").removeClass("first")) : this.refs.$bar.removeClass("last").removeClass("first"), this.setMousePosition(this.getMaxDist() * ((d - this.minValue) / this.fullDist));
                }
            }]), c;
        }(Fi), $c = "chromedevtool-control", gb = function (u) {
            U(c, u);
            function c() {
                return K(this, c), j(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
            }
            return Y(c, [{
                key: "components",
                value: function () {
                    return { Hue: Fc, Opacity: Wo, HueScale: fb };
                }
            }, {
                key: "template",
                value: function () {
                    return `
        <div class="control">
            <div target="Hue" ></div>
            <div target="HueScale" ></div>
            <div target="Opacity" ></div>
            <div ref="$controlPattern" class="empty"></div>
            <div ref="$controlColor" class="color"></div>
            <div ref="$controlPattern2" class="empty2"></div>
            <div ref="$controlColor2" class="color2"></div>            
        </div>
        `;
                }
            }, {
                key: "setBackgroundColor",
                value: function () {
                    this.refs.$controlColor.css("background-color", this.$store.dispatch("/toRGB"));
                }
            }, {
                key: "setLastUpdateColor",
                value: function () {
                    this.refs.$controlColor2.css("background-color", this.$store.dispatch("/toRGB"));
                }
            }, {
                key: "refresh",
                value: function () {
                    this.setColorUI(), this.setBackgroundColor();
                }
            }, {
                key: "setColorUI",
                value: function () {
                    this.Hue.setColorUI(), this.Opacity.setColorUI();
                }
            }, {
                key: "@changeColor",
                value: function (o) {
                    $c != o && this.refresh();
                }
            }, {
                key: "@lastUpdateColor",
                value: function (o) {
                    $c != o && this.setLastUpdateColor();
                }
            }, {
                key: "@initColor",
                value: function () {
                    this.refresh();
                }
            }]), c;
        }(lt), Uc = "chromedevtool-palette", di = function (u) {
            U(c, u);
            function c() {
                return K(this, c), j(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
            }
            return Y(c, [{
                key: "template",
                value: function () {
                    return (
                        /*html*/
                        `
        <div class="color">
            <div ref="$saturation" class="saturation">
                <div ref="$value" class="value">
                    <div ref="$drag_pointer" class="drag-pointer" data-axis-value="all">
                        <div ref="$left_saturation" class="left-saturation" data-axis-value="saturation"></div>
                        <div ref="$right_saturation" class="right-saturation" data-axis-value="saturation"></div>
                        <div ref="$top_value" class="top-value" data-axis-value="value"></div>
                        <div ref="$bottom_value" class="bottom-value" data-axis-value="value"></div>
                    </div>
                </div>
            </div>        
        </div>        
        `
                    );
                }
            }, {
                key: "setBackgroundColor",
                value: function (o) {
                    this.$el.css("background-color", o);
                }
            }, {
                key: "refresh",
                value: function () {
                    this.cacheSize(), this.setColorUI();
                }
            }, {
                key: "calculateSV",
                value: function () {
                    var o = this.drag_pointer_pos || { x: 0, y: 0 }, d = this.state.get("$el.width"), f = this.state.get("$el.height"), v = o.x / d, x = (f - o.y) / f;
                    this.$store.dispatch("/changeColor", {
                        type: "hsv",
                        s: v,
                        v: x,
                        source: Uc
                    });
                }
            }, {
                key: "setColorUI",
                value: function () {
                    var o = this.w * this.$store.hsv.s, d = this.h * (1 - this.$store.hsv.v);
                    this.refs.$drag_pointer.css({
                        left: o + "px",
                        top: d + "px"
                    }), this.drag_pointer_pos = { x: o, y: d }, this.setBackgroundColor(this.$store.dispatch("/getHueColor"));
                }
            }, {
                key: "setSubColor",
                value: function (o) {
                    var d = o.pageX, f = o.pageY, v = d - this.x, x = f - this.y, k = this.$el.contentWidth(), S = this.$el.contentHeight(), R = this.refs.$drag_pointer.cssFloat("left"), w = this.refs.$drag_pointer.cssFloat("top");
                    this.axis === "saturation" ? R += v : this.axis === "value" && (w += x), R < 0 ? R = 0 : R > k && (R = k), w < 0 ? w = 0 : w > S && (w = S), this.refs.$drag_pointer.px("left", R), this.refs.$drag_pointer.px("top", w), this.drag_pointer_pos = { x: R, y: w }, this.x = d, this.y = f, this.calculateSV();
                }
            }, {
                key: "setMainColor",
                value: function (o) {
                    var d = this.$el.offset(), f = this.w, v = this.h, x = Pt.pos(o).pageX - d.left, k = Pt.pos(o).pageY - d.top;
                    x < 0 ? x = 0 : x > f && (x = f), k < 0 ? k = 0 : k > v && (k = v), this.refs.$drag_pointer.css({
                        left: x + "px",
                        top: k + "px"
                    }), this.drag_pointer_pos = { x, y: k }, this.calculateSV();
                }
            }, {
                key: "@changeColor",
                value: function (o) {
                    Uc != o && this.refresh();
                }
            }, {
                key: "@initColor",
                value: function () {
                    this.refresh();
                }
            }, {
                key: "mouseup document",
                value: function (o) {
                    this.isDown && (this.isDown = !1, this.$store.emit("lastUpdateColor"));
                }
            }, {
                key: "mousemove document",
                value: function (o) {
                    this.isDown && (this.cacheSize(), this.axis === "saturation" || this.axis === "value" ? this.setSubColor(o) : this.setMainColor(o));
                }
            }, {
                key: "mousedown",
                value: function (o) {
                    this.isDown = !0, this.cacheSize(), this.axis = new Wt(o.target).attr("data-axis-value"), this.x = o.pageX, this.y = o.pageY, this.axis === "saturation" || this.axis === "value" ? this.setSubColor(o) : this.setMainColor(o);
                }
            }, {
                key: "touchend document",
                value: function (o) {
                    this.isDown && (this.isDown = !1, this.$store.emit("lastUpdateColor"));
                }
            }, {
                key: "touchmove document",
                value: function (o) {
                    this.isDown && this.setMainColor(o);
                }
            }, {
                key: "touchstart",
                value: function (o) {
                    o.preventDefault(), this.isDown = !0, this.cacheSize(), this.setMainColor(o);
                }
            }, {
                key: "cacheSize",
                value: function () {
                    this.w = this.state.get("$el.contentWidth"), this.h = this.state.get("$el.contentHeight");
                }
            }]), c;
        }(lt), ol = function (u) {
            U(c, u);
            function c() {
                return K(this, c), j(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
            }
            return Y(c, [{
                key: "template",
                value: function () {
                    return `
            <div class='colorpicker-body'>
                <div target="palette"></div> 
                <div target="control"></div>
                <div target="information"></div>
                <div target="currentColorSets"></div>
                <div target="colorSetsChooser"></div>
                <div target="contextMenu"></div>
            </div>
        `;
                }
            }, {
                key: "components",
                value: function () {
                    return {
                        palette: di,
                        control: gb,
                        information: Io,
                        currentColorSets: Co,
                        colorSetsChooser: ko,
                        contextMenu: So
                    };
                }
            }]), c;
        }(gn), yb = "mini-control", Zb = function (u) {
            U(c, u);
            function c() {
                return K(this, c), j(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
            }
            return Y(c, [{
                key: "components",
                value: function () {
                    return { Hue: Fc, Opacity: Wo };
                }
            }, {
                key: "template",
                value: function () {
                    return `
        <div class="control">
            <div target="Hue" ></div>
            <div target="Opacity" ></div>
        </div>
        `;
                }
            }, {
                key: "refresh",
                value: function () {
                    this.setColorUI();
                }
            }, {
                key: "setColorUI",
                value: function () {
                    this.Hue.setColorUI(), this.Opacity.setColorUI();
                }
            }, {
                key: "@changeColor",
                value: function (o) {
                    yb != o && this.refresh();
                }
            }, {
                key: "@initColor",
                value: function () {
                    this.refresh();
                }
            }]), c;
        }(lt), jc = function (u) {
            U(c, u);
            function c() {
                return K(this, c), j(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
            }
            return Y(c, [{
                key: "template",
                value: function () {
                    return `
            <div class='colorpicker-body'>
                <div target="palette"></div>
                <div target="control"></div>
            </div>
        `;
                }
            }, {
                key: "components",
                value: function () {
                    return {
                        palette: di,
                        control: Zb
                    };
                }
            }]), c;
        }(gn), Ec = function (u) {
            U(c, u);
            function c(a) {
                K(this, c);
                var o = j(this, (c.__proto__ || Object.getPrototypeOf(c)).call(this, a));
                return o.source = "vertical-slider", o;
            }
            return Y(c, [{
                key: "getMaxDist",
                value: function () {
                    return this.state.get("$container.height");
                }
                /** set mouse pointer for vertical slider */
            }, {
                key: "setMousePosition",
                value: function (o) {
                    this.refs.$bar.css({ top: o + "px" });
                }
                /** get mouse position by pageY for vertical slider */
            }, {
                key: "getMousePosition",
                value: function (o) {
                    return Pt.pos(o).pageY;
                }
                /** get min position for vertial slider */
            }, {
                key: "getMinPosition",
                value: function () {
                    return this.refs.$container.offset().top;
                }
                /** get caculated dist for domain value   */
            }, {
                key: "getCaculatedDist",
                value: function (o) {
                    var d = o ? this.getMousePosition(o) : this.getCurrent(this.getDefaultValue() / this.maxValue), f = 100 - this.getDist(d);
                    return f;
                }
                /** set drag bar position  */
            }, {
                key: "setColorUI",
                value: function (o) {
                    o = o || this.getDefaultValue(), o <= this.minValue ? this.refs.$bar.addClass("first").removeClass("last") : o >= this.maxValue ? this.refs.$bar.addClass("last").removeClass("first") : this.refs.$bar.removeClass("last").removeClass("first");
                    var d = 1 - (o || 0) / this.maxValue;
                    this.setMousePosition(this.getMaxDist() * d);
                }
            }]), c;
        }(Fi), al = function (u) {
            U(c, u);
            function c(a) {
                K(this, c);
                var o = j(this, (c.__proto__ || Object.getPrototypeOf(c)).call(this, a));
                return o.minValue = 0, o.maxValue = 360, o.source = "vertical-hue-control", o;
            }
            return Y(c, [{
                key: "template",
                value: function () {
                    return `
            <div class="hue">
                <div ref="$container" class="hue-container">
                    <div ref="$bar" class="drag-bar"></div>
                </div>
            </div>
        `;
                }
            }, {
                key: "getDefaultValue",
                value: function () {
                    return this.$store.hsv.h;
                }
            }, {
                key: "refreshColorUI",
                value: function (o) {
                    var d = this.getCaculatedDist(o);
                    this.setColorUI(d / 100 * this.maxValue), this.changeColor({
                        h: d / 100 * this.maxValue,
                        type: "hsv"
                    });
                }
            }]), c;
        }(Ec), ll = function (u) {
            U(c, u);
            function c(a) {
                K(this, c);
                var o = j(this, (c.__proto__ || Object.getPrototypeOf(c)).call(this, a));
                return o.source = "vertical-opacity-control", o;
            }
            return Y(c, [{
                key: "template",
                value: function () {
                    return `
        <div class="opacity">
            <div ref="$container" class="opacity-container">
                <div ref="$colorbar" class="color-bar"></div>
                <div ref="$bar" class="drag-bar2"></div>
            </div>
        </div>
        `;
                }
            }, {
                key: "refresh",
                value: function () {
                    M(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "refresh", this).call(this), this.setOpacityColorBar();
                }
            }, {
                key: "setOpacityColorBar",
                value: function () {
                    var o = Object.assign({}, this.$store.rgb);
                    o.a = 0;
                    var d = be.format(o, "rgb");
                    o.a = 1;
                    var f = be.format(o, "rgb");
                    this.refs.$colorbar.css("background", "linear-gradient(to top, " + d + ", " + f + ")");
                }
            }, {
                key: "getDefaultValue",
                value: function () {
                    return this.$store.alpha;
                }
            }, {
                key: "refreshColorUI",
                value: function (o) {
                    var d = this.getCaculatedDist(o);
                    this.setColorUI(d / 100 * this.maxValue), this.changeColor({
                        a: Math.floor(d) / 100 * this.maxValue
                    });
                }
            }]), c;
        }(Ec), vb = "mini-control", xb = function (u) {
            U(c, u);
            function c() {
                return K(this, c), j(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
            }
            return Y(c, [{
                key: "components",
                value: function () {
                    return { Hue: al, Opacity: ll };
                }
            }, {
                key: "template",
                value: function () {
                    return '<div class="control"><div target="Hue" ></div><div target="Opacity" ></div></div>';
                }
            }, {
                key: "refresh",
                value: function () {
                    this.setColorUI();
                }
            }, {
                key: "setColorUI",
                value: function () {
                    this.Hue.setColorUI(), this.Opacity.setColorUI();
                }
            }, {
                key: "@changeColor",
                value: function (o) {
                    vb != o && this.refresh();
                }
            }, {
                key: "@initColor",
                value: function () {
                    this.refresh();
                }
            }]), c;
        }(lt), Pc = function (u) {
            U(c, u);
            function c() {
                return K(this, c), j(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
            }
            return Y(c, [{
                key: "template",
                value: function () {
                    return `
            <div class='colorpicker-body'>
                <div target="palette"></div><div target="control"></div>
            </div>
        `;
                }
            }, {
                key: "components",
                value: function () {
                    return {
                        palette: di,
                        control: xb
                    };
                }
            }]), c;
        }(gn), Gb = "macos-control", Xb = function (u) {
            U(c, u);
            function c() {
                return K(this, c), j(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
            }
            return Y(c, [{
                key: "components",
                value: function () {
                    return { Value: wc, Opacity: Wo };
                }
            }, {
                key: "template",
                value: function () {
                    return `
        <div class="control">
            <div target="Value" ></div>
            <div target="Opacity" ></div>
            <div ref="$controlPattern" class="empty"></div>
            <div ref="$controlColor" class="color"></div>
        </div>
        `;
                }
            }, {
                key: "setBackgroundColor",
                value: function () {
                    this.refs.$controlColor.css("background-color", this.$store.dispatch("/toRGB"));
                }
            }, {
                key: "refresh",
                value: function () {
                    this.setColorUI(), this.setBackgroundColor();
                }
            }, {
                key: "setColorUI",
                value: function () {
                    this.Value.setColorUI(), this.Opacity.setColorUI();
                }
            }, {
                key: "@changeColor",
                value: function (o) {
                    Gb != o && this.refresh();
                }
            }, {
                key: "@initColor",
                value: function () {
                    this.refresh();
                }
            }]), c;
        }(lt), Wb = function (u) {
            U(c, u);
            function c(a) {
                K(this, c);
                var o = j(this, (c.__proto__ || Object.getPrototypeOf(c)).call(this, a));
                return o.width = 214, o.height = 214, o.thinkness = 16, o.half_thinkness = o.thinkness / 2, o.source = "colorring", o;
            }
            return Y(c, [{
                key: "template",
                value: function () {
                    return `
        <div class="wheel" data-type="ring">
            <canvas class="wheel-canvas" ref="$colorwheel" ></canvas>
            <div class="drag-pointer" ref="$drag_pointer"></div>
        </div>
        `;
                }
            }, {
                key: "setColorUI",
                value: function (o) {
                    this.renderCanvas(), this.setHueColor(null, o);
                }
            }, {
                key: "getDefaultValue",
                value: function () {
                    return this.$store.hsv.h;
                }
            }, {
                key: "setHueColor",
                value: function (o, d) {
                    if (this.state.get("$el.width")) {
                        var f = this.getRectangle(), v = f.minX, x = f.minY, k = f.radius, S = f.centerX, R = f.centerY, w = this.getCurrentXY(o, this.getDefaultValue(), k, S, R), F = w.x, Q = w.y, O = F - S, A = Q - R, ee = y(O, A), ae = this.getCurrentXY(null, ee, k - this.half_thinkness, S, R), F = ae.x, Q = ae.y;
                        this.refs.$drag_pointer.css({
                            left: F - v + "px",
                            top: Q - x + "px"
                        }), d || this.changeColor({
                            type: "hsv",
                            h: ee
                        });
                    }
                }
            }]), c;
        }(Jc), Bc = function (u) {
            U(c, u);
            function c() {
                return K(this, c), j(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
            }
            return Y(c, [{
                key: "template",
                value: function () {
                    return `
            <div class='colorpicker-body'>
                <div target="colorring"></div>
                <div target="palette"></div> 
                <div target="control"></div>
                <div target="information"></div>
                <div target="currentColorSets"></div>
                <div target="colorSetsChooser"></div>
                <div target="contextMenu"></div>
            </div>
        `;
                }
            }, {
                key: "components",
                value: function () {
                    return {
                        colorring: Wb,
                        palette: di,
                        control: Xb,
                        information: Io,
                        currentColorSets: Co,
                        colorSetsChooser: ko,
                        contextMenu: So
                    };
                }
            }]), c;
        }(gn), Vb = function (u) {
            U(c, u);
            function c() {
                return K(this, c), j(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
            }
            return Y(c, [{
                key: "components",
                value: function () {
                    return { Hue: al, Opacity: ll };
                }
            }, {
                key: "template",
                value: function () {
                    return `
        <div class="control">
            <div target="Hue" ></div>
            <div target="Opacity" ></div>
        </div>
        `;
                }
            }, {
                key: "refresh",
                value: function () {
                    this.setColorUI();
                }
            }, {
                key: "setColorUI",
                value: function () {
                    this.Hue.setColorUI(), this.Opacity.setColorUI();
                }
            }, {
                key: "@changeColor",
                value: function () {
                    this.refresh();
                }
            }, {
                key: "@initColor",
                value: function () {
                    this.refresh();
                }
            }]), c;
        }(lt), Ib = function (u) {
            U(c, u);
            function c() {
                return K(this, c), j(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
            }
            return Y(c, [{
                key: "template",
                value: function () {
                    return `
            <div class='colorpicker-body'>
                <div target="palette"></div> 
                <div target="control"></div>
                <div target="information"></div>
                <div target="currentColorSets"></div>
                <div target="colorSetsChooser"></div>
                <div target="contextMenu"></div>
            </div>
        `;
                }
            }, {
                key: "components",
                value: function () {
                    return {
                        palette: di,
                        control: Vb,
                        information: Io,
                        currentColorSets: Co,
                        colorSetsChooser: ko,
                        contextMenu: So
                    };
                }
            }]), c;
        }(gn), kb = "mini-control", Cb = function (u) {
            U(c, u);
            function c() {
                return K(this, c), j(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
            }
            return Y(c, [{
                key: "components",
                value: function () {
                    return { Hue: al, Opacity: ll };
                }
            }, {
                key: "template",
                value: function () {
                    return (
                        /*html*/
                        `
            <div class="control">
                <div target="Opacity" ></div>            
                <div target="Hue" ></div>
            </div>
        `
                    );
                }
            }, {
                key: "refresh",
                value: function () {
                    this.setColorUI();
                }
            }, {
                key: "setColorUI",
                value: function () {
                    this.Hue.setColorUI(), this.Opacity.setColorUI();
                }
            }, {
                key: "@changeColor",
                value: function (o) {
                    kb != o && this.refresh();
                }
            }, {
                key: "@initColor",
                value: function () {
                    this.refresh();
                }
            }]), c;
        }(lt), Oc = function (u) {
            U(c, u);
            function c() {
                return K(this, c), j(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
            }
            return Y(c, [{
                key: "template",
                value: function () {
                    return (
                        /*html*/
                        `
            <div class='colorpicker-body'>
                <div class='color-view'>
                    <div class='color-view-container'  ref="$colorview"></div>
                </div>
                <div class='color-tool'>
                    <div target="palette"></div>
                    <div target="control"></div>
                </div>
            </div>
        `
                    );
                }
            }, {
                key: "components",
                value: function () {
                    return {
                        palette: di,
                        control: Cb
                    };
                }
            }, {
                key: "initColorWithoutChangeEvent",
                value: function (o) {
                    this.$store.dispatch("/initColor", o), this.refresh();
                }
            }, {
                key: "setBackgroundColor",
                value: function () {
                    var o = this.$store.dispatch("/toColor"), d = this.$store.rgb, f = be.brightness(d.r, d.g, d.b);
                    this.refs.$colorview.css({
                        "background-color": o,
                        color: f > 127 ? "black" : "white"
                    }), this.refs.$colorview.html(o);
                }
            }, {
                key: "click $colorview",
                value: function (o) {
                    this.nextFormat();
                }
            }, {
                key: "nextFormat",
                value: function () {
                    var o = this.$store.format || "hex", d = "hex";
                    o == "hex" ? d = "rgb" : o == "rgb" ? d = "hsl" : o == "hsl" && (d = "hex"), this.$store.dispatch("/changeFormat", d), this.$store.emit("lastUpdateColor"), this.refresh();
                }
            }, {
                key: "refresh",
                value: function () {
                    this.setBackgroundColor();
                }
            }, {
                key: "@changeColor",
                value: function () {
                    this.refresh();
                }
            }, {
                key: "@initColor",
                value: function () {
                    this.refresh();
                }
            }]), c;
        }(gn), Ac = {
            create: function (c) {
                switch (c.type) {
                    case "macos":
                        return new Mc(c);
                    case "xd":
                        return new Ib(c);
                    case "ring":
                        return new Bc(c);
                    case "mini":
                        return new jc(c);
                    case "vscode":
                        return new Oc(c);
                    case "mini-vertical":
                        return new Pc(c);
                    case "sketch":
                    case "palette":
                    default:
                        return new ol(c);
                }
            },
            ColorPicker: ol,
            ChromeDevToolColorPicker: ol,
            MacOSColorPicker: Mc,
            RingColorPicker: Bc,
            MiniColorPicker: jc,
            VSCodePicker: Oc,
            MiniVerticalColorPicker: Pc
        }, Sb = function (u) {
            U(c, u);
            function c() {
                return K(this, c), j(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
            }
            return Y(c, [{
                key: "afterRender",
                value: function () {
                    var o = this, d = this.opt, f = d.opt.colorpickerOptions || {
                        type: "sketch"
                    };
                    this.colorPicker = Ac.create(z({
                        position: "inline",
                        container: this.refs.$el.el,
                        onChange: function (x) {
                            o.changeColor(x);
                        },
                        onLastUpdate: function (x) {
                            o.changeColor(x, !0);
                        }
                    }, f));
                }
            }, {
                key: "template",
                value: function () {
                    return '<div ref="$color"></div>';
                }
            }, {
                key: "changeColor",
                value: function (o) {
                    var d = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
                    this.$store.emit("changeEmbedColorPicker", o, d);
                }
            }, {
                key: "setValue",
                value: function (o) {
                    this.colorPicker.initColorWithoutChangeEvent(o);
                }
            }]), c;
        }(lt);
        function Qc(u) {
            var c = [];
            return u.layers.length && u.layers.forEach(function (a) {
                c.push.apply(c, te(Qc(a)));
            }), c.push(u), c;
        }
        var Dc = function () {
            function u() {
                var c = this, a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                return K(this, u), a instanceof u && (a = a.toJSON()), this.json = this.convert(z({}, this.getDefaultObject(), a)), this.ref = new Proxy(this, {
                    get: function (d, f) {
                        var v = d[f];
                        return Qa(v) ? function () {
                            for (var x = arguments.length, k = Array(x), S = 0; S < x; S++)
                                k[S] = arguments[S];
                            return v.apply(d, k);
                        } : v || d.json[f];
                    },
                    set: function (d, f, v) {
                        if (v && v.realVal && Qa(v.realVal) && (v = v.realVal()), c.checkField(f, v))
                            d.json[f] = v;
                        else
                            throw new Error(v + " is invalid as " + f + " property value.");
                        return !0;
                    }
                }), this.ref;
            }
            return Y(u, [{
                key: "getDefaultTitle",
                value: function () {
                    return "Item";
                }
                /**
                 * check attribute object
                 */
            }, {
                key: "isAttribute",
                value: function () {
                    return !1;
                }
                /***********************************
                 *
                 * getter
                 *
                 **********************************/
            }, {
                key: "is",
                value: function () {
                    if (!this.json)
                        return !1;
                    for (var a = arguments.length, o = Array(a), d = 0; d < a; d++)
                        o[d] = arguments[d];
                    return o.indexOf(this.json.itemType) > -1;
                }
                /***********************************
                 *
                 * action
                 *
                 **********************************/
                /**
                 * when json is loaded, json object is be a new instance
                 *
                 * @param {*} json
                 */
            }, {
                key: "convert",
                value: function (a) {
                    return a;
                }
                /**
                 * defence to set invalid key-value
                 *
                 * @param {*} key
                 * @param {*} value
                 */
            }, {
                key: "checkField",
                value: function (a, o) {
                    return !0;
                }
            }, {
                key: "toCloneObject",
                value: function () {
                    var a = {
                        itemType: this.json.itemType,
                        type: this.json.type,
                        selected: this.json.selected
                    };
                    return a;
                }
                /**
                 * clone Item
                 */
            }, {
                key: "clone",
                value: function () {
                    var a = this.constructor, o = new a(this.toCloneObject());
                    return o.parent = this.json.parent, o;
                }
                /**
                 * set json content
                 *
                 * @param {object} obj
                 */
            }, {
                key: "reset",
                value: function (a) {
                    a instanceof u && (a = a.toJSON()), this.json = this.convert(z({}, this.json, a));
                }
                /**
                 * define defaut object for item
                 *
                 * @param {object} obj
                 */
            }, {
                key: "getDefaultObject",
                value: function () {
                    var a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                    return z({
                        // id: uuidShort(),
                        selected: !1,
                        // 선택 여부 체크 
                        type: "",
                        itemType: ""
                    }, a);
                }
            }, {
                key: "add",
                value: function (a) {
                    return this.json.layers.push(a), a.parent = this.ref, a;
                }
                /**
                 * toggle item's attribute
                 *
                 * @param {*} field
                 * @param {*} toggleValue
                 */
            }, {
                key: "toggle",
                value: function (a, o) {
                    Kn(o) ? this.json[a] = !this.json[a] : this.json[a] = !!o;
                }
                /**
                 * convert to json
                 */
            }, {
                key: "toJSON",
                value: function () {
                    return this.json;
                }
            }, {
                key: "resize",
                value: function () {
                }
            }, {
                key: "copy",
                value: function () {
                    this.json.parent.copyItem(this.ref);
                }
            }, {
                key: "copyItem",
                value: function (a) {
                    var o = a.clone();
                    o.width.add(10), o.width.add(10);
                    for (var d = this.json.layers, f = -1, v = 0, x = d.length; v < x; v++)
                        if (d[v] === a) {
                            f = v;
                            break;
                        }
                    f > -1 && this.json.layers.splice(f, 0, o);
                }
            }, {
                key: "remove",
                value: function () {
                    this.json.parent.removeItem(this.ref);
                }
            }, {
                key: "removeItem",
                value: function (a) {
                    for (var o = this.json.layers, d = -1, f = 0, v = o.length; f < v; f++)
                        if (o[f] === a) {
                            d = f;
                            break;
                        }
                    d > -1 && this.json.layers.splice(d, 1);
                }
            }, {
                key: "title",
                get: function () {
                    return this.json.name || this.getDefaultTitle();
                }
                /**
                 * get id
                 */
            }, {
                key: "id",
                get: function () {
                    return this.json.id;
                }
            }, {
                key: "layers",
                get: function () {
                    return this.json.layers;
                }
            }, {
                key: "parent",
                get: function () {
                    return this.json.parent;
                }
            }, {
                key: "html",
                get: function () {
                    var a = this.json, o = a.elementType, d = a.id, f = a.layers, v = a.itemType, x = o || "div";
                    return `
    <` + x + " class='element-item " + v + `' data-id="` + d + `">
      ` + f.map(function (k) {
                        return k.html;
                    }).join("") + `
    </` + x + `>
    `;
                }
            }, {
                key: "allLayers",
                get: function () {
                    return [].concat(te(Qc(this.ref)));
                }
            }]), u;
        }(), Rb = function (u) {
            U(c, u);
            function c() {
                return K(this, c), j(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
            }
            return Y(c, [{
                key: "getDefaultObject",
                value: function () {
                    var o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                    return M(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "getDefaultObject", this).call(this, z({
                        itemType: "image-resource",
                        type: "image"
                    }, o));
                }
            }, {
                key: "isGradient",
                value: function () {
                    return !1;
                }
            }, {
                key: "isLinear",
                value: function () {
                    return !1;
                }
            }, {
                key: "isRadial",
                value: function () {
                    return !1;
                }
            }, {
                key: "isConic",
                value: function () {
                    return !1;
                }
            }, {
                key: "isStatic",
                value: function () {
                    return !1;
                }
            }, {
                key: "isImage",
                value: function () {
                    return !1;
                }
            }, {
                key: "hasAngle",
                value: function () {
                    return !1;
                }
            }, {
                key: "isUrl",
                value: function () {
                    return !1;
                }
            }, {
                key: "isFile",
                value: function () {
                    return !1;
                }
            }, {
                key: "isAttribute",
                value: function () {
                    return !0;
                }
            }, {
                key: "toString",
                value: function () {
                    return "none";
                }
            }]), c;
        }(Dc), _c = {
            center: 50,
            top: 0,
            left: 0,
            right: 100,
            bottom: 100
        }, ut = function u() {
            K(this, u);
        };
        ut.CENTER = "center", ut.TOP = "top", ut.RIGHT = "right", ut.LEFT = "left", ut.BOTTOM = "bottom";
        var Lb = /([\d.]+)(px|pt|fr|r?em|deg|vh|vw|m?s|%|g?rad|turn)/gi, le = function () {
            function u() {
                var c = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
                K(this, u), this.value = c, this.unit = a;
            }
            return Y(u, [{
                key: Symbol.toPrimitive,
                value: function (a) {
                    return a == "number" ? this.value : this.toString();
                }
            }, {
                key: "toString",
                value: function () {
                    switch (this.unit) {
                        case "string":
                        case "number":
                            return this.value + "";
                        case "var":
                            return "var(--" + this.value + ")";
                        case "calc":
                            return "calc(" + this.value + ")";
                        default:
                            return this.value + this.unit;
                    }
                }
            }, {
                key: "isUnitType",
                value: function (a) {
                    return this.unit === a;
                }
            }, {
                key: "isCalc",
                value: function () {
                    return this.isUnitType("calc");
                }
            }, {
                key: "isFr",
                value: function () {
                    return this.isUnitType("fr");
                }
            }, {
                key: "isPercent",
                value: function () {
                    return this.isUnitType("%");
                }
            }, {
                key: "isPx",
                value: function () {
                    return this.isUnitType("px");
                }
            }, {
                key: "isEm",
                value: function () {
                    return this.isUnitType("em");
                }
            }, {
                key: "isDeg",
                value: function () {
                    return this.isUnitType("deg");
                }
            }, {
                key: "isSecond",
                value: function () {
                    return this.isUnitType("s");
                }
            }, {
                key: "isMs",
                value: function () {
                    return this.isUnitType("ms");
                }
            }, {
                key: "isNumber",
                value: function () {
                    return this.isUnitType("number");
                }
            }, {
                key: "isString",
                value: function () {
                    return this.isUnitType("");
                }
            }, {
                key: "isVar",
                value: function () {
                    return this.isUnitType("--");
                }
            }, {
                key: "set",
                value: function (a) {
                    return this.value = a, this;
                }
            }, {
                key: "add",
                value: function (a) {
                    return this.value += +a, this;
                }
            }, {
                key: "sub",
                value: function (a) {
                    return this.add(-1 * a);
                }
            }, {
                key: "mul",
                value: function (a) {
                    return this.value *= +a, this;
                }
            }, {
                key: "div",
                value: function (a) {
                    return this.value /= +a, this;
                }
            }, {
                key: "mod",
                value: function (a) {
                    return this.value %= +a, this;
                }
            }, {
                key: "clone",
                value: function () {
                    return new u(this.value, this.unit);
                }
            }, {
                key: "getUnitName",
                value: function () {
                    return this.unit === "%" ? "percent" : this.unit;
                }
            }, {
                key: "toJSON",
                value: function () {
                    return { value: this.value, unit: this.unit };
                }
            }, {
                key: "rate",
                value: function (a) {
                    return a / this.value;
                }
            }, {
                key: "stringToPercent",
                value: function () {
                    return ot(_c[this.value]) ? u.percent(_c[this.value]) : u.percent(0);
                }
            }, {
                key: "stringToEm",
                value: function (a) {
                    return this.stringToPercent().toEm(a);
                }
            }, {
                key: "stringToPx",
                value: function (a) {
                    return this.stringToPercent().toPx(a);
                }
            }, {
                key: "toPercent",
                value: function (a) {
                    var o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 16;
                    if (this.isPercent())
                        return this;
                    if (this.isPx())
                        return u.percent(this.value * 100 / a);
                    if (this.isEm())
                        return u.percent(this.value * o * 100 / a);
                    if (this.isString())
                        return this.stringToPercent(a);
                    if (this.isDeg())
                        return u.percent(this.value / 360 * 100);
                }
            }, {
                key: "toEm",
                value: function (a) {
                    var o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 16;
                    if (this.isPercent())
                        return u.em(this.value / 100 * a / o);
                    if (this.isPx())
                        return u.em(this.value / o);
                    if (this.isEm())
                        return this;
                    if (this.isString())
                        return this.stringToEm(a);
                }
            }, {
                key: "toPx",
                value: function (a) {
                    if (this.isPercent())
                        return u.px(this.value / 100 * a);
                    if (this.isPx())
                        return this;
                    if (this.isEm())
                        return u.px(this.value / 100 * a / 16);
                    if (this.isString())
                        return this.stringToPx(a);
                }
            }, {
                key: "toSecond",
                value: function () {
                    if (this.isSecond())
                        return this;
                    if (this.isMs())
                        return u.second(this.value / 1e3);
                }
            }, {
                key: "toMs",
                value: function () {
                    if (this.isSecond())
                        return u.ms(this.value * 1e3);
                    if (this.isMs())
                        return this;
                }
            }, {
                key: "to",
                value: function (a, o) {
                    var d = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 16;
                    if (a === "px")
                        return this.toPx(o, d);
                    if (a === "%" || a === "percent")
                        return this.toPercent(o, d);
                    if (a === "em")
                        return this.toEm(o, d);
                }
            }, {
                key: "toUnit",
                value: function (a) {
                    return new u(this.value, a);
                }
            }, {
                key: "calculate",
                value: function (a, o) {
                    var d = this[a];
                    return d ? d.call(this, o) : this;
                }
            }, {
                key: "includes",
                value: function () {
                    for (var a = arguments.length, o = Array(a), d = 0; d < a; d++)
                        o[d] = arguments[d];
                    return o.includes(this.value);
                }
            }, {
                key: "round",
                value: function (a) {
                    return new u(m(this.value, a), this.unit);
                }
            }, {
                key: "equals",
                value: function (a) {
                    return this.value === a.value && this.unit === a.unit;
                }
            }], [{
                key: "min",
                value: function () {
                    for (var a = arguments.length, o = Array(a), d = 0; d < a; d++)
                        o[d] = arguments[d];
                    for (var f = o.shift(), v = 0, x = o.length; v < x; v++)
                        f.value > o[v].value && (f = o[v]);
                    return f;
                }
            }, {
                key: "max",
                value: function () {
                    for (var a = arguments.length, o = Array(a), d = 0; d < a; d++)
                        o[d] = arguments[d];
                    for (var f = o.shift(), v = 0, x = o.length; v < x; v++)
                        f.value < o[v].value && (f = o[v]);
                    return f;
                }
            }, {
                key: "string",
                value: function (a) {
                    return new u(a + "", "");
                }
            }, {
                key: "number",
                value: function (a) {
                    return new u(+a, "number");
                }
            }, {
                key: "px",
                value: function (a) {
                    return new u(+a, "px");
                }
            }, {
                key: "em",
                value: function (a) {
                    return new u(+a, "em");
                }
            }, {
                key: "percent",
                value: function (a) {
                    return new u(+a, "%");
                }
            }, {
                key: "deg",
                value: function (a) {
                    return new u(+a, "deg");
                }
            }, {
                key: "fr",
                value: function (a) {
                    return new u(+a, "fr");
                }
            }, {
                key: "second",
                value: function (a) {
                    return new u(+a, "s");
                }
            }, {
                key: "ms",
                value: function (a) {
                    return new u(+a, "ms");
                }
            }, {
                key: "var",
                value: function (a) {
                    return new u(a + "", "--");
                }
                /**
                 * return calc()  css fuction string
                 *
                 * Length.calc(`${Length.percent(100)} - ${Length.px(10)}`)
                 *
                 * @param {*} str
                 */
            }, {
                key: "calc",
                value: function (a) {
                    return new u(a, "calc");
                }
            }, {
                key: "parse",
                value: function (a) {
                    if (vo(a)) {
                        if (a.indexOf("calc(") > -1)
                            return new u(a.split("calc(")[1].split(")")[0], "calc");
                        var o = a.replace(Lb, "$1 $2").split(" ").filter(Boolean), d = +o[0] == o[0];
                        return d ? new u(+o[0], o[1]) : new u(o[0]);
                    }
                    if (a instanceof u)
                        return a;
                    if (a.unit) {
                        if (a.unit == "%" || a.unit == "percent") {
                            var f = 0;
                            return ot(a.percent) ? f = a.percent : ot(a.value) && (f = a.value), u.percent(f);
                        } else if (a.unit == "px") {
                            var f = 0;
                            return ot(a.px) ? f = a.px : ot(a.value) && (f = a.value), u.px(f);
                        } else if (a.unit == "em") {
                            var f = 0;
                            return ot(a.em) ? f = a.em : ot(a.value) && (f = a.value), u.em(f);
                        } else if (a.unit == "deg") {
                            var f = 0;
                            return ot(a.deg) ? f = a.deg : ot(a.value) && (f = a.value), u.deg(f);
                        } else if (a.unit == "s") {
                            var f = 0;
                            return ot(a.second) ? f = a.second : ot(a.value) && (f = a.value), u.second(f);
                        } else if (a.unit == "ms") {
                            var f = 0;
                            return ot(a.ms) ? f = a.ms : ot(a.value) && (f = a.value), u.ms(f);
                        } else if (a.unit == "number") {
                            var f = 0;
                            return ot(a.value) && (f = a.value), u.number(f);
                        } else if (a.unit == "--") {
                            var f = 0;
                            return ot(a.value) && (f = a.value), u.var(f);
                        } else if (a.unit === "" || a.unit === "string") {
                            var f = "";
                            return ot(a.str) ? f = a.str : ot(a.value) && (f = a.value), u.string(f);
                        }
                    }
                    return u.string(a);
                }
            }]), u;
        }();
        le.auto = le.string("auto");
        var Bt = function (u) {
            U(c, u);
            function c() {
                return K(this, c), j(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
            }
            return Y(c, [{
                key: "getDefaultObject",
                value: function () {
                    return M(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "getDefaultObject", this).call(this, {
                        cut: !1,
                        percent: 0,
                        unit: "%",
                        px: 0,
                        em: 0,
                        color: "rgba(0, 0, 0, 0)",
                        prevColorStep: null
                    });
                }
            }, {
                key: "toCloneObject",
                value: function () {
                    return z({}, M(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "toCloneObject", this).call(this), {
                        cut: this.json.cut,
                        percent: this.json.percent,
                        unit: this.json.unit,
                        px: this.json.px,
                        em: this.json.em,
                        color: this.json.color
                    });
                }
            }, {
                key: "on",
                value: function () {
                    this.json.cut = !0;
                }
            }, {
                key: "off",
                value: function () {
                    this.json.cut = !1;
                }
            }, {
                key: "toggle",
                value: function () {
                    this.json.cut = !this.json.cut;
                }
            }, {
                key: "getUnit",
                value: function () {
                    return this.json.unit == "%" ? "percent" : this.json.unit;
                }
            }, {
                key: "add",
                value: function (o) {
                    var d = this.getUnit();
                    return this.json[d] += +o, this;
                }
            }, {
                key: "sub",
                value: function (o) {
                    var d = this.getUnit();
                    return this.json[d] -= +o, this;
                }
            }, {
                key: "mul",
                value: function (o) {
                    var d = this.getUnit();
                    return this.json[d] *= +o, this;
                }
            }, {
                key: "div",
                value: function (o) {
                    var d = this.getUnit();
                    return this.json[d] /= +o, this;
                }
            }, {
                key: "mod",
                value: function (o) {
                    var d = this.getUnit();
                    return this.json[d] %= +o, this;
                }
            }, {
                key: "toLength",
                /**
                 * convert Length instance
                 * @return {Length}
                 */
                value: function (o) {
                    return le.parse(this.json).round(1e3);
                }
            }, {
                key: "getPrevLength",
                value: function () {
                    return this.json.prevColorStep ? this.json.prevColorStep.toLength() : "";
                }
                /**
                 * get color string
                 *
                 * return {string}
                 */
            }, {
                key: "toString",
                value: function () {
                    var o = this.json.cut ? this.getPrevLength() : "";
                    return this.json.color + " " + o + " " + this.toLength();
                }
            }, {
                key: "reset",
                value: function (o) {
                    M(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "reset", this).call(this, o), this.parent() && this.parent().sortColorStep();
                }
            }, {
                key: "isPx",
                get: function () {
                    return this.json.unit == "px";
                }
            }, {
                key: "isPercent",
                get: function () {
                    return this.json.unit == "%" || this.json.unit === "percent";
                }
            }, {
                key: "isEm",
                get: function () {
                    return this.json.unit == "em";
                }
            }], [{
                key: "parse",
                value: function (o) {
                    var d = [], f = _e(o), v = f.str.split(" ").filter(function (w) {
                        return w.trim();
                    }), x = +v[0].replace("@", ""), k = f.matches[x].color;
                    if (v.length === 1)
                        d.push(new c({
                            color: k,
                            unit: "%",
                            percent: 0
                        }));
                    else if (v.length === 2) {
                        var S = le.parse(v[1]), R = { unit: S.unit };
                        S.isPercent() ? R.percent = S.value : S.isPx() ? R.px = S.value : S.isEm() && (R.em = S.value), d.push(new c(z({ color: k }, R)));
                    } else
                        v.length === 3 && [1, 2].forEach(function (w) {
                            var F = le.parse(v[w]), Q = { unit: F.unit };
                            F.isPercent() ? Q.percent = F.value : F.isPx() ? Q.px = F.value : F.isEm() && (Q.em = F.value), d.push(new c(z({ color: k }, Q)));
                        });
                    return d;
                }
            }]), c;
        }(Dc), qc = {
            "to top": 0,
            "to top right": 45,
            "to right": 90,
            "to bottom right": 135,
            "to bottom": 180,
            "to bottom left": 225,
            "to left": 270,
            "to top left": 315
        }, Ro = function (u) {
            U(c, u);
            function c() {
                return K(this, c), j(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
            }
            return Y(c, [{
                key: "isGradient",
                value: function () {
                    return !0;
                }
            }, {
                key: "toString",
                value: function () {
                    return "none";
                }
                /**
                 * colorsteps = [
                 *    new ColorStep({color: 'red', percent: 0}),
                 *    new ColorStep({color: 'red', percent: 0})
                 * ]
                 *
                 * @param {*} obj
                 */
            }, {
                key: "getDefaultObject",
                value: function () {
                    var o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                    return M(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "getDefaultObject", this).call(this, z({
                        type: "gradient",
                        colorsteps: []
                    }, o));
                }
            }, {
                key: "toCloneObject",
                value: function () {
                    return z({}, M(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "toCloneObject", this).call(this), {
                        colorsteps: this.json.colorsteps.map(function (o) {
                            return o.clone();
                        })
                    });
                }
            }, {
                key: "convert",
                value: function (o) {
                    return o.colorsteps = o.colorsteps.map(function (d) {
                        return new Bt(d);
                    }), o;
                }
            }, {
                key: "calculateAngle",
                value: function () {
                    var o = this.json.angle;
                    return Kn(qc[o]) ? o : qc[o] || 0;
                }
                /**
                 * add ColorStep
                 *
                 * @param {ColorStep} colorstep
                 * @param {boolean} isSort
                 */
            }, {
                key: "addColorStep",
                value: function (o) {
                    var d = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
                    return this.json.colorsteps.push(o), d && this.sortColorStep(), o;
                }
            }, {
                key: "insertColorStep",
                value: function (o) {
                    var d = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "rgba(216,216,216,0)", f = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "rgba(216,216,216,1)", v = this.colorsteps;
                    if (!v.length) {
                        this.addColorStepList([new Bt({ color: d, percent: o, index: 0 }), new Bt({ color: f, percent: 100, index: 100 })]);
                        return;
                    }
                    if (o < v[0].percent) {
                        v[0].index = 1, this.addColorStep(new Bt({ index: 0, color: v[0].color, percent: o }));
                        return;
                    }
                    var x = v.length - 1;
                    if (v[x].percent < o) {
                        var k = v[x].color, S = v[x].index + 1;
                        this.addColorStep(new Bt({ index: S, color: k, percent: o }));
                        return;
                    }
                    for (var R = 0, w = v.length - 1; R < w; R++) {
                        var F = v[R], Q = v[R + 1];
                        if (F.percent <= o && o <= Q.percent) {
                            var k = Color.mix(F.color, Q.color, (o - F.percent) / (Q.percent - F.percent), "rgb");
                            this.addColorStep(new Bt({ index: F.index + 1, color: k, percent: o }));
                            return;
                        }
                    }
                }
            }, {
                key: "sortColorStep",
                value: function () {
                    var o = this.colorsteps;
                    o.sort(function (d, f) {
                        if (d.percent > f.percent)
                            return 1;
                        if (d.percent < f.percent)
                            return -1;
                        if (d.percent == f.percent)
                            return d.index === f.index ? 0 : d.index > f.index ? 1 : -1;
                    }), o.forEach(function (d, f) {
                        d.index = f * 100;
                    });
                }
                /**
                 * add ColorStep List
                 * @param {Array<ColorStep>} colorstepList
                 */
            }, {
                key: "addColorStepList",
                value: function () {
                    var o = this, d = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
                    d.forEach(function (f) {
                        o.addColorStep(f, !1);
                    }), this.sortColorStep();
                }
                /**
                 * get color step by id
                 *
                 * @param {string} id
                 */
            }, {
                key: "getColorStep",
                value: function (o) {
                    return this.json.colorsteps.filter(function (d) {
                        return d.id == o;
                    })[0];
                }
            }, {
                key: "clear",
                value: function () {
                    arguments.length ? this.json.colorsteps.splice(+(arguments.length <= 0 ? void 0 : arguments[0]), 1) : this.json.colorsteps = [];
                }
                /**
                 * get colorstep list
                 *
                 * @return {Array<ColorStep>}
                 */
            }, {
                key: "getColorString",
                /**
                 * get color string
                 *
                 * @return {string}
                 */
                value: function () {
                    var o = this.colorsteps;
                    if (!o.length)
                        return "";
                    var d = o.map(function (f, v) {
                        return f.prevColorStep = f.cut && v > 0 ? o[v - 1] : null, f;
                    });
                    return d.map(function (f) {
                        return "" + f;
                    }).join(",");
                }
            }, {
                key: "colorsteps",
                get: function () {
                    return this.json.colorsteps;
                }
            }], [{
                key: "random",
                value: function () {
                    var o = Math.floor(Math.random() * 1e3) % 360;
                    return "linear-gradient(" + o + "deg, " + Color.random() + " 0%, " + Color.random() + " 100%)";
                }
            }]), c;
        }(Rb), Yb = ["circle", "circle closest-side", "circle closest-corner", "circle farthest-side", "circle farthest-corner", "ellipse", "ellipse closest-side", "ellipse closest-corner", "ellipse farthest-side", "ellipse farthest-corner"], Kb = function (u) {
            U(c, u);
            function c() {
                return K(this, c), j(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
            }
            return Y(c, [{
                key: "initialize",
                value: function () {
                    M(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "initialize", this).call(this);
                    var o = [{ offset: le.percent(0), cut: !1, color: "yellow" }, { offset: le.percent(100), cut: !1, color: "red" }];
                    this.type = "linear-gradient", this.index = 0, this.colorsteps = o, this.radialPosition = [le.percent(50), le.percent(50)], this.radialType = "ellipse";
                }
            }, {
                key: "@changeRadialPosition",
                value: function (o, d) {
                    this["@changeKeyValue"]("radialPosition", [o, d]), this.reloadInputValue();
                }
            }, {
                key: "@setGradientEditor",
                value: function (o) {
                    var d = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, f = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "linear-gradient", v = arguments[3], x = arguments[4], k = arguments[5], S = _e(o), R = S.str.split(",").map(function (w) {
                        return w.trim();
                    }).map(function (w) {
                        var F = w.split(" ").filter(function (xe) {
                            return xe.length;
                        }), Q = q(F, 3), O = Q[0], A = Q[1], ee = Q[2];
                        O = fn(O, S.matches);
                        var ae = !1;
                        ee && (ae = !0);
                        var pe = ae ? le.parse(ee) : le.parse(A);
                        return pe.isDeg() && (pe = le.percent(pe.value / 360 * 100)), { color: O, offset: pe, cut: ae };
                    });
                    R.length == 1 && R.push({
                        color: R[0].color,
                        offset: le.percent(100),
                        cut: !1
                    }), this.cachedStepListRect = null, this.colorsteps = R, this.index = d, this.type = f, this.angle = le.parse(v || "90deg"), this.radialPosition = x || [le.percent(50), le.percent(50)], this.radialType = k, this.refresh(), this.selectStep(d), this.reloadInputValue();
                }
            }, {
                key: "template",
                value: function () {
                    var o = this;
                    return (
                        /*html*/
                        `
        <div class='gradient-editor' data-selected-editor='` + this.type + `'>
            <div class='gradient-steps' data-editor='gradient'>
                <div class="hue-container" ref="$back"></div>            
                <div class="hue" ref="$steps">
                    <div class='step-list' ref="$stepList" ></div>
                </div>
            </div>
            <div class='tools' data-editor='tools'>
              <label>Offset <input type='checkbox' ref='$cut' checked />  connected</label> <div class="right-menu" ><button type="button" ref="$remove" style="float:right;" title="Remove color stop">&times; Remove</button></div>
              <div class='unit'>
                <div><input type='range' data-key='length' min='0' max="100" step='0.1' ref='$offset' /></div>
                <div><input type='number' data-key='length' min='0' max="100" step='0.1' ref='$offsetNumber' /></div>              
                <div><select ref='$offsetSelect'>
                  <option value='%'>%</option>
                  <option value='px'>px</option>
                  <option value='em'>em</option>
                </select></div>
              </div>
            </div>
            <div class='sub-editor' ref='$subEditor'> 
              <div data-editor='angle'>
                <label>Angle</label>
                <div class='unit'>                
                  <div><input type='range' data-key='angle' min='-720' max="720" step='0.1' ref='$angle' /> </div>
                  <div><input type='number' data-key='angle' min='-720' max="720" step='0.1' ref='$angleNumber' /></div> 
                  <span>deg</span>
                </div>
              </div>
              <div data-editor='centerX'>
                <label>Center X</label>
                <div class='unit'>
                  <div><input type='range' data-key='centerX' min='-100' max="100" step='0.1' ref='$centerX' /></div>
                  <div><input type='number' data-key='centerX' min='-100' max="100" step='0.1' ref='$centerXNumber' /></div>
                  <div><select ref='$centerXSelect'>
                      <option value='%'>%</option>
                      <option value='px'>px</option>
                      <option value='em'>em</option>
                    </select></div>
                </div>
              </div>                
              <div data-editor='centerY'>           
                <label>Center Y</label>                 
                <div class='unit'>
                  <div><input type='range' data-key='centerY' min='-100' max="100" step='0.1' ref='$centerY' /></div>
                  <div><input type='number' data-key='centerX' min='-100' max="100" step='0.1' ref='$centerYNumber' /></div>
                  <div><select ref='$centerYSelect'>
                      <option value='%'>%</option>
                      <option value='px'>px</option>
                      <option value='em'>em</option>
                    </select></div>
                </div>
              </div>                
              <div data-editor='radialType'>       
                <label>Radial Type</label>              
                <div><select ref='$radialType'>
                  ` + Yb.map(function (d) {
                            var f = o.radialType === d ? "selected" : "";
                            return '<option value="' + d + '" ' + f + ">" + d + "</option>";
                        }).join("") + `
                </select></div>
              </div>
            </div>            
        </div>
      `
                    );
                }
            }, {
                key: "input $offset",
                value: function (o) {
                    this.refs.$offsetNumber.val(this.refs.$offset.val()), this["@changeColorStepOffset"]("offset", new le(this.refs.$offset.val(), this.refs.$offsetSelect.val()));
                }
            }, {
                key: "mouseup $offset",
                value: function (o) {
                    this["@changeColorStepOffset"]("offset", new le(this.refs.$offset.val(), this.refs.$offsetSelect.val()), !0);
                }
            }, {
                key: "input $offsetNumber",
                value: function (o) {
                    this.refs.$offset.val(this.refs.$offsetNumber.val()), this["@changeColorStepOffset"]("offset", new le(this.refs.$offset.val(), this.refs.$offsetSelect.val()), !0);
                }
            }, {
                key: "input $angle",
                value: function (o) {
                    this.refs.$angleNumber.val(this.refs.$angle.val()), this["@changeKeyValue"]("angle", le.deg(this.refs.$angle.val()));
                }
            }, {
                key: "mouseup $angle",
                value: function (o) {
                    this["@changeKeyValue"]("angle", le.deg(this.refs.$angle.val()), !0);
                }
            }, {
                key: "input $angleNumber",
                value: function (o) {
                    this.refs.$angle.val(this.refs.$angleNumber.val()), this["@changeKeyValue"]("angle", le.deg(this.refs.$angle.val()), !0);
                }
            }, {
                key: "input $centerX",
                value: function (o) {
                    this.refs.$centerXNumber.val(this.refs.$centerX.val()), this["@changeKeyValue"]("radialPositionX");
                }
            }, {
                key: "mouseup $centerX",
                value: function (o) {
                    this["@changeKeyValue"]("radialPositionX", null, !0);
                }
            }, {
                key: "input $centerXNumber",
                value: function (o) {
                    this.refs.$centerX.val(this.refs.$centerXNumber.val()), this["@changeKeyValue"]("radialPositionX");
                }
            }, {
                key: "input $centerY",
                value: function (o) {
                    this.refs.$centerYNumber.val(this.refs.$centerY.val()), this["@changeKeyValue"]("radialPositionY");
                }
            }, {
                key: "mouseup $centerY",
                value: function (o) {
                    this["@changeKeyValue"]("radialPositionY", null, !0);
                }
            }, {
                key: "input $centerYNumber",
                value: function (o) {
                    this.refs.$centerY.val(this.refs.$centerYNumber.val()), this["@changeKeyValue"]("radialPositionX");
                }
            }, {
                key: "change $centerXSelect",
                value: function (o) {
                    this["@changeKeyValue"]("radialPositionX", null, !0);
                }
            }, {
                key: "change $centerYSelect",
                value: function (o) {
                    this["@changeKeyValue"]("radialPositionY", null, !0);
                }
            }, {
                key: "change $radialType",
                value: function (o) {
                    this["@changeKeyValue"]("radialType", this.refs.$radialType.val(), !0);
                }
            }, {
                key: "@changeKeyValue",
                value: function (o, d) {
                    var f = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
                    o === "angle" && (d = d.value), o === "radialPositionX" || o === "radialPositionY" ? this.radialPosition = [this.radialPositionX, this.radialPositionY] : this[o] = d, this.updateData(f);
                }
            }, {
                key: "@changeColorStepOffset",
                value: function (o, d) {
                    var f = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
                    this.currentStep && (this.currentStep.offset = d.clone(), this.$currentStep.css({
                        left: this.currentStep.offset
                    }), this.setColorUI(), this.updateData(f));
                }
            }, {
                key: "click $back",
                value: function (o) {
                    if (!this.startXY) {
                        var d = this.refs.$stepList.rect(), f = d.x, v = d.right, x = o.xy.x;
                        x < f ? x = f : x > v && (x = v);
                        var k = (x - f) / d.width * 100, S = this.colorsteps.map(function (A, ee) {
                            return { index: ee, color: A.color, offset: A.offset };
                        }), R = S.filter(function (A) {
                            return A.offset.value <= k;
                        }).pop(), w = S.filter(function (A) {
                            return A.offset.value > k;
                        }).shift(), F = 0;
                        if (R && w) {
                            if (R.offset.value === k)
                                return;
                            this.colorsteps.splice(w.index, 0, {
                                cut: !1,
                                offset: le.percent(k),
                                color: be.mix(R.color, w.color, (k - R.offset.value) / (w.offset.value - R.offset.value))
                            }), F = R.index + 1;
                        } else if (R) {
                            var Q = {
                                cut: !1,
                                offset: le.percent(k),
                                color: R.color
                            };
                            this.colorsteps.length - 1 === R.index ? this.colorsteps.push(Q) : this.colorsteps.splice(R.index + 1, 0, Q), F = R.index + 1;
                        } else if (w) {
                            var O = {
                                cut: !1,
                                offset: le.percent(k),
                                color: w.color
                            };
                            w.index === 0 ? (this.colorsteps.unshift(O), F = 0) : (this.colorsteps.splice(w.index - 1, 0, O), F = w.index);
                        } else
                            this.colorsteps.push({
                                cut: !1,
                                offset: le.percent(0),
                                color: "rgba(0, 0, 0, 1)"
                            }), F = 0;
                        this.refresh(), this.updateData(!0), this.selectStep(F);
                    }
                }
            }, {
                key: "reloadStepList",
                value: function () {
                    this.refs.$stepList.html(this.colorsteps.map(function (o, d) {
                        return "<div class='step' data-index='" + d + "' data-cut='" + o.cut + "' style='left: " + o.offset + `;'>
        <div class='color-view' style="background-color: ` + o.color + `"></div>
        <div class='arrow' style="background-color: ` + o.color + `"></div>
      </div>`;
                    }).join(""));
                }
            }, {
                key: "click $cut",
                value: function () {
                    this.currentStep && (this.currentStep.cut = this.refs.$cut.checked(), this.$currentStep.attr("data-cut", this.currentStep.cut), this.setColorUI(), this.updateData(!0));
                }
            }, {
                key: "click $remove",
                value: function () {
                    this.removeStep(this.index);
                }
            }, {
                key: "removeStep",
                value: function (o) {
                    this.colorsteps.splice(o, 1);
                    var d = this.colorsteps[o], f = o;
                    d || (d = this.colorsteps[o - 1], f = o - 1), d && this.selectStep(f), this.refresh(), this.updateData(!0);
                }
            }, {
                key: "selectStep",
                value: function (o) {
                    this.index = o, this.currentStep = this.colorsteps[o], this.refs.$stepList.attr("data-selected-index", o), this.$currentStep = this.refs.$stepList.$('[data-index="' + o.toString() + '"]'), this.$currentStep && (this.$colorView = this.$currentStep.$(".color-view"), this.$arrow = this.$currentStep.$(".arrow"), this.refs.$cut.el.checked = this.currentStep.cut), this.prev = this.colorsteps[o - 1], this.next = this.colorsteps[o + 1];
                }
            }, {
                key: "mousedown $stepList .step",
                value: function (o) {
                    var d = +o.$delegateTarget.attr("data-index");
                    o.altKey ? this.removeStep(d) : (this.selectStep(d), this.startXY = o.xy, this.$store.emit("selectColorStep", this.currentStep.color), this.refs.$cut.checked(this.currentStep.cut), this.refs.$offset.val(this.currentStep.offset.value), this.refs.$stepList.attr("data-selected-index", d), this.cachedStepListRect = this.refs.$stepList.rect());
                }
            }, {
                key: "getStepListRect",
                value: function () {
                    return this.cachedStepListRect;
                }
            }, {
                key: "mouseup document",
                value: function (o) {
                    this.startXY && (this.startXY = null, this.updateData(!0));
                }
            }, {
                key: "mousemove document",
                value: function (o) {
                    if (this.startXY) {
                        var d = o.xy.x - this.startXY.x;
                        o.xy.y - this.startXY.y;
                        var f = this.getStepListRect(), v = f.x, x = f.right, k = this.startXY.x + d;
                        k < v ? k = v : k > x && (k = x);
                        var S = (k - v) / f.width * 100;
                        this.prev && this.prev.offset.value > S && (S = this.prev.offset.value), this.next && this.next.offset.value < S && (S = this.next.offset.value), this.currentStep.offset.set(m(S, 100)), this.$currentStep.css({
                            left: le.percent(S)
                        }), this.refs.$offset.val(this.currentStep.offset.value), this.setColorUI(), this.updateData();
                    }
                }
            }, {
                key: "refresh",
                value: function () {
                    this.reloadStepList(), this.setColorUI();
                }
            }, {
                key: "getLinearGradient",
                value: function () {
                    var o = this;
                    if (this.colorsteps.length === 0)
                        return "";
                    if (this.colorsteps.length === 1) {
                        var d = this.colorsteps[0];
                        return "linear-gradient(to right, " + d.color + " " + d.offset + ", " + d.color + " 100%)";
                    }
                    return "linear-gradient(to right, " + this.colorsteps.map(function (f, v) {
                        if (f.cut) {
                            var x = o.colorsteps[v - 1];
                            return x ? f.color + " " + x.offset + " " + f.offset : f.color + " " + f.offset;
                        } else
                            return f.color + " " + f.offset;
                    }).join(",") + ")";
                }
            }, {
                key: "setColorUI",
                value: function () {
                    this.refs.$stepList.css("background-image", this.getLinearGradient()), this.refs.$el.attr("data-selected-editor", this.type);
                }
            }, {
                key: "reloadInputValue",
                value: function () {
                    this.refs.$offset.val(this.currentStep.offset.value), this.refs.$offsetNumber.val(this.currentStep.offset.value), this.refs.$offsetSelect.val(this.currentStep.offset.unit), this.refs.$angle.val(this.angle.value), this.refs.$angleNumber.val(this.angle.value);
                    var o = this.radialPosition.map(function (d) {
                        return d === "center" ? le.percent(50) : d;
                    });
                    this.refs.$centerX.val(o[0].value), this.refs.$centerXNumber.val(o[0].value), this.refs.$centerXSelect.val(o[0].unit), this.refs.$centerY.val(o[1].value), this.refs.$centerYNumber.val(o[1].value), this.refs.$centerYSelect.val(o[1].unit), this.refs.$radialType.val(this.radialType);
                }
            }, {
                key: "@setColorStepColor",
                value: function (o) {
                    var d = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
                    this.currentStep && (this.currentStep.color = o, this.$colorView.css({
                        "background-color": o
                    }), this.$arrow.css({
                        "background-color": o
                    }), this.setColorUI(), this.updateData(d));
                }
            }, {
                key: "updateData",
                value: function () {
                    var o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
                    this.$store.emit("changeGradientEditor", {
                        type: this.type,
                        index: this.index,
                        angle: this.angle,
                        colorsteps: this.colorsteps,
                        radialPosition: this.radialPosition,
                        radialType: this.radialType
                    }, o);
                }
            }, {
                key: "radialPositionX",
                get: function () {
                    return new le(+this.refs.$centerX.val(), this.refs.$centerXSelect.val()).round(1e3);
                }
            }, {
                key: "radialPositionY",
                get: function () {
                    return new le(+this.refs.$centerY.val(), this.refs.$centerYSelect.val()).round(1e3);
                }
            }]), c;
        }(lt), Tb = {
            0: "to top",
            45: "to top right",
            90: "to right",
            135: "to bottom right",
            180: "to bottom",
            225: "to bottom left",
            270: "to left",
            315: "to top left"
        }, es = {
            "to top": "0",
            "to top right": "45",
            "to right": "90",
            "to bottom right": "135",
            "to bottom": "180",
            "to bottom left": "225",
            "to left": "270",
            "to top left": "315"
        }, Lo = function (u) {
            U(c, u);
            function c() {
                return K(this, c), j(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
            }
            return Y(c, [{
                key: "getDefaultObject",
                value: function () {
                    var o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                    return M(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "getDefaultObject", this).call(this, z({
                        type: "linear-gradient",
                        angle: 0
                    }, o));
                }
            }, {
                key: "toCloneObject",
                value: function () {
                    return z({}, M(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "toCloneObject", this).call(this), {
                        angle: this.json.angle
                    });
                }
            }, {
                key: "isLinear",
                value: function () {
                    return !0;
                }
            }, {
                key: "hasAngle",
                value: function () {
                    return !0;
                }
            }, {
                key: "toString",
                value: function () {
                    if (this.colorsteps.length === 0)
                        return "";
                    var o = this.getColorString(), d = "", f = this.json.angle || 0;
                    d = f, ic(d) && (d = Tb["" + d] || d), ic(d) && (d = d > 360 ? d % 360 : d, d = d + "deg");
                    var v = this.json.type + "(" + d + ", " + o + ")";
                    return v;
                }
            }], [{
                key: "toLinearGradient",
                value: function (o) {
                    if (o.length === 0)
                        return "none";
                    var d = new c({
                        angle: "to right",
                        colorsteps: o
                    });
                    return d + "";
                }
            }, {
                key: "parse",
                value: function (o) {
                    var d = _e(o), f = 0, v = [];
                    return d.str.split("(")[1].split(")")[0].split(",").map(function (x) {
                        return x.trim();
                    }).forEach(function (x, k) {
                        x.includes("@") ? (x = fn(x, d.matches), v.push.apply(v, te(Bt.parse(x)))) : f = Kn(es[x]) ? le.parse(x) : le.deg(+es[x]);
                    }), new c({ angle: f, colorsteps: v });
                }
            }]), c;
        }(Ro), ts = function (u) {
            U(c, u);
            function c() {
                return K(this, c), j(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
            }
            return Y(c, [{
                key: "getDefaultObject",
                value: function () {
                    return M(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "getDefaultObject", this).call(this, {
                        type: "repeating-linear-gradient",
                        angle: 0
                    });
                }
            }], [{
                key: "parse",
                value: function (o) {
                    var d = Lo.parse(o);
                    return new c({
                        angle: d.angle,
                        colorsteps: d.colorsteps
                    });
                }
            }]), c;
        }(Lo), zn, Hb = (zn = {}, T(zn, "center", !0), T(zn, "top", !0), T(zn, "left", !0), T(zn, "right", !0), T(zn, "bottom", !0), zn), Yo = function (u) {
            U(c, u);
            function c() {
                return K(this, c), j(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
            }
            return Y(c, [{
                key: "getDefaultObject",
                value: function () {
                    var o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                    return M(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "getDefaultObject", this).call(this, z({
                        type: "radial-gradient",
                        radialType: "ellipse",
                        radialPosition: [ut.CENTER, ut.CENTER]
                    }, o));
                }
            }, {
                key: "toCloneObject",
                value: function () {
                    var o = this.json.radialPosition || [le.percent(50), le.percent(50)];
                    return z({}, M(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "toCloneObject", this).call(this), {
                        radialType: this.json.radialType || "ellipse",
                        radialPosition: JSON.parse(JSON.stringify(o))
                    });
                }
            }, {
                key: "isRadial",
                value: function () {
                    return !0;
                }
            }, {
                key: "toString",
                value: function () {
                    if (this.colorsteps.length === 0)
                        return "";
                    var o = this.getColorString(), d = this.json, f = "", v = d.radialType, x = d.radialPosition || ["center", "center"];
                    return Hb[x] || typeof x == "string" || (x = x.map(function (k) {
                        return typeof k == "string" ? k : k.isString() ? k.value : k.round(1e3);
                    }).join(" ")), f = x ? v + " at " + x : v, (d.type || "radial-gradient") + "(" + f + ", " + o + ")";
                }
            }], [{
                key: "parse",
                value: function (o) {
                    var d = _e(o), f = "ellipse", v = [ut.CENTER, ut.CENTER], x = [];
                    return d.str.split("(")[1].split(")")[0].split(",").map(function (k) {
                        return k.trim();
                    }).forEach(function (k, S) {
                        if (k.includes("@"))
                            k = fn(k, d.matches), x.push.apply(x, te(Bt.parse(k)));
                        else {
                            if (k.includes("at")) {
                                var R = k.split("at").map(function (O) {
                                    return O.trim();
                                }), w = q(R, 2);
                                f = w[0], v = w[1];
                            } else
                                f = k;
                            if (vo(v)) {
                                var F = v.split(" ");
                                if (F.length === 1) {
                                    var Q = le.parse(F[0]);
                                    Q.isString() ? v = [Q.value, Q.value] : v = [Q.clone(), Q.clone()];
                                } else
                                    F.length === 2 && (v = F.map(function (O) {
                                        var A = le.parse(O);
                                        return A.isString() ? A.value : A;
                                    }));
                            }
                        }
                    }), new c({ radialType: f, colorsteps: x });
                }
            }]), c;
        }(Ro), ns = function (u) {
            U(c, u);
            function c() {
                return K(this, c), j(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
            }
            return Y(c, [{
                key: "getDefaultObject",
                value: function () {
                    return M(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "getDefaultObject", this).call(this, {
                        type: "repeating-radial-gradient"
                    });
                }
            }], [{
                key: "parse",
                value: function (o) {
                    var d = Yo.parse(o);
                    return new c({
                        radialType: d.radialType,
                        radialPosition: d.radialPosition,
                        colorsteps: d.colorsteps
                    });
                }
            }]), c;
        }(Yo), wn, Nb = (wn = {}, T(wn, "center", !0), T(wn, "top", !0), T(wn, "left", !0), T(wn, "right", !0), T(wn, "bottom", !0), wn), rl = {
            "to top": 0,
            "to top right": 45,
            "to right": 90,
            "to bottom right": 135,
            "to bottom": 180,
            "to bottom left": 225,
            "to left": 270,
            "to top left": 315
        }, Ko = function (u) {
            U(c, u);
            function c() {
                return K(this, c), j(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
            }
            return Y(c, [{
                key: "getDefaultObject",
                value: function () {
                    var o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                    return M(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "getDefaultObject", this).call(this, z({
                        type: "conic-gradient",
                        angle: 0,
                        radialPosition: [ut.CENTER, ut.CENTER]
                    }, o));
                }
            }, {
                key: "toCloneObject",
                value: function () {
                    return z({}, M(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "toCloneObject", this).call(this), {
                        angle: this.json.angle,
                        radialPosition: JSON.parse(JSON.stringify(this.json.radialPosition))
                    });
                }
            }, {
                key: "isConic",
                value: function () {
                    return !0;
                }
            }, {
                key: "hasAngle",
                value: function () {
                    return !0;
                }
            }, {
                key: "getColorString",
                value: function () {
                    if (this.colorsteps.length === 0)
                        return "";
                    var o = this.colorsteps;
                    if (!o)
                        return "";
                    o.sort(function (f, v) {
                        return f.percent == v.percent ? 0 : f.percent > v.percent ? 1 : -1;
                    });
                    var d = o.map(function (f, v) {
                        return f.prevColorStep = f.cut && v > 0 ? o[v - 1] : null, f;
                    });
                    return d.map(function (f) {
                        var v = Math.floor(f.percent * 3.6), x = "";
                        if (f.cut && f.prevColorStep) {
                            var k = Math.floor(f.prevColorStep.percent * 3.6);
                            x = k + "deg";
                        }
                        return f.color + " " + x + " " + v + "deg";
                    }).join(",");
                }
            }, {
                key: "toString",
                value: function () {
                    var o = this.getColorString(), d = [], f = this.json, v = f.angle, x = f.radialPosition || ut.CENTER;
                    x = Nb[x] ? x : x.join(" "), ot(v) && (v = +(rl[v] || v), d.push("from " + v + "deg")), x && d.push("at " + x);
                    var k = d.length ? d.join(" ") + "," : "";
                    return f.type + "(" + k + " " + o + ")";
                }
            }], [{
                key: "parse",
                value: function (o) {
                    var d = _e(o), f = "0deg", v = [ut.CENTER, ut.CENTER], x = [];
                    return d.str.split("(")[1].split(")")[0].split(",").map(function (k) {
                        return k.trim();
                    }).forEach(function (k, S) {
                        if (k.includes("@"))
                            k = k.split(" ").map(function (O) {
                                return O.trim();
                            }).map(function (O) {
                                return O.includes("deg") ? le.parse(O).toPercent() : O;
                            }).join(" "), k = fn(k, d.matches), x.push.apply(x, te(Bt.parse(k)));
                        else {
                            if (k.includes("at")) {
                                var R = k.split("at").map(function (O) {
                                    return O.trim();
                                }), w = q(R, 2);
                                f = w[0], v = w[1];
                            } else
                                f = k;
                            if (vo(v)) {
                                var F = v.split(" ");
                                if (F.length === 1) {
                                    var Q = le.parse(F[0]);
                                    Q.isString() ? v = [Q.value, Q.value] : v = [Q.clone(), Q.clone()];
                                } else
                                    F.length === 2 && (v = F.map(function (O) {
                                        var A = le.parse(O);
                                        return A.isString() ? A.value : A;
                                    }));
                            }
                            vo(f) && f.includes("from") && (f = f.split("from")[1], f = Kn(rl[f]) ? le.parse(f) : le.deg(+rl[f]));
                        }
                    }), new c({ angle: f, radialPosition: v, colorsteps: x });
                }
            }]), c;
        }(Ro), is = function (u) {
            U(c, u);
            function c() {
                return K(this, c), j(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
            }
            return Y(c, [{
                key: "getDefaultObject",
                value: function () {
                    return M(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "getDefaultObject", this).call(this, {
                        type: "repeating-conic-gradient",
                        angle: 0,
                        radialPosition: [ut.CENTER, ut.CENTER]
                    });
                }
            }], [{
                key: "parse",
                value: function (o) {
                    var d = Ko.parse(o);
                    return new c({
                        angle: d.angle,
                        radialPosition: d.radialPosition,
                        colorsteps: d.colorsteps
                    });
                }
            }]), c;
        }(Ko), zb = [{ type: "linear-gradient", title: "Linear Gradient" }, { type: "repeating-linear-gradient", title: "Repeating Linear Gradient" }, { type: "radial-gradient", title: "Radial Gradient" }, { type: "repeating-radial-gradient", title: "Repeating Radial Gradient" }, { type: "conic-gradient", title: "Conic Gradient" }, { type: "repeating-conic-gradient", title: "Repeating Conic Gradient" }], wb = /((linear\-gradient|repeating\-linear\-gradient|radial\-gradient|repeating\-radial\-gradient|conic\-gradient|repeating\-conic\-gradient|url)\(([^\)]*)\))/gi, Jb = function (u) {
            U(c, u);
            function c() {
                return K(this, c), j(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
            }
            return Y(c, [{
                key: "components",
                value: function () {
                    return {
                        EmbedColorPicker: Sb,
                        gradientEditor: Kb
                    };
                }
            }, {
                key: "parseImage",
                value: function (o) {
                    var d = _e(o), f = null;
                    return d.str.match(wb).forEach(function (v, x) {
                        v = fn(v, d.matches), v.includes("repeating-linear-gradient") ? f = ts.parse(v) : v.includes("linear-gradient") ? f = Lo.parse(v) : v.includes("repeating-radial-gradient") ? f = ns.parse(v) : v.includes("radial") ? f = Yo.parse(v) : v.includes("repeating-conic-gradient") ? f = is.parse(v) : v.includes("conic") && (f = Ko.parse(v));
                    }), f;
                }
                /**
                 * @override
                 */
            }, {
                key: "callbackColorValue",
                value: function (o) {
                    var d = this.image.toString();
                    typeof this.opt.onChange == "function" && this.opt.onChange.call(this, d, this.image), typeof this.colorpickerShowCallback == "function" && this.colorpickerShowCallback(d, this.image);
                }
                /**
                 * @override
                 */
            }, {
                key: "callbackLastUpdateColorValue",
                value: function (o) {
                    var d = this.image.toString();
                    typeof this.opt.onLastUpdate == "function" && this.opt.onLastUpdate.call(this, d, this.image);
                }
            }, {
                key: "callbackHideColorValue",
                value: function (o) {
                    var d = this.image.toString();
                    typeof this.opt.onHide == "function" && this.opt.onHide.call(this, d, this.image), typeof this.colorpickerHideCallback == "function" && this.colorpickerHideCallback(d, this.image);
                }
            }, {
                key: "initialize",
                value: function () {
                    M(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "initialize", this).call(this), this.$root.addClass("gradient-picker"), this.selectedTab = "linear-gradient", this.setValue(this.opt.gradient || "linear-gradient(to right, red 0%, yellow 100%)");
                }
            }, {
                key: "setValue",
                value: function (o) {
                    this.gradient = o, this.image = this.parseImage(this.gradient), this.selectTabContent(this.image.type);
                }
            }, {
                key: "getValue",
                value: function () {
                    return this.image.toString();
                }
            }, {
                key: "template",
                value: function () {
                    return (
                        /*html*/
                        `
      <div class="gradient-body">

        <div class='box'>
          <div class='gradient-preview'>
            <div class='gradient-view' ref='$gradientView'></div>
          </div>
          <div class="picker-tab">
            <div class="picker-tab-list" ref="$tab" data-value="static-gradient" data-is-image-hidden="false">
              ` + zb.map(function (o) {
                            return `
                  <span 
                    class='picker-tab-item ` + (o.selected ? "selected" : "") + `' 
                    data-selected-value='` + o.type + `'
                    title='` + o.title + `'
                  > 
                  <div class='icon'></div>
                  </span>`;
                        }).join("") + `
            </div>
          </div>
          <div target='gradientEditor'></div>

        </div>
        <div class='box'>
          <div target="EmbedColorPicker"></div>
        </div>
      </div>
     
    `
                    );
                }
            }, {
                key: "getColorString",
                value: function () {
                    if (!this.image)
                        return "";
                    var o = this.image.getColorString();
                    return o;
                }
            }, {
                key: "getCurrentStepColor",
                value: function () {
                    var o = this.image.colorsteps[this.selectColorStepIndex || 0] || { color: "rgba(0, 0, 0, 1)" };
                    return o.color;
                }
            }, {
                key: "@changeGradientEditor",
                value: function (o) {
                    var d = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, f = o.colorsteps.map(function (v, x) {
                        return new Bt({
                            color: v.color,
                            percent: v.offset.value,
                            cut: v.cut,
                            index: (x + 1) * 100
                        });
                    });
                    o = z({}, o, {
                        type: this.selectedTab,
                        colorsteps: f
                    }), this.image.reset(o), this.updateGradientPreview(d);
                }
            }, {
                key: "click $tab .picker-tab-item",
                value: function (o) {
                    var d = o.$delegateTarget.attr("data-selected-value");
                    this.selectTabContent(d);
                }
            }, {
                key: "selectTabContent",
                value: function (o) {
                    this.selectedTab = o, this.refs.$tab.attr("data-value", o), this.image = this.createGradient({ type: o }, this.image), this.$store.emit("setGradientEditor", this.getColorString(), this.selectColorStepIndex, this.image.type, this.image.angle, this.image.radialPosition, this.image.radialType);
                    var d = this.getCurrentStepColor();
                    this["@selectColorStep"](d), this.updateGradientPreview(!0);
                }
            }, {
                key: "createGradient",
                value: function (o, d) {
                    var f = o.colorsteps || d.colorsteps, v = o.angle || d.angle, x = o.radialType || d.radialType || "ellipse", k = o.radialPosition || d.radialPosition || [le.percent(50), le.percent(50)], S = d.clone().toJSON();
                    switch (delete S.itemType, delete S.type, o.type) {
                        case "linear-gradient":
                            return new Lo({ colorsteps: f, angle: v });
                        case "repeating-linear-gradient":
                            return new ts({ colorsteps: f, angle: v });
                        case "radial-gradient":
                            return new Yo({
                                colorsteps: f,
                                radialType: x,
                                radialPosition: k
                            });
                        case "repeating-radial-gradient":
                            return new ns({
                                colorsteps: f,
                                radialType: x,
                                radialPosition: k
                            });
                        case "conic-gradient":
                            return new Ko({
                                colorsteps: f,
                                angle: v,
                                radialPosition: k
                            });
                        case "repeating-conic-gradient":
                            return new is({
                                colorsteps: f,
                                angle: v,
                                radialPosition: k
                            });
                    }
                    return new Ro();
                }
            }, {
                key: "@changeEmbedColorPicker",
                value: function (o) {
                    var d = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
                    this.$store.emit("setColorStepColor", o, d);
                }
            }, {
                key: "@selectColorStep",
                value: function (o) {
                    this.EmbedColorPicker.setValue(o);
                }
            }, {
                key: "@changeColorStep",
                value: function () {
                    var o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                    this.image.reset(z({}, o)), this.updateGradientPreview();
                }
            }, {
                key: "updateGradientPreview",
                value: function () {
                    var o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
                    this.image && (this.refs.$gradientView.css("background-image", this.image.toString()), this.updateData(o));
                }
            }, {
                key: "mousedown $gradientView",
                value: function (o) {
                    this.mouseDown = !0, this.mouseDownX = o.clientX, this.mouseDownY = o.clientY, this.rect = this.refs.$gradientView.rect();
                }
            }, {
                key: "mousemove document",
                value: function (o) {
                    if (this.mouseDown) {
                        var d = this.rect.left, f = this.rect.right, v = this.rect.top, x = this.rect.bottom, k = Math.min(Math.max(d, o.clientX), f), S = Math.min(Math.max(v, o.clientY), x), R = le.percent((k - d) / (f - d) * 100), w = le.percent((S - v) / (x - v) * 100);
                        this.$store.emit("changeRadialPosition", R, w);
                    }
                }
            }, {
                key: "mouseup document",
                value: function (o) {
                    this.mouseDown && (this.mouseDown = !1, this.updateData(!0));
                }
            }, {
                key: "updateData",
                value: function () {
                    var o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
                    this.callbackChange(), o && this.callbackLastUpdate();
                }
            }]), c;
        }(gn), Mb = {
            createGradientPicker: function (c) {
                return new Jb(c);
            }
        }, Fb = z({}, qp, Ac, Mb);
        return Fb;
    });
})(L0);
var D9 = L0.exports;
const _9 = /* @__PURE__ */ uf(D9), q9 = N`
  position: absolute;
`, eI = (e, t) => {
        const n = Ue(), { addUnsubscribe: i } = Ge(), l = Se({
            x: e.x,
            y: e.y
        });
        return Te(() => {
            const r = n.value, s = _9.create({
                container: r,
                type: "sketch",
                position: "inline",
                color: e.color || "",
                onChange: (m) => {
                    var h;
                    (h = e.onChange) == null || h.call(e, m);
                },
                onLastUpdate: (m) => {
                    var h;
                    (h = e.onLastUpdate) == null || h.call(e, m);
                }
            });
            if (e.viewport) {
                const m = r.getBoundingClientRect(), h = e.x + m.width, p = e.y + m.height;
                if (e.viewport.width < h) {
                    const b = e.viewport.width - m.width;
                    0 <= b && (l.x = b);
                }
                if (e.viewport.height < p) {
                    const b = e.viewport.height - m.height;
                    0 <= b && (l.y = b);
                }
            }
            i(() => {
                s.destroy(), r.removeChild(s.$root.el);
            });
        }), () => I`
    <div
      class=${["color-picker", q9]}
      style=${{
                top: `${l.y}px`,
                left: `${l.x}px`
            }}
      ${De(n)}
    ></div>
  `;
    }, tI = {
        1: "ZeroOneN",
        [$e.ZeroOne]: "ZeroOne",
        [$e.ZeroN]: "ZeroN",
        [$e.OneOnly]: "OneOnly",
        [$e.OneN]: "OneN",
        32: "One",
        64: "N"
    };
function nI(e) {
    const t = tI[e], n = Ju("base64", t);
    if (!n)
        return null;
    const [i, l, , , r] = n.icon;
    return r;
}
const iI = N`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`, oI = (e) => new ht((t) => e.on({
    copy: ({ payload: { event: n } }) => {
        t.next(n);
    }
})), aI = (e) => new ht((t) => e.on({
    paste: ({ payload: { event: n } }) => {
        t.next(n);
    }
}));
function lI(e) {
    return Y0(e).map((t) => t.map(([, n]) => n).join("	")).join(`
`);
}
function rI(e) {
    const t = Y0(e);
    return t.length === 0 ? "" : `<table><tbody>${t.map((n) => `<tr>${n.map(([i, l]) => `<td data-type="${i}">${l}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
}
function Y0({ editor: { focusTable: e }, settings: { show: t, columnOrder: n }, collections: i }) {
    const l = [];
    if (!e || e.edit || e.selectColumnIds.length === 0)
        return l;
    const r = $(i).collection("tableEntities").selectById(e.tableId);
    if (!r)
        return l;
    const s = Be(e.selectColumnIds), m = $(i).collection("tableColumnEntities").selectByIds(r.columnIds).filter((p) => s(p.id)), h = br(t, n);
    return m.map((p) => h.map((b) => {
        switch (b) {
            case ge.columnName:
                return [It.columnName, p.name];
            case ge.columnDataType:
                return [It.columnDataType, p.dataType];
            case ge.columnDefault:
                return [It.columnDefault, p.default];
            case ge.columnComment:
                return [It.columnComment, p.comment];
            case ge.columnAutoIncrement:
                return [
                    It.columnAutoIncrement,
                    B(p.options, ie.autoIncrement) ? "TRUE" : "FALSE"
                ];
            case ge.columnUnique:
                return [
                    It.columnUnique,
                    B(p.options, ie.unique) ? "TRUE" : "FALSE"
                ];
            case ge.columnNotNull:
                return [
                    It.columnNotNull,
                    B(p.options, ie.notNull) ? "NOT NULL" : "NULL"
                ];
            default:
                return ["", ""];
        }
    }));
}
const cI = Be(["true", "1", "yes", "y"]), yd = Be(["true", "1", "yes", "y", "not null"]);
function sI({ settings: { show: e, columnOrder: t } }, n) {
    const i = n.split(`
`).map((r) => r.split("	")), l = br(e, t);
    return i.map((r) => {
        const s = iu();
        return l.forEach((m, h) => {
            const p = r[h];
            if (!p)
                return;
            const b = p.trim();
            er(s, b, m);
        }), s;
    });
}
function dI({ settings: { show: e, columnOrder: t } }, n) {
    const i = br(e, t), l = document.createElement("template");
    l.innerHTML = n;
    const r = l.content;
    return Array.from(r.querySelectorAll("tr")).map((m) => Array.from(m.querySelectorAll("td,th")).map((h) => {
        var p;
        return [
            ((p = h.dataset) == null ? void 0 : p.type) ?? "",
            h.textContent ?? ""
        ];
    })).map((m) => {
        const h = iu();
        return i.forEach((p, b) => {
            const g = m[b];
            if (!g)
                return;
            const [Z, y] = g, G = y.trim();
            er(h, G, p, Z);
        }), m.filter(([p]) => ou(p)).forEach(([p, b]) => {
            const g = b.trim();
            er(h, g, 0, p);
        }), h;
    });
}
function er(e, t, n, i = "") {
    if (ou(i)) {
        switch (i) {
            case It.columnName:
                e.name = t;
                break;
            case It.columnDataType:
                e.dataType = t;
                break;
            case It.columnDefault:
                e.default = t;
                break;
            case It.columnComment:
                e.comment = t;
                break;
            case It.columnAutoIncrement:
                jo(t) && (e.options |= ie.autoIncrement);
                break;
            case It.columnUnique:
                jo(t) && (e.options |= ie.unique);
                break;
            case It.columnNotNull:
                yd(t.trim().toLowerCase()) && (e.options |= ie.notNull);
                break;
        }
        return;
    }
    switch (n) {
        case ge.columnName:
            e.name = t;
            break;
        case ge.columnDataType:
            e.dataType = t;
            break;
        case ge.columnDefault:
            e.default = t;
            break;
        case ge.columnComment:
            e.comment = t;
            break;
        case ge.columnAutoIncrement:
            jo(t) && (e.options |= ie.autoIncrement);
            break;
        case ge.columnUnique:
            jo(t) && (e.options |= ie.unique);
            break;
        case ge.columnNotNull:
            yd(t.trim().toLowerCase()) && (e.options |= ie.notNull);
            break;
    }
}
function jo(e) {
    return cI(e.trim().toLowerCase());
}
const Eo = ({ editor: e, settings: t }) => (n) => new ht((i) => n.subscribe({
    next: (l) => {
        const r = e.openMap[ce.automaticTablePlacement], s = e.openMap[ce.tableProperties], m = e.openMap[ce.timeTravel], h = e.openMap[ce.search], p = e.openMap[ce.diffViewer];
        t.canvasType === ue.ERD && !r && !s && !h && !p && !m && i.next(l);
    },
    error: (l) => i.error(l),
    complete: () => i.complete()
})), uI = Be([
    D.relationshipZeroOne,
    D.relationshipZeroN,
    D.relationshipOneOnly,
    D.relationshipOneN
]), mI = {
    [D.relationshipZeroOne]: $e.ZeroOne,
    [D.relationshipZeroN]: $e.ZeroN,
    [D.relationshipOneOnly]: $e.OneOnly,
    [D.relationshipOneN]: $e.OneN
};
function hI(e) {
    const t = se(e), { addUnsubscribe: n } = Ge(), i = (m) => {
        const { store: h } = t.value, { editor: p, settings: b } = h.state;
        Bi(b.zoomLevel) || (p.focusTable && !p.focusTable.edit && m.key !== us.Tab && mf(m.key) && h.dispatch(hf({
            moveKey: m.key,
            shiftKey: m.shiftKey
        })), p.focusTable && m.key === us.Tab && (m.preventDefault(), h.dispatch(pf(m.key, m.shiftKey)), setTimeout(() => {
            !p.focusTable || kl(p.focusTable.focusType) || h.dispatch(ia());
        }, 1)));
    }, l = ({ type: m }) => {
        const { store: h, emitter: p } = t.value, { editor: b, settings: g } = h.state, Z = Bi(g.zoomLevel);
        if (!b.focusTable || !b.focusTable.edit) {
            if (m === D.addTable && h.dispatch(hr()), m === D.addColumn && h.dispatch($d()), m === D.addMemo && h.dispatch(pr()), m === D.selectAllTable && h.dispatch(bf()), uI(m)) {
                const y = mI[m];
                h.dispatch(mr(y));
            }
            if (m === D.removeTable && (e.host.dispatchEvent(Ki()), h.dispatch(ff())), m === D.tableProperties) {
                const y = Object.entries(b.selectedMap).find(([, G]) => G === ms.table);
                y && (p.emit(fu({ tableId: y[0] })), h.dispatch(ct({ [ce.tableProperties]: !0 })));
            }
            m === D.zoomIn && h.dispatch(oa(0.1)), m === D.zoomOut && h.dispatch(oa(-0.1));
        }
        if (!Z && (b.focusTable && !b.focusTable.edit && (m === D.selectAllColumn && h.dispatch(gf()), m === D.removeColumn && b.focusTable.selectColumnIds.length && h.dispatch(Md(b.focusTable.tableId, b.focusTable.selectColumnIds)), m === D.primaryKey && b.focusTable.columnId && h.dispatch(Dd(b.focusTable.tableId, b.focusTable.columnId))), b.focusTable && m === D.edit)) {
            const y = b.focusTable;
            y.edit ? h.dispatch(sr()) : y.columnId && kl(y.focusType) ? h.dispatch(Fd(y.focusType, y.tableId, y.columnId)) : h.dispatch(ia());
        }
        m === D.stop && (e.host.dispatchEvent(Hu()), h.dispatch(yf(), Sa())), m === D.undo && h.undo(), m === D.redo && h.redo();
    }, r = (m) => {
        const { store: h } = t.value, { editor: p, settings: b } = h.state;
        !Bi(b.zoomLevel) && p.focusTable && !p.focusTable.edit && p.focusTable.selectColumnIds.length !== 0 && m.clipboardData && (m.preventDefault(), m.clipboardData.clearData(), m.clipboardData.setData("text/plain", lI(h.state)), m.clipboardData.setData("text/html", rI(h.state)));
    }, s = (m) => {
        var W;
        const { store: h } = t.value, { editor: p, settings: b } = h.state;
        if (Bi(b.zoomLevel) || (W = p.focusTable) != null && W.edit || !m.clipboardData || Object.entries(p.selectedMap).filter(([, V]) => V === ms.table).length === 0)
            return;
        const y = m.clipboardData.getData("text/html"), G = m.clipboardData.getData("text/plain");
        let X = [];
        y.trim() ? X = dI(h.state, y) : G.trim() && (X = sI(h.state, G)), X.length !== 0 && (m.preventDefault(), h.dispatch(Zf(X)));
    };
    Te(() => {
        const { store: m, keydown$: h, shortcut$: p, emitter: b } = t.value;
        n(h.pipe(Eo(m.state)).subscribe(i), p.pipe(Eo(m.state)).subscribe(l), oI(b).pipe(Eo(m.state)).subscribe(r), aI(b).pipe(Eo(m.state)).subscribe(s));
    });
}
const pI = (e, t) => {
    const n = Ur(t), i = Ue(), l = Ue(), r = se(t), s = Se({
        dragSelect: !1,
        dragSelectX: 0,
        dragSelectY: 0,
        contextMenuType: Gi.ERD,
        relationshipId: "",
        tableId: "",
        colorPickerShow: !1,
        colorPickerX: 0,
        colorPickerY: 0,
        colorPickerViewport: null,
        colorPickerInitialColor: "",
        tablePropertiesId: "",
        tablePropertiesIds: [],
        grabMove: !1,
        grabCursor: "grab",
        diffValue: "{}"
    });
    hI(t);
    const { addUnsubscribe: m } = Ge(), h = () => {
        i.value.scrollTop === 0 && i.value.scrollLeft === 0 || (i.value.scrollTop = 0, i.value.scrollLeft = 0);
    }, p = () => {
        const { store: T } = r.value, { editor: z } = T.state, M = z.openMap[ce.automaticTablePlacement], U = z.openMap[ce.tableProperties], j = z.openMap[ce.timeTravel], q = z.openMap[ce.diffViewer];
        return M || U || j || q;
    }, b = (T) => {
        const z = T.target;
        if (!z || p())
            return;
        const M = z.closest(".table"), U = z.closest(".relationship");
        M ? (s.tableId = M.dataset.id, s.contextMenuType = Gi.table) : U ? (s.relationshipId = U.dataset.id, s.contextMenuType = Gi.relationship) : s.contextMenuType = Gi.ERD, n.onContextmenu(T);
    }, g = () => {
        n.state.show = !1;
    }, Z = () => {
        const { store: T } = r.value;
        T.dispatch(ct({ [ce.diffViewer]: !1 })), s.diffValue = "{}";
    }, y = () => {
        const { store: T } = r.value;
        T.dispatch(ct({ [ce.timeTravel]: !1 }));
    }, G = (T) => {
        if (p())
            return;
        T.preventDefault();
        const z = un(T), { store: M } = r.value;
        M.dispatch(z ? oa(T.deltaY < 0 ? 0.1 : -0.1) : _n({
            movementX: T.deltaX * -1,
            movementY: T.deltaY * -1
        }));
    }, X = ({ event: T, movementX: z, movementY: M }) => {
        const { store: U } = r.value;
        T.type === "mousemove" && T.preventDefault(), !(z === 0 && M === 0) && (U.dispatch(_n({ movementX: z, movementY: M })), h());
    }, W = (T) => {
        const z = T.target;
        if (!z)
            return;
        const M = p(), U = !z.closest(".color-picker"), j = !z.closest(".table") && !z.closest(".memo") && !z.closest(".edit-input") && !z.closest(".context-menu-content") && !z.closest(".hide-sign") && U, q = j && U && !z.closest(".minimap") && !z.closest(".minimap-viewport") && !z.closest(".virtual-scroll") && !M;
        if (j) {
            const { store: ne } = r.value;
            ne.dispatch(Sa());
        }
        if (U) {
            const { emitter: ne } = r.value;
            ne.emit(bu());
        }
        if (q)
            if (Yi(T) && un(T)) {
                const { x: ne, y: te } = i.value.getBoundingClientRect();
                s.dragSelect = !0, s.dragSelectX = T.clientX - ne, s.dragSelectY = T.clientY - te;
            } else
                s.grabMove && (s.grabCursor = "grabbing"), qt.subscribe({
                    next: X,
                    complete: () => {
                        s.grabCursor = "grab";
                    }
                });
    }, V = () => {
        s.dragSelect = !1;
    }, C = (T) => {
        const { store: z } = r.value;
        z.dispatch(vf(T));
    }, H = (T) => {
        const { store: z } = r.value;
        z.dispatch(T.map(_d));
    }, L = (T) => {
        s.tablePropertiesId = T;
    }, E = (T) => {
        const { store: z } = r.value, { history: M } = z;
        let U = 0;
        for (; M.cursor !== T && U <= fr;)
            M.cursor < T ? M.redo() : M.undo(), U++;
    };
    let J = null;
    const K = () => {
        J == null || J.unsubscribe(), J = null;
    }, Y = () => {
        const { store: T } = r.value, z = i.value;
        z && (K(), J = st(z, "mousemove").pipe(dr(100, void 0, {
            leading: !1,
            trailing: !0
        })).subscribe((M) => {
            const U = z.getBoundingClientRect(), { settings: { scrollLeft: j, scrollTop: q, width: ne, height: te, zoomLevel: je } } = T.state, jt = M.clientX - U.x - j, zt = M.clientY - U.y - q, _e = Wi({ x: jt, y: zt }, ne, te, je);
            T.dispatch(xf(_e));
        }));
    };
    return Te(() => {
        const { store: T, emitter: z, keydown$: M } = r.value, U = i.value;
        e.mouseTracking && Y(), m(Pe(e).subscribe((j) => {
            j === "mouseTracking" && (e.mouseTracking ? Y() : K());
        }), z.on({
            openColorPicker: ({ payload: { x: j, y: q, color: ne } }) => {
                const { editor: te } = T.state, je = U.getBoundingClientRect();
                s.colorPickerX = j - je.x, s.colorPickerY = q - je.y, s.colorPickerViewport = te.viewport, s.colorPickerInitialColor = ne, s.colorPickerShow = !0;
            },
            closeColorPicker: () => {
                s.colorPickerShow = !1;
            },
            openTableProperties: ({ payload: { tableId: j } }) => {
                const { doc: q } = T.state, ne = s.tablePropertiesIds.filter((te) => q.tableIds.includes(te));
                if (ne.includes(j)) {
                    const te = ne.indexOf(j);
                    ne.splice(te, 1);
                }
                ne.unshift(j), s.tablePropertiesIds = ne.slice(0, 5), s.tablePropertiesId = j;
            },
            openDiffViewer: ({ payload: { value: j } }) => {
                s.diffValue = j, T.dispatch(ct({ [ce.diffViewer]: !0 }));
            }
        }), M.pipe(Ci((j) => {
            const q = j.target;
            if (!q)
                return !1;
            const { editor: ne, settings: te } = T.state, je = ne.openMap[ce.automaticTablePlacement], jt = ne.openMap[ce.tableProperties], zt = ne.openMap[ce.timeTravel], _e = ne.openMap[ce.diffViewer];
            return te.canvasType === ue.ERD && !je && !jt && !_e && !zt ? j.code === "Space" && q.tagName === "DIV" : !1;
        })).subscribe(() => {
            s.grabMove = !0;
        }), yy.pipe(Ci((j) => j.code === "Space")).subscribe(() => {
            s.grabMove = !1;
        }));
    }), () => {
        const { store: T } = r.value, { editor: { drawRelationship: z, openMap: M } } = T.state, U = M[ce.automaticTablePlacement], j = M[ce.tableProperties], q = M[ce.timeTravel], ne = M[ce.diffViewer], te = s.grabMove ? s.grabCursor : z ? `url("${nI(z.relationshipType)}") 16 16, auto` : "";
        return I`
      <div
        class=${iI}
        style=${{ cursor: te }}
        ${De(i)}
        @contextmenu=${b}
        @mousedown=${n.onMousedown}
        @mousedown=${W}
        @touchstart=${W}
        @wheel=${G}
      >
        <${Ta} root=${i} canvas=${l} grabMove=${s.grabMove} />
        <${Km} />
        <${Ha} />
        <${LV} root=${i} />
        ${s.dragSelect ? I`
              <${iW}
                root=${i}
                x=${s.dragSelectX}
                y=${s.dragSelectY}
                .onDragSelectEnd=${V}
              />
            ` : null}
        ${n.state.show ? I`
              <${SV}
                type=${s.contextMenuType}
                canvas=${l}
                relationshipId=${s.relationshipId}
                tableId=${s.tableId}
                .onClose=${g}
              />
            ` : null}
        ${s.colorPickerShow ? I`
              <${eI}
                color=${s.colorPickerInitialColor}
                x=${s.colorPickerX}
                y=${s.colorPickerY}
                viewport=${s.colorPickerViewport}
                .onChange=${C}
              />
            ` : null}
        ${U ? I`
              <div>
                <${J5}
                  app=${r}
                  .onChange=${H}
                />
              </div>
            ` : null}
        ${j ? I`
              <${M9}
                tableId=${s.tablePropertiesId}
                tableIds=${s.tablePropertiesIds}
                isDarkMode=${e.isDarkMode}
                .onChange=${L}
              />
            ` : null}
        ${ne ? I`
              <div>
                <${tW}
                  app=${r}
                  initialValue=${s.diffValue}
                  .onClose=${Z}
                />
              </div>
            ` : null}
        ${q ? I`
              <div>
                <${Q9}
                  app=${r}
                  .onChange=${E}
                  .onClose=${y}
                />
              </div>
            ` : null}
      </div>
    `;
    };
}, bI = (
    /* css */
    `
/* easylogic-colorpicker */
.easylogic-colorpicker {
  position: relative;
  width: 224px;
  z-index: 1000;
  display: inline-block;
  border: 1px solid var(--context-menu-border);
  background-color: var(--context-menu-background);
  border-radius: 3px;
  -webkit-box-shadow: 0 0px 10px 2px rgba(0, 0, 0, 0.12);
  box-shadow: 0 0px 10px 2px rgba(0, 0, 0, 0.12);
  outline: none;
  /* theme */
}
.easylogic-colorpicker > .arrow {
  position: absolute;
  top: -10px;
  left: 7px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  display: none;
  border-bottom: 10px solid rgba(0, 0, 0, 0.2);
  pointer-events: none;
}
.easylogic-colorpicker > .arrow:after {
  position: absolute;
  content: '';
  top: 1px;
  left: -9px;
  width: 0;
  height: 0;
  border-left: 9px solid transparent;
  border-right: 9px solid transparent;
  border-bottom: 9px solid white;
}
.easylogic-colorpicker .colorpicker-body .arrow-button {
  position: relative;
  width: 10px;
  height: 12px;
  padding: 0px;
  background-color: transparent;
}
.easylogic-colorpicker .colorpicker-body .arrow-button:before {
  content: '';
  display: inline-block;
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  height: 50%;
  width: 0;
  height: 0;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  border-bottom: 3px solid var(--active);
  pointer-events: none;
  margin: 2px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.easylogic-colorpicker .colorpicker-body .arrow-button:after {
  content: '';
  display: inline-block;
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  top: 50%;
  width: 0;
  height: 0;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  border-top: 3px solid var(--active);
  pointer-events: none;
  margin: 2px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.easylogic-colorpicker .colorpicker-body .color {
  position: relative;
  height: 120px;
  overflow: hidden;
  cursor: pointer;
}
.easylogic-colorpicker .colorpicker-body .color > .saturation {
  position: relative;
  width: 100%;
  height: 100%;
}
.easylogic-colorpicker .colorpicker-body .color > .saturation > .value {
  position: relative;
  width: 100%;
  height: 100%;
}
.easylogic-colorpicker
  .colorpicker-body
  .color
  > .saturation
  > .value
  > .drag-pointer {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
}
.easylogic-colorpicker
  .colorpicker-body
  .color
  > .saturation
  > .value
  > .drag-pointer
  > div {
  border: 1px solid #ececec;
  -webkit-box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.05);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: absolute;
  width: 10px;
  height: 4px;
  background-color: white;
}
.easylogic-colorpicker
  .colorpicker-body
  .color
  > .saturation
  > .value
  > .drag-pointer
  .left-saturation {
  left: 0%;
  top: 50%;
  -webkit-transform: translateX(calc(-100% - 4px)) translateY(-50%);
  transform: translateX(calc(-100% - 4px)) translateY(-50%);
  cursor: col-resize;
}
.easylogic-colorpicker
  .colorpicker-body
  .color
  > .saturation
  > .value
  > .drag-pointer
  .right-saturation {
  left: 100%;
  top: 50%;
  -webkit-transform: translateX(4px) translateY(-50%);
  transform: translateX(4px) translateY(-50%);
  cursor: col-resize;
}
.easylogic-colorpicker
  .colorpicker-body
  .color
  > .saturation
  > .value
  > .drag-pointer
  .top-value {
  width: 4px;
  height: 10px;
  left: 50%;
  top: 0%;
  -webkit-transform: translateX(-50%) translateY(calc(-100% - 4px));
  transform: translateX(-50%) translateY(calc(-100% - 4px));
  cursor: row-resize;
}
.easylogic-colorpicker
  .colorpicker-body
  .color
  > .saturation
  > .value
  > .drag-pointer
  .bottom-value {
  width: 4px;
  height: 10px;
  left: 50%;
  top: 100%;
  -webkit-transform: translateX(-50%) translateY(4px);
  transform: translateX(-50%) translateY(4px);
  cursor: row-resize;
}
.easylogic-colorpicker .colorpicker-body .color > .saturation {
  background-color: rgba(204, 154, 129, 0);
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#fff),
    to(rgba(204, 154, 129, 0))
  );
  background-image: linear-gradient(to right, #fff, rgba(204, 154, 129, 0));
  background-repeat: repeat-x;
}
.easylogic-colorpicker .colorpicker-body .color > .saturation > .value {
  background-image: -webkit-gradient(
    linear,
    left bottom,
    left top,
    from(#000000),
    to(rgba(204, 154, 129, 0))
  );
  background-image: linear-gradient(to top, #000000, rgba(204, 154, 129, 0));
}
.easylogic-colorpicker
  .colorpicker-body
  .color
  > .saturation
  > .value
  > .drag-pointer {
  border: 1px solid #fff;
  -webkit-box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.05);
}
.easylogic-colorpicker .colorpicker-body .control {
  position: relative;
  padding: 10px 0px 10px 0px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.easylogic-colorpicker .colorpicker-body .control > .color,
.easylogic-colorpicker .colorpicker-body .control > .empty {
  position: absolute;
  left: 12px;
  top: 14px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.easylogic-colorpicker .colorpicker-body .control > .color2,
.easylogic-colorpicker .colorpicker-body .control > .empty2 {
  position: absolute;
  left: 12px;
  top: 50px;
  width: 30px;
  height: 20px;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.easylogic-colorpicker .colorpicker-body .control > .color {
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.easylogic-colorpicker .colorpicker-body .control > .hue {
  position: relative;
  padding: 3px 16px;
  margin: 0px 0px 0px 42px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  cursor: pointer;
}
.easylogic-colorpicker .colorpicker-body .control > .hue > .hue-container {
  position: relative;
  width: 100%;
  height: 14px;
  border-radius: 3px;
}
.easylogic-colorpicker .colorpicker-body .control > .hue-scale {
  position: relative;
  padding: 3px 16px;
  margin: 0px 0px 0px 42px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  cursor: pointer;
}
.easylogic-colorpicker
  .colorpicker-body
  .control
  > .hue-scale
  > .hue-scale-container {
  position: relative;
  width: 100%;
  height: 14px;
}
.easylogic-colorpicker .colorpicker-body .control > .opacity {
  position: relative;
  padding: 3px 16px;
  margin: 0px 0px 0px 42px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  cursor: pointer;
}
.easylogic-colorpicker
  .colorpicker-body
  .control
  > .opacity
  > .opacity-container {
  position: relative;
  width: 100%;
  height: 14px;
  border-radius: 3px;
}
.easylogic-colorpicker .colorpicker-body .control .drag-bar,
.easylogic-colorpicker .colorpicker-body .control .drag-bar2 {
  position: absolute;
  cursor: pointer;
  top: 50%;
  left: 0px;
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.easylogic-colorpicker .colorpicker-body .control > .hue > .hue-container {
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#ff0000),
    color-stop(17%, #ffff00),
    color-stop(33%, #00ff00),
    color-stop(50%, #00ffff),
    color-stop(67%, #0000ff),
    color-stop(83%, #ff00ff),
    to(#ff0000)
  );
  background: linear-gradient(
    to right,
    #ff0000 0%,
    #ffff00 17%,
    #00ff00 33%,
    #00ffff 50%,
    #0000ff 67%,
    #ff00ff 83%,
    #ff0000 100%
  );
}
.easylogic-colorpicker
  .colorpicker-body
  .control
  > .opacity
  > .opacity-container {
  background-color: transparent;
  background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
    linear-gradient(-45deg, #ccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ccc 75%),
    linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 10px 10px;
  background-position: 0 0, 0 5px, 5px -5px, -5px 0px;
}
.easylogic-colorpicker
  .colorpicker-body
  .control
  > .opacity
  > .opacity-container
  > .color-bar {
  position: absolute;
  display: block;
  content: '';
  left: 0px;
  right: 0px;
  bottom: 0px;
  top: 0px;
}
.easylogic-colorpicker .colorpicker-body .control > .empty,
.easylogic-colorpicker .colorpicker-body .control > .empty2 {
  background-color: transparent;
  background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
    linear-gradient(-45deg, #ccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ccc 75%),
    linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 10px 10px;
  background-position: 0 0, 0 5px, 5px -5px, -5px 0px;
}
.easylogic-colorpicker .colorpicker-body .control .drag-bar,
.easylogic-colorpicker .colorpicker-body .control .drag-bar2 {
  border: 1px solid rgba(0, 0, 0, 0.05);
  -webkit-box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.2);
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.2);
  background-color: #fefefe;
}
.easylogic-colorpicker .colorpicker-body .information {
  /*border-top: 1px solid #e8e8e8;*/
  position: relative;
  -webkit-box-sizing: padding-box;
  box-sizing: padding-box;
}
.easylogic-colorpicker .colorpicker-body .information > input {
  position: absolute;
  font-size: 10px;
  height: 20px;
  bottom: 20px;
  padding: 0 0 0 2px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
}
.easylogic-colorpicker .colorpicker-body .information > input[type='number'] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.easylogic-colorpicker
  .colorpicker-body
  .information
  > input[type='number']::-webkit-inner-spin-button,
.easylogic-colorpicker
  .colorpicker-body
  .information
  > input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
}
.easylogic-colorpicker
  .colorpicker-body
  .information.hex
  > .information-item.hex {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.easylogic-colorpicker
  .colorpicker-body
  .information.rgb
  > .information-item.rgb {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.easylogic-colorpicker
  .colorpicker-body
  .information.hsl
  > .information-item.hsl {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.easylogic-colorpicker .colorpicker-body .information > .information-item {
  display: none;
  position: relative;
  padding: 0px 5px;
  padding-left: 9px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin-right: 40px;
}
.easylogic-colorpicker
  .colorpicker-body
  .information
  > .information-item
  > .input-field {
  display: block;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  padding: 3px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
}
.easylogic-colorpicker
  .colorpicker-body
  .information
  > .information-item
  > .input-field
  > .title {
  text-align: center;
  font-size: 12px;
  color: #a9a9a9;
  padding-top: 2px;
}
.easylogic-colorpicker
  .colorpicker-body
  .information
  > .information-item
  > .input-field
  input {
  text-align: center;
  width: 100%;
  padding: 3px;
  height: 21px;
  font-size: 11px;
  color: var(--foreground);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
  border: 1px solid var(--context-menu-border);
  border-radius: 2px;
}
.easylogic-colorpicker
  .colorpicker-body
  .information
  > .information-item
  > .input-field
  input[type='number'] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.easylogic-colorpicker
  .colorpicker-body
  .information
  > .information-item
  > .input-field
  input[type='number']::-webkit-inner-spin-button,
.easylogic-colorpicker
  .colorpicker-body
  .information
  > .information-item
  > .input-field
  input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
}
.easylogic-colorpicker
  .colorpicker-body
  .information
  > .information-item
  > .input-field.hsl-l
  input[type='number'],
.easylogic-colorpicker
  .colorpicker-body
  .information
  > .information-item
  > .input-field.hsl-s
  input[type='number'] {
  padding-left: 1px;
  padding-right: 10px;
}
.easylogic-colorpicker
  .colorpicker-body
  .information
  > .information-item
  > .input-field
  .postfix {
  display: inline-block;
  position: absolute;
  right: 3px;
  top: 2px;
  height: 21px;
  line-height: 2;
  padding: 2px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-align: center;
  font-size: 11px;
}
.easylogic-colorpicker .colorpicker-body .information > .information-change {
  position: absolute;
  display: block;
  width: 40px;
  top: 0px;
  right: 0px;
  bottom: 0px;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding-top: 5px;
}
.easylogic-colorpicker
  .colorpicker-body
  .information
  > .information-change
  > .format-change-button {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background: transparent;
  border: 0px;
  cursor: pointer;
  outline: none;
}
.easylogic-colorpicker .colorpicker-body .information > .title {
  color: #a3a3a3;
}
.easylogic-colorpicker .colorpicker-body .information > .input {
  color: var(--foreground);
}
.easylogic-colorpicker .colorpicker-body .colorsets {
  border-top: 1px solid var(--context-menu-border);
}
.easylogic-colorpicker .colorpicker-body .colorsets > .menu {
  float: right;
  padding: 10px 5px;
  padding-right: 15px;
}
.easylogic-colorpicker .colorpicker-body .colorsets > .menu button {
  border: 0px;
  font-size: 14px;
  font-weight: 300;
  font-family: serif, sans-serif;
  outline: none;
  cursor: pointer;
}
.easylogic-colorpicker .colorpicker-body .colorsets > .color-list {
  margin-right: 30px;
  display: block;
  padding: 12px 0px 0px 12px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  line-height: 0;
}
.easylogic-colorpicker .colorpicker-body .colorsets > .color-list h6 {
  margin-top: 0px;
  margin-bottom: 8px;
  display: none;
}
.easylogic-colorpicker
  .colorpicker-body
  .colorsets
  > .color-list
  .color-item {
  width: 13px;
  height: 13px;
  border-radius: 2px;
  display: inline-block;
  margin-right: 12px;
  margin-bottom: 12px;
  position: relative;
  background-size: contain;
  overflow: hidden;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  cursor: pointer;
  vertical-align: middle;
}
.easylogic-colorpicker
  .colorpicker-body
  .colorsets
  > .color-list
  .color-item:hover {
  -webkit-transform: scale(1.2);
  transform: scale(1.2);
}
.easylogic-colorpicker
  .colorpicker-body
  .colorsets
  > .color-list
  .color-item
  .empty {
  position: absolute;
  left: 0px;
  top: 0px;
  background-color: transparent;
  background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
    linear-gradient(-45deg, #ccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ccc 75%),
    linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 10px 10px;
  background-position: 0 0, 0 5px, 5px -5px, -5px 0px;
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
  pointer-events: none;
}
.easylogic-colorpicker
  .colorpicker-body
  .colorsets
  > .color-list
  .color-item
  .color-view {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
  pointer-events: none;
  border: 1px solid rgba(0, 0, 0, 0.1);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.easylogic-colorpicker
  .colorpicker-body
  .colorsets
  > .color-list
  .add-color-item {
  width: 13px;
  height: 13px;
  display: inline-block;
  margin-right: 12px;
  margin-bottom: 12px;
  cursor: pointer;
  line-height: 1;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  font-family: serif, sans-serif;
  color: var(--foreground);
  vertical-align: middle;
}
.easylogic-colorpicker .colorpicker-body .color-chooser {
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  top: 0px;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-transition: opacity 0.05s ease-out;
  transition: opacity 0.05s ease-out;
  pointer-events: none;
}
.easylogic-colorpicker .colorpicker-body .color-chooser.open {
  opacity: 1;
  pointer-events: all;
}
.easylogic-colorpicker
  .colorpicker-body
  .color-chooser
  .color-chooser-container {
  position: absolute;
  top: 120px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: var(--context-menu-background);
}
.easylogic-colorpicker
  .colorpicker-body
  .color-chooser
  .color-chooser-container
  .colorsets-item-header {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 34px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 3px 0px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.easylogic-colorpicker
  .colorpicker-body
  .color-chooser
  .color-chooser-container
  .colorsets-item-header
  .title {
  -webkit-box-flex: 2;
  -ms-flex: 2;
  flex: 2;
  font-weight: bold;
  font-size: 15px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin-right: 30px;
  vertical-align: middle;
  margin: 0px;
  padding: 5px;
  padding-left: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--active);
  text-align: left;
}
.easylogic-colorpicker
  .colorpicker-body
  .color-chooser
  .color-chooser-container
  .colorsets-item-header
  .items {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  text-align: right;
  padding-right: 10px;
  display: block;
  height: 100%;
  line-height: 2;
  cursor: pointer;
}
.easylogic-colorpicker
  .colorpicker-body
  .color-chooser
  .color-chooser-container
  .colorsets-list {
  position: absolute;
  top: 34px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  overflow: auto;
}
.easylogic-colorpicker
  .colorpicker-body
  .color-chooser
  .color-chooser-container
  .colorsets-list
  .colorsets-item {
  cursor: pointer;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 3px 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.easylogic-colorpicker
  .colorpicker-body
  .color-chooser
  .color-chooser-container
  .colorsets-list
  .colorsets-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
.easylogic-colorpicker
  .colorpicker-body
  .color-chooser
  .color-chooser-container
  .colorsets-list
  .colorsets-item
  .title {
  -webkit-box-flex: 2;
  -ms-flex: 2;
  flex: 2;
  font-size: 14px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin-right: 30px;
  vertical-align: middle;
  pointer-events: none;
  margin: 0px;
  padding: 5px;
  padding-left: 14px;
  font-weight: normal;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--active);
  text-align: left;
}
.easylogic-colorpicker
  .colorpicker-body
  .color-chooser
  .color-chooser-container
  .colorsets-list
  .colorsets-item
  .items {
  -webkit-box-flex: 3;
  -ms-flex: 3;
  flex: 3;
  display: block;
  height: 100%;
  line-height: 1.6;
  cursor: pointer;
  pointer-events: none;
}
.easylogic-colorpicker
  .colorpicker-body
  .color-chooser
  .color-chooser-container
  .colorsets-list
  .colorsets-item
  .items
  .color-item {
  width: 13px;
  height: 13px;
  border-radius: 3px;
  display: inline-block;
  margin-right: 10px;
  background-color: transparent;
  background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
    linear-gradient(-45deg, #ccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ccc 75%),
    linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 10px 10px;
  background-position: 0 0, 0 5px, 5px -5px, -5px 0px;
  background-size: contain;
  border: 1px solid #dddddd;
  overflow: hidden;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  cursor: pointer;
  vertical-align: middle;
}
.easylogic-colorpicker
  .colorpicker-body
  .color-chooser
  .color-chooser-container
  .colorsets-list
  .colorsets-item
  .items
  .color-item
  .color-view {
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
  pointer-events: none;
}
.easylogic-colorpicker .gradient-editor {
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.easylogic-colorpicker .gradient-editor .tools {
  padding: 4px 6px;
}
.easylogic-colorpicker .gradient-editor .unit {
  display: grid;
  grid-template-columns: 1fr 50px 50px;
  grid-column-gap: 5px;
  font-size: 11px;
}
.easylogic-colorpicker .gradient-editor .unit input,
.easylogic-colorpicker .gradient-editor .unit select {
  width: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.easylogic-colorpicker .gradient-editor [data-editor] {
  display: none;
  margin-top: 2px;
}
.easylogic-colorpicker .gradient-editor [data-editor] > label {
  font-size: 11px;
  vertical-align: middle;
}
.easylogic-colorpicker .gradient-editor [data-editor] > label > * {
  vertical-align: middle;
}
.easylogic-colorpicker
  .gradient-editor:not([data-selected-editor*='static-gradient'])
  [data-editor='gradient'],
.easylogic-colorpicker
  .gradient-editor:not([data-selected-editor*='static-gradient'])
  [data-editor='tools'] {
  display: block;
}
.easylogic-colorpicker
  .gradient-editor[data-selected-editor='linear-gradient']
  [data-editor='angle'],
.easylogic-colorpicker
  .gradient-editor[data-selected-editor='repeating-linear-gradient']
  [data-editor='angle'],
.easylogic-colorpicker
  .gradient-editor[data-selected-editor='conic-gradient']
  [data-editor='angle'],
.easylogic-colorpicker
  .gradient-editor[data-selected-editor='repeating-conic-gradient']
  [data-editor='angle'] {
  display: block;
}
.easylogic-colorpicker
  .gradient-editor[data-selected-editor='radial-gradient']
  [data-editor='centerX'],
.easylogic-colorpicker
  .gradient-editor[data-selected-editor='radial-gradient']
  [data-editor='centerY'],
.easylogic-colorpicker
  .gradient-editor[data-selected-editor='repeating-radial-gradient']
  [data-editor='centerX'],
.easylogic-colorpicker
  .gradient-editor[data-selected-editor='repeating-radial-gradient']
  [data-editor='centerY'],
.easylogic-colorpicker
  .gradient-editor[data-selected-editor='conic-gradient']
  [data-editor='centerX'],
.easylogic-colorpicker
  .gradient-editor[data-selected-editor='conic-gradient']
  [data-editor='centerY'],
.easylogic-colorpicker
  .gradient-editor[data-selected-editor='repeating-conic-gradient']
  [data-editor='centerX'],
.easylogic-colorpicker
  .gradient-editor[data-selected-editor='repeating-conic-gradient']
  [data-editor='centerY'] {
  display: block;
}
.easylogic-colorpicker
  .gradient-editor[data-selected-editor='radial-gradient']
  [data-editor='radialType'],
.easylogic-colorpicker
  .gradient-editor[data-selected-editor='repeating-radial-gradient']
  [data-editor='radialType'] {
  margin-top: 5px;
  display: grid;
  grid-template-columns: 1fr 105px;
  grid-column-gap: 2px;
}
.easylogic-colorpicker
  .gradient-editor[data-selected-editor='radial-gradient']
  [data-editor='radialType']
  select,
.easylogic-colorpicker
  .gradient-editor[data-selected-editor='repeating-radial-gradient']
  [data-editor='radialType']
  select {
  width: 100%;
}
.easylogic-colorpicker .gradient-editor .sub-editor {
  padding: 0px 8px;
}
.easylogic-colorpicker .gradient-editor .gradient-steps {
  position: relative;
  height: 30px;
}
.easylogic-colorpicker .gradient-editor .hue-container,
.easylogic-colorpicker .gradient-editor .hue {
  position: absolute;
  left: 10px;
  right: 10px;
  top: 4px;
  height: 14px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: transparent;
  background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
    linear-gradient(-45deg, #ccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ccc 75%),
    linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 10px 10px;
  background-position: 0 0, 0 5px, 5px -5px, -5px 0px;
  pointer-events: all;
}
.easylogic-colorpicker .gradient-editor .hue {
  pointer-events: none;
}
.easylogic-colorpicker .gradient-editor .hue .step-list {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  border-radius: 10px;
  pointer-events: none;
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list[data-selected-index='0']
  [data-index='0'] {
  border: 0px;
  -webkit-transform: translateX(-50%) translateY(calc(100%));
  transform: translateX(-50%) translateY(calc(100%));
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list[data-selected-index='0']
  [data-index='0']
  .arrow {
  display: block;
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list[data-selected-index='1']
  [data-index='1'] {
  border: 0px;
  -webkit-transform: translateX(-50%) translateY(calc(100%));
  transform: translateX(-50%) translateY(calc(100%));
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list[data-selected-index='1']
  [data-index='1']
  .arrow {
  display: block;
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list[data-selected-index='2']
  [data-index='2'] {
  border: 0px;
  -webkit-transform: translateX(-50%) translateY(calc(100%));
  transform: translateX(-50%) translateY(calc(100%));
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list[data-selected-index='2']
  [data-index='2']
  .arrow {
  display: block;
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list[data-selected-index='3']
  [data-index='3'] {
  border: 0px;
  -webkit-transform: translateX(-50%) translateY(calc(100%));
  transform: translateX(-50%) translateY(calc(100%));
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list[data-selected-index='3']
  [data-index='3']
  .arrow {
  display: block;
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list[data-selected-index='4']
  [data-index='4'] {
  border: 0px;
  -webkit-transform: translateX(-50%) translateY(calc(100%));
  transform: translateX(-50%) translateY(calc(100%));
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list[data-selected-index='4']
  [data-index='4']
  .arrow {
  display: block;
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list[data-selected-index='5']
  [data-index='5'] {
  border: 0px;
  -webkit-transform: translateX(-50%) translateY(calc(100%));
  transform: translateX(-50%) translateY(calc(100%));
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list[data-selected-index='5']
  [data-index='5']
  .arrow {
  display: block;
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list[data-selected-index='6']
  [data-index='6'] {
  border: 0px;
  -webkit-transform: translateX(-50%) translateY(calc(100%));
  transform: translateX(-50%) translateY(calc(100%));
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list[data-selected-index='6']
  [data-index='6']
  .arrow {
  display: block;
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list[data-selected-index='7']
  [data-index='7'] {
  border: 0px;
  -webkit-transform: translateX(-50%) translateY(calc(100%));
  transform: translateX(-50%) translateY(calc(100%));
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list[data-selected-index='7']
  [data-index='7']
  .arrow {
  display: block;
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list[data-selected-index='8']
  [data-index='8'] {
  border: 0px;
  -webkit-transform: translateX(-50%) translateY(calc(100%));
  transform: translateX(-50%) translateY(calc(100%));
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list[data-selected-index='8']
  [data-index='8']
  .arrow {
  display: block;
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list[data-selected-index='9']
  [data-index='9'] {
  border: 0px;
  -webkit-transform: translateX(-50%) translateY(calc(100%));
  transform: translateX(-50%) translateY(calc(100%));
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list[data-selected-index='9']
  [data-index='9']
  .arrow {
  display: block;
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list[data-selected-index='10']
  [data-index='10'] {
  border: 0px;
  -webkit-transform: translateX(-50%) translateY(calc(100%));
  transform: translateX(-50%) translateY(calc(100%));
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list[data-selected-index='10']
  [data-index='10']
  .arrow {
  display: block;
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list[data-selected-index='11']
  [data-index='11'] {
  border: 0px;
  -webkit-transform: translateX(-50%) translateY(calc(100%));
  transform: translateX(-50%) translateY(calc(100%));
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list[data-selected-index='11']
  [data-index='11']
  .arrow {
  display: block;
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list[data-selected-index='12']
  [data-index='12'] {
  border: 0px;
  -webkit-transform: translateX(-50%) translateY(calc(100%));
  transform: translateX(-50%) translateY(calc(100%));
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list[data-selected-index='12']
  [data-index='12']
  .arrow {
  display: block;
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list[data-selected-index='13']
  [data-index='13'] {
  border: 0px;
  -webkit-transform: translateX(-50%) translateY(calc(100%));
  transform: translateX(-50%) translateY(calc(100%));
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list[data-selected-index='13']
  [data-index='13']
  .arrow {
  display: block;
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list[data-selected-index='14']
  [data-index='14'] {
  border: 0px;
  -webkit-transform: translateX(-50%) translateY(calc(100%));
  transform: translateX(-50%) translateY(calc(100%));
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list[data-selected-index='14']
  [data-index='14']
  .arrow {
  display: block;
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list[data-selected-index='15']
  [data-index='15'] {
  border: 0px;
  -webkit-transform: translateX(-50%) translateY(calc(100%));
  transform: translateX(-50%) translateY(calc(100%));
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list[data-selected-index='15']
  [data-index='15']
  .arrow {
  display: block;
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list[data-selected-index='16']
  [data-index='16'] {
  border: 0px;
  -webkit-transform: translateX(-50%) translateY(calc(100%));
  transform: translateX(-50%) translateY(calc(100%));
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list[data-selected-index='16']
  [data-index='16']
  .arrow {
  display: block;
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list[data-selected-index='17']
  [data-index='17'] {
  border: 0px;
  -webkit-transform: translateX(-50%) translateY(calc(100%));
  transform: translateX(-50%) translateY(calc(100%));
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list[data-selected-index='17']
  [data-index='17']
  .arrow {
  display: block;
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list[data-selected-index='18']
  [data-index='18'] {
  border: 0px;
  -webkit-transform: translateX(-50%) translateY(calc(100%));
  transform: translateX(-50%) translateY(calc(100%));
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list[data-selected-index='18']
  [data-index='18']
  .arrow {
  display: block;
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list[data-selected-index='19']
  [data-index='19'] {
  border: 0px;
  -webkit-transform: translateX(-50%) translateY(calc(100%));
  transform: translateX(-50%) translateY(calc(100%));
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list[data-selected-index='19']
  [data-index='19']
  .arrow {
  display: block;
}
.easylogic-colorpicker .gradient-editor .hue .step-list .step {
  pointer-events: all;
  width: 10px;
  height: 10px;
  border: 1px solid white;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
  position: absolute;
  top: 50%;
  border-radius: 100%;
  -webkit-box-shadow: 0 0 2px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 0 0 2px 0px rgba(0, 0, 0, 0.5);
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  background-color: transparent;
  background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
    linear-gradient(-45deg, #ccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ccc 75%),
    linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 10px 10px;
  background-position: 0 0, 0 5px, 5px -5px, -5px 0px;
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list
  .step[data-cut='true'] {
  border-radius: 0%;
}
.easylogic-colorpicker
  .gradient-editor
  .hue
  .step-list
  .step[data-cut='true']
  .color-view {
  border-radius: 0%;
}
.easylogic-colorpicker .gradient-editor .hue .step-list .step .color-view {
  position: absolute;
  left: 0px;
  top: 0px;
  bottom: 0px;
  right: 0px;
  border-radius: 100%;
  pointer-events: none;
}
.easylogic-colorpicker .gradient-editor .hue .step-list .step .arrow {
  position: absolute;
  left: 50%;
  display: none;
  top: 0%;
  width: 5px;
  height: 5px;
  -webkit-transform: translateX(-50%) translateY(-120%);
  transform: translateX(-50%) translateY(-120%);
  pointer-events: none;
  -webkit-clip-path: polygon(40% 0%, 60% 0%, 60% 100%, 40% 100%);
  clip-path: polygon(40% 0%, 60% 0%, 60% 100%, 40% 100%);
}
.easylogic-colorpicker .gradient-editor input[type='range'] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 100%;
  margin: 6.2px 0;
  background-color: transparent;
}
.easylogic-colorpicker .gradient-editor input[type='range']:focus {
  outline: none;
}
.easylogic-colorpicker
  .gradient-editor
  input[type='range']::-webkit-slider-runnable-track {
  width: 100%;
  height: 1px;
  cursor: pointer;
  background: #556375;
  border-radius: 0px;
  border: 0px solid #010101;
}
.easylogic-colorpicker
  .gradient-editor
  input[type='range']::-webkit-slider-thumb {
  height: 10px;
  width: 10px;
  border-radius: 10px;
  background: #556375;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
  margin-top: -5px;
}
.easylogic-colorpicker
  .gradient-editor
  input[type='range']:focus::-webkit-slider-runnable-track {
  background: #3174ad;
}
.easylogic-colorpicker
  .gradient-editor
  input[type='range']::-moz-range-track {
  width: 100%;
  height: 1px;
  cursor: pointer;
  background: #556375;
  border-radius: 0px;
  border: 0px solid #010101;
}
.easylogic-colorpicker
  .gradient-editor
  input[type='range']::-moz-range-thumb {
  border: 1px solid #000000;
  height: 10px;
  width: 10px;
  border-radius: 9px;
  background: #556375;
  cursor: pointer;
}
.easylogic-colorpicker .gradient-editor input[type='range']::-ms-track {
  width: 100%;
  height: 1px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
.easylogic-colorpicker .gradient-editor input[type='range']::-ms-fill-lower {
  background: #556375;
  border: 0px solid #010101;
  border-radius: 0px;
  box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
}
.easylogic-colorpicker .gradient-editor input[type='range']::-ms-fill-upper {
  background: #556375;
  border: 0px solid #010101;
  border-radius: 0px;
}
.easylogic-colorpicker .gradient-editor input[type='range']::-ms-thumb {
  height: 10px;
  width: 10px;
  border-radius: 9px;
  background: #556375;
  cursor: pointer;
}
.easylogic-colorpicker
  .gradient-editor
  input[type='range']:focus::-ms-fill-lower {
  background: #556375;
}
.easylogic-colorpicker
  .gradient-editor
  input[type='range']:focus::-ms-fill-upper {
  background: #556375;
}
.easylogic-colorpicker .gradient-editor .right-menu {
  display: inline-block;
  float: right;
}
.easylogic-colorpicker .gradient-editor .right-menu button {
  font-size: 11px;
  background-color: transparent;
  border: 0px;
}
.easylogic-colorpicker.gradient-picker {
  width: 460px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.easylogic-colorpicker.gradient-picker .gradient-body {
  display: grid;
  grid-template-columns: 1fr 224px;
}
.easylogic-colorpicker.gradient-picker .gradient-body > div:first-child {
  padding: 5px;
  border-right: 1px solid #cccccc;
}
.easylogic-colorpicker.gradient-picker .popup-item {
  margin-bottom: 5px;
}
.easylogic-colorpicker.gradient-picker .grid-2 {
  display: grid;
  grid-template-columns: 60px 1fr;
}
.easylogic-colorpicker.gradient-picker .grid-2 label {
  font-size: 11px;
  padding-right: 2px;
  text-align: left;
}
.easylogic-colorpicker.gradient-picker label {
  font-size: 11px;
}
.easylogic-colorpicker.gradient-picker .gradient-preview {
  width: 100%;
  height: 100px;
  position: relative;
  margin-bottom: 5px;
  border: 1px solid #cccccc;
  border-radius: 3px;
  overflow: hidden;
  background-color: transparent;
  background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
    linear-gradient(-45deg, #ccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ccc 75%),
    linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 10px 10px;
  background-position: 0 0, 0 5px, 5px -5px, -5px 0px;
}
.easylogic-colorpicker.gradient-picker .gradient-preview .gradient-view {
  position: absolute;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
}
.easylogic-colorpicker.gradient-picker .picker-tab {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.easylogic-colorpicker.gradient-picker .picker-tab .picker-tab-list {
  text-align: center;
  padding: 2px 5px;
}
.easylogic-colorpicker.gradient-picker
  .picker-tab
  .picker-tab-list[data-value='linear-gradient']
  .picker-tab-item[data-selected-value='linear-gradient'] {
  -webkit-box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.5);
}
.easylogic-colorpicker.gradient-picker
  .picker-tab
  .picker-tab-list[data-value='linear-gradient']
  .picker-tab-item[data-selected-value='linear-gradient']
  .icon
  svg
  path {
  fill: rgba(0, 0, 255, 0.5);
}
.easylogic-colorpicker.gradient-picker
  .picker-tab
  .picker-tab-list[data-value='repeating-linear-gradient']
  .picker-tab-item[data-selected-value='repeating-linear-gradient'] {
  -webkit-box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.5);
}
.easylogic-colorpicker.gradient-picker
  .picker-tab
  .picker-tab-list[data-value='repeating-linear-gradient']
  .picker-tab-item[data-selected-value='repeating-linear-gradient']
  .icon
  svg
  path {
  fill: rgba(0, 0, 255, 0.5);
}
.easylogic-colorpicker.gradient-picker
  .picker-tab
  .picker-tab-list[data-value='radial-gradient']
  .picker-tab-item[data-selected-value='radial-gradient'] {
  -webkit-box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.5);
}
.easylogic-colorpicker.gradient-picker
  .picker-tab
  .picker-tab-list[data-value='radial-gradient']
  .picker-tab-item[data-selected-value='radial-gradient']
  .icon
  svg
  path {
  fill: rgba(0, 0, 255, 0.5);
}
.easylogic-colorpicker.gradient-picker
  .picker-tab
  .picker-tab-list[data-value='repeating-radial-gradient']
  .picker-tab-item[data-selected-value='repeating-radial-gradient'] {
  -webkit-box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.5);
}
.easylogic-colorpicker.gradient-picker
  .picker-tab
  .picker-tab-list[data-value='repeating-radial-gradient']
  .picker-tab-item[data-selected-value='repeating-radial-gradient']
  .icon
  svg
  path {
  fill: rgba(0, 0, 255, 0.5);
}
.easylogic-colorpicker.gradient-picker
  .picker-tab
  .picker-tab-list[data-value='conic-gradient']
  .picker-tab-item[data-selected-value='conic-gradient'] {
  -webkit-box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.5);
}
.easylogic-colorpicker.gradient-picker
  .picker-tab
  .picker-tab-list[data-value='conic-gradient']
  .picker-tab-item[data-selected-value='conic-gradient']
  .icon
  svg
  path {
  fill: rgba(0, 0, 255, 0.5);
}
.easylogic-colorpicker.gradient-picker
  .picker-tab
  .picker-tab-list[data-value='repeating-conic-gradient']
  .picker-tab-item[data-selected-value='repeating-conic-gradient'] {
  -webkit-box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.5);
}
.easylogic-colorpicker.gradient-picker
  .picker-tab
  .picker-tab-list[data-value='repeating-conic-gradient']
  .picker-tab-item[data-selected-value='repeating-conic-gradient']
  .icon
  svg
  path {
  fill: rgba(0, 0, 255, 0.5);
}
.easylogic-colorpicker.gradient-picker
  .picker-tab
  .picker-tab-list
  .picker-tab-item {
  display: inline-block;
  vertical-align: middle;
  height: 20px;
  width: 20px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
  border-radius: 20%;
}
.easylogic-colorpicker.gradient-picker
  .picker-tab
  .picker-tab-list
  .picker-tab-item
  .icon {
  pointer-events: none;
  border-radius: 100%;
  display: inline-block;
  width: 90%;
  height: 90%;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
}
.easylogic-colorpicker.gradient-picker
  .picker-tab
  .picker-tab-list
  .picker-tab-item
  .icon
  svg {
  width: 100%;
  height: 100%;
}
.easylogic-colorpicker.gradient-picker
  .picker-tab
  .picker-tab-list
  .picker-tab-item[data-selected-value='static-gradient']
  .icon {
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    from(red),
    to(red)
  );
  background-image: linear-gradient(to right, red, red);
}
.easylogic-colorpicker.gradient-picker
  .picker-tab
  .picker-tab-list
  .picker-tab-item[data-selected-value='linear-gradient']
  .icon {
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    from(black),
    to(gray)
  );
  background-image: linear-gradient(to right, black, gray);
}
.easylogic-colorpicker.gradient-picker
  .picker-tab
  .picker-tab-list
  .picker-tab-item[data-selected-value='radial-gradient']
  .icon {
  background-image: radial-gradient(closest-side, black, #ebf8e1, gray);
}
.easylogic-colorpicker.gradient-picker
  .picker-tab
  .picker-tab-list
  .picker-tab-item[data-selected-value='conic-gradient']
  .icon {
  background-image: conic-gradient(black, #ebf8e1);
}
.easylogic-colorpicker.gradient-picker
  .picker-tab
  .picker-tab-list
  .picker-tab-item[data-selected-value='repeating-linear-gradient']
  .icon {
  background-image: repeating-linear-gradient(
    45deg,
    #3f87a6,
    #ebf8e1 15%,
    #f69d3c 20%
  );
}
.easylogic-colorpicker.gradient-picker
  .picker-tab
  .picker-tab-list
  .picker-tab-item[data-selected-value='repeating-radial-gradient']
  .icon {
  background-image: repeating-radial-gradient(
    circle,
    #3f87a6,
    #ebf8e1 15%,
    #f69d3c 20%
  );
}
.easylogic-colorpicker.gradient-picker
  .picker-tab
  .picker-tab-list
  .picker-tab-item[data-selected-value='repeating-conic-gradient']
  .icon {
  background-image: repeating-conic-gradient(
    #3f87a6,
    #ebf8e1 5%,
    #f69d3c 10%
  );
}
.easylogic-colorpicker.gradient-picker .picker-tab .picker-gradient-selector {
  padding: 2px 10px;
}
.easylogic-colorpicker.gradient-picker
  .picker-tab
  .picker-gradient-selector
  .gradient-steps {
  position: relative;
  display: block;
  height: 30px;
}
.easylogic-colorpicker.gradient-picker
  .picker-tab
  .picker-gradient-selector
  .gradient-steps
  .hue-container {
  width: 100%;
  height: 14px;
  position: absolute;
  z-index: 0;
  background-color: transparent;
  background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
    linear-gradient(-45deg, #ccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ccc 75%),
    linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 10px 10px;
  background-position: 0 0, 0 5px, 5px -5px, -5px 0px;
  -webkit-box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.1);
}
.easylogic-colorpicker.gradient-picker
  .picker-tab
  .picker-gradient-selector
  .gradient-steps
  .hue {
  position: relative;
  padding: 0px;
  margin: 0px;
  cursor: pointer;
}
.easylogic-colorpicker.gradient-picker
  .picker-tab
  .picker-gradient-selector
  .gradient-steps
  .hue
  > .step-list {
  position: relative;
  width: 100%;
  cursor: copy;
  height: 14px;
  z-index: 1;
}
.easylogic-colorpicker.gradient-picker
  .picker-tab
  .picker-gradient-selector
  .gradient-steps
  .hue
  > .step-list.mode-drag {
  cursor: pointer;
}
.easylogic-colorpicker.gradient-picker
  .picker-tab
  .picker-gradient-selector
  .gradient-steps
  .hue
  .drag-bar {
  border: 0px;
  background-color: transparent;
  border: 2px solid white;
  -webkit-box-shadow: 0 0 2px 0px rgba(0, 0, 0, 0.6);
  box-shadow: 0 0 2px 0px rgba(0, 0, 0, 0.6);
  width: 10px;
  height: 10px;
  -webkit-transform: none;
  transform: none;
  border-radius: 50%;
  display: inline-block;
  left: 0px;
  top: 17px;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  position: absolute;
  background-color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  -webkit-transition: top 0.3s ease-out;
  transition: top 0.3s ease-out;
}
.easylogic-colorpicker.gradient-picker
  .picker-tab
  .picker-gradient-selector
  .gradient-steps
  .hue
  .drag-bar
  .guide-line {
  pointer-events: none;
  position: absolute;
  width: 1px;
  height: 0px;
  bottom: 8px;
  left: 3px;
  -webkit-transform: translateX(-1px);
  transform: translateX(-1px);
  -webkit-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
}
.easylogic-colorpicker.gradient-picker
  .picker-tab
  .picker-gradient-selector
  .gradient-steps
  .hue
  .drag-bar.selected {
  z-index: 1;
  top: 30px;
}
.easylogic-colorpicker.gradient-picker
  .picker-tab
  .picker-gradient-selector
  .gradient-steps
  .hue
  .drag-bar.selected
  .guide-line {
  height: 17px;
}
.easylogic-colorpicker.gradient-picker
  .picker-tab
  .picker-gradient-selector
  .gradient-steps
  .hue
  .drag-bar.selected
  .guide-change {
  opacity: 1;
}
.easylogic-colorpicker.gradient-picker .easylogic-colorpicker {
  width: 223px;
  border-radius: 0px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  border: 0px;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.easylogic-colorpicker.sketch {
  border-radius: 5px;
}
.easylogic-colorpicker.sketch > .colorpicker-body > .color {
  margin: 10px 10px 2px 10px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 150px;
}
.easylogic-colorpicker.sketch > .colorpicker-body > .control {
  padding: 0px;
}
.easylogic-colorpicker.sketch > .colorpicker-body > .control > .color,
.easylogic-colorpicker.sketch > .colorpicker-body > .control > .empty {
  position: absolute;
  right: 10px;
  left: auto;
  top: 2px;
  width: 40px;
  height: 44px;
  border-radius: 2px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.easylogic-colorpicker.sketch > .colorpicker-body > .control > .color2,
.easylogic-colorpicker.sketch > .colorpicker-body > .control > .empty2 {
  position: absolute;
  right: 10px;
  left: auto;
  top: 50px;
  width: 40px;
  height: 20px;
  border-radius: 2px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.easylogic-colorpicker.sketch > .colorpicker-body > .control > .color {
  -webkit-box-shadow: inset 0px 0px 1px 0px rgba(0, 0, 0, 0.5);
  box-shadow: inset 0px 0px 1px 0px rgba(0, 0, 0, 0.5);
}
.easylogic-colorpicker.sketch > .colorpicker-body > .control > .hue {
  position: relative;
  padding: 2px 2px 2px 10px;
  margin: 0px 50px 0px 0px;
}
.easylogic-colorpicker.sketch
  > .colorpicker-body
  > .control
  > .hue
  > .hue-container {
  border-radius: 0px;
  height: 20px;
}
.easylogic-colorpicker.sketch > .colorpicker-body > .control > .hue-scale {
  position: relative;
  padding: 2px 2px 2px 10px;
  margin: 0px 50px 0px 0px;
}
.easylogic-colorpicker.sketch
  > .colorpicker-body
  > .control
  > .hue-scale
  > .hue-scale-container {
  border-radius: 0px;
  height: 20px;
}
.easylogic-colorpicker.sketch > .colorpicker-body > .control > .opacity {
  position: relative;
  padding: 2px 2px 2px 10px;
  margin: 0px 50px 0px 0px;
}
.easylogic-colorpicker.sketch
  > .colorpicker-body
  > .control
  > .opacity
  > .opacity-container {
  border-radius: 0px;
  height: 20px;
}
.easylogic-colorpicker.sketch > .colorpicker-body > .control .drag-bar,
.easylogic-colorpicker.sketch > .colorpicker-body > .control .drag-bar2 {
  border-radius: 0px;
  top: 50%;
  left: 0px;
  width: 5px;
  height: 80%;
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  border-radius: 1px;
  bottom: 1px !important;
}
.easylogic-colorpicker.sketch > .colorpicker-body > .control .drag-bar.first,
.easylogic-colorpicker.sketch
  > .colorpicker-body
  > .control
  .drag-bar2.first {
  left: 0px;
  -webkit-transform: translateX(50%) translateY(-50%) !important;
  transform: translateX(50%) translateY(-50%) !important;
}
.easylogic-colorpicker.sketch > .colorpicker-body > .control .drag-bar.last,
.easylogic-colorpicker.sketch > .colorpicker-body > .control .drag-bar2.last {
  -webkit-transform: translateX(-110%) translateY(-50%) !important;
  transform: translateX(-110%) translateY(-50%) !important;
}
.easylogic-colorpicker.sketch
  > .colorpicker-body
  > .information
  .information-change {
  display: none;
}
.easylogic-colorpicker.sketch
  > .colorpicker-body
  > .information.rgb
  .information-item.rgb {
  display: inherit;
}
.easylogic-colorpicker.sketch
  > .colorpicker-body
  > .information.rgb
  .information-item.hsl {
  display: none !important;
}
.easylogic-colorpicker.sketch
  > .colorpicker-body
  > .information.hex
  .information-item.hex {
  display: inherit;
}
.easylogic-colorpicker.sketch
  > .colorpicker-body
  > .information.hex
  .information-item.hsl {
  display: none !important;
}
.easylogic-colorpicker.sketch
  > .colorpicker-body
  > .information.hsl
  .information-item.rgb {
  display: none !important;
}
.easylogic-colorpicker.sketch
  > .colorpicker-body
  > .information.hsl
  .information-item.hsl {
  display: inherit;
}
.easylogic-colorpicker.sketch
  > .colorpicker-body
  > .information
  .information-item {
  display: -webkit-inline-box !important;
  display: -ms-inline-flexbox !important;
  display: inline-flex !important;
  margin-right: 0px;
}
.easylogic-colorpicker.sketch
  > .colorpicker-body
  > .information
  .information-item
  > .input-field {
  padding-left: 0px;
}
.easylogic-colorpicker.sketch
  > .colorpicker-body
  > .information
  .information-item
  > .input-field:last-child {
  padding-right: 0px;
}
.easylogic-colorpicker.sketch
  > .colorpicker-body
  > .information
  .information-item
  > .input-field
  > .title {
  color: var(--active);
  font-size: 11px;
  cursor: pointer;
}
.easylogic-colorpicker.sketch
  > .colorpicker-body
  > .information
  .information-item
  > .input-field:last-child:not(:first-child) {
  padding-right: 0px;
}
.easylogic-colorpicker.sketch
  > .colorpicker-body
  > .information
  .information-item.hex {
  width: 74px;
  padding-right: 0px;
  padding-left: 5px;
}
.easylogic-colorpicker.sketch
  > .colorpicker-body
  > .information
  .information-item.rgb {
  width: 140px;
  padding-left: 0px;
  padding-right: 0px;
}
.easylogic-colorpicker.sketch
  > .colorpicker-body
  > .information
  .information-item.hsl {
  display: none;
  width: 140px;
  padding-left: 0px;
  padding-right: 0px;
}
.easylogic-colorpicker.sketch > .colorpicker-body > .colorsets > .color-list {
  margin-right: 0px;
  padding-right: 12px;
}
.easylogic-colorpicker.sketch
  > .colorpicker-body
  > .colorsets
  > .color-list
  h6 {
  margin-top: 0px;
  margin-bottom: 8px;
  display: none;
}
.easylogic-colorpicker.sketch
  > .colorpicker-body
  > .colorsets
  > .color-list
  .color-item {
  width: 16px;
  height: 16px;
  border-radius: 3px;
  margin-right: 9px;
  margin-bottom: 10px;
}
.easylogic-colorpicker.palette {
  border-radius: 3px;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.easylogic-colorpicker.palette > .colorpicker-body > .color {
  display: none;
}
.easylogic-colorpicker.palette > .colorpicker-body > .control {
  display: none;
}
.easylogic-colorpicker.palette > .colorpicker-body > .information {
  display: none;
}
.easylogic-colorpicker.palette > .colorpicker-body > .colorsets {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-top: 0px;
}
.easylogic-colorpicker.palette
  > .colorpicker-body
  > .colorsets
  > .color-list
  h6 {
  margin-top: 0px;
  margin-bottom: 8px;
  display: none;
}
.easylogic-colorpicker.palette
  > .colorpicker-body
  > .colorsets
  > .color-list
  .color-item {
  width: 15px;
  height: 15px;
  margin-right: 10px;
  margin-bottom: 10px;
}
.easylogic-colorpicker.palette > .colorpicker-body > .color-chooser {
  display: none;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.easylogic-colorpicker.palette > .colorpicker-body > .color-chooser.open {
  display: block;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: auto;
  border-radius: 3px;
  border: 1px solid #d8d8d8;
  -webkit-box-shadow: 0 0px 10px 2px rgba(0, 0, 0, 0.12);
  box-shadow: 0 0px 10px 2px rgba(0, 0, 0, 0.12);
}
.easylogic-colorpicker.palette
  > .colorpicker-body
  > .color-chooser.open
  .color-chooser-container {
  position: relative;
  top: auto;
  left: auto;
  right: auto;
  bottom: auto;
  background-color: var(--context-menu-background);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 2px;
}
.easylogic-colorpicker.palette
  > .colorpicker-body
  > .color-chooser.open
  .color-chooser-container
  .colorsets-item-header {
  position: relative;
  left: auto;
  top: auto;
  right: auto;
  bottom: auto;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
.easylogic-colorpicker.palette
  > .colorpicker-body
  > .color-chooser.open
  .color-chooser-container
  .colorsets-list {
  position: relative;
  top: auto;
  left: auto;
  right: auto;
  bottom: auto;
  overflow: auto;
}
.easylogic-colorpicker.palette
  > .colorpicker-body
  > .color-chooser.open
  .color-chooser-container
  .colorsets-list
  .colorsets-item:last-child {
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}
.easylogic-colorpicker.macos .colorpicker-body .wheel {
  width: 224px;
  height: 224px;
  position: relative;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.easylogic-colorpicker.macos .colorpicker-body .wheel .wheel-canvas {
  width: 214px;
  height: 214px;
  border-radius: 50%;
  position: absolute;
  left: 5px;
  top: 5px;
}
.easylogic-colorpicker.macos .colorpicker-body .wheel .drag-pointer {
  display: inline-block;
  position: absolute;
  width: 10px;
  height: 10px;
  left: 50%;
  top: 50%;
  border: 1px solid white;
  border-radius: 50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  z-index: 2;
}
.easylogic-colorpicker.macos .control {
  padding-top: 0px;
}
.easylogic-colorpicker.macos .control > .color,
.easylogic-colorpicker.macos .control > .empty {
  top: 4px;
}
.easylogic-colorpicker.macos .value {
  position: relative;
  padding: 6px 16px;
  margin: 0px 0px 0px 42px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  cursor: pointer;
}
.easylogic-colorpicker.macos .value > .value-container {
  position: relative;
  width: 100%;
  height: 10px;
  border-radius: 3px;
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#000000),
    to(rgba(255, 255, 255, 0))
  );
  background-image: linear-gradient(
    to right,
    #000000 0%,
    rgba(255, 255, 255, 0) 100%
  );
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.easylogic-colorpicker.macos .value > .value-container .drag-bar {
  position: absolute;
  cursor: pointer;
  top: 50%;
  left: 0px;
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.easylogic-colorpicker.mini {
  width: 180px;
  display: inline-block;
}
.easylogic-colorpicker.mini .control {
  padding: 0px;
}
.easylogic-colorpicker.mini .control .hue,
.easylogic-colorpicker.mini .control .opacity {
  margin: 0px;
  padding: 0px;
}
.easylogic-colorpicker.mini .control .hue > .hue-container {
  border-radius: 0px;
  overflow: hidden;
  height: 20px;
}
.easylogic-colorpicker.mini .control .opacity > .opacity-container {
  border-radius: 0px;
  overflow: hidden;
  height: 20px;
}
.easylogic-colorpicker.mini .control .drag-bar,
.easylogic-colorpicker.mini .control .drag-bar2 {
  border: 0px;
  background-color: transparent;
  height: 100%;
  width: 5px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.easylogic-colorpicker.mini .control .drag-bar.last:before,
.easylogic-colorpicker.mini .control .drag-bar.lastafter,
.easylogic-colorpicker.mini .control .drag-bar2.last:before,
.easylogic-colorpicker.mini .control .drag-bar2.lastafter {
  left: 1px;
}
.easylogic-colorpicker.mini .control .drag-bar.first:before,
.easylogic-colorpicker.mini .control .drag-bar.first:after,
.easylogic-colorpicker.mini .control .drag-bar2.first:before,
.easylogic-colorpicker.mini .control .drag-bar2.first:after {
  left: 3px;
}
.easylogic-colorpicker.mini .control .drag-bar:before,
.easylogic-colorpicker.mini .control .drag-bar2:before {
  content: '';
  position: absolute;
  left: 2px;
  top: 0px;
  width: 0;
  height: 0;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid black;
}
.easylogic-colorpicker.mini .control .drag-bar:after,
.easylogic-colorpicker.mini .control .drag-bar2:after {
  content: '';
  position: absolute;
  left: 2px;
  bottom: 0px;
  width: 0;
  height: 0;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid black;
}
.easylogic-colorpicker.mini-vertical {
  width: 180px;
  display: inline-block;
}
.easylogic-colorpicker.mini-vertical .color {
  display: inline-block;
  width: 140px;
  height: 160px;
  vertical-align: middle;
}
.easylogic-colorpicker.mini-vertical .control {
  height: 160px;
  padding: 0px;
  vertical-align: middle;
  display: inline-block;
}
.easylogic-colorpicker.mini-vertical .control .hue,
.easylogic-colorpicker.mini-vertical .control .opacity {
  margin: 0px;
  padding: 0px;
  width: 20px;
  display: inline-block;
  vertical-align: middle;
  height: 100%;
  position: relative;
}
.easylogic-colorpicker.mini-vertical .control .hue > .hue-container {
  border-radius: 0px;
  overflow: hidden;
  height: 100%;
  background: -webkit-gradient(
    linear,
    left bottom,
    left top,
    from(#ff0000),
    color-stop(17%, #ffff00),
    color-stop(33%, #00ff00),
    color-stop(50%, #00ffff),
    color-stop(67%, #0000ff),
    color-stop(83%, #ff00ff),
    to(#ff0000)
  );
  background: linear-gradient(
    to top,
    #ff0000 0%,
    #ffff00 17%,
    #00ff00 33%,
    #00ffff 50%,
    #0000ff 67%,
    #ff00ff 83%,
    #ff0000 100%
  );
}
.easylogic-colorpicker.mini-vertical .control .opacity > .opacity-container {
  border-radius: 0px;
  overflow: hidden;
  height: 100%;
  width: 20px;
}
.easylogic-colorpicker.mini-vertical .control .drag-bar,
.easylogic-colorpicker.mini-vertical .control .drag-bar2 {
  border: 0px;
  background-color: transparent;
  height: 2px;
  width: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-box-shadow: none;
  box-shadow: none;
  -webkit-transform: none;
  transform: none;
}
.easylogic-colorpicker.mini-vertical .control .drag-bar.last:before,
.easylogic-colorpicker.mini-vertical .control .drag-bar.last:after,
.easylogic-colorpicker.mini-vertical .control .drag-bar2.last:before,
.easylogic-colorpicker.mini-vertical .control .drag-bar2.last:after {
  top: 2px;
}
.easylogic-colorpicker.mini-vertical .control .drag-bar.first:before,
.easylogic-colorpicker.mini-vertical .control .drag-bar.first:after,
.easylogic-colorpicker.mini-vertical .control .drag-bar2.first:before,
.easylogic-colorpicker.mini-vertical .control .drag-bar2.first:after {
  top: -1px;
}
.easylogic-colorpicker.mini-vertical .control .drag-bar:before,
.easylogic-colorpicker.mini-vertical .control .drag-bar2:before {
  content: '';
  position: absolute;
  left: 0px;
  top: 2px;
  width: 0;
  height: 0;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-left: 4px solid black;
}
.easylogic-colorpicker.mini-vertical .control .drag-bar:after,
.easylogic-colorpicker.mini-vertical .control .drag-bar2:after {
  content: '';
  position: absolute;
  top: 2px;
  right: 0px;
  width: 0;
  height: 0;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-right: 4px solid black;
}
.easylogic-colorpicker.ring .colorpicker-body > .color {
  position: absolute;
  width: 120px;
  height: 120px;
  left: 52px;
  top: 52px;
}
.easylogic-colorpicker.ring .colorpicker-body .wheel {
  width: 224px;
  height: 224px;
  position: relative;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.easylogic-colorpicker.ring .colorpicker-body .wheel .wheel-canvas {
  width: 214px;
  height: 214px;
  border-radius: 50%;
  position: absolute;
  left: 5px;
  top: 5px;
}
.easylogic-colorpicker.ring .colorpicker-body .wheel .drag-pointer {
  display: inline-block;
  position: absolute;
  width: 10px;
  height: 10px;
  left: 50%;
  top: 50%;
  border: 1px solid white;
  border-radius: 50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  z-index: 2;
}
.easylogic-colorpicker.ring .control {
  padding-top: 0px;
}
.easylogic-colorpicker.ring .control .value {
  display: none;
}
.easylogic-colorpicker.ring .control > .color,
.easylogic-colorpicker.ring .control > .empty {
  top: -17px;
  width: 30px;
  height: 30px;
  border-radius: 2px;
}
.easylogic-colorpicker.xd {
  display: inline-block;
  padding-top: 12px;
  width: 245px;
}
.easylogic-colorpicker.xd .color {
  display: inline-block;
  margin-left: 12px;
  margin-bottom: 12px;
  width: 170px;
  height: 170px;
  vertical-align: middle;
  border-radius: 3px;
  overflow: hidden;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid #cecece;
}
.easylogic-colorpicker.xd .color > .saturation > .value > .drag-pointer {
  border: 2px solid white;
  width: 7px;
  height: 7px;
  -webkit-box-shadow: 0 0 1px 0px black, inset 0 0 1px 0px black;
  box-shadow: 0 0 1px 0px black, inset 0 0 1px 0px black;
}
.easylogic-colorpicker.xd .control {
  height: 170px;
  padding: 0px;
  vertical-align: middle;
  display: inline-block;
  margin-right: 12px;
  margin-bottom: 12px;
}
.easylogic-colorpicker.xd .control .hue,
.easylogic-colorpicker.xd .control .opacity {
  margin: 0px;
  padding: 0px;
  width: 13px;
  display: inline-block;
  vertical-align: middle;
  height: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 3px;
  margin-left: 8px;
}
.easylogic-colorpicker.xd .control .hue > .hue-container {
  border-radius: 0px;
  overflow: hidden;
  height: 100%;
  background: -webkit-gradient(
    linear,
    left bottom,
    left top,
    from(#ff0000),
    color-stop(17%, #ffff00),
    color-stop(33%, #00ff00),
    color-stop(50%, #00ffff),
    color-stop(67%, #0000ff),
    color-stop(83%, #ff00ff),
    to(#ff0000)
  );
  background: linear-gradient(
    to top,
    #ff0000 0%,
    #ffff00 17%,
    #00ff00 33%,
    #00ffff 50%,
    #0000ff 67%,
    #ff00ff 83%,
    #ff0000 100%
  );
}
.easylogic-colorpicker.xd .control .opacity > .opacity-container {
  border-radius: 0px;
  overflow: hidden;
  height: 100%;
}
.easylogic-colorpicker.xd .control .drag-bar,
.easylogic-colorpicker.xd .control .drag-bar2 {
  border: 0px;
  background-color: transparent;
  border: 2px solid white;
  -webkit-box-shadow: 0 0 1px 0px black, inset 0 0 1px 0px black;
  box-shadow: 0 0 1px 0px black, inset 0 0 1px 0px black;
  width: 10px;
  height: 10px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transform: none;
  transform: none;
  overflow: hidden;
  left: 50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
}
.easylogic-colorpicker.xd .information {
  margin-top: 5px;
}
.easylogic-colorpicker.vscode {
  width: 336px;
  display: inline-block;
  background-color: #333;
  border: 1px solid #ececec;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 0px;
}
.easylogic-colorpicker.vscode .colorpicker-body {
  border-radius: 0px;
  display: inline-block;
}
.easylogic-colorpicker.vscode .colorpicker-body .color-view {
  height: 34px;
  background-color: transparent;
  background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
    linear-gradient(-45deg, #ccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ccc 75%),
    linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 10px 10px;
  background-position: 0 0, 0 5px, 5px -5px, -5px 0px;
}
.easylogic-colorpicker.vscode
  .colorpicker-body
  .color-view
  .color-view-container {
  line-height: 34px;
  font-size: 14px;
  text-align: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  text-shadow: 0 0 3px #535353;
}
.easylogic-colorpicker.vscode .colorpicker-body .color-tool {
  padding: 8px;
}
.easylogic-colorpicker.vscode .color {
  display: inline-block;
  width: 240px;
  height: 160px;
  vertical-align: middle;
}
.easylogic-colorpicker.vscode .control {
  height: 160px;
  vertical-align: middle;
  display: inline-block;
  padding: 0px 0px 0px 4px;
}
.easylogic-colorpicker.vscode .control .hue,
.easylogic-colorpicker.vscode .control .opacity {
  margin: 0px;
  padding: 0px;
  width: 30px;
  display: inline-block;
  vertical-align: middle;
  height: 100%;
  position: relative;
}
.easylogic-colorpicker.vscode .control .hue {
  padding-left: 5px;
  width: 35px;
}
.easylogic-colorpicker.vscode .control .hue > .hue-container {
  border-radius: 0px;
  height: 100%;
  background: -webkit-gradient(
    linear,
    left bottom,
    left top,
    from(#ff0000),
    color-stop(17%, #ffff00),
    color-stop(33%, #00ff00),
    color-stop(50%, #00ffff),
    color-stop(67%, #0000ff),
    color-stop(83%, #ff00ff),
    to(#ff0000)
  );
  background: linear-gradient(
    to top,
    #ff0000 0%,
    #ffff00 17%,
    #00ff00 33%,
    #00ffff 50%,
    #0000ff 67%,
    #ff00ff 83%,
    #ff0000 100%
  );
}
.easylogic-colorpicker.vscode .control .opacity > .opacity-container {
  border-radius: 0px;
  height: 100%;
  width: 30px;
}
.easylogic-colorpicker.vscode .control .drag-bar,
.easylogic-colorpicker.vscode .control .drag-bar2 {
  background-color: transparent;
  height: 5px;
  width: 33px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-box-shadow: none;
  box-shadow: none;
  -webkit-transform: translateY(-50%) translateX(-2px);
  transform: translateY(-50%) translateX(-2px);
  border: 1px solid rgba(255, 255, 255, 0);
  border-radius: 0px;
  -webkit-box-shadow: 0 0 2px 0 black, inset 0 0 0 0 black;
  box-shadow: 0 0 2px 0 black, inset 0 0 0 0 black;
}
.easylogic-colorpicker.hide-colorsets .colorsets {
  display: none !important;
}

.colorsets-contextmenu {
  position: fixed;
  padding-top: 4px;
  padding-bottom: 4px;
  border-radius: 6px;
  background-color: #ececec;
  border: 1px solid #cccccc;
  display: none;
  list-style: none;
  font-size: 13px;
  padding-left: 0px;
  padding-right: 0px;
}
.colorsets-contextmenu.show {
  display: inline-block;
}
.colorsets-contextmenu .menu-item {
  padding: 2px 20px;
  cursor: default;
}
.colorsets-contextmenu .menu-item:hover {
  background-color: #5ea3fb;
  color: white;
}
.colorsets-contextmenu.small .menu-item.small-hide {
  display: none;
}
`
);
function fI() {
    const e = document.createElement("style");
    return e.textContent = bI, e;
}
const K0 = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', 'Open Sans', system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'", gI = "'Menlo', 'Consolas', 'Bitstream Vera Sans Mono', monospace, 'Apple Color Emoji', 'Segoe UI Emoji'";
function yI() {
    const e = document.createElement("style");
    return e.textContent = /* css */
        `
    :host {
      --text-font-family: ${K0};
      --code-font-family: ${gI};
    }
  `, e;
}
const ZI = (
    /* css */
    `
p,
ol,
ul,
li,
dl,
dt,
dd,
blockquote,
figure,
fieldset,
legend,
textarea,
pre,
iframe,
hr,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 100%;
  font-weight: normal;
}

ul {
  list-style: none;
}

button,
input,
select,
textarea {
  padding: 0;
  border: none;
  outline: none;
  font-family: var(--text-font-family);
  color: var(--active);
  background-color: inherit;
}

input::placeholder,
textarea::placeholder {
  font-family: var(--text-font-family);
  color: var(--placeholder);
  opacity: 1;
}

input:disabled,
textarea:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

*, *::before, *::after {
  box-sizing: border-box;
}

img,
video {
  height: auto;
  max-width: 100%;
}

iframe {
  border: 0;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

td,
th {
  padding: 0;
}

:host {
  font-family: var(--text-font-family);
  color: var(--foreground);
  fill: var(--foreground);
  font-size: var(--font-size-2);
  letter-spacing: var(--letter-spacing-2);
  line-height: var(--line-height-2);
  font-weight: var(--font-weight-regular);
}
`
);
function vI() {
    const e = document.createElement("style");
    return e.textContent = ZI, e;
}
const xI = (
    /* css */
    `
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: var(--scrollbar-track);
}
::-webkit-scrollbar-corner {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: var(--scrollbar-thumb);
}
::-webkit-scrollbar-thumb:hover {
  background: var(--scrollbar-thumb-hover);
}

.scrollbar {
  scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
  scrollbar-width: thin;
}
`
);
function GI() {
    const e = document.createElement("style");
    return e.textContent = xI, e;
}
const XI = () => {
    const e = vI(), t = yI(), n = by(), i = GI(), l = fI();
    return () => I`${e}${t}${n}${i}${l}`;
};
function WI(e, t) {
    return new ai(e, {
        keys: ["name", "keywords"]
    }).search(t).map((i) => i.item);
}
function VI(e) {
    var l, r;
    const { store: t, keyBindingMap: n } = e, { settings: i } = t.state;
    return [
        ...kI,
        {
            icon: I`<${P} prefix="mdi" name="database" size=${16} />`,
            name: "Database",
            next: $m.map((s) => ({
                icon: s.value === i.database ? I`<${P} name="check" size=${16} />` : null,
                name: s.name,
                perform: ({ store: m }) => {
                    m.dispatch(Qd({
                        value: s.value
                    }));
                }
            })),
            filter: ({ store: s }) => s.state.settings.canvasType === ue.ERD || s.state.settings.canvasType === ue.schemaSQL
        },
        {
            icon: I`<${P} name="file-import" size=${16} />`,
            name: "Import",
            next: [
                {
                    icon: I`<${P} prefix="mdi" name="code-json" size=${16} />`,
                    name: "json",
                    perform: (s) => {
                        Mm(s);
                    }
                },
                {
                    icon: I`<${P}
            prefix="mdi"
            name="database-import"
            size=${16}
          />`,
                    name: "Schema SQL",
                    perform: (s) => {
                        Fm(s);
                    }
                }
            ],
            filter: ({ store: s }) => s.state.settings.canvasType === ue.ERD
        },
        {
            icon: I`<${P} name="file-export" size=${16} />`,
            name: "Export",
            next: [
                {
                    icon: I`<${P} prefix="mdi" name="code-json" size=${16} />`,
                    name: "json",
                    perform: ({ store: s }) => {
                        _m(ii(s.state), s.state.settings.databaseName);
                    }
                },
                {
                    icon: I`<${P}
            prefix="mdi"
            name="database-export"
            size=${16}
          />`,
                    name: "Schema SQL",
                    perform: ({ store: s }) => {
                        qm(Ua(s.state), s.state.settings.databaseName);
                    }
                }
            ],
            filter: ({ store: s }) => s.state.settings.canvasType === ue.ERD
        },
        {
            icon: I`<${P} name="table" size=${16} />`,
            name: "New Table",
            shortcut: (l = n.addTable[0]) == null ? void 0 : l.shortcut,
            perform: ({ store: s }) => {
                s.dispatch(hr());
            },
            filter: ({ store: s }) => s.state.settings.canvasType === ue.ERD
        },
        {
            icon: I`<${P} name="note-sticky" size=${16} />`,
            name: "New Memo",
            shortcut: (r = n.addMemo[0]) == null ? void 0 : r.shortcut,
            perform: ({ store: s }) => {
                s.dispatch(pr());
            },
            filter: ({ store: s }) => s.state.settings.canvasType === ue.ERD
        },
        ...jm.map((s) => {
            var m;
            return {
                icon: I`<${P} prefix="base64" name=${s.iconName} size=${16} />`,
                name: s.name,
                keywords: "Relationship",
                shortcut: (m = n[s.keyBindingName][0]) == null ? void 0 : m.shortcut,
                perform: ({ store: h }) => {
                    h.dispatch(mr(s.relationshipType));
                },
                filter: ({ store: h }) => h.state.settings.canvasType === ue.ERD
            };
        }),
        {
            icon: I`<${P} prefix="mdi" name="atom" size=${16} />`,
            name: "Automatic Table Placement",
            perform: ({ store: s }) => {
                s.dispatch(ct({ [ce.automaticTablePlacement]: !0 }));
            },
            filter: ({ store: s }) => s.state.settings.canvasType === ue.ERD
        },
        {
            icon: I`<${P} prefix="mdi" name="code-brackets" size=${16} />`,
            name: "Bracket",
            next: S0.map((s) => ({
                icon: s.value === i.bracketType ? I`<${P} name="check" size=${16} />` : null,
                name: s.name,
                perform: ({ store: m }) => {
                    m.dispatch(nu({
                        value: s.value
                    }));
                }
            })),
            filter: ({ store: s }) => s.state.settings.canvasType === ue.schemaSQL
        },
        ...II(e)
    ];
}
function II({ store: e }) {
    const { settings: t, doc: { tableIds: n }, collections: i } = e.state;
    return t.canvasType !== ue.ERD ? [] : $(i).collection("tableEntities").selectByIds(n).sort(xt).map((l) => ({
        name: ln(l.name.trim()) ? "unnamed" : l.name,
        keywords: "Table",
        perform: ({ store: r }) => {
            const { settings: { width: s, height: m, zoomLevel: h } } = r.state, { x: p, y: b } = ur({ x: l.ui.x - Pd, y: l.ui.y - Bd }, s, m, h);
            r.dispatch(Ri({
                scrollLeft: p * -1,
                scrollTop: b * -1
            }), Va(l.id, !1));
        }
    }));
}
const kI = [
    {
        name: "Tab",
        next: [
            {
                icon: I`<${P} name="diagram-project" size=${16} />`,
                name: "Entity Relationship Diagram",
                perform: ({ store: e }) => {
                    e.dispatch(hi({ value: ue.ERD }));
                },
                filter: ({ store: e }) => e.state.settings.canvasType !== ue.ERD
            },
            {
                icon: I`<${P}
          prefix="mdi"
          name="chart-scatter-plot"
          size=${16}
        />`,
                name: "Visualization",
                perform: ({ store: e }) => {
                    e.dispatch(hi({ value: ue.visualization }));
                },
                filter: ({ store: e }) => e.state.settings.canvasType !== ue.visualization
            }
        ]
    }
], CI = N`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: start;
  justify-content: center;
  padding: 60px 16px 16px;
  z-index: 2147483647;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.4);
  }
`, SI = N`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  position: relative;
  z-index: 1;
  background-color: var(--context-menu-background);
  border: 1px solid var(--context-menu-border);
  border-radius: 6px;
  overflow: hidden;
`, RI = N`
  height: 50px;
  min-height: 50px;
  padding: 12px 16px;
  ${Yu};
`, LI = N`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 400px;
  overflow: auto;
`, YI = N`
  display: flex;
  padding: 12px 16px;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
  min-height: 45px;
  height: 45px;

  &:hover {
    background-color: var(--column-hover);
  }

  &.selected {
    background-color: var(--column-select);
  }
`, KI = N`
  display: flex;
  align-items: center;
  min-width: 14px;
  margin-right: 8px;
`, TI = N`
  overflow: hidden;
  text-overflow: ellipsis;
  ${Lt.normal};
`, HI = N`
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--placeholder);
  ${Lt.paragraph};
`, NI = N`
  width: 8px;
  height: 100%;
`, zI = N`
  display: flex;
  align-items: center;
  margin-left: auto;
  padding-left: 24px;
`, wI = Be([
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "Enter"
]), MI = N`
  background-color: var(--gray-color-6);
`, FI = N`
  width: 100%;
  height: 1px;
`, tr = (e, t) => () => I`
    <div
      style=${{
            "padding-left": `${e.padding ?? 0}px`,
            "padding-right": `${e.padding ?? 0}px`
        }}
    >
      <div
        class=${[MI, FI]}
        style=${{
            "margin-top": `${e.space ?? 0}px`,
            "margin-bottom": `${e.space ?? 0}px`
        }}
      ></div>
    </div>
  `, T0 = N`
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  outline: none;
  border-radius: 9999px;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    border-radius: inherit;
    transition: background-position, background-color, box-shadow, filter;
    transition-timing-function: linear, ease-in-out, ease-in-out, ease-in-out;
    background-repeat: no-repeat;
    background-color: var(--gray-color-3);
    background-image: linear-gradient(
      to right,
      var(--accent-color-9) 40%,
      transparent 60%
    );
    box-shadow: inset 0 0 0 1px var(--gray-color-6);
  }

  &[data-checked='true']::before {
    transition-duration: 0.16s, 0.14s, 0.14s, 0.14s;
    background-position: 0;
  }

  &[data-checked='false']::before {
    transition-duration: 0.12s, 0.14s, 0.14s, 0.14s;
    background-position-x: 100%;
  }
`, $I = N`
  width: 28px;
  height: 16px;

  &::before {
    background-size: calc(28px * 2 + 16px) 100%;
  }

  & > span {
    width: 14px;
    height: 14px;
  }

  & > span[data-checked] {
    transform: translateX(calc(28px - 14px - 1px));
  }
`, UI = N`
  width: 35px;
  height: 20px;

  &::before {
    background-size: calc(35px * 2 + 20px) 100%;
  }

  & > span {
    width: 18px;
    height: 18px;
  }

  & > span[data-checked] {
    transform: translateX(calc(35px - 18px - 1px));
  }
`, jI = N`
  width: 42px;
  height: 24px;

  &::before {
    background-size: calc(42px * 2 + 24px) 100%;
  }

  & > span {
    width: 22px;
    height: 22px;
  }

  & > span[data-checked] {
    transform: translateX(calc(42px - 22px - 1px));
  }
`, H0 = N`
  background-color: #fff;
  position: relative;
  border-radius: 9999px;
  transition:
    transform 0.14s cubic-bezier(0.45, 0.05, 0.55, 0.95),
    box-shadow 0.14s ease-in-out;
  transform: translateX(1px);
`, EI = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
            __proto__: null,
            size1: $I,
            size2: UI,
            size3: jI,
            switchButton: T0,
            switchThumb: H0
        }, Symbol.toStringTag, { value: "Module" })), Po = (e, t) => {
            const n = () => {
                e.onChange(!e.value);
            };
            return () => I`
    <button
      class=${[
                    T0,
                    Reflect.get(EI, `size${e.size ?? "2"}`)
                ]}
      type="button"
      data-checked=${e.value}
      @click=${n}
    >
      <span class=${H0} ?data-checked=${e.value}></span>
    </button>
  `;
        }, PI = N`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
`, BI = N`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`, OI = N`
  display: flex;
  align-items: center;
  padding: 0 12px;
  height: 32px;
  border-radius: 4px;
  cursor: default;

  &:hover {
    background-color: var(--context-menu-hover);
    color: var(--active);
    fill: var(--active);
  }

  &.selected {
    background-color: var(--context-menu-select);
    color: var(--active);
    fill: var(--active);
  }
`, ea = {
        preferences: "Preferences",
        shortcuts: "Shortcuts"
    }, AI = Object.values(ea), QI = (e, t) => () => I`
    <div class=${PI}>
      <div class=${xr}>Settings</div>
      <${tr} space=${12} />
      <div class=${["scrollbar", BI]}>
        ${AI.map((n) => I`
            <div
              class=${[OI, { selected: n === e.value }]}
              @click=${() => e.onChange(n)}
            >
              ${n}
            </div>
          `)}
      </div>
    </div>
  `, Zd = N`
  padding: 12px;
  height: 44px;
  box-shadow: inset 0 -1px var(--gray-color-5);
`, DI = N`
  width: 100%;
  text-align: left;
  vertical-align: top;
  border-collapse: collapse;
  border-radius: calc(var(--table-border-radius) - 1px);
  border-spacing: 0;
  box-sizing: border-box;
  height: 0;

  th {
    font-weight: var(--font-weight-bold);
    ${Zd};
  }

  td {
    ${Zd};
  }
`, _I = N`
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`, qI = (e, t) => {
        const n = se(t), i = () => {
            const { keyBindingMap: l } = n.value;
            return [
                {
                    command: "Editing",
                    shortcuts: l.edit
                },
                {
                    command: "Stop",
                    shortcuts: l.stop
                },
                {
                    command: "Search",
                    shortcuts: l.search
                },
                {
                    command: "Undo",
                    shortcuts: l.undo
                },
                {
                    command: "Redo",
                    shortcuts: l.redo
                },
                {
                    command: "Add Table",
                    shortcuts: l.addTable
                },
                {
                    command: "Add Column",
                    shortcuts: l.addColumn
                },
                {
                    command: "Add Memo",
                    shortcuts: l.addMemo
                },
                {
                    command: "Remove Table, Memo",
                    shortcuts: l.removeTable
                },
                {
                    command: "Remove Column",
                    shortcuts: l.removeColumn
                },
                {
                    command: "Primary Key",
                    shortcuts: l.primaryKey
                },
                {
                    command: "Select All Table, Memo",
                    shortcuts: l.selectAllTable
                },
                {
                    command: "Select All Column",
                    shortcuts: l.selectAllColumn
                },
                {
                    command: "Relationship Zero One",
                    shortcuts: l.relationshipZeroOne
                },
                {
                    command: "Relationship Zero N",
                    shortcuts: l.relationshipZeroN
                },
                {
                    command: "Relationship One Only",
                    shortcuts: l.relationshipOneOnly
                },
                {
                    command: "Relationship One N",
                    shortcuts: l.relationshipOneN
                },
                {
                    command: "Table Properties",
                    shortcuts: l.tableProperties
                },
                {
                    command: "Zoom In",
                    shortcuts: l.zoomIn
                },
                {
                    command: "Zoom Out",
                    shortcuts: l.zoomOut
                }
            ];
        };
        return () => I`
      <table class=${DI}>
        <thead>
          <tr>
            <th>Command</th>
            <th>Keybinding</th>
          </tr>
        </thead>
        <tbody>
          ${i().map(({ command: l, shortcuts: r }) => I`
              <tr>
                <td>${l}</td>
                <td>
                  ${r.map(({ shortcut: s }) => I`
                      <div class=${_I}>
                        <${Gn} shortcut=${s} />
                      </div>
                    `)}
                </td>
              </tr>
            `)}
        </tbody>
      </table>
    `;
    }, ek = N`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 32px;
  background-color: var(--context-menu-background);

  .column-order-move {
    transition: transform 0.3s;
  }
`, tk = N`
  display: flex;
  width: 200px;
  height: 100%;
  overflow: hidden;
`, nk = N`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding-left: 16px;
`, ik = N`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: auto;
  flex-flow: wrap;
`, ok = N`
  margin: 0 32px 32px 0;
  min-width: 300px;
`, Ei = N`
  display: flex;
  white-space: nowrap;
  height: 24px;
  align-items: center;
  margin-bottom: 16px;
`, Mn = (e) => N`
  width: ${e}px;
  height: 100%;
`, ak = N`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`, lk = N`
  display: flex;
  flex-direction: column;
`, xl = N`
  display: flex;
  align-items: center;
  padding: 0 12px;
  height: 32px;
  cursor: move;
  border-radius: 4px;

  &:hover {
    background-color: var(--context-menu-hover);
    color: var(--active);
    fill: var(--active);
  }

  &.none-hover {
    background-color: transparent;
    color: var(--foreground);
    fill: var(--foreground);
  }

  &.dragging {
    opacity: 0.5;
  }
`, ck = [
        "grayColor1",
        "grayColor2",
        "grayColor3",
        "grayColor4",
        "grayColor5",
        "grayColor6",
        "grayColor7",
        "grayColor8",
        "grayColor9",
        "grayColor10",
        "grayColor11",
        "grayColor12",
        "accentColor1",
        "accentColor2",
        "accentColor3",
        "accentColor4",
        "accentColor5",
        "accentColor6",
        "accentColor7",
        "accentColor8",
        "accentColor9",
        "accentColor10",
        "accentColor11",
        "accentColor12",
        "canvasBackground",
        "canvasBoundaryBackground",
        "tableBackground",
        "tableSelect",
        "tableBorder",
        "memoBackground",
        "memoSelect",
        "memoBorder",
        "columnSelect",
        "columnHover",
        "relationshipHover",
        "toolbarBackground",
        "contextMenuBackground",
        "contextMenuSelect",
        "contextMenuHover",
        "contextMenuBorder",
        "minimapBorder",
        "minimapShadow",
        "minimapViewportBorder",
        "minimapViewportBorderHover",
        "toastBackground",
        "toastBorder",
        "dargSelectBackground",
        "dargSelectBorder",
        "scrollbarTrack",
        "scrollbarThumb",
        "scrollbarThumbHover",
        "foreground",
        "active",
        "placeholder",
        "focus",
        "inputActive",
        "keyPK",
        "keyFK",
        "keyPFK",
        "diffInsertBackground",
        "diffDeleteBackground",
        "diffCrossBackground",
        "diffInsertForeground",
        "diffDeleteForeground",
        "diffCrossForeground"
    ], sk = (e) => Object.keys(e).map((t) => {
        const n = gg(t);
        return `--${n}: var(--erd-editor-${n}, ${Reflect.get(e, t)});`;
    }).join(`
`), dk = (e) => () => I`
    <style>
    @import "./js/plugins/erd-editor/custom.css";
      :host {
        ${sk(e.theme)}
      }
    </style>
  `, uk = {
        gray1: "#111111",
        gray2: "#191919",
        gray3: "#222222",
        gray4: "#2a2a2a",
        gray5: "#313131",
        gray6: "#3a3a3a",
        gray7: "#484848",
        gray8: "#606060",
        gray9: "#6e6e6e",
        gray10: "#7b7b7b",
        gray11: "#b4b4b4",
        gray12: "#eeeeee"
    }, mk = {
        grayA1: "#00000000",
        grayA2: "#ffffff09",
        grayA3: "#ffffff12",
        grayA4: "#ffffff1b",
        grayA5: "#ffffff22",
        grayA6: "#ffffff2c",
        grayA7: "#ffffff3b",
        grayA8: "#ffffff55",
        grayA9: "#ffffff64",
        grayA10: "#ffffff72",
        grayA11: "#ffffffaf",
        grayA12: "#ffffffed"
    }, hk = {
        mauve1: "#121113",
        mauve2: "#1a191b",
        mauve3: "#232225",
        mauve4: "#2b292d",
        mauve5: "#323035",
        mauve6: "#3c393f",
        mauve7: "#49474e",
        mauve8: "#625f69",
        mauve9: "#6f6d78",
        mauve10: "#7c7a85",
        mauve11: "#b5b2bc",
        mauve12: "#eeeef0"
    }, pk = {
        mauveA1: "#00000000",
        mauveA2: "#f5f4f609",
        mauveA3: "#ebeaf814",
        mauveA4: "#eee5f81d",
        mauveA5: "#efe6fe25",
        mauveA6: "#f1e6fd30",
        mauveA7: "#eee9ff40",
        mauveA8: "#eee7ff5d",
        mauveA9: "#eae6fd6e",
        mauveA10: "#ece9fd7c",
        mauveA11: "#f5f1ffb7",
        mauveA12: "#fdfdffef"
    }, bk = {
        slate1: "#111113",
        slate2: "#18191b",
        slate3: "#212225",
        slate4: "#272a2d",
        slate5: "#2e3135",
        slate6: "#363a3f",
        slate7: "#43484e",
        slate8: "#5a6169",
        slate9: "#696e77",
        slate10: "#777b84",
        slate11: "#b0b4ba",
        slate12: "#edeef0"
    }, fk = {
        slateA1: "#00000000",
        slateA2: "#d8f4f609",
        slateA3: "#ddeaf814",
        slateA4: "#d3edf81d",
        slateA5: "#d9edfe25",
        slateA6: "#d6ebfd30",
        slateA7: "#d9edff40",
        slateA8: "#d9edff5d",
        slateA9: "#dfebfd6d",
        slateA10: "#e5edfd7b",
        slateA11: "#f1f7feb5",
        slateA12: "#fcfdffef"
    }, gk = {
        sage1: "#101211",
        sage2: "#171918",
        sage3: "#202221",
        sage4: "#272a29",
        sage5: "#2e3130",
        sage6: "#373b39",
        sage7: "#444947",
        sage8: "#5b625f",
        sage9: "#63706b",
        sage10: "#717d79",
        sage11: "#adb5b2",
        sage12: "#eceeed"
    }, yk = {
        sageA1: "#00000000",
        sageA2: "#f0f2f108",
        sageA3: "#f3f5f412",
        sageA4: "#f2fefd1a",
        sageA5: "#f1fbfa22",
        sageA6: "#edfbf42d",
        sageA7: "#edfcf73c",
        sageA8: "#ebfdf657",
        sageA9: "#dffdf266",
        sageA10: "#e5fdf674",
        sageA11: "#f4fefbb0",
        sageA12: "#fdfffeed"
    }, Zk = {
        olive1: "#111210",
        olive2: "#181917",
        olive3: "#212220",
        olive4: "#282a27",
        olive5: "#2f312e",
        olive6: "#383a36",
        olive7: "#454843",
        olive8: "#5c625b",
        olive9: "#687066",
        olive10: "#767d74",
        olive11: "#afb5ad",
        olive12: "#eceeec"
    }, vk = {
        oliveA1: "#00000000",
        oliveA2: "#f1f2f008",
        oliveA3: "#f4f5f312",
        oliveA4: "#f3fef21a",
        oliveA5: "#f2fbf122",
        oliveA6: "#f4faed2c",
        oliveA7: "#f2fced3b",
        oliveA8: "#edfdeb57",
        oliveA9: "#ebfde766",
        oliveA10: "#f0fdec74",
        oliveA11: "#f6fef4b0",
        oliveA12: "#fdfffded"
    }, xk = {
        sand1: "#111110",
        sand2: "#191918",
        sand3: "#222221",
        sand4: "#2a2a28",
        sand5: "#31312e",
        sand6: "#3b3a37",
        sand7: "#494844",
        sand8: "#62605b",
        sand9: "#6f6d66",
        sand10: "#7c7b74",
        sand11: "#b5b3ad",
        sand12: "#eeeeec"
    }, Gk = {
        sandA1: "#00000000",
        sandA2: "#f4f4f309",
        sandA3: "#f6f6f513",
        sandA4: "#fefef31b",
        sandA5: "#fbfbeb23",
        sandA6: "#fffaed2d",
        sandA7: "#fffbed3c",
        sandA8: "#fff9eb57",
        sandA9: "#fffae965",
        sandA10: "#fffdee73",
        sandA11: "#fffcf4b0",
        sandA12: "#fffffded"
    }, Xk = {
        tomato1: "#181111",
        tomato2: "#1f1513",
        tomato3: "#391714",
        tomato4: "#4e1511",
        tomato5: "#5e1c16",
        tomato6: "#6e2920",
        tomato7: "#853a2d",
        tomato8: "#ac4d39",
        tomato9: "#e54d2e",
        tomato10: "#ec6142",
        tomato11: "#ff977d",
        tomato12: "#fbd3cb"
    }, Wk = {
        tomatoA1: "#f1121208",
        tomatoA2: "#ff55330f",
        tomatoA3: "#ff35232b",
        tomatoA4: "#fd201142",
        tomatoA5: "#fe332153",
        tomatoA6: "#ff4f3864",
        tomatoA7: "#fd644a7d",
        tomatoA8: "#fe6d4ea7",
        tomatoA9: "#fe5431e4",
        tomatoA10: "#ff6847eb",
        tomatoA11: "#ff977d",
        tomatoA12: "#ffd6cefb"
    }, Vk = {
        red1: "#191111",
        red2: "#201314",
        red3: "#3b1219",
        red4: "#500f1c",
        red5: "#611623",
        red6: "#72232d",
        red7: "#8c333a",
        red8: "#b54548",
        red9: "#e5484d",
        red10: "#ec5d5e",
        red11: "#ff9592",
        red12: "#ffd1d9"
    }, Ik = {
        redA1: "#f4121209",
        redA2: "#f22f3e11",
        redA3: "#ff173f2d",
        redA4: "#fe0a3b44",
        redA5: "#ff204756",
        redA6: "#ff3e5668",
        redA7: "#ff536184",
        redA8: "#ff5d61b0",
        redA9: "#fe4e54e4",
        redA10: "#ff6465eb",
        redA11: "#ff9592",
        redA12: "#ffd1d9"
    }, kk = {
        ruby1: "#191113",
        ruby2: "#1e1517",
        ruby3: "#3a141e",
        ruby4: "#4e1325",
        ruby5: "#5e1a2e",
        ruby6: "#6f2539",
        ruby7: "#883447",
        ruby8: "#b3445a",
        ruby9: "#e54666",
        ruby10: "#ec5a72",
        ruby11: "#ff949d",
        ruby12: "#fed2e1"
    }, Ck = {
        rubyA1: "#f4124a09",
        rubyA2: "#fe5a7f0e",
        rubyA3: "#ff235d2c",
        rubyA4: "#fd195e42",
        rubyA5: "#fe2d6b53",
        rubyA6: "#ff447665",
        rubyA7: "#ff577d80",
        rubyA8: "#ff5c7cae",
        rubyA9: "#fe4c70e4",
        rubyA10: "#ff617beb",
        rubyA11: "#ff949d",
        rubyA12: "#ffd3e2fe"
    }, Sk = {
        crimson1: "#191114",
        crimson2: "#201318",
        crimson3: "#381525",
        crimson4: "#4d122f",
        crimson5: "#5c1839",
        crimson6: "#6d2545",
        crimson7: "#873356",
        crimson8: "#b0436e",
        crimson9: "#e93d82",
        crimson10: "#ee518a",
        crimson11: "#ff92ad",
        crimson12: "#fdd3e8"
    }, Rk = {
        crimsonA1: "#f4126709",
        crimsonA2: "#f22f7a11",
        crimsonA3: "#fe2a8b2a",
        crimsonA4: "#fd158741",
        crimsonA5: "#fd278f51",
        crimsonA6: "#fe459763",
        crimsonA7: "#fd559b7f",
        crimsonA8: "#fe5b9bab",
        crimsonA9: "#fe418de8",
        crimsonA10: "#ff5693ed",
        crimsonA11: "#ff92ad",
        crimsonA12: "#ffd5eafd"
    }, Lk = {
        pink1: "#191117",
        pink2: "#21121d",
        pink3: "#37172f",
        pink4: "#4b143d",
        pink5: "#591c47",
        pink6: "#692955",
        pink7: "#833869",
        pink8: "#a84885",
        pink9: "#d6409f",
        pink10: "#de51a8",
        pink11: "#ff8dcc",
        pink12: "#fdd1ea"
    }, Yk = {
        pinkA1: "#f412bc09",
        pinkA2: "#f420bb12",
        pinkA3: "#fe37cc29",
        pinkA4: "#fc1ec43f",
        pinkA5: "#fd35c24e",
        pinkA6: "#fd51c75f",
        pinkA7: "#fd62c87b",
        pinkA8: "#ff68c8a2",
        pinkA9: "#fe49bcd4",
        pinkA10: "#ff5cc0dc",
        pinkA11: "#ff8dcc",
        pinkA12: "#ffd3ecfd"
    }, Kk = {
        plum1: "#181118",
        plum2: "#201320",
        plum3: "#351a35",
        plum4: "#451d47",
        plum5: "#512454",
        plum6: "#5e3061",
        plum7: "#734079",
        plum8: "#92549c",
        plum9: "#ab4aba",
        plum10: "#b658c4",
        plum11: "#e796f3",
        plum12: "#f4d4f4"
    }, Tk = {
        plumA1: "#f112f108",
        plumA2: "#f22ff211",
        plumA3: "#fd4cfd27",
        plumA4: "#f646ff3a",
        plumA5: "#f455ff48",
        plumA6: "#f66dff56",
        plumA7: "#f07cfd70",
        plumA8: "#ee84ff95",
        plumA9: "#e961feb6",
        plumA10: "#ed70ffc0",
        plumA11: "#f19cfef3",
        plumA12: "#feddfef4"
    }, Hk = {
        purple1: "#18111b",
        purple2: "#1e1523",
        purple3: "#301c3b",
        purple4: "#3d224e",
        purple5: "#48295c",
        purple6: "#54346b",
        purple7: "#664282",
        purple8: "#8457aa",
        purple9: "#8e4ec6",
        purple10: "#9a5cd0",
        purple11: "#d19dff",
        purple12: "#ecd9fa"
    }, Nk = {
        purpleA1: "#b412f90b",
        purpleA2: "#b744f714",
        purpleA3: "#c150ff2d",
        purpleA4: "#bb53fd42",
        purpleA5: "#be5cfd51",
        purpleA6: "#c16dfd61",
        purpleA7: "#c378fd7a",
        purpleA8: "#c47effa4",
        purpleA9: "#b661ffc2",
        purpleA10: "#bc6fffcd",
        purpleA11: "#d19dff",
        purpleA12: "#f1ddfffa"
    }, zk = {
        violet1: "#14121f",
        violet2: "#1b1525",
        violet3: "#291f43",
        violet4: "#33255b",
        violet5: "#3c2e69",
        violet6: "#473876",
        violet7: "#56468b",
        violet8: "#6958ad",
        violet9: "#6e56cf",
        violet10: "#7d66d9",
        violet11: "#baa7ff",
        violet12: "#e2ddfe"
    }, wk = {
        violetA1: "#4422ff0f",
        violetA2: "#853ff916",
        violetA3: "#8354fe36",
        violetA4: "#7d51fd50",
        violetA5: "#845ffd5f",
        violetA6: "#8f6cfd6d",
        violetA7: "#9879ff83",
        violetA8: "#977dfea8",
        violetA9: "#8668ffcc",
        violetA10: "#9176fed7",
        violetA11: "#baa7ff",
        violetA12: "#e3defffe"
    }, Jk = {
        iris1: "#13131e",
        iris2: "#171625",
        iris3: "#202248",
        iris4: "#262a65",
        iris5: "#303374",
        iris6: "#3d3e82",
        iris7: "#4a4a95",
        iris8: "#5958b1",
        iris9: "#5b5bd6",
        iris10: "#6e6ade",
        iris11: "#b1a9ff",
        iris12: "#e0dffe"
    }, Mk = {
        irisA1: "#3636fe0e",
        irisA2: "#564bf916",
        irisA3: "#525bff3b",
        irisA4: "#4d58ff5a",
        irisA5: "#5b62fd6b",
        irisA6: "#6d6ffd7a",
        irisA7: "#7777fe8e",
        irisA8: "#7b7afeac",
        irisA9: "#6a6afed4",
        irisA10: "#7d79ffdc",
        irisA11: "#b1a9ff",
        irisA12: "#e1e0fffe"
    }, Fk = {
        indigo1: "#11131f",
        indigo2: "#141726",
        indigo3: "#182449",
        indigo4: "#1d2e62",
        indigo5: "#253974",
        indigo6: "#304384",
        indigo7: "#3a4f97",
        indigo8: "#435db1",
        indigo9: "#3e63dd",
        indigo10: "#5472e4",
        indigo11: "#9eb1ff",
        indigo12: "#d6e1ff"
    }, $k = {
        indigoA1: "#1133ff0f",
        indigoA2: "#3354fa17",
        indigoA3: "#2f62ff3c",
        indigoA4: "#3566ff57",
        indigoA5: "#4171fd6b",
        indigoA6: "#5178fd7c",
        indigoA7: "#5a7fff90",
        indigoA8: "#5b81feac",
        indigoA9: "#4671ffdb",
        indigoA10: "#5c7efee3",
        indigoA11: "#9eb1ff",
        indigoA12: "#d6e1ff"
    }, Uk = {
        blue1: "#0d1520",
        blue2: "#111927",
        blue3: "#0d2847",
        blue4: "#003362",
        blue5: "#004074",
        blue6: "#104d87",
        blue7: "#205d9e",
        blue8: "#2870bd",
        blue9: "#0090ff",
        blue10: "#3b9eff",
        blue11: "#70b8ff",
        blue12: "#c2e6ff"
    }, jk = {
        blueA1: "#004df211",
        blueA2: "#1166fb18",
        blueA3: "#0077ff3a",
        blueA4: "#0075ff57",
        blueA5: "#0081fd6b",
        blueA6: "#0f89fd7f",
        blueA7: "#2a91fe98",
        blueA8: "#3094feb9",
        blueA9: "#0090ff",
        blueA10: "#3b9eff",
        blueA11: "#70b8ff",
        blueA12: "#c2e6ff"
    }, Ek = {
        cyan1: "#0b161a",
        cyan2: "#101b20",
        cyan3: "#082c36",
        cyan4: "#003848",
        cyan5: "#004558",
        cyan6: "#045468",
        cyan7: "#12677e",
        cyan8: "#11809c",
        cyan9: "#00a2c7",
        cyan10: "#23afd0",
        cyan11: "#4ccce6",
        cyan12: "#b6ecf7"
    }, Pk = {
        cyanA1: "#0091f70a",
        cyanA2: "#02a7f211",
        cyanA3: "#00befd28",
        cyanA4: "#00baff3b",
        cyanA5: "#00befd4d",
        cyanA6: "#00c7fd5e",
        cyanA7: "#14cdff75",
        cyanA8: "#11cfff95",
        cyanA9: "#00cfffc3",
        cyanA10: "#28d6ffcd",
        cyanA11: "#52e1fee5",
        cyanA12: "#bbf3fef7"
    }, Bk = {
        teal1: "#0d1514",
        teal2: "#111c1b",
        teal3: "#0d2d2a",
        teal4: "#023b37",
        teal5: "#084843",
        teal6: "#145750",
        teal7: "#1c6961",
        teal8: "#207e73",
        teal9: "#12a594",
        teal10: "#0eb39e",
        teal11: "#0bd8b6",
        teal12: "#adf0dd"
    }, Ok = {
        tealA1: "#00deab05",
        tealA2: "#12fbe60c",
        tealA3: "#00ffe61e",
        tealA4: "#00ffe92d",
        tealA5: "#00ffea3b",
        tealA6: "#1cffe84b",
        tealA7: "#2efde85f",
        tealA8: "#32ffe775",
        tealA9: "#13ffe49f",
        tealA10: "#0dffe0ae",
        tealA11: "#0afed5d6",
        tealA12: "#b8ffebef"
    }, Ak = {
        jade1: "#0d1512",
        jade2: "#121c18",
        jade3: "#0f2e22",
        jade4: "#0b3b2c",
        jade5: "#114837",
        jade6: "#1b5745",
        jade7: "#246854",
        jade8: "#2a7e68",
        jade9: "#29a383",
        jade10: "#27b08b",
        jade11: "#1fd8a4",
        jade12: "#adf0d4"
    }, Qk = {
        jadeA1: "#00de4505",
        jadeA2: "#27fba60c",
        jadeA3: "#02f99920",
        jadeA4: "#00ffaa2d",
        jadeA5: "#11ffb63b",
        jadeA6: "#34ffc24b",
        jadeA7: "#45fdc75e",
        jadeA8: "#48ffcf75",
        jadeA9: "#38feca9d",
        jadeA10: "#31fec7ab",
        jadeA11: "#21fec0d6",
        jadeA12: "#b8ffe1ef"
    }, Dk = {
        green1: "#0e1512",
        green2: "#121b17",
        green3: "#132d21",
        green4: "#113b29",
        green5: "#174933",
        green6: "#20573e",
        green7: "#28684a",
        green8: "#2f7c57",
        green9: "#30a46c",
        green10: "#33b074",
        green11: "#3dd68c",
        green12: "#b1f1cb"
    }, _k = {
        greenA1: "#00de4505",
        greenA2: "#29f99d0b",
        greenA3: "#22ff991e",
        greenA4: "#11ff992d",
        greenA5: "#2bffa23c",
        greenA6: "#44ffaa4b",
        greenA7: "#50fdac5e",
        greenA8: "#54ffad73",
        greenA9: "#44ffa49e",
        greenA10: "#43fea4ab",
        greenA11: "#46fea5d4",
        greenA12: "#bbffd7f0"
    }, qk = {
        grass1: "#0e1511",
        grass2: "#141a15",
        grass3: "#1b2a1e",
        grass4: "#1d3a24",
        grass5: "#25482d",
        grass6: "#2d5736",
        grass7: "#366740",
        grass8: "#3e7949",
        grass9: "#46a758",
        grass10: "#53b365",
        grass11: "#71d083",
        grass12: "#c2f0c2"
    }, e3 = {
        grassA1: "#00de1205",
        grassA2: "#5ef7780a",
        grassA3: "#70fe8c1b",
        grassA4: "#57ff802c",
        grassA5: "#68ff8b3b",
        grassA6: "#71ff8f4b",
        grassA7: "#77fd925d",
        grassA8: "#77fd9070",
        grassA9: "#65ff82a1",
        grassA10: "#72ff8dae",
        grassA11: "#89ff9fcd",
        grassA12: "#ceffceef"
    }, t3 = {
        brown1: "#12110f",
        brown2: "#1c1816",
        brown3: "#28211d",
        brown4: "#322922",
        brown5: "#3e3128",
        brown6: "#4d3c2f",
        brown7: "#614a39",
        brown8: "#7c5f46",
        brown9: "#ad7f58",
        brown10: "#b88c67",
        brown11: "#dbb594",
        brown12: "#f2e1ca"
    }, n3 = {
        brownA1: "#91110002",
        brownA2: "#fba67c0c",
        brownA3: "#fcb58c19",
        brownA4: "#fbbb8a24",
        brownA5: "#fcb88931",
        brownA6: "#fdba8741",
        brownA7: "#ffbb8856",
        brownA8: "#ffbe8773",
        brownA9: "#feb87da8",
        brownA10: "#ffc18cb3",
        brownA11: "#fed1aad9",
        brownA12: "#feecd4f2"
    }, i3 = {
        bronze1: "#141110",
        bronze2: "#1c1917",
        bronze3: "#262220",
        bronze4: "#302a27",
        bronze5: "#3b3330",
        bronze6: "#493e3a",
        bronze7: "#5a4c47",
        bronze8: "#6f5f58",
        bronze9: "#a18072",
        bronze10: "#ae8c7e",
        bronze11: "#d4b3a5",
        bronze12: "#ede0d9"
    }, o3 = {
        bronzeA1: "#d1110004",
        bronzeA2: "#fbbc910c",
        bronzeA3: "#faceb817",
        bronzeA4: "#facdb622",
        bronzeA5: "#ffd2c12d",
        bronzeA6: "#ffd1c03c",
        bronzeA7: "#fdd0c04f",
        bronzeA8: "#ffd6c565",
        bronzeA9: "#fec7b09b",
        bronzeA10: "#fecab5a9",
        bronzeA11: "#ffd7c6d1",
        bronzeA12: "#fff1e9ec"
    }, a3 = {
        gold1: "#121211",
        gold2: "#1b1a17",
        gold3: "#24231f",
        gold4: "#2d2b26",
        gold5: "#38352e",
        gold6: "#444039",
        gold7: "#544f46",
        gold8: "#696256",
        gold9: "#978365",
        gold10: "#a39073",
        gold11: "#cbb99f",
        gold12: "#e8e2d9"
    }, l3 = {
        goldA1: "#91911102",
        goldA2: "#f9e29d0b",
        goldA3: "#f8ecbb15",
        goldA4: "#ffeec41e",
        goldA5: "#feecc22a",
        goldA6: "#feebcb37",
        goldA7: "#ffedcd48",
        goldA8: "#fdeaca5f",
        goldA9: "#ffdba690",
        goldA10: "#fedfb09d",
        goldA11: "#fee7c6c8",
        goldA12: "#fef7ede7"
    }, r3 = {
        sky1: "#0d141f",
        sky2: "#111a27",
        sky3: "#112840",
        sky4: "#113555",
        sky5: "#154467",
        sky6: "#1b537b",
        sky7: "#1f6692",
        sky8: "#197cae",
        sky9: "#7ce2fe",
        sky10: "#a8eeff",
        sky11: "#75c7f0",
        sky12: "#c2f3ff"
    }, c3 = {
        skyA1: "#0044ff0f",
        skyA2: "#1171fb18",
        skyA3: "#1184fc33",
        skyA4: "#128fff49",
        skyA5: "#1c9dfd5d",
        skyA6: "#28a5ff72",
        skyA7: "#2badfe8b",
        skyA8: "#1db2fea9",
        skyA9: "#7ce3fffe",
        skyA10: "#a8eeff",
        skyA11: "#7cd3ffef",
        skyA12: "#c2f3ff"
    }, s3 = {
        mint1: "#0e1515",
        mint2: "#0f1b1b",
        mint3: "#092c2b",
        mint4: "#003a38",
        mint5: "#004744",
        mint6: "#105650",
        mint7: "#1e685f",
        mint8: "#277f70",
        mint9: "#86ead4",
        mint10: "#a8f5e5",
        mint11: "#58d5ba",
        mint12: "#c4f5e1"
    }, d3 = {
        mintA1: "#00dede05",
        mintA2: "#00f9f90b",
        mintA3: "#00fff61d",
        mintA4: "#00fff42c",
        mintA5: "#00fff23a",
        mintA6: "#0effeb4a",
        mintA7: "#34fde55e",
        mintA8: "#41ffdf76",
        mintA9: "#92ffe7e9",
        mintA10: "#aefeedf5",
        mintA11: "#67ffded2",
        mintA12: "#cbfee9f5"
    }, u3 = {
        lime1: "#11130c",
        lime2: "#151a10",
        lime3: "#1f2917",
        lime4: "#29371d",
        lime5: "#334423",
        lime6: "#3d522a",
        lime7: "#496231",
        lime8: "#577538",
        lime9: "#bdee63",
        lime10: "#d4ff70",
        lime11: "#bde56c",
        lime12: "#e3f7ba"
    }, m3 = {
        limeA1: "#11bb0003",
        limeA2: "#78f7000a",
        limeA3: "#9bfd4c1a",
        limeA4: "#a7fe5c29",
        limeA5: "#affe6537",
        limeA6: "#b2fe6d46",
        limeA7: "#b6ff6f57",
        limeA8: "#b6fd6d6c",
        limeA9: "#caff69ed",
        limeA10: "#d4ff70",
        limeA11: "#d1fe77e4",
        limeA12: "#e9febff7"
    }, h3 = {
        yellow1: "#14120b",
        yellow2: "#1b180f",
        yellow3: "#2d2305",
        yellow4: "#362b00",
        yellow5: "#433500",
        yellow6: "#524202",
        yellow7: "#665417",
        yellow8: "#836a21",
        yellow9: "#ffe629",
        yellow10: "#ffff57",
        yellow11: "#f5e147",
        yellow12: "#f6eeb4"
    }, p3 = {
        yellowA1: "#d1510004",
        yellowA2: "#f9b4000b",
        yellowA3: "#ffaa001e",
        yellowA4: "#fdb70028",
        yellowA5: "#febb0036",
        yellowA6: "#fec40046",
        yellowA7: "#fdcb225c",
        yellowA8: "#fdca327b",
        yellowA9: "#ffe629",
        yellowA10: "#ffff57",
        yellowA11: "#fee949f5",
        yellowA12: "#fef6baf6"
    }, b3 = {
        amber1: "#16120c",
        amber2: "#1d180f",
        amber3: "#302008",
        amber4: "#3f2700",
        amber5: "#4d3000",
        amber6: "#5c3d05",
        amber7: "#714f19",
        amber8: "#8f6424",
        amber9: "#ffc53d",
        amber10: "#ffd60a",
        amber11: "#ffca16",
        amber12: "#ffe7b3"
    }, f3 = {
        amberA1: "#e63c0006",
        amberA2: "#fd9b000d",
        amberA3: "#fa820022",
        amberA4: "#fc820032",
        amberA5: "#fd8b0041",
        amberA6: "#fd9b0051",
        amberA7: "#ffab2567",
        amberA8: "#ffae3587",
        amberA9: "#ffc53d",
        amberA10: "#ffd60a",
        amberA11: "#ffca16",
        amberA12: "#ffe7b3"
    }, g3 = {
        orange1: "#17120e",
        orange2: "#1e160f",
        orange3: "#331e0b",
        orange4: "#462100",
        orange5: "#562800",
        orange6: "#66350c",
        orange7: "#7e451d",
        orange8: "#a35829",
        orange9: "#f76b15",
        orange10: "#ff801f",
        orange11: "#ffa057",
        orange12: "#ffe0c2"
    }, y3 = {
        orangeA1: "#ec360007",
        orangeA2: "#fe6d000e",
        orangeA3: "#fb6a0025",
        orangeA4: "#ff590039",
        orangeA5: "#ff61004a",
        orangeA6: "#fd75045c",
        orangeA7: "#ff832c75",
        orangeA8: "#fe84389d",
        orangeA9: "#fe6d15f7",
        orangeA10: "#ff801f",
        orangeA11: "#ffa057",
        orangeA12: "#ffe0c2"
    }, Z3 = {
        gray1: "#fcfcfc",
        gray2: "#f9f9f9",
        gray3: "#f0f0f0",
        gray4: "#e8e8e8",
        gray5: "#e0e0e0",
        gray6: "#d9d9d9",
        gray7: "#cecece",
        gray8: "#bbbbbb",
        gray9: "#8d8d8d",
        gray10: "#838383",
        gray11: "#646464",
        gray12: "#202020"
    }, v3 = {
        grayA1: "#00000003",
        grayA2: "#00000006",
        grayA3: "#0000000f",
        grayA4: "#00000017",
        grayA5: "#0000001f",
        grayA6: "#00000026",
        grayA7: "#00000031",
        grayA8: "#00000044",
        grayA9: "#00000072",
        grayA10: "#0000007c",
        grayA11: "#0000009b",
        grayA12: "#000000df"
    }, x3 = {
        mauve1: "#fdfcfd",
        mauve2: "#faf9fb",
        mauve3: "#f2eff3",
        mauve4: "#eae7ec",
        mauve5: "#e3dfe6",
        mauve6: "#dbd8e0",
        mauve7: "#d0cdd7",
        mauve8: "#bcbac7",
        mauve9: "#8e8c99",
        mauve10: "#84828e",
        mauve11: "#65636d",
        mauve12: "#211f26"
    }, G3 = {
        mauveA1: "#55005503",
        mauveA2: "#2b005506",
        mauveA3: "#30004010",
        mauveA4: "#20003618",
        mauveA5: "#20003820",
        mauveA6: "#14003527",
        mauveA7: "#10003332",
        mauveA8: "#08003145",
        mauveA9: "#05001d73",
        mauveA10: "#0500197d",
        mauveA11: "#0400119c",
        mauveA12: "#020008e0"
    }, X3 = {
        slate1: "#fcfcfd",
        slate2: "#f9f9fb",
        slate3: "#f0f0f3",
        slate4: "#e8e8ec",
        slate5: "#e0e1e6",
        slate6: "#d9d9e0",
        slate7: "#cdced6",
        slate8: "#b9bbc6",
        slate9: "#8b8d98",
        slate10: "#80838d",
        slate11: "#60646c",
        slate12: "#1c2024"
    }, W3 = {
        slateA1: "#00005503",
        slateA2: "#00005506",
        slateA3: "#0000330f",
        slateA4: "#00002d17",
        slateA5: "#0009321f",
        slateA6: "#00002f26",
        slateA7: "#00062e32",
        slateA8: "#00083046",
        slateA9: "#00051d74",
        slateA10: "#00071b7f",
        slateA11: "#0007149f",
        slateA12: "#000509e3"
    }, V3 = {
        sage1: "#fbfdfc",
        sage2: "#f7f9f8",
        sage3: "#eef1f0",
        sage4: "#e6e9e8",
        sage5: "#dfe2e0",
        sage6: "#d7dad9",
        sage7: "#cbcfcd",
        sage8: "#b8bcba",
        sage9: "#868e8b",
        sage10: "#7c8481",
        sage11: "#5f6563",
        sage12: "#1a211e"
    }, I3 = {
        sageA1: "#00804004",
        sageA2: "#00402008",
        sageA3: "#002d1e11",
        sageA4: "#001f1519",
        sageA5: "#00180820",
        sageA6: "#00140d28",
        sageA7: "#00140a34",
        sageA8: "#000f0847",
        sageA9: "#00110b79",
        sageA10: "#00100a83",
        sageA11: "#000a07a0",
        sageA12: "#000805e5"
    }, k3 = {
        olive1: "#fcfdfc",
        olive2: "#f8faf8",
        olive3: "#eff1ef",
        olive4: "#e7e9e7",
        olive5: "#dfe2df",
        olive6: "#d7dad7",
        olive7: "#cccfcc",
        olive8: "#b9bcb8",
        olive9: "#898e87",
        olive10: "#7f847d",
        olive11: "#60655f",
        olive12: "#1d211c"
    }, C3 = {
        oliveA1: "#00550003",
        oliveA2: "#00490007",
        oliveA3: "#00200010",
        oliveA4: "#00160018",
        oliveA5: "#00180020",
        oliveA6: "#00140028",
        oliveA7: "#000f0033",
        oliveA8: "#040f0047",
        oliveA9: "#050f0078",
        oliveA10: "#040e0082",
        oliveA11: "#020a00a0",
        oliveA12: "#010600e3"
    }, S3 = {
        sand1: "#fdfdfc",
        sand2: "#f9f9f8",
        sand3: "#f1f0ef",
        sand4: "#e9e8e6",
        sand5: "#e2e1de",
        sand6: "#dad9d6",
        sand7: "#cfceca",
        sand8: "#bcbbb5",
        sand9: "#8d8d86",
        sand10: "#82827c",
        sand11: "#63635e",
        sand12: "#21201c"
    }, R3 = {
        sandA1: "#55550003",
        sandA2: "#25250007",
        sandA3: "#20100010",
        sandA4: "#1f150019",
        sandA5: "#1f180021",
        sandA6: "#19130029",
        sandA7: "#19140035",
        sandA8: "#1915014a",
        sandA9: "#0f0f0079",
        sandA10: "#0c0c0083",
        sandA11: "#080800a1",
        sandA12: "#060500e3"
    }, L3 = {
        tomato1: "#fffcfc",
        tomato2: "#fff8f7",
        tomato3: "#feebe7",
        tomato4: "#ffdcd3",
        tomato5: "#ffcdc2",
        tomato6: "#fdbdaf",
        tomato7: "#f5a898",
        tomato8: "#ec8e7b",
        tomato9: "#e54d2e",
        tomato10: "#dd4425",
        tomato11: "#d13415",
        tomato12: "#5c271f"
    }, Y3 = {
        tomatoA1: "#ff000003",
        tomatoA2: "#ff200008",
        tomatoA3: "#f52b0018",
        tomatoA4: "#ff35002c",
        tomatoA5: "#ff2e003d",
        tomatoA6: "#f92d0050",
        tomatoA7: "#e7280067",
        tomatoA8: "#db250084",
        tomatoA9: "#df2600d1",
        tomatoA10: "#d72400da",
        tomatoA11: "#cd2200ea",
        tomatoA12: "#460900e0"
    }, K3 = {
        red1: "#fffcfc",
        red2: "#fff7f7",
        red3: "#feebec",
        red4: "#ffdbdc",
        red5: "#ffcdce",
        red6: "#fdbdbe",
        red7: "#f4a9aa",
        red8: "#eb8e90",
        red9: "#e5484d",
        red10: "#dc3e42",
        red11: "#ce2c31",
        red12: "#641723"
    }, T3 = {
        redA1: "#ff000003",
        redA2: "#ff000008",
        redA3: "#f3000d14",
        redA4: "#ff000824",
        redA5: "#ff000632",
        redA6: "#f8000442",
        redA7: "#df000356",
        redA8: "#d2000571",
        redA9: "#db0007b7",
        redA10: "#d10005c1",
        redA11: "#c40006d3",
        redA12: "#55000de8"
    }, H3 = {
        ruby1: "#fffcfd",
        ruby2: "#fff7f8",
        ruby3: "#feeaed",
        ruby4: "#ffdce1",
        ruby5: "#ffced6",
        ruby6: "#f8bfc8",
        ruby7: "#efacb8",
        ruby8: "#e592a3",
        ruby9: "#e54666",
        ruby10: "#dc3b5d",
        ruby11: "#ca244d",
        ruby12: "#64172b"
    }, N3 = {
        rubyA1: "#ff005503",
        rubyA2: "#ff002008",
        rubyA3: "#f3002515",
        rubyA4: "#ff002523",
        rubyA5: "#ff002a31",
        rubyA6: "#e4002440",
        rubyA7: "#ce002553",
        rubyA8: "#c300286d",
        rubyA9: "#db002cb9",
        rubyA10: "#d2002cc4",
        rubyA11: "#c10030db",
        rubyA12: "#550016e8"
    }, z3 = {
        crimson1: "#fffcfd",
        crimson2: "#fef7f9",
        crimson3: "#ffe9f0",
        crimson4: "#fedce7",
        crimson5: "#facedd",
        crimson6: "#f3bed1",
        crimson7: "#eaacc3",
        crimson8: "#e093b2",
        crimson9: "#e93d82",
        crimson10: "#df3478",
        crimson11: "#cb1d63",
        crimson12: "#621639"
    }, w3 = {
        crimsonA1: "#ff005503",
        crimsonA2: "#e0004008",
        crimsonA3: "#ff005216",
        crimsonA4: "#f8005123",
        crimsonA5: "#e5004f31",
        crimsonA6: "#d0004b41",
        crimsonA7: "#bf004753",
        crimsonA8: "#b6004a6c",
        crimsonA9: "#e2005bc2",
        crimsonA10: "#d70056cb",
        crimsonA11: "#c4004fe2",
        crimsonA12: "#530026e9"
    }, J3 = {
        pink1: "#fffcfe",
        pink2: "#fef7fb",
        pink3: "#fee9f5",
        pink4: "#fbdcef",
        pink5: "#f6cee7",
        pink6: "#efbfdd",
        pink7: "#e7acd0",
        pink8: "#dd93c2",
        pink9: "#d6409f",
        pink10: "#cf3897",
        pink11: "#c2298a",
        pink12: "#651249"
    }, M3 = {
        pinkA1: "#ff00aa03",
        pinkA2: "#e0008008",
        pinkA3: "#f4008c16",
        pinkA4: "#e2008b23",
        pinkA5: "#d1008331",
        pinkA6: "#c0007840",
        pinkA7: "#b6006f53",
        pinkA8: "#af006f6c",
        pinkA9: "#c8007fbf",
        pinkA10: "#c2007ac7",
        pinkA11: "#b60074d6",
        pinkA12: "#59003bed"
    }, F3 = {
        plum1: "#fefcff",
        plum2: "#fdf7fd",
        plum3: "#fbebfb",
        plum4: "#f7def8",
        plum5: "#f2d1f3",
        plum6: "#e9c2ec",
        plum7: "#deade3",
        plum8: "#cf91d8",
        plum9: "#ab4aba",
        plum10: "#a144af",
        plum11: "#953ea3",
        plum12: "#53195d"
    }, $3 = {
        plumA1: "#aa00ff03",
        plumA2: "#c000c008",
        plumA3: "#cc00cc14",
        plumA4: "#c200c921",
        plumA5: "#b700bd2e",
        plumA6: "#a400b03d",
        plumA7: "#9900a852",
        plumA8: "#9000a56e",
        plumA9: "#89009eb5",
        plumA10: "#7f0092bb",
        plumA11: "#730086c1",
        plumA12: "#40004be6"
    }, U3 = {
        purple1: "#fefcfe",
        purple2: "#fbf7fe",
        purple3: "#f7edfe",
        purple4: "#f2e2fc",
        purple5: "#ead5f9",
        purple6: "#e0c4f4",
        purple7: "#d1afec",
        purple8: "#be93e4",
        purple9: "#8e4ec6",
        purple10: "#8347b9",
        purple11: "#8145b5",
        purple12: "#402060"
    }, j3 = {
        purpleA1: "#aa00aa03",
        purpleA2: "#8000e008",
        purpleA3: "#8e00f112",
        purpleA4: "#8d00e51d",
        purpleA5: "#8000db2a",
        purpleA6: "#7a01d03b",
        purpleA7: "#6d00c350",
        purpleA8: "#6600c06c",
        purpleA9: "#5c00adb1",
        purpleA10: "#53009eb8",
        purpleA11: "#52009aba",
        purpleA12: "#250049df"
    }, E3 = {
        violet1: "#fdfcfe",
        violet2: "#faf8ff",
        violet3: "#f4f0fe",
        violet4: "#ebe4ff",
        violet5: "#e1d9ff",
        violet6: "#d4cafe",
        violet7: "#c2b5f5",
        violet8: "#aa99ec",
        violet9: "#6e56cf",
        violet10: "#654dc4",
        violet11: "#6550b9",
        violet12: "#2f265f"
    }, P3 = {
        violetA1: "#5500aa03",
        violetA2: "#4900ff07",
        violetA3: "#4400ee0f",
        violetA4: "#4300ff1b",
        violetA5: "#3600ff26",
        violetA6: "#3100fb35",
        violetA7: "#2d01dd4a",
        violetA8: "#2b00d066",
        violetA9: "#2400b7a9",
        violetA10: "#2300abb2",
        violetA11: "#1f0099af",
        violetA12: "#0b0043d9"
    }, B3 = {
        iris1: "#fdfdff",
        iris2: "#f8f8ff",
        iris3: "#f0f1fe",
        iris4: "#e6e7ff",
        iris5: "#dadcff",
        iris6: "#cbcdff",
        iris7: "#b8baf8",
        iris8: "#9b9ef0",
        iris9: "#5b5bd6",
        iris10: "#5151cd",
        iris11: "#5753c6",
        iris12: "#272962"
    }, O3 = {
        irisA1: "#0000ff02",
        irisA2: "#0000ff07",
        irisA3: "#0011ee0f",
        irisA4: "#000bff19",
        irisA5: "#000eff25",
        irisA6: "#000aff34",
        irisA7: "#0008e647",
        irisA8: "#0008d964",
        irisA9: "#0000c0a4",
        irisA10: "#0000b6ae",
        irisA11: "#0600abac",
        irisA12: "#000246d8"
    }, A3 = {
        indigo1: "#fdfdfe",
        indigo2: "#f7f9ff",
        indigo3: "#edf2fe",
        indigo4: "#e1e9ff",
        indigo5: "#d2deff",
        indigo6: "#c1d0ff",
        indigo7: "#abbdf9",
        indigo8: "#8da4ef",
        indigo9: "#3e63dd",
        indigo10: "#3358d4",
        indigo11: "#3a5bc7",
        indigo12: "#1f2d5c"
    }, Q3 = {
        indigoA1: "#00008002",
        indigoA2: "#0040ff08",
        indigoA3: "#0047f112",
        indigoA4: "#0044ff1e",
        indigoA5: "#0044ff2d",
        indigoA6: "#003eff3e",
        indigoA7: "#0037ed54",
        indigoA8: "#0034dc72",
        indigoA9: "#0031d2c1",
        indigoA10: "#002ec9cc",
        indigoA11: "#002bb7c5",
        indigoA12: "#001046e0"
    }, D3 = {
        blue1: "#fbfdff",
        blue2: "#f4faff",
        blue3: "#e6f4fe",
        blue4: "#d5efff",
        blue5: "#c2e5ff",
        blue6: "#acd8fc",
        blue7: "#8ec8f6",
        blue8: "#5eb1ef",
        blue9: "#0090ff",
        blue10: "#0588f0",
        blue11: "#0d74ce",
        blue12: "#113264"
    }, _3 = {
        blueA1: "#0080ff04",
        blueA2: "#008cff0b",
        blueA3: "#008ff519",
        blueA4: "#009eff2a",
        blueA5: "#0093ff3d",
        blueA6: "#0088f653",
        blueA7: "#0083eb71",
        blueA8: "#0084e6a1",
        blueA9: "#0090ff",
        blueA10: "#0086f0fa",
        blueA11: "#006dcbf2",
        blueA12: "#002359ee"
    }, q3 = {
        cyan1: "#fafdfe",
        cyan2: "#f2fafb",
        cyan3: "#def7f9",
        cyan4: "#caf1f6",
        cyan5: "#b5e9f0",
        cyan6: "#9ddde7",
        cyan7: "#7dcedc",
        cyan8: "#3db9cf",
        cyan9: "#00a2c7",
        cyan10: "#0797b9",
        cyan11: "#107d98",
        cyan12: "#0d3c48"
    }, eC = {
        cyanA1: "#0099cc05",
        cyanA2: "#009db10d",
        cyanA3: "#00c2d121",
        cyanA4: "#00bcd435",
        cyanA5: "#01b4cc4a",
        cyanA6: "#00a7c162",
        cyanA7: "#009fbb82",
        cyanA8: "#00a3c0c2",
        cyanA9: "#00a2c7",
        cyanA10: "#0094b7f8",
        cyanA11: "#007491ef",
        cyanA12: "#00323ef2"
    }, tC = {
        teal1: "#fafefd",
        teal2: "#f3fbf9",
        teal3: "#e0f8f3",
        teal4: "#ccf3ea",
        teal5: "#b8eae0",
        teal6: "#a1ded2",
        teal7: "#83cdc1",
        teal8: "#53b9ab",
        teal9: "#12a594",
        teal10: "#0d9b8a",
        teal11: "#008573",
        teal12: "#0d3d38"
    }, nC = {
        tealA1: "#00cc9905",
        tealA2: "#00aa800c",
        tealA3: "#00c69d1f",
        tealA4: "#00c39633",
        tealA5: "#00b49047",
        tealA6: "#00a6855e",
        tealA7: "#0099807c",
        tealA8: "#009783ac",
        tealA9: "#009e8ced",
        tealA10: "#009684f2",
        tealA11: "#008573",
        tealA12: "#00332df2"
    }, iC = {
        jade1: "#fbfefd",
        jade2: "#f4fbf7",
        jade3: "#e6f7ed",
        jade4: "#d6f1e3",
        jade5: "#c3e9d7",
        jade6: "#acdec8",
        jade7: "#8bceb6",
        jade8: "#56ba9f",
        jade9: "#29a383",
        jade10: "#26997b",
        jade11: "#208368",
        jade12: "#1d3b31"
    }, oC = {
        jadeA1: "#00c08004",
        jadeA2: "#00a3460b",
        jadeA3: "#00ae4819",
        jadeA4: "#00a85129",
        jadeA5: "#00a2553c",
        jadeA6: "#009a5753",
        jadeA7: "#00945f74",
        jadeA8: "#00976ea9",
        jadeA9: "#00916bd6",
        jadeA10: "#008764d9",
        jadeA11: "#007152df",
        jadeA12: "#002217e2"
    }, aC = {
        green1: "#fbfefc",
        green2: "#f4fbf6",
        green3: "#e6f6eb",
        green4: "#d6f1df",
        green5: "#c4e8d1",
        green6: "#adddc0",
        green7: "#8eceaa",
        green8: "#5bb98b",
        green9: "#30a46c",
        green10: "#2b9a66",
        green11: "#218358",
        green12: "#193b2d"
    }, lC = {
        greenA1: "#00c04004",
        greenA2: "#00a32f0b",
        greenA3: "#00a43319",
        greenA4: "#00a83829",
        greenA5: "#019c393b",
        greenA6: "#00963c52",
        greenA7: "#00914071",
        greenA8: "#00924ba4",
        greenA9: "#008f4acf",
        greenA10: "#008647d4",
        greenA11: "#00713fde",
        greenA12: "#002616e6"
    }, rC = {
        grass1: "#fbfefb",
        grass2: "#f5fbf5",
        grass3: "#e9f6e9",
        grass4: "#daf1db",
        grass5: "#c9e8ca",
        grass6: "#b2ddb5",
        grass7: "#94ce9a",
        grass8: "#65ba74",
        grass9: "#46a758",
        grass10: "#3e9b4f",
        grass11: "#2a7e3b",
        grass12: "#203c25"
    }, cC = {
        grassA1: "#00c00004",
        grassA2: "#0099000a",
        grassA3: "#00970016",
        grassA4: "#009f0725",
        grassA5: "#00930536",
        grassA6: "#008f0a4d",
        grassA7: "#018b0f6b",
        grassA8: "#008d199a",
        grassA9: "#008619b9",
        grassA10: "#007b17c1",
        grassA11: "#006514d5",
        grassA12: "#002006df"
    }, sC = {
        brown1: "#fefdfc",
        brown2: "#fcf9f6",
        brown3: "#f6eee7",
        brown4: "#f0e4d9",
        brown5: "#ebdaca",
        brown6: "#e4cdb7",
        brown7: "#dcbc9f",
        brown8: "#cea37e",
        brown9: "#ad7f58",
        brown10: "#a07553",
        brown11: "#815e46",
        brown12: "#3e332e"
    }, dC = {
        brownA1: "#aa550003",
        brownA2: "#aa550009",
        brownA3: "#a04b0018",
        brownA4: "#9b4a0026",
        brownA5: "#9f4d0035",
        brownA6: "#a04e0048",
        brownA7: "#a34e0060",
        brownA8: "#9f4a0081",
        brownA9: "#823c00a7",
        brownA10: "#723300ac",
        brownA11: "#522100b9",
        brownA12: "#140600d1"
    }, uC = {
        bronze1: "#fdfcfc",
        bronze2: "#fdf7f5",
        bronze3: "#f6edea",
        bronze4: "#efe4df",
        bronze5: "#e7d9d3",
        bronze6: "#dfcdc5",
        bronze7: "#d3bcb3",
        bronze8: "#c2a499",
        bronze9: "#a18072",
        bronze10: "#957468",
        bronze11: "#7d5e54",
        bronze12: "#43302b"
    }, mC = {
        bronzeA1: "#55000003",
        bronzeA2: "#cc33000a",
        bronzeA3: "#92250015",
        bronzeA4: "#80280020",
        bronzeA5: "#7423002c",
        bronzeA6: "#7324003a",
        bronzeA7: "#6c1f004c",
        bronzeA8: "#671c0066",
        bronzeA9: "#551a008d",
        bronzeA10: "#4c150097",
        bronzeA11: "#3d0f00ab",
        bronzeA12: "#1d0600d4"
    }, hC = {
        gold1: "#fdfdfc",
        gold2: "#faf9f2",
        gold3: "#f2f0e7",
        gold4: "#eae6db",
        gold5: "#e1dccf",
        gold6: "#d8d0bf",
        gold7: "#cbc0aa",
        gold8: "#b9a88d",
        gold9: "#978365",
        gold10: "#8c7a5e",
        gold11: "#71624b",
        gold12: "#3b352b"
    }, pC = {
        goldA1: "#55550003",
        goldA2: "#9d8a000d",
        goldA3: "#75600018",
        goldA4: "#6b4e0024",
        goldA5: "#60460030",
        goldA6: "#64440040",
        goldA7: "#63420055",
        goldA8: "#633d0072",
        goldA9: "#5332009a",
        goldA10: "#492d00a1",
        goldA11: "#362100b4",
        goldA12: "#130c00d4"
    }, bC = {
        sky1: "#f9feff",
        sky2: "#f1fafd",
        sky3: "#e1f6fd",
        sky4: "#d1f0fa",
        sky5: "#bee7f5",
        sky6: "#a9daed",
        sky7: "#8dcae3",
        sky8: "#60b3d7",
        sky9: "#7ce2fe",
        sky10: "#74daf8",
        sky11: "#00749e",
        sky12: "#1d3e56"
    }, fC = {
        skyA1: "#00d5ff06",
        skyA2: "#00a4db0e",
        skyA3: "#00b3ee1e",
        skyA4: "#00ace42e",
        skyA5: "#00a1d841",
        skyA6: "#0092ca56",
        skyA7: "#0089c172",
        skyA8: "#0085bf9f",
        skyA9: "#00c7fe83",
        skyA10: "#00bcf38b",
        skyA11: "#00749e",
        skyA12: "#002540e2"
    }, gC = {
        mint1: "#f9fefd",
        mint2: "#f2fbf9",
        mint3: "#ddf9f2",
        mint4: "#c8f4e9",
        mint5: "#b3ecde",
        mint6: "#9ce0d0",
        mint7: "#7ecfbd",
        mint8: "#4cbba5",
        mint9: "#86ead4",
        mint10: "#7de0cb",
        mint11: "#027864",
        mint12: "#16433c"
    }, yC = {
        mintA1: "#00d5aa06",
        mintA2: "#00b18a0d",
        mintA3: "#00d29e22",
        mintA4: "#00cc9937",
        mintA5: "#00c0914c",
        mintA6: "#00b08663",
        mintA7: "#00a17d81",
        mintA8: "#009e7fb3",
        mintA9: "#00d3a579",
        mintA10: "#00c39982",
        mintA11: "#007763fd",
        mintA12: "#00312ae9"
    }, ZC = {
        lime1: "#fcfdfa",
        lime2: "#f8faf3",
        lime3: "#eef6d6",
        lime4: "#e2f0bd",
        lime5: "#d3e7a6",
        lime6: "#c2da91",
        lime7: "#abc978",
        lime8: "#8db654",
        lime9: "#bdee63",
        lime10: "#b0e64c",
        lime11: "#5c7c2f",
        lime12: "#37401c"
    }, vC = {
        limeA1: "#66990005",
        limeA2: "#6b95000c",
        limeA3: "#96c80029",
        limeA4: "#8fc60042",
        limeA5: "#81bb0059",
        limeA6: "#72aa006e",
        limeA7: "#61990087",
        limeA8: "#559200ab",
        limeA9: "#93e4009c",
        limeA10: "#8fdc00b3",
        limeA11: "#375f00d0",
        limeA12: "#1e2900e3"
    }, xC = {
        yellow1: "#fdfdf9",
        yellow2: "#fefce9",
        yellow3: "#fffab8",
        yellow4: "#fff394",
        yellow5: "#ffe770",
        yellow6: "#f3d768",
        yellow7: "#e4c767",
        yellow8: "#d5ae39",
        yellow9: "#ffe629",
        yellow10: "#ffdc00",
        yellow11: "#9e6c00",
        yellow12: "#473b1f"
    }, GC = {
        yellowA1: "#aaaa0006",
        yellowA2: "#f4dd0016",
        yellowA3: "#ffee0047",
        yellowA4: "#ffe3016b",
        yellowA5: "#ffd5008f",
        yellowA6: "#ebbc0097",
        yellowA7: "#d2a10098",
        yellowA8: "#c99700c6",
        yellowA9: "#ffe100d6",
        yellowA10: "#ffdc00",
        yellowA11: "#9e6c00",
        yellowA12: "#2e2000e0"
    }, XC = {
        amber1: "#fefdfb",
        amber2: "#fefbe9",
        amber3: "#fff7c2",
        amber4: "#ffee9c",
        amber5: "#fbe577",
        amber6: "#f3d673",
        amber7: "#e9c162",
        amber8: "#e2a336",
        amber9: "#ffc53d",
        amber10: "#ffba18",
        amber11: "#ab6400",
        amber12: "#4f3422"
    }, WC = {
        amberA1: "#c0800004",
        amberA2: "#f4d10016",
        amberA3: "#ffde003d",
        amberA4: "#ffd40063",
        amberA5: "#f8cf0088",
        amberA6: "#eab5008c",
        amberA7: "#dc9b009d",
        amberA8: "#da8a00c9",
        amberA9: "#ffb300c2",
        amberA10: "#ffb300e7",
        amberA11: "#ab6400",
        amberA12: "#341500dd"
    }, VC = {
        orange1: "#fefcfb",
        orange2: "#fff7ed",
        orange3: "#ffefd6",
        orange4: "#ffdfb5",
        orange5: "#ffd19a",
        orange6: "#ffc182",
        orange7: "#f5ae73",
        orange8: "#ec9455",
        orange9: "#f76b15",
        orange10: "#ef5f00",
        orange11: "#cc4e00",
        orange12: "#582d1d"
    }, IC = {
        orangeA1: "#c0400004",
        orangeA2: "#ff8e0012",
        orangeA3: "#ff9c0029",
        orangeA4: "#ff91014a",
        orangeA5: "#ff8b0065",
        orangeA6: "#ff81007d",
        orangeA7: "#ed6c008c",
        orangeA8: "#e35f00aa",
        orangeA9: "#f65e00ea",
        orangeA10: "#ef5f00",
        orangeA11: "#cc4e00",
        orangeA12: "#431200e2"
    }, N0 = {
        grayColor1: "gray-1",
        grayColor2: "gray-2",
        grayColor3: "gray-3",
        grayColor4: "gray-4",
        grayColor5: "gray-5",
        grayColor6: "gray-6",
        grayColor7: "gray-7",
        grayColor8: "gray-8",
        grayColor9: "gray-9",
        grayColor10: "gray-10",
        grayColor11: "gray-11",
        grayColor12: "gray-12",
        accentColor1: "accent-1",
        accentColor2: "accent-2",
        accentColor3: "accent-3",
        accentColor4: "accent-4",
        accentColor5: "accent-5",
        accentColor6: "accent-6",
        accentColor7: "accent-7",
        accentColor8: "accent-8",
        accentColor9: "accent-9",
        accentColor10: "accent-10",
        accentColor11: "accent-11",
        accentColor12: "accent-12",
        canvasBackground: "gray-3",
        canvasBoundaryBackground: "gray-1",
        tableBackground: "gray-2",
        tableSelect: "accent-8",
        tableBorder: "gray-6",
        memoBackground: "gray-2",
        memoSelect: "accent-8",
        memoBorder: "gray-6",
        columnSelect: "gray-5",
        columnHover: "gray-4",
        relationshipHover: "accent-8",
        toolbarBackground: "gray-1",
        contextMenuBackground: "gray-2",
        contextMenuSelect: "gray-4",
        contextMenuHover: "accent-7",
        contextMenuBorder: "gray-6",
        minimapBorder: "override-black",
        minimapShadow: "override-black",
        minimapViewportBorder: "accent-7",
        minimapViewportBorderHover: "accent-8",
        toastBackground: "gray-2",
        toastBorder: "gray-6",
        dargSelectBackground: "accent-5",
        dargSelectBorder: "accent-8",
        scrollbarTrack: "grayA-3",
        scrollbarThumb: "gray-9",
        scrollbarThumbHover: "gray-10",
        foreground: "gray-11",
        active: "gray-12",
        placeholder: "grayA-10",
        focus: "accent-8",
        inputActive: "accent-10",
        keyPK: "custom-amber--9",
        keyFK: "custom-ruby--9",
        keyPFK: "custom-cyan--9",
        diffInsertBackground: "custom-green--4",
        diffDeleteBackground: "custom-red--4",
        diffCrossBackground: "custom-blue--4",
        diffInsertForeground: "custom-green--11",
        diffDeleteForeground: "custom-red--11",
        diffCrossForeground: "custom-blue--11"
    }, Bn = {
        amber: XC,
        amberA: WC,
        amberDark: b3,
        amberDarkA: f3,
        blue: D3,
        blueA: _3,
        blueDark: Uk,
        blueDarkA: jk,
        bronze: uC,
        bronzeA: mC,
        bronzeDark: i3,
        bronzeDarkA: o3,
        brown: sC,
        brownA: dC,
        brownDark: t3,
        brownDarkA: n3,
        crimson: z3,
        crimsonA: w3,
        crimsonDark: Sk,
        crimsonDarkA: Rk,
        cyan: q3,
        cyanA: eC,
        cyanDark: Ek,
        cyanDarkA: Pk,
        gold: hC,
        goldA: pC,
        goldDark: a3,
        goldDarkA: l3,
        grass: rC,
        grassA: cC,
        grassDark: qk,
        grassDarkA: e3,
        gray: Z3,
        grayA: v3,
        grayDark: uk,
        grayDarkA: mk,
        green: aC,
        greenA: lC,
        greenDark: Dk,
        greenDarkA: _k,
        indigo: A3,
        indigoA: Q3,
        indigoDark: Fk,
        indigoDarkA: $k,
        iris: B3,
        irisA: O3,
        irisDark: Jk,
        irisDarkA: Mk,
        jade: iC,
        jadeA: oC,
        jadeDark: Ak,
        jadeDarkA: Qk,
        lime: ZC,
        limeA: vC,
        limeDark: u3,
        limeDarkA: m3,
        mauve: x3,
        mauveA: G3,
        mauveDark: hk,
        mauveDarkA: pk,
        mint: gC,
        mintA: yC,
        mintDark: s3,
        mintDarkA: d3,
        olive: k3,
        oliveA: C3,
        oliveDark: Zk,
        oliveDarkA: vk,
        orange: VC,
        orangeA: IC,
        orangeDark: g3,
        orangeDarkA: y3,
        pink: J3,
        pinkA: M3,
        pinkDark: Lk,
        pinkDarkA: Yk,
        plum: F3,
        plumA: $3,
        plumDark: Kk,
        plumDarkA: Tk,
        purple: U3,
        purpleA: j3,
        purpleDark: Hk,
        purpleDarkA: Nk,
        red: K3,
        redA: T3,
        redDark: Vk,
        redDarkA: Ik,
        ruby: H3,
        rubyA: N3,
        rubyDark: kk,
        rubyDarkA: Ck,
        sage: V3,
        sageA: I3,
        sageDark: gk,
        sageDarkA: yk,
        sand: S3,
        sandA: R3,
        sandDark: xk,
        sandDarkA: Gk,
        sky: bC,
        skyA: fC,
        skyDark: r3,
        skyDarkA: c3,
        slate: X3,
        slateA: W3,
        slateDark: bk,
        slateDarkA: fk,
        teal: tC,
        tealA: nC,
        tealDark: Bk,
        tealDarkA: Ok,
        tomato: L3,
        tomatoA: Y3,
        tomatoDark: Xk,
        tomatoDarkA: Wk,
        violet: E3,
        violetA: P3,
        violetDark: zk,
        violetDarkA: wk,
        yellow: xC,
        yellowA: GC,
        yellowDark: h3,
        yellowDarkA: p3
    }, Tt = {
        dark: "dark",
        light: "light"
    }, kC = Object.values(Tt), z0 = {
        gray: "gray",
        mauve: "mauve",
        slate: "slate",
        sage: "sage",
        olive: "olive",
        sand: "sand"
    }, w0 = Object.values(z0), J0 = {
        gray: "gray",
        gold: "gold",
        bronze: "bronze",
        brown: "brown",
        yellow: "yellow",
        amber: "amber",
        orange: "orange",
        tomato: "tomato",
        red: "red",
        ruby: "ruby",
        crimson: "crimson",
        pink: "pink",
        plum: "plum",
        purple: "purple",
        violet: "violet",
        iris: "iris",
        indigo: "indigo",
        blue: "blue",
        cyan: "cyan",
        teal: "teal",
        jade: "jade",
        green: "green",
        grass: "grass",
        lime: "lime",
        mint: "mint",
        sky: "sky"
    }, M0 = Object.values(J0);
function CC({ appearance: e, grayColor: t, accentColor: n }) {
    const i = e === Tt.dark ? "Dark" : "", l = Bn[`${t}${i}`], r = Bn[`${n}${i}`], s = Bn[`${t}${i}A`], m = Bn[`${n}${i}A`];
    return {
        gray: (h) => Jt(l, `${t}${h}`) ?? "",
        grayA: (h) => Jt(s, `${t}A${h}`) ?? "",
        accent: (h) => Jt(r, `${n}${h}`) ?? "",
        accentA: (h) => Jt(m, `${n}A${h}`) ?? ""
    };
}
const SC = Object.keys(N0);
function RC(e, t) {
    return SC.reduce((n, i) => {
        const l = Jt(N0, i), [r, s, m, h] = l.split("-");
        if (r === "override")
            return ul(n, i, s), n;
        if (r === "custom") {
            const p = t === Tt.dark ? "Dark" : "", b = Jt(Bn, `${s}${p}${m}.${s}${m}${h}`);
            return ul(n, i, b), n;
        }
        if (r.startsWith("gray") || r.startsWith("accent")) {
            const p = Jt(e, r, kf)(s);
            return ul(n, i, p), n;
        }
        return n;
    }, {});
}
const vd = ({ grayColor: e, accentColor: t, appearance: n }) => RC(CC({
    appearance: n,
    grayColor: e,
    accentColor: t
}), n), LC = N`
  position: absolute;
  top: 46px;
  left: 16px;
  padding: 24px;
  background-color: var(--context-menu-background);
  border: 1px solid var(--context-menu-border);
  border-radius: 6px;
  width: 360px;
`, YC = N`
  color: var(--active);
  ${Tl};
  margin-bottom: 24px;
`, Gl = N`
  margin-top: 24px;
  color: var(--active);
  ${Lt.normal};
`, xd = N`
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(10, minmax(0, 1fr));
  gap: 8px;
`, Gd = N`
  border-radius: 9999px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  border: 1px solid transparent;

  &.selected {
    outline: solid 2px var(--gray-color-12);
  }
`, KC = N`
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
`, Xd = N`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid var(--context-menu-border);
  border-radius: 6px;
  height: 32px;
  ${Lt.paragraph};

  &:hover {
    background-color: var(--column-hover);
  }

  &.selected {
    border-color: var(--gray-color-12);
  }
`, Wd = N`
  width: 4px;
  height: 100%;
`;
function HC(e, t, n) {
    const i = new Ka(e, t, n);
    Cf(() => i.snapshot()), Ca(() => i.play());
}
const NC = N`
  position: absolute;
  z-index: 2147483647;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  max-width: 390px;
  margin: 25px;

  &[data-pointer-none] {
    pointer-events: none;
  }

  .toast-move {
    transition: transform 0.3s;
  }

  .toast-container {
    display: flex;
    margin-top: 10px;
    justify-content: flex-end;
    animation: toastShowMove 0.3s ease;

    &[data-animation-one] {
      animation: none;
    }
  }

  .toast-container:first-child {
    margin-top: 0;
  }

  @keyframes toastShowMove {
    0% {
      transform: translateY(30px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`, zC = 1e3 * 5, wC = (e, t) => {
        const n = se(t), i = Ue(), { addUnsubscribe: l } = Ge(), r = Se([]), s = /* @__PURE__ */ new Set();
        HC(i, ".toast-container", "toast-move");
        const m = (p) => {
            s.add(p);
        }, h = (p) => {
            const b = r.findIndex((g) => g.id === p);
            b !== -1 && (s.delete(p), r.splice(b, 1));
        };
        return Te(() => {
            const { emitter: p } = n.value;
            l(p.on({
                openToast: ({ payload: b }) => {
                    const g = Object.assign({
                        close: Ra(zC)
                    }, b, { id: gt() });
                    r.push(g), g.close.finally(() => h(g.id));
                }
            }));
        }), () => I`
    <div
      class=${NC}
      ${De(i)}
      ?data-pointer-none=${r.length === 0}
    >
      ${et(r, (p) => p.id, (p) => I`
          <div
            class="toast-container"
            ?data-animation-one=${s.has(p.id)}
            @animationend=${() => m(p.id)}
          >
            ${p.message}
          </div>
        `)}
    </div>
  `;
    }, JC = N`
  display: flex;
  width: 100%;
  height: ${Sl}px;
  min-height: ${Sl}px;
  padding: 0 15px;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  background-color: var(--toolbar-background);

  & > input {
    margin-right: 15px;
  }
`, Xl = N`
  width: 10px;
  height: 100%;
`, At = N`
  cursor: pointer;
  padding: 0 5px;
  display: flex;
  align-items: center;
  height: 100%;

  &.active {
    fill: var(--active);
  }
  &:hover {
    fill: var(--active);
  }

  &.undo-redo {
    cursor: not-allowed;
    fill: var(--foreground);
  }

  &.undo-redo.active {
    cursor: pointer;
    fill: var(--active);
  }
`, MC = N`
  display: flex;
  align-self: center;
  margin-left: auto;
  white-space: nowrap;
  ${Lt.paragraph};
`, FC = (e, t) => {
        const n = se(t), r = (y) => {
            const G = y.target;
            if (!G)
                return;
            const X = Yf(Number(rr(G.value)) / 100), { store: W } = n.value;
            G.value = fs(X), W.dispatch(Kf(X));
        }, s = (y) => {
            const { store: G } = n.value;
            G.dispatch(hi({ value: y }));
        }, m = () => {
            const { store: y } = n.value;
            y.undo();
        }, h = () => {
            const { store: y } = n.value;
            y.redo();
        }, p = () => {
            const { store: y } = n.value;
            y.dispatch(Sa());
        }, Z = () => {
            const { store: y } = n.value, { editor: G } = y.state;
            (G.hasUndo || G.hasRedo) && y.dispatch(ct({ [ce.timeTravel]: !0 }));
        };
        return () => {
            const { store: y } = n.value, { settings: G, editor: X, doc: W } = y.state, V = X.openMap[ce.automaticTablePlacement], C = X.openMap[ce.tableProperties], H = X.openMap[ce.timeTravel], L = X.openMap[ce.diffViewer], E = G.canvasType === ue.ERD && !V && !C && !L && !H && !e.readonly;
            return I`
      <div
        class=${["toolbar", JC]}
        @mousedown=${p}
        @touchstart=${p}
      >
        <${ki}
          title="zoom level"
          placeholder="zoom level"
          width=${45}
          value=${fs(G.zoomLevel)}
          numberOnly=${!0}
          .onChange=${r}
        />
        <div class=${Xl}></div>
        <div
          class=${[
                    At,
                    { active: G.canvasType === ue.ERD }
                ]}
          title="Entity Relationship Diagram"
          @click=${() => s(ue.ERD)}
        >
          <${P} name="diagram-project" size=${16} />
        </div>
        <div
          class=${[
                    At,
                    { active: G.canvasType === ue.visualization }
                ]}
          title="Visualization"
          @click=${() => s(ue.visualization)}
        >
          <${P} prefix="mdi" name="chart-scatter-plot" size=${16} />
        </div>
        <div
          class=${[
                    At,
                    { active: G.canvasType === ue.schemaSQL }
                ]}
          title="Schema SQL"
          @click=${() => s(ue.schemaSQL)}
        >
          <${P} prefix="mdi" name="database-export" size=${16} />
        </div>
        ${E ? I`
              <div
                class=${[
                        "undo-redo",
                        At,
                        {
                            active: X.hasUndo
                        }
                    ]}
                title="Undo"
                @click=${m}
              >
                <${P} name="rotate-left" size=${16} />
              </div>
              <div
                class=${[
                        "undo-redo",
                        At,
                        {
                            active: X.hasRedo
                        }
                    ]}
                title="Redo"
                @click=${h}
              >
                <${P} name="rotate-right" size=${16} />
              </div>
              <div
                class=${[
                        "undo-redo",
                        At,
                        {
                            active: X.hasUndo || X.hasRedo
                        }
                    ]}
                title="Time Travel"
                style=${{
                        "max-width": "26px"
                    }}
                @click=${Z}
              >
                <${P} prefix="mdi" name="av-timer" size=${20} />
              </div>
            ` : null}
        <div class=${MC}>Table: ${W.tableIds.length}</div>
      </div>
    `;
        };
    }, $C = (e, t) => {
        const n = se(t), i = () => {
            const { store: l } = n.value, { settings: r } = l.state, { column: s, widthName: m, widthDataType: h, widthDefault: p, widthComment: b } = e;
            return r.columnOrder.map((g) => {
                let Z = null;
                switch (g) {
                    case ge.columnName:
                        Z = I`
              <div class="column-col">
                <${Ct}
                  placeholder="column"
                  width=${m}
                  value=${s.name}
                />
              </div>
            `;
                        break;
                    case ge.columnDefault:
                        Z = B(r.show, We.columnDefault) ? I`
                  <div class="column-col">
                    <${Ct}
                      placeholder="default"
                      width=${p}
                      value=${s.default}
                    />
                  </div>
                ` : null;
                        break;
                    case ge.columnComment:
                        Z = B(r.show, We.columnComment) ? I`
                  <div class="column-col">
                    <${Ct}
                      placeholder="comment"
                      width=${b}
                      value=${s.comment}
                    />
                  </div>
                ` : null;
                        break;
                    case ge.columnDataType:
                        Z = B(r.show, We.columnDataType) ? I`
                  <div class="column-col">
                    <${kr}
                      tableId=${s.tableId}
                      columnId=${s.id}
                      width=${h}
                      value=${s.dataType}
                    />
                  </div>
                ` : null;
                        break;
                    case ge.columnNotNull:
                        Z = B(r.show, We.columnNotNull) ? I`
                  <div class="column-col">
                    <${Sr} options=${s.options} />
                  </div>
                ` : null;
                        break;
                    case ge.columnUnique:
                        Z = B(r.show, We.columnUnique) ? I`
                  <div class="column-col">
                    <${kn}
                      checked=${B(s.options, ie.unique)}
                      width=${ka}
                      text="UQ"
                      title="Unique"
                    />
                  </div>
                ` : null;
                        break;
                    case ge.columnAutoIncrement:
                        Z = B(r.show, We.columnAutoIncrement) ? I`
                  <div class="column-col">
                    <${kn}
                      checked=${B(s.options, ie.autoIncrement)}
                      width=${cr}
                      text="AI"
                      title="Auto Increment"
                    />
                  </div>
                ` : null;
                        break;
                }
                return {
                    columnType: g,
                    template: Z
                };
            }).filter(({ template: g }) => !!g);
        };
        return () => {
            const { column: l, selected: r } = e;
            return I`
      <div
        class=${["column-row", Rr]}
        data-id=${l.id}
        ?data-selected=${r}
      >
        <${Cr} keys=${l.ui.keys} />
        ${et(i(), ({ columnType: s }) => s, ({ template: s }) => s)}
      </div>
    `;
        };
    }, UC = (e, t) => {
        const n = se(t);
        return () => {
            const { store: i } = n.value, { settings: l, collections: r } = i.state, { table: s, columnId: m, x: h, y: p } = e, b = Qt(s, i.state), g = an(s), Z = $(r).collection("tableColumnEntities").selectByIds(s.columnIds);
            //FLEXYGO CHANGES
            // change the width
            return I`
      <div
        class=${["table", Ya]}
        style=${{
                    top: `${p}px`,
                    left: `${h}px`,
                    width: `${measures.table.width}px`,
                    height: `${g}px`,
                    position: "fixed"
                }}
        data-id=${s.id}
      >
        <div class=${["headerContainer", Gr]}>
          <div
            class=${["table-header-color", Xr]}
            style=${{
                    "background-color": s.ui.color
                }}
          ></div>
          <div class=${["headerToolbar",Ku]}></div>
          <div class=${["tableName", Tu]}>
            <div class="input-padding">
              <${Ct}
                placeholder="table"
                width=${s.ui.widthName}
                value=${s.name}
              />
            </div>
            ${B(l.show, We.tableComment) ? I`
                  <div class="input-padding">
                    <${Ct}
                      placeholder="comment"
                      width=${s.ui.widthComment}
                      value=${s.comment}
                    />
                  </div>
                ` : null}
          </div>
        </div>
        <div>
          ${et(Z, (y) => y.id, (y) => I`
              <${$C}
                column=${y}
                selected=${y.id === m}
                widthName=${b.name}
                widthDataType=${b.dataType}
                widthDefault=${b.default}
                widthComment=${b.comment}
              />
            `)}
        </div>
      </div>
    `;
        };
    }, Za = {
        table: "table",
        column: "column"
    };
function jC({ doc: { tableIds: e, relationshipIds: t }, collections: n }) {
    const i = $(n).collection("tableEntities").selectByIds(e), l = $(n).collection("relationshipEntities").selectByIds(t), r = {
        nodes: [],
        links: []
    }, s = /* @__PURE__ */ new Set();
    return i.forEach((m) => {
        r.nodes.push({
            id: m.id,
            name: m.name,
            group: Za.table
        }), $(n).collection("tableColumnEntities").selectByIds(m.columnIds).forEach((h) => {
            r.nodes.push({
                id: h.id,
                name: h.name,
                group: Za.column,
                tableId: m.id
            }), r.links.push({
                source: m.id,
                target: h.id
            });
        });
    }), l.forEach((m) => {
        const { start: h, end: p } = m, b = `${h.tableId}-${p.tableId}`;
        h.tableId !== p.tableId && !s.has(b) && (r.links.push({
            source: h.tableId,
            target: p.tableId
        }), s.add(b));
    }), r;
}
const EC = Lm(N5);
function PC(e, t) {
    return IG().on("start", (n, i) => {
        n.active || e.alphaTarget(0.3).restart(), i.fx = i.x, i.fy = i.y, t.onDragStart();
    }).on("drag", (n, i) => {
        i.fx = n.x, i.fy = n.y;
    }).on("end", (n, i) => {
        n.active || e.alphaTarget(0), i.fx = null, i.fy = null, t.onDragEnd();
    });
}
function BC(e, t) {
    const n = jC(e), i = n.links.map((p) => Object.create(p)), l = n.nodes.map((p) => Object.create(p)), r = km(l).force("link", Im(i).id((p) => p.id)).force("charge", Cm()).force("x", Sm()).force("y", Rm()), s = gG("svg"), m = s.append("g").attr("stroke", "#999").attr("stroke-opacity", 0.6).selectAll("line").data(i).join("line").attr("stroke-width", Math.sqrt(2)), h = s.append("g").attr("stroke", "#fff").attr("stroke-width", 1.5).selectAll("circle").data(l).join("circle").attr("r", 5).attr("fill", (p) => EC(p.group)).call(PC(r, t));
    return h.on("mouseenter", (p, b) => {
        const g = n.nodes[b.index];
        let Z = null, y = null;
        g.group === Za.table ? Z = g.id : g.group === Za.column && g.tableId && (Z = g.tableId, y = g.id), t.onStartPreview(p, Z, y);
    }), h.on("mouseleave", () => {
        t.onEndPreview();
    }), r.on("tick", () => {
        m.attr("x1", (p) => p.source.x).attr("y1", (p) => p.source.y).attr("x2", (p) => p.target.x).attr("y2", (p) => p.target.y), h.attr("cx", (p) => p.x).attr("cy", (p) => p.y);
    }), s;
}
const OC = N`
  position: relative;
  height: 100%;
  overflow: auto;
  background-color: var(--canvas-background);
`, Vd = 1200, AC = 20, QC = (e, t) => {
        const n = se(t), { addUnsubscribe: i } = Ge(), l = Se({
            preview: !1,
            drag: !1,
            table: null,
            columnId: null,
            x: 0,
            y: 0
        });
        let r = null;
        const s = () => {
            const { store: m } = n.value, { editor: { viewport: h } } = m.state;
            r == null || r.attr("viewBox", [
                -h.width / 2,
                -Vd / 2,
                h.width,
                Vd
            ]);
        };
        return zi(() => {
            const { store: m } = n.value, { editor: h } = m.state;
            r = BC(m.state, {
                onDragStart: () => {
                    l.drag = !0;
                },
                onDragEnd: () => {
                    l.drag = !1;
                },
                onStartPreview: (p, b, g) => {
                    if (!b)
                        return;
                    const { store: Z } = n.value, { collections: y } = Z.state, G = $(y).collection("tableEntities").selectById(b);
                    G && (l.columnId = g, l.table = G, l.x = p.clientX, l.y = p.clientY, l.preview = !0);
                },
                onEndPreview: () => {
                    l.preview = !1;
                }
            }), s(), i(Pe(h.viewport).subscribe((p) => {
                p === "width" && s();
            }), () => {
                r == null || r.remove(), r = null;
            });
        }), () => {
            const m = l.table && !l.drag && l.preview;
            return I`
      <div class=${["scrollbar", OC]}>
        ${r == null ? void 0 : r.node()}
        ${m ? I`
              <${UC}
                table=${l.table}
                columnId=${l.columnId}
                x=${l.x + AC}
                y=${l.y}
              />
            ` : null}
      </div>
    `;
        };
    };
var DC = ["Shift", "Meta", "Alt", "Control"], F0 = typeof navigator == "object" ? navigator.platform : "", $0 = /Mac|iPod|iPhone|iPad/.test(F0), _C = $0 ? "Meta" : "Control", qC = F0 === "Win32" ? ["Control", "Alt"] : $0 ? ["Alt"] : [];
function Wl(e, t) {
    return typeof e.getModifierState == "function" && (e.getModifierState(t) || qC.includes(t) && e.getModifierState("AltGraph"));
}
function eS(e) {
    return e.trim().split(" ").map(function (t) {
        var n = t.split(/\b\+/), i = n.pop();
        return [n = n.map(function (l) {
            return l === "$mod" ? _C : l;
        }), i];
    });
}
function tS(e, t) {
    var n;
    t === void 0 && (t = {});
    var i = (n = t.timeout) != null ? n : 1e3, l = Object.keys(e).map(function (m) {
        return [eS(m), e[m]];
    }), r = /* @__PURE__ */ new Map(), s = null;
    return function (m) {
        m instanceof KeyboardEvent && (l.forEach(function (h) {
            var p = h[0], b = h[1], g = r.get(p) || p;
            (function (Z, y) {
                return !(y[1].toUpperCase() !== Z.key.toUpperCase() && y[1] !== Z.code || y[0].find(function (G) {
                    return !Wl(Z, G);
                }) || DC.find(function (G) {
                    return !y[0].includes(G) && y[1] !== G && Wl(Z, G);
                }));
            })(m, g[0]) ? g.length > 1 ? r.set(p, g.slice(1)) : (r.delete(p), b(m)) : Wl(m, m.key) || r.delete(p);
        }), s && clearTimeout(s), s = setTimeout(r.clear.bind(r), i));
    };
}
function nS(e, t, n) {
    var i;
    n === void 0 && (n = {});
    var l = (i = n.event) != null ? i : "keydown", r = tS(t, n);
    return e.addEventListener(l, r), function () {
        e.removeEventListener(l, r);
    };
}
function iS(e, t) {
    const n = se(e), { addUnsubscribe: i } = Ge();
    let l = () => {
    };
    const r = () => {
        const { keyBindingMap: s, shortcut$: m } = n.value, h = t.value;
        l(), l = nS(h, Object.keys(s).reduce((p, b) => {
            const g = b;
            return s[g].forEach((y) => {
                p[y.shortcut] = (G) => {
                    y.preventDefault && G.preventDefault(), y.stopPropagation && G.stopPropagation(), m.next({ type: g, event: G });
                };
            }), p;
        }, {}));
    };
    Te(() => {
        const { keyBindingMap: s } = n.value;
        r(), i(Pe(s).subscribe(r), () => {
            l();
        });
    });
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const U0 = Symbol("Comlink.proxy"), oS = Symbol("Comlink.endpoint"), aS = Symbol("Comlink.releaseProxy"), Vl = Symbol("Comlink.finalizer"), ta = Symbol("Comlink.thrown"), j0 = (e) => typeof e == "object" && e !== null || typeof e == "function", lS = {
    canHandle: (e) => j0(e) && e[U0],
    serialize(e) {
        const { port1: t, port2: n } = new MessageChannel();
        return P0(e, t), [n, [n]];
    },
    deserialize(e) {
        return e.start(), nr(e);
    }
}, rS = {
    canHandle: (e) => j0(e) && ta in e,
    serialize({ value: e }) {
        let t;
        return e instanceof Error ? t = {
            isError: !0,
            value: {
                message: e.message,
                name: e.name,
                stack: e.stack
            }
        } : t = { isError: !1, value: e }, [t, []];
    },
    deserialize(e) {
        throw e.isError ? Object.assign(new Error(e.value.message), e.value) : e.value;
    }
}, E0 = /* @__PURE__ */ new Map([
    ["proxy", lS],
    ["throw", rS]
]);
function cS(e, t) {
    for (const n of e)
        if (t === n || n === "*" || n instanceof RegExp && n.test(t))
            return !0;
    return !1;
}
function P0(e, t = globalThis, n = ["*"]) {
    t.addEventListener("message", function i(l) {
        if (!l || !l.data)
            return;
        if (!cS(n, l.origin)) {
            console.warn(`Invalid origin '${l.origin}' for comlink proxy`);
            return;
        }
        const { id: r, type: s, path: m } = Object.assign({ path: [] }, l.data), h = (l.data.argumentList || []).map(Un);
        let p;
        try {
            const b = m.slice(0, -1).reduce((Z, y) => Z[y], e), g = m.reduce((Z, y) => Z[y], e);
            switch (s) {
                case "GET":
                    p = g;
                    break;
                case "SET":
                    b[m.slice(-1)[0]] = Un(l.data.value), p = !0;
                    break;
                case "APPLY":
                    p = g.apply(b, h);
                    break;
                case "CONSTRUCT":
                    {
                        const Z = new g(...h);
                        p = pS(Z);
                    }
                    break;
                case "ENDPOINT":
                    {
                        const { port1: Z, port2: y } = new MessageChannel();
                        P0(e, y), p = hS(Z, [Z]);
                    }
                    break;
                case "RELEASE":
                    p = void 0;
                    break;
                default:
                    return;
            }
        } catch (b) {
            p = { value: b, [ta]: 0 };
        }
        Promise.resolve(p).catch((b) => ({ value: b, [ta]: 0 })).then((b) => {
            const [g, Z] = Ga(b);
            t.postMessage(Object.assign(Object.assign({}, g), { id: r }), Z), s === "RELEASE" && (t.removeEventListener("message", i), B0(t), Vl in e && typeof e[Vl] == "function" && e[Vl]());
        }).catch((b) => {
            const [g, Z] = Ga({
                value: new TypeError("Unserializable return value"),
                [ta]: 0
            });
            t.postMessage(Object.assign(Object.assign({}, g), { id: r }), Z);
        });
    }), t.start && t.start();
}
function sS(e) {
    return e.constructor.name === "MessagePort";
}
function B0(e) {
    sS(e) && e.close();
}
function nr(e, t) {
    return ir(e, [], t);
}
function Bo(e) {
    if (e)
        throw new Error("Proxy has been released and is not useable");
}
function O0(e) {
    return pi(e, {
        type: "RELEASE"
    }).then(() => {
        B0(e);
    });
}
const va = /* @__PURE__ */ new WeakMap(), xa = "FinalizationRegistry" in globalThis && new FinalizationRegistry((e) => {
    const t = (va.get(e) || 0) - 1;
    va.set(e, t), t === 0 && O0(e);
});
function dS(e, t) {
    const n = (va.get(t) || 0) + 1;
    va.set(t, n), xa && xa.register(e, t, e);
}
function uS(e) {
    xa && xa.unregister(e);
}
function ir(e, t = [], n = function () {
}) {
    let i = !1;
    const l = new Proxy(n, {
        get(r, s) {
            if (Bo(i), s === aS)
                return () => {
                    uS(l), O0(e), i = !0;
                };
            if (s === "then") {
                if (t.length === 0)
                    return { then: () => l };
                const m = pi(e, {
                    type: "GET",
                    path: t.map((h) => h.toString())
                }).then(Un);
                return m.then.bind(m);
            }
            return ir(e, [...t, s]);
        },
        set(r, s, m) {
            Bo(i);
            const [h, p] = Ga(m);
            return pi(e, {
                type: "SET",
                path: [...t, s].map((b) => b.toString()),
                value: h
            }, p).then(Un);
        },
        apply(r, s, m) {
            Bo(i);
            const h = t[t.length - 1];
            if (h === oS)
                return pi(e, {
                    type: "ENDPOINT"
                }).then(Un);
            if (h === "bind")
                return ir(e, t.slice(0, -1));
            const [p, b] = Id(m);
            return pi(e, {
                type: "APPLY",
                path: t.map((g) => g.toString()),
                argumentList: p
            }, b).then(Un);
        },
        construct(r, s) {
            Bo(i);
            const [m, h] = Id(s);
            return pi(e, {
                type: "CONSTRUCT",
                path: t.map((p) => p.toString()),
                argumentList: m
            }, h).then(Un);
        }
    });
    return dS(l, e), l;
}
function mS(e) {
    return Array.prototype.concat.apply([], e);
}
function Id(e) {
    const t = e.map(Ga);
    return [t.map((n) => n[0]), mS(t.map((n) => n[1]))];
}
const A0 = /* @__PURE__ */ new WeakMap();
function hS(e, t) {
    return A0.set(e, t), e;
}
function pS(e) {
    return Object.assign(e, { [U0]: !0 });
}
function Ga(e) {
    for (const [t, n] of E0)
        if (n.canHandle(e)) {
            const [i, l] = n.serialize(e);
            return [
                {
                    type: "HANDLER",
                    name: t,
                    value: i
                },
                l
            ];
        }
    return [
        {
            type: "RAW",
            value: e
        },
        A0.get(e) || []
    ];
}
function Un(e) {
    switch (e.type) {
        case "HANDLER":
            return E0.get(e.name).deserialize(e.value);
        case "RAW":
            return e.value;
    }
}
function pi(e, t, n) {
    return new Promise((i) => {
        const l = bS();
        e.addEventListener("message", function r(s) {
            !s.data || !s.data.id || s.data.id !== l || (e.removeEventListener("message", r), i(s.data));
        }), e.start && e.start(), e.postMessage(Object.assign({ id: l }, t), n);
    });
}
function bS() {
    return new Array(4).fill(0).map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)).join("-");
}
function gS(e) {
    return new SharedWorker(
        "data:application/javascript;base64," + fS,
        {
            name: e == null ? void 0 : e.name
        }
    );
}
function yS(e) {
    let t;
    try {
        if (t = kd && (window.URL || window.webkitURL).createObjectURL(kd), !t)
            throw "";
        const n = new Worker(t, {
            name: e == null ? void 0 : e.name
        });
        return n.addEventListener("error", () => {
            (window.URL || window.webkitURL).revokeObjectURL(t);
        }), n;
    } catch {
        return new Worker(
            "data:application/javascript;base64," + Q0,
            {
                name: e == null ? void 0 : e.name
            }
        );
    } finally {
        t && (window.URL || window.webkitURL).revokeObjectURL(t);
    }
}
const Cd = "@dineug/erd-editor-schema-gc-worker?v3.2.3";
let ui = null;
function ZS() {
    if (ui)
        return ui;
    try {
        const e = new gS({ name: Cd });
        ui = nr(e.port);
    } catch {
        try {
            const t = new yS({ name: Cd });
            ui = nr(t);
        } catch {
            ui = new Tf();
        }
    }
    return ui;
}
const vS = 2;
let Oo = null, mi;
const xS = N`
  visibility: hidden;
  position: fixed;
  top: -100px;
  white-space: nowrap;
  font-family: var(--text-font-family);
  ${Lt.paragraph};
`;
function GS() {
    return Oo || (Oo = document.createElement("canvas"), Oo);
}
function XS() {
    const e = GS();
    return mi || (mi = e.getContext("2d"), mi && (mi.font = `400 12px ${K0}`), mi);
}
function WS() {
    const e = XS(), t = document.createElement("span");
    return t.className = xS.toString(), {
        span: t,
        toWidth: (i) => {
            let l = 0;
            return e ? l = e.measureText(i).width : (t.innerText = i, l = t.offsetWidth), Math.round(l) + vS;
        }
    };
}
const D0 = N`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`, VS = N`
  ${D0};
  background-color: var(--canvas-boundary-background);
  outline: none;

  &.none-focus {
    div[data-focus-border] {
      border-color: var(--placeholder) !important;
    }

    div[data-focus-border-bottom] {
      border-bottom-color: var(--placeholder) !important;
    }

    input[data-focus-border-bottom] {
      border-bottom-color: var(--placeholder) !important;
    }
  }
`, Pi = N`
  ${D0};
`, IS = Be(Hf);
function kS(e, t) {
    const i = { editorId: e.state.editor.id }, l = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set(), s = new cn(), m = new cn(), h = new cn();
    let p = !0;
    l.add(new ht((V) => e.subscribe((C) => V.next(C))).pipe(Il(Nf), hu([jn.shared]), gs, xg(m, h), gs, Dn((V) => zf(jn.shared, V.map((C) => {
        var L;
        const H = {
            ...C,
            meta: Object.assign({}, C.meta ?? {}, {
                ...i,
                nickname: (L = t == null ? void 0 : t.getNickname) == null ? void 0 : L.call(t)
            })
        };
        return IS(C.type) ? wf(jn.following, H) : H;
    })))).subscribe((V) => s.next(V)));
    const b = () => {
        const V = 0 < r.size;
        p && V ? m.next() : h.next();
    };
    return Object.freeze({
        connection: () => {
            p = !0, b();
        },
        disconnect: () => {
            p = !1, b();
        },
        dispatch: (V) => {
            e.dispatch(V);
        },
        dispatchSync: (V) => {
            e.dispatchSync(V);
        },
        subscribe: (V) => {
            const C = s.subscribe((H) => V(H));
            return r.add(C), b(), () => {
                C.unsubscribe(), r.delete(C), b();
            };
        },
        destroy: () => {
            Array.from(l).forEach((V) => V.unsubscribe()), Array.from(r).forEach((V) => V.unsubscribe()), l.clear(), r.clear(), e.destroy(), s.complete(), m.complete(), h.complete();
        }
    });
}
function CS() {
    const e = globalThis.matchMedia("(prefers-color-scheme: dark)"), t = Se({
        isDark: e.matches
    }, { shallow: !0 }), { addUnsubscribe: n } = Ge(), i = (l) => {
        t.isDark = l.matches;
    };
    return Te(() => {
        e.addEventListener("change", i), n(() => {
            e.removeEventListener("change", i);
        });
    }), { state: t };
}
const SS = Be([
    D.edit,
    D.stop,
    D.search,
    D.undo,
    D.redo,
    D.zoomIn,
    D.zoomOut
]), RS = Ng.filter((e) => !SS(e)), Sd = {
    grayColor: z0.slate,
    accentColor: J0.indigo,
    appearance: Tt.dark
}, LS = Be(w0), YS = Be(M0), KS = Be(kC);
function TS({ props: e, ctx: t, app: n, root: i }) {
    const { store: l, keyBindingMap: r, emitter: s, shortcut$: m, keydown$: h } = n, p = () => e.readonly, b = Se({
        options: { ...Sd },
        preset: vd(Sd),
        custom: {}
    }), g = Se({
        ...b.preset,
        ...b.custom
    }, { shallow: !0 }), Z = CS(), { addUnsubscribe: y } = Ge(), G = /* @__PURE__ */ new Set(), X = () => {
        p() || t.dispatchEvent(new CustomEvent("change"));
    }, W = /* @__PURE__ */ new Set([
        Pe(e).subscribe((V) => {
            V !== "systemDarkMode" || !e.systemDarkMode || (b.options.appearance = Z.state.isDark ? Tt.dark : Tt.light);
        }),
        Pe(Z.state).subscribe((V) => {
            V !== "isDark" || !e.systemDarkMode || (b.options.appearance = Z.state.isDark ? Tt.dark : Tt.light);
        }),
        Pe(b.options).subscribe(() => {
            Object.assign(b.preset, vd(b.options));
        }),
        Pe(b.preset).subscribe(() => {
            Object.assign(g, b.preset, b.custom);
        }),
        Pe(b).subscribe((V) => {
            V === "custom" && Object.assign(g, b.preset, b.custom);
        })
    ]);
    return Te(() => {
        y(l.change$.subscribe(X), s.on({
            setThemeOptions: ({ payload: V }) => {
                t.setPresetTheme(V), t.dispatchEvent(new CustomEvent("changePresetTheme", {
                    detail: Jf(b.options)
                }));
            }
        }));
    }), t.focus = () => {
        var V;
        (V = i.value) == null || V.focus();
    }, t.blur = () => {
        var V;
        t.focus(), (V = i.value) == null || V.blur();
    }, t.clear = () => {
        l.dispatchSync(Mf());
    }, t.destroy = () => {
        lo(n), Array.from(W).forEach((V) => V()), Array.from(G).forEach((V) => V.destroy()), W.clear(), G.clear();
    }, t.setInitialValue = (V) => {
        const C = zo(V);
        l.dispatchSync(io(ln(C) ? "{}" : C)), s.emit(kg());
    }, t.setPresetTheme = (V) => {
        En(V.grayColor) && LS(V.grayColor) && (b.options.grayColor = V.grayColor), En(V.accentColor) && YS(V.accentColor) && (b.options.accentColor = V.accentColor), En(V.appearance) && KS(V.appearance) && (b.options.appearance = V.appearance);
    }, t.setTheme = (V) => {
        const C = {};
        ck.forEach((H) => {
            const L = Jt(V, H);
            En(L) && Reflect.set(C, H, L);
        }), b.custom = C;
    }, t.setKeyBindingMap = (V) => {
        RS.forEach((C) => {
            const H = Jt(V, C);
            Ff(H) && Reflect.set(r, C, H);
        });
    }, t.setSchemaSQL = (V) => {
        const C = zo(V);
        ln(C) || l.dispatchSync(Ad(C));
    }, t.getSchemaSQL = (V) => {
        const H = $f(V ?? "") ? Jt(Uf, V ?? "") : void 0;
        return Ua(l.state, H);
    }, t.getSharedStore = (V) => {
        const C = (V == null ? void 0 : V.mouseTracker) ?? !0, H = kS(l, V);
        return G.add(H), C && s.emit(Rg()), Object.freeze({
            ...H,
            destroy: () => {
                H.destroy(), G.delete(H), G.size === 0 && s.emit(Lg());
            }
        });
    }, t.setDiffValue = (V) => {
        const C = zo(V);
        s.emit(gu({ value: ln(C) ? "{}" : C }));
    }, Object.defineProperty(t, "value", {
        get: () => ii(l.state),
        set: (V) => {
            const C = zo(V);
            l.dispatchSync(Od(ln(C) ? "{}" : C));
        }
    }), {
        theme: g,
        themeState: b,
        destroySet: W,
        hasDarkMode: () => b.options.appearance === Tt.dark
    };
}
const HS = (e, t) => {
    const n = WS(), i = () => e.readonly, l = ao({ toWidth: n.toWidth }, { getReadonly: i }), r = bo(t, Li, l), s = Ue();
    iS(t, s);
    const { theme: m, themeState: h, destroySet: p, hasDarkMode: b } = TS({
        props: e,
        ctx: t,
        app: l,
        root: s
    }), { store: g, keydown$: Z, emitter: y } = l, { addUnsubscribe: G } = Ge(), X = Se({
        isFocus: !1,
        mouseTracking: !1
    });
    p.add(r.destroy), p.add(y.on({
        mouseTrackerStart: () => {
            X.mouseTracking = !0;
        },
        mouseTrackerEnd: () => {
            X.mouseTracking = !1;
        }
    }));
    const W = () => {
        setTimeout(() => {
            document.activeElement !== t && t.focus();
        }, 1);
    }, V = (z) => {
        Z.next(z);
    };
    let C = !1, H = -1;
    const L = () => {
        C = !0, X.isFocus = !0;
    }, E = () => {
        C = !1, clearTimeout(H), H = setTimeout(() => {
            X.isFocus = C;
        }, 10);
    }, J = (z) => {
        y.emit(Vg({ event: z }));
    }, K = (z) => {
        y.emit(Ig({ event: z }));
    }, Y = () => {
        var z;
        (z = ZS()) == null || z.run(ii(g.state)).then((M) => {
            (M.tableIds.length || M.tableColumnIds.length || M.relationshipIds.length || M.indexIds.length || M.indexColumnIds.length || M.memoIds.length) && (Ef(g.state, M), g.dispatchSync(Pf()), t.dispatchEvent(new CustomEvent("change")));
        });
    };
    Te(() => {
        t.focus();
        const z = s.value, M = new ResizeObserver((U) => {
            for (const j of U) {
                const { width: q, height: ne } = j.contentRect;
                g.dispatch(rn({ width: q, height: ne - Sl }));
            }
        });
        M.observe(z), G(() => {
            M.unobserve(z), M.disconnect();
        }, st(t, Ki.type).pipe(dr(50)).subscribe(W), st(t, Hu.type).subscribe(t.focus), y.on({ schemaGC: Y }));
    });
    const T = (z) => {
        const M = z.target;
        if (!M)
            return;
        const { store: U } = l;
        U.state.editor.openMap[ce.themeBuilder] && !M.closest(".toolbar") && !M.closest(".theme-builder") && U.dispatch(ct({ [ce.themeBuilder]: !1 }));
    };
    return () => {
        const { settings: z } = g.state, M = b();
        return I`
      <${XI} />
      <${dk} theme=${m} />
      <div
        ${De(s)}
        class=${[
                "root",
                VS,
                { dark: M, "none-focus": !X.isFocus }
            ]}
        tabindex="-1"
        @keydown=${V}
        @focus=${L}
        @focusin=${L}
        @focusout=${E}
        @copy=${J}
        @paste=${K}
        @mousedown=${T}
      >
        <${FC}
          enableThemeBuilder=${e.enableThemeBuilder}
          readonly=${e.readonly}
        />
        ${Ud(z.canvasType === ue.ERD ? I`
                <div class=${Pi}>
                  <${pI}
                    isDarkMode=${M}
                    mouseTracking=${X.mouseTracking}
                  />
                </div>
              ` : null)}
        ${z.canvasType === ue.visualization ? I`<div class=${Pi}><${QC} /></div>` : z.canvasType === ue.schemaSQL ? I`
                <div class=${Pi}>
                  <${R0} isDarkMode=${M} />
                </div>
              `: null}
        <${wC} />
        ${n.span}
      </div>
    `;
    };
};
//FLEXYGO CHANGES
//change the shadowroot from "closed" to "open"
jf("erd-editor", {
    shadow: "open",
    observedProps: {
        readonly: Boolean,
        systemDarkMode: Boolean,
        enableThemeBuilder: Boolean
    },
    render: HS
});
export {
    JS as setExportFileCallback,
    MS as setGetShikiServiceCallback,
};