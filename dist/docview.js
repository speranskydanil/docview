/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 56);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(31)('wks');
var uid = __webpack_require__(20);
var Symbol = __webpack_require__(2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(0);
var ctx = __webpack_require__(34);
var hide = __webpack_require__(11);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(9);
var IE8_DOM_DEFINE = __webpack_require__(47);
var toPrimitive = __webpack_require__(35);
var dP = Object.defineProperty;

exports.f = __webpack_require__(10) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(63);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(45);
var defined = __webpack_require__(27);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(16);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(12)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(4);
var createDesc = __webpack_require__(17);
module.exports = __webpack_require__(10) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(27);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(44);
var enumBugKeys = __webpack_require__(32);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(69), __esModule: true };

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(78), __esModule: true };

/***/ }),
/* 20 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(76)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(49)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(54);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 23 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _getPrototypeOf = __webpack_require__(19);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = __webpack_require__(92);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

  if (desc === undefined) {
    var parent = (0, _getPrototypeOf2.default)(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(95);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(99);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(54);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(102);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _page = __webpack_require__(110);

var _page2 = _interopRequireDefault(_page);

var _page_download_queue = __webpack_require__(115);

var _page_download_queue2 = _interopRequireDefault(_page_download_queue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Mode = function () {
  function Mode(params) {
    var _this = this;

    (0, _classCallCheck3.default)(this, Mode);

    this.dom = params.dom;

    this.pages = params.pages.map(function (p) {
      return new _page2.default(p, _this.dom.viewport);
    });
    _page2.default.url = params.pageUrl;

    this.zooms = params.zooms;

    this.queue = new _page_download_queue2.default();

    this.index = 0;
    this.zoom = 0;

    var _loop = function _loop(name) {
      var func = _this[name];

      _this[name] = function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        func.apply(this, args);
        $(window).trigger('dv-change');
      };
    };

    var _arr = ['activate', 'zoomIn', 'zoomOut', 'prev', 'next', 'changeIndex'];
    for (var _i = 0; _i < _arr.length; _i++) {
      var name = _arr[_i];
      _loop(name);
    }
  }

  (0, _createClass3.default)(Mode, [{
    key: 'activate',
    value: function activate(index, zoom) {
      this.index = Math.min(index, this.pages.length - 1);
      this.zoom = Math.min(zoom, this.zooms.length - 1);
    }
  }, {
    key: 'deactivate',
    value: function deactivate() {
      this.queue.clear();
    }
  }, {
    key: 'scroll',
    value: function scroll() {
      $(window).scrollTop(this.page.div.offset().top - 5);
    }
  }, {
    key: 'resizePages',
    value: function resizePages() {
      this.dom.pages.css({ width: this.pageWidth, height: this.pageHeight });
      this.dom.images.css('width', this.pageWidth);
    }
  }, {
    key: 'pageWidth',
    get: function get() {
      return this.zooms[this.zoom];
    }
  }, {
    key: 'pageWidthWithIndent',
    get: function get() {
      return this.pageWidth + 7;
    }
  }, {
    key: 'pageHeight',
    get: function get() {
      this.maxRatio = this.maxRatio || Math.max.apply(Math, (0, _toConsumableArray3.default)(this.pages.map(function (page) {
        return page.ratio;
      })));
      return Math.ceil(this.maxRatio * this.pageWidth);
    }
  }, {
    key: 'pageHeightWithIndent',
    get: function get() {
      return this.pageHeight + 7;
    }
  }, {
    key: 'page',
    get: function get() {
      return this.pages[this.index];
    },
    set: function set(page) {
      this.index = page.index;
    }
  }, {
    key: 'downloadUrl',
    get: function get() {
      return this.page.downloadUrl || this.page.url(this.zooms.length - 1);
    }
  }]);
  return Mode;
}();

exports.default = Mode;

/***/ }),
/* 27 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(31)('keys');
var uid = __webpack_require__(20);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 32 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(3);
var core = __webpack_require__(0);
var fails = __webpack_require__(12);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(62);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(16);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(70);
var global = __webpack_require__(2);
var hide = __webpack_require__(11);
var Iterators = __webpack_require__(13);
var TO_STRING_TAG = __webpack_require__(1)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(9);
var dPs = __webpack_require__(74);
var enumBugKeys = __webpack_require__(32);
var IE_PROTO = __webpack_require__(30)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(48)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(75).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(4).f;
var has = __webpack_require__(7);
var TAG = __webpack_require__(1)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(1);


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(0);
var LIBRARY = __webpack_require__(37);
var wksExt = __webpack_require__(40);
var defineProperty = __webpack_require__(4).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 42 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(23);
var createDesc = __webpack_require__(17);
var toIObject = __webpack_require__(8);
var toPrimitive = __webpack_require__(35);
var has = __webpack_require__(7);
var IE8_DOM_DEFINE = __webpack_require__(47);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(10) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(7);
var toIObject = __webpack_require__(8);
var arrayIndexOf = __webpack_require__(60)(false);
var IE_PROTO = __webpack_require__(30)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(28);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(29);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(10) && !__webpack_require__(12)(function () {
  return Object.defineProperty(__webpack_require__(48)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(16);
var document = __webpack_require__(2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(37);
var $export = __webpack_require__(3);
var redefine = __webpack_require__(50);
var hide = __webpack_require__(11);
var has = __webpack_require__(7);
var Iterators = __webpack_require__(13);
var $iterCreate = __webpack_require__(73);
var setToStringTag = __webpack_require__(39);
var getPrototypeOf = __webpack_require__(51);
var ITERATOR = __webpack_require__(1)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(11);


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(7);
var toObject = __webpack_require__(14);
var IE_PROTO = __webpack_require__(30)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(53);
var ITERATOR = __webpack_require__(1)('iterator');
var Iterators = __webpack_require__(13);
module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(28);
var TAG = __webpack_require__(1)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(80);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(82);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(44);
var hiddenKeys = __webpack_require__(32).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _keys = __webpack_require__(57);

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

__webpack_require__(66);

__webpack_require__(67);

var _mode_grid = __webpack_require__(68);

var _mode_grid2 = _interopRequireDefault(_mode_grid);

var _mode_inspect = __webpack_require__(116);

var _mode_inspect2 = _interopRequireDefault(_mode_inspect);

var _mode_flipbook = __webpack_require__(117);

var _mode_flipbook2 = _interopRequireDefault(_mode_flipbook);

var _mode_filmstrip = __webpack_require__(122);

var _mode_filmstrip2 = _interopRequireDefault(_mode_filmstrip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.Docview = function () {
  function Docview(params) {
    (0, _classCallCheck3.default)(this, Docview);

    params = $.extend(true, {
      div: null,
      translation: {
        grid: 'Grid',
        filmstrip: 'Filmstrip',
        inspect: 'Inspect',
        flipbook: 'Flip-Book',
        fullscreen: 'Fullscreen',
        zoomOut: 'Zoom Out',
        zoomIn: 'Zoom In',
        dim: 'Dim',
        prevPage: 'Previous Page',
        nextPage: 'Next Page',
        rotateLeft: 'Rotate Left',
        rotateRight: 'Rotate Right',
        download: 'Download',
        print: 'Print'
      },
      zooms: null,
      pages: null,
      pageUrl: null,
      mode: 'grid',
      index: 0,
      zoom: 0,
      addons: ''
    }, params);

    this.buildDom(params);
    this.bindEvents(params);
    this.initializeModes(params);
    this.activateMode(params);
  }

  (0, _createClass3.default)(Docview, [{
    key: 'buildDom',
    value: function buildDom(params) {
      var t = params.translation;

      var html = '\n      <div class="dv">\n        <div class="dv-toolbar dv-clear">\n          <div class="dv-panel">\n            <div class="dv-modes">\n              <a class="dv-grid" title="' + t.grid + '"></a>\n              <a class="dv-filmstrip" title="' + t.filmstrip + '"></a>\n              <a class="dv-inspect" title="' + t.inspect + '"></a>\n              <a class="dv-flipbook" title="' + t.flipBook + '"></a>\n            </div>\n            <div class="dv-dash"></div>\n            <a class="dv-fullscreen" title="' + t.fullscreen + '"></a>\n            <div class="dv-dash"></div>\n            <div class="dv-zoom">\n              <a class="dv-zoom-out" title="' + t.zoomOut + '"></a>\n              <a class="dv-zoom-in" title="' + t.zoomIn + '"></a>\n            </div>\n            <div class="dv-dash"></div>\n            <a class="dv-dim" title="' + t.dim + '"></a>\n            <div class="dv-dash dv-dash-dim"></div>\n            <div class="dv-paginator">\n              <a class="dv-prev" title="' + t.prevPage + '"></a>\n              <input class="dv-cur" type="text">\n              <a class="dv-next" title="' + t.nextPage + '"></a>\n            </div>\n            <div class="dv-dash dv-dash-paginator"></div>\n            <div class="dv-rotator">\n              <a class="dv-rotate-left" title="' + t.rotatLeft + '"></a>\n              <a class="dv-rotate-right" title="' + t.rotateRight + '"></a>\n            </div>\n            <div class="dv-dash dv-dash-rotator"></div>\n            <a class="dv-download" title="' + t.download + '" target="_blank" download></a>\n            <a class="dv-print" title="' + t.print + '"></a>\n          </div>\n          <div class="dv-addons">' + params.addons + '</div>\n        </div>\n        <div class="dv-viewport-outter">\n          <div class="dv-viewport">\n            <div class="dv-viewport-inner dv-clear">\n              ' + params.pages.map(function (page) {
        return '<div class="dv-page dv-page-' + page.id + '">\n                  <img src="" title="" alt="" oncontextmenu="return false">\n                </div>';
      }).join('') + '\n            </div>\n          </div>\n        </div>\n      </div>';

      var dv = $(html).appendTo(params.div);

      this.dom = {
        dv: dv,
        toolbar: dv.find('.dv-toolbar'),
        modes: dv.find('.dv-modes a'),
        fullscreen: dv.find('.dv-fullscreen'),
        zoomIn: dv.find('.dv-zoom-in'),
        zoomOut: dv.find('.dv-zoom-out'),
        dim: dv.find('.dv-dim'),
        prev: dv.find('.dv-prev'),
        next: dv.find('.dv-next'),
        cur: dv.find('.dv-cur'),
        rotateLeft: dv.find('.dv-rotate-left'),
        rotateRight: dv.find('.dv-rotate-right'),
        download: dv.find('.dv-download'),
        print: dv.find('.dv-print'),
        viewport: dv.find('.dv-viewport'),
        wrapper: dv.find('.dv-viewport-inner'),
        pages: dv.find('.dv-page'),
        images: dv.find('.dv-page img')
      };
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      this.bindCommonEvents();
      this.bindToolbarEvents();
      this.bindModeEvents();
    }
  }, {
    key: 'bindCommonEvents',
    value: function bindCommonEvents() {
      var _this = this;

      $(window).scroll(function () {
        return _this.moveToolbar();
      });
      setInterval(function () {
        return _this.mode.load();
      }, 2000); // for zoom
    }
  }, {
    key: 'bindToolbarEvents',
    value: function bindToolbarEvents() {
      var _this2 = this;

      var self = this;

      this.dom.modes.click(function (e) {
        e.preventDefault();
        self.changeMode($(this).attr('class').split('-')[1]);
      });

      var fullscreen = false;
      var dv = this.dom.dv;
      var div = dv.parent();

      this.dom.fullscreen.click(function (e) {
        e.preventDefault();

        if (fullscreen) {
          $('body > *').each(function () {
            $(this).css('display', $(this).data('dv-cache'));
            $(this).removeData('dv-cache');
          });

          dv.appendTo(div);
        } else {
          $('body > *').each(function () {
            $(this).data('dv-cache', $(this).css('display'));
            $(this).css('display', 'none');
          });

          dv.appendTo('body').show();
        }

        fullscreen = !fullscreen;
      });

      this.dom.zoomIn.click(function (e) {
        e.preventDefault();
        _this2.mode.zoomIn();
      });

      this.dom.zoomOut.click(function (e) {
        e.preventDefault();
        _this2.mode.zoomOut();
      });

      this.dom.dim.click(function (e) {
        e.preventDefault();
        $(window).trigger('dv-dim');
      });

      this.dom.prev.click(function (e) {
        e.preventDefault();
        _this2.mode.prev();
      });

      this.dom.next.click(function (e) {
        e.preventDefault();
        _this2.mode.next();
      });

      this.dom.cur.focus(function () {
        $(this).val('');
      });

      this.dom.cur.focusout(function () {
        $(window).trigger('dv-change');
      });

      this.dom.cur.change(function () {
        var index = parseInt($(this).val()) - 1;
        if (!isNaN(index)) self.mode.changeIndex(index);
      });

      this.dom.rotateLeft.click(function (e) {
        e.preventDefault();
        _this2.mode.rotateLeft();
      });

      this.dom.rotateRight.click(function (e) {
        e.preventDefault();
        _this2.mode.rotateRight();
      });

      this.dom.download.click(function () {
        $(this).attr('href', self.mode.downloadUrl);
      });

      this.dom.print.click(function (e) {
        e.preventDefault();
        var w = window.open(_this2.mode.downloadUrl);
        $(w).ready(function () {
          return w.print();
        });
      });
    }
  }, {
    key: 'bindModeEvents',
    value: function bindModeEvents() {
      var _this3 = this;

      $(window).bind({
        'dv-inspect': function dvInspect() {
          return _this3.changeMode('inspect');
        },

        'dv-change': function dvChange() {
          var dom = _this3.dom;
          var mode = _this3.mode;
          var name = (0, _keys2.default)(_this3.modes).find(function (k) {
            return _this3.modes[k] == mode;
          });

          // set class

          dom.dv.removeClass('dv-grid-mode dv-filmstrip-mode dv-inspect-mode dv-flipbook-mode').addClass('dv-' + name + '-mode');

          // set page

          var cur = dom.cur;

          if (name == 'inspect') {
            cur.val(mode.index + 1);
          } else if (name == 'flipbook') {
            if (mode.index == 0) {
              cur.val(1);
            } else {
              var index_1 = mode.realIndex + 1;
              var index_2 = index_1 == mode.pages.length ? '' : ' - ' + (index_1 + 1);
              cur.val(index_1 + index_2);
            }
          } else if (name == 'filmstrip') {
            var _index_ = mode.firstIndex + 1;
            var _index_2 = _index_ == mode.pages.length ? '' : ' - ' + (mode.lastIndex + 1);
            cur.val(_index_ + _index_2);
          }

          cur.val(cur.val() + ' / ' + mode.pages.length);

          // set hash

          window.location.hash = 'mode/' + name + '/page/' + (mode.index + 1) + '/zoom/' + (mode.zoom + 1);
        }
      });
    }
  }, {
    key: 'initializeModes',
    value: function initializeModes(params) {
      var data = {
        dom: {
          viewport: this.dom.viewport,
          wrapper: this.dom.wrapper,
          pages: this.dom.pages,
          images: this.dom.images
        },

        zooms: params.zooms,
        pages: params.pages,
        pageUrl: params.pageUrl
      };

      this.modes = {
        'grid': new _mode_grid2.default(data),
        'filmstrip': new _mode_filmstrip2.default(data),
        'inspect': new _mode_inspect2.default(data),
        'flipbook': new _mode_flipbook2.default(data)
      };
    }
  }, {
    key: 'activateMode',
    value: function activateMode(params) {
      var hash = window.location.hash;
      var name = void 0,
          index = void 0,
          zoom = void 0;

      if (hash != '') {
        name = hash.match(/mode\/([\w-]+)/)[1];
        index = parseInt(hash.match(/page\/(\d+)/)[1]) - 1;
        zoom = parseInt(hash.match(/zoom\/(\d+)/)[1]) - 1;
      } else {
        name = params.mode;
        index = params.index;
        zoom = params.zoom;
      }

      this.mode = this.modes[name];
      this.mode.activate(index, zoom);
    }
  }, {
    key: 'changeMode',
    value: function changeMode(name) {
      var index = this.mode.index;
      var zoom = { 'grid': 0, 'filmstrip': 1, 'inspect': 3, 'flipbook': 2 }[name];

      this.mode.deactivate();
      this.mode = this.modes[name];
      this.mode.activate(index, zoom, true);

      this.moveToolbar();
    }
  }, {
    key: 'moveToolbar',
    value: function moveToolbar() {
      var scroll = $(window).scrollTop();
      var offset = this.dom.dv.offset().top;
      var height = this.dom.dv.height();

      if (scroll > offset && scroll < offset + height) {
        this.dom.dv.css('padding-top', this.dom.toolbar.outerHeight(true));
        this.dom.toolbar.css({ 'position': 'fixed' });
      } else {
        this.dom.dv.css('padding-top', 0);
        this.dom.toolbar.css({ 'position': 'relative' });
      }
    }
  }]);
  return Docview;
}();

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(58), __esModule: true };

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(59);
module.exports = __webpack_require__(0).Object.keys;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(14);
var $keys = __webpack_require__(15);

__webpack_require__(33)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(8);
var toLength = __webpack_require__(46);
var toAbsoluteIndex = __webpack_require__(61);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(29);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 62 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(64), __esModule: true };

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(65);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(3);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(10), 'Object', { defineProperty: __webpack_require__(4).f });


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "docview.css";

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "docview.png";

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = __webpack_require__(18);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _getPrototypeOf = __webpack_require__(19);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(22);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(24);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(25);

var _inherits3 = _interopRequireDefault(_inherits2);

var _mode = __webpack_require__(26);

var _mode2 = _interopRequireDefault(_mode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ModeGrid = function (_Mode) {
  (0, _inherits3.default)(ModeGrid, _Mode);

  function ModeGrid() {
    (0, _classCallCheck3.default)(this, ModeGrid);
    return (0, _possibleConstructorReturn3.default)(this, (ModeGrid.__proto__ || (0, _getPrototypeOf2.default)(ModeGrid)).apply(this, arguments));
  }

  (0, _createClass3.default)(ModeGrid, [{
    key: 'activate',
    value: function activate(index, zoom, scroll) {
      var _this2 = this;

      (0, _get3.default)(ModeGrid.prototype.__proto__ || (0, _getPrototypeOf2.default)(ModeGrid.prototype), 'activate', this).call(this, index, zoom);

      this.page.div.addClass('dv-active');

      var _loop = function _loop(page) {
        page.div.click(function () {
          _this2.page = page;
          $(window).trigger('dv-inspect');
        });
      };

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(this.pages), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var page = _step.value;

          _loop(page);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      $(window).on('scroll.dv_grid', function () {
        _this2.queue.clear();
        _this2.load();
      });

      this.redraw();

      if (scroll) this.scroll();
    }
  }, {
    key: 'deactivate',
    value: function deactivate() {
      (0, _get3.default)(ModeGrid.prototype.__proto__ || (0, _getPrototypeOf2.default)(ModeGrid.prototype), 'deactivate', this).call(this);
      this.dom.pages.removeClass('dv-active');
      this.dom.pages.off('click');
      $(window).off('scroll.dv_grid');
    }
  }, {
    key: 'zoomIn',
    value: function zoomIn() {
      if (this.zoom >= this.zooms.length - 1) return $(window).trigger('dv_max_zoom');
      this.zoom++;
      this.redraw();
    }
  }, {
    key: 'zoomOut',
    value: function zoomOut() {
      if (this.zoom == 0) return;
      this.zoom--;
      this.redraw();
    }
  }, {
    key: 'redraw',
    value: function redraw() {
      this.queue.clear();
      this.resizePages();
      this.load();
    }
  }, {
    key: 'load',
    value: function load() {
      var pageHeight = this.pageHeightWithIndent;
      var pagesInRow = Math.floor(this.dom.viewport.width() / this.pageWidthWithIndent);

      var viewport = {};
      viewport.top = $(window).scrollTop() - this.dom.viewport.offset().top;
      viewport.bottom = viewport.top + $(window).height();

      var threshold = { top: 3 * pageHeight, bottom: 3 * pageHeight

        // add to queue active pages and next pages

      };var border1 = {
        top: viewport.top,
        bottom: viewport.bottom + threshold.bottom
      };

      var firstRow1 = Math.floor(border1.top / pageHeight);
      var firstPage1 = Math.min(Math.max(0, firstRow1 * pagesInRow), this.pages.length);

      var lastRow1 = Math.floor(border1.bottom / pageHeight);
      var lastPage1 = Math.min((lastRow1 + 1) * pagesInRow, this.pages.length);

      for (var i = firstPage1; i < lastPage1; i += 1) {
        this.queue.add(this.pages[i], this.zoom);
      }

      // add to queue previous pages

      var border2 = {
        top: viewport.top - threshold.top,
        bottom: viewport.top
      };

      var firstRow2 = Math.floor(border2.top / pageHeight);
      var firstPage2 = Math.min(Math.max(0, firstRow2 * pagesInRow), this.pages.length);

      for (var _i = firstPage1 - 1; _i >= firstPage2; _i -= 1) {
        this.queue.add(this.pages[_i], this.zoom);
      }
    }
  }]);
  return ModeGrid;
}(_mode2.default);

exports.default = ModeGrid;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(36);
__webpack_require__(21);
module.exports = __webpack_require__(77);


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(71);
var step = __webpack_require__(72);
var Iterators = __webpack_require__(13);
var toIObject = __webpack_require__(8);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(49)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(38);
var descriptor = __webpack_require__(17);
var setToStringTag = __webpack_require__(39);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(11)(IteratorPrototype, __webpack_require__(1)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(4);
var anObject = __webpack_require__(9);
var getKeys = __webpack_require__(15);

module.exports = __webpack_require__(10) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(29);
var defined = __webpack_require__(27);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(9);
var get = __webpack_require__(52);
module.exports = __webpack_require__(0).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(79);
module.exports = __webpack_require__(0).Object.getPrototypeOf;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(14);
var $getPrototypeOf = __webpack_require__(51);

__webpack_require__(33)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(81), __esModule: true };

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(21);
__webpack_require__(36);
module.exports = __webpack_require__(40).f('iterator');


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(83), __esModule: true };

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(84);
__webpack_require__(89);
__webpack_require__(90);
__webpack_require__(91);
module.exports = __webpack_require__(0).Symbol;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(2);
var has = __webpack_require__(7);
var DESCRIPTORS = __webpack_require__(10);
var $export = __webpack_require__(3);
var redefine = __webpack_require__(50);
var META = __webpack_require__(85).KEY;
var $fails = __webpack_require__(12);
var shared = __webpack_require__(31);
var setToStringTag = __webpack_require__(39);
var uid = __webpack_require__(20);
var wks = __webpack_require__(1);
var wksExt = __webpack_require__(40);
var wksDefine = __webpack_require__(41);
var enumKeys = __webpack_require__(86);
var isArray = __webpack_require__(87);
var anObject = __webpack_require__(9);
var toIObject = __webpack_require__(8);
var toPrimitive = __webpack_require__(35);
var createDesc = __webpack_require__(17);
var _create = __webpack_require__(38);
var gOPNExt = __webpack_require__(88);
var $GOPD = __webpack_require__(43);
var $DP = __webpack_require__(4);
var $keys = __webpack_require__(15);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(55).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(23).f = $propertyIsEnumerable;
  __webpack_require__(42).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(37)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(11)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(20)('meta');
var isObject = __webpack_require__(16);
var has = __webpack_require__(7);
var setDesc = __webpack_require__(4).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(12)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(15);
var gOPS = __webpack_require__(42);
var pIE = __webpack_require__(23);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(28);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(8);
var gOPN = __webpack_require__(55).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 89 */
/***/ (function(module, exports) {



/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(41)('asyncIterator');


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(41)('observable');


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(93), __esModule: true };

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(94);
var $Object = __webpack_require__(0).Object;
module.exports = function getOwnPropertyDescriptor(it, key) {
  return $Object.getOwnPropertyDescriptor(it, key);
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(8);
var $getOwnPropertyDescriptor = __webpack_require__(43).f;

__webpack_require__(33)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(96), __esModule: true };

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(97);
module.exports = __webpack_require__(0).Object.setPrototypeOf;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(3);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(98).set });


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(16);
var anObject = __webpack_require__(9);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(34)(Function.call, __webpack_require__(43).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(100), __esModule: true };

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(101);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(3);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(38) });


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(103);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(104), __esModule: true };

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(21);
__webpack_require__(105);
module.exports = __webpack_require__(0).Array.from;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(34);
var $export = __webpack_require__(3);
var toObject = __webpack_require__(14);
var call = __webpack_require__(106);
var isArrayIter = __webpack_require__(107);
var toLength = __webpack_require__(46);
var createProperty = __webpack_require__(108);
var getIterFn = __webpack_require__(52);

