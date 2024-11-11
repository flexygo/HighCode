/*!
 * @dineug/erd-editor
 * @version 3.2.3 | Sat Apr 13 2024
 * @author SeungHwan-Lee <dineug2@gmail.com>
 * @license MIT
 */
/*!
 * @dineug/erd-editor-schema
 * @version 0.1.0 | Sat Apr 13 2024
 * @author SeungHwan-Lee <dineug2@gmail.com>
 * @license MIT
 */
//FLEXYGO CHANGES
const measures = {
    table: {
        width: 218,
        nameWidth: 180,
        titleFontSize: 21,
    },
    relationship: {
        path_height: 30,
        path_end_height: 50, //path_height + 20
        path_line_height: 28,
        line_size: 8,
        line_height: 16,
        circle_height: 23, //with for a circle of 4 ratio
        stroke_width: 2,
        dash_array: 0,
        circle_ratio: 6
    }
}
var Bg = typeof global == "object" && global && global.Object === Object && global;
const jg = Bg;
var Ug = typeof self == "object" && self && self.Object === Object && self, Wg = jg || Ug || Function("return this")();
const sc = Wg;
var Fg = sc.Symbol;
const sn = Fg;
var Fd = Object.prototype, qg = Fd.hasOwnProperty, Vg = Fd.toString, ur = sn ? sn.toStringTag : void 0;
function Hg(e) {
  var t = qg.call(e, ur), n = e[ur];
  try {
    e[ur] = void 0;
    var o = !0;
  } catch {
  }
  var r = Vg.call(e);
  return o && (t ? e[ur] = n : delete e[ur]), r;
}
var Zg = Object.prototype, zg = Zg.toString;
function Gg(e) {
  return zg.call(e);
}
var Yg = "[object Null]", Kg = "[object Undefined]", Bu = sn ? sn.toStringTag : void 0;
function ac(e) {
  return e == null ? e === void 0 ? Kg : Yg : Bu && Bu in Object(e) ? Hg(e) : Gg(e);
}
function ya(e) {
  return e != null && typeof e == "object";
}
var Qg = "[object Symbol]";
function lc(e) {
  return typeof e == "symbol" || ya(e) && ac(e) == Qg;
}
function qd(e, t) {
  for (var n = -1, o = e == null ? 0 : e.length, r = Array(o); ++n < o; )
    r[n] = t(e[n], n, e);
  return r;
}
var Jg = Array.isArray;
const fi = Jg;
var Xg = 1 / 0, ju = sn ? sn.prototype : void 0, Uu = ju ? ju.toString : void 0;
function Vd(e) {
  if (typeof e == "string")
    return e;
  if (fi(e))
    return qd(e, Vd) + "";
  if (lc(e))
    return Uu ? Uu.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -Xg ? "-0" : t;
}
function qs(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
function Hd(e) {
  return e;
}
var ev = "[object AsyncFunction]", tv = "[object Function]", nv = "[object GeneratorFunction]", ov = "[object Proxy]";
function Zd(e) {
  if (!qs(e))
    return !1;
  var t = ac(e);
  return t == tv || t == nv || t == ev || t == ov;
}
var rv = sc["__core-js_shared__"];
const el = rv;
var Wu = function() {
  var e = /[^.]+$/.exec(el && el.keys && el.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function iv(e) {
  return !!Wu && Wu in e;
}
var sv = Function.prototype, av = sv.toString;
function lv(e) {
  if (e != null) {
    try {
      return av.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var cv = /[\\^$.*+?()[\]{}|]/g, uv = /^\[object .+?Constructor\]$/, fv = Function.prototype, dv = Object.prototype, hv = fv.toString, mv = dv.hasOwnProperty, pv = RegExp(
  "^" + hv.call(mv).replace(cv, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function yv(e) {
  if (!qs(e) || iv(e))
    return !1;
  var t = Zd(e) ? pv : uv;
  return t.test(lv(e));
}
function gv(e, t) {
  return e == null ? void 0 : e[t];
}
function cc(e, t) {
  var n = gv(e, t);
  return yv(n) ? n : void 0;
}
function vv(e, t, n) {
  switch (n.length) {
    case 0:
      return e.call(t);
    case 1:
      return e.call(t, n[0]);
    case 2:
      return e.call(t, n[0], n[1]);
    case 3:
      return e.call(t, n[0], n[1], n[2]);
  }
  return e.apply(t, n);
}
var bv = 800, Iv = 16, Tv = Date.now;
function wv(e) {
  var t = 0, n = 0;
  return function() {
    var o = Tv(), r = Iv - (o - n);
    if (n = o, r > 0) {
      if (++t >= bv)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
function Cv(e) {
  return function() {
    return e;
  };
}
var Ov = function() {
  try {
    var e = cc(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}();
const Vs = Ov;
var Sv = Vs ? function(e, t) {
  return Vs(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: Cv(t),
    writable: !0
  });
} : Hd;
const Ev = Sv;
var xv = wv(Ev);
const zd = xv;
function $v(e, t, n, o) {
  for (var r = e.length, i = n + (o ? 1 : -1); o ? i-- : ++i < r; )
    if (t(e[i], i, e))
      return i;
  return -1;
}
function Av(e) {
  return e !== e;
}
function Nv(e, t, n) {
  for (var o = n - 1, r = e.length; ++o < r; )
    if (e[o] === t)
      return o;
  return -1;
}
function Mv(e, t, n) {
  return t === t ? Nv(e, t, n) : $v(e, Av, n);
}
function kv(e, t) {
  var n = e == null ? 0 : e.length;
  return !!n && Mv(e, t, 0) > -1;
}
var Dv = 9007199254740991, Lv = /^(?:0|[1-9]\d*)$/;
function Gd(e, t) {
  var n = typeof e;
  return t = t ?? Dv, !!t && (n == "number" || n != "symbol" && Lv.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function Rv(e, t, n) {
  t == "__proto__" && Vs ? Vs(e, t, {
    configurable: !0,
    enumerable: !0,
    value: n,
    writable: !0
  }) : e[t] = n;
}
function Yd(e, t) {
  return e === t || e !== e && t !== t;
}
var _v = Object.prototype, Pv = _v.hasOwnProperty;
function Bv(e, t, n) {
  var o = e[t];
  (!(Pv.call(e, t) && Yd(o, n)) || n === void 0 && !(t in e)) && Rv(e, t, n);
}
var Fu = Math.max;
function Kd(e, t, n) {
  return t = Fu(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var o = arguments, r = -1, i = Fu(o.length - t, 0), s = Array(i); ++r < i; )
      s[r] = o[t + r];
    r = -1;
    for (var a = Array(t + 1); ++r < t; )
      a[r] = o[r];
    return a[t] = n(s), vv(e, this, a);
  };
}
function jv(e, t) {
  return zd(Kd(e, t, Hd), e + "");
}
var Uv = 9007199254740991;
function Qd(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Uv;
}
function Wv(e) {
  return e != null && Qd(e.length) && !Zd(e);
}
var Fv = "[object Arguments]";
function qu(e) {
  return ya(e) && ac(e) == Fv;
}
var Jd = Object.prototype, qv = Jd.hasOwnProperty, Vv = Jd.propertyIsEnumerable, Hv = qu(/* @__PURE__ */ function() {
  return arguments;
}()) ? qu : function(e) {
  return ya(e) && qv.call(e, "callee") && !Vv.call(e, "callee");
};
const Xd = Hv;
function Zv(e) {
  return function(t) {
    return e(t);
  };
}
var zv = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Gv = /^\w*$/;
function Yv(e, t) {
  if (fi(e))
    return !1;
  var n = typeof e;
  return n == "number" || n == "symbol" || n == "boolean" || e == null || lc(e) ? !0 : Gv.test(e) || !zv.test(e) || t != null && e in Object(t);
}
var Kv = cc(Object, "create");
const Xr = Kv;
function Qv() {
  this.__data__ = Xr ? Xr(null) : {}, this.size = 0;
}
function Jv(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var Xv = "__lodash_hash_undefined__", eb = Object.prototype, tb = eb.hasOwnProperty;
function nb(e) {
  var t = this.__data__;
  if (Xr) {
    var n = t[e];
    return n === Xv ? void 0 : n;
  }
  return tb.call(t, e) ? t[e] : void 0;
}
var ob = Object.prototype, rb = ob.hasOwnProperty;
function ib(e) {
  var t = this.__data__;
  return Xr ? t[e] !== void 0 : rb.call(t, e);
}
var sb = "__lodash_hash_undefined__";
function ab(e, t) {
  var n = this.__data__;
  return this.size += this.has(e) ? 0 : 1, n[e] = Xr && t === void 0 ? sb : t, this;
}
function Bn(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var o = e[t];
    this.set(o[0], o[1]);
  }
}
Bn.prototype.clear = Qv;
Bn.prototype.delete = Jv;
Bn.prototype.get = nb;
Bn.prototype.has = ib;
Bn.prototype.set = ab;
function lb() {
  this.__data__ = [], this.size = 0;
}
function ga(e, t) {
  for (var n = e.length; n--; )
    if (Yd(e[n][0], t))
      return n;
  return -1;
}
var cb = Array.prototype, ub = cb.splice;
function fb(e) {
  var t = this.__data__, n = ga(t, e);
  if (n < 0)
    return !1;
  var o = t.length - 1;
  return n == o ? t.pop() : ub.call(t, n, 1), --this.size, !0;
}
function db(e) {
  var t = this.__data__, n = ga(t, e);
  return n < 0 ? void 0 : t[n][1];
}
function hb(e) {
  return ga(this.__data__, e) > -1;
}
function mb(e, t) {
  var n = this.__data__, o = ga(n, e);
  return o < 0 ? (++this.size, n.push([e, t])) : n[o][1] = t, this;
}
function Vo(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var o = e[t];
    this.set(o[0], o[1]);
  }
}
Vo.prototype.clear = lb;
Vo.prototype.delete = fb;
Vo.prototype.get = db;
Vo.prototype.has = hb;
Vo.prototype.set = mb;
var pb = cc(sc, "Map");
const yb = pb;
function gb() {
  this.size = 0, this.__data__ = {
    hash: new Bn(),
    map: new (yb || Vo)(),
    string: new Bn()
  };
}
function vb(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function va(e, t) {
  var n = e.__data__;
  return vb(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
function bb(e) {
  var t = va(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function Ib(e) {
  return va(this, e).get(e);
}
function Tb(e) {
  return va(this, e).has(e);
}
function wb(e, t) {
  var n = va(this, e), o = n.size;
  return n.set(e, t), this.size += n.size == o ? 0 : 1, this;
}
function un(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var o = e[t];
    this.set(o[0], o[1]);
  }
}
un.prototype.clear = gb;
un.prototype.delete = bb;
un.prototype.get = Ib;
un.prototype.has = Tb;
un.prototype.set = wb;
var Cb = "Expected a function";
function uc(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(Cb);
  var n = function() {
    var o = arguments, r = t ? t.apply(this, o) : o[0], i = n.cache;
    if (i.has(r))
      return i.get(r);
    var s = e.apply(this, o);
    return n.cache = i.set(r, s) || i, s;
  };
  return n.cache = new (uc.Cache || un)(), n;
}
uc.Cache = un;
var Ob = 500;
function Sb(e) {
  var t = uc(e, function(o) {
    return n.size === Ob && n.clear(), o;
  }), n = t.cache;
  return t;
}
var Eb = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, xb = /\\(\\)?/g, $b = Sb(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(Eb, function(n, o, r, i) {
    t.push(r ? i.replace(xb, "$1") : o || n);
  }), t;
});
const Ab = $b;
function Nb(e) {
  return e == null ? "" : Vd(e);
}
function ba(e, t) {
  return fi(e) ? e : Yv(e, t) ? [e] : Ab(Nb(e));
}
var Mb = 1 / 0;
function fc(e) {
  if (typeof e == "string" || lc(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -Mb ? "-0" : t;
}
function kb(e, t) {
  t = ba(t, e);
  for (var n = 0, o = t.length; e != null && n < o; )
    e = e[fc(t[n++])];
  return n && n == o ? e : void 0;
}
function Db(e, t) {
  for (var n = -1, o = t.length, r = e.length; ++n < o; )
    e[r + n] = t[n];
  return e;
}
var Vu = sn ? sn.isConcatSpreadable : void 0;
function Lb(e) {
  return fi(e) || Xd(e) || !!(Vu && e && e[Vu]);
}
function dc(e, t, n, o, r) {
  var i = -1, s = e.length;
  for (n || (n = Lb), r || (r = []); ++i < s; ) {
    var a = e[i];
    t > 0 && n(a) ? t > 1 ? dc(a, t - 1, n, o, r) : Db(r, a) : o || (r[r.length] = a);
  }
  return r;
}
function Rb(e) {
  var t = e == null ? 0 : e.length;
  return t ? dc(e, 1) : [];
}
function _b(e) {
  return zd(Kd(e, void 0, Rb), e + "");
}
var Pb = "__lodash_hash_undefined__";
function Bb(e) {
  return this.__data__.set(e, Pb), this;
}
function jb(e) {
  return this.__data__.has(e);
}
function Hs(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.__data__ = new un(); ++t < n; )
    this.add(e[t]);
}
Hs.prototype.add = Hs.prototype.push = Bb;
Hs.prototype.has = jb;
function Ub(e, t) {
  return e.has(t);
}
function Wb(e, t) {
  return e != null && t in Object(e);
}
function Fb(e, t, n) {
  t = ba(t, e);
  for (var o = -1, r = t.length, i = !1; ++o < r; ) {
    var s = fc(t[o]);
    if (!(i = e != null && n(e, s)))
      break;
    e = e[s];
  }
  return i || ++o != r ? i : (r = e == null ? 0 : e.length, !!r && Qd(r) && Gd(s, r) && (fi(e) || Xd(e)));
}
function qb(e, t) {
  return e != null && Fb(e, t, Wb);
}
function Hu(e) {
  return ya(e) && Wv(e);
}
function Vb(e, t, n) {
  for (var o = -1, r = e == null ? 0 : e.length; ++o < r; )
    if (n(t, e[o]))
      return !0;
  return !1;
}
var Hb = 200;
function Zb(e, t, n, o) {
  var r = -1, i = kv, s = !0, a = e.length, l = [], c = t.length;
  if (!a)
    return l;
  n && (t = qd(t, Zv(n))), o ? (i = Vb, s = !1) : t.length >= Hb && (i = Ub, s = !1, t = new Hs(t));
  e:
    for (; ++r < a; ) {
      var u = e[r], f = n == null ? u : n(u);
      if (u = o || u !== 0 ? u : 0, s && f === f) {
        for (var d = c; d--; )
          if (t[d] === f)
            continue e;
        l.push(u);
      } else
        i(t, f, o) || l.push(u);
    }
  return l;
}
var zb = jv(function(e, t) {
  return Hu(e) ? Zb(e, dc(t, 1, Hu, !0)) : [];
});
const hc = zb;
function Gb(e, t, n, o) {
  if (!qs(e))
    return e;
  t = ba(t, e);
  for (var r = -1, i = t.length, s = i - 1, a = e; a != null && ++r < i; ) {
    var l = fc(t[r]), c = n;
    if (l === "__proto__" || l === "constructor" || l === "prototype")
      return e;
    if (r != s) {
      var u = a[l];
      c = o ? o(u, l, a) : void 0, c === void 0 && (c = qs(u) ? u : Gd(t[r + 1]) ? [] : {});
    }
    Bv(a, l, c), a = a[l];
  }
  return e;
}
function Yb(e, t, n) {
  for (var o = -1, r = t.length, i = {}; ++o < r; ) {
    var s = t[o], a = kb(e, s);
    n(a, s) && Gb(i, ba(s, e), a);
  }
  return i;
}
function Kb(e, t) {
  return Yb(e, t, function(n, o) {
    return qb(e, o);
  });
}
var Qb = _b(function(e, t) {
  return e == null ? {} : Kb(e, t);
});
const Jb = Qb, di = (e) => (t) => typeof t === e, Xb = di("object"), Ve = di("boolean"), ne = di("number"), G = di("string"), e0 = di("undefined"), eh = (e) => e === null, Be = (e) => eh(e) || e0(e), { isArray: Te } = Array, ut = (e) => Xb(e) && !eh(e) && !Te(e), t0 = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let n0 = (e, t, n) => {
  let o = (2 << Math.log(e.length - 1) / Math.LN2) - 1, r = -~(1.6 * o * t / e.length);
  return (i = t) => {
    let s = "";
    for (; ; ) {
      let a = n(r), l = r;
      for (; l--; )
        if (s += e[a[l] & o] || "", s.length === i)
          return s;
    }
  };
};
const o0 = n0(t0, 21, (e) => {
  let t = globalThis.crypto;
  return t === void 0 && (t = require("node:crypto").webcrypto), t.getRandomValues(new Uint8Array(e));
}), hi = (e, t) => (n) => Math.min(Math.max(n, e), t);
function w(e, t, n) {
  return (o) => {
    if (!n)
      return;
    const r = n[o];
    e(r) && (t[o] = r);
  };
}
function We(e) {
  return (t) => G(t) && e.includes(t);
}
function It(e) {
  return (t) => ne(t) && e.includes(t);
}
function Le(e, t, n) {
  return Reflect.get(e, t) ?? n;
}
function Ho() {
  const e = Date.now();
  return {
    updateAt: e,
    createAt: e
  };
}
function Zo(e, t) {
  const n = w(ne, e, t);
  n("updateAt"), n("createAt");
}
const r0 = () => ({
  tableIds: [],
  relationshipIds: [],
  indexIds: [],
  memoIds: []
});
function i0(e) {
  const t = r0();
  if (!ut(e) || Be(e))
    return t;
  const n = w(Te, t, e);
  return n("tableIds"), n("relationshipIds"), n("indexIds"), n("memoIds"), t;
}
const th = () => ({
  id: "",
  name: "",
  tableId: "",
  indexColumnIds: [],
  seqIndexColumnIds: [],
  unique: !1,
  meta: Ho()
});
function s0(e) {
  const t = {};
  if (!ut(e) || Be(e))
    return t;
  for (const n of Object.values(e)) {
    if (!n)
      continue;
    const o = th(), r = w(G, o, n), i = w(Ve, o, n), s = w(Te, o, n);
    r("id"), r("name"), r("tableId"), i("unique"), s("indexColumnIds"), s("seqIndexColumnIds"), Zo(o.meta, n.meta), o.id && (t[o.id] = o);
  }
  return t;
}
const mc = {
  ASC: (
    /*  */
    1
  ),
  DESC: (
    /* */
    2
  )
}, nh = Object.values(mc), oh = () => ({
  id: "",
  indexId: "",
  columnId: "",
  orderType: mc.ASC,
  meta: Ho()
});
function a0(e) {
  const t = {};
  if (!ut(e) || Be(e))
    return t;
  for (const n of Object.values(e)) {
    if (!n)
      continue;
    const o = oh(), r = w(G, o, n);
    r("id"), r("indexId"), r("columnId"), w(It(nh), o, n)("orderType"), Zo(o.meta, n.meta), o.id && (t[o.id] = o);
  }
  return t;
}
const l0 = () => ({});
function c0(e) {
  const t = l0();
  if (!ut(e) || Be(e))
    return t;
  for (const [n, o] of Object.entries(e)) {
    if (!Te(o) || o.length !== 4)
      continue;
    const [r, i, s, a] = o;
    if (G(r) && ne(i) && ne(s) && ut(a)) {
      const l = {}, c = w(ne, l, a);
      Object.keys(a).forEach(c), t[n] = [r, i, s, l];
    }
  }
  return t;
}
const rh = () => ({
  id: "",
  value: "",
  ui: {
    x: 200,
    y: 100,
    zIndex: 2,
    width: 116,
    height: 100,
    color: ""
  },
  meta: Ho()
});
function u0(e) {
  const t = {};
  if (!ut(e) || Be(e))
    return t;
  for (const n of Object.values(e)) {
    if (!n)
      continue;
    const o = rh(), r = w(G, o, n), i = w(ne, o.ui, n.ui), s = w(G, o.ui, n.ui);
    r("id"), r("value"), s("color"), i("x"), i("y"), i("zIndex"), i("width"), i("height"), Zo(o.meta, n.meta), o.id && (t[o.id] = o);
  }
  return t;
}
const pc = {
  // ZeroOneN: /* */ 0b0000000000000000000000000000001,
  ZeroOne: (
    /*  */
    2
  ),
  ZeroN: (
    /*    */
    4
  ),
  OneOnly: (
    /*  */
    8
  ),
  OneN: (
    /*     */
    16
  )
  // One: /*      */ 0b0000000000000000000000000100000,
  // N: /*        */ 0b0000000000000000000000001000000,
}, ih = Object.values(pc), yc = {
  ring: (
    /* */
    1
  ),
  dash: (
    /* */
    2
  )
}, sh = Object.values(yc), Zs = {
  left: (
    /*   */
    1
  ),
  right: (
    /*  */
    2
  ),
  top: (
    /*    */
    4
  ),
  bottom: (
    /* */
    8
  )
}, Ol = Object.values(Zs), ah = () => ({
  id: "",
  identification: !1,
  relationshipType: pc.ZeroN,
  startRelationshipType: yc.dash,
  start: {
    tableId: "",
    columnIds: [],
    x: 0,
    y: 0,
    direction: Zs.bottom
  },
  end: {
    tableId: "",
    columnIds: [],
    x: 0,
    y: 0,
    direction: Zs.bottom
  },
  meta: Ho()
});
function f0(e) {
  const t = {};
  if (!ut(e) || Be(e))
    return t;
  for (const n of Object.values(e)) {
    if (!n)
      continue;
    const o = ah(), r = w(G, o, n), i = w(Ve, o, n), s = w(ne, o.start, n.start), a = w(G, o.start, n.start), l = w(ne, o.end, n.end), c = w(G, o.end, n.end);
    r("id"), i("identification"), w(It(ih), o, n)("relationshipType"), w(It(sh), o, n)("startRelationshipType"), a("tableId"), s("x"), s("y"), w(It(Ol), o.start, n.start)("direction"), w(Te, o.start, n.start)("columnIds"), c("tableId"), l("x"), l("y"), w(It(Ol), o.end, n.end)("direction"), w(Te, o.end, n.end)("columnIds"), Zo(o.meta, n.meta), o.id && (t[o.id] = o);
  }
  return t;
}
const gc = {
  ERD: "ERD",
  visualization: "@dineug/erd-editor/builtin-visualization",
  schemaSQL: "@dineug/erd-editor/builtin-schema-sql",
  settings: "settings"
}, d0 = Object.values(gc), Yt = {
  tableComment: (
    /*        */
    1
  ),
  columnComment: (
    /*       */
    2
  ),
  columnDataType: (
    /*      */
    4
  ),
  columnDefault: (
    /*       */
    8
  ),
  columnAutoIncrement: (
    /* */
    16
  ),
  columnPrimaryKey: (
    /*    */
    32
  ),
  columnUnique: (
    /*        */
    64
  ),
  columnNotNull: (
    /*       */
    128
  ),
  relationship: (
    /*        */
    256
  )
}, At = {
  columnName: (
    /*          */
    1
  ),
  columnDataType: (
    /*      */
    2
  ),
  columnNotNull: (
    /*       */
    4
  ),
  columnUnique: (
    /*        */
    8
  ),
  columnAutoIncrement: (
    /* */
    16
  ),
  columnDefault: (
    /*       */
    32
  ),
  columnComment: (
    /*       */
    64
  )
}, Sl = Object.values(At), vc = {
  MariaDB: (
    /*    */
    1
  ),
  MSSQL: (
    /*      */
    2
  ),
  MySQL: (
    /*      */
    4
  ),
  Oracle: (
    /*     */
    8
  ),
  PostgreSQL: (
    /* */
    16
  ),
  SQLite: (
    /*     */
    32
  )
}, lh = Object.values(vc), bc = {
  GraphQL: (
    /*    */
    1
  ),
  csharp: (
    /*     */
    2
  ),
  Java: (
    /*       */
    4
  ),
  Kotlin: (
    /*     */
    8
  ),
  TypeScript: (
    /* */
    16
  ),
  JPA: (
    /*        */
    32
  ),
  Scala: (
    /*      */
    64
  )
}, ch = Object.values(bc), zs = {
  none: (
    /*       */
    1
  ),
  camelCase: (
    /*  */
    2
  ),
  pascalCase: (
    /* */
    4
  ),
  snakeCase: (
    /*  */
    8
  )
}, El = Object.values(zs), Ic = {
  none: (
    /*        */
    1
  ),
  doubleQuote: (
    /* */
    2
  ),
  singleQuote: (
    /* */
    4
  ),
  backtick: (
    /*    */
    8
  )
}, uh = Object.values(Ic), h0 = {
  scroll: (
    /*    */
    1
  ),
  zoomLevel: (
    /* */
    2
  )
}, fh = 0.1, dh = 1, hh = 2e3, mh = 2e4, m0 = Yt.tableComment | Yt.columnComment | Yt.columnDataType | Yt.columnDefault | Yt.columnPrimaryKey | Yt.columnNotNull | Yt.relationship, p0 = () => ({
  width: 2e3,
  height: 2e3,
  scrollTop: 0,
  scrollLeft: 0,
  zoomLevel: 1,
  show: m0,
  database: vc.MySQL,
  databaseName: "",
  canvasType: gc.ERD,
  language: bc.GraphQL,
  tableNameCase: zs.pascalCase,
  columnNameCase: zs.camelCase,
  bracketType: Ic.none,
  relationshipDataTypeSync: !0,
  relationshipOptimization: !1,
  columnOrder: [
    At.columnName,
    At.columnDataType,
    At.columnNotNull,
    At.columnUnique,
    At.columnAutoIncrement,
    At.columnDefault,
    At.columnComment
  ],
  maxWidthComment: -1,
  ignoreSaveSettings: 0
}), Zu = hi(hh, mh), y0 = hi(fh, dh), g0 = hi(60, 200);
function v0(e) {
  const t = p0();
  if (!ut(e) || Be(e))
    return t;
  const n = w(ne, t, e), o = w(G, t, e), r = w(Ve, t, e);
  return ne(e.width) && (t.width = Zu(e.width)), ne(e.height) && (t.height = Zu(e.height)), ne(e.zoomLevel) && (t.zoomLevel = y0(e.zoomLevel)), ne(e.maxWidthComment) && e.maxWidthComment !== -1 && (t.maxWidthComment = g0(e.maxWidthComment)), n("scrollTop"), n("scrollLeft"), n("show"), n("ignoreSaveSettings"), o("databaseName"), o("canvasType"), r("relationshipDataTypeSync"), r("relationshipOptimization"), w(It(lh), t, e)("database"), w(It(ch), t, e)("language"), w(It(El), t, e)("tableNameCase"), w(It(El), t, e)("columnNameCase"), w(It(uh), t, e)("bracketType"), Te(e.columnOrder) && Sl.length === e.columnOrder.length && hc(Sl, e.columnOrder).length === 0 && (t.columnOrder = e.columnOrder), t;
}
const ph = () => ({
  id: "",
  name: "",
  comment: "",
  columnIds: [],
  seqColumnIds: [],
  ui: {
    x: 200,
    y: 100,
    zIndex: 2,
    widthName: 60,
    widthComment: 60,
    color: ""
  },
  meta: Ho()
});
function b0(e) {
  const t = {};
  if (!ut(e) || Be(e))
    return t;
  for (const n of Object.values(e)) {
    if (!n)
      continue;
    const o = ph(), r = w(G, o, n), i = w(Te, o, n), s = w(ne, o.ui, n.ui), a = w(G, o.ui, n.ui);
    r("id"), r("name"), r("comment"), i("columnIds"), i("seqColumnIds"), a("color"), s("x"), s("y"), s("zIndex"), s("widthName"), s("widthComment"), Zo(o.meta, n.meta), o.id && (t[o.id] = o);
  }
  return t;
}
const yh = () => ({
  id: "",
  tableId: "",
  name: "",
  comment: "",
  dataType: "",
  default: "",
  options: 0,
  ui: {
    keys: 0,
    widthName: 60,
    widthComment: 60,
    widthDataType: 60,
    widthDefault: 60
  },
  meta: Ho()
});
function I0(e) {
  const t = {};
  if (!ut(e) || Be(e))
    return t;
  for (const n of Object.values(e)) {
    if (!n)
      continue;
    const o = yh(), r = w(G, o, n), i = w(ne, o, n), s = w(ne, o.ui, n.ui);
    r("id"), r("tableId"), r("name"), r("comment"), r("dataType"), r("default"), i("options"), s("keys"), s("widthName"), s("widthComment"), s("widthDataType"), s("widthDefault"), Zo(o.meta, n.meta), o.id && (t[o.id] = o);
  }
  return t;
}
function Vn(e) {
  var t, n, o, r, i, s;
  const a = e, l = v0(a.settings), c = i0(a.doc), u = c0(a.lww), f = b0((t = a.collections) == null ? void 0 : t.tableEntities), d = I0((n = a.collections) == null ? void 0 : n.tableColumnEntities), h = f0((o = a.collections) == null ? void 0 : o.relationshipEntities), p = s0((r = a.collections) == null ? void 0 : r.indexEntities), g = a0((i = a.collections) == null ? void 0 : i.indexColumnEntities), v = u0((s = a.collections) == null ? void 0 : s.memoEntities);
  return {
    $schema: "https://raw.githubusercontent.com/dineug/erd-editor/main/json-schema/schema.json",
    version: "3.0.0",
    settings: l,
    doc: c,
    collections: {
      tableEntities: f,
      tableColumnEntities: d,
      relationshipEntities: h,
      indexEntities: p,
      indexColumnEntities: g,
      memoEntities: v
    },
    lww: u
  };
}
const T0 = {
  autoIncrement: (
    /* */
    1
  ),
  primaryKey: (
    /*    */
    2
  ),
  unique: (
    /*        */
    4
  ),
  notNull: (
    /*       */
    8
  )
}, w0 = {
  primaryKey: (
    /* */
    1
  ),
  foreignKey: (
    /* */
    2
  )
}, O = {
  CanvasType: gc,
  CanvasTypeList: d0,
  Show: Yt,
  ColumnType: At,
  ColumnTypeList: Sl,
  Database: vc,
  DatabaseList: lh,
  Language: bc,
  LanguageList: ch,
  NameCase: zs,
  NameCaseList: El,
  BracketType: Ic,
  BracketTypeList: uh,
  RelationshipType: pc,
  RelationshipTypeList: ih,
  StartRelationshipType: yc,
  StartRelationshipTypeList: sh,
  Direction: Zs,
  DirectionList: Ol,
  ColumnOption: T0,
  ColumnUIKey: w0,
  OrderType: mc,
  OrderTypeList: nh,
  SaveSettingType: h0,
  CANVAS_SIZE_MAX: mh,
  CANVAS_SIZE_MIN: hh,
  CANVAS_ZOOM_MAX: dh,
  CANVAS_ZOOM_MIN: fh
};
function C0(e) {
  const t = Vn({});
  return O0(t.settings, e.canvas), S0(t, e.table), E0(t, e.memo), x0(t, e.relationship), t;
}
function O0(e, t) {
  e.width = t.width, e.height = t.height, e.scrollTop = t.scrollTop, e.scrollLeft = t.scrollLeft, e.zoomLevel = t.zoomLevel, e.databaseName = t.databaseName, e.canvasType = O.CanvasType.ERD, e.show = Object.keys(t.show).reduce((o, r) => {
    if (Le(t.show, r, !1)) {
      const i = Le(O.Show, r, 0);
      return o | i;
    }
    return o;
  }, 0), e.database = Reflect.get(O.Database, t.database) ?? O.Database.MySQL, e.language = t.language === "C#" ? O.Language.csharp : Le(O.Language, t.language, O.Language.GraphQL), e.tableNameCase = Le(O.NameCase, t.tableCase, O.NameCase.pascalCase), e.columnNameCase = Le(O.NameCase, t.columnCase, O.NameCase.camelCase), e.bracketType = Le(O.BracketType, t.bracketType, O.BracketType.none), e.relationshipDataTypeSync = t.setting.relationshipDataTypeSync, e.relationshipOptimization = t.setting.relationshipOptimization;
  const n = t.setting.columnOrder.map((o) => O.ColumnType[o]);
  hc(O.ColumnTypeList, n).length === 0 && (e.columnOrder = n);
}
function S0(e, t) {
  const n = t.tables.filter(({ id: r }) => !!r), o = t.indexes.filter(({ id: r }) => !!r);
  e.doc.tableIds = n.map(({ id: r }) => r), e.doc.indexIds = o.map(({ id: r }) => r);
  for (const r of n) {
    const i = ph();
    i.id = r.id, i.name = r.name, i.comment = r.comment, i.columnIds = r.columns.map(({ id: s }) => s), i.seqColumnIds = [...i.columnIds], i.ui.y = r.ui.top, i.ui.x = r.ui.left, i.ui.zIndex = r.ui.zIndex, i.ui.widthName = r.ui.widthName, i.ui.widthComment = r.ui.widthComment, i.ui.color = r.ui.color ?? "";
    for (const s of r.columns) {
      const a = yh();
      a.id = s.id, a.tableId = r.id, a.name = s.name, a.comment = s.comment, a.dataType = s.dataType, a.default = s.default, a.options = Object.keys(s.option).reduce((l, c) => {
        if (Le(s.option, c, !1)) {
          const u = Le(O.ColumnOption, c, 0);
          return l | u;
        }
        return l;
      }, 0), a.ui.widthName = s.ui.widthName, a.ui.widthComment = s.ui.widthComment, a.ui.widthDataType = s.ui.widthDataType, a.ui.widthDefault = s.ui.widthDefault, s.ui.pfk ? a.ui.keys = O.ColumnUIKey.primaryKey | O.ColumnUIKey.foreignKey : s.ui.pk ? a.ui.keys = O.ColumnUIKey.primaryKey : s.ui.fk && (a.ui.keys = O.ColumnUIKey.foreignKey), e.collections.tableColumnEntities[a.id] = a;
    }
    e.collections.tableEntities[i.id] = i;
  }
  for (const r of o) {
    const i = th();
    i.id = r.id, i.name = r.name, i.tableId = r.tableId, i.unique = r.unique;
    for (const s of r.columns) {
      const a = o0(), l = oh();
      i.indexColumnIds.push(a), i.seqIndexColumnIds.push(a), l.id = a, l.indexId = r.id, l.columnId = s.id, l.orderType = Le(O.OrderType, s.orderType, O.OrderType.ASC), e.collections.indexColumnEntities[l.id] = l;
    }
    e.collections.indexEntities[i.id] = i;
  }
}
function E0(e, t) {
  const n = t.memos.filter(({ id: o }) => !!o);
  e.doc.memoIds = n.map(({ id: o }) => o);
  for (const o of n) {
    const r = rh();
    r.id = o.id, r.value = o.value, r.ui.y = o.ui.top, r.ui.x = o.ui.left, r.ui.width = o.ui.width, r.ui.height = o.ui.height, r.ui.zIndex = o.ui.zIndex, r.ui.color = o.ui.color ?? "", e.collections.memoEntities[r.id] = r;
  }
}
function x0(e, t) {
  const n = t.relationships.filter(({ id: o }) => !!o);
  e.doc.relationshipIds = n.map(({ id: o }) => o);
  for (const o of n) {
    const r = ah();
    r.id = o.id, r.identification = o.identification, r.relationshipType = Le(O.RelationshipType, o.relationshipType, O.RelationshipType.ZeroN), r.startRelationshipType = Le(O.StartRelationshipType, o.startRelationshipType === "Ring" ? "ring" : "dash", O.StartRelationshipType.dash), r.start.tableId = o.start.tableId, r.start.columnIds = o.start.columnIds, r.start.x = o.start.x, r.start.y = o.start.y, r.start.direction = Le(O.Direction, o.start.direction, O.Direction.bottom), r.end.tableId = o.end.tableId, r.end.columnIds = o.end.columnIds, r.end.x = o.end.x, r.end.y = o.end.y, r.end.direction = Le(O.Direction, o.end.direction, O.Direction.bottom), e.collections.relationshipEntities[r.id] = r;
  }
}
function $0(e) {
  return [e, -1, -1, {}];
}
function Tc(e, t, n) {
  return e[t] || (e[t] = $0(n), e[t]);
}
function A0(e, t, n, o, r) {
  const i = Tc(e, n, o), s = i[1], a = i[2];
  s < t && (i[1] = t), a < t && r();
}
function N0(e, t, n, o, r) {
  const i = Tc(e, n, o), s = i[2], a = i[1];
  s < t && (i[2] = t), a <= t && r();
}
function gh(e, t, n, o, r, i) {
  const s = Tc(e, n, o);
  (s[3][r] ?? -1) <= t && (s[3][r] = t, i());
}
let M0 = class {
  constructor(t) {
    Object.defineProperty(this, "collections", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: t
    });
  }
  collection(t) {
    return new k0(this.collections[t], t);
  }
}, k0 = class {
  constructor(t, n) {
    Object.defineProperty(this, "collection", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: t
    }), Object.defineProperty(this, "collectionKey", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: n
    });
  }
  selectById(t) {
    return this.collection[t];
  }
  selectByIds(t) {
    return t.length, t.map((n) => this.selectById(n)).filter(Boolean);
  }
  selectEntities() {
    return this.collection;
  }
  selectAll() {
    return Object.values(this.collection);
  }
  setOne(t) {
    return this.collection[t.id] = t, this;
  }
  setMany(t) {
    return t.forEach((n) => this.setOne(n)), this;
  }
  setAll(t) {
    return this.removeAll(), this.setMany(t), this;
  }
  addOne(t) {
    return this.selectById(t.id) ? this : (this.setOne(t), this);
  }
  addMany(t) {
    return t.forEach((n) => this.addOne(n)), this;
  }
  removeOne(t) {
    return this.selectById(t) && Reflect.deleteProperty(this.collection, t), this;
  }
  removeMany(t) {
    return t.forEach((n) => this.removeOne(n)), this;
  }
  removeAll() {
    return this.collection = {}, this;
  }
  updateOne(t, n) {
    const o = this.selectById(t);
    return o && (n(o), o.meta.updateAt = Date.now()), this;
  }
  updateMany(t, n) {
    return t.forEach((o) => this.updateOne(o, n)), this;
  }
  getOrCreate(t, n) {
    const o = this.selectById(t);
    if (o)
      return o;
    const r = n(t);
    return this.setOne(r), this.selectById(t);
  }
  addOperator(t, n, o, r) {
    return A0(t, n, o, this.collectionKey, r), this;
  }
  removeOperator(t, n, o, r) {
    return N0(t, n, o, this.collectionKey, r), this;
  }
  replaceOperator(t, n, o, r, i) {
    return gh(t, n, o, this.collectionKey, r, i), this;
  }
};
const y = (e) => new M0(e);
function zu(e, t) {
  return (e & t) === t;
}
const Kt = {
  columnUnique: "columnUnique",
  columnAutoIncrement: "columnAutoIncrement",
  columnName: "columnName",
  columnDataType: "columnDataType",
  columnNotNull: "columnNotNull",
  columnDefault: "columnDefault",
  columnComment: "columnComment"
}, Gu = Object.values(Kt), D0 = {
  ERD: "ERD",
  "@vuerd/builtin-sql-ddl": "@vuerd/builtin-sql-ddl",
  "@vuerd/builtin-grid": "@vuerd/builtin-grid",
  "@vuerd/builtin-generator-code": "@vuerd/builtin-generator-code",
  "@vuerd/builtin-visualization": "@vuerd/builtin-visualization"
}, L0 = Object.values(D0), R0 = {
  MariaDB: "MariaDB",
  MSSQL: "MSSQL",
  MySQL: "MySQL",
  Oracle: "Oracle",
  PostgreSQL: "PostgreSQL",
  SQLite: "SQLite"
}, _0 = Object.values(R0), P0 = {
  GraphQL: "GraphQL",
  "C#": "C#",
  Java: "Java",
  Kotlin: "Kotlin",
  TypeScript: "TypeScript",
  JPA: "JPA",
  Scala: "Scala"
}, B0 = Object.values(P0), j0 = {
  none: "none",
  camelCase: "camelCase",
  pascalCase: "pascalCase",
  snakeCase: "snakeCase"
}, Yu = Object.values(j0), U0 = {
  AtomOneDark: "AtomOneDark",
  AtomOneLight: "AtomOneLight",
  MonokaiSublime: "MonokaiSublime",
  GithubGist: "GithubGist",
  VS2015: "VS2015"
}, W0 = Object.values(U0), F0 = {
  none: "none",
  doubleQuote: "doubleQuote",
  singleQuote: "singleQuote",
  backtick: "backtick"
}, q0 = Object.values(F0), V0 = 0.1, H0 = 1, Z0 = 2e3, z0 = 2e4, G0 = () => ({
  version: "2.2.11",
  width: 2e3,
  height: 2e3,
  scrollTop: 0,
  scrollLeft: 0,
  zoomLevel: 1,
  show: {
    tableComment: !0,
    columnComment: !0,
    columnDataType: !0,
    columnDefault: !0,
    columnAutoIncrement: !1,
    columnPrimaryKey: !0,
    columnUnique: !1,
    columnNotNull: !0,
    relationship: !0
  },
  database: "MySQL",
  databaseName: "",
  canvasType: "ERD",
  language: "GraphQL",
  tableCase: "pascalCase",
  columnCase: "camelCase",
  highlightTheme: "VS2015",
  bracketType: "none",
  setting: {
    relationshipDataTypeSync: !0,
    relationshipOptimization: !1,
    columnOrder: [
      "columnName",
      "columnDataType",
      "columnNotNull",
      "columnUnique",
      "columnAutoIncrement",
      "columnDefault",
      "columnComment"
    ]
  },
  pluginSerializationMap: {}
}), Ku = hi(Z0, z0), Y0 = hi(V0, H0);
function K0(e) {
  var t;
  const n = G0();
  if (Be(e))
    return n;
  const o = w(ne, n, e), r = w(G, n, e), i = w(Ve, n.show, e.show), s = w(Ve, n.setting, e.setting);
  if (ne(e.width) && (n.width = Ku(e.width)), ne(e.height) && (n.height = Ku(e.height)), ne(e.zoomLevel) && (n.zoomLevel = Y0(e.zoomLevel)), r("version"), r("databaseName"), o("scrollTop"), o("scrollLeft"), w(We(_0), n, e)("database"), w(We(L0), n, e)("canvasType"), w(We(B0), n, e)("language"), w(We(Yu), n, e)("tableCase"), w(We(Yu), n, e)("columnCase"), w(We(W0), n, e)("highlightTheme"), w(We(q0), n, e)("bracketType"), i("tableComment"), i("columnComment"), i("columnDataType"), i("columnDefault"), i("columnAutoIncrement"), i("columnPrimaryKey"), i("columnUnique"), i("columnNotNull"), i("relationship"), s("relationshipDataTypeSync"), s("relationshipOptimization"), (t = e.setting) != null && t.columnOrder && Gu.length === e.setting.columnOrder.length && hc(Gu, e.setting.columnOrder).length === 0 && (n.setting.columnOrder = e.setting.columnOrder), ut(e.pluginSerializationMap)) {
    const a = e.pluginSerializationMap;
    for (const l of Object.keys(a)) {
      const c = a[l];
      G(c) && (n.pluginSerializationMap[l] = c);
    }
  }
  return n;
}
const Q0 = () => ({
  memos: []
}), J0 = () => ({
  id: "",
  value: "",
  ui: {
    active: !1,
    left: 200,
    top: 200,
    zIndex: 2,
    width: 127,
    height: 127
  }
});
function X0(e) {
  const t = Q0();
  if (Be(e) || !Te(e.memos))
    return t;
  for (const n of e.memos) {
    const o = J0(), r = w(G, o, n), i = w(ne, o.ui, n.ui), s = w(Ve, o.ui, n.ui), a = w(G, o.ui, n.ui);
    r("id"), r("value"), s("active"), a("color"), i("left"), i("top"), i("zIndex"), i("width"), i("height"), t.memos.push(o);
  }
  return t;
}
const eI = ["ZeroOneN", "One", "N"], tI = {
  ZeroOneN: "ZeroN",
  One: "OneOnly",
  N: "OneN"
}, nI = (e) => eI.includes(e) ? tI[e] : e, Ir = {
  ZeroOneN: "ZeroOneN",
  ZeroOne: "ZeroOne",
  ZeroN: "ZeroN",
  OneOnly: "OneOnly",
  OneN: "OneN",
  One: "One",
  N: "N"
}, oI = Object.values(Ir), rI = {
  Ring: "Ring",
  Dash: "Dash"
}, iI = Object.values(rI), Tr = {
  left: "left",
  right: "right",
  top: "top",
  bottom: "bottom"
}, Qu = Object.values(Tr), sI = () => ({
  relationships: []
}), aI = () => ({
  id: "",
  identification: !1,
  relationshipType: "ZeroN",
  startRelationshipType: "Dash",
  start: {
    tableId: "",
    columnIds: [],
    x: 0,
    y: 0,
    direction: "bottom"
  },
  end: {
    tableId: "",
    columnIds: [],
    x: 0,
    y: 0,
    direction: "bottom"
  },
  constraintName: "",
  visible: !0
});
function lI(e) {
  var t, n, o, r;
  const i = sI();
  if (Be(e) || !Te(e.relationships))
    return i;
  for (const s of e.relationships) {
    const a = aI(), l = w(G, a, s), c = w(Ve, a, s), u = w(ne, a.start, s.start), f = w(G, a.start, s.start), d = w(ne, a.end, s.end), h = w(G, a.end, s.end);
    l("id"), l("constraintName"), c("identification"), c("visible"), w(We(oI), a, s)("relationshipType"), a.relationshipType = nI(a.relationshipType), w(We(iI), a, s)("startRelationshipType"), f("tableId"), u("x"), u("y"), w(We(Qu), a.start, s.start)("direction"), Te((t = s.start) == null ? void 0 : t.columnIds) && (a.start.columnIds = (n = s.start) == null ? void 0 : n.columnIds.filter(G)), h("tableId"), d("x"), d("y"), w(We(Qu), a.end, s.end)("direction"), Te((o = s.end) == null ? void 0 : o.columnIds) && (a.end.columnIds = (r = s.end) == null ? void 0 : r.columnIds.filter(G)), i.relationships.push(a);
  }
  return i;
}
const vh = {
  ASC: "ASC",
  DESC: "DESC"
}, cI = Object.values(vh), uI = () => ({
  tables: [],
  indexes: []
}), fI = () => ({
  id: "",
  name: "",
  comment: "",
  columns: [],
  ui: {
    active: !1,
    left: 200,
    top: 100,
    zIndex: 2,
    widthName: 60,
    widthComment: 60
  },
  visible: !0
}), dI = () => ({
  id: "",
  name: "",
  comment: "",
  dataType: "",
  default: "",
  option: {
    autoIncrement: !1,
    primaryKey: !1,
    unique: !1,
    notNull: !1
  },
  ui: {
    active: !1,
    pk: !1,
    fk: !1,
    pfk: !1,
    widthName: 60,
    widthComment: 60,
    widthDataType: 60,
    widthDefault: 60
  }
}), hI = () => ({
  id: "",
  name: "",
  tableId: "",
  columns: [],
  unique: !1
}), mI = () => ({
  id: "",
  orderType: vh.ASC
});
function pI(e) {
  const t = uI();
  if (Be(e))
    return t;
  if (Te(e.tables))
    for (const n of e.tables) {
      const o = fI(), r = w(G, o, n), i = w(Ve, o, n), s = w(ne, o.ui, n.ui), a = w(Ve, o.ui, n.ui), l = w(G, o.ui, n.ui);
      if (r("id"), r("name"), r("comment"), i("visible"), a("active"), l("color"), s("left"), s("top"), s("zIndex"), s("widthName"), s("widthComment"), Te(n.columns))
        for (const c of n.columns) {
          const u = dI(), f = w(G, u, c), d = w(ne, u.ui, c.ui), h = w(Ve, u.ui, c.ui), p = w(Ve, u.option, c.option);
          f("id"), f("name"), f("comment"), f("dataType"), f("default"), p("autoIncrement"), p("primaryKey"), p("unique"), p("notNull"), h("active"), h("pk"), h("fk"), h("pfk"), d("widthName"), d("widthComment"), d("widthDataType"), d("widthDefault"), o.columns.push(u);
        }
      t.tables.push(o);
    }
  if (Te(e.indexes))
    for (const n of e.indexes) {
      const o = hI(), r = w(G, o, n), i = w(Ve, o, n);
      if (r("id"), r("name"), r("tableId"), i("unique"), Te(n.columns))
        for (const s of n.columns) {
          const a = mI();
          w(G, a, s)("id"), w(We(cI), a, s)("orderType"), o.columns.push(a);
        }
      t.indexes.push(o);
    }
  return t;
}
function yI(e) {
  const t = e, n = K0(t.canvas), o = pI(t.table), r = lI(t.relationship), i = X0(t.memo);
  return { canvas: n, table: o, relationship: r, memo: i };
}
O.ColumnType.columnName + "", Kt.columnName, O.ColumnType.columnDataType + "", Kt.columnDataType, O.ColumnType.columnDefault + "", Kt.columnDefault, O.ColumnType.columnComment + "", Kt.columnComment, O.ColumnType.columnAutoIncrement + "", Kt.columnAutoIncrement, O.ColumnType.columnUnique + "", Kt.columnUnique, O.ColumnType.columnNotNull + "", Kt.columnNotNull;
O.RelationshipType.ZeroOne + "", Ir.ZeroOne, O.RelationshipType.ZeroN + "", Ir.ZeroN, O.RelationshipType.OneOnly + "", Ir.OneOnly, O.RelationshipType.OneN + "", Ir.OneN;
O.Direction.left + "", Tr.left, O.Direction.right + "", Tr.right, O.Direction.top + "", Tr.top, O.Direction.bottom + "", Tr.bottom;
function bh(e) {
  const t = JSON.parse(e);
  return Reflect.get(t, "version") === "3.0.0" ? Vn(t) : C0(yI(t));
}
function wc(e) {
  const t = Jb(e, [
    "$schema",
    "version",
    "settings",
    "doc",
    "collections",
    "lww"
  ]);
  return zu(t.settings.ignoreSaveSettings, O.SaveSettingType.scroll) && (t.settings.scrollTop = 0, t.settings.scrollLeft = 0), zu(t.settings.ignoreSaveSettings, O.SaveSettingType.zoomLevel) && (t.settings.zoomLevel = 1), JSON.stringify(t, null, 2);
}
/*!
 * @dineug/r-html
 * @version 0.1.3 | Sat Apr 13 2024
 * @author SeungHwan-Lee <dineug2@gmail.com>
 * @license MIT
 */
function $B(e, t) {
  return Object.freeze({ key: t ?? Symbol(), value: e });
}
const Ih = {
  subscribe: "@@r-html/context-subscribe",
  unsubscribe: "@@r-html/context-unsubscribe"
};
function Th(e, t) {
  function n(o, r) {
    return new CustomEvent(e, {
      detail: o,
      ...t,
      ...r
    });
  }
  return n.toString = () => `${e}`, n.type = e, n;
}
const To = Th(Ih.subscribe, { bubbles: !0, composed: !0 }), wo = Th(Ih.unsubscribe, { bubbles: !0, composed: !0 });
function gI(e, t) {
  const n = (r) => {
    const i = r;
    t.dispatchEvent(To(i.detail));
  }, o = (r) => {
    const i = r;
    t.dispatchEvent(wo(i.detail));
  };
  return e.addEventListener(To.type, n), e.addEventListener(wo.type, o), () => {
    e.removeEventListener(To.type, n), e.removeEventListener(wo.type, o);
  };
}
function Ia(e, ...t) {
  try {
    return e == null ? void 0 : e(...t);
  } catch (n) {
    console.error(n);
  }
}
const vI = (e) => {
  Promise.resolve().then(e);
}, wh = queueMicrotask ?? vI, fn = (e) => (t) => typeof t === e, Ch = fn("object"), bI = fn("bigint"), Oh = fn("boolean"), rn = fn("function"), II = fn("number"), Sh = fn("string"), TI = fn("symbol"), ft = fn("undefined"), jt = (e) => e === null, { isArray: he } = Array, Ce = (e) => Ch(e) && !jt(e) && !he(e), mi = (e) => bI(e) || Oh(e) || II(e) || Sh(e) || TI(e) || ft(e) || jt(e);
function ei() {
  const e = /* @__PURE__ */ new Set(), t = (n) => (e.has(n) || e.add(n), () => {
    e.delete(n);
  });
  return {
    subscribe: t,
    next: (n) => {
      e.forEach((o) => o(n));
    },
    asReadonly: () => ({ subscribe: t })
  };
}
const wI = 1, Ta = [], xl = /* @__PURE__ */ new Map(), qi = /* @__PURE__ */ new Map();
let $l = !0, Cc = 0;
function CI(e, t, n) {
  const o = ti.get(n);
  if (!o)
    return !1;
  const r = o.get(e);
  return r ? r.has(t) : !1;
}
const Eh = (e) => (t) => {
  const n = xl.get(t);
  let o = () => {
  };
  const r = n != null && n.promise ? n.promise : new Promise((i) => {
    o = i;
  });
  if (!n) {
    const i = {
      type: e,
      tickCount: Cc,
      promise: r,
      fn: t,
      resolve: () => {
        o();
      }
    };
    Ta.push(i), xl.set(t, i);
  }
  return $l && (wh($I), $l = !1), r;
}, OI = Eh("observer"), SI = Eh("nextTick"), Ju = (e, t) => {
  var n;
  return (n = Ys.get(e)) == null ? void 0 : n.forEach((o) => CI(e, t, o) && OI(o));
};
function xh() {
  const e = Ta.shift();
  if (e) {
    if (xl.delete(e.fn), e.type === "observer")
      $h(e.fn), xc(e.fn), e.resolve();
    else if (e.type === "nextTick") {
      const t = Ia(e.fn);
      t instanceof Promise ? t.finally(e.resolve) : e.resolve();
    }
    EI() && xh();
  }
}
function EI() {
  const e = Ta[0];
  return e ? wI <= Cc - e.tickCount : !1;
}
function xI() {
  for (; Ta.length; )
    xh();
  $l = !0, Cc = 0;
}
function $I() {
  xI();
}
function Xu(e, t) {
  const n = rs.get(e);
  if (!n)
    return;
  const o = Nl.get(n);
  if (!o)
    return;
  const r = qi.get(n);
  r ? r.has(t) || r.add(t) : (qi.set(n, /* @__PURE__ */ new Set([t])), SI(() => {
    const i = qi.get(n);
    i && (qi.delete(n), i.forEach((s) => o.next(s)));
  }));
}
function m(e, t, n, o) {
  if (n === "a" && !o)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? e !== t || !o : !t.has(e))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return n === "m" ? o : n === "a" ? o.call(e) : o ? o.value : t.get(e);
}
function b(e, t, n, o, r) {
  if (o === "m")
    throw new TypeError("Private method is not writable");
  if (o === "a" && !r)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof t == "function" ? e !== t || !r : !t.has(e))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return o === "a" ? r.call(e, n) : r ? r.value = n : t.set(e, n), n;
}
const AI = "on", NI = "@", MI = ".", kI = "?", DI = "...", LI = "@@r-html", RI = Math.random().toString().substring(2, 8), an = `${LI}-${RI}`, _I = `${DI}${an}`, Al = new RegExp(`${an}_(\\d+)_`, "g"), PI = new RegExp(`^${an}_\\d+_$`), BI = /^\n/;
var J;
(function(e) {
  e.attribute = "attribute", e.boolean = "boolean", e.event = "event", e.property = "property", e.spread = "spread", e.directive = "directive";
})(J || (J = {}));
const wa = Symbol.for("https://github.com/dineug/r-html#beforeMount"), Ca = Symbol.for("https://github.com/dineug/r-html#mounted"), Oa = Symbol.for("https://github.com/dineug/r-html#unmounted"), Oc = Symbol.for("https://github.com/dineug/r-html#beforeFirstUpdate"), Sa = Symbol.for("https://github.com/dineug/r-html#beforeUpdate"), Sc = Symbol.for("https://github.com/dineug/r-html#firstUpdated"), Ea = Symbol.for("https://github.com/dineug/r-html#updated"), jI = [
  wa,
  Ca,
  Oa,
  Oc,
  Sa,
  Sc,
  Ea
], Ec = Symbol.for("https://github.com/dineug/r-html#Directive"), kn = Symbol.for("https://github.com/dineug/r-html#TemplateLiterals");
let os = null;
function Gs(e) {
  os = e;
}
const pi = (e) => (t) => {
  os && (os[e] ?? (os[e] = [])).push(t);
}, UI = pi(wa), AB = pi(Ca), WI = pi(Oa), NB = pi(Sa), MB = pi(Ea);
function Fe(e, t) {
  const n = Reflect.get(e, t, e);
  he(n) && n.forEach(Ia);
}
function FI(e) {
  jI.forEach((t) => Reflect.set(e, t, null, e));
}
const qI = ei(), VI = (e) => e, HI = (e) => {
  var t, n, o;
  return o = class extends e {
    constructor(r, i, s) {
      super(r, i, s), t.set(this, []), n.set(this, null), this.hmr();
    }
    commit(r) {
      const i = VI(r);
      super.commit(i), b(this, t, r, "f");
    }
    hmr() {
      b(this, n, qI.subscribe((r) => m(this, t, "f").includes(r) && this.commit(m(this, t, "f"))), "f");
    }
    destroy() {
      var r, i;
      (r = m(this, n, "f")) == null || r.call(this), (i = super.destroy) == null || i.call(this);
    }
  }, t = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap(), o;
}, rs = /* @__PURE__ */ new WeakMap(), Ys = /* @__PURE__ */ new WeakMap(), ef = /* @__PURE__ */ new WeakMap(), Nl = /* @__PURE__ */ new WeakMap(), ti = /* @__PURE__ */ new WeakMap(), ZI = { shallow: !1 };
let Mt = null;
function xc(e) {
  return Mt = e, Ia(e), Mt = null, () => $h(e);
}
function $h(e) {
  const t = ti.get(e);
  if (t)
    for (const [n] of t.entries()) {
      const o = Ys.get(n);
      o == null || o.delete(e);
    }
  t && ti.delete(e);
}
function zI(e) {
  if (!Mt)
    return;
  const t = Ys.get(e);
  t ? t.has(Mt) || t.add(Mt) : Ys.set(e, /* @__PURE__ */ new Set([Mt]));
}
function GI(e, t) {
  if (!Mt)
    return;
  const n = ti.get(Mt);
  if (n) {
    const o = n.get(e);
    o ? o.has(t) || o.add(t) : n.set(e, /* @__PURE__ */ new Set([t]));
  } else
    ti.set(Mt, /* @__PURE__ */ new Map([[e, /* @__PURE__ */ new Set([t])]]));
}
const YI = (e) => e instanceof Node || e instanceof Map || e instanceof Set || e instanceof WeakMap || e instanceof WeakSet || e instanceof RegExp || e instanceof Date || e instanceof Promise || (he(e) || Ce(e)) && Object.isFrozen(e);
function yi(e, t = {}) {
  const { shallow: n } = Object.assign({}, ZI, t), o = new Proxy(e, {
    get(r, i, s) {
      const a = Reflect.get(r, i, s);
      return YI(a) ? a : (zI(e), GI(e, i), !n && (Ce(a) || he(a)) && !ef.has(a) ? rs.has(a) ? rs.get(a) : yi(a, t) : a);
    },
    set(r, i, s, a) {
      const l = Reflect.get(r, i, a), c = Reflect.set(r, i, s, a);
      return (!he(r) && l !== s || i === "length") && (Ju(r, i), Xu(r, i)), c;
    },
    deleteProperty(r, i) {
      const s = Reflect.deleteProperty(r, i);
      return Ju(r, i), Xu(r, i), s;
    }
  });
  return rs.set(e, o), ef.set(o, e), o;
}
function kB(e) {
  return (Nl.get(e) ?? Nl.set(e, ei()).get(e)).asReadonly();
}
function DB(e, t) {
  const n = yi({ value: t.value }, { shallow: !0 }), o = (s) => {
    n.value = s;
  }, r = () => e instanceof HTMLElement ? e : e.parentElement ?? e.host, i = () => {
    r().dispatchEvent(To({
      context: t,
      observer: o
    }));
  };
  return i(), UI(i), WI(() => {
    r().dispatchEvent(wo({
      context: t,
      observer: o
    }));
  }), n;
}
function LB(e, t, n) {
  const o = e instanceof HTMLElement ? e : e.parentElement ?? e.host, r = ei(), i = /* @__PURE__ */ new Map(), s = (l) => {
    var c, u;
    const f = l;
    ((u = (c = f.detail) == null ? void 0 : c.context) == null ? void 0 : u.key) === t.key && (f.stopPropagation(), f.detail.observer(n), i.set(f.detail.observer, r.subscribe(f.detail.observer)));
  }, a = (l) => {
    var c, u;
    const f = l;
    if (((u = (c = f.detail) == null ? void 0 : c.context) == null ? void 0 : u.key) === t.key) {
      f.stopPropagation();
      const d = i.get(f.detail.observer);
      d == null || d(), i.delete(f.detail.observer);
    }
  };
  return o.addEventListener(To.type, s), o.addEventListener(wo.type, a), {
    set: (l) => {
      r.next(l);
    },
    destroy: () => {
      o.removeEventListener(To.type, s), o.removeEventListener(wo.type, a);
      for (const l of i.values())
        l();
      i.clear();
    }
  };
}
var we;
(function(e) {
  e.element = "element", e.text = "text", e.comment = "comment";
})(we || (we = {}));
class $n {
  constructor(t = {}) {
    Object.defineProperty(this, "type", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: we.comment
    }), Object.defineProperty(this, "value", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: ""
    }), Object.defineProperty(this, "attrs", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "parent", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: null
    }), Object.defineProperty(this, "children", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.assign(this, t);
  }
  *iterParent() {
    yield this, this.parent && (yield* this.parent.iterParent());
  }
  *[Symbol.iterator]() {
    if (yield this, !!this.children)
      for (const t of this.children)
        yield* t;
  }
}
const KI = (e, t = !1) => t ? document.createElementNS("http://www.w3.org/2000/svg", e) : document.createElement(e), QI = ({ type: e, value: t }, n = !1) => e === we.element ? KI(t, n) : e === we.text ? document.createTextNode(t) : document.createComment(t), $c = (e) => !!e && e !== "false";
function JI(e, { type: t, name: n, value: o }) {
  switch (t) {
    case J.attribute:
      e.setAttribute(n, o ?? "");
      break;
    case J.boolean:
      $c(o) && e.setAttribute(n, "");
      break;
    case J.property:
      Reflect.set(e, n, o, e);
      break;
  }
}
function XI(e, { type: t, name: n, value: o }) {
  switch (t) {
    case J.attribute:
    case J.property:
      Reflect.set(e, n, o);
      break;
    case J.boolean:
      Reflect.set(e, n, $c(o));
      break;
  }
}
const jn = (e, t) => e.length === t.length && e.every((n, o) => n === t[o]);
function Ml(e, t) {
  if (e === t)
    return !0;
  const n = Ce(e) ? e : {}, o = Ce(t) ? t : {}, r = Object.keys(n), i = Object.keys(o);
  return r.length === i.length && i.every((s) => Reflect.get(n, s) === Reflect.get(o, s));
}
const eT = (e) => he(e) && rn(e[0]) && (ft(e[1]) || Oh(e[1]) || Ce(e[1]));
function Qe(e, t) {
  const n = t.parentNode;
  n && n.insertBefore(e, t);
}
function Je(e, t) {
  const n = t.parentNode;
  n && (t.nextSibling ? n.insertBefore(e, t.nextSibling) : n.appendChild(e));
}
const Ne = (e) => e.parentNode && e.parentNode.removeChild(e), tT = (e) => e instanceof Node;
function Me(e, t) {
  const n = [];
  let o = e.nextSibling;
  for (; o && o !== t; )
    n.push(o), o = o.nextSibling;
  return n;
}
const kl = () => {
}, tf = (e) => e instanceof HTMLElement, nf = (e) => e instanceof SVGElement, nT = (e) => e instanceof Promise, oT = (e) => {
  var t;
  return ((t = e.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)) == null ? void 0 : t.join("-").toLowerCase()) ?? "";
}, fr = (e) => e.replace(/^([A-Z])|[\s-_](\w)/g, (t, n, o) => o ? o.toUpperCase() : n.toLowerCase());
var Ot;
(function(e) {
  e.html = "html", e.svg = "svg", e.css = "css";
})(Ot || (Ot = {}));
const rT = new Set(Object.values(Ot)), tl = /* @__PURE__ */ new WeakMap(), nl = /* @__PURE__ */ new WeakMap(), iT = /* @__PURE__ */ new Set([Ot.svg]), Ah = (e) => `${an}_${e}_`, sT = (e) => he(e) && he(e.raw), xa = (e) => Ce(e) && sT(e.strings) && he(e.values) && rT.has(Reflect.get(e, kn) ?? ""), $a = (e) => xa(e) && e[kn] === Ot.css, zo = (e, t = !0, n = !1) => (o) => t ? !!(o != null && o.trimStart().startsWith(e)) : n ? !!(o != null && o.trimEnd().endsWith(e)) : new RegExp(e).test(o ?? ""), Nh = zo(_I), Mh = zo(MI), kh = zo(kI), Dh = zo(NI), Lh = zo(AI), Do = zo(an, !1), gi = (e) => Do(e) && PI.test((e == null ? void 0 : e.trim()) ?? ""), of = ({ type: e, value: t }) => e === J.spread || e === J.directive || Do(t), aT = (e) => iT.has(e), rf = (e) => gi(e) ? J.directive : Nh(e) ? J.spread : Mh(e) ? J.property : Dh(e) || Lh(e) ? J.event : kh(e) ? J.boolean : J.attribute, Vi = (e) => Nh(e) ? e.substring(3) : gi(e) ? e : Mh(e) || Dh(e) || kh(e) ? e.substring(1) : Lh(e) ? e.substring(2) : e;
function be(e) {
  const t = [];
  let n = Al.exec(e);
  for (; n; ) {
    const o = Number(n[1]);
    t.push([n[0], Number.isInteger(o) ? o : -1]), n = Al.exec(e);
  }
  return t;
}
const sf = "0123456789abcdefghijklmnopqrstuvwxyz-_";
function lT(e, t) {
  return e = Math.ceil(e), t = Math.floor(t), Math.floor(Math.random() * (t - e)) + e;
}
function cT(e = 21) {
  let t = "_";
  for (let n = 0; n < e; n++)
    t += sf.charAt(lT(0, sf.length));
  return t;
}
var Ee, io, is, wr, Qt, Cr, Or;
class uT {
  constructor(t, { name: n, value: o }) {
    Ee.set(this, void 0), io.set(this, void 0), is.set(this, void 0), wr.set(this, []), Qt.set(this, []), Cr.set(this, null), Or.set(this, null), b(this, Ee, t, "f"), b(this, io, n, "f"), b(this, is, o, "f"), b(this, wr, be(o ?? ""), "f");
  }
  commit(t) {
    const n = m(this, wr, "f").map(([r, i]) => t[i]);
    if (jn(m(this, Qt, "f"), n))
      return;
    const o = n[n.length - 1];
    if (m(this, io, "f") === "class")
      this.classCommit(o);
    else if (m(this, io, "f") === "style")
      this.styleCommit(o);
    else {
      const r = n.reduce((i, s, a) => i.replace(new RegExp(m(this, wr, "f")[a][0]), ss(s)), m(this, is, "f") ?? "");
      m(this, Ee, "f").setAttribute(m(this, io, "f"), r.trim());
    }
    b(this, Qt, n, "f");
  }
  classCommit(t) {
    if (!tf(m(this, Ee, "f")) && !nf(m(this, Ee, "f")) || !Ce(t) && !he(t))
      return;
    const n = m(this, Qt, "f")[m(this, Qt, "f").length - 1];
    if (n === t || he(n) && he(t) && jn(n, t) || Ce(n) && Ce(t) && Ml(n, t))
      return;
    const o = [...m(this, Ee, "f").classList], r = Rh(t);
    if (jt(m(this, Or, "f")))
      b(this, Or, o, "f");
    else {
      const i = m(this, Or, "f"), s = o.filter((a) => !i.includes(a) && !r.includes(a));
      m(this, Ee, "f").classList.remove(...s);
    }
    m(this, Ee, "f").classList.add(...r);
  }
  styleCommit(t) {
    if (!tf(m(this, Ee, "f")) && !nf(m(this, Ee, "f")))
      return;
    const n = m(this, Qt, "f")[m(this, Qt, "f").length - 1];
    if (Ml(n, t))
      return;
    const o = fT(m(this, Ee, "f")), r = Ce(t) ? t : {};
    if (jt(m(this, Cr, "f")))
      b(this, Cr, o, "f");
    else {
      const i = m(this, Cr, "f");
      Object.keys(o).filter((s) => !i[s] && !r[s]).forEach((s) => m(this, Ee, "f").style.removeProperty(s));
    }
    for (const i of Object.keys(r))
      m(this, Ee, "f").style.setProperty(i, r[i]);
  }
}
Ee = /* @__PURE__ */ new WeakMap(), io = /* @__PURE__ */ new WeakMap(), is = /* @__PURE__ */ new WeakMap(), wr = /* @__PURE__ */ new WeakMap(), Qt = /* @__PURE__ */ new WeakMap(), Cr = /* @__PURE__ */ new WeakMap(), Or = /* @__PURE__ */ new WeakMap();
function ss(e) {
  return mi(e) && !jt(e) && !ft(e) || $a(e) ? String(e) : "";
}
function fT(e) {
  const t = {};
  for (let n = 0; n < e.style.length; n++) {
    const o = e.style.item(n);
    t[o] = e.style.getPropertyValue(o);
  }
  return t;
}
function Rh(e, t = []) {
  if ($a(e))
    return t.push(ss(e)), t;
  if (mi(e))
    t.push(ss(e));
  else if (Ch(e))
    if (he(e))
      for (let n = 0; n < e.length; n++)
        e[n] && Rh(e[n], t);
    else
      for (let n in e)
        e[n] && t.push(ss(n));
  return t;
}
var Sr, Er, as, ls;
class dT {
  constructor(t, { name: n, value: o }) {
    Sr.set(this, void 0), Er.set(this, void 0), as.set(this, []), ls.set(this, []), b(this, Sr, t, "f"), b(this, Er, n, "f"), b(this, as, be(o ?? ""), "f");
  }
  commit(t) {
    const n = m(this, as, "f").map(([r, i]) => t[i]);
    if (jn(m(this, ls, "f"), n))
      return;
    const o = n[n.length - 1];
    $c(o) ? m(this, Sr, "f").setAttribute(m(this, Er, "f"), "") : m(this, Sr, "f").removeAttribute(m(this, Er, "f")), b(this, ls, n, "f");
  }
}
Sr = /* @__PURE__ */ new WeakMap(), Er = /* @__PURE__ */ new WeakMap(), as = /* @__PURE__ */ new WeakMap(), ls = /* @__PURE__ */ new WeakMap();
var Lo;
(function(e) {
  e.node = "node", e.attribute = "attribute";
})(Lo || (Lo = {}));
function _h(e, t) {
  return Reflect.set(t, Ec, e), t;
}
var cs, us, fs, xr, Jt;
const hT = (e) => he(e) && Reflect.get(e, Ec) === Lo.attribute;
let Ph = class {
  constructor(e, { name: t }) {
    cs.set(this, void 0), us.set(this, void 0), fs.set(this, null), xr.set(this, null), Jt.set(this, null), b(this, cs, e, "f"), b(this, us, be(t)[0], "f");
  }
  commit(e) {
    var t, n, o, r;
    const [, i] = m(this, us, "f"), s = e[i];
    if (!hT(s))
      return;
    const [a, l] = s;
    if (m(this, fs, "f") !== l)
      (t = m(this, Jt, "f")) == null || t.call(this), b(this, xr, l({ node: m(this, cs, "f") }), "f"), b(this, fs, l, "f"), b(this, Jt, (n = m(this, xr, "f")) == null ? void 0 : n.call(this, a), "f");
    else {
      const c = (o = m(this, xr, "f")) == null ? void 0 : o.call(this, a);
      m(this, Jt, "f") !== c && ((r = m(this, Jt, "f")) == null || r.call(this), b(this, Jt, c, "f"));
    }
  }
  destroy() {
    var e;
    (e = m(this, Jt, "f")) == null || e.call(this);
  }
};
cs = /* @__PURE__ */ new WeakMap(), us = /* @__PURE__ */ new WeakMap(), fs = /* @__PURE__ */ new WeakMap(), xr = /* @__PURE__ */ new WeakMap(), Jt = /* @__PURE__ */ new WeakMap();
var In, Tn, ds, $r;
class Bh {
  constructor(t, { name: n, value: o }) {
    In.set(this, void 0), Tn.set(this, void 0), ds.set(this, []), $r.set(this, []), b(this, In, t, "f"), b(this, Tn, n, "f"), b(this, ds, be(o ?? ""), "f");
  }
  commit(t) {
    const n = m(this, ds, "f").map(([o, r]) => t[r]).filter((o) => rn(o) || eT(o));
    jn(m(this, $r, "f"), n) || (this.clear(), n.forEach((o) => rn(o) ? m(this, In, "f").addEventListener(m(this, Tn, "f"), o) : m(this, In, "f").addEventListener(m(this, Tn, "f"), o[0], o[1])), b(this, $r, n, "f"));
  }
  clear() {
    m(this, $r, "f").forEach((t) => rn(t) ? m(this, In, "f").removeEventListener(m(this, Tn, "f"), t) : m(this, In, "f").removeEventListener(m(this, Tn, "f"), t[0], t[1]));
  }
  destroy() {
    this.clear();
  }
}
In = /* @__PURE__ */ new WeakMap(), Tn = /* @__PURE__ */ new WeakMap(), ds = /* @__PURE__ */ new WeakMap(), $r = /* @__PURE__ */ new WeakMap();
var Ar, hs, ms, ps;
class mT {
  constructor(t, { name: n, value: o }) {
    Ar.set(this, void 0), hs.set(this, void 0), ms.set(this, []), ps.set(this, []), b(this, Ar, t, "f"), b(this, hs, n, "f"), b(this, ms, be(o ?? ""), "f");
  }
  commit(t) {
    const n = m(this, ms, "f").map(([r, i]) => t[i]);
    if (jn(m(this, ps, "f"), n))
      return;
    const o = n[n.length - 1];
    Reflect.set(m(this, Ar, "f"), m(this, hs, "f"), o, m(this, Ar, "f")), b(this, ps, n, "f");
  }
}
Ar = /* @__PURE__ */ new WeakMap(), hs = /* @__PURE__ */ new WeakMap(), ms = /* @__PURE__ */ new WeakMap(), ps = /* @__PURE__ */ new WeakMap();
var Nr, ys, gs;
class jh {
  constructor(t, { name: n }) {
    Nr.set(this, void 0), ys.set(this, void 0), gs.set(this, null), b(this, Nr, t, "f"), b(this, ys, be(n)[0], "f");
  }
  commit(t) {
    const [, n] = m(this, ys, "f"), o = t[n];
    !Ce(o) || Ml(m(this, gs, "f"), o) || (Object.keys(o).forEach((r) => Reflect.set(m(this, Nr, "f"), r, o[r], m(this, Nr, "f"))), b(this, gs, o, "f"));
  }
}
Nr = /* @__PURE__ */ new WeakMap(), ys = /* @__PURE__ */ new WeakMap(), gs = /* @__PURE__ */ new WeakMap();
const pT = (e, t) => t.type === J.attribute ? new uT(e, t) : t.type === J.boolean ? new dT(e, t) : t.type === J.event ? new Bh(e, t) : t.type === J.property ? new mT(e, t) : t.type === J.spread ? new jh(e, t) : new Ph(e, t);
var vs, bs, Mr, kr;
class yT {
  constructor(t, { value: n }) {
    vs.set(this, void 0), bs.set(this, void 0), Mr.set(this, []), kr.set(this, []), b(this, vs, t, "f"), b(this, bs, n, "f"), Sh(n) && b(this, Mr, be(n), "f");
  }
  commit(t) {
    const n = m(this, Mr, "f").map(([r, i]) => t[i]);
    if (jn(m(this, kr, "f"), n))
      return;
    b(this, kr, n, "f");
    const o = m(this, kr, "f").reduce((r, i, s) => r.replace(new RegExp(m(this, Mr, "f")[s][0]), mi(i) && !jt(i) && !ft(i) ? String(i) : ""), m(this, bs, "f") ?? "");
    m(this, vs, "f").data = o;
  }
}
vs = /* @__PURE__ */ new WeakMap(), bs = /* @__PURE__ */ new WeakMap(), Mr = /* @__PURE__ */ new WeakMap(), kr = /* @__PURE__ */ new WeakMap();
const Dl = Symbol("https://github.com/dineug/r-html.git#hostBridge");
function gT(e, t) {
  if (t instanceof ShadowRoot) {
    const n = t.host;
    Reflect.set(e, Dl, n);
  }
  return () => {
    Reflect.deleteProperty(e, Dl);
  };
}
function vT(e) {
  return Reflect.get(e, Dl) ?? null;
}
var Is, Ts, ws, Cs;
class bT {
  constructor(t, { name: n, value: o }) {
    Is.set(this, void 0), Ts.set(this, void 0), ws.set(this, []), Cs.set(this, []), b(this, Is, t, "f"), b(this, Ts, n, "f"), b(this, ws, be(o ?? ""), "f");
  }
  commit(t) {
    const n = m(this, ws, "f").map(([r, i]) => t[i]);
    if (jn(m(this, Cs, "f"), n))
      return;
    const o = n[n.length - 1];
    Reflect.set(m(this, Is, "f"), m(this, Ts, "f"), o), b(this, Cs, n, "f");
  }
}
Is = /* @__PURE__ */ new WeakMap(), Ts = /* @__PURE__ */ new WeakMap(), ws = /* @__PURE__ */ new WeakMap(), Cs = /* @__PURE__ */ new WeakMap();
var kt;
(function(e) {
  e.create = "create", e.move = "move";
})(kt || (kt = {}));
function IT(e) {
  const t = [], n = /* @__PURE__ */ new Map();
  return e.forEach(({ type: o, value: r }, i) => {
    const s = {
      type: o,
      key: o === te.templateLiterals ? r.strings : r
    };
    t.push(s), n.set(s, i);
  }), {
    items: t,
    itemToIndex: n
  };
}
function TT(e) {
  const t = [], n = /* @__PURE__ */ new Map();
  return e.forEach((o, r) => {
    const i = dn(o), s = {
      type: i,
      key: i === te.templateLiterals ? o.strings : o
    };
    t.push(s), n.set(s, r);
  }), {
    items: t,
    itemToIndex: n
  };
}
function Uh(e, t, n) {
  const o = !!(n != null && n.strict), r = {
    update: [],
    delete: []
  }, i = /* @__PURE__ */ new Set(), s = [], a = e.items, l = t.items;
  return a.forEach((c, u) => {
    const f = l.findIndex((d, h) => c.type === d.type && c.key === d.key && !i.has(h));
    f === -1 ? o ? r.delete.push({ from: u }) : s.push(c) : (i.add(f), r.update.push({ action: kt.move, from: u, to: f }));
  }), s.forEach((c) => {
    const u = e.itemToIndex.get(c), f = l.find((d, h) => c.type === d.type && !i.has(h));
    if (f) {
      const d = t.itemToIndex.get(f);
      i.add(d), r.update.push({ action: kt.move, from: u, to: d });
    } else
      r.delete.push({ from: u });
  }), l.forEach((c, u) => {
    i.has(u) || r.update.push({
      action: kt.create,
      from: -1,
      to: t.itemToIndex.get(c)
    });
  }), r.update.sort((c, u) => c.to - u.to), r;
}
var Dr, Os, De, Lr;
class Wh {
  constructor(t, n) {
    Dr.set(this, void 0), Os.set(this, void 0), De.set(this, []), b(this, Dr, t, "f"), b(this, Os, n, "f");
  }
  commit(t) {
    const n = Uh(IT(m(this, De, "f")), TT(t)), o = { length: t.length };
    n.update.forEach(({ action: r, from: i, to: s }) => {
      switch (r) {
        case kt.create:
          const a = document.createComment("");
          s === 0 ? Je(a, m(this, Dr, "f")) : m(this, De, "f").length ? Je(a, o[s - 1] ? o[s - 1].endNode : m(this, De, "f")[s - 1].endNode) : Qe(a, m(this, Os, "f")), o[s] = new wT(a, t[s]);
          break;
        case kt.move:
          if (o[s] = m(this, De, "f")[i], s === i)
            return;
          s === 0 ? m(this, De, "f")[i].insert("after", m(this, Dr, "f")) : m(this, De, "f")[i].insert("after", o[s - 1] ? o[s - 1].endNode : m(this, De, "f")[s - 1].endNode);
          break;
      }
    }), n.delete.forEach(({ from: r }) => m(this, De, "f")[r].destroy()), b(this, De, Array.from(o), "f"), m(this, De, "f").forEach((r, i) => r.commit(t[i]));
  }
  destroy() {
    m(this, De, "f").forEach((t) => t.destroy());
  }
}
Dr = /* @__PURE__ */ new WeakMap(), Os = /* @__PURE__ */ new WeakMap(), De = /* @__PURE__ */ new WeakMap();
let wT = class {
  constructor(e, t) {
    Lr.set(this, void 0), Object.defineProperty(this, "startNode", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: document.createComment("")
    }), Object.defineProperty(this, "endNode", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: document.createComment("")
    }), Object.defineProperty(this, "type", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "value", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Qe(this.startNode, e), Je(this.endNode, e), Ne(e), this.value = t, this.type = dn(t), b(this, Lr, Go(this.type, this.startNode, this.endNode), "f");
  }
  commit(e) {
    m(this, Lr, "f").commit(e), this.value = e;
  }
  insert(e, t) {
    const n = [
      this.startNode,
      ...Me(this.startNode, this.endNode),
      this.endNode
    ];
    e === "before" ? n.forEach((o) => Qe(o, t)) : n.reverse().forEach((o) => Je(o, t));
  }
  destroy() {
    var e, t;
    (t = (e = m(this, Lr, "f")).destroy) == null || t.call(e), Me(this.startNode, this.endNode).forEach(Ne), this.startNode.remove(), this.endNode.remove();
  }
};
Lr = /* @__PURE__ */ new WeakMap();
var Rr, _r, Ss, Pr, so;
class Fh {
  constructor(t, n) {
    Rr.set(this, void 0), _r.set(this, void 0), Ss.set(this, null), Pr.set(this, null), so.set(this, void 0), b(this, Rr, t, "f"), b(this, _r, n, "f");
  }
  commit(t) {
    var n, o;
    if (!Gh(t))
      return;
    const [r, i] = t;
    if (m(this, Ss, "f") !== i)
      this.clear(), b(this, Pr, i({
        startNode: m(this, Rr, "f"),
        endNode: m(this, _r, "f")
      }), "f"), b(this, Ss, i, "f"), b(this, so, (n = m(this, Pr, "f")) == null ? void 0 : n.call(this, r), "f");
    else {
      const s = (o = m(this, Pr, "f")) == null ? void 0 : o.call(this, r);
      m(this, so, "f") !== s && (this.clear(), b(this, so, s, "f"));
    }
  }
  clear() {
    var t;
    (t = m(this, so, "f")) == null || t.call(this), Me(m(this, Rr, "f"), m(this, _r, "f")).forEach(Ne);
  }
  destroy() {
    this.clear();
  }
}
Rr = /* @__PURE__ */ new WeakMap(), _r = /* @__PURE__ */ new WeakMap(), Ss = /* @__PURE__ */ new WeakMap(), Pr = /* @__PURE__ */ new WeakMap(), so = /* @__PURE__ */ new WeakMap();
class qh {
  constructor(t, n) {
  }
  commit(t) {
  }
}
var Es, ao;
class Vh {
  constructor(t, n) {
    Es.set(this, void 0), ao.set(this, null), b(this, Es, n, "f");
  }
  commit(t) {
    m(this, ao, "f") !== t && (m(this, ao, "f") && Ne(m(this, ao, "f")), Qe(t, m(this, Es, "f")), b(this, ao, t, "f"));
  }
}
Es = /* @__PURE__ */ new WeakMap(), ao = /* @__PURE__ */ new WeakMap();
var lo, co, xs, uo, Br;
class Hh {
  constructor(t, n) {
    lo.set(this, void 0), co.set(this, void 0), xs.set(this, null), uo.set(this, null), Br.set(this, kl), b(this, lo, t, "f"), b(this, co, n, "f");
  }
  commit(t) {
    m(this, xs, "f") !== t && (this.clear(), nT(t) && this.promiseCommit(t));
  }
  promiseCommit(t) {
    const [n, o] = CT(t);
    b(this, Br, o, "f"), n.then((r) => {
      var i;
      const s = dn(r);
      b(this, uo, Go(s, m(this, lo, "f"), m(this, co, "f")), "f"), (i = m(this, uo, "f")) == null || i.commit(r);
    }), b(this, xs, t, "f");
  }
  partClear() {
    var t, n;
    (n = (t = m(this, uo, "f")) == null ? void 0 : t.destroy) == null || n.call(t), Me(m(this, lo, "f"), m(this, co, "f")).forEach(Ne);
  }
  clear() {
    var t, n;
    m(this, Br, "f").call(this), (n = (t = m(this, uo, "f")) == null ? void 0 : t.destroy) == null || n.call(t), Me(m(this, lo, "f"), m(this, co, "f")).forEach(Ne), b(this, Br, kl, "f");
  }
  destroy() {
    this.clear();
  }
}
lo = /* @__PURE__ */ new WeakMap(), co = /* @__PURE__ */ new WeakMap(), xs = /* @__PURE__ */ new WeakMap(), uo = /* @__PURE__ */ new WeakMap(), Br = /* @__PURE__ */ new WeakMap();
function CT(e) {
  let t = kl;
  const n = new Promise((r, i) => t = i), o = () => t();
  return [Promise.race([n, e]), o];
}
var $s, As;
class Zh {
  constructor(t, n) {
    $s.set(this, document.createTextNode("")), As.set(this, null), Je(m(this, $s, "f"), t);
  }
  commit(t) {
    m(this, As, "f") !== t && (m(this, $s, "f").data = jt(t) || ft(t) ? "" : String(t), b(this, As, t, "f"));
  }
}
$s = /* @__PURE__ */ new WeakMap(), As = /* @__PURE__ */ new WeakMap();
var Ns, jr, at;
class zh {
  constructor(t, n) {
    Ns.set(this, void 0), jr.set(this, void 0), at.set(this, null), b(this, Ns, t, "f"), b(this, jr, n, "f");
  }
  commit(t) {
    const { strings: n, values: o } = t;
    m(this, at, "f") && !m(this, at, "f").equalStrings(n) && (m(this, at, "f").destroy(), b(this, at, null, "f")), m(this, at, "f") || (b(this, at, new Qh(t, m(this, Ns, "f"), m(this, jr, "f")), "f"), m(this, at, "f").insert("before", m(this, jr, "f"))), m(this, at, "f").commit(o);
  }
  destroy() {
    var t;
    (t = m(this, at, "f")) == null || t.destroy();
  }
}
Ns = /* @__PURE__ */ new WeakMap(), jr = /* @__PURE__ */ new WeakMap(), at = /* @__PURE__ */ new WeakMap();
var te;
(function(e) {
  e.primitive = "primitive", e.templateLiterals = "templateLiterals", e.array = "array", e.node = "node", e.object = "object", e.function = "function", e.directive = "directive";
})(te || (te = {}));
const Gh = (e) => he(e) && Reflect.get(e, Ec) === Lo.node, Hn = (e) => (t) => t instanceof e, OT = Hn(Zh), ST = Hn(zh), ET = Hn(Wh), xT = Hn(Vh), $T = Hn(Hh), AT = Hn(qh), NT = Hn(Fh), dn = (e) => mi(e) ? te.primitive : xa(e) ? te.templateLiterals : Gh(e) ? te.directive : he(e) ? te.array : tT(e) ? te.node : rn(e) ? te.function : te.object, MT = {
  [te.primitive]: OT,
  [te.templateLiterals]: ST,
  [te.array]: ET,
  [te.node]: xT,
  [te.function]: AT,
  [te.object]: $T,
  [te.directive]: NT
}, kT = {
  [te.primitive]: Zh,
  [te.templateLiterals]: zh,
  [te.array]: Wh,
  [te.node]: Vh,
  [te.function]: qh,
  [te.object]: Hh,
  [te.directive]: Fh
}, Yh = (e, t) => MT[e](t), Go = (e, t, n) => new kT[e](t, n);
var Xt, fo, Ms, Ll, Ur, wn, ho, mo, ks, Wr, Ds;
class DT {
  constructor(t, n, o, r) {
    var i;
    Xt.set(this, document.createComment("")), fo.set(this, document.createComment("")), Ms.set(this, void 0), Ll.set(this, void 0), Ur.set(this, []), wn.set(this, []), ho.set(this, null), mo.set(this, yi({}, { shallow: !0 })), ks.set(this, null), Wr.set(this, null), Ds.set(this, document.createElement("div")), b(this, Xt, t, "f"), b(this, fo, n, "f"), b(this, Ll, o, "f"), b(this, Ms, be(o.value)[0], "f"), o.staticAttrs && o.staticAttrs.forEach((s) => XI(m(this, mo, "f"), s)), (i = o.attrs) == null || i.forEach((s) => {
      s.type === J.directive ? m(this, Ur, "f").push(s) : s.type === J.spread ? r.push(new jh(m(this, mo, "f"), s)) : s.type === J.event ? r.push(new Bh(m(this, Ds, "f"), s)) : r.push(new bT(m(this, mo, "f"), s));
    });
  }
  createContext() {
    const t = m(this, Xt, "f"), n = {
      host: document.body,
      get parentElement() {
        return t.parentElement;
      },
      dispatchEvent: (r) => m(this, Ds, "f").dispatchEvent(r)
    }, o = m(this, Xt, "f").getRootNode();
    if (o instanceof ShadowRoot) {
      const r = o.host;
      n.host = r;
    } else if (o instanceof DocumentFragment) {
      const r = vT(o);
      r && (n.host = r);
    }
    return n;
  }
  commit(t) {
    const [, n] = m(this, Ms, "f"), o = t[n];
    if (!rn(o) || m(this, ks, "f") === o) {
      m(this, wn, "f").forEach((a) => a.commit(t));
      return;
    }
    const r = this.createContext();
    this.clear(), Gs(this);
    const i = o.call(r, m(this, mo, "f"), r);
    Gs(null), m(this, Ur, "f").length && m(this, wn, "f").push(...m(this, Ur, "f").map((a) => new Ph(r, a))), Fe(this, wa);
    let s = !1;
    b(this, Wr, xc(() => {
      var a;
      const l = i(), c = dn(l);
      Yh(c, m(this, ho, "f")) || (this.partClear(), b(this, ho, Go(c, m(this, Xt, "f"), m(this, fo, "f")), "f")), Fe(this, s ? Sa : Oc), (a = m(this, ho, "f")) == null || a.commit(l), s ? Fe(this, Ea) : (Fe(this, Sc), s = !0);
    }), "f"), m(this, wn, "f").forEach((a) => a.commit(t)), Fe(this, Ca), b(this, ks, o, "f");
  }
  partClear() {
    var t, n;
    (n = (t = m(this, ho, "f")) == null ? void 0 : t.destroy) == null || n.call(t), Me(m(this, Xt, "f"), m(this, fo, "f")).forEach(Ne);
  }
  clear() {
    var t;
    Me(m(this, Xt, "f"), m(this, fo, "f")).forEach(Ne), Fe(this, Oa), m(this, wn, "f").forEach((n) => {
      var o;
      return (o = n.destroy) == null ? void 0 : o.call(n);
    }), (t = m(this, Wr, "f")) == null || t.call(this), b(this, wn, [], "f"), b(this, Wr, null, "f"), FI(this);
  }
  destroy() {
    this.clear(), this.partClear();
  }
}
Xt = /* @__PURE__ */ new WeakMap(), fo = /* @__PURE__ */ new WeakMap(), Ms = /* @__PURE__ */ new WeakMap(), Ll = /* @__PURE__ */ new WeakMap(), Ur = /* @__PURE__ */ new WeakMap(), wn = /* @__PURE__ */ new WeakMap(), ho = /* @__PURE__ */ new WeakMap(), mo = /* @__PURE__ */ new WeakMap(), ks = /* @__PURE__ */ new WeakMap(), Wr = /* @__PURE__ */ new WeakMap(), Ds = /* @__PURE__ */ new WeakMap();
var dr, hr, mr, af;
const LT = (af = class {
  constructor(e, t, n) {
    dr.set(this, document.createComment("")), hr.set(this, document.createComment("")), mr.set(this, void 0), b(this, mr, new DT(m(this, dr, "f"), m(this, hr, "f"), t, n), "f"), Qe(m(this, dr, "f"), e), Je(m(this, hr, "f"), e), e.remove();
  }
  commit(e) {
    m(this, mr, "f").commit(e);
  }
  destroy() {
    var e, t;
    (t = (e = m(this, mr, "f")).destroy) == null || t.call(e), m(this, dr, "f").remove(), m(this, hr, "f").remove();
  }
}, dr = /* @__PURE__ */ new WeakMap(), hr = /* @__PURE__ */ new WeakMap(), mr = /* @__PURE__ */ new WeakMap(), af), RT = HI(LT);
var po, yo, Ls, Rs, Cn;
class _T {
  constructor(t, { value: n }) {
    po.set(this, document.createComment("")), yo.set(this, document.createComment("")), Ls.set(this, void 0), Rs.set(this, null), Cn.set(this, null), b(this, Ls, be(n)[0], "f"), Qe(m(this, po, "f"), t), Je(m(this, yo, "f"), t), t.remove();
  }
  commit(t) {
    var n;
    const [, o] = m(this, Ls, "f"), r = t[o];
    if (m(this, Rs, "f") === r)
      return;
    const i = dn(r);
    Yh(i, m(this, Cn, "f")) || (jt(m(this, Cn, "f")) || this.clear(), b(this, Cn, Go(i, m(this, po, "f"), m(this, yo, "f")), "f")), (n = m(this, Cn, "f")) == null || n.commit(r), b(this, Rs, r, "f");
  }
  clear() {
    var t, n;
    (n = (t = m(this, Cn, "f")) == null ? void 0 : t.destroy) == null || n.call(t), Me(m(this, po, "f"), m(this, yo, "f")).forEach(Ne);
  }
  destroy() {
    this.clear(), m(this, po, "f").remove(), m(this, yo, "f").remove();
  }
}
po = /* @__PURE__ */ new WeakMap(), yo = /* @__PURE__ */ new WeakMap(), Ls = /* @__PURE__ */ new WeakMap(), Rs = /* @__PURE__ */ new WeakMap(), Cn = /* @__PURE__ */ new WeakMap();
function Kh(e = [], t, n = !1, o = []) {
  return e.forEach((r) => {
    if (r.isComponent) {
      const s = document.createComment("");
      t.appendChild(s), o.push(new RT(s, r, o));
      return;
    }
    const i = QI(r, r.isSvg || n);
    t.appendChild(i), i instanceof Comment && r.isMarker && o.push(new yT(i, r)), i instanceof Text && r.isMarkerOnly && o.push(new _T(i, r)), i instanceof Element && (r.staticAttrs && r.staticAttrs.forEach((s) => JI(i, s)), r.attrs && o.push(...r.attrs.map((s) => pT(i, s))), r.children && Kh(r.children, i, r.isSvg || n, o));
  }), o;
}
function PT(e, t = !1) {
  const n = document.createDocumentFragment(), o = Kh(e.children, n, t);
  return [n, o];
}
var go, vo, en, Fr, _s, Ps;
class Qh {
  constructor(t, n, o) {
    if (go.set(this, document.createComment("")), vo.set(this, document.createComment("")), en.set(this, null), Fr.set(this, []), _s.set(this, void 0), Ps.set(this, !1), b(this, _s, t.strings, "f"), t[kn] !== Ot.html && t[kn] !== Ot.svg)
      return;
    const [r, i] = PT(t.template.node, aT(t[kn]));
    b(this, en, r, "f"), b(this, Fr, i, "f"), n && o ? (b(this, go, n, "f"), b(this, vo, o, "f"), b(this, Ps, !0, "f")) : (r.prepend(m(this, go, "f")), r.append(m(this, vo, "f")));
  }
  equalStrings(t) {
    return m(this, _s, "f") === t;
  }
  commit(t) {
    m(this, Fr, "f").forEach((n) => n.commit(t));
  }
  insert(t, n) {
    m(this, en, "f") && (t === "before" ? Qe(m(this, en, "f"), n) : t === "after" ? Je(m(this, en, "f"), n) : n.appendChild(m(this, en, "f")), b(this, en, null, "f"));
  }
  destroy() {
    m(this, Fr, "f").forEach((t) => {
      var n;
      return (n = t.destroy) == null ? void 0 : n.call(t);
    }), Me(m(this, go, "f"), m(this, vo, "f")).forEach(Ne), m(this, Ps, "f") || (m(this, go, "f").remove(), m(this, vo, "f").remove());
  }
}
go = /* @__PURE__ */ new WeakMap(), vo = /* @__PURE__ */ new WeakMap(), en = /* @__PURE__ */ new WeakMap(), Fr = /* @__PURE__ */ new WeakMap(), _s = /* @__PURE__ */ new WeakMap(), Ps = /* @__PURE__ */ new WeakMap();
const pr = /* @__PURE__ */ new WeakMap();
function BT(e, t) {
  var n;
  if (!xa(t)) {
    pr.has(e) && ((n = pr.get(e)) == null || n.destroy(), pr.delete(e));
    return;
  }
  const { strings: o, values: r } = t, i = pr.get(e);
  if (i != null && i.equalStrings(o))
    i == null || i.commit(r);
  else {
    const s = new Qh(t);
    i == null || i.destroy(), pr.set(e, s), s.insert("children", e), s.commit(r);
  }
}
function jT(e, t) {
  return (...n) => _h(Lo.attribute, [e(...n), t]);
}
const RB = (e) => ({ value: e }), _B = jT((e) => e, ({ node: e }) => {
  let t = null;
  const n = () => {
    t && (t.value = null);
  };
  return (o) => (t === o || (o.value = e, t = o), n);
});
function Ac(e, t) {
  return (...n) => _h(Lo.node, [
    e(...n),
    t
  ]);
}
const PB = Ac((e) => e, ({ startNode: e, endNode: t }) => {
  const n = e.getRootNode();
  let o = /* @__PURE__ */ new Map(), r = null;
  const i = (u) => xa(u) ? u.strings : u, s = (u) => {
    const f = i(u);
    return o.has(f) ? o.get(f) : null;
  }, a = (u, f) => {
    o.set(i(u), f);
  }, l = (u) => {
    const f = dn(u), d = Go(f, e, t), h = document.createDocumentFragment(), p = gI(h, n), g = gT(h, n);
    return {
      part: d,
      fragment: h,
      destroy: () => {
        var v;
        p(), g(), (v = d.destroy) == null || v.call(d);
      }
    };
  }, c = () => {
    o.forEach(({ destroy: u }) => u()), o = /* @__PURE__ */ new Map(), Me(e, t).forEach(Ne);
  };
  return (u) => {
    const f = s(r), d = s(u);
    if (f && i(r) !== i(u) && Me(e, t).forEach((h) => f.fragment.appendChild(h)), d)
      i(r) !== i(u) && Qe(d.fragment, t), d.part.commit(u);
    else {
      const h = l(u);
      a(u, h), h.part.commit(u);
    }
    return r = u, c;
  };
}), BB = Ac((e) => e, ({ startNode: e, endNode: t }) => {
  let n = null;
  const o = () => {
    Me(e, t).forEach(Ne);
  };
  return (r) => {
    if (n === r)
      return o;
    o();
    const i = document.createElement("template");
    return i.innerHTML = r, Qe(i.content, t), n = r, o;
  };
});
var qr;
const jB = Ac((e, t, n) => (e.length, [e, t, n]), ({ startNode: e, endNode: t }) => {
  let n = [];
  const o = () => {
    n.forEach((r) => r.destroy());
  };
  return ([r, i, s]) => {
    const a = FT(r, i, s), l = a.values, c = Uh(WT(n), a, {
      strict: !0
    }), u = { length: l.length };
    return c.update.forEach(({ action: f, from: d, to: h }) => {
      switch (f) {
        case kt.create:
          const p = document.createComment("");
          h === 0 ? Je(p, e) : n.length ? Je(p, u[h - 1] ? u[h - 1].endNode : n[h - 1].endNode) : Qe(p, t), u[h] = new UT(p, l[h].value, l[h].key);
          break;
        case kt.move:
          if (u[h] = n[d], h === d)
            return;
          h === 0 ? n[d].insert("after", e) : n[d].insert("after", u[h - 1] ? u[h - 1].endNode : n[h - 1].endNode);
          break;
      }
    }), c.delete.forEach(({ from: f }) => n[f].destroy()), n = Array.from(u), n.forEach((f, d) => f.commit(l[d].value)), o;
  };
});
class UT {
  constructor(t, n, o) {
    qr.set(this, void 0), Object.defineProperty(this, "startNode", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: document.createComment("")
    }), Object.defineProperty(this, "endNode", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: document.createComment("")
    }), Object.defineProperty(this, "type", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "key", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Qe(this.startNode, t), Je(this.endNode, t), Ne(t), this.key = o, this.type = dn(n), b(this, qr, Go(this.type, this.startNode, this.endNode), "f");
  }
  commit(t) {
    m(this, qr, "f").commit(t);
  }
  insert(t, n) {
    const o = [
      this.startNode,
      ...Me(this.startNode, this.endNode),
      this.endNode
    ];
    t === "before" ? o.forEach((r) => Qe(r, n)) : o.reverse().forEach((r) => Je(r, n));
  }
  destroy() {
    var t, n;
    (n = (t = m(this, qr, "f")).destroy) == null || n.call(t), Me(this.startNode, this.endNode).forEach(Ne), this.startNode.remove(), this.endNode.remove();
  }
}
qr = /* @__PURE__ */ new WeakMap();
function WT(e) {
  const t = [], n = /* @__PURE__ */ new Map();
  return e.forEach(({ type: o, key: r }, i) => {
    const s = { type: o, key: r };
    t.push(s), n.set(s, i);
  }), {
    items: t,
    itemToIndex: n
  };
}
function FT(e, t, n) {
  const o = [], r = /* @__PURE__ */ new Map(), i = [];
  return e.forEach((s, a, l) => {
    const c = {
      key: t(s),
      value: n(s, a, l)
    }, u = { type: dn(c.value), key: c.key };
    i.push(c), o.push(u), r.set(u, a);
  }), {
    items: o,
    itemToIndex: r,
    values: i
  };
}
const qT = (e) => he(e) ? e : ft(e) ? [] : Object.keys(e), VT = (e) => ft(e) || he(e) ? [] : Object.keys(e).filter((t) => {
  const n = e[t];
  return n === Number || n === String || n === Boolean || Ce(n) && !ft(n.default);
}).map((t) => {
  const n = e[t];
  return Ce(n) ? [t, Reflect.get(n, "default")] : n === Number ? [t, 0] : n === Boolean ? [t, !1] : [t, ""];
}), HT = (e) => ft(e) || he(e) ? [] : Object.keys(e).filter((t) => {
  const n = e[t];
  return rn(n) || Ce(n) && !ft(n.type);
}).map((t) => {
  const n = e[t];
  return Ce(n) ? [t, Reflect.get(n, "type")] : [t, n];
});
var $;
(function(e) {
  e.string = "string", e.whiteSpace = "whiteSpace", e.nextLine = "nextLine", e.equal = "equal", e.tilde = "tilde", e.plus = "plus", e.sharp = "sharp", e.asterisk = "asterisk", e.commercialAt = "commercialAt", e.ampersand = "ampersand", e.period = "period", e.comma = "comma", e.colon = "colon", e.semicolon = "semicolon", e.gt = "gt", e.leftBrace = "leftBrace", e.rightBrace = "rightBrace", e.leftBracket = "leftBracket", e.rightBracket = "rightBracket", e.leftParent = "leftParent", e.rightParent = "rightParent";
})($ || ($ = {}));
var Nt;
(function(e) {
  e.style = "style", e.multiComment = "multiComment", e.singleComment = "singleComment";
})(Nt || (Nt = {}));
const X = {
  doubleQuote: '"',
  singleQuote: "'",
  whiteSpace: /\s/,
  string: /\S/,
  breakString: /:|;|{|&|#|@|,|>|~|\(|\)|\[|\.|\+/,
  nextLine: `
`,
  slash: "/",
  equal: "=",
  tilde: "~",
  plus: "+",
  sharp: "#",
  asterisk: "*",
  commercialAt: "@",
  ampersand: "&",
  period: ".",
  comma: ",",
  colon: ":",
  semicolon: ";",
  gt: ">",
  leftBrace: "{",
  rightBrace: "}",
  leftBracket: "[",
  rightBracket: "]",
  leftParent: "(",
  rightParent: ")"
}, ie = (e) => (t) => e === t, ol = (e) => (t) => e.test(t), B = {
  doubleQuote: ie(X.doubleQuote),
  singleQuote: ie(X.singleQuote),
  whiteSpace: ol(X.whiteSpace),
  string: ol(X.string),
  breakString: ol(X.breakString),
  nextLine: ie(X.nextLine),
  slash: ie(X.slash),
  equal: ie(X.equal),
  tilde: ie(X.tilde),
  plus: ie(X.plus),
  sharp: ie(X.sharp),
  asterisk: ie(X.asterisk),
  commercialAt: ie(X.commercialAt),
  ampersand: ie(X.ampersand),
  period: ie(X.period),
  comma: ie(X.comma),
  colon: ie(X.colon),
  semicolon: ie(X.semicolon),
  gt: ie(X.gt),
  leftBrace: ie(X.leftBrace),
  rightBrace: ie(X.rightBrace),
  leftBracket: ie(X.leftBracket),
  rightBracket: ie(X.rightBracket),
  leftParent: ie(X.leftParent),
  rightParent: ie(X.rightParent)
}, ZT = (e) => (t) => B.slash(e[t]) && B.asterisk(e[t + 1]), zT = (e) => (t) => B.asterisk(e[t]) && B.slash(e[t + 1]), GT = (e) => (t) => B.slash(e[t]) && B.slash(e[t + 1]);
function YT(e) {
  const t = [];
  let n = 0;
  const o = () => n < e.length, r = ZT(e), i = zT(e), s = GT(e), a = (l = Nt.style) => {
    for (; o(); ) {
      let c = e[n];
      if (B.nextLine(c)) {
        if (t.push({ type: $.nextLine, value: c }), n++, l === Nt.singleComment)
          break;
        continue;
      }
      if (B.whiteSpace(c)) {
        let u = "";
        for (; o() && B.whiteSpace(c) && !B.nextLine(c); )
          u += c, c = e[++n];
        t.push({ type: $.whiteSpace, value: u });
        continue;
      }
      if (l === Nt.style) {
        if (r(n)) {
          a(Nt.multiComment);
          continue;
        }
        if (s(n)) {
          a(Nt.singleComment);
          continue;
        }
        if (B.colon(c)) {
          t.push({ type: $.colon, value: c });
          let u = "";
          if (c = e[++n], B.whiteSpace(c)) {
            for (u = ""; o() && B.whiteSpace(c); )
              u += c, c = e[++n];
            t.push({ type: $.whiteSpace, value: u }), u = "";
          } else
            continue;
          for (; o() && !B.semicolon(c); )
            u += c, c = e[++n];
          t.push({ type: $.string, value: u });
          continue;
        }
        if (B.leftBracket(c)) {
          t.push({ type: $.leftBracket, value: c });
          let u = "";
          for (c = e[++n]; o() && !B.equal(c) && !B.rightBracket(c); )
            u += c, c = e[++n];
          if (t.push({ type: $.string, value: u }), B.equal(c) && (t.push({ type: $.equal, value: c }), c = e[++n]), B.doubleQuote(c)) {
            let f = "";
            for (c = e[++n]; o() && !B.doubleQuote(c); )
              f += c, c = e[++n];
            t.push({ type: $.string, value: f }), c = e[++n];
          }
          if (B.singleQuote(c)) {
            let f = "";
            for (c = e[++n]; o() && !B.singleQuote(c); )
              f += c, c = e[++n];
            t.push({ type: $.string, value: f }), c = e[++n];
          }
          B.rightBracket(c) && (t.push({ type: $.rightBracket, value: c }), n++);
          continue;
        }
        if (B.commercialAt(c)) {
          t.push({ type: $.commercialAt, value: c }), n++;
          continue;
        }
        if (B.gt(c)) {
          t.push({ type: $.gt, value: c }), n++;
          continue;
        }
        if (B.tilde(c)) {
          t.push({ type: $.tilde, value: c }), n++;
          continue;
        }
        if (B.plus(c)) {
          t.push({ type: $.plus, value: c }), n++;
          continue;
        }
        if (B.sharp(c)) {
          t.push({ type: $.sharp, value: c }), n++;
          continue;
        }
        if (B.asterisk(c)) {
          t.push({ type: $.asterisk, value: c }), n++;
          continue;
        }
        if (B.ampersand(c)) {
          t.push({ type: $.ampersand, value: c }), n++;
          continue;
        }
        if (B.period(c)) {
          t.push({ type: $.period, value: c }), n++;
          continue;
        }
        if (B.comma(c)) {
          t.push({ type: $.comma, value: c }), n++;
          continue;
        }
        if (B.semicolon(c)) {
          t.push({ type: $.semicolon, value: c }), n++;
          continue;
        }
        if (B.leftBrace(c)) {
          t.push({ type: $.leftBrace, value: c }), n++;
          continue;
        }
        if (B.rightBrace(c)) {
          t.push({ type: $.rightBrace, value: c }), n++;
          continue;
        }
        if (B.leftParent(c)) {
          let u = "";
          for (; o() && !B.rightParent(c); )
            u += c, c = e[++n];
          u += c, t.push({ type: $.string, value: u }), n++;
          continue;
        }
      } else if (l === Nt.multiComment) {
        if (i(n)) {
          t.push({ type: $.string, value: "*/" }), n += 2;
          break;
        }
      } else if (l === Nt.singleComment && B.nextLine(c)) {
        t.push({ type: $.nextLine, value: c }), n++;
        break;
      }
      if (B.string(c)) {
        let u = "";
        for (; o() && B.string(c) && !B.breakString(c); )
          u += c, c = e[++n];
        t.push({ type: $.string, value: u });
        continue;
      }
      n++;
    }
  };
  return a(), t;
}
const Jh = new RegExp(`^${an.replace("@@", "")}_\\d+_$`), Xh = (e) => (t) => (n) => (o) => n[o] ? n[o][e] === t : !1, ce = Xh("type"), Nc = Xh("value"), hn = ce($.string), KT = ce($.whiteSpace), em = ce($.nextLine);
ce($.equal);
ce($.tilde);
ce($.plus);
const QT = ce($.sharp), JT = ce($.asterisk), Mc = ce($.commercialAt), XT = ce($.ampersand), e1 = ce($.period);
ce($.comma);
const tm = ce($.colon), kc = ce($.semicolon);
ce($.gt);
const t1 = ce($.leftBrace), n1 = ce($.rightBrace);
ce($.leftBracket);
ce($.rightBracket);
ce($.leftParent);
ce($.rightParent);
const o1 = Nc("/*"), r1 = Nc("*/"), i1 = Nc("//"), s1 = em, a1 = (e) => {
  const t = hn(e), n = tm(e), o = KT(e), r = kc(e);
  return (i) => t(i) && n(i + 1) && o(i + 2) && t(i + 3) && r(i + 4);
}, l1 = (e) => {
  const t = Mc(e), n = hn(e), o = kc(e), r = em(e);
  return (i) => t(i) && t(i + 1) && n(i + 2) && Jh.test(e[i + 2].value) && (r(i + 3) || o(i + 3));
}, nm = (e) => {
  const t = Mc(e), n = hn(e);
  return (o) => t(o) && n(o + 1);
}, c1 = (e) => {
  const t = tm(e), n = hn(e);
  return (o) => t(o) && n(o + 1);
}, u1 = hn, f1 = JT, d1 = (e) => {
  const t = Mc(e), n = hn(e);
  return (o) => t(o) && t(o + 1) && n(o + 2) && Jh.test(e[o + 2].value);
}, h1 = (e) => {
  const t = u1(e), n = f1(e), o = XT(e), r = d1(e);
  return (i) => t(i) || n(i) || o(i) || r(i);
}, m1 = (e) => {
  const t = e1(e), n = hn(e);
  return (o) => t(o) && n(o + 1);
}, p1 = (e) => {
  const t = QT(e), n = hn(e);
  return (o) => t(o) && n(o + 1);
}, y1 = (e) => {
  const t = h1(e), n = m1(e), o = p1(e), r = nm(e), i = c1(e);
  return (s) => t(s) || n(s) || o(s) || r(s) || i(s);
}, om = (e) => (t) => (n) => {
  var o;
  n && (t[e] ? (o = t[e]) == null || o.push(n) : t[e] = [n]);
}, lf = om("properties"), yr = om("children");
var Ae;
(function(e) {
  e.style = "style", e.comment = "comment", e.atRule = "atRule";
})(Ae || (Ae = {}));
let Hi = class {
  constructor(t = {}) {
    Object.defineProperty(this, "type", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: Ae.comment
    }), Object.defineProperty(this, "value", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "properties", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "parent", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: null
    }), Object.defineProperty(this, "children", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.assign(this, t);
  }
  *iterParent() {
    yield this, this.parent && (yield* this.parent.iterParent());
  }
  *[Symbol.iterator]() {
    if (yield this, !!this.children)
      for (const t of this.children)
        yield* t;
  }
};
function g1(e) {
  let t = 0;
  const n = () => t < e.length, o = a1(e), r = l1(e), i = y1(e), s = t1(e), a = n1(e), l = o1(e), c = r1(e), u = i1(e), f = s1(e), d = nm(e), h = kc(e), p = (g, v, T = Ae.style) => {
    const S = new Hi({
      type: T,
      parent: g,
      value: v
    });
    for (; n(); ) {
      let k = e[t];
      if (a(t)) {
        t++;
        break;
      }
      if (o(t)) {
        const L = e[t + 3];
        lf(S)({
          name: k.value,
          value: L.value
        }), t += 5;
        continue;
      } else if (r(t)) {
        const L = `@@${e[t + 2].value}`;
        lf(S)({
          name: L,
          value: L
        }), t += 4;
        continue;
      } else if (l(t)) {
        let L = k.value;
        for (k = e[++t]; n() && !c(t); )
          L += k.value, k = e[++t];
        L += k.value, yr(S)(new Hi({
          type: Ae.comment,
          parent: S,
          value: L
        })), t++;
        continue;
      } else if (u(t)) {
        let L = k.value;
        for (k = e[++t]; n() && !f(t); )
          L += k.value, k = e[++t];
        yr(S)(new Hi({
          type: Ae.comment,
          parent: S,
          value: L
        })), t++;
        continue;
      } else if (d(t)) {
        let L = k.value;
        for (k = e[++t]; n() && !s(t) && !h(t); )
          L += k.value, k = e[++t];
        if (h(t)) {
          L += ";", yr(S)(new Hi({
            type: Ae.atRule,
            parent: S,
            value: L
          })), t++;
          continue;
        }
        yr(S)(p(S, L.trim(), Ae.atRule));
        continue;
      } else if (i(t)) {
        let L = k.value;
        for (k = e[++t]; n() && !s(t); )
          L += k.value, k = e[++t];
        yr(S)(p(S, L.trim()));
        continue;
      }
      t++;
    }
    return S;
  };
  return p(null);
}
const v1 = (e) => g1(YT(e));
var pe;
(function(e) {
  e.string = "string", e.whiteSpace = "whiteSpace", e.lt = "lt", e.gt = "gt", e.slash = "slash", e.equal = "equal";
})(pe || (pe = {}));
var tn;
(function(e) {
  e.element = "element", e.text = "text", e.comment = "comment";
})(tn || (tn = {}));
const ot = {
  doubleQuote: '"',
  singleQuote: "'",
  whiteSpace: /\s/,
  string: /\S/,
  breakString: /<|>|=/,
  lt: "<",
  gt: ">",
  slash: "/",
  equal: "=",
  hyphen: "-",
  exclamationPoint: "!"
}, Ht = (e) => (t) => e === t, rl = (e) => (t) => e.test(t), ue = {
  doubleQuote: Ht(ot.doubleQuote),
  singleQuote: Ht(ot.singleQuote),
  whiteSpace: rl(ot.whiteSpace),
  string: rl(ot.string),
  breakString: rl(ot.breakString),
  lt: Ht(ot.lt),
  gt: Ht(ot.gt),
  slash: Ht(ot.slash),
  equal: Ht(ot.equal),
  hyphen: Ht(ot.hyphen),
  exclamationPoint: Ht(ot.exclamationPoint)
}, b1 = (e) => (t) => ue.lt(e[t]) && ue.exclamationPoint(e[t + 1]) && ue.hyphen(e[t + 2]) && ue.hyphen(e[t + 3]);
function I1(e) {
  const t = [];
  let n = 0;
  const o = () => n < e.length, r = b1(e), i = (s = tn.text) => {
    for (; o(); ) {
      let a = e[n];
      if (ue.whiteSpace(a)) {
        let l = "";
        for (; o() && ue.whiteSpace(a); )
          l += a, a = e[++n];
        s !== tn.element && t.push({ type: pe.whiteSpace, value: l });
        continue;
      }
      if (s === tn.element) {
        if (ue.lt(a)) {
          t.push({ type: pe.lt, value: a }), n++;
          continue;
        }
        if (ue.gt(a)) {
          t.push({ type: pe.gt, value: a }), n++;
          break;
        }
        if (ue.slash(a)) {
          t.push({ type: pe.slash, value: a }), n++;
          continue;
        }
        if (ue.equal(a)) {
          t.push({ type: pe.equal, value: a }), n++;
          continue;
        }
        if (ue.doubleQuote(a)) {
          let l = "";
          for (a = e[++n]; o() && !ue.doubleQuote(a); )
            l += a, a = e[++n];
          t.push({ type: pe.string, value: l }), n++;
          continue;
        }
        if (ue.singleQuote(a)) {
          let l = "";
          for (a = e[++n]; o() && !ue.singleQuote(a); )
            l += a, a = e[++n];
          t.push({ type: pe.string, value: l }), n++;
          continue;
        }
      } else if (s === tn.comment) {
        if (ue.lt(a)) {
          t.push({ type: pe.lt, value: a }), n++;
          continue;
        }
        if (ue.gt(a)) {
          t.push({ type: pe.gt, value: a }), n++;
          break;
        }
      } else if (ue.lt(a)) {
        i(r(n) ? tn.comment : tn.element);
        continue;
      }
      if (ue.string(a)) {
        let l = "";
        for (; o() && ue.string(a) && !ue.breakString(a); )
          l += a, a = e[++n];
        t.push({ type: pe.string, value: l });
        continue;
      }
      n++;
    }
  };
  return i(), t;
}
const T1 = /^(area|base|br|col|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i, rm = (e) => (t) => (n) => (o) => n[o] ? n[o][e] === t : !1, Yo = rm("type"), im = rm("value"), vi = Yo(pe.lt), bi = Yo(pe.gt), Dc = Yo(pe.slash), w1 = Yo(pe.equal), Ii = Yo(pe.string), C1 = Yo(pe.whiteSpace), O1 = im("!--"), S1 = im("--"), E1 = (e) => {
  const t = vi(e), n = Ii(e);
  return (o) => t(o) && n(o + 1);
}, x1 = (e) => {
  const t = vi(e), n = Dc(e), o = Ii(e), r = bi(e);
  return (i) => t(i) && n(i + 1) && o(i + 2) && r(i + 3);
}, $1 = (e) => {
  const t = vi(e), n = Dc(e), o = bi(e);
  return (r) => t(r) && n(r + 1) && n(r + 2) && o(r + 3);
}, A1 = (e) => {
  const t = Dc(e), n = bi(e);
  return (o) => t(o) && n(o + 1);
}, N1 = (e) => T1.test(e), M1 = (e) => {
  const t = vi(e), n = Ii(e), o = O1(e);
  return (r) => t(r) && n(r + 1) && o(r + 1);
}, k1 = (e) => {
  const t = Ii(e), n = S1(e), o = bi(e);
  return (r) => t(r) && n(r) && o(r + 1);
}, sm = (e) => (t) => (n) => {
  var o;
  n && (t[e] ? (o = t[e]) == null || o.push(n) : t[e] = [n]);
}, D1 = sm("attrs"), cf = sm("children");
function L1(e) {
  const t = new $n({
    type: we.element,
    value: "template",
    children: []
  });
  let n = 0;
  const o = () => n < e.length, r = E1(e), i = x1(e), s = $1(e), a = A1(e), l = M1(e), c = k1(e), u = vi(e), f = bi(e), d = w1(e), h = C1(e), p = Ii(e), g = () => {
    let T = e[n];
    const S = { name: T.value };
    return T = e[++n], d(n) && (T = e[++n], p(n) && (S.value = T.value, n++)), S;
  }, v = (T) => {
    let S = e[n];
    if (h(n) || p(n)) {
      let k = S.value;
      for (S = e[++n]; o() && !u(n); )
        k += S.value, S = e[++n];
      return k = k.trim(), k.length ? new $n({ parent: T, type: we.text, value: k }) : null;
    }
    if (l(n)) {
      let k = "";
      for (n += 2, S = e[n]; o() && !c(n); )
        k += S.value, S = e[++n];
      return c(n) && (n += 2), new $n({ parent: T, type: we.comment, value: k });
    }
    if (r(n)) {
      S = e[++n];
      const k = N1(S.value), L = new $n({
        parent: T,
        type: we.element,
        value: S.value.toLowerCase()
      });
      for (n++; o() && !f(n) && !a(n); ) {
        if (p(n)) {
          D1(L)(g());
          continue;
        }
        n++;
      }
      if (a(n))
        return n += 2, L;
      for (S = e[++n]; o() && !i(n) && !s(n) && !k; )
        cf(L)(v(L));
      return (i(n) || s(n)) && (n += 4), L;
    }
    return n++, null;
  };
  for (; o(); )
    cf(t)(v(t));
  return t;
}
const R1 = (e) => L1(I1(e)), _1 = (e, t) => e.reduce((n, o) => {
  const r = n[t(o)];
  return r ? r.push(o) : n[t(o)] = [o], n;
}, {});
class Co {
  get isMarker() {
    return Do(this.value);
  }
  get isMarkerOnly() {
    return gi(this.value);
  }
  get isSvg() {
    return this.type === we.element && /^svg$/i.test(this.value);
  }
  get isComponent() {
    return this.type === we.element && this.isMarkerOnly;
  }
  constructor(t, n = null) {
    if (Object.defineProperty(this, "type", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: we.comment
    }), Object.defineProperty(this, "value", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: ""
    }), Object.defineProperty(this, "staticAttrs", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "attrs", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "parent", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: null
    }), Object.defineProperty(this, "children", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.type = t.type, this.value = t.value, this.parent = n, t.attrs) {
      const [o, r] = j1(t.attrs);
      o.length && (this.staticAttrs = o), r.length && (this.attrs = r);
    }
    t.children && (this.children = t.children.map((o) => new Co(o, this)));
  }
  insert(t, n, o) {
    if (this.children) {
      const r = t === "before" ? 0 : 1;
      this.children.includes(o) && this.children.splice(this.children.indexOf(o) + r, 0, n);
    } else
      this.children = [n];
  }
  *iterParent() {
    yield this, this.parent && (yield* this.parent.iterParent());
  }
  *[Symbol.iterator]() {
    if (yield this, !!this.children)
      for (const t of this.children)
        yield* t;
  }
}
function P1(e) {
  const t = new Co(e);
  for (const n of t)
    n.type === we.text && !gi(n.value) && B1(n);
  return t;
}
function B1(e) {
  const t = be(e.value);
  e.value.replace(Al, an).split(an).reduce((n, o, r) => (r < t.length ? n.push(new Co(new $n({ type: we.text, value: o }), e.parent), new Co(new $n({ type: we.text, value: t[r][0] }), e.parent)) : n.push(new Co(new $n({ type: we.text, value: o }), e.parent)), n), []).filter((n) => n.value !== "" && !(!n.value.trim() && BI.test(n.value))).reverse().forEach((n, o, { length: r }) => o === r - 1 ? e.value = n.value : e.parent && e.parent.insert("after", n, e));
}
function j1(e = []) {
  const t = _1(e, (n) => Vi(n.name));
  return Object.keys(t).map((n) => t[n]).reduce((n, o) => {
    const [r, i] = n, s = o[o.length - 1], a = rf(s.name);
    if (a === J.event)
      i.push(...o.filter((l) => !!l.value).map((l) => ({
        type: rf(l.name),
        name: Vi(l.name),
        value: l.value
      })));
    else if (a === J.attribute) {
      const l = o.filter((u) => !!u.value).map((u) => u.value).join(" "), c = { type: a, name: Vi(s.name) };
      l && (c.value = l), of(c) ? i.push(c) : r.push(c);
    } else {
      const l = { type: a, name: Vi(s.name) };
      s.value && (l.value = s.value), of(l) ? i.push(l) : r.push(l);
    }
    return n;
  }, [[], []]);
}
const am = (e) => (t, ...n) => {
  const o = {
    strings: t,
    values: n,
    [kn]: e
  };
  if (tl.has(t)) {
    const s = tl.get(t);
    return o.template = s, o;
  }
  const r = t.reduce((s, a, l) => (l < n.length ? s.push(a, Ah(l)) : s.push(a), s), []).join(""), i = P1(R1(r));
  return o.template = Object.freeze({ node: i }), tl.set(t, o.template), o;
}, U1 = am(Ot.html), WB = am(Ot.svg), lm = (e) => mi(e) && !jt(e) && !ft(e) ? String(e) : $a(e) ? `.${String(e)}` : "", cm = (e) => (t, [n, o]) => t.replace(new RegExp(n), lm(e[o]));
class Lc {
  get selector() {
    return [...this.iterParent()].reverse().map((t) => t.toString(!0)).join(" ");
  }
  get isAtRule() {
    return this.type === Ae.atRule;
  }
  constructor(t, n = null, o) {
    var r;
    if (Object.defineProperty(this, "type", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: Ae.comment
    }), Object.defineProperty(this, "value", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "style", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: ""
    }), Object.defineProperty(this, "parent", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: null
    }), Object.defineProperty(this, "children", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "skipParent", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !1
    }), this.type = t.type, this.value = t.value, this.parent = n, t.value && t.isMarker) {
      const a = cm(o), l = be(t.value).reduce(a, t.value);
      this.value = l;
    }
    this.value && t.isThis && this.parent && (this.value = this.value.replace(/\&/, (r = this.parent) == null ? void 0 : r.toString(!0)), this.skipParent = !0), this.value && t.isAtRule && this.parent && (this.skipParent = !0);
    const [i, s] = um(t, o);
    if (t.children && s.push(...t.children.map((a) => [a, o])), this.style = i, this.children = s.filter(([a]) => a.type === Ae.style || a.type === Ae.atRule).map(([a, l]) => new Lc(a, this, l)), this.value && t.isAtRule && this.parent && t.children) {
      let a = "";
      for (const l of this.children)
        l.value && (a += `${l.value} {
${l.style}}
`);
      this.style = a;
    }
  }
  toString(t = !1) {
    return this.value ? this.value : t ? `.${uf(this.style)}` : uf(this.style);
  }
  *iterParent() {
    if (yield this, !!this.parent)
      if (this.skipParent) {
        if (!this.parent.parent)
          return;
        yield* this.parent.parent.iterParent();
      } else
        yield* this.parent.iterParent();
  }
  *[Symbol.iterator]() {
    if (yield this, !!this.children)
      for (const t of this.children)
        t.isAtRule ? yield t : yield* t;
  }
}
const il = /* @__PURE__ */ new Map();
function uf(e) {
  if (il.has(e))
    return il.get(e);
  const t = cT();
  return il.set(e, t), t;
}
const Zi = (e, t) => `${e}: ${t};
`;
function um(e, t, n = ["", []]) {
  var o;
  const r = cm(t);
  return (o = e.properties) == null || o.forEach((i) => {
    if (i.isDynamic) {
      const s = be(i.name), a = t[s[0][1]];
      $a(a) ? (a.template.node.children && n[1].push(...a.template.node.children.map((l) => [
        l,
        a.values
      ])), um(a.template.node, a.values, n)) : n[0] += lm(a);
    } else if (i.isMarkerName && i.isMarkerValue) {
      const s = be(i.name), a = be(i.value), l = s.reduce(r, i.name), c = a.reduce(r, i.value);
      n[0] += Zi(l, c);
    } else if (i.isMarkerName) {
      const s = be(i.name).reduce(r, i.name);
      n[0] += Zi(s, i.value);
    } else if (i.isMarkerValue) {
      const s = be(i.value).reduce(r, i.value);
      n[0] += Zi(i.name, s);
    } else
      n[0] += Zi(i.name, i.value);
  }), n;
}
const W1 = {
  vCSSStyleSheetMap: /* @__PURE__ */ new Map(),
  hostContextMap: /* @__PURE__ */ new Map()
};
let Ks = globalThis.ShadowRoot && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
function Ti() {
  return W1;
}
function ff(e, t) {
  const n = Ti(), o = new Lc(e, null, t);
  return [...o].forEach((r) => {
    const i = r.selector;
    if (n.vCSSStyleSheetMap.has(i))
      return;
    const s = Ks ? new CSSStyleSheet() : null, a = Ks ? null : document.createElement("style"), l = r.isAtRule && !r.style ? `${i}` : `${i} {
${r.style}}`;
    s ? s.replaceSync(l) : a && (a.textContent = l), n.vCSSStyleSheetMap.set(i, {
      selector: i,
      cssText: l,
      style: r.style,
      sheet: s,
      styleElement: a
    }), fm();
  }), String(o);
}
function fm() {
  Ks ? F1() : q1();
}
function F1() {
  const e = Ti(), t = Array.from(e.vCSSStyleSheetMap).map(([, { sheet: n }]) => n).filter(Boolean);
  Array.from(e.hostContextMap).forEach(([n]) => {
    n.adoptedStyleSheets = t;
  });
}
function q1() {
  const e = Ti();
  Array.from(e.hostContextMap).forEach(([t, { vSheets: n, styleElements: o }]) => {
    Array.from(e.vCSSStyleSheetMap).filter(([, r]) => !n.has(r)).map(([, r]) => (n.add(r), r.styleElement ? document.importNode(r.styleElement, !0) : null)).filter(Boolean).forEach((r) => {
      t.appendChild(r), o.add(r);
    });
  });
}
function V1(e) {
  const t = Ti();
  t.hostContextMap.has(e) || (t.hostContextMap.set(e, {
    vSheets: /* @__PURE__ */ new Set(),
    styleElements: /* @__PURE__ */ new Set()
  }), fm());
}
function H1(e) {
  const t = Ti(), n = t.hostContextMap.get(e);
  n && (Ks ? e.adoptedStyleSheets = [] : n.styleElements.forEach((o) => e.removeChild(o)), t.hostContextMap.delete(e));
}
const gn = Symbol.for("https://github.com/dineug/r-html#props");
function FB(e, t) {
  var n, o, r, i, s;
  t.shadow ?? (t.shadow = "open");
  const a = qT(t.observedProps), l = HT(t.observedProps), c = VT(t.observedProps), u = (s = class extends HTMLElement {
    static get observedAttributes() {
      return Array.from(/* @__PURE__ */ new Set([
        ...a,
        ...a.map((f) => oT(f))
      ]));
    }
    constructor() {
      super(), Object.defineProperty(this, i, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: yi({}, { shallow: !0 })
      }), n.set(this, null), o.set(this, this), r.set(this, void 0), Object.defineProperty(this, "host", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: this
      }), c.forEach(([f, d]) => Reflect.set(this[gn], fr(f), d)), t.shadow && b(this, o, this.attachShadow({ mode: t.shadow }), "f"), Gs(this), b(this, r, t.render.call(this, this[gn], this), "f"), Gs(null);
    }
    connectedCallback() {
      const f = this.getRootNode();
      f instanceof ShadowRoot && (this.host = f.host), m(this, o, "f") instanceof ShadowRoot && V1(m(this, o, "f")), Fe(this, wa);
      let d = !1;
      b(this, n, xc(() => {
        Fe(this, d ? Sa : Oc), BT(m(this, o, "f"), U1`${m(this, r, "f").call(this)}`), d ? Fe(this, Ea) : (Fe(this, Sc), d = !0);
      }), "f"), Fe(this, Ca);
    }
    disconnectedCallback() {
      var f;
      (f = m(this, n, "f")) == null || f.call(this), b(this, n, null, "f"), Fe(this, Oa), m(this, o, "f") instanceof ShadowRoot && H1(m(this, o, "f"));
    }
    attributeChangedCallback(f, d, h) {
      const p = l.find(([g]) => fr(g) === fr(f));
      p ? Reflect.set(this[gn], fr(f), p[1] === Boolean ? h === "true" || h === "" : p[1](h)) : Reflect.set(this[gn], fr(f), h);
    }
  }, n = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new WeakMap(), r = /* @__PURE__ */ new WeakMap(), i = gn, s);
  a.forEach((f) => {
    Object.defineProperty(u.prototype, f, {
      get() {
        return Reflect.get(this[gn], f);
      },
      set(d) {
        Reflect.set(this[gn], f, d);
      }
    });
  }), customElements.define(e, u);
}
function I(e) {
  function t(n) {
    return {
      type: e,
      payload: n,
      timestamp: Date.now()
    };
  }
  return t.toString = () => `${e}`, t.type = e, t;
}
function* Rl(e, t, n) {
  for (const o of n)
    o != null && o[Symbol.iterator] ? yield* Rl(e, t, o) : rn(o) ? yield* Rl(e, t, o(e, t)) : yield o;
}
const dm = (e, t, n) => [...Rl(e, t, n)], sl = (...e) => (t) => e.reduce((n, o) => o(n), t);
function* Z1(e) {
  yield e;
}
const al = function* (e) {
  for (const t of e)
    t.length && (yield t);
};
function z1({ context: e, state: t, reducers: n, enableObservable: o = !0 }) {
  const r = o ? yi(t) : t, i = ei(), s = ei();
  let a = sl(al);
  const l = (g) => {
    const v = Reflect.get(n, g.type, n);
    Ia(v, r, g, e);
  }, c = (...g) => {
    const v = dm(r, e, g);
    i.next(v);
  }, u = (...g) => {
    wh(() => c(...g));
  }, f = i.subscribe((g) => {
    const v = a(Z1(g));
    for (const T of v)
      s.next(T);
  }), d = s.subscribe((g) => g.forEach(l)), h = (...g) => (a = sl(...g, al), () => {
    a = sl(al);
  }), p = () => {
    f(), d();
  };
  return {
    context: e,
    state: r,
    dispatch: u,
    dispatchSync: c,
    subscribe: s.subscribe,
    pipe: h,
    destroy: p
  };
}
class G1 {
  get isMarkerName() {
    return Do(this.name);
  }
  get isMarkerValue() {
    return Do(this.value);
  }
  get isDynamic() {
    return gi(this.name) && this.name === this.value;
  }
  constructor(t) {
    Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "value", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.name = t.name, this.value = t.value;
  }
}
class Rc {
  get isMarker() {
    return Do(this.value);
  }
  get isThis() {
    var t;
    return !!((t = this.value) != null && t.startsWith("&"));
  }
  get isAtRule() {
    return this.type === Ae.atRule;
  }
  constructor(t, n = null) {
    Object.defineProperty(this, "type", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: Ae.comment
    }), Object.defineProperty(this, "value", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "properties", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "parent", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: null
    }), Object.defineProperty(this, "children", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.type = t.type, this.value = t.value, this.parent = n, t.properties && (this.properties = t.properties.map((o) => new G1(o))), t.children && (this.children = t.children.map((o) => new Rc(o, this)));
  }
  *iterParent() {
    yield this, this.parent && (yield* this.parent.iterParent());
  }
  *[Symbol.iterator]() {
    if (yield this, !!this.children)
      for (const t of this.children)
        yield* t;
  }
}
function Y1(e) {
  return new Rc(e);
}
const qB = (e, ...t) => {
  const n = {
    strings: e,
    values: t,
    [kn]: Ot.css
  };
  if (nl.has(e)) {
    const s = nl.get(e), a = ff(s.node, t);
    return n.template = s, n.toString = () => a, n;
  }
  const o = e.raw.reduce((s, a, l) => (l < t.length ? s.push(a, Ah(l)) : s.push(a), s), []).join(""), r = Y1(v1(o)), i = ff(r, t);
  return n.template = Object.freeze({ node: r }), n.toString = () => i, nl.set(e, n.template), n;
};
var _l = function(e, t) {
  return _l = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, o) {
    n.__proto__ = o;
  } || function(n, o) {
    for (var r in o)
      Object.prototype.hasOwnProperty.call(o, r) && (n[r] = o[r]);
  }, _l(e, t);
};
function mn(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  _l(e, t);
  function n() {
    this.constructor = e;
  }
  e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
function K1(e, t, n, o) {
  function r(i) {
    return i instanceof n ? i : new n(function(s) {
      s(i);
    });
  }
  return new (n || (n = Promise))(function(i, s) {
    function a(u) {
      try {
        c(o.next(u));
      } catch (f) {
        s(f);
      }
    }
    function l(u) {
      try {
        c(o.throw(u));
      } catch (f) {
        s(f);
      }
    }
    function c(u) {
      u.done ? i(u.value) : r(u.value).then(a, l);
    }
    c((o = o.apply(e, t || [])).next());
  });
}
function hm(e, t) {
  var n = { label: 0, sent: function() {
    if (i[0] & 1)
      throw i[1];
    return i[1];
  }, trys: [], ops: [] }, o, r, i, s;
  return s = { next: a(0), throw: a(1), return: a(2) }, typeof Symbol == "function" && (s[Symbol.iterator] = function() {
    return this;
  }), s;
  function a(c) {
    return function(u) {
      return l([c, u]);
    };
  }
  function l(c) {
    if (o)
      throw new TypeError("Generator is already executing.");
    for (; s && (s = 0, c[0] && (n = 0)), n; )
      try {
        if (o = 1, r && (i = c[0] & 2 ? r.return : c[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, c[1])).done)
          return i;
        switch (r = 0, i && (c = [c[0] & 2, i.value]), c[0]) {
          case 0:
          case 1:
            i = c;
            break;
          case 4:
            return n.label++, { value: c[1], done: !1 };
          case 5:
            n.label++, r = c[1], c = [0];
            continue;
          case 7:
            c = n.ops.pop(), n.trys.pop();
            continue;
          default:
            if (i = n.trys, !(i = i.length > 0 && i[i.length - 1]) && (c[0] === 6 || c[0] === 2)) {
              n = 0;
              continue;
            }
            if (c[0] === 3 && (!i || c[1] > i[0] && c[1] < i[3])) {
              n.label = c[1];
              break;
            }
            if (c[0] === 6 && n.label < i[1]) {
              n.label = i[1], i = c;
              break;
            }
            if (i && n.label < i[2]) {
              n.label = i[2], n.ops.push(c);
              break;
            }
            i[2] && n.ops.pop(), n.trys.pop();
            continue;
        }
        c = t.call(e, n);
      } catch (u) {
        c = [6, u], r = 0;
      } finally {
        o = i = 0;
      }
    if (c[0] & 5)
      throw c[1];
    return { value: c[0] ? c[1] : void 0, done: !0 };
  }
}
function Ro(e) {
  var t = typeof Symbol == "function" && Symbol.iterator, n = t && e[t], o = 0;
  if (n)
    return n.call(e);
  if (e && typeof e.length == "number")
    return {
      next: function() {
        return e && o >= e.length && (e = void 0), { value: e && e[o++], done: !e };
      }
    };
  throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function _o(e, t) {
  var n = typeof Symbol == "function" && e[Symbol.iterator];
  if (!n)
    return e;
  var o = n.call(e), r, i = [], s;
  try {
    for (; (t === void 0 || t-- > 0) && !(r = o.next()).done; )
      i.push(r.value);
  } catch (a) {
    s = { error: a };
  } finally {
    try {
      r && !r.done && (n = o.return) && n.call(o);
    } finally {
      if (s)
        throw s.error;
    }
  }
  return i;
}
function Po(e, t, n) {
  if (n || arguments.length === 2)
    for (var o = 0, r = t.length, i; o < r; o++)
      (i || !(o in t)) && (i || (i = Array.prototype.slice.call(t, 0, o)), i[o] = t[o]);
  return e.concat(i || Array.prototype.slice.call(t));
}
function Oo(e) {
  return this instanceof Oo ? (this.v = e, this) : new Oo(e);
}
function Q1(e, t, n) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var o = n.apply(e, t || []), r, i = [];
  return r = {}, s("next"), s("throw"), s("return"), r[Symbol.asyncIterator] = function() {
    return this;
  }, r;
  function s(d) {
    o[d] && (r[d] = function(h) {
      return new Promise(function(p, g) {
        i.push([d, h, p, g]) > 1 || a(d, h);
      });
    });
  }
  function a(d, h) {
    try {
      l(o[d](h));
    } catch (p) {
      f(i[0][3], p);
    }
  }
  function l(d) {
    d.value instanceof Oo ? Promise.resolve(d.value.v).then(c, u) : f(i[0][2], d);
  }
  function c(d) {
    a("next", d);
  }
  function u(d) {
    a("throw", d);
  }
  function f(d, h) {
    d(h), i.shift(), i.length && a(i[0][0], i[0][1]);
  }
}
function J1(e) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var t = e[Symbol.asyncIterator], n;
  return t ? t.call(e) : (e = typeof Ro == "function" ? Ro(e) : e[Symbol.iterator](), n = {}, o("next"), o("throw"), o("return"), n[Symbol.asyncIterator] = function() {
    return this;
  }, n);
  function o(i) {
    n[i] = e[i] && function(s) {
      return new Promise(function(a, l) {
        s = e[i](s), r(a, l, s.done, s.value);
      });
    };
  }
  function r(i, s, a, l) {
    Promise.resolve(l).then(function(c) {
      i({ value: c, done: a });
    }, s);
  }
}
function VB(e, t, n, o) {
  if (n === "a" && !o)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? e !== t || !o : !t.has(e))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return n === "m" ? o : n === "a" ? o.call(e) : o ? o.value : t.get(e);
}
function ge(e) {
  return typeof e == "function";
}
function mm(e) {
  var t = function(o) {
    Error.call(o), o.stack = new Error().stack;
  }, n = e(t);
  return n.prototype = Object.create(Error.prototype), n.prototype.constructor = n, n;
}
var ll = mm(function(e) {
  return function(n) {
    e(this), this.message = n ? n.length + ` errors occurred during unsubscription:
` + n.map(function(o, r) {
      return r + 1 + ") " + o.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = n;
  };
});
function Qs(e, t) {
  if (e) {
    var n = e.indexOf(t);
    0 <= n && e.splice(n, 1);
  }
}
var wi = function() {
  function e(t) {
    this.initialTeardown = t, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return e.prototype.unsubscribe = function() {
    var t, n, o, r, i;
    if (!this.closed) {
      this.closed = !0;
      var s = this._parentage;
      if (s)
        if (this._parentage = null, Array.isArray(s))
          try {
            for (var a = Ro(s), l = a.next(); !l.done; l = a.next()) {
              var c = l.value;
              c.remove(this);
            }
          } catch (g) {
            t = { error: g };
          } finally {
            try {
              l && !l.done && (n = a.return) && n.call(a);
            } finally {
              if (t)
                throw t.error;
            }
          }
        else
          s.remove(this);
      var u = this.initialTeardown;
      if (ge(u))
        try {
          u();
        } catch (g) {
          i = g instanceof ll ? g.errors : [g];
        }
      var f = this._finalizers;
      if (f) {
        this._finalizers = null;
        try {
          for (var d = Ro(f), h = d.next(); !h.done; h = d.next()) {
            var p = h.value;
            try {
              df(p);
            } catch (g) {
              i = i ?? [], g instanceof ll ? i = Po(Po([], _o(i)), _o(g.errors)) : i.push(g);
            }
          }
        } catch (g) {
          o = { error: g };
        } finally {
          try {
            h && !h.done && (r = d.return) && r.call(d);
          } finally {
            if (o)
              throw o.error;
          }
        }
      }
      if (i)
        throw new ll(i);
    }
  }, e.prototype.add = function(t) {
    var n;
    if (t && t !== this)
      if (this.closed)
        df(t);
      else {
        if (t instanceof e) {
          if (t.closed || t._hasParent(this))
            return;
          t._addParent(this);
        }
        (this._finalizers = (n = this._finalizers) !== null && n !== void 0 ? n : []).push(t);
      }
  }, e.prototype._hasParent = function(t) {
    var n = this._parentage;
    return n === t || Array.isArray(n) && n.includes(t);
  }, e.prototype._addParent = function(t) {
    var n = this._parentage;
    this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
  }, e.prototype._removeParent = function(t) {
    var n = this._parentage;
    n === t ? this._parentage = null : Array.isArray(n) && Qs(n, t);
  }, e.prototype.remove = function(t) {
    var n = this._finalizers;
    n && Qs(n, t), t instanceof e && t._removeParent(this);
  }, e.EMPTY = function() {
    var t = new e();
    return t.closed = !0, t;
  }(), e;
}(), pm = wi.EMPTY;
function ym(e) {
  return e instanceof wi || e && "closed" in e && ge(e.remove) && ge(e.add) && ge(e.unsubscribe);
}
function df(e) {
  ge(e) ? e() : e.unsubscribe();
}
var gm = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1
}, Pl = {
  setTimeout: function(e, t) {
    for (var n = [], o = 2; o < arguments.length; o++)
      n[o - 2] = arguments[o];
    var r = Pl.delegate;
    return r != null && r.setTimeout ? r.setTimeout.apply(r, Po([e, t], _o(n))) : setTimeout.apply(void 0, Po([e, t], _o(n)));
  },
  clearTimeout: function(e) {
    var t = Pl.delegate;
    return ((t == null ? void 0 : t.clearTimeout) || clearTimeout)(e);
  },
  delegate: void 0
};
function vm(e) {
  Pl.setTimeout(function() {
    throw e;
  });
}
function Bl() {
}
function Bs(e) {
  e();
}
var _c = function(e) {
  mn(t, e);
  function t(n) {
    var o = e.call(this) || this;
    return o.isStopped = !1, n ? (o.destination = n, ym(n) && n.add(o)) : o.destination = nw, o;
  }
  return t.create = function(n, o, r) {
    return new jl(n, o, r);
  }, t.prototype.next = function(n) {
    this.isStopped || this._next(n);
  }, t.prototype.error = function(n) {
    this.isStopped || (this.isStopped = !0, this._error(n));
  }, t.prototype.complete = function() {
    this.isStopped || (this.isStopped = !0, this._complete());
  }, t.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = !0, e.prototype.unsubscribe.call(this), this.destination = null);
  }, t.prototype._next = function(n) {
    this.destination.next(n);
  }, t.prototype._error = function(n) {
    try {
      this.destination.error(n);
    } finally {
      this.unsubscribe();
    }
  }, t.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  }, t;
}(wi), X1 = Function.prototype.bind;
function cl(e, t) {
  return X1.call(e, t);
}
var ew = function() {
  function e(t) {
    this.partialObserver = t;
  }
  return e.prototype.next = function(t) {
    var n = this.partialObserver;
    if (n.next)
      try {
        n.next(t);
      } catch (o) {
        zi(o);
      }
  }, e.prototype.error = function(t) {
    var n = this.partialObserver;
    if (n.error)
      try {
        n.error(t);
      } catch (o) {
        zi(o);
      }
    else
      zi(t);
  }, e.prototype.complete = function() {
    var t = this.partialObserver;
    if (t.complete)
      try {
        t.complete();
      } catch (n) {
        zi(n);
      }
  }, e;
}(), jl = function(e) {
  mn(t, e);
  function t(n, o, r) {
    var i = e.call(this) || this, s;
    if (ge(n) || !n)
      s = {
        next: n ?? void 0,
        error: o ?? void 0,
        complete: r ?? void 0
      };
    else {
      var a;
      i && gm.useDeprecatedNextContext ? (a = Object.create(n), a.unsubscribe = function() {
        return i.unsubscribe();
      }, s = {
        next: n.next && cl(n.next, a),
        error: n.error && cl(n.error, a),
        complete: n.complete && cl(n.complete, a)
      }) : s = n;
    }
    return i.destination = new ew(s), i;
  }
  return t;
}(_c);
function zi(e) {
  vm(e);
}
function tw(e) {
  throw e;
}
var nw = {
  closed: !0,
  next: Bl,
  error: tw,
  complete: Bl
}, Pc = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}();
function ow(e) {
  return e;
}
function rw(e) {
  return e.length === 0 ? ow : e.length === 1 ? e[0] : function(n) {
    return e.reduce(function(o, r) {
      return r(o);
    }, n);
  };
}
var Xe = function() {
  function e(t) {
    t && (this._subscribe = t);
  }
  return e.prototype.lift = function(t) {
    var n = new e();
    return n.source = this, n.operator = t, n;
  }, e.prototype.subscribe = function(t, n, o) {
    var r = this, i = sw(t) ? t : new jl(t, n, o);
    return Bs(function() {
      var s = r, a = s.operator, l = s.source;
      i.add(a ? a.call(i, l) : l ? r._subscribe(i) : r._trySubscribe(i));
    }), i;
  }, e.prototype._trySubscribe = function(t) {
    try {
      return this._subscribe(t);
    } catch (n) {
      t.error(n);
    }
  }, e.prototype.forEach = function(t, n) {
    var o = this;
    return n = hf(n), new n(function(r, i) {
      var s = new jl({
        next: function(a) {
          try {
            t(a);
          } catch (l) {
            i(l), s.unsubscribe();
          }
        },
        error: i,
        complete: r
      });
      o.subscribe(s);
    });
  }, e.prototype._subscribe = function(t) {
    var n;
    return (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(t);
  }, e.prototype[Pc] = function() {
    return this;
  }, e.prototype.pipe = function() {
    for (var t = [], n = 0; n < arguments.length; n++)
      t[n] = arguments[n];
    return rw(t)(this);
  }, e.prototype.toPromise = function(t) {
    var n = this;
    return t = hf(t), new t(function(o, r) {
      var i;
      n.subscribe(function(s) {
        return i = s;
      }, function(s) {
        return r(s);
      }, function() {
        return o(i);
      });
    });
  }, e.create = function(t) {
    return new e(t);
  }, e;
}();
function hf(e) {
  var t;
  return (t = e ?? gm.Promise) !== null && t !== void 0 ? t : Promise;
}
function iw(e) {
  return e && ge(e.next) && ge(e.error) && ge(e.complete);
}
function sw(e) {
  return e && e instanceof _c || iw(e) && ym(e);
}
function aw(e) {
  return ge(e == null ? void 0 : e.lift);
}
function Zn(e) {
  return function(t) {
    if (aw(t))
      return t.lift(function(n) {
        try {
          return e(n, this);
        } catch (o) {
          this.error(o);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function St(e, t, n, o, r) {
  return new bm(e, t, n, o, r);
}
var bm = function(e) {
  mn(t, e);
  function t(n, o, r, i, s, a) {
    var l = e.call(this, n) || this;
    return l.onFinalize = s, l.shouldUnsubscribe = a, l._next = o ? function(c) {
      try {
        o(c);
      } catch (u) {
        n.error(u);
      }
    } : e.prototype._next, l._error = i ? function(c) {
      try {
        i(c);
      } catch (u) {
        n.error(u);
      } finally {
        this.unsubscribe();
      }
    } : e.prototype._error, l._complete = r ? function() {
      try {
        r();
      } catch (c) {
        n.error(c);
      } finally {
        this.unsubscribe();
      }
    } : e.prototype._complete, l;
  }
  return t.prototype.unsubscribe = function() {
    var n;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var o = this.closed;
      e.prototype.unsubscribe.call(this), !o && ((n = this.onFinalize) === null || n === void 0 || n.call(this));
    }
  }, t;
}(_c), lw = mm(function(e) {
  return function() {
    e(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), Im = function(e) {
  mn(t, e);
  function t() {
    var n = e.call(this) || this;
    return n.closed = !1, n.currentObservers = null, n.observers = [], n.isStopped = !1, n.hasError = !1, n.thrownError = null, n;
  }
  return t.prototype.lift = function(n) {
    var o = new mf(this, this);
    return o.operator = n, o;
  }, t.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new lw();
  }, t.prototype.next = function(n) {
    var o = this;
    Bs(function() {
      var r, i;
      if (o._throwIfClosed(), !o.isStopped) {
        o.currentObservers || (o.currentObservers = Array.from(o.observers));
        try {
          for (var s = Ro(o.currentObservers), a = s.next(); !a.done; a = s.next()) {
            var l = a.value;
            l.next(n);
          }
        } catch (c) {
          r = { error: c };
        } finally {
          try {
            a && !a.done && (i = s.return) && i.call(s);
          } finally {
            if (r)
              throw r.error;
          }
        }
      }
    });
  }, t.prototype.error = function(n) {
    var o = this;
    Bs(function() {
      if (o._throwIfClosed(), !o.isStopped) {
        o.hasError = o.isStopped = !0, o.thrownError = n;
        for (var r = o.observers; r.length; )
          r.shift().error(n);
      }
    });
  }, t.prototype.complete = function() {
    var n = this;
    Bs(function() {
      if (n._throwIfClosed(), !n.isStopped) {
        n.isStopped = !0;
        for (var o = n.observers; o.length; )
          o.shift().complete();
      }
    });
  }, t.prototype.unsubscribe = function() {
    this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
  }, Object.defineProperty(t.prototype, "observed", {
    get: function() {
      var n;
      return ((n = this.observers) === null || n === void 0 ? void 0 : n.length) > 0;
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype._trySubscribe = function(n) {
    return this._throwIfClosed(), e.prototype._trySubscribe.call(this, n);
  }, t.prototype._subscribe = function(n) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(n), this._innerSubscribe(n);
  }, t.prototype._innerSubscribe = function(n) {
    var o = this, r = this, i = r.hasError, s = r.isStopped, a = r.observers;
    return i || s ? pm : (this.currentObservers = null, a.push(n), new wi(function() {
      o.currentObservers = null, Qs(a, n);
    }));
  }, t.prototype._checkFinalizedStatuses = function(n) {
    var o = this, r = o.hasError, i = o.thrownError, s = o.isStopped;
    r ? n.error(i) : s && n.complete();
  }, t.prototype.asObservable = function() {
    var n = new Xe();
    return n.source = this, n;
  }, t.create = function(n, o) {
    return new mf(n, o);
  }, t;
}(Xe), mf = function(e) {
  mn(t, e);
  function t(n, o) {
    var r = e.call(this) || this;
    return r.destination = n, r.source = o, r;
  }
  return t.prototype.next = function(n) {
    var o, r;
    (r = (o = this.destination) === null || o === void 0 ? void 0 : o.next) === null || r === void 0 || r.call(o, n);
  }, t.prototype.error = function(n) {
    var o, r;
    (r = (o = this.destination) === null || o === void 0 ? void 0 : o.error) === null || r === void 0 || r.call(o, n);
  }, t.prototype.complete = function() {
    var n, o;
    (o = (n = this.destination) === null || n === void 0 ? void 0 : n.complete) === null || o === void 0 || o.call(n);
  }, t.prototype._subscribe = function(n) {
    var o, r;
    return (r = (o = this.source) === null || o === void 0 ? void 0 : o.subscribe(n)) !== null && r !== void 0 ? r : pm;
  }, t;
}(Im), Tm = {
  now: function() {
    return (Tm.delegate || Date).now();
  },
  delegate: void 0
}, cw = function(e) {
  mn(t, e);
  function t(n, o) {
    return e.call(this) || this;
  }
  return t.prototype.schedule = function(n, o) {
    return this;
  }, t;
}(wi), Js = {
  setInterval: function(e, t) {
    for (var n = [], o = 2; o < arguments.length; o++)
      n[o - 2] = arguments[o];
    var r = Js.delegate;
    return r != null && r.setInterval ? r.setInterval.apply(r, Po([e, t], _o(n))) : setInterval.apply(void 0, Po([e, t], _o(n)));
  },
  clearInterval: function(e) {
    var t = Js.delegate;
    return ((t == null ? void 0 : t.clearInterval) || clearInterval)(e);
  },
  delegate: void 0
}, uw = function(e) {
  mn(t, e);
  function t(n, o) {
    var r = e.call(this, n, o) || this;
    return r.scheduler = n, r.work = o, r.pending = !1, r;
  }
  return t.prototype.schedule = function(n, o) {
    var r;
    if (o === void 0 && (o = 0), this.closed)
      return this;
    this.state = n;
    var i = this.id, s = this.scheduler;
    return i != null && (this.id = this.recycleAsyncId(s, i, o)), this.pending = !0, this.delay = o, this.id = (r = this.id) !== null && r !== void 0 ? r : this.requestAsyncId(s, this.id, o), this;
  }, t.prototype.requestAsyncId = function(n, o, r) {
    return r === void 0 && (r = 0), Js.setInterval(n.flush.bind(n, this), r);
  }, t.prototype.recycleAsyncId = function(n, o, r) {
    if (r === void 0 && (r = 0), r != null && this.delay === r && this.pending === !1)
      return o;
    o != null && Js.clearInterval(o);
  }, t.prototype.execute = function(n, o) {
    if (this.closed)
      return new Error("executing a cancelled action");
    this.pending = !1;
    var r = this._execute(n, o);
    if (r)
      return r;
    this.pending === !1 && this.id != null && (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
  }, t.prototype._execute = function(n, o) {
    var r = !1, i;
    try {
      this.work(n);
    } catch (s) {
      r = !0, i = s || new Error("Scheduled action threw falsy error");
    }
    if (r)
      return this.unsubscribe(), i;
  }, t.prototype.unsubscribe = function() {
    if (!this.closed) {
      var n = this, o = n.id, r = n.scheduler, i = r.actions;
      this.work = this.state = this.scheduler = null, this.pending = !1, Qs(i, this), o != null && (this.id = this.recycleAsyncId(r, o, null)), this.delay = null, e.prototype.unsubscribe.call(this);
    }
  }, t;
}(cw), pf = function() {
  function e(t, n) {
    n === void 0 && (n = e.now), this.schedulerActionCtor = t, this.now = n;
  }
  return e.prototype.schedule = function(t, n, o) {
    return n === void 0 && (n = 0), new this.schedulerActionCtor(this, t).schedule(o, n);
  }, e.now = Tm.now, e;
}(), fw = function(e) {
  mn(t, e);
  function t(n, o) {
    o === void 0 && (o = pf.now);
    var r = e.call(this, n, o) || this;
    return r.actions = [], r._active = !1, r;
  }
  return t.prototype.flush = function(n) {
    var o = this.actions;
    if (this._active) {
      o.push(n);
      return;
    }
    var r;
    this._active = !0;
    do
      if (r = n.execute(n.state, n.delay))
        break;
    while (n = o.shift());
    if (this._active = !1, r) {
      for (; n = o.shift(); )
        n.unsubscribe();
      throw r;
    }
  }, t;
}(pf), Bc = new fw(uw), dw = Bc;
function hw(e) {
  return e && ge(e.schedule);
}
var mw = function(e) {
  return e && typeof e.length == "number" && typeof e != "function";
};
function pw(e) {
  return ge(e == null ? void 0 : e.then);
}
function yw(e) {
  return ge(e[Pc]);
}
function gw(e) {
  return Symbol.asyncIterator && ge(e == null ? void 0 : e[Symbol.asyncIterator]);
}
function vw(e) {
  return new TypeError("You provided " + (e !== null && typeof e == "object" ? "an invalid object" : "'" + e + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
function bw() {
  return typeof Symbol != "function" || !Symbol.iterator ? "@@iterator" : Symbol.iterator;
}
var Iw = bw();
function Tw(e) {
  return ge(e == null ? void 0 : e[Iw]);
}
function ww(e) {
  return Q1(this, arguments, function() {
    var n, o, r, i;
    return hm(this, function(s) {
      switch (s.label) {
        case 0:
          n = e.getReader(), s.label = 1;
        case 1:
          s.trys.push([1, , 9, 10]), s.label = 2;
        case 2:
          return [4, Oo(n.read())];
        case 3:
          return o = s.sent(), r = o.value, i = o.done, i ? [4, Oo(void 0)] : [3, 5];
        case 4:
          return [2, s.sent()];
        case 5:
          return [4, Oo(r)];
        case 6:
          return [4, s.sent()];
        case 7:
          return s.sent(), [3, 2];
        case 8:
          return [3, 10];
        case 9:
          return n.releaseLock(), [7];
        case 10:
          return [2];
      }
    });
  });
}
function Cw(e) {
  return ge(e == null ? void 0 : e.getReader);
}
function Ci(e) {
  if (e instanceof Xe)
    return e;
  if (e != null) {
    if (yw(e))
      return Ow(e);
    if (mw(e))
      return Sw(e);
    if (pw(e))
      return Ew(e);
    if (gw(e))
      return wm(e);
    if (Tw(e))
      return xw(e);
    if (Cw(e))
      return $w(e);
  }
  throw vw(e);
}
function Ow(e) {
  return new Xe(function(t) {
    var n = e[Pc]();
    if (ge(n.subscribe))
      return n.subscribe(t);
    throw new TypeError("Provided object does not correctly implement Symbol.observable");
  });
}
function Sw(e) {
  return new Xe(function(t) {
    for (var n = 0; n < e.length && !t.closed; n++)
      t.next(e[n]);
    t.complete();
  });
}
function Ew(e) {
  return new Xe(function(t) {
    e.then(function(n) {
      t.closed || (t.next(n), t.complete());
    }, function(n) {
      return t.error(n);
    }).then(null, vm);
  });
}
function xw(e) {
  return new Xe(function(t) {
    var n, o;
    try {
      for (var r = Ro(e), i = r.next(); !i.done; i = r.next()) {
        var s = i.value;
        if (t.next(s), t.closed)
          return;
      }
    } catch (a) {
      n = { error: a };
    } finally {
      try {
        i && !i.done && (o = r.return) && o.call(r);
      } finally {
        if (n)
          throw n.error;
      }
    }
    t.complete();
  });
}
function wm(e) {
  return new Xe(function(t) {
    Aw(e, t).catch(function(n) {
      return t.error(n);
    });
  });
}
function $w(e) {
  return wm(ww(e));
}
function Aw(e, t) {
  var n, o, r, i;
  return K1(this, void 0, void 0, function() {
    var s, a;
    return hm(this, function(l) {
      switch (l.label) {
        case 0:
          l.trys.push([0, 5, 6, 11]), n = J1(e), l.label = 1;
        case 1:
          return [4, n.next()];
        case 2:
          if (o = l.sent(), !!o.done)
            return [3, 4];
          if (s = o.value, t.next(s), t.closed)
            return [2];
          l.label = 3;
        case 3:
          return [3, 1];
        case 4:
          return [3, 11];
        case 5:
          return a = l.sent(), r = { error: a }, [3, 11];
        case 6:
          return l.trys.push([6, , 9, 10]), o && !o.done && (i = n.return) ? [4, i.call(n)] : [3, 8];
        case 7:
          l.sent(), l.label = 8;
        case 8:
          return [3, 10];
        case 9:
          if (r)
            throw r.error;
          return [7];
        case 10:
          return [7];
        case 11:
          return t.complete(), [2];
      }
    });
  });
}
function Nw(e, t, n, o, r) {
  o === void 0 && (o = 0), r === void 0 && (r = !1);
  var i = t.schedule(function() {
    n(), r ? e.add(this.schedule(null, o)) : this.unsubscribe();
  }, o);
  if (e.add(i), !r)
    return i;
}
function Mw(e) {
  return e instanceof Date && !isNaN(e);
}
function Xs(e, t) {
  return Zn(function(n, o) {
    var r = 0;
    n.subscribe(St(o, function(i) {
      o.next(e.call(t, i, r++));
    }));
  });
}
function kw(e, t, n, o, r, i, s, a) {
  var l = [], c = 0, u = 0, f = !1, d = function() {
    f && !l.length && !c && t.complete();
  }, h = function(g) {
    return c < o ? p(g) : l.push(g);
  }, p = function(g) {
    i && t.next(g), c++;
    var v = !1;
    Ci(n(g, u++)).subscribe(St(t, function(T) {
      r == null || r(T), i ? h(T) : t.next(T);
    }, function() {
      v = !0;
    }, void 0, function() {
      if (v)
        try {
          c--;
          for (var T = function() {
            var S = l.shift();
            s ? Nw(t, s, function() {
              return p(S);
            }) : p(S);
          }; l.length && c < o; )
            T();
          d();
        } catch (S) {
          t.error(S);
        }
    }));
  };
  return e.subscribe(St(t, h, function() {
    f = !0, d();
  })), function() {
    a == null || a();
  };
}
function Cm(e, t, n) {
  return n === void 0 && (n = 1 / 0), ge(t) ? Cm(function(o, r) {
    return Xs(function(i, s) {
      return t(o, i, r, s);
    })(Ci(e(o, r)));
  }, n) : (typeof t == "number" && (n = t), Zn(function(o, r) {
    return kw(o, r, e, n);
  }));
}
function Dw(e, t, n) {
  e === void 0 && (e = 0), n === void 0 && (n = dw);
  var o = -1;
  return t != null && (hw(t) ? n = t : o = t), new Xe(function(r) {
    var i = Mw(e) ? +e - n.now() : e;
    i < 0 && (i = 0);
    var s = 0;
    return n.schedule(function() {
      r.closed || (r.next(s++), 0 <= o ? this.schedule(void 0, o) : r.complete());
    }, i);
  });
}
function Lw(e, t) {
  return Zn(function(n, o) {
    var r = 0;
    n.subscribe(St(o, function(i) {
      return e.call(t, i, r++) && o.next(i);
    }));
  });
}
function Rw(e) {
  return Zn(function(t, n) {
    var o = [];
    return t.subscribe(St(n, function(r) {
      return o.push(r);
    }, function() {
      n.next(o), n.complete();
    })), Ci(e).subscribe(St(n, function() {
      var r = o;
      o = [], n.next(r);
    }, Bl)), function() {
      o = null;
    };
  });
}
function _w(e, t) {
  return t === void 0 && (t = Bc), Zn(function(n, o) {
    var r = null, i = null, s = null, a = function() {
      if (r) {
        r.unsubscribe(), r = null;
        var c = i;
        i = null, o.next(c);
      }
    };
    function l() {
      var c = s + e, u = t.now();
      if (u < c) {
        r = this.schedule(void 0, c - u), o.add(r);
        return;
      }
      a();
    }
    n.subscribe(St(o, function(c) {
      i = c, s = t.now(), r || (r = t.schedule(l, e), o.add(r));
    }, function() {
      a(), o.complete();
    }, void 0, function() {
      i = r = null;
    }));
  });
}
function Pw(e, t, n, o) {
  return Zn(function(r, i) {
    var s;
    !t || typeof t == "function" ? s = t : (n = t.duration, s = t.element, o = t.connector);
    var a = /* @__PURE__ */ new Map(), l = function(p) {
      a.forEach(p), p(i);
    }, c = function(p) {
      return l(function(g) {
        return g.error(p);
      });
    }, u = 0, f = !1, d = new bm(i, function(p) {
      try {
        var g = e(p), v = a.get(g);
        if (!v) {
          a.set(g, v = o ? o() : new Im());
          var T = h(g, v);
          if (i.next(T), n) {
            var S = St(v, function() {
              v.complete(), S == null || S.unsubscribe();
            }, void 0, void 0, function() {
              return a.delete(g);
            });
            d.add(Ci(n(T)).subscribe(S));
          }
        }
        v.next(s ? s(p) : p);
      } catch (k) {
        c(k);
      }
    }, function() {
      return l(function(p) {
        return p.complete();
      });
    }, c, function() {
      return a.clear();
    }, function() {
      return f = !0, u === 0;
    });
    r.subscribe(d);
    function h(p, g) {
      var v = new Xe(function(T) {
        u++;
        var S = g.subscribe(T);
        return function() {
          S.unsubscribe(), --u === 0 && f && d.unsubscribe();
        };
      });
      return v.key = p, v;
    }
  });
}
function Bw(e, t) {
  return Zn(function(n, o) {
    var r = t ?? {}, i = r.leading, s = i === void 0 ? !0 : i, a = r.trailing, l = a === void 0 ? !1 : a, c = !1, u = null, f = null, d = !1, h = function() {
      f == null || f.unsubscribe(), f = null, l && (v(), d && o.complete());
    }, p = function() {
      f = null, d && o.complete();
    }, g = function(T) {
      return f = Ci(e(T)).subscribe(St(o, h, p));
    }, v = function() {
      if (c) {
        c = !1;
        var T = u;
        u = null, o.next(T), !d && g(T);
      }
    };
    n.subscribe(St(o, function(T) {
      c = !0, u = T, !(f && !f.closed) && (s ? v() : g(T));
    }, function() {
      d = !0, !(l && c && f && !f.closed) && o.complete();
    }));
  });
}
function jw(e, t, n) {
  t === void 0 && (t = Bc);
  var o = Dw(e, t);
  return Bw(function() {
    return o;
  }, n);
}
function M(e) {
  const t = new Set(e);
  return (n) => t.has(n);
}
function Uw(e, ...t) {
  try {
    return e == null ? void 0 : e(...t);
  } catch (n) {
    console.error(n);
  }
}
const Ww = (e) => {
  Promise.resolve().then(e);
}, HB = queueMicrotask ?? Ww, jc = (e) => (t) => typeof t === e, ZB = jc("function"), ni = jc("string"), Fw = jc("undefined"), qw = (e) => e === null, Ko = (e) => qw(e) || Fw(e), { isArray: zB } = Array, Vw = (e) => Number.isInteger(e), Hw = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let Zw = (e, t, n) => {
  let o = (2 << Math.log(e.length - 1) / Math.LN2) - 1, r = -~(1.6 * o * t / e.length);
  return (i = t) => {
    let s = "";
    for (; ; ) {
      let a = n(r), l = r;
      for (; l--; )
        if (s += e[a[l] & o] || "", s.length === i)
          return s;
    }
  };
};
const me = Zw(Hw, 21, (e) => {
  let t = globalThis.crypto;
  return t === void 0 && (t = require("node:crypto").webcrypto), t.getRandomValues(new Uint8Array(e));
}), Un = (e, t) => (n) => Math.min(Math.max(n, e), t);
var zw = typeof global == "object" && global && global.Object === Object && global;
const Om = zw;
var Gw = typeof self == "object" && self && self.Object === Object && self, Yw = Om || Gw || Function("return this")();
const pt = Yw;
var Kw = pt.Symbol;
const et = Kw;
var Sm = Object.prototype, Qw = Sm.hasOwnProperty, Jw = Sm.toString, gr = et ? et.toStringTag : void 0;
function Xw(e) {
  var t = Qw.call(e, gr), n = e[gr];
  try {
    e[gr] = void 0;
    var o = !0;
  } catch {
  }
  var r = Jw.call(e);
  return o && (t ? e[gr] = n : delete e[gr]), r;
}
var eC = Object.prototype, tC = eC.toString;
function nC(e) {
  return tC.call(e);
}
var oC = "[object Null]", rC = "[object Undefined]", yf = et ? et.toStringTag : void 0;
function zn(e) {
  return e == null ? e === void 0 ? rC : oC : yf && yf in Object(e) ? Xw(e) : nC(e);
}
function Ut(e) {
  return e != null && typeof e == "object";
}
var iC = "[object Symbol]";
function Aa(e) {
  return typeof e == "symbol" || Ut(e) && zn(e) == iC;
}
function Em(e, t) {
  for (var n = -1, o = e == null ? 0 : e.length, r = Array(o); ++n < o; )
    r[n] = t(e[n], n, e);
  return r;
}
var sC = Array.isArray;
const Pe = sC;
var aC = 1 / 0, gf = et ? et.prototype : void 0, vf = gf ? gf.toString : void 0;
function xm(e) {
  if (typeof e == "string")
    return e;
  if (Pe(e))
    return Em(e, xm) + "";
  if (Aa(e))
    return vf ? vf.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -aC ? "-0" : t;
}
var lC = /\s/;
function cC(e) {
  for (var t = e.length; t-- && lC.test(e.charAt(t)); )
    ;
  return t;
}
var uC = /^\s+/;
function fC(e) {
  return e && e.slice(0, cC(e) + 1).replace(uC, "");
}
function dt(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var bf = NaN, dC = /^[-+]0x[0-9a-f]+$/i, hC = /^0b[01]+$/i, mC = /^0o[0-7]+$/i, pC = parseInt;
function $m(e) {
  if (typeof e == "number")
    return e;
  if (Aa(e))
    return bf;
  if (dt(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = dt(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = fC(e);
  var n = hC.test(e);
  return n || mC.test(e) ? pC(e.slice(2), n ? 2 : 8) : dC.test(e) ? bf : +e;
}
var If = 1 / 0, yC = 17976931348623157e292;
function js(e) {
  if (!e)
    return e === 0 ? e : 0;
  if (e = $m(e), e === If || e === -If) {
    var t = e < 0 ? -1 : 1;
    return t * yC;
  }
  return e === e ? e : 0;
}
function gC(e) {
  var t = js(e), n = t % 1;
  return t === t ? n ? t - n : t : 0;
}
function Am(e) {
  return e;
}
var vC = "[object AsyncFunction]", bC = "[object Function]", IC = "[object GeneratorFunction]", TC = "[object Proxy]";
function Nm(e) {
  if (!dt(e))
    return !1;
  var t = zn(e);
  return t == bC || t == IC || t == vC || t == TC;
}
var wC = pt["__core-js_shared__"];
const ul = wC;
var Tf = function() {
  var e = /[^.]+$/.exec(ul && ul.keys && ul.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function CC(e) {
  return !!Tf && Tf in e;
}
var OC = Function.prototype, SC = OC.toString;
function Gn(e) {
  if (e != null) {
    try {
      return SC.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var EC = /[\\^$.*+?()[\]{}|]/g, xC = /^\[object .+?Constructor\]$/, $C = Function.prototype, AC = Object.prototype, NC = $C.toString, MC = AC.hasOwnProperty, kC = RegExp(
  "^" + NC.call(MC).replace(EC, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function DC(e) {
  if (!dt(e) || CC(e))
    return !1;
  var t = Nm(e) ? kC : xC;
  return t.test(Gn(e));
}
function LC(e, t) {
  return e == null ? void 0 : e[t];
}
function Yn(e, t) {
  var n = LC(e, t);
  return DC(n) ? n : void 0;
}
var RC = Yn(pt, "WeakMap");
const Ul = RC;
var wf = Object.create, _C = /* @__PURE__ */ function() {
  function e() {
  }
  return function(t) {
    if (!dt(t))
      return {};
    if (wf)
      return wf(t);
    e.prototype = t;
    var n = new e();
    return e.prototype = void 0, n;
  };
}();
const PC = _C;
function BC(e, t, n) {
  switch (n.length) {
    case 0:
      return e.call(t);
    case 1:
      return e.call(t, n[0]);
    case 2:
      return e.call(t, n[0], n[1]);
    case 3:
      return e.call(t, n[0], n[1], n[2]);
  }
  return e.apply(t, n);
}
function jC() {
}
function UC(e, t) {
  var n = -1, o = e.length;
  for (t || (t = Array(o)); ++n < o; )
    t[n] = e[n];
  return t;
}
var WC = 800, FC = 16, qC = Date.now;
function VC(e) {
  var t = 0, n = 0;
  return function() {
    var o = qC(), r = FC - (o - n);
    if (n = o, r > 0) {
      if (++t >= WC)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
function HC(e) {
  return function() {
    return e;
  };
}
var ZC = function() {
  try {
    var e = Yn(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}();
const ea = ZC;
var zC = ea ? function(e, t) {
  return ea(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: HC(t),
    writable: !0
  });
} : Am;
const GC = zC;
var YC = VC(GC);
const KC = YC;
function QC(e, t) {
  for (var n = -1, o = e == null ? 0 : e.length; ++n < o && t(e[n], n, e) !== !1; )
    ;
  return e;
}
function JC(e, t, n, o) {
  for (var r = e.length, i = n + (o ? 1 : -1); o ? i-- : ++i < r; )
    if (t(e[i], i, e))
      return i;
  return -1;
}
function XC(e) {
  return e !== e;
}
function eO(e, t, n) {
  for (var o = n - 1, r = e.length; ++o < r; )
    if (e[o] === t)
      return o;
  return -1;
}
function tO(e, t, n) {
  return t === t ? eO(e, t, n) : JC(e, XC, n);
}
function nO(e, t) {
  var n = e == null ? 0 : e.length;
  return !!n && tO(e, t, 0) > -1;
}
var oO = 9007199254740991, rO = /^(?:0|[1-9]\d*)$/;
function Na(e, t) {
  var n = typeof e;
  return t = t ?? oO, !!t && (n == "number" || n != "symbol" && rO.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function Uc(e, t, n) {
  t == "__proto__" && ea ? ea(e, t, {
    configurable: !0,
    enumerable: !0,
    value: n,
    writable: !0
  }) : e[t] = n;
}
function Ma(e, t) {
  return e === t || e !== e && t !== t;
}
var iO = Object.prototype, sO = iO.hasOwnProperty;
function Wc(e, t, n) {
  var o = e[t];
  (!(sO.call(e, t) && Ma(o, n)) || n === void 0 && !(t in e)) && Uc(e, t, n);
}
function Oi(e, t, n, o) {
  var r = !n;
  n || (n = {});
  for (var i = -1, s = t.length; ++i < s; ) {
    var a = t[i], l = o ? o(n[a], e[a], a, n, e) : void 0;
    l === void 0 && (l = e[a]), r ? Uc(n, a, l) : Wc(n, a, l);
  }
  return n;
}
var Cf = Math.max;
function aO(e, t, n) {
  return t = Cf(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var o = arguments, r = -1, i = Cf(o.length - t, 0), s = Array(i); ++r < i; )
      s[r] = o[t + r];
    r = -1;
    for (var a = Array(t + 1); ++r < t; )
      a[r] = o[r];
    return a[t] = n(s), BC(e, this, a);
  };
}
var lO = 9007199254740991;
function Fc(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= lO;
}
function Si(e) {
  return e != null && Fc(e.length) && !Nm(e);
}
function cO(e, t, n) {
  if (!dt(n))
    return !1;
  var o = typeof t;
  return (o == "number" ? Si(n) && Na(t, n.length) : o == "string" && t in n) ? Ma(n[t], e) : !1;
}
var uO = Object.prototype;
function ka(e) {
  var t = e && e.constructor, n = typeof t == "function" && t.prototype || uO;
  return e === n;
}
function fO(e, t) {
  for (var n = -1, o = Array(e); ++n < e; )
    o[n] = t(n);
  return o;
}
var dO = "[object Arguments]";
function Of(e) {
  return Ut(e) && zn(e) == dO;
}
var Mm = Object.prototype, hO = Mm.hasOwnProperty, mO = Mm.propertyIsEnumerable, pO = Of(/* @__PURE__ */ function() {
  return arguments;
}()) ? Of : function(e) {
  return Ut(e) && hO.call(e, "callee") && !mO.call(e, "callee");
};
const Da = pO;
function yO() {
  return !1;
}
var km = typeof exports == "object" && exports && !exports.nodeType && exports, Sf = km && typeof module == "object" && module && !module.nodeType && module, gO = Sf && Sf.exports === km, Ef = gO ? pt.Buffer : void 0, vO = Ef ? Ef.isBuffer : void 0, bO = vO || yO;
const oi = bO;
var IO = "[object Arguments]", TO = "[object Array]", wO = "[object Boolean]", CO = "[object Date]", OO = "[object Error]", SO = "[object Function]", EO = "[object Map]", xO = "[object Number]", $O = "[object Object]", AO = "[object RegExp]", NO = "[object Set]", MO = "[object String]", kO = "[object WeakMap]", DO = "[object ArrayBuffer]", LO = "[object DataView]", RO = "[object Float32Array]", _O = "[object Float64Array]", PO = "[object Int8Array]", BO = "[object Int16Array]", jO = "[object Int32Array]", UO = "[object Uint8Array]", WO = "[object Uint8ClampedArray]", FO = "[object Uint16Array]", qO = "[object Uint32Array]", ee = {};
ee[RO] = ee[_O] = ee[PO] = ee[BO] = ee[jO] = ee[UO] = ee[WO] = ee[FO] = ee[qO] = !0;
ee[IO] = ee[TO] = ee[DO] = ee[wO] = ee[LO] = ee[CO] = ee[OO] = ee[SO] = ee[EO] = ee[xO] = ee[$O] = ee[AO] = ee[NO] = ee[MO] = ee[kO] = !1;
function VO(e) {
  return Ut(e) && Fc(e.length) && !!ee[zn(e)];
}
function qc(e) {
  return function(t) {
    return e(t);
  };
}
var Dm = typeof exports == "object" && exports && !exports.nodeType && exports, Hr = Dm && typeof module == "object" && module && !module.nodeType && module, HO = Hr && Hr.exports === Dm, fl = HO && Om.process, ZO = function() {
  try {
    var e = Hr && Hr.require && Hr.require("util").types;
    return e || fl && fl.binding && fl.binding("util");
  } catch {
  }
}();
const Bo = ZO;
var xf = Bo && Bo.isTypedArray, zO = xf ? qc(xf) : VO;
const Vc = zO;
var GO = Object.prototype, YO = GO.hasOwnProperty;
function Lm(e, t) {
  var n = Pe(e), o = !n && Da(e), r = !n && !o && oi(e), i = !n && !o && !r && Vc(e), s = n || o || r || i, a = s ? fO(e.length, String) : [], l = a.length;
  for (var c in e)
    (t || YO.call(e, c)) && !(s && // Safari 9 has enumerable `arguments.length` in strict mode.
    (c == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    r && (c == "offset" || c == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    i && (c == "buffer" || c == "byteLength" || c == "byteOffset") || // Skip index properties.
    Na(c, l))) && a.push(c);
  return a;
}
function Rm(e, t) {
  return function(n) {
    return e(t(n));
  };
}
var KO = Rm(Object.keys, Object);
const QO = KO;
var JO = Object.prototype, XO = JO.hasOwnProperty;
function _m(e) {
  if (!ka(e))
    return QO(e);
  var t = [];
  for (var n in Object(e))
    XO.call(e, n) && n != "constructor" && t.push(n);
  return t;
}
function Ei(e) {
  return Si(e) ? Lm(e) : _m(e);
}
function eS(e) {
  var t = [];
  if (e != null)
    for (var n in Object(e))
      t.push(n);
  return t;
}
var tS = Object.prototype, nS = tS.hasOwnProperty;
function oS(e) {
  if (!dt(e))
    return eS(e);
  var t = ka(e), n = [];
  for (var o in e)
    o == "constructor" && (t || !nS.call(e, o)) || n.push(o);
  return n;
}
function Hc(e) {
  return Si(e) ? Lm(e, !0) : oS(e);
}
var rS = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, iS = /^\w*$/;
function Zc(e, t) {
  if (Pe(e))
    return !1;
  var n = typeof e;
  return n == "number" || n == "symbol" || n == "boolean" || e == null || Aa(e) ? !0 : iS.test(e) || !rS.test(e) || t != null && e in Object(t);
}
var sS = Yn(Object, "create");
const ri = sS;
function aS() {
  this.__data__ = ri ? ri(null) : {}, this.size = 0;
}
function lS(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var cS = "__lodash_hash_undefined__", uS = Object.prototype, fS = uS.hasOwnProperty;
function dS(e) {
  var t = this.__data__;
  if (ri) {
    var n = t[e];
    return n === cS ? void 0 : n;
  }
  return fS.call(t, e) ? t[e] : void 0;
}
var hS = Object.prototype, mS = hS.hasOwnProperty;
function pS(e) {
  var t = this.__data__;
  return ri ? t[e] !== void 0 : mS.call(t, e);
}
var yS = "__lodash_hash_undefined__";
function gS(e, t) {
  var n = this.__data__;
  return this.size += this.has(e) ? 0 : 1, n[e] = ri && t === void 0 ? yS : t, this;
}
function Wn(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var o = e[t];
    this.set(o[0], o[1]);
  }
}
Wn.prototype.clear = aS;
Wn.prototype.delete = lS;
Wn.prototype.get = dS;
Wn.prototype.has = pS;
Wn.prototype.set = gS;
function vS() {
  this.__data__ = [], this.size = 0;
}
function La(e, t) {
  for (var n = e.length; n--; )
    if (Ma(e[n][0], t))
      return n;
  return -1;
}
var bS = Array.prototype, IS = bS.splice;
function TS(e) {
  var t = this.__data__, n = La(t, e);
  if (n < 0)
    return !1;
  var o = t.length - 1;
  return n == o ? t.pop() : IS.call(t, n, 1), --this.size, !0;
}
function wS(e) {
  var t = this.__data__, n = La(t, e);
  return n < 0 ? void 0 : t[n][1];
}
function CS(e) {
  return La(this.__data__, e) > -1;
}
function OS(e, t) {
  var n = this.__data__, o = La(n, e);
  return o < 0 ? (++this.size, n.push([e, t])) : n[o][1] = t, this;
}
function Ft(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var o = e[t];
    this.set(o[0], o[1]);
  }
}
Ft.prototype.clear = vS;
Ft.prototype.delete = TS;
Ft.prototype.get = wS;
Ft.prototype.has = CS;
Ft.prototype.set = OS;
var SS = Yn(pt, "Map");
const ii = SS;
function ES() {
  this.size = 0, this.__data__ = {
    hash: new Wn(),
    map: new (ii || Ft)(),
    string: new Wn()
  };
}
function xS(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function Ra(e, t) {
  var n = e.__data__;
  return xS(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
function $S(e) {
  var t = Ra(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function AS(e) {
  return Ra(this, e).get(e);
}
function NS(e) {
  return Ra(this, e).has(e);
}
function MS(e, t) {
  var n = Ra(this, e), o = n.size;
  return n.set(e, t), this.size += n.size == o ? 0 : 1, this;
}
function qt(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var o = e[t];
    this.set(o[0], o[1]);
  }
}
qt.prototype.clear = ES;
qt.prototype.delete = $S;
qt.prototype.get = AS;
qt.prototype.has = NS;
qt.prototype.set = MS;
var kS = "Expected a function";
function zc(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(kS);
  var n = function() {
    var o = arguments, r = t ? t.apply(this, o) : o[0], i = n.cache;
    if (i.has(r))
      return i.get(r);
    var s = e.apply(this, o);
    return n.cache = i.set(r, s) || i, s;
  };
  return n.cache = new (zc.Cache || qt)(), n;
}
zc.Cache = qt;
var DS = 500;
function LS(e) {
  var t = zc(e, function(o) {
    return n.size === DS && n.clear(), o;
  }), n = t.cache;
  return t;
}
var RS = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, _S = /\\(\\)?/g, PS = LS(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(RS, function(n, o, r, i) {
    t.push(r ? i.replace(_S, "$1") : o || n);
  }), t;
});
const BS = PS;
function Fn(e) {
  return e == null ? "" : xm(e);
}
function Qo(e, t) {
  return Pe(e) ? e : Zc(e, t) ? [e] : BS(Fn(e));
}
var jS = 1 / 0;
function Jo(e) {
  if (typeof e == "string" || Aa(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -jS ? "-0" : t;
}
function _a(e, t) {
  t = Qo(t, e);
  for (var n = 0, o = t.length; e != null && n < o; )
    e = e[Jo(t[n++])];
  return n && n == o ? e : void 0;
}
function US(e, t, n) {
  var o = e == null ? void 0 : _a(e, t);
  return o === void 0 ? n : o;
}
function Gc(e, t) {
  for (var n = -1, o = t.length, r = e.length; ++n < o; )
    e[r + n] = t[n];
  return e;
}
var $f = et ? et.isConcatSpreadable : void 0;
function WS(e) {
  return Pe(e) || Da(e) || !!($f && e && e[$f]);
}
function Pm(e, t, n, o, r) {
  var i = -1, s = e.length;
  for (n || (n = WS), r || (r = []); ++i < s; ) {
    var a = e[i];
    t > 0 && n(a) ? t > 1 ? Pm(a, t - 1, n, o, r) : Gc(r, a) : o || (r[r.length] = a);
  }
  return r;
}
function FS(e) {
  var t = e == null ? 0 : e.length;
  return t ? Pm(e, 1) : [];
}
function Bm(e) {
  return KC(aO(e, void 0, FS), e + "");
}
var qS = Rm(Object.getPrototypeOf, Object);
const Yc = qS;
var VS = "[object Object]", HS = Function.prototype, ZS = Object.prototype, jm = HS.toString, zS = ZS.hasOwnProperty, GS = jm.call(Object);
function YS(e) {
  if (!Ut(e) || zn(e) != VS)
    return !1;
  var t = Yc(e);
  if (t === null)
    return !0;
  var n = zS.call(t, "constructor") && t.constructor;
  return typeof n == "function" && n instanceof n && jm.call(n) == GS;
}
function Um(e, t, n) {
  var o = -1, r = e.length;
  t < 0 && (t = -t > r ? 0 : r + t), n = n > r ? r : n, n < 0 && (n += r), r = t > n ? 0 : n - t >>> 0, t >>>= 0;
  for (var i = Array(r); ++o < r; )
    i[o] = e[o + t];
  return i;
}
function KS(e, t, n) {
  var o = e.length;
  return n = n === void 0 ? o : n, !t && n >= o ? e : Um(e, t, n);
}
var QS = "\\ud800-\\udfff", JS = "\\u0300-\\u036f", XS = "\\ufe20-\\ufe2f", eE = "\\u20d0-\\u20ff", tE = JS + XS + eE, nE = "\\ufe0e\\ufe0f", oE = "\\u200d", rE = RegExp("[" + oE + QS + tE + nE + "]");
function Wm(e) {
  return rE.test(e);
}
function iE(e) {
  return e.split("");
}
var Fm = "\\ud800-\\udfff", sE = "\\u0300-\\u036f", aE = "\\ufe20-\\ufe2f", lE = "\\u20d0-\\u20ff", cE = sE + aE + lE, uE = "\\ufe0e\\ufe0f", fE = "[" + Fm + "]", Wl = "[" + cE + "]", Fl = "\\ud83c[\\udffb-\\udfff]", dE = "(?:" + Wl + "|" + Fl + ")", qm = "[^" + Fm + "]", Vm = "(?:\\ud83c[\\udde6-\\uddff]){2}", Hm = "[\\ud800-\\udbff][\\udc00-\\udfff]", hE = "\\u200d", Zm = dE + "?", zm = "[" + uE + "]?", mE = "(?:" + hE + "(?:" + [qm, Vm, Hm].join("|") + ")" + zm + Zm + ")*", pE = zm + Zm + mE, yE = "(?:" + [qm + Wl + "?", Wl, Vm, Hm, fE].join("|") + ")", gE = RegExp(Fl + "(?=" + Fl + ")|" + yE + pE, "g");
function vE(e) {
  return e.match(gE) || [];
}
function bE(e) {
  return Wm(e) ? vE(e) : iE(e);
}
function IE(e) {
  return function(t) {
    t = Fn(t);
    var n = Wm(t) ? bE(t) : void 0, o = n ? n[0] : t.charAt(0), r = n ? KS(n, 1).join("") : t.slice(1);
    return o[e]() + r;
  };
}
var TE = IE("toUpperCase");
const Gm = TE;
function wE(e) {
  return Gm(Fn(e).toLowerCase());
}
function CE(e, t, n, o) {
  var r = -1, i = e == null ? 0 : e.length;
  for (o && i && (n = e[++r]); ++r < i; )
    n = t(n, e[r], r, e);
  return n;
}
function OE(e) {
  return function(t) {
    return e == null ? void 0 : e[t];
  };
}
var SE = {
  // Latin-1 Supplement block.
  À: "A",
  Á: "A",
  Â: "A",
  Ã: "A",
  Ä: "A",
  Å: "A",
  à: "a",
  á: "a",
  â: "a",
  ã: "a",
  ä: "a",
  å: "a",
  Ç: "C",
  ç: "c",
  Ð: "D",
  ð: "d",
  È: "E",
  É: "E",
  Ê: "E",
  Ë: "E",
  è: "e",
  é: "e",
  ê: "e",
  ë: "e",
  Ì: "I",
  Í: "I",
  Î: "I",
  Ï: "I",
  ì: "i",
  í: "i",
  î: "i",
  ï: "i",
  Ñ: "N",
  ñ: "n",
  Ò: "O",
  Ó: "O",
  Ô: "O",
  Õ: "O",
  Ö: "O",
  Ø: "O",
  ò: "o",
  ó: "o",
  ô: "o",
  õ: "o",
  ö: "o",
  ø: "o",
  Ù: "U",
  Ú: "U",
  Û: "U",
  Ü: "U",
  ù: "u",
  ú: "u",
  û: "u",
  ü: "u",
  Ý: "Y",
  ý: "y",
  ÿ: "y",
  Æ: "Ae",
  æ: "ae",
  Þ: "Th",
  þ: "th",
  ß: "ss",
  // Latin Extended-A block.
  Ā: "A",
  Ă: "A",
  Ą: "A",
  ā: "a",
  ă: "a",
  ą: "a",
  Ć: "C",
  Ĉ: "C",
  Ċ: "C",
  Č: "C",
  ć: "c",
  ĉ: "c",
  ċ: "c",
  č: "c",
  Ď: "D",
  Đ: "D",
  ď: "d",
  đ: "d",
  Ē: "E",
  Ĕ: "E",
  Ė: "E",
  Ę: "E",
  Ě: "E",
  ē: "e",
  ĕ: "e",
  ė: "e",
  ę: "e",
  ě: "e",
  Ĝ: "G",
  Ğ: "G",
  Ġ: "G",
  Ģ: "G",
  ĝ: "g",
  ğ: "g",
  ġ: "g",
  ģ: "g",
  Ĥ: "H",
  Ħ: "H",
  ĥ: "h",
  ħ: "h",
  Ĩ: "I",
  Ī: "I",
  Ĭ: "I",
  Į: "I",
  İ: "I",
  ĩ: "i",
  ī: "i",
  ĭ: "i",
  į: "i",
  ı: "i",
  Ĵ: "J",
  ĵ: "j",
  Ķ: "K",
  ķ: "k",
  ĸ: "k",
  Ĺ: "L",
  Ļ: "L",
  Ľ: "L",
  Ŀ: "L",
  Ł: "L",
  ĺ: "l",
  ļ: "l",
  ľ: "l",
  ŀ: "l",
  ł: "l",
  Ń: "N",
  Ņ: "N",
  Ň: "N",
  Ŋ: "N",
  ń: "n",
  ņ: "n",
  ň: "n",
  ŋ: "n",
  Ō: "O",
  Ŏ: "O",
  Ő: "O",
  ō: "o",
  ŏ: "o",
  ő: "o",
  Ŕ: "R",
  Ŗ: "R",
  Ř: "R",
  ŕ: "r",
  ŗ: "r",
  ř: "r",
  Ś: "S",
  Ŝ: "S",
  Ş: "S",
  Š: "S",
  ś: "s",
  ŝ: "s",
  ş: "s",
  š: "s",
  Ţ: "T",
  Ť: "T",
  Ŧ: "T",
  ţ: "t",
  ť: "t",
  ŧ: "t",
  Ũ: "U",
  Ū: "U",
  Ŭ: "U",
  Ů: "U",
  Ű: "U",
  Ų: "U",
  ũ: "u",
  ū: "u",
  ŭ: "u",
  ů: "u",
  ű: "u",
  ų: "u",
  Ŵ: "W",
  ŵ: "w",
  Ŷ: "Y",
  ŷ: "y",
  Ÿ: "Y",
  Ź: "Z",
  Ż: "Z",
  Ž: "Z",
  ź: "z",
  ż: "z",
  ž: "z",
  Ĳ: "IJ",
  ĳ: "ij",
  Œ: "Oe",
  œ: "oe",
  ŉ: "'n",
  ſ: "s"
}, EE = OE(SE);
const xE = EE;
var $E = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, AE = "\\u0300-\\u036f", NE = "\\ufe20-\\ufe2f", ME = "\\u20d0-\\u20ff", kE = AE + NE + ME, DE = "[" + kE + "]", LE = RegExp(DE, "g");
function RE(e) {
  return e = Fn(e), e && e.replace($E, xE).replace(LE, "");
}
var _E = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
function PE(e) {
  return e.match(_E) || [];
}
var BE = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
function jE(e) {
  return BE.test(e);
}
var Ym = "\\ud800-\\udfff", UE = "\\u0300-\\u036f", WE = "\\ufe20-\\ufe2f", FE = "\\u20d0-\\u20ff", qE = UE + WE + FE, Km = "\\u2700-\\u27bf", Qm = "a-z\\xdf-\\xf6\\xf8-\\xff", VE = "\\xac\\xb1\\xd7\\xf7", HE = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", ZE = "\\u2000-\\u206f", zE = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Jm = "A-Z\\xc0-\\xd6\\xd8-\\xde", GE = "\\ufe0e\\ufe0f", Xm = VE + HE + ZE + zE, ep = "['’]", Af = "[" + Xm + "]", YE = "[" + qE + "]", tp = "\\d+", KE = "[" + Km + "]", np = "[" + Qm + "]", op = "[^" + Ym + Xm + tp + Km + Qm + Jm + "]", QE = "\\ud83c[\\udffb-\\udfff]", JE = "(?:" + YE + "|" + QE + ")", XE = "[^" + Ym + "]", rp = "(?:\\ud83c[\\udde6-\\uddff]){2}", ip = "[\\ud800-\\udbff][\\udc00-\\udfff]", bo = "[" + Jm + "]", ex = "\\u200d", Nf = "(?:" + np + "|" + op + ")", tx = "(?:" + bo + "|" + op + ")", Mf = "(?:" + ep + "(?:d|ll|m|re|s|t|ve))?", kf = "(?:" + ep + "(?:D|LL|M|RE|S|T|VE))?", sp = JE + "?", ap = "[" + GE + "]?", nx = "(?:" + ex + "(?:" + [XE, rp, ip].join("|") + ")" + ap + sp + ")*", ox = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rx = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", ix = ap + sp + nx, sx = "(?:" + [KE, rp, ip].join("|") + ")" + ix, ax = RegExp([
  bo + "?" + np + "+" + Mf + "(?=" + [Af, bo, "$"].join("|") + ")",
  tx + "+" + kf + "(?=" + [Af, bo + Nf, "$"].join("|") + ")",
  bo + "?" + Nf + "+" + Mf,
  bo + "+" + kf,
  rx,
  ox,
  tp,
  sx
].join("|"), "g");
function lx(e) {
  return e.match(ax) || [];
}
function cx(e, t, n) {
  return e = Fn(e), t = n ? void 0 : t, t === void 0 ? jE(e) ? lx(e) : PE(e) : e.match(t) || [];
}
var ux = "['’]", fx = RegExp(ux, "g");
function dx(e) {
  return function(t) {
    return CE(cx(RE(t).replace(fx, "")), e, "");
  };
}
var hx = dx(function(e, t, n) {
  return t = t.toLowerCase(), e + (n ? wE(t) : t);
});
const mx = hx;
var px = pt.isFinite, yx = Math.min;
function gx(e) {
  var t = Math[e];
  return function(n, o) {
    if (n = $m(n), o = o == null ? 0 : yx(gC(o), 292), o && px(n)) {
      var r = (Fn(n) + "e").split("e"), i = t(r[0] + "e" + (+r[1] + o));
      return r = (Fn(i) + "e").split("e"), +(r[0] + "e" + (+r[1] - o));
    }
    return t(n);
  };
}
function vx() {
  this.__data__ = new Ft(), this.size = 0;
}
function bx(e) {
  var t = this.__data__, n = t.delete(e);
  return this.size = t.size, n;
}
function Ix(e) {
  return this.__data__.get(e);
}
function Tx(e) {
  return this.__data__.has(e);
}
var wx = 200;
function Cx(e, t) {
  var n = this.__data__;
  if (n instanceof Ft) {
    var o = n.__data__;
    if (!ii || o.length < wx - 1)
      return o.push([e, t]), this.size = ++n.size, this;
    n = this.__data__ = new qt(o);
  }
  return n.set(e, t), this.size = n.size, this;
}
function Ct(e) {
  var t = this.__data__ = new Ft(e);
  this.size = t.size;
}
Ct.prototype.clear = vx;
Ct.prototype.delete = bx;
Ct.prototype.get = Ix;
Ct.prototype.has = Tx;
Ct.prototype.set = Cx;
function Ox(e, t) {
  return e && Oi(t, Ei(t), e);
}
function Sx(e, t) {
  return e && Oi(t, Hc(t), e);
}
var lp = typeof exports == "object" && exports && !exports.nodeType && exports, Df = lp && typeof module == "object" && module && !module.nodeType && module, Ex = Df && Df.exports === lp, Lf = Ex ? pt.Buffer : void 0, Rf = Lf ? Lf.allocUnsafe : void 0;
function xx(e, t) {
  if (t)
    return e.slice();
  var n = e.length, o = Rf ? Rf(n) : new e.constructor(n);
  return e.copy(o), o;
}
function $x(e, t) {
  for (var n = -1, o = e == null ? 0 : e.length, r = 0, i = []; ++n < o; ) {
    var s = e[n];
    t(s, n, e) && (i[r++] = s);
  }
  return i;
}
function cp() {
  return [];
}
var Ax = Object.prototype, Nx = Ax.propertyIsEnumerable, _f = Object.getOwnPropertySymbols, Mx = _f ? function(e) {
  return e == null ? [] : (e = Object(e), $x(_f(e), function(t) {
    return Nx.call(e, t);
  }));
} : cp;
const Kc = Mx;
function kx(e, t) {
  return Oi(e, Kc(e), t);
}
var Dx = Object.getOwnPropertySymbols, Lx = Dx ? function(e) {
  for (var t = []; e; )
    Gc(t, Kc(e)), e = Yc(e);
  return t;
} : cp;
const up = Lx;
function Rx(e, t) {
  return Oi(e, up(e), t);
}
function fp(e, t, n) {
  var o = t(e);
  return Pe(e) ? o : Gc(o, n(e));
}
function ql(e) {
  return fp(e, Ei, Kc);
}
function dp(e) {
  return fp(e, Hc, up);
}
var _x = Yn(pt, "DataView");
const Vl = _x;
var Px = Yn(pt, "Promise");
const Hl = Px;
var Bx = Yn(pt, "Set");
const So = Bx;
var Pf = "[object Map]", jx = "[object Object]", Bf = "[object Promise]", jf = "[object Set]", Uf = "[object WeakMap]", Wf = "[object DataView]", Ux = Gn(Vl), Wx = Gn(ii), Fx = Gn(Hl), qx = Gn(So), Vx = Gn(Ul), On = zn;
(Vl && On(new Vl(new ArrayBuffer(1))) != Wf || ii && On(new ii()) != Pf || Hl && On(Hl.resolve()) != Bf || So && On(new So()) != jf || Ul && On(new Ul()) != Uf) && (On = function(e) {
  var t = zn(e), n = t == jx ? e.constructor : void 0, o = n ? Gn(n) : "";
  if (o)
    switch (o) {
      case Ux:
        return Wf;
      case Wx:
        return Pf;
      case Fx:
        return Bf;
      case qx:
        return jf;
      case Vx:
        return Uf;
    }
  return t;
});
const jo = On;
var Hx = Object.prototype, Zx = Hx.hasOwnProperty;
function zx(e) {
  var t = e.length, n = new e.constructor(t);
  return t && typeof e[0] == "string" && Zx.call(e, "index") && (n.index = e.index, n.input = e.input), n;
}
var Gx = pt.Uint8Array;
const ta = Gx;
function Qc(e) {
  var t = new e.constructor(e.byteLength);
  return new ta(t).set(new ta(e)), t;
}
function Yx(e, t) {
  var n = t ? Qc(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.byteLength);
}
var Kx = /\w*$/;
function Qx(e) {
  var t = new e.constructor(e.source, Kx.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var Ff = et ? et.prototype : void 0, qf = Ff ? Ff.valueOf : void 0;
function Jx(e) {
  return qf ? Object(qf.call(e)) : {};
}
function Xx(e, t) {
  var n = t ? Qc(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.length);
}
var e$ = "[object Boolean]", t$ = "[object Date]", n$ = "[object Map]", o$ = "[object Number]", r$ = "[object RegExp]", i$ = "[object Set]", s$ = "[object String]", a$ = "[object Symbol]", l$ = "[object ArrayBuffer]", c$ = "[object DataView]", u$ = "[object Float32Array]", f$ = "[object Float64Array]", d$ = "[object Int8Array]", h$ = "[object Int16Array]", m$ = "[object Int32Array]", p$ = "[object Uint8Array]", y$ = "[object Uint8ClampedArray]", g$ = "[object Uint16Array]", v$ = "[object Uint32Array]";
function b$(e, t, n) {
  var o = e.constructor;
  switch (t) {
    case l$:
      return Qc(e);
    case e$:
    case t$:
      return new o(+e);
    case c$:
      return Yx(e, n);
    case u$:
    case f$:
    case d$:
    case h$:
    case m$:
    case p$:
    case y$:
    case g$:
    case v$:
      return Xx(e, n);
    case n$:
      return new o();
    case o$:
    case s$:
      return new o(e);
    case r$:
      return Qx(e);
    case i$:
      return new o();
    case a$:
      return Jx(e);
  }
}
function I$(e) {
  return typeof e.constructor == "function" && !ka(e) ? PC(Yc(e)) : {};
}
var T$ = "[object Map]";
function w$(e) {
  return Ut(e) && jo(e) == T$;
}
var Vf = Bo && Bo.isMap, C$ = Vf ? qc(Vf) : w$;
const O$ = C$;
var S$ = "[object Set]";
function E$(e) {
  return Ut(e) && jo(e) == S$;
}
var Hf = Bo && Bo.isSet, x$ = Hf ? qc(Hf) : E$;
const $$ = x$;
var A$ = 1, N$ = 2, M$ = 4, hp = "[object Arguments]", k$ = "[object Array]", D$ = "[object Boolean]", L$ = "[object Date]", R$ = "[object Error]", mp = "[object Function]", _$ = "[object GeneratorFunction]", P$ = "[object Map]", B$ = "[object Number]", pp = "[object Object]", j$ = "[object RegExp]", U$ = "[object Set]", W$ = "[object String]", F$ = "[object Symbol]", q$ = "[object WeakMap]", V$ = "[object ArrayBuffer]", H$ = "[object DataView]", Z$ = "[object Float32Array]", z$ = "[object Float64Array]", G$ = "[object Int8Array]", Y$ = "[object Int16Array]", K$ = "[object Int32Array]", Q$ = "[object Uint8Array]", J$ = "[object Uint8ClampedArray]", X$ = "[object Uint16Array]", eA = "[object Uint32Array]", K = {};
K[hp] = K[k$] = K[V$] = K[H$] = K[D$] = K[L$] = K[Z$] = K[z$] = K[G$] = K[Y$] = K[K$] = K[P$] = K[B$] = K[pp] = K[j$] = K[U$] = K[W$] = K[F$] = K[Q$] = K[J$] = K[X$] = K[eA] = !0;
K[R$] = K[mp] = K[q$] = !1;
function Zr(e, t, n, o, r, i) {
  var s, a = t & A$, l = t & N$, c = t & M$;
  if (n && (s = r ? n(e, o, r, i) : n(e)), s !== void 0)
    return s;
  if (!dt(e))
    return e;
  var u = Pe(e);
  if (u) {
    if (s = zx(e), !a)
      return UC(e, s);
  } else {
    var f = jo(e), d = f == mp || f == _$;
    if (oi(e))
      return xx(e, a);
    if (f == pp || f == hp || d && !r) {
      if (s = l || d ? {} : I$(e), !a)
        return l ? Rx(e, Sx(s, e)) : kx(e, Ox(s, e));
    } else {
      if (!K[f])
        return r ? e : {};
      s = b$(e, f, a);
    }
  }
  i || (i = new Ct());
  var h = i.get(e);
  if (h)
    return h;
  i.set(e, s), $$(e) ? e.forEach(function(v) {
    s.add(Zr(v, t, n, v, e, i));
  }) : O$(e) && e.forEach(function(v, T) {
    s.set(T, Zr(v, t, n, T, e, i));
  });
  var p = c ? l ? dp : ql : l ? Hc : Ei, g = u ? void 0 : p(e);
  return QC(g || e, function(v, T) {
    g && (T = v, v = e[T]), Wc(s, T, Zr(v, t, n, T, e, i));
  }), s;
}
var tA = 1, nA = 4;
function Pa(e) {
  return Zr(e, tA | nA);
}
var oA = "__lodash_hash_undefined__";
function rA(e) {
  return this.__data__.set(e, oA), this;
}
function iA(e) {
  return this.__data__.has(e);
}
function si(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.__data__ = new qt(); ++t < n; )
    this.add(e[t]);
}
si.prototype.add = si.prototype.push = rA;
si.prototype.has = iA;
function sA(e, t) {
  for (var n = -1, o = e == null ? 0 : e.length; ++n < o; )
    if (t(e[n], n, e))
      return !0;
  return !1;
}
function yp(e, t) {
  return e.has(t);
}
var aA = 1, lA = 2;
function gp(e, t, n, o, r, i) {
  var s = n & aA, a = e.length, l = t.length;
  if (a != l && !(s && l > a))
    return !1;
  var c = i.get(e), u = i.get(t);
  if (c && u)
    return c == t && u == e;
  var f = -1, d = !0, h = n & lA ? new si() : void 0;
  for (i.set(e, t), i.set(t, e); ++f < a; ) {
    var p = e[f], g = t[f];
    if (o)
      var v = s ? o(g, p, f, t, e, i) : o(p, g, f, e, t, i);
    if (v !== void 0) {
      if (v)
        continue;
      d = !1;
      break;
    }
    if (h) {
      if (!sA(t, function(T, S) {
        if (!yp(h, S) && (p === T || r(p, T, n, o, i)))
          return h.push(S);
      })) {
        d = !1;
        break;
      }
    } else if (!(p === g || r(p, g, n, o, i))) {
      d = !1;
      break;
    }
  }
  return i.delete(e), i.delete(t), d;
}
function cA(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(o, r) {
    n[++t] = [r, o];
  }), n;
}
function Jc(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(o) {
    n[++t] = o;
  }), n;
}
var uA = 1, fA = 2, dA = "[object Boolean]", hA = "[object Date]", mA = "[object Error]", pA = "[object Map]", yA = "[object Number]", gA = "[object RegExp]", vA = "[object Set]", bA = "[object String]", IA = "[object Symbol]", TA = "[object ArrayBuffer]", wA = "[object DataView]", Zf = et ? et.prototype : void 0, dl = Zf ? Zf.valueOf : void 0;
function CA(e, t, n, o, r, i, s) {
  switch (n) {
    case wA:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case TA:
      return !(e.byteLength != t.byteLength || !i(new ta(e), new ta(t)));
    case dA:
    case hA:
    case yA:
      return Ma(+e, +t);
    case mA:
      return e.name == t.name && e.message == t.message;
    case gA:
    case bA:
      return e == t + "";
    case pA:
      var a = cA;
    case vA:
      var l = o & uA;
      if (a || (a = Jc), e.size != t.size && !l)
        return !1;
      var c = s.get(e);
      if (c)
        return c == t;
      o |= fA, s.set(e, t);
      var u = gp(a(e), a(t), o, r, i, s);
      return s.delete(e), u;
    case IA:
      if (dl)
        return dl.call(e) == dl.call(t);
  }
  return !1;
}
var OA = 1, SA = Object.prototype, EA = SA.hasOwnProperty;
function xA(e, t, n, o, r, i) {
  var s = n & OA, a = ql(e), l = a.length, c = ql(t), u = c.length;
  if (l != u && !s)
    return !1;
  for (var f = l; f--; ) {
    var d = a[f];
    if (!(s ? d in t : EA.call(t, d)))
      return !1;
  }
  var h = i.get(e), p = i.get(t);
  if (h && p)
    return h == t && p == e;
  var g = !0;
  i.set(e, t), i.set(t, e);
  for (var v = s; ++f < l; ) {
    d = a[f];
    var T = e[d], S = t[d];
    if (o)
      var k = s ? o(S, T, d, t, e, i) : o(T, S, d, e, t, i);
    if (!(k === void 0 ? T === S || r(T, S, n, o, i) : k)) {
      g = !1;
      break;
    }
    v || (v = d == "constructor");
  }
  if (g && !v) {
    var L = e.constructor, ae = t.constructor;
    L != ae && "constructor" in e && "constructor" in t && !(typeof L == "function" && L instanceof L && typeof ae == "function" && ae instanceof ae) && (g = !1);
  }
  return i.delete(e), i.delete(t), g;
}
var $A = 1, zf = "[object Arguments]", Gf = "[object Array]", Gi = "[object Object]", AA = Object.prototype, Yf = AA.hasOwnProperty;
function NA(e, t, n, o, r, i) {
  var s = Pe(e), a = Pe(t), l = s ? Gf : jo(e), c = a ? Gf : jo(t);
  l = l == zf ? Gi : l, c = c == zf ? Gi : c;
  var u = l == Gi, f = c == Gi, d = l == c;
  if (d && oi(e)) {
    if (!oi(t))
      return !1;
    s = !0, u = !1;
  }
  if (d && !u)
    return i || (i = new Ct()), s || Vc(e) ? gp(e, t, n, o, r, i) : CA(e, t, l, n, o, r, i);
  if (!(n & $A)) {
    var h = u && Yf.call(e, "__wrapped__"), p = f && Yf.call(t, "__wrapped__");
    if (h || p) {
      var g = h ? e.value() : e, v = p ? t.value() : t;
      return i || (i = new Ct()), r(g, v, n, o, i);
    }
  }
  return d ? (i || (i = new Ct()), xA(e, t, n, o, r, i)) : !1;
}
function Xc(e, t, n, o, r) {
  return e === t ? !0 : e == null || t == null || !Ut(e) && !Ut(t) ? e !== e && t !== t : NA(e, t, n, o, Xc, r);
}
var MA = 1, kA = 2;
function DA(e, t, n, o) {
  var r = n.length, i = r, s = !o;
  if (e == null)
    return !i;
  for (e = Object(e); r--; ) {
    var a = n[r];
    if (s && a[2] ? a[1] !== e[a[0]] : !(a[0] in e))
      return !1;
  }
  for (; ++r < i; ) {
    a = n[r];
    var l = a[0], c = e[l], u = a[1];
    if (s && a[2]) {
      if (c === void 0 && !(l in e))
        return !1;
    } else {
      var f = new Ct();
      if (o)
        var d = o(c, u, l, e, t, f);
      if (!(d === void 0 ? Xc(u, c, MA | kA, o, f) : d))
        return !1;
    }
  }
  return !0;
}
function vp(e) {
  return e === e && !dt(e);
}
function LA(e) {
  for (var t = Ei(e), n = t.length; n--; ) {
    var o = t[n], r = e[o];
    t[n] = [o, r, vp(r)];
  }
  return t;
}
function bp(e, t) {
  return function(n) {
    return n == null ? !1 : n[e] === t && (t !== void 0 || e in Object(n));
  };
}
function RA(e) {
  var t = LA(e);
  return t.length == 1 && t[0][2] ? bp(t[0][0], t[0][1]) : function(n) {
    return n === e || DA(n, e, t);
  };
}
function _A(e, t) {
  return e != null && t in Object(e);
}
function PA(e, t, n) {
  t = Qo(t, e);
  for (var o = -1, r = t.length, i = !1; ++o < r; ) {
    var s = Jo(t[o]);
    if (!(i = e != null && n(e, s)))
      break;
    e = e[s];
  }
  return i || ++o != r ? i : (r = e == null ? 0 : e.length, !!r && Fc(r) && Na(s, r) && (Pe(e) || Da(e)));
}
function Ip(e, t) {
  return e != null && PA(e, t, _A);
}
var BA = 1, jA = 2;
function UA(e, t) {
  return Zc(e) && vp(t) ? bp(Jo(e), t) : function(n) {
    var o = US(n, e);
    return o === void 0 && o === t ? Ip(n, e) : Xc(t, o, BA | jA);
  };
}
function WA(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
function FA(e) {
  return function(t) {
    return _a(t, e);
  };
}
function qA(e) {
  return Zc(e) ? WA(Jo(e)) : FA(e);
}
function VA(e) {
  return typeof e == "function" ? e : e == null ? Am : typeof e == "object" ? Pe(e) ? UA(e[0], e[1]) : RA(e) : qA(e);
}
function HA(e, t, n, o) {
  for (var r = -1, i = e == null ? 0 : e.length; ++r < i; ) {
    var s = e[r];
    t(o, s, n(s), e);
  }
  return o;
}
function ZA(e) {
  return function(t, n, o) {
    for (var r = -1, i = Object(t), s = o(t), a = s.length; a--; ) {
      var l = s[e ? a : ++r];
      if (n(i[l], l, i) === !1)
        break;
    }
    return t;
  };
}
var zA = ZA();
const GA = zA;
function YA(e, t) {
  return e && GA(e, t, Ei);
}
function KA(e, t) {
  return function(n, o) {
    if (n == null)
      return n;
    if (!Si(n))
      return e(n, o);
    for (var r = n.length, i = t ? r : -1, s = Object(n); (t ? i-- : ++i < r) && o(s[i], i, s) !== !1; )
      ;
    return n;
  };
}
var QA = KA(YA);
const JA = QA;
function XA(e, t, n, o) {
  return JA(e, function(r, i, s) {
    t(o, r, n(r), s);
  }), o;
}
function eN(e, t) {
  return function(n, o) {
    var r = Pe(n) ? HA : XA, i = t ? t() : {};
    return r(n, e, VA(o), i);
  };
}
function tN(e, t, n) {
  for (var o = -1, r = e == null ? 0 : e.length; ++o < r; )
    if (n(t, e[o]))
      return !0;
  return !1;
}
function Xo(e) {
  var t = e == null ? 0 : e.length;
  return t ? e[t - 1] : void 0;
}
function xi(e) {
  return e && e.length ? e[0] : void 0;
}
var nN = Object.prototype, oN = nN.hasOwnProperty, rN = eN(function(e, t, n) {
  oN.call(e, n) ? e[n].push(t) : Uc(e, n, [t]);
});
const $i = rN;
function iN(e, t) {
  return t.length < 2 ? e : _a(e, Um(t, 0, -1));
}
var sN = "[object Map]", aN = "[object Set]", lN = Object.prototype, cN = lN.hasOwnProperty;
function Tp(e) {
  if (e == null)
    return !0;
  if (Si(e) && (Pe(e) || typeof e == "string" || typeof e.splice == "function" || oi(e) || Vc(e) || Da(e)))
    return !e.length;
  var t = jo(e);
  if (t == sN || t == aN)
    return !e.size;
  if (ka(e))
    return !_m(e).length;
  for (var n in e)
    if (cN.call(e, n))
      return !1;
  return !0;
}
function uN(e, t) {
  return t = Qo(t, e), e = iN(e, t), e == null || delete e[Jo(Xo(t))];
}
function fN(e) {
  return YS(e) ? void 0 : e;
}
var dN = 1, hN = 2, mN = 4, pN = Bm(function(e, t) {
  var n = {};
  if (e == null)
    return n;
  var o = !1;
  t = Em(t, function(i) {
    return i = Qo(i, e), o || (o = i.length > 1), i;
  }), Oi(e, dp(e), n), o && (n = Zr(n, dN | hN | mN, fN));
  for (var r = t.length; r--; )
    uN(n, t[r]);
  return n;
});
const yN = pN;
function gN(e, t, n, o) {
  if (!dt(e))
    return e;
  t = Qo(t, e);
  for (var r = -1, i = t.length, s = i - 1, a = e; a != null && ++r < i; ) {
    var l = Jo(t[r]), c = n;
    if (l === "__proto__" || l === "constructor" || l === "prototype")
      return e;
    if (r != s) {
      var u = a[l];
      c = o ? o(u, l, a) : void 0, c === void 0 && (c = dt(u) ? u : Na(t[r + 1]) ? [] : {});
    }
    Wc(a, l, c), a = a[l];
  }
  return e;
}
function vN(e, t, n) {
  for (var o = -1, r = t.length, i = {}; ++o < r; ) {
    var s = t[o], a = _a(e, s);
    n(a, s) && gN(i, Qo(s, e), a);
  }
  return i;
}
function bN(e, t) {
  return vN(e, t, function(n, o) {
    return Ip(e, o);
  });
}
var IN = Bm(function(e, t) {
  return e == null ? {} : bN(e, t);
});
const na = IN;
var TN = Math.ceil, wN = Math.max;
function CN(e, t, n, o) {
  for (var r = -1, i = wN(TN((t - e) / (n || 1)), 0), s = Array(i); i--; )
    s[o ? i : ++r] = e, e += n;
  return s;
}
function ON(e) {
  return function(t, n, o) {
    return o && typeof o != "number" && cO(t, n, o) && (n = o = void 0), t = js(t), n === void 0 ? (n = t, t = 0) : n = js(n), o = o === void 0 ? t < n ? 1 : -1 : js(o), CN(t, n, o, e);
  };
}
var SN = ON();
const Kf = SN;
var EN = gx("round");
const ht = EN;
var xN = 1 / 0, $N = So && 1 / Jc(new So([, -0]))[1] == xN ? function(e) {
  return new So(e);
} : jC;
const AN = $N;
var NN = 200;
function MN(e, t, n) {
  var o = -1, r = nO, i = e.length, s = !0, a = [], l = a;
  if (n)
    s = !1, r = tN;
  else if (i >= NN) {
    var c = t ? null : AN(e);
    if (c)
      return Jc(c);
    s = !1, r = yp, l = new si();
  } else
    l = t ? [] : a;
  e:
    for (; ++o < i; ) {
      var u = e[o], f = t ? t(u) : u;
      if (u = n || u !== 0 ? u : 0, s && f === f) {
        for (var d = l.length; d--; )
          if (l[d] === f)
            continue e;
        t && l.push(f), a.push(u);
      } else
        r(l, f, n) || (l !== a && l.push(f), a.push(u));
    }
  return a;
}
function wp(e) {
  return e && e.length ? MN(e) : [];
}
const x = {
  changeHasHistory: "editor.changeHasHistory",
  selectAll: "editor.selectAll",
  unselectAll: "editor.unselectAll",
  select: "editor.select",
  changeViewport: "editor.changeViewport",
  clear: "editor.clear",
  loadJson: "editor.loadJson",
  initialClear: "editor.initialClear",
  initialLoadJson: "editor.initialLoadJson",
  focusTable: "editor.focusTable",
  focusColumn: "editor.focusColumn",
  focusTableEnd: "editor.focusTableEnd",
  focusMoveTable: "editor.focusMoveTable",
  editTable: "editor.editTable",
  editTableEnd: "editor.editTableEnd",
  selectAllColumn: "editor.selectAllColumn",
  drawStartRelationship: "editor.drawStartRelationship",
  drawStartAddRelationship: "editor.drawStartAddRelationship",
  drawEndRelationship: "editor.drawEndRelationship",
  drawRelationship: "editor.drawRelationship",
  hoverColumnMap: "editor.hoverColumnMap",
  changeOpenMap: "editor.changeOpenMap",
  dragstartColumn: "editor.dragstartColumn",
  dragendColumn: "editor.dragendColumn",
  sharedMouseTracker: "editor.sharedMouseTracker",
  validationIds: "editor.validationIds"
}, Cp = O.CanvasType, kN = O.CanvasTypeList, z = O.Show, _ = O.ColumnType, DN = O.ColumnTypeList, no = O.Database, LN = O.DatabaseList, GB = O.Language, RN = O.LanguageList, YB = O.NameCase, _N = O.NameCaseList, Yi = O.BracketType, PN = O.BracketTypeList, Op = O.RelationshipType, Zl = O.StartRelationshipType, wt = O.Direction, U = O.ColumnOption, Re = O.ColumnUIKey, Eo = O.OrderType, KB = O.SaveSettingType, BN = O.CANVAS_SIZE_MAX, jN = O.CANVAS_SIZE_MIN, UN = O.CANVAS_ZOOM_MAX, WN = O.CANVAS_ZOOM_MIN, QB = {
  [Yi.none]: "",
  [Yi.backtick]: "`",
  [Yi.doubleQuote]: '"',
  [Yi.singleQuote]: "'"
}, JB = {
  [_.columnName]: "Name",
  [_.columnDataType]: "DataType",
  [_.columnDefault]: "Default",
  [_.columnComment]: "Comment",
  [_.columnAutoIncrement]: "Auto Increment",
  [_.columnUnique]: "Unique",
  [_.columnNotNull]: "Not Null"
}, Kn = {
  shared: (
    /*     */
    1
  ),
  changeOnly: (
    /* */
    2
  ),
  following: (
    /*  */
    4
  )
};
function FN(e, t) {
  return {
    ...Pa(t),
    tags: Vw(t.tags) ? t.tags | e : e
  };
}
function qN(e, t) {
  return t.map((n) => FN(e, n));
}
const VN = (e) => (...t) => function* (n, o) {
  const r = dm(n, o, t);
  yield qN(e, r);
}, XB = VN(Kn.changeOnly);
function A(e, t) {
  return (e & t) === t;
}
function Qf(e, t) {
  return !(e.x > t.x + t.w || e.x + e.w < t.x || e.y > t.y + t.h || e.y + e.h < t.y);
}
function zl(e, t, n) {
  const o = { x: 0, y: 0, w: 0, h: 0 };
  return o.w = e * n, o.h = t * n, o.x = (e - o.w) / 2, o.y = (t - o.h) / 2, o;
}
function HN({ x: e, y: t }, n, o, r) {
  const i = zl(n, o, r), s = e * r, a = t * r, l = i.x + s, c = i.y + a;
  return { x: l, y: c };
}
function Sp(e, t, n, o) {
  const { x: r, y: i } = e, { x: s, y: a } = HN(e, t, n, o), l = (r - s) / o, c = (i - a) / o, u = r + l, f = i + c;
  return { x: u, y: f };
}
const ZN = 200, zN = 100, Jf = 50, GN = 16, YN = 9, Ep = 1200, KN = Ep / GN * YN, xp = 20, Dn = 8, $p = 12, QN = 4, oa = 1, ra = 8, JN = 2, XN = 2, eM = xp + JN * 2, tM = $p + XN + eM, ej = 4, Ap = 12, Np = 12, He = 60, Mp = 35, kp = 22, Dp = 15, nM = 2, oM = xp + nM * 2, ia = 1, sa = 8, Lp = $p + QN, rM = 100 + Lp, iM = 100, tj = 150, nj = 20, oj = 30, rj = 200, Sn = {
    MariaDB: "MariaDB",
    MSSQL: "MSSQL",
    MySQL: "MySQL",
    Oracle: "Oracle",
    PostgreSQL: "PostgreSQL",
    SQLite: "SQLite"
}, sM = Object.values(Sn), ij = {
    [Sn.MariaDB]: no.MariaDB,
    [Sn.MSSQL]: no.MSSQL,
    [Sn.MySQL]: no.MySQL,
    [Sn.Oracle]: no.Oracle,
    [Sn.PostgreSQL]: no.PostgreSQL,
    [Sn.SQLite]: no.SQLite
}, aM = /[^0-9]/g, Rp = (e) => e.replace(aM, ""), lM = Un(jN, BN), cM = Un(WN, UN), _p = Un(He, 200);
function Gl(e) {
  const t = ni(e) ? Number(Rp(e)) : e;
  return lM(t);
}
function Ba(e) {
  return ht(cM(e), 2);
}
function sj(e) {
  const t = ni(e) ? Number(Rp(e)) : e;
  return `${_p(t)}px`;
}
function aj(e) {
  return `${(e * 100).toFixed()}%`;
}
const uM = M(LN), Pp = M(_N), fM = M(PN), dM = M(RN), Xf = M(DN), lj = M(sM), Bp = M(kN);
function ye(e) {
  return Math.max(e, He);
}
function cj(e) {
  return ni(e) ? e.trim() : "";
}
function uj(e) {
  return e <= 0.7;
}
const ke = {
  table: "table",
  memo: "memo"
}, j = {
  tableName: "tableName",
  tableComment: "tableComment",
  columnName: "columnName",
  columnDataType: "columnDataType",
  columnNotNull: "columnNotNull",
  columnUnique: "columnUnique",
  columnAutoIncrement: "columnAutoIncrement",
  columnDefault: "columnDefault",
  columnComment: "columnComment"
}, lt = {
  ArrowUp: "ArrowUp",
  ArrowRight: "ArrowRight",
  ArrowDown: "ArrowDown",
  ArrowLeft: "ArrowLeft",
  Tab: "Tab"
}, fj = M(Object.values(lt)), hM = () => ({
  id: me(),
  selectedMap: {},
  hasUndo: !1,
  hasRedo: !1,
  viewport: {
    width: Ep,
    height: KN
  },
  focusTable: null,
  drawRelationship: null,
  hoverColumnMap: {},
  openMap: {},
  draggableColumn: null,
  draggingColumnMap: {},
  sharedMouseTrackerMap: {}
}), ed = (e) => e.ui.zIndex, ja = (e, t) => Math.max(1, ...e.map(ed), ...t.map(ed)) + 1, mM = (e) => (t) => e.y === t.y && e.x === t.x;
function jp({ width: e, height: t, zoomLevel: n, scrollLeft: o, scrollTop: r }, i, s) {
  const a = Sp({
    x: ZN - o,
    y: zN - r
  }, e, t, n), l = [...i, ...s].map(({ ui: c }) => c);
  for (; l.some(mM(a)); )
    a.x += Jf, a.y += Jf;
  return a;
}
function er() {
  const e = Date.now();
  return {
    updateAt: e,
    createAt: e
  };
}
function pM(e, t) {
  return e < t ? Kf(e, t + 1) : Kf(t, e + 1);
}
function dj(e) {
  return Gm(mx(e));
}
function Ai(e, t) {
  return wp([...e, t]);
}
function Up(e, t, n) {
  if (!t || t === n)
    return [n];
  const o = e.indexOf(t), r = e.indexOf(n);
  return o === -1 ? [n] : pM(o, r).map((i) => e[i]);
}
function yM(e, t, n, o) {
  return wp([
    ...t,
    ...Up(e, n, o)
  ]);
}
const gM = {
  [_.columnName]: !0,
  [_.columnDataType]: z.columnDataType,
  [_.columnNotNull]: z.columnNotNull,
  [_.columnUnique]: z.columnUnique,
  [_.columnAutoIncrement]: z.columnAutoIncrement,
  [_.columnDefault]: z.columnDefault,
  [_.columnComment]: z.columnComment
}, vM = {
  [_.columnName]: j.columnName,
  [_.columnDataType]: j.columnDataType,
  [_.columnNotNull]: j.columnNotNull,
  [_.columnUnique]: j.columnUnique,
  [_.columnAutoIncrement]: j.columnAutoIncrement,
  [_.columnDefault]: j.columnDefault,
  [_.columnComment]: j.columnComment
}, Wp = [
  j.tableName,
  j.tableComment
];
function tr({ settings: { show: e, columnOrder: t } }) {
  return t.filter((n) => {
    const o = gM[n];
    return o === !0 ? !0 : A(e, o);
  }).map((n) => vM[n]);
}
function Ni({ collections: e, editor: { focusTable: t } }) {
  if (!t)
    return !1;
  const n = y(e).collection("tableEntities").selectById(t.tableId);
  return !!(n != null && n.columnIds.length);
}
function eu(e) {
  const { editor: { focusTable: t } } = e;
  if (!t)
    return !0;
  const n = tr(e);
  return n.indexOf(t.focusType) === n.length - 1;
}
function Fp(e) {
  const { editor: { focusTable: t } } = e;
  return t ? tr(e).indexOf(t.focusType) === 0 : !0;
}
function tu({ collections: e, editor: { focusTable: t } }) {
  if (!(t != null && t.columnId))
    return !0;
  const n = y(e).collection("tableEntities").selectById(t.tableId);
  return n ? n.columnIds.indexOf(t.columnId) === n.columnIds.length - 1 : !0;
}
function qp({ collections: e, editor: { focusTable: t } }) {
  if (!(t != null && t.columnId))
    return !0;
  const n = y(e).collection("tableEntities").selectById(t.tableId);
  return n ? n.columnIds.indexOf(t.columnId) === 0 : !0;
}
function Yl(e) {
  const t = tr(e);
  return t[t.length - 1];
}
function Kl(e) {
  return tr(e)[0];
}
function bM(e) {
  const { editor: { focusTable: t } } = e;
  if (!t)
    return j.columnName;
  const n = tr(e), o = n.indexOf(t.focusType);
  return eu(e) ? n[0] : n[o + 1];
}
function IM(e) {
  const { editor: { focusTable: t } } = e;
  if (!t)
    return j.columnName;
  const n = tr(e), o = n.indexOf(t.focusType);
  return Fp(e) ? n[n.length - 1] : n[o - 1];
}
function TM(e, t) {
  const { collections: n, editor: { focusTable: o } } = e;
  if (!(o != null && o.columnId))
    return null;
  const r = y(n).collection("tableEntities").selectById(o.tableId);
  if (!r)
    return null;
  const i = r.columnIds.indexOf(o.columnId);
  if (i <= 0)
    return null;
  let s = null;
  for (let a = i; a >= 0; a--) {
    const l = r.columnIds[a];
    if (!t.includes(l)) {
      s = l;
      break;
    }
  }
  return s;
}
function Ua({ settings: { show: e } }) {
  return A(e, z.tableComment) ? Wp : [j.tableName];
}
function nu(e) {
  const { editor: { focusTable: t } } = e;
  if (!t)
    return !0;
  const n = Ua(e);
  return n.indexOf(t.focusType) === n.length - 1;
}
function Vp(e) {
  const { editor: { focusTable: t } } = e;
  return t ? Ua(e).indexOf(t.focusType) === 0 : !0;
}
const qn = M(Wp);
function td(e) {
  const { editor: { focusTable: t } } = e;
  if (!t)
    return j.tableName;
  const n = Ua(e), o = n.indexOf(t.focusType);
  return nu(e) ? n[0] : n[o + 1];
}
function nd(e) {
  const { editor: { focusTable: t } } = e;
  if (!t)
    return j.tableName;
  const n = Ua(e), o = n.indexOf(t.focusType);
  return Vp(e) ? n[n.length - 1] : n[o - 1];
}
function wM(e, t) {
  const { collections: n, editor: { focusTable: o } } = e;
  if (!o)
    return;
  const r = y(n).collection("tableEntities").selectById(o.tableId);
  if (r) {
    if (qn(o.focusType)) {
      if (Ni(e)) {
        const i = r.columnIds[r.columnIds.length - 1];
        o.focusType = Yl(e), o.columnId = i, o.prevSelectColumnId = i, o.selectColumnIds = [i];
      }
    } else if (qp(e))
      o.focusType = j.tableName, o.columnId = null, o.prevSelectColumnId = null, o.selectColumnIds = [];
    else if (o.columnId) {
      const i = r.columnIds.indexOf(o.columnId), s = r.columnIds[i - 1];
      o.columnId = s, o.prevSelectColumnId = s, t.shiftKey && t.moveKey !== lt.Tab ? o.selectColumnIds = Ai(o.selectColumnIds, s) : o.selectColumnIds = [s];
    }
  }
}
function CM(e, t) {
  const { collections: n, editor: { focusTable: o } } = e;
  if (!o)
    return;
  const r = y(n).collection("tableEntities").selectById(o.tableId);
  if (r) {
    if (qn(o.focusType)) {
      if (Ni(e)) {
        const i = r.columnIds[0];
        o.focusType = Kl(e), o.columnId = i, o.prevSelectColumnId = i, o.selectColumnIds = [i];
      }
    } else if (tu(e))
      o.focusType = j.tableName, o.columnId = null, o.prevSelectColumnId = null, o.selectColumnIds = [];
    else if (o.columnId) {
      const i = r.columnIds.indexOf(o.columnId), s = r.columnIds[i + 1];
      o.columnId = s, o.prevSelectColumnId = s, t.shiftKey && t.moveKey !== lt.Tab ? o.selectColumnIds = Ai(o.selectColumnIds, s) : o.selectColumnIds = [s];
    }
  }
}
function od(e, t) {
  const { collections: n, editor: { focusTable: o } } = e;
  if (!o)
    return;
  const r = y(n).collection("tableEntities").selectById(o.tableId);
  if (r)
    if (qn(o.focusType))
      if (Vp(e))
        if (Ni(e)) {
          const i = r.columnIds[r.columnIds.length - 1];
          o.focusType = Yl(e), o.columnId = i, o.prevSelectColumnId = i, o.selectColumnIds = [i];
        } else
          o.focusType = nd(e);
      else
        o.focusType = nd(e);
    else if (Fp(e)) {
      if (qp(e))
        o.focusType = A(e.settings.show, z.tableComment) ? j.tableComment : j.tableName, o.columnId = null, o.prevSelectColumnId = null, o.selectColumnIds = [];
      else if (o.columnId) {
        const i = r.columnIds.indexOf(o.columnId), s = r.columnIds[i - 1];
        o.focusType = Yl(e), o.columnId = s, o.prevSelectColumnId = s, t.shiftKey && t.moveKey !== lt.Tab ? o.selectColumnIds = Ai(o.selectColumnIds, s) : o.selectColumnIds = [s];
      }
    } else
      o.focusType = IM(e), !t.shiftKey && o.columnId && (o.prevSelectColumnId = o.columnId, o.selectColumnIds = [o.columnId]);
}
function rd(e, t) {
  const { collections: n, editor: { focusTable: o } } = e;
  if (!o)
    return;
  const r = y(n).collection("tableEntities").selectById(o.tableId);
  if (r)
    if (qn(o.focusType))
      if (nu(e))
        if (Ni(e)) {
          const i = r.columnIds[0];
          o.focusType = Kl(e), o.columnId = i, o.prevSelectColumnId = i, o.selectColumnIds = [i];
        } else
          o.focusType = td(e);
      else
        o.focusType = td(e);
    else if (eu(e)) {
      if (tu(e))
        o.focusType = j.tableName, o.columnId = null, o.prevSelectColumnId = null, o.selectColumnIds = [];
      else if (o.columnId) {
        const i = r.columnIds.indexOf(o.columnId), s = r.columnIds[i + 1];
        o.focusType = Kl(e), o.columnId = s, o.prevSelectColumnId = s, t.shiftKey && t.moveKey !== lt.Tab ? o.selectColumnIds = Ai(o.selectColumnIds, s) : o.selectColumnIds = [s];
      }
    } else
      o.focusType = bM(e), !t.shiftKey && o.columnId && (o.prevSelectColumnId = o.columnId, o.selectColumnIds = [o.columnId]);
}
const id = 1e3 * 30, OM = I(x.changeHasHistory), SM = ({ editor: e }, { payload: { hasRedo: t, hasUndo: n } }) => {
  e.hasRedo = t, e.hasUndo = n;
}, EM = I(x.selectAll), xM = ({ editor: e, doc: t }) => {
  const n = t.tableIds.reduce((r, i) => (r[i] = ke.table, r), {}), o = t.memoIds.reduce((r, i) => (r[i] = ke.memo, r), {});
  e.selectedMap = {
    ...o,
    ...n
  };
}, Wa = I(x.unselectAll), $M = ({ editor: e }) => {
  Object.keys(e.selectedMap).forEach((t) => {
    Reflect.deleteProperty(e.selectedMap, t);
  });
}, nr = I(x.select), AM = ({ editor: e }, { payload: t }) => {
  Object.assign(e.selectedMap, t);
}, NM = I(x.changeViewport), MM = ({ editor: e }, { payload: { width: t, height: n } }) => {
  e.viewport.width = t, e.viewport.height = n;
}, ou = I(x.clear), kM = (e) => {
  const { doc: t, collections: n, lww: o } = Vn({});
  e.doc = t, e.collections = n, e.lww = o;
}, ln = I(x.loadJson), DM = (e, { payload: { value: t } }) => {
  const { version: n, settings: o, doc: r, collections: i, lww: s } = bh(t);
  Bp(o.canvasType) || (o.canvasType = Cp.ERD), Object.assign(e.settings, o), e.version = n, e.doc = r, e.collections = i, e.lww = s;
}, Hp = I(x.initialClear), LM = (e) => {
  const { doc: t, collections: n, lww: o } = Vn({});
  e.doc = t, e.collections = n, e.lww = o;
}, Uo = I(x.initialLoadJson), RM = (e, { payload: { value: t } }) => {
  const { version: n, settings: o, doc: r, collections: i, lww: s } = bh(t);
  Bp(o.canvasType) || (o.canvasType = Cp.ERD), Object.assign(e.settings, o), e.version = n, e.doc = r, e.collections = i, e.lww = s;
}, Fa = I(x.focusTable), _M = ({ editor: e, collections: t }, { payload: n }) => {
  var r, i;
  const o = y(t).collection("tableEntities");
  if (((r = e.focusTable) == null ? void 0 : r.tableId) === n.tableId && n.focusType)
    e.focusTable.focusType = n.focusType, e.focusTable.columnId = null, e.focusTable.prevSelectColumnId = null, e.focusTable.selectColumnIds = [];
  else if (n.focusType) {
    const s = o.selectById(n.tableId);
    if (!s)
      return;
    e.focusTable = {
      tableId: s.id,
      focusType: n.focusType,
      columnId: null,
      prevSelectColumnId: null,
      selectColumnIds: [],
      edit: !1
    };
  } else if (((i = e.focusTable) == null ? void 0 : i.tableId) !== n.tableId) {
    const s = o.selectById(n.tableId);
    if (!s)
      return;
    e.focusTable = {
      tableId: s.id,
      focusType: j.tableName,
      columnId: null,
      prevSelectColumnId: null,
      selectColumnIds: [],
      edit: !1
    };
  }
}, cn = I(x.focusColumn), PM = ({ editor: e, collections: t }, { payload: n }) => {
  var r;
  const o = y(t).collection("tableEntities");
  if (((r = e.focusTable) == null ? void 0 : r.tableId) === n.tableId) {
    const i = o.selectById(n.tableId);
    if (!i)
      return;
    const s = e.focusTable;
    s.columnId = n.columnId, s.focusType = n.focusType, n.$mod && n.shiftKey ? s.selectColumnIds = yM(i.columnIds, s.selectColumnIds, s.prevSelectColumnId, s.columnId) : n.shiftKey ? s.selectColumnIds = Up(i.columnIds, s.prevSelectColumnId, s.columnId) : n.$mod ? s.selectColumnIds = Ai(s.selectColumnIds, n.columnId) : s.selectColumnIds = [n.columnId], s.prevSelectColumnId = n.columnId;
  } else {
    const i = o.selectById(n.tableId);
    if (!i)
      return;
    e.focusTable = {
      tableId: i.id,
      focusType: n.focusType,
      columnId: n.columnId,
      prevSelectColumnId: n.columnId,
      selectColumnIds: [n.columnId],
      edit: !1
    };
  }
}, ru = I(x.focusTableEnd), BM = ({ editor: e }) => {
  e.focusTable = null;
}, Zp = I(x.focusMoveTable), jM = (e, { payload: t }) => {
  const { editor: { focusTable: n } } = e;
  if (n)
    switch (n.edit = !1, t.moveKey) {
      case lt.ArrowUp:
        wM(e, t);
        break;
      case lt.ArrowDown:
        CM(e, t);
        break;
      case lt.ArrowLeft:
        od(e, t);
        break;
      case lt.ArrowRight:
        rd(e, t);
        break;
      case lt.Tab:
        t.shiftKey ? od(e, t) : rd(e, t);
        break;
    }
}, UM = I(x.editTable), WM = ({ editor: { focusTable: e } }) => {
  e && (e.edit = !0);
}, FM = I(x.editTableEnd), qM = ({ editor: { focusTable: e } }) => {
  e && (e.edit = !1);
}, VM = I(x.selectAllColumn), HM = ({ collections: e, editor: { focusTable: t } }) => {
  if (!t)
    return;
  const n = y(e).collection("tableEntities").selectById(t.tableId);
  n && (t.selectColumnIds = [...n.columnIds]);
}, zp = I(x.drawStartRelationship), ZM = ({ editor: e }, { payload: { relationshipType: t } }) => {
  e.drawRelationship = {
    relationshipType: t,
    start: null,
    end: { x: 0, y: 0 }
  };
}, Gp = I(x.drawStartAddRelationship), zM = ({ editor: { drawRelationship: e }, collections: t }, { payload: { tableId: n } }) => {
  if (!e)
    return;
  const o = y(t).collection("tableEntities").selectById(n);
  o && (e.start = {
    tableId: n,
    x: o.ui.x,
    y: o.ui.y
  });
}, iu = I(x.drawEndRelationship), GM = ({ editor: e }) => {
  e.drawRelationship = null;
}, YM = I(x.drawRelationship), KM = ({ editor: { drawRelationship: e }, settings: { scrollLeft: t, scrollTop: n, zoomLevel: o, width: r, height: i } }, { payload: { x: s, y: a } }) => {
  if (!(e != null && e.start))
    return;
  const l = Sp({ x: s - t, y: a - n }, r, i, o);
  e.end.x = l.x, e.end.y = l.y;
}, QM = I(x.hoverColumnMap), JM = ({ editor: e }, { payload: { columnIds: t } }) => {
  Object.keys(e.hoverColumnMap).forEach((n) => {
    Reflect.deleteProperty(e.hoverColumnMap, n);
  });
  for (const n of t)
    e.hoverColumnMap[n] = !0;
}, XM = I(x.changeOpenMap), ek = ({ editor: e }, { payload: t }) => {
  Object.assign(e.openMap, t);
}, su = I(x.dragstartColumn), tk = ({ editor: e }, { payload: t }) => {
  e.draggableColumn = t, t.columnIds.forEach((n) => {
    e.draggingColumnMap[n] = !0;
  });
}, nk = I(x.dragendColumn), ok = ({ editor: e }) => {
  e.draggableColumn = null, Object.keys(e.draggingColumnMap).forEach((t) => {
    Reflect.deleteProperty(e.draggingColumnMap, t);
  });
}, rk = I(x.sharedMouseTracker), ik = ({ editor: e }, { payload: t, tags: n, meta: o }) => {
  if (Ko(n) || !A(n, Kn.shared) || !ni(o == null ? void 0 : o.editorId) || e.id === o.editorId)
    return;
  const r = e.sharedMouseTrackerMap[o.editorId], i = !ni(o.nickname) || Tp(o.nickname.trim()) ? "user" : o.nickname.trim();
  r ? (r.x = t.x, r.y = t.y, r.nickname = i, clearTimeout(r.timeoutId), r.timeoutId = setTimeout(() => {
    Reflect.deleteProperty(e.sharedMouseTrackerMap, o.editorId);
  }, id)) : e.sharedMouseTrackerMap[o.editorId] = {
    ...t,
    id: o.editorId,
    nickname: i,
    timeoutId: setTimeout(() => {
      Reflect.deleteProperty(e.sharedMouseTrackerMap, o.editorId);
    }, id)
  };
}, sk = I(x.validationIds), ak = ({ doc: e, collections: t }) => {
  const n = y(t).collection("tableEntities"), o = y(t).collection("tableColumnEntities"), r = y(t).collection("indexEntities"), i = y(t).collection("indexColumnEntities"), s = y(t).collection("relationshipEntities"), a = y(t).collection("memoEntities"), l = e.tableIds.filter((d) => !n.selectById(d)), c = e.relationshipIds.filter((d) => !s.selectById(d)), u = e.indexIds.filter((d) => !r.selectById(d)), f = e.memoIds.filter((d) => !a.selectById(d));
  e.tableIds = e.tableIds.filter((d) => !l.includes(d)), e.relationshipIds = e.relationshipIds.filter((d) => !c.includes(d)), e.indexIds = e.indexIds.filter((d) => !u.includes(d)), e.memoIds = e.memoIds.filter((d) => !f.includes(d)), n.selectAll().forEach((d) => {
    const h = d.columnIds.filter((g) => !o.selectById(g)), p = d.seqColumnIds.filter((g) => !o.selectById(g));
    d.columnIds = d.columnIds.filter((g) => !h.includes(g)), d.seqColumnIds = d.seqColumnIds.filter((g) => !p.includes(g));
  }), r.selectAll().forEach((d) => {
    const h = d.indexColumnIds.filter((g) => !i.selectById(g)), p = d.seqIndexColumnIds.filter((g) => !i.selectById(g));
    d.indexColumnIds = d.indexColumnIds.filter((g) => !h.includes(g)), d.seqIndexColumnIds = d.seqIndexColumnIds.filter((g) => !p.includes(g));
  });
}, lk = {
  [x.changeHasHistory]: SM,
  [x.selectAll]: xM,
  [x.unselectAll]: $M,
  [x.select]: AM,
  [x.changeViewport]: MM,
  [x.clear]: kM,
  [x.loadJson]: DM,
  [x.initialClear]: LM,
  [x.initialLoadJson]: RM,
  [x.focusTable]: _M,
  [x.focusColumn]: PM,
  [x.focusTableEnd]: BM,
  [x.focusMoveTable]: jM,
  [x.editTable]: WM,
  [x.editTableEnd]: qM,
  [x.selectAllColumn]: HM,
  [x.drawStartRelationship]: ZM,
  [x.drawStartAddRelationship]: zM,
  [x.drawEndRelationship]: GM,
  [x.drawRelationship]: KM,
  [x.hoverColumnMap]: JM,
  [x.changeOpenMap]: ek,
  [x.dragstartColumn]: tk,
  [x.dragendColumn]: ok,
  [x.sharedMouseTracker]: ik,
  [x.validationIds]: ak
}, ck = {
  changeHasHistoryAction: OM,
  selectAllAction: EM,
  unselectAllAction: Wa,
  selectAction: nr,
  changeViewportAction: NM,
  clearAction: ou,
  loadJsonAction: ln,
  initialClearAction: Hp,
  initialLoadJsonAction: Uo,
  focusTableAction: Fa,
  focusColumnAction: cn,
  focusTableEndAction: ru,
  focusMoveTableAction: Zp,
  editTableAction: UM,
  editTableEndAction: FM,
  selectAllColumnAction: VM,
  drawStartRelationshipAction: zp,
  drawStartAddRelationshipAction: Gp,
  drawEndRelationshipAction: iu,
  drawRelationshipAction: YM,
  hoverColumnMapAction: QM,
  changeOpenMapAction: XM,
  dragstartColumnAction: su,
  dragendColumnAction: nk,
  sharedMouseTrackerAction: rk,
  validationIdsAction: sk
}, uk = (e, t, n) => {
  e.push(ou(), ln({ value: wc(n) }));
}, fk = (e, t, n) => {
  e.push(ln({ value: wc(n) }));
}, dk = {
  [x.loadJson]: uk,
  [x.clear]: fk
}, Ze = {
  addIndex: "index.add",
  removeIndex: "index.remove",
  changeIndexName: "index.changeName",
  changeIndexUnique: "index.changeUnique"
};
var hj = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function hk(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var mk = function(t) {
  return pk(t) && !yk(t);
};
function pk(e) {
  return !!e && typeof e == "object";
}
function yk(e) {
  var t = Object.prototype.toString.call(e);
  return t === "[object RegExp]" || t === "[object Date]" || bk(e);
}
var gk = typeof Symbol == "function" && Symbol.for, vk = gk ? Symbol.for("react.element") : 60103;
function bk(e) {
  return e.$$typeof === vk;
}
function Ik(e) {
  return Array.isArray(e) ? [] : {};
}
function ai(e, t) {
  return t.clone !== !1 && t.isMergeableObject(e) ? Wo(Ik(e), e, t) : e;
}
function Tk(e, t, n) {
  return e.concat(t).map(function(o) {
    return ai(o, n);
  });
}
function wk(e, t) {
  if (!t.customMerge)
    return Wo;
  var n = t.customMerge(e);
  return typeof n == "function" ? n : Wo;
}
function Ck(e) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e).filter(function(t) {
    return Object.propertyIsEnumerable.call(e, t);
  }) : [];
}
function sd(e) {
  return Object.keys(e).concat(Ck(e));
}
function Yp(e, t) {
  try {
    return t in e;
  } catch {
    return !1;
  }
}
function Ok(e, t) {
  return Yp(e, t) && !(Object.hasOwnProperty.call(e, t) && Object.propertyIsEnumerable.call(e, t));
}
function Sk(e, t, n) {
  var o = {};
  return n.isMergeableObject(e) && sd(e).forEach(function(r) {
    o[r] = ai(e[r], n);
  }), sd(t).forEach(function(r) {
    Ok(e, r) || (Yp(e, r) && n.isMergeableObject(t[r]) ? o[r] = wk(r, n)(e[r], t[r], n) : o[r] = ai(t[r], n));
  }), o;
}
function Wo(e, t, n) {
  n = n || {}, n.arrayMerge = n.arrayMerge || Tk, n.isMergeableObject = n.isMergeableObject || mk, n.cloneUnlessOtherwiseSpecified = ai;
  var o = Array.isArray(t), r = Array.isArray(e), i = o === r;
  return i ? o ? n.arrayMerge(e, t, n) : Sk(e, t, n) : ai(t, n);
}
Wo.all = function(t, n) {
  if (!Array.isArray(t))
    throw new Error("first argument should be an array");
  return t.reduce(function(o, r) {
    return Wo(o, r, n);
  }, {});
};
var Ek = Wo, xk = Ek;
const or = /* @__PURE__ */ hk(xk), Qn = (e) => or({
  id: me(),
  name: "",
  tableId: "",
  indexColumnIds: [],
  seqIndexColumnIds: [],
  unique: !1,
  meta: er()
}, e ?? {}), au = I(Ze.addIndex), $k = ({ doc: e, collections: t, lww: n }, { payload: { id: o, tableId: r }, timestamp: i }) => {
  y(t).collection("indexEntities").addOne(Qn({ id: o, tableId: r })).addOperator(n, i, o, () => {
    M(e.indexIds)(o) || e.indexIds.push(o);
  });
}, li = I(Ze.removeIndex), Ak = ({ doc: e, collections: t, lww: n }, { payload: { id: o }, timestamp: r }) => {
  y(t).collection("indexEntities").removeOperator(n, r, o, () => {
    const i = e.indexIds.indexOf(o);
    i !== -1 && e.indexIds.splice(i, 1);
  });
}, Kp = I(Ze.changeIndexName), Nk = ({ collections: e, lww: t }, { payload: { id: n, tableId: o, value: r }, timestamp: i }) => {
  const s = y(e).collection("indexEntities");
  s.getOrCreate(n, (a) => Qn({ id: a, tableId: o })), s.replaceOperator(t, i, n, "name", () => {
    s.updateOne(n, (a) => {
      a.name = r;
    });
  });
}, lu = I(Ze.changeIndexUnique), Mk = ({ collections: e, lww: t }, { payload: { id: n, tableId: o, value: r }, timestamp: i }) => {
  const s = y(e).collection("indexEntities");
  s.getOrCreate(n, (a) => Qn({ id: a, tableId: o })), s.replaceOperator(t, i, n, "unique", () => {
    s.updateOne(n, (a) => {
      a.unique = r;
    });
  });
}, kk = {
  [Ze.addIndex]: $k,
  [Ze.removeIndex]: Ak,
  [Ze.changeIndexName]: Nk,
  [Ze.changeIndexUnique]: Mk
}, Dk = {
  addIndexAction: au,
  removeIndexAction: li,
  changeIndexNameAction: Kp,
  changeIndexUniqueAction: lu
}, Lk = (e, { payload: { id: t } }) => {
  e.push(li({ id: t }));
}, Rk = (e, { payload: { id: t } }, { collections: n }) => {
  const o = y(n).collection("indexEntities").selectById(t);
  o && e.push(au({
    id: t,
    tableId: o.tableId
  }));
}, _k = (e, { payload: { id: t, tableId: n } }, { collections: o }) => {
  const r = y(o).collection("indexEntities").selectById(t);
  r && e.push(Kp({
    id: t,
    tableId: n,
    value: r.name
  }));
}, Pk = (e, { payload: { id: t, tableId: n, value: o } }, { collections: r }) => {
  y(r).collection("indexEntities").selectById(t) && e.push(lu({
    id: t,
    tableId: n,
    value: !o
  }));
}, Bk = {
  [Ze.addIndex]: Lk,
  [Ze.removeIndex]: Rk,
  [Ze.changeIndexName]: _k,
  [Ze.changeIndexUnique]: Pk
}, ze = {
  addIndexColumn: "indexColumn.add",
  removeIndexColumn: "indexColumn.remove",
  moveIndexColumn: "indexColumn.move",
  changeIndexColumnOrderType: "indexColumn.changeOrderType"
}, cu = (e) => or({
  id: me(),
  indexId: "",
  columnId: "",
  orderType: Eo.ASC,
  meta: er()
}, e ?? {});
function Qp(e, t, n) {
  if (M(t)(n)) {
    const r = t.reduce((i, s, a) => (i[s] = a, i), {});
    e.push(n), e.sort((i, s) => {
      const a = r[i], l = r[s];
      return a === void 0 ? 1 : l === void 0 ? -1 : a - l;
    });
  } else
    e.push(n), t.push(n);
}
const aa = I(ze.addIndexColumn), jk = ({ collections: e, lww: t }, { payload: { id: n, indexId: o, tableId: r, columnId: i }, timestamp: s }) => {
  const a = y(e).collection("indexEntities"), l = a.getOrCreate(o, (c) => Qn({ id: c, tableId: r }));
  y(e).collection("indexColumnEntities").addOne(cu({ id: n, indexId: o, columnId: i })).addOperator(t, s, n, () => {
    M(l.indexColumnIds)(n) || a.updateOne(o, (c) => {
      Qp(c.indexColumnIds, c.seqIndexColumnIds, n);
    });
  });
}, uu = I(ze.removeIndexColumn), Uk = ({ collections: e, lww: t }, { payload: { id: n, indexId: o, tableId: r }, timestamp: i }) => {
  const s = y(e).collection("indexEntities"), a = s.getOrCreate(o, (l) => Qn({ id: l, tableId: r }));
  y(e).collection("indexColumnEntities").removeOperator(t, i, n, () => {
    const l = a.indexColumnIds.indexOf(n);
    l !== -1 && s.updateOne(o, (c) => {
      c.indexColumnIds.splice(l, 1);
    });
  });
}, fu = I(ze.moveIndexColumn), Wk = ({ collections: e }, { payload: { id: t, indexId: n, tableId: o, targetId: r } }) => {
  if (t === r)
    return;
  const i = y(e).collection("indexEntities"), s = i.getOrCreate(n, (c) => Qn({ id: c, tableId: o })), a = s.indexColumnIds.indexOf(t);
  if (a === -1)
    return;
  const l = s.indexColumnIds.indexOf(r);
  l !== -1 && i.updateOne(n, (c) => {
    c.indexColumnIds.splice(a, 1), c.indexColumnIds.splice(l, 0, t);
    const u = c.seqIndexColumnIds.indexOf(t), f = c.seqIndexColumnIds.indexOf(r);
    u !== -1 && f !== -1 && (c.seqIndexColumnIds.splice(u, 1), c.seqIndexColumnIds.splice(f, 0, t));
  });
}, du = I(ze.changeIndexColumnOrderType), Fk = ({ collections: e, lww: t }, { payload: { id: n, indexId: o, columnId: r, value: i }, timestamp: s }) => {
  const a = y(e).collection("indexColumnEntities");
  a.getOrCreate(n, (l) => cu({ id: l, indexId: o, columnId: r })), a.replaceOperator(t, s, n, "orderType", () => {
    a.updateOne(n, (l) => {
      l.orderType = i;
    });
  });
}, qk = {
  [ze.addIndexColumn]: jk,
  [ze.removeIndexColumn]: Uk,
  [ze.moveIndexColumn]: Wk,
  [ze.changeIndexColumnOrderType]: Fk
}, Vk = {
  addIndexColumnAction: aa,
  removeIndexColumnAction: uu,
  moveIndexColumnAction: fu,
  changeIndexColumnOrderTypeAction: du
}, Hk = (e, { payload: { id: t, indexId: n, tableId: o } }) => {
  e.push(uu({ id: t, indexId: n, tableId: o }));
}, Zk = (e, { payload: { id: t, indexId: n, tableId: o } }, { collections: r }) => {
  const i = y(r).collection("indexColumnEntities").selectById(t);
  i && e.push(aa({
    id: t,
    indexId: n,
    tableId: o,
    columnId: i.columnId
  }));
}, zk = (e, { payload: { id: t, indexId: n, tableId: o, targetId: r } }, { collections: i }) => {
  const s = y(i).collection("indexEntities").selectById(n);
  if (!s)
    return;
  const a = s.indexColumnIds.indexOf(t);
  if (a === -1)
    return;
  const l = s.indexColumnIds.indexOf(r);
  if (l === -1)
    return;
  const c = a < l ? a + 1 : a - 1, u = s.indexColumnIds[c];
  e.push(fu({
    indexId: n,
    tableId: o,
    id: t,
    targetId: u
  }));
}, Gk = (e, { payload: { id: t, indexId: n, columnId: o } }, { collections: r }) => {
  const i = y(r).collection("indexColumnEntities").selectById(t);
  i && e.push(du({
    id: t,
    indexId: n,
    columnId: o,
    value: i.orderType
  }));
}, Yk = {
  [ze.addIndexColumn]: Hk,
  [ze.removeIndexColumn]: Zk,
  [ze.moveIndexColumn]: zk,
  [ze.changeIndexColumnOrderType]: Gk
}, oe = {
  addMemo: "memo.add",
  moveMemo: "memo.move",
  moveToMemo: "memo.moveTo",
  removeMemo: "memo.remove",
  changeMemoValue: "memo.changeValue",
  changeMemoColor: "memo.changeColor",
  resizeMemo: "memo.resize",
  changeZIndex: "memo.changeZIndex"
}, Jn = (e) => or({
  id: me(),
  value: "",
  ui: {
    x: 200,
    y: 100,
    zIndex: 2,
    width: rM,
    height: iM,
    color: ""
  },
  meta: er()
}, e ?? {}), hu = I(oe.addMemo), Kk = ({ doc: e, collections: t, lww: n }, { payload: { id: o, ui: r }, timestamp: i }) => {
  y(t).collection("memoEntities").addOne(Jn({ id: o, ui: r })).addOperator(n, i, o, () => {
    M(e.memoIds)(o) || e.memoIds.push(o);
  });
}, xo = I(oe.moveMemo), Qk = ({ collections: e }, { payload: { ids: t, movementX: n, movementY: o } }) => {
  const r = y(e).collection("memoEntities");
  for (const i of t)
    r.getOrCreate(i, (s) => Jn({ id: s }));
  r.updateMany(t, (i) => {
    i.ui.x = ht(i.ui.x + n, 4), i.ui.y = ht(i.ui.y + o, 4);
  });
}, Jp = I(oe.moveToMemo), Jk = ({ collections: e }, { payload: { id: t, x: n, y: o } }) => {
  const r = y(e).collection("memoEntities");
  r.getOrCreate(t, (i) => Jn({ id: i })), r.updateOne(t, (i) => {
    i.ui.x = n, i.ui.y = o;
  });
}, la = I(oe.removeMemo), Xk = ({ doc: e, collections: t, lww: n }, { payload: { id: o }, timestamp: r }) => {
  y(t).collection("memoEntities").removeOperator(n, r, o, () => {
    const i = e.memoIds.indexOf(o);
    i !== -1 && e.memoIds.splice(i, 1);
  });
}, Xp = I(oe.changeMemoValue), e2 = ({ collections: e, lww: t }, { payload: { id: n, value: o }, timestamp: r }) => {
  const i = y(e).collection("memoEntities");
  i.getOrCreate(n, (s) => Jn({ id: s })), i.replaceOperator(t, r, n, "value", () => {
    i.updateOne(n, (s) => {
      s.value = o;
    });
  });
}, zr = I(oe.changeMemoColor), t2 = ({ collections: e, lww: t }, { payload: { id: n, color: o }, timestamp: r }) => {
  const i = y(e).collection("memoEntities");
  i.getOrCreate(n, (s) => Jn({ id: s })), i.replaceOperator(t, r, n, "ui.color", () => {
    i.updateOne(n, (s) => {
      s.ui.color = o;
    });
  });
}, ey = I(oe.resizeMemo), n2 = ({ collections: e }, { payload: { id: t, x: n, y: o, width: r, height: i } }) => {
  const s = y(e).collection("memoEntities");
  s.getOrCreate(t, (a) => Jn({ id: a })), s.updateOne(t, (a) => {
    a.ui.x = n, a.ui.y = o, a.ui.width = r, a.ui.height = i;
  });
}, ty = I(oe.changeZIndex), o2 = ({ collections: e }, { payload: { id: t, zIndex: n } }) => {
  const o = y(e).collection("memoEntities");
  o.getOrCreate(t, (r) => Jn({ id: r })), o.updateOne(t, (r) => {
    r.ui.zIndex = n;
  });
}, r2 = {
  [oe.addMemo]: Kk,
  [oe.moveMemo]: Qk,
  [oe.moveToMemo]: Jk,
  [oe.removeMemo]: Xk,
  [oe.changeMemoValue]: e2,
  [oe.changeMemoColor]: t2,
  [oe.resizeMemo]: n2,
  [oe.changeZIndex]: o2
}, i2 = {
  addMemoAction: hu,
  moveMemoAction: xo,
  moveToMemoAction: Jp,
  removeMemoAction: la,
  changeMemoValueAction: Xp,
  changeMemoColorAction: zr,
  resizeMemoAction: ey,
  changeZIndexAction: ty
}, s2 = 20, a2 = (e, { payload: { id: t } }) => {
  e.push(la({ id: t }));
}, l2 = (e, { payload: { id: t } }, { collections: n }) => {
  const o = y(n).collection("memoEntities").selectById(t);
  o && e.push(hu({ id: o.id, ui: na(o.ui, ["x", "y", "zIndex"]) }));
}, c2 = (e, { payload: { id: t } }, { collections: n }) => {
  const o = y(n).collection("memoEntities").selectById(t);
  o && e.push(Xp({ id: t, value: o.value }));
}, u2 = (e, { payload: { id: t } }, { collections: n }) => {
  const o = y(n).collection("memoEntities").selectById(t);
  o && e.push(Jp({
    id: t,
    x: o.ui.x,
    y: o.ui.y
  }));
}, f2 = {
  [oe.addMemo]: a2,
  [oe.removeMemo]: l2,
  [oe.changeMemoValue]: c2,
  [oe.moveToMemo]: u2
}, d2 = (e, t, n) => {
  const o = n.filter((i) => i.type === xo.type);
  if (!o.length)
    return;
  const r = $i(o, (i) => i.payload.ids.join(","));
  for (const [, i] of Object.entries(r)) {
    const { payload: { ids: s } } = xi(i), { x: a, y: l } = i.reduce((c, { payload: { movementX: u, movementY: f } }) => (c.x += u, c.y += f, c), { x: 0, y: 0 });
    Math.abs(a) + Math.abs(l) < s2 || (e.push(xo({
      ids: s,
      movementX: -1 * a,
      movementY: -1 * l
    })), t.push(xo({
      ids: s,
      movementX: a,
      movementY: l
    })));
  }
}, h2 = (e, t, n) => {
  const o = n.filter(({ type: i }) => i === zr.type);
  if (!o.length)
    return;
  const r = $i(o, (i) => i.payload.id);
  for (const [i, s] of Object.entries(r)) {
    const a = xi(s), l = Xo(s);
    e.push(zr({
      id: i,
      color: a.payload.prevColor,
      prevColor: l.payload.color
    })), t.push(zr({
      id: i,
      color: l.payload.color,
      prevColor: a.payload.prevColor
    }));
  }
}, m2 = (e, t, n) => {
  const o = n.filter((i) => i.type === ey.type);
  if (!o.length)
    return;
  const r = $i(o, (i) => i.payload.id);
  for (const [, i] of Object.entries(r)) {
    if (i.length < 2)
      continue;
    const s = xi(i), a = Xo(i);
    e.push(s), t.push(a);
  }
}, p2 = {
  [oe.moveMemo]: d2,
  [oe.changeMemoColor]: h2,
  [oe.resizeMemo]: m2
}, Dt = {
  addRelationship: "relationship.add",
  removeRelationship: "relationship.remove",
  changeRelationshipType: "relationship.changeType"
}, ny = (e) => or({
  id: me(),
  identification: !1,
  relationshipType: Op.ZeroN,
  startRelationshipType: Zl.dash,
  start: {
    tableId: "",
    columnIds: [],
    x: 0,
    y: 0,
    direction: wt.bottom
  },
  end: {
    tableId: "",
    columnIds: [],
    x: 0,
    y: 0,
    direction: wt.bottom
  },
  meta: er()
}, e ?? {}), Mi = I(Dt.addRelationship), y2 = ({ doc: e, collections: t, lww: n }, { payload: { id: o, relationshipType: r, start: i, end: s }, timestamp: a }) => {
  y(t).collection("relationshipEntities").addOne(ny({
    id: o,
    relationshipType: r,
    start: {
      tableId: i.tableId,
      columnIds: i.columnIds
    },
    end: {
      tableId: s.tableId,
      columnIds: s.columnIds
    }
  })).addOperator(n, a, o, () => {
    M(e.relationshipIds)(o) || e.relationshipIds.push(o);
  });
}, Fo = I(Dt.removeRelationship), g2 = ({ doc: e, collections: t, lww: n }, { payload: { id: o }, timestamp: r }) => {
  y(t).collection("relationshipEntities").removeOperator(n, r, o, () => {
    const i = e.relationshipIds.indexOf(o);
    i !== -1 && e.relationshipIds.splice(i, 1);
  });
}, oy = I(Dt.changeRelationshipType), v2 = ({ collections: e, lww: t }, { payload: { id: n, value: o }, timestamp: r }) => {
  const i = y(e).collection("relationshipEntities");
  i.replaceOperator(t, r, n, "relationshipType", () => {
    i.updateOne(n, (s) => {
      s.relationshipType = o;
    });
  });
}, b2 = {
  [Dt.addRelationship]: y2,
  [Dt.removeRelationship]: g2,
  [Dt.changeRelationshipType]: v2
}, I2 = {
  addRelationshipAction: Mi,
  removeRelationshipAction: Fo,
  changeRelationshipTypeAction: oy
}, T2 = (e, { payload: { id: t } }) => {
  e.push(Fo({ id: t }));
}, w2 = (e, { payload: { id: t } }, { collections: n }) => {
  const o = y(n).collection("relationshipEntities").selectById(t);
  o && e.push(Mi({
    id: o.id,
    relationshipType: o.relationshipType,
    start: na(o.start, ["tableId", "columnIds"]),
    end: na(o.end, ["tableId", "columnIds"])
  }));
}, C2 = (e, { payload: { id: t } }, { collections: n }) => {
  const o = y(n).collection("relationshipEntities").selectById(t);
  o && e.push(oy({
    id: t,
    value: o.relationshipType
  }));
}, O2 = {
  [Dt.addRelationship]: T2,
  [Dt.removeRelationship]: w2,
  [Dt.changeRelationshipType]: C2
}, R = {
  resize: "settings.resize",
  changeZoomLevel: "settings.changeZoomLevel",
  streamZoomLevel: "settings.streamZoomLevel",
  scrollTo: "settings.scrollTo",
  streamScrollTo: "settings.streamScrollTo",
  changeShow: "settings.changeShow",
  changeDatabase: "settings.changeDatabase",
  changeCanvasType: "settings.changeCanvasType",
  changeLanguage: "settings.changeLanguage",
  changeTableNameCase: "settings.changeTableNameCase",
  changeColumnNameCase: "settings.changeColumnNameCase",
  changeBracketType: "settings.changeBracketType",
  changeRelationshipDataTypeSync: "settings.changeRelationshipDataTypeSync",
  changeRelationshipOptimization: "settings.changeRelationshipOptimization",
  changeColumnOrder: "settings.changeColumnOrder",
  changeMaxWidthComment: "settings.changeMaxWidthComment",
  changeIgnoreSaveSettings: "settings.changeIgnoreSaveSettings"
}, ry = I(R.resize), mu = I(R.changeZoomLevel), $2 = ({ settings: e }, { payload: { value: t }, tags: n }) => {
  !Ko(n) && A(n, Kn.following) || (e.zoomLevel = Ba(t));
}, Gr = I(R.streamZoomLevel), A2 = ({ settings: e }, { payload: { value: t }, tags: n }) => {
  !Ko(n) && A(n, Kn.following) || (e.zoomLevel = Ba(e.zoomLevel + t));
}, pu = I(R.scrollTo), N2 = ({ settings: e, editor: { viewport: t } }, { payload: { scrollTop: n, scrollLeft: o }, tags: r }) => {
  if (!Ko(r) && A(r, Kn.following))
    return;
  const i = Un(t.height - e.height, 0), s = Un(t.width - e.width, 0);
  e.scrollTop = ht(i(n), 4), e.scrollLeft = ht(s(o), 4);
}, Yr = I(R.streamScrollTo), M2 = ({ settings: e, editor: { viewport: t } }, { payload: { movementX: n, movementY: o }, tags: r }) => {
  if (!Ko(r) && A(r, Kn.following))
    return;
  const i = Un(t.height - e.height, 0), s = Un(t.width - e.width, 0);
  e.scrollTop = ht(i(e.scrollTop + o), 4), e.scrollLeft = ht(s(e.scrollLeft + n), 4);
}, yu = I(R.changeShow), k2 = ({ settings: e }, { payload: { show: t, value: n } }) => {
  e.show = n ? e.show | t : e.show & ~t;
}, D2 = I(R.changeDatabase), L2 = ({ settings: e }, { payload: { value: t } }) => {
  uM(t) && (e.database = t);
}, R2 = I(R.changeCanvasType), _2 = ({ settings: e }, { payload: { value: t }, tags: n }) => {
  !Ko(n) && A(n, Kn.following) || (e.canvasType = t);
}, P2 = I(R.changeLanguage), B2 = ({ settings: e }, { payload: { value: t } }) => {
  dM(t) && (e.language = t);
}, j2 = I(R.changeTableNameCase), U2 = ({ settings: e }, { payload: { value: t } }) => {
  Pp(t) && (e.tableNameCase = t);
}, W2 = I(R.changeColumnNameCase), F2 = ({ settings: e }, { payload: { value: t } }) => {
  Pp(t) && (e.columnNameCase = t);
}, q2 = I(R.changeBracketType), V2 = ({ settings: e }, { payload: { value: t } }) => {
  fM(t) && (e.bracketType = t);
}, H2 = I(R.changeRelationshipDataTypeSync), Z2 = ({ settings: e }, { payload: { value: t } }) => {
  e.relationshipDataTypeSync = t;
}, z2 = I(R.changeRelationshipOptimization), G2 = ({ settings: e }, { payload: { value: t } }) => {
  e.relationshipOptimization = t;
}, Y2 = I(R.changeColumnOrder), K2 = ({ settings: e }, { payload: { value: t, target: n } }) => {
  if (t === n || !Xf(t) || !Xf(n))
    return;
  const o = e.columnOrder.indexOf(t), r = e.columnOrder.indexOf(n);
  o === -1 || r === -1 || (e.columnOrder.splice(o, 1), e.columnOrder.splice(r, 0, t));
}, iy = I(R.changeMaxWidthComment), Q2 = ({ settings: e }, { payload: { value: t } }) => {
  e.maxWidthComment = t === -1 ? t : _p(t);
}, J2 = I(R.changeIgnoreSaveSettings), X2 = ({ settings: e }, { payload: { saveSettingType: t, value: n } }) => {
  e.ignoreSaveSettings = n ? e.ignoreSaveSettings | t : e.ignoreSaveSettings & ~t;
}, eD = {
  [R.changeZoomLevel]: $2,
  [R.streamZoomLevel]: A2,
  [R.scrollTo]: N2,
  [R.streamScrollTo]: M2,
  [R.changeShow]: k2,
  [R.changeDatabase]: L2,
  [R.changeCanvasType]: _2,
  [R.changeLanguage]: B2,
  [R.changeTableNameCase]: U2,
  [R.changeColumnNameCase]: F2,
  [R.changeBracketType]: V2,
  [R.changeRelationshipDataTypeSync]: Z2,
  [R.changeRelationshipOptimization]: G2,
  [R.changeColumnOrder]: K2,
  [R.changeMaxWidthComment]: Q2,
  [R.changeIgnoreSaveSettings]: X2
}, tD = {
  resizeAction: ry,
  changeZoomLevelAction: mu,
  streamZoomLevelAction: Gr,
  scrollToAction: pu,
  streamScrollToAction: Yr,
  changeShowAction: yu,
  changeDatabaseAction: D2,
  changeCanvasTypeAction: R2,
  changeLanguageAction: P2,
  changeTableNameCaseAction: j2,
  changeColumnNameCaseAction: W2,
  changeBracketTypeAction: q2,
  changeRelationshipDataTypeSyncAction: H2,
  changeRelationshipOptimizationAction: z2,
  changeColumnOrderAction: Y2,
  changeMaxWidthCommentAction: iy,
  changeIgnoreSaveSettingsAction: J2
}, nD = 20, oD = (e, t, { settings: n }) => {
  e.push(ry({ width: n.width, height: n.height }));
}, rD = (e, t, { settings: n }) => {
  e.push(pu({
    scrollLeft: n.scrollLeft,
    scrollTop: n.scrollTop
  }));
}, iD = (e, { payload: { show: t, value: n } }) => {
  e.push(yu({ show: t, value: !n }));
}, sD = (e, t, { settings: n }) => {
  e.push(mu({ value: n.zoomLevel }));
}, aD = {
  [R.resize]: oD,
  [R.scrollTo]: rD,
  [R.changeShow]: iD,
  [R.changeZoomLevel]: sD
}, lD = (e, t, n) => {
  const o = n.filter((s) => s.type === Yr.type);
  if (!o.length)
    return;
  const { x: r, y: i } = o.reduce((s, { payload: { movementX: a, movementY: l } }) => (s.x += a, s.y += l, s), { x: 0, y: 0 });
  Math.abs(r) + Math.abs(i) < nD || (e.push(Yr({
    movementX: -1 * r,
    movementY: -1 * i
  })), t.push(Yr({
    movementX: r,
    movementY: i
  })));
}, cD = (e, t, n) => {
  const o = n.filter((i) => i.type === Gr.type);
  if (!o.length)
    return;
  const r = o.reduce((i, { payload: { value: s } }) => i + s, 0);
  e.push(Gr({ value: -1 * r })), t.push(Gr({ value: r }));
}, uD = {
  [R.streamScrollTo]: lD,
  [R.streamZoomLevel]: cD
}, Q = {
  addTable: "table.add",
  moveTable: "table.move",
  moveToTable: "table.moveTo",
  removeTable: "table.remove",
  changeTableName: "table.changeName",
  changeTableComment: "table.changeComment",
  changeTableColor: "table.changeColor",
  changeZIndex: "table.changeZIndex",
  sortTable: "table.sort"
    };
//FLEXYGO CHANGES
//function calcTableWidths()
function gu(e, { settings: { show: t, maxWidthComment: n }, collections: o }) {
    const s = y(o).collection("tableColumnEntities").selectByIds(e.columnIds), a = hD(s, t, n);
    return { ...a, width: measures.table.width };
}
const fD = [
  {
    key: z.columnComment,
    width: He
  },
  {
    key: z.columnDataType,
    width: He
  },
  {
    key: z.columnDefault,
    width: He
  },
  {
    key: z.columnNotNull,
    width: Mp
  },
  {
    key: z.columnAutoIncrement,
    width: Dp
  },
  {
    key: z.columnUnique,
    width: kp
  }
];
function dD(e) {
  return fD.reduce((t, { key: n, width: o }) => A(e, n) ? t + o + Dn : t, Np + Dn + He + Dn + Ap);
}
function hD(e, t, n) {
  const o = {
    width: 0,
    name: 0,
    comment: 0,
    dataType: 0,
    default: 0,
    notNull: 0,
    autoIncrement: 0,
    unique: 0
  };
  for (const r of e) {
    if (o.name < r.ui.widthName && (o.name = r.ui.widthName), A(t, z.columnComment) && o.comment < r.ui.widthComment) {
      const i = n === -1 ? r.ui.widthComment : n < r.ui.widthComment ? n : r.ui.widthComment;
      o.comment = i;
    }
    A(t, z.columnDataType) && o.dataType < r.ui.widthDataType && (o.dataType = r.ui.widthDataType), A(t, z.columnDefault) && o.default < r.ui.widthDefault && (o.default = r.ui.widthDefault);
  }
  return A(t, z.columnNotNull) && (o.notNull = Mp), A(t, z.columnAutoIncrement) && (o.autoIncrement = Dp), A(t, z.columnUnique) && (o.unique = kp), o.width = Object.entries(o).reduce((r, [i, s]) => i === "width" || s === 0 ? r : r + s + Dn, Np + Dn + Ap), o;
}
function vu(e) {
  return oa + ra + tM + e.columnIds.length * oM + ra + oa;
}
function mD({ doc: { tableIds: e }, collections: t }, { toWidth: n }) {
  const o = y(t).collection("tableEntities").selectByIds(e), r = y(t).collection("tableColumnEntities");
  for (const i of o) {
    i.ui.widthName = ye(n(i.name)), i.ui.widthComment = ye(n(i.comment));
    const s = r.selectByIds(i.columnIds);
    for (const a of s)
      a.ui.widthName = ye(n(a.name)), a.ui.widthDataType = ye(n(a.dataType)), a.ui.widthDefault = ye(n(a.default)), a.ui.widthComment = ye(n(a.comment));
  }
}
const yt = (e) => or({
  id: me(),
  name: "",
  comment: "",
  columnIds: [],
  seqColumnIds: [],
  ui: {
    x: 200,
    y: 100,
    zIndex: 2,
    widthName: He,
    widthComment: He,
    color: ""
  },
  meta: er()
}, e ?? {}), bu = I(Q.addTable), pD = ({ doc: e, collections: t, lww: n }, { payload: { id: o, ui: r }, timestamp: i }) => {
  y(t).collection("tableEntities").addOne(yt({ id: o, ui: r })).addOperator(n, i, o, () => {
    M(e.tableIds)(o) || e.tableIds.push(o);
  });
}, $o = I(Q.moveTable), yD = ({ collections: e }, { payload: { ids: t, movementX: n, movementY: o } }) => {
  const r = y(e).collection("tableEntities");
  for (const i of t)
    r.getOrCreate(i, (s) => yt({ id: s }));
  r.updateMany(t, (i) => {
    i.ui.x = ht(i.ui.x + n, 4), i.ui.y = ht(i.ui.y + o, 4);
  });
}, Iu = I(Q.moveToTable), gD = ({ collections: e }, { payload: { id: t, x: n, y: o } }) => {
  const r = y(e).collection("tableEntities");
  r.getOrCreate(t, (i) => yt({ id: i })), r.updateOne(t, (i) => {
    i.ui.x = n, i.ui.y = o;
  });
}, ca = I(Q.removeTable), vD = ({ doc: e, collections: t, lww: n }, { payload: { id: o }, timestamp: r }) => {
  y(t).collection("tableEntities").removeOperator(n, r, o, () => {
    const i = e.tableIds.indexOf(o);
    i !== -1 && e.tableIds.splice(i, 1);
  });
}, Tu = I(Q.changeTableName), bD = ({ collections: e, lww: t }, { payload: { id: n, value: o }, timestamp: r }, { toWidth: i }) => {
  const s = y(e).collection("tableEntities");
  s.getOrCreate(n, (a) => yt({ id: a })), s.replaceOperator(t, r, n, "name", () => {
    s.updateOne(n, (a) => {
      a.name = o, a.ui.widthName = ye(i(o));
    });
  });
}, wu = I(Q.changeTableComment), ID = ({ collections: e, lww: t }, { payload: { id: n, value: o }, timestamp: r }, { toWidth: i }) => {
  const s = y(e).collection("tableEntities");
  s.getOrCreate(n, (a) => yt({ id: a })), s.replaceOperator(t, r, n, "comment", () => {
    s.updateOne(n, (a) => {
      a.comment = o, a.ui.widthComment = ye(i(o));
    });
  });
}, Kr = I(Q.changeTableColor), TD = ({ collections: e, lww: t }, { payload: { id: n, color: o }, timestamp: r }) => {
  const i = y(e).collection("tableEntities");
  i.getOrCreate(n, (s) => yt({ id: s })), i.replaceOperator(t, r, n, "ui.color", () => {
    i.updateOne(n, (s) => {
      s.ui.color = o;
    });
  });
}, sy = I(Q.changeZIndex), wD = ({ collections: e }, { payload: { id: t, zIndex: n } }) => {
  const o = y(e).collection("tableEntities");
  o.getOrCreate(t, (r) => yt({ id: r })), o.updateOne(t, (r) => {
    r.ui.zIndex = n;
  });
}, Cu = I(Q.sortTable), CD = (e) => {
  const { doc: t, settings: n, collections: o } = e, r = n.width, i = y(o).collection("tableEntities").selectByIds(t.tableIds), s = 80;
  i.sort((u, f) => u.columnIds.length - f.columnIds.length);
  let a = 50, l = 50, c = 50;
  i.forEach((u) => {
    const f = gu(u, e).width + s, d = vu(u) + s;
    a + f > r && (l += c, c = 0, a = 50), c < d && (c = d), u.ui.y = l, u.ui.x = a, a += f;
  });
}, OD = {
  [Q.addTable]: pD,
  [Q.moveTable]: yD,
  [Q.moveToTable]: gD,
  [Q.removeTable]: vD,
  [Q.changeTableName]: bD,
  [Q.changeTableComment]: ID,
  [Q.changeTableColor]: TD,
  [Q.changeZIndex]: wD,
  [Q.sortTable]: CD
}, SD = {
  addTableAction: bu,
  moveTableAction: $o,
  moveToTableAction: Iu,
  removeTableAction: ca,
  changeTableNameAction: Tu,
  changeTableCommentAction: wu,
  changeTableColorAction: Kr,
  changeZIndexAction: sy,
  sortTableAction: Cu
}, ED = 20, xD = (e, { payload: { id: t } }) => {
  e.push(ca({ id: t }));
}, $D = (e, { payload: { id: t } }, { collections: n }) => {
  const o = y(n).collection("tableEntities").selectById(t);
  o && e.push(bu({ id: o.id, ui: na(o.ui, ["x", "y", "zIndex"]) }));
}, AD = (e, { payload: { id: t } }, { collections: n }) => {
  const o = y(n).collection("tableEntities").selectById(t);
  o && e.push(Tu({ id: t, value: o.name }));
}, ND = (e, { payload: { id: t } }, { collections: n }) => {
  const o = y(n).collection("tableEntities").selectById(t);
  o && e.push(wu({ id: t, value: o.comment }));
}, MD = (e, { payload: { id: t } }, { collections: n }) => {
  const o = y(n).collection("tableEntities").selectById(t);
  o && e.push(Iu({
    id: t,
    x: o.ui.x,
    y: o.ui.y
  }));
}, kD = () => {
}, DD = {
  [Q.addTable]: xD,
  [Q.removeTable]: $D,
  [Q.changeTableName]: AD,
  [Q.changeTableComment]: ND,
  [Q.moveToTable]: MD,
  [Q.sortTable]: kD
}, LD = (e, t, n) => {
  const o = n.filter((i) => i.type === $o.type);
  if (!o.length)
    return;
  const r = $i(o, (i) => i.payload.ids.join(","));
  for (const [, i] of Object.entries(r)) {
    const { payload: { ids: s } } = xi(i), { x: a, y: l } = i.reduce((c, { payload: { movementX: u, movementY: f } }) => (c.x += u, c.y += f, c), { x: 0, y: 0 });
    Math.abs(a) + Math.abs(l) < ED || (e.push($o({
      ids: s,
      movementX: -1 * a,
      movementY: -1 * l
    })), t.push($o({
      ids: s,
      movementX: a,
      movementY: l
    })));
  }
}, RD = (e, t, n) => {
  const o = n.filter(({ type: i }) => i === Kr.type);
  if (!o.length)
    return;
  const r = $i(o, (i) => i.payload.id);
  for (const [i, s] of Object.entries(r)) {
    const a = xi(s), l = Xo(s);
    e.push(Kr({
      id: i,
      color: a.payload.prevColor,
      prevColor: l.payload.color
    })), t.push(Kr({
      id: i,
      color: l.payload.color,
      prevColor: a.payload.prevColor
    }));
  }
}, _D = {
  [Q.moveTable]: LD,
  [Q.changeTableColor]: RD
}, F = {
  addColumn: "column.add",
  removeColumn: "column.remove",
  changeColumnName: "column.changeName",
  changeColumnComment: "column.changeComment",
  changeColumnDataType: "column.changeDataType",
  changeColumnDefault: "column.changeDefault",
  changeColumnAutoIncrement: "column.changeAutoIncrement",
  changeColumnPrimaryKey: "column.changePrimaryKey",
  changeColumnUnique: "column.changeUnique",
  changeColumnNotNull: "column.changeNotNull",
  moveColumn: "column.move"
}, xt = (e) => or({
  id: me(),
  tableId: "",
  name: "",
  comment: "",
  dataType: "",
  default: "",
  options: 0,
  ui: {
    keys: 0,
    widthName: He,
    widthComment: He,
    widthDataType: He,
    widthDefault: He
  },
  meta: er()
}, e ?? {}), Et = I(F.addColumn), PD = ({ collections: e, lww: t }, { payload: { id: n, tableId: o }, timestamp: r }) => {
  const i = y(e).collection("tableEntities"), s = i.getOrCreate(o, (a) => yt({ id: a }));
  y(e).collection("tableColumnEntities").addOne(xt({ id: n, tableId: o })).addOperator(t, r, n, () => {
    M(s.columnIds)(n) || i.updateOne(o, (a) => {
      Qp(a.columnIds, a.seqColumnIds, n);
    });
  });
}, Ao = I(F.removeColumn), BD = ({ collections: e, lww: t }, { payload: { id: n, tableId: o }, timestamp: r }) => {
  const i = y(e).collection("tableEntities"), s = i.getOrCreate(o, (a) => yt({ id: a }));
  y(e).collection("tableColumnEntities").removeOperator(t, r, n, () => {
    const a = s.columnIds.indexOf(n);
    a !== -1 && i.updateOne(o, (l) => {
      l.columnIds.splice(a, 1);
    });
  });
}, Lt = I(F.changeColumnName), jD = ({ collections: e, lww: t }, { payload: { id: n, value: o }, timestamp: r }, { toWidth: i }) => {
  const s = y(e).collection("tableColumnEntities");
  s.getOrCreate(n, (a) => xt({ id: a })), s.replaceOperator(t, r, n, "name", () => {
    s.updateOne(n, (a) => {
      a.name = o, a.ui.widthName = ye(i(o));
    });
  });
}, Rt = I(F.changeColumnComment), UD = ({ collections: e, lww: t }, { payload: { id: n, value: o }, timestamp: r }, { toWidth: i }) => {
  const s = y(e).collection("tableColumnEntities");
  s.getOrCreate(n, (a) => xt({ id: a })), s.replaceOperator(t, r, n, "comment", () => {
    s.updateOne(n, (a) => {
      a.comment = o, a.ui.widthComment = ye(i(o));
    });
  });
}, _t = I(F.changeColumnDataType), WD = ({ collections: e, lww: t }, { payload: { id: n, value: o }, timestamp: r }, { toWidth: i }) => {
  const s = y(e).collection("tableColumnEntities");
  s.getOrCreate(n, (a) => xt({ id: a })), s.replaceOperator(t, r, n, "dataType", () => {
    s.updateOne(n, (a) => {
      a.dataType = o, a.ui.widthDataType = ye(i(o));
    });
  });
}, Pt = I(F.changeColumnDefault), FD = ({ collections: e, lww: t }, { payload: { id: n, value: o }, timestamp: r }, { toWidth: i }) => {
  const s = y(e).collection("tableColumnEntities");
  s.getOrCreate(n, (a) => xt({ id: a })), s.replaceOperator(t, r, n, "default", () => {
    s.updateOne(n, (a) => {
      a.default = o, a.ui.widthDefault = ye(i(o));
    });
  });
}, Ln = I(F.changeColumnAutoIncrement), qD = ({ collections: e, lww: t }, { payload: { id: n, value: o }, timestamp: r }) => {
  const i = y(e).collection("tableColumnEntities");
  i.getOrCreate(n, (s) => xt({ id: s })), i.replaceOperator(t, r, n, "options(autoIncrement)", () => {
    i.updateOne(n, (s) => {
      s.options = o ? s.options | U.autoIncrement : s.options & ~U.autoIncrement;
    });
  });
}, Xn = I(F.changeColumnPrimaryKey), VD = ({ collections: e, lww: t }, { payload: { id: n, value: o }, timestamp: r }) => {
  const i = y(e).collection("tableColumnEntities");
  i.getOrCreate(n, (s) => xt({ id: s })), i.replaceOperator(t, r, n, "options(primaryKey)", () => {
    i.updateOne(n, (s) => {
      s.options = o ? s.options | U.primaryKey : s.options & ~U.primaryKey, s.ui.keys = o ? s.ui.keys | Re.primaryKey : s.ui.keys & ~Re.primaryKey;
    });
  });
}, Rn = I(F.changeColumnUnique), HD = ({ collections: e, lww: t }, { payload: { id: n, value: o }, timestamp: r }) => {
  const i = y(e).collection("tableColumnEntities");
  i.getOrCreate(n, (s) => xt({ id: s })), i.replaceOperator(t, r, n, "options(unique)", () => {
    i.updateOne(n, (s) => {
      s.options = o ? s.options | U.unique : s.options & ~U.unique;
    });
  });
}, Bt = I(F.changeColumnNotNull), ZD = ({ collections: e, lww: t }, { payload: { id: n, value: o }, timestamp: r }) => {
  const i = y(e).collection("tableColumnEntities");
  i.getOrCreate(n, (s) => xt({ id: s })), i.replaceOperator(t, r, n, "options(notNull)", () => {
    i.updateOne(n, (s) => {
      s.options = o ? s.options | U.notNull : s.options & ~U.notNull;
    });
  });
}, ua = I(F.moveColumn), zD = ({ collections: e }, { payload: { id: t, tableId: n, targetId: o } }) => {
  if (t === o)
    return;
  const r = y(e).collection("tableEntities"), i = r.getOrCreate(n, (l) => yt({ id: l })), s = i.columnIds.indexOf(t);
  if (s === -1)
    return;
  const a = i.columnIds.indexOf(o);
  a !== -1 && r.updateOne(n, (l) => {
    l.columnIds.splice(s, 1), l.columnIds.splice(a, 0, t);
    const c = l.seqColumnIds.indexOf(t), u = l.seqColumnIds.indexOf(o);
    c !== -1 && u !== -1 && (l.seqColumnIds.splice(c, 1), l.seqColumnIds.splice(u, 0, t));
  });
}, GD = {
  [F.addColumn]: PD,
  [F.removeColumn]: BD,
  [F.changeColumnName]: jD,
  [F.changeColumnComment]: UD,
  [F.changeColumnDataType]: WD,
  [F.changeColumnDefault]: FD,
  [F.changeColumnAutoIncrement]: qD,
  [F.changeColumnPrimaryKey]: VD,
  [F.changeColumnUnique]: HD,
  [F.changeColumnNotNull]: ZD,
  [F.moveColumn]: zD
}, YD = {
  addColumnAction: Et,
  removeColumnAction: Ao,
  changeColumnNameAction: Lt,
  changeColumnCommentAction: Rt,
  changeColumnDataTypeAction: _t,
  changeColumnDefaultAction: Pt,
  changeColumnAutoIncrementAction: Ln,
  changeColumnPrimaryKeyAction: Xn,
  changeColumnUniqueAction: Rn,
  changeColumnNotNullAction: Bt,
  moveColumnAction: ua
}, KD = (e, { payload: { id: t, tableId: n } }) => {
  e.push(Ao({ id: t, tableId: n }));
}, QD = (e, { payload: { id: t, tableId: n } }) => {
  e.push(Et({ id: t, tableId: n }));
}, JD = (e, { payload: { id: t, tableId: n } }, { collections: o }) => {
  const r = y(o).collection("tableColumnEntities").selectById(t);
  r && e.push(Lt({ id: t, tableId: n, value: r.name }));
}, XD = (e, { payload: { id: t, tableId: n } }, { collections: o }) => {
  const r = y(o).collection("tableColumnEntities").selectById(t);
  r && e.push(_t({ id: t, tableId: n, value: r.dataType }));
}, eL = (e, { payload: { id: t, tableId: n } }, { collections: o }) => {
  const r = y(o).collection("tableColumnEntities").selectById(t);
  r && e.push(Pt({ id: t, tableId: n, value: r.default }));
}, tL = (e, { payload: { id: t, tableId: n } }, { collections: o }) => {
  const r = y(o).collection("tableColumnEntities").selectById(t);
  r && e.push(Rt({ id: t, tableId: n, value: r.comment }));
}, nL = (e, { payload: { id: t, tableId: n, value: o } }, { collections: r }) => {
  y(r).collection("tableColumnEntities").selectById(t) && e.push(Ln({
    id: t,
    tableId: n,
    value: !o
  }));
}, oL = (e, { payload: { id: t, tableId: n, value: o } }, { collections: r }) => {
  y(r).collection("tableColumnEntities").selectById(t) && e.push(Bt({
    id: t,
    tableId: n,
    value: !o
  }));
}, rL = (e, { payload: { id: t, tableId: n, value: o } }, { collections: r }) => {
  y(r).collection("tableColumnEntities").selectById(t) && e.push(Xn({
    id: t,
    tableId: n,
    value: !o
  }));
}, iL = (e, { payload: { id: t, tableId: n, value: o } }, { collections: r }) => {
  y(r).collection("tableColumnEntities").selectById(t) && e.push(Rn({
    id: t,
    tableId: n,
    value: !o
  }));
}, sL = (e, { payload: { id: t, tableId: n, targetId: o } }, { collections: r }) => {
  const i = y(r).collection("tableEntities").selectById(n);
  if (!i)
    return;
  const s = i.columnIds.indexOf(t);
  if (s === -1)
    return;
  const a = i.columnIds.indexOf(o);
  if (a === -1)
    return;
  const l = s < a ? s + 1 : s - 1, c = i.columnIds[l];
  e.push(ua({
    id: t,
    tableId: n,
    targetId: c
  }));
}, aL = {
  [F.addColumn]: KD,
  [F.removeColumn]: QD,
  [F.changeColumnName]: JD,
  [F.changeColumnDataType]: XD,
  [F.changeColumnDefault]: eL,
  [F.changeColumnComment]: tL,
  [F.changeColumnAutoIncrement]: nL,
  [F.changeColumnNotNull]: oL,
  [F.changeColumnPrimaryKey]: rL,
  [F.changeColumnUnique]: iL,
  [F.moveColumn]: sL
}, ay = {
  ...DD,
  ...aL,
  ...O2,
  ...f2,
  ...aD,
  ...dk,
  ...Bk,
  ...Yk
}, ci = {
  ..._D,
  ...p2,
  ...uD
};
function lL(e, t, n) {
  const o = [], r = [];
  for (const i of n) {
    const s = ay[i.type];
    s && (s(o, i, e.state), r.push(Pa(i)));
  }
  for (const i of Object.keys(ci))
    ci[i](o, r, n);
  !o.length || !r.length || t.push({
    undo: (i) => {
      const s = Date.now();
      i(o.map(ad(s)));
    },
    redo: (i) => {
      const s = Date.now();
      i(r.map(ad(s)));
    }
  });
}
function ad(e) {
  return (t) => ({
    ...Pa(t),
    timestamp: e
  });
}
const mj = (e, t) => (n) => {
  Uw(lL, e, t, n);
}, dL = {
  columnName: "columnName",
  columnDataType: "columnDataType",
  columnNotNull: "columnNotNull",
  columnUnique: "columnUnique",
  columnAutoIncrement: "columnAutoIncrement",
  columnDefault: "columnDefault",
  columnComment: "columnComment"
}, pj = M(Object.values(dL));
function hL(e, t) {
  return t.filter((n) => {
    switch (n) {
      case _.columnName:
        return !0;
      case _.columnDataType:
        return A(e, z.columnDataType);
      case _.columnDefault:
        return A(e, z.columnDefault);
      case _.columnComment:
        return A(e, z.columnComment);
      case _.columnAutoIncrement:
        return A(e, z.columnAutoIncrement);
      case _.columnUnique:
        return A(e, z.columnUnique);
      case _.columnNotNull:
        return A(e, z.columnNotNull);
      default:
        return !1;
    }
  });
}
const mL = () => function* ({ settings: e, doc: { tableIds: t, memoIds: n }, collections: o }) {
  const r = y(o).collection("tableEntities").selectByIds(t), i = y(o).collection("memoEntities").selectByIds(n), s = jp(e, r, i), a = me();
  yield Wa(), yield nr({ [a]: ke.table }), yield bu({
    id: a,
    ui: {
      ...s,
      zIndex: ja(r, i)
    }
  }), yield Fa({ tableId: a });
}, cy = (e) => function* ({ doc: { relationshipIds: t, indexIds: n }, editor: { selectedMap: o }, collections: r }) {
  const i = y(r).collection("relationshipEntities").selectByIds(t), s = y(r).collection("indexEntities").selectByIds(n);
  if (e) {
    const f = i.filter(({ start: h, end: p }) => h.tableId === e || p.tableId === e), d = s.filter(({ tableId: h }) => h === e);
    for (const { id: h } of d)
      yield li({ id: h });
    for (const { id: h } of f)
      yield Fo({ id: h });
    yield ca({ id: e });
    return;
  }
  const a = Object.entries(o).filter(([, f]) => f === ke.table).map(([f]) => f), l = M(a), c = i.filter(({ start: f, end: d }) => l(f.tableId) || l(d.tableId)), u = s.filter(({ tableId: f }) => l(f));
  for (const { id: f } of u)
    yield li({ id: f });
  for (const { id: f } of c)
    yield Fo({ id: f });
  for (const f of a)
    yield ca({ id: f });
}, pL = (e, t) => function* ({ doc: { tableIds: n, memoIds: o }, collections: r, editor: { drawRelationship: i } }) {
  const s = y(r).collection("tableEntities"), a = s.selectByIds(n), l = y(r).collection("memoEntities").selectByIds(o);
  if (t || (yield Wa()), yield nr({ [e]: ke.table }), yield sy({ id: e, zIndex: ja(a, l) }), yield Fa({ tableId: e }), !!i)
    if (i.start) {
      const c = s.selectById(i.start.tableId), u = s.selectById(e);
      if (!c || !u)
        return;
      const f = y(r).collection("tableColumnEntities").selectByIds(c.columnIds).filter(({ options: h }) => A(h, U.primaryKey));
      if (!f.length)
        return;
      const d = f.map(() => me());
      for (let h = 0; h < f.length; h++) {
        const p = f[h], v = {
          id: d[h],
          tableId: u.id
        };
        yield [
          Et(v),
          Bt({
            ...v,
            value: !0
          }),
          Lt({
            ...v,
            value: p.name
          }),
          _t({
            ...v,
            value: p.dataType
          }),
          Pt({
            ...v,
            value: p.default
          }),
          Rt({
            ...v,
            value: p.comment
          })
        ];
      }
      yield Mi({
        id: me(),
        relationshipType: i.relationshipType,
        start: {
          tableId: c.id,
          columnIds: f.map(({ id: h }) => h)
        },
        end: {
          tableId: u.id,
          columnIds: d
        }
      }), yield iu();
    } else
      yield Cy(e);
}, yL = (e) => function* ({ editor: { selectedMap: t, focusTable: n }, settings: { show: o, columnOrder: r }, collections: i }) {
  const s = n && !qn(n.focusType), a = Object.entries(t).filter(([, p]) => p === ke.table).map(([p]) => p).filter((p) => s ? p !== (n == null ? void 0 : n.tableId) : !0);
  for (const p of a)
    for (const g of e) {
      const T = {
        id: me(),
        tableId: p
      };
      yield [
        Et(T),
        Lt({
          ...T,
          value: g.name
        }),
        _t({
          ...T,
          value: g.dataType
        }),
        Pt({
          ...T,
          value: g.default
        }),
        Rt({
          ...T,
          value: g.comment
        }),
        Bt({
          ...T,
          value: A(g.options, U.notNull)
        }),
        Rn({
          ...T,
          value: A(g.options, U.unique)
        }),
        Ln({
          ...T,
          value: A(g.options, U.autoIncrement)
        })
      ];
    }
  if (!n || !s)
    return;
  const l = y(i).collection("tableEntities").selectById(n.tableId);
  if (!l)
    return;
  const c = l.columnIds.filter(M(n.selectColumnIds));
  if (c.length === 0)
    return;
  const u = l.columnIds.slice(l.columnIds.indexOf(c[c.length - 1]) + 1), f = [...c, ...u], d = hL(o, r);
  yield ru();
  for (let p = 0; p < f.length; p++) {
    const g = f[p], v = e[p];
    if (!v)
      break;
    const T = {
      id: g,
      tableId: l.id
    };
    yield [
      ...d.map((S) => {
        switch (S) {
          case _.columnName:
            return Lt({
              ...T,
              value: v.name
            });
          case _.columnDataType:
            return _t({
              ...T,
              value: v.dataType
            });
          case _.columnDefault:
            return Pt({
              ...T,
              value: v.default
            });
          case _.columnComment:
            return Rt({
              ...T,
              value: v.comment
            });
          case _.columnAutoIncrement:
            return Ln({
              ...T,
              value: A(v.options, U.autoIncrement)
            });
          case _.columnUnique:
            return Rn({
              ...T,
              value: A(v.options, U.unique)
            });
          case _.columnNotNull:
            return Bt({
              ...T,
              value: A(v.options, U.notNull)
            });
          default:
            return null;
        }
      }).filter(Boolean),
      cn({
        tableId: l.id,
        columnId: g,
        focusType: n.focusType,
        $mod: !0,
        shiftKey: !1
      })
    ];
  }
  const h = e.slice(f.length);
  for (const p of h) {
    const g = me(), v = {
      id: g,
      tableId: l.id
    };
    yield [
      Et(v),
      ...d.map((T) => {
        switch (T) {
          case _.columnName:
            return Lt({
              ...v,
              value: p.name
            });
          case _.columnDataType:
            return _t({
              ...v,
              value: p.dataType
            });
          case _.columnDefault:
            return Pt({
              ...v,
              value: p.default
            });
          case _.columnComment:
            return Rt({
              ...v,
              value: p.comment
            });
          case _.columnAutoIncrement:
            return Ln({
              ...v,
              value: A(p.options, U.autoIncrement)
            });
          case _.columnUnique:
            return Rn({
              ...v,
              value: A(p.options, U.unique)
            });
          case _.columnNotNull:
            return Bt({
              ...v,
              value: A(p.options, U.notNull)
            });
          default:
            return null;
        }
      }).filter(Boolean),
      cn({
        tableId: l.id,
        columnId: g,
        focusType: n.focusType,
        $mod: !0,
        shiftKey: !1
      })
    ];
  }
}, gL = {
  addTableAction$: mL,
  removeTableAction$: cy,
  selectTableAction$: pL,
  pasteTableAction$: yL
};
function uy(e, t, n, o = []) {
  const { doc: { relationshipIds: r }, collections: i } = t, s = e.pop();
  return s && (o.some(({ id: a }) => a === s.id) || (o.push(s), y(i).collection("relationshipEntities").selectByIds(r).forEach(({ start: a, end: l }) => {
    const c = a.columnIds.indexOf(s.id);
    if (c !== -1) {
      const u = l.columnIds[c];
      e.push({
        id: u,
        tableId: l.tableId,
        value: n.value
      });
    } else {
      const u = l.columnIds.indexOf(s.id);
      if (u !== -1) {
        const f = a.columnIds[u];
        e.push({
          id: f,
          tableId: a.tableId,
          value: n.value
        });
      }
    }
  })), uy(e, t, n, o)), o;
}
const vL = M([
  j.columnNotNull,
  j.columnUnique,
  j.columnAutoIncrement
]), bL = M([
  j.columnName,
  j.columnDataType,
  j.columnDefault,
  j.columnComment
]), fy = (e) => function* ({ editor: { selectedMap: t } }) {
  if (e) {
    const r = me();
    yield Et({
      id: r,
      tableId: e
    }), yield cn({
      tableId: e,
      columnId: r,
      focusType: j.columnName,
      $mod: !1,
      shiftKey: !1
    });
    return;
  }
  const n = Object.entries(t).filter(([, r]) => r === ke.table).map(([r]) => ({ tableId: r, id: me() }));
  for (const r of n)
    yield Et(r);
  const o = Xo(n);
  o && (yield cn({
    tableId: o.tableId,
    columnId: o.id,
    focusType: j.columnName,
    $mod: !1,
    shiftKey: !1
  }));
}, dy = (e, t) => function* (n) {
  const { doc: { relationshipIds: o, indexIds: r }, editor: { focusTable: i }, collections: s } = n;
  if (i != null && i.columnId) {
    const u = TM(n, t);
    u ? yield cn({
      tableId: i.tableId,
      columnId: u,
      focusType: i.focusType,
      $mod: !1,
      shiftKey: !1
    }) : yield Fa({
      tableId: i.tableId,
      focusType: j.tableName
    });
  }
  const a = M(t), l = y(s).collection("relationshipEntities").selectByIds(o).filter(({ start: u, end: f }) => u.tableId === e && u.columnIds.some(a) || f.tableId === e && f.columnIds.some(a)), c = y(s).collection("indexEntities").selectByIds(r).filter((u) => u.tableId === e && y(s).collection("indexColumnEntities").selectByIds(u.indexColumnIds).map(({ columnId: f }) => f).some(a));
  for (const { id: u } of c)
    yield li({ id: u });
  for (const { id: u } of l)
    yield Fo({ id: u });
  for (const u of t)
    yield Ao({
      id: u,
      tableId: e
    });
}, IL = (e, t, n) => function* ({ collections: o }) {
  if (!vL(e))
    return;
  const r = y(o).collection("tableColumnEntities").selectById(n);
  if (r)
    switch (e) {
      case j.columnNotNull:
        yield Bt({
          id: n,
          tableId: t,
          value: !A(r.options, U.notNull)
        });
        break;
      case j.columnUnique:
        yield Rn({
          id: n,
          tableId: t,
          value: !A(r.options, U.unique)
        });
        break;
      case j.columnAutoIncrement:
        yield Ln({
          id: n,
          tableId: t,
          value: !A(r.options, U.autoIncrement)
        });
        break;
    }
}, hy = (e) => function* (t) {
  const { settings: { relationshipDataTypeSync: n } } = t;
  let o = [e];
  n && (o = uy([e], t, e)), yield o.map(_t);
}, TL = (e, t, n, o) => function* ({ collections: r }) {
  if (!bL(e) || !y(r).collection("tableColumnEntities").selectById(n))
    return;
  const s = {
    id: n,
    tableId: t,
    value: o
  };
  switch (e) {
    case j.columnName:
      yield Lt(s);
      break;
    case j.columnDataType:
      yield hy(s);
      break;
    case j.columnDefault:
      yield Pt(s);
      break;
    case j.columnComment:
      yield Rt(s);
      break;
  }
}, wL = (e, t) => function* ({ collections: n }) {
  const o = y(n).collection("tableColumnEntities").selectById(t);
  if (!o)
    return;
  const r = A(o.options, U.primaryKey);
  yield Xn({
    tableId: e,
    id: t,
    value: !r
  });
}, CL = {
  addColumnAction$: fy,
  removeColumnAction$: dy,
  toggleColumnValueAction$: IL,
  changeColumnDataTypeAction$: hy,
  changeColumnValueAction$: TL,
  changeColumnPrimaryKeyAction$: wL
};
function OL(e) {
  return ia + sa + e.ui.width + sa + ia;
}
function SL(e) {
  return ia + sa + Lp + e.ui.height + sa + ia;
}
const EL = [
  "BIGINT",
  "BINARY",
  "BIT",
  "BLOB",
  "BOOL",
  "BOOLEAN",
  "CHAR",
  "DATE",
  "DATETIME",
  "DEC",
  "DECIMAL",
  "DOUBLE PRECISION",
  "DOUBLE",
  "ENUM",
  "FIXED",
  "FLOAT",
  "GEOMETRY",
  "GEOMETRYCOLLECTION",
  "INT",
  "INTEGER",
  "JSON",
  "LINESTRING",
  "LONGBLOB",
  "LONGTEXT",
  "MEDIUMBLOB",
  "MEDIUMINT",
  "MEDIUMTEXT",
  "MULTILINESTRING",
  "MULTIPOINT",
  "MULTIPOLYGON",
  "NUMERIC",
  "POINT",
  "POLYGON",
  "REAL",
  "SET",
  "SMALLINT",
  "TEXT",
  "TIME",
  "TIMESTAMP",
  "TINYBLOB",
  "TINYINT",
  "TINYTEXT",
  "VARBINARY",
  "VARCHAR",
  "YEAR"
], xL = [
  "BIGINT",
  "BINARY",
  "BIT",
  "CHAR",
  "DATE",
  "DATETIME",
  "DATETIME2",
  "DATETIMEOFFSET",
  "DECIMAL",
  "FLOAT",
  "GEOGRAPHY",
  "GEOMETRY",
  "IMAGE",
  "INT",
  "MONEY",
  "NCHAR",
  "NTEXT",
  "NUMERIC",
  "NVARCHAR",
  "REAL",
  "SMALLDATETIME",
  "SMALLINT",
  "SMALLMONEY",
  "SQL_VARIANT",
  "TEXT",
  "TIME",
  "TINYINT",
  "UNIQUEIDENTIFIER",
  "VARBINARY",
  "VARCHAR",
  "XML"
], $L = [
  "BIGINT",
  "BINARY",
  "BIT",
  "BLOB",
  "BOOL",
  "BOOLEAN",
  "CHAR",
  "DATE",
  "DATETIME",
  "DEC",
  "DECIMAL",
  "DOUBLE PRECISION",
  "DOUBLE",
  "ENUM",
  "FLOAT",
  "GEOMETRY",
  "GEOMETRYCOLLECTION",
  "INT",
  "INTEGER",
  "JSON",
  "LINESTRING",
  "LONGBLOB",
  "LONGTEXT",
  "MEDIUMBLOB",
  "MEDIUMINT",
  "MEDIUMTEXT",
  "MULTILINESTRING",
  "MULTIPOINT",
  "MULTIPOLYGON",
  "NUMERIC",
  "POINT",
  "POLYGON",
  "SET",
  "SMALLINT",
  "TEXT",
  "TIME",
  "TIMESTAMP",
  "TINYBLOB",
  "TINYINT",
  "TINYTEXT",
  "VARBINARY",
  "VARCHAR",
  "YEAR"
], AL = [
  "BFILE",
  "BINARY_DOUBLE",
  "BINARY_FLOAT",
  "BLOB",
  "CHAR",
  "CLOB",
  "DATE",
  "DATETIME",
  "LONG RAW",
  "LONG",
  "NCHAR",
  "NCLOB",
  "NUMBER",
  "NVARCHAR2",
  "RAW",
  "TIMESTAMP WITH LOCAL TIME ZONE",
  "TIMESTAMP WITH TIME ZONE",
  "TIMESTAMP",
  "UriType",
  "VARCHAR",
  "VARCHAR2",
  "XMLType"
], NL = [
  "BIGINT",
  "BIGSERIAL",
  "BIT VARYING",
  "BIT",
  "BOOL",
  "BOOLEAN",
  "BOX",
  "BYTEA",
  "CHAR",
  "CHARACTER VARYING",
  "CHARACTER",
  "CIDR",
  "CIRCLE",
  "DATE",
  "DECIMAL",
  "DOUBLE PRECISION",
  "FLOAT4",
  "FLOAT8",
  "INET",
  "INT",
  "INT2",
  "INT4",
  "INT8",
  "INTEGER",
  "INTERVAL",
  "JSON",
  "JSONB",
  "LINE",
  "LSEG",
  "MACADDR",
  "MACADDR8",
  "MONEY",
  "NUMERIC",
  "PATH",
  "PG_LSN",
  "POINT",
  "POLYGON",
  "REAL",
  "SERIAL",
  "SERIAL2",
  "SERIAL4",
  "SERIAL8",
  "SMALLINT",
  "SMALLSERIAL",
  "TEXT",
  "TIME WITH",
  "TIME",
  "TIMESTAMP WITH",
  "TIMESTAMP",
  "TIMESTAMPTZ",
  "TIMETZ",
  "TSQUERY",
  "TSVECTOR",
  "TXID_SNAPSHOT",
  "UUID",
  "VARBIT",
  "VARCHAR",
  "XML"
], ML = [
  "BLOB",
  "INTEGER",
  "NUMERIC",
  "REAL",
  "TEXT"
], ve = {
  string: "string",
  leftParent: "leftParent",
  rightParent: "rightParent",
  leftBracket: "leftBracket",
  rightBracket: "rightBracket",
  comma: "comma",
  period: "period",
  equal: "equal",
  semicolon: "semicolon"
}, Se = {
  doubleQuote: '"',
  singleQuote: "'",
  backtick: "`",
  whiteSpace: /\s/,
  string: /\S/,
  breakString: /;|,|\(|\)|\[|\./,
  equal: "=",
  period: ".",
  comma: ",",
  semicolon: ";",
  leftParent: "(",
  rightParent: ")",
  leftBracket: "[",
  rightBracket: "]"
}, rt = (e) => (t) => e === t, hl = (e) => (t) => e.test(t), de = {
  doubleQuote: rt(Se.doubleQuote),
  singleQuote: rt(Se.singleQuote),
  backtick: rt(Se.backtick),
  whiteSpace: hl(Se.whiteSpace),
  string: hl(Se.string),
  breakString: hl(Se.breakString),
  equal: rt(Se.equal),
  period: rt(Se.period),
  comma: rt(Se.comma),
  semicolon: rt(Se.semicolon),
  leftParent: rt(Se.leftParent),
  rightParent: rt(Se.rightParent),
  leftBracket: rt(Se.leftBracket),
  rightBracket: rt(Se.rightBracket)
};
function kL(e) {
  const t = [];
  let n = 0;
  const o = () => n < e.length;
  for (; o(); ) {
    let r = e[n];
    if (de.whiteSpace(r)) {
      for (; o() && de.whiteSpace(r); )
        r = e[++n];
      continue;
    }
    if (de.leftParent(r)) {
      t.push({ type: ve.leftParent, value: r }), n++;
      continue;
    }
    if (de.rightParent(r)) {
      t.push({ type: ve.rightParent, value: r }), n++;
      continue;
    }
    if (de.leftBracket(r)) {
      t.push({ type: ve.leftBracket, value: r }), n++;
      continue;
    }
    if (de.rightBracket(r)) {
      t.push({ type: ve.rightBracket, value: r }), n++;
      continue;
    }
    if (de.comma(r)) {
      t.push({ type: ve.comma, value: r }), n++;
      continue;
    }
    if (de.period(r)) {
      t.push({ type: ve.period, value: r }), n++;
      continue;
    }
    if (de.equal(r)) {
      t.push({ type: ve.equal, value: r }), n++;
      continue;
    }
    if (de.semicolon(r)) {
      t.push({ type: ve.semicolon, value: r }), n++;
      continue;
    }
    if (de.doubleQuote(r)) {
      let i = "";
      for (r = e[++n]; o() && !de.doubleQuote(r); )
        i += r, r = e[++n];
      t.push({ type: ve.string, value: i }), n++;
      continue;
    }
    if (de.singleQuote(r)) {
      let i = "";
      for (r = e[++n]; o() && !de.singleQuote(r); )
        i += r, r = e[++n];
      t.push({ type: ve.string, value: i }), n++;
      continue;
    }
    if (de.backtick(r)) {
      let i = "";
      for (r = e[++n]; o() && !de.backtick(r); )
        i += r, r = e[++n];
      t.push({ type: ve.string, value: i }), n++;
      continue;
    }
    if (de.string(r)) {
      let i = "";
      for (; o() && de.string(r) && !de.breakString(r); )
        i += r, r = e[++n];
      t.push({ type: ve.string, value: i });
      continue;
    }
    n++;
  }
  return t;
}
const ki = (e) => (t) => (n) => t[n] ? t[n].type === e : !1, Y = (e) => {
  const t = e.toUpperCase();
  return (n) => (o) => n[o] ? n[o].value.toUpperCase() === t : !1;
}, pn = ki(ve.string), Di = ki(ve.period), my = ki(ve.comma), rr = ki(ve.leftParent), Li = ki(ve.rightParent), Ri = Y("CREATE"), qa = Y("ALTER"), DL = Y("DROP"), LL = Y("USE"), RL = Y("RENAME"), _L = Y("DELETE"), PL = Y("SELECT"), yn = Y("TABLE"), Va = Y("INDEX"), _i = Y("UNIQUE"), Ou = Y("ADD"), Su = Y("PRIMARY"), Pi = Y("KEY"), eo = Y("CONSTRAINT"), Eu = Y("FOREIGN"), py = Y("NOT"), BL = Y("NULL"), jL = Y("DEFAULT"), yy = Y("COMMENT"), UL = Y("REFERENCES"), gy = Y("ASC"), vy = Y("DESC"), WL = Y("ON"), FL = Y("AUTO_INCREMENT"), qL = Y("AUTOINCREMENT"), VL = Y("IF"), HL = Y("EXISTS"), ZL = (e) => {
  const t = FL(e), n = qL(e);
  return (o) => t(o) || n(o);
}, Bi = (e) => {
  const t = Ri(e), n = qa(e), o = DL(e), r = LL(e), i = RL(e), s = _L(e), a = PL(e);
  return (l) => t(l) || n(l) || o(l) || r(l) || i(l) || s(l) || a(l);
}, zL = (e) => {
  const t = Ri(e), n = yn(e), o = VL(e), r = py(e), i = HL(e);
  return (s) => t(s) && n(s + 1) && o(s + 2) && r(s + 3) && i(s + 4);
}, GL = (e) => {
  const t = Ri(e), n = yn(e);
  return (o) => t(o) && n(o + 1);
}, by = (e) => {
  const t = Ri(e), n = Va(e), o = _i(e);
  return (r) => t(r) && o(r + 1) && n(r + 2);
}, YL = (e) => {
  const t = Ri(e), n = Va(e), o = by(e);
  return (r) => t(r) && n(r + 1) || o(r);
}, KL = (e) => {
  const t = qa(e), n = yn(e), o = Ou(e), r = Su(e), i = Pi(e), s = eo(e);
  return (a) => t(a) && n(a + 1) && o(a + 3) && r(a + 4) && i(a + 5) || t(a) && n(a + 1) && o(a + 3) && s(a + 4) && r(a + 6) && i(a + 7);
}, QL = (e) => {
  const t = qa(e), n = yn(e), o = Ou(e), r = Eu(e), i = Pi(e), s = eo(e);
  return (a) => t(a) && n(a + 1) && o(a + 3) && r(a + 4) && i(a + 5) || t(a) && n(a + 1) && o(a + 3) && s(a + 4) && r(a + 6) && i(a + 7);
}, JL = (e) => {
  const t = qa(e), n = yn(e), o = Ou(e), r = _i(e), i = eo(e);
  return (s) => t(s) && n(s + 1) && o(s + 3) && r(s + 4) || t(s) && n(s + 1) && o(s + 3) && i(s + 4) && r(s + 6);
}, XL = Array.from(new Set([
  ...EL,
  ...xL,
  ...$L,
  ...AL,
  ...NL,
  ...ML
].map((e) => e.toUpperCase()))), eR = (e) => {
  const t = pn(e);
  return (n) => {
    const o = e[n];
    return o ? t(n) && XL.includes(o.value.toUpperCase()) : !1;
  };
}, Tt = {
  createTable: "create.table",
  createIndex: "create.index",
  alterTableAddUnique: "alter.table.add.unique",
  alterTableAddPrimaryKey: "alter.table.add.primaryKey",
  alterTableAddForeignKey: "alter.table.add.foreignKey"
}, _n = {
  asc: "ASC",
  desc: "DESC"
};
function tR(e, t) {
  const n = Bi(e), o = pn(e), r = rr(e), i = Di(e), s = yy(e), a = zL(e), l = () => t.value < e.length, c = {
    type: Tt.createTable,
    name: "",
    comment: "",
    columns: [],
    indexes: [],
    foreignKeys: []
  };
  for (t.value += a(t.value) ? 5 : 2; l() && !n(t.value); ) {
    let u = e[t.value];
    if (r(t.value)) {
      t.value++;
      const { columns: f, indexes: d, foreignKeys: h } = nR(e, t);
      c.columns = f, c.indexes = d, c.foreignKeys = h;
      continue;
    }
    if (o(t.value) && !c.name) {
      c.name = u.value, u = e[++t.value], i(t.value) && (u = e[++t.value], o(t.value) && (c.name = u.value, t.value++));
      continue;
    }
    if (s(t.value)) {
      u = e[++t.value], o(t.value) && (c.comment = u.value, t.value++);
      continue;
    }
    t.value++;
  }
  return c;
}
function nR(e, t) {
  const n = pn(e), o = rr(e), r = Li(e), i = my(e), s = eo(e), a = Va(e), l = Su(e), c = Eu(e), u = ZL(e), f = _i(e), d = BL(e), h = py(e), p = jL(e), g = yy(e), v = vy(e), T = gy(e), S = Pi(e), k = eR(e), L = () => t.value < e.length, ae = [], gt = [], vt = [], tt = [], je = [];
  let Z = {
    name: "",
    dataType: "",
    default: "",
    comment: "",
    primaryKey: !1,
    autoIncrement: !1,
    unique: !1,
    nullable: !0
  };
  for (; L(); ) {
    let P = e[t.value];
    if (n(t.value) && !Z.name && !s(t.value) && !l(t.value) && !c(t.value) && !f(t.value) && !a(t.value) && !S(t.value)) {
      Z.name = P.value, t.value++;
      continue;
    }
    if (o(t.value)) {
      for (P = e[++t.value]; L() && !r(t.value); )
        P = e[++t.value];
      t.value++;
      continue;
    }
    if (s(t.value)) {
      P = e[++t.value], n(t.value) && t.value++;
      continue;
    }
    if (l(t.value)) {
      if (P = e[++t.value], S(t.value))
        if (P = e[++t.value], o(t.value)) {
          for (P = e[++t.value]; L() && !r(t.value); )
            n(t.value) && tt.push(P.value.toUpperCase()), P = e[++t.value];
          t.value++;
        } else
          Z.primaryKey = !0;
      continue;
    }
    if (c(t.value)) {
      const nt = Iy(e, t);
      nt && vt.push(nt);
      continue;
    }
    if (a(t.value) || S(t.value)) {
      if (P = e[++t.value], n(t.value)) {
        const nt = P.value, Vt = [];
        if (P = e[++t.value], o(t.value)) {
          P = e[++t.value];
          let $t = {
            name: "",
            sort: _n.asc
          };
          for (; L() && !r(t.value); )
            n(t.value) && !v(t.value) && !T(t.value) && ($t.name = P.value), v(t.value) && ($t.sort = _n.desc), i(t.value) && (Vt.push($t), $t = {
              name: "",
              sort: _n.asc
            }), P = e[++t.value];
          !Vt.includes($t) && $t.name !== "" && Vt.push($t), Vt.length && gt.push({
            name: nt,
            unique: !1,
            columns: Vt
          }), t.value++;
        }
      }
      continue;
    }
    if (f(t.value)) {
      if (P = e[++t.value], S(t.value) && (P = e[++t.value]), n(t.value) && (P = e[++t.value]), o(t.value)) {
        for (P = e[++t.value]; L() && !r(t.value); )
          n(t.value) && je.push(P.value.toUpperCase()), P = e[++t.value];
        t.value++;
      } else
        Z.unique = !0;
      continue;
    }
    if (h(t.value)) {
      P = e[++t.value], d(t.value) && (Z.nullable = !1, t.value++);
      continue;
    }
    if (p(t.value)) {
      P = e[++t.value], n(t.value) && (Z.default = P.value, t.value++);
      continue;
    }
    if (g(t.value)) {
      P = e[++t.value], n(t.value) && (Z.comment = P.value, t.value++);
      continue;
    }
    if (u(t.value)) {
      Z.autoIncrement = !0, t.value++;
      continue;
    }
    if (k(t.value)) {
      let nt = P.value;
      if (P = e[++t.value], o(t.value)) {
        for (nt += "(", P = e[++t.value]; L() && !r(t.value); )
          nt += P.value, P = e[++t.value];
        nt += ")", t.value++;
      }
      Z.dataType = nt;
      continue;
    }
    if (i(t.value)) {
      (Z.name || Z.dataType) && ae.push(Z), Z = {
        name: "",
        dataType: "",
        default: "",
        comment: "",
        primaryKey: !1,
        autoIncrement: !1,
        unique: !1,
        nullable: !0
      }, t.value++;
      continue;
    }
    if (r(t.value)) {
      t.value++;
      break;
    }
    t.value++;
  }
  return !ae.includes(Z) && (Z.name || Z.dataType) && ae.push(Z), ae.forEach((P) => {
    tt.includes(P.name.toUpperCase()) && (P.primaryKey = !0), je.includes(P.name.toUpperCase()) && (P.unique = !0);
  }), {
    columns: ae,
    indexes: gt,
    foreignKeys: vt
  };
}
function Iy(e, t) {
  const n = pn(e), o = rr(e), r = Li(e), i = UL(e), s = Di(e), a = Pi(e), l = () => t.value < e.length, c = {
    columnNames: [],
    refTableName: "",
    refColumnNames: []
  };
  let u = e[++t.value];
  if (a(t.value)) {
    if (u = e[++t.value], o(t.value)) {
      for (u = e[++t.value]; l() && !r(t.value); )
        n(t.value) && c.columnNames.push(u.value), u = e[++t.value];
      u = e[++t.value];
    }
    if (i(t.value) && (u = e[++t.value], n(t.value) && (c.refTableName = u.value, u = e[++t.value], s(t.value) && (u = e[++t.value], n(t.value) && (c.refTableName = u.value, u = e[++t.value])), o(t.value)))) {
      for (u = e[++t.value]; l() && !r(t.value); )
        n(t.value) && c.refColumnNames.push(u.value), u = e[++t.value];
      u = e[++t.value];
    }
    if (c.columnNames.length && c.columnNames.length === c.refColumnNames.length)
      return c;
  }
  return null;
}
function oR(e, t) {
  const n = Bi(e), o = pn(e), r = eo(e), i = Di(e), s = yn(e), a = Eu(e), l = () => t.value < e.length, c = {
    type: Tt.alterTableAddForeignKey,
    name: "",
    columnNames: [],
    refTableName: "",
    refColumnNames: []
  };
  for (t.value++; l() && !n(t.value); ) {
    let u = e[t.value];
    if (s(t.value)) {
      u = e[++t.value], o(t.value) && (c.name = u.value, u = e[++t.value], i(t.value) && (u = e[++t.value], o(t.value) && (c.name = u.value, t.value++)));
      continue;
    }
    if (r(t.value)) {
      u = e[++t.value], o(t.value) && t.value++;
      continue;
    }
    if (a(t.value)) {
      const f = Iy(e, t);
      f && (c.columnNames = f.columnNames, c.refTableName = f.refTableName, c.refColumnNames = f.refColumnNames);
      continue;
    }
    t.value++;
  }
  return c;
}
function rR(e, t) {
  const n = Bi(e), o = pn(e), r = rr(e), i = Li(e), s = eo(e), a = Su(e), l = Di(e), c = Pi(e), u = yn(e), f = () => t.value < e.length, d = {
    type: Tt.alterTableAddPrimaryKey,
    name: "",
    columnNames: []
  };
  for (t.value++; f() && !n(t.value); ) {
    let h = e[t.value];
    if (u(t.value)) {
      h = e[++t.value], o(t.value) && (d.name = h.value, h = e[++t.value], l(t.value) && (h = e[++t.value], o(t.value) && (d.name = h.value, t.value++)));
      continue;
    }
    if (s(t.value)) {
      h = e[++t.value], o(t.value) && t.value++;
      continue;
    }
    if (a(t.value)) {
      if (h = e[++t.value], c(t.value) && (h = e[++t.value], r(t.value))) {
        for (h = e[++t.value]; f() && !i(t.value); )
          o(t.value) && d.columnNames.push(h.value), h = e[++t.value];
        h = e[++t.value];
      }
      continue;
    }
    t.value++;
  }
  return d;
}
function iR(e, t) {
  const n = Bi(e), o = pn(e), r = eo(e), i = Di(e), s = yn(e), a = _i(e), l = rr(e), c = Li(e), u = () => t.value < e.length, f = {
    type: Tt.alterTableAddUnique,
    name: "",
    columnNames: []
  };
  for (t.value++; u() && !n(t.value); ) {
    let d = e[t.value];
    if (s(t.value)) {
      d = e[++t.value], o(t.value) && (f.name = d.value, d = e[++t.value], i(t.value) && (d = e[++t.value], o(t.value) && (f.name = d.value, t.value++)));
      continue;
    }
    if (r(t.value)) {
      d = e[++t.value], o(t.value) && t.value++;
      continue;
    }
    if (a(t.value)) {
      if (d = e[++t.value], l(t.value)) {
        for (d = e[++t.value]; u() && !c(t.value); )
          o(t.value) && f.columnNames.push(d.value), d = e[++t.value];
        t.value++;
      }
      continue;
    }
    t.value++;
  }
  return f;
}
function sR(e, t) {
  const n = Bi(e), o = _i(e), r = pn(e), i = rr(e), s = Li(e), a = my(e), l = Va(e), c = WL(e), u = vy(e), f = gy(e), d = by(e), h = () => t.value < e.length, p = {
    type: Tt.createIndex,
    name: "",
    unique: o(t.value + 1),
    tableName: "",
    columns: []
  };
  for (t.value += d(t.value) ? 2 : 1; h() && !n(t.value); ) {
    let g = e[t.value];
    if (l(t.value)) {
      g = e[++t.value], r(t.value) && (p.name = g.value);
      continue;
    }
    if (c(t.value)) {
      if (g = e[++t.value], r(t.value) && (p.tableName = g.value, g = e[++t.value], i(t.value))) {
        g = e[++t.value];
        let v = {
          name: "",
          sort: _n.asc
        };
        for (; h() && !s(t.value); )
          r(t.value) && !u(t.value) && !f(t.value) && (v.name = g.value), u(t.value) && (v.sort = _n.desc), a(t.value) && (p.columns.push(v), v = {
            name: "",
            sort: _n.asc
          }), g = e[++t.value];
        !p.columns.includes(v) && v.name !== "" && p.columns.push(v), t.value++;
      }
      continue;
    }
    t.value++;
  }
  return p;
}
function aR(e) {
  const t = [], n = { value: 0 }, o = () => n.value < e.length, r = GL(e), i = YL(e), s = KL(e), a = QL(e), l = JL(e);
  for (; o(); ) {
    if (r(n.value)) {
      t.push(tR(e, n));
      continue;
    }
    if (i(n.value)) {
      t.push(sR(e, n));
      continue;
    }
    if (s(n.value)) {
      t.push(rR(e, n));
      continue;
    }
    if (a(n.value)) {
      t.push(oR(e, n));
      continue;
    }
    if (l(n.value)) {
      t.push(iR(e, n));
      continue;
    }
    n.value++;
  }
  return t;
}
const lR = (e) => aR(kL(e));
function qe(e, t) {
  for (const n of e)
    if (n.name.toUpperCase() === t.toUpperCase())
      return n;
  return null;
}
function cR(e, t, n) {
  const o = Vn({}), r = lR(e), i = uR(r), s = fR(i), a = Gl(s.length * 100);
  return o.settings.width = a, o.settings.height = a, s.forEach((l) => dR(o, l, t)), hR(o, s), mR(o, s), wc(n ? n(o) : o);
}
function uR(e) {
  const t = {
    tables: [],
    indexes: [],
    primaryKeys: [],
    foreignKeys: [],
    uniques: []
  };
  for (const n of e)
    switch (n.type) {
      case Tt.createTable:
        n.name && t.tables.push(n);
        break;
      case Tt.createIndex:
        n.tableName && n.columns.length && t.indexes.push(n);
        break;
      case Tt.alterTableAddPrimaryKey:
        n.name && n.columnNames.length && t.primaryKeys.push(n);
        break;
      case Tt.alterTableAddForeignKey:
        n.name && n.columnNames.length && n.refTableName && n.refColumnNames.length && n.columnNames.length === n.refColumnNames.length && t.foreignKeys.push(n);
        break;
      case Tt.alterTableAddUnique:
        n.name && n.columnNames.length && t.uniques.push(n);
        break;
    }
  return t;
}
function fR({ tables: e, indexes: t, primaryKeys: n, foreignKeys: o, uniques: r }) {
  return t.forEach((i) => {
    const s = qe(e, i.tableName);
    s && s.indexes.push({
      name: i.name,
      unique: i.unique,
      columns: i.columns
    });
  }), n.forEach((i) => {
    const s = qe(e, i.name);
    s && i.columnNames.forEach((a) => {
      const l = qe(s.columns, a);
      l && (l.primaryKey = !0);
    });
  }), r.forEach((i) => {
    const s = qe(e, i.name);
    s && i.columnNames.forEach((a) => {
      const l = qe(s.columns, a);
      l && (l.unique = !0);
    });
  }), o.forEach((i) => {
    const s = qe(e, i.name);
    s && s.foreignKeys.push({
      columnNames: i.columnNames,
      refTableName: i.refTableName,
      refColumnNames: i.refColumnNames
    });
  }), e;
}
function dR({ doc: e, collections: t }, n, { toWidth: o }) {
  const r = yt({
    name: n.name,
    comment: n.comment,
    ui: {
      widthName: ye(o(n.name)),
      widthComment: ye(o(n.comment))
    }
  });
  n.columns.forEach((i) => {
    const s = xt({
      tableId: r.id,
      name: i.name,
      comment: i.comment,
      dataType: i.dataType,
      default: i.default,
      options: (i.autoIncrement ? U.autoIncrement : 0) | (i.primaryKey ? U.primaryKey : 0) | (i.unique ? U.unique : 0) | (i.nullable ? 0 : U.notNull),
      ui: {
        widthName: ye(o(i.name)),
        widthComment: ye(o(i.comment)),
        widthDataType: ye(o(i.dataType)),
        widthDefault: ye(o(i.default)),
        keys: i.primaryKey ? Re.primaryKey : 0
      }
    });
    r.columnIds.push(s.id), r.seqColumnIds.push(s.id), y(t).collection("tableColumnEntities").setOne(s);
  }), e.tableIds.push(r.id), y(t).collection("tableEntities").setOne(r);
}
function hR({ doc: e, collections: t }, n) {
  const o = y(t).collection("tableEntities").selectByIds(e.tableIds), r = y(t).collection("tableColumnEntities");
  n.forEach((i) => {
    if (!i.foreignKeys.length)
      return;
    const s = qe(o, i.name);
    if (!s)
      return;
    const a = r.selectByIds(s.columnIds);
    i.foreignKeys.forEach((l) => {
      const c = qe(o, l.refTableName);
      if (!c)
        return;
      const u = r.selectByIds(c.columnIds), f = [], d = [];
      l.refColumnNames.forEach((p) => {
        const g = qe(u, p);
        g && f.push(g);
      }), l.columnNames.forEach((p) => {
        const g = qe(a, p);
        g && (d.push(g), A(g.ui.keys, Re.primaryKey) ? g.ui.keys |= Re.foreignKey : g.ui.keys = Re.foreignKey);
      });
      const h = ny({
        identification: !d.some((p) => !(A(p.ui.keys, Re.primaryKey) && A(p.ui.keys, Re.foreignKey))),
        relationshipType: Op.ZeroN,
        start: {
          tableId: c.id,
          columnIds: f.map((p) => p.id)
        },
        end: {
          tableId: s.id,
          columnIds: d.map((p) => p.id)
        }
      });
      e.relationshipIds.push(h.id), y(t).collection("relationshipEntities").setOne(h);
    });
  });
}
function mR({ doc: e, collections: t }, n) {
  const o = y(t).collection("tableEntities").selectByIds(e.tableIds);
  n.forEach((r) => {
    r.indexes.forEach((i) => {
      const s = qe(o, r.name);
      if (!s)
        return;
      const a = y(t).collection("tableColumnEntities").selectByIds(s.columnIds), l = [], c = Qn({
        name: i.name,
        tableId: s.id,
        unique: i.unique
      });
      i.columns.forEach((u) => {
        const f = qe(a, u.name);
        if (!f)
          return;
        const d = cu({
          indexId: c.id,
          columnId: f.id,
          orderType: u.sort === _n.asc ? Eo.ASC : Eo.DESC
        });
        l.push(d);
      }), l.length !== 0 && (l.forEach((u) => {
        c.indexColumnIds.push(u.id), c.seqIndexColumnIds.push(u.id), y(t).collection("indexColumnEntities").setOne(u);
      }), e.indexIds.push(c.id), y(t).collection("indexEntities").setOne(c));
    });
  });
}
const Zt = 15;
function Ty(e) {
  return Object.entries(e).reduce((t, [n, o]) => (o === ke.table ? t.tableIds.push(n) : o === ke.memo && t.memoIds.push(n), t), { tableIds: [], memoIds: [] });
}
const wy = (e) => function* () {
  yield ou(), yield ln({ value: e });
}, pR = (e) => function* () {
  yield Hp(), yield Uo({ value: e });
}, yR = (e, t) => function* ({ editor: { selectedMap: n }, settings: { zoomLevel: o } }) {
  const { tableIds: r, memoIds: i } = Ty(n), s = e / o, a = t / o;
  r.length && (yield $o({
    ids: r,
    movementX: s,
    movementY: a
  })), i.length && (yield xo({
    ids: i,
    movementX: s,
    movementY: a
  }));
}, gR = () => function* () {
  yield cy(), yield ly();
}, vR = (e) => function* (t) {
  const { doc: { tableIds: n, memoIds: o }, collections: r } = t, i = {
    ...y(r).collection("tableEntities").selectByIds(n).reduce((s, a) => {
      const l = gu(a, t).width, c = vu(a), u = a.ui.x + l / 2 - Zt, f = a.ui.y + c / 2 - Zt;
      return Qf(e, {
        x: u,
        y: f,
        w: Zt,
        h: Zt
      }) && (s[a.id] = ke.table), s;
    }, {}),
    ...y(r).collection("memoEntities").selectByIds(o).reduce((s, a) => {
      const l = OL(a), c = SL(a), u = a.ui.x + l / 2 - Zt, f = a.ui.y + c / 2 - Zt;
      return Qf(e, {
        x: u,
        y: f,
        w: Zt,
        h: Zt
      }) && (s[a.id] = ke.memo), s;
    }, {})
  };
  yield Ha(), Tp(i) || (yield nr(i));
}, Ha = () => function* () {
  yield Wa(), yield ru();
}, bR = (e, t) => function* (n) {
  const { editor: { focusTable: o } } = n;
  o && (e === lt.Tab && !t && (qn(o.focusType) && nu(n) && !Ni(n) || !qn(o.focusType) && eu(n) && tu(n)) ? yield fy(o.tableId) : yield Zp({ moveKey: e, shiftKey: t }));
}, IR = (e) => function* ({ editor: t }) {
  var n;
  ((n = t.drawRelationship) == null ? void 0 : n.relationshipType) === e ? yield iu() : yield zp({ relationshipType: e });
}, Cy = (e) => function* ({ collections: t }) {
  const n = y(t).collection("tableEntities").selectById(e);
  if (!n)
    return;
  if (!y(t).collection("tableColumnEntities").selectByIds(n.columnIds).some((r) => A(r.options, U.primaryKey))) {
    const r = me();
    yield Et({
      tableId: e,
      id: r
    }), yield Xn({
      tableId: e,
      id: r,
      value: !0
    }), yield cn({
      tableId: e,
      columnId: r,
      focusType: j.columnName,
      $mod: !1,
      shiftKey: !1
    });
  }
  yield Gp({ tableId: e });
}, TR = (e) => function* ({ editor: { selectedMap: t }, collections: n }) {
  const { tableIds: o, memoIds: r } = Ty(t), i = y(n).collection("tableEntities").selectByIds(o), s = y(n).collection("memoEntities").selectByIds(r);
  yield i.map((a) => Kr({ id: a.id, color: e, prevColor: a.ui.color })), yield s.map((a) => zr({ id: a.id, color: e, prevColor: a.ui.color }));
}, wR = (e) => function* ({ settings: t }, n) {
  yield wy(cR(e, n, (o) => (o.settings = {
    ...o.settings,
    ...yN(Pa(t), [
      "width",
      "height",
      "scrollTop",
      "scrollLeft",
      "zoomLevel"
    ])
  }, o))), yield Cu();
}, CR = (e) => function* ({ editor: { focusTable: t } }) {
  !t || !t.columnId || (yield su({
    tableId: t.tableId,
    columnIds: e ? [...t.selectColumnIds] : [t.columnId]
  }));
}, OR = (e, t) => function* ({ editor: { draggableColumn: n }, collections: o }) {
  if (!n || n.columnIds.length === 0)
    return;
  const { tableId: r, columnIds: i } = n, s = y(o).collection("tableEntities"), a = s.selectById(r);
  if (!a)
    return;
  if (t === r) {
    const f = a.columnIds.indexOf(i[0]);
    if (f === -1)
      return;
    const d = a.columnIds.indexOf(e);
    if (d === -1)
      return;
    const h = i.map((p) => ua({ tableId: r, id: p, targetId: e }));
    f < d && h.reverse(), yield h;
    return;
  }
  if (!s.selectById(t))
    return;
  const c = y(o).collection("tableColumnEntities").selectByIds(i);
  if (c.length === 0)
    return;
  yield dy(r, i);
  const u = c.map(() => me());
  for (let f = 0; f < c.length; f++) {
    const d = c[f], h = u[f], p = {
      id: h,
      tableId: t
    };
    yield [
      Et(p),
      Lt({
        ...p,
        value: d.name
      }),
      _t({
        ...p,
        value: d.dataType
      }),
      Pt({
        ...p,
        value: d.default
      }),
      Rt({
        ...p,
        value: d.comment
      }),
      Xn({
        ...p,
        value: A(d.options, U.primaryKey)
      }),
      Bt({
        ...p,
        value: A(d.options, U.notNull)
      }),
      Rn({
        ...p,
        value: A(d.options, U.unique)
      }),
      Ln({
        ...p,
        value: A(d.options, U.autoIncrement)
      }),
      ua({
        ...p,
        targetId: e
      }),
      cn({
        tableId: t,
        columnId: h,
        focusType: j.columnName,
        $mod: !0,
        shiftKey: !1
      })
    ];
  }
  yield su({
    tableId: t,
    columnIds: u
  });
}, SR = {
  loadJsonAction$: wy,
  initialLoadJsonAction$: pR,
  moveAllAction$: yR,
  removeSelectedAction$: gR,
  dragSelectAction$: vR,
  unselectAllAction$: Ha,
  focusMoveTableAction$: bR,
  drawStartRelationshipAction$: IR,
  drawStartAddRelationshipAction$: Cy,
  changeColorAllAction$: TR,
  loadSchemaSQLAction$: wR,
  dragstartColumnAction$: CR,
  dragoverColumnAction$: OR
}, ER = (e) => function* () {
  yield au({
    id: me(),
    tableId: e
  });
}, xR = (e) => function* ({ collections: t }) {
  const n = y(t).collection("indexEntities").selectById(e);
  n && (yield lu({
    id: e,
    tableId: n.tableId,
    value: !n.unique
  }));
}, $R = {
  addIndexAction$: ER,
  changeIndexUniqueAction$: xR
}, AR = (e, t) => function* ({ collections: n }) {
  const o = y(n).collection("indexEntities").selectById(e);
  if (!o)
    return;
  const r = y(n).collection("indexColumnEntities").selectByIds(o.seqIndexColumnIds).find((i) => i.columnId === t);
  r ? yield aa({
    id: r.id,
    indexId: e,
    tableId: o.tableId,
    columnId: t
  }) : yield aa({
    id: me(),
    indexId: e,
    tableId: o.tableId,
    columnId: t
  });
}, NR = (e, t) => function* ({ collections: n }) {
  const o = y(n).collection("indexEntities").selectById(e);
  if (!o)
    return;
  const r = y(n).collection("indexColumnEntities").selectByIds(o.indexColumnIds).filter((i) => i.columnId === t);
  for (const i of r)
    yield uu({
      id: i.id,
      indexId: e,
      tableId: o.tableId
    });
}, MR = (e) => function* ({ collections: t }) {
  const n = y(t).collection("indexColumnEntities").selectById(e);
  n && (yield du({
    id: e,
    indexId: n.indexId,
    columnId: n.columnId,
    value: n.orderType === Eo.ASC ? Eo.DESC : Eo.ASC
  }));
}, kR = (e, t) => function* ({ collections: n }) {
  if (e === t)
    return;
  const o = y(n).collection("indexColumnEntities").selectById(e);
  if (!o)
    return;
  const r = y(n).collection("indexEntities").selectById(o.indexId);
  r && (yield fu({
    id: e,
    indexId: o.indexId,
    tableId: r.tableId,
    targetId: t
  }));
}, DR = {
  addIndexColumnAction$: AR,
  removeIndexColumnAction$: NR,
  changeIndexColumnOrderTypeAction$: MR,
  moveIndexColumnAction$: kR
}, LR = {};
function Oy({ editor: { viewport: e }, settings: { scrollLeft: t, scrollTop: n, zoomLevel: o, width: r, height: i } }, s) {
  const a = zl(r, i, o), l = zl(r, i, s), c = (a.w - l.w) / 2, u = (a.h - l.h) / 2, f = r / 2, d = i / 2, h = t * -1 + e.width / 2, p = n * -1 + e.height / 2, g = (f - h) / f, v = (d - p) / d, T = ht(-1 * c * g, 4), S = ht(-1 * u * v, 4);
  return { movementX: T, movementY: S };
}
const RR = (e) => function* (t) {
  const { settings: { scrollLeft: n, scrollTop: o } } = t, r = Ba(e), { movementX: i, movementY: s } = Oy(t, r);
  yield mu({ value: e }), yield pu({
    scrollLeft: n + i,
    scrollTop: o + s
  });
}, _R = (e) => function* (t) {
  const { settings: { zoomLevel: n } } = t, o = Ba(n + e), { movementX: r, movementY: i } = Oy(t, o);
  yield Gr({ value: e }), yield Yr({
    movementX: r,
    movementY: i
  });
}, PR = {
  changeZoomLevelAction$: RR,
  streamZoomLevelAction$: _R
}, yj = Object.freeze({
  ...ck,
  ...SR,
  ...Dk,
  ...$R,
  ...Vk,
  ...DR,
  ...i2,
  ...I2,
  ...LR,
  ...tD,
  ...PR,
  ...SD,
  ...gL,
  ...YD,
  ...CL
}), Sy = [
  // table
  "table.add",
  "table.move",
  "table.moveTo",
  "table.remove",
  "table.changeName",
  "table.changeComment",
  "table.changeColor",
  "table.sort",
  // column
  "column.add",
  "column.remove",
  "column.changeName",
  "column.changeComment",
  "column.changeDataType",
  "column.changeDefault",
  "column.changeAutoIncrement",
  "column.changePrimaryKey",
  "column.changeUnique",
  "column.changeNotNull",
  "column.move",
  // relationship
  "relationship.add",
  "relationship.remove",
  "relationship.changeType",
  // index
  "index.add",
  "index.remove",
  "index.changeName",
  "index.changeUnique",
  // indexColumn
  "indexColumn.add",
  "indexColumn.remove",
  "indexColumn.move",
  "indexColumn.changeOrderType",
  // memo
  "memo.add",
  "memo.move",
  "memo.moveTo",
  "memo.remove",
  "memo.changeValue",
  "memo.changeColor",
  "memo.resize",
  // settings
  "settings.resize",
  "settings.changeZoomLevel",
  "settings.streamZoomLevel",
  "settings.scrollTo",
  "settings.streamScrollTo",
  "settings.changeShow",
  "settings.changeDatabase",
  "settings.changeCanvasType",
  "settings.changeLanguage",
  "settings.changeTableNameCase",
  "settings.changeColumnNameCase",
  "settings.changeBracketType",
  "settings.changeRelationshipDataTypeSync",
  "settings.changeRelationshipOptimization",
  "settings.changeColumnOrder",
  "settings.changeMaxWidthComment",
  "settings.changeIgnoreSaveSettings",
  // editor
  "editor.loadJson",
  "editor.clear"
], BR = M([
  "settings.changeZoomLevel",
  "settings.streamZoomLevel",
  "settings.scrollTo",
  "settings.streamScrollTo",
  "settings.changeDatabase",
  "settings.changeCanvasType",
  "settings.changeLanguage",
  "settings.changeTableNameCase",
  "settings.changeColumnNameCase",
  "settings.changeBracketType"
]), gj = [
  ...Sy.filter((e) => !BR(e))
], xu = [
  "editor.sharedMouseTracker"
], vj = [
  ...Sy,
  ...xu
], bj = [
  "settings.changeZoomLevel",
  "settings.streamZoomLevel",
  "settings.scrollTo",
  "settings.streamScrollTo",
  "settings.changeCanvasType"
], jR = [
  "table.move",
  "memo.move"
], UR = [
  "table.changeColor",
  "memo.changeColor"
], WR = [
  "settings.streamZoomLevel",
  "settings.streamScrollTo"
], $u = [
  ...Object.keys(ci)
], Ij = [
  ...Object.keys(ay),
  ...$u
], Ey = Lw((e) => !!e.length), Tj = (e) => {
  const t = M(e);
  return (n) => new Xe((o) => n.subscribe({
    next: (r) => o.next(r.filter((i) => t(i.type))),
    error: (r) => o.error(r),
    complete: () => o.complete()
  })).pipe(Ey);
}, xy = "@@none-stream", FR = (e, t) => (n) => {
  const o = t.find(([, r]) => r(n));
  return o ? o[0] : e(n) ? n : xy;
}, ld = (e, t = [], n = _w(200)) => {
  const o = M(e), r = t.map(([s, a]) => [
    s,
    M(a)
  ]), i = FR(o, r);
  return (s) => new Xe((a) => s.subscribe({
    next: (l) => {
      const c = l.reduce((u, f) => {
        const d = i(f.type);
        return u[d] || (u[d] = []), u[d].push(f), u;
      }, {});
      Object.values(c).forEach((u) => a.next(u));
    },
    error: (l) => a.error(l),
    complete: () => a.complete()
  })).pipe(Ey, Pw((a) => i(a[0].type)), Cm((a) => a.key === xy ? a : a.pipe(Rw(a.pipe(n)), Xs((l) => l.flat()))));
}, qR = M($u), VR = M(xu), wj = (e) => e.pipe(ld(xu, [], jw(100)), Xs((t) => {
  var n;
  return VR((n = t[0]) == null ? void 0 : n.type) ? [Xo(t)] : t;
}), ld($u, [
  ["@@move", jR],
  ["@@scroll", WR],
  ["@@color", UR]
]), Xs((t) => {
  var o;
  if (!qR((o = t[0]) == null ? void 0 : o.type))
    return t;
  const n = [];
  for (const r of Object.keys(ci))
    ci[r]([], n, t);
  return n.length ? n : t;
}));
function Cj(e, t) {
  return z1({
    context: e,
    state: {
      ...Vn({}),
      editor: hM()
    },
    reducers: {
      ...lk,
      ...OD,
      ...GD,
      ...r2,
      ...b2,
      ...eD,
      ...kk,
      ...qk
    },
    enableObservable: t ?? !0
  });
}
/*!
 * @dineug/go
 * @version 0.1.8 | Sun Dec 24 2023
 * @author SeungHwan-Lee <dineug2@gmail.com>
 * @license MIT
 */
function V(e, t, n, o) {
  if (n === "a" && !o)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? e !== t || !o : !t.has(e))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return n === "m" ? o : n === "a" ? o.call(e) : o ? o.value : t.get(e);
}
function Qr(e, t, n, o, r) {
  if (o === "m")
    throw new TypeError("Private method is not writable");
  if (o === "a" && !r)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof t == "function" ? e !== t || !r : !t.has(e))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return o === "a" ? r.call(e, n) : r ? r.value = n : t.set(e, n), n;
}
var Ql, xe, xn, $y;
const HR = {
  limit: -1,
  leading: !1,
  trailing: !1
};
class ZR {
  constructor(t) {
    Ql.add(this), xe.set(this, []), xn.set(this, void 0), Qr(this, xn, Object.assign({}, HR, {
      ...t
    }), "f");
  }
  isEmpty() {
    return !V(this, xe, "f").length;
  }
  put(t) {
    V(this, xe, "f").push(t), V(this, Ql, "m", $y).call(this);
  }
  take() {
    return V(this, xe, "f").shift();
  }
  flush() {
    const t = V(this, xe, "f");
    return Qr(this, xe, [], "f"), t;
  }
  drop(t) {
    const n = V(this, xe, "f").findIndex(t);
    if (n === -1)
      return !1;
    const o = V(this, xe, "f").slice();
    return o.splice(n, 1), Qr(this, xe, o, "f"), !0;
  }
}
xe = /* @__PURE__ */ new WeakMap(), xn = /* @__PURE__ */ new WeakMap(), Ql = /* @__PURE__ */ new WeakSet(), $y = function() {
  V(this, xn, "f").limit !== -1 && V(this, xn, "f").limit < V(this, xe, "f").length && (V(this, xn, "f").trailing ? V(this, xe, "f").pop() : V(this, xn, "f").leading ? V(this, xe, "f").shift() : V(this, xe, "f").pop());
};
const zR = (e) => new ZR(e), cd = {
  limitBuffer: zR
};
var Us, An, Nn, En, Jl;
const ml = Symbol.for("https://github.com/dineug/go.git#closed");
class GR {
  get closed() {
    return V(this, En, "f");
  }
  constructor(t = cd.limitBuffer()) {
    Us.add(this), An.set(this, void 0), Nn.set(this, cd.limitBuffer()), En.set(this, !1), Qr(this, An, t, "f");
  }
  put(t) {
    V(this, En, "f") || (V(this, An, "f").put(t), V(this, Us, "m", Jl).call(this));
  }
  take(t, n) {
    return V(this, En, "f") ? (n == null || n(ml), () => !1) : (V(this, Nn, "f").put([t, n]), V(this, Us, "m", Jl).call(this), () => V(this, Nn, "f").drop(([o]) => o === t));
  }
  flush(t, n) {
    if (V(this, En, "f")) {
      n == null || n(ml);
      return;
    }
    t(V(this, An, "f").flush());
  }
  close() {
    Qr(this, En, !0, "f"), V(this, Nn, "f").flush().forEach(([t, n]) => n == null ? void 0 : n(ml));
  }
}
An = /* @__PURE__ */ new WeakMap(), Nn = /* @__PURE__ */ new WeakMap(), En = /* @__PURE__ */ new WeakMap(), Us = /* @__PURE__ */ new WeakSet(), Jl = function() {
  if (V(this, Nn, "f").isEmpty() || V(this, An, "f").isEmpty())
    return;
  const [e] = V(this, Nn, "f").take(), t = V(this, An, "f").take();
  e == null || e(t);
};
const YR = (e) => new GR(e), Ay = (e) => (t) => typeof t === e, KR = Ay("object"), No = Ay("function"), QR = (e) => e === null, { isArray: fa } = Array, Za = (e) => KR(e) && !QR(e) && !fa(e), Ny = (e) => Za(e) && No(e.then), My = (e) => Za(e) && No(e.next), JR = (e) => Za(e) && No(e.next) && No(e.throw) && No(e.return), Au = Symbol.for("https://github.com/dineug/go.git#cancel"), ky = Symbol.for("https://github.com/dineug/go.git#attachCancel"), Dy = (e, t) => (Reflect.set(e, ky, t), e), XR = (e) => e === Au, Ly = (e) => {
  if (Za(e)) {
    const t = Reflect.get(e, ky);
    t == null || t();
  }
  return Ke(() => new Promise((t, n) => n(Au)));
}, Ry = (e) => Ke(function* () {
  let t = () => !1;
  const n = new Promise((o, r) => {
    t = e.take(o, r);
  });
  return Dy(n, () => {
    t();
  }), yield n;
}), Oj = (e) => Ke(() => new Promise((t) => setTimeout(t, e))), e_ = Symbol.for("https://github.com/dineug/go.git#kill"), t_ = (e) => e === e_, n_ = (e, t) => {
  e.put(t);
}, za = (e, t) => Ke(function* () {
  for (; ; ) {
    const n = yield Ry(e);
    Ke(t, n);
  }
}), o_ = {
  leading: !0,
  trailing: !1
}, Ga = (e, t, n, o) => Ke(function* () {
  const r = Object.assign({}, o_, {
    ...o
  });
  let i = -1, s, a;
  for (; ; ) {
    const l = yield Ry(e);
    a = l, i === -1 && (r.leading && (s = l, Ke(t, l)), i = setTimeout(() => {
      r.trailing && (!r.leading || s !== a) && Ke(t, a), i = -1;
    }, n));
  }
});
function Ke(e, ...t) {
  let n = !1, o = null;
  const r = new Promise(async (i, s) => {
    let a = null;
    o = () => {
      s(Au), a == null || a.forEach(Ly), a = null;
    };
    try {
      const l = e(...t);
      if (Ny(l))
        return a = [l], i(await l);
      if (!My(l))
        return i(l);
      let c = await l.next(), u;
      for (; !n && !c.done; ) {
        try {
          const f = r_(c.value);
          a = fa(f) ? f : [f], u = await (fa(f) ? Promise.all(f) : f), c = await l.next(u);
        } catch (f) {
          if (t_(f))
            throw f;
          JR(l) && (c = await l.throw(f));
        }
        u = void 0, a = null;
      }
      i(c.value);
    } catch (l) {
      XR(l) && (n = !0), s(l);
    }
  });
  return r.catch(() => {
  }), Dy(r, () => {
    n = !0, o == null || o();
  }), r;
}
function r_(e) {
  return Ny(e) ? e : My(e) ? Ke(() => e) : No(e) ? Ke(e) : fa(e) ? e.map((t) => Ke(() => t)) : Promise.resolve();
}
const re = {
  left: "left",
  right: "right",
  top: "top",
  bottom: "bottom"
}, Xl = Object.values(re);
M([
  re.top,
  re.bottom,
  re.left,
  re.right
]);
const i_ = measures.relationship.path_height,
    Sj = measures.relationship.path_end_height,
    Ej = measures.relationship.path_line_height,
    xj = measures.relationship.line_size,
    $j = measures.relationship.line_height,
    Aj = measures.relationship.circle_height;
function s_(e, t) {
  const n = gu(t, e).width, o = vu(t), { x: r, y: i } = t.ui;
  return {
    width: n,
    height: o,
    top: {
      x: r + n / 2,
      y: i
    },
    bottom: {
      x: r + n / 2,
      y: i + o
    },
    left: {
      x: r,
      y: i + o / 2
    },
    right: {
      x: r + n,
      y: i + o / 2
    },
    lt: {
      x: r,
      y: i
    },
    rt: {
      x: r + n,
      y: i
    },
    lb: {
      x: r,
      y: i + o
    },
    rb: {
      x: r + n,
      y: i + o
    }
  };
}
function ud(e, t) {
  return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
}
const fd = {
  [re.top]: wt.top,
  [re.bottom]: wt.bottom,
  [re.left]: wt.left,
  [re.right]: wt.right
};
function _y(e) {
  const { doc: { tableIds: t, relationshipIds: n }, collections: o } = e, r = M(t), i = y(o).collection("tableEntities"), s = y(o).collection("relationshipEntities").selectByIds(n).filter(({ start: l, end: c }) => r(l.tableId) && r(c.tableId)), a = /* @__PURE__ */ new Map();
  for (const l of s) {
    const { start: c, end: u } = l, f = i.selectById(c.tableId), d = i.selectById(u.tableId);
    if (!(!f || !d))
      if (c.tableId === u.tableId) {
        c.direction = wt.top, u.direction = wt.right;
        const h = pl(e, a, f);
        c.x = h.objectPoint.rt.x - 20, c.y = h.objectPoint.rt.y, u.x = h.objectPoint.rt.x, u.y = h.objectPoint.rt.y + 20, h.top.set(l.id, l), h.right.set(l.id, l);
      } else {
        const h = pl(e, a, f), p = pl(e, a, d), [g, v] = a_(h.objectPoint, p.objectPoint, l);
        h[g].set(l.id, l), p[v].set(l.id, l);
      }
  }
  for (const l of a.values())
    for (const c of Xl) {
      const u = c;
      l[u].size < 2 || l_(u, l);
    }
}
function pl(e, t, n) {
  let o = t.get(n.id);
  return o || (o = {
    table: n,
    objectPoint: s_(e, n),
    top: /* @__PURE__ */ new Map(),
    bottom: /* @__PURE__ */ new Map(),
    left: /* @__PURE__ */ new Map(),
    right: /* @__PURE__ */ new Map()
  }, t.set(n.id, o)), o;
}
function a_(e, t, n) {
  const o = [
    re.bottom,
    re.bottom
  ];
  let r = ud(e.bottom, t.bottom);
  n.start.x = e.bottom.x, n.start.y = e.bottom.y, n.end.x = t.bottom.x, n.end.y = t.bottom.y, n.start.direction = wt.bottom, n.end.direction = wt.bottom;
  for (const i of Xl)
    for (const s of Xl) {
      const a = i, l = s, c = ud(e[a], t[l]);
      r <= c || (r = c, o[0] = a, o[1] = l, n.start.x = e[a].x, n.start.y = e[a].y, n.start.direction = fd[a], n.end.x = t[l].x, n.end.y = t[l].y, n.end.direction = fd[l]);
    }
  return o;
}
function l_(e, t) {
  const n = c_(e, t), o = u_(e, t);
  e === re.left || e === re.right ? n.yArray.forEach((r, i) => {
    o[i].start.y = r;
  }) : (e === re.top || e === re.bottom) && n.xArray.forEach((r, i) => {
    o[i].start.x = r;
  });
}
function c_(e, t) {
  const n = t[e].size, o = {
    x: t.objectPoint.width / n,
    y: t.objectPoint.height / n
  }, r = {
    x: o.x / 2,
    y: o.y / 2
  }, i = [], s = [];
  if (e === re.left || e === re.right) {
    let a = t.objectPoint.lt.y - r.y;
    for (let l = 0; l < n; l++)
      a += o.y, s.push(a);
  } else if (e === re.top || e === re.bottom) {
    let a = t.objectPoint.lt.x - r.x;
    for (let l = 0; l < n; l++)
      a += o.x, i.push(a);
  }
  return {
    xArray: i,
    yArray: s
  };
}
function u_(e, t) {
  const n = [], o = [], r = [], i = e === re.top || e === re.bottom;
  for (const s of t[e].values()) {
    const { start: a, end: l } = s;
    a.tableId === l.tableId ? e === re.top ? (n.push(s.start), o.push(s.end)) : e === re.right && (n.push(s.end), o.push(s.start)) : s.start.tableId === t.table.id ? (n.push(s.start), o.push(s.end)) : (n.push(s.end), o.push(s.start));
  }
  return o.forEach((s, a) => {
    r.push({
      start: n[a],
      end: o[a],
      distance: i ? s.x : s.y
    });
  }), r.sort((s, a) => s.distance - a.distance);
}
const f_ = function* (e, t) {
  yield Ga(e, function* () {
    const { doc: n, collections: o } = t, r = y(o).collection("relationshipEntities"), i = r.selectByIds(n.relationshipIds);
    for (const { id: s, end: a, identification: l } of i) {
      const c = y(o).collection("tableEntities").selectById(a.tableId);
      if (!c)
        continue;
      const u = M(c.columnIds), f = y(o).collection("tableColumnEntities").selectByIds(a.columnIds).filter((h) => u(h.id));
      if (!f.length)
        continue;
      const d = f.every((h) => A(h.options, U.primaryKey));
      d !== l && r.updateOne(s, (h) => {
        h.identification = d;
      });
    }
  }, 10, { leading: !1, trailing: !0 });
}, d_ = function* (e, t) {
  yield Ga(e, function* () {
    const { doc: n, collections: o } = t, r = y(o).collection("relationshipEntities"), i = r.selectByIds(n.relationshipIds);
    for (const { id: s, end: a, startRelationshipType: l } of i) {
      const c = y(o).collection("tableEntities").selectById(a.tableId);
      if (!c)
        continue;
      const u = M(c.columnIds), f = y(o).collection("tableColumnEntities").selectByIds(a.columnIds).filter((h) => u(h.id));
      if (!f.length)
        continue;
      const d = f.every((h) => A(h.options, U.notNull)) ? Zl.dash : Zl.ring;
      d !== l && r.updateOne(s, (h) => {
        h.startRelationshipType = d;
      });
    }
  }, 10, { leading: !1, trailing: !0 });
}, h_ = function* (e, t) {
  yield Ga(e, function* () {
    _y(t);
  }, 5, { leading: !1, trailing: !0 });
}, m_ = [
  [
    [
      Ao,
      Xn,
      ln,
      Uo
    ],
    f_
  ],
  [
    [
      Ao,
      Bt,
      ln,
      Uo
    ],
    d_
  ],
  [
    [
      yu,
      iy,
      Mi,
      xo,
      $o,
      Iu,
      Tu,
      wu,
      Et,
      Ao,
      Lt,
      Rt,
      _t,
      Pt,
      Cu
    ],
    h_
  ]
], p_ = function* (e, t, n) {
  yield Ga(e, function* () {
    mD(t, n), _y(t);
  }, 5, { leading: !1, trailing: !0 });
}, y_ = [
  [[ln, Uo], p_]
], g_ = function* (e, t) {
  yield za(e, function* ({ payload: { id: n } }) {
    const { collections: o } = t, r = y(o).collection("tableColumnEntities"), i = r.selectById(n);
    !i || !A(i.options, U.primaryKey) || A(i.options, U.notNull) || r.updateOne(n, (l) => {
      l.options = l.options | U.notNull;
    });
  });
}, v_ = function* (e, t) {
  yield za(e, function* ({ payload: { id: n, end: o } }) {
    const { doc: { relationshipIds: r }, collections: i } = t;
    r.includes(n) && y(i).collection("tableColumnEntities").updateMany(o.columnIds, (s) => {
      s.ui.keys = s.ui.keys | Re.foreignKey;
    });
  });
}, b_ = function* (e, t) {
  yield za(e, function* ({ payload: { id: n } }) {
    const { doc: { relationshipIds: o }, collections: r } = t;
    if (o.includes(n))
      return;
    const i = y(r).collection("relationshipEntities").selectById(n);
    i && y(r).collection("tableColumnEntities").updateMany(i.end.columnIds, (s) => {
      s.ui.keys = s.ui.keys & ~Re.foreignKey;
    });
  });
}, I_ = function* (e, t) {
  yield za(e, function* () {
    const { doc: n, collections: o } = t, r = y(o).collection("relationshipEntities").selectByIds(n.relationshipIds), i = y(o).collection("tableEntities").selectByIds(n.tableIds), s = /* @__PURE__ */ new Set(), a = y(o).collection("tableColumnEntities");
    for (const { end: l } of r) {
      const c = a.selectByIds(l.columnIds);
      for (const u of c)
        u.ui.keys = u.ui.keys | Re.foreignKey, s.add(u.id);
    }
    for (const l of i) {
      const c = a.selectByIds(l.columnIds);
      for (const u of c)
        A(u.ui.keys, Re.foreignKey) && !s.has(u.id) && (u.ui.keys = u.ui.keys & ~Re.foreignKey);
    }
  });
}, T_ = [
  [[Xn], g_],
  [[Mi], v_],
  [[Fo], b_],
  [[ln, Uo], I_]
], w_ = [...y_, ...T_, ...m_];
function Nj(e) {
  const t = w_.map(([r, i]) => {
    const s = YR();
    return {
      pattern: M(r.map(String)),
      channel: s,
      proc: Ke(i, s, e.state, e.context)
    };
  }), n = e.subscribe((r) => {
    for (const i of r)
      for (const s of t)
        s.pattern(i.type) && n_(s.channel, i);
  });
  return { destroy: () => {
    t.forEach(({ proc: r }) => Ly(r)), t.splice(0, t.length), n();
  } };
}
class to extends Error {
}
class C_ extends to {
  constructor(t) {
    super(`Invalid DateTime: ${t.toMessage()}`);
  }
}
class O_ extends to {
  constructor(t) {
    super(`Invalid Interval: ${t.toMessage()}`);
  }
}
class S_ extends to {
  constructor(t) {
    super(`Invalid Duration: ${t.toMessage()}`);
  }
}
class Io extends to {
}
class Py extends to {
  constructor(t) {
    super(`Invalid unit ${t}`);
  }
}
class $e extends to {
}
class zt extends to {
  constructor() {
    super("Zone is an abstract class");
  }
}
const C = "numeric", mt = "short", _e = "long", da = {
  year: C,
  month: C,
  day: C
}, By = {
  year: C,
  month: mt,
  day: C
}, E_ = {
  year: C,
  month: mt,
  day: C,
  weekday: mt
}, jy = {
  year: C,
  month: _e,
  day: C
}, Uy = {
  year: C,
  month: _e,
  day: C,
  weekday: _e
}, Wy = {
  hour: C,
  minute: C
}, Fy = {
  hour: C,
  minute: C,
  second: C
}, qy = {
  hour: C,
  minute: C,
  second: C,
  timeZoneName: mt
}, Vy = {
  hour: C,
  minute: C,
  second: C,
  timeZoneName: _e
}, Hy = {
  hour: C,
  minute: C,
  hourCycle: "h23"
}, Zy = {
  hour: C,
  minute: C,
  second: C,
  hourCycle: "h23"
}, zy = {
  hour: C,
  minute: C,
  second: C,
  hourCycle: "h23",
  timeZoneName: mt
}, Gy = {
  hour: C,
  minute: C,
  second: C,
  hourCycle: "h23",
  timeZoneName: _e
}, Yy = {
  year: C,
  month: C,
  day: C,
  hour: C,
  minute: C
}, Ky = {
  year: C,
  month: C,
  day: C,
  hour: C,
  minute: C,
  second: C
}, Qy = {
  year: C,
  month: mt,
  day: C,
  hour: C,
  minute: C
}, Jy = {
  year: C,
  month: mt,
  day: C,
  hour: C,
  minute: C,
  second: C
}, x_ = {
  year: C,
  month: mt,
  day: C,
  weekday: mt,
  hour: C,
  minute: C
}, Xy = {
  year: C,
  month: _e,
  day: C,
  hour: C,
  minute: C,
  timeZoneName: mt
}, eg = {
  year: C,
  month: _e,
  day: C,
  hour: C,
  minute: C,
  second: C,
  timeZoneName: mt
}, tg = {
  year: C,
  month: _e,
  day: C,
  weekday: _e,
  hour: C,
  minute: C,
  timeZoneName: _e
}, ng = {
  year: C,
  month: _e,
  day: C,
  weekday: _e,
  hour: C,
  minute: C,
  second: C,
  timeZoneName: _e
};
class ji {
  /**
   * The type of zone
   * @abstract
   * @type {string}
   */
  get type() {
    throw new zt();
  }
  /**
   * The name of this zone.
   * @abstract
   * @type {string}
   */
  get name() {
    throw new zt();
  }
  get ianaName() {
    return this.name;
  }
  /**
   * Returns whether the offset is known to be fixed for the whole year.
   * @abstract
   * @type {boolean}
   */
  get isUniversal() {
    throw new zt();
  }
  /**
   * Returns the offset's common name (such as EST) at the specified timestamp
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to get the name
   * @param {Object} opts - Options to affect the format
   * @param {string} opts.format - What style of offset to return. Accepts 'long' or 'short'.
   * @param {string} opts.locale - What locale to return the offset name in.
   * @return {string}
   */
  offsetName(t, n) {
    throw new zt();
  }
  /**
   * Returns the offset's value as a string
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to get the offset
   * @param {string} format - What style of offset to return.
   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
   * @return {string}
   */
  formatOffset(t, n) {
    throw new zt();
  }
  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to compute the offset
   * @return {number}
   */
  offset(t) {
    throw new zt();
  }
  /**
   * Return whether this Zone is equal to another zone
   * @abstract
   * @param {Zone} otherZone - the zone to compare
   * @return {boolean}
   */
  equals(t) {
    throw new zt();
  }
  /**
   * Return whether this Zone is valid.
   * @abstract
   * @type {boolean}
   */
  get isValid() {
    throw new zt();
  }
}
let yl = null;
class Ya extends ji {
  /**
   * Get a singleton instance of the local zone
   * @return {SystemZone}
   */
  static get instance() {
    return yl === null && (yl = new Ya()), yl;
  }
  /** @override **/
  get type() {
    return "system";
  }
  /** @override **/
  get name() {
    return new Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  /** @override **/
  get isUniversal() {
    return !1;
  }
  /** @override **/
  offsetName(t, { format: n, locale: o }) {
    return fg(t, n, o);
  }
  /** @override **/
  formatOffset(t, n) {
    return Jr(this.offset(t), n);
  }
  /** @override **/
  offset(t) {
    return -new Date(t).getTimezoneOffset();
  }
  /** @override **/
  equals(t) {
    return t.type === "system";
  }
  /** @override **/
  get isValid() {
    return !0;
  }
}
let Ws = {};
function $_(e) {
  return Ws[e] || (Ws[e] = new Intl.DateTimeFormat("en-US", {
    hour12: !1,
    timeZone: e,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    era: "short"
  })), Ws[e];
}
const A_ = {
  year: 0,
  month: 1,
  day: 2,
  era: 3,
  hour: 4,
  minute: 5,
  second: 6
};
function N_(e, t) {
  const n = e.format(t).replace(/\u200E/g, ""), o = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(n), [, r, i, s, a, l, c, u] = o;
  return [s, r, i, a, l, c, u];
}
function M_(e, t) {
  const n = e.formatToParts(t), o = [];
  for (let r = 0; r < n.length; r++) {
    const { type: i, value: s } = n[r], a = A_[i];
    i === "era" ? o[a] = s : N(a) || (o[a] = parseInt(s, 10));
  }
  return o;
}
let Ki = {};
class Wt extends ji {
  /**
   * @param {string} name - Zone name
   * @return {IANAZone}
   */
  static create(t) {
    return Ki[t] || (Ki[t] = new Wt(t)), Ki[t];
  }
  /**
   * Reset local caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  static resetCache() {
    Ki = {}, Ws = {};
  }
  /**
   * Returns whether the provided string is a valid specifier. This only checks the string's format, not that the specifier identifies a known zone; see isValidZone for that.
   * @param {string} s - The string to check validity on
   * @example IANAZone.isValidSpecifier("America/New_York") //=> true
   * @example IANAZone.isValidSpecifier("Sport~~blorp") //=> false
   * @deprecated This method returns false for some valid IANA names. Use isValidZone instead.
   * @return {boolean}
   */
  static isValidSpecifier(t) {
    return this.isValidZone(t);
  }
  /**
   * Returns whether the provided string identifies a real zone
   * @param {string} zone - The string to check
   * @example IANAZone.isValidZone("America/New_York") //=> true
   * @example IANAZone.isValidZone("Fantasia/Castle") //=> false
   * @example IANAZone.isValidZone("Sport~~blorp") //=> false
   * @return {boolean}
   */
  static isValidZone(t) {
    if (!t)
      return !1;
    try {
      return new Intl.DateTimeFormat("en-US", { timeZone: t }).format(), !0;
    } catch {
      return !1;
    }
  }
  constructor(t) {
    super(), this.zoneName = t, this.valid = Wt.isValidZone(t);
  }
  /** @override **/
  get type() {
    return "iana";
  }
  /** @override **/
  get name() {
    return this.zoneName;
  }
  /** @override **/
  get isUniversal() {
    return !1;
  }
  /** @override **/
  offsetName(t, { format: n, locale: o }) {
    return fg(t, n, o, this.name);
  }
  /** @override **/
  formatOffset(t, n) {
    return Jr(this.offset(t), n);
  }
  /** @override **/
  offset(t) {
    const n = new Date(t);
    if (isNaN(n))
      return NaN;
    const o = $_(this.name);
    let [r, i, s, a, l, c, u] = o.formatToParts ? M_(o, n) : N_(o, n);
    a === "BC" && (r = -Math.abs(r) + 1);
    const d = Qa({
      year: r,
      month: i,
      day: s,
      hour: l === 24 ? 0 : l,
      minute: c,
      second: u,
      millisecond: 0
    });
    let h = +n;
    const p = h % 1e3;
    return h -= p >= 0 ? p : 1e3 + p, (d - h) / (60 * 1e3);
  }
  /** @override **/
  equals(t) {
    return t.type === "iana" && t.name === this.name;
  }
  /** @override **/
  get isValid() {
    return this.valid;
  }
}
let dd = {};
function k_(e, t = {}) {
  const n = JSON.stringify([e, t]);
  let o = dd[n];
  return o || (o = new Intl.ListFormat(e, t), dd[n] = o), o;
}
let ec = {};
function tc(e, t = {}) {
  const n = JSON.stringify([e, t]);
  let o = ec[n];
  return o || (o = new Intl.DateTimeFormat(e, t), ec[n] = o), o;
}
let nc = {};
function D_(e, t = {}) {
  const n = JSON.stringify([e, t]);
  let o = nc[n];
  return o || (o = new Intl.NumberFormat(e, t), nc[n] = o), o;
}
let oc = {};
function L_(e, t = {}) {
  const { base: n, ...o } = t, r = JSON.stringify([e, o]);
  let i = oc[r];
  return i || (i = new Intl.RelativeTimeFormat(e, t), oc[r] = i), i;
}
let Vr = null;
function R_() {
  return Vr || (Vr = new Intl.DateTimeFormat().resolvedOptions().locale, Vr);
}
let hd = {};
function __(e) {
  let t = hd[e];
  if (!t) {
    const n = new Intl.Locale(e);
    t = "getWeekInfo" in n ? n.getWeekInfo() : n.weekInfo, hd[e] = t;
  }
  return t;
}
function P_(e) {
  const t = e.indexOf("-x-");
  t !== -1 && (e = e.substring(0, t));
  const n = e.indexOf("-u-");
  if (n === -1)
    return [e];
  {
    let o, r;
    try {
      o = tc(e).resolvedOptions(), r = e;
    } catch {
      const l = e.substring(0, n);
      o = tc(l).resolvedOptions(), r = l;
    }
    const { numberingSystem: i, calendar: s } = o;
    return [r, i, s];
  }
}
function B_(e, t, n) {
  return (n || t) && (e.includes("-u-") || (e += "-u"), n && (e += `-ca-${n}`), t && (e += `-nu-${t}`)), e;
}
function j_(e) {
  const t = [];
  for (let n = 1; n <= 12; n++) {
    const o = D.utc(2009, n, 1);
    t.push(e(o));
  }
  return t;
}
function U_(e) {
  const t = [];
  for (let n = 1; n <= 7; n++) {
    const o = D.utc(2016, 11, 13 + n);
    t.push(e(o));
  }
  return t;
}
function Qi(e, t, n, o) {
  const r = e.listingMode();
  return r === "error" ? null : r === "en" ? n(t) : o(t);
}
function W_(e) {
  return e.numberingSystem && e.numberingSystem !== "latn" ? !1 : e.numberingSystem === "latn" || !e.locale || e.locale.startsWith("en") || new Intl.DateTimeFormat(e.intl).resolvedOptions().numberingSystem === "latn";
}
class F_ {
  constructor(t, n, o) {
    this.padTo = o.padTo || 0, this.floor = o.floor || !1;
    const { padTo: r, floor: i, ...s } = o;
    if (!n || Object.keys(s).length > 0) {
      const a = { useGrouping: !1, ...o };
      o.padTo > 0 && (a.minimumIntegerDigits = o.padTo), this.inf = D_(t, a);
    }
  }
  format(t) {
    if (this.inf) {
      const n = this.floor ? Math.floor(t) : t;
      return this.inf.format(n);
    } else {
      const n = this.floor ? Math.floor(t) : Du(t, 3);
      return fe(n, this.padTo);
    }
  }
}
class q_ {
  constructor(t, n, o) {
    this.opts = o, this.originalZone = void 0;
    let r;
    if (this.opts.timeZone)
      this.dt = t;
    else if (t.zone.type === "fixed") {
      const s = -1 * (t.offset / 60), a = s >= 0 ? `Etc/GMT+${s}` : `Etc/GMT${s}`;
      t.offset !== 0 && Wt.create(a).valid ? (r = a, this.dt = t) : (r = "UTC", this.dt = t.offset === 0 ? t : t.setZone("UTC").plus({ minutes: t.offset }), this.originalZone = t.zone);
    } else
      t.zone.type === "system" ? this.dt = t : t.zone.type === "iana" ? (this.dt = t, r = t.zone.name) : (r = "UTC", this.dt = t.setZone("UTC").plus({ minutes: t.offset }), this.originalZone = t.zone);
    const i = { ...this.opts };
    i.timeZone = i.timeZone || r, this.dtf = tc(n, i);
  }
  format() {
    return this.originalZone ? this.formatToParts().map(({ value: t }) => t).join("") : this.dtf.format(this.dt.toJSDate());
  }
  formatToParts() {
    const t = this.dtf.formatToParts(this.dt.toJSDate());
    return this.originalZone ? t.map((n) => {
      if (n.type === "timeZoneName") {
        const o = this.originalZone.offsetName(this.dt.ts, {
          locale: this.dt.locale,
          format: this.opts.timeZoneName
        });
        return {
          ...n,
          value: o
        };
      } else
        return n;
    }) : t;
  }
  resolvedOptions() {
    return this.dtf.resolvedOptions();
  }
}
class V_ {
  constructor(t, n, o) {
    this.opts = { style: "long", ...o }, !n && cg() && (this.rtf = L_(t, o));
  }
  format(t, n) {
    return this.rtf ? this.rtf.format(t, n) : uP(n, t, this.opts.numeric, this.opts.style !== "long");
  }
  formatToParts(t, n) {
    return this.rtf ? this.rtf.formatToParts(t, n) : [];
  }
}
const H_ = {
  firstDay: 1,
  minimalDays: 4,
  weekend: [6, 7]
};
class H {
  static fromOpts(t) {
    return H.create(
      t.locale,
      t.numberingSystem,
      t.outputCalendar,
      t.weekSettings,
      t.defaultToEN
    );
  }
  static create(t, n, o, r, i = !1) {
    const s = t || le.defaultLocale, a = s || (i ? "en-US" : R_()), l = n || le.defaultNumberingSystem, c = o || le.defaultOutputCalendar, u = rc(r) || le.defaultWeekSettings;
    return new H(a, l, c, u, s);
  }
  static resetCache() {
    Vr = null, ec = {}, nc = {}, oc = {};
  }
  static fromObject({ locale: t, numberingSystem: n, outputCalendar: o, weekSettings: r } = {}) {
    return H.create(t, n, o, r);
  }
  constructor(t, n, o, r, i) {
    const [s, a, l] = P_(t);
    this.locale = s, this.numberingSystem = n || a || null, this.outputCalendar = o || l || null, this.weekSettings = r, this.intl = B_(this.locale, this.numberingSystem, this.outputCalendar), this.weekdaysCache = { format: {}, standalone: {} }, this.monthsCache = { format: {}, standalone: {} }, this.meridiemCache = null, this.eraCache = {}, this.specifiedLocale = i, this.fastNumbersCached = null;
  }
  get fastNumbers() {
    return this.fastNumbersCached == null && (this.fastNumbersCached = W_(this)), this.fastNumbersCached;
  }
  listingMode() {
    const t = this.isEnglish(), n = (this.numberingSystem === null || this.numberingSystem === "latn") && (this.outputCalendar === null || this.outputCalendar === "gregory");
    return t && n ? "en" : "intl";
  }
  clone(t) {
    return !t || Object.getOwnPropertyNames(t).length === 0 ? this : H.create(
      t.locale || this.specifiedLocale,
      t.numberingSystem || this.numberingSystem,
      t.outputCalendar || this.outputCalendar,
      rc(t.weekSettings) || this.weekSettings,
      t.defaultToEN || !1
    );
  }
  redefaultToEN(t = {}) {
    return this.clone({ ...t, defaultToEN: !0 });
  }
  redefaultToSystem(t = {}) {
    return this.clone({ ...t, defaultToEN: !1 });
  }
  months(t, n = !1) {
    return Qi(this, t, mg, () => {
      const o = n ? { month: t, day: "numeric" } : { month: t }, r = n ? "format" : "standalone";
      return this.monthsCache[r][t] || (this.monthsCache[r][t] = j_((i) => this.extract(i, o, "month"))), this.monthsCache[r][t];
    });
  }
  weekdays(t, n = !1) {
    return Qi(this, t, gg, () => {
      const o = n ? { weekday: t, year: "numeric", month: "long", day: "numeric" } : { weekday: t }, r = n ? "format" : "standalone";
      return this.weekdaysCache[r][t] || (this.weekdaysCache[r][t] = U_(
        (i) => this.extract(i, o, "weekday")
      )), this.weekdaysCache[r][t];
    });
  }
  meridiems() {
    return Qi(
      this,
      void 0,
      () => vg,
      () => {
        if (!this.meridiemCache) {
          const t = { hour: "numeric", hourCycle: "h12" };
          this.meridiemCache = [D.utc(2016, 11, 13, 9), D.utc(2016, 11, 13, 19)].map(
            (n) => this.extract(n, t, "dayperiod")
          );
        }
        return this.meridiemCache;
      }
    );
  }
  eras(t) {
    return Qi(this, t, bg, () => {
      const n = { era: t };
      return this.eraCache[t] || (this.eraCache[t] = [D.utc(-40, 1, 1), D.utc(2017, 1, 1)].map(
        (o) => this.extract(o, n, "era")
      )), this.eraCache[t];
    });
  }
  extract(t, n, o) {
    const r = this.dtFormatter(t, n), i = r.formatToParts(), s = i.find((a) => a.type.toLowerCase() === o);
    return s ? s.value : null;
  }
  numberFormatter(t = {}) {
    return new F_(this.intl, t.forceSimple || this.fastNumbers, t);
  }
  dtFormatter(t, n = {}) {
    return new q_(t, this.intl, n);
  }
  relFormatter(t = {}) {
    return new V_(this.intl, this.isEnglish(), t);
  }
  listFormatter(t = {}) {
    return k_(this.intl, t);
  }
  isEnglish() {
    return this.locale === "en" || this.locale.toLowerCase() === "en-us" || new Intl.DateTimeFormat(this.intl).resolvedOptions().locale.startsWith("en-us");
  }
  getWeekSettings() {
    return this.weekSettings ? this.weekSettings : ug() ? __(this.locale) : H_;
  }
  getStartOfWeek() {
    return this.getWeekSettings().firstDay;
  }
  getMinDaysInFirstWeek() {
    return this.getWeekSettings().minimalDays;
  }
  getWeekendDays() {
    return this.getWeekSettings().weekend;
  }
  equals(t) {
    return this.locale === t.locale && this.numberingSystem === t.numberingSystem && this.outputCalendar === t.outputCalendar;
  }
}
let gl = null;
class Oe extends ji {
  /**
   * Get a singleton instance of UTC
   * @return {FixedOffsetZone}
   */
  static get utcInstance() {
    return gl === null && (gl = new Oe(0)), gl;
  }
  /**
   * Get an instance with a specified offset
   * @param {number} offset - The offset in minutes
   * @return {FixedOffsetZone}
   */
  static instance(t) {
    return t === 0 ? Oe.utcInstance : new Oe(t);
  }
  /**
   * Get an instance of FixedOffsetZone from a UTC offset string, like "UTC+6"
   * @param {string} s - The offset string to parse
   * @example FixedOffsetZone.parseSpecifier("UTC+6")
   * @example FixedOffsetZone.parseSpecifier("UTC+06")
   * @example FixedOffsetZone.parseSpecifier("UTC-6:00")
   * @return {FixedOffsetZone}
   */
  static parseSpecifier(t) {
    if (t) {
      const n = t.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
      if (n)
        return new Oe(Ja(n[1], n[2]));
    }
    return null;
  }
  constructor(t) {
    super(), this.fixed = t;
  }
  /** @override **/
  get type() {
    return "fixed";
  }
  /** @override **/
  get name() {
    return this.fixed === 0 ? "UTC" : `UTC${Jr(this.fixed, "narrow")}`;
  }
  get ianaName() {
    return this.fixed === 0 ? "Etc/UTC" : `Etc/GMT${Jr(-this.fixed, "narrow")}`;
  }
  /** @override **/
  offsetName() {
    return this.name;
  }
  /** @override **/
  formatOffset(t, n) {
    return Jr(this.fixed, n);
  }
  /** @override **/
  get isUniversal() {
    return !0;
  }
  /** @override **/
  offset() {
    return this.fixed;
  }
  /** @override **/
  equals(t) {
    return t.type === "fixed" && t.fixed === this.fixed;
  }
  /** @override **/
  get isValid() {
    return !0;
  }
}
class Z_ extends ji {
  constructor(t) {
    super(), this.zoneName = t;
  }
  /** @override **/
  get type() {
    return "invalid";
  }
  /** @override **/
  get name() {
    return this.zoneName;
  }
  /** @override **/
  get isUniversal() {
    return !1;
  }
  /** @override **/
  offsetName() {
    return null;
  }
  /** @override **/
  formatOffset() {
    return "";
  }
  /** @override **/
  offset() {
    return NaN;
  }
  /** @override **/
  equals() {
    return !1;
  }
  /** @override **/
  get isValid() {
    return !1;
  }
}
function on(e, t) {
  if (N(e) || e === null)
    return t;
  if (e instanceof ji)
    return e;
  if (Y_(e)) {
    const n = e.toLowerCase();
    return n === "default" ? t : n === "local" || n === "system" ? Ya.instance : n === "utc" || n === "gmt" ? Oe.utcInstance : Oe.parseSpecifier(n) || Wt.create(e);
  } else
    return Pn(e) ? Oe.instance(e) : typeof e == "object" && "offset" in e && typeof e.offset == "function" ? e : new Z_(e);
}
let md = () => Date.now(), pd = "system", yd = null, gd = null, vd = null, bd = 60, Id, Td = null;
class le {
  /**
   * Get the callback for returning the current timestamp.
   * @type {function}
   */
  static get now() {
    return md;
  }
  /**
   * Set the callback for returning the current timestamp.
   * The function should return a number, which will be interpreted as an Epoch millisecond count
   * @type {function}
   * @example Settings.now = () => Date.now() + 3000 // pretend it is 3 seconds in the future
   * @example Settings.now = () => 0 // always pretend it's Jan 1, 1970 at midnight in UTC time
   */
  static set now(t) {
    md = t;
  }
  /**
   * Set the default time zone to create DateTimes in. Does not affect existing instances.
   * Use the value "system" to reset this value to the system's time zone.
   * @type {string}
   */
  static set defaultZone(t) {
    pd = t;
  }
  /**
   * Get the default time zone object currently used to create DateTimes. Does not affect existing instances.
   * The default value is the system's time zone (the one set on the machine that runs this code).
   * @type {Zone}
   */
  static get defaultZone() {
    return on(pd, Ya.instance);
  }
  /**
   * Get the default locale to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultLocale() {
    return yd;
  }
  /**
   * Set the default locale to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultLocale(t) {
    yd = t;
  }
  /**
   * Get the default numbering system to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultNumberingSystem() {
    return gd;
  }
  /**
   * Set the default numbering system to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultNumberingSystem(t) {
    gd = t;
  }
  /**
   * Get the default output calendar to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultOutputCalendar() {
    return vd;
  }
  /**
   * Set the default output calendar to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultOutputCalendar(t) {
    vd = t;
  }
  /**
   * @typedef {Object} WeekSettings
   * @property {number} firstDay
   * @property {number} minimalDays
   * @property {number[]} weekend
   */
  /**
   * @return {WeekSettings|null}
   */
  static get defaultWeekSettings() {
    return Td;
  }
  /**
   * Allows overriding the default locale week settings, i.e. the start of the week, the weekend and
   * how many days are required in the first week of a year.
   * Does not affect existing instances.
   *
   * @param {WeekSettings|null} weekSettings
   */
  static set defaultWeekSettings(t) {
    Td = rc(t);
  }
  /**
   * Get the cutoff year after which a string encoding a year as two digits is interpreted to occur in the current century.
   * @type {number}
   */
  static get twoDigitCutoffYear() {
    return bd;
  }
  /**
   * Set the cutoff year after which a string encoding a year as two digits is interpreted to occur in the current century.
   * @type {number}
   * @example Settings.twoDigitCutoffYear = 0 // cut-off year is 0, so all 'yy' are interpreted as current century
   * @example Settings.twoDigitCutoffYear = 50 // '49' -> 1949; '50' -> 2050
   * @example Settings.twoDigitCutoffYear = 1950 // interpreted as 50
   * @example Settings.twoDigitCutoffYear = 2050 // ALSO interpreted as 50
   */
  static set twoDigitCutoffYear(t) {
    bd = t % 100;
  }
  /**
   * Get whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
   * @type {boolean}
   */
  static get throwOnInvalid() {
    return Id;
  }
  /**
   * Set whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
   * @type {boolean}
   */
  static set throwOnInvalid(t) {
    Id = t;
  }
  /**
   * Reset Luxon's global caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  static resetCaches() {
    H.resetCache(), Wt.resetCache();
  }
}
class ct {
  constructor(t, n) {
    this.reason = t, this.explanation = n;
  }
  toMessage() {
    return this.explanation ? `${this.reason}: ${this.explanation}` : this.reason;
  }
}
const og = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], rg = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
function Ge(e, t) {
  return new ct(
    "unit out of range",
    `you specified ${t} (of type ${typeof t}) as a ${e}, which is invalid`
  );
}
function Nu(e, t, n) {
  const o = new Date(Date.UTC(e, t - 1, n));
  e < 100 && e >= 0 && o.setUTCFullYear(o.getUTCFullYear() - 1900);
  const r = o.getUTCDay();
  return r === 0 ? 7 : r;
}
function ig(e, t, n) {
  return n + (Ui(e) ? rg : og)[t - 1];
}
function sg(e, t) {
  const n = Ui(e) ? rg : og, o = n.findIndex((i) => i < t), r = t - n[o];
  return { month: o + 1, day: r };
}
function Mu(e, t) {
  return (e - t + 7) % 7 + 1;
}
function ha(e, t = 4, n = 1) {
  const { year: o, month: r, day: i } = e, s = ig(o, r, i), a = Mu(Nu(o, r, i), n);
  let l = Math.floor((s - a + 14 - t) / 7), c;
  return l < 1 ? (c = o - 1, l = ui(c, t, n)) : l > ui(o, t, n) ? (c = o + 1, l = 1) : c = o, { weekYear: c, weekNumber: l, weekday: a, ...Xa(e) };
}
function wd(e, t = 4, n = 1) {
  const { weekYear: o, weekNumber: r, weekday: i } = e, s = Mu(Nu(o, 1, t), n), a = Mo(o);
  let l = r * 7 + i - s - 7 + t, c;
  l < 1 ? (c = o - 1, l += Mo(c)) : l > a ? (c = o + 1, l -= Mo(o)) : c = o;
  const { month: u, day: f } = sg(c, l);
  return { year: c, month: u, day: f, ...Xa(e) };
}
function vl(e) {
  const { year: t, month: n, day: o } = e, r = ig(t, n, o);
  return { year: t, ordinal: r, ...Xa(e) };
}
function Cd(e) {
  const { year: t, ordinal: n } = e, { month: o, day: r } = sg(t, n);
  return { year: t, month: o, day: r, ...Xa(e) };
}
function Od(e, t) {
  if (!N(e.localWeekday) || !N(e.localWeekNumber) || !N(e.localWeekYear)) {
    if (!N(e.weekday) || !N(e.weekNumber) || !N(e.weekYear))
      throw new Io(
        "Cannot mix locale-based week fields with ISO-based week fields"
      );
    return N(e.localWeekday) || (e.weekday = e.localWeekday), N(e.localWeekNumber) || (e.weekNumber = e.localWeekNumber), N(e.localWeekYear) || (e.weekYear = e.localWeekYear), delete e.localWeekday, delete e.localWeekNumber, delete e.localWeekYear, {
      minDaysInFirstWeek: t.getMinDaysInFirstWeek(),
      startOfWeek: t.getStartOfWeek()
    };
  } else
    return { minDaysInFirstWeek: 4, startOfWeek: 1 };
}
function z_(e, t = 4, n = 1) {
  const o = Ka(e.weekYear), r = Ye(
    e.weekNumber,
    1,
    ui(e.weekYear, t, n)
  ), i = Ye(e.weekday, 1, 7);
  return o ? r ? i ? !1 : Ge("weekday", e.weekday) : Ge("week", e.weekNumber) : Ge("weekYear", e.weekYear);
}
function G_(e) {
  const t = Ka(e.year), n = Ye(e.ordinal, 1, Mo(e.year));
  return t ? n ? !1 : Ge("ordinal", e.ordinal) : Ge("year", e.year);
}
function ag(e) {
  const t = Ka(e.year), n = Ye(e.month, 1, 12), o = Ye(e.day, 1, ma(e.year, e.month));
  return t ? n ? o ? !1 : Ge("day", e.day) : Ge("month", e.month) : Ge("year", e.year);
}
function lg(e) {
  const { hour: t, minute: n, second: o, millisecond: r } = e, i = Ye(t, 0, 23) || t === 24 && n === 0 && o === 0 && r === 0, s = Ye(n, 0, 59), a = Ye(o, 0, 59), l = Ye(r, 0, 999);
  return i ? s ? a ? l ? !1 : Ge("millisecond", r) : Ge("second", o) : Ge("minute", n) : Ge("hour", t);
}
function N(e) {
  return typeof e > "u";
}
function Pn(e) {
  return typeof e == "number";
}
function Ka(e) {
  return typeof e == "number" && e % 1 === 0;
}
function Y_(e) {
  return typeof e == "string";
}
function K_(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function cg() {
  try {
    return typeof Intl < "u" && !!Intl.RelativeTimeFormat;
  } catch {
    return !1;
  }
}
function ug() {
  try {
    return typeof Intl < "u" && !!Intl.Locale && ("weekInfo" in Intl.Locale.prototype || "getWeekInfo" in Intl.Locale.prototype);
  } catch {
    return !1;
  }
}
function Q_(e) {
  return Array.isArray(e) ? e : [e];
}
function Sd(e, t, n) {
  if (e.length !== 0)
    return e.reduce((o, r) => {
      const i = [t(r), r];
      return o && n(o[0], i[0]) === o[0] ? o : i;
    }, null)[1];
}
function J_(e, t) {
  return t.reduce((n, o) => (n[o] = e[o], n), {});
}
function qo(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function rc(e) {
  if (e == null)
    return null;
  if (typeof e != "object")
    throw new $e("Week settings must be an object");
  if (!Ye(e.firstDay, 1, 7) || !Ye(e.minimalDays, 1, 7) || !Array.isArray(e.weekend) || e.weekend.some((t) => !Ye(t, 1, 7)))
    throw new $e("Invalid week settings");
  return {
    firstDay: e.firstDay,
    minimalDays: e.minimalDays,
    weekend: Array.from(e.weekend)
  };
}
function Ye(e, t, n) {
  return Ka(e) && e >= t && e <= n;
}
function X_(e, t) {
  return e - t * Math.floor(e / t);
}
function fe(e, t = 2) {
  const n = e < 0;
  let o;
  return n ? o = "-" + ("" + -e).padStart(t, "0") : o = ("" + e).padStart(t, "0"), o;
}
function nn(e) {
  if (!(N(e) || e === null || e === ""))
    return parseInt(e, 10);
}
function vn(e) {
  if (!(N(e) || e === null || e === ""))
    return parseFloat(e);
}
function ku(e) {
  if (!(N(e) || e === null || e === "")) {
    const t = parseFloat("0." + e) * 1e3;
    return Math.floor(t);
  }
}
function Du(e, t, n = !1) {
  const o = 10 ** t;
  return (n ? Math.trunc : Math.round)(e * o) / o;
}
function Ui(e) {
  return e % 4 === 0 && (e % 100 !== 0 || e % 400 === 0);
}
function Mo(e) {
  return Ui(e) ? 366 : 365;
}
function ma(e, t) {
  const n = X_(t - 1, 12) + 1, o = e + (t - n) / 12;
  return n === 2 ? Ui(o) ? 29 : 28 : [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][n - 1];
}
function Qa(e) {
  let t = Date.UTC(
    e.year,
    e.month - 1,
    e.day,
    e.hour,
    e.minute,
    e.second,
    e.millisecond
  );
  return e.year < 100 && e.year >= 0 && (t = new Date(t), t.setUTCFullYear(e.year, e.month - 1, e.day)), +t;
}
function Ed(e, t, n) {
  return -Mu(Nu(e, 1, t), n) + t - 1;
}
function ui(e, t = 4, n = 1) {
  const o = Ed(e, t, n), r = Ed(e + 1, t, n);
  return (Mo(e) - o + r) / 7;
}
function ic(e) {
  return e > 99 ? e : e > le.twoDigitCutoffYear ? 1900 + e : 2e3 + e;
}
function fg(e, t, n, o = null) {
  const r = new Date(e), i = {
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  };
  o && (i.timeZone = o);
  const s = { timeZoneName: t, ...i }, a = new Intl.DateTimeFormat(n, s).formatToParts(r).find((l) => l.type.toLowerCase() === "timezonename");
  return a ? a.value : null;
}
function Ja(e, t) {
  let n = parseInt(e, 10);
  Number.isNaN(n) && (n = 0);
  const o = parseInt(t, 10) || 0, r = n < 0 || Object.is(n, -0) ? -o : o;
  return n * 60 + r;
}
function dg(e) {
  const t = Number(e);
  if (typeof e == "boolean" || e === "" || Number.isNaN(t))
    throw new $e(`Invalid unit value ${e}`);
  return t;
}
function pa(e, t) {
  const n = {};
  for (const o in e)
    if (qo(e, o)) {
      const r = e[o];
      if (r == null)
        continue;
      n[t(o)] = dg(r);
    }
  return n;
}
function Jr(e, t) {
  const n = Math.trunc(Math.abs(e / 60)), o = Math.trunc(Math.abs(e % 60)), r = e >= 0 ? "+" : "-";
  switch (t) {
    case "short":
      return `${r}${fe(n, 2)}:${fe(o, 2)}`;
    case "narrow":
      return `${r}${n}${o > 0 ? `:${o}` : ""}`;
    case "techie":
      return `${r}${fe(n, 2)}${fe(o, 2)}`;
    default:
      throw new RangeError(`Value format ${t} is out of range for property format`);
  }
}
function Xa(e) {
  return J_(e, ["hour", "minute", "second", "millisecond"]);
}
const eP = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
], hg = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
], tP = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
function mg(e) {
  switch (e) {
    case "narrow":
      return [...tP];
    case "short":
      return [...hg];
    case "long":
      return [...eP];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    case "2-digit":
      return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    default:
      return null;
  }
}
const pg = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
], yg = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], nP = ["M", "T", "W", "T", "F", "S", "S"];
function gg(e) {
  switch (e) {
    case "narrow":
      return [...nP];
    case "short":
      return [...yg];
    case "long":
      return [...pg];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7"];
    default:
      return null;
  }
}
const vg = ["AM", "PM"], oP = ["Before Christ", "Anno Domini"], rP = ["BC", "AD"], iP = ["B", "A"];
function bg(e) {
  switch (e) {
    case "narrow":
      return [...iP];
    case "short":
      return [...rP];
    case "long":
      return [...oP];
    default:
      return null;
  }
}
function sP(e) {
  return vg[e.hour < 12 ? 0 : 1];
}
function aP(e, t) {
  return gg(t)[e.weekday - 1];
}
function lP(e, t) {
  return mg(t)[e.month - 1];
}
function cP(e, t) {
  return bg(t)[e.year < 0 ? 0 : 1];
}
function uP(e, t, n = "always", o = !1) {
  const r = {
    years: ["year", "yr."],
    quarters: ["quarter", "qtr."],
    months: ["month", "mo."],
    weeks: ["week", "wk."],
    days: ["day", "day", "days"],
    hours: ["hour", "hr."],
    minutes: ["minute", "min."],
    seconds: ["second", "sec."]
  }, i = ["hours", "minutes", "seconds"].indexOf(e) === -1;
  if (n === "auto" && i) {
    const f = e === "days";
    switch (t) {
      case 1:
        return f ? "tomorrow" : `next ${r[e][0]}`;
      case -1:
        return f ? "yesterday" : `last ${r[e][0]}`;
      case 0:
        return f ? "today" : `this ${r[e][0]}`;
    }
  }
  const s = Object.is(t, -0) || t < 0, a = Math.abs(t), l = a === 1, c = r[e], u = o ? l ? c[1] : c[2] || c[1] : l ? r[e][0] : e;
  return s ? `${a} ${u} ago` : `in ${a} ${u}`;
}
function xd(e, t) {
  let n = "";
  for (const o of e)
    o.literal ? n += o.val : n += t(o.val);
  return n;
}
const fP = {
  D: da,
  DD: By,
  DDD: jy,
  DDDD: Uy,
  t: Wy,
  tt: Fy,
  ttt: qy,
  tttt: Vy,
  T: Hy,
  TT: Zy,
  TTT: zy,
  TTTT: Gy,
  f: Yy,
  ff: Qy,
  fff: Xy,
  ffff: tg,
  F: Ky,
  FF: Jy,
  FFF: eg,
  FFFF: ng
};
class Ie {
  static create(t, n = {}) {
    return new Ie(t, n);
  }
  static parseFormat(t) {
    let n = null, o = "", r = !1;
    const i = [];
    for (let s = 0; s < t.length; s++) {
      const a = t.charAt(s);
      a === "'" ? (o.length > 0 && i.push({ literal: r || /^\s+$/.test(o), val: o }), n = null, o = "", r = !r) : r || a === n ? o += a : (o.length > 0 && i.push({ literal: /^\s+$/.test(o), val: o }), o = a, n = a);
    }
    return o.length > 0 && i.push({ literal: r || /^\s+$/.test(o), val: o }), i;
  }
  static macroTokenToFormatOpts(t) {
    return fP[t];
  }
  constructor(t, n) {
    this.opts = n, this.loc = t, this.systemLoc = null;
  }
  formatWithSystemDefault(t, n) {
    return this.systemLoc === null && (this.systemLoc = this.loc.redefaultToSystem()), this.systemLoc.dtFormatter(t, { ...this.opts, ...n }).format();
  }
  dtFormatter(t, n = {}) {
    return this.loc.dtFormatter(t, { ...this.opts, ...n });
  }
  formatDateTime(t, n) {
    return this.dtFormatter(t, n).format();
  }
  formatDateTimeParts(t, n) {
    return this.dtFormatter(t, n).formatToParts();
  }
  formatInterval(t, n) {
    return this.dtFormatter(t.start, n).dtf.formatRange(t.start.toJSDate(), t.end.toJSDate());
  }
  resolvedOptions(t, n) {
    return this.dtFormatter(t, n).resolvedOptions();
  }
  num(t, n = 0) {
    if (this.opts.forceSimple)
      return fe(t, n);
    const o = { ...this.opts };
    return n > 0 && (o.padTo = n), this.loc.numberFormatter(o).format(t);
  }
  formatDateTimeFromString(t, n) {
    const o = this.loc.listingMode() === "en", r = this.loc.outputCalendar && this.loc.outputCalendar !== "gregory", i = (h, p) => this.loc.extract(t, h, p), s = (h) => t.isOffsetFixed && t.offset === 0 && h.allowZ ? "Z" : t.isValid ? t.zone.formatOffset(t.ts, h.format) : "", a = () => o ? sP(t) : i({ hour: "numeric", hourCycle: "h12" }, "dayperiod"), l = (h, p) => o ? lP(t, h) : i(p ? { month: h } : { month: h, day: "numeric" }, "month"), c = (h, p) => o ? aP(t, h) : i(
      p ? { weekday: h } : { weekday: h, month: "long", day: "numeric" },
      "weekday"
    ), u = (h) => {
      const p = Ie.macroTokenToFormatOpts(h);
      return p ? this.formatWithSystemDefault(t, p) : h;
    }, f = (h) => o ? cP(t, h) : i({ era: h }, "era"), d = (h) => {
      switch (h) {
        case "S":
          return this.num(t.millisecond);
        case "u":
        case "SSS":
          return this.num(t.millisecond, 3);
        case "s":
          return this.num(t.second);
        case "ss":
          return this.num(t.second, 2);
        case "uu":
          return this.num(Math.floor(t.millisecond / 10), 2);
        case "uuu":
          return this.num(Math.floor(t.millisecond / 100));
        case "m":
          return this.num(t.minute);
        case "mm":
          return this.num(t.minute, 2);
        case "h":
          return this.num(t.hour % 12 === 0 ? 12 : t.hour % 12);
        case "hh":
          return this.num(t.hour % 12 === 0 ? 12 : t.hour % 12, 2);
        case "H":
          return this.num(t.hour);
        case "HH":
          return this.num(t.hour, 2);
        case "Z":
          return s({ format: "narrow", allowZ: this.opts.allowZ });
        case "ZZ":
          return s({ format: "short", allowZ: this.opts.allowZ });
        case "ZZZ":
          return s({ format: "techie", allowZ: this.opts.allowZ });
        case "ZZZZ":
          return t.zone.offsetName(t.ts, { format: "short", locale: this.loc.locale });
        case "ZZZZZ":
          return t.zone.offsetName(t.ts, { format: "long", locale: this.loc.locale });
        case "z":
          return t.zoneName;
        case "a":
          return a();
        case "d":
          return r ? i({ day: "numeric" }, "day") : this.num(t.day);
        case "dd":
          return r ? i({ day: "2-digit" }, "day") : this.num(t.day, 2);
        case "c":
          return this.num(t.weekday);
        case "ccc":
          return c("short", !0);
        case "cccc":
          return c("long", !0);
        case "ccccc":
          return c("narrow", !0);
        case "E":
          return this.num(t.weekday);
        case "EEE":
          return c("short", !1);
        case "EEEE":
          return c("long", !1);
        case "EEEEE":
          return c("narrow", !1);
        case "L":
          return r ? i({ month: "numeric", day: "numeric" }, "month") : this.num(t.month);
        case "LL":
          return r ? i({ month: "2-digit", day: "numeric" }, "month") : this.num(t.month, 2);
        case "LLL":
          return l("short", !0);
        case "LLLL":
          return l("long", !0);
        case "LLLLL":
          return l("narrow", !0);
        case "M":
          return r ? i({ month: "numeric" }, "month") : this.num(t.month);
        case "MM":
          return r ? i({ month: "2-digit" }, "month") : this.num(t.month, 2);
        case "MMM":
          return l("short", !1);
        case "MMMM":
          return l("long", !1);
        case "MMMMM":
          return l("narrow", !1);
        case "y":
          return r ? i({ year: "numeric" }, "year") : this.num(t.year);
        case "yy":
          return r ? i({ year: "2-digit" }, "year") : this.num(t.year.toString().slice(-2), 2);
        case "yyyy":
          return r ? i({ year: "numeric" }, "year") : this.num(t.year, 4);
        case "yyyyyy":
          return r ? i({ year: "numeric" }, "year") : this.num(t.year, 6);
        case "G":
          return f("short");
        case "GG":
          return f("long");
        case "GGGGG":
          return f("narrow");
        case "kk":
          return this.num(t.weekYear.toString().slice(-2), 2);
        case "kkkk":
          return this.num(t.weekYear, 4);
        case "W":
          return this.num(t.weekNumber);
        case "WW":
          return this.num(t.weekNumber, 2);
        case "n":
          return this.num(t.localWeekNumber);
        case "nn":
          return this.num(t.localWeekNumber, 2);
        case "ii":
          return this.num(t.localWeekYear.toString().slice(-2), 2);
        case "iiii":
          return this.num(t.localWeekYear, 4);
        case "o":
          return this.num(t.ordinal);
        case "ooo":
          return this.num(t.ordinal, 3);
        case "q":
          return this.num(t.quarter);
        case "qq":
          return this.num(t.quarter, 2);
        case "X":
          return this.num(Math.floor(t.ts / 1e3));
        case "x":
          return this.num(t.ts);
        default:
          return u(h);
      }
    };
    return xd(Ie.parseFormat(n), d);
  }
  formatDurationFromString(t, n) {
    const o = (l) => {
      switch (l[0]) {
        case "S":
          return "millisecond";
        case "s":
          return "second";
        case "m":
          return "minute";
        case "h":
          return "hour";
        case "d":
          return "day";
        case "w":
          return "week";
        case "M":
          return "month";
        case "y":
          return "year";
        default:
          return null;
      }
    }, r = (l) => (c) => {
      const u = o(c);
      return u ? this.num(l.get(u), c.length) : c;
    }, i = Ie.parseFormat(n), s = i.reduce(
      (l, { literal: c, val: u }) => c ? l : l.concat(u),
      []
    ), a = t.shiftTo(...s.map(o).filter((l) => l));
    return xd(i, r(a));
  }
}
const Ig = /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;
function ir(...e) {
  const t = e.reduce((n, o) => n + o.source, "");
  return RegExp(`^${t}$`);
}
function sr(...e) {
  return (t) => e.reduce(
    ([n, o, r], i) => {
      const [s, a, l] = i(t, r);
      return [{ ...n, ...s }, a || o, l];
    },
    [{}, null, 1]
  ).slice(0, 2);
}
function ar(e, ...t) {
  if (e == null)
    return [null, null];
  for (const [n, o] of t) {
    const r = n.exec(e);
    if (r)
      return o(r);
  }
  return [null, null];
}
function Tg(...e) {
  return (t, n) => {
    const o = {};
    let r;
    for (r = 0; r < e.length; r++)
      o[e[r]] = nn(t[n + r]);
    return [o, null, n + r];
  };
}
const wg = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/, dP = `(?:${wg.source}?(?:\\[(${Ig.source})\\])?)?`, Lu = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/, Cg = RegExp(`${Lu.source}${dP}`), Ru = RegExp(`(?:T${Cg.source})?`), hP = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/, mP = /(\d{4})-?W(\d\d)(?:-?(\d))?/, pP = /(\d{4})-?(\d{3})/, yP = Tg("weekYear", "weekNumber", "weekDay"), gP = Tg("year", "ordinal"), vP = /(\d{4})-(\d\d)-(\d\d)/, Og = RegExp(
  `${Lu.source} ?(?:${wg.source}|(${Ig.source}))?`
), bP = RegExp(`(?: ${Og.source})?`);
function ko(e, t, n) {
  const o = e[t];
  return N(o) ? n : nn(o);
}
function IP(e, t) {
  return [{
    year: ko(e, t),
    month: ko(e, t + 1, 1),
    day: ko(e, t + 2, 1)
  }, null, t + 3];
}
function lr(e, t) {
  return [{
    hours: ko(e, t, 0),
    minutes: ko(e, t + 1, 0),
    seconds: ko(e, t + 2, 0),
    milliseconds: ku(e[t + 3])
  }, null, t + 4];
}
function Wi(e, t) {
  const n = !e[t] && !e[t + 1], o = Ja(e[t + 1], e[t + 2]), r = n ? null : Oe.instance(o);
  return [{}, r, t + 3];
}
function Fi(e, t) {
  const n = e[t] ? Wt.create(e[t]) : null;
  return [{}, n, t + 1];
}
const TP = RegExp(`^T?${Lu.source}$`), wP = /^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;
function CP(e) {
  const [t, n, o, r, i, s, a, l, c] = e, u = t[0] === "-", f = l && l[0] === "-", d = (h, p = !1) => h !== void 0 && (p || h && u) ? -h : h;
  return [
    {
      years: d(vn(n)),
      months: d(vn(o)),
      weeks: d(vn(r)),
      days: d(vn(i)),
      hours: d(vn(s)),
      minutes: d(vn(a)),
      seconds: d(vn(l), l === "-0"),
      milliseconds: d(ku(c), f)
    }
  ];
}
const OP = {
  GMT: 0,
  EDT: -4 * 60,
  EST: -5 * 60,
  CDT: -5 * 60,
  CST: -6 * 60,
  MDT: -6 * 60,
  MST: -7 * 60,
  PDT: -7 * 60,
  PST: -8 * 60
};
function _u(e, t, n, o, r, i, s) {
  const a = {
    year: t.length === 2 ? ic(nn(t)) : nn(t),
    month: hg.indexOf(n) + 1,
    day: nn(o),
    hour: nn(r),
    minute: nn(i)
  };
  return s && (a.second = nn(s)), e && (a.weekday = e.length > 3 ? pg.indexOf(e) + 1 : yg.indexOf(e) + 1), a;
}
const SP = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
function EP(e) {
  const [
    ,
    t,
    n,
    o,
    r,
    i,
    s,
    a,
    l,
    c,
    u,
    f
  ] = e, d = _u(t, r, o, n, i, s, a);
  let h;
  return l ? h = OP[l] : c ? h = 0 : h = Ja(u, f), [d, new Oe(h)];
}
function xP(e) {
  return e.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim();
}
const $P = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/, AP = /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/, NP = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
function $d(e) {
  const [, t, n, o, r, i, s, a] = e;
  return [_u(t, r, o, n, i, s, a), Oe.utcInstance];
}
function MP(e) {
  const [, t, n, o, r, i, s, a] = e;
  return [_u(t, a, n, o, r, i, s), Oe.utcInstance];
}
const kP = ir(hP, Ru), DP = ir(mP, Ru), LP = ir(pP, Ru), RP = ir(Cg), Sg = sr(
  IP,
  lr,
  Wi,
  Fi
), _P = sr(
  yP,
  lr,
  Wi,
  Fi
), PP = sr(
  gP,
  lr,
  Wi,
  Fi
), BP = sr(
  lr,
  Wi,
  Fi
);
function jP(e) {
  return ar(
    e,
    [kP, Sg],
    [DP, _P],
    [LP, PP],
    [RP, BP]
  );
}
function UP(e) {
  return ar(xP(e), [SP, EP]);
}
function WP(e) {
  return ar(
    e,
    [$P, $d],
    [AP, $d],
    [NP, MP]
  );
}
function FP(e) {
  return ar(e, [wP, CP]);
}
const qP = sr(lr);
function VP(e) {
  return ar(e, [TP, qP]);
}
const HP = ir(vP, bP), ZP = ir(Og), zP = sr(
  lr,
  Wi,
  Fi
);
function GP(e) {
  return ar(
    e,
    [HP, Sg],
    [ZP, zP]
  );
}
const Ad = "Invalid Duration", Eg = {
  weeks: {
    days: 7,
    hours: 7 * 24,
    minutes: 7 * 24 * 60,
    seconds: 7 * 24 * 60 * 60,
    milliseconds: 7 * 24 * 60 * 60 * 1e3
  },
  days: {
    hours: 24,
    minutes: 24 * 60,
    seconds: 24 * 60 * 60,
    milliseconds: 24 * 60 * 60 * 1e3
  },
  hours: { minutes: 60, seconds: 60 * 60, milliseconds: 60 * 60 * 1e3 },
  minutes: { seconds: 60, milliseconds: 60 * 1e3 },
  seconds: { milliseconds: 1e3 }
}, YP = {
  years: {
    quarters: 4,
    months: 12,
    weeks: 52,
    days: 365,
    hours: 365 * 24,
    minutes: 365 * 24 * 60,
    seconds: 365 * 24 * 60 * 60,
    milliseconds: 365 * 24 * 60 * 60 * 1e3
  },
  quarters: {
    months: 3,
    weeks: 13,
    days: 91,
    hours: 91 * 24,
    minutes: 91 * 24 * 60,
    seconds: 91 * 24 * 60 * 60,
    milliseconds: 91 * 24 * 60 * 60 * 1e3
  },
  months: {
    weeks: 4,
    days: 30,
    hours: 30 * 24,
    minutes: 30 * 24 * 60,
    seconds: 30 * 24 * 60 * 60,
    milliseconds: 30 * 24 * 60 * 60 * 1e3
  },
  ...Eg
}, Ue = 146097 / 400, oo = 146097 / 4800, KP = {
  years: {
    quarters: 4,
    months: 12,
    weeks: Ue / 7,
    days: Ue,
    hours: Ue * 24,
    minutes: Ue * 24 * 60,
    seconds: Ue * 24 * 60 * 60,
    milliseconds: Ue * 24 * 60 * 60 * 1e3
  },
  quarters: {
    months: 3,
    weeks: Ue / 28,
    days: Ue / 4,
    hours: Ue * 24 / 4,
    minutes: Ue * 24 * 60 / 4,
    seconds: Ue * 24 * 60 * 60 / 4,
    milliseconds: Ue * 24 * 60 * 60 * 1e3 / 4
  },
  months: {
    weeks: oo / 7,
    days: oo,
    hours: oo * 24,
    minutes: oo * 24 * 60,
    seconds: oo * 24 * 60 * 60,
    milliseconds: oo * 24 * 60 * 60 * 1e3
  },
  ...Eg
}, Mn = [
  "years",
  "quarters",
  "months",
  "weeks",
  "days",
  "hours",
  "minutes",
  "seconds",
  "milliseconds"
], QP = Mn.slice(0).reverse();
function Gt(e, t, n = !1) {
  const o = {
    values: n ? t.values : { ...e.values, ...t.values || {} },
    loc: e.loc.clone(t.loc),
    conversionAccuracy: t.conversionAccuracy || e.conversionAccuracy,
    matrix: t.matrix || e.matrix
  };
  return new W(o);
}
function xg(e, t) {
  let n = t.milliseconds ?? 0;
  for (const o of QP.slice(1))
    t[o] && (n += t[o] * e[o].milliseconds);
  return n;
}
function Nd(e, t) {
  const n = xg(e, t) < 0 ? -1 : 1;
  Mn.reduceRight((o, r) => {
    if (N(t[r]))
      return o;
    if (o) {
      const i = t[o] * n, s = e[r][o], a = Math.floor(i / s);
      t[r] += a * n, t[o] -= a * s * n;
    }
    return r;
  }, null), Mn.reduce((o, r) => {
    if (N(t[r]))
      return o;
    if (o) {
      const i = t[o] % 1;
      t[o] -= i, t[r] += i * e[o][r];
    }
    return r;
  }, null);
}
function JP(e) {
  const t = {};
  for (const [n, o] of Object.entries(e))
    o !== 0 && (t[n] = o);
  return t;
}
class W {
  /**
   * @private
   */
  constructor(t) {
    const n = t.conversionAccuracy === "longterm" || !1;
    let o = n ? KP : YP;
    t.matrix && (o = t.matrix), this.values = t.values, this.loc = t.loc || H.create(), this.conversionAccuracy = n ? "longterm" : "casual", this.invalid = t.invalid || null, this.matrix = o, this.isLuxonDuration = !0;
  }
  /**
   * Create Duration from a number of milliseconds.
   * @param {number} count of milliseconds
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */
  static fromMillis(t, n) {
    return W.fromObject({ milliseconds: t }, n);
  }
  /**
   * Create a Duration from a JavaScript object with keys like 'years' and 'hours'.
   * If this object is empty then a zero milliseconds duration is returned.
   * @param {Object} obj - the object to create the DateTime from
   * @param {number} obj.years
   * @param {number} obj.quarters
   * @param {number} obj.months
   * @param {number} obj.weeks
   * @param {number} obj.days
   * @param {number} obj.hours
   * @param {number} obj.minutes
   * @param {number} obj.seconds
   * @param {number} obj.milliseconds
   * @param {Object} [opts=[]] - options for creating this Duration
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
   * @param {string} [opts.matrix=Object] - the custom conversion system to use
   * @return {Duration}
   */
  static fromObject(t, n = {}) {
    if (t == null || typeof t != "object")
      throw new $e(
        `Duration.fromObject: argument expected to be an object, got ${t === null ? "null" : typeof t}`
      );
    return new W({
      values: pa(t, W.normalizeUnit),
      loc: H.fromObject(n),
      conversionAccuracy: n.conversionAccuracy,
      matrix: n.matrix
    });
  }
  /**
   * Create a Duration from DurationLike.
   *
   * @param {Object | number | Duration} durationLike
   * One of:
   * - object with keys like 'years' and 'hours'.
   * - number representing milliseconds
   * - Duration instance
   * @return {Duration}
   */
  static fromDurationLike(t) {
    if (Pn(t))
      return W.fromMillis(t);
    if (W.isDuration(t))
      return t;
    if (typeof t == "object")
      return W.fromObject(t);
    throw new $e(
      `Unknown duration argument ${t} of type ${typeof t}`
    );
  }
  /**
   * Create a Duration from an ISO 8601 duration string.
   * @param {string} text - text to parse
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
   * @param {string} [opts.matrix=Object] - the preset conversion system to use
   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
   * @example Duration.fromISO('P3Y6M1W4DT12H30M5S').toObject() //=> { years: 3, months: 6, weeks: 1, days: 4, hours: 12, minutes: 30, seconds: 5 }
   * @example Duration.fromISO('PT23H').toObject() //=> { hours: 23 }
   * @example Duration.fromISO('P5Y3M').toObject() //=> { years: 5, months: 3 }
   * @return {Duration}
   */
  static fromISO(t, n) {
    const [o] = FP(t);
    return o ? W.fromObject(o, n) : W.invalid("unparsable", `the input "${t}" can't be parsed as ISO 8601`);
  }
  /**
   * Create a Duration from an ISO 8601 time string.
   * @param {string} text - text to parse
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
   * @param {string} [opts.matrix=Object] - the conversion system to use
   * @see https://en.wikipedia.org/wiki/ISO_8601#Times
   * @example Duration.fromISOTime('11:22:33.444').toObject() //=> { hours: 11, minutes: 22, seconds: 33, milliseconds: 444 }
   * @example Duration.fromISOTime('11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('T11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('T1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @return {Duration}
   */
  static fromISOTime(t, n) {
    const [o] = VP(t);
    return o ? W.fromObject(o, n) : W.invalid("unparsable", `the input "${t}" can't be parsed as ISO 8601`);
  }
  /**
   * Create an invalid Duration.
   * @param {string} reason - simple string of why this datetime is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {Duration}
   */
  static invalid(t, n = null) {
    if (!t)
      throw new $e("need to specify a reason the Duration is invalid");
    const o = t instanceof ct ? t : new ct(t, n);
    if (le.throwOnInvalid)
      throw new S_(o);
    return new W({ invalid: o });
  }
  /**
   * @private
   */
  static normalizeUnit(t) {
    const n = {
      year: "years",
      years: "years",
      quarter: "quarters",
      quarters: "quarters",
      month: "months",
      months: "months",
      week: "weeks",
      weeks: "weeks",
      day: "days",
      days: "days",
      hour: "hours",
      hours: "hours",
      minute: "minutes",
      minutes: "minutes",
      second: "seconds",
      seconds: "seconds",
      millisecond: "milliseconds",
      milliseconds: "milliseconds"
    }[t && t.toLowerCase()];
    if (!n)
      throw new Py(t);
    return n;
  }
  /**
   * Check if an object is a Duration. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  static isDuration(t) {
    return t && t.isLuxonDuration || !1;
  }
  /**
   * Get  the locale of a Duration, such 'en-GB'
   * @type {string}
   */
  get locale() {
    return this.isValid ? this.loc.locale : null;
  }
  /**
   * Get the numbering system of a Duration, such 'beng'. The numbering system is used when formatting the Duration
   *
   * @type {string}
   */
  get numberingSystem() {
    return this.isValid ? this.loc.numberingSystem : null;
  }
  /**
   * Returns a string representation of this Duration formatted according to the specified format string. You may use these tokens:
   * * `S` for milliseconds
   * * `s` for seconds
   * * `m` for minutes
   * * `h` for hours
   * * `d` for days
   * * `w` for weeks
   * * `M` for months
   * * `y` for years
   * Notes:
   * * Add padding by repeating the token, e.g. "yy" pads the years to two digits, "hhhh" pads the hours out to four digits
   * * Tokens can be escaped by wrapping with single quotes.
   * * The duration will be converted to the set of units in the format string using {@link Duration#shiftTo} and the Durations's conversion accuracy setting.
   * @param {string} fmt - the format string
   * @param {Object} opts - options
   * @param {boolean} [opts.floor=true] - floor numerical values
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("y d s") //=> "1 6 2"
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("yy dd sss") //=> "01 06 002"
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("M S") //=> "12 518402000"
   * @return {string}
   */
  toFormat(t, n = {}) {
    const o = {
      ...n,
      floor: n.round !== !1 && n.floor !== !1
    };
    return this.isValid ? Ie.create(this.loc, o).formatDurationFromString(this, t) : Ad;
  }
  /**
   * Returns a string representation of a Duration with all units included.
   * To modify its behavior, use `listStyle` and any Intl.NumberFormat option, though `unitDisplay` is especially relevant.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options
   * @param {Object} opts - Formatting options. Accepts the same keys as the options parameter of the native `Intl.NumberFormat` constructor, as well as `listStyle`.
   * @param {string} [opts.listStyle='narrow'] - How to format the merged list. Corresponds to the `style` property of the options parameter of the native `Intl.ListFormat` constructor.
   * @example
   * ```js
   * var dur = Duration.fromObject({ days: 1, hours: 5, minutes: 6 })
   * dur.toHuman() //=> '1 day, 5 hours, 6 minutes'
   * dur.toHuman({ listStyle: "long" }) //=> '1 day, 5 hours, and 6 minutes'
   * dur.toHuman({ unitDisplay: "short" }) //=> '1 day, 5 hr, 6 min'
   * ```
   */
  toHuman(t = {}) {
    if (!this.isValid)
      return Ad;
    const n = Mn.map((o) => {
      const r = this.values[o];
      return N(r) ? null : this.loc.numberFormatter({ style: "unit", unitDisplay: "long", ...t, unit: o.slice(0, -1) }).format(r);
    }).filter((o) => o);
    return this.loc.listFormatter({ type: "conjunction", style: t.listStyle || "narrow", ...t }).format(n);
  }
  /**
   * Returns a JavaScript object with this Duration's values.
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toObject() //=> { years: 1, days: 6, seconds: 2 }
   * @return {Object}
   */
  toObject() {
    return this.isValid ? { ...this.values } : {};
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Duration.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
   * @example Duration.fromObject({ years: 3, seconds: 45 }).toISO() //=> 'P3YT45S'
   * @example Duration.fromObject({ months: 4, seconds: 45 }).toISO() //=> 'P4MT45S'
   * @example Duration.fromObject({ months: 5 }).toISO() //=> 'P5M'
   * @example Duration.fromObject({ minutes: 5 }).toISO() //=> 'PT5M'
   * @example Duration.fromObject({ milliseconds: 6 }).toISO() //=> 'PT0.006S'
   * @return {string}
   */
  toISO() {
    if (!this.isValid)
      return null;
    let t = "P";
    return this.years !== 0 && (t += this.years + "Y"), (this.months !== 0 || this.quarters !== 0) && (t += this.months + this.quarters * 3 + "M"), this.weeks !== 0 && (t += this.weeks + "W"), this.days !== 0 && (t += this.days + "D"), (this.hours !== 0 || this.minutes !== 0 || this.seconds !== 0 || this.milliseconds !== 0) && (t += "T"), this.hours !== 0 && (t += this.hours + "H"), this.minutes !== 0 && (t += this.minutes + "M"), (this.seconds !== 0 || this.milliseconds !== 0) && (t += Du(this.seconds + this.milliseconds / 1e3, 3) + "S"), t === "P" && (t += "T0S"), t;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Duration, formatted as a time of day.
   * Note that this will return null if the duration is invalid, negative, or equal to or greater than 24 hours.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Times
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example Duration.fromObject({ hours: 11 }).toISOTime() //=> '11:00:00.000'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressMilliseconds: true }) //=> '11:00:00'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressSeconds: true }) //=> '11:00'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ includePrefix: true }) //=> 'T11:00:00.000'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ format: 'basic' }) //=> '110000.000'
   * @return {string}
   */
  toISOTime(t = {}) {
    if (!this.isValid)
      return null;
    const n = this.toMillis();
    return n < 0 || n >= 864e5 ? null : (t = {
      suppressMilliseconds: !1,
      suppressSeconds: !1,
      includePrefix: !1,
      format: "extended",
      ...t,
      includeOffset: !1
    }, D.fromMillis(n, { zone: "UTC" }).toISOTime(t));
  }
  /**
   * Returns an ISO 8601 representation of this Duration appropriate for use in JSON.
   * @return {string}
   */
  toJSON() {
    return this.toISO();
  }
  /**
   * Returns an ISO 8601 representation of this Duration appropriate for use in debugging.
   * @return {string}
   */
  toString() {
    return this.toISO();
  }
  /**
   * Returns a string representation of this Duration appropriate for the REPL.
   * @return {string}
   */
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.isValid ? `Duration { values: ${JSON.stringify(this.values)} }` : `Duration { Invalid, reason: ${this.invalidReason} }`;
  }
  /**
   * Returns an milliseconds value of this Duration.
   * @return {number}
   */
  toMillis() {
    return this.isValid ? xg(this.matrix, this.values) : NaN;
  }
  /**
   * Returns an milliseconds value of this Duration. Alias of {@link toMillis}
   * @return {number}
   */
  valueOf() {
    return this.toMillis();
  }
  /**
   * Make this Duration longer by the specified amount. Return a newly-constructed Duration.
   * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @return {Duration}
   */
  plus(t) {
    if (!this.isValid)
      return this;
    const n = W.fromDurationLike(t), o = {};
    for (const r of Mn)
      (qo(n.values, r) || qo(this.values, r)) && (o[r] = n.get(r) + this.get(r));
    return Gt(this, { values: o }, !0);
  }
  /**
   * Make this Duration shorter by the specified amount. Return a newly-constructed Duration.
   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @return {Duration}
   */
  minus(t) {
    if (!this.isValid)
      return this;
    const n = W.fromDurationLike(t);
    return this.plus(n.negate());
  }
  /**
   * Scale this Duration by the specified amount. Return a newly-constructed Duration.
   * @param {function} fn - The function to apply to each unit. Arity is 1 or 2: the value of the unit and, optionally, the unit name. Must return a number.
   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits(x => x * 2) //=> { hours: 2, minutes: 60 }
   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits((x, u) => u === "hours" ? x * 2 : x) //=> { hours: 2, minutes: 30 }
   * @return {Duration}
   */
  mapUnits(t) {
    if (!this.isValid)
      return this;
    const n = {};
    for (const o of Object.keys(this.values))
      n[o] = dg(t(this.values[o], o));
    return Gt(this, { values: n }, !0);
  }
  /**
   * Get the value of unit.
   * @param {string} unit - a unit such as 'minute' or 'day'
   * @example Duration.fromObject({years: 2, days: 3}).get('years') //=> 2
   * @example Duration.fromObject({years: 2, days: 3}).get('months') //=> 0
   * @example Duration.fromObject({years: 2, days: 3}).get('days') //=> 3
   * @return {number}
   */
  get(t) {
    return this[W.normalizeUnit(t)];
  }
  /**
   * "Set" the values of specified units. Return a newly-constructed Duration.
   * @param {Object} values - a mapping of units to numbers
   * @example dur.set({ years: 2017 })
   * @example dur.set({ hours: 8, minutes: 30 })
   * @return {Duration}
   */
  set(t) {
    if (!this.isValid)
      return this;
    const n = { ...this.values, ...pa(t, W.normalizeUnit) };
    return Gt(this, { values: n });
  }
  /**
   * "Set" the locale and/or numberingSystem.  Returns a newly-constructed Duration.
   * @example dur.reconfigure({ locale: 'en-GB' })
   * @return {Duration}
   */
  reconfigure({ locale: t, numberingSystem: n, conversionAccuracy: o, matrix: r } = {}) {
    const s = { loc: this.loc.clone({ locale: t, numberingSystem: n }), matrix: r, conversionAccuracy: o };
    return Gt(this, s);
  }
  /**
   * Return the length of the duration in the specified unit.
   * @param {string} unit - a unit such as 'minutes' or 'days'
   * @example Duration.fromObject({years: 1}).as('days') //=> 365
   * @example Duration.fromObject({years: 1}).as('months') //=> 12
   * @example Duration.fromObject({hours: 60}).as('days') //=> 2.5
   * @return {number}
   */
  as(t) {
    return this.isValid ? this.shiftTo(t).get(t) : NaN;
  }
  /**
   * Reduce this Duration to its canonical representation in its current units.
   * Assuming the overall value of the Duration is positive, this means:
   * - excessive values for lower-order units are converted to higher-order units (if possible, see first and second example)
   * - negative lower-order units are converted to higher order units (there must be such a higher order unit, otherwise
   *   the overall value would be negative, see third example)
   * - fractional values for higher-order units are converted to lower-order units (if possible, see fourth example)
   *
   * If the overall value is negative, the result of this method is equivalent to `this.negate().normalize().negate()`.
   * @example Duration.fromObject({ years: 2, days: 5000 }).normalize().toObject() //=> { years: 15, days: 255 }
   * @example Duration.fromObject({ days: 5000 }).normalize().toObject() //=> { days: 5000 }
   * @example Duration.fromObject({ hours: 12, minutes: -45 }).normalize().toObject() //=> { hours: 11, minutes: 15 }
   * @example Duration.fromObject({ years: 2.5, days: 0, hours: 0 }).normalize().toObject() //=> { years: 2, days: 182, hours: 12 }
   * @return {Duration}
   */
  normalize() {
    if (!this.isValid)
      return this;
    const t = this.toObject();
    return Nd(this.matrix, t), Gt(this, { values: t }, !0);
  }
  /**
   * Rescale units to its largest representation
   * @example Duration.fromObject({ milliseconds: 90000 }).rescale().toObject() //=> { minutes: 1, seconds: 30 }
   * @return {Duration}
   */
  rescale() {
    if (!this.isValid)
      return this;
    const t = JP(this.normalize().shiftToAll().toObject());
    return Gt(this, { values: t }, !0);
  }
  /**
   * Convert this Duration into its representation in a different set of units.
   * @example Duration.fromObject({ hours: 1, seconds: 30 }).shiftTo('minutes', 'milliseconds').toObject() //=> { minutes: 60, milliseconds: 30000 }
   * @return {Duration}
   */
  shiftTo(...t) {
    if (!this.isValid)
      return this;
    if (t.length === 0)
      return this;
    t = t.map((s) => W.normalizeUnit(s));
    const n = {}, o = {}, r = this.toObject();
    let i;
    for (const s of Mn)
      if (t.indexOf(s) >= 0) {
        i = s;
        let a = 0;
        for (const c in o)
          a += this.matrix[c][s] * o[c], o[c] = 0;
        Pn(r[s]) && (a += r[s]);
        const l = Math.trunc(a);
        n[s] = l, o[s] = (a * 1e3 - l * 1e3) / 1e3;
      } else
        Pn(r[s]) && (o[s] = r[s]);
    for (const s in o)
      o[s] !== 0 && (n[i] += s === i ? o[s] : o[s] / this.matrix[i][s]);
    return Nd(this.matrix, n), Gt(this, { values: n }, !0);
  }
  /**
   * Shift this Duration to all available units.
   * Same as shiftTo("years", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds")
   * @return {Duration}
   */
  shiftToAll() {
    return this.isValid ? this.shiftTo(
      "years",
      "months",
      "weeks",
      "days",
      "hours",
      "minutes",
      "seconds",
      "milliseconds"
    ) : this;
  }
  /**
   * Return the negative of this Duration.
   * @example Duration.fromObject({ hours: 1, seconds: 30 }).negate().toObject() //=> { hours: -1, seconds: -30 }
   * @return {Duration}
   */
  negate() {
    if (!this.isValid)
      return this;
    const t = {};
    for (const n of Object.keys(this.values))
      t[n] = this.values[n] === 0 ? 0 : -this.values[n];
    return Gt(this, { values: t }, !0);
  }
  /**
   * Get the years.
   * @type {number}
   */
  get years() {
    return this.isValid ? this.values.years || 0 : NaN;
  }
  /**
   * Get the quarters.
   * @type {number}
   */
  get quarters() {
    return this.isValid ? this.values.quarters || 0 : NaN;
  }
  /**
   * Get the months.
   * @type {number}
   */
  get months() {
    return this.isValid ? this.values.months || 0 : NaN;
  }
  /**
   * Get the weeks
   * @type {number}
   */
  get weeks() {
    return this.isValid ? this.values.weeks || 0 : NaN;
  }
  /**
   * Get the days.
   * @type {number}
   */
  get days() {
    return this.isValid ? this.values.days || 0 : NaN;
  }
  /**
   * Get the hours.
   * @type {number}
   */
  get hours() {
    return this.isValid ? this.values.hours || 0 : NaN;
  }
  /**
   * Get the minutes.
   * @type {number}
   */
  get minutes() {
    return this.isValid ? this.values.minutes || 0 : NaN;
  }
  /**
   * Get the seconds.
   * @return {number}
   */
  get seconds() {
    return this.isValid ? this.values.seconds || 0 : NaN;
  }
  /**
   * Get the milliseconds.
   * @return {number}
   */
  get milliseconds() {
    return this.isValid ? this.values.milliseconds || 0 : NaN;
  }
  /**
   * Returns whether the Duration is invalid. Invalid durations are returned by diff operations
   * on invalid DateTimes or Intervals.
   * @return {boolean}
   */
  get isValid() {
    return this.invalid === null;
  }
  /**
   * Returns an error code if this Duration became invalid, or null if the Duration is valid
   * @return {string}
   */
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  /**
   * Returns an explanation of why this Duration became invalid, or null if the Duration is valid
   * @type {string}
   */
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  /**
   * Equality check
   * Two Durations are equal iff they have the same units and the same values for each unit.
   * @param {Duration} other
   * @return {boolean}
   */
  equals(t) {
    if (!this.isValid || !t.isValid || !this.loc.equals(t.loc))
      return !1;
    function n(o, r) {
      return o === void 0 || o === 0 ? r === void 0 || r === 0 : o === r;
    }
    for (const o of Mn)
      if (!n(this.values[o], t.values[o]))
        return !1;
    return !0;
  }
}
const ro = "Invalid Interval";
function XP(e, t) {
  return !e || !e.isValid ? se.invalid("missing or invalid start") : !t || !t.isValid ? se.invalid("missing or invalid end") : t < e ? se.invalid(
    "end before start",
    `The end of an interval must be after its start, but you had start=${e.toISO()} and end=${t.toISO()}`
  ) : null;
}
class se {
  /**
   * @private
   */
  constructor(t) {
    this.s = t.start, this.e = t.end, this.invalid = t.invalid || null, this.isLuxonInterval = !0;
  }
  /**
   * Create an invalid Interval.
   * @param {string} reason - simple string of why this Interval is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {Interval}
   */
  static invalid(t, n = null) {
    if (!t)
      throw new $e("need to specify a reason the Interval is invalid");
    const o = t instanceof ct ? t : new ct(t, n);
    if (le.throwOnInvalid)
      throw new O_(o);
    return new se({ invalid: o });
  }
  /**
   * Create an Interval from a start DateTime and an end DateTime. Inclusive of the start but not the end.
   * @param {DateTime|Date|Object} start
   * @param {DateTime|Date|Object} end
   * @return {Interval}
   */
  static fromDateTimes(t, n) {
    const o = br(t), r = br(n), i = XP(o, r);
    return i ?? new se({
      start: o,
      end: r
    });
  }
  /**
   * Create an Interval from a start DateTime and a Duration to extend to.
   * @param {DateTime|Date|Object} start
   * @param {Duration|Object|number} duration - the length of the Interval.
   * @return {Interval}
   */
  static after(t, n) {
    const o = W.fromDurationLike(n), r = br(t);
    return se.fromDateTimes(r, r.plus(o));
  }
  /**
   * Create an Interval from an end DateTime and a Duration to extend backwards to.
   * @param {DateTime|Date|Object} end
   * @param {Duration|Object|number} duration - the length of the Interval.
   * @return {Interval}
   */
  static before(t, n) {
    const o = W.fromDurationLike(n), r = br(t);
    return se.fromDateTimes(r.minus(o), r);
  }
  /**
   * Create an Interval from an ISO 8601 string.
   * Accepts `<start>/<end>`, `<start>/<duration>`, and `<duration>/<end>` formats.
   * @param {string} text - the ISO string to parse
   * @param {Object} [opts] - options to pass {@link DateTime#fromISO} and optionally {@link Duration#fromISO}
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @return {Interval}
   */
  static fromISO(t, n) {
    const [o, r] = (t || "").split("/", 2);
    if (o && r) {
      let i, s;
      try {
        i = D.fromISO(o, n), s = i.isValid;
      } catch {
        s = !1;
      }
      let a, l;
      try {
        a = D.fromISO(r, n), l = a.isValid;
      } catch {
        l = !1;
      }
      if (s && l)
        return se.fromDateTimes(i, a);
      if (s) {
        const c = W.fromISO(r, n);
        if (c.isValid)
          return se.after(i, c);
      } else if (l) {
        const c = W.fromISO(o, n);
        if (c.isValid)
          return se.before(a, c);
      }
    }
    return se.invalid("unparsable", `the input "${t}" can't be parsed as ISO 8601`);
  }
  /**
   * Check if an object is an Interval. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  static isInterval(t) {
    return t && t.isLuxonInterval || !1;
  }
  /**
   * Returns the start of the Interval
   * @type {DateTime}
   */
  get start() {
    return this.isValid ? this.s : null;
  }
  /**
   * Returns the end of the Interval
   * @type {DateTime}
   */
  get end() {
    return this.isValid ? this.e : null;
  }
  /**
   * Returns whether this Interval's end is at least its start, meaning that the Interval isn't 'backwards'.
   * @type {boolean}
   */
  get isValid() {
    return this.invalidReason === null;
  }
  /**
   * Returns an error code if this Interval is invalid, or null if the Interval is valid
   * @type {string}
   */
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  /**
   * Returns an explanation of why this Interval became invalid, or null if the Interval is valid
   * @type {string}
   */
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  /**
   * Returns the length of the Interval in the specified unit.
   * @param {string} unit - the unit (such as 'hours' or 'days') to return the length in.
   * @return {number}
   */
  length(t = "milliseconds") {
    return this.isValid ? this.toDuration(t).get(t) : NaN;
  }
  /**
   * Returns the count of minutes, hours, days, months, or years included in the Interval, even in part.
   * Unlike {@link Interval#length} this counts sections of the calendar, not periods of time, e.g. specifying 'day'
   * asks 'what dates are included in this interval?', not 'how many days long is this interval?'
   * @param {string} [unit='milliseconds'] - the unit of time to count.
   * @param {Object} opts - options
   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week; this operation will always use the locale of the start DateTime
   * @return {number}
   */
  count(t = "milliseconds", n) {
    if (!this.isValid)
      return NaN;
    const o = this.start.startOf(t, n);
    let r;
    return n != null && n.useLocaleWeeks ? r = this.end.reconfigure({ locale: o.locale }) : r = this.end, r = r.startOf(t, n), Math.floor(r.diff(o, t).get(t)) + (r.valueOf() !== this.end.valueOf());
  }
  /**
   * Returns whether this Interval's start and end are both in the same unit of time
   * @param {string} unit - the unit of time to check sameness on
   * @return {boolean}
   */
  hasSame(t) {
    return this.isValid ? this.isEmpty() || this.e.minus(1).hasSame(this.s, t) : !1;
  }
  /**
   * Return whether this Interval has the same start and end DateTimes.
   * @return {boolean}
   */
  isEmpty() {
    return this.s.valueOf() === this.e.valueOf();
  }
  /**
   * Return whether this Interval's start is after the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  isAfter(t) {
    return this.isValid ? this.s > t : !1;
  }
  /**
   * Return whether this Interval's end is before the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  isBefore(t) {
    return this.isValid ? this.e <= t : !1;
  }
  /**
   * Return whether this Interval contains the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  contains(t) {
    return this.isValid ? this.s <= t && this.e > t : !1;
  }
  /**
   * "Sets" the start and/or end dates. Returns a newly-constructed Interval.
   * @param {Object} values - the values to set
   * @param {DateTime} values.start - the starting DateTime
   * @param {DateTime} values.end - the ending DateTime
   * @return {Interval}
   */
  set({ start: t, end: n } = {}) {
    return this.isValid ? se.fromDateTimes(t || this.s, n || this.e) : this;
  }
  /**
   * Split this Interval at each of the specified DateTimes
   * @param {...DateTime} dateTimes - the unit of time to count.
   * @return {Array}
   */
  splitAt(...t) {
    if (!this.isValid)
      return [];
    const n = t.map(br).filter((s) => this.contains(s)).sort((s, a) => s.toMillis() - a.toMillis()), o = [];
    let { s: r } = this, i = 0;
    for (; r < this.e; ) {
      const s = n[i] || this.e, a = +s > +this.e ? this.e : s;
      o.push(se.fromDateTimes(r, a)), r = a, i += 1;
    }
    return o;
  }
  /**
   * Split this Interval into smaller Intervals, each of the specified length.
   * Left over time is grouped into a smaller interval
   * @param {Duration|Object|number} duration - The length of each resulting interval.
   * @return {Array}
   */
  splitBy(t) {
    const n = W.fromDurationLike(t);
    if (!this.isValid || !n.isValid || n.as("milliseconds") === 0)
      return [];
    let { s: o } = this, r = 1, i;
    const s = [];
    for (; o < this.e; ) {
      const a = this.start.plus(n.mapUnits((l) => l * r));
      i = +a > +this.e ? this.e : a, s.push(se.fromDateTimes(o, i)), o = i, r += 1;
    }
    return s;
  }
  /**
   * Split this Interval into the specified number of smaller intervals.
   * @param {number} numberOfParts - The number of Intervals to divide the Interval into.
   * @return {Array}
   */
  divideEqually(t) {
    return this.isValid ? this.splitBy(this.length() / t).slice(0, t) : [];
  }
  /**
   * Return whether this Interval overlaps with the specified Interval
   * @param {Interval} other
   * @return {boolean}
   */
  overlaps(t) {
    return this.e > t.s && this.s < t.e;
  }
  /**
   * Return whether this Interval's end is adjacent to the specified Interval's start.
   * @param {Interval} other
   * @return {boolean}
   */
  abutsStart(t) {
    return this.isValid ? +this.e == +t.s : !1;
  }
  /**
   * Return whether this Interval's start is adjacent to the specified Interval's end.
   * @param {Interval} other
   * @return {boolean}
   */
  abutsEnd(t) {
    return this.isValid ? +t.e == +this.s : !1;
  }
  /**
   * Return whether this Interval engulfs the start and end of the specified Interval.
   * @param {Interval} other
   * @return {boolean}
   */
  engulfs(t) {
    return this.isValid ? this.s <= t.s && this.e >= t.e : !1;
  }
  /**
   * Return whether this Interval has the same start and end as the specified Interval.
   * @param {Interval} other
   * @return {boolean}
   */
  equals(t) {
    return !this.isValid || !t.isValid ? !1 : this.s.equals(t.s) && this.e.equals(t.e);
  }
  /**
   * Return an Interval representing the intersection of this Interval and the specified Interval.
   * Specifically, the resulting Interval has the maximum start time and the minimum end time of the two Intervals.
   * Returns null if the intersection is empty, meaning, the intervals don't intersect.
   * @param {Interval} other
   * @return {Interval}
   */
  intersection(t) {
    if (!this.isValid)
      return this;
    const n = this.s > t.s ? this.s : t.s, o = this.e < t.e ? this.e : t.e;
    return n >= o ? null : se.fromDateTimes(n, o);
  }
  /**
   * Return an Interval representing the union of this Interval and the specified Interval.
   * Specifically, the resulting Interval has the minimum start time and the maximum end time of the two Intervals.
   * @param {Interval} other
   * @return {Interval}
   */
  union(t) {
    if (!this.isValid)
      return this;
    const n = this.s < t.s ? this.s : t.s, o = this.e > t.e ? this.e : t.e;
    return se.fromDateTimes(n, o);
  }
  /**
   * Merge an array of Intervals into a equivalent minimal set of Intervals.
   * Combines overlapping and adjacent Intervals.
   * @param {Array} intervals
   * @return {Array}
   */
  static merge(t) {
    const [n, o] = t.sort((r, i) => r.s - i.s).reduce(
      ([r, i], s) => i ? i.overlaps(s) || i.abutsStart(s) ? [r, i.union(s)] : [r.concat([i]), s] : [r, s],
      [[], null]
    );
    return o && n.push(o), n;
  }
  /**
   * Return an array of Intervals representing the spans of time that only appear in one of the specified Intervals.
   * @param {Array} intervals
   * @return {Array}
   */
  static xor(t) {
    let n = null, o = 0;
    const r = [], i = t.map((l) => [
      { time: l.s, type: "s" },
      { time: l.e, type: "e" }
    ]), s = Array.prototype.concat(...i), a = s.sort((l, c) => l.time - c.time);
    for (const l of a)
      o += l.type === "s" ? 1 : -1, o === 1 ? n = l.time : (n && +n != +l.time && r.push(se.fromDateTimes(n, l.time)), n = null);
    return se.merge(r);
  }
  /**
   * Return an Interval representing the span of time in this Interval that doesn't overlap with any of the specified Intervals.
   * @param {...Interval} intervals
   * @return {Array}
   */
  difference(...t) {
    return se.xor([this].concat(t)).map((n) => this.intersection(n)).filter((n) => n && !n.isEmpty());
  }
  /**
   * Returns a string representation of this Interval appropriate for debugging.
   * @return {string}
   */
  toString() {
    return this.isValid ? `[${this.s.toISO()} – ${this.e.toISO()})` : ro;
  }
  /**
   * Returns a string representation of this Interval appropriate for the REPL.
   * @return {string}
   */
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.isValid ? `Interval { start: ${this.s.toISO()}, end: ${this.e.toISO()} }` : `Interval { Invalid, reason: ${this.invalidReason} }`;
  }
  /**
   * Returns a localized string representing this Interval. Accepts the same options as the
   * Intl.DateTimeFormat constructor and any presets defined by Luxon, such as
   * {@link DateTime.DATE_FULL} or {@link DateTime.TIME_SIMPLE}. The exact behavior of this method
   * is browser-specific, but in general it will return an appropriate representation of the
   * Interval in the assigned locale. Defaults to the system's locale if no locale has been
   * specified.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {Object} [formatOpts=DateTime.DATE_SHORT] - Either a DateTime preset or
   * Intl.DateTimeFormat constructor options.
   * @param {Object} opts - Options to override the configuration of the start DateTime.
   * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(); //=> 11/7/2022 – 11/8/2022
   * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(DateTime.DATE_FULL); //=> November 7 – 8, 2022
   * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(DateTime.DATE_FULL, { locale: 'fr-FR' }); //=> 7–8 novembre 2022
   * @example Interval.fromISO('2022-11-07T17:00Z/2022-11-07T19:00Z').toLocaleString(DateTime.TIME_SIMPLE); //=> 6:00 – 8:00 PM
   * @example Interval.fromISO('2022-11-07T17:00Z/2022-11-07T19:00Z').toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> Mon, Nov 07, 6:00 – 8:00 p
   * @return {string}
   */
  toLocaleString(t = da, n = {}) {
    return this.isValid ? Ie.create(this.s.loc.clone(n), t).formatInterval(this) : ro;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Interval.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime#toISO}
   * @return {string}
   */
  toISO(t) {
    return this.isValid ? `${this.s.toISO(t)}/${this.e.toISO(t)}` : ro;
  }
  /**
   * Returns an ISO 8601-compliant string representation of date of this Interval.
   * The time components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @return {string}
   */
  toISODate() {
    return this.isValid ? `${this.s.toISODate()}/${this.e.toISODate()}` : ro;
  }
  /**
   * Returns an ISO 8601-compliant string representation of time of this Interval.
   * The date components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime#toISO}
   * @return {string}
   */
  toISOTime(t) {
    return this.isValid ? `${this.s.toISOTime(t)}/${this.e.toISOTime(t)}` : ro;
  }
  /**
   * Returns a string representation of this Interval formatted according to the specified format
   * string. **You may not want this.** See {@link Interval#toLocaleString} for a more flexible
   * formatting tool.
   * @param {string} dateFormat - The format string. This string formats the start and end time.
   * See {@link DateTime#toFormat} for details.
   * @param {Object} opts - Options.
   * @param {string} [opts.separator =  ' – '] - A separator to place between the start and end
   * representations.
   * @return {string}
   */
  toFormat(t, { separator: n = " – " } = {}) {
    return this.isValid ? `${this.s.toFormat(t)}${n}${this.e.toFormat(t)}` : ro;
  }
  /**
   * Return a Duration representing the time spanned by this interval.
   * @param {string|string[]} [unit=['milliseconds']] - the unit or units (such as 'hours' or 'days') to include in the duration.
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @example Interval.fromDateTimes(dt1, dt2).toDuration().toObject() //=> { milliseconds: 88489257 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration('days').toObject() //=> { days: 1.0241812152777778 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes']).toObject() //=> { hours: 24, minutes: 34.82095 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes', 'seconds']).toObject() //=> { hours: 24, minutes: 34, seconds: 49.257 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration('seconds').toObject() //=> { seconds: 88489.257 }
   * @return {Duration}
   */
  toDuration(t, n) {
    return this.isValid ? this.e.diff(this.s, t, n) : W.invalid(this.invalidReason);
  }
  /**
   * Run mapFn on the interval start and end, returning a new Interval from the resulting DateTimes
   * @param {function} mapFn
   * @return {Interval}
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.toUTC())
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.plus({ hours: 2 }))
   */
  mapEndpoints(t) {
    return se.fromDateTimes(t(this.s), t(this.e));
  }
}
class Ji {
  /**
   * Return whether the specified zone contains a DST.
   * @param {string|Zone} [zone='local'] - Zone to check. Defaults to the environment's local zone.
   * @return {boolean}
   */
  static hasDST(t = le.defaultZone) {
    const n = D.now().setZone(t).set({ month: 12 });
    return !t.isUniversal && n.offset !== n.set({ month: 6 }).offset;
  }
  /**
   * Return whether the specified zone is a valid IANA specifier.
   * @param {string} zone - Zone to check
   * @return {boolean}
   */
  static isValidIANAZone(t) {
    return Wt.isValidZone(t);
  }
  /**
   * Converts the input into a {@link Zone} instance.
   *
   * * If `input` is already a Zone instance, it is returned unchanged.
   * * If `input` is a string containing a valid time zone name, a Zone instance
   *   with that name is returned.
   * * If `input` is a string that doesn't refer to a known time zone, a Zone
   *   instance with {@link Zone#isValid} == false is returned.
   * * If `input is a number, a Zone instance with the specified fixed offset
   *   in minutes is returned.
   * * If `input` is `null` or `undefined`, the default zone is returned.
   * @param {string|Zone|number} [input] - the value to be converted
   * @return {Zone}
   */
  static normalizeZone(t) {
    return on(t, le.defaultZone);
  }
  /**
   * Get the weekday on which the week starts according to the given locale.
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @returns {number} the start of the week, 1 for Monday through 7 for Sunday
   */
  static getStartOfWeek({ locale: t = null, locObj: n = null } = {}) {
    return (n || H.create(t)).getStartOfWeek();
  }
  /**
   * Get the minimum number of days necessary in a week before it is considered part of the next year according
   * to the given locale.
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @returns {number}
   */
  static getMinimumDaysInFirstWeek({ locale: t = null, locObj: n = null } = {}) {
    return (n || H.create(t)).getMinDaysInFirstWeek();
  }
  /**
   * Get the weekdays, which are considered the weekend according to the given locale
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @returns {number[]} an array of weekdays, 1 for Monday through 7 for Sunday
   */
  static getWeekendWeekdays({ locale: t = null, locObj: n = null } = {}) {
    return (n || H.create(t)).getWeekendDays().slice();
  }
  /**
   * Return an array of standalone month names.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @param {string} [opts.outputCalendar='gregory'] - the calendar
   * @example Info.months()[0] //=> 'January'
   * @example Info.months('short')[0] //=> 'Jan'
   * @example Info.months('numeric')[0] //=> '1'
   * @example Info.months('short', { locale: 'fr-CA' } )[0] //=> 'janv.'
   * @example Info.months('numeric', { locale: 'ar' })[0] //=> '١'
   * @example Info.months('long', { outputCalendar: 'islamic' })[0] //=> 'Rabiʻ I'
   * @return {Array}
   */
  static months(t = "long", { locale: n = null, numberingSystem: o = null, locObj: r = null, outputCalendar: i = "gregory" } = {}) {
    return (r || H.create(n, o, i)).months(t);
  }
  /**
   * Return an array of format month names.
   * Format months differ from standalone months in that they're meant to appear next to the day of the month. In some languages, that
   * changes the string.
   * See {@link Info#months}
   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @param {string} [opts.outputCalendar='gregory'] - the calendar
   * @return {Array}
   */
  static monthsFormat(t = "long", { locale: n = null, numberingSystem: o = null, locObj: r = null, outputCalendar: i = "gregory" } = {}) {
    return (r || H.create(n, o, i)).months(t, !0);
  }
  /**
   * Return an array of standalone week names.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {string} [length='long'] - the length of the weekday representation, such as "narrow", "short", "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @example Info.weekdays()[0] //=> 'Monday'
   * @example Info.weekdays('short')[0] //=> 'Mon'
   * @example Info.weekdays('short', { locale: 'fr-CA' })[0] //=> 'lun.'
   * @example Info.weekdays('short', { locale: 'ar' })[0] //=> 'الاثنين'
   * @return {Array}
   */
  static weekdays(t = "long", { locale: n = null, numberingSystem: o = null, locObj: r = null } = {}) {
    return (r || H.create(n, o, null)).weekdays(t);
  }
  /**
   * Return an array of format week names.
   * Format weekdays differ from standalone weekdays in that they're meant to appear next to more date information. In some languages, that
   * changes the string.
   * See {@link Info#weekdays}
   * @param {string} [length='long'] - the length of the month representation, such as "narrow", "short", "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale=null] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @return {Array}
   */
  static weekdaysFormat(t = "long", { locale: n = null, numberingSystem: o = null, locObj: r = null } = {}) {
    return (r || H.create(n, o, null)).weekdays(t, !0);
  }
  /**
   * Return an array of meridiems.
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @example Info.meridiems() //=> [ 'AM', 'PM' ]
   * @example Info.meridiems({ locale: 'my' }) //=> [ 'နံနက်', 'ညနေ' ]
   * @return {Array}
   */
  static meridiems({ locale: t = null } = {}) {
    return H.create(t).meridiems();
  }
  /**
   * Return an array of eras, such as ['BC', 'AD']. The locale can be specified, but the calendar system is always Gregorian.
   * @param {string} [length='short'] - the length of the era representation, such as "short" or "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @example Info.eras() //=> [ 'BC', 'AD' ]
   * @example Info.eras('long') //=> [ 'Before Christ', 'Anno Domini' ]
   * @example Info.eras('long', { locale: 'fr' }) //=> [ 'avant Jésus-Christ', 'après Jésus-Christ' ]
   * @return {Array}
   */
  static eras(t = "short", { locale: n = null } = {}) {
    return H.create(n, null, "gregory").eras(t);
  }
  /**
   * Return the set of available features in this environment.
   * Some features of Luxon are not available in all environments. For example, on older browsers, relative time formatting support is not available. Use this function to figure out if that's the case.
   * Keys:
   * * `relative`: whether this environment supports relative time formatting
   * * `localeWeek`: whether this environment supports different weekdays for the start of the week based on the locale
   * @example Info.features() //=> { relative: false, localeWeek: true }
   * @return {Object}
   */
  static features() {
    return { relative: cg(), localeWeek: ug() };
  }
}
function Md(e, t) {
  const n = (r) => r.toUTC(0, { keepLocalTime: !0 }).startOf("day").valueOf(), o = n(t) - n(e);
  return Math.floor(W.fromMillis(o).as("days"));
}
function eB(e, t, n) {
  const o = [
    ["years", (l, c) => c.year - l.year],
    ["quarters", (l, c) => c.quarter - l.quarter + (c.year - l.year) * 4],
    ["months", (l, c) => c.month - l.month + (c.year - l.year) * 12],
    [
      "weeks",
      (l, c) => {
        const u = Md(l, c);
        return (u - u % 7) / 7;
      }
    ],
    ["days", Md]
  ], r = {}, i = e;
  let s, a;
  for (const [l, c] of o)
    n.indexOf(l) >= 0 && (s = l, r[l] = c(e, t), a = i.plus(r), a > t ? (r[l]--, e = i.plus(r), e > t && (a = e, r[l]--, e = i.plus(r))) : e = a);
  return [e, r, a, s];
}
function tB(e, t, n, o) {
  let [r, i, s, a] = eB(e, t, n);
  const l = t - r, c = n.filter(
    (f) => ["hours", "minutes", "seconds", "milliseconds"].indexOf(f) >= 0
  );
  c.length === 0 && (s < t && (s = r.plus({ [a]: 1 })), s !== r && (i[a] = (i[a] || 0) + l / (s - r)));
  const u = W.fromObject(i, o);
  return c.length > 0 ? W.fromMillis(l, o).shiftTo(...c).plus(u) : u;
}
const Pu = {
  arab: "[٠-٩]",
  arabext: "[۰-۹]",
  bali: "[᭐-᭙]",
  beng: "[০-৯]",
  deva: "[०-९]",
  fullwide: "[０-９]",
  gujr: "[૦-૯]",
  hanidec: "[〇|一|二|三|四|五|六|七|八|九]",
  khmr: "[០-៩]",
  knda: "[೦-೯]",
  laoo: "[໐-໙]",
  limb: "[᥆-᥏]",
  mlym: "[൦-൯]",
  mong: "[᠐-᠙]",
  mymr: "[၀-၉]",
  orya: "[୦-୯]",
  tamldec: "[௦-௯]",
  telu: "[౦-౯]",
  thai: "[๐-๙]",
  tibt: "[༠-༩]",
  latn: "\\d"
}, kd = {
  arab: [1632, 1641],
  arabext: [1776, 1785],
  bali: [6992, 7001],
  beng: [2534, 2543],
  deva: [2406, 2415],
  fullwide: [65296, 65303],
  gujr: [2790, 2799],
  khmr: [6112, 6121],
  knda: [3302, 3311],
  laoo: [3792, 3801],
  limb: [6470, 6479],
  mlym: [3430, 3439],
  mong: [6160, 6169],
  mymr: [4160, 4169],
  orya: [2918, 2927],
  tamldec: [3046, 3055],
  telu: [3174, 3183],
  thai: [3664, 3673],
  tibt: [3872, 3881]
}, nB = Pu.hanidec.replace(/[\[|\]]/g, "").split("");
function oB(e) {
  let t = parseInt(e, 10);
  if (isNaN(t)) {
    t = "";
    for (let n = 0; n < e.length; n++) {
      const o = e.charCodeAt(n);
      if (e[n].search(Pu.hanidec) !== -1)
        t += nB.indexOf(e[n]);
      else
        for (const r in kd) {
          const [i, s] = kd[r];
          o >= i && o <= s && (t += o - i);
        }
    }
    return parseInt(t, 10);
  } else
    return t;
}
function it({ numberingSystem: e }, t = "") {
  return new RegExp(`${Pu[e || "latn"]}${t}`);
}
const rB = "missing Intl.DateTimeFormat.formatToParts support";
function q(e, t = (n) => n) {
  return { regex: e, deser: ([n]) => t(oB(n)) };
}
const iB = " ", $g = `[ ${iB}]`, Ag = new RegExp($g, "g");
function sB(e) {
  return e.replace(/\./g, "\\.?").replace(Ag, $g);
}
function Dd(e) {
  return e.replace(/\./g, "").replace(Ag, " ").toLowerCase();
}
function st(e, t) {
  return e === null ? null : {
    regex: RegExp(e.map(sB).join("|")),
    deser: ([n]) => e.findIndex((o) => Dd(n) === Dd(o)) + t
  };
}
function Ld(e, t) {
  return { regex: e, deser: ([, n, o]) => Ja(n, o), groups: t };
}
function Xi(e) {
  return { regex: e, deser: ([t]) => t };
}
function aB(e) {
  return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
}
function lB(e, t) {
  const n = it(t), o = it(t, "{2}"), r = it(t, "{3}"), i = it(t, "{4}"), s = it(t, "{6}"), a = it(t, "{1,2}"), l = it(t, "{1,3}"), c = it(t, "{1,6}"), u = it(t, "{1,9}"), f = it(t, "{2,4}"), d = it(t, "{4,6}"), h = (v) => ({ regex: RegExp(aB(v.val)), deser: ([T]) => T, literal: !0 }), g = ((v) => {
    if (e.literal)
      return h(v);
    switch (v.val) {
      case "G":
        return st(t.eras("short"), 0);
      case "GG":
        return st(t.eras("long"), 0);
      case "y":
        return q(c);
      case "yy":
        return q(f, ic);
      case "yyyy":
        return q(i);
      case "yyyyy":
        return q(d);
      case "yyyyyy":
        return q(s);
      case "M":
        return q(a);
      case "MM":
        return q(o);
      case "MMM":
        return st(t.months("short", !0), 1);
      case "MMMM":
        return st(t.months("long", !0), 1);
      case "L":
        return q(a);
      case "LL":
        return q(o);
      case "LLL":
        return st(t.months("short", !1), 1);
      case "LLLL":
        return st(t.months("long", !1), 1);
      case "d":
        return q(a);
      case "dd":
        return q(o);
      case "o":
        return q(l);
      case "ooo":
        return q(r);
      case "HH":
        return q(o);
      case "H":
        return q(a);
      case "hh":
        return q(o);
      case "h":
        return q(a);
      case "mm":
        return q(o);
      case "m":
        return q(a);
      case "q":
        return q(a);
      case "qq":
        return q(o);
      case "s":
        return q(a);
      case "ss":
        return q(o);
      case "S":
        return q(l);
      case "SSS":
        return q(r);
      case "u":
        return Xi(u);
      case "uu":
        return Xi(a);
      case "uuu":
        return q(n);
      case "a":
        return st(t.meridiems(), 0);
      case "kkkk":
        return q(i);
      case "kk":
        return q(f, ic);
      case "W":
        return q(a);
      case "WW":
        return q(o);
      case "E":
      case "c":
        return q(n);
      case "EEE":
        return st(t.weekdays("short", !1), 1);
      case "EEEE":
        return st(t.weekdays("long", !1), 1);
      case "ccc":
        return st(t.weekdays("short", !0), 1);
      case "cccc":
        return st(t.weekdays("long", !0), 1);
      case "Z":
      case "ZZ":
        return Ld(new RegExp(`([+-]${a.source})(?::(${o.source}))?`), 2);
      case "ZZZ":
        return Ld(new RegExp(`([+-]${a.source})(${o.source})?`), 2);
      case "z":
        return Xi(/[a-z_+-/]{1,256}?/i);
      case " ":
        return Xi(/[^\S\n\r]/);
      default:
        return h(v);
    }
  })(e) || {
    invalidReason: rB
  };
  return g.token = e, g;
}
const cB = {
  year: {
    "2-digit": "yy",
    numeric: "yyyyy"
  },
  month: {
    numeric: "M",
    "2-digit": "MM",
    short: "MMM",
    long: "MMMM"
  },
  day: {
    numeric: "d",
    "2-digit": "dd"
  },
  weekday: {
    short: "EEE",
    long: "EEEE"
  },
  dayperiod: "a",
  dayPeriod: "a",
  hour12: {
    numeric: "h",
    "2-digit": "hh"
  },
  hour24: {
    numeric: "H",
    "2-digit": "HH"
  },
  minute: {
    numeric: "m",
    "2-digit": "mm"
  },
  second: {
    numeric: "s",
    "2-digit": "ss"
  },
  timeZoneName: {
    long: "ZZZZZ",
    short: "ZZZ"
  }
};
function uB(e, t, n) {
  const { type: o, value: r } = e;
  if (o === "literal") {
    const l = /^\s+$/.test(r);
    return {
      literal: !l,
      val: l ? " " : r
    };
  }
  const i = t[o];
  let s = o;
  o === "hour" && (t.hour12 != null ? s = t.hour12 ? "hour12" : "hour24" : t.hourCycle != null ? t.hourCycle === "h11" || t.hourCycle === "h12" ? s = "hour12" : s = "hour24" : s = n.hour12 ? "hour12" : "hour24");
  let a = cB[s];
  if (typeof a == "object" && (a = a[i]), a)
    return {
      literal: !1,
      val: a
    };
}
function fB(e) {
  return [`^${e.map((n) => n.regex).reduce((n, o) => `${n}(${o.source})`, "")}$`, e];
}
function dB(e, t, n) {
  const o = e.match(t);
  if (o) {
    const r = {};
    let i = 1;
    for (const s in n)
      if (qo(n, s)) {
        const a = n[s], l = a.groups ? a.groups + 1 : 1;
        !a.literal && a.token && (r[a.token.val[0]] = a.deser(o.slice(i, i + l))), i += l;
      }
    return [o, r];
  } else
    return [o, {}];
}
function hB(e) {
  const t = (i) => {
    switch (i) {
      case "S":
        return "millisecond";
      case "s":
        return "second";
      case "m":
        return "minute";
      case "h":
      case "H":
        return "hour";
      case "d":
        return "day";
      case "o":
        return "ordinal";
      case "L":
      case "M":
        return "month";
      case "y":
        return "year";
      case "E":
      case "c":
        return "weekday";
      case "W":
        return "weekNumber";
      case "k":
        return "weekYear";
      case "q":
        return "quarter";
      default:
        return null;
    }
  };
  let n = null, o;
  return N(e.z) || (n = Wt.create(e.z)), N(e.Z) || (n || (n = new Oe(e.Z)), o = e.Z), N(e.q) || (e.M = (e.q - 1) * 3 + 1), N(e.h) || (e.h < 12 && e.a === 1 ? e.h += 12 : e.h === 12 && e.a === 0 && (e.h = 0)), e.G === 0 && e.y && (e.y = -e.y), N(e.u) || (e.S = ku(e.u)), [Object.keys(e).reduce((i, s) => {
    const a = t(s);
    return a && (i[a] = e[s]), i;
  }, {}), n, o];
}
let bl = null;
function mB() {
  return bl || (bl = D.fromMillis(1555555555555)), bl;
}
function pB(e, t) {
  if (e.literal)
    return e;
  const n = Ie.macroTokenToFormatOpts(e.val), o = kg(n, t);
  return o == null || o.includes(void 0) ? e : o;
}
function Ng(e, t) {
  return Array.prototype.concat(...e.map((n) => pB(n, t)));
}
function Mg(e, t, n) {
  const o = Ng(Ie.parseFormat(n), e), r = o.map((s) => lB(s, e)), i = r.find((s) => s.invalidReason);
  if (i)
    return { input: t, tokens: o, invalidReason: i.invalidReason };
  {
    const [s, a] = fB(r), l = RegExp(s, "i"), [c, u] = dB(t, l, a), [f, d, h] = u ? hB(u) : [null, null, void 0];
    if (qo(u, "a") && qo(u, "H"))
      throw new Io(
        "Can't include meridiem when specifying 24-hour format"
      );
    return { input: t, tokens: o, regex: l, rawMatches: c, matches: u, result: f, zone: d, specificOffset: h };
  }
}
function yB(e, t, n) {
  const { result: o, zone: r, specificOffset: i, invalidReason: s } = Mg(e, t, n);
  return [o, r, i, s];
}
function kg(e, t) {
  if (!e)
    return null;
  const o = Ie.create(t, e).dtFormatter(mB()), r = o.formatToParts(), i = o.resolvedOptions();
  return r.map((s) => uB(s, e, i));
}
const Il = "Invalid DateTime", Rd = 864e13;
function es(e) {
  return new ct("unsupported zone", `the zone "${e.name}" is not supported`);
}
function Tl(e) {
  return e.weekData === null && (e.weekData = ha(e.c)), e.weekData;
}
function wl(e) {
  return e.localWeekData === null && (e.localWeekData = ha(
    e.c,
    e.loc.getMinDaysInFirstWeek(),
    e.loc.getStartOfWeek()
  )), e.localWeekData;
}
function bn(e, t) {
  const n = {
    ts: e.ts,
    zone: e.zone,
    c: e.c,
    o: e.o,
    loc: e.loc,
    invalid: e.invalid
  };
  return new D({ ...n, ...t, old: n });
}
function Dg(e, t, n) {
  let o = e - t * 60 * 1e3;
  const r = n.offset(o);
  if (t === r)
    return [o, t];
  o -= (r - t) * 60 * 1e3;
  const i = n.offset(o);
  return r === i ? [o, r] : [e - Math.min(r, i) * 60 * 1e3, Math.max(r, i)];
}
function ts(e, t) {
  e += t * 60 * 1e3;
  const n = new Date(e);
  return {
    year: n.getUTCFullYear(),
    month: n.getUTCMonth() + 1,
    day: n.getUTCDate(),
    hour: n.getUTCHours(),
    minute: n.getUTCMinutes(),
    second: n.getUTCSeconds(),
    millisecond: n.getUTCMilliseconds()
  };
}
function Fs(e, t, n) {
  return Dg(Qa(e), t, n);
}
function _d(e, t) {
  const n = e.o, o = e.c.year + Math.trunc(t.years), r = e.c.month + Math.trunc(t.months) + Math.trunc(t.quarters) * 3, i = {
    ...e.c,
    year: o,
    month: r,
    day: Math.min(e.c.day, ma(o, r)) + Math.trunc(t.days) + Math.trunc(t.weeks) * 7
  }, s = W.fromObject({
    years: t.years - Math.trunc(t.years),
    quarters: t.quarters - Math.trunc(t.quarters),
    months: t.months - Math.trunc(t.months),
    weeks: t.weeks - Math.trunc(t.weeks),
    days: t.days - Math.trunc(t.days),
    hours: t.hours,
    minutes: t.minutes,
    seconds: t.seconds,
    milliseconds: t.milliseconds
  }).as("milliseconds"), a = Qa(i);
  let [l, c] = Dg(a, n, e.zone);
  return s !== 0 && (l += s, c = e.zone.offset(l)), { ts: l, o: c };
}
function vr(e, t, n, o, r, i) {
  const { setZone: s, zone: a } = n;
  if (e && Object.keys(e).length !== 0 || t) {
    const l = t || a, c = D.fromObject(e, {
      ...n,
      zone: l,
      specificOffset: i
    });
    return s ? c : c.setZone(a);
  } else
    return D.invalid(
      new ct("unparsable", `the input "${r}" can't be parsed as ${o}`)
    );
}
function ns(e, t, n = !0) {
  return e.isValid ? Ie.create(H.create("en-US"), {
    allowZ: n,
    forceSimple: !0
  }).formatDateTimeFromString(e, t) : null;
}
function Cl(e, t) {
  const n = e.c.year > 9999 || e.c.year < 0;
  let o = "";
  return n && e.c.year >= 0 && (o += "+"), o += fe(e.c.year, n ? 6 : 4), t ? (o += "-", o += fe(e.c.month), o += "-", o += fe(e.c.day)) : (o += fe(e.c.month), o += fe(e.c.day)), o;
}
function Pd(e, t, n, o, r, i) {
  let s = fe(e.c.hour);
  return t ? (s += ":", s += fe(e.c.minute), (e.c.millisecond !== 0 || e.c.second !== 0 || !n) && (s += ":")) : s += fe(e.c.minute), (e.c.millisecond !== 0 || e.c.second !== 0 || !n) && (s += fe(e.c.second), (e.c.millisecond !== 0 || !o) && (s += ".", s += fe(e.c.millisecond, 3))), r && (e.isOffsetFixed && e.offset === 0 && !i ? s += "Z" : e.o < 0 ? (s += "-", s += fe(Math.trunc(-e.o / 60)), s += ":", s += fe(Math.trunc(-e.o % 60))) : (s += "+", s += fe(Math.trunc(e.o / 60)), s += ":", s += fe(Math.trunc(e.o % 60)))), i && (s += "[" + e.zone.ianaName + "]"), s;
}
const Lg = {
  month: 1,
  day: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, gB = {
  weekNumber: 1,
  weekday: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, vB = {
  ordinal: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, Rg = ["year", "month", "day", "hour", "minute", "second", "millisecond"], bB = [
  "weekYear",
  "weekNumber",
  "weekday",
  "hour",
  "minute",
  "second",
  "millisecond"
], IB = ["year", "ordinal", "hour", "minute", "second", "millisecond"];
function TB(e) {
  const t = {
    year: "year",
    years: "year",
    month: "month",
    months: "month",
    day: "day",
    days: "day",
    hour: "hour",
    hours: "hour",
    minute: "minute",
    minutes: "minute",
    quarter: "quarter",
    quarters: "quarter",
    second: "second",
    seconds: "second",
    millisecond: "millisecond",
    milliseconds: "millisecond",
    weekday: "weekday",
    weekdays: "weekday",
    weeknumber: "weekNumber",
    weeksnumber: "weekNumber",
    weeknumbers: "weekNumber",
    weekyear: "weekYear",
    weekyears: "weekYear",
    ordinal: "ordinal"
  }[e.toLowerCase()];
  if (!t)
    throw new Py(e);
  return t;
}
function Bd(e) {
  switch (e.toLowerCase()) {
    case "localweekday":
    case "localweekdays":
      return "localWeekday";
    case "localweeknumber":
    case "localweeknumbers":
      return "localWeekNumber";
    case "localweekyear":
    case "localweekyears":
      return "localWeekYear";
    default:
      return TB(e);
  }
}
function jd(e, t) {
  const n = on(t.zone, le.defaultZone), o = H.fromObject(t), r = le.now();
  let i, s;
  if (N(e.year))
    i = r;
  else {
    for (const c of Rg)
      N(e[c]) && (e[c] = Lg[c]);
    const a = ag(e) || lg(e);
    if (a)
      return D.invalid(a);
    const l = n.offset(r);
    [i, s] = Fs(e, l, n);
  }
  return new D({ ts: i, zone: n, loc: o, o: s });
}
function Ud(e, t, n) {
  const o = N(n.round) ? !0 : n.round, r = (s, a) => (s = Du(s, o || n.calendary ? 0 : 2, !0), t.loc.clone(n).relFormatter(n).format(s, a)), i = (s) => n.calendary ? t.hasSame(e, s) ? 0 : t.startOf(s).diff(e.startOf(s), s).get(s) : t.diff(e, s).get(s);
  if (n.unit)
    return r(i(n.unit), n.unit);
  for (const s of n.units) {
    const a = i(s);
    if (Math.abs(a) >= 1)
      return r(a, s);
  }
  return r(e > t ? -0 : 0, n.units[n.units.length - 1]);
}
function Wd(e) {
  let t = {}, n;
  return e.length > 0 && typeof e[e.length - 1] == "object" ? (t = e[e.length - 1], n = Array.from(e).slice(0, e.length - 1)) : n = Array.from(e), [t, n];
}
class D {
  /**
   * @access private
   */
  constructor(t) {
    const n = t.zone || le.defaultZone;
    let o = t.invalid || (Number.isNaN(t.ts) ? new ct("invalid input") : null) || (n.isValid ? null : es(n));
    this.ts = N(t.ts) ? le.now() : t.ts;
    let r = null, i = null;
    if (!o)
      if (t.old && t.old.ts === this.ts && t.old.zone.equals(n))
        [r, i] = [t.old.c, t.old.o];
      else {
        const a = n.offset(this.ts);
        r = ts(this.ts, a), o = Number.isNaN(r.year) ? new ct("invalid input") : null, r = o ? null : r, i = o ? null : a;
      }
    this._zone = n, this.loc = t.loc || H.create(), this.invalid = o, this.weekData = null, this.localWeekData = null, this.c = r, this.o = i, this.isLuxonDateTime = !0;
  }
  // CONSTRUCT
  /**
   * Create a DateTime for the current instant, in the system's time zone.
   *
   * Use Settings to override these default values if needed.
   * @example DateTime.now().toISO() //~> now in the ISO format
   * @return {DateTime}
   */
  static now() {
    return new D({});
  }
  /**
   * Create a local DateTime
   * @param {number} [year] - The calendar year. If omitted (as in, call `local()` with no arguments), the current time will be used
   * @param {number} [month=1] - The month, 1-indexed
   * @param {number} [day=1] - The day of the month, 1-indexed
   * @param {number} [hour=0] - The hour of the day, in 24-hour time
   * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
   * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
   * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
   * @example DateTime.local()                                  //~> now
   * @example DateTime.local({ zone: "America/New_York" })      //~> now, in US east coast time
   * @example DateTime.local(2017)                              //~> 2017-01-01T00:00:00
   * @example DateTime.local(2017, 3)                           //~> 2017-03-01T00:00:00
   * @example DateTime.local(2017, 3, 12, { locale: "fr" })     //~> 2017-03-12T00:00:00, with a French locale
   * @example DateTime.local(2017, 3, 12, 5)                    //~> 2017-03-12T05:00:00
   * @example DateTime.local(2017, 3, 12, 5, { zone: "utc" })   //~> 2017-03-12T05:00:00, in UTC
   * @example DateTime.local(2017, 3, 12, 5, 45)                //~> 2017-03-12T05:45:00
   * @example DateTime.local(2017, 3, 12, 5, 45, 10)            //~> 2017-03-12T05:45:10
   * @example DateTime.local(2017, 3, 12, 5, 45, 10, 765)       //~> 2017-03-12T05:45:10.765
   * @return {DateTime}
   */
  static local() {
    const [t, n] = Wd(arguments), [o, r, i, s, a, l, c] = n;
    return jd({ year: o, month: r, day: i, hour: s, minute: a, second: l, millisecond: c }, t);
  }
  /**
   * Create a DateTime in UTC
   * @param {number} [year] - The calendar year. If omitted (as in, call `utc()` with no arguments), the current time will be used
   * @param {number} [month=1] - The month, 1-indexed
   * @param {number} [day=1] - The day of the month
   * @param {number} [hour=0] - The hour of the day, in 24-hour time
   * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
   * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
   * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
   * @param {Object} options - configuration options for the DateTime
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} [options.outputCalendar] - the output calendar to set on the resulting DateTime instance
   * @param {string} [options.numberingSystem] - the numbering system to set on the resulting DateTime instance
   * @example DateTime.utc()                                              //~> now
   * @example DateTime.utc(2017)                                          //~> 2017-01-01T00:00:00Z
   * @example DateTime.utc(2017, 3)                                       //~> 2017-03-01T00:00:00Z
   * @example DateTime.utc(2017, 3, 12)                                   //~> 2017-03-12T00:00:00Z
   * @example DateTime.utc(2017, 3, 12, 5)                                //~> 2017-03-12T05:00:00Z
   * @example DateTime.utc(2017, 3, 12, 5, 45)                            //~> 2017-03-12T05:45:00Z
   * @example DateTime.utc(2017, 3, 12, 5, 45, { locale: "fr" })          //~> 2017-03-12T05:45:00Z with a French locale
   * @example DateTime.utc(2017, 3, 12, 5, 45, 10)                        //~> 2017-03-12T05:45:10Z
   * @example DateTime.utc(2017, 3, 12, 5, 45, 10, 765, { locale: "fr" }) //~> 2017-03-12T05:45:10.765Z with a French locale
   * @return {DateTime}
   */
  static utc() {
    const [t, n] = Wd(arguments), [o, r, i, s, a, l, c] = n;
    return t.zone = Oe.utcInstance, jd({ year: o, month: r, day: i, hour: s, minute: a, second: l, millisecond: c }, t);
  }
  /**
   * Create a DateTime from a JavaScript Date object. Uses the default zone.
   * @param {Date} date - a JavaScript Date object
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @return {DateTime}
   */
  static fromJSDate(t, n = {}) {
    const o = K_(t) ? t.valueOf() : NaN;
    if (Number.isNaN(o))
      return D.invalid("invalid input");
    const r = on(n.zone, le.defaultZone);
    return r.isValid ? new D({
      ts: o,
      zone: r,
      loc: H.fromObject(n)
    }) : D.invalid(es(r));
  }
  /**
   * Create a DateTime from a number of milliseconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
   * @param {number} milliseconds - a number of milliseconds since 1970 UTC
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @return {DateTime}
   */
  static fromMillis(t, n = {}) {
    if (Pn(t))
      return t < -Rd || t > Rd ? D.invalid("Timestamp out of range") : new D({
        ts: t,
        zone: on(n.zone, le.defaultZone),
        loc: H.fromObject(n)
      });
    throw new $e(
      `fromMillis requires a numerical input, but received a ${typeof t} with value ${t}`
    );
  }
  /**
   * Create a DateTime from a number of seconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
   * @param {number} seconds - a number of seconds since 1970 UTC
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @return {DateTime}
   */
  static fromSeconds(t, n = {}) {
    if (Pn(t))
      return new D({
        ts: t * 1e3,
        zone: on(n.zone, le.defaultZone),
        loc: H.fromObject(n)
      });
    throw new $e("fromSeconds requires a numerical input");
  }
  /**
   * Create a DateTime from a JavaScript object with keys like 'year' and 'hour' with reasonable defaults.
   * @param {Object} obj - the object to create the DateTime from
   * @param {number} obj.year - a year, such as 1987
   * @param {number} obj.month - a month, 1-12
   * @param {number} obj.day - a day of the month, 1-31, depending on the month
   * @param {number} obj.ordinal - day of the year, 1-365 or 366
   * @param {number} obj.weekYear - an ISO week year
   * @param {number} obj.weekNumber - an ISO week number, between 1 and 52 or 53, depending on the year
   * @param {number} obj.weekday - an ISO weekday, 1-7, where 1 is Monday and 7 is Sunday
   * @param {number} obj.localWeekYear - a week year, according to the locale
   * @param {number} obj.localWeekNumber - a week number, between 1 and 52 or 53, depending on the year, according to the locale
   * @param {number} obj.localWeekday - a weekday, 1-7, where 1 is the first and 7 is the last day of the week, according to the locale
   * @param {number} obj.hour - hour of the day, 0-23
   * @param {number} obj.minute - minute of the hour, 0-59
   * @param {number} obj.second - second of the minute, 0-59
   * @param {number} obj.millisecond - millisecond of the second, 0-999
   * @param {Object} opts - options for creating this DateTime
   * @param {string|Zone} [opts.zone='local'] - interpret the numbers in the context of a particular zone. Can take any value taken as the first argument to setZone()
   * @param {string} [opts.locale='system\'s locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromObject({ year: 1982, month: 5, day: 25}).toISODate() //=> '1982-05-25'
   * @example DateTime.fromObject({ year: 1982 }).toISODate() //=> '1982-01-01'
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }) //~> today at 10:26:06
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'utc' }),
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'local' })
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'America/New_York' })
   * @example DateTime.fromObject({ weekYear: 2016, weekNumber: 2, weekday: 3 }).toISODate() //=> '2016-01-13'
   * @example DateTime.fromObject({ localWeekYear: 2022, localWeekNumber: 1, localWeekday: 1 }, { locale: "en-US" }).toISODate() //=> '2021-12-26'
   * @return {DateTime}
   */
  static fromObject(t, n = {}) {
    t = t || {};
    const o = on(n.zone, le.defaultZone);
    if (!o.isValid)
      return D.invalid(es(o));
    const r = H.fromObject(n), i = pa(t, Bd), { minDaysInFirstWeek: s, startOfWeek: a } = Od(i, r), l = le.now(), c = N(n.specificOffset) ? o.offset(l) : n.specificOffset, u = !N(i.ordinal), f = !N(i.year), d = !N(i.month) || !N(i.day), h = f || d, p = i.weekYear || i.weekNumber;
    if ((h || u) && p)
      throw new Io(
        "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
      );
    if (d && u)
      throw new Io("Can't mix ordinal dates with month/day");
    const g = p || i.weekday && !h;
    let v, T, S = ts(l, c);
    g ? (v = bB, T = gB, S = ha(S, s, a)) : u ? (v = IB, T = vB, S = vl(S)) : (v = Rg, T = Lg);
    let k = !1;
    for (const Z of v) {
      const P = i[Z];
      N(P) ? k ? i[Z] = T[Z] : i[Z] = S[Z] : k = !0;
    }
    const L = g ? z_(i, s, a) : u ? G_(i) : ag(i), ae = L || lg(i);
    if (ae)
      return D.invalid(ae);
    const gt = g ? wd(i, s, a) : u ? Cd(i) : i, [vt, tt] = Fs(gt, c, o), je = new D({
      ts: vt,
      zone: o,
      o: tt,
      loc: r
    });
    return i.weekday && h && t.weekday !== je.weekday ? D.invalid(
      "mismatched weekday",
      `you can't specify both a weekday of ${i.weekday} and a date of ${je.toISO()}`
    ) : je;
  }
  /**
   * Create a DateTime from an ISO 8601 string
   * @param {string} text - the ISO string
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the time to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} [opts.outputCalendar] - the output calendar to set on the resulting DateTime instance
   * @param {string} [opts.numberingSystem] - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromISO('2016-05-25T09:08:34.123')
   * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00')
   * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00', {setZone: true})
   * @example DateTime.fromISO('2016-05-25T09:08:34.123', {zone: 'utc'})
   * @example DateTime.fromISO('2016-W05-4')
   * @return {DateTime}
   */
  static fromISO(t, n = {}) {
    const [o, r] = jP(t);
    return vr(o, r, n, "ISO 8601", t);
  }
  /**
   * Create a DateTime from an RFC 2822 string
   * @param {string} text - the RFC 2822 string
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since the offset is always specified in the string itself, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromRFC2822('25 Nov 2016 13:23:12 GMT')
   * @example DateTime.fromRFC2822('Fri, 25 Nov 2016 13:23:12 +0600')
   * @example DateTime.fromRFC2822('25 Nov 2016 13:23 Z')
   * @return {DateTime}
   */
  static fromRFC2822(t, n = {}) {
    const [o, r] = UP(t);
    return vr(o, r, n, "RFC 2822", t);
  }
  /**
   * Create a DateTime from an HTTP header date
   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
   * @param {string} text - the HTTP header date
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since HTTP dates are always in UTC, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
   * @param {boolean} [opts.setZone=false] - override the zone with the fixed-offset zone specified in the string. For HTTP dates, this is always UTC, so this option is equivalent to setting the `zone` option to 'utc', but this option is included for consistency with similar methods.
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromHTTP('Sun, 06 Nov 1994 08:49:37 GMT')
   * @example DateTime.fromHTTP('Sunday, 06-Nov-94 08:49:37 GMT')
   * @example DateTime.fromHTTP('Sun Nov  6 08:49:37 1994')
   * @return {DateTime}
   */
  static fromHTTP(t, n = {}) {
    const [o, r] = WP(t);
    return vr(o, r, n, "HTTP", n);
  }
  /**
   * Create a DateTime from an input string and format string.
   * Defaults to en-US if no locale has been specified, regardless of the system's locale. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/#/parsing?id=table-of-tokens).
   * @param {string} text - the string to parse
   * @param {string} fmt - the format the string is expected to be in (see the link below for the formats)
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
   * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @return {DateTime}
   */
  static fromFormat(t, n, o = {}) {
    if (N(t) || N(n))
      throw new $e("fromFormat requires an input string and a format");
    const { locale: r = null, numberingSystem: i = null } = o, s = H.fromOpts({
      locale: r,
      numberingSystem: i,
      defaultToEN: !0
    }), [a, l, c, u] = yB(s, t, n);
    return u ? D.invalid(u) : vr(a, l, o, `format ${n}`, t, c);
  }
  /**
   * @deprecated use fromFormat instead
   */
  static fromString(t, n, o = {}) {
    return D.fromFormat(t, n, o);
  }
  /**
   * Create a DateTime from a SQL date, time, or datetime
   * Defaults to en-US if no locale has been specified, regardless of the system's locale
   * @param {string} text - the string to parse
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
   * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @example DateTime.fromSQL('2017-05-15')
   * @example DateTime.fromSQL('2017-05-15 09:12:34')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342+06:00')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles', { setZone: true })
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342', { zone: 'America/Los_Angeles' })
   * @example DateTime.fromSQL('09:12:34.342')
   * @return {DateTime}
   */
  static fromSQL(t, n = {}) {
    const [o, r] = GP(t);
    return vr(o, r, n, "SQL", t);
  }
  /**
   * Create an invalid DateTime.
   * @param {string} reason - simple string of why this DateTime is invalid. Should not contain parameters or anything else data-dependent.
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {DateTime}
   */
  static invalid(t, n = null) {
    if (!t)
      throw new $e("need to specify a reason the DateTime is invalid");
    const o = t instanceof ct ? t : new ct(t, n);
    if (le.throwOnInvalid)
      throw new C_(o);
    return new D({ invalid: o });
  }
  /**
   * Check if an object is an instance of DateTime. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  static isDateTime(t) {
    return t && t.isLuxonDateTime || !1;
  }
  /**
   * Produce the format string for a set of options
   * @param formatOpts
   * @param localeOpts
   * @returns {string}
   */
  static parseFormatForOpts(t, n = {}) {
    const o = kg(t, H.fromObject(n));
    return o ? o.map((r) => r ? r.val : null).join("") : null;
  }
  /**
   * Produce the the fully expanded format token for the locale
   * Does NOT quote characters, so quoted tokens will not round trip correctly
   * @param fmt
   * @param localeOpts
   * @returns {string}
   */
  static expandFormat(t, n = {}) {
    return Ng(Ie.parseFormat(t), H.fromObject(n)).map((r) => r.val).join("");
  }
  // INFO
  /**
   * Get the value of unit.
   * @param {string} unit - a unit such as 'minute' or 'day'
   * @example DateTime.local(2017, 7, 4).get('month'); //=> 7
   * @example DateTime.local(2017, 7, 4).get('day'); //=> 4
   * @return {number}
   */
  get(t) {
    return this[t];
  }
  /**
   * Returns whether the DateTime is valid. Invalid DateTimes occur when:
   * * The DateTime was created from invalid calendar information, such as the 13th month or February 30
   * * The DateTime was created by an operation on another invalid date
   * @type {boolean}
   */
  get isValid() {
    return this.invalid === null;
  }
  /**
   * Returns an error code if this DateTime is invalid, or null if the DateTime is valid
   * @type {string}
   */
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  /**
   * Returns an explanation of why this DateTime became invalid, or null if the DateTime is valid
   * @type {string}
   */
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  /**
   * Get the locale of a DateTime, such 'en-GB'. The locale is used when formatting the DateTime
   *
   * @type {string}
   */
  get locale() {
    return this.isValid ? this.loc.locale : null;
  }
  /**
   * Get the numbering system of a DateTime, such 'beng'. The numbering system is used when formatting the DateTime
   *
   * @type {string}
   */
  get numberingSystem() {
    return this.isValid ? this.loc.numberingSystem : null;
  }
  /**
   * Get the output calendar of a DateTime, such 'islamic'. The output calendar is used when formatting the DateTime
   *
   * @type {string}
   */
  get outputCalendar() {
    return this.isValid ? this.loc.outputCalendar : null;
  }
  /**
   * Get the time zone associated with this DateTime.
   * @type {Zone}
   */
  get zone() {
    return this._zone;
  }
  /**
   * Get the name of the time zone.
   * @type {string}
   */
  get zoneName() {
    return this.isValid ? this.zone.name : null;
  }
  /**
   * Get the year
   * @example DateTime.local(2017, 5, 25).year //=> 2017
   * @type {number}
   */
  get year() {
    return this.isValid ? this.c.year : NaN;
  }
  /**
   * Get the quarter
   * @example DateTime.local(2017, 5, 25).quarter //=> 2
   * @type {number}
   */
  get quarter() {
    return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
  }
  /**
   * Get the month (1-12).
   * @example DateTime.local(2017, 5, 25).month //=> 5
   * @type {number}
   */
  get month() {
    return this.isValid ? this.c.month : NaN;
  }
  /**
   * Get the day of the month (1-30ish).
   * @example DateTime.local(2017, 5, 25).day //=> 25
   * @type {number}
   */
  get day() {
    return this.isValid ? this.c.day : NaN;
  }
  /**
   * Get the hour of the day (0-23).
   * @example DateTime.local(2017, 5, 25, 9).hour //=> 9
   * @type {number}
   */
  get hour() {
    return this.isValid ? this.c.hour : NaN;
  }
  /**
   * Get the minute of the hour (0-59).
   * @example DateTime.local(2017, 5, 25, 9, 30).minute //=> 30
   * @type {number}
   */
  get minute() {
    return this.isValid ? this.c.minute : NaN;
  }
  /**
   * Get the second of the minute (0-59).
   * @example DateTime.local(2017, 5, 25, 9, 30, 52).second //=> 52
   * @type {number}
   */
  get second() {
    return this.isValid ? this.c.second : NaN;
  }
  /**
   * Get the millisecond of the second (0-999).
   * @example DateTime.local(2017, 5, 25, 9, 30, 52, 654).millisecond //=> 654
   * @type {number}
   */
  get millisecond() {
    return this.isValid ? this.c.millisecond : NaN;
  }
  /**
   * Get the week year
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2014, 12, 31).weekYear //=> 2015
   * @type {number}
   */
  get weekYear() {
    return this.isValid ? Tl(this).weekYear : NaN;
  }
  /**
   * Get the week number of the week year (1-52ish).
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2017, 5, 25).weekNumber //=> 21
   * @type {number}
   */
  get weekNumber() {
    return this.isValid ? Tl(this).weekNumber : NaN;
  }
  /**
   * Get the day of the week.
   * 1 is Monday and 7 is Sunday
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2014, 11, 31).weekday //=> 4
   * @type {number}
   */
  get weekday() {
    return this.isValid ? Tl(this).weekday : NaN;
  }
  /**
   * Returns true if this date is on a weekend according to the locale, false otherwise
   * @returns {boolean}
   */
  get isWeekend() {
    return this.isValid && this.loc.getWeekendDays().includes(this.weekday);
  }
  /**
   * Get the day of the week according to the locale.
   * 1 is the first day of the week and 7 is the last day of the week.
   * If the locale assigns Sunday as the first day of the week, then a date which is a Sunday will return 1,
   * @returns {number}
   */
  get localWeekday() {
    return this.isValid ? wl(this).weekday : NaN;
  }
  /**
   * Get the week number of the week year according to the locale. Different locales assign week numbers differently,
   * because the week can start on different days of the week (see localWeekday) and because a different number of days
   * is required for a week to count as the first week of a year.
   * @returns {number}
   */
  get localWeekNumber() {
    return this.isValid ? wl(this).weekNumber : NaN;
  }
  /**
   * Get the week year according to the locale. Different locales assign week numbers (and therefor week years)
   * differently, see localWeekNumber.
   * @returns {number}
   */
  get localWeekYear() {
    return this.isValid ? wl(this).weekYear : NaN;
  }
  /**
   * Get the ordinal (meaning the day of the year)
   * @example DateTime.local(2017, 5, 25).ordinal //=> 145
   * @type {number|DateTime}
   */
  get ordinal() {
    return this.isValid ? vl(this.c).ordinal : NaN;
  }
  /**
   * Get the human readable short month name, such as 'Oct'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).monthShort //=> Oct
   * @type {string}
   */
  get monthShort() {
    return this.isValid ? Ji.months("short", { locObj: this.loc })[this.month - 1] : null;
  }
  /**
   * Get the human readable long month name, such as 'October'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).monthLong //=> October
   * @type {string}
   */
  get monthLong() {
    return this.isValid ? Ji.months("long", { locObj: this.loc })[this.month - 1] : null;
  }
  /**
   * Get the human readable short weekday, such as 'Mon'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).weekdayShort //=> Mon
   * @type {string}
   */
  get weekdayShort() {
    return this.isValid ? Ji.weekdays("short", { locObj: this.loc })[this.weekday - 1] : null;
  }
  /**
   * Get the human readable long weekday, such as 'Monday'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).weekdayLong //=> Monday
   * @type {string}
   */
  get weekdayLong() {
    return this.isValid ? Ji.weekdays("long", { locObj: this.loc })[this.weekday - 1] : null;
  }
  /**
   * Get the UTC offset of this DateTime in minutes
   * @example DateTime.now().offset //=> -240
   * @example DateTime.utc().offset //=> 0
   * @type {number}
   */
  get offset() {
    return this.isValid ? +this.o : NaN;
  }
  /**
   * Get the short human name for the zone's current offset, for example "EST" or "EDT".
   * Defaults to the system's locale if no locale has been specified
   * @type {string}
   */
  get offsetNameShort() {
    return this.isValid ? this.zone.offsetName(this.ts, {
      format: "short",
      locale: this.locale
    }) : null;
  }
  /**
   * Get the long human name for the zone's current offset, for example "Eastern Standard Time" or "Eastern Daylight Time".
   * Defaults to the system's locale if no locale has been specified
   * @type {string}
   */
  get offsetNameLong() {
    return this.isValid ? this.zone.offsetName(this.ts, {
      format: "long",
      locale: this.locale
    }) : null;
  }
  /**
   * Get whether this zone's offset ever changes, as in a DST.
   * @type {boolean}
   */
  get isOffsetFixed() {
    return this.isValid ? this.zone.isUniversal : null;
  }
  /**
   * Get whether the DateTime is in a DST.
   * @type {boolean}
   */
  get isInDST() {
    return this.isOffsetFixed ? !1 : this.offset > this.set({ month: 1, day: 1 }).offset || this.offset > this.set({ month: 5 }).offset;
  }
  /**
   * Get those DateTimes which have the same local time as this DateTime, but a different offset from UTC
   * in this DateTime's zone. During DST changes local time can be ambiguous, for example
   * `2023-10-29T02:30:00` in `Europe/Berlin` can have offset `+01:00` or `+02:00`.
   * This method will return both possible DateTimes if this DateTime's local time is ambiguous.
   * @returns {DateTime[]}
   */
  getPossibleOffsets() {
    if (!this.isValid || this.isOffsetFixed)
      return [this];
    const t = 864e5, n = 6e4, o = Qa(this.c), r = this.zone.offset(o - t), i = this.zone.offset(o + t), s = this.zone.offset(o - r * n), a = this.zone.offset(o - i * n);
    if (s === a)
      return [this];
    const l = o - s * n, c = o - a * n, u = ts(l, s), f = ts(c, a);
    return u.hour === f.hour && u.minute === f.minute && u.second === f.second && u.millisecond === f.millisecond ? [bn(this, { ts: l }), bn(this, { ts: c })] : [this];
  }
  /**
   * Returns true if this DateTime is in a leap year, false otherwise
   * @example DateTime.local(2016).isInLeapYear //=> true
   * @example DateTime.local(2013).isInLeapYear //=> false
   * @type {boolean}
   */
  get isInLeapYear() {
    return Ui(this.year);
  }
  /**
   * Returns the number of days in this DateTime's month
   * @example DateTime.local(2016, 2).daysInMonth //=> 29
   * @example DateTime.local(2016, 3).daysInMonth //=> 31
   * @type {number}
   */
  get daysInMonth() {
    return ma(this.year, this.month);
  }
  /**
   * Returns the number of days in this DateTime's year
   * @example DateTime.local(2016).daysInYear //=> 366
   * @example DateTime.local(2013).daysInYear //=> 365
   * @type {number}
   */
  get daysInYear() {
    return this.isValid ? Mo(this.year) : NaN;
  }
  /**
   * Returns the number of weeks in this DateTime's year
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2004).weeksInWeekYear //=> 53
   * @example DateTime.local(2013).weeksInWeekYear //=> 52
   * @type {number}
   */
  get weeksInWeekYear() {
    return this.isValid ? ui(this.weekYear) : NaN;
  }
  /**
   * Returns the number of weeks in this DateTime's local week year
   * @example DateTime.local(2020, 6, {locale: 'en-US'}).weeksInLocalWeekYear //=> 52
   * @example DateTime.local(2020, 6, {locale: 'de-DE'}).weeksInLocalWeekYear //=> 53
   * @type {number}
   */
  get weeksInLocalWeekYear() {
    return this.isValid ? ui(
      this.localWeekYear,
      this.loc.getMinDaysInFirstWeek(),
      this.loc.getStartOfWeek()
    ) : NaN;
  }
  /**
   * Returns the resolved Intl options for this DateTime.
   * This is useful in understanding the behavior of formatting methods
   * @param {Object} opts - the same options as toLocaleString
   * @return {Object}
   */
  resolvedLocaleOptions(t = {}) {
    const { locale: n, numberingSystem: o, calendar: r } = Ie.create(
      this.loc.clone(t),
      t
    ).resolvedOptions(this);
    return { locale: n, numberingSystem: o, outputCalendar: r };
  }
  // TRANSFORM
  /**
   * "Set" the DateTime's zone to UTC. Returns a newly-constructed DateTime.
   *
   * Equivalent to {@link DateTime#setZone}('utc')
   * @param {number} [offset=0] - optionally, an offset from UTC in minutes
   * @param {Object} [opts={}] - options to pass to `setZone()`
   * @return {DateTime}
   */
  toUTC(t = 0, n = {}) {
    return this.setZone(Oe.instance(t), n);
  }
  /**
   * "Set" the DateTime's zone to the host's local zone. Returns a newly-constructed DateTime.
   *
   * Equivalent to `setZone('local')`
   * @return {DateTime}
   */
  toLocal() {
    return this.setZone(le.defaultZone);
  }
  /**
   * "Set" the DateTime's zone to specified zone. Returns a newly-constructed DateTime.
   *
   * By default, the setter keeps the underlying time the same (as in, the same timestamp), but the new instance will report different local times and consider DSTs when making computations, as with {@link DateTime#plus}. You may wish to use {@link DateTime#toLocal} and {@link DateTime#toUTC} which provide simple convenience wrappers for commonly used zones.
   * @param {string|Zone} [zone='local'] - a zone identifier. As a string, that can be any IANA zone supported by the host environment, or a fixed-offset name of the form 'UTC+3', or the strings 'local' or 'utc'. You may also supply an instance of a {@link DateTime#Zone} class.
   * @param {Object} opts - options
   * @param {boolean} [opts.keepLocalTime=false] - If true, adjust the underlying time so that the local time stays the same, but in the target zone. You should rarely need this.
   * @return {DateTime}
   */
  setZone(t, { keepLocalTime: n = !1, keepCalendarTime: o = !1 } = {}) {
    if (t = on(t, le.defaultZone), t.equals(this.zone))
      return this;
    if (t.isValid) {
      let r = this.ts;
      if (n || o) {
        const i = t.offset(this.ts), s = this.toObject();
        [r] = Fs(s, i, t);
      }
      return bn(this, { ts: r, zone: t });
    } else
      return D.invalid(es(t));
  }
  /**
   * "Set" the locale, numberingSystem, or outputCalendar. Returns a newly-constructed DateTime.
   * @param {Object} properties - the properties to set
   * @example DateTime.local(2017, 5, 25).reconfigure({ locale: 'en-GB' })
   * @return {DateTime}
   */
  reconfigure({ locale: t, numberingSystem: n, outputCalendar: o } = {}) {
    const r = this.loc.clone({ locale: t, numberingSystem: n, outputCalendar: o });
    return bn(this, { loc: r });
  }
  /**
   * "Set" the locale. Returns a newly-constructed DateTime.
   * Just a convenient alias for reconfigure({ locale })
   * @example DateTime.local(2017, 5, 25).setLocale('en-GB')
   * @return {DateTime}
   */
  setLocale(t) {
    return this.reconfigure({ locale: t });
  }
  /**
   * "Set" the values of specified units. Returns a newly-constructed DateTime.
   * You can only set units with this method; for "setting" metadata, see {@link DateTime#reconfigure} and {@link DateTime#setZone}.
   *
   * This method also supports setting locale-based week units, i.e. `localWeekday`, `localWeekNumber` and `localWeekYear`.
   * They cannot be mixed with ISO-week units like `weekday`.
   * @param {Object} values - a mapping of units to numbers
   * @example dt.set({ year: 2017 })
   * @example dt.set({ hour: 8, minute: 30 })
   * @example dt.set({ weekday: 5 })
   * @example dt.set({ year: 2005, ordinal: 234 })
   * @return {DateTime}
   */
  set(t) {
    if (!this.isValid)
      return this;
    const n = pa(t, Bd), { minDaysInFirstWeek: o, startOfWeek: r } = Od(n, this.loc), i = !N(n.weekYear) || !N(n.weekNumber) || !N(n.weekday), s = !N(n.ordinal), a = !N(n.year), l = !N(n.month) || !N(n.day), c = a || l, u = n.weekYear || n.weekNumber;
    if ((c || s) && u)
      throw new Io(
        "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
      );
    if (l && s)
      throw new Io("Can't mix ordinal dates with month/day");
    let f;
    i ? f = wd(
      { ...ha(this.c, o, r), ...n },
      o,
      r
    ) : N(n.ordinal) ? (f = { ...this.toObject(), ...n }, N(n.day) && (f.day = Math.min(ma(f.year, f.month), f.day))) : f = Cd({ ...vl(this.c), ...n });
    const [d, h] = Fs(f, this.o, this.zone);
    return bn(this, { ts: d, o: h });
  }
  /**
   * Add a period of time to this DateTime and return the resulting DateTime
   *
   * Adding hours, minutes, seconds, or milliseconds increases the timestamp by the right number of milliseconds. Adding days, months, or years shifts the calendar, accounting for DSTs and leap years along the way. Thus, `dt.plus({ hours: 24 })` may result in a different time than `dt.plus({ days: 1 })` if there's a DST shift in between.
   * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @example DateTime.now().plus(123) //~> in 123 milliseconds
   * @example DateTime.now().plus({ minutes: 15 }) //~> in 15 minutes
   * @example DateTime.now().plus({ days: 1 }) //~> this time tomorrow
   * @example DateTime.now().plus({ days: -1 }) //~> this time yesterday
   * @example DateTime.now().plus({ hours: 3, minutes: 13 }) //~> in 3 hr, 13 min
   * @example DateTime.now().plus(Duration.fromObject({ hours: 3, minutes: 13 })) //~> in 3 hr, 13 min
   * @return {DateTime}
   */
  plus(t) {
    if (!this.isValid)
      return this;
    const n = W.fromDurationLike(t);
    return bn(this, _d(this, n));
  }
  /**
   * Subtract a period of time to this DateTime and return the resulting DateTime
   * See {@link DateTime#plus}
   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   @return {DateTime}
   */
  minus(t) {
    if (!this.isValid)
      return this;
    const n = W.fromDurationLike(t).negate();
    return bn(this, _d(this, n));
  }
  /**
   * "Set" this DateTime to the beginning of a unit of time.
   * @param {string} unit - The unit to go to the beginning of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
   * @param {Object} opts - options
   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week
   * @example DateTime.local(2014, 3, 3).startOf('month').toISODate(); //=> '2014-03-01'
   * @example DateTime.local(2014, 3, 3).startOf('year').toISODate(); //=> '2014-01-01'
   * @example DateTime.local(2014, 3, 3).startOf('week').toISODate(); //=> '2014-03-03', weeks always start on Mondays
   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('day').toISOTime(); //=> '00:00.000-05:00'
   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('hour').toISOTime(); //=> '05:00:00.000-05:00'
   * @return {DateTime}
   */
  startOf(t, { useLocaleWeeks: n = !1 } = {}) {
    if (!this.isValid)
      return this;
    const o = {}, r = W.normalizeUnit(t);
    switch (r) {
      case "years":
        o.month = 1;
      case "quarters":
      case "months":
        o.day = 1;
      case "weeks":
      case "days":
        o.hour = 0;
      case "hours":
        o.minute = 0;
      case "minutes":
        o.second = 0;
      case "seconds":
        o.millisecond = 0;
        break;
    }
    if (r === "weeks")
      if (n) {
        const i = this.loc.getStartOfWeek(), { weekday: s } = this;
        s < i && (o.weekNumber = this.weekNumber - 1), o.weekday = i;
      } else
        o.weekday = 1;
    if (r === "quarters") {
      const i = Math.ceil(this.month / 3);
      o.month = (i - 1) * 3 + 1;
    }
    return this.set(o);
  }
  /**
   * "Set" this DateTime to the end (meaning the last millisecond) of a unit of time
   * @param {string} unit - The unit to go to the end of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
   * @param {Object} opts - options
   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week
   * @example DateTime.local(2014, 3, 3).endOf('month').toISO(); //=> '2014-03-31T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3).endOf('year').toISO(); //=> '2014-12-31T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3).endOf('week').toISO(); // => '2014-03-09T23:59:59.999-05:00', weeks start on Mondays
   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('day').toISO(); //=> '2014-03-03T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('hour').toISO(); //=> '2014-03-03T05:59:59.999-05:00'
   * @return {DateTime}
   */
  endOf(t, n) {
    return this.isValid ? this.plus({ [t]: 1 }).startOf(t, n).minus(1) : this;
  }
  // OUTPUT
  /**
   * Returns a string representation of this DateTime formatted according to the specified format string.
   * **You may not want this.** See {@link DateTime#toLocaleString} for a more flexible formatting tool. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/#/formatting?id=table-of-tokens).
   * Defaults to en-US if no locale has been specified, regardless of the system's locale.
   * @param {string} fmt - the format string
   * @param {Object} opts - opts to override the configuration options on this DateTime
   * @example DateTime.now().toFormat('yyyy LLL dd') //=> '2017 Apr 22'
   * @example DateTime.now().setLocale('fr').toFormat('yyyy LLL dd') //=> '2017 avr. 22'
   * @example DateTime.now().toFormat('yyyy LLL dd', { locale: "fr" }) //=> '2017 avr. 22'
   * @example DateTime.now().toFormat("HH 'hours and' mm 'minutes'") //=> '20 hours and 55 minutes'
   * @return {string}
   */
  toFormat(t, n = {}) {
    return this.isValid ? Ie.create(this.loc.redefaultToEN(n)).formatDateTimeFromString(this, t) : Il;
  }
  /**
   * Returns a localized string representing this date. Accepts the same options as the Intl.DateTimeFormat constructor and any presets defined by Luxon, such as `DateTime.DATE_FULL` or `DateTime.TIME_SIMPLE`.
   * The exact behavior of this method is browser-specific, but in general it will return an appropriate representation
   * of the DateTime in the assigned locale.
   * Defaults to the system's locale if no locale has been specified
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param formatOpts {Object} - Intl.DateTimeFormat constructor options and configuration options
   * @param {Object} opts - opts to override the configuration options on this DateTime
   * @example DateTime.now().toLocaleString(); //=> 4/20/2017
   * @example DateTime.now().setLocale('en-gb').toLocaleString(); //=> '20/04/2017'
   * @example DateTime.now().toLocaleString(DateTime.DATE_FULL); //=> 'April 20, 2017'
   * @example DateTime.now().toLocaleString(DateTime.DATE_FULL, { locale: 'fr' }); //=> '28 août 2022'
   * @example DateTime.now().toLocaleString(DateTime.TIME_SIMPLE); //=> '11:32 AM'
   * @example DateTime.now().toLocaleString(DateTime.DATETIME_SHORT); //=> '4/20/2017, 11:32 AM'
   * @example DateTime.now().toLocaleString({ weekday: 'long', month: 'long', day: '2-digit' }); //=> 'Thursday, April 20'
   * @example DateTime.now().toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> 'Thu, Apr 20, 11:27 AM'
   * @example DateTime.now().toLocaleString({ hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }); //=> '11:32'
   * @return {string}
   */
  toLocaleString(t = da, n = {}) {
    return this.isValid ? Ie.create(this.loc.clone(n), t).formatDateTime(this) : Il;
  }
  /**
   * Returns an array of format "parts", meaning individual tokens along with metadata. This is allows callers to post-process individual sections of the formatted output.
   * Defaults to the system's locale if no locale has been specified
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/formatToParts
   * @param opts {Object} - Intl.DateTimeFormat constructor options, same as `toLocaleString`.
   * @example DateTime.now().toLocaleParts(); //=> [
   *                                   //=>   { type: 'day', value: '25' },
   *                                   //=>   { type: 'literal', value: '/' },
   *                                   //=>   { type: 'month', value: '05' },
   *                                   //=>   { type: 'literal', value: '/' },
   *                                   //=>   { type: 'year', value: '1982' }
   *                                   //=> ]
   */
  toLocaleParts(t = {}) {
    return this.isValid ? Ie.create(this.loc.clone(t), t).formatDateTimeParts(this) : [];
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.extendedZone=false] - add the time zone format extension
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example DateTime.utc(1983, 5, 25).toISO() //=> '1982-05-25T00:00:00.000Z'
   * @example DateTime.now().toISO() //=> '2017-04-22T20:47:05.335-04:00'
   * @example DateTime.now().toISO({ includeOffset: false }) //=> '2017-04-22T20:47:05.335'
   * @example DateTime.now().toISO({ format: 'basic' }) //=> '20170422T204705.335-0400'
   * @return {string}
   */
  toISO({
    format: t = "extended",
    suppressSeconds: n = !1,
    suppressMilliseconds: o = !1,
    includeOffset: r = !0,
    extendedZone: i = !1
  } = {}) {
    if (!this.isValid)
      return null;
    const s = t === "extended";
    let a = Cl(this, s);
    return a += "T", a += Pd(this, s, n, o, r, i), a;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's date component
   * @param {Object} opts - options
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example DateTime.utc(1982, 5, 25).toISODate() //=> '1982-05-25'
   * @example DateTime.utc(1982, 5, 25).toISODate({ format: 'basic' }) //=> '19820525'
   * @return {string}
   */
  toISODate({ format: t = "extended" } = {}) {
    return this.isValid ? Cl(this, t === "extended") : null;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's week date
   * @example DateTime.utc(1982, 5, 25).toISOWeekDate() //=> '1982-W21-2'
   * @return {string}
   */
  toISOWeekDate() {
    return ns(this, "kkkk-'W'WW-c");
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's time component
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.extendedZone=true] - add the time zone format extension
   * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime() //=> '07:34:19.361Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34, seconds: 0, milliseconds: 0 }).toISOTime({ suppressSeconds: true }) //=> '07:34Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ format: 'basic' }) //=> '073419.361Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ includePrefix: true }) //=> 'T07:34:19.361Z'
   * @return {string}
   */
  toISOTime({
    suppressMilliseconds: t = !1,
    suppressSeconds: n = !1,
    includeOffset: o = !0,
    includePrefix: r = !1,
    extendedZone: i = !1,
    format: s = "extended"
  } = {}) {
    return this.isValid ? (r ? "T" : "") + Pd(
      this,
      s === "extended",
      n,
      t,
      o,
      i
    ) : null;
  }
  /**
   * Returns an RFC 2822-compatible string representation of this DateTime
   * @example DateTime.utc(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 +0000'
   * @example DateTime.local(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 -0400'
   * @return {string}
   */
  toRFC2822() {
    return ns(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", !1);
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in HTTP headers. The output is always expressed in GMT.
   * Specifically, the string conforms to RFC 1123.
   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
   * @example DateTime.utc(2014, 7, 13).toHTTP() //=> 'Sun, 13 Jul 2014 00:00:00 GMT'
   * @example DateTime.utc(2014, 7, 13, 19).toHTTP() //=> 'Sun, 13 Jul 2014 19:00:00 GMT'
   * @return {string}
   */
  toHTTP() {
    return ns(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL Date
   * @example DateTime.utc(2014, 7, 13).toSQLDate() //=> '2014-07-13'
   * @return {string}
   */
  toSQLDate() {
    return this.isValid ? Cl(this, !0) : null;
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL Time
   * @param {Object} opts - options
   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.includeOffsetSpace=true] - include the space between the time and the offset, such as '05:15:16.345 -04:00'
   * @example DateTime.utc().toSQL() //=> '05:15:16.345'
   * @example DateTime.now().toSQL() //=> '05:15:16.345 -04:00'
   * @example DateTime.now().toSQL({ includeOffset: false }) //=> '05:15:16.345'
   * @example DateTime.now().toSQL({ includeZone: false }) //=> '05:15:16.345 America/New_York'
   * @return {string}
   */
  toSQLTime({ includeOffset: t = !0, includeZone: n = !1, includeOffsetSpace: o = !0 } = {}) {
    let r = "HH:mm:ss.SSS";
    return (n || t) && (o && (r += " "), n ? r += "z" : t && (r += "ZZ")), ns(this, r, !0);
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL DateTime
   * @param {Object} opts - options
   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.includeOffsetSpace=true] - include the space between the time and the offset, such as '05:15:16.345 -04:00'
   * @example DateTime.utc(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 Z'
   * @example DateTime.local(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 -04:00'
   * @example DateTime.local(2014, 7, 13).toSQL({ includeOffset: false }) //=> '2014-07-13 00:00:00.000'
   * @example DateTime.local(2014, 7, 13).toSQL({ includeZone: true }) //=> '2014-07-13 00:00:00.000 America/New_York'
   * @return {string}
   */
  toSQL(t = {}) {
    return this.isValid ? `${this.toSQLDate()} ${this.toSQLTime(t)}` : null;
  }
  /**
   * Returns a string representation of this DateTime appropriate for debugging
   * @return {string}
   */
  toString() {
    return this.isValid ? this.toISO() : Il;
  }
  /**
   * Returns a string representation of this DateTime appropriate for the REPL.
   * @return {string}
   */
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.isValid ? `DateTime { ts: ${this.toISO()}, zone: ${this.zone.name}, locale: ${this.locale} }` : `DateTime { Invalid, reason: ${this.invalidReason} }`;
  }
  /**
   * Returns the epoch milliseconds of this DateTime. Alias of {@link DateTime#toMillis}
   * @return {number}
   */
  valueOf() {
    return this.toMillis();
  }
  /**
   * Returns the epoch milliseconds of this DateTime.
   * @return {number}
   */
  toMillis() {
    return this.isValid ? this.ts : NaN;
  }
  /**
   * Returns the epoch seconds of this DateTime.
   * @return {number}
   */
  toSeconds() {
    return this.isValid ? this.ts / 1e3 : NaN;
  }
  /**
   * Returns the epoch seconds (as a whole number) of this DateTime.
   * @return {number}
   */
  toUnixInteger() {
    return this.isValid ? Math.floor(this.ts / 1e3) : NaN;
  }
  /**
   * Returns an ISO 8601 representation of this DateTime appropriate for use in JSON.
   * @return {string}
   */
  toJSON() {
    return this.toISO();
  }
  /**
   * Returns a BSON serializable equivalent to this DateTime.
   * @return {Date}
   */
  toBSON() {
    return this.toJSDate();
  }
  /**
   * Returns a JavaScript object with this DateTime's year, month, day, and so on.
   * @param opts - options for generating the object
   * @param {boolean} [opts.includeConfig=false] - include configuration attributes in the output
   * @example DateTime.now().toObject() //=> { year: 2017, month: 4, day: 22, hour: 20, minute: 49, second: 42, millisecond: 268 }
   * @return {Object}
   */
  toObject(t = {}) {
    if (!this.isValid)
      return {};
    const n = { ...this.c };
    return t.includeConfig && (n.outputCalendar = this.outputCalendar, n.numberingSystem = this.loc.numberingSystem, n.locale = this.loc.locale), n;
  }
  /**
   * Returns a JavaScript Date equivalent to this DateTime.
   * @return {Date}
   */
  toJSDate() {
    return new Date(this.isValid ? this.ts : NaN);
  }
  // COMPARE
  /**
   * Return the difference between two DateTimes as a Duration.
   * @param {DateTime} otherDateTime - the DateTime to compare this one to
   * @param {string|string[]} [unit=['milliseconds']] - the unit or array of units (such as 'hours' or 'days') to include in the duration.
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @example
   * var i1 = DateTime.fromISO('1982-05-25T09:45'),
   *     i2 = DateTime.fromISO('1983-10-14T10:30');
   * i2.diff(i1).toObject() //=> { milliseconds: 43807500000 }
   * i2.diff(i1, 'hours').toObject() //=> { hours: 12168.75 }
   * i2.diff(i1, ['months', 'days']).toObject() //=> { months: 16, days: 19.03125 }
   * i2.diff(i1, ['months', 'days', 'hours']).toObject() //=> { months: 16, days: 19, hours: 0.75 }
   * @return {Duration}
   */
  diff(t, n = "milliseconds", o = {}) {
    if (!this.isValid || !t.isValid)
      return W.invalid("created by diffing an invalid DateTime");
    const r = { locale: this.locale, numberingSystem: this.numberingSystem, ...o }, i = Q_(n).map(W.normalizeUnit), s = t.valueOf() > this.valueOf(), a = s ? this : t, l = s ? t : this, c = tB(a, l, i, r);
    return s ? c.negate() : c;
  }
  /**
   * Return the difference between this DateTime and right now.
   * See {@link DateTime#diff}
   * @param {string|string[]} [unit=['milliseconds']] - the unit or units units (such as 'hours' or 'days') to include in the duration
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */
  diffNow(t = "milliseconds", n = {}) {
    return this.diff(D.now(), t, n);
  }
  /**
   * Return an Interval spanning between this DateTime and another DateTime
   * @param {DateTime} otherDateTime - the other end point of the Interval
   * @return {Interval}
   */
  until(t) {
    return this.isValid ? se.fromDateTimes(this, t) : this;
  }
  /**
   * Return whether this DateTime is in the same unit of time as another DateTime.
   * Higher-order units must also be identical for this function to return `true`.
   * Note that time zones are **ignored** in this comparison, which compares the **local** calendar time. Use {@link DateTime#setZone} to convert one of the dates if needed.
   * @param {DateTime} otherDateTime - the other DateTime
   * @param {string} unit - the unit of time to check sameness on
   * @param {Object} opts - options
   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week; only the locale of this DateTime is used
   * @example DateTime.now().hasSame(otherDT, 'day'); //~> true if otherDT is in the same current calendar day
   * @return {boolean}
   */
  hasSame(t, n, o) {
    if (!this.isValid)
      return !1;
    const r = t.valueOf(), i = this.setZone(t.zone, { keepLocalTime: !0 });
    return i.startOf(n, o) <= r && r <= i.endOf(n, o);
  }
  /**
   * Equality check
   * Two DateTimes are equal if and only if they represent the same millisecond, have the same zone and location, and are both valid.
   * To compare just the millisecond values, use `+dt1 === +dt2`.
   * @param {DateTime} other - the other DateTime
   * @return {boolean}
   */
  equals(t) {
    return this.isValid && t.isValid && this.valueOf() === t.valueOf() && this.zone.equals(t.zone) && this.loc.equals(t.loc);
  }
  /**
   * Returns a string representation of a this time relative to now, such as "in two days". Can only internationalize if your
   * platform supports Intl.RelativeTimeFormat. Rounds down by default.
   * @param {Object} options - options that affect the output
   * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
   * @param {string} [options.style="long"] - the style of units, must be "long", "short", or "narrow"
   * @param {string|string[]} options.unit - use a specific unit or array of units; if omitted, or an array, the method will pick the best unit. Use an array or one of "years", "quarters", "months", "weeks", "days", "hours", "minutes", or "seconds"
   * @param {boolean} [options.round=true] - whether to round the numbers in the output.
   * @param {number} [options.padding=0] - padding in milliseconds. This allows you to round up the result if it fits inside the threshold. Don't use in combination with {round: false} because the decimal output will include the padding.
   * @param {string} options.locale - override the locale of this DateTime
   * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
   * @example DateTime.now().plus({ days: 1 }).toRelative() //=> "in 1 day"
   * @example DateTime.now().setLocale("es").toRelative({ days: 1 }) //=> "dentro de 1 día"
   * @example DateTime.now().plus({ days: 1 }).toRelative({ locale: "fr" }) //=> "dans 23 heures"
   * @example DateTime.now().minus({ days: 2 }).toRelative() //=> "2 days ago"
   * @example DateTime.now().minus({ days: 2 }).toRelative({ unit: "hours" }) //=> "48 hours ago"
   * @example DateTime.now().minus({ hours: 36 }).toRelative({ round: false }) //=> "1.5 days ago"
   */
  toRelative(t = {}) {
    if (!this.isValid)
      return null;
    const n = t.base || D.fromObject({}, { zone: this.zone }), o = t.padding ? this < n ? -t.padding : t.padding : 0;
    let r = ["years", "months", "days", "hours", "minutes", "seconds"], i = t.unit;
    return Array.isArray(t.unit) && (r = t.unit, i = void 0), Ud(n, this.plus(o), {
      ...t,
      numeric: "always",
      units: r,
      unit: i
    });
  }
  /**
   * Returns a string representation of this date relative to today, such as "yesterday" or "next month".
   * Only internationalizes on platforms that supports Intl.RelativeTimeFormat.
   * @param {Object} options - options that affect the output
   * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
   * @param {string} options.locale - override the locale of this DateTime
   * @param {string} options.unit - use a specific unit; if omitted, the method will pick the unit. Use one of "years", "quarters", "months", "weeks", or "days"
   * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
   * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar() //=> "tomorrow"
   * @example DateTime.now().setLocale("es").plus({ days: 1 }).toRelative() //=> ""mañana"
   * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar({ locale: "fr" }) //=> "demain"
   * @example DateTime.now().minus({ days: 2 }).toRelativeCalendar() //=> "2 days ago"
   */
  toRelativeCalendar(t = {}) {
    return this.isValid ? Ud(t.base || D.fromObject({}, { zone: this.zone }), this, {
      ...t,
      numeric: "auto",
      units: ["years", "months", "days"],
      calendary: !0
    }) : null;
  }
  /**
   * Return the min of several date times
   * @param {...DateTime} dateTimes - the DateTimes from which to choose the minimum
   * @return {DateTime} the min DateTime, or undefined if called with no argument
   */
  static min(...t) {
    if (!t.every(D.isDateTime))
      throw new $e("min requires all arguments be DateTimes");
    return Sd(t, (n) => n.valueOf(), Math.min);
  }
  /**
   * Return the max of several date times
   * @param {...DateTime} dateTimes - the DateTimes from which to choose the maximum
   * @return {DateTime} the max DateTime, or undefined if called with no argument
   */
  static max(...t) {
    if (!t.every(D.isDateTime))
      throw new $e("max requires all arguments be DateTimes");
    return Sd(t, (n) => n.valueOf(), Math.max);
  }
  // MISC
  /**
   * Explain how a string would be parsed by fromFormat()
   * @param {string} text - the string to parse
   * @param {string} fmt - the format the string is expected to be in (see description)
   * @param {Object} options - options taken by fromFormat()
   * @return {Object}
   */
  static fromFormatExplain(t, n, o = {}) {
    const { locale: r = null, numberingSystem: i = null } = o, s = H.fromOpts({
      locale: r,
      numberingSystem: i,
      defaultToEN: !0
    });
    return Mg(s, t, n);
  }
  /**
   * @deprecated use fromFormatExplain instead
   */
  static fromStringExplain(t, n, o = {}) {
    return D.fromFormatExplain(t, n, o);
  }
  // FORMAT PRESETS
  /**
   * {@link DateTime#toLocaleString} format like 10/14/1983
   * @type {Object}
   */
  static get DATE_SHORT() {
    return da;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983'
   * @type {Object}
   */
  static get DATE_MED() {
    return By;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Fri, Oct 14, 1983'
   * @type {Object}
   */
  static get DATE_MED_WITH_WEEKDAY() {
    return E_;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983'
   * @type {Object}
   */
  static get DATE_FULL() {
    return jy;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Tuesday, October 14, 1983'
   * @type {Object}
   */
  static get DATE_HUGE() {
    return Uy;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_SIMPLE() {
    return Wy;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_SECONDS() {
    return Fy;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_SHORT_OFFSET() {
    return qy;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_LONG_OFFSET() {
    return Vy;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_SIMPLE() {
    return Hy;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_SECONDS() {
    return Zy;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 EDT', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_SHORT_OFFSET() {
    return zy;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 Eastern Daylight Time', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_LONG_OFFSET() {
    return Gy;
  }
  /**
   * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_SHORT() {
    return Yy;
  }
  /**
   * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30:33 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_SHORT_WITH_SECONDS() {
    return Ky;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED() {
    return Qy;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30:33 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED_WITH_SECONDS() {
    return Jy;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Fri, 14 Oct 1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED_WITH_WEEKDAY() {
    return x_;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_FULL() {
    return Xy;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30:33 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_FULL_WITH_SECONDS() {
    return eg;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_HUGE() {
    return tg;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30:33 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_HUGE_WITH_SECONDS() {
    return ng;
  }
}
function br(e) {
  if (D.isDateTime(e))
    return e;
  if (e && e.valueOf && Pn(e.valueOf()))
    return D.fromJSDate(e);
  if (e && typeof e == "object")
    return D.fromObject(e);
  throw new $e(
    `Unknown datetime argument: ${e}, of type ${typeof e}`
  );
}
function wB({ collections: e, lww: t }, { tableIds: n, tableColumnIds: o, relationshipIds: r, indexIds: i, indexColumnIds: s, memoIds: a }) {
  y(e).collection("tableEntities").removeMany(n), y(e).collection("tableColumnEntities").removeMany(o), y(e).collection("relationshipEntities").removeMany(r), y(e).collection("indexEntities").removeMany(i), y(e).collection("indexColumnEntities").removeMany(s), y(e).collection("memoEntities").removeMany(a), [
    ...n,
    ...o,
    ...r,
    ...i,
    ...s,
    ...a
  ].forEach((l) => Reflect.deleteProperty(t, l));
}
const CB = 3, OB = M([
  "tableEntities",
  "tableColumnEntities",
  "relationshipEntities",
  "indexEntities",
  "indexColumnEntities",
  "memoEntities"
]);
class Mj {
  async run(t) {
    const n = JSON.parse(t), o = Vn(n), { doc: { tableIds: r, memoIds: i, indexIds: s, relationshipIds: a }, collections: l, lww: c } = o, u = M(r), f = M(i), d = M(s), h = M(a), p = SB(D.now()), g = y(l).collection("tableEntities"), v = y(l).collection("tableColumnEntities"), T = y(l).collection("indexEntities"), S = y(l).collection("indexColumnEntities"), k = y(l).collection("relationshipEntities"), L = y(l).collection("memoEntities"), ae = new Set(g.selectAll().filter(p(u)).map(({ id: E }) => E)), gt = /* @__PURE__ */ new Set(), vt = new Set(k.selectAll().filter(p(h)).map(({ id: E }) => E)), tt = new Set(T.selectAll().filter(p(d)).map(({ id: E }) => E)), je = /* @__PURE__ */ new Set(), Z = new Set(L.selectAll().filter(p(f)).map(({ id: E }) => E));
    v.selectAll().filter(({ tableId: E }) => ae.has(E)).forEach(({ id: E }) => gt.add(E)), k.selectAll().filter(({ id: E, start: bt, end: cr }) => !vt.has(E) && (ae.has(bt.tableId) || ae.has(cr.tableId))).forEach(({ id: E }) => vt.add(E)), T.selectAll().filter(({ id: E, tableId: bt }) => !tt.has(E) && ae.has(bt)).forEach(({ id: E }) => tt.add(E)), S.selectAll().filter(({ indexId: E }) => tt.has(E)).forEach(({ id: E }) => je.add(E)), wB(o, {
      tableIds: [...ae],
      tableColumnIds: [...gt],
      relationshipIds: [...vt],
      indexIds: [...tt],
      indexColumnIds: [...je],
      memoIds: [...Z]
    });
    const P = M(g.selectAll().map(({ id: E }) => E)), nt = M(v.selectAll().map(({ id: E }) => E)), Vt = M(T.selectAll().map(({ id: E }) => E)), $t = M(S.selectAll().map(({ id: E }) => E)), _g = M(k.selectAll().map(({ id: E }) => E)), Pg = M(L.selectAll().map(({ id: E }) => E));
    return v.selectAll().filter(({ tableId: E, id: bt, meta: cr }) => !P(E) && p(() => !1)({ id: bt, meta: cr })).forEach(({ id: E }) => gt.add(E)), S.selectAll().filter(({ indexId: E, id: bt, meta: cr }) => !Vt(E) && p(() => !1)({ id: bt, meta: cr })).forEach(({ id: E }) => je.add(E)), Object.entries(c).forEach(([E, [bt]]) => {
      if (OB(bt))
        switch (bt) {
          case "tableEntities":
            !P(E) && ae.add(E);
            break;
          case "tableColumnEntities":
            !nt(E) && gt.add(E);
            break;
          case "relationshipEntities":
            !_g(E) && vt.add(E);
            break;
          case "indexEntities":
            !Vt(E) && tt.add(E);
            break;
          case "indexColumnEntities":
            !$t(E) && je.add(E);
            break;
          case "memoEntities":
            !Pg(E) && Z.add(E);
            break;
        }
    }), {
      tableIds: [...ae],
      tableColumnIds: [...gt],
      relationshipIds: [...vt],
      indexIds: [...tt],
      indexColumnIds: [...je],
      memoIds: [...Z]
    };
  }
}
const SB = (e) => (t) => ({ id: n, meta: o }) => {
  if (t(n))
    return !1;
  const r = Math.floor(e.diff(D.fromMillis(o.updateAt), "days").toObject().days ?? 0);
  return CB < r;
};
export {
  yj as $,
  A,
  M as B,
  gj as C,
  Cj as D,
  Nj as E,
  OM as F,
  Tj as G,
  Ij as H,
  ld as I,
  Sy as J,
  _w as K,
  mj as L,
  jR as M,
  WR as N,
  Xe as O,
  UR as P,
  $u as Q,
  Ko as R,
  wi as S,
  Kn as T,
  dm as U,
  HB as V,
  I as W,
  VB as X,
  Uw as Y,
  yi as Z,
  Po as _,
  _o as a,
  _ as a$,
  DB as a0,
  Hp as a1,
  $B as a2,
  wt as a3,
  Sj as a4,
  Ej as a5,
  $j as a6,
  xj as a7,
  Aj as a8,
  Op as a9,
  vu as aA,
  Tp as aB,
  U1 as aC,
  ey as aD,
  rM as aE,
  iM as aF,
  sa as aG,
  QN as aH,
  OL as aI,
  SL as aJ,
  Xp as aM,
  kB as aN,
  j as aO,
  UI as aP,
  _B as aQ,
  RB as aR,
  no as aS,
  xp as aT,
  hy as aU,
  Re as aV,
  Mp as aW,
  U as aX,
  oM as aY,
  nM as aZ,
  dy as a_,
  WB as aa,
  Zl as ab,
  qB as ac,
  y as ad,
  jB as ae,
  QM as af,
  WI as ag,
  ZB as ah,
  s_ as ai,
  ud as aj,
  Xl as ak,
  re as al,
  AB as am,
  YM as an,
  ra as ao,
  $p as ap,
  XN as aq,
  ej as ar,
  eM as as,
  JN as at,
  Dn as au,
  Rp as av,
  Lw as aw,
  pL as ax,
  yR as ay,
  gu as az,
  Ci as b,
  li as b$,
  z as b0,
  Dp as b1,
  kp as b2,
  cn as b3,
  vL as b4,
  IL as b5,
  UM as b6,
  FM as b7,
  TL as b8,
  jw as b9,
  Ha as bA,
  Eo as bB,
  QB as bC,
  rj as bD,
  HN as bE,
  ZN as bF,
  zN as bG,
  vR as bH,
  Sp as bI,
  SI as bJ,
  me as bK,
  ni as bL,
  wy as bM,
  wR as bN,
  D2 as bO,
  IR as bP,
  D as bQ,
  oy as bR,
  yu as bS,
  mL as bT,
  Fo as bV,
  wL as bW,
  Qf as bX,
  Iu as bY,
  Jp as bZ,
  XB as b_,
  MB as ba,
  fy as bb,
  cy as bc,
  Fa as bd,
  wu as be,
  Tu as bf,
  CR as bg,
  nk as bh,
  OR as bi,
  PB as bj,
  uj as bk,
  Yr as bl,
  tj as bm,
  nj as bn,
  pu as bo,
  _y as bp,
  LB as bq,
  NM as br,
  pR as bs,
  wc as bt,
  mu as bu,
  ht as bv,
  XM as bw,
  Un as bx,
  WN as by,
  _R as bz,
  St as c,
  FN as c$,
  xR as c0,
  Kp as c1,
  AR as c2,
  NR as c3,
  MR as c4,
  kR as c5,
  ER as c6,
  YB as c7,
  W2 as c8,
  GB as c9,
  rk as cA,
  R2 as cB,
  sj as cC,
  JB as cD,
  H2 as cE,
  mD as cF,
  iy as cG,
  He as cH,
  _p as cI,
  J2 as cJ,
  KB as cK,
  Y2 as cL,
  US as cM,
  Am as cN,
  NB as cO,
  oj as cP,
  aj as cQ,
  Gl as cS,
  ry as cT,
  Ba as cU,
  RR as cV,
  Mj as cW,
  bj as cX,
  vj as cY,
  wj as cZ,
  qN as c_,
  P2 as ca,
  j2 as cb,
  BB as cc,
  dj as cd,
  mx as ce,
  Oj as cf,
  Yi as cg,
  q2 as ch,
  hj as ci,
  hk as cj,
  hL as ck,
  dL as cl,
  xt as cm,
  pj as cn,
  Cp as co,
  lt as cp,
  fj as cq,
  Zp as cr,
  bR as cs,
  EM as ct,
  gR as cu,
  ke as cv,
  VM as cw,
  iu as cx,
  yL as cy,
  TR as cz,
  ge as d,
  Pa as d0,
  ou as d1,
  cj as d2,
  zB as d3,
  lj as d4,
  ij as d5,
  FB as d6,
  wB as d7,
  sk as d8,
  yN as d9,
  Nw as e,
  Iw as f,
  yw as g,
  mw as h,
  hw as i,
  pw as j,
  gw as k,
  Tw as l,
  Cw as m,
  vw as n,
  Zn as o,
  Xs as p,
  Cm as q,
  ww as r,
  ow as s,
  jl as t,
  Im as u,
  Bl as v,
  dx as w,
  gN as x,
  Rw as y,
  Ey as z,
  measures as measures
};
