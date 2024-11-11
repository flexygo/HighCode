import { r as registerInstance, n as createEvent, m as getElement } from './index-8e5b11cb.js';
import { g as global, b as browser$1 } from './process-es6-cc264d03.js';
import { g as getAugmentedNamespace, c as createCommonjsModule, a as commonjsGlobal, b as commonjsRequire } from './_commonjsHelpers-2a12c1e6.js';

const __dirname = '/Codigo GIT\Flexygo\Flexygo\Mobile\FlexyApp\node_modules\sql.js\dist';

var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
var inited = false;
function init () {
  inited = true;
  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
  }

  revLookup['-'.charCodeAt(0)] = 62;
  revLookup['_'.charCodeAt(0)] = 63;
}

function toByteArray (b64) {
  if (!inited) {
    init();
  }
  var i, j, l, tmp, placeHolders, arr;
  var len = b64.length;

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;

  // base64 is 4/3 + up to two characters of the original data
  arr = new Arr(len * 3 / 4 - placeHolders);

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len;

  var L = 0;

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)];
    arr[L++] = (tmp >> 16) & 0xFF;
    arr[L++] = (tmp >> 8) & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4);
    arr[L++] = tmp & 0xFF;
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2);
    arr[L++] = (tmp >> 8) & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
    output.push(tripletToBase64(tmp));
  }
  return output.join('')
}

function fromByteArray (uint8) {
  if (!inited) {
    init();
  }
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
  var output = '';
  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    output += lookup[tmp >> 2];
    output += lookup[(tmp << 4) & 0x3F];
    output += '==';
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1]);
    output += lookup[tmp >> 10];
    output += lookup[(tmp >> 4) & 0x3F];
    output += lookup[(tmp << 2) & 0x3F];
    output += '=';
  }

  parts.push(output);

  return parts.join('')
}

function read (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? (nBytes - 1) : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

function write (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
  var i = isLE ? 0 : (nBytes - 1);
  var d = isLE ? 1 : -1;
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128;
}

var toString = {}.toString;

var isArray = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var INSPECT_MAX_BYTES = 50;

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : true;

/*
 * Export kMaxLength after typed array support is determined.
 */
var _kMaxLength = kMaxLength();

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length);
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length);
    }
    that.length = length;
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192; // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype;
  return arr
};

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
};

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype;
  Buffer.__proto__ = Uint8Array;
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size);
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
};

function allocUnsafe (that, size) {
  assertSize(size);
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0;
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
};

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);

  var actual = that.write(string, encoding);

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual);
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255;
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array);
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array;
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array);
  }
  return that
}

function fromObject (that, obj) {
  if (internalIsBuffer(obj)) {
    var len = checked(obj.length) | 0;
    that = createBuffer(that, len);

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len);
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0;
  }
  return Buffer.alloc(+length)
}
Buffer.isBuffer = isBuffer;
function internalIsBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
};

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
};

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i;
  if (length === undefined) {
    length = 0;
    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }

  var buffer = Buffer.allocUnsafe(length);
  var pos = 0;
  for (i = 0; i < list.length; ++i) {
    var buf = list[i];
    if (!internalIsBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos);
    pos += buf.length;
  }
  return buffer
};

function byteLength (string, encoding) {
  if (internalIsBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string;
  }

  var len = string.length;
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}
Buffer.byteLength = byteLength;

function slowToString (encoding, start, end) {
  var loweredCase = false;

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0;
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length;
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0;
  start >>>= 0;

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8';

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true;

function swap (b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length;
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }
  return this
};

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length;
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }
  return this
};

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length;
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }
  return this
};

Buffer.prototype.toString = function toString () {
  var length = this.length | 0;
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
};

Buffer.prototype.equals = function equals (b) {
  if (!internalIsBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
};

Buffer.prototype.inspect = function inspect () {
  var str = '';
  var max = INSPECT_MAX_BYTES;
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
    if (this.length > max) str += ' ... ';
  }
  return '<Buffer ' + str + '>'
};

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!internalIsBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = target ? target.length : 0;
  }
  if (thisStart === undefined) {
    thisStart = 0;
  }
  if (thisEnd === undefined) {
    thisEnd = this.length;
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;

  if (this === target) return 0

  var x = thisEnd - thisStart;
  var y = end - start;
  var len = Math.min(x, y);

  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
};

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff;
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000;
  }
  byteOffset = +byteOffset;  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1);
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding);
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (internalIsBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF; // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase();
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i;
  if (dir) {
    var foundIndex = -1;
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
    for (i = byteOffset; i >= 0; i--) {
      var found = true;
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false;
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
};

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
};

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
};

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }

  // must be an even number of digits
  var strLen = string.length;
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed;
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8';
    length = this.length;
    offset = 0;
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset;
    length = this.length;
    offset = 0;
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0;
    if (isFinite(length)) {
      length = length | 0;
      if (encoding === undefined) encoding = 'utf8';
    } else {
      encoding = length;
      length = undefined;
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8';

  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
};

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return fromByteArray(buf)
  } else {
    return fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];

  var i = start;
  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1;

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte;
          }
          break
        case 2:
          secondByte = buf[i + 1];
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint;
            }
          }
          break
        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint;
            }
          }
          break
        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint;
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD;
      bytesPerSequence = 1;
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000;
      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }

    res.push(codePoint);
    i += bytesPerSequence;
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000;

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = '';
  var i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    );
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F);
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length;

  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;

  var out = '';
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i]);
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;

  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }

  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }

  if (end < start) end = start;

  var newBuf;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end);
    newBuf.__proto__ = Buffer.prototype;
  } else {
    var sliceLen = end - start;
    newBuf = new Buffer(sliceLen, undefined);
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start];
    }
  }

  return newBuf
};

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  return val
};

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length);
  }

  var val = this[offset + --byteLength];
  var mul = 1;
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul;
  }

  return val
};

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset]
};

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | (this[offset + 1] << 8)
};

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return (this[offset] << 8) | this[offset + 1]
};

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
};

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
};

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val
};

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var i = byteLength;
  var mul = 1;
  var val = this[offset + --i];
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val
};

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
};

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset] | (this[offset + 1] << 8);
  return (val & 0x8000) ? val | 0xFFFF0000 : val
};

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | (this[offset] << 8);
  return (val & 0x8000) ? val | 0xFFFF0000 : val
};

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
};

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
};

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return read(this, offset, true, 23, 4)
};

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return read(this, offset, false, 23, 4)
};

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return read(this, offset, true, 52, 8)
};

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return read(this, offset, false, 52, 8)
};

function checkInt (buf, value, offset, ext, max, min) {
  if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var mul = 1;
  var i = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var i = byteLength - 1;
  var mul = 1;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  this[offset] = (value & 0xff);
  return offset + 1
};

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8;
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2
};

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8);
    this[offset + 1] = (value & 0xff);
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2
};

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff;
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24);
    this[offset + 2] = (value >>> 16);
    this[offset + 1] = (value >>> 8);
    this[offset] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4
};

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24);
    this[offset + 1] = (value >>> 16);
    this[offset + 2] = (value >>> 8);
    this[offset + 3] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4
};

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = 0;
  var mul = 1;
  var sub = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = byteLength - 1;
  var mul = 1;
  var sub = 0;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  if (value < 0) value = 0xff + value + 1;
  this[offset] = (value & 0xff);
  return offset + 1
};

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2
};

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8);
    this[offset + 1] = (value & 0xff);
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2
};

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
    this[offset + 2] = (value >>> 16);
    this[offset + 3] = (value >>> 24);
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4
};

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (value < 0) value = 0xffffffff + value + 1;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24);
    this[offset + 1] = (value >>> 16);
    this[offset + 2] = (value >>> 8);
    this[offset + 3] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4
};

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4);
  }
  write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
};

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
};

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8);
  }
  write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
};

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
};

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start;

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length;
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }

  var len = end - start;
  var i;

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start];
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    );
  }

  return len
};

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      encoding = end;
      end = this.length;
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0);
      if (code < 256) {
        val = code;
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;

  if (!val) val = 0;

  var i;
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = internalIsBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString());
    var len = bytes.length;
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this
};

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '=';
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue
        }

        // valid lead
        leadSurrogate = codePoint;

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null;

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      );
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      );
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      );
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo;
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }

  return byteArray
}


function base64ToBytes (str) {
  return toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i];
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}


// the following is from is-buffer, also by Feross Aboukhadijeh and with same lisence
// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
function isBuffer(obj) {
  return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj))
}

function isFastBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0))
}

const empty = {};

const empty$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': empty
});

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
function resolve() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : '/';

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
function normalize(path) {
  var isPathAbsolute = isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isPathAbsolute).join('/');

  if (!path && !isPathAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isPathAbsolute ? '/' : '') + path;
};

// posix version
function isAbsolute(path) {
  return path.charAt(0) === '/';
}

// posix version
function join() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
}


// path.relative(from, to)
// posix version
function relative(from, to) {
  from = resolve(from).substr(1);
  to = resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
}

var sep = '/';
var delimiter = ':';

function dirname(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
}

function basename(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
}


function extname(path) {
  return splitPath(path)[3];
}
const path = {
  extname: extname,
  basename: basename,
  dirname: dirname,
  sep: sep,
  delimiter: delimiter,
  relative: relative,
  join: join,
  isAbsolute: isAbsolute,
  normalize: normalize,
  resolve: resolve
};
function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b' ?
    function (str, start, len) { return str.substr(start, len) } :
    function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

const path$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  resolve: resolve,
  normalize: normalize,
  isAbsolute: isAbsolute,
  join: join,
  relative: relative,
  sep: sep,
  delimiter: delimiter,
  dirname: dirname,
  basename: basename,
  extname: extname,
  'default': path
});

const require$$2 = /*@__PURE__*/getAugmentedNamespace(empty$1);

const require$$1 = /*@__PURE__*/getAugmentedNamespace(path$1);

var sqlWasm = createCommonjsModule(function (module, exports) {
// We are modularizing this manually because the current modularize setting in Emscripten has some issues:
// https://github.com/kripken/emscripten/issues/5820
// In addition, When you use emcc's modularization, it still expects to export a global object called `Module`,
// which is able to be used/called before the WASM is loaded.
// The modularization below exports a promise that loads and resolves to the actual sql.js module.
// That way, this module can't be used before the WASM is finished loading.

// We are going to define a function that a user will call to start loading initializing our Sql.js library
// However, that function might be called multiple times, and on subsequent calls, we don't actually want it to instantiate a new instance of the Module
// Instead, we want to return the previously loaded module

// TODO: Make this not declare a global if used in the browser
var initSqlJsPromise = undefined;

var initSqlJs = function (moduleConfig) {

    if (initSqlJsPromise){
      return initSqlJsPromise;
    }
    // If we're here, we've never called this function before
    initSqlJsPromise = new Promise(function (resolveModule, reject) {

        // We are modularizing this manually because the current modularize setting in Emscripten has some issues:
        // https://github.com/kripken/emscripten/issues/5820

        // The way to affect the loading of emcc compiled modules is to create a variable called `Module` and add
        // properties to it, like `preRun`, `postRun`, etc
        // We are using that to get notified when the WASM has finished loading.
        // Only then will we return our promise

        // If they passed in a moduleConfig object, use that
        // Otherwise, initialize Module to the empty object
        var Module = typeof moduleConfig !== 'undefined' ? moduleConfig : {};

        // EMCC only allows for a single onAbort function (not an array of functions)
        // So if the user defined their own onAbort function, we remember it and call it
        var originalOnAbortFunction = Module['onAbort'];
        Module['onAbort'] = function (errorThatCausedAbort) {
            reject(new Error(errorThatCausedAbort));
            if (originalOnAbortFunction){
              originalOnAbortFunction(errorThatCausedAbort);
            }
        };

        Module['postRun'] = Module['postRun'] || [];
        Module['postRun'].push(function () {
            // When Emscripted calls postRun, this promise resolves with the built Module
            resolveModule(Module);
        });

        // There is a section of code in the emcc-generated code below that looks like this:
        // (Note that this is lowercase `module`)
        // if (typeof module !== 'undefined') {
        //     module['exports'] = Module;
        // }
        // When that runs, it's going to overwrite our own modularization export efforts in shell-post.js!
        // The only way to tell emcc not to emit it is to pass the MODULARIZE=1 or MODULARIZE_INSTANCE=1 flags,
        // but that carries with it additional unnecessary baggage/bugs we don't want either.
        // So, we have three options:
        // 1) We undefine `module`
        // 2) We remember what `module['exports']` was at the beginning of this function and we restore it later
        // 3) We write a script to remove those lines of code as part of the Make process.
        //
        // Since those are the only lines of code that care about module, we will undefine it. It's the most straightforward
        // of the options, and has the side effect of reducing emcc's efforts to modify the module if its output were to change in the future.
        // That's a nice side effect since we're handling the modularization efforts ourselves
        module = undefined;

        // The emcc-generated code and shell-post.js code goes below,
        // meaning that all of it runs inside of this promise. If anything throws an exception, our promise will abort
var f;f||=typeof Module != 'undefined' ? Module : {};var aa="object"==typeof window,ba="function"==typeof importScripts,ca="object"==typeof browser$1&&"object"==typeof browser$1.versions&&"string"==typeof browser$1.versions.node;"use strict";
f.onRuntimeInitialized=function(){function a(g,l){switch(typeof l){case "boolean":fc(g,l?1:0);break;case "number":gc(g,l);break;case "string":hc(g,l,-1,-1);break;case "object":if(null===l)ib(g);else if(null!=l.length){var n=da(l,ea);ic(g,n,l.length,-1);fa(n);}else xa(g,"Wrong API use : tried to return a value of an unknown type ("+l+").",-1);break;default:ib(g);}}function b(g,l){for(var n=[],t=0;t<g;t+=1){var w=m(l+4*t,"i32"),A=jc(w);if(1===A||2===A)w=kc(w);else if(3===A)w=lc(w);else if(4===A){A=w;
w=mc(A);A=nc(A);for(var N=new Uint8Array(w),M=0;M<w;M+=1)N[M]=p[A+M];w=N;}else w=null;n.push(w);}return n}function c(g,l){this.Ka=g;this.db=l;this.Ia=1;this.eb=[];}function d(g,l){this.db=l;l=ha(g)+1;this.Xa=ia(l);if(null===this.Xa)throw Error("Unable to allocate memory for the SQL string");q(g,u,this.Xa,l);this.cb=this.Xa;this.Ta=this.hb=null;}function e(g){this.filename="dbfile_"+(4294967295*Math.random()>>>0);if(null!=g){var l=this.filename,n="/",t=l;n&&(n="string"==typeof n?n:ja(n),t=l?x(n+"/"+l):
n);l=ka(!0,!0);t=la(t,(void 0!==l?l:438)&4095|32768,0);if(g){if("string"==typeof g){n=Array(g.length);for(var w=0,A=g.length;w<A;++w)n[w]=g.charCodeAt(w);g=n;}ma(t,l|146);n=na(t,577);oa(n,g,0,g.length,0);pa(n);ma(t,l);}}this.handleError(r(this.filename,h));this.db=m(h,"i32");lb(this.db);this.Ya={};this.Ma={};}var h=y(4),k=f.cwrap,r=k("sqlite3_open","number",["string","number"]),z=k("sqlite3_close_v2","number",["number"]),v=k("sqlite3_exec","number",["number","string","number","number","number"]),E=k("sqlite3_changes",
"number",["number"]),H=k("sqlite3_prepare_v2","number",["number","string","number","number","number"]),mb=k("sqlite3_sql","string",["number"]),oc=k("sqlite3_normalized_sql","string",["number"]),nb=k("sqlite3_prepare_v2","number",["number","number","number","number","number"]),pc=k("sqlite3_bind_text","number",["number","number","number","number","number"]),ob=k("sqlite3_bind_blob","number",["number","number","number","number","number"]),qc=k("sqlite3_bind_double","number",["number","number","number"]),
rc=k("sqlite3_bind_int","number",["number","number","number"]),sc=k("sqlite3_bind_parameter_index","number",["number","string"]),tc=k("sqlite3_step","number",["number"]),uc=k("sqlite3_errmsg","string",["number"]),vc=k("sqlite3_column_count","number",["number"]),wc=k("sqlite3_data_count","number",["number"]),xc=k("sqlite3_column_double","number",["number","number"]),pb=k("sqlite3_column_text","string",["number","number"]),yc=k("sqlite3_column_blob","number",["number","number"]),zc=k("sqlite3_column_bytes",
"number",["number","number"]),Ac=k("sqlite3_column_type","number",["number","number"]),Bc=k("sqlite3_column_name","string",["number","number"]),Cc=k("sqlite3_reset","number",["number"]),Dc=k("sqlite3_clear_bindings","number",["number"]),Ec=k("sqlite3_finalize","number",["number"]),qb=k("sqlite3_create_function_v2","number","number string number number number number number number number".split(" ")),jc=k("sqlite3_value_type","number",["number"]),mc=k("sqlite3_value_bytes","number",["number"]),lc=k("sqlite3_value_text",
"string",["number"]),nc=k("sqlite3_value_blob","number",["number"]),kc=k("sqlite3_value_double","number",["number"]),gc=k("sqlite3_result_double","",["number","number"]),ib=k("sqlite3_result_null","",["number"]),hc=k("sqlite3_result_text","",["number","string","number","number"]),ic=k("sqlite3_result_blob","",["number","number","number","number"]),fc=k("sqlite3_result_int","",["number","number"]),xa=k("sqlite3_result_error","",["number","string","number"]),rb=k("sqlite3_aggregate_context","number",
["number","number"]),lb=k("RegisterExtensionFunctions","number",["number"]);c.prototype.bind=function(g){if(!this.Ka)throw "Statement closed";this.reset();return Array.isArray(g)?this.vb(g):null!=g&&"object"===typeof g?this.wb(g):!0};c.prototype.step=function(){if(!this.Ka)throw "Statement closed";this.Ia=1;var g=tc(this.Ka);switch(g){case 100:return !0;case 101:return !1;default:throw this.db.handleError(g);}};c.prototype.qb=function(g){null==g&&(g=this.Ia,this.Ia+=1);return xc(this.Ka,g)};c.prototype.zb=
function(g){null==g&&(g=this.Ia,this.Ia+=1);g=pb(this.Ka,g);if("function"!==typeof BigInt)throw Error("BigInt is not supported");return BigInt(g)};c.prototype.Ab=function(g){null==g&&(g=this.Ia,this.Ia+=1);return pb(this.Ka,g)};c.prototype.getBlob=function(g){null==g&&(g=this.Ia,this.Ia+=1);var l=zc(this.Ka,g);g=yc(this.Ka,g);for(var n=new Uint8Array(l),t=0;t<l;t+=1)n[t]=p[g+t];return n};c.prototype.get=function(g,l){l=l||{};null!=g&&this.bind(g)&&this.step();g=[];for(var n=wc(this.Ka),t=0;t<n;t+=
1)switch(Ac(this.Ka,t)){case 1:var w=l.useBigInt?this.zb(t):this.qb(t);g.push(w);break;case 2:g.push(this.qb(t));break;case 3:g.push(this.Ab(t));break;case 4:g.push(this.getBlob(t));break;default:g.push(null);}return g};c.prototype.getColumnNames=function(){for(var g=[],l=vc(this.Ka),n=0;n<l;n+=1)g.push(Bc(this.Ka,n));return g};c.prototype.getAsObject=function(g,l){g=this.get(g,l);l=this.getColumnNames();for(var n={},t=0;t<l.length;t+=1)n[l[t]]=g[t];return n};c.prototype.getSQL=function(){return mb(this.Ka)};
c.prototype.getNormalizedSQL=function(){return oc(this.Ka)};c.prototype.run=function(g){null!=g&&this.bind(g);this.step();return this.reset()};c.prototype.mb=function(g,l){null==l&&(l=this.Ia,this.Ia+=1);g=qa(g);var n=da(g,ea);this.eb.push(n);this.db.handleError(pc(this.Ka,l,n,g.length-1,0));};c.prototype.ub=function(g,l){null==l&&(l=this.Ia,this.Ia+=1);var n=da(g,ea);this.eb.push(n);this.db.handleError(ob(this.Ka,l,n,g.length,0));};c.prototype.lb=function(g,l){null==l&&(l=this.Ia,this.Ia+=1);this.db.handleError((g===
(g|0)?rc:qc)(this.Ka,l,g));};c.prototype.xb=function(g){null==g&&(g=this.Ia,this.Ia+=1);ob(this.Ka,g,0,0,0);};c.prototype.nb=function(g,l){null==l&&(l=this.Ia,this.Ia+=1);switch(typeof g){case "string":this.mb(g,l);return;case "number":this.lb(g,l);return;case "bigint":this.mb(g.toString(),l);return;case "boolean":this.lb(g+0,l);return;case "object":if(null===g){this.xb(l);return}if(null!=g.length){this.ub(g,l);return}}throw "Wrong API use : tried to bind a value of an unknown type ("+g+").";};c.prototype.wb=
function(g){var l=this;Object.keys(g).forEach(function(n){var t=sc(l.Ka,n);0!==t&&l.nb(g[n],t);});return !0};c.prototype.vb=function(g){for(var l=0;l<g.length;l+=1)this.nb(g[l],l+1);return !0};c.prototype.reset=function(){this.freemem();return 0===Dc(this.Ka)&&0===Cc(this.Ka)};c.prototype.freemem=function(){for(var g;void 0!==(g=this.eb.pop());)fa(g);};c.prototype.free=function(){this.freemem();var g=0===Ec(this.Ka);delete this.db.Ya[this.Ka];this.Ka=0;return g};d.prototype.next=function(){if(null===
this.Xa)return {done:!0};null!==this.Ta&&(this.Ta.free(),this.Ta=null);if(!this.db.db)throw this.fb(),Error("Database closed");var g=ra(),l=y(4);sa(h);sa(l);try{this.db.handleError(nb(this.db.db,this.cb,-1,h,l));this.cb=m(l,"i32");var n=m(h,"i32");if(0===n)return this.fb(),{done:!0};this.Ta=new c(n,this.db);this.db.Ya[n]=this.Ta;return {value:this.Ta,done:!1}}catch(t){throw this.hb=ta(this.cb),this.fb(),t;}finally{ua(g);}};d.prototype.fb=function(){fa(this.Xa);this.Xa=null;};d.prototype.getRemainingSQL=
function(){return null!==this.hb?this.hb:ta(this.cb)};"function"===typeof Symbol&&"symbol"===typeof Symbol.iterator&&(d.prototype[Symbol.iterator]=function(){return this});e.prototype.run=function(g,l){if(!this.db)throw "Database closed";if(l){g=this.prepare(g,l);try{g.step();}finally{g.free();}}else this.handleError(v(this.db,g,0,0,h));return this};e.prototype.exec=function(g,l,n){if(!this.db)throw "Database closed";var t=ra(),w=null;try{var A=va(g),N=y(4);for(g=[];0!==m(A,"i8");){sa(h);sa(N);this.handleError(nb(this.db,
A,-1,h,N));var M=m(h,"i32");A=m(N,"i32");if(0!==M){var K=null;w=new c(M,this);for(null!=l&&w.bind(l);w.step();)null===K&&(K={columns:w.getColumnNames(),values:[]},g.push(K)),K.values.push(w.get(null,n));w.free();}}return g}catch(O){throw w&&w.free(),O;}finally{ua(t);}};e.prototype.each=function(g,l,n,t,w){"function"===typeof l&&(t=n,n=l,l=void 0);g=this.prepare(g,l);try{for(;g.step();)n(g.getAsObject(null,w));}finally{g.free();}if("function"===typeof t)return t()};e.prototype.prepare=function(g,l){sa(h);
this.handleError(H(this.db,g,-1,h,0));g=m(h,"i32");if(0===g)throw "Nothing to prepare";var n=new c(g,this);null!=l&&n.bind(l);return this.Ya[g]=n};e.prototype.iterateStatements=function(g){return new d(g,this)};e.prototype["export"]=function(){Object.values(this.Ya).forEach(function(l){l.free();});Object.values(this.Ma).forEach(wa);this.Ma={};this.handleError(z(this.db));var g=ya(this.filename);this.handleError(r(this.filename,h));this.db=m(h,"i32");lb(this.db);return g};e.prototype.close=function(){null!==
this.db&&(Object.values(this.Ya).forEach(function(g){g.free();}),Object.values(this.Ma).forEach(wa),this.Ma={},this.handleError(z(this.db)),za("/"+this.filename),this.db=null);};e.prototype.handleError=function(g){if(0===g)return null;g=uc(this.db);throw Error(g);};e.prototype.getRowsModified=function(){return E(this.db)};e.prototype.create_function=function(g,l){Object.prototype.hasOwnProperty.call(this.Ma,g)&&(wa(this.Ma[g]),delete this.Ma[g]);var n=Aa(function(t,w,A){w=b(w,A);try{var N=l.apply(null,
w);}catch(M){xa(t,M,-1);return}a(t,N);},"viii");this.Ma[g]=n;this.handleError(qb(this.db,g,l.length,1,0,n,0,0,0));return this};e.prototype.create_aggregate=function(g,l){var n=l.init||function(){return null},t=l.finalize||function(K){return K},w=l.step;if(!w)throw "An aggregate function must have a step function in "+g;var A={};Object.hasOwnProperty.call(this.Ma,g)&&(wa(this.Ma[g]),delete this.Ma[g]);l=g+"__finalize";Object.hasOwnProperty.call(this.Ma,l)&&(wa(this.Ma[l]),delete this.Ma[l]);var N=Aa(function(K,
O,Ra){var Y=rb(K,1);Object.hasOwnProperty.call(A,Y)||(A[Y]=n());O=b(O,Ra);O=[A[Y]].concat(O);try{A[Y]=w.apply(null,O);}catch(Gc){delete A[Y],xa(K,Gc,-1);}},"viii"),M=Aa(function(K){var O=rb(K,1);try{var Ra=t(A[O]);}catch(Y){delete A[O];xa(K,Y,-1);return}a(K,Ra);delete A[O];},"vi");this.Ma[g]=N;this.Ma[l]=M;this.handleError(qb(this.db,g,w.length-1,1,0,0,N,M,0));return this};f.Database=e;};var Ba=Object.assign({},f),Ca="./this.program",B="",Da,Ea;
if(ca){var fs=require$$2,Fa=require$$1;B=__dirname+"/";Ea=a=>{a=Ga(a)?new URL(a):Fa.normalize(a);return fs.readFileSync(a)};Da=a=>{a=Ga(a)?new URL(a):Fa.normalize(a);return new Promise((b,c)=>{fs.readFile(a,void 0,(d,e)=>{d?c(d):b(e.buffer);});})};!f.thisProgram&&1<browser$1.argv.length&&(Ca=browser$1.argv[1].replace(/\\/g,"/"));browser$1.argv.slice(2);"undefined"!='object'&&(module.exports=f);}else if(aa||ba)ba?B=self.location.href:"undefined"!=typeof document&&document.currentScript&&(B=document.currentScript.src),
B=B.startsWith("blob:")?"":B.substr(0,B.replace(/[?#].*/,"").lastIndexOf("/")+1),ba&&(Ea=a=>{var b=new XMLHttpRequest;b.open("GET",a,!1);b.responseType="arraybuffer";b.send(null);return new Uint8Array(b.response)}),Da=a=>Ga(a)?new Promise((b,c)=>{var d=new XMLHttpRequest;d.open("GET",a,!0);d.responseType="arraybuffer";d.onload=()=>{(200==d.status||0==d.status&&d.response)&&c(d.response);b(d.status);};d.onerror=b;d.send(null);}):fetch(a,{credentials:"same-origin"}).then(b=>b.ok?b.arrayBuffer():Promise.reject(Error(b.status+
" : "+b.url)));var Ha=f.print||console.log.bind(console),C=f.printErr||console.error.bind(console);Object.assign(f,Ba);Ba=null;f.thisProgram&&(Ca=f.thisProgram);var Ia;f.wasmBinary&&(Ia=f.wasmBinary);var Ja,Ka=!1,p,u,La,D,F,Ma,Na;
function Oa(){var a=Ja.buffer;f.HEAP8=p=new Int8Array(a);f.HEAP16=La=new Int16Array(a);f.HEAPU8=u=new Uint8Array(a);f.HEAPU16=new Uint16Array(a);f.HEAP32=D=new Int32Array(a);f.HEAPU32=F=new Uint32Array(a);f.HEAPF32=Ma=new Float32Array(a);f.HEAPF64=Na=new Float64Array(a);}var Pa=[],Qa=[],Sa=[];function Ta(){var a=f.preRun.shift();Pa.unshift(a);}var Ua=0,Va=null,Wa=null;
function G(a){f.onAbort?.(a);a="Aborted("+a+")";C(a);Ka=!0;throw new WebAssembly.RuntimeError(a+". Build with -sASSERTIONS for more info.");}var Xa=a=>a.startsWith("data:application/octet-stream;base64,"),Ga=a=>a.startsWith("file://"),Ya;function Za(a){if(a==Ya&&Ia)return new Uint8Array(Ia);if(Ea)return Ea(a);throw "both async and sync fetching of the wasm failed";}function $a(a){return Ia?Promise.resolve().then(()=>Za(a)):Da(a).then(b=>new Uint8Array(b),()=>Za(a))}
function ab(a,b,c){return $a(a).then(d=>WebAssembly.instantiate(d,b)).then(c,d=>{C(`failed to asynchronously prepare wasm: ${d}`);G(d);})}function bb(a,b){var c=Ya;Ia||"function"!=typeof WebAssembly.instantiateStreaming||Xa(c)||Ga(c)||ca||"function"!=typeof fetch?ab(c,a,b):fetch(c,{credentials:"same-origin"}).then(d=>WebAssembly.instantiateStreaming(d,a).then(b,function(e){C(`wasm streaming compile failed: ${e}`);C("falling back to ArrayBuffer instantiation");return ab(c,a,b)}));}
var I,J,cb=a=>{for(;0<a.length;)a.shift()(f);};function m(a,b="i8"){b.endsWith("*")&&(b="*");switch(b){case "i1":return p[a];case "i8":return p[a];case "i16":return La[a>>1];case "i32":return D[a>>2];case "i64":G("to do getValue(i64) use WASM_BIGINT");case "float":return Ma[a>>2];case "double":return Na[a>>3];case "*":return F[a>>2];default:G(`invalid type for getValue: ${b}`);}}
function sa(a){var b="i32";b.endsWith("*")&&(b="*");switch(b){case "i1":p[a]=0;break;case "i8":p[a]=0;break;case "i16":La[a>>1]=0;break;case "i32":D[a>>2]=0;break;case "i64":G("to do setValue(i64) use WASM_BIGINT");case "float":Ma[a>>2]=0;break;case "double":Na[a>>3]=0;break;case "*":F[a>>2]=0;break;default:G(`invalid type for setValue: ${b}`);}}
var db="undefined"!=typeof TextDecoder?new TextDecoder:void 0,L=(a,b,c)=>{var d=b+c;for(c=b;a[c]&&!(c>=d);)++c;if(16<c-b&&a.buffer&&db)return db.decode(a.subarray(b,c));for(d="";b<c;){var e=a[b++];if(e&128){var h=a[b++]&63;if(192==(e&224))d+=String.fromCharCode((e&31)<<6|h);else {var k=a[b++]&63;e=224==(e&240)?(e&15)<<12|h<<6|k:(e&7)<<18|h<<12|k<<6|a[b++]&63;65536>e?d+=String.fromCharCode(e):(e-=65536,d+=String.fromCharCode(55296|e>>10,56320|e&1023));}}else d+=String.fromCharCode(e);}return d},ta=(a,
b)=>a?L(u,a,b):"",eb=(a,b)=>{for(var c=0,d=a.length-1;0<=d;d--){var e=a[d];"."===e?a.splice(d,1):".."===e?(a.splice(d,1),c++):c&&(a.splice(d,1),c--);}if(b)for(;c;c--)a.unshift("..");return a},x=a=>{var b="/"===a.charAt(0),c="/"===a.substr(-1);(a=eb(a.split("/").filter(d=>!!d),!b).join("/"))||b||(a=".");a&&c&&(a+="/");return (b?"/":"")+a},fb=a=>{var b=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);a=b[0];b=b[1];if(!a&&!b)return ".";b&&=b.substr(0,b.length-1);return a+
b},gb=a=>{if("/"===a)return "/";a=x(a);a=a.replace(/\/$/,"");var b=a.lastIndexOf("/");return -1===b?a:a.substr(b+1)},hb=()=>{if("object"==typeof crypto&&"function"==typeof crypto.getRandomValues)return c=>crypto.getRandomValues(c);if(ca)try{var a=require$$2;if(a.randomFillSync)return c=>a.randomFillSync(c);var b=a.randomBytes;return c=>(c.set(b(c.byteLength)),c)}catch(c){}G("initRandomDevice");},jb=a=>(jb=hb())(a),kb=(...a)=>{for(var b="",c=!1,d=a.length-1;-1<=d&&!c;d--){c=0<=d?a[d]:"/";if("string"!=
typeof c)throw new TypeError("Arguments to path.resolve must be strings");if(!c)return "";b=c+"/"+b;c="/"===c.charAt(0);}b=eb(b.split("/").filter(e=>!!e),!c).join("/");return (c?"/":"")+b||"."},sb=[],ha=a=>{for(var b=0,c=0;c<a.length;++c){var d=a.charCodeAt(c);127>=d?b++:2047>=d?b+=2:55296<=d&&57343>=d?(b+=4,++c):b+=3;}return b},q=(a,b,c,d)=>{if(!(0<d))return 0;var e=c;d=c+d-1;for(var h=0;h<a.length;++h){var k=a.charCodeAt(h);if(55296<=k&&57343>=k){var r=a.charCodeAt(++h);k=65536+((k&1023)<<10)|r&1023;}if(127>=
k){if(c>=d)break;b[c++]=k;}else {if(2047>=k){if(c+1>=d)break;b[c++]=192|k>>6;}else {if(65535>=k){if(c+2>=d)break;b[c++]=224|k>>12;}else {if(c+3>=d)break;b[c++]=240|k>>18;b[c++]=128|k>>12&63;}b[c++]=128|k>>6&63;}b[c++]=128|k&63;}}b[c]=0;return c-e};function qa(a,b){var c=Array(ha(a)+1);a=q(a,c,0,c.length);b&&(c.length=a);return c}var tb=[];function ub(a,b){tb[a]={input:[],output:[],Wa:b};vb(a,wb);}
var wb={open(a){var b=tb[a.node.rdev];if(!b)throw new P(43);a.tty=b;a.seekable=!1;},close(a){a.tty.Wa.fsync(a.tty);},fsync(a){a.tty.Wa.fsync(a.tty);},read(a,b,c,d){if(!a.tty||!a.tty.Wa.rb)throw new P(60);for(var e=0,h=0;h<d;h++){try{var k=a.tty.Wa.rb(a.tty);}catch(r){throw new P(29);}if(void 0===k&&0===e)throw new P(6);if(null===k||void 0===k)break;e++;b[c+h]=k;}e&&(a.node.timestamp=Date.now());return e},write(a,b,c,d){if(!a.tty||!a.tty.Wa.ib)throw new P(60);try{for(var e=0;e<d;e++)a.tty.Wa.ib(a.tty,b[c+
e]);}catch(h){throw new P(29);}d&&(a.node.timestamp=Date.now());return e}},xb={rb(){a:{if(!sb.length){var a=null;if(ca){var b=Buffer.alloc(256),c=0,d=browser$1.stdin.fd;try{c=fs.readSync(d,b,0,256);}catch(e){if(e.toString().includes("EOF"))c=0;else throw e;}0<c&&(a=b.slice(0,c).toString("utf-8"));}else "undefined"!=typeof window&&"function"==typeof window.prompt&&(a=window.prompt("Input: "),null!==a&&(a+="\n"));if(!a){a=null;break a}sb=qa(a,!0);}a=sb.shift();}return a},ib(a,b){null===b||10===b?(Ha(L(a.output,
0)),a.output=[]):0!=b&&a.output.push(b);},fsync(a){a.output&&0<a.output.length&&(Ha(L(a.output,0)),a.output=[]);},Lb(){return {Gb:25856,Ib:5,Fb:191,Hb:35387,Eb:[3,28,127,21,4,0,1,0,17,19,26,0,18,15,23,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}},Mb(){return 0},Nb(){return [24,80]}},yb={ib(a,b){null===b||10===b?(C(L(a.output,0)),a.output=[]):0!=b&&a.output.push(b);},fsync(a){a.output&&0<a.output.length&&(C(L(a.output,0)),a.output=[]);}};
function zb(a,b){var c=a.Ha?a.Ha.length:0;c>=b||(b=Math.max(b,c*(1048576>c?2:1.125)>>>0),0!=c&&(b=Math.max(b,256)),c=a.Ha,a.Ha=new Uint8Array(b),0<a.La&&a.Ha.set(c.subarray(0,a.La),0));}
var Q={Pa:null,Qa(){return Q.createNode(null,"/",16895,0)},createNode(a,b,c,d){if(24576===(c&61440)||4096===(c&61440))throw new P(63);Q.Pa||(Q.Pa={dir:{node:{Oa:Q.Fa.Oa,Na:Q.Fa.Na,lookup:Q.Fa.lookup,$a:Q.Fa.$a,rename:Q.Fa.rename,unlink:Q.Fa.unlink,rmdir:Q.Fa.rmdir,readdir:Q.Fa.readdir,symlink:Q.Fa.symlink},stream:{Sa:Q.Ga.Sa}},file:{node:{Oa:Q.Fa.Oa,Na:Q.Fa.Na},stream:{Sa:Q.Ga.Sa,read:Q.Ga.read,write:Q.Ga.write,kb:Q.Ga.kb,ab:Q.Ga.ab,bb:Q.Ga.bb}},link:{node:{Oa:Q.Fa.Oa,Na:Q.Fa.Na,readlink:Q.Fa.readlink},
stream:{}},ob:{node:{Oa:Q.Fa.Oa,Na:Q.Fa.Na},stream:Ab}});c=Bb(a,b,c,d);R(c.mode)?(c.Fa=Q.Pa.dir.node,c.Ga=Q.Pa.dir.stream,c.Ha={}):32768===(c.mode&61440)?(c.Fa=Q.Pa.file.node,c.Ga=Q.Pa.file.stream,c.La=0,c.Ha=null):40960===(c.mode&61440)?(c.Fa=Q.Pa.link.node,c.Ga=Q.Pa.link.stream):8192===(c.mode&61440)&&(c.Fa=Q.Pa.ob.node,c.Ga=Q.Pa.ob.stream);c.timestamp=Date.now();a&&(a.Ha[b]=c,a.timestamp=c.timestamp);return c},Kb(a){return a.Ha?a.Ha.subarray?a.Ha.subarray(0,a.La):new Uint8Array(a.Ha):new Uint8Array(0)},
Fa:{Oa(a){var b={};b.dev=8192===(a.mode&61440)?a.id:1;b.ino=a.id;b.mode=a.mode;b.nlink=1;b.uid=0;b.gid=0;b.rdev=a.rdev;R(a.mode)?b.size=4096:32768===(a.mode&61440)?b.size=a.La:40960===(a.mode&61440)?b.size=a.link.length:b.size=0;b.atime=new Date(a.timestamp);b.mtime=new Date(a.timestamp);b.ctime=new Date(a.timestamp);b.yb=4096;b.blocks=Math.ceil(b.size/b.yb);return b},Na(a,b){void 0!==b.mode&&(a.mode=b.mode);void 0!==b.timestamp&&(a.timestamp=b.timestamp);if(void 0!==b.size&&(b=b.size,a.La!=b))if(0==
b)a.Ha=null,a.La=0;else {var c=a.Ha;a.Ha=new Uint8Array(b);c&&a.Ha.set(c.subarray(0,Math.min(b,a.La)));a.La=b;}},lookup(){throw Cb[44];},$a(a,b,c,d){return Q.createNode(a,b,c,d)},rename(a,b,c){if(R(a.mode)){try{var d=Db(b,c);}catch(h){}if(d)for(var e in d.Ha)throw new P(55);}delete a.parent.Ha[a.name];a.parent.timestamp=Date.now();a.name=c;b.Ha[c]=a;b.timestamp=a.parent.timestamp;},unlink(a,b){delete a.Ha[b];a.timestamp=Date.now();},rmdir(a,b){var c=Db(a,b),d;for(d in c.Ha)throw new P(55);delete a.Ha[b];
a.timestamp=Date.now();},readdir(a){var b=[".",".."],c;for(c of Object.keys(a.Ha))b.push(c);return b},symlink(a,b,c){a=Q.createNode(a,b,41471,0);a.link=c;return a},readlink(a){if(40960!==(a.mode&61440))throw new P(28);return a.link}},Ga:{read(a,b,c,d,e){var h=a.node.Ha;if(e>=a.node.La)return 0;a=Math.min(a.node.La-e,d);if(8<a&&h.subarray)b.set(h.subarray(e,e+a),c);else for(d=0;d<a;d++)b[c+d]=h[e+d];return a},write(a,b,c,d,e,h){b.buffer===p.buffer&&(h=!1);if(!d)return 0;a=a.node;a.timestamp=Date.now();
if(b.subarray&&(!a.Ha||a.Ha.subarray)){if(h)return a.Ha=b.subarray(c,c+d),a.La=d;if(0===a.La&&0===e)return a.Ha=b.slice(c,c+d),a.La=d;if(e+d<=a.La)return a.Ha.set(b.subarray(c,c+d),e),d}zb(a,e+d);if(a.Ha.subarray&&b.subarray)a.Ha.set(b.subarray(c,c+d),e);else for(h=0;h<d;h++)a.Ha[e+h]=b[c+h];a.La=Math.max(a.La,e+d);return d},Sa(a,b,c){1===c?b+=a.position:2===c&&32768===(a.node.mode&61440)&&(b+=a.node.La);if(0>b)throw new P(28);return b},kb(a,b,c){zb(a.node,b+c);a.node.La=Math.max(a.node.La,b+c);},
ab(a,b,c,d,e){if(32768!==(a.node.mode&61440))throw new P(43);a=a.node.Ha;if(e&2||a.buffer!==p.buffer){if(0<c||c+b<a.length)a.subarray?a=a.subarray(c,c+b):a=Array.prototype.slice.call(a,c,c+b);c=!0;b=65536*Math.ceil(b/65536);(e=Eb(65536,b))?(u.fill(0,e,e+b),b=e):b=0;if(!b)throw new P(48);p.set(a,b);}else c=!1,b=a.byteOffset;return {Cb:b,tb:c}},bb(a,b,c,d){Q.Ga.write(a,b,0,d,c,!1);return 0}}},ka=(a,b)=>{var c=0;a&&(c|=365);b&&(c|=146);return c},Fb=null,Gb={},Hb=[],Ib=1,S=null,Jb=!0,P=class{constructor(a){this.name=
"ErrnoError";this.Ja=a;}},Cb={},Kb=class{constructor(){this.Za={};this.node=null;}get flags(){return this.Za.flags}set flags(a){this.Za.flags=a;}get position(){return this.Za.position}set position(a){this.Za.position=a;}},Lb=class{constructor(a,b,c,d){a||=this;this.parent=a;this.Qa=a.Qa;this.Ua=null;this.id=Ib++;this.name=b;this.mode=c;this.Fa={};this.Ga={};this.rdev=d;}get read(){return 365===(this.mode&365)}set read(a){a?this.mode|=365:this.mode&=-366;}get write(){return 146===(this.mode&146)}set write(a){a?
this.mode|=146:this.mode&=-147;}};function T(a,b={}){a=kb(a);if(!a)return {path:"",node:null};b=Object.assign({pb:!0,jb:0},b);if(8<b.jb)throw new P(32);a=a.split("/").filter(k=>!!k);for(var c=Fb,d="/",e=0;e<a.length;e++){var h=e===a.length-1;if(h&&b.parent)break;c=Db(c,a[e]);d=x(d+"/"+a[e]);c.Ua&&(!h||h&&b.pb)&&(c=c.Ua.root);if(!h||b.Ra)for(h=0;40960===(c.mode&61440);)if(c=Mb(d),d=kb(fb(d),c),c=T(d,{jb:b.jb+1}).node,40<h++)throw new P(32);}return {path:d,node:c}}
function ja(a){for(var b;;){if(a===a.parent)return a=a.Qa.sb,b?"/"!==a[a.length-1]?`${a}/${b}`:a+b:a;b=b?`${a.name}/${b}`:a.name;a=a.parent;}}function Nb(a,b){for(var c=0,d=0;d<b.length;d++)c=(c<<5)-c+b.charCodeAt(d)|0;return (a+c>>>0)%S.length}function Ob(a){var b=Nb(a.parent.id,a.name);if(S[b]===a)S[b]=a.Va;else for(b=S[b];b;){if(b.Va===a){b.Va=a.Va;break}b=b.Va;}}
function Db(a,b){var c=R(a.mode)?(c=Pb(a,"x"))?c:a.Fa.lookup?0:2:54;if(c)throw new P(c);for(c=S[Nb(a.id,b)];c;c=c.Va){var d=c.name;if(c.parent.id===a.id&&d===b)return c}return a.Fa.lookup(a,b)}function Bb(a,b,c,d){a=new Lb(a,b,c,d);b=Nb(a.parent.id,a.name);a.Va=S[b];return S[b]=a}function R(a){return 16384===(a&61440)}function Qb(a){var b=["r","w","rw"][a&3];a&512&&(b+="w");return b}
function Pb(a,b){if(Jb)return 0;if(!b.includes("r")||a.mode&292){if(b.includes("w")&&!(a.mode&146)||b.includes("x")&&!(a.mode&73))return 2}else return 2;return 0}function Rb(a,b){try{return Db(a,b),20}catch(c){}return Pb(a,"wx")}function Sb(a,b,c){try{var d=Db(a,b);}catch(e){return e.Ja}if(a=Pb(a,"wx"))return a;if(c){if(!R(d.mode))return 54;if(d===d.parent||"/"===ja(d))return 10}else if(R(d.mode))return 31;return 0}function U(a){a=Hb[a];if(!a)throw new P(8);return a}
function Tb(a,b=-1){a=Object.assign(new Kb,a);if(-1==b)a:{for(b=0;4096>=b;b++)if(!Hb[b])break a;throw new P(33);}a.fd=b;return Hb[b]=a}function Ub(a,b=-1){a=Tb(a,b);a.Ga?.Jb?.(a);return a}var Ab={open(a){a.Ga=Gb[a.node.rdev].Ga;a.Ga.open?.(a);},Sa(){throw new P(70);}};function vb(a,b){Gb[a]={Ga:b};}
function Vb(a,b){var c="/"===b;if(c&&Fb)throw new P(10);if(!c&&b){var d=T(b,{pb:!1});b=d.path;d=d.node;if(d.Ua)throw new P(10);if(!R(d.mode))throw new P(54);}b={type:a,Ob:{},sb:b,Bb:[]};a=a.Qa(b);a.Qa=b;b.root=a;c?Fb=a:d&&(d.Ua=b,d.Qa&&d.Qa.Bb.push(b));}function la(a,b,c){var d=T(a,{parent:!0}).node;a=gb(a);if(!a||"."===a||".."===a)throw new P(28);var e=Rb(d,a);if(e)throw new P(e);if(!d.Fa.$a)throw new P(63);return d.Fa.$a(d,a,b,c)}function V(a,b){return la(a,(void 0!==b?b:511)&1023|16384,0)}
function Wb(a,b,c){"undefined"==typeof c&&(c=b,b=438);la(a,b|8192,c);}function Xb(a,b){if(!kb(a))throw new P(44);var c=T(b,{parent:!0}).node;if(!c)throw new P(44);b=gb(b);var d=Rb(c,b);if(d)throw new P(d);if(!c.Fa.symlink)throw new P(63);c.Fa.symlink(c,b,a);}function Yb(a){var b=T(a,{parent:!0}).node;a=gb(a);var c=Db(b,a),d=Sb(b,a,!0);if(d)throw new P(d);if(!b.Fa.rmdir)throw new P(63);if(c.Ua)throw new P(10);b.Fa.rmdir(b,a);Ob(c);}
function za(a){var b=T(a,{parent:!0}).node;if(!b)throw new P(44);a=gb(a);var c=Db(b,a),d=Sb(b,a,!1);if(d)throw new P(d);if(!b.Fa.unlink)throw new P(63);if(c.Ua)throw new P(10);b.Fa.unlink(b,a);Ob(c);}function Mb(a){a=T(a).node;if(!a)throw new P(44);if(!a.Fa.readlink)throw new P(28);return kb(ja(a.parent),a.Fa.readlink(a))}function Zb(a,b){a=T(a,{Ra:!b}).node;if(!a)throw new P(44);if(!a.Fa.Oa)throw new P(63);return a.Fa.Oa(a)}function $b(a){return Zb(a,!0)}
function ma(a,b){a="string"==typeof a?T(a,{Ra:!0}).node:a;if(!a.Fa.Na)throw new P(63);a.Fa.Na(a,{mode:b&4095|a.mode&-4096,timestamp:Date.now()});}function ac(a,b){if(0>b)throw new P(28);a="string"==typeof a?T(a,{Ra:!0}).node:a;if(!a.Fa.Na)throw new P(63);if(R(a.mode))throw new P(31);if(32768!==(a.mode&61440))throw new P(28);var c=Pb(a,"w");if(c)throw new P(c);a.Fa.Na(a,{size:b,timestamp:Date.now()});}
function na(a,b,c){if(""===a)throw new P(44);if("string"==typeof b){var d={r:0,"r+":2,w:577,"w+":578,a:1089,"a+":1090}[b];if("undefined"==typeof d)throw Error(`Unknown file open mode: ${b}`);b=d;}c=b&64?("undefined"==typeof c?438:c)&4095|32768:0;if("object"==typeof a)var e=a;else {a=x(a);try{e=T(a,{Ra:!(b&131072)}).node;}catch(h){}}d=!1;if(b&64)if(e){if(b&128)throw new P(20);}else e=la(a,c,0),d=!0;if(!e)throw new P(44);8192===(e.mode&61440)&&(b&=-513);if(b&65536&&!R(e.mode))throw new P(54);if(!d&&(c=
e?40960===(e.mode&61440)?32:R(e.mode)&&("r"!==Qb(b)||b&512)?31:Pb(e,Qb(b)):44))throw new P(c);b&512&&!d&&ac(e,0);b&=-131713;e=Tb({node:e,path:ja(e),flags:b,seekable:!0,position:0,Ga:e.Ga,Db:[],error:!1});e.Ga.open&&e.Ga.open(e);!f.logReadFiles||b&1||(bc||={},a in bc||(bc[a]=1));return e}function pa(a){if(null===a.fd)throw new P(8);a.gb&&(a.gb=null);try{a.Ga.close&&a.Ga.close(a);}catch(b){throw b;}finally{Hb[a.fd]=null;}a.fd=null;}
function cc(a,b,c){if(null===a.fd)throw new P(8);if(!a.seekable||!a.Ga.Sa)throw new P(70);if(0!=c&&1!=c&&2!=c)throw new P(28);a.position=a.Ga.Sa(a,b,c);a.Db=[];}function dc(a,b,c,d,e){if(0>d||0>e)throw new P(28);if(null===a.fd)throw new P(8);if(1===(a.flags&2097155))throw new P(8);if(R(a.node.mode))throw new P(31);if(!a.Ga.read)throw new P(28);var h="undefined"!=typeof e;if(!h)e=a.position;else if(!a.seekable)throw new P(70);b=a.Ga.read(a,b,c,d,e);h||(a.position+=b);return b}
function oa(a,b,c,d,e){if(0>d||0>e)throw new P(28);if(null===a.fd)throw new P(8);if(0===(a.flags&2097155))throw new P(8);if(R(a.node.mode))throw new P(31);if(!a.Ga.write)throw new P(28);a.seekable&&a.flags&1024&&cc(a,0,2);var h="undefined"!=typeof e;if(!h)e=a.position;else if(!a.seekable)throw new P(70);b=a.Ga.write(a,b,c,d,e,void 0);h||(a.position+=b);return b}
function ya(a){var b="binary";if("utf8"!==b&&"binary"!==b)throw Error(`Invalid encoding type "${b}"`);var c;var d=na(a,d||0);a=Zb(a).size;var e=new Uint8Array(a);dc(d,e,0,a,0);"utf8"===b?c=L(e,0):"binary"===b&&(c=e);pa(d);return c}var ec;
function Fc(a,b,c){a=x("/dev/"+a);var d=ka(!!b,!!c);Hc||=64;var e=Hc++<<8|0;vb(e,{open(h){h.seekable=!1;},close(){c?.buffer?.length&&c(10);},read(h,k,r,z){for(var v=0,E=0;E<z;E++){try{var H=b();}catch(mb){throw new P(29);}if(void 0===H&&0===v)throw new P(6);if(null===H||void 0===H)break;v++;k[r+E]=H;}v&&(h.node.timestamp=Date.now());return v},write(h,k,r,z){for(var v=0;v<z;v++)try{c(k[r+v]);}catch(E){throw new P(29);}z&&(h.node.timestamp=Date.now());return v}});Wb(a,d,e);}var Hc,W={},bc;
function Ic(a,b,c){if("/"===b.charAt(0))return b;a=-100===a?"/":U(a).path;if(0==b.length){if(!c)throw new P(44);return a}return x(a+"/"+b)}
function Jc(a,b,c){a=a(b);D[c>>2]=a.dev;D[c+4>>2]=a.mode;F[c+8>>2]=a.nlink;D[c+12>>2]=a.uid;D[c+16>>2]=a.gid;D[c+20>>2]=a.rdev;J=[a.size>>>0,(I=a.size,1<=+Math.abs(I)?0<I?+Math.floor(I/4294967296)>>>0:~~+Math.ceil((I-+(~~I>>>0))/4294967296)>>>0:0)];D[c+24>>2]=J[0];D[c+28>>2]=J[1];D[c+32>>2]=4096;D[c+36>>2]=a.blocks;b=a.atime.getTime();var d=a.mtime.getTime(),e=a.ctime.getTime();J=[Math.floor(b/1E3)>>>0,(I=Math.floor(b/1E3),1<=+Math.abs(I)?0<I?+Math.floor(I/4294967296)>>>0:~~+Math.ceil((I-+(~~I>>>
0))/4294967296)>>>0:0)];D[c+40>>2]=J[0];D[c+44>>2]=J[1];F[c+48>>2]=b%1E3*1E3;J=[Math.floor(d/1E3)>>>0,(I=Math.floor(d/1E3),1<=+Math.abs(I)?0<I?+Math.floor(I/4294967296)>>>0:~~+Math.ceil((I-+(~~I>>>0))/4294967296)>>>0:0)];D[c+56>>2]=J[0];D[c+60>>2]=J[1];F[c+64>>2]=d%1E3*1E3;J=[Math.floor(e/1E3)>>>0,(I=Math.floor(e/1E3),1<=+Math.abs(I)?0<I?+Math.floor(I/4294967296)>>>0:~~+Math.ceil((I-+(~~I>>>0))/4294967296)>>>0:0)];D[c+72>>2]=J[0];D[c+76>>2]=J[1];F[c+80>>2]=e%1E3*1E3;J=[a.ino>>>0,(I=a.ino,1<=+Math.abs(I)?
0<I?+Math.floor(I/4294967296)>>>0:~~+Math.ceil((I-+(~~I>>>0))/4294967296)>>>0:0)];D[c+88>>2]=J[0];D[c+92>>2]=J[1];return 0}var Kc=void 0;function Lc(){var a=D[+Kc>>2];Kc+=4;return a}
var Mc=(a,b)=>b+2097152>>>0<4194305-!!a?(a>>>0)+4294967296*b:NaN,Nc=[0,31,60,91,121,152,182,213,244,274,305,335],Oc=[0,31,59,90,120,151,181,212,243,273,304,334],Pc={},Rc=()=>{if(!Qc){var a={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:("object"==typeof navigator&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:Ca||"./this.program"},b;for(b in Pc)void 0===Pc[b]?delete a[b]:a[b]=Pc[b];var c=[];for(b in a)c.push(`${b}=${a[b]}`);Qc=c;}return Qc},
Qc,va=a=>{var b=ha(a)+1,c=y(b);q(a,u,c,b);return c},Sc=(a,b,c,d)=>{var e={string:v=>{var E=0;null!==v&&void 0!==v&&0!==v&&(E=va(v));return E},array:v=>{var E=y(v.length);p.set(v,E);return E}};a=f["_"+a];var h=[],k=0;if(d)for(var r=0;r<d.length;r++){var z=e[c[r]];z?(0===k&&(k=ra()),h[r]=z(d[r])):h[r]=d[r];}c=a(...h);return c=function(v){0!==k&&ua(k);return "string"===b?v?L(u,v):"":"boolean"===b?!!v:v}(c)},ea=0,da=(a,b)=>{b=1==b?y(a.length):ia(a.length);a.subarray||a.slice||(a=new Uint8Array(a));u.set(a,
b);return b},Tc,Uc=[],X,wa=a=>{Tc.delete(X.get(a));X.set(a,null);Uc.push(a);},Aa=(a,b)=>{if(!Tc){Tc=new WeakMap;var c=X.length;if(Tc)for(var d=0;d<0+c;d++){var e=X.get(d);e&&Tc.set(e,d);}}if(c=Tc.get(a)||0)return c;if(Uc.length)c=Uc.pop();else {try{X.grow(1);}catch(r){if(!(r instanceof RangeError))throw r;throw "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.";}c=X.length-1;}try{X.set(c,a);}catch(r){if(!(r instanceof TypeError))throw r;if("function"==typeof WebAssembly.Function){d=WebAssembly.Function;
e={i:"i32",j:"i64",f:"f32",d:"f64",e:"externref",p:"i32"};for(var h={parameters:[],results:"v"==b[0]?[]:[e[b[0]]]},k=1;k<b.length;++k)h.parameters.push(e[b[k]]);b=new d(h,a);}else {d=[1];e=b.slice(0,1);b=b.slice(1);h={i:127,p:127,j:126,f:125,d:124,e:111};d.push(96);k=b.length;128>k?d.push(k):d.push(k%128|128,k>>7);for(k=0;k<b.length;++k)d.push(h[b[k]]);"v"==e?d.push(0):d.push(1,h[e]);b=[0,97,115,109,1,0,0,0,1];e=d.length;128>e?b.push(e):b.push(e%128|128,e>>7);b.push(...d);b.push(2,7,1,1,101,1,102,0,
0,7,5,1,1,102,0,0);b=new WebAssembly.Module(new Uint8Array(b));b=(new WebAssembly.Instance(b,{e:{f:a}})).exports.f;}X.set(c,b);}Tc.set(a,c);return c};[44].forEach(a=>{Cb[a]=new P(a);Cb[a].stack="<generic error, no stack>";});S=Array(4096);Vb(Q,"/");V("/tmp");V("/home");V("/home/web_user");
(function(){V("/dev");vb(259,{read:()=>0,write:(d,e,h,k)=>k});Wb("/dev/null",259);ub(1280,xb);ub(1536,yb);Wb("/dev/tty",1280);Wb("/dev/tty1",1536);var a=new Uint8Array(1024),b=0,c=()=>{0===b&&(b=jb(a).byteLength);return a[--b]};Fc("random",c);Fc("urandom",c);V("/dev/shm");V("/dev/shm/tmp");})();
(function(){V("/proc");var a=V("/proc/self");V("/proc/self/fd");Vb({Qa(){var b=Bb(a,"fd",16895,73);b.Fa={lookup(c,d){var e=U(+d);c={parent:null,Qa:{sb:"fake"},Fa:{readlink:()=>e.path}};return c.parent=c}};return b}},"/proc/self/fd");})();
var Vc={a:(a,b,c,d)=>{G(`Assertion failed: ${a?L(u,a):""}, at: `+[b?b?L(u,b):"":"unknown filename",c,d?d?L(u,d):"":"unknown function"]);},h:function(a,b){try{return a=a?L(u,a):"",ma(a,b),0}catch(c){if("undefined"==typeof W||"ErrnoError"!==c.name)throw c;return -c.Ja}},H:function(a,b,c){try{b=b?L(u,b):"";b=Ic(a,b);if(c&-8)return -28;var d=T(b,{Ra:!0}).node;if(!d)return -44;a="";c&4&&(a+="r");c&2&&(a+="w");c&1&&(a+="x");return a&&Pb(d,a)?-2:0}catch(e){if("undefined"==typeof W||"ErrnoError"!==e.name)throw e;
return -e.Ja}},i:function(a,b){try{var c=U(a);ma(c.node,b);return 0}catch(d){if("undefined"==typeof W||"ErrnoError"!==d.name)throw d;return -d.Ja}},g:function(a){try{var b=U(a).node;var c="string"==typeof b?T(b,{Ra:!0}).node:b;if(!c.Fa.Na)throw new P(63);c.Fa.Na(c,{timestamp:Date.now()});return 0}catch(d){if("undefined"==typeof W||"ErrnoError"!==d.name)throw d;return -d.Ja}},b:function(a,b,c){Kc=c;try{var d=U(a);switch(b){case 0:var e=Lc();if(0>e)break;for(;Hb[e];)e++;return Ub(d,e).fd;case 1:case 2:return 0;
case 3:return d.flags;case 4:return e=Lc(),d.flags|=e,0;case 12:return e=Lc(),La[e+0>>1]=2,0;case 13:case 14:return 0}return -28}catch(h){if("undefined"==typeof W||"ErrnoError"!==h.name)throw h;return -h.Ja}},f:function(a,b){try{var c=U(a);return Jc(Zb,c.path,b)}catch(d){if("undefined"==typeof W||"ErrnoError"!==d.name)throw d;return -d.Ja}},n:function(a,b,c){b=Mc(b,c);try{if(isNaN(b))return 61;var d=U(a);if(0===(d.flags&2097155))throw new P(28);ac(d.node,b);return 0}catch(e){if("undefined"==typeof W||
"ErrnoError"!==e.name)throw e;return -e.Ja}},C:function(a,b){try{if(0===b)return -28;var c=ha("/")+1;if(b<c)return -68;q("/",u,a,b);return c}catch(d){if("undefined"==typeof W||"ErrnoError"!==d.name)throw d;return -d.Ja}},F:function(a,b){try{return a=a?L(u,a):"",Jc($b,a,b)}catch(c){if("undefined"==typeof W||"ErrnoError"!==c.name)throw c;return -c.Ja}},z:function(a,b,c){try{return b=b?L(u,b):"",b=Ic(a,b),b=x(b),"/"===b[b.length-1]&&(b=b.substr(0,b.length-1)),V(b,c),0}catch(d){if("undefined"==typeof W||"ErrnoError"!==
d.name)throw d;return -d.Ja}},E:function(a,b,c,d){try{b=b?L(u,b):"";var e=d&256;b=Ic(a,b,d&4096);return Jc(e?$b:Zb,b,c)}catch(h){if("undefined"==typeof W||"ErrnoError"!==h.name)throw h;return -h.Ja}},x:function(a,b,c,d){Kc=d;try{b=b?L(u,b):"";b=Ic(a,b);var e=d?Lc():0;return na(b,c,e).fd}catch(h){if("undefined"==typeof W||"ErrnoError"!==h.name)throw h;return -h.Ja}},v:function(a,b,c,d){try{b=b?L(u,b):"";b=Ic(a,b);if(0>=d)return -28;var e=Mb(b),h=Math.min(d,ha(e)),k=p[c+h];q(e,u,c,d+1);p[c+h]=k;return h}catch(r){if("undefined"==
typeof W||"ErrnoError"!==r.name)throw r;return -r.Ja}},u:function(a){try{return a=a?L(u,a):"",Yb(a),0}catch(b){if("undefined"==typeof W||"ErrnoError"!==b.name)throw b;return -b.Ja}},G:function(a,b){try{return a=a?L(u,a):"",Jc(Zb,a,b)}catch(c){if("undefined"==typeof W||"ErrnoError"!==c.name)throw c;return -c.Ja}},r:function(a,b,c){try{return b=b?L(u,b):"",b=Ic(a,b),0===c?za(b):512===c?Yb(b):G("Invalid flags passed to unlinkat"),0}catch(d){if("undefined"==typeof W||"ErrnoError"!==d.name)throw d;return -d.Ja}},
q:function(a,b,c){try{b=b?L(u,b):"";b=Ic(a,b,!0);if(c){var d=F[c>>2]+4294967296*D[c+4>>2],e=D[c+8>>2];h=1E3*d+e/1E6;c+=16;d=F[c>>2]+4294967296*D[c+4>>2];e=D[c+8>>2];k=1E3*d+e/1E6;}else var h=Date.now(),k=h;a=h;var r=T(b,{Ra:!0}).node;r.Fa.Na(r,{timestamp:Math.max(a,k)});return 0}catch(z){if("undefined"==typeof W||"ErrnoError"!==z.name)throw z;return -z.Ja}},l:function(a,b,c){a=new Date(1E3*Mc(a,b));D[c>>2]=a.getSeconds();D[c+4>>2]=a.getMinutes();D[c+8>>2]=a.getHours();D[c+12>>2]=a.getDate();D[c+16>>
2]=a.getMonth();D[c+20>>2]=a.getFullYear()-1900;D[c+24>>2]=a.getDay();b=a.getFullYear();D[c+28>>2]=(0!==b%4||0===b%100&&0!==b%400?Oc:Nc)[a.getMonth()]+a.getDate()-1|0;D[c+36>>2]=-(60*a.getTimezoneOffset());b=(new Date(a.getFullYear(),6,1)).getTimezoneOffset();var d=(new Date(a.getFullYear(),0,1)).getTimezoneOffset();D[c+32>>2]=(b!=d&&a.getTimezoneOffset()==Math.min(d,b))|0;},j:function(a,b,c,d,e,h,k,r){e=Mc(e,h);try{if(isNaN(e))return 61;var z=U(d);if(0!==(b&2)&&0===(c&2)&&2!==(z.flags&2097155))throw new P(2);
if(1===(z.flags&2097155))throw new P(2);if(!z.Ga.ab)throw new P(43);var v=z.Ga.ab(z,a,e,b,c);var E=v.Cb;D[k>>2]=v.tb;F[r>>2]=E;return 0}catch(H){if("undefined"==typeof W||"ErrnoError"!==H.name)throw H;return -H.Ja}},k:function(a,b,c,d,e,h,k){h=Mc(h,k);try{var r=U(e);if(c&2){if(32768!==(r.node.mode&61440))throw new P(43);if(!(d&2)){var z=u.slice(a,a+b);r.Ga.bb&&r.Ga.bb(r,z,h,b,d);}}}catch(v){if("undefined"==typeof W||"ErrnoError"!==v.name)throw v;return -v.Ja}},y:(a,b,c,d)=>{var e=(new Date).getFullYear(),
h=(new Date(e,0,1)).getTimezoneOffset();e=(new Date(e,6,1)).getTimezoneOffset();F[a>>2]=60*Math.max(h,e);D[b>>2]=Number(h!=e);b=k=>{var r=Math.abs(k);return `UTC${0<=k?"-":"+"}${String(Math.floor(r/60)).padStart(2,"0")}${String(r%60).padStart(2,"0")}`};a=b(h);b=b(e);e<h?(q(a,u,c,17),q(b,u,d,17)):(q(a,u,d,17),q(b,u,c,17));},d:()=>Date.now(),s:()=>2147483648,c:()=>performance.now(),o:a=>{var b=u.length;a>>>=0;if(2147483648<a)return !1;for(var c=1;4>=c;c*=2){var d=b*(1+.2/c);d=Math.min(d,a+100663296);var e=
Math;d=Math.max(a,d);a:{e=(e.min.call(e,2147483648,d+(65536-d%65536)%65536)-Ja.buffer.byteLength+65535)/65536;try{Ja.grow(e);Oa();var h=1;break a}catch(k){}h=void 0;}if(h)return !0}return !1},A:(a,b)=>{var c=0;Rc().forEach((d,e)=>{var h=b+c;e=F[a+4*e>>2]=h;for(h=0;h<d.length;++h)p[e++]=d.charCodeAt(h);p[e]=0;c+=d.length+1;});return 0},B:(a,b)=>{var c=Rc();F[a>>2]=c.length;var d=0;c.forEach(e=>d+=e.length+1);F[b>>2]=d;return 0},e:function(a){try{var b=U(a);pa(b);return 0}catch(c){if("undefined"==typeof W||
"ErrnoError"!==c.name)throw c;return c.Ja}},p:function(a,b){try{var c=U(a);p[b]=c.tty?2:R(c.mode)?3:40960===(c.mode&61440)?7:4;La[b+2>>1]=0;J=[0,(I=0,1<=+Math.abs(I)?0<I?+Math.floor(I/4294967296)>>>0:~~+Math.ceil((I-+(~~I>>>0))/4294967296)>>>0:0)];D[b+8>>2]=J[0];D[b+12>>2]=J[1];J=[0,(I=0,1<=+Math.abs(I)?0<I?+Math.floor(I/4294967296)>>>0:~~+Math.ceil((I-+(~~I>>>0))/4294967296)>>>0:0)];D[b+16>>2]=J[0];D[b+20>>2]=J[1];return 0}catch(d){if("undefined"==typeof W||"ErrnoError"!==d.name)throw d;return d.Ja}},
w:function(a,b,c,d){try{a:{var e=U(a);a=b;for(var h,k=b=0;k<c;k++){var r=F[a>>2],z=F[a+4>>2];a+=8;var v=dc(e,p,r,z,h);if(0>v){var E=-1;break a}b+=v;if(v<z)break;"undefined"!=typeof h&&(h+=v);}E=b;}F[d>>2]=E;return 0}catch(H){if("undefined"==typeof W||"ErrnoError"!==H.name)throw H;return H.Ja}},m:function(a,b,c,d,e){b=Mc(b,c);try{if(isNaN(b))return 61;var h=U(a);cc(h,b,d);J=[h.position>>>0,(I=h.position,1<=+Math.abs(I)?0<I?+Math.floor(I/4294967296)>>>0:~~+Math.ceil((I-+(~~I>>>0))/4294967296)>>>0:0)];
D[e>>2]=J[0];D[e+4>>2]=J[1];h.gb&&0===b&&0===d&&(h.gb=null);return 0}catch(k){if("undefined"==typeof W||"ErrnoError"!==k.name)throw k;return k.Ja}},D:function(a){try{var b=U(a);return b.Ga?.fsync?b.Ga.fsync(b):0}catch(c){if("undefined"==typeof W||"ErrnoError"!==c.name)throw c;return c.Ja}},t:function(a,b,c,d){try{a:{var e=U(a);a=b;for(var h,k=b=0;k<c;k++){var r=F[a>>2],z=F[a+4>>2];a+=8;var v=oa(e,p,r,z,h);if(0>v){var E=-1;break a}b+=v;"undefined"!=typeof h&&(h+=v);}E=b;}F[d>>2]=E;return 0}catch(H){if("undefined"==
typeof W||"ErrnoError"!==H.name)throw H;return H.Ja}}},Z=function(){function a(c){Z=c.exports;Ja=Z.I;Oa();X=Z.K;Qa.unshift(Z.J);Ua--;f.monitorRunDependencies?.(Ua);0==Ua&&(null!==Va&&(clearInterval(Va),Va=null),Wa&&(c=Wa,Wa=null,c()));return Z}var b={a:Vc};Ua++;f.monitorRunDependencies?.(Ua);if(f.instantiateWasm)try{return f.instantiateWasm(b,a)}catch(c){return C(`Module.instantiateWasm callback failed with error: ${c}`),!1}Ya||=Xa("sql-wasm.wasm")?"sql-wasm.wasm":f.locateFile?f.locateFile("sql-wasm.wasm",
B):B+"sql-wasm.wasm";bb(b,function(c){a(c.instance);});return {}}();f._sqlite3_free=a=>(f._sqlite3_free=Z.L)(a);f._sqlite3_value_text=a=>(f._sqlite3_value_text=Z.M)(a);f._sqlite3_prepare_v2=(a,b,c,d,e)=>(f._sqlite3_prepare_v2=Z.N)(a,b,c,d,e);f._sqlite3_step=a=>(f._sqlite3_step=Z.O)(a);f._sqlite3_reset=a=>(f._sqlite3_reset=Z.P)(a);f._sqlite3_exec=(a,b,c,d,e)=>(f._sqlite3_exec=Z.Q)(a,b,c,d,e);f._sqlite3_finalize=a=>(f._sqlite3_finalize=Z.R)(a);
f._sqlite3_column_name=(a,b)=>(f._sqlite3_column_name=Z.S)(a,b);f._sqlite3_column_text=(a,b)=>(f._sqlite3_column_text=Z.T)(a,b);f._sqlite3_column_type=(a,b)=>(f._sqlite3_column_type=Z.U)(a,b);f._sqlite3_errmsg=a=>(f._sqlite3_errmsg=Z.V)(a);f._sqlite3_clear_bindings=a=>(f._sqlite3_clear_bindings=Z.W)(a);f._sqlite3_value_blob=a=>(f._sqlite3_value_blob=Z.X)(a);f._sqlite3_value_bytes=a=>(f._sqlite3_value_bytes=Z.Y)(a);f._sqlite3_value_double=a=>(f._sqlite3_value_double=Z.Z)(a);
f._sqlite3_value_int=a=>(f._sqlite3_value_int=Z._)(a);f._sqlite3_value_type=a=>(f._sqlite3_value_type=Z.$)(a);f._sqlite3_result_blob=(a,b,c,d)=>(f._sqlite3_result_blob=Z.aa)(a,b,c,d);f._sqlite3_result_double=(a,b)=>(f._sqlite3_result_double=Z.ba)(a,b);f._sqlite3_result_error=(a,b,c)=>(f._sqlite3_result_error=Z.ca)(a,b,c);f._sqlite3_result_int=(a,b)=>(f._sqlite3_result_int=Z.da)(a,b);f._sqlite3_result_int64=(a,b,c)=>(f._sqlite3_result_int64=Z.ea)(a,b,c);
f._sqlite3_result_null=a=>(f._sqlite3_result_null=Z.fa)(a);f._sqlite3_result_text=(a,b,c,d)=>(f._sqlite3_result_text=Z.ga)(a,b,c,d);f._sqlite3_aggregate_context=(a,b)=>(f._sqlite3_aggregate_context=Z.ha)(a,b);f._sqlite3_column_count=a=>(f._sqlite3_column_count=Z.ia)(a);f._sqlite3_data_count=a=>(f._sqlite3_data_count=Z.ja)(a);f._sqlite3_column_blob=(a,b)=>(f._sqlite3_column_blob=Z.ka)(a,b);f._sqlite3_column_bytes=(a,b)=>(f._sqlite3_column_bytes=Z.la)(a,b);
f._sqlite3_column_double=(a,b)=>(f._sqlite3_column_double=Z.ma)(a,b);f._sqlite3_bind_blob=(a,b,c,d,e)=>(f._sqlite3_bind_blob=Z.na)(a,b,c,d,e);f._sqlite3_bind_double=(a,b,c)=>(f._sqlite3_bind_double=Z.oa)(a,b,c);f._sqlite3_bind_int=(a,b,c)=>(f._sqlite3_bind_int=Z.pa)(a,b,c);f._sqlite3_bind_text=(a,b,c,d,e)=>(f._sqlite3_bind_text=Z.qa)(a,b,c,d,e);f._sqlite3_bind_parameter_index=(a,b)=>(f._sqlite3_bind_parameter_index=Z.ra)(a,b);f._sqlite3_sql=a=>(f._sqlite3_sql=Z.sa)(a);
f._sqlite3_normalized_sql=a=>(f._sqlite3_normalized_sql=Z.ta)(a);f._sqlite3_changes=a=>(f._sqlite3_changes=Z.ua)(a);f._sqlite3_close_v2=a=>(f._sqlite3_close_v2=Z.va)(a);f._sqlite3_create_function_v2=(a,b,c,d,e,h,k,r,z)=>(f._sqlite3_create_function_v2=Z.wa)(a,b,c,d,e,h,k,r,z);f._sqlite3_open=(a,b)=>(f._sqlite3_open=Z.xa)(a,b);var ia=f._malloc=a=>(ia=f._malloc=Z.ya)(a),fa=f._free=a=>(fa=f._free=Z.za)(a);f._RegisterExtensionFunctions=a=>(f._RegisterExtensionFunctions=Z.Aa)(a);
var Eb=(a,b)=>(Eb=Z.Ba)(a,b),ua=a=>(ua=Z.Ca)(a),y=a=>(y=Z.Da)(a),ra=()=>(ra=Z.Ea)();f.stackSave=()=>ra();f.stackRestore=a=>ua(a);f.stackAlloc=a=>y(a);f.cwrap=(a,b,c,d)=>{var e=!c||c.every(h=>"number"===h||"boolean"===h);return "string"!==b&&e&&!d?f["_"+a]:(...h)=>Sc(a,b,c,h)};f.addFunction=Aa;f.removeFunction=wa;f.UTF8ToString=ta;f.ALLOC_NORMAL=ea;f.allocate=da;f.allocateUTF8OnStack=va;var Wc;Wa=function Xc(){Wc||Yc();Wc||(Wa=Xc);};
function Yc(){function a(){if(!Wc&&(Wc=!0,f.calledRun=!0,!Ka)){f.noFSInit||ec||(ec=!0,f.stdin=f.stdin,f.stdout=f.stdout,f.stderr=f.stderr,f.stdin?Fc("stdin",f.stdin):Xb("/dev/tty","/dev/stdin"),f.stdout?Fc("stdout",null,f.stdout):Xb("/dev/tty","/dev/stdout"),f.stderr?Fc("stderr",null,f.stderr):Xb("/dev/tty1","/dev/stderr"),na("/dev/stdin",0),na("/dev/stdout",1),na("/dev/stderr",1));Jb=!1;cb(Qa);f.onRuntimeInitialized?.();if(f.postRun)for("function"==typeof f.postRun&&(f.postRun=[f.postRun]);f.postRun.length;){var b=
f.postRun.shift();Sa.unshift(b);}cb(Sa);}}if(!(0<Ua)){if(f.preRun)for("function"==typeof f.preRun&&(f.preRun=[f.preRun]);f.preRun.length;)Ta();cb(Pa);0<Ua||(f.setStatus?(f.setStatus("Running..."),setTimeout(function(){setTimeout(function(){f.setStatus("");},1);a();},1)):a());}}if(f.preInit)for("function"==typeof f.preInit&&(f.preInit=[f.preInit]);0<f.preInit.length;)f.preInit.pop()();Yc();


        // The shell-pre.js and emcc-generated code goes above
        return Module;
    }); // The end of the promise being returned

  return initSqlJsPromise;
}; // The end of our initSqlJs function

// This bit below is copied almost exactly from what you get when you use the MODULARIZE=1 flag with emcc
// However, we don't want to use the emcc modularization. See shell-pre.js
if ('object' === 'object' && 'object' === 'object'){
    module.exports = initSqlJs;
    // This will allow the module to be used in ES6 or CommonJS
    module.exports.default = initSqlJs;
}
else if (typeof undefined === 'function' && undefined['amd']) {
    undefined([], function() { return initSqlJs; });
}
else if ('object' === 'object'){
    exports["Module"] = initSqlJs;
}
});

class UtilsStore {
    static async getDBFromStore(dbName, store) {
        try {
            const retDb = await store.getItem(dbName);
            return Promise.resolve(retDb);
        }
        catch (err) {
            return Promise.reject(`GetDBFromStore: ${err.message}`);
        }
    }
    static async setInitialDBToStore(dbName, store) {
        try {
            // export the database
            const data = null;
            // store the database
            await store.setItem(dbName, data);
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(`SetInitialDBToStore: ${err.message}`);
        }
    }
    static async setDBToStore(mDb, dbName, store) {
        try {
            // export the database
            const data = mDb.export();
            // store the database
            await UtilsStore.saveDBToStore(dbName, data, store);
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(`SetDBToStore: ${err.message}`);
        }
    }
    static async saveDBToStore(dbName, data, store) {
        try {
            await store.removeItem(dbName);
            // store the database
            await store.setItem(dbName, data);
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(`SaveDBToStore: ${err.message}`);
        }
    }
    static async removeDBFromStore(dbName, store) {
        try {
            await store.removeItem(dbName);
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(`RemoveDBFromStore: ${err.message}`);
        }
    }
    static async isDBInStore(dbName, store) {
        try {
            const retDb = await store.getItem(dbName);
            if (retDb != null && retDb.length > 0) {
                return Promise.resolve(true);
            }
            else {
                return Promise.resolve(false);
            }
        }
        catch (err) {
            return Promise.reject(`IsDBInStore: ${err}`);
        }
    }
    static async restoreDBFromStore(dbName, prefix, store) {
        const mFileName = `${prefix}-${dbName}`;
        try {
            // check if file exists
            const isFilePre = await UtilsStore.isDBInStore(mFileName, store);
            if (isFilePre) {
                const isFile = await UtilsStore.isDBInStore(dbName, store);
                if (isFile) {
                    const retDb = await UtilsStore.getDBFromStore(mFileName, store);
                    await UtilsStore.saveDBToStore(dbName, retDb, store);
                    await UtilsStore.removeDBFromStore(mFileName, store);
                    return Promise.resolve();
                }
                else {
                    return Promise.reject(new Error(`RestoreDBFromStore: ${dbName} does not exist`));
                }
            }
            else {
                return Promise.reject(new Error(`RestoreDBFromStore: ${mFileName} does not exist`));
            }
        }
        catch (err) {
            return Promise.reject(`RestoreDBFromStore: ${err.message}`);
        }
    }
    static async copyDBToStore(dbName, toDb, store) {
        try {
            // check if file exists
            const isFile = await UtilsStore.isDBInStore(dbName, store);
            if (isFile) {
                const retDb = await UtilsStore.getDBFromStore(dbName, store);
                await UtilsStore.saveDBToStore(toDb, retDb, store);
                return Promise.resolve();
            }
            else {
                return Promise.reject(new Error(`CopyDBToStore: ${dbName} does not exist`));
            }
        }
        catch (err) {
            return Promise.reject(`CopyDBToStore: ${err.message}`);
        }
    }
    static async getDBListFromStore(store) {
        try {
            const retDbList = await store.keys();
            return Promise.resolve(retDbList);
        }
        catch (err) {
            return Promise.reject(`GetDBListFromStore: ${err.message}`);
        }
    }
}

class UtilsDrop {
    static async getTablesNames(db) {
        let sql = 'SELECT name FROM sqlite_master WHERE ';
        sql += "type='table' AND name NOT LIKE 'sync_table' ";
        sql += "AND name NOT LIKE '_temp_%' ";
        sql += "AND name NOT LIKE 'sqlite_%' ";
        sql += "ORDER BY rootpage DESC;";
        const retArr = [];
        try {
            const retQuery = await UtilsSQLite.queryAll(db, sql, []);
            for (const query of retQuery) {
                retArr.push(query.name);
            }
            return Promise.resolve(retArr);
        }
        catch (err) {
            return Promise.reject(new Error(`GetTablesNames: ${err.message}`));
        }
    }
    static async getViewsNames(mDb) {
        let sql = 'SELECT name FROM sqlite_master WHERE ';
        sql += "type='view' AND name NOT LIKE 'sqlite_%' ";
        sql += 'ORDER BY rootpage DESC;';
        const retArr = [];
        try {
            const retQuery = await UtilsSQLite.queryAll(mDb, sql, []);
            for (const query of retQuery) {
                retArr.push(query.name);
            }
            return Promise.resolve(retArr);
        }
        catch (err) {
            return Promise.reject(new Error(`getViewsNames: ${err.message}`));
        }
    }
    static async dropElements(db, type) {
        let msg = '';
        let stmt1 = `AND name NOT LIKE ('sqlite_%')`;
        switch (type) {
            case 'index':
                msg = 'DropIndexes';
                break;
            case 'trigger':
                msg = 'DropTriggers';
                break;
            case 'table':
                msg = 'DropTables';
                stmt1 += ` AND name NOT IN ('sync_table')`;
                break;
            case 'view':
                msg = 'DropViews';
                break;
            default:
                return Promise.reject(new Error(`DropElements: ${type} ` + 'not found'));
        }
        // get the element's names
        let stmt = 'SELECT name FROM sqlite_master WHERE ';
        stmt += `type = '${type}' ${stmt1};`;
        try {
            const elements = await UtilsSQLite.queryAll(db, stmt, []);
            if (elements.length > 0) {
                const upType = type.toUpperCase();
                const statements = [];
                for (const elem of elements) {
                    let stmt = `DROP ${upType} IF EXISTS `;
                    stmt += `${elem.name};`;
                    statements.push(stmt);
                }
                for (const stmt of statements) {
                    const lastId = await UtilsSQLite.run(db, stmt, [], false, 'no');
                    if (lastId < 0) {
                        return Promise.reject(new Error(`DropElements: ${msg}: lastId < 0`));
                    }
                }
            }
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(new Error(`DropElements: ${msg}: ${err.message}`));
        }
    }
    static async dropAll(db) {
        try {
            // drop tables
            await UtilsDrop.dropElements(db, 'table');
            // drop indexes
            await UtilsDrop.dropElements(db, 'index');
            // drop triggers
            await UtilsDrop.dropElements(db, 'trigger');
            // drop views
            await UtilsDrop.dropElements(db, 'view');
            // vacuum the database
            await UtilsSQLite.run(db, 'VACUUM;', [], false, 'no');
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(new Error(`DropAll: ${err.message}`));
        }
    }
    static async dropTempTables(db, alterTables) {
        const tempTables = Object.keys(alterTables);
        const statements = [];
        for (const tTable of tempTables) {
            let stmt = 'DROP TABLE IF EXISTS ';
            stmt += `_temp_${tTable};`;
            statements.push(stmt);
        }
        try {
            const changes = await UtilsSQLite.execute(db, statements.join('\n'), false);
            if (changes < 0) {
                return Promise.reject(new Error('DropTempTables: changes < 0'));
            }
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(new Error(`DropTempTables: ${err.message}`));
        }
    }
}

class UtilsJSON {
    static async isJsonSQLite(obj) {
        const keyFirstLevel = [
            'database',
            'version',
            'overwrite',
            'encrypted',
            'mode',
            'tables',
            'views'
        ];
        if (obj == null ||
            (Object.keys(obj).length === 0 && obj.constructor === Object))
            return false;
        for (const key of Object.keys(obj)) {
            if (keyFirstLevel.indexOf(key) === -1)
                return false;
            if (key === 'database' && typeof obj[key] != 'string')
                return false;
            if (key === 'version' && typeof obj[key] != 'number')
                return false;
            if (key === 'overwrite' && typeof obj[key] != 'boolean')
                return false;
            if (key === 'encrypted' && typeof obj[key] != 'boolean')
                return false;
            if (key === 'mode' && typeof obj[key] != 'string')
                return false;
            if (key === 'tables' && typeof obj[key] != 'object')
                return false;
            if (key === 'tables') {
                for (const oKey of obj[key]) {
                    const retTable = await UtilsJSON.isTable(oKey);
                    if (!retTable)
                        return false;
                }
            }
            if (key === 'views' && typeof obj[key] != 'object')
                return false;
            if (key === 'views') {
                for (const oKey of obj[key]) {
                    const retView = await UtilsJSON.isView(oKey);
                    if (!retView)
                        return false;
                }
            }
        }
        return true;
    }
    static async isTable(obj) {
        const keyTableLevel = [
            'name',
            'schema',
            'indexes',
            'triggers',
            'values',
        ];
        let nbColumn = 0;
        if (obj == null ||
            (Object.keys(obj).length === 0 && obj.constructor === Object))
            return false;
        for (const key of Object.keys(obj)) {
            if (keyTableLevel.indexOf(key) === -1)
                return false;
            if (key === 'name' && typeof obj[key] != 'string')
                return false;
            if (key === 'schema' && typeof obj[key] != 'object')
                return false;
            if (key === 'indexes' && typeof obj[key] != 'object')
                return false;
            if (key === 'triggers' && typeof obj[key] != 'object')
                return false;
            if (key === 'values' && typeof obj[key] != 'object')
                return false;
            if (key === 'schema') {
                obj['schema'].forEach((element) => {
                    if (element.column) {
                        nbColumn++;
                    }
                });
                for (let i = 0; i < nbColumn; i++) {
                    const retSchema = await UtilsJSON.isSchema(obj[key][i]);
                    if (!retSchema)
                        return false;
                }
            }
            if (key === 'indexes') {
                for (const oKey of obj[key]) {
                    const retIndexes = await UtilsJSON.isIndexes(oKey);
                    if (!retIndexes)
                        return false;
                }
            }
            if (key === 'triggers') {
                for (const oKey of obj[key]) {
                    const retTriggers = await UtilsJSON.isTriggers(oKey);
                    if (!retTriggers)
                        return false;
                }
            }
            if (key === 'values') {
                if (nbColumn > 0) {
                    for (const oKey of obj[key]) {
                        if (typeof oKey != 'object' || oKey.length != nbColumn)
                            return false;
                    }
                }
            }
        }
        return true;
    }
    static async isSchema(obj) {
        const keySchemaLevel = [
            'column',
            'value',
            'foreignkey',
            'primarykey',
            'constraint',
        ];
        if (obj == null ||
            (Object.keys(obj).length === 0 && obj.constructor === Object))
            return false;
        for (const key of Object.keys(obj)) {
            if (keySchemaLevel.indexOf(key) === -1)
                return false;
            if (key === 'column' && typeof obj[key] != 'string')
                return false;
            if (key === 'value' && typeof obj[key] != 'string')
                return false;
            if (key === 'foreignkey' && typeof obj[key] != 'string')
                return false;
            if (key === 'primarykey' && typeof obj[key] != 'string')
                return false;
            if (key === 'constraint' && typeof obj[key] != 'string')
                return false;
        }
        return true;
    }
    static async isIndexes(obj) {
        const keyIndexesLevel = ['name', 'value', 'mode'];
        if (obj == null ||
            (Object.keys(obj).length === 0 && obj.constructor === Object))
            return false;
        for (const key of Object.keys(obj)) {
            if (keyIndexesLevel.indexOf(key) === -1)
                return false;
            if (key === 'name' && typeof obj[key] != 'string')
                return false;
            if (key === 'value' && typeof obj[key] != 'string')
                return false;
            if (key === 'mode' &&
                (typeof obj[key] != 'string' || obj[key].toUpperCase() != 'UNIQUE'))
                return false;
        }
        return true;
    }
    static async isTriggers(obj) {
        const keyTriggersLevel = [
            'name',
            'timeevent',
            'condition',
            'logic',
        ];
        if (obj == null ||
            (Object.keys(obj).length === 0 && obj.constructor === Object))
            return false;
        for (const key of Object.keys(obj)) {
            if (keyTriggersLevel.indexOf(key) === -1)
                return false;
            if (key === 'name' && typeof obj[key] != 'string')
                return false;
            if (key === 'timeevent' && typeof obj[key] != 'string')
                return false;
            if (key === 'condition' && typeof obj[key] != 'string')
                return false;
            if (key === 'logic' && typeof obj[key] != 'string')
                return false;
        }
        return true;
    }
    static async isView(obj) {
        const keyViewLevel = ['name', 'value'];
        if (obj == null ||
            (Object.keys(obj).length === 0 && obj.constructor === Object))
            return false;
        for (const key of Object.keys(obj)) {
            if (keyViewLevel.indexOf(key) === -1)
                return false;
            if (key === 'name' && typeof obj[key] != 'string')
                return false;
            if (key === 'value' && typeof obj[key] != 'string')
                return false;
        }
        return true;
    }
    static async checkSchemaValidity(schema) {
        for (let i = 0; i < schema.length; i++) {
            const sch = {};
            const keys = Object.keys(schema[i]);
            if (keys.includes('column')) {
                sch.column = schema[i].column;
            }
            if (keys.includes('value')) {
                sch.value = schema[i].value;
            }
            if (keys.includes('foreignkey')) {
                sch.foreignkey = schema[i].foreignkey;
            }
            if (keys.includes('constraint')) {
                sch.constraint = schema[i].constraint;
            }
            const isValid = await UtilsJSON.isSchema(sch);
            if (!isValid) {
                return Promise.reject(new Error(`CheckSchemaValidity: schema[${i}] not valid`));
            }
        }
        return Promise.resolve();
    }
    static async checkIndexesValidity(indexes) {
        for (let i = 0; i < indexes.length; i++) {
            const index = {};
            const keys = Object.keys(indexes[i]);
            if (keys.includes('value')) {
                index.value = indexes[i].value;
            }
            if (keys.includes('name')) {
                index.name = indexes[i].name;
            }
            if (keys.includes('mode')) {
                index.mode = indexes[i].mode;
            }
            const isValid = await UtilsJSON.isIndexes(index);
            if (!isValid) {
                return Promise.reject(new Error(`CheckIndexesValidity: indexes[${i}] not valid`));
            }
        }
        return Promise.resolve();
    }
    static async checkTriggersValidity(triggers) {
        for (let i = 0; i < triggers.length; i++) {
            const trigger = {};
            const keys = Object.keys(triggers[i]);
            if (keys.includes('logic')) {
                trigger.logic = triggers[i].logic;
            }
            if (keys.includes('name')) {
                trigger.name = triggers[i].name;
            }
            if (keys.includes('timeevent')) {
                trigger.timeevent = triggers[i].timeevent;
            }
            if (keys.includes('condition')) {
                trigger.condition = triggers[i].condition;
            }
            const isValid = await UtilsJSON.isTriggers(trigger);
            if (!isValid) {
                return Promise.reject(new Error(`CheckTriggersValidity: triggers[${i}] not valid`));
            }
        }
        return Promise.resolve();
    }
    static async checkViewsValidity(views) {
        for (let i = 0; i < views.length; i++) {
            const view = {};
            const keys = Object.keys(views[i]);
            if (keys.includes('value')) {
                view.value = views[i].value;
            }
            if (keys.includes('name')) {
                view.name = views[i].name;
            }
            const isValid = await UtilsJSON.isView(view);
            if (!isValid) {
                return Promise.reject(new Error(`CheckViewsValidity: views[${i}] not valid`));
            }
        }
        return Promise.resolve();
    }
    static async getTableColumnNamesTypes(db, tableName) {
        let resQuery = [];
        const retNames = [];
        const retTypes = [];
        const query = `PRAGMA table_info('${tableName}');`;
        try {
            resQuery = await UtilsSQLite.queryAll(db, query, []);
            if (resQuery.length > 0) {
                for (const query of resQuery) {
                    retNames.push(query.name);
                    retTypes.push(query.type);
                }
            }
            return Promise.resolve({ names: retNames, types: retTypes });
        }
        catch (err) {
            return Promise.reject(new Error('GetTableColumnNamesTypes: ' + `${err.message}`));
        }
    }
    static async getValues(db, query, tableName) {
        const values = [];
        try {
            // get table column names and types
            const tableNamesTypes = await UtilsJSON.getTableColumnNamesTypes(db, tableName);
            let rowNames = [];
            if (Object.keys(tableNamesTypes).includes('names')) {
                rowNames = tableNamesTypes.names;
            }
            else {
                return Promise.reject(new Error(`GetValues: Table ${tableName} no names`));
            }
            const retValues = await UtilsSQLite.queryAll(db, query, []);
            for (const rValue of retValues) {
                const row = [];
                for (const rName of rowNames) {
                    if (Object.keys(rValue).includes(rName)) {
                        row.push(rValue[rName]);
                    }
                    else {
                        row.push(null);
                    }
                }
                values.push(row);
            }
            return Promise.resolve(values);
        }
        catch (err) {
            return Promise.reject(new Error(`GetValues: ${err.message}`));
        }
    }
}

class UtilsSQLStatement {
    static extractTableName(statement) {
        const pattern = /(?:INSERT\s+INTO|UPDATE|DELETE\s+FROM)\s+([^\s]+)/i;
        const match = statement.match(pattern);
        if (match && match[1]) {
            const tableName = match[1];
            return tableName;
        }
        return null;
    }
    static extractWhereClause(statement) {
        const pattern = /WHERE(.+?)(?:ORDER\s+BY|LIMIT|$)/i;
        const match = statement.match(pattern);
        if (match && match[1]) {
            const whereClause = match[1].trim();
            return whereClause;
        }
        return null;
    }
    static addPrefixToWhereClause(whereClause, colNames, refNames, prefix) {
        let columnValuePairs;
        // TODO "OR" and "NOT"
        if (whereClause.includes("AND")) {
            // Split the WHERE clause based on the "AND" keyword
            const subSequenceArray = whereClause.split("AND");
            columnValuePairs = subSequenceArray.map((pair) => pair.trim());
        }
        else {
            columnValuePairs = [whereClause];
        }
        const modifiedPairs = columnValuePairs.map((pair) => {
            const match = pair.match(/(\w+)\s*(=|<|<=|<>|>|>=|IN|BETWEEN|LIKE)\s*(.+)/);
            if (!match) {
                return pair;
            }
            const column = match[1].trim();
            const operator = match[2].trim();
            let value = match[3].trim();
            let newColumn = column;
            const index = UtilsSQLStatement.findIndexOfStringInArray(column, refNames);
            if (index !== -1) {
                newColumn = UtilsSQLStatement.getStringAtIndex(colNames, index);
            }
            const modifiedColumn = `${prefix}${newColumn}`;
            const ret = `${modifiedColumn} ${operator} ${value}`;
            return ret;
        });
        return modifiedPairs.join(" AND ");
    }
    static findIndexOfStringInArray(target, array) {
        return array.indexOf(target);
    }
    static getStringAtIndex(array, index) {
        if (index >= 0 && index < array.length) {
            return array[index];
        }
        else {
            return undefined;
        }
    }
    static extractForeignKeyInfo(sqlStatement) {
        // Define the regular expression pattern for extracting the FOREIGN KEY clause
        const foreignKeyPattern = /\bFOREIGN\s+KEY\s*\(([^)]+)\)\s+REFERENCES\s+(\w+)\s*\(([^)]+)\)\s+(ON\s+DELETE\s+(RESTRICT|CASCADE|SET\s+NULL|SET\s+DEFAULT|NO\s+ACTION))?/;
        const matches = sqlStatement.match(foreignKeyPattern);
        if (matches) {
            const foreignKeyInfo = {
                forKeys: matches[1].split(",").map(key => key.trim()),
                tableName: matches[2],
                refKeys: matches[3].split(",").map(key => key.trim()),
                action: matches[5] ? matches[5] : "NO ACTION"
            };
            return foreignKeyInfo;
        }
        else {
            throw new Error("extractForeignKeyInfo: No FOREIGN KEY found");
        }
    }
    static extractColumnNames(whereClause) {
        const keywords = new Set([
            "AND", "OR", "IN", "VALUES", "LIKE", "BETWEEN", "NOT"
        ]);
        const regex = /\b[a-zA-Z]\w*\b(?=\s*(?:<=?|>=?|<>?|=|AND|OR|BETWEEN|NOT|IN|LIKE))|\b[a-zA-Z]\w*\b\s+BETWEEN\s+'[^']+'\s+AND\s+'[^']+'|\(([^)]+)\)\s+IN\s+\(?\s*VALUES\s*\(/g;
        let match;
        const columns = [];
        while ((match = regex.exec(whereClause)) !== null) {
            const columnList = match[1];
            if (columnList) {
                const columnNamesArray = columnList.split(',');
                for (const columnName of columnNamesArray) {
                    columns.push(columnName.trim());
                }
            }
            else {
                const matchedText = match[0];
                if (!keywords.has(matchedText.trim().toUpperCase())) {
                    columns.push(matchedText.trim());
                }
            }
        }
        return columns;
    }
    static flattenMultilineString(input) {
        const lines = input.split(/\r?\n/);
        return lines.join(" ");
    }
    static getStmtAndRetColNames(sqlStmt, retMode) {
        const retWord = "RETURNING";
        const retStmtNames = { stmt: sqlStmt, names: "" };
        const retWordIndex = sqlStmt.toUpperCase().indexOf(retWord);
        if (retWordIndex !== -1) {
            const prefix = sqlStmt.substring(0, retWordIndex);
            retStmtNames.stmt = `${prefix};`;
            if (retMode.substring(0, 2) === "wA") {
                const suffix = sqlStmt.substring(retWordIndex + retWord.length);
                const names = suffix.trim();
                if (names.endsWith(";")) {
                    retStmtNames.names = names.substring(0, names.length - 1);
                }
                else {
                    retStmtNames.names = names;
                }
            }
        }
        return retStmtNames;
    }
    static extractCombinedPrimaryKey(whereClause) {
        const pattern = /WHERE\s*\((.+?)\)\s*(?:=|IN)\s*\((.+?)\)/g;
        const regex = new RegExp(pattern);
        const matches = whereClause.matchAll(regex);
        const primaryKeySets = [];
        for (const match of matches) {
            const keysString = match[1].trim();
            const keys = keysString.split(",").map((key) => key.trim());
            primaryKeySets.push(keys);
        }
        return primaryKeySets.length === 0 ? null : primaryKeySets;
    }
    static getWhereStmtForCombinedPK(whStmt, withRefs, colNames, keys) {
        let retWhere = whStmt;
        for (const grpKeys of keys) {
            const repKeys = grpKeys.join(",") === withRefs.join(",") ? colNames : withRefs;
            for (const [index, key] of grpKeys.entries()) {
                retWhere = UtilsSQLStatement.replaceAllString(retWhere, key, repKeys[index]);
            }
        }
        return retWhere;
    }
    static replaceAllString(originalStr, searchStr, replaceStr) {
        return originalStr.split(searchStr).join(replaceStr);
    }
    static indicesOf(str, searchStr, fromIndex = 0) {
        // Helper function to find indices of a substring within a string
        const indices = [];
        let currentIndex = str.indexOf(searchStr, fromIndex);
        while (currentIndex !== -1) {
            indices.push(currentIndex);
            currentIndex = str.indexOf(searchStr, currentIndex + 1);
        }
        return indices;
    }
    static getWhereStmtForNonCombinedPK(whStmt, withRefs, colNames) {
        let whereStmt = "";
        let stmt = whStmt.substring(6);
        for (let idx = 0; idx < withRefs.length; idx++) {
            let colType = "withRefsNames";
            let idxs = UtilsSQLStatement.indicesOf(stmt, withRefs[idx]);
            if (idxs.length === 0) {
                idxs = UtilsSQLStatement.indicesOf(stmt, colNames[idx]);
                colType = "colNames";
            }
            if (idxs.length > 0) {
                let valStr = "";
                const indicesEqual = UtilsSQLStatement.indicesOf(stmt, "=", idxs[0]);
                if (indicesEqual.length > 0) {
                    const indicesAnd = UtilsSQLStatement.indicesOf(stmt, "AND", indicesEqual[0]);
                    if (indicesAnd.length > 0) {
                        valStr = stmt.substring(indicesEqual[0] + 1, indicesAnd[0] - 1);
                        stmt = stmt.substring(indicesAnd[0] + 3);
                    }
                    else {
                        valStr = stmt.substring(indicesEqual[0] + 1);
                    }
                    if (idx > 0) {
                        whereStmt += " AND ";
                    }
                    if (colType === "withRefsNames") {
                        whereStmt += colNames[idx] + " = " + valStr;
                    }
                    else {
                        whereStmt += withRefs[idx] + " = " + valStr;
                    }
                }
            }
        }
        whereStmt = "WHERE " + whereStmt;
        return whereStmt;
    }
    static updateWhere(whStmt, withRefs, colNames) {
        let whereStmt = "";
        if (whStmt.length <= 0) {
            return whereStmt;
        }
        if (whStmt.toUpperCase().substring(0, 5) !== "WHERE") {
            return whereStmt;
        }
        if (withRefs.length === colNames.length) {
            // get whereStmt for primary combined key
            const keys = UtilsSQLStatement.extractCombinedPrimaryKey(whStmt);
            if (keys) {
                whereStmt = UtilsSQLStatement.getWhereStmtForCombinedPK(whStmt, withRefs, colNames, keys);
            }
            else {
                // get for non primary combined key
                whereStmt = UtilsSQLStatement.getWhereStmtForNonCombinedPK(whStmt, withRefs, colNames);
            }
        }
        return whereStmt;
    }
}
UtilsSQLStatement.replaceString = (originalStr, searchStr, replaceStr) => {
    const range = originalStr.indexOf(searchStr);
    if (range !== -1) {
        const modifiedStr = originalStr.substring(0, range) + replaceStr + originalStr.substring(range + searchStr.length);
        return modifiedStr;
    }
    return originalStr;
};

class UtilsDeleteError {
    static findReferencesAndUpdate(message) {
        return new UtilsDeleteError(message);
    }
    static getRefs(message) {
        return new UtilsDeleteError(message);
    }
    static getReferences(message) {
        return new UtilsDeleteError(message);
    }
    static searchForRelatedItems(message) {
        return new UtilsDeleteError(message);
    }
    static upDateWhereForDefault(message) {
        return new UtilsDeleteError(message);
    }
    static upDateWhereForRestrict(message) {
        return new UtilsDeleteError(message);
    }
    static upDateWhereForCascade(message) {
        return new UtilsDeleteError(message);
    }
    static executeUpdateForDelete(message) {
        return new UtilsDeleteError(message);
    }
    constructor(message) {
        this.message = message;
    }
}
class UtilsDelete {
    static async findReferencesAndUpdate(mDB, tableName, whereStmt, initColNames, values) {
        try {
            let retBool = true;
            const result = await UtilsDelete.getReferences(mDB, tableName);
            const references = result.retRefs;
            const tableNameWithRefs = result.tableWithRefs;
            if (references.length <= 0) {
                return retBool;
            }
            if (tableName === tableNameWithRefs) {
                return retBool;
            }
            // Loop through references
            for (const ref of references) {
                // Extract the FOREIGN KEY constraint info from the ref statement
                const foreignKeyInfo = UtilsSQLStatement.extractForeignKeyInfo(ref);
                // Get the tableName of the references
                const refTable = foreignKeyInfo.tableName;
                if (refTable === '' || refTable !== tableName) {
                    continue;
                }
                // Get the with ref column names
                const withRefsNames = foreignKeyInfo.forKeys;
                // Get the column names
                const colNames = foreignKeyInfo.refKeys;
                if (colNames.length !== withRefsNames.length) {
                    const msg = "findReferencesAndUpdate: mismatch length";
                    throw UtilsDeleteError.findReferencesAndUpdate(msg);
                }
                const action = foreignKeyInfo.action;
                if (action === 'NO_ACTION') {
                    continue;
                }
                let updTableName = tableNameWithRefs;
                let updColNames = withRefsNames;
                let results = {
                    uWhereStmt: '',
                    setStmt: '',
                };
                if (!UtilsDelete.checkValuesMatch(withRefsNames, initColNames)) {
                    // Case: no match
                    // Search for related items in tableName
                    const result = await UtilsDelete
                        .searchForRelatedItems(mDB, updTableName, tableName, whereStmt, withRefsNames, colNames, values);
                    if (result.relatedItems.length === 0 && result.key.length <= 0) {
                        continue;
                    }
                    if (updTableName !== tableName) {
                        switch (action) {
                            case 'RESTRICT':
                                results = await UtilsDelete
                                    .upDateWhereForRestrict(result);
                                break;
                            case 'CASCADE':
                                results = await UtilsDelete
                                    .upDateWhereForCascade(result);
                                break;
                            default:
                                results = await UtilsDelete
                                    .upDateWhereForDefault(withRefsNames, result);
                                break;
                        }
                    }
                }
                else {
                    throw UtilsDeleteError.findReferencesAndUpdate('Not implemented. Please transfer your example to the maintener');
                }
                if (results.setStmt.length > 0 &&
                    results.uWhereStmt.length > 0) {
                    UtilsDelete.executeUpdateForDelete(mDB, updTableName, results.uWhereStmt, results.setStmt, updColNames, values);
                }
            }
            return retBool;
        }
        catch (error) {
            const msg = error.message ? error.message : error;
            if (error instanceof UtilsDeleteError) {
                throw UtilsDeleteError.findReferencesAndUpdate(msg);
            }
            else {
                throw error;
            }
        }
    }
    static async getReferences(db, tableName) {
        const sqlStmt = "SELECT sql FROM sqlite_master " +
            "WHERE sql LIKE('%FOREIGN KEY%') AND sql LIKE('%REFERENCES%') AND " +
            "sql LIKE('%" + tableName + "%') AND sql LIKE('%ON DELETE%');";
        try {
            const res = await UtilsSQLite.queryAll(db, sqlStmt, []);
            // get the reference's string(s)
            let retRefs = [];
            let tableWithRefs = "";
            if (res.length > 0) {
                let result = UtilsDelete.getRefs(res[0].sql);
                retRefs = result.foreignKeys;
                tableWithRefs = result.tableName;
            }
            return Promise.resolve({ tableWithRefs: tableWithRefs, retRefs: retRefs });
        }
        catch (err) {
            const error = err.message ? err.message : err;
            const msg = `getReferences: ${error}`;
            throw UtilsDeleteError.getReferences(msg);
        }
    }
    static getRefs(sqlStatement) {
        let tableName = '';
        const foreignKeys = [];
        const statement = UtilsSQLStatement.flattenMultilineString(sqlStatement);
        try {
            // Regular expression pattern to match the table name
            const tableNamePattern = /CREATE\s+TABLE\s+(\w+)\s+\(/;
            const tableNameMatch = statement.match(tableNamePattern);
            if (tableNameMatch) {
                tableName = tableNameMatch[1];
            }
            // Regular expression pattern to match the FOREIGN KEY constraints
            const foreignKeyPattern = /FOREIGN\s+KEY\s+\([^)]+\)\s+REFERENCES\s+(\w+)\s*\([^)]+\)\s+ON\s+DELETE\s+(CASCADE|RESTRICT|SET\s+DEFAULT|SET\s+NULL|NO\s+ACTION)/g;
            const foreignKeyMatches = statement.matchAll(foreignKeyPattern);
            for (const foreignKeyMatch of foreignKeyMatches) {
                const foreignKey = foreignKeyMatch[0];
                foreignKeys.push(foreignKey);
            }
        }
        catch (error) {
            const msg = `getRefs: Error creating regular expression: ${error}`;
            throw UtilsDeleteError.getRefs(msg);
        }
        return { tableName, foreignKeys };
    }
    static async getReferencedTableName(refValue) {
        var tableName = '';
        if (refValue.length > 0) {
            const arr = refValue.split(new RegExp('REFERENCES', 'i'));
            if (arr.length === 2) {
                const oPar = arr[1].indexOf("(");
                tableName = arr[1].substring(0, oPar).trim();
            }
        }
        return tableName;
    }
    static async searchForRelatedItems(mDB, updTableName, tableName, whStmt, withRefsNames, colNames, values) {
        const relatedItems = [];
        let key = "";
        const t1Names = withRefsNames.map((name) => `t1.${name}`);
        const t2Names = colNames.map((name) => `t2.${name}`);
        try {
            // addPrefix to the whereClause and swap colNames with  withRefsNames
            let whereClause = UtilsSQLStatement
                .addPrefixToWhereClause(whStmt, colNames, withRefsNames, "t2.");
            // look at the whereclause and change colNames with  withRefsNames
            if (whereClause.endsWith(";")) {
                whereClause = whereClause.slice(0, -1);
            }
            const resultString = t1Names
                .map((t1, index) => `${t1} = ${t2Names[index]}`)
                .join(" AND ");
            const sql = `SELECT t1.rowid FROM ${updTableName} t1 ` +
                `JOIN ${tableName} t2 ON ${resultString} ` +
                `WHERE ${whereClause} AND t1.sql_deleted = 0;`;
            const vals = await UtilsSQLite.queryAll(mDB, sql, values);
            if (vals.length > 0) {
                key = (Object.keys(vals[0]))[0];
                relatedItems.push(...vals);
            }
            return { key: key, relatedItems: relatedItems };
        }
        catch (error) {
            const msg = error.message ? error.message : error;
            throw UtilsDeleteError.searchForRelatedItems(msg);
        }
    }
    static async upDateWhereForDefault(withRefsNames, results) {
        let setStmt = '';
        let uWhereStmt = '';
        try {
            const key = results.key;
            const cols = [];
            for (const relItem of results.relatedItems) {
                const mVal = relItem[key];
                if (mVal !== undefined) {
                    cols.push(mVal);
                }
            }
            // Create the set statement
            for (const name of withRefsNames) {
                setStmt += `${name} = NULL, `;
            }
            setStmt += 'sql_deleted = 0';
            //      const curTime = UtilsDelete.getCurrentTimeAsInteger() + 5;
            //      setStmt += `last_modified = ${curTime}`;
            // Create the where statement
            uWhereStmt = `WHERE ${key} IN (`;
            for (const col of cols) {
                uWhereStmt += `${col},`;
            }
            if (uWhereStmt.endsWith(',')) {
                uWhereStmt = uWhereStmt.slice(0, -1);
            }
            uWhereStmt += ');';
        }
        catch (error) {
            const msg = error.message ? error.message : error;
            throw UtilsDeleteError.upDateWhereForDefault(msg);
        }
        return { setStmt, uWhereStmt };
    }
    static async upDateWhereForRestrict(results) {
        try {
            const setStmt = '';
            const uWhereStmt = '';
            if (results.relatedItems.length > 0) {
                const msg = 'Restrict mode related items exist, please delete them first';
                throw UtilsDeleteError.upDateWhereForRestrict(msg);
            }
            return { setStmt, uWhereStmt };
        }
        catch (error) {
            const msg = error.message ? error.message : error;
            throw UtilsDeleteError.upDateWhereForRestrict(msg);
        }
    }
    static async upDateWhereForCascade(results) {
        let setStmt = '';
        let uWhereStmt = '';
        try {
            const key = results.key;
            const cols = [];
            for (const relItem of results.relatedItems) {
                const mVal = relItem[key];
                if (mVal !== undefined) {
                    cols.push(mVal);
                }
            }
            setStmt += 'sql_deleted = 1';
            // Create the where statement
            uWhereStmt = `WHERE ${key} IN (`;
            for (const col of cols) {
                uWhereStmt += `${col},`;
            }
            if (uWhereStmt.endsWith(',')) {
                uWhereStmt = uWhereStmt.slice(0, -1);
            }
            uWhereStmt += ');';
        }
        catch (error) {
            const msg = error.message ? error.message : error;
            throw UtilsDeleteError.upDateWhereForCascade(msg);
        }
        return { setStmt, uWhereStmt };
    }
    static executeUpdateForDelete(mDB, tableName, whereStmt, setStmt, colNames, values) {
        try {
            let lastId = -1;
            // Update sql_deleted for this references
            const stmt = `UPDATE ${tableName} SET ${setStmt} ${whereStmt}`;
            const selValues = [];
            if (values.length > 0) {
                const arrVal = whereStmt.split('?');
                if (arrVal[arrVal.length - 1] === ';') {
                    arrVal.pop();
                }
                for (let jdx = 0; jdx < arrVal.length; jdx++) {
                    for (const updVal of colNames) {
                        const indices = UtilsSQLStatement.indicesOf(arrVal[jdx], updVal);
                        if (indices.length > 0) {
                            selValues.push(values[jdx]);
                        }
                    }
                }
            }
            const retObj = UtilsSQLite.run(mDB, stmt, selValues, false, 'no');
            lastId = retObj["lastId"];
            if (lastId === -1) {
                const msg = `UPDATE sql_deleted failed for table: ${tableName}`;
                throw UtilsDeleteError.executeUpdateForDelete(msg);
            }
        }
        catch (error) {
            const msg = error.message ? error.message : error;
            throw UtilsDeleteError.executeUpdateForDelete(msg);
        }
    }
    static getCurrentTimeAsInteger() {
        const currentTime = Math.floor(Date.now() / 1000);
        return currentTime;
    }
    static checkValuesMatch(array1, array2) {
        for (const value of array1) {
            if (!array2.includes(value)) {
                return false;
            }
        }
        return true;
    }
}

class UtilsSQLite {
    static async beginTransaction(db, isOpen) {
        const msg = 'BeginTransaction: ';
        if (!isOpen) {
            return Promise.reject(new Error(`${msg}database not opened`));
        }
        try {
            db.exec('BEGIN TRANSACTION');
            return Promise.resolve();
        }
        catch (err) {
            const msge = err.message ? err.message : err;
            return Promise.reject(new Error(`${msg}${msge}`));
        }
    }
    static async rollbackTransaction(db, isOpen) {
        const msg = 'RollbackTransaction: ';
        if (!isOpen) {
            return Promise.reject(new Error(`${msg}database not opened`));
        }
        try {
            db.exec('ROLLBACK TRANSACTION');
            return Promise.resolve();
        }
        catch (err) {
            const msge = err.message ? err.message : err;
            return Promise.reject(new Error(`${msg}${msge}`));
        }
    }
    static commitTransaction(db, isOpen) {
        const msg = 'CommitTransaction: ';
        if (!isOpen) {
            return Promise.reject(new Error(`${msg}database not opened`));
        }
        const sql = 'COMMIT TRANSACTION';
        try {
            db.exec(sql);
            return Promise.resolve();
        }
        catch (err) {
            const msge = err.message ? err.message : err;
            return Promise.reject(new Error(`${msg}${msge}`));
        }
    }
    static async dbChanges(db) {
        const SELECT_CHANGE = 'SELECT total_changes()';
        let changes = 0;
        try {
            const res = db.exec(SELECT_CHANGE);
            // process the row here
            changes = res[0].values[0][0];
            return Promise.resolve(changes);
        }
        catch (err) {
            const msg = err.message ? err.message : err;
            return Promise.reject(new Error(`DbChanges failed: ${msg}`));
        }
    }
    static async getLastId(db) {
        const SELECT_LAST_ID = 'SELECT last_insert_rowid()';
        let lastId = -1;
        try {
            const res = db.exec(SELECT_LAST_ID);
            // process the row here
            lastId = res[0].values[0][0];
            return Promise.resolve(lastId);
        }
        catch (err) {
            const msg = err.message ? err.message : err;
            return Promise.reject(new Error(`GetLastId failed: ${msg}`));
        }
    }
    static async setForeignKeyConstraintsEnabled(db, toggle) {
        let stmt = 'PRAGMA foreign_keys=OFF';
        if (toggle) {
            stmt = 'PRAGMA foreign_keys=ON';
        }
        try {
            db.run(stmt);
            return Promise.resolve();
        }
        catch (err) {
            const msg = err.message ? err.message : err;
            return Promise.reject(new Error(`SetForeignKey: ${msg}`));
        }
    }
    static async getVersion(db) {
        let version = 0;
        try {
            const res = db.exec('PRAGMA user_version;');
            console.log(`#### getVersion new res: ${JSON.stringify(res)}`);
            if (res && res.length > 0 && res[0].values && res[0].values.length > 0 && res[0].values[0].length > 0) {
                version = res[0].values[0][0];
            }
            else {
                const msg = "Cannot return the version from the database";
                return Promise.reject(new Error(`GetVersion: ${msg}`));
            }
            return Promise.resolve(version);
        }
        catch (err) {
            const msg = err.message ? err.message : err;
            return Promise.reject(new Error(`GetVersion: ${msg}`));
        }
    }
    static async setVersion(db, version) {
        try {
            db.exec(`PRAGMA user_version = ${version}`);
            return Promise.resolve();
        }
        catch (err) {
            const msg = err.message ? err.message : err;
            return Promise.reject(new Error(`SetVersion: ${msg}`));
        }
    }
    static async execute(db, sql, fromJson) {
        try {
            var sqlStmt = sql;
            // Check for DELETE FROM in sql string
            if (!fromJson && sql.toLowerCase().includes('DELETE FROM'.toLowerCase())) {
                sqlStmt = sql.replace(/\n/g, '');
                let sqlStmts = sqlStmt.split(';');
                var resArr = [];
                for (const stmt of sqlStmts) {
                    const trimStmt = stmt.trim().substring(0, 11).toUpperCase();
                    if (trimStmt === 'DELETE FROM' && stmt.toLowerCase().includes('WHERE'.toLowerCase())) {
                        const whereStmt = stmt.trim();
                        const rStmt = await UtilsSQLite.deleteSQL(db, whereStmt, []);
                        resArr.push(rStmt);
                    }
                    else {
                        resArr.push(stmt);
                    }
                }
                sqlStmt = resArr.join(';');
            }
            db.exec(sqlStmt);
            const changes = await UtilsSQLite.dbChanges(db);
            return Promise.resolve(changes);
        }
        catch (err) {
            const msg = err.message ? err.message : err;
            return Promise.reject(new Error(`Execute: ${msg}`));
        }
    }
    static async executeSet(db, set, fromJson, returnMode) {
        const retValues = [];
        let lastId = -1;
        let retObj = {};
        for (let i = 0; i < set.length; i++) {
            const statement = 'statement' in set[i] ? set[i].statement : null;
            const values = 'values' in set[i] && set[i].values.length > 0 ? set[i].values : [];
            if (statement == null) {
                let msg = 'ExecuteSet: Error No statement';
                msg += ` for index ${i}`;
                return Promise.reject(new Error(msg));
            }
            try {
                if (Array.isArray(values[0])) {
                    for (const val of values) {
                        const mVal = await UtilsSQLite.replaceUndefinedByNull(val);
                        retObj = await UtilsSQLite.run(db, statement, mVal, fromJson, returnMode);
                        lastId = retObj["lastId"];
                        if (Object.keys(retObj).includes("values") && retObj["values"].length > 0) {
                            retValues.push(retObj["values"]);
                        }
                    }
                }
                else {
                    const mVal = await UtilsSQLite.replaceUndefinedByNull(values);
                    retObj = await UtilsSQLite.run(db, statement, mVal, fromJson, returnMode);
                    lastId = retObj["lastId"];
                    if (Object.keys(retObj).includes("values") && retObj["values"].length > 0) {
                        retValues.push(retObj["values"]);
                    }
                }
            }
            catch (err) {
                const msg = err.message ? err.message : err;
                return Promise.reject(new Error(`ExecuteSet: ${msg}`));
            }
        }
        retObj["lastId"] = lastId;
        retObj["values"] = returnMode === 'all' ? retValues :
            returnMode === 'one' ? retValues[0] : [];
        return Promise.resolve(retObj);
    }
    static async queryAll(db, sql, values) {
        try {
            let retArr = [];
            if (values != null && values.length > 0) {
                retArr = db.exec(sql, values);
            }
            else {
                retArr = db.exec(sql);
            }
            if (retArr.length == 0)
                return Promise.resolve([]);
            const result = retArr[0].values.map(entry => {
                const obj = {};
                retArr[0].columns.forEach((column, index) => {
                    obj[column] = entry[index];
                });
                return obj;
            });
            return Promise.resolve(result);
        }
        catch (err) {
            const msg = err.message ? err.message : err;
            return Promise.reject(new Error(`queryAll: ${msg}`));
        }
    }
    static async run(db, statement, values, fromJson, returnMode) {
        let stmtType = statement.replace(/\n/g, "").trim().substring(0, 6).toUpperCase();
        let sqlStmt = statement;
        let retValues = [];
        let retObj = {};
        try {
            if (!fromJson && stmtType === "DELETE") {
                sqlStmt = await UtilsSQLite.deleteSQL(db, statement, values);
            }
            const mValues = values ? values : [];
            let res;
            if (mValues.length > 0) {
                const mVal = await UtilsSQLite.replaceUndefinedByNull(mValues);
                res = db.exec(sqlStmt, mVal);
            }
            else {
                res = db.exec(sqlStmt);
            }
            if (returnMode === "all" || returnMode === "one") {
                if (res && res.length > 0) {
                    retValues = UtilsSQLite.getReturnedValues(res[0], returnMode);
                }
            }
            let lastId = await UtilsSQLite.getLastId(db);
            retObj["lastId"] = lastId;
            if (retValues != null && retValues.length > 0)
                retObj["values"] = retValues;
            return Promise.resolve(retObj);
        }
        catch (err) {
            const msg = err.message ? err.message : err;
            return Promise.reject(new Error(`run: ${msg}`));
        }
    }
    static getReturnedValues(result, returnMode) {
        const retValues = [];
        for (let i = 0; i < result.values.length; i++) {
            let row = {};
            for (let j = 0; j < result.columns.length; j++) {
                row[result.columns[j]] = result.values[i][j];
            }
            retValues.push(row);
            if (returnMode === 'one')
                break;
        }
        return retValues;
    }
    static async deleteSQL(db, statement, values) {
        let sqlStmt = statement;
        try {
            const isLast = await UtilsSQLite.isLastModified(db, true);
            const isDel = await UtilsSQLite.isSqlDeleted(db, true);
            if (!isLast || !isDel) {
                return sqlStmt;
            }
            // Replace DELETE by UPDATE
            // set sql_deleted to 1 and the last_modified to
            // timenow
            const whereClause = UtilsSQLStatement.extractWhereClause(sqlStmt);
            if (!whereClause) {
                const msg = 'deleteSQL: cannot find a WHERE clause';
                return Promise.reject(new Error(`${msg}`));
            }
            const tableName = UtilsSQLStatement.extractTableName(sqlStmt);
            if (!tableName) {
                const msg = 'deleteSQL: cannot find a WHERE clause';
                return Promise.reject(new Error(`${msg}`));
            }
            const colNames = UtilsSQLStatement.extractColumnNames(whereClause);
            if (colNames.length === 0) {
                const msg = 'deleteSQL: Did not find column names in the WHERE Statement';
                return Promise.reject(new Error(`${msg}`));
            }
            const setStmt = 'sql_deleted = 1';
            // Find REFERENCES if any and update the sql_deleted
            // column
            const hasToUpdate = await UtilsDelete.findReferencesAndUpdate(db, tableName, whereClause, colNames, values);
            if (hasToUpdate) {
                const whereStmt = whereClause.endsWith(';')
                    ? whereClause.slice(0, -1)
                    : whereClause;
                sqlStmt = `UPDATE ${tableName} SET ${setStmt} WHERE ${whereStmt} AND sql_deleted = 0;`;
            }
            else {
                sqlStmt = '';
            }
            return Promise.resolve(sqlStmt);
        }
        catch (err) {
            let msg = err.message ? err.message : err;
            return Promise.reject(new Error(`deleteSQL: ${msg}`));
        }
    }
    static async getTableList(db) {
        try {
            const result = await UtilsDrop.getTablesNames(db);
            return Promise.resolve(result);
        }
        catch (err) {
            const msg = err.message ? err.message : err;
            return Promise.reject(new Error(`getTableList: ${msg}`));
        }
    }
    static async isTableExists(db, tableName) {
        try {
            let statement = 'SELECT name FROM sqlite_master WHERE ';
            statement += `type='table' AND name='${tableName}';`;
            const res = await UtilsSQLite.queryAll(db, statement, []);
            const ret = res.length > 0 ? true : false;
            return Promise.resolve(ret);
        }
        catch (err) {
            const msg = err.message ? err.message : err;
            return Promise.reject(new Error(`isTableExists: ${msg}`));
        }
    }
    /**
     * isLastModified
     * @param db
     * @param isOpen
     */
    static async isLastModified(db, isOpen) {
        if (!isOpen) {
            return Promise.reject('isLastModified: database not opened');
        }
        try {
            const tableList = await UtilsDrop.getTablesNames(db);
            for (const table of tableList) {
                const tableNamesTypes = await UtilsJSON
                    .getTableColumnNamesTypes(db, table);
                const tableColumnNames = tableNamesTypes.names;
                if (tableColumnNames.includes("last_modified")) {
                    return Promise.resolve(true);
                }
            }
        }
        catch (err) {
            const msg = err.message ? err.message : err;
            return Promise.reject(new Error(`isLastModified: ${msg}`));
        }
    }
    /**
     * isSqlDeleted
     * @param db
     * @param isOpen
     */
    static async isSqlDeleted(db, isOpen) {
        if (!isOpen) {
            return Promise.reject('isSqlDeleted: database not opened');
        }
        try {
            const tableList = await UtilsDrop.getTablesNames(db);
            for (const table of tableList) {
                const tableNamesTypes = await UtilsJSON
                    .getTableColumnNamesTypes(db, table);
                const tableColumnNames = tableNamesTypes.names;
                if (tableColumnNames.includes("sql_deleted")) {
                    return Promise.resolve(true);
                }
            }
        }
        catch (err) {
            const msg = err.message ? err.message : err;
            return Promise.reject(new Error(`isSqlDeleted: ${msg}`));
        }
    }
    static async replaceUndefinedByNull(values) {
        const retValues = [];
        for (const val of values) {
            let mVal = val;
            if (typeof val === 'undefined')
                mVal = null;
            retValues.push(mVal);
        }
        return Promise.resolve(retValues);
    }
    static async backupTables(db) {
        const msg = 'BackupTables: ';
        let alterTables = {};
        try {
            const tables = await UtilsDrop.getTablesNames(db);
            for (const table of tables) {
                try {
                    const colNames = await UtilsSQLite.backupTable(db, table);
                    alterTables[`${table}`] = colNames;
                }
                catch (err) {
                    const msge = err.message ? err.message : err;
                    return Promise.reject(new Error(`${msg}table ${table}: ` + `${msge}`));
                }
            }
            return Promise.resolve(alterTables);
        }
        catch (err) {
            const msge = err.message ? err.message : err;
            return Promise.reject(new Error(`BackupTables: ${msge}`));
        }
    }
    static async backupTable(db, table) {
        try {
            // start a transaction
            await UtilsSQLite.beginTransaction(db, true);
            // get the table's column names
            const colNames = await UtilsSQLite.getTableColumnNames(db, table);
            const tmpTable = `_temp_${table}`;
            // Drop the tmpTable if exists
            const delStmt = `DROP TABLE IF EXISTS ${tmpTable};`;
            await UtilsSQLite.run(db, delStmt, [], false, 'no');
            // prefix the table with _temp_
            let stmt = `ALTER TABLE ${table} RENAME `;
            stmt += `TO ${tmpTable};`;
            const lastId = await UtilsSQLite.run(db, stmt, [], false, 'no');
            if (lastId < 0) {
                let msg = 'BackupTable: lastId < 0';
                try {
                    await UtilsSQLite.rollbackTransaction(db, true);
                }
                catch (err) {
                    msg += `: ${err.message ? err.message : err}`;
                }
                return Promise.reject(new Error(`${msg}`));
            }
            else {
                try {
                    await UtilsSQLite.commitTransaction(db, true);
                    return Promise.resolve(colNames);
                }
                catch (err) {
                    const msge = err.message ? err.message : err;
                    return Promise.reject(new Error('BackupTable: ' + `${msge}`));
                }
            }
        }
        catch (err) {
            const msge = err.message ? err.message : err;
            return Promise.reject(new Error(`BackupTable: ${msge}`));
        }
    }
    static async getTableColumnNames(db, tableName) {
        let resQuery = [];
        const retNames = [];
        const query = `PRAGMA table_info('${tableName}');`;
        try {
            resQuery = await UtilsSQLite.queryAll(db, query, []);
            if (resQuery.length > 0) {
                for (const query of resQuery) {
                    retNames.push(query.name);
                }
            }
            return Promise.resolve(retNames);
        }
        catch (err) {
            const msg = err.message ? err.message : err;
            return Promise.reject(new Error('GetTableColumnNames: ' + `${msg}`));
        }
    }
    static async findCommonColumns(db, alterTables) {
        let commonColumns = {};
        try {
            // Get new table list
            const tables = await UtilsDrop.getTablesNames(db);
            if (tables.length === 0) {
                return Promise.reject(new Error('FindCommonColumns: get ' + "table's names failed"));
            }
            for (const table of tables) {
                // get the column's name
                const tableNames = await UtilsSQLite.getTableColumnNames(db, table);
                // find the common columns
                const keys = Object.keys(alterTables);
                if (keys.includes(table)) {
                    commonColumns[table] = UtilsSQLite.arraysIntersection(alterTables[table], tableNames);
                }
            }
            return Promise.resolve(commonColumns);
        }
        catch (err) {
            const msg = err.message ? err.message : err;
            return Promise.reject(new Error(`FindCommonColumns: ${msg}`));
        }
    }
    static arraysIntersection(a1, a2) {
        if (a1 != null && a2 != null) {
            const first = new Set(a1);
            const second = new Set(a2);
            return [...first].filter(item => second.has(item));
        }
        else {
            return [];
        }
    }
    static async updateNewTablesData(db, commonColumns) {
        try {
            // start a transaction
            await UtilsSQLite.beginTransaction(db, true);
            const statements = [];
            const keys = Object.keys(commonColumns);
            keys.forEach(key => {
                const columns = commonColumns[key].join(',');
                let stmt = `INSERT INTO ${key} `;
                stmt += `(${columns}) `;
                stmt += `SELECT ${columns} FROM _temp_${key};`;
                statements.push(stmt);
            });
            const changes = await UtilsSQLite.execute(db, statements.join('\n'), false);
            if (changes < 0) {
                let msg = 'updateNewTablesData: ' + 'changes < 0';
                try {
                    await UtilsSQLite.rollbackTransaction(db, true);
                }
                catch (err) {
                    msg += `: ${err.message ? err.message : err}`;
                }
                return Promise.reject(new Error(`${msg}`));
            }
            else {
                try {
                    await UtilsSQLite.commitTransaction(db, true);
                    return Promise.resolve();
                }
                catch (err) {
                    const msg = err.message ? err.message : err;
                    return Promise.reject(new Error('updateNewTablesData: ' + `${msg}`));
                }
            }
        }
        catch (err) {
            const msg = err.message ? err.message : err;
            return Promise.reject(new Error('updateNewTablesData: ' + `${msg}`));
        }
    }
}

class UtilsImportJSON {
    static async createDatabaseSchema(mDB, jsonData) {
        let changes = -1;
        const version = jsonData.version;
        try {
            // set User Version PRAGMA
            await UtilsSQLite.setVersion(mDB.mDb, version);
            // DROP ALL when mode="full"
            if (jsonData.mode === 'full') {
                await UtilsDrop.dropAll(mDB.mDb);
            }
            // create database schema
            changes = await UtilsImportJSON.createSchema(mDB, jsonData);
            return Promise.resolve(changes);
        }
        catch (err) {
            return Promise.reject(new Error('CreateDatabaseSchema: ' + `${err.message}`));
        }
    }
    static async createSchema(mDB, jsonData) {
        // create the database schema
        let changes = 0;
        const db = mDB.mDb;
        try {
            // start a transaction
            await UtilsSQLite.beginTransaction(db, true);
            mDB.setIsTransActive(true);
        }
        catch (err) {
            return Promise.reject(new Error(`CreateSchema: ${err.message}`));
        }
        const stmts = await UtilsImportJSON.createSchemaStatement(jsonData);
        if (stmts.length > 0) {
            const schemaStmt = stmts.join('\n');
            try {
                changes = await UtilsSQLite.execute(db, schemaStmt, true);
                if (changes < 0) {
                    try {
                        await UtilsSQLite.rollbackTransaction(db, true);
                        mDB.setIsTransActive(false);
                    }
                    catch (err) {
                        return Promise.reject(new Error('CreateSchema: changes < 0 ' + `${err.message}`));
                    }
                }
            }
            catch (err) {
                const msg = err.message;
                try {
                    await UtilsSQLite.rollbackTransaction(db, true);
                    mDB.setIsTransActive(false);
                    return Promise.reject(new Error(`CreateSchema: ${msg}`));
                }
                catch (err) {
                    return Promise.reject(new Error('CreateSchema: changes < 0 ' + `${err.message}: ${msg}`));
                }
            }
        }
        try {
            await UtilsSQLite.commitTransaction(db, true);
            mDB.setIsTransActive(false);
            return Promise.resolve(changes);
        }
        catch (err) {
            return Promise.reject(new Error('CreateSchema: commit ' + `${err.message}`));
        }
    }
    static async createSchemaStatement(jsonData) {
        const statements = [];
        let isLastModified = false;
        let isSqlDeleted = false;
        // Prepare the statement to execute
        try {
            for (const jTable of jsonData.tables) {
                if (jTable.schema != null && jTable.schema.length >= 1) {
                    // create table
                    statements.push('CREATE TABLE IF NOT EXISTS ' + `${jTable.name} (`);
                    for (let j = 0; j < jTable.schema.length; j++) {
                        if (j === jTable.schema.length - 1) {
                            if (jTable.schema[j].column) {
                                statements.push(`${jTable.schema[j].column} ${jTable.schema[j].value}`);
                                if (jTable.schema[j].column === "last_modified") {
                                    isLastModified = true;
                                }
                                if (jTable.schema[j].column === "sql_deleted") {
                                    isSqlDeleted = true;
                                }
                            }
                            else if (jTable.schema[j].foreignkey) {
                                statements.push(`FOREIGN KEY (${jTable.schema[j].foreignkey}) ${jTable.schema[j].value}`);
                            }
                            else if (jTable.schema[j].constraint) {
                                statements.push(`CONSTRAINT ${jTable.schema[j].constraint} ${jTable.schema[j].value}`);
                            }
                        }
                        else {
                            if (jTable.schema[j].column) {
                                statements.push(`${jTable.schema[j].column} ${jTable.schema[j].value},`);
                            }
                            else if (jTable.schema[j].foreignkey) {
                                statements.push(`FOREIGN KEY (${jTable.schema[j].foreignkey}) ${jTable.schema[j].value},`);
                            }
                            else if (jTable.schema[j].primarykey) {
                                statements.push(`FOREIGN KEY ${jTable.schema[j].value},`);
                            }
                            else if (jTable.schema[j].constraint) {
                                statements.push(`CONSTRAINT ${jTable.schema[j].constraint} ${jTable.schema[j].value},`);
                            }
                        }
                    }
                    statements.push(');');
                    if (isLastModified && isSqlDeleted) {
                        // create trigger last_modified associated with the table
                        let trig = 'CREATE TRIGGER IF NOT EXISTS ';
                        trig += `${jTable.name}`;
                        trig += `_trigger_last_modified `;
                        trig += `AFTER UPDATE ON ${jTable.name} `;
                        trig += 'FOR EACH ROW WHEN NEW.last_modified < ';
                        trig += 'OLD.last_modified BEGIN UPDATE ';
                        trig += `${jTable.name} `;
                        trig += `SET last_modified = `;
                        trig += "(strftime('%s','now')) WHERE id=OLD.id; END;";
                        statements.push(trig);
                    }
                }
                if (jTable.indexes != null && jTable.indexes.length >= 1) {
                    for (const jIndex of jTable.indexes) {
                        const tableName = jTable.name;
                        let stmt = `CREATE ${Object.keys(jIndex).includes('mode') ? jIndex.mode + ' ' : ''} INDEX IF NOT EXISTS `;
                        stmt += `${jIndex.name} ON ${tableName} (${jIndex.value});`;
                        statements.push(stmt);
                    }
                }
                if (jTable.triggers != null && jTable.triggers.length >= 1) {
                    for (const jTrg of jTable.triggers) {
                        const tableName = jTable.name;
                        if (jTrg.timeevent.toUpperCase().endsWith(" ON")) {
                            jTrg.timeevent = jTrg.timeevent.substring(0, jTrg.timeevent.length - 3);
                        }
                        let stmt = `CREATE TRIGGER IF NOT EXISTS `;
                        stmt += `${jTrg.name} ${jTrg.timeevent} ON ${tableName} `;
                        if (jTrg.condition)
                            stmt += `${jTrg.condition} `;
                        stmt += `${jTrg.logic};`;
                        statements.push(stmt);
                    }
                }
            }
            return Promise.resolve(statements);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    static async createTablesData(mDB, jsonData, importProgress) {
        let changes = 0;
        let isValue = false;
        let lastId = -1;
        let msg = '';
        let initChanges = -1;
        const db = mDB.mDb;
        try {
            initChanges = await UtilsSQLite.dbChanges(db);
            // start a transaction
            await UtilsSQLite.beginTransaction(db, true);
            mDB.setIsTransActive(true);
        }
        catch (err) {
            return Promise.reject(new Error(`createTablesData: ${err.message}`));
        }
        for (const jTable of jsonData.tables) {
            if (jTable.values != null && jTable.values.length >= 1) {
                // Create the table's data
                try {
                    lastId = await UtilsImportJSON.createTableData(db, jTable, jsonData.mode);
                    const msg = `create table data ${jTable.name}`;
                    importProgress.emit({ progress: msg });
                    if (lastId < 0)
                        break;
                    isValue = true;
                }
                catch (err) {
                    msg = err.message;
                    isValue = false;
                    break;
                }
            }
        }
        if (isValue) {
            try {
                await UtilsSQLite.commitTransaction(db, true);
                mDB.setIsTransActive(false);
                changes = (await UtilsSQLite.dbChanges(db)) - initChanges;
                return Promise.resolve(changes);
            }
            catch (err) {
                return Promise.reject(new Error('CreateTablesData: ' + `${err.message}`));
            }
        }
        else {
            if (msg.length > 0) {
                try {
                    await UtilsSQLite.rollbackTransaction(db, true);
                    mDB.setIsTransActive(false);
                    return Promise.reject(new Error(`CreateTablesData: ${msg}`));
                }
                catch (err) {
                    return Promise.reject(new Error('CreateTablesData: ' + `${err.message}: ${msg}`));
                }
            }
            else {
                // case were no values given
                return Promise.resolve(0);
            }
        }
    }
    static async createTableData(db, table, mode) {
        let lastId = -1;
        try {
            // Check if the table exists
            const tableExists = await UtilsSQLite.isTableExists(db, table.name);
            if (!tableExists) {
                return Promise.reject(new Error('CreateTableData: Table ' + `${table.name} does not exist`));
            }
            // Get the column names and types
            const tableNamesTypes = await UtilsJSON
                .getTableColumnNamesTypes(db, table.name);
            const tableColumnTypes = tableNamesTypes.types;
            const tableColumnNames = tableNamesTypes.names;
            if (tableColumnTypes.length === 0) {
                return Promise.reject(new Error('CreateTableData: Table ' + `${table.name} info does not exist`));
            }
            // Loop on Table Values
            for (let j = 0; j < table.values.length; j++) {
                let row = table.values[j];
                let isRun = true;
                const stmt = await UtilsImportJSON
                    .createRowStatement(db, tableColumnNames, row, j, table.name, mode);
                isRun = await UtilsImportJSON.checkUpdate(db, stmt, row, table.name, tableColumnNames);
                if (isRun) {
                    if (stmt.substring(0, 6).toUpperCase() === "DELETE") {
                        row = [];
                    }
                    lastId = await UtilsSQLite.run(db, stmt, row, true, 'no');
                    if (lastId < 0) {
                        return Promise.reject(new Error('CreateTableData: lastId < 0'));
                    }
                }
                else {
                    lastId = 0;
                }
            }
            return Promise.resolve(lastId);
        }
        catch (err) {
            return Promise.reject(new Error(`CreateTableData: ${err.message}`));
        }
    }
    static async createRowStatement(db, tColNames, row, j, tableName, mode) {
        // Check the row number of columns
        if (row.length != tColNames.length || row.length === 0 || tColNames.length === 0) {
            return Promise.reject(new Error(`CreateRowStatement: Table ${tableName} ` +
                `values row ${j} not correct length`));
        }
        try {
            const retisIdExists = await UtilsImportJSON.isIdExists(db, tableName, tColNames[0], row[0]);
            let stmt;
            if (mode === 'full' || (mode === 'partial' && !retisIdExists)) {
                // Insert
                const nameString = tColNames.join();
                const questionMarkString = await UtilsImportJSON.createQuestionMarkString(tColNames.length);
                stmt = `INSERT INTO ${tableName} (${nameString}) VALUES (`;
                stmt += `${questionMarkString});`;
            }
            else {
                // Update or Delete
                let isUpdate = true;
                const isColDeleted = (element) => element === `sql_deleted`;
                const idxDelete = tColNames.findIndex(isColDeleted);
                if (idxDelete >= 0) {
                    if (row[idxDelete] === 1) {
                        isUpdate = false;
                        stmt =
                            `DELETE FROM ${tableName} WHERE `;
                        if (typeof row[0] == "string") {
                            stmt +=
                                `${tColNames[0]} = '${row[0]}';`;
                        }
                        else {
                            stmt +=
                                `${tColNames[0]} = ${row[0]};`;
                        }
                    }
                }
                if (isUpdate) {
                    // Update
                    const setString = await UtilsImportJSON.setNameForUpdate(tColNames);
                    if (setString.length === 0) {
                        return Promise.reject(new Error(`CreateRowStatement: Table ${tableName} ` +
                            `values row ${j} not set to String`));
                    }
                    stmt =
                        `UPDATE ${tableName} SET ${setString} WHERE `;
                    if (typeof row[0] == "string") {
                        stmt +=
                            `${tColNames[0]} = '${row[0]}';`;
                    }
                    else {
                        stmt +=
                            `${tColNames[0]} = ${row[0]};`;
                    }
                }
            }
            return Promise.resolve(stmt);
        }
        catch (err) {
            return Promise.reject(new Error(`CreateRowStatement: ${err.message}`));
        }
    }
    static async checkUpdate(db, stmt, values, tbName, tColNames) {
        let isRun = true;
        if (stmt.substring(0, 6) === "UPDATE") {
            try {
                let query = `SELECT * FROM ${tbName} WHERE `;
                if (typeof values[0] == "string") {
                    query +=
                        `${tColNames[0]} = '${values[0]}';`;
                }
                else {
                    query +=
                        `${tColNames[0]} = ${values[0]};`;
                }
                const resQuery = await UtilsJSON.getValues(db, query, tbName);
                let resValues = [];
                if (resQuery.length > 0) {
                    resValues = resQuery[0];
                }
                if (values.length > 0 && resValues.length > 0
                    && values.length === resValues.length) {
                    for (let i = 0; i < values.length; i++) {
                        if (values[i] !== resValues[i]) {
                            return Promise.resolve(true);
                        }
                    }
                    return Promise.resolve(false);
                }
                else {
                    const msg = "Both arrays not the same length";
                    return Promise.reject(new Error(`CheckUpdate: ${msg}`));
                }
            }
            catch (err) {
                return Promise.reject(new Error(`CheckUpdate: ${err.message}`));
            }
        }
        else {
            return Promise.resolve(isRun);
        }
    }
    static async isIdExists(db, dbName, firstColumnName, key) {
        let ret = false;
        let query = `SELECT ${firstColumnName} FROM ` +
            `${dbName} WHERE ${firstColumnName} = `;
        if (typeof key === 'number')
            query += `${key};`;
        if (typeof key === 'string')
            query += `'${key}';`;
        try {
            const resQuery = await UtilsSQLite.queryAll(db, query, []);
            if (resQuery.length === 1)
                ret = true;
            return Promise.resolve(ret);
        }
        catch (err) {
            return Promise.reject(new Error(`IsIdExists: ${err.message}`));
        }
    }
    static async isType(type, value) {
        let ret = false;
        if (type === 'NULL' && typeof value === 'object')
            ret = true;
        if (type === 'TEXT' && typeof value === 'string')
            ret = true;
        if (type === 'INTEGER' && typeof value === 'number')
            ret = true;
        if (type === 'REAL' && typeof value === 'number')
            ret = true;
        if (type === 'BLOB' && typeof value === 'string')
            ret = true;
        if (ret) {
            return Promise.resolve();
        }
        else {
            return Promise.reject(new Error('IsType: not a SQL Type'));
        }
    }
    static async checkColumnTypes(tableTypes, rowValues) {
        for (let i = 0; i < rowValues.length; i++) {
            if (rowValues[i] != null) {
                try {
                    await UtilsImportJSON.isType(tableTypes[i], rowValues[i]);
                }
                catch (err) {
                    return Promise.reject(new Error('CheckColumnTypes: Type not found'));
                }
            }
        }
        return Promise.resolve();
    }
    static async createQuestionMarkString(length) {
        let retString = '';
        for (let i = 0; i < length; i++) {
            retString += '?,';
        }
        if (retString.length > 1) {
            retString = retString.slice(0, -1);
            return Promise.resolve(retString);
        }
        else {
            return Promise.reject(new Error('CreateQuestionMarkString: length = 0'));
        }
    }
    static async setNameForUpdate(names) {
        let retString = '';
        for (const name of names) {
            retString += `${name} = ? ,`;
        }
        if (retString.length > 1) {
            retString = retString.slice(0, -1);
            return Promise.resolve(retString);
        }
        else {
            return Promise.reject(new Error('SetNameForUpdate: length = 0'));
        }
    }
    static async createView(db, view) {
        const stmt = `CREATE VIEW IF NOT EXISTS ${view.name} AS ${view.value};`;
        try {
            const changes = await UtilsSQLite.execute(db, stmt, true);
            if (changes < 0) {
                return Promise.reject(new Error(`CreateView: ${view.name} failed`));
            }
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(new Error(`CreateView: ${err.message}`));
        }
    }
    static async createViews(mDB, jsonData) {
        const db = mDB.mDb;
        let isView = false;
        let msg = '';
        let initChanges = -1;
        let changes = -1;
        try {
            initChanges = await UtilsSQLite.dbChanges(db);
            // start a transaction
            await UtilsSQLite.beginTransaction(db, true);
            mDB.setIsTransActive(true);
        }
        catch (err) {
            return Promise.reject(new Error(`createViews: ${err.message}`));
        }
        for (const jView of jsonData.views) {
            if (jView.value != null) {
                // Create the view
                try {
                    await UtilsImportJSON.createView(db, jView);
                    isView = true;
                }
                catch (err) {
                    msg = err.message;
                    isView = false;
                    break;
                }
            }
        }
        if (isView) {
            try {
                await UtilsSQLite.commitTransaction(db, true);
                mDB.setIsTransActive(false);
                changes = (await UtilsSQLite.dbChanges(db)) - initChanges;
                return Promise.resolve(changes);
            }
            catch (err) {
                return Promise.reject(new Error('createViews: ' + `${err.message}`));
            }
        }
        else {
            if (msg.length > 0) {
                try {
                    await UtilsSQLite.rollbackTransaction(db, true);
                    mDB.setIsTransActive(false);
                    return Promise.reject(new Error(`createViews: ${msg}`));
                }
                catch (err) {
                    return Promise.reject(new Error('createViews: ' + `${err.message}: ${msg}`));
                }
            }
            else {
                // case were no views given
                return Promise.resolve(0);
            }
        }
    }
}

class UtilsExportJSON {
    static async createExportObject(db, sqlObj, exportProgress) {
        const retObj = {};
        let tables = [];
        let views = [];
        let errmsg = '';
        try {
            // get View's name
            views = await UtilsExportJSON.getViewsName(db);
            // get Table's name
            const resTables = await UtilsExportJSON.getTablesNameSQL(db);
            if (resTables.length === 0) {
                return Promise.reject(new Error("createExportObject: table's names failed"));
            }
            else {
                const isTable = await UtilsSQLite.isTableExists(db, 'sync_table');
                if (!isTable && sqlObj.mode === 'partial') {
                    return Promise.reject(new Error('No sync_table available'));
                }
                switch (sqlObj.mode) {
                    case 'partial': {
                        tables = await UtilsExportJSON.getTablesPartial(db, resTables, exportProgress);
                        break;
                    }
                    case 'full': {
                        tables = await UtilsExportJSON.getTablesFull(db, resTables, exportProgress);
                        break;
                    }
                    default: {
                        errmsg =
                            'createExportObject: expMode ' + sqlObj.mode + ' not defined';
                        break;
                    }
                }
                if (errmsg.length > 0) {
                    return Promise.reject(new Error(errmsg));
                }
                if (tables.length > 0) {
                    retObj.database = sqlObj.database;
                    retObj.version = sqlObj.version;
                    retObj.encrypted = sqlObj.encrypted;
                    retObj.mode = sqlObj.mode;
                    retObj.tables = tables;
                    if (views.length > 0) {
                        retObj.views = views;
                    }
                }
                return Promise.resolve(retObj);
            }
        }
        catch (err) {
            return Promise.reject(new Error('createExportObject: ' + err.message));
        }
    }
    static async getViewsName(mDb) {
        const views = [];
        let sql = 'SELECT name,sql FROM sqlite_master WHERE ';
        sql += "type='view' AND name NOT LIKE 'sqlite_%';";
        let retQuery = [];
        try {
            retQuery = await UtilsSQLite.queryAll(mDb, sql, []);
            for (const query of retQuery) {
                const view = {};
                view.name = query.name;
                view.value = query.sql.substring(query.sql.indexOf('AS ') + 3);
                views.push(view);
            }
            return Promise.resolve(views);
        }
        catch (err) {
            return Promise.reject(new Error(`getViewsName: ${err.message}`));
        }
    }
    static async getTablesFull(db, resTables, exportProgress) {
        const tables = [];
        let errmsg = '';
        try {
            // Loop through the tables
            for (const rTable of resTables) {
                let tableName;
                let sqlStmt;
                if (rTable.name) {
                    tableName = rTable.name;
                }
                else {
                    errmsg = 'GetTablesFull: no name';
                    break;
                }
                if (rTable.sql) {
                    sqlStmt = rTable.sql;
                }
                else {
                    errmsg = 'GetTablesFull: no sql';
                    break;
                }
                const table = {};
                // create Table's Schema
                const schema = await UtilsExportJSON.getSchema(sqlStmt /*, tableName*/);
                if (schema.length === 0) {
                    errmsg = 'GetTablesFull: no Schema returned';
                    break;
                }
                // check schema validity
                await UtilsJSON.checkSchemaValidity(schema);
                // create Table's indexes if any
                const indexes = await UtilsExportJSON.getIndexes(db, tableName);
                if (indexes.length > 0) {
                    // check indexes validity
                    await UtilsJSON.checkIndexesValidity(indexes);
                }
                // create Table's triggers if any
                const triggers = await UtilsExportJSON.getTriggers(db, tableName);
                if (triggers.length > 0) {
                    // check triggers validity
                    await UtilsJSON.checkTriggersValidity(triggers);
                }
                let msg = `Full: Table ${tableName} schema export completed ...`;
                exportProgress.emit({ progress: msg });
                // create Table's Data
                const query = `SELECT * FROM ${tableName};`;
                const values = await UtilsJSON.getValues(db, query, tableName);
                table.name = tableName;
                if (schema.length > 0) {
                    table.schema = schema;
                }
                else {
                    errmsg = `GetTablesFull: must contain schema`;
                    break;
                }
                if (indexes.length > 0) {
                    table.indexes = indexes;
                }
                if (triggers.length > 0) {
                    table.triggers = triggers;
                }
                if (values.length > 0) {
                    table.values = values;
                }
                if (Object.keys(table).length <= 1) {
                    errmsg = `GetTablesFull: table ${tableName} is not a jsonTable`;
                    break;
                }
                msg = `Full: Table ${tableName} table data export completed ...`;
                exportProgress.emit({ progress: msg });
                tables.push(table);
            }
            if (errmsg.length > 0) {
                return Promise.reject(new Error(errmsg));
            }
            return Promise.resolve(tables);
        }
        catch (err) {
            return Promise.reject(new Error(`GetTablesFull: ${err.message}`));
        }
    }
    static async getSchema(sqlStmt /*, tableName: string*/) {
        const schema = [];
        // take the substring between parenthesis
        const openPar = sqlStmt.indexOf('(');
        const closePar = sqlStmt.lastIndexOf(')');
        let sstr = sqlStmt.substring(openPar + 1, closePar);
        // check if there is other parenthesis and replace the ',' by '§'
        try {
            sstr = await UtilsExportJSON.modEmbeddedParentheses(sstr);
            const sch = sstr.split(",");
            // for each element of the array split the
            // first word as key
            for (let j = 0; j < sch.length; j++) {
                let row = [];
                const scht = sch[j].replace(/\n/g, "").trim();
                row[0] = scht.substring(0, scht.indexOf(" "));
                row[1] = scht.substring(scht.indexOf(" ") + 1);
                const jsonRow = {};
                if (row[0].toUpperCase() === "FOREIGN") {
                    const oPar = scht.indexOf("(");
                    const cPar = scht.indexOf(")");
                    const fk = scht.substring(oPar + 1, cPar);
                    const fknames = fk.split('§');
                    row[0] = fknames.join(',');
                    row[0] = row[0].replace(/, /g, ",");
                    row[1] = scht.substring(cPar + 2);
                    jsonRow['foreignkey'] = row[0];
                }
                else if (row[0].toUpperCase() === "PRIMARY") {
                    row = UtilsExportJSON.getRow(scht, "CPK");
                    jsonRow['constraint'] = row[0];
                }
                else if (row[0].toUpperCase() === "UNIQUE") {
                    row = UtilsExportJSON.getRow(scht, "CUN");
                    jsonRow['constraint'] = row[0];
                }
                else if (row[0].toUpperCase() === "CONSTRAINT") {
                    let tRow = [];
                    const row1t = row[1].trim();
                    tRow[0] = row1t.substring(0, row1t.indexOf(" "));
                    tRow[1] = row1t.substring(row1t.indexOf(" ") + 1);
                    row[0] = tRow[0];
                    jsonRow['constraint'] = row[0];
                    row[1] = tRow[1];
                }
                else {
                    jsonRow['column'] = row[0];
                }
                jsonRow['value'] = row[1].replace(/§/g, ",");
                schema.push(jsonRow);
            }
            return Promise.resolve(schema);
        }
        catch (err) {
            return Promise.reject(new Error(err.message));
        }
    }
    static getRow(scht, cName) {
        let row = [];
        const oPar = scht.indexOf("(");
        const cPar = scht.indexOf(")");
        const values = scht.substring(oPar + 1, cPar);
        const valuesnames = values.split('§');
        row[0] = `${cName}_` + valuesnames.join('_');
        row[0] = row[0].replace(/_ /g, "_");
        row[1] = scht;
        return row;
    }
    static async getIndexes(db, tableName) {
        const indexes = [];
        let errmsg = '';
        try {
            let stmt = 'SELECT name,tbl_name,sql FROM sqlite_master WHERE ';
            stmt += `type = 'index' AND tbl_name = '${tableName}' `;
            stmt += `AND sql NOTNULL;`;
            const retIndexes = await UtilsSQLite.queryAll(db, stmt, []);
            if (retIndexes.length > 0) {
                for (const rIndex of retIndexes) {
                    const keys = Object.keys(rIndex);
                    if (keys.length === 3) {
                        if (rIndex['tbl_name'] === tableName) {
                            const sql = rIndex['sql'];
                            const mode = sql.includes('UNIQUE') ? 'UNIQUE' : '';
                            const oPar = sql.lastIndexOf('(');
                            const cPar = sql.lastIndexOf(')');
                            const index = {};
                            index.name = rIndex['name'];
                            index.value = sql.slice(oPar + 1, cPar);
                            if (mode.length > 0)
                                index.mode = mode;
                            indexes.push(index);
                        }
                        else {
                            errmsg = `GetIndexes: Table ${tableName} doesn't match`;
                            break;
                        }
                    }
                    else {
                        errmsg = `GetIndexes: Table ${tableName} creating indexes`;
                        break;
                    }
                }
                if (errmsg.length > 0) {
                    return Promise.reject(new Error(errmsg));
                }
            }
            return Promise.resolve(indexes);
        }
        catch (err) {
            return Promise.reject(new Error(`GetIndexes: ${err.message}`));
        }
    }
    static async getTriggers(db, tableName) {
        const triggers = [];
        try {
            let stmt = 'SELECT name,tbl_name,sql FROM sqlite_master WHERE ';
            stmt += `type = 'trigger' AND tbl_name = '${tableName}' `;
            stmt += `AND sql NOT NULL;`;
            const retTriggers = await UtilsSQLite.queryAll(db, stmt, []);
            if (retTriggers.length > 0) {
                for (const rTrg of retTriggers) {
                    const keys = Object.keys(rTrg);
                    if (keys.length === 3) {
                        if (rTrg['tbl_name'] === tableName) {
                            const sql = rTrg['sql'];
                            const name = rTrg['name'];
                            let sqlArr = sql.split(name);
                            if (sqlArr.length != 2) {
                                return Promise.reject(new Error(`GetTriggers: sql split name does not return 2 values`));
                            }
                            if (!sqlArr[1].includes(tableName)) {
                                return Promise.reject(new Error(`GetTriggers: sql split does not contains ${tableName}`));
                            }
                            const timeEvent = sqlArr[1].split(tableName, 1)[0].trim();
                            sqlArr = sqlArr[1].split(timeEvent + ' ' + tableName);
                            if (sqlArr.length != 2) {
                                return Promise.reject(new Error(`GetTriggers: sql split tableName does not return 2 values`));
                            }
                            let condition = '';
                            let logic = '';
                            if (sqlArr[1].trim().substring(0, 5).toUpperCase() !== 'BEGIN') {
                                sqlArr = sqlArr[1].trim().split('BEGIN');
                                if (sqlArr.length != 2) {
                                    return Promise.reject(new Error(`GetTriggers: sql split BEGIN does not return 2 values`));
                                }
                                condition = sqlArr[0].trim();
                                logic = 'BEGIN' + sqlArr[1];
                            }
                            else {
                                logic = sqlArr[1].trim();
                            }
                            const trigger = {};
                            trigger.name = name;
                            trigger.logic = logic;
                            if (condition.length > 0)
                                trigger.condition = condition;
                            trigger.timeevent = timeEvent;
                            triggers.push(trigger);
                        }
                        else {
                            return Promise.reject(new Error(`GetTriggers: Table ${tableName} doesn't match`));
                        }
                    }
                    else {
                        return Promise.reject(new Error(`GetTriggers: Table ${tableName} creating indexes`));
                    }
                }
            }
            return Promise.resolve(triggers);
        }
        catch (err) {
            return Promise.reject(new Error(`GetTriggers: ${err.message}`));
        }
    }
    static async getTablesPartial(db, resTables, exportProgress) {
        const tables = [];
        let modTables = {};
        let syncDate = 0;
        let modTablesKeys = [];
        let errmsg = '';
        try {
            // Get the syncDate and the Modified Tables
            const partialModeData = await UtilsExportJSON
                .getPartialModeData(db, resTables);
            if (Object.keys(partialModeData).includes('syncDate')) {
                syncDate = partialModeData.syncDate;
            }
            if (Object.keys(partialModeData).includes('modTables')) {
                modTables = partialModeData.modTables;
                modTablesKeys = Object.keys(modTables);
            }
            // Loop trough tables
            for (const rTable of resTables) {
                let tableName = '';
                let sqlStmt = '';
                if (rTable.name) {
                    tableName = rTable.name;
                }
                else {
                    errmsg = 'GetTablesFull: no name';
                    break;
                }
                if (rTable.sql) {
                    sqlStmt = rTable.sql;
                }
                else {
                    errmsg = 'GetTablesFull: no sql';
                    break;
                }
                if (modTablesKeys.length == 0 ||
                    modTablesKeys.indexOf(tableName) === -1 ||
                    modTables[tableName] == 'No') {
                    continue;
                }
                const table = {};
                let schema = [];
                let indexes = [];
                let triggers = [];
                table.name = rTable;
                if (modTables[table.name] === 'Create') {
                    // create Table's Schema
                    schema = await UtilsExportJSON.getSchema(sqlStmt /*, tableName*/);
                    if (schema.length > 0) {
                        // check schema validity
                        await UtilsJSON.checkSchemaValidity(schema);
                    }
                    // create Table's indexes if any
                    indexes = await UtilsExportJSON.getIndexes(db, tableName);
                    if (indexes.length > 0) {
                        // check indexes validity
                        await UtilsJSON.checkIndexesValidity(indexes);
                    }
                    // create Table's triggers if any
                    triggers = await UtilsExportJSON.getTriggers(db, tableName);
                    if (triggers.length > 0) {
                        // check triggers validity
                        await UtilsJSON.checkTriggersValidity(triggers);
                    }
                }
                let msg = `Partial: Table ${tableName} schema export completed ...`;
                exportProgress.emit({ progress: msg });
                // create Table's Data
                let query = '';
                if (modTables[tableName] === 'Create') {
                    query = `SELECT * FROM ${tableName};`;
                }
                else {
                    query =
                        `SELECT * FROM ${tableName} ` +
                            `WHERE last_modified > ${syncDate};`;
                }
                const values = await UtilsJSON.getValues(db, query, tableName);
                // check the table object validity
                table.name = tableName;
                if (schema.length > 0) {
                    table.schema = schema;
                }
                if (indexes.length > 0) {
                    table.indexes = indexes;
                }
                if (triggers.length > 0) {
                    table.triggers = triggers;
                }
                if (values.length > 0) {
                    table.values = values;
                }
                if (Object.keys(table).length <= 1) {
                    errmsg = `GetTablesPartial: table ${tableName} is not a jsonTable`;
                    break;
                }
                msg = `Partial: Table ${tableName} table data export completed ...`;
                exportProgress.emit({ progress: msg });
                tables.push(table);
            }
            if (errmsg.length > 0) {
                return Promise.reject(new Error(errmsg));
            }
            return Promise.resolve(tables);
        }
        catch (err) {
            return Promise.reject(new Error(`GetTablesPartial: ${err.message}`));
        }
    }
    static async getPartialModeData(db, resTables) {
        const retData = {};
        try {
            // get the synchronization date
            const syncDate = await UtilsExportJSON.getSynchroDate(db);
            if (syncDate <= 0) {
                return Promise.reject(new Error(`GetPartialModeData: no syncDate`));
            }
            // get the tables which have been updated
            // since last synchronization
            const modTables = await UtilsExportJSON.getTablesModified(db, resTables, syncDate);
            if (modTables.length <= 0) {
                return Promise.reject(new Error(`GetPartialModeData: no modTables`));
            }
            retData.syncDate = syncDate;
            retData.modTables = modTables;
            return Promise.resolve(retData);
        }
        catch (err) {
            return Promise.reject(new Error(`GetPartialModeData: ${err.message}`));
        }
    }
    static async getTablesNameSQL(db) {
        let sql = 'SELECT name,sql FROM sqlite_master WHERE ';
        sql += "type='table' AND name NOT LIKE 'sync_table' ";
        sql += "AND name NOT LIKE '_temp_%' ";
        sql += "AND name NOT LIKE 'sqlite_%';";
        try {
            const retQuery = await UtilsSQLite.queryAll(db, sql, []);
            return Promise.resolve(retQuery);
        }
        catch (err) {
            return Promise.reject(new Error(`getTablesNamesSQL: ${err.message}`));
        }
    }
    static async getTablesModified(db, tables, syncDate) {
        let errmsg = '';
        try {
            const retModified = {};
            for (const rTable of tables) {
                let mode;
                // get total count of the table
                let stmt = 'SELECT count(*) AS tcount  ';
                stmt += `FROM ${rTable.name};`;
                let retQuery = await UtilsSQLite.queryAll(db, stmt, []);
                if (retQuery.length != 1) {
                    errmsg = 'GetTableModified: total ' + 'count not returned';
                    break;
                }
                const totalCount = retQuery[0]['tcount'];
                // get total count of modified since last sync
                stmt = 'SELECT count(*) AS mcount FROM ';
                stmt += `${rTable.name} WHERE last_modified > `;
                stmt += `${syncDate};`;
                retQuery = await UtilsSQLite.queryAll(db, stmt, []);
                if (retQuery.length != 1)
                    break;
                const totalModifiedCount = retQuery[0]['mcount'];
                if (totalModifiedCount === 0) {
                    mode = 'No';
                }
                else if (totalCount === totalModifiedCount) {
                    mode = 'Create';
                }
                else {
                    mode = 'Modified';
                }
                const key = rTable.name;
                retModified[key] = mode;
            }
            if (errmsg.length > 0) {
                return Promise.reject(new Error(errmsg));
            }
            return Promise.resolve(retModified);
        }
        catch (err) {
            return Promise.reject(new Error(`GetTableModified: ${err.message}`));
        }
    }
    static async getSynchroDate(db) {
        try {
            const stmt = `SELECT sync_date FROM sync_table WHERE id = 1;`;
            const res = await UtilsSQLite.queryAll(db, stmt, []);
            return Promise.resolve(res[0]["sync_date"]);
        }
        catch (err) {
            const msg = `GetSynchroDate: ${err.message}`;
            return Promise.reject(new Error(msg));
        }
    }
    static async getLastExportDate(db) {
        try {
            const stmt = `SELECT sync_date FROM sync_table WHERE id = 2;`;
            const res = await UtilsSQLite.queryAll(db, stmt, []);
            if (res.length === 0) {
                return Promise.resolve(-1);
            }
            else {
                return Promise.resolve(res[0]["sync_date"]);
            }
        }
        catch (err) {
            const msg = `getLastExport: ${err.message}`;
            return Promise.reject(new Error(msg));
        }
    }
    static async setLastExportDate(db, lastExportedDate) {
        try {
            const isTable = await UtilsSQLite.isTableExists(db, 'sync_table');
            if (!isTable) {
                return Promise.reject(new Error('setLastExportDate: No sync_table available'));
            }
            const sDate = Math.round(new Date(lastExportedDate).getTime() / 1000);
            let stmt = "";
            if (await UtilsExportJSON.getLastExportDate(db) > 0) {
                stmt = `UPDATE sync_table SET sync_date = ${sDate} WHERE id = 2;`;
            }
            else {
                stmt = `INSERT INTO sync_table (sync_date) VALUES (${sDate});`;
            }
            const changes = await UtilsSQLite.execute(db, stmt, false);
            if (changes < 0) {
                return { result: false, message: 'setLastExportDate failed' };
            }
            else {
                return { result: true };
            }
        }
        catch (err) {
            return { result: false, message: `setLastExportDate failed: ${err.message}` };
        }
    }
    static async delExportedRows(db) {
        let lastExportDate;
        try {
            // check if synchronization table exists
            const isTable = await UtilsSQLite.isTableExists(db, 'sync_table');
            if (!isTable) {
                return Promise.reject(new Error('DelExportedRows: No sync_table available'));
            }
            // get the last export date
            lastExportDate = await UtilsExportJSON.getLastExportDate(db);
            if (lastExportDate < 0) {
                return Promise.reject(new Error("DelExportedRows: no last exported date available"));
            }
            // get the table' name list
            const resTables = await UtilsSQLite.getTableList(db);
            if (resTables.length === 0) {
                return Promise.reject(new Error("DelExportedRows: No table's names returned"));
            }
            // Loop through the tables
            for (const table of resTables) {
                let lastId = -1;
                // define the delete statement
                const delStmt = `DELETE FROM ${table}
              WHERE sql_deleted = 1 AND last_modified < ${lastExportDate};`;
                lastId = await UtilsSQLite.run(db, delStmt, [], true, 'no');
                if (lastId < 0) {
                    return Promise.reject(new Error('DelExportedRows: lastId < 0'));
                }
            }
        }
        catch (err) {
            return Promise.reject(new Error(`DelExportedRows failed: ${err.message}`));
        }
    }
    static async modEmbeddedParentheses(sstr) {
        const oParArray = UtilsExportJSON.indexOfChar(sstr, '(');
        const cParArray = UtilsExportJSON.indexOfChar(sstr, ')');
        if (oParArray.length != cParArray.length) {
            return Promise.reject("ModEmbeddedParentheses: Not same number of '(' & ')'");
        }
        if (oParArray.length === 0) {
            return Promise.resolve(sstr);
        }
        let resStmt = sstr.substring(0, oParArray[0] - 1);
        for (let i = 0; i < oParArray.length; i++) {
            let str;
            if (i < oParArray.length - 1) {
                if (oParArray[i + 1] < cParArray[i]) {
                    str = sstr.substring(oParArray[i] - 1, cParArray[i + 1]);
                    i++;
                }
                else {
                    str = sstr.substring(oParArray[i] - 1, cParArray[i]);
                }
            }
            else {
                str = sstr.substring(oParArray[i] - 1, cParArray[i]);
            }
            const newS = str.replace(/,/g, "§");
            resStmt += newS;
            if (i < oParArray.length - 1) {
                resStmt += sstr.substring(cParArray[i], oParArray[i + 1] - 1);
            }
        }
        resStmt += sstr.substring(cParArray[cParArray.length - 1], sstr.length);
        return Promise.resolve(resStmt);
    }
    static indexOfChar(str, char) {
        let tmpArr = [...str];
        char = char.toLowerCase();
        return tmpArr.reduce((results, elem, idx) => elem.toLowerCase() === char ? [...results, idx] : results, []);
    }
}

class UtilsUpgrade {
    static async onUpgrade(mDB, vUpgDict, curVersion, targetVersion) {
        let changes = -1;
        const sortedKeys = new Int32Array(Object.keys(vUpgDict)
            .map(item => parseInt(item)))
            .sort();
        for (const versionKey of sortedKeys) {
            if (versionKey > curVersion && versionKey <= targetVersion) {
                const statements = vUpgDict[versionKey].statements;
                if (statements.length === 0) {
                    return Promise.reject('onUpgrade: statements not given');
                }
                try {
                    // set Foreign Keys Off
                    await UtilsSQLite.setForeignKeyConstraintsEnabled(mDB.mDb, false);
                    const initChanges = await UtilsSQLite.dbChanges(mDB.mDb);
                    await UtilsUpgrade.executeStatementsProcess(mDB, statements);
                    await UtilsSQLite.setVersion(mDB.mDb, versionKey);
                    // set Foreign Keys On
                    await UtilsSQLite.setForeignKeyConstraintsEnabled(mDB.mDb, true);
                    changes = (await UtilsSQLite.dbChanges(mDB.mDb)) - initChanges;
                }
                catch (err) {
                    return Promise.reject(new Error(`onUpgrade: ${err.message}`));
                }
            }
        }
        return Promise.resolve(changes);
    }
    ;
    static async executeStatementsProcess(mDB, statements) {
        try {
            await UtilsSQLite.beginTransaction(mDB.mDb, true);
            mDB.setIsTransActive(true);
            for (const statement of statements) {
                await UtilsSQLite.execute(mDB.mDb, statement, false);
            }
            await UtilsSQLite.commitTransaction(mDB.mDb, true);
            mDB.setIsTransActive(false);
            return Promise.resolve();
        }
        catch (err) {
            await UtilsSQLite.rollbackTransaction(mDB.mDb, true);
            mDB.setIsTransActive(false);
            return Promise.reject(`ExecuteStatementProcess: ${err}`);
        }
    }
}

class Database {
    constructor(databaseName, version, upgDict, store, autoSave, wasmPath) {
        this.vUpgDict = {};
        this.autoSave = false;
        this.wasmPath = '/assets';
        this.isBackup = false;
        this.isTransactionActive = false;
        this.dbName = databaseName;
        this.store = store;
        this.version = version;
        this.mDb = null;
        this.vUpgDict = upgDict;
        this._isDBOpen = false;
        this.autoSave = autoSave;
        this.wasmPath = wasmPath;
    }
    async open() {
        const config = {
            locateFile: (file) => `${this.wasmPath}/${file}`
        };
        return new Promise((resolve, reject) => {
            try {
                sqlWasm(config).then(async (SQL) => {
                    // retrieve the database if stored on localforage
                    const retDB = await UtilsStore.getDBFromStore(this.dbName, this.store);
                    if (retDB != null) {
                        // Open existing database
                        this.mDb = new SQL.Database(retDB);
                    }
                    else {
                        // Create a new database
                        this.mDb = new SQL.Database();
                        await UtilsStore.setInitialDBToStore(this.dbName, this.store);
                    }
                    this._isDBOpen = true;
                    // get the current version
                    let curVersion = await UtilsSQLite.getVersion(this.mDb);
                    if (this.version > curVersion && (Object.keys(this.vUpgDict)).length > 0) {
                        try {
                            // copy the db
                            const isDB = await UtilsStore.isDBInStore(this.dbName, this.store);
                            if (isDB) {
                                await UtilsStore.copyDBToStore(this.dbName, `backup-${this.dbName}`, this.store);
                                this.isBackup = true;
                            }
                            // execute the upgrade flow process
                            const changes = await UtilsUpgrade.onUpgrade(this, this.vUpgDict, curVersion, this.version);
                            if (changes === -1) {
                                // restore the database from backup
                                try {
                                    if (this.isBackup) {
                                        await UtilsStore.restoreDBFromStore(this.dbName, 'backup', this.store);
                                    }
                                }
                                catch (err) {
                                    const msg = err.message ? err.message : err;
                                    return reject(new Error(`Open: ${msg}`));
                                }
                            }
                            // delete the backup database
                            if (this.isBackup) {
                                await UtilsStore.removeDBFromStore(`backup-${this.dbName}`, this.store);
                            }
                        }
                        catch (err) {
                            // restore the database from backup
                            try {
                                if (this.isBackup) {
                                    await UtilsStore.restoreDBFromStore(this.dbName, 'backup', this.store);
                                }
                            }
                            catch (err) {
                                const msg = err.message ? err.message : err;
                                return reject(new Error(`Open: ${msg}`));
                            }
                        }
                    }
                    if (this.autoSave) {
                        try {
                            await this.saveToStore();
                        }
                        catch (err) {
                            this._isDBOpen = false;
                            const msg = err.message ? err.message : err;
                            return reject(new Error(`Open: ${msg}`));
                        }
                    }
                    // set Foreign Keys On
                    await UtilsSQLite.setForeignKeyConstraintsEnabled(this.mDb, true);
                    return resolve();
                });
            }
            catch (err) {
                this._isDBOpen = false;
                const msg = err.message ? err.message : err;
                return reject(new Error(`Open: ${msg}`));
            }
        });
    }
    isDBOpen() {
        return this._isDBOpen;
    }
    async close() {
        if (this.mDb != null && this._isDBOpen) {
            try {
                // save the database to store
                await this.saveToStore(false);
                // close the database
                this.mDb.close();
                this._isDBOpen = false;
            }
            catch (err) {
                this._isDBOpen = false;
                const msg = err.message ? err.message : err;
                return Promise.reject(new Error(`in close ${msg}`));
            }
        }
        return Promise.resolve();
    }
    async saveToStore(setFK = true) {
        if (this.mDb != null && this._isDBOpen) {
            try {
                // save the database to store
                await UtilsStore.setDBToStore(this.mDb, this.dbName, this.store);
                if (setFK) {
                    // set Foreign Keys On
                    await UtilsSQLite.setForeignKeyConstraintsEnabled(this.mDb, true);
                }
            }
            catch (err) {
                const msg = err.message ? err.message : err;
                return Promise.reject(new Error(`in saveToStore ${msg}`));
            }
        }
        return Promise.resolve();
    }
    async exportDB() {
        // export the database
        try {
            const data = this.mDb.export();
            return data;
        }
        catch (err) {
            const msg = err.message ? err.message : err;
            return Promise.reject(new Error(`exportDB: ${msg}`));
        }
    }
    async getVersion() {
        if (this.mDb != null && this._isDBOpen) {
            try {
                // save the database to store
                const curVersion = await UtilsSQLite.getVersion(this.mDb);
                return Promise.resolve(curVersion);
            }
            catch (err) {
                this._isDBOpen = false;
                const msg = err.message ? err.message : err;
                return Promise.reject(new Error(`in getVersion ${msg}`));
            }
        }
    }
    async isDBExists(database) {
        try {
            const isExists = await UtilsStore.isDBInStore(database, this.store);
            return Promise.resolve(isExists);
        }
        catch (err) {
            const msg = err.message ? err.message : err;
            return Promise.reject(new Error(`in isDBExists ${msg}`));
        }
    }
    async deleteDB(database) {
        try {
            // test if file exists
            const isExists = await this.isDBExists(database);
            if (isExists && !this._isDBOpen) {
                // open the database
                await this.open();
            }
            // close the database
            await this.close();
            // delete the database
            if (isExists) {
                await UtilsStore.removeDBFromStore(database, this.store);
            }
            return Promise.resolve();
        }
        catch (err) {
            const msg = err.message ? err.message : err;
            return Promise.reject(new Error(`DeleteDB: ${msg}`));
        }
    }
    async beginTransaction() {
        if (!this._isDBOpen) {
            let msg = `BeginTransaction: Database ${this.dbName} `;
            msg += `not opened`;
            return Promise.reject(new Error(msg));
        }
        try {
            await UtilsSQLite.beginTransaction(this.mDb, true);
            this.setIsTransActive(true);
            return 0;
        }
        catch (err) {
            let msg = `BeginTransaction: ${err.message ? err.message : err}`;
            return Promise.reject(new Error(`${msg}`));
        }
    }
    async commitTransaction() {
        if (!this._isDBOpen) {
            let msg = `CommitTransaction: Database ${this.dbName} `;
            msg += `not opened`;
            return Promise.reject(new Error(msg));
        }
        try {
            await UtilsSQLite.commitTransaction(this.mDb, true);
            this.setIsTransActive(false);
            return 0;
        }
        catch (err) {
            let msg = `CommitTransaction: ${err.message ? err.message : err}`;
            return Promise.reject(new Error(`${msg}`));
        }
    }
    async rollbackTransaction() {
        if (!this._isDBOpen) {
            let msg = `RollbackTransaction: Database ${this.dbName} `;
            msg += `not opened`;
            return Promise.reject(new Error(msg));
        }
        try {
            await UtilsSQLite.rollbackTransaction(this.mDb, true);
            this.setIsTransActive(false);
            return 0;
        }
        catch (err) {
            let msg = `RollbackTransaction: ${err.message ? err.message : err}`;
            return Promise.reject(new Error(`${msg}`));
        }
    }
    isTransActive() {
        return this.isTransactionActive;
    }
    setIsTransActive(value) {
        this.isTransactionActive = value;
    }
    async executeSQL(sql, transaction = true) {
        if (!this._isDBOpen) {
            let msg = `ExecuteSQL: Database ${this.dbName} `;
            msg += `not opened`;
            return Promise.reject(new Error(msg));
        }
        let initChanges = -1;
        try {
            initChanges = await UtilsSQLite.dbChanges(this.mDb);
            if (transaction && !this.isTransactionActive) {
                await this.beginTransaction();
            }
        }
        catch (err) {
            let msg = `executeSQL: ${err.message ? err.message : err}`;
            return Promise.reject(new Error(`${msg}`));
        }
        try {
            const mChanges = await UtilsSQLite.execute(this.mDb, sql, false);
            if (mChanges < 0) {
                return Promise.reject(new Error('ExecuteSQL: changes < 0'));
            }
            if (transaction && this.isTransactionActive) {
                await this.commitTransaction();
            }
            const changes = (await UtilsSQLite.dbChanges(this.mDb)) - initChanges;
            return Promise.resolve(changes);
        }
        catch (err) {
            let msg = `ExecuteSQL: ${err.message ? err.message : err}`;
            try {
                if (transaction && this.isTransactionActive)
                    await this.rollbackTransaction();
            }
            catch (err) {
                msg += ` : ${err.message ? err.message : err}`;
            }
            return Promise.reject(new Error(`ExecuteSQL: ${msg}`));
        }
        finally {
            if (transaction)
                this.isTransactionActive = false;
            if (this.autoSave && !this.isTransactionActive) {
                try {
                    await this.saveToStore();
                }
                catch (err) {
                    this._isDBOpen = false;
                    const msg = err.message ? err.message : err;
                    return Promise.reject(`ExecuteSQL: ${msg}`);
                }
            }
        }
    }
    async execSet(set, transaction = true, returnMode = 'no') {
        if (!this._isDBOpen) {
            let msg = `ExecSet: Database ${this.dbName} `;
            msg += `not opened`;
            return Promise.reject(new Error(msg));
        }
        const retRes = { changes: -1, lastId: -1 };
        let initChanges = -1;
        try {
            initChanges = await UtilsSQLite.dbChanges(this.mDb);
            if (transaction && !this.isTransactionActive) {
                await this.beginTransaction();
            }
        }
        catch (err) {
            const msge = err.message ? err.message : err;
            let msg = `ExecSet: ${msge}`;
            return Promise.reject(new Error(`${msg}`));
        }
        try {
            const retObj = await UtilsSQLite.executeSet(this.mDb, set, false, returnMode);
            let lastId = retObj["lastId"];
            if (lastId < 0) {
                //return Promise.reject(new Error('ExecSet: changes < 0'));
            }
            if (transaction && this.isTransactionActive)
                await this.commitTransaction();
            const changes = (await UtilsSQLite.dbChanges(this.mDb)) - initChanges;
            retRes.changes = changes;
            retRes.lastId = lastId;
            retRes.values = retObj["values"] ? retObj["values"] : [];
            return Promise.resolve(retRes);
        }
        catch (err) {
            const msge = err.message ? err.message : err;
            let msg = `ExecSet: ${msge}`;
            try {
                if (transaction && this.isTransactionActive)
                    await this.rollbackTransaction();
            }
            catch (err) {
                msg += ` : ${err.message ? err.message : err}`;
            }
            return Promise.reject(new Error(`ExecSet: ${msg}`));
        }
        finally {
            if (transaction)
                this.isTransactionActive = false;
            if (this.autoSave && !this.isTransactionActive) {
                try {
                    await this.saveToStore();
                }
                catch (err) {
                    const msg = err.message ? err.message : err;
                    this._isDBOpen = false;
                    return Promise.reject(`ExecSet: ${msg}`);
                }
            }
        }
    }
    async selectSQL(sql, values) {
        if (!this._isDBOpen) {
            let msg = `SelectSQL: Database ${this.dbName} `;
            msg += `not opened`;
            return Promise.reject(new Error(msg));
        }
        try {
            let retArr = await UtilsSQLite.queryAll(this.mDb, sql, values);
            return Promise.resolve(retArr);
        }
        catch (err) {
            const msg = err.message ? err.message : err;
            return Promise.reject(new Error(`SelectSQL: ${msg}`));
        }
    }
    async runSQL(statement, values, transaction = true, returnMode) {
        let lastId = -1;
        if (!this._isDBOpen) {
            let msg = `RunSQL: Database ${this.dbName} `;
            msg += `not opened`;
            return Promise.reject(new Error(msg));
        }
        const retRes = { changes: -1, lastId: -1 };
        let initChanges = -1;
        try {
            initChanges = await UtilsSQLite.dbChanges(this.mDb);
            if (transaction && !this.isTransactionActive) {
                await this.beginTransaction();
            }
        }
        catch (err) {
            const msge = err.message ? err.message : err;
            let msg = `RunSQL: ${msge}`;
            return Promise.reject(new Error(`${msg}`));
        }
        try {
            const retObj = await UtilsSQLite.run(this.mDb, statement, values, false, returnMode);
            lastId = retObj["lastId"];
            if (lastId < 0) {
                return Promise.reject(new Error('RunSQL: lastId < 0'));
            }
            if (transaction && this.isTransactionActive) {
                await this.commitTransaction();
            }
            const changes = (await UtilsSQLite.dbChanges(this.mDb)) - initChanges;
            retRes.changes = changes;
            retRes.lastId = lastId;
            retRes.values = retObj["values"] ? retObj["values"] : [];
            return Promise.resolve(retRes);
        }
        catch (err) {
            const msge = err.message ? err.message : err;
            let msg = `RunSQL: ${msge}`;
            try {
                if (transaction && this.isTransactionActive) {
                    await this.rollbackTransaction();
                }
            }
            catch (err) {
                msg += ` : ${err.message ? err.message : err}`;
            }
            return Promise.reject(new Error(`${msg}`));
        }
        finally {
            if (transaction)
                this.setIsTransActive(false);
            if (this.autoSave && !this.isTransactionActive) {
                try {
                    await this.saveToStore();
                }
                catch (err) {
                    this._isDBOpen = false;
                    const msg = err.message ? err.message : err;
                    return Promise.reject(`ExecSet: ${msg}`);
                }
            }
        }
    }
    async getTableNames() {
        if (!this._isDBOpen) {
            let msg = `GetTableNames: Database ${this.dbName} `;
            msg += `not opened`;
            return Promise.reject(new Error(msg));
        }
        try {
            let retArr = await UtilsSQLite.getTableList(this.mDb);
            return Promise.resolve(retArr);
        }
        catch (err) {
            const msg = err.message ? err.message : err;
            return Promise.reject(new Error(`GetTableNames: ${msg}`));
        }
    }
    async isTable(tableName) {
        if (!this._isDBOpen) {
            let msg = `isTable: Database ${this.dbName} `;
            msg += `not opened`;
            return Promise.reject(new Error(msg));
        }
        try {
            const retB = await UtilsSQLite.isTableExists(this.mDb, tableName);
            return Promise.resolve(retB);
        }
        catch (err) {
            const msg = `IsTable: ${err.message ? err.message : err}`;
            return Promise.reject(new Error(msg));
        }
    }
    async createSyncTable() {
        if (!this._isDBOpen) {
            let msg = `createSyncTable: Database ${this.dbName} `;
            msg += `not opened`;
            return Promise.reject(new Error(msg));
        }
        let changes = -1;
        try {
            const retB = await UtilsSQLite.isTableExists(this.mDb, 'sync_table');
            if (!retB) {
                const isLastMod = await UtilsSQLite.isLastModified(this.mDb, this._isDBOpen);
                const isDel = await UtilsSQLite.isSqlDeleted(this.mDb, this._isDBOpen);
                if (isLastMod && isDel) {
                    const date = Math.round(new Date().getTime() / 1000);
                    let stmts = `
                          CREATE TABLE IF NOT EXISTS sync_table (
                              id INTEGER PRIMARY KEY NOT NULL,
                              sync_date INTEGER
                              );`;
                    stmts += `INSERT INTO sync_table (sync_date) VALUES (
                              "${date}");`;
                    changes = await UtilsSQLite.execute(this.mDb, stmts, false);
                    return Promise.resolve(changes);
                }
                else {
                    return Promise.reject(new Error('No last_modified/sql_deleted columns in tables'));
                }
            }
            else {
                return Promise.resolve(0);
            }
        }
        catch (err) {
            const msge = err.message ? err.message : err;
            const msg = `CreateSyncTable: ${msge}`;
            return Promise.reject(new Error(msg));
        }
    }
    async getSyncDate() {
        if (!this._isDBOpen) {
            let msg = `getSyncDate: Database ${this.dbName} `;
            msg += `not opened`;
            return Promise.reject(new Error(msg));
        }
        try {
            const isTable = await UtilsSQLite.isTableExists(this.mDb, 'sync_table');
            if (!isTable) {
                return Promise.reject(new Error('No sync_table available'));
            }
            const res = await UtilsExportJSON.getSynchroDate(this.mDb);
            return Promise.resolve(res);
        }
        catch (err) {
            const msge = err.message ? err.message : err;
            const msg = `getSyncDate: ${msge}`;
            return Promise.reject(new Error(msg));
        }
    }
    async setSyncDate(syncDate) {
        if (!this._isDBOpen) {
            let msg = `SetSyncDate: Database ${this.dbName} `;
            msg += `not opened`;
            return { result: false, message: msg };
        }
        try {
            const isTable = await UtilsSQLite.isTableExists(this.mDb, 'sync_table');
            if (!isTable) {
                return Promise.reject(new Error('No sync_table available'));
            }
            const sDate = Math.round(new Date(syncDate).getTime() / 1000);
            let stmt = `UPDATE sync_table SET sync_date = `;
            stmt += `${sDate} WHERE id = 1;`;
            const changes = await UtilsSQLite.execute(this.mDb, stmt, false);
            if (changes < 0) {
                return { result: false, message: 'setSyncDate failed' };
            }
            else {
                return { result: true };
            }
        }
        catch (err) {
            const msg = err.message ? err.message : err;
            return { result: false, message: `setSyncDate failed: ${msg}` };
        }
    }
    async importJson(jsonData, importProgress) {
        let changes = 0;
        if (this._isDBOpen) {
            try {
                // set Foreign Keys Off
                await UtilsSQLite.setForeignKeyConstraintsEnabled(this.mDb, false);
                if (jsonData.tables && jsonData.tables.length > 0) {
                    // create the database schema
                    changes = await UtilsImportJSON.createDatabaseSchema(this, jsonData);
                    let msg = `Schema creation completed changes: ${changes}`;
                    importProgress.emit({ progress: msg });
                    if (changes != -1) {
                        // create the tables data
                        changes += await UtilsImportJSON.createTablesData(this, jsonData, importProgress);
                        let msg = `Tables data creation completed changes: ${changes}`;
                        importProgress.emit({ progress: msg });
                    }
                }
                if (jsonData.views && jsonData.views.length > 0) {
                    // create the views
                    changes += await UtilsImportJSON.createViews(this, jsonData);
                }
                // set Foreign Keys On
                await UtilsSQLite.setForeignKeyConstraintsEnabled(this.mDb, true);
                await this.saveToStore();
                return Promise.resolve(changes);
            }
            catch (err) {
                const msg = err.message ? err.message : err;
                return Promise.reject(new Error(`ImportJson: ${msg}`));
            }
        }
        else {
            return Promise.reject(new Error(`ImportJson: database is closed`));
        }
    }
    async exportJson(mode, exportProgress) {
        const inJson = {};
        inJson.database = this.dbName.slice(0, -9);
        inJson.version = this.version;
        inJson.encrypted = false;
        inJson.mode = mode;
        if (this._isDBOpen) {
            try {
                const isTable = await UtilsSQLite.isTableExists(this.mDb, 'sync_table');
                if (isTable) {
                    await UtilsExportJSON
                        .setLastExportDate(this.mDb, (new Date()).toISOString());
                }
                else {
                    if (inJson.mode !== 'full') {
                        const msg = `No sync_table available for partial mode`;
                        return Promise.reject(new Error(msg));
                    }
                }
                const retJson = await UtilsExportJSON
                    .createExportObject(this.mDb, inJson, exportProgress);
                const keys = Object.keys(retJson);
                if (keys.length === 0) {
                    const msg = `ExportJson: return Object is empty ` +
                        `No data to synchronize`;
                    return Promise.reject(new Error(msg));
                }
                const isValid = UtilsJSON.isJsonSQLite(retJson);
                if (isValid) {
                    return Promise.resolve(retJson);
                }
                else {
                    return Promise.reject(new Error(`ExportJson: retJson not valid`));
                }
            }
            catch (err) {
                const msg = err.message ? err.message : err;
                return Promise.reject(new Error(`ExportJson: ${msg}`));
            }
        }
        else {
            return Promise.reject(new Error(`ExportJson: database is closed`));
        }
    }
    async deleteExportedRows() {
        if (this._isDBOpen) {
            try {
                await UtilsExportJSON.delExportedRows(this.mDb);
                return Promise.resolve();
            }
            catch (err) {
                const msg = err.message ? err.message : err;
                return Promise.reject(new Error(`deleteExportedRows: ${msg}`));
            }
        }
        else {
            return Promise.reject(new Error(`deleteExportedRows: database is closed`));
        }
    }
}

var localforage = createCommonjsModule(function (module, exports) {
/*!
    localForage -- Offline Storage, Improved
    Version 1.10.0
    https://localforage.github.io/localForage
    (c) 2013-2017 Mozilla, Apache License 2.0
*/
(function(f){if('object'==="object"&&'object'!=="undefined"){module.exports=f();}else if(typeof undefined==="function"&&undefined.amd){undefined([],f);}else {var g;if(typeof window!=="undefined"){g=window;}else if(typeof commonjsGlobal!=="undefined"){g=commonjsGlobal;}else if(typeof self!=="undefined"){g=self;}else {g=this;}g.localforage = f();}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof commonjsRequire=="function"&&commonjsRequire;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw (f.code="MODULE_NOT_FOUND", f)}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r);}return n[o].exports}var i=typeof commonjsRequire=="function"&&commonjsRequire;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function (global){
'use strict';
var Mutation = global.MutationObserver || global.WebKitMutationObserver;

var scheduleDrain;

{
  if (Mutation) {
    var called = 0;
    var observer = new Mutation(nextTick);
    var element = global.document.createTextNode('');
    observer.observe(element, {
      characterData: true
    });
    scheduleDrain = function () {
      element.data = (called = ++called % 2);
    };
  } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {
    var channel = new global.MessageChannel();
    channel.port1.onmessage = nextTick;
    scheduleDrain = function () {
      channel.port2.postMessage(0);
    };
  } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {
    scheduleDrain = function () {

      // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
      // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
      var scriptEl = global.document.createElement('script');
      scriptEl.onreadystatechange = function () {
        nextTick();

        scriptEl.onreadystatechange = null;
        scriptEl.parentNode.removeChild(scriptEl);
        scriptEl = null;
      };
      global.document.documentElement.appendChild(scriptEl);
    };
  } else {
    scheduleDrain = function () {
      setTimeout(nextTick, 0);
    };
  }
}

var draining;
var queue = [];
//named nextTick for less confusing stack traces
function nextTick() {
  draining = true;
  var i, oldQueue;
  var len = queue.length;
  while (len) {
    oldQueue = queue;
    queue = [];
    i = -1;
    while (++i < len) {
      oldQueue[i]();
    }
    len = queue.length;
  }
  draining = false;
}

module.exports = immediate;
function immediate(task) {
  if (queue.push(task) === 1 && !draining) {
    scheduleDrain();
  }
}

}).call(this,typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
},{}],2:[function(_dereq_,module,exports){
'use strict';
var immediate = _dereq_(1);

/* istanbul ignore next */
function INTERNAL() {}

var handlers = {};

var REJECTED = ['REJECTED'];
var FULFILLED = ['FULFILLED'];
var PENDING = ['PENDING'];

module.exports = Promise;

function Promise(resolver) {
  if (typeof resolver !== 'function') {
    throw new TypeError('resolver must be a function');
  }
  this.state = PENDING;
  this.queue = [];
  this.outcome = void 0;
  if (resolver !== INTERNAL) {
    safelyResolveThenable(this, resolver);
  }
}

Promise.prototype["catch"] = function (onRejected) {
  return this.then(null, onRejected);
};
Promise.prototype.then = function (onFulfilled, onRejected) {
  if (typeof onFulfilled !== 'function' && this.state === FULFILLED ||
    typeof onRejected !== 'function' && this.state === REJECTED) {
    return this;
  }
  var promise = new this.constructor(INTERNAL);
  if (this.state !== PENDING) {
    var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
    unwrap(promise, resolver, this.outcome);
  } else {
    this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
  }

  return promise;
};
function QueueItem(promise, onFulfilled, onRejected) {
  this.promise = promise;
  if (typeof onFulfilled === 'function') {
    this.onFulfilled = onFulfilled;
    this.callFulfilled = this.otherCallFulfilled;
  }
  if (typeof onRejected === 'function') {
    this.onRejected = onRejected;
    this.callRejected = this.otherCallRejected;
  }
}
QueueItem.prototype.callFulfilled = function (value) {
  handlers.resolve(this.promise, value);
};
QueueItem.prototype.otherCallFulfilled = function (value) {
  unwrap(this.promise, this.onFulfilled, value);
};
QueueItem.prototype.callRejected = function (value) {
  handlers.reject(this.promise, value);
};
QueueItem.prototype.otherCallRejected = function (value) {
  unwrap(this.promise, this.onRejected, value);
};

function unwrap(promise, func, value) {
  immediate(function () {
    var returnValue;
    try {
      returnValue = func(value);
    } catch (e) {
      return handlers.reject(promise, e);
    }
    if (returnValue === promise) {
      handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
    } else {
      handlers.resolve(promise, returnValue);
    }
  });
}

handlers.resolve = function (self, value) {
  var result = tryCatch(getThen, value);
  if (result.status === 'error') {
    return handlers.reject(self, result.value);
  }
  var thenable = result.value;

  if (thenable) {
    safelyResolveThenable(self, thenable);
  } else {
    self.state = FULFILLED;
    self.outcome = value;
    var i = -1;
    var len = self.queue.length;
    while (++i < len) {
      self.queue[i].callFulfilled(value);
    }
  }
  return self;
};
handlers.reject = function (self, error) {
  self.state = REJECTED;
  self.outcome = error;
  var i = -1;
  var len = self.queue.length;
  while (++i < len) {
    self.queue[i].callRejected(error);
  }
  return self;
};

function getThen(obj) {
  // Make sure we only access the accessor once as required by the spec
  var then = obj && obj.then;
  if (obj && (typeof obj === 'object' || typeof obj === 'function') && typeof then === 'function') {
    return function appyThen() {
      then.apply(obj, arguments);
    };
  }
}

function safelyResolveThenable(self, thenable) {
  // Either fulfill, reject or reject with error
  var called = false;
  function onError(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.reject(self, value);
  }

  function onSuccess(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.resolve(self, value);
  }

  function tryToUnwrap() {
    thenable(onSuccess, onError);
  }

  var result = tryCatch(tryToUnwrap);
  if (result.status === 'error') {
    onError(result.value);
  }
}

function tryCatch(func, value) {
  var out = {};
  try {
    out.value = func(value);
    out.status = 'success';
  } catch (e) {
    out.status = 'error';
    out.value = e;
  }
  return out;
}

Promise.resolve = resolve;
function resolve(value) {
  if (value instanceof this) {
    return value;
  }
  return handlers.resolve(new this(INTERNAL), value);
}

Promise.reject = reject;
function reject(reason) {
  var promise = new this(INTERNAL);
  return handlers.reject(promise, reason);
}

Promise.all = all;
function all(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var values = new Array(len);
  var resolved = 0;
  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    allResolver(iterable[i], i);
  }
  return promise;
  function allResolver(value, i) {
    self.resolve(value).then(resolveFromAll, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
    function resolveFromAll(outValue) {
      values[i] = outValue;
      if (++resolved === len && !called) {
        called = true;
        handlers.resolve(promise, values);
      }
    }
  }
}

Promise.race = race;
function race(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    resolver(iterable[i]);
  }
  return promise;
  function resolver(value) {
    self.resolve(value).then(function (response) {
      if (!called) {
        called = true;
        handlers.resolve(promise, response);
      }
    }, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
  }
}

},{"1":1}],3:[function(_dereq_,module,exports){
(function (global){
'use strict';
if (typeof global.Promise !== 'function') {
  global.Promise = _dereq_(2);
}

}).call(this,typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
},{"2":2}],4:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getIDB() {
    /* global indexedDB,webkitIndexedDB,mozIndexedDB,OIndexedDB,msIndexedDB */
    try {
        if (typeof indexedDB !== 'undefined') {
            return indexedDB;
        }
        if (typeof webkitIndexedDB !== 'undefined') {
            return webkitIndexedDB;
        }
        if (typeof mozIndexedDB !== 'undefined') {
            return mozIndexedDB;
        }
        if (typeof OIndexedDB !== 'undefined') {
            return OIndexedDB;
        }
        if (typeof msIndexedDB !== 'undefined') {
            return msIndexedDB;
        }
    } catch (e) {
        return;
    }
}

var idb = getIDB();

function isIndexedDBValid() {
    try {
        // Initialize IndexedDB; fall back to vendor-prefixed versions
        // if needed.
        if (!idb || !idb.open) {
            return false;
        }
        // We mimic PouchDB here;
        //
        // We test for openDatabase because IE Mobile identifies itself
        // as Safari. Oh the lulz...
        var isSafari = typeof openDatabase !== 'undefined' && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);

        var hasFetch = typeof fetch === 'function' && fetch.toString().indexOf('[native code') !== -1;

        // Safari <10.1 does not meet our requirements for IDB support
        // (see: https://github.com/pouchdb/pouchdb/issues/5572).
        // Safari 10.1 shipped with fetch, we can use that to detect it.
        // Note: this creates issues with `window.fetch` polyfills and
        // overrides; see:
        // https://github.com/localForage/localForage/issues/856
        return (!isSafari || hasFetch) && typeof indexedDB !== 'undefined' &&
        // some outdated implementations of IDB that appear on Samsung
        // and HTC Android devices <4.4 are missing IDBKeyRange
        // See: https://github.com/mozilla/localForage/issues/128
        // See: https://github.com/mozilla/localForage/issues/272
        typeof IDBKeyRange !== 'undefined';
    } catch (e) {
        return false;
    }
}

// Abstracts constructing a Blob object, so it also works in older
// browsers that don't support the native Blob constructor. (i.e.
// old QtWebKit versions, at least).
// Abstracts constructing a Blob object, so it also works in older
// browsers that don't support the native Blob constructor. (i.e.
// old QtWebKit versions, at least).
function createBlob(parts, properties) {
    /* global BlobBuilder,MSBlobBuilder,MozBlobBuilder,WebKitBlobBuilder */
    parts = parts || [];
    properties = properties || {};
    try {
        return new Blob(parts, properties);
    } catch (e) {
        if (e.name !== 'TypeError') {
            throw e;
        }
        var Builder = typeof BlobBuilder !== 'undefined' ? BlobBuilder : typeof MSBlobBuilder !== 'undefined' ? MSBlobBuilder : typeof MozBlobBuilder !== 'undefined' ? MozBlobBuilder : WebKitBlobBuilder;
        var builder = new Builder();
        for (var i = 0; i < parts.length; i += 1) {
            builder.append(parts[i]);
        }
        return builder.getBlob(properties.type);
    }
}

// This is CommonJS because lie is an external dependency, so Rollup
// can just ignore it.
if (typeof Promise === 'undefined') {
    // In the "nopromises" build this will just throw if you don't have
    // a global promise object, but it would throw anyway later.
    _dereq_(3);
}
var Promise$1 = Promise;

function executeCallback(promise, callback) {
    if (callback) {
        promise.then(function (result) {
            callback(null, result);
        }, function (error) {
            callback(error);
        });
    }
}

function executeTwoCallbacks(promise, callback, errorCallback) {
    if (typeof callback === 'function') {
        promise.then(callback);
    }

    if (typeof errorCallback === 'function') {
        promise["catch"](errorCallback);
    }
}

function normalizeKey(key) {
    // Cast the key to a string, as that's all we can set as a key.
    if (typeof key !== 'string') {
        console.warn(key + ' used as a key, but it is not a string.');
        key = String(key);
    }

    return key;
}

function getCallback() {
    if (arguments.length && typeof arguments[arguments.length - 1] === 'function') {
        return arguments[arguments.length - 1];
    }
}

// Some code originally from async_storage.js in
// [Gaia](https://github.com/mozilla-b2g/gaia).

var DETECT_BLOB_SUPPORT_STORE = 'local-forage-detect-blob-support';
var supportsBlobs = void 0;
var dbContexts = {};
var toString = Object.prototype.toString;

// Transaction Modes
var READ_ONLY = 'readonly';
var READ_WRITE = 'readwrite';

// Transform a binary string to an array buffer, because otherwise
// weird stuff happens when you try to work with the binary string directly.
// It is known.
// From http://stackoverflow.com/questions/14967647/ (continues on next line)
// encode-decode-image-with-base64-breaks-image (2013-04-21)
function _binStringToArrayBuffer(bin) {
    var length = bin.length;
    var buf = new ArrayBuffer(length);
    var arr = new Uint8Array(buf);
    for (var i = 0; i < length; i++) {
        arr[i] = bin.charCodeAt(i);
    }
    return buf;
}

//
// Blobs are not supported in all versions of IndexedDB, notably
// Chrome <37 and Android <5. In those versions, storing a blob will throw.
//
// Various other blob bugs exist in Chrome v37-42 (inclusive).
// Detecting them is expensive and confusing to users, and Chrome 37-42
// is at very low usage worldwide, so we do a hacky userAgent check instead.
//
// content-type bug: https://code.google.com/p/chromium/issues/detail?id=408120
// 404 bug: https://code.google.com/p/chromium/issues/detail?id=447916
// FileReader bug: https://code.google.com/p/chromium/issues/detail?id=447836
//
// Code borrowed from PouchDB. See:
// https://github.com/pouchdb/pouchdb/blob/master/packages/node_modules/pouchdb-adapter-idb/src/blobSupport.js
//
function _checkBlobSupportWithoutCaching(idb) {
    return new Promise$1(function (resolve) {
        var txn = idb.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);
        var blob = createBlob(['']);
        txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, 'key');

        txn.onabort = function (e) {
            // If the transaction aborts now its due to not being able to
            // write to the database, likely due to the disk being full
            e.preventDefault();
            e.stopPropagation();
            resolve(false);
        };

        txn.oncomplete = function () {
            var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
            var matchedEdge = navigator.userAgent.match(/Edge\//);
            // MS Edge pretends to be Chrome 42:
            // https://msdn.microsoft.com/en-us/library/hh869301%28v=vs.85%29.aspx
            resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
        };
    })["catch"](function () {
        return false; // error, so assume unsupported
    });
}

function _checkBlobSupport(idb) {
    if (typeof supportsBlobs === 'boolean') {
        return Promise$1.resolve(supportsBlobs);
    }
    return _checkBlobSupportWithoutCaching(idb).then(function (value) {
        supportsBlobs = value;
        return supportsBlobs;
    });
}

function _deferReadiness(dbInfo) {
    var dbContext = dbContexts[dbInfo.name];

    // Create a deferred object representing the current database operation.
    var deferredOperation = {};

    deferredOperation.promise = new Promise$1(function (resolve, reject) {
        deferredOperation.resolve = resolve;
        deferredOperation.reject = reject;
    });

    // Enqueue the deferred operation.
    dbContext.deferredOperations.push(deferredOperation);

    // Chain its promise to the database readiness.
    if (!dbContext.dbReady) {
        dbContext.dbReady = deferredOperation.promise;
    } else {
        dbContext.dbReady = dbContext.dbReady.then(function () {
            return deferredOperation.promise;
        });
    }
}

function _advanceReadiness(dbInfo) {
    var dbContext = dbContexts[dbInfo.name];

    // Dequeue a deferred operation.
    var deferredOperation = dbContext.deferredOperations.pop();

    // Resolve its promise (which is part of the database readiness
    // chain of promises).
    if (deferredOperation) {
        deferredOperation.resolve();
        return deferredOperation.promise;
    }
}

function _rejectReadiness(dbInfo, err) {
    var dbContext = dbContexts[dbInfo.name];

    // Dequeue a deferred operation.
    var deferredOperation = dbContext.deferredOperations.pop();

    // Reject its promise (which is part of the database readiness
    // chain of promises).
    if (deferredOperation) {
        deferredOperation.reject(err);
        return deferredOperation.promise;
    }
}

function _getConnection(dbInfo, upgradeNeeded) {
    return new Promise$1(function (resolve, reject) {
        dbContexts[dbInfo.name] = dbContexts[dbInfo.name] || createDbContext();

        if (dbInfo.db) {
            if (upgradeNeeded) {
                _deferReadiness(dbInfo);
                dbInfo.db.close();
            } else {
                return resolve(dbInfo.db);
            }
        }

        var dbArgs = [dbInfo.name];

        if (upgradeNeeded) {
            dbArgs.push(dbInfo.version);
        }

        var openreq = idb.open.apply(idb, dbArgs);

        if (upgradeNeeded) {
            openreq.onupgradeneeded = function (e) {
                var db = openreq.result;
                try {
                    db.createObjectStore(dbInfo.storeName);
                    if (e.oldVersion <= 1) {
                        // Added when support for blob shims was added
                        db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
                    }
                } catch (ex) {
                    if (ex.name === 'ConstraintError') {
                        console.warn('The database "' + dbInfo.name + '"' + ' has been upgraded from version ' + e.oldVersion + ' to version ' + e.newVersion + ', but the storage "' + dbInfo.storeName + '" already exists.');
                    } else {
                        throw ex;
                    }
                }
            };
        }

        openreq.onerror = function (e) {
            e.preventDefault();
            reject(openreq.error);
        };

        openreq.onsuccess = function () {
            var db = openreq.result;
            db.onversionchange = function (e) {
                // Triggered when the database is modified (e.g. adding an objectStore) or
                // deleted (even when initiated by other sessions in different tabs).
                // Closing the connection here prevents those operations from being blocked.
                // If the database is accessed again later by this instance, the connection
                // will be reopened or the database recreated as needed.
                e.target.close();
            };
            resolve(db);
            _advanceReadiness(dbInfo);
        };
    });
}

function _getOriginalConnection(dbInfo) {
    return _getConnection(dbInfo, false);
}

function _getUpgradedConnection(dbInfo) {
    return _getConnection(dbInfo, true);
}

function _isUpgradeNeeded(dbInfo, defaultVersion) {
    if (!dbInfo.db) {
        return true;
    }

    var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
    var isDowngrade = dbInfo.version < dbInfo.db.version;
    var isUpgrade = dbInfo.version > dbInfo.db.version;

    if (isDowngrade) {
        // If the version is not the default one
        // then warn for impossible downgrade.
        if (dbInfo.version !== defaultVersion) {
            console.warn('The database "' + dbInfo.name + '"' + " can't be downgraded from version " + dbInfo.db.version + ' to version ' + dbInfo.version + '.');
        }
        // Align the versions to prevent errors.
        dbInfo.version = dbInfo.db.version;
    }

    if (isUpgrade || isNewStore) {
        // If the store is new then increment the version (if needed).
        // This will trigger an "upgradeneeded" event which is required
        // for creating a store.
        if (isNewStore) {
            var incVersion = dbInfo.db.version + 1;
            if (incVersion > dbInfo.version) {
                dbInfo.version = incVersion;
            }
        }

        return true;
    }

    return false;
}

// encode a blob for indexeddb engines that don't support blobs
function _encodeBlob(blob) {
    return new Promise$1(function (resolve, reject) {
        var reader = new FileReader();
        reader.onerror = reject;
        reader.onloadend = function (e) {
            var base64 = btoa(e.target.result || '');
            resolve({
                __local_forage_encoded_blob: true,
                data: base64,
                type: blob.type
            });
        };
        reader.readAsBinaryString(blob);
    });
}

// decode an encoded blob
function _decodeBlob(encodedBlob) {
    var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));
    return createBlob([arrayBuff], { type: encodedBlob.type });
}

// is this one of our fancy encoded blobs?
function _isEncodedBlob(value) {
    return value && value.__local_forage_encoded_blob;
}

// Specialize the default `ready()` function by making it dependent
// on the current database operations. Thus, the driver will be actually
// ready when it's been initialized (default) *and* there are no pending
// operations on the database (initiated by some other instances).
function _fullyReady(callback) {
    var self = this;

    var promise = self._initReady().then(function () {
        var dbContext = dbContexts[self._dbInfo.name];

        if (dbContext && dbContext.dbReady) {
            return dbContext.dbReady;
        }
    });

    executeTwoCallbacks(promise, callback, callback);
    return promise;
}

// Try to establish a new db connection to replace the
// current one which is broken (i.e. experiencing
// InvalidStateError while creating a transaction).
function _tryReconnect(dbInfo) {
    _deferReadiness(dbInfo);

    var dbContext = dbContexts[dbInfo.name];
    var forages = dbContext.forages;

    for (var i = 0; i < forages.length; i++) {
        var forage = forages[i];
        if (forage._dbInfo.db) {
            forage._dbInfo.db.close();
            forage._dbInfo.db = null;
        }
    }
    dbInfo.db = null;

    return _getOriginalConnection(dbInfo).then(function (db) {
        dbInfo.db = db;
        if (_isUpgradeNeeded(dbInfo)) {
            // Reopen the database for upgrading.
            return _getUpgradedConnection(dbInfo);
        }
        return db;
    }).then(function (db) {
        // store the latest db reference
        // in case the db was upgraded
        dbInfo.db = dbContext.db = db;
        for (var i = 0; i < forages.length; i++) {
            forages[i]._dbInfo.db = db;
        }
    })["catch"](function (err) {
        _rejectReadiness(dbInfo, err);
        throw err;
    });
}

// FF doesn't like Promises (micro-tasks) and IDDB store operations,
// so we have to do it with callbacks
function createTransaction(dbInfo, mode, callback, retries) {
    if (retries === undefined) {
        retries = 1;
    }

    try {
        var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
        callback(null, tx);
    } catch (err) {
        if (retries > 0 && (!dbInfo.db || err.name === 'InvalidStateError' || err.name === 'NotFoundError')) {
            return Promise$1.resolve().then(function () {
                if (!dbInfo.db || err.name === 'NotFoundError' && !dbInfo.db.objectStoreNames.contains(dbInfo.storeName) && dbInfo.version <= dbInfo.db.version) {
                    // increase the db version, to create the new ObjectStore
                    if (dbInfo.db) {
                        dbInfo.version = dbInfo.db.version + 1;
                    }
                    // Reopen the database for upgrading.
                    return _getUpgradedConnection(dbInfo);
                }
            }).then(function () {
                return _tryReconnect(dbInfo).then(function () {
                    createTransaction(dbInfo, mode, callback, retries - 1);
                });
            })["catch"](callback);
        }

        callback(err);
    }
}

function createDbContext() {
    return {
        // Running localForages sharing a database.
        forages: [],
        // Shared database.
        db: null,
        // Database readiness (promise).
        dbReady: null,
        // Deferred operations on the database.
        deferredOperations: []
    };
}

// Open the IndexedDB database (automatically creates one if one didn't
// previously exist), using any options set in the config.
function _initStorage(options) {
    var self = this;
    var dbInfo = {
        db: null
    };

    if (options) {
        for (var i in options) {
            dbInfo[i] = options[i];
        }
    }

    // Get the current context of the database;
    var dbContext = dbContexts[dbInfo.name];

    // ...or create a new context.
    if (!dbContext) {
        dbContext = createDbContext();
        // Register the new context in the global container.
        dbContexts[dbInfo.name] = dbContext;
    }

    // Register itself as a running localForage in the current context.
    dbContext.forages.push(self);

    // Replace the default `ready()` function with the specialized one.
    if (!self._initReady) {
        self._initReady = self.ready;
        self.ready = _fullyReady;
    }

    // Create an array of initialization states of the related localForages.
    var initPromises = [];

    function ignoreErrors() {
        // Don't handle errors here,
        // just makes sure related localForages aren't pending.
        return Promise$1.resolve();
    }

    for (var j = 0; j < dbContext.forages.length; j++) {
        var forage = dbContext.forages[j];
        if (forage !== self) {
            // Don't wait for itself...
            initPromises.push(forage._initReady()["catch"](ignoreErrors));
        }
    }

    // Take a snapshot of the related localForages.
    var forages = dbContext.forages.slice(0);

    // Initialize the connection process only when
    // all the related localForages aren't pending.
    return Promise$1.all(initPromises).then(function () {
        dbInfo.db = dbContext.db;
        // Get the connection or open a new one without upgrade.
        return _getOriginalConnection(dbInfo);
    }).then(function (db) {
        dbInfo.db = db;
        if (_isUpgradeNeeded(dbInfo, self._defaultConfig.version)) {
            // Reopen the database for upgrading.
            return _getUpgradedConnection(dbInfo);
        }
        return db;
    }).then(function (db) {
        dbInfo.db = dbContext.db = db;
        self._dbInfo = dbInfo;
        // Share the final connection amongst related localForages.
        for (var k = 0; k < forages.length; k++) {
            var forage = forages[k];
            if (forage !== self) {
                // Self is already up-to-date.
                forage._dbInfo.db = dbInfo.db;
                forage._dbInfo.version = dbInfo.version;
            }
        }
    });
}

function getItem(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.get(key);

                    req.onsuccess = function () {
                        var value = req.result;
                        if (value === undefined) {
                            value = null;
                        }
                        if (_isEncodedBlob(value)) {
                            value = _decodeBlob(value);
                        }
                        resolve(value);
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Iterate over all items stored in database.
function iterate(iterator, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.openCursor();
                    var iterationNumber = 1;

                    req.onsuccess = function () {
                        var cursor = req.result;

                        if (cursor) {
                            var value = cursor.value;
                            if (_isEncodedBlob(value)) {
                                value = _decodeBlob(value);
                            }
                            var result = iterator(value, cursor.key, iterationNumber++);

                            // when the iterator callback returns any
                            // (non-`undefined`) value, then we stop
                            // the iteration immediately
                            if (result !== void 0) {
                                resolve(result);
                            } else {
                                cursor["continue"]();
                            }
                        } else {
                            resolve();
                        }
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);

    return promise;
}

function setItem(key, value, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        var dbInfo;
        self.ready().then(function () {
            dbInfo = self._dbInfo;
            if (toString.call(value) === '[object Blob]') {
                return _checkBlobSupport(dbInfo.db).then(function (blobSupport) {
                    if (blobSupport) {
                        return value;
                    }
                    return _encodeBlob(value);
                });
            }
            return value;
        }).then(function (value) {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);

                    // The reason we don't _save_ null is because IE 10 does
                    // not support saving the `null` type in IndexedDB. How
                    // ironic, given the bug below!
                    // See: https://github.com/mozilla/localForage/issues/161
                    if (value === null) {
                        value = undefined;
                    }

                    var req = store.put(value, key);

                    transaction.oncomplete = function () {
                        // Cast to undefined so the value passed to
                        // callback/promise is the same as what one would get out
                        // of `getItem()` later. This leads to some weirdness
                        // (setItem('foo', undefined) will return `null`), but
                        // it's not my fault localStorage is our baseline and that
                        // it's weird.
                        if (value === undefined) {
                            value = null;
                        }

                        resolve(value);
                    };
                    transaction.onabort = transaction.onerror = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function removeItem(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    // We use a Grunt task to make this safe for IE and some
                    // versions of Android (including those used by Cordova).
                    // Normally IE won't like `.delete()` and will insist on
                    // using `['delete']()`, but we have a build step that
                    // fixes this for us now.
                    var req = store["delete"](key);
                    transaction.oncomplete = function () {
                        resolve();
                    };

                    transaction.onerror = function () {
                        reject(req.error);
                    };

                    // The request will be also be aborted if we've exceeded our storage
                    // space.
                    transaction.onabort = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function clear(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.clear();

                    transaction.oncomplete = function () {
                        resolve();
                    };

                    transaction.onabort = transaction.onerror = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function length(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.count();

                    req.onsuccess = function () {
                        resolve(req.result);
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function key(n, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        if (n < 0) {
            resolve(null);

            return;
        }

        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var advanced = false;
                    var req = store.openKeyCursor();

                    req.onsuccess = function () {
                        var cursor = req.result;
                        if (!cursor) {
                            // this means there weren't enough keys
                            resolve(null);

                            return;
                        }

                        if (n === 0) {
                            // We have the first key, return it if that's what they
                            // wanted.
                            resolve(cursor.key);
                        } else {
                            if (!advanced) {
                                // Otherwise, ask the cursor to skip ahead n
                                // records.
                                advanced = true;
                                cursor.advance(n);
                            } else {
                                // When we get here, we've got the nth key.
                                resolve(cursor.key);
                            }
                        }
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function keys(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.openKeyCursor();
                    var keys = [];

                    req.onsuccess = function () {
                        var cursor = req.result;

                        if (!cursor) {
                            resolve(keys);
                            return;
                        }

                        keys.push(cursor.key);
                        cursor["continue"]();
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function dropInstance(options, callback) {
    callback = getCallback.apply(this, arguments);

    var currentConfig = this.config();
    options = typeof options !== 'function' && options || {};
    if (!options.name) {
        options.name = options.name || currentConfig.name;
        options.storeName = options.storeName || currentConfig.storeName;
    }

    var self = this;
    var promise;
    if (!options.name) {
        promise = Promise$1.reject('Invalid arguments');
    } else {
        var isCurrentDb = options.name === currentConfig.name && self._dbInfo.db;

        var dbPromise = isCurrentDb ? Promise$1.resolve(self._dbInfo.db) : _getOriginalConnection(options).then(function (db) {
            var dbContext = dbContexts[options.name];
            var forages = dbContext.forages;
            dbContext.db = db;
            for (var i = 0; i < forages.length; i++) {
                forages[i]._dbInfo.db = db;
            }
            return db;
        });

        if (!options.storeName) {
            promise = dbPromise.then(function (db) {
                _deferReadiness(options);

                var dbContext = dbContexts[options.name];
                var forages = dbContext.forages;

                db.close();
                for (var i = 0; i < forages.length; i++) {
                    var forage = forages[i];
                    forage._dbInfo.db = null;
                }

                var dropDBPromise = new Promise$1(function (resolve, reject) {
                    var req = idb.deleteDatabase(options.name);

                    req.onerror = function () {
                        var db = req.result;
                        if (db) {
                            db.close();
                        }
                        reject(req.error);
                    };

                    req.onblocked = function () {
                        // Closing all open connections in onversionchange handler should prevent this situation, but if
                        // we do get here, it just means the request remains pending - eventually it will succeed or error
                        console.warn('dropInstance blocked for database "' + options.name + '" until all open connections are closed');
                    };

                    req.onsuccess = function () {
                        var db = req.result;
                        if (db) {
                            db.close();
                        }
                        resolve(db);
                    };
                });

                return dropDBPromise.then(function (db) {
                    dbContext.db = db;
                    for (var i = 0; i < forages.length; i++) {
                        var _forage = forages[i];
                        _advanceReadiness(_forage._dbInfo);
                    }
                })["catch"](function (err) {
                    (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
                    throw err;
                });
            });
        } else {
            promise = dbPromise.then(function (db) {
                if (!db.objectStoreNames.contains(options.storeName)) {
                    return;
                }

                var newVersion = db.version + 1;

                _deferReadiness(options);

                var dbContext = dbContexts[options.name];
                var forages = dbContext.forages;

                db.close();
                for (var i = 0; i < forages.length; i++) {
                    var forage = forages[i];
                    forage._dbInfo.db = null;
                    forage._dbInfo.version = newVersion;
                }

                var dropObjectPromise = new Promise$1(function (resolve, reject) {
                    var req = idb.open(options.name, newVersion);

                    req.onerror = function (err) {
                        var db = req.result;
                        db.close();
                        reject(err);
                    };

                    req.onupgradeneeded = function () {
                        var db = req.result;
                        db.deleteObjectStore(options.storeName);
                    };

                    req.onsuccess = function () {
                        var db = req.result;
                        db.close();
                        resolve(db);
                    };
                });

                return dropObjectPromise.then(function (db) {
                    dbContext.db = db;
                    for (var j = 0; j < forages.length; j++) {
                        var _forage2 = forages[j];
                        _forage2._dbInfo.db = db;
                        _advanceReadiness(_forage2._dbInfo);
                    }
                })["catch"](function (err) {
                    (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
                    throw err;
                });
            });
        }
    }

    executeCallback(promise, callback);
    return promise;
}

var asyncStorage = {
    _driver: 'asyncStorage',
    _initStorage: _initStorage,
    _support: isIndexedDBValid(),
    iterate: iterate,
    getItem: getItem,
    setItem: setItem,
    removeItem: removeItem,
    clear: clear,
    length: length,
    key: key,
    keys: keys,
    dropInstance: dropInstance
};

function isWebSQLValid() {
    return typeof openDatabase === 'function';
}

// Sadly, the best way to save binary data in WebSQL/localStorage is serializing
// it to Base64, so this is how we store it to prevent very strange errors with less
// verbose ways of binary <-> string data storage.
var BASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

var BLOB_TYPE_PREFIX = '~~local_forage_type~';
var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;

var SERIALIZED_MARKER = '__lfsc__:';
var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;

// OMG the serializations!
var TYPE_ARRAYBUFFER = 'arbf';
var TYPE_BLOB = 'blob';
var TYPE_INT8ARRAY = 'si08';
var TYPE_UINT8ARRAY = 'ui08';
var TYPE_UINT8CLAMPEDARRAY = 'uic8';
var TYPE_INT16ARRAY = 'si16';
var TYPE_INT32ARRAY = 'si32';
var TYPE_UINT16ARRAY = 'ur16';
var TYPE_UINT32ARRAY = 'ui32';
var TYPE_FLOAT32ARRAY = 'fl32';
var TYPE_FLOAT64ARRAY = 'fl64';
var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;

var toString$1 = Object.prototype.toString;

function stringToBuffer(serializedString) {
    // Fill the string into a ArrayBuffer.
    var bufferLength = serializedString.length * 0.75;
    var len = serializedString.length;
    var i;
    var p = 0;
    var encoded1, encoded2, encoded3, encoded4;

    if (serializedString[serializedString.length - 1] === '=') {
        bufferLength--;
        if (serializedString[serializedString.length - 2] === '=') {
            bufferLength--;
        }
    }

    var buffer = new ArrayBuffer(bufferLength);
    var bytes = new Uint8Array(buffer);

    for (i = 0; i < len; i += 4) {
        encoded1 = BASE_CHARS.indexOf(serializedString[i]);
        encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);
        encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);
        encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);

        /*jslint bitwise: true */
        bytes[p++] = encoded1 << 2 | encoded2 >> 4;
        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
    }
    return buffer;
}

// Converts a buffer to a string to store, serialized, in the backend
// storage library.
function bufferToString(buffer) {
    // base64-arraybuffer
    var bytes = new Uint8Array(buffer);
    var base64String = '';
    var i;

    for (i = 0; i < bytes.length; i += 3) {
        /*jslint bitwise: true */
        base64String += BASE_CHARS[bytes[i] >> 2];
        base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
        base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
        base64String += BASE_CHARS[bytes[i + 2] & 63];
    }

    if (bytes.length % 3 === 2) {
        base64String = base64String.substring(0, base64String.length - 1) + '=';
    } else if (bytes.length % 3 === 1) {
        base64String = base64String.substring(0, base64String.length - 2) + '==';
    }

    return base64String;
}

// Serialize a value, afterwards executing a callback (which usually
// instructs the `setItem()` callback/promise to be executed). This is how
// we store binary data with localStorage.
function serialize(value, callback) {
    var valueType = '';
    if (value) {
        valueType = toString$1.call(value);
    }

    // Cannot use `value instanceof ArrayBuffer` or such here, as these
    // checks fail when running the tests using casper.js...
    //
    // TODO: See why those tests fail and use a better solution.
    if (value && (valueType === '[object ArrayBuffer]' || value.buffer && toString$1.call(value.buffer) === '[object ArrayBuffer]')) {
        // Convert binary arrays to a string and prefix the string with
        // a special marker.
        var buffer;
        var marker = SERIALIZED_MARKER;

        if (value instanceof ArrayBuffer) {
            buffer = value;
            marker += TYPE_ARRAYBUFFER;
        } else {
            buffer = value.buffer;

            if (valueType === '[object Int8Array]') {
                marker += TYPE_INT8ARRAY;
            } else if (valueType === '[object Uint8Array]') {
                marker += TYPE_UINT8ARRAY;
            } else if (valueType === '[object Uint8ClampedArray]') {
                marker += TYPE_UINT8CLAMPEDARRAY;
            } else if (valueType === '[object Int16Array]') {
                marker += TYPE_INT16ARRAY;
            } else if (valueType === '[object Uint16Array]') {
                marker += TYPE_UINT16ARRAY;
            } else if (valueType === '[object Int32Array]') {
                marker += TYPE_INT32ARRAY;
            } else if (valueType === '[object Uint32Array]') {
                marker += TYPE_UINT32ARRAY;
            } else if (valueType === '[object Float32Array]') {
                marker += TYPE_FLOAT32ARRAY;
            } else if (valueType === '[object Float64Array]') {
                marker += TYPE_FLOAT64ARRAY;
            } else {
                callback(new Error('Failed to get type for BinaryArray'));
            }
        }

        callback(marker + bufferToString(buffer));
    } else if (valueType === '[object Blob]') {
        // Conver the blob to a binaryArray and then to a string.
        var fileReader = new FileReader();

        fileReader.onload = function () {
            // Backwards-compatible prefix for the blob type.
            var str = BLOB_TYPE_PREFIX + value.type + '~' + bufferToString(this.result);

            callback(SERIALIZED_MARKER + TYPE_BLOB + str);
        };

        fileReader.readAsArrayBuffer(value);
    } else {
        try {
            callback(JSON.stringify(value));
        } catch (e) {
            console.error("Couldn't convert value into a JSON string: ", value);

            callback(null, e);
        }
    }
}

// Deserialize data we've inserted into a value column/field. We place
// special markers into our strings to mark them as encoded; this isn't
// as nice as a meta field, but it's the only sane thing we can do whilst
// keeping localStorage support intact.
//
// Oftentimes this will just deserialize JSON content, but if we have a
// special marker (SERIALIZED_MARKER, defined above), we will extract
// some kind of arraybuffer/binary data/typed array out of the string.
function deserialize(value) {
    // If we haven't marked this string as being specially serialized (i.e.
    // something other than serialized JSON), we can just return it and be
    // done with it.
    if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
        return JSON.parse(value);
    }

    // The following code deals with deserializing some kind of Blob or
    // TypedArray. First we separate out the type of data we're dealing
    // with from the data itself.
    var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
    var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);

    var blobType;
    // Backwards-compatible blob type serialization strategy.
    // DBs created with older versions of localForage will simply not have the blob type.
    if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
        var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
        blobType = matcher[1];
        serializedString = serializedString.substring(matcher[0].length);
    }
    var buffer = stringToBuffer(serializedString);

    // Return the right type based on the code/type set during
    // serialization.
    switch (type) {
        case TYPE_ARRAYBUFFER:
            return buffer;
        case TYPE_BLOB:
            return createBlob([buffer], { type: blobType });
        case TYPE_INT8ARRAY:
            return new Int8Array(buffer);
        case TYPE_UINT8ARRAY:
            return new Uint8Array(buffer);
        case TYPE_UINT8CLAMPEDARRAY:
            return new Uint8ClampedArray(buffer);
        case TYPE_INT16ARRAY:
            return new Int16Array(buffer);
        case TYPE_UINT16ARRAY:
            return new Uint16Array(buffer);
        case TYPE_INT32ARRAY:
            return new Int32Array(buffer);
        case TYPE_UINT32ARRAY:
            return new Uint32Array(buffer);
        case TYPE_FLOAT32ARRAY:
            return new Float32Array(buffer);
        case TYPE_FLOAT64ARRAY:
            return new Float64Array(buffer);
        default:
            throw new Error('Unkown type: ' + type);
    }
}

var localforageSerializer = {
    serialize: serialize,
    deserialize: deserialize,
    stringToBuffer: stringToBuffer,
    bufferToString: bufferToString
};

/*
 * Includes code from:
 *
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */

function createDbTable(t, dbInfo, callback, errorCallback) {
    t.executeSql('CREATE TABLE IF NOT EXISTS ' + dbInfo.storeName + ' ' + '(id INTEGER PRIMARY KEY, key unique, value)', [], callback, errorCallback);
}

// Open the WebSQL database (automatically creates one if one didn't
// previously exist), using any options set in the config.
function _initStorage$1(options) {
    var self = this;
    var dbInfo = {
        db: null
    };

    if (options) {
        for (var i in options) {
            dbInfo[i] = typeof options[i] !== 'string' ? options[i].toString() : options[i];
        }
    }

    var dbInfoPromise = new Promise$1(function (resolve, reject) {
        // Open the database; the openDatabase API will automatically
        // create it for us if it doesn't exist.
        try {
            dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
        } catch (e) {
            return reject(e);
        }

        // Create our key/value table if it doesn't exist.
        dbInfo.db.transaction(function (t) {
            createDbTable(t, dbInfo, function () {
                self._dbInfo = dbInfo;
                resolve();
            }, function (t, error) {
                reject(error);
            });
        }, reject);
    });

    dbInfo.serializer = localforageSerializer;
    return dbInfoPromise;
}

function tryExecuteSql(t, dbInfo, sqlStatement, args, callback, errorCallback) {
    t.executeSql(sqlStatement, args, callback, function (t, error) {
        if (error.code === error.SYNTAX_ERR) {
            t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name = ?", [dbInfo.storeName], function (t, results) {
                if (!results.rows.length) {
                    // if the table is missing (was deleted)
                    // re-create it table and retry
                    createDbTable(t, dbInfo, function () {
                        t.executeSql(sqlStatement, args, callback, errorCallback);
                    }, errorCallback);
                } else {
                    errorCallback(t, error);
                }
            }, errorCallback);
        } else {
            errorCallback(t, error);
        }
    }, errorCallback);
}

function getItem$1(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName + ' WHERE key = ? LIMIT 1', [key], function (t, results) {
                    var result = results.rows.length ? results.rows.item(0).value : null;

                    // Check to see if this is serialized content we need to
                    // unpack.
                    if (result) {
                        result = dbInfo.serializer.deserialize(result);
                    }

                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function iterate$1(iterator, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;

            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName, [], function (t, results) {
                    var rows = results.rows;
                    var length = rows.length;

                    for (var i = 0; i < length; i++) {
                        var item = rows.item(i);
                        var result = item.value;

                        // Check to see if this is serialized content
                        // we need to unpack.
                        if (result) {
                            result = dbInfo.serializer.deserialize(result);
                        }

                        result = iterator(result, item.key, i + 1);

                        // void(0) prevents problems with redefinition
                        // of `undefined`.
                        if (result !== void 0) {
                            resolve(result);
                            return;
                        }
                    }

                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function _setItem(key, value, callback, retriesLeft) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            // The localStorage API doesn't return undefined values in an
            // "expected" way, so undefined is always cast to null in all
            // drivers. See: https://github.com/mozilla/localForage/pull/42
            if (value === undefined) {
                value = null;
            }

            // Save the original value to pass to the callback.
            var originalValue = value;

            var dbInfo = self._dbInfo;
            dbInfo.serializer.serialize(value, function (value, error) {
                if (error) {
                    reject(error);
                } else {
                    dbInfo.db.transaction(function (t) {
                        tryExecuteSql(t, dbInfo, 'INSERT OR REPLACE INTO ' + dbInfo.storeName + ' ' + '(key, value) VALUES (?, ?)', [key, value], function () {
                            resolve(originalValue);
                        }, function (t, error) {
                            reject(error);
                        });
                    }, function (sqlError) {
                        // The transaction failed; check
                        // to see if it's a quota error.
                        if (sqlError.code === sqlError.QUOTA_ERR) {
                            // We reject the callback outright for now, but
                            // it's worth trying to re-run the transaction.
                            // Even if the user accepts the prompt to use
                            // more storage on Safari, this error will
                            // be called.
                            //
                            // Try to re-run the transaction.
                            if (retriesLeft > 0) {
                                resolve(_setItem.apply(self, [key, originalValue, callback, retriesLeft - 1]));
                                return;
                            }
                            reject(sqlError);
                        }
                    });
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function setItem$1(key, value, callback) {
    return _setItem.apply(this, [key, value, callback, 1]);
}

function removeItem$1(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName + ' WHERE key = ?', [key], function () {
                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Deletes every item in the table.
// TODO: Find out if this resets the AUTO_INCREMENT number.
function clear$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName, [], function () {
                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Does a simple `COUNT(key)` to get the number of items stored in
// localForage.
function length$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                // Ahhh, SQL makes this one soooooo easy.
                tryExecuteSql(t, dbInfo, 'SELECT COUNT(key) as c FROM ' + dbInfo.storeName, [], function (t, results) {
                    var result = results.rows.item(0).c;
                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Return the key located at key index X; essentially gets the key from a
// `WHERE id = ?`. This is the most efficient way I can think to implement
// this rarely-used (in my experience) part of the API, but it can seem
// inconsistent, because we do `INSERT OR REPLACE INTO` on `setItem()`, so
// the ID of each key will change every time it's updated. Perhaps a stored
// procedure for the `setItem()` SQL would solve this problem?
// TODO: Don't change ID on `setItem()`.
function key$1(n, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName + ' WHERE id = ? LIMIT 1', [n + 1], function (t, results) {
                    var result = results.rows.length ? results.rows.item(0).key : null;
                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function keys$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName, [], function (t, results) {
                    var keys = [];

                    for (var i = 0; i < results.rows.length; i++) {
                        keys.push(results.rows.item(i).key);
                    }

                    resolve(keys);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// https://www.w3.org/TR/webdatabase/#databases
// > There is no way to enumerate or delete the databases available for an origin from this API.
function getAllStoreNames(db) {
    return new Promise$1(function (resolve, reject) {
        db.transaction(function (t) {
            t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function (t, results) {
                var storeNames = [];

                for (var i = 0; i < results.rows.length; i++) {
                    storeNames.push(results.rows.item(i).name);
                }

                resolve({
                    db: db,
                    storeNames: storeNames
                });
            }, function (t, error) {
                reject(error);
            });
        }, function (sqlError) {
            reject(sqlError);
        });
    });
}

function dropInstance$1(options, callback) {
    callback = getCallback.apply(this, arguments);

    var currentConfig = this.config();
    options = typeof options !== 'function' && options || {};
    if (!options.name) {
        options.name = options.name || currentConfig.name;
        options.storeName = options.storeName || currentConfig.storeName;
    }

    var self = this;
    var promise;
    if (!options.name) {
        promise = Promise$1.reject('Invalid arguments');
    } else {
        promise = new Promise$1(function (resolve) {
            var db;
            if (options.name === currentConfig.name) {
                // use the db reference of the current instance
                db = self._dbInfo.db;
            } else {
                db = openDatabase(options.name, '', '', 0);
            }

            if (!options.storeName) {
                // drop all database tables
                resolve(getAllStoreNames(db));
            } else {
                resolve({
                    db: db,
                    storeNames: [options.storeName]
                });
            }
        }).then(function (operationInfo) {
            return new Promise$1(function (resolve, reject) {
                operationInfo.db.transaction(function (t) {
                    function dropTable(storeName) {
                        return new Promise$1(function (resolve, reject) {
                            t.executeSql('DROP TABLE IF EXISTS ' + storeName, [], function () {
                                resolve();
                            }, function (t, error) {
                                reject(error);
                            });
                        });
                    }

                    var operations = [];
                    for (var i = 0, len = operationInfo.storeNames.length; i < len; i++) {
                        operations.push(dropTable(operationInfo.storeNames[i]));
                    }

                    Promise$1.all(operations).then(function () {
                        resolve();
                    })["catch"](function (e) {
                        reject(e);
                    });
                }, function (sqlError) {
                    reject(sqlError);
                });
            });
        });
    }

    executeCallback(promise, callback);
    return promise;
}

var webSQLStorage = {
    _driver: 'webSQLStorage',
    _initStorage: _initStorage$1,
    _support: isWebSQLValid(),
    iterate: iterate$1,
    getItem: getItem$1,
    setItem: setItem$1,
    removeItem: removeItem$1,
    clear: clear$1,
    length: length$1,
    key: key$1,
    keys: keys$1,
    dropInstance: dropInstance$1
};

function isLocalStorageValid() {
    try {
        return typeof localStorage !== 'undefined' && 'setItem' in localStorage &&
        // in IE8 typeof localStorage.setItem === 'object'
        !!localStorage.setItem;
    } catch (e) {
        return false;
    }
}

function _getKeyPrefix(options, defaultConfig) {
    var keyPrefix = options.name + '/';

    if (options.storeName !== defaultConfig.storeName) {
        keyPrefix += options.storeName + '/';
    }
    return keyPrefix;
}

// Check if localStorage throws when saving an item
function checkIfLocalStorageThrows() {
    var localStorageTestKey = '_localforage_support_test';

    try {
        localStorage.setItem(localStorageTestKey, true);
        localStorage.removeItem(localStorageTestKey);

        return false;
    } catch (e) {
        return true;
    }
}

// Check if localStorage is usable and allows to save an item
// This method checks if localStorage is usable in Safari Private Browsing
// mode, or in any other case where the available quota for localStorage
// is 0 and there wasn't any saved items yet.
function _isLocalStorageUsable() {
    return !checkIfLocalStorageThrows() || localStorage.length > 0;
}

// Config the localStorage backend, using options set in the config.
function _initStorage$2(options) {
    var self = this;
    var dbInfo = {};
    if (options) {
        for (var i in options) {
            dbInfo[i] = options[i];
        }
    }

    dbInfo.keyPrefix = _getKeyPrefix(options, self._defaultConfig);

    if (!_isLocalStorageUsable()) {
        return Promise$1.reject();
    }

    self._dbInfo = dbInfo;
    dbInfo.serializer = localforageSerializer;

    return Promise$1.resolve();
}

// Remove all keys from the datastore, effectively destroying all data in
// the app's key/value store!
function clear$2(callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var keyPrefix = self._dbInfo.keyPrefix;

        for (var i = localStorage.length - 1; i >= 0; i--) {
            var key = localStorage.key(i);

            if (key.indexOf(keyPrefix) === 0) {
                localStorage.removeItem(key);
            }
        }
    });

    executeCallback(promise, callback);
    return promise;
}

// Retrieve an item from the store. Unlike the original async_storage
// library in Gaia, we don't modify return values at all. If a key's value
// is `undefined`, we pass that value to the callback function.
function getItem$2(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var result = localStorage.getItem(dbInfo.keyPrefix + key);

        // If a result was found, parse it from the serialized
        // string into a JS object. If result isn't truthy, the key
        // is likely undefined and we'll pass it straight to the
        // callback.
        if (result) {
            result = dbInfo.serializer.deserialize(result);
        }

        return result;
    });

    executeCallback(promise, callback);
    return promise;
}

// Iterate over all items in the store.
function iterate$2(iterator, callback) {
    var self = this;

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var keyPrefix = dbInfo.keyPrefix;
        var keyPrefixLength = keyPrefix.length;
        var length = localStorage.length;

        // We use a dedicated iterator instead of the `i` variable below
        // so other keys we fetch in localStorage aren't counted in
        // the `iterationNumber` argument passed to the `iterate()`
        // callback.
        //
        // See: github.com/mozilla/localForage/pull/435#discussion_r38061530
        var iterationNumber = 1;

        for (var i = 0; i < length; i++) {
            var key = localStorage.key(i);
            if (key.indexOf(keyPrefix) !== 0) {
                continue;
            }
            var value = localStorage.getItem(key);

            // If a result was found, parse it from the serialized
            // string into a JS object. If result isn't truthy, the
            // key is likely undefined and we'll pass it straight
            // to the iterator.
            if (value) {
                value = dbInfo.serializer.deserialize(value);
            }

            value = iterator(value, key.substring(keyPrefixLength), iterationNumber++);

            if (value !== void 0) {
                return value;
            }
        }
    });

    executeCallback(promise, callback);
    return promise;
}

// Same as localStorage's key() method, except takes a callback.
function key$2(n, callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var result;
        try {
            result = localStorage.key(n);
        } catch (error) {
            result = null;
        }

        // Remove the prefix from the key, if a key is found.
        if (result) {
            result = result.substring(dbInfo.keyPrefix.length);
        }

        return result;
    });

    executeCallback(promise, callback);
    return promise;
}

function keys$2(callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var length = localStorage.length;
        var keys = [];

        for (var i = 0; i < length; i++) {
            var itemKey = localStorage.key(i);
            if (itemKey.indexOf(dbInfo.keyPrefix) === 0) {
                keys.push(itemKey.substring(dbInfo.keyPrefix.length));
            }
        }

        return keys;
    });

    executeCallback(promise, callback);
    return promise;
}

// Supply the number of keys in the datastore to the callback function.
function length$2(callback) {
    var self = this;
    var promise = self.keys().then(function (keys) {
        return keys.length;
    });

    executeCallback(promise, callback);
    return promise;
}

// Remove an item from the store, nice and simple.
function removeItem$2(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        localStorage.removeItem(dbInfo.keyPrefix + key);
    });

    executeCallback(promise, callback);
    return promise;
}

// Set a key's value and run an optional callback once the value is set.
// Unlike Gaia's implementation, the callback function is passed the value,
// in case you want to operate on that value only after you're sure it
// saved, or something like that.
function setItem$2(key, value, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        // Convert undefined values to null.
        // https://github.com/mozilla/localForage/pull/42
        if (value === undefined) {
            value = null;
        }

        // Save the original value to pass to the callback.
        var originalValue = value;

        return new Promise$1(function (resolve, reject) {
            var dbInfo = self._dbInfo;
            dbInfo.serializer.serialize(value, function (value, error) {
                if (error) {
                    reject(error);
                } else {
                    try {
                        localStorage.setItem(dbInfo.keyPrefix + key, value);
                        resolve(originalValue);
                    } catch (e) {
                        // localStorage capacity exceeded.
                        // TODO: Make this a specific error/event.
                        if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                            reject(e);
                        }
                        reject(e);
                    }
                }
            });
        });
    });

    executeCallback(promise, callback);
    return promise;
}

function dropInstance$2(options, callback) {
    callback = getCallback.apply(this, arguments);

    options = typeof options !== 'function' && options || {};
    if (!options.name) {
        var currentConfig = this.config();
        options.name = options.name || currentConfig.name;
        options.storeName = options.storeName || currentConfig.storeName;
    }

    var self = this;
    var promise;
    if (!options.name) {
        promise = Promise$1.reject('Invalid arguments');
    } else {
        promise = new Promise$1(function (resolve) {
            if (!options.storeName) {
                resolve(options.name + '/');
            } else {
                resolve(_getKeyPrefix(options, self._defaultConfig));
            }
        }).then(function (keyPrefix) {
            for (var i = localStorage.length - 1; i >= 0; i--) {
                var key = localStorage.key(i);

                if (key.indexOf(keyPrefix) === 0) {
                    localStorage.removeItem(key);
                }
            }
        });
    }

    executeCallback(promise, callback);
    return promise;
}

var localStorageWrapper = {
    _driver: 'localStorageWrapper',
    _initStorage: _initStorage$2,
    _support: isLocalStorageValid(),
    iterate: iterate$2,
    getItem: getItem$2,
    setItem: setItem$2,
    removeItem: removeItem$2,
    clear: clear$2,
    length: length$2,
    key: key$2,
    keys: keys$2,
    dropInstance: dropInstance$2
};

var sameValue = function sameValue(x, y) {
    return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
};

var includes = function includes(array, searchElement) {
    var len = array.length;
    var i = 0;
    while (i < len) {
        if (sameValue(array[i], searchElement)) {
            return true;
        }
        i++;
    }

    return false;
};

var isArray = Array.isArray || function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
};

// Drivers are stored here when `defineDriver()` is called.
// They are shared across all instances of localForage.
var DefinedDrivers = {};

var DriverSupport = {};

var DefaultDrivers = {
    INDEXEDDB: asyncStorage,
    WEBSQL: webSQLStorage,
    LOCALSTORAGE: localStorageWrapper
};

var DefaultDriverOrder = [DefaultDrivers.INDEXEDDB._driver, DefaultDrivers.WEBSQL._driver, DefaultDrivers.LOCALSTORAGE._driver];

var OptionalDriverMethods = ['dropInstance'];

var LibraryMethods = ['clear', 'getItem', 'iterate', 'key', 'keys', 'length', 'removeItem', 'setItem'].concat(OptionalDriverMethods);

var DefaultConfig = {
    description: '',
    driver: DefaultDriverOrder.slice(),
    name: 'localforage',
    // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
    // we can use without a prompt.
    size: 4980736,
    storeName: 'keyvaluepairs',
    version: 1.0
};

function callWhenReady(localForageInstance, libraryMethod) {
    localForageInstance[libraryMethod] = function () {
        var _args = arguments;
        return localForageInstance.ready().then(function () {
            return localForageInstance[libraryMethod].apply(localForageInstance, _args);
        });
    };
}

function extend() {
    for (var i = 1; i < arguments.length; i++) {
        var arg = arguments[i];

        if (arg) {
            for (var _key in arg) {
                if (arg.hasOwnProperty(_key)) {
                    if (isArray(arg[_key])) {
                        arguments[0][_key] = arg[_key].slice();
                    } else {
                        arguments[0][_key] = arg[_key];
                    }
                }
            }
        }
    }

    return arguments[0];
}

var LocalForage = function () {
    function LocalForage(options) {
        _classCallCheck(this, LocalForage);

        for (var driverTypeKey in DefaultDrivers) {
            if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
                var driver = DefaultDrivers[driverTypeKey];
                var driverName = driver._driver;
                this[driverTypeKey] = driverName;

                if (!DefinedDrivers[driverName]) {
                    // we don't need to wait for the promise,
                    // since the default drivers can be defined
                    // in a blocking manner
                    this.defineDriver(driver);
                }
            }
        }

        this._defaultConfig = extend({}, DefaultConfig);
        this._config = extend({}, this._defaultConfig, options);
        this._driverSet = null;
        this._initDriver = null;
        this._ready = false;
        this._dbInfo = null;

        this._wrapLibraryMethodsWithReady();
        this.setDriver(this._config.driver)["catch"](function () {});
    }

    // Set any config values for localForage; can be called anytime before
    // the first API call (e.g. `getItem`, `setItem`).
    // We loop through options so we don't overwrite existing config
    // values.


    LocalForage.prototype.config = function config(options) {
        // If the options argument is an object, we use it to set values.
        // Otherwise, we return either a specified config value or all
        // config values.
        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
            // If localforage is ready and fully initialized, we can't set
            // any new configuration values. Instead, we return an error.
            if (this._ready) {
                return new Error("Can't call config() after localforage " + 'has been used.');
            }

            for (var i in options) {
                if (i === 'storeName') {
                    options[i] = options[i].replace(/\W/g, '_');
                }

                if (i === 'version' && typeof options[i] !== 'number') {
                    return new Error('Database version must be a number.');
                }

                this._config[i] = options[i];
            }

            // after all config options are set and
            // the driver option is used, try setting it
            if ('driver' in options && options.driver) {
                return this.setDriver(this._config.driver);
            }

            return true;
        } else if (typeof options === 'string') {
            return this._config[options];
        } else {
            return this._config;
        }
    };

    // Used to define a custom driver, shared across all instances of
    // localForage.


    LocalForage.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
        var promise = new Promise$1(function (resolve, reject) {
            try {
                var driverName = driverObject._driver;
                var complianceError = new Error('Custom driver not compliant; see ' + 'https://mozilla.github.io/localForage/#definedriver');

                // A driver name should be defined and not overlap with the
                // library-defined, default drivers.
                if (!driverObject._driver) {
                    reject(complianceError);
                    return;
                }

                var driverMethods = LibraryMethods.concat('_initStorage');
                for (var i = 0, len = driverMethods.length; i < len; i++) {
                    var driverMethodName = driverMethods[i];

                    // when the property is there,
                    // it should be a method even when optional
                    var isRequired = !includes(OptionalDriverMethods, driverMethodName);
                    if ((isRequired || driverObject[driverMethodName]) && typeof driverObject[driverMethodName] !== 'function') {
                        reject(complianceError);
                        return;
                    }
                }

                var configureMissingMethods = function configureMissingMethods() {
                    var methodNotImplementedFactory = function methodNotImplementedFactory(methodName) {
                        return function () {
                            var error = new Error('Method ' + methodName + ' is not implemented by the current driver');
                            var promise = Promise$1.reject(error);
                            executeCallback(promise, arguments[arguments.length - 1]);
                            return promise;
                        };
                    };

                    for (var _i = 0, _len = OptionalDriverMethods.length; _i < _len; _i++) {
                        var optionalDriverMethod = OptionalDriverMethods[_i];
                        if (!driverObject[optionalDriverMethod]) {
                            driverObject[optionalDriverMethod] = methodNotImplementedFactory(optionalDriverMethod);
                        }
                    }
                };

                configureMissingMethods();

                var setDriverSupport = function setDriverSupport(support) {
                    if (DefinedDrivers[driverName]) {
                        console.info('Redefining LocalForage driver: ' + driverName);
                    }
                    DefinedDrivers[driverName] = driverObject;
                    DriverSupport[driverName] = support;
                    // don't use a then, so that we can define
                    // drivers that have simple _support methods
                    // in a blocking manner
                    resolve();
                };

                if ('_support' in driverObject) {
                    if (driverObject._support && typeof driverObject._support === 'function') {
                        driverObject._support().then(setDriverSupport, reject);
                    } else {
                        setDriverSupport(!!driverObject._support);
                    }
                } else {
                    setDriverSupport(true);
                }
            } catch (e) {
                reject(e);
            }
        });

        executeTwoCallbacks(promise, callback, errorCallback);
        return promise;
    };

    LocalForage.prototype.driver = function driver() {
        return this._driver || null;
    };

    LocalForage.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
        var getDriverPromise = DefinedDrivers[driverName] ? Promise$1.resolve(DefinedDrivers[driverName]) : Promise$1.reject(new Error('Driver not found.'));

        executeTwoCallbacks(getDriverPromise, callback, errorCallback);
        return getDriverPromise;
    };

    LocalForage.prototype.getSerializer = function getSerializer(callback) {
        var serializerPromise = Promise$1.resolve(localforageSerializer);
        executeTwoCallbacks(serializerPromise, callback);
        return serializerPromise;
    };

    LocalForage.prototype.ready = function ready(callback) {
        var self = this;

        var promise = self._driverSet.then(function () {
            if (self._ready === null) {
                self._ready = self._initDriver();
            }

            return self._ready;
        });

        executeTwoCallbacks(promise, callback, callback);
        return promise;
    };

    LocalForage.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
        var self = this;

        if (!isArray(drivers)) {
            drivers = [drivers];
        }

        var supportedDrivers = this._getSupportedDrivers(drivers);

        function setDriverToConfig() {
            self._config.driver = self.driver();
        }

        function extendSelfWithDriver(driver) {
            self._extend(driver);
            setDriverToConfig();

            self._ready = self._initStorage(self._config);
            return self._ready;
        }

        function initDriver(supportedDrivers) {
            return function () {
                var currentDriverIndex = 0;

                function driverPromiseLoop() {
                    while (currentDriverIndex < supportedDrivers.length) {
                        var driverName = supportedDrivers[currentDriverIndex];
                        currentDriverIndex++;

                        self._dbInfo = null;
                        self._ready = null;

                        return self.getDriver(driverName).then(extendSelfWithDriver)["catch"](driverPromiseLoop);
                    }

                    setDriverToConfig();
                    var error = new Error('No available storage method found.');
                    self._driverSet = Promise$1.reject(error);
                    return self._driverSet;
                }

                return driverPromiseLoop();
            };
        }

        // There might be a driver initialization in progress
        // so wait for it to finish in order to avoid a possible
        // race condition to set _dbInfo
        var oldDriverSetDone = this._driverSet !== null ? this._driverSet["catch"](function () {
            return Promise$1.resolve();
        }) : Promise$1.resolve();

        this._driverSet = oldDriverSetDone.then(function () {
            var driverName = supportedDrivers[0];
            self._dbInfo = null;
            self._ready = null;

            return self.getDriver(driverName).then(function (driver) {
                self._driver = driver._driver;
                setDriverToConfig();
                self._wrapLibraryMethodsWithReady();
                self._initDriver = initDriver(supportedDrivers);
            });
        })["catch"](function () {
            setDriverToConfig();
            var error = new Error('No available storage method found.');
            self._driverSet = Promise$1.reject(error);
            return self._driverSet;
        });

        executeTwoCallbacks(this._driverSet, callback, errorCallback);
        return this._driverSet;
    };

    LocalForage.prototype.supports = function supports(driverName) {
        return !!DriverSupport[driverName];
    };

    LocalForage.prototype._extend = function _extend(libraryMethodsAndProperties) {
        extend(this, libraryMethodsAndProperties);
    };

    LocalForage.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
        var supportedDrivers = [];
        for (var i = 0, len = drivers.length; i < len; i++) {
            var driverName = drivers[i];
            if (this.supports(driverName)) {
                supportedDrivers.push(driverName);
            }
        }
        return supportedDrivers;
    };

    LocalForage.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
        // Add a stub for each driver API method that delays the call to the
        // corresponding driver method until localForage is ready. These stubs
        // will be replaced by the driver methods as soon as the driver is
        // loaded, so there is no performance impact.
        for (var i = 0, len = LibraryMethods.length; i < len; i++) {
            callWhenReady(this, LibraryMethods[i]);
        }
    };

    LocalForage.prototype.createInstance = function createInstance(options) {
        return new LocalForage(options);
    };

    return LocalForage;
}();

// The actual localForage object that we expose as a module or via a
// global. It's extended by pulling in one of our other libraries.


var localforage_js = new LocalForage();

module.exports = localforage_js;

},{"3":3}]},{},[4])(4)
});
});

var jszip_min = createCommonjsModule(function (module, exports) {
/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/

!function(e){if("object"=='object'&&"undefined"!='object')module.exports=e();else if("function"==typeof undefined&&undefined.amd)undefined([],e);else {("undefined"!=typeof window?window:"undefined"!=typeof commonjsGlobal?commonjsGlobal:"undefined"!=typeof self?self:this).JSZip=e();}}(function(){return function s(a,o,h){function u(r,e){if(!o[r]){if(!a[r]){var t="function"==typeof commonjsRequire&&commonjsRequire;if(!e&&t)return t(r,!0);if(l)return l(r,!0);var n=new Error("Cannot find module '"+r+"'");throw n.code="MODULE_NOT_FOUND",n}var i=o[r]={exports:{}};a[r][0].call(i.exports,function(e){var t=a[r][1][e];return u(t||e)},i,i.exports,s,a,o,h);}return o[r].exports}for(var l="function"==typeof commonjsRequire&&commonjsRequire,e=0;e<h.length;e++)u(h[e]);return u}({1:[function(e,t,r){"use strict";var d=e("./utils"),c=e("./support"),p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.encode=function(e){for(var t,r,n,i,s,a,o,h=[],u=0,l=e.length,f=l,c="string"!==d.getTypeOf(e);u<e.length;)f=l-u,n=c?(t=e[u++],r=u<l?e[u++]:0,u<l?e[u++]:0):(t=e.charCodeAt(u++),r=u<l?e.charCodeAt(u++):0,u<l?e.charCodeAt(u++):0),i=t>>2,s=(3&t)<<4|r>>4,a=1<f?(15&r)<<2|n>>6:64,o=2<f?63&n:64,h.push(p.charAt(i)+p.charAt(s)+p.charAt(a)+p.charAt(o));return h.join("")},r.decode=function(e){var t,r,n,i,s,a,o=0,h=0,u="data:";if(e.substr(0,u.length)===u)throw new Error("Invalid base64 input, it looks like a data url.");var l,f=3*(e=e.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(e.charAt(e.length-1)===p.charAt(64)&&f--,e.charAt(e.length-2)===p.charAt(64)&&f--,f%1!=0)throw new Error("Invalid base64 input, bad content length.");for(l=c.uint8array?new Uint8Array(0|f):new Array(0|f);o<e.length;)t=p.indexOf(e.charAt(o++))<<2|(i=p.indexOf(e.charAt(o++)))>>4,r=(15&i)<<4|(s=p.indexOf(e.charAt(o++)))>>2,n=(3&s)<<6|(a=p.indexOf(e.charAt(o++))),l[h++]=t,64!==s&&(l[h++]=r),64!==a&&(l[h++]=n);return l};},{"./support":30,"./utils":32}],2:[function(e,t,r){"use strict";var n=e("./external"),i=e("./stream/DataWorker"),s=e("./stream/Crc32Probe"),a=e("./stream/DataLengthProbe");function o(e,t,r,n,i){this.compressedSize=e,this.uncompressedSize=t,this.crc32=r,this.compression=n,this.compressedContent=i;}o.prototype={getContentWorker:function(){var e=new i(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")),t=this;return e.on("end",function(){if(this.streamInfo.data_length!==t.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),e},getCompressedWorker:function(){return new i(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},o.createWorkerFrom=function(e,t,r){return e.pipe(new s).pipe(new a("uncompressedSize")).pipe(t.compressWorker(r)).pipe(new a("compressedSize")).withStreamInfo("compression",t)},t.exports=o;},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(e,t,r){"use strict";var n=e("./stream/GenericWorker");r.STORE={magic:"\0\0",compressWorker:function(){return new n("STORE compression")},uncompressWorker:function(){return new n("STORE decompression")}},r.DEFLATE=e("./flate");},{"./flate":7,"./stream/GenericWorker":28}],4:[function(e,t,r){"use strict";var n=e("./utils");var o=function(){for(var e,t=[],r=0;r<256;r++){e=r;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[r]=e;}return t}();t.exports=function(e,t){return void 0!==e&&e.length?"string"!==n.getTypeOf(e)?function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t[a])];return -1^e}(0|t,e,e.length,0):function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t.charCodeAt(a))];return -1^e}(0|t,e,e.length,0):0};},{"./utils":32}],5:[function(e,t,r){"use strict";r.base64=!1,r.binary=!1,r.dir=!1,r.createFolders=!0,r.date=null,r.compression=null,r.compressionOptions=null,r.comment=null,r.unixPermissions=null,r.dosPermissions=null;},{}],6:[function(e,t,r){"use strict";var n=null;n="undefined"!=typeof Promise?Promise:e("lie"),t.exports={Promise:n};},{lie:37}],7:[function(e,t,r){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Uint32Array,i=e("pako"),s=e("./utils"),a=e("./stream/GenericWorker"),o=n?"uint8array":"array";function h(e,t){a.call(this,"FlateWorker/"+e),this._pako=null,this._pakoAction=e,this._pakoOptions=t,this.meta={};}r.magic="\b\0",s.inherits(h,a),h.prototype.processChunk=function(e){this.meta=e.meta,null===this._pako&&this._createPako(),this._pako.push(s.transformTo(o,e.data),!1);},h.prototype.flush=function(){a.prototype.flush.call(this),null===this._pako&&this._createPako(),this._pako.push([],!0);},h.prototype.cleanUp=function(){a.prototype.cleanUp.call(this),this._pako=null;},h.prototype._createPako=function(){this._pako=new i[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var t=this;this._pako.onData=function(e){t.push({data:e,meta:t.meta});};},r.compressWorker=function(e){return new h("Deflate",e)},r.uncompressWorker=function(){return new h("Inflate",{})};},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(e,t,r){"use strict";function A(e,t){var r,n="";for(r=0;r<t;r++)n+=String.fromCharCode(255&e),e>>>=8;return n}function n(e,t,r,n,i,s){var a,o,h=e.file,u=e.compression,l=s!==O.utf8encode,f=I.transformTo("string",s(h.name)),c=I.transformTo("string",O.utf8encode(h.name)),d=h.comment,p=I.transformTo("string",s(d)),m=I.transformTo("string",O.utf8encode(d)),_=c.length!==h.name.length,g=m.length!==d.length,b="",v="",y="",w=h.dir,k=h.date,x={crc32:0,compressedSize:0,uncompressedSize:0};t&&!r||(x.crc32=e.crc32,x.compressedSize=e.compressedSize,x.uncompressedSize=e.uncompressedSize);var S=0;t&&(S|=8),l||!_&&!g||(S|=2048);var z=0,C=0;w&&(z|=16),"UNIX"===i?(C=798,z|=function(e,t){var r=e;return e||(r=t?16893:33204),(65535&r)<<16}(h.unixPermissions,w)):(C=20,z|=function(e){return 63&(e||0)}(h.dosPermissions)),a=k.getUTCHours(),a<<=6,a|=k.getUTCMinutes(),a<<=5,a|=k.getUTCSeconds()/2,o=k.getUTCFullYear()-1980,o<<=4,o|=k.getUTCMonth()+1,o<<=5,o|=k.getUTCDate(),_&&(v=A(1,1)+A(B(f),4)+c,b+="up"+A(v.length,2)+v),g&&(y=A(1,1)+A(B(p),4)+m,b+="uc"+A(y.length,2)+y);var E="";return E+="\n\0",E+=A(S,2),E+=u.magic,E+=A(a,2),E+=A(o,2),E+=A(x.crc32,4),E+=A(x.compressedSize,4),E+=A(x.uncompressedSize,4),E+=A(f.length,2),E+=A(b.length,2),{fileRecord:R.LOCAL_FILE_HEADER+E+f+b,dirRecord:R.CENTRAL_FILE_HEADER+A(C,2)+E+A(p.length,2)+"\0\0\0\0"+A(z,4)+A(n,4)+f+b+p}}var I=e("../utils"),i=e("../stream/GenericWorker"),O=e("../utf8"),B=e("../crc32"),R=e("../signature");function s(e,t,r,n){i.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=t,this.zipPlatform=r,this.encodeFileName=n,this.streamFiles=e,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[];}I.inherits(s,i),s.prototype.push=function(e){var t=e.meta.percent||0,r=this.entriesCount,n=this._sources.length;this.accumulate?this.contentBuffer.push(e):(this.bytesWritten+=e.data.length,i.prototype.push.call(this,{data:e.data,meta:{currentFile:this.currentFile,percent:r?(t+100*(r-n-1))/r:100}}));},s.prototype.openedSource=function(e){this.currentSourceOffset=this.bytesWritten,this.currentFile=e.file.name;var t=this.streamFiles&&!e.file.dir;if(t){var r=n(e,t,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:r.fileRecord,meta:{percent:0}});}else this.accumulate=!0;},s.prototype.closedSource=function(e){this.accumulate=!1;var t=this.streamFiles&&!e.file.dir,r=n(e,t,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(r.dirRecord),t)this.push({data:function(e){return R.DATA_DESCRIPTOR+A(e.crc32,4)+A(e.compressedSize,4)+A(e.uncompressedSize,4)}(e),meta:{percent:100}});else for(this.push({data:r.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null;},s.prototype.flush=function(){for(var e=this.bytesWritten,t=0;t<this.dirRecords.length;t++)this.push({data:this.dirRecords[t],meta:{percent:100}});var r=this.bytesWritten-e,n=function(e,t,r,n,i){var s=I.transformTo("string",i(n));return R.CENTRAL_DIRECTORY_END+"\0\0\0\0"+A(e,2)+A(e,2)+A(t,4)+A(r,4)+A(s.length,2)+s}(this.dirRecords.length,r,e,this.zipComment,this.encodeFileName);this.push({data:n,meta:{percent:100}});},s.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume();},s.prototype.registerPrevious=function(e){this._sources.push(e);var t=this;return e.on("data",function(e){t.processChunk(e);}),e.on("end",function(){t.closedSource(t.previous.streamInfo),t._sources.length?t.prepareNextSource():t.end();}),e.on("error",function(e){t.error(e);}),this},s.prototype.resume=function(){return !!i.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},s.prototype.error=function(e){var t=this._sources;if(!i.prototype.error.call(this,e))return !1;for(var r=0;r<t.length;r++)try{t[r].error(e);}catch(e){}return !0},s.prototype.lock=function(){i.prototype.lock.call(this);for(var e=this._sources,t=0;t<e.length;t++)e[t].lock();},t.exports=s;},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(e,t,r){"use strict";var u=e("../compressions"),n=e("./ZipFileWorker");r.generateWorker=function(e,a,t){var o=new n(a.streamFiles,t,a.platform,a.encodeFileName),h=0;try{e.forEach(function(e,t){h++;var r=function(e,t){var r=e||t,n=u[r];if(!n)throw new Error(r+" is not a valid compression method !");return n}(t.options.compression,a.compression),n=t.options.compressionOptions||a.compressionOptions||{},i=t.dir,s=t.date;t._compressWorker(r,n).withStreamInfo("file",{name:e,dir:i,date:s,comment:t.comment||"",unixPermissions:t.unixPermissions,dosPermissions:t.dosPermissions}).pipe(o);}),o.entriesCount=h;}catch(e){o.error(e);}return o};},{"../compressions":3,"./ZipFileWorker":8}],10:[function(e,t,r){"use strict";function n(){if(!(this instanceof n))return new n;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var e=new n;for(var t in this)"function"!=typeof this[t]&&(e[t]=this[t]);return e};}(n.prototype=e("./object")).loadAsync=e("./load"),n.support=e("./support"),n.defaults=e("./defaults"),n.version="3.10.1",n.loadAsync=function(e,t){return (new n).loadAsync(e,t)},n.external=e("./external"),t.exports=n;},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(e,t,r){"use strict";var u=e("./utils"),i=e("./external"),n=e("./utf8"),s=e("./zipEntries"),a=e("./stream/Crc32Probe"),l=e("./nodejsUtils");function f(n){return new i.Promise(function(e,t){var r=n.decompressed.getContentWorker().pipe(new a);r.on("error",function(e){t(e);}).on("end",function(){r.streamInfo.crc32!==n.decompressed.crc32?t(new Error("Corrupted zip : CRC32 mismatch")):e();}).resume();})}t.exports=function(e,o){var h=this;return o=u.extend(o||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:n.utf8decode}),l.isNode&&l.isStream(e)?i.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):u.prepareContent("the loaded zip file",e,!0,o.optimizedBinaryString,o.base64).then(function(e){var t=new s(o);return t.load(e),t}).then(function(e){var t=[i.Promise.resolve(e)],r=e.files;if(o.checkCRC32)for(var n=0;n<r.length;n++)t.push(f(r[n]));return i.Promise.all(t)}).then(function(e){for(var t=e.shift(),r=t.files,n=0;n<r.length;n++){var i=r[n],s=i.fileNameStr,a=u.resolve(i.fileNameStr);h.file(a,i.decompressed,{binary:!0,optimizedBinaryString:!0,date:i.date,dir:i.dir,comment:i.fileCommentStr.length?i.fileCommentStr:null,unixPermissions:i.unixPermissions,dosPermissions:i.dosPermissions,createFolders:o.createFolders}),i.dir||(h.file(a).unsafeOriginalName=s);}return t.zipComment.length&&(h.comment=t.zipComment),h})};},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(e,t,r){"use strict";var n=e("../utils"),i=e("../stream/GenericWorker");function s(e,t){i.call(this,"Nodejs stream input adapter for "+e),this._upstreamEnded=!1,this._bindStream(t);}n.inherits(s,i),s.prototype._bindStream=function(e){var t=this;(this._stream=e).pause(),e.on("data",function(e){t.push({data:e,meta:{percent:0}});}).on("error",function(e){t.isPaused?this.generatedError=e:t.error(e);}).on("end",function(){t.isPaused?t._upstreamEnded=!0:t.end();});},s.prototype.pause=function(){return !!i.prototype.pause.call(this)&&(this._stream.pause(),!0)},s.prototype.resume=function(){return !!i.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},t.exports=s;},{"../stream/GenericWorker":28,"../utils":32}],13:[function(e,t,r){"use strict";var i=e("readable-stream").Readable;function n(e,t,r){i.call(this,t),this._helper=e;var n=this;e.on("data",function(e,t){n.push(e)||n._helper.pause(),r&&r(t);}).on("error",function(e){n.emit("error",e);}).on("end",function(){n.push(null);});}e("../utils").inherits(n,i),n.prototype._read=function(){this._helper.resume();},t.exports=n;},{"../utils":32,"readable-stream":16}],14:[function(e,t,r){"use strict";t.exports={isNode:"undefined"!=typeof Buffer,newBufferFrom:function(e,t){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(e,t);if("number"==typeof e)throw new Error('The "data" argument must not be a number');return new Buffer(e,t)},allocBuffer:function(e){if(Buffer.alloc)return Buffer.alloc(e);var t=new Buffer(e);return t.fill(0),t},isBuffer:function(e){return Buffer.isBuffer(e)},isStream:function(e){return e&&"function"==typeof e.on&&"function"==typeof e.pause&&"function"==typeof e.resume}};},{}],15:[function(e,t,r){"use strict";function s(e,t,r){var n,i=u.getTypeOf(t),s=u.extend(r||{},f);s.date=s.date||new Date,null!==s.compression&&(s.compression=s.compression.toUpperCase()),"string"==typeof s.unixPermissions&&(s.unixPermissions=parseInt(s.unixPermissions,8)),s.unixPermissions&&16384&s.unixPermissions&&(s.dir=!0),s.dosPermissions&&16&s.dosPermissions&&(s.dir=!0),s.dir&&(e=g(e)),s.createFolders&&(n=_(e))&&b.call(this,n,!0);var a="string"===i&&!1===s.binary&&!1===s.base64;r&&void 0!==r.binary||(s.binary=!a),(t instanceof c&&0===t.uncompressedSize||s.dir||!t||0===t.length)&&(s.base64=!1,s.binary=!0,t="",s.compression="STORE",i="string");var o=null;o=t instanceof c||t instanceof l?t:p.isNode&&p.isStream(t)?new m(e,t):u.prepareContent(e,t,s.binary,s.optimizedBinaryString,s.base64);var h=new d(e,o,s);this.files[e]=h;}var i=e("./utf8"),u=e("./utils"),l=e("./stream/GenericWorker"),a=e("./stream/StreamHelper"),f=e("./defaults"),c=e("./compressedObject"),d=e("./zipObject"),o=e("./generate"),p=e("./nodejsUtils"),m=e("./nodejs/NodejsStreamInputAdapter"),_=function(e){"/"===e.slice(-1)&&(e=e.substring(0,e.length-1));var t=e.lastIndexOf("/");return 0<t?e.substring(0,t):""},g=function(e){return "/"!==e.slice(-1)&&(e+="/"),e},b=function(e,t){return t=void 0!==t?t:f.createFolders,e=g(e),this.files[e]||s.call(this,e,null,{dir:!0,createFolders:t}),this.files[e]};function h(e){return "[object RegExp]"===Object.prototype.toString.call(e)}var n={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(e){var t,r,n;for(t in this.files)n=this.files[t],(r=t.slice(this.root.length,t.length))&&t.slice(0,this.root.length)===this.root&&e(r,n);},filter:function(r){var n=[];return this.forEach(function(e,t){r(e,t)&&n.push(t);}),n},file:function(e,t,r){if(1!==arguments.length)return e=this.root+e,s.call(this,e,t,r),this;if(h(e)){var n=e;return this.filter(function(e,t){return !t.dir&&n.test(e)})}var i=this.files[this.root+e];return i&&!i.dir?i:null},folder:function(r){if(!r)return this;if(h(r))return this.filter(function(e,t){return t.dir&&r.test(e)});var e=this.root+r,t=b.call(this,e),n=this.clone();return n.root=t.name,n},remove:function(r){r=this.root+r;var e=this.files[r];if(e||("/"!==r.slice(-1)&&(r+="/"),e=this.files[r]),e&&!e.dir)delete this.files[r];else for(var t=this.filter(function(e,t){return t.name.slice(0,r.length)===r}),n=0;n<t.length;n++)delete this.files[t[n].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(e){var t,r={};try{if((r=u.extend(e||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:i.utf8encode})).type=r.type.toLowerCase(),r.compression=r.compression.toUpperCase(),"binarystring"===r.type&&(r.type="string"),!r.type)throw new Error("No output type specified.");u.checkSupport(r.type),"darwin"!==r.platform&&"freebsd"!==r.platform&&"linux"!==r.platform&&"sunos"!==r.platform||(r.platform="UNIX"),"win32"===r.platform&&(r.platform="DOS");var n=r.comment||this.comment||"";t=o.generateWorker(this,r,n);}catch(e){(t=new l("error")).error(e);}return new a(t,r.type||"string",r.mimeType)},generateAsync:function(e,t){return this.generateInternalStream(e).accumulate(t)},generateNodeStream:function(e,t){return (e=e||{}).type||(e.type="nodebuffer"),this.generateInternalStream(e).toNodejsStream(t)}};t.exports=n;},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(e,t,r){"use strict";t.exports=e("stream");},{stream:void 0}],17:[function(e,t,r){"use strict";var n=e("./DataReader");function i(e){n.call(this,e);for(var t=0;t<this.data.length;t++)e[t]=255&e[t];}e("../utils").inherits(i,n),i.prototype.byteAt=function(e){return this.data[this.zero+e]},i.prototype.lastIndexOfSignature=function(e){for(var t=e.charCodeAt(0),r=e.charCodeAt(1),n=e.charCodeAt(2),i=e.charCodeAt(3),s=this.length-4;0<=s;--s)if(this.data[s]===t&&this.data[s+1]===r&&this.data[s+2]===n&&this.data[s+3]===i)return s-this.zero;return -1},i.prototype.readAndCheckSignature=function(e){var t=e.charCodeAt(0),r=e.charCodeAt(1),n=e.charCodeAt(2),i=e.charCodeAt(3),s=this.readData(4);return t===s[0]&&r===s[1]&&n===s[2]&&i===s[3]},i.prototype.readData=function(e){if(this.checkOffset(e),0===e)return [];var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i;},{"../utils":32,"./DataReader":18}],18:[function(e,t,r){"use strict";var n=e("../utils");function i(e){this.data=e,this.length=e.length,this.index=0,this.zero=0;}i.prototype={checkOffset:function(e){this.checkIndex(this.index+e);},checkIndex:function(e){if(this.length<this.zero+e||e<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+e+"). Corrupted zip ?")},setIndex:function(e){this.checkIndex(e),this.index=e;},skip:function(e){this.setIndex(this.index+e);},byteAt:function(){},readInt:function(e){var t,r=0;for(this.checkOffset(e),t=this.index+e-1;t>=this.index;t--)r=(r<<8)+this.byteAt(t);return this.index+=e,r},readString:function(e){return n.transformTo("string",this.readData(e))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var e=this.readInt(4);return new Date(Date.UTC(1980+(e>>25&127),(e>>21&15)-1,e>>16&31,e>>11&31,e>>5&63,(31&e)<<1))}},t.exports=i;},{"../utils":32}],19:[function(e,t,r){"use strict";var n=e("./Uint8ArrayReader");function i(e){n.call(this,e);}e("../utils").inherits(i,n),i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i;},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(e,t,r){"use strict";var n=e("./DataReader");function i(e){n.call(this,e);}e("../utils").inherits(i,n),i.prototype.byteAt=function(e){return this.data.charCodeAt(this.zero+e)},i.prototype.lastIndexOfSignature=function(e){return this.data.lastIndexOf(e)-this.zero},i.prototype.readAndCheckSignature=function(e){return e===this.readData(4)},i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i;},{"../utils":32,"./DataReader":18}],21:[function(e,t,r){"use strict";var n=e("./ArrayReader");function i(e){n.call(this,e);}e("../utils").inherits(i,n),i.prototype.readData=function(e){if(this.checkOffset(e),0===e)return new Uint8Array(0);var t=this.data.subarray(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i;},{"../utils":32,"./ArrayReader":17}],22:[function(e,t,r){"use strict";var n=e("../utils"),i=e("../support"),s=e("./ArrayReader"),a=e("./StringReader"),o=e("./NodeBufferReader"),h=e("./Uint8ArrayReader");t.exports=function(e){var t=n.getTypeOf(e);return n.checkSupport(t),"string"!==t||i.uint8array?"nodebuffer"===t?new o(e):i.uint8array?new h(n.transformTo("uint8array",e)):new s(n.transformTo("array",e)):new a(e)};},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(e,t,r){"use strict";r.LOCAL_FILE_HEADER="PK",r.CENTRAL_FILE_HEADER="PK",r.CENTRAL_DIRECTORY_END="PK",r.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK",r.ZIP64_CENTRAL_DIRECTORY_END="PK",r.DATA_DESCRIPTOR="PK\b";},{}],24:[function(e,t,r){"use strict";var n=e("./GenericWorker"),i=e("../utils");function s(e){n.call(this,"ConvertWorker to "+e),this.destType=e;}i.inherits(s,n),s.prototype.processChunk=function(e){this.push({data:i.transformTo(this.destType,e.data),meta:e.meta});},t.exports=s;},{"../utils":32,"./GenericWorker":28}],25:[function(e,t,r){"use strict";var n=e("./GenericWorker"),i=e("../crc32");function s(){n.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0);}e("../utils").inherits(s,n),s.prototype.processChunk=function(e){this.streamInfo.crc32=i(e.data,this.streamInfo.crc32||0),this.push(e);},t.exports=s;},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(e,t,r){"use strict";var n=e("../utils"),i=e("./GenericWorker");function s(e){i.call(this,"DataLengthProbe for "+e),this.propName=e,this.withStreamInfo(e,0);}n.inherits(s,i),s.prototype.processChunk=function(e){if(e){var t=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=t+e.data.length;}i.prototype.processChunk.call(this,e);},t.exports=s;},{"../utils":32,"./GenericWorker":28}],27:[function(e,t,r){"use strict";var n=e("../utils"),i=e("./GenericWorker");function s(e){i.call(this,"DataWorker");var t=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,e.then(function(e){t.dataIsReady=!0,t.data=e,t.max=e&&e.length||0,t.type=n.getTypeOf(e),t.isPaused||t._tickAndRepeat();},function(e){t.error(e);});}n.inherits(s,i),s.prototype.cleanUp=function(){i.prototype.cleanUp.call(this),this.data=null;},s.prototype.resume=function(){return !!i.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,n.delay(this._tickAndRepeat,[],this)),!0)},s.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(n.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0));},s.prototype._tick=function(){if(this.isPaused||this.isFinished)return !1;var e=null,t=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":e=this.data.substring(this.index,t);break;case"uint8array":e=this.data.subarray(this.index,t);break;case"array":case"nodebuffer":e=this.data.slice(this.index,t);}return this.index=t,this.push({data:e,meta:{percent:this.max?this.index/this.max*100:0}})},t.exports=s;},{"../utils":32,"./GenericWorker":28}],28:[function(e,t,r){"use strict";function n(e){this.name=e||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null;}n.prototype={push:function(e){this.emit("data",e);},end:function(){if(this.isFinished)return !1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0;}catch(e){this.emit("error",e);}return !0},error:function(e){return !this.isFinished&&(this.isPaused?this.generatedError=e:(this.isFinished=!0,this.emit("error",e),this.previous&&this.previous.error(e),this.cleanUp()),!0)},on:function(e,t){return this._listeners[e].push(t),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[];},emit:function(e,t){if(this._listeners[e])for(var r=0;r<this._listeners[e].length;r++)this._listeners[e][r].call(this,t);},pipe:function(e){return e.registerPrevious(this)},registerPrevious:function(e){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=e.streamInfo,this.mergeStreamInfo(),this.previous=e;var t=this;return e.on("data",function(e){t.processChunk(e);}),e.on("end",function(){t.end();}),e.on("error",function(e){t.error(e);}),this},pause:function(){return !this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return !1;var e=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),e=!0),this.previous&&this.previous.resume(),!e},flush:function(){},processChunk:function(e){this.push(e);},withStreamInfo:function(e,t){return this.extraStreamInfo[e]=t,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var e in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,e)&&(this.streamInfo[e]=this.extraStreamInfo[e]);},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock();},toString:function(){var e="Worker "+this.name;return this.previous?this.previous+" -> "+e:e}},t.exports=n;},{}],29:[function(e,t,r){"use strict";var h=e("../utils"),i=e("./ConvertWorker"),s=e("./GenericWorker"),u=e("../base64"),n=e("../support"),a=e("../external"),o=null;if(n.nodestream)try{o=e("../nodejs/NodejsStreamOutputAdapter");}catch(e){}function l(e,o){return new a.Promise(function(t,r){var n=[],i=e._internalType,s=e._outputType,a=e._mimeType;e.on("data",function(e,t){n.push(e),o&&o(t);}).on("error",function(e){n=[],r(e);}).on("end",function(){try{var e=function(e,t,r){switch(e){case"blob":return h.newBlob(h.transformTo("arraybuffer",t),r);case"base64":return u.encode(t);default:return h.transformTo(e,t)}}(s,function(e,t){var r,n=0,i=null,s=0;for(r=0;r<t.length;r++)s+=t[r].length;switch(e){case"string":return t.join("");case"array":return Array.prototype.concat.apply([],t);case"uint8array":for(i=new Uint8Array(s),r=0;r<t.length;r++)i.set(t[r],n),n+=t[r].length;return i;case"nodebuffer":return Buffer.concat(t);default:throw new Error("concat : unsupported type '"+e+"'")}}(i,n),a);t(e);}catch(e){r(e);}n=[];}).resume();})}function f(e,t,r){var n=t;switch(t){case"blob":case"arraybuffer":n="uint8array";break;case"base64":n="string";}try{this._internalType=n,this._outputType=t,this._mimeType=r,h.checkSupport(n),this._worker=e.pipe(new i(n)),e.lock();}catch(e){this._worker=new s("error"),this._worker.error(e);}}f.prototype={accumulate:function(e){return l(this,e)},on:function(e,t){var r=this;return "data"===e?this._worker.on(e,function(e){t.call(r,e.data,e.meta);}):this._worker.on(e,function(){h.delay(t,arguments,r);}),this},resume:function(){return h.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(e){if(h.checkSupport("nodestream"),"nodebuffer"!==this._outputType)throw new Error(this._outputType+" is not supported by this method");return new o(this,{objectMode:"nodebuffer"!==this._outputType},e)}},t.exports=f;},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(e,t,r){"use strict";if(r.base64=!0,r.array=!0,r.string=!0,r.arraybuffer="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array,r.nodebuffer="undefined"!=typeof Buffer,r.uint8array="undefined"!=typeof Uint8Array,"undefined"==typeof ArrayBuffer)r.blob=!1;else {var n=new ArrayBuffer(0);try{r.blob=0===new Blob([n],{type:"application/zip"}).size;}catch(e){try{var i=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);i.append(n),r.blob=0===i.getBlob("application/zip").size;}catch(e){r.blob=!1;}}}try{r.nodestream=!!e("readable-stream").Readable;}catch(e){r.nodestream=!1;}},{"readable-stream":16}],31:[function(e,t,s){"use strict";for(var o=e("./utils"),h=e("./support"),r=e("./nodejsUtils"),n=e("./stream/GenericWorker"),u=new Array(256),i=0;i<256;i++)u[i]=252<=i?6:248<=i?5:240<=i?4:224<=i?3:192<=i?2:1;u[254]=u[254]=1;function a(){n.call(this,"utf-8 decode"),this.leftOver=null;}function l(){n.call(this,"utf-8 encode");}s.utf8encode=function(e){return h.nodebuffer?r.newBufferFrom(e,"utf-8"):function(e){var t,r,n,i,s,a=e.length,o=0;for(i=0;i<a;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),o+=r<128?1:r<2048?2:r<65536?3:4;for(t=h.uint8array?new Uint8Array(o):new Array(o),i=s=0;s<o;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),r<128?t[s++]=r:(r<2048?t[s++]=192|r>>>6:(r<65536?t[s++]=224|r>>>12:(t[s++]=240|r>>>18,t[s++]=128|r>>>12&63),t[s++]=128|r>>>6&63),t[s++]=128|63&r);return t}(e)},s.utf8decode=function(e){return h.nodebuffer?o.transformTo("nodebuffer",e).toString("utf-8"):function(e){var t,r,n,i,s=e.length,a=new Array(2*s);for(t=r=0;t<s;)if((n=e[t++])<128)a[r++]=n;else if(4<(i=u[n]))a[r++]=65533,t+=i-1;else {for(n&=2===i?31:3===i?15:7;1<i&&t<s;)n=n<<6|63&e[t++],i--;1<i?a[r++]=65533:n<65536?a[r++]=n:(n-=65536,a[r++]=55296|n>>10&1023,a[r++]=56320|1023&n);}return a.length!==r&&(a.subarray?a=a.subarray(0,r):a.length=r),o.applyFromCharCode(a)}(e=o.transformTo(h.uint8array?"uint8array":"array",e))},o.inherits(a,n),a.prototype.processChunk=function(e){var t=o.transformTo(h.uint8array?"uint8array":"array",e.data);if(this.leftOver&&this.leftOver.length){if(h.uint8array){var r=t;(t=new Uint8Array(r.length+this.leftOver.length)).set(this.leftOver,0),t.set(r,this.leftOver.length);}else t=this.leftOver.concat(t);this.leftOver=null;}var n=function(e,t){var r;for((t=t||e.length)>e.length&&(t=e.length),r=t-1;0<=r&&128==(192&e[r]);)r--;return r<0?t:0===r?t:r+u[e[r]]>t?r:t}(t),i=t;n!==t.length&&(h.uint8array?(i=t.subarray(0,n),this.leftOver=t.subarray(n,t.length)):(i=t.slice(0,n),this.leftOver=t.slice(n,t.length))),this.push({data:s.utf8decode(i),meta:e.meta});},a.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:s.utf8decode(this.leftOver),meta:{}}),this.leftOver=null);},s.Utf8DecodeWorker=a,o.inherits(l,n),l.prototype.processChunk=function(e){this.push({data:s.utf8encode(e.data),meta:e.meta});},s.Utf8EncodeWorker=l;},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(e,t,a){"use strict";var o=e("./support"),h=e("./base64"),r=e("./nodejsUtils"),u=e("./external");function n(e){return e}function l(e,t){for(var r=0;r<e.length;++r)t[r]=255&e.charCodeAt(r);return t}e("setimmediate"),a.newBlob=function(t,r){a.checkSupport("blob");try{return new Blob([t],{type:r})}catch(e){try{var n=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return n.append(t),n.getBlob(r)}catch(e){throw new Error("Bug : can't construct the Blob.")}}};var i={stringifyByChunk:function(e,t,r){var n=[],i=0,s=e.length;if(s<=r)return String.fromCharCode.apply(null,e);for(;i<s;)"array"===t||"nodebuffer"===t?n.push(String.fromCharCode.apply(null,e.slice(i,Math.min(i+r,s)))):n.push(String.fromCharCode.apply(null,e.subarray(i,Math.min(i+r,s)))),i+=r;return n.join("")},stringifyByChar:function(e){for(var t="",r=0;r<e.length;r++)t+=String.fromCharCode(e[r]);return t},applyCanBeUsed:{uint8array:function(){try{return o.uint8array&&1===String.fromCharCode.apply(null,new Uint8Array(1)).length}catch(e){return !1}}(),nodebuffer:function(){try{return o.nodebuffer&&1===String.fromCharCode.apply(null,r.allocBuffer(1)).length}catch(e){return !1}}()}};function s(e){var t=65536,r=a.getTypeOf(e),n=!0;if("uint8array"===r?n=i.applyCanBeUsed.uint8array:"nodebuffer"===r&&(n=i.applyCanBeUsed.nodebuffer),n)for(;1<t;)try{return i.stringifyByChunk(e,r,t)}catch(e){t=Math.floor(t/2);}return i.stringifyByChar(e)}function f(e,t){for(var r=0;r<e.length;r++)t[r]=e[r];return t}a.applyFromCharCode=s;var c={};c.string={string:n,array:function(e){return l(e,new Array(e.length))},arraybuffer:function(e){return c.string.uint8array(e).buffer},uint8array:function(e){return l(e,new Uint8Array(e.length))},nodebuffer:function(e){return l(e,r.allocBuffer(e.length))}},c.array={string:s,array:n,arraybuffer:function(e){return new Uint8Array(e).buffer},uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return r.newBufferFrom(e)}},c.arraybuffer={string:function(e){return s(new Uint8Array(e))},array:function(e){return f(new Uint8Array(e),new Array(e.byteLength))},arraybuffer:n,uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return r.newBufferFrom(new Uint8Array(e))}},c.uint8array={string:s,array:function(e){return f(e,new Array(e.length))},arraybuffer:function(e){return e.buffer},uint8array:n,nodebuffer:function(e){return r.newBufferFrom(e)}},c.nodebuffer={string:s,array:function(e){return f(e,new Array(e.length))},arraybuffer:function(e){return c.nodebuffer.uint8array(e).buffer},uint8array:function(e){return f(e,new Uint8Array(e.length))},nodebuffer:n},a.transformTo=function(e,t){if(t=t||"",!e)return t;a.checkSupport(e);var r=a.getTypeOf(t);return c[r][e](t)},a.resolve=function(e){for(var t=e.split("/"),r=[],n=0;n<t.length;n++){var i=t[n];"."===i||""===i&&0!==n&&n!==t.length-1||(".."===i?r.pop():r.push(i));}return r.join("/")},a.getTypeOf=function(e){return "string"==typeof e?"string":"[object Array]"===Object.prototype.toString.call(e)?"array":o.nodebuffer&&r.isBuffer(e)?"nodebuffer":o.uint8array&&e instanceof Uint8Array?"uint8array":o.arraybuffer&&e instanceof ArrayBuffer?"arraybuffer":void 0},a.checkSupport=function(e){if(!o[e.toLowerCase()])throw new Error(e+" is not supported by this platform")},a.MAX_VALUE_16BITS=65535,a.MAX_VALUE_32BITS=-1,a.pretty=function(e){var t,r,n="";for(r=0;r<(e||"").length;r++)n+="\\x"+((t=e.charCodeAt(r))<16?"0":"")+t.toString(16).toUpperCase();return n},a.delay=function(e,t,r){setImmediate(function(){e.apply(r||null,t||[]);});},a.inherits=function(e,t){function r(){}r.prototype=t.prototype,e.prototype=new r;},a.extend=function(){var e,t,r={};for(e=0;e<arguments.length;e++)for(t in arguments[e])Object.prototype.hasOwnProperty.call(arguments[e],t)&&void 0===r[t]&&(r[t]=arguments[e][t]);return r},a.prepareContent=function(r,e,n,i,s){return u.Promise.resolve(e).then(function(n){return o.blob&&(n instanceof Blob||-1!==["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(n)))&&"undefined"!=typeof FileReader?new u.Promise(function(t,r){var e=new FileReader;e.onload=function(e){t(e.target.result);},e.onerror=function(e){r(e.target.error);},e.readAsArrayBuffer(n);}):n}).then(function(e){var t=a.getTypeOf(e);return t?("arraybuffer"===t?e=a.transformTo("uint8array",e):"string"===t&&(s?e=h.decode(e):n&&!0!==i&&(e=function(e){return l(e,o.uint8array?new Uint8Array(e.length):new Array(e.length))}(e))),e):u.Promise.reject(new Error("Can't read the data of '"+r+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})};},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(e,t,r){"use strict";var n=e("./reader/readerFor"),i=e("./utils"),s=e("./signature"),a=e("./zipEntry"),o=e("./support");function h(e){this.files=[],this.loadOptions=e;}h.prototype={checkSignature:function(e){if(!this.reader.readAndCheckSignature(e)){this.reader.index-=4;var t=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+i.pretty(t)+", expected "+i.pretty(e)+")")}},isSignature:function(e,t){var r=this.reader.index;this.reader.setIndex(e);var n=this.reader.readString(4)===t;return this.reader.setIndex(r),n},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var e=this.reader.readData(this.zipCommentLength),t=o.uint8array?"uint8array":"array",r=i.transformTo(t,e);this.zipComment=this.loadOptions.decodeFileName(r);},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var e,t,r,n=this.zip64EndOfCentralSize-44;0<n;)e=this.reader.readInt(2),t=this.reader.readInt(4),r=this.reader.readData(t),this.zip64ExtensibleData[e]={id:e,length:t,value:r};},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var e,t;for(e=0;e<this.files.length;e++)t=this.files[e],this.reader.setIndex(t.localHeaderOffset),this.checkSignature(s.LOCAL_FILE_HEADER),t.readLocalPart(this.reader),t.handleUTF8(),t.processAttributes();},readCentralDir:function(){var e;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER);)(e=new a({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(e);if(this.centralDirRecords!==this.files.length&&0!==this.centralDirRecords&&0===this.files.length)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var e=this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);if(e<0)throw !this.isSignature(0,s.LOCAL_FILE_HEADER)?new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html"):new Error("Corrupted zip: can't find end of central directory");this.reader.setIndex(e);var t=e;if(this.checkSignature(s.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===i.MAX_VALUE_16BITS||this.diskWithCentralDirStart===i.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===i.MAX_VALUE_16BITS||this.centralDirRecords===i.MAX_VALUE_16BITS||this.centralDirSize===i.MAX_VALUE_32BITS||this.centralDirOffset===i.MAX_VALUE_32BITS){if(this.zip64=!0,(e=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(e),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,s.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral();}var r=this.centralDirOffset+this.centralDirSize;this.zip64&&(r+=20,r+=12+this.zip64EndOfCentralSize);var n=t-r;if(0<n)this.isSignature(t,s.CENTRAL_FILE_HEADER)||(this.reader.zero=n);else if(n<0)throw new Error("Corrupted zip: missing "+Math.abs(n)+" bytes.")},prepareReader:function(e){this.reader=n(e);},load:function(e){this.prepareReader(e),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles();}},t.exports=h;},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(e,t,r){"use strict";var n=e("./reader/readerFor"),s=e("./utils"),i=e("./compressedObject"),a=e("./crc32"),o=e("./utf8"),h=e("./compressions"),u=e("./support");function l(e,t){this.options=e,this.loadOptions=t;}l.prototype={isEncrypted:function(){return 1==(1&this.bitFlag)},useUTF8:function(){return 2048==(2048&this.bitFlag)},readLocalPart:function(e){var t,r;if(e.skip(22),this.fileNameLength=e.readInt(2),r=e.readInt(2),this.fileName=e.readData(this.fileNameLength),e.skip(r),-1===this.compressedSize||-1===this.uncompressedSize)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if(null===(t=function(e){for(var t in h)if(Object.prototype.hasOwnProperty.call(h,t)&&h[t].magic===e)return h[t];return null}(this.compressionMethod)))throw new Error("Corrupted zip : compression "+s.pretty(this.compressionMethod)+" unknown (inner file : "+s.transformTo("string",this.fileName)+")");this.decompressed=new i(this.compressedSize,this.uncompressedSize,this.crc32,t,e.readData(this.compressedSize));},readCentralPart:function(e){this.versionMadeBy=e.readInt(2),e.skip(2),this.bitFlag=e.readInt(2),this.compressionMethod=e.readString(2),this.date=e.readDate(),this.crc32=e.readInt(4),this.compressedSize=e.readInt(4),this.uncompressedSize=e.readInt(4);var t=e.readInt(2);if(this.extraFieldsLength=e.readInt(2),this.fileCommentLength=e.readInt(2),this.diskNumberStart=e.readInt(2),this.internalFileAttributes=e.readInt(2),this.externalFileAttributes=e.readInt(4),this.localHeaderOffset=e.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");e.skip(t),this.readExtraFields(e),this.parseZIP64ExtraField(e),this.fileComment=e.readData(this.fileCommentLength);},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var e=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),0==e&&(this.dosPermissions=63&this.externalFileAttributes),3==e&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||"/"!==this.fileNameStr.slice(-1)||(this.dir=!0);},parseZIP64ExtraField:function(){if(this.extraFields[1]){var e=n(this.extraFields[1].value);this.uncompressedSize===s.MAX_VALUE_32BITS&&(this.uncompressedSize=e.readInt(8)),this.compressedSize===s.MAX_VALUE_32BITS&&(this.compressedSize=e.readInt(8)),this.localHeaderOffset===s.MAX_VALUE_32BITS&&(this.localHeaderOffset=e.readInt(8)),this.diskNumberStart===s.MAX_VALUE_32BITS&&(this.diskNumberStart=e.readInt(4));}},readExtraFields:function(e){var t,r,n,i=e.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});e.index+4<i;)t=e.readInt(2),r=e.readInt(2),n=e.readData(r),this.extraFields[t]={id:t,length:r,value:n};e.setIndex(i);},handleUTF8:function(){var e=u.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=o.utf8decode(this.fileName),this.fileCommentStr=o.utf8decode(this.fileComment);else {var t=this.findExtraFieldUnicodePath();if(null!==t)this.fileNameStr=t;else {var r=s.transformTo(e,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(r);}var n=this.findExtraFieldUnicodeComment();if(null!==n)this.fileCommentStr=n;else {var i=s.transformTo(e,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(i);}}},findExtraFieldUnicodePath:function(){var e=this.extraFields[28789];if(e){var t=n(e.value);return 1!==t.readInt(1)?null:a(this.fileName)!==t.readInt(4)?null:o.utf8decode(t.readData(e.length-5))}return null},findExtraFieldUnicodeComment:function(){var e=this.extraFields[25461];if(e){var t=n(e.value);return 1!==t.readInt(1)?null:a(this.fileComment)!==t.readInt(4)?null:o.utf8decode(t.readData(e.length-5))}return null}},t.exports=l;},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(e,t,r){"use strict";function n(e,t,r){this.name=e,this.dir=r.dir,this.date=r.date,this.comment=r.comment,this.unixPermissions=r.unixPermissions,this.dosPermissions=r.dosPermissions,this._data=t,this._dataBinary=r.binary,this.options={compression:r.compression,compressionOptions:r.compressionOptions};}var s=e("./stream/StreamHelper"),i=e("./stream/DataWorker"),a=e("./utf8"),o=e("./compressedObject"),h=e("./stream/GenericWorker");n.prototype={internalStream:function(e){var t=null,r="string";try{if(!e)throw new Error("No output type specified.");var n="string"===(r=e.toLowerCase())||"text"===r;"binarystring"!==r&&"text"!==r||(r="string"),t=this._decompressWorker();var i=!this._dataBinary;i&&!n&&(t=t.pipe(new a.Utf8EncodeWorker)),!i&&n&&(t=t.pipe(new a.Utf8DecodeWorker));}catch(e){(t=new h("error")).error(e);}return new s(t,r,"")},async:function(e,t){return this.internalStream(e).accumulate(t)},nodeStream:function(e,t){return this.internalStream(e||"nodebuffer").toNodejsStream(t)},_compressWorker:function(e,t){if(this._data instanceof o&&this._data.compression.magic===e.magic)return this._data.getCompressedWorker();var r=this._decompressWorker();return this._dataBinary||(r=r.pipe(new a.Utf8EncodeWorker)),o.createWorkerFrom(r,e,t)},_decompressWorker:function(){return this._data instanceof o?this._data.getContentWorker():this._data instanceof h?this._data:new i(this._data)}};for(var u=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],l=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},f=0;f<u.length;f++)n.prototype[u[f]]=l;t.exports=n;},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(e,l,t){(function(t){"use strict";var r,n,e=t.MutationObserver||t.WebKitMutationObserver;if(e){var i=0,s=new e(u),a=t.document.createTextNode("");s.observe(a,{characterData:!0}),r=function(){a.data=i=++i%2;};}else if(t.setImmediate||void 0===t.MessageChannel)r="document"in t&&"onreadystatechange"in t.document.createElement("script")?function(){var e=t.document.createElement("script");e.onreadystatechange=function(){u(),e.onreadystatechange=null,e.parentNode.removeChild(e),e=null;},t.document.documentElement.appendChild(e);}:function(){setTimeout(u,0);};else {var o=new t.MessageChannel;o.port1.onmessage=u,r=function(){o.port2.postMessage(0);};}var h=[];function u(){var e,t;n=!0;for(var r=h.length;r;){for(t=h,h=[],e=-1;++e<r;)t[e]();r=h.length;}n=!1;}l.exports=function(e){1!==h.push(e)||n||r();};}).call(this,"undefined"!=typeof commonjsGlobal?commonjsGlobal:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});},{}],37:[function(e,t,r){"use strict";var i=e("immediate");function u(){}var l={},s=["REJECTED"],a=["FULFILLED"],n=["PENDING"];function o(e){if("function"!=typeof e)throw new TypeError("resolver must be a function");this.state=n,this.queue=[],this.outcome=void 0,e!==u&&d(this,e);}function h(e,t,r){this.promise=e,"function"==typeof t&&(this.onFulfilled=t,this.callFulfilled=this.otherCallFulfilled),"function"==typeof r&&(this.onRejected=r,this.callRejected=this.otherCallRejected);}function f(t,r,n){i(function(){var e;try{e=r(n);}catch(e){return l.reject(t,e)}e===t?l.reject(t,new TypeError("Cannot resolve promise with itself")):l.resolve(t,e);});}function c(e){var t=e&&e.then;if(e&&("object"==typeof e||"function"==typeof e)&&"function"==typeof t)return function(){t.apply(e,arguments);}}function d(t,e){var r=!1;function n(e){r||(r=!0,l.reject(t,e));}function i(e){r||(r=!0,l.resolve(t,e));}var s=p(function(){e(i,n);});"error"===s.status&&n(s.value);}function p(e,t){var r={};try{r.value=e(t),r.status="success";}catch(e){r.status="error",r.value=e;}return r}(t.exports=o).prototype.finally=function(t){if("function"!=typeof t)return this;var r=this.constructor;return this.then(function(e){return r.resolve(t()).then(function(){return e})},function(e){return r.resolve(t()).then(function(){throw e})})},o.prototype.catch=function(e){return this.then(null,e)},o.prototype.then=function(e,t){if("function"!=typeof e&&this.state===a||"function"!=typeof t&&this.state===s)return this;var r=new this.constructor(u);this.state!==n?f(r,this.state===a?e:t,this.outcome):this.queue.push(new h(r,e,t));return r},h.prototype.callFulfilled=function(e){l.resolve(this.promise,e);},h.prototype.otherCallFulfilled=function(e){f(this.promise,this.onFulfilled,e);},h.prototype.callRejected=function(e){l.reject(this.promise,e);},h.prototype.otherCallRejected=function(e){f(this.promise,this.onRejected,e);},l.resolve=function(e,t){var r=p(c,t);if("error"===r.status)return l.reject(e,r.value);var n=r.value;if(n)d(e,n);else {e.state=a,e.outcome=t;for(var i=-1,s=e.queue.length;++i<s;)e.queue[i].callFulfilled(t);}return e},l.reject=function(e,t){e.state=s,e.outcome=t;for(var r=-1,n=e.queue.length;++r<n;)e.queue[r].callRejected(t);return e},o.resolve=function(e){if(e instanceof this)return e;return l.resolve(new this(u),e)},o.reject=function(e){var t=new this(u);return l.reject(t,e)},o.all=function(e){var r=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var n=e.length,i=!1;if(!n)return this.resolve([]);var s=new Array(n),a=0,t=-1,o=new this(u);for(;++t<n;)h(e[t],t);return o;function h(e,t){r.resolve(e).then(function(e){s[t]=e,++a!==n||i||(i=!0,l.resolve(o,s));},function(e){i||(i=!0,l.reject(o,e));});}},o.race=function(e){var t=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var r=e.length,n=!1;if(!r)return this.resolve([]);var i=-1,s=new this(u);for(;++i<r;)a=e[i],t.resolve(a).then(function(e){n||(n=!0,l.resolve(s,e));},function(e){n||(n=!0,l.reject(s,e));});var a;return s};},{immediate:36}],38:[function(e,t,r){"use strict";var n={};(0,e("./lib/utils/common").assign)(n,e("./lib/deflate"),e("./lib/inflate"),e("./lib/zlib/constants")),t.exports=n;},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(e,t,r){"use strict";var a=e("./zlib/deflate"),o=e("./utils/common"),h=e("./utils/strings"),i=e("./zlib/messages"),s=e("./zlib/zstream"),u=Object.prototype.toString,l=0,f=-1,c=0,d=8;function p(e){if(!(this instanceof p))return new p(e);this.options=o.assign({level:f,method:d,chunkSize:16384,windowBits:15,memLevel:8,strategy:c,to:""},e||{});var t=this.options;t.raw&&0<t.windowBits?t.windowBits=-t.windowBits:t.gzip&&0<t.windowBits&&t.windowBits<16&&(t.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new s,this.strm.avail_out=0;var r=a.deflateInit2(this.strm,t.level,t.method,t.windowBits,t.memLevel,t.strategy);if(r!==l)throw new Error(i[r]);if(t.header&&a.deflateSetHeader(this.strm,t.header),t.dictionary){var n;if(n="string"==typeof t.dictionary?h.string2buf(t.dictionary):"[object ArrayBuffer]"===u.call(t.dictionary)?new Uint8Array(t.dictionary):t.dictionary,(r=a.deflateSetDictionary(this.strm,n))!==l)throw new Error(i[r]);this._dict_set=!0;}}function n(e,t){var r=new p(t);if(r.push(e,!0),r.err)throw r.msg||i[r.err];return r.result}p.prototype.push=function(e,t){var r,n,i=this.strm,s=this.options.chunkSize;if(this.ended)return !1;n=t===~~t?t:!0===t?4:0,"string"==typeof e?i.input=h.string2buf(e):"[object ArrayBuffer]"===u.call(e)?i.input=new Uint8Array(e):i.input=e,i.next_in=0,i.avail_in=i.input.length;do{if(0===i.avail_out&&(i.output=new o.Buf8(s),i.next_out=0,i.avail_out=s),1!==(r=a.deflate(i,n))&&r!==l)return this.onEnd(r),!(this.ended=!0);0!==i.avail_out&&(0!==i.avail_in||4!==n&&2!==n)||("string"===this.options.to?this.onData(h.buf2binstring(o.shrinkBuf(i.output,i.next_out))):this.onData(o.shrinkBuf(i.output,i.next_out)));}while((0<i.avail_in||0===i.avail_out)&&1!==r);return 4===n?(r=a.deflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===l):2!==n||(this.onEnd(l),!(i.avail_out=0))},p.prototype.onData=function(e){this.chunks.push(e);},p.prototype.onEnd=function(e){e===l&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=o.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg;},r.Deflate=p,r.deflate=n,r.deflateRaw=function(e,t){return (t=t||{}).raw=!0,n(e,t)},r.gzip=function(e,t){return (t=t||{}).gzip=!0,n(e,t)};},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(e,t,r){"use strict";var c=e("./zlib/inflate"),d=e("./utils/common"),p=e("./utils/strings"),m=e("./zlib/constants"),n=e("./zlib/messages"),i=e("./zlib/zstream"),s=e("./zlib/gzheader"),_=Object.prototype.toString;function a(e){if(!(this instanceof a))return new a(e);this.options=d.assign({chunkSize:16384,windowBits:0,to:""},e||{});var t=this.options;t.raw&&0<=t.windowBits&&t.windowBits<16&&(t.windowBits=-t.windowBits,0===t.windowBits&&(t.windowBits=-15)),!(0<=t.windowBits&&t.windowBits<16)||e&&e.windowBits||(t.windowBits+=32),15<t.windowBits&&t.windowBits<48&&0==(15&t.windowBits)&&(t.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new i,this.strm.avail_out=0;var r=c.inflateInit2(this.strm,t.windowBits);if(r!==m.Z_OK)throw new Error(n[r]);this.header=new s,c.inflateGetHeader(this.strm,this.header);}function o(e,t){var r=new a(t);if(r.push(e,!0),r.err)throw r.msg||n[r.err];return r.result}a.prototype.push=function(e,t){var r,n,i,s,a,o,h=this.strm,u=this.options.chunkSize,l=this.options.dictionary,f=!1;if(this.ended)return !1;n=t===~~t?t:!0===t?m.Z_FINISH:m.Z_NO_FLUSH,"string"==typeof e?h.input=p.binstring2buf(e):"[object ArrayBuffer]"===_.call(e)?h.input=new Uint8Array(e):h.input=e,h.next_in=0,h.avail_in=h.input.length;do{if(0===h.avail_out&&(h.output=new d.Buf8(u),h.next_out=0,h.avail_out=u),(r=c.inflate(h,m.Z_NO_FLUSH))===m.Z_NEED_DICT&&l&&(o="string"==typeof l?p.string2buf(l):"[object ArrayBuffer]"===_.call(l)?new Uint8Array(l):l,r=c.inflateSetDictionary(this.strm,o)),r===m.Z_BUF_ERROR&&!0===f&&(r=m.Z_OK,f=!1),r!==m.Z_STREAM_END&&r!==m.Z_OK)return this.onEnd(r),!(this.ended=!0);h.next_out&&(0!==h.avail_out&&r!==m.Z_STREAM_END&&(0!==h.avail_in||n!==m.Z_FINISH&&n!==m.Z_SYNC_FLUSH)||("string"===this.options.to?(i=p.utf8border(h.output,h.next_out),s=h.next_out-i,a=p.buf2string(h.output,i),h.next_out=s,h.avail_out=u-s,s&&d.arraySet(h.output,h.output,i,s,0),this.onData(a)):this.onData(d.shrinkBuf(h.output,h.next_out)))),0===h.avail_in&&0===h.avail_out&&(f=!0);}while((0<h.avail_in||0===h.avail_out)&&r!==m.Z_STREAM_END);return r===m.Z_STREAM_END&&(n=m.Z_FINISH),n===m.Z_FINISH?(r=c.inflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===m.Z_OK):n!==m.Z_SYNC_FLUSH||(this.onEnd(m.Z_OK),!(h.avail_out=0))},a.prototype.onData=function(e){this.chunks.push(e);},a.prototype.onEnd=function(e){e===m.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=d.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg;},r.Inflate=a,r.inflate=o,r.inflateRaw=function(e,t){return (t=t||{}).raw=!0,o(e,t)},r.ungzip=o;},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(e,t,r){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;r.assign=function(e){for(var t=Array.prototype.slice.call(arguments,1);t.length;){var r=t.shift();if(r){if("object"!=typeof r)throw new TypeError(r+"must be non-object");for(var n in r)r.hasOwnProperty(n)&&(e[n]=r[n]);}}return e},r.shrinkBuf=function(e,t){return e.length===t?e:e.subarray?e.subarray(0,t):(e.length=t,e)};var i={arraySet:function(e,t,r,n,i){if(t.subarray&&e.subarray)e.set(t.subarray(r,r+n),i);else for(var s=0;s<n;s++)e[i+s]=t[r+s];},flattenChunks:function(e){var t,r,n,i,s,a;for(t=n=0,r=e.length;t<r;t++)n+=e[t].length;for(a=new Uint8Array(n),t=i=0,r=e.length;t<r;t++)s=e[t],a.set(s,i),i+=s.length;return a}},s={arraySet:function(e,t,r,n,i){for(var s=0;s<n;s++)e[i+s]=t[r+s];},flattenChunks:function(e){return [].concat.apply([],e)}};r.setTyped=function(e){e?(r.Buf8=Uint8Array,r.Buf16=Uint16Array,r.Buf32=Int32Array,r.assign(r,i)):(r.Buf8=Array,r.Buf16=Array,r.Buf32=Array,r.assign(r,s));},r.setTyped(n);},{}],42:[function(e,t,r){"use strict";var h=e("./common"),i=!0,s=!0;try{String.fromCharCode.apply(null,[0]);}catch(e){i=!1;}try{String.fromCharCode.apply(null,new Uint8Array(1));}catch(e){s=!1;}for(var u=new h.Buf8(256),n=0;n<256;n++)u[n]=252<=n?6:248<=n?5:240<=n?4:224<=n?3:192<=n?2:1;function l(e,t){if(t<65537&&(e.subarray&&s||!e.subarray&&i))return String.fromCharCode.apply(null,h.shrinkBuf(e,t));for(var r="",n=0;n<t;n++)r+=String.fromCharCode(e[n]);return r}u[254]=u[254]=1,r.string2buf=function(e){var t,r,n,i,s,a=e.length,o=0;for(i=0;i<a;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),o+=r<128?1:r<2048?2:r<65536?3:4;for(t=new h.Buf8(o),i=s=0;s<o;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),r<128?t[s++]=r:(r<2048?t[s++]=192|r>>>6:(r<65536?t[s++]=224|r>>>12:(t[s++]=240|r>>>18,t[s++]=128|r>>>12&63),t[s++]=128|r>>>6&63),t[s++]=128|63&r);return t},r.buf2binstring=function(e){return l(e,e.length)},r.binstring2buf=function(e){for(var t=new h.Buf8(e.length),r=0,n=t.length;r<n;r++)t[r]=e.charCodeAt(r);return t},r.buf2string=function(e,t){var r,n,i,s,a=t||e.length,o=new Array(2*a);for(r=n=0;r<a;)if((i=e[r++])<128)o[n++]=i;else if(4<(s=u[i]))o[n++]=65533,r+=s-1;else {for(i&=2===s?31:3===s?15:7;1<s&&r<a;)i=i<<6|63&e[r++],s--;1<s?o[n++]=65533:i<65536?o[n++]=i:(i-=65536,o[n++]=55296|i>>10&1023,o[n++]=56320|1023&i);}return l(o,n)},r.utf8border=function(e,t){var r;for((t=t||e.length)>e.length&&(t=e.length),r=t-1;0<=r&&128==(192&e[r]);)r--;return r<0?t:0===r?t:r+u[e[r]]>t?r:t};},{"./common":41}],43:[function(e,t,r){"use strict";t.exports=function(e,t,r,n){for(var i=65535&e|0,s=e>>>16&65535|0,a=0;0!==r;){for(r-=a=2e3<r?2e3:r;s=s+(i=i+t[n++]|0)|0,--a;);i%=65521,s%=65521;}return i|s<<16|0};},{}],44:[function(e,t,r){"use strict";t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8};},{}],45:[function(e,t,r){"use strict";var o=function(){for(var e,t=[],r=0;r<256;r++){e=r;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[r]=e;}return t}();t.exports=function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t[a])];return -1^e};},{}],46:[function(e,t,r){"use strict";var h,c=e("../utils/common"),u=e("./trees"),d=e("./adler32"),p=e("./crc32"),n=e("./messages"),l=0,f=4,m=0,_=-2,g=-1,b=4,i=2,v=8,y=9,s=286,a=30,o=19,w=2*s+1,k=15,x=3,S=258,z=S+x+1,C=42,E=113,A=1,I=2,O=3,B=4;function R(e,t){return e.msg=n[t],t}function T(e){return (e<<1)-(4<e?9:0)}function D(e){for(var t=e.length;0<=--t;)e[t]=0;}function F(e){var t=e.state,r=t.pending;r>e.avail_out&&(r=e.avail_out),0!==r&&(c.arraySet(e.output,t.pending_buf,t.pending_out,r,e.next_out),e.next_out+=r,t.pending_out+=r,e.total_out+=r,e.avail_out-=r,t.pending-=r,0===t.pending&&(t.pending_out=0));}function N(e,t){u._tr_flush_block(e,0<=e.block_start?e.block_start:-1,e.strstart-e.block_start,t),e.block_start=e.strstart,F(e.strm);}function U(e,t){e.pending_buf[e.pending++]=t;}function P(e,t){e.pending_buf[e.pending++]=t>>>8&255,e.pending_buf[e.pending++]=255&t;}function L(e,t){var r,n,i=e.max_chain_length,s=e.strstart,a=e.prev_length,o=e.nice_match,h=e.strstart>e.w_size-z?e.strstart-(e.w_size-z):0,u=e.window,l=e.w_mask,f=e.prev,c=e.strstart+S,d=u[s+a-1],p=u[s+a];e.prev_length>=e.good_match&&(i>>=2),o>e.lookahead&&(o=e.lookahead);do{if(u[(r=t)+a]===p&&u[r+a-1]===d&&u[r]===u[s]&&u[++r]===u[s+1]){s+=2,r++;do{}while(u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&s<c);if(n=S-(c-s),s=c-S,a<n){if(e.match_start=t,o<=(a=n))break;d=u[s+a-1],p=u[s+a];}}}while((t=f[t&l])>h&&0!=--i);return a<=e.lookahead?a:e.lookahead}function j(e){var t,r,n,i,s,a,o,h,u,l,f=e.w_size;do{if(i=e.window_size-e.lookahead-e.strstart,e.strstart>=f+(f-z)){for(c.arraySet(e.window,e.window,f,f,0),e.match_start-=f,e.strstart-=f,e.block_start-=f,t=r=e.hash_size;n=e.head[--t],e.head[t]=f<=n?n-f:0,--r;);for(t=r=f;n=e.prev[--t],e.prev[t]=f<=n?n-f:0,--r;);i+=f;}if(0===e.strm.avail_in)break;if(a=e.strm,o=e.window,h=e.strstart+e.lookahead,u=i,l=void 0,l=a.avail_in,u<l&&(l=u),r=0===l?0:(a.avail_in-=l,c.arraySet(o,a.input,a.next_in,l,h),1===a.state.wrap?a.adler=d(a.adler,o,l,h):2===a.state.wrap&&(a.adler=p(a.adler,o,l,h)),a.next_in+=l,a.total_in+=l,l),e.lookahead+=r,e.lookahead+e.insert>=x)for(s=e.strstart-e.insert,e.ins_h=e.window[s],e.ins_h=(e.ins_h<<e.hash_shift^e.window[s+1])&e.hash_mask;e.insert&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[s+x-1])&e.hash_mask,e.prev[s&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=s,s++,e.insert--,!(e.lookahead+e.insert<x)););}while(e.lookahead<z&&0!==e.strm.avail_in)}function Z(e,t){for(var r,n;;){if(e.lookahead<z){if(j(e),e.lookahead<z&&t===l)return A;if(0===e.lookahead)break}if(r=0,e.lookahead>=x&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),0!==r&&e.strstart-r<=e.w_size-z&&(e.match_length=L(e,r)),e.match_length>=x)if(n=u._tr_tally(e,e.strstart-e.match_start,e.match_length-x),e.lookahead-=e.match_length,e.match_length<=e.max_lazy_match&&e.lookahead>=x){for(e.match_length--;e.strstart++,e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart,0!=--e.match_length;);e.strstart++;}else e.strstart+=e.match_length,e.match_length=0,e.ins_h=e.window[e.strstart],e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+1])&e.hash_mask;else n=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++;if(n&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=e.strstart<x-1?e.strstart:x-1,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}function W(e,t){for(var r,n,i;;){if(e.lookahead<z){if(j(e),e.lookahead<z&&t===l)return A;if(0===e.lookahead)break}if(r=0,e.lookahead>=x&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),e.prev_length=e.match_length,e.prev_match=e.match_start,e.match_length=x-1,0!==r&&e.prev_length<e.max_lazy_match&&e.strstart-r<=e.w_size-z&&(e.match_length=L(e,r),e.match_length<=5&&(1===e.strategy||e.match_length===x&&4096<e.strstart-e.match_start)&&(e.match_length=x-1)),e.prev_length>=x&&e.match_length<=e.prev_length){for(i=e.strstart+e.lookahead-x,n=u._tr_tally(e,e.strstart-1-e.prev_match,e.prev_length-x),e.lookahead-=e.prev_length-1,e.prev_length-=2;++e.strstart<=i&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),0!=--e.prev_length;);if(e.match_available=0,e.match_length=x-1,e.strstart++,n&&(N(e,!1),0===e.strm.avail_out))return A}else if(e.match_available){if((n=u._tr_tally(e,0,e.window[e.strstart-1]))&&N(e,!1),e.strstart++,e.lookahead--,0===e.strm.avail_out)return A}else e.match_available=1,e.strstart++,e.lookahead--;}return e.match_available&&(n=u._tr_tally(e,0,e.window[e.strstart-1]),e.match_available=0),e.insert=e.strstart<x-1?e.strstart:x-1,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}function M(e,t,r,n,i){this.good_length=e,this.max_lazy=t,this.nice_length=r,this.max_chain=n,this.func=i;}function H(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=v,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new c.Buf16(2*w),this.dyn_dtree=new c.Buf16(2*(2*a+1)),this.bl_tree=new c.Buf16(2*(2*o+1)),D(this.dyn_ltree),D(this.dyn_dtree),D(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new c.Buf16(k+1),this.heap=new c.Buf16(2*s+1),D(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new c.Buf16(2*s+1),D(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0;}function G(e){var t;return e&&e.state?(e.total_in=e.total_out=0,e.data_type=i,(t=e.state).pending=0,t.pending_out=0,t.wrap<0&&(t.wrap=-t.wrap),t.status=t.wrap?C:E,e.adler=2===t.wrap?0:1,t.last_flush=l,u._tr_init(t),m):R(e,_)}function K(e){var t=G(e);return t===m&&function(e){e.window_size=2*e.w_size,D(e.head),e.max_lazy_match=h[e.level].max_lazy,e.good_match=h[e.level].good_length,e.nice_match=h[e.level].nice_length,e.max_chain_length=h[e.level].max_chain,e.strstart=0,e.block_start=0,e.lookahead=0,e.insert=0,e.match_length=e.prev_length=x-1,e.match_available=0,e.ins_h=0;}(e.state),t}function Y(e,t,r,n,i,s){if(!e)return _;var a=1;if(t===g&&(t=6),n<0?(a=0,n=-n):15<n&&(a=2,n-=16),i<1||y<i||r!==v||n<8||15<n||t<0||9<t||s<0||b<s)return R(e,_);8===n&&(n=9);var o=new H;return (e.state=o).strm=e,o.wrap=a,o.gzhead=null,o.w_bits=n,o.w_size=1<<o.w_bits,o.w_mask=o.w_size-1,o.hash_bits=i+7,o.hash_size=1<<o.hash_bits,o.hash_mask=o.hash_size-1,o.hash_shift=~~((o.hash_bits+x-1)/x),o.window=new c.Buf8(2*o.w_size),o.head=new c.Buf16(o.hash_size),o.prev=new c.Buf16(o.w_size),o.lit_bufsize=1<<i+6,o.pending_buf_size=4*o.lit_bufsize,o.pending_buf=new c.Buf8(o.pending_buf_size),o.d_buf=1*o.lit_bufsize,o.l_buf=3*o.lit_bufsize,o.level=t,o.strategy=s,o.method=r,K(e)}h=[new M(0,0,0,0,function(e,t){var r=65535;for(r>e.pending_buf_size-5&&(r=e.pending_buf_size-5);;){if(e.lookahead<=1){if(j(e),0===e.lookahead&&t===l)return A;if(0===e.lookahead)break}e.strstart+=e.lookahead,e.lookahead=0;var n=e.block_start+r;if((0===e.strstart||e.strstart>=n)&&(e.lookahead=e.strstart-n,e.strstart=n,N(e,!1),0===e.strm.avail_out))return A;if(e.strstart-e.block_start>=e.w_size-z&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):(e.strstart>e.block_start&&(N(e,!1),e.strm.avail_out),A)}),new M(4,4,8,4,Z),new M(4,5,16,8,Z),new M(4,6,32,32,Z),new M(4,4,16,16,W),new M(8,16,32,32,W),new M(8,16,128,128,W),new M(8,32,128,256,W),new M(32,128,258,1024,W),new M(32,258,258,4096,W)],r.deflateInit=function(e,t){return Y(e,t,v,15,8,0)},r.deflateInit2=Y,r.deflateReset=K,r.deflateResetKeep=G,r.deflateSetHeader=function(e,t){return e&&e.state?2!==e.state.wrap?_:(e.state.gzhead=t,m):_},r.deflate=function(e,t){var r,n,i,s;if(!e||!e.state||5<t||t<0)return e?R(e,_):_;if(n=e.state,!e.output||!e.input&&0!==e.avail_in||666===n.status&&t!==f)return R(e,0===e.avail_out?-5:_);if(n.strm=e,r=n.last_flush,n.last_flush=t,n.status===C)if(2===n.wrap)e.adler=0,U(n,31),U(n,139),U(n,8),n.gzhead?(U(n,(n.gzhead.text?1:0)+(n.gzhead.hcrc?2:0)+(n.gzhead.extra?4:0)+(n.gzhead.name?8:0)+(n.gzhead.comment?16:0)),U(n,255&n.gzhead.time),U(n,n.gzhead.time>>8&255),U(n,n.gzhead.time>>16&255),U(n,n.gzhead.time>>24&255),U(n,9===n.level?2:2<=n.strategy||n.level<2?4:0),U(n,255&n.gzhead.os),n.gzhead.extra&&n.gzhead.extra.length&&(U(n,255&n.gzhead.extra.length),U(n,n.gzhead.extra.length>>8&255)),n.gzhead.hcrc&&(e.adler=p(e.adler,n.pending_buf,n.pending,0)),n.gzindex=0,n.status=69):(U(n,0),U(n,0),U(n,0),U(n,0),U(n,0),U(n,9===n.level?2:2<=n.strategy||n.level<2?4:0),U(n,3),n.status=E);else {var a=v+(n.w_bits-8<<4)<<8;a|=(2<=n.strategy||n.level<2?0:n.level<6?1:6===n.level?2:3)<<6,0!==n.strstart&&(a|=32),a+=31-a%31,n.status=E,P(n,a),0!==n.strstart&&(P(n,e.adler>>>16),P(n,65535&e.adler)),e.adler=1;}if(69===n.status)if(n.gzhead.extra){for(i=n.pending;n.gzindex<(65535&n.gzhead.extra.length)&&(n.pending!==n.pending_buf_size||(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending!==n.pending_buf_size));)U(n,255&n.gzhead.extra[n.gzindex]),n.gzindex++;n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),n.gzindex===n.gzhead.extra.length&&(n.gzindex=0,n.status=73);}else n.status=73;if(73===n.status)if(n.gzhead.name){i=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending===n.pending_buf_size)){s=1;break}s=n.gzindex<n.gzhead.name.length?255&n.gzhead.name.charCodeAt(n.gzindex++):0,U(n,s);}while(0!==s);n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),0===s&&(n.gzindex=0,n.status=91);}else n.status=91;if(91===n.status)if(n.gzhead.comment){i=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending===n.pending_buf_size)){s=1;break}s=n.gzindex<n.gzhead.comment.length?255&n.gzhead.comment.charCodeAt(n.gzindex++):0,U(n,s);}while(0!==s);n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),0===s&&(n.status=103);}else n.status=103;if(103===n.status&&(n.gzhead.hcrc?(n.pending+2>n.pending_buf_size&&F(e),n.pending+2<=n.pending_buf_size&&(U(n,255&e.adler),U(n,e.adler>>8&255),e.adler=0,n.status=E)):n.status=E),0!==n.pending){if(F(e),0===e.avail_out)return n.last_flush=-1,m}else if(0===e.avail_in&&T(t)<=T(r)&&t!==f)return R(e,-5);if(666===n.status&&0!==e.avail_in)return R(e,-5);if(0!==e.avail_in||0!==n.lookahead||t!==l&&666!==n.status){var o=2===n.strategy?function(e,t){for(var r;;){if(0===e.lookahead&&(j(e),0===e.lookahead)){if(t===l)return A;break}if(e.match_length=0,r=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++,r&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}(n,t):3===n.strategy?function(e,t){for(var r,n,i,s,a=e.window;;){if(e.lookahead<=S){if(j(e),e.lookahead<=S&&t===l)return A;if(0===e.lookahead)break}if(e.match_length=0,e.lookahead>=x&&0<e.strstart&&(n=a[i=e.strstart-1])===a[++i]&&n===a[++i]&&n===a[++i]){s=e.strstart+S;do{}while(n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&i<s);e.match_length=S-(s-i),e.match_length>e.lookahead&&(e.match_length=e.lookahead);}if(e.match_length>=x?(r=u._tr_tally(e,1,e.match_length-x),e.lookahead-=e.match_length,e.strstart+=e.match_length,e.match_length=0):(r=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++),r&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}(n,t):h[n.level].func(n,t);if(o!==O&&o!==B||(n.status=666),o===A||o===O)return 0===e.avail_out&&(n.last_flush=-1),m;if(o===I&&(1===t?u._tr_align(n):5!==t&&(u._tr_stored_block(n,0,0,!1),3===t&&(D(n.head),0===n.lookahead&&(n.strstart=0,n.block_start=0,n.insert=0))),F(e),0===e.avail_out))return n.last_flush=-1,m}return t!==f?m:n.wrap<=0?1:(2===n.wrap?(U(n,255&e.adler),U(n,e.adler>>8&255),U(n,e.adler>>16&255),U(n,e.adler>>24&255),U(n,255&e.total_in),U(n,e.total_in>>8&255),U(n,e.total_in>>16&255),U(n,e.total_in>>24&255)):(P(n,e.adler>>>16),P(n,65535&e.adler)),F(e),0<n.wrap&&(n.wrap=-n.wrap),0!==n.pending?m:1)},r.deflateEnd=function(e){var t;return e&&e.state?(t=e.state.status)!==C&&69!==t&&73!==t&&91!==t&&103!==t&&t!==E&&666!==t?R(e,_):(e.state=null,t===E?R(e,-3):m):_},r.deflateSetDictionary=function(e,t){var r,n,i,s,a,o,h,u,l=t.length;if(!e||!e.state)return _;if(2===(s=(r=e.state).wrap)||1===s&&r.status!==C||r.lookahead)return _;for(1===s&&(e.adler=d(e.adler,t,l,0)),r.wrap=0,l>=r.w_size&&(0===s&&(D(r.head),r.strstart=0,r.block_start=0,r.insert=0),u=new c.Buf8(r.w_size),c.arraySet(u,t,l-r.w_size,r.w_size,0),t=u,l=r.w_size),a=e.avail_in,o=e.next_in,h=e.input,e.avail_in=l,e.next_in=0,e.input=t,j(r);r.lookahead>=x;){for(n=r.strstart,i=r.lookahead-(x-1);r.ins_h=(r.ins_h<<r.hash_shift^r.window[n+x-1])&r.hash_mask,r.prev[n&r.w_mask]=r.head[r.ins_h],r.head[r.ins_h]=n,n++,--i;);r.strstart=n,r.lookahead=x-1,j(r);}return r.strstart+=r.lookahead,r.block_start=r.strstart,r.insert=r.lookahead,r.lookahead=0,r.match_length=r.prev_length=x-1,r.match_available=0,e.next_in=o,e.input=h,e.avail_in=a,r.wrap=s,m},r.deflateInfo="pako deflate (from Nodeca project)";},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(e,t,r){"use strict";t.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1;};},{}],48:[function(e,t,r){"use strict";t.exports=function(e,t){var r,n,i,s,a,o,h,u,l,f,c,d,p,m,_,g,b,v,y,w,k,x,S,z,C;r=e.state,n=e.next_in,z=e.input,i=n+(e.avail_in-5),s=e.next_out,C=e.output,a=s-(t-e.avail_out),o=s+(e.avail_out-257),h=r.dmax,u=r.wsize,l=r.whave,f=r.wnext,c=r.window,d=r.hold,p=r.bits,m=r.lencode,_=r.distcode,g=(1<<r.lenbits)-1,b=(1<<r.distbits)-1;e:do{p<15&&(d+=z[n++]<<p,p+=8,d+=z[n++]<<p,p+=8),v=m[d&g];t:for(;;){if(d>>>=y=v>>>24,p-=y,0===(y=v>>>16&255))C[s++]=65535&v;else {if(!(16&y)){if(0==(64&y)){v=m[(65535&v)+(d&(1<<y)-1)];continue t}if(32&y){r.mode=12;break e}e.msg="invalid literal/length code",r.mode=30;break e}w=65535&v,(y&=15)&&(p<y&&(d+=z[n++]<<p,p+=8),w+=d&(1<<y)-1,d>>>=y,p-=y),p<15&&(d+=z[n++]<<p,p+=8,d+=z[n++]<<p,p+=8),v=_[d&b];r:for(;;){if(d>>>=y=v>>>24,p-=y,!(16&(y=v>>>16&255))){if(0==(64&y)){v=_[(65535&v)+(d&(1<<y)-1)];continue r}e.msg="invalid distance code",r.mode=30;break e}if(k=65535&v,p<(y&=15)&&(d+=z[n++]<<p,(p+=8)<y&&(d+=z[n++]<<p,p+=8)),h<(k+=d&(1<<y)-1)){e.msg="invalid distance too far back",r.mode=30;break e}if(d>>>=y,p-=y,(y=s-a)<k){if(l<(y=k-y)&&r.sane){e.msg="invalid distance too far back",r.mode=30;break e}if(S=c,(x=0)===f){if(x+=u-y,y<w){for(w-=y;C[s++]=c[x++],--y;);x=s-k,S=C;}}else if(f<y){if(x+=u+f-y,(y-=f)<w){for(w-=y;C[s++]=c[x++],--y;);if(x=0,f<w){for(w-=y=f;C[s++]=c[x++],--y;);x=s-k,S=C;}}}else if(x+=f-y,y<w){for(w-=y;C[s++]=c[x++],--y;);x=s-k,S=C;}for(;2<w;)C[s++]=S[x++],C[s++]=S[x++],C[s++]=S[x++],w-=3;w&&(C[s++]=S[x++],1<w&&(C[s++]=S[x++]));}else {for(x=s-k;C[s++]=C[x++],C[s++]=C[x++],C[s++]=C[x++],2<(w-=3););w&&(C[s++]=C[x++],1<w&&(C[s++]=C[x++]));}break}}break}}while(n<i&&s<o);n-=w=p>>3,d&=(1<<(p-=w<<3))-1,e.next_in=n,e.next_out=s,e.avail_in=n<i?i-n+5:5-(n-i),e.avail_out=s<o?o-s+257:257-(s-o),r.hold=d,r.bits=p;};},{}],49:[function(e,t,r){"use strict";var I=e("../utils/common"),O=e("./adler32"),B=e("./crc32"),R=e("./inffast"),T=e("./inftrees"),D=1,F=2,N=0,U=-2,P=1,n=852,i=592;function L(e){return (e>>>24&255)+(e>>>8&65280)+((65280&e)<<8)+((255&e)<<24)}function s(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new I.Buf16(320),this.work=new I.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0;}function a(e){var t;return e&&e.state?(t=e.state,e.total_in=e.total_out=t.total=0,e.msg="",t.wrap&&(e.adler=1&t.wrap),t.mode=P,t.last=0,t.havedict=0,t.dmax=32768,t.head=null,t.hold=0,t.bits=0,t.lencode=t.lendyn=new I.Buf32(n),t.distcode=t.distdyn=new I.Buf32(i),t.sane=1,t.back=-1,N):U}function o(e){var t;return e&&e.state?((t=e.state).wsize=0,t.whave=0,t.wnext=0,a(e)):U}function h(e,t){var r,n;return e&&e.state?(n=e.state,t<0?(r=0,t=-t):(r=1+(t>>4),t<48&&(t&=15)),t&&(t<8||15<t)?U:(null!==n.window&&n.wbits!==t&&(n.window=null),n.wrap=r,n.wbits=t,o(e))):U}function u(e,t){var r,n;return e?(n=new s,(e.state=n).window=null,(r=h(e,t))!==N&&(e.state=null),r):U}var l,f,c=!0;function j(e){if(c){var t;for(l=new I.Buf32(512),f=new I.Buf32(32),t=0;t<144;)e.lens[t++]=8;for(;t<256;)e.lens[t++]=9;for(;t<280;)e.lens[t++]=7;for(;t<288;)e.lens[t++]=8;for(T(D,e.lens,0,288,l,0,e.work,{bits:9}),t=0;t<32;)e.lens[t++]=5;T(F,e.lens,0,32,f,0,e.work,{bits:5}),c=!1;}e.lencode=l,e.lenbits=9,e.distcode=f,e.distbits=5;}function Z(e,t,r,n){var i,s=e.state;return null===s.window&&(s.wsize=1<<s.wbits,s.wnext=0,s.whave=0,s.window=new I.Buf8(s.wsize)),n>=s.wsize?(I.arraySet(s.window,t,r-s.wsize,s.wsize,0),s.wnext=0,s.whave=s.wsize):(n<(i=s.wsize-s.wnext)&&(i=n),I.arraySet(s.window,t,r-n,i,s.wnext),(n-=i)?(I.arraySet(s.window,t,r-n,n,0),s.wnext=n,s.whave=s.wsize):(s.wnext+=i,s.wnext===s.wsize&&(s.wnext=0),s.whave<s.wsize&&(s.whave+=i))),0}r.inflateReset=o,r.inflateReset2=h,r.inflateResetKeep=a,r.inflateInit=function(e){return u(e,15)},r.inflateInit2=u,r.inflate=function(e,t){var r,n,i,s,a,o,h,u,l,f,c,d,p,m,_,g,b,v,y,w,k,x,S,z,C=0,E=new I.Buf8(4),A=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!e||!e.state||!e.output||!e.input&&0!==e.avail_in)return U;12===(r=e.state).mode&&(r.mode=13),a=e.next_out,i=e.output,h=e.avail_out,s=e.next_in,n=e.input,o=e.avail_in,u=r.hold,l=r.bits,f=o,c=h,x=N;e:for(;;)switch(r.mode){case P:if(0===r.wrap){r.mode=13;break}for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}if(2&r.wrap&&35615===u){E[r.check=0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0),l=u=0,r.mode=2;break}if(r.flags=0,r.head&&(r.head.done=!1),!(1&r.wrap)||(((255&u)<<8)+(u>>8))%31){e.msg="incorrect header check",r.mode=30;break}if(8!=(15&u)){e.msg="unknown compression method",r.mode=30;break}if(l-=4,k=8+(15&(u>>>=4)),0===r.wbits)r.wbits=k;else if(k>r.wbits){e.msg="invalid window size",r.mode=30;break}r.dmax=1<<k,e.adler=r.check=1,r.mode=512&u?10:12,l=u=0;break;case 2:for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}if(r.flags=u,8!=(255&r.flags)){e.msg="unknown compression method",r.mode=30;break}if(57344&r.flags){e.msg="unknown header flags set",r.mode=30;break}r.head&&(r.head.text=u>>8&1),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=3;case 3:for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}r.head&&(r.head.time=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,E[2]=u>>>16&255,E[3]=u>>>24&255,r.check=B(r.check,E,4,0)),l=u=0,r.mode=4;case 4:for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}r.head&&(r.head.xflags=255&u,r.head.os=u>>8),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=5;case 5:if(1024&r.flags){for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}r.length=u,r.head&&(r.head.extra_len=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0;}else r.head&&(r.head.extra=null);r.mode=6;case 6:if(1024&r.flags&&(o<(d=r.length)&&(d=o),d&&(r.head&&(k=r.head.extra_len-r.length,r.head.extra||(r.head.extra=new Array(r.head.extra_len)),I.arraySet(r.head.extra,n,s,d,k)),512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,r.length-=d),r.length))break e;r.length=0,r.mode=7;case 7:if(2048&r.flags){if(0===o)break e;for(d=0;k=n[s+d++],r.head&&k&&r.length<65536&&(r.head.name+=String.fromCharCode(k)),k&&d<o;);if(512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,k)break e}else r.head&&(r.head.name=null);r.length=0,r.mode=8;case 8:if(4096&r.flags){if(0===o)break e;for(d=0;k=n[s+d++],r.head&&k&&r.length<65536&&(r.head.comment+=String.fromCharCode(k)),k&&d<o;);if(512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,k)break e}else r.head&&(r.head.comment=null);r.mode=9;case 9:if(512&r.flags){for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}if(u!==(65535&r.check)){e.msg="header crc mismatch",r.mode=30;break}l=u=0;}r.head&&(r.head.hcrc=r.flags>>9&1,r.head.done=!0),e.adler=r.check=0,r.mode=12;break;case 10:for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}e.adler=r.check=L(u),l=u=0,r.mode=11;case 11:if(0===r.havedict)return e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,2;e.adler=r.check=1,r.mode=12;case 12:if(5===t||6===t)break e;case 13:if(r.last){u>>>=7&l,l-=7&l,r.mode=27;break}for(;l<3;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}switch(r.last=1&u,l-=1,3&(u>>>=1)){case 0:r.mode=14;break;case 1:if(j(r),r.mode=20,6!==t)break;u>>>=2,l-=2;break e;case 2:r.mode=17;break;case 3:e.msg="invalid block type",r.mode=30;}u>>>=2,l-=2;break;case 14:for(u>>>=7&l,l-=7&l;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}if((65535&u)!=(u>>>16^65535)){e.msg="invalid stored block lengths",r.mode=30;break}if(r.length=65535&u,l=u=0,r.mode=15,6===t)break e;case 15:r.mode=16;case 16:if(d=r.length){if(o<d&&(d=o),h<d&&(d=h),0===d)break e;I.arraySet(i,n,s,d,a),o-=d,s+=d,h-=d,a+=d,r.length-=d;break}r.mode=12;break;case 17:for(;l<14;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}if(r.nlen=257+(31&u),u>>>=5,l-=5,r.ndist=1+(31&u),u>>>=5,l-=5,r.ncode=4+(15&u),u>>>=4,l-=4,286<r.nlen||30<r.ndist){e.msg="too many length or distance symbols",r.mode=30;break}r.have=0,r.mode=18;case 18:for(;r.have<r.ncode;){for(;l<3;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}r.lens[A[r.have++]]=7&u,u>>>=3,l-=3;}for(;r.have<19;)r.lens[A[r.have++]]=0;if(r.lencode=r.lendyn,r.lenbits=7,S={bits:r.lenbits},x=T(0,r.lens,0,19,r.lencode,0,r.work,S),r.lenbits=S.bits,x){e.msg="invalid code lengths set",r.mode=30;break}r.have=0,r.mode=19;case 19:for(;r.have<r.nlen+r.ndist;){for(;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}if(b<16)u>>>=_,l-=_,r.lens[r.have++]=b;else {if(16===b){for(z=_+2;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}if(u>>>=_,l-=_,0===r.have){e.msg="invalid bit length repeat",r.mode=30;break}k=r.lens[r.have-1],d=3+(3&u),u>>>=2,l-=2;}else if(17===b){for(z=_+3;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}l-=_,k=0,d=3+(7&(u>>>=_)),u>>>=3,l-=3;}else {for(z=_+7;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}l-=_,k=0,d=11+(127&(u>>>=_)),u>>>=7,l-=7;}if(r.have+d>r.nlen+r.ndist){e.msg="invalid bit length repeat",r.mode=30;break}for(;d--;)r.lens[r.have++]=k;}}if(30===r.mode)break;if(0===r.lens[256]){e.msg="invalid code -- missing end-of-block",r.mode=30;break}if(r.lenbits=9,S={bits:r.lenbits},x=T(D,r.lens,0,r.nlen,r.lencode,0,r.work,S),r.lenbits=S.bits,x){e.msg="invalid literal/lengths set",r.mode=30;break}if(r.distbits=6,r.distcode=r.distdyn,S={bits:r.distbits},x=T(F,r.lens,r.nlen,r.ndist,r.distcode,0,r.work,S),r.distbits=S.bits,x){e.msg="invalid distances set",r.mode=30;break}if(r.mode=20,6===t)break e;case 20:r.mode=21;case 21:if(6<=o&&258<=h){e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,R(e,c),a=e.next_out,i=e.output,h=e.avail_out,s=e.next_in,n=e.input,o=e.avail_in,u=r.hold,l=r.bits,12===r.mode&&(r.back=-1);break}for(r.back=0;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}if(g&&0==(240&g)){for(v=_,y=g,w=b;g=(C=r.lencode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}u>>>=v,l-=v,r.back+=v;}if(u>>>=_,l-=_,r.back+=_,r.length=b,0===g){r.mode=26;break}if(32&g){r.back=-1,r.mode=12;break}if(64&g){e.msg="invalid literal/length code",r.mode=30;break}r.extra=15&g,r.mode=22;case 22:if(r.extra){for(z=r.extra;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}r.length+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra;}r.was=r.length,r.mode=23;case 23:for(;g=(C=r.distcode[u&(1<<r.distbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}if(0==(240&g)){for(v=_,y=g,w=b;g=(C=r.distcode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}u>>>=v,l-=v,r.back+=v;}if(u>>>=_,l-=_,r.back+=_,64&g){e.msg="invalid distance code",r.mode=30;break}r.offset=b,r.extra=15&g,r.mode=24;case 24:if(r.extra){for(z=r.extra;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}r.offset+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra;}if(r.offset>r.dmax){e.msg="invalid distance too far back",r.mode=30;break}r.mode=25;case 25:if(0===h)break e;if(d=c-h,r.offset>d){if((d=r.offset-d)>r.whave&&r.sane){e.msg="invalid distance too far back",r.mode=30;break}p=d>r.wnext?(d-=r.wnext,r.wsize-d):r.wnext-d,d>r.length&&(d=r.length),m=r.window;}else m=i,p=a-r.offset,d=r.length;for(h<d&&(d=h),h-=d,r.length-=d;i[a++]=m[p++],--d;);0===r.length&&(r.mode=21);break;case 26:if(0===h)break e;i[a++]=r.length,h--,r.mode=21;break;case 27:if(r.wrap){for(;l<32;){if(0===o)break e;o--,u|=n[s++]<<l,l+=8;}if(c-=h,e.total_out+=c,r.total+=c,c&&(e.adler=r.check=r.flags?B(r.check,i,c,a-c):O(r.check,i,c,a-c)),c=h,(r.flags?u:L(u))!==r.check){e.msg="incorrect data check",r.mode=30;break}l=u=0;}r.mode=28;case 28:if(r.wrap&&r.flags){for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}if(u!==(4294967295&r.total)){e.msg="incorrect length check",r.mode=30;break}l=u=0;}r.mode=29;case 29:x=1;break e;case 30:x=-3;break e;case 31:return -4;case 32:default:return U}return e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,(r.wsize||c!==e.avail_out&&r.mode<30&&(r.mode<27||4!==t))&&Z(e,e.output,e.next_out,c-e.avail_out)?(r.mode=31,-4):(f-=e.avail_in,c-=e.avail_out,e.total_in+=f,e.total_out+=c,r.total+=c,r.wrap&&c&&(e.adler=r.check=r.flags?B(r.check,i,c,e.next_out-c):O(r.check,i,c,e.next_out-c)),e.data_type=r.bits+(r.last?64:0)+(12===r.mode?128:0)+(20===r.mode||15===r.mode?256:0),(0==f&&0===c||4===t)&&x===N&&(x=-5),x)},r.inflateEnd=function(e){if(!e||!e.state)return U;var t=e.state;return t.window&&(t.window=null),e.state=null,N},r.inflateGetHeader=function(e,t){var r;return e&&e.state?0==(2&(r=e.state).wrap)?U:((r.head=t).done=!1,N):U},r.inflateSetDictionary=function(e,t){var r,n=t.length;return e&&e.state?0!==(r=e.state).wrap&&11!==r.mode?U:11===r.mode&&O(1,t,n,0)!==r.check?-3:Z(e,t,n,n)?(r.mode=31,-4):(r.havedict=1,N):U},r.inflateInfo="pako inflate (from Nodeca project)";},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(e,t,r){"use strict";var D=e("../utils/common"),F=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],N=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],U=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],P=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(e,t,r,n,i,s,a,o){var h,u,l,f,c,d,p,m,_,g=o.bits,b=0,v=0,y=0,w=0,k=0,x=0,S=0,z=0,C=0,E=0,A=null,I=0,O=new D.Buf16(16),B=new D.Buf16(16),R=null,T=0;for(b=0;b<=15;b++)O[b]=0;for(v=0;v<n;v++)O[t[r+v]]++;for(k=g,w=15;1<=w&&0===O[w];w--);if(w<k&&(k=w),0===w)return i[s++]=20971520,i[s++]=20971520,o.bits=1,0;for(y=1;y<w&&0===O[y];y++);for(k<y&&(k=y),b=z=1;b<=15;b++)if(z<<=1,(z-=O[b])<0)return -1;if(0<z&&(0===e||1!==w))return -1;for(B[1]=0,b=1;b<15;b++)B[b+1]=B[b]+O[b];for(v=0;v<n;v++)0!==t[r+v]&&(a[B[t[r+v]]++]=v);if(d=0===e?(A=R=a,19):1===e?(A=F,I-=257,R=N,T-=257,256):(A=U,R=P,-1),b=y,c=s,S=v=E=0,l=-1,f=(C=1<<(x=k))-1,1===e&&852<C||2===e&&592<C)return 1;for(;;){for(p=b-S,_=a[v]<d?(m=0,a[v]):a[v]>d?(m=R[T+a[v]],A[I+a[v]]):(m=96,0),h=1<<b-S,y=u=1<<x;i[c+(E>>S)+(u-=h)]=p<<24|m<<16|_|0,0!==u;);for(h=1<<b-1;E&h;)h>>=1;if(0!==h?(E&=h-1,E+=h):E=0,v++,0==--O[b]){if(b===w)break;b=t[r+a[v]];}if(k<b&&(E&f)!==l){for(0===S&&(S=k),c+=y,z=1<<(x=b-S);x+S<w&&!((z-=O[x+S])<=0);)x++,z<<=1;if(C+=1<<x,1===e&&852<C||2===e&&592<C)return 1;i[l=E&f]=k<<24|x<<16|c-s|0;}}return 0!==E&&(i[c+E]=b-S<<24|64<<16|0),o.bits=k,0};},{"../utils/common":41}],51:[function(e,t,r){"use strict";t.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"};},{}],52:[function(e,t,r){"use strict";var i=e("../utils/common"),o=0,h=1;function n(e){for(var t=e.length;0<=--t;)e[t]=0;}var s=0,a=29,u=256,l=u+1+a,f=30,c=19,_=2*l+1,g=15,d=16,p=7,m=256,b=16,v=17,y=18,w=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],k=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],x=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],S=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],z=new Array(2*(l+2));n(z);var C=new Array(2*f);n(C);var E=new Array(512);n(E);var A=new Array(256);n(A);var I=new Array(a);n(I);var O,B,R,T=new Array(f);function D(e,t,r,n,i){this.static_tree=e,this.extra_bits=t,this.extra_base=r,this.elems=n,this.max_length=i,this.has_stree=e&&e.length;}function F(e,t){this.dyn_tree=e,this.max_code=0,this.stat_desc=t;}function N(e){return e<256?E[e]:E[256+(e>>>7)]}function U(e,t){e.pending_buf[e.pending++]=255&t,e.pending_buf[e.pending++]=t>>>8&255;}function P(e,t,r){e.bi_valid>d-r?(e.bi_buf|=t<<e.bi_valid&65535,U(e,e.bi_buf),e.bi_buf=t>>d-e.bi_valid,e.bi_valid+=r-d):(e.bi_buf|=t<<e.bi_valid&65535,e.bi_valid+=r);}function L(e,t,r){P(e,r[2*t],r[2*t+1]);}function j(e,t){for(var r=0;r|=1&e,e>>>=1,r<<=1,0<--t;);return r>>>1}function Z(e,t,r){var n,i,s=new Array(g+1),a=0;for(n=1;n<=g;n++)s[n]=a=a+r[n-1]<<1;for(i=0;i<=t;i++){var o=e[2*i+1];0!==o&&(e[2*i]=j(s[o]++,o));}}function W(e){var t;for(t=0;t<l;t++)e.dyn_ltree[2*t]=0;for(t=0;t<f;t++)e.dyn_dtree[2*t]=0;for(t=0;t<c;t++)e.bl_tree[2*t]=0;e.dyn_ltree[2*m]=1,e.opt_len=e.static_len=0,e.last_lit=e.matches=0;}function M(e){8<e.bi_valid?U(e,e.bi_buf):0<e.bi_valid&&(e.pending_buf[e.pending++]=e.bi_buf),e.bi_buf=0,e.bi_valid=0;}function H(e,t,r,n){var i=2*t,s=2*r;return e[i]<e[s]||e[i]===e[s]&&n[t]<=n[r]}function G(e,t,r){for(var n=e.heap[r],i=r<<1;i<=e.heap_len&&(i<e.heap_len&&H(t,e.heap[i+1],e.heap[i],e.depth)&&i++,!H(t,n,e.heap[i],e.depth));)e.heap[r]=e.heap[i],r=i,i<<=1;e.heap[r]=n;}function K(e,t,r){var n,i,s,a,o=0;if(0!==e.last_lit)for(;n=e.pending_buf[e.d_buf+2*o]<<8|e.pending_buf[e.d_buf+2*o+1],i=e.pending_buf[e.l_buf+o],o++,0===n?L(e,i,t):(L(e,(s=A[i])+u+1,t),0!==(a=w[s])&&P(e,i-=I[s],a),L(e,s=N(--n),r),0!==(a=k[s])&&P(e,n-=T[s],a)),o<e.last_lit;);L(e,m,t);}function Y(e,t){var r,n,i,s=t.dyn_tree,a=t.stat_desc.static_tree,o=t.stat_desc.has_stree,h=t.stat_desc.elems,u=-1;for(e.heap_len=0,e.heap_max=_,r=0;r<h;r++)0!==s[2*r]?(e.heap[++e.heap_len]=u=r,e.depth[r]=0):s[2*r+1]=0;for(;e.heap_len<2;)s[2*(i=e.heap[++e.heap_len]=u<2?++u:0)]=1,e.depth[i]=0,e.opt_len--,o&&(e.static_len-=a[2*i+1]);for(t.max_code=u,r=e.heap_len>>1;1<=r;r--)G(e,s,r);for(i=h;r=e.heap[1],e.heap[1]=e.heap[e.heap_len--],G(e,s,1),n=e.heap[1],e.heap[--e.heap_max]=r,e.heap[--e.heap_max]=n,s[2*i]=s[2*r]+s[2*n],e.depth[i]=(e.depth[r]>=e.depth[n]?e.depth[r]:e.depth[n])+1,s[2*r+1]=s[2*n+1]=i,e.heap[1]=i++,G(e,s,1),2<=e.heap_len;);e.heap[--e.heap_max]=e.heap[1],function(e,t){var r,n,i,s,a,o,h=t.dyn_tree,u=t.max_code,l=t.stat_desc.static_tree,f=t.stat_desc.has_stree,c=t.stat_desc.extra_bits,d=t.stat_desc.extra_base,p=t.stat_desc.max_length,m=0;for(s=0;s<=g;s++)e.bl_count[s]=0;for(h[2*e.heap[e.heap_max]+1]=0,r=e.heap_max+1;r<_;r++)p<(s=h[2*h[2*(n=e.heap[r])+1]+1]+1)&&(s=p,m++),h[2*n+1]=s,u<n||(e.bl_count[s]++,a=0,d<=n&&(a=c[n-d]),o=h[2*n],e.opt_len+=o*(s+a),f&&(e.static_len+=o*(l[2*n+1]+a)));if(0!==m){do{for(s=p-1;0===e.bl_count[s];)s--;e.bl_count[s]--,e.bl_count[s+1]+=2,e.bl_count[p]--,m-=2;}while(0<m);for(s=p;0!==s;s--)for(n=e.bl_count[s];0!==n;)u<(i=e.heap[--r])||(h[2*i+1]!==s&&(e.opt_len+=(s-h[2*i+1])*h[2*i],h[2*i+1]=s),n--);}}(e,t),Z(s,u,e.bl_count);}function X(e,t,r){var n,i,s=-1,a=t[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),t[2*(r+1)+1]=65535,n=0;n<=r;n++)i=a,a=t[2*(n+1)+1],++o<h&&i===a||(o<u?e.bl_tree[2*i]+=o:0!==i?(i!==s&&e.bl_tree[2*i]++,e.bl_tree[2*b]++):o<=10?e.bl_tree[2*v]++:e.bl_tree[2*y]++,s=i,u=(o=0)===a?(h=138,3):i===a?(h=6,3):(h=7,4));}function V(e,t,r){var n,i,s=-1,a=t[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),n=0;n<=r;n++)if(i=a,a=t[2*(n+1)+1],!(++o<h&&i===a)){if(o<u)for(;L(e,i,e.bl_tree),0!=--o;);else 0!==i?(i!==s&&(L(e,i,e.bl_tree),o--),L(e,b,e.bl_tree),P(e,o-3,2)):o<=10?(L(e,v,e.bl_tree),P(e,o-3,3)):(L(e,y,e.bl_tree),P(e,o-11,7));s=i,u=(o=0)===a?(h=138,3):i===a?(h=6,3):(h=7,4);}}n(T);var q=!1;function J(e,t,r,n){P(e,(s<<1)+(n?1:0),3),function(e,t,r,n){M(e),n&&(U(e,r),U(e,~r)),i.arraySet(e.pending_buf,e.window,t,r,e.pending),e.pending+=r;}(e,t,r,!0);}r._tr_init=function(e){q||(function(){var e,t,r,n,i,s=new Array(g+1);for(n=r=0;n<a-1;n++)for(I[n]=r,e=0;e<1<<w[n];e++)A[r++]=n;for(A[r-1]=n,n=i=0;n<16;n++)for(T[n]=i,e=0;e<1<<k[n];e++)E[i++]=n;for(i>>=7;n<f;n++)for(T[n]=i<<7,e=0;e<1<<k[n]-7;e++)E[256+i++]=n;for(t=0;t<=g;t++)s[t]=0;for(e=0;e<=143;)z[2*e+1]=8,e++,s[8]++;for(;e<=255;)z[2*e+1]=9,e++,s[9]++;for(;e<=279;)z[2*e+1]=7,e++,s[7]++;for(;e<=287;)z[2*e+1]=8,e++,s[8]++;for(Z(z,l+1,s),e=0;e<f;e++)C[2*e+1]=5,C[2*e]=j(e,5);O=new D(z,w,u+1,l,g),B=new D(C,k,0,f,g),R=new D(new Array(0),x,0,c,p);}(),q=!0),e.l_desc=new F(e.dyn_ltree,O),e.d_desc=new F(e.dyn_dtree,B),e.bl_desc=new F(e.bl_tree,R),e.bi_buf=0,e.bi_valid=0,W(e);},r._tr_stored_block=J,r._tr_flush_block=function(e,t,r,n){var i,s,a=0;0<e.level?(2===e.strm.data_type&&(e.strm.data_type=function(e){var t,r=4093624447;for(t=0;t<=31;t++,r>>>=1)if(1&r&&0!==e.dyn_ltree[2*t])return o;if(0!==e.dyn_ltree[18]||0!==e.dyn_ltree[20]||0!==e.dyn_ltree[26])return h;for(t=32;t<u;t++)if(0!==e.dyn_ltree[2*t])return h;return o}(e)),Y(e,e.l_desc),Y(e,e.d_desc),a=function(e){var t;for(X(e,e.dyn_ltree,e.l_desc.max_code),X(e,e.dyn_dtree,e.d_desc.max_code),Y(e,e.bl_desc),t=c-1;3<=t&&0===e.bl_tree[2*S[t]+1];t--);return e.opt_len+=3*(t+1)+5+5+4,t}(e),i=e.opt_len+3+7>>>3,(s=e.static_len+3+7>>>3)<=i&&(i=s)):i=s=r+5,r+4<=i&&-1!==t?J(e,t,r,n):4===e.strategy||s===i?(P(e,2+(n?1:0),3),K(e,z,C)):(P(e,4+(n?1:0),3),function(e,t,r,n){var i;for(P(e,t-257,5),P(e,r-1,5),P(e,n-4,4),i=0;i<n;i++)P(e,e.bl_tree[2*S[i]+1],3);V(e,e.dyn_ltree,t-1),V(e,e.dyn_dtree,r-1);}(e,e.l_desc.max_code+1,e.d_desc.max_code+1,a+1),K(e,e.dyn_ltree,e.dyn_dtree)),W(e),n&&M(e);},r._tr_tally=function(e,t,r){return e.pending_buf[e.d_buf+2*e.last_lit]=t>>>8&255,e.pending_buf[e.d_buf+2*e.last_lit+1]=255&t,e.pending_buf[e.l_buf+e.last_lit]=255&r,e.last_lit++,0===t?e.dyn_ltree[2*r]++:(e.matches++,t--,e.dyn_ltree[2*(A[r]+u+1)]++,e.dyn_dtree[2*N(t)]++),e.last_lit===e.lit_bufsize-1},r._tr_align=function(e){P(e,2,3),L(e,m,z),function(e){16===e.bi_valid?(U(e,e.bi_buf),e.bi_buf=0,e.bi_valid=0):8<=e.bi_valid&&(e.pending_buf[e.pending++]=255&e.bi_buf,e.bi_buf>>=8,e.bi_valid-=8);}(e);};},{"../utils/common":41}],53:[function(e,t,r){"use strict";t.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0;};},{}],54:[function(e,t,r){(function(e){!function(r,n){"use strict";if(!r.setImmediate){var i,s,t,a,o=1,h={},u=!1,l=r.document,e=Object.getPrototypeOf&&Object.getPrototypeOf(r);e=e&&e.setTimeout?e:r,i="[object process]"==={}.toString.call(r.process)?function(e){browser$1.nextTick(function(){c(e);});}:function(){if(r.postMessage&&!r.importScripts){var e=!0,t=r.onmessage;return r.onmessage=function(){e=!1;},r.postMessage("","*"),r.onmessage=t,e}}()?(a="setImmediate$"+Math.random()+"$",r.addEventListener?r.addEventListener("message",d,!1):r.attachEvent("onmessage",d),function(e){r.postMessage(a+e,"*");}):r.MessageChannel?((t=new MessageChannel).port1.onmessage=function(e){c(e.data);},function(e){t.port2.postMessage(e);}):l&&"onreadystatechange"in l.createElement("script")?(s=l.documentElement,function(e){var t=l.createElement("script");t.onreadystatechange=function(){c(e),t.onreadystatechange=null,s.removeChild(t),t=null;},s.appendChild(t);}):function(e){setTimeout(c,0,e);},e.setImmediate=function(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),r=0;r<t.length;r++)t[r]=arguments[r+1];var n={callback:e,args:t};return h[o]=n,i(o),o++},e.clearImmediate=f;}function f(e){delete h[e];}function c(e){if(u)setTimeout(c,0,e);else {var t=h[e];if(t){u=!0;try{!function(e){var t=e.callback,r=e.args;switch(r.length){case 0:t();break;case 1:t(r[0]);break;case 2:t(r[0],r[1]);break;case 3:t(r[0],r[1],r[2]);break;default:t.apply(n,r);}}(t);}finally{f(e),u=!1;}}}}function d(e){e.source===r&&"string"==typeof e.data&&0===e.data.indexOf(a)&&c(+e.data.slice(a.length));}}("undefined"==typeof self?void 0===e?this:e:self);}).call(this,"undefined"!=typeof commonjsGlobal?commonjsGlobal:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});},{}]},{},[10])(10)});
});

const e=(()=>{if("undefined"==typeof self)return !1;if("top"in self&&self!==top)try{top.window.document._=0;}catch(e){return !1}return "showOpenFilePicker"in self})(),t=e?Promise.resolve().then(function(){return l}):Promise.resolve().then(function(){return v});async function n(...e){return (await t).default(...e)}const r=e?Promise.resolve().then(function(){return y}):Promise.resolve().then(function(){return b});async function i(...e){return (await r).default(...e)}const a=e?Promise.resolve().then(function(){return m}):Promise.resolve().then(function(){return k});async function o(...e){return (await a).default(...e)}const s=async e=>{const t=await e.getFile();return t.handle=e,t};var c=async(e=[{}])=>{Array.isArray(e)||(e=[e]);const t=[];e.forEach((e,n)=>{t[n]={description:e.description||"Files",accept:{}},e.mimeTypes?e.mimeTypes.map(r=>{t[n].accept[r]=e.extensions||[];}):t[n].accept["*/*"]=e.extensions||[];});const n=await window.showOpenFilePicker({id:e[0].id,startIn:e[0].startIn,types:t,multiple:e[0].multiple||!1,excludeAcceptAllOption:e[0].excludeAcceptAllOption||!1}),r=await Promise.all(n.map(s));return e[0].multiple?r:r[0]},l={__proto__:null,default:c};function u(e){function t(e){if(Object(e)!==e)return Promise.reject(new TypeError(e+" is not an object."));var t=e.done;return Promise.resolve(e.value).then(function(e){return {value:e,done:t}})}return u=function(e){this.s=e,this.n=e.next;},u.prototype={s:null,n:null,next:function(){return t(this.n.apply(this.s,arguments))},return:function(e){var n=this.s.return;return void 0===n?Promise.resolve({value:e,done:!0}):t(n.apply(this.s,arguments))},throw:function(e){var n=this.s.return;return void 0===n?Promise.reject(e):t(n.apply(this.s,arguments))}},new u(e)}const p=async(e,t,n=e.name,r)=>{const i=[],a=[];var o,s=!1,c=!1;try{for(var l,d=function(e){var t,n,r,i=2;for("undefined"!=typeof Symbol&&(n=Symbol.asyncIterator,r=Symbol.iterator);i--;){if(n&&null!=(t=e[n]))return t.call(e);if(r&&null!=(t=e[r]))return new u(t.call(e));n="@@asyncIterator",r="@@iterator";}throw new TypeError("Object is not async iterable")}(e.values());s=!(l=await d.next()).done;s=!1){const o=l.value,s=`${n}/${o.name}`;"file"===o.kind?a.push(o.getFile().then(t=>(t.directoryHandle=e,t.handle=o,Object.defineProperty(t,"webkitRelativePath",{configurable:!0,enumerable:!0,get:()=>s})))):"directory"!==o.kind||!t||r&&r(o)||i.push(p(o,t,s,r));}}catch(e){c=!0,o=e;}finally{try{s&&null!=d.return&&await d.return();}finally{if(c)throw o}}return [...(await Promise.all(i)).flat(),...await Promise.all(a)]};var d=async(e={})=>{e.recursive=e.recursive||!1,e.mode=e.mode||"read";const t=await window.showDirectoryPicker({id:e.id,startIn:e.startIn,mode:e.mode});return (await(await t.values()).next()).done?[t]:p(t,e.recursive,void 0,e.skipDirectory)},y={__proto__:null,default:d},f=async(e,t=[{}],n=null,r=!1,i=null)=>{Array.isArray(t)||(t=[t]),t[0].fileName=t[0].fileName||"Untitled";const a=[];let o=null;if(e instanceof Blob&&e.type?o=e.type:e.headers&&e.headers.get("content-type")&&(o=e.headers.get("content-type")),t.forEach((e,t)=>{a[t]={description:e.description||"Files",accept:{}},e.mimeTypes?(0===t&&o&&e.mimeTypes.push(o),e.mimeTypes.map(n=>{a[t].accept[n]=e.extensions||[];})):o?a[t].accept[o]=e.extensions||[]:a[t].accept["*/*"]=e.extensions||[];}),n)try{await n.getFile();}catch(e){if(n=null,r)throw e}const s=n||await window.showSaveFilePicker({suggestedName:t[0].fileName,id:t[0].id,startIn:t[0].startIn,types:a,excludeAcceptAllOption:t[0].excludeAcceptAllOption||!1});!n&&i&&i(s);const c=await s.createWritable();if("stream"in e){const t=e.stream();return await t.pipeTo(c),s}return "body"in e?(await e.body.pipeTo(c),s):(await c.write(await e),await c.close(),s)},m={__proto__:null,default:f},w=async(e=[{}])=>(Array.isArray(e)||(e=[e]),new Promise((t,n)=>{const r=document.createElement("input");r.type="file";const i=[...e.map(e=>e.mimeTypes||[]),...e.map(e=>e.extensions||[])].join();r.multiple=e[0].multiple||!1,r.accept=i||"",r.style.display="none",document.body.append(r);const a=e=>{"function"==typeof o&&o(),t(e);},o=e[0].legacySetup&&e[0].legacySetup(a,()=>o(n),r),s=()=>{window.removeEventListener("focus",s),r.remove();};r.addEventListener("click",()=>{window.addEventListener("focus",s);}),r.addEventListener("change",()=>{window.removeEventListener("focus",s),r.remove(),a(r.multiple?Array.from(r.files):r.files[0]);}),"showPicker"in HTMLInputElement.prototype?r.showPicker():r.click();})),v={__proto__:null,default:w},h=async(e=[{}])=>(Array.isArray(e)||(e=[e]),e[0].recursive=e[0].recursive||!1,new Promise((t,n)=>{const r=document.createElement("input");r.type="file",r.webkitdirectory=!0;const i=e=>{"function"==typeof a&&a(),t(e);},a=e[0].legacySetup&&e[0].legacySetup(i,()=>a(n),r);r.addEventListener("change",()=>{let t=Array.from(r.files);e[0].recursive?e[0].recursive&&e[0].skipDirectory&&(t=t.filter(t=>t.webkitRelativePath.split("/").every(t=>!e[0].skipDirectory({name:t,kind:"directory"})))):t=t.filter(e=>2===e.webkitRelativePath.split("/").length),i(t);}),"showPicker"in HTMLInputElement.prototype?r.showPicker():r.click();})),b={__proto__:null,default:h},P=async(e,t={})=>{Array.isArray(t)&&(t=t[0]);const n=document.createElement("a");let r=e;"body"in e&&(r=await async function(e,t){const n=e.getReader(),r=new ReadableStream({start:e=>async function t(){return n.read().then(({done:n,value:r})=>{if(!n)return e.enqueue(r),t();e.close();})}()}),i=new Response(r),a=await i.blob();return n.releaseLock(),new Blob([a],{type:t})}(e.body,e.headers.get("content-type"))),n.download=t.fileName||"Untitled",n.href=URL.createObjectURL(await r);const i=()=>{"function"==typeof a&&a();},a=t.legacySetup&&t.legacySetup(i,()=>a(),n);return n.addEventListener("click",()=>{setTimeout(()=>URL.revokeObjectURL(n.href),3e4),i();}),n.click(),null},k={__proto__:null,default:P};

const jeepSqliteCss = ":host{display:block;--jeep-sqlite-top:10%;--jeep-sqlite-right:1%;--jeep-sqlite-font-size:2em;--jeep-sqlite-padding:2%;--jeep-sqlite-background-color:#a9a9a9;--jeep-sqlite-color:#ffffff}#fileElem{display:none}#pickButton{position:absolute;top:var(--jeep-sqlite-top);right:var(--jeep-sqlite-right);font-size:var(--jeep-sqlite-font-size);padding:var(--jeep-sqlite-padding);background-color:var(--jeep-sqlite-background-color);color:var(--jeep-sqlite-color)}#saveButton{position:absolute;top:var(--jeep-sqlite-top);right:var(--jeep-sqlite-right);font-size:var(--jeep-sqlite-font-size);padding:var(--jeep-sqlite-padding);background-color:var(--jeep-sqlite-background-color);color:var(--jeep-sqlite-color)}";

const JeepSqlite = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.importProgress = createEvent(this, "jeepSqliteImportProgress", 7);
    this.exportProgress = createEvent(this, "jeepSqliteExportProgress", 7);
    this.HTTPRequestEnded = createEvent(this, "jeepSqliteHTTPRequestEnded", 7);
    this.PickDatabaseEnded = createEvent(this, "jeepSqlitePickDatabaseEnded", 7);
    this.SaveDatabaseEnded = createEvent(this, "jeepSqliteSaveDatabaseToDisk", 7);
    this.isStore = false;
    this._dbDict = {};
    this.databaseList = {};
    this._versionUpgrades = {};
    this._overwrite = true;
    this.autoSave = false;
    this.typeOrm = false;
    this.wasmPath = undefined;
    this.pickText = undefined;
    this.saveText = undefined;
    this.buttonOptions = undefined;
    this.innerAutoSave = undefined;
    this.innerTypeOrm = undefined;
    this.innerWasmPath = undefined;
    this.innerPickText = undefined;
    this.innerSaveText = undefined;
    this.innerButtonOptions = undefined;
  }
  //*****************************
  //* Watch on Property Changes *
  //*****************************
  parseAutoSave(newValue) {
    this.innerAutoSave = newValue;
  }
  parseTypeOrm(newValue) {
    this.innerTypeOrm = newValue;
  }
  parseWasmPath(newValue) {
    this.innerWasmPath = newValue;
  }
  parsePickText(newValue) {
    this.innerPickText = newValue;
  }
  parseSaveText(newValue) {
    this.innerSaveText = newValue;
  }
  parseButtonOptions(newValue) {
    this.innerButtonOptions = JSON.parse(newValue);
    const keys = Object.keys(this.innerButtonOptions);
    for (const key of keys) {
      switch (key) {
        case "top": {
          this.el.style.setProperty('--jeep-sqlite-top', this.innerButtonOptions[key]);
          break;
        }
        case "right": {
          this.el.style.setProperty('--jeep-sqlite-right', this.innerButtonOptions[key]);
          break;
        }
        case "fontSize": {
          this.el.style.setProperty('--jeep-sqlite-font-size', this.innerButtonOptions[key]);
          break;
        }
        case "padding": {
          this.el.style.setProperty('--jeep-sqlite-padding', this.innerButtonOptions[key]);
          break;
        }
        case "backgroundColor": {
          this.el.style.setProperty('--jeep-sqlite-background-color', this.innerButtonOptions[key]);
          break;
        }
        case "color": {
          this.el.style.setProperty('--jeep-sqlite-color', this.innerButtonOptions[key]);
          break;
        }
      }
    }
  }
  //**********************
  //* Method Definitions *
  //**********************
  async echo(options) {
    return options;
  }
  async createConnection(options) {
    if (!this.isStore) {
      return Promise.reject(`>>> jeep-sqlite StoreName: ${this.storeName} is not opened`);
    }
    const keys = Object.keys(options);
    if (!keys.includes('database')) {
      return Promise.reject('Must provide a database name');
    }
    const dbName = options.database;
    const version = options.version ? options.version : 1;
    const readonly = options.readonly ? options.readonly : false;
    try {
      await this._createConnection(dbName, version, readonly);
      return Promise.resolve();
    }
    catch (err) {
      return Promise.reject(err);
    }
  }
  async isConnection(options) {
    if (!this.isStore) {
      return Promise.reject(`>>> jeep-sqlite StoreName: ${this.storeName} is not opened`);
    }
    const keys = Object.keys(options);
    if (!keys.includes('database')) {
      return Promise.reject('Must provide a database name');
    }
    const dbName = options.database;
    const readonly = options.readonly ? options.readonly : false;
    const ret = await this._isConnection(dbName, readonly);
    return Promise.resolve(ret);
  }
  async closeConnection(options) {
    if (!this.isStore) {
      return Promise.reject(`>>> jeep-sqlite StoreName: ${this.storeName} is not opened`);
    }
    const keys = Object.keys(options);
    if (!keys.includes('database')) {
      return Promise.reject('Must provide a database name');
    }
    const dbName = options.database;
    const readonly = options.readonly ? options.readonly : false;
    try {
      await this._closeConnection(dbName, readonly);
      return Promise.resolve();
    }
    catch (err) {
      return Promise.reject(err);
    }
  }
  async open(options) {
    if (!this.isStore) {
      return Promise.reject(`>>> jeep-sqlite StoreName: ${this.storeName} is not opened`);
    }
    const keys = Object.keys(options);
    if (!keys.includes('database')) {
      return Promise.reject('Must provide a database name');
    }
    const dbName = options.database;
    const readonly = options.readonly ? options.readonly : false;
    try {
      await this._open(dbName, readonly);
      return Promise.resolve();
    }
    catch (err) {
      return Promise.reject(err);
    }
  }
  async close(options) {
    if (!this.isStore) {
      return Promise.reject(`>>> jeep-sqlite StoreName: ${this.storeName} is not opened`);
    }
    const keys = Object.keys(options);
    if (!keys.includes('database')) {
      return Promise.reject('Must provide a database name');
    }
    const dbName = options.database;
    const readonly = options.readonly ? options.readonly : false;
    try {
      await this._close(dbName, readonly);
      return Promise.resolve();
    }
    catch (err) {
      return Promise.reject(err);
    }
  }
  async getVersion(options) {
    if (!this.isStore) {
      return Promise.reject(`>>> jeep-sqlite StoreName: ${this.storeName} is not opened`);
    }
    const keys = Object.keys(options);
    if (!keys.includes('database')) {
      return Promise.reject('Must provide a database name');
    }
    const dbName = options.database;
    const readonly = options.readonly ? options.readonly : false;
    try {
      const res = await this._getVersion(dbName, readonly);
      return Promise.resolve(res);
    }
    catch (err) {
      return Promise.reject(err);
    }
  }
  async beginTransaction(options) {
    if (!this.isStore) {
      return Promise.reject(`>>> jeep-sqlite StoreName: ${this.storeName} is not opened`);
    }
    let keys = Object.keys(options);
    if (!keys.includes('database')) {
      return Promise.reject('Must provide a database name');
    }
    const dbName = options.database;
    const readonly = options.readonly ? options.readonly : false;
    if (readonly) {
      return Promise.reject(`BeginTransaction: not allowed in read-only mode`);
    }
    try {
      const changes = await this._beginTransaction(dbName);
      return Promise.resolve(changes);
    }
    catch (err) {
      return Promise.reject(err);
    }
  }
  async commitTransaction(options) {
    if (!this.isStore) {
      return Promise.reject(`>>> jeep-sqlite StoreName: ${this.storeName} is not opened`);
    }
    let keys = Object.keys(options);
    if (!keys.includes('database')) {
      return Promise.reject('Must provide a database name');
    }
    const dbName = options.database;
    const readonly = options.readonly ? options.readonly : false;
    if (readonly) {
      return Promise.reject(`CommitTransaction: not allowed in read-only mode`);
    }
    try {
      const changes = await this._commitTransaction(dbName);
      return Promise.resolve(changes);
    }
    catch (err) {
      return Promise.reject(err);
    }
  }
  async rollbackTransaction(options) {
    if (!this.isStore) {
      return Promise.reject(`>>> jeep-sqlite StoreName: ${this.storeName} is not opened`);
    }
    let keys = Object.keys(options);
    if (!keys.includes('database')) {
      return Promise.reject('Must provide a database name');
    }
    const dbName = options.database;
    const readonly = options.readonly ? options.readonly : false;
    if (readonly) {
      return Promise.reject(`BeginTransaction: not allowed in read-only mode`);
    }
    try {
      const changes = await this._rollbackTransaction(dbName);
      return Promise.resolve(changes);
    }
    catch (err) {
      return Promise.reject(err);
    }
  }
  async isTransactionActive(options) {
    if (!this.isStore) {
      return Promise.reject(`>>> jeep-sqlite StoreName: ${this.storeName} is not opened`);
    }
    let keys = Object.keys(options);
    if (!keys.includes('database')) {
      return Promise.reject('Must provide a database name');
    }
    const dbName = options.database;
    const readonly = options.readonly ? options.readonly : false;
    if (readonly) {
      return Promise.reject(`isTransactionActive: not allowed in read-only mode`);
    }
    try {
      const res = await this._isTransactionActive(dbName);
      return Promise.resolve(res);
    }
    catch (err) {
      return Promise.reject(err);
    }
  }
  async execute(options) {
    if (!this.isStore) {
      return Promise.reject(`>>> jeep-sqlite StoreName: ${this.storeName} is not opened`);
    }
    let keys = Object.keys(options);
    if (!keys.includes('database')) {
      return Promise.reject('Must provide a database name');
    }
    if (!keys.includes('statements') || options.statements.length === 0) {
      return Promise.reject('Must provide raw SQL statements');
    }
    const dbName = options.database;
    const statements = options.statements;
    let transaction = true;
    const readonly = options.readonly ? options.readonly : false;
    if (keys.includes('transaction'))
      transaction = options.transaction;
    try {
      const changes = await this._execute(dbName, statements, transaction, readonly);
      return Promise.resolve(changes);
    }
    catch (err) {
      return Promise.reject(err);
    }
  }
  async executeSet(options) {
    if (!this.isStore) {
      return Promise.reject(`>>> jeep-sqlite StoreName: ${this.storeName} is not opened`);
    }
    let keys = Object.keys(options);
    if (!keys.includes('database')) {
      return Promise.reject('Must provide a database name');
    }
    if (!keys.includes('set') || options.set.length === 0) {
      return Promise.reject('Must provide a non-empty set of SQL statements');
    }
    const dbName = options.database;
    const setOfStatements = options.set;
    let transaction = true;
    if (keys.includes('transaction'))
      transaction = options.transaction;
    const readonly = options.readonly ? options.readonly : false;
    const returnMode = options.returnMode ? options.returnMode : 'no';
    try {
      const changes = await this._executeSet(dbName, setOfStatements, transaction, readonly, returnMode);
      return Promise.resolve(changes);
    }
    catch (err) {
      return Promise.reject(err);
    }
  }
  async run(options) {
    if (!this.isStore) {
      return Promise.reject(`>>> jeep-sqlite StoreName: ${this.storeName} is not opened`);
    }
    let keys = Object.keys(options);
    if (!keys.includes('database')) {
      return Promise.reject('Must provide a database name');
    }
    if (!keys.includes('statement') || options.statement.length === 0) {
      return Promise.reject('Must provide a run statement');
    }
    const dbName = options.database;
    const statement = options.statement;
    let values = [];
    if (keys.includes('values')) {
      values = options.values.length > 0 ? options.values : [];
    }
    let transaction = true;
    if (keys.includes('transaction'))
      transaction = options.transaction;
    const readonly = options.readonly ? options.readonly : false;
    const returnMode = options.returnMode ? options.returnMode : 'no';
    try {
      const retChanges = await this._run(dbName, statement, values, transaction, readonly, returnMode);
      return Promise.resolve(retChanges);
    }
    catch (err) {
      return Promise.reject(err);
    }
  }
  async query(options) {
    if (!this.isStore) {
      return Promise.reject(`>>> jeep-sqlite StoreName: ${this.storeName} is not opened`);
    }
    let keys = Object.keys(options);
    if (!keys.includes('database')) {
      return Promise.reject('Must provide a database name');
    }
    if (!keys.includes('statement') || options.statement.length === 0) {
      return Promise.reject('Must provide a query statement');
    }
    let values = [];
    if (keys.includes('values')) {
      values = options.values.length > 0 ? options.values : [];
    }
    const dbName = options.database;
    const statement = options.statement;
    const readonly = options.readonly ? options.readonly : false;
    try {
      const retValues = await this._query(dbName, statement, values, readonly);
      return Promise.resolve(retValues);
    }
    catch (err) {
      return Promise.reject(err);
    }
  }
  async getTableList(options) {
    if (!this.isStore) {
      return Promise.reject(`>>> jeep-sqlite StoreName: ${this.storeName} is not opened`);
    }
    let keys = Object.keys(options);
    if (!keys.includes('database')) {
      return Promise.reject('Must provide a database name');
    }
    const dbName = options.database;
    const readonly = options.readonly ? options.readonly : false;
    try {
      const retValues = await this._getTableList(dbName, readonly);
      return Promise.resolve(retValues);
    }
    catch (err) {
      return Promise.reject(err);
    }
  }
  async isDBExists(options) {
    if (!this.isStore) {
      return Promise.reject(`>>> jeep-sqlite StoreName: ${this.storeName} is not opened`);
    }
    const keys = Object.keys(options);
    if (!keys.includes('database')) {
      return Promise.reject('Must provide a database name');
    }
    const dbName = options.database;
    const readonly = options.readonly ? options.readonly : false;
    try {
      const ret = await this._isDBExists(dbName, readonly);
      return Promise.resolve(ret);
    }
    catch (err) {
      return Promise.reject(err);
    }
  }
  async isDBOpen(options) {
    if (!this.isStore) {
      return Promise.reject(`>>> jeep-sqlite StoreName: ${this.storeName} is not opened`);
    }
    const keys = Object.keys(options);
    if (!keys.includes('database')) {
      return Promise.reject('Must provide a database name');
    }
    const dbName = options.database;
    const readonly = options.readonly ? options.readonly : false;
    try {
      const ret = await this._isDBOpen(dbName, readonly);
      return Promise.resolve(ret);
    }
    catch (err) {
      return Promise.reject(err);
    }
  }
  async deleteDatabase(options) {
    if (!this.isStore) {
      return Promise.reject(`>>> jeep-sqlite StoreName: ${this.storeName} is not opened`);
    }
    const keys = Object.keys(options);
    if (!keys.includes('database')) {
      return Promise.reject('Must provide a database name');
    }
    const dbName = options.database;
    const readonly = options.readonly ? options.readonly : false;
    try {
      return await this._deleteDatabase(dbName, readonly);
    }
    catch (err) {
      return Promise.reject(err);
    }
  }
  async isStoreOpen() {
    return Promise.resolve(this.isStore);
  }
  async copyFromAssets(options) {
    let overwrite;
    if (options != null) {
      const keys = Object.keys(options);
      overwrite = keys.includes('overwrite') ? options.overwrite : true;
    }
    else {
      overwrite = true;
    }
    if (!this.isStore) {
      return Promise.reject(`>>> jeep-sqlite StoreName: ${this.storeName} is not opened`);
    }
    try {
      await this._copyFromAssets(overwrite);
      return Promise.resolve();
    }
    catch (err) {
      return Promise.reject(err);
    }
  }
  async isTableExists(options) {
    if (!this.isStore) {
      return Promise.reject(`>>> jeep-sqlite StoreName: ${this.storeName} is not opened`);
    }
    const keys = Object.keys(options);
    if (!keys.includes('database')) {
      return Promise.reject('Must provide a database name');
    }
    const dbName = options.database;
    if (!keys.includes('table')) {
      return Promise.reject('Must provide a table name');
    }
    const tableName = options.table;
    const readonly = options.readonly ? options.readonly : false;
    try {
      const ret = await this._isTableExists(dbName, tableName, readonly);
      return Promise.resolve(ret);
    }
    catch (err) {
      return Promise.reject(err);
    }
  }
  async createSyncTable(options) {
    if (!this.isStore) {
      return Promise.reject(`>>> jeep-sqlite StoreName: ${this.storeName} is not opened`);
    }
    let keys = Object.keys(options);
    if (!keys.includes('database')) {
      return Promise.reject('Must provide a database name');
    }
    const dbName = options.database;
    const readonly = options.readonly ? options.readonly : false;
    try {
      const ret = await this._createSyncTable(dbName, readonly);
      return Promise.resolve(ret);
    }
    catch (err) {
      return Promise.reject(err);
    }
  }
  async getSyncDate(options) {
    if (!this.isStore) {
      return Promise.reject(`>>> jeep-sqlite StoreName: ${this.storeName} is not opened`);
    }
    let keys = Object.keys(options);
    if (!keys.includes('database')) {
      return Promise.reject('Must provide a database name');
    }
    const dbName = options.database;
    const readonly = options.readonly ? options.readonly : false;
    try {
      const ret = await this._getSyncDate(dbName, readonly);
      return Promise.resolve(ret);
    }
    catch (err) {
      return Promise.reject(err);
    }
  }
  async setSyncDate(options) {
    if (!this.isStore) {
      return Promise.reject(`>>> jeep-sqlite StoreName: ${this.storeName} is not opened`);
    }
    let keys = Object.keys(options);
    if (!keys.includes('database')) {
      return Promise.reject('Must provide a database name');
    }
    if (!keys.includes('syncdate')) {
      return Promise.reject('Must provide a synchronization date');
    }
    const dbName = options.database;
    const syncDate = options.syncdate;
    const readonly = options.readonly ? options.readonly : false;
    try {
      await this._setSyncDate(dbName, syncDate, readonly);
      return Promise.resolve();
    }
    catch (err) {
      return Promise.reject(err);
    }
  }
  async isJsonValid(options) {
    const keys = Object.keys(options);
    if (!keys.includes('jsonstring')) {
      return Promise.reject('Must provide a json object');
    }
    const jsonStrObj = options.jsonstring;
    try {
      const ret = await this._isJsonValid(jsonStrObj);
      return Promise.resolve(ret);
    }
    catch (err) {
      return Promise.reject(err);
    }
  }
  async importFromJson(options) {
    if (!this.isStore) {
      return Promise.reject(`>>> jeep-sqlite StoreName: ${this.storeName} is not opened`);
    }
    const keys = Object.keys(options);
    if (!keys.includes('jsonstring')) {
      return Promise.reject('Must provide a json object');
    }
    const jsonStrObj = options.jsonstring;
    try {
      const ret = await this._importFromJson(jsonStrObj);
      return Promise.resolve(ret);
    }
    catch (err) {
      return Promise.reject(err);
    }
  }
  async exportToJson(options) {
    if (!this.isStore) {
      return Promise.reject(`>>> jeep-sqlite StoreName: ${this.storeName} is not opened`);
    }
    const keys = Object.keys(options);
    if (!keys.includes('database')) {
      return Promise.reject('Must provide a database name');
    }
    if (!keys.includes('jsonexportmode')) {
      return Promise.reject('Must provide a json export mode');
    }
    const dbName = options.database;
    const exportMode = options.jsonexportmode;
    const readonly = options.readonly ? options.readonly : false;
    try {
      const ret = await this._exportToJson(dbName, exportMode, readonly);
      return Promise.resolve(ret);
    }
    catch (err) {
      return Promise.reject(err);
    }
  }
  async deleteExportedRows(options) {
    const keys = Object.keys(options);
    if (!keys.includes('database')) {
      return Promise.reject('Must provide a database name');
    }
    const dbName = options.database;
    const readonly = options.readonly ? options.readonly : false;
    try {
      await this._deleteExportedRows(dbName, readonly);
      return Promise.resolve();
    }
    catch (err) {
      return Promise.reject(err);
    }
  }
  async addUpgradeStatement(options) {
    if (!this.isStore) {
      return Promise.reject(`>>> jeep-sqlite StoreName: ${this.storeName} is not opened`);
    }
    let keys = Object.keys(options);
    if (!keys.includes('database')) {
      return Promise.reject('Must provide a database name');
    }
    if (!keys.includes('upgrade')) {
      return Promise.reject('Must provide an upgrade capSQLiteVersionUpgrade Object');
    }
    const dbName = options.database;
    const upgrades = options.upgrade;
    for (const upgrade of upgrades) {
      const versionUpgradeKeys = Object.keys(upgrade);
      if (!versionUpgradeKeys.includes('toVersion') ||
        !versionUpgradeKeys.includes('statements')) {
        return Promise.reject('Must provide an upgrade capSQLiteVersionUpgrade Object');
      }
      if (typeof upgrade.toVersion != 'number') {
        return Promise.reject('upgrade.toVersion must be a number');
      }
      if (this._versionUpgrades[dbName]) {
        this._versionUpgrades[dbName][upgrade.toVersion] = upgrade;
      }
      else {
        const upgVDict = {};
        upgVDict[upgrade.toVersion] = upgrade;
        this._versionUpgrades[dbName] = upgVDict;
      }
    }
    return Promise.resolve();
  }
  async isDatabase(options) {
    if (!this.isStore) {
      return Promise.reject(`>>> jeep-sqlite StoreName: ${this.storeName} is not opened`);
    }
    const keys = Object.keys(options);
    if (!keys.includes('database')) {
      return Promise.reject('Must provide a database name');
    }
    const dbName = options.database;
    try {
      const ret = await this._isDatabase(dbName);
      return Promise.resolve(ret);
    }
    catch (err) {
      return Promise.reject(err);
    }
  }
  async getDatabaseList() {
    if (!this.isStore) {
      return Promise.reject(`>>> jeep-sqlite StoreName: ${this.storeName} is not opened`);
    }
    try {
      const ret = await this._getDatabaseList();
      return Promise.resolve(ret);
    }
    catch (err) {
      return Promise.reject(err);
    }
  }
  async checkConnectionsConsistency(options) {
    if (!this.isStore) {
      return Promise.reject(`>>> jeep-sqlite StoreName: ${this.storeName} is not opened`);
    }
    const keys = Object.keys(options);
    if (!keys.includes('dbNames')) {
      return Promise.reject(`Must provide a list of connection's name`);
    }
    const dbNames = options.dbNames;
    if (!keys.includes('openModes')) {
      return Promise.reject(`Must provide a list of connection's open mode`);
    }
    const openModes = options.openModes;
    try {
      const ret = await this._checkConnectionsConsistency(dbNames, openModes);
      return Promise.resolve(ret);
    }
    catch (err) {
      return Promise.reject(err);
    }
  }
  async saveToStore(options) {
    if (!this.isStore) {
      return Promise.reject(`>>> jeep-sqlite StoreName: ${this.storeName} is not opened`);
    }
    const keys = Object.keys(options);
    if (!keys.includes('database')) {
      return Promise.reject('Must provide a database name');
    }
    const dbName = options.database;
    const readonly = options.readonly ? options.readonly : false;
    try {
      await this._saveToStore(dbName, readonly);
      return Promise.resolve();
    }
    catch (err) {
      return Promise.reject(err);
    }
  }
  async saveToLocalDisk(options) {
    const keys = Object.keys(options);
    if (!keys.includes('database')) {
      return Promise.reject('Must provide a database name');
    }
    const dbName = options.database;
    try {
      await this._saveToLocalDisk(dbName);
      return Promise.resolve();
    }
    catch (err) {
      return Promise.reject(err);
    }
  }
  async getFromLocalDiskToStore(options) {
    const overwrite = options.overwrite ? options.overwrite : true;
    if (e) {
      console.log('Using the File System Access API.');
    }
    else {
      console.log('Using the fallback implementation.');
    }
    try {
      await this._getFromLocalDiskToStore(overwrite);
      return Promise.resolve();
    }
    catch (err) {
      return Promise.reject(err);
    }
  }
  async getFromHTTPRequest(options) {
    if (!this.isStore) {
      return Promise.reject(`>>> jeep-sqlite StoreName: ${this.storeName} is not opened`);
    }
    let keys = Object.keys(options);
    if (!keys.includes('url')) {
      return Promise.reject('Must provide an url');
    }
    const url = options.url;
    const overwrite = options.overwrite ? options.overwrite : true;
    try {
      await this._getFromHTTPRequest(url, overwrite);
      return Promise.resolve();
    }
    catch (err) {
      return Promise.reject(err);
    }
  }
  //*******************************
  //* Component Lifecycle Methods *
  //*******************************
  connectedCallback() {
    this.parseAutoSave(this.autoSave !== undefined ? this.autoSave : false);
    this.parseTypeOrm(this.typeOrm !== undefined ? this.typeOrm : false);
    this.parseWasmPath(this.wasmPath !== undefined ? this.wasmPath : '/assets');
    this.parseSaveText(this.saveText !== undefined ? this.saveText : 'Save');
    this.parsePickText(this.pickText !== undefined ? this.pickText : 'Pick a database');
    if (this.buttonOptions !== undefined) {
      this.parseButtonOptions(this.buttonOptions);
    }
    this.openStore("jeepSqliteStore", "databases").then((mStore) => {
      this.isStore = mStore;
    });
  }
  componentWillLoad() {
  }
  async componentDidLoad() {
    this._element = this.el.shadowRoot;
    if (!this.isStore) {
      console.log('jeep-sqlite isStore = false');
    }
  }
  //******************************
  //* Private Method Definitions *
  //******************************
  async _createConnection(database, version, readonly) {
    let upgDict = {};
    const vUpgKeys = Object.keys(this._versionUpgrades);
    if (vUpgKeys.length !== 0 && vUpgKeys.includes(database)) {
      upgDict = this._versionUpgrades[database];
    }
    const dbDictKeys = Object.keys(this._dbDict);
    let mDB;
    try {
      if (dbDictKeys.length > 0 && (dbDictKeys.includes("RW_" + database) ||
        dbDictKeys.includes("RO_" + database))) {
        mDB = dbDictKeys.includes("RW_" + database) ? this._dbDict["RW_" + database]
          : this._dbDict["RO_" + database];
      }
      else {
        mDB = new Database(database + 'SQLite.db', version, upgDict, this.store, this.innerAutoSave, this.innerWasmPath);
      }
      const connName = readonly ? "RO_" + database : "RW_" + database;
      this._dbDict[connName] = mDB;
      return Promise.resolve();
    }
    catch (err) {
      const msg = err.message ? err.message : err;
      return Promise.reject(msg);
    }
  }
  async _isConnection(database, readonly) {
    const keys = Object.keys(this._dbDict);
    const connName = readonly ? "RO_" + database : "RW_" + database;
    if (keys.includes(connName)) {
      return { result: true };
    }
    else {
      return { result: false };
    }
  }
  async _closeConnection(database, readonly) {
    const keys = Object.keys(this._dbDict);
    const connName = readonly ? "RO_" + database : "RW_" + database;
    if (!keys.includes(connName)) {
      return Promise.reject(`CloseConnection: No available connection for ${database}`);
    }
    const mDB = this._dbDict[connName];
    try {
      if (mDB.isDBOpen()) {
        await mDB.close();
      }
      // remove the connection from dictionary
      delete this._dbDict[connName];
      return Promise.resolve();
    }
    catch (err) {
      const msg = err.message ? err.message : err;
      return Promise.reject(`CloseConnection: ${msg}`);
    }
  }
  async _open(database, readonly) {
    const keys = Object.keys(this._dbDict);
    const connName = readonly ? "RO_" + database : "RW_" + database;
    if (!keys.includes(connName)) {
      return Promise.reject(`Open: No available connection for ${database}`);
    }
    const mDB = this._dbDict[connName];
    try {
      await mDB.open();
      return Promise.resolve();
    }
    catch (err) {
      const msg = err.message ? err.message : err;
      return Promise.reject(`Open: ${msg}`);
    }
  }
  async _close(database, readonly) {
    const keys = Object.keys(this._dbDict);
    const connName = readonly ? "RO_" + database : "RW_" + database;
    if (!keys.includes(connName)) {
      return Promise.reject(`Close: No available connection for ${database}`);
    }
    const mDB = this._dbDict[connName];
    if (!mDB.isDBOpen()) {
      return Promise.reject(`Close: ${database} database not opened`);
    }
    try {
      await mDB.close();
      return Promise.resolve();
    }
    catch (err) {
      const msg = err.message ? err.message : err;
      return Promise.reject(`Close: ${msg}`);
    }
  }
  async _saveToStore(database, readonly) {
    const keys = Object.keys(this._dbDict);
    const connName = readonly ? "RO_" + database : "RW_" + database;
    if (!keys.includes(connName)) {
      return Promise.reject(`SaveToStore: No available connection for ${database}`);
    }
    const mDB = this._dbDict[connName];
    if (!mDB.isDBOpen()) {
      return Promise.reject(`SaveToStore: ${database} database not opened`);
    }
    try {
      await mDB.saveToStore();
      return Promise.resolve();
    }
    catch (err) {
      const msg = err.message ? err.message : err;
      return Promise.reject(`SaveToStore: ${msg}`);
    }
  }
  async _saveToLocalDisk(database) {
    try {
      const keys = Object.keys(this._dbDict);
      const connName = "RW_" + database;
      if (!keys.includes(connName)) {
        return Promise.reject('SaveToLocalDisk: No available connection for ' + `${database}`);
      }
      const mDB = this._dbDict[connName];
      if (!mDB.isDBOpen()) {
        return Promise.reject(`SaveToLocalDisk: ${database} database not opened`);
      }
      const uint = await mDB.exportDB();
      this._blob = await this.uint2blob(uint);
      const dbName = `${database}SQLite.db`;
      this._opts = { fileName: dbName, extensions: ['.db'], startIn: 'documents', };
      this._buttonSaveEl = document.createElement('button');
      //      const baseName = this._opts.fileName.split('.db')[0];
      this._buttonSaveEl.setAttribute("id", `saveButton`);
      this._buttonSaveEl.innerHTML = `${this.innerSaveText} ${dbName}`;
      this._element.appendChild(this._buttonSaveEl);
      this._buttonSaveEl.addEventListener("click", this.saveFile.bind(this));
      return Promise.resolve();
    }
    catch (err) {
      const msg = err.message ? err.message : err;
      return Promise.reject(`SaveToLocalDisk: ${msg}`);
    }
  }
  async _getFromLocalDiskToStore(overwrite) {
    this._buttonPickEl = document.createElement('button');
    this._buttonPickEl.setAttribute("id", "pickButton");
    this._buttonPickEl.innerHTML = `${this.innerPickText}`;
    this._element.appendChild(this._buttonPickEl);
    this._buttonPickEl.addEventListener("click", this.pickDatabase.bind(this));
    this._overwrite = overwrite;
    return Promise.resolve();
  }
  async pickDatabase() {
    try {
      const blob = await n({ extensions: ['.db'] });
      let uInt8Array = await this.blob2uint(blob);
      const databaseName = this.removePathSuffix(blob.name);
      const dbName = this.setPathSuffix(blob.name);
      // check if dbName exists
      const isExist = await UtilsStore.isDBInStore(dbName, this.store);
      if (!isExist) {
        await UtilsStore.saveDBToStore(dbName, uInt8Array, this.store);
      }
      else {
        if (this._overwrite) {
          await UtilsStore.removeDBFromStore(dbName, this.store);
          await UtilsStore.saveDBToStore(dbName, uInt8Array, this.store);
        }
        else {
          this.PickDatabaseEnded.emit({ message: `Error: cannot overwrite ${dbName}` });
        }
      }
      this._element.removeChild(this._buttonPickEl);
      this.PickDatabaseEnded.emit({ db_name: databaseName });
    }
    catch (err) {
      const msg = err.message ? err.message : err;
      this.PickDatabaseEnded.emit({ message: msg });
    }
  }
  async saveFile() {
    try {
      await o(this._blob, [this._opts]);
      const databaseName = this._opts.fileName;
      this._element.removeChild(this._buttonSaveEl);
      this.SaveDatabaseEnded.emit({ db_name: databaseName });
    }
    catch (err) {
      const msg = err.message ? err.message : err;
      this.SaveDatabaseEnded.emit({ message: msg });
    }
  }
  async _getVersion(database, readonly) {
    const keys = Object.keys(this._dbDict);
    const connName = readonly ? "RO_" + database : "RW_" + database;
    if (!keys.includes(connName)) {
      return Promise.reject(`Open: No available connection for ${database}`);
    }
    const mDB = this._dbDict[connName];
    if (!mDB.isDBOpen()) {
      return Promise.reject(`GetVersion: ${database} database not opened`);
    }
    try {
      const version = await mDB.getVersion();
      const ret = {};
      ret.version = version;
      return Promise.resolve(ret);
    }
    catch (err) {
      const msg = err.message ? err.message : err;
      return Promise.reject(`Open: ${msg}`);
    }
  }
  async _beginTransaction(database) {
    const keys = Object.keys(this._dbDict);
    const connName = "RW_" + database;
    if (!keys.includes(connName)) {
      return Promise.reject(`BeginTransaction: No available connection for ${database}`);
    }
    const mDB = this._dbDict[connName];
    if (!mDB.isDBOpen()) {
      return Promise.reject(`BeginTransaction: ${database} database not opened`);
    }
    let changes = {};
    const ret = await mDB.beginTransaction();
    changes = { changes: { changes: ret } };
    return Promise.resolve(changes);
  }
  async _commitTransaction(database) {
    const keys = Object.keys(this._dbDict);
    const connName = "RW_" + database;
    if (!keys.includes(connName)) {
      return Promise.reject(`CommitTransaction: No available connection for ${database}`);
    }
    const mDB = this._dbDict[connName];
    if (!mDB.isDBOpen()) {
      return Promise.reject(`CommitTransaction: ${database} database not opened`);
    }
    let changes = {};
    const ret = await mDB.commitTransaction();
    changes = { changes: { changes: ret } };
    return Promise.resolve(changes);
  }
  async _rollbackTransaction(database) {
    const keys = Object.keys(this._dbDict);
    const connName = "RW_" + database;
    if (!keys.includes(connName)) {
      return Promise.reject(`RollbackTransaction: No available connection for ${database}`);
    }
    const mDB = this._dbDict[connName];
    if (!mDB.isDBOpen()) {
      return Promise.reject(`RollbackTransaction: ${database} database not opened`);
    }
    let changes = {};
    const ret = await mDB.rollbackTransaction();
    changes = { changes: { changes: ret } };
    return Promise.resolve(changes);
  }
  async _isTransactionActive(database) {
    const keys = Object.keys(this._dbDict);
    const connName = "RW_" + database;
    if (!keys.includes(connName)) {
      return Promise.reject(`IsTransactionActive: No available connection for ${database}`);
    }
    const mDB = this._dbDict[connName];
    if (!mDB.isDBOpen()) {
      return Promise.reject(`IsTransactionActive: ${database} database not opened`);
    }
    let result = {};
    const res = mDB.isTransActive();
    result = { result: res };
    return Promise.resolve(result);
  }
  async _execute(database, statements, transaction, readonly) {
    const keys = Object.keys(this._dbDict);
    const connName = "RW_" + database;
    if (!keys.includes(connName)) {
      return Promise.reject(`Execute: No available connection for ${database}`);
    }
    const mDB = this._dbDict[connName];
    if (!mDB.isDBOpen()) {
      return Promise.reject(`Execute: ${database} database not opened`);
    }
    if (readonly) {
      return Promise.reject(`Execute: not allowed in read-only mode`);
    }
    let changes = {};
    const command = statements.substring(0, 6);
    if (this.innerAutoSave && command === "COMMIT" && this.innerTypeOrm) {
      // fix issue for typeORM with autosave
      changes = { changes: { changes: 0 } };
      return Promise.resolve(changes);
    }
    try {
      const ret = await mDB.executeSQL(statements, transaction);
      changes = { changes: { changes: ret } };
      return Promise.resolve(changes);
    }
    catch (err) {
      const msg = err.message ? err.message : err;
      return Promise.reject(`Execute: ${msg}`);
    }
  }
  async _executeSet(database, setOfStatements, transaction, readonly, returnMode) {
    const keys = Object.keys(this._dbDict);
    const connName = "RW_" + database;
    if (!keys.includes(connName)) {
      return Promise.reject(`ExecuteSet: No available connection for ${database}`);
    }
    const mDB = this._dbDict[connName];
    if (!mDB.isDBOpen()) {
      return Promise.reject(`ExecuteSet: ${database} database not opened`);
    }
    if (readonly) {
      return Promise.reject(`ExecuteSet: not allowed in read-only mode`);
    }
    for (const sStmt of setOfStatements) {
      if (!('statement' in sStmt) || !('values' in sStmt)) {
        return Promise.reject('ExecuteSet: Must provide a set as ' + 'Array of {statement,values}');
      }
    }
    try {
      const ret = await mDB.execSet(setOfStatements, transaction, returnMode);
      const changes = { changes: { changes: ret.changes, lastId: ret.lastId,
          values: ret.values } };
      return Promise.resolve(changes);
    }
    catch (err) {
      const msg = err.message ? err.message : err;
      return Promise.reject(`ExecuteSet: ${msg}`);
    }
  }
  async _run(database, statement, values, transaction, readonly, returnMode) {
    const keys = Object.keys(this._dbDict);
    const connName = "RW_" + database;
    if (!keys.includes(connName)) {
      return Promise.reject(`Run: No available connection for ${database}`);
    }
    const mDB = this._dbDict[connName];
    if (!mDB.isDBOpen()) {
      return Promise.reject(`Run: ${database} database not opened`);
    }
    if (readonly) {
      return Promise.reject(`Run: not allowed in read-only mode`);
    }
    let changes = {};
    const command = statement.substring(0, 6);
    if (this.innerAutoSave && command === "COMMIT") {
      // fix issue for typeORM with autosave
      changes = { changes: { changes: 0 } };
      return Promise.resolve(changes);
    }
    try {
      const ret = await mDB.runSQL(statement, values, transaction, returnMode);
      changes = { changes: { changes: ret.changes, lastId: ret.lastId, values: ret.values } };
      return Promise.resolve(changes);
    }
    catch (err) {
      const msg = err.message ? err.message : err;
      return Promise.reject(`Run: ${msg}`);
    }
  }
  async _query(database, statement, values, readonly) {
    const keys = Object.keys(this._dbDict);
    const connName = readonly ? "RO_" + database : "RW_" + database;
    if (!keys.includes(connName)) {
      return Promise.reject(`Query: No available connection for ${database}`);
    }
    const mDB = this._dbDict[connName];
    if (!mDB.isDBOpen()) {
      return Promise.reject(`Query: ${database} database not opened`);
    }
    let ret = [];
    const command = statement.substring(0, 6);
    if (this.innerAutoSave && command === "COMMIT") {
      // fix issue for typeORM with autosave
      return Promise.resolve({ values: ret });
    }
    try {
      ret = await mDB.selectSQL(statement, values);
      return Promise.resolve({ values: ret });
    }
    catch (err) {
      const msg = err.message ? err.message : err;
      return Promise.reject(`Query failed: ${msg}`);
    }
  }
  async _getTableList(database, readonly) {
    const keys = Object.keys(this._dbDict);
    const connName = readonly ? "RO_" + database : "RW_" + database;
    if (!keys.includes(connName)) {
      return Promise.reject(`GetTableList: No available connection for ${database}`);
    }
    const mDB = this._dbDict[connName];
    if (!mDB.isDBOpen()) {
      return Promise.reject(`GetTableList: ${database} database not opened`);
    }
    let ret = [];
    try {
      ret = await mDB.getTableNames();
      return Promise.resolve({ values: ret });
    }
    catch (err) {
      const msg = err.message ? err.message : err;
      return Promise.reject(`GetTableList failed: ${msg}`);
    }
  }
  async _isDBExists(database, readonly) {
    const keys = Object.keys(this._dbDict);
    const connName = readonly ? "RO_" + database : "RW_" + database;
    if (!keys.includes(connName)) {
      return Promise.reject(`IsDBExists: No available connection for ${database}`);
    }
    const mDB = this._dbDict[connName];
    /*    if (!mDB.isDBOpen()) {
          return Promise.reject(
            `IsDBExists: ${database} database not opened`);
        }
        */
    try {
      const ret = await mDB.isDBExists(database + 'SQLite.db');
      const result = { result: ret };
      return Promise.resolve(result);
    }
    catch (err) {
      const msg = err.message ? err.message : err;
      return Promise.reject(`IsDBExists: ${msg}`);
    }
  }
  async _isDBOpen(database, readonly) {
    const keys = Object.keys(this._dbDict);
    const connName = readonly ? "RO_" + database : "RW_" + database;
    if (!keys.includes(connName)) {
      return Promise.reject(`IsDBOpen: No available connection for ${database}`);
    }
    const mDB = this._dbDict[connName];
    if (!mDB.isDBOpen()) {
      const result = { result: false };
      return Promise.resolve(result);
    }
    try {
      const ret = await mDB.isDBOpen(database + 'SQLite.db');
      const result = { result: ret };
      return Promise.resolve(result);
    }
    catch (err) {
      const msg = err.message ? err.message : err;
      return Promise.reject(`IsDBOpen: ${msg}`);
    }
  }
  async _deleteDatabase(database, readonly) {
    const keys = Object.keys(this._dbDict);
    const connName = "RW_" + database;
    if (!keys.includes(connName)) {
      return Promise.reject(`DeleteDatabase: No available connection for ${database}`);
    }
    const mDB = this._dbDict[connName];
    if (readonly) {
      return Promise.reject(`DeleteDatabase: not allowed in read-only mode`);
    }
    try {
      await mDB.deleteDB(database + 'SQLite.db');
      return Promise.resolve();
    }
    catch (err) {
      const msg = err.message ? err.message : err;
      return Promise.reject(`DeleteDatabase: ${msg}`);
    }
  }
  async _isTableExists(database, table, readonly) {
    const keys = Object.keys(this._dbDict);
    const connName = readonly ? "RO_" + database : "RW_" + database;
    if (!keys.includes(connName)) {
      return Promise.reject(`IsTableExists: No available connection for ${database}`);
    }
    const mDB = this._dbDict[connName];
    if (!mDB.isDBOpen()) {
      return Promise.reject(`IsTableExists: ${database} database not opened`);
    }
    try {
      const ret = await mDB.isTable(table);
      const result = { result: ret };
      return Promise.resolve(result);
    }
    catch (err) {
      const msg = err.message ? err.message : err;
      return Promise.reject(`IsTableExists: ${msg}`);
    }
  }
  async _createSyncTable(database, readonly) {
    const keys = Object.keys(this._dbDict);
    const connName = "RW_" + database;
    if (!keys.includes(connName)) {
      return Promise.reject('CreateSyncTable: No available connection for ' + `${database}`);
    }
    const mDB = this._dbDict[connName];
    if (!mDB.isDBOpen()) {
      return Promise.reject(`CreateSyncTable: ${database} database not opened`);
    }
    if (readonly) {
      return Promise.reject(`CreateSyncTable: not allowed in read-only mode`);
    }
    try {
      const ret = await mDB.createSyncTable();
      return Promise.resolve({ changes: { changes: ret } });
    }
    catch (err) {
      const msg = err.message ? err.message : err;
      return Promise.reject(`CreateSyncTable: ${msg}`);
    }
  }
  async _getSyncDate(database, readonly) {
    const keys = Object.keys(this._dbDict);
    const connName = readonly ? "RO_" + database : "RW_" + database;
    if (!keys.includes(connName)) {
      return Promise.reject('GetSyncDate: No available connection for ' + `${database}`);
    }
    const mDB = this._dbDict[connName];
    if (!mDB.isDBOpen()) {
      return Promise.reject(`GetSyncDate: ${database} database not opened`);
    }
    try {
      const ret = await mDB.getSyncDate();
      return Promise.resolve({ syncDate: ret });
    }
    catch (err) {
      const msg = err.message ? err.message : err;
      return Promise.reject(`GetSyncDate: ${msg}`);
    }
  }
  async _setSyncDate(database, syncDate, readonly) {
    const keys = Object.keys(this._dbDict);
    const connName = "RW_" + database;
    if (!keys.includes(connName)) {
      return Promise.reject('SetSyncDate: No available connection for ' + `${database}`);
    }
    const mDB = this._dbDict[connName];
    if (!mDB.isDBOpen()) {
      return Promise.reject(`SetSyncDate: ${database} database not opened`);
    }
    if (readonly) {
      return Promise.reject(`SetSyncDate: not allowed in read-only mode`);
    }
    try {
      const ret = await mDB.setSyncDate(syncDate);
      if (ret.result) {
        return Promise.resolve();
      }
      else {
        return Promise.reject(`SetSyncDate: ${ret.message}`);
      }
    }
    catch (err) {
      const msg = err.message ? err.message : err;
      return Promise.reject(`SetSyncDate: ${msg}`);
    }
  }
  async _isJsonValid(jsonStrObj) {
    const jsonObj = JSON.parse(jsonStrObj);
    const isValid = await UtilsJSON.isJsonSQLite(jsonObj);
    if (!isValid) {
      return Promise.reject('IsJsonValid: Stringify Json Object not Valid');
    }
    else {
      return Promise.resolve({ result: true });
    }
  }
  async _importFromJson(jsonStrObj) {
    var _a, _b;
    const jsonObj = JSON.parse(jsonStrObj);
    const isValid = await UtilsJSON.isJsonSQLite(jsonObj);
    if (!isValid) {
      return Promise.reject('ImportFromJson: Stringify Json Object not Valid');
    }
    const vJsonObj = jsonObj;
    const dbName = `${vJsonObj.database}SQLite.db`;
    const dbVersion = (_a = vJsonObj.version) !== null && _a !== void 0 ? _a : 1;
    const mode = vJsonObj.mode;
    const overwrite = (_b = vJsonObj.overwrite) !== null && _b !== void 0 ? _b : false;
    // Create the database
    const mDb = new Database(dbName, dbVersion, {}, this.store, this.innerAutoSave, this.innerWasmPath);
    try {
      if (overwrite && mode === 'full') {
        const isExists = UtilsStore.isDBInStore(dbName, this.store);
        if (isExists) {
          await UtilsStore.removeDBFromStore(dbName, this.store);
        }
      }
      // Open the database
      await mDb.open();
      const tableList = await mDb.getTableNames();
      if (mode === 'full' && tableList.length > 0) {
        const curVersion = await mDb.getVersion();
        if (dbVersion < curVersion) {
          return Promise.reject(`ImportFromJson: Cannot import a version lower than ${curVersion}`);
        }
        if (curVersion === dbVersion) {
          return Promise.resolve({ changes: { changes: 0 } });
        }
      }
      // Import the JsonSQLite Object
      const changes = await mDb.importJson(vJsonObj, this.importProgress);
      // Close the database
      await mDb.close();
      return Promise.resolve({ changes: { changes: changes } });
    }
    catch (err) {
      const msg = err.message ? err.message : err;
      return Promise.reject(`ImportFromJson: ${msg}`);
    }
  }
  async _exportToJson(database, exportMode, readonly) {
    const keys = Object.keys(this._dbDict);
    const connName = readonly ? "RO_" + database : "RW_" + database;
    if (!keys.includes(connName)) {
      return Promise.reject('ExportToJson: No available connection for ' + `${database}`);
    }
    const mDB = this._dbDict[connName];
    if (!mDB.isDBOpen()) {
      return Promise.reject(`ExportToJson: ${database} database not opened`);
    }
    try {
      const ret = await mDB.exportJson(exportMode, this.exportProgress);
      const keys = Object.keys(ret);
      if (keys.includes('message')) {
        return Promise.reject(`ExportToJson: ${ret.message}`);
      }
      else {
        return Promise.resolve({ export: ret });
      }
    }
    catch (err) {
      const msg = err.message ? err.message : err;
      return Promise.reject(`ExportToJson: ${msg}`);
    }
  }
  async _deleteExportedRows(database, readonly) {
    const keys = Object.keys(this._dbDict);
    const connName = "RW_" + database;
    if (!keys.includes(connName)) {
      return Promise.reject('DeleteExportedRows: No available connection for ' + `${database}`);
    }
    const mDB = this._dbDict[connName];
    if (!mDB.isDBOpen()) {
      return Promise.reject(`DeleteExportedRows: ${database} database not opened`);
    }
    if (readonly) {
      return Promise.reject(`DeleteExportedRows: not allowed in read-only mode`);
    }
    try {
      await mDB.deleteExportedRows();
    }
    catch (err) {
      const msg = err.message ? err.message : err;
      return Promise.reject(`DeleteExportedRows: ${msg}`);
    }
  }
  async _copyFromAssets(overwrite) {
    const res = await this.loadJSON('/assets/databases/databases.json');
    if (res != null) {
      this.databaseList = JSON.parse(res);
      const keys = Object.keys(this.databaseList);
      if (keys.includes("databaseList")) {
        try {
          for (const dbName of this.databaseList.databaseList) {
            if (dbName.substring(dbName.length - 3) === ".db") {
              await this.copyDatabase(`/assets/databases/${dbName}`, overwrite);
            }
            if (dbName.substring(dbName.length - 4) === ".zip") {
              await this.unzipDatabase(`/assets/databases/${dbName}`, overwrite);
            }
          }
          return Promise.resolve();
        }
        catch (err) {
          const msg = err.message ? err.message : err;
          return Promise.reject(`CopyFromAssets: ${msg}`);
        }
      }
      else {
        return Promise.reject(`CopyFromAssets: no key databaseList in databases.json`);
      }
    }
    else {
      return Promise.reject(`CopyFromAssets: no databases.json file in /assets/databases folder`);
    }
  }
  async _getFromHTTPRequest(url, overwrite) {
    try {
      const extension = this.getFileExtensionInUrl(url);
      let message;
      switch (extension) {
        case 'db':
          await this.copyDatabase(url, overwrite);
          message = "db";
          break;
        case 'zip':
          await this.unzipDatabase(url, overwrite);
          message = "zip";
          break;
        default:
          message = "Unknown file type in url.";
      }
      this.HTTPRequestEnded.emit({ message: message });
      return Promise.resolve();
    }
    catch (err) {
      const msg = err.message ? err.message : err;
      return Promise.reject(`GetFromHTTPRequest: ${msg}`);
    }
  }
  async _isDatabase(database) {
    try {
      const ret = await UtilsStore.isDBInStore(database + 'SQLite.db', this.store);
      const result = { result: ret };
      return Promise.resolve(result);
    }
    catch (err) {
      const msg = err.message ? err.message : err;
      return Promise.reject(`IsDatabase: ${msg}`);
    }
  }
  async _getDatabaseList() {
    try {
      const ret = await UtilsStore.getDBListFromStore(this.store);
      const result = { values: ret };
      return Promise.resolve(result);
    }
    catch (err) {
      const msg = err.message ? err.message : err;
      return Promise.reject(`GetDatabaseList: ${msg}`);
    }
  }
  async _checkConnectionsConsistency(dbNames, openModes) {
    const ret = {};
    ret.result = false;
    const dbConns = [];
    dbNames.forEach((value, i) => {
      dbConns.push(`${openModes[i]}_${value}`);
    });
    try {
      let inConnectionsSet = new Set(Object.keys(this._dbDict));
      const outConnectionSet = new Set(dbConns);
      if (outConnectionSet.size === 0) {
        await this._resetDbDict(Object.keys(this._dbDict));
        return Promise.resolve(ret);
      }
      if (inConnectionsSet.size < outConnectionSet.size) {
        await this._resetDbDict(Object.keys(this._dbDict));
        return Promise.resolve(ret);
      }
      if (inConnectionsSet.size > outConnectionSet.size) {
        const opt = {};
        for (const key of inConnectionsSet) {
          if (!Array.from(outConnectionSet.keys()).includes(key)) {
            let readonly = false;
            if (key.substring(0, 3) === "RO_") {
              readonly = true;
            }
            opt.database = key.substring(3);
            opt.readonly = readonly;
            await this._closeConnection(opt.database, opt.readonly);
          }
        }
      }
      inConnectionsSet = new Set(Object.keys(this._dbDict));
      if (inConnectionsSet.size === outConnectionSet.size) {
        const symDiffSet = await this.symmetricDifference(inConnectionsSet, outConnectionSet);
        if (symDiffSet.size === 0) {
          ret.result = true;
          return Promise.resolve(ret);
        }
        else {
          await this._resetDbDict(Object.keys(this._dbDict));
          return Promise.resolve(ret);
        }
      }
      else {
        await this._resetDbDict(Object.keys(this._dbDict));
        return Promise.resolve(ret);
      }
    }
    catch (err) {
      const msg = err.message ? err.message : err;
      return Promise.reject(`CheckConnectionsConsistency: ${msg}`);
    }
  }
  async _resetDbDict(keys) {
    try {
      for (const key of keys) {
        const opt = {};
        let readonly = false;
        if (key.substring(0, 3) === "RO_") {
          readonly = true;
        }
        opt.database = key.substring(3);
        opt.readonly = readonly;
        await this._closeConnection(opt.database, opt.readonly);
      }
    }
    catch (err) {
      const msg = err.message ? err.message : err;
      return Promise.reject(`ResetDbDict: ${msg}`);
    }
  }
  async symmetricDifference(setA, setB) {
    let _difference = new Set();
    setA.forEach(element => {
      _difference.add(element.substring(3));
    });
    let _compare = new Set();
    setB.forEach(element => {
      _compare.add(element.substring(3));
    });
    for (const elem of _compare) {
      if (_difference.has(elem)) {
        _difference.delete(elem);
      }
      else {
        _difference.add(elem);
      }
    }
    return _difference;
  }
  async unzipDatabase(dbZipName, overwrite) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', dbZipName, true);
      xhr.responseType = 'arraybuffer';
      xhr.onerror = () => {
        reject(new Error(`unzipDatabase: failed`));
      };
      xhr.onload = () => {
        jszip_min.loadAsync(xhr.response).then(async (zip) => {
          const keys = Object.keys(zip.files);
          try {
            // loop through file in the zip
            for (const filename of keys) {
              await this.retrieveDBFromZip(zip.files, filename, overwrite);
            }
            resolve();
          }
          catch (err) {
            const msg = err.message ? err.message : err;
            reject(new Error(`unzipDatabase Error: ${msg}`));
          }
        });
      };
      xhr.send();
    });
  }
  async retrieveDBFromZip(zipFiles, fileName, overwrite) {
    return new Promise((resolve, reject) => {
      zipFiles[fileName].async('nodebuffer').then(async (fileData) => {
        try {
          const uInt8Array = new Uint8Array(fileData);
          const dbName = this.setPathSuffix(fileName);
          // check if dbName exists
          const isExist = await UtilsStore.isDBInStore(dbName, this.store);
          if (!isExist) {
            await UtilsStore.saveDBToStore(dbName, uInt8Array, this.store);
          }
          else {
            if (overwrite) {
              await UtilsStore.removeDBFromStore(dbName, this.store);
              await UtilsStore.saveDBToStore(dbName, uInt8Array, this.store);
            }
            else {
              reject(new Error(`retrieveDBFromZip: cannot overwrite ${dbName}`));
            }
          }
          resolve();
        }
        catch (err) {
          const msg = err.message ? err.message : err;
          reject(new Error(`retrieveDBFromZip:: ${msg}`));
        }
      });
    });
  }
  async copyDatabase(dbInName, overwrite) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      var uInt8Array;
      xhr.open('GET', dbInName, true);
      xhr.responseType = 'arraybuffer';
      xhr.onerror = () => {
        reject(new Error(`CopyDatabase: failed`));
      };
      xhr.onload = () => {
        uInt8Array = new Uint8Array(xhr.response);
      };
      xhr.onloadend = async () => {
        const dbName = this.setPathSuffix(dbInName);
        // check if dbName exists
        const isExist = await UtilsStore.isDBInStore(dbName, this.store);
        if (!isExist) {
          await UtilsStore.saveDBToStore(dbName, uInt8Array, this.store);
        }
        else {
          if (overwrite) {
            await UtilsStore.removeDBFromStore(dbName, this.store);
            await UtilsStore.saveDBToStore(dbName, uInt8Array, this.store);
          }
          else {
            reject(new Error(`CopyDatabase Error: cannot overwrite ${dbName}`));
          }
        }
        resolve();
      };
      xhr.send();
    });
  }
  async loadJSON(jsonFileName) {
    return new Promise((resolve, reject) => {
      var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
      xobj.open('GET', jsonFileName, true);
      xobj.onerror = () => {
        reject(new Error(`LoadJSON: failed`));
      };
      xobj.onreadystatechange = function () {
        if (xobj.status == 404)
          resolve(null);
        if (xobj.readyState == 4 && xobj.status == 200) {
          // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
          resolve(xobj.responseText);
        }
      };
      xobj.send(null);
    });
  }
  async openStore(dbName, tableName) {
    let ret = false;
    const config = this.setConfig(dbName, tableName);
    this.store = localforage.createInstance(config);
    if (this.store != null) {
      this.storeName = dbName;
      ret = true;
    }
    return ret;
  }
  setConfig(dbName, tableName) {
    const config = {
      name: dbName,
      storeName: tableName,
      driver: [localforage.INDEXEDDB],
      version: 1,
    };
    return config;
  }
  removePathSuffix(db) {
    return db.includes("SQLite.db") ?
      db.split("SQLite.db")[0] :
      db.substring(db.length - 3) === ".db" ?
        db.slice(0, db.lastIndexOf(".")) :
        db;
  }
  setPathSuffix(db) {
    let toDb = db.slice(db.lastIndexOf("/") + 1);
    const ext = ".db";
    if (db.substring(db.length - 3) === ext) {
      if (!db.includes("SQLite.db")) {
        toDb = db.slice(db.lastIndexOf("/") + 1, -3) + 'SQLite.db';
      }
    }
    return toDb;
  }
  async blob2uint(blob) {
    return new Response(blob).arrayBuffer().then(buffer => {
      const uint = new Uint8Array(buffer);
      return uint;
    });
  }
  async uint2blob(uint) {
    const blob = new Blob([uint.buffer]);
    return Promise.resolve(blob);
  }
  getFileExtensionInUrl(url) {
    const matches = url.match(/\.([a-zA-Z0-9]+)(?:[\?#]|$)/);
    if (matches) {
      return matches[1].toLowerCase(); // returns the matched extension in lowercase
    }
    return null; // no extension found
  }
  render() {
    return;
  }
  static get assetsDirs() { return ["assets"]; }
  get el() { return getElement(this); }
  static get watchers() { return {
    "autoSave": ["parseAutoSave"],
    "typeOrm": ["parseTypeOrm"],
    "wasmPath": ["parseWasmPath"],
    "pickText": ["parsePickText"],
    "saveText": ["parseSaveText"],
    "buttonOptions": ["parseButtonOptions"]
  }; }
};
JeepSqlite.style = jeepSqliteCss;

export { JeepSqlite as jeep_sqlite };