$export($export.S + $export.F * !__webpack_require__(109)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(9);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(13);
var ITERATOR = __webpack_require__(1)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(4);
var createDesc = __webpack_require__(17);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(1)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(111);

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Page = function () {
  function Page(params, viewport) {
    (0, _classCallCheck3.default)(this, Page);

    (0, _assign2.default)(this, params);
    this.ratio = this.h / this.w;
    this.div = viewport.find('.dv-page-' + this.id);
    this.img = this.div.find('img');
    this.index = this.div.parent().children().index(this.div);
  }

  (0, _createClass3.default)(Page, [{
    key: 'url',
    value: function url(zoom) {
      return zoom == undefined ? this.img.attr('src') : Page.url(this.id, zoom);
    }
  }, {
    key: 'load',
    value: function load(zoom, callback) {
      if (this.url() == '') return this.img.on('load', callback).attr('src', this.url(zoom));

      var self = this;

      $('<img>').on('load', function () {
        self.img.attr('src', $(this).attr('src'));
        callback();
      }).attr('src', this.url(zoom));
    }
  }]);
  return Page;
}();

exports.default = Page;

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(112), __esModule: true };

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(113);
module.exports = __webpack_require__(0).Object.assign;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(3);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(114) });


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(15);
var gOPS = __webpack_require__(42);
var pIE = __webpack_require__(23);
var toObject = __webpack_require__(14);
var IObject = __webpack_require__(45);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(12)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PageDownloadQueue = function () {
  function PageDownloadQueue() {
    (0, _classCallCheck3.default)(this, PageDownloadQueue);

    this.fast = new Queue();
    this.slow = new Queue();
  }

  (0, _createClass3.default)(PageDownloadQueue, [{
    key: "clear",
    value: function clear() {
      this.fast.clear();
      this.slow.clear();
    }
  }, {
    key: "add",
    value: function add(page, zoom) {
      if (page.url() == page.url(zoom)) return;
      if (!page.url()) this.fast.add(page, 0);
      this.slow.add(page, zoom);
    }
  }]);
  return PageDownloadQueue;
}();

