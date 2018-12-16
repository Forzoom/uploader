'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
var script = {
    name: 'ROUploader',
    props: {
        /**
         * 允许上传图片个数
         */
        size: {
            type: Number,
            default: 1,
        },
        /**
         * 是否允许修改
         */
        canModify: {
            type: Boolean,
            default: true,
        },
        /**
         * 容器对象类
         */
        containerClass: {
            type: [ Object, Array, ],
            default() {
                return {};
            },
        },
        /**
         * 容器对象样式
         */
        containerStyle: {
            type: Object,
            default() {
                return {};
            },
        },
        /**
         * 图片对象类
         */
        imageClass: {
            type: [ Object, Array, ],
            default() {
                return {};
            },
        },
        /**
         * 图片对象样式
         */
        imageStyle: {
            type: Object,
            default() {
                return {};
            },
        },
        /**
         * wrap
         */
        imageWrapClass: {
            type: [ Object, Array, ],
            default() {
                return {};
            },
        },
        /**
         * wrap
         */
        imageWrapStyle: {
            type: Object,
            default() {
                return {};
            },
        },
        /**
         * 请求对象类
         */
        requestClass: {
            type: [ Object, Array, ],
            default() {
                return {};
            },
        },
        /**
         * 请求对象样式
         */
        requestStyle: {
            type: Object,
            default() {
                return {};
            },
        },
        /**
         * 删除按钮样式类
         */
        removeClass: {
            type: [ Object, Array, ],
            default() {
                return {};
            },
        },
        /**
         * 删除按钮样式
         */
        removeStyle: {
            type: Object,
            default() {
                return {};
            },
        },
        /**
         * 调用lazyload，因为无法确定存在vue-lazyload库，所以默认false
         */
        lazyload: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            // 包含所有图片的数组
            images: [],
        };
    },
    methods: {
        /**
         * 重置所有的images列表，不会触发任何的remove和add事件
         */
        setImages(images) {
            const tmp = [];
            for (let i = 0, len = images.length; i < len; i++) {
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
        add(image) {
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
        remove(index) {
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
        removeAll() {
            for (let i = 0, len = this.images.length; i < len; i++) {
                this.remove(i);
            }
            return true;
        },
        /**
         * 获得所有图片
         *
         * @return {Array<string>}
         */
        getImages() {
            return this.images.slice(0);
        },
        /**
         * 当点击图片时触发
         *
         * @param {number} index
         */
        onClickImage(index) {
            this.$emit('click', index);
        },
        /**
         * 当点击删除按钮时触发
         */
        onClickRemove(index) {
            this.remove(index);
        },
        /**
         * 当点击添加按钮时
         */
        onClickRequest() {
            this.$emit('request');
        },
        /**
         * 获得允许上传的容量
         */
        getSize() {
            return this.size;
        },
        /**
         * 获得当前已经上传的图片的数量
         */
        getCount() {
            return this.images.length;
        },
    },
};

/* script */
            const __vue_script__ = script;
            
/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "ro-uploader-wrap",
      class: _vm.containerClass,
      style: _vm.containerStyle
    },
    [
      _vm._l(_vm.images, function(image, index) {
        return _c(
          "div",
          {
            key: index,
            staticClass: "ro-uploader-image-wrap",
            class: _vm.imageWrapClass,
            style: _vm.imageWrapStyle
          },
          [
            !_vm.lazyload
              ? _c("div", {
                  staticClass: "ro-uploader-image",
                  class: _vm.imageClass,
                  style: [
                    { "background-image": "url(" + image + ")" },
                    _vm.imageStyle
                  ],
                  on: {
                    click: function($event) {
                      _vm.onClickImage(index);
                    }
                  }
                })
              : _c("div", {
                  directives: [
                    {
                      name: "lazy",
                      rawName: "v-lazy:background-image",
                      value: image,
                      expression: "image",
                      arg: "background-image"
                    }
                  ],
                  staticClass: "ro-uploader-image",
                  class: _vm.imageClass,
                  style: [_vm.imageStyle],
                  on: {
                    click: function($event) {
                      _vm.onClickImage(index);
                    }
                  }
                }),
            _vm._v(" "),
            _vm.canModify
              ? _c("div", {
                  staticClass: "ro-uploader-remove",
                  class: _vm.removeClass,
                  style: _vm.removeStyle,
                  on: {
                    click: function($event) {
                      _vm.onClickRemove(index);
                    }
                  }
                })
              : _vm._e()
          ]
        )
      }),
      _vm._v(" "),
      _vm._t("request", [
        _vm.images.length < _vm.size && _vm.canModify
          ? _c("div", {
              staticClass: "ro-uploader-image-wrap ro-uploader-request",
              class: _vm.requestClass,
              style: _vm.requestStyle,
              on: { click: _vm.onClickRequest }
            })
          : _vm._e()
      ])
    ],
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-7f291aa7_0", { source: "\n.ro-uploader-wrap {\n  display: flex;\n  background-color: #ffffff;\n  text-decoration: none;\n}\n.ro-uploader-wrap .ro-uploader-image-wrap {\n  position: relative;\n  margin-right: 5px;\n}\n.ro-uploader-wrap .ro-uploader-image-wrap .ro-uploader-image {\n  vertical-align: middle;\n  width: 70px;\n  height: 70px;\n  background-repeat: no-repeat;\n  background-size: cover;\n  background-position: center;\n  background-color: #aaaaaa;\n}\n.ro-uploader-wrap .ro-uploader-image-wrap .ro-uploader-remove {\n  position: absolute;\n  width: 18px;\n  height: 18px;\n  font-size: 18px;\n  line-height: 18px;\n  color: #ffffff;\n  background-color: #aaaaaa;\n  top: 0rem;\n  right: 0rem;\n}\n.ro-uploader-wrap .ro-uploader-image-wrap .ro-uploader-remove:before,\n.ro-uploader-wrap .ro-uploader-image-wrap .ro-uploader-remove:after {\n  background-color: #ffffff;\n  transform: translate(-50%, -50%) rotateZ(45deg);\n}\n.ro-uploader-wrap .ro-uploader-image-wrap .ro-uploader-remove:before {\n  width: 2px;\n  height: 18px;\n}\n.ro-uploader-wrap .ro-uploader-image-wrap .ro-uploader-remove:after {\n  width: 18px;\n  height: 2px;\n}\n.ro-uploader-wrap .ro-uploader-image-wrap .ro-uploader-remove:active {\n  border-color: #ffffff;\n}\n.ro-uploader-wrap .ro-uploader-image-wrap .ro-uploader-remove:active:before,\n.ro-uploader-wrap .ro-uploader-image-wrap .ro-uploader-remove:active:after {\n  background-color: #ffffff;\n}\n.ro-uploader-wrap .ro-uploader-request {\n  position: relative;\n  width: 70px;\n  height: 70px;\n  border: 1px solid #aaaaaa;\n  box-sizing: border-box;\n}\n.ro-uploader-wrap .ro-uploader-request:before,\n.ro-uploader-wrap .ro-uploader-request:after {\n  background-color: #bbbbbb;\n}\n.ro-uploader-wrap .ro-uploader-request:before {\n  width: 2px;\n  height: 35px;\n}\n.ro-uploader-wrap .ro-uploader-request:after {\n  width: 35px;\n  height: 2px;\n}\n.ro-uploader-wrap .ro-uploader-request:active {\n  border-color: #888888;\n}\n.ro-uploader-wrap .ro-uploader-request:active:before,\n.ro-uploader-wrap .ro-uploader-request:active:after {\n  background-color: #888888;\n}\n.ro-uploader-wrap .ro-uploader-remove:before,\n.ro-uploader-wrap .ro-uploader-request:before,\n.ro-uploader-wrap .ro-uploader-remove:after,\n.ro-uploader-wrap .ro-uploader-request:after {\n  content: \" \";\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n", map: {"version":3,"sources":["uploader.vue"],"names":[],"mappings":";AAAA;EACE,cAAc;EACd,0BAA0B;EAC1B,sBAAsB;CACvB;AACD;EACE,mBAAmB;EACnB,kBAAkB;CACnB;AACD;EACE,uBAAuB;EACvB,YAAY;EACZ,aAAa;EACb,6BAA6B;EAC7B,uBAAuB;EACvB,4BAA4B;EAC5B,0BAA0B;CAC3B;AACD;EACE,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,gBAAgB;EAChB,kBAAkB;EAClB,eAAe;EACf,0BAA0B;EAC1B,UAAU;EACV,YAAY;CACb;AACD;;EAEE,0BAA0B;EAC1B,gDAAgD;CACjD;AACD;EACE,WAAW;EACX,aAAa;CACd;AACD;EACE,YAAY;EACZ,YAAY;CACb;AACD;EACE,sBAAsB;CACvB;AACD;;EAEE,0BAA0B;CAC3B;AACD;EACE,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,0BAA0B;EAC1B,uBAAuB;CACxB;AACD;;EAEE,0BAA0B;CAC3B;AACD;EACE,WAAW;EACX,aAAa;CACd;AACD;EACE,YAAY;EACZ,YAAY;CACb;AACD;EACE,sBAAsB;CACvB;AACD;;EAEE,0BAA0B;CAC3B;AACD;;;;EAIE,aAAa;EACb,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,iCAAiC;CAClC","file":"uploader.vue","sourcesContent":[".ro-uploader-wrap {\n  display: flex;\n  background-color: #ffffff;\n  text-decoration: none;\n}\n.ro-uploader-wrap .ro-uploader-image-wrap {\n  position: relative;\n  margin-right: 5px;\n}\n.ro-uploader-wrap .ro-uploader-image-wrap .ro-uploader-image {\n  vertical-align: middle;\n  width: 70px;\n  height: 70px;\n  background-repeat: no-repeat;\n  background-size: cover;\n  background-position: center;\n  background-color: #aaaaaa;\n}\n.ro-uploader-wrap .ro-uploader-image-wrap .ro-uploader-remove {\n  position: absolute;\n  width: 18px;\n  height: 18px;\n  font-size: 18px;\n  line-height: 18px;\n  color: #ffffff;\n  background-color: #aaaaaa;\n  top: 0rem;\n  right: 0rem;\n}\n.ro-uploader-wrap .ro-uploader-image-wrap .ro-uploader-remove:before,\n.ro-uploader-wrap .ro-uploader-image-wrap .ro-uploader-remove:after {\n  background-color: #ffffff;\n  transform: translate(-50%, -50%) rotateZ(45deg);\n}\n.ro-uploader-wrap .ro-uploader-image-wrap .ro-uploader-remove:before {\n  width: 2px;\n  height: 18px;\n}\n.ro-uploader-wrap .ro-uploader-image-wrap .ro-uploader-remove:after {\n  width: 18px;\n  height: 2px;\n}\n.ro-uploader-wrap .ro-uploader-image-wrap .ro-uploader-remove:active {\n  border-color: #ffffff;\n}\n.ro-uploader-wrap .ro-uploader-image-wrap .ro-uploader-remove:active:before,\n.ro-uploader-wrap .ro-uploader-image-wrap .ro-uploader-remove:active:after {\n  background-color: #ffffff;\n}\n.ro-uploader-wrap .ro-uploader-request {\n  position: relative;\n  width: 70px;\n  height: 70px;\n  border: 1px solid #aaaaaa;\n  box-sizing: border-box;\n}\n.ro-uploader-wrap .ro-uploader-request:before,\n.ro-uploader-wrap .ro-uploader-request:after {\n  background-color: #bbbbbb;\n}\n.ro-uploader-wrap .ro-uploader-request:before {\n  width: 2px;\n  height: 35px;\n}\n.ro-uploader-wrap .ro-uploader-request:after {\n  width: 35px;\n  height: 2px;\n}\n.ro-uploader-wrap .ro-uploader-request:active {\n  border-color: #888888;\n}\n.ro-uploader-wrap .ro-uploader-request:active:before,\n.ro-uploader-wrap .ro-uploader-request:active:after {\n  background-color: #888888;\n}\n.ro-uploader-wrap .ro-uploader-remove:before,\n.ro-uploader-wrap .ro-uploader-request:before,\n.ro-uploader-wrap .ro-uploader-remove:after,\n.ro-uploader-wrap .ro-uploader-request:after {\n  content: \" \";\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* component normalizer */
  function __vue_normalize__(
    template, style, script$$1,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/forzoom/repo/github/vue-project/uploader/src/uploader.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    {
      let hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__() {
    const head = document.head || document.getElementsByTagName('head')[0];
    const styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
    const isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        let code = css.source;
        let index = style.ids.length;

        style.ids.push(id);

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          const el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
          else style.element.appendChild(textNode);
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var Uploader = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    __vue_create_injector__,
    undefined
  );

var isIOS = /iPhone/.test(navigator.userAgent);
function previewImage(image, images) {
    wx.previewImage({
        current: image,
        urls: images,
    });
}
/**
 * @return {Promise} res
 *  - localIds: Array<string>
 */
function chooseImage(count) {
    return new Promise(function (resolve, reject) {
        wx.chooseImage({
            count: count,
            sizeType: ['compressed'],
            success: function (res) {
                return resolve(res);
            },
        });
    });
}
/**
 * 默认不显示progress
 * @param localId
 *
 * @return {Promise} res
 *  - serverId
 */
function uploadImage(localId) {
    return new Promise(function (resolve, reject) {
        wx.uploadImage({
            localId: localId,
            isShowProgressTips: 0,
            success: function (res) {
                return resolve(res);
            },
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
            success: function (res) {
                return resolve(res.localData);
            },
        });
    });
}

/**
 *
 *
 * @return {Promise} {image, serverId}
 */
function uploadWechatImage(localId) {
    var serverId = null;
    return uploadImage(localId).then(function (_res) {
        serverId = _res.serverId; // 记录res
        return localId;
    })
        .then(getLocalImgData) // 权限检测可能不应该这样使用
        .then(function (imageData) {
        return {
            image: imageData,
            serverId: serverId,
        };
    });
}
/**
 *
 */
var wechatUploader = {
    name: 'WechatUploader',
    extends: Uploader,
    props: {
        /**
         * 是否使用微信的预览内容
         */
        useWechatPreview: {
            type: Boolean,
            default: true,
        },
    },
    methods: {
        /**
         * 要求添加新的图片
         */
        onClickRequest: function () {
            this.request();
        },
        /**
         * 请求图片上传
         */
        request: function () {
            var vm = this;
            return chooseImage(vm.size - vm.images.length)
                .then(function (res) {
                var localIds = res.localIds;
                if (localIds.length > 0) {
                    vm.$emit('choose', res);
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
        uploadWechatImages: function (localIds) {
            var vm = this;
            var localId = localIds.shift();
            return uploadWechatImage(localId)
                .then(function (_a) {
                var image = _a.image, serverId = _a.serverId, res = _a.res;
                vm.add({ image: image, serverId: serverId });
                if (localIds.length > 0) {
                    return vm.uploadWechatImages(localIds);
                }
            });
        },
    },
    mounted: function () {
        this.$on('click', function (index) {
            previewImage(this.images[index].image, this.images.map(function (image) { return image.image; }));
        });
    },
};

exports.Uploader = Uploader;
exports.WechatUploader = wechatUploader;
