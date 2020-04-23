(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("canvg"));
	else if(typeof define === 'function' && define.amd)
		define(["canvg"], factory);
	else if(typeof exports === 'object')
		exports["MMEditor"] = factory(require("canvg"));
	else
		root["MMEditor"] = factory(root["canvg"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__170__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 283);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// Copyright (c) 2017 Adobe Systems Incorporated. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// ┌────────────────────────────────────────────────────────────┐ \\
// │ Eve 0.5.4 - JavaScript Events Library                      │ \\
// ├────────────────────────────────────────────────────────────┤ \\
// │ Author Dmitry Baranovskiy (http://dmitry.baranovskiy.com/) │ \\
// └────────────────────────────────────────────────────────────┘ \\

(function (glob) {
    var version = "0.5.4",
        has = "hasOwnProperty",
        separator = /[\.\/]/,
        comaseparator = /\s*,\s*/,
        wildcard = "*",
        numsort = function (a, b) {
            return a - b;
        },
        current_event,
        stop,
        events = {n: {}},
        firstDefined = function () {
            for (var i = 0, ii = this.length; i < ii; i++) {
                if (typeof this[i] != "undefined") {
                    return this[i];
                }
            }
        },
        lastDefined = function () {
            var i = this.length;
            while (--i) {
                if (typeof this[i] != "undefined") {
                    return this[i];
                }
            }
        },
        objtos = Object.prototype.toString,
        Str = String,
        isArray = Array.isArray || function (ar) {
            return ar instanceof Array || objtos.call(ar) == "[object Array]";
        },
    /*\
     * eve
     [ method ]

     * Fires event with given `name`, given scope and other parameters.

     - name (string) name of the *event*, dot (`.`) or slash (`/`) separated
     - scope (object) context for the event handlers
     - varargs (...) the rest of arguments will be sent to event handlers

     = (object) array of returned values from the listeners. Array has two methods `.firstDefined()` and `.lastDefined()` to get first or last not `undefined` value.
    \*/
        eve = function (name, scope) {
            var oldstop = stop,
                args = Array.prototype.slice.call(arguments, 2),
                listeners = eve.listeners(name),
                z = 0,
                l,
                indexed = [],
                queue = {},
                out = [],
                ce = current_event;
            out.firstDefined = firstDefined;
            out.lastDefined = lastDefined;
            current_event = name;
            stop = 0;
            for (var i = 0, ii = listeners.length; i < ii; i++) if ("zIndex" in listeners[i]) {
                indexed.push(listeners[i].zIndex);
                if (listeners[i].zIndex < 0) {
                    queue[listeners[i].zIndex] = listeners[i];
                }
            }
            indexed.sort(numsort);
            while (indexed[z] < 0) {
                l = queue[indexed[z++]];
                out.push(l.apply(scope, args));
                if (stop) {
                    stop = oldstop;
                    return out;
                }
            }
            for (i = 0; i < ii; i++) {
                l = listeners[i];
                if ("zIndex" in l) {
                    if (l.zIndex == indexed[z]) {
                        out.push(l.apply(scope, args));
                        if (stop) {
                            break;
                        }
                        do {
                            z++;
                            l = queue[indexed[z]];
                            l && out.push(l.apply(scope, args));
                            if (stop) {
                                break;
                            }
                        } while (l)
                    } else {
                        queue[l.zIndex] = l;
                    }
                } else {
                    out.push(l.apply(scope, args));
                    if (stop) {
                        break;
                    }
                }
            }
            stop = oldstop;
            current_event = ce;
            return out;
        };
    // Undocumented. Debug only.
    eve._events = events;
    /*\
     * eve.listeners
     [ method ]

     * Internal method which gives you array of all event handlers that will be triggered by the given `name`.

     - name (string) name of the event, dot (`.`) or slash (`/`) separated

     = (array) array of event handlers
    \*/
    eve.listeners = function (name) {
        var names = isArray(name) ? name : name.split(separator),
            e = events,
            item,
            items,
            k,
            i,
            ii,
            j,
            jj,
            nes,
            es = [e],
            out = [];
        for (i = 0, ii = names.length; i < ii; i++) {
            nes = [];
            for (j = 0, jj = es.length; j < jj; j++) {
                e = es[j].n;
                items = [e[names[i]], e[wildcard]];
                k = 2;
                while (k--) {
                    item = items[k];
                    if (item) {
                        nes.push(item);
                        out = out.concat(item.f || []);
                    }
                }
            }
            es = nes;
        }
        return out;
    };
    /*\
     * eve.separator
     [ method ]

     * If for some reasons you don’t like default separators (`.` or `/`) you can specify yours
     * here. Be aware that if you pass a string longer than one character it will be treated as
     * a list of characters.

     - separator (string) new separator. Empty string resets to default: `.` or `/`.
    \*/
    eve.separator = function (sep) {
        if (sep) {
            sep = Str(sep).replace(/(?=[\.\^\]\[\-])/g, "\\");
            sep = "[" + sep + "]";
            separator = new RegExp(sep);
        } else {
            separator = /[\.\/]/;
        }
    };
    /*\
     * eve.on
     [ method ]
     **
     * Binds given event handler with a given name. You can use wildcards “`*`” for the names:
     | eve.on("*.under.*", f);
     | eve("mouse.under.floor"); // triggers f
     * Use @eve to trigger the listener.
     **
     - name (string) name of the event, dot (`.`) or slash (`/`) separated, with optional wildcards
     - f (function) event handler function
     **
     - name (array) if you don’t want to use separators, you can use array of strings
     - f (function) event handler function
     **
     = (function) returned function accepts a single numeric parameter that represents z-index of the handler. It is an optional feature and only used when you need to ensure that some subset of handlers will be invoked in a given order, despite of the order of assignment.
     > Example:
     | eve.on("mouse", eatIt)(2);
     | eve.on("mouse", scream);
     | eve.on("mouse", catchIt)(1);
     * This will ensure that `catchIt` function will be called before `eatIt`.
     *
     * If you want to put your handler before non-indexed handlers, specify a negative value.
     * Note: I assume most of the time you don’t need to worry about z-index, but it’s nice to have this feature “just in case”.
    \*/
    eve.on = function (name, f) {
        if (typeof f != "function") {
            return function () {};
        }
        var names = isArray(name) ? isArray(name[0]) ? name : [name] : Str(name).split(comaseparator);
        for (var i = 0, ii = names.length; i < ii; i++) {
            (function (name) {
                var names = isArray(name) ? name : Str(name).split(separator),
                    e = events,
                    exist;
                for (var i = 0, ii = names.length; i < ii; i++) {
                    e = e.n;
                    e = e.hasOwnProperty(names[i]) && e[names[i]] || (e[names[i]] = {n: {}});
                }
                e.f = e.f || [];
                for (i = 0, ii = e.f.length; i < ii; i++) if (e.f[i] == f) {
                    exist = true;
                    break;
                }
                !exist && e.f.push(f);
            }(names[i]));
        }
        return function (zIndex) {
            if (+zIndex == +zIndex) {
                f.zIndex = +zIndex;
            }
        };
    };
    /*\
     * eve.f
     [ method ]
     **
     * Returns function that will fire given event with optional arguments.
     * Arguments that will be passed to the result function will be also
     * concated to the list of final arguments.
     | el.onclick = eve.f("click", 1, 2);
     | eve.on("click", function (a, b, c) {
     |     console.log(a, b, c); // 1, 2, [event object]
     | });
     - event (string) event name
     - varargs (…) and any other arguments
     = (function) possible event handler function
    \*/
    eve.f = function (event) {
        var attrs = [].slice.call(arguments, 1);
        return function () {
            eve.apply(null, [event, null].concat(attrs).concat([].slice.call(arguments, 0)));
        };
    };
    /*\
     * eve.stop
     [ method ]
     **
     * Is used inside an event handler to stop the event, preventing any subsequent listeners from firing.
    \*/
    eve.stop = function () {
        stop = 1;
    };
    /*\
     * eve.nt
     [ method ]
     **
     * Could be used inside event handler to figure out actual name of the event.
     **
     - subname (string) #optional subname of the event
     **
     = (string) name of the event, if `subname` is not specified
     * or
     = (boolean) `true`, if current event’s name contains `subname`
    \*/
    eve.nt = function (subname) {
        var cur = isArray(current_event) ? current_event.join(".") : current_event;
        if (subname) {
            return new RegExp("(?:\\.|\\/|^)" + subname + "(?:\\.|\\/|$)").test(cur);
        }
        return cur;
    };
    /*\
     * eve.nts
     [ method ]
     **
     * Could be used inside event handler to figure out actual name of the event.
     **
     **
     = (array) names of the event
    \*/
    eve.nts = function () {
        return isArray(current_event) ? current_event : current_event.split(separator);
    };
    /*\
     * eve.off
     [ method ]
     **
     * Removes given function from the list of event listeners assigned to given name.
     * If no arguments specified all the events will be cleared.
     **
     - name (string) name of the event, dot (`.`) or slash (`/`) separated, with optional wildcards
     - f (function) event handler function
    \*/
    /*\
     * eve.unbind
     [ method ]
     **
     * See @eve.off
    \*/
    eve.off = eve.unbind = function (name, f) {
        if (!name) {
            eve._events = events = {n: {}};
            return;
        }
        var names = isArray(name) ? isArray(name[0]) ? name : [name] : Str(name).split(comaseparator);
        if (names.length > 1) {
            for (var i = 0, ii = names.length; i < ii; i++) {
                eve.off(names[i], f);
            }
            return;
        }
        names = isArray(name) ? name : Str(name).split(separator);
        var e,
            key,
            splice,
            i, ii, j, jj,
            cur = [events],
            inodes = [];
        for (i = 0, ii = names.length; i < ii; i++) {
            for (j = 0; j < cur.length; j += splice.length - 2) {
                splice = [j, 1];
                e = cur[j].n;
                if (names[i] != wildcard) {
                    if (e[names[i]]) {
                        splice.push(e[names[i]]);
                        inodes.unshift({
                            n: e,
                            name: names[i]
                        });
                    }
                } else {
                    for (key in e) if (e[has](key)) {
                        splice.push(e[key]);
                        inodes.unshift({
                            n: e,
                            name: key
                        });
                    }
                }
                cur.splice.apply(cur, splice);
            }
        }
        for (i = 0, ii = cur.length; i < ii; i++) {
            e = cur[i];
            while (e.n) {
                if (f) {
                    if (e.f) {
                        for (j = 0, jj = e.f.length; j < jj; j++) if (e.f[j] == f) {
                            e.f.splice(j, 1);
                            break;
                        }
                        !e.f.length && delete e.f;
                    }
                    for (key in e.n) if (e.n[has](key) && e.n[key].f) {
                        var funcs = e.n[key].f;
                        for (j = 0, jj = funcs.length; j < jj; j++) if (funcs[j] == f) {
                            funcs.splice(j, 1);
                            break;
                        }
                        !funcs.length && delete e.n[key].f;
                    }
                } else {
                    delete e.f;
                    for (key in e.n) if (e.n[has](key) && e.n[key].f) {
                        delete e.n[key].f;
                    }
                }
                e = e.n;
            }
        }
        // prune inner nodes in path
        prune: for (i = 0, ii = inodes.length; i < ii; i++) {
            e = inodes[i];
            for (key in e.n[e.name].f) {
                // not empty (has listeners)
                continue prune;
            }
            for (key in e.n[e.name].n) {
                // not empty (has children)
                continue prune;
            }
            // is empty
            delete e.n[e.name];
        }
    };
    /*\
     * eve.once
     [ method ]
     **
     * Binds given event handler with a given name to only run once then unbind itself.
     | eve.once("login", f);
     | eve("login"); // triggers f
     | eve("login"); // no listeners
     * Use @eve to trigger the listener.
     **
     - name (string) name of the event, dot (`.`) or slash (`/`) separated, with optional wildcards
     - f (function) event handler function
     **
     = (function) same return function as @eve.on
    \*/
    eve.once = function (name, f) {
        var f2 = function () {
            eve.off(name, f2);
            return f.apply(this, arguments);
        };
        return eve.on(name, f2);
    };
    /*\
     * eve.version
     [ property (string) ]
     **
     * Current version of the library.
    \*/
    eve.version = version;
    eve.toString = function () {
        return "You are running Eve " + version;
    };
    glob.eve = eve;
     true && module.exports ? module.exports = eve :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () { return eve; }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
})(typeof window != "undefined" ? window : this);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var getOwnPropertyDescriptor = __webpack_require__(36).f;
var createNonEnumerableProperty = __webpack_require__(18);
var redefine = __webpack_require__(19);
var setGlobal = __webpack_require__(86);
var copyConstructorProperties = __webpack_require__(173);
var isForced = __webpack_require__(90);

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var shared = __webpack_require__(87);
var has = __webpack_require__(9);
var uid = __webpack_require__(65);
var NATIVE_SYMBOL = __webpack_require__(103);
var USE_SYMBOL_AS_UID = __webpack_require__(141);

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (NATIVE_SYMBOL && has(Symbol, name)) WellKnownSymbolsStore[name] = Symbol[name];
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var _Object$defineProperty = __webpack_require__(125);

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;

    _Object$defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(171)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(2);

// Thank's IE8 for his funny defineProperty
module.exports = !fails(function () {
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(7);
var IE8_DOM_DEFINE = __webpack_require__(117);
var anObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(37);

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(21);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(97)('wks');
var uid = __webpack_require__(71);
var Symbol = __webpack_require__(12).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(23);

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(62);
var requireObjectCoercible = __webpack_require__(23);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(7);
var definePropertyModule = __webpack_require__(10);
var createPropertyDescriptor = __webpack_require__(45);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var createNonEnumerableProperty = __webpack_require__(18);
var has = __webpack_require__(9);
var setGlobal = __webpack_require__(86);
var inspectSource = __webpack_require__(119);
var InternalStateModule = __webpack_require__(46);

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});


/***/ }),
/* 20 */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(26);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(12);
var core = __webpack_require__(14);
var ctx = __webpack_require__(49);
var hide = __webpack_require__(31);
var has = __webpack_require__(32);
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
    if (own && has(exports, key)) continue;
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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(22);
var IE8_DOM_DEFINE = __webpack_require__(126);
var toPrimitive = __webpack_require__(92);
var dP = Object.defineProperty;

exports.f = __webpack_require__(27) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
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
/* 26 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(50)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(7);
var fails = __webpack_require__(2);
var has = __webpack_require__(9);

var defineProperty = Object.defineProperty;
var cache = {};

var thrower = function (it) { throw it; };

module.exports = function (METHOD_NAME, options) {
  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
  if (!options) options = {};
  var method = [][METHOD_NAME];
  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
  var argument0 = has(options, 0) ? options[0] : thrower;
  var argument1 = has(options, 1) ? options[1] : undefined;

  return cache[METHOD_NAME] = !!method && !fails(function () {
    if (ACCESSORS && !DESCRIPTORS) return true;
    var O = { length: -1 };

    if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
    else O[1] = 1;

    method.call(O, argument0, argument1);
  });
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(1);
var fails = __webpack_require__(2);
var isArray = __webpack_require__(39);
var isObject = __webpack_require__(8);
var toObject = __webpack_require__(16);
var toLength = __webpack_require__(13);
var createProperty = __webpack_require__(77);
var arraySpeciesCreate = __webpack_require__(75);
var arrayMethodHasSpeciesSupport = __webpack_require__(57);
var wellKnownSymbol = __webpack_require__(3);
var V8_VERSION = __webpack_require__(145);

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$({ target: 'Array', proto: true, forced: FORCED }, {
  concat: function concat(arg) { // eslint-disable-line no-unused-vars
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});


/***/ }),
/* 30 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(25);
var createDesc = __webpack_require__(70);
module.exports = __webpack_require__(27) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 32 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(1);
var forEach = __webpack_require__(140);

// `Array.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
$({ target: 'Array', proto: true, forced: [].forEach != forEach }, {
  forEach: forEach
});


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var DOMIterables = __webpack_require__(142);
var forEach = __webpack_require__(140);
var createNonEnumerableProperty = __webpack_require__(18);

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
}


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(114);

var assertThisInitialized = __webpack_require__(20);

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(7);
var propertyIsEnumerableModule = __webpack_require__(85);
var createPropertyDescriptor = __webpack_require__(45);
var toIndexedObject = __webpack_require__(17);
var toPrimitive = __webpack_require__(37);
var has = __webpack_require__(9);
var IE8_DOM_DEFINE = __webpack_require__(117);

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(182);
var defined = __webpack_require__(94);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(30);

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(107);
var redefine = __webpack_require__(19);
var toString = __webpack_require__(217);

// `Object.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, { unsafe: true });
}


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(1);
var exec = __webpack_require__(80);

$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(1);
var parseIntImplementation = __webpack_require__(235);

// `parseInt` method
// https://tc39.github.io/ecma262/#sec-parseint-string-radix
$({ global: true, forced: parseInt != parseIntImplementation }, {
  parseInt: parseIntImplementation
});


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var _Object$getPrototypeOf = __webpack_require__(197);

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = _Object$getPrototypeOf || function _getPrototypeOf(o) {
    return o.__proto__;
  };

  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(201);

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  setPrototypeOf(subClass.prototype, superClass && superClass.prototype);
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;

/***/ }),
/* 45 */
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
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(172);
var global = __webpack_require__(6);
var isObject = __webpack_require__(8);
var createNonEnumerableProperty = __webpack_require__(18);
var objectHas = __webpack_require__(9);
var sharedKey = __webpack_require__(63);
var hiddenKeys = __webpack_require__(47);

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(122);
var global = __webpack_require__(6);

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(69);
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
/* 50 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 53 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__(73);
var IndexedObject = __webpack_require__(62);
var toObject = __webpack_require__(16);
var toLength = __webpack_require__(13);
var arraySpeciesCreate = __webpack_require__(75);

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else if (IS_EVERY) return false;  // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6)
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(2);

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(11);
var defineProperties = __webpack_require__(143);
var enumBugKeys = __webpack_require__(88);
var hiddenKeys = __webpack_require__(47);
var html = __webpack_require__(207);
var documentCreateElement = __webpack_require__(118);
var sharedKey = __webpack_require__(63);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(2);
var wellKnownSymbol = __webpack_require__(3);
var V8_VERSION = __webpack_require__(145);

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};


/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__(109);
var isRegExp = __webpack_require__(230);
var anObject = __webpack_require__(11);
var requireObjectCoercible = __webpack_require__(23);
var speciesConstructor = __webpack_require__(231);
var advanceStringIndex = __webpack_require__(110);
var toLength = __webpack_require__(13);
var callRegExpExec = __webpack_require__(111);
var regexpExec = __webpack_require__(80);
var fails = __webpack_require__(2);

var arrayPush = [].push;
var min = Math.min;
var MAX_UINT32 = 0xFFFFFFFF;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });

// @@split logic
fixRegExpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) {
        return nativeSplit.call(string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output.length > lim ? output.slice(0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
}, !SUPPORTS_Y);


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(19);

var DatePrototype = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var nativeDateToString = DatePrototype[TO_STRING];
var getTime = DatePrototype.getTime;

// `Date.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-date.prototype.tostring
if (new Date(NaN) + '' != INVALID_DATE) {
  redefine(DatePrototype, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? nativeDateToString.call(this) : INVALID_DATE;
  });
}


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefine = __webpack_require__(19);
var anObject = __webpack_require__(11);
var fails = __webpack_require__(2);
var flags = __webpack_require__(153);

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var nativeToString = RegExpPrototype[TO_STRING];

var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = nativeToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = String(R.source);
    var rf = R.flags;
    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? flags.call(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(2);
var classof = __webpack_require__(30);

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(87);
var uid = __webpack_require__(65);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),
/* 64 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 65 */
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(123);
var enumBugKeys = __webpack_require__(88);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(21);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(123);
var enumBugKeys = __webpack_require__(88);

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 70 */
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
/* 71 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(25).f;
var has = __webpack_require__(32);
var TAG = __webpack_require__(15)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(74);

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
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
/* 74 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
var isArray = __webpack_require__(39);
var wellKnownSymbol = __webpack_require__(3);

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(10).f;
var has = __webpack_require__(9);
var wellKnownSymbol = __webpack_require__(3);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toPrimitive = __webpack_require__(37);
var definePropertyModule = __webpack_require__(10);
var createPropertyDescriptor = __webpack_require__(45);

module.exports = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(3);
var create = __webpack_require__(56);
var definePropertyModule = __webpack_require__(10);

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(1);
var $map = __webpack_require__(54).map;
var arrayMethodHasSpeciesSupport = __webpack_require__(57);
var arrayMethodUsesToLength = __webpack_require__(28);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');
// FF49- issue
var USES_TO_LENGTH = arrayMethodUsesToLength('map');

// `Array.prototype.map` method
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpFlags = __webpack_require__(153);
var stickyHelpers = __webpack_require__(218);

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(23);
var whitespaces = __webpack_require__(82);

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};


/***/ }),
/* 82 */
/***/ (function(module, exports) {

// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(1);
var global = __webpack_require__(6);
var userAgent = __webpack_require__(146);

var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check

var wrap = function (scheduler) {
  return function (handler, timeout /* , ...arguments */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : undefined;
    return scheduler(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof handler == 'function' ? handler : Function(handler)).apply(this, args);
    } : handler, timeout);
  };
};

// ie9- setTimeout & setInterval additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
$({ global: true, bind: true, forced: MSIE }, {
  // `setTimeout` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
  setTimeout: wrap(global.setTimeout),
  // `setInterval` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
  setInterval: wrap(global.setInterval)
});


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(1);
var assign = __webpack_require__(174);

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
$({ target: 'Object', stat: true, forced: Object.assign !== assign }, {
  assign: assign
});


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var createNonEnumerableProperty = __webpack_require__(18);

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__(64);
var store = __webpack_require__(120);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.4',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 88 */
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),
/* 89 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(2);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(26);
var document = __webpack_require__(12).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(26);
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
/* 93 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 94 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(131);
var enumBugKeys = __webpack_require__(98);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(97)('keys');
var uid = __webpack_require__(71);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(14);
var global = __webpack_require__(12);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(51) ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 98 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(94);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(15);


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(12);
var core = __webpack_require__(14);
var LIBRARY = __webpack_require__(51);
var wksExt = __webpack_require__(100);
var defineProperty = __webpack_require__(25).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 102 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(2);

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(1);
var $filter = __webpack_require__(54).filter;
var arrayMethodHasSpeciesSupport = __webpack_require__(57);
var arrayMethodUsesToLength = __webpack_require__(28);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');
// Edge 14- issue
var USES_TO_LENGTH = arrayMethodUsesToLength('filter');

// `Array.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(1);
var createIteratorConstructor = __webpack_require__(210);
var getPrototypeOf = __webpack_require__(150);
var setPrototypeOf = __webpack_require__(151);
var setToStringTag = __webpack_require__(76);
var createNonEnumerableProperty = __webpack_require__(18);
var redefine = __webpack_require__(19);
var wellKnownSymbol = __webpack_require__(3);
var IS_PURE = __webpack_require__(64);
var Iterators = __webpack_require__(58);
var IteratorsCore = __webpack_require__(149);

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
  }
  Iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(1);
var toObject = __webpack_require__(16);
var nativeKeys = __webpack_require__(68);
var fails = __webpack_require__(2);

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(3);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__(109);
var anObject = __webpack_require__(11);
var toObject = __webpack_require__(16);
var toLength = __webpack_require__(13);
var toInteger = __webpack_require__(21);
var requireObjectCoercible = __webpack_require__(23);
var advanceStringIndex = __webpack_require__(110);
var regExpExec = __webpack_require__(111);

var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
      return replacer !== undefined
        ? replacer.call(searchValue, O, replaceValue)
        : nativeReplace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      if (
        (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
        (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
      ) {
        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
        if (res.done) return res.value;
      }

      var rx = anObject(regexp);
      var S = String(this);

      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        results.push(result);
        if (!global) break;

        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

  // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return nativeReplace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__(41);
var redefine = __webpack_require__(19);
var fails = __webpack_require__(2);
var wellKnownSymbol = __webpack_require__(3);
var regexpExec = __webpack_require__(80);
var createNonEnumerableProperty = __webpack_require__(18);

var SPECIES = wellKnownSymbol('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  return 'a'.replace(/./, '$0') === '$0';
})();

var REPLACE = wellKnownSymbol('replace');
// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

module.exports = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !(
      REPLACE_SUPPORTS_NAMED_GROUPS &&
      REPLACE_KEEPS_$0 &&
      !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    )) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    }, {
      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
  }

  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__(158).charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(30);
var regexpExec = __webpack_require__(80);

// `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classof(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};



/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(7);
var defineProperty = __webpack_require__(10).f;

var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// Function instances `.name` property
// https://tc39.github.io/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !(NAME in FunctionPrototype)) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(69);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var _Symbol$iterator = __webpack_require__(177);

var _Symbol = __webpack_require__(188);

function _typeof2(obj) { if (typeof _Symbol === "function" && typeof _Symbol$iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof _Symbol === "function" && obj.constructor === _Symbol && obj !== _Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof _Symbol === "function" && _typeof2(_Symbol$iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof _Symbol === "function" && obj.constructor === _Symbol && obj !== _Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var _Object$defineProperty = __webpack_require__(125);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    _Object$defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(261);


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(7);
var fails = __webpack_require__(2);
var createElement = __webpack_require__(118);

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var isObject = __webpack_require__(8);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(120);

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var setGlobal = __webpack_require__(86);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(48);
var getOwnPropertyNamesModule = __webpack_require__(66);
var getOwnPropertySymbolsModule = __webpack_require__(89);
var anObject = __webpack_require__(11);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);

module.exports = global;


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(9);
var toIndexedObject = __webpack_require__(17);
var indexOf = __webpack_require__(124).indexOf;
var hiddenKeys = __webpack_require__(47);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(17);
var toLength = __webpack_require__(13);
var toAbsoluteIndex = __webpack_require__(67);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
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
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(175);

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(27) && !__webpack_require__(50)(function () {
  return Object.defineProperty(__webpack_require__(91)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(179)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(128)(String, 'String', function (iterated) {
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
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(51);
var $export = __webpack_require__(24);
var redefine = __webpack_require__(129);
var hide = __webpack_require__(31);
var Iterators = __webpack_require__(52);
var $iterCreate = __webpack_require__(180);
var setToStringTag = __webpack_require__(72);
var getPrototypeOf = __webpack_require__(134);
var ITERATOR = __webpack_require__(15)('iterator');
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
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
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
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(31);


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(22);
var dPs = __webpack_require__(181);
var enumBugKeys = __webpack_require__(98);
var IE_PROTO = __webpack_require__(96)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(91)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(133).appendChild(iframe);
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
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(32);
var toIObject = __webpack_require__(38);
var arrayIndexOf = __webpack_require__(183)(false);
var IE_PROTO = __webpack_require__(96)('IE_PROTO');

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
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(93);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(12).document;
module.exports = document && document.documentElement;


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(32);
var toObject = __webpack_require__(99);
var IE_PROTO = __webpack_require__(96)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(185);
var global = __webpack_require__(12);
var hide = __webpack_require__(31);
var Iterators = __webpack_require__(52);
var TO_STRING_TAG = __webpack_require__(15)('toStringTag');

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
/* 136 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(131);
var hiddenKeys = __webpack_require__(98).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(102);
var createDesc = __webpack_require__(70);
var toIObject = __webpack_require__(38);
var toPrimitive = __webpack_require__(92);
var has = __webpack_require__(32);
var IE8_DOM_DEFINE = __webpack_require__(126);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(27) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 139 */
/***/ (function(module, exports) {



/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $forEach = __webpack_require__(54).forEach;
var arrayMethodIsStrict = __webpack_require__(55);
var arrayMethodUsesToLength = __webpack_require__(28);

var STRICT_METHOD = arrayMethodIsStrict('forEach');
var USES_TO_LENGTH = arrayMethodUsesToLength('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
module.exports = (!STRICT_METHOD || !USES_TO_LENGTH) ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach;


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_SYMBOL = __webpack_require__(103);

module.exports = NATIVE_SYMBOL
  // eslint-disable-next-line no-undef
  && !Symbol.sham
  // eslint-disable-next-line no-undef
  && typeof Symbol.iterator == 'symbol';


/***/ }),
/* 142 */
/***/ (function(module, exports) {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(7);
var definePropertyModule = __webpack_require__(10);
var anObject = __webpack_require__(11);
var objectKeys = __webpack_require__(68);

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(3);

exports.f = wellKnownSymbol;


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var userAgent = __webpack_require__(146);

var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(48);

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(1);
var $indexOf = __webpack_require__(124).indexOf;
var arrayMethodIsStrict = __webpack_require__(55);
var arrayMethodUsesToLength = __webpack_require__(28);

var nativeIndexOf = [].indexOf;

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('indexOf');
var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

// `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
$({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? nativeIndexOf.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__(17);
var addToUnscopables = __webpack_require__(78);
var Iterators = __webpack_require__(58);
var InternalStateModule = __webpack_require__(46);
var defineIterator = __webpack_require__(105);

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getPrototypeOf = __webpack_require__(150);
var createNonEnumerableProperty = __webpack_require__(18);
var has = __webpack_require__(9);
var wellKnownSymbol = __webpack_require__(3);
var IS_PURE = __webpack_require__(64);

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if (!IS_PURE && !has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(9);
var toObject = __webpack_require__(16);
var sharedKey = __webpack_require__(63);
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(211);

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(11);
var aPossiblePrototype = __webpack_require__(212);

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(107);
var classofRaw = __webpack_require__(30);
var wellKnownSymbol = __webpack_require__(3);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(11);

// `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

var hiddenKeys = __webpack_require__(47);
var isObject = __webpack_require__(8);
var has = __webpack_require__(9);
var defineProperty = __webpack_require__(10).f;
var uid = __webpack_require__(65);
var FREEZING = __webpack_require__(221);

var METADATA = uid('meta');
var id = 0;

var isExtensible = Object.isExtensible || function () {
  return true;
};

var setMetadata = function (it) {
  defineProperty(it, METADATA, { value: {
    objectID: 'O' + ++id, // object ID
    weakData: {}          // weak collections IDs
  } });
};

var fastKey = function (it, create) {
  // return a primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMetadata(it);
  // return object ID
  } return it[METADATA].objectID;
};

var getWeakData = function (it, create) {
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMetadata(it);
  // return the store of weak collections IDs
  } return it[METADATA].weakData;
};

// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZING && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
  return it;
};

var meta = module.exports = {
  REQUIRED: false,
  fastKey: fastKey,
  getWeakData: getWeakData,
  onFreeze: onFreeze
};

hiddenKeys[METADATA] = true;


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(11);
var isArrayIteratorMethod = __webpack_require__(222);
var toLength = __webpack_require__(13);
var bind = __webpack_require__(73);
var getIteratorMethod = __webpack_require__(223);
var callWithSafeIterationClosing = __webpack_require__(224);

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
  var boundFunction = bind(fn, that, AS_ENTRIES ? 2 : 1);
  var iterator, iterFn, index, length, result, next, step;

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = AS_ENTRIES
          ? boundFunction(anObject(step = iterable[index])[0], step[1])
          : boundFunction(iterable[index]);
        if (result && result instanceof Result) return result;
      } return new Result(false);
    }
    iterator = iterFn.call(iterable);
  }

  next = iterator.next;
  while (!(step = next.call(iterator)).done) {
    result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
    if (typeof result == 'object' && result && result instanceof Result) return result;
  } return new Result(false);
};

iterate.stop = function (result) {
  return new Result(true, result);
};


/***/ }),
/* 156 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
var setPrototypeOf = __webpack_require__(151);

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(21);
var requireObjectCoercible = __webpack_require__(23);

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(1);
var $find = __webpack_require__(54).find;
var addToUnscopables = __webpack_require__(78);
var arrayMethodUsesToLength = __webpack_require__(28);

var FIND = 'find';
var SKIPS_HOLES = true;

var USES_TO_LENGTH = arrayMethodUsesToLength(FIND);

// Shouldn't skip holes
if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

// `Array.prototype.find` method
// https://tc39.github.io/ecma262/#sec-array.prototype.find
$({ target: 'Array', proto: true, forced: SKIPS_HOLES || !USES_TO_LENGTH }, {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND);


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(1);
var isObject = __webpack_require__(8);
var isArray = __webpack_require__(39);
var toAbsoluteIndex = __webpack_require__(67);
var toLength = __webpack_require__(13);
var toIndexedObject = __webpack_require__(17);
var createProperty = __webpack_require__(77);
var wellKnownSymbol = __webpack_require__(3);
var arrayMethodHasSpeciesSupport = __webpack_require__(57);
var arrayMethodUsesToLength = __webpack_require__(28);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');
var USES_TO_LENGTH = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });

var SPECIES = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(1);
var isArray = __webpack_require__(39);

// `Array.isArray` method
// https://tc39.github.io/ecma262/#sec-array.isarray
$({ target: 'Array', stat: true }, {
  isArray: isArray
});


/***/ }),
/* 162 */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(53);
var TAG = __webpack_require__(15)('toStringTag');
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
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(22);
var aFunction = __webpack_require__(69);
var SPECIES = __webpack_require__(15)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(49);
var invoke = __webpack_require__(270);
var html = __webpack_require__(133);
var cel = __webpack_require__(91);
var global = __webpack_require__(12);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(53)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 166 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(22);
var isObject = __webpack_require__(26);
var newPromiseCapability = __webpack_require__(113);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(233);
var bytesToUuid = __webpack_require__(234);

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

var _Promise = __webpack_require__(262);

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new _Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          _Promise.resolve(value).then(_next, _throw);
        }
      }

      function _next(value) {
        step("next", value);
      }

      function _throw(err) {
        step("throw", err);
      }

      _next();
    });
  };
}

module.exports = _asyncToGenerator;

/***/ }),
/* 170 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__170__;

/***/ }),
/* 171 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var inspectSource = __webpack_require__(119);

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(9);
var ownKeys = __webpack_require__(121);
var getOwnPropertyDescriptorModule = __webpack_require__(36);
var definePropertyModule = __webpack_require__(10);

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(7);
var fails = __webpack_require__(2);
var objectKeys = __webpack_require__(68);
var getOwnPropertySymbolsModule = __webpack_require__(89);
var propertyIsEnumerableModule = __webpack_require__(85);
var toObject = __webpack_require__(16);
var IndexedObject = __webpack_require__(62);

var nativeAssign = Object.assign;
var defineProperty = Object.defineProperty;

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
module.exports = !nativeAssign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS && nativeAssign({ b: 1 }, nativeAssign(defineProperty({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  } return T;
} : nativeAssign;


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(176);
var $Object = __webpack_require__(14).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(24);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(27), 'Object', { defineProperty: __webpack_require__(25).f });


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(178);

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(127);
__webpack_require__(135);
module.exports = __webpack_require__(100).f('iterator');


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(93);
var defined = __webpack_require__(94);
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
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(130);
var descriptor = __webpack_require__(70);
var setToStringTag = __webpack_require__(72);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(31)(IteratorPrototype, __webpack_require__(15)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(25);
var anObject = __webpack_require__(22);
var getKeys = __webpack_require__(95);

module.exports = __webpack_require__(27) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(53);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(38);
var toLength = __webpack_require__(132);
var toAbsoluteIndex = __webpack_require__(184);
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
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(93);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(186);
var step = __webpack_require__(187);
var Iterators = __webpack_require__(52);
var toIObject = __webpack_require__(38);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(128)(Array, 'Array', function (iterated, kind) {
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
/* 186 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 187 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(189);

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(190);
__webpack_require__(139);
__webpack_require__(195);
__webpack_require__(196);
module.exports = __webpack_require__(14).Symbol;


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(12);
var has = __webpack_require__(32);
var DESCRIPTORS = __webpack_require__(27);
var $export = __webpack_require__(24);
var redefine = __webpack_require__(129);
var META = __webpack_require__(191).KEY;
var $fails = __webpack_require__(50);
var shared = __webpack_require__(97);
var setToStringTag = __webpack_require__(72);
var uid = __webpack_require__(71);
var wks = __webpack_require__(15);
var wksExt = __webpack_require__(100);
var wksDefine = __webpack_require__(101);
var enumKeys = __webpack_require__(192);
var isArray = __webpack_require__(193);
var anObject = __webpack_require__(22);
var isObject = __webpack_require__(26);
var toObject = __webpack_require__(99);
var toIObject = __webpack_require__(38);
var toPrimitive = __webpack_require__(92);
var createDesc = __webpack_require__(70);
var _create = __webpack_require__(130);
var gOPNExt = __webpack_require__(194);
var $GOPD = __webpack_require__(138);
var $GOPS = __webpack_require__(136);
var $DP = __webpack_require__(25);
var $keys = __webpack_require__(95);
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
var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
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
  __webpack_require__(137).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(102).f = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(51)) {
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

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return $GOPS.f(toObject(it));
  }
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
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(31)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(71)('meta');
var isObject = __webpack_require__(26);
var has = __webpack_require__(32);
var setDesc = __webpack_require__(25).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(50)(function () {
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
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(95);
var gOPS = __webpack_require__(136);
var pIE = __webpack_require__(102);
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
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(53);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(38);
var gOPN = __webpack_require__(137).f;
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
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(101)('asyncIterator');


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(101)('observable');


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(198);

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(199);
module.exports = __webpack_require__(14).Object.getPrototypeOf;


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(99);
var $getPrototypeOf = __webpack_require__(134);

__webpack_require__(200)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(24);
var core = __webpack_require__(14);
var fails = __webpack_require__(50);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

var _Object$setPrototypeOf = __webpack_require__(202);

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = _Object$setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(203);

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(204);
module.exports = __webpack_require__(14).Object.setPrototypeOf;


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(24);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(205).set });


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(26);
var anObject = __webpack_require__(22);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(49)(Function.call, __webpack_require__(138).f(Object.prototype, '__proto__').set, 2);
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
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(1);
var global = __webpack_require__(6);
var getBuiltIn = __webpack_require__(48);
var IS_PURE = __webpack_require__(64);
var DESCRIPTORS = __webpack_require__(7);
var NATIVE_SYMBOL = __webpack_require__(103);
var USE_SYMBOL_AS_UID = __webpack_require__(141);
var fails = __webpack_require__(2);
var has = __webpack_require__(9);
var isArray = __webpack_require__(39);
var isObject = __webpack_require__(8);
var anObject = __webpack_require__(11);
var toObject = __webpack_require__(16);
var toIndexedObject = __webpack_require__(17);
var toPrimitive = __webpack_require__(37);
var createPropertyDescriptor = __webpack_require__(45);
var nativeObjectCreate = __webpack_require__(56);
var objectKeys = __webpack_require__(68);
var getOwnPropertyNamesModule = __webpack_require__(66);
var getOwnPropertyNamesExternal = __webpack_require__(208);
var getOwnPropertySymbolsModule = __webpack_require__(89);
var getOwnPropertyDescriptorModule = __webpack_require__(36);
var definePropertyModule = __webpack_require__(10);
var propertyIsEnumerableModule = __webpack_require__(85);
var createNonEnumerableProperty = __webpack_require__(18);
var redefine = __webpack_require__(19);
var shared = __webpack_require__(87);
var sharedKey = __webpack_require__(63);
var hiddenKeys = __webpack_require__(47);
var uid = __webpack_require__(65);
var wellKnownSymbol = __webpack_require__(3);
var wrappedWellKnownSymbolModule = __webpack_require__(144);
var defineWellKnownSymbol = __webpack_require__(209);
var setToStringTag = __webpack_require__(76);
var InternalStateModule = __webpack_require__(46);
var $forEach = __webpack_require__(54).forEach;

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);
var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = DESCRIPTORS && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var isSymbol = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return Object(it) instanceof $Symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPrimitive(P, true);
  anObject(Attributes);
  if (has(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPrimitive(V, true);
  var enumerable = nativePropertyIsEnumerable.call(this, P);
  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPrimitive(P, true);
  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.github.io/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };
    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return getInternalState(this).tag;
  });

  redefine($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
    if (!IS_PURE) {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }
}

$({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});

$({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
  // `Symbol.for` method
  // https://tc39.github.io/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = String(key);
    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
  // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
$({ target: 'Object', stat: true, forced: fails(function () { getOwnPropertySymbolsModule.f(1); }) }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return getOwnPropertySymbolsModule.f(toObject(it));
  }
});

// `JSON.stringify` method behavior with symbols
// https://tc39.github.io/ecma262/#sec-json.stringify
if ($stringify) {
  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function () {
    var symbol = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    return $stringify([symbol]) != '[null]'
      // WebKit converts symbol values to JSON as null
      || $stringify({ a: symbol }) != '{}'
      // V8 throws on boxed symbols
      || $stringify(Object(symbol)) != '{}';
  });

  $({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
    // eslint-disable-next-line no-unused-vars
    stringify: function stringify(it, replacer, space) {
      var args = [it];
      var index = 1;
      var $replacer;
      while (arguments.length > index) args.push(arguments[index++]);
      $replacer = replacer;
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!isArray(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return $stringify.apply(null, args);
    }
  });
}

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive
if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
  createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
}
// `Symbol.prototype[@@toStringTag]` property
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(48);

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(17);
var nativeGetOwnPropertyNames = __webpack_require__(66).f;

var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return nativeGetOwnPropertyNames(it);
  } catch (error) {
    return windowNames.slice();
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]'
    ? getWindowNames(it)
    : nativeGetOwnPropertyNames(toIndexedObject(it));
};


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(122);
var has = __webpack_require__(9);
var wrappedWellKnownSymbolModule = __webpack_require__(144);
var defineProperty = __webpack_require__(10).f;

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var IteratorPrototype = __webpack_require__(149).IteratorPrototype;
var create = __webpack_require__(56);
var createPropertyDescriptor = __webpack_require__(45);
var setToStringTag = __webpack_require__(76);
var Iterators = __webpack_require__(58);

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(2);

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(1);
var DESCRIPTORS = __webpack_require__(7);
var defineProperties = __webpack_require__(143);

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
$({ target: 'Object', stat: true, forced: !DESCRIPTORS, sham: !DESCRIPTORS }, {
  defineProperties: defineProperties
});


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(1);
var DESCRIPTORS = __webpack_require__(7);
var objectDefinePropertyModile = __webpack_require__(10);

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
$({ target: 'Object', stat: true, forced: !DESCRIPTORS, sham: !DESCRIPTORS }, {
  defineProperty: objectDefinePropertyModile.f
});


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(1);
var fails = __webpack_require__(2);
var toIndexedObject = __webpack_require__(17);
var nativeGetOwnPropertyDescriptor = __webpack_require__(36).f;
var DESCRIPTORS = __webpack_require__(7);

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetOwnPropertyDescriptor(1); });
var FORCED = !DESCRIPTORS || FAILS_ON_PRIMITIVES;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
$({ target: 'Object', stat: true, forced: FORCED, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
  }
});


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(1);
var DESCRIPTORS = __webpack_require__(7);
var ownKeys = __webpack_require__(121);
var toIndexedObject = __webpack_require__(17);
var getOwnPropertyDescriptorModule = __webpack_require__(36);
var createProperty = __webpack_require__(77);

// `Object.getOwnPropertyDescriptors` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIndexedObject(object);
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    var keys = ownKeys(O);
    var result = {};
    var index = 0;
    var key, descriptor;
    while (keys.length > index) {
      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
      if (descriptor !== undefined) createProperty(result, key, descriptor);
    }
    return result;
  }
});


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__(107);
var classof = __webpack_require__(152);

// `Object.prototype.toString` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__(2);

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
// so we use an intermediate function.
function RE(s, f) {
  return RegExp(s, f);
}

exports.UNSUPPORTED_Y = fails(function () {
  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

exports.BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var collection = __webpack_require__(220);
var collectionStrong = __webpack_require__(226);

// `Set` constructor
// https://tc39.github.io/ecma262/#sec-set-objects
module.exports = collection('Set', function (init) {
  return function Set() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong);


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(1);
var global = __webpack_require__(6);
var isForced = __webpack_require__(90);
var redefine = __webpack_require__(19);
var InternalMetadataModule = __webpack_require__(154);
var iterate = __webpack_require__(155);
var anInstance = __webpack_require__(156);
var isObject = __webpack_require__(8);
var fails = __webpack_require__(2);
var checkCorrectnessOfIteration = __webpack_require__(225);
var setToStringTag = __webpack_require__(76);
var inheritIfRequired = __webpack_require__(157);

module.exports = function (CONSTRUCTOR_NAME, wrapper, common) {
  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
  var ADDER = IS_MAP ? 'set' : 'add';
  var NativeConstructor = global[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var Constructor = NativeConstructor;
  var exported = {};

  var fixMethod = function (KEY) {
    var nativeMethod = NativePrototype[KEY];
    redefine(NativePrototype, KEY,
      KEY == 'add' ? function add(value) {
        nativeMethod.call(this, value === 0 ? 0 : value);
        return this;
      } : KEY == 'delete' ? function (key) {
        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
      } : KEY == 'get' ? function get(key) {
        return IS_WEAK && !isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
      } : KEY == 'has' ? function has(key) {
        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
      } : function set(key, value) {
        nativeMethod.call(this, key === 0 ? 0 : key, value);
        return this;
      }
    );
  };

  // eslint-disable-next-line max-len
  if (isForced(CONSTRUCTOR_NAME, typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
    new NativeConstructor().entries().next();
  })))) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    InternalMetadataModule.REQUIRED = true;
  } else if (isForced(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    // eslint-disable-next-line no-new
    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new NativeConstructor();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });

    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function (dummy, iterable) {
        anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
        if (iterable != undefined) iterate(iterable, that[ADDER], that, IS_MAP);
        return that;
      });
      Constructor.prototype = NativePrototype;
      NativePrototype.constructor = Constructor;
    }

    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }

    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

    // weak collections should not contains .clear method
    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
  }

  exported[CONSTRUCTOR_NAME] = Constructor;
  $({ global: true, forced: Constructor != NativeConstructor }, exported);

  setToStringTag(Constructor, CONSTRUCTOR_NAME);

  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

  return Constructor;
};


/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(2);

module.exports = !fails(function () {
  return Object.isExtensible(Object.preventExtensions({}));
});


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(3);
var Iterators = __webpack_require__(58);

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(152);
var Iterators = __webpack_require__(58);
var wellKnownSymbol = __webpack_require__(3);

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(11);

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};


/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(3);

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};


/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var defineProperty = __webpack_require__(10).f;
var create = __webpack_require__(56);
var redefineAll = __webpack_require__(227);
var bind = __webpack_require__(73);
var anInstance = __webpack_require__(156);
var iterate = __webpack_require__(155);
var defineIterator = __webpack_require__(105);
var setSpecies = __webpack_require__(228);
var DESCRIPTORS = __webpack_require__(7);
var fastKey = __webpack_require__(154).fastKey;
var InternalStateModule = __webpack_require__(46);

var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;

module.exports = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        index: create(null),
        first: undefined,
        last: undefined,
        size: 0
      });
      if (!DESCRIPTORS) that.size = 0;
      if (iterable != undefined) iterate(iterable, that[ADDER], that, IS_MAP);
    });

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var entry = getEntry(that, key);
      var previous, index;
      // change existing entry
      if (entry) {
        entry.value = value;
      // create new entry
      } else {
        state.last = entry = {
          index: index = fastKey(key, true),
          key: key,
          value: value,
          previous: previous = state.last,
          next: undefined,
          removed: false
        };
        if (!state.first) state.first = entry;
        if (previous) previous.next = entry;
        if (DESCRIPTORS) state.size++;
        else that.size++;
        // add to index
        if (index !== 'F') state.index[index] = entry;
      } return that;
    };

    var getEntry = function (that, key) {
      var state = getInternalState(that);
      // fast case
      var index = fastKey(key);
      var entry;
      if (index !== 'F') return state.index[index];
      // frozen object case
      for (entry = state.first; entry; entry = entry.next) {
        if (entry.key == key) return entry;
      }
    };

    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        var that = this;
        var state = getInternalState(that);
        var data = state.index;
        var entry = state.first;
        while (entry) {
          entry.removed = true;
          if (entry.previous) entry.previous = entry.previous.next = undefined;
          delete data[entry.index];
          entry = entry.next;
        }
        state.first = state.last = undefined;
        if (DESCRIPTORS) state.size = 0;
        else that.size = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = this;
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.next;
          var prev = entry.previous;
          delete state.index[entry.index];
          entry.removed = true;
          if (prev) prev.next = next;
          if (next) next.previous = prev;
          if (state.first == entry) state.first = next;
          if (state.last == entry) state.last = prev;
          if (DESCRIPTORS) state.size--;
          else that.size--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        var state = getInternalState(this);
        var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.next : state.first) {
          boundFunction(entry.value, entry.key, this);
          // revert to the last existing entry
          while (entry && entry.removed) entry = entry.previous;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(this, key);
      }
    });

    redefineAll(C.prototype, IS_MAP ? {
      // 23.1.3.6 Map.prototype.get(key)
      get: function get(key) {
        var entry = getEntry(this, key);
        return entry && entry.value;
      },
      // 23.1.3.9 Map.prototype.set(key, value)
      set: function set(key, value) {
        return define(this, key === 0 ? 0 : key, value);
      }
    } : {
      // 23.2.3.1 Set.prototype.add(value)
      add: function add(value) {
        return define(this, value = value === 0 ? 0 : value, value);
      }
    });
    if (DESCRIPTORS) defineProperty(C.prototype, 'size', {
      get: function () {
        return getInternalState(this).size;
      }
    });
    return C;
  },
  setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
      setInternalState(this, {
        type: ITERATOR_NAME,
        target: iterated,
        state: getInternalCollectionState(iterated),
        kind: kind,
        last: undefined
      });
    }, function () {
      var state = getInternalIteratorState(this);
      var kind = state.kind;
      var entry = state.last;
      // revert to the last existing entry
      while (entry && entry.removed) entry = entry.previous;
      // get next entry
      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
        // or finish the iteration
        state.target = undefined;
        return { value: undefined, done: true };
      }
      // return step by kind
      if (kind == 'keys') return { value: entry.key, done: false };
      if (kind == 'values') return { value: entry.value, done: false };
      return { value: [entry.key, entry.value], done: false };
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(CONSTRUCTOR_NAME);
  }
};


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(19);

module.exports = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};


/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(48);
var definePropertyModule = __webpack_require__(10);
var wellKnownSymbol = __webpack_require__(3);
var DESCRIPTORS = __webpack_require__(7);

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__(158).charAt;
var InternalStateModule = __webpack_require__(46);
var defineIterator = __webpack_require__(105);

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
var classof = __webpack_require__(30);
var wellKnownSymbol = __webpack_require__(3);

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};


/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(11);
var aFunction = __webpack_require__(74);
var wellKnownSymbol = __webpack_require__(3);

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.github.io/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};


/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var DOMIterables = __webpack_require__(142);
var ArrayIteratorMethods = __webpack_require__(148);
var createNonEnumerableProperty = __webpack_require__(18);
var wellKnownSymbol = __webpack_require__(3);

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
}


/***/ }),
/* 233 */
/***/ (function(module, exports) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),
/* 234 */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([bth[buf[i++]], bth[buf[i++]], 
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]]]).join('');
}

module.exports = bytesToUuid;


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var trim = __webpack_require__(81).trim;
var whitespaces = __webpack_require__(82);

var $parseInt = global.parseInt;
var hex = /^[+-]?0[Xx]/;
var FORCED = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22;

// `parseInt` method
// https://tc39.github.io/ecma262/#sec-parseint-string-radix
module.exports = FORCED ? function parseInt(string, radix) {
  var S = trim(String(string));
  return $parseInt(S, (radix >>> 0) || (hex.test(S) ? 16 : 10));
} : $parseInt;


/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(1);
var fill = __webpack_require__(237);
var addToUnscopables = __webpack_require__(78);

// `Array.prototype.fill` method
// https://tc39.github.io/ecma262/#sec-array.prototype.fill
$({ target: 'Array', proto: true }, {
  fill: fill
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('fill');


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toObject = __webpack_require__(16);
var toAbsoluteIndex = __webpack_require__(67);
var toLength = __webpack_require__(13);

// `Array.prototype.fill` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.fill
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var argumentsLength = arguments.length;
  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
  var end = argumentsLength > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(1);
var aFunction = __webpack_require__(74);
var toObject = __webpack_require__(16);
var fails = __webpack_require__(2);
var arrayMethodIsStrict = __webpack_require__(55);

var test = [];
var nativeSort = test.sort;

// IE8-
var FAILS_ON_UNDEFINED = fails(function () {
  test.sort(undefined);
});
// V8 bug
var FAILS_ON_NULL = fails(function () {
  test.sort(null);
});
// Old WebKit
var STRICT_METHOD = arrayMethodIsStrict('sort');

var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD;

// `Array.prototype.sort` method
// https://tc39.github.io/ecma262/#sec-array.prototype.sort
$({ target: 'Array', proto: true, forced: FORCED }, {
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? nativeSort.call(toObject(this))
      : nativeSort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),
/* 239 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTBweCIgaGVpZ2h0PSIxMHB4IiAgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDxnIGlkPSIiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgoJCTxyZWN0IGZpbGw9IiNGRkZGRkYiIHg9IjAiIHk9IjAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PC9yZWN0PgoJCTxyZWN0IGlkPSJSZWN0YW5nbGUiIHN0cm9rZT0iI2FiZiIgIHg9Ii0xIiB5PSItMSIgd2lkdGg9IjJweCIgaGVpZ2h0PSIycHgiPjwvcmVjdD4KICAgIDwvZz4KPC9zdmc+"

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(1);
var flattenIntoArray = __webpack_require__(241);
var toObject = __webpack_require__(16);
var toLength = __webpack_require__(13);
var toInteger = __webpack_require__(21);
var arraySpeciesCreate = __webpack_require__(75);

// `Array.prototype.flat` method
// https://github.com/tc39/proposal-flatMap
$({ target: 'Array', proto: true }, {
  flat: function flat(/* depthArg = 1 */) {
    var depthArg = arguments.length ? arguments[0] : undefined;
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    A.length = flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});


/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isArray = __webpack_require__(39);
var toLength = __webpack_require__(13);
var bind = __webpack_require__(73);

// `FlattenIntoArray` abstract operation
// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var flattenIntoArray = function (target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? bind(mapper, thisArg, 3) : false;
  var element;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      if (depth > 0 && isArray(element)) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1FFFFFFFFFFFFF) throw TypeError('Exceed the acceptable array length');
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
};

module.exports = flattenIntoArray;


/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(1);
var IndexedObject = __webpack_require__(62);
var toIndexedObject = __webpack_require__(17);
var arrayMethodIsStrict = __webpack_require__(55);

var nativeJoin = [].join;

var ES3_STRINGS = IndexedObject != Object;
var STRICT_METHOD = arrayMethodIsStrict('join', ',');

// `Array.prototype.join` method
// https://tc39.github.io/ecma262/#sec-array.prototype.join
$({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
  join: function join(separator) {
    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(1);
var lastIndexOf = __webpack_require__(244);

// `Array.prototype.lastIndexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof
$({ target: 'Array', proto: true, forced: lastIndexOf !== [].lastIndexOf }, {
  lastIndexOf: lastIndexOf
});


/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__(17);
var toInteger = __webpack_require__(21);
var toLength = __webpack_require__(13);
var arrayMethodIsStrict = __webpack_require__(55);
var arrayMethodUsesToLength = __webpack_require__(28);

var min = Math.min;
var nativeLastIndexOf = [].lastIndexOf;
var NEGATIVE_ZERO = !!nativeLastIndexOf && 1 / [1].lastIndexOf(1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('lastIndexOf');
// For preventing possible almost infinite loop in non-standard implementations, test the forward version of the method
var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });
var FORCED = NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH;

// `Array.prototype.lastIndexOf` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof
module.exports = FORCED ? function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
  // convert -0 to +0
  if (NEGATIVE_ZERO) return nativeLastIndexOf.apply(this, arguments) || 0;
  var O = toIndexedObject(this);
  var length = toLength(O.length);
  var index = length - 1;
  if (arguments.length > 1) index = min(index, toInteger(arguments[1]));
  if (index < 0) index = length + index;
  for (;index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;
  return -1;
} : nativeLastIndexOf;


/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(1);
var toAbsoluteIndex = __webpack_require__(67);
var toInteger = __webpack_require__(21);
var toLength = __webpack_require__(13);
var toObject = __webpack_require__(16);
var arraySpeciesCreate = __webpack_require__(75);
var createProperty = __webpack_require__(77);
var arrayMethodHasSpeciesSupport = __webpack_require__(57);
var arrayMethodUsesToLength = __webpack_require__(28);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');
var USES_TO_LENGTH = arrayMethodUsesToLength('splice', { ACCESSORS: true, 0: 0, 1: 2 });

var max = Math.max;
var min = Math.min;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

// `Array.prototype.splice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.splice
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject(this);
    var len = toLength(O.length);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toInteger(deleteCount), 0), len - actualStart);
    }
    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});


/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

// this method was added to unscopables after implementation
// in popular engines, so it's moved to a separate module
var addToUnscopables = __webpack_require__(78);

addToUnscopables('flat');


/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(1);
var fails = __webpack_require__(2);
var toObject = __webpack_require__(16);
var toPrimitive = __webpack_require__(37);

var FORCED = fails(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
});

// `Date.prototype.toJSON` method
// https://tc39.github.io/ecma262/#sec-date.prototype.tojson
$({ target: 'Date', proto: true, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(1);
var bind = __webpack_require__(249);

// `Function.prototype.bind` method
// https://tc39.github.io/ecma262/#sec-function.prototype.bind
$({ target: 'Function', proto: true }, {
  bind: bind
});


/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(74);
var isObject = __webpack_require__(8);

var slice = [].slice;
var factories = {};

var construct = function (C, argsLength, args) {
  if (!(argsLength in factories)) {
    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
  } return factories[argsLength](C, args);
};

// `Function.prototype.bind` method implementation
// https://tc39.github.io/ecma262/#sec-function.prototype.bind
module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = slice.call(arguments, 1);
  var boundFunction = function bound(/* args... */) {
    var args = partArgs.concat(slice.call(arguments));
    return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
  };
  if (isObject(fn.prototype)) boundFunction.prototype = fn.prototype;
  return boundFunction;
};


/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(7);
var global = __webpack_require__(6);
var isForced = __webpack_require__(90);
var redefine = __webpack_require__(19);
var has = __webpack_require__(9);
var classof = __webpack_require__(30);
var inheritIfRequired = __webpack_require__(157);
var toPrimitive = __webpack_require__(37);
var fails = __webpack_require__(2);
var create = __webpack_require__(56);
var getOwnPropertyNames = __webpack_require__(66).f;
var getOwnPropertyDescriptor = __webpack_require__(36).f;
var defineProperty = __webpack_require__(10).f;
var trim = __webpack_require__(81).trim;

var NUMBER = 'Number';
var NativeNumber = global[NUMBER];
var NumberPrototype = NativeNumber.prototype;

// Opera ~12 has broken Object#toString
var BROKEN_CLASSOF = classof(create(NumberPrototype)) == NUMBER;

// `ToNumber` abstract operation
// https://tc39.github.io/ecma262/#sec-tonumber
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  var first, third, radix, maxCode, digits, length, index, code;
  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = it.charCodeAt(0);
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
        default: return +it;
      }
      digits = it.slice(2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = digits.charCodeAt(index);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

// `Number` constructor
// https://tc39.github.io/ecma262/#sec-number-constructor
if (isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var dummy = this;
    return dummy instanceof NumberWrapper
      // check on 1..constructor(foo) case
      && (BROKEN_CLASSOF ? fails(function () { NumberPrototype.valueOf.call(dummy); }) : classof(dummy) != NUMBER)
        ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
  };
  for (var keys = DESCRIPTORS ? getOwnPropertyNames(NativeNumber) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(NativeNumber, key = keys[j]) && !has(NumberWrapper, key)) {
      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
    }
  }
  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  redefine(global, NUMBER, NumberWrapper);
}


/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(1);
var toInteger = __webpack_require__(21);
var thisNumberValue = __webpack_require__(252);
var repeat = __webpack_require__(253);
var fails = __webpack_require__(2);

var nativeToFixed = 1.0.toFixed;
var floor = Math.floor;

var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};

var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

var FORCED = nativeToFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !fails(function () {
  // V8 ~ Android 4.3-
  nativeToFixed.call({});
});

// `Number.prototype.toFixed` method
// https://tc39.github.io/ecma262/#sec-number.prototype.tofixed
$({ target: 'Number', proto: true, forced: FORCED }, {
  // eslint-disable-next-line max-statements
  toFixed: function toFixed(fractionDigits) {
    var number = thisNumberValue(this);
    var fractDigits = toInteger(fractionDigits);
    var data = [0, 0, 0, 0, 0, 0];
    var sign = '';
    var result = '0';
    var e, z, j, k;

    var multiply = function (n, c) {
      var index = -1;
      var c2 = c;
      while (++index < 6) {
        c2 += n * data[index];
        data[index] = c2 % 1e7;
        c2 = floor(c2 / 1e7);
      }
    };

    var divide = function (n) {
      var index = 6;
      var c = 0;
      while (--index >= 0) {
        c += data[index];
        data[index] = floor(c / n);
        c = (c % n) * 1e7;
      }
    };

    var dataToString = function () {
      var index = 6;
      var s = '';
      while (--index >= 0) {
        if (s !== '' || index === 0 || data[index] !== 0) {
          var t = String(data[index]);
          s = s === '' ? t : s + repeat.call('0', 7 - t.length) + t;
        }
      } return s;
    };

    if (fractDigits < 0 || fractDigits > 20) throw RangeError('Incorrect fraction digits');
    // eslint-disable-next-line no-self-compare
    if (number != number) return 'NaN';
    if (number <= -1e21 || number >= 1e21) return String(number);
    if (number < 0) {
      sign = '-';
      number = -number;
    }
    if (number > 1e-21) {
      e = log(number * pow(2, 69, 1)) - 69;
      z = e < 0 ? number * pow(2, -e, 1) : number / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = fractDigits;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        result = dataToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        result = dataToString() + repeat.call('0', fractDigits);
      }
    }
    if (fractDigits > 0) {
      k = result.length;
      result = sign + (k <= fractDigits
        ? '0.' + repeat.call('0', fractDigits - k) + result
        : result.slice(0, k - fractDigits) + '.' + result.slice(k - fractDigits));
    } else {
      result = sign + result;
    } return result;
  }
});


/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(30);

// `thisNumberValue` abstract operation
// https://tc39.github.io/ecma262/#sec-thisnumbervalue
module.exports = function (value) {
  if (typeof value != 'number' && classof(value) != 'Number') {
    throw TypeError('Incorrect invocation');
  }
  return +value;
};


/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(21);
var requireObjectCoercible = __webpack_require__(23);

// `String.prototype.repeat` method implementation
// https://tc39.github.io/ecma262/#sec-string.prototype.repeat
module.exports = ''.repeat || function repeat(count) {
  var str = String(requireObjectCoercible(this));
  var result = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError('Wrong number of repetitions');
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;
  return result;
};


/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(1);
var parseFloatImplementation = __webpack_require__(255);

// `parseFloat` method
// https://tc39.github.io/ecma262/#sec-parsefloat-string
$({ global: true, forced: parseFloat != parseFloatImplementation }, {
  parseFloat: parseFloatImplementation
});


/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var trim = __webpack_require__(81).trim;
var whitespaces = __webpack_require__(82);

var $parseFloat = global.parseFloat;
var FORCED = 1 / $parseFloat(whitespaces + '-0') !== -Infinity;

// `parseFloat` method
// https://tc39.github.io/ecma262/#sec-parsefloat-string
module.exports = FORCED ? function parseFloat(string) {
  var trimmedString = trim(String(string));
  var result = $parseFloat(trimmedString);
  return result === 0 && trimmedString.charAt(0) == '-' ? -0 : result;
} : $parseFloat;


/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__(109);
var anObject = __webpack_require__(11);
var toLength = __webpack_require__(13);
var requireObjectCoercible = __webpack_require__(23);
var advanceStringIndex = __webpack_require__(110);
var regExpExec = __webpack_require__(111);

// @@match logic
fixRegExpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible(this);
      var matcher = regexp == undefined ? undefined : regexp[MATCH];
      return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative(nativeMatch, regexp, this);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);

      if (!rx.global) return regExpExec(rx, S);

      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});


/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(1);

// `URL.prototype.toJSON` method
// https://url.spec.whatwg.org/#dom-url-tojson
$({ target: 'URL', proto: true, enumerable: true }, {
  toJSON: function toJSON() {
    return URL.prototype.toString.call(this);
  }
});


/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(1);

// `Date.now` method
// https://tc39.github.io/ecma262/#sec-date.now
$({ target: 'Date', stat: true }, {
  now: function now() {
    return new Date().getTime();
  }
});


/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(1);
var $trim = __webpack_require__(81).trim;
var forcedStringTrimMethod = __webpack_require__(260);

// `String.prototype.trim` method
// https://tc39.github.io/ecma262/#sec-string.prototype.trim
$({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
  trim: function trim() {
    return $trim(this);
  }
});


/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(2);
var whitespaces = __webpack_require__(82);

var non = '\u200B\u0085\u180E';

// check that a method works with the correct list
// of whitespaces and has a correct name
module.exports = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
  });
};


/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(162);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(263);

/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(139);
__webpack_require__(127);
__webpack_require__(135);
__webpack_require__(264);
__webpack_require__(276);
__webpack_require__(277);
module.exports = __webpack_require__(14).Promise;


/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(51);
var global = __webpack_require__(12);
var ctx = __webpack_require__(49);
var classof = __webpack_require__(163);
var $export = __webpack_require__(24);
var isObject = __webpack_require__(26);
var aFunction = __webpack_require__(69);
var anInstance = __webpack_require__(265);
var forOf = __webpack_require__(266);
var speciesConstructor = __webpack_require__(164);
var task = __webpack_require__(165).set;
var microtask = __webpack_require__(271)();
var newPromiseCapabilityModule = __webpack_require__(113);
var perform = __webpack_require__(166);
var userAgent = __webpack_require__(272);
var promiseResolve = __webpack_require__(167);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(15)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(273)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(72)($Promise, PROMISE);
__webpack_require__(274)(PROMISE);
Wrapper = __webpack_require__(14)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(275)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 265 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(49);
var call = __webpack_require__(267);
var isArrayIter = __webpack_require__(268);
var anObject = __webpack_require__(22);
var toLength = __webpack_require__(132);
var getIterFn = __webpack_require__(269);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(22);
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
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(52);
var ITERATOR = __webpack_require__(15)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(163);
var ITERATOR = __webpack_require__(15)('iterator');
var Iterators = __webpack_require__(52);
module.exports = __webpack_require__(14).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 270 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(12);
var macrotask = __webpack_require__(165).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(53)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(12);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(31);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(12);
var core = __webpack_require__(14);
var dP = __webpack_require__(25);
var DESCRIPTORS = __webpack_require__(27);
var SPECIES = __webpack_require__(15)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(15)('iterator');
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
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(24);
var core = __webpack_require__(14);
var global = __webpack_require__(12);
var speciesConstructor = __webpack_require__(164);
var promiseResolve = __webpack_require__(167);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(24);
var newPromiseCapability = __webpack_require__(113);
var perform = __webpack_require__(166);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(279);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(281)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(280)(false);
// imports


// module
exports.push([module.i, "@keyframes dashing {\n  from {\n    stroke-dashoffset: 200;\n  }\n  to {\n    stroke-dashoffset: 0;\n  }\n}\n.mm-editor {\n  width: 100%;\n  height: 100%;\n  position: relative;\n}\n.mm-editor .mm-editor-back {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  z-index: 0;\n  left: 0;\n  top: 0;\n}\n.mm-editor .mm-minimap {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  background: #fff;\n  border: 1px solid #cecece;\n  border-radius: 5px;\n  overflow: hidden;\n}\n.mm-editor .mm-minimap .drag-rect {\n  position: absolute;\n  left: 0px;\n  top: 0px;\n  border: 2px solid #08c;\n  cursor: pointer;\n}\n.mm-editor .mm-minimap .drag-point {\n  width: 10px;\n  height: 10px;\n  border-radius: 5px;\n  border: 2px solid #08c;\n  background: #fff;\n  position: absolute;\n  right: -5px;\n  bottom: -5px;\n  cursor: nwse-resize;\n}\n.mm-editor > .mm-editor-svg {\n  cursor: grab;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n}\n.mm-editor > .mm-editor-svg svg {\n  outline: none;\n}\n.mm-editor > .mm-editor-svg * {\n  transition: x, y, transform, cx, cy, width, stroke, height, fill 400ms;\n}\n.mm-editor > .mm-editor-svg .mm-node {\n  cursor: move;\n}\n.mm-editor > .mm-editor-svg .mm-node .mm-node-shape:hover > .icon-node {\n  stroke: #4c79ff;\n}\n.mm-editor > .mm-editor-svg .mm-node .mm-node-shape.active > .icon-node {\n  transition: stroke 400ms;\n  stroke: #4c79ff;\n}\n.mm-editor > .mm-editor-svg .mm-node .mm-node-shape.success .icon-node {\n  stroke: green;\n  fill: #fff;\n}\n.mm-editor > .mm-editor-svg .mm-node .mm-node-shape.error .icon-node {\n  stroke: red;\n}\n.mm-editor > .mm-editor-svg .mm-node .mm-node-shape.running .icon-node {\n  stroke: #4c79ff;\n}\n.mm-editor > .mm-editor-svg .mm-line.active .mm-line-shape {\n  stroke-width: 5px;\n  opacity: 0.5;\n}\n.mm-editor > .mm-editor-svg .mm-line.active .mm-line-arrow {\n  opacity: 0.5;\n}\n.mm-editor > .mm-editor-svg .mm-line:hover .mm-line-shape {\n  stroke-width: 5px;\n  opacity: 0.5;\n}\n.mm-editor > .mm-editor-svg .mm-line:hover .mm-line-arrow {\n  opacity: 0.5;\n}\n.mm-editor > .mm-editor-svg .mm-line.running .mm-line-shape {\n  stroke-dasharray: 5 !important;\n  animation: dashing 5s linear infinite;\n}\n.mm-editor > .mm-editor-svg .mm-line .mm-line-shape {\n  cursor: pointer;\n}\n.mm-editor > .mm-editor-svg .mm-line .mm-line-arrow {\n  cursor: crosshair;\n}\n.mm-editor > .mm-editor-svg .mm-line .mm-line-label text {\n  text-anchor: middle;\n}\n.mm-editor > .mm-editor-svg .anchor-line {\n  stroke: #4c79ff;\n}\n.mm-editor > .mm-editor-svg .link-points-g .mm-link-points:hover,\n.mm-editor > .mm-editor-svg .link-points-g .mm-link-points.hover {\n  fill: #4c79ff;\n  cursor: crosshair;\n}\n.mm-editor > .mm-editor-html {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n}\n.mm-editor .anchor-back {\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n", ""]);

// exports


/***/ }),
/* 280 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(282);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 282 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 283 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.assign.js
var es_object_assign = __webpack_require__(84);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/classCallCheck.js
var classCallCheck = __webpack_require__(4);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/createClass.js
var createClass = __webpack_require__(5);
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js
var possibleConstructorReturn = __webpack_require__(35);
var possibleConstructorReturn_default = /*#__PURE__*/__webpack_require__.n(possibleConstructorReturn);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/getPrototypeOf.js
var getPrototypeOf = __webpack_require__(43);
var getPrototypeOf_default = /*#__PURE__*/__webpack_require__.n(getPrototypeOf);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/assertThisInitialized.js
var assertThisInitialized = __webpack_require__(20);
var assertThisInitialized_default = /*#__PURE__*/__webpack_require__.n(assertThisInitialized);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/inherits.js
var inherits = __webpack_require__(44);
var inherits_default = /*#__PURE__*/__webpack_require__.n(inherits);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.for-each.js
var es_array_for_each = __webpack_require__(33);

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__(34);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.js
var es_symbol = __webpack_require__(206);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__(29);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__(104);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.index-of.js
var es_array_index_of = __webpack_require__(147);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__(148);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__(79);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.define-properties.js
var es_object_define_properties = __webpack_require__(213);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.define-property.js
var es_object_define_property = __webpack_require__(214);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptor.js
var es_object_get_own_property_descriptor = __webpack_require__(215);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptors.js
var es_object_get_own_property_descriptors = __webpack_require__(216);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__(106);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(40);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__(41);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.set.js
var es_set = __webpack_require__(219);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__(229);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__(108);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.split.js
var es_string_split = __webpack_require__(59);

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__(232);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(115);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/uuid/v1.js
var v1 = __webpack_require__(168);
var v1_default = /*#__PURE__*/__webpack_require__.n(v1);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__(112);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.parse-int.js
var es_parse_int = __webpack_require__(42);

// CONCATENATED MODULE: ./src/Shape/Nodes/DefaultNodes.js



/**
 * @interface
 */
var DefaultNode = {
  adsorb: [20, 20],
  //磁吸的范围
  linkPoints: [{
    x: 0.5,
    y: 0
  }, {
    x: 0.5,
    y: 1
  }],

  /**
   * 默认渲染函数 data,snapPaper
   */
  render: function render(data, snapPaper) {
    var node = snapPaper.rect(0, 0, 100, 40);
    var text = snapPaper.text(20, 25, data.name);
    node.attr({
      fill: "#fff",
      stroke: "#000",
      rx: 5,
      ry: 5
    });
    return snapPaper.group(node, text);
  },

  /**
   * 渲染连接点 (node, linkPoint, circle)
   */
  renderLinkPoint: function renderLinkPoint(node, linkPoint, circle) {
    circle = circle || node.paper.circle(0, 0, 5, 5);
    var box = node.shape.getBBox();
    var x = linkPoint.x * box.w + parseInt(node.data.x, 10);
    var y = linkPoint.y * box.h + parseInt(node.data.y, 10);
    circle.attr({
      cx: x,
      cy: y,
      fill: "#fff",
      display: "none",
      stroke: "#08c",
      "class": "mm-link-points"
    });
    circle.data = linkPoint;
    circle.data.box = box;
    circle.data.type = "input";
    circle.x = x;
    circle.y = y;
    circle.local = {
      x: linkPoint.x * box.w,
      y: linkPoint.y * box.h
    };
    return circle;
  },

  /**
   * 更新渲染点
   * @param  {} node
   * @param  {} linkPoint
   * @param  {} refreshSize
   */
  updateLinkPoint: function updateLinkPoint(node, linkPoint, refreshSize) {
    if (refreshSize) {
      var box = node.shape.getBBox();
      linkPoint.local.x = linkPoint.data.x * box.w;
      linkPoint.local.y = linkPoint.data.y * box.h;
    }

    var local = linkPoint.local;
    var x = local.x + node.data.x;
    var y = local.y + node.data.y;
    linkPoint.attr({
      cx: x,
      cy: y
    });
    linkPoint.x = x;
    linkPoint.y = y;
  }
};
/* harmony default export */ var DefaultNodes = (DefaultNode);
// CONCATENATED MODULE: ./src/Shape/Nodes/IconNode.js



/**
 * @interface
 */
var IconNode = {
  adsorb: [20, 20],
  linkPoints: [{
    x: 0.5,
    y: 0
  }, {
    x: 0.5,
    y: 1
  }],

  /**
   * @param  {} data
   * @param  {} snapPaper
   */
  render: function render(data, snapPaper) {
    var node = snapPaper.rect(0, 0, 180, 32);
    var text = snapPaper.text(40, 21, data.name);
    var icon = snapPaper.image(data.iconPath, 5, 4, 24, 24);
    icon.node.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    node.attr({
      "class": "icon-node",
      fill: "#EAEEFA",
      stroke: "#CCD9FD",
      rx: 17,
      ry: 17
    });
    return snapPaper.group(node, text, icon);
  },

  /**
   * @param  {} node
   * @param  {} linkPoint
   * @param  {} circle
   */
  renderLinkPoint: function renderLinkPoint(node, linkPoint, circle) {
    circle = circle || node.paper.circle(0, 0, 5, 5);
    var box = node.shape.getBBox();
    var x = linkPoint.x * box.w + parseInt(node.data.x, 10);
    var y = linkPoint.y * box.h + parseInt(node.data.y, 10);
    circle.attr({
      cx: x,
      cy: y,
      fill: "#fff",
      display: "none",
      stroke: "#08c",
      "class": "mm-link-points"
    });
    circle.data = linkPoint;
    circle.data.box = box;
    circle.data.type = "input";
    circle.x = x;
    circle.y = y;
    circle.local = {
      x: linkPoint.x * box.w,
      y: linkPoint.y * box.h
    };
    return circle;
  },

  /**
   * 更新渲染点
   * @param  {} node
   * @param  {} linkPoint
   * @param  {} refreshSize
   */
  updateLinkPoint: function updateLinkPoint(node, linkPoint, refreshSize) {
    if (refreshSize) {
      var box = node.shape.getBBox();
      linkPoint.local.x = linkPoint.data.x * box.w;
      linkPoint.local.y = linkPoint.data.y * box.h;
    }

    var local = linkPoint.local;
    var x = local.x + node.data.x;
    var y = local.y + node.data.y;
    linkPoint.attr({
      cx: x,
      cy: y
    });
    linkPoint.x = x;
    linkPoint.y = y;
  }
};
/* harmony default export */ var Nodes_IconNode = (IconNode);
// CONCATENATED MODULE: ./src/Shape/Node.js

























function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { defineProperty_default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }




/**
 * @class
 */

var Node_Node =
/*#__PURE__*/
function () {
  function Node(graph) {
    var _this = this;

    classCallCheck_default()(this, Node);

    this.addNode = function () {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (typeof data.uuid === "undefined") {
        data.uuid = v1_default()();
      }

      if (data.uuid && data.uuid.indexOf("-") > -1) {
        console.log(data.uuid);
        data.uuid = data.uuid.replace(/-/g, "");
      }

      var node = _this.renderNode(data);

      _this.graph.fire("node:change", {
        node: node
      });

      return node;
    };

    this.deleteNode = function (node, ignoreEvent) {
      var uuid = node;

      if (node.data) {
        uuid = node.data.uuid;
      }

      var deleteNode = _this.nodes[uuid];
      delete _this.nodes[uuid];
      !ignoreEvent && _this.graph.fire("node:remove", {
        node: deleteNode,
        uuid: uuid
      });
      deleteNode.linkPoints.forEach(function (point) {
        point.undrag();
        point.unhover();
        point.remove();
        point = null;
      });
      deleteNode.fromLines.forEach(function (lineId) {
        _this.graph.line.deleteLine(lineId, true, true);
      });
      deleteNode.toLines.forEach(function (lineId) {
        _this.graph.line.deleteLine(lineId, true, true);
      });
      deleteNode.undrag();
      deleteNode.unhover();
      deleteNode.unclick();
      deleteNode.remove();
    };

    this.graph = graph;
    this.nodes = {};
    this.paper = graph.editor.paper;
    this.nodeG = this.paper.g();
    this.linkPointsG = this.paper.g();
    this.linkPointsG.addClass("link-points-g");
    this.initDefs();
    this.listenEvent();
    this.actives = {};
    this.shapes = {
      "default": DefaultNodes,
      iconNode: Nodes_IconNode
    };
  }

  createClass_default()(Node, [{
    key: "initDefs",
    value: function initDefs() {
      this.shadow = this.paper.filter(window.Snap.filter.shadow(3, 1, 0.3));
    } // 监听事件

  }, {
    key: "listenEvent",
    value: function listenEvent() {
      var _this2 = this;

      this.graph.on("paper:click", function () {
        _this2.unActive();
      });
      this.graph.on("line:click", function () {
        _this2.unActive();
      });
      this.graph.on("copy", function () {
        _this2.copyNode = _objectSpread({}, _this2.actives);
      });
      this.graph.on("paste", function () {
        _this2.unActive();

        for (var key in _this2.copyNode) {
          var node = _this2.copyNode[key];

          var newData = _objectSpread({}, node.data);

          newData.x += 20 + Math.random() * 20;
          newData.y += 20 + Math.random() * 20;
          delete newData.uuid;

          var newNode = _this2.addNode(newData);

          _this2.setActive(newNode);
        }
      });
    }
    /**
     * 注册node
     * @param {string} type 形状名称
     * @param {object} data 复写的形状方法
     * @param {string} extend 继承的形状，默认为default
     */

  }, {
    key: "registeNode",
    value: function registeNode(type, data) {
      var extend = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "default";
      this.shapes[type] = Object.assign({}, this.shapes[extend], data);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      Object.keys(data).map(function (key) {
        _this3.renderNode(data[key]);
      });
    }
    /**
     * 添加节点
     * @param {object} data  
     */

  }, {
    key: "renderNode",

    /**
     * 渲染节点
     */
    value: function renderNode(item) {
      var key = item.uuid;
      var shape = this.shapes[item.type || "default"];
      shape.paper = this.paper;
      var nodeItem = shape.render(item, this.paper);
      var node = this.paper.g(nodeItem);
      node.shape = nodeItem;
      node.shape.attr({
        "class": "mm-node-shape"
      });
      this.nodes[item.uuid] = node;
      node.node.setAttribute("class", "mm-node");
      node.node.setAttribute("data-id", key);
      node.node.setAttribute("transform", "translate(".concat(item.x || 0, ",").concat(item.y || 0, ")"));
      node.toLines = new Set();
      node.fromLines = new Set();
      node.data = item;
      this.addNodeLinkPoints(node, shape);
      this.addNodeEvent(node);
      this.nodeG.add(node);
      return node;
    }
    /**
     * 根据数据更新节点
     */

  }, {
    key: "updateNode",
    value: function updateNode() {
      var nodeData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var uuid = nodeData.uuid;
      var node = this.nodes[uuid];
      var shape = this.shapes[nodeData.type || "default"];
      node.animate({
        transform: "translate(".concat(nodeData.x, " ,").concat(nodeData.y, ")")
      }, 200);
      node.data = nodeData;
      node.linkPointsTypes.forEach(function (linkPoint, index) {
        shape.renderLinkPoint(node, linkPoint, node.linkPoints[index]);
      });
    }
    /**
     * 给节点添加连线点
     * @param {node} node
     */

  }, {
    key: "addNodeLinkPoints",
    value: function addNodeLinkPoints(node, shape) {
      var _this4 = this;

      node.linkPoints = [];
      node.linkPointsTypes = shape.linkPoints;

      if (!shape.linkPoints) {
        return false;
      }

      shape.linkPoints.forEach(function (linkPoint, index) {
        if (shape.renderLinkPoint) {
          var newCircle = shape.renderLinkPoint(node, linkPoint);
          node.linkPoints.push(newCircle);
          newCircle.attr({
            "data-node-id": node.data.uuid,
            "data-index": index
          });

          _this4.linkPointsG.add(newCircle);

          _this4.graph.line.addLinkPointEvent(newCircle, node, index);

          _this4.addLinkHoverEvent(newCircle, node, index);
        }
      });
    }
  }, {
    key: "addLinkHoverEvent",
    value: function addLinkHoverEvent(point, node) {
      var _this5 = this;

      point.hover(function () {
        if (_this5.graph.linkStatus === "lineing") return false;
        node.linkPoints.forEach(function (point) {
          point.attr({
            display: "block"
          });
        });
      }, function () {
        if (_this5.graph.linkStatus === "lineing") return false;

        if (_this5.activeNode && _this5.activeNode.data.uuid === node.data.uuid) {
          return false;
        }

        node.linkPoints.forEach(function (point) {
          point.attr({
            display: "none"
          });
        });
      });
    }
  }, {
    key: "panNode",
    value: function panNode(node, info, dx, dy) {
      var _this6 = this;

      var x = (node.startX || 0) + dx / info.scalex;
      var y = (node.startY || 0) + dy / info.scalex;
      var newXY = this.graph.anchorLine.check(x, y);

      if (newXY) {
        x = newXY.x;
        y = newXY.y;
      }

      node.data.x = x;
      node.data.y = y;
      node.linkPoints.forEach(function (circle) {
        _this6.shapes[node.data.type || "default"].updateLinkPoint(node, circle);
      });
      node.node.setAttribute("transform", "translate(".concat(x, " ,").concat(y, ")"));
    }
    /**
     * 给节点添加事件
     * @param {*} node
     */

  }, {
    key: "addNodeEvent",
    value: function addNodeEvent(node) {
      var _this7 = this;

      node.shape.drag(function (dx, dy) {
        var transform = _this7.paper.transform();

        var info = transform.globalMatrix.split();

        for (var key in _this7.actives) {
          if (key !== node.data.uuid) {
            _this7.panNode(_this7.actives[key], info, dx, dy);

            _this7.graph.line.updateByNode(_this7.actives[key]);
          }
        }

        _this7.panNode(node, info, dx, dy);

        _this7.graph.fire("node:move", {
          node: node
        });
      }, function (x, y, e) {
        // 拖动时是否有选中其他
        for (var key in _this7.actives) {
          _this7.actives[key].startX = _this7.actives[key].data.x;
          _this7.actives[key].startY = _this7.actives[key].data.y;
        }

        _this7.graph.anchorLine.makeAllAnchors(node);

        node.bbox = node.getBBox();
        node.clientX = e.clientX;
        node.clientY = e.clientY; // 提前获得bbox避免重绘

        node.startX = node.data.x;
        node.startY = node.data.y;
      }, function (e) {
        _this7.graph.anchorLine.hidePath();

        if (node.startX === node.data.x && node.startY === node.data.y) {
          return false;
        }

        _this7.graph.fire("node:change", {
          node: node
        });
      });
      node.shape.click(function (event) {
        if (Math.abs(event.clientX - node.clientX) < 2 && Math.abs(event.clientY - node.clientY) < 2) {
          if (event.shiftKey) {
            if (_this7.actives[node.data.uuid]) {
              _this7.unActive(node);
            } else {
              _this7.setActive(node);
            }
          } else {
            _this7.unActive();

            _this7.setActive(node);
          }

          _this7.graph.fire("node:click", {
            node: node,
            event: event
          });
        }
      });
      node.hover(function () {
        if (_this7.graph.linkStatus === "lineing") return false;
        node.linkPoints.forEach(function (point) {
          point.node.style.display = "block";
        });
      }, function () {
        if (_this7.graph.linkStatus === "lineing") return false;

        if (_this7.actives[node.data.uuid]) {
          return false;
        }

        node.linkPoints.forEach(function (point) {
          point.node.style.display = "none";
        });
      });
    }
    /**
     * 
     * @param {*} node node为空时全选
     */

  }, {
    key: "setActive",
    value: function setActive(node) {
      var nodes = node ? defineProperty_default()({}, node.data.uuid, node) : this.nodes;

      for (var key in nodes) {
        node = nodes[key];
        node.shape.addClass("active");
        node.shape.attr({
          filter: this.shadow
        });
        this.actives[node.data.uuid] = node;
        node.linkPoints.forEach(function (point) {
          point.node.style.display = "block";
        });
      }
    }
    /**
     * 
     * @param {*} node 传node就取消选中这个node,没有就全部取消选中
     */

  }, {
    key: "unActive",
    value: function unActive(node) {
      if (node) {
        delete this.actives[node.data.uuid];
        this.unActiveNode(node);
      } else {
        for (var key in this.actives) {
          this.unActiveNode(this.actives[key]);
        }

        this.actives = {};
      }

      this.graph.fire("node:unactive", {
        node: this.activeNode
      });
    }
  }, {
    key: "unActiveNode",
    value: function unActiveNode(node) {
      node.shape.removeClass("active");
      node.shape.attr({
        filter: null
      });
      node.linkPoints.forEach(function (point) {
        point.node.style.display = "none";
      });
    }
    /**
     * 
     */

  }, {
    key: "clear",
    value: function clear() {
      var nodes = this.nodes;

      for (var key in nodes) {
        this.deleteNode(nodes[key], true);
      }
    }
  }]);

  return Node;
}();

/* harmony default export */ var Shape_Node = (Node_Node);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.find.js
var es_array_find = __webpack_require__(159);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.fill.js
var es_array_fill = __webpack_require__(236);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__(160);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.date.to-string.js
var es_date_to_string = __webpack_require__(60);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.to-string.js
var es_regexp_to_string = __webpack_require__(61);

// CONCATENATED MODULE: ./src/Shape/Lines/Line.js







/**
 * graph.line.shapes
 * @interface
 */
var DefaultLine = {
  arcRatio: 4,

  /**
   * @param  {} data
   * @param  {} allNodesMap
   * @param  {} line
   */
  render: function render(data, allNodesMap, line) {
    var from = data.from,
        to = data.to,
        _data$fromPoint = data.fromPoint,
        fromPoint = _data$fromPoint === void 0 ? 0 : _data$fromPoint,
        _data$toPoint = data.toPoint,
        toPoint = _data$toPoint === void 0 ? 0 : _data$toPoint;
    var fromNode = allNodesMap[from];
    var toNode = allNodesMap[to];
    var fromPointNode = fromNode.linkPoints[fromPoint];
    var toPointNode = toNode.linkPoints[toPoint];
    var fromX = fromPointNode.x;
    var fromY = fromPointNode.y;
    var toX = toPointNode.x;
    var toY = toPointNode.y;
    var pathString = this.makePath(fromX, fromY, toX, toY, fromPointNode, toPointNode);
    var path = line ? line : this.paper.path();
    path.attr({
      d: pathString,
      strokeDasharray: "10",
      fill: "transparent",
      stroke: "rgba(178,190,205,0.7)"
    });
    path.animate({
      strokeDasharray: "0"
    }, 300);
    return {
      path: path,
      data: {
        fromX: fromX,
        fromY: fromY,
        toX: toX,
        toY: toY
      }
    };
  },

  /**
   * @param  {} fromX
   * @param  {} fromY
   * @param  {} toX
   * @param  {} toY
   * @param  {} fromPointNode
   * @param  {} toPointNode
   */
  makePath: function makePath(fromX, fromY, toX, toY, fromPointNode, toPointNode) {
    var edgeX = fromX;
    var edgeY = fromY;
    var endX = toX;
    var endY = toY;
    var arrowStartSpace = 0; // 顶部距离node节点的距离

    var arrEndSpace = 8; // 底部距离node节点的距离

    var arrowEndSpace = 5; // 箭头占用的空间
    // 根据连接点位置生成控制点
    // 上右下左的控制点分别为 (x,上偏移) (右偏移,y)  (x,下偏移) (左偏移,y) 

    var startControlPoint = [edgeX, edgeY];
    var endControlPoint = [endX, endY];
    var startAngel = this.getPointDirect(fromPointNode);
    var endAngel = this.getPointDirect(toPointNode);
    var offsetLength = Math.sqrt(Math.pow(edgeX - endX, 2) + Math.pow(edgeY - endY, 2)) / this.arcRatio; // 连接点的距离的一半作为控制点的长度

    startControlPoint[0] += (1 / startAngel < 0 ? -1 : 1) * Math.cos(startAngel) * offsetLength;
    startControlPoint[1] += -Math.sin(startAngel) * offsetLength; // svg坐标系倒置需要给y坐标加负号

    endControlPoint[0] += (1 / endAngel < 0 ? -1 : 1) * Math.cos(endAngel) * offsetLength;
    endControlPoint[1] += -Math.sin(endAngel) * offsetLength; // svg坐标系倒置需要给y坐标加负号

    if (fromPointNode.data.y === 1) {
      edgeY += arrowStartSpace;
    } else if (fromPointNode.data.y === 0) {
      edgeY -= arrowStartSpace;
    } else if (fromPointNode.data.x === 0) {
      edgeX -= arrowStartSpace;
    } else if (fromPointNode.data.x === 1) {
      edgeX += arrowStartSpace;
    }

    if (toPointNode.data.y === 1) {
      endY += arrEndSpace;
      toY += arrowEndSpace;
    } else if (toPointNode.data.y === 0) {
      endY -= arrEndSpace;
      toY -= arrowEndSpace;
    } else if (toPointNode.data.x === 0) {
      endX -= arrEndSpace;
      toX -= arrowEndSpace;
    } else if (toPointNode.data.x === 1) {
      endX += arrEndSpace;
      toX += arrowEndSpace;
    }

    var pathString = "M".concat(fromX, " ").concat(fromY, " T ").concat(edgeX, " ").concat(edgeY);
    var toPointString = "".concat(endX, " ").concat(endY, " T ").concat(toX, " ").concat(toY, " ");
    var path = "".concat(pathString, "C").concat(startControlPoint[0], " ").concat(startControlPoint[1], " ").concat(endControlPoint[0], " ").concat(endControlPoint[1], " ").concat(toPointString);
    return path;
  },
  //没用了
  getPointDirect: function getPointDirect(pointNode) {
    var point2center = [pointNode.data.x - 0.5, pointNode.data.y - 0.5];
    var angel = 0;

    if (point2center[0] === 0) {
      // 底数为0 去y轴角度90或270
      angel = point2center[1] > 0 ? -Math.PI / 2 : Math.PI / 2;
    } else {
      // arctan求角度
      angel = Math.atan(point2center[1] / point2center[0]);
    }

    return angel;
  },

  /**
   * @param  {} data
   * @param  {} allNodesMap
   * @param  {} arrow
   */
  renderArrow: function renderArrow(data, allNodesMap, arrow) {
    var to = data.to,
        _data$toPoint2 = data.toPoint,
        toPoint = _data$toPoint2 === void 0 ? 0 : _data$toPoint2;
    var toNode = allNodesMap[to];
    var toPointNode = toNode.linkPoints[toPoint];
    var toLinkPoint = toNode.linkPointsTypes[toPoint];
    var angle = 0;

    if (toLinkPoint.y <= 0) {
      angle = 180;
    } else if (toLinkPoint.x >= 1) {
      angle = 270;
    } else if (toLinkPoint.x <= 0) {
      angle = 90;
    }

    var toX = toPointNode.x;
    var toY = toPointNode.y;
    var pathString = "M".concat(-5, " ", 10, "L", 0, " ", 0, "L", 5, " ", 10, "Z");
    var path = arrow ? arrow : this.paper.path(); // 进行角度的中心变换

    var matrix = new window.Snap.Matrix();
    matrix.translate(toX, toY);
    matrix.rotate(angle, 0, 0);
    path.attr({
      "class": "mm-line-arrow",
      d: pathString,
      fill: "rgba(178,190,205,0.7)",
      transform: matrix.toString()
    });
    path.angle = angle;
    return path;
  },

  /** 是否渲染文字
   * @param  {} data
   * @param  {} allNodesMap
   * @param  {} lineShapePath
   * @param  {} labelGroup 是否已有文字对象
   */
  renderLabel: function renderLabel(data, allNodesMap, lineShapePath, labelGroup) {
    var fromX = data.fromX,
        toX = data.toX,
        labelCfg = data.labelCfg;
    var label = data.label;
    if (!label) return null; // label 样式

    var _ref = labelCfg || {},
        _ref$refX = _ref.refX,
        refX = _ref$refX === void 0 ? 0 : _ref$refX,
        _ref$refY = _ref.refY,
        refY = _ref$refY === void 0 ? 0 : _ref$refY,
        autoRotate = _ref.autoRotate,
        _ref$showNum = _ref.showNum,
        showNum = _ref$showNum === void 0 ? 20 : _ref$showNum,
        _ref$style = _ref.style,
        style = _ref$style === void 0 ? {
      fill: "#333",
      stroke: "#fff",
      fontSize: "12px"
    } : _ref$style; // 获取旋转角度 暂时不支持


    var totalLen = lineShapePath.getTotalLength();
    var pointLen = lineShapePath.getPointAtLength(totalLen / 2);

    var _ref2 = pointLen || {},
        alpha = _ref2.alpha,
        xPoint = _ref2.x,
        yPoint = _ref2.y;

    if (label && label.length > showNum && showNum) {
      label = label.slice(0, showNum) + "...";
    }

    if (!labelGroup) {
      var textCreate = this.paper.text(0, 0, label);
      var rectCreate = this.paper.rect();
      labelGroup = this.paper.group(rectCreate, textCreate);
    }

    var rect = labelGroup[0];
    var text = labelGroup[1];
    var x = xPoint + (refX || 0);
    var y = yPoint + (refY || 0);
    text.attr({
      text: label || "",
      fill: style.fill,
      fontSize: style.fontSize,
      textAnchor: "middle",
      dominantBaseline: "middle",
      x: x,
      y: y
    });

    if (!text.bbox || text.oldText !== label) {
      text.oldText = label;
      text.bbox = text.getBBox();
    } // 性能优化


    var _text$bbox = text.bbox,
        width = _text$bbox.width,
        height = _text$bbox.height;
    rect.attr({
      fill: style.stroke,
      width: width,
      height: height,
      stroke: "transparent",
      x: x - width * 0.5,
      y: y - height * 0.5
    });
    labelGroup.attr({
      "class": "mm-line-label"
    });

    if (autoRotate) {
      // 文字顺序方向
      if (fromX < toX || fromX === toX) {
        alpha += 180;
      }

      labelGroup.attr({
        transform: "rotate(".concat(alpha, ",").concat(xPoint + (refX || 0), ",").concat(yPoint + (refY || 0), ")")
      });
    }

    return labelGroup;
  },

  /**
   * @param  {} data
   */
  checkNewLine: function checkNewLine(data) {
    var from = data.from,
        to = data.to;

    if (from === to) {
      return false;
    }

    return true;
  }
};
/* harmony default export */ var Lines_Line = (DefaultLine);
// CONCATENATED MODULE: ./src/Shape/Line.js













/**
 * @class
 */

var Line_Line =
/*#__PURE__*/
function () {
  function Line(graph) {
    var _this = this;

    classCallCheck_default()(this, Line);

    this.updateActiveLine = function (g) {
      var _this$graph = _this.graph,
          hoverLinkPoint = _this$graph.hoverLinkPoint,
          nodes = _this$graph.node.nodes;
      var _g$data = g.data,
          to = _g$data.to,
          uuid = _g$data.uuid;
      var line = _this.lines[uuid];

      if (hoverLinkPoint) {
        var toElement = hoverLinkPoint.toElement || hoverLinkPoint.node;
        var beforeData = Object.assign({}, line.data);
        line.data.to = toElement.getAttribute("data-node-id");
        line.data.toPoint = parseInt(toElement.getAttribute("data-index"), 10); // 删除节点入口关联的线，给新链接的节点加上入口线

        nodes[to].fromLines["delete"](uuid);
        nodes[line.data.to].fromLines.add(uuid);

        _this.graph.fire("line:change", {
          line: line,
          type: "change",
          before: beforeData
        });

        hoverLinkPoint.removeClass && hoverLinkPoint.removeClass("hover");
      }

      _this.updateLine(uuid);
    };

    this.checkNewLine = function (e) {
      var hoverLinkPoint = _this.graph.hoverLinkPoint;

      if (hoverLinkPoint) {
        var toElement = hoverLinkPoint.toElement || hoverLinkPoint.node;
        var toNodeId = toElement.getAttribute("data-node-id");
        var toPoint = toElement.getAttribute("data-index");
        var _this$tempLineData = _this.tempLineData,
            from = _this$tempLineData.from,
            _this$tempLineData$fr = _this$tempLineData.fromPoint,
            fromPoint = _this$tempLineData$fr === void 0 ? 0 : _this$tempLineData$fr;
        var data = Object.assign({
          uuid: "".concat(from, ".").concat(fromPoint, "=>").concat(toNodeId, ".").concat(toPoint),
          to: toNodeId,
          toPoint: toPoint
        }, _this.tempLineData);
        if (_this.lines[data.uuid]) return;

        if (_this.shapes["default"].checkNewLine(data, _this.graph.editor)) {
          _this.addLine(data);
        }

        hoverLinkPoint.removeClass && hoverLinkPoint.removeClass("hover");
        _this.graph.hoverLinkPoint = undefined;
      }
    };

    this.calcLinkPoint = function (x, y) {
      var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'default';
      var _this$graph$node$shap = _this.graph.node.shapes[type].adsorb,
          adsorb = _this$graph$node$shap === void 0 ? [20, 20] : _this$graph$node$shap;

      var newXY = _this.allLinkPointsXY.find(function (item) {
        if (Math.abs(x - item[0]) < adsorb[0] && Math.abs(y - item[1]) < adsorb[1]) {
          _this.graph.hoverLinkPoint && _this.graph.hoverLinkPoint.removeClass && _this.graph.hoverLinkPoint.removeClass("hover");
          _this.graph.hoverLinkPoint = item[2];
          item[2].addClass("hover");
          return item;
        }
      });

      if (!newXY) {
        _this.graph.hoverLinkPoint && _this.graph.hoverLinkPoint.removeClass("hover");
      }

      return newXY;
    };

    this.makeAdsorbPoints = function () {
      var linkPoints = _this.paper.selectAll(".mm-link-points");

      _this.allLinkPointsXY = [];
      linkPoints.forEach(function (item) {
        var x = parseInt(item.attr("cx"));
        var y = parseInt(item.attr("cy"));

        _this.allLinkPointsXY.push([x, y, item]);
      });
    };

    this.addLinkPointEvent = function (point, node, index) {
      point.drag(function (dx, dy) {
        var _this$tempLineData2 = _this.tempLineData,
            fromX = _this$tempLineData2.fromX,
            fromY = _this$tempLineData2.fromY;

        var transform = _this.paper.transform();

        var info = transform.globalMatrix.split();
        var x = (fromX || 0) + dx / info.scalex + 1;
        var y = (fromY || 0) + dy / info.scalex - 1; // 计算磁吸坐标

        var newXY = _this.calcLinkPoint(x, y, node.data.type);

        if (newXY) {
          x = newXY[0];
          y = newXY[1];
        }

        _this.shapes.tempLine.renderPath({
          fromX: fromX,
          fromY: fromY,
          x: x,
          y: y
        }, _this.tempLine);
      }, function () {
        _this.tempLineData = {
          from: node.data.uuid,
          fromPoint: index,
          fromX: point.x,
          fromY: point.y
        };

        _this.makeAdsorbPoints();

        _this.graph.addLinkHoverEvent();

        _this.tempLine = _this.shapes.tempLine.render(_this.paper);

        _this.graph.fire("line:drag");
      }, function (e) {
        var hoverLinkPoint = _this.graph.hoverLinkPoint;
        var toNode = null;

        if (hoverLinkPoint) {
          var toElement = hoverLinkPoint.toElement || hoverLinkPoint.node;
          var toNodeId = toElement.getAttribute("data-node-id");
          toNode = _this.node.nodes[toNodeId];
        }

        _this.checkNewLine(e);

        _this.tempLine.remove();

        _this.graph.fire("line:drop", {
          fromNode: node,
          toNode: toNode,
          event: e
        });
      });
    };

    this.graph = graph;
    this.node = graph.node;
    this.paper = graph.editor.paper;
    this.lines = [];
    this.lineG = this.paper.g();
    this.allLinkPointsXY = [];
    this.shapes = {
      "default": Lines_Line,
      tempLine: {
        render: function render(paper) {
          var path = paper.path();
          path.attr({
            stroke: "#abc",
            strokeDasharray: "10 10"
          });
          return path;
        },
        renderPath: function renderPath(_ref, line) {
          var fromX = _ref.fromX,
              fromY = _ref.fromY,
              x = _ref.x,
              y = _ref.y;
          line.attr({
            d: "M".concat(fromX, " ").concat(fromY, "L").concat(x, " ").concat(y)
          });
        }
      }
    };
    this.listenEvent();
  } // 监听事件


  createClass_default()(Line, [{
    key: "listenEvent",
    value: function listenEvent() {
      var _this2 = this;

      this.graph.on("paper:click", function () {
        _this2.unActiveLine();
      });
      this.graph.on("node:click", function () {
        _this2.unActiveLine();
      });
    }
    /**
     * 添加线
     * @param {*} data 
     */

  }, {
    key: "addLine",
    value: function addLine(data) {
      var line = this.renderLine(data);
      this.graph.fire("line:add", {
        line: line,
        type: "add"
      });
    }
    /**
     * 添加虚拟的连线，用于新建链接
     * @param {*} lineData
     */

  }, {
    key: "addTempLine",
    value: function addTempLine(lineData) {
      this.tempLine = this.paper.path();
      this.tempLine.data = lineData;
    }
    /**
     * 跟下该node的线
     * @param {ele} node
     */

  }, {
    key: "updateByNode",
    value: function updateByNode(node) {
      var _this3 = this;

      node.fromLines.forEach(function (lineId) {
        _this3.updateLine(lineId);
      });
      node.toLines.forEach(function (lineId) {
        _this3.updateLine(lineId);
      });
    }
    /**
     * 重绘某个线
     * @param {*} lineId
     */

  }, {
    key: "updateLine",
    value: function updateLine(lineId) {
      var line = this.lines[lineId];
      var nodes = this.graph.node.nodes;
      var type = line.data.type;

      var _this$shapes$render = this.shapes[type || "default"].render(line.data, nodes, line.shape),
          data = _this$shapes$render.data;

      line.arrow = this.shapes[type || "default"].renderArrow(line.data, nodes, line.arrow);
      line.label = this.shapes[type || "default"].renderLabel(line.data, nodes, line.shape, line.label);
      line.data = Object.assign({}, line.data, data);
    }
    /**
     * 添加线
     * @param {*} lineData
     */

  }, {
    key: "renderLine",
    value: function renderLine(lineData) {
      var key = this.getLineId(lineData);
      var nodes = this.node.nodes;
      var shape = this.shapes[lineData.type || "default"];
      shape.paper = this.paper;
      var newLine = shape.render(lineData, nodes);
      var arrow = shape.renderArrow(lineData, nodes);
      var label = shape.renderLabel(lineData, nodes, newLine.path);
      var g = this.paper.g();
      g.append(newLine.path);
      g.append(arrow);
      g.append(label);
      g.data = Object.assign({
        uuid: key
      }, lineData, newLine.data);
      g.shape = newLine.path;
      g.arrow = arrow;
      g.label = label;
      g.attr({
        "class": "mm-line"
      });
      newLine.path.attr({
        "class": "mm-line-shape"
      });
      this.addToNodes(nodes, g);
      this.addLineEvents(g);
      this.lines[key] = g;
      this.lineG.add(g);
      return g;
    }
    /**
     * 删除线
     * @param {*} uuid
     */

  }, {
    key: "deleteLine",
    value: function deleteLine(data, notEvent, byNode) {
      var uuid = data;

      if (data.data) {
        uuid = data.data.uuid;
      }

      var nodes = this.node.nodes;
      var line = this.lines[uuid];
      delete this.lines[uuid]; // 删除关联线

      var _line$data = line.data,
          from = _line$data.from,
          to = _line$data.to;
      var id = this.getLineId(line.data);
      nodes[from] && nodes[from].toLines["delete"](id);
      nodes[to] && nodes[to].fromLines["delete"](id);
      !notEvent && // 是否由删除节点触发的线删除操作
      this.graph.fire("line:remove", {
        line: line,
        uuid: uuid,
        before: line.data,
        byNode: byNode,
        type: "remove"
      });
      line.arrow.remove();
      line.arrow.undrag();
      line.arrow = null;
      line.unclick();
      line.remove();
      this.activeLine = null;
    }
  }, {
    key: "getLineId",
    value: function getLineId(lineData) {
      var from = lineData.from,
          to = lineData.to,
          _lineData$fromPoint = lineData.fromPoint,
          fromPoint = _lineData$fromPoint === void 0 ? 0 : _lineData$fromPoint,
          _lineData$toPoint = lineData.toPoint,
          toPoint = _lineData$toPoint === void 0 ? 0 : _lineData$toPoint;
      return "".concat(from, ".").concat(fromPoint, "=>").concat(to, ".").concat(toPoint);
    }
    /**
     * 更新线为
     * @param {*} line
     * @param {*} x
     * @param {*} y
     */

  }, {
    key: "registeLine",

    /**
     * 注册线
     * @param {*} data 
     */
    value: function registeLine(data) {
      var type = data.type;
      this.shapes[type] = Object.assign({}, this.shapes["default"], data);
    }
    /**
     * 渲染
     * @param {*} lines 
     */

  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var lines = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      Object.keys(lines).map(function (key) {
        var item = lines[key];

        _this4.renderLine(item);
      });
    }
    /**
     * 
     * @param {*} nodes 
     * @param {*} g 
     */

  }, {
    key: "addToNodes",
    value: function addToNodes(nodes, g) {
      var _g$data2 = g.data,
          from = _g$data2.from,
          to = _g$data2.to;
      var id = this.getLineId(g.data);
      nodes[from].toLines.add(id);
      nodes[to].fromLines.add(id);
    }
    /**
     * 绑定线拖动事件
     * @param {*} g
     */

  }, {
    key: "addLineEvents",
    value: function addLineEvents(g) {
      var _this5 = this;

      // 箭头拖拽
      g.arrow.drag(function (dx, dy) {
        var shape = g.shape,
            data = g.data;
        var x = (g.startX || 0) + dx;
        var y = (g.startY || 0) + dy; // 计算磁吸坐标

        var newXY = _this5.calcLinkPoint(x, y, data.type);

        if (newXY) {
          x = newXY[0];
          y = newXY[1];
        }

        shape.attr({
          d: "M".concat(data.fromX, " ").concat(data.fromY, "L").concat(x, " ").concat(y)
        });
      }, function () {
        var arrow = g.arrow,
            shape = g.shape,
            data = g.data;
        var toX = data.toX,
            toY = data.toY;
        g.startX = toX;
        g.startY = toY - 2;
        arrow.attr({
          display: "none"
        });
        shape.attr({
          strokeDasharray: "5 5"
        });

        _this5.makeAdsorbPoints();

        _this5.graph.addLinkHoverEvent();

        data.status = "active";

        _this5.graph.fire("line:drag");
      }, function () {
        var arrow = g.arrow,
            shape = g.shape;
        arrow.attr({
          display: "initial"
        });
        shape.attr({
          strokeDasharray: "0"
        });

        _this5.updateActiveLine(g);

        _this5.graph.offLinkHoverEvent();
      });
      g.shape.click(function (e) {
        _this5.setActiveLine(g);

        _this5.graph.fire("line:click", {
          line: g,
          event: e
        });
      }); // 点击标签效果与点击线条一样

      g.label && g.label.click(function (e) {
        _this5.setActiveLine(g);

        _this5.graph.fire("line:click", {
          line: g,
          event: e
        });
      });
    }
    /**
     * 
     * @param {*} line 
     */

  }, {
    key: "setActiveLine",
    value: function setActiveLine(line) {
      this.unActiveLine();
      this.activeLine = line;
      this.activeLine.addClass("active");
    }
    /**
     * 取消激活
     */

  }, {
    key: "unActiveLine",
    value: function unActiveLine() {
      if (this.activeLine) {
        this.activeLine.removeClass("active");
      }

      this.activeLine = null;
    } //计算磁吸

  }, {
    key: "clear",

    /**
     * 
     */
    value: function clear() {
      var lines = this.lines;

      for (var key in lines) {
        this.deleteLine(lines[key], true);
      }
    }
  }]);

  return Line;
}();

/* harmony default export */ var Shape_Line = (Line_Line);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.sort.js
var es_array_sort = __webpack_require__(238);

// CONCATENATED MODULE: ./src/Utils/Event.js







/**
 * @class
 */
var Event_Event =
/*#__PURE__*/
function () {
  function Event() {
    classCallCheck_default()(this, Event);

    this.events = {};
    this.dispatch = this.fire;
  }

  createClass_default()(Event, [{
    key: "on",

    /**
     * 箭头
     * @param {*} event 
     * @param {*} func 
     * @param {*} index 
     */
    value: function on(event, func, index) {
      if (!this.events[event]) {
        this.events[event] = [];
      }

      index = index || this.events[event].length;
      this.events[event].push({
        index: index,
        func: func
      }); // 按照index顺序执行

      this.events[event].sort(function (a, b) {
        return a.index > b.index;
      });
    }
    /**
     * 
     * @param {*} event 
     * @param {*} data 
     */

  }, {
    key: "fire",
    value: function fire(event, data) {
      var events = this.events[event] || [];
      events.forEach(function (item) {
        item.func(data);
      });
    }
    /**
     * 关闭绑定的事件
     * @param {*} event 
     * @param {*} offFunc 不传清空所有
     */

  }, {
    key: "off",
    value: function off(event, offFunc) {
      this.events[event] = this.events[event].filter(function (func) {
        return offFunc !== func;
      });
    }
    /**
     * 清空
     */

  }, {
    key: "clear",
    value: function clear() {
      delete this.events;
    }
  }]);

  return Event;
}();

/* harmony default export */ var Utils_Event = (Event_Event);
// CONCATENATED MODULE: ./src/Shape/Animation.js

/* harmony default export */ var Shape_Animation = ({
  createRadialGradient: function createRadialGradient() {
    var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "#f4c708";
    var color2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "#f7e69a";
    var radialGradient = document.createElementNS("http://www.w3.org/2000/svg", radialGradient);
    radialGradient.innerHTML = "<stop offset=\"0%\" stop-color=\"".concat(color, "\"></stop>\n\t\t\t<stop offset=\"100%\" stop-color=\"").concat(color2, "\"></stop>\n\t\t\t<animate attributeName=\"fy\" dur=\"700ms\" from=\"90%\" to=\"0%\" repeatCount=\"indefinite\" />");
    var ele = Snap(radialGradient);
    ele.attr({
      fy: "90%"
    });
    return ele;
  }
});
// CONCATENATED MODULE: ./src/Shape/AnchorLine.js





var AnchorLine_AchorLine =
/*#__PURE__*/
function () {
  function AchorLine(graph) {
    classCallCheck_default()(this, AchorLine);

    this.graph = graph;
    this.anchorLines = {};
    this.paper = graph.editor.paper;
    this.anchorDistance = graph.editor.config.anchorDistance || 5;
    this.anchorXLength = graph.editor.config.anchorXLength || 10;
    this.anchorYLength = graph.editor.config.anchorYLength || 10;
    this.hideAchorLine = graph.editor.config.hideAchorLine;
    this.hideAchor = graph.editor.config.hideAchor;
    this.anchors = [];
    this.path = this.paper.path();
    this.path.attr({
      "class": "anchor-line"
    });
  }
  /**
   * 生成所有的吸附线位置
   */


  createClass_default()(AchorLine, [{
    key: "makeAllAnchors",
    value: function makeAllAnchors(origin) {
      if (this.hideAchorLine) return;
      this.node = origin;
      var anchors = [];
      var nodes = this.graph.node.nodes;

      for (var key in nodes) {
        if (origin.data.uuid === key) continue;
        var node = nodes[key];
        var bbox = node.getBBox(); // 缓存bbox

        node.bbox = bbox;
        var x = bbox.x,
            y = bbox.y,
            width = bbox.width,
            height = bbox.height;
        anchors.push({
          x: x,
          y: y
        }, {
          x: x + width,
          y: y
        }, {
          x: x + width,
          y: y + height
        }, {
          x: x,
          y: y + height
        }, {
          x: x + width / 2,
          y: y + height / 2
        });
      }

      this.anchors = anchors;
    }
  }, {
    key: "checkAchor",
    value: function checkAchor(x, y) {
      var anchorXLength = this.anchorXLength,
          anchorYLength = this.anchorYLength;
      var x5 = x % anchorXLength;
      var y5 = y % anchorYLength;

      if (x5 < anchorXLength / 2) {
        x = Math.floor(x / anchorXLength) * anchorXLength;
      } else {
        x = Math.ceil(x / anchorXLength) * anchorXLength;
      }

      if (y5 < anchorYLength / 2) {
        y = Math.floor(y / anchorYLength) * anchorYLength;
      } else {
        y = Math.ceil(y / anchorYLength) * anchorYLength;
      }

      return {
        x: x,
        y: y
      };
    }
    /**
     * 画节点
     * @param {*} node 
     */

  }, {
    key: "check",
    value: function check(x, y) {
      var _this = this;

      if (!this.hideAchorLine) {
        var bbox = this.node.bbox;
        var width = bbox.width,
            height = bbox.height;
        var tl = {
          x: x,
          y: y
        };
        var tr = {
          x: x + width,
          y: y
        };
        var br = {
          x: x + width,
          y: y + height
        };
        var bl = {
          x: x,
          y: y + height
        };
        var cc = {
          x: x + width / 2,
          y: y + height / 2
        };
        var nowPoints = [tl, tr, br, bl, cc];
        var _final = {},
            newXY = {
          x: x,
          y: y
        },
            coordFlag = '';
        var anchor = this.anchors.find(function (anchor) {
          return nowPoints.find(function (point, index) {
            var deltaY = anchor.y - point.y;
            var deltaX = anchor.x - point.x;

            if (Math.abs(deltaX) < _this.anchorDistance) {
              _final.x = anchor.x;
              newXY.x += deltaX;
              coordFlag = 'x';
              return true;
            }

            if (Math.abs(deltaY) < _this.anchorDistance) {
              _final.y = anchor.y;
              newXY.y += deltaY;
              coordFlag = 'y';
              return true;
            }
          });
        });

        if (!anchor) {
          this.path.node.style.display = "none";
          if (!this.hideAchor) return this.checkAchor(x, y);
          return {
            x: x,
            y: y
          };
        } // 中心点坐标补齐


        !_final.x ? _final.x = cc.x : _final.y = cc.y;
        var path = "M".concat(_final.x, ",").concat(_final.y, " L").concat(anchor.x, ",").concat(anchor.y);
        this.path.node.setAttribute("d", path);
        this.path.node.style.display = "block";

        if (!this.hideAchor) {
          var anchorXY = this.checkAchor(newXY.x, newXY.y);
          anchorXY[coordFlag] = newXY[coordFlag];
          return anchorXY;
        }

        return newXY;
      }

      if (!this.hideAchor) return this.checkAchor(x, y);
      return {
        x: x,
        y: y
      };
    }
  }, {
    key: "hidePath",
    value: function hidePath() {
      this.path.attr({
        style: "display: none"
      });
    }
  }]);

  return AchorLine;
}();

/* harmony default export */ var AnchorLine = (AnchorLine_AchorLine);
// CONCATENATED MODULE: ./src/Shape/Graph.js














var backSvg = __webpack_require__(239);
/**
 * @class
 * @extends Event
 */


var Graph_Graph =
/*#__PURE__*/
function (_Event) {
  inherits_default()(Graph, _Event);

  function Graph(editor) {
    var _this;

    classCallCheck_default()(this, Graph);

    _this = possibleConstructorReturn_default()(this, getPrototypeOf_default()(Graph).call(this));

    _this.onKeyDown = function (e) {
      if (!_this.focus) return;

      if (e.key === "Backspace") {
        var deleteKeys = [];

        for (var key in _this.node.actives) {
          // 不触发事件
          _this.node.deleteNode(_this.node.actives[key], true);

          delete _this.node.actives[key];
          deleteKeys.push(key);
        }

        _this.line.activeLine && _this.line.deleteLine(_this.line.activeLine);

        _this.fire("delete", {
          event: e,
          deleteKeys: deleteKeys
        });
      }

      if (e.keyCode === "C".charCodeAt(0) && (e.metaKey || e.ctrlKey)) {
        _this.fire("copy", {
          event: e
        });
      }

      if (e.keyCode === "V".charCodeAt(0) && (e.metaKey || e.ctrlKey)) {
        _this.fire("paste", {
          event: e
        });
      }

      if (e.keyCode === "Z".charCodeAt(0) && (e.metaKey || e.ctrlKey) && !e.shiftKey) {
        _this.editor.schema.undo();
      }

      if (e.keyCode === "Z".charCodeAt(0) && (e.metaKey || e.ctrlKey) && e.shiftKey) {
        _this.editor.schema.redo();
      }

      e.preventDefault();
      return false;
    };

    _this.onLinkPointHover = function (ele) {
      _this.hoverLinkPoint = ele;
    };

    _this.onLinkPointOut = function (ele) {
      _this.hoverLinkPoint = undefined;
    };

    _this.editor = editor;
    _this.node = new Shape_Node(assertThisInitialized_default()(_this));
    _this.line = new Shape_Line(assertThisInitialized_default()(_this));
    _this.anchorLine = new AnchorLine(assertThisInitialized_default()(_this));

    _this.node.linkPointsG.before(_this.line.lineG);

    _this.animation = Shape_Animation; // 模式：操作、查看模式

    _this.mode = editor.config.mode;

    _this.listenEvents();

    if (_this.editor.config.showBackGrid) _this.addBack();
    return _this;
  }

  createClass_default()(Graph, [{
    key: "addBack",
    value: function addBack() {
      this.editor.container.select(".mm-editor-back").node.style.backgroundImage = "url(".concat(backSvg, ")");
    }
  }, {
    key: "listenEvents",
    value: function listenEvents() {
      var _this2 = this;

      this.on("node:move", function (_ref) {
        var node = _ref.node;

        _this2.line.updateByNode(node);
      });
      this.editor.svg.attr({
        tabindex: "0"
      });
      this.editor.svg.click(function (e) {
        if (e.target.tagName === "svg") {
          _this2.fire("paper:click", e);
        }

        _this2.editor.svg.node.focus();

        _this2.focus = true;
      });
      this.editor.svg.node.addEventListener("blur", function (e) {
        _this2.focus = false;
      }); // 查看模式不能删除节点、线条；如果存在部分可操作则自己在业务中监听处理相关逻辑

      if (this.mode !== "view") {
        document.addEventListener("keydown", this.onKeyDown);
      }

      this.on("line:drag", function () {
        _this2.linkStatus = "lineing";

        for (var key in _this2.node.nodes) {
          var node = _this2.node.nodes[key];
          node.linkPoints.forEach(function (point) {
            point.attr({
              display: "block"
            });
          });
        }
      });
      this.on("line:drop", function () {
        _this2.linkStatus = "none";

        for (var key in _this2.node.nodes) {
          var node = _this2.node.nodes[key];
          node.linkPoints.forEach(function (point) {
            point.attr({
              display: "none"
            });
          });
        }
      });
    }
  }, {
    key: "addLinkHoverEvent",

    /**
     * 添加链接点事件
     */
    value: function addLinkHoverEvent() {
      var _this3 = this;

      var linkPoints = this.editor.paper.selectAll(".mm-link-points");
      linkPoints.forEach(function (point) {
        point.mouseover(_this3.onLinkPointHover);
        point.mouseout(_this3.onLinkPointOut);
      });
    }
  }, {
    key: "offLinkHoverEvent",

    /**
     * 关闭线hover事件
     */
    value: function offLinkHoverEvent() {
      var _this4 = this;

      var linkPoints = this.editor.paper.selectAll(".mm-link-points");
      linkPoints.forEach(function (point) {
        point.unmouseover(_this4.onLinkPointHover);
        point.unmouseout(_this4.onLinkPointOut);
      });
      this.hoverLinkPoint = undefined;
    }
    /**
     * 
     * @param {*} data 
     */

  }, {
    key: "render",
    value: function render(data) {
      this.data = data;
      this.node.render(data.nodesMap);
      this.line.render(data.linesMap);
    }
    /**
     * 
     */

  }, {
    key: "clearGraph",
    value: function clearGraph() {
      this.line.clear();
      this.node.clear();
      document.removeEventListener("keydown", this.onKeyDown);
    }
  }]);

  return Graph;
}(Utils_Event);

/* harmony default export */ var Shape_Graph = (Graph_Graph);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.flat.js
var es_array_flat = __webpack_require__(240);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.is-array.js
var es_array_is_array = __webpack_require__(161);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.join.js
var es_array_join = __webpack_require__(242);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.last-index-of.js
var es_array_last_index_of = __webpack_require__(243);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__(245);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.unscopables.flat.js
var es_array_unscopables_flat = __webpack_require__(246);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.date.to-json.js
var es_date_to_json = __webpack_require__(247);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.bind.js
var es_function_bind = __webpack_require__(248);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__(250);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.to-fixed.js
var es_number_to_fixed = __webpack_require__(251);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.parse-float.js
var es_parse_float = __webpack_require__(254);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.match.js
var es_string_match = __webpack_require__(256);

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.timers.js
var web_timers = __webpack_require__(83);

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.url.to-json.js
var web_url_to_json = __webpack_require__(257);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__(114);
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// EXTERNAL MODULE: ./node_modules/eve/eve.js
var eve_eve = __webpack_require__(0);
var eve_default = /*#__PURE__*/__webpack_require__.n(eve_eve);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.date.now.js
var es_date_now = __webpack_require__(258);

// CONCATENATED MODULE: ./src/Snap/mina.js







var animations = {},
    requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
  setTimeout(callback, 16, new Date().getTime());
  return true;
},
    requestID,
    isArray = Array.isArray || function (a) {
  return a instanceof Array || Object.prototype.toString.call(a) == "[object Array]";
},
    mina_idgen = 0,
    mina_idprefix = "M" + (+new Date()).toString(36),
    mina_ID = function ID() {
  return mina_idprefix + (mina_idgen++).toString(36);
},
    diff = function diff(a, b, A, B) {
  if (isArray(a)) {
    res = [];

    for (var i = 0, ii = a.length; i < ii; i++) {
      res[i] = diff(a[i], b, A[i], B);
    }

    return res;
  }

  var dif = (A - a) / (B - b);
  return function (bb) {
    return a + dif * (bb - b);
  };
},
    timer = Date.now || function () {
  return +new Date();
},
    sta = function sta(val) {
  var a = this;

  if (val == null) {
    return a.s;
  }

  var ds = a.s - val;
  a.b += a.dur * ds;
  a.B += a.dur * ds;
  a.s = val;
},
    speed = function speed(val) {
  var a = this;

  if (val == null) {
    return a.spd;
  }

  a.spd = val;
},
    duration = function duration(val) {
  var a = this;

  if (val == null) {
    return a.dur;
  }

  a.s = a.s * val / a.dur;
  a.dur = val;
},
    stopit = function stopit() {
  var a = this;
  delete animations[a.id];
  a.update();
  eve("mina.stop." + a.id, a);
},
    pause = function pause() {
  var a = this;

  if (a.pdif) {
    return;
  }

  delete animations[a.id];
  a.update();
  a.pdif = a.get() - a.b;
},
    resume = function resume() {
  var a = this;

  if (!a.pdif) {
    return;
  }

  a.b = a.get() - a.pdif;
  delete a.pdif;
  animations[a.id] = a;
  mina_frame();
},
    update = function update() {
  var a = this,
      res;

  if (isArray(a.start)) {
    res = [];

    for (var j = 0, jj = a.start.length; j < jj; j++) {
      res[j] = +a.start[j] + (a.end[j] - a.start[j]) * a.easing(a.s);
    }
  } else {
    res = +a.start + (a.end - a.start) * a.easing(a.s);
  }

  a.set(res);
},
    mina_frame = function frame(timeStamp) {
  // Manual invokation?
  if (!timeStamp) {
    // Frame loop stopped?
    if (!requestID) {
      // Start frame loop...
      requestID = requestAnimFrame(frame);
    }

    return;
  }

  var len = 0;

  for (var i in animations) {
    if (animations.hasOwnProperty(i)) {
      var a = animations[i],
          b = a.get(),
          res;
      len++;
      a.s = (b - a.b) / (a.dur / a.spd);

      if (a.s >= 1) {
        delete animations[i];
        a.s = 1;
        len--;

        (function (a) {
          setTimeout(function () {
            eve("mina.finish." + a.id, a);
          });
        })(a);
      }

      a.update();
    }
  }

  requestID = len ? requestAnimFrame(frame) : false;
},

/*\
	* mina
	[ method ]
	**
	* Generic animation of numbers
	**
	- a (number) start _slave_ number
	- A (number) end _slave_ number
	- b (number) start _master_ number (start time in general case)
	- B (number) end _master_ number (end time in general case)
	- get (function) getter of _master_ number (see @mina.time)
	- set (function) setter of _slave_ number
	- easing (function) #optional easing function, default is @mina.linear
	= (object) animation descriptor
	o {
	o         id (string) animation id,
	o         start (number) start _slave_ number,
	o         end (number) end _slave_ number,
	o         b (number) start _master_ number,
	o         s (number) animation status (0..1),
	o         dur (number) animation duration,
	o         spd (number) animation speed,
	o         get (function) getter of _master_ number (see @mina.time),
	o         set (function) setter of _slave_ number,
	o         easing (function) easing function, default is @mina.linear,
	o         status (function) status getter/setter,
	o         speed (function) speed getter/setter,
	o         duration (function) duration getter/setter,
	o         stop (function) animation stopper
	o         pause (function) pauses the animation
	o         resume (function) resumes the animation
	o         update (function) calles setter with the right value of the animation
	o }
\*/
mina = function mina(a, A, b, B, get, set, easing) {
  var anim = {
    id: mina_ID(),
    start: a,
    end: A,
    b: b,
    s: 0,
    dur: B - b,
    spd: 1,
    get: get,
    set: set,
    easing: easing || mina.linear,
    status: sta,
    speed: speed,
    duration: duration,
    stop: stopit,
    pause: pause,
    resume: resume,
    update: update
  };
  animations[anim.id] = anim;
  var len = 0,
      i;

  for (i in animations) {
    if (animations.hasOwnProperty(i)) {
      len++;

      if (len == 2) {
        break;
      }
    }
  }

  len == 1 && mina_frame();
  return anim;
};
/*\
	* mina.time
	[ method ]
	**
	* Returns the current time. Equivalent to:
	| function () {
	|     return (new Date).getTime();
	| }
\*/


mina.time = timer;
/*\
	* mina.getById
	[ method ]
	**
	* Returns an animation by its id
	- id (string) animation's id
	= (object) See @mina
\*/

mina.getById = function (id) {
  return animations[id] || null;
};
/*\
	* mina.linear
	[ method ]
	**
	* Default linear easing
	- n (number) input 0..1
	= (number) output 0..1
\*/


mina.linear = function (n) {
  return n;
};
/*\
	* mina.easeout
	[ method ]
	**
	* Easeout easing
	- n (number) input 0..1
	= (number) output 0..1
\*/


mina.easeout = function (n) {
  return Math.pow(n, 1.7);
};
/*\
	* mina.easein
	[ method ]
	**
	* Easein easing
	- n (number) input 0..1
	= (number) output 0..1
\*/


mina.easein = function (n) {
  return Math.pow(n, 0.48);
};
/*\
	* mina.easeinout
	[ method ]
	**
	* Easeinout easing
	- n (number) input 0..1
	= (number) output 0..1
\*/


mina.easeinout = function (n) {
  if (n == 1) {
    return 1;
  }

  if (n == 0) {
    return 0;
  }

  var q = 0.48 - n / 1.04,
      Q = Math.sqrt(0.1734 + q * q),
      x = Q - q,
      X = Math.pow(Math.abs(x), 1 / 3) * (x < 0 ? -1 : 1),
      y = -Q - q,
      Y = Math.pow(Math.abs(y), 1 / 3) * (y < 0 ? -1 : 1),
      t = X + Y + 0.5;
  return (1 - t) * 3 * t * t + t * t * t;
};
/*\
	* mina.backin
	[ method ]
	**
	* Backin easing
	- n (number) input 0..1
	= (number) output 0..1
\*/


mina.backin = function (n) {
  if (n == 1) {
    return 1;
  }

  var s = 1.70158;
  return n * n * ((s + 1) * n - s);
};
/*\
	* mina.backout
	[ method ]
	**
	* Backout easing
	- n (number) input 0..1
	= (number) output 0..1
\*/


mina.backout = function (n) {
  if (n == 0) {
    return 0;
  }

  n = n - 1;
  var s = 1.70158;
  return n * n * ((s + 1) * n + s) + 1;
};
/*\
	* mina.elastic
	[ method ]
	**
	* Elastic easing
	- n (number) input 0..1
	= (number) output 0..1
\*/


mina.elastic = function (n) {
  if (n == !!n) {
    return n;
  }

  return Math.pow(2, -10 * n) * Math.sin((n - 0.075) * (2 * Math.PI) / 0.3) + 1;
};
/*\
	* mina.bounce
	[ method ]
	**
	* Bounce easing
	- n (number) input 0..1
	= (number) output 0..1
\*/


mina.bounce = function (n) {
  var s = 7.5625,
      p = 2.75,
      l;

  if (n < 1 / p) {
    l = s * n * n;
  } else {
    if (n < 2 / p) {
      n -= 1.5 / p;
      l = s * n * n + 0.75;
    } else {
      if (n < 2.5 / p) {
        n -= 2.25 / p;
        l = s * n * n + 0.9375;
      } else {
        n -= 2.625 / p;
        l = s * n * n + 0.984375;
      }
    }
  }

  return l;
};

/* harmony default export */ var Snap_mina = (mina);
// CONCATENATED MODULE: ./src/Snap/snap.svg.js

































var snap_svg_Snap = function (root) {
  /*\
   * Snap
   [ method ]
   **
   * Creates a drawing surface or wraps existing SVG element.
   **
   - width (number|string) width of surface
   - height (number|string) height of surface
   * or
   - DOM (SVGElement) element to be wrapped into Snap structure
   * or
   - array (array) array of elements (will return set of elements)
   * or
   - query (string) CSS query selector
   = (object) @Element
  \*/
  function Snap(w, h) {
    if (w) {
      if (w.nodeType) {
        return wrap(w);
      }

      if (is(w, "array") && Snap.set) {
        return Snap.set.apply(Snap, w);
      }

      if (w instanceof Element) {
        return w;
      }

      if (h == null) {
        // try {
        w = glob.doc.querySelector(String(w));
        return wrap(w); // } catch (e) {
        // return null;
        // }
      }
    }

    w = w == null ? "100%" : w;
    h = h == null ? "100%" : h;
    return new Paper(w, h);
  }

  Snap.toString = function () {
    return "Snap v" + this.version;
  };

  Snap._ = {};
  var glob = {
    win: root.window,
    doc: root.window.document
  };
  Snap._.glob = glob;

  var has = "hasOwnProperty",
      Str = String,
      toFloat = parseFloat,
      toInt = parseInt,
      math = Math,
      mmax = math.max,
      mmin = math.min,
      abs = math.abs,
      pow = math.pow,
      PI = math.PI,
      round = math.round,
      E = "",
      S = " ",
      objectToString = Object.prototype.toString,
      ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i,
      colourRegExp = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\))\s*$/i,
      bezierrg = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,
      separator = Snap._.separator = /[,\s]+/,
      whitespace = /[\s]/g,
      commaSpaces = /[\s]*,[\s]*/,
      hsrg = {
    hs: 1,
    rg: 1
  },
      pathCommand = /([a-z])[\s,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\s]*,?[\s]*)+)/ig,
      tCommand = /([rstm])[\s,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\s]*,?[\s]*)+)/ig,
      pathValues = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\s]*,?[\s]*/ig,
      idgen = 0,
      idprefix = "S" + (+new Date()).toString(36),
      ID = function ID(el) {
    return (el && el.type ? el.type : E) + idprefix + (idgen++).toString(36);
  },
      xlink = "http://www.w3.org/1999/xlink",
      xmlns = "http://www.w3.org/2000/svg",
      hub = {},

  /*\
   * Snap.url
   [ method ]
   **
   * Wraps path into `"url('<path>')"`.
   - value (string) path
   = (string) wrapped path
  \*/
  URL = Snap.url = function (url) {
    return "url('#" + url + "')";
  };

  function $(el, attr) {
    if (attr) {
      if (el == "#text") {
        el = glob.doc.createTextNode(attr.text || attr["#text"] || "");
      }

      if (el == "#comment") {
        el = glob.doc.createComment(attr.text || attr["#text"] || "");
      }

      if (typeof el == "string") {
        el = $(el);
      }

      if (typeof attr == "string") {
        if (el.nodeType == 1) {
          if (attr.substring(0, 6) == "xlink:") {
            return el.getAttributeNS(xlink, attr.substring(6));
          }

          if (attr.substring(0, 4) == "xml:") {
            return el.getAttributeNS(xmlns, attr.substring(4));
          }

          return el.getAttribute(attr);
        } else if (attr == "text") {
          return el.nodeValue;
        } else {
          return null;
        }
      }

      if (el.nodeType == 1) {
        for (var key in attr) {
          if (attr[has](key)) {
            var val = Str(attr[key]);

            if (val) {
              if (key.substring(0, 6) == "xlink:") {
                el.setAttributeNS(xlink, key.substring(6), val);
              } else if (key.substring(0, 4) == "xml:") {
                el.setAttributeNS(xmlns, key.substring(4), val);
              } else {
                el.setAttribute(key, val);
              }
            } else {
              el.removeAttribute(key);
            }
          }
        }
      } else if ("text" in attr) {
        el.nodeValue = attr.text;
      }
    } else {
      el = glob.doc.createElementNS(xmlns, el);
    }

    return el;
  }

  Snap._.$ = $;
  Snap._.id = ID;

  function getAttrs(el) {
    var attrs = el.attributes,
        name,
        out = {};

    for (var i = 0; i < attrs.length; i++) {
      if (attrs[i].namespaceURI == xlink) {
        name = "xlink:";
      } else {
        name = "";
      }

      name += attrs[i].name;
      out[name] = attrs[i].textContent;
    }

    return out;
  }

  function is(o, type) {
    type = Str.prototype.toLowerCase.call(type);

    if (type == "finite") {
      return isFinite(o);
    }

    if (type == "array" && (o instanceof Array || Array.isArray && Array.isArray(o))) {
      return true;
    }

    return type == "null" && o === null || type == typeof_default()(o) && o !== null || type == "object" && o === Object(o) || objectToString.call(o).slice(8, -1).toLowerCase() == type;
  }
  /*\
   * Snap.format
   [ method ]
   **
   * Replaces construction of type `{<name>}` to the corresponding argument
   **
   - token (string) string to format
   - json (object) object which properties are used as a replacement
   = (string) formatted string
   > Usage
   | // this draws a rectangular shape equivalent to "M10,20h40v50h-40z"
   | paper.path(Snap.format("M{x},{y}h{dim.width}v{dim.height}h{dim['negative width']}z", {
   |     x: 10,
   |     y: 20,
   |     dim: {
   |         width: 40,
   |         height: 50,
   |         "negative width": -40
   |     }
   | }));
  \*/


  Snap.format = function () {
    var tokenRegex = /\{([^\}]+)\}/g,
        objNotationRegex = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,
        // matches .xxxxx or ["xxxxx"] to run over object properties
    replacer = function replacer(all, key, obj) {
      var res = obj;
      key.replace(objNotationRegex, function (all, name, quote, quotedName, isFunc) {
        name = name || quotedName;

        if (res) {
          if (name in res) {
            res = res[name];
          }

          typeof res == "function" && isFunc && (res = res());
        }
      });
      res = (res == null || res == obj ? all : res) + "";
      return res;
    };

    return function (str, obj) {
      return Str(str).replace(tokenRegex, function (all, key) {
        return replacer(all, key, obj);
      });
    };
  }();

  function clone(obj) {
    if (typeof obj == "function" || Object(obj) !== obj) {
      return obj;
    }

    var res = new obj.constructor();

    for (var key in obj) {
      if (obj[has](key)) {
        res[key] = clone(obj[key]);
      }
    }

    return res;
  }

  Snap._.clone = clone;

  function repush(array, item) {
    for (var i = 0, ii = array.length; i < ii; i++) {
      if (array[i] === item) {
        return array.push(array.splice(i, 1)[0]);
      }
    }
  }

  function cacher(f, scope, postprocessor) {
    function newf() {
      var arg = Array.prototype.slice.call(arguments, 0),
          args = arg.join("\u2400"),
          cache = newf.cache = newf.cache || {},
          count = newf.count = newf.count || [];

      if (cache[has](args)) {
        repush(count, args);
        return postprocessor ? postprocessor(cache[args]) : cache[args];
      }

      count.length >= 1e3 && delete cache[count.shift()];
      count.push(args);
      cache[args] = f.apply(scope, arg);
      return postprocessor ? postprocessor(cache[args]) : cache[args];
    }

    return newf;
  }

  Snap._.cacher = cacher;

  function angle(x1, y1, x2, y2, x3, y3) {
    if (x3 == null) {
      var x = x1 - x2,
          y = y1 - y2;

      if (!x && !y) {
        return 0;
      }

      return (180 + math.atan2(-y, -x) * 180 / PI + 360) % 360;
    } else {
      return angle(x1, y1, x3, y3) - angle(x2, y2, x3, y3);
    }
  }

  function rad(deg) {
    return deg % 360 * PI / 180;
  }

  function deg(rad) {
    return rad * 180 / PI % 360;
  }

  function x_y() {
    return this.x + S + this.y;
  }

  function x_y_w_h() {
    return this.x + S + this.y + S + this.width + " \xd7 " + this.height;
  }
  /*\
   * Snap.rad
   [ method ]
   **
   * Transform angle to radians
   - deg (number) angle in degrees
   = (number) angle in radians
  \*/


  Snap.rad = rad;
  /*\
   * Snap.deg
   [ method ]
   **
   * Transform angle to degrees
   - rad (number) angle in radians
   = (number) angle in degrees
  \*/

  Snap.deg = deg;
  /*\
   * Snap.sin
   [ method ]
   **
   * Equivalent to `Math.sin()` only works with degrees, not radians.
   - angle (number) angle in degrees
   = (number) sin
  \*/

  Snap.sin = function (angle) {
    return math.sin(Snap.rad(angle));
  };
  /*\
   * Snap.tan
   [ method ]
   **
   * Equivalent to `Math.tan()` only works with degrees, not radians.
   - angle (number) angle in degrees
   = (number) tan
  \*/


  Snap.tan = function (angle) {
    return math.tan(Snap.rad(angle));
  };
  /*\
   * Snap.cos
   [ method ]
   **
   * Equivalent to `Math.cos()` only works with degrees, not radians.
   - angle (number) angle in degrees
   = (number) cos
  \*/


  Snap.cos = function (angle) {
    return math.cos(Snap.rad(angle));
  };
  /*\
   * Snap.asin
   [ method ]
   **
   * Equivalent to `Math.asin()` only works with degrees, not radians.
   - num (number) value
   = (number) asin in degrees
  \*/


  Snap.asin = function (num) {
    return Snap.deg(math.asin(num));
  };
  /*\
   * Snap.acos
   [ method ]
   **
   * Equivalent to `Math.acos()` only works with degrees, not radians.
   - num (number) value
   = (number) acos in degrees
  \*/


  Snap.acos = function (num) {
    return Snap.deg(math.acos(num));
  };
  /*\
   * Snap.atan
   [ method ]
   **
   * Equivalent to `Math.atan()` only works with degrees, not radians.
   - num (number) value
   = (number) atan in degrees
  \*/


  Snap.atan = function (num) {
    return Snap.deg(math.atan(num));
  };
  /*\
   * Snap.atan2
   [ method ]
   **
   * Equivalent to `Math.atan2()` only works with degrees, not radians.
   - num (number) value
   = (number) atan2 in degrees
  \*/


  Snap.atan2 = function (num) {
    return Snap.deg(math.atan2(num));
  };
  /*\
   * Snap.angle
   [ method ]
   **
   * Returns an angle between two or three points
   - x1 (number) x coord of first point
   - y1 (number) y coord of first point
   - x2 (number) x coord of second point
   - y2 (number) y coord of second point
   - x3 (number) #optional x coord of third point
   - y3 (number) #optional y coord of third point
   = (number) angle in degrees
  \*/


  Snap.angle = angle;
  /*\
   * Snap.len
   [ method ]
   **
   * Returns distance between two points
   - x1 (number) x coord of first point
   - y1 (number) y coord of first point
   - x2 (number) x coord of second point
   - y2 (number) y coord of second point
   = (number) distance
  \*/

  Snap.len = function (x1, y1, x2, y2) {
    return Math.sqrt(Snap.len2(x1, y1, x2, y2));
  };
  /*\
   * Snap.len2
   [ method ]
   **
   * Returns squared distance between two points
   - x1 (number) x coord of first point
   - y1 (number) y coord of first point
   - x2 (number) x coord of second point
   - y2 (number) y coord of second point
   = (number) distance
  \*/


  Snap.len2 = function (x1, y1, x2, y2) {
    return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
  };
  /*\
   * Snap.closestPoint
   [ method ]
   **
   * Returns closest point to a given one on a given path.
   - path (Element) path element
   - x (number) x coord of a point
   - y (number) y coord of a point
   = (object) in format
   {
  	x (number) x coord of the point on the path
  	y (number) y coord of the point on the path
  	length (number) length of the path to the point
  	distance (number) distance from the given point to the path
   }
  \*/
  // Copied from http://bl.ocks.org/mbostock/8027637


  Snap.closestPoint = function (path, x, y) {
    function distance2(p) {
      var dx = p.x - x,
          dy = p.y - y;
      return dx * dx + dy * dy;
    }

    var pathNode = path.node,
        pathLength = pathNode.getTotalLength(),
        precision = pathLength / pathNode.pathSegList.numberOfItems * .125,
        best,
        bestLength,
        bestDistance = Infinity; // linear scan for coarse approximation

    for (var scan, scanLength = 0, scanDistance; scanLength <= pathLength; scanLength += precision) {
      if ((scanDistance = distance2(scan = pathNode.getPointAtLength(scanLength))) < bestDistance) {
        best = scan;
        bestLength = scanLength;
        bestDistance = scanDistance;
      }
    } // binary search for precise estimate


    precision *= .5;

    while (precision > .5) {
      var before, after, beforeLength, afterLength, beforeDistance, afterDistance;

      if ((beforeLength = bestLength - precision) >= 0 && (beforeDistance = distance2(before = pathNode.getPointAtLength(beforeLength))) < bestDistance) {
        best = before;
        bestLength = beforeLength;
        bestDistance = beforeDistance;
      } else if ((afterLength = bestLength + precision) <= pathLength && (afterDistance = distance2(after = pathNode.getPointAtLength(afterLength))) < bestDistance) {
        best = after;
        bestLength = afterLength;
        bestDistance = afterDistance;
      } else {
        precision *= .5;
      }
    }

    best = {
      x: best.x,
      y: best.y,
      length: bestLength,
      distance: Math.sqrt(bestDistance)
    };
    return best;
  };
  /*\
   * Snap.is
   [ method ]
   **
   * Handy replacement for the `typeof` operator
   - o (…) any object or primitive
   - type (string) name of the type, e.g., `string`, `function`, `number`, etc.
   = (boolean) `true` if given value is of given type
  \*/


  Snap.is = is;
  /*\
   * Snap.snapTo
   [ method ]
   **
   * Snaps given value to given grid
   - values (array|number) given array of values or step of the grid
   - value (number) value to adjust
   - tolerance (number) #optional maximum distance to the target value that would trigger the snap. Default is `10`.
   = (number) adjusted value
  \*/

  Snap.snapTo = function (values, value, tolerance) {
    tolerance = is(tolerance, "finite") ? tolerance : 10;

    if (is(values, "array")) {
      var i = values.length;

      while (i--) {
        if (abs(values[i] - value) <= tolerance) {
          return values[i];
        }
      }
    } else {
      values = +values;
      var rem = value % values;

      if (rem < tolerance) {
        return value - rem;
      }

      if (rem > values - tolerance) {
        return value - rem + values;
      }
    }

    return value;
  }; // Colour

  /*\
   * Snap.getRGB
   [ method ]
   **
   * Parses color string as RGB object
   - color (string) color string in one of the following formats:
   # <ul>
   #     <li>Color name (<code>red</code>, <code>green</code>, <code>cornflowerblue</code>, etc)</li>
   #     <li>#••• — shortened HTML color: (<code>#000</code>, <code>#fc0</code>, etc.)</li>
   #     <li>#•••••• — full length HTML color: (<code>#000000</code>, <code>#bd2300</code>)</li>
   #     <li>rgb(•••, •••, •••) — red, green and blue channels values: (<code>rgb(200,&nbsp;100,&nbsp;0)</code>)</li>
   #     <li>rgba(•••, •••, •••, •••) — also with opacity</li>
   #     <li>rgb(•••%, •••%, •••%) — same as above, but in %: (<code>rgb(100%,&nbsp;175%,&nbsp;0%)</code>)</li>
   #     <li>rgba(•••%, •••%, •••%, •••%) — also with opacity</li>
   #     <li>hsb(•••, •••, •••) — hue, saturation and brightness values: (<code>hsb(0.5,&nbsp;0.25,&nbsp;1)</code>)</li>
   #     <li>hsba(•••, •••, •••, •••) — also with opacity</li>
   #     <li>hsb(•••%, •••%, •••%) — same as above, but in %</li>
   #     <li>hsba(•••%, •••%, •••%, •••%) — also with opacity</li>
   #     <li>hsl(•••, •••, •••) — hue, saturation and luminosity values: (<code>hsb(0.5,&nbsp;0.25,&nbsp;0.5)</code>)</li>
   #     <li>hsla(•••, •••, •••, •••) — also with opacity</li>
   #     <li>hsl(•••%, •••%, •••%) — same as above, but in %</li>
   #     <li>hsla(•••%, •••%, •••%, •••%) — also with opacity</li>
   # </ul>
   * Note that `%` can be used any time: `rgb(20%, 255, 50%)`.
   = (object) RGB object in the following format:
   o {
   o     r (number) red,
   o     g (number) green,
   o     b (number) blue,
   o     hex (string) color in HTML/CSS format: #••••••,
   o     error (boolean) true if string can't be parsed
   o }
  \*/


  Snap.getRGB = cacher(function (colour) {
    if (!colour || !!((colour = Str(colour)).indexOf("-") + 1)) {
      return {
        r: -1,
        g: -1,
        b: -1,
        hex: "none",
        error: 1,
        toString: rgbtoString
      };
    }

    if (colour == "none") {
      return {
        r: -1,
        g: -1,
        b: -1,
        hex: "none",
        toString: rgbtoString
      };
    }

    !(hsrg[has](colour.toLowerCase().substring(0, 2)) || colour.charAt() == "#") && (colour = _toHex(colour));

    if (!colour) {
      return {
        r: -1,
        g: -1,
        b: -1,
        hex: "none",
        error: 1,
        toString: rgbtoString
      };
    }

    var res,
        red,
        green,
        blue,
        opacity,
        t,
        values,
        rgb = colour.match(colourRegExp);

    if (rgb) {
      if (rgb[2]) {
        blue = toInt(rgb[2].substring(5), 16);
        green = toInt(rgb[2].substring(3, 5), 16);
        red = toInt(rgb[2].substring(1, 3), 16);
      }

      if (rgb[3]) {
        blue = toInt((t = rgb[3].charAt(3)) + t, 16);
        green = toInt((t = rgb[3].charAt(2)) + t, 16);
        red = toInt((t = rgb[3].charAt(1)) + t, 16);
      }

      if (rgb[4]) {
        values = rgb[4].split(commaSpaces);
        red = toFloat(values[0]);
        values[0].slice(-1) == "%" && (red *= 2.55);
        green = toFloat(values[1]);
        values[1].slice(-1) == "%" && (green *= 2.55);
        blue = toFloat(values[2]);
        values[2].slice(-1) == "%" && (blue *= 2.55);
        rgb[1].toLowerCase().slice(0, 4) == "rgba" && (opacity = toFloat(values[3]));
        values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
      }

      if (rgb[5]) {
        values = rgb[5].split(commaSpaces);
        red = toFloat(values[0]);
        values[0].slice(-1) == "%" && (red /= 100);
        green = toFloat(values[1]);
        values[1].slice(-1) == "%" && (green /= 100);
        blue = toFloat(values[2]);
        values[2].slice(-1) == "%" && (blue /= 100);
        (values[0].slice(-3) == "deg" || values[0].slice(-1) == "\xb0") && (red /= 360);
        rgb[1].toLowerCase().slice(0, 4) == "hsba" && (opacity = toFloat(values[3]));
        values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
        return Snap.hsb2rgb(red, green, blue, opacity);
      }

      if (rgb[6]) {
        values = rgb[6].split(commaSpaces);
        red = toFloat(values[0]);
        values[0].slice(-1) == "%" && (red /= 100);
        green = toFloat(values[1]);
        values[1].slice(-1) == "%" && (green /= 100);
        blue = toFloat(values[2]);
        values[2].slice(-1) == "%" && (blue /= 100);
        (values[0].slice(-3) == "deg" || values[0].slice(-1) == "\xb0") && (red /= 360);
        rgb[1].toLowerCase().slice(0, 4) == "hsla" && (opacity = toFloat(values[3]));
        values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
        return Snap.hsl2rgb(red, green, blue, opacity);
      }

      red = mmin(math.round(red), 255);
      green = mmin(math.round(green), 255);
      blue = mmin(math.round(blue), 255);
      opacity = mmin(mmax(opacity, 0), 1);
      rgb = {
        r: red,
        g: green,
        b: blue,
        toString: rgbtoString
      };
      rgb.hex = "#" + (16777216 | blue | green << 8 | red << 16).toString(16).slice(1);
      rgb.opacity = is(opacity, "finite") ? opacity : 1;
      return rgb;
    }

    return {
      r: -1,
      g: -1,
      b: -1,
      hex: "none",
      error: 1,
      toString: rgbtoString
    };
  }, Snap);
  /*\
   * Snap.hsb
   [ method ]
   **
   * Converts HSB values to a hex representation of the color
   - h (number) hue
   - s (number) saturation
   - b (number) value or brightness
   = (string) hex representation of the color
  \*/

  Snap.hsb = cacher(function (h, s, b) {
    return Snap.hsb2rgb(h, s, b).hex;
  });
  /*\
   * Snap.hsl
   [ method ]
   **
   * Converts HSL values to a hex representation of the color
   - h (number) hue
   - s (number) saturation
   - l (number) luminosity
   = (string) hex representation of the color
  \*/

  Snap.hsl = cacher(function (h, s, l) {
    return Snap.hsl2rgb(h, s, l).hex;
  });
  /*\
   * Snap.rgb
   [ method ]
   **
   * Converts RGB values to a hex representation of the color
   - r (number) red
   - g (number) green
   - b (number) blue
   = (string) hex representation of the color
  \*/

  Snap.rgb = cacher(function (r, g, b, o) {
    if (is(o, "finite")) {
      var round = math.round;
      return "rgba(" + [round(r), round(g), round(b), +o.toFixed(2)] + ")";
    }

    return "#" + (16777216 | b | g << 8 | r << 16).toString(16).slice(1);
  });

  var _toHex = function toHex(color) {
    var i = glob.doc.getElementsByTagName("head")[0] || glob.doc.getElementsByTagName("svg")[0],
        red = "rgb(255, 0, 0)";
    _toHex = cacher(function (color) {
      if (color.toLowerCase() == "red") {
        return red;
      }

      i.style.color = red;
      i.style.color = color;
      var out = glob.doc.defaultView.getComputedStyle(i, E).getPropertyValue("color");
      return out == red ? null : out;
    });
    return _toHex(color);
  },
      hsbtoString = function hsbtoString() {
    return "hsb(" + [this.h, this.s, this.b] + ")";
  },
      hsltoString = function hsltoString() {
    return "hsl(" + [this.h, this.s, this.l] + ")";
  },
      rgbtoString = function rgbtoString() {
    return this.opacity == 1 || this.opacity == null ? this.hex : "rgba(" + [this.r, this.g, this.b, this.opacity] + ")";
  },
      prepareRGB = function prepareRGB(r, g, b) {
    if (g == null && is(r, "object") && "r" in r && "g" in r && "b" in r) {
      b = r.b;
      g = r.g;
      r = r.r;
    }

    if (g == null && is(r, string)) {
      var clr = Snap.getRGB(r);
      r = clr.r;
      g = clr.g;
      b = clr.b;
    }

    if (r > 1 || g > 1 || b > 1) {
      r /= 255;
      g /= 255;
      b /= 255;
    }

    return [r, g, b];
  },
      packageRGB = function packageRGB(r, g, b, o) {
    r = math.round(r * 255);
    g = math.round(g * 255);
    b = math.round(b * 255);
    var rgb = {
      r: r,
      g: g,
      b: b,
      opacity: is(o, "finite") ? o : 1,
      hex: Snap.rgb(r, g, b),
      toString: rgbtoString
    };
    is(o, "finite") && (rgb.opacity = o);
    return rgb;
  };
  /*\
   * Snap.color
   [ method ]
   **
   * Parses the color string and returns an object featuring the color's component values
   - clr (string) color string in one of the supported formats (see @Snap.getRGB)
   = (object) Combined RGB/HSB object in the following format:
   o {
   o     r (number) red,
   o     g (number) green,
   o     b (number) blue,
   o     hex (string) color in HTML/CSS format: #••••••,
   o     error (boolean) `true` if string can't be parsed,
   o     h (number) hue,
   o     s (number) saturation,
   o     v (number) value (brightness),
   o     l (number) lightness
   o }
  \*/


  Snap.color = function (clr) {
    var rgb;

    if (is(clr, "object") && "h" in clr && "s" in clr && "b" in clr) {
      rgb = Snap.hsb2rgb(clr);
      clr.r = rgb.r;
      clr.g = rgb.g;
      clr.b = rgb.b;
      clr.opacity = 1;
      clr.hex = rgb.hex;
    } else if (is(clr, "object") && "h" in clr && "s" in clr && "l" in clr) {
      rgb = Snap.hsl2rgb(clr);
      clr.r = rgb.r;
      clr.g = rgb.g;
      clr.b = rgb.b;
      clr.opacity = 1;
      clr.hex = rgb.hex;
    } else {
      if (is(clr, "string")) {
        clr = Snap.getRGB(clr);
      }

      if (is(clr, "object") && "r" in clr && "g" in clr && "b" in clr && !("error" in clr)) {
        rgb = Snap.rgb2hsl(clr);
        clr.h = rgb.h;
        clr.s = rgb.s;
        clr.l = rgb.l;
        rgb = Snap.rgb2hsb(clr);
        clr.v = rgb.b;
      } else {
        clr = {
          hex: "none"
        };
        clr.r = clr.g = clr.b = clr.h = clr.s = clr.v = clr.l = -1;
        clr.error = 1;
      }
    }

    clr.toString = rgbtoString;
    return clr;
  };
  /*\
   * Snap.hsb2rgb
   [ method ]
   **
   * Converts HSB values to an RGB object
   - h (number) hue
   - s (number) saturation
   - v (number) value or brightness
   = (object) RGB object in the following format:
   o {
   o     r (number) red,
   o     g (number) green,
   o     b (number) blue,
   o     hex (string) color in HTML/CSS format: #••••••
   o }
  \*/


  Snap.hsb2rgb = function (h, s, v, o) {
    if (is(h, "object") && "h" in h && "s" in h && "b" in h) {
      v = h.b;
      s = h.s;
      o = h.o;
      h = h.h;
    }

    h *= 360;
    var R, G, B, X, C;
    h = h % 360 / 60;
    C = v * s;
    X = C * (1 - abs(h % 2 - 1));
    R = G = B = v - C;
    h = ~~h;
    R += [C, X, 0, 0, X, C][h];
    G += [X, C, C, X, 0, 0][h];
    B += [0, 0, X, C, C, X][h];
    return packageRGB(R, G, B, o);
  };
  /*\
   * Snap.hsl2rgb
   [ method ]
   **
   * Converts HSL values to an RGB object
   - h (number) hue
   - s (number) saturation
   - l (number) luminosity
   = (object) RGB object in the following format:
   o {
   o     r (number) red,
   o     g (number) green,
   o     b (number) blue,
   o     hex (string) color in HTML/CSS format: #••••••
   o }
  \*/


  Snap.hsl2rgb = function (h, s, l, o) {
    if (is(h, "object") && "h" in h && "s" in h && "l" in h) {
      l = h.l;
      s = h.s;
      h = h.h;
    }

    if (h > 1 || s > 1 || l > 1) {
      h /= 360;
      s /= 100;
      l /= 100;
    }

    h *= 360;
    var R, G, B, X, C;
    h = h % 360 / 60;
    C = 2 * s * (l < .5 ? l : 1 - l);
    X = C * (1 - abs(h % 2 - 1));
    R = G = B = l - C / 2;
    h = ~~h;
    R += [C, X, 0, 0, X, C][h];
    G += [X, C, C, X, 0, 0][h];
    B += [0, 0, X, C, C, X][h];
    return packageRGB(R, G, B, o);
  };
  /*\
   * Snap.rgb2hsb
   [ method ]
   **
   * Converts RGB values to an HSB object
   - r (number) red
   - g (number) green
   - b (number) blue
   = (object) HSB object in the following format:
   o {
   o     h (number) hue,
   o     s (number) saturation,
   o     b (number) brightness
   o }
  \*/


  Snap.rgb2hsb = function (r, g, b) {
    b = prepareRGB(r, g, b);
    r = b[0];
    g = b[1];
    b = b[2];
    var H, S, V, C;
    V = mmax(r, g, b);
    C = V - mmin(r, g, b);
    H = C == 0 ? null : V == r ? (g - b) / C : V == g ? (b - r) / C + 2 : (r - g) / C + 4;
    H = (H + 360) % 6 * 60 / 360;
    S = C == 0 ? 0 : C / V;
    return {
      h: H,
      s: S,
      b: V,
      toString: hsbtoString
    };
  };
  /*\
   * Snap.rgb2hsl
   [ method ]
   **
   * Converts RGB values to an HSL object
   - r (number) red
   - g (number) green
   - b (number) blue
   = (object) HSL object in the following format:
   o {
   o     h (number) hue,
   o     s (number) saturation,
   o     l (number) luminosity
   o }
  \*/


  Snap.rgb2hsl = function (r, g, b) {
    b = prepareRGB(r, g, b);
    r = b[0];
    g = b[1];
    b = b[2];
    var H, S, L, M, m, C;
    M = mmax(r, g, b);
    m = mmin(r, g, b);
    C = M - m;
    H = C == 0 ? null : M == r ? (g - b) / C : M == g ? (b - r) / C + 2 : (r - g) / C + 4;
    H = (H + 360) % 6 * 60 / 360;
    L = (M + m) / 2;
    S = C == 0 ? 0 : L < .5 ? C / (2 * L) : C / (2 - 2 * L);
    return {
      h: H,
      s: S,
      l: L,
      toString: hsltoString
    };
  }; // Transformations

  /*\
   * Snap.parsePathString
   [ method ]
   **
   * Utility method
   **
   * Parses given path string into an array of arrays of path segments
   - pathString (string|array) path string or array of segments (in the last case it is returned straight away)
   = (array) array of segments
  \*/


  Snap.parsePathString = function (pathString) {
    if (!pathString) {
      return null;
    }

    var pth = Snap.path(pathString);

    if (pth.arr) {
      return Snap.path.clone(pth.arr);
    }

    var paramCounts = {
      a: 7,
      c: 6,
      o: 2,
      h: 1,
      l: 2,
      m: 2,
      r: 4,
      q: 4,
      s: 4,
      t: 2,
      v: 1,
      u: 3,
      z: 0
    },
        data = [];

    if (is(pathString, "array") && is(pathString[0], "array")) {
      // rough assumption
      data = Snap.path.clone(pathString);
    }

    if (!data.length) {
      Str(pathString).replace(pathCommand, function (a, b, c) {
        var params = [],
            name = b.toLowerCase();
        c.replace(pathValues, function (a, b) {
          b && params.push(+b);
        });

        if (name == "m" && params.length > 2) {
          data.push([b].concat(params.splice(0, 2)));
          name = "l";
          b = b == "m" ? "l" : "L";
        }

        if (name == "o" && params.length == 1) {
          data.push([b, params[0]]);
        }

        if (name == "r") {
          data.push([b].concat(params));
        } else while (params.length >= paramCounts[name]) {
          data.push([b].concat(params.splice(0, paramCounts[name])));

          if (!paramCounts[name]) {
            break;
          }
        }
      });
    }

    data.toString = Snap.path.toString;
    pth.arr = Snap.path.clone(data);
    return data;
  };
  /*\
   * Snap.parseTransformString
   [ method ]
   **
   * Utility method
   **
   * Parses given transform string into an array of transformations
   - TString (string|array) transform string or array of transformations (in the last case it is returned straight away)
   = (array) array of transformations
  \*/


  var parseTransformString = Snap.parseTransformString = function (TString) {
    if (!TString) {
      return null;
    }

    var paramCounts = {
      r: 3,
      s: 4,
      t: 2,
      m: 6
    },
        data = [];

    if (is(TString, "array") && is(TString[0], "array")) {
      // rough assumption
      data = Snap.path.clone(TString);
    }

    if (!data.length) {
      Str(TString).replace(tCommand, function (a, b, c) {
        var params = [],
            name = b.toLowerCase();
        c.replace(pathValues, function (a, b) {
          b && params.push(+b);
        });
        data.push([b].concat(params));
      });
    }

    data.toString = Snap.path.toString;
    return data;
  };

  function svgTransform2string(tstr) {
    var res = [];
    tstr = tstr.replace(/(?:^|\s)(\w+)\(([^)]+)\)/g, function (all, name, params) {
      params = params.split(/\s*,\s*|\s+/);

      if (name == "rotate" && params.length == 1) {
        params.push(0, 0);
      }

      if (name == "scale") {
        if (params.length > 2) {
          params = params.slice(0, 2);
        } else if (params.length == 2) {
          params.push(0, 0);
        }

        if (params.length == 1) {
          params.push(params[0], 0, 0);
        }
      }

      if (name == "skewX") {
        res.push(["m", 1, 0, math.tan(rad(params[0])), 1, 0, 0]);
      } else if (name == "skewY") {
        res.push(["m", 1, math.tan(rad(params[0])), 0, 1, 0, 0]);
      } else {
        res.push([name.charAt(0)].concat(params));
      }

      return all;
    });
    return res;
  }

  Snap._.svgTransform2string = svgTransform2string;
  Snap._.rgTransform = /^[a-z][\s]*-?\.?\d/i;

  function transform2matrix(tstr, bbox) {
    var tdata = parseTransformString(tstr),
        m = new Snap.Matrix();

    if (tdata) {
      for (var i = 0, ii = tdata.length; i < ii; i++) {
        var t = tdata[i],
            tlen = t.length,
            command = Str(t[0]).toLowerCase(),
            absolute = t[0] != command,
            inver = absolute ? m.invert() : 0,
            x1,
            y1,
            x2,
            y2,
            bb;

        if (command == "t" && tlen == 2) {
          m.translate(t[1], 0);
        } else if (command == "t" && tlen == 3) {
          if (absolute) {
            x1 = inver.x(0, 0);
            y1 = inver.y(0, 0);
            x2 = inver.x(t[1], t[2]);
            y2 = inver.y(t[1], t[2]);
            m.translate(x2 - x1, y2 - y1);
          } else {
            m.translate(t[1], t[2]);
          }
        } else if (command == "r") {
          if (tlen == 2) {
            bb = bb || bbox;
            m.rotate(t[1], bb.x + bb.width / 2, bb.y + bb.height / 2);
          } else if (tlen == 4) {
            if (absolute) {
              x2 = inver.x(t[2], t[3]);
              y2 = inver.y(t[2], t[3]);
              m.rotate(t[1], x2, y2);
            } else {
              m.rotate(t[1], t[2], t[3]);
            }
          }
        } else if (command == "s") {
          if (tlen == 2 || tlen == 3) {
            bb = bb || bbox;
            m.scale(t[1], t[tlen - 1], bb.x + bb.width / 2, bb.y + bb.height / 2);
          } else if (tlen == 4) {
            if (absolute) {
              x2 = inver.x(t[2], t[3]);
              y2 = inver.y(t[2], t[3]);
              m.scale(t[1], t[1], x2, y2);
            } else {
              m.scale(t[1], t[1], t[2], t[3]);
            }
          } else if (tlen == 5) {
            if (absolute) {
              x2 = inver.x(t[3], t[4]);
              y2 = inver.y(t[3], t[4]);
              m.scale(t[1], t[2], x2, y2);
            } else {
              m.scale(t[1], t[2], t[3], t[4]);
            }
          }
        } else if (command == "m" && tlen == 7) {
          m.add(t[1], t[2], t[3], t[4], t[5], t[6]);
        }
      }
    }

    return m;
  }

  Snap._.transform2matrix = transform2matrix;
  Snap._unit2px = unit2px;
  var contains = glob.doc.contains || glob.doc.compareDocumentPosition ? function (a, b) {
    var adown = a.nodeType == 9 ? a.documentElement : a,
        bup = b && b.parentNode;
    return a == bup || !!(bup && bup.nodeType == 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
  } : function (a, b) {
    if (b) {
      while (b) {
        b = b.parentNode;

        if (b == a) {
          return true;
        }
      }
    }

    return false;
  };

  function getSomeDefs(el) {
    var p = el.node.ownerSVGElement && wrap(el.node.ownerSVGElement) || el.node.parentNode && wrap(el.node.parentNode) || Snap.select("svg") || Snap(0, 0),
        pdefs = p.select("defs"),
        defs = pdefs == null ? false : pdefs.node;

    if (!defs) {
      defs = make("defs", p.node).node;
    }

    return defs;
  }

  function getSomeSVG(el) {
    return el.node.ownerSVGElement && wrap(el.node.ownerSVGElement) || Snap.select("svg");
  }

  Snap._.getSomeDefs = getSomeDefs;
  Snap._.getSomeSVG = getSomeSVG;

  function unit2px(el, name, value) {
    var svg = getSomeSVG(el).node,
        out = {},
        mgr = svg.querySelector(".svg---mgr");

    if (!mgr) {
      mgr = $("rect");
      $(mgr, {
        x: -9e9,
        y: -9e9,
        width: 10,
        height: 10,
        "class": "svg---mgr",
        fill: "none"
      });
      svg.appendChild(mgr);
    }

    function getW(val) {
      if (val == null) {
        return E;
      }

      if (val == +val) {
        return val;
      }

      $(mgr, {
        width: val
      });

      try {
        return mgr.getBBox().width;
      } catch (e) {
        return 0;
      }
    }

    function getH(val) {
      if (val == null) {
        return E;
      }

      if (val == +val) {
        return val;
      }

      $(mgr, {
        height: val
      });

      try {
        return mgr.getBBox().height;
      } catch (e) {
        return 0;
      }
    }

    function set(nam, f) {
      if (name == null) {
        out[nam] = f(el.attr(nam) || 0);
      } else if (nam == name) {
        out = f(value == null ? el.attr(nam) || 0 : value);
      }
    }

    switch (el.type) {
      case "rect":
        set("rx", getW);
        set("ry", getH);

      case "image":
        set("width", getW);
        set("height", getH);

      case "text":
        set("x", getW);
        set("y", getH);
        break;

      case "circle":
        set("cx", getW);
        set("cy", getH);
        set("r", getW);
        break;

      case "ellipse":
        set("cx", getW);
        set("cy", getH);
        set("rx", getW);
        set("ry", getH);
        break;

      case "line":
        set("x1", getW);
        set("x2", getW);
        set("y1", getH);
        set("y2", getH);
        break;

      case "marker":
        set("refX", getW);
        set("markerWidth", getW);
        set("refY", getH);
        set("markerHeight", getH);
        break;

      case "radialGradient":
        set("fx", getW);
        set("fy", getH);
        break;

      case "tspan":
        set("dx", getW);
        set("dy", getH);
        break;

      default:
        set(name, getW);
    }

    svg.removeChild(mgr);
    return out;
  }
  /*\
   * Snap.select
   [ method ]
   **
   * Wraps a DOM element specified by CSS selector as @Element
   - query (string) CSS selector of the element
   = (Element) the current element
  \*/


  Snap.select = function (query) {
    query = Str(query).replace(/([^\\]):/g, "$1\\:");
    return wrap(glob.doc.querySelector(query));
  };
  /*\
   * Snap.selectAll
   [ method ]
   **
   * Wraps DOM elements specified by CSS selector as set or array of @Element
   - query (string) CSS selector of the element
   = (Element) the current element
  \*/


  Snap.selectAll = function (query) {
    var nodelist = glob.doc.querySelectorAll(query),
        set = (Snap.set || Array)();

    for (var i = 0; i < nodelist.length; i++) {
      set.push(wrap(nodelist[i]));
    }

    return set;
  };

  function add2group(list) {
    if (!is(list, "array")) {
      list = Array.prototype.slice.call(arguments, 0);
    }

    var i = 0,
        j = 0,
        node = this.node;

    while (this[i]) {
      delete this[i++];
    }

    for (i = 0; i < list.length; i++) {
      if (list[i].type == "set") {
        list[i].forEach(function (el) {
          node.appendChild(el.node);
        });
      } else {
        node.appendChild(list[i].node);
      }
    }

    var children = node.childNodes;

    for (i = 0; i < children.length; i++) {
      this[j++] = wrap(children[i]);
    }

    return this;
  } // Hub garbage collector every 10s


  setInterval(function () {
    for (var key in hub) {
      if (hub[has](key)) {
        var el = hub[key],
            node = el.node;

        if (el.type != "svg" && !node.ownerSVGElement || el.type == "svg" && (!node.parentNode || "ownerSVGElement" in node.parentNode && !node.ownerSVGElement)) {
          delete hub[key];
        }
      }
    }
  }, 1e4);

  function Element(el) {
    if (el.snap in hub) {
      return hub[el.snap];
    }

    var svg;

    try {
      svg = el.ownerSVGElement;
    } catch (e) {}
    /*\
     * Element.node
     [ property (object) ]
     **
     * Gives you a reference to the DOM object, so you can assign event handlers or just mess around.
     > Usage
     | // draw a circle at coordinate 10,10 with radius of 10
     | var c = paper.circle(10, 10, 10);
     | c.node.onclick = function () {
     |     c.attr("fill", "red");
     | };
    \*/


    this.node = el;

    if (svg) {
      this.paper = new Paper(svg);
    }
    /*\
     * Element.type
     [ property (string) ]
     **
     * SVG tag name of the given element.
    \*/


    this.type = el.tagName || el.nodeName;
    var id = this.id = ID(this);
    this.anims = {};
    this._ = {
      transform: []
    };
    el.snap = id;
    hub[id] = this;

    if (this.type == "g") {
      this.add = add2group;
    }

    if (this.type in {
      g: 1,
      mask: 1,
      pattern: 1,
      symbol: 1
    }) {
      for (var method in Paper.prototype) {
        if (Paper.prototype[has](method)) {
          this[method] = Paper.prototype[method];
        }
      }
    }
  }
  /*\
    * Element.attr
    [ method ]
    **
    * Gets or sets given attributes of the element.
    **
    - params (object) contains key-value pairs of attributes you want to set
    * or
    - param (string) name of the attribute
    = (Element) the current element
    * or
    = (string) value of attribute
    > Usage
    | el.attr({
    |     fill: "#fc0",
    |     stroke: "#000",
    |     strokeWidth: 2, // CamelCase...
    |     "fill-opacity": 0.5, // or dash-separated names
    |     width: "*=2" // prefixed values
    | });
    | console.log(el.attr("fill")); // #fc0
    * Prefixed values in format `"+=10"` supported. All four operations
    * (`+`, `-`, `*` and `/`) could be used. Optionally you can use units for `+`
    * and `-`: `"+=2em"`.
   \*/


  Element.prototype.attr = function (params, value) {
    var el = this,
        node = el.node;
    this.params = this.params || {};

    if (!params) {
      if (node.nodeType != 1) {
        return {
          text: node.nodeValue
        };
      }

      var attr = node.attributes,
          out = {};

      for (var i = 0, ii = attr.length; i < ii; i++) {
        out[attr[i].nodeName] = attr[i].nodeValue;
      }

      return out;
    }

    if (is(params, "string")) {
      if (arguments.length > 1) {
        var json = {};
        json[params] = value;
        params = json;
      } else {
        return eve_default()("snap.util.getattr." + params, el).firstDefined();
      }
    }

    for (var att in params) {
      eve_default()("snap.util.attr." + att, el, params[att]);
    }

    return el;
  };
  /*\
   * Snap.parse
   [ method ]
   **
   * Parses SVG fragment and converts it into a @Fragment
   **
   - svg (string) SVG string
   = (Fragment) the @Fragment
  \*/


  Snap.parse = function (svg) {
    var f = glob.doc.createDocumentFragment(),
        full = true,
        div = glob.doc.createElement("div");
    svg = Str(svg);

    if (!svg.match(/^\s*<\s*svg(?:\s|>)/)) {
      svg = "<svg>" + svg + "</svg>";
      full = false;
    }

    div.innerHTML = svg;
    svg = div.getElementsByTagName("svg")[0];

    if (svg) {
      if (full) {
        f = svg;
      } else {
        while (svg.firstChild) {
          f.appendChild(svg.firstChild);
        }
      }
    }

    return new Fragment(f);
  };

  function Fragment(frag) {
    this.node = frag;
  }
  /*\
   * Snap.fragment
   [ method ]
   **
   * Creates a DOM fragment from a given list of elements or strings
   **
   - varargs (…) SVG string
   = (Fragment) the @Fragment
  \*/


  Snap.fragment = function () {
    var args = Array.prototype.slice.call(arguments, 0),
        f = glob.doc.createDocumentFragment();

    for (var i = 0, ii = args.length; i < ii; i++) {
      var item = args[i];

      if (item.node && item.node.nodeType) {
        f.appendChild(item.node);
      }

      if (item.nodeType) {
        f.appendChild(item);
      }

      if (typeof item == "string") {
        f.appendChild(Snap.parse(item).node);
      }
    }

    return new Fragment(f);
  };

  function make(name, parent) {
    var res = $(name);
    parent.appendChild(res);
    var el = wrap(res);
    return el;
  }

  function Paper(w, h) {
    var res,
        desc,
        defs,
        proto = Paper.prototype;

    if (w && w.tagName && w.tagName.toLowerCase() == "svg") {
      if (w.snap in hub) {
        return hub[w.snap];
      }

      var doc = w.ownerDocument;
      res = new Element(w);
      desc = w.getElementsByTagName("desc")[0];
      defs = w.getElementsByTagName("defs")[0];

      if (!desc) {
        desc = $("desc");
        desc.appendChild(doc.createTextNode("Created with Snap"));
        res.node.appendChild(desc);
      }

      if (!defs) {
        defs = $("defs");
        res.node.appendChild(defs);
      }

      res.defs = defs;

      for (var key in proto) {
        if (proto[has](key)) {
          res[key] = proto[key];
        }
      }

      res.paper = res.root = res;
    } else {
      res = make("svg", glob.doc.body);
      $(res.node, {
        height: h,
        version: 1.1,
        width: w,
        xmlns: xmlns
      });
    }

    return res;
  }

  function wrap(dom) {
    if (!dom) {
      return dom;
    }

    if (dom instanceof Element || dom instanceof Fragment) {
      return dom;
    }

    if (dom.tagName && dom.tagName.toLowerCase() == "svg") {
      return new Paper(dom);
    }

    if (dom.tagName && dom.tagName.toLowerCase() == "object" && dom.type == "image/svg+xml") {
      return new Paper(dom.contentDocument.getElementsByTagName("svg")[0]);
    }

    return new Element(dom);
  }

  Snap._.make = make;
  Snap._.wrap = wrap;
  /*\
   * Paper.el
   [ method ]
   **
   * Creates an element on paper with a given name and no attributes
   **
   - name (string) tag name
   - attr (object) attributes
   = (Element) the current element
   > Usage
   | var c = paper.circle(10, 10, 10); // is the same as...
   | var c = paper.el("circle").attr({
   |     cx: 10,
   |     cy: 10,
   |     r: 10
   | });
   | // and the same as
   | var c = paper.el("circle", {
   |     cx: 10,
   |     cy: 10,
   |     r: 10
   | });
  \*/

  Paper.prototype.el = function (name, attr) {
    var el = make(name, this.node);
    attr && el.attr(attr);
    return el;
  };
  /*\
   * Element.children
   [ method ]
   **
   * Returns array of all the children of the element.
   = (array) array of Elements
  \*/


  Element.prototype.children = function () {
    var out = [],
        ch = this.node.childNodes;

    for (var i = 0, ii = ch.length; i < ii; i++) {
      out[i] = Snap(ch[i]);
    }

    return out;
  };

  function jsonFiller(root, o) {
    for (var i = 0, ii = root.length; i < ii; i++) {
      var item = {
        type: root[i].type,
        attr: root[i].attr()
      },
          children = root[i].children();
      o.push(item);

      if (children.length) {
        jsonFiller(children, item.childNodes = []);
      }
    }
  }
  /*\
   * Element.toJSON
   [ method ]
   **
   * Returns object representation of the given element and all its children.
   = (object) in format
   o {
   o     type (string) this.type,
   o     attr (object) attributes map,
   o     childNodes (array) optional array of children in the same format
   o }
  \*/


  Element.prototype.toJSON = function () {
    var out = [];
    jsonFiller([this], out);
    return out[0];
  }; // default


  eve_default.a.on("snap.util.getattr", function () {
    var att = eve_default.a.nt();
    att = att.substring(att.lastIndexOf(".") + 1);
    var css = att.replace(/[A-Z]/g, function (letter) {
      return "-" + letter.toLowerCase();
    });

    if (cssAttr[has](css)) {
      // 简单点，不要重绘
      return this.node.style[css] || this.node.getAttribute(css); //this.node.ownerDocument.defaultView.getComputedStyle(this.node, null).getPropertyValue(css);
    } else {
      return $(this.node, att);
    }
  });
  var cssAttr = {
    "alignment-baseline": 0,
    "baseline-shift": 0,
    "clip": 0,
    "clip-path": 0,
    "clip-rule": 0,
    "color": 0,
    "color-interpolation": 0,
    "color-interpolation-filters": 0,
    "color-profile": 0,
    "color-rendering": 0,
    "cursor": 0,
    "direction": 0,
    "display": 0,
    "dominant-baseline": 0,
    "enable-background": 0,
    "fill": 0,
    "fill-opacity": 0,
    "fill-rule": 0,
    "filter": 0,
    "flood-color": 0,
    "flood-opacity": 0,
    "font": 0,
    "font-family": 0,
    "font-size": 0,
    "font-size-adjust": 0,
    "font-stretch": 0,
    "font-style": 0,
    "font-variant": 0,
    "font-weight": 0,
    "glyph-orientation-horizontal": 0,
    "glyph-orientation-vertical": 0,
    "image-rendering": 0,
    "kerning": 0,
    "letter-spacing": 0,
    "lighting-color": 0,
    "marker": 0,
    "marker-end": 0,
    "marker-mid": 0,
    "marker-start": 0,
    "mask": 0,
    "opacity": 0,
    "overflow": 0,
    "pointer-events": 0,
    "shape-rendering": 0,
    "stop-color": 0,
    "stop-opacity": 0,
    "stroke": 0,
    "stroke-dasharray": 0,
    "stroke-dashoffset": 0,
    "stroke-linecap": 0,
    "stroke-linejoin": 0,
    "stroke-miterlimit": 0,
    "stroke-opacity": 0,
    "stroke-width": 0,
    "text-anchor": 0,
    "text-decoration": 0,
    "text-rendering": 0,
    "unicode-bidi": 0,
    "visibility": 0,
    "word-spacing": 0,
    "writing-mode": 0
  };
  eve_default.a.on("snap.util.attr", function (value) {
    var att = eve_default.a.nt(),
        attr = {};
    att = att.substring(att.lastIndexOf(".") + 1);
    attr[att] = value;
    var style = att.replace(/-(\w)/gi, function (all, letter) {
      return letter.toUpperCase();
    }),
        css = att.replace(/[A-Z]/g, function (letter) {
      return "-" + letter.toLowerCase();
    });

    if (cssAttr[has](css)) {
      // if (this.node.style[style] !== value) {// 同样的值避免重绘
      this.node.style[style] = value == null ? E : value; // }
    } else {
      $(this.node, attr);
    }
  });

  (function (proto) {})(Paper.prototype); // simple ajax

  /*\
   * Snap.ajax
   [ method ]
   **
   * Simple implementation of Ajax
   **
   - url (string) URL
   - postData (object|string) data for post request
   - callback (function) callback
   - scope (object) #optional scope of callback
   * or
   - url (string) URL
   - callback (function) callback
   - scope (object) #optional scope of callback
   = (XMLHttpRequest) the XMLHttpRequest object, just in case
  \*/


  Snap.ajax = function (url, postData, callback, scope) {
    var req = new XMLHttpRequest(),
        id = ID();

    if (req) {
      if (is(postData, "function")) {
        scope = callback;
        callback = postData;
        postData = null;
      } else if (is(postData, "object")) {
        var pd = [];

        for (var key in postData) {
          if (postData.hasOwnProperty(key)) {
            pd.push(encodeURIComponent(key) + "=" + encodeURIComponent(postData[key]));
          }
        }

        postData = pd.join("&");
      }

      req.open(postData ? "POST" : "GET", url, true);

      if (postData) {
        req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      }

      if (callback) {
        eve_default.a.once("snap.ajax." + id + ".0", callback);
        eve_default.a.once("snap.ajax." + id + ".200", callback);
        eve_default.a.once("snap.ajax." + id + ".304", callback);
      }

      req.onreadystatechange = function () {
        if (req.readyState != 4) return;
        eve_default()("snap.ajax." + id + "." + req.status, scope, req);
      };

      if (req.readyState == 4) {
        return req;
      }

      req.send(postData);
      return req;
    }
  };
  /*\
   * Snap.load
   [ method ]
   **
   * Loads external SVG file as a @Fragment (see @Snap.ajax for more advanced AJAX)
   **
   - url (string) URL
   - callback (function) callback
   - scope (object) #optional scope of callback
  \*/


  Snap.load = function (url, callback, scope) {
    Snap.ajax(url, function (req) {
      var f = Snap.parse(req.responseText);
      scope ? callback.call(scope, f) : callback(f);
    });
  };

  var getOffset = function getOffset(elem) {
    var box = elem.getBoundingClientRect(),
        doc = elem.ownerDocument,
        body = doc.body,
        docElem = doc.documentElement,
        clientTop = docElem.clientTop || body.clientTop || 0,
        clientLeft = docElem.clientLeft || body.clientLeft || 0,
        top = box.top + (g.win.pageYOffset || docElem.scrollTop || body.scrollTop) - clientTop,
        left = box.left + (g.win.pageXOffset || docElem.scrollLeft || body.scrollLeft) - clientLeft;
    return {
      y: top,
      x: left
    };
  };
  /*\
   * Snap.getElementByPoint
   [ method ]
   **
   * Returns you topmost element under given point.
   **
   = (object) Snap element object
   - x (number) x coordinate from the top left corner of the window
   - y (number) y coordinate from the top left corner of the window
   > Usage
   | Snap.getElementByPoint(mouseX, mouseY).attr({stroke: "#f00"});
  \*/


  Snap.getElementByPoint = function (x, y) {
    var paper = this,
        svg = paper.canvas,
        target = glob.doc.elementFromPoint(x, y);

    if (glob.win.opera && target.tagName == "svg") {
      var so = getOffset(target),
          sr = target.createSVGRect();
      sr.x = x - so.x;
      sr.y = y - so.y;
      sr.width = sr.height = 1;
      var hits = target.getIntersectionList(sr, null);

      if (hits.length) {
        target = hits[hits.length - 1];
      }
    }

    if (!target) {
      return null;
    }

    return wrap(target);
  };
  /*\
   * Snap.plugin
   [ method ]
   **
   * Let you write plugins. You pass in a function with five arguments, like this:
   | Snap.plugin(function (Snap, Element, Paper, global, Fragment) {
   |     Snap.newmethod = function () {};
   |     Element.prototype.newmethod = function () {};
   |     Paper.prototype.newmethod = function () {};
   | });
   * Inside the function you have access to all main objects (and their
   * prototypes). This allow you to extend anything you want.
   **
   - f (function) your plugin body
  \*/


  Snap.plugin = function (f) {
    f(Snap, Element, Paper, glob, Fragment);
  };

  glob.win.Snap = Snap;
  return Snap;
}(window || undefined); // Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


snap_svg_Snap.plugin(function (Snap, Element, Paper, glob, Fragment) {
  var elproto = Element.prototype,
      is = Snap.is,
      Str = String,
      unit2px = Snap._unit2px,
      $ = Snap._.$,
      make = Snap._.make,
      getSomeDefs = Snap._.getSomeDefs,
      has = "hasOwnProperty",
      wrap = Snap._.wrap;
  /*\
   * Element.getBBox
   [ method ]
   **
   * Returns the bounding box descriptor for the given element
   **
   = (object) bounding box descriptor:
   o {
   o     cx: (number) x of the center,
   o     cy: (number) x of the center,
   o     h: (number) height,
   o     height: (number) height,
   o     path: (string) path command for the box,
   o     r0: (number) radius of a circle that fully encloses the box,
   o     r1: (number) radius of the smallest circle that can be enclosed,
   o     r2: (number) radius of the largest circle that can be enclosed,
   o     vb: (string) box as a viewbox command,
   o     w: (number) width,
   o     width: (number) width,
   o     x2: (number) x of the right side,
   o     x: (number) x of the left side,
   o     y2: (number) y of the bottom edge,
   o     y: (number) y of the top edge
   o }
  \*/

  elproto.getBBox = function (isWithoutTransform) {
    if (this.type == "tspan") {
      return Snap._.box(this.node.getClientRects().item(0));
    }

    if (!Snap.Matrix || !Snap.path) {
      return this.node.getBBox();
    }

    var el = this,
        m = new Snap.Matrix();

    if (el.removed) {
      return Snap._.box();
    }

    while (el.type == "use") {
      if (!isWithoutTransform) {
        m = m.add(el.transform().localMatrix.translate(el.attr("x") || 0, el.attr("y") || 0));
      }

      if (el.original) {
        el = el.original;
      } else {
        var href = el.attr("xlink:href");
        el = el.original = el.node.ownerDocument.getElementById(href.substring(href.indexOf("#") + 1));
      }
    }

    var _ = el._,
        pathfinder = Snap.path.get[el.type] || Snap.path.get.deflt;

    try {
      if (isWithoutTransform) {
        _.bboxwt = pathfinder ? Snap.path.getBBox(el.realPath = pathfinder(el)) : Snap._.box(el.node.getBBox());
        return Snap._.box(_.bboxwt);
      } else {
        el.realPath = pathfinder(el);
        el.matrix = el.transform().localMatrix;
        _.bbox = Snap.path.getBBox(Snap.path.map(el.realPath, m.add(el.matrix)));
        return Snap._.box(_.bbox);
      }
    } catch (e) {
      // Firefox doesn’t give you bbox of hidden element
      return Snap._.box();
    }
  };

  var propString = function propString() {
    return this.string;
  };

  function extractTransform(el, tstr) {
    if (tstr == null) {
      var doReturn = true;

      if (el.type == "linearGradient" || el.type == "radialGradient") {
        tstr = el.node.getAttribute("gradientTransform");
      } else if (el.type == "pattern") {
        tstr = el.node.getAttribute("patternTransform");
      } else {
        tstr = el.node.getAttribute("transform");
      }

      if (!tstr) {
        return new Snap.Matrix();
      }

      tstr = Snap._.svgTransform2string(tstr);
    } else {
      if (!Snap._.rgTransform.test(tstr)) {
        tstr = Snap._.svgTransform2string(tstr);
      } else {
        tstr = Str(tstr).replace(/\.{3}|\u2026/g, el._.transform || "");
      }

      if (is(tstr, "array")) {
        tstr = Snap.path ? Snap.path.toString.call(tstr) : Str(tstr);
      }

      el._.transform = tstr;
    }

    var m = Snap._.transform2matrix(tstr, el.getBBox(1));

    if (doReturn) {
      return m;
    } else {
      el.matrix = m;
    }
  }
  /*\
   * Element.transform
   [ method ]
   **
   * Gets or sets transformation of the element
   **
   - tstr (string) transform string in Snap or SVG format
   = (Element) the current element
   * or
   = (object) transformation descriptor:
   o {
   o     string (string) transform string,
   o     globalMatrix (Matrix) matrix of all transformations applied to element or its parents,
   o     localMatrix (Matrix) matrix of transformations applied only to the element,
   o     diffMatrix (Matrix) matrix of difference between global and local transformations,
   o     global (string) global transformation as string,
   o     local (string) local transformation as string,
   o     toString (function) returns `string` property
   o }
  \*/


  elproto.transform = function (tstr) {
    var _ = this._;

    if (tstr == null) {
      var papa = this,
          global = new Snap.Matrix(this.node.getCTM()),
          local = extractTransform(this),
          ms = [local],
          m = new Snap.Matrix(),
          i,
          localString = local.toTransformString(),
          string = Str(local) == Str(this.matrix) ? Str(_.transform) : localString;

      while (papa.type != "svg" && (papa = papa.parent())) {
        ms.push(extractTransform(papa));
      }

      i = ms.length;

      while (i--) {
        m.add(ms[i]);
      }

      return {
        string: string,
        globalMatrix: global,
        totalMatrix: m,
        localMatrix: local,
        diffMatrix: global.clone().add(local.invert()),
        global: global.toTransformString(),
        total: m.toTransformString(),
        local: localString,
        toString: propString
      };
    }

    if (tstr instanceof Snap.Matrix) {
      this.matrix = tstr;
      this._.transform = tstr.toTransformString();
    } else {
      extractTransform(this, tstr);
    }

    if (this.node) {
      if (this.type == "linearGradient" || this.type == "radialGradient") {
        $(this.node, {
          gradientTransform: this.matrix
        });
      } else if (this.type == "pattern") {
        $(this.node, {
          patternTransform: this.matrix
        });
      } else {
        $(this.node, {
          transform: this.matrix
        });
      }
    }

    return this;
  };
  /*\
   * Element.parent
   [ method ]
   **
   * Returns the element's parent
   **
   = (Element) the parent element
  \*/


  elproto.parent = function () {
    return wrap(this.node.parentNode);
  };
  /*\
   * Element.append
   [ method ]
   **
   * Appends the given element to current one
   **
   - el (Element|Set) element to append
   = (Element) the parent element
  \*/

  /*\
   * Element.add
   [ method ]
   **
   * See @Element.append
  \*/


  elproto.append = elproto.add = function (el) {
    if (el) {
      if (el.type == "set") {
        var it = this;
        el.forEach(function (el) {
          it.add(el);
        });
        return this;
      }

      el = wrap(el);
      this.node.appendChild(el.node);
      el.paper = this.paper;
    }

    return this;
  };
  /*\
   * Element.appendTo
   [ method ]
   **
   * Appends the current element to the given one
   **
   - el (Element) parent element to append to
   = (Element) the child element
  \*/


  elproto.appendTo = function (el) {
    if (el) {
      el = wrap(el);
      el.append(this);
    }

    return this;
  };
  /*\
   * Element.prepend
   [ method ]
   **
   * Prepends the given element to the current one
   **
   - el (Element) element to prepend
   = (Element) the parent element
  \*/


  elproto.prepend = function (el) {
    if (el) {
      if (el.type == "set") {
        var it = this,
            first;
        el.forEach(function (el) {
          if (first) {
            first.after(el);
          } else {
            it.prepend(el);
          }

          first = el;
        });
        return this;
      }

      el = wrap(el);
      var parent = el.parent();
      this.node.insertBefore(el.node, this.node.firstChild);
      this.add && this.add();
      el.paper = this.paper;
      this.parent() && this.parent().add();
      parent && parent.add();
    }

    return this;
  };
  /*\
   * Element.prependTo
   [ method ]
   **
   * Prepends the current element to the given one
   **
   - el (Element) parent element to prepend to
   = (Element) the child element
  \*/


  elproto.prependTo = function (el) {
    el = wrap(el);
    el.prepend(this);
    return this;
  };
  /*\
   * Element.before
   [ method ]
   **
   * Inserts given element before the current one
   **
   - el (Element) element to insert
   = (Element) the parent element
  \*/


  elproto.before = function (el) {
    if (el.type == "set") {
      var it = this;
      el.forEach(function (el) {
        var parent = el.parent();
        it.node.parentNode.insertBefore(el.node, it.node);
        parent && parent.add();
      });
      this.parent().add();
      return this;
    }

    el = wrap(el);
    var parent = el.parent();
    this.node.parentNode.insertBefore(el.node, this.node);
    this.parent() && this.parent().add();
    parent && parent.add();
    el.paper = this.paper;
    return this;
  };
  /*\
   * Element.after
   [ method ]
   **
   * Inserts given element after the current one
   **
   - el (Element) element to insert
   = (Element) the parent element
  \*/


  elproto.after = function (el) {
    el = wrap(el);
    var parent = el.parent();

    if (this.node.nextSibling) {
      this.node.parentNode.insertBefore(el.node, this.node.nextSibling);
    } else {
      this.node.parentNode.appendChild(el.node);
    }

    this.parent() && this.parent().add();
    parent && parent.add();
    el.paper = this.paper;
    return this;
  };
  /*\
   * Element.insertBefore
   [ method ]
   **
   * Inserts the element after the given one
   **
   - el (Element) element next to whom insert to
   = (Element) the parent element
  \*/


  elproto.insertBefore = function (el) {
    el = wrap(el);
    var parent = this.parent();
    el.node.parentNode.insertBefore(this.node, el.node);
    this.paper = el.paper;
    parent && parent.add();
    el.parent() && el.parent().add();
    return this;
  };
  /*\
   * Element.insertAfter
   [ method ]
   **
   * Inserts the element after the given one
   **
   - el (Element) element next to whom insert to
   = (Element) the parent element
  \*/


  elproto.insertAfter = function (el) {
    el = wrap(el);
    var parent = this.parent();
    el.node.parentNode.insertBefore(this.node, el.node.nextSibling);
    this.paper = el.paper;
    parent && parent.add();
    el.parent() && el.parent().add();
    return this;
  };
  /*\
   * Element.remove
   [ method ]
   **
   * Removes element from the DOM
   = (Element) the detached element
  \*/


  elproto.remove = function () {
    var parent = this.parent();
    this.node.parentNode && this.node.parentNode.removeChild(this.node);
    delete this.paper;
    this.removed = true;
    parent && parent.add();
    return this;
  };
  /*\
   * Element.select
   [ method ]
   **
   * Gathers the nested @Element matching the given set of CSS selectors
   **
   - query (string) CSS selector
   = (Element) result of query selection
  \*/


  elproto.select = function (query) {
    return wrap(this.node.querySelector(query));
  };
  /*\
   * Element.selectAll
   [ method ]
   **
   * Gathers nested @Element objects matching the given set of CSS selectors
   **
   - query (string) CSS selector
   = (Set|array) result of query selection
  \*/


  elproto.selectAll = function (query) {
    var nodelist = this.node.querySelectorAll(query),
        set = (Snap.set || Array)();

    for (var i = 0; i < nodelist.length; i++) {
      set.push(wrap(nodelist[i]));
    }

    return set;
  };
  /*\
   * Element.asPX
   [ method ]
   **
   * Returns given attribute of the element as a `px` value (not %, em, etc.)
   **
   - attr (string) attribute name
   - value (string) #optional attribute value
   = (Element) result of query selection
  \*/


  elproto.asPX = function (attr, value) {
    if (value == null) {
      value = this.attr(attr);
    } // 老子不兼容px以外的单位


    return parseInt(value.replace("px", "")); // return +unit2px(this, attr, value);
  }; // SIERRA Element.use(): I suggest adding a note about how to access the original element the returned <use> instantiates. It's a part of SVG with which ordinary web developers may be least familiar.

  /*\
   * Element.use
   [ method ]
   **
   * Creates a `<use>` element linked to the current element
   **
   = (Element) the `<use>` element
  \*/


  elproto.use = function () {
    var use,
        id = this.node.id;

    if (!id) {
      id = this.id;
      $(this.node, {
        id: id
      });
    }

    if (this.type == "linearGradient" || this.type == "radialGradient" || this.type == "pattern") {
      use = make(this.type, this.node.parentNode);
    } else {
      use = make("use", this.node.parentNode);
    }

    $(use.node, {
      "xlink:href": "#" + id
    });
    use.original = this;
    return use;
  };

  function fixids(el) {
    var els = el.selectAll("*"),
        it,
        url = /^\s*url\(("|'|)(.*)\1\)\s*$/,
        ids = [],
        uses = {};

    function urltest(it, name) {
      var val = $(it.node, name);
      val = val && val.match(url);
      val = val && val[2];

      if (val && val.charAt() == "#") {
        val = val.substring(1);
      } else {
        return;
      }

      if (val) {
        uses[val] = (uses[val] || []).concat(function (id) {
          var attr = {};
          attr[name] = Snap.url(id);
          $(it.node, attr);
        });
      }
    }

    function linktest(it) {
      var val = $(it.node, "xlink:href");

      if (val && val.charAt() == "#") {
        val = val.substring(1);
      } else {
        return;
      }

      if (val) {
        uses[val] = (uses[val] || []).concat(function (id) {
          it.attr("xlink:href", "#" + id);
        });
      }
    }

    for (var i = 0, ii = els.length; i < ii; i++) {
      it = els[i];
      urltest(it, "fill");
      urltest(it, "stroke");
      urltest(it, "filter");
      urltest(it, "mask");
      urltest(it, "clip-path");
      linktest(it);
      var oldid = $(it.node, "id");

      if (oldid) {
        $(it.node, {
          id: it.id
        });
        ids.push({
          old: oldid,
          id: it.id
        });
      }
    }

    for (i = 0, ii = ids.length; i < ii; i++) {
      var fs = uses[ids[i].old];

      if (fs) {
        for (var j = 0, jj = fs.length; j < jj; j++) {
          fs[j](ids[i].id);
        }
      }
    }
  }
  /*\
   * Element.clone
   [ method ]
   **
   * Creates a clone of the element and inserts it after the element
   **
   = (Element) the clone
  \*/


  elproto.clone = function () {
    var clone = wrap(this.node.cloneNode(true));

    if ($(clone.node, "id")) {
      $(clone.node, {
        id: clone.id
      });
    }

    fixids(clone);
    clone.insertAfter(this);
    return clone;
  };
  /*\
   * Element.toDefs
   [ method ]
   **
   * Moves element to the shared `<defs>` area
   **
   = (Element) the element
  \*/


  elproto.toDefs = function () {
    var defs = getSomeDefs(this);
    defs.appendChild(this.node);
    return this;
  };
  /*\
   * Element.toPattern
   [ method ]
   **
   * Creates a `<pattern>` element from the current element
   **
   * To create a pattern you have to specify the pattern rect:
   - x (string|number)
   - y (string|number)
   - width (string|number)
   - height (string|number)
   = (Element) the `<pattern>` element
   * You can use pattern later on as an argument for `fill` attribute:
   | var p = paper.path("M10-5-10,15M15,0,0,15M0-5-20,15").attr({
   |         fill: "none",
   |         stroke: "#bada55",
   |         strokeWidth: 5
   |     }).pattern(0, 0, 10, 10),
   |     c = paper.circle(200, 200, 100);
   | c.attr({
   |     fill: p
   | });
  \*/


  elproto.pattern = elproto.toPattern = function (x, y, width, height) {
    var p = make("pattern", getSomeDefs(this));

    if (x == null) {
      x = this.getBBox();
    }

    if (is(x, "object") && "x" in x) {
      y = x.y;
      width = x.width;
      height = x.height;
      x = x.x;
    }

    $(p.node, {
      x: x,
      y: y,
      width: width,
      height: height,
      patternUnits: "userSpaceOnUse",
      id: p.id,
      viewBox: [x, y, width, height].join(" ")
    });
    p.node.appendChild(this.node);
    return p;
  }; // SIERRA Element.marker(): clarify what a reference point is. E.g., helps you offset the object from its edge such as when centering it over a path.
  // SIERRA Element.marker(): I suggest the method should accept default reference point values.  Perhaps centered with (refX = width/2) and (refY = height/2)? Also, couldn't it assume the element's current _width_ and _height_? And please specify what _x_ and _y_ mean: offsets? If so, from where?  Couldn't they also be assigned default values?

  /*\
   * Element.marker
   [ method ]
   **
   * Creates a `<marker>` element from the current element
   **
   * To create a marker you have to specify the bounding rect and reference point:
   - x (number)
   - y (number)
   - width (number)
   - height (number)
   - refX (number)
   - refY (number)
   = (Element) the `<marker>` element
   * You can specify the marker later as an argument for `marker-start`, `marker-end`, `marker-mid`, and `marker` attributes. The `marker` attribute places the marker at every point along the path, and `marker-mid` places them at every point except the start and end.
  \*/
  // TODO add usage for markers


  elproto.marker = function (x, y, width, height, refX, refY) {
    var p = make("marker", getSomeDefs(this));

    if (x == null) {
      x = this.getBBox();
    }

    if (is(x, "object") && "x" in x) {
      y = x.y;
      width = x.width;
      height = x.height;
      refX = x.refX || x.cx;
      refY = x.refY || x.cy;
      x = x.x;
    }

    $(p.node, {
      viewBox: [x, y, width, height].join(" "),
      markerWidth: width,
      markerHeight: height,
      orient: "auto",
      refX: refX || 0,
      refY: refY || 0,
      id: p.id
    });
    p.node.appendChild(this.node);
    return p;
  };

  var eldata = {};
  /*\
   * Element.data
   [ method ]
   **
   * Adds or retrieves given value associated with given key. (Don’t confuse
   * with `data-` attributes)
   *
   * See also @Element.removeData
   - key (string) key to store data
   - value (any) #optional value to store
   = (object) @Element
   * or, if value is not specified:
   = (any) value
   > Usage
   | for (var i = 0, i < 5, i++) {
   |     paper.circle(10 + 15 * i, 10, 10)
   |          .attr({fill: "#000"})
   |          .data("i", i)
   |          .click(function () {
   |             alert(this.data("i"));
   |          });
   | }
  \*/

  elproto.data = function (key, value) {
    var data = eldata[this.id] = eldata[this.id] || {};

    if (arguments.length == 0) {
      eve_default()("snap.data.get." + this.id, this, data, null);
      return data;
    }

    if (arguments.length == 1) {
      if (Snap.is(key, "object")) {
        for (var i in key) {
          if (key[has](i)) {
            this.data(i, key[i]);
          }
        }

        return this;
      }

      eve_default()("snap.data.get." + this.id, this, data[key], key);
      return data[key];
    }

    data[key] = value;
    eve_default()("snap.data.set." + this.id, this, value, key);
    return this;
  };
  /*\
   * Element.removeData
   [ method ]
   **
   * Removes value associated with an element by given key.
   * If key is not provided, removes all the data of the element.
   - key (string) #optional key
   = (object) @Element
  \*/


  elproto.removeData = function (key) {
    if (key == null) {
      eldata[this.id] = {};
    } else {
      eldata[this.id] && delete eldata[this.id][key];
    }

    return this;
  };
  /*\
   * Element.outerSVG
   [ method ]
   **
   * Returns SVG code for the element, equivalent to HTML's `outerHTML`.
   *
   * See also @Element.innerSVG
   = (string) SVG code for the element
  \*/

  /*\
   * Element.toString
   [ method ]
   **
   * See @Element.outerSVG
  \*/


  elproto.outerSVG = elproto.toString = toString(1);
  /*\
   * Element.innerSVG
   [ method ]
   **
   * Returns SVG code for the element's contents, equivalent to HTML's `innerHTML`
   = (string) SVG code for the element
  \*/

  elproto.innerSVG = toString();

  function toString(type) {
    return function () {
      var res = type ? "<" + this.type : "",
          attr = this.node.attributes,
          chld = this.node.childNodes;

      if (type) {
        for (var i = 0, ii = attr.length; i < ii; i++) {
          res += " " + attr[i].name + '="' + attr[i].value.replace(/"/g, '\\"') + '"';
        }
      }

      if (chld.length) {
        type && (res += ">");

        for (i = 0, ii = chld.length; i < ii; i++) {
          if (chld[i].nodeType == 3) {
            res += chld[i].nodeValue;
          } else if (chld[i].nodeType == 1) {
            res += wrap(chld[i]).toString();
          }
        }

        type && (res += "</" + this.type + ">");
      } else {
        type && (res += "/>");
      }

      return res;
    };
  }

  elproto.toDataURL = function () {
    if (window && window.btoa) {
      var bb = this.getBBox(),
          svg = Snap.format('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{width}" height="{height}" viewBox="{x} {y} {width} {height}">{contents}</svg>', {
        x: +bb.x.toFixed(3),
        y: +bb.y.toFixed(3),
        width: +bb.width.toFixed(3),
        height: +bb.height.toFixed(3),
        contents: this.outerSVG()
      });
      return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
    }
  };
  /*\
   * Fragment.select
   [ method ]
   **
   * See @Element.select
  \*/


  Fragment.prototype.select = elproto.select;
  /*\
   * Fragment.selectAll
   [ method ]
   **
   * See @Element.selectAll
  \*/

  Fragment.prototype.selectAll = elproto.selectAll;
}); // Copyright (c) 2016 Adobe Systems Incorporated. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

snap_svg_Snap.plugin(function (Snap, Element, Paper, glob, Fragment) {
  var elproto = Element.prototype,
      is = Snap.is,
      Str = String,
      has = "hasOwnProperty";

  function slice(from, to, f) {
    return function (arr) {
      var res = arr.slice(from, to);

      if (res.length == 1) {
        res = res[0];
      }

      return f ? f(res) : res;
    };
  }

  var Animation = function Animation(attr, ms, easing, callback) {
    if (typeof easing == "function" && !easing.length) {
      callback = easing;
      easing = Snap_mina.linear;
    }

    this.attr = attr;
    this.dur = ms;
    easing && (this.easing = easing);
    callback && (this.callback = callback);
  };

  Snap._.Animation = Animation;
  /*\
   * Snap.animation
   [ method ]
   **
   * Creates an animation object
   **
   - attr (object) attributes of final destination
   - duration (number) duration of the animation, in milliseconds
   - easing (function) #optional one of easing functions of @mina or custom one
   - callback (function) #optional callback function that fires when animation ends
   = (object) animation object
  \*/

  Snap.animation = function (attr, ms, easing, callback) {
    return new Animation(attr, ms, easing, callback);
  };
  /*\
   * Element.inAnim
   [ method ]
   **
   * Returns a set of animations that may be able to manipulate the current element
   **
   = (object) in format:
   o {
   o     anim (object) animation object,
   o     mina (object) @mina object,
   o     curStatus (number) 0..1 — status of the animation: 0 — just started, 1 — just finished,
   o     status (function) gets or sets the status of the animation,
   o     stop (function) stops the animation
   o }
  \*/


  elproto.inAnim = function () {
    var el = this,
        res = [];

    for (var id in el.anims) {
      if (el.anims[has](id)) {
        (function (a) {
          res.push({
            anim: new Animation(a._attrs, a.dur, a.easing, a._callback),
            mina: a,
            curStatus: a.status(),
            status: function status(val) {
              return a.status(val);
            },
            stop: function stop() {
              a.stop();
            }
          });
        })(el.anims[id]);
      }
    }

    return res;
  };
  /*\
   * Snap.animate
   [ method ]
   **
   * Runs generic animation of one number into another with a caring function
   **
   - from (number|array) number or array of numbers
   - to (number|array) number or array of numbers
   - setter (function) caring function that accepts one number argument
   - duration (number) duration, in milliseconds
   - easing (function) #optional easing function from @mina or custom
   - callback (function) #optional callback function to execute when animation ends
   = (object) animation object in @mina format
   o {
   o     id (string) animation id, consider it read-only,
   o     duration (function) gets or sets the duration of the animation,
   o     easing (function) easing,
   o     speed (function) gets or sets the speed of the animation,
   o     status (function) gets or sets the status of the animation,
   o     stop (function) stops the animation
   o }
   | var rect = Snap().rect(0, 0, 10, 10);
   | Snap.animate(0, 10, function (val) {
   |     rect.attr({
   |         x: val
   |     });
   | }, 1000);
   | // in given context is equivalent to
   | rect.animate({x: 10}, 1000);
  \*/


  Snap.animate = function (from, to, setter, ms, easing, callback) {
    if (typeof easing == "function" && !easing.length) {
      callback = easing;
      easing = Snap_mina.linear;
    }

    var now = Snap_mina.time(),
        anim = Snap_mina(from, to, now, now + ms, Snap_mina.time, setter, easing);
    callback && eve_default.a.once("mina.finish." + anim.id, callback);
    return anim;
  };
  /*\
   * Element.stop
   [ method ]
   **
   * Stops all the animations for the current element
   **
   = (Element) the current element
  \*/


  elproto.stop = function () {
    var anims = this.inAnim();

    for (var i = 0, ii = anims.length; i < ii; i++) {
      anims[i].stop();
    }

    return this;
  };
  /*\
   * Element.animate
   [ method ]
   **
   * Animates the given attributes of the element
   **
   - attrs (object) key-value pairs of destination attributes
   - duration (number) duration of the animation in milliseconds
   - easing (function) #optional easing function from @mina or custom
   - callback (function) #optional callback function that executes when the animation ends
   = (Element) the current element
  \*/


  elproto.animate = function (attrs, ms, easing, callback) {
    if (typeof easing == "function" && !easing.length) {
      callback = easing;
      easing = Snap_mina.linear;
    }

    if (attrs instanceof Animation) {
      callback = attrs.callback;
      easing = attrs.easing;
      ms = attrs.dur;
      attrs = attrs.attr;
    }

    var fkeys = [],
        tkeys = [],
        keys = {},
        from,
        to,
        f,
        eq,
        el = this;

    for (var key in attrs) {
      if (attrs[has](key)) {
        if (el.equal) {
          eq = el.equal(key, Str(attrs[key]));
          from = eq.from;
          to = eq.to;
          f = eq.f;
        } else {
          from = +el.attr(key);
          to = +attrs[key];
        }

        var len = is(from, "array") ? from.length : 1;
        keys[key] = slice(fkeys.length, fkeys.length + len, f);
        fkeys = fkeys.concat(from);
        tkeys = tkeys.concat(to);
      }
    }

    var now = Snap_mina.time(),
        anim = Snap_mina(fkeys, tkeys, now, now + ms, Snap_mina.time, function (val) {
      var attr = {};

      for (var key in keys) {
        if (keys[has](key)) {
          attr[key] = keys[key](val);
        }
      }

      el.attr(attr);
    }, easing);
    el.anims[anim.id] = anim;
    anim._attrs = attrs;
    anim._callback = callback;
    eve_default()("snap.animcreated." + el.id, anim);
    eve_default.a.once("mina.finish." + anim.id, function () {
      eve_default.a.off("mina.*." + anim.id);
      delete el.anims[anim.id];
      callback && callback.call(el);
    });
    eve_default.a.once("mina.stop." + anim.id, function () {
      eve_default.a.off("mina.*." + anim.id);
      delete el.anims[anim.id];
    });
    return el;
  };
}); // Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

snap_svg_Snap.plugin(function (Snap, Element, Paper, glob, Fragment) {
  var objectToString = Object.prototype.toString,
      Str = String,
      math = Math,
      E = "";

  function Matrix(a, b, c, d, e, f) {
    if (b == null && objectToString.call(a) == "[object SVGMatrix]") {
      this.a = a.a;
      this.b = a.b;
      this.c = a.c;
      this.d = a.d;
      this.e = a.e;
      this.f = a.f;
      return;
    }

    if (a != null) {
      this.a = +a;
      this.b = +b;
      this.c = +c;
      this.d = +d;
      this.e = +e;
      this.f = +f;
    } else {
      this.a = 1;
      this.b = 0;
      this.c = 0;
      this.d = 1;
      this.e = 0;
      this.f = 0;
    }
  }

  (function (matrixproto) {
    /*\
     * Matrix.add
     [ method ]
     **
     * Adds the given matrix to existing one
     - a (number)
     - b (number)
     - c (number)
     - d (number)
     - e (number)
     - f (number)
     * or
     - matrix (object) @Matrix
    \*/
    matrixproto.add = function (a, b, c, d, e, f) {
      if (a && a instanceof Matrix) {
        return this.add(a.a, a.b, a.c, a.d, a.e, a.f);
      }

      var aNew = a * this.a + b * this.c,
          bNew = a * this.b + b * this.d;
      this.e += e * this.a + f * this.c;
      this.f += e * this.b + f * this.d;
      this.c = c * this.a + d * this.c;
      this.d = c * this.b + d * this.d;
      this.a = aNew;
      this.b = bNew;
      return this;
    };
    /*\
     * Matrix.multLeft
     [ method ]
     **
     * Multiplies a passed affine transform to the left: M * this.
     - a (number)
     - b (number)
     - c (number)
     - d (number)
     - e (number)
     - f (number)
     * or
     - matrix (object) @Matrix
    \*/


    Matrix.prototype.multLeft = function (a, b, c, d, e, f) {
      if (a && a instanceof Matrix) {
        return this.multLeft(a.a, a.b, a.c, a.d, a.e, a.f);
      }

      var aNew = a * this.a + c * this.b,
          cNew = a * this.c + c * this.d,
          eNew = a * this.e + c * this.f + e;
      this.b = b * this.a + d * this.b;
      this.d = b * this.c + d * this.d;
      this.f = b * this.e + d * this.f + f;
      this.a = aNew;
      this.c = cNew;
      this.e = eNew;
      return this;
    };
    /*\
     * Matrix.invert
     [ method ]
     **
     * Returns an inverted version of the matrix
     = (object) @Matrix
    \*/


    matrixproto.invert = function () {
      var me = this,
          x = me.a * me.d - me.b * me.c;
      return new Matrix(me.d / x, -me.b / x, -me.c / x, me.a / x, (me.c * me.f - me.d * me.e) / x, (me.b * me.e - me.a * me.f) / x);
    };
    /*\
     * Matrix.clone
     [ method ]
     **
     * Returns a copy of the matrix
     = (object) @Matrix
    \*/


    matrixproto.clone = function () {
      return new Matrix(this.a, this.b, this.c, this.d, this.e, this.f);
    };
    /*\
     * Matrix.translate
     [ method ]
     **
     * Translate the matrix
     - x (number) horizontal offset distance
     - y (number) vertical offset distance
    \*/


    matrixproto.translate = function (x, y) {
      this.e += x * this.a + y * this.c;
      this.f += x * this.b + y * this.d;
      return this;
    };
    /*\
     * Matrix.scale
     [ method ]
     **
     * Scales the matrix
     - x (number) amount to be scaled, with `1` resulting in no change
     - y (number) #optional amount to scale along the vertical axis. (Otherwise `x` applies to both axes.)
     - cx (number) #optional horizontal origin point from which to scale
     - cy (number) #optional vertical origin point from which to scale
     * Default cx, cy is the middle point of the element.
    \*/


    matrixproto.scale = function (x, y, cx, cy) {
      y == null && (y = x);
      (cx || cy) && this.translate(cx, cy);
      this.a *= x;
      this.b *= x;
      this.c *= y;
      this.d *= y;
      (cx || cy) && this.translate(-cx, -cy);
      return this;
    };
    /*\
     * Matrix.rotate
     [ method ]
     **
     * Rotates the matrix
     - a (number) angle of rotation, in degrees
     - x (number) horizontal origin point from which to rotate
     - y (number) vertical origin point from which to rotate
    \*/


    matrixproto.rotate = function (a, x, y) {
      a = Snap.rad(a);
      x = x || 0;
      y = y || 0;
      var cos = +math.cos(a).toFixed(9),
          sin = +math.sin(a).toFixed(9);
      this.add(cos, sin, -sin, cos, x, y);
      return this.add(1, 0, 0, 1, -x, -y);
    };
    /*\
     * Matrix.skewX
     [ method ]
     **
     * Skews the matrix along the x-axis
     - x (number) Angle to skew along the x-axis (in degrees).
    \*/


    matrixproto.skewX = function (x) {
      return this.skew(x, 0);
    };
    /*\
     * Matrix.skewY
     [ method ]
     **
     * Skews the matrix along the y-axis
     - y (number) Angle to skew along the y-axis (in degrees).
    \*/


    matrixproto.skewY = function (y) {
      return this.skew(0, y);
    };
    /*\
     * Matrix.skew
     [ method ]
     **
     * Skews the matrix
     - y (number) Angle to skew along the y-axis (in degrees).
     - x (number) Angle to skew along the x-axis (in degrees).
    \*/


    matrixproto.skew = function (x, y) {
      x = x || 0;
      y = y || 0;
      x = Snap.rad(x);
      y = Snap.rad(y);
      var c = math.tan(x).toFixed(9);
      var b = math.tan(y).toFixed(9);
      return this.add(1, b, c, 1, 0, 0);
    };
    /*\
     * Matrix.x
     [ method ]
     **
     * Returns x coordinate for given point after transformation described by the matrix. See also @Matrix.y
     - x (number)
     - y (number)
     = (number) x
    \*/


    matrixproto.x = function (x, y) {
      return x * this.a + y * this.c + this.e;
    };
    /*\
     * Matrix.y
     [ method ]
     **
     * Returns y coordinate for given point after transformation described by the matrix. See also @Matrix.x
     - x (number)
     - y (number)
     = (number) y
    \*/


    matrixproto.y = function (x, y) {
      return x * this.b + y * this.d + this.f;
    };

    matrixproto.get = function (i) {
      return +this[Str.fromCharCode(97 + i)].toFixed(4);
    };

    matrixproto.toString = function () {
      return "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")";
    };

    matrixproto.offset = function () {
      return [this.e.toFixed(4), this.f.toFixed(4)];
    };

    function norm(a) {
      return a[0] * a[0] + a[1] * a[1];
    }

    function normalize(a) {
      var mag = math.sqrt(norm(a));
      a[0] && (a[0] /= mag);
      a[1] && (a[1] /= mag);
    }
    /*\
     * Matrix.determinant
     [ method ]
     **
     * Finds determinant of the given matrix.
     = (number) determinant
    \*/


    matrixproto.determinant = function () {
      return this.a * this.d - this.b * this.c;
    };
    /*\
     * Matrix.split
     [ method ]
     **
     * Splits matrix into primitive transformations
     = (object) in format:
     o dx (number) translation by x
     o dy (number) translation by y
     o scalex (number) scale by x
     o scaley (number) scale by y
     o shear (number) shear
     o rotate (number) rotation in deg
     o isSimple (boolean) could it be represented via simple transformations
    \*/


    matrixproto.split = function () {
      var out = {}; // translation

      out.dx = this.e;
      out.dy = this.f; // scale and shear

      var row = [[this.a, this.b], [this.c, this.d]];
      out.scalex = math.sqrt(norm(row[0]));
      normalize(row[0]);
      out.shear = row[0][0] * row[1][0] + row[0][1] * row[1][1];
      row[1] = [row[1][0] - row[0][0] * out.shear, row[1][1] - row[0][1] * out.shear];
      out.scaley = math.sqrt(norm(row[1]));
      normalize(row[1]);
      out.shear /= out.scaley;

      if (this.determinant() < 0) {
        out.scalex = -out.scalex;
      } // rotation


      var sin = row[0][1],
          cos = row[1][1];

      if (cos < 0) {
        out.rotate = Snap.deg(math.acos(cos));

        if (sin < 0) {
          out.rotate = 360 - out.rotate;
        }
      } else {
        out.rotate = Snap.deg(math.asin(sin));
      }

      out.isSimple = !+out.shear.toFixed(9) && (out.scalex.toFixed(9) == out.scaley.toFixed(9) || !out.rotate);
      out.isSuperSimple = !+out.shear.toFixed(9) && out.scalex.toFixed(9) == out.scaley.toFixed(9) && !out.rotate;
      out.noRotation = !+out.shear.toFixed(9) && !out.rotate;
      return out;
    };
    /*\
     * Matrix.toTransformString
     [ method ]
     **
     * Returns transform string that represents given matrix
     = (string) transform string
    \*/


    matrixproto.toTransformString = function (shorter) {
      var s = shorter || this.split();

      if (!+s.shear.toFixed(9)) {
        s.scalex = +s.scalex.toFixed(4);
        s.scaley = +s.scaley.toFixed(4);
        s.rotate = +s.rotate.toFixed(4);
        return (s.dx || s.dy ? "t" + [+s.dx.toFixed(4), +s.dy.toFixed(4)] : E) + (s.rotate ? "r" + [+s.rotate.toFixed(4), 0, 0] : E) + (s.scalex != 1 || s.scaley != 1 ? "s" + [s.scalex, s.scaley, 0, 0] : E);
      } else {
        return "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)];
      }
    };
  })(Matrix.prototype);
  /*\
   * Snap.Matrix
   [ method ]
   **
   * Matrix constructor, extend on your own risk.
   * To create matrices use @Snap.matrix.
  \*/


  Snap.Matrix = Matrix;
  /*\
   * Snap.matrix
   [ method ]
   **
   * Utility method
   **
   * Returns a matrix based on the given parameters
   - a (number)
   - b (number)
   - c (number)
   - d (number)
   - e (number)
   - f (number)
   * or
   - svgMatrix (SVGMatrix)
   = (object) @Matrix
  \*/

  Snap.matrix = function (a, b, c, d, e, f) {
    return new Matrix(a, b, c, d, e, f);
  };
}); // Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

snap_svg_Snap.plugin(function (Snap, Element, Paper, glob, Fragment) {
  var has = "hasOwnProperty",
      make = Snap._.make,
      wrap = Snap._.wrap,
      is = Snap.is,
      getSomeDefs = Snap._.getSomeDefs,
      reURLValue = /^url\((['"]?)([^)]+)\1\)$/,
      $ = Snap._.$,
      URL = Snap.url,
      Str = String,
      separator = Snap._.separator,
      E = "";
  /*\
   * Snap.deurl
   [ method ]
   **
   * Unwraps path from `"url(<path>)"`.
   - value (string) url path
   = (string) unwrapped path
  \*/

  Snap.deurl = function (value) {
    var res = String(value).match(reURLValue);
    return res ? res[2] : value;
  }; // Attributes event handlers


  eve_default.a.on("snap.util.attr.mask", function (value) {
    if (value instanceof Element || value instanceof Fragment) {
      eve_default.a.stop();

      if (value instanceof Fragment && value.node.childNodes.length == 1) {
        value = value.node.firstChild;
        getSomeDefs(this).appendChild(value);
        value = wrap(value);
      }

      if (value.type == "mask") {
        var mask = value;
      } else {
        mask = make("mask", getSomeDefs(this));
        mask.node.appendChild(value.node);
      }

      !mask.node.id && $(mask.node, {
        id: mask.id
      });
      $(this.node, {
        mask: URL(mask.id)
      });
    }
  });

  (function (clipIt) {
    eve_default.a.on("snap.util.attr.clip", clipIt);
    eve_default.a.on("snap.util.attr.clip-path", clipIt);
    eve_default.a.on("snap.util.attr.clipPath", clipIt);
  })(function (value) {
    if (value instanceof Element || value instanceof Fragment) {
      eve_default.a.stop();
      var clip,
          node = value.node;

      while (node) {
        if (node.nodeName === "clipPath") {
          clip = new Element(node);
          break;
        }

        if (node.nodeName === "svg") {
          clip = undefined;
          break;
        }

        node = node.parentNode;
      }

      if (!clip) {
        clip = make("clipPath", getSomeDefs(this));
        clip.node.appendChild(value.node);
        !clip.node.id && $(clip.node, {
          id: clip.id
        });
      }

      $(this.node, {
        "clip-path": URL(clip.node.id || clip.id)
      });
    }
  });

  function fillStroke(name) {
    return function (value) {
      eve_default.a.stop();

      if (value instanceof Fragment && value.node.childNodes.length == 1 && (value.node.firstChild.tagName == "radialGradient" || value.node.firstChild.tagName == "linearGradient" || value.node.firstChild.tagName == "pattern")) {
        value = value.node.firstChild;
        getSomeDefs(this).appendChild(value);
        value = wrap(value);
      }

      if (value instanceof Element) {
        if (value.type == "radialGradient" || value.type == "linearGradient" || value.type == "pattern") {
          if (!value.node.id) {
            $(value.node, {
              id: value.id
            });
          }

          var fill = URL(value.node.id);
        } else {
          fill = value.attr(name);
        }
      } else {
        fill = Snap.color(value);

        if (fill.error) {
          var grad = Snap(getSomeDefs(this).ownerSVGElement).gradient(value);

          if (grad) {
            if (!grad.node.id) {
              $(grad.node, {
                id: grad.id
              });
            }

            fill = URL(grad.node.id);
          } else {
            fill = value;
          }
        } else {
          fill = Str(fill);
        }
      }

      var attrs = {};
      attrs[name] = fill;
      $(this.node, attrs);
      this.node.style[name] = E;
    };
  }

  eve_default.a.on("snap.util.attr.fill", fillStroke("fill"));
  eve_default.a.on("snap.util.attr.stroke", fillStroke("stroke"));
  var gradrg = /^([lr])(?:\(([^)]*)\))?(.*)$/i;
  eve_default.a.on("snap.util.grad.parse", function parseGrad(string) {
    string = Str(string);
    var tokens = string.match(gradrg);

    if (!tokens) {
      return null;
    }

    var type = tokens[1],
        params = tokens[2],
        stops = tokens[3];
    params = params.split(/\s*,\s*/).map(function (el) {
      return +el == el ? +el : el;
    });

    if (params.length == 1 && params[0] == 0) {
      params = [];
    }

    stops = stops.split("-");
    stops = stops.map(function (el) {
      el = el.split(":");
      var out = {
        color: el[0]
      };

      if (el[1]) {
        out.offset = parseFloat(el[1]);
      }

      return out;
    });
    var len = stops.length,
        start = 0,
        j = 0;

    function seed(i, end) {
      var step = (end - start) / (i - j);

      for (var k = j; k < i; k++) {
        stops[k].offset = +(+start + step * (k - j)).toFixed(2);
      }

      j = i;
      start = end;
    }

    len--;

    for (var i = 0; i < len; i++) {
      if ("offset" in stops[i]) {
        seed(i, stops[i].offset);
      }
    }

    stops[len].offset = stops[len].offset || 100;
    seed(len, stops[len].offset);
    return {
      type: type,
      params: params,
      stops: stops
    };
  });
  eve_default.a.on("snap.util.attr.d", function (value) {
    eve_default.a.stop();

    if (is(value, "array") && is(value[0], "array")) {
      value = Snap.path.toString.call(value);
    }

    value = Str(value);

    if (value.match(/[ruo]/i)) {
      value = Snap.path.toAbsolute(value);
    }

    $(this.node, {
      d: value
    });
  })(-1);
  eve_default.a.on("snap.util.attr.#text", function (value) {
    eve_default.a.stop();
    value = Str(value);
    var txt = glob.doc.createTextNode(value);

    while (this.node.firstChild) {
      this.node.removeChild(this.node.firstChild);
    }

    this.node.appendChild(txt);
  })(-1);
  eve_default.a.on("snap.util.attr.path", function (value) {
    eve_default.a.stop();
    this.attr({
      d: value
    });
  })(-1);
  eve_default.a.on("snap.util.attr.class", function (value) {
    eve_default.a.stop();
    this.node.className.baseVal = value;
  })(-1);
  eve_default.a.on("snap.util.attr.viewBox", function (value) {
    var vb;

    if (is(value, "object") && "x" in value) {
      vb = [value.x, value.y, value.width, value.height].join(" ");
    } else if (is(value, "array")) {
      vb = value.join(" ");
    } else {
      vb = value;
    }

    $(this.node, {
      viewBox: vb
    });
    eve_default.a.stop();
  })(-1);
  eve_default.a.on("snap.util.attr.transform", function (value) {
    this.transform(value);
    eve_default.a.stop();
  })(-1);
  eve_default.a.on("snap.util.attr.r", function (value) {
    if (this.type == "rect") {
      eve_default.a.stop();
      $(this.node, {
        rx: value,
        ry: value
      });
    }
  })(-1);
  eve_default.a.on("snap.util.attr.textpath", function (value) {
    eve_default.a.stop();

    if (this.type == "text") {
      var id, tp, node;

      if (!value && this.textPath) {
        tp = this.textPath;

        while (tp.node.firstChild) {
          this.node.appendChild(tp.node.firstChild);
        }

        tp.remove();
        delete this.textPath;
        return;
      }

      if (is(value, "string")) {
        var defs = getSomeDefs(this),
            path = wrap(defs.parentNode).path(value);
        defs.appendChild(path.node);
        id = path.id;
        path.attr({
          id: id
        });
      } else {
        value = wrap(value);

        if (value instanceof Element) {
          id = value.attr("id");

          if (!id) {
            id = value.id;
            value.attr({
              id: id
            });
          }
        }
      }

      if (id) {
        tp = this.textPath;
        node = this.node;

        if (tp) {
          tp.attr({
            "xlink:href": "#" + id
          });
        } else {
          tp = $("textPath", {
            "xlink:href": "#" + id
          });

          while (node.firstChild) {
            tp.appendChild(node.firstChild);
          }

          node.appendChild(tp);
          this.textPath = wrap(tp);
        }
      }
    }
  })(-1);
  eve_default.a.on("snap.util.attr.text", function (value) {
    if (this.type == "text") {
      var i = 0,
          node = this.node,
          tuner = function tuner(chunk) {
        var out = $("tspan");

        if (is(chunk, "array")) {
          for (var i = 0; i < chunk.length; i++) {
            out.appendChild(tuner(chunk[i]));
          }
        } else {
          out.appendChild(glob.doc.createTextNode(chunk));
        }

        out.normalize && out.normalize();
        return out;
      };

      while (node.firstChild) {
        node.removeChild(node.firstChild);
      }

      var tuned = tuner(value);

      while (tuned.firstChild) {
        node.appendChild(tuned.firstChild);
      }
    }

    eve_default.a.stop();
  })(-1);

  function setFontSize(value) {
    eve_default.a.stop();

    if (value == +value) {
      value += "px";
    }

    this.node.style.fontSize = value;
  }

  eve_default.a.on("snap.util.attr.fontSize", setFontSize)(-1);
  eve_default.a.on("snap.util.attr.font-size", setFontSize)(-1);
  eve_default.a.on("snap.util.getattr.transform", function () {
    eve_default.a.stop();
    return this.transform();
  })(-1);
  eve_default.a.on("snap.util.getattr.textpath", function () {
    eve_default.a.stop();
    return this.textPath;
  })(-1); // Markers

  (function () {
    function getter(end) {
      return function () {
        eve_default.a.stop();
        var style = glob.doc.defaultView.getComputedStyle(this.node, null).getPropertyValue("marker-" + end);

        if (style == "none") {
          return style;
        } else {
          return Snap(glob.doc.getElementById(style.match(reURLValue)[1]));
        }
      };
    }

    function setter(end) {
      return function (value) {
        eve_default.a.stop();
        var name = "marker" + end.charAt(0).toUpperCase() + end.substring(1);

        if (value == "" || !value) {
          this.node.style[name] = "none";
          return;
        }

        if (value.type == "marker") {
          var id = value.node.id;

          if (!id) {
            $(value.node, {
              id: value.id
            });
          }

          this.node.style[name] = URL(id);
          return;
        }
      };
    }

    eve_default.a.on("snap.util.getattr.marker-end", getter("end"))(-1);
    eve_default.a.on("snap.util.getattr.markerEnd", getter("end"))(-1);
    eve_default.a.on("snap.util.getattr.marker-start", getter("start"))(-1);
    eve_default.a.on("snap.util.getattr.markerStart", getter("start"))(-1);
    eve_default.a.on("snap.util.getattr.marker-mid", getter("mid"))(-1);
    eve_default.a.on("snap.util.getattr.markerMid", getter("mid"))(-1);
    eve_default.a.on("snap.util.attr.marker-end", setter("end"))(-1);
    eve_default.a.on("snap.util.attr.markerEnd", setter("end"))(-1);
    eve_default.a.on("snap.util.attr.marker-start", setter("start"))(-1);
    eve_default.a.on("snap.util.attr.markerStart", setter("start"))(-1);
    eve_default.a.on("snap.util.attr.marker-mid", setter("mid"))(-1);
    eve_default.a.on("snap.util.attr.markerMid", setter("mid"))(-1);
  })();

  eve_default.a.on("snap.util.getattr.r", function () {
    if (this.type == "rect" && $(this.node, "rx") == $(this.node, "ry")) {
      eve_default.a.stop();
      return $(this.node, "rx");
    }
  })(-1);

  function textExtract(node) {
    var out = [];
    var children = node.childNodes;

    for (var i = 0, ii = children.length; i < ii; i++) {
      var chi = children[i];

      if (chi.nodeType == 3) {
        out.push(chi.nodeValue);
      }

      if (chi.tagName == "tspan") {
        if (chi.childNodes.length == 1 && chi.firstChild.nodeType == 3) {
          out.push(chi.firstChild.nodeValue);
        } else {
          out.push(textExtract(chi));
        }
      }
    }

    return out;
  }

  eve_default.a.on("snap.util.getattr.text", function () {
    if (this.type == "text" || this.type == "tspan") {
      eve_default.a.stop();
      var out = textExtract(this.node);
      return out.length == 1 ? out[0] : out;
    }
  })(-1);
  eve_default.a.on("snap.util.getattr.#text", function () {
    return this.node.textContent;
  })(-1);
  eve_default.a.on("snap.util.getattr.fill", function (internal) {
    if (internal) {
      return;
    }

    eve_default.a.stop();
    var value = eve_default()("snap.util.getattr.fill", this, true).firstDefined();
    return Snap(Snap.deurl(value)) || value;
  })(-1);
  eve_default.a.on("snap.util.getattr.stroke", function (internal) {
    if (internal) {
      return;
    }

    eve_default.a.stop();
    var value = eve_default()("snap.util.getattr.stroke", this, true).firstDefined();
    return Snap(Snap.deurl(value)) || value;
  })(-1);
  eve_default.a.on("snap.util.getattr.viewBox", function () {
    eve_default.a.stop();
    var vb = $(this.node, "viewBox");

    if (vb) {
      vb = vb.split(separator);
      return Snap._.box(+vb[0], +vb[1], +vb[2], +vb[3]);
    } else {
      return;
    }
  })(-1);
  eve_default.a.on("snap.util.getattr.points", function () {
    var p = $(this.node, "points");
    eve_default.a.stop();

    if (p) {
      return p.split(separator);
    } else {
      return;
    }
  })(-1);
  eve_default.a.on("snap.util.getattr.path", function () {
    var p = $(this.node, "d");
    eve_default.a.stop();
    return p;
  })(-1);
  eve_default.a.on("snap.util.getattr.class", function () {
    return this.node.className.baseVal;
  })(-1);

  function getFontSize() {
    eve_default.a.stop();
    return this.node.style.fontSize;
  }

  eve_default.a.on("snap.util.getattr.fontSize", getFontSize)(-1);
  eve_default.a.on("snap.util.getattr.font-size", getFontSize)(-1);
}); // Copyright (c) 2014 Adobe Systems Incorporated. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

snap_svg_Snap.plugin(function (Snap, Element, Paper, glob, Fragment) {
  var rgNotSpace = /\S+/g,
      rgBadSpace = /[\t\r\n\f]/g,
      rgTrim = /(^\s+|\s+$)/g,
      Str = String,
      elproto = Element.prototype;
  /*\
   * Element.addClass
   [ method ]
   **
   * Adds given class name or list of class names to the element.
   - value (string) class name or space separated list of class names
   **
   = (Element) original element.
  \*/

  elproto.addClass = function (value) {
    var classes = Str(value || "").match(rgNotSpace) || [],
        elem = this.node,
        className = elem.className.baseVal,
        curClasses = className.match(rgNotSpace) || [],
        j,
        pos,
        clazz,
        finalValue;

    if (classes.length) {
      j = 0;

      while (clazz = classes[j++]) {
        pos = curClasses.indexOf(clazz);

        if (!~pos) {
          curClasses.push(clazz);
        }
      }

      finalValue = curClasses.join(" ");

      if (className != finalValue) {
        elem.className.baseVal = finalValue;
      }
    }

    return this;
  };
  /*\
   * Element.removeClass
   [ method ]
   **
   * Removes given class name or list of class names from the element.
   - value (string) class name or space separated list of class names
   **
   = (Element) original element.
  \*/


  elproto.removeClass = function (value) {
    var classes = Str(value || "").match(rgNotSpace) || [],
        elem = this.node,
        className = elem.className.baseVal,
        curClasses = className.match(rgNotSpace) || [],
        j,
        pos,
        clazz,
        finalValue;

    if (curClasses.length) {
      j = 0;

      while (clazz = classes[j++]) {
        pos = curClasses.indexOf(clazz);

        if (~pos) {
          curClasses.splice(pos, 1);
        }
      }

      finalValue = curClasses.join(" ");

      if (className != finalValue) {
        elem.className.baseVal = finalValue;
      }
    }

    return this;
  };
  /*\
   * Element.hasClass
   [ method ]
   **
   * Checks if the element has a given class name in the list of class names applied to it.
   - value (string) class name
   **
   = (boolean) `true` if the element has given class
  \*/


  elproto.hasClass = function (value) {
    var elem = this.node,
        className = elem.className.baseVal,
        curClasses = className.match(rgNotSpace) || [];
    return !!~curClasses.indexOf(value);
  };
  /*\
   * Element.toggleClass
   [ method ]
   **
   * Add or remove one or more classes from the element, depending on either
   * the class’s presence or the value of the `flag` argument.
   - value (string) class name or space separated list of class names
   - flag (boolean) value to determine whether the class should be added or removed
   **
   = (Element) original element.
  \*/


  elproto.toggleClass = function (value, flag) {
    if (flag != null) {
      if (flag) {
        return this.addClass(value);
      } else {
        return this.removeClass(value);
      }
    }

    var classes = (value || "").match(rgNotSpace) || [],
        elem = this.node,
        className = elem.className.baseVal,
        curClasses = className.match(rgNotSpace) || [],
        j,
        pos,
        clazz,
        finalValue;
    j = 0;

    while (clazz = classes[j++]) {
      pos = curClasses.indexOf(clazz);

      if (~pos) {
        curClasses.splice(pos, 1);
      } else {
        curClasses.push(clazz);
      }
    }

    finalValue = curClasses.join(" ");

    if (className != finalValue) {
      elem.className.baseVal = finalValue;
    }

    return this;
  };
}); // Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

snap_svg_Snap.plugin(function (Snap, Element, Paper, glob, Fragment) {
  var operators = {
    "+": function _(x, y) {
      return x + y;
    },
    "-": function _(x, y) {
      return x - y;
    },
    "/": function _(x, y) {
      return x / y;
    },
    "*": function _(x, y) {
      return x * y;
    }
  },
      Str = String,
      reUnit = /[a-z]+$/i,
      reAddon = /^\s*([+\-\/*])\s*=\s*([\d.eE+\-]+)\s*([^\d\s]+)?\s*$/;

  function getNumber(val) {
    return val;
  }

  function getUnit(unit) {
    return function (val) {
      return +val.toFixed(3) + unit;
    };
  }

  eve_default.a.on("snap.util.attr", function (val) {
    var plus = Str(val).match(reAddon);

    if (plus) {
      var evnt = eve_default.a.nt(),
          name = evnt.substring(evnt.lastIndexOf(".") + 1),
          a = this.attr(name),
          atr = {};
      eve_default.a.stop();
      var unit = plus[3] || "",
          aUnit = a.match(reUnit),
          op = operators[plus[1]];

      if (aUnit && aUnit == unit) {
        val = op(parseFloat(a), +plus[2]);
      } else {
        a = this.asPX(name);
        val = op(this.asPX(name), this.asPX(name, plus[2] + unit));
      }

      if (isNaN(a) || isNaN(val)) {
        return;
      }

      atr[name] = val;
      this.attr(atr);
    }
  })(-10);
  eve_default.a.on("snap.util.equal", function (name, b) {
    var A,
        B,
        a = Str(this.attr(name) || ""),
        el = this,
        bplus = Str(b).match(reAddon);

    if (bplus) {
      eve_default.a.stop();
      var unit = bplus[3] || "",
          aUnit = a.match(reUnit),
          op = operators[bplus[1]];

      if (aUnit && aUnit == unit) {
        return {
          from: parseFloat(a),
          to: op(parseFloat(a), +bplus[2]),
          f: getUnit(aUnit)
        };
      } else {
        a = this.asPX(name);
        return {
          from: a,
          to: op(a, this.asPX(name, bplus[2] + unit)),
          f: getNumber
        };
      }
    }
  })(-10);
}); // Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

snap_svg_Snap.plugin(function (Snap, Element, Paper, glob, Fragment) {
  var proto = Paper.prototype,
      is = Snap.is;
  /*\
   * Paper.rect
   [ method ]
   *
   * Draws a rectangle
   **
   - x (number) x coordinate of the top left corner
   - y (number) y coordinate of the top left corner
   - width (number) width
   - height (number) height
   - rx (number) #optional horizontal radius for rounded corners, default is 0
   - ry (number) #optional vertical radius for rounded corners, default is rx or 0
   = (object) the `rect` element
   **
   > Usage
   | // regular rectangle
   | var c = paper.rect(10, 10, 50, 50);
   | // rectangle with rounded corners
   | var c = paper.rect(40, 40, 50, 50, 10);
  \*/

  proto.rect = function (x, y, w, h, rx, ry) {
    var attr;

    if (ry == null) {
      ry = rx;
    }

    if (is(x, "object") && x == "[object Object]") {
      attr = x;
    } else if (x != null) {
      attr = {
        x: x,
        y: y,
        width: w,
        height: h
      };

      if (rx != null) {
        attr.rx = rx;
        attr.ry = ry;
      }
    }

    return this.el("rect", attr);
  };
  /*\
   * Paper.circle
   [ method ]
   **
   * Draws a circle
   **
   - x (number) x coordinate of the centre
   - y (number) y coordinate of the centre
   - r (number) radius
   = (object) the `circle` element
   **
   > Usage
   | var c = paper.circle(50, 50, 40);
  \*/


  proto.circle = function (cx, cy, r) {
    var attr;

    if (is(cx, "object") && cx == "[object Object]") {
      attr = cx;
    } else if (cx != null) {
      attr = {
        cx: cx,
        cy: cy,
        r: r
      };
    }

    return this.el("circle", attr);
  };

  var preload = function () {
    function onerror() {
      this.parentNode.removeChild(this);
    }

    return function (src, f) {
      var img = glob.doc.createElement("img"),
          body = glob.doc.body;
      img.style.cssText = "position:absolute;left:-9999em;top:-9999em";

      img.onload = function () {
        f.call(img);
        img.onload = img.onerror = null;
        body.removeChild(img);
      };

      img.onerror = onerror;
      body.appendChild(img);
      img.src = src;
    };
  }();
  /*\
   * Paper.image
   [ method ]
   **
   * Places an image on the surface
   **
   - src (string) URI of the source image
   - x (number) x offset position
   - y (number) y offset position
   - width (number) width of the image
   - height (number) height of the image
   = (object) the `image` element
   * or
   = (object) Snap element object with type `image`
   **
   > Usage
   | var c = paper.image("apple.png", 10, 10, 80, 80);
  \*/


  proto.image = function (src, x, y, width, height) {
    var el = this.el("image");

    if (is(src, "object") && "src" in src) {
      el.attr(src);
    } else if (src != null) {
      var set = {
        "xlink:href": src,
        preserveAspectRatio: "none"
      };

      if (x != null && y != null) {
        set.x = x;
        set.y = y;
      }

      if (width != null && height != null) {
        set.width = width;
        set.height = height;
      } else {
        preload(src, function () {
          Snap._.$(el.node, {
            width: this.offsetWidth,
            height: this.offsetHeight
          });
        });
      }

      Snap._.$(el.node, set);
    }

    return el;
  };
  /*\
   * Paper.ellipse
   [ method ]
   **
   * Draws an ellipse
   **
   - x (number) x coordinate of the centre
   - y (number) y coordinate of the centre
   - rx (number) horizontal radius
   - ry (number) vertical radius
   = (object) the `ellipse` element
   **
   > Usage
   | var c = paper.ellipse(50, 50, 40, 20);
  \*/


  proto.ellipse = function (cx, cy, rx, ry) {
    var attr;

    if (is(cx, "object") && cx == "[object Object]") {
      attr = cx;
    } else if (cx != null) {
      attr = {
        cx: cx,
        cy: cy,
        rx: rx,
        ry: ry
      };
    }

    return this.el("ellipse", attr);
  }; // SIERRA Paper.path(): Unclear from the link what a Catmull-Rom curveto is, and why it would make life any easier.

  /*\
   * Paper.path
   [ method ]
   **
   * Creates a `<path>` element using the given string as the path's definition
   - pathString (string) #optional path string in SVG format
   * Path string consists of one-letter commands, followed by comma seprarated arguments in numerical form. Example:
   | "M10,20L30,40"
   * This example features two commands: `M`, with arguments `(10, 20)` and `L` with arguments `(30, 40)`. Uppercase letter commands express coordinates in absolute terms, while lowercase commands express them in relative terms from the most recently declared coordinates.
   *
   # <p>Here is short list of commands available, for more details see <a href="http://www.w3.org/TR/SVG/paths.html#PathData" title="Details of a path's data attribute's format are described in the SVG specification.">SVG path string format</a> or <a href="https://developer.mozilla.org/en/SVG/Tutorial/Paths">article about path strings at MDN</a>.</p>
   # <table><thead><tr><th>Command</th><th>Name</th><th>Parameters</th></tr></thead><tbody>
   # <tr><td>M</td><td>moveto</td><td>(x y)+</td></tr>
   # <tr><td>Z</td><td>closepath</td><td>(none)</td></tr>
   # <tr><td>L</td><td>lineto</td><td>(x y)+</td></tr>
   # <tr><td>H</td><td>horizontal lineto</td><td>x+</td></tr>
   # <tr><td>V</td><td>vertical lineto</td><td>y+</td></tr>
   # <tr><td>C</td><td>curveto</td><td>(x1 y1 x2 y2 x y)+</td></tr>
   # <tr><td>S</td><td>smooth curveto</td><td>(x2 y2 x y)+</td></tr>
   # <tr><td>Q</td><td>quadratic Bézier curveto</td><td>(x1 y1 x y)+</td></tr>
   # <tr><td>T</td><td>smooth quadratic Bézier curveto</td><td>(x y)+</td></tr>
   # <tr><td>A</td><td>elliptical arc</td><td>(rx ry x-axis-rotation large-arc-flag sweep-flag x y)+</td></tr>
   # <tr><td>R</td><td><a href="http://en.wikipedia.org/wiki/Catmull–Rom_spline#Catmull.E2.80.93Rom_spline">Catmull-Rom curveto</a>*</td><td>x1 y1 (x y)+</td></tr></tbody></table>
   * * _Catmull-Rom curveto_ is a not standard SVG command and added to make life easier.
   * Note: there is a special case when a path consists of only three commands: `M10,10R…z`. In this case the path connects back to its starting point.
   > Usage
   | var c = paper.path("M10 10L90 90");
   | // draw a diagonal line:
   | // move to 10,10, line to 90,90
  \*/


  proto.path = function (d) {
    var attr;

    if (is(d, "object") && !is(d, "array")) {
      attr = d;
    } else if (d) {
      attr = {
        d: d
      };
    }

    return this.el("path", attr);
  };
  /*\
   * Paper.g
   [ method ]
   **
   * Creates a group element
   **
   - varargs (…) #optional elements to nest within the group
   = (object) the `g` element
   **
   > Usage
   | var c1 = paper.circle(),
   |     c2 = paper.rect(),
   |     g = paper.g(c2, c1); // note that the order of elements is different
   * or
   | var c1 = paper.circle(),
   |     c2 = paper.rect(),
   |     g = paper.g();
   | g.add(c2, c1);
  \*/

  /*\
   * Paper.group
   [ method ]
   **
   * See @Paper.g
  \*/


  proto.group = proto.g = function (first) {
    var attr,
        el = this.el("g");

    if (arguments.length == 1 && first && !first.type) {
      el.attr(first);
    } else if (arguments.length) {
      el.add(Array.prototype.slice.call(arguments, 0));
    }

    return el;
  };
  /*\
   * Paper.svg
   [ method ]
   **
   * Creates a nested SVG element.
   - x (number) @optional X of the element
   - y (number) @optional Y of the element
   - width (number) @optional width of the element
   - height (number) @optional height of the element
   - vbx (number) @optional viewbox X
   - vby (number) @optional viewbox Y
   - vbw (number) @optional viewbox width
   - vbh (number) @optional viewbox height
   **
   = (object) the `svg` element
   **
  \*/


  proto.svg = function (x, y, width, height, vbx, vby, vbw, vbh) {
    var attrs = {};

    if (is(x, "object") && y == null) {
      attrs = x;
    } else {
      if (x != null) {
        attrs.x = x;
      }

      if (y != null) {
        attrs.y = y;
      }

      if (width != null) {
        attrs.width = width;
      }

      if (height != null) {
        attrs.height = height;
      }

      if (vbx != null && vby != null && vbw != null && vbh != null) {
        attrs.viewBox = [vbx, vby, vbw, vbh];
      }
    }

    return this.el("svg", attrs);
  };
  /*\
   * Paper.mask
   [ method ]
   **
   * Equivalent in behaviour to @Paper.g, except it’s a mask.
   **
   = (object) the `mask` element
   **
  \*/


  proto.mask = function (first) {
    var attr,
        el = this.el("mask");

    if (arguments.length == 1 && first && !first.type) {
      el.attr(first);
    } else if (arguments.length) {
      el.add(Array.prototype.slice.call(arguments, 0));
    }

    return el;
  };
  /*\
   * Paper.ptrn
   [ method ]
   **
   * Equivalent in behaviour to @Paper.g, except it’s a pattern.
   - x (number) @optional X of the element
   - y (number) @optional Y of the element
   - width (number) @optional width of the element
   - height (number) @optional height of the element
   - vbx (number) @optional viewbox X
   - vby (number) @optional viewbox Y
   - vbw (number) @optional viewbox width
   - vbh (number) @optional viewbox height
   **
   = (object) the `pattern` element
   **
  \*/


  proto.ptrn = function (x, y, width, height, vx, vy, vw, vh) {
    if (is(x, "object")) {
      var attr = x;
    } else {
      attr = {
        patternUnits: "userSpaceOnUse"
      };

      if (x) {
        attr.x = x;
      }

      if (y) {
        attr.y = y;
      }

      if (width != null) {
        attr.width = width;
      }

      if (height != null) {
        attr.height = height;
      }

      if (vx != null && vy != null && vw != null && vh != null) {
        attr.viewBox = [vx, vy, vw, vh];
      } else {
        attr.viewBox = [x || 0, y || 0, width || 0, height || 0];
      }
    }

    return this.el("pattern", attr);
  };
  /*\
   * Paper.use
   [ method ]
   **
   * Creates a <use> element.
   - id (string) @optional id of element to link
   * or
   - id (Element) @optional element to link
   **
   = (object) the `use` element
   **
  \*/


  proto.use = function (id) {
    if (id != null) {
      if (id instanceof Element) {
        if (!id.attr("id")) {
          id.attr({
            id: Snap._.id(id)
          });
        }

        id = id.attr("id");
      }

      if (String(id).charAt() == "#") {
        id = id.substring(1);
      }

      return this.el("use", {
        "xlink:href": "#" + id
      });
    } else {
      return Element.prototype.use.call(this);
    }
  };
  /*\
   * Paper.symbol
   [ method ]
   **
   * Creates a <symbol> element.
   - vbx (number) @optional viewbox X
   - vby (number) @optional viewbox Y
   - vbw (number) @optional viewbox width
   - vbh (number) @optional viewbox height
   = (object) the `symbol` element
   **
  \*/


  proto.symbol = function (vx, vy, vw, vh) {
    var attr = {};

    if (vx != null && vy != null && vw != null && vh != null) {
      attr.viewBox = [vx, vy, vw, vh];
    }

    return this.el("symbol", attr);
  };
  /*\
   * Paper.text
   [ method ]
   **
   * Draws a text string
   **
   - x (number) x coordinate position
   - y (number) y coordinate position
   - text (string|array) The text string to draw or array of strings to nest within separate `<tspan>` elements
   = (object) the `text` element
   **
   > Usage
   | var t1 = paper.text(50, 50, "Snap");
   | var t2 = paper.text(50, 50, ["S","n","a","p"]);
   | // Text path usage
   | t1.attr({textpath: "M10,10L100,100"});
   | // or
   | var pth = paper.path("M10,10L100,100");
   | t1.attr({textpath: pth});
  \*/


  proto.text = function (x, y, text) {
    var attr = {};

    if (is(x, "object")) {
      attr = x;
    } else if (x != null) {
      attr = {
        x: x,
        y: y,
        text: text || ""
      };
    }

    return this.el("text", attr);
  };
  /*\
   * Paper.line
   [ method ]
   **
   * Draws a line
   **
   - x1 (number) x coordinate position of the start
   - y1 (number) y coordinate position of the start
   - x2 (number) x coordinate position of the end
   - y2 (number) y coordinate position of the end
   = (object) the `line` element
   **
   > Usage
   | var t1 = paper.line(50, 50, 100, 100);
  \*/


  proto.line = function (x1, y1, x2, y2) {
    var attr = {};

    if (is(x1, "object")) {
      attr = x1;
    } else if (x1 != null) {
      attr = {
        x1: x1,
        x2: x2,
        y1: y1,
        y2: y2
      };
    }

    return this.el("line", attr);
  };
  /*\
   * Paper.polyline
   [ method ]
   **
   * Draws a polyline
   **
   - points (array) array of points
   * or
   - varargs (…) points
   = (object) the `polyline` element
   **
   > Usage
   | var p1 = paper.polyline([10, 10, 100, 100]);
   | var p2 = paper.polyline(10, 10, 100, 100);
  \*/


  proto.polyline = function (points) {
    if (arguments.length > 1) {
      points = Array.prototype.slice.call(arguments, 0);
    }

    var attr = {};

    if (is(points, "object") && !is(points, "array")) {
      attr = points;
    } else if (points != null) {
      attr = {
        points: points
      };
    }

    return this.el("polyline", attr);
  };
  /*\
   * Paper.polygon
   [ method ]
   **
   * Draws a polygon. See @Paper.polyline
  \*/


  proto.polygon = function (points) {
    if (arguments.length > 1) {
      points = Array.prototype.slice.call(arguments, 0);
    }

    var attr = {};

    if (is(points, "object") && !is(points, "array")) {
      attr = points;
    } else if (points != null) {
      attr = {
        points: points
      };
    }

    return this.el("polygon", attr);
  }; // gradients


  (function () {
    var $ = Snap._.$; // gradients' helpers

    /*\
     * Element.stops
     [ method ]
     **
     * Only for gradients!
     * Returns array of gradient stops elements.
     = (array) the stops array.
    \*/

    function Gstops() {
      return this.selectAll("stop");
    }
    /*\
     * Element.addStop
     [ method ]
     **
     * Only for gradients!
     * Adds another stop to the gradient.
     - color (string) stops color
     - offset (number) stops offset 0..100
     = (object) gradient element
    \*/


    function GaddStop(color, offset) {
      var stop = $("stop"),
          attr = {
        offset: +offset + "%"
      };
      color = Snap.color(color);
      attr["stop-color"] = color.hex;

      if (color.opacity < 1) {
        attr["stop-opacity"] = color.opacity;
      }

      $(stop, attr);
      var stops = this.stops(),
          inserted;

      for (var i = 0; i < stops.length; i++) {
        var stopOffset = parseFloat(stops[i].attr("offset"));

        if (stopOffset > offset) {
          this.node.insertBefore(stop, stops[i].node);
          inserted = true;
          break;
        }
      }

      if (!inserted) {
        this.node.appendChild(stop);
      }

      return this;
    }

    function GgetBBox() {
      if (this.type == "linearGradient") {
        var x1 = $(this.node, "x1") || 0,
            x2 = $(this.node, "x2") || 1,
            y1 = $(this.node, "y1") || 0,
            y2 = $(this.node, "y2") || 0;
        return Snap._.box(x1, y1, math.abs(x2 - x1), math.abs(y2 - y1));
      } else {
        var cx = this.node.cx || .5,
            cy = this.node.cy || .5,
            r = this.node.r || 0;
        return Snap._.box(cx - r, cy - r, r * 2, r * 2);
      }
    }
    /*\
     * Element.setStops
     [ method ]
     **
     * Only for gradients!
     * Updates stops of the gradient based on passed gradient descriptor. See @Ppaer.gradient
     - str (string) gradient descriptor part after `()`.
     = (object) gradient element
     | var g = paper.gradient("l(0, 0, 1, 1)#000-#f00-#fff");
     | g.setStops("#fff-#000-#f00-#fc0");
    \*/


    function GsetStops(str) {
      var grad = str,
          stops = this.stops();

      if (typeof str == "string") {
        grad = eve_default()("snap.util.grad.parse", null, "l(0,0,0,1)" + str).firstDefined().stops;
      }

      if (!Snap.is(grad, "array")) {
        return;
      }

      for (var i = 0; i < stops.length; i++) {
        if (grad[i]) {
          var color = Snap.color(grad[i].color),
              attr = {
            "offset": grad[i].offset + "%"
          };
          attr["stop-color"] = color.hex;

          if (color.opacity < 1) {
            attr["stop-opacity"] = color.opacity;
          }

          stops[i].attr(attr);
        } else {
          stops[i].remove();
        }
      }

      for (i = stops.length; i < grad.length; i++) {
        this.addStop(grad[i].color, grad[i].offset);
      }

      return this;
    }

    function gradient(defs, str) {
      var grad = eve_default()("snap.util.grad.parse", null, str).firstDefined(),
          el;

      if (!grad) {
        return null;
      }

      grad.params.unshift(defs);

      if (grad.type.toLowerCase() == "l") {
        el = gradientLinear.apply(0, grad.params);
      } else {
        el = gradientRadial.apply(0, grad.params);
      }

      if (grad.type != grad.type.toLowerCase()) {
        $(el.node, {
          gradientUnits: "userSpaceOnUse"
        });
      }

      var stops = grad.stops,
          len = stops.length;

      for (var i = 0; i < len; i++) {
        var stop = stops[i];
        el.addStop(stop.color, stop.offset);
      }

      return el;
    }

    function gradientLinear(defs, x1, y1, x2, y2) {
      var el = Snap._.make("linearGradient", defs);

      el.stops = Gstops;
      el.addStop = GaddStop;
      el.getBBox = GgetBBox;
      el.setStops = GsetStops;

      if (x1 != null) {
        $(el.node, {
          x1: x1,
          y1: y1,
          x2: x2,
          y2: y2
        });
      }

      return el;
    }

    function gradientRadial(defs, cx, cy, r, fx, fy) {
      var el = Snap._.make("radialGradient", defs);

      el.stops = Gstops;
      el.addStop = GaddStop;
      el.getBBox = GgetBBox;

      if (cx != null) {
        $(el.node, {
          cx: cx,
          cy: cy,
          r: r
        });
      }

      if (fx != null && fy != null) {
        $(el.node, {
          fx: fx,
          fy: fy
        });
      }

      return el;
    }
    /*\
     * Paper.gradient
     [ method ]
     **
     * Creates a gradient element
     **
     - gradient (string) gradient descriptor
     > Gradient Descriptor
     * The gradient descriptor is an expression formatted as
     * follows: `<type>(<coords>)<colors>`.  The `<type>` can be
     * either linear or radial.  The uppercase `L` or `R` letters
     * indicate absolute coordinates offset from the SVG surface.
     * Lowercase `l` or `r` letters indicate coordinates
     * calculated relative to the element to which the gradient is
     * applied.  Coordinates specify a linear gradient vector as
     * `x1`, `y1`, `x2`, `y2`, or a radial gradient as `cx`, `cy`,
     * `r` and optional `fx`, `fy` specifying a focal point away
     * from the center of the circle. Specify `<colors>` as a list
     * of dash-separated CSS color values.  Each color may be
     * followed by a custom offset value, separated with a colon
     * character.
     > Examples
     * Linear gradient, relative from top-left corner to bottom-right
     * corner, from black through red to white:
     | var g = paper.gradient("l(0, 0, 1, 1)#000-#f00-#fff");
     * Linear gradient, absolute from (0, 0) to (100, 100), from black
     * through red at 25% to white:
     | var g = paper.gradient("L(0, 0, 100, 100)#000-#f00:25-#fff");
     * Radial gradient, relative from the center of the element with radius
     * half the width, from black to white:
     | var g = paper.gradient("r(0.5, 0.5, 0.5)#000-#fff");
     * To apply the gradient:
     | paper.circle(50, 50, 40).attr({
     |     fill: g
     | });
     = (object) the `gradient` element
    \*/


    proto.gradient = function (str) {
      return gradient(this.defs, str);
    };

    proto.gradientLinear = function (x1, y1, x2, y2) {
      return gradientLinear(this.defs, x1, y1, x2, y2);
    };

    proto.gradientRadial = function (cx, cy, r, fx, fy) {
      return gradientRadial(this.defs, cx, cy, r, fx, fy);
    };
    /*\
     * Paper.toString
     [ method ]
     **
     * Returns SVG code for the @Paper
     = (string) SVG code for the @Paper
    \*/


    proto.toString = function () {
      var doc = this.node.ownerDocument,
          f = doc.createDocumentFragment(),
          d = doc.createElement("div"),
          svg = this.node.cloneNode(true),
          res;
      f.appendChild(d);
      d.appendChild(svg);

      Snap._.$(svg, {
        xmlns: "http://www.w3.org/2000/svg"
      });

      res = d.innerHTML;
      f.removeChild(f.firstChild);
      return res;
    };
    /*\
     * Paper.toDataURL
     [ method ]
     **
     * Returns SVG code for the @Paper as Data URI string.
     = (string) Data URI string
    \*/


    proto.toDataURL = function () {
      if (window && window.btoa) {
        return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(this)));
      }
    };
    /*\
     * Paper.clear
     [ method ]
     **
     * Removes all child nodes of the paper, except <defs>.
    \*/


    proto.clear = function () {
      var node = this.node.firstChild,
          next;

      while (node) {
        next = node.nextSibling;

        if (node.tagName != "defs") {
          node.parentNode.removeChild(node);
        } else {
          proto.clear.call({
            node: node
          });
        }

        node = next;
      }
    };
  })();
}); // Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

snap_svg_Snap.plugin(function (Snap, Element, Paper, glob) {
  var elproto = Element.prototype,
      is = Snap.is,
      clone = Snap._.clone,
      has = "hasOwnProperty",
      p2s = /,?([a-z]),?/gi,
      toFloat = parseFloat,
      math = Math,
      PI = math.PI,
      mmin = math.min,
      mmax = math.max,
      pow = math.pow,
      abs = math.abs;

  function paths(ps) {
    var p = paths.ps = paths.ps || {}; // if (p[ps]) {
    //     p[ps].sleep = 100;
    // } else {
    //     p[ps] = {
    //         sleep: 100
    //     };
    // }
    // setTimeout(function () {
    //     for (var key in p) if (p[has](key) && key != ps) {
    //         p[key].sleep--;
    //         !p[key].sleep && delete p[key];
    //     }
    // });

    return {}; //p[ps];
  }

  function box(x, y, width, height) {
    if (x == null) {
      x = y = width = height = 0;
    }

    if (y == null) {
      y = x.y;
      width = x.width;
      height = x.height;
      x = x.x;
    }

    return {
      x: x,
      y: y,
      width: width,
      w: width,
      height: height,
      h: height,
      x2: x + width,
      y2: y + height,
      cx: x + width / 2,
      cy: y + height / 2,
      r1: math.min(width, height) / 2,
      r2: math.max(width, height) / 2,
      r0: math.sqrt(width * width + height * height) / 2,
      path: rectPath(x, y, width, height),
      vb: [x, y, width, height].join(" ")
    };
  }

  function toString() {
    return this.join(",").replace(p2s, "$1");
  }

  function pathClone(pathArray) {
    var res = clone(pathArray);
    res.toString = toString;
    return res;
  }

  function getPointAtSegmentLength(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length) {
    if (length == null) {
      return bezlen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y);
    } else {
      return findDotsAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, getTotLen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length));
    }
  }

  function getLengthFactory(istotal, subpath) {
    function O(val) {
      return +(+val).toFixed(3);
    }

    return Snap._.cacher(function (path, length, onlystart) {
      if (path instanceof Element) {
        path = path.attr("d");
      }

      path = path2curve(path);
      var x,
          y,
          p,
          l,
          sp = "",
          subpaths = {},
          point,
          len = 0;

      for (var i = 0, ii = path.length; i < ii; i++) {
        p = path[i];

        if (p[0] == "M") {
          x = +p[1];
          y = +p[2];
        } else {
          l = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);

          if (len + l > length) {
            if (subpath && !subpaths.start) {
              point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
              sp += ["C" + O(point.start.x), O(point.start.y), O(point.m.x), O(point.m.y), O(point.x), O(point.y)];

              if (onlystart) {
                return sp;
              }

              subpaths.start = sp;
              sp = ["M" + O(point.x), O(point.y) + "C" + O(point.n.x), O(point.n.y), O(point.end.x), O(point.end.y), O(p[5]), O(p[6])].join();
              len += l;
              x = +p[5];
              y = +p[6];
              continue;
            }

            if (!istotal && !subpath) {
              point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
              return point;
            }
          }

          len += l;
          x = +p[5];
          y = +p[6];
        }

        sp += p.shift() + p;
      }

      subpaths.end = sp;
      point = istotal ? len : subpath ? subpaths : findDotsAtSegment(x, y, p[0], p[1], p[2], p[3], p[4], p[5], 1);
      return point;
    }, null, Snap._.clone);
  }

  var getTotalLength = getLengthFactory(1),
      getPointAtLength = getLengthFactory(),
      getSubpathsAtLength = getLengthFactory(0, 1);

  function findDotsAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
    var t1 = 1 - t,
        t13 = pow(t1, 3),
        t12 = pow(t1, 2),
        t2 = t * t,
        t3 = t2 * t,
        x = t13 * p1x + t12 * 3 * t * c1x + t1 * 3 * t * t * c2x + t3 * p2x,
        y = t13 * p1y + t12 * 3 * t * c1y + t1 * 3 * t * t * c2y + t3 * p2y,
        mx = p1x + 2 * t * (c1x - p1x) + t2 * (c2x - 2 * c1x + p1x),
        my = p1y + 2 * t * (c1y - p1y) + t2 * (c2y - 2 * c1y + p1y),
        nx = c1x + 2 * t * (c2x - c1x) + t2 * (p2x - 2 * c2x + c1x),
        ny = c1y + 2 * t * (c2y - c1y) + t2 * (p2y - 2 * c2y + c1y),
        ax = t1 * p1x + t * c1x,
        ay = t1 * p1y + t * c1y,
        cx = t1 * c2x + t * p2x,
        cy = t1 * c2y + t * p2y,
        alpha = 90 - math.atan2(mx - nx, my - ny) * 180 / PI; // (mx > nx || my < ny) && (alpha += 180);

    return {
      x: x,
      y: y,
      m: {
        x: mx,
        y: my
      },
      n: {
        x: nx,
        y: ny
      },
      start: {
        x: ax,
        y: ay
      },
      end: {
        x: cx,
        y: cy
      },
      alpha: alpha
    };
  }

  function bezierBBox(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
    if (!Snap.is(p1x, "array")) {
      p1x = [p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y];
    }

    var bbox = curveDim.apply(null, p1x);
    return box(bbox.min.x, bbox.min.y, bbox.max.x - bbox.min.x, bbox.max.y - bbox.min.y);
  }

  function isPointInsideBBox(bbox, x, y) {
    return x >= bbox.x && x <= bbox.x + bbox.width && y >= bbox.y && y <= bbox.y + bbox.height;
  }

  function isBBoxIntersect(bbox1, bbox2) {
    bbox1 = box(bbox1);
    bbox2 = box(bbox2);
    return isPointInsideBBox(bbox2, bbox1.x, bbox1.y) || isPointInsideBBox(bbox2, bbox1.x2, bbox1.y) || isPointInsideBBox(bbox2, bbox1.x, bbox1.y2) || isPointInsideBBox(bbox2, bbox1.x2, bbox1.y2) || isPointInsideBBox(bbox1, bbox2.x, bbox2.y) || isPointInsideBBox(bbox1, bbox2.x2, bbox2.y) || isPointInsideBBox(bbox1, bbox2.x, bbox2.y2) || isPointInsideBBox(bbox1, bbox2.x2, bbox2.y2) || (bbox1.x < bbox2.x2 && bbox1.x > bbox2.x || bbox2.x < bbox1.x2 && bbox2.x > bbox1.x) && (bbox1.y < bbox2.y2 && bbox1.y > bbox2.y || bbox2.y < bbox1.y2 && bbox2.y > bbox1.y);
  }

  function base3(t, p1, p2, p3, p4) {
    var t1 = -3 * p1 + 9 * p2 - 9 * p3 + 3 * p4,
        t2 = t * t1 + 6 * p1 - 12 * p2 + 6 * p3;
    return t * t2 - 3 * p1 + 3 * p2;
  }

  function bezlen(x1, y1, x2, y2, x3, y3, x4, y4, z) {
    if (z == null) {
      z = 1;
    }

    z = z > 1 ? 1 : z < 0 ? 0 : z;
    var z2 = z / 2,
        n = 12,
        Tvalues = [-.1252, .1252, -.3678, .3678, -.5873, .5873, -.7699, .7699, -.9041, .9041, -.9816, .9816],
        Cvalues = [0.2491, 0.2491, 0.2335, 0.2335, 0.2032, 0.2032, 0.1601, 0.1601, 0.1069, 0.1069, 0.0472, 0.0472],
        sum = 0;

    for (var i = 0; i < n; i++) {
      var ct = z2 * Tvalues[i] + z2,
          xbase = base3(ct, x1, x2, x3, x4),
          ybase = base3(ct, y1, y2, y3, y4),
          comb = xbase * xbase + ybase * ybase;
      sum += Cvalues[i] * math.sqrt(comb);
    }

    return z2 * sum;
  }

  function getTotLen(x1, y1, x2, y2, x3, y3, x4, y4, ll) {
    if (ll < 0 || bezlen(x1, y1, x2, y2, x3, y3, x4, y4) < ll) {
      return;
    }

    var t = 1,
        step = t / 2,
        t2 = t - step,
        l,
        e = .01;
    l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2);

    while (abs(l - ll) > e) {
      step /= 2;
      t2 += (l < ll ? 1 : -1) * step;
      l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2);
    }

    return t2;
  }

  function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
    if (mmax(x1, x2) < mmin(x3, x4) || mmin(x1, x2) > mmax(x3, x4) || mmax(y1, y2) < mmin(y3, y4) || mmin(y1, y2) > mmax(y3, y4)) {
      return;
    }

    var nx = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4),
        ny = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4),
        denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    if (!denominator) {
      return;
    }

    var px = nx / denominator,
        py = ny / denominator,
        px2 = +px.toFixed(2),
        py2 = +py.toFixed(2);

    if (px2 < +mmin(x1, x2).toFixed(2) || px2 > +mmax(x1, x2).toFixed(2) || px2 < +mmin(x3, x4).toFixed(2) || px2 > +mmax(x3, x4).toFixed(2) || py2 < +mmin(y1, y2).toFixed(2) || py2 > +mmax(y1, y2).toFixed(2) || py2 < +mmin(y3, y4).toFixed(2) || py2 > +mmax(y3, y4).toFixed(2)) {
      return;
    }

    return {
      x: px,
      y: py
    };
  }

  function inter(bez1, bez2) {
    return interHelper(bez1, bez2);
  }

  function interCount(bez1, bez2) {
    return interHelper(bez1, bez2, 1);
  }

  function interHelper(bez1, bez2, justCount) {
    var bbox1 = bezierBBox(bez1),
        bbox2 = bezierBBox(bez2);

    if (!isBBoxIntersect(bbox1, bbox2)) {
      return justCount ? 0 : [];
    }

    var l1 = bezlen.apply(0, bez1),
        l2 = bezlen.apply(0, bez2),
        n1 = ~~(l1 / 8),
        n2 = ~~(l2 / 8),
        dots1 = [],
        dots2 = [],
        xy = {},
        res = justCount ? 0 : [];

    for (var i = 0; i < n1 + 1; i++) {
      var p = findDotsAtSegment.apply(0, bez1.concat(i / n1));
      dots1.push({
        x: p.x,
        y: p.y,
        t: i / n1
      });
    }

    for (i = 0; i < n2 + 1; i++) {
      p = findDotsAtSegment.apply(0, bez2.concat(i / n2));
      dots2.push({
        x: p.x,
        y: p.y,
        t: i / n2
      });
    }

    for (i = 0; i < n1; i++) {
      for (var j = 0; j < n2; j++) {
        var di = dots1[i],
            di1 = dots1[i + 1],
            dj = dots2[j],
            dj1 = dots2[j + 1],
            ci = abs(di1.x - di.x) < .001 ? "y" : "x",
            cj = abs(dj1.x - dj.x) < .001 ? "y" : "x",
            is = intersect(di.x, di.y, di1.x, di1.y, dj.x, dj.y, dj1.x, dj1.y);

        if (is) {
          if (xy[is.x.toFixed(4)] == is.y.toFixed(4)) {
            continue;
          }

          xy[is.x.toFixed(4)] = is.y.toFixed(4);
          var t1 = di.t + abs((is[ci] - di[ci]) / (di1[ci] - di[ci])) * (di1.t - di.t),
              t2 = dj.t + abs((is[cj] - dj[cj]) / (dj1[cj] - dj[cj])) * (dj1.t - dj.t);

          if (t1 >= 0 && t1 <= 1 && t2 >= 0 && t2 <= 1) {
            if (justCount) {
              res++;
            } else {
              res.push({
                x: is.x,
                y: is.y,
                t1: t1,
                t2: t2
              });
            }
          }
        }
      }
    }

    return res;
  }

  function pathIntersection(path1, path2) {
    return interPathHelper(path1, path2);
  }

  function pathIntersectionNumber(path1, path2) {
    return interPathHelper(path1, path2, 1);
  }

  function interPathHelper(path1, path2, justCount) {
    path1 = path2curve(path1);
    path2 = path2curve(path2);
    var x1,
        y1,
        x2,
        y2,
        x1m,
        y1m,
        x2m,
        y2m,
        bez1,
        bez2,
        res = justCount ? 0 : [];

    for (var i = 0, ii = path1.length; i < ii; i++) {
      var pi = path1[i];

      if (pi[0] == "M") {
        x1 = x1m = pi[1];
        y1 = y1m = pi[2];
      } else {
        if (pi[0] == "C") {
          bez1 = [x1, y1].concat(pi.slice(1));
          x1 = bez1[6];
          y1 = bez1[7];
        } else {
          bez1 = [x1, y1, x1, y1, x1m, y1m, x1m, y1m];
          x1 = x1m;
          y1 = y1m;
        }

        for (var j = 0, jj = path2.length; j < jj; j++) {
          var pj = path2[j];

          if (pj[0] == "M") {
            x2 = x2m = pj[1];
            y2 = y2m = pj[2];
          } else {
            if (pj[0] == "C") {
              bez2 = [x2, y2].concat(pj.slice(1));
              x2 = bez2[6];
              y2 = bez2[7];
            } else {
              bez2 = [x2, y2, x2, y2, x2m, y2m, x2m, y2m];
              x2 = x2m;
              y2 = y2m;
            }

            var intr = interHelper(bez1, bez2, justCount);

            if (justCount) {
              res += intr;
            } else {
              for (var k = 0, kk = intr.length; k < kk; k++) {
                intr[k].segment1 = i;
                intr[k].segment2 = j;
                intr[k].bez1 = bez1;
                intr[k].bez2 = bez2;
              }

              res = res.concat(intr);
            }
          }
        }
      }
    }

    return res;
  }

  function isPointInsidePath(path, x, y) {
    var bbox = pathBBox(path);
    return isPointInsideBBox(bbox, x, y) && interPathHelper(path, [["M", x, y], ["H", bbox.x2 + 10]], 1) % 2 == 1;
  }

  function pathBBox(path) {
    var pth = paths(path);

    if (pth.bbox) {
      return clone(pth.bbox);
    }

    if (!path) {
      return box();
    }

    path = path2curve(path);
    var x = 0,
        y = 0,
        X = [],
        Y = [],
        p;

    for (var i = 0, ii = path.length; i < ii; i++) {
      p = path[i];

      if (p[0] == "M") {
        x = p[1];
        y = p[2];
        X.push(x);
        Y.push(y);
      } else {
        var dim = curveDim(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
        X = X.concat(dim.min.x, dim.max.x);
        Y = Y.concat(dim.min.y, dim.max.y);
        x = p[5];
        y = p[6];
      }
    }

    var xmin = mmin.apply(0, X),
        ymin = mmin.apply(0, Y),
        xmax = mmax.apply(0, X),
        ymax = mmax.apply(0, Y),
        bb = box(xmin, ymin, xmax - xmin, ymax - ymin);
    pth.bbox = clone(bb);
    return bb;
  }

  function rectPath(x, y, w, h, r) {
    if (r) {
      return [["M", +x + +r, y], ["l", w - r * 2, 0], ["a", r, r, 0, 0, 1, r, r], ["l", 0, h - r * 2], ["a", r, r, 0, 0, 1, -r, r], ["l", r * 2 - w, 0], ["a", r, r, 0, 0, 1, -r, -r], ["l", 0, r * 2 - h], ["a", r, r, 0, 0, 1, r, -r], ["z"]];
    }

    var res = [["M", x, y], ["l", w, 0], ["l", 0, h], ["l", -w, 0], ["z"]];
    res.toString = toString;
    return res;
  }

  function ellipsePath(x, y, rx, ry, a) {
    if (a == null && ry == null) {
      ry = rx;
    }

    x = +x;
    y = +y;
    rx = +rx;
    ry = +ry;

    if (a != null) {
      var rad = Math.PI / 180,
          x1 = x + rx * Math.cos(-ry * rad),
          x2 = x + rx * Math.cos(-a * rad),
          y1 = y + rx * Math.sin(-ry * rad),
          y2 = y + rx * Math.sin(-a * rad),
          res = [["M", x1, y1], ["A", rx, rx, 0, +(a - ry > 180), 0, x2, y2]];
    } else {
      res = [["M", x, y], ["m", 0, -ry], ["a", rx, ry, 0, 1, 1, 0, 2 * ry], ["a", rx, ry, 0, 1, 1, 0, -2 * ry], ["z"]];
    }

    res.toString = toString;
    return res;
  }

  var unit2px = Snap._unit2px,
      getPath = {
    path: function path(el) {
      return el.attr("path");
    },
    circle: function circle(el) {
      var attr = unit2px(el);
      return ellipsePath(attr.cx, attr.cy, attr.r);
    },
    ellipse: function ellipse(el) {
      var attr = unit2px(el);
      return ellipsePath(attr.cx || 0, attr.cy || 0, attr.rx, attr.ry);
    },
    rect: function rect(el) {
      var attr = unit2px(el);
      return rectPath(attr.x || 0, attr.y || 0, attr.width, attr.height, attr.rx, attr.ry);
    },
    image: function image(el) {
      var attr = unit2px(el);
      return rectPath(attr.x || 0, attr.y || 0, attr.width, attr.height);
    },
    line: function line(el) {
      return "M" + [el.attr("x1") || 0, el.attr("y1") || 0, el.attr("x2"), el.attr("y2")];
    },
    polyline: function polyline(el) {
      return "M" + el.attr("points");
    },
    polygon: function polygon(el) {
      return "M" + el.attr("points") + "z";
    },
    deflt: function deflt(el) {
      var bbox = el.node.getBBox();
      return rectPath(bbox.x, bbox.y, bbox.width, bbox.height);
    }
  };

  function pathToRelative(pathArray) {
    var pth = paths(pathArray),
        lowerCase = String.prototype.toLowerCase;

    if (pth.rel) {
      return pathClone(pth.rel);
    }

    if (!Snap.is(pathArray, "array") || !Snap.is(pathArray && pathArray[0], "array")) {
      pathArray = Snap.parsePathString(pathArray);
    }

    var res = [],
        x = 0,
        y = 0,
        mx = 0,
        my = 0,
        start = 0;

    if (pathArray[0][0] == "M") {
      x = pathArray[0][1];
      y = pathArray[0][2];
      mx = x;
      my = y;
      start++;
      res.push(["M", x, y]);
    }

    for (var i = start, ii = pathArray.length; i < ii; i++) {
      var r = res[i] = [],
          pa = pathArray[i];

      if (pa[0] != lowerCase.call(pa[0])) {
        r[0] = lowerCase.call(pa[0]);

        switch (r[0]) {
          case "a":
            r[1] = pa[1];
            r[2] = pa[2];
            r[3] = pa[3];
            r[4] = pa[4];
            r[5] = pa[5];
            r[6] = +(pa[6] - x).toFixed(3);
            r[7] = +(pa[7] - y).toFixed(3);
            break;

          case "v":
            r[1] = +(pa[1] - y).toFixed(3);
            break;

          case "m":
            mx = pa[1];
            my = pa[2];

          default:
            for (var j = 1, jj = pa.length; j < jj; j++) {
              r[j] = +(pa[j] - (j % 2 ? x : y)).toFixed(3);
            }

        }
      } else {
        r = res[i] = [];

        if (pa[0] == "m") {
          mx = pa[1] + x;
          my = pa[2] + y;
        }

        for (var k = 0, kk = pa.length; k < kk; k++) {
          res[i][k] = pa[k];
        }
      }

      var len = res[i].length;

      switch (res[i][0]) {
        case "z":
          x = mx;
          y = my;
          break;

        case "h":
          x += +res[i][len - 1];
          break;

        case "v":
          y += +res[i][len - 1];
          break;

        default:
          x += +res[i][len - 2];
          y += +res[i][len - 1];
      }
    }

    res.toString = toString;
    pth.rel = pathClone(res);
    return res;
  }

  function pathToAbsolute(pathArray) {
    var pth = paths(pathArray);

    if (pth.abs) {
      return pathClone(pth.abs);
    }

    if (!is(pathArray, "array") || !is(pathArray && pathArray[0], "array")) {
      // rough assumption
      pathArray = Snap.parsePathString(pathArray);
    }

    if (!pathArray || !pathArray.length) {
      return [["M", 0, 0]];
    }

    var res = [],
        x = 0,
        y = 0,
        mx = 0,
        my = 0,
        start = 0,
        pa0;

    if (pathArray[0][0] == "M") {
      x = +pathArray[0][1];
      y = +pathArray[0][2];
      mx = x;
      my = y;
      start++;
      res[0] = ["M", x, y];
    }

    var crz = pathArray.length == 3 && pathArray[0][0] == "M" && pathArray[1][0].toUpperCase() == "R" && pathArray[2][0].toUpperCase() == "Z";

    for (var r, pa, i = start, ii = pathArray.length; i < ii; i++) {
      res.push(r = []);
      pa = pathArray[i];
      pa0 = pa[0];

      if (pa0 != pa0.toUpperCase()) {
        r[0] = pa0.toUpperCase();

        switch (r[0]) {
          case "A":
            r[1] = pa[1];
            r[2] = pa[2];
            r[3] = pa[3];
            r[4] = pa[4];
            r[5] = pa[5];
            r[6] = +pa[6] + x;
            r[7] = +pa[7] + y;
            break;

          case "V":
            r[1] = +pa[1] + y;
            break;

          case "H":
            r[1] = +pa[1] + x;
            break;

          case "R":
            var dots = [x, y].concat(pa.slice(1));

            for (var j = 2, jj = dots.length; j < jj; j++) {
              dots[j] = +dots[j] + x;
              dots[++j] = +dots[j] + y;
            }

            res.pop();
            res = res.concat(catmullRom2bezier(dots, crz));
            break;

          case "O":
            res.pop();
            dots = ellipsePath(x, y, pa[1], pa[2]);
            dots.push(dots[0]);
            res = res.concat(dots);
            break;

          case "U":
            res.pop();
            res = res.concat(ellipsePath(x, y, pa[1], pa[2], pa[3]));
            r = ["U"].concat(res[res.length - 1].slice(-2));
            break;

          case "M":
            mx = +pa[1] + x;
            my = +pa[2] + y;

          default:
            for (j = 1, jj = pa.length; j < jj; j++) {
              r[j] = +pa[j] + (j % 2 ? x : y);
            }

        }
      } else if (pa0 == "R") {
        dots = [x, y].concat(pa.slice(1));
        res.pop();
        res = res.concat(catmullRom2bezier(dots, crz));
        r = ["R"].concat(pa.slice(-2));
      } else if (pa0 == "O") {
        res.pop();
        dots = ellipsePath(x, y, pa[1], pa[2]);
        dots.push(dots[0]);
        res = res.concat(dots);
      } else if (pa0 == "U") {
        res.pop();
        res = res.concat(ellipsePath(x, y, pa[1], pa[2], pa[3]));
        r = ["U"].concat(res[res.length - 1].slice(-2));
      } else {
        for (var k = 0, kk = pa.length; k < kk; k++) {
          r[k] = pa[k];
        }
      }

      pa0 = pa0.toUpperCase();

      if (pa0 != "O") {
        switch (r[0]) {
          case "Z":
            x = +mx;
            y = +my;
            break;

          case "H":
            x = r[1];
            break;

          case "V":
            y = r[1];
            break;

          case "M":
            mx = r[r.length - 2];
            my = r[r.length - 1];

          default:
            x = r[r.length - 2];
            y = r[r.length - 1];
        }
      }
    }

    res.toString = toString;
    pth.abs = pathClone(res);
    return res;
  }

  function l2c(x1, y1, x2, y2) {
    return [x1, y1, x2, y2, x2, y2];
  }

  function q2c(x1, y1, ax, ay, x2, y2) {
    var _13 = 1 / 3,
        _23 = 2 / 3;

    return [_13 * x1 + _23 * ax, _13 * y1 + _23 * ay, _13 * x2 + _23 * ax, _13 * y2 + _23 * ay, x2, y2];
  }

  function a2c(x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) {
    // for more information of where this math came from visit:
    // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
    var _120 = PI * 120 / 180,
        rad = PI / 180 * (+angle || 0),
        res = [],
        xy,
        rotate = Snap._.cacher(function (x, y, rad) {
      var X = x * math.cos(rad) - y * math.sin(rad),
          Y = x * math.sin(rad) + y * math.cos(rad);
      return {
        x: X,
        y: Y
      };
    });

    if (!rx || !ry) {
      return [x1, y1, x2, y2, x2, y2];
    }

    if (!recursive) {
      xy = rotate(x1, y1, -rad);
      x1 = xy.x;
      y1 = xy.y;
      xy = rotate(x2, y2, -rad);
      x2 = xy.x;
      y2 = xy.y;
      var cos = math.cos(PI / 180 * angle),
          sin = math.sin(PI / 180 * angle),
          x = (x1 - x2) / 2,
          y = (y1 - y2) / 2;
      var h = x * x / (rx * rx) + y * y / (ry * ry);

      if (h > 1) {
        h = math.sqrt(h);
        rx = h * rx;
        ry = h * ry;
      }

      var rx2 = rx * rx,
          ry2 = ry * ry,
          k = (large_arc_flag == sweep_flag ? -1 : 1) * math.sqrt(abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x))),
          cx = k * rx * y / ry + (x1 + x2) / 2,
          cy = k * -ry * x / rx + (y1 + y2) / 2,
          f1 = math.asin(((y1 - cy) / ry).toFixed(9)),
          f2 = math.asin(((y2 - cy) / ry).toFixed(9));
      f1 = x1 < cx ? PI - f1 : f1;
      f2 = x2 < cx ? PI - f2 : f2;
      f1 < 0 && (f1 = PI * 2 + f1);
      f2 < 0 && (f2 = PI * 2 + f2);

      if (sweep_flag && f1 > f2) {
        f1 = f1 - PI * 2;
      }

      if (!sweep_flag && f2 > f1) {
        f2 = f2 - PI * 2;
      }
    } else {
      f1 = recursive[0];
      f2 = recursive[1];
      cx = recursive[2];
      cy = recursive[3];
    }

    var df = f2 - f1;

    if (abs(df) > _120) {
      var f2old = f2,
          x2old = x2,
          y2old = y2;
      f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1);
      x2 = cx + rx * math.cos(f2);
      y2 = cy + ry * math.sin(f2);
      res = a2c(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [f2, f2old, cx, cy]);
    }

    df = f2 - f1;
    var c1 = math.cos(f1),
        s1 = math.sin(f1),
        c2 = math.cos(f2),
        s2 = math.sin(f2),
        t = math.tan(df / 4),
        hx = 4 / 3 * rx * t,
        hy = 4 / 3 * ry * t,
        m1 = [x1, y1],
        m2 = [x1 + hx * s1, y1 - hy * c1],
        m3 = [x2 + hx * s2, y2 - hy * c2],
        m4 = [x2, y2];
    m2[0] = 2 * m1[0] - m2[0];
    m2[1] = 2 * m1[1] - m2[1];

    if (recursive) {
      return [m2, m3, m4].concat(res);
    } else {
      res = [m2, m3, m4].concat(res).join().split(",");
      var newres = [];

      for (var i = 0, ii = res.length; i < ii; i++) {
        newres[i] = i % 2 ? rotate(res[i - 1], res[i], rad).y : rotate(res[i], res[i + 1], rad).x;
      }

      return newres;
    }
  }

  function findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
    var t1 = 1 - t;
    return {
      x: pow(t1, 3) * p1x + pow(t1, 2) * 3 * t * c1x + t1 * 3 * t * t * c2x + pow(t, 3) * p2x,
      y: pow(t1, 3) * p1y + pow(t1, 2) * 3 * t * c1y + t1 * 3 * t * t * c2y + pow(t, 3) * p2y
    };
  } // Returns bounding box of cubic bezier curve.
  // Source: http://blog.hackers-cafe.net/2009/06/how-to-calculate-bezier-curves-bounding.html
  // Original version: NISHIO Hirokazu
  // Modifications: https://github.com/timo22345


  function curveDim(x0, y0, x1, y1, x2, y2, x3, y3) {
    var tvalues = [],
        bounds = [[], []],
        a,
        b,
        c,
        t,
        t1,
        t2,
        b2ac,
        sqrtb2ac;

    for (var i = 0; i < 2; ++i) {
      if (i == 0) {
        b = 6 * x0 - 12 * x1 + 6 * x2;
        a = -3 * x0 + 9 * x1 - 9 * x2 + 3 * x3;
        c = 3 * x1 - 3 * x0;
      } else {
        b = 6 * y0 - 12 * y1 + 6 * y2;
        a = -3 * y0 + 9 * y1 - 9 * y2 + 3 * y3;
        c = 3 * y1 - 3 * y0;
      }

      if (abs(a) < 1e-12) {
        if (abs(b) < 1e-12) {
          continue;
        }

        t = -c / b;

        if (0 < t && t < 1) {
          tvalues.push(t);
        }

        continue;
      }

      b2ac = b * b - 4 * c * a;
      sqrtb2ac = math.sqrt(b2ac);

      if (b2ac < 0) {
        continue;
      }

      t1 = (-b + sqrtb2ac) / (2 * a);

      if (0 < t1 && t1 < 1) {
        tvalues.push(t1);
      }

      t2 = (-b - sqrtb2ac) / (2 * a);

      if (0 < t2 && t2 < 1) {
        tvalues.push(t2);
      }
    }

    var x,
        y,
        j = tvalues.length,
        jlen = j,
        mt;

    while (j--) {
      t = tvalues[j];
      mt = 1 - t;
      bounds[0][j] = mt * mt * mt * x0 + 3 * mt * mt * t * x1 + 3 * mt * t * t * x2 + t * t * t * x3;
      bounds[1][j] = mt * mt * mt * y0 + 3 * mt * mt * t * y1 + 3 * mt * t * t * y2 + t * t * t * y3;
    }

    bounds[0][jlen] = x0;
    bounds[1][jlen] = y0;
    bounds[0][jlen + 1] = x3;
    bounds[1][jlen + 1] = y3;
    bounds[0].length = bounds[1].length = jlen + 2;
    return {
      min: {
        x: mmin.apply(0, bounds[0]),
        y: mmin.apply(0, bounds[1])
      },
      max: {
        x: mmax.apply(0, bounds[0]),
        y: mmax.apply(0, bounds[1])
      }
    };
  }

  function path2curve(path, path2) {
    var pth = !path2 && paths(path);

    if (!path2 && pth.curve) {
      return pathClone(pth.curve);
    }

    var p = pathToAbsolute(path),
        p2 = path2 && pathToAbsolute(path2),
        attrs = {
      x: 0,
      y: 0,
      bx: 0,
      by: 0,
      X: 0,
      Y: 0,
      qx: null,
      qy: null
    },
        attrs2 = {
      x: 0,
      y: 0,
      bx: 0,
      by: 0,
      X: 0,
      Y: 0,
      qx: null,
      qy: null
    },
        processPath = function processPath(path, d, pcom) {
      var nx, ny;

      if (!path) {
        return ["C", d.x, d.y, d.x, d.y, d.x, d.y];
      }

      !(path[0] in {
        T: 1,
        Q: 1
      }) && (d.qx = d.qy = null);

      switch (path[0]) {
        case "M":
          d.X = path[1];
          d.Y = path[2];
          break;

        case "A":
          path = ["C"].concat(a2c.apply(0, [d.x, d.y].concat(path.slice(1))));
          break;

        case "S":
          if (pcom == "C" || pcom == "S") {
            // In "S" case we have to take into account, if the previous command is C/S.
            nx = d.x * 2 - d.bx; // And reflect the previous

            ny = d.y * 2 - d.by; // command's control point relative to the current point.
          } else {
            // or some else or nothing
            nx = d.x;
            ny = d.y;
          }

          path = ["C", nx, ny].concat(path.slice(1));
          break;

        case "T":
          if (pcom == "Q" || pcom == "T") {
            // In "T" case we have to take into account, if the previous command is Q/T.
            d.qx = d.x * 2 - d.qx; // And make a reflection similar

            d.qy = d.y * 2 - d.qy; // to case "S".
          } else {
            // or something else or nothing
            d.qx = d.x;
            d.qy = d.y;
          }

          path = ["C"].concat(q2c(d.x, d.y, d.qx, d.qy, path[1], path[2]));
          break;

        case "Q":
          d.qx = path[1];
          d.qy = path[2];
          path = ["C"].concat(q2c(d.x, d.y, path[1], path[2], path[3], path[4]));
          break;

        case "L":
          path = ["C"].concat(l2c(d.x, d.y, path[1], path[2]));
          break;

        case "H":
          path = ["C"].concat(l2c(d.x, d.y, path[1], d.y));
          break;

        case "V":
          path = ["C"].concat(l2c(d.x, d.y, d.x, path[1]));
          break;

        case "Z":
          path = ["C"].concat(l2c(d.x, d.y, d.X, d.Y));
          break;
      }

      return path;
    },
        fixArc = function fixArc(pp, i) {
      if (pp[i].length > 7) {
        pp[i].shift();
        var pi = pp[i];

        while (pi.length) {
          pcoms1[i] = "A"; // if created multiple C:s, their original seg is saved

          p2 && (pcoms2[i] = "A"); // the same as above

          pp.splice(i++, 0, ["C"].concat(pi.splice(0, 6)));
        }

        pp.splice(i, 1);
        ii = mmax(p.length, p2 && p2.length || 0);
      }
    },
        fixM = function fixM(path1, path2, a1, a2, i) {
      if (path1 && path2 && path1[i][0] == "M" && path2[i][0] != "M") {
        path2.splice(i, 0, ["M", a2.x, a2.y]);
        a1.bx = 0;
        a1.by = 0;
        a1.x = path1[i][1];
        a1.y = path1[i][2];
        ii = mmax(p.length, p2 && p2.length || 0);
      }
    },
        pcoms1 = [],
        // path commands of original path p
    pcoms2 = [],
        // path commands of original path p2
    pfirst = "",
        // temporary holder for original path command
    pcom = ""; // holder for previous path command of original path


    for (var i = 0, ii = mmax(p.length, p2 && p2.length || 0); i < ii; i++) {
      p[i] && (pfirst = p[i][0]); // save current path command

      if (pfirst != "C") // C is not saved yet, because it may be result of conversion
        {
          pcoms1[i] = pfirst; // Save current path command

          i && (pcom = pcoms1[i - 1]); // Get previous path command pcom
        }

      p[i] = processPath(p[i], attrs, pcom); // Previous path command is inputted to processPath

      if (pcoms1[i] != "A" && pfirst == "C") pcoms1[i] = "C"; // A is the only command
      // which may produce multiple C:s
      // so we have to make sure that C is also C in original path

      fixArc(p, i); // fixArc adds also the right amount of A:s to pcoms1

      if (p2) {
        // the same procedures is done to p2
        p2[i] && (pfirst = p2[i][0]);

        if (pfirst != "C") {
          pcoms2[i] = pfirst;
          i && (pcom = pcoms2[i - 1]);
        }

        p2[i] = processPath(p2[i], attrs2, pcom);

        if (pcoms2[i] != "A" && pfirst == "C") {
          pcoms2[i] = "C";
        }

        fixArc(p2, i);
      }

      fixM(p, p2, attrs, attrs2, i);
      fixM(p2, p, attrs2, attrs, i);
      var seg = p[i],
          seg2 = p2 && p2[i],
          seglen = seg.length,
          seg2len = p2 && seg2.length;
      attrs.x = seg[seglen - 2];
      attrs.y = seg[seglen - 1];
      attrs.bx = toFloat(seg[seglen - 4]) || attrs.x;
      attrs.by = toFloat(seg[seglen - 3]) || attrs.y;
      attrs2.bx = p2 && (toFloat(seg2[seg2len - 4]) || attrs2.x);
      attrs2.by = p2 && (toFloat(seg2[seg2len - 3]) || attrs2.y);
      attrs2.x = p2 && seg2[seg2len - 2];
      attrs2.y = p2 && seg2[seg2len - 1];
    }

    if (!p2) {
      pth.curve = pathClone(p);
    }

    return p2 ? [p, p2] : p;
  }

  function mapPath(path, matrix) {
    if (!matrix) {
      return path;
    }

    var x, y, i, j, ii, jj, pathi;
    path = path2curve(path);

    for (i = 0, ii = path.length; i < ii; i++) {
      pathi = path[i];

      for (j = 1, jj = pathi.length; j < jj; j += 2) {
        x = matrix.x(pathi[j], pathi[j + 1]);
        y = matrix.y(pathi[j], pathi[j + 1]);
        pathi[j] = x;
        pathi[j + 1] = y;
      }
    }

    return path;
  } // http://schepers.cc/getting-to-the-point


  function catmullRom2bezier(crp, z) {
    var d = [];

    for (var i = 0, iLen = crp.length; iLen - 2 * !z > i; i += 2) {
      var p = [{
        x: +crp[i - 2],
        y: +crp[i - 1]
      }, {
        x: +crp[i],
        y: +crp[i + 1]
      }, {
        x: +crp[i + 2],
        y: +crp[i + 3]
      }, {
        x: +crp[i + 4],
        y: +crp[i + 5]
      }];

      if (z) {
        if (!i) {
          p[0] = {
            x: +crp[iLen - 2],
            y: +crp[iLen - 1]
          };
        } else if (iLen - 4 == i) {
          p[3] = {
            x: +crp[0],
            y: +crp[1]
          };
        } else if (iLen - 2 == i) {
          p[2] = {
            x: +crp[0],
            y: +crp[1]
          };
          p[3] = {
            x: +crp[2],
            y: +crp[3]
          };
        }
      } else {
        if (iLen - 4 == i) {
          p[3] = p[2];
        } else if (!i) {
          p[0] = {
            x: +crp[i],
            y: +crp[i + 1]
          };
        }
      }

      d.push(["C", (-p[0].x + 6 * p[1].x + p[2].x) / 6, (-p[0].y + 6 * p[1].y + p[2].y) / 6, (p[1].x + 6 * p[2].x - p[3].x) / 6, (p[1].y + 6 * p[2].y - p[3].y) / 6, p[2].x, p[2].y]);
    }

    return d;
  } // export


  Snap.path = paths;
  /*\
   * Snap.path.getTotalLength
   [ method ]
   **
   * Returns the length of the given path in pixels
   **
   - path (string) SVG path string
   **
   = (number) length
  \*/

  Snap.path.getTotalLength = getTotalLength;
  /*\
   * Snap.path.getPointAtLength
   [ method ]
   **
   * Returns the coordinates of the point located at the given length along the given path
   **
   - path (string) SVG path string
   - length (number) length, in pixels, from the start of the path, excluding non-rendering jumps
   **
   = (object) representation of the point:
   o {
   o     x: (number) x coordinate,
   o     y: (number) y coordinate,
   o     alpha: (number) angle of derivative
   o }
  \*/

  Snap.path.getPointAtLength = getPointAtLength;
  /*\
   * Snap.path.getSubpath
   [ method ]
   **
   * Returns the subpath of a given path between given start and end lengths
   **
   - path (string) SVG path string
   - from (number) length, in pixels, from the start of the path to the start of the segment
   - to (number) length, in pixels, from the start of the path to the end of the segment
   **
   = (string) path string definition for the segment
  \*/

  Snap.path.getSubpath = function (path, from, to) {
    if (this.getTotalLength(path) - to < 1e-6) {
      return getSubpathsAtLength(path, from).end;
    }

    var a = getSubpathsAtLength(path, to, 1);
    return from ? getSubpathsAtLength(a, from).end : a;
  };
  /*\
   * Element.getTotalLength
   [ method ]
   **
   * Returns the length of the path in pixels (only works for `path` elements)
   = (number) length
  \*/


  elproto.getTotalLength = function () {
    if (this.node.getTotalLength) {
      return this.node.getTotalLength();
    }
  }; // SIERRA Element.getPointAtLength()/Element.getTotalLength(): If a <path> is broken into different segments, is the jump distance to the new coordinates set by the _M_ or _m_ commands calculated as part of the path's total length?

  /*\
   * Element.getPointAtLength
   [ method ]
   **
   * Returns coordinates of the point located at the given length on the given path (only works for `path` elements)
   **
   - length (number) length, in pixels, from the start of the path, excluding non-rendering jumps
   **
   = (object) representation of the point:
   o {
   o     x: (number) x coordinate,
   o     y: (number) y coordinate,
   o     alpha: (number) angle of derivative
   o }
  \*/


  elproto.getPointAtLength = function (length) {
    return getPointAtLength(this.attr("d"), length);
  }; // SIERRA Element.getSubpath(): Similar to the problem for Element.getPointAtLength(). Unclear how this would work for a segmented path. Overall, the concept of _subpath_ and what I'm calling a _segment_ (series of non-_M_ or _Z_ commands) is unclear.

  /*\
   * Element.getSubpath
   [ method ]
   **
   * Returns subpath of a given element from given start and end lengths (only works for `path` elements)
   **
   - from (number) length, in pixels, from the start of the path to the start of the segment
   - to (number) length, in pixels, from the start of the path to the end of the segment
   **
   = (string) path string definition for the segment
  \*/


  elproto.getSubpath = function (from, to) {
    return Snap.path.getSubpath(this.attr("d"), from, to);
  };

  Snap._.box = box;
  /*\
   * Snap.path.findDotsAtSegment
   [ method ]
   **
   * Utility method
   **
   * Finds dot coordinates on the given cubic beziér curve at the given t
   - p1x (number) x of the first point of the curve
   - p1y (number) y of the first point of the curve
   - c1x (number) x of the first anchor of the curve
   - c1y (number) y of the first anchor of the curve
   - c2x (number) x of the second anchor of the curve
   - c2y (number) y of the second anchor of the curve
   - p2x (number) x of the second point of the curve
   - p2y (number) y of the second point of the curve
   - t (number) position on the curve (0..1)
   = (object) point information in format:
   o {
   o     x: (number) x coordinate of the point,
   o     y: (number) y coordinate of the point,
   o     m: {
   o         x: (number) x coordinate of the left anchor,
   o         y: (number) y coordinate of the left anchor
   o     },
   o     n: {
   o         x: (number) x coordinate of the right anchor,
   o         y: (number) y coordinate of the right anchor
   o     },
   o     start: {
   o         x: (number) x coordinate of the start of the curve,
   o         y: (number) y coordinate of the start of the curve
   o     },
   o     end: {
   o         x: (number) x coordinate of the end of the curve,
   o         y: (number) y coordinate of the end of the curve
   o     },
   o     alpha: (number) angle of the curve derivative at the point
   o }
  \*/

  Snap.path.findDotsAtSegment = findDotsAtSegment;
  /*\
   * Snap.path.bezierBBox
   [ method ]
   **
   * Utility method
   **
   * Returns the bounding box of a given cubic beziér curve
   - p1x (number) x of the first point of the curve
   - p1y (number) y of the first point of the curve
   - c1x (number) x of the first anchor of the curve
   - c1y (number) y of the first anchor of the curve
   - c2x (number) x of the second anchor of the curve
   - c2y (number) y of the second anchor of the curve
   - p2x (number) x of the second point of the curve
   - p2y (number) y of the second point of the curve
   * or
   - bez (array) array of six points for beziér curve
   = (object) bounding box
   o {
   o     x: (number) x coordinate of the left top point of the box,
   o     y: (number) y coordinate of the left top point of the box,
   o     x2: (number) x coordinate of the right bottom point of the box,
   o     y2: (number) y coordinate of the right bottom point of the box,
   o     width: (number) width of the box,
   o     height: (number) height of the box
   o }
  \*/

  Snap.path.bezierBBox = bezierBBox;
  /*\
   * Snap.path.isPointInsideBBox
   [ method ]
   **
   * Utility method
   **
   * Returns `true` if given point is inside bounding box
   - bbox (string) bounding box
   - x (string) x coordinate of the point
   - y (string) y coordinate of the point
   = (boolean) `true` if point is inside
  \*/

  Snap.path.isPointInsideBBox = isPointInsideBBox;

  Snap.closest = function (x, y, X, Y) {
    var r = 100,
        b = box(x - r / 2, y - r / 2, r, r),
        inside = [],
        getter = X[0].hasOwnProperty("x") ? function (i) {
      return {
        x: X[i].x,
        y: X[i].y
      };
    } : function (i) {
      return {
        x: X[i],
        y: Y[i]
      };
    },
        found = 0;

    while (r <= 1e6 && !found) {
      for (var i = 0, ii = X.length; i < ii; i++) {
        var xy = getter(i);

        if (isPointInsideBBox(b, xy.x, xy.y)) {
          found++;
          inside.push(xy);
          break;
        }
      }

      if (!found) {
        r *= 2;
        b = box(x - r / 2, y - r / 2, r, r);
      }
    }

    if (r == 1e6) {
      return;
    }

    var len = Infinity,
        res;

    for (i = 0, ii = inside.length; i < ii; i++) {
      var l = Snap.len(x, y, inside[i].x, inside[i].y);

      if (len > l) {
        len = l;
        inside[i].len = l;
        res = inside[i];
      }
    }

    return res;
  };
  /*\
   * Snap.path.isBBoxIntersect
   [ method ]
   **
   * Utility method
   **
   * Returns `true` if two bounding boxes intersect
   - bbox1 (string) first bounding box
   - bbox2 (string) second bounding box
   = (boolean) `true` if bounding boxes intersect
  \*/


  Snap.path.isBBoxIntersect = isBBoxIntersect;
  /*\
   * Snap.path.intersection
   [ method ]
   **
   * Utility method
   **
   * Finds intersections of two paths
   - path1 (string) path string
   - path2 (string) path string
   = (array) dots of intersection
   o [
   o     {
   o         x: (number) x coordinate of the point,
   o         y: (number) y coordinate of the point,
   o         t1: (number) t value for segment of path1,
   o         t2: (number) t value for segment of path2,
   o         segment1: (number) order number for segment of path1,
   o         segment2: (number) order number for segment of path2,
   o         bez1: (array) eight coordinates representing beziér curve for the segment of path1,
   o         bez2: (array) eight coordinates representing beziér curve for the segment of path2
   o     }
   o ]
  \*/

  Snap.path.intersection = pathIntersection;
  Snap.path.intersectionNumber = pathIntersectionNumber;
  /*\
   * Snap.path.isPointInside
   [ method ]
   **
   * Utility method
   **
   * Returns `true` if given point is inside a given closed path.
   *
   * Note: fill mode doesn’t affect the result of this method.
   - path (string) path string
   - x (number) x of the point
   - y (number) y of the point
   = (boolean) `true` if point is inside the path
  \*/

  Snap.path.isPointInside = isPointInsidePath;
  /*\
   * Snap.path.getBBox
   [ method ]
   **
   * Utility method
   **
   * Returns the bounding box of a given path
   - path (string) path string
   = (object) bounding box
   o {
   o     x: (number) x coordinate of the left top point of the box,
   o     y: (number) y coordinate of the left top point of the box,
   o     x2: (number) x coordinate of the right bottom point of the box,
   o     y2: (number) y coordinate of the right bottom point of the box,
   o     width: (number) width of the box,
   o     height: (number) height of the box
   o }
  \*/

  Snap.path.getBBox = pathBBox;
  Snap.path.get = getPath;
  /*\
   * Snap.path.toRelative
   [ method ]
   **
   * Utility method
   **
   * Converts path coordinates into relative values
   - path (string) path string
   = (array) path string
  \*/

  Snap.path.toRelative = pathToRelative;
  /*\
   * Snap.path.toAbsolute
   [ method ]
   **
   * Utility method
   **
   * Converts path coordinates into absolute values
   - path (string) path string
   = (array) path string
  \*/

  Snap.path.toAbsolute = pathToAbsolute;
  /*\
   * Snap.path.toCubic
   [ method ]
   **
   * Utility method
   **
   * Converts path to a new path where all segments are cubic beziér curves
   - pathString (string|array) path string or array of segments
   = (array) array of segments
  \*/

  Snap.path.toCubic = path2curve;
  /*\
   * Snap.path.map
   [ method ]
   **
   * Transform the path string with the given matrix
   - path (string) path string
   - matrix (object) see @Matrix
   = (string) transformed path string
  \*/

  Snap.path.map = mapPath;
  Snap.path.toString = toString;
  Snap.path.clone = pathClone;
}); // Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

snap_svg_Snap.plugin(function (Snap, Element, Paper, glob) {
  var mmax = Math.max,
      mmin = Math.min; // Set

  var Set = function Set(items) {
    this.items = [];
    this.bindings = {};
    this.length = 0;
    this.type = "set";

    if (items) {
      for (var i = 0, ii = items.length; i < ii; i++) {
        if (items[i]) {
          this[this.items.length] = this.items[this.items.length] = items[i];
          this.length++;
        }
      }
    }
  },
      setproto = Set.prototype;
  /*\
   * Set.push
   [ method ]
   **
   * Adds each argument to the current set
   = (object) original element
  \*/


  setproto.push = function () {
    var item, len;

    for (var i = 0, ii = arguments.length; i < ii; i++) {
      item = arguments[i];

      if (item) {
        len = this.items.length;
        this[len] = this.items[len] = item;
        this.length++;
      }
    }

    return this;
  };
  /*\
   * Set.pop
   [ method ]
   **
   * Removes last element and returns it
   = (object) element
  \*/


  setproto.pop = function () {
    this.length && delete this[this.length--];
    return this.items.pop();
  };
  /*\
   * Set.forEach
   [ method ]
   **
   * Executes given function for each element in the set
   *
   * If the function returns `false`, the loop stops running.
   **
   - callback (function) function to run
   - thisArg (object) context object for the callback
   = (object) Set object
  \*/


  setproto.forEach = function (callback, thisArg) {
    for (var i = 0, ii = this.items.length; i < ii; i++) {
      if (callback.call(thisArg, this.items[i], i) === false) {
        return this;
      }
    }

    return this;
  };
  /*\
   * Set.animate
   [ method ]
   **
   * Animates each element in set in sync.
   *
   **
   - attrs (object) key-value pairs of destination attributes
   - duration (number) duration of the animation in milliseconds
   - easing (function) #optional easing function from @mina or custom
   - callback (function) #optional callback function that executes when the animation ends
   * or
   - animation (array) array of animation parameter for each element in set in format `[attrs, duration, easing, callback]`
   > Usage
   | // animate all elements in set to radius 10
   | set.animate({r: 10}, 500, mina.easein);
   | // or
   | // animate first element to radius 10, but second to radius 20 and in different time
   | set.animate([{r: 10}, 500, mina.easein], [{r: 20}, 1500, mina.easein]);
   = (Element) the current element
  \*/


  setproto.animate = function (attrs, ms, easing, callback) {
    if (typeof easing == "function" && !easing.length) {
      callback = easing;
      easing = Snap_mina.linear;
    }

    if (attrs instanceof Snap._.Animation) {
      callback = attrs.callback;
      easing = attrs.easing;
      ms = easing.dur;
      attrs = attrs.attr;
    }

    var args = arguments;

    if (Snap.is(attrs, "array") && Snap.is(args[args.length - 1], "array")) {
      var each = true;
    }

    var begin,
        handler = function handler() {
      if (begin) {
        this.b = begin;
      } else {
        begin = this.b;
      }
    },
        cb = 0,
        set = this,
        callbacker = callback && function () {
      if (++cb == set.length) {
        callback.call(this);
      }
    };

    return this.forEach(function (el, i) {
      eve_default.a.once("snap.animcreated." + el.id, handler);

      if (each) {
        args[i] && el.animate.apply(el, args[i]);
      } else {
        el.animate(attrs, ms, easing, callbacker);
      }
    });
  };
  /*\
   * Set.remove
   [ method ]
   **
   * Removes all children of the set.
   *
   = (object) Set object
  \*/


  setproto.remove = function () {
    while (this.length) {
      this.pop().remove();
    }

    return this;
  };
  /*\
   * Set.bind
   [ method ]
   **
   * Specifies how to handle a specific attribute when applied
   * to a set.
   *
   **
   - attr (string) attribute name
   - callback (function) function to run
   * or
   - attr (string) attribute name
   - element (Element) specific element in the set to apply the attribute to
   * or
   - attr (string) attribute name
   - element (Element) specific element in the set to apply the attribute to
   - eattr (string) attribute on the element to bind the attribute to
   = (object) Set object
  \*/


  setproto.bind = function (attr, a, b) {
    var data = {};

    if (typeof a == "function") {
      this.bindings[attr] = a;
    } else {
      var aname = b || attr;

      this.bindings[attr] = function (v) {
        data[aname] = v;
        a.attr(data);
      };
    }

    return this;
  };
  /*\
   * Set.attr
   [ method ]
   **
   * Equivalent of @Element.attr.
   = (object) Set object
  \*/


  setproto.attr = function (value) {
    var unbound = {};

    for (var k in value) {
      if (this.bindings[k]) {
        this.bindings[k](value[k]);
      } else {
        unbound[k] = value[k];
      }
    }

    for (var i = 0, ii = this.items.length; i < ii; i++) {
      this.items[i].attr(unbound);
    }

    return this;
  };
  /*\
   * Set.clear
   [ method ]
   **
   * Removes all elements from the set
  \*/


  setproto.clear = function () {
    while (this.length) {
      this.pop();
    }
  };
  /*\
   * Set.splice
   [ method ]
   **
   * Removes range of elements from the set
   **
   - index (number) position of the deletion
   - count (number) number of element to remove
   - insertion… (object) #optional elements to insert
   = (object) set elements that were deleted
  \*/


  setproto.splice = function (index, count, insertion) {
    index = index < 0 ? mmax(this.length + index, 0) : index;
    count = mmax(0, mmin(this.length - index, count));
    var tail = [],
        todel = [],
        args = [],
        i;

    for (i = 2; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    for (i = 0; i < count; i++) {
      todel.push(this[index + i]);
    }

    for (; i < this.length - index; i++) {
      tail.push(this[index + i]);
    }

    var arglen = args.length;

    for (i = 0; i < arglen + tail.length; i++) {
      this.items[index + i] = this[index + i] = i < arglen ? args[i] : tail[i - arglen];
    }

    i = this.items.length = this.length -= count - arglen;

    while (this[i]) {
      delete this[i++];
    }

    return new Set(todel);
  };
  /*\
   * Set.exclude
   [ method ]
   **
   * Removes given element from the set
   **
   - element (object) element to remove
   = (boolean) `true` if object was found and removed from the set
  \*/


  setproto.exclude = function (el) {
    for (var i = 0, ii = this.length; i < ii; i++) {
      if (this[i] == el) {
        this.splice(i, 1);
        return true;
      }
    }

    return false;
  };
  /*\
   * Set.insertAfter
   [ method ]
   **
   * Inserts set elements after given element.
   **
   - element (object) set will be inserted after this element
   = (object) Set object
  \*/


  setproto.insertAfter = function (el) {
    var i = this.items.length;

    while (i--) {
      this.items[i].insertAfter(el);
    }

    return this;
  };
  /*\
   * Set.getBBox
   [ method ]
   **
   * Union of all bboxes of the set. See @Element.getBBox.
   = (object) bounding box descriptor. See @Element.getBBox.
  \*/


  setproto.getBBox = function () {
    var x = [],
        y = [],
        x2 = [],
        y2 = [];

    for (var i = this.items.length; i--;) {
      if (!this.items[i].removed) {
        var box = this.items[i].getBBox();
        x.push(box.x);
        y.push(box.y);
        x2.push(box.x + box.width);
        y2.push(box.y + box.height);
      }
    }

    x = mmin.apply(0, x);
    y = mmin.apply(0, y);
    x2 = mmax.apply(0, x2);
    y2 = mmax.apply(0, y2);
    return {
      x: x,
      y: y,
      x2: x2,
      y2: y2,
      width: x2 - x,
      height: y2 - y,
      cx: x + (x2 - x) / 2,
      cy: y + (y2 - y) / 2
    };
  };
  /*\
   * Set.insertAfter
   [ method ]
   **
   * Creates a clone of the set.
   **
   = (object) New Set object
  \*/


  setproto.clone = function (s) {
    s = new Set();

    for (var i = 0, ii = this.items.length; i < ii; i++) {
      s.push(this.items[i].clone());
    }

    return s;
  };

  setproto.toString = function () {
    return "Snap\u2018s set";
  };

  setproto.type = "set"; // export

  /*\
   * Snap.Set
   [ property ]
   **
   * Set constructor.
  \*/

  Snap.Set = Set;
  /*\
   * Snap.set
   [ method ]
   **
   * Creates a set and fills it with list of arguments.
   **
   = (object) New Set object
   | var r = paper.rect(0, 0, 10, 10),
   |     s1 = Snap.set(), // empty set
   |     s2 = Snap.set(r, paper.circle(100, 100, 20)); // prefilled set
  \*/

  Snap.set = function () {
    var set = new Set();

    if (arguments.length) {
      set.push.apply(set, Array.prototype.slice.call(arguments, 0));
    }

    return set;
  };
}); // Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

snap_svg_Snap.plugin(function (Snap, Element, Paper, glob) {
  var names = {},
      reUnit = /[%a-z]+$/i,
      Str = String;
  names.stroke = names.fill = "colour";

  function getEmpty(item) {
    var l = item[0];

    switch (l.toLowerCase()) {
      case "t":
        return [l, 0, 0];

      case "m":
        return [l, 1, 0, 0, 1, 0, 0];

      case "r":
        if (item.length == 4) {
          return [l, 0, item[2], item[3]];
        } else {
          return [l, 0];
        }

      case "s":
        if (item.length == 5) {
          return [l, 1, 1, item[3], item[4]];
        } else if (item.length == 3) {
          return [l, 1, 1];
        } else {
          return [l, 1];
        }

    }
  }

  function equaliseTransform(t1, t2, getBBox) {
    t1 = t1 || new Snap.Matrix();
    t2 = t2 || new Snap.Matrix();
    t1 = Snap.parseTransformString(t1.toTransformString()) || [];
    t2 = Snap.parseTransformString(t2.toTransformString()) || [];
    var maxlength = Math.max(t1.length, t2.length),
        from = [],
        to = [],
        i = 0,
        j,
        jj,
        tt1,
        tt2;

    for (; i < maxlength; i++) {
      tt1 = t1[i] || getEmpty(t2[i]);
      tt2 = t2[i] || getEmpty(tt1);

      if (tt1[0] != tt2[0] || tt1[0].toLowerCase() == "r" && (tt1[2] != tt2[2] || tt1[3] != tt2[3]) || tt1[0].toLowerCase() == "s" && (tt1[3] != tt2[3] || tt1[4] != tt2[4])) {
        t1 = Snap._.transform2matrix(t1, getBBox());
        t2 = Snap._.transform2matrix(t2, getBBox());
        from = [["m", t1.a, t1.b, t1.c, t1.d, t1.e, t1.f]];
        to = [["m", t2.a, t2.b, t2.c, t2.d, t2.e, t2.f]];
        break;
      }

      from[i] = [];
      to[i] = [];

      for (j = 0, jj = Math.max(tt1.length, tt2.length); j < jj; j++) {
        j in tt1 && (from[i][j] = tt1[j]);
        j in tt2 && (to[i][j] = tt2[j]);
      }
    }

    return {
      from: path2array(from),
      to: path2array(to),
      f: getPath(from)
    };
  }

  function getNumber(val) {
    return val;
  }

  function getUnit(unit) {
    return function (val) {
      return +val.toFixed(3) + unit;
    };
  }

  function getViewBox(val) {
    return val.join(" ");
  }

  function getColour(clr) {
    return Snap.rgb(clr[0], clr[1], clr[2], clr[3]);
  }

  function getPath(path) {
    var k = 0,
        i,
        ii,
        j,
        jj,
        out,
        a,
        b = [];

    for (i = 0, ii = path.length; i < ii; i++) {
      out = "[";
      a = ['"' + path[i][0] + '"'];

      for (j = 1, jj = path[i].length; j < jj; j++) {
        a[j] = "val[" + k++ + "]";
      }

      out += a + "]";
      b[i] = out;
    }

    return Function("val", "return Snap.path.toString.call([" + b + "])");
  }

  function path2array(path) {
    var out = [];

    for (var i = 0, ii = path.length; i < ii; i++) {
      for (var j = 1, jj = path[i].length; j < jj; j++) {
        out.push(path[i][j]);
      }
    }

    return out;
  }

  function isNumeric(obj) {
    return isFinite(obj);
  }

  function arrayEqual(arr1, arr2) {
    if (!Snap.is(arr1, "array") || !Snap.is(arr2, "array")) {
      return false;
    }

    return arr1.toString() == arr2.toString();
  }

  Element.prototype.equal = function (name, b) {
    return eve_default()("snap.util.equal", this, name, b).firstDefined();
  };

  eve_default.a.on("snap.util.equal", function (name, b) {
    var A,
        B,
        a = Str(this.attr(name) || ""),
        el = this;

    if (names[name] == "colour") {
      A = Snap.color(a);
      B = Snap.color(b);
      return {
        from: [A.r, A.g, A.b, A.opacity],
        to: [B.r, B.g, B.b, B.opacity],
        f: getColour
      };
    }

    if (name == "viewBox") {
      A = this.attr(name).vb.split(" ").map(Number);
      B = b.split(" ").map(Number);
      return {
        from: A,
        to: B,
        f: getViewBox
      };
    }

    if (name == "transform" || name == "gradientTransform" || name == "patternTransform") {
      if (typeof b == "string") {
        b = Str(b).replace(/\.{3}|\u2026/g, a);
      }

      a = this.matrix;

      if (!Snap._.rgTransform.test(b)) {
        b = Snap._.transform2matrix(Snap._.svgTransform2string(b), this.getBBox());
      } else {
        b = Snap._.transform2matrix(b, this.getBBox());
      }

      return equaliseTransform(a, b, function () {
        return el.getBBox(1);
      });
    }

    if (name == "d" || name == "path") {
      A = Snap.path.toCubic(a, b);
      return {
        from: path2array(A[0]),
        to: path2array(A[1]),
        f: getPath(A[0])
      };
    }

    if (name == "points") {
      A = Str(a).split(Snap._.separator);
      B = Str(b).split(Snap._.separator);
      return {
        from: A,
        to: B,
        f: function f(val) {
          return val;
        }
      };
    }

    if (isNumeric(a) && isNumeric(b)) {
      return {
        from: parseFloat(a),
        to: parseFloat(b),
        f: getNumber
      };
    }

    var aUnit = a.match(reUnit),
        bUnit = Str(b).match(reUnit);

    if (aUnit && arrayEqual(aUnit, bUnit)) {
      return {
        from: parseFloat(a),
        to: parseFloat(b),
        f: getUnit(aUnit)
      };
    } else {
      return {
        from: this.asPX(name),
        to: this.asPX(name, b),
        f: getNumber
      };
    }
  });
}); // Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
// http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

snap_svg_Snap.plugin(function (Snap, Element, Paper, glob) {
  var elproto = Element.prototype,
      has = "hasOwnProperty",
      supportsTouch = "createTouch" in glob.doc,
      events = ["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "touchstart", "touchmove", "touchend", "touchcancel"],
      touchMap = {
    mousedown: "touchstart",
    mousemove: "touchmove",
    mouseup: "touchend"
  },
      getScroll = function getScroll(xy, el) {
    var name = xy == "y" ? "scrollTop" : "scrollLeft",
        doc = el && el.node ? el.node.ownerDocument : glob.doc;
    return doc[name in doc.documentElement ? "documentElement" : "body"][name];
  },
      preventDefault = function preventDefault() {
    this.returnValue = false;
  },
      preventTouch = function preventTouch() {
    return this.originalEvent.preventDefault();
  },
      stopPropagation = function stopPropagation() {
    this.cancelBubble = true;
  },
      stopTouch = function stopTouch() {
    return this.originalEvent.stopPropagation();
  },
      addEvent = function addEvent(obj, type, fn, element) {
    var realName = supportsTouch && touchMap[type] ? touchMap[type] : type,
        f = function f(e) {
      // 不要帮用户太多，
      // var scrollY = getScroll("y", element),
      //     scrollX = getScroll("x", element);
      if (supportsTouch && touchMap[has](type)) {
        for (var i = 0, ii = e.targetTouches && e.targetTouches.length; i < ii; i++) {
          if (e.targetTouches[i].target == obj || obj.contains(e.targetTouches[i].target)) {
            var olde = e;
            e = e.targetTouches[i];
            e.originalEvent = olde;
            e.preventDefault = preventTouch;
            e.stopPropagation = stopTouch;
            break;
          }
        }
      }

      var x = e.clientX,
          y = e.clientY;
      return fn.call(element, e, x, y);
    };

    if (type !== realName) {
      obj.addEventListener(type, f, false);
    }

    obj.addEventListener(realName, f, false);
    return function () {
      if (type !== realName) {
        obj.removeEventListener(type, f, false);
      }

      obj.removeEventListener(realName, f, false);
      return true;
    };
  },
      drag = [],
      dragMove = function dragMove(e) {
    var x = e.clientX,
        y = e.clientY,
        // scrollY = getScroll("y"),
    // scrollX = getScroll("x"),
    dragi,
        j = drag.length;

    while (j--) {
      dragi = drag[j];

      if (supportsTouch) {
        var i = e.touches && e.touches.length,
            touch;

        while (i--) {
          touch = e.touches[i];

          if (touch.identifier == dragi.el._drag.id || dragi.el.node.contains(touch.target)) {
            x = touch.clientX;
            y = touch.clientY;
            (e.originalEvent ? e.originalEvent : e).preventDefault();
            break;
          }
        }
      } else {
        e.preventDefault();
      }

      var node = dragi.el.node,
          o,
          next = node.nextSibling,
          parent = node.parentNode,
          display = node.style.display; // glob.win.opera && parent.removeChild(node);
      // node.style.display = "none";
      // o = dragi.el.paper.getElementByPoint(x, y);
      // node.style.display = display;
      // glob.win.opera && (next ? parent.insertBefore(node, next) : parent.appendChild(node));
      // o && eve("snap.drag.over." + dragi.el.id, dragi.el, o);
      // x += scrollX;
      // y += scrollY;

      eve_default()("snap.drag.move." + dragi.el.id, dragi.move_scope || dragi.el, x - dragi.el._drag.x, y - dragi.el._drag.y, x, y, e);
    }
  },
      dragUp = function dragUp(e) {
    Snap.unmousemove(dragMove).unmouseup(dragUp);
    var i = drag.length,
        dragi;

    while (i--) {
      dragi = drag[i];
      dragi.el._drag = {};
      eve_default()("snap.drag.end." + dragi.el.id, dragi.end_scope || dragi.start_scope || dragi.move_scope || dragi.el, e);
      eve_default.a.off("snap.drag.*." + dragi.el.id);
    }

    drag = [];
  };
  /*\
   * Element.click
   [ method ]
   **
   * Adds a click event handler to the element
   - handler (function) handler for the event
   = (object) @Element
  \*/

  /*\
   * Element.unclick
   [ method ]
   **
   * Removes a click event handler from the element
   - handler (function) handler for the event
   = (object) @Element
  \*/

  /*\
   * Element.dblclick
   [ method ]
   **
   * Adds a double click event handler to the element
   - handler (function) handler for the event
   = (object) @Element
  \*/

  /*\
   * Element.undblclick
   [ method ]
   **
   * Removes a double click event handler from the element
   - handler (function) handler for the event
   = (object) @Element
  \*/

  /*\
   * Element.mousedown
   [ method ]
   **
   * Adds a mousedown event handler to the element
   - handler (function) handler for the event
   = (object) @Element
  \*/

  /*\
   * Element.unmousedown
   [ method ]
   **
   * Removes a mousedown event handler from the element
   - handler (function) handler for the event
   = (object) @Element
  \*/

  /*\
   * Element.mousemove
   [ method ]
   **
   * Adds a mousemove event handler to the element
   - handler (function) handler for the event
   = (object) @Element
  \*/

  /*\
   * Element.unmousemove
   [ method ]
   **
   * Removes a mousemove event handler from the element
   - handler (function) handler for the event
   = (object) @Element
  \*/

  /*\
   * Element.mouseout
   [ method ]
   **
   * Adds a mouseout event handler to the element
   - handler (function) handler for the event
   = (object) @Element
  \*/

  /*\
   * Element.unmouseout
   [ method ]
   **
   * Removes a mouseout event handler from the element
   - handler (function) handler for the event
   = (object) @Element
  \*/

  /*\
   * Element.mouseover
   [ method ]
   **
   * Adds a mouseover event handler to the element
   - handler (function) handler for the event
   = (object) @Element
  \*/

  /*\
   * Element.unmouseover
   [ method ]
   **
   * Removes a mouseover event handler from the element
   - handler (function) handler for the event
   = (object) @Element
  \*/

  /*\
   * Element.mouseup
   [ method ]
   **
   * Adds a mouseup event handler to the element
   - handler (function) handler for the event
   = (object) @Element
  \*/

  /*\
   * Element.unmouseup
   [ method ]
   **
   * Removes a mouseup event handler from the element
   - handler (function) handler for the event
   = (object) @Element
  \*/

  /*\
   * Element.touchstart
   [ method ]
   **
   * Adds a touchstart event handler to the element
   - handler (function) handler for the event
   = (object) @Element
  \*/

  /*\
   * Element.untouchstart
   [ method ]
   **
   * Removes a touchstart event handler from the element
   - handler (function) handler for the event
   = (object) @Element
  \*/

  /*\
   * Element.touchmove
   [ method ]
   **
   * Adds a touchmove event handler to the element
   - handler (function) handler for the event
   = (object) @Element
  \*/

  /*\
   * Element.untouchmove
   [ method ]
   **
   * Removes a touchmove event handler from the element
   - handler (function) handler for the event
   = (object) @Element
  \*/

  /*\
   * Element.touchend
   [ method ]
   **
   * Adds a touchend event handler to the element
   - handler (function) handler for the event
   = (object) @Element
  \*/

  /*\
   * Element.untouchend
   [ method ]
   **
   * Removes a touchend event handler from the element
   - handler (function) handler for the event
   = (object) @Element
  \*/

  /*\
   * Element.touchcancel
   [ method ]
   **
   * Adds a touchcancel event handler to the element
   - handler (function) handler for the event
   = (object) @Element
  \*/

  /*\
   * Element.untouchcancel
   [ method ]
   **
   * Removes a touchcancel event handler from the element
   - handler (function) handler for the event
   = (object) @Element
  \*/


  for (var i = events.length; i--;) {
    (function (eventName) {
      Snap[eventName] = elproto[eventName] = function (fn, scope) {
        if (Snap.is(fn, "function")) {
          this.events = this.events || [];
          this.events.push({
            name: eventName,
            f: fn,
            unbind: addEvent(this.node || document, eventName, fn, scope || this)
          });
        } else {
          for (var i = 0, ii = this.events.length; i < ii; i++) {
            if (this.events[i].name == eventName) {
              try {
                this.events[i].f.call(this);
              } catch (e) {}
            }
          }
        }

        return this;
      };

      Snap["un" + eventName] = elproto["un" + eventName] = function (fn) {
        var events = this.events || [],
            l = events.length;

        while (l--) {
          if (events[l].name == eventName && (events[l].f == fn || !fn)) {
            events[l].unbind();
            events.splice(l, 1);
            !events.length && delete this.events;
            return this;
          }
        }

        return this;
      };
    })(events[i]);
  }
  /*\
   * Element.hover
   [ method ]
   **
   * Adds hover event handlers to the element
   - f_in (function) handler for hover in
   - f_out (function) handler for hover out
   - icontext (object) #optional context for hover in handler
   - ocontext (object) #optional context for hover out handler
   = (object) @Element
  \*/


  elproto.hover = function (f_in, f_out, scope_in, scope_out) {
    return this.mouseover(f_in, scope_in).mouseout(f_out, scope_out || scope_in);
  };
  /*\
   * Element.unhover
   [ method ]
   **
   * Removes hover event handlers from the element
   - f_in (function) handler for hover in
   - f_out (function) handler for hover out
   = (object) @Element
  \*/


  elproto.unhover = function (f_in, f_out) {
    return this.unmouseover(f_in).unmouseout(f_out);
  };

  var draggable = []; // SIERRA unclear what _context_ refers to for starting, ending, moving the drag gesture.
  // SIERRA Element.drag(): _x position of the mouse_: Where are the x/y values offset from?
  // SIERRA Element.drag(): much of this member's doc appears to be duplicated for some reason.
  // SIERRA Unclear about this sentence: _Additionally following drag events will be triggered: drag.start.<id> on start, drag.end.<id> on end and drag.move.<id> on every move._ Is there a global _drag_ object to which you can assign handlers keyed by an element's ID?

  /*\
   * Element.drag
   [ method ]
   **
   * Adds event handlers for an element's drag gesture
   **
   - onmove (function) handler for moving
   - onstart (function) handler for drag start
   - onend (function) handler for drag end
   - mcontext (object) #optional context for moving handler
   - scontext (object) #optional context for drag start handler
   - econtext (object) #optional context for drag end handler
   * Additionaly following `drag` events are triggered: `drag.start.<id>` on start, 
   * `drag.end.<id>` on end and `drag.move.<id>` on every move. When element is dragged over another element 
   * `drag.over.<id>` fires as well.
   *
   * Start event and start handler are called in specified context or in context of the element with following parameters:
   o x (number) x position of the mouse
   o y (number) y position of the mouse
   o event (object) DOM event object
   * Move event and move handler are called in specified context or in context of the element with following parameters:
   o dx (number) shift by x from the start point
   o dy (number) shift by y from the start point
   o x (number) x position of the mouse
   o y (number) y position of the mouse
   o event (object) DOM event object
   * End event and end handler are called in specified context or in context of the element with following parameters:
   o event (object) DOM event object
   = (object) @Element
  \*/

  elproto.drag = function (onmove, onstart, onend, move_scope, start_scope, end_scope) {
    var el = this;

    if (!arguments.length) {
      var origTransform;
      return el.drag(function (dx, dy) {
        this.attr({
          transform: origTransform + (origTransform ? "T" : "t") + [dx, dy]
        });
      }, function () {
        origTransform = this.transform().local;
      });
    }

    function start(e, x, y) {
      (e.originalEvent || e).preventDefault();
      el._drag.x = x;
      el._drag.y = y;
      el._drag.id = e.identifier;
      !drag.length && Snap.mousemove(dragMove).mouseup(dragUp);
      drag.push({
        el: el,
        move_scope: move_scope,
        start_scope: start_scope,
        end_scope: end_scope
      });
      onstart && eve_default.a.on("snap.drag.start." + el.id, onstart);
      onmove && eve_default.a.on("snap.drag.move." + el.id, onmove);
      onend && eve_default.a.on("snap.drag.end." + el.id, onend);
      eve_default()("snap.drag.start." + el.id, start_scope || move_scope || el, x, y, e);
    }

    function init(e, x, y) {
      eve_default()("snap.draginit." + el.id, el, e, x, y);
    }

    eve_default.a.on("snap.draginit." + el.id, start);
    el._drag = {};
    draggable.push({
      el: el,
      start: start,
      init: init
    });
    el.mousedown(init);
    return el;
  };
  /*
   * Element.onDragOver
   [ method ]
   **
   * Shortcut to assign event handler for `drag.over.<id>` event, where `id` is the element's `id` (see @Element.id)
   - f (function) handler for event, first argument would be the element you are dragging over
  \*/
  // elproto.onDragOver = function (f) {
  //     f ? eve.on("snap.drag.over." + this.id, f) : eve.unbind("snap.drag.over." + this.id);
  // };

  /*\
   * Element.undrag
   [ method ]
   **
   * Removes all drag event handlers from the given element
  \*/


  elproto.undrag = function () {
    var i = draggable.length;

    while (i--) {
      if (draggable[i].el == this) {
        this.unmousedown(draggable[i].init);
        draggable.splice(i, 1);
        eve_default.a.unbind("snap.drag.*." + this.id);
        eve_default.a.unbind("snap.draginit." + this.id);
      }
    }

    !draggable.length && Snap.unmousemove(dragMove).unmouseup(dragUp);
    return this;
  };
}); // Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

snap_svg_Snap.plugin(function (Snap, Element, Paper, glob) {
  var elproto = Element.prototype,
      pproto = Paper.prototype,
      rgurl = /^\s*url\((.+)\)/,
      Str = String,
      $ = Snap._.$;
  Snap.filter = {};
  /*\
   * Paper.filter
   [ method ]
   **
   * Creates a `<filter>` element
   **
   - filstr (string) SVG fragment of filter provided as a string
   = (object) @Element
   * Note: It is recommended to use filters embedded into the page inside an empty SVG element.
   > Usage
   | var f = paper.filter('<feGaussianBlur stdDeviation="2"/>'),
   |     c = paper.circle(10, 10, 10).attr({
   |         filter: f
   |     });
  \*/

  pproto.filter = function (filstr) {
    var paper = this;

    if (paper.type != "svg") {
      paper = paper.paper;
    }

    var f = Snap.parse(Str(filstr)),
        id = Snap._.id(),
        width = paper.node.offsetWidth,
        height = paper.node.offsetHeight,
        filter = $("filter");

    $(filter, {
      id: id,
      filterUnits: "userSpaceOnUse"
    });
    filter.appendChild(f.node);
    paper.defs.appendChild(filter);
    return new Element(filter);
  };

  eve_default.a.on("snap.util.getattr.filter", function () {
    eve_default.a.stop();
    var p = $(this.node, "filter");

    if (p) {
      var match = Str(p).match(rgurl);
      return match && Snap.select(match[1]);
    }
  });
  eve_default.a.on("snap.util.attr.filter", function (value) {
    if (value instanceof Element && value.type == "filter") {
      eve_default.a.stop();
      var id = value.node.id;

      if (!id) {
        $(value.node, {
          id: value.id
        });
        id = value.id;
      }

      $(this.node, {
        filter: Snap.url(id)
      });
    }

    if (!value || value == "none") {
      eve_default.a.stop();
      this.node.removeAttribute("filter");
    }
  });
  /*\
   * Snap.filter.blur
   [ method ]
   **
   * Returns an SVG markup string for the blur filter
   **
   - x (number) amount of horizontal blur, in pixels
   - y (number) #optional amount of vertical blur, in pixels
   = (string) filter representation
   > Usage
   | var f = paper.filter(Snap.filter.blur(5, 10)),
   |     c = paper.circle(10, 10, 10).attr({
   |         filter: f
   |     });
  \*/

  Snap.filter.blur = function (x, y) {
    if (x == null) {
      x = 2;
    }

    var def = y == null ? x : [x, y];
    return Snap.format('\<feGaussianBlur stdDeviation="{def}"/>', {
      def: def
    });
  };

  Snap.filter.blur.toString = function () {
    return this();
  };
  /*\
   * Snap.filter.shadow
   [ method ]
   **
   * Returns an SVG markup string for the shadow filter
   **
   - dx (number) #optional horizontal shift of the shadow, in pixels
   - dy (number) #optional vertical shift of the shadow, in pixels
   - blur (number) #optional amount of blur
   - color (string) #optional color of the shadow
   - opacity (number) #optional `0..1` opacity of the shadow
   * or
   - dx (number) #optional horizontal shift of the shadow, in pixels
   - dy (number) #optional vertical shift of the shadow, in pixels
   - color (string) #optional color of the shadow
   - opacity (number) #optional `0..1` opacity of the shadow
   * which makes blur default to `4`. Or
   - dx (number) #optional horizontal shift of the shadow, in pixels
   - dy (number) #optional vertical shift of the shadow, in pixels
   - opacity (number) #optional `0..1` opacity of the shadow
   = (string) filter representation
   > Usage
   | var f = paper.filter(Snap.filter.shadow(0, 2, .3)),
   |     c = paper.circle(10, 10, 10).attr({
   |         filter: f
   |     });
  \*/


  Snap.filter.shadow = function (dx, dy, blur, color, opacity) {
    if (opacity == null) {
      if (color == null) {
        opacity = blur;
        blur = 4;
        color = "#000";
      } else {
        opacity = color;
        color = blur;
        blur = 4;
      }
    }

    if (blur == null) {
      blur = 4;
    }

    if (opacity == null) {
      opacity = 1;
    }

    if (dx == null) {
      dx = 0;
      dy = 2;
    }

    if (dy == null) {
      dy = dx;
    }

    color = Snap.color(color);
    return Snap.format('<feGaussianBlur in="SourceAlpha" stdDeviation="{blur}"/><feOffset dx="{dx}" dy="{dy}" result="offsetblur"/><feFlood flood-color="{color}"/><feComposite in2="offsetblur" operator="in"/><feComponentTransfer><feFuncA type="linear" slope="{opacity}"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>', {
      color: color,
      dx: dx,
      dy: dy,
      blur: blur,
      opacity: opacity
    });
  };

  Snap.filter.shadow.toString = function () {
    return this();
  };
  /*\
   * Snap.filter.grayscale
   [ method ]
   **
   * Returns an SVG markup string for the grayscale filter
   **
   - amount (number) amount of filter (`0..1`)
   = (string) filter representation
  \*/


  Snap.filter.grayscale = function (amount) {
    if (amount == null) {
      amount = 1;
    }

    return Snap.format('<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {b} {h} 0 0 0 0 0 1 0"/>', {
      a: 0.2126 + 0.7874 * (1 - amount),
      b: 0.7152 - 0.7152 * (1 - amount),
      c: 0.0722 - 0.0722 * (1 - amount),
      d: 0.2126 - 0.2126 * (1 - amount),
      e: 0.7152 + 0.2848 * (1 - amount),
      f: 0.0722 - 0.0722 * (1 - amount),
      g: 0.2126 - 0.2126 * (1 - amount),
      h: 0.0722 + 0.9278 * (1 - amount)
    });
  };

  Snap.filter.grayscale.toString = function () {
    return this();
  };
  /*\
   * Snap.filter.sepia
   [ method ]
   **
   * Returns an SVG markup string for the sepia filter
   **
   - amount (number) amount of filter (`0..1`)
   = (string) filter representation
  \*/


  Snap.filter.sepia = function (amount) {
    if (amount == null) {
      amount = 1;
    }

    return Snap.format('<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {h} {i} 0 0 0 0 0 1 0"/>', {
      a: 0.393 + 0.607 * (1 - amount),
      b: 0.769 - 0.769 * (1 - amount),
      c: 0.189 - 0.189 * (1 - amount),
      d: 0.349 - 0.349 * (1 - amount),
      e: 0.686 + 0.314 * (1 - amount),
      f: 0.168 - 0.168 * (1 - amount),
      g: 0.272 - 0.272 * (1 - amount),
      h: 0.534 - 0.534 * (1 - amount),
      i: 0.131 + 0.869 * (1 - amount)
    });
  };

  Snap.filter.sepia.toString = function () {
    return this();
  };
  /*\
   * Snap.filter.saturate
   [ method ]
   **
   * Returns an SVG markup string for the saturate filter
   **
   - amount (number) amount of filter (`0..1`)
   = (string) filter representation
  \*/


  Snap.filter.saturate = function (amount) {
    if (amount == null) {
      amount = 1;
    }

    return Snap.format('<feColorMatrix type="saturate" values="{amount}"/>', {
      amount: 1 - amount
    });
  };

  Snap.filter.saturate.toString = function () {
    return this();
  };
  /*\
   * Snap.filter.hueRotate
   [ method ]
   **
   * Returns an SVG markup string for the hue-rotate filter
   **
   - angle (number) angle of rotation
   = (string) filter representation
  \*/


  Snap.filter.hueRotate = function (angle) {
    angle = angle || 0;
    return Snap.format('<feColorMatrix type="hueRotate" values="{angle}"/>', {
      angle: angle
    });
  };

  Snap.filter.hueRotate.toString = function () {
    return this();
  };
  /*\
   * Snap.filter.invert
   [ method ]
   **
   * Returns an SVG markup string for the invert filter
   **
   - amount (number) amount of filter (`0..1`)
   = (string) filter representation
  \*/


  Snap.filter.invert = function (amount) {
    if (amount == null) {
      amount = 1;
    } //        <feColorMatrix type="matrix" values="-1 0 0 0 1  0 -1 0 0 1  0 0 -1 0 1  0 0 0 1 0" color-interpolation-filters="sRGB"/>


    return Snap.format('<feComponentTransfer><feFuncR type="table" tableValues="{amount} {amount2}"/><feFuncG type="table" tableValues="{amount} {amount2}"/><feFuncB type="table" tableValues="{amount} {amount2}"/></feComponentTransfer>', {
      amount: amount,
      amount2: 1 - amount
    });
  };

  Snap.filter.invert.toString = function () {
    return this();
  };
  /*\
   * Snap.filter.brightness
   [ method ]
   **
   * Returns an SVG markup string for the brightness filter
   **
   - amount (number) amount of filter (`0..1`)
   = (string) filter representation
  \*/


  Snap.filter.brightness = function (amount) {
    if (amount == null) {
      amount = 1;
    }

    return Snap.format('<feComponentTransfer><feFuncR type="linear" slope="{amount}"/><feFuncG type="linear" slope="{amount}"/><feFuncB type="linear" slope="{amount}"/></feComponentTransfer>', {
      amount: amount
    });
  };

  Snap.filter.brightness.toString = function () {
    return this();
  };
  /*\
   * Snap.filter.contrast
   [ method ]
   **
   * Returns an SVG markup string for the contrast filter
   **
   - amount (number) amount of filter (`0..1`)
   = (string) filter representation
  \*/


  Snap.filter.contrast = function (amount) {
    if (amount == null) {
      amount = 1;
    }

    return Snap.format('<feComponentTransfer><feFuncR type="linear" slope="{amount}" intercept="{amount2}"/><feFuncG type="linear" slope="{amount}" intercept="{amount2}"/><feFuncB type="linear" slope="{amount}" intercept="{amount2}"/></feComponentTransfer>', {
      amount: amount,
      amount2: .5 - amount / 2
    });
  };

  Snap.filter.contrast.toString = function () {
    return this();
  };
}); // Copyright (c) 2014 Adobe Systems Incorporated. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

snap_svg_Snap.plugin(function (Snap, Element, Paper, glob, Fragment) {
  var box = Snap._.box,
      is = Snap.is,
      firstLetter = /^[^a-z]*([tbmlrc])/i,
      toString = function toString() {
    return "T" + this.dx + "," + this.dy;
  };
  /*\
   * Element.getAlign
   [ method ]
   **
   * Returns shift needed to align the element relatively to given element.
   * If no elements specified, parent `<svg>` container will be used.
   - el (object) @optional alignment element
   - way (string) one of six values: `"top"`, `"middle"`, `"bottom"`, `"left"`, `"center"`, `"right"`
   = (object|string) Object in format `{dx: , dy: }` also has a string representation as a transformation string
   > Usage
   | el.transform(el.getAlign(el2, "top"));
   * or
   | var dy = el.getAlign(el2, "top").dy;
  \*/


  Element.prototype.getAlign = function (el, way) {
    if (way == null && is(el, "string")) {
      way = el;
      el = null;
    }

    el = el || this.paper;
    var bx = el.getBBox ? el.getBBox() : box(el),
        bb = this.getBBox(),
        out = {};
    way = way && way.match(firstLetter);
    way = way ? way[1].toLowerCase() : "c";

    switch (way) {
      case "t":
        out.dx = 0;
        out.dy = bx.y - bb.y;
        break;

      case "b":
        out.dx = 0;
        out.dy = bx.y2 - bb.y2;
        break;

      case "m":
        out.dx = 0;
        out.dy = bx.cy - bb.cy;
        break;

      case "l":
        out.dx = bx.x - bb.x;
        out.dy = 0;
        break;

      case "r":
        out.dx = bx.x2 - bb.x2;
        out.dy = 0;
        break;

      default:
        out.dx = bx.cx - bb.cx;
        out.dy = 0;
        break;
    }

    out.toString = toString;
    return out;
  };
  /*\
   * Element.align
   [ method ]
   **
   * Aligns the element relatively to given one via transformation.
   * If no elements specified, parent `<svg>` container will be used.
   - el (object) @optional alignment element
   - way (string) one of six values: `"top"`, `"middle"`, `"bottom"`, `"left"`, `"center"`, `"right"`
   = (object) this element
   > Usage
   | el.align(el2, "top");
   * or
   | el.align("middle");
  \*/


  Element.prototype.align = function (el, way) {
    return this.transform("..." + this.getAlign(el, way));
  };
}); // Copyright (c) 2017 Adobe Systems Incorporated. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

snap_svg_Snap.plugin(function (Snap, Element, Paper, glob) {
  // Colours are from https://www.materialui.co
  var red = "#ffebee#ffcdd2#ef9a9a#e57373#ef5350#f44336#e53935#d32f2f#c62828#b71c1c#ff8a80#ff5252#ff1744#d50000",
      pink = "#FCE4EC#F8BBD0#F48FB1#F06292#EC407A#E91E63#D81B60#C2185B#AD1457#880E4F#FF80AB#FF4081#F50057#C51162",
      purple = "#F3E5F5#E1BEE7#CE93D8#BA68C8#AB47BC#9C27B0#8E24AA#7B1FA2#6A1B9A#4A148C#EA80FC#E040FB#D500F9#AA00FF",
      deeppurple = "#EDE7F6#D1C4E9#B39DDB#9575CD#7E57C2#673AB7#5E35B1#512DA8#4527A0#311B92#B388FF#7C4DFF#651FFF#6200EA",
      indigo = "#E8EAF6#C5CAE9#9FA8DA#7986CB#5C6BC0#3F51B5#3949AB#303F9F#283593#1A237E#8C9EFF#536DFE#3D5AFE#304FFE",
      blue = "#E3F2FD#BBDEFB#90CAF9#64B5F6#64B5F6#2196F3#1E88E5#1976D2#1565C0#0D47A1#82B1FF#448AFF#2979FF#2962FF",
      lightblue = "#E1F5FE#B3E5FC#81D4FA#4FC3F7#29B6F6#03A9F4#039BE5#0288D1#0277BD#01579B#80D8FF#40C4FF#00B0FF#0091EA",
      cyan = "#E0F7FA#B2EBF2#80DEEA#4DD0E1#26C6DA#00BCD4#00ACC1#0097A7#00838F#006064#84FFFF#18FFFF#00E5FF#00B8D4",
      teal = "#E0F2F1#B2DFDB#80CBC4#4DB6AC#26A69A#009688#00897B#00796B#00695C#004D40#A7FFEB#64FFDA#1DE9B6#00BFA5",
      green = "#E8F5E9#C8E6C9#A5D6A7#81C784#66BB6A#4CAF50#43A047#388E3C#2E7D32#1B5E20#B9F6CA#69F0AE#00E676#00C853",
      lightgreen = "#F1F8E9#DCEDC8#C5E1A5#AED581#9CCC65#8BC34A#7CB342#689F38#558B2F#33691E#CCFF90#B2FF59#76FF03#64DD17",
      lime = "#F9FBE7#F0F4C3#E6EE9C#DCE775#D4E157#CDDC39#C0CA33#AFB42B#9E9D24#827717#F4FF81#EEFF41#C6FF00#AEEA00",
      yellow = "#FFFDE7#FFF9C4#FFF59D#FFF176#FFEE58#FFEB3B#FDD835#FBC02D#F9A825#F57F17#FFFF8D#FFFF00#FFEA00#FFD600",
      amber = "#FFF8E1#FFECB3#FFE082#FFD54F#FFCA28#FFC107#FFB300#FFA000#FF8F00#FF6F00#FFE57F#FFD740#FFC400#FFAB00",
      orange = "#FFF3E0#FFE0B2#FFCC80#FFB74D#FFA726#FF9800#FB8C00#F57C00#EF6C00#E65100#FFD180#FFAB40#FF9100#FF6D00",
      deeporange = "#FBE9E7#FFCCBC#FFAB91#FF8A65#FF7043#FF5722#F4511E#E64A19#D84315#BF360C#FF9E80#FF6E40#FF3D00#DD2C00",
      brown = "#EFEBE9#D7CCC8#BCAAA4#A1887F#8D6E63#795548#6D4C41#5D4037#4E342E#3E2723",
      grey = "#FAFAFA#F5F5F5#EEEEEE#E0E0E0#BDBDBD#9E9E9E#757575#616161#424242#212121",
      bluegrey = "#ECEFF1#CFD8DC#B0BEC5#90A4AE#78909C#607D8B#546E7A#455A64#37474F#263238";
  /*\
   * Snap.mui
   [ property ]
   **
   * Contain Material UI colours.
   | Snap().rect(0, 0, 10, 10).attr({fill: Snap.mui.deeppurple, stroke: Snap.mui.amber[600]});
   # For colour reference: <a href="https://www.materialui.co">https://www.materialui.co</a>.
  \*/

  Snap.mui = {};
  /*\
   * Snap.flat
   [ property ]
   **
   * Contain Flat UI colours.
   | Snap().rect(0, 0, 10, 10).attr({fill: Snap.flat.carrot, stroke: Snap.flat.wetasphalt});
   # For colour reference: <a href="https://www.materialui.co">https://www.materialui.co</a>.
  \*/

  Snap.flat = {};

  function saveColor(colors) {
    colors = colors.split(/(?=#)/);
    var color = new String(colors[5]);
    color[50] = colors[0];
    color[100] = colors[1];
    color[200] = colors[2];
    color[300] = colors[3];
    color[400] = colors[4];
    color[500] = colors[5];
    color[600] = colors[6];
    color[700] = colors[7];
    color[800] = colors[8];
    color[900] = colors[9];

    if (colors[10]) {
      color.A100 = colors[10];
      color.A200 = colors[11];
      color.A400 = colors[12];
      color.A700 = colors[13];
    }

    return color;
  }

  Snap.mui.red = saveColor(red);
  Snap.mui.pink = saveColor(pink);
  Snap.mui.purple = saveColor(purple);
  Snap.mui.deeppurple = saveColor(deeppurple);
  Snap.mui.indigo = saveColor(indigo);
  Snap.mui.blue = saveColor(blue);
  Snap.mui.lightblue = saveColor(lightblue);
  Snap.mui.cyan = saveColor(cyan);
  Snap.mui.teal = saveColor(teal);
  Snap.mui.green = saveColor(green);
  Snap.mui.lightgreen = saveColor(lightgreen);
  Snap.mui.lime = saveColor(lime);
  Snap.mui.yellow = saveColor(yellow);
  Snap.mui.amber = saveColor(amber);
  Snap.mui.orange = saveColor(orange);
  Snap.mui.deeporange = saveColor(deeporange);
  Snap.mui.brown = saveColor(brown);
  Snap.mui.grey = saveColor(grey);
  Snap.mui.bluegrey = saveColor(bluegrey);
  Snap.flat.turquoise = "#1abc9c";
  Snap.flat.greensea = "#16a085";
  Snap.flat.sunflower = "#f1c40f";
  Snap.flat.orange = "#f39c12";
  Snap.flat.emerland = "#2ecc71";
  Snap.flat.nephritis = "#27ae60";
  Snap.flat.carrot = "#e67e22";
  Snap.flat.pumpkin = "#d35400";
  Snap.flat.peterriver = "#3498db";
  Snap.flat.belizehole = "#2980b9";
  Snap.flat.alizarin = "#e74c3c";
  Snap.flat.pomegranate = "#c0392b";
  Snap.flat.amethyst = "#9b59b6";
  Snap.flat.wisteria = "#8e44ad";
  Snap.flat.clouds = "#ecf0f1";
  Snap.flat.silver = "#bdc3c7";
  Snap.flat.wetasphalt = "#34495e";
  Snap.flat.midnightblue = "#2c3e50";
  Snap.flat.concrete = "#95a5a6";
  Snap.flat.asbestos = "#7f8c8d";
  /*\
   * Snap.importMUIColors
   [ method ]
   **
   * Imports Material UI colours into global object.
   | Snap.importMUIColors();
   | Snap().rect(0, 0, 10, 10).attr({fill: deeppurple, stroke: amber[600]});
   # For colour reference: <a href="https://www.materialui.co">https://www.materialui.co</a>.
  \*/

  Snap.importMUIColors = function () {
    for (var color in Snap.mui) {
      if (Snap.mui.hasOwnProperty(color)) {
        window[color] = Snap.mui[color];
      }
    }
  };
});
snap_svg_Snap.mina = Snap_mina;
/* harmony default export */ var snap_svg = (snap_svg_Snap);

// CONCATENATED MODULE: ./src/Utils/Controller.js












/**
 * 控制器
 * @class
 * @extends Event
 */

var Controller_Controller =
/*#__PURE__*/
function (_Event) {
  inherits_default()(Controller, _Event);

  function Controller(editor) {
    var _this;

    classCallCheck_default()(this, Controller);

    _this = possibleConstructorReturn_default()(this, getPrototypeOf_default()(Controller).call(this));

    _this.onWheel = function (e) {
      e.preventDefault();

      if (e.ctrlKey) {
        // 双指
        var newScale = 1 - e.deltaY * _this.scaleRatio;

        _this.zoom(newScale, e.offsetX, e.offsetY);
      } else {
        _this.pan(-e.deltaX, -e.deltaY);
      }
    };

    _this.panStart = function (ev) {
      ev.preventDefault();

      if (ev.target.tagName !== "svg") {
        return;
      }

      _this.startPosition = {
        x: ev.clientX,
        y: ev.clientY
      };
      _this.matrix = _this.svg.mousemove(_this.panning);
    };

    _this.panStop = function (ev) {
      ev.preventDefault();

      _this.svg.unmousemove(_this.panning); // this.svg.unmouseup(this.panStop);


      _this.editor.fire("panEnd", {
        event: ev
      });
    };

    _this.zoom = function (newScale) {
      var cx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var cy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      var transform = _this.paper.transform();

      transform.localMatrix.scale(newScale, newScale, cx, cy);
      var transformString = transform.localMatrix.toTransformString();

      _this.paper.transform(transformString);

      _this.editor.fire("zoom", {
        scale: newScale
      });
    };

    _this.zoomTo = function (newScale) {
      var cx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var cy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      var transform = _this.paper.transform();

      var _transform$localMatri = transform.localMatrix.split(),
          dx = _transform$localMatri.dx,
          dy = _transform$localMatri.dy;

      var m = new Snap.Matrix();
      m.translate(dx, dy);
      m.scale(newScale, newScale, cx, cy);

      _this.paper.transform(m.toString());
    };

    _this.transform = function (newScale) {
      var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var m = new Snap.Matrix();
      m.scale(newScale);
      m.translate(x, y);

      _this.paper.transform(m.toString());
    };

    _this.panning = function (ev) {
      ev.preventDefault();
      var p1 = {
        x: ev.clientX,
        y: ev.clientY
      };
      var p2 = _this.startPosition;
      var deltaP = [p2.x - p1.x, p2.y - p1.y];

      var transform = _this.paper.transform();

      var _transform$localMatri2 = transform.localMatrix.split(),
          scalex = _transform$localMatri2.scalex;

      transform.localMatrix.translate(-deltaP[0] / scalex, -deltaP[1] / scalex);
      var transformString = transform.localMatrix.toTransformString();

      _this.paper.transform(transformString);

      _this.startPosition = p1;

      _this.editor.fire("panning", {
        event: ev
      });
    };

    _this.editor = editor;
    _this.paper = editor.paper;
    _this.svg = editor.svg;
    /**
     * 缩放比例系数
     * @type {number}
     */

    _this.scaleRatio = 0.01;
    _this.scale = 1;
    /**
     * 所有吸附节点
     */

    _this.achors = [];

    _this.listenEvents();

    return _this;
  }
  /**
   * 自适应
   */


  createClass_default()(Controller, [{
    key: "autoFit",
    value: function autoFit() {
      var _this2 = this;

      var width = this.editor.dom.node.clientWidth;
      var height = this.editor.dom.node.clientHeight;
      var bbox = this.paper.getBBox();
      var transform = this.paper.transform();
      var matrix = transform.localMatrix;

      var _matrix$split = matrix.split(),
          scalex = _matrix$split.scalex;

      matrix.translate(((width - bbox.width) / 2 - bbox.x) / scalex, ((height - bbox.height) / 2 - bbox.y) / scalex);
      var transformString = matrix.toTransformString();
      this.paper.node.style.transition = 'transform 200ms ease-out';
      this.paper.transform(transformString);
      setTimeout(function () {
        _this2.paper.node.style.transition = null;
      }, 200);
    }
  }, {
    key: "listenEvents",
    value: function listenEvents() {
      this.svg.mousedown(this.panStart);
      this.svg.mouseup(this.panStop);
      this.svg.node.addEventListener('mouseleave', this.panStop);
      this.svg.node.addEventListener("wheel", this.onWheel);
    }
  }, {
    key: "clear",
    value: function clear() {
      this.svg.unmousedown(this.panStart);
      this.svg.node.removeEventListener('mouseleave', this.panStop);
      this.svg.node.removeEventListener("wheel", this.onWheel);
    }
    /**
     * 禁用滚轮缩放
     */

  }, {
    key: "disableWheel",
    value: function disableWheel() {
      this.svg.node.removeEventListener("wheel", this.onWheel);
    }
    /**
     * 禁用鼠标移动
     */

  }, {
    key: "disablePan",
    value: function disablePan() {
      this.svg.unmousedown(this.panStart);
    }
    /**
     * 移动到指定位置
     * @param  {} x
     * @param  {} y
     */

  }, {
    key: "pan",
    value: function pan(x, y) {
      var transform = this.paper.transform();

      var _transform$localMatri3 = transform.localMatrix.split(),
          scalex = _transform$localMatri3.scalex;

      transform.localMatrix.translate(x / scalex, y / scalex);
      var transformString = transform.localMatrix.toTransformString();
      this.paper.transform(transformString);
      this.editor.fire("panning");
    }
  }, {
    key: "moveTo",
    value: function moveTo(x, y) {
      var transform = this.paper.transform();

      var _transform$localMatri4 = transform.localMatrix.split(),
          scalex = _transform$localMatri4.scalex;

      var m = new Snap.Matrix();
      m.scale(scalex);
      m.translate(x, y);
      this.paper.transform(m.toString());
    }
  }]);

  return Controller;
}(Utils_Event);

/* harmony default export */ var Utils_Controller = (Controller_Controller);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.trim.js
var es_string_trim = __webpack_require__(259);

// CONCATENATED MODULE: ./src/Model/History.js




/**
 * 历史记录堆栈管理类
 * @class
 */
var History_History =
/*#__PURE__*/
function () {
  function History(schema) {
    classCallCheck_default()(this, History);

    this.index = -1;
    this.schemaList = [];
    this.schema = schema;
  }
  /**
   * @param  {} data
   */


  createClass_default()(History, [{
    key: "push",
    value: function push(data) {
      this.schemaList.push(JSON.stringify(data).trim(" "));
      this.index++;
      this.schema.editor.fire("change");
    }
    /**
     * @param  {} index
     * @param  {} data
     */

  }, {
    key: "replace",
    value: function replace(index, data) {
      this.schemaList[this.index + index] = data;
    } // 重做

  }, {
    key: "redo",
    value: function redo() {
      this.schema.data = JSON.parse(this.schemaList[++this.index]);
      this.schema.editor.fire("change");
    } // 撤销

  }, {
    key: "undo",
    value: function undo() {
      this.schema.data = JSON.parse(this.schemaList[--this.index]);
      this.schema.editor.fire("change");
    }
  }]);

  return History;
}();

/* harmony default export */ var Model_History = (History_History);
// CONCATENATED MODULE: ./src/Model/Schema.js









/**
 * @class
 */

var Schema_Schema =
/*#__PURE__*/
function () {
  function Schema(editor) {
    classCallCheck_default()(this, Schema);

    this.data = {
      nodesMap: [],
      linesMap: []
    };
    this.editor = editor;
    /**
     * @property history
     */

    this.history = new Model_History(this);
    this.listenEvents();
  }

  createClass_default()(Schema, [{
    key: "listenEvents",
    value: function listenEvents() {
      var _this = this;

      var historyChangeEvents = ["node:change", "node:add", "node:remove", "line:change", "line:add", "line:remove", "delete"];
      historyChangeEvents.forEach(function (event) {
        _this.editor.graph.on(event, function () {
          _this.history.push(_this.getNowDataMap());
        }, 9999);
      });
    }
  }, {
    key: "getNowDataMap",
    value: function getNowDataMap() {
      var nodes = this.editor.graph.node.nodes;
      var lines = this.editor.graph.line.lines;
      var nodesMap = {};
      var linesMap = {};

      for (var uuid in nodes) {
        nodesMap[uuid] = nodes[uuid].data;
      }

      for (var _uuid in lines) {
        linesMap[_uuid] = lines[_uuid].data;
      }

      this.data = {
        nodesMap: nodesMap,
        linesMap: linesMap
      };
      return this.data;
    }
    /**
     * @param  {} data
     */

  }, {
    key: "setData",
    value: function setData(data) {
      this.parseData(data); // 解析数据

      this.editor.clearGraph();
      this.renderData(data);
      this.editor.fire("load", data);
    }
    /**
     * @param  {} data
     */

  }, {
    key: "setInitData",
    value: function setInitData(data) {
      this.parseData(data); // 解析数据

      this.editor.clearGraph();
      this.renderData(data);
      this.history.push(this.data);
    }
    /**
     * 解析数据
     * @param {array} data
     */

  }, {
    key: "parseData",
    value: function parseData(_ref) {
      var _ref$nodes = _ref.nodes,
          nodes = _ref$nodes === void 0 ? [] : _ref$nodes,
          _ref$lines = _ref.lines,
          lines = _ref$lines === void 0 ? [] : _ref$lines;
      var nodesMap = {};
      var linesMap = {};
      nodes.forEach(function (item) {
        item.x = parseInt(item.x, 10);
        item.y = parseInt(item.y, 10);
        nodesMap[item.uuid] = item;
      });
      lines.forEach(function (item) {
        var from = item.from,
            to = item.to,
            _item$fromPoint = item.fromPoint,
            fromPoint = _item$fromPoint === void 0 ? 0 : _item$fromPoint,
            _item$toPoint = item.toPoint,
            toPoint = _item$toPoint === void 0 ? 0 : _item$toPoint;
        linesMap["".concat(from, ".").concat(fromPoint, "=>").concat(to, ".").concat(toPoint)] = item;
      });
      this.data = {
        nodesMap: nodesMap,
        linesMap: linesMap
      };
    }
    /**
     * 渲染数据
     */

  }, {
    key: "renderData",
    value: function renderData() {
      this.editor.graph.render(this.data);
    }
    /**
     * 重做
     */

  }, {
    key: "redo",
    value: function redo() {
      this.editor.clearGraph();
      this.history.redo();
      this.renderData(this.data);
      this.editor.fire("redo");
    }
    /**
     * 撤销
     */

  }, {
    key: "undo",
    value: function undo() {
      this.editor.clearGraph();
      this.history.undo();
      this.renderData(this.data);
      this.editor.fire("undo");
    }
    /**
     * 获取数据
     */

  }, {
    key: "getData",
    value: function getData() {
      var _this$data = this.data,
          nodesMap = _this$data.nodesMap,
          linesMap = _this$data.linesMap;
      return {
        nodes: Object.keys(nodesMap).map(function (key) {
          return nodesMap[key];
        }),
        lines: Object.keys(linesMap).map(function (key) {
          return linesMap[key];
        })
      };
    }
  }]);

  return Schema;
}();

/* harmony default export */ var Model_Schema = (Schema_Schema);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(116);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__(162);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(169);
var asyncToGenerator_default = /*#__PURE__*/__webpack_require__.n(asyncToGenerator);

// EXTERNAL MODULE: external "canvg"
var external_canvg_ = __webpack_require__(170);
var external_canvg_default = /*#__PURE__*/__webpack_require__.n(external_canvg_);

// CONCATENATED MODULE: ./src/Plugins/Minimap.js
















 // 使用html

var Minimap_MiniMap =
/*#__PURE__*/
function () {
  function MiniMap(editor) {
    var _this = this;

    classCallCheck_default()(this, MiniMap);

    this.resetDrag = function () {
      var transform = _this.editor.paper.transform();

      var _transform$localMatri = transform.localMatrix.split(),
          dx = _transform$localMatri.dx,
          dy = _transform$localMatri.dy,
          scalex = _transform$localMatri.scalex;

      var x = dx * scalex;
      var y = dy * scalex;
      _this.drag.node.style.left = _this.padding - x / _this.scale;
      _this.drag.node.style.top = _this.padding - y / _this.scale;
    };

    this.render = function () {
      clearTimeout(_this.timeout);
      _this.timeout = setTimeout(
      /*#__PURE__*/
      asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee() {
        var node, transform, _transform$localMatri2, dx, dy, svgBBox, images, svg, m;

        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                node = _this.editor.svg.node;
                transform = _this.editor.paper.transform();
                _transform$localMatri2 = transform.localMatrix.split(), dx = _transform$localMatri2.dx, dy = _transform$localMatri2.dy;
                svgBBox = node.getBoundingClientRect();
                images = node.querySelectorAll("image") || [];
                images.forEach(function (img) {
                  img.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
                });
                svg = node.innerHTML.replace(/\"mm-editor-paper\" transform=\"matrix\([-\d\,]+\)\"/, "\"mm-editor-paper\" ");
                m = new Snap.Matrix();
                m.translate(_this.padding, _this.padding);
                m.scale(1 / _this.scale); // m.translate(this.dx,this.dy);

                _this.svgBBox = svgBBox;
                _this.dragBBox = {
                  width: svgBBox.width / _this.scale,
                  height: svgBBox.height / _this.scale
                };
                _this.drag.node.style.width = _this.dragBBox.width + "px";
                _this.drag.node.style.height = _this.dragBBox.height + "px";
                _context.next = 16;
                return external_canvg_default.a.fromString(_this.ctx, "<g transform=\"".concat(m.toString(), "\" class=\"minimap-graph\">").concat(svg, "</g>"), {// offsetX:10,
                  // offsetY:10
                });

              case 16:
                _this.converting = _context.sent;

                _this.converting.start();

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })), 200);
    };

    this.editor = editor;
    var _editor$config$minima = editor.config.minimap,
        minimap = _editor$config$minima === void 0 ? [] : _editor$config$minima;
    this.width = minimap.width || 160;
    this.height = minimap.height || 160;
    this.padding = minimap.padding || 20;
    this.scale = minimap.scale || 10;
  }

  createClass_default()(MiniMap, [{
    key: "setData",
    value: function setData(data) {
      this.data = data;
      this.render();
    }
  }, {
    key: "init",
    value: function init() {
      var dom = "<div class=\"mm-minimap\" >\n\t\t\t<canvas width=\"100%\" height=\"100%\"></canvas>\n\t\t\t<div class=\"drag-rect\" style=\"left:".concat(this.padding, "px;top:").concat(this.padding, "px\">\n\t\t\t\t<div class=\"drag-point\"></div>\n\t\t\t</div>\n\t\t</div>");
      var can = document.createElement("div");
      can.innerHTML = dom;
      this.container = can.querySelector(".mm-minimap");
      this.editor.container.append(this.container);
      this.canvas = this.container.querySelector("canvas");
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.ctx = this.canvas.getContext("2d");
      this.drag = Snap(this.container.querySelector(".drag-rect"));
      this.dragPoint = Snap(this.container.querySelector(".drag-point"));
      this.initEvent();
    }
  }, {
    key: "initEvent",
    value: function initEvent() {
      var _this2 = this;

      var controller = this.editor.controller;
      this.drag.drag(function (dx, dy) {
        var dleft = dx + _this2.dragStart.x;
        var dtop = dy + _this2.dragStart.y;
        var left = Math.min(Math.max(dleft, 0), _this2.width - _this2.dragBBox.width + 40);
        var top = Math.min(Math.max(dtop, 0), _this2.height - _this2.dragBBox.height + 40);
        _this2.drag.node.style.left = left + "px";
        _this2.drag.node.style.top = top + "px";
        controller.moveTo(-(left - 20) * _this2.scale, -(top - 20) * _this2.scale);
      }, function () {
        var style = _this2.drag.node.style;
        _this2.dragStart = {
          x: style.left ? parseInt(style.left.split("px")[0]) : 0,
          y: style.top ? parseInt(style.top.split("px")[0]) : 0
        };
      });
      this.dragPoint.drag(function (dx, dy) {
        var style = _this2.drag.node.style;
        var ratio = _this2.svgBBox.width / _this2.svgBBox.height;
        var width;
        var height;

        if (dy * ratio < dx) {
          width = Math.max(dx + _this2.dragStartBBox.width, 10);
          height = width / ratio;
        } else {
          height = Math.max(dy + _this2.dragStartBBox.height, 10);
          width = height * ratio;
        }

        _this2.drag.node.style.width = width;
        _this2.drag.node.style.height = height;
        var left = style.left ? parseInt(style.left.split("px")[0]) : 0;
        var top = style.top ? parseInt(style.top.split("px")[0]) : 0;
        controller.transform(_this2.svgBBox.width / (width * _this2.scale), -(left - _this2.padding) * _this2.scale, -(top - _this2.padding) * _this2.scale);
      }, function (x, y, e) {
        e.preventDefault();
        e.stopPropagation();
        _this2.dragStartBBox = _this2.drag.node.getBoundingClientRect();
        return false;
      });
      this.editor.on("change", this.render);
      this.editor.on("panning", this.resetDrag);
      this.editor.on("zoom", this.resetDrag);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      clearTimeout(this.timeout);
      this.editor.off("change", this.render);
      this.editor.off("panning", this.render);
      this.editor.off("zoom", this.render);
      this.drag.unDrag();
      this.dragPoint.unDrag();
    }
  }]);

  return MiniMap;
}();

/* harmony default export */ var Minimap = (Minimap_MiniMap);
// EXTERNAL MODULE: ./src/index.less
var src = __webpack_require__(278);

// CONCATENATED MODULE: ./src/MMEditor.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MMEditor", function() { return MMEditor_MMEditor; });
/* concated harmony reexport Event */__webpack_require__.d(__webpack_exports__, "Event", function() { return Utils_Event; });
/* concated harmony reexport Schema */__webpack_require__.d(__webpack_exports__, "Schema", function() { return Model_Schema; });
/* concated harmony reexport Snap */__webpack_require__.d(__webpack_exports__, "Snap", function() { return snap_svg; });
/* concated harmony reexport Graph */__webpack_require__.d(__webpack_exports__, "Graph", function() { return Shape_Graph; });
/* concated harmony reexport Controller */__webpack_require__.d(__webpack_exports__, "Controller", function() { return Utils_Controller; });
/* concated harmony reexport eve */__webpack_require__.d(__webpack_exports__, "eve", function() { return eve_default.a; });
/* concated harmony reexport mina */__webpack_require__.d(__webpack_exports__, "mina", function() { return Snap_mina; });














/**
 * @class 
 * @extends Event
 */

var MMEditor_MMEditor =
/*#__PURE__*/
function (_Event) {
  inherits_default()(MMEditor, _Event);

  function MMEditor(config) {
    var _this;

    classCallCheck_default()(this, MMEditor);

    _this = possibleConstructorReturn_default()(this, getPrototypeOf_default()(MMEditor).call(this));
    _this.config = Object.assign({
      hideAchor: false,
      hideAchorLine: false,
      anchorDistance: 5,
      showBackGrid: true,
      showMiniMap: true
    }, config);
    if (!config.dom) return possibleConstructorReturn_default()(_this);
    _this.dom = _this.initDom(config.dom);
    _this.svg = snap_svg(_this.dom.select("svg"));
    _this.paper = _this.svg.g();

    _this.paper.addClass("mm-editor-paper");

    _this.container = _this.dom.select(".mm-editor");

    _this.resize();

    _this.graph = new Shape_Graph(assertThisInitialized_default()(_this));
    _this.controller = new Utils_Controller(assertThisInitialized_default()(_this));
    _this.schema = new Model_Schema(assertThisInitialized_default()(_this));

    if (_this.config.showMiniMap) {
      _this.minimap = new Minimap(assertThisInitialized_default()(_this));

      _this.minimap.init();
    }

    return _this;
  }

  createClass_default()(MMEditor, [{
    key: "initDom",
    value: function initDom(dom) {
      dom.innerHTML = "<div class=\"mm-editor\" >\n\t\t\t\t<div class=\"mm-editor-back\" ></div>\n\t\t\t\t<div class=\"mm-editor-svg\" >\n\t\t\t\t\t<svg  />\n\t\t\t\t</div>\n\t\t\t</div>";
      return snap_svg(dom);
    }
    /**
     * 重新布局
     */

  }, {
    key: "resize",
    value: function resize() {
      var _this$config = this.config,
          width = _this$config.width,
          height = _this$config.height;
      this.svg.attr({
        width: width || "100%",
        height: height || "100%"
      });
    }
    /**
     * 销毁函数
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.clearGraph();
      this.graph.clear();
      this.graph = null;
      this.clear();
      this.svg.remove();
      this.dom.innerHTML = null;
      this.controller.clear();
      this.controller = null;
      this.schema = null;
    }
    /**
     * 重绘 
     */

  }, {
    key: "repaint",
    value: function repaint() {
      this.clearGraph();
      this.graph.render(this.schema.data);
    }
    /**
     * 清空画布
     */

  }, {
    key: "clearGraph",
    value: function clearGraph() {
      this.graph.line.clear();
      this.graph.node.clear();
    }
  }]);

  return MMEditor;
}(Utils_Event);

MMEditor_MMEditor.Event = Utils_Event;
MMEditor_MMEditor.Schema = Model_Schema;
MMEditor_MMEditor.Snap = snap_svg;
MMEditor_MMEditor.Graph = Shape_Graph;
MMEditor_MMEditor.Controller = Utils_Controller;
/* harmony default export */ var src_MMEditor = __webpack_exports__["default"] = (MMEditor_MMEditor);


/***/ })
/******/ ])["default"];
});