exports.default = PageDownloadQueue;

var Queue = function () {
  function Queue() {
    (0, _classCallCheck3.default)(this, Queue);

    this.items = [];
    this.thread = 0;
  }

  (0, _createClass3.default)(Queue, [{
    key: "clear",
    value: function clear() {
      this.items = [];
    }
  }, {
    key: "add",
    value: function add(page, zoom) {
      this.items.push({ page: page, zoom: zoom });
      this.load();
    }
  }, {
    key: "load",
    value: function load() {
      var _this = this;

      if (this.items.length == 0) return;

      var zoom = this.items[this.items.length - 1].zoom;
      var maxThread = { 0: 10, 1: 8, 2: 6, 3: 4 }[zoom] || 2;

      if (this.thread == maxThread) return;

      var item = this.items.shift();
      this.thread++;

      item.page.load(item.zoom, function () {
        _this.thread--;
        _this.load();
      });
    }
  }]);
  return Queue;
}();

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = __webpack_require__(18);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _getPrototypeOf = __webpack_require__(19);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(22);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(24);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(25);

var _inherits3 = _interopRequireDefault(_inherits2);

var _mode = __webpack_require__(26);

var _mode2 = _interopRequireDefault(_mode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ModeInspect = function (_Mode) {
  (0, _inherits3.default)(ModeInspect, _Mode);

  function ModeInspect(params) {
    (0, _classCallCheck3.default)(this, ModeInspect);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ModeInspect.__proto__ || (0, _getPrototypeOf2.default)(ModeInspect)).call(this, params));

    _this.animation = false;
    return _this;
  }

  (0, _createClass3.default)(ModeInspect, [{
    key: 'activate',
    value: function activate(index, zoom, scroll) {
      var _this2 = this;

      (0, _get3.default)(ModeInspect.prototype.__proto__ || (0, _getPrototypeOf2.default)(ModeInspect.prototype), 'activate', this).call(this, index, zoom);

      this.dom.pages.hide();
      this.page.div.show();

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(this.pages), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var page = _step.value;
          page.div.click(function () {
            return _this2.next();
          });
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.redraw();

      if (scroll) this.scroll();
    }
  }, {
    key: 'deactivate',
    value: function deactivate() {
      (0, _get3.default)(ModeInspect.prototype.__proto__ || (0, _getPrototypeOf2.default)(ModeInspect.prototype), 'deactivate', this).call(this);
      this.dom.pages.show();
      this.dom.pages.off('click');
      this.dom.wrapper.css({ width: '100%', height: 'auto' });
      this.dom.viewport.top_scrollbar(false);
      this.dom.images.css('transform', '');
      this.dom.images.css('top', 'auto');
    }
  }, {
    key: 'zoomIn',
    value: function zoomIn() {
      if (this.zoom >= this.zooms.length - 1) return $(window).trigger('dv_max_zoom');
      this.zoom++;
      this.redraw();
    }
  }, {
    key: 'zoomOut',
    value: function zoomOut() {
      if (this.zoom == 0) return;
      this.zoom--;
      this.redraw();
    }
  }, {
    key: 'next',
    value: function next() {
      this.changeIndex(this.index + 1);
    }
  }, {
    key: 'prev',
    value: function prev() {
      this.changeIndex(this.index - 1);
    }
  }, {
    key: 'changeIndex',
    value: function changeIndex(index) {
      var _this3 = this;

      if (this.animation) return;

      this.animation = true;

      this.page.div.fadeOut(100, function () {
        _this3.page.div.fadeIn(100, function () {
          _this3.animation = false;
        });
      });

      this.index = Math.min(Math.max(index, 0), this.pages.length - 1);

      this.queue.clear();
      this.load();
    }
  }, {
    key: 'rotateLeft',
    value: function rotateLeft() {
      this.rotate(-90);
    }
  }, {
    key: 'rotateRight',
    value: function rotateRight() {
      this.rotate(90);
    }
  }, {
    key: 'rotate',
    value: function rotate(angle) {
      var _this4 = this;

      var img = this.page.img;
      img.css('transition', 'transform 0.4s');
      angle = (img.data('angle') || 0) + angle;
      img.css('transform', 'rotate(' + angle + 'deg)');
      img.data('angle', angle);
      setTimeout(function () {
        return _this4.fit();
      }, 400);
    }
  }, {
    key: 'fit',
    value: function fit() {
      var img = this.page.img;

      var horizontal = this.page.w > this.page.h;
      var turned = Math.abs(Math.round(img.data('angle') / 90)) % 2 == 1;

      if (horizontal && turned) {
        img.animate({ 'top': (img.width() - img.height()) / 2 }, 200);
      } else {
        img.animate({ 'top': 0 }, 200);
      }
    }
  }, {
    key: 'redraw',
    value: function redraw() {
      this.queue.clear();
      this.resize();
      this.load();
      this.fit();
    }
  }, {
    key: 'resize',
    value: function resize() {
      this.resizePages();

      this.dom.wrapper.css({
        width: this.pageWidthWithIndent,
        height: Math.max(this.pageWidthWithIndent, this.pageHeightWithIndent)
      });

      this.dom.viewport.top_scrollbar();
    }
  }, {
    key: 'load',
    value: function load() {
      this.queue.add(this.pages[this.index], this.zoom);

      var rightImages = Math.min(5, this.pages.length - 1 - this.index);

      for (var i = 1; i <= rightImages; i += 1) {
        this.queue.add(this.pages[this.index + i], this.zoom);
      }

      var leftImages = Math.min(5, this.index);

      for (var _i = 1; _i <= leftImages; _i += 1) {
        this.queue.add(this.pages[this.index - _i], this.zoom);
      }
    }
  }]);
  return ModeInspect;
}(_mode2.default);

