(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('core-js/modules/es.array.slice'), require('core-js/modules/es.array.splice'), require('core-js/modules/es.number.constructor'), require('core-js/modules/es.array.map'), require('core-js/modules/es.object.to-string'), require('core-js/modules/es.promise'), require('core-js/modules/es.array.iterator'), require('core-js/modules/es.string.iterator'), require('core-js/modules/web.dom-collections.iterator'), require('core-js/modules/web.url')) :
    typeof define === 'function' && define.amd ? define(['exports', 'core-js/modules/es.array.slice', 'core-js/modules/es.array.splice', 'core-js/modules/es.number.constructor', 'core-js/modules/es.array.map', 'core-js/modules/es.object.to-string', 'core-js/modules/es.promise', 'core-js/modules/es.array.iterator', 'core-js/modules/es.string.iterator', 'core-js/modules/web.dom-collections.iterator', 'core-js/modules/web.url'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Uploader = {}));
}(this, (function (exports) { 'use strict';

    var header = '<div class="ro-uploader-wrap" :class="containerClass" :style="containerStyle">';
    var footer = '<div v-for="(image, index) in images" ' + ':key="index"' + 'class="ro-uploader-image-wrap"' + ':class="imageWrapClass"' + ':style="imageWrapStyle">' + '<div v-if="!lazyload" ' + 'class="ro-uploader-image"' + ':class="imageClass"' + ':style="[{\'background-image\': \'url(\' + transformImage(image) + \')\'}, imageStyle]"' + '@click="onClickImage(index)">' + '</div>' + '<div v-else ' + 'class="ro-uploader-image"' + ':class="imageClass"' + 'v-lazy:background-image="image"' + ':style="[imageStyle]"' + '@click="onClickImage(index)">' + '</div>' + '<div v-if="canModify" class="remove-wrapper" :class="removeClass" :style="removeStyle" @click="onClickRemove(index)"><div class="ro-uploader-remove"></div></div>' + '</div>' + '<slot name="request">' + '<div class="ro-uploader-image-wrap ro-uploader-request" ' + 'v-if="images.length < size && canModify"' + '@click="onClickRequest"' + ':class="requestClass"' + ':style="requestStyle">' + '</div>' + '</slot>' + '</div>';

    /**
     * @load 当图片上传开始时
     * @finish 当图片上传结束时
     */

    function factory(_Vue) {
      return _Vue.extend({
        name: 'Uploader',
        props: {
          /**
           * 允许上传图片个数
           */
          size: {
            type: Number,
            "default": 1
          },

          /**
           * 是否允许修改
           */
          canModify: {
            type: Boolean,
            "default": true
          },

          /**
           * 容器对象类
           */
          containerClass: {
            type: [Object, Array],
            "default": function _default() {
              return {};
            }
          },

          /**
           * 容器对象样式
           */
          containerStyle: {
            type: Object,
            "default": function _default() {
              return {};
            }
          },

          /**
           * 图片对象类
           */
          imageClass: {
            type: [Object, Array],
            "default": function _default() {
              return {};
            }
          },

          /**
           * 图片对象样式
           */
          imageStyle: {
            type: Object,
            "default": function _default() {
              return {};
            }
          },

          /**
           * wrap
           */
          imageWrapClass: {
            type: [Object, Array],
            "default": function _default() {
              return {};
            }
          },

          /**
           * wrap
           */
          imageWrapStyle: {
            type: Object,
            "default": function _default() {
              return {};
            }
          },

          /**
           * 请求对象类
           */
          requestClass: {
            type: [Object, Array],
            "default": function _default() {
              return {};
            }
          },

          /**
           * 请求对象样式
           */
          requestStyle: {
            type: Object,
            "default": function _default() {
              return {};
            }
          },

          /**
           * 删除按钮样式类
           */
          removeClass: {
            type: [Object, Array],
            "default": function _default() {
              return {};
            }
          },

          /**
           * 删除按钮样式
           */
          removeStyle: {
            type: Object,
            "default": function _default() {
              return {};
            }
          },

          /**
           * 调用lazyload，因为无法确定存在vue-lazyload库，所以默认false
           */
          lazyload: {
            type: Boolean,
            "default": false
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
          },

          /**
           * 获取image，在模板中使用
           */
          transformImage: function transformImage(image) {
            return image;
          }
        },
        template: header + footer
      });
    }

    var isIOS = /iPhone/.test(navigator.userAgent);
    function previewImage(image, images) {
      wx.previewImage({
        current: image,
        urls: images
      });
    }
    /**
     * @return {Promise} res
     *  - localIds: string[]
     */

    function chooseImage(count) {
      return new Promise(function (resolve, reject) {
        wx.chooseImage({
          count: count,
          sizeType: ['compressed'],
          success: function success(res) {
            return resolve(res);
          },
          // @ts-ignore
          cancel: function cancel() {
            return reject(new Error('cancel'));
          },
          // @ts-ignore
          fail: function fail() {
            return reject(new Error('fail'));
          }
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
          success: function success(res) {
            resolve(res);
          },
          fail: function fail(error) {
            reject(error);
          }
        });
      });
    }
    /**
     * 在iOS中可能转base64
     * @param localId
     *
     * @return {Promise<string>} imageData
     */

    function getLocalImgData(localId) {
      if (!isIOS || !window.__wxjs_is_wkwebview) {
        return Promise.resolve(localId);
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

    /**
     * 上传图片到微信
     */

    function uploadWechatImage(localId, transformLocalImageData) {
      return uploadImage(localId).then(function (res) {
        return new Promise(function (resolve) {
          getLocalImgData(localId).then(function (image) {
            resolve({
              localId: localId,
              serverId: res.serverId,
              image: image,
              mode: 'wechat'
            });
          });
        });
      })["catch"](function (error) {
        throw new Error(error.errMsg);
      });
    }
    /**
     * 
     */


    function factory$1(_Vue, options) {
      var Uploader = factory(_Vue);
      return Uploader.extend({
        name: 'WechatUploader',
        props: {
          /**
           * 是否使用微信的预览内容
           */
          useWechatPreview: {
            type: Boolean,
            "default": true
          }
        },
        methods: {
          /**
           * 要求添加新的图片
           */
          onClickRequest: function onClickRequest() {
            this.request();
          },

          /**
           * 请求图片上传
           */
          request: function request() {
            var vm = this;
            vm.$emit('startRequest');
            return chooseImage(Math.min(9, vm.size - vm.images.length)).then(function (res) {
              vm.$emit('endRequest');
              var localIds = res.localIds;

              if (localIds.length === 0) {
                return;
              }

              vm.$emit('choose', res);
              vm.$emit('load');
              vm.$emit('startRequest');
              return vm.uploadWechatImages(localIds).then(function () {
                vm.$emit('finish');
                vm.$emit('endRequest');
              })["catch"](function (errMsg) {
                vm.$emit('error', errMsg);
              });
            })["catch"](function (error) {
              // cancel 或 fail 情况
              vm.$emit('endRequest');
            });
          },

          /**
           * 上传多张图片，需要保证一张上传完成之后，再上传另外一张
           */
          uploadWechatImages: function uploadWechatImages(localIds) {
            var vm = this;
            var localId = localIds.shift();
            return uploadWechatImage(localId, options.transformWXLocalImageData).then(function (image) {
              vm.add(image); // 没有内容，不再上传

              if (localIds.length == 0) {
                return;
              }

              return vm.uploadWechatImages(localIds);
            })["catch"](function (errMsg) {
              throw new Error(errMsg);
            });
          },
          transformImage: function transformImage(image) {
            return image.image || image.url;
          }
        },
        mounted: function mounted() {
          this.$on('click', function (index) {
            var images = this.images;
            previewImage(images[index].url, images.map(function (image) {
              return image.url;
            }));
          });
        }
      });
    }

    /**
     * 
     */

    function factory$2(_Vue, options) {
      var Uploader = factory(_Vue);
      return Uploader.extend({
        name: 'InputUploader',
        props: {
          accept: {
            type: String
          }
        },
        methods: {
          /**
           * 要求添加新的图片
           */
          onClickRequest: function onClickRequest() {
            this.request();
          },

          /**
           * 请求图片上传
           */
          request: function request() {
            var $input = this.$refs.fileInput;

            if ($input) {
              $input.click();
            }
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
              var removed = this.images.splice(index, 1);

              for (var i = 0, len = removed.length; i < len; i++) {
                URL.revokeObjectURL(removed[i].objectUrl);
              }

              this.$emit('remove', index);
              return true;
            }

            return false;
          },
          onChangeInput: function onChangeInput() {
            var $input = this.$refs.fileInput;

            if ($input) {
              for (var i = 0, len = $input.files.length; i < len; i++) {
                // 如果此次循环已满，则不再循环
                if (this.images.length >= this.size) {
                  return;
                }

                this.add({
                  url: URL.createObjectURL($input.files[i]),
                  file: $input.files[i],
                  objectUrl: URL.createObjectURL($input.files[i])
                });
              }
            }
          },

          /**
           * 获取用于展示的image
           */
          transformImage: function transformImage(image) {
            return image.objectUrl || image.url;
          }
        },
        template: header + '<input ref="fileInput" class="ro-uploader-input" type="file" @change="onChangeInput" :multiple="(size - images.length) > 1" :accept="accept" />' + footer
      });
    }

    var installed = false;

    function install(vue, options) {
      if (installed) {
        return;
      }

      installed = true;
      vue.component('Uploader', factory(vue));
      vue.component('WechatUploader', factory$1(vue, options));
      vue.component('InputUploader', factory$2(vue));
    }

    exports.InputUploaderFactory = factory$2;
    exports.UploaderFactory = factory;
    exports.WechatUploaderFactory = factory$1;
    exports.default = install;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
