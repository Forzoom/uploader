(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["uploader"] = factory();
	else
		root["uploader"] = factory();
})(this, function() {
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(8)
}
var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(2),
  /* template */
  __webpack_require__(7),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _wx = __webpack_require__(3);

var _uploader = __webpack_require__(0);

var _uploader2 = _interopRequireDefault(_uploader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 *
 * @return {Promise} {image, serverId}
 */
function uploadWechatImage(localId) {
    var serverId = null;
    return (0, _wx.uploadImage)(localId).then(function (_serverId) {
        serverId = _serverId; // 记录serverId
        return localId;
    }).then(_wx.getLocalImgData) // 权限检测可能不应该这样使用
    .then(function (imageData) {
        return {
            image: imageData,
            serverId: serverId
        };
    });
}

/**
 * 
 */
exports.default = {
    name: 'WechatUploader',
    extends: _uploader2.default,
    data: function data() {
        return {
            /**
             * 保存所有的serverId
             */
            serverIds: []
        };
    },

    methods: {
        /**
         * @param {Array<{image, serverId}>} data
         */
        setImages: function setImages(data) {
            var images = [];
            var serverIds = [];
            for (var i = 0, len = data.length; i < len; i++) {
                images.push(data[i].image);
                serverIds.push(data[i].serverId);
            }
            this.images = images;
            this.serverIds = serverIds;
        },

        /**
         * 添加图片
         *
         * @param {} image 图片内容
         * @param {} serverId 
         */
        add: function add(image, serverId) {
            if (this.images.length < this.size) {
                this.images.push(image);
                this.serverIds.push(serverId);
                this.$emit('add', {
                    image: image,
                    serverId: serverId
                });
                return true;
            }
            return false;
        },

        /**
         * 获得所有的图片内容
         *
         * @return {Array<{image, serverId}>} 
         */
        getImages: function getImages() {
            var result = [];
            for (var i = 0, len = this.images.length; i < len; i++) {
                result.push({
                    image: this.images[i],
                    serverId: this.serverIds[i]
                });
            }
            return result;
        },

        /**
         * 删除图片
         *
         * @param {} index
         */
        remove: function remove(index) {
            if (0 <= index && index < this.size) {
                this.images.splice(index, 1);
                this.serverIds.splice(index, 1);
                this.$emit('remove', index);
                return true;
            }
            return false;
        },

        /**
         * 要求添加新的图片
         */
        onClickRequest: function onClickRequest() {
            var vm = this;
            return (0, _wx.chooseImage)(vm.size - vm.images.length).then(function (localIds) {
                if (localIds.length > 0) {
                    vm.$emit('load');
                    return vm.uploadWechatImages(localIds).then(function () {
                        vm.$emit('finish');
                    });
                }
            });
        },

        /**
         * 上传多张图片，需要保证一张上传完成之后，再上传另外一张
         */
        uploadWechatImages: function uploadWechatImages(localIds) {
            var vm = this;
            var localId = localIds.shift();
            return (0, _wx.uploadImage)(localId).then(function (serverId) {
                vm.add(localId, serverId);
                if (localIds.length > 0) {
                    return vm.uploadWechatImages(localIds);
                }
            });
        }
    },
    mounted: function mounted() {
        this.$on('click', function (image) {
            (0, _wx.previewImage)(image, this.images);
        });
    }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/**
 * @load 当图片上传开始时
 * @finish 当图片上传结束时
 */
exports.default = {
    name: 'ROUploader',
    props: {
        /**
         * 允许上传图片个数
         */
        size: {
            type: Number,
            default: 1
        },
        /**
         * 是否允许修改
         */
        canModify: {
            type: Boolean,
            default: true
        },
        /**
         * 容器对象类
         */
        containerClass: {
            type: [Object, Array],
            default: function _default() {
                return {};
            }
        },
        /**
         * 容器对象样式
         */
        containerStyle: {
            type: Object,
            default: function _default() {
                return {};
            }
        },
        /**
         * 图片对象类
         */
        imageClass: {
            type: [Object, Array],
            default: function _default() {
                return {};
            }
        },
        /**
         * 图片对象类
         */
        imageStyle: {
            type: Object,
            default: function _default() {
                return {};
            }
        },
        /**
         * 请求对象类
         */
        requestClass: {
            type: [Object, Array],
            default: function _default() {
                return {};
            }
        },
        /**
         * 请求对象样式
         */
        requestStyle: {
            type: Object,
            default: function _default() {
                return {};
            }
        }
    },
    data: function data() {
        return {
            // 包含所有图片的数组
            images: []
        };
    },

    methods: {
        /**
         * 重置所有的images列表，不会触发任何的remove和add事件
         */
        setImages: function setImages(images) {
            var tmp = [];
            for (var i = 0, len = images.length; i < len; i++) {
                tmp.push(images[i]);
            }
            this.images = tmp;
        },

        /**
         * 添加图片
         *  将触发@add(image)事件
         *
         * @param {string} image
         *
         * @return {boolean} 成功返回true，否则返回false
         */
        add: function add(image) {
            if (this.images.length < this.size) {
                this.images.push(image);
                this.$emit('add', image);
                return true;
            }
            return false;
        },

        /**
         * 删除图片
         *  将触发@remove(index)事件
         *
         * @param {number} index
         *
         * @return {boolean} true表示删除成功，false表示失败
         */
        remove: function remove(index) {
            if (0 <= index && index < this.size) {
                this.images.splice(index, 1);
                this.$emit('remove', index);
                return true;
            }
            return false;
        },

        /**
         * 删除所有的图片
         */
        removeAll: function removeAll() {
            for (var i = 0, len = this.images.length; i < len; i++) {
                this.remove(i);
            }
            return true;
        },

        /**
         * 获得所有图片
         *
         * @return {Array<string>}
         */
        getImages: function getImages() {
            return this.images.slice(0);
        },

        /**
         * 当点击图片时触发
         *
         * @param {number} index
         */
        onClickImage: function onClickImage(index) {
            this.$emit('click', index);
        },

        /**
         * 当点击删除按钮时触发
         */
        onClickRemove: function onClickRemove(index) {
            this.remove(index);
        },

        /**
         * 当点击添加按钮时
         */
        onClickRequest: function onClickRequest() {
            this.$emit('request');
        },

        /**
         * 当点击
         */
        onPress: function onPress(index) {
            var _this = this;

            return function () {
                _this.$emit('menu', index);
            };
        },

        /**
         * 获得允许上传的容量
         */
        getSize: function getSize() {
            return this.size;
        },

        /**
         * 获得当前已经上传的图片的数量
         */
        getCount: function getCount() {
            return this.images.length;
        }
    }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.previewImage = previewImage;
exports.chooseImage = chooseImage;
exports.uploadImage = uploadImage;
exports.getLocalImgData = getLocalImgData;
var isIOS = /iPhone/.test(navigator.userAgent);

function previewImage(image, images) {
    wx.previewImage({
        current: image,
        urls: images
    });
}

/**
 * @return {Promise} localIds: Array<string>
 */
function chooseImage(count) {
    return new Promise(function (resolve, reject) {
        wx.chooseImage({
            count: count,
            sizeType: ['compressed'],
            success: function success(res) {
                return resolve(res.localIds);
            }
        });
    });
}

/**
 * 默认不显示progress
 * @param localId
 *
 * @return {Promise} serverId
 */
function uploadImage(localId) {
    return new Promise(function (resolve, reject) {
        wx.uploadImage({
            localId: localId,
            isShowProgressTips: 0,
            success: function success(res) {
                return resolve(res.serverId);
            }
        });
    });
}

/**
 * @param localId
 *
 * @return {Promise} imageData
 */
function getLocalImgData(localId) {
    if (!isIOS || !window.__wxjs_is_wkwebview) {
        return localId;
    }
    return new Promise(function (resolve, reject) {
        wx.getLocalImgData({
            localId: localId,
            success: function success(res) {
                return resolve(res.localData);
            }
        });
    });
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(undefined);
// imports


// module
exports.push([module.i, ".ro-uploader-wrap{display:flex;background-color:#fff;text-decoration:none}.ro-uploader-wrap .ro-uploader-image-wrap{position:relative;margin-right:5px}.ro-uploader-wrap .ro-uploader-image-wrap .ro-uploader-image{vertical-align:middle;width:70px;height:70px;background-repeat:no-repeat;background-size:cover;background-position:50%;background-color:#aaa}.ro-uploader-wrap .ro-uploader-image-wrap .ro-uploader-remove{position:absolute;width:18px;height:18px;font-size:18px;line-height:18px;color:#fff;background-color:#aaa;top:0;right:0}.ro-uploader-wrap .ro-uploader-image-wrap .ro-uploader-remove:after,.ro-uploader-wrap .ro-uploader-image-wrap .ro-uploader-remove:before{background-color:#fff;transform:translate(-50%,-50%) rotate(45deg)}.ro-uploader-wrap .ro-uploader-image-wrap .ro-uploader-remove:before{width:2px;height:18px}.ro-uploader-wrap .ro-uploader-image-wrap .ro-uploader-remove:after{width:18px;height:2px}.ro-uploader-wrap .ro-uploader-image-wrap .ro-uploader-remove:active{border-color:#fff}.ro-uploader-wrap .ro-uploader-image-wrap .ro-uploader-remove:active:after,.ro-uploader-wrap .ro-uploader-image-wrap .ro-uploader-remove:active:before{background-color:#fff}.ro-uploader-wrap .ro-uploader-request{position:relative;width:70px;height:70px;border:1px solid #aaa;box-sizing:border-box}.ro-uploader-wrap .ro-uploader-request:after,.ro-uploader-wrap .ro-uploader-request:before{background-color:#bbb}.ro-uploader-wrap .ro-uploader-request:before{width:2px;height:35px}.ro-uploader-wrap .ro-uploader-request:after{width:35px;height:2px}.ro-uploader-wrap .ro-uploader-request:active{border-color:#888}.ro-uploader-wrap .ro-uploader-request:active:after,.ro-uploader-wrap .ro-uploader-request:active:before{background-color:#888}.ro-uploader-wrap .ro-uploader-remove:after,.ro-uploader-wrap .ro-uploader-remove:before,.ro-uploader-wrap .ro-uploader-request:after,.ro-uploader-wrap .ro-uploader-request:before{content:\" \";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}", ""]);

// exports


/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "ro-uploader-wrap",
    class: _vm.containerClass,
    style: (_vm.containerStyle)
  }, [_vm._l((_vm.images), function(image, index) {
    return _c('div', {
      staticClass: "ro-uploader-image-wrap"
    }, [_c('div', {
      directives: [{
        name: "pressure-press",
        rawName: "v-pressure-press",
        value: (_vm.onPress(index)),
        expression: "onPress(index)"
      }],
      staticClass: "ro-uploader-image",
      class: _vm.imageClass,
      style: ([{
        'background-image': 'url(' + image + ')'
      }, _vm.imageStyle]),
      on: {
        "click": function($event) {
          _vm.onClickImage(index)
        }
      }
    }), _vm._v(" "), (_vm.canModify) ? _c('div', {
      staticClass: "ro-uploader-remove",
      on: {
        "click": function($event) {
          _vm.onClickRemove(index)
        }
      }
    }) : _vm._e()])
  }), _vm._v(" "), (_vm.images.length < _vm.size && _vm.canModify) ? _c('div', {
    staticClass: "ro-uploader-image-wrap ro-uploader-request",
    class: _vm.requestClass,
    style: (_vm.requestStyle),
    on: {
      "click": _vm.onClickRequest
    }
  }) : _vm._e()], 2)
},staticRenderFns: []}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(9)("4fb8864b", content, true);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(10)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 10 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_uploader_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_uploader_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__src_uploader_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_wechat_uploader_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_wechat_uploader_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__src_wechat_uploader_js__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "Uploader", function() { return __WEBPACK_IMPORTED_MODULE_0__src_uploader_vue___default.a; });
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "WechatUploader", function() { return __WEBPACK_IMPORTED_MODULE_1__src_wechat_uploader_js___default.a; });




/***/ })
/******/ ]);
});