exports.default = ModeInspect;

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = __webpack_require__(18);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _slicedToArray2 = __webpack_require__(118);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getPrototypeOf = __webpack_require__(19);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(22);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(24);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(25);

var _inherits3 = _interopRequireDefault(_inherits2);

var _mode = __webpack_require__(26);

var _mode2 = _interopRequireDefault(_mode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ModeFlipBook = function (_Mode) {
  (0, _inherits3.default)(ModeFlipBook, _Mode);

  function ModeFlipBook(params) {
    (0, _classCallCheck3.default)(this, ModeFlipBook);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ModeFlipBook.__proto__ || (0, _getPrototypeOf2.default)(ModeFlipBook)).call(this, params));

    _this.animation = false;
    return _this;
  }

  (0, _createClass3.default)(ModeFlipBook, [{
    key: 'activate',
    value: function activate(index, zoom, scroll) {
      var _this2 = this;

      (0, _get3.default)(ModeFlipBook.prototype.__proto__ || (0, _getPrototypeOf2.default)(ModeFlipBook.prototype), 'activate', this).call(this, index, zoom);

      this.showPages();

      this.dom.pages.css('position', 'absolute');

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(this.pages.entries()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ref = _step.value;

          var _ref2 = (0, _slicedToArray3.default)(_ref, 2);

          var i = _ref2[0];
          var page = _ref2[1];

          if (i % 2 == 0) {
            page.div.css({ right: 0, top: 0 }).click(function () {
              return _this2.next();
            });
          } else {
            page.div.css({ left: 0, top: 0 }).click(function () {
              return _this2.prev();
            });
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.redraw();

      if (scroll) this.scroll();
    }
  }, {
    key: 'deactivate',
    value: function deactivate() {
      (0, _get3.default)(ModeFlipBook.prototype.__proto__ || (0, _getPrototypeOf2.default)(ModeFlipBook.prototype), 'deactivate', this).call(this);
      this.dom.pages.show();
      this.dom.pages.css('position', 'relative');
      this.dom.pages.off('click');
      this.dom.wrapper.css({ width: '100%', height: 'auto' });
      this.dom.viewport.top_scrollbar(false);
    }
  }, {
    key: 'zoomIn',
    value: function zoomIn() {
      if (this.zoom >= this.zooms.length - 1) return $(window).trigger('dv_max_zoom');
      this.zoom++;
      this.redraw();
    }
  }, {
    key: 'zoomOut',
    value: function zoomOut() {
      if (this.zoom == 0) return;
      this.zoom--;
      this.redraw();
    }
  }, {
    key: 'next',
    value: function next() {
      var _this3 = this;

      if (this.animation) return;
      if (this.realIndex > this.pages.length - 3) return;

      this.animation = true;
      var index = this.realIndex;

      var p1 = this.pages[index];
      var p2 = this.pages[index + 1];
      var p3 = this.pages[index + 2];
      var p4 = this.pages[index + 3];

      if (p4) p4.div.css('z-index', -1).show();

      p2.img.height(this.zooms[this.zoom] * p2.ratio);
      p2.img.animate({ width: 0 }, 180, function () {
        p2.div.hide();

        p3.img.css({ width: 0, right: 0 });
        p3.div.show();

        p3.img.height(_this3.zooms[_this3.zoom] * p3.ratio);
        p3.img.animate({ width: _this3.pageWidth }, 180, function () {
          if (p1) p1.div.hide();
          if (p4) p4.div.css('z-index', 'auto');

          p2.img.removeAttr('style');
          p3.img.removeAttr('style');

          _this3.changeIndex(_this3.index + 2);
          $(window).trigger('dv-change');
          _this3.animation = false;
        });
      });
    }
  }, {
    key: 'prev',
    value: function prev() {
      var _this4 = this;

      if (this.animation) return;
      if (this.realIndex < 1) return;

      this.animation = true;
      var index = this.realIndex;

      var p1 = this.pages[index - 2];
      var p2 = this.pages[index - 1];
      var p3 = this.pages[index];
      var p4 = this.pages[index + 1];

      if (p1) p1.div.show();

      p3.img.css('right', 0);

      p3.img.height(this.zooms[this.zoom] * p3.ratio);
      p3.img.animate({ width: 0 }, 180, function () {
        p3.div.hide();

        p2.img.css('width', 0);
        p2.div.css('z-index', 1).show();

        p2.img.height(_this4.zooms[_this4.zoom] * p2.ratio);
        p2.img.animate({ width: _this4.pageWidth }, 180, function () {
          if (p4) p4.div.hide();

          p3.img.removeAttr('style');
          p2.img.removeAttr('style');
          p2.div.css('z-index', 'auto');

          _this4.changeIndex(_this4.index - 2);
          $(window).trigger('dv-change');
          _this4.animation = false;
        });
      });
    }
  }, {
    key: 'changeIndex',
    value: function changeIndex(index) {
      this.index = Math.min(Math.max(index, 0), this.pages.length - 1);
      this.showPages();
      this.queue.clear();
      this.load();
    }
  }, {
    key: 'showPages',
    value: function showPages() {
      this.dom.pages.hide();

      if (this.index == 0) return this.page.div.show();

      this.pages[this.realIndex].div.show();
      if (this.realIndex + 1 < this.pages.length) this.pages[this.realIndex + 1].div.show();
    }
  }, {
    key: 'redraw',
    value: function redraw() {
      this.queue.clear();
      this.resize();
      this.load();
    }
  }, {
    key: 'resize',
    value: function resize() {
      this.resizePages();
      this.dom.wrapper.css({ width: 2 * this.pageWidth, height: this.pageHeight });
      this.dom.viewport.top_scrollbar();
    }
  }, {
    key: 'load',
    value: function load() {
      var index = Math.max(0, this.realIndex);

      this.queue.add(this.pages[index], this.zoom);
      if (index + 1 < this.pages.length) this.queue.add(this.pages[index + 1], this.zoom);

      var rightImages = Math.min(5, this.pages.length - index - 2);

      for (var i = 1; i <= rightImages; i += 1) {
        this.queue.add(this.pages[index + 1 + i], this.zoom);
      }

      var leftImages = Math.min(5, index);

      for (var _i = 1; _i <= leftImages; _i += 1) {
        this.queue.add(this.pages[index - _i], this.zoom);
      }
    }
  }, {
    key: 'realIndex',
    get: function get() {
      return this.index + this.index % 2 - 1;
    }
  }]);
  return ModeFlipBook;
}(_mode2.default);

exports.default = ModeFlipBook;

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__(119);

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(18);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(120), __esModule: true };

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(36);
__webpack_require__(21);
module.exports = __webpack_require__(121);


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(53);
var ITERATOR = __webpack_require__(1)('iterator');
var Iterators = __webpack_require__(13);
module.exports = __webpack_require__(0).isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = __webpack_require__(18);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _getPrototypeOf = __webpack_require__(19);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(22);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(24);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(25);

var _inherits3 = _interopRequireDefault(_inherits2);

var _mode = __webpack_require__(26);

var _mode2 = _interopRequireDefault(_mode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ModeFilmstrip = function (_Mode) {
  (0, _inherits3.default)(ModeFilmstrip, _Mode);

  function ModeFilmstrip() {
    (0, _classCallCheck3.default)(this, ModeFilmstrip);
    return (0, _possibleConstructorReturn3.default)(this, (ModeFilmstrip.__proto__ || (0, _getPrototypeOf2.default)(ModeFilmstrip)).apply(this, arguments));
  }

  (0, _createClass3.default)(ModeFilmstrip, [{
    key: 'activate',
    value: function activate(index, zoom, scroll) {
      var _this2 = this;

      (0, _get3.default)(ModeFilmstrip.prototype.__proto__ || (0, _getPrototypeOf2.default)(ModeFilmstrip.prototype), 'activate', this).call(this, index, zoom);

      this.page.div.addClass('dv-active');

      var _loop = function _loop(page) {
        page.div.click(function () {
          _this2.page = page;
          $(window).trigger('dv-inspect');
        });
      };

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(this.pages), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var page = _step.value;

          _loop(page);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.dom.viewport.scroll(function () {
        _this2.queue.clear();
        _this2.load();
        $(window).trigger('dv-change');
      });

      this.dom.viewport.mousewheel(function (e, d, dx, dy) {
        e.preventDefault();
        $(this).scrollLeft($(this).scrollLeft() - 50 * dy);
      });

      this.redraw();

      this.move(this.index);

      if (scroll) this.scroll();
    }
  }, {
    key: 'deactivate',
    value: function deactivate() {
      (0, _get3.default)(ModeFilmstrip.prototype.__proto__ || (0, _getPrototypeOf2.default)(ModeFilmstrip.prototype), 'deactivate', this).call(this);
      this.dom.pages.removeClass('dv-active');
      this.dom.pages.off('click');
      this.dom.viewport.off('scroll');
      this.dom.viewport.off('mousewheel');
      this.dom.wrapper.css('width', '100%');
      this.dom.viewport.top_scrollbar(false);
    }
  }, {
    key: 'zoomIn',
    value: function zoomIn() {
      if (this.zoom >= this.zooms.length - 1) return $(window).trigger('dv_max_zoom');
      this.zoom++;
      this.redraw();
    }
  }, {
    key: 'zoomOut',
    value: function zoomOut() {
      if (this.zoom == 0) return;
      this.zoom--;
      this.redraw();
    }
  }, {
    key: 'next',
    value: function next() {
      this.dom.viewport.stop().animate({ 'scrollLeft': '+=' + this.dom.viewport.width() });
    }
  }, {
    key: 'prev',
    value: function prev() {
      this.dom.viewport.stop().animate({ 'scrollLeft': '-=' + this.dom.viewport.width() });
    }
  }, {
    key: 'changeIndex',
    value: function changeIndex(index) {
      index = Math.min(Math.max(index, 0), this.pages.length - 1);
      this.dom.viewport.stop().animate({ 'scrollLeft': index * this.pageWidthWithIndent });
    }
  }, {
    key: 'move',
    value: function move(index) {
      this.dom.viewport.scrollLeft(index * this.pageWidthWithIndent);
    }
  }, {
    key: 'redraw',
    value: function redraw() {
      this.queue.clear();
      this.resize();
      this.load();
    }
  }, {
    key: 'resize',
    value: function resize() {
      this.resizePages();
      this.dom.wrapper.css('width', this.pages.length * this.pageWidthWithIndent);
      this.dom.viewport.top_scrollbar(this.pageHeight > 384);
    }
  }, {
    key: 'load',
    value: function load() {
      var pageWidth = this.pageWidthWithIndent;

      var border = {
        left: this.dom.viewport.scrollLeft(),
        right: this.dom.viewport.scrollLeft() + this.dom.viewport.width()
      };

      var threshold = { left: 7 * pageWidth, right: 7 * pageWidth

        // add to queue acive pages and next pages

      };var border1 = {
        left: border.left,
        right: border.right + threshold.right
      };

      var firstPage1 = Math.min(Math.max(0, Math.floor(border1.left / pageWidth)), this.pages.length);
      var lastPage1 = Math.min(Math.ceil(border1.right / pageWidth), this.pages.length);

      for (var i = firstPage1; i < lastPage1; i += 1) {
        this.queue.add(this.pages[i], this.zoom);
      }

      // add to queue previous pages

      var border2 = {
        left: border.left - threshold.left,
        right: border.left
      };

      var firstPage2 = Math.min(Math.max(0, Math.floor(border2.left / pageWidth)), this.pages.length);

      for (var _i = firstPage1 - 1; _i >= firstPage2; _i -= 1) {
        this.queue.add(this.pages[_i], this.zoom);
      }
    }
  }, {
    key: 'firstIndex',
    get: function get() {
      return Math.floor(this.dom.viewport.scrollLeft() / this.pageWidthWithIndent);
    }
  }, {
    key: 'lastIndex',
    get: function get() {
      var indent = this.dom.viewport.width() + this.dom.viewport.scrollLeft();
      return Math.min(Math.ceil(indent / this.pageWidthWithIndent) - 1, this.pages.length - 1);
    }
  }]);
  return ModeFilmstrip;
}(_mode2.default);

exports.default = ModeFilmstrip;

/***/ })
/******/ ]);